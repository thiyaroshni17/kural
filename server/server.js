const http = require("http");
const fs = require("fs");
const path = require("path");
const { WebSocketServer } = require("ws");
const { chromium } = require("playwright");

const ROOT = path.join(__dirname, "..");
const PORT = process.env.PORT || 8787;

const MIME = {
  ".html": "text/html", ".css": "text/css", ".js": "application/javascript",
  ".json": "application/json", ".svg": "image/svg+xml", ".png": "image/png",
  ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".webp": "image/webp"
};

// ---- Multilingual TTS via Azure Speech (real neural female voices, one per language) ----
const AZURE_KEY = process.env.AZURE_SPEECH_KEY || "";
const AZURE_REGION = process.env.AZURE_SPEECH_REGION || "centralindia";

const LANG_VOICE = {
  ta: { bcp47: "ta-IN", azureVoice: "ta-IN-PallaviNeural", googleTl: "ta" },
  hi: { bcp47: "hi-IN", azureVoice: "hi-IN-SwaraNeural", googleTl: "hi" },
  te: { bcp47: "te-IN", azureVoice: "te-IN-ShrutiNeural", googleTl: "te" }
};
function voiceFor(lang) { return LANG_VOICE[lang] || LANG_VOICE.ta; }

function escapeXml(s) {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
}

async function synthesizeViaAzure(text, lang) {
  if (!AZURE_KEY) return null;
  const v = voiceFor(lang);
  const ssml = `<speak version='1.0' xml:lang='${v.bcp47}'><voice xml:lang='${v.bcp47}' xml:gender='Female' name='${v.azureVoice}'>${escapeXml(text)}</voice></speak>`;
  try {
    const res = await fetch(`https://${AZURE_REGION}.tts.speech.microsoft.com/cognitiveservices/v1`, {
      method: "POST",
      headers: {
        "Ocp-Apim-Subscription-Key": AZURE_KEY,
        "Content-Type": "application/ssml+xml",
        "X-Microsoft-OutputFormat": "audio-16khz-128kbitrate-mono-mp3",
        "User-Agent": "kural"
      },
      body: ssml
    });
    if (!res.ok) { console.error("Kural: Azure TTS error:", res.status, await res.text()); return null; }
    return Buffer.from(await res.arrayBuffer());
  } catch (e) {
    console.error("Kural: Azure TTS request failed:", e.message);
    return null;
  }
}

// Free, no-signup fallback: Google Translate's unofficial TTS endpoint. Good for getting a
// real Tamil voice working immediately; unofficial and rate-limited, so Azure above (once a
// key is set) is the better choice for real deployment.
async function synthesizeViaGoogleTranslate(text, lang) {
  const tl = voiceFor(lang).googleTl;
  const MAX = 190;
  const chunks = [];
  let remaining = String(text).trim();
  while (remaining.length > 0) {
    if (remaining.length <= MAX) { chunks.push(remaining); break; }
    let cut = remaining.lastIndexOf(". ", MAX);
    if (cut < 40) cut = remaining.lastIndexOf(" ", MAX);
    if (cut < 40) cut = MAX;
    chunks.push(remaining.slice(0, cut + 1));
    remaining = remaining.slice(cut + 1);
  }
  const fetchChunk = async (chunk) => {
    const url = `https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&tl=${tl}&q=${encodeURIComponent(chunk)}`;
    for (let attempt = 0; attempt < 2; attempt++) {
      try {
        const res = await fetch(url, {
          headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36" }
        });
        if (res.ok) return Buffer.from(await res.arrayBuffer());
        console.error("Kural: Google Translate TTS error:", res.status);
      } catch (e) {
        console.error("Kural: Google Translate TTS request failed:", e.message);
      }
      if (attempt === 0) await new Promise((r) => setTimeout(r, 400)); // brief backoff, likely rate-limited
    }
    return null;
  };

  const buffers = [];
  for (const chunk of chunks) {
    const buf = await fetchChunk(chunk);
    if (!buf) return null;
    buffers.push(buf);
  }
  return Buffer.concat(buffers);
}

async function synthesizeTamil(text, lang) {
  if (AZURE_KEY) {
    const buf = await synthesizeViaAzure(text, lang);
    if (buf) return buf;
  }
  return synthesizeViaGoogleTranslate(text, lang);
}

// ---- HTTP: /tts endpoint + static file server for the frontend ----
const server = http.createServer((req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

  if (req.method === "POST" && req.url === "/tts") {
    let body = "";
    req.on("data", (c) => { body += c; });
    req.on("end", async () => {
      try {
        const { text, lang } = JSON.parse(body || "{}");
        const audio = await synthesizeTamil(text || "", lang || "ta");
        if (!audio) { res.writeHead(204); res.end(); return; }
        res.writeHead(200, { "Content-Type": "audio/mpeg", "Content-Length": audio.length });
        res.end(audio);
      } catch (e) {
        res.writeHead(500); res.end();
      }
    });
    return;
  }

  let reqPath = req.url.split("?")[0];
  if (reqPath === "/") reqPath = "/index.html";
  const filePath = path.join(ROOT, decodeURIComponent(reqPath));
  if (!filePath.startsWith(ROOT)) { res.writeHead(403); res.end("forbidden"); return; }
  fs.readFile(filePath, (err, data) => {
    if (err) { res.writeHead(404); res.end("not found"); return; }
    const ext = path.extname(filePath);
    res.writeHead(200, { "Content-Type": MIME[ext] || "application/octet-stream" });
    res.end(data);
  });
});

// ---- in-page helpers, evaluated inside the real government page via Playwright ----
function queryVisibleSrc() {
  return `function __kuralQueryVisible(sel){
    const els = document.querySelectorAll(sel);
    return Array.from(els).find(el => el.offsetParent !== null) || els[0] || null;
  }`;
}

async function fillOne(page, selector, value) {
  await page.evaluate(({ selector, value, helper }) => {
    eval(helper);
    const el = __kuralQueryVisible(selector);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "center" });
    el.style.outline = "4px solid #ff7a3d";
    if (el.type === "radio" || el.type === "checkbox") { el.click(); return; }
    if (el.tagName === "SELECT") {
      const opt = Array.from(el.options).find((o) => o.text.trim() === String(value).trim() || o.value === String(value).trim());
      const setter = Object.getOwnPropertyDescriptor(HTMLSelectElement.prototype, "value").set;
      if (opt) setter.call(el, opt.value);
    } else {
      const proto = el.tagName === "TEXTAREA" ? HTMLTextAreaElement.prototype : HTMLInputElement.prototype;
      const setter = Object.getOwnPropertyDescriptor(proto, "value").set;
      setter.call(el, value);
    }
    el.dispatchEvent(new Event("input", { bubbles: true }));
    el.dispatchEvent(new Event("change", { bubbles: true }));
  }, { selector, value, helper: queryVisibleSrc() });
}

async function fillSplit(page, selectors, value) {
  const chars = String(value).split("");
  for (let i = 0; i < selectors.length; i++) {
    if (chars[i] != null) await fillOne(page, selectors[i], chars[i]);
  }
}

async function highlight(page, selector) {
  await page.evaluate(({ selector, helper }) => {
    eval(helper);
    document.querySelectorAll("[data-kural-hl]").forEach((el) => { el.style.outline = ""; delete el.dataset.kuralHl; });
    const el = __kuralQueryVisible(selector);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "center" });
    el.style.outline = "4px solid #ff7a3d";
    el.dataset.kuralHl = "1";
  }, { selector, helper: queryVisibleSrc() });
}

// Returns true if the element actually appeared, false on timeout — callers must act on
// this. Previously this swallowed the timeout and the caller always barged ahead to the next
// step regardless, so a wrong captcha (no OTP sent) led to a silent 3-minute wait and then
// Kural asking for an OTP that was never sent.
async function waitForAppear(page, selector, timeoutMs = 45000) {
  try {
    await page.waitForFunction((sel) => {
      const els = document.querySelectorAll(sel);
      return Array.from(els).some((el) => el.offsetParent !== null);
    }, selector, { timeout: timeoutMs });
    return true;
  } catch (e) {
    return false;
  }
}

async function waitManual(page, step, timeoutMs = 45000) {
  const waitForFilled = step.type === "captcha" || step.waitForFilled === true;
  try {
    await page.waitForFunction(({ selector, waitForFilled }) => {
      const els = document.querySelectorAll(selector);
      const visible = Array.from(els).filter((el) => el.offsetParent !== null);
      const el = visible[0] || els[0];
      if (waitForFilled) return el && el.value && el.value.trim().length > 0;
      return !el || el.offsetParent === null;
    }, { selector: step.selector, waitForFilled }, { timeout: timeoutMs });
    return true;
  } catch (e) {
    return false;
  }
}

async function waitSuccess(page, selector, timeoutMs = 600000) {
  if (!selector) return;
  await page.waitForFunction((sel) => {
    const els = document.querySelectorAll(sel);
    return Array.from(els).some((el) => el.offsetParent !== null);
  }, selector, { timeout: timeoutMs }).catch(() => {});
}

// ---- floating avatar widget, injected into the real government page ----
async function injectWidget(page, lang = "ta") {
  const avatarFile = path.join(ROOT, "assets", `avatar_${lang}.jpg`);
  let avatarDataUri = "";
  try {
    if (fs.existsSync(avatarFile)) {
      avatarDataUri = "data:image/jpeg;base64," + fs.readFileSync(avatarFile).toString("base64");
    }
  } catch (e) {
    console.error("Kural: could not load avatar image for widget:", e);
  }

  const brandNames = {
    ta: "குரல் • KURAL",
    hi: "आवाज़ • KURAL",
    te: "స్వరం • KURAL"
  };
  const brandTitle = brandNames[lang] || brandNames.ta;

  await page.evaluate(({ avatarDataUri, brandTitle }) => {
    if (document.getElementById("kural-widget")) return;
    const style = document.createElement("style");
    style.textContent = `
      #kural-widget {
        position: fixed;
        bottom: 24px;
        right: 22px;
        z-index: 2147483647;
        width: 210px;
        background: rgba(255, 255, 255, 0.94);
        backdrop-filter: blur(14px);
        -webkit-backdrop-filter: blur(14px);
        border: 2px solid rgba(255, 255, 255, 0.85);
        border-radius: 22px;
        box-shadow: 0 16px 36px rgba(173, 20, 87, 0.22), 0 4px 12px rgba(0, 0, 0, 0.08);
        padding: 14px 12px 12px;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Noto Sans Tamil", sans-serif;
        text-align: center;
        animation: kuralSlideIn 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        transition: transform 0.25s ease;
      }
      @keyframes kuralSlideIn {
        from { opacity: 0; transform: translateY(20px) scale(0.92); }
        to   { opacity: 1; transform: translateY(0) scale(1); }
      }
      #kural-brand-badge {
        display: inline-flex;
        align-items: center;
        gap: 4px;
        background: #fff3ec;
        color: #ad1457;
        font-size: 11.5px;
        font-weight: 800;
        letter-spacing: 0.3px;
        padding: 4px 10px;
        border-radius: 999px;
        border: 1px solid #ffd8c4;
        margin-bottom: 8px;
        box-shadow: 0 2px 6px rgba(173, 20, 87, 0.08);
      }
      #kural-avatar-wrap {
        position: relative;
        width: 104px;
        height: 104px;
        margin: 0 auto;
      }
      #kural-avatar-img {
        width: 104px;
        height: 104px;
        border-radius: 50%;
        object-fit: cover;
        display: block;
        border: 3.5px solid #fff;
        box-shadow: 0 6px 18px rgba(173, 20, 87, 0.22);
        animation: kuralBob 3.5s ease-in-out infinite;
        transition: filter 0.3s ease;
      }
      #kural-talk-ring, #kural-listen-ring {
        position: absolute;
        inset: -4px;
        border-radius: 50%;
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.3s ease;
      }
      #kural-talk-ring {
        border: 3.5px solid #FF7A3D;
      }
      #kural-listen-ring {
        border: 3.5px solid #42A5F5;
      }
      #kural-avatar-wrap.talking #kural-talk-ring {
        opacity: 1;
        animation: kuralRingPulse 0.9s infinite ease-in-out;
      }
      #kural-avatar-wrap.talking #kural-avatar-img {
        filter: brightness(1.06) saturate(1.1);
      }
      #kural-avatar-wrap.listening #kural-listen-ring {
        opacity: 1;
        animation: kuralRingPulse 1.2s infinite ease-in-out;
      }
      @keyframes kuralBob {
        0%, 100% { transform: translateY(0); }
        50%      { transform: translateY(-4px); }
      }
      @keyframes kuralRingPulse {
        0%, 100% { transform: scale(1); opacity: 0.6; }
        50%      { transform: scale(1.08); opacity: 1; }
      }
      #kural-caption {
        margin-top: 8px;
        font-size: 12.5px;
        font-weight: 500;
        line-height: 1.35;
        color: #2a2a2a;
        background: #ffffff;
        border-radius: 10px;
        padding: 7px 10px;
        border: 1px solid #ffe4d6;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.04);
        max-height: 80px;
        overflow-y: auto;
      }
      #kural-caption b {
        color: #ad1457;
      }
    `;
    document.head.appendChild(style);
    const el = document.createElement("div");
    el.id = "kural-widget";
    el.innerHTML = `
      <div id="kural-brand-badge">✨ ${brandTitle}</div>
      <div id="kural-avatar-wrap">
        <div id="kural-talk-ring"></div>
        <div id="kural-listen-ring"></div>
        <img id="kural-avatar-img" src="${avatarDataUri}" alt="Thozhi">
      </div>
      <div id="kural-caption"><b>${brandTitle}:</b> படிவம் தயார்</div>
    `;
    document.body.appendChild(el);
  }, { avatarDataUri, brandTitle });
}

async function setWidgetCaption(page, speaker, text) {
  await page.evaluate(({ speaker, text }) => {
    const el = document.getElementById("kural-caption");
    if (el) el.innerHTML = `<b>${speaker}:</b> ${text}`;
  }, { speaker, text }).catch(() => {});
}

async function setWidgetState(page, s) {
  await page.evaluate((s) => {
    const wrap = document.getElementById("kural-avatar-wrap");
    if (!wrap) return;
    wrap.classList.remove("talking", "listening");
    if (s === "talking" || s === "listening") wrap.classList.add(s);
  }, s).catch(() => {});
}

// The NSP OTR wizard opens on an intro "Guidelines" screen with two read/consent
// checkboxes before the actual Mobile Number field even exists on screen — no personal
// data and no external action involved (no OTP sent, nothing submitted), so this is just
// page navigation, unlike the Verify/Submit steps we deliberately always leave to her.
async function skipNspGuidelines(page) {
  const check1 = await page.$("#myCheck1").catch(() => null);
  if (!check1) return;
  await page.click("#myCheck1").catch(() => {});
  await page.click("#myCheck2").catch(() => {});
  await page.click("#step-btn-one").catch(() => {});
  await page.waitForFunction(() => {
    const el = document.querySelector('[formcontrolname="mobileNo"]');
    return el && el.offsetParent !== null;
  }, {}, { timeout: 8000 }).catch(() => {});
}

// ---- per-connection session ----
// ---- per-connection session ----
let sharedBrowser = null;
async function getBrowser() {
  if (!sharedBrowser) {
    sharedBrowser = await chromium.launch({
      headless: true,
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-blink-features=AutomationControlled",
        "--ignore-certificate-errors",
        "--disable-web-security"
      ]
    });
  }
  return sharedBrowser;
}

async function handleStartApply(ws, session, schemeId, lang = "ta") {
  const schemesRaw = fs.readFileSync(path.join(ROOT, "data", "schemes.json"), "utf8");
  const schemesData = JSON.parse(schemesRaw);
  const scheme = schemesData.schemes.find((s) => s.id === schemeId);
  if (!scheme) { ws.send(JSON.stringify({ type: "APPLY_ERROR", error: "scheme not found" })); return; }

  const browser = await getBrowser();
  const context = await browser.newContext({
    viewport: { width: 1024, height: 768 },
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
    ignoreHTTPSErrors: true
  });
  const page = await context.newPage();
  session.context = context;
  session.page = page;

  const cdp = await context.newCDPSession(page);
  session.cdp = cdp;
  await cdp.send("Page.startScreencast", { format: "jpeg", quality: 60, maxWidth: 1024, maxHeight: 768, everyNthFrame: 1 });
  cdp.on("Page.screencastFrame", async (frame) => {
    try {
      ws.send(JSON.stringify({ type: "FRAME", data: frame.data }));
      await cdp.send("Page.screencastFrameAck", { sessionId: frame.sessionId });
    } catch (e) { /* ignore if socket closed mid-frame */ }
  });

  try {
    await page.goto(scheme.portal_url, { waitUntil: "commit", timeout: 45000 });
    await page.waitForLoadState("domcontentloaded", { timeout: 15000 }).catch(() => {});
  } catch (e) {
    console.warn("Kural: portal navigation notice:", e.message);
  }
  await injectWidget(page, lang).catch(() => {});
  await skipNspGuidelines(page).catch(() => {});

  const fieldsRaw = fs.readFileSync(path.join(ROOT, scheme.fields_file), "utf8");
  const fields = JSON.parse(fieldsRaw);
  ws.send(JSON.stringify({ type: "PORTAL_READY", scheme, fields }));
}

// ---- CDP input helpers for interactive screencast ----
// All coordinates arriving from the client are already in the Playwright
// viewport space (1024×768) — the client scales them before sending.
async function cdpMouse(cdp, type, x, y, button, clickCount, modifiers) {
  await cdp.send("Input.dispatchMouseEvent", {
    type,
    x: Math.round(x),
    y: Math.round(y),
    button: button || "none",
    clickCount: clickCount || 0,
    modifiers: modifiers || 0,
    buttons: type === "mouseReleased" ? 0 : (button === "left" ? 1 : button === "right" ? 2 : 0)
  }).catch(() => {});
}

async function cdpScroll(cdp, x, y, deltaX, deltaY) {
  await cdp.send("Input.dispatchMouseEvent", {
    type: "mouseWheel",
    x: Math.round(x),
    y: Math.round(y),
    deltaX: deltaX || 0,
    deltaY: deltaY || 0
  }).catch(() => {});
}

// CDP key modifiers bitmask: Alt=1, Ctrl=2, Meta=4, Shift=8
function keyModifiers(e) {
  return (e.altKey ? 1 : 0) | (e.ctrlKey ? 2 : 0) | (e.metaKey ? 4 : 0) | (e.shiftKey ? 8 : 0);
}

// Map common key names to CDP virtualKeyCode
const KEY_CODES = {
  Backspace: 8, Tab: 9, Enter: 13, Shift: 16, Control: 17, Alt: 18, Escape: 27,
  Space: 32, PageUp: 33, PageDown: 34, End: 35, Home: 36,
  ArrowLeft: 37, ArrowUp: 38, ArrowRight: 39, ArrowDown: 40,
  Delete: 46, F5: 116
};

async function cdpKey(cdp, type, key, code, modifiers, text) {
  const vk = KEY_CODES[key] || 0;
  await cdp.send("Input.dispatchKeyEvent", {
    type,
    key,
    code: code || key,
    windowsVirtualKeyCode: vk,
    nativeVirtualKeyCode: vk,
    modifiers: modifiers || 0,
    text: type === "keyDown" ? (text || "") : "",
    unmodifiedText: type === "keyDown" ? (text || "") : ""
  }).catch(() => {});
}

const wss = new WebSocketServer({ server, path: "/ws" });

wss.on("connection", (ws) => {
  const session = { context: null, page: null, cdp: null };

  ws.on("message", async (raw) => {
    let msg;
    try { msg = JSON.parse(raw.toString()); } catch (e) { return; }

    if (msg.type === "START_APPLY") {
      await handleStartApply(ws, session, msg.schemeId, msg.lang || "ta").catch((e) => {
        ws.send(JSON.stringify({ type: "APPLY_ERROR", error: e.message }));
      });
      return;
    }
    if (!session.page) return;
    const page = session.page;
    const cdp = session.cdp;

    if (msg.type === "FILL") await fillOne(page, msg.selector, msg.value).catch(() => {});
    else if (msg.type === "FILL_SPLIT") await fillSplit(page, msg.selectors, msg.value).catch(() => {});
    else if (msg.type === "HIGHLIGHT") await highlight(page, msg.selector).catch(() => {});
    else if (msg.type === "SET_CAPTION") await setWidgetCaption(page, msg.speaker, msg.text);
    else if (msg.type === "SET_STATE") await setWidgetState(page, msg.state);
    // ---- interactive input forwarding ----
    else if (msg.type === "POINTER_DOWN") {
      await cdpMouse(cdp, "mousePressed", msg.x, msg.y, msg.button, 1, msg.modifiers);
    }
    else if (msg.type === "POINTER_UP") {
      await cdpMouse(cdp, "mouseReleased", msg.x, msg.y, msg.button, 1, msg.modifiers);
    }
    else if (msg.type === "POINTER_MOVE") {
      await cdpMouse(cdp, "mouseMoved", msg.x, msg.y, "none", 0, msg.modifiers);
    }
    else if (msg.type === "SCROLL") {
      await cdpScroll(cdp, msg.x, msg.y, msg.deltaX, msg.deltaY);
    }
    else if (msg.type === "KEY_DOWN") {
      await cdpKey(cdp, "keyDown", msg.key, msg.code, msg.modifiers, msg.text);
      if (msg.text) await cdpKey(cdp, "char", msg.key, msg.code, msg.modifiers, msg.text);
    }
    else if (msg.type === "KEY_UP") {
      await cdpKey(cdp, "keyUp", msg.key, msg.code, msg.modifiers, "");
    }
    else if (msg.type === "WATCH_MANUAL") {
      const found = await waitManual(page, msg.step, msg.timeoutMs);
      ws.send(JSON.stringify({ type: "STEP_COMPLETE", id: msg.step.id, found }));
      return;
    }
    else if (msg.type === "WATCH_APPEAR") {
      const found = await waitForAppear(page, msg.selector, msg.timeoutMs);
      ws.send(JSON.stringify({ type: "ADVANCE_READY", found }));
      return;
    }
    else if (msg.type === "WATCH_SUCCESS") { await waitSuccess(page, msg.selector); ws.send(JSON.stringify({ type: "SUCCESS" })); return; }

    if (msg.reqId != null) ws.send(JSON.stringify({ type: "ACK", reqId: msg.reqId }));
  });

  ws.on("close", async () => {
    if (session.context) await session.context.close().catch(() => {});
  });
});

server.listen(PORT, () => {
  console.log(`Kural server running at http://localhost:${PORT}`);
  console.log(AZURE_KEY ? "Tamil TTS: Azure ta-IN-PallaviNeural enabled." : "Tamil TTS: AZURE_SPEECH_KEY not set — frontend will fall back to the browser's local voice (if any).");
});

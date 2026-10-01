// ---- language ----
const LANG_META = {
  ta: { label: "தமிழ்", brand: "குரல்", you: "நீங்கள்", sttLang: "ta-IN", azureVoice: "ta-IN-PallaviNeural", googleTl: "ta",
    attire: { saree1: "#E91E8C", saree2: "#8E0E55", pallu1: "#FFECB3", pallu2: "#FFA726", blouse: "#8E24AA" } },
  hi: { label: "हिन्दी", brand: "आवाज़", you: "आप", sttLang: "hi-IN", azureVoice: "hi-IN-SwaraNeural", googleTl: "hi",
    attire: { saree1: "#FF7043", saree2: "#BF360C", pallu1: "#FFF59D", pallu2: "#FBC02D", blouse: "#C62828" } },
  te: { label: "తెలుగు", brand: "స్వరం", you: "మీరు", sttLang: "te-IN", azureVoice: "te-IN-ShrutiNeural", googleTl: "te",
    attire: { saree1: "#1565C0", saree2: "#0D47A1", pallu1: "#E3F2FD", pallu2: "#90CAF9", blouse: "#37474F" } }
};

const STRINGS = {
  noVoiceNote: { ta: "(இந்த சாதனத்தில் தமிழ் குரல் இல்லை — எழுத்தை படியுங்கள்)", hi: "(इस डिवाइस में हिन्दी आवाज़ नहीं है — लिखा हुआ पढ़ें)", te: "(ఈ పరికరంలో తెలుగు స్వరం లేదు — రాసినది చదవండి)" },
  noSpeechRecognition: { ta: "இந்த உலாவியில் குரல் அறிதல் கிடைக்கவில்லை.", hi: "इस ब्राउज़र में आवाज़ पहचान उपलब्ध नहीं है।", te: "ఈ బ్రౌజర్‌లో వాయిస్ గుర్తింపు అందుబాటులో లేదు." },
  micNotAllowed: { ta: "மைக் அனுமதி இல்லை. உலாவி அனுமதி கேட்கும்போது 'Allow' தேர்ந்தெடுக்கவும்.", hi: "माइक की अनुमति नहीं है। ब्राउज़र पूछे तो 'Allow' चुनें।", te: "మైక్ అనుమతి లేదు. బ్రౌజర్ అడిగినప్పుడు 'Allow' ఎంచుకోండి." },
  micNotAvailable: { ta: "மைக் கிடைக்கவில்லை. வேறு செயலி மைக்கைப் பயன்படுத்துகிறதா எனப் பார்க்கவும்.", hi: "माइक उपलब्ध नहीं है। कोई और ऐप माइक इस्तेमाल कर रहा है या देखें।", te: "మైక్ అందుబాటులో లేదు. వేరే యాప్ మైక్ వాడుతోందేమో చూడండి." },
  networkError: { ta: "இணைய பிழை. இணைப்பை சரிபார்த்து மீண்டும் முயற்சிக்கவும்.", hi: "नेटवर्क में समस्या है। कनेक्शन जांचकर फिर कोशिश करें।", te: "నెట్‌వర్క్ లోపం. కనెక్షన్ చూసి మళ్ళీ ప్రయత్నించండి." },
  noMatchingScheme: { ta: "மன்னிக்கவும், இப்போதைக்கு பொருந்தக்கூடிய திட்டம் கிடைக்கவில்லை.", hi: "माफ़ कीजिए, अभी कोई उपयुक्त योजना नहीं मिली।", te: "క్షమించండి, ప్రస్తుతం సరిపోయే పథకం దొరకలేదు." },
  pickSchemePrompt: { ta: "எந்த திட்டத்தை தேர்வு செய்ய விரும்புகிறீர்கள்? ஒன்று, இரண்டு அல்லது மூன்று என சொல்லுங்கள், அல்லது அட்டையை தொடவும்.", hi: "आप कौन सी योजना चुनना चाहती हैं? एक, दो या तीन बोलिए, या कार्ड को छुएं।", te: "మీరు ఏ పథకాన్ని ఎంచుకోవాలనుకుంటున్నారు? ఒకటి, రెండు లేదా మూడు అని చెప్పండి, లేదా కార్డును తాకండి." },
  youChose: { ta: "நீங்கள் தேர்ந்தது:", hi: "आपने चुना:", te: "మీరు ఎంచుకున్నది:" },
  skippingField: { ta: "மன்னிக்கவும், இதை தவிர்த்து தொடர்கிறேன்.", hi: "माफ़ कीजिए, इसे छोड़कर आगे बढ़ती हूं।", te: "క్షమించండి, దీన్ని వదిలి ముందుకు వెళ్తున్నాను." },
  youSaid: { ta: "நீங்கள் சொன்னது:", hi: "आपने कहा:", te: "మీరు చెప్పింది:" },
  isThatRight: { ta: "சரியா?", hi: "सही है?", te: "సరైనదేనా?" },
  unclearRetry: { ta: "உங்கள் பதில் தெளிவாக கேட்கவில்லை. 'சரி' அல்லது 'இல்லை' என சொல்லுங்கள்.", hi: "आपका जवाब साफ़ सुनाई नहीं दिया। 'सही' या 'नहीं' कहिए।", te: "మీ సమాధానం స్పష్టంగా వినిపించలేదు. 'సరైనది' లేదా 'కాదు' అని చెప్పండి." },
  otpSentNotice: { ta: "உங்கள் கைபேசிக்கு OTP அனுப்பப்பட்டுள்ளது.", hi: "आपके मोबाइल पर OTP भेजा गया है।", te: "మీ మొబైల్‌కు OTP పంపబడింది." },
  pressSubmitYourself: { ta: "நன்றாக உள்ளது. இப்போது சமர்ப்பி பொத்தானை நீங்களே அழுத்தவும்.", hi: "ठीक है। अब Submit बटन खुद दबाएं।", te: "బాగుంది. ఇప్పుడు Submit బటన్‌ను మీరే నొక్కండి." },
  applicationSuccess: { ta: "வாழ்த்துக்கள்! உங்கள் விண்ணப்பம் வெற்றிகரமாக சமர்ப்பிக்கப்பட்டது.", hi: "बधाई हो! आपका आवेदन सफलतापूर्वक जमा हो गया।", te: "అభినందనలు! మీ దరఖాస్తు విజయవంతంగా సమర్పించబడింది." },
  reviewNotConfirmed: { ta: "பரவாயில்லை, விவரங்களை நீங்களே ஒருமுறை சரிபார்த்து, படிவத்தை நீங்களே சமர்ப்பிக்கவும்.", hi: "कोई बात नहीं, जानकारी खुद एक बार जांचकर फॉर्म खुद जमा करें।", te: "పర్వాలేదు, వివరాలను మీరే ఒకసారి తనిఖీ చేసి ఫారాన్ని మీరే సమర్పించండి." },
  advanceDefaultHint: { ta: "அடுத்த படி இன்னும் திரையில் தெரியவில்லை. Captcha சரியாக இருந்ததா எனப் பார்த்து, பொத்தானை மீண்டும் அழுத்தவும்.", hi: "अगली स्क्रीन अभी नहीं दिख रही। Captcha सही था या नहीं देखकर बटन फिर दबाएं।", te: "తదుపరి స్క్రీన్ ఇంకా కనిపించడం లేదు. Captcha సరిగ్గా ఉందో చూసి బటన్‌ను మళ్ళీ నొక్కండి." },
  advanceButtonDefault: { ta: "அடுத்த படிக்கு செல்ல பொத்தானை நீங்களே அழுத்தவும்.", hi: "अगले चरण पर जाने के लिए बटन खुद दबाएं।", te: "తదుపరి దశకు వెళ్లడానికి బటన్‌ను మీరే నొక్కండి." },
  openingForm: { ta: "படிவத்தை திறக்கிறேன். ஒரு நிமிடம் காத்திருங்கள்.", hi: "फॉर्म खोल रही हूं। एक मिनट रुकिए।", te: "ఫారాన్ని తెరుస్తున్నాను. ఒక నిమిషం ఆగండి." },
  connectingServer: { ta: "சேவையகத்துடன் இணைக்கிறேன்...", hi: "सर्वर से जुड़ रही हूं...", te: "సర్వర్‌తో కనెక్ట్ అవుతున్నాను..." },
  serverConnectError: { ta: "மன்னிக்கவும், குரலின் சேவையகத்துடன் இணைக்க முடியவில்லை.", hi: "माफ़ कीजिए, सर्वर से जुड़ नहीं पाई।", te: "క్షమించండి, సర్వర్‌తో కనెక్ట్ కాలేకపోయాను." },
  openingPortal: { ta: "அரசு படிவத்தை திறக்கிறேன்...", hi: "सरकारी फॉर्म खोल रही हूं...", te: "ప్రభుత్వ ఫారాన్ని తెరుస్తున్నాను..." },
  portalOpenError: { ta: "மன்னிக்கவும், படிவத்தை திறக்க முடியவில்லை.", hi: "माफ़ कीजिए, फॉर्म नहीं खुल पाया।", te: "క్షమించండి, ఫారం తెరవలేకపోయాను." },
  formReadyLadderIntro: { ta: "படிவம் தயார். முதலில் சில இடங்களை நான் நிரப்புகிறேன், பிறகு உங்களுக்கு வழிகாட்டுவேன், கடைசியாக நீங்களே செய்யப் பார்ப்போம்.", hi: "फॉर्म तैयार है। पहले कुछ जगह मैं भरती हूं, फिर आपको बताऊंगी, और आखिर में आप खुद करके देखेंगी।", te: "ఫారం సిద్ధంగా ఉంది. మొదట కొన్ని చోట్ల నేను నింపుతాను, తర్వాత మీకు చూపిస్తాను, చివరగా మీరే చేసి చూద్దాం." },
  thinkingStatus: { ta: "புரிந்துகொள்கிறேன்...", hi: "समझ रही हूं...", te: "అర్థం చేసుకుంటున్నాను..." },
  searchingStatus: { ta: "பொருத்தமான திட்டங்களைத் தேடுகிறேன்...", hi: "उपयुक्त योजनाएं खोज रही हूं...", te: "సరిపోయే పథకాలను వెతుకుతున్నాను..." },
  typeItYourselfFallbackSuffix: { ta: " இதை இந்த இடத்தில் நீங்களே தட்டச்சு செய்யவும்.", hi: " इसे यहां खुद टाइप करें।", te: " దీన్ని ఇక్కడ మీరే టైప్ చేయండి." },
  typeItYourselfReplace: { ta: "இந்த இடத்தில் நீங்களே தட்டச்சு செய்யவும்.", hi: "इसे यहां खुद टाइप करें।", te: "దీన్ని ఇక్కడ మీరే టైప్ చేయండి." },
  nextFillYourself: { ta: "அடுத்ததாக, இதை நீங்களே நிரப்பவும்.", hi: "अब इसे खुद भरें।", te: "ఇప్పుడు దీన్ని మీరే నింపండి." },
  startBtn: { ta: "தொடங்குங்கள்", hi: "शुरू करें", te: "ప్రారంభించండి" },
  clearBtn: { ta: "எல்லாம் அழி", hi: "सब मिटाएं", te: "అన్నీ తొలగించు" },
  stepperLabels: { ta: ["வரவேற்பு", "கேள்விகள்", "திட்டங்கள்", "விண்ணப்பம்"], hi: ["स्वागत", "प्रश्न", "योजनाएं", "आवेदन"], te: ["స్వాగతం", "ప్రశ్నలు", "పథకాలు", "దరఖాస్తు"] },
  badgeTitle: { ta: "கற்றல் பேட்ஜ்", hi: "सीखने का बैज", te: "నేర్చుకునే బ్యాడ్జ్" },
  badgeAutoLabel: { ta: "குரல் நிரப்பியது", hi: "आवाज़ ने भरा", te: "స్వరం నింపింది" },
  badgeGuideLabel: { ta: "வழிகாட்டியது", hi: "मदद से भरा", te: "మార్గదర్శనంతో నింపారు" },
  badgeSoloLabel: { ta: "நீங்களே செய்தது", hi: "आपने खुद किया", te: "మీరే చేసారు" },
  documentsLabel: { ta: "தேவையான ஆவணங்கள்:", hi: "ज़रूरी दस्तावेज़:", te: "అవసరమైన పత్రాలు:" },
  whereToGoLabel: { ta: "எங்கு செல்ல வேண்டும்:", hi: "कहां जाना है:", te: "ఎక్కడికి వెళ్ళాలి:" },
  printBtn: { ta: "அச்சிடவும்", hi: "प्रिंट करें", te: "ప్రింట్ చేయండి" },
  liveLabel: { ta: "🔴 நேரலை — அரசு இணையதளம்", hi: "🔴 लाइव — सरकारी वेबसाइट", te: "🔴 ప్రత్యక్షం — ప్రభుత్వ వెబ్‌సైట్" },
  criteriaAge: { ta: "வயது: %s", hi: "आयु: %s", te: "వయస్సు: %s" },
  criteriaIncome: { ta: "ஆண்டு வருமானம்: ₹%s", hi: "सालाना आय: ₹%s", te: "వార్షిక ఆదాయం: ₹%s" },
  criteriaRationYes: { ta: "குடும்ப அட்டை: உள்ளது", hi: "राशन कार्ड: है", te: "రేషన్ కార్డు: ఉంది" },
  criteriaRationNo: { ta: "குடும்ப அட்டை: இல்லை", hi: "राशन कार्ड: नहीं", te: "రేషన్ కార్డు: లేదు" },
  criteriaWidowYes: { ta: "திருமண நிலை: விதவை", hi: "वैवाहिक स्थिति: विधवा", te: "వైవాహిక స్థితి: వితంతువు" },
  criteriaWidowNo: { ta: "திருமண நிலை: விதவை இல்லை", hi: "वैवाहिक स्थिति: विधवा नहीं", te: "వైవాహిక స్థితి: వితంతువు కాదు" }
};

function tf(key, val) { return t(key).replace("%s", val); }

function t(key) {
  const entry = STRINGS[key];
  if (!entry) return key;
  return entry[state.lang] || entry.ta;
}

// Multilingual data objects look like {ta:"...", hi:"...", te:"..."} — pick the active
// language, falling back to Tamil (the one language guaranteed to be authored).
function L(obj) {
  if (obj == null) return "";
  if (typeof obj === "string") return obj; // already-resolved / legacy flat string
  return obj[state.lang] || obj.ta || "";
}

function badgeHeadline(n) {
  const map = {
    ta: `இன்று நீங்கள் படிவத்தின் ${n} பகுதிகளை நீங்களே நிரப்பினீர்கள்!`,
    hi: `आज आपने फॉर्म के ${n} हिस्से खुद भरे!`,
    te: `ఈరోజు మీరు ఫారంలోని ${n} భాగాలను మీరే నింపారు!`
  };
  return map[state.lang] || map.ta;
}

// ---- state ----
const state = {
  lang: localStorage.getItem("kural_lang") || "ta",
  rate: 1, ta_voice: null, resolvePick: null, schemes: null, ws: null, currentAudio: null,
  resolvePortalReady: null, resolveStepComplete: null, resolveAdvance: null, resolveSuccessWatch: null
};

function setLanguage(lang) {
  if (!LANG_META[lang]) return;
  state.lang = lang;
  localStorage.setItem("kural_lang", lang);
  document.title = `${LANG_META[lang].brand} • KURAL`;
  document.documentElement.lang = lang;
  const brandEl = document.getElementById("brand-title-text");
  if (brandEl) brandEl.innerHTML = `${LANG_META[lang].brand} <span class="brand-sub">KURAL</span>`;
  document.querySelectorAll(".lang-btn").forEach((b) => b.classList.toggle("active", b.dataset.lang === lang));
  document.querySelectorAll("#stepper .step .label").forEach((el, i) => { el.textContent = t("stepperLabels")[i]; });
  document.getElementById("start-btn").textContent = t("startBtn");
  const clearBtn = document.getElementById("clear-btn");
  if (clearBtn) {
    clearBtn.title = t("clearBtn");
    clearBtn.textContent = "↺";
  }
  document.getElementById("screencast-label").textContent = t("liveLabel");
  applyAttire(lang);
  if (typeof updateLiveLadder === "function") {
    updateLiveLadder(state.currentLadder || { auto: 0, guide: 0, solo: 0 });
  }
  // Confirmation card labels
  const confirmTitle  = { ta: "சரிபார்க்கவும்", hi: "जाँचें", te: "నిర్ధారించండి" };
  const retryLabel    = { ta: "மீண்டும் பேசு", hi: "फिर बोलें", te: "మళ్ళీ చెప్పండి" };
  const confirmLabel  = { ta: "சரி, நிரப்பு", hi: "ठीक है, भरें", te: "సరే, నింపండి" };
  const confirmHint   = { ta: "மேலே திருத்தம் செய்யலாம் அல்லது குரலில் 'சரி' / 'இல்லை' சொல்லுங்கள்", hi: "ऊपர बदल सकते हैं या आवाज़ से 'हां'/'नहीं' कहें", te: "పై విలువను మార్చవచ్చు లేదా 'సరైనది'/'కాదు' అని చెప్పండి" };
  const g = (id) => document.getElementById(id);
  if (g("confirm-title"))  g("confirm-title").textContent  = confirmTitle[lang]  || confirmTitle.ta;
  if (g("cbr-label"))      g("cbr-label").textContent      = retryLabel[lang]    || retryLabel.ta;
  if (g("cby-label"))      g("cby-label").textContent      = confirmLabel[lang]  || confirmLabel.ta;
  if (g("confirm-hint"))   g("confirm-hint").textContent   = confirmHint[lang]   || confirmHint.ta;
  // Screencast toolbar labels
  const watchLabel    = { ta: "👁 கவனி", hi: "👁 देखें", te: "👁 చూడు" };
  const interactLabel = { ta: "🖱️ தொட்டு திருத்து", hi: "🖱️ इंटरेक्ट करें", te: "🖱️ తాకి మార్చు" };
  const kbLabel       = { ta: "⌨️ தட்டச்சு செய்யவும் — Esc வெளியேற", hi: "⌨️ टाइप करें — Esc से बाहर", te: "⌨️ టైప్ చేయండి — Esc నిష్క్రమించు" };
  if (g("sc-mode-badge") && !g("sc-mode-badge").classList.contains("interactive")) g("sc-mode-badge").textContent = watchLabel[lang] || watchLabel.ta;
  if (g("sc-interact-btn")) g("sc-interact-btn").textContent = interactLabel[lang] || interactLabel.ta;
  if (g("sc-keyboard-hint")) g("sc-keyboard-hint").innerHTML = (kbLabel[lang] || kbLabel.ta).replace("Esc", "<kbd>Esc</kbd>");
}

function applyAttire(lang) {
  // Swap the real photo avatar to the language-appropriate image
  const photoMap = { ta: "assets/avatar_ta.jpg", hi: "assets/avatar_hi.jpg", te: "assets/avatar_te.jpg" };
  const img = document.getElementById("avatar-photo");
  if (img) img.src = photoMap[lang] || photoMap.ta;
}

document.querySelectorAll(".lang-btn").forEach((btn) => {
  btn.addEventListener("click", () => setLanguage(btn.dataset.lang));
});
setLanguage(state.lang);

// ---- persistent independence skills ----
// This is the whole point of Kural: she should need it LESS over time, not more. A field
// kind (phone/name/address/...) she's typed herself a few times — on ANY government form,
// not just one scheme — gets handed fully to her from then on, across sessions, forever,
// via localStorage. There is no reset; the ladder only climbs.
const SKILL_CATEGORIES = ["phone", "identity_number", "name", "email", "address", "captcha"];
const SKILL_MASTER_AT = 3;

function loadSkills() {
  const skills = {};
  let parsed = {};
  try { parsed = JSON.parse(localStorage.getItem("kural_skills") || "{}"); } catch (e) {}
  SKILL_CATEGORIES.forEach((c) => { skills[c] = parsed[c] || 0; });
  return skills;
}

function saveSkills(skills) {
  try { localStorage.setItem("kural_skills", JSON.stringify(skills)); } catch (e) {}
}

function skillCategoryOf(step) {
  const id = (step.id || "").toLowerCase();
  if (step.type === "captcha") return "captcha";
  if (id.includes("mobile") || id.includes("phone")) return "phone";
  if (id.includes("aadhaar") || id.includes("ration")) return "identity_number";
  if (id.includes("name")) return "name";
  if (id.includes("email")) return "email";
  if (id.includes("address")) return "address";
  return null;
}

function zoneForSkill(level) {
  if (level <= 0) return "auto";
  if (level < SKILL_MASTER_AT) return "guide";
  return "solo";
}

// ---- number/word normalization (used everywhere) ----
// Full magnitude-number vocabulary (tens/hundreds/thousands/lakhs) is authored for Tamil only;
// for Hindi/Telugu, digit-sequence fields (phone/Aadhaar/OTP) are fully supported below, and
// plain numbers (age/income) still work whenever the recognizer outputs digits directly, which
// is common for short numbers — full word-number parsing for those languages is a follow-up.
const NUM_WORDS = {
  "சுழியம்": 0, "பூஜ்ஜியம்": 0, "ஒன்று": 1, "ஒரு": 1, "இரண்டு": 2, "இரு": 2, "மூன்று": 3,
  "நான்கு": 4, "ஐந்து": 5, "ஆறு": 6, "ஏழு": 7, "எட்டு": 8, "ஒன்பது": 9,
  "பத்து": 10, "பதினொன்று": 11, "பன்னிரண்டு": 12, "பதிமூன்று": 13, "பதினான்கு": 14,
  "பதினைந்து": 15, "பதினாறு": 16, "பதினேழு": 17, "பதினெட்டு": 18, "பத்தொன்பது": 19,
  "இருபது": 20, "முப்பது": 30, "நாற்பது": 40, "ஐம்பது": 50, "அறுபது": 60,
  "எழுபது": 70, "எண்பது": 80, "தொண்ணூறு": 90
};
const MULT_WORDS = { "நூறு": 100, "ஆயிரம்": 1000, "லட்சம்": 100000, "இலட்சம்": 100000 };

function normalizeNumber(text) {
  const digitMatch = (text || "").replace(/[^0-9]/g, "");
  if (digitMatch && digitMatch.length >= String(text).trim().length - 2) return parseInt(digitMatch, 10);
  const tokens = (text || "").trim().split(/\s+/);
  let total = 0, current = 0;
  for (const tok of tokens) {
    if (tok in NUM_WORDS) { current += NUM_WORDS[tok]; }
    else if (tok in MULT_WORDS) { total += (current || 1) * MULT_WORDS[tok]; current = 0; }
    else if (/^\d+$/.test(tok)) { current += parseInt(tok, 10); }
  }
  total += current;
  return total || (digitMatch ? parseInt(digitMatch, 10) : null);
}

// Mobile numbers, Aadhaar numbers and OTPs are spoken digit-by-digit ("ஒன்பது ஆறு எட்டு..." /
// "नौ छह आठ..." / "తొమ్మిది ఆరు ఎనిమిది...") — each word is ONE digit to append, not a quantity
// to add up. Digit vocab is per-language so this works regardless of the selected language.
const DIGIT_WORDS_BY_LANG = {
  ta: { "சுழியம்": 0, "பூஜ்ஜியம்": 0, "ஒன்று": 1, "ஒரு": 1, "ஒண்ணு": 1, "இரண்டு": 2, "இரு": 2, "ரெண்டு": 2, "மூன்று": 3, "மூணு": 3, "நான்கு": 4, "நாலு": 4, "ஐந்து": 5, "ஆறு": 6, "ஏழு": 7, "எட்டு": 8, "ஒன்பது": 9 },
  hi: { "शून्य": 0, "सिफ़र": 0, "एक": 1, "दो": 2, "तीन": 3, "चार": 4, "पांच": 5, "पाँच": 5, "छह": 6, "छः": 6, "सात": 7, "आठ": 8, "नौ": 9 },
  te: { "సున్నా": 0, "శూన్యం": 0, "ఒకటి": 1, "రెండు": 2, "మూడు": 3, "నాలుగు": 4, "ఐదు": 5, "ఆరు": 6, "ఏడు": 7, "ఎనిమిది": 8, "తొమ్మిది": 9 }
};
const DIGIT_WORD_BY_LANG = {
  ta: ["பூஜ்ஜியம்", "ஒன்று", "இரண்டு", "மூன்று", "நான்கு", "ஐந்து", "ஆறு", "ஏழு", "எட்டு", "ஒன்பது"],
  hi: ["शून्य", "एक", "दो", "तीन", "चार", "पांच", "छह", "सात", "आठ", "नौ"],
  te: ["సున్నా", "ఒకటి", "రెండు", "మూడు", "నాలుగు", "ఐదు", "ఆరు", "ఏడు", "ఎనిమిది", "తొమ్మిది"]
};

function digitsFromSpeech(text) {
  const digitMatch = (text || "").replace(/[^0-9]/g, "");
  if (digitMatch && digitMatch.length >= String(text).trim().length - 2) return digitMatch;
  const words = DIGIT_WORDS_BY_LANG[state.lang] || DIGIT_WORDS_BY_LANG.ta;
  const tokens = (text || "").trim().split(/\s+/);
  let out = "";
  for (const tok of tokens) {
    if (/^\d+$/.test(tok)) out += tok;
    else if (tok in words) out += String(words[tok]);
  }
  return out;
}

// The reverse direction: reading a digit-sequence value back to her. If we just hand a numeral
// string like "9876543210" to TTS, it's read as a quantity (lakhs/crores) instead of individual
// digits — so spell each digit out as its own word in the active language before speaking it.
function digitsToSpeech(digits) {
  const words = DIGIT_WORD_BY_LANG[state.lang] || DIGIT_WORD_BY_LANG.ta;
  return String(digits).split("").map((d) => words[+d] ?? d).join(", ");
}

// ---- speech out ----
function loadVoices() {
  return new Promise((resolve) => {
    let voices = speechSynthesis.getVoices();
    if (voices.length) { resolve(voices); return; }
    let tries = 0;
    const timer = setInterval(() => {
      voices = speechSynthesis.getVoices();
      tries++;
      if (voices.length || tries > 20) { clearInterval(timer); resolve(voices); }
    }, 150);
  });
}

async function pickTamilVoice() {
  const voices = await loadVoices();
  const langKey = state.lang || "ta";
  const nameKeywords = {
    ta: ["tamil", "தமிழ்", "valluvar", "pallavi"],
    hi: ["hindi", "हिन्दी", "hemant", "kalpana", "swara", "madhur"],
    te: ["telugu", "తెలుగు", "mohan", "shruti"]
  };
  const kw = nameKeywords[langKey] || [];
  const prefix = (LANG_META[langKey]?.sttLang || "ta-IN").split("-")[0].toLowerCase();

  state.ta_voice = voices.find((v) => {
    const l = (v.lang || "").toLowerCase().replace("_", "-");
    if (l.startsWith(prefix)) return true;
    const n = (v.name || "").toLowerCase();
    return kw.some((k) => n.includes(k));
  }) || null;

  return state.ta_voice;
}
speechSynthesis.onvoiceschanged = pickTamilVoice;
pickTamilVoice();

function setCaption(speaker, text, pending) {
  const el = document.getElementById("caption");
  el.innerHTML = `<div><b>${speaker}:</b> <span class="${pending ? "pending-text" : ""}">${text}</span></div>`;
  // Mirror into the live transcription panel
  setLiveTranscript(speaker, text, pending);
}

// ---- Live Transcription Panel ----
function setLiveTranscript(speaker, text, isPending) {
  const panel = document.getElementById("live-transcript");
  if (!panel) return;
  panel.classList.toggle("active", !!(text && text.trim()));
  if (!text || !text.trim()) return;
  document.getElementById("lt-speaker").textContent = speaker;
  const ltText = document.getElementById("lt-text");
  ltText.textContent = text;
  ltText.className = isPending ? "lt-pending" : "lt-final";
  document.getElementById("lt-mic").classList.toggle("pulsing", !!isPending);
}

// Shows what Kural is doing right now (thinking, searching, connecting) so the
// screen never sits static between a spoken prompt and the next visible change.
function setStatus(text) {
  const el = document.getElementById("status");
  if (!text) { el.classList.remove("active"); return; }
  document.getElementById("status-text").textContent = text;
  el.classList.add("active");
}

function setStep(n) {
  document.querySelectorAll("#stepper .step").forEach((el, i) => {
    el.classList.toggle("active", i === n);
    el.classList.toggle("done", i < n);
  });
}

function getBackendBase() {
  // If running directly on port 8787, use relative path:
  if (location.port === "8787") {
    return { http: "", ws: `ws://${location.host}` };
  }
  // If running via python http.server 5500, Live Server 5501, or file protocol:
  const host = location.hostname || "localhost";
  return { http: `http://${host}:8787`, ws: `ws://${host}:8787` };
}

// Try the server's real voice (Azure neural / Google Translate backend) first.
async function synthesizeViaServer(text) {
  const base = getBackendBase().http;
  try {
    const res = await fetch(`${base}/tts`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text, lang: state.lang })
    });
    if (!res.ok || res.status === 204) return null;
    const blob = await res.blob();
    if (!blob.size) return null;
    return URL.createObjectURL(blob);
  } catch (e) {
    return null;
  }
}

function prepareSpeechText(raw, lang) {
  if (!raw) return "";
  const rupeeWord = { ta: "ரூபாய் ", hi: "रुपये ", te: "రూపాయలు " };
  let s = String(raw);
  s = s.replace(/₹\s*([0-9,]+)/g, (_, num) => `${rupeeWord[lang] || "ரூபாய் "}${num} `);
  s = s.replace(/₹/g, rupeeWord[lang] || "ரூபாய் ");
  // Strip emojis and non-spoken markdown
  s = s.replace(/[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, " ");
  s = s.replace(/[•*#_~`|]/g, " ");
  return s.trim();
}

// Direct client-side speech synthesis using Google Translate TTS streams.
// Guarantees Tamil (ta) and Telugu (te) voice output works even if node server is offline
// or if Windows has no regional voice packs installed.
function playDirectTTS(text, lang, effRate = 1) {
  return new Promise((resolve) => {
    const tlMap = { ta: "ta", hi: "hi", te: "te" };
    const tl = tlMap[lang] || "ta";
    const cleaned = prepareSpeechText(text, lang);
    if (!cleaned) { resolve(false); return; }

    // Split into sentences / natural pause chunks (<= 120 chars)
    const rawChunks = cleaned.match(/[^.!?,\n]+[.!?,\n]?/g) || [cleaned];
    const chunks = [];
    for (const c of rawChunks) {
      let trimmed = c.trim();
      while (trimmed.length > 120) {
        let cut = trimmed.lastIndexOf(" ", 120);
        if (cut < 30) cut = 120;
        chunks.push(trimmed.slice(0, cut));
        trimmed = trimmed.slice(cut).trim();
      }
      if (trimmed) chunks.push(trimmed);
    }
    if (!chunks.length) { resolve(false); return; }

    let i = 0;
    let anySuccess = false;

    const playNext = () => {
      if (i >= chunks.length) { resolve(anySuccess); return; }
      const chunk = chunks[i++];
      const url = `https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&tl=${tl}&q=${encodeURIComponent(chunk)}`;
      const audio = new Audio();
      audio.referrerPolicy = "no-referrer";
      state.currentAudio = audio;
      audio.playbackRate = effRate;

      let timer = null;
      const done = (ok) => {
        if (timer) clearTimeout(timer);
        if (state.currentAudio === audio) state.currentAudio = null;
        if (ok) anySuccess = true;
        playNext();
      };

      timer = setTimeout(() => done(false), 9000);
      audio.onended = () => done(true);
      audio.onerror = () => done(false);
      audio.src = url;
      audio.play().then(() => { anySuccess = true; }).catch(() => done(false));
    };

    playNext();
  });
}

async function speak(text, rate) {
  // Stop anything already playing so overlapping speak() calls never sound like two voices at once.
  speechSynthesis.cancel();
  if (state.currentAudio) { state.currentAudio.pause(); state.currentAudio = null; }
  const brand = LANG_META[state.lang].brand;
  setCaption(brand, text);
  if (state.ws) sendToServer({ type: "SET_CAPTION", speaker: brand, text });
  const avatar = document.getElementById("avatar");
  const effRate = rate || state.rate;
  avatar.classList.add("talking");
  if (state.ws) sendToServer({ type: "SET_STATE", state: "talking" });
  const finish = () => {
    avatar.classList.remove("talking");
    if (state.ws) sendToServer({ type: "SET_STATE", state: "idle" });
  };

  const spokenText = prepareSpeechText(text, state.lang);

  // 1. Try server's voice endpoint (Azure neural or server proxy)
  const audioUrl = await synthesizeViaServer(spokenText || text);
  if (audioUrl) {
    await new Promise((resolve) => {
      const audio = new Audio(audioUrl);
      audio.playbackRate = effRate;
      state.currentAudio = audio;
      const done = () => {
        if (state.currentAudio === audio) state.currentAudio = null;
        URL.revokeObjectURL(audioUrl);
        finish();
        resolve();
      };
      audio.onended = done;
      audio.onerror = done;
      audio.play().catch(done);
    });
    return;
  }

  // 2. Direct online TTS for Tamil, Telugu, and Hindi (works in any browser without server)
  const played = await playDirectTTS(spokenText || text, state.lang, effRate);
  if (played) {
    finish();
    return;
  }

  // 3. Fallback: local browser speechSynthesis
  await new Promise((resolve) => {
    const noVoiceNote = state.ta_voice ? "" : ` <i>${t("noVoiceNote")}</i>`;
    setCaption(brand, text + noVoiceNote);
    speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(spokenText || text);
    utter.lang = state.ta_voice ? state.ta_voice.lang : (LANG_META[state.lang]?.sttLang || "ta-IN");
    if (state.ta_voice) utter.voice = state.ta_voice;
    utter.rate = effRate;
    const startedAt = Date.now();
    const minDuration = Math.min(6000, Math.max(900, text.length * 70)) / effRate;
    let done = false;
    const localFinish = () => { finish(); resolve(); };
    const end = () => {
      if (done) return;
      done = true;
      clearTimeout(watchdog);
      const remaining = minDuration - (Date.now() - startedAt);
      if (remaining > 0) setTimeout(localFinish, remaining);
      else localFinish();
    };
    const watchdog = setTimeout(end, minDuration + 5000);
    utter.onend = end;
    utter.onerror = (e) => { console.error("Kural: speech synthesis error:", e.error); end(); };
    speechSynthesis.speak(utter);
  });
}

// ---- speech in ----
function listen() {
  return new Promise((resolve) => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) {
      console.warn("Kural: SpeechRecognition not available in this browser.");
      setCaption(LANG_META[state.lang].brand, t("noSpeechRecognition"));
      resolve("");
      return;
    }
    const avatar = document.getElementById("avatar");
    const rec = new SR();
    rec.lang = LANG_META[state.lang].sttLang;
    rec.interimResults = true;
    rec.maxAlternatives = 1;
    let resolved = false;
    let gotResult = false;
    const finish = (val) => { if (resolved) return; resolved = true; resolve(val); };
    avatar.classList.add("listening");
    if (state.ws) sendToServer({ type: "SET_STATE", state: "listening" });
    // Show the live transcript panel in listening mode
    showLiveTranscriptPanel(true);
    rec.onresult = (e) => {
      let interim = "", final = "";
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const r = e.results[i];
        if (r.isFinal) final += r[0].transcript;
        else interim += r[0].transcript;
      }
      if (final) {
        gotResult = true;
        const txt = final.trim();
        setCaption(LANG_META[state.lang].you, txt);
        if (state.ws) sendToServer({ type: "SET_CAPTION", speaker: LANG_META[state.lang].you, text: txt });
        finish(txt);
      } else if (interim) {
        // live, not-yet-final transcript — updates on screen as she speaks
        setCaption(LANG_META[state.lang].you, interim, true);
        if (state.ws) sendToServer({ type: "SET_CAPTION", speaker: LANG_META[state.lang].you, text: interim });
      }
    };
    rec.onerror = (e) => {
      console.error("Kural: speech recognition error:", e.error);
      if (e.error === "not-allowed" || e.error === "service-not-allowed") {
        setCaption(LANG_META[state.lang].brand, t("micNotAllowed"));
      } else if (e.error === "audio-capture") {
        setCaption(LANG_META[state.lang].brand, t("micNotAvailable"));
      } else if (e.error === "network") {
        setCaption(LANG_META[state.lang].brand, t("networkError"));
      }
    };
    rec.onend = () => {
      avatar.classList.remove("listening");
      if (state.ws) sendToServer({ type: "SET_STATE", state: "idle" });
      showLiveTranscriptPanel(false);
      if (!gotResult) finish("");
    };
    try {
      rec.start();
    } catch (e) {
      console.error("Kural: speech recognition failed to start:", e);
      avatar.classList.remove("listening");
      showLiveTranscriptPanel(false);
      finish("");
    }
  });
}

function showLiveTranscriptPanel(show) {
  const panel = document.getElementById("live-transcript");
  if (!panel) return;
  if (show) {
    panel.classList.add("listening-mode");
    document.getElementById("lt-speaker").textContent = LANG_META[state.lang].you;
    document.getElementById("lt-text").textContent = "...";
    document.getElementById("lt-text").className = "lt-pending";
    document.getElementById("lt-mic").classList.add("pulsing");
    panel.classList.add("active");
  } else {
    panel.classList.remove("listening-mode");
    document.getElementById("lt-mic").classList.remove("pulsing");
    // keep visible a moment so user sees final result
    setTimeout(() => {
      if (!panel.classList.contains("listening-mode")) panel.classList.remove("active");
    }, 2200);
  }
}

// "repeat"/"slower" voice commands, per language
const REPEAT_WORDS = { ta: "மீண்டும்", hi: "दोबारा", te: "మళ్ళీ" };
const SLOWER_WORDS = { ta: "மெதுவாக", hi: "धीरे", te: "నెమ్మదిగా" };

// ask = speak then listen, with repeat/slower support
async function ask(promptText) {
  while (true) {
    await speak(promptText);
    const transcript = (await listen()).trim();
    if (transcript.includes(REPEAT_WORDS[state.lang] || REPEAT_WORDS.ta)) continue;
    if (transcript.includes(SLOWER_WORDS[state.lang] || SLOWER_WORDS.ta)) { state.rate = 0.8; continue; }
    return transcript;
  }
}

// ---- matching ----
function matchSchemes(answers, schemes) {
  return schemes.filter((s) => {
    const r = s.rules;
    if (r.gender && answers.gender && r.gender !== answers.gender) return false;
    if (r.min_age != null && answers.age != null && answers.age < r.min_age) return false;
    if (r.max_age != null && answers.age != null && answers.age > r.max_age) return false;
    if (r.max_annual_income != null && answers.annual_income != null && answers.annual_income > r.max_annual_income) return false;
    if (r.widow_ok === false && answers.widow === true) return false;
    if (r.ration_card_required === true && answers.has_ration_card === false) return false;
    return true;
  }).slice(0, 3);
}

// Which fallback_questions keys can actually change the outcome for this set of schemes —
// e.g. asking about ration cards is pointless noise if none of the candidate schemes gate on it.
function relevantFallbackKeys(schemes) {
  const keys = new Set();
  schemes.forEach((s) => {
    const r = s.rules;
    if (r.min_age != null || r.max_age != null) keys.add("age");
    if (r.max_annual_income != null) keys.add("annual_income");
    if (r.widow_ok === false) keys.add("widow");
    if (r.ration_card_required === true) keys.add("has_ration_card");
  });
  return keys;
}

// For display: which of her answers are the actual reasons this scheme matched, so the
// card shows "why" instead of just a name — grounded in the same rule fields matchSchemes used.
function matchReasons(scheme, answers) {
  const r = scheme.rules;
  const reasons = [];
  if ((r.min_age != null || r.max_age != null) && answers.age != null) reasons.push(tf("criteriaAge", answers.age));
  if (r.max_annual_income != null && answers.annual_income != null) reasons.push(tf("criteriaIncome", answers.annual_income));
  if (r.ration_card_required === true && answers.has_ration_card != null) reasons.push(t(answers.has_ration_card ? "criteriaRationYes" : "criteriaRationNo"));
  if (r.widow_ok === false && answers.widow != null) reasons.push(t(answers.widow ? "criteriaWidowYes" : "criteriaWidowNo"));
  return reasons;
}

// Only fill in fields the first extraction left null — never clobber an already-known
// answer, except needed_categories which the clarifying follow-up is specifically meant to refine.
function mergeAnswers(base, extra) {
  const out = { ...base };
  for (const k in extra) {
    if (k === "needed_categories") { out[k] = extra[k]; continue; }
    if (out[k] == null && extra[k] != null) out[k] = extra[k];
  }
  return out;
}

// ---- Gemini extraction from her free-form answer (one call, no chat history) ----
// `schemes` (the loaded schemes.json) is optional-but-expected: when present, its scheme
// categories are built into the prompt so the model also tells us WHICH schemes she's
// actually asking about — that drives which follow-up questions we bother asking at all.
async function extractAnswersFromText(text, schemes) {
  const categories = (schemes && schemes.schemes || []).map((s) => `"${s.category}" = ${L(s.intent_description)}`);
  const categorySys = categories.length
    ? ` Also classify which of these she needs, by id, even if only implied: ${categories.join("; ")}. Return an array of matching category ids in "needed_categories" (empty array if unclear or she didn't say).`
    : "";
  const sys = "Extract whatever of these facts a woman mentions about herself, in any Indian language. Return ONLY JSON with keys age (number|null), gender (\"female\"|null), widow (boolean|null), annual_income (number|null), has_ration_card (boolean|null)." + categorySys + " Use null (or an empty array for needed_categories) for anything not mentioned.";
  try {
    if (!GEMINI_API_KEY) throw new Error("no key");
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text }] }],
          systemInstruction: { parts: [{ text: sys }] },
          generationConfig: { responseMimeType: "application/json" }
        })
      }
    );
    const data = await res.json();
    const parsed = JSON.parse(data.candidates[0].content.parts[0].text);
    if (!Array.isArray(parsed.needed_categories)) parsed.needed_categories = [];
    return parsed;
  } catch (e) {
    console.warn("Kural: Gemini extraction failed, using local fallback.", e);
    return {
      age: null,
      gender: null,
      widow: /விதவை|विधवा|వితంతువు/.test(text) || null,
      annual_income: null,
      has_ration_card: null,
      needed_categories: []
    };
  }
}

// ---- cards ----
function renderCards(matches, answers) {
  const cards = document.getElementById("cards");
  cards.innerHTML = "";
  matches.forEach((s, idx) => {
    const div = document.createElement("div");
    div.className = "card";
    const reasons = answers ? matchReasons(s, answers) : [];
    const reasonsHtml = reasons.length ? `<div class="criteria">${reasons.map((r) => `<span class="chip">${r}</span>`).join("")}</div>` : "";
    // Benefits in rupees pill — shown prominently on the card
    const benefitsHtml = (s.benefits && s.benefits.rupees)
      ? `<div class="benefits-pill"><span class="rupee-icon">💰</span><span class="rupee-text">${L(s.benefits.rupees)}</span></div>`
      : "";
    div.innerHTML = `<b>${idx + 1}. ${L(s.name)}</b><br><span class="card-summary">${L(s.summary)}</span>${benefitsHtml}${reasonsHtml}`;
    div.addEventListener("click", () => {
      if (state.resolvePick) { state.resolvePick(idx); state.resolvePick = null; }
    });
    cards.appendChild(div);
  });
}

const PICK_WORDS_BY_LANG = {
  ta: { "ஒன்று": 0, "ஒரு": 0, "இரண்டு": 1, "மூன்று": 2 },
  hi: { "एक": 0, "दो": 1, "तीन": 2 },
  te: { "ఒకటి": 0, "రెండు": 1, "మూడు": 2 }
};

async function waitForPick(matches) {
  // Announce each scheme name then immediately speak its rupees benefit
  for (let i = 0; i < matches.length; i++) {
    const s = matches[i];
    const namePart = `${i + 1}. ${L(s.name)}`;
    const benefitPart = (s.benefits && s.benefits.spoken) ? ` — ${L(s.benefits.spoken)}` : "";
    await speak(namePart + benefitPart);
  }
  const pickWords = PICK_WORDS_BY_LANG[state.lang] || PICK_WORDS_BY_LANG.ta;
  while (true) {
    const pickPromise = new Promise((resolve) => { state.resolvePick = resolve; });
    const voiceText = await ask(t("pickSchemePrompt"));
    if (!state.resolvePick) { return pickPromise; } // resolved by a card click meanwhile
    let idx = null;
    for (const w in pickWords) if (voiceText.includes(w)) idx = pickWords[w];
    if (idx == null) { const n = normalizeNumber(voiceText); if (n != null && n >= 1 && n <= matches.length) idx = n - 1; }
    if (idx != null && idx >= 0 && idx < matches.length) {
      state.resolvePick(idx);
      state.resolvePick = null;
      return pickPromise;
    }
  }
}

// ---- discovery flow ----
async function runDiscoveryFlow() {
  setStep(1);
  await pickTamilVoice();
  const res = await fetch("data/schemes.json");
  state.schemes = await res.json();
  document.getElementById("cards").innerHTML = "";

  const openAnswer = await ask(L(state.schemes.intro_question));
  setStatus(t("thinkingStatus"));
  let answers = await extractAnswersFromText(openAnswer, state.schemes);
  setStatus(null);
  if (answers.gender == null) answers.gender = "female";

  // Narrow to the scheme(s) her stated need actually points at — everything downstream
  // (which follow-ups get asked, which schemes get matched) works off this candidate set,
  // not the full scheme list, so she's never asked about criteria unrelated to what she asked for.
  const allSchemes = state.schemes.schemes;
  let candidateSchemes = allSchemes;
  if (answers.needed_categories && answers.needed_categories.length) {
    const filtered = allSchemes.filter((s) => answers.needed_categories.includes(s.category));
    if (filtered.length) candidateSchemes = filtered;
  }

  // Her open answer didn't make the need clear enough to narrow anything, and there's more
  // than one kind of scheme on offer — ask directly what she's here for, then re-extract
  // from the combined text (also catches any demographic facts she adds in passing).
  const distinctCategories = new Set(allSchemes.map((s) => s.category));
  if (candidateSchemes === allSchemes && distinctCategories.size > 1 && state.schemes.category_clarify_question) {
    const clarifyAnswer = await ask(L(state.schemes.category_clarify_question));
    setStatus(t("thinkingStatus"));
    const combined = await extractAnswersFromText(`${openAnswer}. ${clarifyAnswer}`, state.schemes);
    setStatus(null);
    answers = mergeAnswers(answers, combined);
    if (answers.needed_categories && answers.needed_categories.length) {
      const filtered = allSchemes.filter((s) => answers.needed_categories.includes(s.category));
      if (filtered.length) candidateSchemes = filtered;
    }
  }

  // Only ask the fallback questions that can actually change which of the candidate
  // schemes match — e.g. no point asking about ration cards for a scholarship-only candidate set.
  const relevant = relevantFallbackKeys(candidateSchemes);
  const fq = state.schemes.fallback_questions;
  if (relevant.has("age") && answers.age == null) {
    const txt = await ask(L(fq.age));
    answers.age = normalizeNumber(txt);
    if (answers.age != null) setCaption(LANG_META[state.lang].you, String(answers.age));
  }
  if (relevant.has("widow") && answers.widow == null) {
    const txt = await ask(L(fq.widow));
    answers.widow = /விதவை|विधवा|వితంతువు/.test(txt);
  }
  if (relevant.has("annual_income") && answers.annual_income == null) {
    const txt = await ask(L(fq.annual_income));
    answers.annual_income = normalizeNumber(txt);
    if (answers.annual_income != null) setCaption(LANG_META[state.lang].you, String(answers.annual_income));
  }
  if (relevant.has("has_ration_card") && answers.has_ration_card == null) {
    const txt = await ask(L(fq.has_ration_card));
    answers.has_ration_card = !/(இல்லை|கிடையாது|नहीं|లేదు)/.test(txt);
  }

  setStatus(t("searchingStatus"));
  let matches = matchSchemes(answers, candidateSchemes);
  // Her stated need narrowed the candidates but none of them actually fit her answers
  // (e.g. age out of range) — widen back to the full list rather than dead-ending her.
  if (matches.length === 0 && candidateSchemes !== allSchemes) matches = matchSchemes(answers, allSchemes);
  setStatus(null);

  if (matches.length === 0) {
    await speak(t("noMatchingScheme"));
    return;
  }

  setStep(2);
  renderCards(matches, answers);
  const pickedIdx = await waitForPick(matches);
  const picked = matches[pickedIdx];
  if (!picked) return;
  // Speak the choice confirmation along with exact rupee benefits
  const benefitSpoken = (picked.benefits && picked.benefits.spoken) ? ` ${L(picked.benefits.spoken)}` : "";
  await speak(`${t("youChose")} ${L(picked.name)}.${benefitSpoken}`);
  await runApplyFlow(picked);
}

// ---- real browser session on our server (drives the actual government page) ----
function connectServer() {
  return new Promise((resolve, reject) => {
    const wsUrl = `${getBackendBase().ws}/ws`;
    const ws = new WebSocket(wsUrl);
    ws.onopen = () => resolve(ws);
    ws.onerror = reject;
    ws.onmessage = (ev) => {
      const msg = JSON.parse(ev.data);
      if (msg.type === "FRAME") {
        document.getElementById("screencast").src = "data:image/jpeg;base64," + msg.data;
        return;
      }
      if (msg.type === "PORTAL_READY" && state.resolvePortalReady) { state.resolvePortalReady(msg.fields); state.resolvePortalReady = null; }
      if (msg.type === "APPLY_ERROR" && state.resolvePortalReady) { state.resolvePortalReady(null); state.resolvePortalReady = null; console.error("Kural: apply error:", msg.error); }
      if (msg.type === "STEP_COMPLETE" && state.resolveStepComplete) { state.resolveStepComplete(msg.found !== false); state.resolveStepComplete = null; }
      if (msg.type === "ADVANCE_READY" && state.resolveAdvance) { state.resolveAdvance(msg.found !== false); state.resolveAdvance = null; }
      if (msg.type === "SUCCESS" && state.resolveSuccessWatch) { state.resolveSuccessWatch(); state.resolveSuccessWatch = null; }
    };
  });
}

function sendToServer(payload) { state.ws.send(JSON.stringify(payload)); }

function validateValue(raw, validate) {
  if (!validate) return true;
  if (validate.startsWith("digits:")) {
    const spec = validate.split(":")[1];
    const digits = String(raw).replace(/[^0-9]/g, "");
    if (spec.includes("-")) { const [lo, hi] = spec.split("-").map(Number); return digits.length >= lo && digits.length <= hi; }
    return digits.length === parseInt(spec, 10);
  }
  try { return new RegExp(validate).test(raw); } catch (e) { return true; }
}

async function collectStepValue(step) {
  for (let attempt = 0; attempt < 3; attempt++) {
    const spokenPrompt = attempt === 0 ? L(step.prompt) : (L(step.help) || L(step.prompt));
    const raw = await ask(spokenPrompt);
    let value = raw;
    if (step.type === "number" || step.type === "otp" || step.type === "otp_split") {
      value = digitsFromSpeech(raw);
      // Show the parsed digits on screen instead of leaving the raw spoken words sitting
      // in the transcript.
      if (value) {
        setCaption(LANG_META[state.lang].you, value);
        if (state.ws) sendToServer({ type: "SET_CAPTION", speaker: LANG_META[state.lang].you, text: value });
      }
    } else if (step.type === "choice") {
      const opts = L(step.options);
      value = opts.find((o) => raw.includes(o)) || raw;
    }
    if (validateValue(value, step.validate)) return value;
    await speak(L(step.help) || L(step.prompt));
  }
  return null;
}

const CONFIRM_YES_RE_BY_LANG = {
  ta: /ஆம்|ஆமாம்|சரி|சரிதான்|ஓகே|correct|right|^yes\b|^ok(ay)?\b/i,
  hi: /हां|हाँ|सही|ठीक|correct|right|^yes\b|^ok(ay)?\b/i,
  te: /అవును|సరే|సరైనది|ఒప్పు|correct|right|^yes\b|^ok(ay)?\b/i
};
const CONFIRM_NO_RE_BY_LANG = {
  ta: /இல்லை|இல்ல|தவறு|தப்பு|wrong|^no\b/i,
  hi: /नहीं|गलत|wrong|^no\b/i,
  te: /కాదు|తప్పు|wrong|^no\b/i
};
function CONFIRM_YES_RE() { return CONFIRM_YES_RE_BY_LANG[state.lang] || CONFIRM_YES_RE_BY_LANG.ta; }
function CONFIRM_NO_RE() { return CONFIRM_NO_RE_BY_LANG[state.lang] || CONFIRM_NO_RE_BY_LANG.ta; }

// ---- learning ladder: Kural fills the first fields, guides the middle ones, then
// just watches while she completes the rest herself — and this ladder is PERSISTENT:
// it's driven by localStorage skill levels, not by position in one form, so mastery
// carries across sessions and across different government sites. ----
function toTypeItYourselfPrompt(promptObj) {
  const txt = (L(promptObj) || "").trim();
  const replacement = t("typeItYourselfReplace");
  // Tamil/Telugu/Hindi prompts are authored ending in "say it" phrasing; swap the verb for "type it yourself".
  if (/(சொல்லுங்கள்|बताइए|बोलिए|चెప్పండి)\.?$/.test(txt)) {
    return txt.replace(/(சொல்லுங்கள்|बताइए|बोलिए|చెప్పండి)\.?$/, replacement);
  }
  return txt + t("typeItYourselfFallbackSuffix");
}

async function waitForManualFill(step) {
  for (let attempt = 0; attempt < 2; attempt++) {
    const doneP = new Promise((resolve) => { state.resolveStepComplete = resolve; });
    sendToServer({ type: "WATCH_MANUAL", step: { ...step, waitForFilled: true }, timeoutMs: 45000 });
    const found = await doneP;
    if (found) return;
  }
}

// ---- Progression Pill in Top Navigation ----
function updateTopProgression(selfDone = 0, total = 0) {
  const progText = document.getElementById("prog-text");
  const progBadge = document.getElementById("prog-badge");
  if (!progText || !progBadge) return;

  const unit = { ta: "சுயமாக", hi: "खुद किया", te: "స్వయంగా" };
  const badgeLabels = {
    starter: { ta: "🏅 தொடக்கம்", hi: "🏅 शुरुआत", te: "🏅 ప్రారంభం" },
    bronze:  { ta: "🥉 வெண்கலம்", hi: "🥉 कांस्य", te: "🥉 కాంస్యం" },
    silver:  { ta: "🥈 வெள்ளி",   hi: "🥈 रजत",   te: "🥈 రజతం" },
    gold:    { ta: "🥇 தங்கம்",   hi: "🥇 स्वर्ण",   te: "🥇 స్వర్ణం" }
  };

  const l = state.lang || "ta";
  progText.textContent = `${selfDone} ${(unit[l] || unit.ta)}`;

  if (selfDone === 0) {
    progBadge.textContent = badgeLabels.starter[l] || badgeLabels.starter.ta;
  } else if (selfDone === 1) {
    progBadge.textContent = badgeLabels.bronze[l] || badgeLabels.bronze.ta;
  } else if (selfDone === 2) {
    progBadge.textContent = badgeLabels.silver[l] || badgeLabels.silver.ta;
  } else {
    progBadge.textContent = badgeLabels.gold[l] || badgeLabels.gold.ta;
  }
}

// ---- Live Ladder panel: visible initially and updated in real-time as each field is handled ----
function updateLiveLadder(ladder) {
  state.currentLadder = ladder || { auto: 0, guide: 0, solo: 0 };
  const panel = document.getElementById("live-ladder");
  if (!panel) return;
  panel.style.display = "block";
  const total = ladder ? (ladder.auto + ladder.guide + ladder.solo) : 0;
  const selfDone = ladder ? (ladder.guide + ladder.solo) : 0;

  if (total === 0) {
    const titles = {
      ta: "🪜 கற்கும் ஏணி: முதல் பகுதியை குரல் நிரப்பும், நடுவில் வழிகாட்டும், மீதியை நீங்களே செய்வீர்கள்!",
      hi: "🪜 सीखने की सीढ़ी: पहले फ़ील्ड आवाज़ भरेगी, बीच में मार्गदर्शन करेगी, बाकी आप खुद करेंगे!",
      te: "🪜 నేర్చుకునే నిచ్చెన: మొదటి విభాగం స్వరం నింపుతుంది, మధ్యలో మార్గదర్శనం చేస్తుంది, మిగిలినవి మీరే చేస్తారు!"
    };
    const titleEl = document.getElementById("ll-title");
    if (titleEl) titleEl.textContent = titles[state.lang] || titles.ta;
    const aEl = document.getElementById("ll-auto");
    const gEl = document.getElementById("ll-guide");
    const sEl = document.getElementById("ll-solo");
    if (aEl) aEl.style.flex  = "1";
    if (gEl) gEl.style.flex = "1";
    if (sEl) sEl.style.flex  = "1";

    const ac = document.getElementById("ll-chip-auto");
    const gc = document.getElementById("ll-chip-guide");
    const sc = document.getElementById("ll-chip-solo");
    if (ac) { ac.textContent = `🤖 ${t("badgeAutoLabel")}: 0`; ac.style.display = "inline-flex"; }
    if (gc) { gc.textContent = `🤝 ${t("badgeGuideLabel")}: 0`; gc.style.display = "inline-flex"; }
    if (sc) { sc.textContent = `⭐ ${t("badgeSoloLabel")}: 0`; sc.style.display = "inline-flex"; }
    updateTopProgression(0, 0);
    return;
  }

  const titleEl = document.getElementById("ll-title");
  if (titleEl) titleEl.textContent = badgeHeadline(selfDone);
  // Update bar segments as flex proportions
  const seg = (n) => Math.max(n / total, n > 0 ? 0.04 : 0);
  const aEl = document.getElementById("ll-auto");
  const gEl = document.getElementById("ll-guide");
  const sEl = document.getElementById("ll-solo");
  if (aEl) aEl.style.flex  = seg(ladder.auto);
  if (gEl) gEl.style.flex = seg(ladder.guide);
  if (sEl) sEl.style.flex  = seg(ladder.solo);

  // Update legend chips
  const ac = document.getElementById("ll-chip-auto");
  const gc = document.getElementById("ll-chip-guide");
  const sc = document.getElementById("ll-chip-solo");
  if (ac) { ac.textContent = `🤖 ${t("badgeAutoLabel")}: ${ladder.auto}`; ac.style.display = "inline-flex"; }
  if (gc) { gc.textContent = `🤝 ${t("badgeGuideLabel")}: ${ladder.guide}`; gc.style.display = "inline-flex"; }
  if (sc) { sc.textContent = `⭐ ${t("badgeSoloLabel")}: ${ladder.solo}`; sc.style.display = "inline-flex"; }
  updateTopProgression(selfDone, total);
}

function renderLadderBadge(ladder) {
  const selfDone = ladder.guide + ladder.solo;
  const total = ladder.auto + ladder.guide + ladder.solo;
  if (total === 0) return "";
  const seg = (n) => Math.max(n, 0.0001);
  return `
    <div class="card badge-card">
      <div class="badge-icon">🏅</div>
      <h3>${t("badgeTitle")}</h3>
      <p>${badgeHeadline(selfDone)}</p>
      <div class="ladder-bar">
        <div class="ladder-seg auto" style="flex:${seg(ladder.auto)}"></div>
        <div class="ladder-seg guide" style="flex:${seg(ladder.guide)}"></div>
        <div class="ladder-seg solo" style="flex:${seg(ladder.solo)}"></div>
      </div>
      <div class="ladder-legend">
        <span><i class="dot auto"></i>${t("badgeAutoLabel")}: ${ladder.auto}</span>
        <span><i class="dot guide"></i>${t("badgeGuideLabel")}: ${ladder.guide}</span>
        <span><i class="dot solo"></i>${t("badgeSoloLabel")}: ${ladder.solo}</span>
      </div>
    </div>`;
}

// Waits for `selector` to appear after she clicks something herself (Get OTP, Verify, ...).
// If it never shows up within one attempt (e.g. a mistyped captcha meant no OTP was ever sent),
// tell her clearly and give her another real attempt instead of silently waiting and then
// barging ahead as if nothing was wrong.
async function waitForAdvance(selector, retryHintObj) {
  for (let attempt = 0; attempt < 2; attempt++) {
    const advP = new Promise((resolve) => { state.resolveAdvance = resolve; });
    sendToServer({ type: "WATCH_APPEAR", selector, timeoutMs: 45000 });
    const found = await advP;
    if (found) return true;
    await speak((retryHintObj && L(retryHintObj)) || t("advanceDefaultHint"));
  }
  return false;
}

// ---- Editable Confirmation Card ----
// Shows the captured value in an editable input field and waits for the user
// to confirm (voice or button), edit manually, or re-record.
function showConfirmCard(step, rawValue, isDigitSequence) {
  return new Promise((resolve) => {
    const overlay = document.getElementById("confirm-overlay");
    const fieldLabel = document.getElementById("confirm-field-label");
    const fieldInput = document.getElementById("confirm-field-input");
    const btnConfirm = document.getElementById("confirm-btn-yes");
    const btnRetry = document.getElementById("confirm-btn-retry");

    fieldLabel.textContent = L(step.prompt).replace(/[?？]/g, "");
    fieldInput.value = rawValue || "";
    fieldInput.type = (step.type === "number" || step.type === "otp" || step.type === "otp_split") ? "tel" : "text";
    fieldInput.placeholder = isDigitSequence ? "0–9" : "...";

    // Cleanup helpers
    const cleanup = () => {
      overlay.classList.remove("active");
      btnConfirm.onclick = null;
      btnRetry.onclick = null;
    };

    btnConfirm.onclick = () => {
      const val = fieldInput.value.trim();
      cleanup();
      resolve({ action: "confirm", value: val || rawValue });
    };
    btnRetry.onclick = () => {
      cleanup();
      resolve({ action: "retry" });
    };

    overlay.classList.add("active");
    // Auto-focus the editable field so the user can start typing immediately
    setTimeout(() => fieldInput.focus(), 80);
  });
}

async function runStepWithConfirm(step) {
  const isDigitSequence = step.type === "number" || step.type === "otp" || step.type === "otp_split";
  let value = await collectStepValue(step);
  if (value == null) { await speak(t("skippingField")); return null; }

  // Show editable confirmation card — user can:
  //   • confirm as-is (button or voice "yes")
  //   • edit the field manually then confirm
  //   • hit retry to re-record from scratch
  let unclearCount = 0;
  while (true) {
    const spokenValue = isDigitSequence ? digitsToSpeech(value) : value;
    // Speak the confirmation prompt and simultaneously show the editable card
    const speakPromise = speak(`${t("youSaid")} ${spokenValue}. ${t("isThatRight")}`);
    const cardPromise = showConfirmCard(step, value, isDigitSequence);

    // Race: voice answer vs. button press
    // We listen AFTER speaking finishes to avoid mic catching our TTS output
    await speakPromise;
    const listenPromise = listen();
    const result = await Promise.race([
      listenPromise.then((txt) => ({ src: "voice", txt })),
      cardPromise.then((r) => ({ src: "card", ...r }))
    ]);

    // Dismiss card if voice answered first
    document.getElementById("confirm-overlay").classList.remove("active");

    if (result.src === "card") {
      if (result.action === "retry") {
        unclearCount = 0;
        value = await collectStepValue(step);
        if (value == null) { await speak(t("skippingField")); return null; }
        continue;
      }
      // User confirmed (possibly after editing)
      const finalValue = (result.value || "").trim() || value;
      // Log to the collected fields panel
      addToFieldLog(step, finalValue);
      return finalValue;
    }

    // Voice answer branch
    const confirm = result.txt || "";
    if (CONFIRM_YES_RE().test(confirm)) {
      addToFieldLog(step, value);
      return value;
    }
    if (CONFIRM_NO_RE().test(confirm)) {
      unclearCount = 0;
      value = await collectStepValue(step);
      if (value == null) { await speak(t("skippingField")); return null; }
      continue;
    }
    // Unclear — give up stalling after a few tries
    unclearCount++;
    if (unclearCount >= 3) { addToFieldLog(step, value); return value; }
    await speak(t("unclearRetry"));
  }
}

// ---- Collected Fields Log ----
// A live panel (visible alongside the screencast) showing every confirmed field
// so the user can see and manually edit what was entered.
const _fieldLog = []; // { step, value, inputEl }

function addToFieldLog(step, value) {
  // Update existing entry or add new
  const existing = _fieldLog.find((e) => e.step.id === step.id);
  if (existing) {
    existing.value = value;
    if (existing.inputEl) existing.inputEl.value = value;
    return;
  }
  _fieldLog.push({ step, value, inputEl: null });
  renderFieldLog();
}

function renderFieldLog() {
  const panel = document.getElementById("field-log");
  if (!panel) return;
  if (_fieldLog.length === 0) { panel.innerHTML = ""; panel.style.display = "none"; return; }
  panel.style.display = "block";
  panel.innerHTML = `
    <div class="fl-title">📋 ${state.lang === "hi" ? "भरे गए क्षेत्र" : state.lang === "te" ? "నింపిన ఫీల్డ్స్" : "நிரப்பிய புலங்கள்"}</div>
    <div class="fl-rows"></div>`;
  const rowsEl = panel.querySelector(".fl-rows");
  _fieldLog.forEach((entry, idx) => {
    const row = document.createElement("div");
    row.className = "fl-row";
    const label = L(entry.step.prompt).replace(/[?？]/g, "").trim();
    const isDigit = entry.step.type === "number" || entry.step.type === "otp" || entry.step.type === "otp_split";
    const inp = document.createElement("input");
    inp.type = isDigit ? "tel" : "text";
    inp.value = entry.value;
    inp.className = "fl-input";
    inp.addEventListener("change", () => {
      entry.value = inp.value.trim();
      // Attempt to re-fill the form field if WS is still open
      if (state.ws && entry.step.selector) {
        sendToServer({ type: "FILL", selector: entry.step.selector, value: entry.value });
        flashFormFill();
      }
    });
    entry.inputEl = inp;
    row.innerHTML = `<span class="fl-label">${label}</span>`;
    row.appendChild(inp);
    rowsEl.appendChild(row);
  });
}

function flashFormFill() {
  const sc = document.getElementById("screencast-wrap");
  if (!sc) return;
  sc.classList.add("flash-fill");
  setTimeout(() => sc.classList.remove("flash-fill"), 600);
}

function renderTakeaway(scheme, ladder) {
  const cards = document.getElementById("cards");
  cards.innerHTML = `
    <div class="card">
      <h3>${L(scheme.name)}</h3>
      <p><b>${t("documentsLabel")}</b></p>
      <ul>${L(scheme.documents).map((d) => `<li>📄 ${d}</li>`).join("")}</ul>
      <p><b>${t("whereToGoLabel")}</b> ${L(scheme.where_to_go)}</p>
      <button id="print-btn">${t("printBtn")}</button>
    </div>
    ${ladder ? renderLadderBadge(ladder) : ""}`;
  document.getElementById("print-btn").addEventListener("click", () => window.print());
}

// ---- Scam Shield ----
// Official government schemes only ever live on *.gov.in domains.
// If a portal_url is not on gov.in, warn the user aloud and refuse to auto-fill.
function isGovSite(url) {
  try {
    const hostname = new URL(url).hostname;
    return hostname.endsWith(".gov.in") || hostname === "gov.in";
  } catch (e) { return false; }
}

async function runScamShield(scheme) {
  const url = scheme.portal_url || "";
  if (isGovSite(url)) {
    // Hide any previous warning
    const shield = document.getElementById("scam-shield");
    if (shield) shield.style.display = "none";
    return true; // safe to proceed
  }
  // Non-gov site: warn prominently and refuse
  const scamWarnings = {
    ta: `⚠️ இந்த இணையதளம் அரசு .gov.in இணையதளம் அல்ல! யாரோ ஏமாற்ற முயற்சிக்கலாம். உண்மையான திட்டங்கள் ஒருபோதும் பணம் கேட்காது. இந்த படிவத்தை நான் நிரப்பமாட்டேன்.`,
    hi: `⚠️ यह वेबसाइट सरकारी .gov.in वेबसाइट नहीं है! कोई आपको धोखा देने की कोशिश कर सकता है। असली सरकारी योजनाएं कभी पैसे नहीं मांगतीं। मैं यह फॉर्म नहीं भरूंगी।`,
    te: `⚠️ ఈ వెబ్‌సైట్ ప్రభుత్వ .gov.in వెబ్‌సైట్ కాదు! ఎవరైనా మిమ్మల్ని మోసం చేయడానికి ప్రయత్నించవచ్చు. నిజమైన ప్రభుత్వ పథకాలు ఎప్పుడూ డబ్బు అడగవు. నేను ఈ ఫారాన్ని నింపను.`
  };
  const warningText = scamWarnings[state.lang] || scamWarnings.ta;
  const shield = document.getElementById("scam-shield");
  if (shield) {
    document.getElementById("scam-text").textContent = warningText;
    shield.style.display = "flex";
    setTimeout(() => { if (shield) shield.style.display = "none"; }, 12000);
  }
  await speak(warningText);
  return false; // do NOT proceed
}

async function runApplyFlow(scheme) {
  setStep(3);
  document.getElementById("cards").innerHTML = "";

  // ---- Scam Shield: refuse non-gov.in sites ----
  const isSafe = await runScamShield(scheme);
  if (!isSafe) return;

  await speak(`${L(scheme.name)}. ${t("openingForm")}`);
  document.getElementById("screencast-wrap").classList.add("active");
  setStatus(t("connectingServer"));

  state.ws = await connectServer().catch(() => null);
  if (!state.ws) {
    setStatus(null);
    const serverNotice = {
      ta: "அரசு இணையதளத்தை நேரலையாக திறக்க Kural சேவையகம் தேவை. முனையத்தில் (Terminal) 'node server/server.js' இயக்கவும்.",
      hi: "सरकारी पोर्टल खोलने के लिए Kural सर्वर आवश्यक है। टर्मिनल में 'node server/server.js' चलाएं।",
      te: "ప్రభుత్వ పోర్టల్ తెరవడానికి Kural సర్వర్ అవసరం. టెర్మినల్‌లో 'node server/server.js' రన్ చేయండి."
    };
    const helpMsg = serverNotice[state.lang] || serverNotice.ta;
    const notice = document.getElementById("sc-notice");
    if (notice) {
      notice.innerHTML = `
        <div class="shb-icon">🌐</div>
        <h3>${t("serverConnectError")}</h3>
        <p>${helpMsg}</p>
        <div class="shb-cmd"><code>node server/server.js</code></div>
        <p class="shb-hint">சேவையகம் இயங்கியதும் <b>http://localhost:8787</b> அல்லது இந்த பக்கத்தில் மீண்டும் முயற்சிக்கவும்.</p>`;
      notice.style.display = "flex";
    }
    await speak(`${t("serverConnectError")}. ${helpMsg}`);
    return;
  }

  const notice = document.getElementById("sc-notice");
  if (notice) notice.style.display = "none";

  setStatus(t("openingPortal"));
  const portalReadyP = new Promise((resolve) => { state.resolvePortalReady = resolve; });
  sendToServer({ type: "START_APPLY", schemeId: scheme.id, lang: state.lang });
  const fields = await portalReadyP;
  setStatus(null);
  if (!fields) {
    if (notice) {
      notice.innerHTML = `
        <div class="shb-icon">⚠️</div>
        <h3>${t("portalOpenError")}</h3>
        <p>இணைய இணைப்பு அல்லது அரசு சேவையக பதில் தாமதம் காரணமாக பக்கம் திறக்கவில்லை.</p>
        <p class="shb-hint">URL: <b>${scheme.portal_url}</b></p>`;
      notice.style.display = "flex";
    }
    await speak(t("portalOpenError"));
    return;
  }

  await speak(t("formReadyLadderIntro"));
  const collected = {};

  // Learning ladder zones are driven by PERSISTENT skill level per field category, not by
  // position in this one form — so a field kind she's mastered before (on any scheme) goes
  // straight to solo mode here too.
  const LADDER_TYPES = ["text", "number"];
  const skills = loadSkills();
  const skillsBefore = { ...skills };
  const ladder = { auto: 0, guide: 0, solo: 0 };
  // Show the live ladder immediately (all zeros initially)
  updateLiveLadder(ladder);

  for (const step of fields.steps) {
    if (step.type === "review") {
      const lines = fields.steps
        .filter((s) => collected[s.id] != null)
        .map((s) => {
          const isDigitSequence = s.type === "number" || s.type === "otp" || s.type === "otp_split";
          const spokenValue = isDigitSequence ? digitsToSpeech(collected[s.id]) : collected[s.id];
          return `${L(s.prompt).replace(/[?？]/g, "")}: ${spokenValue}`;
        })
        .join(". ");
      let confirmed = false;
      for (let unclearCount = 0; unclearCount < 3 && !confirmed; unclearCount++) {
        const confirm = await listen();
        if (CONFIRM_YES_RE().test(confirm)) { confirmed = true; break; }
        if (CONFIRM_NO_RE().test(confirm)) break;
        await speak(t("unclearRetry"));
      }
      if (confirmed) {
        await speak(t("pressSubmitYourself"));
        const successP = new Promise((resolve) => { state.resolveSuccessWatch = resolve; });
        sendToServer({ type: "WATCH_SUCCESS", selector: fields.success_selector });
        await successP;
        await speak(t("applicationSuccess"));
        renderTakeaway(scheme, ladder);
      } else {
        await speak(t("reviewNotConfirmed"));
        renderTakeaway(scheme, ladder);
      }
      continue;
    }
    if (["captcha", "face", "fingerprint"].includes(step.type)) {
      ladder.solo++; // always her own work, by design
      updateLiveLadder(ladder);
      await speak(L(step.prompt));
      sendToServer({ type: "HIGHLIGHT", selector: step.selector });
      if (step.wait_for_appear) {
        await waitForAdvance(step.wait_for_appear);
      } else {
        const doneP = new Promise((resolve) => { state.resolveStepComplete = resolve; });
        sendToServer({ type: "WATCH_MANUAL", step });
        await doneP;
      }
      continue;
    }

    const category = step.selector && LADDER_TYPES.includes(step.type) ? skillCategoryOf(step) : null;
    const zone = category ? zoneForSkill(skills[category]) : undefined;

    if (zone === "guide" || zone === "solo") {
      ladder[zone]++;
      updateLiveLadder(ladder);
      sendToServer({ type: "HIGHLIGHT", selector: step.selector });
      if (zone === "guide") {
        await speak(toTypeItYourselfPrompt(step.prompt));
      } else {
        await speak(t("nextFillYourself"));
      }
      await waitForManualFill(step);
      if (category) { skills[category]++; saveSkills(skills); }
      continue;
    }

    ladder.auto++;
    updateLiveLadder(ladder);
    if (step.type === "otp" || step.type === "otp_split") await speak(t("otpSentNotice"));
    const value = await runStepWithConfirm(step);
    if (value != null) {
      collected[step.id] = value;
      if (step.type === "otp_split") sendToServer({ type: "FILL_SPLIT", selectors: step.selectors, value });
      else {
        const selector = step.radio_map ? step.radio_map[value] : step.selector;
        if (selector) sendToServer({ type: "FILL", selector, value });
      }
    }
    if (step.wait_for_appear) {
      await speak((step.advance_hint && L(step.advance_hint)) || t("advanceButtonDefault"));
      await waitForAdvance(step.wait_for_appear, step.advance_hint);
    }
  }
}

// ---- wiring ----
document.getElementById("start-btn").addEventListener("click", (e) => {
  e.target.classList.add("hidden");
  runDiscoveryFlow();
});

function clearAll() {
  speechSynthesis.cancel();
  if (state.currentAudio) { state.currentAudio.pause(); state.currentAudio = null; }
  if (state.ws) { state.ws.close(); state.ws = null; }
  state.resolvePick = null;
  state.resolvePortalReady = null;
  state.resolveStepComplete = null;
  state.resolveAdvance = null;
  state.resolveSuccessWatch = null;
  state.rate = 1;
  document.getElementById("screencast-wrap").classList.remove("active");
  document.getElementById("caption").innerHTML = "";
  document.getElementById("cards").innerHTML = "";
  document.getElementById("avatar").classList.remove("talking", "listening");
  document.getElementById("start-btn").classList.remove("hidden");
  document.getElementById("confirm-overlay").classList.remove("active");
  document.getElementById("live-transcript").classList.remove("active", "listening-mode");
  // Reset progression ladder to initial state (remains visible initially)
  updateLiveLadder({ auto: 0, guide: 0, solo: 0 });
  const scamShield = document.getElementById("scam-shield");
  if (scamShield) scamShield.style.display = "none";
  const fieldLog = document.getElementById("field-log");
  if (fieldLog) { fieldLog.innerHTML = ""; fieldLog.style.display = "none"; }
  _fieldLog.length = 0;
  setInteractiveMode(false);
  setStatus(null);
  setStep(0);
}

document.getElementById("clear-btn").addEventListener("click", clearAll);

// =====================================================================
// INTERACTIVE SCREENCAST MODULE
// Renders live JPEG frames onto a <canvas> and forwards mouse/touch/
// keyboard events to the server-side Playwright browser via WebSocket.
// =====================================================================
(function () {
  // The Playwright headless browser viewport is fixed at 1024×768.
  const VP_W = 1024, VP_H = 768;

  const canvas   = document.getElementById("screencast-canvas");
  const ctx      = canvas.getContext("2d");
  const overlay  = document.getElementById("sc-overlay");
  const cursor   = document.getElementById("sc-cursor");
  const keySink  = document.getElementById("sc-key-sink");
  const toolbar  = document.getElementById("sc-toolbar");
  const modeBtn  = document.getElementById("sc-interact-btn");
  const modeBadge = document.getElementById("sc-mode-badge");
  const kbHint   = document.getElementById("sc-keyboard-hint");

  let interactiveMode = false;
  let isKeyboardActive = false;

  // ---- Frame rendering ----
  // The existing WebSocket handler already writes new src to #screencast (hidden img).
  // We watch that and paint it onto the canvas so we get a pixel-perfect copy that
  // also accepts pointer events.
  const hiddenImg = document.getElementById("screencast");

  // Intercept the FRAME messages: instead of updating hiddenImg.src we paint directly.
  // We monkey-patch the ws message handler after the WS is connected.
  // The canvas size tracks the screencast-wrap width so it scales correctly.
  function resizeCanvas() {
    const wrap = document.getElementById("sc-container");
    if (!wrap) return;
    const w = wrap.clientWidth || VP_W;
    canvas.width  = w;
    canvas.height = Math.round(w * VP_H / VP_W);
  }
  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  // Decode a base64 JPEG frame and draw it on the canvas.
  function paintFrame(b64) {
    const img = new Image();
    img.onload = () => {
      resizeCanvas();
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    };
    img.src = "data:image/jpeg;base64," + b64;
  }

  // Hook into the connectServer WebSocket after it's opened so we can intercept FRAME.
  // We wrap the original onmessage rather than replacing it so all other message types
  // still work normally.
  const _origConnectServer = window.connectServer;
  window.connectServer = async function () {
    const ws = await _origConnectServer.apply(this, arguments);
    if (!ws) return ws;
    const originalOnMessage = ws.onmessage;
    ws.onmessage = (ev) => {
      const msg = JSON.parse(ev.data);
      if (msg.type === "FRAME") {
        paintFrame(msg.data);
        // Also update the hidden img so the rest of the code that reads it still works
        hiddenImg.src = "data:image/jpeg;base64," + msg.data;
        return; // don't call original — it would set src redundantly
      }
      if (originalOnMessage) originalOnMessage.call(ws, ev);
    };
    return ws;
  };

  // ---- Coordinate mapping ----
  // Convert a pointer event position (relative to canvas) to Playwright viewport coords.
  function toVP(clientX, clientY) {
    const rect = canvas.getBoundingClientRect();
    const scaleX = VP_W / rect.width;
    const scaleY = VP_H / rect.height;
    return {
      x: Math.max(0, Math.min(VP_W,  (clientX - rect.left) * scaleX)),
      y: Math.max(0, Math.min(VP_H,  (clientY - rect.top)  * scaleY))
    };
  }

  // ---- Send helpers ----
  function send(payload) {
    if (state.ws && state.ws.readyState === WebSocket.OPEN) {
      state.ws.send(JSON.stringify(payload));
    }
  }

  function cdpModifiers(e) {
    return (e.altKey ? 1 : 0) | (e.ctrlKey ? 2 : 0) | (e.metaKey ? 4 : 0) | (e.shiftKey ? 8 : 0);
  }

  // ---- Mouse events ----
  function onPointerDown(e) {
    e.preventDefault();
    if (!interactiveMode || !state.ws) return;
    activateKeyboard();
    const { x, y } = toVP(e.clientX, e.clientY);
    send({ type: "POINTER_DOWN", x, y, button: e.button === 2 ? "right" : "left", modifiers: cdpModifiers(e) });
  }

  function onPointerUp(e) {
    e.preventDefault();
    if (!interactiveMode || !state.ws) return;
    const { x, y } = toVP(e.clientX, e.clientY);
    send({ type: "POINTER_UP", x, y, button: e.button === 2 ? "right" : "left", modifiers: cdpModifiers(e) });
  }

  function onPointerMove(e) {
    if (!interactiveMode || !state.ws) return;
    const { x, y } = toVP(e.clientX, e.clientY);
    // Move custom cursor
    const rect = canvas.getBoundingClientRect();
    cursor.style.left = (e.clientX - rect.left) + "px";
    cursor.style.top  = (e.clientY - rect.top)  + "px";
    cursor.style.display = "block";
    send({ type: "POINTER_MOVE", x, y, modifiers: cdpModifiers(e) });
  }

  function onPointerLeave() {
    cursor.style.display = "none";
  }

  function onWheel(e) {
    e.preventDefault();
    if (!interactiveMode || !state.ws) return;
    const { x, y } = toVP(e.clientX, e.clientY);
    send({ type: "SCROLL", x, y, deltaX: e.deltaX, deltaY: e.deltaY });
  }

  // Touch → mouse mapping for mobile
  function touchToMouse(e, mouseType) {
    e.preventDefault();
    if (!interactiveMode || !state.ws) return;
    const t = e.changedTouches[0];
    const { x, y } = toVP(t.clientX, t.clientY);
    const btn = "left";
    if (mouseType === "move") {
      cursor.style.left = (t.clientX - canvas.getBoundingClientRect().left) + "px";
      cursor.style.top  = (t.clientY - canvas.getBoundingClientRect().top)  + "px";
      cursor.style.display = "block";
      send({ type: "POINTER_MOVE", x, y, modifiers: 0 });
    } else if (mouseType === "down") {
      activateKeyboard();
      send({ type: "POINTER_DOWN", x, y, button: btn, modifiers: 0 });
    } else {
      send({ type: "POINTER_UP", x, y, button: btn, modifiers: 0 });
    }
  }

  // ---- Keyboard events ----
  // We route all keyboard input through a hidden <input> (keySink) so the browser
  // handles IME, on-screen keyboards, and special keys correctly on all platforms.
  function activateKeyboard() {
    isKeyboardActive = true;
    keySink.focus();
    keySink.value = "";
    kbHint.style.display = "inline";
    overlay.classList.add("keyboard-active");
  }

  function deactivateKeyboard() {
    isKeyboardActive = false;
    keySink.blur();
    kbHint.style.display = "none";
    overlay.classList.remove("keyboard-active");
  }

  keySink.addEventListener("keydown", (e) => {
    if (!interactiveMode || !state.ws) return;
    if (e.key === "Escape") { deactivateKeyboard(); return; }
    e.stopPropagation(); // don't trigger app-level shortcuts
    const text = (e.key.length === 1) ? e.key : "";
    send({ type: "KEY_DOWN", key: e.key, code: e.code, modifiers: cdpModifiers(e), text });
  });

  keySink.addEventListener("keyup", (e) => {
    if (!interactiveMode || !state.ws) return;
    e.stopPropagation();
    send({ type: "KEY_UP", key: e.key, code: e.code, modifiers: cdpModifiers(e) });
    keySink.value = ""; // keep it empty so it never actually shows typed chars
  });

  // On mobile, input event fires for soft keyboard — forward each character
  keySink.addEventListener("input", (e) => {
    if (!interactiveMode || !state.ws) return;
    const text = keySink.value;
    for (const ch of text) {
      send({ type: "KEY_DOWN", key: ch, code: "Key" + ch.toUpperCase(), modifiers: 0, text: ch });
      send({ type: "KEY_UP",   key: ch, code: "Key" + ch.toUpperCase(), modifiers: 0 });
    }
    keySink.value = "";
  });

  // ---- Right-click context menu pass-through ----
  overlay.addEventListener("contextmenu", (e) => {
    e.preventDefault();
    if (!interactiveMode || !state.ws) return;
    const { x, y } = toVP(e.clientX, e.clientY);
    send({ type: "POINTER_DOWN", x, y, button: "right", modifiers: cdpModifiers(e) });
    send({ type: "POINTER_UP",   x, y, button: "right", modifiers: cdpModifiers(e) });
  });

  // ---- Toggle interactive mode ----
  function setInteractiveMode(on) {
    interactiveMode = on;
    overlay.style.display = on ? "block" : "none";
    cursor.style.display = "none";
    if (on) {
      overlay.addEventListener("pointerdown",  onPointerDown);
      overlay.addEventListener("pointerup",    onPointerUp);
      overlay.addEventListener("pointermove",  onPointerMove);
      overlay.addEventListener("pointerleave", onPointerLeave);
      overlay.addEventListener("wheel",        onWheel, { passive: false });
      overlay.addEventListener("touchstart",   (e) => touchToMouse(e, "down"),  { passive: false });
      overlay.addEventListener("touchmove",    (e) => touchToMouse(e, "move"),  { passive: false });
      overlay.addEventListener("touchend",     (e) => touchToMouse(e, "up"),    { passive: false });
      modeBtn.classList.add("active");
      modeBadge.textContent = "🖱️ இடைவினை";
      modeBadge.classList.add("interactive");
      document.getElementById("screencast-wrap").classList.add("interactive");
    } else {
      overlay.removeEventListener("pointerdown",  onPointerDown);
      overlay.removeEventListener("pointerup",    onPointerUp);
      overlay.removeEventListener("pointermove",  onPointerMove);
      overlay.removeEventListener("pointerleave", onPointerLeave);
      overlay.removeEventListener("wheel",        onWheel);
      deactivateKeyboard();
      modeBtn.classList.remove("active");
      modeBadge.textContent = "👁 கவனி";
      modeBadge.classList.remove("interactive");
      document.getElementById("screencast-wrap").classList.remove("interactive");
    }
  }

  // Expose so clearAll can call it
  window.setInteractiveMode = setInteractiveMode;

  modeBtn.addEventListener("click", () => {
    if (!state.ws) return; // only meaningful when a session is live
    setInteractiveMode(!interactiveMode);
  });

  // Keep keySink invisible but focusable
  keySink.style.cssText = `
    position: absolute; opacity: 0; pointer-events: none;
    width: 1px; height: 1px; top: 0; left: 0;
    font-size: 16px; /* prevent iOS zoom */
  `;
})();


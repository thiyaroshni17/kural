FROM node:20-bookworm-slim

WORKDIR /app

COPY server/package.json server/package-lock.json ./server/
RUN cd server \
  && npm ci --omit=dev \
  && npx playwright install --with-deps chromium

COPY . .

ENV NODE_ENV=production
EXPOSE 8787

CMD ["node", "server/server.js"]

# Click Group website: Next.js + Payload CMS (SQLite), standalone server build.
FROM node:24-bookworm-slim AS deps
WORKDIR /app
COPY package.json package-lock.json .npmrc* ./
RUN npm ci

FROM node:24-bookworm-slim AS build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
# Build-time values only; the real secret and URLs come from the runtime env.
ENV PAYLOAD_SECRET=build-time-placeholder DATABASE_URL=file:/tmp/build.db
RUN NODE_OPTIONS="--no-deprecation --max-old-space-size=6000" npx next build

FROM node:24-bookworm-slim AS run
WORKDIR /app
ENV NODE_ENV=production NEXT_TELEMETRY_DISABLED=1 PORT=3000 HOSTNAME=0.0.0.0
RUN groupadd -g 1001 web && useradd -u 1001 -g web -m web \
  && mkdir -p /app/data /app/media && chown web:web /app/data /app/media
COPY --from=build --chown=web:web /app/public ./public
COPY --from=build --chown=web:web /app/.next/standalone ./
COPY --from=build --chown=web:web /app/.next/static ./.next/static
# Default-content photos, used only if the site starts on an empty database.
COPY --from=build --chown=web:web /app/src/seed/images ./src/seed/images
USER web
EXPOSE 3000
# Database in /app/data, uploads in /app/media: both are volumes.
CMD ["node", "server.js"]

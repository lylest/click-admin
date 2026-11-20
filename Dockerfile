# Click Group website: Next.js + Payload CMS (SQLite), standalone server build.
# Needs BuildKit (docker-buildx): the cache mounts keep npm's download cache and
# Next's build cache between builds. Install and build share one stage so
# node_modules is never copied between stages (that copy took 15+ minutes on
# the legacy builder); only the small standalone output reaches the final image.
FROM node:24-bookworm-slim AS build
WORKDIR /app
COPY package.json package-lock.json .npmrc* ./
RUN --mount=type=cache,target=/root/.npm npm ci --prefer-offline --no-audit --no-fund
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
# Build-time values only; the real secret and URLs come from the runtime env.
ENV PAYLOAD_SECRET=build-time-placeholder DATABASE_URL=file:/tmp/build.db
RUN --mount=type=cache,target=/app/.next/cache \
  NODE_OPTIONS="--no-deprecation --max-old-space-size=6000" npx next build

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

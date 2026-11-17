#!/usr/bin/env bash
# Click Group domain cutover. Run as root on this server.
#
#   clickgroup.co.tz      Click Meter app  ->  Click Group website
#   app.clickgroup.co.tz  (new)            ->  Click Meter app
#   cms.clickgroup.co.tz  (new)            ->  website CMS (redirects to /admin)
#   api.clickgroup.co.tz  unchanged
#
# Order matters: the app leaves clickgroup.co.tz before the website takes it,
# so Traefik never has two routers for the same host. Any failed check rolls
# everything back (rollback.sh). DRY_RUN=1 shows the changes without making them.
set -uo pipefail

APP_DIR=/home/huduma/clickmeter/click_meter/deploy
SITE_DIR=/home/huduma/clickgroup-site/deploy
LOG=$SITE_DIR/cutover.log
STAMP=$(date -u +%Y%m%dT%H%M%SZ)
DRY=${DRY_RUN:-0}

log() { echo "[$(date -u +%H:%M:%SZ)] $*" | tee -a "$LOG"; }

# HTTP status/body through the local Traefik (no DNS or Cloudflare involved).
probe() { curl -sk -o /dev/null -w '%{http_code}' --max-time 15 --resolve "$1:443:127.0.0.1" "https://$1$2"; }
body() { curl -sk --max-time 15 --resolve "$1:443:127.0.0.1" "https://$1$2"; }
wait_for() { # host path expect-substring-in-body tries
  for _ in $(seq 1 "$4"); do body "$1" "$2" | grep -q "$3" && return 0; sleep 5; done; return 1
}

new_env() { # print the app .env with the new values
  sed -e 's#^WEB_HOST=.*#WEB_HOST=app.clickgroup.co.tz#' \
      -e 's#^SITE_URL=.*#SITE_URL=https://app.clickgroup.co.tz#' \
      -e '/^ALLOWED_ORIGINS=/{/app\.clickgroup\.co\.tz/!s#$#,https://app.clickgroup.co.tz#}' \
      "$APP_DIR/.env"
}

log "=== cutover start ($STAMP) dry_run=$DRY"
if [ "$DRY" = 1 ]; then
  log "app .env changes:"; diff <(cat "$APP_DIR/.env") <(new_env) | grep '^[<>]' | sed -E 's/(=[^,]{0,60}).*/\1/' | tee -a "$LOG"
  log "website: ROUTES_ENABLED false -> true"
  log "pre-checks: apex=$(probe clickgroup.co.tz /) api=$(probe api.clickgroup.co.tz /) site-health=$(docker inspect -f '{{.State.Health.Status}}' clickgroup-site-web-1)"
  exit 0
fi

# 0. Pre-checks: website ready, app currently healthy.
[ "$(docker inspect -f '{{.State.Health.Status}}' clickgroup-site-web-1 2>/dev/null)" = healthy ] \
  || { log "ABORT: website container is not healthy; nothing changed"; exit 1; }

# 1. Back up both env files.
cp -p "$APP_DIR/.env" "$APP_DIR/.env.bak-cutover-$STAMP"
cp -p "$SITE_DIR/.env" "$SITE_DIR/.env.bak-cutover-$STAMP"
echo "$STAMP" > "$SITE_DIR/.last-cutover"
log "backups: .env.bak-cutover-$STAMP (app and website)"

# 2. Move the app to app.clickgroup.co.tz (recreates frontend + backend only).
new_env > "$APP_DIR/.env.new" && chmod --reference="$APP_DIR/.env" "$APP_DIR/.env.new" \
  && chown --reference="$APP_DIR/.env" "$APP_DIR/.env.new" && mv "$APP_DIR/.env.new" "$APP_DIR/.env"
(cd "$APP_DIR" && docker compose up -d --no-deps --no-build frontend backend) >>"$LOG" 2>&1 \
  || { log "FAIL: app recreate"; "$SITE_DIR/rollback.sh"; exit 1; }
log "app moved; waiting for app.clickgroup.co.tz"

# 3. Put the website on clickgroup.co.tz and cms.clickgroup.co.tz.
sed -i 's#^ROUTES_ENABLED=.*#ROUTES_ENABLED=true#' "$SITE_DIR/.env"
(cd "$SITE_DIR" && docker compose up -d) >>"$LOG" 2>&1 \
  || { log "FAIL: website recreate"; "$SITE_DIR/rollback.sh"; exit 1; }

# 4. Checks (certificates for the new names can take a minute).
ok=1
wait_for app.clickgroup.co.tz / '<div id="root"' 36 && log "OK app.clickgroup.co.tz serves the app" || { log "FAIL app.clickgroup.co.tz"; ok=0; }
wait_for clickgroup.co.tz / 'Click Group | Prepaid utility' 24 && log "OK clickgroup.co.tz serves the website" || { log "FAIL clickgroup.co.tz"; ok=0; }
c=$(probe cms.clickgroup.co.tz /); [[ "$c" =~ ^30[1278]$ ]] && log "OK cms.clickgroup.co.tz redirects ($c)" || { log "FAIL cms.clickgroup.co.tz ($c)"; ok=0; }
c=$(probe cms.clickgroup.co.tz /admin/login); [ "$c" = 200 ] && log "OK CMS login page" || { log "FAIL CMS login ($c)"; ok=0; }
c=$(probe api.clickgroup.co.tz /); [ "$c" != 000 ] && [ "${c:0:1}" != 5 ] && log "OK api unchanged ($c)" || { log "FAIL api ($c)"; ok=0; }

if [ $ok = 1 ]; then
  log "=== cutover done"
else
  log "=== checks failed: rolling back"; "$SITE_DIR/rollback.sh"; exit 1
fi

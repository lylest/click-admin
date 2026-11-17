#!/usr/bin/env bash
# Undo cutover.sh: the app goes back to clickgroup.co.tz, the website goes private.
set -uo pipefail
APP_DIR=/home/huduma/clickmeter/click_meter/deploy
SITE_DIR=/home/huduma/clickgroup-site/deploy
LOG=$SITE_DIR/cutover.log
log() { echo "[$(date -u +%H:%M:%SZ)] rollback: $*" | tee -a "$LOG"; }
STAMP=$(cat "$SITE_DIR/.last-cutover" 2>/dev/null) || { log "no cutover recorded"; exit 1; }

# Website off the public hosts first, so the apex is free again.
sed -i 's#^ROUTES_ENABLED=.*#ROUTES_ENABLED=false#' "$SITE_DIR/.env"
(cd "$SITE_DIR" && docker compose up -d) >>"$LOG" 2>&1
cp -p "$APP_DIR/.env.bak-cutover-$STAMP" "$APP_DIR/.env"
(cd "$APP_DIR" && docker compose up -d --no-deps --no-build frontend backend) >>"$LOG" 2>&1
for _ in $(seq 1 24); do
  curl -sk --max-time 10 --resolve clickgroup.co.tz:443:127.0.0.1 https://clickgroup.co.tz/ | grep -q '<div id="root"' && { log "app back on clickgroup.co.tz"; exit 0; }
  sleep 5
done
log "WARNING: app not answering on clickgroup.co.tz yet; check docker ps"; exit 1

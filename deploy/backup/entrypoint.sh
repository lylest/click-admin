#!/bin/sh
# Daily scheduler (same design as the clickmeter backup): a sleep loop, logs in
# `docker compose logs backup`. Arguments run a command instead (restore etc.).
set -eu
[ "$#" -gt 0 ] && exec "$@"
HOUR=${BACKUP_HOUR_UTC:-2}
BACKUP_DIR=${BACKUP_DIR:-/backups}
mkdir -p "$BACKUP_DIR"
echo "[backup] scheduler started; daily backup at ${HOUR}:00 UTC"
if ! find "$BACKUP_DIR" -name 'clickgroup-site-*.tar.gz' -mtime -1 | grep -q .; then
  echo "[backup] no backup in the last 24h, taking one now"
  /backup.sh || echo "[backup] startup backup failed; will retry on schedule" >&2
fi
while true; do
  now=$(( $(date -u +%-H) * 3600 + $(date -u +%-M) * 60 + $(date -u +%-S) ))
  wait=$(( HOUR * 3600 - now )); [ "$wait" -le 0 ] && wait=$(( wait + 86400 ))
  echo "[backup] next backup in $(( wait / 3600 ))h $(( (wait % 3600) / 60 ))m"
  sleep "$wait"
  /backup.sh || echo "[backup] backup failed; will retry tomorrow" >&2
done

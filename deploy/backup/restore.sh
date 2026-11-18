#!/bin/sh
# Restore the website from a backup. Stop the site first:
#   docker compose stop web
#   docker compose run --rm backup /restore.sh --list          (local + remote)
#   docker compose run --rm backup /restore.sh <file.tar.gz>   (local or remote)
#   docker compose start web
set -eu
. /s3.sh
BACKUP_DIR=${BACKUP_DIR:-/backups}

if [ "${1:-}" = --list ] || [ -z "${1:-}" ]; then
  echo "Local:"; ls -1 "$BACKUP_DIR" 2>/dev/null | grep 'clickgroup-site-' || echo "  (none)"
  if s3_configured; then echo "Remote:"; s3_list | grep 'clickgroup-site-' || echo "  (none)"; fi
  exit 0
fi

file="$BACKUP_DIR/$1"
if [ ! -f "$file" ]; then
  s3_configured || { echo "not found locally and no object storage configured" >&2; exit 1; }
  echo "downloading $1"; s3_get "$1" "$file"
fi
gzip -t "$file"
work=$(mktemp -d); tar -xzf "$file" -C "$work"
[ "$(sqlite3 "$work/clickgroup.db" 'pragma integrity_check;')" = ok ] || { echo "backup database is damaged" >&2; exit 1; }

# Keep what is there now, in case the restore was a mistake.
keep="$BACKUP_DIR/before-restore-$(date -u +%Y%m%dT%H%M%SZ)"
mkdir -p "$keep"; cp -a /data/clickgroup.db "$keep/" 2>/dev/null || true; cp -a /media "$keep/" 2>/dev/null || true
rm -f /data/clickgroup.db /data/clickgroup.db-wal /data/clickgroup.db-shm
cp "$work/clickgroup.db" /data/clickgroup.db
rm -rf /media/* && cp -a "$work/media/." /media/
chown -R 1001:1001 /data /media
echo "restored $1 (previous data kept in $keep). Now: docker compose start web"

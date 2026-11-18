#!/bin/sh
# One backup of the website: database snapshot + uploads -> one .tar.gz,
# verified, copied to object storage, old local copies pruned.
# By hand:  docker compose run --rm backup /backup.sh
set -eu
. /s3.sh

BACKUP_DIR=${BACKUP_DIR:-/backups}
RETENTION_DAYS=${BACKUP_RETENTION_DAYS:-14}
DB=/data/clickgroup.db
stamp=$(date -u +%Y%m%dT%H%M%SZ)
name="clickgroup-site-${stamp}.tar.gz"
work=$(mktemp -d)
trap 'rm -rf "$work"' EXIT
mkdir -p "$BACKUP_DIR"

echo "[backup] snapshot of the database"
# .backup takes a consistent copy even while the site is writing.
sqlite3 "$DB" ".backup '$work/clickgroup.db'"
[ "$(sqlite3 "$work/clickgroup.db" 'pragma integrity_check;')" = ok ] \
  || { echo "[backup] ERROR: snapshot failed the integrity check" >&2; exit 1; }
pages=$(sqlite3 "$work/clickgroup.db" 'select count(*) from pages;')
[ "$pages" -gt 0 ] || { echo "[backup] ERROR: snapshot has no pages, refusing it" >&2; exit 1; }

echo "[backup] packing database + $(ls /media | wc -l) upload files"
tar -czf "$BACKUP_DIR/$name.partial" -C "$work" clickgroup.db -C / media
gzip -t "$BACKUP_DIR/$name.partial" || { echo "[backup] ERROR: archive is corrupt" >&2; rm -f "$BACKUP_DIR/$name.partial"; exit 1; }
mv "$BACKUP_DIR/$name.partial" "$BACKUP_DIR/$name"
echo "[backup] wrote $name ($(wc -c < "$BACKUP_DIR/$name") bytes, $pages pages)"

if s3_configured; then
  s3_put "$BACKUP_DIR/$name" "$name" && echo "[backup] uploaded to ${BACKUP_S3_BUCKET}/${BACKUP_S3_PREFIX:-}$name" \
    || { echo "[backup] ERROR: upload failed; local copy kept" >&2; exit 1; }
else
  echo "[backup] WARNING: object storage not configured; this backup is on this server only"
fi

find "$BACKUP_DIR" -name 'clickgroup-site-*.tar.gz' -type f -mtime "+${RETENTION_DAYS}" -delete
echo "[backup] done: $(find "$BACKUP_DIR" -name 'clickgroup-site-*.tar.gz' | wc -l) local backup(s) kept"

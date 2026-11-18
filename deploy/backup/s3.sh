#!/bin/sh
# Minimal S3 access built on curl's --aws-sigv4, sourced by backup.sh and
# restore.sh.
#
# Deliberately not the AWS CLI: that pulls a large Python toolchain into the
# image for three operations. curl signs SigV4 itself, so the only dependency
# is curl, and the same code works against any S3-compatible provider — Vultr
# Object Storage, Backblaze B2, Wasabi, MinIO or AWS — by pointing
# BACKUP_S3_ENDPOINT at it.
#
# Path-style addressing (endpoint/bucket/key) is used throughout, which every
# S3-compatible provider accepts and which avoids DNS for per-bucket subdomains.

# s3_configured reports whether there is somewhere off-box to copy to.
s3_configured() {
    [ -n "${BACKUP_S3_BUCKET:-}" ] &&
    [ -n "${BACKUP_S3_ACCESS_KEY:-}" ] &&
    [ -n "${BACKUP_S3_SECRET_KEY:-}" ] &&
    [ -n "${BACKUP_S3_ENDPOINT:-}" ]
}

_s3_curl() {
    curl --silent --show-error --fail \
        --aws-sigv4 "aws:amz:${BACKUP_S3_REGION:-us-east-1}:s3" \
        --user "${BACKUP_S3_ACCESS_KEY}:${BACKUP_S3_SECRET_KEY}" \
        "$@"
}

# s3_put <local-file> <key>
s3_put() {
    _s3_curl --upload-file "$1" \
        "${BACKUP_S3_ENDPOINT%/}/${BACKUP_S3_BUCKET}/${BACKUP_S3_PREFIX:-}$2"
}

# s3_get <key> <local-file>
s3_get() {
    _s3_curl --output "$2" \
        "${BACKUP_S3_ENDPOINT%/}/${BACKUP_S3_BUCKET}/${BACKUP_S3_PREFIX:-}$1"
}

# s3_list — print one object key per line, newest last.
#
# ListObjectsV2 returns XML. Rather than add an XML parser for one field, the
# <Key> elements are extracted directly; keys are backup filenames we generate
# ourselves, so they contain no XML-escaped characters.
s3_list() {
    _s3_curl --get \
        --data-urlencode "list-type=2" \
        --data-urlencode "prefix=${BACKUP_S3_PREFIX:-}" \
        "${BACKUP_S3_ENDPOINT%/}/${BACKUP_S3_BUCKET}" \
    | tr '<' '\n' \
    | sed -n 's|^Key>||p' \
    | sed "s|^${BACKUP_S3_PREFIX:-}||" \
    | sort
}

# Nightly backup of the website: SQLite snapshot + uploads, copied off-box.
# Same approach as the clickmeter backup (curl signs S3 requests itself).
FROM alpine:3.22
RUN apk add --no-cache curl sqlite tar gzip
COPY s3.sh backup.sh restore.sh entrypoint.sh /
RUN chmod +x /backup.sh /restore.sh /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]

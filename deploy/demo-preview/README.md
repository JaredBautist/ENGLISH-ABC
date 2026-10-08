# IP-only demo preview

## Requirements

- WHEN the approved preview is published, only the exact IP host SHALL serve the local compiled frontend.
- Institution hostnames, databases, API containers and existing frontend sources SHALL remain unchanged.
- API, TTS and Django admin SHALL continue using the existing demo backend.
- Gateway configuration SHALL pass validation before graceful reload; removing the new exact-host configuration SHALL restore previous IP routing.

## Design decision

The existing default frontend is shared with Manuel Fernandez de Novoa. Use a separate static Nginx container and an exact-IP virtual host rather than overwriting the shared source. Keep existing default and school virtual hosts untouched.

Deploy immutable release directories under /root/english-demo-preview. The dedicated container joins the existing gateway network without exposing another host port. It serves compiled static assets only. No schema, credentials or backend changes.

## Tasks and verification

1. Run local tests/build; capture existing school page hashes and gateway configuration backup.
2. Transfer compiled assets, source snapshot and these deployment files to a release directory.
3. Start the preview container and check health before installing the exact-IP virtual host.
4. Validate/reload gateway; verify public HTML, JS, images, demo API and TTS routing.
5. Compare school page hashes and container IDs before/after.

## Rollback

Move only the new `demo-preview.conf` outside the gateway configuration directory, run `docker exec english-platform-gateway-1 nginx -t`, then `docker exec english-platform-gateway-1 nginx -s reload`. The previous default IP route resumes. Stop only `english-demo-preview-web` if desired; retain release artifacts. Never remove database volumes.

This preview uses the existing HTTP IP address, not HTTPS. Do not interpret a successful HTTP check as classroom or physical audio validation.

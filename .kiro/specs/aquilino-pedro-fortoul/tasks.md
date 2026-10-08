# Tasks

- [x] Inspect existing topology and capacity; define isolation and acceptance contract.
- [x] Clone deployed source into an independent school checkout.
- [x] Build dedicated images and start isolated database/API/frontend services.
- [x] Seed curriculum and create the school administrator.
- [x] Validate and publish the exact-host gateway route.
- [x] Verify login, isolation, curriculum and existing school availability.
- [x] Save private local credentials and deployment handoff.

## Evidence (2026-10-07)

- Frontend: 14 tests passed, production build succeeded.
- All three school services healthy; MySQL has no host port and only its private network.
- Fresh installation: 1 administrator, 4 grades, 32 modules, 0 teacher assignments or progress.
- Login and authenticated profile/grades checked through gateway.
- New-school tokens rejected by both existing backends; tokens from each existing backend rejected by the new school.
- Existing demo and MF Novoa routes remained HTTP 200.
- Nginx configuration validated and gracefully reloaded. Long hostname required `server_names_hash_bucket_size 128`.
- Snapshot: new services approximately 251 MB total, host about 965 MB available.
- Local credential file mode 0600, excluded from Git.
- No browser interaction or load test was performed. Endpoint and authentication checks are automated.

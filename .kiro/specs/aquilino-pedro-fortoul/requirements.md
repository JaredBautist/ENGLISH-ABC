# Aquilino Duran, Pedro Fortoul: isolated installation

Authorized scope: provision an independent copy on the existing VPS; institutional customization comes later.

- WHEN the school hostname is requested, the system SHALL route to its own frontend and backend.
- WHEN users authenticate or record progress, the system SHALL use an exclusive database server, credentials, signing key and persistent volumes.
- WHEN initialized, the instance SHALL contain the standard curriculum and one new administrator, without copying existing institutional users or progress.
- WHEN future school changes are deployed, the source checkout and application containers SHALL be independent of other schools.
- WHEN provisioning finishes, credentials SHALL be saved locally in the requested ignored credentials directory with mode 0600.
- Existing school endpoints SHALL remain available; acceptance checks SHALL cover HTTP access, login, curriculum, cross-instance token rejection and resource health.

Hostname: aquilino-duran-pedro-fortoul.162.35.28.193.nip.io. Uses the existing HTTP/nip.io convention; TLS and custom domain migration are separate work.

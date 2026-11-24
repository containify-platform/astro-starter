# Astro starter

A minimal [Astro](https://astro.build/) site rendered on the server with the
[Node adapter](https://docs.astro.build/en/guides/integrations-guide/node/) in standalone mode,
ready to deploy on [Containify](https://containify.cloud).

- `src/pages/index.astro`: a home page rendered on every request
- `src/pages/about.astro`: a page prerendered as static HTML at build time
- `src/pages/api/hello.ts`: `GET /api/hello`, a JSON API route
- `src/pages/health.ts`: `GET /health`, the health check
- `Dockerfile`: a multi-stage build with production dependencies only, running as a non-root user

## Run locally

You need Node.js 24.

```bash
npm install
npm run dev
```

Open http://localhost:4321.

## Deploy on Containify

Deploy the **Astro starter** template from the Containify catalogue. It builds this repository
from its Dockerfile and gives it a public HTTPS address on `containify.app`.

To deploy your own copy, fork or copy this repository, then add it to a project as a
**Git Repository** app with an HTTP endpoint on port `4321` and a health check on `/health`.

A few settings matter on Containify:

- The server reads `HOST` and `PORT`. Containify sets `HOST=::`, so it listens on IPv6 and
  IPv4; the Dockerfile sets `PORT=4321`, the port the endpoint points at.
- `security.allowedDomains` in `astro.config.mjs` trusts the `X-Forwarded-Host` and
  `X-Forwarded-Proto` headers Containify's edge adds, so `Astro.url` is the public `https://`
  address on every domain, and form posts pass Astro's origin check.
- `import.meta.env` values are baked in at build time: declare each one with `ARG` in the
  Dockerfile's build stage. Read secrets from `process.env` at runtime instead.

## License

MIT

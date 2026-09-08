# VNH Studio deployment

VNH Studio is intended to be self-hosted at `https://cms.vnhofficial.com` on Cloudflare and protected by Cloudflare Access.

## Sanity project

- Project ID: `iec4sn1b`
- Dataset: `production`
- No Sanity Organization ID is required by the Studio or the public site.

## Build and deploy

From `studio/`:

```bash
npm install
npm run build
npm run deploy:cloudflare
```

The Cloudflare Worker/Static Assets project name is `vnh-sanity-studio`. The build output is `studio/dist` and SPA routing is enabled because Sanity Studio is a client-side application.

After the Cloudflare deployment exists, attach the custom domain `cms.vnhofficial.com` to that Worker/project.

## Protect with Cloudflare Access

In Cloudflare Zero Trust:

1. Open **Access controls > Applications**.
2. Create a **Self-hosted and private** application.
3. Add public hostname `cms.vnhofficial.com`.
4. Create an **Allow** policy limited to the approved editor email address(es).
5. Use an identity provider or Cloudflare email one-time PIN.
6. Leave all unmatched users denied.

This protects the Studio before the Sanity login screen loads. Sanity authentication and project roles remain a second security layer.

## Sanity CORS

In the Sanity project settings, add these CORS origins with credentials enabled:

- `https://cms.vnhofficial.com`
- `http://localhost:3333` for local Studio development only

Do not add broad wildcard origins.

## Register the external Studio with Sanity

Once `https://cms.vnhofficial.com` is live, authenticate the Sanity CLI and run:

```bash
npm run register:external
```

For unattended CI/CD, use a deploy-only `SANITY_AUTH_TOKEN`; never expose a write token in browser code or commit it to GitHub.

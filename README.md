# VNH Official

Custom Astro storefront/site for **VNH** using the Concept 2 industrial visual direction.

## Current foundation

- Astro 5 + Cloudflare adapter
- Responsive VNH homepage
- Hero message: Parts / Solutions / Ideas / Freedom / Community
- Mission, Shop, and Contact shells
- Brevo-ready Keep Updated endpoint
- Brevo-ready private contact endpoint
- Shopify storefront connection reserved for the next integration step

## Cloudflare environment variables

Set these in the VNH Cloudflare project, not in source control:

- `BREVO_API_KEY`
- `BREVO_LIST_ID`
- `BREVO_SENDER_EMAIL`
- `BREVO_SENDER_NAME`
- `CONTACT_TO_EMAIL`

## Local development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

This repository is intentionally isolated from the Revilute project and must use its own deployment, credentials, content, and commerce integrations.

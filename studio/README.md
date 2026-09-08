# VNH Sanity Studio

This Studio edits the content consumed by `vnhofficial.com`.

## First-time setup

1. Copy `.env.example` to `.env.local`.
2. Set `SANITY_STUDIO_PROJECT_ID` to the VNH Sanity project ID.
3. Leave `SANITY_STUDIO_DATASET=production` unless you intentionally created a different dataset.
4. Run `npm install` in this `studio/` directory.
5. Run `npm run dev` to open the Studio locally.

## Content editors

The Studio exposes two singleton documents:

- **Site Settings**
  - VNH logo
  - site topography background
  - social/search share image (recommended 1200 × 630)
- **Home Page**
  - Latest from VNH — left image
  - Latest from VNH — right image

The public Astro site uses these Sanity assets when populated and falls back to bundled site assets when a field is empty.

## Public-site environment

The Cloudflare deployment for the Astro site needs:

- `PUBLIC_SANITY_PROJECT_ID`
- `PUBLIC_SANITY_DATASET=production`

## Deploying Studio

Run `npm run deploy` from `studio/` and follow Sanity's hostname/app prompts. For a CI deployment, use a Sanity deploy token rather than committing credentials.

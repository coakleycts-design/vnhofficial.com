# VNH Sanity CMS media

The website reads media from the VNH Sanity project when `PUBLIC_SANITY_PROJECT_ID` is configured in Cloudflare.

## Documents

### `siteSettings`
- `logo` — site/header/footer/hero logo file
- `topoBackground` — site-wide topography background file

### `homePage`
- `latestLeftImage` — left image in the **Latest from VNH** split block
- `latestRightImage` — right image in the **Latest from VNH** split block

If a field is empty or Sanity is unavailable, the website uses its bundled fallback asset so the page remains functional.

The schema definitions in this folder are intended to be added to the VNH Sanity Studio schema set.

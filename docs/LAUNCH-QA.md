# VNH Launch QA

Use this checklist before treating a deployment as production-ready. The automated GitHub workflow verifies that the Astro storefront and Sanity Studio both compile; `npm run check:live` verifies the public route surface after deployment.

## Automated checks

From the repository root:

```bash
npm install
npm run build
npm run check:live
```

The live check validates the main public pages, cart/account shells, all four policies, `robots.txt`, and `sitemap.xml`.

Sanity Studio:

```bash
cd studio
npm install
npm run build
```

GitHub Actions runs both builds on every push to `main` and on pull requests.

## Commerce transaction test

Run this against a real browser after each material commerce change:

1. Load `/shop` with no console errors.
2. Search for a known product and clear the search.
3. Filter by product category/type if multiple types are present.
4. Enable **Available only** and verify unavailable items are hidden.
5. Exercise every sort option.
6. Open a product and switch every available variant.
7. Confirm image gallery, price, compare-at price, availability, and description stay correct.
8. Add quantity 1 to an empty cart.
9. Add another product/variant and confirm the header badge updates.
10. Reload and navigate to another page; confirm cart persistence.
11. Change a line quantity in `/cart`.
12. Remove a non-final line.
13. Remove the final line and confirm the empty-cart view appears with no stale line or error.
14. Add products again and click **Checkout**.
15. Confirm Shopify checkout contains the same variants, quantities, and expected subtotal.
16. Complete a Shopify test order using the store's supported test-payment method.
17. Confirm Shopify records the order.
18. Confirm the order/status link works.
19. When native customer accounts are enabled, sign in at `/account` and confirm the new order appears exactly once.

## Analytics conversion test

After `PUBLIC_GA4_MEASUREMENT_ID` and Shopify's Google/GA integration are configured:

1. Verify `page_view`.
2. Search and verify `search`.
3. Open a result and verify `select_item` + `view_item`.
4. Add successfully and verify `add_to_cart`.
5. Start checkout and verify `begin_checkout`.
6. Complete one test order and verify exactly one `purchase` event from Shopify with matching currency/value.

Do not count checkout-button clicks as purchases.

## Responsive test matrix

Test at minimum:

- 390 px mobile
- 430 px mobile
- 768 px tablet
- 1024 px small desktop/tablet landscape
- 1440 px desktop

Check the home page, shop, product page, cart, account, contact, and one policy page at each class of viewport.

## Accessibility audit

Keyboard-only:

- Tab from the top of each page and confirm the **Skip to content** link appears and works.
- Every interactive element has a visible focus indicator.
- Product filters, variant selector, quantity field, cart controls, forms, and policy/footer links are reachable in logical order.
- No keyboard trap exists.
- Cart and form status messages are announced through live regions.

Content/visual:

- One meaningful `h1` per page.
- Form fields have labels.
- Product images use meaningful alt text when Shopify supplies it; decorative images use empty alt text.
- Text/control contrast remains readable.
- Zoom to 200% and confirm content is not lost.
- Verify reduced-motion OS preference does not leave essential content hidden.

## SEO audit

- `/robots.txt` returns `text/plain` and points to the VNH sitemap.
- `/sitemap.xml` returns valid XML and includes home, shop, mission, contact, policies, and current Shopify products.
- Cart, account, and API routes return `X-Robots-Tag: noindex, nofollow`.
- Canonical URLs use `https://vnhofficial.com`.
- Product pages contain Product structured data and Open Graph product metadata.
- Public pages have unique titles/descriptions.
- 404 responses are not indexed.
- Google Search Console accepts `https://vnhofficial.com/sitemap.xml`.

## Forms and communications

- Keep Updated accepts a valid email, shows a success state, and reaches the intended Brevo list.
- Invalid Keep Updated input is rejected by browser/server validation.
- Contact form sends successfully without exposing the support email publicly.
- Test one validation failure and one successful submission.
- Check delivery/spam placement for transactional/contact notifications.

## Launch sign-off

A release is ready when:

- Storefront build passes.
- CMS build passes.
- Live route checker passes.
- Full commerce test passes including final-item cart removal and Shopify checkout.
- Mobile + keyboard checks pass.
- Search Console sitemap is successful.
- Policies render from Shopify.
- Analytics has no duplicate purchase event.
- No private Shopify, Brevo, or Sanity credential exists in GitHub.

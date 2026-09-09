# VNH Analytics & Conversion Tracking

The VNH storefront now contains optional GA4 ecommerce event hooks. They are intentionally inert until a GA4 measurement ID is configured, so analytics setup cannot break shopping or checkout.

## VNH storefront configuration

Add this Cloudflare environment variable to the VNH Worker:

`PUBLIC_GA4_MEASUREMENT_ID=G-XXXXXXXXXX`

The site will then load GA4 and emit these events from VNH-owned pages:

- `page_view` — normal GA4 page tracking
- `search` — storefront product searches
- `select_item` — shopper opens a product from the VNH catalog
- `view_item` — native VNH product-detail view
- `add_to_cart` — emitted only after Shopify successfully accepts the cart line
- `begin_checkout` — emitted when the VNH Checkout button is selected

The analytics hooks use `window.vnhTrack()` and become a no-op when no measurement ID is present.

## Purchase conversion at Shopify checkout

The actual `purchase` event happens on Shopify's checkout / thank-you flow, outside the VNH Astro application. Do not fake a purchase event when the customer clicks Checkout; that would count abandoned checkouts as sales.

Recommended setup:

1. In Shopify Admin, install/open the **Google & YouTube** sales channel.
2. Connect the same GA4 property used by `PUBLIC_GA4_MEASUREMENT_ID`.
3. Verify Shopify's ecommerce purchase events in GA4 Realtime/DebugView after a test order.
4. Do not also install a duplicate GA4 custom pixel for `purchase` unless the Google channel is not providing the required event. Duplicate implementations can double-count revenue.

Shopify Customer Events / pixels can be used for other providers or custom attribution when needed. Prefer an app pixel where available because Shopify manages the sandbox and updates.

## Conversion validation

For a complete test purchase, verify in order:

1. `view_item` fires on a VNH product page.
2. `add_to_cart` fires only after the cart API succeeds.
3. Search/select events contain the expected product/search information.
4. `begin_checkout` fires once when Shopify checkout is opened.
5. Finish a Shopify test order.
6. Confirm one—and only one—`purchase` event with the correct value/currency in GA4.
7. Confirm the Shopify order total and GA4 purchase total agree.

## Privacy

Analytics and marketing configuration must respect Shopify/customer privacy and consent settings. Do not put customer email addresses, names, addresses, order numbers, or other personally identifying values into custom GA4 event parameters.

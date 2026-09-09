# VNH Checkout & Customer Account Branding

The VNH storefront intentionally hands payment, shipping, taxes, discounts, and final order creation to Shopify. The checkout should visually continue the VNH experience without replacing Shopify checkout logic.

## Recommended VNH checkout settings

Use the active checkout configuration in **Shopify Admin → Settings → Checkout → Configurations → Edit**. Duplicate the active configuration before making substantial changes so there is a rollback copy.

### Identity

- Logo: use the current VNH gear/emblem logo from the site/CMS.
- Logo treatment: flat, clean, no glossy or metallic effect.
- Brand: VNH Engineered Design.
- Keep the checkout layout restrained and utilitarian; checkout clarity takes priority over decorative elements.

### Palette

These values mirror the VNH site:

| Purpose | Value |
| --- | --- |
| Main dark background | `#050607` |
| Panel / secondary dark | `#0A0C0E` |
| Primary text | `#F1F1EF` |
| Muted text | `#A9AAAB` |
| VNH blue accent | `#16334D` |
| Light border / control outline | `#9C9C9C` |

Keep form-field contrast high. If a checkout control becomes difficult to read in dark mode, prefer a lighter field surface instead of forcing the exact storefront background onto every control.

### Shape & typography

- Low or minimal corner radius.
- Avoid overly rounded/pill-shaped controls except where Shopify requires them.
- Use the closest available condensed/industrial heading treatment and a highly legible system/sans-serif body font.
- Primary checkout buttons should have strong contrast and a clear selected/focus state.

### Footer

Enable Shopify's policy links in the checkout footer. The public VNH site also exposes the same live Shopify policies at:

- `/policies/terms-of-service`
- `/policies/refund-policy`
- `/policies/shipping-policy`
- `/policies/privacy-policy`

## What is safe on all standard Shopify plans

The checkout and accounts editor supports standard visual branding on Basic and higher plans, including logo, colors, and fonts. Advanced customization and the Checkout Branding / checkout-and-accounts configuration APIs require higher plan capabilities, particularly Shopify Plus.

Because the VNH repository does not have Shopify Admin API credentials, this file is the source-of-truth implementation spec for the Shopify-admin portion. Do not place Admin API credentials in GitHub.

## Verification after branding

Preview both desktop and mobile for:

1. Checkout
2. Thank you
3. Order status
4. Customer account Orders
5. Customer account Profile
6. Sign-in

Confirm that logo, high-contrast colors, policy links, button focus state, and mobile order summary remain readable before publishing the configuration.

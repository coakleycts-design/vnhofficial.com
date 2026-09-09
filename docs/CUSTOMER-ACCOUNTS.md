# VNH Customer Accounts & Order History

The VNH repository contains a native `/account` page, Shopify OAuth/PKCE login routes, and native order-history rendering through Shopify's Customer Account API.

The implementation is deliberately feature-flagged by environment configuration. Until the Customer Account client ID is configured, the VNH account page safely sends sign-in to Shopify's hosted customer account instead of breaking the storefront.

## Shopify configuration required

In Shopify Admin:

1. Confirm **Customer accounts** are enabled.
2. Open the VNH **Headless** storefront / Customer Account API settings.
3. Enable the Customer Account API permissions needed for customer account/order access.
4. Add this callback URL exactly:

   `https://vnhofficial.com/api/shopify/account/callback`

5. Copy the Customer Account API client ID.
6. In Cloudflare, add it as a secret/environment variable:

   `SHOPIFY_CUSTOMER_ACCOUNT_CLIENT_ID`

7. Only if Shopify identifies the client as confidential and provides a secret, add:

   `SHOPIFY_CUSTOMER_ACCOUNT_CLIENT_SECRET`

Do not commit either value to GitHub.

## Native VNH flow after activation

`/account`
→ `/api/shopify/account/login`
→ Shopify customer sign-in
→ `/api/shopify/account/callback`
→ `/account`

The OAuth implementation uses PKCE and state verification. Access, refresh, and ID tokens are stored in secure HttpOnly cookies rather than localStorage or browser-readable JavaScript.

The VNH account page then displays:

- customer name/email
- recent order history
- order date and total
- financial/fulfillment status
- recent line items
- Shopify order-status link

Profile/address management intentionally remains available through Shopify's hosted customer account, which avoids duplicating sensitive profile/address forms in VNH.

## Rollback behavior

Removing `SHOPIFY_CUSTOMER_ACCOUNT_CLIENT_ID` immediately returns the account experience to the hosted Shopify sign-in/account path. It does not affect products, cart, checkout, orders, or the Storefront API.

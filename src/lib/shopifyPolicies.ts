const SHOPIFY_STORE_DOMAIN = 'vnhofficial.myshopify.com';
const SHOPIFY_API_VERSION = '2026-07';

type RuntimeEnv = Record<string, unknown> & {
  SHOPIFY_STOREFRONT_PRIVATE_TOKEN?: string;
};

export type ShopifyPolicy = {
  id: string;
  handle: string;
  title: string;
  body: string;
  url: string;
};

export type VnhPolicySlug =
  | 'terms-of-service'
  | 'refund-policy'
  | 'shipping-policy'
  | 'privacy-policy';

const POLICY_QUERY = `#graphql
  query VnhStorePolicies {
    shop {
      termsOfService {
        id
        handle
        title
        body
        url
      }
      refundPolicy {
        id
        handle
        title
        body
        url
      }
      shippingPolicy {
        id
        handle
        title
        body
        url
      }
      privacyPolicy {
        id
        handle
        title
        body
        url
      }
    }
  }
`;

type PolicyQueryResult = {
  shop: {
    termsOfService: ShopifyPolicy | null;
    refundPolicy: ShopifyPolicy | null;
    shippingPolicy: ShopifyPolicy | null;
    privacyPolicy: ShopifyPolicy | null;
  };
};

const fieldForSlug: Record<VnhPolicySlug, keyof PolicyQueryResult['shop']> = {
  'terms-of-service': 'termsOfService',
  'refund-policy': 'refundPolicy',
  'shipping-policy': 'shippingPolicy',
  'privacy-policy': 'privacyPolicy',
};

export const policyLabels: Record<VnhPolicySlug, string> = {
  'terms-of-service': 'Terms of Service',
  'refund-policy': 'Refund Policy',
  'shipping-policy': 'Shipping Policy',
  'privacy-policy': 'Privacy Policy',
};

export function isVnhPolicySlug(value: string): value is VnhPolicySlug {
  return Object.prototype.hasOwnProperty.call(fieldForSlug, value);
}

export async function getShopifyPolicy(
  env: RuntimeEnv,
  slug: VnhPolicySlug,
  buyerIp?: string | null,
): Promise<ShopifyPolicy | null> {
  const token = String(env.SHOPIFY_STOREFRONT_PRIVATE_TOKEN || '').trim();
  if (!token) throw new Error('SHOPIFY_STOREFRONT_PRIVATE_TOKEN is not configured.');

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'Shopify-Storefront-Private-Token': token,
  };
  if (buyerIp) headers['Shopify-Storefront-Buyer-IP'] = buyerIp;

  const response = await fetch(`https://${SHOPIFY_STORE_DOMAIN}/api/${SHOPIFY_API_VERSION}/graphql.json`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ query: POLICY_QUERY }),
  });

  const payload = await response.json() as {
    data?: PolicyQueryResult;
    errors?: Array<{ message?: string }>;
  };

  if (!response.ok || payload.errors?.length || !payload.data?.shop) {
    const detail = payload.errors?.map((error) => error.message).filter(Boolean).join('; ');
    throw new Error(detail || `Shopify Storefront API returned ${response.status}.`);
  }

  return payload.data.shop[fieldForSlug[slug]] || null;
}

export function shopifyPolicyFallbackUrl(slug: VnhPolicySlug): string {
  return `https://${SHOPIFY_STORE_DOMAIN}/policies/${slug}`;
}

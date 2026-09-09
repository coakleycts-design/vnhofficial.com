const SHOPIFY_STORE_DOMAIN = 'vnhofficial.myshopify.com';
const SHOPIFY_API_VERSION = '2026-07';

export type ShopifyMoney = {
  amount: string;
  currencyCode: string;
};

export type ShopifyImage = {
  url: string;
  altText?: string | null;
  width?: number | null;
  height?: number | null;
};

export type ShopifyProduct = {
  id: string;
  handle: string;
  title: string;
  description: string;
  availableForSale: boolean;
  featuredImage?: ShopifyImage | null;
  priceRange: {
    minVariantPrice: ShopifyMoney;
    maxVariantPrice: ShopifyMoney;
  };
  compareAtPriceRange?: {
    minVariantPrice: ShopifyMoney;
    maxVariantPrice: ShopifyMoney;
  } | null;
};

export type ShopifyProductOption = {
  name: string;
  values: string[];
};

export type ShopifyVariant = {
  id: string;
  title: string;
  availableForSale: boolean;
  selectedOptions: Array<{ name: string; value: string }>;
  price: ShopifyMoney;
  compareAtPrice?: ShopifyMoney | null;
  image?: ShopifyImage | null;
};

export type ShopifyProductDetail = ShopifyProduct & {
  descriptionHtml: string;
  vendor?: string | null;
  productType?: string | null;
  images: { nodes: ShopifyImage[] };
  options: ShopifyProductOption[];
  variants: { nodes: ShopifyVariant[] };
  seo?: {
    title?: string | null;
    description?: string | null;
  } | null;
};

type RuntimeEnv = Record<string, unknown> & {
  SHOPIFY_STOREFRONT_PRIVATE_TOKEN?: string;
};

const PRODUCTS_QUERY = `#graphql
  query VnhShopProducts($first: Int!) {
    products(first: $first, sortKey: UPDATED_AT, reverse: true) {
      nodes {
        id
        handle
        title
        description
        availableForSale
        featuredImage {
          url
          altText
          width
          height
        }
        priceRange {
          minVariantPrice { amount currencyCode }
          maxVariantPrice { amount currencyCode }
        }
        compareAtPriceRange {
          minVariantPrice { amount currencyCode }
          maxVariantPrice { amount currencyCode }
        }
      }
    }
  }
`;

const PRODUCT_QUERY = `#graphql
  query VnhShopProduct($handle: String!) {
    product(handle: $handle) {
      id
      handle
      title
      description
      descriptionHtml
      availableForSale
      vendor
      productType
      featuredImage {
        url
        altText
        width
        height
      }
      images(first: 12) {
        nodes {
          url
          altText
          width
          height
        }
      }
      options {
        name
        values
      }
      variants(first: 100) {
        nodes {
          id
          title
          availableForSale
          selectedOptions { name value }
          price { amount currencyCode }
          compareAtPrice { amount currencyCode }
          image {
            url
            altText
            width
            height
          }
        }
      }
      priceRange {
        minVariantPrice { amount currencyCode }
        maxVariantPrice { amount currencyCode }
      }
      compareAtPriceRange {
        minVariantPrice { amount currencyCode }
        maxVariantPrice { amount currencyCode }
      }
      seo {
        title
        description
      }
    }
  }
`;

async function storefrontRequest<T>(
  env: RuntimeEnv,
  query: string,
  variables: Record<string, unknown> = {},
  buyerIp?: string | null,
): Promise<T> {
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
    body: JSON.stringify({ query, variables }),
  });

  const payload = await response.json() as { data?: T; errors?: Array<{ message?: string }> };
  if (!response.ok || payload.errors?.length || !payload.data) {
    const detail = payload.errors?.map((error) => error.message).filter(Boolean).join('; ');
    throw new Error(detail || `Shopify Storefront API returned ${response.status}.`);
  }

  return payload.data;
}

export async function getShopifyProducts(env: RuntimeEnv, first = 24, buyerIp?: string | null): Promise<ShopifyProduct[]> {
  const data = await storefrontRequest<{ products: { nodes: ShopifyProduct[] } }>(env, PRODUCTS_QUERY, { first }, buyerIp);
  return data.products.nodes;
}

export async function getShopifyProduct(env: RuntimeEnv, handle: string, buyerIp?: string | null): Promise<ShopifyProductDetail | null> {
  const data = await storefrontRequest<{ product: ShopifyProductDetail | null }>(env, PRODUCT_QUERY, { handle }, buyerIp);
  return data.product;
}

export function isShopifyConfigured(env: RuntimeEnv): boolean {
  return Boolean(String(env.SHOPIFY_STOREFRONT_PRIVATE_TOKEN || '').trim());
}

export function shopifyProductUrl(handle: string): string {
  return `https://${SHOPIFY_STORE_DOMAIN}/products/${encodeURIComponent(handle)}`;
}

export function localProductUrl(handle: string): string {
  return `/shop/${encodeURIComponent(handle)}`;
}

export const shopifyConfig = {
  domain: SHOPIFY_STORE_DOMAIN,
  apiVersion: SHOPIFY_API_VERSION,
} as const;

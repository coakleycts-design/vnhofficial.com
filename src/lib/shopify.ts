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
  vendor?: string | null;
  productType?: string | null;
  createdAt?: string | null;
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
  images: { nodes: ShopifyImage[] };
  options: ShopifyProductOption[];
  variants: { nodes: ShopifyVariant[] };
  seo?: {
    title?: string | null;
    description?: string | null;
  } | null;
};

export type ShopifyCartLine = {
  id: string;
  quantity: number;
  cost: {
    totalAmount: ShopifyMoney;
  };
  merchandise: {
    id: string;
    title: string;
    availableForSale: boolean;
    selectedOptions: Array<{ name: string; value: string }>;
    price: ShopifyMoney;
    image?: ShopifyImage | null;
    product: {
      title: string;
      handle: string;
      featuredImage?: ShopifyImage | null;
    };
  };
};

export type ShopifyCart = {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  cost: {
    subtotalAmount: ShopifyMoney;
    totalAmount: ShopifyMoney;
  };
  lines: {
    nodes: ShopifyCartLine[];
  };
};

type RuntimeEnv = Record<string, unknown> & {
  SHOPIFY_STOREFRONT_PRIVATE_TOKEN?: string;
};

type CartUserError = {
  field?: string[] | null;
  message: string;
  code?: string | null;
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
        vendor
        productType
        createdAt
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
      createdAt
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

const CART_FIELDS = `#graphql
  fragment VnhCartFields on Cart {
    id
    checkoutUrl
    totalQuantity
    cost {
      subtotalAmount { amount currencyCode }
      totalAmount { amount currencyCode }
    }
    lines(first: 100) {
      nodes {
        id
        quantity
        cost {
          totalAmount { amount currencyCode }
        }
        merchandise {
          ... on ProductVariant {
            id
            title
            availableForSale
            selectedOptions { name value }
            price { amount currencyCode }
            image {
              url
              altText
              width
              height
            }
            product {
              title
              handle
              featuredImage {
                url
                altText
                width
                height
              }
            }
          }
        }
      }
    }
  }
`;

const CART_QUERY = `#graphql
  ${CART_FIELDS}
  query VnhCart($id: ID!) {
    cart(id: $id) {
      ...VnhCartFields
    }
  }
`;

const CART_CREATE_MUTATION = `#graphql
  ${CART_FIELDS}
  mutation VnhCartCreate($lines: [CartLineInput!]) {
    cartCreate(input: { lines: $lines }) {
      cart { ...VnhCartFields }
      userErrors { field message code }
    }
  }
`;

const CART_LINES_ADD_MUTATION = `#graphql
  ${CART_FIELDS}
  mutation VnhCartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart { ...VnhCartFields }
      userErrors { field message code }
    }
  }
`;

const CART_LINES_UPDATE_MUTATION = `#graphql
  ${CART_FIELDS}
  mutation VnhCartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
    cartLinesUpdate(cartId: $cartId, lines: $lines) {
      cart { ...VnhCartFields }
      userErrors { field message code }
    }
  }
`;

const CART_LINES_REMOVE_MUTATION = `#graphql
  ${CART_FIELDS}
  mutation VnhCartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
      cart { ...VnhCartFields }
      userErrors { field message code }
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

function cartResult(cart: ShopifyCart | null, userErrors: CartUserError[] = []): ShopifyCart {
  if (userErrors.length) {
    throw new Error(userErrors.map((error) => error.message).filter(Boolean).join('; ') || 'Shopify could not update the cart.');
  }
  if (!cart) throw new Error('The Shopify cart is no longer available.');
  return cart;
}

export async function getShopifyProducts(env: RuntimeEnv, first = 24, buyerIp?: string | null): Promise<ShopifyProduct[]> {
  const data = await storefrontRequest<{ products: { nodes: ShopifyProduct[] } }>(env, PRODUCTS_QUERY, { first }, buyerIp);
  return data.products.nodes;
}

export async function getShopifyProduct(env: RuntimeEnv, handle: string, buyerIp?: string | null): Promise<ShopifyProductDetail | null> {
  const data = await storefrontRequest<{ product: ShopifyProductDetail | null }>(env, PRODUCT_QUERY, { handle }, buyerIp);
  return data.product;
}

export async function getShopifyCart(env: RuntimeEnv, cartId: string, buyerIp?: string | null): Promise<ShopifyCart | null> {
  const data = await storefrontRequest<{ cart: ShopifyCart | null }>(env, CART_QUERY, { id: cartId }, buyerIp);
  return data.cart;
}

export async function createShopifyCart(
  env: RuntimeEnv,
  merchandiseId: string,
  quantity = 1,
  buyerIp?: string | null,
): Promise<ShopifyCart> {
  const data = await storefrontRequest<{
    cartCreate: { cart: ShopifyCart | null; userErrors: CartUserError[] };
  }>(env, CART_CREATE_MUTATION, {
    lines: [{ merchandiseId, quantity }],
  }, buyerIp);
  return cartResult(data.cartCreate.cart, data.cartCreate.userErrors);
}

export async function addShopifyCartLine(
  env: RuntimeEnv,
  cartId: string,
  merchandiseId: string,
  quantity = 1,
  buyerIp?: string | null,
): Promise<ShopifyCart> {
  const data = await storefrontRequest<{
    cartLinesAdd: { cart: ShopifyCart | null; userErrors: CartUserError[] };
  }>(env, CART_LINES_ADD_MUTATION, {
    cartId,
    lines: [{ merchandiseId, quantity }],
  }, buyerIp);
  return cartResult(data.cartLinesAdd.cart, data.cartLinesAdd.userErrors);
}

export async function updateShopifyCartLine(
  env: RuntimeEnv,
  cartId: string,
  lineId: string,
  quantity: number,
  buyerIp?: string | null,
): Promise<ShopifyCart> {
  const data = await storefrontRequest<{
    cartLinesUpdate: { cart: ShopifyCart | null; userErrors: CartUserError[] };
  }>(env, CART_LINES_UPDATE_MUTATION, {
    cartId,
    lines: [{ id: lineId, quantity }],
  }, buyerIp);
  return cartResult(data.cartLinesUpdate.cart, data.cartLinesUpdate.userErrors);
}

export async function removeShopifyCartLine(
  env: RuntimeEnv,
  cartId: string,
  lineId: string,
  buyerIp?: string | null,
): Promise<ShopifyCart> {
  const data = await storefrontRequest<{
    cartLinesRemove: { cart: ShopifyCart | null; userErrors: CartUserError[] };
  }>(env, CART_LINES_REMOVE_MUTATION, {
    cartId,
    lineIds: [lineId],
  }, buyerIp);
  return cartResult(data.cartLinesRemove.cart, data.cartLinesRemove.userErrors);
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

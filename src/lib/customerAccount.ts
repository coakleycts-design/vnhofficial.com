const SHOPIFY_STORE_DOMAIN = 'vnhofficial.myshopify.com';

export type CustomerAccountEnvironment = Record<string, unknown> & {
  SHOPIFY_CUSTOMER_ACCOUNT_CLIENT_ID?: string;
  SHOPIFY_CUSTOMER_ACCOUNT_CLIENT_SECRET?: string;
};

export type CustomerOrderMoney = {
  amount: string;
  currencyCode: string;
};

export type CustomerOrder = {
  id: string;
  name: string;
  processedAt: string;
  financialStatus?: string | null;
  fulfillmentStatus?: string | null;
  statusPageUrl: string;
  totalPrice: CustomerOrderMoney;
  lineItems: {
    nodes: Array<{
      id: string;
      title: string;
      quantity: number;
      image?: { url: string; altText?: string | null } | null;
    }>;
  };
};

export type CustomerDashboard = {
  displayName: string;
  firstName?: string | null;
  lastName?: string | null;
  emailAddress?: { emailAddress?: string | null } | null;
  orders: { nodes: CustomerOrder[] };
};

type AuthDiscovery = {
  authorization_endpoint: string;
  token_endpoint: string;
  end_session_endpoint?: string;
};

type ApiDiscovery = {
  graphql_api: string;
};

export type CustomerTokenResponse = {
  access_token: string;
  expires_in?: number;
  refresh_token?: string;
  id_token?: string;
};

const DASHBOARD_QUERY = `#graphql
  query VnhCustomerDashboard {
    customer {
      displayName
      firstName
      lastName
      emailAddress { emailAddress }
      orders(first: 20, sortKey: PROCESSED_AT, reverse: true) {
        nodes {
          id
          name
          processedAt
          financialStatus
          fulfillmentStatus
          statusPageUrl
          totalPrice { amount currencyCode }
          lineItems(first: 4) {
            nodes {
              id
              title
              quantity
              image { url altText }
            }
          }
        }
      }
    }
  }
`;

export const customerAccountCookies = {
  access: 'vnh_customer_access_token',
  refresh: 'vnh_customer_refresh_token',
  idToken: 'vnh_customer_id_token',
  state: 'vnh_customer_oauth_state',
  verifier: 'vnh_customer_oauth_verifier',
  returnTo: 'vnh_customer_return_to',
} as const;

export const hostedCustomerAccountUrl = `https://${SHOPIFY_STORE_DOMAIN}/account`;

export function isCustomerAccountConfigured(env: CustomerAccountEnvironment): boolean {
  return Boolean(String(env.SHOPIFY_CUSTOMER_ACCOUNT_CLIENT_ID || '').trim());
}

async function fetchJson<T>(url: string): Promise<T> {
  const response = await fetch(url, { headers: { Accept: 'application/json' } });
  if (!response.ok) throw new Error(`Shopify account discovery returned ${response.status}.`);
  return await response.json() as T;
}

export async function discoverCustomerAuth(): Promise<AuthDiscovery> {
  return fetchJson<AuthDiscovery>(`https://${SHOPIFY_STORE_DOMAIN}/.well-known/openid-configuration`);
}

export async function discoverCustomerApi(): Promise<ApiDiscovery> {
  return fetchJson<ApiDiscovery>(`https://${SHOPIFY_STORE_DOMAIN}/.well-known/customer-account-api`);
}

const base64Url = (bytes: Uint8Array) => {
  let binary = '';
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
};

export function randomOauthToken(bytes = 32): string {
  const values = new Uint8Array(bytes);
  crypto.getRandomValues(values);
  return base64Url(values);
}

export async function pkceChallenge(verifier: string): Promise<string> {
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(verifier));
  return base64Url(new Uint8Array(digest));
}

export async function buildCustomerAuthorizationUrl(
  env: CustomerAccountEnvironment,
  redirectUri: string,
  state: string,
  nonce: string,
  verifier: string,
): Promise<string> {
  const clientId = String(env.SHOPIFY_CUSTOMER_ACCOUNT_CLIENT_ID || '').trim();
  if (!clientId) return hostedCustomerAccountUrl;
  const auth = await discoverCustomerAuth();
  const url = new URL(auth.authorization_endpoint);
  url.searchParams.set('scope', 'openid email customer-account-api:full');
  url.searchParams.set('client_id', clientId);
  url.searchParams.set('response_type', 'code');
  url.searchParams.set('redirect_uri', redirectUri);
  url.searchParams.set('state', state);
  url.searchParams.set('nonce', nonce);
  url.searchParams.set('code_challenge', await pkceChallenge(verifier));
  url.searchParams.set('code_challenge_method', 'S256');
  return url.toString();
}

export async function exchangeCustomerCode(
  env: CustomerAccountEnvironment,
  code: string,
  redirectUri: string,
  verifier: string,
): Promise<CustomerTokenResponse> {
  const clientId = String(env.SHOPIFY_CUSTOMER_ACCOUNT_CLIENT_ID || '').trim();
  if (!clientId) throw new Error('Customer Account API client ID is not configured.');
  const auth = await discoverCustomerAuth();
  const body = new URLSearchParams({
    grant_type: 'authorization_code',
    client_id: clientId,
    code,
    redirect_uri: redirectUri,
    code_verifier: verifier,
  });
  const headers: Record<string, string> = { 'Content-Type': 'application/x-www-form-urlencoded' };
  const secret = String(env.SHOPIFY_CUSTOMER_ACCOUNT_CLIENT_SECRET || '').trim();
  if (secret) headers.Authorization = `Basic ${btoa(`${clientId}:${secret}`)}`;

  const response = await fetch(auth.token_endpoint, { method: 'POST', headers, body });
  const payload = await response.json() as CustomerTokenResponse & { error?: string; error_description?: string };
  if (!response.ok || !payload.access_token) {
    throw new Error(payload.error_description || payload.error || `Shopify account token request returned ${response.status}.`);
  }
  return payload;
}

export async function getCustomerDashboard(accessToken: string): Promise<CustomerDashboard | null> {
  const api = await discoverCustomerApi();
  const response = await fetch(api.graphql_api, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: accessToken,
    },
    body: JSON.stringify({ query: DASHBOARD_QUERY }),
  });
  const payload = await response.json() as {
    data?: { customer?: CustomerDashboard | null };
    errors?: Array<{ message?: string }>;
  };
  if (response.status === 401 || response.status === 403) return null;
  if (!response.ok || payload.errors?.length) {
    const detail = payload.errors?.map((item) => item.message).filter(Boolean).join('; ');
    throw new Error(detail || `Shopify Customer Account API returned ${response.status}.`);
  }
  return payload.data?.customer ?? null;
}

export async function customerLogoutUrl(postLogoutRedirectUri: string, idToken?: string | null): Promise<string> {
  try {
    const auth = await discoverCustomerAuth();
    if (!auth.end_session_endpoint) return postLogoutRedirectUri;
    const url = new URL(auth.end_session_endpoint);
    url.searchParams.set('post_logout_redirect_uri', postLogoutRedirectUri);
    if (idToken) url.searchParams.set('id_token_hint', idToken);
    return url.toString();
  } catch {
    return postLogoutRedirectUri;
  }
}

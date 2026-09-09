import type { APIRoute } from 'astro';
import {
  buildCustomerAuthorizationUrl,
  customerAccountCookies,
  isCustomerAccountConfigured,
  randomOauthToken,
} from '../../../../lib/customerAccount';

export const prerender = false;

const secureCookie = (name: string, value: string, maxAge = 600) =>
  `${name}=${encodeURIComponent(value)}; Path=/; Max-Age=${maxAge}; HttpOnly; Secure; SameSite=Lax`;

const safeReturnTo = (value: string | null) => value && value.startsWith('/') && !value.startsWith('//') ? value : '/account';
const vnhAccountUrl = (request: Request, reason: 'setup' | 'failed') =>
  new URL(`/account?login=${reason}`, request.url).toString();

export const GET: APIRoute = async ({ request, locals, url }) => {
  const env = (((locals as any)?.runtime?.env ?? import.meta.env) as Record<string, unknown>);

  // Never fall through to the hosted Shopify account page. A headless VNH login
  // either completes through the Customer Account API or returns to VNH with a
  // clear configuration/error state.
  if (!isCustomerAccountConfigured(env)) {
    return Response.redirect(vnhAccountUrl(request, 'setup'), 302);
  }

  const redirectUri = new URL('/api/shopify/account/callback', request.url).toString();
  const state = randomOauthToken(24);
  const nonce = randomOauthToken(24);
  const verifier = randomOauthToken(48);
  const returnTo = safeReturnTo(url.searchParams.get('returnTo'));

  try {
    const authorizationUrl = await buildCustomerAuthorizationUrl(env, redirectUri, state, nonce, verifier);
    const headers = new Headers({ Location: authorizationUrl, 'Cache-Control': 'no-store' });
    headers.append('Set-Cookie', secureCookie(customerAccountCookies.state, state));
    headers.append('Set-Cookie', secureCookie(customerAccountCookies.verifier, verifier));
    headers.append('Set-Cookie', secureCookie(customerAccountCookies.returnTo, returnTo));
    return new Response(null, { status: 302, headers });
  } catch {
    return Response.redirect(vnhAccountUrl(request, 'failed'), 302);
  }
};

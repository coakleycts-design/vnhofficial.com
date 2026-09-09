import type { APIRoute } from 'astro';
import { customerAccountCookies, exchangeCustomerCode } from '../../../../lib/customerAccount';

export const prerender = false;

const readCookie = (request: Request, name: string) => {
  const raw = request.headers.get('cookie') || '';
  const part = raw.split(';').map((item) => item.trim()).find((item) => item.startsWith(`${name}=`));
  return part ? decodeURIComponent(part.slice(name.length + 1)) : '';
};

const secureCookie = (name: string, value: string, maxAge: number) =>
  `${name}=${encodeURIComponent(value)}; Path=/; Max-Age=${Math.max(0, Math.floor(maxAge))}; HttpOnly; Secure; SameSite=Lax`;

const clearCookie = (name: string) => `${name}=; Path=/; Max-Age=0; HttpOnly; Secure; SameSite=Lax`;
const safeReturnTo = (value: string) => value.startsWith('/') && !value.startsWith('//') ? value : '/account';

export const GET: APIRoute = async ({ request, locals, url }) => {
  const code = String(url.searchParams.get('code') || '');
  const state = String(url.searchParams.get('state') || '');
  const expectedState = readCookie(request, customerAccountCookies.state);
  const verifier = readCookie(request, customerAccountCookies.verifier);
  const returnTo = safeReturnTo(readCookie(request, customerAccountCookies.returnTo) || '/account');
  const destination = new URL(returnTo, request.url).toString();

  if (!code || !state || !expectedState || state !== expectedState || !verifier) {
    return Response.redirect(new URL('/account?login=failed', request.url), 302);
  }

  const env = (((locals as any)?.runtime?.env ?? import.meta.env) as Record<string, unknown>);
  const redirectUri = new URL('/api/shopify/account/callback', request.url).toString();

  try {
    const token = await exchangeCustomerCode(env, code, redirectUri, verifier);
    const maxAge = Math.max(300, Number(token.expires_in || 3600) - 60);
    const headers = new Headers({ Location: destination, 'Cache-Control': 'no-store' });
    headers.append('Set-Cookie', secureCookie(customerAccountCookies.access, token.access_token, maxAge));
    if (token.refresh_token) headers.append('Set-Cookie', secureCookie(customerAccountCookies.refresh, token.refresh_token, 60 * 60 * 24 * 30));
    if (token.id_token) headers.append('Set-Cookie', secureCookie(customerAccountCookies.idToken, token.id_token, 60 * 60 * 24));
    headers.append('Set-Cookie', clearCookie(customerAccountCookies.state));
    headers.append('Set-Cookie', clearCookie(customerAccountCookies.verifier));
    headers.append('Set-Cookie', clearCookie(customerAccountCookies.returnTo));
    return new Response(null, { status: 302, headers });
  } catch {
    return Response.redirect(new URL('/account?login=failed', request.url), 302);
  }
};

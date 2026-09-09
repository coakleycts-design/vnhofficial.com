import type { APIRoute } from 'astro';
import { customerAccountCookies, customerLogoutUrl } from '../../../../lib/customerAccount';

export const prerender = false;

const readCookie = (request: Request, name: string) => {
  const raw = request.headers.get('cookie') || '';
  const part = raw.split(';').map((item) => item.trim()).find((item) => item.startsWith(`${name}=`));
  return part ? decodeURIComponent(part.slice(name.length + 1)) : '';
};

const clearCookie = (name: string) => `${name}=; Path=/; Max-Age=0; HttpOnly; Secure; SameSite=Lax`;

export const GET: APIRoute = async ({ request }) => {
  const postLogout = new URL('/account', request.url).toString();
  const idToken = readCookie(request, customerAccountCookies.idToken);
  const destination = await customerLogoutUrl(postLogout, idToken);
  const headers = new Headers({ Location: destination, 'Cache-Control': 'no-store' });
  headers.append('Set-Cookie', clearCookie(customerAccountCookies.access));
  headers.append('Set-Cookie', clearCookie(customerAccountCookies.refresh));
  headers.append('Set-Cookie', clearCookie(customerAccountCookies.idToken));
  return new Response(null, { status: 302, headers });
};

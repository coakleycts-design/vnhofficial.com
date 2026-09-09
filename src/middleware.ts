import { defineMiddleware } from 'astro:middleware';

const noIndexPath = (pathname: string) =>
  pathname === '/cart' ||
  pathname === '/account' ||
  pathname.startsWith('/api/');

export const onRequest = defineMiddleware(async (context, next) => {
  const response = await next();
  const headers = new Headers(response.headers);

  headers.set('X-Content-Type-Options', 'nosniff');
  headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');

  if (noIndexPath(context.url.pathname)) {
    headers.set('X-Robots-Tag', 'noindex, nofollow');
    headers.set('Cache-Control', 'private, no-store');
  }

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
});

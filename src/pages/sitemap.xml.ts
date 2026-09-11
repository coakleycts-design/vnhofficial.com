import type { APIRoute } from 'astro';
import { getShopifyProducts } from '../lib/shopify';

export const prerender = false;

const SITE = 'https://vnhofficial.com';
const staticRoutes = [
  '/',
  '/shop',
  '/contact',
  '/policies/terms-of-service',
  '/policies/refund-policy',
  '/policies/shipping-policy',
  '/policies/privacy-policy',
];

const escapeXml = (value: string) => value
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')
  .replace(/'/g, '&apos;');

export const GET: APIRoute = async ({ locals, request }) => {
  const runtimeEnv = (((locals as any)?.runtime?.env ?? import.meta.env) as Record<string, unknown>);
  const buyerIp = request.headers.get('CF-Connecting-IP');
  const routes = [...staticRoutes];

  try {
    const products = await getShopifyProducts(runtimeEnv, 100, buyerIp);
    for (const product of products) {
      if (product?.handle) routes.push(`/shop/${encodeURIComponent(product.handle)}`);
    }
  } catch {
    // The core sitemap remains valid even if Shopify is temporarily unavailable.
  }

  const uniqueRoutes = [...new Set(routes)];
  const urls = uniqueRoutes
    .map((route) => `  <url><loc>${escapeXml(new URL(route, SITE).toString())}</loc></url>`)
    .join('\n');

  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;

  return new Response(body, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=300, s-maxage=3600',
    },
  });
};

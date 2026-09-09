import type { APIRoute } from 'astro';
import {
  addShopifyCartLine,
  createShopifyCart,
  getShopifyCart,
  removeShopifyCartLine,
  updateShopifyCartLine,
} from '../../../lib/shopify';

export const prerender = false;

const json = (data: unknown, status = 200) => new Response(JSON.stringify(data), {
  status,
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
  },
});

const runtimeEnv = (locals: App.Locals) => (((locals as any)?.runtime?.env ?? import.meta.env) as Record<string, unknown>);
const buyerIp = (request: Request) => request.headers.get('CF-Connecting-IP');
const cleanQuantity = (value: unknown, fallback = 1) => {
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) return fallback;
  return Math.max(0, Math.min(99, Math.floor(parsed)));
};

export const GET: APIRoute = async ({ request, url, locals }) => {
  const cartId = String(url.searchParams.get('cartId') || '').trim();
  if (!cartId) return json({ ok: false, error: 'Missing cart ID.' }, 400);

  try {
    const cart = await getShopifyCart(runtimeEnv(locals), cartId, buyerIp(request));
    if (!cart) return json({ ok: false, error: 'Cart not found.' }, 404);
    return json({ ok: true, cart });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unable to load cart.';
    return json({ ok: false, error: message }, 400);
  }
};

export const POST: APIRoute = async ({ request, locals }) => {
  let body: Record<string, unknown> = {};
  try {
    body = await request.json();
  } catch {
    return json({ ok: false, error: 'Invalid request body.' }, 400);
  }

  const action = String(body.action || '').trim();
  const cartId = String(body.cartId || '').trim();
  const merchandiseId = String(body.merchandiseId || '').trim();
  const lineId = String(body.lineId || '').trim();
  const quantity = cleanQuantity(body.quantity, 1);
  const env = runtimeEnv(locals);
  const ip = buyerIp(request);

  try {
    if (action === 'add') {
      if (!merchandiseId) return json({ ok: false, error: 'Missing product variant.' }, 400);
      if (quantity < 1) return json({ ok: false, error: 'Quantity must be at least 1.' }, 400);

      let cart;
      if (cartId) {
        try {
          cart = await addShopifyCartLine(env, cartId, merchandiseId, quantity, ip);
        } catch {
          // Expired or stale browser cart IDs should never strand the shopper.
          cart = await createShopifyCart(env, merchandiseId, quantity, ip);
        }
      } else {
        cart = await createShopifyCart(env, merchandiseId, quantity, ip);
      }
      return json({ ok: true, cart });
    }

    if (action === 'update') {
      if (!cartId || !lineId) return json({ ok: false, error: 'Missing cart or line ID.' }, 400);
      if (quantity < 1) return json({ ok: false, error: 'Use remove to delete an item.' }, 400);
      const cart = await updateShopifyCartLine(env, cartId, lineId, quantity, ip);
      return json({ ok: true, cart });
    }

    if (action === 'remove') {
      if (!cartId || !lineId) return json({ ok: false, error: 'Missing cart or line ID.' }, 400);
      const cart = await removeShopifyCartLine(env, cartId, lineId, ip);
      return json({ ok: true, cart });
    }

    return json({ ok: false, error: 'Unsupported cart action.' }, 400);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unable to update cart.';
    return json({ ok: false, error: message }, 400);
  }
};

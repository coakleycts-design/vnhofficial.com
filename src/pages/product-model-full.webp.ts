import modelB64 from '../assets/product-model.b64.txt?raw';

export const prerender = false;

export function GET() {
  const clean = modelB64.replace(/\s+/g, '');
  const binary = atob(clean);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) bytes[i] = binary.charCodeAt(i);

  const validWebP =
    bytes.length > 12 &&
    String.fromCharCode(...bytes.slice(0, 4)) === 'RIFF' &&
    String.fromCharCode(...bytes.slice(8, 12)) === 'WEBP';

  if (!validWebP) {
    return new Response('Invalid product image', { status: 500, headers: { 'Cache-Control': 'no-store' } });
  }

  return new Response(bytes, {
    headers: {
      'Content-Type': 'image/webp',
      'Cache-Control': 'no-store, max-age=0'
    }
  });
}

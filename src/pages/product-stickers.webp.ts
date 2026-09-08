import stickerB64 from '../assets/product-stickers.b64.txt?raw';

export const prerender = false;

export function GET() {
  const clean = stickerB64.replace(/\s+/g, '');
  const binary = atob(clean);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) bytes[i] = binary.charCodeAt(i);
  return new Response(bytes, {
    headers: {
      'Content-Type': 'image/webp',
      'Cache-Control': 'public, max-age=86400'
    }
  });
}

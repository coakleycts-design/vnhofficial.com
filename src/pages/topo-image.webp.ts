export const prerender = false;

const SOURCE = 'https://raw.githubusercontent.com/coakleycts-design/vnhofficial.com/9da98193f40943c31a06b3f2ec620e7eb2dd5895/public/topo.webp';

export async function GET() {
  const sourceResponse = await fetch(SOURCE, {
    headers: { 'User-Agent': 'VNH-site' }
  });

  if (!sourceResponse.ok) {
    return new Response('Topo background unavailable', { status: 502 });
  }

  const base64 = (await sourceResponse.text()).replace(/\s+/g, '');
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) bytes[i] = binary.charCodeAt(i);

  return new Response(bytes, {
    headers: {
      'Content-Type': 'image/webp',
      'Cache-Control': 'public, max-age=86400, s-maxage=31536000, immutable'
    }
  });
}

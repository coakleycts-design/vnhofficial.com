import c0 from '../assets-data/topo-00.txt?raw';
import c1 from '../assets-data/topo-01.txt?raw';
import c2 from '../assets-data/topo-02.txt?raw';
import c3 from '../assets-data/topo-03.txt?raw';
import c4 from '../assets-data/topo-04.txt?raw';

export const prerender = false;

export async function GET() {
  const b64 = (c0 + c1 + c2 + c3 + c4).replace(/\s+/g, '');
  const binary = atob(b64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) bytes[i] = binary.charCodeAt(i);

  return new Response(bytes, {
    headers: {
      'Content-Type': 'image/webp',
      'Cache-Control': 'public, max-age=86400, s-maxage=31536000, immutable'
    }
  });
}

import headUrl from '../assets-data/topo-head.webp?url';
import c0 from '../assets-data/topo-00.txt?raw';
import c1 from '../assets-data/topo-01.txt?raw';
import c2 from '../assets-data/topo-02.txt?raw';
import c3 from '../assets-data/topo-03.txt?raw';
import c4 from '../assets-data/topo-04.txt?raw';

export const prerender = false;

export async function GET({ request }: { request: Request }) {
  const headResponse = await fetch(new URL(headUrl, request.url));
  if (!headResponse.ok) {
    return new Response('Topo background header unavailable', { status: 502 });
  }

  const head = new Uint8Array(await headResponse.arrayBuffer());
  const tailBase64 = (c0 + c1 + c2 + c3 + c4).replace(/\s+/g, '');
  const tailBinary = atob(tailBase64);
  const tail = new Uint8Array(tailBinary.length);
  for (let i = 0; i < tailBinary.length; i += 1) tail[i] = tailBinary.charCodeAt(i);

  const complete = new Uint8Array(head.length + tail.length);
  complete.set(head, 0);
  complete.set(tail, head.length);

  return new Response(complete, {
    headers: {
      'Content-Type': 'image/webp',
      'Cache-Control': 'public, max-age=86400, s-maxage=31536000, immutable'
    }
  });
}

import c00 from '../topo-complete/topo-00.txt?raw';
import c01 from '../topo-complete/topo-01.txt?raw';
import c02 from '../topo-complete/topo-02.txt?raw';
import c03a from '../topo-complete/topo-03a.txt?raw';
import c03b from '../topo-complete/topo-03b.txt?raw';
import c04a from '../topo-complete/topo-04a.txt?raw';
import c04b from '../topo-complete/topo-04b.txt?raw';
import c05a from '../topo-complete/topo-05a.txt?raw';
import c05b from '../topo-complete/topo-05b.txt?raw';
import c06a from '../topo-complete/topo-06a.txt?raw';
import c06b from '../topo-complete/topo-06b.txt?raw';
import c07a from '../topo-complete/topo-07a.txt?raw';
import c07b from '../topo-complete/topo-07b.txt?raw';

export const prerender = false;

const EXPECTED_BASE64_LENGTH = 75444;
const EXPECTED_WEBP_BYTES = 56582;

export async function GET() {
  const b64 = (
    c00 + c01 + c02 +
    c03a + c03b +
    c04a + c04b +
    c05a + c05b +
    c06a + c06b +
    c07a + c07b
  ).replace(/\s+/g, '');

  if (b64.length !== EXPECTED_BASE64_LENGTH) {
    return new Response(`Topo data incomplete: ${b64.length}`, { status: 500 });
  }

  const binary = atob(b64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) bytes[i] = binary.charCodeAt(i);

  if (bytes.length !== EXPECTED_WEBP_BYTES) {
    return new Response(`Topo decode failed: ${bytes.length}`, { status: 500 });
  }

  return new Response(bytes, {
    headers: {
      'Content-Type': 'image/webp',
      'Content-Length': String(bytes.length),
      'Cache-Control': 'public, max-age=300, s-maxage=300',
      'X-VNH-Topo-Bytes': String(bytes.length)
    }
  });
}

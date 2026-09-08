import part0 from '../assets-data/model-jpg-00.txt?raw';
import part1 from '../assets-data/model-jpg-01.txt?raw';
import part2 from '../assets-data/model-jpg-02.txt?raw';

export const prerender = false;

export function GET() {
  const base64 = `${part0}${part1}${part2}`.replace(/\s+/g, '');
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) bytes[i] = binary.charCodeAt(i);

  if (bytes.length !== 15122 || bytes[0] !== 0xff || bytes[1] !== 0xd8 || bytes[bytes.length - 2] !== 0xff || bytes[bytes.length - 1] !== 0xd9) {
    return new Response('Invalid model image', { status: 500 });
  }

  return new Response(bytes, {
    headers: {
      'Content-Type': 'image/jpeg',
      'Cache-Control': 'public, max-age=3600'
    }
  });
}

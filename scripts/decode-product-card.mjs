import { readFileSync, writeFileSync } from 'node:fs';

const encoded = readFileSync(new URL('../public/product-model-card-320x260.jpg.b64', import.meta.url), 'utf8').replace(/\s+/g, '');
const bytes = Buffer.from(encoded, 'base64');
if (bytes[0] !== 0xff || bytes[1] !== 0xd8 || bytes[bytes.length - 2] !== 0xff || bytes[bytes.length - 1] !== 0xd9) {
  throw new Error('Invalid pre-sized VNH product-card JPEG');
}
writeFileSync(new URL('../public/product-model-card-320x260.jpg', import.meta.url), bytes);
console.log(`Decoded pre-sized VNH product card (${bytes.length} bytes)`);

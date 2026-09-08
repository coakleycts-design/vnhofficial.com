import stickersB64 from './product-stickers-small.b64.txt?raw';

export const stickersFallbackSrc = `data:image/webp;base64,${stickersB64.replace(/\s+/g, '')}`;

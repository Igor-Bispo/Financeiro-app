import { readFileSync, writeFileSync } from 'fs';
import { brotliCompressSync } from 'zlib';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const swPath = resolve(__dirname, '../dist/service-worker.js');
const outPath = resolve(__dirname, '../dist/service-worker.js.br');

const input = readFileSync(swPath);
const compressed = brotliCompressSync(input);
writeFileSync(outPath, compressed);
console.log('Brotli compressed:', outPath, 'size:', compressed.length);
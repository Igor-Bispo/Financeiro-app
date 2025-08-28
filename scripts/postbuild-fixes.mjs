// scripts/postbuild-fixes.mjs
// ESM-only script to run after Vite build. Copies PWA files, normalizes index.html,
// replaces any leftover eval(onConfirm), and prunes stale main-*.js bundles.

import { copyFileSync, existsSync, readFileSync, writeFileSync, readdirSync, unlinkSync, statSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const root = join(__dirname, '..');
const distDir = join(root, 'dist');
const assetsDir = join(distDir, 'assets');

function ensureDir(p) { try { mkdirSync(dirname(p), { recursive: true }); } catch {} }

function copyPWAFiles() {
  const filesToCopy = [
    'public/service-worker.js',
    'public/manifest.json',
    'public/icon-192.png',
    'public/icon-512.png',
    'offline.html',
  ];

  for (const file of filesToCopy) {
    const src = join(root, file);
    const dest = join(distDir, file.replace('public/', ''));
    if (existsSync(src)) {
      ensureDir(dest);
      copyFileSync(src, dest);
      console.log(`📱 PWA: Copiado ${file} para dist/`);
    } else {
      console.warn(`⚠️ PWA: Arquivo ${file} não encontrado`);
    }
  }
}

function sanitizeEvalAndNormalizeHtml() {
  if (!existsSync(assetsDir)) return;
  const files = readdirSync(assetsDir).filter(f => f.endsWith('.js'));
  const replacement = 'window.__safeCallGlobal(onConfirm)';

  // Replace eval(onConfirm) in emitted chunks
  for (const f of files) {
    const fp = join(assetsDir, f);
    try {
      let content = readFileSync(fp, 'utf8');
      if (content.includes('eval(onConfirm)')) {
        content = content.split('eval(onConfirm)').join(replacement);
        writeFileSync(fp, content);
        console.log(`🛡️ Sanitizado eval em: ${f}`);
      }
    } catch {}
  }

  // Normalize index.html to reference latest main-*.js only
  const htmlPath = join(distDir, 'index.html');
  if (!existsSync(htmlPath)) return;

  let html = readFileSync(htmlPath, 'utf8');
  const mainFiles = files.filter(f => f.startsWith('main-'));
  if (!mainFiles.length) return;

  const newest = mainFiles
    .map(f => ({ f, t: (() => { try { return statSync(join(assetsDir, f)).mtimeMs; } catch { return 0; } })() }))
    .sort((a, b) => b.t - a.t)[0].f;

  const scriptTag = `    <script type="module" src="/assets/${newest}"></script>`;
  html = html.replace(/<script[^>]+type=['"]module['"][^>]+src=['"](?:\.\/|\/)assets\/main-[^'\"]+\.js['"][^>]*><\/script>/ig, '');
  if (html.includes('    <!-- App Principal -->')) {
    html = html.replace('    <!-- App Principal -->', `    <!-- App Principal -->\n${scriptTag}`);
  } else {
    html = html.replace('</head>', `${scriptTag}\n  </head>`);
  }
  writeFileSync(htmlPath, html);
  console.log(`🔁 index.html normalizado para ${newest}`);

  for (const mf of mainFiles) {
    if (mf !== newest) {
      try {
        unlinkSync(join(assetsDir, mf));
        console.log(`🧹 Removido bundle antigo não referenciado: ${mf}`);
      } catch (e) {
        console.warn(`⚠️ Falha ao remover bundle antigo: ${mf}`, e);
      }
      // Tenta remover a versão comprimida (.br) também
      try {
        const br = `${mf}.br`;
        const brPath = join(assetsDir, br);
        if (existsSync(brPath)) {
          unlinkSync(brPath);
          console.log(`🧹 Removido bundle .br antigo: ${br}`);
        }
      } catch (e) {
        console.warn(`⚠️ Falha ao remover bundle .br antigo: ${mf}.br`, e);
      }
    }
  }
}

function run() {
  if (!existsSync(distDir)) {
    console.warn('⚠️ dist/ inexistente; nada a fazer.');
    return;
  }
  copyPWAFiles();
  sanitizeEvalAndNormalizeHtml();
}

run();

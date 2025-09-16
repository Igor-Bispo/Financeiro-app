import { rm, stat } from 'node:fs/promises';
import { resolve } from 'node:path';

const root = resolve('.');
const targets = [
  // Root PWA duplicates
  'service-worker.js',
  'manifest.json',
  'offline.html',
  'favicon.ico',
  'icon-192.png',
  'icon-512.png',
  // Stray/unused
  'vite.config.advanced.js',
  'tatus',
  // Public test artifact
  'public/test-manifest.html',
  // Test backup artifact
  'tests/notifications.repo.test.js.backup',
  // Deprecated ESLint ignore file
  '.eslintignore'
];

async function exists(p) {
  try {
    await stat(p);
    return true;
  } catch {
    return false;
  }
}

async function safeRm(p) {
  const full = resolve(root, p);
  if (await exists(full)) {
    await rm(full, { force: true, recursive: false });
    console.log(`Deleted: ${p}`);
  } else {
    console.log(`Skipped (not found): ${p}`);
  }
}

(async () => {
  for (const t of targets) {
    try {
      await safeRm(t);
    } catch (e) {
      console.error(`Failed to delete ${t}:`, e.message);
    }
  }
})();

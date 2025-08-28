import { defineConfig } from 'vite';
import { resolve } from 'path';
import viteCompression from 'vite-plugin-compression';


export default defineConfig({
  root: 'src',
  publicDir: resolve(__dirname, 'public'),
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    cssCodeSplit: false,
  rollupOptions: {
      external: ['css'],
      input: {
        main: resolve(__dirname, 'src/index.html')
      },
      output: {
        // Improve chunking to reduce main bundle size
        manualChunks(id) {
          // Third-party: Firebase SDK
          if (id.includes('node_modules/firebase/')) return 'vendor-firebase';
          // App layers
          if (id.includes('/src/features/')) return 'features';
          if (id.includes('/src/js/ui/')) return 'ui';
          if (id.includes('/src/data/repositories/')) return 'repos';
          if (id.includes('/src/data/firebase/')) return 'firebase-client';
          return undefined;
        }
      },
      plugins: [
        // Rollup-level sanitizer to rewrite any eval(onConfirm) inside emitted chunks
  {
          name: 'rollup-sanitize-eval-onconfirm',
          generateBundle(_options, bundle) {
            for (const [fileName, chunk] of Object.entries(bundle)) {
              if (fileName.endsWith('.js') && 'code' in chunk && typeof chunk.code === 'string') {
    if (chunk.code.includes('eval(onConfirm)')) {
      chunk.code = chunk.code.split('eval(onConfirm)').join('window.__safeCallGlobal(onConfirm)');
                  this.warn(`🛡️ Sanitizado eval(onConfirm) em chunk: ${fileName}`);
                }
              }
            }
          }
        }
      ]
    }
  },
  resolve: {
    alias: {
      '@js': resolve(__dirname, 'src/js'),
      '@css': resolve(__dirname, 'src/css'),
  '@assets': resolve(__dirname, 'src/assets'),
  '@app': resolve(__dirname, 'src/app'),
  '@core': resolve(__dirname, 'src/core'),
  '@data': resolve(__dirname, 'src/data'),
  '@features': resolve(__dirname, 'src/features'),
  '@ui': resolve(__dirname, 'src/ui'),
    },
  },
  server: {
    open: true,
    host: true,
  port: 5176,
    strictPort: false,
  },
  plugins: [
    viteCompression({
      algorithm: 'brotliCompress',
      ext: '.br',
      threshold: 10240,
    }),
  ],
  test: {
  environment: 'node',
  globals: true,
  include: ['../tests/**/*.test.js', 'tests/**/*.test.js'],
  },
});

import { defineConfig } from 'vite';
import { resolve } from 'path';
import viteCompression from 'vite-plugin-compression';
import { copyFileSync, existsSync, readFileSync, writeFileSync, readdirSync } from 'fs';
import { join } from 'path';

// Plugin para copiar arquivos PWA e corrigir HTML
function copyPWAFiles() {
  return {
    name: 'copy-pwa-files',
    closeBundle() {
      const filesToCopy = [
        'public/service-worker.js',
        'public/manifest.json',
        'public/icon-192.png',
        'public/icon-512.png',
        'public/offline.html'
      ];
      
      filesToCopy.forEach(file => {
        const sourcePath = join(__dirname, file);
        const destPath = join(__dirname, 'dist', file.replace('public/', ''));
        
        if (existsSync(sourcePath)) {
          copyFileSync(sourcePath, destPath);
          console.log(`📱 PWA: Copiado ${file} para dist/`);
        } else {
          console.warn(`⚠️ PWA: Arquivo ${file} não encontrado`);
        }
      });
      
      // Corrigir HTML para incluir o script principal
      const htmlPath = join(__dirname, 'dist', 'index.html');
      
      if (existsSync(htmlPath)) {
        let htmlContent = readFileSync(htmlPath, 'utf8');
        
        // Verificar se o script já está incluído
        if (!htmlContent.includes('<script type="module" src="./assets/')) {
          // Encontrar o arquivo JS gerado
          const assetsDir = join(__dirname, 'dist', 'assets');
          if (existsSync(assetsDir)) {
            const files = readdirSync(assetsDir);
            const jsFile = files.find(f => f.endsWith('.js') && f.startsWith('main-'));
            
            if (jsFile) {
              const scriptTag = `    <script type="module" src="./assets/${jsFile}"></script>`;
              htmlContent = htmlContent.replace(
                '    <!-- App Principal -->',
                `    <!-- App Principal -->\n${scriptTag}`
              );
              writeFileSync(htmlPath, htmlContent);
              console.log(`✅ Script ${jsFile} adicionado ao HTML`);
            }
          }
        }
      }
    }
  };
}

export default defineConfig({
  root: 'src',
  publicDir: resolve(__dirname, 'public'),
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    cssCodeSplit: true, // Habilitar code splitting CSS
    rollupOptions: {
      external: ['css'],
      input: {
        main: resolve(__dirname, 'src/index.html')
      },
      output: {
        // Configurações básicas de output
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]'
      }
    },
    // Otimizações de build
    minify: true,
    // Análise de bundle
    reportCompressedSize: true,
    chunkSizeWarningLimit: 1000
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
  strictPort: true,
  },
  plugins: [
    viteCompression({
      algorithm: 'brotliCompress',
      ext: '.br',
      threshold: 10240,
    }),
    copyPWAFiles(),
  ],
  test: {
    environment: 'node',
    globals: true,
    include: ['../tests/**/*.test.js', 'tests/**/*.test.js'],
  },
  // Otimizações de desenvolvimento
  optimizeDeps: {
    include: [
      'firebase/app',
  'firebase/auth',
      'firebase/firestore',
      '@core/events/eventBus',
      '@core/store/createStore'
    ]
  }
});

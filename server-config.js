/**
 * Configuração do Servidor de Desenvolvimento
 * 
 * Este arquivo resolve problemas de MIME types e outros erros comuns
 * em servidores de desenvolvimento local.
 */

const express = require('express');
const path = require('path');
const fs = require('fs');

/**
 * Configuração de MIME types corretos
 */
const mimeTypes = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.gif': 'image/gif',
  '.ico': 'image/x-icon',
  '.svg': 'image/svg+xml',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.eot': 'application/vnd.ms-fontobject'
};

/**
 * Middleware para configurar MIME types corretos
 */
function configurarMimeTypes(req, res, next) {
  const ext = path.extname(req.url).toLowerCase();
  const mimeType = mimeTypes[ext];
  
  if (mimeType) {
    res.setHeader('Content-Type', mimeType);
  }
  
  next();
}

/**
 * Middleware para servir favicon
 */
function servirFavicon(req, res, next) {
  if (req.url === '/favicon.ico') {
    const faviconPath = path.join(__dirname, 'favicon.ico');
    
    if (fs.existsSync(faviconPath)) {
      res.setHeader('Content-Type', 'image/x-icon');
      res.sendFile(faviconPath);
      return;
    } else {
      // Criar um favicon simples se não existir
      res.setHeader('Content-Type', 'image/x-icon');
      res.status(200).send('');
      return;
    }
  }
  
  next();
}

/**
 * Middleware para servir manifest.json
 */
function servirManifest(req, res, next) {
  if (req.url === '/manifest.json') {
    const manifestPath = path.join(__dirname, 'manifest.json');
    
    if (fs.existsSync(manifestPath)) {
      res.setHeader('Content-Type', 'application/json');
      res.sendFile(manifestPath);
      return;
    } else {
      // Criar um manifest básico se não existir
      const manifestBasico = {
        "name": "Financeiro App",
        "short_name": "FinanceiroApp",
        "description": "Aplicativo de controle financeiro pessoal",
        "start_url": "/",
        "display": "standalone",
        "background_color": "#ffffff",
        "theme_color": "#000000",
        "icons": [
          {
            "src": "/icon-192.png",
            "sizes": "192x192",
            "type": "image/png"
          },
          {
            "src": "/icon-512.png",
            "sizes": "512x512",
            "type": "image/png"
          }
        ]
      };
      
      res.setHeader('Content-Type', 'application/json');
      res.json(manifestBasico);
      return;
    }
  }
  
  next();
}

/**
 * Middleware para servir service worker
 */
function servirServiceWorker(req, res, next) {
  if (req.url === '/service-worker.js') {
    const swPath = path.join(__dirname, 'service-worker.js');
    
    if (fs.existsSync(swPath)) {
      res.setHeader('Content-Type', 'text/javascript');
      res.sendFile(swPath);
      return;
    } else {
      // Criar um service worker básico se não existir
      const swBasico = `
// Service Worker Básico
const CACHE_NAME = 'financeiro-app-v1';
const urlsToCache = [
  '/',
  '/app.js',
  '/style.css',
  '/manifest.json'
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});
`;
      
      res.setHeader('Content-Type', 'text/javascript');
      res.send(swBasico);
      return;
    }
  }
  
  next();
}

/**
 * Configuração do servidor Express
 */
function criarServidor(porta = 5175) {
  const app = express();
  
  // Aplicar middlewares
  app.use(servirFavicon);
  app.use(servirManifest);
  app.use(servirServiceWorker);
  app.use(configurarMimeTypes);
  
  // Servir arquivos estáticos
  app.use(express.static(__dirname, {
    setHeaders: (res, path) => {
      const ext = path.split('.').pop();
      const mimeType = mimeTypes[`.${ext}`];
      if (mimeType) {
        res.setHeader('Content-Type', mimeType);
      }
    }
  }));
  
  // Rota para SPA (Single Page Application)
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
  });
  
  return app;
}

/**
 * Iniciar servidor
 */
function iniciarServidor(porta = 5175) {
  const app = criarServidor(porta);
  
  app.listen(porta, () => {
    console.log(`🚀 Servidor iniciado em http://localhost:${porta}`);
    console.log('✅ MIME types configurados corretamente');
    console.log('✅ Favicon, manifest e service worker configurados');
  });
  
  return app;
}

/**
 * Configuração para Vite (se estiver usando)
 */
function configurarVite() {
  return {
    server: {
      port: 5175,
      host: true,
      cors: true,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization'
      }
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks: undefined
        }
      }
    },
    define: {
      global: 'globalThis'
    },
    optimizeDeps: {
      include: ['firebase/app', 'firebase/auth', 'firebase/firestore']
    }
  };
}

/**
 * Configuração para webpack-dev-server
 */
function configurarWebpack() {
  return {
    devServer: {
      port: 5175,
      host: 'localhost',
      hot: true,
      historyApiFallback: true,
      static: {
        directory: __dirname,
        publicPath: '/'
      },
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
        'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization'
      },
      onBeforeSetupMiddleware: function(devServer) {
        if (!devServer) {
          throw new Error('webpack-dev-server is not defined');
        }
        
        // Aplicar middlewares customizados
        devServer.app.use(servirFavicon);
        devServer.app.use(servirManifest);
        devServer.app.use(servirServiceWorker);
        devServer.app.use(configurarMimeTypes);
      }
    }
  };
}

// Exportar configurações
module.exports = {
  criarServidor,
  iniciarServidor,
  configurarVite,
  configurarWebpack,
  mimeTypes,
  configurarMimeTypes,
  servirFavicon,
  servirManifest,
  servirServiceWorker
};

// Se executado diretamente, iniciar servidor
if (require.main === module) {
  iniciarServidor();
}
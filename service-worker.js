// Versão do Service Worker - atualize sempre que modificar este arquivo
const VERSION = 'v4.3.2-daily-fix';
const STATIC_CACHE = `financeiro-static-${VERSION}`;
const DYNAMIC_CACHE = `financeiro-dynamic-${VERSION}`;
const FALLBACK_CACHE = `financeiro-fallback-${VERSION}`;
const MAX_CACHE_ITEMS = 100;

// Verificar se estamos em desenvolvimento
const IS_DEVELOPMENT = location.hostname === 'localhost' || location.hostname === '127.0.0.1';
const DEBUG = IS_DEVELOPMENT; // Ativar debug em desenvolvimento
function log(...args) {
  if (DEBUG) {console.log('[SW]', ...args);}
}

// Assets críticos para pré-cache (arquivos corretos do projeto)
const ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/favicon.ico',
  '/icon-192.png',
  '/icon-512.png',
  '/offline.html'
];

// Recursos externos para cache
const EXTERNAL_RESOURCES = [
  'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap',
  // Removido CDN do Tailwind - agora processado localmente
  'https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js'
];

// Rotas para estratégia Cache First
const CACHE_FIRST_ROUTES = [
  '/css/',
  '/js/',
  '/assets/',
  '.css',
  '.js',
  '.woff2',
  '.woff',
  '.ttf',
  '.png',
  '.jpg',
  '.svg',
  '.ico',
  'fonts.googleapis.com',
  'fonts.gstatic.com'
];

// Rotas para estratégia stale-while-revalidate
const STALE_WHILE_REVALIDATE_ROUTES = [
  '/',
  '/index.html',
  '/manifest.json',
  '/favicon.ico',
  '/@vite/',
  '/@fs/'
];

// Rotas para ignorar cache
const NETWORK_ONLY_ROUTES = [
  '/api/',
  '/auth/',
  'https://www.googleapis.com/',
  'https://identitytoolkit.googleapis.com/',
  'https://securetoken.googleapis.com/',
  'https://accounts.google.com/',
  '__/auth/'
];

// Instalação - Pré-cache de assets críticos
self.addEventListener('install', (e) => {
  log('Instalando Service Worker');

  e.waitUntil(
    Promise.all([
      // Cache estático principal
      caches.open(STATIC_CACHE).then(cache => {
        log('Adicionando assets ao cache estático');
        return Promise.allSettled(
          ASSETS.map(url => cache.add(url).catch(err => {
            log(`Falha ao cachear ${url}:`, err);
            return null;
          }))
        );
      }),
      // Cache de recursos externos úteis offline
      caches.open(DYNAMIC_CACHE).then(cache => {
        log('Adicionando recursos externos ao cache');
        return Promise.allSettled(
          EXTERNAL_RESOURCES.map(url => cache.add(url).catch(err => {
            log(`Falha ao cachear recurso externo ${url}:`, err);
            return null;
          }))
        );
      })
    ])
      .then(() => {
        log('Pré-cache completo');
        return self.skipWaiting();
      })
      .catch(err => {
        log('Erro durante instalação:', err);
      })
  );
});

// Ativação - Limpeza de caches antigos
self.addEventListener('activate', (e) => {
  log('Ativando novo Service Worker');

  e.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => {
          if (![STATIC_CACHE, DYNAMIC_CACHE, FALLBACK_CACHE].includes(key)) {
            log('Removendo cache antigo:', key);
            return caches.delete(key);
          }
        })
      );
    })
      .then(async () => {
        log('Pronto para controlar clientes');
        await self.clients.claim();
        // Notificar páginas que o SW está pronto (permite limpezas/atualizações client-side)
        try {
          const clients = await self.clients.matchAll();
          clients.forEach(client => client.postMessage({ type: 'READY', version: VERSION }));
        } catch {}
      })
      .catch(err => {
        log('Erro durante ativação:', err);
      })
  );
});

// Interceptação de requisições
self.addEventListener('fetch', (e) => {
  const { request } = e;
  const url = new URL(request.url);

  // Em desenvolvimento, só interceptar recursos específicos
  if (IS_DEVELOPMENT) {
    // Não interceptar Firebase Auth
    if (url.href.includes('identitytoolkit.googleapis.com') ||
        url.href.includes('securetoken.googleapis.com') ||
        url.href.includes('accounts.google.com') ||
        url.href.includes('www.googleapis.com')) {
      return;
    }
    
    // Não interceptar recursos do Vite
    if (url.pathname.includes('/@vite/') ||
        url.pathname.includes('/@fs/') ||
        url.pathname.includes('/node_modules/') ||
        url.pathname.includes('.ts') ||
        url.pathname.includes('.js') ||
        url.pathname.includes('.css') ||
        url.pathname.includes('.vue') ||
        url.pathname.includes('.jsx') ||
        url.pathname.includes('.tsx')) {
      return;
    }
  }

  // Ignorar requisições não-GET
  if (request.method !== 'GET') {
    return;
  }

  // Estratégia para diferentes tipos de recursos
  if (isStaticAsset(url.pathname)) {
    e.respondWith(cacheFirst(request));
  } else if (isNetworkOnly(url)) {
    e.respondWith(networkOnly(request));
  } else if (isStaleWhileRevalidate(url.pathname)) {
    e.respondWith(staleWhileRevalidate(request));
  } else {
    e.respondWith(networkFirstWithFallback(request));
  }
});

// Verificar se é um asset estático
function isStaticAsset(pathname) {
  return CACHE_FIRST_ROUTES.some(route => pathname.includes(route));
}

// Verificar se é uma rota stale-while-revalidate
function isStaleWhileRevalidate(pathname) {
  return STALE_WHILE_REVALIDATE_ROUTES.some(route => pathname.includes(route));
}

// Verificar se é uma rota que deve ignorar o cache
function isNetworkOnly(url) {
  // Em desenvolvimento local, sempre passar Firebase Auth diretamente
  if (url.hostname === 'localhost' || url.hostname === '127.0.0.1') {
    if (url.href.includes('identitytoolkit.googleapis.com') ||
        url.href.includes('securetoken.googleapis.com') ||
        url.href.includes('accounts.google.com') ||
        url.href.includes('www.googleapis.com')) {
      return true;
    }
  }
  
  // Firebase Auth e Google APIs nunca devem ser interceptados
  const firebaseAuthDomains = [
    'identitytoolkit.googleapis.com',
    'securetoken.googleapis.com',
    'accounts.google.com',
    'www.googleapis.com'
  ];
  
  // Verificar se é domínio do Firebase Auth
  if (firebaseAuthDomains.some(domain => url.href.includes(domain))) {
    return true;
  }
  
  // Considera tanto pathname quanto href para cobrir absolutos
  return (
    NETWORK_ONLY_ROUTES.some(route => url.pathname.includes(route) || url.href.includes(route)) ||
    url.pathname.includes('/@vite/') ||
    url.pathname.includes('/@fs/') ||
    url.pathname.includes('__/auth/')
  );
}

// Importar estratégias compartilhadas se disponíveis (Rollup/Vite irá inlining se suportado)
// fallback silencioso caso falhe (ex: caminho diferente em produção)
let strat = {};
try {
  strat = self.__PWA_STRATEGIES__ || {};
} catch {}
const networkFirstWithFallback = strat.networkFirstWithFallback || (async (req)=>{
  // fallback para implementação local mínima (mantida simples)
  try {
    const resp = await fetch(req, { cache: 'no-cache' });
    if (resp.ok) { try { await addToCache(DYNAMIC_CACHE, req, resp.clone()); } catch {} }
    return resp;
  } catch (e) {
    // Limitar o fallback aos caches da versão atual para evitar servir assets antigos após atualização
    let cached = null;
    try {
      const staticCache = await caches.open(STATIC_CACHE);
      cached = await staticCache.match(req);
      if (!cached) {
        const dynCache = await caches.open(DYNAMIC_CACHE);
        cached = await dynCache.match(req);
      }
    } catch {}
    if (!cached && req.destination==='document') {
      cached = await caches.match('/offline.html');
    }
    if (cached) return cached; throw e;
  }
});
const cacheFirst = strat.cacheFirst || (async (req) => {
  const staticCache = await caches.open(STATIC_CACHE);
  const cached = await staticCache.match(req);
  if (cached) return cached;
  const r = await fetch(req, { cache: 'no-cache' });
  if (r.ok) { try { await addToCache(STATIC_CACHE, req, r.clone()); } catch {} }
  return r;
});
const networkOnly = strat.networkOnly || ((req) => fetch(req));
const staleWhileRevalidate = strat.staleWhileRevalidate || (async (req) => {
  const cache = await caches.open(DYNAMIC_CACHE);
  const cached = await cache.match(req);
  fetch(req, { cache: 'no-cache' })
    .then(r => { if (r.ok) { try { cache.put(req, r.clone()); } catch {} } })
    .catch(() => {});
  return cached || fetch(req, { cache: 'no-cache' });
});

// Adicionar ao cache
async function addToCache(cacheName, request, response) {
  try {
    const cache = await caches.open(cacheName);
    await cache.put(request, response);

    // Limpar cache se necessário
    if (cacheName === DYNAMIC_CACHE) {
      trimCache(cacheName);
    }
  } catch (error) {
    log('Erro ao adicionar ao cache:', error);
  }
}

// Limpar cache antigo
async function trimCache(cacheName) {
  try {
    const cache = await caches.open(cacheName);
    const keys = await cache.keys();

    if (keys.length > MAX_CACHE_ITEMS) {
      const keysToDelete = keys.slice(0, keys.length - MAX_CACHE_ITEMS);
      await Promise.all(keysToDelete.map(key => cache.delete(key)));
      log(`Removidos ${keysToDelete.length} itens do cache ${cacheName}`);
    }
  } catch (error) {
    log('Erro ao limpar cache:', error);
  }
}

// Background Sync para dados offline
self.addEventListener('sync', (e) => {
  if (e.tag === 'background-sync') {
    e.waitUntil(syncData());
  }
});

// Sincronizar dados quando online
async function syncData() {
  try {
    const clients = await self.clients.matchAll();
    clients.forEach(client => {
      client.postMessage({
        type: 'SYNC_DATA',
        timestamp: Date.now()
      });
    });
  } catch (error) {
    log('Erro na sincronização:', error);
  }
}

// Atualizar conteúdo quando nova versão disponível
self.addEventListener('message', (e) => {
  if (e.data && e.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }

  if (e.data && e.data.type === 'UPDATE_CONTENT') {
    updateContent();
  }
});

async function updateContent() {
  try {
    const clients = await self.clients.matchAll();
    clients.forEach(client => {
      client.postMessage({
        type: 'UPDATE_AVAILABLE',
        timestamp: Date.now()
      });
    });
  } catch (error) {
    log('Erro ao atualizar conteúdo:', error);
  }
}

// Comunicação com a página
self.addEventListener('message', (e) => {
  switch (e.data.action) {
  case 'skipWaiting':
    log('Pulando espera de atualização');
    self.skipWaiting();
    break;

  case 'clearCache':
    log('Limpando cache dinâmico');
    caches.delete(DYNAMIC_CACHE)
      .then(() => log('Cache dinâmico limpo'))
      .catch(err => log('Erro ao limpar cache:', err));
    break;

  case 'getCacheStatus':
    e.ports[0].postMessage({
      static: STATIC_CACHE,
      dynamic: DYNAMIC_CACHE,
      version: VERSION
    });
    break;
  }
});

// Push notifications (opcional)
self.addEventListener('push', (e) => {
  const data = e.data.json();
  const options = {
    body: data.body,
    icon: '/icon-192.png',
    badge: '/icon-192.png',
    vibrate: [100, 50, 100],
    data: { url: data.url }
  };
  e.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});

// Clique em notificação
self.addEventListener('notificationclick', (e) => {
  e.notification.close();
  e.waitUntil(
    clients.openWindow(e.notification.data.url)
  );
});

// (instalação duplicada removida)

// Log de eventos para debug
self.addEventListener('error', (event) => {
  log('Erro no Service Worker:', event.error);
});

self.addEventListener('unhandledrejection', (event) => {
  log('Promise rejeitada no Service Worker:', event.reason);
});

log('Service Worker carregado:', VERSION);

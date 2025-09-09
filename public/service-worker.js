// Service Worker avançado para PWA (produção)
// Versão do Service Worker - atualize sempre que modificar este arquivo
// 4.2.9: rollout for update flow reliability (force clients to fetch new SW)
const VERSION = 'v4.2.9';
const STATIC_CACHE = `financeiro-static-${VERSION}`;
const DYNAMIC_CACHE = `financeiro-dynamic-${VERSION}`;
const FALLBACK_CACHE = `financeiro-fallback-${VERSION}`;
const MAX_CACHE_ITEMS = 100;

// Ativar modo debug durante desenvolvimento
const DEBUG = false; // Desabilitado para produção
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
// Importante: Removemos '/' e '/index.html' para que usem network-first (ver abaixo),
// garantindo que o HTML sempre seja buscado atualizado quando online.
const STALE_WHILE_REVALIDATE_ROUTES = [
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
  'https://identitytoolkit.googleapis.com/'
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
        // Notificar página de que o SW está pronto (para limpezas adicionais se necessário)
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
  // Considera tanto pathname quanto href para cobrir absolutos
  return (
    NETWORK_ONLY_ROUTES.some(route => url.pathname.includes(route) || url.href.includes(route)) ||
    url.pathname.includes('/@vite/') ||
    url.pathname.includes('/@fs/')
  );
}

// Estratégia: Network First com fallback que consulta SOMENTE os caches da versão atual
async function networkFirstWithFallback(request) {
  try {
    // Tentar network primeiro
    const networkResponse = await fetch(request, { cache: 'no-cache' });

    // Se sucesso, cachear para uso futuro
    if (networkResponse.ok) {
      try {
        await addToCache(DYNAMIC_CACHE, request, networkResponse.clone());
      } catch (cacheError) {
        log('Erro ao adicionar ao cache:', cacheError);
      }
    }
    
    return networkResponse;
  } catch (error) {
    log('Network falhou, tentando cache:', error);
    
    // Fallback para caches ATUAIS (static/dynamic) apenas
    try {
      const staticCache = await caches.open(STATIC_CACHE);
      const dynCache = await caches.open(DYNAMIC_CACHE);
      const cachedResponse = (await staticCache.match(request)) || (await dynCache.match(request));
      if (cachedResponse) return cachedResponse;
    } catch {}
    
    // Fallback para página offline
    if (request.destination === 'document') {
      return caches.match('/offline.html');
    }
    
    throw error;
  }
}

// Estratégia: Cache First (somente o cache estático atual)
async function cacheFirst(request) {
  try {
    const cache = await caches.open(STATIC_CACHE);
    const cachedResponse = await cache.match(request);
    
    if (cachedResponse) {
      return cachedResponse;
    }

    try {
      const networkResponse = await fetch(request, { cache: 'no-cache' });
      if (networkResponse.ok) {
        try {
          await addToCache(STATIC_CACHE, request, networkResponse.clone());
        } catch (cacheError) {
          log('Erro ao adicionar ao cache estático:', cacheError);
        }
      }
      return networkResponse;
    } catch (error) {
      log('Erro ao buscar recurso:', request.url, error);
      throw error;
    }
  } catch (error) {
    log('Erro geral no cacheFirst:', error);
    throw error;
  }
}

// Estratégia: Network Only
async function networkOnly(request) {
  return fetch(request);
}

// Estratégia: Stale While Revalidate
async function staleWhileRevalidate(request) {
  try {
    // Tentar cache primeiro
    const cache = await caches.open(DYNAMIC_CACHE);
    const cachedResponse = await cache.match(request);
    
    // Iniciar atualização em background
    const updatePromise = fetch(request, { cache: 'no-cache' })
      .then(networkResponse => {
        if (networkResponse.ok) {
          try {
            cache.put(request, networkResponse.clone());
          } catch (cacheError) {
            log('Erro ao atualizar cache:', cacheError);
          }
        }
        return networkResponse;
      })
      .catch(error => {
        log('Falha na atualização:', request.url, error);
        throw error;
      });
    
    // Retornar resposta do cache se disponível
    return cachedResponse || updatePromise;
  } catch (error) {
    log('Erro em staleWhileRevalidate:', error);
    throw error;
  }
}

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


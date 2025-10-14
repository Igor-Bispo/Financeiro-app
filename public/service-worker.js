// Service Worker avançado para PWA (produção)
// Versão do Service Worker - atualize sempre que modificar este arquivo
// 4.82.0: FAB ULTRA SIMPLES - botão FIXO impossível de se mover
const VERSION = 'v4.82.0';
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

// Função para limpar caches antigos e evitar loops
async function clearOldCaches() {
  try {
    // Limpar caches corrompidos que podem causar problemas de MIME type
    const cacheNames = await caches.keys();
    for (const cacheName of cacheNames) {
      if (cacheName.includes('financeiro-') && !cacheName.includes(VERSION)) {
        log('🗑️ Removendo cache antigo:', cacheName);
        await caches.delete(cacheName);
      }
    }

    console.log(`[SW ${VERSION}] Limpeza de cache concluída`);
  } catch (error) {
    console.error(`[SW ${VERSION}] Erro ao limpar caches antigos:`, error);
  }
}

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
      // Limpar caches antigos primeiro
      clearOldCaches(),
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

// Listener unificado para todas as mensagens
self.addEventListener('message', (e) => {
  // Verificar se há port para resposta
  const hasPort = e.ports && e.ports.length > 0;

  // Mensagens de tipo (legacy)
  if (e.data && e.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
    if (hasPort) {
      e.ports[0].postMessage({ success: true, type: 'SKIP_WAITING' });
    }
    return;
  }

  if (e.data && e.data.type === 'UPDATE_CONTENT') {
    updateContent();
    if (hasPort) {
      e.ports[0].postMessage({ success: true, type: 'UPDATE_CONTENT' });
    }
    return;
  }

  // Mensagens de ação (novo formato)
  if (e.data && e.data.action) {
    switch (e.data.action) {
    case 'skipWaiting':
      log('Pulando espera de atualização');
      self.skipWaiting();
      if (hasPort) {
        e.ports[0].postMessage({ success: true, action: 'skipWaiting' });
      }
      break;

    case 'clearCache':
      log('Limpando cache dinâmico');
      caches.delete(DYNAMIC_CACHE)
        .then(() => {
          log('Cache dinâmico limpo');
          if (hasPort) {
            e.ports[0].postMessage({ success: true, action: 'clearCache' });
          }
        })
        .catch(err => {
          log('Erro ao limpar cache:', err);
          if (hasPort) {
            e.ports[0].postMessage({ success: false, error: err.message, action: 'clearCache' });
          }
        });
      break;

    case 'getCacheStatus':
      if (hasPort) {
        e.ports[0].postMessage({
          success: true,
          static: STATIC_CACHE,
          dynamic: DYNAMIC_CACHE,
          version: VERSION,
          action: 'getCacheStatus'
        });
      }
      break;

    default:
      if (hasPort) {
        e.ports[0].postMessage({ success: false, error: 'Unknown action', action: e.data.action });
      }
      break;
    }
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


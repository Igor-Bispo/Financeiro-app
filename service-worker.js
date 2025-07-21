// Versão do Service Worker - atualize sempre que modificar este arquivo
const VERSION = 'v4.0.0';
const STATIC_CACHE = `financeiro-static-${VERSION}`;
const DYNAMIC_CACHE = `financeiro-dynamic-${VERSION}`;
const FALLBACK_CACHE = `financeiro-fallback-${VERSION}`;
const MAX_CACHE_ITEMS = 100;

// Ativar modo debug durante desenvolvimento
const DEBUG = true;
function log(...args) {
  if (DEBUG) console.log('[SW]', ...args);
}

// Assets críticos para pré-cache (arquivos corretos do projeto)
const ASSETS = [
  '/',
  '/index.html',
  '/css/styles.css',
  '/js/app.js',
  '/manifest.json',
  '/favicon.ico',
  '/icon-192.png',
  '/icon-512.png'
];

// Recursos externos para cache
const EXTERNAL_RESOURCES = [
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap',
  'https://cdn.jsdelivr.net/npm/chart.js',
  'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js',
  'https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js',
  'https://www.gstatic.com/firebasejs/9.0.0/firebase-auth-compat.js',
  'https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore-compat.js'
];

// Rotas para estratégia Cache First
const CACHE_FIRST_ROUTES = [
  '/css/',
  '/js/',
  '/assets/'
];

// Rotas para ignorar cache
const NETWORK_ONLY_ROUTES = [
  '/api/',
  '/auth/'
];

// Instalação - Pré-cache de assets críticos
self.addEventListener('install', (e) => {
  log('Instalando Service Worker');
  
  e.waitUntil(
    caches.open(STATIC_CACHE)
      .then(cache => {
        log('Adicionando assets ao cache estático');
        // Adiciona apenas os arquivos que existem
        return Promise.allSettled(
          ASSETS.map(url => cache.add(url).catch(err => {
            log(`Falha ao cachear ${url}:`, err);
            return null;
          }))
        );
      })
      .then(() => {
        log('Pré-cache completo');
        return self.skipWaiting();
      })
      .catch(err => {
        log('Erro durante instalação:', err);
        // Não falha a instalação por causa de arquivos ausentes
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
    .then(() => {
      log('Pronto para controlar clientes');
      return self.clients.claim();
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

  // Ignora requisições não-GET e de origens diferentes
  if (request.method !== 'GET' || !url.origin.includes(location.origin)) {
    return;
  }

  // Ignora rotas específicas (API, auth)
  if (NETWORK_ONLY_ROUTES.some(route => url.pathname.startsWith(route))) {
    log('Rota network-only:', url.pathname);
    e.respondWith(fetch(request));
    return;
  }

  // Estratégia para navegação (páginas HTML)
  if (request.mode === 'navigate') {
    log('Navegação detectada:', url.pathname);
    e.respondWith(networkFirstWithFallback(request));
    return;
  }

  // Estratégia para assets estáticos
  if (CACHE_FIRST_ROUTES.some(route => 
    url.pathname.startsWith(route) || 
    url.origin.includes(route)
  )) {
    log('Rota cache-first:', url.pathname);
    e.respondWith(cacheFirst(request));
    return;
  }

  // Estratégia padrão (Stale-While-Revalidate)
  log('Rota stale-while-revalidate:', url.pathname);
  e.respondWith(staleWhileRevalidate(request));
});

// Estratégias de Cache --------------------------------------------------------

// 1. Network First com Fallback (para navegação)
async function networkFirstWithFallback(request) {
  try {
    const networkResponse = await fetch(request);
    
    // Verifica se a resposta é válida
    if (networkResponse && networkResponse.ok) {
      await addToCache(DYNAMIC_CACHE, request, networkResponse.clone());
      return networkResponse;
    }
    throw new Error('Resposta inválida');
  } catch (err) {
    log('Fallback para cache:', request.url, err);
    
    // Tenta retornar do cache dinâmico primeiro
    const cachedResponse = await caches.match(request);
    if (cachedResponse) return cachedResponse;
    
    // Fallback específico para navegação
    if (request.mode === 'navigate') {
      return caches.match('/index.html');
    }
    
    // Fallback genérico
    return new Response('Recurso não encontrado', { status: 404 });
  }
}

// 2. Cache First (para assets estáticos)
async function cacheFirst(request) {
  const cachedResponse = await caches.match(request);
  if (cachedResponse) {
    log('Retornando do cache:', request.url);
    return cachedResponse;
  }
  
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      await addToCache(DYNAMIC_CACHE, request, networkResponse.clone());
      return networkResponse;
    }
    throw new Error('Resposta inválida');
  } catch (err) {
    log('Falha ao buscar recurso:', request.url, err);
    return new Response('Recurso não encontrado', { status: 404 });
  }
}

// 3. Stale While Revalidate (padrão)
async function staleWhileRevalidate(request) {
  const cache = await caches.open(DYNAMIC_CACHE);
  const cachedResponse = await cache.match(request);
  
  const fetchPromise = fetch(request)
    .then(async networkResponse => {
      if (networkResponse.ok) {
        await addToCache(DYNAMIC_CACHE, request, networkResponse.clone());
      }
      return networkResponse;
    })
    .catch(err => {
      log('Falha na atualização:', request.url, err);
      return null;
    });

  return cachedResponse || fetchPromise;
}

// Funções auxiliares ----------------------------------------------------------

// Adiciona resposta ao cache com metadados
async function addToCache(cacheName, request, response) {
  if (response && response.ok) {
    const cache = await caches.open(cacheName);
    
    // Clona a resposta para adicionar headers personalizados
    const headers = new Headers(response.headers);
    headers.set('sw-cached-time', new Date().toISOString());
    
    const cachedResponse = new Response(response.body, { headers });
    await cache.put(request, cachedResponse);
    
    // Limita o tamanho do cache
    await trimCache(cacheName);
  }
}

// Limita o tamanho do cache dinâmico
async function trimCache(cacheName) {
  const cache = await caches.open(cacheName);
  const keys = await cache.keys();
  
  if (keys.length > MAX_CACHE_ITEMS) {
    log(`Limpeza de cache (${keys.length}/${MAX_CACHE_ITEMS})`);
    
    // Ordena por data de cache (mais antigos primeiro)
    const items = await Promise.all(keys.map(async key => {
      const response = await cache.match(key);
      const date = response.headers.get('sw-cached-time');
      return { key, date: date ? new Date(date) : new Date(0) };
    }));
    
    items.sort((a, b) => a.date - b.date);
    await cache.delete(items[0].key);
  }
}

// Eventos adicionais ----------------------------------------------------------

// Sincronização em background
self.addEventListener('sync', event => {
  if (event.tag === 'sync-data') {
    log('Iniciando sincronização em background');
    event.waitUntil(
      syncData()
        .then(() => self.registration.showNotification('Dados sincronizados!'))
        .catch(err => log('Erro na sincronização:', err))
    );
  }
});

// Função de sincronização
async function syncData() {
  // Implementar sincronização de dados offline
  log('Sincronizando dados...');
  return Promise.resolve();
}

// Atualização de conteúdo em segundo plano
self.addEventListener('periodicsync', (event) => {
  if (event.tag === 'update-content') {
    log('Atualização periódica iniciada');
    event.waitUntil(updateContent());
  }
});

async function updateContent() {
  // Implemente atualização de conteúdo aqui
  log('Conteúdo atualizado em segundo plano');
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
    icon: '/icon-192.webp',
    badge: '/badge.webp',
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

// Cache de recursos externos na instalação
self.addEventListener('install', (e) => {
  log('Instalando Service Worker');
  
  e.waitUntil(
    Promise.all([
      // Cache estático
      caches.open(STATIC_CACHE).then(cache => {
        log('Adicionando assets ao cache estático');
        return Promise.allSettled(
          ASSETS.map(url => cache.add(url).catch(err => {
            log(`Falha ao cachear ${url}:`, err);
            return null;
          }))
        );
      }),
      
      // Cache de recursos externos
      caches.open(DYNAMIC_CACHE).then(cache => {
        log('Adicionando recursos externos ao cache');
        return Promise.allSettled(
          EXTERNAL_RESOURCES.map(url => cache.add(url).catch(err => {
            log(`Falha ao cachear recurso externo ${url}:`, err);
            return null;
          }))
        );
      })
    ]).then(() => {
      log('Pré-cache completo');
      return self.skipWaiting();
    }).catch(err => {
      log('Erro durante instalação:', err);
    })
  );
});

// Melhorias na interceptação de requisições
self.addEventListener('fetch', (e) => {
  const { request } = e;
  const url = new URL(request.url);

  // Ignora requisições não-GET e de origens diferentes
  if (request.method !== 'GET' || !url.origin.includes(location.origin)) {
    return;
  }

  // Cache de recursos externos
  if (EXTERNAL_RESOURCES.includes(request.url)) {
    log('Recurso externo detectado:', request.url);
    e.respondWith(cacheFirst(request));
    return;
  }

  // Ignora rotas específicas (API, auth)
  if (NETWORK_ONLY_ROUTES.some(route => url.pathname.startsWith(route))) {
    log('Rota network-only:', url.pathname);
    e.respondWith(fetch(request));
    return;
  }

  // Estratégia para navegação (páginas HTML)
  if (request.mode === 'navigate') {
    log('Navegação detectada:', url.pathname);
    e.respondWith(networkFirstWithFallback(request));
    return;
  }

  // Estratégia para assets estáticos
  if (CACHE_FIRST_ROUTES.some(route => 
    url.pathname.startsWith(route) || 
    url.origin.includes(route)
  )) {
    log('Rota cache-first:', url.pathname);
    e.respondWith(cacheFirst(request));
    return;
  }

  // Estratégia padrão (Stale-While-Revalidate)
  log('Rota stale-while-revalidate:', url.pathname);
  e.respondWith(staleWhileRevalidate(request));
});

// Log de eventos para debug
self.addEventListener('error', (event) => {
  log('Erro no Service Worker:', event.error);
});

self.addEventListener('unhandledrejection', (event) => {
  log('Promise rejeitada no Service Worker:', event.reason);
});

log('Service Worker carregado:', VERSION);
// PWA caching strategies extracted (logic mirrored from service-worker.js)
// NOTE: service-worker.js currently keeps its own copies to avoid build path issues.
// These helpers are for unit testing and future unification.

const DEFAULT_MAX_CACHE_ITEMS = 100;

function safeLog(debug, ...args) { if (debug) console.log('[PWA-STRAT]', ...args); }

export function isStaticAsset(pathname, routes) {
  return routes.some(route => pathname.includes(route));
}

export function isStaleWhileRevalidate(pathname, routes) {
  return routes.some(route => pathname.includes(route));
}

export function isNetworkOnly(url, routes) {
  return routes.some(route => url.pathname.includes(route) || url.href.includes(route));
}

export async function networkFirstWithFallback(request, {
  fetchFn = fetch,
  cachesRef = caches,
  dynamicCache,
  fallbackPage = '/offline.html',
  addToCacheFn = addToCache,
  debug = false
} = {}) {
  try {
    const networkResponse = await fetchFn(request, { cache: 'no-cache' });
    if (networkResponse.ok) {
      try { await addToCacheFn(dynamicCache, request, networkResponse.clone(), { cachesRef, debug }); } catch {}
    }
    return networkResponse;
  } catch (error) {
    safeLog(debug, 'networkFirstWithFallback: network failed', error);
    const cachedResponse = await cachesRef.match(request);
    if (cachedResponse) return cachedResponse;
    if (request.destination === 'document') {
      const offline = await cachesRef.match(fallbackPage);
      if (offline) return offline;
    }
    throw error;
  }
}

export async function cacheFirst(request, {
  fetchFn = fetch,
  cachesRef = caches,
  staticCache,
  addToCacheFn = addToCache,
  debug = false
} = {}) {
  const cached = await cachesRef.match(request);
  if (cached) return cached;
  const resp = await fetchFn(request, { cache: 'no-cache' });
  if (resp?.ok) {
    try { await addToCacheFn(staticCache, request, resp.clone(), { cachesRef, debug }); } catch {}
  }
  return resp;
}

export async function networkOnly(request, { fetchFn = fetch } = {}) {
  return fetchFn(request);
}

export async function staleWhileRevalidate(request, {
  fetchFn = fetch,
  cachesRef = caches,
  dynamicCache,
  debug = false
} = {}) {
  const cache = await cachesRef.open(dynamicCache);
  const cached = await cache.match(request);
  // Fire and forget update
  fetchFn(request, { cache: 'no-cache' })
    .then(r => { if (r?.ok) cache.put(request, r.clone()); })
    .catch(e => safeLog(debug, 'SWR update error', e));
  return cached || fetchFn(request, { cache: 'no-cache' });
}

export async function addToCache(cacheName, request, response, { cachesRef = caches, debug = false } = {}) {
  try {
    const cache = await cachesRef.open(cacheName);
    await cache.put(request, response);
  } catch (e) { safeLog(debug, 'addToCache error', e); }
}

export async function trimCache(cacheName, { cachesRef = caches, maxItems = DEFAULT_MAX_CACHE_ITEMS, debug = false } = {}) {
  try {
    const cache = await cachesRef.open(cacheName);
    const keys = await cache.keys();
    if (keys.length > maxItems) {
      const toDelete = keys.slice(0, keys.length - maxItems);
      await Promise.all(toDelete.map(k => cache.delete(k)));
    }
  } catch (e) { safeLog(debug, 'trimCache error', e); }
}

// Aggregate creator for convenience in tests
export function createStrategies(config) {
  return {
    networkFirstWithFallback: (req, opts) => networkFirstWithFallback(req, { ...config, ...opts }),
    cacheFirst: (req, opts) => cacheFirst(req, { ...config, ...opts }),
    staleWhileRevalidate: (req, opts) => staleWhileRevalidate(req, { ...config, ...opts }),
    networkOnly: (req, opts) => networkOnly(req, { ...config, ...opts })
  };
}

// Attach to global if in SW for potential future unification
try { if (typeof self !== 'undefined') self.__PWA_STRATEGIES__ = { networkFirstWithFallback, cacheFirst, staleWhileRevalidate, networkOnly }; } catch {}

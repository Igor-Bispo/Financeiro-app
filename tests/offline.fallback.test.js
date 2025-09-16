import { describe, it, expect, vi, beforeEach } from 'vitest';
import { networkFirstWithFallback, cacheFirst } from '../src/core/pwa/strategies.js';

function setupCaches() {
  const store = new Map();
  const opened = {
    put: vi.fn(async (req, res) => store.set(req.url || req, res)),
    match: vi.fn(async req => store.get(req.url || req)),
    keys: vi.fn(async () => Array.from(store.keys()))
  };
  global.caches = {
    open: vi.fn(async () => opened),
    match: vi.fn(async req => store.get(req.url || req)),
    delete: vi.fn(async () => true),
    keys: vi.fn(async () => [])
  };
  return { store, opened };
}

describe('PWA caching strategies (extracted)', () => {
  beforeEach(() => setupCaches());

  it('networkFirstWithFallback returns offline.html when network fails', async () => {
    const fetchFn = vi.fn().mockRejectedValue(new Error('offline'));
    const { opened } = setupCaches();
    const offlineResp = new Response('<html>offline</html>', { status: 200 });
    await opened.put('/offline.html', offlineResp);
    const req = new Request('https://app.test/page', { method: 'GET' });
    Object.defineProperty(req, 'destination', { value: 'document' });
    const resp = await networkFirstWithFallback(req, { fetchFn, dynamicCache: 'dyn', fallbackPage: '/offline.html' });
    expect(await resp.text()).toContain('offline');
    expect(fetchFn).toHaveBeenCalled();
  });

  it('cacheFirst returns cached asset and skips network', async () => {
    const fetchFn = vi.fn();
    const { opened } = setupCaches();
    const cached = new Response('CACHED', { status: 200 });
    await opened.put('https://app.test/asset.js', cached);
    const req = new Request('https://app.test/asset.js');
    const resp = await cacheFirst(req, { fetchFn, staticCache: 'static' });
    expect(await resp.text()).toBe('CACHED');
    expect(fetchFn).not.toHaveBeenCalled();
  });
});

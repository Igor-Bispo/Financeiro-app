import { describe, it, expect, vi, beforeEach } from 'vitest';
import { staleWhileRevalidate, trimCache, addToCache } from '../src/core/pwa/strategies.js';

function setupCaches() {
  const store = new Map();
  const cacheObj = {
    put: vi.fn(async (req, res) => store.set(req.url || req, res)),
    match: vi.fn(async (req) => store.get(req.url || req)),
    keys: vi.fn(async () => Array.from(store.keys()).map(url => ({ url }))),
    delete: vi.fn(async (req) => store.delete(req.url || req))
  };
  global.caches = {
    open: vi.fn(async () => cacheObj),
    match: vi.fn(async (req) => store.get(req.url || req)),
    delete: vi.fn(async () => true),
    keys: vi.fn(async () => [])
  };
  return { store, cacheObj };
}

describe('PWA strategies - additional behaviors', () => {
  beforeEach(() => setupCaches());

  it('staleWhileRevalidate returns cached immediately then updates in background', async () => {
    const { cacheObj, store } = setupCaches();
    const url = 'https://app.test/data.json';
    const initial = new Response('old', { status: 200 });
    await cacheObj.put(url, initial);
    const fetchFn = vi.fn().mockResolvedValue(new Response('new', { status: 200 }));
    const req = new Request(url);
    const firstResp = await staleWhileRevalidate(req, { fetchFn, dynamicCache: 'dyn' });
    expect(await firstResp.text()).toBe('old');
    expect(fetchFn).toHaveBeenCalled();
    // Allow background promise to settle
    await Promise.resolve();
    await Promise.resolve();
    const updated = await cacheObj.match(url);
    expect(await updated.text()).toBe('new');
    expect(store.size).toBe(1);
  });

  it('staleWhileRevalidate with no cache returns network response (single fetch or double allowed)', async () => {
    setupCaches();
    const fetchFn = vi.fn().mockResolvedValue(new Response('only-network', { status: 200 }));
    const req = new Request('https://app.test/other.json');
    const resp = await staleWhileRevalidate(req, { fetchFn, dynamicCache: 'dyn' });
    expect(await resp.text()).toBe('only-network');
    // Implementation may call fetch twice if no cache (once for immediate return, once for background) – allow 1 or 2
    expect(fetchFn.mock.calls.length === 1 || fetchFn.mock.calls.length === 2).toBe(true);
  });

  it('trimCache reduces entries above max', async () => {
    const { cacheObj } = setupCaches();
    const max = 5;
    // populate 8 items
    for (let i = 0; i < 8; i++) {
      await cacheObj.put(`https://app.test/r${i}.js`, new Response(String(i), { status: 200 }));
    }
    expect((await cacheObj.keys()).length).toBe(8);
    await trimCache('any', { cachesRef: caches, maxItems: max });
    const remaining = (await cacheObj.keys()).length;
    expect(remaining).toBeLessThanOrEqual(max);
  });

  it('addToCache inserts an entry', async () => {
    const { cacheObj } = setupCaches();
    const req = new Request('https://app.test/file.js');
    const resp = new Response('data', { status: 200 });
    await addToCache('any', req, resp, { cachesRef: caches });
    const stored = await cacheObj.match(req);
    expect(await stored.text()).toBe('data');
  });
});

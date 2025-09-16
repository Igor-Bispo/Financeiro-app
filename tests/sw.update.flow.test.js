import { describe, it, expect, vi, beforeEach } from 'vitest';
import { registerServiceWorker, listenForControllerChange, skipWaiting } from '../src/core/pwa/swUpdates.js';

// Minimal simulation of ServiceWorkerRegistration & controller swap
function createMockSWEnv() {
  const listeners = {};
  const controller = { postMessage: vi.fn() };
  const installing = { state: 'installing', addEventListener: (ev, cb) => { listeners[`installing:${ev}`] = cb; } };
  const reg = {
    installing,
    waiting: null,
    addEventListener: (ev, cb) => { listeners[ev] = cb; },
  };
  global.navigator.serviceWorker = {
    controller,
    register: vi.fn().mockResolvedValue(reg),
    addEventListener: (ev, cb) => { listeners[`sw:${ev}`] = cb; }
  };
  return { reg, listeners, installing, controller };
}

describe('Service Worker update helper', () => {
  beforeEach(() => {
    global.navigator = { serviceWorker: undefined };
  global.window = { location: { reload: vi.fn() }, __swUpdateState: {} };
  });

  it('registerServiceWorker triggers onNewVersion when new worker installed', async () => {
    const { listeners, installing } = createMockSWEnv();
    navigator.serviceWorker.controller = {}; // simulate existing active SW
    const onNewVersion = vi.fn();
    registerServiceWorker({ onNewVersion });
    // Allow registration promise to resolve
    await Promise.resolve();
    // Trigger updatefound lifecycle
    listeners['updatefound'] && listeners['updatefound']();
    installing.state = 'installed';
    listeners['installing:statechange'] && listeners['installing:statechange']();
    // Flush microtasks that onNewVersion callback might schedule
    await Promise.resolve();
    expect(onNewVersion).toHaveBeenCalled();
  });

  it('skipWaiting posts SKIP_WAITING message', () => {
    const { controller } = createMockSWEnv();
    skipWaiting();
    expect(controller.postMessage).toHaveBeenCalledWith({ type: 'SKIP_WAITING' });
  });

  it('listenForControllerChange reloads page once', () => {
  const { listeners } = createMockSWEnv();
  window.__swUpdateState = {};
    listenForControllerChange();
    listeners['sw:controllerchange'] && listeners['sw:controllerchange']();
    listeners['sw:controllerchange'] && listeners['sw:controllerchange']();
    expect(window.location.reload).toHaveBeenCalledTimes(1);
  });
});

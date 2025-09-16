// Setup para testes com Vitest
import { vi } from 'vitest';

// Auto-skip heavy DOM mocking when running under a pure node environment (e.g. security rules tests)
const SKIP = typeof window === 'undefined';
if (SKIP) {
  global.console = console;
  global.fetch = vi.fn();
}

if (!SKIP) {
  // Mock do Firebase
  vi.mock('@data/firebase/client.js', () => ({
    auth: {
      currentUser: { uid: 'test-user-id' },
      onAuthStateChanged: vi.fn()
    },
    db: {}
  }));
}

// Mock do localStorage com armazenamento em memória
if (!SKIP) {(() => {
  const store = new Map();
  const localStorageMock = {
    getItem: vi.fn((key) => (store.has(key) ? store.get(key) : null)),
    setItem: vi.fn((key, value) => { store.set(String(key), String(value)); }),
    removeItem: vi.fn((key) => { store.delete(key); }),
    clear: vi.fn(() => { store.clear(); }),
  };
  Object.defineProperty(window, 'localStorage', {
    value: localStorageMock,
    writable: true
  });
  // Garantir acesso global (alguns testes usam localStorage diretamente)
  Object.defineProperty(global, 'localStorage', {
    value: localStorageMock,
    writable: true
  });
  try { globalThis.localStorage = localStorageMock; } catch {}
})();}

// Mock do console para evitar spam nos testes
if (!SKIP) {
  global.console = {
    ...console,
    log: vi.fn(),
    info: vi.fn(),
    warn: vi.fn(),
    error: vi.fn()
  };
}

// Mock do fetch
if (!SKIP) { global.fetch = vi.fn(); }

// Mock do IntersectionObserver
if (!SKIP) {
  global.IntersectionObserver = vi.fn().mockImplementation(() => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn()
  }));
}

// Mock do ResizeObserver
if (!SKIP) {
  global.ResizeObserver = vi.fn().mockImplementation(() => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn()
  }));
}

// Mock do matchMedia
if (!SKIP) {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation(query => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn()
    }))
  });
}

// Mock do serviceWorker
if (!SKIP) {
  Object.defineProperty(navigator, 'serviceWorker', {
    value: {
      register: vi.fn().mockResolvedValue({}),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn()
    },
    writable: true
  });
}

// Mock do PWA install prompt
if (!SKIP) {
  Object.defineProperty(window, 'beforeinstallprompt', {
    value: null,
    writable: true
  });
}

// Mock do indexedDB
if (!SKIP) {
  global.indexedDB = {
    open: vi.fn(),
    deleteDatabase: vi.fn()
  };
}

// Mock do crypto
if (!SKIP) {
  Object.defineProperty(global, 'crypto', {
    value: {
      getRandomValues: vi.fn(),
      subtle: {
        generateKey: vi.fn(),
        sign: vi.fn(),
        verify: vi.fn()
      }
    }
  });
}

// Mock do performance
if (!SKIP) {
  global.performance = {
    now: vi.fn(() => Date.now()),
    mark: vi.fn(),
    measure: vi.fn(),
    getEntriesByType: vi.fn(() => [])
  };
}

// Mock do requestAnimationFrame
if (!SKIP) {
  global.requestAnimationFrame = vi.fn(cb => setTimeout(cb, 16));
  global.cancelAnimationFrame = vi.fn();
}

// Mock do requestIdleCallback
if (!SKIP) {
  global.requestIdleCallback = vi.fn(cb => setTimeout(cb, 1));
  global.cancelIdleCallback = vi.fn();
}

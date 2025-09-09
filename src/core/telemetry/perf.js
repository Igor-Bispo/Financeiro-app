// core/telemetry/perf.js
// Telemetria leve de performance (local, nÃ£o envia dados)

const MAX_EVENTS = 200;

function getStore() {
  if (typeof window === 'undefined') {
    return [];
  }
  if (!window.__perfLog) {
    window.__perfLog = [];
  }
  return window.__perfLog;
}

export function isEnabled() {
  try {
    if (typeof localStorage !== 'undefined') {
      return localStorage.getItem('perfTelemetry') === 'true';
    }
  } catch {}
  return false;
}

export function setEnabled(on) {
  try { localStorage.setItem('perfTelemetry', on ? 'true' : 'false'); } catch {}
}

export function track(event, data = {}) {
  try {
    if (!isEnabled()) {
      return;
    }
    const entry = {
      ts: Date.now(),
      event,
      ...data,
    };
    const store = getStore();
    store.push(entry);
    if (store.length > MAX_EVENTS) {
      store.splice(0, store.length - MAX_EVENTS);
    }
  } catch {}
}

export function getLog() {
  try { return [...getStore()].reverse(); } catch { return []; }
}

export function clear() {
  try {
    const store = getStore();
    store.length = 0;
  } catch {}
}

export default { isEnabled, setEnabled, track, getLog, clear };

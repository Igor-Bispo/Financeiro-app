// Utilities to persist and apply Snackbar (toasts) preferences
import { eventBus } from '@core/events/eventBus.js';

export const STORAGE_KEY = 'snackbar_prefs_v1';

export const defaults = {
  defaultDuration: 3000,
  bottom: 80,
  position: 'bottom', // 'top' | 'bottom'
  align: 'center', // 'left' | 'center' | 'right'
  hoverPause: true,
  maxQueue: 5,
  cooldownMs: 500,
};

function coerceNumber(n, fallback) {
  const v = Number(n);
  return Number.isFinite(v) ? v : fallback;
}

function coerceBoolean(b, fallback) {
  if (typeof b === 'boolean') { return b; }
  if (b === 'true') { return true; }
  if (b === 'false') { return false; }
  return fallback;
}

function sanitize(prefs) {
  const p = prefs || {};
  const out = { ...defaults };
  if ('defaultDuration' in p) { out.defaultDuration = Math.max(500, coerceNumber(p.defaultDuration, defaults.defaultDuration)); }
  if ('bottom' in p) { out.bottom = Math.max(0, coerceNumber(p.bottom, defaults.bottom)); }
  if (typeof p.position === 'string' && (p.position === 'top' || p.position === 'bottom')) { out.position = p.position; }
  if (typeof p.align === 'string' && (p.align === 'left' || p.align === 'center' || p.align === 'right')) { out.align = p.align; }
  if ('hoverPause' in p) { out.hoverPause = coerceBoolean(p.hoverPause, defaults.hoverPause); }
  if ('maxQueue' in p) { out.maxQueue = Math.max(1, coerceNumber(p.maxQueue, defaults.maxQueue)); }
  if ('cooldownMs' in p) { out.cooldownMs = Math.max(0, coerceNumber(p.cooldownMs, defaults.cooldownMs)); }
  return out;
}

export function loadPrefs() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return { ...defaults };
    }
    const parsed = JSON.parse(raw);
    return sanitize(parsed);
  } catch {
    return { ...defaults };
  }
}

export function savePrefs(prefs) {
  try {
    const normalized = sanitize(prefs);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(normalized));
    return normalized;
  } catch {
    return sanitize(prefs);
  }
}

export function applyPrefs(prefs) {
  try {
    const normalized = sanitize(prefs);
    // Configure via event bus so any listeners react too
    eventBus.emit('snackbar:configure', normalized);
    // Fallback direto para ambientes legados
    try {
      if (typeof window !== 'undefined' && window.Snackbar && typeof window.Snackbar.configure === 'function') {
        window.Snackbar.configure(normalized);
      }
    } catch {}
    return normalized;
  } catch {
    return sanitize(prefs);
  }
}

export function initFromStorage() {
  const prefs = loadPrefs();
  applyPrefs(prefs);
  return prefs;
}

// Convenience for environments without eventBus importers
if (typeof window !== 'undefined') {
  window.__snackbarPrefs = { STORAGE_KEY, defaults, loadPrefs, savePrefs, applyPrefs, initFromStorage };
}

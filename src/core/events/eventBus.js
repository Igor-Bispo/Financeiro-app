// core/events/eventBus.js
// Pub/Sub simples

class EventBus {
  constructor() {
    this.map = new Map();
  }
  on(name, handler) {
    if (!this.map.has(name)) {
      this.map.set(name, new Set());
    }
    this.map.get(name).add(handler);
    return () => this.off(name, handler);
  }
  off(name, handler) {
    this.map.get(name)?.delete(handler);
  }
  emit(name, payload) {
    this.map.get(name)?.forEach((h) => {
      try { h(payload); } catch { /* no-op */ }
    });
  }
}

export const eventBus = new EventBus();

// Conveniências com a mesma API mas delegando para a instância única
export const on = (event, handler) => eventBus.on(event, handler);
export const off = (event, handler) => eventBus.off(event, handler);
export const emit = (event, payload) => eventBus.emit(event, payload);

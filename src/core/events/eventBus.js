// core/events/eventBus.js
// Pub/Sub simples

class EventBus {
  constructor() {
    this.listeners = new Map();
  }

  on(event, handler) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    this.listeners.get(event).add(handler);
    return () => this.off(event, handler);
  }

  off(event, handler) {
    const set = this.listeners.get(event);
    if (!set) {
      return;
    }
    set.delete(handler);
    if (set.size === 0) {
      this.listeners.delete(event);
    }
  }

  emit(event, payload) {
    const set = this.listeners.get(event);
    if (!set) {
      return;
    }
    for (const h of set) {
      try {
        h(payload);
      } catch (e) {
        console.error(`[eventBus] handler error for ${event}`, e);
      }
    }
  }

  clear() {
    this.listeners.clear();
  }

  getListenerCount(event) {
    const set = this.listeners.get(event);
    return set ? set.size : 0;
  }

  hasListeners(event) {
    return this.listeners.has(event) && this.listeners.get(event).size > 0;
  }

  once(event, handler) {
    const onceHandler = (payload) => {
      handler(payload);
      this.off(event, onceHandler);
    };
    this.on(event, onceHandler);
  }
}
export const eventBus = new EventBus();

// FunÃ§Ãµes auxiliares para uso direto
export function on(event, handler) {
  return eventBus.on(event, handler);
}

export function off(event, handler) {
  return eventBus.off(event, handler);
}

export function emit(event, payload) {
  return eventBus.emit(event, payload);
}

// core/store/createStore.js
// Tiny reactive store with optional selector-based subscribers
export function createStore(initialState = {}) {
  let state = { ...initialState };
  const subs = new Set();

  function getState() {
    return state;
  }

  function setState(partial) {
    const prev = state;
    state = { ...state, ...(typeof partial === 'function' ? partial(prev) : partial) };
    for (const s of subs) {
      try { s(state, prev); } catch (e) { console.error('[store] subscriber error', e); }
    }
  }

  function subscribe(selectorOrListener, listener) {
    // subscribe(listener) or subscribe(selector, listener)
    if (!listener) {
      subs.add(selectorOrListener);
      return () => subs.delete(selectorOrListener);
    }
    let last = selectorOrListener(state);
    const wrapped = (next) => {
      const pick = selectorOrListener(next);
      if (pick !== last) {
        const prev = last;
        last = pick;
        try { listener(pick, prev); } catch (e) { console.error('[store] selector listener error', e); }
      }
    };
    subs.add(wrapped);
    return () => subs.delete(wrapped);
  }

  return { getState, setState, subscribe };
}

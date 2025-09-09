// core/store/createStore.js
// Store reativa simples com subscribe por seletor

export function createStore(initialState = {}) {
  let state = { ...initialState };
  const listeners = new Set();

  function getState() {
    return state;
  }

  function setState(partial) {
    const prev = state;
    state = { ...state, ...partial };
    for (const { selector, cb, last } of listeners) {
      const nextSlice = selector ? selector(state) : state;
      if (nextSlice !== last.value) {
        last.value = nextSlice;
        try { cb(nextSlice, prev); } catch {}
      }
    }
  }

  function subscribe(selector, cb) {
    const record = { selector, cb, last: { value: selector ? selector(state) : state } };
    listeners.add(record);
    return () => listeners.delete(record);
  }

  return { getState, setState, subscribe };
}

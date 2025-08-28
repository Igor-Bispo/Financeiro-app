// features/notifications/store.js
// Pequena store reativa para centralizar estado de notificações

import { createStore } from '@core/store/createStore.js';
import { listByRecipient, listenByRecipient, markManyAsRead, deleteMany } from '@data/repositories/notificationsRepo.js';

const initial = {
  items: [],
  unread: 0,
  listening: false,
  lastUpdated: null,
  _unsubscribe: null,
  _uid: null,
};

const store = createStore(initial);

function recalcUnread(items) {
  try {
    return (items || []).reduce((acc, n) => acc + (n.read ? 0 : 1), 0);
  } catch {
    return 0;
  }
}

async function load(uid, max = 50) {
  if (!uid) {
    return [];
  }
  const list = await listByRecipient(uid, max);
  store.setState({ items: list, unread: recalcUnread(list), lastUpdated: new Date(), _uid: uid });
  return list;
}

function start(uid, max = 50) {
  if (!uid) {
    return () => {};
  }
  // encerra anterior
  try {
    store.getState()._unsubscribe?.();
  } catch {}
  const unsub = listenByRecipient(uid, (items) => {
    store.setState({ items, unread: recalcUnread(items), lastUpdated: new Date(), listening: true, _uid: uid });
  }, max);
  store.setState({ listening: true, _unsubscribe: unsub, _uid: uid });
  return unsub;
}

function stop() {
  try {
    store.getState()._unsubscribe?.();
  } catch {}
  store.setState({ listening: false, _unsubscribe: null });
}

async function markRead(ids) {
  const arr = Array.isArray(ids) ? ids : [ids];
  if (!arr.length) {
    return;
  }
  await markManyAsRead(arr);
  const next = store.getState().items.map(n => arr.includes(n.id) ? { ...n, read: true } : n);
  store.setState({ items: next, unread: recalcUnread(next), lastUpdated: new Date() });
}

async function removeMany(ids) {
  const arr = Array.isArray(ids) ? ids : [ids];
  if (!arr.length) {
    return;
  }
  await deleteMany(arr);
  const next = store.getState().items.filter(n => !arr.includes(n.id));
  store.setState({ items: next, unread: recalcUnread(next), lastUpdated: new Date() });
}

export const notificationsStore = {
  // estado
  getState: store.getState,
  subscribe: store.subscribe,
  setState: store.setState,
  // ações
  load,
  start,
  stop,
  markRead,
  removeMany,
};

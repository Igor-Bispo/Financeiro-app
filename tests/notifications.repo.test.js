// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach } from 'vitest';

// In-memory store to simulate Firestore 'notifications' collection
let store;

// Mock firebase client (db) - use the same alias as in source
vi.mock('@data/firebase/client.js', () => ({
  db: {},
}));

// Helper to build a fake doc
function makeDoc(id, data) {
  return {
    id,
    data: () => ({ ...data }),
  };
}

// Mock firebase/firestore
vi.mock('firebase/firestore', () => {
  const listeners = new Set();
  return {
    // primitives
    collection: (db, col) => ({ _col: col }),
    doc: (db, col, id) => ({ _col: col, _id: id }),
    where: (field, op, value) => ({ field, op, value }),
    query: (colRef, ...preds) => ({ colRef, preds }),
    // reads
    getDocs: async (q) => {
      const col = q?.colRef?._col || q?._col;
      const preds = q?.preds || [];
      const list = Object.values(store[col] || {});
      const filtered = preds.reduce((acc, p) => {
        if (p.op === '==') return acc.filter((d) => d.data()[p.field] === p.value);
        return acc;
      }, list);
      return { docs: filtered };
    },
    onSnapshot: (q, cb) => {
      const col = q?.colRef?._col || q?._col;
      const preds = q?.preds || [];
      const invoke = () => {
        const list = Object.values(store[col] || {});
        const filtered = preds.reduce((acc, p) => {
          if (p.op === '==') return acc.filter((d) => d.data()[p.field] === p.value);
          return acc;
        }, list);
        cb({
          forEach: (fn) => filtered.forEach((d) => fn(d)),
        });
      };
      invoke();
      const unsub = () => listeners.delete(invoke);
      listeners.add(invoke);
      return unsub;
    },
    // writes
    addDoc: async (colRef, payload) => {
      const id = 'id_' + Math.random().toString(36).slice(2);
      const col = colRef._col;
      if (!store[col]) store[col] = {};
      store[col][id] = makeDoc(id, payload);
      return { id };
    },
    updateDoc: async (docRef, payload) => {
      const col = docRef._col;
      const id = docRef._id;
      if (store[col]?.[id]) {
        const prev = store[col][id].data();
        store[col][id] = makeDoc(id, { ...prev, ...payload });
      }
    },
    deleteDoc: async (docRef) => {
      const col = docRef._col;
      const id = docRef._id;
      if (store[col]?.[id]) delete store[col][id];
    },
    writeBatch: (db) => {
      const ops = [];
      return {
        update: (docRef, payload) => ops.push({ type: 'update', docRef, payload }),
        delete: (docRef) => ops.push({ type: 'delete', docRef }),
        commit: async () => {
          for (const op of ops) {
            if (op.type === 'update') {
              const { _col, _id } = op.docRef;
              const prev = store[_col] && store[_col][_id] ? store[_col][_id].data() : {};
              if (!store[_col]) store[_col] = {};
              store[_col][_id] = makeDoc(_id, { ...prev, ...op.payload });
            } else if (op.type === 'delete') {
              const { _col, _id } = op.docRef;
              if (store[_col] && store[_col][_id]) delete store[_col][_id];
            }
          }
        },
      };
    },
    serverTimestamp: () => ({ _serverTs: true }),
  };
});

describe('notificationsRepo', () => {
  beforeEach(() => {
    store = { notifications: {} };
  });

  it('listByRecipient returns items sorted by createdAt desc and limited', async () => {
    const now = Math.floor(Date.now() / 1000);
    const a = makeDoc('a', { recipientUid: 'u1', createdAt: { seconds: now - 10 }, x: 1 });
    const b = makeDoc('b', { recipientUid: 'u1', createdAt: { seconds: now - 1 }, x: 2 });
    const c = makeDoc('c', { recipientUid: 'u2', createdAt: { seconds: now - 5 }, x: 3 });
    store.notifications = { a, b, c };

    const mod = await import('../src/data/repositories/notificationsRepo.js');
    const items = await mod.listByRecipient('u1', 1);
    expect(items.length).toBe(1);
    expect(items[0].id).toBe('b');
  });

  it('create returns new ID and persists data', async () => {
    const mod = await import('../src/data/repositories/notificationsRepo.js');
    const id = await mod.create({ recipientUid: 'u1', read: false, createdAt: { seconds: 1 } });
    expect(typeof id).toBe('string');
    // Validate via list
    const items = await mod.listByRecipient('u1', 10);
    expect(items.some((n) => n.id === id)).toBe(true);
  });

  it('markAsRead and markManyAsRead set read=true', async () => {
    const mod = await import('../src/data/repositories/notificationsRepo.js');
    // seed
    const id1 = (await mod.create({ recipientUid: 'u', read: false, createdAt: { seconds: 1 } })).toString();
    const id2 = (await mod.create({ recipientUid: 'u', read: false, createdAt: { seconds: 2 } })).toString();

    await mod.markAsRead(id1);
    await mod.markManyAsRead([id2]);

    const all = await mod.listByRecipient('u', 10);
    const n1 = all.find((n) => n.id === id1);
    const n2 = all.find((n) => n.id === id2);
    expect(n1.read).toBe(true);
    expect(n2.read).toBe(true);
  });

  it('deleteMany removes notifications', async () => {
    const mod = await import('../src/data/repositories/notificationsRepo.js');
    const id1 = (await mod.create({ recipientUid: 'u', read: false, createdAt: { seconds: 1 } })).toString();
    const id2 = (await mod.create({ recipientUid: 'u', read: false, createdAt: { seconds: 2 } })).toString();

    await mod.deleteMany([id1, id2]);

    const items = await mod.listByRecipient('u', 10);
    expect(items.find((n) => n.id === id1)).toBeUndefined();
    expect(items.find((n) => n.id === id2)).toBeUndefined();
  });
});

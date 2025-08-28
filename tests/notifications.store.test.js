import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mocks for repo functions used by the store
const repoMocks = {
  listByRecipient: vi.fn(),
  listenByRecipient: vi.fn(),
  markManyAsRead: vi.fn(),
  deleteMany: vi.fn(),
};

vi.mock('../src/data/repositories/notificationsRepo.js', () => ({
  ...repoMocks,
}));

// Use real createStore implementation
// No need to mock '@core/store/createStore.js'

let notificationsStore;

function freshStore() {
  // Ensure fresh import with mocks applied
  return import('../src/features/notifications/store.js').then((mod) => mod.notificationsStore);
}

beforeEach(async () => {
  // reset mocks and store state
  Object.values(repoMocks).forEach((fn) => fn.mockReset());
  notificationsStore = await freshStore();
  notificationsStore.setState({
    items: [],
    unread: 0,
    listening: false,
    lastUpdated: null,
    _unsubscribe: null,
    _uid: null,
  });
});

describe('notificationsStore', () => {
  it('load() fetches and sets items/unread/_uid', async () => {
    const list = [
      { id: '1', read: false },
      { id: '2', read: true },
      { id: '3', read: false },
    ];
    repoMocks.listByRecipient.mockResolvedValueOnce(list);

    const res = await notificationsStore.load('userA', 50);
    expect(res).toEqual(list);

    const s = notificationsStore.getState();
    expect(s.items).toEqual(list);
    expect(s.unread).toBe(2);
    expect(s._uid).toBe('userA');
  });

  it('start() begins listening and updates state via callback; stop() unsubscribes', async () => {
    // Arrange listener mock to call callback with initial items and return unsub fn
    const initial = [ { id: 'n1', read: false } ];
    const unsubSpy = vi.fn();
    repoMocks.listenByRecipient.mockImplementation((_uid, onData, _max) => {
      // simulate snapshot delivery
      onData(initial);
      return unsubSpy;
    });

    const unsub = notificationsStore.start('userB', 10);
    expect(typeof unsub).toBe('function');

    const s1 = notificationsStore.getState();
    expect(s1.listening).toBe(true);
    expect(s1.items).toEqual(initial);
    expect(s1.unread).toBe(1);
    expect(s1._uid).toBe('userB');

    notificationsStore.stop();
    expect(unsubSpy).toHaveBeenCalledTimes(1);
    const s2 = notificationsStore.getState();
    expect(s2.listening).toBe(false);
    expect(s2._unsubscribe).toBe(null);
  });

  it('markRead() marks items as read and updates unread count', async () => {
    notificationsStore.setState({
      items: [
        { id: '1', read: false },
        { id: '2', read: false },
        { id: '3', read: true },
      ],
      unread: 2,
    });
    repoMocks.markManyAsRead.mockResolvedValueOnce();

    await notificationsStore.markRead(['1', '2']);

    const s = notificationsStore.getState();
    expect(repoMocks.markManyAsRead).toHaveBeenCalledWith(['1', '2']);
    expect(s.items.find((n) => n.id === '1').read).toBe(true);
    expect(s.items.find((n) => n.id === '2').read).toBe(true);
    expect(s.unread).toBe(0);
  });

  it('removeMany() deletes items and recalculates unread', async () => {
    notificationsStore.setState({
      items: [
        { id: '1', read: false },
        { id: '2', read: true },
        { id: '3', read: false },
      ],
      unread: 2,
    });
    repoMocks.deleteMany.mockResolvedValueOnce();

    await notificationsStore.removeMany(['1', '2']);

    const s = notificationsStore.getState();
    expect(repoMocks.deleteMany).toHaveBeenCalledWith(['1', '2']);
    expect(s.items.map((n) => n.id)).toEqual(['3']);
    expect(s.unread).toBe(1);
  });
});

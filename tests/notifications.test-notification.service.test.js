// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

// Mocks shared across tests (use same aliases as in service)
vi.mock('@data/firebase/client.js', () => ({ db: {} }));

// Lightweight eventBus mock to observe emitted snackbars
vi.mock('@core/events/eventBus.js', () => ({
  eventBus: { emit: vi.fn() },
}));

// Default mocks; will override per test
const budgetsRepoMock = { getById: vi.fn() };
// Mock both alias and relative path to be safe; export named getById
vi.mock('@data/repositories/budgetsRepo.js', () => ({ getById: budgetsRepoMock.getById }));
vi.mock('../src/data/repositories/budgetsRepo.js', () => ({ getById: budgetsRepoMock.getById }));

const notificationsRepoMock = { create: vi.fn() };
vi.mock('@data/repositories/notificationsRepo.js', () => ({ create: notificationsRepoMock.create }));
vi.mock('../src/data/repositories/notificationsRepo.js', () => ({ create: notificationsRepoMock.create }));

// Firestore primitives
const firestoreMock = {
  serverTimestamp: () => ({ _serverTs: true }),
  // getDoc/doc used by getUserInfo
  getDoc: vi.fn(async () => ({ exists: () => true, data: () => ({ displayName: 'Alice Tester', email: 'alice@test' }) })),
  doc: vi.fn((db, col, id) => ({ _col: col, _id: id })),
};
vi.mock('firebase/firestore', () => firestoreMock);

// Reset and fresh import helper
async function importServiceFresh() {
  vi.resetModules();
  // Re-apply module mocks after reset
  vi.doMock('@data/firebase/client.js', () => ({ db: {} }));
  vi.doMock('@core/events/eventBus.js', () => ({ eventBus: { emit: vi.fn() } }));
  vi.doMock('@data/repositories/budgetsRepo.js', () => ({ getById: budgetsRepoMock.getById }));
  vi.doMock('@data/repositories/notificationsRepo.js', () => ({ create: notificationsRepoMock.create }));
  vi.doMock('firebase/firestore', () => firestoreMock);
  return await import('../src/features/notifications/NotificationService.js');
}

describe('NotificationService test_notification flows', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    budgetsRepoMock.getById.mockReset();
    notificationsRepoMock.create.mockReset();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('sendTestNotificationToOwner: creates notification for owner when sender != owner', async () => {
    budgetsRepoMock.getById.mockResolvedValue({ id: 'b1', nome: 'Budget', criadoPor: 'owner1' });
    notificationsRepoMock.create.mockResolvedValue('new_id');

    const svc = await importServiceFresh();
    const { eventBus } = await import('../src/core/events/eventBus.js');
    const emit = eventBus.emit;

    await svc.sendTestNotificationToOwner('b1', 'sender1');

    expect(notificationsRepoMock.create).toHaveBeenCalledTimes(1);
    const payload = notificationsRepoMock.create.mock.calls[0][0];
    expect(payload.type).toBe('test_notification');
    expect(payload.recipientUid).toBe('owner1');
    expect(payload.senderName).toBeDefined();

    // snackbar success emitted
    expect(emit).toHaveBeenCalled();
    const events = emit.mock.calls.map((c) => c[0]);
    expect(events).toContain('snackbar:show');
  });

  it('sendTestNotificationToOwner: does not create when sender is owner; emits info snackbar', async () => {
    budgetsRepoMock.getById.mockResolvedValue({ id: 'b1', nome: 'Budget', criadoPor: 'sender1' });

    const svc = await importServiceFresh();
    const { eventBus } = await import('../src/core/events/eventBus.js');
    const emit = eventBus.emit;

    await svc.sendTestNotificationToOwner('b1', 'sender1');

    expect(notificationsRepoMock.create).not.toHaveBeenCalled();
    // emitted snackbar:show with type info
    const snackbarCalls = emit.mock.calls.filter((c) => c[0] === 'snackbar:show');
    expect(snackbarCalls.length).toBeGreaterThan(0);
    const cfg = snackbarCalls.at(-1)[1];
    expect(cfg.type).toBe('info');
  });

  it('sendTestNotificationToShared: creates one notification per shared recipient, excluding sender', async () => {
    budgetsRepoMock.getById.mockResolvedValue({ id: 'b1', nome: 'Budget', usuariosPermitidos: ['a', 'b', 'sender1', 'b'] });
    notificationsRepoMock.create.mockResolvedValue('nid');

    const svc = await importServiceFresh();
    const { eventBus } = await import('../src/core/events/eventBus.js');
    const emit = eventBus.emit;

    await svc.sendTestNotificationToShared('b1', 'sender1');

    // should create for 'a' and 'b' only
    const recipients = notificationsRepoMock.create.mock.calls.map((c) => c[0].recipientUid).sort();
    expect(recipients).toEqual(['a', 'b']);

    // snackbar success emitted
    const snackbarCalls = emit.mock.calls.filter((c) => c[0] === 'snackbar:show');
    expect(snackbarCalls.length).toBeGreaterThan(0);
    const cfg = snackbarCalls.at(-1)[1];
    expect(cfg.type).toBe('success');
  });

  it('sendTestNotificationToShared: emits info when there are no shared recipients', async () => {
    budgetsRepoMock.getById.mockResolvedValue({ id: 'b1', nome: 'Budget', usuariosPermitidos: ['sender1'] });

    const svc = await importServiceFresh();
    const { eventBus } = await import('../src/core/events/eventBus.js');
    const emit = eventBus.emit;

    await svc.sendTestNotificationToShared('b1', 'sender1');

    expect(notificationsRepoMock.create).not.toHaveBeenCalled();
    const snackbarCalls = emit.mock.calls.filter((c) => c[0] === 'snackbar:show');
    expect(snackbarCalls.length).toBeGreaterThan(0);
    const cfg = snackbarCalls.at(-1)[1];
    expect(cfg.type).toBe('info');
  });
});

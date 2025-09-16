// features/notifications/notificationsController.js
// Assina notificações do usuário atual, mantém estado em appState e exibe toasts opcionais.
import { eventBus } from '@core/events/eventBus.js';

function toMillis(createdAt) {
  try {
    if (!createdAt) {
      return 0;
    }
    if (typeof createdAt.toDate === 'function') {
      return createdAt.toDate().getTime();
    }
    if (createdAt.seconds) {
      return createdAt.seconds * 1000;
    }
    const d = new Date(createdAt);
    return Number.isFinite(d.getTime()) ? d.getTime() : 0;
  } catch { return 0; }
}

function getToastsEnabled() {
  try { const v = localStorage.getItem('notif_toasts_enabled'); return v === null ? true : v === 'true'; } catch { return true; }
}

async function getUserPrefs(uid) {
  try {
    const { getByUser } = await import('@data/repositories/userSettingsRepo.js');
    const doc = await getByUser(uid);
    return doc?.notificationPrefs || {};
  } catch { return {}; }
}

function isToastAllowed(prefs, notif) {
  try {
    // Global toggle
    const globalOn = getToastsEnabled();
    if (!globalOn) {
      return false;
    }
    const type = notif?.type;
    const budgetId = notif?.budgetId;
    if (!type || !budgetId) {
      return true; // não bloqueia se faltar dados
    }
    const perBudget = prefs?.byBudget?.[budgetId];
    if (!perBudget) {
      return true;
    }
    const allowMap = perBudget.allow || {}; // { new_transaction: true, ... }
    // Default quando não especificado: true
    return allowMap[type] !== false;
  } catch { return true; }
}

// Internal export for tests only
export { isToastAllowed as __isToastAllowedForTest };

function makeToastMessage(n) {
  try {
    const t = n?.type || '';
    const budget = n?.budgetName ? ` (${n.budgetName})` : '';
    if (t === 'new_transaction') {
      return `Nova transação${budget}: ${n.transactionDescricao || ''}`;
    }
    if (t === 'updated_transaction') {
      return `Transação atualizada${budget}: ${n.transactionDescricao || ''}`;
    }
    if (t === 'deleted_transaction') {
      return `Transação excluída${budget}: ${n.transactionDescricao || ''}`;
    }
    if (t === 'category_added') {
      return `Categoria criada${budget}: ${n.categoryNome || ''}`;
    }
    if (t === 'category_updated') {
      return `Categoria atualizada${budget}: ${n.categoryNome || ''}`;
    }
    if (t === 'category_deleted') {
      return `Categoria excluída${budget}: ${n.categoryNome || ''}`;
    }
    if (t === 'test_notification') {
      return `Teste de notificação${budget}: ${n.message || ''}`;
    }
    return `Nova atividade${budget}`;
  } catch { return 'Nova atividade'; }
}

// Estado interno em window para evitar múltiplas assinaturas
function getState() {
  const w = window;
  if (!w.__notifCtl) {
    w.__notifCtl = { unsub: null, uid: null, lastSeenAt: 0, lastIds: new Set() };
  }
  return w.__notifCtl;
}

export async function startNotificationsFor(userId) {
  console.log('[NotificationsController] 🚀 startNotificationsFor chamado para userId:', userId);
  console.log('[NotificationsController] 🔧 DEBUG: Estado atual:', getState());
  
  const st = getState();
  if (!userId) {
    console.log('[NotificationsController] ❌ userId inválido, retornando');
    return () => {};
  }
  if (st.unsub && st.uid === userId) {
    console.log('[NotificationsController] ✅ Listener já ativo para este usuário');
    return st.unsub;
  }
  if (st.unsub) { 
    console.log('[NotificationsController] 🔄 Parando listener anterior');
    try { st.unsub(); } catch {} 
  }

  console.log('[NotificationsController] 📡 Importando listenByRecipient...');
  const { listenByRecipient } = await import('@data/repositories/notificationsRepo.js');
  st.uid = userId;
  st.lastIds = new Set(Array.isArray(window.appState?.notifications) ? window.appState.notifications.map(n => n.id) : []);
  st.lastSeenAt = Math.max(0, ...(Array.isArray(window.appState?.notifications) ? window.appState.notifications.map(n => toMillis(n.createdAt)) : [0]));

  console.log('[NotificationsController] ⚙️ Obtendo preferências do usuário...');
  const prefs = await getUserPrefs(userId);
  
  console.log('[NotificationsController] 👂 Iniciando listener listenByRecipient...');
  st.unsub = listenByRecipient(userId, (items) => {
    console.log('[NotificationsController] 📡 Dados recebidos do listener:', items.length, 'itens');
    console.log('[NotificationsController] 📡 Detalhes das notificações:', items.map(n => ({ id: n.id, type: n.type, read: n.read, recipientUid: n.recipientUid })));
    console.log('[NotificationsController] 🔧 DEBUG: Items completos:', items);
    
    // Atualiza estado global
    window.appState = window.appState || {};
    window.appState.notifications = items;

    // Priorizar notificações não lidas
    const unreadCount = items.filter(n => !n.read && !n.archivedAt).length;
    console.log(`[NotificationsController] 📊 ${items.length} notificações carregadas, ${unreadCount} não lidas`);

    // Notificar UI sobre atualização (para badges, etc.)
    try { eventBus.emit('notifications:updated', items); } catch {}

    // Novas notificações: modal ou toasts
    if (getToastsEnabled()) {
      try {
        for (const n of items) {
          const ts = toMillis(n.createdAt);
          if (!st.lastIds.has(n.id) && ts >= st.lastSeenAt) {
            if (!isToastAllowed(prefs, n)) {
              continue;
            }
            
            // Verificar se deve usar modal ou snackbar
            const useModal = localStorage.getItem('notification_use_modal') !== 'false';
            
            if (useModal) {
              // Usar modal para novas notificações
              try {
                console.log('[NotificationsController] 🔧 DEBUG: Emitindo evento notification:show-modal para:', n.type, n);
                console.log('[NotificationsController] 🔧 DEBUG: EventBus disponível:', !!eventBus);
                console.log('[NotificationsController] 🔧 DEBUG: EventBus.emit disponível:', typeof eventBus.emit);
                eventBus.emit('notification:show-modal', n);
                console.log('[NotificationsController] 📱 Modal de notificação disparado para:', n.type);
              } catch (e) {
                console.warn('[NotificationsController] ⚠️ Erro ao emitir evento de modal:', e);
                console.error('[NotificationsController] ❌ Stack trace:', e.stack);
                // Fallback para snackbar
                const message = makeToastMessage(n);
                eventBus.emit('snackbar:show', { message, type: 'info', duration: 3500, action: { label: 'Ver', onClick: () => { try { window.location.hash = '#/notifications'; } catch {} } } });
              }
            } else {
              // Usar snackbar tradicional
              const message = makeToastMessage(n);
              try {
                eventBus.emit('snackbar:show', { message, type: 'info', duration: 3500, action: { label: 'Ver', onClick: () => { try { window.location.hash = '#/notifications'; } catch {} } } });
              } catch {
                try { window.Snackbar?.({ message, type: 'info', duration: 3500 }); } catch {}
              }
            }
          }
        }
      } catch {}
    }

    // Atualiza marcadores para próxima rodada
    st.lastIds = new Set(items.map(n => n.id));
    st.lastSeenAt = Math.max(0, ...items.map(n => toMillis(n.createdAt)));
  }, 100);

  console.log('[NotificationsController] ✅ Listener de notificações configurado com sucesso');
  return st.unsub;
}

export function stopNotifications() {
  const st = getState();
  if (st.unsub) { try { st.unsub(); } catch {} }
  st.unsub = null; st.uid = null;
}

export async function markAllAsRead() {
  const list = Array.isArray(window.appState?.notifications) ? window.appState.notifications : [];
  const ids = list.filter(n => !n.read).map(n => n.id);
  if (!ids.length) {
    return;
  }
  const { markManyAsRead } = await import('@data/repositories/notificationsRepo.js');
  await markManyAsRead(ids);
}

export async function deleteAllRead() {
  const list = Array.isArray(window.appState?.notifications) ? window.appState.notifications : [];
  const ids = list.filter(n => n.read).map(n => n.id);
  if (!ids.length) {
    return;
  }
  const { deleteMany } = await import('@data/repositories/notificationsRepo.js');
  await deleteMany(ids);
}

export async function markOneAsRead(id) {
  if (!id) {
    return;
  }
  const { markAsRead } = await import('@data/repositories/notificationsRepo.js');
  await markAsRead(id);
}

// Fixar/Desfixar
export async function pinOne(id, pinned = true) {
  if (!id) { return; }
  const { pin } = await import('@data/repositories/notificationsRepo.js');
  await pin(id, pinned);
  try { eventBus.emit('snackbar:show', { message: pinned ? 'Notificação fixada' : 'Notificação desfixada', type: 'success', duration: 1800 }); } catch {}
}

export async function pinAllRead(pinned = true) {
  const list = Array.isArray(window.appState?.notifications) ? window.appState.notifications : [];
  const ids = list.filter(n => n.read && !n.archivedAt).map(n => n.id);
  if (!ids.length) { return; }
  const { pinMany } = await import('@data/repositories/notificationsRepo.js');
  await pinMany(ids, pinned);
  try { eventBus.emit('snackbar:show', { message: pinned ? 'Lidas fixadas' : 'Lidas desfixadas', type: 'success', duration: 1800 }); } catch {}
}

// Arquivar/Desarquivar
export async function archiveOne(id, archived = true) {
  if (!id) { return; }
  const { archive } = await import('@data/repositories/notificationsRepo.js');
  await archive(id, archived);
  try { eventBus.emit('snackbar:show', { message: archived ? 'Notificação arquivada' : 'Notificação restaurada', type: 'info', duration: 1800 }); } catch {}
}

export async function archiveAllRead() {
  const list = Array.isArray(window.appState?.notifications) ? window.appState.notifications : [];
  const ids = list.filter(n => n.read && !n.archivedAt).map(n => n.id);
  if (!ids.length) { return; }
  const { archiveMany } = await import('@data/repositories/notificationsRepo.js');
  await archiveMany(ids);
  try { eventBus.emit('snackbar:show', { message: 'Notificações lidas arquivadas', type: 'info', duration: 2000 }); } catch {}
}

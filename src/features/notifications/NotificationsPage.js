// features/notifications/NotificationsPage.js
import { eventBus } from '@core/events/eventBus.js';
import { mountPeriodIndicator } from '../../ui/PeriodIndicator.js';
import { getSelectedPeriod } from '@core/utils/globalUtils.js';
import {
  startNotificationsFor,
  markAllAsRead as ctlMarkAll,
  deleteAllRead as ctlDeleteAll,
  markOneAsRead as ctlMarkOne,
  pinOne as ctlPinOne,
  archiveOne as ctlArchiveOne,
  archiveAllRead as ctlArchiveAllRead,
} from './notificationsController.js';
import { applyNotificationFilters as applyFiltersUtil, groupNotificationsByDay as groupByDayUtil } from './utils/filters.js';
import { renderSection, renderNotificationCard } from './ui/renderCard.js';
import { getNotificationModal } from './ui/NotificationModal.js';
import './debug-notifications.js';

const FILTERS_STORAGE_KEY = 'notif_filters_v1';
const DEFAULT_TYPES = [
  'new_transaction',
  'updated_transaction',
  'deleted_transaction',
  'category_added',
  'category_updated',
  'category_deleted',
  'test_notification',
];

// Shims/Fallbacks
const renderFAB = typeof window.renderFAB === 'function' ? window.renderFAB : () => {};

function getNotifFilters() {
  console.log('[NotificationsPage] 🔧 Obtendo filtros de notificação...');
  
  if (typeof window.getNotifFilters === 'function') {
    console.log('[NotificationsPage] 🔧 Usando função global getNotifFilters');
    return window.getNotifFilters();
  }
  
  try {
    const raw = localStorage.getItem(FILTERS_STORAGE_KEY);
    console.log('[NotificationsPage] 🔧 Dados do localStorage:', raw ? 'Encontrados' : 'Não encontrados');
    
    if (raw) {
      const parsed = JSON.parse(raw);
      const filters = {
        types: Array.isArray(parsed.types) && parsed.types.length ? parsed.types : DEFAULT_TYPES.slice(),
        period: parsed.period || 'all',
        unreadOnly: parsed.unreadOnly !== undefined ? !!parsed.unreadOnly : true, // Padrão: mostrar não lidas
      };
      console.log('[NotificationsPage] 🔧 Filtros carregados do localStorage:', filters);
      return filters;
    }
  } catch (e) {
    console.warn('[NotificationsPage] ⚠️ Erro ao carregar filtros do localStorage:', e);
  }
  
  // Padrão: sempre mostrar notificações não lidas
  const defaultFilters = { types: DEFAULT_TYPES.slice(), period: 'all', unreadOnly: true };
  console.log('[NotificationsPage] 🔧 Usando filtros padrão:', defaultFilters);
  return defaultFilters;
}

function applyNotificationFilters(list, filters) {
  if (typeof window.applyNotificationFilters === 'function') {
    return window.applyNotificationFilters(list, filters);
  }
  return applyFiltersUtil(list, filters);
}
function groupNotificationsByDay(list) {
  if (typeof window.groupNotificationsByDay === 'function') {
    return window.groupNotificationsByDay(list);
  }
  return groupByDayUtil(list);
}

// Persistência de preferências por orçamento/tipo
async function loadUserNotificationPrefs() {
  try {
    const uid = window.appState?.currentUser?.uid;
    if (!uid) {
      return {};
    }
    const { getByUser } = await import('@data/repositories/userSettingsRepo.js');
    const doc = await getByUser(uid);
    return doc?.notificationPrefs || {};
  } catch {
    return {};
  }
}
async function saveUserNotificationPrefs(prefs) {
  try {
    const uid = window.appState?.currentUser?.uid;
    if (!uid) {
      return false;
    }
    const { setNotificationPrefs } = await import('@data/repositories/userSettingsRepo.js');
    await setNotificationPrefs(uid, prefs || {});
    return true;
  } catch {
    return false;
  }
}
async function toggleBudgetTypePref(budgetId, type) {
  try {
    const prefs = await loadUserNotificationPrefs();
    const byBudget = prefs.byBudget || {};
    const cur = byBudget[budgetId] || { allow: {} };
    const allow = { ...(cur.allow || {}) };
    allow[type] = !(allow[type] !== false);
    byBudget[budgetId] = { ...cur, allow };
    const next = { ...prefs, byBudget };
    await saveUserNotificationPrefs(next);
    try {
      eventBus.emit('snackbar:show', { message: 'Preferência salva', type: 'success', duration: 2000 });
    } catch {}
  } catch {}
}

// Estado local de filtros
let notifFilters = null;

// Controle de debounce para evitar loops infinitos
let isRendering = false;
let renderTimeout = null;
function getFiltersState() {
  if (!notifFilters) {
    notifFilters = window.__notifFilters || getNotifFilters();
  }
  return notifFilters;
}
function saveFiltersState() {
  console.log('[NotificationsPage] 💾 Salvando estado dos filtros...');
  
  try {
    // Garantir que notifFilters não seja null
    if (!notifFilters) {
      notifFilters = getNotifFilters();
    }
    
    // Verificar se notifFilters ainda é null após a inicialização
    if (!notifFilters) {
      console.warn('[NotificationsPage] ⚠️ notifFilters ainda é null, usando filtros padrão');
      notifFilters = { types: DEFAULT_TYPES.slice(), period: 'all', unreadOnly: true };
    }
    
    window.__notifFilters = notifFilters;
    
    const filtersToSave = {
      types: Array.isArray(notifFilters.types) ? notifFilters.types : [],
      period: notifFilters.period || 'all',
      unreadOnly: !!notifFilters.unreadOnly,
    };
    
    localStorage.setItem(FILTERS_STORAGE_KEY, JSON.stringify(filtersToSave));
    console.log('[NotificationsPage] ✅ Filtros salvos no localStorage:', filtersToSave);
  } catch (e) {
    console.error('[NotificationsPage] ❌ Erro ao salvar filtros:', e);
  }
}
function toggleNotificationTypeFilter(type) {
  notifFilters = getFiltersState();
  const set = new Set(notifFilters.types || []);
  if (set.has(type)) {
    set.delete(type);
  } else {
    set.add(type);
  }
  notifFilters.types = Array.from(set);
  saveFiltersState();
  renderNotifications(true); // Force render
}
function setNotificationPeriod(period) {
  notifFilters = getFiltersState();
  notifFilters.period = period;
  saveFiltersState();
  renderNotifications(true); // Force render
}
function toggleUnreadOnly() {
  console.log('[NotificationsPage] 🔄 Toggle unreadOnly chamado');
  notifFilters = getFiltersState();
  console.log('[NotificationsPage] 🔄 Valor atual de unreadOnly:', notifFilters.unreadOnly);
  notifFilters.unreadOnly = !notifFilters.unreadOnly;
  console.log('[NotificationsPage] 🔄 Novo valor de unreadOnly:', notifFilters.unreadOnly);
  saveFiltersState();
  renderNotifications(true); // Force render
}
function resetNotificationFilters() {
  notifFilters = { types: DEFAULT_TYPES.slice(), period: 'all', unreadOnly: true }; // Reset para padrão
  saveFiltersState();
  try {
    eventBus.emit('snackbar:show', { message: 'Filtros redefinidos para padrão', type: 'success', duration: 2000 });
  } catch {}
  renderNotifications(true); // Force render
}

function runNotificationAutoClean() {
  try {
    const result = clearOldNotificationsWithToast();
    renderNotifications(true); // Force render
    return result;
  } catch (e) {
    console.warn('Auto clean falhou', e);
  }
}
function clearOldNotificationsWithToast(daysOverride) {
  let days = 30;
  try {
    if (typeof daysOverride === 'number' && Number.isFinite(daysOverride)) {
      days = daysOverride;
    } else {
      const v = parseInt(localStorage.getItem('notif_retention_days') || '30', 10);
      if (Number.isFinite(v)) {
        days = v;
      }
    }
  } catch {}
  if (!days || days <= 0) {
    try {
      eventBus.emit('snackbar:show', { message: 'Retenção desativada', type: 'info', duration: 2000 });
    } catch {}
    return false;
  }
  const cutoff = Date.now() - days * 24 * 60 * 60 * 1000;
  const list = Array.isArray(window.appState?.notifications) ? window.appState.notifications : [];
  const before = list.length;
  const next = list.filter((n) => {
    const d = n.createdAt?.toDate ? n.createdAt.toDate().getTime() : new Date(n.createdAt).getTime();
    return d >= cutoff;
  });
  window.appState.notifications = next;
  const removed = Math.max(0, before - next.length);
  try {
    eventBus.emit('notifications:updated', next);
  } catch {}
  if (removed > 0) {
    try {
      eventBus.emit('snackbar:show', { message: `Notificações antigas removidas: ${removed}`, type: 'success', duration: 2500 });
    } catch {}
  }
  return removed > 0;
}

function openNotificationTarget(id, type) {
  // Sempre redirecionar para o dashboard após hard reset
  window.location.hash = '#/dashboard';
}
function showConfirmationModal(cfg) {
  const ok = confirm(cfg?.message || 'Confirmar?');
  if (ok && cfg?.onConfirm) {
    try {
      if (typeof cfg.onConfirm === 'function') {
        cfg.onConfirm();
      }
    } catch (e) {
      console.error('Erro no onConfirm', e);
    }
  }
  // Support for passing a global function name instead of a function reference
  if (ok && cfg?.onConfirmFn && typeof cfg.onConfirmFn === 'string') {
    try {
      const fn = window[cfg.onConfirmFn];
      if (typeof fn === 'function') {
        fn();
      }
    } catch {}
  }
}

export async function renderNotifications(force = false) {
  // Debounce para evitar loops infinitos
  if (isRendering && !force) {
    console.log('[NotificationsPage] ⏳ Renderização já em andamento, ignorando...');
    return;
  }
  
  // Limpar timeout anterior se existir
  if (renderTimeout) {
    clearTimeout(renderTimeout);
    renderTimeout = null;
  }
  
  // Implementar debounce de 100ms
  if (!force) {
    renderTimeout = setTimeout(() => {
      renderNotifications(true);
    }, 100);
    return;
  }
  
  isRendering = true;
  console.log('[NotificationsPage] 🚀 Iniciando renderização...');
  
  try {
    const content = document.getElementById('app-content');
    if (!content) {
      console.error('[NotificationsPage] ❌ Elemento app-content não encontrado!');
      return;
    }
    
    console.log('[NotificationsPage] ✅ Elemento app-content encontrado');

  await loadNotifications(true); // Skip event emit para evitar loop
  const notifications = window.appState.notifications || [];
  console.log('[NotificationsPage] 📧 Notificações carregadas:', notifications.length);
  console.log('[NotificationsPage] 📧 Notificações originais:', notifications.map(n => ({ id: n.id, type: n.type, read: n.read, archivedAt: n.archivedAt })));
  
  // Obter filtros atuais (respeitando a escolha do usuário)
  const filters = getNotifFilters();
  console.log('[NotificationsPage] 🔧 Filtros atuais:', filters);
  
  // Apenas definir como true se for a primeira vez (padrão)
  if (filters.unreadOnly === undefined) {
    filters.unreadOnly = true;
    saveFiltersState();
    console.log('[NotificationsPage] ✅ Padrão: Configurado para mostrar apenas notificações não lidas');
  } else {
    console.log('[NotificationsPage] ✅ Respeitando escolha do usuário: unreadOnly =', filters.unreadOnly);
  }
  
  // Log das notificações carregadas
  const unreadCount = notifications.filter(n => !n.read && !n.archivedAt).length;
  console.log(`[NotificationsPage] 📊 Renderizando: ${notifications.length} total, ${unreadCount} não lidas`);

  const typeLabels = {
    new_transaction: 'Nova Tx',
    updated_transaction: 'Tx Atualizada',
    deleted_transaction: 'Tx Excluída',
    category_added: 'Cat Criada',
    category_updated: 'Cat Atualizada',
    category_deleted: 'Cat Excluída',
    test_notification: 'Teste',
  };

  const typeButtonsHtml = DEFAULT_TYPES.map((t) => {
    const active = filters.types.includes(t);
    return `<button onclick="window.toggleNotificationTypeFilter && window.toggleNotificationTypeFilter('${t}')" class="px-3 py-1 rounded-full text-xs font-medium ${
      active ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
    }">${typeLabels[t]}</button>`;
  }).join('');

  const periodButtonsHtml = ['all', 'today', '7d', '30d']
    .map((p) => {
      const label = p === 'all' ? 'Tudo' : p === 'today' ? 'Hoje' : p === '7d' ? '7 dias' : '30 dias';
      const active = filters.period === p;
      return `<button onclick="window.setNotificationPeriod && window.setNotificationPeriod('${p}')" class="px-3 py-1 rounded-full text-xs font-medium ${
        active ? 'bg-indigo-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
      }">${label}</button>`;
    })
    .join('');

  const filtered = applyNotificationFilters(notifications, filters);
  console.log('[NotificationsPage] 🔍 Notificações após filtro:', filtered.length);
  console.log('[NotificationsPage] 🔍 Filtros aplicados:', filters);
  
  // Priorizar notificações não lidas
  const unreadNotifications = filtered.filter(n => !n.read && !n.archivedAt);
  const readNotifications = filtered.filter(n => n.read && !n.archivedAt);
  
  console.log('[NotificationsPage] 🔍 Notificações não lidas após filtro:', unreadNotifications.length);
  console.log('[NotificationsPage] 🔍 Notificações lidas após filtro:', readNotifications.length);
  
  // Organizar por prioridade: não lidas primeiro, depois lidas
  const prioritizedFiltered = [...unreadNotifications, ...readNotifications];
  
  const pinned = prioritizedFiltered.filter((n) => !!n.pinned && !n.archivedAt);
  const inbox = prioritizedFiltered.filter((n) => !n.pinned && !n.archivedAt);
  const archived = prioritizedFiltered.filter((n) => !!n.archivedAt);

  console.log('[NotificationsPage] 🔍 Pinned:', pinned.length);
  console.log('[NotificationsPage] 🔍 Inbox:', inbox.length);
  console.log('[NotificationsPage] 🔍 Archived:', archived.length);

  const groupedInbox = groupNotificationsByDay(inbox);
  const groupedPinned = groupNotificationsByDay(pinned);
  const groupedArchived = groupNotificationsByDay(archived);
  
  console.log('[NotificationsPage] 🔍 Grouped Inbox:', groupedInbox.length);
  console.log('[NotificationsPage] 🔍 Grouped Pinned:', groupedPinned.length);
  console.log('[NotificationsPage] 🔍 Grouped Archived:', groupedArchived.length);

  const curP = typeof getSelectedPeriod === 'function' ? getSelectedPeriod() : null;
  const now = new Date();
  const selYear = (curP && curP.year) || window.appState?.selectedYear || now.getFullYear();
  const selMonth = (curP && curP.month) || window.appState?.selectedMonth || now.getMonth() + 1;
  const mesesNomes = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
  const monthName = mesesNomes[(selMonth - 1) % 12] || '';

  const totalNotificacoes = filtered.length;
  const notificacoesNaoLidas = filtered.filter((n) => !n.read && !n.archivedAt).length;
  const notificacoesLidas = totalNotificacoes - notificacoesNaoLidas;
  const notificacoesHoje = filtered.filter((n) => {
    const data = n.createdAt?.toDate ? n.createdAt.toDate() : new Date(n.createdAt);
    const hoje = new Date();
    return data.toDateString() === hoje.toDateString();
  }).length;

  if (!window.renderNotificationCard) {
    window.renderNotificationCard = renderNotificationCard;
  }

  const unreadBadge = notificacoesNaoLidas > 0
    ? `<span class=\"header-unread-badge inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200\" aria-live=\"polite\" aria-atomic=\"true\">${notificacoesNaoLidas}</span>`
    : '';
  const unreadColorClass = notificacoesNaoLidas > 0 ? 'text-yellow-200' : 'text-green-200';
  
  console.log('[NotificationsPage] 🔍 Renderizando inbox com', inbox.length, 'notificações');
  console.log('[NotificationsPage] 🔍 GroupedInbox tem', groupedInbox.length, 'grupos');
  
  const inboxSectionHtml = inbox.length
    ? renderSection('📬 Inbox', groupedInbox)
    : `
            <div class="mb-8">
              <div class="flex items-center gap-2 mb-4">
                <div class="w-1 h-6 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full"></div>
                <h2 class="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100">📬 Inbox</h2>
              </div>
        <div class="u-card bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden p-4">
                  <div class="empty-state">
                  <div class="empty-icon">✅</div>
                  <div class="empty-text">🎉 Todas as notificações foram lidas!</div>
                  <div class="empty-description">Você está em dia com suas notificações. Não há nada novo para ver.</div>
          <div class="mt-2 flex gap-2">
            <button onclick="window.renderNotifications()" class="u-btn u-btn--primary mobile-btn">🔄 Atualizar</button>
            <button onclick="window.toggleUnreadOnly && window.toggleUnreadOnly()" class="u-btn u-btn--outline mobile-btn">👁️ Ver todas</button>
          </div>
                </div>
              </div>
            </div>
          `;
  const pinnedSectionHtml = pinned.length ? renderSection('📌 Fixadas', groupedPinned) : '';
  const archivedSectionHtml = archived.length ? renderSection('🗃️ Arquivadas', groupedArchived) : '';

  content.innerHTML = `
    <div class="tab-container">
      <div class="tab-header flex items-center justify-between">
        <h2 class="tab-title-highlight flex items-center gap-2">🔔 Notificações ${unreadBadge}</h2>
        <div id="notif-period-indicator"></div>
      </div>
      <div class="tab-content">
        <div class="content-spacing">

          <div class="mb-8">
            <div class="flex items-center gap-2 mb-4">
              <div class="w-1 h-6 bg-gradient-to-b from-blue-500 to-indigo-500 rounded-full"></div>
              <h2 class="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100">📊 Visão Geral</h2>
            </div>
            <div class="bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 rounded-2xl shadow-xl p-6 md:p-8 text-white">
              <div class="flex items-center justify-between mb-6">
                <div>
                  <h3 class="text-xl md:text-2xl font-bold">Centro de Notificações</h3>
                  <p class="text-sm opacity-90">${totalNotificacoes} notificações no total</p>
                  <p class="text-xs mt-1 opacity-90">Período: <span class="font-semibold">${monthName} / ${selYear}</span></p>
                  <p class="text-xs mt-1 opacity-90 text-yellow-200">📬 Modo: Mostrando apenas notificações não lidas</p>
                </div>
                <div class="text-right">
                  <div class="text-2xl md:text-3xl font-bold ${unreadColorClass}">${notificacoesNaoLidas}</div>
                  <p class="text-xs opacity-90">${notificacoesNaoLidas > 0 ? '📬 Não lidas' : '✅ Todas lidas'}</p>
                </div>
              </div>
              <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div class="bg-white bg-opacity-15 backdrop-blur-sm rounded-xl p-4 text-center">
                  <div class="text-2xl mb-2">📧</div>
                  <div class="text-2xl md:text-3xl font-bold">${totalNotificacoes}</div>
                  <div class="text-sm opacity-90">Total</div>
                </div>
                <div class="bg-white bg-opacity-15 backdrop-blur-sm rounded-xl p-4 text-center">
                  <div class="text-2xl mb-2">📬</div>
                  <div class="text-2xl md:text-3xl font-bold text-yellow-200">${notificacoesNaoLidas}</div>
                  <div class="text-sm opacity-90">Não lidas</div>
                </div>
                <div class="bg-white bg-opacity-15 backdrop-blur-sm rounded-xl p-4 text-center">
                  <div class="text-2xl mb-2">✅</div>
                  <div class="text-2xl md:text-3xl font-bold text-green-200">${notificacoesLidas}</div>
                  <div class="text-sm opacity-90">Lidas</div>
                </div>
                <div class="bg-white bg-opacity-15 backdrop-blur-sm rounded-xl p-4 text-center">
                  <div class="text-2xl mb-2">📅</div>
                  <div class="text-2xl md:text-3xl font-bold">${notificacoesHoje}</div>
                  <div class="text-sm opacity-90">Hoje</div>
                </div>
              </div>
            </div>
          </div>

          <div class="mb-8">
            <div class="flex items-center gap-2 mb-4">
              <div class="w-1 h-6 bg-gradient-to-b from-green-500 to-teal-500 rounded-full"></div>
              <h2 class="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100">🔧 Ações & Controles</h2>
            </div>
      <div class="u-card bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div class="bg-gradient-to-r from-green-50 to-teal-50 dark:from-gray-800 dark:to-gray-800 p-4 border-b border-gray-200 dark:border-gray-700">
              <div class="flex flex-wrap justify-between items-center gap-2">
                  <h3 class="text-lg font-bold text-gray-900 dark:text-gray-100">Gerenciar Notificações</h3>
                  <div class="flex gap-2 flex-wrap">
        <button onclick="window.showConfirmationModal({ title: 'Marcar como Lidas', message: 'Deseja marcar todas as notificações como lidas?', confirmText: 'Sim, Marcar', confirmColor: 'bg-blue-500 hover:bg-blue-600', onConfirmFn: 'markAllNotificationsAsRead' })" class="u-btn u-btn--primary mobile-btn">✅ Marcar todas como lidas</button>
        <button onclick="window.showConfirmationModal({ title: 'Arquivar notificações lidas', message: 'Deseja arquivar todas as notificações lidas? Você poderá restaurá-las depois.', confirmText: 'Sim, Arquivar', confirmColor: 'bg-indigo-500 hover:bg-indigo-600', onConfirmFn: 'archiveAllReadNotifications' })" class="u-btn u-btn--outline mobile-btn">🗃️ Arquivar lidas</button>
        <button onclick="window.showConfirmationModal({ title: 'Apagar notificações lidas', message: 'Deseja apagar todas as notificações lidas? Esta ação não pode ser desfeita.', confirmText: 'Sim, Apagar', confirmColor: 'bg-red-500 hover:bg-red-600', onConfirmFn: 'deleteAllReadNotifications' })" class="u-btn u-btn--danger mobile-btn">🗑️ Apagar lidas</button>
        <button onclick="window.renderNotifications()" class="u-btn u-btn--outline mobile-btn">🔄 Atualizar</button>
        <button onclick="window.__sendTestToOwner && window.__sendTestToOwner()" class="u-btn u-btn--outline mobile-btn">📣 Teste → Dono</button>
        <button onclick="window.__sendTestToShared && window.__sendTestToShared()" class="u-btn u-btn--outline mobile-btn">📣 Teste → Compartilhados</button>
        <button onclick="window.__testNotificationModal && window.__testNotificationModal()" class="u-btn u-btn--outline mobile-btn">📱 Testar Modal</button>
        <button onclick="window.debugNotificationSystem && window.debugNotificationSystem()" class="u-btn u-btn--outline mobile-btn">🔍 Debug Sistema</button>
        <button onclick="window.debugSharedNotificationTest && window.debugSharedNotificationTest()" class="u-btn u-btn--outline mobile-btn">🧪 Debug Compartilhados</button>
        <button onclick="window.debugCheckOtherUserNotifications && window.debugCheckOtherUserNotifications()" class="u-btn u-btn--outline mobile-btn">👥 Ver Outros Usuários</button>
        <button onclick="window.debugTestModal && window.debugTestModal()" class="u-btn u-btn--outline mobile-btn">📱 Testar Modal</button>
                  </div>
                </div>
                <div class="mt-3 flex flex-col gap-3">
                  <div class="flex flex-wrap gap-2 items-center">
                    <span class="text-sm text-gray-700 dark:text-gray-300 mr-1">Tipos:</span>
                    ${typeButtonsHtml}
                  </div>
                  <div class="flex flex-wrap gap-2 items-center">
                    <span class="text-sm text-gray-700 dark:text-gray-300 mr-1">Período:</span>
                    ${periodButtonsHtml}
                  </div>
                  <div class="flex items-center gap-2">
                    <label class="inline-flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300" title="Atalho: U">
                      <input type="checkbox" ${filters.unreadOnly ? 'checked' : ''} onchange="window.toggleUnreadOnly && window.toggleUnreadOnly()" />
                      Apenas não lidas <span class="text-xs text-gray-500 dark:text-gray-400">(Atalho: U)</span>
                    </label>
        <button onclick="window.resetNotificationFilters && window.resetNotificationFilters()" class="ml-2 u-btn u-btn--ghost text-xs">♻️ Redefinir filtros</button>
        <button onclick="window.loadUnreadNotifications && window.loadUnreadNotifications()" class="ml-2 u-btn u-btn--primary text-xs">📬 Focar não lidas</button>
                  </div>
                  <div class="mt-2 p-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                    <div class="text-xs text-gray-600 dark:text-gray-300">As preferências de notificações (toasts, retenção e por orçamento/tipo) foram movidas para <strong>Configurações</strong> para manter esta aba focada em consultar notificações.</div>
                    <div class="mt-2"><a href="#/settings" class="inline-flex items-center gap-2 text-xs px-3 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">Abrir Configurações</a></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          ${inboxSectionHtml}

          ${pinnedSectionHtml}
          ${archivedSectionHtml}

        </div>
      </div>
    </div>
  `;

  renderFAB();

  // Montar indicador de período padrão no cabeçalho
  try { mountPeriodIndicator('#notif-period-indicator'); } catch {}
  
  console.log('[NotificationsPage] ✅ Interface renderizada com sucesso');

  try {
    const prev = window.__prevNotifHeaderCount || 0;
    const curCount = (Array.isArray(window.appState?.notifications) ? window.appState.notifications.filter((n) => !n.read && !n.archivedAt).length : 0) || 0;
    const badge = document.querySelector('.header-unread-badge');
    const prefersReduce = typeof window.matchMedia === 'function' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (badge && curCount > 0 && curCount !== prev && !prefersReduce) {
      badge.style.transform = 'scale(1.05)';
      setTimeout(() => {
        try {
          badge.style.transform = '';
        } catch {}
      }, 180);
    }
    window.__prevNotifHeaderCount = curCount;
  } catch {}

  // Expor handlers globais necessários pela UI
  try {
    if (!window.__notifUIBound) {
      window.__notifUIBound = true;
      // Mapear ações do controller
      window.markAllNotificationsAsRead = async () => { try { await ctlMarkAll(); } catch {} };
      window.deleteAllReadNotifications = async () => { try { await ctlDeleteAll(); } catch {} };
      window.archiveAllReadNotifications = async () => { try { await ctlArchiveAllRead(); } catch {} };
      window.markNotificationAsRead = async (id) => { try { await ctlMarkOne(id); } catch {} };
      window.__pinNotification = async (id, pinned) => { try { await ctlPinOne(id, pinned); } catch {} };
      window.__archiveNotification = async (id, archived) => { try { await ctlArchiveOne(id, archived); } catch {} };

      // Botões de teste: enviar notificação para dono/compartilhados
      const bindTestHandlers = async () => {
        const { sendTestNotificationToOwner, sendTestNotificationToShared } = await import('./NotificationService.js');
        window.__sendTestToOwner = async () => {
          try {
            const budgetId = window.appState?.currentBudget?.id || window.appState?.currentBudgetId;
            const senderUid = window.appState?.currentUser?.uid;
            if (!budgetId || !senderUid) { return; }
            await sendTestNotificationToOwner(budgetId, senderUid);
          } catch (e) { console.warn(e); }
        };
        window.__sendTestToShared = async () => {
          try {
            const budgetId = window.appState?.currentBudget?.id || window.appState?.currentBudgetId;
            const senderUid = window.appState?.currentUser?.uid;
            if (!budgetId || !senderUid) { return; }
            await sendTestNotificationToShared(budgetId, senderUid);
          } catch (e) { console.warn(e); }
        };
        
        // Teste do modal de notificação
        window.__testNotificationModal = () => {
          try {
            const modal = getNotificationModal();
            const testNotification = {
              id: 'test-modal-' + Date.now(),
              type: 'test_notification',
              message: 'Esta é uma notificação de teste para demonstrar o modal!',
              details: 'O modal aparece automaticamente quando novas notificações chegam.',
              read: false,
              createdAt: { toDate: () => new Date() }
            };
            modal.show(testNotification);
            console.log('[NotificationsPage] 📱 Modal de teste exibido');
          } catch (e) {
            console.error('[NotificationsPage] ❌ Erro ao testar modal:', e);
          }
        };
      };
      bindTestHandlers();
    }
  } catch {}

  try {
    const prefs = await loadUserNotificationPrefs();
    const budgets = Array.isArray(window.appState?.budgets)
      ? window.appState.budgets
      : (Array.isArray(window.appState?.orçamentos) ? window.appState.orçamentos : []);
    const container = document.getElementById('notif-budget-prefs');
    if (container && Array.isArray(budgets)) {
      const types = DEFAULT_TYPES;
      container.innerHTML = budgets
        .map((b) => {
          const byBudget = prefs.byBudget || {};
          const allow = byBudget[b.id]?.allow || {};
          const row = types
            .map((t) => {
              const checked = allow[t] !== false;
              const label = typeLabels[t];
              return `<label class=\"inline-flex items-center gap-1 text-xs mr-2\"><input type=\"checkbox\" ${
                checked ? 'checked' : ''
              } onchange=\"window.__toggleBudgetTypePref && window.__toggleBudgetTypePref('${b.id}','${t}', this.checked)\"/>${label}</label>`;
            })
            .join('');
          return `<div class=\"text-xs text-gray-700 dark:text-gray-300\"><div class=\"font-semibold mb-1\">${b.nome || b.name || 'Orçamento'}</div><div>${row}</div></div>`;
        })
        .join('');
    }
  } catch {}

  try {
    if (!window.__notifPeriodListenerBound) {
      window.__notifPeriodListenerBound = true;
      eventBus.on('period:changed', (p) =>
        window.queueMicrotask(() => {
          const hh = (window.location.hash || '').split('?')[0];
          if (hh === '#/notifications') {
            try {
              const y = p?.year || (window.getSelectedPeriod && window.getSelectedPeriod().year);
              const m = p?.month || (window.getSelectedPeriod && window.getSelectedPeriod().month);
              if (y && m) {
                const ym = `${y}-${String(m).padStart(2, '0')}`;
                const url = new URL(window.location.href);
                url.hash = `${hh}?ym=${ym}`;
                window.history.replaceState(null, '', url.toString());
              }
            } catch {}
            renderNotifications();
          }
        })
      );
    }
    if (!window.__notifUpdatesListenerBound) {
      window.__notifUpdatesListenerBound = true;
      eventBus.on('notifications:updated', () => {
        try {
          const hh = (window.location.hash || '').split('?')[0];
          if (hh === '#/notifications' && !isRendering) {
            console.log('[NotificationsPage] 📡 Evento notifications:updated recebido, renderizando...');
            renderNotifications();
          } else if (isRendering) {
            console.log('[NotificationsPage] ⏳ Ignorando evento notifications:updated - renderização em andamento');
          }
        } catch {}
      });
    }
    
    // Listener de modal de notificações já configurado no bootstrap.js
    // Removido para evitar duplicação
  } catch {}

  try {
    if (!window.__notifHotkeysBound) {
      window.__notifHotkeysBound = true;
      document.addEventListener('keydown', (e) => {
        try {
          const tag = (e.target && (e.target.tagName || '').toLowerCase()) || '';
          if (tag === 'input' || tag === 'textarea' || tag === 'select' || (e.target && e.target.isContentEditable)) {
            return;
          }
          const hh = (window.location.hash || '').split('?')[0];
          if (hh === '#/notifications') {
            if (e.key === 'u' || e.key === 'U') {
              e.preventDefault();
              if (typeof window.toggleUnreadOnly === 'function') {
                window.toggleUnreadOnly();
              }
            }
          }
        } catch {}
      });
    }
  } catch {}
  
  } finally {
    // Sempre resetar o flag de renderização
    isRendering = false;
    console.log('[NotificationsPage] ✅ Renderização finalizada');
  }
}

async function loadNotifications(skipEventEmit = false) {
  console.log('[NotificationsPage] 🔄 Iniciando carregamento de notificações...');
  
  try {
    const u = window.appState?.currentUser;
    console.log('[NotificationsPage] 👤 Usuário atual:', u?.uid ? 'Logado' : 'Não logado');
    
    if (u?.uid) {
      console.log('[NotificationsPage] 🔗 Iniciando listener de notificações...');
      await startNotificationsFor(u.uid);
      
      // Forçar atualização das notificações não lidas
      const notifications = window.appState?.notifications || [];
      const unreadCount = notifications.filter(n => !n.read && !n.archivedAt).length;
      
      console.log(`[NotificationsPage] ✅ Carregadas ${notifications.length} notificações, ${unreadCount} não lidas`);
      
      // Emitir evento para atualizar badges apenas se não for skipado
      if (!skipEventEmit) {
        try {
          eventBus.emit('notifications:updated', notifications);
          console.log('[NotificationsPage] 📡 Evento notifications:updated emitido');
        } catch (e) {
          console.warn('[NotificationsPage] ⚠️ Erro ao emitir evento:', e);
        }
      } else {
        console.log('[NotificationsPage] ⏭️ Pulando emissão de evento para evitar loop');
      }
    } else {
      console.warn('[NotificationsPage] ⚠️ Usuário não logado, não é possível carregar notificações');
    }
  } catch (error) {
    console.error('[NotificationsPage] ❌ Erro ao carregar notificações:', error);
  }
}

function markAllAsRead() {
  ctlMarkAll().catch(() => {});
}
function deleteAllReadNotifications() {
  ctlDeleteAll()
    .then(() => renderNotifications(true)) // Force render
    .catch(() => {});
}
function markNotificationAsRead(id) {
  ctlMarkOne(id)
    .then(() => renderNotifications(true)) // Force render
    .catch(() => {});
}
function pinNotification(id, pinned) {
  ctlPinOne(id, pinned)
    .then(() => renderNotifications(true)) // Force render
    .catch(() => {});
}
function archiveNotification(id, archived) {
  ctlArchiveOne(id, archived)
    .then(() => renderNotifications(true)) // Force render
    .catch(() => {});
}
function archiveAllRead() {
  ctlArchiveAllRead()
    .then(() => renderNotifications(true)) // Force render
    .catch(() => {});
}

// Função para forçar carregamento de notificações não lidas
export async function loadUnreadNotifications() {
  try {
    console.log('[NotificationsPage] Forçando carregamento de notificações não lidas...');
    
    // Carregar notificações
    await loadNotifications(true); // Skip event emit
    
    // Configurar filtro para mostrar apenas não lidas
    const filters = getNotifFilters();
    filters.unreadOnly = true;
    saveFiltersState();
    
    // Renderizar com foco nas não lidas
    await renderNotifications(true); // Force render
    
    console.log('[NotificationsPage] Notificações não lidas carregadas com sucesso');
  } catch (error) {
    console.error('[NotificationsPage] Erro ao carregar notificações não lidas:', error);
  }
}

export default async function () {
  return await renderNotifications();
}

if (!window.renderNotifications) {
  window.renderNotifications = renderNotifications;
}
if (!window.toggleNotificationTypeFilter) {
  window.toggleNotificationTypeFilter = toggleNotificationTypeFilter;
}
if (!window.setNotificationPeriod) {
  window.setNotificationPeriod = setNotificationPeriod;
}
if (!window.toggleUnreadOnly) {
  window.toggleUnreadOnly = toggleUnreadOnly;
}
if (!window.resetNotificationFilters) {
  window.resetNotificationFilters = resetNotificationFilters;
}
if (!window.runNotificationAutoClean) {
  window.runNotificationAutoClean = runNotificationAutoClean;
}
if (!window.markAllNotificationsAsRead) {
  window.markAllNotificationsAsRead = markAllAsRead;
}
if (!window.deleteAllReadNotifications) {
  window.deleteAllReadNotifications = deleteAllReadNotifications;
}
if (!window.markNotificationAsRead) {
  window.markNotificationAsRead = markNotificationAsRead;
}
if (!window.__pinNotification) {
  window.__pinNotification = pinNotification;
}
if (!window.__archiveNotification) {
  window.__archiveNotification = archiveNotification;
}
if (!window.archiveAllReadNotifications) {
  window.archiveAllReadNotifications = archiveAllRead;
}
if (!window.openNotificationTarget) {
  window.openNotificationTarget = openNotificationTarget;
}
if (!window.showConfirmationModal) {
  window.showConfirmationModal = showConfirmationModal;
}
if (!window.__toggleBudgetTypePref) {
  window.__toggleBudgetTypePref = function (budgetId, type /*, checked*/) { toggleBudgetTypePref(budgetId, type); };
}
if (!window.loadUnreadNotifications) {
  window.loadUnreadNotifications = loadUnreadNotifications;
}

// Função de teste para debug
window.testNotificationsPage = async function() {
  console.log('[NotificationsPage] 🧪 Iniciando teste...');
  
  // Verificar se o usuário está logado
  const user = window.appState?.currentUser;
  console.log('[NotificationsPage] 🧪 Usuário:', user?.uid ? 'Logado' : 'Não logado');
  
  // Verificar se há notificações
  const notifications = window.appState?.notifications || [];
  console.log('[NotificationsPage] 🧪 Notificações no estado:', notifications.length);
  
  // Verificar filtros
  const filters = getNotifFilters();
  console.log('[NotificationsPage] 🧪 Filtros atuais:', filters);
  
  // Verificar localStorage
  const stored = localStorage.getItem(FILTERS_STORAGE_KEY);
  console.log('[NotificationsPage] 🧪 localStorage:', stored);
  
  // Teste direto do Firebase
  try {
    console.log('[NotificationsPage] 🧪 Testando acesso direto ao Firebase...');
    const { listByRecipient } = await import('@data/repositories/notificationsRepo.js');
    const directNotifications = await listByRecipient(user?.uid);
    console.log('[NotificationsPage] 🧪 Notificações diretas do Firebase:', directNotifications.length);
    if (directNotifications.length > 0) {
      console.log('[NotificationsPage] 🧪 Primeira notificação:', directNotifications[0]);
    }
  } catch (error) {
    console.log('[NotificationsPage] 🧪 Erro ao acessar Firebase:', error);
  }
  
  // Tentar renderizar
  try {
    await renderNotifications(true); // Force render
    console.log('[NotificationsPage] 🧪 ✅ Renderização bem-sucedida');
  } catch (e) {
    console.error('[NotificationsPage] 🧪 ❌ Erro na renderização:', e);
  }
};

export { applyNotificationFilters as __applyNotificationFiltersForTest };
export { getNotifFilters as __getNotifFiltersForTest };
export { resetNotificationFilters as __resetNotificationFiltersForTest };
export { clearOldNotificationsWithToast as __clearOldNotificationsWithToastForTest };

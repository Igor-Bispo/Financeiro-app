// Utilitários globais para substituir funções do window
import { eventBus } from '@core/events/eventBus.js';

// Atualizar título da página
export function updatePageTitle(path) {
  try {
    const routeNames = {
      '/': 'Dashboard',
      '/dashboard': 'Dashboard',
      '/transactions': 'Transações',
      '/categories': 'Categorias',
      '/analytics': 'Análises',
      '/recorrentes': 'Recorrentes',
      '/notifications': 'Notificações',
      '/settings': 'Configurações'
    };
    const title = routeNames[path] || 'Dashboard';

    document.title = `Financeiro • ${title}`;
    const el = document.querySelector('.tab-title-highlight');
    if (el && !el.textContent.includes(title)) {
      const emoji = el.textContent.split(' ')[0];
      el.textContent = `${emoji} ${title}`;
    }
  } catch {
    // noop
  }
}

// Aplicar modo de compactação
export function applyCompactMode() {
  const isCompact = localStorage.getItem('compactMode') === 'true';
  const isMicro = localStorage.getItem('microMode') === 'true';
  const isNano = localStorage.getItem('nanoMode') === 'true';

  const appContainer = document.querySelector('.app-container');
  const body = document.body;

  // Remover todas as classes primeiro
  body.classList.remove('compact-mode', 'micro-mode', 'nano-mode');
  if (appContainer) {
    appContainer.classList.remove('compact-mode', 'micro-mode', 'nano-mode');
  }

  // Aplicar classes baseado no estado salvo
  if (isNano) {
    body.classList.add('compact-mode', 'micro-mode', 'nano-mode');
    if (appContainer) {
      appContainer.classList.add('compact-mode', 'micro-mode', 'nano-mode');
    }
  } else if (isMicro) {
    body.classList.add('compact-mode', 'micro-mode');
    if (appContainer) {
      appContainer.classList.add('compact-mode', 'micro-mode');
    }
  } else if (isCompact) {
    body.classList.add('compact-mode');
    if (appContainer) {
      appContainer.classList.add('compact-mode');
    }
  }
}

// Sistema de notificações
export function showNotification(message, type = 'info', duration = 3000) {
  eventBus.emit('notification:show', { message, type, duration });
}

// Sistema de modais
export function showModal(content, options = {}) {
  eventBus.emit('modal:show', { content, options });
}

export function hideModal() {
  eventBus.emit('modal:hide');
}

// Sistema de snackbar
export function showSnackbar(message, type = 'info') {
  eventBus.emit('snackbar:show', { message, type });
}

// Utilitários de formatação
export function formatCurrency(value) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value || 0);
}

export function formatDate(date) {
  if (!date) return '';
  const d = new Date(date);
  return d.toLocaleDateString('pt-BR');
}

export function formatDateTime(date) {
  if (!date) return '';
  const d = new Date(date);
  return d.toLocaleString('pt-BR');
}

// Utilitários de validação
export function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function isValidAmount(amount) {
  return !isNaN(amount) && parseFloat(amount) > 0;
}

// Utilitários de localStorage
export function getStorageItem(key, defaultValue = null) {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch {
    return defaultValue;
  }
}

export function setStorageItem(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('Erro ao salvar no localStorage:', error);
  }
}

// Debounce para otimização
export function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Throttle para otimização
export function throttle(func, limit) {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// Sistema de navegação
export function navigateTo(path) {
  if (window.location.hash !== `#${path}`) {
    window.location.hash = path;
  }
}

// Garantir rolagem para o topo em qualquer contexto
export function scrollToTop(forceAll = true) {
  try {
    const candidates = [];
    try {
      const main = document.getElementById('app-content');
      if (main) candidates.push(main);
      const tab = document.querySelector('.tab-content');
      if (tab) candidates.push(tab);
      const content = document.querySelector('.content-spacing');
      if (content) candidates.push(content);
    } catch {}

    // Reset candidates
    for (const el of candidates) {
      try {
        if (typeof el.scrollTo === 'function') el.scrollTo({ top: 0, left: 0, behavior: 'auto' });
        el.scrollTop = 0;
        el.scrollLeft = 0;
      } catch {}
    }

    // Also reset document/window to avoid inherited scroll positions
    if (forceAll && typeof document !== 'undefined') {
      try { document.documentElement.scrollTop = 0; } catch {}
      try { document.body.scrollTop = 0; } catch {}
    }
    if (forceAll && typeof window !== 'undefined' && typeof window.scrollTo === 'function') {
      try { window.scrollTo({ top: 0, left: 0, behavior: 'auto' }); } catch {}
    }
  } catch {}
}

// Sistema de estado global (substituindo window.appState)
export const globalState = {
  user: null,
  currentBudget: null,
  transactions: [],
  categories: [],
  recorrentes: [],
  selectedYear: new Date().getFullYear(),
  selectedMonth: new Date().getMonth() + 1,

  // Setters
  setUser(user) {
    this.user = user;
    eventBus.emit('user:changed', user);
  },

  setCurrentBudget(budget) {
    this.currentBudget = budget;
    eventBus.emit('budget:changed', budget);
  },

  setTransactions(transactions) {
    this.transactions = transactions;
    eventBus.emit('transactions:changed', transactions);
  },

  setCategories(categories) {
    this.categories = categories;
    eventBus.emit('categories:changed', categories);
  },

  setRecorrentes(recorrentes) {
    this.recorrentes = recorrentes;
    eventBus.emit('recorrentes:changed', recorrentes);
  },

  setSelectedPeriod(year, month) {
    this.selectedYear = year;
    this.selectedMonth = month;
    eventBus.emit('period:changed', { year, month });
  }
};

// Funções de compatibilidade para substituir window.*
export function getSelectedPeriod() {
  try {
    if (typeof window !== 'undefined' && window.appState && window.appState.selectedYear && window.appState.selectedMonth) {
      return { year: window.appState.selectedYear, month: window.appState.selectedMonth };
    }
  } catch {}
  // Fallback: localStorage persisted ym
  try {
    const saved = (typeof localStorage !== 'undefined') ? localStorage.getItem('selectedYM') : null;
    if (saved) {
      const m = String(saved).match(/^(\d{4})-(\d{2})$/);
      if (m) {
        const y = parseInt(m[1], 10);
        const mo = parseInt(m[2], 10);
        if (y > 1900 && mo >= 1 && mo <= 12) return { year: y, month: mo };
      }
    }
  } catch {}
  // Fallback: internal globalState (defaults to now)
  return {
    year: globalState.selectedYear,
    month: globalState.selectedMonth
  };
}

export function setSelectedPeriod(year, month) {
  try {
    if (typeof window !== 'undefined') {
      window.appState = window.appState || globalState;
      window.appState.selectedYear = year;
      window.appState.selectedMonth = month;
      try { localStorage.setItem('selectedYM', `${year}-${String(month).padStart(2, '0')}`); } catch {}
      // Sincronizar ?ym=YYYY-MM no hash atual (idempotente)
      try {
        const raw = window.location.hash || '';
        const base = raw.split('?')[0] || '#/dashboard';
        const ym = `${year}-${String(month).padStart(2, '0')}`;
        const hasYm = /[?&]ym=\d{4}-\d{2}/.test(raw);
        const currentYm = hasYm ? (raw.match(/ym=(\d{4}-\d{2})/) || [])[1] : null;
        if (!hasYm || currentYm !== ym) {
          const newHash = `${base}?ym=${ym}`;
          // Em testes (jsdom) usar hash direto para evitar SecurityError do replaceState
          const isTestEnv = typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.includes('jsdom');
          if (isTestEnv) {
            window.location.hash = newHash;
          } else {
            const url = new URL(window.location.href);
            url.hash = newHash;
            if (window.history && window.history.replaceState) {
              window.history.replaceState(null, '', url.toString());
            } else {
              window.location.hash = newHash;
            }
          }
        }
      } catch {}
    }
  } catch {}
  globalState.setSelectedPeriod(year, month);
}

// Helpers de sincronização de período <-> hash
export function parseYmFromHash() {
  try {
    const raw = (typeof window !== 'undefined') ? (window.location.hash || '') : '';
    const m = raw.match(/ym=(\d{4})-(\d{2})/);
    if (m) {
      const y = parseInt(m[1], 10);
      const mo = parseInt(m[2], 10);
      if (y > 1900 && mo >= 1 && mo <= 12) {
        return { year: y, month: mo };
      }
    }
  } catch {}
  return null;
}

export function ensureHashHasYm(year, month) {
  try {
    const raw = window.location.hash || '';
    const base = raw.split('?')[0] || '#/dashboard';
    const ym = `${year}-${String(month).padStart(2, '0')}`;
    const m = raw.match(/ym=(\d{4}-\d{2})/);
    if (!m || m[1] !== ym) {
      const newHash = `${base}?ym=${ym}`;
      const isTestEnv = typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.includes('jsdom');
      if (isTestEnv) {
        window.location.hash = newHash;
      } else {
        const url = new URL(window.location.href);
        url.hash = newHash;
        if (window.history && window.history.replaceState) {
          window.history.replaceState(null, '', url.toString());
        } else {
          window.location.hash = newHash;
        }
      }
    }
  } catch {}
}

// Sistema de funções globais (substituindo window.*)
export const globalFunctions = {
  showAddTransactionModal: async (data) => {
    try {
      // Usar o shim para carregar o modal
      const { showTransactionModal } = await import('@js/TransactionModalShim.js');
      const success = await showTransactionModal(data || {});

      if (success) {
        return;
      }

      // Fallback: emitir evento de modal com tipo
      eventBus.emit('modal:show', { type: 'transaction', data, title: 'Nova Transação' });
    } catch (e) {
      console.warn('Falha ao abrir modal de transação via shim:', e);
      eventBus.emit('modal:show', { type: 'transaction', data, title: 'Nova Transação' });
    }
  },

  // showAddCategoryModal será definido dinamicamente quando necessário

  showAddRecorrenteModal: (data) => {
    console.log('🎯 [GLOBALUTILS] Solicitação de modal de recorrente...');
    
    eventBus.emit('modal:show', {
      type: 'recorrente',
      data,
      title: 'Nova Recorrente'
    });
  },

  closeModal: () => {
    try {
      // Remover o overlay padrão
      const overlay = document.getElementById('app-modal') || document.querySelector('#app-modal, .modal');
      if (overlay && overlay.parentNode) {
        overlay.parentNode.removeChild(overlay);
      }
      // Restaurar FAB se aplicável
      if (window.toggleFABOnModal) {
        try { window.toggleFABOnModal(); } catch {}
      }
    } catch {}
    // Emitir evento para logging/telemetria
    try { eventBus.emit('modal:hide'); } catch {}
  }
};

// Expor funções globais para compatibilidade
if (typeof window !== 'undefined') {
  // Substituir funções do window por versões modernas
  window.getSelectedPeriod = getSelectedPeriod;
  window.setSelectedPeriod = setSelectedPeriod;

  // Definir showAddTransactionModal globalmente usando o shim
  window.showAddTransactionModal = async (data) => {
    try {
      // Usar o shim para carregar o modal
      const { showTransactionModal } = await import('@js/TransactionModalShim.js');
      const success = await showTransactionModal(data || {});

      if (success) {
        return;
      }

      // Fallback: emitir evento de modal com tipo
      eventBus.emit('modal:show', { type: 'transaction', data, title: 'Nova Transação' });
    } catch (e) {
      console.warn('Falha ao abrir modal de transação:', e);
      eventBus.emit('modal:show', { type: 'transaction', data, title: 'Nova Transação' });
    }
  };

  // window.showAddCategoryModal será definido dinamicamente quando necessário
  
  // 🚨 CORREÇÃO: NÃO SOBRESCREVER SE A FUNÇÃO JÁ EXISTIR (nossa função é melhor)
  if (typeof window.showAddRecorrenteModal !== 'function') {
    console.log('⚠️ [GlobalUtils] showAddRecorrenteModal não existe, definindo fallback...');
    window.showAddRecorrenteModal = globalFunctions.showAddRecorrenteModal;
  } else {
    console.log('✅ [GlobalUtils] showAddRecorrenteModal já existe, mantendo função existente!');
  }
  
  window.closeModal = globalFunctions.closeModal;

  // Expor estado global para compatibilidade
  window.appState = globalState;
}

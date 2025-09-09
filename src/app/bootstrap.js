import { eventBus } from '@core/events/eventBus.js';
import { logger } from '@core/logger/logger.js';
import { setupEventListeners, cleanupEventListeners } from '@core/events/eventConfig.js';
import * as authService from '@features/auth/service.js';
import * as budgetsService from '@features/budgets/service.js';
import * as transactionsService from '@features/transactions/service.js';
import * as categoriesService from '@features/categories/service.js';
import { navigateTo } from '@core/utils/globalUtils.js';
import { registerServiceWorker, listenForControllerChange } from '@core/pwa/swUpdates.js';

// Estado global da aplicaÃ§Ã£o (temporÃ¡rio durante transiÃ§Ã£o)
export const appState = {
  user: null,
  currentBudget: null,
  transactions: [],
  categories: [],
  recorrentes: [],
  loading: false,
  error: null
};

// Inicializar serviÃ§os e listeners
export async function initializeApp() {
  try {
    logger.info('Inicializando aplicaÃ§Ã£o...');

    // Registrar SW update flow cedo (nÃ£o bloqueia restante)
    try {
      registerServiceWorker({
        onNewVersion: ({ skipWaiting }) => {
          try {
            const promptFn = () => skipWaiting();
            if (typeof window.Snackbar === 'function') {
              window.Snackbar({
                message: 'Nova versÃ£o disponÃ­vel. Toque para atualizar.',
                type: 'info',
                action: { label: 'Atualizar', handler: promptFn },
                duration: 10000
              });
            } else if (confirm('Nova versÃ£o disponÃ­vel. Atualizar agora?')) {
              promptFn();
            }
          } catch {}
        }
      });
      listenForControllerChange();
    } catch (e) { logger.warn('Falha ao iniciar fluxo de SW update:', e); }


    // Aguardar autenticaÃ§Ã£o
    const user = await authService.waitForAuth();
    if (!user) {
      // Em dev, permitir navegaÃ§Ã£o bÃ¡sica mesmo sem autenticaÃ§Ã£o
      logger.warn('UsuÃ¡rio nÃ£o autenticado â€” seguindo com modo limitado');
    }

    appState.user = user;
    // Espelhar no estado global legado para compatibilidade com mÃ³dulos antigos
    try {
      if (typeof window !== 'undefined') {
        window.appState = window.appState || {};
        window.appState.currentUser = user || null;
      }
    } catch {}
    if (user) {
      logger.info('UsuÃ¡rio autenticado:', user.uid);
    } else {
      logger.info('Sem usuÃ¡rio autenticado');
    }

    // Carregar dados iniciais apenas se autenticado
    if (user) {
      try {
        await loadInitialData(user.uid);
      } catch (e) {
        logger.warn('Falha ao carregar dados iniciais (possÃ­vel permission-denied):', e?.message || e);
        try { if (window?.Snackbar) window.Snackbar({ message: 'Sem permissÃ£o para ler dados. Verifique acesso ao orÃ§amento.', type: 'warning' }); } catch {}
      }
      // Iniciar listeners em tempo real
      try {
        startRealtimeListeners(user.uid);
      } catch (e) {
        logger.warn('Falha ao iniciar listeners (possÃ­vel permission-denied):', e?.message || e);
      }
    }

    // Configurar eventos globais
    setupEventListeners();
    setupGlobalEvents();

    logger.info('AplicaÃ§Ã£o inicializada com sucesso');
    eventBus.emit('app:ready', appState);

  } catch (error) {
    logger.error('Erro ao inicializar aplicaÃ§Ã£o:', error);
    appState.error = error.message;
    eventBus.emit('app:error', error);
  }
}

// Carregar dados iniciais
async function loadInitialData(userId) {
  try {
    // Carregar orÃ§amentos do usuÃ¡rio
    const budgets = await budgetsService.loadUserBudgets(userId);
    if (budgets.length > 0) {
      let chosen = budgets[0];
      try {
        const lastId = localStorage.getItem('currentBudgetId');
        if (lastId) {
          const found = budgets.find(b => b.id === lastId);
          if (found) chosen = found;
        }
      } catch {}
      appState.currentBudget = chosen;
      try {
        if (typeof window !== 'undefined') {
          window.appState = window.appState || {};
          window.appState.currentBudget = chosen;
        }
      } catch {}
      budgetsService.setCurrentBudget(chosen);

      // Carregar transaÃ§Ãµes e categorias do orÃ§amento atual
      const [transactions, categories] = await Promise.all([
        transactionsService.loadTransactions(chosen.id, userId),
        categoriesService.loadCategories(chosen.id)
      ]);

      appState.transactions = transactions;
      appState.categories = categories;

      // Notificar UI inicial
      try { eventBus.emit('transactions:updated', { budgetId: chosen.id, transactions }); } catch {}
      try { eventBus.emit('categories:updated', { budgetId: chosen.id, categories }); } catch {}
    }

    logger.info('Dados iniciais carregados');

  } catch (error) {
    logger.error('Erro ao carregar dados iniciais:', error);
    throw error;
  }
}

// Iniciar listeners em tempo real
function startRealtimeListeners(userId) {
  if (appState.currentBudget) {
    const budgetId = appState.currentBudget.id;

    // Iniciar listeners para dados em tempo real
  try { budgetsService.startBudgetsListener(userId); } catch (e) { logger.warn('Listener budgets falhou:', e?.message || e); }
  try { transactionsService.startTransactionsListener(budgetId, userId); } catch (e) { logger.warn('Listener transactions falhou:', e?.message || e); }
  try { categoriesService.startCategoriesListener(budgetId); } catch (e) { logger.warn('Listener categories falhou:', e?.message || e); }

    logger.info('Listeners em tempo real iniciados');
  }
}

// Ativar dados e listeners apÃ³s login (quando a app iniciou sem usuÃ¡rio)
export async function activateRealtimeAfterLogin(user) {
  try {
    if (!user) return;
    appState.user = user;
    try {
      if (typeof window !== 'undefined') {
        window.appState = window.appState || {};
        window.appState.currentUser = user;
      }
    } catch {}

    // Garantir orÃ§amento atual
    if (!appState.currentBudget) {
      try {
        const defaultBudget = await budgetsService.selectDefaultBudget(user.uid);
        if (defaultBudget) {
          appState.currentBudget = defaultBudget;
          try {
            if (typeof window !== 'undefined') {
              window.appState = window.appState || {};
              window.appState.currentBudget = defaultBudget;
            }
          } catch {}
        }
      } catch (e) {
        logger.warn('Falha ao selecionar orÃ§amento padrÃ£o pÃ³s-login:', e?.message || e);
      }
    }

    const budgetId = appState.currentBudget?.id;
    if (budgetId) {
      try {
        if (typeof window !== 'undefined') {
          window.appState = window.appState || {};
          window.appState.currentBudget = appState.currentBudget;
        }
      } catch {}
      // Carregar dados atuais
      const [transactions, categories] = await Promise.all([
        transactionsService.loadTransactions(budgetId, user.uid),
        categoriesService.loadCategories(budgetId)
      ]);

      appState.transactions = transactions;
      appState.categories = categories;

      // Notificar UI imediatamente
      try { eventBus.emit('transactions:updated', { budgetId, transactions }); } catch {}
      try { eventBus.emit('categories:updated', { budgetId, categories }); } catch {}

      // Iniciar listeners em tempo real
      startRealtimeListeners(user.uid);
    }

    // Sinalizar app pronta com usuÃ¡rio autenticado
    try { eventBus.emit('app:ready', appState); } catch {}
    logger.info('Realtime ativado apÃ³s login');
  } catch (error) {
    logger.error('Erro ao ativar realtime pÃ³s-login:', error);
  }
}

// Configurar eventos globais
function setupGlobalEvents() {
  // Eventos de mudanÃ§a de orÃ§amento
  eventBus.on('budget:changed', (budget) => {
    appState.currentBudget = budget;
    try {
      if (typeof window !== 'undefined') {
        window.appState = window.appState || {};
        window.appState.currentBudget = budget || null;
      }
    } catch {}
    logger.info('OrÃ§amento alterado:', budget?.id);
    try {
      if (budget?.id) {
        // Parar listeners anteriores
        try { transactionsService.stopAllListeners(); } catch {}
        try { categoriesService.stopAllListeners(); } catch {}
        // Limpar dados visuais para evitar "vazamento" do orÃ§amento anterior
        appState.transactions = [];
        appState.categories = [];
        try {
          if (typeof window !== 'undefined') {
            window.appState.transactions = [];
            window.appState.categories = [];
          }
        } catch {}
        // Carregar dados do novo orÃ§amento imediatamente
        const userId = appState.user?.uid;
        Promise.all([
          transactionsService.loadTransactions(budget.id, userId),
          categoriesService.loadCategories(budget.id)
        ])
          .then(async ([transactions, categories]) => {
            appState.transactions = transactions;
            appState.categories = categories;
            try { eventBus.emit('transactions:updated', { budgetId: budget.id, transactions }); } catch {}
            try { eventBus.emit('categories:updated', { budgetId: budget.id, categories }); } catch {}
            // Iniciar listeners para o novo orÃ§amento
            try { transactionsService.startTransactionsListener(budget.id, userId); } catch {}
            try { categoriesService.startCategoriesListener(budget.id); } catch {}
            // Navegar para o Dashboard jÃ¡ com dados atualizados
            try {
              navigateTo('/dashboard');
            } catch {
              try { window.location.hash = '#/dashboard'; } catch {}
            }
            try { const { scrollToTop } = await import('@core/utils/globalUtils.js'); scrollToTop(); } catch {}
            // Fallback extra: se router nÃ£o re-renderizar, tentar renderDashboard direto
            try {
              if (typeof window.renderDashboard === 'function') {
                window.renderDashboard();
              }
            } catch {}
          })
          .catch(err => logger.warn('Falha ao recarregar dados no budget:changed:', err));

        // Rodar correÃ§Ã£o automÃ¡tica silenciosa (uma vez por mÃªs)
        runAutoLegacyFixForBudget(budget.id);
      }
    } catch {}
  });

  // Eventos de transaÃ§Ãµes (robusto a payload indefinido)
  eventBus.on('transactions:updated', (payload = {}) => {
    try {
      const budgetId = payload.budgetId ?? appState.currentBudget?.id;
      const transactions = payload.transactions ?? appState.transactions;
      if (budgetId && appState.currentBudget?.id === budgetId && Array.isArray(transactions)) {
        appState.transactions = transactions;
      }
    } catch (e) {
      logger.warn('transactions:updated handler skipped:', e);
    }
  });

  // Eventos de categorias (robusto a payload indefinido)
  eventBus.on('categories:updated', (payload = {}) => {
    try {
      const budgetId = payload.budgetId ?? appState.currentBudget?.id;
      const categories = payload.categories ?? appState.categories;
      if (budgetId && appState.currentBudget?.id === budgetId && Array.isArray(categories)) {
        appState.categories = categories;
      }
    } catch (e) {
      logger.warn('categories:updated handler skipped:', e);
    }
  });

  // Eventos de erro
  eventBus.on('error:transaction', (error) => {
    logger.error('Erro em transaÃ§Ã£o:', error);
  });

  eventBus.on('error:budget', (error) => {
    logger.error('Erro em orÃ§amento:', error);
  });

  eventBus.on('error:category', (error) => {
    logger.error('Erro em categoria:', error);
  });
}

// Executa correÃ§Ã£o de dados legados uma vez por orÃ§amento e mÃªs
async function runAutoLegacyFixForBudget(budgetId) {
  try {
    const userId = appState?.user?.uid || appState?.currentUser?.uid;
    if (!userId || !budgetId) return;
    const now = new Date();
    const ym = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
    const key = `legacyfix:${userId}:${budgetId}:${ym}`;
    if (localStorage.getItem(key) === 'done') return;

    // Importar e executar fixers compartilhados de forma silenciosa
    try {
      const fixers = await import('@core/legacy/fixers.js');
      await fixers.corrigirTudoSemBudget({ silent: true });
    } catch (e) {
      console.warn('AutoFix: falha ao importar/rodar fixers:', e);
    }

    localStorage.setItem(key, 'done');
  } catch (e) {
    console.warn('runAutoLegacyFixForBudget erro:', e);
  }
}

// Limpar recursos ao sair
export function cleanup() {
  logger.info('Limpando recursos da aplicaÃ§Ã£o...');

  // Parar todos os listeners
  budgetsService.stopAllListeners();
  transactionsService.stopAllListeners();
  categoriesService.stopAllListeners();

  // Limpar eventos
  eventBus.off('budget:changed');
  eventBus.off('transactions:updated');
  eventBus.off('categories:updated');
  eventBus.off('error:transaction');
  eventBus.off('error:budget');
  eventBus.off('error:category');

  // Limpar configuraÃ§Ã£o de eventos
  cleanupEventListeners();

  logger.info('Recursos limpos');
}

// Expor appState globalmente (temporÃ¡rio durante transiÃ§Ã£o)
if (typeof window !== 'undefined') {
  window.appState = appState;
}

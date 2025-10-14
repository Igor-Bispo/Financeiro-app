// Importa e registra as funções globais de carregamento de dados para orçamentos
import './globalLoaders.js';
// Importa e força carregamento da função de modal de transação
import showAddTransactionModal from '@js/showAddTransactionModal.js';
// Importa o Snackbar para disponibilizar globalmente
import { Snackbar as _Snackbar } from '@js/ui/Snackbar.js';
// Importa o sistema simplificado de configuração do Snackbar
import '@js/config/simple-snackbar-config.js';
// Importa as funções de debug de notificações para disponibilizar globalmente
import '@features/notifications/debug-notifications.js';
// Importa o sistema de catch-up de notificações
import { initCatchUpNotifications } from '@features/notifications/CatchUpNotifications.js';
// Importa o authReady do Firebase
import { authReady } from '@data/firebase/client.js';
// Importa o EventBus para configuração do listener
import { eventBus } from '@core/events/eventBus.js';
// Importa o gerenciador de cache
import { checkAndClearCache, checkServiceWorker as _checkServiceWorker } from '../utils/cacheManager.js';
// Importa o sistema de permissões para APK
import '@js/permissions/PermissionManager.js';
console.log('🚀 bootstrap.js carregado e executando!');

// Garantir que showAddTransactionModal e Snackbar estejam disponíveis globalmente
if (typeof window !== 'undefined') {
  window.showAddTransactionModal = showAddTransactionModal;
  window.Snackbar = _Snackbar; // Expor Snackbar globalmente para evitar minificação
  console.log('🔧 [Bootstrap] showAddTransactionModal forçada globalmente:', typeof window.showAddTransactionModal);
  console.log('🔧 [Bootstrap] Snackbar forçada globalmente:', typeof window.Snackbar);
}

// Verificar e limpar cache se necessário (primeira coisa a fazer)
if (typeof window !== 'undefined') {
  checkAndClearCache().then(() => {
    console.log('✅ [Bootstrap] Verificação de cache concluída');
  }).catch(error => {
    console.error('❌ [Bootstrap] Erro na verificação de cache:', error);
  });
}

// Expor EventBus globalmente
if (typeof window !== 'undefined') {
  window.eventBus = eventBus;
  console.log('🌐 [Bootstrap] EventBus exposto globalmente');
}

// Configurar listener do modal de notificações globalmente
if (typeof window !== 'undefined' && window.eventBus && typeof window.eventBus.on === 'function') {
  if (!window.__notificationModalListenerBound) {
    window.__notificationModalListenerBound = true;
    console.log('🎧 [Bootstrap] Configurando listener global para notification:show-modal...');

    window.eventBus.on('notification:show-modal', async (notification) => {
      try {
        console.log('📱 [Bootstrap] Evento notification:show-modal recebido:', notification.type);
        console.log('📱 [Bootstrap] Dados da notificação:', notification);
        console.log('📱 [Bootstrap] 🔧 DEBUG: EventBus listener funcionando!');

        // Importar dinamicamente o modal
        console.log('📱 [Bootstrap] 🔧 DEBUG: Importando NotificationModal...');
        const { getNotificationModal } = await import('@features/notifications/ui/NotificationModal.js');
        console.log('📱 [Bootstrap] 🔧 DEBUG: NotificationModal importado:', !!getNotificationModal);

        const modal = getNotificationModal();
        console.log('📱 [Bootstrap] Modal obtido:', !!modal);

        if (modal) {
          console.log('📱 [Bootstrap] 🔧 DEBUG: Chamando modal.show()...');
          modal.show(notification);
          console.log('✅ [Bootstrap] Modal exibido com sucesso');
        } else {
          console.error('❌ [Bootstrap] Modal não foi obtido');
        }
      } catch (e) {
        console.error('❌ [Bootstrap] Erro ao mostrar modal de notificação:', e);
        console.error('❌ [Bootstrap] Stack trace:', e.stack);
      }
    });

    console.log('✅ [Bootstrap] Listener notification:show-modal configurado globalmente');
  }
}
// Listener global único para garantir atualização da tela de transações e categorias
if (typeof window !== 'undefined' && window.eventBus && typeof window.eventBus.on === 'function') {
  console.log('🟢 Registrando listener global para transactions:updated e categories:updated');
  window.eventBus.on('transactions:updated', (payload = {}) => {
    console.log('🟢 Listener global recebeu transactions:updated', payload);
    if (Array.isArray(payload.transactions)) {
      window.appState = window.appState || {};
      window.appState.transactions = payload.transactions;
    }
    const hh = (window.location.hash || '').split('?')[0];
    if (hh === '#/transactions' && typeof window.renderTransactions === 'function') {
      try { window.renderTransactions(); } catch (e) { console.warn('Falha ao renderizar transações após atualização global', e); }
    }
  });
  window.eventBus.on('categories:updated', (payload = {}) => {
    console.log('🟢 Listener global recebeu categories:updated', payload);
    if (Array.isArray(payload.categories)) {
      window.appState = window.appState || {};
      window.appState.categories = payload.categories;
    }
    // Remover renderização automática de categorias - deixar apenas para o sistema de rotas
  });
}

// Canal para sincronização entre abas
const syncChannel = (typeof window !== 'undefined' && 'BroadcastChannel' in window) ? new window.BroadcastChannel('financeiro-sync') : null;

// Função para disparar evento de sincronização
function triggerSyncUpdate(type, payload, isRemote = false) {
  // Se veio do canal, não sincroniza novamente
  if (isRemote) {
    handleSyncUpdate({ type, payload });
    return;
  }
  // Atualiza localmente
  handleSyncUpdate({ type, payload });
  // Envia para outras abas
  if (syncChannel) {
    syncChannel.postMessage({ type, payload });
  } else {
    // Fallback para localStorage (caso BroadcastChannel não exista)
    try {
      localStorage.setItem('financeiro-sync-event', JSON.stringify({ type, payload, ts: Date.now() }));
      setTimeout(() => localStorage.removeItem('financeiro-sync-event'), 100);
    } catch {}
  }
}

// Handler para eventos recebidos
function handleSyncUpdate({ type, payload }) {
  if (type === 'transactions:updated') {
    eventBus.emit('transactions:updated', { ...payload, __syncRemote: true });
  }
  if (type === 'categories:updated') {
    eventBus.emit('categories:updated', { ...payload, __syncRemote: true });
  }
  // Adicione outros tipos conforme necessário
}

// Listener para eventos de sincronização
if (syncChannel) {
  syncChannel.onmessage = (ev) => {
    if (ev?.data) triggerSyncUpdate(ev.data.type, ev.data.payload, true);
  };
} else {
  window.addEventListener('storage', (ev) => {
    if (ev.key === 'financeiro-sync-event' && ev.newValue) {
      try {
        const data = JSON.parse(ev.newValue);
        triggerSyncUpdate(data.type, data.payload, true);
      } catch {}
    }
  });
}
import { logger } from '@core/logger/logger.js';
import { setupEventListeners, cleanupEventListeners } from '@core/events/eventConfig.js';
import * as authService from '@features/auth/service.js';
import * as budgetsService from '@features/budgets/service.js';
import * as transactionsService from '@features/transactions/service.js';
import * as categoriesService from '@features/categories/service.js';
import { startNotificationsFor } from '@features/notifications/notificationsController.js';
import { navigateTo } from '@core/utils/globalUtils.js';
import { registerServiceWorker, listenForControllerChange } from '@core/pwa/swUpdates.js';
import { checkForUpdates, clearAppCaches, performHardRefresh } from '@js/config/pwa.js';

// Estado global da aplicação (temporário durante transição)
export const appState = {
  user: null,
  currentBudget: null,
  transactions: [],
  categories: [],
  recorrentes: [],
  loading: false,
  error: null
};

// Inicializar serviços e listeners
export async function initializeApp() {
  // 🛡️ INICIALIZAR SISTEMA DE RESILÊNCIA **PRIMEIRO** - ANTES DE TUDO
  console.log('🛡️🛡️🛡️ [Bootstrap] INICIANDO SISTEMA DE RESILÊNCIA PRIMEIRO!');
  
  try {
    // Importar e inicializar componentes de resilência IMEDIATAMENTE
    console.log('🛡️ [Bootstrap] Carregando NetworkHandler...');
    await import('../core/network/networkHandler.js'); // NetworkHandler inicializa automaticamente
    console.log('✅ [Bootstrap] NetworkHandler carregado');

    console.log('🛡️ [Bootstrap] Carregando NetworkPatch...');
    const { default: NetworkPatch } = await import('../core/network/networkPatch.js');
    NetworkPatch.initialize();
    console.log('✅ [Bootstrap] NetworkPatch inicializado');

    // Em produção, não inicializar ExtensionHandler para evitar interferir em chamadas Firebase (CORS)
    if (import.meta?.env?.DEV) {
      console.log('🛡️ [Bootstrap] Carregando ExtensionHandler (DEV)...');
    const { default: ExtensionHandler } = await import('../core/security/extensionHandler.js');
    ExtensionHandler.initialize();
      console.log('✅ [Bootstrap] ExtensionHandler inicializado (DEV)');
    } else {
      console.log('🛡️ [Bootstrap] ExtensionHandler desativado em PROD');
    }

    console.log('🛡️ [Bootstrap] Sistema de resilência ATIVO - prosseguindo com app...');
  } catch (error) {
    console.error('❌ [Bootstrap] ERRO CRÍTICO ao inicializar resilência:', error);
    // Continuar mesmo com erro - não bloquear app
  }

  try {
    // Disponibilizar funções PWA globalmente
    window.checkForUpdates = checkForUpdates;
    window.clearAppCaches = clearAppCaches;
    window.performHardRefresh = performHardRefresh;

    // Registrar SW update flow cedo (não bloqueia restante)
    // DESABILITAR Service Worker em ambiente APK para evitar cache de versões antigas
    const isAPK = window.Capacitor && window.Capacitor.isNativePlatform && window.Capacitor.isNativePlatform();
    
    if (!isAPK) {
      // Apenas registrar SW em ambiente web
      try {
        console.log('🌐 [Bootstrap] Ambiente WEB - registrando Service Worker...');
        registerServiceWorker({
          onNewVersion: ({ skipWaiting }) => {
            try {
              const promptFn = () => skipWaiting();
              if (typeof window.Snackbar === 'function') {
                window.Snackbar({
                  message: 'Nova versão disponível. Toque para atualizar.',
                  type: 'info',
                  action: { label: 'Atualizar', handler: promptFn },
                  duration: 10000
                });
              } else if (confirm('Nova versão disponível. Atualizar agora?')) {
                promptFn();
              }
            } catch {}
          }
        });
        listenForControllerChange();
      } catch (e) { logger.warn('Falha ao iniciar fluxo de SW update:', e); }
    } else {
      // APK: Desabilitar SW e limpar cache existente
      console.log('📱 [Bootstrap] Ambiente APK - DESABILITANDO Service Worker...');
      
      try {
        // Desregistrar todos os Service Workers
        if ('serviceWorker' in navigator) {
          navigator.serviceWorker.getRegistrations().then(registrations => {
            registrations.forEach(registration => {
              console.log('🗑️ [Bootstrap] Desregistrando Service Worker:', registration.scope);
              registration.unregister();
            });
          });
        }
        
        // Limpar todos os caches
        if ('caches' in window) {
          caches.keys().then(cacheNames => {
            cacheNames.forEach(cacheName => {
              console.log('🗑️ [Bootstrap] Removendo cache:', cacheName);
              caches.delete(cacheName);
            });
          });
        }
        
        console.log('✅ [Bootstrap] Service Worker desabilitado e cache limpo no APK');
      } catch (e) {
        console.warn('⚠️ [Bootstrap] Erro ao desabilitar SW:', e);
      }
    }


    // Aguardar autenticação com timeout REDUZIDO para evitar loops
    let user = null;
    try {
      console.log('🔍 [Bootstrap] Iniciando verificação de autenticação...');
      const authPromise = authService.waitForAuth();
      const timeoutPromise = new Promise((resolve) => {
        setTimeout(() => {
          console.log('⏰ [Bootstrap] Timeout aguardando auth (2s) - continuando...');
          resolve(null);
        }, 2000); // Reduzido de 5s para 2s
      });

      user = await Promise.race([authPromise, timeoutPromise]);
      console.log('🔍 [Bootstrap] Resultado da auth:', user ? `usuário ${user.email}` : 'sem usuário');
    } catch (error) {
      logger.warn('❌ [Bootstrap] Erro ao aguardar autenticação:', error);
      user = null;
    }

    if (!user) {
      // Verificar se há usuário no estado global (fallback)
      if (window.appState && window.appState.currentUser) {
        user = window.appState.currentUser;
        logger.info('Usuário encontrado no estado global:', user.email);
      } else {
        logger.warn('Usuário não autenticado — seguindo com modo limitado');
      }
    }

    appState.user = user;
    // Espelhar no estado global legado para compatibilidade com módulos antigos
    try {
      if (typeof window !== 'undefined') {
        window.appState = window.appState || {};
        window.appState.currentUser = user || null;
      }
    } catch {}
    if (user) {
      logger.info('Usuário autenticado:', user.uid);
      // Garantir que o container do app esteja visível
      try {
        const appContainer = document.querySelector('.app-container');
        const loginPage = document.getElementById('login-page');
        const loadingPage = document.getElementById('loading-page');
        if (appContainer) appContainer.style.display = 'flex';
        if (loginPage) loginPage.style.display = 'none';
        if (loadingPage) loadingPage.style.display = 'none';
      } catch {}
      
      // 🔥 Inicializar clientes Firebase resilientes agora que temos usuário
      try {
        console.log('🛡️ [Bootstrap] Inicializando clientes Firebase resilientes...');
        const { default: ResilientFirebaseClient } = await import('../data/firebase/resilientClient.js');
        const { default: ResilientAuthService } = await import('../features/auth/ResilientAuthService.js');
        
        try {
          await ResilientFirebaseClient.initialize();
        } catch (e) {
          console.warn('⚠️ [Bootstrap] Falha ao inicializar ResilientFirebaseClient (modular):', e?.message || e);
        }
        try {
          const { auth } = await import('@data/firebase/client.js');
          await ResilientAuthService.initialize(auth);
          console.log('✅ [Bootstrap] Clientes Firebase resilientes inicializados (modular)');
        } catch (e) {
          console.warn('⚠️ [Bootstrap] Falha ao inicializar ResilientAuthService (modular):', e?.message || e);
        }
      } catch (error) {
        console.error('❌ [Bootstrap] Erro ao inicializar clientes Firebase resilientes:', error);
      }
    } else {
      logger.info('Sem usuário autenticado');
    }

    // Carregar dados iniciais apenas se autenticado
    if (user) {
      try {
        console.log('📊 [Bootstrap] Carregando dados iniciais...');
        // Timeout para carregar dados iniciais
        const loadDataPromise = loadInitialData(user.uid);
        const timeoutPromise = new Promise((_, reject) => {
          setTimeout(() => {
            reject(new Error('Timeout ao carregar dados iniciais'));
          }, 10000); // 10s timeout
        });
        
        await Promise.race([loadDataPromise, timeoutPromise]);
        console.log('✅ [Bootstrap] Dados iniciais carregados');
      } catch (e) {
        logger.warn('❌ [Bootstrap] Falha ao carregar dados iniciais:', e?.message || e);
        try { if (window?.Snackbar) window.Snackbar({ message: 'Falha ao carregar dados. Tentando continuar...', type: 'warning' }); } catch {}
      }
      // Iniciar listeners em tempo real
      try {
        console.log('🎧 [Bootstrap] Iniciando listeners de tempo real...');
        startRealtimeListeners(user.uid);
        console.log('✅ [Bootstrap] Listeners iniciados');
      } catch (e) {
        logger.warn('❌ [Bootstrap] Falha ao iniciar listeners:', e?.message || e);
      }
    }

    // Configurar eventos globais
    setupEventListeners();
    setupGlobalEvents();

    logger.info('Aplicação inicializada com sucesso');
    eventBus.emit('app:ready', appState);

  } catch (error) {
    logger.error('Erro ao inicializar aplicação:', error);
    appState.error = error.message;
    eventBus.emit('app:error', error);
  }
}

// Carregar dados iniciais
async function loadInitialData(userId) {
  try {
    // Carregar orçamentos do usuário
    const budgets = await budgetsService.loadUserBudgets(userId);
    if (budgets.length > 0) {
      let chosen = budgets[0]; // fallback para o primeiro

      // Tentar restaurar o orçamento salvo no localStorage
      try {
        const lastId = localStorage.getItem('currentBudgetId');
        if (lastId) {
          const found = budgets.find(b => b.id === lastId);
          if (found) {
            chosen = found;
            logger.info('Orçamento restaurado na inicialização:', chosen.nome);
          } else {
            logger.warn('Orçamento salvo não encontrado, usando primeiro disponível');
          }
        }
      } catch (e) {
        logger.warn('Erro ao restaurar orçamento do localStorage:', e);
      }

      appState.currentBudget = chosen;
      try {
        if (typeof window !== 'undefined') {
          window.appState = window.appState || {};
          window.appState.currentBudget = chosen;
        }
      } catch {}
      budgetsService.setCurrentBudget(chosen);

      // Carregar transações e categorias do orçamento atual
      const [transactions, categories] = await Promise.all([
        transactionsService.loadTransactions(chosen.id, userId),
        categoriesService.loadCategories(chosen.id)
      ]);

      appState.transactions = transactions;
      appState.categories = categories;

      // Notificar UI inicial e sincronizar abas
      try { triggerSyncUpdate('transactions:updated', { budgetId: chosen.id, transactions }); } catch {}
      try { triggerSyncUpdate('categories:updated', { budgetId: chosen.id, categories }); } catch {}
    }

    logger.info('Dados iniciais carregados');

  } catch (error) {
    logger.error('Erro ao carregar dados iniciais:', error);
    throw error;
  }
}

// Iniciar listeners em tempo real
async function startRealtimeListeners(userId) {
  if (appState.currentBudget) {
    const budgetId = appState.currentBudget.id;

    // Aguardar o Firebase estar pronto
    try {
      await authReady;
      logger.info('Firebase Auth pronto, iniciando listeners...');
    } catch (e) {
      logger.warn('Erro ao aguardar authReady:', e?.message || e);
    }

    // Iniciar listeners para dados em tempo real
    try { budgetsService.startBudgetsListener(userId); } catch (e) { logger.warn('Listener budgets falhou:', e?.message || e); }
    try { transactionsService.startTransactionsListener(budgetId, userId); } catch (e) { logger.warn('Listener transactions falhou:', e?.message || e); }
    try { categoriesService.startCategoriesListener(budgetId); } catch (e) { logger.warn('Listener categories falhou:', e?.message || e); }

    // Iniciar listener de notificações
    try {
      startNotificationsFor(userId);
      logger.info('Listener de notificações iniciado');
    } catch (e) {
      logger.warn('Listener notifications falhou:', e?.message || e);
    }

    // Inicializar sistema de catch-up de notificações
    try {
      await initCatchUpNotifications();
      logger.info('Sistema de catch-up de notificações iniciado');
    } catch (e) {
      logger.warn('Sistema de catch-up falhou:', e?.message || e);
    }

    logger.info('Listeners em tempo real iniciados');
  }
}

// Ativar dados e listeners após login (quando a app iniciou sem usuário)
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

    // Garantir orçamento atual - só se realmente não houver nenhum
    if (!appState.currentBudget) {
      try {
        // SEMPRE carregar a lista de orçamentos do Firestore primeiro
        console.log('🔍 [Bootstrap] Carregando orçamentos do Firestore...');
        const budgets = await budgetsService.loadUserBudgets(user.uid);
        console.log('📊 [Bootstrap] Orçamentos carregados:', budgets.length);
        
        if (budgets.length > 0) {
          // Tentar restaurar o orçamento salvo no localStorage
          const savedBudgetId = localStorage.getItem('currentBudgetId');
          let chosen = budgets[0]; // fallback para o primeiro
          
          if (savedBudgetId) {
            const found = budgets.find(b => b.id === savedBudgetId);
            if (found) {
              chosen = found;
              logger.info('Orçamento restaurado:', chosen.nome);
            } else {
              logger.warn('Orçamento salvo não encontrado, usando primeiro disponível');
            }
          }
          
          appState.currentBudget = chosen;
          try {
            if (typeof window !== 'undefined') {
              window.appState = window.appState || {};
              window.appState.currentBudget = chosen;
            }
          } catch {}
          budgetsService.setCurrentBudget(chosen);
          console.log('✅ [Bootstrap] Orçamento selecionado:', chosen.nome);
        }
      } catch (e) {
        logger.warn('Falha ao carregar orçamentos pós-login:', e?.message || e);
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

    // Iniciar listener de notificações mesmo sem orçamento
    try {
      startNotificationsFor(user.uid);
      logger.info('Listener de notificações iniciado após login');
    } catch (e) {
      logger.warn('Listener notifications falhou após login:', e?.message || e);
    }

    // Inicializar sistema de catch-up de notificações após login
    try {
      await initCatchUpNotifications();
      logger.info('Sistema de catch-up de notificações iniciado após login');
    } catch (e) {
      logger.warn('Sistema de catch-up falhou após login:', e?.message || e);
    }

    // app:ready já foi emitido na inicialização - não duplicar
    logger.info('Realtime ativado após login');
  } catch (error) {
    logger.error('Erro ao ativar realtime pós-login:', error);
  }
}

// Configurar eventos globais
function setupGlobalEvents() {
  // Eventos de mudança de orçamento
  eventBus.on('budget:changed', (budget) => {
    appState.currentBudget = budget;
    try {
      if (typeof window !== 'undefined') {
        window.appState = window.appState || {};
        window.appState.currentBudget = budget || null;
      }
    } catch {}
    logger.info('Orçamento alterado:', budget?.id);
    try {
      if (budget?.id) {
        // Parar listeners anteriores
        try { transactionsService.stopAllListeners(); } catch {}
        try { categoriesService.stopAllListeners(); } catch {}
        // Limpar dados visuais para evitar "vazamento" do orçamento anterior
        appState.transactions = [];
        appState.categories = [];
        try {
          if (typeof window !== 'undefined') {
            window.appState.transactions = [];
            window.appState.categories = [];
          }
        } catch {}
        // Carregar dados do novo orçamento imediatamente
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
            // Iniciar listeners para o novo orçamento
            try { transactionsService.startTransactionsListener(budget.id, userId); } catch {}
            try { categoriesService.startCategoriesListener(budget.id); } catch {}
            // Navegar para o Dashboard já com dados atualizados
            try {
              navigateTo('/dashboard');
            } catch {
              try { window.location.hash = '#/dashboard'; } catch {}
            }
            try { const { scrollToTop } = await import('@core/utils/globalUtils.js'); scrollToTop(); } catch {}
            // Fallback extra: se router não re-renderizar, tentar renderDashboard direto
            try {
              if (typeof window.renderDashboard === 'function') {
                window.renderDashboard();
              }
            } catch {}
          })
          .catch(err => logger.warn('Falha ao recarregar dados no budget:changed:', err));

        // Rodar correção automática silenciosa (uma vez por mês)
        runAutoLegacyFixForBudget(budget.id);
      }
    } catch {}
  });

  // Eventos de transações (robusto a payload indefinido)
  eventBus.on('transactions:updated', (payload = {}) => {
    try {
      const budgetId = payload.budgetId ?? appState.currentBudget?.id;
      const transactions = payload.transactions ?? appState.transactions;
      if (budgetId && appState.currentBudget?.id === budgetId && Array.isArray(transactions)) {
        appState.transactions = transactions;
      }
      // Só sincroniza se não veio do canal
      if (!payload.__syncRemote) {
        triggerSyncUpdate('transactions:updated', payload);
      }
    } catch (e) {
      logger.warn('transactions:updated handler skipped:', e);
    }
  });

  eventBus.on('categories:updated', (payload = {}) => {
    try {
      const budgetId = payload.budgetId ?? appState.currentBudget?.id;
      const categories = payload.categories ?? appState.categories;
      if (budgetId && appState.currentBudget?.id === budgetId && Array.isArray(categories)) {
        appState.categories = categories;
      }
      // Só sincroniza se não veio do canal
      if (!payload.__syncRemote) {
        triggerSyncUpdate('categories:updated', payload);
      }
    } catch (e) {
      logger.warn('categories:updated handler skipped:', e);
    }
  });

  // Eventos de erro
  eventBus.on('error:transaction', (error) => {
    logger.error('Erro em transação:', error);
  });

  eventBus.on('error:budget', (error) => {
    logger.error('Erro em orçamento:', error);
  });

  eventBus.on('error:category', (error) => {
    logger.error('Erro em categoria:', error);
  });
}

// Executa correção de dados legados uma vez por orçamento e mês
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
  logger.info('Limpando recursos da aplicação...');

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

  // Limpar configuração de eventos
  cleanupEventListeners();

  logger.info('Recursos limpos');
}

// Expor appState globalmente (temporário durante transição)
if (typeof window !== 'undefined') {
  window.appState = appState;
}

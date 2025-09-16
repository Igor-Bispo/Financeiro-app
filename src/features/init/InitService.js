// features/init/InitService.js
import { eventBus } from '@core/events/eventBus.js';

// Função para inicializar a aplicação
export async function initializeApp() {
  console.log('🚀 Inicializando aplicação...');

  try {
    // Verificar se a aplicação já foi inicializada
    if (window.appState?.isInitialized) {
      console.log('✅ Aplicação já inicializada');
      return;
    }

    // Carregar dados iniciais se o usuário estiver autenticado
    if (window.appState?.currentUser) {
      console.log('✅ Usuário já autenticado, configurando aplicação...');

      // Carregar dados iniciais
      await loadInitialData();

      // Auto-aplicar recorrentes no dia 1 do mês (sem forçar por padrão)
      try {
        const today = new Date();
        // Evitar reexecução no mesmo mês: usar uma flag simples em localStorage
        const monthKey = `${today.getFullYear()}-${String(today.getMonth()+1).padStart(2,'0')}`;
        const lastApplied = localStorage.getItem('recorrentes:lastAutoApplied');
        const isFirstOfMonth = today.getDate() === 1;
        if (isFirstOfMonth && lastApplied !== monthKey) {
          const userId = window.appState?.currentUser?.uid;
          const budgetId = window.appState?.currentBudget?.id;
          if (userId && budgetId) {
            const { aplicarRecorrentesDoMes, loadRecorrentes } = await import('@features/recorrentes/service.js');
            const res = await aplicarRecorrentesDoMes(userId, budgetId, true);
            // Atualizar datasets se houve mudanças (aplicadas podem ser 0 quando não forçado)
            if (typeof window.loadTransactions === 'function') {
              await window.loadTransactions();
            }
            await loadRecorrentes();
            try { eventBus.emit('transactions:updated'); } catch {}
            try { eventBus.emit('categories:updated'); } catch {}
            try { eventBus.emit('recorrentes:updated'); } catch {}
            localStorage.setItem('recorrentes:lastAutoApplied', monthKey);
            // Notificação leve
            if (res?.aplicadas > 0 && window.Snackbar) {
              window.Snackbar({ message: `Recorrentes do mês aplicadas automaticamente (${res.aplicadas}).`, type: 'info' });
            }
          }
        }
      } catch (e) {
        console.warn('Falha ao auto-aplicar recorrentes:', e);
      }

      // Configurar event listeners
      setupEventListeners();

      console.log('✅ Aplicação inicializada com sucesso');
    } else {
      console.log('⏳ Aguardando autenticação do usuário...');
    }

  } catch (error) {
    console.error('❌ Erro ao inicializar aplicação:', error);
  }
}

// Função para carregar dados iniciais
async function loadInitialData() {
  try {
    console.log('📊 Carregando dados iniciais...');

    // Obter userId do estado da aplicação
    const userId = window.appState?.currentUser?.uid;
    if (!userId) {
      console.warn('⚠️ Usuário não autenticado, pulando carregamento de dados');
      return;
    }

    // Importar e chamar loadBudgets
    const { loadUserBudgets } = await import('@features/budgets/service.js');
    await loadUserBudgets(userId);
    // Selecionar orçamento padrão
    const { selectDefaultBudget } = await import('@features/budgets/service.js');
    await selectDefaultBudget(userId);
    // Carregar dados usando funções globais
    if (typeof window.loadTransactions === 'function') {
      await window.loadTransactions();
    }
    if (typeof window.loadCategories === 'function') {
      await window.loadCategories();
    }
    if (typeof window.loadRecorrentes === 'function') {
      await window.loadRecorrentes();
    }

    // loadNotifications e listenNotifications estão disponíveis globalmente
    if (typeof window.loadNotifications === 'function') {
      await window.loadNotifications();
    }
    if (typeof window.listenNotifications === 'function') {
      await window.listenNotifications();
    }

    if (window.appState.currentBudget?.id) {
      // startAllListeners está disponível globalmente
      if (typeof window.startAllListeners === 'function') {
        await window.startAllListeners(window.appState.currentBudget.id);
      }
    }

    console.log('✅ Dados iniciais carregados com sucesso');
  } catch (error) {
    console.error('❌ Erro ao carregar dados iniciais:', error);
  }
}

// Função para configurar event listeners
export function setupEventListeners() {
  console.log('🔧 Configurando event listeners...');

  // Event listeners para mudanças de dados
  eventBus.on('transaction:added', handleTransactionAdded);
  eventBus.on('transaction:updated', handleTransactionUpdated);
  eventBus.on('transaction:deleted', handleTransactionDeleted);
  eventBus.on('category:added', handleCategoryAdded);
  eventBus.on('category:updated', handleCategoryUpdated);
  eventBus.on('category:deleted', handleCategoryDeleted);
  eventBus.on('budget:changed', handleBudgetChanged);

  console.log('✅ Event listeners configurados');
}

// Handlers para eventos
function handleTransactionAdded(transaction) {
  console.log('📝 Nova transação adicionada:', transaction);
  // Atualizar UI conforme necessário
}

function handleTransactionUpdated(transaction) {
  console.log('📝 Transação atualizada:', transaction);
  // Atualizar UI conforme necessário
}

function handleTransactionDeleted(transactionId) {
  console.log('🗑️ Transação deletada:', transactionId);
  // Atualizar UI conforme necessário
}

function handleCategoryAdded(category) {
  console.log('📂 Nova categoria adicionada:', category);
  // Atualizar UI conforme necessário
}

function handleCategoryUpdated(category) {
  console.log('📂 Categoria atualizada:', category);
  // Atualizar UI conforme necessário
}

function handleCategoryDeleted(categoryId) {
  console.log('🗑️ Categoria deletada:', categoryId);
  // Atualizar UI conforme necessário
}

function handleBudgetChanged(budget) {
  console.log('💰 Orçamento alterado:', budget);
  // Atualizar UI conforme necessário
}

// features/init/InitService.js
import { eventBus } from '@core/events/eventBus.js';

// FunÃ§Ã£o para inicializar a aplicaÃ§Ã£o
export async function initializeApp() {
  console.log('ðŸš€ Inicializando aplicaÃ§Ã£o...');

  try {
    // Verificar se a aplicaÃ§Ã£o jÃ¡ foi inicializada
    if (window.appState?.isInitialized) {
      console.log('âœ… AplicaÃ§Ã£o jÃ¡ inicializada');
      return;
    }

    // Carregar dados iniciais se o usuÃ¡rio estiver autenticado
    if (window.appState?.currentUser) {
      console.log('âœ… UsuÃ¡rio jÃ¡ autenticado, configurando aplicaÃ§Ã£o...');

      // Carregar dados iniciais
      await loadInitialData();

      // Auto-aplicar recorrentes no dia 1 do mÃªs (sem forÃ§ar por padrÃ£o)
      try {
        const today = new Date();
        // Evitar reexecuÃ§Ã£o no mesmo mÃªs: usar uma flag simples em localStorage
        const monthKey = `${today.getFullYear()}-${String(today.getMonth()+1).padStart(2,'0')}`;
        const lastApplied = localStorage.getItem('recorrentes:lastAutoApplied');
        const isFirstOfMonth = today.getDate() === 1;
        if (isFirstOfMonth && lastApplied !== monthKey) {
          const userId = window.appState?.currentUser?.uid;
          const budgetId = window.appState?.currentBudget?.id;
          if (userId && budgetId) {
            const { aplicarRecorrentesDoMes, loadRecorrentes } = await import('@features/recorrentes/service.js');
            const res = await aplicarRecorrentesDoMes(userId, budgetId, true);
            // Atualizar datasets se houve mudanÃ§as (aplicadas podem ser 0 quando nÃ£o forÃ§ado)
            if (typeof window.loadTransactions === 'function') {
              await window.loadTransactions();
            }
            await loadRecorrentes();
            try { eventBus.emit('transactions:updated'); } catch {}
            try { eventBus.emit('categories:updated'); } catch {}
            try { eventBus.emit('recorrentes:updated'); } catch {}
            localStorage.setItem('recorrentes:lastAutoApplied', monthKey);
            // NotificaÃ§Ã£o leve
            if (res?.aplicadas > 0 && window.Snackbar) {
              window.Snackbar({ message: `Recorrentes do mÃªs aplicadas automaticamente (${res.aplicadas}).`, type: 'info' });
            }
          }
        }
      } catch (e) {
        console.warn('Falha ao auto-aplicar recorrentes:', e);
      }

      // Configurar event listeners
      setupEventListeners();

      console.log('âœ… AplicaÃ§Ã£o inicializada com sucesso');
    } else {
      console.log('â³ Aguardando autenticaÃ§Ã£o do usuÃ¡rio...');
    }

  } catch (error) {
    console.error('âŒ Erro ao inicializar aplicaÃ§Ã£o:', error);
  }
}

// FunÃ§Ã£o para carregar dados iniciais
async function loadInitialData() {
  try {
    console.log('ðŸ“Š Carregando dados iniciais...');

    // Obter userId do estado da aplicaÃ§Ã£o
    const userId = window.appState?.currentUser?.uid;
    if (!userId) {
      console.warn('âš ï¸ UsuÃ¡rio nÃ£o autenticado, pulando carregamento de dados');
      return;
    }

    // Importar e chamar loadBudgets
    const { loadUserBudgets } = await import('@features/budgets/service.js');
    await loadUserBudgets(userId);
    // Selecionar orÃ§amento padrÃ£o
    const { selectDefaultBudget } = await import('@features/budgets/service.js');
    await selectDefaultBudget(userId);
    // Carregar dados usando funÃ§Ãµes globais
    if (typeof window.loadTransactions === 'function') {
      await window.loadTransactions();
    }
    if (typeof window.loadCategories === 'function') {
      await window.loadCategories();
    }
    if (typeof window.loadRecorrentes === 'function') {
      await window.loadRecorrentes();
    }

    // loadNotifications e listenNotifications estÃ£o disponÃ­veis globalmente
    if (typeof window.loadNotifications === 'function') {
      await window.loadNotifications();
    }
    if (typeof window.listenNotifications === 'function') {
      await window.listenNotifications();
    }

    if (window.appState.currentBudget?.id) {
      // startAllListeners estÃ¡ disponÃ­vel globalmente
      if (typeof window.startAllListeners === 'function') {
        await window.startAllListeners(window.appState.currentBudget.id);
      }
    }

    console.log('âœ… Dados iniciais carregados com sucesso');
  } catch (error) {
    console.error('âŒ Erro ao carregar dados iniciais:', error);
  }
}

// FunÃ§Ã£o para configurar event listeners
export function setupEventListeners() {
  console.log('ðŸ”§ Configurando event listeners...');

  // Event listeners para mudanÃ§as de dados
  eventBus.on('transaction:added', handleTransactionAdded);
  eventBus.on('transaction:updated', handleTransactionUpdated);
  eventBus.on('transaction:deleted', handleTransactionDeleted);
  eventBus.on('category:added', handleCategoryAdded);
  eventBus.on('category:updated', handleCategoryUpdated);
  eventBus.on('category:deleted', handleCategoryDeleted);
  eventBus.on('budget:changed', handleBudgetChanged);

  console.log('âœ… Event listeners configurados');
}

// Handlers para eventos
function handleTransactionAdded(transaction) {
  console.log('ðŸ“ Nova transaÃ§Ã£o adicionada:', transaction);
  // Atualizar UI conforme necessÃ¡rio
}

function handleTransactionUpdated(transaction) {
  console.log('ðŸ“ TransaÃ§Ã£o atualizada:', transaction);
  // Atualizar UI conforme necessÃ¡rio
}

function handleTransactionDeleted(transactionId) {
  console.log('ðŸ—‘ï¸ TransaÃ§Ã£o deletada:', transactionId);
  // Atualizar UI conforme necessÃ¡rio
}

function handleCategoryAdded(category) {
  console.log('ðŸ“‚ Nova categoria adicionada:', category);
  // Atualizar UI conforme necessÃ¡rio
}

function handleCategoryUpdated(category) {
  console.log('ðŸ“‚ Categoria atualizada:', category);
  // Atualizar UI conforme necessÃ¡rio
}

function handleCategoryDeleted(categoryId) {
  console.log('ðŸ—‘ï¸ Categoria deletada:', categoryId);
  // Atualizar UI conforme necessÃ¡rio
}

function handleBudgetChanged(budget) {
  console.log('ðŸ’° OrÃ§amento alterado:', budget);
  // Atualizar UI conforme necessÃ¡rio
}

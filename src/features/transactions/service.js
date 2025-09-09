/* eslint-disable no-trailing-spaces */
import * as transactionsRepo from '@data/repositories/transactionsRepo.js';
import { eventBus } from '@core/events/eventBus.js';
import { createStore } from '@core/store/createStore.js';

// Store local para transaÃ§Ãµes
export const transactionsStore = createStore({
  transactions: [],
  loading: false,
  error: null
});

// Listeners ativos
let listeners = new Map();

// Carregar transaÃ§Ãµes iniciais
export async function loadTransactions(budgetId, userId) {
  try {
    transactionsStore.setState({ loading: true, error: null });
    // Carregar por orÃ§amento; nÃ£o filtrar por usuÃ¡rio para incluir dados compartilhados
    const filters = { budgetId };
    let transactions = await transactionsRepo.list(filters);
    // Fallback legado: se vazio, tentar por usuÃ¡rio e filtrar itens sem budgetId (dados antigos)
    try {
      if ((!transactions || transactions.length === 0) && typeof window !== 'undefined') {
        const userIdEff = userId || window.appState?.currentUser?.uid;
        const budgets = window.appState?.budgets || [];
        const isMultiBudget = Array.isArray(budgets) && budgets.length > 1;
        if (userIdEff) {
          const all = await transactionsRepo.list({ userId: userIdEff });
          // Em multi-orÃ§amentos, nÃ£o exibir itens sem budgetId para evitar vazamento
          transactions = isMultiBudget
            ? (all || []).filter(t => t.budgetId === budgetId)
            : (all || []).filter(t => !t.budgetId || t.budgetId === budgetId);
        }
      }
    } catch {}
    transactionsStore.setState({ transactions, loading: false });
    // Atualizar estado global legado para compatibilidade imediata com UI
    try {
      if (typeof window !== 'undefined') {
        window.appState = window.appState || {};
        window.appState.transactions = transactions;
      }
    } catch {}
    return transactions;
  } catch (error) {
    transactionsStore.setState({ error: error.message, loading: false });
    throw error;
  }
}

// Iniciar listener em tempo real
export function startTransactionsListener(budgetId, userId) {
  const key = `${budgetId}-${userId}`;
  if (listeners.has(key)) return; // JÃ¡ estÃ¡ ativo

  const unsubscribe = transactionsRepo.listenToChanges({ budgetId, userId }, (transactions) => {
    transactionsStore.setState({ transactions });
    eventBus.emit('transactions:updated', { budgetId, transactions });
  });

  listeners.set(key, unsubscribe);
}

// Parar listener
export function stopTransactionsListener(budgetId, userId) {
  const key = `${budgetId}-${userId}`;
  const unsubscribe = listeners.get(key);
  if (unsubscribe) {
    unsubscribe();
    listeners.delete(key);
  }
}

// Parar todos os listeners
export function stopAllListeners() {
  listeners.forEach(unsubscribe => unsubscribe());
  listeners.clear();
}

// CRUD operations
export async function addTransaction(data) {
  try {
    const result = await transactionsRepo.create(data);
    eventBus.emit('transaction:added', result);
    return result;
  } catch (error) {
    eventBus.emit('error:transaction', error);
    throw error;
  }
}

export async function updateTransaction(id, data) {
  try {
    await transactionsRepo.update(id, data);
    eventBus.emit('transaction:updated', { id, data });
  } catch (error) {
    eventBus.emit('error:transaction', error);
    throw error;
  }
}

export async function deleteTransaction(id) {
  try {
    await transactionsRepo.remove(id);
    eventBus.emit('transaction:deleted', { id });
  } catch (error) {
    eventBus.emit('error:transaction', error);
    throw error;
  }
}

// Aplicar recorrente
export async function createFromRecurring(data) {
  try {
    const result = await transactionsRepo.createFromRecurring(data);
    eventBus.emit('transaction:recurring:applied', result);
    return result;
  } catch (error) {
    eventBus.emit('error:transaction', error);
    throw error;
  }
}

// FunÃ§Ãµes com notificaÃ§Ãµes (migradas do app.js)
export async function addTransactionWithNotifications(transactionData) {
  try {
    const user = window.appState.currentUser;
    if (!user) {
      throw new Error('UsuÃ¡rio nÃ£o autenticado');
    }

    const budget = window.appState.currentBudget;
    if (!budget) {
      throw new Error('OrÃ§amento nÃ£o selecionado');
    }

    const transaction = {
      ...transactionData,
      userId: user.uid,
      budgetId: budget.id,
    };

    const { id: newId } = await transactionsRepo.create(transaction);
    console.log('âœ… TransaÃ§Ã£o adicionada com ID:', newId);
    
    // Enviar notificaÃ§Ãµes para membros do orÃ§amento (exceto o autor) - com fallback de import direto
    try {
      if (typeof window !== 'undefined' && typeof window.sendTransactionNotification === 'function') {
        await window.sendTransactionNotification(budget.id, user.uid, { ...transaction, id: newId });
      } else {
        const { sendTransactionNotification } = await import('@features/notifications/NotificationService.js');
        await sendTransactionNotification(budget.id, user.uid, { ...transaction, id: newId });
      }
    } catch (notifyErr) {
      console.warn('NÃ£o foi possÃ­vel enviar notificaÃ§Ãµes de nova transaÃ§Ã£o:', notifyErr);
    }
    
    // Verificar limites de categoria
    if (window.checkLimitesCategoria) {
      window.checkLimitesCategoria();
    }
    
    // ForÃ§ar atualizaÃ§Ã£o da UI (evitar ReferenceError apÃ³s teardown dos testes)
    {
      const w = (typeof window !== 'undefined') ? window : null;
      if (w && w.forceUIUpdate) {
        setTimeout(() => {
          try { w.forceUIUpdate && w.forceUIUpdate(); } catch {}
        }, 100);
      }
    }
    
    // Snackbar
    const { Snackbar } = await import('@js/ui/Snackbar.js');
    if (typeof Snackbar?.show === 'function') {
      Snackbar.show('TransaÃ§Ã£o adicionada com sucesso!', 'success');
    } else if (typeof Snackbar === 'function') {
      Snackbar({ message: 'TransaÃ§Ã£o adicionada com sucesso!', type: 'success' });
    } else if (window?.Snackbar?.show) {
      window.Snackbar.show('TransaÃ§Ã£o adicionada com sucesso!', 'success');
    }
    return newId;
  } catch (error) {
    console.error('âŒ Erro ao adicionar transaÃ§Ã£o:', error);
    try {
      const { Snackbar } = await import('@js/ui/Snackbar.js');
      if (typeof Snackbar?.show === 'function') {
        Snackbar.show('Erro ao adicionar transaÃ§Ã£o', 'error');
      } else if (typeof Snackbar === 'function') {
        Snackbar({ message: 'Erro ao adicionar transaÃ§Ã£o', type: 'error' });
      } else if (window?.Snackbar?.show) {
        window.Snackbar.show('Erro ao adicionar transaÃ§Ã£o', 'error');
      }
    } catch {}
    throw error;
  }
}

export async function updateTransactionWithNotifications(transactionId, transactionData) {
  try {
    // Ler snapshot anterior para compor diffs nas notificaÃ§Ãµes
    let prev = null;
    try {
      prev = await transactionsRepo.getById(transactionId);
    } catch {}

    await transactionsRepo.update(transactionId, { ...transactionData });
    
    console.log('âœ… TransaÃ§Ã£o atualizada:', transactionId);

    // Enviar notificaÃ§Ãµes de atualizaÃ§Ã£o (exceto o autor), incluindo detalhes do que mudou
    try {
      const user = window.appState.currentUser;
      const budgetId = window.appState.currentBudget?.id;
      if (budgetId && user?.uid) {
        // Montar changeSet simples comparando campos relevantes
        const changeSet = {};
        if (prev) {
          const has = (k) => Object.prototype.hasOwnProperty.call(transactionData, k);
          if (has('valor') && prev.valor !== transactionData.valor) {
            changeSet.valor = { from: prev.valor, to: transactionData.valor };
          }
          if (has('descricao') && prev.descricao !== transactionData.descricao) {
            changeSet.descricao = { from: prev.descricao, to: transactionData.descricao };
          }
          if (has('categoriaId') && prev.categoriaId !== transactionData.categoriaId) {
            changeSet.categoriaId = { from: prev.categoriaId, to: transactionData.categoriaId };
          }
          if (has('tipo') && prev.tipo !== transactionData.tipo) {
            changeSet.tipo = { from: prev.tipo, to: transactionData.tipo };
          }
        }
        const payload = { id: transactionId, ...transactionData, prev: prev ? { descricao: prev.descricao, valor: prev.valor, categoriaId: prev.categoriaId, tipo: prev.tipo } : null, changeSet };
        if (typeof window !== 'undefined' && typeof window.sendTransactionUpdatedNotification === 'function') {
          await window.sendTransactionUpdatedNotification(budgetId, user.uid, payload);
        } else {
          const { sendTransactionUpdatedNotification } = await import('@features/notifications/NotificationService.js');
          await sendTransactionUpdatedNotification(budgetId, user.uid, payload);
        }
      }
    } catch (notifyErr) {
      console.warn('NÃ£o foi possÃ­vel enviar notificaÃ§Ãµes de atualizaÃ§Ã£o de transaÃ§Ã£o:', notifyErr);
    }
    
    // Verificar limites de categoria
    if (window.checkLimitesCategoria) {
      window.checkLimitesCategoria();
    }
    
    // ForÃ§ar atualizaÃ§Ã£o da UI (evitar ReferenceError apÃ³s teardown dos testes)
    {
      const w = (typeof window !== 'undefined') ? window : null;
      if (w && w.forceUIUpdate) {
        setTimeout(() => {
          try { w.forceUIUpdate && w.forceUIUpdate(); } catch {}
        }, 100);
      }
    }
    
    const { Snackbar } = await import('@js/ui/Snackbar.js');
    if (typeof Snackbar?.show === 'function') {
      Snackbar.show('TransaÃ§Ã£o atualizada com sucesso!', 'success');
    } else if (typeof Snackbar === 'function') {
      Snackbar({ message: 'TransaÃ§Ã£o atualizada com sucesso!', type: 'success' });
    } else if (window?.Snackbar?.show) {
      window.Snackbar.show('TransaÃ§Ã£o atualizada com sucesso!', 'success');
    }
  } catch (error) {
    console.error('âŒ Erro ao atualizar transaÃ§Ã£o:', error);
    try {
      const { Snackbar } = await import('@js/ui/Snackbar.js');
      if (typeof Snackbar?.show === 'function') {
        Snackbar.show('Erro ao atualizar transaÃ§Ã£o', 'error');
      } else if (typeof Snackbar === 'function') {
        Snackbar({ message: 'Erro ao atualizar transaÃ§Ã£o', type: 'error' });
      } else if (window?.Snackbar?.show) {
        window.Snackbar.show('Erro ao atualizar transaÃ§Ã£o', 'error');
      }
    } catch {}
    throw error;
  }
}

export async function deleteTransactionWithNotifications(transactionId) {
  try {
    // Ler dados da transaÃ§Ã£o antes de apagar (para compor a notificaÃ§Ã£o de exclusÃ£o)
    let txDataForNotification = null;
    try {
      const current = await transactionsRepo.getById(transactionId);
      if (current) { txDataForNotification = current; }
    } catch (readErr) {
      console.warn('NÃ£o foi possÃ­vel ler a transaÃ§Ã£o antes de excluir:', readErr);
    }

    // RemoÃ§Ã£o otimista: remover do repo e do appState para resposta instantÃ¢nea
    await transactionsRepo.remove(transactionId);
    try {
      if (typeof window !== 'undefined') {
        const list = Array.isArray(window.appState?.transactions) ? window.appState.transactions.slice() : [];
        const idx = list.findIndex(t => t.id === transactionId);
        if (idx !== -1) {
          list.splice(idx, 1);
          window.appState.transactions = list;
          eventBus.emit('transactions:updated', { transactions: list });
        }
      }
    } catch {}
    
    console.log('âœ… TransaÃ§Ã£o deletada:', transactionId);
    
    // Enviar notificaÃ§Ãµes de exclusÃ£o para membros do orÃ§amento (exceto o autor)
    try {
      const user = window.appState.currentUser;
      const budgetId = txDataForNotification?.budgetId || window.appState.currentBudget?.id;
      if (budgetId && user?.uid) {
        const payload = txDataForNotification || { id: transactionId };
        if (typeof window !== 'undefined' && typeof window.sendTransactionDeletedNotification === 'function') {
          await window.sendTransactionDeletedNotification(budgetId, user.uid, payload);
        } else {
          const { sendTransactionDeletedNotification } = await import('@features/notifications/NotificationService.js');
          await sendTransactionDeletedNotification(budgetId, user.uid, payload);
        }
      }
    } catch (notifyErr) {
      console.warn('NÃ£o foi possÃ­vel enviar notificaÃ§Ãµes de exclusÃ£o de transaÃ§Ã£o:', notifyErr);
    }
    
    // Verificar limites de categoria
    if (window.checkLimitesCategoria) {
      window.checkLimitesCategoria();
    }
    
    // ForÃ§ar atualizaÃ§Ã£o da UI (evitar ReferenceError apÃ³s teardown dos testes)
    {
      const w = (typeof window !== 'undefined') ? window : null;
      if (w && w.forceUIUpdate) {
        setTimeout(() => {
          try { w.forceUIUpdate && w.forceUIUpdate(); } catch {}
        }, 100);
      }
    }
    
    const { Snackbar } = await import('@js/ui/Snackbar.js');
    const undo = async () => {
      try {
        if (!txDataForNotification) { return; }
        // Recriar a transaÃ§Ã£o com os mesmos dados bÃ¡sicos
        const { id: newId } = await transactionsRepo.create(txDataForNotification);
        // Atualizar estado local rapidamente
        try {
          if (typeof window !== 'undefined') {
            const list = Array.isArray(window.appState?.transactions) ? window.appState.transactions.slice() : [];
            list.unshift({ ...txDataForNotification, id: newId });
            window.appState.transactions = list;
            eventBus.emit('transactions:updated', { transactions: list });
          }
        } catch {}
        Snackbar.show('ExclusÃ£o desfeita', 'success');
      } catch (e) {
        console.warn('Falha ao desfazer exclusÃ£o:', e);
        Snackbar.show('NÃ£o foi possÃ­vel desfazer', 'error');
      }
    };
    const action = { label: 'Desfazer', onClick: undo };
    if (typeof Snackbar?.show === 'function') {
      Snackbar.show('TransaÃ§Ã£o excluÃ­da', 'success', 5000, action);
    } else if (typeof Snackbar === 'function') {
      Snackbar({ message: 'TransaÃ§Ã£o excluÃ­da', type: 'success', duration: 5000, action });
    } else if (window?.Snackbar?.show) {
      window.Snackbar.show('TransaÃ§Ã£o excluÃ­da', 'success');
    }
  } catch (error) {
    console.error('âŒ Erro ao deletar transaÃ§Ã£o:', error);
    try {
      const { Snackbar } = await import('@js/ui/Snackbar.js');
      if (typeof Snackbar?.show === 'function') {
        Snackbar.show('Erro ao deletar transaÃ§Ã£o', 'error');
      } else if (typeof Snackbar === 'function') {
        Snackbar({ message: 'Erro ao deletar transaÃ§Ã£o', type: 'error' });
      } else if (window?.Snackbar?.show) {
        window.Snackbar.show('Erro ao deletar transaÃ§Ã£o', 'error');
      }
    } catch {}
    throw error;
  }
}

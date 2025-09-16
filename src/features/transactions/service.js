/* eslint-disable no-trailing-spaces */
import * as transactionsRepo from '@data/repositories/transactionsRepo.js';
import { eventBus } from '@core/events/eventBus.js';
import { createStore } from '@core/store/createStore.js';

// Store local para transações
export const transactionsStore = createStore({
  transactions: [],
  loading: false,
  error: null
});

// Listeners ativos
let listeners = new Map();

// Carregar transações iniciais
export async function loadTransactions(budgetId, userId) {
  try {
    transactionsStore.setState({ loading: true, error: null });
    // Carregar por orçamento; não filtrar por usuário para incluir dados compartilhados
    const filters = { budgetId };
    let transactions = await transactionsRepo.list(filters);
    // Fallback legado: se vazio, tentar por usuário e filtrar itens sem budgetId (dados antigos)
    try {
      if ((!transactions || transactions.length === 0) && typeof window !== 'undefined') {
        const userIdEff = userId || window.appState?.currentUser?.uid;
        const budgets = window.appState?.budgets || [];
        const isMultiBudget = Array.isArray(budgets) && budgets.length > 1;
        if (userIdEff) {
          const all = await transactionsRepo.list({ userId: userIdEff });
          // Em multi-orçamentos, não exibir itens sem budgetId para evitar vazamento
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
      console.log('[DEBUG] Transações carregadas para o orçamento', budgetId, transactions);
    return transactions;
  } catch (error) {
    transactionsStore.setState({ error: error.message, loading: false });
    throw error;
  }
}

// Iniciar listener em tempo real
export function startTransactionsListener(budgetId, userId) {
  const key = `${budgetId}-${userId}`;
  if (listeners.has(key)) return; // Já está ativo

  const unsubscribe = transactionsRepo.listenToChanges({ budgetId, userId }, (transactions) => {
    transactionsStore.setState({ transactions });
  console.log('🚦 Emitindo transactions:updated', { budgetId, transactions });
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
    // Atualizar lista global e emitir evento de atualização
    try {
      const budgetId = data.budgetId || (window.appState?.currentBudget?.id);
      const userId = data.userId || (window.appState?.currentUser?.uid);
      if (budgetId && userId && typeof window.loadTransactions === 'function') {
        await window.loadTransactions();
        eventBus.emit('transactions:updated', { budgetId, transactions: window.appState.transactions || [] });
      }
    } catch (e) { console.warn('Falha ao emitir transactions:updated após addTransaction', e); }
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

// Funções com notificações (migradas do app.js)
export async function addTransactionWithNotifications(transactionData) {
  try {
    const user = window.appState.currentUser;
    if (!user) {
      throw new Error('Usuário não autenticado');
    }

    const budget = window.appState.currentBudget;
    if (!budget) {
      throw new Error('Orçamento não selecionado');
    }

    const transaction = {
      ...transactionData,
      userId: user.uid,
      budgetId: budget.id,
    };

    const { id: newId } = await transactionsRepo.create(transaction);
    console.log('✅ Transação adicionada com ID:', newId);
    
    // Enviar notificações para membros do orçamento (exceto o autor) - com fallback de import direto
    try {
      if (typeof window !== 'undefined' && typeof window.sendTransactionNotification === 'function') {
        await window.sendTransactionNotification(budget.id, user.uid, { ...transaction, id: newId });
      } else {
        const { sendTransactionNotification } = await import('@features/notifications/NotificationService.js');
        await sendTransactionNotification(budget.id, user.uid, { ...transaction, id: newId });
      }
    } catch (notifyErr) {
      console.warn('Não foi possível enviar notificações de nova transação:', notifyErr);
    }
    
    // Verificar limites de categoria
    if (window.checkLimitesCategoria) {
      window.checkLimitesCategoria();
    }
    
    // Forçar atualização da UI (evitar ReferenceError após teardown dos testes)
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
      Snackbar.show('Transação adicionada com sucesso!', 'success');
    } else if (typeof Snackbar === 'function') {
      Snackbar({ message: 'Transação adicionada com sucesso!', type: 'success' });
    } else if (window?.Snackbar?.show) {
      window.Snackbar.show('Transação adicionada com sucesso!', 'success');
    }
    return newId;
  } catch (error) {
    console.error('❌ Erro ao adicionar transação:', error);
    try {
      const { Snackbar } = await import('@js/ui/Snackbar.js');
      if (typeof Snackbar?.show === 'function') {
        Snackbar.show('Erro ao adicionar transação', 'error');
      } else if (typeof Snackbar === 'function') {
        Snackbar({ message: 'Erro ao adicionar transação', type: 'error' });
      } else if (window?.Snackbar?.show) {
        window.Snackbar.show('Erro ao adicionar transação', 'error');
      }
    } catch {}
    throw error;
  }
}

export async function updateTransactionWithNotifications(transactionId, transactionData) {
  try {
    // Ler snapshot anterior para compor diffs nas notificações
    let prev = null;
    try {
      prev = await transactionsRepo.getById(transactionId);
    } catch {}

    await transactionsRepo.update(transactionId, { ...transactionData });
    
    console.log('✅ Transação atualizada:', transactionId);

    // Enviar notificações de atualização (exceto o autor), incluindo detalhes do que mudou
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
      console.warn('Não foi possível enviar notificações de atualização de transação:', notifyErr);
    }
    
    // Verificar limites de categoria
    if (window.checkLimitesCategoria) {
      window.checkLimitesCategoria();
    }
    
    // Forçar atualização da UI (evitar ReferenceError após teardown dos testes)
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
      Snackbar.show('Transação atualizada com sucesso!', 'success');
    } else if (typeof Snackbar === 'function') {
      Snackbar({ message: 'Transação atualizada com sucesso!', type: 'success' });
    } else if (window?.Snackbar?.show) {
      window.Snackbar.show('Transação atualizada com sucesso!', 'success');
    }
  } catch (error) {
    console.error('❌ Erro ao atualizar transação:', error);
    try {
      const { Snackbar } = await import('@js/ui/Snackbar.js');
      if (typeof Snackbar?.show === 'function') {
        Snackbar.show('Erro ao atualizar transação', 'error');
      } else if (typeof Snackbar === 'function') {
        Snackbar({ message: 'Erro ao atualizar transação', type: 'error' });
      } else if (window?.Snackbar?.show) {
        window.Snackbar.show('Erro ao atualizar transação', 'error');
      }
    } catch {}
    throw error;
  }
}

export async function deleteTransactionWithNotifications(transactionId) {
  try {
    // Ler dados da transação antes de apagar (para compor a notificação de exclusão)
    let txDataForNotification = null;
    try {
      const current = await transactionsRepo.getById(transactionId);
      if (current) { txDataForNotification = current; }
    } catch (readErr) {
      console.warn('Não foi possível ler a transação antes de excluir:', readErr);
    }

    // Remoção otimista: remover do repo e do appState para resposta instantânea
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
    
    console.log('✅ Transação deletada:', transactionId);
    
    // Enviar notificações de exclusão para membros do orçamento (exceto o autor)
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
      console.warn('Não foi possível enviar notificações de exclusão de transação:', notifyErr);
    }
    
    // Verificar limites de categoria
    if (window.checkLimitesCategoria) {
      window.checkLimitesCategoria();
    }
    
    // Forçar atualização da UI (evitar ReferenceError após teardown dos testes)
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
        // Recriar a transação com os mesmos dados básicos
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
        Snackbar.show('Exclusão desfeita', 'success');
      } catch (e) {
        console.warn('Falha ao desfazer exclusão:', e);
        Snackbar.show('Não foi possível desfazer', 'error');
      }
    };
    const action = { label: 'Desfazer', onClick: undo };
    if (typeof Snackbar?.show === 'function') {
      Snackbar.show('Transação excluída', 'success', 5000, action);
    } else if (typeof Snackbar === 'function') {
      Snackbar({ message: 'Transação excluída', type: 'success', duration: 5000, action });
    } else if (window?.Snackbar?.show) {
      window.Snackbar.show('Transação excluída', 'success');
    }
  } catch (error) {
    console.error('❌ Erro ao deletar transação:', error);
    try {
      const { Snackbar } = await import('@js/ui/Snackbar.js');
      if (typeof Snackbar?.show === 'function') {
        Snackbar.show('Erro ao deletar transação', 'error');
      } else if (typeof Snackbar === 'function') {
        Snackbar({ message: 'Erro ao deletar transação', type: 'error' });
      } else if (window?.Snackbar?.show) {
        window.Snackbar.show('Erro ao deletar transação', 'error');
      }
    } catch {}
    throw error;
  }
}

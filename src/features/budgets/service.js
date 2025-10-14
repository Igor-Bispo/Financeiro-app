import * as budgetsRepo from '@data/repositories/budgetsRepo.js';
import { eventBus } from '@core/events/eventBus.js';
import { createStore } from '@core/store/createStore.js';

// Store local para orçamentos
export const budgetsStore = createStore({
  budgets: [],
  currentBudget: null,
  loading: false,
  error: null
});

// Listeners ativos
let listeners = new Map();

// Carregar orçamentos do usuário
export async function loadUserBudgets(userId) {
  try {
    console.log('🔍 [BudgetsService] loadUserBudgets - Iniciando para userId:', userId);
    budgetsStore.setState({ loading: true, error: null });

    // Carregar orçamentos próprios e compartilhados
    console.log('🔍 [BudgetsService] loadUserBudgets - Carregando orçamentos...');
    const [own, shared] = await Promise.all([
      budgetsRepo.listOwn(userId),
      budgetsRepo.listShared(userId)
    ]);
    
    console.log('📊 [BudgetsService] loadUserBudgets - Own:', own.length, 'Shared:', shared.length);

    // Anotar propriedade de dono; desduplicar por id e ordenar por createdAt desc
    const normalize = (arr, _isOwnerFlag) =>
      (arr || []).map(b => ({ ...b, isOwner: typeof b.isOwner === 'boolean' ? b.isOwner : (b.userId === userId) }));

    const ownNorm = normalize(own, true);
    const sharedNorm = normalize(shared, false);

    const byId = new Map();
    [...ownNorm, ...sharedNorm].forEach(b => {
      const existing = byId.get(b.id);
      // Se já existe, priorizar a versão que marca o usuário como dono (isOwner = true)
      // MAS apenas se o usuário for realmente o dono original (b.userId === userId)
      if (!existing) {
        byId.set(b.id, b);
      } else if (b.isOwner && !existing.isOwner && b.userId === userId) {
        // Só sobrescrever se o usuário for realmente o dono original
        byId.set(b.id, b);
      }
      // Caso contrário, manter o existente (que pode ser compartilhado)
    });

    const toDate = (v) => v?.toDate ? v.toDate() : (v?.seconds ? new Date(v.seconds * 1000) : (v ? new Date(v) : new Date(0)));
    const combined = Array.from(byId.values()).sort((a, b) => toDate(b.createdAt) - toDate(a.createdAt));

    console.log('📊 [BudgetsService] loadUserBudgets - Combined:', combined.length, 'orçamentos');
    console.log('📋 [BudgetsService] loadUserBudgets - Dados finais:', combined);

    // Atualizar stores e estado global legado
    budgetsStore.setState({ budgets: combined, loading: false });
    if (typeof window !== 'undefined') {
      window.appState = window.appState || {};
      window.appState.budgets = combined;
    }

    console.log('✅ [BudgetsService] loadUserBudgets - Concluído!');
    return combined;
  } catch (error) {
    console.error('❌ [BudgetsService] loadUserBudgets - ERRO:', error);
    console.error('❌ [BudgetsService] loadUserBudgets - Stack:', error.stack);
    budgetsStore.setState({ error: error.message, loading: false });
    throw error;
  }
}

// Carregar orçamentos compartilhados
export async function loadSharedBudgets(userId) {
  try {
    const budgets = await budgetsRepo.listShared(userId);
    return budgets;
  } catch (error) {
    eventBus.emit('error:budget', error);
    throw error;
  }
}

// Iniciar listener para orçamentos
export function startBudgetsListener(userId) {
  if (listeners.has(userId)) return;

  const unsubscribe = budgetsRepo.listenToChanges(userId, (budgets) => {
    budgetsStore.setState({ budgets });
    eventBus.emit('budgets:updated', { budgets });
  });

  listeners.set(userId, unsubscribe);
}

// Parar listener
export function stopBudgetsListener(userId) {
  const unsubscribe = listeners.get(userId);
  if (unsubscribe) {
    unsubscribe();
    listeners.delete(userId);
  }
}

// Definir orçamento atual
export function setCurrentBudget(budget) {
  budgetsStore.setState({ currentBudget: budget });
  eventBus.emit('budget:changed', budget);
  try { if (budget?.id) localStorage.setItem('currentBudgetId', budget.id); } catch {}
}

// CRUD operations
export async function createBudget(data) {
  try {
    const result = await budgetsRepo.create(data);
    eventBus.emit('budget:created', result);
    return result;
  } catch (error) {
    eventBus.emit('error:budget', error);
    throw error;
  }
}

export async function updateBudget(id, data) {
  try {
    await budgetsRepo.update(id, data);
    eventBus.emit('budget:updated', { id, data });
  } catch (error) {
    eventBus.emit('error:budget', error);
    throw error;
  }
}

export async function deleteBudget(budgetId, _userId) {
  try {
    await budgetsRepo.remove(budgetId);
    eventBus.emit('budget:deleted', { id: budgetId });
  } catch (error) {
    eventBus.emit('error:budget', error);
    throw error;
  }
}

// Parar todos os listeners
export function stopAllListeners() {
  listeners.forEach(unsubscribe => unsubscribe());
  listeners.clear();
}

// Função para selecionar orçamento padrão (primeiro da lista ou criar um novo)
export async function selectDefaultBudget(userId) {
  try {
    // Carregar orçamentos do usuário
    const budgets = await loadUserBudgets(userId);

    if (budgets && budgets.length > 0) {
      // Primeiro, tentar usar o orçamento salvo no localStorage
      let defaultBudget = budgets[0]; // fallback para o primeiro

      try {
        const savedBudgetId = localStorage.getItem('currentBudgetId');
        if (savedBudgetId) {
          const savedBudget = budgets.find(b => b.id === savedBudgetId);
          if (savedBudget) {
            defaultBudget = savedBudget;
            console.log('✅ Orçamento restaurado do localStorage:', defaultBudget.nome);
          } else {
            console.log('⚠️ Orçamento salvo não encontrado, usando primeiro disponível');
          }
        }
      } catch (e) {
        console.warn('Erro ao restaurar orçamento do localStorage:', e);
      }

      setCurrentBudget(defaultBudget);

      // Atualizar estado global da aplicação
      if (window.appState) {
        window.appState.currentBudget = defaultBudget;
      }

      console.log('✅ Orçamento padrão selecionado:', defaultBudget.nome);
      return defaultBudget;
    } else {
      // Se não há orçamentos, criar um padrão
      const defaultBudgetData = {
        nome: 'Orçamento Principal',
        descricao: 'Orçamento padrão criado automaticamente',
        userId: userId,
        tipo: 'pessoal',
        createdAt: new Date(),
        usuariosPermitidos: [userId]
      };

      const budgetId = await createBudget(defaultBudgetData);
      const newBudget = await getById(budgetId);

      if (newBudget) {
        setCurrentBudget(newBudget);

        // Atualizar estado global da aplicação
        if (window.appState) {
          window.appState.currentBudget = newBudget;
        }

        console.log('✅ Novo orçamento padrão criado:', newBudget.nome);
        return newBudget;
      }
    }

    return null;
  } catch (error) {
    console.error('❌ Erro ao selecionar orçamento padrão:', error);
    throw error;
  }
}

// Função para obter orçamento por ID
export async function getById(id) {
  const { getById: getBudgetById } = await import('@data/repositories/budgetsRepo.js');
  return getBudgetById(id);
}

// Função global para compatibilidade com código legado
export function setCurrentBudgetGlobal(budget) {
  setCurrentBudget(budget);

  // Atualizar estado global da aplicação
  if (window.appState) {
    window.appState.currentBudget = budget;
  }
  try { if (budget?.id) localStorage.setItem('currentBudgetId', budget.id); } catch {}

  return budget;
}

// Função para garantir persistência do orçamento selecionado
export function ensureBudgetPersistence(budget) {
  if (!budget || !budget.id) {
    console.warn('Tentativa de persistir orçamento inválido:', budget);
    return false;
  }

  try {
    // Salvar no localStorage
    localStorage.setItem('currentBudgetId', budget.id);

    // Atualizar estado global
    if (window.appState) {
      window.appState.currentBudget = budget;
    }

    // Emitir evento de mudança
    eventBus.emit('budget:changed', budget);

    console.log('✅ Orçamento persistido:', budget.nome, budget.id);
    return true;
  } catch (error) {
    console.error('❌ Erro ao persistir orçamento:', error);
    return false;
  }
}

// Função para restaurar orçamento do localStorage
export async function restoreBudgetFromStorage(_userId) {
  try {
    const savedBudgetId = localStorage.getItem('currentBudgetId');
    if (!savedBudgetId) {
      console.log('Nenhum orçamento salvo encontrado');
      return null;
    }

    const budget = await getById(savedBudgetId);
    if (budget) {
      console.log('✅ Orçamento restaurado do localStorage:', budget.nome);
      setCurrentBudget(budget);
      return budget;
    } else {
      console.warn('⚠️ Orçamento salvo não encontrado no banco de dados');
      // Remover ID inválido do localStorage
      localStorage.removeItem('currentBudgetId');
      return null;
    }
  } catch (error) {
    console.error('❌ Erro ao restaurar orçamento:', error);
    return null;
  }
}

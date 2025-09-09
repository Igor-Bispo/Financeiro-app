import * as budgetsRepo from '@data/repositories/budgetsRepo.js';
import { eventBus } from '@core/events/eventBus.js';
import { createStore } from '@core/store/createStore.js';

// Store local para orÃ§amentos
export const budgetsStore = createStore({
  budgets: [],
  currentBudget: null,
  loading: false,
  error: null
});

// Listeners ativos
let listeners = new Map();

// Carregar orÃ§amentos do usuÃ¡rio
export async function loadUserBudgets(userId) {
  try {
    budgetsStore.setState({ loading: true, error: null });

    // Carregar orÃ§amentos prÃ³prios e compartilhados
    const [own, shared] = await Promise.all([
      budgetsRepo.listOwn(userId),
      budgetsRepo.listShared(userId)
    ]);

    // Anotar propriedade de dono; desduplicar por id e ordenar por createdAt desc
    const normalize = (arr, _isOwnerFlag) =>
      (arr || []).map(b => ({ ...b, isOwner: typeof b.isOwner === 'boolean' ? b.isOwner : (b.userId === userId) }));

    const ownNorm = normalize(own, true);
    const sharedNorm = normalize(shared, false);

    const byId = new Map();
    [...ownNorm, ...sharedNorm].forEach(b => {
      const existing = byId.get(b.id);
      // Se jÃ¡ existe, priorizar a versÃ£o que marca o usuÃ¡rio como dono (isOwner = true)
      if (!existing || (b.isOwner && !existing.isOwner)) {
        byId.set(b.id, b);
      }
    });

    const toDate = (v) => v?.toDate ? v.toDate() : (v?.seconds ? new Date(v.seconds * 1000) : (v ? new Date(v) : new Date(0)));
    const combined = Array.from(byId.values()).sort((a, b) => toDate(b.createdAt) - toDate(a.createdAt));

    // Atualizar stores e estado global legado
    budgetsStore.setState({ budgets: combined, loading: false });
    if (typeof window !== 'undefined') {
      window.appState = window.appState || {};
      window.appState.budgets = combined;
    }

    return combined;
  } catch (error) {
    budgetsStore.setState({ error: error.message, loading: false });
    throw error;
  }
}

// Carregar orÃ§amentos compartilhados
export async function loadSharedBudgets(userId) {
  try {
    const budgets = await budgetsRepo.listShared(userId);
    return budgets;
  } catch (error) {
    eventBus.emit('error:budget', error);
    throw error;
  }
}

// Iniciar listener para orÃ§amentos
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

// Definir orÃ§amento atual
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

export async function deleteBudget(id) {
  try {
    await budgetsRepo.remove(id);
    eventBus.emit('budget:deleted', { id });
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

// FunÃ§Ã£o para selecionar orÃ§amento padrÃ£o (primeiro da lista ou criar um novo)
export async function selectDefaultBudget(userId) {
  try {
    // Carregar orÃ§amentos do usuÃ¡rio
    const budgets = await loadUserBudgets(userId);

    if (budgets && budgets.length > 0) {
      // Selecionar o primeiro orÃ§amento disponÃ­vel
      const defaultBudget = budgets[0];
      setCurrentBudget(defaultBudget);

      // Atualizar estado global da aplicaÃ§Ã£o
      if (window.appState) {
        window.appState.currentBudget = defaultBudget;
      }

      console.log('âœ… OrÃ§amento padrÃ£o selecionado:', defaultBudget.nome);
      return defaultBudget;
    } else {
      // Se nÃ£o hÃ¡ orÃ§amentos, criar um padrÃ£o
      const defaultBudgetData = {
        nome: 'OrÃ§amento Principal',
        descricao: 'OrÃ§amento padrÃ£o criado automaticamente',
        userId: userId,
        tipo: 'pessoal',
        createdAt: new Date(),
        usuariosPermitidos: [userId]
      };

      const budgetId = await createBudget(defaultBudgetData);
      const newBudget = await getById(budgetId);

      if (newBudget) {
        setCurrentBudget(newBudget);

        // Atualizar estado global da aplicaÃ§Ã£o
        if (window.appState) {
          window.appState.currentBudget = newBudget;
        }

        console.log('âœ… Novo orÃ§amento padrÃ£o criado:', newBudget.nome);
        return newBudget;
      }
    }

    return null;
  } catch (error) {
    console.error('âŒ Erro ao selecionar orÃ§amento padrÃ£o:', error);
    throw error;
  }
}

// FunÃ§Ã£o para obter orÃ§amento por ID
export async function getById(id) {
  const { getById: getBudgetById } = await import('@data/repositories/budgetsRepo.js');
  return getBudgetById(id);
}

// FunÃ§Ã£o global para compatibilidade com cÃ³digo legado
export function setCurrentBudgetGlobal(budget) {
  setCurrentBudget(budget);

  // Atualizar estado global da aplicaÃ§Ã£o
  if (window.appState) {
    window.appState.currentBudget = budget;
  }
  try { if (budget?.id) localStorage.setItem('currentBudgetId', budget.id); } catch {}

  return budget;
}

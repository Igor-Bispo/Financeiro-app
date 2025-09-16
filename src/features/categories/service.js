import * as categoriesRepo from '@data/repositories/categoriesRepo.js';
import { eventBus } from '@core/events/eventBus.js';
import { createStore } from '@core/store/createStore.js';

// Store local para categorias
export const categoriesStore = createStore({
  categories: [],
  loading: false,
  error: null
});

// Listeners ativos
let listeners = new Map();

// Carregar categorias do orçamento
export async function loadCategories(budgetId) {
  try {
    categoriesStore.setState({ loading: true, error: null });
    let categories = await categoriesRepo.list({ budgetId });
    // Fallback legado: algumas categorias antigas podem não ter budgetId
    try {
      if ((!categories || categories.length === 0) && typeof window !== 'undefined') {
        const userId = window.appState?.currentUser?.uid;
        const budgets = window.appState?.budgets || [];
        const isMultiBudget = Array.isArray(budgets) && budgets.length > 1;
        if (userId) {
          const all = await categoriesRepo.list({ userId });
          // Em multi-orçamentos, não exibir itens sem budgetId para evitar vazamento
          categories = isMultiBudget
            ? (all || []).filter(c => c.budgetId === budgetId)
            : (all || []).filter(c => !c.budgetId || c.budgetId === budgetId);
        }
      }
    } catch {}
    categoriesStore.setState({ categories, loading: false });
    // Atualizar estado global legado
    try {
      if (typeof window !== 'undefined') {
        window.appState = window.appState || {};
        window.appState.categories = categories;
      }
    } catch {}
      console.log('[DEBUG] Categorias carregadas para o orçamento', budgetId, categories);
    return categories;
  } catch (error) {
    categoriesStore.setState({ error: error.message, loading: false });
    throw error;
  }
}

// Iniciar listener para categorias
export function startCategoriesListener(budgetId) {
  if (listeners.has(budgetId)) {
    return;
  }

  const unsubscribe = categoriesRepo.listenToChanges(budgetId, (categories) => {
    categoriesStore.setState({ categories });
    eventBus.emit('categories:updated', { budgetId, categories });
  });

  listeners.set(budgetId, unsubscribe);
}

// Parar listener
export function stopCategoriesListener(budgetId) {
  const unsubscribe = listeners.get(budgetId);
  if (unsubscribe) {
    unsubscribe();
    listeners.delete(budgetId);
  }
}

// CRUD operations
export async function createCategory(data) {
  try {
    // Garantir metadados essenciais
    const enriched = { ...data };
    try {
      const curBudgetId = enriched.budgetId || (typeof window !== 'undefined' ? window?.appState?.currentBudget?.id : undefined);
      const curUserId = enriched.userId || (typeof window !== 'undefined' ? window?.appState?.currentUser?.uid : undefined);
      if (curBudgetId) { enriched.budgetId = curBudgetId; }
      if (curUserId) { enriched.userId = curUserId; }
    } catch {}

    const id = await categoriesRepo.create(enriched);
    const category = { id, ...enriched };
    eventBus.emit('category:created', category);
    // Atualização otimista do store e estado global
    try {
      const cur = categoriesStore.getState().categories || [];
      const exists = cur.some(c => c.id === id);
      if (!exists) {
        const next = [...cur, category];
        next.sort((a, b) => (a.nome || '').localeCompare(b.nome || ''));
        categoriesStore.setState({ categories: next });
      }
      if (typeof window !== 'undefined') {
        window.appState = window.appState || {};
        const gc = Array.isArray(window.appState.categories) ? window.appState.categories : [];
        if (!gc.some(c => c.id === id)) {
          const n2 = [...gc, category];
          n2.sort((a, b) => (a.nome || '').localeCompare(b.nome || ''));
          window.appState.categories = n2;
        }
      }
    } catch {}
    // Enviar notificação de categoria criada (orçamento compartilhado)
    try {
      const budgetId = category.budgetId || (typeof window !== 'undefined' ? window?.appState?.currentBudget?.id : undefined);
      const senderUid = category.userId || (typeof window !== 'undefined' ? window?.appState?.currentUser?.uid : undefined);
      if (budgetId && senderUid) {
        const { sendCategoryChangeNotification } = await import('@features/notifications/NotificationService.js');
        await sendCategoryChangeNotification(budgetId, senderUid, category, 'category_added');
      }
    } catch (e) { console.warn('Falha ao notificar criação de categoria:', e); }

    return category;
  } catch (error) {
    eventBus.emit('error:category', error);
    throw error;
  }
}

export async function updateCategory(id, data) {
  try {
    // Obter snapshot anterior para compor changeSet na notificação
    let prev = null;
    try { prev = await categoriesRepo.getById?.(id); } catch {}

    await categoriesRepo.update(id, data);
    eventBus.emit('category:updated', { id, data });

    // Enviar notificação de atualização de categoria com changeSet
    try {
      const budgetId = data?.budgetId || prev?.budgetId || (typeof window !== 'undefined' ? window?.appState?.currentBudget?.id : undefined);
      const senderUid = data?.userId || prev?.userId || (typeof window !== 'undefined' ? window?.appState?.currentUser?.uid : undefined);
      if (budgetId && senderUid) {
        const category = { id, ...prev, ...data };
        const { sendCategoryChangeNotification } = await import('@features/notifications/NotificationService.js');
        await sendCategoryChangeNotification(budgetId, senderUid, category, 'category_updated', prev || null);
      }
    } catch (e) { console.warn('Falha ao notificar atualização de categoria:', e); }
  } catch (error) {
    eventBus.emit('error:category', error);
    throw error;
  }
}

export async function deleteCategory(id) {
  try {
    // Obter snapshot para notificação antes de remover
    let snapshot = null;
    try { snapshot = await categoriesRepo.getById?.(id); } catch {}
    await categoriesRepo.remove(id);
    eventBus.emit('category:deleted', { id });

    // Enviar notificação de exclusão de categoria
    try {
      const budgetId = snapshot?.budgetId || (typeof window !== 'undefined' ? window?.appState?.currentBudget?.id : undefined);
      const senderUid = snapshot?.userId || (typeof window !== 'undefined' ? window?.appState?.currentUser?.uid : undefined);
      if (budgetId && senderUid) {
        const { sendCategoryChangeNotification } = await import('@features/notifications/NotificationService.js');
        const categoryData = snapshot ? { id, ...snapshot } : { id };
        await sendCategoryChangeNotification(budgetId, senderUid, categoryData, 'category_deleted', snapshot || null);
      }
    } catch (e) { console.warn('Falha ao notificar exclusão de categoria:', e); }
  } catch (error) {
    eventBus.emit('error:category', error);
    throw error;
  }
}

// Parar todos os listeners
export function stopAllListeners() {
  listeners.forEach(unsubscribe => unsubscribe());
  listeners.clear();
}

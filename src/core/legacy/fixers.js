// Shared legacy data fixers: ensure documents missing budgetId are stamped
// and refresh stores. Expose functions and also attach to window for UI buttons.

import { collection, query, where, getDocs, updateDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@js/firebase.js';
import * as categoriesRepo from '@data/repositories/categoriesRepo.js';

function getCtx() {
  const user = window.appState?.currentUser;
  const budget = window.appState?.currentBudget;
  return { user, budget };
}

async function reloadStores(budgetId, userId) {
  try {
    const [txSvc, catSvc, recSvc] = await Promise.all([
      import('@features/transactions/service.js'),
      import('@features/categories/service.js'),
      import('@features/recorrentes/service.js'),
    ]);
    await Promise.all([
      txSvc.loadTransactions(budgetId, userId),
      catSvc.loadCategories(budgetId),
      recSvc.loadRecorrentes(),
    ]);
  } catch (e) {
    console.warn('Fixers: failed to reload stores:', e);
  }
}

export async function corrigirCategoriasSemBudget(options = {}) {
  try {
    const { user, budget } = getCtx();
    if (!user || !budget) {
      if (!options.silent && window.Snackbar) window.Snackbar({ message: 'FaÃ§a login e selecione um orÃ§amento.', type: 'error' });
      return { corrigidas: 0 };
    }
    const multiBudget = Array.isArray(window.appState?.budgets) && window.appState.budgets.length > 1;
    const snap = await getDocs(query(collection(db, 'categories'), where('userId', '==', user.uid)));
    let corrigidas = 0;
    for (const d of snap.docs) {
      const data = d.data() || {};
      if (!data.budgetId) {
        if (multiBudget) {
          // Em mÃºltiplos orÃ§amentos, nÃ£o arriscar atribuiÃ§Ã£o errada automaticamente
          continue;
        } else {
          await updateDoc(d.ref, { budgetId: budget.id, updatedAt: serverTimestamp() });
          corrigidas++;
        }
      }
    }
    await reloadStores(budget.id, user.uid);
    if (!options.silent && window.Snackbar) {
      const msg = (Array.isArray(window.appState?.budgets) && window.appState.budgets.length > 1 && corrigidas === 0)
        ? 'Categorias antigas sem budgetId foram mantidas (mÃºltiplos orÃ§amentos).'
        : `${corrigidas} categorias corrigidas com budgetId`;
      window.Snackbar({ message: msg, type: 'success' });
    }
    return { corrigidas };
  } catch (e) {
    console.error('Erro ao corrigir categorias sem budgetId:', e);
    if (!options.silent && window.Snackbar) window.Snackbar({ message: 'Erro ao corrigir categorias', type: 'error' });
    return { corrigidas: 0, error: e };
  }
}

export async function corrigirTransacoesSemBudget(options = {}) {
  try {
    const { user, budget } = getCtx();
    if (!user || !budget) {
      if (!options.silent && window.Snackbar) window.Snackbar({ message: 'FaÃ§a login e selecione um orÃ§amento.', type: 'error' });
      return { corrigidas: 0 };
    }
    const multiBudget = Array.isArray(window.appState?.budgets) && window.appState.budgets.length > 1;
    // Construir mapa categoriaId -> budgetId para inferÃªncia segura
    let catMap = new Map();
    try {
      const allCats = await categoriesRepo.list({ userId: user.uid });
      for (const c of allCats || []) {
        if (c.id && c.budgetId) catMap.set(c.id, c.budgetId);
      }
    } catch {}
    const snap = await getDocs(query(collection(db, 'transactions'), where('userId', '==', user.uid)));
    let corrigidas = 0;
    for (const d of snap.docs) {
      const data = d.data() || {};
      if (!data.budgetId) {
        if (multiBudget) {
          // Em mÃºltiplos orÃ§amentos, atribuir apenas se houver categoria com budgetId conhecido
          const catId = data.categoryId || data.categoriaId;
          const inferred = catId ? catMap.get(catId) : null;
          if (inferred) {
            await updateDoc(d.ref, { budgetId: inferred, updatedAt: serverTimestamp() });
            corrigidas++;
          } else {
            // Sem inferÃªncia, nÃ£o atribuir para evitar vazamento entre orÃ§amentos
          }
        } else {
          await updateDoc(d.ref, { budgetId: budget.id, updatedAt: serverTimestamp() });
          corrigidas++;
        }
      }
    }
    await reloadStores(budget.id, user.uid);
    if (!options.silent && window.Snackbar) {
      const msg = (multiBudget && corrigidas === 0)
        ? 'TransaÃ§Ãµes antigas sem budgetId foram mantidas (mÃºltiplos orÃ§amentos).'
        : `${corrigidas} transaÃ§Ãµes corrigidas com budgetId`;
      window.Snackbar({ message: msg, type: 'success' });
    }
    return { corrigidas };
  } catch (e) {
    console.error('Erro ao corrigir transaÃ§Ãµes sem budgetId:', e);
    if (!options.silent && window.Snackbar) window.Snackbar({ message: 'Erro ao corrigir transaÃ§Ãµes', type: 'error' });
    return { corrigidas: 0, error: e };
  }
}

export async function corrigirRecorrentesSemBudget(options = {}) {
  try {
    const { user, budget } = getCtx();
    if (!user || !budget) {
      if (!options.silent && window.Snackbar) window.Snackbar({ message: 'FaÃ§a login e selecione um orÃ§amento.', type: 'error' });
      return { corrigidas: 0 };
    }
    const multiBudget = Array.isArray(window.appState?.budgets) && window.appState.budgets.length > 1;
    // Mapa de categorias para inferÃªncia
    let catMap = new Map();
    try {
      const allCats = await categoriesRepo.list({ userId: user.uid });
      for (const c of allCats || []) {
        if (c.id && c.budgetId) catMap.set(c.id, c.budgetId);
      }
    } catch {}
    const snap = await getDocs(query(collection(db, 'recorrentes'), where('userId', '==', user.uid)));
    let corrigidas = 0;
    for (const d of snap.docs) {
      const data = d.data() || {};
      if (!data.budgetId) {
        if (multiBudget) {
          const catId = data.categoryId || data.categoriaId;
          const inferred = catId ? catMap.get(catId) : null;
          if (inferred) {
            await updateDoc(d.ref, { budgetId: inferred, updatedAt: serverTimestamp() });
            corrigidas++;
          } else {
            // sem inferÃªncia segura, nÃ£o atribuir
          }
        } else {
          await updateDoc(d.ref, { budgetId: budget.id, updatedAt: serverTimestamp() });
          corrigidas++;
        }
      }
    }
    await reloadStores(budget.id, user.uid);
    if (!options.silent && window.Snackbar) {
      const msg = (multiBudget && corrigidas === 0)
        ? 'Recorrentes antigas sem budgetId foram mantidas (mÃºltiplos orÃ§amentos).'
        : `${corrigidas} recorrentes corrigidas com budgetId`;
      window.Snackbar({ message: msg, type: 'success' });
    }
    return { corrigidas };
  } catch (e) {
    console.error('Erro ao corrigir recorrentes sem budgetId:', e);
    if (!options.silent && window.Snackbar) window.Snackbar({ message: 'Erro ao corrigir recorrentes', type: 'error' });
    return { corrigidas: 0, error: e };
  }
}

export async function corrigirTudoSemBudget(options = {}) {
  try {
    if (!options.silent && window.Snackbar) window.Snackbar({ message: 'Iniciando correÃ§Ã£o de dados antigos...', type: 'info' });
    const r1 = await corrigirCategoriasSemBudget({ silent: !!options.silent });
    const r2 = await corrigirTransacoesSemBudget({ silent: !!options.silent });
    const r3 = await corrigirRecorrentesSemBudget({ silent: !!options.silent });
    if (!options.silent && window.Snackbar) window.Snackbar({ message: 'CorreÃ§Ã£o concluÃ­da.', type: 'success' });
    return { categorias: r1.corrigidas, transacoes: r2.corrigidas, recorrentes: r3.corrigidas };
  } catch (e) {
    console.error('Erro ao executar correÃ§Ãµes:', e);
    if (!options.silent && window.Snackbar) window.Snackbar({ message: 'Erro ao executar correÃ§Ãµes', type: 'error' });
    return { categorias: 0, transacoes: 0, recorrentes: 0, error: e };
  }
}

// Global migrator: for multi-budget users, assign budgetId on orphan tx/rec by inferring from category mapping.
export async function migrarOrfaosPorCategoria(options = {}) {
  try {
    const user = window.appState?.currentUser || window.appState?.user;
    if (!user?.uid) return { tx: 0, rec: 0 };
    const budgets = window.appState?.budgets || [];
    const isMultiBudget = Array.isArray(budgets) && budgets.length > 1;
    if (!isMultiBudget) return { tx: 0, rec: 0 };

    // Build categoryId -> budgetId map for all categories of the user
    const catMap = new Map();
    try {
      const allCats = await categoriesRepo.list({ userId: user.uid });
      for (const c of allCats || []) {
        if (c.id && c.budgetId) catMap.set(c.id, c.budgetId);
      }
    } catch {}

    let txCorr = 0; let recCorr = 0;
    // Transactions without budgetId
    const txSnap = await getDocs(query(collection(db, 'transactions'), where('userId', '==', user.uid)));
    for (const d of txSnap.docs) {
      const data = d.data() || {};
      if (!data.budgetId) {
        const catId = data.categoryId || data.categoriaId;
        const inferred = catId ? catMap.get(catId) : null;
        if (inferred) {
          await updateDoc(d.ref, { budgetId: inferred, updatedAt: serverTimestamp() });
          txCorr++;
        }
      }
    }

    // Recorrentes without budgetId
    const recSnap = await getDocs(query(collection(db, 'recorrentes'), where('userId', '==', user.uid)));
    for (const d of recSnap.docs) {
      const data = d.data() || {};
      if (!data.budgetId) {
        const catId = data.categoryId || data.categoriaId;
        const inferred = catId ? catMap.get(catId) : null;
        if (inferred) {
          await updateDoc(d.ref, { budgetId: inferred, updatedAt: serverTimestamp() });
          recCorr++;
        }
      }
    }

    // Refresh stores for current budget view
    try {
      const curBudgetId = window.appState?.currentBudget?.id;
      const curUserId = user.uid;
      if (curBudgetId) await reloadStores(curBudgetId, curUserId);
    } catch {}

    if (!options.silent && window.Snackbar) window.Snackbar({ message: `MigraÃ§Ã£o: ${txCorr} transaÃ§Ãµes e ${recCorr} recorrentes atribuÃ­das por categoria`, type: 'success' });
    return { tx: txCorr, rec: recCorr };
  } catch (e) {
    console.warn('MigraÃ§Ã£o global por categoria falhou:', e);
    if (!options.silent && window.Snackbar) window.Snackbar({ message: 'Erro na migraÃ§Ã£o global', type: 'error' });
    return { tx: 0, rec: 0, error: e };
  }
}

// Scoped fixer: assign budgetId ONLY for current budget by using category->budget mapping
export async function corrigirOrfaosDoOrcamento(options = {}) {
  try {
    const { user, budget } = getCtx();
    if (!user?.uid || !budget?.id) {
      if (!options.silent && window.Snackbar) window.Snackbar({ message: 'FaÃ§a login e selecione um orÃ§amento.', type: 'error' });
      return { tx: 0, rec: 0 };
    }

    // Build set of categoryIds that belong to the current budget
    const catSet = new Set();
    try {
      const allCats = await categoriesRepo.list({ userId: user.uid });
      for (const c of allCats || []) {
        if (c.id && c.budgetId === budget.id) catSet.add(c.id);
      }
    } catch {}

    let txCorr = 0; let recCorr = 0;
    // Transactions without budgetId but category in this budget
    const txSnap = await getDocs(query(collection(db, 'transactions'), where('userId', '==', user.uid)));
    for (const d of txSnap.docs) {
      const data = d.data() || {};
      if (!data.budgetId) {
        const catId = data.categoryId || data.categoriaId;
        if (catId && catSet.has(catId)) {
          await updateDoc(d.ref, { budgetId: budget.id, updatedAt: serverTimestamp() });
          txCorr++;
        }
      }
    }

    // Recorrentes without budgetId but category in this budget
    const recSnap = await getDocs(query(collection(db, 'recorrentes'), where('userId', '==', user.uid)));
    for (const d of recSnap.docs) {
      const data = d.data() || {};
      if (!data.budgetId) {
        const catId = data.categoryId || data.categoriaId;
        if (catId && catSet.has(catId)) {
          await updateDoc(d.ref, { budgetId: budget.id, updatedAt: serverTimestamp() });
          recCorr++;
        }
      }
    }

    // Refresh only current budget stores
    try { await reloadStores(budget.id, user.uid); } catch {}

    if (!options.silent && window.Snackbar) window.Snackbar({ message: `CorreÃ§Ã£o do orÃ§amento: ${txCorr} transaÃ§Ãµes e ${recCorr} recorrentes atribuÃ­das`, type: 'success' });
    return { tx: txCorr, rec: recCorr };
  } catch (e) {
    console.warn('CorreÃ§Ã£o por orÃ§amento falhou:', e);
    if (!options.silent && window.Snackbar) window.Snackbar({ message: 'Erro na correÃ§Ã£o do orÃ§amento', type: 'error' });
    return { tx: 0, rec: 0, error: e };
  }
}

// Attach to window for legacy inline onclick usage in Settings
if (typeof window !== 'undefined') {
  if (typeof window.corrigirCategoriasSemBudget !== 'function') window.corrigirCategoriasSemBudget = (opts) => corrigirCategoriasSemBudget(opts);
  if (typeof window.corrigirTransacoesSemBudget !== 'function') window.corrigirTransacoesSemBudget = (opts) => corrigirTransacoesSemBudget(opts);
  if (typeof window.corrigirRecorrentesSemBudget !== 'function') window.corrigirRecorrentesSemBudget = (opts) => corrigirRecorrentesSemBudget(opts);
  if (typeof window.corrigirTudoSemBudget !== 'function') window.corrigirTudoSemBudget = (opts) => corrigirTudoSemBudget(opts);
  if (typeof window.migrarOrfaosPorCategoria !== 'function') window.migrarOrfaosPorCategoria = (opts) => migrarOrfaosPorCategoria(opts);
  if (typeof window.corrigirOrfaosDoOrcamento !== 'function') window.corrigirOrfaosDoOrcamento = (opts) => corrigirOrfaosDoOrcamento(opts);
}

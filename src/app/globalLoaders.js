// Garantir que as funções globais de carregamento usem sempre o orçamento selecionado
import * as transactionsService from '../features/transactions/service.js';
import * as categoriesService from '../features/categories/service.js';
import { loadRecorrentes } from '../features/recorrentes/service.js';

window.loadTransactions = async function() {
  const budgetId = window.appState?.currentBudget?.id;
  const userId = window.appState?.currentUser?.uid;
  return transactionsService.loadTransactions(budgetId, userId);
};

window.loadCategories = async function() {
  const budgetId = window.appState?.currentBudget?.id;
  const userId = window.appState?.currentUser?.uid;
  return categoriesService.loadCategories(budgetId, userId);
};

window.loadRecorrentes = async function() {
  return loadRecorrentes();
};

// Garantir que as funções globais de carregamento usem sempre o orçamento selecionado
import * as transactionsService from '../features/transactions/service.js';
import * as categoriesService from '../features/categories/service.js';
import { loadRecorrentes } from '../features/recorrentes/service.js';
import showAddCategoryModal from '../js/showAddCategoryModal.js';
import showAddTransactionModal from '../js/showAddTransactionModal.js';
import '../js/showAddRecorrenteModal.js'; // Importar para registrar funções globais
import '../js/dark-mode-enforcer.js'; // Força contraste no modo escuro
import '../js/native-biometric.js'; // Biometria nativa para APK
import * as notificationService from '../features/notifications/NotificationService.js'; // Sistema de notificações

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

// Expor função de modal de categoria globalmente
window.showAddCategoryModal = showAddCategoryModal;

// Expor função de modal de transação globalmente
window.showAddTransactionModal = showAddTransactionModal;
console.log('✅ [GlobalLoaders] showAddTransactionModal exposta globalmente:', typeof window.showAddTransactionModal);

// Expor funções de notificação globalmente
window.sendTransactionNotification = notificationService.sendTransactionNotification;
window.sendTransactionUpdatedNotification = notificationService.sendTransactionUpdatedNotification;
window.sendTransactionDeletedNotification = notificationService.sendTransactionDeletedNotification;
window.sendCategoryChangeNotification = notificationService.sendCategoryChangeNotification;
window.sendRecorrenteChangeNotification = notificationService.sendRecorrenteChangeNotification;
console.log('✅ [GlobalLoaders] Funções de notificação expostas globalmente:', {
  sendTransactionNotification: typeof window.sendTransactionNotification,
  sendTransactionUpdatedNotification: typeof window.sendTransactionUpdatedNotification,
  sendTransactionDeletedNotification: typeof window.sendTransactionDeletedNotification
});


// Expor funções de notificação globalmente
window.sendTransactionNotification = notificationService.sendTransactionNotification;
window.sendTransactionUpdatedNotification = notificationService.sendTransactionUpdatedNotification;
window.sendTransactionDeletedNotification = notificationService.sendTransactionDeletedNotification;
window.sendCategoryChangeNotification = notificationService.sendCategoryChangeNotification;
window.sendRecorrenteChangeNotification = notificationService.sendRecorrenteChangeNotification;
console.log('✅ [GlobalLoaders] Funções de notificação expostas globalmente:', {
  sendTransactionNotification: typeof window.sendTransactionNotification,
  sendTransactionUpdatedNotification: typeof window.sendTransactionUpdatedNotification,
  sendTransactionDeletedNotification: typeof window.sendTransactionDeletedNotification
});

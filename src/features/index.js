// features/index.js - ExportaÃ§Ãµes centralizadas de todas as features

// Dashboard
// Temporarily use a minimal renderer to ensure clean dev imports; switch back to DashboardPage when stable
export { renderDashboard } from './dashboard/DashboardSimple.js';

// Transactions
export {
  renderTransactions,
  renderAllTransactions,
  renderFilteredTransactions,
  renderTransactionItemHTML,
  renderMonthSectionHTML,
  renderOlderMonthsControl,
  renderTransactionsGroupedByDay,
  calcularNumeroParcela,
  loadMonthSection,
  toggleDayGroup,
  expandAllDays,
  collapseAllDays,
  getTransactionDate,
  getTransactionYearMonth,
  formatTransactionDisplayDate,
  loadAllOlderMonths,
  getCollapsedDays,
  saveCollapsedDays,
  isDayCollapsed
} from './transactions/TransactionsPage.js';

export {
  addTransactionWithNotifications,
  updateTransactionWithNotifications,
  deleteTransactionWithNotifications
} from './transactions/service.js';

// Categories
export {
  renderCategories,
  renderAllCategories,
  renderFilteredCategories
} from './categories/CategoriesPage.js';

// Notifications
export {
  renderNotifications
} from './notifications/NotificationsPage.js';

export {
  sendTransactionNotification,
  sendTransactionDeletedNotification,
  sendTransactionUpdatedNotification,
  sendCategoryChangeNotification,
  leaveSharedBudget,
  removeUserFromBudget
} from './notifications/NotificationService.js';

// Recorrentes
export {
  render as renderRecorrentes
} from './recorrentes/RecorrentesPage.js';

// Backup & Export
export {
  downloadBackup,
  exportToExcel,
  exportToPDF,
  exportReadmePDF,
  showExportOptions
} from './backup/BackupService.js';

// Voice
export {
  parseNumeroPorExtenso,
  processTransactionVoice,
  processCategoryVoice,
  normalizarTexto,
  getVoiceSystem,
  openVoiceModal,
  closeVoiceModal,
  startVoiceRecognition,
  processVoiceCommand
} from './voice/VoiceService.js';

// UI
export {
  renderFAB,
  renderBottomNav,
  showLoading,
  resetScrollPosition
} from './ui/UIService.js';

// Config
export {
  setupHeaderButtons,
  setupCategoryButtons,
  setupTransactionButtons,
  setupDashboardButtons
} from './config/ConfigService.js';

// Navigation
export {
  setupNavigation
} from './navigation/NavigationService.js';

// Auth
export {
  setupLoginButton,
  checkAuthState,
  logout,
  toggleLoginPage
} from './auth/AuthService.js';

// Init
export {
  initializeApp,
  setupEventListeners
} from './init/InitService.js';

// Utils
export {
  formatCurrency,
  formatDate,
  calculatePercentage,
  normalizeText,
  debounce,
  throttle,
  generateId,
  isValidEmail,
  capitalizeFirst,
  truncateText,
  isNumeric,
  roundToTwoDecimals
} from './utils/UtilsService.js';

// Validation
export {
  validateTransaction,
  validateCategory,
  validateBudget,
  validateEmail,
  validatePassword,
  validateCPF,
  validatePhone
} from './validation/ValidationService.js';

// Calculations
export {
  calculateBudgetBalance,
  calculateCategoryTotals,
  calculateMonthlyStats,
  calculateTrends,
  calculateProjections
} from './calculations/CalculationService.js';

// Theme
export {
  setupThemeToggle,
  toggleTheme,
  applyTheme,
  applyCurrentTheme,
  applyCompactMode,
  toggleCompactMode,
  getCurrentTheme,
  getCurrentCompactMode,
  applyThemeSettings
} from './theme/ThemeService.js';

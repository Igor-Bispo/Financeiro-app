# 📚 API Documentation - Financeiro App

## 🏗️ Arquitetura

O aplicativo foi refatorado para seguir uma arquitetura **feature-first** com separação clara de responsabilidades:

```
src/
├── core/           # Funcionalidades essenciais
├── features/       # Funcionalidades principais organizadas por domínio
├── ui/            # Componentes de interface reutilizáveis
├── data/          # Camada de acesso a dados
└── app/           # Configuração de rotas e inicialização
```

## 🔧 Core Layer

### EventBus (`@core/events/eventBus.js`)

Sistema centralizado de eventos para comunicação entre componentes.

```javascript
import { eventBus, on, off, emit } from '@core/events/eventBus.js';

// Registrar listener
on('transaction:added', (transaction) => {
  console.log('Nova transação:', transaction);
});

// Emitir evento
emit('transaction:added', { id: '1', amount: 100 });

// Remover listener
off('transaction:added', listener);
```

**Eventos disponíveis:**
- `transaction:added` - Nova transação criada
- `transaction:updated` - Transação atualizada
- `transaction:deleted` - Transação removida
- `category:added` - Nova categoria criada
- `category:updated` - Categoria atualizada
- `category:deleted` - Categoria removida
- `budget:changed` - Orçamento alterado

### Global Utils (`@core/utils/globalUtils.js`)

Utilitários globais e gerenciamento de estado.

```javascript
import { globalState, globalFunctions, navigateTo } from '@core/utils/globalUtils.js';

// Estado global
globalState.currentUser = user;
globalState.currentBudget = budget;

// Funções globais
globalFunctions.showLoading(true);

// Navegação
navigateTo('/dashboard');
```

## 📊 Features Layer

### Dashboard (`@features/dashboard/DashboardPage.js`)

Página principal com visão geral das finanças.

```javascript
import { renderDashboard } from '@features/dashboard/DashboardPage.js';

// Renderizar dashboard
await renderDashboard();

// Renderizar com mês específico
await renderDashboard(2024, 3); // Março 2024
```

### Transactions (`@features/transactions/`)

Gerenciamento completo de transações.

#### TransactionsPage.js
```javascript
import { 
  renderTransactions,
  renderAllTransactions,
  renderFilteredTransactions,
  renderTransactionItemHTML
} from '@features/transactions/TransactionsPage.js';

// Renderizar transações
await renderTransactions();

// Renderizar todas as transações
await renderAllTransactions();

// Renderizar transações filtradas
await renderFilteredTransactions(filteredData);

// Renderizar item de transação
const html = renderTransactionItemHTML(transaction);
```

#### service.js
```javascript
import {
  addTransactionWithNotifications,
  updateTransactionWithNotifications,
  deleteTransactionWithNotifications
} from '@features/transactions/service.js';

// Adicionar transação com notificações
await addTransactionWithNotifications(transactionData);

// Atualizar transação com notificações
await updateTransactionWithNotifications(id, transactionData);

// Deletar transação com notificações
await deleteTransactionWithNotifications(id);
```

### Categories (`@features/categories/CategoriesPage.js`)

Gerenciamento de categorias de transações.

```javascript
import { 
  renderCategories,
  renderAllCategories,
  renderFilteredCategories
} from '@features/categories/CategoriesPage.js';

// Renderizar categorias
await renderCategories();

// Renderizar todas as categorias
await renderAllCategories();

// Renderizar categorias filtradas
await renderFilteredCategories(filteredCategories);
```

### Notifications (`@features/notifications/`)

Sistema de notificações em tempo real.

#### NotificationsPage.js
```javascript
import { renderNotifications } from '@features/notifications/NotificationsPage.js';

// Renderizar notificações
await renderNotifications();
```

#### NotificationService.js
```javascript
import {
  sendTransactionNotification,
  sendBudgetInviteNotification,
  sendCategoryLimitNotification,
  sendRecurringTransactionNotification
} from '@features/notifications/NotificationService.js';

// Enviar notificação de transação
await sendTransactionNotification(budgetId, senderUid, transactionData);

// Enviar convite para orçamento
await sendBudgetInviteNotification(budgetId, senderUid, recipientEmail);

// Notificar limite de categoria
await sendCategoryLimitNotification(categoryId, currentAmount, limit);

// Notificar transação recorrente
await sendRecurringTransactionNotification(transactionId);
```

### Backup & Export (`@features/backup/BackupService.js`)

Funcionalidades de backup e exportação.

```javascript
import {
  downloadBackup,
  exportToExcel,
  exportToPDF,
  exportReadmePDF,
  showExportOptions
} from '@features/backup/BackupService.js';

// Download de backup JSON
await downloadBackup();

// Exportar para Excel
await exportToExcel();

// Exportar para PDF
await exportToPDF();

// Exportar README em PDF
await exportReadmePDF();

// Mostrar opções de exportação
await showExportOptions();
```

### Voice (`@features/voice/VoiceService.js`)

Sistema de reconhecimento de voz.

```javascript
import {
  parseNumeroPorExtenso,
  processTransactionVoice,
  processCategoryVoice,
  openVoiceModal,
  closeVoiceModal,
  startVoiceRecognition
} from '@features/voice/VoiceService.js';

// Abrir modal de voz
openVoiceModal('transaction');

// Processar comando de voz para transação
await processTransactionVoice('comprar pão 5 reais despesa alimentação');

// Processar comando de voz para categoria
await processCategoryVoice('criar categoria alimentação despesa 500');

// Fechar modal de voz
closeVoiceModal();
```

### UI (`@features/ui/UIService.js`)

Componentes de interface principais.

```javascript
import {
  renderFAB,
  renderBottomNav,
  showLoading,
  resetScrollPosition
} from '@features/ui/UIService.js';

// Renderizar FAB (Floating Action Button)
renderFAB();

// Renderizar navegação inferior
renderBottomNav('/dashboard');

// Mostrar/esconder loading
showLoading(true);
showLoading(false);

// Resetar posição de scroll
resetScrollPosition();
```

### Utils (`@features/utils/UtilsService.js`)

Utilitários gerais para formatação e manipulação de dados.

```javascript
import {
  formatCurrency,
  formatDate,
  calculatePercentage,
  normalizeText,
  debounce,
  throttle,
  generateId
} from '@features/utils/UtilsService.js';

// Formatar moeda
formatCurrency(1234.56); // "R$ 1.234,56"

// Formatar data
formatDate(new Date()); // "25/12/2024"

// Calcular porcentagem
calculatePercentage(25, 100); // 25

// Normalizar texto (remover acentos)
normalizeText('São Paulo'); // "sao paulo"

// Debounce para inputs
const debouncedSearch = debounce(searchFunction, 300);

// Throttle para scroll
const throttledScroll = throttle(scrollFunction, 100);

// Gerar ID único
const id = generateId(); // "abc123def456"
```

### Validation (`@features/validation/ValidationService.js`)

Validações para formulários e dados.

```javascript
import {
  validateTransaction,
  validateCategory,
  validateBudget,
  validateEmail,
  validatePassword,
  validateCPF
} from '@features/validation/ValidationService.js';

// Validar transação
const transactionValidation = validateTransaction(transactionData);
if (!transactionValidation.isValid) {
  console.log('Erros:', transactionValidation.errors);
}

// Validar categoria
const categoryValidation = validateCategory(categoryData);

// Validar orçamento
const budgetValidation = validateBudget(budgetData);

// Validar email
const isValidEmail = validateEmail('user@example.com');

// Validar senha
const passwordValidation = validatePassword('MyPass123');

// Validar CPF
const isValidCPF = validateCPF('123.456.789-09');
```

### Calculations (`@features/calculations/CalculationService.js`)

Cálculos financeiros e estatísticas.

```javascript
import {
  calculateBudgetBalance,
  calculateCategoryTotals,
  calculateMonthlyStats,
  calculateTrends,
  calculateProjections
} from '@features/calculations/CalculationService.js';

// Calcular saldo do orçamento
const balance = calculateBudgetBalance(budgetId);
// { receitas: 5000, despesas: 3000, saldo: 2000, orcado: 4000 }

// Calcular totais por categoria
const categoryTotals = calculateCategoryTotals(budgetId, month);

// Calcular estatísticas mensais
const monthlyStats = calculateMonthlyStats(budgetId, 6);

// Calcular tendências
const trends = calculateTrends(budgetId, 3);
// { trend: 'crescimento', percentage: 15.5, change: 500 }

// Calcular projeções
const projections = calculateProjections(budgetId, 3);
```

### Theme (`@features/theme/ThemeService.js`)

Sistema de temas e configurações visuais.

```javascript
import {
  setupThemeToggle,
  toggleTheme,
  applyTheme,
  applyCompactMode,
  getCurrentTheme
} from '@features/theme/ThemeService.js';

// Configurar toggle de tema
setupThemeToggle();

// Alternar tema
toggleTheme();

// Aplicar tema específico
applyTheme('dark');

// Aplicar modo compacto
applyCompactMode();

// Obter tema atual
const currentTheme = getCurrentTheme(); // 'light' ou 'dark'
```

## 🎯 Uso Prático

### Exemplo de implementação de uma nova feature:

```javascript
// 1. Criar arquivo de serviço
// src/features/analytics/AnalyticsService.js
export function generateReport(budgetId, period) {
  // Lógica da feature
}

// 2. Adicionar ao índice
// src/features/index.js
export { generateReport } from './analytics/AnalyticsService.js';

// 3. Usar na aplicação
import { generateReport } from '@features/index.js';
const report = await generateReport(budgetId, 'monthly');
```

### Exemplo de comunicação entre features:

```javascript
// Em TransactionsService.js
import { eventBus } from '@core/events/eventBus.js';

export async function addTransaction(data) {
  // Salvar transação
  const transaction = await saveTransaction(data);
  
  // Emitir evento
  eventBus.emit('transaction:added', transaction);
  
  return transaction;
}

// Em DashboardPage.js
import { eventBus } from '@core/events/eventBus.js';

eventBus.on('transaction:added', (transaction) => {
  // Atualizar dashboard automaticamente
  updateDashboardStats();
});
```

## 🚀 Performance

- **Lazy Loading**: Todas as features são carregadas sob demanda
- **Code Splitting**: Bundle dividido em chunks otimizados
- **Tree Shaking**: Código não utilizado é removido automaticamente
- **Dynamic Imports**: Importações dinâmicas para melhor performance

## 🧪 Testes

```bash
# Executar todos os testes
npm test

# Executar testes específicos
npm test -- --grep "EventBus"

# Executar testes em modo watch
npm test -- --watch
```

## 📝 Convenções

- **Nomes de arquivos**: PascalCase para componentes, camelCase para serviços
- **Nomes de funções**: camelCase, descritivos
- **Eventos**: formato `domain:action` (ex: `transaction:added`)
- **Imports**: usar aliases `@features`, `@core`, `@ui`
- **Exports**: sempre usar named exports
- **Async/Await**: preferir sobre Promises para operações assíncronas

## 🔍 Debugging

```javascript
// Habilitar logs detalhados
localStorage.setItem('debug', 'true');

// Verificar estado do EventBus
console.log('EventBus listeners:', eventBus.listeners);

// Verificar estado global
console.log('Global state:', globalState);
```

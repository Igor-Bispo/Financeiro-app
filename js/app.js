// Definir funções globais ANTES de tudo
window.FinanceApp = {};

// Aplicação Principal - Controle Financeiro (Versão Aprimorada)
class FinanceApp {
    constructor() {
        this.isInitialized = false;
        this.currentUser = null;
        this.charts = {};
        this.currentLanguage = 'pt-BR';
        this.isDarkMode = localStorage.getItem('darkMode') === 'true';
        this.voiceRecognition = null;
        this.isListening = false;
        
        // Inicializar módulos de utilidade
        this.notifications = window.NotificationManager || {
            show(msg, type) { console.log(`${type}: ${msg}`); }
        };
        
        this.i18n = window.I18nManager || {
            setLanguage() {},
            t(key) { return key; }
        };
        
        // Inicializar módulos principais
        this.transactions = window.TransactionsModule;
        this.categorias = window.CategoriasModule;
        this.goals = window.GoalsModule;
        this.budgets = window.BudgetsModule;
        this.voice = window.FinanceVoice;
        
        console.log('FinanceApp construída');
        
        this.init();
    }

    async init() {
        try {
            console.log('🚀 Inicializando aplicação...');
            
            this.loadUserSettings();
            this.setupForms();
            this.setCurrentDate();
            this.setupKeyboardShortcuts();
            this.setupEventDelegation();
            this.setupTouchGestures();
            this.setupMobileOptimizations();
            
            // Configurar listeners de autenticação primeiro
            this.setupAuthListeners();
            
            // Configurar gráficos se Chart.js estiver disponível
            if (typeof Chart !== 'undefined') {
                await this.setupCharts();
            }
            
            this.isInitialized = true;
            console.log('✅ Aplicação inicializada com sucesso');
        } catch (error) {
            console.error('❌ Erro ao inicializar aplicação:', error);
        }
    }

    async loadInitialData() {
        console.log('📊 Carregando dados iniciais...');
        
        // Carregar dados do localStorage
        await this.loadTransactions();
        await this.loadCategorias();
        await this.loadGoals();
        await this.loadBudgets();
        await this.updateSummaryCards();
        
        console.log('✅ Dados iniciais carregados');
    }

    loadUserSettings() {
        const darkMode = localStorage.getItem('darkMode') === 'true';
        if (darkMode) document.body.classList.add('dark-mode');
        const lang = localStorage.getItem('language') || 'pt-BR';
        this.i18n.setLanguage(lang);
    }

    toggleDarkMode() {
        document.body.classList.toggle('dark-mode');
        localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
        this.notifications.show('Modo escuro ' + (document.body.classList.contains('dark-mode') ? 'ativado' : 'desativado'));
    }

    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.key === 'n') {
                showTransactionModal();
            }
            if (e.ctrlKey && e.key === 'd') {
                this.toggleDarkMode();
            }
        });
    }

    async setupCharts() {
        // Inicializar gráficos com Chart.js
        const ctx1 = document.getElementById('incomeExpenseChart').getContext('2d');
        const ctx2 = document.getElementById('categoryChart').getContext('2d');
        this.charts.incomeExpense = new Chart(ctx1, {
            type: 'bar',
            data: await this.getIncomeExpenseData(),
            options: {
                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: 'Receitas vs Despesas'
                    },
                    legend: {
                        labels: {
                            generateLabels: (chart) => [
                                { text: 'Receitas', fillStyle: '#10b981' },
                                { text: 'Despesas', fillStyle: '#ef4444' }
                            ]
                        }
                    }
                }
            }
        });
        this.charts.categoryDistribution = new Chart(ctx2, {
            type: 'doughnut',
            data: await this.getCategoryData(),
            options: {
                responsive: true,
                plugins: {
                    legend: { position: 'bottom', labels: { generateLabels: (chart) => chart.data.labels.map((label, i) => ({ text: label, fillStyle: chart.data.datasets[0].backgroundColor[i] })) } },
                    title: {
                        display: true,
                        text: 'Distribuição por Categoria'
                    }
                }
            }
        });
    }

    async getIncomeExpenseData() {
        // Exemplo: use dados reais do TransactionsModule
        return {
            labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
            datasets: [
                {
                    label: 'Receitas',
                    data: [1200, 1900, 1500, 1800, 2100, 1900],
                    backgroundColor: '#10b981',
                },
                {
                    label: 'Despesas',
                    data: [800, 1100, 900, 1200, 1500, 1300],
                    backgroundColor: '#ef4444',
                }
            ]
        };
    }

    async getCategoryData() {
        // Exemplo: use dados reais do TransactionsModule
        return {
            labels: ['Alimentação', 'Transporte', 'Lazer', 'Moradia', 'Outros'],
            datasets: [{
                data: [35, 25, 15, 20, 5],
                backgroundColor: [
                    '#3b82f6',
                    '#6366f1',
                    '#8b5cf6',
                    '#ec4899',
                    '#f97316'
                ],
            }]
        };
    }

    async exportToPDF() {
        try {
            if (window.PDFModule && window.PDFModule.exportToPDF) {
                await window.PDFModule.exportToPDF();
            } else {
                console.warn('Módulo PDF não disponível');
            }
        } catch (error) {
            console.error('Erro ao gerar PDF:', error);
        }
    }

    // Métodos de estado da interface
    showLoadingState(message = 'Carregando...') {
        const loadingEl = document.getElementById('loadingState');
        const mainContent = document.getElementById('mainContent');
        
        if (loadingEl) {
            loadingEl.innerHTML = `
                <div class="loading-container">
                    <div class="loading-spinner"></div>
                    <p class="loading-text">${message}</p>
                </div>
            `;
            loadingEl.style.display = 'block';
        }
        
        if (mainContent) {
            mainContent.style.display = 'none';
        }
    }

    hideLoadingState() {
        const loadingEl = document.getElementById('loadingState');
        const mainContent = document.getElementById('mainContent');
        
        if (loadingEl) {
            loadingEl.style.display = 'none';
        }
        
        if (mainContent) {
            mainContent.style.display = 'block';
        }
    }

    showErrorState(message) {
        const loadingEl = document.getElementById('loadingState');
        const mainContent = document.getElementById('mainContent');
        
        if (loadingEl) {
            loadingEl.innerHTML = `
                <div class="error-container">
                    <div class="error-icon">❌</div>
                    <p class="error-text">${message}</p>
                    <button class="btn btn-primary" onclick="location.reload()">Tentar Novamente</button>
                </div>
            `;
            loadingEl.style.display = 'block';
        }
        
        if (mainContent) {
            mainContent.style.display = 'none';
        }
    }

    showWelcomeMessage(user) {
        const userName = user.displayName || user.email || 'Usuário';
        this.notifications.show(`Bem-vindo(a), ${userName}!`, 'success');
    }

    showLoginPrompt() {
        const mainContent = document.getElementById('mainContent');
        if (mainContent) {
            mainContent.innerHTML = `
                <div class="login-prompt">
                    <div class="login-prompt-content">
                        <h2>Bem-vindo ao Controle Financeiro</h2>
                        <p>Faça login para acessar seus dados e começar a gerenciar suas finanças.</p>
                        <button class="btn btn-primary" onclick="window.AuthModule && window.AuthModule.login()">
                            🔐 Fazer Login
                        </button>
                    </div>
                </div>
            `;
            mainContent.style.display = 'block';
        }
    }

    clearAllData() {
        // Limpar caches
        this.transactionsCache = [];
        this.categoriasCache = [];
        
        // Limpar interface
        this.renderTransactions([]);
        this.renderCategorias([]);
        this.renderGoals([]);
        this.renderBudgets([]);
        this.updateSummaryCards();
        
        // Limpar formulários
        const forms = ['transactionForm', 'categoryForm', 'goalForm', 'budgetForm'];
        forms.forEach(formId => {
            const form = document.getElementById(formId);
            if (form) form.reset();
        });
    }

    updateUIForAuth(user) {
        const userName = document.getElementById('userName');
        const userAvatar = document.getElementById('userAvatar');
        const loginBtn = document.getElementById('loginBtn');
        const logoutBtn = document.getElementById('logoutBtn');

        if (user) {
            if (userName) userName.textContent = user.displayName || user.email || user.name;
            if (userAvatar) userAvatar.textContent = user.photoURL ? '🖼️' : '👤';
            if (loginBtn) loginBtn.classList.add('hidden');
            if (logoutBtn) logoutBtn.classList.remove('hidden');
        } else {
            if (userName) userName.textContent = 'Faça login';
            if (userAvatar) userAvatar.textContent = '👤';
            if (loginBtn) loginBtn.classList.remove('hidden');
            if (logoutBtn) logoutBtn.classList.add('hidden');
        }
    }

    setCurrentDate() {
        const today = new Date().toISOString().split('T')[0];
        document.getElementById('transactionDate').value = today;
        document.getElementById('goalDeadline').value = today;
    }

    setupForms() {
        // Formulário de transação
        const transactionForm = document.getElementById('transactionForm');
        if (transactionForm) {
            transactionForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                await this.handleTransactionSubmit();
            });
        }

        // Formulário de categoria
        const categoryForm = document.getElementById('categoryForm');
        if (categoryForm) {
            categoryForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                await this.handleCategorySubmit();
            });
        }

        // Formulário de meta
        const goalForm = document.getElementById('goalForm');
        if (goalForm) {
            goalForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                await this.handleGoalSubmit();
            });
        }

        // Formulário de orçamento
        const budgetForm = document.getElementById('budgetForm');
        if (budgetForm) {
            budgetForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                await this.handleBudgetSubmit();
            });
        }
    }

    async handleTransactionSubmit() {
        try {
            const transactionId = document.getElementById('transactionId').value;
            const categorySelect = document.getElementById('transactionCategory');
            const categoryId = categorySelect.value;
            
            // Obter o nome da categoria de forma mais segura
            let categoryName = 'Sem categoria';
            if (categoryId && categorySelect.selectedIndex > 0) {
                categoryName = categorySelect.options[categorySelect.selectedIndex].text;
            }
            
            // Debug: Log das informações da categoria
            console.log('🔍 Debug - Categoria selecionada:', {
                categoryId: categoryId,
                categoryName: categoryName,
                selectedIndex: categorySelect.selectedIndex,
                totalOptions: categorySelect.options.length
            });
            
            const formData = {
                title: document.getElementById('transactionTitle').value,
                amount: parseFloat(document.getElementById('transactionAmount').value),
                type: document.getElementById('transactionType').value,
                categoryId: categoryId,
                categoryName: categoryName, // Incluir nome da categoria
                date: document.getElementById('transactionDate').value
            };

            // Debug: Log dos dados da transação
            console.log('🔍 Debug - Dados da transação:', formData);

            if (transactionId) {
                // Modo edição
                await this.transactions.updateTransaction(transactionId, formData);
                this.notifications.show('Transação atualizada com sucesso!', 'success');
                
                // Notificação inteligente
                if (window.NotificationManager) {
                    window.NotificationManager.showNotification(
                        'Transação Atualizada',
                        `Transação "${formData.title}" foi atualizada com sucesso!`,
                        'success',
                        { category: 'transaction', data: formData }
                    );
                }
            } else {
                // Modo criação
                await this.transactions.addTransaction(formData);
                this.notifications.show('Transação adicionada com sucesso!', 'success');
                
                // Notificação inteligente
                if (window.NotificationManager) {
                    const notificationType = formData.type === 'expense' ? 'warning' : 'success';
                    const icon = formData.type === 'expense' ? '💸' : '💰';
                    
                    window.NotificationManager.showNotification(
                        'Transação Adicionada',
                        `${icon} ${formData.title} - ${this.formatCurrency(formData.amount)}`,
                        notificationType,
                        { category: 'transaction', data: formData }
                    );
                }
            }
            
            // Limpar formulário e fechar modal
            document.getElementById('transactionForm').reset();
            document.getElementById('transactionId').value = '';
            closeModal('transactionModal');
            
            // Recarregar dados
            await this.loadTransactions();
            await this.loadCategorias(); // Recarregar categorias para atualizar saldos
            this.updateSummaryCards();
            this.updateCharts();
            
        } catch (error) {
            console.error('Erro ao salvar transação:', error);
            this.notifications.show('Erro ao salvar transação', 'error');
            
            // Notificação de erro
            if (window.NotificationManager) {
                window.NotificationManager.showNotification(
                    'Erro ao Salvar',
                    'Ocorreu um erro ao salvar a transação. Tente novamente.',
                    'error',
                    { category: 'error', data: { error: error.message } }
                );
            }
        }
    }

    async handleCategorySubmit() {
        try {
            const formData = {
                name: document.getElementById('categoryName').value,
                color: document.getElementById('categoryColor').value,
                type: document.getElementById('categoryType').value
            };

            await this.categorias.addCategory(formData);
            
            // Limpar formulário e fechar modal
            document.getElementById('categoryForm').reset();
            closeModal('categoryModal');
            
            // Recarregar dados
            await this.loadCategorias();
            this.updateSummaryCards(); // Atualizar cards de resumo
            
            this.notifications.show('Categoria adicionada com sucesso!', 'success');
            
            // Notificação inteligente
            if (window.NotificationManager) {
                window.NotificationManager.showNotification(
                    'Categoria Criada',
                    `📂 Nova categoria "${formData.name}" criada com sucesso!`,
                    'success',
                    { category: 'category', data: formData }
                );
            }
            
        } catch (error) {
            console.error('Erro ao adicionar categoria:', error);
            this.notifications.show('Erro ao adicionar categoria', 'error');
            
            // Notificação de erro
            if (window.NotificationManager) {
                window.NotificationManager.showNotification(
                    'Erro ao Criar Categoria',
                    'Ocorreu um erro ao criar a categoria. Tente novamente.',
                    'error',
                    { category: 'error', data: { error: error.message } }
                );
            }
        }
    }

    async handleGoalSubmit() {
        try {
            const formData = {
                title: document.getElementById('goalTitle').value,
                target: parseFloat(document.getElementById('goalTarget').value),
                current: parseFloat(document.getElementById('goalCurrent').value),
                deadline: document.getElementById('goalDeadline').value
            };

            await this.goals.addGoal(formData);
            
            // Limpar formulário e fechar modal
            document.getElementById('goalForm').reset();
            closeModal('goalModal');
            
            // Recarregar dados
            await this.loadGoals();
            
            this.notifications.show('Meta adicionada com sucesso!', 'success');
            
            // Notificação inteligente
            if (window.NotificationManager) {
                const progress = (formData.current / formData.target) * 100;
                const daysLeft = this.calculateDaysLeft(formData.deadline);
                
                window.NotificationManager.showNotification(
                    'Meta Criada',
                    `🎯 "${formData.title}" - ${progress.toFixed(0)}% concluído (${daysLeft} dias restantes)`,
                    'info',
                    { category: 'goal', data: { ...formData, progress, daysLeft } }
                );
            }
            
        } catch (error) {
            console.error('Erro ao adicionar meta:', error);
            this.notifications.show('Erro ao adicionar meta', 'error');
            
            // Notificação de erro
            if (window.NotificationManager) {
                window.NotificationManager.showNotification(
                    'Erro ao Criar Meta',
                    'Ocorreu um erro ao criar a meta. Tente novamente.',
                    'error',
                    { category: 'error', data: { error: error.message } }
                );
            }
        }
    }

    async handleBudgetSubmit() {
        try {
            const formData = {
                categoryId: document.getElementById('budgetCategory').value,
                amount: parseFloat(document.getElementById('budgetAmount').value)
            };

            await this.budgets.addBudget(formData);
            
            // Limpar formulário e fechar modal
            document.getElementById('budgetForm').reset();
            closeModal('budgetModal');
            
            // Recarregar dados
            await this.loadBudgets();
            await this.loadCategorias(); // Recarregar categorias para atualizar os limites
            this.updateSummaryCards(); // Atualizar cards de resumo
            
            this.notifications.show('Orçamento adicionado com sucesso!', 'success');
            
            // Notificação inteligente
            if (window.NotificationManager) {
                const categoryName = this.getCategoryName(formData.categoryId);
                
                window.NotificationManager.showNotification(
                    'Orçamento Definido',
                    `💰 Orçamento de ${this.formatCurrency(formData.amount)} para ${categoryName}`,
                    'info',
                    { category: 'budget', data: formData }
                );
            }
            
        } catch (error) {
            console.error('Erro ao adicionar orçamento:', error);
            this.notifications.show('Erro ao adicionar orçamento', 'error');
            
            // Notificação de erro
            if (window.NotificationManager) {
                window.NotificationManager.showNotification(
                    'Erro ao Criar Orçamento',
                    'Ocorreu um erro ao criar o orçamento. Tente novamente.',
                    'error',
                    { category: 'error', data: { error: error.message } }
                );
            }
        }
    }

    async loadTransactions() {
        try {
            console.log('📊 Carregando transações do Firebase...');
            
            // Usar o módulo de transações padronizado
            const transactions = await this.transactions.getTransactions();
            this.transactionsCache = transactions;
            this.renderTransactions(transactions);
            console.log('✅ Transações carregadas:', transactions.length);
        } catch (error) {
            console.error('❌ Erro ao carregar transações:', error);
            // Fallback para dados locais se houver erro
            try {
                const fallbackTransactions = JSON.parse(localStorage.getItem('transactions') || '[]');
                this.transactionsCache = fallbackTransactions;
                this.renderTransactions(fallbackTransactions);
                console.log('✅ Transações carregadas do fallback:', fallbackTransactions.length);
            } catch (fallbackError) {
                console.error('❌ Erro no fallback:', fallbackError);
                this.renderTransactions([]);
            }
        }
    }

    async loadCategorias() {
        try {
            console.log('📂 Carregando categorias do Firebase...');
            
            // Usar o módulo de categorias padronizado
            const categorias = await this.categorias.getCategories();
            this.categoriasCache = categorias;
            console.log('📂 Categorias carregadas:', categorias);
            this.renderCategorias(categorias);
            this.updateCategorySelects(categorias);
        } catch (error) {
            console.error('❌ Erro ao carregar categorias:', error);
            // Fallback para dados locais se houver erro
            try {
                const fallbackCategorias = JSON.parse(localStorage.getItem('categorias') || '[]');
                this.categoriasCache = fallbackCategorias;
                this.renderCategorias(fallbackCategorias);
                this.updateCategorySelects(fallbackCategorias);
                console.log('✅ Categorias carregadas do fallback:', fallbackCategorias.length);
            } catch (fallbackError) {
                console.error('❌ Erro no fallback:', fallbackError);
                this.renderCategorias([]);
                this.updateCategorySelects([]);
            }
        }
    }

    async renderCategorias(categorias) {
        try {
            console.log('📂 Renderizando categorias:', categorias);
            
            const categoriasList = document.getElementById('categoriasList');
            if (!categoriasList) return;

            if (categorias.length === 0) {
                categoriasList.innerHTML = `
                    <div class="empty-state">
                        <p>Nenhuma categoria encontrada</p>
                        <button class="btn btn-primary" onclick="showCategoryModal()">Criar primeira categoria</button>
                    </div>
                `;
                return;
            }

            const categoriasHTML = categorias.map(categoria => {
                // Calcular gastos usando transações locais
                const spent = this.getTotalSpentForCategory(categoria.id);
                const limit = categoria.limit || 0;
                const balance = limit - spent;
                const percentageUsed = limit > 0 ? (spent / limit) * 100 : 0;

                // Determinar cor baseada no uso do orçamento
                let statusClass = 'normal';
                if (percentageUsed >= 90) statusClass = 'danger';
                else if (percentageUsed >= 75) statusClass = 'warning';
                else if (percentageUsed >= 50) statusClass = 'info';

                return `
                    <div class="category-item ${statusClass}" data-id="${categoria.id}">
                        <div class="category-info">
                            <div class="category-header">
                                <div class="category-color" style="background-color: ${categoria.color || '#2563eb'}"></div>
                                <div class="category-details">
                                    <h4>${categoria.name}</h4>
                                    <div class="category-meta">
                                        <span class="category-type">${categoria.type === 'income' ? 'Receita' : 'Despesa'}</span>
                                        ${limit > 0 ? `
                                            <div class="category-budget-info">
                                                <span class="category-limit">Limite: ${this.formatCurrency(limit)}</span>
                                                <span class="category-balance ${balance >= 0 ? 'positive' : 'negative'}">Saldo: ${this.formatCurrency(balance)}</span>
                                            </div>
                                        ` : ''}
                                    </div>
                                </div>
                            </div>
                            
                            ${limit > 0 ? `
                                <div class="budget-info">
                                    <div class="budget-progress">
                                        <div class="progress-bar">
                                            <div class="progress-fill" style="width: ${Math.min(percentageUsed, 100)}%; background-color: ${this.getProgressColor(percentageUsed)}"></div>
                                        </div>
                                        <div class="budget-stats">
                                            <div class="budget-stat-item">
                                                <span class="stat-label">Gasto:</span>
                                                <span class="spent">${this.formatCurrency(spent)}</span>
                                            </div>
                                            <div class="budget-stat-item">
                                                <span class="stat-label">Saldo:</span>
                                                <span class="balance ${balance >= 0 ? 'positive' : 'negative'}">${this.formatCurrency(balance)}</span>
                                            </div>
                                            <div class="budget-stat-item">
                                                <span class="stat-label">Uso:</span>
                                                <span class="percentage">${percentageUsed.toFixed(1)}%</span>
                                            </div>
                                            ${spent > 0 ? `
                                                <div class="budget-stat-item">
                                                    <span class="stat-label">Transações:</span>
                                                    <span class="transactions-count">📊 ${this.getTransactionCountForCategory(categoria.id)}</span>
                                                </div>
                                            ` : ''}
                                        </div>
                                    </div>
                                </div>
                            ` : `
                                <div class="no-budget">
                                    <span class="text-muted">Sem orçamento definido</span>
                                    <button class="btn btn-secondary btn-sm" onclick="showBudgetModal()" style="margin-top: 8px;">Definir Orçamento</button>
                                </div>
                            `}
                        </div>
                        
                        <div class="category-actions">
                            <button class="btn btn-icon" onclick="editCategory('${categoria.id}')" title="Editar categoria">
                                ✏️
                            </button>
                            <button class="btn btn-icon" onclick="deleteCategory('${categoria.id}')" title="Excluir categoria">
                                🗑️
                            </button>
                        </div>
                    </div>
                `;
            }).join('');

            categoriasList.innerHTML = categoriasHTML;
            console.log('📂 Categorias renderizadas com sucesso');

        } catch (error) {
            console.error('❌ Erro ao renderizar categorias:', error);
            document.getElementById('categoriasList').innerHTML = `
                <div class="error-state">
                    <p>Erro ao carregar categorias</p>
                    <button class="btn btn-primary" onclick="location.reload()">Tentar novamente</button>
                </div>
            `;
        }
    }

    getProgressColor(percentage) {
        if (percentage >= 90) return '#ef4444'; // Vermelho
        if (percentage >= 75) return '#f59e0b'; // Amarelo
        if (percentage >= 50) return '#3b82f6'; // Azul
        return '#10b981'; // Verde
    }

    getCategoryColor(categoryId) {
        // Buscar a cor da categoria no cache ou retornar cor padrão
        const categoria = this.categoriasCache?.find(c => c.id === categoryId);
        return categoria?.color || '#2563eb';
    }

    getTransactionCountForCategory(categoryId) {
        // Contar transações para esta categoria (usando cache se disponível)
        if (!this.transactionsCache) return 0;
        return this.transactionsCache.filter(t => t.categoryId === categoryId && t.type === 'expense').length;
    }

    getTotalSpentForCategory(categoryId) {
        // Calcular total gasto em uma categoria específica
        if (!this.transactionsCache) return 0;
        return this.transactionsCache
            .filter(t => t.categoryId === categoryId && t.type === 'expense')
            .reduce((total, t) => total + (t.amount || 0), 0);
    }

    async loadGoals() {
        try {
            console.log('🎯 Carregando metas do Firebase...');
            
            // Usar o módulo de metas padronizado
            const goals = await this.goals.getGoals();
            this.renderGoals(goals);
            console.log('✅ Metas carregadas:', goals.length);
        } catch (error) {
            console.error('❌ Erro ao carregar metas:', error);
            // Fallback para dados locais se houver erro
            try {
                const fallbackGoals = JSON.parse(localStorage.getItem('goals') || '[]');
                this.renderGoals(fallbackGoals);
                console.log('✅ Metas carregadas do fallback:', fallbackGoals.length);
            } catch (fallbackError) {
                console.error('❌ Erro no fallback:', fallbackError);
                this.renderGoals([]);
            }
        }
    }

    async loadBudgets() {
        try {
            console.log('💰 Carregando orçamentos do Firebase...');
            
            // Usar o módulo de orçamentos padronizado
            const budgets = await this.budgets.getBudgets();
            console.log('💰 Orçamentos carregados:', budgets);
            this.renderBudgets(budgets);
        } catch (error) {
            console.error('❌ Erro ao carregar orçamentos:', error);
            // Fallback para dados locais se houver erro
            try {
                const fallbackBudgets = JSON.parse(localStorage.getItem('budgets') || '[]');
                console.log('💰 Orçamentos carregados do fallback:', fallbackBudgets);
                this.renderBudgets(fallbackBudgets);
            } catch (fallbackError) {
                console.error('❌ Erro no fallback:', fallbackError);
                this.renderBudgets([]);
            }
        }
    }

    renderTransactions(transactions) {
        const container = document.getElementById('transactionsList');
        if (!container) return;
        
        if (!transactions || transactions.length === 0) {
            container.innerHTML = '<p class="text-center text-secondary">Nenhuma transação encontrada</p>';
            return;
        }

        // Debug: Log das transações recebidas
        console.log('🔍 Debug - Transações para renderizar:', transactions.map(t => ({
            id: t.id,
            title: t.title,
            categoryId: t.categoryId,
            categoryName: t.categoryName,
            type: t.type
        })));

        const html = transactions.map(transaction => {
            // Determinar se é uma despesa que afeta orçamento
            const isExpense = transaction.type === 'expense';
            const hasCategory = transaction.categoryId && transaction.categoryName && transaction.categoryName !== 'Sem categoria';
            
            // Debug: Log de cada transação sendo processada
            console.log('🔍 Debug - Processando transação:', {
                id: transaction.id,
                title: transaction.title,
                categoryId: transaction.categoryId,
                categoryName: transaction.categoryName,
                hasCategory: hasCategory,
                isExpense: isExpense
            });
            
            return `
                <div class="transaction-item ${isExpense && hasCategory ? 'affects-budget' : ''}" data-id="${transaction.id}">
                    <div class="transaction-info">
                        <div class="transaction-title">${transaction.title}</div>
                        <div class="transaction-category">
                            ${hasCategory ? `
                                <span class="category-badge" style="background-color: ${this.getCategoryColor(transaction.categoryId)}">
                                    ${transaction.categoryName}
                                </span>
                                ${isExpense ? '<span class="budget-indicator" title="Afeta orçamento">💰</span>' : ''}
                            ` : '<span class="no-category">Sem categoria</span>'}
                        </div>
                        <div class="transaction-date">${this.formatDate(transaction.date)}</div>
                    </div>
                    <div class="transaction-actions">
                        <div class="transaction-amount ${transaction.type}">
                            ${transaction.type === 'income' ? '+' : '-'} ${this.formatCurrency(transaction.amount)}
                        </div>
                        <div class="transaction-buttons">
                            <button class="btn btn-icon" onclick="editTransaction('${transaction.id}')" title="Editar transação">
                                ✏️
                            </button>
                            <button class="btn btn-icon" onclick="deleteTransaction('${transaction.id}')" title="Excluir transação">
                                🗑️
                            </button>
                        </div>
                    </div>
                </div>
            `;
        }).join('');

        container.innerHTML = html;
    }

    renderGoals(goals) {
        const container = document.getElementById('goalsList');
        if (!container) return;
        
        if (!goals || goals.length === 0) {
            container.innerHTML = '<p class="text-center text-secondary">Nenhuma meta encontrada</p>';
            return;
        }

        const html = goals.map(goal => {
            const progress = (goal.current / goal.target) * 100;
            const progressPercent = Math.min(progress, 100);
            
            return `
                <div class="goal-item">
                    <div class="goal-title">${goal.title}</div>
                    <div class="text-sm text-secondary">
                        R$ ${goal.current.toFixed(2)} / R$ ${goal.target.toFixed(2)}
                    </div>
                    <div class="goal-progress">
                        <div class="goal-progress-bar" style="width: ${progressPercent}%"></div>
                    </div>
                    <div class="goal-actions">
                        <button class="btn btn-secondary btn-sm" onclick="window.FinanceApp && window.FinanceApp.editGoal ? window.FinanceApp.editGoal('${goal.id}') : console.error('Função editGoal não disponível')" title="Editar meta">
                            ✏️
                        </button>
                        <button class="btn btn-secondary btn-sm" onclick="window.FinanceApp && window.FinanceApp.showGoalHistory ? window.FinanceApp.showGoalHistory('${goal.id}') : console.error('Função showGoalHistory não disponível')" title="Ver histórico">
                            📊
                        </button>
                        <button class="btn btn-danger btn-sm" onclick="window.FinanceApp && window.FinanceApp.deleteGoal ? window.FinanceApp.deleteGoal('${goal.id}') : console.error('Função deleteGoal não disponível')" title="Excluir meta">
                            🗑️
                        </button>
                    </div>
                </div>
            `;
        }).join('');

        container.innerHTML = html;
    }

    renderBudgets(budgets) {
        console.log('🎯 Renderizando orçamentos:', budgets);
        const container = document.getElementById('budgetsList');
        
        if (!container) {
            console.error('❌ Container de orçamentos não encontrado');
            return;
        }
        
        if (!budgets || budgets.length === 0) {
            container.innerHTML = '<p class="text-center text-secondary">Nenhum orçamento encontrado</p>';
            console.log('ℹ️ Nenhum orçamento para renderizar');
            return;
        }

        const html = budgets.map(budget => {
            const percentage = Math.min(budget.percentageUsed, 100);
            const isOverBudget = budget.spent > budget.amount;
            
            return `
                <div class="budget-item">
                    <div class="budget-header">
                        <div class="budget-category">${budget.categoryName}</div>
                        <div class="budget-amounts">
                            <span class="budget-limit">R$ ${budget.amount.toFixed(2)}</span>
                            <span class="budget-spent ${isOverBudget ? 'over' : ''}">
                                R$ ${budget.spent.toFixed(2)}
                            </span>
                            <span class="budget-balance ${budget.balance >= 0 ? 'positive' : 'negative'}">
                                R$ ${Math.abs(budget.balance).toFixed(2)}
                            </span>
                        </div>
                    </div>
                    <div class="budget-progress">
                        <div class="budget-progress-bar" 
                             style="width: ${percentage}%;
                                    background: ${percentage > 100 ? 'var(--danger-color)' : 'var(--primary-color)'}">
                        </div>
                    </div>
                    <div class="budget-percentage">
                        ${percentage.toFixed(0)}% utilizado
                    </div>
                    <div class="budget-actions">
                        <button class="btn btn-secondary btn-sm" onclick="window.FinanceApp && window.FinanceApp.editBudget ? window.FinanceApp.editBudget('${budget.id}') : console.error('Função editBudget não disponível')" title="Editar orçamento">
                            ✏️ Editar
                        </button>
                        <button class="btn btn-secondary btn-sm" onclick="window.FinanceApp && window.FinanceApp.showBudgetHistory ? window.FinanceApp.showBudgetHistory('${budget.id}') : console.error('Função showBudgetHistory não disponível')" title="Ver histórico">
                            📊 Histórico
                        </button>
                        <button class="btn btn-danger btn-sm" onclick="window.FinanceApp && window.FinanceApp.deleteBudget ? window.FinanceApp.deleteBudget('${budget.id}') : console.error('Função deleteBudget não disponível')" title="Excluir orçamento">
                            🗑️ Excluir
                        </button>
                    </div>
                </div>
            `;
        }).join('');

        container.innerHTML = html;
    }

    updateCategorySelects(categorias) {
        console.log('🔍 Debug - Atualizando selects de categoria:', categorias);
        
        const selects = ['transactionCategory', 'budgetCategory'];
        
        selects.forEach(selectId => {
            const select = document.getElementById(selectId);
            if (select) {
                // Salvar a opção selecionada atual
                const currentValue = select.value;
                
                console.log(`🔍 Debug - Select ${selectId}:`, {
                    currentValue: currentValue,
                    currentOptions: select.options.length
                });
                
                // Limpar e recriar as opções
                select.innerHTML = '<option value="">Selecione uma categoria</option>';
                
                // Adicionar categorias
                categorias.forEach(categoria => {
                    const option = document.createElement('option');
                    option.value = categoria.id;
                    option.textContent = categoria.name;
                    select.appendChild(option);
                });
                
                // Restaurar a seleção se ainda existir
                if (currentValue && categorias.find(c => c.id === currentValue)) {
                    select.value = currentValue;
                }
                
                console.log(`🔍 Debug - Select ${selectId} atualizado:`, {
                    totalOptions: select.options.length,
                    options: Array.from(select.options).map(opt => ({ value: opt.value, text: opt.text }))
                });
            } else {
                console.warn(`⚠️ Select ${selectId} não encontrado`);
            }
        });
    }

    async updateSummaryCards() {
        try {
            console.log('💰 Atualizando cards de resumo...');
            
            // Usar dados do cache local (que vêm do Firebase)
            const transactions = this.transactionsCache || [];
            const categorias = this.categoriasCache || [];
            
            // Calcular receita total usando o módulo de transações
            const totalIncome = await this.transactions.getTotalIncome();
            
            // Calcular despesa total usando o módulo de transações
            const totalExpenses = await this.transactions.getTotalExpenses();
            
            // Calcular despesa total (soma dos limites das categorias)
            const totalBudgetLimits = categorias
                .reduce((total, cat) => total + (cat.limit || 0), 0);
            
            // Calcular saldo atual (soma dos saldos das categorias)
            const totalBudgetBalance = categorias.reduce((total, cat) => {
                const spent = this.getTotalSpentForCategory(cat.id);
                const limit = cat.limit || 0;
                return total + (limit - spent);
            }, 0);
            
            // Calcular orçamento restante (receita total - despesa total)
            const budgetRemaining = totalIncome - totalBudgetLimits;

            // Atualizar os cards
            const totalIncomeEl = document.getElementById('totalIncome');
            const totalExpenseEl = document.getElementById('totalExpense');
            const totalBudgetEl = document.getElementById('totalBudget');
            const budgetRemainingEl = document.getElementById('budgetRemaining');
            
            if (totalIncomeEl) totalIncomeEl.textContent = this.formatCurrency(totalIncome);
            if (totalExpenseEl) totalExpenseEl.textContent = this.formatCurrency(totalExpenses);
            if (totalBudgetEl) totalBudgetEl.textContent = this.formatCurrency(totalBudgetBalance);
            if (budgetRemainingEl) budgetRemainingEl.textContent = this.formatCurrency(budgetRemaining);

            // Adicionar classes de cor baseadas no valor
            this.updateCardColors('totalIncome', totalIncome, 'positive');
            this.updateCardColors('totalExpense', totalExpenses, 'negative');
            this.updateCardColors('totalBudget', totalBudgetBalance, totalBudgetBalance >= 0 ? 'positive' : 'negative');
            this.updateCardColors('budgetRemaining', budgetRemaining, budgetRemaining >= 0 ? 'positive' : 'negative');

            console.log('💰 Cards de resumo atualizados:', {
                receitaTotal: totalIncome,
                despesaTotal: totalExpenses,
                saldoAtual: totalBudgetBalance,
                orcamentoRestante: budgetRemaining
            });

        } catch (error) {
            console.error('❌ Erro ao atualizar cards de resumo:', error);
            // Fallback para localStorage em caso de erro
            try {
                const transactions = JSON.parse(localStorage.getItem('transactions') || '[]');
                const categorias = JSON.parse(localStorage.getItem('categorias') || '[]');
                
                const totalIncome = transactions
                    .filter(t => t.type === 'income')
                    .reduce((total, t) => total + (t.amount || 0), 0);
                
                const totalExpenses = transactions
                    .filter(t => t.type === 'expense')
                    .reduce((total, t) => total + (t.amount || 0), 0);
                
                const totalBudgetLimits = categorias
                    .reduce((total, cat) => total + (cat.limit || 0), 0);
                
                const budgetRemaining = totalIncome - totalBudgetLimits;

                const totalIncomeEl = document.getElementById('totalIncome');
                const totalExpenseEl = document.getElementById('totalExpense');
                const budgetRemainingEl = document.getElementById('budgetRemaining');
                
                if (totalIncomeEl) totalIncomeEl.textContent = this.formatCurrency(totalIncome);
                if (totalExpenseEl) totalExpenseEl.textContent = this.formatCurrency(totalExpenses);
                if (budgetRemainingEl) budgetRemainingEl.textContent = this.formatCurrency(budgetRemaining);
                
                console.log('💰 Cards de resumo atualizados (fallback):', {
                    receitaTotal: totalIncome,
                    despesaTotal: totalExpenses,
                    orcamentoRestante: budgetRemaining
                });
            } catch (fallbackError) {
                console.error('❌ Erro no fallback dos cards de resumo:', fallbackError);
            }
        }
    }

    updateCardColors(cardId, value, type) {
        const card = document.getElementById(cardId).closest('.summary-card');
        if (card) {
            card.classList.remove('positive', 'negative', 'neutral');
            card.classList.add(type);
        }
    }

    updateCharts() {
        // Atualizar gráficos quando necessário
        if (this.charts.incomeExpense) {
            this.charts.incomeExpense.update();
        }
        if (this.charts.categoryDistribution) {
            this.charts.categoryDistribution.update();
        }
    }

    formatDate(date) {
        if (!date) return '';
        const d = date.toDate ? date.toDate() : new Date(date);
        return d.toLocaleDateString('pt-BR');
    }

    closeAllModals() {
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            modal.classList.remove('show');
        });
    }

    // Métodos de edição
    async editTransaction(id) {
        try {
            const transaction = await this.transactions.getTransactionById(id);
            if (transaction) {
                this.populateTransactionForm(transaction);
                showTransactionModal();
                this.notifications.show('Transação carregada para edição', 'success');
            }
        } catch (error) {
            console.error('Erro ao editar transação:', error);
            throw error;
        }
    }

    async editCategory(id) {
        try {
            const categoria = await this.categorias.getCategoryById(id);
            if (categoria) {
                this.populateCategoryForm(categoria);
                showCategoryModal();
                this.notifications.show('Categoria carregada para edição', 'success');
            }
        } catch (error) {
            console.error('Erro ao editar categoria:', error);
            throw error;
        }
    }

    async editGoal(id) {
        try {
            const goal = await this.goals.getGoalById(id);
            if (goal) {
                this.populateGoalForm(goal);
                showGoalModal();
            }
        } catch (error) {
            console.error('Erro ao carregar meta:', error);
            this.notifications.show('Erro ao carregar meta', 'error');
        }
    }

    async editBudget(id) {
        try {
            const budget = await this.budgets.getBudgetById(id);
            if (budget) {
                this.populateBudgetForm(budget);
                showBudgetModal();
            }
        } catch (error) {
            console.error('Erro ao carregar orçamento:', error);
            this.notifications.show('Erro ao carregar orçamento', 'error');
        }
    }

    // Métodos de exclusão
    async deleteTransaction(id) {
        if (confirm('Tem certeza que deseja excluir esta transação?')) {
            try {
                await this.transactions.deleteTransaction(id);
                await this.loadTransactions();
                await this.loadCategorias(); // Recarregar categorias para atualizar saldos
                this.updateSummaryCards();
                this.notifications.show('Transação excluída com sucesso', 'success');
            } catch (error) {
                console.error('Erro ao excluir transação:', error);
                throw error;
            }
        }
    }

    async deleteCategory(id) {
        if (confirm('Tem certeza que deseja excluir esta categoria? Todas as transações relacionadas serão marcadas como "Sem categoria"')) {
            try {
                await this.categorias.deleteCategory(id);
                await this.loadCategorias();
                this.updateSummaryCards(); // Atualizar cards de resumo
                this.notifications.show('Categoria excluída com sucesso', 'success');
            } catch (error) {
                console.error('Erro ao excluir categoria:', error);
                throw error;
            }
        }
    }

    async deleteGoal(id) {
        if (confirm('Tem certeza que deseja excluir esta meta?')) {
            try {
                await this.goals.deleteGoal(id);
                await this.loadGoals();
                this.notifications.show('Meta excluída com sucesso!', 'success');
            } catch (error) {
                console.error('Erro ao excluir meta:', error);
                this.notifications.show('Erro ao excluir meta', 'error');
            }
        }
    }

    async deleteBudget(id) {
        if (confirm('Tem certeza que deseja excluir este orçamento?')) {
            try {
                await this.budgets.deleteBudget(id);
                await this.loadBudgets();
                await this.loadCategorias(); // Recarregar categorias para atualizar os limites
                this.updateSummaryCards(); // Atualizar cards de resumo
                this.notifications.show('Orçamento excluído com sucesso!', 'success');
            } catch (error) {
                console.error('Erro ao excluir orçamento:', error);
                this.notifications.show('Erro ao excluir orçamento', 'error');
            }
        }
    }

    // Métodos de histórico
    async showTransactionHistory(id) {
        try {
            const transaction = await this.transactions.getTransactionById(id);
            const history = await this.transactions.getTransactionHistory(id);
            
            if (transaction) {
                this.showHistoryModal('Transação', transaction, history);
            }
        } catch (error) {
            console.error('Erro ao mostrar histórico:', error);
            throw error;
        }
    }

    async showCategoryHistory(id) {
        try {
            const categoria = await this.categorias.getCategoryById(id);
            const transactions = await this.transactions.getTransactionsByCategory(id);
            
            if (categoria) {
                this.showHistoryModal('Categoria', categoria, transactions);
            }
        } catch (error) {
            console.error('Erro ao mostrar histórico:', error);
            throw error;
        }
    }

    async showGoalHistory(id) {
        try {
            const goal = await this.goals.getGoalById(id);
            if (goal) {
                this.showHistoryModal('Meta', goal);
            }
        } catch (error) {
            console.error('Erro ao carregar histórico da meta:', error);
            this.notifications.show('Erro ao carregar histórico', 'error');
        }
    }

    async showBudgetHistory(id) {
        try {
            const budget = await this.budgets.getBudgetById(id);
            if (budget) {
                this.showHistoryModal('Orçamento', budget);
            }
        } catch (error) {
            console.error('Erro ao carregar histórico do orçamento:', error);
            this.notifications.show('Erro ao carregar histórico', 'error');
        }
    }

    showHistoryModal(title, item, relatedItems = []) {
        const modal = document.getElementById('historyModal');
        const modalTitle = document.getElementById('historyModalTitle');
        const modalContent = document.getElementById('historyModalContent');

        modalTitle.textContent = `Histórico - ${title}`;
        
        let content = `
            <div class="history-item">
                <h4>Informações</h4>
                <p><strong>Nome:</strong> ${item.title || item.name}</p>
                ${item.amount ? `<p><strong>Valor:</strong> R$ ${item.amount.toFixed(2)}</p>` : ''}
                ${item.type ? `<p><strong>Tipo:</strong> ${item.type}</p>` : ''}
                ${item.date ? `<p><strong>Data:</strong> ${this.formatDate(item.date)}</p>` : ''}
                ${item.createdAt ? `<p><strong>Criado em:</strong> ${this.formatDate(item.createdAt)}</p>` : ''}
                ${item.updatedAt ? `<p><strong>Atualizado em:</strong> ${this.formatDate(item.updatedAt)}</p>` : ''}
            </div>
        `;

        if (relatedItems.length > 0) {
            content += `
                <div class="history-item">
                    <h4>Itens Relacionados (${relatedItems.length})</h4>
                    <div class="related-items">
                        ${relatedItems.map(item => `
                            <div class="related-item">
                                <span>${item.title}</span>
                                <span class="amount ${item.type}">R$ ${item.amount.toFixed(2)}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        }

        modalContent.innerHTML = content;
        modal.classList.add('show');
    }

    // Métodos auxiliares para preencher formulários
    populateTransactionForm(transaction) {
        document.getElementById('transactionId').value = transaction.id;
        document.getElementById('transactionTitle').value = transaction.title;
        document.getElementById('transactionAmount').value = transaction.amount;
        document.getElementById('transactionType').value = transaction.type;
        document.getElementById('transactionCategory').value = transaction.categoryId;
        document.getElementById('transactionDate').value = transaction.date;
        
        // Atualizar título do modal para indicar edição
        const modalTitle = document.querySelector('#transactionModal .modal-header h3');
        if (modalTitle) {
            modalTitle.textContent = 'Editar Transação';
        }
    }

    populateCategoryForm(categoria) {
        document.getElementById('categoryName').value = categoria.name;
        document.getElementById('categoryColor').value = categoria.color;
        document.getElementById('categoryType').value = categoria.type;
    }

    populateGoalForm(goal) {
        document.getElementById('goalTitle').value = goal.title;
        document.getElementById('goalTarget').value = goal.target;
        document.getElementById('goalCurrent').value = goal.current;
        document.getElementById('goalDeadline').value = goal.deadline;
    }

    populateBudgetForm(budget) {
        document.getElementById('budgetCategory').value = budget.categoryId;
        document.getElementById('budgetAmount').value = budget.amount;
    }

    setupTouchGestures() {
        // Swipe para deletar
        this.setupSwipeToDelete();
        
        // Pull to refresh
        this.setupPullToRefresh();
        
        // Long press para ações
        this.setupLongPress();
        
        // Haptic feedback
        this.setupHapticFeedback();
        
        // Swipe entre seções
        this.setupSwipeNavigation();
    }

    setupSwipeToDelete() {
        let startX = 0;
        let currentX = 0;
        let isDragging = false;

        document.addEventListener('touchstart', (e) => {
            const item = e.target.closest('.transaction-item, .category-item');
            if (!item) return;

            startX = e.touches[0].clientX;
            currentX = startX;
            isDragging = true;
            item.style.transition = 'none';
        }, { passive: true });

        document.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            
            currentX = e.touches[0].clientX;
            const diff = currentX - startX;
            
            if (diff < 0) { // Swipe left
                const item = e.target.closest('.transaction-item, .category-item');
                if (item) {
                    const translateX = Math.max(diff, -80);
                    item.style.transform = `translateX(${translateX}px)`;
                }
            }
        }, { passive: true });

        document.addEventListener('touchend', (e) => {
            if (!isDragging) return;
            
            const diff = currentX - startX;
            const item = e.target.closest('.transaction-item, .category-item');
            
            if (item && diff < -50) {
                // Swipe suficiente para deletar
                this.showSwipeActions(item);
            } else if (item) {
                // Reset position
                item.style.transition = 'transform 0.3s ease';
                item.style.transform = 'translateX(0)';
            }
            
            isDragging = false;
        }, { passive: true });
    }

    showSwipeActions(item) {
        const itemId = item.dataset.id;
        const itemType = item.classList.contains('transaction-item') ? 'transaction' : 'category';
        
        // Criar ações de swipe
        const swipeActions = document.createElement('div');
        swipeActions.className = 'swipe-actions';
        swipeActions.innerHTML = `
            <div class="swipe-action" onclick="FinanceApp.edit${itemType.charAt(0).toUpperCase() + itemType.slice(1)}('${itemId}')">
                ✏️ Editar
            </div>
            <div class="swipe-action" onclick="FinanceApp.delete${itemType.charAt(0).toUpperCase() + itemType.slice(1)}('${itemId}')">
                🗑️ Excluir
            </div>
        `;
        
        item.style.position = 'relative';
        item.appendChild(swipeActions);
        
        // Auto-hide após 3 segundos
        setTimeout(() => {
            if (swipeActions.parentNode) {
                swipeActions.remove();
                item.style.transform = 'translateX(0)';
            }
        }, 3000);
    }

    setupPullToRefresh() {
        let startY = 0;
        let currentY = 0;
        let isPulling = false;
        let pullIndicator = null;

        const container = document.querySelector('.transactions-list');
        if (!container) return;

        // Criar indicador de pull
        pullIndicator = document.createElement('div');
        pullIndicator.className = 'pull-indicator';
        pullIndicator.innerHTML = '⬇️ Puxe para atualizar';
        container.parentNode.insertBefore(pullIndicator, container);

        container.addEventListener('touchstart', (e) => {
            if (container.scrollTop === 0) {
                startY = e.touches[0].clientY;
                isPulling = true;
            }
        }, { passive: true });

        container.addEventListener('touchmove', (e) => {
            if (!isPulling) return;
            
            currentY = e.touches[0].clientY;
            const diff = currentY - startY;
            
            if (diff > 0 && container.scrollTop === 0) {
                e.preventDefault();
                const pullDistance = Math.min(diff * 0.5, 100);
                pullIndicator.style.top = `${pullDistance - 50}px`;
                
                if (pullDistance > 80) {
                    pullIndicator.innerHTML = '⬆️ Solte para atualizar';
                } else {
                    pullIndicator.innerHTML = '⬇️ Puxe para atualizar';
                }
            }
        }, { passive: false });

        container.addEventListener('touchend', async (e) => {
            if (!isPulling) return;
            
            const diff = currentY - startY;
            
            if (diff > 80) {
                // Trigger refresh
                pullIndicator.classList.add('refreshing');
                pullIndicator.innerHTML = '🔄 Atualizando...';
                
                try {
                    await this.loadTransactions();
                    await this.updateSummaryCards();
                    this.notifications.show('Dados atualizados!', 'success');
                } catch (error) {
                    this.notifications.show('Erro ao atualizar', 'error');
                }
                
                setTimeout(() => {
                    pullIndicator.classList.remove('refreshing');
                    pullIndicator.style.top = '-50px';
                }, 1000);
            } else {
                pullIndicator.style.top = '-50px';
            }
            
            isPulling = false;
        }, { passive: true });
    }

    setupLongPress() {
        let longPressTimer = null;
        let longPressTarget = null;

        document.addEventListener('touchstart', (e) => {
            const target = e.target.closest('.transaction-item, .category-item');
            if (!target) return;

            longPressTarget = target;
            longPressTimer = setTimeout(() => {
                this.showContextMenu(e, target);
                this.triggerHapticFeedback('medium');
            }, 500);
        }, { passive: true });

        document.addEventListener('touchend', () => {
            if (longPressTimer) {
                clearTimeout(longPressTimer);
                longPressTimer = null;
            }
            longPressTarget = null;
        }, { passive: true });

        document.addEventListener('touchmove', () => {
            if (longPressTimer) {
                clearTimeout(longPressTimer);
                longPressTimer = null;
            }
        }, { passive: true });
    }

    setupHapticFeedback() {
        // Haptic feedback para ações importantes
        const hapticElements = document.querySelectorAll('.btn, .nav-item, .fab');
        
        hapticElements.forEach(element => {
            element.addEventListener('touchstart', () => {
                this.triggerHapticFeedback('light');
            }, { passive: true });
        });
    }

    triggerHapticFeedback(type = 'light') {
        if ('vibrate' in navigator) {
            const patterns = {
                light: 10,
                medium: 50,
                heavy: 100
            };
            navigator.vibrate(patterns[type] || 10);
        }
    }

    setupSwipeNavigation() {
        let startX = 0;
        let currentX = 0;
        let isSwiping = false;

        document.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            isSwiping = true;
        }, { passive: true });

        document.addEventListener('touchmove', (e) => {
            if (!isSwiping) return;
            currentX = e.touches[0].clientX;
        }, { passive: true });

        document.addEventListener('touchend', (e) => {
            if (!isSwiping) return;
            
            const diff = currentX - startX;
            const threshold = 100;
            
            if (Math.abs(diff) > threshold) {
                if (diff > 0) {
                    // Swipe right - previous section
                    this.navigateToPreviousSection();
                } else {
                    // Swipe left - next section
                    this.navigateToNextSection();
                }
            }
            
            isSwiping = false;
        }, { passive: true });
    }

    navigateToNextSection() {
        const sections = ['transactions', 'budgets', 'goals', 'reports'];
        const currentSection = this.getCurrentSection();
        const currentIndex = sections.indexOf(currentSection);
        const nextIndex = (currentIndex + 1) % sections.length;
        
        this.switchSection(sections[nextIndex]);
    }

    navigateToPreviousSection() {
        const sections = ['transactions', 'budgets', 'goals', 'reports'];
        const currentSection = this.getCurrentSection();
        const currentIndex = sections.indexOf(currentSection);
        const prevIndex = currentIndex === 0 ? sections.length - 1 : currentIndex - 1;
        
        this.switchSection(sections[prevIndex]);
    }

    getCurrentSection() {
        const activeNav = document.querySelector('.nav-item.active');
        return activeNav ? activeNav.dataset.target : 'transactions';
    }

    switchSection(section) {
        // Atualizar navegação
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
        });
        
        const targetNav = document.querySelector(`[data-target="${section}"]`);
        if (targetNav) {
            targetNav.classList.add('active');
        }
        
        // Animar transição
        this.animateSectionTransition(section);
    }

    animateSectionTransition(section) {
        const container = document.querySelector('.main-sections');
        if (!container) return;
        
        container.style.transform = 'translateX(-100%)';
        container.style.transition = 'transform 0.3s ease';
        
        setTimeout(() => {
            // Aqui você pode carregar o conteúdo da seção
            container.style.transform = 'translateX(0)';
        }, 150);
    }

    // Melhorias de performance para mobile
    setupMobileOptimizations() {
        // Lazy loading para imagens
        this.setupLazyLoading();
        
        // Debounce para inputs
        this.setupInputDebounce();
        
        // Intersection Observer para animações
        this.setupIntersectionObserver();
        
        // Preload de recursos críticos
        this.preloadCriticalResources();
    }

    setupLazyLoading() {
        const images = document.querySelectorAll('img[data-src]');
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }

    setupInputDebounce() {
        const inputs = document.querySelectorAll('input[type="text"], input[type="number"]');
        
        inputs.forEach(input => {
            let timeout;
            input.addEventListener('input', (e) => {
                clearTimeout(timeout);
                timeout = setTimeout(() => {
                    // Aqui você pode implementar validação ou busca
                    this.handleInputChange(e.target);
                }, 300);
            });
        });
    }

    setupIntersectionObserver() {
        const animatedElements = document.querySelectorAll('.transaction-item, .category-item, .summary-card');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        animatedElements.forEach(el => observer.observe(el));
    }

    preloadCriticalResources() {
        // Remover preload desnecessário que está causando warnings
        // Os módulos já são carregados via script tags no HTML
        console.log('Recursos críticos já carregados via script tags');
    }

    handleInputChange(input) {
        // Implementar validação ou busca conforme necessário
        console.log('Input changed:', input.value);
    }

    // Métodos de fallback para evitar erros de função não encontrada
    setupEventDelegation() {
        console.log('setupEventDelegation chamado');
    }
    
    loadUserData() {
        console.log('loadUserData chamado');
        // Carregar dados do usuário se necessário
        this.loadTransactions();
        this.loadCategorias();
        this.loadGoals();
        this.loadBudgets();
    }
    
    setupViewport() {
        console.log('setupViewport chamado');
        // Configurar viewport para mobile se necessário
    }
    
    setupContextMenu() {
        console.log('setupContextMenu chamado');
        // Configurar menu de contexto se necessário
    }
    
    clearUserData() {
        console.log('clearUserData chamado');
        // Limpar dados do usuário quando deslogado
        document.getElementById('transactionsList').innerHTML = '<div class="empty-state">Faça login para ver suas transações</div>';
        document.getElementById('categoriasList').innerHTML = '<div class="empty-state">Faça login para ver suas categorias</div>';
        document.getElementById('goalsList').innerHTML = '<div class="empty-state">Faça login para ver suas metas</div>';
        document.getElementById('budgetsList').innerHTML = '<div class="empty-state">Faça login para ver seus orçamentos</div>';
    }

    formatCurrency(value) {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(value || 0);
    }

    calculateDaysLeft(deadline) {
        if (!deadline) return 0;
        const deadlineDate = new Date(deadline);
        const today = new Date();
        const diffTime = deadlineDate - today;
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    }

    getCategoryName(categoryId) {
        if (!categoryId) return 'Sem categoria';
        
        // Buscar no cache de categorias
        if (this.categoriasCache) {
            const categoria = this.categoriasCache.find(c => c.id === categoryId);
            return categoria ? categoria.name : 'Categoria não encontrada';
        }
        
        return 'Categoria não encontrada';
    }
}

// Funções globais para modais
function showTransactionModal() {
    const modal = document.getElementById('transactionModal');
    if (modal) {
        modal.classList.add('show');
        document.getElementById('transactionModalTitle').textContent = 'Nova Transação';
        document.getElementById('transactionForm').reset();
    }
}

function showCategoryModal() {
    const modal = document.getElementById('categoryModal');
    if (modal) {
        modal.classList.add('show');
        document.getElementById('categoryModalTitle').textContent = 'Nova Categoria';
        document.getElementById('categoryForm').reset();
    }
}

function showGoalModal() {
    const modal = document.getElementById('goalModal');
    if (modal) {
        modal.classList.add('show');
        document.getElementById('goalModalTitle').textContent = 'Nova Meta';
        document.getElementById('goalForm').reset();
    }
}

function showBudgetModal() {
    const modal = document.getElementById('budgetModal');
    if (modal) {
        modal.classList.add('show');
        document.getElementById('budgetModalTitle').textContent = 'Novo Orçamento';
        document.getElementById('budgetForm').reset();
    }
}

function closeTransactionModal() {
    const modal = document.getElementById('transactionModal');
    if (modal) {
        modal.classList.remove('show');
    }
}

function closeCategoryModal() {
    const modal = document.getElementById('categoryModal');
    if (modal) {
        modal.classList.remove('show');
    }
}

function closeGoalModal() {
    const modal = document.getElementById('goalModal');
    if (modal) {
        modal.classList.remove('show');
    }
}

function closeBudgetModal() {
    const modal = document.getElementById('budgetModal');
    if (modal) {
        modal.classList.remove('show');
    }
}

function showNotificationSettings() {
    const modal = document.getElementById('notificationSettingsModal');
    if (modal) {
        modal.classList.add('show');
        loadNotificationSettings();
    }
}

function closeNotificationSettings() {
    const modal = document.getElementById('notificationSettingsModal');
    if (modal) {
        modal.classList.remove('show');
    }
}

function loadNotificationSettings() {
    // Carregar configurações salvas
    const settings = JSON.parse(localStorage.getItem('notificationSettings') || '{}');
    
    // Aplicar configurações aos switches
    const switches = {
        'browserNotifications': settings.browserNotifications !== false,
        'soundEnabled': settings.soundEnabled !== false,
        'vibrationEnabled': settings.vibrationEnabled || false,
        'budgetAlerts': settings.budgetAlerts !== false,
        'goalReminders': settings.goalReminders !== false,
        'paymentReminders': settings.paymentReminders !== false,
        'backupNotifications': settings.backupNotifications !== false
    };
    
    Object.keys(switches).forEach(key => {
        const checkbox = document.getElementById(key);
        if (checkbox) {
            checkbox.checked = switches[key];
        }
    });
    
    // Configurar horário silencioso
    const quietStart = document.getElementById('quietStart');
    const quietEnd = document.getElementById('quietEnd');
    
    if (quietStart) quietStart.value = settings.quietStart || '22:00';
    if (quietEnd) quietEnd.value = settings.quietEnd || '08:00';
}

function saveNotificationSettings() {
    const settings = {
        browserNotifications: document.getElementById('browserNotifications')?.checked || false,
        soundEnabled: document.getElementById('soundEnabled')?.checked || false,
        vibrationEnabled: document.getElementById('vibrationEnabled')?.checked || false,
        budgetAlerts: document.getElementById('budgetAlerts')?.checked || false,
        goalReminders: document.getElementById('goalReminders')?.checked || false,
        paymentReminders: document.getElementById('paymentReminders')?.checked || false,
        backupNotifications: document.getElementById('backupNotifications')?.checked || false,
        quietStart: document.getElementById('quietStart')?.value || '22:00',
        quietEnd: document.getElementById('quietEnd')?.value || '08:00'
    };
    
    localStorage.setItem('notificationSettings', JSON.stringify(settings));
    
    if (window.NotificationManager) {
        window.NotificationManager.showNotification({
            type: 'success',
            title: 'Configurações salvas!',
            message: 'Suas preferências de notificação foram atualizadas',
            duration: 2000
        });
    }
}

// Funções auxiliares
function setupKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
        // Ctrl+N: Nova transação
        if (e.ctrlKey && e.key === 'n') {
            e.preventDefault();
            showTransactionModal();
        }
        
        // Ctrl+C: Nova categoria
        if (e.ctrlKey && e.key === 'c') {
            e.preventDefault();
            showCategoryModal();
        }
        
        // Ctrl+G: Nova meta
        if (e.ctrlKey && e.key === 'g') {
            e.preventDefault();
            showGoalModal();
        }
        
        // Ctrl+B: Novo orçamento
        if (e.ctrlKey && e.key === 'b') {
            e.preventDefault();
            showBudgetModal();
        }
        
        // Ctrl+D: Modo escuro
        if (e.ctrlKey && e.key === 'd') {
            e.preventDefault();
            toggleDarkMode();
        }
        
        // Ctrl+E: Exportar PDF
        if (e.ctrlKey && e.key === 'e') {
            e.preventDefault();
            exportToPDF();
        }
        
        // Ctrl+V: Reconhecimento de voz
        if (e.ctrlKey && e.key === 'v') {
            e.preventDefault();
            toggleVoiceRecognition();
        }
        
        // ESC: Fechar modais
        if (e.key === 'Escape') {
            closeAllModals();
        }
    });
}

function checkNotificationPermissions() {
    if ('Notification' in window) {
        if (Notification.permission === 'default') {
            console.log('🔔 Permissão de notificação: default');
        } else if (Notification.permission === 'granted') {
            console.log('🔔 Permissão de notificação: granted');
        } else {
            console.log('🔔 Permissão de notificação: denied');
        }
    } else {
        console.log('⚠️ Notificações não suportadas neste navegador');
    }
}

function closeAllModals() {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        modal.classList.remove('show');
    });
}

// Sistema de Navegação Mobile
class MobileNavigation {
    constructor() {
        this.currentTab = 'dashboard';
        this.init();
    }

    init() {
        this.bindEvents();
        this.showTab('dashboard');
        this.adjustLayout();
    }

    bindEvents() {
        // Event listeners para as abas
        document.querySelectorAll('.nav-tab').forEach(tab => {
            tab.addEventListener('click', (e) => {
                const tabName = e.currentTarget.dataset.tab;
                this.showTab(tabName);
            });
        });

        // Detectar mudança de orientação
        window.addEventListener('orientationchange', () => {
            setTimeout(() => {
                this.adjustLayout();
            }, 100);
        });

        // Detectar redimensionamento
        window.addEventListener('resize', () => {
            this.adjustLayout();
        });
    }

    showTab(tabName) {
        // Atualizar aba ativa
        document.querySelectorAll('.nav-tab').forEach(tab => {
            tab.classList.remove('active');
        });
        
        const activeTab = document.querySelector(`[data-tab="${tabName}"]`);
        if (activeTab) {
            activeTab.classList.add('active');
        }

        // Mostrar conteúdo da aba
        document.querySelectorAll('.tab-pane').forEach(pane => {
            pane.classList.remove('active');
        });
        
        const activePane = document.getElementById(`${tabName}-tab`);
        if (activePane) {
            activePane.classList.add('active');
        }

        this.currentTab = tabName;
        
        // Atualizar dados da aba
        this.updateTabContent(tabName);
    }

    updateTabContent(tabName) {
        switch (tabName) {
            case 'dashboard':
                if (window.FinanceApp && window.FinanceApp.updateDashboard) {
                    window.FinanceApp.updateDashboard();
                }
                break;
            case 'transactions':
                if (window.FinanceApp && window.FinanceApp.renderTransactions) {
                    window.FinanceApp.renderTransactions();
                }
                break;
            case 'categorias':
                if (window.FinanceApp && window.FinanceApp.renderCategorias) {
                    window.FinanceApp.renderCategorias();
                }
                break;
            case 'goals':
                if (window.FinanceApp && window.FinanceApp.renderGoals) {
                    window.FinanceApp.renderGoals();
                }
                break;
            case 'budgets':
                if (window.FinanceApp && window.FinanceApp.renderBudgets) {
                    window.FinanceApp.renderBudgets();
                }
                break;
        }
    }

    adjustLayout() {
        const isMobile = window.innerWidth <= 768;
        
        if (isMobile) {
            // Ajustes específicos para mobile
            this.adjustMobileLayout();
        } else {
            // Ajustes para desktop
            this.adjustDesktopLayout();
        }
    }

    adjustMobileLayout() {
        // Ajustar altura do container para evitar problemas com teclado virtual
        const container = document.querySelector('.container');
        const header = document.querySelector('.header');
        const nav = document.querySelector('.mobile-nav');
        const summary = document.querySelector('.summary-cards');
        
        if (container && header && nav && summary) {
            const viewportHeight = window.innerHeight;
            const headerHeight = header.offsetHeight;
            const navHeight = nav.offsetHeight;
            const summaryHeight = summary.offsetHeight;
            
            const availableHeight = viewportHeight - headerHeight - navHeight - summaryHeight - 100;
            container.style.minHeight = `${availableHeight}px`;
        }
        
        // Mostrar FAB no mobile
        this.showFAB();
        
        // Ocultar quick actions no mobile
        this.hideQuickActions();
    }

    adjustDesktopLayout() {
        // Restaurar layout desktop
        const container = document.querySelector('.container');
        if (container) {
            container.style.minHeight = '100vh';
        }
        
        // Ocultar FAB no desktop
        this.hideFAB();
        
        // Mostrar quick actions no desktop
        this.showQuickActions();
    }

    showFAB() {
        const fab = document.querySelector('.fab');
        if (fab) {
            fab.style.display = 'flex';
            fab.style.alignItems = 'center';
            fab.style.justifyContent = 'center';
        }
    }

    hideFAB() {
        const fab = document.querySelector('.fab');
        if (fab) {
            fab.style.display = 'none';
        }
    }

    showQuickActions() {
        const quickActions = document.querySelector('.quick-actions');
        if (quickActions) {
            quickActions.style.display = 'flex';
        }
    }

    hideQuickActions() {
        const quickActions = document.querySelector('.quick-actions');
        if (quickActions) {
            quickActions.style.display = 'none';
        }
    }
}

// Inicialização da aplicação
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Iniciando Controle Financeiro...');
    
    // Inicializar módulos se existirem
    if (window.AuthModule && window.AuthModule.init) {
        window.AuthModule.init();
    }
    
    if (window.NotificationManager && window.NotificationManager.init) {
        window.NotificationManager.init();
    }
    
    if (window.VoiceRecognition && window.VoiceRecognition.init) {
        window.VoiceRecognition.init();
    }
    
    // Inicializar navegação mobile
    const mobileNav = new MobileNavigation();
    window.mobileNav = mobileNav; // Tornar global para acesso
    
    // Inicializar aplicação principal se existir
    if (window.FinanceApp && window.FinanceApp.init) {
        window.FinanceApp.init();
    }
    
    // Configurar data atual nos formulários
    const today = new Date().toISOString().split('T')[0];
    const transactionDate = document.getElementById('transactionDate');
    const goalDeadline = document.getElementById('goalDeadline');
    const budgetStartDate = document.getElementById('budgetStartDate');
    
    if (transactionDate) transactionDate.value = today;
    if (goalDeadline) goalDeadline.value = today;
    if (budgetStartDate) budgetStartDate.value = today;
    
    // Configurar atalhos de teclado
    setupKeyboardShortcuts();
    
    // Verificar permissões de notificação
    checkNotificationPermissions();
    
    console.log('✅ Aplicação inicializada com sucesso!');
});

// Funções globais de manipulação de formulários
function handleTransactionSubmit(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const editId = event.target.dataset.editId;
    
    const transaction = {
        title: formData.get('transactionTitle') || document.getElementById('transactionTitle').value,
        amount: parseFloat(formData.get('transactionAmount') || document.getElementById('transactionAmount').value),
        type: formData.get('transactionType') || document.getElementById('transactionType').value,
        category: formData.get('transactionCategory') || document.getElementById('transactionCategory').value,
        date: formData.get('transactionDate') || document.getElementById('transactionDate').value,
        description: formData.get('transactionDescription') || document.getElementById('transactionDescription').value
    };
    
    // Validar dados
    if (!transaction.title || !transaction.amount || !transaction.category) {
        if (window.NotificationManager) {
            window.NotificationManager.showNotification({
                type: 'error',
                title: 'Dados incompletos',
                message: 'Preencha todos os campos obrigatórios',
                duration: 3000
            });
        }
        return;
    }
    
    // Salvar transação
    const transactions = JSON.parse(localStorage.getItem('transactions') || '[]');
    
    if (editId) {
        // Modo edição
        const index = transactions.findIndex(t => t.id === editId);
        if (index !== -1) {
            transaction.id = editId;
            transaction.updatedAt = new Date().toISOString();
            transactions[index] = transaction;
        }
    } else {
        // Modo criação
        transaction.id = Date.now().toString();
        transaction.createdAt = new Date().toISOString();
        transactions.unshift(transaction);
    }
    
    localStorage.setItem('transactions', JSON.stringify(transactions));
    
    // Fechar modal
    closeTransactionModal();
    
    // Limpar modo edição
    event.target.dataset.editId = '';
    document.getElementById('transactionModalTitle').textContent = 'Nova Transação';
    
    // Notificar sucesso
    if (window.NotificationManager) {
        window.NotificationManager.showNotification({
            type: 'success',
            title: editId ? 'Transação atualizada!' : 'Transação adicionada!',
            message: `${transaction.title} - R$ ${transaction.amount.toFixed(2)}`,
            duration: 3000
        });
    }
    
    // Atualizar interface
    if (window.FinanceApp) {
        window.FinanceApp.loadTransactions();
        window.FinanceApp.updateSummaryCards();
    }
}

function handleCategorySubmit(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const editId = event.target.dataset.editId;
    
    const categoria = {
        name: formData.get('categoryName') || document.getElementById('categoryName').value,
        color: formData.get('categoryColor') || document.getElementById('categoryColor').value,
        type: formData.get('categoryType') || document.getElementById('categoryType').value,
        limit: parseFloat(formData.get('categoryLimit') || document.getElementById('categoryLimit').value) || 0
    };
    
    // Validar dados
    if (!categoria.name) {
        if (window.NotificationManager) {
            window.NotificationManager.showNotification({
                type: 'error',
                title: 'Nome obrigatório',
                message: 'Digite o nome da categoria',
                duration: 3000
            });
        }
        return;
    }
    
    // Salvar categoria
    const categorias = JSON.parse(localStorage.getItem('categorias') || '[]');
    
    if (editId) {
        // Modo edição
        const index = categorias.findIndex(c => c.id === editId);
        if (index !== -1) {
            categoria.id = editId;
            categoria.updatedAt = new Date().toISOString();
            categorias[index] = categoria;
        }
    } else {
        // Modo criação
        categoria.id = Date.now().toString();
        categoria.createdAt = new Date().toISOString();
        categorias.push(categoria);
    }
    
    localStorage.setItem('categorias', JSON.stringify(categorias));
    
    // Fechar modal
    closeCategoryModal();
    
    // Limpar modo edição
    event.target.dataset.editId = '';
    document.getElementById('categoryModalTitle').textContent = 'Nova Categoria';
    
    // Notificar sucesso
    if (window.NotificationManager) {
        window.NotificationManager.showNotification({
            type: 'success',
            title: editId ? 'Categoria atualizada!' : 'Categoria criada!',
            message: categoria.name,
            duration: 3000
        });
    }
    
    // Atualizar interface
    if (window.FinanceApp) {
        window.FinanceApp.loadCategorias();
    }
}

function handleGoalSubmit(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const goal = {
        title: formData.get('goalTitle') || document.getElementById('goalTitle').value,
        target: parseFloat(formData.get('goalTarget') || document.getElementById('goalTarget').value),
        current: parseFloat(formData.get('goalCurrent') || document.getElementById('goalCurrent').value) || 0,
        deadline: formData.get('goalDeadline') || document.getElementById('goalDeadline').value,
        description: formData.get('goalDescription') || document.getElementById('goalDescription').value
    };
    
    // Validar dados
    if (!goal.title || !goal.target || !goal.deadline) {
        if (window.NotificationManager) {
            window.NotificationManager.showNotification({
                type: 'error',
                title: 'Dados incompletos',
                message: 'Preencha todos os campos obrigatórios',
                duration: 3000
            });
        }
        return;
    }
    
    // Salvar meta (simulado)
    const goals = JSON.parse(localStorage.getItem('goals') || '[]');
    goal.id = Date.now().toString();
    goal.createdAt = new Date().toISOString();
    goals.push(goal);
    localStorage.setItem('goals', JSON.stringify(goals));
    
    // Fechar modal
    closeGoalModal();
    
    // Notificar sucesso
    if (window.NotificationManager) {
        window.NotificationManager.showNotification({
            type: 'success',
            title: 'Meta criada!',
            message: `${goal.title} - R$ ${goal.target.toFixed(2)}`,
            duration: 3000
        });
    }
    
    // Atualizar interface
    if (window.FinanceApp && window.FinanceApp.renderGoals) {
        window.FinanceApp.renderGoals();
    }
}

function handleBudgetSubmit(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const budget = {
        title: formData.get('budgetTitle') || document.getElementById('budgetTitle').value,
        amount: parseFloat(formData.get('budgetAmount') || document.getElementById('budgetAmount').value),
        period: formData.get('budgetPeriod') || document.getElementById('budgetPeriod').value,
        startDate: formData.get('budgetStartDate') || document.getElementById('budgetStartDate').value,
        description: formData.get('budgetDescription') || document.getElementById('budgetDescription').value
    };
    
    // Validar dados
    if (!budget.title || !budget.amount || !budget.startDate) {
        if (window.NotificationManager) {
            window.NotificationManager.showNotification({
                type: 'error',
                title: 'Dados incompletos',
                message: 'Preencha todos os campos obrigatórios',
                duration: 3000
            });
        }
        return;
    }
    
    // Salvar orçamento (simulado)
    const budgets = JSON.parse(localStorage.getItem('budgets') || '[]');
    budget.id = Date.now().toString();
    budget.createdAt = new Date().toISOString();
    budgets.push(budget);
    localStorage.setItem('budgets', JSON.stringify(budgets));
    
    // Fechar modal
    closeBudgetModal();
    
    // Notificar sucesso
    if (window.NotificationManager) {
        window.NotificationManager.showNotification({
            type: 'success',
            title: 'Orçamento criado!',
            message: `${budget.title} - R$ ${budget.amount.toFixed(2)}`,
            duration: 3000
        });
    }
    
    // Atualizar interface
    if (window.FinanceApp && window.FinanceApp.renderBudgets) {
        window.FinanceApp.renderBudgets();
    }
}

// Funções globais para edição e exclusão
function editCategory(id) {
    const categorias = JSON.parse(localStorage.getItem('categorias') || '[]');
    const categoria = categorias.find(c => c.id === id);
    
    if (categoria) {
        // Preencher formulário
        document.getElementById('categoryName').value = categoria.name;
        document.getElementById('categoryColor').value = categoria.color || '#2563eb';
        document.getElementById('categoryType').value = categoria.type;
        document.getElementById('categoryLimit').value = categoria.limit || '';
        
        // Mostrar modal
        showCategoryModal();
        
        // Marcar como edição
        document.getElementById('categoryModalTitle').textContent = 'Editar Categoria';
        document.getElementById('categoryForm').dataset.editId = id;
    }
}

function deleteCategory(id) {
    if (confirm('Tem certeza que deseja excluir esta categoria?')) {
        const categorias = JSON.parse(localStorage.getItem('categorias') || '[]');
        const updatedCategorias = categorias.filter(c => c.id !== id);
        localStorage.setItem('categorias', JSON.stringify(updatedCategorias));
        
        // Recarregar categorias
        if (window.FinanceApp) {
            window.FinanceApp.loadCategorias();
        }
        
        // Notificar sucesso
        if (window.NotificationManager) {
            window.NotificationManager.showNotification({
                type: 'success',
                title: 'Categoria excluída!',
                message: 'Categoria removida com sucesso',
                duration: 3000
            });
        }
    }
}

function editTransaction(id) {
    const transactions = JSON.parse(localStorage.getItem('transactions') || '[]');
    const transaction = transactions.find(t => t.id === id);
    
    if (transaction) {
        // Preencher formulário
        document.getElementById('transactionTitle').value = transaction.title;
        document.getElementById('transactionAmount').value = transaction.amount;
        document.getElementById('transactionType').value = transaction.type;
        document.getElementById('transactionCategory').value = transaction.categoryId || '';
        document.getElementById('transactionDate').value = transaction.date;
        document.getElementById('transactionDescription').value = transaction.description || '';
        
        // Mostrar modal
        showTransactionModal();
        
        // Marcar como edição
        document.getElementById('transactionModalTitle').textContent = 'Editar Transação';
        document.getElementById('transactionForm').dataset.editId = id;
    }
}

function deleteTransaction(id) {
    if (confirm('Tem certeza que deseja excluir esta transação?')) {
        const transactions = JSON.parse(localStorage.getItem('transactions') || '[]');
        const updatedTransactions = transactions.filter(t => t.id !== id);
        localStorage.setItem('transactions', JSON.stringify(updatedTransactions));
        
        // Recarregar transações
        if (window.FinanceApp) {
            window.FinanceApp.loadTransactions();
            window.FinanceApp.updateSummaryCards();
        }
        
        // Notificar sucesso
        if (window.NotificationManager) {
            window.NotificationManager.showNotification({
                type: 'success',
                title: 'Transação excluída!',
                message: 'Transação removida com sucesso',
                duration: 3000
            });
        }
    }
} 
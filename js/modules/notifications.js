// Módulo de Notificações Inteligente
class NotificationManager {
    constructor() {
        this.notifications = [];
        this.reminders = [];
        this.settings = this.loadSettings();
        this.isSupported = 'Notification' in window;
        this.permission = 'default';
        
        this.init();
    }

    async init() {
        console.log('🔔 Inicializando sistema de notificações...');
        
        // Solicitar permissão para notificações
        if (this.isSupported) {
            this.permission = await this.requestPermission();
        }
        
        // Configurar Service Worker para notificações push
        this.setupServiceWorker();
        
        // Carregar lembretes salvos
        this.loadReminders();
        
        // Iniciar verificações periódicas
        this.startPeriodicChecks();
        
        console.log('✅ Sistema de notificações inicializado');
    }

    async requestPermission() {
        if (!this.isSupported) return 'denied';
        
        try {
            const permission = await Notification.requestPermission();
            console.log('🔔 Permissão de notificação:', permission);
            return permission;
        } catch (error) {
            console.error('❌ Erro ao solicitar permissão:', error);
            return 'denied';
        }
    }

    setupServiceWorker() {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/service-worker.js')
                .then(registration => {
                    console.log('🔔 Service Worker registrado:', registration);
                    this.swRegistration = registration;
                })
                .catch(error => {
                    console.error('❌ Erro ao registrar Service Worker:', error);
                });
        }
    }

    // Configurações de notificação
    loadSettings() {
        const defaultSettings = {
            enabled: true,
            sound: true,
            vibration: true,
            budgetAlerts: true,
            goalReminders: true,
            paymentReminders: true,
            backupReminders: true,
            quietHours: {
                enabled: false,
                start: '22:00',
                end: '08:00'
            }
        };
        
        const saved = localStorage.getItem('notificationSettings');
        return saved ? { ...defaultSettings, ...JSON.parse(saved) } : defaultSettings;
    }

    saveSettings() {
        localStorage.setItem('notificationSettings', JSON.stringify(this.settings));
    }

    // Tipos de notificação
    showNotification(title, message, type = 'info', options = {}) {
        if (!this.settings.enabled) return;
        
        // Verificar horário silencioso
        if (this.isQuietHours()) {
            console.log('🔇 Horário silencioso ativo, notificação suprimida');
            return;
        }

        const notification = {
            id: Date.now().toString(),
            title,
            message,
            type,
            timestamp: new Date(),
            read: false,
            ...options
        };

        // Adicionar à lista de notificações
        this.notifications.unshift(notification);
        this.saveNotifications();

        // Mostrar notificação do navegador
        if (this.permission === 'granted') {
            this.showBrowserNotification(notification);
        }

        // Mostrar notificação na interface
        this.showInAppNotification(notification);

        // Tocar som se habilitado
        if (this.settings.sound) {
            this.playNotificationSound(type);
        }

        // Vibração se habilitada
        if (this.settings.vibration && 'vibrate' in navigator) {
            this.vibrate(type);
        }

        return notification.id;
    }

    showBrowserNotification(notification) {
        const browserNotification = new Notification(notification.title, {
            body: notification.message,
            icon: '/icon-192.png',
            badge: '/icon-192.png',
            tag: notification.id,
            requireInteraction: notification.type === 'alert',
            actions: notification.actions || []
        });

        // Eventos da notificação
        browserNotification.onclick = () => {
            this.handleNotificationClick(notification);
            browserNotification.close();
        };

        browserNotification.onclose = () => {
            this.markAsRead(notification.id);
        };

        // Auto-close após 5 segundos (exceto alertas)
        if (notification.type !== 'alert') {
            setTimeout(() => {
                browserNotification.close();
            }, 5000);
        }
    }

    showInAppNotification(notification) {
        const container = document.getElementById('notificationContainer') || this.createNotificationContainer();
        
        const notificationElement = document.createElement('div');
        notificationElement.className = `notification notification-${notification.type}`;
        notificationElement.dataset.id = notification.id;
        
        notificationElement.innerHTML = `
            <div class="notification-icon">
                ${this.getNotificationIcon(notification.type)}
            </div>
            <div class="notification-content">
                <div class="notification-title">${notification.title}</div>
                <div class="notification-message">${notification.message}</div>
                <div class="notification-time">${this.formatTime(notification.timestamp)}</div>
            </div>
            <button class="notification-close" onclick="window.NotificationManager.closeNotification('${notification.id}')">
                ×
            </button>
        `;

        container.appendChild(notificationElement);

        // Animar entrada
        setTimeout(() => {
            notificationElement.classList.add('show');
        }, 100);

        // Auto-remove após 8 segundos
        setTimeout(() => {
            this.closeNotification(notification.id);
        }, 8000);
    }

    createNotificationContainer() {
        const container = document.createElement('div');
        container.id = 'notificationContainer';
        container.className = 'notification-container';
        document.body.appendChild(container);
        return container;
    }

    closeNotification(id) {
        // Remover da interface
        const element = document.querySelector(`[data-id="${id}"]`);
        if (element) {
            element.classList.add('hiding');
            setTimeout(() => {
                element.remove();
            }, 300);
        }

        // Marcar como lida
        this.markAsRead(id);
    }

    markAsRead(id) {
        const notification = this.notifications.find(n => n.id === id);
        if (notification) {
            notification.read = true;
            this.saveNotifications();
        }
    }

    // Lembretes inteligentes
    addReminder(reminder) {
        const newReminder = {
            id: Date.now().toString(),
            ...reminder,
            created: new Date(),
            active: true
        };

        this.reminders.push(newReminder);
        this.saveReminders();
        
        console.log('🔔 Lembrete adicionado:', newReminder);
        return newReminder.id;
    }

    // Tipos específicos de notificação
    showBudgetAlert(category, spent, limit) {
        const percentage = (spent / limit) * 100;
        let message, type;

        if (percentage >= 100) {
            message = `Orçamento de ${category} excedido! Gasto: ${this.formatCurrency(spent)} de ${this.formatCurrency(limit)}`;
            type = 'alert';
        } else if (percentage >= 90) {
            message = `Atenção! ${category} está em ${percentage.toFixed(0)}% do limite (${this.formatCurrency(spent)}/${this.formatCurrency(limit)})`;
            type = 'warning';
        } else if (percentage >= 75) {
            message = `${category} está em ${percentage.toFixed(0)}% do limite (${this.formatCurrency(spent)}/${this.formatCurrency(limit)})`;
            type = 'info';
        }

        if (message) {
            this.showNotification(
                'Alerta de Orçamento',
                message,
                type,
                {
                    category: 'budget',
                    data: { category, spent, limit, percentage }
                }
            );
        }
    }

    showGoalReminder(goal) {
        const daysLeft = this.calculateDaysLeft(goal.deadline);
        const progress = (goal.current / goal.target) * 100;
        
        let message, type = 'info';
        
        if (daysLeft <= 0) {
            message = `Meta "${goal.title}" venceu hoje! Progresso: ${progress.toFixed(0)}%`;
            type = 'alert';
        } else if (daysLeft <= 7) {
            message = `Meta "${goal.title}" vence em ${daysLeft} dias. Progresso: ${progress.toFixed(0)}%`;
            type = 'warning';
        } else if (daysLeft <= 30) {
            message = `Meta "${goal.title}" vence em ${daysLeft} dias. Progresso: ${progress.toFixed(0)}%`;
        }

        if (message) {
            this.showNotification(
                'Lembrete de Meta',
                message,
                type,
                {
                    category: 'goal',
                    data: { goal, daysLeft, progress }
                }
            );
        }
    }

    showPaymentReminder(transaction) {
        if (transaction.isRecorrente && transaction.proximoVencimento) {
            const daysLeft = this.calculateDaysLeft(transaction.proximoVencimento);
            
            if (daysLeft <= 3) {
                this.showNotification(
                    'Lembrete de Pagamento',
                    `Pagamento recorrente "${transaction.title}" vence em ${daysLeft} dias (${this.formatCurrency(transaction.amount)})`,
                    daysLeft === 0 ? 'alert' : 'warning',
                    {
                        category: 'payment',
                        data: { transaction, daysLeft }
                    }
                );
            }
        }
    }

    showBackupReminder() {
        const lastBackup = localStorage.getItem('lastBackup');
        const daysSinceBackup = lastBackup ? 
            Math.floor((Date.now() - new Date(lastBackup).getTime()) / (1000 * 60 * 60 * 24)) : 999;

        if (daysSinceBackup >= 7) {
            this.showNotification(
                'Backup Recomendado',
                `Seus dados não são salvos há ${daysSinceBackup} dias. Faça um backup para proteger suas informações.`,
                'info',
                {
                    category: 'backup',
                    data: { daysSinceBackup }
                }
            );
        }
    }

    // Verificações periódicas
    startPeriodicChecks() {
        // Verificar a cada 30 minutos
        setInterval(() => {
            this.checkBudgetAlerts();
            this.checkGoalReminders();
            this.checkPaymentReminders();
        }, 30 * 60 * 1000);

        // Verificar backup diariamente
        setInterval(() => {
            this.checkBackupReminder();
        }, 24 * 60 * 60 * 1000);
    }

    async checkBudgetAlerts() {
        if (!this.settings.budgetAlerts) return;
        
        try {
            // Buscar dados de orçamento (implementar conforme sua estrutura)
            const budgets = await this.getBudgetsData();
            
            budgets.forEach(budget => {
                if (budget.spent > budget.limit * 0.75) {
                    this.showBudgetAlert(budget.category, budget.spent, budget.limit);
                }
            });
        } catch (error) {
            console.error('❌ Erro ao verificar alertas de orçamento:', error);
        }
    }

    async checkGoalReminders() {
        if (!this.settings.goalReminders) return;
        
        try {
            // Buscar metas (implementar conforme sua estrutura)
            const goals = await this.getGoalsData();
            
            goals.forEach(goal => {
                if (goal.deadline) {
                    this.showGoalReminder(goal);
                }
            });
        } catch (error) {
            console.error('❌ Erro ao verificar lembretes de metas:', error);
        }
    }

    async checkPaymentReminders() {
        if (!this.settings.paymentReminders) return;
        
        try {
            // Buscar transações recorrentes (implementar conforme sua estrutura)
            const transactions = await this.getRecurringTransactions();
            
            transactions.forEach(transaction => {
                this.showPaymentReminder(transaction);
            });
        } catch (error) {
            console.error('❌ Erro ao verificar lembretes de pagamento:', error);
        }
    }

    checkBackupReminder() {
        if (!this.settings.backupReminders) return;
        this.showBackupReminder();
    }

    // Utilitários
    isQuietHours() {
        if (!this.settings.quietHours.enabled) return false;
        
        const now = new Date();
        const currentTime = now.getHours() * 100 + now.getMinutes();
        const startTime = this.timeToMinutes(this.settings.quietHours.start);
        const endTime = this.timeToMinutes(this.settings.quietHours.end);
        
        if (startTime > endTime) {
            // Período atravessa a meia-noite
            return currentTime >= startTime || currentTime <= endTime;
        } else {
            return currentTime >= startTime && currentTime <= endTime;
        }
    }

    timeToMinutes(timeString) {
        const [hours, minutes] = timeString.split(':').map(Number);
        return hours * 60 + minutes;
    }

    calculateDaysLeft(deadline) {
        const deadlineDate = new Date(deadline);
        const today = new Date();
        const diffTime = deadlineDate - today;
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    }

    formatCurrency(value) {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(value);
    }

    formatTime(date) {
        return new Intl.DateTimeFormat('pt-BR', {
            hour: '2-digit',
            minute: '2-digit'
        }).format(date);
    }

    getNotificationIcon(type) {
        const icons = {
            success: '✅',
            error: '❌',
            warning: '⚠️',
            info: 'ℹ️',
            alert: '🚨'
        };
        return icons[type] || icons.info;
    }

    playNotificationSound(type) {
        // Implementar sons diferentes por tipo
        const audio = new Audio();
        audio.volume = 0.3;
        
        switch (type) {
            case 'alert':
                audio.src = '/sounds/alert.mp3';
                break;
            case 'warning':
                audio.src = '/sounds/warning.mp3';
                break;
            default:
                audio.src = '/sounds/notification.mp3';
        }
        
        audio.play().catch(() => {
            // Fallback para beep simples
            console.log('🔊 Som de notificação');
        });
    }

    vibrate(type) {
        const patterns = {
            alert: [200, 100, 200, 100, 200],
            warning: [200, 100, 200],
            default: [200]
        };
        
        navigator.vibrate(patterns[type] || patterns.default);
    }

    handleNotificationClick(notification) {
        // Implementar ações específicas por categoria
        switch (notification.category) {
            case 'budget':
                this.openBudgetModal(notification.data.category);
                break;
            case 'goal':
                this.openGoalModal(notification.data.goal.id);
                break;
            case 'payment':
                this.openTransactionModal(notification.data.transaction.id);
                break;
            case 'backup':
                this.openBackupModal();
                break;
        }
    }

    // Métodos para abrir modais (implementar conforme sua estrutura)
    openBudgetModal(category) {
        console.log('Abrindo modal de orçamento para:', category);
        // Implementar abertura do modal de orçamento
    }

    openGoalModal(goalId) {
        console.log('Abrindo modal de meta:', goalId);
        // Implementar abertura do modal de meta
    }

    openTransactionModal(transactionId) {
        console.log('Abrindo modal de transação:', transactionId);
        // Implementar abertura do modal de transação
    }

    openBackupModal() {
        console.log('Abrindo modal de backup');
        // Implementar abertura do modal de backup
    }

    // Persistência
    saveNotifications() {
        localStorage.setItem('notifications', JSON.stringify(this.notifications));
    }

    loadNotifications() {
        const saved = localStorage.getItem('notifications');
        this.notifications = saved ? JSON.parse(saved) : [];
    }

    saveReminders() {
        localStorage.setItem('reminders', JSON.stringify(this.reminders));
    }

    loadReminders() {
        const saved = localStorage.getItem('reminders');
        this.reminders = saved ? JSON.parse(saved) : [];
    }

    // Métodos para buscar dados (implementar conforme sua estrutura)
    async getBudgetsData() {
        // Implementar busca de dados de orçamento
        return [];
    }

    async getGoalsData() {
        // Implementar busca de dados de metas
        return [];
    }

    async getRecurringTransactions() {
        // Implementar busca de transações recorrentes
        return [];
    }

    // API pública
    getNotifications() {
        return this.notifications;
    }

    getUnreadCount() {
        return this.notifications.filter(n => !n.read).length;
    }

    markAllAsRead() {
        this.notifications.forEach(n => n.read = true);
        this.saveNotifications();
    }

    clearAll() {
        this.notifications = [];
        this.saveNotifications();
    }

    updateSettings(newSettings) {
        this.settings = { ...this.settings, ...newSettings };
        this.saveSettings();
    }
}

// Instância global
window.NotificationManager = new NotificationManager(); 
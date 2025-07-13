/**
 * Sistema de Notificações Push
 * Gerencia notificações do navegador e in-app
 */

class NotificationSystem {
    constructor() {
        this.isSupported = 'Notification' in window;
        this.permission = 'default';
        this.notifications = [];
        this.settings = this.loadSettings();
        this.init();
    }

    async init() {
        console.log('🔔 Inicializando sistema de notificações...');
        
        if (this.isSupported) {
            this.permission = await this.requestPermission();
            this.setupServiceWorker();
            this.loadNotifications();
            this.startPeriodicChecks();
        }
        
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

    // Mostrar notificação
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
            <button class="notification-close" onclick="window.notificationSystem.closeNotification('${notification.id}')">
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

    getNotificationIcon(type) {
        const icons = {
            success: '✅',
            warning: '⚠️',
            error: '❌',
            info: 'ℹ️',
            alert: '🚨'
        };
        return icons[type] || icons.info;
    }

    formatTime(date) {
        const now = new Date();
        const diff = now - date;
        
        if (diff < 60000) return 'Agora';
        if (diff < 3600000) return `${Math.floor(diff / 60000)}m atrás`;
        if (diff < 86400000) return `${Math.floor(diff / 3600000)}h atrás`;
        return date.toLocaleDateString('pt-BR');
    }

    closeNotification(id) {
        // Remover da lista
        this.notifications = this.notifications.filter(n => n.id !== id);
        this.saveNotifications();
        
        // Remover da interface
        const element = document.querySelector(`[data-id="${id}"]`);
        if (element) {
            element.classList.add('fade-out');
            setTimeout(() => element.remove(), 300);
        }
    }

    markAsRead(id) {
        const notification = this.notifications.find(n => n.id === id);
        if (notification) {
            notification.read = true;
            this.saveNotifications();
        }
    }

    // Notificações específicas
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
        const progress = (goal.currentAmount / goal.targetAmount) * 100;
        const remaining = goal.targetAmount - goal.currentAmount;
        
        this.showNotification(
            'Lembrete de Meta',
            `Meta "${goal.name}": ${progress.toFixed(0)}% concluída. Faltam ${this.formatCurrency(remaining)}`,
            'info',
            {
                category: 'goal',
                data: { goal }
            }
        );
    }

    showPaymentReminder(transaction) {
        this.showNotification(
            'Lembrete de Pagamento',
            `Pagamento recorrente: ${transaction.description} - ${this.formatCurrency(transaction.amount)}`,
            'warning',
            {
                category: 'payment',
                data: { transaction }
            }
        );
    }

    showBackupReminder() {
        this.showNotification(
            'Backup Recomendado',
            'Faça backup dos seus dados financeiros para manter a segurança',
            'info',
            {
                category: 'backup'
            }
        );
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

    checkBudgetAlerts() {
        // Implementar verificação de orçamentos
        console.log('🔔 Verificando alertas de orçamento...');
    }

    checkGoalReminders() {
        // Implementar verificação de metas
        console.log('🔔 Verificando lembretes de metas...');
    }

    checkPaymentReminders() {
        // Implementar verificação de pagamentos recorrentes
        console.log('🔔 Verificando lembretes de pagamento...');
    }

    checkBackupReminder() {
        const lastBackup = localStorage.getItem('lastBackup');
        const now = Date.now();
        const oneWeek = 7 * 24 * 60 * 60 * 1000;
        
        if (!lastBackup || (now - parseInt(lastBackup)) > oneWeek) {
            this.showBackupReminder();
        }
    }

    // Utilitários
    formatCurrency(value) {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(value);
    }

    isQuietHours() {
        if (!this.settings.quietHours.enabled) return false;
        
        const now = new Date();
        const currentTime = now.getHours() * 60 + now.getMinutes();
        const startTime = this.timeToMinutes(this.settings.quietHours.start);
        const endTime = this.timeToMinutes(this.settings.quietHours.end);
        
        if (startTime <= endTime) {
            return currentTime >= startTime && currentTime <= endTime;
        } else {
            // Horário que cruza meia-noite
            return currentTime >= startTime || currentTime <= endTime;
        }
    }

    timeToMinutes(timeString) {
        const [hours, minutes] = timeString.split(':').map(Number);
        return hours * 60 + minutes;
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

    // Métodos para abrir modais (implementar conforme necessário)
    openBudgetModal(category) {
        console.log('Abrindo modal de orçamento para:', category);
    }

    openGoalModal(goalId) {
        console.log('Abrindo modal de meta:', goalId);
    }

    openTransactionModal(transactionId) {
        console.log('Abrindo modal de transação:', transactionId);
    }

    openBackupModal() {
        console.log('Abrindo modal de backup');
    }

    // Persistência
    saveNotifications() {
        localStorage.setItem('notifications', JSON.stringify(this.notifications));
    }

    loadNotifications() {
        const saved = localStorage.getItem('notifications');
        this.notifications = saved ? JSON.parse(saved) : [];
    }

    // Configurações
    updateSettings(newSettings) {
        this.settings = { ...this.settings, ...newSettings };
        this.saveSettings();
    }

    // Teste de notificação
    testNotification() {
        this.showNotification(
            'Teste de Notificação',
            'Esta é uma notificação de teste do Servo Tech - Finanças!',
            'info'
        );
    }
}

// Instância global
window.notificationSystem = new NotificationSystem();

// Adicionar CSS para notificações
const notificationStyles = `
    .notification-container {
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 9999;
        display: flex;
        flex-direction: column;
        gap: 12px;
        max-width: 400px;
        width: calc(100vw - 40px);
    }

    .notification {
        background: white;
        border-radius: 12px;
        padding: 16px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        border-left: 4px solid #4f46e5;
        display: flex;
        align-items: flex-start;
        gap: 12px;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        opacity: 0;
    }

    .dark .notification {
        background: #1f2937;
        color: #f9fafb;
        border-left-color: #6366f1;
    }

    .notification.show {
        transform: translateX(0);
        opacity: 1;
    }

    .notification.fade-out {
        transform: translateX(100%);
        opacity: 0;
    }

    .notification-icon {
        font-size: 20px;
        flex-shrink: 0;
    }

    .notification-content {
        flex: 1;
        min-width: 0;
    }

    .notification-title {
        font-weight: 600;
        margin-bottom: 4px;
        font-size: 14px;
    }

    .notification-message {
        font-size: 13px;
        color: #6b7280;
        margin-bottom: 4px;
    }

    .dark .notification-message {
        color: #9ca3af;
    }

    .notification-time {
        font-size: 11px;
        color: #9ca3af;
    }

    .dark .notification-time {
        color: #6b7280;
    }

    .notification-close {
        background: none;
        border: none;
        font-size: 18px;
        color: #9ca3af;
        cursor: pointer;
        padding: 0;
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        transition: background-color 0.2s ease;
    }

    .notification-close:hover {
        background: #f3f4f6;
        color: #6b7280;
    }

    .dark .notification-close:hover {
        background: #374151;
        color: #d1d5db;
    }

    .notification-success {
        border-left-color: #10b981;
    }

    .notification-warning {
        border-left-color: #f59e0b;
    }

    .notification-error {
        border-left-color: #ef4444;
    }

    .notification-alert {
        border-left-color: #dc2626;
    }

    @media (max-width: 768px) {
        .notification-container {
            right: 10px;
            left: 10px;
            width: auto;
        }
    }
`;

// Injetar estilos
const styleSheet = document.createElement('style');
styleSheet.textContent = notificationStyles;
document.head.appendChild(styleSheet);

console.log('✅ Sistema de notificações carregado'); 
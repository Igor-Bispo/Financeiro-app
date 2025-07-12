/**
 * Módulo de Autenticação
 * Gerencia autenticação de usuários e sessões
 */

class AuthModule {
    constructor() {
        this.currentUser = null;
        this.isAuthenticated = false;
        this.init();
    }

    init() {
        console.log('🔐 Inicializando módulo de autenticação...');
        this.checkAuthStatus();
        this.bindEvents();
    }

    bindEvents() {
        // Event listeners para botões de login/logout
        const loginBtn = document.getElementById('loginBtn');
        const logoutBtn = document.getElementById('logoutBtn');

        if (loginBtn) {
            loginBtn.addEventListener('click', () => this.login());
        }

        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => this.logout());
        }
    }

    checkAuthStatus() {
        // Verificar se há usuário logado no localStorage
        const savedUser = localStorage.getItem('currentUser');
        if (savedUser) {
            try {
                this.currentUser = JSON.parse(savedUser);
                this.isAuthenticated = true;
                this.updateUI();
                console.log('✅ Usuário autenticado:', this.currentUser.name);
            } catch (error) {
                console.error('❌ Erro ao carregar dados do usuário:', error);
                this.logout();
            }
        } else {
            this.updateUI();
        }
    }

    login() {
        // Simular login - em produção, isso seria integrado com Firebase Auth
        const userName = prompt('Digite seu nome:');
        if (userName && userName.trim()) {
            this.currentUser = {
                id: Date.now().toString(),
                name: userName.trim(),
                email: `${userName.toLowerCase().replace(/\s+/g, '.')}@exemplo.com`,
                avatar: '👤'
            };
            
            this.isAuthenticated = true;
            localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
            this.updateUI();
            
            // Notificar sobre login bem-sucedido
            if (window.NotificationManager) {
                window.NotificationManager.showNotification({
                    type: 'success',
                    title: 'Login realizado!',
                    message: `Bem-vindo(a), ${this.currentUser.name}!`,
                    duration: 3000
                });
            }
            
            console.log('✅ Login realizado com sucesso');
        }
    }

    logout() {
        this.currentUser = null;
        this.isAuthenticated = false;
        localStorage.removeItem('currentUser');
        this.updateUI();
        
        // Notificar sobre logout
        if (window.NotificationManager) {
            window.NotificationManager.showNotification({
                type: 'info',
                title: 'Logout realizado',
                message: 'Você saiu da sua conta',
                duration: 2000
            });
        }
        
        console.log('👋 Logout realizado');
    }

    updateUI() {
        const userName = document.getElementById('userName');
        const userAvatar = document.getElementById('userAvatar');
        const loginBtn = document.getElementById('loginBtn');
        const logoutBtn = document.getElementById('logoutBtn');

        if (this.isAuthenticated && this.currentUser) {
            if (userName) userName.textContent = this.currentUser.name;
            if (userAvatar) userAvatar.textContent = this.currentUser.avatar;
            if (loginBtn) loginBtn.classList.add('hidden');
            if (logoutBtn) logoutBtn.classList.remove('hidden');
        } else {
            if (userName) userName.textContent = 'Faça login';
            if (userAvatar) userAvatar.textContent = '👤';
            if (loginBtn) loginBtn.classList.remove('hidden');
            if (logoutBtn) logoutBtn.classList.add('hidden');
        }
    }

    getCurrentUser() {
        return this.currentUser;
    }

    isUserAuthenticated() {
        return this.isAuthenticated;
    }

    // Método estático para compatibilidade
    static init() {
        if (!window.authModule) {
            window.authModule = new AuthModule();
        }
        return window.authModule;
    }

    static login() {
        if (window.authModule) {
            window.authModule.login();
        }
    }

    static logout() {
        if (window.authModule) {
            window.authModule.logout();
        }
    }
}

// Criar instância global
window.AuthModule = AuthModule;
window.authModule = new AuthModule();

console.log('✅ Módulo de autenticação carregado'); 
// Script para corrigir condição de corrida no roteamento
// Este script implementa um sistema de mutex para garantir que apenas uma rota seja renderizada por vez

console.log('🔧 [ROUTING FIX] Iniciando correção de condição de corrida...');

// Sistema de mutex para roteamento
window.routingMutex = {
    isRouting: false,
    currentRoute: null,
    pendingRoute: null,
    
    async executeRoute(path, renderFunction) {
        console.log(`🔒 [ROUTING MUTEX] Tentando executar rota: ${path}`);
        
        // Se já está roteando, cancelar a rota anterior
        if (this.isRouting) {
            console.log(`⚠️ [ROUTING MUTEX] Cancelando rota anterior: ${this.currentRoute}`);
            this.pendingRoute = { path, renderFunction };
            return;
        }
        
        this.isRouting = true;
        this.currentRoute = path;
        this.pendingRoute = null;
        
        try {
            console.log(`🚀 [ROUTING MUTEX] Executando rota: ${path}`);
            
            // Limpar o conteúdo anterior
            const appContent = document.getElementById('app-content');
            if (appContent) {
                appContent.innerHTML = '<div class="loading-spinner">Carregando...</div>';
            }
            
            // Executar a função de renderização
            await renderFunction();
            
            console.log(`✅ [ROUTING MUTEX] Rota executada com sucesso: ${path}`);
            
        } catch (error) {
            console.error(`❌ [ROUTING MUTEX] Erro ao executar rota ${path}:`, error);
            
            // Mostrar página de erro
            const appContent = document.getElementById('app-content');
            if (appContent) {
                appContent.innerHTML = `
                    <div class="error-page">
                        <h2>Erro ao carregar página</h2>
                        <p>Rota: ${path}</p>
                        <p>Erro: ${error.message}</p>
                        <button onclick="window.location.reload()" class="btn-primary">Recarregar</button>
                    </div>
                `;
            }
        } finally {
            this.isRouting = false;
            this.currentRoute = null;
            
            // Se há uma rota pendente, executá-la
            if (this.pendingRoute) {
                console.log(`🔄 [ROUTING MUTEX] Executando rota pendente: ${this.pendingRoute.path}`);
                const pending = this.pendingRoute;
                setTimeout(() => {
                    this.executeRoute(pending.path, pending.renderFunction);
                }, 100);
            }
        }
    }
};

// Backup das funções originais
window.originalRenderAnalytics = window.renderAnalytics;
window.originalRenderCategories = window.renderCategories;
window.originalRenderDashboard = window.renderDashboard;
window.originalRenderTransactions = window.renderTransactions;

// Wrapper para renderAnalytics com mutex
window.renderAnalytics = async function() {
    console.log('🎯 [ANALYTICS] Chamada interceptada pelo mutex');
    await window.routingMutex.executeRoute('/analytics', async () => {
        console.log('🎯 [ANALYTICS] Executando renderização protegida...');
        
        // Verificar se a função original existe
        if (typeof window.originalRenderAnalytics === 'function') {
            await window.originalRenderAnalytics();
        } else {
            // Usar a implementação do AnalyticsRoute.js
            const { renderAnalytics: analyticsRender } = await import('./ui/AnalyticsRoute.js?' + Date.now());
            await analyticsRender();
        }
    });
};

// Wrapper para renderCategories com mutex
window.renderCategories = async function() {
    console.log('📊 [CATEGORIES] Chamada interceptada pelo mutex');
    await window.routingMutex.executeRoute('/categories', async () => {
        console.log('📊 [CATEGORIES] Executando renderização protegida...');
        if (typeof window.originalRenderCategories === 'function') {
            await window.originalRenderCategories();
        }
    });
};

// Wrapper para renderDashboard com mutex
window.renderDashboard = async function() {
    console.log('🏠 [DASHBOARD] Chamada interceptada pelo mutex');
    await window.routingMutex.executeRoute('/dashboard', async () => {
        console.log('🏠 [DASHBOARD] Executando renderização protegida...');
        if (typeof window.originalRenderDashboard === 'function') {
            await window.originalRenderDashboard();
        }
    });
};

// Wrapper para renderTransactions com mutex
window.renderTransactions = async function() {
    console.log('💰 [TRANSACTIONS] Chamada interceptada pelo mutex');
    await window.routingMutex.executeRoute('/transactions', async () => {
        console.log('💰 [TRANSACTIONS] Executando renderização protegida...');
        if (typeof window.originalRenderTransactions === 'function') {
            await window.originalRenderTransactions();
        }
    });
};

// Função para testar o sistema
window.testRoutingFix = async function() {
    console.log('🧪 [TEST] Testando correção de roteamento...');
    
    // Verificar estado inicial
    console.log('📊 Estado inicial:', {
        isRouting: window.routingMutex.isRouting,
        currentRoute: window.routingMutex.currentRoute,
        pendingRoute: window.routingMutex.pendingRoute
    });
    
    // Testar navegação para analytics
    console.log('🎯 Testando navegação para analytics...');
    await window.renderAnalytics();
    
    // Verificar se analytics-content foi criado
    const analyticsContent = document.getElementById('analytics-content');
    if (analyticsContent) {
        console.log('✅ [TEST] analytics-content encontrado!');
        console.log('📊 Conteúdo:', analyticsContent.innerHTML.substring(0, 200) + '...');
        return true;
    } else {
        console.log('❌ [TEST] analytics-content NÃO encontrado!');
        console.log('📊 DOM atual:', document.getElementById('app-content')?.innerHTML.substring(0, 200) + '...');
        return false;
    }
};

console.log('✅ [ROUTING FIX] Sistema de mutex instalado!');
console.log('🧪 Para testar, execute: window.testRoutingFix()');
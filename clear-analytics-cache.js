// Script para Limpar Cache do Analytics
// Execute este script no console para limpar qualquer cache

console.log('🧹 Limpando cache do Analytics...');

// 1. Limpar cache de módulos se possível
if (window.moduleCache) {
    delete window.moduleCache['./AnalyticsRoute.js'];
    delete window.moduleCache['AnalyticsRoute.js'];
    delete window.moduleCache['/src/js/ui/AnalyticsRoute.js'];
    console.log('✅ Cache de módulos limpo');
}

// 2. Remover função global antiga
if (window.renderAnalytics) {
    delete window.renderAnalytics;
    console.log('✅ Função renderAnalytics removida');
}

// 3. Limpar qualquer timer ou listener antigo
if (window.analyticsTimers) {
    window.analyticsTimers.forEach(timer => clearTimeout(timer));
    window.analyticsTimers = [];
    console.log('✅ Timers limpos');
}

// 4. Forçar recarregamento do módulo
async function recarregarModulo() {
    try {
        // Adicionar timestamp para forçar recarregamento
        const timestamp = Date.now();
        const module = await import(`./src/js/ui/AnalyticsRoute.js?v=${timestamp}`);
        
        // Registrar nova função
        window.renderAnalytics = module.renderAnalytics;
        
        console.log('✅ Módulo AnalyticsRoute recarregado com sucesso');
        console.log('🔧 Nova função renderAnalytics registrada');
        
        return true;
    } catch (error) {
        console.error('❌ Erro ao recarregar módulo:', error);
        return false;
    }
}

// 5. Função para testar após limpeza
async function testarAposLimpeza() {
    console.log('🧪 Testando após limpeza...');
    
    // Recarregar módulo
    const sucesso = await recarregarModulo();
    
    if (sucesso) {
        // Aguardar um pouco
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Testar navegação
        console.log('🧭 Testando navegação...');
        window.location.hash = '#analytics';
        
        // Verificar resultado após 3 segundos
        setTimeout(() => {
            const analyticsContent = document.getElementById('analytics-content');
            if (analyticsContent) {
                console.log('🎉 SUCESSO: analytics-content criado após limpeza!');
            } else {
                console.log('❌ FALHA: analytics-content ainda não criado');
            }
        }, 3000);
        
    } else {
        console.log('❌ Não foi possível recarregar o módulo');
    }
}

// 6. Executar limpeza completa
async function limpezaCompleta() {
    console.log('🚀 Executando limpeza completa...');
    
    // Limpar localStorage relacionado
    Object.keys(localStorage).forEach(key => {
        if (key.includes('analytics') || key.includes('chart')) {
            localStorage.removeItem(key);
            console.log(`🗑️ Removido do localStorage: ${key}`);
        }
    });
    
    // Limpar sessionStorage relacionado
    Object.keys(sessionStorage).forEach(key => {
        if (key.includes('analytics') || key.includes('chart')) {
            sessionStorage.removeItem(key);
            console.log(`🗑️ Removido do sessionStorage: ${key}`);
        }
    });
    
    // Limpar qualquer elemento analytics-content existente
    const existingAnalytics = document.getElementById('analytics-content');
    if (existingAnalytics) {
        existingAnalytics.remove();
        console.log('🗑️ Elemento analytics-content existente removido');
    }
    
    // Testar após limpeza
    await testarAposLimpeza();
}

// Executar limpeza
limpezaCompleta().catch(error => {
    console.error('💥 Erro durante limpeza:', error);
});

// Exportar funções para uso manual
window.clearAnalyticsCache = limpezaCompleta;
window.reloadAnalyticsModule = recarregarModulo;

console.log('📝 Funções disponíveis:');
console.log('  - window.clearAnalyticsCache() - Limpeza completa');
console.log('  - window.reloadAnalyticsModule() - Recarregar apenas o módulo');
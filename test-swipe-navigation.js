// Script para testar a navegação por deslize
// Execute no console do navegador

console.log('🧪 Testando navegação por deslize...');

// Verificar se o SwipeNavigation está inicializado
if (window.swipeNavigation) {
    console.log('✅ SwipeNavigation encontrado');
    console.log('📋 Abas configuradas:', window.swipeNavigation.tabs);
    console.log('📍 Aba atual:', window.swipeNavigation.currentTabIndex);
    
    // Verificar se /analytics está na lista
    const analyticsIndex = window.swipeNavigation.tabs.indexOf('/analytics');
    if (analyticsIndex !== -1) {
        console.log('✅ /analytics encontrado no índice:', analyticsIndex);
        
        // Verificar ordem das abas
        console.log('📊 Ordem das abas:');
        window.swipeNavigation.tabs.forEach((tab, index) => {
            console.log(`  ${index}: ${tab}`);
        });
        
        // Testar navegação para analytics
        console.log('🧪 Testando navegação para /analytics...');
        window.swipeNavigation.navigateToTab(analyticsIndex);
        
        setTimeout(() => {
            const currentRoute = window.location.hash.replace('#', '') || '/dashboard';
            if (currentRoute === '/analytics') {
                console.log('✅ Navegação para /analytics funcionou!');
            } else {
                console.log('❌ Falha na navegação. Rota atual:', currentRoute);
            }
        }, 500);
        
    } else {
        console.log('❌ /analytics NÃO encontrado na lista de abas');
    }
} else {
    console.log('❌ SwipeNavigation não encontrado');
    console.log('🔍 Verificando se existe na janela...');
    console.log('window.SwipeNavigation:', typeof window.SwipeNavigation);
}

// Verificar se a rota /analytics está registrada no router
console.log('🔍 Verificando rotas registradas...');
if (window.routes) {
    console.log('📋 Rotas disponíveis:', Object.keys(window.routes));
    if (window.routes['/analytics']) {
        console.log('✅ Rota /analytics registrada no router');
    } else {
        console.log('❌ Rota /analytics NÃO registrada no router');
    }
} else {
    console.log('❌ window.routes não encontrado');
}

// Verificar botão de navegação
const analyticsBtn = document.querySelector('[data-route="/analytics"]');
if (analyticsBtn) {
    console.log('✅ Botão de analytics encontrado:', analyticsBtn);
} else {
    console.log('❌ Botão de analytics não encontrado');
}
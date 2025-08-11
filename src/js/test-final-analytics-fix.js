// Teste Final - Correção Completa do Analytics
console.log('🧪 [TESTE FINAL] Iniciando teste completo da correção do analytics...');

// 1. Carregar e aplicar a correção de roteamento
async function loadRoutingFix() {
    console.log('🔧 [TESTE FINAL] Carregando correção de roteamento...');
    
    try {
        // Importar o script de correção
        const script = document.createElement('script');
        script.src = './fix-routing-race-condition.js?' + Date.now();
        document.head.appendChild(script);
        
        // Aguardar carregamento
        await new Promise((resolve, reject) => {
            script.onload = resolve;
            script.onerror = reject;
        });
        
        console.log('✅ [TESTE FINAL] Correção de roteamento carregada');
        return true;
    } catch (error) {
        console.error('❌ [TESTE FINAL] Erro ao carregar correção:', error);
        return false;
    }
}

// 2. Verificar estado da aplicação
function checkAppState() {
    console.log('📊 [TESTE FINAL] Verificando estado da aplicação...');
    
    const state = {
        url: window.location.href,
        hash: window.location.hash,
        user: !!window.appState?.currentUser,
        budget: !!window.appState?.currentBudget,
        appContent: !!document.getElementById('app-content'),
        analyticsContent: !!document.getElementById('analytics-content'),
        routingMutex: !!window.routingMutex,
        isRouting: window.routingMutex?.isRouting || false
    };
    
    console.log('📊 Estado atual:', state);
    return state;
}

// 3. Limpar estado anterior
function clearPreviousState() {
    console.log('🧹 [TESTE FINAL] Limpando estado anterior...');
    
    // Limpar analytics-content se existir
    const existingAnalytics = document.getElementById('analytics-content');
    if (existingAnalytics) {
        existingAnalytics.remove();
        console.log('🧹 analytics-content anterior removido');
    }
    
    // Limpar app-content
    const appContent = document.getElementById('app-content');
    if (appContent) {
        appContent.innerHTML = '';
        console.log('🧹 app-content limpo');
    }
    
    // Reset do mutex se existir
    if (window.routingMutex) {
        window.routingMutex.isRouting = false;
        window.routingMutex.currentRoute = null;
        window.routingMutex.pendingRoute = null;
        console.log('🧹 Mutex resetado');
    }
}

// 4. Testar navegação para analytics
async function testAnalyticsNavigation() {
    console.log('🎯 [TESTE FINAL] Testando navegação para analytics...');
    
    try {
        // Verificar se a função existe
        if (typeof window.renderAnalytics !== 'function') {
            throw new Error('Função renderAnalytics não encontrada');
        }
        
        console.log('🚀 Executando renderAnalytics...');
        await window.renderAnalytics();
        
        // Aguardar um pouco para garantir que o DOM foi atualizado
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Verificar resultado
        const analyticsContent = document.getElementById('analytics-content');
        if (analyticsContent) {
            console.log('✅ [TESTE FINAL] analytics-content criado com sucesso!');
            console.log('📊 Conteúdo:', analyticsContent.innerHTML.substring(0, 200) + '...');
            
            // Verificar se há gráficos
            const charts = analyticsContent.querySelectorAll('canvas, .chart, [id*="chart"]');
            console.log(`📈 Gráficos encontrados: ${charts.length}`);
            
            return true;
        } else {
            console.log('❌ [TESTE FINAL] analytics-content NÃO foi criado');
            
            // Debug do DOM atual
            const appContent = document.getElementById('app-content');
            if (appContent) {
                console.log('🔍 DOM atual:', appContent.innerHTML.substring(0, 300) + '...');
            }
            
            return false;
        }
        
    } catch (error) {
        console.error('❌ [TESTE FINAL] Erro durante navegação:', error);
        return false;
    }
}

// 5. Teste de múltiplas navegações (condição de corrida)
async function testRaceCondition() {
    console.log('🏁 [TESTE FINAL] Testando condição de corrida...');
    
    try {
        // Limpar estado
        clearPreviousState();
        
        // Executar múltiplas chamadas simultâneas
        console.log('🚀 Executando 3 chamadas simultâneas...');
        const promises = [
            window.renderAnalytics(),
            window.renderAnalytics(),
            window.renderAnalytics()
        ];
        
        await Promise.all(promises);
        
        // Verificar resultado
        const analyticsContent = document.getElementById('analytics-content');
        if (analyticsContent) {
            console.log('✅ [TESTE FINAL] Condição de corrida resolvida com sucesso!');
            return true;
        } else {
            console.log('❌ [TESTE FINAL] Condição de corrida ainda presente');
            return false;
        }
        
    } catch (error) {
        console.error('❌ [TESTE FINAL] Erro no teste de condição de corrida:', error);
        return false;
    }
}

// 6. Função principal de teste
async function runFinalTest() {
    console.log('🎬 [TESTE FINAL] Iniciando teste completo...');
    
    try {
        // Verificar estado inicial
        console.log('📊 Estado inicial:');
        checkAppState();
        
        // Carregar correção de roteamento
        const routingFixed = await loadRoutingFix();
        if (!routingFixed) {
            console.log('⚠️ [TESTE FINAL] Continuando sem correção de roteamento...');
        }
        
        // Aguardar um pouco
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Limpar estado
        clearPreviousState();
        
        // Teste 1: Navegação simples
        console.log('\n🧪 TESTE 1: Navegação simples');
        const test1 = await testAnalyticsNavigation();
        
        // Teste 2: Condição de corrida
        console.log('\n🧪 TESTE 2: Condição de corrida');
        const test2 = await testRaceCondition();
        
        // Resultado final
        console.log('\n🏆 RESULTADO FINAL:');
        console.log(`✅ Teste 1 (Navegação): ${test1 ? 'PASSOU' : 'FALHOU'}`);
        console.log(`✅ Teste 2 (Corrida): ${test2 ? 'PASSOU' : 'FALHOU'}`);
        
        if (test1 && test2) {
            console.log('🎉 TODOS OS TESTES PASSARAM! O problema foi resolvido!');
            
            // Mostrar estado final
            console.log('\n📊 Estado final:');
            checkAppState();
            
            return true;
        } else {
            console.log('❌ ALGUNS TESTES FALHARAM. Investigação adicional necessária.');
            return false;
        }
        
    } catch (error) {
        console.error('💥 [TESTE FINAL] Erro durante teste:', error);
        return false;
    }
}

// 7. Função de diagnóstico avançado
function advancedDiagnostic() {
    console.log('🔬 [DIAGNÓSTICO] Executando diagnóstico avançado...');
    
    // Verificar todas as funções relacionadas
    const functions = [
        'renderAnalytics',
        'renderCategories', 
        'renderDashboard',
        'renderTransactions',
        'router'
    ];
    
    functions.forEach(funcName => {
        const func = window[funcName];
        console.log(`🔍 ${funcName}:`, {
            exists: typeof func === 'function',
            isNative: func && func.toString().includes('[native code]'),
            length: func ? func.length : 'N/A'
        });
    });
    
    // Verificar elementos DOM
    const elements = [
        'app-content',
        'analytics-content',
        'fab-container',
        'bottom-nav'
    ];
    
    elements.forEach(elemId => {
        const elem = document.getElementById(elemId);
        console.log(`🔍 #${elemId}:`, {
            exists: !!elem,
            hasContent: elem ? elem.innerHTML.length > 0 : false,
            classes: elem ? elem.className : 'N/A'
        });
    });
    
    // Verificar estado global
    console.log('🔍 Estado global:', {
        appState: !!window.appState,
        currentUser: !!window.appState?.currentUser,
        currentBudget: !!window.appState?.currentBudget,
        routingMutex: !!window.routingMutex
    });
}

// Exportar funções para uso manual
window.testFinalAnalyticsFix = runFinalTest;
window.diagnosticAnalytics = advancedDiagnostic;
window.clearAnalyticsState = clearPreviousState;

console.log('✅ [TESTE FINAL] Script carregado!');
console.log('🧪 Para executar o teste completo: window.testFinalAnalyticsFix()');
console.log('🔬 Para diagnóstico avançado: window.diagnosticAnalytics()');
console.log('🧹 Para limpar estado: window.clearAnalyticsState()');

// Auto-executar se solicitado
if (window.location.search.includes('autotest=true')) {
    console.log('🚀 Auto-executando teste...');
    setTimeout(runFinalTest, 2000);
}
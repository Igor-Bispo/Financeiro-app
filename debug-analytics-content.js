// Script de Diagnóstico - Problema analytics-content
// Execute este script no console para diagnosticar o problema

console.log('🔍 Iniciando diagnóstico do problema analytics-content...');

// Função para monitorar mudanças no DOM
function monitorarDOM() {
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'childList') {
                mutation.addedNodes.forEach(node => {
                    if (node.nodeType === 1) { // Element node
                        if (node.id === 'analytics-content') {
                            console.log('✅ analytics-content ADICIONADO ao DOM');
                        }
                        if (node.querySelector && node.querySelector('#analytics-content')) {
                            console.log('✅ analytics-content encontrado em nó adicionado');
                        }
                    }
                });
                
                mutation.removedNodes.forEach(node => {
                    if (node.nodeType === 1) { // Element node
                        if (node.id === 'analytics-content') {
                            console.log('❌ analytics-content REMOVIDO do DOM');
                        }
                        if (node.querySelector && node.querySelector('#analytics-content')) {
                            console.log('❌ analytics-content removido em nó removido');
                        }
                    }
                });
            }
            
            if (mutation.type === 'attributes' && mutation.target.id === 'app-content') {
                console.log('🔄 app-content teve atributos modificados');
            }
        });
    });
    
    observer.observe(document.body, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ['id', 'class']
    });
    
    console.log('👀 Monitor DOM ativado');
    return observer;
}

// Função para verificar estado atual
function verificarEstado() {
    const estado = {
        timestamp: new Date().toISOString(),
        url: window.location.hash,
        appContent: !!document.getElementById('app-content'),
        analyticsContent: !!document.getElementById('analytics-content'),
        appContentHTML: document.getElementById('app-content')?.innerHTML?.length || 0,
        usuario: window.appState?.currentUser?.uid || null,
        orcamento: window.appState?.currentBudget?.id || null
    };
    
    console.log('📊 Estado atual:', estado);
    
    // Verificar se há elementos com analytics no DOM
    const elementsWithAnalytics = document.querySelectorAll('[id*="analytics"], [class*="analytics"]');
    console.log('🔍 Elementos com "analytics":', elementsWithAnalytics.length);
    elementsWithAnalytics.forEach((el, index) => {
        console.log(`  ${index + 1}. ${el.tagName}#${el.id}.${el.className}`);
    });
    
    return estado;
}

// Função para simular navegação para analytics
async function simularNavegacaoAnalytics() {
    console.log('🧭 Simulando navegação para analytics...');
    
    const estadoInicial = verificarEstado();
    
    // Navegar para analytics
    window.location.hash = '#analytics';
    
    // Aguardar um pouco
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const estadoFinal = verificarEstado();
    
    console.log('📊 Comparação de estados:');
    console.log('  Inicial:', estadoInicial);
    console.log('  Final:', estadoFinal);
    
    return { inicial: estadoInicial, final: estadoFinal };
}

// Função para forçar criação do analytics-content
function forcarCriacaoAnalyticsContent() {
    console.log('🔧 Forçando criação do analytics-content...');
    
    const appContent = document.getElementById('app-content');
    if (!appContent) {
        console.error('❌ app-content não encontrado');
        return false;
    }
    
    console.log('✅ app-content encontrado');
    
    // Criar estrutura manualmente
    appContent.innerHTML = `
        <div class="tab-container">
            <div class="tab-header">
                <h2 class="tab-title-highlight">Análises Financeiras</h2>
            </div>
            <div class="tab-content">
                <div class="content-spacing" id="analytics-content">
                    <div class="text-center py-8">
                        <div class="text-4xl mb-4">📊</div>
                        <div class="text-lg font-semibold text-gray-800 dark:text-white mb-2">Analytics Content Criado</div>
                        <div class="text-gray-600 dark:text-gray-400">Container criado manualmente para teste</div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Verificar se foi criado
    const analyticsContent = document.getElementById('analytics-content');
    if (analyticsContent) {
        console.log('✅ analytics-content criado com sucesso');
        return true;
    } else {
        console.error('❌ Falha ao criar analytics-content');
        return false;
    }
}

// Função principal de diagnóstico
async function executarDiagnostico() {
    console.log('🚀 Executando diagnóstico completo...');
    
    // 1. Verificar estado inicial
    console.log('\n1️⃣ Verificando estado inicial...');
    verificarEstado();
    
    // 2. Ativar monitor DOM
    console.log('\n2️⃣ Ativando monitor DOM...');
    const observer = monitorarDOM();
    
    // 3. Simular navegação
    console.log('\n3️⃣ Simulando navegação...');
    await simularNavegacaoAnalytics();
    
    // 4. Aguardar um pouco para observar mudanças
    console.log('\n4️⃣ Aguardando mudanças...');
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // 5. Verificar se analytics-content existe
    console.log('\n5️⃣ Verificando analytics-content...');
    const analyticsContent = document.getElementById('analytics-content');
    if (analyticsContent) {
        console.log('✅ analytics-content encontrado!');
    } else {
        console.log('❌ analytics-content NÃO encontrado');
        
        // 6. Tentar forçar criação
        console.log('\n6️⃣ Tentando forçar criação...');
        const sucesso = forcarCriacaoAnalyticsContent();
        
        if (sucesso) {
            console.log('✅ Criação forçada bem-sucedida');
        } else {
            console.log('❌ Falha na criação forçada');
        }
    }
    
    // 7. Parar monitor
    console.log('\n7️⃣ Parando monitor...');
    observer.disconnect();
    
    console.log('\n🏁 Diagnóstico concluído');
}

// Executar diagnóstico
executarDiagnostico().catch(error => {
    console.error('💥 Erro durante diagnóstico:', error);
});
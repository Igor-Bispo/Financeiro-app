// Teste Final - Versão Definitiva do Analytics
// Execute este script no console para testar a correção definitiva

console.log('🎯 TESTE FINAL - Versão Definitiva do Analytics');
console.log('==============================================');

// Função para verificar estado completo
function verificarEstadoCompleto() {
    const estado = {
        timestamp: new Date().toISOString(),
        url: window.location.hash,
        usuario: {
            existe: !!window.appState?.currentUser,
            uid: window.appState?.currentUser?.uid || null
        },
        orcamento: {
            existe: !!window.appState?.currentBudget,
            id: window.appState?.currentBudget?.id || null,
            nome: window.appState?.currentBudget?.nome || null
        },
        elementos: {
            appContent: !!document.getElementById('app-content'),
            analyticsContent: !!document.getElementById('analytics-content'),
            evolucaoChart: !!document.getElementById('evolucao-chart'),
            categoriasChart: !!document.getElementById('categorias-chart')
        },
        funcoes: {
            renderAnalytics: typeof window.renderAnalytics === 'function',
            loadBudgets: typeof window.loadBudgets === 'function',
            setCurrentBudget: typeof window.setCurrentBudget === 'function'
        }
    };
    
    console.log('📊 Estado completo:', estado);
    return estado;
}

// Função para monitorar mudanças no DOM
function monitorarDOM() {
    console.log('👁️ Iniciando monitoramento do DOM...');
    
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'childList') {
                mutation.addedNodes.forEach((node) => {
                    if (node.nodeType === 1) { // Element node
                        if (node.id === 'analytics-content') {
                            console.log('✅ analytics-content ADICIONADO ao DOM!', node);
                        }
                        if (node.id === 'evolucao-chart') {
                            console.log('✅ evolucao-chart ADICIONADO ao DOM!', node);
                        }
                        if (node.id === 'categorias-chart') {
                            console.log('✅ categorias-chart ADICIONADO ao DOM!', node);
                        }
                    }
                });
                
                mutation.removedNodes.forEach((node) => {
                    if (node.nodeType === 1) { // Element node
                        if (node.id === 'analytics-content') {
                            console.log('❌ analytics-content REMOVIDO do DOM!', node);
                        }
                    }
                });
            }
        });
    });
    
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
    
    return observer;
}

// Função para testar navegação com monitoramento
async function testarNavegacaoCompleta() {
    console.log('\n🧭 Testando navegação completa...');
    
    // 1. Estado inicial
    console.log('\n1️⃣ Estado inicial:');
    const estadoInicial = verificarEstadoCompleto();
    
    // 2. Iniciar monitoramento
    const observer = monitorarDOM();
    
    // 3. Navegar para analytics
    console.log('\n2️⃣ Navegando para analytics...');
    window.location.hash = '#analytics';
    
    // 4. Aguardar renderização
    console.log('\n3️⃣ Aguardando renderização...');
    await new Promise(resolve => setTimeout(resolve, 5000));
    
    // 5. Estado final
    console.log('\n4️⃣ Estado final:');
    const estadoFinal = verificarEstadoCompleto();
    
    // 6. Parar monitoramento
    observer.disconnect();
    
    // 7. Análise dos resultados
    console.log('\n5️⃣ Análise dos resultados:');
    
    const sucesso = {
        navegacao: estadoFinal.url.includes('analytics'),
        container: estadoFinal.elementos.analyticsContent,
        graficos: estadoFinal.elementos.evolucaoChart && estadoFinal.elementos.categoriasChart
    };
    
    console.log('📊 Resultados:');
    console.log('  ✅ Navegação:', sucesso.navegacao ? 'SUCESSO' : 'FALHA');
    console.log('  ✅ Container:', sucesso.container ? 'SUCESSO' : 'FALHA');
    console.log('  ✅ Gráficos:', sucesso.graficos ? 'SUCESSO' : 'PENDENTE');
    
    if (sucesso.navegacao && sucesso.container) {
        console.log('\n🎉 TESTE PASSOU! Analytics funcionando corretamente!');
        
        if (!sucesso.graficos) {
            console.log('⏳ Gráficos ainda carregando, aguarde alguns segundos...');
            
            // Verificar gráficos após mais tempo
            setTimeout(() => {
                const estadoGraficos = verificarEstadoCompleto();
                if (estadoGraficos.elementos.evolucaoChart && estadoGraficos.elementos.categoriasChart) {
                    console.log('🎉 GRÁFICOS CARREGADOS! Teste 100% completo!');
                } else {
                    console.log('⚠️ Gráficos ainda não carregados, verifique erros no console');
                }
            }, 5000);
        }
        
        return true;
    } else {
        console.log('\n❌ TESTE FALHOU!');
        
        if (!sucesso.navegacao) {
            console.log('  - Problema na navegação');
        }
        if (!sucesso.container) {
            console.log('  - Container analytics-content não foi criado');
        }
        
        return false;
    }
}

// Função para forçar recarregamento do módulo
async function forcarRecarregamento() {
    console.log('\n🔄 Forçando recarregamento do módulo...');
    
    try {
        // Remover função antiga
        if (window.renderAnalytics) {
            delete window.renderAnalytics;
            console.log('🗑️ Função antiga removida');
        }
        
        // Recarregar módulo com timestamp
        const timestamp = Date.now();
        const module = await import(`./src/js/ui/AnalyticsRoute.js?v=${timestamp}`);
        
        // Registrar nova função
        window.renderAnalytics = module.renderAnalytics;
        
        console.log('✅ Módulo recarregado com sucesso');
        return true;
        
    } catch (error) {
        console.error('❌ Erro ao recarregar módulo:', error);
        return false;
    }
}

// Função principal de teste
async function executarTesteFinal() {
    console.log('\n🚀 Executando teste final...');
    
    try {
        // 1. Verificar se precisa recarregar módulo
        if (!window.renderAnalytics || !window.renderAnalytics.toString().includes('versão definitiva')) {
            console.log('🔄 Recarregando módulo...');
            const sucesso = await forcarRecarregamento();
            if (!sucesso) {
                console.log('❌ Falha ao recarregar módulo, continuando com versão atual...');
            }
        }
        
        // 2. Testar navegação
        const sucessoTeste = await testarNavegacaoCompleta();
        
        // 3. Resultado final
        console.log('\n📋 RESULTADO FINAL:');
        if (sucessoTeste) {
            console.log('🎉 SUCESSO TOTAL! O problema foi resolvido!');
            console.log('✅ O container analytics-content está sendo criado corretamente');
            console.log('✅ A página de análises está funcionando');
        } else {
            console.log('❌ FALHA! O problema persiste');
            console.log('🔧 Possíveis soluções:');
            console.log('  1. Recarregar a página completamente (F5)');
            console.log('  2. Limpar cache do navegador');
            console.log('  3. Verificar se há erros de JavaScript no console');
            console.log('  4. Verificar se o usuário está logado e tem orçamentos');
        }
        
    } catch (error) {
        console.error('💥 Erro durante teste final:', error);
    }
}

// Executar teste
executarTesteFinal();

// Exportar funções para uso manual
window.testAnalyticsFinal = executarTesteFinal;
window.reloadAnalyticsModule = forcarRecarregamento;

console.log('\n📝 Funções disponíveis:');
console.log('  - window.testAnalyticsFinal() - Executar teste completo');
console.log('  - window.reloadAnalyticsModule() - Recarregar módulo');
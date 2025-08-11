// Script para testar a correção robusta do problema de timing dos gráficos
console.log('🔍 Testando correção robusta do Analytics...');

// Função para monitorar mudanças no DOM
function monitorarDOM() {
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'childList') {
                mutation.addedNodes.forEach((node) => {
                    if (node.nodeType === Node.ELEMENT_NODE) {
                        if (node.id === 'evolucao-chart' || node.id === 'categorias-chart') {
                            console.log('📊 Elemento de gráfico adicionado:', node.id);
                        }
                        
                        // Verificar se elementos foram adicionados dentro do node
                        if (node.querySelector) {
                            const evolucao = node.querySelector('#evolucao-chart');
                            const categorias = node.querySelector('#categorias-chart');
                            
                            if (evolucao) console.log('📊 evolucao-chart encontrado em:', node);
                            if (categorias) console.log('📊 categorias-chart encontrado em:', node);
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

// Função para verificar estado atual
function verificarEstado() {
    const estado = {
        url: window.location.hash,
        usuario: !!window.appState?.currentUser,
        orcamento: !!window.appState?.currentBudget,
        analyticsContent: !!document.getElementById('analytics-content'),
        evolucaoChart: !!document.getElementById('evolucao-chart'),
        categoriasChart: !!document.getElementById('categorias-chart'),
        analyticsClass: !!window.Analytics
    };
    
    console.log('📊 Estado atual:', estado);
    return estado;
}

// Função para testar renderização
async function testarRenderizacao() {
    console.log('🧪 Iniciando teste de renderização...');
    
    // Verificar estado inicial
    const estadoInicial = verificarEstado();
    
    // Iniciar monitoramento do DOM
    const observer = monitorarDOM();
    
    try {
        // Se não estiver na página de analytics, navegar
        if (window.location.hash !== '#/analytics') {
            console.log('🔄 Navegando para analytics...');
            window.location.hash = '#/analytics';
            
            // Aguardar navegação
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
        
        // Aguardar renderização completa
        console.log('⏳ Aguardando renderização completa...');
        await new Promise(resolve => setTimeout(resolve, 3000));
        
        // Verificar estado final
        const estadoFinal = verificarEstado();
        
        console.log('📊 Comparação de estados:');
        console.log('- Inicial:', estadoInicial);
        console.log('- Final:', estadoFinal);
        
        // Verificar se os gráficos têm conteúdo
        const evolucaoChart = document.getElementById('evolucao-chart');
        const categoriasChart = document.getElementById('categorias-chart');
        
        if (evolucaoChart && categoriasChart) {
            console.log('✅ Elementos encontrados!');
            console.log('- evolucao-chart conteúdo:', evolucaoChart.innerHTML.length > 0 ? 'Sim' : 'Não');
            console.log('- categorias-chart conteúdo:', categoriasChart.innerHTML.length > 0 ? 'Sim' : 'Não');
            
            // Verificar se há gráficos renderizados
            const temGraficoEvolucao = evolucaoChart.querySelector('.analytics-chart');
            const temGraficoCategorias = categoriasChart.querySelector('.analytics-chart');
            
            console.log('📊 Gráficos renderizados:');
            console.log('- Evolução:', !!temGraficoEvolucao);
            console.log('- Categorias:', !!temGraficoCategorias);
            
            if (temGraficoEvolucao && temGraficoCategorias) {
                console.log('🎉 SUCESSO! Ambos os gráficos foram renderizados corretamente!');
            } else {
                console.log('⚠️ Elementos encontrados mas gráficos não renderizados');
            }
        } else {
            console.log('❌ Elementos dos gráficos não encontrados');
            
            // Tentar encontrar o container principal
            const analyticsContent = document.getElementById('analytics-content');
            if (analyticsContent) {
                console.log('📋 Conteúdo do analytics-content:');
                console.log(analyticsContent.innerHTML.substring(0, 500) + '...');
            }
        }
        
    } catch (error) {
        console.error('❌ Erro durante o teste:', error);
    } finally {
        // Parar monitoramento
        observer.disconnect();
    }
}

// Função para forçar re-renderização se necessário
async function forcarReRenderizacao() {
    console.log('🔧 Forçando re-renderização...');
    
    if (window.renderAnalytics) {
        try {
            await window.renderAnalytics();
            console.log('✅ Re-renderização forçada concluída');
        } catch (error) {
            console.error('❌ Erro na re-renderização:', error);
        }
    } else {
        console.log('❌ Função renderAnalytics não encontrada');
    }
}

// Executar teste
console.log('🚀 Iniciando teste robusta...');
testarRenderizacao().then(() => {
    console.log('✅ Teste concluído');
}).catch(error => {
    console.error('❌ Erro no teste:', error);
});

// Disponibilizar função para re-renderização manual
window.forcarReRenderizacao = forcarReRenderizacao;
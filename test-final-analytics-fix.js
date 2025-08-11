// Script de Teste Final - Correção Robusta dos Gráficos Analytics
// Execute este script no console do navegador para verificar se a correção está funcionando

console.log('🧪 Iniciando teste final da correção robusta dos gráficos...');

// Função para verificar o estado atual
function verificarEstadoAtual() {
    const estado = {
        url: window.location.hash,
        usuario: window.appState?.currentUser?.uid || null,
        orcamento: window.appState?.currentBudget?.id || null,
        analyticsContent: !!document.getElementById('analytics-content'),
        evolucaoChart: !!document.getElementById('evolucao-chart'),
        categoriasChart: !!document.getElementById('categorias-chart'),
        analyticsClass: typeof Analytics !== 'undefined'
    };
    
    console.log('📊 Estado atual:', estado);
    return estado;
}

// Função para verificar se os gráficos foram renderizados com sucesso
function verificarGraficosRenderizados() {
    const evolucaoChart = document.getElementById('evolucao-chart');
    const categoriasChart = document.getElementById('categorias-chart');
    
    const resultado = {
        evolucaoExiste: !!evolucaoChart,
        evolucaoTemConteudo: evolucaoChart && evolucaoChart.innerHTML.trim().length > 0,
        categoriasExiste: !!categoriasChart,
        categoriasTemConteudo: categoriasChart && categoriasChart.innerHTML.trim().length > 0
    };
    
    console.log('📈 Verificação dos gráficos:', resultado);
    
    if (resultado.evolucaoExiste && resultado.evolucaoTemConteudo && 
        resultado.categoriasExiste && resultado.categoriasTemConteudo) {
        console.log('✅ SUCESSO: Ambos os gráficos foram renderizados corretamente!');
        return true;
    } else {
        console.log('❌ FALHA: Um ou mais gráficos não foram renderizados corretamente');
        return false;
    }
}

// Função para monitorar mudanças no DOM
function monitorarDOM() {
    return new Promise((resolve) => {
        let tentativas = 0;
        const maxTentativas = 10;
        
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'childList') {
                    const evolucaoAdicionado = Array.from(mutation.addedNodes).some(node => 
                        node.id === 'evolucao-chart' || (node.querySelector && node.querySelector('#evolucao-chart'))
                    );
                    
                    if (evolucaoAdicionado) {
                        console.log('🎯 Elemento evolucao-chart detectado no DOM');
                        setTimeout(() => {
                            if (verificarGraficosRenderizados()) {
                                observer.disconnect();
                                resolve(true);
                            }
                        }, 500);
                    }
                }
            });
        });
        
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
        
        // Timeout de segurança
        setTimeout(() => {
            observer.disconnect();
            console.log('⏰ Timeout do monitor DOM');
            resolve(false);
        }, 15000);
    });
}

// Função principal de teste
async function executarTesteFinal() {
    console.log('🚀 Executando teste final...');
    
    // 1. Verificar estado inicial
    const estadoInicial = verificarEstadoAtual();
    
    // 2. Navegar para analytics se necessário
    if (!estadoInicial.url.includes('analytics')) {
        console.log('🧭 Navegando para a página de analytics...');
        window.location.hash = '#analytics';
        
        // Aguardar navegação
        await new Promise(resolve => setTimeout(resolve, 1000));
    }
    
    // 3. Monitorar DOM e aguardar renderização
    console.log('👀 Monitorando renderização dos gráficos...');
    const monitorPromise = monitorarDOM();
    
    // 4. Verificar periodicamente
    const intervalos = [];
    for (let i = 1; i <= 5; i++) {
        intervalos.push(
            new Promise(resolve => {
                setTimeout(() => {
                    console.log(`🔍 Verificação ${i}/5...`);
                    const sucesso = verificarGraficosRenderizados();
                    resolve(sucesso);
                }, i * 2000);
            })
        );
    }
    
    // 5. Aguardar qualquer resultado positivo
    const resultados = await Promise.allSettled([monitorPromise, ...intervalos]);
    const algumSucesso = resultados.some(r => r.status === 'fulfilled' && r.value === true);
    
    // 6. Resultado final
    if (algumSucesso) {
        console.log('🎉 TESTE FINAL PASSOU: Correção robusta funcionando!');
        console.log('✅ Os gráficos estão sendo renderizados corretamente');
    } else {
        console.log('❌ TESTE FINAL FALHOU: Problema ainda persiste');
        console.log('🔧 Pode ser necessário investigação adicional');
        
        // Informações de debug
        console.log('🐛 Debug - Estado final:');
        verificarEstadoAtual();
        verificarGraficosRenderizados();
    }
}

// Executar o teste
executarTesteFinal().catch(error => {
    console.error('💥 Erro durante o teste:', error);
});
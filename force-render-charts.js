// Script para forçar a renderização dos gráficos
console.log('🔧 Forçando renderização dos gráficos...');

async function forceRenderCharts() {
    try {
        // Verificar se estamos na página de analytics
        if (window.location.hash !== '#/analytics') {
            console.log('⚠️ Não está na página de analytics. Navegando...');
            window.location.hash = '#/analytics';
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
        
        // Verificar se o Analytics está disponível
        if (!window.Analytics) {
            console.log('❌ Classe Analytics não encontrada');
            return;
        }
        
        // Verificar se há dados necessários
        if (!window.appState?.currentBudget) {
            console.log('❌ Nenhum orçamento selecionado');
            return;
        }
        
        console.log('📊 Gerando dados para os gráficos...');
        
        // Gerar dados do relatório
        const relatorio = await window.Analytics.gerarRelatorioCompleto(window.appState.currentBudget.id);
        
        console.log('📊 Dados obtidos:', {
            gastosPorCategoria: relatorio.gastosPorCategoria.length,
            evolucaoSaldo: relatorio.evolucaoSaldo.length,
            previsaoGastos: relatorio.previsaoGastos.length
        });
        
        // Verificar se os elementos existem
        const evolucaoChart = document.getElementById('evolucao-chart');
        const categoriasChart = document.getElementById('categorias-chart');
        
        console.log('🔍 Elementos encontrados:');
        console.log('- evolucao-chart:', !!evolucaoChart);
        console.log('- categorias-chart:', !!categoriasChart);
        
        if (!evolucaoChart || !categoriasChart) {
            console.log('❌ Elementos dos gráficos não encontrados. Criando...');
            
            // Tentar encontrar o container principal
            const analyticsContent = document.getElementById('analytics-content') || 
                                   document.querySelector('.analytics-page') ||
                                   document.querySelector('.tab-content');
            
            if (analyticsContent) {
                // Criar seção de gráficos se não existir
                let chartsSection = analyticsContent.querySelector('.grid.grid-cols-1.lg\\:grid-cols-2');
                
                if (!chartsSection) {
                    chartsSection = document.createElement('div');
                    chartsSection.className = 'grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8';
                    
                    // Gráfico de evolução
                    const evolucaoDiv = document.createElement('div');
                    evolucaoDiv.className = 'bg-white dark:bg-gray-800 rounded-lg shadow p-4';
                    evolucaoDiv.id = 'evolucao-chart';
                    chartsSection.appendChild(evolucaoDiv);
                    
                    // Gráfico de categorias
                    const categoriasDiv = document.createElement('div');
                    categoriasDiv.className = 'bg-white dark:bg-gray-800 rounded-lg shadow p-4';
                    categoriasDiv.id = 'categorias-chart';
                    chartsSection.appendChild(categoriasDiv);
                    
                    // Inserir no início do container
                    analyticsContent.insertBefore(chartsSection, analyticsContent.firstChild);
                    
                    console.log('✅ Elementos dos gráficos criados');
                }
            }
        }
        
        // Aguardar um pouco para garantir que os elementos estão no DOM
        await new Promise(resolve => setTimeout(resolve, 100));
        
        // Renderizar os gráficos
        console.log('🎨 Renderizando gráficos...');
        
        try {
            window.Analytics.renderizarGraficoEvolucao('evolucao-chart', [...relatorio.evolucaoSaldo, ...relatorio.previsaoGastos]);
            console.log('✅ Gráfico de evolução renderizado');
        } catch (error) {
            console.error('❌ Erro ao renderizar gráfico de evolução:', error);
        }
        
        try {
            window.Analytics.renderizarGraficoCategorias('categorias-chart', relatorio.gastosPorCategoria);
            console.log('✅ Gráfico de categorias renderizado');
        } catch (error) {
            console.error('❌ Erro ao renderizar gráfico de categorias:', error);
        }
        
        console.log('🎉 Renderização forçada concluída!');
        
    } catch (error) {
        console.error('❌ Erro ao forçar renderização:', error);
    }
}

// Executar a função
forceRenderCharts();
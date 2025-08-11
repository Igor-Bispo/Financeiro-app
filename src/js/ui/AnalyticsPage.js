/**
 * AnalyticsPage.js - Componente para página de análises financeiras
 * 
 * Este componente renderiza a página de análises financeiras com gráficos e relatórios.
 */

import { Analytics } from './Analytics.js';

/**
 * Classe AnalyticsPage para renderização da página de análises
 */
export class AnalyticsPage {
  /**
   * Renderiza a página de análises financeiras
   * @param {string} budgetId - ID do orçamento atual
   * @returns {HTMLElement} - Elemento HTML da página
   */
  static async render(budgetId) {
    console.log('📊 Renderizando página de análises...');
    
    // Criar container principal
    const container = document.createElement('div');
    container.className = 'analytics-page p-4';
    
    // Adicionar cabeçalho
    const header = document.createElement('div');
    header.className = 'mb-6';
    header.innerHTML = `
      <h2 class="text-2xl font-bold mb-2 text-gray-800 dark:text-white">Análises Financeiras</h2>
      <p class="text-gray-600 dark:text-gray-400">Visualize seus dados financeiros de forma clara e objetiva</p>
    `;
    container.appendChild(header);
    
    // Adicionar loader enquanto carrega os dados
    const loader = document.createElement('div');
    loader.className = 'flex justify-center items-center py-12';
    loader.innerHTML = `
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
    `;
    container.appendChild(loader);
    
    try {
      // Obter dados do relatório
      const relatorio = await Analytics.gerarRelatorioCompleto(budgetId);
      
      // Remover loader
      container.removeChild(loader);
      
      // Adicionar cards de resumo
      const resumoSection = document.createElement('div');
      resumoSection.className = 'grid grid-cols-1 md:grid-cols-3 gap-4 mb-8';
      resumoSection.innerHTML = `
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
          <h3 class="text-lg font-medium mb-2 text-gray-700 dark:text-gray-300">Saldo Atual</h3>
          <p class="text-2xl font-bold ${relatorio.resumo.saldoAtual >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}">
            R$ ${relatorio.resumo.saldoAtual.toFixed(2)}
          </p>
          <p class="text-sm text-gray-500 dark:text-gray-400 mt-2">
            Tendência: <span class="${relatorio.resumo.tendencia === 'positiva' ? 'text-green-500' : 'text-red-500'}">
              ${relatorio.resumo.tendencia === 'positiva' ? '↗ Positiva' : '↘ Negativa'}
            </span>
          </p>
        </div>
        
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
          <h3 class="text-lg font-medium mb-2 text-gray-700 dark:text-gray-300">Receitas do Mês</h3>
          <p class="text-2xl font-bold text-green-600 dark:text-green-400">
            R$ ${relatorio.resumo.receitasMes.toFixed(2)}
          </p>
          <p class="text-sm text-gray-500 dark:text-gray-400 mt-2">
            ${relatorio.evolucaoSaldo.length > 1 ? 
              `vs. R$ ${relatorio.evolucaoSaldo[1].receitas.toFixed(2)} mês anterior` : 
              'Primeiro mês de dados'}
          </p>
        </div>
        
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
          <h3 class="text-lg font-medium mb-2 text-gray-700 dark:text-gray-300">Despesas do Mês</h3>
          <p class="text-2xl font-bold text-red-600 dark:text-red-400">
            R$ ${relatorio.resumo.despesasMes.toFixed(2)}
          </p>
          <p class="text-sm text-gray-500 dark:text-gray-400 mt-2">
            ${relatorio.evolucaoSaldo.length > 1 ? 
              `vs. R$ ${relatorio.evolucaoSaldo[1].despesas.toFixed(2)} mês anterior` : 
              'Primeiro mês de dados'}
          </p>
        </div>
      `;
      container.appendChild(resumoSection);
      
      // Adicionar seção de gráficos
      const chartsSection = document.createElement('div');
      chartsSection.className = 'grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8';
      
      // Gráfico de evolução
      const evolucaoChart = document.createElement('div');
      evolucaoChart.className = 'bg-white dark:bg-gray-800 rounded-lg shadow p-4';
      evolucaoChart.id = 'evolucao-chart';
      chartsSection.appendChild(evolucaoChart);
      
      // Gráfico de categorias
      const categoriasChart = document.createElement('div');
      categoriasChart.className = 'bg-white dark:bg-gray-800 rounded-lg shadow p-4';
      categoriasChart.id = 'categorias-chart';
      chartsSection.appendChild(categoriasChart);
      
      container.appendChild(chartsSection);
      
      // Adicionar seção de previsão
      const previsaoSection = document.createElement('div');
      previsaoSection.className = 'bg-white dark:bg-gray-800 rounded-lg shadow p-4 mb-8';
      previsaoSection.innerHTML = `
        <h3 class="text-lg font-medium mb-4 text-gray-700 dark:text-gray-300">Previsão para os Próximos Meses</h3>
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead>
              <tr>
                <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Mês</th>
                <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Receitas (prev.)</th>
                <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Despesas (prev.)</th>
                <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Saldo (prev.)</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
              ${relatorio.previsaoGastos.map((periodo, index) => `
                <tr class="${index % 2 === 0 ? 'bg-gray-50 dark:bg-gray-900/50' : ''}">
                  <td class="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">${periodo.nome} ${periodo.ano}</td>
                  <td class="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">R$ ${periodo.receitas.toFixed(2)}</td>
                  <td class="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">R$ ${periodo.despesas.toFixed(2)}</td>
                  <td class="px-4 py-2 text-sm font-medium ${periodo.saldo >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}">R$ ${periodo.saldo.toFixed(2)}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
        <p class="text-xs text-gray-500 dark:text-gray-400 mt-4">* Previsão baseada na média dos últimos 3 meses com tendência de crescimento de 1% ao mês</p>
      `;
      container.appendChild(previsaoSection);
      
      // Adicionar seção de maiores gastos
      const gastosSection = document.createElement('div');
      gastosSection.className = 'bg-white dark:bg-gray-800 rounded-lg shadow p-4';
      gastosSection.innerHTML = `
        <h3 class="text-lg font-medium mb-4 text-gray-700 dark:text-gray-300">Maiores Gastos por Categoria</h3>
        <div class="space-y-4">
          ${relatorio.gastosPorCategoria.slice(0, 5).map(item => `
            <div>
              <div class="flex justify-between mb-1">
                <div class="flex items-center">
                  <div class="w-3 h-3 rounded-full mr-2" style="background-color: ${item.categoria.cor || '#4F46E5'}"></div>
                  <span class="text-sm font-medium text-gray-700 dark:text-gray-300">${item.categoria.nome}</span>
                </div>
                <span class="text-sm text-gray-600 dark:text-gray-400">R$ ${item.totalGasto.toFixed(2)}</span>
              </div>
              <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div class="h-2 rounded-full" style="width: ${item.percentual}%; background-color: ${item.categoria.cor || '#4F46E5'}"></div>
              </div>
            </div>
          `).join('')}
        </div>
      `;
      container.appendChild(gastosSection);
      
      // Renderizar gráficos usando as funções da classe Analytics
      // Função para verificar e renderizar gráficos com retry
      const renderizarGraficosComRetry = (tentativa = 1, maxTentativas = 5) => {
        const evolucaoChart = document.getElementById('evolucao-chart');
        const categoriasChart = document.getElementById('categorias-chart');
        
        console.log(`🔍 Tentativa ${tentativa}: Verificando elementos dos gráficos...`);
        console.log('- evolucao-chart:', !!evolucaoChart);
        console.log('- categorias-chart:', !!categoriasChart);
        
        if (evolucaoChart && categoriasChart) {
          try {
            console.log('📊 Renderizando gráficos...');
            Analytics.renderizarGraficoEvolucao('evolucao-chart', [...relatorio.evolucaoSaldo, ...relatorio.previsaoGastos]);
            Analytics.renderizarGraficoCategorias('categorias-chart', relatorio.gastosPorCategoria);
            console.log('✅ Gráficos renderizados com sucesso!');
          } catch (chartError) {
            console.error('❌ Erro ao renderizar gráficos:', chartError);
          }
        } else if (tentativa < maxTentativas) {
          console.log(`⏳ Elementos não encontrados, tentando novamente em ${tentativa * 100}ms...`);
          setTimeout(() => renderizarGraficosComRetry(tentativa + 1, maxTentativas), tentativa * 100);
        } else {
          console.error('❌ Não foi possível encontrar os elementos dos gráficos após', maxTentativas, 'tentativas');
        }
      };
      
      // Iniciar renderização com retry
      setTimeout(() => renderizarGraficosComRetry(), 50);
      
    } catch (error) {
      console.error('❌ Erro ao renderizar página de análises:', error);
      
      // Remover loader
      if (container.contains(loader)) {
        container.removeChild(loader);
      }
      
      // Exibir mensagem de erro
      const errorMessage = document.createElement('div');
      errorMessage.className = 'bg-red-100 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded relative mb-6';
      errorMessage.innerHTML = `
        <strong class="font-bold">Erro!</strong>
        <span class="block sm:inline"> Não foi possível carregar os dados de análise. Tente novamente mais tarde.</span>
        <p class="text-sm mt-2">${error.message}</p>
      `;
      container.appendChild(errorMessage);
    }
    
    return container;
  }
}

// Adicionar à janela global para uso em outros módulos
window.AnalyticsPage = AnalyticsPage;
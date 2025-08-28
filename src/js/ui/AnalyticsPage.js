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
    container.className = 'analytics-page';
    
    // Adicionar loader enquanto carrega os dados
    const loader = document.createElement('div');
    loader.className = 'flex justify-center items-center py-12';
    loader.innerHTML = `
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
    `;
    container.appendChild(loader);
    
    try {
      // Obter período selecionado globalmente (URL hash/localStorage/appState)
      const period = (typeof window.getSelectedPeriod === 'function')
        ? window.getSelectedPeriod()
        : { year: window.appState?.selectedYear || new Date().getFullYear(), month: window.appState?.selectedMonth || (new Date().getMonth() + 1) };
      const selYear = period.year;
      const selMonth = period.month;
      const startDate = new Date(selYear, selMonth - 1, 1);
      const endDate = new Date(selYear, selMonth, 0);
      
      // Obter dados do relatório
      const relatorio = await Analytics.gerarRelatorioCompleto(budgetId, startDate, endDate);
      
      // Remover loader
      if (container.contains(loader)) {
        container.removeChild(loader);
      }
      
      // ========== CONTROLES: INDICADOR PADRÃO DE PERÍODO NO HEADER ==========
      const headerHolder = document.querySelector('.tab-header');
      try {
        const { createPeriodIndicator } = await import('./PeriodIndicator.js');
        const controlsSection = createPeriodIndicator({ onChange: () => {
          if (typeof window.renderAnalytics === 'function') window.renderAnalytics();
        }});
        if (headerHolder) headerHolder.appendChild(controlsSection);
        else container.prepend(controlsSection);
      } catch (e) {
        console.warn('PeriodIndicator (Analytics) indisponível:', e);
      }
      
      // ========== SEÇÃO 1: RESUMO FINANCEIRO PRINCIPAL ==========
      const resumoSection = document.createElement('div');
      resumoSection.className = 'mb-8';
      resumoSection.innerHTML = `
        <div class="flex items-center gap-2 mb-4">
          <div class="w-1 h-6 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full"></div>
          <h2 class="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100">💰 Resumo Financeiro</h2>
        </div>
        
        <div class="bg-gradient-to-br from-blue-500 via-purple-600 to-indigo-700 rounded-2xl shadow-xl p-6 md:p-8 text-white">
          <!-- Header do Card -->
          <div class="flex items-center justify-between mb-6">
            <div>
              <div class="flex items-center gap-2">
                <h3 class="text-xl md:text-2xl font-bold">Visão Geral</h3>
              </div>
            </div>
            <div class="text-right">
              <div class="text-2xl md:text-3xl font-bold ${relatorio.resumo.saldoAtual >= 0 ? 'text-green-200' : 'text-red-200'}">
                R$ ${relatorio.resumo.saldoAtual.toFixed(2)}
              </div>
              <p class="text-xs opacity-90">Saldo Atual</p>
            </div>
          </div>
          
          <!-- Grid de Métricas -->
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div class="bg-white bg-opacity-15 backdrop-blur-sm rounded-xl p-4 text-center">
              <div class="text-2xl mb-2">📈</div>
              <div class="text-2xl md:text-3xl font-bold text-green-200">R$ ${relatorio.resumo.receitasMes.toFixed(2)}</div>
              <div class="text-sm opacity-90">Receitas</div>
            </div>
            
            <div class="bg-white bg-opacity-15 backdrop-blur-sm rounded-xl p-4 text-center">
              <div class="text-2xl mb-2">📉</div>
              <div class="text-2xl md:text-3xl font-bold text-red-200">R$ ${relatorio.resumo.despesasMes.toFixed(2)}</div>
              <div class="text-sm opacity-90">Despesas</div>
            </div>
            
            <div class="bg-white bg-opacity-15 backdrop-blur-sm rounded-xl p-4 text-center">
              <div class="text-2xl mb-2">📊</div>
              <div class="text-2xl md:text-3xl font-bold ${relatorio.resumo.tendencia === 'positiva' ? 'text-green-200' : 'text-red-200'}">
                ${relatorio.resumo.tendencia === 'positiva' ? '↗' : '↘'}
              </div>
              <div class="text-sm opacity-90">Tendência</div>
            </div>
            
            <div class="bg-white bg-opacity-15 backdrop-blur-sm rounded-xl p-4 text-center">
              <div class="text-2xl mb-2">📅</div>
              <div class="text-2xl md:text-3xl font-bold">${relatorio.evolucaoSaldo.length}</div>
              <div class="text-sm opacity-90">Meses</div>
            </div>
          </div>
          
          <!-- Comparação com mês anterior -->
          ${relatorio.evolucaoSaldo.length > 1 ? `
            <div class="mt-6 bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-4">
              <div class="flex justify-between items-center">
                <div>
                  <p class="text-sm opacity-90">Comparação com mês anterior</p>
                  <div class="flex gap-4 mt-2">
                    <div>
                      <span class="text-xs opacity-75">Receitas:</span>
                      <span class="text-sm font-medium text-green-200">R$ ${relatorio.evolucaoSaldo[1].receitas.toFixed(2)}</span>
                    </div>
                    <div>
                      <span class="text-xs opacity-75">Despesas:</span>
                      <span class="text-sm font-medium text-red-200">R$ ${relatorio.evolucaoSaldo[1].despesas.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
                <div class="text-right">
                  <div class="text-lg font-bold ${relatorio.resumo.saldoAtual - relatorio.evolucaoSaldo[1].saldo >= 0 ? 'text-green-200' : 'text-red-200'}">
                    ${relatorio.resumo.saldoAtual - relatorio.evolucaoSaldo[1].saldo >= 0 ? '+' : ''}R$ ${(relatorio.resumo.saldoAtual - relatorio.evolucaoSaldo[1].saldo).toFixed(2)}
                  </div>
                  <p class="text-xs opacity-75">Variação</p>
                </div>
              </div>
            </div>
          ` : `
            <div class="mt-6 bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-4">
              <div class="text-center">
                <p class="text-sm opacity-90">Primeiro mês de dados</p>
                <p class="text-xs opacity-75 mt-1">Continue registrando para ver comparações</p>
              </div>
            </div>
          `}
        </div>
      `;
      container.appendChild(resumoSection);
      
      // ========== SEÇÃO 2: GRÁFICOS E ANÁLISES ==========
      const chartsSection = document.createElement('div');
      chartsSection.className = 'mb-8';
      chartsSection.innerHTML = `
        <div class="flex items-center gap-2 mb-4">
          <div class="w-1 h-6 bg-gradient-to-b from-green-500 to-teal-500 rounded-full"></div>
          <h2 class="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100">📊 Gráficos & Análises</h2>
        </div>
        
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <!-- Gráfico de Evolução -->
          <div class="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div class="bg-gradient-to-r from-green-50 to-teal-50 dark:from-gray-800 dark:to-gray-800 p-4 border-b border-gray-200 dark:border-gray-700">
              <h3 class="text-lg font-bold text-gray-900 dark:text-gray-100">📈 Evolução do Saldo</h3>
            </div>
            <div class="p-4" id="evolucao-chart">
              <div class="flex justify-center items-center py-8">
                <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
              </div>
            </div>
          </div>
          
          <!-- Gráfico de Categorias -->
          <div class="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div class="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-800 p-4 border-b border-gray-200 dark:border-gray-700">
              <h3 class="text-lg font-bold text-gray-900 dark:text-gray-100">🎯 Gastos por Categoria</h3>
            </div>
            <div class="p-4" id="categorias-chart">
              <div class="flex justify-center items-center py-8">
                <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
              </div>
            </div>
          </div>
        </div>
      `;
      container.appendChild(chartsSection);
      
      // ========== SEÇÃO 3: PREVISÕES E TENDÊNCIAS ==========
      const previsaoSection = document.createElement('div');
      previsaoSection.className = 'mb-8';
      previsaoSection.innerHTML = `
        <div class="flex items-center gap-2 mb-4">
          <div class="w-1 h-6 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full"></div>
          <h2 class="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100">🔮 Previsões & Tendências</h2>
        </div>
        
        <div class="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div class="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-gray-800 dark:to-gray-800 p-4 border-b border-gray-200 dark:border-gray-700">
            <div class="flex justify-between items-center">
              <h3 class="text-lg font-bold text-gray-900 dark:text-gray-100">📅 Previsão para os Próximos Meses</h3>
              <div class="text-xs text-gray-500 dark:text-gray-400 bg-purple-100 dark:bg-purple-900 px-2 py-1 rounded-full">
                IA Predict
              </div>
            </div>
          </div>
          
          <div class="p-4">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              ${relatorio.previsaoGastos.slice(0, 4).map((periodo, index) => `
                <div class="bg-gradient-to-br ${index === 0 ? 'from-purple-500 to-pink-500' : index === 1 ? 'from-blue-500 to-indigo-500' : index === 2 ? 'from-green-500 to-teal-500' : 'from-orange-500 to-red-500'} rounded-xl p-4 text-white">
                  <div class="text-center">
                    <div class="text-lg font-bold mb-1">${periodo.nome} ${periodo.ano}</div>
                    <div class="text-2xl font-bold mb-2">R$ ${periodo.saldo.toFixed(2)}</div>
                    <div class="text-xs opacity-90">Saldo Previsto</div>
                    <div class="flex justify-between text-xs mt-2">
                      <span>📈 R$ ${periodo.receitas.toFixed(2)}</span>
                      <span>📉 R$ ${periodo.despesas.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              `).join('')}
            </div>
            
            <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
              <div class="flex items-center gap-2 mb-2">
                <div class="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span class="text-sm font-medium text-gray-900 dark:text-gray-100">Metodologia de Previsão</span>
              </div>
              <p class="text-xs text-gray-600 dark:text-gray-400">
                Baseada na média dos últimos 3 meses com tendência de crescimento de 1% ao mês, 
                considerando sazonalidade e padrões históricos.
              </p>
            </div>
          </div>
        </div>
      `;
      container.appendChild(previsaoSection);
      
      // ========== SEÇÃO 4: ANÁLISE DETALHADA ==========
      const gastosSection = document.createElement('div');
      gastosSection.className = 'mb-8';
      gastosSection.innerHTML = `
        <div class="flex items-center gap-2 mb-4">
          <div class="w-1 h-6 bg-gradient-to-b from-orange-500 to-red-500 rounded-full"></div>
          <h2 class="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100">🎯 Análise Detalhada</h2>
        </div>
        
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <!-- Maiores Gastos por Categoria -->
          <div class="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div class="bg-gradient-to-r from-orange-50 to-red-50 dark:from-gray-800 dark:to-gray-800 p-4 border-b border-gray-200 dark:border-gray-700">
              <h3 class="text-lg font-bold text-gray-900 dark:text-gray-100">🔥 Maiores Gastos</h3>
            </div>
            <div class="p-4">
              <div class="space-y-4">
                ${relatorio.gastosPorCategoria.slice(0, 5).map((item, index) => `
                  <div class="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200">
                    <div class="flex items-center gap-3">
                      <div class="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white" style="background-color: ${item.categoria.cor || '#4F46E5'}">
                        ${index + 1}
                      </div>
                      <div>
                        <div class="font-medium text-gray-900 dark:text-gray-100">${item.categoria.nome}</div>
                        <div class="text-sm text-gray-500 dark:text-gray-400">${item.percentual.toFixed(1)}% do total</div>
                      </div>
                    </div>
                    <div class="text-right">
                      <div class="font-bold text-gray-900 dark:text-gray-100">R$ ${item.totalGasto.toFixed(2)}</div>
                      <div class="w-20 bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-1">
                        <div class="h-2 rounded-full" style="width: ${item.percentual}%; background-color: ${item.categoria.cor || '#4F46E5'}"></div>
                      </div>
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>
          
          <!-- Insights e Recomendações -->
          <div class="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div class="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-800 p-4 border-b border-gray-200 dark:border-gray-700">
              <h3 class="text-lg font-bold text-gray-900 dark:text-gray-100">💡 Insights & Recomendações</h3>
            </div>
            <div class="p-4">
              <div class="space-y-4">
                ${generateInsights(relatorio).map(insight => `
                  <div class="bg-gradient-to-r ${insight.type === 'positive' ? 'from-green-50 to-emerald-50 dark:from-green-900 dark:to-emerald-900' : insight.type === 'warning' ? 'from-yellow-50 to-orange-50 dark:from-yellow-900 dark:to-orange-900' : 'from-blue-50 to-indigo-50 dark:from-blue-900 dark:to-indigo-900'} border ${insight.type === 'positive' ? 'border-green-200 dark:border-green-800' : insight.type === 'warning' ? 'border-yellow-200 dark:border-yellow-800' : 'border-blue-200 dark:border-blue-800'} rounded-xl p-4">
                    <div class="flex items-start gap-3">
                      <div class="text-2xl">${insight.icon}</div>
                      <div>
                        <div class="font-medium text-gray-900 dark:text-gray-100 mb-1">${insight.title}</div>
                        <div class="text-sm text-gray-600 dark:text-gray-400">${insight.description}</div>
                      </div>
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>
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
            
            // Verificar se os dados existem antes de renderizar
            if (relatorio.evolucaoSaldo && relatorio.evolucaoSaldo.length > 0) {
              const dadosEvolucao = [...relatorio.evolucaoSaldo];
              if (relatorio.previsaoGastos && relatorio.previsaoGastos.length > 0) {
                dadosEvolucao.push(...relatorio.previsaoGastos);
              }
              Analytics.renderizarGraficoEvolucao('evolucao-chart', dadosEvolucao);
            }
            
            if (relatorio.gastosPorCategoria && relatorio.gastosPorCategoria.length > 0) {
              Analytics.renderizarGraficoCategorias('categorias-chart', relatorio.gastosPorCategoria);
            }
            
            console.log('✅ Gráficos renderizados com sucesso!');
          } catch (chartError) {
            console.error('❌ Erro ao renderizar gráficos:', chartError);
            
            // Exibir mensagem de erro nos containers dos gráficos
            if (evolucaoChart) {
              evolucaoChart.innerHTML = `
                <div class="text-center py-8">
                  <div class="text-4xl mb-4">📊</div>
                  <p class="text-gray-500 dark:text-gray-400">Erro ao carregar gráfico</p>
                  <p class="text-xs text-gray-400 mt-2">${chartError.message}</p>
                </div>
              `;
            }
            
            if (categoriasChart) {
              categoriasChart.innerHTML = `
                <div class="text-center py-8">
                  <div class="text-4xl mb-4">📊</div>
                  <p class="text-gray-500 dark:text-gray-400">Erro ao carregar gráfico</p>
                  <p class="text-xs text-gray-400 mt-2">${chartError.message}</p>
                </div>
              `;
            }
          }
        } else if (tentativa < maxTentativas) {
          console.log(`⏳ Elementos não encontrados, tentando novamente em ${tentativa * 100}ms...`);
          setTimeout(() => renderizarGraficosComRetry(tentativa + 1, maxTentativas), tentativa * 100);
        } else {
          console.error('❌ Não foi possível encontrar os elementos dos gráficos após', maxTentativas, 'tentativas');
          
          // Exibir mensagem de erro se não conseguir encontrar os elementos
          const evolucaoChart = document.getElementById('evolucao-chart');
          const categoriasChart = document.getElementById('categorias-chart');
          
          if (evolucaoChart) {
            evolucaoChart.innerHTML = `
              <div class="text-center py-8">
                <div class="text-4xl mb-4">⚠️</div>
                <p class="text-gray-500 dark:text-gray-400">Elemento não encontrado</p>
                <p class="text-xs text-gray-400 mt-2">Tente recarregar a página</p>
              </div>
            `;
          }
          
          if (categoriasChart) {
            categoriasChart.innerHTML = `
              <div class="text-center py-8">
                <div class="text-4xl mb-4">⚠️</div>
                <p class="text-gray-500 dark:text-gray-400">Elemento não encontrado</p>
                <p class="text-xs text-gray-400 mt-2">Tente recarregar a página</p>
              </div>
            `;
          }
        }
      };
      
      // Iniciar renderização com retry
      setTimeout(() => renderizarGraficosComRetry(), 100);
      
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

/**
 * Gera insights e recomendações baseados nos dados do relatório
 * @param {Object} relatorio - Dados do relatório financeiro
 * @returns {Array} - Array de insights
 */
function generateInsights(relatorio) {
  const insights = [];
  
  // Insight sobre saldo
  if (relatorio.resumo.saldoAtual >= 0) {
    insights.push({
      type: 'positive',
      icon: '✅',
      title: 'Saldo Positivo',
      description: 'Seu saldo está positivo! Continue mantendo essa disciplina financeira.'
    });
  } else {
    insights.push({
      type: 'warning',
      icon: '⚠️',
      title: 'Saldo Negativo',
      description: 'Seu saldo está negativo. Considere reduzir despesas ou aumentar receitas.'
    });
  }
  
  // Insight sobre tendência
  if (relatorio.resumo.tendencia === 'positiva') {
    insights.push({
      type: 'positive',
      icon: '📈',
      title: 'Tendência Positiva',
      description: 'Sua situação financeira está melhorando! Mantenha o foco.'
    });
  } else {
    insights.push({
      type: 'warning',
      icon: '📉',
      title: 'Tendência Negativa',
      description: 'Sua situação financeira está piorando. Revise seus gastos.'
    });
  }
  
  // Insight sobre maior gasto
  if (relatorio.gastosPorCategoria.length > 0) {
    const maiorGasto = relatorio.gastosPorCategoria[0];
    if (maiorGasto.percentual > 30) {
      insights.push({
        type: 'warning',
        icon: '🔥',
        title: 'Gasto Concentrado',
        description: `${maiorGasto.categoria.nome} representa ${maiorGasto.percentual.toFixed(1)}% dos seus gastos. Considere diversificar.`
      });
    }
  }
  
  // Insight sobre comparação mensal
  if (relatorio.evolucaoSaldo.length > 1) {
    const variacao = relatorio.resumo.saldoAtual - relatorio.evolucaoSaldo[1].saldo;
    if (variacao > 0) {
      insights.push({
        type: 'positive',
        icon: '🎯',
        title: 'Melhoria Mensal',
        description: `Seu saldo melhorou R$ ${variacao.toFixed(2)} em relação ao mês anterior.`
      });
    } else {
      insights.push({
        type: 'warning',
        icon: '📊',
        title: 'Redução Mensal',
        description: `Seu saldo diminuiu R$ ${Math.abs(variacao).toFixed(2)} em relação ao mês anterior.`
      });
    }
  }
  
  // Insight sobre previsão
  if (relatorio.previsaoGastos.length > 0) {
    const proximaPrevisao = relatorio.previsaoGastos[0];
    if (proximaPrevisao.saldo < 0) {
      insights.push({
        type: 'warning',
        icon: '🔮',
        title: 'Previsão Negativa',
        description: 'Para o próximo mês, a previsão indica saldo negativo. Planeje com antecedência.'
      });
    } else {
      insights.push({
        type: 'positive',
        icon: '🔮',
        title: 'Previsão Positiva',
        description: 'Para o próximo mês, a previsão indica saldo positivo. Continue assim!'
      });
    }
  }
  
  // Insight sobre diversificação
  if (relatorio.gastosPorCategoria.length > 0) {
    const totalPercentual = relatorio.gastosPorCategoria.slice(0, 3).reduce((sum, item) => sum + item.percentual, 0);
    if (totalPercentual > 70) {
      insights.push({
        type: 'info',
        icon: '💡',
        title: 'Gastos Concentrados',
        description: 'As 3 maiores categorias representam mais de 70% dos seus gastos. Considere diversificar.'
      });
    }
  }
  
  return insights.slice(0, 4); // Limitar a 4 insights
}

// Adicionar à janela global para uso em outros módulos
window.AnalyticsPage = AnalyticsPage;
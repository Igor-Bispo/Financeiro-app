/**
 * Analytics Clean - Versão melhorada da aba de análises
 * 
 * Este módulo fornece análises financeiras mais intuitivas e relevantes
 * com insights práticos e métricas importantes para o usuário.
 */

import { Analytics } from './ui/Analytics.js';

/**
 * Classe AnalyticsClean para análises melhoradas
 */
export class AnalyticsClean {
  /**
   * Renderiza a página de análises melhorada
   */
  static async renderCleanAnalytics() {
    console.log('📊 Renderizando análises melhoradas...');
    
    // Aplicar tema
    this.applyThemeToAnalytics();
    
    // Obter dados do orçamento atual
    const currentBudget = window.appState?.currentBudget;
    if (!currentBudget) {
      return this.renderEmptyState('Nenhum orçamento selecionado');
    }
    
    // Criar container principal
    const container = document.createElement('div');
    container.className = 'analytics-container';
    
    // Adicionar header
    container.innerHTML = `
      <div class="analytics-header">
        <div class="analytics-title">
          📊 Análises Financeiras
        </div>
        <div class="analytics-actions">
          <button class="btn-analytics secondary" onclick="window.AnalyticsClean.exportReport()">
            📄 Exportar
          </button>
          <button class="btn-analytics primary" onclick="window.AnalyticsClean.refreshData()">
            🔄 Atualizar
          </button>
        </div>
      </div>
      
      <div class="analytics-filters">
        <div class="filter-group">
          <label class="filter-label">Período:</label>
          <select class="filter-select" id="period-filter" onchange="window.AnalyticsClean.updatePeriod()">
            <option value="current">Mês Atual</option>
            <option value="last3">Últimos 3 Meses</option>
            <option value="last6">Últimos 6 Meses</option>
            <option value="year">Este Ano</option>
          </select>
        </div>
        <div class="filter-group">
          <label class="filter-label">Visualização:</label>
          <select class="filter-select" id="view-filter" onchange="window.AnalyticsClean.updateView()">
            <option value="overview">Visão Geral</option>
            <option value="detailed">Detalhado</option>
            <option value="trends">Tendências</option>
          </select>
        </div>
      </div>
    `;
    
    // Adicionar loader
    const loader = this.createLoader();
    container.appendChild(loader);
    
    try {
      // Obter dados
      const data = await this.getAnalyticsData(currentBudget.id);
      
      // Remover loader
      container.removeChild(loader);
      
      // Renderizar conteúdo
      container.appendChild(this.renderSummaryCards(data));
      container.appendChild(this.renderInsights(data));
      container.appendChild(this.renderCharts(data));
      container.appendChild(this.renderDetailedAnalysis(data));
      
    } catch (error) {
      console.error('❌ Erro ao carregar análises:', error);
      container.removeChild(loader);
      container.appendChild(this.renderErrorState(error.message));
    }
    
    return container;
  }
  
  /**
   * Aplica tema às análises
   */
  static applyThemeToAnalytics() {
    const themeColor = localStorage.getItem('themeColor') || 'blue';
    const root = document.documentElement;
    root.setAttribute('data-theme-color', themeColor);
    console.log('🎨 Tema aplicado nas análises:', themeColor);
  }
  
  /**
   * Obtém dados de análise
   */
  static async getAnalyticsData(budgetId) {
    const period = document.getElementById('period-filter')?.value || 'current';
    
    // Calcular período
    const { startDate, endDate } = this.calculatePeriod(period);
    
    // Obter dados básicos
    const [gastosPorCategoria, evolucaoSaldo, previsaoGastos] = await Promise.all([
      Analytics.getGastosPorCategoria(budgetId, startDate, endDate),
      Analytics.getEvolucaoSaldo(budgetId, 6),
      Analytics.getPrevisaoGastos(budgetId, 3, 3)
    ]);
    
    // Calcular métricas adicionais
    const metrics = this.calculateMetrics(gastosPorCategoria, evolucaoSaldo);
    const insights = this.generateInsights(metrics, gastosPorCategoria, evolucaoSaldo);
    
    return {
      gastosPorCategoria,
      evolucaoSaldo,
      previsaoGastos,
      metrics,
      insights,
      period: { startDate, endDate, type: period }
    };
  }
  
  /**
   * Calcula período baseado na seleção
   */
  static calculatePeriod(periodType) {
    const now = new Date();
    let startDate, endDate;
    
    switch (periodType) {
      case 'current':
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0);
        break;
      case 'last3':
        startDate = new Date(now.getFullYear(), now.getMonth() - 2, 1);
        endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0);
        break;
      case 'last6':
        startDate = new Date(now.getFullYear(), now.getMonth() - 5, 1);
        endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0);
        break;
      case 'year':
        startDate = new Date(now.getFullYear(), 0, 1);
        endDate = new Date(now.getFullYear(), 11, 31);
        break;
      default:
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    }
    
    return { startDate, endDate };
  }
  
  /**
   * Calcula métricas importantes
   */
  static calculateMetrics(gastosPorCategoria, evolucaoSaldo) {
    const currentMonth = evolucaoSaldo[0];
    const previousMonth = evolucaoSaldo[1];
    
    // Métricas básicas
    const totalReceitas = currentMonth?.receitas || 0;
    const totalDespesas = currentMonth?.despesas || 0;
    const saldoAtual = currentMonth?.saldo || 0;
    
    // Variações percentuais
    const variacaoReceitas = previousMonth ? 
      ((totalReceitas - previousMonth.receitas) / previousMonth.receitas) * 100 : 0;
    const variacaoDespesas = previousMonth ? 
      ((totalDespesas - previousMonth.despesas) / previousMonth.despesas) * 100 : 0;
    const variacaoSaldo = previousMonth ? 
      ((saldoAtual - previousMonth.saldo) / Math.abs(previousMonth.saldo)) * 100 : 0;
    
    // Análise de categorias
    const topCategorias = gastosPorCategoria.slice(0, 5);
    const totalGastos = gastosPorCategoria.reduce((sum, item) => sum + item.totalGasto, 0);
    const categoriaMaiorGasto = topCategorias[0];
    const percentualMaiorGasto = categoriaMaiorGasto ? 
      (categoriaMaiorGasto.totalGasto / totalGastos) * 100 : 0;
    
    // Tendências
    const tendenciaSaldo = evolucaoSaldo.length >= 3 ? 
      this.calculateTrend(evolucaoSaldo.slice(0, 3).map(m => m.saldo)) : 'estavel';
    
    return {
      totalReceitas,
      totalDespesas,
      saldoAtual,
      variacaoReceitas,
      variacaoDespesas,
      variacaoSaldo,
      topCategorias,
      totalGastos,
      categoriaMaiorGasto,
      percentualMaiorGasto,
      tendenciaSaldo,
      economiaMensal: totalReceitas - totalDespesas,
      percentualEconomia: totalReceitas > 0 ? ((totalReceitas - totalDespesas) / totalReceitas) * 100 : 0
    };
  }
  
  /**
   * Calcula tendência baseada em valores
   */
  static calculateTrend(values) {
    if (values.length < 2) return 'estavel';
    
    const recent = values[0];
    const older = values[values.length - 1];
    const change = recent - older;
    const percentChange = (change / Math.abs(older)) * 100;
    
    if (percentChange > 5) return 'crescente';
    if (percentChange < -5) return 'decrescente';
    return 'estavel';
  }
  
  /**
   * Gera insights baseados nos dados
   */
  static generateInsights(metrics, gastosPorCategoria, evolucaoSaldo) {
    const insights = [];
    
    // Insight sobre saldo
    if (metrics.saldoAtual < 0) {
      insights.push({
        type: 'negative',
        icon: '⚠️',
        title: 'Saldo Negativo',
        description: `Seu saldo está negativo em R$ ${Math.abs(metrics.saldoAtual).toFixed(2)}. Considere reduzir gastos ou aumentar receitas.`
      });
    } else if (metrics.percentualEconomia > 20) {
      insights.push({
        type: 'positive',
        icon: '🎉',
        title: 'Excelente Economia',
        description: `Você está economizando ${metrics.percentualEconomia.toFixed(1)}% da sua renda. Continue assim!`
      });
    }
    
    // Insight sobre maior gasto
    if (metrics.categoriaMaiorGasto && metrics.percentualMaiorGasto > 30) {
      insights.push({
        type: 'warning',
        icon: '📊',
        title: 'Gasto Concentrado',
        description: `${metrics.categoriaMaiorGasto.categoria.nome} representa ${metrics.percentualMaiorGasto.toFixed(1)}% dos seus gastos. Considere diversificar.`
      });
    }
    
    // Insight sobre tendência
    if (metrics.tendenciaSaldo === 'decrescente') {
      insights.push({
        type: 'negative',
        icon: '📉',
        title: 'Tendência Negativa',
        description: 'Seu saldo está diminuindo nos últimos meses. Revise seus gastos.'
      });
    } else if (metrics.tendenciaSaldo === 'crescente') {
      insights.push({
        type: 'positive',
        icon: '📈',
        title: 'Tendência Positiva',
        description: 'Seu saldo está aumentando! Você está no caminho certo.'
      });
    }
    
    // Insight sobre variação de despesas
    if (metrics.variacaoDespesas > 20) {
      insights.push({
        type: 'warning',
        icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="3" y="6" width="18" height="12" rx="2" stroke="white" stroke-width="2" fill="none"/>
          <path d="M3 10h18" stroke="white" stroke-width="2"/>
          <!-- Fundo quadriculado -->
          <path d="M6 12h2v2h-2z M10 12h2v2h-2z M14 12h2v2h-2z" fill="white" opacity="0.3"/>
          <path d="M6 14h2v2h-2z M10 14h2v2h-2z M14 14h2v2h-2z" fill="white" opacity="0.3"/>
          <!-- Gráfico de linha decrescente -->
          <path d="M6 12l2 2 2-1 2 3 2-2" stroke="white" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>`,
        title: 'Aumento de Despesas',
        description: `Suas despesas aumentaram ${metrics.variacaoDespesas.toFixed(1)}% em relação ao mês anterior.`
      });
    } else if (metrics.variacaoDespesas < -10) {
      insights.push({
        type: 'positive',
        icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="3" y="6" width="18" height="12" rx="2" stroke="white" stroke-width="2" fill="none"/>
          <path d="M3 10h18" stroke="white" stroke-width="2"/>
          <!-- Fundo quadriculado -->
          <path d="M6 12h2v2h-2z M10 12h2v2h-2z M14 12h2v2h-2z" fill="white" opacity="0.3"/>
          <path d="M6 14h2v2h-2z M10 14h2v2h-2z M14 14h2v2h-2z" fill="white" opacity="0.3"/>
          <!-- Gráfico de linha decrescente -->
          <path d="M6 12l2 2 2-1 2 3 2-2" stroke="white" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>`,
        title: 'Redução de Despesas',
        description: `Suas despesas diminuíram ${Math.abs(metrics.variacaoDespesas).toFixed(1)}% em relação ao mês anterior.`
      });
    }
    
    // Insight sobre receitas
    if (metrics.variacaoReceitas > 15) {
      insights.push({
        type: 'positive',
        icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="3" y="6" width="18" height="12" rx="2" stroke="white" stroke-width="2" fill="none"/>
          <path d="M3 10h18" stroke="white" stroke-width="2"/>
          <!-- Fundo quadriculado -->
          <path d="M6 12h2v2h-2z M10 12h2v2h-2z M14 12h2v2h-2z" fill="white" opacity="0.3"/>
          <path d="M6 14h2v2h-2z M10 14h2v2h-2z M14 14h2v2h-2z" fill="white" opacity="0.3"/>
          <!-- Gráfico de linha crescente -->
          <path d="M6 16l2-2 2-1 2-3 2 2" stroke="white" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>`,
        title: 'Aumento de Receitas',
        description: `Suas receitas aumentaram ${metrics.variacaoReceitas.toFixed(1)}% em relação ao mês anterior.`
      });
    }
    
    return insights;
  }
  
  /**
   * Renderiza cards de resumo
   */
  static renderSummaryCards(data) {
    const { metrics } = data;
    
    const section = document.createElement('div');
    section.className = 'analytics-summary';
    
    section.innerHTML = `
      <div class="summary-card ${metrics.saldoAtual >= 0 ? 'positive' : 'negative'}">
        <div class="summary-header">
          <div class="summary-title">Saldo Atual</div>
          <div class="summary-icon">💰</div>
        </div>
        <div class="summary-value">R$ ${metrics.saldoAtual.toFixed(2)}</div>
        <div class="summary-change ${metrics.variacaoSaldo >= 0 ? 'positive' : 'negative'}">
          ${metrics.variacaoSaldo >= 0 ? '↗' : '↘'} ${Math.abs(metrics.variacaoSaldo).toFixed(1)}% vs mês anterior
        </div>
      </div>
      
      <div class="summary-card positive">
        <div class="summary-content">
          <div class="summary-info">
            <div class="summary-title">Receitas</div>
            <div class="summary-value">R$ ${metrics.totalReceitas.toFixed(2)}</div>
            <div class="summary-change ${metrics.variacaoReceitas >= 0 ? 'positive' : 'negative'}">
              ${metrics.variacaoReceitas >= 0 ? '↗' : '↘'} ${Math.abs(metrics.variacaoReceitas).toFixed(1)}% vs mês anterior
            </div>
          </div>
          <div class="summary-icon">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="3" y="6" width="18" height="12" rx="2" stroke="white" stroke-width="2" fill="none"/>
              <path d="M3 10h18" stroke="white" stroke-width="2"/>
              <!-- Fundo quadriculado -->
              <path d="M6 12h2v2h-2z M10 12h2v2h-2z M14 12h2v2h-2z" fill="white" opacity="0.3"/>
              <path d="M6 14h2v2h-2z M10 14h2v2h-2z M14 14h2v2h-2z" fill="white" opacity="0.3"/>
              <!-- Gráfico de linha crescente -->
              <path d="M6 16l2-2 2-1 2-3 2 2" stroke="white" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
        </div>
      </div>
      
      <div class="summary-card negative">
        <div class="summary-content">
          <div class="summary-info">
            <div class="summary-title">Despesas</div>
            <div class="summary-value">R$ ${metrics.totalDespesas.toFixed(2)}</div>
            <div class="summary-change ${metrics.variacaoDespesas <= 0 ? 'positive' : 'negative'}">
              ${metrics.variacaoDespesas <= 0 ? '↘' : '↗'} ${Math.abs(metrics.variacaoDespesas).toFixed(1)}% vs mês anterior
            </div>
          </div>
          <div class="summary-icon">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="3" y="6" width="18" height="12" rx="2" stroke="white" stroke-width="2" fill="none"/>
              <path d="M3 10h18" stroke="white" stroke-width="2"/>
              <!-- Fundo quadriculado -->
              <path d="M6 12h2v2h-2z M10 12h2v2h-2z M14 12h2v2h-2z" fill="white" opacity="0.3"/>
              <path d="M6 14h2v2h-2z M10 14h2v2h-2z M14 14h2v2h-2z" fill="white" opacity="0.3"/>
              <!-- Gráfico de linha decrescente -->
              <path d="M6 12l2 2 2-1 2 3 2-2" stroke="white" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
        </div>
      </div>
      
      <div class="summary-card ${metrics.percentualEconomia >= 0 ? 'positive' : 'negative'}">
        <div class="summary-header">
          <div class="summary-title">Economia</div>
          <div class="summary-icon">💎</div>
        </div>
        <div class="summary-value">${metrics.percentualEconomia.toFixed(1)}%</div>
        <div class="summary-change ${metrics.percentualEconomia >= 0 ? 'positive' : 'negative'}">
          R$ ${metrics.economiaMensal.toFixed(2)} este mês
        </div>
      </div>
    `;
    
    return section;
  }
  
  /**
   * Renderiza insights
   */
  static renderInsights(data) {
    const { insights } = data;
    
    if (insights.length === 0) return document.createElement('div');
    
    const section = document.createElement('div');
    section.className = 'insights-section';
    
    section.innerHTML = `
      <div class="section-header">
        <div class="section-title">
          <div class="section-icon">💡</div>
          Insights Importantes
        </div>
      </div>
      <div class="insights-grid">
        ${insights.map(insight => `
          <div class="insight-card">
            <div class="insight-header">
              <div class="insight-icon ${insight.type}">${insight.icon}</div>
              <div class="insight-title">${insight.title}</div>
            </div>
            <div class="insight-description">${insight.description}</div>
          </div>
        `).join('')}
      </div>
    `;
    
    return section;
  }
  
  /**
   * Renderiza gráficos
   */
  static renderCharts(data) {
    const { gastosPorCategoria, evolucaoSaldo, previsaoGastos } = data;
    
    const section = document.createElement('div');
    section.className = 'analytics-sections';
    
    section.innerHTML = `
      <div class="analytics-section">
        <div class="section-header">
          <div class="section-title">
            <div class="section-icon">📊</div>
            Gastos por Categoria
          </div>
          <div class="section-actions">
            <button class="btn-analytics secondary" onclick="window.AnalyticsClean.toggleChartView('categories')">
              🔄 Alternar
            </button>
          </div>
        </div>
        <div id="categories-chart" class="analytics-chart">
          ${this.renderCategoriesChart(gastosPorCategoria)}
        </div>
      </div>
      
      <div class="analytics-section">
        <div class="section-header">
          <div class="section-title">
            <div class="section-icon">📈</div>
            Evolução Financeira
          </div>
          <div class="section-actions">
            <button class="btn-analytics secondary" onclick="window.AnalyticsClean.toggleChartView('evolution')">
              🔄 Alternar
            </button>
          </div>
        </div>
        <div id="evolution-chart" class="analytics-chart">
          ${this.renderEvolutionChart([...evolucaoSaldo, ...previsaoGastos])}
        </div>
      </div>
    `;
    
    return section;
  }
  
  /**
   * Renderiza gráfico de categorias
   */
  static renderCategoriesChart(gastosPorCategoria) {
    if (!gastosPorCategoria || gastosPorCategoria.length === 0) {
      return `
        <div class="chart-placeholder">
          <div>Sem dados de categorias para exibir</div>
        </div>
      `;
    }
    
    const topCategories = gastosPorCategoria.slice(0, 8);
    
    return `
      <div class="space-y-4">
        ${topCategories.map(item => `
          <div class="chart-item">
            <div class="flex justify-between mb-2">
              <div class="flex items-center gap-2">
                <div class="w-3 h-3 rounded-full" style="background-color: ${item.categoria.cor || '#4F46E5'}"></div>
                <span class="text-sm font-medium text-gray-700 dark:text-gray-300">
                  ${item.categoria.nome}
                </span>
              </div>
              <span class="text-sm text-gray-600 dark:text-gray-400">
                R$ ${item.totalGasto.toFixed(2)} (${item.percentual.toFixed(1)}%)
              </span>
            </div>
            <div class="progress-bar">
              <div class="progress-fill" style="width: ${item.percentual}%"></div>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }
  
  /**
   * Renderiza gráfico de evolução
   */
  static renderEvolutionChart(data) {
    if (!data || data.length === 0) {
      return `
        <div class="chart-placeholder">
          <div>Sem dados de evolução para exibir</div>
        </div>
      `;
    }
    
    const maxValue = Math.max(...data.map(d => Math.max(d.receitas, d.despesas))) * 1.1;
    
    return `
      <div class="chart-container">
        <div class="flex items-end justify-between h-full">
          ${data.map((periodo, index) => {
            const alturaReceita = (periodo.receitas / maxValue) * 100;
            const alturaDespesa = (periodo.despesas / maxValue) * 100;
            const isPrevisto = periodo.isPrevisto;
            
            return `
              <div class="flex flex-col items-center justify-end w-full max-w-[${100 / data.length}%] px-1">
                <div class="w-full flex justify-center mb-1">
                  <div class="w-4 ${isPrevisto ? 'bg-green-300/50' : 'bg-green-500'} rounded-t" 
                       style="height: ${alturaReceita}%"></div>
                </div>
                <div class="w-full flex justify-center mb-1">
                  <div class="w-4 ${isPrevisto ? 'bg-red-300/50' : 'bg-red-500'} rounded-t" 
                       style="height: ${alturaDespesa}%"></div>
                </div>
                <div class="text-xs text-gray-600 dark:text-gray-400 mt-1 ${isPrevisto ? 'italic' : ''}">
                  ${periodo.nome.substring(0, 3)}
                  ${isPrevisto ? '*' : ''}
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
      <div class="flex justify-center mt-4 space-x-4 text-xs">
        <div class="flex items-center">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="mr-1">
            <rect x="3" y="6" width="18" height="12" rx="2" stroke="#10b981" stroke-width="2" fill="none"/>
            <path d="M3 10h18" stroke="#10b981" stroke-width="2"/>
            <!-- Fundo quadriculado -->
            <path d="M6 12h2v2h-2z M10 12h2v2h-2z M14 12h2v2h-2z" fill="#10b981" opacity="0.3"/>
            <path d="M6 14h2v2h-2z M10 14h2v2h-2z M14 14h2v2h-2z" fill="#10b981" opacity="0.3"/>
            <!-- Gráfico de linha crescente -->
            <path d="M6 16l2-2 2-1 2-3 2 2" stroke="#10b981" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <span class="text-gray-600 dark:text-gray-400">Receitas</span>
        </div>
        <div class="flex items-center">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="mr-1">
            <rect x="3" y="6" width="18" height="12" rx="2" stroke="#ef4444" stroke-width="2" fill="none"/>
            <path d="M3 10h18" stroke="#ef4444" stroke-width="2"/>
            <!-- Fundo quadriculado -->
            <path d="M6 12h2v2h-2z M10 12h2v2h-2z M14 12h2v2h-2z" fill="#ef4444" opacity="0.3"/>
            <path d="M6 14h2v2h-2z M10 14h2v2h-2z M14 14h2v2h-2z" fill="#ef4444" opacity="0.3"/>
            <!-- Gráfico de linha decrescente -->
            <path d="M6 12l2 2 2-1 2 3 2-2" stroke="#ef4444" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <span class="text-gray-600 dark:text-gray-400">Despesas</span>
        </div>
        ${data.some(d => d.isPrevisto) ? `
          <div class="flex items-center">
            <span class="text-gray-600 dark:text-gray-400 italic">* Previsto</span>
          </div>
        ` : ''}
      </div>
    `;
  }
  
  /**
   * Renderiza análise detalhada
   */
  static renderDetailedAnalysis(data) {
    const { metrics, gastosPorCategoria, evolucaoSaldo } = data;
    
    const section = document.createElement('div');
    section.className = 'analytics-section';
    
    section.innerHTML = `
      <div class="section-header">
        <div class="section-title">
          <div class="section-icon">📋</div>
          Análise Detalhada
        </div>
      </div>
      
      <div class="space-y-6">
        <!-- Top 5 Categorias -->
        <div>
          <h4 class="text-lg font-semibold mb-3 text-gray-700 dark:text-gray-300">Top 5 Categorias de Gasto</h4>
          <div class="space-y-2">
            ${metrics.topCategorias.map((item, index) => `
              <div class="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div class="flex items-center gap-3">
                  <span class="text-sm font-medium text-gray-500">#${index + 1}</span>
                  <div class="w-3 h-3 rounded-full" style="background-color: ${item.categoria.cor || '#4F46E5'}"></div>
                  <span class="font-medium">${item.categoria.nome}</span>
                </div>
                <div class="text-right">
                  <div class="font-semibold">R$ ${item.totalGasto.toFixed(2)}</div>
                  <div class="text-sm text-gray-500">${item.percentual.toFixed(1)}%</div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
        
        <!-- Comparação Mensal -->
        <div>
          <h4 class="text-lg font-semibold mb-3 text-gray-700 dark:text-gray-300">Comparação com Mês Anterior</h4>
          <table class="analytics-table">
            <thead>
              <tr>
                <th>Métrica</th>
                <th>Mês Atual</th>
                <th>Mês Anterior</th>
                <th>Variação</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <div class="flex items-center gap-2">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="3" y="6" width="18" height="12" rx="2" stroke="currentColor" stroke-width="2" fill="none"/>
                      <path d="M3 10h18" stroke="currentColor" stroke-width="2"/>
                      <!-- Fundo quadriculado -->
                      <path d="M6 12h2v2h-2z M10 12h2v2h-2z M14 12h2v2h-2z" fill="currentColor" opacity="0.3"/>
                      <path d="M6 14h2v2h-2z M10 14h2v2h-2z M14 14h2v2h-2z" fill="currentColor" opacity="0.3"/>
                      <!-- Gráfico de linha crescente -->
                      <path d="M6 16l2-2 2-1 2-3 2 2" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    Receitas
                  </div>
                </td>
                <td>R$ ${metrics.totalReceitas.toFixed(2)}</td>
                <td>R$ ${evolucaoSaldo[1]?.receitas.toFixed(2) || '0.00'}</td>
                <td class="${metrics.variacaoReceitas >= 0 ? 'positive' : 'negative'}">
                  ${metrics.variacaoReceitas >= 0 ? '+' : ''}${metrics.variacaoReceitas.toFixed(1)}%
                </td>
              </tr>
              <tr>
                <td>
                  <div class="flex items-center gap-2">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="3" y="6" width="18" height="12" rx="2" stroke="currentColor" stroke-width="2" fill="none"/>
                      <path d="M3 10h18" stroke="currentColor" stroke-width="2"/>
                      <!-- Fundo quadriculado -->
                      <path d="M6 12h2v2h-2z M10 12h2v2h-2z M14 12h2v2h-2z" fill="currentColor" opacity="0.3"/>
                      <path d="M6 14h2v2h-2z M10 14h2v2h-2z M14 14h2v2h-2z" fill="currentColor" opacity="0.3"/>
                      <!-- Gráfico de linha decrescente -->
                      <path d="M6 12l2 2 2-1 2 3 2-2" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    Despesas
                  </div>
                </td>
                <td>R$ ${metrics.totalDespesas.toFixed(2)}</td>
                <td>R$ ${evolucaoSaldo[1]?.despesas.toFixed(2) || '0.00'}</td>
                <td class="${metrics.variacaoDespesas <= 0 ? 'positive' : 'negative'}">
                  ${metrics.variacaoDespesas >= 0 ? '+' : ''}${metrics.variacaoDespesas.toFixed(1)}%
                </td>
              </tr>
              <tr>
                <td>Saldo</td>
                <td>R$ ${metrics.saldoAtual.toFixed(2)}</td>
                <td>R$ ${evolucaoSaldo[1]?.saldo.toFixed(2) || '0.00'}</td>
                <td class="${metrics.variacaoSaldo >= 0 ? 'positive' : 'negative'}">
                  ${metrics.variacaoSaldo >= 0 ? '+' : ''}${metrics.variacaoSaldo.toFixed(1)}%
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    `;
    
    return section;
  }
  
  /**
   * Cria loader
   */
  static createLoader() {
    const loader = document.createElement('div');
    loader.className = 'loading-state';
    loader.innerHTML = `
      <div class="loading-spinner"></div>
      <span>Carregando análises...</span>
    `;
    return loader;
  }
  
  /**
   * Renderiza estado vazio
   */
  static renderEmptyState(message) {
    const container = document.createElement('div');
    container.className = 'analytics-container';
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">📊</div>
        <div class="empty-title">Nenhum Dado Disponível</div>
        <div class="empty-description">${message}</div>
      </div>
    `;
    return container;
  }
  
  /**
   * Renderiza estado de erro
   */
  static renderErrorState(message) {
    const container = document.createElement('div');
    container.className = 'analytics-container';
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">❌</div>
        <div class="empty-title">Erro ao Carregar</div>
        <div class="empty-description">${message}</div>
        <button class="btn-analytics primary mt-4" onclick="window.AnalyticsClean.refreshData()">
          Tentar Novamente
        </button>
      </div>
    `;
    return container;
  }
  
  /**
   * Atualiza período
   */
  static async updatePeriod() {
    console.log('🔄 Atualizando período...');
    // Implementar lógica de atualização
  }
  
  /**
   * Atualiza visualização
   */
  static async updateView() {
    console.log('🔄 Atualizando visualização...');
    // Implementar lógica de atualização
  }
  
  /**
   * Alterna visualização do gráfico
   */
  static toggleChartView(chartType) {
    console.log(`🔄 Alternando visualização do gráfico: ${chartType}`);
    // Implementar lógica de alternância
  }
  
  /**
   * Atualiza dados
   */
  static async refreshData() {
    console.log('🔄 Atualizando dados...');
    // Implementar lógica de atualização
  }
  
  /**
   * Exporta relatório
   */
  static exportReport() {
    console.log('📄 Exportando relatório...');
    // Implementar lógica de exportação
  }
}

// Adicionar à janela global
window.AnalyticsClean = AnalyticsClean;

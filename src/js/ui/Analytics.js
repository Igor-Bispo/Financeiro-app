/**
 * Analytics.js - Módulo para análise de dados financeiros
 * 
 * Este módulo fornece funcionalidades para análise de dados financeiros,
 * incluindo gráficos, estatísticas e relatórios.
 */

// Importar dependências
import { collection, query, where, getDocs, orderBy, limit } from 'firebase/firestore';
import { db } from '../firebase.js';

/**
 * Classe Analytics para análise de dados financeiros
 */
export class Analytics {
  /**
   * Gera um relatório de gastos por categoria para um período específico
   * @param {string} budgetId - ID do orçamento
   * @param {Date} startDate - Data inicial
   * @param {Date} endDate - Data final
   * @returns {Promise<Array>} - Array com dados de gastos por categoria
   */
  static async getGastosPorCategoria(budgetId, startDate, endDate) {
    try {
      console.log('📊 Gerando relatório de gastos por categoria...');
      
      // Validar parâmetros
      if (!budgetId) {
        throw new Error('ID do orçamento não fornecido');
      }
      
      if (!startDate || !endDate) {
        // Usar mês atual como padrão
        const now = new Date();
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0);
      }
      
      // Usar dados já carregados na aplicação se disponíveis
      let transacoes = [];
      let categorias = [];
      
      if (window.appState?.transactions && window.appState?.categories) {
        console.log('📊 Usando dados já carregados na aplicação');
        
        // Filtrar transações do orçamento e período
        transacoes = window.appState.transactions.filter(t => {
          if (t.budgetId !== budgetId) return false;
          
          const transacaoDate = t.createdAt?.toDate ? t.createdAt.toDate() : new Date(t.createdAt);
          return transacaoDate >= startDate && transacaoDate <= endDate;
        });
        
        // Filtrar categorias do orçamento
        categorias = window.appState.categories.filter(c => c.budgetId === budgetId);
        
      } else {
        console.log('📊 Buscando dados do Firestore...');
        
        // Buscar transações no período
        const transacoesRef = collection(db, 'transactions');
        const q = query(
          transacoesRef,
          where('budgetId', '==', budgetId),
          where('createdAt', '>=', startDate),
          where('createdAt', '<=', endDate)
        );
        
        const querySnapshot = await getDocs(q);
        transacoes = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        
        // Buscar categorias
        const categoriasRef = collection(db, 'categories');
        const qCategorias = query(
          categoriasRef,
          where('budgetId', '==', budgetId)
        );
        
        const categoriasSnapshot = await getDocs(qCategorias);
        categorias = categoriasSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
      }
      
      // Agrupar transações por categoria
      const gastosPorCategoria = categorias.map(categoria => {
        const transacoesCategoria = transacoes.filter(t => t.categoriaId === categoria.id);
        const totalGasto = transacoesCategoria.reduce((sum, t) => sum + parseFloat(t.valor), 0);
        
        return {
          categoria,
          totalGasto,
          transacoes: transacoesCategoria,
          percentual: 0 // Será calculado depois
        };
      });
      
      // Calcular percentuais
      const totalGeral = gastosPorCategoria.reduce((sum, item) => sum + item.totalGasto, 0);
      gastosPorCategoria.forEach(item => {
        item.percentual = totalGeral > 0 ? (item.totalGasto / totalGeral) * 100 : 0;
      });
      
      // Ordenar por valor (maior para menor)
      gastosPorCategoria.sort((a, b) => b.totalGasto - a.totalGasto);
      
      console.log('✅ Relatório gerado com sucesso:', gastosPorCategoria);
      return gastosPorCategoria;
    } catch (error) {
      console.error('❌ Erro ao gerar relatório de gastos por categoria:', error);
      throw error;
    }
  }
  
  /**
   * Gera um relatório de evolução de saldo ao longo do tempo
   * @param {string} budgetId - ID do orçamento
   * @param {number} meses - Número de meses para análise
   * @returns {Promise<Array>} - Array com dados de evolução de saldo
   */
  static async getEvolucaoSaldo(budgetId, meses = 6) {
    try {
      console.log('📊 Gerando relatório de evolução de saldo...');
      
      // Validar parâmetros
      if (!budgetId) {
        throw new Error('ID do orçamento não fornecido');
      }
      
      // Calcular período de análise
      const now = new Date();
      const periodos = [];
      
      for (let i = 0; i < meses; i++) {
        const mes = now.getMonth() - i;
        const ano = now.getFullYear() + Math.floor(mes / 12);
        const mesAjustado = ((mes % 12) + 12) % 12;
        
        const startDate = new Date(ano, mesAjustado, 1);
        const endDate = new Date(ano, mesAjustado + 1, 0);
        
        periodos.push({
          ano,
          mes: mesAjustado + 1,
          nome: startDate.toLocaleString('pt-BR', { month: 'long' }),
          startDate,
          endDate,
          receitas: 0,
          despesas: 0,
          saldo: 0
        });
      }
      
      // Buscar transações para cada período
      for (const periodo of periodos) {
        let transacoes = [];
        
        if (window.appState?.transactions) {
          // Usar dados já carregados
          transacoes = window.appState.transactions.filter(t => {
            if (t.budgetId !== budgetId) return false;
            
            const transacaoDate = t.createdAt?.toDate ? t.createdAt.toDate() : new Date(t.createdAt);
            return transacaoDate >= periodo.startDate && transacaoDate <= periodo.endDate;
          });
        } else {
          // Buscar do Firestore
          const transacoesRef = collection(db, 'transactions');
          const q = query(
            transacoesRef,
            where('budgetId', '==', budgetId),
            where('createdAt', '>=', periodo.startDate),
            where('createdAt', '<=', periodo.endDate)
          );
          
          const querySnapshot = await getDocs(q);
          transacoes = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
        }
        
        // Calcular receitas e despesas
        for (const transacao of transacoes) {
          const valor = parseFloat(transacao.valor);
          if (transacao.tipo === 'receita') {
            periodo.receitas += valor;
          } else {
            periodo.despesas += valor;
          }
        }
        
        // Calcular saldo
        periodo.saldo = periodo.receitas - periodo.despesas;
      }
      
      // Ordenar por data (mais recente primeiro)
      periodos.sort((a, b) => {
        if (a.ano !== b.ano) return b.ano - a.ano;
        return b.mes - a.mes;
      });
      
      console.log('✅ Relatório de evolução de saldo gerado com sucesso:', periodos);
      return periodos;
    } catch (error) {
      console.error('❌ Erro ao gerar relatório de evolução de saldo:', error);
      throw error;
    }
  }
  
  /**
   * Gera um relatório de previsão de gastos para os próximos meses
   * @param {string} budgetId - ID do orçamento
   * @param {number} mesesHistorico - Número de meses para análise histórica
   * @param {number} mesesPrevisao - Número de meses para previsão
   * @returns {Promise<Array>} - Array com dados de previsão de gastos
   */
  static async getPrevisaoGastos(budgetId, mesesHistorico = 3, mesesPrevisao = 3) {
    try {
      console.log('📊 Gerando previsão de gastos...');
      
      // Validar parâmetros
      if (!budgetId) {
        throw new Error('ID do orçamento não fornecido');
      }
      
      // Obter dados históricos
      const historicoSaldo = await this.getEvolucaoSaldo(budgetId, mesesHistorico);
      
      // Calcular médias
      const mediaReceitas = historicoSaldo.reduce((sum, periodo) => sum + periodo.receitas, 0) / historicoSaldo.length;
      const mediaDespesas = historicoSaldo.reduce((sum, periodo) => sum + periodo.despesas, 0) / historicoSaldo.length;
      
      // Gerar previsão
      const now = new Date();
      const previsao = [];
      
      for (let i = 1; i <= mesesPrevisao; i++) {
        const mes = now.getMonth() + i;
        const ano = now.getFullYear() + Math.floor(mes / 12);
        const mesAjustado = mes % 12;
        
        const startDate = new Date(ano, mesAjustado, 1);
        
        // Aplicar tendência (pequeno aumento mensal)
        const fatorTendencia = 1 + (i * 0.01); // 1% de aumento por mês
        
        previsao.push({
          ano,
          mes: mesAjustado + 1,
          nome: startDate.toLocaleString('pt-BR', { month: 'long' }),
          receitas: mediaReceitas * fatorTendencia,
          despesas: mediaDespesas * fatorTendencia,
          saldo: (mediaReceitas - mediaDespesas) * fatorTendencia,
          isPrevisto: true
        });
      }
      
      console.log('✅ Previsão de gastos gerada com sucesso:', previsao);
      return previsao;
    } catch (error) {
      console.error('❌ Erro ao gerar previsão de gastos:', error);
      throw error;
    }
  }
  
  /**
   * Renderiza um gráfico de gastos por categoria
   * @param {string} elementId - ID do elemento HTML para renderizar o gráfico
   * @param {Array} dados - Dados de gastos por categoria
   */
  static renderizarGraficoCategorias(elementId, dados) {
    try {
      console.log('📊 Renderizando gráfico de categorias...');
      
      const container = document.getElementById(elementId);
      if (!container) {
        throw new Error(`Elemento com ID ${elementId} não encontrado`);
      }
      
      // Limpar conteúdo anterior
      container.innerHTML = '';
      
      // Verificar se há dados
      if (!dados || dados.length === 0) {
        container.innerHTML = `
          <div class="text-center py-4">
            <p class="text-gray-500 dark:text-gray-400">Sem dados para exibir</p>
          </div>
        `;
        return;
      }
      
      // Criar gráfico de barras simples com HTML/CSS
      const html = `
        <div class="analytics-chart">
          <h3 class="text-lg font-medium mb-4">Gastos por Categoria</h3>
          <div class="space-y-3">
            ${dados.map(item => `
              <div class="chart-item">
                <div class="flex justify-between mb-1">
                  <span class="text-sm font-medium text-gray-700 dark:text-gray-300">
                    ${item.categoria.nome}
                  </span>
                  <span class="text-sm text-gray-600 dark:text-gray-400">
                    R$ ${item.totalGasto.toFixed(2)} (${item.percentual.toFixed(1)}%)
                  </span>
                </div>
                <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                  <div class="h-2.5 rounded-full" 
                       style="width: ${item.percentual}%; background-color: ${item.categoria.cor || '#4F46E5'}"></div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      `;
      
      container.innerHTML = html;
      console.log('✅ Gráfico renderizado com sucesso');
    } catch (error) {
      console.error('❌ Erro ao renderizar gráfico de categorias:', error);
      throw error;
    }
  }
  
  /**
   * Renderiza um gráfico de evolução de saldo
   * @param {string} elementId - ID do elemento HTML para renderizar o gráfico
   * @param {Array} dados - Dados de evolução de saldo
   */
  static renderizarGraficoEvolucao(elementId, dados) {
    try {
      console.log('📊 Renderizando gráfico de evolução...');
      
      const container = document.getElementById(elementId);
      if (!container) {
        throw new Error(`Elemento com ID ${elementId} não encontrado`);
      }
      
      // Limpar conteúdo anterior
      container.innerHTML = '';
      
      // Verificar se há dados
      if (!dados || dados.length === 0) {
        container.innerHTML = `
          <div class="text-center py-4">
            <p class="text-gray-500 dark:text-gray-400">Sem dados para exibir</p>
          </div>
        `;
        return;
      }
      
      // Encontrar valores máximos para escala
      const maxReceita = Math.max(...dados.map(d => d.receitas));
      const maxDespesa = Math.max(...dados.map(d => d.despesas));
      const maxValor = Math.max(maxReceita, maxDespesa) * 1.1; // 10% a mais para margem
      
      // Criar gráfico de linhas simples com HTML/CSS
      const html = `
        <div class="analytics-chart">
          <h3 class="text-lg font-medium mb-4">Evolução Financeira</h3>
          
          <div class="relative h-64 mt-4">
            <!-- Linhas de grade -->
            <div class="absolute inset-0 grid grid-rows-4 w-full h-full">
              ${[0, 1, 2, 3].map(i => `
                <div class="border-t border-gray-200 dark:border-gray-700 relative">
                  <span class="absolute -top-3 -left-12 text-xs text-gray-500 dark:text-gray-400">
                    R$ ${((maxValor / 4) * (4 - i)).toFixed(0)}
                  </span>
                </div>
              `).join('')}
            </div>
            
            <!-- Gráfico de linhas -->
            <div class="absolute inset-0 flex items-end justify-between">
              ${dados.map((periodo, index) => {
                const alturaReceita = (periodo.receitas / maxValor) * 100;
                const alturaDespesa = (periodo.despesas / maxValor) * 100;
                const corSaldo = periodo.saldo >= 0 ? 'bg-green-500' : 'bg-red-500';
                const isPrevisto = periodo.isPrevisto;
                
                return `
                  <div class="flex flex-col items-center justify-end w-full max-w-[${100 / dados.length}%] px-1">
                    <!-- Barra de receita -->
                    <div class="w-full flex justify-center mb-1">
                      <div class="w-4 ${isPrevisto ? 'bg-green-300/50' : 'bg-green-500'} rounded-t" 
                           style="height: ${alturaReceita}%"></div>
                    </div>
                    
                    <!-- Barra de despesa -->
                    <div class="w-full flex justify-center mb-1">
                      <div class="w-4 ${isPrevisto ? 'bg-red-300/50' : 'bg-red-500'} rounded-t" 
                           style="height: ${alturaDespesa}%"></div>
                    </div>
                    
                    <!-- Rótulo do mês -->
                    <div class="text-xs text-gray-600 dark:text-gray-400 mt-1 ${isPrevisto ? 'italic' : ''}">
                      ${periodo.nome.substring(0, 3)}
                      ${isPrevisto ? '*' : ''}
                    </div>
                  </div>
                `;
              }).join('')}
            </div>
          </div>
          
          <!-- Legenda -->
          <div class="flex justify-center mt-4 space-x-4 text-xs">
            <div class="flex items-center">
              <div class="w-3 h-3 bg-green-500 rounded-full mr-1"></div>
              <span class="text-gray-600 dark:text-gray-400">Receitas</span>
            </div>
            <div class="flex items-center">
              <div class="w-3 h-3 bg-red-500 rounded-full mr-1"></div>
              <span class="text-gray-600 dark:text-gray-400">Despesas</span>
            </div>
            ${dados.some(d => d.isPrevisto) ? `
              <div class="flex items-center">
                <span class="text-gray-600 dark:text-gray-400 italic">* Previsto</span>
              </div>
            ` : ''}
          </div>
        </div>
      `;
      
      container.innerHTML = html;
      console.log('✅ Gráfico de evolução renderizado com sucesso');
    } catch (error) {
      console.error('❌ Erro ao renderizar gráfico de evolução:', error);
      throw error;
    }
  }
  
  /**
   * Gera um relatório completo com todos os dados financeiros
   * @param {string} budgetId - ID do orçamento
   * @returns {Promise<Object>} - Objeto com todos os dados do relatório
   */
  static async gerarRelatorioCompleto(budgetId) {
    try {
      console.log('📊 Gerando relatório completo...');
      
      // Validar parâmetros
      if (!budgetId) {
        throw new Error('ID do orçamento não fornecido');
      }
      
      // Verificar se o usuário está autenticado
      if (!window.appState?.currentUser) {
        throw new Error('Usuário não autenticado');
      }
      
      console.log('🔍 Gerando relatório para orçamento:', budgetId);
      
      // Obter dados de diferentes fontes
      const [gastosPorCategoria, evolucaoSaldo, previsaoGastos] = await Promise.all([
        this.getGastosPorCategoria(budgetId),
        this.getEvolucaoSaldo(budgetId, 6),
        this.getPrevisaoGastos(budgetId, 3, 3)
      ]);
      
      console.log('📊 Dados obtidos:', {
        gastosPorCategoria: gastosPorCategoria.length,
        evolucaoSaldo: evolucaoSaldo.length,
        previsaoGastos: previsaoGastos.length
      });
      
      // Combinar dados em um único relatório
      const relatorio = {
        gastosPorCategoria,
        evolucaoSaldo,
        previsaoGastos,
        resumo: {
          saldoAtual: evolucaoSaldo[0]?.saldo || 0,
          receitasMes: evolucaoSaldo[0]?.receitas || 0,
          despesasMes: evolucaoSaldo[0]?.despesas || 0,
          tendencia: previsaoGastos[0]?.saldo >= 0 ? 'positiva' : 'negativa',
          categoriasMaioresGastos: gastosPorCategoria.slice(0, 3)
        }
      };
      
      console.log('✅ Relatório completo gerado com sucesso');
      return relatorio;
    } catch (error) {
      console.error('❌ Erro ao gerar relatório completo:', error);
      console.error('Stack trace:', error.stack);
      throw error;
    }
  }
}

// Adicionar à janela global para uso em outros módulos
window.Analytics = Analytics;
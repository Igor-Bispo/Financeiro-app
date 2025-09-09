﻿/**
 * Analytics.js - MÃ³dulo para anÃ¡lise de dados financeiros
 *
 * Este mÃ³dulo fornece funcionalidades para anÃ¡lise de dados financeiros,
 * incluindo grÃ¡ficos, estatÃ­sticas e relatÃ³rios.
 */

// Importar dependÃªncias
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase.js';

/**
 * Classe Analytics para anÃ¡lise de dados financeiros
 */
export class Analytics {
  // Busca transaÃ§Ãµes do Firestore para um perÃ­odo; tenta createdAt range e faz fallback para budgetId puro quando necessÃ¡rio
  static async fetchTransactionsForPeriod(budgetId, startDate, endDate) {
    try {
      const transacoesRef = collection(db, 'transactions');
      // Primeira tentativa: range por createdAt (eficiente quando os dados possuem esse campo)
      try {
        const qRange = query(
          transacoesRef,
          where('budgetId', '==', budgetId),
          where('createdAt', '>=', startDate),
          where('createdAt', '<=', endDate)
        );
        const snap = await getDocs(qRange);
        const items = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        if (items.length > 0) {
          return items;
        }
      } catch (e) {
        // Ignorar erro e tentar fallback amplo
        console.warn('Fallback to broad query (createdAt range unsupported or empty):', e?.message || e);
      }

      // Fallback: buscar por budgetId e filtrar por data efetiva no cliente
      const qBudget = query(transacoesRef, where('budgetId', '==', budgetId));
      const snapAll = await getDocs(qBudget);
      const all = snapAll.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      return all.filter(t => {
        const d = Analytics.txToDate(t);
        return d && d >= startDate && d <= endDate;
      });
    } catch (err) {
      console.error('Erro ao buscar transaÃ§Ãµes do perÃ­odo:', err);
      return [];
    }
  }
  // Helper: resolve a transaction's effective date consistently (prefers explicit date fields)
  static txToDate(t) {
    try {
      let v = t?.dataEfetivacao || t?.dataLancamento || t?.data || t?.date || t?.createdAt;
      if (!v) return null;
      if (v && typeof v.toDate === 'function') return v.toDate();
      if (typeof v === 'string') {
        const s = v.trim();
        const m = s.match(/^(\d{4})-(\d{2})-(\d{2})$/);
        if (m) return new Date(parseInt(m[1], 10), parseInt(m[2], 10) - 1, parseInt(m[3], 10));
        const d = new Date(s);
        return isNaN(d.getTime()) ? null : d;
      }
      if (typeof v === 'number') {
        const ms = v < 1e12 ? v * 1000 : v;
        const d = new Date(ms);
        return isNaN(d.getTime()) ? null : d;
      }
      if (v instanceof Date) return v;
      const d = new Date(v);
      return isNaN(d.getTime()) ? null : d;
    } catch {
      return null;
    }
  }
  /**
   * Gera um relatÃ³rio de gastos por categoria para um perÃ­odo especÃ­fico
   * @param {string} budgetId - ID do orÃ§amento
   * @param {Date} startDate - Data inicial
   * @param {Date} endDate - Data final
   * @returns {Promise<Array>} - Array com dados de gastos por categoria
   */
  static async getGastosPorCategoria(budgetId, startDate, endDate) {
    try {
      console.log('ðŸ“Š Gerando relatÃ³rio de gastos por categoria...');

      // Validar parÃ¢metros
      if (!budgetId) {
        throw new Error('ID do orÃ§amento nÃ£o fornecido');
      }

      if (!startDate || !endDate) {
        // Usar mÃªs atual como padrÃ£o
        const now = new Date();
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0);
      }

      // Usar dados jÃ¡ carregados na aplicaÃ§Ã£o se disponÃ­veis
      let transacoes = [];
      let categorias = [];

      if (window.appState?.transactions && window.appState?.categories) {
        console.log('ðŸ“Š Usando dados jÃ¡ carregados na aplicaÃ§Ã£o');

        // Filtrar transaÃ§Ãµes do orÃ§amento e perÃ­odo
        transacoes = window.appState.transactions.filter(t => {
          if (t.budgetId !== budgetId) return false;
          const d = Analytics.txToDate(t);
          return d && d >= startDate && d <= endDate;
        });

        // Filtrar categorias do orÃ§amento
        categorias = window.appState.categories.filter(c => c.budgetId === budgetId);
        // Fallback: se nÃ£o houver transaÃ§Ãµes locais para o perÃ­odo, tentar buscar do Firestore
        if (!transacoes || transacoes.length === 0) {
          const fetched = await Analytics.fetchTransactionsForPeriod(budgetId, startDate, endDate);
          if (fetched.length > 0) {
            transacoes = fetched;
          }
        }
      } else {
        console.log('ðŸ“Š Buscando dados do Firestore...');

        // Buscar transaÃ§Ãµes no perÃ­odo (com fallback interno)
        transacoes = await Analytics.fetchTransactionsForPeriod(budgetId, startDate, endDate);

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

      // Agrupar transaÃ§Ãµes por categoria
      const gastosPorCategoria = categorias.map(categoria => {
        const transacoesCategoria = transacoes.filter(t => t.categoriaId === categoria.id);
        const totalGasto = transacoesCategoria.reduce((sum, t) => sum + parseFloat(t.valor), 0);

        return {
          categoria,
          totalGasto,
          transacoes: transacoesCategoria,
          percentual: 0 // SerÃ¡ calculado depois
        };
      });

      // Calcular percentuais
      const totalGeral = gastosPorCategoria.reduce((sum, item) => sum + item.totalGasto, 0);
      gastosPorCategoria.forEach(item => {
        item.percentual = totalGeral > 0 ? (item.totalGasto / totalGeral) * 100 : 0;
      });

      // Ordenar por valor (maior para menor)
      gastosPorCategoria.sort((a, b) => b.totalGasto - a.totalGasto);

      console.log('âœ… RelatÃ³rio gerado com sucesso:', gastosPorCategoria);
      return gastosPorCategoria;
    } catch (error) {
      console.error('âŒ Erro ao gerar relatÃ³rio de gastos por categoria:', error);
      throw error;
    }
  }

  /**
   * Gera um relatÃ³rio de evoluÃ§Ã£o de saldo ao longo do tempo
   * @param {string} budgetId - ID do orÃ§amento
   * @param {number} meses - NÃºmero de meses para anÃ¡lise
   * @returns {Promise<Array>} - Array com dados de evoluÃ§Ã£o de saldo
   */
  static async getEvolucaoSaldo(budgetId, meses = 6) {
    try {
      console.log('ðŸ“Š Gerando relatÃ³rio de evoluÃ§Ã£o de saldo...');

      // Validar parÃ¢metros
      if (!budgetId) {
        throw new Error('ID do orÃ§amento nÃ£o fornecido');
      }

      // Calcular perÃ­odo de anÃ¡lise
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

      // Buscar transaÃ§Ãµes para cada perÃ­odo
      for (const periodo of periodos) {
        let transacoes = [];

        if (window.appState?.transactions) {
          // Usar dados jÃ¡ carregados
          transacoes = window.appState.transactions.filter(t => {
            if (t.budgetId !== budgetId) return false;
            const d = Analytics.txToDate(t);
            return d && d >= periodo.startDate && d <= periodo.endDate;
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

      console.log('âœ… RelatÃ³rio de evoluÃ§Ã£o de saldo gerado com sucesso:', periodos);
      return periodos;
    } catch (error) {
      console.error('âŒ Erro ao gerar relatÃ³rio de evoluÃ§Ã£o de saldo:', error);
      throw error;
    }
  }

  /**
   * Gera um relatÃ³rio de previsÃ£o de gastos para os prÃ³ximos meses
   * @param {string} budgetId - ID do orÃ§amento
   * @param {number} mesesHistorico - NÃºmero de meses para anÃ¡lise histÃ³rica
   * @param {number} mesesPrevisao - NÃºmero de meses para previsÃ£o
   * @returns {Promise<Array>} - Array com dados de previsÃ£o de gastos
   */
  static async getPrevisaoGastos(budgetId, mesesHistorico = 3, mesesPrevisao = 3) {
    try {
      console.log('ðŸ“Š Gerando previsÃ£o de gastos...');

      // Validar parÃ¢metros
      if (!budgetId) {
        throw new Error('ID do orÃ§amento nÃ£o fornecido');
      }

      // Obter dados histÃ³ricos
      const historicoSaldo = await this.getEvolucaoSaldo(budgetId, mesesHistorico);

      // Calcular mÃ©dias
      const mediaReceitas = historicoSaldo.reduce((sum, periodo) => sum + periodo.receitas, 0) / historicoSaldo.length;
      const mediaDespesas = historicoSaldo.reduce((sum, periodo) => sum + periodo.despesas, 0) / historicoSaldo.length;

      // Gerar previsÃ£o
      const now = new Date();
      const previsao = [];

      for (let i = 1; i <= mesesPrevisao; i++) {
        const mes = now.getMonth() + i;
        const ano = now.getFullYear() + Math.floor(mes / 12);
        const mesAjustado = mes % 12;

        const startDate = new Date(ano, mesAjustado, 1);

        // Aplicar tendÃªncia (pequeno aumento mensal)
        const fatorTendencia = 1 + (i * 0.01); // 1% de aumento por mÃªs

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

      console.log('âœ… PrevisÃ£o de gastos gerada com sucesso:', previsao);
      return previsao;
    } catch (error) {
      console.error('âŒ Erro ao gerar previsÃ£o de gastos:', error);
      throw error;
    }
  }

  /**
   * Renderiza um grÃ¡fico de gastos por categoria
   * @param {string} elementId - ID do elemento HTML para renderizar o grÃ¡fico
   * @param {Array} dados - Dados de gastos por categoria
   */
  static renderizarGraficoCategorias(elementId, dados) {
    try {
      console.log('ðŸ“Š Renderizando grÃ¡fico de categorias...');

      const container = document.getElementById(elementId);
      if (!container) {
        throw new Error(`Elemento com ID ${elementId} nÃ£o encontrado`);
      }

      // Limpar conteÃºdo anterior
      container.innerHTML = '';

      // Verificar se hÃ¡ dados
      if (!dados || dados.length === 0) {
        container.innerHTML = `
          <div class="text-center py-4">
            <p class="text-gray-500 dark:text-gray-400">Sem dados para exibir</p>
          </div>
        `;
        return;
      }

      // Criar grÃ¡fico de barras simples com HTML/CSS
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
      console.log('âœ… GrÃ¡fico renderizado com sucesso');
    } catch (error) {
      console.error('âŒ Erro ao renderizar grÃ¡fico de categorias:', error);
      throw error;
    }
  }

  /**
   * Renderiza um grÃ¡fico de evoluÃ§Ã£o de saldo
   * @param {string} elementId - ID do elemento HTML para renderizar o grÃ¡fico
   * @param {Array} dados - Dados de evoluÃ§Ã£o de saldo
   */
  static renderizarGraficoEvolucao(elementId, dados) {
    try {
      console.log('ðŸ“Š Renderizando grÃ¡fico de evoluÃ§Ã£o...');

      const container = document.getElementById(elementId);
      if (!container) {
        throw new Error(`Elemento com ID ${elementId} nÃ£o encontrado`);
      }

      // Limpar conteÃºdo anterior
      container.innerHTML = '';

      // Verificar se hÃ¡ dados
      if (!dados || dados.length === 0) {
        container.innerHTML = `
          <div class="text-center py-4">
            <p class="text-gray-500 dark:text-gray-400">Sem dados para exibir</p>
          </div>
        `;
        return;
      }

      // Encontrar valores mÃ¡ximos para escala
      const maxReceita = Math.max(...dados.map(d => d.receitas));
      const maxDespesa = Math.max(...dados.map(d => d.despesas));
      const maxValor = Math.max(maxReceita, maxDespesa) * 1.1; // 10% a mais para margem

      // Criar grÃ¡fico de linhas simples com HTML/CSS
      const html = `
        <div class="analytics-chart">
          <h3 class="text-lg font-medium mb-4">EvoluÃ§Ã£o Financeira</h3>
          
          <div class="relative h-64 mt-4 pl-12 pr-4">
            <!-- Linhas de grade -->
            <div class="absolute inset-0 grid grid-rows-4 w-full h-full">
              ${[0, 1, 2, 3].map(i => `
                <div class="border-t border-gray-200 dark:border-gray-700 relative">
                  <span class="absolute -top-3 -left-16 text-xs text-gray-500 dark:text-gray-400">
                    R$ ${((maxValor / 4) * (4 - i)).toFixed(0)}
                  </span>
                </div>
              `).join('')}
            </div>
            
            <!-- GrÃ¡fico de barras -->
            <div class="absolute inset-0 flex items-end justify-between gap-1">
              ${dados.map((periodo, _index) => {
    const alturaReceita = Math.max((periodo.receitas / maxValor) * 100, 2);
    const alturaDespesa = Math.max((periodo.despesas / maxValor) * 100, 2);
    const isPrevisto = periodo.isPrevisto;

    return `
                  <div class="flex flex-col items-center justify-end flex-1 min-w-0">
                    <!-- Barra de receita -->
                    <div class="w-full flex justify-center mb-1">
                      <div class="w-3 ${isPrevisto ? 'bg-green-300/50' : 'bg-green-500'} rounded-t transition-all duration-300 hover:w-4" 
                           style="height: ${alturaReceita}%"></div>
                    </div>
                    
                    <!-- Barra de despesa -->
                    <div class="w-full flex justify-center mb-1">
                      <div class="w-3 ${isPrevisto ? 'bg-red-300/50' : 'bg-red-500'} rounded-t transition-all duration-300 hover:w-4" 
                           style="height: ${alturaDespesa}%"></div>
                    </div>
                    
                    <!-- RÃ³tulo do mÃªs -->
                    <div class="text-xs text-gray-600 dark:text-gray-400 mt-1 ${isPrevisto ? 'italic' : ''} text-center truncate w-full">
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
      console.log('âœ… GrÃ¡fico de evoluÃ§Ã£o renderizado com sucesso');
    } catch (error) {
      console.error('âŒ Erro ao renderizar grÃ¡fico de evoluÃ§Ã£o:', error);
      throw error;
    }
  }

  /**
   * Gera um relatÃ³rio completo com todos os dados financeiros
   * @param {string} budgetId - ID do orÃ§amento
   * @returns {Promise<Object>} - Objeto com todos os dados do relatÃ³rio
   */
  static async gerarRelatorioCompleto(budgetId, startDate, endDate) {
    try {
      console.log('ðŸ“Š Gerando relatÃ³rio completo...');

      // Validar parÃ¢metros
      if (!budgetId) {
        throw new Error('ID do orÃ§amento nÃ£o fornecido');
      }

      // Verificar se o usuÃ¡rio estÃ¡ autenticado
      if (!window.appState?.currentUser) {
        throw new Error('UsuÃ¡rio nÃ£o autenticado');
      }

      console.log('ðŸ” Gerando relatÃ³rio para orÃ§amento:', budgetId);

      // Obter dados de diferentes fontes
      const [gastosPorCategoria, evolucaoSaldo, previsaoGastos] = await Promise.all([
        this.getGastosPorCategoria(budgetId, startDate, endDate),
        this.getEvolucaoSaldo(budgetId, 6),
        this.getPrevisaoGastos(budgetId, 3, 3)
      ]);

      console.log('ðŸ“Š Dados obtidos:', {
        gastosPorCategoria: gastosPorCategoria.length,
        evolucaoSaldo: evolucaoSaldo.length,
        previsaoGastos: previsaoGastos.length
      });

      // Combinar dados em um Ãºnico relatÃ³rio (usar fallback robusto)
      let receitasMes = 0;
      let despesasMes = 0;
      if (startDate && endDate) {
        let tx = [];
        if (window.appState?.transactions) {
          tx = window.appState.transactions.filter(t => {
            if (t.budgetId !== budgetId) return false;
            const d = Analytics.txToDate ? Analytics.txToDate(t) : (t.createdAt?.toDate ? t.createdAt.toDate() : new Date(t.createdAt));
            return d && d >= startDate && d <= endDate;
          });
        }
        if (!tx || tx.length === 0) {
          // fallback: buscar do Firestore
          try {
            tx = await Analytics.fetchTransactionsForPeriod(budgetId, startDate, endDate);
          } catch (e) {
            console.warn('fetchTransactionsForPeriod fallback failed:', e);
          }
        }
        receitasMes = tx.filter(t => t.tipo === 'receita').reduce((s, t) => s + parseFloat(t.valor || 0), 0);
        despesasMes = tx.filter(t => t.tipo === 'despesa').reduce((s, t) => s + parseFloat(t.valor || 0), 0);
      }

      const relatorio = {
        gastosPorCategoria,
        evolucaoSaldo,
        previsaoGastos,
        resumo: {
          saldoAtual: (receitasMes - despesasMes),
          receitasMes: receitasMes,
          despesasMes: despesasMes,
          tendencia: previsaoGastos[0]?.saldo >= 0 ? 'positiva' : 'negativa',
          categoriasMaioresGastos: gastosPorCategoria.slice(0, 3)
        }
      };

      console.log('âœ… RelatÃ³rio completo gerado com sucesso');
      return relatorio;
    } catch (error) {
      console.error('âŒ Erro ao gerar relatÃ³rio completo:', error);
      console.error('Stack trace:', error.stack);
      throw error;
    }
  }
}

// Adicionar Ã  janela global para uso em outros mÃ³dulos
window.Analytics = Analytics;

// features/calculations/CalculationService.js

// Função para calcular saldo do orçamento
export function calculateBudgetBalance(budgetId) {
  try {
    const budget = window.appState.budgets.find(b => b.id === budgetId);
    if (!budget) return { receitas: 0, despesas: 0, saldo: 0 };

    const transactions = window.appState.transactions.filter(t => t.budgetId === budgetId);

    const receitas = transactions
      .filter(t => t.tipo === 'receita')
      .reduce((total, t) => total + (t.valor || 0), 0);

    const despesas = transactions
      .filter(t => t.tipo === 'despesa')
      .reduce((total, t) => total + (t.valor || 0), 0);

    const saldo = receitas - despesas;

    return {
      receitas: roundToTwoDecimals(receitas),
      despesas: roundToTwoDecimals(despesas),
      saldo: roundToTwoDecimals(saldo),
      orcado: budget.valorTotal || 0
    };
  } catch (error) {
    console.error('❌ Erro ao calcular saldo do orçamento:', error);
    return { receitas: 0, despesas: 0, saldo: 0, orcado: 0 };
  }
}

// Função para calcular totais por categoria
export function calculateCategoryTotals(budgetId, month = null) {
  try {
    let transactions = window.appState.transactions.filter(t => t.budgetId === budgetId);

    // Filtrar por mês se especificado
    if (month) {
      const targetMonth = month.getFullYear() + '-' + String(month.getMonth() + 1).padStart(2, '0');
      transactions = transactions.filter(t => {
        const transactionMonth = t.data ?
          new Date(t.data).getFullYear() + '-' + String(new Date(t.data).getMonth() + 1).padStart(2, '0') :
          new Date().getFullYear() + '-' + String(new Date().getMonth() + 1).padStart(2, '0');
        return transactionMonth === targetMonth;
      });
    }

    const categoryTotals = {};

    transactions.forEach(transaction => {
      const categoryId = transaction.categoriaId;
      const category = window.appState.categories.find(c => c.id === categoryId);

      if (category) {
        if (!categoryTotals[categoryId]) {
          categoryTotals[categoryId] = {
            id: categoryId,
            nome: category.nome,
            cor: category.cor,
            tipo: category.tipo,
            receitas: 0,
            despesas: 0,
            total: 0
          };
        }

        if (transaction.tipo === 'receita') {
          categoryTotals[categoryId].receitas += transaction.valor || 0;
        } else {
          categoryTotals[categoryId].despesas += transaction.valor || 0;
        }

        categoryTotals[categoryId].total = categoryTotals[categoryId].receitas - categoryTotals[categoryId].despesas;
      }
    });

    // Converter para array e ordenar por total
    return Object.values(categoryTotals)
      .map(cat => ({
        ...cat,
        receitas: roundToTwoDecimals(cat.receitas),
        despesas: roundToTwoDecimals(cat.despesas),
        total: roundToTwoDecimals(cat.total)
      }))
      .sort((a, b) => Math.abs(b.total) - Math.abs(a.total));

  } catch (error) {
    console.error('❌ Erro ao calcular totais por categoria:', error);
    return [];
  }
}

// Função para calcular estatísticas mensais
export function calculateMonthlyStats(budgetId, months = 6) {
  try {
    const stats = [];
    const currentDate = new Date();

    for (let i = 0; i < months; i++) {
      const targetDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
      const monthKey = targetDate.getFullYear() + '-' + String(targetDate.getMonth() + 1).padStart(2, '0');
      const monthName = targetDate.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });

      const monthTransactions = window.appState.transactions.filter(t => {
        if (t.budgetId !== budgetId) return false;
        if (!t.data) return false;

        const transactionDate = new Date(t.data);
        const transactionMonth = transactionDate.getFullYear() + '-' + String(transactionDate.getMonth() + 1).padStart(2, '0');
        return transactionMonth === monthKey;
      });

      const receitas = monthTransactions
        .filter(t => t.tipo === 'receita')
        .reduce((total, t) => total + (t.valor || 0), 0);

      const despesas = monthTransactions
        .filter(t => t.tipo === 'despesa')
        .reduce((total, t) => total + (t.valor || 0), 0);

      const saldo = receitas - despesas;

      stats.push({
        month: monthKey,
        monthName: monthName,
        receitas: roundToTwoDecimals(receitas),
        despesas: roundToTwoDecimals(despesas),
        saldo: roundToTwoDecimals(saldo),
        transactionCount: monthTransactions.length
      });
    }

    return stats.reverse(); // Ordenar cronologicamente

  } catch (error) {
    console.error('❌ Erro ao calcular estatísticas mensais:', error);
    return [];
  }
}

// Função para calcular tendências
export function calculateTrends(budgetId, months = 3) {
  try {
    const monthlyStats = calculateMonthlyStats(budgetId, months);

    if (monthlyStats.length < 2) return { trend: 'estavel', percentage: 0 };

    const recent = monthlyStats[monthlyStats.length - 1];
    const previous = monthlyStats[monthlyStats.length - 2];

    if (previous.saldo === 0) return { trend: 'estavel', percentage: 0 };

    const percentageChange = ((recent.saldo - previous.saldo) / Math.abs(previous.saldo)) * 100;

    let trend = 'estavel';
    if (percentageChange > 5) trend = 'crescimento';
    else if (percentageChange < -5) trend = 'declinio';

    return {
      trend: trend,
      percentage: roundToTwoDecimals(percentageChange),
      change: roundToTwoDecimals(recent.saldo - previous.saldo)
    };

  } catch (error) {
    console.error('❌ Erro ao calcular tendências:', error);
    return { trend: 'estavel', percentage: 0 };
  }
}

// Função para calcular projeções
export function calculateProjections(budgetId, months = 3) {
  try {
    const monthlyStats = calculateMonthlyStats(budgetId, months);

    if (monthlyStats.length < 2) return null;

    // Calcular média de crescimento
    const changes = [];
    for (let i = 1; i < monthlyStats.length; i++) {
      const change = monthlyStats[i].saldo - monthlyStats[i-1].saldo;
      changes.push(change);
    }

    const averageChange = changes.reduce((sum, change) => sum + change, 0) / changes.length;
    const currentSaldo = monthlyStats[monthlyStats.length - 1].saldo;

    // Projetar próximos meses
    const projections = [];
    for (let i = 1; i <= months; i++) {
      const projectedSaldo = currentSaldo + (averageChange * i);
      projections.push({
        month: i,
        projectedSaldo: roundToTwoDecimals(projectedSaldo),
        confidence: Math.max(0, 100 - (i * 20)) // Confiança diminui com o tempo
      });
    }

    return projections;

  } catch (error) {
    console.error('❌ Erro ao calcular projeções:', error);
    return null;
  }
}

// Função auxiliar para arredondar para 2 casas decimais
function roundToTwoDecimals(value) {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

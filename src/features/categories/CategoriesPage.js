// Atualiza a UI automaticamente ao receber evento de atualização de categorias
if (typeof window !== 'undefined' && window.eventBus && typeof window.eventBus.on === 'function') {
  window.eventBus.on('categories:updated', () => {
    // Só renderizar se estivermos na página de categorias
    const currentHash = (window.location.hash || '').split('?')[0];
    if (currentHash === '#/categories') {
      try { renderCategories(); } catch (e) { console.warn('Falha ao renderizar categorias após atualização', e); }
    }
  });
}
// features/categories/CategoriesPage.js
import { mountPeriodIndicator } from '../../ui/PeriodIndicator.js';
import { eventBus } from '@core/events/eventBus.js';
import { renderFAB } from '../ui/UIService.js';
import { setupCategoryButtons } from '../config/ConfigService.js';
import { loadRecorrentes as loadRecorrentesService } from '../recorrentes/service.js';
import { getSelectedPeriod } from '@core/utils/globalUtils.js';

// (helper getTransactionYearMonth não é necessário aqui)

export async function render(container) {
  const root = document.createElement('div');
  root.className = 'categories-page';

  // Garantir que showAddCategoryModal esteja disponível
  if (!window.showAddCategoryModal) {
    try {
      const { default: showAddCategoryModal } = await import('@js/showAddCategoryModal.js');
      window.showAddCategoryModal = showAddCategoryModal;
      console.log('✅ showAddCategoryModal carregado dinamicamente');
    } catch (error) {
      console.error('❌ Falha ao carregar showAddCategoryModal:', error);
    }
  }

  // Header com indicador de período
  const header = document.createElement('div');
  header.className = 'tab-header mb-6';
  header.innerHTML = `
    <div class="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm border border-gray-200 dark:border-gray-600">
      <div class="flex items-center justify-between w-full gap-4">
        <div class="flex items-center gap-3">
          <div class="flex items-center gap-2">
            <div class="w-8 h-8 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center">
              <span class="text-white text-sm">📂</span>
            </div>
            <div>
              <h1 class="text-2xl font-semibold text-gray-900 leading-tight">📂 Categorias</h1>
              <div class="flex items-center gap-1">
                <span class="text-cyan-600 dark:text-cyan-400 text-xs">Organize seus gastos</span>
              </div>
            </div>
          </div>
        </div>
        <div id="cat-period-indicator"></div>
      </div>
    </div>
  `;

  // O indicador de período será injetado na renderização principal (cat-period-indicator)

  root.appendChild(header);

  // Conteúdo das categorias
  const content = document.createElement('div');
  content.className = 'categories-content';
  content.innerHTML = `
    <div class="u-card bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-6">
      <div class="flex justify-between items-center mb-6 gap-4">
        <h3 class="text-lg font-bold text-gray-900 dark:text-white">📁 Gerenciar Categorias</h3>
  <button onclick="window.showAddCategoryModal()" class="btn btn-primary btn-sm">
          ➕ Nova Categoria
        </button>
      </div>
      
      <div class="text-center py-8">
        <div class="text-4xl mb-4">📂</div>
        <p class="text-gray-600 dark:text-gray-400">Página de categorias em desenvolvimento</p>
        <p class="text-sm text-gray-500 dark:text-gray-500 mt-2">Carregando categorias...</p>
      </div>
    </div>
  `;

  // Empty state quando não há categorias
  try {
    const wrap = document.querySelector('.content-spacing');
    const hasAny = Array.isArray(window.appState?.categories) && window.appState.categories.length > 0;
    if (wrap && !hasAny) {
      const empty = document.createElement('div');
      empty.className = 'empty-state mt-2';
      empty.innerHTML = '<div class="empty-icon">📁</div><div class="empty-text">Nenhuma categoria cadastrada</div><div class="mt-2"><button class="btn btn-primary w-full" onclick=\"window.showAddCategoryModal && window.showAddCategoryModal()\">Criar categoria</button></div>';
      wrap.appendChild(empty);
    }
  } catch {}

  // Garantir indicador após render
  try {
    console.log('🔧 Montando indicador de período em categorias');
    mountPeriodIndicator('#cat-period-indicator');
  } catch (error) {
    console.error('❌ Erro ao montar indicador:', error);
  }

  root.appendChild(content);

  // Limpar container e adicionar novo conteúdo
  if (container) {
    console.log('🔍 ANTES da limpeza - verificando indicador...');
    const periodIndicator = container.querySelector('#cat-period-indicator');
    console.log('🔍 Indicador encontrado antes da limpeza:', periodIndicator);

    container.innerHTML = '';
    container.appendChild(root);

    console.log('🔍 APÓS limpeza - verificando estrutura...');
    const header = container.querySelector('.tab-header');
    console.log('🔍 Header encontrado:', header);

    if (header) {
      const headerContent = header.querySelector('.bg-white');
      console.log('🔍 Header content encontrado:', headerContent);

      if (headerContent) {
        const rightSide = headerContent.querySelector('.flex.items-center.justify-between');
        console.log('🔍 Right side encontrado:', rightSide);

        if (rightSide && periodIndicator) {
          console.log('🔍 Re-adicionando indicador...');
          rightSide.appendChild(periodIndicator);
          console.log('✅ Indicador re-adicionado com sucesso');
        } else if (!periodIndicator) {
          console.log('⚠️ Indicador não existe, será criado posteriormente');
        } else {
          console.error('❌ Right side não encontrado');
        }
      } else {
        console.error('❌ Header content não encontrado');
      }
    } else {
      console.error('❌ Header não encontrado');
    }
  }

  // Carregar categorias reais
  await loadCategories();
  try {
    console.log('🔧 Re-montando indicador após loadCategories');
    mountPeriodIndicator('#cat-period-indicator');
  } catch (error) {
    console.error('❌ Erro ao re-montar indicador:', error);
  }
}

async function loadCategories() {
  try {
    // Aqui seria carregado categorias reais do Firebase
    console.log('Categories: Carregando dados...');
    try { await renderCategories(); } catch (e) { console.warn('renderCategories falhou:', e); }
  } catch (error) {
    console.error('Erro ao carregar categorias:', error);
  }
}

// Função para atualizar apenas os dados das categorias sem re-renderizar o header
async function updateCategoriesData() {
  console.log('🔄 updateCategoriesData - Atualizando dados sem re-renderizar header');

  try {
    // Garantir dados necessários disponíveis
    await loadTransactions();
    await loadRecorrentes();

    // Calcular gastos por categoria no mês selecionado
    const { year: anoAtual, month: mesAtual } = getSelectedPeriod();
    console.log('📅 Período selecionado para atualização:', { anoAtual, mesAtual });

    // Recalcular e atualizar os dados das categorias
    await updateCategoriesContent(anoAtual, mesAtual);

    console.log('✅ Dados das categorias atualizados sem re-renderizar header');

  } catch (error) {
    console.error('❌ Erro ao atualizar dados das categorias:', error);
  }
}

// Função auxiliar para calcular dias restantes no mês
function calcularDiasRestantesNoMes(ano, mes) {
  const ultimoDiaDoMes = new Date(ano, mes, 0).getDate(); // Último dia do mês
  const diaAtual = new Date().getDate();
  return Math.max(1, ultimoDiaDoMes - diaAtual + 1);
}

// Função auxiliar para calcular gastos de categoria corretamente
function calcularGastosCategoria(cat, anoAtual, mesAtual) {
  // Filtrar transações da categoria no mês atual
  const transacoesCategoria = window.appState.transactions.filter(t => {
    // Tratar Firestore Timestamp
    let transacaoData;
    if (t.createdAt && typeof t.createdAt === 'object' && t.createdAt.seconds) {
      transacaoData = new Date(t.createdAt.seconds * 1000);
    } else {
      transacaoData = new Date(t.createdAt);
    }

    const transacaoAno = transacaoData.getFullYear();
    const transacaoMes = transacaoData.getMonth() + 1;

    return (
      t.categoriaId === cat.id &&
      t.tipo === cat.tipo &&
      transacaoAno === anoAtual &&
      transacaoMes === mesAtual
    );
  });

  // Separar transações diretas das transações geradas por recorrentes
  const transacoesDiretas = transacoesCategoria.filter(t => !t.recorrenteId);
  const transacoesRecorrentes = transacoesCategoria.filter(t => t.recorrenteId);

  // Calcular totais
  const totalGastoTransacoes = transacoesDiretas.reduce((sum, t) => sum + parseFloat(t.valor), 0);
  const totalGastoRecorrentes = transacoesRecorrentes.reduce((sum, t) => sum + parseFloat(t.valor), 0);
  const totalGasto = totalGastoTransacoes + totalGastoRecorrentes;

  return {
    totalGasto,
    totalGastoTransacoes,
    totalGastoRecorrentes,
    transacoesCategoria: transacoesDiretas,
    recorrentesAplicadas: transacoesRecorrentes
  };
}

// Função para atualizar o conteúdo das categorias com os dados do novo período
async function updateCategoriesContent(anoAtual, mesAtual) {
  console.log('🔄 updateCategoriesContent - Recalculando dados para período:', { anoAtual, mesAtual });

  try {
    // Obter categorias do orçamento atual
    const currentBudgetId = window.appState?.currentBudget?.id;
    const budgets = window.appState?.budgets || [];
    const isMultiBudget = Array.isArray(budgets) && budgets.length > 1;
    const categorias = (window.appState.categories || []).filter(cat => !currentBudgetId || cat.budgetId === currentBudgetId || (!isMultiBudget && !cat.budgetId));

    // Debug: Log das categorias disponíveis
    console.log('🔍 DEBUG Categorias disponíveis:', categorias.map(c => ({ nome: c.nome, limite: c.limite })));

    // Recalcular gastos por categoria no mês selecionado
    const categoriasComGastos = categorias
      .map(cat => {
        // Usar função auxiliar para calcular gastos corretamente
        const gastos = calcularGastosCategoria(cat, anoAtual, mesAtual);
        const { totalGasto, totalGastoTransacoes, totalGastoRecorrentes, transacoesCategoria, recorrentesAplicadas: _recorrentesAplicadas } = gastos;


        // Debug: Log dos cálculos para esta categoria
        if (cat.nome === 'igor300' || cat.nome === 'salario') {
          console.log('🔍 DEBUG Categoria:', {
            nome: cat.nome,
            transacoesCategoria: transacoesCategoria.length,
            totalGastoTransacoes,
            totalGastoRecorrentes,
            totalGasto,
            limite: cat.limite,
            saldo: limite - totalGasto,
            transacoesDetalhes: transacoesCategoria.map(t => ({ valor: t.valor, descricao: t.descricao }))
          });
        }

        const limite = Number(cat.limite) || 0;
        const saldo = limite - totalGasto;
        // Para receitas: permitir porcentagem > 100% (superar meta é bom)
        // Para despesas: limitar a 100% (exceder limite é sempre ruim na visualização)
        const porcentagem = limite > 0 ?
          (cat.tipo === 'receita' ? (totalGasto / limite) * 100 : Math.min((totalGasto / limite) * 100, 100)) : 0;

        // Determinar cor da barra baseada na porcentagem
        let corBarra = 'bg-green-500';
        if (cat.tipo === 'receita') {
          // Para receitas: verde quando ≥100% (meta atingida), amarelo 80-99%, vermelho <80%
          if (porcentagem >= 100) {
            corBarra = 'bg-green-500';
          } else if (porcentagem >= 80) {
            corBarra = 'bg-yellow-500';
          } else {
            corBarra = 'bg-red-500';
          }
        } else {
          // Para despesas: lógica original (verde baixo, vermelho alto)
          if (porcentagem >= 90) {
            corBarra = 'bg-red-500';
          } else if (porcentagem >= 75) {
            corBarra = 'bg-yellow-500';
          } else if (porcentagem >= 50) {
            corBarra = 'bg-orange-500';
          }
        }

        return {
          ...cat,
          totalGasto,
          totalGastoTransacoes,
          totalGastoRecorrentes,
          limite,
          saldo,
          porcentagem,
          corBarra
        };
      })
      .sort((a, b) => b.totalGasto - a.totalGasto); // Ordenar por gasto (maior para menor)

    // Atualizar elementos na tela com os novos dados
    updateCategoryCards(categoriasComGastos, anoAtual, mesAtual);
    updateCategoryStatistics(categoriasComGastos, anoAtual, mesAtual);

    console.log('✅ Conteúdo das categorias atualizado com sucesso');

  } catch (error) {
    console.error('❌ Erro ao atualizar conteúdo das categorias:', error);
  }
}

// Função para atualizar os cards das categorias
function updateCategoryCards(categoriasComGastos, anoAtual, mesAtual) {
  console.log('🔄 Atualizando cards das categorias...');

  // Atualizar cada card de categoria
  categoriasComGastos.forEach(cat => {
    const cardElement = document.querySelector(`[data-category-id="${cat.id}"]`);
    if (cardElement) {
      // Atualizar valores no card
      const valorElement = cardElement.querySelector('.category-value');
      const porcentagemElement = cardElement.querySelector('.category-percentage');
      const barraElement = cardElement.querySelector('.category-progress-bar');

      if (valorElement) {
        valorElement.textContent = `R$ ${cat.totalGasto.toFixed(2)}`;
      }

      if (porcentagemElement) {
        porcentagemElement.textContent = `${cat.porcentagem.toFixed(1)}%`;
      }

      if (barraElement) {
        // Limitar largura da barra a 100% mesmo quando porcentagem > 100%
        barraElement.style.width = `${Math.min(cat.porcentagem, 100)}%`;
        barraElement.className = `category-progress-bar ${cat.corBarra}`;
      }

      // Atualizar período no cabeçalho
      const periodoElement = cardElement.querySelector('.text-sm.text-gray-500');
      if (periodoElement) {
        const isReceita = cat.tipo === 'receita';
        periodoElement.textContent = `${isReceita ? 'Receita' : 'Despesa'} • ${String(mesAtual).padStart(2,'0')}/${anoAtual}`;
      }

      // Atualizar meta diária se existir
      const metaDiariaElement = cardElement.querySelector('.text-blue-600');
      if (metaDiariaElement && cat.limite > 0 && cat.saldo > 0) {
        // Calcular dias restantes no mês corretamente
        const diasRestantes = calcularDiasRestantesNoMes(anoAtual, mesAtual);
        metaDiariaElement.textContent = `💡 Meta diária: R$ ${(cat.saldo / diasRestantes).toFixed(2)}/dia`;
      }
    }
  });
}

// Função para atualizar estatísticas das categorias
function updateCategoryStatistics(categoriasComGastos, anoAtual, mesAtual) {
  console.log('📊 Atualizando estatísticas para período:', { anoAtual, mesAtual });

  // Calcular categorias em alerta
  const categoriasEmAlerta = categoriasComGastos.filter(cat => cat.limite > 0 && cat.totalGasto > cat.limite).length;

  // Atualizar contador de alertas
  const alertElement = document.querySelector('.categories-alert-count');
  if (alertElement) {
    alertElement.textContent = categoriasEmAlerta;
    alertElement.className = `categories-alert-count ${categoriasEmAlerta > 0 ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'}`;
  }

  // Atualizar texto do período
  const periodElements = document.querySelectorAll('[data-period-text]');
  periodElements.forEach(el => {
    el.textContent = `${String(mesAtual).padStart(2,'0')}/${anoAtual}`;
  });
}

// Função para renderizar categorias (movida do app.js) - BOTÕES ATUALIZADOS v4.54.0
export async function renderCategories() {
  console.log('🚀 renderCategories chamada - INÍCIO');
  console.log('📅 Período atual:', getSelectedPeriod());
  // Suprimir rajadas de chamadas muito próximas
  try {
    const now = Date.now();
    if (window.__lastCategoriesRender && (now - window.__lastCategoriesRender) < 300) {
      console.log('⏱️ renderCategories chamado muito próximo do anterior, pulando...');
      return;
    }
    window.__lastCategoriesRender = now;
  } catch {}
  // Garantir dados necessários disponíveis
  await loadTransactions();
  await loadRecorrentes();
  const content = document.getElementById('app-content');

  // Calcular estatísticas das categorias
  const currentBudgetId = window.appState?.currentBudget?.id;
  const budgets = window.appState?.budgets || [];
  const isMultiBudget = Array.isArray(budgets) && budgets.length > 1;
  const categorias = (window.appState.categories || []).filter(cat => !currentBudgetId || cat.budgetId === currentBudgetId || (!isMultiBudget && !cat.budgetId));
  const totalCategorias = categorias.length;
  const categoriasComLimite = categorias.filter(cat => cat.limite > 0).length;
  const categoriasReceita = categorias.filter(cat => cat.tipo === 'receita').length;
  const categoriasDespesa = categorias.filter(cat => cat.tipo === 'despesa').length;

  // Calcular gastos por categoria no mês selecionado
  const { year: anoAtual, month: mesAtual } = getSelectedPeriod();
  console.log('📅 Período selecionado para categorias:', { anoAtual, mesAtual });

  const categoriasComGastos = window.appState.categories
    .map(cat => {
      // Filtrar transações da categoria no mês atual (incluindo recorrentes aplicadas)
      const transacoesCategoria = window.appState.transactions.filter(t => {
        // Tratar Firestore Timestamp
        let transacaoData;
        if (
          t.createdAt &&
          typeof t.createdAt === 'object' &&
          t.createdAt.seconds
        ) {
          // É um Firestore Timestamp
          transacaoData = new Date(t.createdAt.seconds * 1000);
        } else {
          // É uma string ou outro formato
          transacaoData = new Date(t.createdAt);
        }

        const transacaoAno = transacaoData.getFullYear();
        const transacaoMes = transacaoData.getMonth() + 1;

        return (
          t.categoriaId === cat.id &&
          t.tipo === cat.tipo && // Usar o tipo da categoria (receita ou despesa)
          transacaoAno === anoAtual &&
          transacaoMes === mesAtual
        );
      });

      // Calcular total gasto das transações diretas
      const totalGastoTransacoes = transacoesCategoria.reduce(
        (sum, t) => sum + parseFloat(t.valor),
        0
      );

      // Calcular total gasto das recorrentes aplicadas neste mês
      const recorrentesAplicadas = window.appState.recorrentes.filter(
        r => r.categoriaId === cat.id && r.ativa === true
      );

      // Verificar quais recorrentes foram aplicadas neste mês
      let totalGastoRecorrentes = 0;
      recorrentesAplicadas.forEach(rec => {
        const transacoesRecorrente = window.appState.transactions.filter(
          t =>
            t.recorrenteId === rec.id &&
            new Date(t.createdAt).getFullYear() === anoAtual &&
            new Date(t.createdAt).getMonth() + 1 === mesAtual
        );

        if (transacoesRecorrente.length > 0) {
          totalGastoRecorrentes += parseFloat(rec.valor);
        }
      });

      // Total geral (transações diretas + transações de recorrentes)
      const totalGasto = totalGastoTransacoes + totalGastoRecorrentes;

      // Calcular limite (se existir)
      const limite = cat.limite ? parseFloat(cat.limite) : 0;

      // Debug: Log dos cálculos para esta categoria
      if (cat.nome === 'igor300' || cat.nome === 'salario') {
        console.log('🔍 DEBUG Categoria:', {
          nome: cat.nome,
          transacoesCategoria: transacoesCategoria.length,
          totalGastoTransacoes,
          totalGastoRecorrentes,
          totalGasto,
          limite: cat.limite,
          saldo: limite - totalGasto,
          transacoesDetalhes: transacoesCategoria.map(t => ({ valor: t.valor, descricao: t.descricao }))
        });
      }

      // Calcular saldo (para receitas: quanto falta para atingir o limite)
      const saldo =
        cat.tipo === 'receita' ? limite - totalGasto : limite - totalGasto;

      // Calcular porcentagem de uso
      const porcentagem =
        limite > 0 ? Math.min((totalGasto / limite) * 100, 100) : 0;

      // Determinar cor da barra baseada na porcentagem
      let corBarra = 'bg-green-500';
      if (porcentagem >= 90) {
        corBarra = 'bg-red-500';
      } else if (porcentagem >= 75) {
        corBarra = 'bg-yellow-500';
      } else if (porcentagem >= 50) {
        corBarra = 'bg-orange-500';
      }

      return {
        ...cat,
        totalGasto,
        totalGastoTransacoes,
        totalGastoRecorrentes,
        limite,
        saldo,
        porcentagem,
        corBarra
      };
    })
    .sort((a, b) => b.totalGasto - a.totalGasto); // Ordenar por gasto (maior para menor)

  // Calcular categorias em alerta (limite excedido)
  const categoriasEmAlerta = categoriasComGastos.filter(cat => cat.limite > 0 && cat.totalGasto > cat.limite).length;

  // Totais agregados (Despesas): Limite total, Gasto do mês e Saldo
  const totalLimiteDespesas = (categorias
    .filter(c => c.tipo === 'despesa' && Number(c.limite) > 0)
    .reduce((sum, c) => sum + (Number(c.limite) || 0), 0)) || 0;
  const totalGastoDespesas = (categoriasComGastos
    .filter(c => c.tipo === 'despesa')
    .reduce((sum, c) => sum + (Number(c.totalGasto) || 0), 0)) || 0;
  const saldoDespesas = totalLimiteDespesas - totalGastoDespesas;

  // Totais agregados (Receitas): Meta total, Recebido do mês e Saldo
  const totalMetaReceitas = (categorias
    .filter(c => c.tipo === 'receita' && Number(c.limite) > 0)
    .reduce((sum, c) => sum + (Number(c.limite) || 0), 0)) || 0;
  const totalRecebidoReceitas = (categoriasComGastos
    .filter(c => c.tipo === 'receita')
    .reduce((sum, c) => sum + (Number(c.totalGasto) || 0), 0)) || 0;
  // Para receitas: saldo positivo = excesso (bom), saldo negativo = déficit (ruim)
  const saldoReceitas = totalRecebidoReceitas - totalMetaReceitas;

  // Seletor de mês/ano
  const selYear = window.appState?.selectedYear || new Date().getFullYear();
  const selMonth = window.appState?.selectedMonth || (new Date().getMonth() + 1);

  content.innerHTML = `
    <div class="tab-container">
      <div class="tab-header">
        <div class="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm border border-gray-200 dark:border-gray-600">
          <div class="flex items-center justify-between w-full gap-4">
            <div class="flex items-center gap-3">
              <div class="flex items-center gap-2">
                <div class="w-8 h-8 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center">
                  <span class="text-white text-sm">📂</span>
                </div>
                <div>
                  <h2 class="text-gray-800 dark:text-white font-semibold text-base">Categorias</h2>
                  <div class="flex items-center gap-1">
                    <span class="text-cyan-600 dark:text-cyan-400 text-xs">${categorias.length} categorias</span>
                  </div>
                </div>
              </div>
            </div>
            <div id="cat-period-indicator"></div>
          </div>
        </div>
      </div>
      <div class="tab-content">
        <div class="content-spacing">
          <!-- Indicador de período padronizado movido para o cabeçalho -->
          
          <!-- ========== SEÇÃO 1: RESUMO ANALÍTICO ========== -->
          <div class="mb-12">
            <div class="flex items-center gap-2 mb-4">
              <div class="w-1 h-6 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full"></div>
              <h2 class="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100">📊 Visão Geral</h2>
            </div>
            
            <div class="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 rounded-2xl shadow-lg border border-blue-200 dark:border-gray-600 p-4 mb-6">
              <!-- Header Compacto -->
              <div class="flex items-center justify-between mb-4 gap-4">
                <div>
                  <h3 class="text-lg font-bold text-gray-800 dark:text-gray-200 flex items-center gap-2">
                    <span class="text-xl">📊</span>
                    Controle de Categorias
                  </h3>
                  <p class="text-sm text-gray-600 dark:text-gray-400">${totalCategorias} categorias • <span data-period-text>${String(selMonth).padStart(2,'0')}/${selYear}</span></p>
                </div>
                <div class="text-right">
                  <div class="text-lg font-bold categories-alert-count ${categoriasEmAlerta > 0 ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'}">
                    ${categoriasEmAlerta}
                  </div>
                  <p class="text-xs text-gray-500 dark:text-gray-400">${categoriasEmAlerta > 0 ? 'Alertas' : 'OK'}</p>
                </div>
              </div>
              
              <!-- Métricas Compactas -->
              <div class="grid grid-cols-4 gap-3 mb-4">
                <div class="bg-white dark:bg-gray-800 rounded-lg p-3 text-center shadow-sm border border-gray-200 dark:border-gray-600">
                  <div class="text-lg mb-1">📂</div>
                  <div class="text-lg font-bold text-gray-800 dark:text-gray-200">${totalCategorias}</div>
                  <div class="text-xs text-gray-600 dark:text-gray-400">Total</div>
                </div>
                
                <div class="bg-white dark:bg-gray-800 rounded-lg p-3 text-center shadow-sm border border-gray-200 dark:border-gray-600">
                  <div class="text-lg mb-1">🎯</div>
                  <div class="text-lg font-bold text-blue-600 dark:text-blue-400">${categoriasComLimite}</div>
                  <div class="text-xs text-gray-600 dark:text-gray-400">Limite</div>
                </div>
                
                <div class="bg-white dark:bg-gray-800 rounded-lg p-3 text-center shadow-sm border border-gray-200 dark:border-gray-600">
                  <div class="text-lg mb-1">💚</div>
                  <div class="text-lg font-bold text-green-600 dark:text-green-400">${categoriasReceita}</div>
                  <div class="text-xs text-gray-600 dark:text-gray-400">Receitas</div>
                </div>
                
                <div class="bg-white dark:bg-gray-800 rounded-lg p-3 text-center shadow-sm border border-gray-200 dark:border-gray-600">
                  <div class="text-lg mb-1">💸</div>
                  <div class="text-lg font-bold text-red-600 dark:text-red-400">${categoriasDespesa}</div>
                  <div class="text-xs text-gray-600 dark:text-gray-400">Despesas</div>
                </div>
              </div>

              <!-- Resumo Financeiro Compacto -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <!-- Despesas -->
                <div class="bg-white dark:bg-gray-800 rounded-lg p-3 shadow-sm border border-gray-200 dark:border-gray-600">
                  <h5 class="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-1">
                    <span>💸</span>
                    Despesas
                  </h5>
                  <div class="space-y-1">
                    <div class="flex justify-between text-xs">
                      <span class="text-gray-600 dark:text-gray-400">Limite:</span>
                      <span class="font-medium text-gray-800 dark:text-gray-200">R$ ${totalLimiteDespesas.toFixed(2)}</span>
                    </div>
                    <div class="flex justify-between text-xs">
                      <span class="text-gray-600 dark:text-gray-400">Gasto:</span>
                      <span class="font-medium text-red-600 dark:text-red-400">R$ ${totalGastoDespesas.toFixed(2)}</span>
                    </div>
                    <div class="flex justify-between text-xs border-t border-gray-200 dark:border-gray-600 pt-1">
                      <span class="text-gray-600 dark:text-gray-400">${saldoDespesas < 0 ? 'Excesso:' : 'Restante:'}</span>
                      <span class="font-bold ${saldoDespesas < 0 ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'}">
                        R$ ${Math.abs(saldoDespesas).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
                
                <!-- Receitas -->
                <div class="bg-white dark:bg-gray-800 rounded-lg p-3 shadow-sm border border-gray-200 dark:border-gray-600">
                  <h5 class="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-1">
                    <span>💚</span>
                    Receitas
                  </h5>
                  <div class="space-y-1">
                    <div class="flex justify-between text-xs">
                      <span class="text-gray-600 dark:text-gray-400">Meta:</span>
                      <span class="font-medium text-gray-800 dark:text-gray-200">R$ ${totalMetaReceitas.toFixed(2)}</span>
                    </div>
                    <div class="flex justify-between text-xs">
                      <span class="text-gray-600 dark:text-gray-400">Recebido:</span>
                      <span class="font-medium text-green-600 dark:text-green-400">R$ ${totalRecebidoReceitas.toFixed(2)}</span>
                    </div>
                    <div class="flex justify-between text-xs border-t border-gray-200 dark:border-gray-600 pt-1">
                      <span class="text-gray-600 dark:text-gray-400">${saldoReceitas >= 0 ? 'Excesso:' : 'Déficit:'}</span>
                      <span class="font-bold ${saldoReceitas >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}">
                        R$ ${Math.abs(saldoReceitas).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- ========== SEÇÃO 2: AÇÕES E FILTROS ========== -->
          <div class="mb-12">
            <div class="flex items-center gap-2 mb-4">
              <div class="w-1 h-6 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></div>
              <h2 class="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100">🔧 Ações & Filtros</h2>
            </div>
            
            <div class="u-card bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
              <!-- Header -->
              <div class="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-800 p-4 border-b border-gray-200 dark:border-gray-700">
                <div class="flex flex-wrap justify-between items-center gap-2">
                  <h3 class="text-lg font-bold text-gray-900 dark:text-gray-100">Gerenciar Categorias</h3>
                  <div class="flex gap-2 flex-wrap">
                    <button onclick="window.migrarTransacoesAntigas()" class="btn btn-outline btn-sm">
                      🔄 Migrar
          </button>
                    <button onclick="window.corrigirTipoCategoria()" class="btn btn-outline btn-sm">
                      🔧 Corrigir
          </button>
                    <button id="add-category-btn" class="btn btn-primary btn-sm">
                      + Nova Categoria
          </button>
        </div>
      </div>
              </div>
              
          <!-- Filtro de pesquisa -->
              <div class="p-4">
            <div class="relative">
              <input 
                type="text" 
                id="category-search" 
                    placeholder="🔍 Pesquisar por nome, tipo ou limite..." 
                    class="u-input w-full pl-12"
              />
                  <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <span class="text-gray-400 text-lg">🔍</span>
              </div>
            </div>
            <div id="category-search-results" class="mt-2 text-sm text-gray-600 dark:text-gray-400 hidden">
              <span id="category-search-count">0</span> categoria(s) encontrada(s)
                </div>
              </div>
            </div>
          </div>
          
          <!-- ========== SEÇÃO 3: GRID DE CATEGORIAS ========== -->
          <div class="mb-12" id="categories-grid">
            <div class="flex items-center gap-2 mb-4">
              <div class="w-1 h-6 bg-gradient-to-b from-green-500 to-teal-500 rounded-full"></div>
              <h2 class="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100">📋 Todas as Categorias</h2>
              </div>
            
${categorias.length === 0 ? `
              <div class="u-card bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                <div class="text-center py-12">
                  <div class="text-6xl mb-4">📂</div>
                  <div class="text-xl font-semibold text-gray-800 dark:text-white mb-2">Nenhuma categoria encontrada</div>
                  <div class="text-gray-600 dark:text-gray-400 mb-4">Crie sua primeira categoria para organizar suas finanças</div>
                  <button onclick="window.showAddCategoryModal()" class="btn btn-primary w-full">
                    📂 Criar Primeira Categoria
                  </button>
                  </div>
                  </div>
            ` : `
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                ${categoriasComGastos.map(cat => {
    const isReceita = cat.tipo === 'receita';
    const temLimite = cat.limite > 0;
    // Para receitas: "exceder" é bom (atingiu meta), para despesas é ruim (gastou demais)
    const excedeuLimite = temLimite && cat.totalGasto > cat.limite;
    const problematicoReceita = isReceita && temLimite && cat.totalGasto < cat.limite * 0.8; // Receita abaixo de 80% da meta
    const problematicoDespesa = !isReceita && excedeuLimite; // Despesa que excedeu limite

    return `
                    <div class="u-card bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-2xl transition-all duration-300 group ${problematicoDespesa ? 'ring-2 ring-red-200 dark:ring-red-800' : problematicoReceita ? 'ring-2 ring-yellow-200 dark:ring-yellow-800' : ''}" data-category-id="${cat.id}">
                      <!-- Header da Categoria -->
                      <div class="bg-gradient-to-r ${isReceita ? 'from-green-50 to-emerald-50 dark:from-gray-800 dark:to-gray-800' : 'from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-800'} p-4 border-b border-gray-200 dark:border-gray-700">
                        <div class="flex items-center justify-between">
                          <div class="flex items-center gap-3">
                            <div class="w-12 h-12 rounded-full flex items-center justify-center text-2xl" style="background-color: ${cat.cor || '#4F46E5'}20; color: ${cat.cor || '#4F46E5'}">
                              ${isReceita ? '💰' : '💸'}
                    </div>
                            <div>
                              <h3 class="font-bold text-gray-900 dark:text-gray-100 truncate">${cat.nome}</h3>
                              <p class="text-sm text-gray-500 dark:text-gray-400">${isReceita ? 'Receita' : 'Despesa'} • ${String(mesAtual).padStart(2,'0')}/${anoAtual}</p>
                            </div>
                          </div>
                          ${problematicoDespesa ? '<div class="text-2xl">🚨</div>' : problematicoReceita ? '<div class="text-2xl">⚠️</div>' : isReceita && cat.porcentagem >= 100 ? '<div class="text-2xl">🎉</div>' : temLimite && cat.porcentagem >= 90 ? '<div class="text-2xl">⚠️</div>' : ''}
                        </div>
                  </div>
                      
                      <!-- Conteúdo da Categoria -->
                      <div class="p-4">
                        ${temLimite ? `
                          <div class="mb-4">
                            <div class="flex justify-between items-center mb-2">
                              <span class="text-sm font-medium text-gray-700 dark:text-gray-300">
                                ${isReceita ? '🎯 Meta de Receita' : '📊 Limite de Gasto'}: R$ ${cat.limite.toFixed(2)}
                              </span>
                              <span class="text-sm font-bold category-percentage ${isReceita ? (cat.porcentagem >= 100 ? 'text-green-600 dark:text-green-400' : cat.porcentagem >= 80 ? 'text-yellow-600 dark:text-yellow-400' : 'text-red-600 dark:text-red-400') : (problematicoDespesa ? 'text-red-600 dark:text-red-400' : cat.porcentagem >= 90 ? 'text-yellow-600 dark:text-yellow-400' : 'text-green-600 dark:text-green-400')}">
                                ${cat.porcentagem.toFixed(1)}%
                              </span>
                            </div>
                            
                            <!-- Barra de progresso melhorada -->
                            <div class="relative">
                              <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                                <div class="h-3 rounded-full category-progress-bar ${cat.corBarra} transition-all duration-500 ease-out relative" style="width: ${Math.min(cat.porcentagem, 100)}%">
                                  ${isReceita && cat.porcentagem >= 100 ? `
                                    <div class="absolute inset-0 bg-gradient-to-r from-green-400 to-green-600 animate-pulse"></div>
                                  ` : ''}
                            </div>
                            </div>
                              
                              <!-- Indicador de 100% para receitas -->
                              ${isReceita ? `
                                <div class="absolute top-0 left-0 w-full h-3 pointer-events-none">
                                  <div class="absolute top-0 right-0 w-0.5 h-3 bg-green-500 opacity-50"></div>
                                </div>
                              ` : ''}
                            </div>
                            
                            <div class="flex justify-between items-center mt-2 text-xs">
                              <div class="flex items-center gap-1">
                                <span class="text-gray-600 dark:text-gray-400">${isReceita ? 'Recebido' : 'Gasto'}:</span>
                                <span class="font-medium text-gray-700 dark:text-gray-300">R$ ${cat.totalGasto.toFixed(2)}</span>
                              </div>
                              <div class="flex items-center gap-1">
                                <span class="text-gray-600 dark:text-gray-400">${isReceita ? 'Meta' : 'Limite'}:</span>
                                <span class="font-medium text-gray-700 dark:text-gray-300">R$ ${cat.limite.toFixed(2)}</span>
                              </div>
                            </div>
                            
                            ${isReceita && cat.porcentagem >= 100 ? `
                              <div class="mt-2 text-center">
                                <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                                  🎉 Meta superada em ${(cat.porcentagem - 100).toFixed(1)}%!
                                </span>
                              </div>
                            ` : ''}
                          </div>
                          
                          <div class="space-y-2 mb-4">
                            ${cat.totalGasto > 0 ? `
                              <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-3 border border-gray-200 dark:border-gray-600">
                                <div class="flex justify-between items-center mb-2">
                                  <span class="text-sm font-medium text-gray-700 dark:text-gray-300">${cat.tipo === 'receita' ? '💰 Receita do mês' : '💸 Gasto do mês'}:</span>
                                  <span class="font-bold text-lg category-value ${cat.tipo === 'receita' ? 'text-green-600 dark:text-green-400' : 'text-gray-900 dark:text-gray-100'}">R$ ${cat.totalGasto.toFixed(2)}</span>
                              </div>
                                
                                <div class="space-y-1">
                                ${cat.totalGastoTransacoes > 0 && cat.totalGastoRecorrentes > 0 ? `
                                    <div class="flex justify-between text-xs">
                                      <span class="text-gray-600 dark:text-gray-400">• Transações:</span>
                                      <span class="font-medium text-gray-700 dark:text-gray-300">R$ ${cat.totalGastoTransacoes.toFixed(2)}</span>
                                    </div>
                                    <div class="flex justify-between text-xs">
                                      <span class="text-gray-600 dark:text-gray-400">• Recorrentes:</span>
                                      <span class="font-medium text-gray-700 dark:text-gray-300">R$ ${cat.totalGastoRecorrentes.toFixed(2)}</span>
                                    </div>
                                ` : cat.totalGastoTransacoes > 0 ? `
                                    <div class="flex justify-between text-xs">
                                      <span class="text-gray-600 dark:text-gray-400">• Transações:</span>
                                      <span class="font-medium text-gray-700 dark:text-gray-300">R$ ${cat.totalGastoTransacoes.toFixed(2)}</span>
                                    </div>
                                  ` : `
                                    <div class="flex justify-between text-xs">
                                      <span class="text-gray-600 dark:text-gray-400">• Recorrentes:</span>
                                      <span class="font-medium text-gray-700 dark:text-gray-300">R$ ${cat.totalGastoRecorrentes.toFixed(2)}</span>
                                    </div>
                                  `}
                                  
                                  ${isReceita && temLimite ? `
                                    <div class="mt-2 pt-2 border-t border-gray-200 dark:border-gray-600">
                                      <div class="flex justify-between text-xs">
                                        <span class="text-gray-600 dark:text-gray-400">📈 Progresso da meta:</span>
                                        <span class="font-medium ${cat.porcentagem >= 100 ? 'text-green-600 dark:text-green-400' : cat.porcentagem >= 80 ? 'text-yellow-600 dark:text-yellow-400' : 'text-red-600 dark:text-red-400'}">
                                          ${cat.porcentagem.toFixed(1)}%
                                        </span>
                                      </div>
                                    </div>
                                  ` : ''}
                                </div>
                              </div>
                            ` : `
                              <div class="text-center text-gray-500 dark:text-gray-400 py-4">
                                <div class="text-2xl mb-2">${isReceita ? '💰' : '💸'}</div>
                                <span class="text-sm">Nenhum ${cat.tipo === 'receita' ? 'receita' : 'gasto'} este mês</span>
                                <div class="text-xs mt-1">Adicione transações para começar</div>
                              </div>
                            `}
                            
                            ${temLimite ? `
                              <div class="space-y-2">
                                ${isReceita ? `
                                  <!-- Informações específicas para RECEITA -->
                                  <div class="bg-green-50 dark:bg-green-900/20 rounded-lg p-3 border border-green-200 dark:border-green-800">
                                    <div class="flex justify-between items-center mb-2">
                                      <span class="text-sm font-medium text-green-800 dark:text-green-200">Status da Meta</span>
                                      <span class="text-sm font-bold ${cat.porcentagem >= 100 ? 'text-green-600 dark:text-green-400' : cat.porcentagem >= 80 ? 'text-yellow-600 dark:text-yellow-400' : 'text-red-600 dark:text-red-400'}">
                                        ${cat.porcentagem >= 100 ? '🎉 Meta Atingida!' : cat.porcentagem >= 80 ? '⚡ Quase lá!' : '📈 Em andamento'}
                                      </span>
                                    </div>
                                    
                                    ${cat.totalGasto >= cat.limite ? `
                                      <div class="text-sm text-green-700 dark:text-green-300">
                                        <div class="flex justify-between">
                                          <span>✅ Meta superada:</span>
                                          <span class="font-bold">+R$ ${Math.abs(cat.saldo).toFixed(2)}</span>
                                        </div>
                                        <div class="text-xs text-green-600 dark:text-green-400 mt-1">
                                          🚀 Excelente! Você ultrapassou sua meta de receita
                                        </div>
                                      </div>
                                    ` : `
                                      <div class="text-sm text-gray-700 dark:text-gray-300">
                                        <div class="flex justify-between">
                                          <span>📊 Falta para meta:</span>
                                          <span class="font-bold text-orange-600 dark:text-orange-400">R$ ${Math.abs(cat.saldo).toFixed(2)}</span>
                                        </div>
                                        <div class="text-xs text-gray-600 dark:text-gray-400 mt-1">
                                          ${cat.porcentagem >= 80 ? 'Quase lá! Faltam apenas alguns reais' : 
                                            cat.porcentagem >= 50 ? 'Bom progresso! Continue assim' : 
                                            'Ainda há tempo para atingir a meta'}
                                        </div>
                                      </div>
                                    `}
                                    
                                    <div class="mt-2 pt-2 border-t border-green-200 dark:border-green-700">
                                      <div class="flex justify-between text-xs">
                                        <span class="text-green-600 dark:text-green-400">💡 Meta diária:</span>
                                        <span class="font-medium text-green-700 dark:text-green-300">
                                          R$ ${(cat.saldo / calcularDiasRestantesNoMes(anoAtual, mesAtual)).toFixed(2)}/dia
                                        </span>
                                      </div>
                                      <div class="flex justify-between text-xs mt-1">
                                        <span class="text-green-600 dark:text-green-400">📅 Dias restantes:</span>
                                        <span class="font-medium text-green-700 dark:text-green-300">
                                          ${calcularDiasRestantesNoMes(anoAtual, mesAtual)} dias
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                ` : `
                                  <!-- Informações para DESPESA -->
                              <div class="text-xs text-gray-500 dark:text-gray-400">
                                    ${problematicoDespesa ? `🚨 Excedeu em R$ ${Math.abs(cat.saldo).toFixed(2)}` : `Restante: R$ ${cat.saldo.toFixed(2)}`}
                              </div>
                              <div class="text-xs text-blue-600 dark:text-blue-400 font-medium">
                                💡 Meta diária: R$ ${(cat.saldo / calcularDiasRestantesNoMes(anoAtual, mesAtual)).toFixed(2)}/dia
                                  </div>
                                `}
                              </div>
                            ` : ''}
                          </div>
                        ` : `
                          <div class="space-y-2 mb-4">
                            <div class="flex justify-between items-center">
                              <span class="text-gray-600 dark:text-gray-400">${cat.tipo === 'receita' ? 'Receita' : 'Gasto'} do mês:</span>
                              <span class="font-medium category-value ${cat.tipo === 'receita' ? 'text-green-600' : 'text-gray-900 dark:text-gray-100'}">R$ ${cat.totalGasto.toFixed(2)}</span>
                            </div>
                            ${
  cat.totalGasto > 0
    ? `
                                  <div class="text-xs text-gray-500 dark:text-gray-400 pl-2">
                                    • ${cat.tipo === 'receita' ? 'Receitas' : 'Transações'}: R$ ${cat.totalGastoTransacoes.toFixed(2)}
                                    ${cat.totalGastoRecorrentes > 0 ? `<br>• Recorrentes: R$ ${cat.totalGastoRecorrentes.toFixed(2)}` : ''}
                                  </div>
                                `
    : ''
}
                            <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">Sem limite definido</p>
                          </div>
                        `}
                        
                        <div class="flex items-center justify-end gap-2 mt-4">
                          <button onclick="editCategory('${cat.id}')" class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/40 border border-blue-200 dark:border-blue-800 transition-all duration-200" title="Editar categoria">
                            <span>✏️</span>
                            <span>Editar</span>
                          </button>
                          <button onclick="showCategoryHistory('${cat.id}')" class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-purple-900/20 hover:bg-purple-100 dark:hover:bg-purple-900/40 border border-purple-200 dark:border-purple-800 transition-all duration-200" title="Ver histórico">
                            <span>📊</span>
                            <span>Histórico</span>
                          </button>
                          <button onclick="window.deleteCategoryWithConfirmation('${cat.id}', '${cat.nome}')" class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-red-700 dark:text-red-300 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/40 border border-red-200 dark:border-red-800 transition-all duration-200" title="Excluir categoria">
                            <span>🗑️</span>
                            <span>Excluir</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  `;
  }).join('')}
              </div>
            `}
          </div>
        </div>
      </div>
    </div>
  `;

  // Empty state quando não há categorias
  try {
    const wrap = document.querySelector('.content-spacing');
    if (wrap && totalCategorias === 0) {
      const empty = document.createElement('div');
      empty.className = 'empty-state mt-2';
      empty.innerHTML = '<div class="empty-icon">📁</div><div class="empty-text">Nenhuma categoria cadastrada</div><div class="mt-2"><button class="btn btn-primary w-full" onclick="window.showAddCategoryModal && window.showAddCategoryModal()">Criar categoria</button></div>';
      wrap.appendChild(empty);
    }
  } catch {}

  // Configurar botões da tela de categorias
  setTimeout(() => {
    try { setupCategoryButtons(); } catch (e) { console.warn('setupCategoryButtons falhou:', e); }
    // Bind seguro para o botão de adicionar
    try {
      const addBtn = document.getElementById('add-category-btn');
      if (addBtn) addBtn.onclick = () => window.showAddCategoryModal?.();
    } catch {}
  }, 100);

  // Configurar filtro de pesquisa
  setupCategorySearch();

  // Removido indicador interativo de período nesta aba; o controle existe apenas no Dashboard.

  // Re-render quando o período for alterado em outras abas
  try {
    if (!window.__catPeriodListenerBound) {
      window.__catPeriodListenerBound = true;
      eventBus.on('period:changed', (p) => queueMicrotask(() => {
        const hh = (window.location.hash || '').split('?')[0];
        if (hh === '#/categories') {
          // Garantir hash atualizado quando mudança vier de outra aba
          try {
            const y = (p && p.year) || getSelectedPeriod().year;
            const m = (p && p.month) || getSelectedPeriod().month;
            const ym = `${y}-${String(m).padStart(2, '0')}`;
            const url = new URL(window.location.href);
            url.hash = `${hh}?ym=${ym}`;
            history.replaceState(null, '', url.toString());
          } catch {}
          console.log('🔄 Período mudou, verificando se deve re-renderizar...');
          // Em vez de re-renderizar toda a página, apenas atualizar os dados
          try {
            const content = document.getElementById('app-content');
            console.log('🔍 Conteúdo da página atual:', content ? content.innerHTML.substring(0, 200) + '...' : 'null');

            // Verificação mais robusta - procurar por múltiplos indicadores da página de categorias
            const isCategoriesPage = content && (
              content.innerHTML.includes('📂 Categorias') ||
              content.innerHTML.includes('cat-period-indicator') ||
              content.innerHTML.includes('categories-page') ||
              content.querySelector('#cat-period-indicator') !== null
            );

            if (isCategoriesPage) {
              console.log('✅ Página de categorias já carregada, ATUALIZANDO dados do período');
              console.log('🎯 Atualizando apenas os dados sem re-renderizar header');
              // Atualizar apenas os dados sem re-renderizar toda a página
              updateCategoriesData();
              return;
            } else {
              console.log('⚠️ Página de categorias não encontrada, re-renderizando...');
            }
          } catch (e) {
            console.warn('Erro ao verificar página atual:', e);
          }
          console.log('🚀 Chamando renderCategories()...');
          renderCategories();
        }
      }));
    }
  } catch {}

  renderFAB();
  // Remover renderBottomNav daqui - deve ser chamado apenas pelo router
  // renderBottomNav('/categories');

  // Fallbacks globais para ações da página de categorias (evitar undefined)
  try {
    if (typeof window.deleteCategoryWithConfirmation !== 'function') {
      window.deleteCategoryWithConfirmation = async function(categoryId, categoryName = 'categoria') {
        try {
          const name = categoryName || 'categoria';

          // Tentar usar o modal moderno de confirmação
          let proceed = false;
          if (typeof window.confirmDelete === 'function') {
            proceed = await window.confirmDelete(name, 'categoria');
          } else if (typeof window.showConfirmationModal === 'function') {
            proceed = await new Promise(resolve => {
              window.showConfirmationModal({
                title: 'Excluir Categoria',
                message: `Tem certeza que deseja excluir "${name}"? Esta ação não pode ser desfeita.`,
                confirmText: 'Sim, excluir',
                confirmColor: 'bg-red-500 hover:bg-red-600',
                onConfirm: () => resolve(true),
                onCancel: () => resolve(false)
              });
            });
          } else {
            // Fallback para confirm nativo
            proceed = confirm(`Excluir "${name}"? Esta ação não pode ser desfeita.`);
          }

          if (!proceed) return;

          const svc = await import('./service.js');
          await svc.deleteCategory(categoryId);
          try { window.Snackbar?.show?.('Categoria excluída', 'success'); } catch {}
          try { await renderCategories(); } catch {}
        } catch (e) {
          console.error('Falha ao excluir categoria:', e);
          try { window.Snackbar?.show?.('Erro ao excluir categoria', 'error'); } catch {}
        }
      };
    }

    if (typeof window.editCategory !== 'function') {
      window.editCategory = function(categoryId) {
        console.log('🔧 editCategory chamada com ID:', categoryId);
        try {
          const cat = window.appState?.categories?.find(c => c.id === categoryId);
          console.log('🔧 Categoria encontrada:', cat);
          console.log('🔧 window.showAddCategoryModal disponível:', typeof window.showAddCategoryModal);

          if (cat) {
            if (window.showAddCategoryModal) {
              console.log('✅ Chamando showAddCategoryModal');
              window.showAddCategoryModal(cat);
            } else {
              console.log('🔄 showAddCategoryModal não disponível, tentando carregar...');
              // Tentar carregar o modal dinamicamente
              import('@js/showAddCategoryModal.js').then(module => {
                console.log('✅ Modal carregado dinamicamente');
                if (module.default) {
                  window.showAddCategoryModal = module.default;
                  module.default(cat);
                }
              }).catch(error => {
                console.error('❌ Falha ao carregar modal:', error);
                if (window.Snackbar) {
                  window.Snackbar.show('Erro ao abrir modal de edição', 'error');
                }
              });
            }
          } else {
            console.error('❌ Categoria não encontrada:', categoryId);
            if (window.Snackbar) {
              window.Snackbar.show('Categoria não encontrada', 'error');
            }
          }
        } catch (e) {
          console.warn('editCategory (fallback) falhou:', e);
          if (window.Snackbar) {
            window.Snackbar.show('Erro ao editar categoria', 'error');
          }
        }
      };
    }

    if (typeof window.showCategoryHistory !== 'function') {
      window.showCategoryHistory = function(categoryId) {
        try {
          // Histórico filtrado pelo período atual, com parsing robusto de datas
          const { year, month } = getSelectedPeriod();
          const cat = window.appState?.categories?.find(c => c.id === categoryId);
          const title = `Histórico - ${cat?.nome || categoryId}`;

          const parseDate = (val) => {
            if (!val) return null;
            if (typeof val?.toDate === 'function') return val.toDate();
            if (typeof val === 'object' && val?.seconds) return new Date(val.seconds * 1000);
            const d = new Date(val);
            return isNaN(d.getTime()) ? null : d;
          };

          const fmtCurrency = (n) => {
            const v = Number.parseFloat(n || 0) || 0;
            return v.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
          };

          const all = (window.appState?.transactions || []).filter(t => t.categoriaId === categoryId);
          const txs = all.filter(t => {
            const d = parseDate(t.createdAt);
            if (!d) return false;
            return d.getFullYear() === year && (d.getMonth() + 1) === month;
          });

          const items = txs
            .sort((a, b) => {
              const da = parseDate(a.createdAt) || 0;
              const db = parseDate(b.createdAt) || 0;
              return db - da;
            })
            .slice(0, 100)
            .map(t => {
              const d = parseDate(t.createdAt);
              const dateTxt = d ? d.toLocaleDateString('pt-BR') : '-';
              const sign = t.tipo === 'receita' ? '+' : '-';
              const desc = (t.descricao && String(t.descricao).trim()) || '(Sem descrição)';
              const color = t.tipo === 'receita' ? 'text-green-600' : 'text-red-600';
              return `
                <div class=\"flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700\">
                  <div class=\"min-w-0\">
                    <div class=\"font-medium text-gray-900 dark:text-gray-100 truncate\">${desc}</div>
                    <div class=\"text-xs text-gray-500 dark:text-gray-400\">${dateTxt}</div>
                  </div>
                  <div class=\"text-right font-medium ${color}\">${sign} R$ ${fmtCurrency(t.valor)}</div>
                </div>`;
            })
            .join('') || '<div class=\"text-sm text-gray-500\">Sem transações neste período</div>';

          const html = `<div class=\"max-h-96 overflow-auto\">${items}</div>`;
          eventBus.emit('modal:show', { title, content: html });
        } catch (e) { console.warn('showCategoryHistory (fallback) falhou:', e); }
      };
    }

    if (typeof window.migrarTransacoesAntigas !== 'function') {
      window.migrarTransacoesAntigas = function() {
        // Placeholder não destrutivo
        try { window.Snackbar?.show?.('Nada para migrar', 'info'); } catch {}
      };
    }

    if (typeof window.corrigirTipoCategoria !== 'function') {
      window.corrigirTipoCategoria = function() {
        // Placeholder simples
        try { window.Snackbar?.show?.('Tipos de categorias verificados', 'info'); } catch {}
      };
    }
  } catch {}
}

// Loader local de transações: usa serviço legado se existir, senão mantém estado atual
async function loadTransactions() {
  try {
    if (typeof window.loadTransactions === 'function') {
      await window.loadTransactions();
      return;
    }
    // Fallback: nada a fazer, assumimos que appState já tem transações
  } catch (e) {
    console.warn('loadTransactions fallback falhou:', e);
  }
}

// Loader local de recorrentes usando o serviço da feature
async function loadRecorrentes() {
  try {
    await loadRecorrentesService();
  } catch (e) {
    console.warn('loadRecorrentes falhou:', e);
  }
}

// Compatibilidade com sistema legado
export default function() {
  const container = document.getElementById('app-content');
  return render(container);
}

// Fallback seguro para pesquisa de categorias (usa global se existir)
function setupCategorySearch() {
  try {
    if (typeof window.setupCategorySearch === 'function') {
      window.setupCategorySearch();
      return;
    }

    // Helpers locais de normalização e fuzzy
    const __norm = (txt) => (txt ?? '')
      .toString()
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .trim();
    const __lev = (a, b) => {
      if (a === b) return 0;
      const la = a.length, lb = b.length;
      if (la === 0) return lb;
      if (lb === 0) return la;
      if (Math.abs(la - lb) > 1) return 2;
      const dp = Array(la + 1).fill(0).map(() => Array(lb + 1).fill(0));
      for (let i = 0; i <= la; i++) dp[i][0] = i;
      for (let j = 0; j <= lb; j++) dp[0][j] = j;
      for (let i = 1; i <= la; i++) {
        for (let j = 1; j <= lb; j++) {
          const cost = a[i - 1] === b[j - 1] ? 0 : 1;
          dp[i][j] = Math.min(
            dp[i - 1][j] + 1,
            dp[i][j - 1] + 1,
            dp[i - 1][j - 1] + cost
          );
          if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) {
            dp[i][j] = Math.min(dp[i][j], dp[i - 2][j - 2] + 1);
          }
        }
      }
      return dp[la][lb];
    };
    const __approxIncludes = (haystack, needle) => {
      const h = __norm(haystack);
      const n = __norm(needle);
      if (!n) return true;
      if (h.includes(n)) return true;
      const parts = h.split(/\s+/).filter(Boolean);
      for (const p of parts) {
        if (Math.abs(p.length - n.length) <= 1 && __lev(p, n) <= 1) return true;
      }
      return (Math.abs(h.length - n.length) <= 1 && __lev(h, n) <= 1);
    };

    const input = document.getElementById('category-search');
    const resultInfo = document.getElementById('category-search-results');
    const counter = document.getElementById('category-search-count');
    const grid = document.getElementById('categories-grid');
    if (!input || !grid) return;

    if (input.dataset.bound === '1') return;
    input.dataset.bound = '1';

    input.addEventListener('input', () => {
      const q = __norm(input.value);
      if (!q) {
        resultInfo && resultInfo.classList.add('hidden');
        try { grid.innerHTML = renderAllCategories(); } catch { grid.innerHTML = ''; }
        return;
      }

      const filtered = (window.appState.categories || []).filter(cat => {
        const nome = cat.nome || '';
        const tipo = cat.tipo || '';
        const limite = String(cat.limite ?? '');
        return __approxIncludes(nome, q) || __approxIncludes(tipo, q) || limite.includes(q);
      });
      if (counter) counter.textContent = String(filtered.length);
      resultInfo && resultInfo.classList.remove('hidden');
      try { grid.innerHTML = renderFilteredCategories(filtered); } catch { grid.innerHTML = ''; }
    });

    input.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        input.value = '';
        input.dispatchEvent(new Event('input'));
      }
    });
  } catch (e) {
    console.warn('setupCategorySearch fallback falhou:', e);
  }
}

// Função para renderizar todas as categorias
export function renderAllCategories() {
  const { year: anoAtual, month: mesAtual } = getSelectedPeriod();

  const categoriasComGastos = window.appState.categories
    .map(cat => {
      // Filtrar transações da categoria no mês atual (incluindo recorrentes aplicadas)
      const transacoesCategoria = window.appState.transactions.filter(t => {
        // Tratar Firestore Timestamp
        let transacaoData;
        if (
          t.createdAt &&
          typeof t.createdAt === 'object' &&
          t.createdAt.seconds
        ) {
          // É um Firestore Timestamp
          transacaoData = new Date(t.createdAt.seconds * 1000);
        } else {
          // É uma string ou outro formato
          transacaoData = new Date(t.createdAt);
        }

        const transacaoAno = transacaoData.getFullYear();
        const transacaoMes = transacaoData.getMonth() + 1;

        return (
          t.categoriaId === cat.id &&
          t.tipo === cat.tipo && // Usar o tipo da categoria (receita ou despesa)
          transacaoAno === anoAtual &&
          transacaoMes === mesAtual
        );
      });

      // Calcular total gasto das transações diretas
      const totalGastoTransacoes = transacoesCategoria.reduce(
        (sum, t) => sum + parseFloat(t.valor),
        0
      );

      // Calcular total gasto das recorrentes aplicadas neste mês
      const recorrentesAplicadas = window.appState.recorrentes.filter(
        r => r.categoriaId === cat.id && r.ativa === true
      );

      // Verificar quais recorrentes foram aplicadas neste mês
      let totalGastoRecorrentes = 0;
      recorrentesAplicadas.forEach(rec => {
        const transacoesRecorrente = window.appState.transactions.filter(
          t =>
            t.recorrenteId === rec.id &&
            new Date(t.createdAt).getFullYear() === anoAtual &&
            new Date(t.createdAt).getMonth() + 1 === mesAtual
        );

        if (transacoesRecorrente.length > 0) {
          totalGastoRecorrentes += parseFloat(rec.valor);
        }
      });

      // Total geral (transações diretas + transações de recorrentes)
      const totalGasto = totalGastoTransacoes + totalGastoRecorrentes;

      // Calcular limite (se existir)
      const limite = cat.limite ? parseFloat(cat.limite) : 0;

      // Debug: Log dos cálculos para esta categoria
      if (cat.nome === 'igor300' || cat.nome === 'salario') {
        console.log('🔍 DEBUG Categoria:', {
          nome: cat.nome,
          transacoesCategoria: transacoesCategoria.length,
          totalGastoTransacoes,
          totalGastoRecorrentes,
          totalGasto,
          limite: cat.limite,
          saldo: limite - totalGasto,
          transacoesDetalhes: transacoesCategoria.map(t => ({ valor: t.valor, descricao: t.descricao }))
        });
      }

      // Calcular saldo (para receitas: quanto falta para atingir o limite)
      const saldo =
        cat.tipo === 'receita' ? limite - totalGasto : limite - totalGasto;

      // Calcular porcentagem de uso
      const porcentagem =
        limite > 0 ? Math.min((totalGasto / limite) * 100, 100) : 0;

      // Determinar cor da barra baseada na porcentagem
      let corBarra = 'bg-green-500';
      if (porcentagem >= 90) {
        corBarra = 'bg-red-500';
      } else if (porcentagem >= 75) {
        corBarra = 'bg-yellow-500';
      } else if (porcentagem >= 50) {
        corBarra = 'bg-orange-500';
      }

      return {
        ...cat,
        totalGasto,
        totalGastoTransacoes,
        totalGastoRecorrentes,
        limite,
        saldo,
        porcentagem,
        corBarra
      };
    })
    .sort((a, b) => b.totalGasto - a.totalGasto); // Ordenar por gasto (maior para menor)

  return categoriasComGastos.map(cat => `
    <div class="card-standard">
      <div class="flex items-center space-x-3 mb-3">
        <div class="w-4 h-4 rounded-full" style="background-color: ${cat.cor || '#4F46E5'}"></div>
        <span class="list-item-title">${cat.nome}</span>
      </div>
      <p class="list-item-subtitle">Tipo: ${cat.tipo}</p>
      
      ${
  cat.limite > 0
    ? `
            <div class="mt-3 space-y-2">
              <div class="flex justify-between text-xs md:text-sm">
                <span class="text-gray-600 dark:text-gray-400">Limite:</span>
                <span class="font-medium text-gray-900 dark:text-gray-100">R$ ${cat.limite.toFixed(2)}</span>
              </div>
              <div class="flex justify-between text-xs md:text-sm">
                <span class="text-gray-600 dark:text-gray-400">${cat.tipo === 'receita' ? 'Receita' : 'Gasto'}:</span>
                <span class="font-medium ${cat.tipo === 'receita' ? 'text-green-600' : cat.totalGasto > cat.limite ? 'text-red-600' : 'text-gray-900 dark:text-gray-100'}">R$ ${cat.totalGasto.toFixed(2)}</span>
              </div>
              ${
  cat.totalGasto > 0
    ? `
                    <div class="text-xs text-gray-500 dark:text-gray-400 pl-2">
                      • Transações: R$ ${cat.totalGastoTransacoes.toFixed(2)}
                      ${cat.totalGastoRecorrentes > 0 ? `<br>• Recorrentes: R$ ${cat.totalGastoRecorrentes.toFixed(2)}` : ''}
                    </div>
                  `
    : ''
}
              <div class="flex justify-between text-xs md:text-sm">
                <span class="text-gray-600 dark:text-gray-400">${cat.tipo === 'receita' ? 'Falta para meta' : 'Saldo'}:</span>
                <span class="font-medium ${cat.tipo === 'receita' ? (cat.saldo <= 0 ? 'text-green-600' : cat.saldo < cat.limite * 0.25 ? 'text-yellow-600' : 'text-red-600') : cat.saldo < 0 ? 'text-red-600' : cat.saldo < cat.limite * 0.25 ? 'text-yellow-600' : 'text-green-600'}">R$ ${cat.saldo.toFixed(2)}</span>
              </div>
              
              <!-- Barra de Progresso -->
              <div class="mt-2">
                <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
                  <span>${cat.porcentagem.toFixed(1)}% ${cat.tipo === 'receita' ? 'atingido' : 'usado'}</span>
                  <span>${cat.porcentagem >= 100 ? (cat.tipo === 'receita' ? 'Meta atingida!' : 'Limite excedido!') : ''}</span>
                </div>
                <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div class="${cat.corBarra} h-2 rounded-full transition-all duration-300" style="width: ${Math.min(cat.porcentagem, 100)}%"></div>
                </div>
              </div>
            </div>
          `
    : `
            <div class="mt-3">
              <div class="flex justify-between text-xs md:text-sm">
                <span class="text-gray-600 dark:text-gray-400">${cat.tipo === 'receita' ? 'Receita' : 'Gasto'} do mês:</span>
                <span class="font-medium ${cat.tipo === 'receita' ? 'text-green-600' : 'text-gray-900 dark:text-gray-100'}">R$ ${cat.totalGasto.toFixed(2)}</span>
              </div>
              ${
  cat.totalGasto > 0
    ? `
                    <div class="text-xs text-gray-500 dark:text-gray-400 pl-2">
                      • ${cat.tipo === 'receita' ? 'Receitas' : 'Transações'}: R$ ${cat.totalGastoTransacoes.toFixed(2)}
                      ${cat.totalGastoRecorrentes > 0 ? `<br>• Recorrentes: R$ ${cat.totalGastoRecorrentes.toFixed(2)}` : ''}
                    </div>
                  `
    : ''
}
              <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">Sem limite definido</p>
            </div>
          `
}
      
      <div class="flex items-center justify-end gap-2 mt-4">
        <button onclick="editCategory('${cat.id}')" class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/40 border border-blue-200 dark:border-blue-800 transition-all duration-200" title="Editar categoria">
          <span>✏️</span>
          <span>Editar</span>
        </button>
        <button onclick="showCategoryHistory('${cat.id}')" class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-purple-900/20 hover:bg-purple-100 dark:hover:bg-purple-900/40 border border-purple-200 dark:border-purple-800 transition-all duration-200" title="Ver histórico">
          <span>📊</span>
          <span>Histórico</span>
        </button>
        <button onclick="window.deleteCategoryWithConfirmation('${cat.id}', '${cat.nome}')" class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-red-700 dark:text-red-300 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/40 border border-red-200 dark:border-red-800 transition-all duration-200" title="Excluir categoria">
          <span>🗑️</span>
          <span>Excluir</span>
        </button>
      </div>
    </div>
  `).join('');

  // Re-montar indicador de período após renderização
  try {
    console.log('🔧 Re-montando indicador após renderCategories');
    const indicatorElement = document.getElementById('cat-period-indicator');
    console.log('🔍 Elemento cat-period-indicator encontrado:', indicatorElement);
    if (indicatorElement) {
      mountPeriodIndicator('#cat-period-indicator');
      console.log('✅ Indicador re-montado com sucesso');
    } else {
      console.error('❌ Elemento cat-period-indicator não encontrado!');
    }
  } catch (error) {
    console.error('❌ Erro ao re-montar indicador após renderCategories:', error);
  }
}

// Função para renderizar categorias filtradas
export function renderFilteredCategories(filteredCategories) {
  if (!filteredCategories.length) {
    return `
      <div class="col-span-full text-center py-8">
        <div class="text-4xl mb-4">🔍</div>
        <div class="text-lg font-semibold text-gray-800 dark:text-white mb-2">Nenhuma categoria encontrada</div>
        <div class="text-gray-600 dark:text-gray-400">Tente usar termos diferentes na pesquisa</div>
      </div>
    `;
  }

  return filteredCategories.map(cat => `
    <div class="card-standard">
      <div class="flex items-center space-x-3 mb-3">
        <div class="w-4 h-4 rounded-full" style="background-color: ${cat.cor || '#4F46E5'}"></div>
        <span class="list-item-title">${cat.nome}</span>
      </div>
      <p class="list-item-subtitle">Tipo: ${cat.tipo}</p>
      ${cat.limite ? `<p class="text-xs text-gray-500 dark:text-gray-400">Limite: R$ ${cat.limite.toFixed(2)}</p>` : '<p class="text-xs text-gray-500 dark:text-gray-400">Sem limite definido</p>'}
      
      <div class="flex items-center justify-end gap-2 mt-4">
        <button onclick="editCategory('${cat.id}')" class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/40 border border-blue-200 dark:border-blue-800 transition-all duration-200" title="Editar categoria">
          <span>✏️</span>
          <span>Editar</span>
        </button>
        <button onclick="showCategoryHistory('${cat.id}')" class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-purple-900/20 hover:bg-purple-100 dark:hover:bg-purple-900/40 border border-purple-200 dark:border-purple-800 transition-all duration-200" title="Ver histórico">
          <span>📊</span>
          <span>Histórico</span>
        </button>
        <button onclick="window.deleteCategoryWithConfirmation('${cat.id}', '${cat.nome}')" class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-red-700 dark:text-red-300 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/40 border border-red-200 dark:border-red-800 transition-all duration-200" title="Excluir categoria">
          <span>🗑️</span>
          <span>Excluir</span>
        </button>
      </div>
    </div>
  `).join('');

  // Re-montar indicador de período após renderização
  try {
    console.log('🔧 Re-montando indicador após renderCategories');
    const indicatorElement = document.getElementById('cat-period-indicator');
    console.log('🔍 Elemento cat-period-indicator encontrado:', indicatorElement);
    if (indicatorElement) {
      mountPeriodIndicator('#cat-period-indicator');
      console.log('✅ Indicador re-montado com sucesso');
    } else {
      console.error('❌ Elemento cat-period-indicator não encontrado!');
    }
  } catch (error) {
    console.error('❌ Erro ao re-montar indicador após renderCategories:', error);
  }
}

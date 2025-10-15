// Minimal, safe dashboard that calculates and renders summary using plain strings
import { eventBus } from '@core/events/eventBus.js';
import { mountPeriodIndicator } from '../../ui/PeriodIndicator.js';
import { setupDashboardHandlers } from './DashboardHandlers.js';
import { initDashboardDragDrop } from './DashboardDragDrop.js';

let listenersAttached = false;
let renderScheduleId = null;

function scheduleDashboardRender() {
  try {
    if (renderScheduleId) { clearTimeout(renderScheduleId); }
    renderScheduleId = setTimeout(() => {
      renderScheduleId = null;
      // Chamar sem container para respeitar o route guard
      renderDashboard();
    }, 50);
  } catch {}
}
// lastContainer era usado para re-render local; removido com mountPeriodIndicator

export function renderDashboard(container) {
  // Render somente se a rota ativa for Dashboard (quando chamado sem container explícito)
  try {
    if (!container) {
      const hh = (window.location.hash || '').split('?')[0];
      if (hh && hh !== '#/dashboard' && hh !== '#/') return;
    }
  } catch {}
  var target = container || document.getElementById('app-content');
  if (!target) return;

  // ...existing code...

  // Banner de debug removido - não é mais necessário

  // target é resolvido a cada render

  // Attach listeners once to refresh when data or period changes
  if (!listenersAttached) {
    try {
      // Coalescer múltiplos eventos próximos para evitar renders duplicados
      const rerender = () => scheduleDashboardRender();
      eventBus.on('transactions:updated', rerender);
      eventBus.on('categories:updated', rerender);
      eventBus.on('budget:changed', rerender);
      eventBus.on('period:changed', rerender);
      // Atualizar também quando abas emitirem atualização explícita de resumo
      eventBus.on('summary:updated', rerender);
      eventBus.on('app:ready', rerender);
      listenersAttached = true;
    } catch {
      // eventBus may not be available in some tests; ignore
    }
  }

  // Resolve selected period
  var now = new Date();
  if (!window.appState) window.appState = {};
  var year = (window.appState && window.appState.selectedYear) || now.getFullYear();
  var month = (window.appState && window.appState.selectedMonth) || (now.getMonth() + 1);
  var monthNames = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];
  var monthName = monthNames[Math.max(0, Math.min(11, month - 1))] || '';
  var ymKey = String(year) + '-' + String(month).padStart(2, '0');

  // Helpers to parse dates
  function toJsDate(v) {
    try {
      if (!v) return null;
      if (v && typeof v.toDate === 'function') return v.toDate();
      if (v && v.seconds) return new Date(v.seconds * 1000);
      var d = new Date(v);
      return isNaN(d) ? null : d;
    } catch {
      return null;
    }
  }
  function getTxDate(t) {
    if (!t) return null;
    var candidates = [t.createdAt, t.data, t.date, t.dataTransacao, t.updatedAt];
    for (var i=0;i<candidates.length;i++) {
      var d = toJsDate(candidates[i]);
      if (d) return d;
    }
    return null;
  }
  function getYearMonthKey(d) {
    if (!d) return '';
    var y = d.getFullYear();
    var m = String(d.getMonth() + 1).padStart(2, '0');
    return y + '-' + m;
  }
  // Robust amount parser compatible with legacy formats (e.g., "R$ 1.234,56", "-1234.56")
  function parseAmount(val) {
    try {
      if (val === null || val === undefined) return 0;
      if (typeof val === 'number') return val;
      var s = String(val).trim();
      // keep digits, comma, dot, minus; drop currency and other chars
      s = s.replace(/[^0-9,.-]/g, '');
      // remove thousands separators (dot) when followed by 3 digits
      s = s.replace(/\.(?=\d{3}(?:\D|$))/g, '');
      // convert decimal comma to dot
      s = s.replace(',', '.');
      var n = parseFloat(s);
      return isNaN(n) ? 0 : n;
    } catch {
      return 0;
    }
  }
  function formatBR(n) {
    try {
      return Number(n || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    } catch {
      return (Number(n || 0).toFixed(2));
    }
  }

  // Gather data from global state
  var txAll = (window.appState && Array.isArray(window.appState.transactions)) ? window.appState.transactions : [];
  var cats = (window.appState && Array.isArray(window.appState.categories)) ? window.appState.categories : [];
  var tx = txAll.filter(function(t){ return getYearMonthKey(getTxDate(t)) === ymKey; });

  var receitas = 0, despesas = 0;
  for (var i=0;i<tx.length;i++) {
    var txx = tx[i];
    var raw = (txx.valor !== null && txx.valor !== undefined ? txx.valor : txx.amount);
    var v = parseAmount(raw);
    var tipo = txx.tipo || txx.type || 'despesa';

    // Lógica correta: receitas são positivas, despesas são negativas
    if (tipo === 'receita') {
      receitas += Math.abs(v); // Receitas sempre positivas
    } else {
      despesas += Math.abs(v); // Despesas sempre positivas para cálculo
    }
  }
  var saldo = receitas - despesas;
  // Total de transações (removido variável não utilizada)

  // Orçamento: usar valorTotal do orçamento atual, ou somar limites de categorias de despesa
  var orcado = 0;
  try {
    var currentBudget = window.appState && window.appState.currentBudget;
    if (currentBudget && currentBudget.valorTotal) {
      orcado = parseAmount(currentBudget.valorTotal);
    } else {
      for (var ci=0; ci<cats.length; ci++) {
        var c = cats[ci];
        if (!c) continue;
        var lim = parseAmount(c.limite);
        var tipoCat = (c.tipo || 'despesa');
        if (lim > 0 && tipoCat === 'despesa') orcado += lim;
      }
    }
  } catch {}

  // Gasto por categoria no mês para calcular alertas (>=70% do limite)
  var gastoPorCategoria = Object.create(null);
  for (var gx=0; gx<tx.length; gx++) {
    var tgc = tx[gx];
    if ((tgc.tipo || 'despesa') !== 'despesa') continue;
    var cidg = tgc.categoriaId || tgc.categoryId;
    if (!cidg) continue;
    var vv = Math.abs(parseAmount(tgc.valor !== null && tgc.valor !== undefined ? tgc.valor : tgc.amount));
    gastoPorCategoria[cidg] = (gastoPorCategoria[cidg] || 0) + vv;
  }
  var totalAlertas = 0;
  var categoriasEmAlerta = [];
  // var saldoTotalCategorias = 0; // Removido - não utilizado
  var _totalLimitesCategorias = 0;
  var categoriasComLimite = 0;

  for (var ca=0; ca<cats.length; ca++) {
    var cc = cats[ca];
    if (!cc) continue;
    var limv = parseAmount(cc.limite);
    if (limv > 0) {
      var gasto = gastoPorCategoria[cc.id] || 0;
      var perc = limv > 0 ? (gasto / limv) : 0;

      // Calcular saldo para meta diária (apenas categorias de despesa)
      var tipoCat = (cc.tipo || 'despesa');
      if (tipoCat === 'despesa') {
        // var saldoCat = limv - gasto; // Removido - não utilizado
        var _totalLimitesCategorias = (_totalLimitesCategorias || 0) + limv;
        categoriasComLimite++;
      }

      // Contar alerta se categoria ultrapassou 70% do limite
      if (perc >= 0.7) {
        totalAlertas++;
        categoriasEmAlerta.push({
          id: cc.id,
          nome: cc.nome,
          gasto: gasto,
          limite: limv,
          percentual: perc,
          percentualFormatado: (perc * 100).toFixed(1) + '%'
        });
        console.log('🚨 [Dashboard] Categoria em alerta:', {
          nome: cc.nome,
          gasto: gasto,
          limite: limv,
          percentual: (perc * 100).toFixed(1) + '%'
        });
      }
    }
  }

  // Calcular dias restantes no mês
  var ultimoDiaDoMes = new Date(year, month, 0).getDate();
  
  // Se estivermos visualizando o mês atual, usar a data atual real
  // Se estivermos visualizando outro mês, calcular baseado no mês selecionado
  var diaAtual;
  var agora = new Date();
  var mesAtual = agora.getMonth() + 1;
  var anoAtual = agora.getFullYear();
  
  if (year === anoAtual && month === mesAtual) {
    // Mês atual: usar o dia real de hoje
    diaAtual = agora.getDate();
  } else {
    // Mês diferente: usar o último dia do mês (para meses passados) ou primeiro dia (para futuros)
    if (year < anoAtual || (year === anoAtual && month < mesAtual)) {
      // Mês no passado: considerar o mês todo (usar último dia)
      diaAtual = ultimoDiaDoMes;
    } else {
      // Mês no futuro: considerar desde o primeiro dia
      diaAtual = 1;
    }
  }
  
  var diasRestantes = Math.max(1, ultimoDiaDoMes - diaAtual + 1);

  // Meta diária global (considerando despesas já realizadas)
  // Calcular corretamente: Orçamento Total - Despesas já realizadas
  var saldoRestanteOrcamento = orcado - despesas;
  var metaDiariaGlobal = saldoRestanteOrcamento > 0 ? (saldoRestanteOrcamento / diasRestantes) : 0;

  // Saldo restante das receitas (considerando despesas já realizadas)
  var saldoRestanteReceitas = receitas - despesas;

  // Meta diária para bater exatamente as receitas (100% das receitas restantes)
  var metaDiariaReceitasCompletas = saldoRestanteReceitas > 0 ? (saldoRestanteReceitas / diasRestantes) : 0;

  // Meta diária conservadora (80% das receitas restantes para gastos, 20% para reserva)
  var saldoRestanteConservador = saldoRestanteReceitas * 0.8;
  var metaDiariaConservadora = saldoRestanteConservador > 0 ? (saldoRestanteConservador / diasRestantes) : 0;

  // Análise inteligente: diferença entre metas
  var analiseMetas = {
    diferencaOrcamentoVsReceitas: metaDiariaGlobal - metaDiariaReceitasCompletas,
    orcamentoMaiorQueReceitas: metaDiariaGlobal > metaDiariaReceitasCompletas,
    percentualDiferenca: metaDiariaReceitasCompletas > 0 ? ((metaDiariaGlobal - metaDiariaReceitasCompletas) / metaDiariaReceitasCompletas) * 100 : 0
  };

  // Análise inteligente: Receitas vs Orçamento
  var analiseOrcamento = {
    receitasVsOrcado: orcado > 0 ? (receitas / orcado) : 0,
    receitasVsGastos: despesas > 0 ? (receitas / despesas) : 0,
    coberturaOrcamento: orcado > 0 ? Math.min((receitas / orcado) * 100, 100) : 0,
    deficitOrcamento: Math.max(0, orcado - receitas),
    saldoPositivo: saldo > 0
  };

  // Armazenar categorias em alerta globalmente para uso no modal
  window.categoriasEmAlerta = categoriasEmAlerta;
  console.log('🔍 [Dashboard] Total de alertas calculado:', totalAlertas);
  var progressoOrcado = (orcado > 0) ? Math.min(Math.max(despesas / orcado, 0), 1) : 0;

  // Top categorias (despesas)
  var map = Object.create(null);
  for (var j=0;j<tx.length;j++) {
    var t = tx[j];
    if ((t.tipo || 'despesa') !== 'despesa') continue;
    var cid = t.categoriaId || t.categoryId || (t.categoria && t.categoria.id) || 'sem-categoria';
    var val = parseAmount(t.valor !== null && t.valor !== undefined ? t.valor : t.amount);
    map[cid] = (map[cid] || 0) + Math.abs(val);
  }
  var topArr = [];
  for (var cid in map) {
    if (!Object.prototype.hasOwnProperty.call(map, cid)) continue;
    var catName = 'Outros';
    for (var c=0;c<cats.length;c++) {
      if (cats[c].id === cid) { catName = cats[c].nome || 'Outros'; break; }
    }
    topArr.push({ id: cid, nome: catName, valor: map[cid] });
  }
  topArr.sort(function(a,b){ return b.valor - a.valor; });
  if (topArr.length > 5) topArr = topArr.slice(0,5);

  // Render using plain string concatenation
  var html = '';
  html += '<div class="tab-container">';
  html += '  <div class="tab-header">';
  html += '    <div class="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm border border-gray-200 dark:border-gray-600">';
  html += '      <div class="flex items-center justify-between w-full gap-4">';
  html += '        <!-- Título com ícone e badge -->';
  html += '        <div class="flex items-center gap-3">';
  html += '          <div class="flex items-center gap-2">';
  html += '            <div class="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">';
  html += '              <span class="text-white text-sm">📊</span>';
  html += '            </div>';
  html += '            <div>';
  html += '              <h2 class="text-gray-800 dark:text-white font-semibold text-base">Dashboard</h2>';
  html += '              <div class="flex items-center gap-1">';
  html += '                <span class="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>';
  html += '                <span class="text-green-600 dark:text-green-400 text-xs">Tempo Real</span>';
  html += '              </div>';
  html += '            </div>';
  html += '          </div>';
  html += '        </div>';
  html += '        <!-- Seletor de período integrado -->';
  html += '        <div id="dash-period-indicator"></div>';
  html += '      </div>';
  html += '    </div>';
  html += '  </div>';
  html += '  <div class="tab-content">';
  html += '    <div class="content-spacing">';

  // Resumo Compacto
  html += '      <div class="mb-12">';
  html += '        <div class="flex items-center gap-2 mb-4">';
  html += '          <div class="w-1 h-6 bg-gradient-to-b from-blue-500 to-green-500 rounded-full"></div>';
  html += '          <h2 class="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100">📊 Resumo</h2>';
  html += '        </div>';
  html += '        <div class="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 rounded-2xl shadow-lg border border-blue-200 dark:border-gray-600 p-4 mb-6">';
  html += '          <!-- Header Compacto -->';
  html += '          <div class="flex items-center justify-between mb-4 gap-4">';
  html += '            <div>';
  html += '              <h3 class="text-lg font-bold text-gray-800 dark:text-gray-200 flex items-center gap-2">';
  html += '                <span class="text-xl">📊</span>';
  html += '                Dashboard Financeiro';
  html += '              </h3>';
  html += '              <p class="text-sm text-gray-600 dark:text-gray-400">' + monthName + '/' + year + '</p>';
  html += '            </div>';
  html += '            <div class="flex gap-2">';
  html += '              <button id="export-dashboard-btn" class="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-200 flex items-center gap-1.5 shadow-md hover:shadow-lg transform hover:scale-105">';
  html += '                <span class="text-sm">📱</span>';
  html += '                <span class="hidden sm:inline">Compartilhar</span>';
  html += '              </button>';
  html += '              <button id="reset-layout-btn" class="bg-gradient-to-r from-slate-500 to-slate-600 hover:from-slate-600 hover:to-slate-700 text-white px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-200 flex items-center gap-1.5 shadow-md hover:shadow-lg transform hover:scale-105">';
  html += '                <span class="text-sm">🔄</span>';
  html += '                <span class="hidden sm:inline">Resetar</span>';
  html += '              </button>';
  html += '            </div>';
  html += '          </div>';
  html += '          <!-- Card de Progresso do Orçamento -->';
  html += '          <div class="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-600 mb-4 draggable-card" data-card-type="progress">';
  html += '            <div class="drag-handle"></div>';
  html += '            <div class="flex items-center justify-between mb-2">';
  html += '              <div class="flex items-center gap-2">';
  html += '                <span class="text-lg">📊</span>';
  html += '                <span class="text-sm font-semibold text-gray-700 dark:text-gray-300">Progresso do Orçamento</span>';
  html += '              </div>';
  html += '              <div class="text-right">';
  html += '                <div class="text-lg font-bold ' + (progressoOrcado > 0.7 ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400') + '">' + (progressoOrcado * 100).toFixed(1) + '%</div>';
  html += '                <div class="text-xs text-gray-600 dark:text-gray-400">R$ ' + formatBR(despesas) + ' de R$ ' + formatBR(orcado) + '</div>';
  html += '              </div>';
  html += '            </div>';
  html += '            <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">';
  html += '              <div class="h-2 rounded-full ' + (progressoOrcado > 0.7 ? 'bg-red-500' : 'bg-green-500') + '" style="width: ' + Math.min(progressoOrcado * 100, 100) + '%"></div>';
  html += '            </div>';
  html += '          </div>';
  html += '          <!-- Métricas Compactas -->';
  html += '          <div class="grid grid-cols-3 gap-3 mb-4 draggable-card" data-card-type="metrics">';
  html += '            <div class="drag-handle"></div>';
  html += '            <div class="bg-white dark:bg-gray-800 rounded-lg p-3 text-center shadow-sm border border-gray-200 dark:border-gray-600">';
  html += '              <div class="text-lg mb-1">💚</div>';
  html += '              <div class="text-lg font-bold text-green-600 dark:text-green-400">R$ ' + formatBR(receitas) + '</div>';
  html += '              <div class="text-xs text-gray-600 dark:text-gray-400">Receitas</div>';
  html += '            </div>';
  html += '            <div class="bg-white dark:bg-gray-800 rounded-lg p-3 text-center shadow-sm border border-gray-200 dark:border-gray-600">';
  html += '              <div class="text-lg mb-1">💸</div>';
  html += '              <div class="text-lg font-bold text-red-600 dark:text-red-400">R$ ' + formatBR(despesas) + '</div>';
  html += '              <div class="text-xs text-gray-600 dark:text-gray-400">Despesas</div>';
  html += '            </div>';
  html += '            <div class="bg-white dark:bg-gray-800 rounded-lg p-3 text-center shadow-sm border border-gray-200 dark:border-gray-600">';
  html += '              <div class="text-lg mb-1">💰</div>';
  html += '              <div class="text-lg font-bold ' + (saldo >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400') + '">R$ ' + formatBR(saldo) + '</div>';
  html += '              <div class="text-xs text-gray-600 dark:text-gray-400">Saldo</div>';
  html += '            </div>';
  html += '          </div>';
  html += '          <!-- Resumo Financeiro Compacto -->';
  html += '          <div class="bg-white dark:bg-gray-800 rounded-lg p-3 shadow-sm border border-gray-200 dark:border-gray-600 draggable-card" data-card-type="summary">';
  html += '            <div class="drag-handle"></div>';
  html += '            <h5 class="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-1">';
  html += '              <span>📈</span>';
  html += '              Resumo Financeiro';
  html += '            </h5>';
  html += '            <div class="space-y-2">';
  // Meta Diária (destaque principal) - sempre visível com gradiente
  html += '              <div class="flex justify-between text-xs bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 p-3 rounded-lg border-l-4 border-blue-500 shadow-sm mb-2">';
  html += '                <span class="text-blue-800 dark:text-blue-300 font-semibold flex items-center gap-1"><span class="text-base">💡</span> Meta Diária (Orçamento):</span>';
  html += '                <span class="font-bold text-blue-600 dark:text-blue-400 text-sm">R$ ' + formatBR(metaDiariaGlobal) + '/dia</span>';
  html += '              </div>';

  // Meta Diária para Bater as Receitas - sempre visível com gradiente verde
  html += '              <div class="flex justify-between text-xs bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 p-3 rounded-lg border-l-4 border-green-500 shadow-sm mb-2">';
  html += '                <span class="text-green-800 dark:text-green-300 font-semibold flex items-center gap-1"><span class="text-base">💰</span> Meta Diária (100% Receitas):</span>';
  html += '                <span class="font-bold ' + (metaDiariaReceitasCompletas > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400') + ' text-sm">R$ ' + formatBR(metaDiariaReceitasCompletas) + '/dia</span>';
  html += '              </div>';

  // Meta Diária Conservadora baseada nas Receitas - sempre visível com gradiente amarelo
  html += '              <div class="flex justify-between text-xs bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/30 dark:to-orange-900/30 p-3 rounded-lg border-l-4 border-yellow-500 shadow-sm mb-2">';
  html += '                <span class="text-yellow-800 dark:text-yellow-300 font-semibold flex items-center gap-1"><span class="text-base">⚠️</span> Meta Diária (Conservadora):</span>';
  html += '                <span class="font-bold ' + (metaDiariaConservadora > 0 ? 'text-yellow-600 dark:text-yellow-400' : 'text-red-600 dark:text-red-400') + ' text-sm">R$ ' + formatBR(metaDiariaConservadora) + '/dia</span>';
  html += '              </div>';

  // Alertas (só se houver alertas) - com animação e destaque
  if (totalAlertas > 0) {
    html += '              <div class="flex justify-between text-xs cursor-pointer bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/30 dark:to-orange-900/30 hover:from-red-100 hover:to-orange-100 dark:hover:from-red-900/40 dark:hover:to-orange-900/40 p-3 rounded-lg transition-all duration-200 border-l-4 border-red-500 shadow-md hover:shadow-lg animate-pulse" id="alertas-categorias-btn" title="Clique para ver categorias em alerta">';
    html += '                <span class="text-red-700 dark:text-red-300 font-bold flex items-center gap-1"><span class="text-base">🚨</span> Alertas Importantes:</span>';
    html += '                <span class="font-bold text-red-600 dark:text-red-400 text-sm bg-red-100 dark:bg-red-900/50 px-3 py-1 rounded-full">' + totalAlertas + ' categoria(s)</span>';
    html += '              </div>';
  }

  // Insights Inteligentes (só se houver orçamento)
  if (orcado > 0) {
    html += '              <div class="border-t border-gray-200 dark:border-gray-600 pt-3 mt-3">';
    html += '                <div class="text-xs font-bold text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-1"><span class="text-base">💡</span> Análise e Recomendações:</div>';

    // Cobertura das receitas com background colorido
    if (analiseOrcamento.coberturaOrcamento >= 100) {
      html += '                <div class="text-xs text-green-700 dark:text-green-300 bg-green-50 dark:bg-green-900/20 p-2 rounded-lg border-l-4 border-green-500 mb-2 font-medium"><span class="text-base">✅</span> Receitas cobrem 100% do orçamento</div>';
    } else if (analiseOrcamento.coberturaOrcamento >= 80) {
      html += '                <div class="text-xs text-yellow-700 dark:text-yellow-300 bg-yellow-50 dark:bg-yellow-900/20 p-2 rounded-lg border-l-4 border-yellow-500 mb-2 font-medium"><span class="text-base">⚠️</span> Receitas cobrem ' + analiseOrcamento.coberturaOrcamento.toFixed(0) + '% do orçamento</div>';
    } else {
      html += '                <div class="text-xs text-red-700 dark:text-red-300 bg-red-50 dark:bg-red-900/20 p-2 rounded-lg border-l-4 border-red-500 mb-2 font-medium"><span class="text-base">❌</span> Receitas cobrem apenas ' + analiseOrcamento.coberturaOrcamento.toFixed(0) + '% do orçamento</div>';
    }

    // Déficit do orçamento com destaque
    if (analiseOrcamento.deficitOrcamento > 0) {
      html += '                <div class="text-xs text-orange-700 dark:text-orange-300 bg-orange-50 dark:bg-orange-900/20 p-2 rounded-lg border-l-4 border-orange-500 mb-2 font-medium"><span class="text-base">📊</span> Faltam receitas: R$ ' + formatBR(analiseOrcamento.deficitOrcamento) + '</div>';
    }


    // Recomendações baseadas na análise
    html += '                <div class="mt-2 p-2 bg-gray-50 dark:bg-gray-700 rounded text-xs">';
    html += '                  <div class="font-medium text-gray-700 dark:text-gray-300 mb-1">🎯 Recomendações:</div>';

    // Meta de receitas para cobrir o orçamento
    if (analiseOrcamento.coberturaOrcamento < 100) {
      var metaReceitas = orcado;
      var receitasFaltantes = Math.max(0, metaReceitas - receitas);
      if (receitasFaltantes > 0) {
        html += '                  <div class="text-blue-600 dark:text-blue-400">• 💡 Considere reduzir limites de categorias ou aumentar receitas</div>';
      }
    }

    if (analiseOrcamento.coberturaOrcamento < 80) {
      html += '                  <div class="text-orange-600 dark:text-orange-400">• Considere reduzir limites de categorias</div>';
    }
    if (analiseOrcamento.receitasVsGastos < 1) {
      html += '                  <div class="text-red-600 dark:text-red-400">• Controle gastos ou aumente receitas</div>';
    }


    if (analiseMetas.orcamentoMaiorQueReceitas) {
      html += '                  <div class="text-orange-600 dark:text-orange-400">• Meta orçamento é R$ ' + formatBR(analiseMetas.diferencaOrcamentoVsReceitas) + '/dia maior que receitas</div>';
    } else {
      html += '                  <div class="text-green-600 dark:text-green-400">• Meta orçamento está dentro das receitas</div>';
    }


    // Informação sobre recálculo dinâmico com gradiente e borda
    html += '                  <div class="text-blue-700 dark:text-blue-300 text-xs mt-2 p-3 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-lg border-l-4 border-blue-500 shadow-sm">';
    html += '                    <div class="font-bold flex items-center gap-1 mb-1"><span class="text-base">🔄</span> Recálculo Dinâmico:</div>';
    html += '                    <div class="font-medium">• Dias restantes: <span class="text-blue-600 dark:text-blue-400 font-bold">' + diasRestantes + ' dias</span></div>';
    html += '                    <div class="font-medium">• Gasto médio atual: <span class="text-blue-600 dark:text-blue-400 font-bold">R$ ' + formatBR(despesas / (ultimoDiaDoMes - diasRestantes + 1)) + '/dia</span></div>';
    html += '                  </div>';
    if (analiseOrcamento.saldoPositivo && analiseOrcamento.coberturaOrcamento >= 100) {
      html += '                  <div class="text-green-700 dark:text-green-300 bg-green-50 dark:bg-green-900/20 p-2 rounded-lg mt-2 font-bold flex items-center gap-1"><span class="text-base">🎉</span> Excelente controle financeiro!</div>';
    }

    html += '                </div>';
    html += '              </div>';
  }
  html += '            </div>';
  html += '          </div>';
  html += '        </div>';
  html += '      </div>';

  // Top recorrentes (somente despesas recorrentes do orçamento atual)
  try {
    var currentBudgetId = window.appState && window.appState.currentBudget && window.appState.currentBudget.id;
    var recMap = Object.create(null);
    for (var rr=0; rr<tx.length; rr++) {
      var trr = tx[rr];
      if ((trr.tipo || 'despesa') !== 'despesa') continue;
      var isRec = trr.recorrenteId || trr.recorrenteNome;
      if (!isRec) continue;
      // Filtrar recorrentes do orçamento atual
      if (trr.budgetId && currentBudgetId && trr.budgetId !== currentBudgetId) continue;
      var key = trr.recorrenteId || ('nome:' + (trr.recorrenteNome || 'Recorrente'));
      var vrr = Math.abs(parseAmount(trr.valor !== null && trr.valor !== undefined ? trr.valor : trr.amount));
      if (!recMap[key]) recMap[key] = { nome: trr.recorrenteNome || 'Recorrente', total: 0, count: 0, parcelaAtual: null, parcelasTotal: null, recId: (trr.recorrenteId || null) };
      recMap[key].total += vrr;
      recMap[key].count += 1;
      // Capturar info de parcela quando disponível na transação
      try {
        if (trr.parcelaAtual !== null && trr.parcelaAtual !== undefined) {
          var pa = Number(trr.parcelaAtual);
          if (!isNaN(pa) && pa > 0) {
            // Manter a maior parcela atual encontrada
            recMap[key].parcelaAtual = Math.max(recMap[key].parcelaAtual || 0, pa);
          }
        }
        if (trr.parcelasTotal !== null && trr.parcelasTotal !== undefined) {
          var pt = Number(trr.parcelasTotal);
          if (!isNaN(pt) && pt > 0) {
            recMap[key].parcelasTotal = pt;
          }
        }

        // Fallback: tentar obter informações de parcela de outros campos
        if (!recMap[key].parcelaAtual) {
          // Tentar outros campos possíveis para parcela atual
          var camposParcela = ['parcela', 'parcelaAtual', 'currentInstallment', 'installment', 'parcelaAtualNumero'];
          for (var i = 0; i < camposParcela.length; i++) {
            var campo = camposParcela[i];
            if (trr[campo] !== null && trr[campo] !== undefined) {
              var valor = Number(trr[campo]);
              if (!isNaN(valor) && valor > 0) {
                recMap[key].parcelaAtual = Math.max(recMap[key].parcelaAtual || 0, valor);
                break;
              }
            }
          }
        }

        if (!recMap[key].parcelasTotal) {
          // Tentar outros campos possíveis para total de parcelas
          var camposTotal = ['totalParcelas', 'parcelasTotal', 'totalInstallments', 'installments', 'parcelasTotalNumero'];
          for (var j = 0; j < camposTotal.length; j++) {
            var campoTotal = camposTotal[j];
            if (trr[campoTotal] !== null && trr[campoTotal] !== undefined) {
              var valorTotal = Number(trr[campoTotal]);
              if (!isNaN(valorTotal) && valorTotal > 0) {
                recMap[key].parcelasTotal = valorTotal;
                break;
              }
            }
          }
        }

        // Fallback final: se não temos dados de parcela, usar o count como parcela atual
        if (!recMap[key].parcelaAtual && recMap[key].count > 0) {
          recMap[key].parcelaAtual = recMap[key].count;
          console.log('🔧 [Dashboard] Usando count como parcela atual para', recMap[key].nome, ':', recMap[key].count);
        }

        // Fallback final: se não temos total de parcelas, assumir que é uma parcela única ou usar um valor padrão
        if (!recMap[key].parcelasTotal && recMap[key].parcelaAtual) {
          // Se só tem 1 transação, provavelmente é parcela única
          if (recMap[key].count === 1) {
            recMap[key].parcelasTotal = 1;
            console.log('🔧 [Dashboard] Assumindo parcela única para', recMap[key].nome);
          } else {
            // Se tem múltiplas transações, assumir que é o dobro da parcela atual (estimativa)
            recMap[key].parcelasTotal = Math.max(recMap[key].parcelaAtual * 2, recMap[key].count);
            console.log('🔧 [Dashboard] Estimando total de parcelas para', recMap[key].nome, ':', recMap[key].parcelasTotal);
          }
        }
      } catch {}
    }
    var topRec = [];
    for (var rkey in recMap) {
      if (Object.prototype.hasOwnProperty.call(recMap, rkey)) {
        // Debug: mostrar informações de parcela encontradas
        if (recMap[rkey].parcelaAtual || recMap[rkey].parcelasTotal) {
          console.log('🔍 [Dashboard] Recorrente com dados de parcela:', {
            nome: recMap[rkey].nome,
            parcelaAtual: recMap[rkey].parcelaAtual,
            parcelasTotal: recMap[rkey].parcelasTotal,
            count: recMap[rkey].count
          });
        }
        topRec.push({
          key: rkey,
          nome: recMap[rkey].nome,
          total: recMap[rkey].total,
          count: recMap[rkey].count,
          parcelaAtual: recMap[rkey].parcelaAtual,
          parcelasTotal: recMap[rkey].parcelasTotal
        });
      }
    }
    topRec.sort(function(a,b){ return b.total - a.total; });
    if (topRec.length > 5) topRec = topRec.slice(0,5);

    html += '      <div class="mb-12 draggable-card" data-card-type="top-recorrentes">';
    html += '        <div class="drag-handle"></div>';
    html += '        <div class="flex items-center justify-between gap-2 mb-6">';
    html += '          <div class="flex items-center gap-2">';
    html += '            <div class="w-1 h-6 bg-gradient-to-b from-emerald-500 to-teal-500 rounded-full"></div>';
    html += '            <h2 class="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100">♻️ Top Recorrentes</h2>';
    html += '          </div>';
    html += '          <div class="text-sm text-gray-500 dark:text-gray-400">';
    html += '            <span class="font-medium">' + topRec.length + '</span> itens';
    html += '          </div>';
    html += '        </div>';
    html += '        <div class="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">';
    if (!topRec.length) {
      html += '          <div class="empty-state p-12 text-center">';
      html += '            <div class="empty-icon text-6xl mb-6">♻️</div>';
      html += '            <div class="empty-text text-xl font-bold mb-3 text-gray-900 dark:text-gray-100">Sem recorrentes neste período</div>';
      html += '            <div class="empty-description text-gray-500 dark:text-gray-400 mb-6">Despesas recorrentes cadastradas aparecerão aqui</div>';
      html += '            <button onclick="window.showAddRecorrenteModal && window.showAddRecorrenteModal()" class="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 flex items-center gap-2 mx-auto">';
      html += '              <span class="text-lg">➕</span>';
      html += '              <span>Nova Recorrente</span>';
      html += '            </button>';
      html += '          </div>';
    } else {
      html += '          <div class="divide-y divide-gray-100 dark:divide-gray-800">';
      for (var tr=0; tr<topRec.length; tr++) {
        var parcStr = '';
        // var parcelaInfo = ''; // Não utilizado
        // var statusInfo = ''; // Não utilizado
        var progressBar = '';
        var statusColor = 'emerald';
        var statusIcon = '🔄';
        var statusText = 'Ativa';
        // var cardClass = 'bg-white dark:bg-gray-900'; // Não utilizado
        // var headerClass = 'bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-gray-800 dark:to-gray-800'; // Não utilizado
        
        try {
          if ((topRec[tr].parcelaAtual !== null && topRec[tr].parcelaAtual !== undefined) && (topRec[tr].parcelasTotal !== null && topRec[tr].parcelasTotal !== undefined)) {
            var parcelaAtual = Number(topRec[tr].parcelaAtual);
            var parcelasTotal = Number(topRec[tr].parcelasTotal);
            var parcelasRestantes = parcelasTotal - parcelaAtual;
            var progressoPercentual = Math.round((parcelaAtual / parcelasTotal) * 100);

            // Formatação melhorada das parcelas com cores dinâmicas
            var badgeColor = 'blue';
            if (progressoPercentual >= 75) badgeColor = 'yellow';
            if (progressoPercentual >= 90) badgeColor = 'orange';
            if (parcelasRestantes === 0) badgeColor = 'green';
            
            parcStr = '<span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-' + badgeColor + '-100 text-' + badgeColor + '-800 dark:bg-' + badgeColor + '-900 dark:text-' + badgeColor + '-200 ml-3 border border-' + badgeColor + '-200 dark:border-' + badgeColor + '-700">' +
                     String(parcelaAtual) + '/' + String(parcelasTotal) + '</span>';

            // Status e informações baseadas no progresso
            if (parcelasRestantes > 0) {
              if (progressoPercentual >= 90) {
                statusColor = 'orange';
                statusIcon = '⚡';
                statusText = 'Quase Finalizada';
                // headerClass = 'bg-gradient-to-r from-orange-50 to-yellow-50 dark:from-gray-800 dark:to-gray-800';
              } else if (progressoPercentual >= 75) {
                statusColor = 'yellow';
                statusIcon = '📈';
                statusText = 'Em Andamento';
                // headerClass = 'bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-gray-800 dark:to-gray-800';
              } else {
                statusColor = 'emerald';
                statusIcon = '🔄';
                statusText = 'Ativa';
                // headerClass = 'bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-gray-800 dark:to-gray-800';
              }
              
              // statusInfo = '<div class="flex items-center justify-between text-sm mb-3">';
              // statusInfo += '<div class="flex items-center gap-2">';
              // statusInfo += '<span class="text-gray-600 dark:text-gray-400">' + (parcelasRestantes === 1 ? '1 parcela restante' : parcelasRestantes + ' parcelas restantes') + '</span>';
              // statusInfo += '<span class="w-1 h-1 bg-gray-400 rounded-full"></span>';
              // statusInfo += '<span class="text-gray-500 dark:text-gray-500 text-xs">' + parcelaAtual + ' de ' + parcelasTotal + '</span>';
              // statusInfo += '</div>';
              // statusInfo += '<span class="font-bold text-' + statusColor + '-600 dark:text-' + statusColor + '-400 text-lg">' + progressoPercentual + '%</span>';
              // statusInfo += '</div>';
              
              progressBar = '<div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4 overflow-hidden shadow-inner">';
              progressBar += '<div class="bg-gradient-to-r from-' + statusColor + '-400 to-' + statusColor + '-500 h-4 rounded-full transition-all duration-700 ease-out relative flex items-center justify-end pr-2" style="width: ' + progressoPercentual + '%">';
              progressBar += '<div class="absolute inset-0 bg-white opacity-20 rounded-full"></div>';
              progressBar += '<span class="text-xs font-bold text-white relative z-10">' + progressoPercentual + '%</span>';
              progressBar += '</div>';
              progressBar += '</div>';
            } else if (parcelasRestantes === 0) {
              statusColor = 'green';
              statusIcon = '✅';
              statusText = 'Finalizada';
              // headerClass = 'bg-gradient-to-r from-green-50 to-emerald-50 dark:from-gray-800 dark:to-gray-800';
              // statusInfo = '<div class="flex items-center justify-between text-sm mb-3">';
              // statusInfo += '<div class="flex items-center gap-2">';
              // statusInfo += '<span class="text-green-600 dark:text-green-400 font-medium">Recorrente finalizada</span>';
              // statusInfo += '<span class="w-1 h-1 bg-green-400 rounded-full"></span>';
              // statusInfo += '<span class="text-green-500 dark:text-green-500 text-xs">' + parcelasTotal + ' parcelas</span>';
              // statusInfo += '</div>';
              // statusInfo += '<span class="font-bold text-green-600 dark:text-green-400 text-lg">100%</span>';
              // statusInfo += '</div>';
              
              progressBar = '<div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4 overflow-hidden shadow-inner">';
              progressBar += '<div class="bg-gradient-to-r from-green-400 to-emerald-500 h-4 rounded-full relative flex items-center justify-end pr-2">';
              progressBar += '<div class="absolute inset-0 bg-white opacity-20 rounded-full"></div>';
              progressBar += '<span class="text-xs font-bold text-white relative z-10">100%</span>';
              progressBar += '</div>';
              progressBar += '</div>';
            }
          }
        } catch {}

        html += '            <div class="p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200 border-b border-gray-100 dark:border-gray-800 last:border-b-0">';
        html += '              <div class="flex items-center justify-between gap-4">';
        html += '                <div class="flex items-center gap-3 flex-1 min-w-0">';
        html += '                  <div class="w-10 h-10 rounded-lg flex items-center justify-center text-lg bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-gray-700 border border-blue-200 dark:border-gray-600">';
        html += '                    ' + statusIcon;
        html += '                  </div>';
        html += '                  <div class="flex-1 min-w-0">';
        html += '                    <div class="flex items-center gap-2 mb-1">';
        html += '                      <h3 class="font-semibold text-gray-900 dark:text-gray-100 truncate">' + (topRec[tr].nome || 'Recorrente') + '</h3>';
        html += '                      ' + parcStr;
        html += '                    </div>';
        html += '                    <div class="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">';
        html += '                      <span class="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">' + String(topRec[tr].count) + ' transações</span>';
        html += '                      <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-' + statusColor + '-100 text-' + statusColor + '-800 dark:bg-' + statusColor + '-900 dark:text-' + statusColor + '-200">';
        html += '                        ' + statusText;
        html += '                      </span>';
        html += '                    </div>';
        html += '                  </div>';
        html += '                </div>';
        html += '                <div class="text-right">';
        html += '                  <div class="text-lg font-bold text-gray-900 dark:text-gray-100">R$ ' + Number(topRec[tr].total || 0).toFixed(2) + '</div>';
        html += '                  <div class="text-xs text-gray-500 dark:text-gray-400">total</div>';
        html += '                </div>';
        html += '              </div>';
        html += '              ' + (progressBar ? '<div class="mt-3">' + progressBar + '</div>' : '');
        html += '            </div>';
      }
      html += '          </div>';
    }
    html += '        </div>';
    html += '      </div>';
  } catch {}

  // Categorias Inteligentes (Unificado: Limites + Top Gastos)
  try {
    // Construir matriz com gasto por categoria (despesas) e dados de limite
    var categoriasComDados = [];
    for (var ci2 = 0; ci2 < cats.length; ci2++) {
      var c2 = cats[ci2]; if (!c2) continue;
      var catId = c2.id; var lim2 = parseAmount(c2.limite);
      var tipoCat2 = (c2.tipo || 'despesa');
      // Gasto do mês nesta categoria, considerando apenas despesas
      var gasto2 = 0;
      for (var ti=0; ti<tx.length; ti++) {
        var tt = tx[ti];
        var cidMatch = (tt.categoriaId || tt.categoryId) === catId;
        var isDesp = (tt.tipo || 'despesa') === 'despesa';
        if (cidMatch && isDesp) {
          gasto2 += Math.abs(parseAmount(tt.valor !== null && tt.valor !== undefined ? tt.valor : tt.amount));
        }
      }
      categoriasComDados.push({
        id: catId,
        nome: c2.nome || 'Categoria',
        cor: c2.cor || '#4F46E5',
        tipo: tipoCat2,
        limite: lim2,
        gasto: gasto2
      });
    }

    // Lógica inteligente: priorizar categorias com limites, depois top gastos
    var categoriasComLimite = categoriasComDados.filter(function(x){ return (x.limite || 0) > 0 && (x.tipo || 'despesa') === 'despesa'; })
      .map(function(cat){
        var limite = Number(cat.limite || 0);
        var porcent = limite > 0 ? (cat.gasto / limite) * 100 : 0;
        return { ...cat, porcentagem: porcent, temLimite: true };
      })
      .sort(function(a,b){
        var aEx = a.gasto > a.limite; var bEx = b.gasto > b.limite;
        if (aEx && !bEx) return -1; if (!aEx && bEx) return 1; return b.porcentagem - a.porcentagem;
      });

    var categoriasComGasto = categoriasComDados.filter(function(x){ return x.gasto > 0 && (x.tipo || 'despesa') === 'despesa'; })
      .map(function(cat){ return { ...cat, temLimite: false }; })
      .sort(function(a,b){ return b.gasto - a.gasto; });

    // Unificar: pegar categorias com limite primeiro, depois completar com top gastos (evitando duplicatas)
    var categoriasUnificadas = [];
    var idsJaAdicionados = new Set();

    // Adicionar categorias com limite (máximo 4)
    for (var i = 0; i < Math.min(4, categoriasComLimite.length); i++) {
      categoriasUnificadas.push(categoriasComLimite[i]);
      idsJaAdicionados.add(categoriasComLimite[i].id);
    }

    // Completar com top gastos (evitando duplicatas)
    for (var j = 0; j < categoriasComGasto.length && categoriasUnificadas.length < 6; j++) {
      if (!idsJaAdicionados.has(categoriasComGasto[j].id)) {
        var catGasto = categoriasComGasto[j];
        // Verificar se esta categoria tem limite (pode ter sido perdida na primeira filtragem)
        var temLimiteReal = (catGasto.limite || 0) > 0;
        if (temLimiteReal) {
          var limite = Number(catGasto.limite || 0);
          var porcent = limite > 0 ? (catGasto.gasto / limite) * 100 : 0;
          catGasto = { ...catGasto, porcentagem: porcent, temLimite: true };
        }
        categoriasUnificadas.push(catGasto);
        idsJaAdicionados.add(catGasto.id);
      }
    }

    html += '      <div class="mb-12 draggable-card" data-card-type="categorias-inteligentes">';
    html += '        <div class="drag-handle"></div>';
    html += '        <div class="flex items-center gap-2 mb-4">';
    html += '          <div class="w-1 h-6 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full"></div>';
    html += '          <h2 class="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100">📊 Categorias Inteligentes</h2>';
    html += '        </div>';

    // Seção Unificada
    html += '        <div class="u-card overflow-hidden">';
    html += '          <div class="bg-gradient-to-r from-purple-50 via-blue-50 to-orange-50 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 p-4 border-b border-gray-200 dark:border-gray-700">';
    html += '            <div class="flex justify-between items-center gap-4">';
    html += '              <div>';
    html += '                <h3 class="text-lg font-bold text-gray-900 dark:text-gray-100">🎯 Visão Inteligente</h3>';
    html += '                <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">Limites prioritários + maiores gastos</p>';
    html += '              </div>';
    html += '              <button id="add-category-dashboard-btn" class="btn btn-primary btn-sm">+ Nova</button>';
    html += '            </div>';
    html += '          </div>';
    html += '          <div class="p-4">';

    if (categoriasUnificadas.length === 0) {
      html += '            <div class="empty-state">';
      html += '              <div class="empty-icon">📂</div>';
      html += '              <div class="empty-text">Nenhuma categoria encontrada</div>';
      html += '              <div class="empty-description">Crie categorias e adicione gastos para ver o resumo</div>';
      html += '            </div>';
    } else {
      for (var u = 0; u < categoriasUnificadas.length; u++) {
        var catU = categoriasUnificadas[u];
        var limiteU = Number(catU.limite || 0);
        var porcentU = limiteU > 0 ? (catU.gasto / limiteU) * 100 : 0;

        // Determinar ícone e cor baseado no tipo e status
        var icone, corBarra, tagInfo;
        if (catU.temLimite) {
          // Categoria com limite - usar lógica de controle
          if (porcentU >= 100) { icone = '🚨'; corBarra = 'bg-red-500'; tagInfo = 'EXCEDEU'; }
          else if (porcentU >= 90) { icone = '⚠️'; corBarra = 'bg-red-400'; tagInfo = 'CRÍTICO'; }
          else if (porcentU >= 75) { icone = '⚡'; corBarra = 'bg-yellow-500'; tagInfo = 'ALERTA'; }
          else if (porcentU >= 50) { icone = '📊'; corBarra = 'bg-orange-500'; tagInfo = 'ATENÇÃO'; }
          else { icone = '✅'; corBarra = 'bg-green-500'; tagInfo = 'OK'; }
        } else {
          // Categoria sem limite - usar ranking
          var posicao = u + 1;
          if (posicao === 1) { icone = '🥇'; tagInfo = '1º LUGAR'; }
          else if (posicao === 2) { icone = '🥈'; tagInfo = '2º LUGAR'; }
          else if (posicao === 3) { icone = '🥉'; tagInfo = '3º LUGAR'; }
          else { icone = '📈'; tagInfo = 'TOP ' + posicao; }
          corBarra = 'bg-blue-500';
        }

        var ringCls = catU.temLimite && porcentU >= 90 ? ' ring-2 ring-red-200 dark:ring-red-800' : '';
        html += '            <div class="bg-gray-50 dark:bg-gray-800 rounded-xl p-3 border border-gray-200 dark:border-gray-700' + ringCls + ' mb-3">';
        html += '              <div class="flex items-center justify-between mb-2 gap-4">';
        html += '                <div class="flex items-center gap-2">';
        html += '                  <span class="text-lg">' + icone + '</span>';
        html += '                  <div class="w-3 h-3 rounded-full" style="background-color: ' + catU.cor + '"></div>';
        html += '                  <span class="font-medium text-sm text-gray-900 dark:text-gray-100">' + catU.nome + '</span>';
        if (tagInfo) {
          var tagColor = catU.temLimite && porcentU >= 90 ? 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300' : 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300';
          html += '                  <span class="text-xs px-2 py-1 rounded-full font-medium ' + tagColor + '">' + tagInfo + '</span>';
        }
        html += '                </div>';
        html += '                <span class="font-bold text-sm ' + (catU.temLimite && catU.gasto > limiteU ? 'text-red-600' : 'text-gray-900 dark:text-gray-100') + '">R$ ' + formatBR(catU.gasto) + '</span>';
        html += '              </div>';

        if (catU.temLimite) {
          html += '              <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">';
          html += '                <span>Limite: R$ ' + formatBR(limiteU) + '</span>';
          var percClass = porcentU >= 100 ? 'text-red-600 font-bold' : (porcentU >= 90 ? 'text-orange-600 font-medium' : '');
          html += '                <span class="' + percClass + '">' + porcentU.toFixed(1) + '%</span>';
          html += '              </div>';
          html += '              <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">';
          html += '                <div class="' + corBarra + ' h-2 rounded-full transition-all duration-300" style="width: ' + Math.min(porcentU, 100) + '%"></div>';
          html += '              </div>';
          if (porcentU >= 100) {
            html += '              <div class="mt-2 text-xs text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900 dark:bg-opacity-20 px-2 py-1 rounded">Excedeu em R$ ' + formatBR(catU.gasto - limiteU) + '</div>';
          }
        } else {
          html += '              <p class="text-xs text-gray-500 dark:text-gray-400">Sem limite definido • Posição por gasto</p>';
        }
        html += '            </div>';
      }
    }
    html += '          </div>';
    html += '        </div>';
    html += '      </div>';
  } catch {}

  // Recent transactions (last 5)
  try {
    var recent = tx.slice().sort(function(a,b){
      var da = getTxDate(a) || new Date(0);
      var db = getTxDate(b) || new Date(0);
      return db - da;
    }).slice(0,5);
    html += '      <div class="mb-12 draggable-card" data-card-type="atividade-recente">';
    html += '        <div class="drag-handle"></div>';
    html += '        <div class="flex items-center justify-between gap-2 mb-6">';
    html += '          <div class="flex items-center gap-2">';
    html += '            <div class="w-1 h-6 bg-gradient-to-b from-green-500 to-blue-500 rounded-full"></div>';
    html += '            <h2 class="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100">💳 Atividade Recente</h2>';
    html += '          </div>';
    html += '          <div class="text-sm text-gray-500 dark:text-gray-400">';
    html += '            <span class="font-medium">' + recent.length + '</span> transações';
    html += '          </div>';
    html += '        </div>';
    html += '        <div class="u-card overflow-hidden">';
    html += '          <div class="bg-gradient-to-r from-green-50 to-blue-50 dark:from-gray-800 dark:to-gray-800 p-4 border-b border-gray-200 dark:border-gray-700">';
    html += '            <div class="flex flex-wrap justify-between items-center gap-2">';
    html += '              <h3 class="text-lg md:text-xl font-bold text-gray-900 dark:text-gray-100">Últimas Transações</h3>';
    html += '              <button onclick="window.showAddTransactionModal && window.showAddTransactionModal()" class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 shadow-md hover:shadow-lg">';
    html += '                + Nova Transação';
    html += '              </button>';
    html += '            </div>';
    html += '          </div>';
    if (recent.length === 0) {
      html += '          <div class="empty-state p-8">';
      html += '            <div class="empty-icon text-4xl mb-4">🧾</div>';
      html += '            <div class="empty-text text-lg font-medium mb-2">Sem transações neste período</div>';
      html += '            <div class="empty-description text-sm text-gray-500 dark:text-gray-400 mb-4">Adicione transações para acompanhar seus gastos e receitas</div>';
      html += '            <button class="btn btn-primary" onclick="window.showAddTransactionModal && window.showAddTransactionModal()">Adicionar transação</button>';
      html += '          </div>';
    } else {
      html += '          <div class="divide-y divide-gray-100 dark:divide-gray-800">';
      for (var r=0;r<recent.length;r++) {
        var rt = recent[r];
        var cat = cats.find(function(c){ return c.id === (rt.categoriaId || rt.categoryId); });
        var sign = (rt.tipo || 'despesa') === 'receita' ? '+' : '-';
        var amount = Math.abs(parseAmount(rt.valor !== null && rt.valor !== undefined ? rt.valor : rt.amount));
        var d = getTxDate(rt);
        var dStr = d ? d.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' }) : '';
        var isReceita = (rt.tipo || 'despesa') === 'receita';
        
        // parcela info quando recorrente
        // var parcInfo = ''; // Não utilizado
        var parcelaBadge = '';
        try {
          if (rt.recorrenteId && (rt.parcelaAtual || rt.parcelasTotal)) {
            var pa = (rt.parcelaAtual !== null && rt.parcelaAtual !== undefined) ? rt.parcelaAtual : '';
            var pt = (rt.parcelasTotal !== null && rt.parcelasTotal !== undefined) ? rt.parcelasTotal : '';
            if (pa || pt) {
              // parcInfo = ' • ' + (pa || '?') + '/' + (pt || '?'); // Não utilizado
              parcelaBadge = '<span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 ml-2">' + (pa || '?') + '/' + (pt || '?') + '</span>';
            }
          }
        } catch {}
        
        // Ícone baseado no tipo
        var tipoIcon = isReceita ? '💰' : '💸';
        
        html += '            <div class="p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200">';
        html += '              <div class="flex items-start justify-between gap-4">';
        html += '                <div class="flex items-start gap-3 min-w-0 flex-1">';
        html += '                  <div class="flex-shrink-0 mt-1">';
        html += '                    <div class="w-10 h-10 rounded-full flex items-center justify-center text-lg" style="background-color: ' + (cat && cat.cor || '#6B7280') + '20; color: ' + (cat && cat.cor || '#6B7280') + '">';
        html += '                      ' + tipoIcon;
        html += '                    </div>';
        html += '                  </div>';
        html += '                  <div class="min-w-0 flex-1">';
        html += '                    <div class="flex items-center gap-2 mb-1">';
        html += '                      <h4 class="font-semibold text-gray-900 dark:text-gray-100 truncate">' + (rt.descricao || rt.description || 'Transação') + '</h4>';
        html += '                      ' + parcelaBadge;
        html += '                    </div>';
        html += '                    <div class="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">';
        html += '                      <span class="font-medium">' + (cat && cat.nome || 'Sem categoria') + '</span>';
        html += '                      <span>•</span>';
        html += '                      <span>' + dStr + '</span>';
        html += '                    </div>';
        html += '                  </div>';
        html += '                </div>';
        html += '                <div class="text-right flex-shrink-0">';
        html += '                  <div class="text-lg font-bold ' + (isReceita ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400') + '">' + sign + 'R$ ' + formatBR(amount) + '</div>';
        html += '                  <div class="text-xs text-gray-500 dark:text-gray-400">' + (isReceita ? 'receita' : 'despesa') + '</div>';
        html += '                </div>';
        html += '              </div>';
        html += '            </div>';
      }
      html += '          </div>';
    }
    html += '        </div>';
    html += '      </div>';
  } catch {}

  html += '    </div>';
  html += '  </div>';
  html += '</div>';

  target.innerHTML = html;

  // Mount or update period indicator (reutilizável)
  try { mountPeriodIndicator('#dash-period-indicator'); } catch {}

  // Inicializar drag and drop e funcionalidades de exportação
  try { initDashboardDragDrop(); } catch {}

  // Modal seguro para categorias em alerta (>=70% do limite)
  try {
    window.showCategoriasAlertaModal = async function() {
      try {
        const now2 = new Date();
        const y2 = (window.appState && window.appState.selectedYear) || now2.getFullYear();
        const m2 = (window.appState && window.appState.selectedMonth) || (now2.getMonth() + 1);
        const ym2 = String(y2) + '-' + String(m2).padStart(2, '0');

        // Recalcular gastos por categoria do mês atual
        const allTx = Array.isArray(window.appState?.transactions) ? window.appState.transactions : [];
        const monthTx = allTx.filter(function(t){ return getYearMonthKey(getTxDate(t)) === ym2; });
        const allCats = Array.isArray(window.appState?.categories) ? window.appState.categories : [];

        const catsData = allCats
          .filter(function(c){ return (c && (c.tipo || 'despesa') === 'despesa' && parseAmount(c.limite) > 0); })
          .map(function(c){
            var gasto = 0;
            for (var i=0;i<monthTx.length;i++) {
              var t = monthTx[i];
              if ((t.tipo || 'despesa') !== 'despesa') continue;
              var cid = t.categoriaId || t.categoryId;
              if (cid === c.id) gasto += Math.abs(parseAmount(t.valor !== null && t.valor !== undefined ? t.valor : t.amount));
            }
            var limite = parseAmount(c.limite);
            var pct = limite > 0 ? (gasto / limite) * 100 : 0;
            return {
              id: c.id,
              nome: c.nome || 'Categoria',
              cor: c.cor || '#4F46E5',
              limite: limite,
              gasto: gasto,
              pct: pct
            };
          })
          .filter(function(x){ return x.pct >= 70; })
          .sort(function(a,b){ return b.pct - a.pct; });

        const headerNote = '<div class="mb-3 text-xs text-gray-600 dark:text-gray-300">Mostrando categorias com uso do limite ≥ 70% em ' + monthName + ' ' + year + '.</div>';

        let bodyHtml = headerNote;
        if (!catsData.length) {
          bodyHtml += '<div class="text-center py-6">\
            <div class="text-3xl mb-2">✅</div>\
            <div class="text-gray-700 dark:text-gray-200">Nenhuma categoria em alerta</div>\
          </div>';
        } else {
          bodyHtml += '<div class="space-y-3">';
          for (var k=0;k<catsData.length;k++) {
            var c3 = catsData[k];
            var barCls = (c3.pct >= 100) ? 'bg-red-500' : (c3.pct >= 90) ? 'bg-red-400' : (c3.pct >= 75) ? 'bg-yellow-500' : 'bg-orange-500';
            bodyHtml += '\
              <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-3 border border-gray-200 dark:border-gray-700">\
                <div class="flex items-center justify-between mb-2">\
                  <div class="flex items-center gap-2">\
                    <div class="w-3 h-3 rounded-full" style="background-color:' + c3.cor + '"></div>\
                    <span class="font-medium text-sm text-gray-900 dark:text-gray-100">' + c3.nome + '</span>\
                  </div>\
                  <span class="font-bold text-sm ' + (c3.pct>=100 ? 'text-red-600' : (c3.pct>=90 ? 'text-orange-600' : 'text-gray-900 dark:text-gray-100')) + '">R$ ' + formatBR(c3.gasto) + '</span>\
                </div>\
                <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">\
                  <span>Limite: R$ ' + formatBR(c3.limite) + '</span>\
                  <span>' + c3.pct.toFixed(1) + '%</span>\
                </div>\
                <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">\
                  <div class="' + barCls + ' h-2 rounded-full" style="width:' + Math.min(c3.pct, 100).toFixed(1) + '%"></div>\
                </div>\
                <div class="mt-1 text-[11px] text-gray-500 dark:text-gray-400">Restante: R$ ' + formatBR(Math.max(c3.limite - c3.gasto, 0)) + '</div>\
              </div>';
          }
          bodyHtml += '</div>';
        }
        const { Modal } = await import('@js/ui/Modal.js');
        const overlay = Modal({ title: 'Categorias em alerta', content: bodyHtml, onClose: function(){ try{ document.getElementById('app-modal')?.remove(); } catch{} } });
        document.body.appendChild(overlay);
      } catch (err) {
        console.error('Falha ao abrir modal de categorias em alerta', err);
        try { alert('Erro ao abrir modal: ' + (err?.message || err)); } catch {}
      }
    };
  } catch {}

  // Inicializar handlers do Dashboard
  setupDashboardHandlers();

  // Configurar botão de adicionar categoria no dashboard
  setTimeout(() => {
    const addCategoryBtn = document.getElementById('add-category-dashboard-btn');
    if (addCategoryBtn) {
      console.log('🔧 Configurando botão + Nova categoria no dashboard');
      addCategoryBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        console.log('🔧 Botão + Nova categoria clicado');

        if (window.showAddCategoryModal) {
          console.log('🔧 Abrindo modal de categoria...');
          window.showAddCategoryModal();
        } else {
          console.error('❌ window.showAddCategoryModal não está disponível');
          alert('Função de adicionar categoria não está disponível');
        }
      });
      console.log('✅ Botão + Nova categoria configurado');
    } else {
      console.warn('⚠️ Botão add-category-dashboard-btn não encontrado');
    }
  }, 100);
}

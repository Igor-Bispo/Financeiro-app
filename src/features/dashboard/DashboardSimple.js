// Minimal, safe dashboard that calculates and renders summary using plain strings
import { eventBus } from '@core/events/eventBus.js';
import { mountPeriodIndicator } from '../../ui/PeriodIndicator.js';
import { setupDashboardHandlers } from './DashboardHandlers.js';
import { initDashboardDragDrop } from './DashboardDragDrop.js';

let listenersAttached = false;
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
      // Only rerender when the active route is Dashboard by omitting the container (route guard at top)
      const rerender = () => queueMicrotask(() => renderDashboard());
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
  var totalTransacoes = tx.length;

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
  var saldoTotalCategorias = 0;
  var totalLimitesCategorias = 0;
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
        var saldoCat = limv - gasto;
        saldoTotalCategorias += saldoCat;
        totalLimitesCategorias += limv;
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
  var diaAtual = new Date().getDate();
  var diasRestantes = Math.max(1, ultimoDiaDoMes - diaAtual + 1);
  
  // Meta diária global (considerando despesas já realizadas)
  // saldoTotalCategorias já é o saldo restante (limite - gasto), não precisa subtrair despesas novamente
  var saldoRestanteOrcamento = saldoTotalCategorias;
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
  html += '              <button id="export-dashboard-btn" class="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-1">';
  html += '                <span>📤</span>';
  html += '                Exportar Resumo';
  html += '              </button>';
  html += '              <button id="reset-layout-btn" class="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-1">';
  html += '                <span>🔄</span>';
  html += '                Resetar Layout';
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
  html += '              <div class="text-lg font-bold ' + (saldo >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400') + '">R$ ' + formatBR(Math.abs(saldo)) + '</div>';
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
  // Saldo Principal (mais importante)
  html += '              <div class="flex justify-between text-sm border-b border-gray-200 dark:border-gray-600 pb-2">';
  html += '                <span class="text-gray-600 dark:text-gray-400 font-medium">💰 Saldo do Mês:</span>';
  html += '                <span class="font-bold text-lg ' + (saldo >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400') + '">R$ ' + formatBR(saldo) + '</span>';
  html += '              </div>';
  
  // Meta Diária (destaque principal) - sempre visível
  html += '              <div class="flex justify-between text-xs bg-blue-50 dark:bg-blue-900/20 p-2 rounded-lg border border-blue-200 dark:border-blue-800 mb-2">';
  html += '                <span class="text-gray-600 dark:text-gray-400 font-medium">💡 Meta Diária (Orçamento):</span>';
  html += '                <span class="font-bold text-blue-600 dark:text-blue-400">R$ ' + formatBR(metaDiariaGlobal) + '/dia</span>';
  html += '              </div>';
  
  // Meta Diária para Bater as Receitas - sempre visível
  html += '              <div class="flex justify-between text-xs bg-green-50 dark:bg-green-900/20 p-2 rounded-lg border border-green-200 dark:border-green-800 mb-2">';
  html += '                <span class="text-gray-600 dark:text-gray-400 font-medium">💰 Meta Diária (100% Receitas):</span>';
  html += '                <span class="font-bold ' + (metaDiariaReceitasCompletas > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400') + '">R$ ' + formatBR(metaDiariaReceitasCompletas) + '/dia</span>';
  html += '              </div>';
  
  // Meta Diária Conservadora baseada nas Receitas - sempre visível
  html += '              <div class="flex justify-between text-xs bg-yellow-50 dark:bg-yellow-900/20 p-2 rounded-lg border border-yellow-200 dark:border-yellow-800 mb-2">';
  html += '                <span class="text-gray-600 dark:text-gray-400 font-medium">⚠️ Meta Diária (Conservadora):</span>';
  html += '                <span class="font-bold ' + (metaDiariaConservadora > 0 ? 'text-yellow-600 dark:text-yellow-400' : 'text-red-600 dark:text-red-400') + '">R$ ' + formatBR(metaDiariaConservadora) + '/dia</span>';
  html += '              </div>';
  
  
  // Progresso do Orçamento (só se houver orçamento)
  if (orcado > 0) {
    const saldoOrcamento = orcado - despesas;
    html += '              <div class="flex justify-between text-xs mb-1">';
    html += '                <span class="text-gray-600 dark:text-gray-400">📊 Orçamento Total:</span>';
    html += '                <span class="font-medium text-blue-600 dark:text-blue-400">R$ ' + formatBR(orcado) + '</span>';
    html += '              </div>';
    html += '              <div class="flex justify-between text-xs mb-1">';
    html += '                <span class="text-gray-600 dark:text-gray-400">💰 Pode Gastar:</span>';
    html += '                <span class="font-medium ' + (saldoOrcamento >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400') + '">R$ ' + formatBR(Math.abs(saldoOrcamento)) + '</span>';
    html += '              </div>';
    html += '              <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 mb-2">';
    html += '                <div class="h-1.5 rounded-full ' + (progressoOrcado > 0.7 ? 'bg-red-500' : 'bg-green-500') + '" style="width: ' + Math.min(progressoOrcado * 100, 100) + '%"></div>';
    html += '              </div>';
  }
  
  // Alertas (só se houver alertas)
  if (totalAlertas > 0) {
    html += '              <div class="flex justify-between text-xs cursor-pointer hover:bg-red-50 dark:hover:bg-red-900/20 p-1 rounded transition-colors border border-red-200 dark:border-red-800" id="alertas-categorias-btn" title="Clique para ver categorias em alerta">';
    html += '                <span class="text-red-600 dark:text-red-400 font-medium">🚨 Alertas:</span>';
    html += '                <span class="font-bold text-red-600 dark:text-red-400">' + totalAlertas + ' categoria(s)</span>';
    html += '              </div>';
  }
  
  // Insights Inteligentes (só se houver orçamento)
  if (orcado > 0) {
    html += '              <div class="border-t border-gray-200 dark:border-gray-600 pt-2 mt-2">';
    html += '                <div class="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">💡 Análise e Recomendações:</div>';
    
    // Cobertura das receitas
    if (analiseOrcamento.coberturaOrcamento >= 100) {
      html += '                <div class="text-xs text-green-600 dark:text-green-400">✅ Receitas cobrem 100% do orçamento</div>';
    } else if (analiseOrcamento.coberturaOrcamento >= 80) {
      html += '                <div class="text-xs text-yellow-600 dark:text-yellow-400">⚠️ Receitas cobrem ' + analiseOrcamento.coberturaOrcamento.toFixed(0) + '% do orçamento</div>';
    } else {
      html += '                <div class="text-xs text-red-600 dark:text-red-400">❌ Receitas cobrem apenas ' + analiseOrcamento.coberturaOrcamento.toFixed(0) + '% do orçamento</div>';
    }
    
    // Déficit do orçamento
    if (analiseOrcamento.deficitOrcamento > 0) {
      html += '                <div class="text-xs text-orange-600 dark:text-orange-400">📊 Faltam receitas: R$ ' + formatBR(analiseOrcamento.deficitOrcamento) + '</div>';
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
    
    
    // Informação sobre recálculo dinâmico
    html += '                  <div class="text-blue-600 dark:text-blue-400 text-xs mt-2 p-2 bg-blue-50 dark:bg-blue-900/20 rounded">';
    html += '                    <div class="font-medium">🔄 Recálculo Dinâmico:</div>';
    html += '                    <div>• Dias restantes: ' + diasRestantes + ' dias</div>';
    html += '                    <div>• Gasto médio atual: R$ ' + formatBR(despesas / (ultimoDiaDoMes - diasRestantes + 1)) + '/dia</div>';
    html += '                  </div>';
    if (analiseOrcamento.saldoPositivo && analiseOrcamento.coberturaOrcamento >= 100) {
      html += '                  <div class="text-green-600 dark:text-green-400">• Excelente controle financeiro!</div>';
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
    html += '        <div class="flex items-center gap-2 mb-4">';
    html += '          <div class="w-1 h-6 bg-gradient-to-b from-emerald-500 to-teal-500 rounded-full"></div>';
    html += '          <h2 class="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100">♻️ Top Recorrentes</h2>';
    html += '        </div>';
    html += '        <div class="u-card p-4">';
    if (!topRec.length) {
      html += '          <div class="empty-state">\n            <div class="empty-icon">♻️</div>\n            <div class="empty-text">Sem recorrentes neste período</div>\n            <div class="empty-description">Despesas recorrentes cadastradas aparecerão aqui</div>\n          </div>';
    } else {
      for (var tr=0; tr<topRec.length; tr++) {
        var parcStr = '';
        var parcelaInfo = '';
        try {
          if ((topRec[tr].parcelaAtual !== null && topRec[tr].parcelaAtual !== undefined) && (topRec[tr].parcelasTotal !== null && topRec[tr].parcelasTotal !== undefined)) {
            var parcelaAtual = Number(topRec[tr].parcelaAtual);
            var parcelasTotal = Number(topRec[tr].parcelasTotal);
            var parcelasRestantes = parcelasTotal - parcelaAtual;
            
            // Formatação melhorada das parcelas
            parcStr = ' <span class="text-xs text-gray-500">• ' + String(parcelaAtual) + '/' + String(parcelasTotal) + '</span>';
            
            // Informação adicional sobre parcelas restantes com barra de progresso
            if (parcelasRestantes > 0) {
              var progressoPercentual = Math.round((parcelaAtual / parcelasTotal) * 100);
              parcelaInfo = '<div class="mt-2">' +
                           '<div class="flex items-center justify-between text-xs text-gray-600 dark:text-gray-400 mb-1">' +
                           '<span>' + (parcelasRestantes === 1 ? '1 parcela restante' : parcelasRestantes + ' parcelas restantes') + '</span>' +
                           '<span>' + progressoPercentual + '%</span>' +
                           '</div>' +
                           '<div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">' +
                           '<div class="bg-emerald-500 h-1.5 rounded-full transition-all duration-300" style="width: ' + progressoPercentual + '%"></div>' +
                           '</div>' +
                           '</div>';
            } else if (parcelasRestantes === 0) {
              parcelaInfo = '<div class="mt-2">' +
                           '<div class="flex items-center justify-between text-xs text-orange-600 dark:text-orange-400 mb-1">' +
                           '<span>Finalizado</span>' +
                           '<span>100%</span>' +
                           '</div>' +
                           '<div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">' +
                           '<div class="bg-orange-500 h-1.5 rounded-full"></div>' +
                           '</div>' +
                           '</div>';
            }
          }
        } catch {}
        
        html += '          <div class="py-3 border-b border-gray-100 dark:border-gray-800 last:border-0">';
        html += '            <div class="flex items-center justify-between gap-4">';
        html += '              <div class="flex-1">';
        html += '                <div class="font-medium text-gray-900 dark:text-gray-100">' + (topRec[tr].nome || 'Recorrente') + ' <span class="text-xs text-gray-500">(' + String(topRec[tr].count) + ')</span>' + parcStr + '</div>';
        html += '                ' + parcelaInfo;
        html += '              </div>';
        html += '              <div class="text-sm font-semibold text-gray-600 dark:text-gray-300 ml-4">R$ ' + Number(topRec[tr].total || 0).toFixed(2) + '</div>';
        html += '            </div>';
        html += '          </div>';
      }
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
    html += '              <button onclick="window.showAddCategoryModal && window.showAddCategoryModal()" class="btn btn-primary btn-sm">+ Nova</button>';
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
    html += '        <div class="flex items-center gap-2 mb-4">';
    html += '          <div class="w-1 h-6 bg-gradient-to-b from-green-500 to-blue-500 rounded-full"></div>';
    html += '          <h2 class="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100">💳 Atividade Recente</h2>';
    html += '        </div>';
    html += '        <div class="u-card overflow-hidden">';
    html += '          <div class="p-4">';
    html += '            <div class="flex items-center justify-between mb-4 gap-4">';
    html += '              <div class="text-sm font-medium text-gray-700 dark:text-gray-300">Últimas Transações</div>';
    html += '              <button onclick="window.showAddTransactionModal && window.showAddTransactionModal()" class="btn btn-primary btn-sm">+ Nova Transação</button>';
    html += '            </div>';
    if (recent.length === 0) {
      html += '            <div class="empty-state">\n              <div class="empty-icon">🧾</div>\n              <div class="empty-text">Sem transações neste período</div>\n              <div class="mt-2"><button class="btn btn-primary btn-sm" onclick="window.showAddTransactionModal && window.showAddTransactionModal()">Adicionar transação</button></div>\n            </div>';
    } else {
      for (var r=0;r<recent.length;r++) {
        var rt = recent[r];
        var cat = cats.find(function(c){ return c.id === (rt.categoriaId || rt.categoryId); });
        var sign = (rt.tipo || 'despesa') === 'receita' ? '+' : '-';
        var amount = Math.abs(parseAmount(rt.valor !== null && rt.valor !== undefined ? rt.valor : rt.amount));
        var d = getTxDate(rt);
        var dStr = d ? d.toLocaleDateString() : '';
        // parcela info quando recorrente
        var parcInfo = '';
        try {
          if (rt.recorrenteId && (rt.parcelaAtual || rt.parcelasTotal)) {
            var pa = (rt.parcelaAtual !== null && rt.parcelaAtual !== undefined) ? rt.parcelaAtual : '';
            var pt = (rt.parcelasTotal !== null && rt.parcelasTotal !== undefined) ? rt.parcelasTotal : '';
            if (pa || pt) parcInfo = ' • ' + (pa || '?') + '/' + (pt || '?');
          }
        } catch {}
        html += '            <div class="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-xl mb-2 gap-4">';
        html += '              <div class="flex items-center gap-3 min-w-0">';
        html += '                <div class="w-3 h-3 rounded-full" style="background-color: ' + (cat && cat.cor || '#6B7280') + '"></div>';
        html += '                <div class="min-w-0">';
        html += '                  <div class="font-medium text-gray-900 dark:text-gray-100 truncate">' + (rt.descricao || rt.description || 'Transação') + '</div>';
        html += '                  <div class="text-xs text-gray-500 dark:text-gray-400">' + (cat && cat.nome || 'Sem categoria') + ' • ' + dStr + parcInfo + '</div>';
        html += '                </div>';
        html += '              </div>';
        html += '              <div class="font-bold ' + ((rt.tipo || 'despesa') === 'receita' ? 'text-green-600' : 'text-red-600') + '">' + sign + 'R$ ' + formatBR(amount) + '</div>';
        html += '            </div>';
      }
    }
    html += '          </div>';
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
}

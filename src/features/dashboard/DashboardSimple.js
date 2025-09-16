// Minimal, safe dashboard that calculates and renders summary using plain strings
import { eventBus } from '@core/events/eventBus.js';
import { mountPeriodIndicator } from '../../ui/PeriodIndicator.js';

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
    var tipo = txx.tipo || txx.type || (v >= 0 ? 'receita' : 'despesa');
    if (tipo === 'receita') receitas += Math.abs(v); else despesas += Math.abs(v);
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
  for (var ca=0; ca<cats.length; ca++) {
    var cc = cats[ca];
    if (!cc) continue;
    var limv = parseAmount(cc.limite);
    if (limv > 0) {
      var gasto = gastoPorCategoria[cc.id] || 0;
      var perc = limv > 0 ? (gasto / limv) : 0;
      // Só conta alerta se preferência estiver ativada
      var limitAlertsEnabled = localStorage.getItem('noti_limit_alerts') === 'true';
      if (limitAlertsEnabled && perc >= 0.7) totalAlertas++;
    }
  }
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
  html += '    <h2 class="tab-title-highlight">📊 Dashboard</h2>';
  html += '    <div id="dash-period-indicator"></div>';
  html += '  </div>';
  html += '  <div class="tab-content">';
  html += '    <div class="content-spacing">';

  // Resumo
  html += '      <div class="mb-8">';
  html += '        <div class="flex items-center gap-2 mb-4">';
  html += '          <div class="w-1 h-6 bg-gradient-to-b from-blue-500 to-green-500 rounded-full"></div>';
  html += '          <h2 class="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100">📈 Resumo Financeiro</h2>';
  html += '        </div>';
  html += '        <div class="bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 rounded-2xl shadow-xl p-6 md:p-8 text-white">';
  html += '          <div class="flex items-center justify-between mb-6">';
  html += '            <div><h3 class="text-xl md:text-2xl font-bold">Visão Geral</h3>';
  html += '            <p class="text-sm opacity-90">' + monthName + ' ' + year + ' • ' + String(totalTransacoes) + ' transações</p></div>';
  html += '            <div class="text-right">';
  html += '              <div class="text-2xl md:text-3xl font-bold ' + (saldo >= 0 ? 'text-green-200' : 'text-red-200') + '">R$ ' + formatBR(saldo) + '</div>';
  html += '              <p class="text-xs opacity-90">' + (saldo >= 0 ? '✓ Saldo Positivo' : '⚠️ Saldo Negativo') + '</p>';
  html += '            </div>';
  html += '          </div>';
  html += '          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">';
  html += '            <div class="rounded-xl p-5 bg-white/15 backdrop-blur-sm flex items-center justify-between">';
  html += '              <div class="flex items-center gap-3"><span class="text-2xl">💚</span><span class="text-sm opacity-90">Receitas</span></div>';
  html += '              <div class="text-2xl md:text-3xl font-bold text-green-200">R$ ' + formatBR(receitas) + '</div>';
  html += '            </div>';
  html += '            <div class="rounded-xl p-5 bg-white/15 backdrop-blur-sm flex items-center justify-between">';
  html += '              <div class="flex items-center gap-3"><span class="text-2xl">💸</span><span class="text-sm opacity-90">Despesas</span></div>';
  html += '              <div class="text-2xl md:text-3xl font-bold text-red-200">R$ ' + formatBR(despesas) + '</div>';
  html += '            </div>';
  html += '          </div>';
  // Orçado + progresso
  html += '          <div class="mt-4 rounded-xl p-4 bg-white/10 backdrop-blur-sm">';
  html += '            <div class="flex items-center justify-between mb-2">';
  html += '              <div class="text-sm font-medium">Progresso do Orçamento</div>';
  html += '              <div class="text-sm font-bold">' + (progressoOrcado*100).toFixed(1) + '%</div>';
  html += '            </div>';
  html += '            <div class="w-full bg-white/20 rounded-full h-3 overflow-hidden">';
  html += '              <div class="bg-white h-3 rounded-full transition-all" style="width:' + Math.min(progressoOrcado*100, 100).toFixed(1) + '%"></div>';
  html += '            </div>';
  // Detalhes: valores de Despesas e Orçado
  html += '            <div class="flex items-center justify-between text-xs opacity-90 mt-2">';
  html += '              <span>Despesas: R$ ' + formatBR(despesas) + '</span>';
  html += '              <span>Orçado: R$ ' + formatBR(orcado) + '</span>';
  html += '            </div>';
  html += '            <div class="flex items-center justify-between text-xs opacity-90 mt-2">';
  html += '              <span class="' + (totalAlertas>0 ? 'cursor-pointer hover:underline bg-red-500/20 px-2 py-0.5 rounded-full' : '') + '" ' + (totalAlertas>0 ? 'onclick="window.showCategoriasAlertaModal && window.showCategoriasAlertaModal()"' : '') + '>' + (totalAlertas>0 ? ('⚠️ ' + totalAlertas + ' alerta(s)') : '✅ Tudo OK') + '</span>';
  html += '              <span>' + (saldo >= 0 ? '📈 Meta alcançada' : '📉 Revisar gastos') + '</span>';
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

    html += '      <div class="mb-8">';
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
        html += '            <div class="flex items-center justify-between">';
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

  // Categorias & Limites (Top 5 + Controle de Limites)
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

    var categoriasComGasto = categoriasComDados.filter(function(x){ return x.gasto > 0 && (x.tipo || 'despesa') === 'despesa'; });
    categoriasComGasto.sort(function(a,b){ return b.gasto - a.gasto; });

    var categoriasComLimite = categoriasComDados.filter(function(x){ return (x.limite || 0) > 0 && (x.tipo || 'despesa') === 'despesa'; })
      .map(function(cat){
        var limite = Number(cat.limite || 0);
        var porcent = limite > 0 ? (cat.gasto / limite) * 100 : 0;
        return { ...cat, porcentagem: porcent };
      })
      .sort(function(a,b){
        var aEx = a.gasto > a.limite; var bEx = b.gasto > b.limite;
        if (aEx && !bEx) return -1; if (!aEx && bEx) return 1; return b.gasto - a.gasto;
      });

    html += '      <div class="mb-8">';
    html += '        <div class="flex items-center gap-2 mb-4">';
    html += '          <div class="w-1 h-6 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full"></div>';
    html += '          <h2 class="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100">📊 Categorias & Limites</h2>';
    html += '        </div>';
    html += '        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">';

    // Coluna 1: Top 5 Categorias
    html += '          <div class="u-card overflow-hidden">';
    html += '            <div class="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-gray-800 dark:to-gray-800 p-4 border-b border-gray-200 dark:border-gray-700">';
    html += '              <h3 class="text-lg font-bold text-gray-900 dark:text-gray-100">🏆 Top 5 Categorias</h3>';
    html += '              <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">Categorias com maiores gastos</p>';
    html += '            </div>';
    html += '            <div class="p-4">';
    if (categoriasComGasto.length === 0) {
      html += '              <div class="empty-state">\n                <div class="empty-icon">📂</div>\n                <div class="empty-text">Nenhuma categoria com gastos</div>\n                <div class="empty-description">Suas categorias com despesas aparecerão aqui</div>\n              </div>';
    } else {
      var medalhas = ['🥇','🥈','🥉','4️⃣','5️⃣'];
      var top5 = categoriasComGasto.slice(0,5);
      for (var idx=0; idx<top5.length; idx++) {
        var catTop = top5[idx];
        var limiteTop = Number(catTop.limite || 0);
        var pctTop = limiteTop > 0 ? Math.min((catTop.gasto / limiteTop) * 100, 100) : 0;
        var corBarra = 'bg-green-500';
        if (pctTop >= 100) corBarra = 'bg-red-500';
        else if (pctTop >= 90) corBarra = 'bg-red-400';
        else if (pctTop >= 75) corBarra = 'bg-yellow-500';
        else if (pctTop >= 50) corBarra = 'bg-orange-500';
        html += '              <div class="bg-gray-50 dark:bg-gray-800 rounded-xl p-3 border border-gray-200 dark:border-gray-700 mb-3">';
        html += '                <div class="flex items-center justify-between mb-2">';
        html += '                  <div class="flex items-center gap-2">';
        html += '                    <span class="text-lg">' + medalhas[idx] + '</span>';
        html += '                    <div class="w-3 h-3 rounded-full" style="background-color: ' + catTop.cor + '"></div>';
        html += '                    <span class="font-medium text-sm text-gray-900 dark:text-gray-100">' + catTop.nome + '</span>';
        html += '                  </div>';
        html += '                  <span class="font-bold text-sm ' + (limiteTop>0 && catTop.gasto>limiteTop ? 'text-red-600' : 'text-gray-900 dark:text-gray-100') + '">R$ ' + formatBR(catTop.gasto) + '</span>';
        html += '                </div>';
        if (limiteTop > 0) {
          html += '                <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">';
          html += '                  <span>Limite: R$ ' + formatBR(limiteTop) + '</span>';
          html += '                  <span>' + pctTop.toFixed(1) + '%</span>';
          html += '                </div>';
          html += '                <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">';
          html += '                  <div class="' + corBarra + ' h-2 rounded-full transition-all duration-300" style="width: ' + pctTop + '%"></div>';
          html += '                </div>';
        } else {
          html += '                <p class="text-xs text-gray-500 dark:text-gray-400">Sem limite definido</p>';
        }
        html += '              </div>';
      }
    }
    html += '            </div>';
    html += '          </div>';

    // Coluna 2: Controle de Limites
    html += '          <div class="u-card overflow-hidden">';
    html += '            <div class="bg-gradient-to-r from-red-50 to-orange-50 dark:from-gray-800 dark:to-gray-800 p-4 border-b border-gray-200 dark:border-gray-700">';
    html += '              <div class="flex justify-between items-center">';
    html += '                <div>';
    html += '                  <h3 class="text-lg font-bold text-gray-900 dark:text-gray-100">⚠️ Controle de Limites</h3>';
    html += '                  <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">Categorias com limites definidos</p>';
    html += '                </div>';
    html += '                <button onclick="window.showAddCategoryModal && window.showAddCategoryModal()" class="u-btn u-btn--primary mobile-btn">+ Nova</button>';
    html += '              </div>';
    html += '            </div>';
    html += '            <div class="p-4">';
    var catsLimite = categoriasComLimite;
    if (!catsLimite.length) {
      html += '              <div class="text-center py-6">';
      html += '                <div class="text-3xl mb-2">🎯</div>';
      html += '                <p class="text-gray-500 dark:text-gray-400 text-sm">Nenhuma categoria com limite definido</p>';
      html += '                <button onclick="window.showAddCategoryModal && window.showAddCategoryModal()" class="u-btn u-btn--outline mt-2">+ Definir primeiro limite</button>';
      html += '              </div>';
    } else {
      var maxItems = Math.min(6, catsLimite.length);
      for (var li=0; li<maxItems; li++) {
        var catL = catsLimite[li];
        var limiteL = Number(catL.limite || 0);
        var porcentL = limiteL > 0 ? (catL.gasto / limiteL) * 100 : 0;
        var corBarraL = 'bg-green-500';
        var icone = '✅';
        if (porcentL >= 100) { corBarraL = 'bg-red-500'; icone = '🚨'; }
        else if (porcentL >= 90) { corBarraL = 'bg-red-400'; icone = '⚠️'; }
        else if (porcentL >= 75) { corBarraL = 'bg-yellow-500'; icone = '⚡'; }
        else if (porcentL >= 50) { corBarraL = 'bg-orange-500'; icone = '📊'; }
        var ringCls = porcentL >= 90 ? ' ring-2 ring-red-200 dark:ring-red-800' : '';
        html += '              <div class="bg-gray-50 dark:bg-gray-800 rounded-xl p-3 border border-gray-200 dark:border-gray-700' + ringCls + ' mb-3">';
        html += '                <div class="flex items-center justify-between mb-2">';
        html += '                  <div class="flex items-center gap-2">';
        html += '                    <span class="text-sm">' + icone + '</span>';
        html += '                    <div class="w-3 h-3 rounded-full" style="background-color: ' + catL.cor + '"></div>';
        html += '                    <span class="font-medium text-sm text-gray-900 dark:text-gray-100">' + catL.nome + '</span>';
        html += '                  </div>';
        html += '                  <span class="font-bold text-sm ' + (catL.gasto > limiteL ? 'text-red-600' : 'text-gray-900 dark:text-gray-100') + '">R$ ' + formatBR(catL.gasto) + '</span>';
        html += '                </div>';
        html += '                <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">';
        html += '                  <span>Limite: R$ ' + formatBR(limiteL) + '</span>';
        var percClass = porcentL >= 100 ? 'text-red-600 font-bold' : (porcentL >= 90 ? 'text-orange-600 font-medium' : '');
        html += '                  <span class="' + percClass + '">' + porcentL.toFixed(1) + '%</span>';
        html += '                </div>';
        html += '                <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">';
        html += '                  <div class="' + corBarraL + ' h-2 rounded-full transition-all duration-300" style="width: ' + Math.min(porcentL, 100) + '%"></div>';
        html += '                </div>';
        if (porcentL >= 100) {
          html += '                <div class="mt-2 text-xs text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900 dark:bg-opacity-20 px-2 py-1 rounded">Excedeu em R$ ' + formatBR(catL.gasto - limiteL) + '</div>';
        }
        html += '              </div>';
      }
    }
    html += '            </div>';
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
    html += '      <div class="mb-8">';
    html += '        <div class="flex items-center gap-2 mb-4">';
    html += '          <div class="w-1 h-6 bg-gradient-to-b from-green-500 to-blue-500 rounded-full"></div>';
    html += '          <h2 class="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100">💳 Atividade Recente</h2>';
    html += '        </div>';
    html += '        <div class="u-card overflow-hidden">';
    html += '          <div class="p-4">';
    html += '            <div class="flex items-center justify-between mb-4">';
    html += '              <div class="text-sm font-medium text-gray-700 dark:text-gray-300">Últimas Transações</div>';
    html += '              <button onclick="window.showAddTransactionModal && window.showAddTransactionModal()" class="u-btn u-btn--primary mobile-btn">+ Nova Transação</button>';
    html += '            </div>';
    if (recent.length === 0) {
      html += '            <div class="empty-state">\n              <div class="empty-icon">🧾</div>\n              <div class="empty-text">Sem transações neste período</div>\n              <div class="mt-2"><button class="u-btn u-btn--primary" onclick="window.showAddTransactionModal && window.showAddTransactionModal()">Adicionar transação</button></div>\n            </div>';
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
        html += '            <div class="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-xl mb-2">';
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
}

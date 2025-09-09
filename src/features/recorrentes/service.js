// Domain logic for recurring expenses - single clean implementation
import * as recurrRepo from '@data/repositories/recurringRepo.js';
import * as txRepo from '@data/repositories/transactionsRepo.js';
import * as logRepo from '@data/repositories/logRepo.js';

function normalizeYearMonth(y, m) {
  let year = Number(y);
  let month = Number(m);
  if (!Number.isFinite(year) || !Number.isFinite(month)) return null;
  while (month < 1) { month += 12; year -= 1; }
  while (month > 12) { month -= 12; year += 1; }
  return { year, month };
}

export function calcularParcelaRecorrente(recorrente, anoReferencia = null, mesReferencia = null) {
  if (!recorrente?.parcelasTotal || recorrente.parcelasTotal <= 1) return null;
  try {
    const dataInicio = new Date(recorrente.dataInicio);
    let dataReferencia;
    if (typeof anoReferencia === 'number' && typeof mesReferencia === 'number') {
      const nm = normalizeYearMonth(anoReferencia, mesReferencia);
      if (nm) dataReferencia = new Date(nm.year, nm.month - 1, 1);
    }
    if (!dataReferencia) dataReferencia = new Date();
    let mesesDecorridos = (dataReferencia.getFullYear() - dataInicio.getFullYear()) * 12 +
      (dataReferencia.getMonth() - dataInicio.getMonth());
    try {
      const anoInicio = dataInicio.getFullYear();
      const mesInicio = dataInicio.getMonth() + 1;
      const refNorm = normalizeYearMonth(dataReferencia.getFullYear(), dataReferencia.getMonth() + 1);
      const isDepoisDoInicio = refNorm && (refNorm.year > anoInicio || (refNorm.year === anoInicio && refNorm.month > mesInicio));
      if (recorrente?.efetivarMesAtual === false && isDepoisDoInicio) mesesDecorridos -= 1;
    } catch {}
    let parcelaAtual = mesesDecorridos + 1;
    parcelaAtual = Math.max(1, Math.min(recorrente.parcelasTotal, parcelaAtual));
    return parcelaAtual;
  } catch (e) {
    console.error('Erro ao calcular parcela da recorrente:', e);
    return 1;
  }
}

export function calcularStatusRecorrente(recorrente, transacoes = [], anoAtual = null, mesAtual = null) {
  if (!anoAtual || !mesAtual) { const now = new Date(); anoAtual = now.getFullYear(); mesAtual = now.getMonth() + 1; }
  const cur = normalizeYearMonth(anoAtual, mesAtual) || { year: anoAtual, month: mesAtual };
  const { year: yCur, month: mCur } = cur;
  const foiEfetivadaEsteMes = transacoes.some(t => {
    if (!t.recorrenteId || t.recorrenteId !== recorrente.id) return false;
    const dt = t.createdAt?.toDate ? t.createdAt.toDate() : new Date(t.createdAt);
    return dt.getFullYear() === yCur && (dt.getMonth() + 1) === mCur;
  });
  let parcelaAtual = calcularParcelaRecorrente(recorrente, yCur, mCur);
  const next = normalizeYearMonth(yCur, mCur + 1) || { year: yCur, month: mCur };
  const prev = normalizeYearMonth(yCur, mCur - 1) || { year: yCur, month: mCur };
  let proximaParcela = calcularParcelaRecorrente(recorrente, next.year, next.month);
  let ultimaParcela = calcularParcelaRecorrente(recorrente, prev.year, prev.month);
  try {
    const txsDoRec = transacoes.filter(t => t.recorrenteId === recorrente.id && t.createdAt)
      .map(t => t.createdAt?.toDate ? t.createdAt.toDate() : new Date(t.createdAt)).sort((a, b) => a - b);
    if (txsDoRec.length > 0 && recorrente.dataInicio) {
      const primeiroAplic = txsDoRec[0];
      const di = new Date(recorrente.dataInicio);
      const start = normalizeYearMonth(di.getFullYear(), di.getMonth() + 1);
      const first = normalizeYearMonth(primeiroAplic.getFullYear(), primeiroAplic.getMonth() + 1);
      if (start && first) {
        const offset = (first.year - start.year) * 12 + (first.month - start.month);
        if (offset > 0) {
          const clamp = (n) => { if (n === null || n === undefined) return n; const tot = recorrente.parcelasTotal || n; return Math.max(1, Math.min(tot, n - offset)); };
          parcelaAtual = clamp(parcelaAtual);
          proximaParcela = clamp(proximaParcela);
          ultimaParcela = clamp(ultimaParcela);
        }
      }
    }
  } catch {}
  let aposUltimaParcela = false; let antesDaPrimeiraParcela = false;
  try {
    if (recorrente?.parcelasTotal && recorrente.dataInicio) {
      const di = new Date(recorrente.dataInicio);
      const ref = new Date(yCur, mCur - 1, 1);
      let mesesDec = (ref.getFullYear() - di.getFullYear()) * 12 + (ref.getMonth() - di.getMonth());
    const anoInicio = di.getFullYear();
    const mesInicio = di.getMonth() + 1;
    // Considerar que quando efetivarMesAtual === false, o mês de início é tratado como
    // "antes da primeira parcela" (não efetiva no mês inicial) — mesmo se ref === start
    const isDepoisDoInicio = yCur > anoInicio || (yCur === anoInicio && mCur > mesInicio);
    const isSameAsInicio = (yCur === anoInicio && mCur === mesInicio);
    if (recorrente?.efetivarMesAtual === false && (isDepoisDoInicio || isSameAsInicio)) mesesDec -= 1;
    const parcelaBruta = mesesDec + 1;
    aposUltimaParcela = parcelaBruta > recorrente.parcelasTotal;
    antesDaPrimeiraParcela = parcelaBruta < 1;
    }
  } catch {}
  return {
    foiEfetivadaEsteMes,
    parcelaAtual,
    proximaParcela,
    ultimaParcela,
    totalParcelas: recorrente.parcelasTotal,
    temParcelas: recorrente.parcelasTotal && recorrente.parcelasTotal > 1,
    ativa: recorrente.ativa !== false,
    aposUltimaParcela,
    antesDaPrimeiraParcela,
  };
}

export async function getRecorrentesDoOrcamento(budgetId) {
  return recurrRepo.listByBudget(budgetId);
}

export async function getRecorrentesDoUsuario(userId) {
  if (!userId) return [];
  return recurrRepo.listByUser(userId);
}

export async function addRecorrente(userId, budgetId, dados) {
  const recorrenteData = {
    ...dados,
    userId,
    budgetId,
    ativa: true,
    createdAt: new Date(),
    parcelasRestantes: dados.parcelasRestantes ?? null,
    parcelasTotal: dados.parcelasTotal ?? null,
    efetivarMesAtual: dados.efetivarMesAtual ?? false,
  };
  const ref = await recurrRepo.create(recorrenteData);
  return ref.id || ref;
}

export async function updateRecorrente(userId, id, dados) {
  await recurrRepo.update(id, { ...dados, updatedAt: new Date() });
}

export async function deleteRecorrente(userId, id) {
  await recurrRepo.remove(id);
}

export async function aplicarRecorrentesDoMes(userId, budgetId, forcarAplicacao = false, targetYear = null, targetMonth = null) {
  const agora = new Date();
  const mes = Number.isFinite(targetMonth) ? targetMonth : (agora.getMonth() + 1);
  const ano = Number.isFinite(targetYear) ? targetYear : agora.getFullYear();

  const recorrentes = await getRecorrentesDoOrcamento(budgetId);
  const ativas = (Array.isArray(recorrentes) ? recorrentes : []).filter(r => r.ativa === true);

  let transacoesDoMes = [];
  try {
    transacoesDoMes = await getTransacoesDoMes(budgetId, ano, mes);
  } catch { transacoesDoMes = []; }

  let recorrentesAplicadas = 0;
  let recorrentesPendentes = 0;

  for (const rec of ativas) {
    const deveAplicar = deveSerAplicadaNesteMes(rec, ano, mes);
    if (!deveAplicar) continue;

    const jaAplicada = jaExisteAplicacaoNoMes(transacoesDoMes, rec.id, rec.descricao);
    if (jaAplicada) continue;
    if (rec.parcelasRestantes !== null && rec.parcelasRestantes <= 0) continue;
    if (!forcarAplicacao) { recorrentesPendentes++; continue; }
    await aplicarRecorrente(rec, userId, budgetId, ano, mes);
    recorrentesAplicadas++;
  }

  return { aplicadas: recorrentesAplicadas, pendentes: recorrentesPendentes, total: ativas.length };
}

async function getTransacoesDoMes(budgetId, ano, mes) {
  try {
    let transacoes = window?.appState?.transactions;
    if (!Array.isArray(transacoes) || transacoes.length === 0) {
      transacoes = await txRepo.list({ budgetId });
    }
    return transacoes.filter(t => {
      const d = t.createdAt;
      if (!d) return false;
      const dt = d?.toDate ? d.toDate() : new Date(d);
      return dt.getFullYear() === ano && (dt.getMonth() + 1) === mes;
    });
  } catch (e) {
    console.error('Erro ao obter transações do mês:', e);
    return [];
  }
}

function deveSerAplicadaNesteMes(rec, ano, mes, refDay = null) {
  if (!rec.dataInicio) return true;
  try {
    const [y, m, d] = String(rec.dataInicio).split('-').map(Number);
    const dataInicio = new Date(y, m - 1, d);
    const anoInicio = dataInicio.getFullYear();
    const mesInicio = dataInicio.getMonth() + 1;
    const diaInicio = dataInicio.getDate();
    if (ano < anoInicio || (ano === anoInicio && mes < mesInicio)) return false;
    if (ano === anoInicio && mes === mesInicio) {
      const diaRef = Number.isFinite(refDay) ? refDay : new Date().getDate();
      if (diaRef < diaInicio) return false;
    }
    let mesesDesdeInicio = (ano - anoInicio) * 12 + (mes - mesInicio);
    if (!rec.efetivarMesAtual && (ano > anoInicio || (ano === anoInicio && mes > mesInicio))) {
      mesesDesdeInicio -= 1;
    }
    if (rec.parcelasTotal !== null && rec.parcelasTotal !== undefined) {
      const numeroParcela = mesesDesdeInicio + 1;
      if (numeroParcela > rec.parcelasTotal) return false;
    }
    if (rec.parcelasRestantes !== null && rec.parcelasRestantes !== undefined && rec.parcelasTotal !== null) {
      let mesesDesdeInicio2 = (ano - anoInicio) * 12 + (mes - mesInicio);
      if (!rec.efetivarMesAtual && (ano > anoInicio || (ano === anoInicio && mes > mesInicio))) mesesDesdeInicio2 -= 1;
      const parcelasRestantesExibidas = rec.parcelasRestantes - mesesDesdeInicio2;
      if (parcelasRestantesExibidas <= 0) return false;
    }
    return true;
  } catch (e) {
    console.error('Erro ao verificar se deve aplicar neste mês:', e);
    return true;
  }
}

function jaExisteAplicacaoNoMes(transacoesDoMes, recorrenteId, descricaoRecorrente = '') {
  try {
    return transacoesDoMes.some(transacao => {
      const matchPorId = recorrenteId && transacao.recorrenteId && transacao.recorrenteId === recorrenteId;
      const matchPorDescricao = descricaoRecorrente && transacao.descricao === descricaoRecorrente;
      return !!matchPorId || !!matchPorDescricao;
    });
  } catch (e) {
    console.error('Erro ao verificar se já aplicada:', e);
    return false;
  }
}

async function aplicarRecorrente(rec, userId, budgetId, ano, mes) {
  const diaLancamento = rec.diaLancamento || 1;
  const diasNoMes = new Date(ano, mes, 0).getDate();
  const diaClamped = Math.max(1, Math.min(diasNoMes, Number(diaLancamento)));
  const dataLancamento = new Date(ano, mes - 1, diaClamped);
  const parcelaAtual = calcularParcelaRecorrente(rec, ano, mes);
  const { id: transacaoId } = await txRepo.createFromRecurring({ userId, budgetId, rec, createdDate: dataLancamento, parcelaAtual });

  try {
    const senderUid = userId;
    const budget = budgetId || (typeof window !== 'undefined' ? window?.appState?.currentBudget?.id : undefined);
    if (budget && senderUid) {
      const { sendTransactionNotification } = await import('@features/notifications/NotificationService.js');
      const txData = {
        id: transacaoId,
        descricao: rec.descricao,
        valor: rec.valor,
        categoriaId: rec.categoriaId || null,
        tipo: rec.tipo || 'despesa',
        recorrenteId: rec.id,
        recorrenteParcelaAtual: parcelaAtual ?? null,
        recorrenteParcelasTotal: rec.parcelasTotal ?? null,
      };
      await sendTransactionNotification(budget, senderUid, txData);
    }
  } catch (e) {
    console.warn('Falha ao enviar notificação de aplicação de recorrente:', e);
  }

  if (rec.parcelasRestantes !== null && rec.parcelasRestantes !== undefined) {
    const novasParcelas = Math.max(0, rec.parcelasRestantes - 1);
    if (novasParcelas <= 0) {
      await updateRecorrente(userId, rec.id, { parcelasRestantes: 0, ativa: false });
    } else {
      await updateRecorrente(userId, rec.id, { parcelasRestantes: novasParcelas });
    }
  }

  try {
    const usaSomenteParcelasTotal = (rec.parcelasRestantes === null || rec.parcelasRestantes === undefined) && (rec.parcelasTotal !== null && rec.parcelasTotal !== undefined);
    if (usaSomenteParcelasTotal) {
      const isUltimaParcela = (rec.parcelasTotal <= 1) || ((parcelaAtual ?? Number.POSITIVE_INFINITY) >= rec.parcelasTotal);
      if (isUltimaParcela) await updateRecorrente(userId, rec.id, { ativa: false });
    }
  } catch (e) {
    console.warn('Falha ao auto-inativar recorrente após última parcela:', e);
  }

  await logRepo.addRecurringApplication({ userId, mesAno: `${ano}-${String(mes).padStart(2, '0')}`, transacaoId, transacaoData: { recorrenteId: rec.id, descricao: rec.descricao, valor: rec.valor } });
}

export async function limpiarLogsAntigos(userId) {
  const agora = new Date();
  const limiteData = new Date(agora.getFullYear() - 1, agora.getMonth(), agora.getDate());
  return logRepo.deleteOlderThanOneYear(userId, limiteData);
}

export async function loadRecorrentes() {
  try {
    const userId = window.appState?.currentUser?.uid;
    const budgetId = window.appState?.currentBudget?.id;
    if (!userId || !budgetId) return [];
    let recorrentes = [];
    try {
      if (budgetId) recorrentes = await recurrRepo.listByBudget(budgetId);
      if (!recorrentes || recorrentes.length === 0) recorrentes = await recurrRepo.listByUser(userId);
    } catch {
      recorrentes = await recurrRepo.listByUser(userId);
    }
    if (!window.appState) window.appState = {};
    window.appState.recorrentes = recorrentes;
    return recorrentes;
  } catch (error) { console.error('Erro ao carregar recorrentes:', error); return []; }
}


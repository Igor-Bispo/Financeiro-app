// Domain logic for recurring expenses
import * as recurrRepo from '@data/repositories/recurringRepo.js';
import * as txRepo from '@data/repositories/transactionsRepo.js';
import * as logRepo from '@data/repositories/logRepo.js';

// Utilitário: normaliza par (ano, mês) para 1..12 e ajusta ano
function normalizeYearMonth(y, m) {
  let year = Number(y);
  let month = Number(m);
  if (!Number.isFinite(year) || !Number.isFinite(month)) {
    return null;
  }
  while (month < 1) { month += 12; year -= 1; }
  while (month > 12) { month -= 12; year += 1; }
  return { year, month };
}

// ===== Calculadoras =====
// Mantém compat com assinaturas atuais do arquivo antigo
export function calcularParcelaRecorrente(recorrente, anoReferencia = null, mesReferencia = null) {
  if (!recorrente?.parcelasTotal || recorrente.parcelasTotal <= 1) {
    return null;
  }
  try {
    const dataInicio = new Date(recorrente.dataInicio);
    let dataReferencia;
    if (typeof anoReferencia === 'number' && typeof mesReferencia === 'number') {
      const nm = normalizeYearMonth(anoReferencia, mesReferencia);
      if (nm) {
        dataReferencia = new Date(nm.year, nm.month - 1, 1);
      }
    }
    if (!dataReferencia) {
      dataReferencia = new Date();
    }

    let mesesDecorridos = (dataReferencia.getFullYear() - dataInicio.getFullYear()) * 12 +
      (dataReferencia.getMonth() - dataInicio.getMonth());

    // Ajuste quando não efetiva no mês de início (primeira parcela no mês seguinte)
    try {
      const anoInicio = dataInicio.getFullYear();
      const mesInicio = dataInicio.getMonth() + 1;
      const refNorm = normalizeYearMonth(dataReferencia.getFullYear(), dataReferencia.getMonth() + 1);
      const isDepoisDoInicio = refNorm && (refNorm.year > anoInicio || (refNorm.year === anoInicio && refNorm.month > mesInicio));
      if (recorrente?.efetivarMesAtual === false && isDepoisDoInicio) {
        mesesDecorridos -= 1;
      }
    } catch {}
    let parcelaAtual = mesesDecorridos + 1;
    if (parcelaAtual > recorrente.parcelasTotal) {
      parcelaAtual = recorrente.parcelasTotal;
    }
    if (parcelaAtual < 1) {
      parcelaAtual = 1;
    }
    return parcelaAtual;
  } catch (e) {
    console.error('Erro ao calcular parcela da recorrente:', e);
    return 1;
  }
}

export function calcularStatusRecorrente(recorrente, transacoes = [], anoAtual = null, mesAtual = null) {
  if (!anoAtual || !mesAtual) {
    const now = new Date();
    anoAtual = now.getFullYear();
    mesAtual = now.getMonth() + 1;
  }
  const cur = normalizeYearMonth(anoAtual, mesAtual) || { year: anoAtual, month: mesAtual };
  const { year: yCur, month: mCur } = cur;
  const foiEfetivadaEsteMes = transacoes.some(t => {
    if (!t.recorrenteId || t.recorrenteId !== recorrente.id) {
      return false;
    }
    let transacaoData;
    if (t.createdAt && typeof t.createdAt === 'object' && t.createdAt.seconds) {
      transacaoData = new Date(t.createdAt.seconds * 1000);
    } else if (t.createdAt) {
      transacaoData = new Date(t.createdAt);
    } else {
      return false;
    }
    return transacaoData.getFullYear() === yCur && (transacaoData.getMonth() + 1) === mCur;
  });

  // Base parcel number from dataInicio
  let parcelaAtual = calcularParcelaRecorrente(recorrente, yCur, mCur);
  const next = normalizeYearMonth(yCur, mCur + 1) || { year: yCur, month: mCur };
  const prev = normalizeYearMonth(yCur, mCur - 1) || { year: yCur, month: mCur };
  let proximaParcela = calcularParcelaRecorrente(recorrente, next.year, next.month);
  let ultimaParcela = calcularParcelaRecorrente(recorrente, prev.year, prev.month);

  // Ajuste: se a primeira aplicação real (primeira transação) ocorreu DEPOIS de dataInicio,
  // deslocar a numeração para começar no mês da primeira aplicação.
  try {
    const txsDoRec = transacoes
      .filter(t => t.recorrenteId === recorrente.id && t.createdAt)
      .map(t => t.createdAt?.toDate ? t.createdAt.toDate() : new Date(t.createdAt))
      .sort((a, b) => a - b);
    if (txsDoRec.length > 0 && recorrente.dataInicio) {
      const primeiroAplic = txsDoRec[0];
      const di = new Date(recorrente.dataInicio);
      // Considerar apenas deslocamento positivo (quando primeira aplicação é depois do início previsto)
      const start = normalizeYearMonth(di.getFullYear(), di.getMonth() + 1);
      const first = normalizeYearMonth(primeiroAplic.getFullYear(), primeiroAplic.getMonth() + 1);
      if (start && first) {
        const offset = (first.year - start.year) * 12 + (first.month - start.month);
        if (offset > 0) {
          const clamp = (n) => {
            if (n === null || n === undefined) {
              return n;
            }
            const tot = recorrente.parcelasTotal || n;
            return Math.max(1, Math.min(tot, n - offset));
          };
          parcelaAtual = clamp(parcelaAtual);
          proximaParcela = clamp(proximaParcela);
          ultimaParcela = clamp(ultimaParcela);
        }
      }
    }
  } catch {}

  // Flags para UI: fora da janela de parcelas
  let aposUltimaParcela = false;
  let antesDaPrimeiraParcela = false;
  try {
    if (recorrente?.parcelasTotal && recorrente.dataInicio) {
      const di = new Date(recorrente.dataInicio);
      const ref = new Date(yCur, mCur - 1, 1);
      let mesesDec = (ref.getFullYear() - di.getFullYear()) * 12 + (ref.getMonth() - di.getMonth());
      const anoInicio = di.getFullYear();
      const mesInicio = di.getMonth() + 1;
      const isDepoisDoInicio = yCur > anoInicio || (yCur === anoInicio && mCur > mesInicio);
      if (recorrente?.efetivarMesAtual === false && isDepoisDoInicio) {
        mesesDec -= 1;
      }
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

// ===== Consultas =====
export async function getRecorrentesDoOrcamento(budgetId) {
  return recurrRepo.listByBudget(budgetId);
}

export async function addRecorrente(userId, budgetId, dados) {
  const recorrenteData = {
    ...dados,
    userId,
    budgetId,
    ativa: true,
    createdAt: new Date(), // serverTimestamp ficava no client antigo; aqui simplificamos
    parcelasRestantes: dados.parcelasRestantes ?? null,
    parcelasTotal: dados.parcelasTotal ?? null,
    efetivarMesAtual: dados.efetivarMesAtual ?? false,
  };
  const ref = await recurrRepo.create(recorrenteData);
  return ref.id || ref; // compat
}

export async function updateRecorrente(userId, id, dados) {
  await recurrRepo.update(id, { ...dados, updatedAt: new Date() });
}

export async function deleteRecorrente(userId, id) {
  await recurrRepo.remove(id);
}

// ===== Aplicação mensal =====
export async function aplicarRecorrentesDoMes(userId, budgetId, forcarAplicacao = false) {
  const agora = new Date();
  const mes = agora.getMonth() + 1;
  const ano = agora.getFullYear();
  // mesAno removido (não utilizado)

  const recorrentes = await getRecorrentesDoOrcamento(budgetId);
  const ativas = recorrentes.filter(r => r.ativa === true);

  // Prefetch transações do mês para evitar checagens repetidas e reduzir dependência de appState
  const transacoesDoMes = await getTransacoesDoMes(budgetId, ano, mes);

  let recorrentesAplicadas = 0;
  let recorrentesPendentes = 0;

  for (const rec of ativas) {
    const deveAplicar = deveSerAplicadaNesteMes(rec, ano, mes);
    if (!deveAplicar) {
      continue;
    }

    const jaAplicada = jaExisteAplicacaoNoMes(transacoesDoMes, rec.id, rec.descricao, ano, mes);
    if (jaAplicada) {
      continue;
    }

    if (rec.parcelasRestantes !== null && rec.parcelasRestantes <= 0) {
      continue;
    }
    if (!forcarAplicacao) {
      recorrentesPendentes++;
      continue;
    }

    await aplicarRecorrente(rec, userId, budgetId, ano, mes);
    recorrentesAplicadas++;
  }

  return { aplicadas: recorrentesAplicadas, pendentes: recorrentesPendentes, total: ativas.length };
}

// Carrega as transações do orçamento para o mês/ano especificados, usando appState quando disponível
async function getTransacoesDoMes(budgetId, ano, mes) {
  try {
    let transacoes = window?.appState?.transactions;
    if (!Array.isArray(transacoes) || transacoes.length === 0) {
      transacoes = await txRepo.list({ budgetId });
    }
    return transacoes.filter(t => {
      const d = t.createdAt;
      if (!d) {
        return false;
      }
      const dt = d?.toDate ? d.toDate() : new Date(d);
      return dt.getFullYear() === ano && (dt.getMonth() + 1) === mes;
    });
  } catch (e) {
    console.error('Erro ao obter transações do mês:', e);
    return [];
  }
}

function deveSerAplicadaNesteMes(rec, ano, mes) {
  if (!rec.dataInicio) {
    return true;
  }
  try {
    const [y, m, d] = String(rec.dataInicio).split('-').map(Number);
    const dataInicio = new Date(y, m - 1, d);
    const anoInicio = dataInicio.getFullYear();
    const mesInicio = dataInicio.getMonth() + 1;
    const diaInicio = dataInicio.getDate();
    if (ano < anoInicio || (ano === anoInicio && mes < mesInicio)) {
      return false;
    }
    if (ano === anoInicio && mes === mesInicio) {
      const hoje = new Date();
      if (hoje.getDate() < diaInicio) {
        return false;
      }
    }
    if (rec.parcelasRestantes !== null && rec.parcelasRestantes !== undefined && rec.parcelasTotal !== null) {
      let mesesDesdeInicio = (ano - anoInicio) * 12 + (mes - mesInicio);
      if (!rec.efetivarMesAtual && (ano > anoInicio || (ano === anoInicio && mes > mesInicio))) {
        mesesDesdeInicio -= 1;
      }
      const parcelasRestantesExibidas = rec.parcelasRestantes - mesesDesdeInicio;
      if (parcelasRestantesExibidas <= 0) {
        return false;
      }
    }
    return true;
  } catch (e) {
    console.error('Erro ao verificar se deve aplicar neste mês:', e);
    return true;
  }
}

// Verifica se já existe transação aplicada para a recorrente no mês
function jaExisteAplicacaoNoMes(transacoesDoMes, recorrenteId, descricaoRecorrente = '') {
  try {
    return transacoesDoMes.some(transacao => {
      const matchPorId = transacao.recorrenteId === recorrenteId;
      const matchPorDescricao = descricaoRecorrente && transacao.descricao === descricaoRecorrente;
      return matchPorId || matchPorDescricao;
    });
  } catch (e) {
    console.error('Erro ao verificar se já aplicada:', e);
    return false;
  }
}

async function aplicarRecorrente(rec, userId, budgetId, ano, mes) {
  const diaLancamento = rec.diaLancamento || 1;
  const dataLancamento = new Date(ano, mes - 1, diaLancamento);
  const parcelaAtual = calcularParcelaRecorrente(rec);
  const { id: transacaoId } = await txRepo.createFromRecurring({ userId, budgetId, rec, createdDate: dataLancamento, parcelaAtual });

  if (rec.parcelasRestantes !== null && rec.parcelasRestantes !== undefined) {
    const novasParcelas = Math.max(0, rec.parcelasRestantes - 1);
    if (novasParcelas <= 0) {
      await updateRecorrente(userId, rec.id, { parcelasRestantes: 0, ativa: false });
    } else {
      await updateRecorrente(userId, rec.id, { parcelasRestantes: novasParcelas });
    }
  }

  await logRepo.addRecurringApplication({
    userId,
    mesAno: `${ano}-${String(mes).padStart(2, '0')}`,
    transacaoId,
    transacaoData: {
      recorrenteId: rec.id,
      descricao: rec.descricao,
      valor: rec.valor,
    }
  });
}

export async function limparLogsAntigos(userId) {
  const agora = new Date();
  const limiteData = new Date(agora.getFullYear() - 1, agora.getMonth(), agora.getDate());
  return logRepo.deleteOlderThanOneYear(userId, limiteData);
}

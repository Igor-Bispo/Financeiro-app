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
            if (n === null || n === undefined) return n;
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
      const isMesmoMesDeInicio = (yCur === anoInicio && mCur === mesInicio);
      if (recorrente?.efetivarMesAtual === false && (isDepoisDoInicio || isMesmoMesDeInicio)) {
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

// Fallback: obter recorrentes do usuário quando não houver orçamento definido
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
    createdAt: new Date(), // serverTimestamp ficava no client antigo; aqui simplificamos
    parcelasRestantes: dados.parcelasRestantes ?? null,
    parcelasTotal: dados.parcelasTotal ?? null,
    efetivarMesAtual: dados.efetivarMesAtual ?? false,
  };
  const ref = await recurrRepo.create(recorrenteData);

  // Enviar notificação de nova despesa recorrente
  try {
    const { sendRecorrenteChangeNotification } = await import('@features/notifications/NotificationService.js');
    await sendRecorrenteChangeNotification(budgetId, userId, recorrenteData, 'new_recorrente');
    console.log('[RecorrentesService] Notificação de nova despesa recorrente enviada');
  } catch (error) {
    console.warn('[RecorrentesService] Erro ao enviar notificação de nova despesa recorrente:', error);
  }

  return ref.id || ref; // compat
}

export async function updateRecorrente(userId, id, dados) {
  // Buscar dados anteriores para comparação
  let prevData = null;
  try {
    const recorrenteExistente = await recurrRepo.getById(id);
    if (recorrenteExistente) {
      prevData = {
        nome: recorrenteExistente.nome,
        valor: recorrenteExistente.valor,
        frequencia: recorrenteExistente.frequencia,
        categoria: recorrenteExistente.categoria,
        descricao: recorrenteExistente.descricao,
        parcelasRestantes: recorrenteExistente.parcelasRestantes,
        parcelasTotal: recorrenteExistente.parcelasTotal,
      };
    }
  } catch (error) {
    console.warn('[RecorrentesService] Erro ao buscar dados anteriores da despesa recorrente:', error);
  }

  await recurrRepo.update(id, { ...dados, updatedAt: new Date() });

  // Enviar notificação de atualização de despesa recorrente
  try {
    const { sendRecorrenteChangeNotification } = await import('@features/notifications/NotificationService.js');
    const budgetId = dados.budgetId || (typeof window !== 'undefined' ? window?.appState?.currentBudget?.id : undefined);
    if (budgetId) {
      const updatedData = { ...dados, id };
      await sendRecorrenteChangeNotification(budgetId, userId, updatedData, 'updated_recorrente', prevData);
      console.log('[RecorrentesService] Notificação de atualização de despesa recorrente enviada');
    }
  } catch (error) {
    console.warn('[RecorrentesService] Erro ao enviar notificação de atualização de despesa recorrente:', error);
  }
}

export async function deleteRecorrente(userId, id) {
  // Buscar dados da despesa recorrente antes de excluir
  let recorrenteData = null;
  try {
    recorrenteData = await recurrRepo.getById(id);
  } catch (error) {
    console.warn('[RecorrentesService] Erro ao buscar dados da despesa recorrente para exclusão:', error);
  }

  await recurrRepo.remove(id);

  // Enviar notificação de exclusão de despesa recorrente
  if (recorrenteData) {
    try {
      const { sendRecorrenteChangeNotification } = await import('@features/notifications/NotificationService.js');
      const budgetId = recorrenteData.budgetId || (typeof window !== 'undefined' ? window?.appState?.currentBudget?.id : undefined);
      if (budgetId) {
        await sendRecorrenteChangeNotification(budgetId, userId, recorrenteData, 'deleted_recorrente');
        console.log('[RecorrentesService] Notificação de exclusão de despesa recorrente enviada');
      }
    } catch (error) {
      console.warn('[RecorrentesService] Erro ao enviar notificação de exclusão de despesa recorrente:', error);
    }
  }
}

// ===== Aplicação mensal =====
export async function aplicarRecorrentesDoMes(userId, budgetId, forcarAplicacao = false, targetYear = null, targetMonth = null) {
  const agora = new Date();
  const mes = Number.isFinite(targetMonth) ? targetMonth : (agora.getMonth() + 1);
  const ano = Number.isFinite(targetYear) ? targetYear : agora.getFullYear();
  // const mesAno = `${ano}-${String(mes).padStart(2, '0')}`; // não utilizado

  const recorrentes = await getRecorrentesDoOrcamento(budgetId);
  const ativas = recorrentes.filter(r => r.ativa === true);

  // Prefetch transações do mês para evitar checagens repetidas e reduzir dependência de appState
  const transacoesDoMes = await getTransacoesDoMes(budgetId, ano, mes);

  let recorrentesAplicadas = 0;
  let recorrentesPendentes = 0;

  // Se o período alvo é o mês/ano corrente, respeitar o dia de início; caso contrário, não bloquear pelo dia
  const isPeriodoAtual = (ano === agora.getFullYear() && mes === (agora.getMonth() + 1));
  const refDay = isPeriodoAtual ? agora.getDate() : 31;

  for (const rec of ativas) {
    const deveAplicar = deveSerAplicadaNesteMes(rec, ano, mes, refDay);
    if (!deveAplicar) {
      continue;
    }

    const jaAplicada = jaExisteAplicacaoNoMes(transacoesDoMes, rec, ano, mes);
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

  // === Notificações de lembrete de recorrente ===
  try {
    const remindersEnabled = (typeof localStorage !== 'undefined') ? localStorage.getItem('noti_recurring_reminders') === 'true' : false;
    if (remindersEnabled && Array.isArray(ativas)) {
      const { sendRecorrenteReminderNotification } = await import('@features/notifications/NotificationService.js');
      for (const rec of ativas) {
        // Enviar lembrete apenas se não foi aplicada ainda neste mês
        const jaAplicada = jaExisteAplicacaoNoMes(transacoesDoMes, rec, ano, mes);
        if (!jaAplicada) {
          await sendRecorrenteReminderNotification(budgetId, userId, rec);
        }
      }
    }
  } catch (e) {
    console.warn('Falha ao enviar lembretes de recorrentes:', e);
  }

  // === Notificação de resumo semanal ===
  try {
    const summaryEnabled = (typeof localStorage !== 'undefined') ? localStorage.getItem('noti_weekly_summary') === 'true' : false;
    if (summaryEnabled) {
      const { sendWeeklySummaryNotification } = await import('@features/notifications/NotificationService.js');
      // Exemplo de dados de resumo: personalize conforme necessário
      const summaryData = {
        resumo: `Resumo semanal: ${recorrentesAplicadas} recorrentes aplicadas, ${recorrentesPendentes} pendentes.`,
        periodo: `${String(mes).padStart(2,'0')}/${ano}`
      };
      await sendWeeklySummaryNotification(budgetId, userId, summaryData);
    }
  } catch (e) {
    console.warn('Falha ao enviar notificação de resumo semanal:', e);
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
      const diaRef = Number.isFinite(refDay) ? refDay : new Date().getDate();
      if (diaRef < diaInicio) {
        return false;
      }
    }
    // Calcular meses desde o início com ajuste de efetivarMesAtual
    let mesesDesdeInicio = (ano - anoInicio) * 12 + (mes - mesInicio);
    if (!rec.efetivarMesAtual && (ano > anoInicio || (ano === anoInicio && mes > mesInicio))) {
      mesesDesdeInicio -= 1;
    }
    // Se houver total de parcelas, bloquear após a última parcela, mesmo sem 'parcelasRestantes'
    if (rec.parcelasTotal !== null && rec.parcelasTotal !== undefined) {
      const numeroParcela = mesesDesdeInicio + 1;
      if (numeroParcela > rec.parcelasTotal) {
        return false;
      }
    }
    // Se houver 'parcelasRestantes', respeitar contagem atual (não subtrair mesesDecorridos, pois já é decrementada a cada aplicação)
    if (rec.parcelasRestantes !== null && rec.parcelasRestantes !== undefined) {
      if (rec.parcelasRestantes <= 0) {
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
function jaExisteAplicacaoNoMes(transacoesDoMes, rec, ano, mes) {
  try {
    return transacoesDoMes.some(transacao => {
      // Preferir correspondência por ID quando disponível
      if (transacao.recorrenteId && rec.id) {
        if (transacao.recorrenteId === rec.id) return true;
      }
      // Fallback conservador por descrição para dados antigos sem recorrenteId
      if (rec.descricao && transacao.descricao === rec.descricao) {
        const expectedParcela = calcularParcelaRecorrente(rec, ano, mes);
        const recTemParcelas = rec.parcelasTotal !== null && rec.parcelasTotal !== undefined;
        const txTemMetaParcela = (transacao.parcelasTotal !== undefined && transacao.parcelasTotal !== null) || (transacao.parcelaAtual !== undefined && transacao.parcelaAtual !== null);
        // Apenas considerar "já aplicada" se os metadados de parcela forem coerentes
        if (!recTemParcelas) {
          // Recorrente sem parcelamento: aceitar se tx também não tiver metadados de parcela explícitos (ou indicar 1/1)
          if (!txTemMetaParcela || transacao.parcelasTotal === 1) return true;
        } else {
          // Recorrente parcelada: exigir correspondência de total e da parcela esperada
          if (transacao.parcelasTotal === rec.parcelasTotal && transacao.parcelaAtual === expectedParcela) return true;
        }
      }
      return false;
    });
  } catch (e) {
    console.error('Erro ao verificar se já aplicada:', e);
    return false;
  }
}

async function aplicarRecorrente(rec, userId, budgetId, ano, mes) {
  const diaLancamento = rec.diaLancamento || 1;
  // Clamp o dia para o último dia válido do mês alvo (evita rollover para o mês seguinte)
  const diasNoMes = new Date(ano, mes, 0).getDate();
  const diaClamped = Math.max(1, Math.min(diasNoMes, Number(diaLancamento)));
  const dataLancamento = new Date(ano, mes - 1, diaClamped);
  const parcelaAtual = calcularParcelaRecorrente(rec, ano, mes);

  // Debug: verificar dados antes de criar transação
  console.log('🔧 [AplicarRecorrente] Dados para criar transação:', {
    recId: rec.id,
    recDescricao: rec.descricao,
    recParcelasTotal: rec.parcelasTotal,
    recParcelasRestantes: rec.parcelasRestantes,
    parcelaAtualCalculada: parcelaAtual,
    ano,
    mes,
    dataLancamento: dataLancamento.toISOString()
  });

  const { id: transacaoId } = await txRepo.createFromRecurring({ userId, budgetId, rec, createdDate: dataLancamento, parcelaAtual });

  // Notificar criação da transação recorrente aplicada (orçamento compartilhado)
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

  // Auto-inativar quando atingir a última parcela em modelos que usam apenas 'parcelasTotal'
  try {
    const usaSomenteParcelasTotal = (rec.parcelasRestantes === null || rec.parcelasRestantes === undefined) && (rec.parcelasTotal !== null && rec.parcelasTotal !== undefined);
    if (usaSomenteParcelasTotal) {
      const isUltimaParcela = (rec.parcelasTotal <= 1) || ((parcelaAtual ?? Number.POSITIVE_INFINITY) >= rec.parcelasTotal);
      if (isUltimaParcela) {
        await updateRecorrente(userId, rec.id, { ativa: false });
      }
    }
  } catch (e) {
    console.warn('Falha ao auto-inativar recorrente após última parcela:', e);
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

// Função para carregar recorrentes do usuário atual
export async function loadRecorrentes() {
  try {
    const userId = window.appState?.currentUser?.uid;
    const budgetId = window.appState?.currentBudget?.id;

    if (!userId || !budgetId) {
      console.warn('Usuário ou orçamento não encontrado para carregar recorrentes');
      return [];
    }

    // Carregar recorrentes do repositório
    let recorrentes = [];
    try {
      if (budgetId) {
        recorrentes = await recurrRepo.listByBudget(budgetId);
      }
      // Se não retornou nada, tentar por usuário como fallback
      if (!recorrentes || recorrentes.length === 0) {
        recorrentes = await recurrRepo.listByUser(userId);
      }
    } catch (e) {
      console.warn('Falha ao listar recorrentes por orçamento, tentando por usuário...', e);
      recorrentes = await recurrRepo.listByUser(userId);
    }

    // Atualizar o estado global
    if (!window.appState) window.appState = {};
    window.appState.recorrentes = recorrentes;

    console.log(`✅ ${recorrentes.length} recorrentes carregadas`);
    return recorrentes;
  } catch (error) {
    console.error('❌ Erro ao carregar recorrentes:', error);
    return [];
  }
}

import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
  serverTimestamp
} from 'firebase/firestore';
import { db } from './firebase.js';

export function calcularParcelaRecorrente(recorrente, anoReferencia = null, mesReferencia = null) {
  if (!recorrente.parcelasTotal || recorrente.parcelasTotal <= 1) {
    return null; // Não é parcelada
  }
  try {
    const dataInicio = new Date(recorrente.dataInicio);
    
    // Usar data de referência ou data atual
    let dataReferencia;
    if (anoReferencia && mesReferencia) {
      dataReferencia = new Date(anoReferencia, mesReferencia - 1, 1);
    } else {
      dataReferencia = new Date();
    }
    
    // Calcular meses desde o início
    const mesesDecorridos = (dataReferencia.getFullYear() - dataInicio.getFullYear()) * 12 + 
                           (dataReferencia.getMonth() - dataInicio.getMonth());
    
    // A parcela atual é baseada nos meses decorridos + 1 (primeiro mês é parcela 1)
    let parcelaAtual = mesesDecorridos + 1;
    
    // Se a parcela atual exceder o total, retornar o total
    if (parcelaAtual > recorrente.parcelasTotal) {
      parcelaAtual = recorrente.parcelasTotal;
    }
    
    // Se a parcela atual for menor que 1, retornar 1
    if (parcelaAtual < 1) {
      parcelaAtual = 1;
    }
    
    return parcelaAtual;
  } catch (error) {
    console.error('Erro ao calcular parcela da recorrente:', error);
    return 1; // Fallback para primeira parcela
  }
}

// Nova função para calcular status completo da recorrente
export function calcularStatusRecorrente(recorrente, transacoes = [], anoAtual = null, mesAtual = null) {
  if (!anoAtual || !mesAtual) {
    const now = new Date();
    anoAtual = now.getFullYear();
    mesAtual = now.getMonth() + 1;
  }
  
  // Verificar se foi efetivada no mês atual
  const foiEfetivadaEsteMes = transacoes.some(t => {
    if (!t.recorrenteId || t.recorrenteId !== recorrente.id) return false;
    
    let transacaoData;
    if (t.createdAt && typeof t.createdAt === 'object' && t.createdAt.seconds) {
      transacaoData = new Date(t.createdAt.seconds * 1000);
    } else if (t.createdAt) {
      transacaoData = new Date(t.createdAt);
    } else {
      return false;
    }
    
    return transacaoData.getFullYear() === anoAtual && 
           transacaoData.getMonth() + 1 === mesAtual;
  });
  
  // Calcular parcela atual
  const parcelaAtual = calcularParcelaRecorrente(recorrente, anoAtual, mesAtual);
  
  // Calcular próxima parcela (mês seguinte)
  const proximaParcela = calcularParcelaRecorrente(recorrente, anoAtual, mesAtual + 1);
  
  // Calcular última parcela (mês anterior)
  const ultimaParcela = calcularParcelaRecorrente(recorrente, anoAtual, mesAtual - 1);
  
  return {
    foiEfetivadaEsteMes,
    parcelaAtual,
    proximaParcela,
    ultimaParcela,
    totalParcelas: recorrente.parcelasTotal,
    temParcelas: recorrente.parcelasTotal && recorrente.parcelasTotal > 1,
    ativa: recorrente.ativa !== false
  };
}

// Buscar todas as recorrentes de um orçamento
export async function getDespesasRecorrentes(userId, budgetId) {
  try {
    const ref = collection(db, 'recorrentes');
    const q = query(ref, where('budgetId', '==', budgetId));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Erro ao buscar recorrentes:', error);
    return [];
  }
}

// Adicionar nova recorrente
export async function addDespesaRecorrente(userId, budgetId, dados) {
  try {
    const recorrenteData = {
      ...dados,
      userId,
      budgetId,
      // Preservar valores do backup ou usar padrões apenas se não existirem
      ativa: dados.ativa !== undefined ? dados.ativa : true,
      createdAt: serverTimestamp(),
      // Inicializar parcelas se for parcelada
      parcelasRestantes: dados.parcelasRestantes || null,
      parcelasTotal: dados.parcelasTotal || null,
      // Preservar valor do backup ou usar padrão
      efetivarMesAtual: dados.efetivarMesAtual !== undefined ? dados.efetivarMesAtual : false
    };

    const docRef = await addDoc(collection(db, 'recorrentes'), recorrenteData);
    console.log('✅ Recorrente adicionada:', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('Erro ao adicionar recorrente:', error);
    throw error;
  }
}

// Atualizar recorrente
export async function updateDespesaRecorrente(userId, id, dados) {
  try {
    const ref = doc(db, 'recorrentes', id);
    await updateDoc(ref, {
      ...dados,
      updatedAt: serverTimestamp()
    });
    console.log('✅ Recorrente atualizada:', id);
  } catch (error) {
    console.error('Erro ao atualizar recorrente:', error);
    throw error;
  }
}

// Deletar recorrente
export async function deleteDespesaRecorrente(userId, id) {
  try {
    const ref = doc(db, 'recorrentes', id);
    await deleteDoc(ref);
    console.log('✅ Recorrente deletada:', id);
  } catch (error) {
    console.error('Erro ao deletar recorrente:', error);
    throw error;
  }
}

// Aplicar recorrentes do mês (função principal) - VERSÃO CONTROLADA
export async function aplicarRecorrentesDoMes(
  userId,
  budgetId,
  forcarAplicacao = false
) {
  try {
    const agora = new Date();
    const mes = agora.getMonth() + 1;
    const ano = agora.getFullYear();
    const mesAno = `${ano}-${String(mes).padStart(2, '0')}`;

    console.log(
      '🔄 Verificando recorrentes para:',
      mesAno,
      forcarAplicacao ? '(FORÇADO)' : ''
    );

    const recorrentes = await getDespesasRecorrentes(userId, budgetId);
    const ativas = recorrentes.filter(r => r.ativa === true);

    console.log('📋 Recorrentes ativas encontradas:', ativas.length);

    let recorrentesAplicadas = 0;
    let recorrentesPendentes = 0;

    for (const rec of ativas) {
      console.log('🔍 Analisando recorrente:', rec.descricao);

      // Verificar se a recorrente deve ser aplicada neste mês
      const deveAplicar = deveSerAplicadaNesteMes(rec, ano, mes);
      console.log('✅ Deve aplicar neste mês?', deveAplicar);

      if (!deveAplicar) {
        console.log(
          '⏭️ Recorrente não deve ser aplicada neste mês:',
          rec.descricao
        );
        continue;
      }

      // Verificar se já foi aplicada este mês
      const jaAplicada = await verificarSeJaAplicada(
        userId,
        budgetId,
        rec.id,
        ano,
        mes
      );
      console.log('🔍 Já aplicada este mês?', jaAplicada);

      if (jaAplicada) {
        console.log('⏭️ Recorrente já aplicada este mês:', rec.descricao);
        // Se já foi aplicada, não decrementar parcelas
        continue;
      }

      // Verificar se ainda tem parcelas
      if (rec.parcelasRestantes !== null && rec.parcelasRestantes <= 0) {
        console.log('⏹️ Recorrente sem parcelas restantes:', rec.descricao);
        continue;
      }

      // Se não for forçado, apenas contar como pendente
      if (!forcarAplicacao) {
        console.log(
          '⏳ Recorrente pendente (não aplicada automaticamente):',
          rec.descricao
        );
        recorrentesPendentes++;
        continue;
      }

      // Verificar se a recorrente foi criada recentemente (últimas 24h) para evitar duplicação
      if (rec.createdAt) {
        const dataCriacao = rec.createdAt.toDate
          ? rec.createdAt.toDate()
          : new Date(rec.createdAt);
        const agora = new Date();
        const diffHoras = (agora - dataCriacao) / (1000 * 60 * 60);

        if (diffHoras < 24) {
          console.log(
            '⏭️ Recorrente criada recentemente (< 24h), verificando se já foi aplicada...'
          );
          // Verificar novamente se já foi aplicada (pode ter sido aplicada imediatamente)
          const jaAplicadaRecente = await verificarSeJaAplicada(
            userId,
            budgetId,
            rec.id,
            ano,
            mes
          );
          if (jaAplicadaRecente) {
            console.log('⏭️ Recorrente recente já foi aplicada, pulando...');
            continue;
          }
        }
      }

      console.log('🚀 Aplicando recorrente:', rec.descricao);
      // Aplicar a recorrente
      await aplicarRecorrente(rec, userId, budgetId, ano, mes);
      recorrentesAplicadas++;
    }

    console.log(
      `✅ Verificação concluída: ${recorrentesAplicadas} aplicadas, ${recorrentesPendentes} pendentes`
    );

    // Retornar informações sobre o resultado
    return {
      aplicadas: recorrentesAplicadas,
      pendentes: recorrentesPendentes,
      total: ativas.length
    };
  } catch (error) {
    console.error('❌ Erro ao verificar/aplicar recorrentes:', error);
    throw error;
  }
}

// Verificar se a recorrente deve ser aplicada neste mês
function deveSerAplicadaNesteMes(rec, ano, mes) {
  console.log('🔍 Verificando se deve aplicar:', rec.descricao);
  console.log('📅 Ano/Mês atual:', ano, mes);

  // Se não tem data de início, aplicar sempre
  if (!rec.dataInicio) {
    console.log('📅 Sem data de início - aplicando sempre');
    return true;
  }

  try {
    const [ano, mes, dia] = rec.dataInicio.split('-').map(Number);
    const dataInicio = new Date(ano, mes - 1, dia); // Month is 0-indexed
    const anoInicio = dataInicio.getFullYear();
    const mesInicio = dataInicio.getMonth() + 1;
    const diaInicio = dataInicio.getDate();

    console.log('📅 Data de início:', rec.dataInicio);
    console.log('📅 Ano/Mês/Dia de início:', anoInicio, mesInicio, diaInicio);

    // Se o mês atual é anterior ao mês de início, não aplicar
    if (ano < anoInicio || (ano === anoInicio && mes < mesInicio)) {
      console.log('⏭️ Mês atual é anterior ao início - não aplicar');
      return false;
    }

    // Se é o mesmo mês, verificar se já passou do dia de início
    if (ano === anoInicio && mes === mesInicio) {
      const hoje = new Date();
      const diaAtual = hoje.getDate();
      if (diaAtual < diaInicio) {
        console.log('⏭️ Ainda não chegou o dia de início - não aplicar');
        return false;
      }
    }

    // Se tem parcelas limitadas, verificar se ainda deve aplicar
    if (
      rec.parcelasRestantes !== null &&
      rec.parcelasRestantes !== undefined &&
      rec.parcelasTotal !== null
    ) {
      // Calcular meses desde o início, considerando se deve efetivar no mês atual
      let mesesDesdeInicio = (ano - anoInicio) * 12 + (mes - mesInicio);
      
      // Ajuste: se não for para efetivar no mês atual e já passou do mês de início, desconta 1
      if (
        !rec.efetivarMesAtual &&
        (ano > anoInicio ||
          (ano === anoInicio && mes > mesInicio))
      ) {
        mesesDesdeInicio -= 1;
      }
      
      const parcelasJaAplicadas = rec.parcelasTotal - rec.parcelasRestantes;
      const parcelasRestantesExibidas = rec.parcelasRestantes - mesesDesdeInicio;

      console.log('📊 Meses desde início:', mesesDesdeInicio);
      console.log('📊 Parcelas já aplicadas:', parcelasJaAplicadas);
      console.log('📊 Parcelas total:', rec.parcelasTotal);
      console.log('📊 Parcelas restantes exibidas:', parcelasRestantesExibidas);

      // Se não tem mais parcelas restantes para este período, não aplicar
      if (parcelasRestantesExibidas <= 0) {
        console.log('⏹️ Não há parcelas restantes para este período - não aplicar');
        return false;
      }
    }

    console.log('✅ Deve aplicar neste mês');
    return true;
  } catch (error) {
    console.error('Erro ao verificar se deve aplicar neste mês:', error);
    return true; // Em caso de erro, aplicar para não perder
  }
}

// Verificar se a recorrente já foi aplicada no mês
async function verificarSeJaAplicada(userId, budgetId, recorrenteId, ano, mes) {
  console.log('🚀 FUNÇÃO verificarSeJaAplicada CHAMADA!');
  console.log('🔍 Parâmetros:', { userId, budgetId, recorrenteId, ano, mes });
  try {
    console.log('🔍 Verificando se já aplicada:', recorrenteId);
    console.log('📅 Mês/Ano:', mes, ano);
    console.log('👤 UserId:', userId);
    console.log('💰 BudgetId atual:', budgetId);

    // Usar os dados já carregados no appState (mais confiável)
    const transacoes = window.appState.transactions || [];
    console.log('🔍 Total de transações no appState:', transacoes.length);

    // Filtrar transações desta recorrente no mês/ano especificado
    console.log('🔍 Analisando transações:');
    transacoes.forEach((transacao, index) => {
      console.log(`  Transação ${index + 1}:`, {
        id: transacao.id,
        descricao: transacao.descricao,
        recorrenteId: transacao.recorrenteId,
        createdAt: transacao.createdAt,
        budgetId: transacao.budgetId
      });
    });
    
    // Buscar a recorrente para obter a descrição
    const recorrente = window.appState.recorrentes.find(r => r.id === recorrenteId);
    const descricaoRecorrente = recorrente ? recorrente.descricao : '';
    console.log(`🔍 Descrição da recorrente procurada: "${descricaoRecorrente}"`);
    
    const transacoesDoMes = transacoes.filter(transacao => {
      console.log(`🔍 Verificando transação ${transacao.id}:`);
      console.log(`  - recorrenteId da transação: ${transacao.recorrenteId}`);
      console.log(`  - recorrenteId procurado: ${recorrenteId}`);
      console.log(`  - descrição da transação: "${transacao.descricao}"`);
      console.log(`  - descrição da recorrente: "${descricaoRecorrente}"`);
      
      // Verificar por ID OU por descrição (para casos de backup restaurado)
      const matchPorId = transacao.recorrenteId === recorrenteId;
      const matchPorDescricao = transacao.descricao === descricaoRecorrente;
      
      console.log(`  - Match por ID? ${matchPorId}`);
      console.log(`  - Match por descrição? ${matchPorDescricao}`);
      
      if (!matchPorId && !matchPorDescricao) {
        console.log(`  ❌ Nenhum match encontrado`);
        return false;
      }

      const data = transacao.createdAt;
      if (!data) {
        console.log('⚠️ Transação sem data:', transacao.id);
        return false;
      }

      const dataTransacao = data.toDate ? data.toDate() : new Date(data);
      const mesTransacao = dataTransacao.getMonth() + 1;
      const anoTransacao = dataTransacao.getFullYear();

      console.log(
        '📅 Transação:',
        transacao.id,
        'Data:',
        dataTransacao.toISOString(),
        'Mês/Ano:',
        mesTransacao,
        anoTransacao,
        'BudgetId:',
        transacao.budgetId
      );

      const match = mesTransacao === mes && anoTransacao === ano;
      console.log('✅ Match?', match);

      return match;
    });

    const jaAplicada = transacoesDoMes.length > 0;
    console.log('🔍 Transações do mês atual:', transacoesDoMes.length);
    console.log('🔍 Já aplicada?', jaAplicada);
    console.log('🔍 Já aplicada este mês?', jaAplicada);

    return jaAplicada;
  } catch (error) {
    console.error('Erro ao verificar se já aplicada:', error);
    return false;
  }
}

// Aplicar uma recorrente específica
async function aplicarRecorrente(rec, userId, budgetId, ano, mes) {
  try {
    const { collection, addDoc, Timestamp } = await import(
      'firebase/firestore'
    );

    // Data de lançamento
    const diaLancamento = rec.diaLancamento || 1;
    const dataLancamento = new Date(ano, mes - 1, diaLancamento);

    // Calcular parcela atual
    const parcelaAtual = calcularParcelaRecorrente(rec);
    
    // Criar transação
    const transacaoData = {
      userId,
      budgetId,
      descricao: rec.descricao,
      valor: rec.valor,
      categoriaId: rec.categoriaId,
      tipo: 'despesa',
      createdAt: Timestamp.fromDate(dataLancamento),
      recorrenteId: rec.id,
      recorrenteNome: rec.descricao,
      parcelaAtual: parcelaAtual,
      parcelasTotal: rec.parcelasTotal
    };

    console.log('💾 Criando transação com budgetId:', budgetId);
    console.log('💾 Transação data:', transacaoData);

    const transacaoRef = await addDoc(
      collection(db, 'transactions'),
      transacaoData
    );
    console.log(
      '✅ Transação criada:',
      transacaoRef.id,
      'para recorrente:',
      rec.descricao
    );

    // Atualizar parcelas restantes
    if (rec.parcelasRestantes !== null && rec.parcelasRestantes !== undefined) {
      const novasParcelas = Math.max(0, rec.parcelasRestantes - 1);

      if (novasParcelas <= 0) {
        // Desativar se acabaram as parcelas
        await updateDespesaRecorrente(userId, rec.id, {
          parcelasRestantes: 0,
          ativa: false
        });
        console.log(
          '🔄 Recorrente desativada (parcelas esgotadas):',
          rec.descricao
        );
      } else {
        // Decrementar parcelas
        await updateDespesaRecorrente(userId, rec.id, {
          parcelasRestantes: novasParcelas
        });
        console.log(
          '🔄 Parcelas atualizadas:',
          novasParcelas,
          'restantes para:',
          rec.descricao
        );
      }
    }

    // Registrar no log
    await registrarAplicacaoNoLog(
      userId,
      `${ano}-${String(mes).padStart(2, '0')}`,
      transacaoData,
      transacaoRef.id
    );
  } catch (error) {
    console.error('Erro ao aplicar recorrente:', error);
    throw error;
  }
}

// Registrar aplicação no log
async function registrarAplicacaoNoLog(
  userId,
  mesAno,
  transacaoData,
  transacaoId
) {
  try {
    const { collection, addDoc, serverTimestamp } = await import(
      'firebase/firestore'
    );

    const logData = {
      userId,
      mesAno,
      recorrenteId: transacaoData.recorrenteId,
      descricao: transacaoData.descricao,
      valor: transacaoData.valor,
      dataAplicacao: serverTimestamp(),
      aplicacaoImediata: false
    };

    // Só adicionar transacaoId se não for undefined
    if (transacaoId) {
      logData.transacaoId = transacaoId;
    }

    await addDoc(collection(db, 'logAplicacoes'), logData);
    console.log('📝 Aplicação registrada no log');
  } catch (error) {
    console.error('Erro ao registrar no log:', error);
  }
}

// Função para limpar logs antigos (manter apenas últimos 12 meses)
export async function limparLogsAntigos(userId) {
  try {
    const { collection, query, where, getDocs, deleteDoc, doc } = await import(
      'firebase/firestore'
    );
    
    const agora = new Date();
    const limiteData = new Date(agora.getFullYear() - 1, agora.getMonth(), agora.getDate());
    
    const q = query(
      collection(db, 'logAplicacoes'),
      where('userId', '==', userId),
      where('dataAplicacao', '<', limiteData)
    );
    
    const snapshot = await getDocs(q);
    let deletados = 0;
    
    for (const docSnapshot of snapshot.docs) {
      await deleteDoc(doc(db, 'logAplicacoes', docSnapshot.id));
      deletados++;
    }
    
    console.log(`🧹 ${deletados} logs antigos removidos`);
    return deletados;
  } catch (error) {
    console.error('Erro ao limpar logs antigos:', error);
    return 0;
  }
}

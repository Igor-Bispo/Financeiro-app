/**
 * Script de Diagnóstico para Problemas de Recorrentes no Backup
 * 
 * Este script analisa os dados das recorrentes exportadas e importadas
 * para identificar problemas comuns que fazem as recorrentes "virem bugadas".
 */

console.log('🔍 Diagnóstico de Recorrentes no Backup iniciado!');

/**
 * Analisa os dados das recorrentes no appState atual
 */
window.analisarRecorrentesAtuais = function() {
  console.log('\n📊 === ANÁLISE DAS RECORRENTES ATUAIS ===');
  
  if (!window.appState?.recorrentes) {
    console.log('❌ Nenhuma recorrente encontrada no appState');
    return;
  }
  
  const recorrentes = window.appState.recorrentes;
  console.log(`📋 Total de recorrentes: ${recorrentes.length}`);
  
  let problemasEncontrados = 0;
  
  recorrentes.forEach((rec, index) => {
    console.log(`\n🔘 Recorrente ${index + 1}: "${rec.descricao}"`);
    console.log(`   ID: ${rec.id}`);
    console.log(`   Budget ID: ${rec.budgetId}`);
    console.log(`   User ID: ${rec.userId}`);
    
    // Verificar campos obrigatórios
    const camposObrigatorios = ['descricao', 'valor', 'categoriaId', 'diaLancamento', 'dataInicio'];
    const camposFaltando = camposObrigatorios.filter(campo => !rec[campo]);
    
    if (camposFaltando.length > 0) {
      console.log(`   ❌ Campos obrigatórios faltando: ${camposFaltando.join(', ')}`);
      problemasEncontrados++;
    } else {
      console.log(`   ✅ Campos obrigatórios OK`);
    }
    
    // Verificar campos de parcelas
    console.log(`   📦 Parcelas Total: ${rec.parcelasTotal} (tipo: ${typeof rec.parcelasTotal})`);
    console.log(`   📦 Parcelas Restantes: ${rec.parcelasRestantes} (tipo: ${typeof rec.parcelasRestantes})`);
    
    // Verificar consistência das parcelas
    if (rec.parcelasTotal && rec.parcelasTotal > 1) {
      if (!rec.parcelasRestantes && rec.parcelasRestantes !== 0) {
        console.log(`   ⚠️ Recorrente parcelada sem parcelasRestantes definido`);
        problemasEncontrados++;
      } else if (rec.parcelasRestantes > rec.parcelasTotal) {
        console.log(`   ❌ Parcelas restantes (${rec.parcelasRestantes}) > total (${rec.parcelasTotal})`);
        problemasEncontrados++;
      } else {
        console.log(`   ✅ Parcelas consistentes`);
      }
    }
    
    // Verificar data de início
    if (rec.dataInicio) {
      try {
        const dataInicio = new Date(rec.dataInicio);
        if (isNaN(dataInicio.getTime())) {
          console.log(`   ❌ Data de início inválida: ${rec.dataInicio}`);
          problemasEncontrados++;
        } else {
          console.log(`   ✅ Data de início válida: ${dataInicio.toLocaleDateString()}`);
        }
      } catch (error) {
        console.log(`   ❌ Erro ao processar data de início: ${error.message}`);
        problemasEncontrados++;
      }
    }
    
    // Verificar status ativo
    console.log(`   🔄 Ativa: ${rec.ativa} (tipo: ${typeof rec.ativa})`);
    
    // Verificar categoria
    const categoria = window.appState.categories?.find(c => c.id === rec.categoriaId);
    if (categoria) {
      console.log(`   📂 Categoria: "${categoria.nome}" (${categoria.tipo})`);
    } else {
      console.log(`   ❌ Categoria não encontrada: ${rec.categoriaId}`);
      problemasEncontrados++;
    }
    
    // Verificar campo efetivarMesAtual
    console.log(`   📅 Efetivar Mês Atual: ${rec.efetivarMesAtual} (tipo: ${typeof rec.efetivarMesAtual})`);
  });
  
  console.log(`\n📊 === RESUMO DA ANÁLISE ===`);
  console.log(`✅ Recorrentes analisadas: ${recorrentes.length}`);
  console.log(`${problemasEncontrados > 0 ? '❌' : '✅'} Problemas encontrados: ${problemasEncontrados}`);
  
  return {
    total: recorrentes.length,
    problemas: problemasEncontrados,
    recorrentes: recorrentes
  };
};

/**
 * Simula um backup e analisa os dados exportados
 */
window.simularBackupRecorrentes = function() {
  console.log('\n💾 === SIMULAÇÃO DE BACKUP ===');
  
  if (!window.appState?.recorrentes) {
    console.log('❌ Nenhuma recorrente para exportar');
    return;
  }
  
  // Simular dados do backup
  const dadosBackup = {
    recorrentes: window.appState.recorrentes,
    categories: window.appState.categories || [],
    transactions: window.appState.transactions || [],
    budgets: window.appState.budgets || []
  };
  
  console.log('📦 Dados que seriam exportados:');
  console.log(`   - ${dadosBackup.recorrentes.length} recorrentes`);
  console.log(`   - ${dadosBackup.categories.length} categorias`);
  console.log(`   - ${dadosBackup.transactions.length} transações`);
  console.log(`   - ${dadosBackup.budgets.length} orçamentos`);
  
  // Analisar estrutura JSON
  try {
    const jsonString = JSON.stringify(dadosBackup, null, 2);
    console.log(`📄 Tamanho do JSON: ${(jsonString.length / 1024).toFixed(2)} KB`);
    
    // Verificar se há campos que podem ser perdidos na serialização
    dadosBackup.recorrentes.forEach((rec, index) => {
      const recJson = JSON.parse(JSON.stringify(rec));
      
      // Verificar se algum campo foi perdido
      const camposOriginais = Object.keys(rec);
      const camposJson = Object.keys(recJson);
      const camposPerdidos = camposOriginais.filter(campo => !camposJson.includes(campo));
      
      if (camposPerdidos.length > 0) {
        console.log(`   ⚠️ Recorrente ${index + 1}: Campos perdidos na serialização: ${camposPerdidos.join(', ')}`);
      }
      
      // Verificar tipos de dados
      camposOriginais.forEach(campo => {
        const tipoOriginal = typeof rec[campo];
        const tipoJson = typeof recJson[campo];
        
        if (tipoOriginal !== tipoJson) {
          console.log(`   ⚠️ Recorrente ${index + 1}: Tipo alterado no campo "${campo}": ${tipoOriginal} → ${tipoJson}`);
        }
      });
    });
    
    console.log('✅ Simulação de backup concluída');
    return dadosBackup;
    
  } catch (error) {
    console.log(`❌ Erro na serialização JSON: ${error.message}`);
    return null;
  }
};

/**
 * Analisa dados de um backup carregado
 */
window.analisarBackupRecorrentes = function(dadosBackup) {
  console.log('\n📁 === ANÁLISE DE BACKUP CARREGADO ===');
  
  if (!dadosBackup) {
    console.log('❌ Nenhum dado de backup fornecido');
    console.log('💡 Use: analisarBackupRecorrentes(meusDadosDeBackup)');
    return;
  }
  
  if (!dadosBackup.recorrentes) {
    console.log('❌ Backup não contém dados de recorrentes');
    return;
  }
  
  const recorrentes = dadosBackup.recorrentes;
  console.log(`📋 Recorrentes no backup: ${recorrentes.length}`);
  
  let problemasEncontrados = 0;
  
  recorrentes.forEach((rec, index) => {
    console.log(`\n🔘 Recorrente ${index + 1}: "${rec.descricao}"`);
    
    // Verificar se tem ID (será removido na importação)
    if (rec.id) {
      console.log(`   🆔 ID original: ${rec.id} (será removido na importação)`);
    } else {
      console.log(`   ⚠️ Sem ID original`);
    }
    
    // Verificar campos essenciais
    const camposEssenciais = ['descricao', 'valor', 'categoriaId', 'diaLancamento', 'dataInicio'];
    const camposFaltando = camposEssenciais.filter(campo => rec[campo] === undefined || rec[campo] === null);
    
    if (camposFaltando.length > 0) {
      console.log(`   ❌ Campos essenciais faltando: ${camposFaltando.join(', ')}`);
      problemasEncontrados++;
    }
    
    // Verificar se categoria existe no backup
    if (dadosBackup.categories) {
      const categoria = dadosBackup.categories.find(c => c.id === rec.categoriaId);
      if (categoria) {
        console.log(`   📂 Categoria no backup: "${categoria.nome}"`);
      } else {
        console.log(`   ❌ Categoria não encontrada no backup: ${rec.categoriaId}`);
        problemasEncontrados++;
      }
    }
    
    // Verificar campos de timestamp
    if (rec.createdAt) {
      console.log(`   📅 CreatedAt: ${rec.createdAt} (tipo: ${typeof rec.createdAt})`);
      
      // Verificar se é um timestamp do Firestore
      if (typeof rec.createdAt === 'object' && rec.createdAt.seconds) {
        console.log(`   ⚠️ Timestamp do Firestore detectado - pode causar problemas na importação`);
        problemasEncontrados++;
      }
    }
    
    // Verificar campos específicos das recorrentes
    console.log(`   📦 Parcelas Total: ${rec.parcelasTotal}`);
    console.log(`   📦 Parcelas Restantes: ${rec.parcelasRestantes}`);
    console.log(`   🔄 Ativa: ${rec.ativa}`);
    console.log(`   📅 Efetivar Mês Atual: ${rec.efetivarMesAtual}`);
  });
  
  console.log(`\n📊 === RESUMO DA ANÁLISE DO BACKUP ===`);
  console.log(`✅ Recorrentes analisadas: ${recorrentes.length}`);
  console.log(`${problemasEncontrados > 0 ? '❌' : '✅'} Problemas encontrados: ${problemasEncontrados}`);
  
  return {
    total: recorrentes.length,
    problemas: problemasEncontrados,
    recorrentes: recorrentes
  };
};

/**
 * Compara recorrentes antes e depois da importação
 */
window.compararRecorrentes = function(recorrentesAntes, recorrentesDepois) {
  console.log('\n🔄 === COMPARAÇÃO ANTES/DEPOIS ===');
  
  console.log(`📊 Antes: ${recorrentesAntes?.length || 0} recorrentes`);
  console.log(`📊 Depois: ${recorrentesDepois?.length || 0} recorrentes`);
  
  if (!recorrentesAntes || !recorrentesDepois) {
    console.log('❌ Dados insuficientes para comparação');
    return;
  }
  
  // Comparar por descrição (já que IDs mudam)
  recorrentesAntes.forEach((recAntes, index) => {
    const recDepois = recorrentesDepois.find(r => r.descricao === recAntes.descricao);
    
    console.log(`\n🔘 "${recAntes.descricao}"`);
    
    if (!recDepois) {
      console.log(`   ❌ Não encontrada após importação`);
      return;
    }
    
    console.log(`   ✅ Encontrada após importação`);
    
    // Comparar campos importantes
    const camposImportantes = ['valor', 'categoriaId', 'diaLancamento', 'dataInicio', 'parcelasTotal', 'parcelasRestantes', 'ativa', 'efetivarMesAtual'];
    
    camposImportantes.forEach(campo => {
      const valorAntes = recAntes[campo];
      const valorDepois = recDepois[campo];
      
      if (valorAntes !== valorDepois) {
        console.log(`   ⚠️ ${campo}: ${valorAntes} → ${valorDepois}`);
      }
    });
    
    // Verificar se budgetId foi atualizado
    if (recAntes.budgetId !== recDepois.budgetId) {
      console.log(`   🔄 Budget ID atualizado: ${recAntes.budgetId} → ${recDepois.budgetId}`);
    }
    
    // Verificar se userId foi atualizado
    if (recAntes.userId !== recDepois.userId) {
      console.log(`   🔄 User ID atualizado: ${recAntes.userId} → ${recDepois.userId}`);
    }
  });
};

/**
 * Identifica problemas comuns nas recorrentes
 */
window.identificarProblemasComuns = function() {
  console.log('\n🔍 === IDENTIFICAÇÃO DE PROBLEMAS COMUNS ===');
  
  const problemas = [];
  
  if (!window.appState?.recorrentes) {
    problemas.push('Nenhuma recorrente carregada no appState');
    console.log('❌ Nenhuma recorrente carregada no appState');
    return problemas;
  }
  
  const recorrentes = window.appState.recorrentes;
  
  recorrentes.forEach((rec, index) => {
    const prefixo = `Recorrente "${rec.descricao}"`;
    
    // Problema 1: Campos obrigatórios faltando
    if (!rec.descricao) problemas.push(`${prefixo}: Sem descrição`);
    if (!rec.valor) problemas.push(`${prefixo}: Sem valor`);
    if (!rec.categoriaId) problemas.push(`${prefixo}: Sem categoria`);
    if (!rec.diaLancamento) problemas.push(`${prefixo}: Sem dia de lançamento`);
    if (!rec.dataInicio) problemas.push(`${prefixo}: Sem data de início`);
    
    // Problema 2: Categoria inexistente
    const categoria = window.appState.categories?.find(c => c.id === rec.categoriaId);
    if (!categoria) {
      problemas.push(`${prefixo}: Categoria não encontrada (${rec.categoriaId})`);
    }
    
    // Problema 3: Parcelas inconsistentes
    if (rec.parcelasTotal && rec.parcelasTotal > 1) {
      if (rec.parcelasRestantes === undefined || rec.parcelasRestantes === null) {
        problemas.push(`${prefixo}: Parcelada mas sem parcelasRestantes`);
      } else if (rec.parcelasRestantes > rec.parcelasTotal) {
        problemas.push(`${prefixo}: Parcelas restantes > total`);
      }
    }
    
    // Problema 4: Data de início inválida
    if (rec.dataInicio) {
      try {
        const data = new Date(rec.dataInicio);
        if (isNaN(data.getTime())) {
          problemas.push(`${prefixo}: Data de início inválida`);
        }
      } catch (error) {
        problemas.push(`${prefixo}: Erro ao processar data de início`);
      }
    }
    
    // Problema 5: Status ativo inconsistente
    if (rec.ativa !== true && rec.ativa !== false) {
      problemas.push(`${prefixo}: Status ativo inconsistente (${rec.ativa})`);
    }
    
    // Problema 6: Budget/User ID faltando
    if (!rec.budgetId) problemas.push(`${prefixo}: Sem budgetId`);
    if (!rec.userId) problemas.push(`${prefixo}: Sem userId`);
  });
  
  console.log(`\n📊 Total de problemas encontrados: ${problemas.length}`);
  
  if (problemas.length > 0) {
    console.log('\n❌ Problemas identificados:');
    problemas.forEach((problema, index) => {
      console.log(`   ${index + 1}. ${problema}`);
    });
  } else {
    console.log('✅ Nenhum problema comum identificado!');
  }
  
  return problemas;
};

/**
 * Executa diagnóstico completo
 */
window.diagnosticoCompletoRecorrentes = function() {
  console.log('🔍 === DIAGNÓSTICO COMPLETO DE RECORRENTES ===\n');
  
  const resultados = {
    analiseAtual: window.analisarRecorrentesAtuais(),
    simulacaoBackup: window.simularBackupRecorrentes(),
    problemasComuns: window.identificarProblemasComuns()
  };
  
  console.log('\n📊 === RESUMO GERAL ===');
  console.log(`📋 Recorrentes atuais: ${resultados.analiseAtual?.total || 0}`);
  console.log(`❌ Problemas na análise atual: ${resultados.analiseAtual?.problemas || 0}`);
  console.log(`❌ Problemas comuns identificados: ${resultados.problemasComuns?.length || 0}`);
  
  if (resultados.analiseAtual?.problemas > 0 || resultados.problemasComuns?.length > 0) {
    console.log('\n⚠️ ATENÇÃO: Problemas encontrados nas recorrentes!');
    console.log('💡 Recomendações:');
    console.log('   1. Verifique os dados antes de fazer backup');
    console.log('   2. Corrija os problemas identificados');
    console.log('   3. Teste a importação em ambiente de desenvolvimento');
  } else {
    console.log('\n✅ Nenhum problema crítico encontrado!');
  }
  
  return resultados;
};

console.log('\n✅ Script de diagnóstico carregado!');
console.log('📋 Comandos disponíveis:');
console.log('  - analisarRecorrentesAtuais() - Analisa recorrentes no appState');
console.log('  - simularBackupRecorrentes() - Simula exportação de backup');
console.log('  - analisarBackupRecorrentes(dados) - Analisa dados de backup');
console.log('  - compararRecorrentes(antes, depois) - Compara antes/depois');
console.log('  - identificarProblemasComuns() - Identifica problemas conhecidos');
console.log('  - diagnosticoCompletoRecorrentes() - Executa diagnóstico completo');
console.log('\n💡 Para começar, execute: diagnosticoCompletoRecorrentes()');
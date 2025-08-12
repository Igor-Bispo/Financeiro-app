/**
 * Script de Correção para Problemas de Recorrentes no Backup
 * 
 * Este script identifica e corrige os problemas mais comuns que fazem
 * as recorrentes "virem bugadas" após a importação de backup.
 */

console.log('🔧 Script de Correção de Recorrentes no Backup iniciado!');

/**
 * Corrige timestamps do Firestore em dados de backup
 */
window.corrigirTimestampsBackup = function(dadosBackup) {
  console.log('\n🕐 === CORREÇÃO DE TIMESTAMPS ===');
  
  if (!dadosBackup || !dadosBackup.recorrentes) {
    console.log('❌ Dados de backup inválidos ou sem recorrentes');
    return dadosBackup;
  }
  
  let timestampsCorrigidos = 0;
  
  dadosBackup.recorrentes.forEach((rec, index) => {
    console.log(`\n🔘 Processando recorrente ${index + 1}: "${rec.descricao}"`);
    
    // Corrigir createdAt se for timestamp do Firestore
    if (rec.createdAt && typeof rec.createdAt === 'object' && rec.createdAt.seconds) {
      const dataOriginal = rec.createdAt;
      const dataCorrigida = new Date(dataOriginal.seconds * 1000);
      rec.createdAt = dataCorrigida.toISOString();
      
      console.log(`   🕐 CreatedAt corrigido: ${dataOriginal.seconds} → ${rec.createdAt}`);
      timestampsCorrigidos++;
    }
    
    // Corrigir updatedAt se existir
    if (rec.updatedAt && typeof rec.updatedAt === 'object' && rec.updatedAt.seconds) {
      const dataOriginal = rec.updatedAt;
      const dataCorrigida = new Date(dataOriginal.seconds * 1000);
      rec.updatedAt = dataCorrigida.toISOString();
      
      console.log(`   🕐 UpdatedAt corrigido: ${dataOriginal.seconds} → ${rec.updatedAt}`);
      timestampsCorrigidos++;
    }
    
    // Verificar e corrigir dataInicio se for timestamp
    if (rec.dataInicio && typeof rec.dataInicio === 'object' && rec.dataInicio.seconds) {
      const dataOriginal = rec.dataInicio;
      const dataCorrigida = new Date(dataOriginal.seconds * 1000);
      rec.dataInicio = dataCorrigida.toISOString();
      
      console.log(`   🕐 DataInicio corrigida: ${dataOriginal.seconds} → ${rec.dataInicio}`);
      timestampsCorrigidos++;
    }
  });
  
  console.log(`\n✅ Correção de timestamps concluída: ${timestampsCorrigidos} campos corrigidos`);
  return dadosBackup;
};

/**
 * Valida e corrige campos obrigatórios das recorrentes
 */
window.validarCamposRecorrentes = function(dadosBackup) {
  console.log('\n✅ === VALIDAÇÃO DE CAMPOS ===');
  
  if (!dadosBackup || !dadosBackup.recorrentes) {
    console.log('❌ Dados de backup inválidos ou sem recorrentes');
    return { dadosBackup, problemasEncontrados: [] };
  }
  
  const problemas = [];
  const recorrentesValidas = [];
  
  dadosBackup.recorrentes.forEach((rec, index) => {
    console.log(`\n🔘 Validando recorrente ${index + 1}: "${rec.descricao}"`);
    
    const problemasRecorrente = [];
    
    // Validar campos obrigatórios
    if (!rec.descricao || rec.descricao.trim() === '') {
      problemasRecorrente.push('Descrição vazia ou inválida');
    }
    
    if (!rec.valor || isNaN(parseFloat(rec.valor)) || parseFloat(rec.valor) <= 0) {
      problemasRecorrente.push('Valor inválido ou zero');
    }
    
    if (!rec.categoriaId || rec.categoriaId.trim() === '') {
      problemasRecorrente.push('Categoria não definida');
    }
    
    if (!rec.diaLancamento || isNaN(parseInt(rec.diaLancamento)) || parseInt(rec.diaLancamento) < 1 || parseInt(rec.diaLancamento) > 31) {
      problemasRecorrente.push('Dia de lançamento inválido');
    }
    
    if (!rec.dataInicio) {
      problemasRecorrente.push('Data de início não definida');
    } else {
      // Validar se a data é válida
      try {
        const data = new Date(rec.dataInicio);
        if (isNaN(data.getTime())) {
          problemasRecorrente.push('Data de início inválida');
        }
      } catch (error) {
        problemasRecorrente.push('Erro ao processar data de início');
      }
    }
    
    // Validar parcelas se for parcelada
    if (rec.parcelasTotal && rec.parcelasTotal > 1) {
      if (!rec.parcelasRestantes && rec.parcelasRestantes !== 0) {
        console.log(`   ⚠️ Corrigindo parcelasRestantes: undefined → ${rec.parcelasTotal}`);
        rec.parcelasRestantes = rec.parcelasTotal;
      } else if (rec.parcelasRestantes > rec.parcelasTotal) {
        console.log(`   ⚠️ Corrigindo parcelasRestantes: ${rec.parcelasRestantes} → ${rec.parcelasTotal}`);
        rec.parcelasRestantes = rec.parcelasTotal;
      }
    }
    
    // Garantir que ativa seja boolean
    if (rec.ativa !== true && rec.ativa !== false) {
      console.log(`   ⚠️ Corrigindo campo ativa: ${rec.ativa} → true`);
      rec.ativa = true;
    }
    
    // Garantir que efetivarMesAtual seja boolean
    if (rec.efetivarMesAtual !== true && rec.efetivarMesAtual !== false) {
      console.log(`   ⚠️ Corrigindo campo efetivarMesAtual: ${rec.efetivarMesAtual} → false`);
      rec.efetivarMesAtual = false;
    }
    
    // Verificar se categoria existe no backup
    if (dadosBackup.categories) {
      const categoria = dadosBackup.categories.find(c => c.id === rec.categoriaId);
      if (!categoria) {
        problemasRecorrente.push(`Categoria não encontrada no backup: ${rec.categoriaId}`);
      }
    }
    
    if (problemasRecorrente.length > 0) {
      console.log(`   ❌ Problemas encontrados:`);
      problemasRecorrente.forEach(problema => {
        console.log(`      - ${problema}`);
      });
      
      problemas.push({
        indice: index + 1,
        descricao: rec.descricao,
        problemas: problemasRecorrente
      });
    } else {
      console.log(`   ✅ Recorrente válida`);
      recorrentesValidas.push(rec);
    }
  });
  
  console.log(`\n📊 === RESUMO DA VALIDAÇÃO ===`);
  console.log(`✅ Recorrentes válidas: ${recorrentesValidas.length}`);
  console.log(`❌ Recorrentes com problemas: ${problemas.length}`);
  
  if (problemas.length > 0) {
    console.log(`\n❌ Problemas encontrados:`);
    problemas.forEach(problema => {
      console.log(`   ${problema.indice}. "${problema.descricao}":`);
      problema.problemas.forEach(p => {
        console.log(`      - ${p}`);
      });
    });
  }
  
  // Atualizar dados do backup apenas com recorrentes válidas
  dadosBackup.recorrentes = recorrentesValidas;
  
  return {
    dadosBackup,
    problemasEncontrados: problemas,
    recorrentesValidas: recorrentesValidas.length,
    recorrentesInvalidas: problemas.length
  };
};

/**
 * Corrige IDs de categorias baseado no mapeamento do backup
 */
window.corrigirCategoriasRecorrentes = function(dadosBackup) {
  console.log('\n📂 === CORREÇÃO DE CATEGORIAS ===');
  
  if (!dadosBackup || !dadosBackup.recorrentes || !dadosBackup.categories) {
    console.log('❌ Dados insuficientes para correção de categorias');
    return dadosBackup;
  }
  
  let categoriasCorrigidas = 0;
  const mapeamentoCategoria = new Map();
  
  // Criar mapeamento de categorias por nome
  dadosBackup.categories.forEach(cat => {
    mapeamentoCategoria.set(cat.nome.toLowerCase(), cat.id);
  });
  
  dadosBackup.recorrentes.forEach((rec, index) => {
    console.log(`\n🔘 Verificando categoria da recorrente ${index + 1}: "${rec.descricao}"`);
    
    const categoria = dadosBackup.categories.find(c => c.id === rec.categoriaId);
    
    if (!categoria) {
      console.log(`   ❌ Categoria não encontrada: ${rec.categoriaId}`);
      
      // Tentar encontrar categoria por nome similar
      const nomeRecorrente = rec.descricao.toLowerCase();
      let categoriaEncontrada = null;
      
      // Buscar categoria que contenha parte do nome da recorrente
      for (const [nomeCategoria, idCategoria] of mapeamentoCategoria) {
        if (nomeRecorrente.includes(nomeCategoria) || nomeCategoria.includes(nomeRecorrente)) {
          categoriaEncontrada = dadosBackup.categories.find(c => c.id === idCategoria);
          break;
        }
      }
      
      if (categoriaEncontrada) {
        console.log(`   🔄 Categoria corrigida: ${rec.categoriaId} → ${categoriaEncontrada.id} ("${categoriaEncontrada.nome}")`);
        rec.categoriaId = categoriaEncontrada.id;
        categoriasCorrigidas++;
      } else {
        console.log(`   ⚠️ Não foi possível encontrar categoria adequada`);
      }
    } else {
      console.log(`   ✅ Categoria válida: "${categoria.nome}"`);
    }
  });
  
  console.log(`\n✅ Correção de categorias concluída: ${categoriasCorrigidas} categorias corrigidas`);
  return dadosBackup;
};

/**
 * Remove campos desnecessários que podem causar problemas na importação
 */
window.limparCamposRecorrentes = function(dadosBackup) {
  console.log('\n🧹 === LIMPEZA DE CAMPOS ===');
  
  if (!dadosBackup || !dadosBackup.recorrentes) {
    console.log('❌ Dados de backup inválidos ou sem recorrentes');
    return dadosBackup;
  }
  
  let camposRemovidos = 0;
  
  dadosBackup.recorrentes.forEach((rec, index) => {
    console.log(`\n🔘 Limpando recorrente ${index + 1}: "${rec.descricao}"`);
    
    // Campos que devem ser removidos antes da importação
    const camposParaRemover = ['id', 'createdAt', 'updatedAt'];
    
    camposParaRemover.forEach(campo => {
      if (rec.hasOwnProperty(campo)) {
        console.log(`   🗑️ Removendo campo: ${campo}`);
        delete rec[campo];
        camposRemovidos++;
      }
    });
    
    // Garantir que campos numéricos sejam números
    if (rec.valor) {
      rec.valor = parseFloat(rec.valor);
    }
    
    if (rec.diaLancamento) {
      rec.diaLancamento = parseInt(rec.diaLancamento);
    }
    
    if (rec.parcelasTotal) {
      rec.parcelasTotal = parseInt(rec.parcelasTotal);
    }
    
    if (rec.parcelasRestantes) {
      rec.parcelasRestantes = parseInt(rec.parcelasRestantes);
    }
  });
  
  console.log(`\n✅ Limpeza concluída: ${camposRemovidos} campos removidos`);
  return dadosBackup;
};

/**
 * Executa correção completa dos dados de backup
 */
window.corrigirBackupCompleto = function(dadosBackup) {
  console.log('🔧 === CORREÇÃO COMPLETA DE BACKUP ===\n');
  
  if (!dadosBackup) {
    console.log('❌ Nenhum dado de backup fornecido');
    console.log('💡 Use: corrigirBackupCompleto(meusDadosDeBackup)');
    return null;
  }
  
  let dadosCorrigidos = JSON.parse(JSON.stringify(dadosBackup)); // Deep clone
  
  try {
    // 1. Corrigir timestamps
    dadosCorrigidos = window.corrigirTimestampsBackup(dadosCorrigidos);
    
    // 2. Corrigir categorias
    dadosCorrigidos = window.corrigirCategoriasRecorrentes(dadosCorrigidos);
    
    // 3. Validar e corrigir campos
    const resultadoValidacao = window.validarCamposRecorrentes(dadosCorrigidos);
    dadosCorrigidos = resultadoValidacao.dadosBackup;
    
    // 4. Limpar campos desnecessários
    dadosCorrigidos = window.limparCamposRecorrentes(dadosCorrigidos);
    
    console.log('\n🎉 === CORREÇÃO COMPLETA FINALIZADA ===');
    console.log(`✅ Recorrentes válidas: ${resultadoValidacao.recorrentesValidas}`);
    console.log(`❌ Recorrentes removidas: ${resultadoValidacao.recorrentesInvalidas}`);
    
    if (resultadoValidacao.recorrentesInvalidas > 0) {
      console.log('\n⚠️ ATENÇÃO: Algumas recorrentes foram removidas por terem problemas críticos.');
      console.log('💡 Verifique os logs acima para detalhes dos problemas encontrados.');
    }
    
    console.log('\n💾 Para usar os dados corrigidos:');
    console.log('   1. Copie o objeto retornado');
    console.log('   2. Use-o na função de restauração de backup');
    console.log('   3. Ou salve como novo arquivo de backup');
    
    return dadosCorrigidos;
    
  } catch (error) {
    console.error('❌ Erro durante correção:', error);
    return null;
  }
};

/**
 * Salva dados corrigidos como novo arquivo de backup
 */
window.salvarBackupCorrigido = function(dadosCorrigidos, nomeArquivo = 'backup-recorrentes-corrigido.json') {
  console.log('\n💾 === SALVANDO BACKUP CORRIGIDO ===');
  
  if (!dadosCorrigidos) {
    console.log('❌ Nenhum dado corrigido fornecido');
    return;
  }
  
  try {
    const jsonString = JSON.stringify(dadosCorrigidos, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = nomeArquivo;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    URL.revokeObjectURL(url);
    
    console.log(`✅ Backup corrigido salvo como: ${nomeArquivo}`);
    console.log(`📊 Tamanho: ${(jsonString.length / 1024).toFixed(2)} KB`);
    
  } catch (error) {
    console.error('❌ Erro ao salvar backup:', error);
  }
};

/**
 * Exemplo de uso completo
 */
window.exemploCorrecaoCompleta = function() {
  console.log('\n📖 === EXEMPLO DE USO ===');
  console.log('\n// 1. Carregar dados de backup (substitua por seus dados reais):');
  console.log('const meuBackup = { /* seus dados de backup aqui */ };');
  console.log('\n// 2. Executar correção completa:');
  console.log('const backupCorrigido = corrigirBackupCompleto(meuBackup);');
  console.log('\n// 3. Salvar backup corrigido (opcional):');
  console.log('salvarBackupCorrigido(backupCorrigido, "meu-backup-corrigido.json");');
  console.log('\n// 4. Usar backup corrigido na restauração:');
  console.log('// Cole o backupCorrigido na função de restauração do app');
};

console.log('\n✅ Script de correção carregado!');
console.log('📋 Comandos disponíveis:');
console.log('  - corrigirTimestampsBackup(dados) - Corrige timestamps do Firestore');
console.log('  - validarCamposRecorrentes(dados) - Valida e corrige campos');
console.log('  - corrigirCategoriasRecorrentes(dados) - Corrige IDs de categorias');
console.log('  - limparCamposRecorrentes(dados) - Remove campos desnecessários');
console.log('  - corrigirBackupCompleto(dados) - Executa correção completa');
console.log('  - salvarBackupCorrigido(dados, nome) - Salva backup corrigido');
console.log('  - exemploCorrecaoCompleta() - Mostra exemplo de uso');
console.log('\n💡 Para começar, execute: exemploCorrecaoCompleta()');
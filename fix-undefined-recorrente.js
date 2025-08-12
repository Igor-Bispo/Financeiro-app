/**
 * Script para identificar e corrigir recorrentes com descrição 'undefined'
 * 
 * Este problema ocorre quando dados de backup contêm recorrentes com campos
 * obrigatórios vazios ou undefined, especialmente a descrição.
 */

console.log('🔧 Script de Correção de Recorrente "undefined" iniciado!');

/**
 * Identifica recorrentes com problemas
 */
window.identificarRecorrentesProblematicas = function() {
  console.log('\n🔍 === IDENTIFICANDO RECORRENTES PROBLEMÁTICAS ===');
  
  if (!window.appState?.recorrentes) {
    console.log('❌ Nenhuma recorrente encontrada no estado atual');
    return [];
  }
  
  const recorrentes = window.appState.recorrentes;
  const problematicas = [];
  
  console.log(`📋 Analisando ${recorrentes.length} recorrentes...`);
  
  recorrentes.forEach((rec, index) => {
    const problemas = [];
    
    // Verificar descrição
    if (!rec.descricao || rec.descricao === 'undefined' || rec.descricao.trim() === '') {
      problemas.push('Descrição inválida');
    }
    
    // Verificar valor
    if (!rec.valor || isNaN(parseFloat(rec.valor)) || parseFloat(rec.valor) <= 0) {
      problemas.push('Valor inválido');
    }
    
    // Verificar categoria
    if (!rec.categoriaId) {
      problemas.push('Categoria não definida');
    }
    
    // Verificar dia de lançamento
    if (!rec.diaLancamento || rec.diaLancamento < 1 || rec.diaLancamento > 31) {
      problemas.push('Dia de lançamento inválido');
    }
    
    if (problemas.length > 0) {
      console.log(`\n❌ Recorrente ${index + 1} problemática:`);
      console.log(`   📝 Descrição: "${rec.descricao}"`);
      console.log(`   💰 Valor: ${rec.valor}`);
      console.log(`   📂 Categoria ID: ${rec.categoriaId}`);
      console.log(`   📅 Dia: ${rec.diaLancamento}`);
      console.log(`   🚨 Problemas: ${problemas.join(', ')}`);
      
      problematicas.push({
        index,
        recorrente: rec,
        problemas
      });
    }
  });
  
  console.log(`\n📊 === RESUMO ===`);
  console.log(`✅ Recorrentes válidas: ${recorrentes.length - problematicas.length}`);
  console.log(`❌ Recorrentes problemáticas: ${problematicas.length}`);
  
  return problematicas;
};

/**
 * Remove recorrentes problemáticas
 */
window.removerRecorrentesProblematicas = async function() {
  console.log('\n🗑️ === REMOVENDO RECORRENTES PROBLEMÁTICAS ===');
  
  const problematicas = window.identificarRecorrentesProblematicas();
  
  if (problematicas.length === 0) {
    console.log('✅ Nenhuma recorrente problemática encontrada!');
    return;
  }
  
  console.log(`\n⚠️ Serão removidas ${problematicas.length} recorrentes problemáticas.`);
  console.log('Esta ação é irreversível!');
  
  const confirmacao = confirm(`Deseja remover ${problematicas.length} recorrentes problemáticas?\n\nEsta ação é irreversível!`);
  
  if (!confirmacao) {
    console.log('❌ Operação cancelada pelo usuário');
    return;
  }
  
  let removidas = 0;
  
  for (const item of problematicas) {
    try {
      const recorrente = item.recorrente;
      
      if (recorrente.id) {
        // Importar função de remoção
        const { deleteDespesaRecorrente } = await import('./src/js/recorrentes.js');
        
        await deleteDespesaRecorrente(window.appState.user.uid, recorrente.id);
        console.log(`✅ Recorrente "${recorrente.descricao}" removida`);
        removidas++;
      } else {
        console.log(`⚠️ Recorrente "${recorrente.descricao}" não tem ID válido`);
      }
    } catch (error) {
      console.error(`❌ Erro ao remover recorrente "${item.recorrente.descricao}":`, error);
    }
  }
  
  console.log(`\n📊 === RESULTADO ===`);
  console.log(`✅ Recorrentes removidas: ${removidas}`);
  console.log(`❌ Falhas: ${problematicas.length - removidas}`);
  
  if (removidas > 0) {
    console.log('\n🔄 Recarregando dados...');
    // Recarregar dados
    if (window.loadUserData) {
      await window.loadUserData();
    }
    console.log('✅ Dados recarregados!');
  }
};

/**
 * Corrige recorrentes problemáticas (tenta corrigir em vez de remover)
 */
window.corrigirRecorrentesProblematicas = async function() {
  console.log('\n🔧 === CORRIGINDO RECORRENTES PROBLEMÁTICAS ===');
  
  const problematicas = window.identificarRecorrentesProblematicas();
  
  if (problematicas.length === 0) {
    console.log('✅ Nenhuma recorrente problemática encontrada!');
    return;
  }
  
  console.log(`\n🔧 Tentando corrigir ${problematicas.length} recorrentes problemáticas...`);
  
  let corrigidas = 0;
  let removidas = 0;
  
  for (const item of problematicas) {
    try {
      const recorrente = item.recorrente;
      const problemas = item.problemas;
      
      console.log(`\n🔧 Corrigindo: "${recorrente.descricao}"`);
      
      // Tentar corrigir problemas
      let podeCorrigir = true;
      const dadosCorrigidos = { ...recorrente };
      
      // Corrigir descrição
      if (problemas.includes('Descrição inválida')) {
        if (recorrente.descricao === 'undefined' || !recorrente.descricao || recorrente.descricao.trim() === '') {
          dadosCorrigidos.descricao = 'Despesa Recorrente';
          console.log('   📝 Descrição corrigida para: "Despesa Recorrente"');
        }
      }
      
      // Corrigir valor
      if (problemas.includes('Valor inválido')) {
        if (!recorrente.valor || isNaN(parseFloat(recorrente.valor))) {
          console.log('   ❌ Valor não pode ser corrigido automaticamente');
          podeCorrigir = false;
        }
      }
      
      // Corrigir categoria
      if (problemas.includes('Categoria não definida')) {
        // Tentar usar primeira categoria disponível
        const categorias = window.appState.categories;
        if (categorias && categorias.length > 0) {
          dadosCorrigidos.categoriaId = categorias[0].id;
          console.log(`   📂 Categoria corrigida para: "${categorias[0].nome}"`);
        } else {
          console.log('   ❌ Nenhuma categoria disponível para correção');
          podeCorrigir = false;
        }
      }
      
      // Corrigir dia de lançamento
      if (problemas.includes('Dia de lançamento inválido')) {
        dadosCorrigidos.diaLancamento = 1; // Primeiro dia do mês
        console.log('   📅 Dia de lançamento corrigido para: 1');
      }
      
      if (podeCorrigir && recorrente.id) {
        // Atualizar recorrente
        const { updateDespesaRecorrente } = await import('./src/js/recorrentes.js');
        
        // Remover campos que não devem ser atualizados
        const { id, userId, budgetId, createdAt, ...dadosParaAtualizar } = dadosCorrigidos;
        
        await updateDespesaRecorrente(window.appState.user.uid, recorrente.id, dadosParaAtualizar);
        console.log('   ✅ Recorrente corrigida com sucesso!');
        corrigidas++;
      } else {
        console.log('   ❌ Não foi possível corrigir, removendo...');
        
        if (recorrente.id) {
          const { deleteDespesaRecorrente } = await import('./src/js/recorrentes.js');
          await deleteDespesaRecorrente(window.appState.user.uid, recorrente.id);
          console.log('   🗑️ Recorrente removida');
          removidas++;
        }
      }
    } catch (error) {
      console.error(`❌ Erro ao processar recorrente "${item.recorrente.descricao}":`, error);
    }
  }
  
  console.log(`\n📊 === RESULTADO ===`);
  console.log(`✅ Recorrentes corrigidas: ${corrigidas}`);
  console.log(`🗑️ Recorrentes removidas: ${removidas}`);
  console.log(`❌ Falhas: ${problematicas.length - corrigidas - removidas}`);
  
  if (corrigidas > 0 || removidas > 0) {
    console.log('\n🔄 Recarregando dados...');
    // Recarregar dados
    if (window.loadUserData) {
      await window.loadUserData();
    }
    console.log('✅ Dados recarregados!');
  }
};

/**
 * Executa diagnóstico completo
 */
window.diagnosticoRecorrentesUndefined = function() {
  console.log('\n🔍 === DIAGNÓSTICO COMPLETO ===');
  
  const problematicas = window.identificarRecorrentesProblematicas();
  
  if (problematicas.length === 0) {
    console.log('\n🎉 Parabéns! Todas as recorrentes estão válidas!');
    return;
  }
  
  console.log('\n💡 === SOLUÇÕES DISPONÍVEIS ===');
  console.log('1. Para CORRIGIR automaticamente (recomendado):');
  console.log('   corrigirRecorrentesProblematicas()');
  console.log('');
  console.log('2. Para REMOVER todas as problemáticas:');
  console.log('   removerRecorrentesProblematicas()');
  console.log('');
  console.log('3. Para ver detalhes novamente:');
  console.log('   identificarRecorrentesProblematicas()');
};

console.log('\n✅ Script carregado!');
console.log('📋 Comandos disponíveis:');
console.log('  - diagnosticoRecorrentesUndefined() - Diagnóstico completo');
console.log('  - identificarRecorrentesProblematicas() - Identificar problemas');
console.log('  - corrigirRecorrentesProblematicas() - Corrigir automaticamente');
console.log('  - removerRecorrentesProblematicas() - Remover problemáticas');
console.log('\n💡 Para começar, execute: diagnosticoRecorrentesUndefined()');
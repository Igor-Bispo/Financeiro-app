/**
 * Script para Corrigir Recorrentes Após Backup/Restauração
 * 
 * Este script resolve o problema específico onde as recorrentes não conseguem
 * detectar o ID da categoria após um processo de backup, reset e restauração.
 * 
 * PROBLEMA:
 * 1. Backup é feito com IDs originais das categorias
 * 2. Reset remove todas as categorias (e seus IDs)
 * 3. Restauração recria categorias com NOVOS IDs
 * 4. Recorrentes ficam com IDs antigos das categorias (órfãs)
 * 
 * SOLUÇÃO:
 * Mapear categorias por nome e reconectar recorrentes aos novos IDs
 */

console.log('🔧 Script de Correção de Recorrentes Pós-Backup iniciado!');

/**
 * Diagnostica problemas de categorias órfãs nas recorrentes
 */
window.diagnosticarRecorrentesOrfas = async function() {
  console.log('\n🔍 === DIAGNÓSTICO DE RECORRENTES ÓRFÃS ===');
  
  try {
    // Verificar se o usuário está logado
    if (!window.appState?.currentUser) {
      console.log('❌ Usuário não logado');
      return;
    }
    
    if (!window.appState?.currentBudget) {
      console.log('❌ Nenhum orçamento selecionado');
      return;
    }
    
    const userId = window.appState.currentUser.uid;
    const budgetId = window.appState.currentBudget.id;
    
    console.log(`👤 Usuário: ${userId}`);
    console.log(`📁 Orçamento: ${budgetId}`);
    
    // Buscar dados atuais
    const recorrentes = await getDespesasRecorrentes(userId, budgetId);
    const categorias = await getCategories(budgetId);
    
    console.log(`\n📊 Dados encontrados:`);
    console.log(`🔄 Recorrentes: ${recorrentes.length}`);
    console.log(`📂 Categorias: ${categorias.length}`);
    
    // Criar mapa de categorias válidas
    const categoriasValidas = new Set(categorias.map(cat => cat.id));
    
    // Analisar recorrentes
    let recorrentesOrfas = 0;
    let recorrentesValidas = 0;
    const problemasDetalhados = [];
    
    console.log('\n🔍 Analisando recorrentes...');
    
    recorrentes.forEach((rec, index) => {
      console.log(`\n${index + 1}. "${rec.descricao}"`);
      console.log(`   💰 Valor: R$ ${rec.valor}`);
      console.log(`   📂 Categoria ID: ${rec.categoriaId}`);
      
      if (!rec.categoriaId) {
        console.log('   ❌ SEM CATEGORIA DEFINIDA');
        recorrentesOrfas++;
        problemasDetalhados.push({
          recorrente: rec.descricao,
          problema: 'Sem categoria definida',
          categoriaId: null
        });
      } else if (!categoriasValidas.has(rec.categoriaId)) {
        console.log('   ❌ CATEGORIA ÓRFÃ (ID não existe)');
        recorrentesOrfas++;
        problemasDetalhados.push({
          recorrente: rec.descricao,
          problema: 'Categoria órfã',
          categoriaId: rec.categoriaId
        });
      } else {
        const categoria = categorias.find(cat => cat.id === rec.categoriaId);
        console.log(`   ✅ Categoria válida: "${categoria.nome}"`);
        recorrentesValidas++;
      }
    });
    
    // Resumo do diagnóstico
    console.log('\n📋 === RESUMO DO DIAGNÓSTICO ===');
    console.log(`✅ Recorrentes válidas: ${recorrentesValidas}`);
    console.log(`❌ Recorrentes órfãs: ${recorrentesOrfas}`);
    
    if (recorrentesOrfas > 0) {
      console.log('\n⚠️ PROBLEMAS ENCONTRADOS:');
      problemasDetalhados.forEach((problema, index) => {
        console.log(`${index + 1}. ${problema.recorrente}: ${problema.problema}`);
        if (problema.categoriaId) {
          console.log(`   ID órfão: ${problema.categoriaId}`);
        }
      });
      
      console.log('\n💡 SOLUÇÃO:');
      console.log('Execute: corrigirRecorrentesOrfas() para corrigir automaticamente');
    } else {
      console.log('\n🎉 Nenhum problema encontrado! Todas as recorrentes estão conectadas corretamente.');
    }
    
    return {
      total: recorrentes.length,
      validas: recorrentesValidas,
      orfas: recorrentesOrfas,
      problemas: problemasDetalhados
    };
    
  } catch (error) {
    console.error('❌ Erro durante diagnóstico:', error);
    return null;
  }
};

/**
 * Corrige automaticamente recorrentes órfãs mapeando por nome da categoria
 */
window.corrigirRecorrentesOrfas = async function() {
  console.log('\n🔧 === CORREÇÃO DE RECORRENTES ÓRFÃS ===');
  
  try {
    // Verificar se o usuário está logado
    if (!window.appState?.currentUser) {
      console.log('❌ Usuário não logado');
      return;
    }
    
    if (!window.appState?.currentBudget) {
      console.log('❌ Nenhum orçamento selecionado');
      return;
    }
    
    const userId = window.appState.currentUser.uid;
    const budgetId = window.appState.currentBudget.id;
    
    // Buscar dados atuais
    const recorrentes = await getDespesasRecorrentes(userId, budgetId);
    const categorias = await getCategories(budgetId);
    
    console.log(`📊 Dados carregados: ${recorrentes.length} recorrentes, ${categorias.length} categorias`);
    
    // Criar mapa de categorias válidas
    const categoriasValidas = new Set(categorias.map(cat => cat.id));
    const categoriasMap = new Map();
    categorias.forEach(cat => {
      categoriasMap.set(cat.nome.toLowerCase().trim(), cat.id);
    });
    
    // Encontrar categoria padrão (primeira disponível)
    const categoriaExtra = categorias.find(cat => 
      cat.nome.toLowerCase().includes('extra') || 
      cat.nome.toLowerCase().includes('outros') ||
      cat.nome.toLowerCase().includes('geral')
    ) || categorias[0]; // Fallback para primeira categoria
    
    console.log(`🎯 Categoria padrão para órfãs: "${categoriaExtra.nome}" (${categoriaExtra.id})`);
    
    let correcoes = 0;
    let erros = 0;
    
    console.log('\n🔧 Iniciando correções...');
    
    for (const rec of recorrentes) {
      // Verificar se a recorrente precisa de correção
      if (!rec.categoriaId || !categoriasValidas.has(rec.categoriaId)) {
        console.log(`\n🔄 Corrigindo: "${rec.descricao}"`);
        console.log(`   📂 Categoria atual: ${rec.categoriaId || 'NENHUMA'}`);
        
        let novaCategoriaId = null;
        
        // Tentar mapear por nome similar
        const descricaoLower = rec.descricao.toLowerCase();
        
        // Buscar categoria que contenha parte da descrição
        for (const [nomeCategoria, idCategoria] of categoriasMap) {
          if (descricaoLower.includes(nomeCategoria) || nomeCategoria.includes(descricaoLower)) {
            novaCategoriaId = idCategoria;
            const nomeEncontrado = categorias.find(cat => cat.id === idCategoria).nome;
            console.log(`   🎯 Categoria encontrada por similaridade: "${nomeEncontrado}"`);
            break;
          }
        }
        
        // Se não encontrou por similaridade, usar categoria padrão
        if (!novaCategoriaId) {
          novaCategoriaId = categoriaExtra.id;
          console.log(`   🎯 Usando categoria padrão: "${categoriaExtra.nome}"`);
        }
        
        try {
          // Atualizar a recorrente
          await updateDespesaRecorrente(userId, rec.id, {
            categoriaId: novaCategoriaId
          });
          
          console.log(`   ✅ Corrigida: ${rec.categoriaId || 'NENHUMA'} → ${novaCategoriaId}`);
          correcoes++;
          
        } catch (error) {
          console.error(`   ❌ Erro ao corrigir: ${error.message}`);
          erros++;
        }
      }
    }
    
    console.log('\n📋 === RESULTADO DA CORREÇÃO ===');
    console.log(`✅ Recorrentes corrigidas: ${correcoes}`);
    console.log(`❌ Erros: ${erros}`);
    
    if (correcoes > 0) {
      console.log('\n🔄 Recarregando dados...');
      
      // Recarregar dados do app
      if (window.refreshCurrentView) {
        await window.refreshCurrentView();
      }
      
      // Mostrar notificação de sucesso
      if (window.Snackbar) {
        window.Snackbar({
          message: `✅ ${correcoes} recorrentes corrigidas com sucesso!`,
          type: 'success'
        });
      }
      
      console.log('\n🎉 Correção concluída! Execute diagnosticarRecorrentesOrfas() para verificar.');
    } else {
      console.log('\n💡 Nenhuma correção necessária.');
    }
    
    return {
      correcoes,
      erros
    };
    
  } catch (error) {
    console.error('❌ Erro durante correção:', error);
    return null;
  }
};

/**
 * Função principal que executa diagnóstico e correção automaticamente
 */
window.fixRecorrentesBackup = async function() {
  console.log('\n🚀 === FIX AUTOMÁTICO DE RECORRENTES PÓS-BACKUP ===');
  
  try {
    // 1. Executar diagnóstico
    console.log('1️⃣ Executando diagnóstico...');
    const diagnostico = await diagnosticarRecorrentesOrfas();
    
    if (!diagnostico) {
      console.log('❌ Falha no diagnóstico');
      return;
    }
    
    // 2. Se há problemas, executar correção
    if (diagnostico.orfas > 0) {
      console.log('\n2️⃣ Problemas encontrados, executando correção...');
      const resultado = await corrigirRecorrentesOrfas();
      
      if (resultado && resultado.correcoes > 0) {
        console.log('\n3️⃣ Executando diagnóstico final...');
        await diagnosticarRecorrentesOrfas();
      }
    } else {
      console.log('\n✅ Nenhum problema encontrado!');
    }
    
  } catch (error) {
    console.error('❌ Erro durante fix automático:', error);
  }
};

/**
 * Função para mostrar ajuda
 */
window.ajudaRecorrentesBackup = function() {
  console.log('\n📖 === AJUDA - RECORRENTES PÓS-BACKUP ===');
  console.log('\n🔍 DIAGNÓSTICO:');
  console.log('  diagnosticarRecorrentesOrfas() - Analisa problemas nas recorrentes');
  console.log('\n🔧 CORREÇÃO:');
  console.log('  corrigirRecorrentesOrfas() - Corrige recorrentes órfãs automaticamente');
  console.log('\n🚀 AUTOMÁTICO:');
  console.log('  fixRecorrentesBackup() - Executa diagnóstico + correção automaticamente');
  console.log('\n💡 PROBLEMA COMUM:');
  console.log('  Após backup → reset → restauração, as recorrentes ficam com IDs');
  console.log('  de categorias que não existem mais (categorias órfãs).');
  console.log('\n✅ SOLUÇÃO:');
  console.log('  Este script mapeia as categorias por nome e reconecta as recorrentes');
  console.log('  aos novos IDs das categorias.');
  console.log('\n🎯 USO RECOMENDADO:');
  console.log('  Execute fixRecorrentesBackup() após qualquer restauração de backup.');
};

console.log('\n✅ Script carregado com sucesso!');
console.log('\n📋 Comandos disponíveis:');
console.log('  🔍 diagnosticarRecorrentesOrfas() - Diagnosticar problemas');
console.log('  🔧 corrigirRecorrentesOrfas() - Corrigir problemas');
console.log('  🚀 fixRecorrentesBackup() - Fix automático completo');
console.log('  📖 ajudaRecorrentesBackup() - Mostrar ajuda');
console.log('\n💡 Para resolver seu problema, execute: fixRecorrentesBackup()');
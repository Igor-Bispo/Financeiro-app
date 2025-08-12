/**
 * Utilitário para reconectar transações às categorias após restauração de backup
 * 
 * Este módulo resolve o problema onde transações de um backup não são associadas
 * às suas categorias porque os IDs das categorias mudam quando são recriadas.
 */

import { collection, query, where, getDocs, updateDoc, doc } from 'firebase/firestore';
import { db } from '../firebase.js';

/**
 * Reconecta transações às categorias baseado no nome da categoria
 * @param {string} budgetId - ID do orçamento atual
 * @param {boolean} dryRun - Se true, apenas simula sem fazer alterações
 * @returns {Object} Resultado da operação
 */
export async function reconnectTransactionsToCategories(budgetId, dryRun = false) {
  try {
    console.log('🔄 Iniciando reconexão de transações às categorias...');
    console.log('📊 Budget ID:', budgetId);
    console.log('🧪 Modo simulação:', dryRun ? 'SIM' : 'NÃO');
    
    // 1. Buscar todas as categorias do orçamento atual
    const categoriasRef = collection(db, 'categories');
    const qCategorias = query(
      categoriasRef,
      where('budgetId', '==', budgetId)
    );
    
    const categoriasSnapshot = await getDocs(qCategorias);
    const categorias = categoriasSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    console.log(`📂 Encontradas ${categorias.length} categorias`);
    
    // Criar mapa de nome -> ID da categoria
    const categoriasMap = new Map();
    categorias.forEach(cat => {
      const nomeNormalizado = cat.nome.toLowerCase().trim();
      categoriasMap.set(nomeNormalizado, cat.id);
      console.log(`  📋 ${cat.nome} -> ${cat.id}`);
    });
    
    // 2. Buscar todas as transações do orçamento
    const transacoesRef = collection(db, 'transactions');
    const qTransacoes = query(
      transacoesRef,
      where('budgetId', '==', budgetId)
    );
    
    const transacoesSnapshot = await getDocs(qTransacoes);
    const transacoes = transacoesSnapshot.docs.map(doc => ({
      id: doc.id,
      docRef: doc.ref,
      ...doc.data()
    }));
    
    console.log(`💸 Encontradas ${transacoes.length} transações`);
    
    // 3. Analisar transações que precisam de reconexão
    const transacoesSemCategoria = [];
    const transacoesComCategoriaInvalida = [];
    const transacoesComCategoriaValida = [];
    
    for (const transacao of transacoes) {
      if (!transacao.categoriaId) {
        transacoesSemCategoria.push(transacao);
      } else {
        // Verificar se a categoria existe
        const categoriaExiste = categorias.some(cat => cat.id === transacao.categoriaId);
        if (categoriaExiste) {
          transacoesComCategoriaValida.push(transacao);
        } else {
          transacoesComCategoriaInvalida.push(transacao);
        }
      }
    }
    
    console.log(`\n📊 Análise das transações:`);
    console.log(`  ✅ Com categoria válida: ${transacoesComCategoriaValida.length}`);
    console.log(`  ❌ Com categoria inválida: ${transacoesComCategoriaInvalida.length}`);
    console.log(`  ⚪ Sem categoria: ${transacoesSemCategoria.length}`);
    
    // 4. Tentar reconectar transações com categoria inválida
    const reconexoes = [];
    const falhasReconexao = [];
    
    for (const transacao of transacoesComCategoriaInvalida) {
      // Buscar categoria por nome se houver informação de categoria antiga
      let novoCategoriId = null;
      
      // Se a transação tem um nome de categoria salvo (backup pode ter essa info)
      if (transacao.categoriaNome) {
        const nomeNormalizado = transacao.categoriaNome.toLowerCase().trim();
        novoCategoriId = categoriasMap.get(nomeNormalizado);
      }
      
      // Se não encontrou, tentar buscar no appState (se disponível)
      if (!novoCategoriId && window.appState?.categories) {
        const categoriaAntiga = window.appState.categories.find(cat => cat.id === transacao.categoriaId);
        if (categoriaAntiga) {
          const nomeNormalizado = categoriaAntiga.nome.toLowerCase().trim();
          novoCategoriId = categoriasMap.get(nomeNormalizado);
        }
      }
      
      if (novoCategoriId) {
        reconexoes.push({
          transacao,
          novoCategoriId,
          categoriaAntigaId: transacao.categoriaId
        });
      } else {
        falhasReconexao.push(transacao);
      }
    }
    
    console.log(`\n🔄 Reconexões possíveis: ${reconexoes.length}`);
    console.log(`❌ Falhas de reconexão: ${falhasReconexao.length}`);
    
    // 5. Executar reconexões (se não for dry run)
    let reconexoesRealizadas = 0;
    
    if (!dryRun && reconexoes.length > 0) {
      console.log('\n🚀 Executando reconexões...');
      
      for (const { transacao, novoCategoriId, categoriaAntigaId } of reconexoes) {
        try {
          await updateDoc(transacao.docRef, {
            categoriaId: novoCategoriId,
            updatedAt: new Date()
          });
          
          reconexoesRealizadas++;
          console.log(`  ✅ ${transacao.descricao}: ${categoriaAntigaId} -> ${novoCategoriId}`);
        } catch (error) {
          console.error(`  ❌ Erro ao reconectar ${transacao.descricao}:`, error);
        }
      }
    } else if (dryRun && reconexoes.length > 0) {
      console.log('\n🧪 Simulação de reconexões:');
      for (const { transacao, novoCategoriId, categoriaAntigaId } of reconexoes) {
        const categoria = categorias.find(cat => cat.id === novoCategoriId);
        console.log(`  🔄 ${transacao.descricao}: ${categoriaAntigaId} -> ${novoCategoriId} (${categoria?.nome})`);
      }
    }
    
    // 6. Resultado final
    const resultado = {
      totalTransacoes: transacoes.length,
      transacoesComCategoriaValida: transacoesComCategoriaValida.length,
      transacoesComCategoriaInvalida: transacoesComCategoriaInvalida.length,
      transacoesSemCategoria: transacoesSemCategoria.length,
      reconexoesPossiveis: reconexoes.length,
      reconexoesRealizadas,
      falhasReconexao: falhasReconexao.length,
      dryRun
    };
    
    console.log('\n📊 Resultado final:', resultado);
    
    return resultado;
    
  } catch (error) {
    console.error('❌ Erro durante reconexão:', error);
    throw error;
  }
}

/**
 * Reconecta transações baseado em dados do backup
 * @param {Object} backupData - Dados do backup original
 * @param {string} budgetId - ID do orçamento atual
 * @param {boolean} dryRun - Se true, apenas simula sem fazer alterações
 * @returns {Object} Resultado da operação
 */
export async function reconnectTransactionsFromBackup(backupData, budgetId, dryRun = false) {
  try {
    console.log('🔄 Iniciando reconexão baseada em dados do backup...');
    
    if (!backupData.categories || !backupData.transactions) {
      throw new Error('Dados do backup incompletos (faltam categories ou transactions)');
    }
    
    // 1. Criar mapa de categorias do backup (ID antigo -> nome)
    const categoriasBackupMap = new Map();
    backupData.categories.forEach(cat => {
      categoriasBackupMap.set(cat.id, cat.nome);
    });
    
    console.log(`📂 Categorias do backup: ${categoriasBackupMap.size}`);
    
    // 2. Buscar categorias atuais do orçamento
    const categoriasRef = collection(db, 'categories');
    const qCategorias = query(
      categoriasRef,
      where('budgetId', '==', budgetId)
    );
    
    const categoriasSnapshot = await getDocs(qCategorias);
    const categoriasAtuais = categoriasSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    // Criar mapa de nome -> ID atual
    const categoriasAtuaisMap = new Map();
    categoriasAtuais.forEach(cat => {
      const nomeNormalizado = cat.nome.toLowerCase().trim();
      categoriasAtuaisMap.set(nomeNormalizado, cat.id);
    });
    
    console.log(`📂 Categorias atuais: ${categoriasAtuais.length}`);
    
    // 3. Buscar transações atuais
    const transacoesRef = collection(db, 'transactions');
    const qTransacoes = query(
      transacoesRef,
      where('budgetId', '==', budgetId)
    );
    
    const transacoesSnapshot = await getDocs(qTransacoes);
    const transacoesAtuais = transacoesSnapshot.docs.map(doc => ({
      id: doc.id,
      docRef: doc.ref,
      ...doc.data()
    }));
    
    console.log(`💸 Transações atuais: ${transacoesAtuais.length}`);
    
    // 4. Processar reconexões
    const reconexoes = [];
    const falhas = [];
    
    for (const transacao of transacoesAtuais) {
      if (transacao.categoriaId) {
        // Verificar se a categoria existe
        const categoriaExiste = categoriasAtuais.some(cat => cat.id === transacao.categoriaId);
        
        if (!categoriaExiste) {
          // Tentar encontrar o nome da categoria no backup
          const nomeCategoria = categoriasBackupMap.get(transacao.categoriaId);
          
          if (nomeCategoria) {
            const nomeNormalizado = nomeCategoria.toLowerCase().trim();
            const novoCategoriId = categoriasAtuaisMap.get(nomeNormalizado);
            
            if (novoCategoriId) {
              reconexoes.push({
                transacao,
                novoCategoriId,
                categoriaAntigaId: transacao.categoriaId,
                nomeCategoria
              });
            } else {
              falhas.push({ transacao, motivo: `Categoria "${nomeCategoria}" não encontrada nas categorias atuais` });
            }
          } else {
            falhas.push({ transacao, motivo: `Categoria ${transacao.categoriaId} não encontrada no backup` });
          }
        }
      }
    }
    
    console.log(`\n🔄 Reconexões possíveis: ${reconexoes.length}`);
    console.log(`❌ Falhas: ${falhas.length}`);
    
    // 5. Executar reconexões
    let reconexoesRealizadas = 0;
    
    if (!dryRun && reconexoes.length > 0) {
      console.log('\n🚀 Executando reconexões...');
      
      for (const { transacao, novoCategoriId, categoriaAntigaId, nomeCategoria } of reconexoes) {
        try {
          await updateDoc(transacao.docRef, {
            categoriaId: novoCategoriId,
            updatedAt: new Date()
          });
          
          reconexoesRealizadas++;
          console.log(`  ✅ ${transacao.descricao}: "${nomeCategoria}" (${categoriaAntigaId} -> ${novoCategoriId})`);
        } catch (error) {
          console.error(`  ❌ Erro ao reconectar ${transacao.descricao}:`, error);
        }
      }
    } else if (dryRun && reconexoes.length > 0) {
      console.log('\n🧪 Simulação de reconexões:');
      for (const { transacao, novoCategoriId, categoriaAntigaId, nomeCategoria } of reconexoes) {
        console.log(`  🔄 ${transacao.descricao}: "${nomeCategoria}" (${categoriaAntigaId} -> ${novoCategoriId})`);
      }
    }
    
    // 6. Mostrar falhas
    if (falhas.length > 0) {
      console.log('\n❌ Transações que não puderam ser reconectadas:');
      falhas.forEach(({ transacao, motivo }) => {
        console.log(`  ❌ ${transacao.descricao}: ${motivo}`);
      });
    }
    
    const resultado = {
      totalTransacoes: transacoesAtuais.length,
      reconexoesPossiveis: reconexoes.length,
      reconexoesRealizadas,
      falhas: falhas.length,
      dryRun
    };
    
    console.log('\n📊 Resultado final:', resultado);
    
    return resultado;
    
  } catch (error) {
    console.error('❌ Erro durante reconexão baseada em backup:', error);
    throw error;
  }
}

// Disponibilizar funções globalmente para uso no console
if (typeof window !== 'undefined') {
  window.reconnectTransactionsToCategories = reconnectTransactionsToCategories;
  window.reconnectTransactionsFromBackup = reconnectTransactionsFromBackup;
}
/**
 * Script para reconectar transações às categorias
 * 
 * Este script resolve o problema onde transações de um backup não estão
 * associadas às suas categorias porque os IDs das categorias mudaram.
 * 
 * COMO USAR:
 * 1. Abra o console do navegador (F12)
 * 2. Cole este script completo
 * 3. Execute uma das funções:
 *    - reconectarTransacoes() - Reconecta automaticamente
 *    - simularReconexao() - Apenas simula sem fazer alterações
 *    - reconectarComBackup(dadosBackup) - Usa dados do backup original
 */

console.log('🔗 Script de Reconexão de Transações carregado!');
console.log('📋 Comandos disponíveis:');
console.log('  - reconectarTransacoes() - Reconecta transações automaticamente');
console.log('  - simularReconexao() - Simula reconexão sem fazer alterações');
console.log('  - reconectarComBackup(dadosBackup) - Usa dados do backup original');
console.log('  - analisarTransacoes() - Analisa estado atual das transações');

/**
 * Analisa o estado atual das transações e categorias
 */
window.analisarTransacoes = async function() {
  try {
    console.log('🔍 Analisando transações e categorias...');
    
    if (!window.appState?.currentUser) {
      alert('❌ Você precisa estar logado!');
      return;
    }

    const budgetId = window.appState.currentBudget?.id;
    if (!budgetId) {
      alert('❌ Nenhum orçamento selecionado!');
      return;
    }

    console.log('📊 Budget ID:', budgetId);
    console.log('👤 User ID:', window.appState.currentUser.uid);
    
    // Analisar dados do appState
    const transacoes = window.appState.transactions || [];
    const categorias = window.appState.categories || [];
    
    console.log(`\n📊 Dados no appState:`);
    console.log(`  💸 Transações: ${transacoes.length}`);
    console.log(`  📂 Categorias: ${categorias.length}`);
    
    // Analisar transações
    const transacoesSemCategoria = transacoes.filter(t => !t.categoriaId);
    const transacoesComCategoria = transacoes.filter(t => t.categoriaId);
    
    // Verificar categorias válidas
    const categoriasIds = new Set(categorias.map(c => c.id));
    const transacoesComCategoriaValida = transacoesComCategoria.filter(t => categoriasIds.has(t.categoriaId));
    const transacoesComCategoriaInvalida = transacoesComCategoria.filter(t => !categoriasIds.has(t.categoriaId));
    
    console.log(`\n📋 Análise das transações:`);
    console.log(`  ✅ Com categoria válida: ${transacoesComCategoriaValida.length}`);
    console.log(`  ❌ Com categoria inválida: ${transacoesComCategoriaInvalida.length}`);
    console.log(`  ⚪ Sem categoria: ${transacoesSemCategoria.length}`);
    
    if (transacoesComCategoriaInvalida.length > 0) {
      console.log(`\n❌ Transações com categoria inválida:`);
      transacoesComCategoriaInvalida.forEach((t, index) => {
        console.log(`  ${index + 1}. ${t.descricao} (categoria: ${t.categoriaId})`);
      });
    }
    
    if (transacoesSemCategoria.length > 0) {
      console.log(`\n⚪ Transações sem categoria:`);
      transacoesSemCategoria.slice(0, 10).forEach((t, index) => {
        console.log(`  ${index + 1}. ${t.descricao}`);
      });
      if (transacoesSemCategoria.length > 10) {
        console.log(`  ... e mais ${transacoesSemCategoria.length - 10} transações`);
      }
    }
    
    console.log(`\n📂 Categorias disponíveis:`);
    categorias.forEach((cat, index) => {
      const transacoesNaCategoria = transacoes.filter(t => t.categoriaId === cat.id).length;
      console.log(`  ${index + 1}. ${cat.nome} (${cat.tipo}) - ${transacoesNaCategoria} transações`);
    });
    
    const resultado = {
      totalTransacoes: transacoes.length,
      totalCategorias: categorias.length,
      transacoesComCategoriaValida: transacoesComCategoriaValida.length,
      transacoesComCategoriaInvalida: transacoesComCategoriaInvalida.length,
      transacoesSemCategoria: transacoesSemCategoria.length
    };
    
    console.log('\n📊 Resumo:', resultado);
    
    return resultado;
    
  } catch (error) {
    console.error('❌ Erro durante análise:', error);
    alert('❌ Erro durante análise: ' + error.message);
  }
};

/**
 * Simula a reconexão de transações sem fazer alterações
 */
window.simularReconexao = async function() {
  try {
    console.log('🧪 Simulando reconexão de transações...');
    
    if (!window.appState?.currentUser) {
      alert('❌ Você precisa estar logado!');
      return;
    }

    const budgetId = window.appState.currentBudget?.id;
    if (!budgetId) {
      alert('❌ Nenhum orçamento selecionado!');
      return;
    }

    // Importar função de reconexão
    const { reconnectTransactionsToCategories } = await import('./src/js/utils/reconnectTransactionsToCategories.js');
    
    // Executar em modo simulação
    const resultado = await reconnectTransactionsToCategories(budgetId, true);
    
    console.log('\n🧪 Simulação concluída!');
    console.log('📊 Resultado:', resultado);
    
    const mensagem = `🧪 SIMULAÇÃO DE RECONEXÃO\n\n` +
      `📊 Resultados:\n` +
      `• Total de transações: ${resultado.totalTransacoes}\n` +
      `• Com categoria válida: ${resultado.transacoesComCategoriaValida}\n` +
      `• Com categoria inválida: ${resultado.transacoesComCategoriaInvalida}\n` +
      `• Sem categoria: ${resultado.transacoesSemCategoria}\n` +
      `• Reconexões possíveis: ${resultado.reconexoesPossiveis}\n` +
      `• Falhas: ${resultado.falhasReconexao}\n\n` +
      `Para executar a reconexão real, use: reconectarTransacoes()`;
    
    alert(mensagem);
    
    return resultado;
    
  } catch (error) {
    console.error('❌ Erro durante simulação:', error);
    alert('❌ Erro durante simulação: ' + error.message);
  }
};

/**
 * Reconecta transações às categorias automaticamente
 */
window.reconectarTransacoes = async function() {
  try {
    console.log('🔗 Iniciando reconexão de transações...');
    
    if (!window.appState?.currentUser) {
      alert('❌ Você precisa estar logado!');
      return;
    }

    const budgetId = window.appState.currentBudget?.id;
    if (!budgetId) {
      alert('❌ Nenhum orçamento selecionado!');
      return;
    }

    // Confirmar ação
    const confirmacao = confirm(
      '🔗 RECONECTAR TRANSAÇÕES\n\n' +
      'Esta operação irá tentar reconectar transações às suas categorias ' +
      'baseado no nome das categorias.\n\n' +
      'ATENÇÃO: Esta operação irá modificar os dados no banco!\n\n' +
      'Deseja continuar?'
    );

    if (!confirmacao) {
      console.log('❌ Reconexão cancelada pelo usuário.');
      return;
    }

    console.log('🚀 Executando reconexão...');
    
    // Importar função de reconexão
    const { reconnectTransactionsToCategories } = await import('./src/js/utils/reconnectTransactionsToCategories.js');
    
    // Executar reconexão real
    const resultado = await reconnectTransactionsToCategories(budgetId, false);
    
    console.log('\n✅ Reconexão concluída!');
    console.log('📊 Resultado:', resultado);
    
    const mensagem = `✅ RECONEXÃO CONCLUÍDA\n\n` +
      `📊 Resultados:\n` +
      `• Total de transações: ${resultado.totalTransacoes}\n` +
      `• Reconexões realizadas: ${resultado.reconexoesRealizadas}\n` +
      `• Falhas: ${resultado.falhasReconexao}\n\n` +
      `A página será recarregada para atualizar os dados.`;
    
    alert(mensagem);
    
    // Recarregar dados
    if (window.refreshCurrentView) {
      await window.refreshCurrentView();
    } else {
      window.location.reload();
    }
    
    return resultado;
    
  } catch (error) {
    console.error('❌ Erro durante reconexão:', error);
    alert('❌ Erro durante reconexão: ' + error.message);
  }
};

/**
 * Reconecta transações usando dados do backup original
 * @param {Object} dadosBackup - Dados do backup original (opcional)
 */
window.reconectarComBackup = async function(dadosBackup) {
  try {
    console.log('🔗 Iniciando reconexão com dados do backup...');
    
    if (!window.appState?.currentUser) {
      alert('❌ Você precisa estar logado!');
      return;
    }

    const budgetId = window.appState.currentBudget?.id;
    if (!budgetId) {
      alert('❌ Nenhum orçamento selecionado!');
      return;
    }

    // Se não forneceu dados do backup, pedir para o usuário
    if (!dadosBackup) {
      alert(
        '📁 DADOS DO BACKUP NECESSÁRIOS\n\n' +
        'Para usar esta função, você precisa fornecer os dados do backup original.\n\n' +
        'Exemplo de uso:\n' +
        'reconectarComBackup(meusDadosDeBackup)\n\n' +
        'Onde meusDadosDeBackup é o objeto JSON do backup original.'
      );
      return;
    }

    // Validar dados do backup
    if (!dadosBackup.categories || !dadosBackup.transactions) {
      alert('❌ Dados do backup inválidos! Certifique-se de que contém categories e transactions.');
      return;
    }

    // Confirmar ação
    const confirmacao = confirm(
      '🔗 RECONECTAR COM BACKUP\n\n' +
      `Dados do backup encontrados:\n` +
      `• ${dadosBackup.categories.length} categorias\n` +
      `• ${dadosBackup.transactions.length} transações\n\n` +
      'Esta operação irá reconectar transações às categorias baseado nos dados do backup.\n\n' +
      'ATENÇÃO: Esta operação irá modificar os dados no banco!\n\n' +
      'Deseja continuar?'
    );

    if (!confirmacao) {
      console.log('❌ Reconexão cancelada pelo usuário.');
      return;
    }

    console.log('🚀 Executando reconexão com backup...');
    
    // Importar função de reconexão
    const { reconnectTransactionsFromBackup } = await import('./src/js/utils/reconnectTransactionsToCategories.js');
    
    // Executar reconexão baseada no backup
    const resultado = await reconnectTransactionsFromBackup(dadosBackup, budgetId, false);
    
    console.log('\n✅ Reconexão com backup concluída!');
    console.log('📊 Resultado:', resultado);
    
    const mensagem = `✅ RECONEXÃO COM BACKUP CONCLUÍDA\n\n` +
      `📊 Resultados:\n` +
      `• Total de transações: ${resultado.totalTransacoes}\n` +
      `• Reconexões realizadas: ${resultado.reconexoesRealizadas}\n` +
      `• Falhas: ${resultado.falhas}\n\n` +
      `A página será recarregada para atualizar os dados.`;
    
    alert(mensagem);
    
    // Recarregar dados
    if (window.refreshCurrentView) {
      await window.refreshCurrentView();
    } else {
      window.location.reload();
    }
    
    return resultado;
    
  } catch (error) {
    console.error('❌ Erro durante reconexão com backup:', error);
    alert('❌ Erro durante reconexão com backup: ' + error.message);
  }
};

console.log('\n✅ Script carregado com sucesso!');
console.log('💡 Para começar, execute: analisarTransacoes()');
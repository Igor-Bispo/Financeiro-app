/**
 * SOLUÇÃO RÁPIDA PARA RECORRENTE "undefined"
 * 
 * Cole este código no console do navegador (F12) para resolver o problema
 * da recorrente com descrição "undefined" que apareceu após o backup.
 */

(async function() {
  console.log('🔧 === CORREÇÃO RÁPIDA DE RECORRENTE "undefined" ===\n');
  
  // Verificar se temos acesso aos dados
  if (!window.appState?.recorrentes) {
    console.log('❌ Não foi possível acessar as recorrentes. Certifique-se de estar na página do app.');
    return;
  }
  
  const recorrentes = window.appState.recorrentes;
  console.log(`📋 Verificando ${recorrentes.length} recorrentes...`);
  
  // Encontrar recorrentes com descrição "undefined"
  const recorrentesUndefined = recorrentes.filter(rec => 
    !rec.descricao || 
    rec.descricao === 'undefined' || 
    rec.descricao.trim() === ''
  );
  
  if (recorrentesUndefined.length === 0) {
    console.log('✅ Nenhuma recorrente "undefined" encontrada!');
    return;
  }
  
  console.log(`\n🚨 Encontradas ${recorrentesUndefined.length} recorrentes com problema:`);
  
  recorrentesUndefined.forEach((rec, index) => {
    console.log(`   ${index + 1}. Descrição: "${rec.descricao}" | Valor: ${rec.valor} | ID: ${rec.id}`);
  });
  
  // Confirmar remoção
  const confirmacao = confirm(
    `Encontradas ${recorrentesUndefined.length} recorrentes com descrição "undefined".\n\n` +
    'Deseja removê-las? Esta ação é irreversível.\n\n' +
    'Clique OK para remover ou Cancelar para manter.'
  );
  
  if (!confirmacao) {
    console.log('❌ Operação cancelada pelo usuário.');
    return;
  }
  
  // Remover recorrentes problemáticas
  console.log('\n🗑️ Removendo recorrentes problemáticas...');
  
  let removidas = 0;
  let erros = 0;
  
  for (const recorrente of recorrentesUndefined) {
    try {
      if (!recorrente.id) {
        console.log(`⚠️ Recorrente sem ID válido, pulando...`);
        continue;
      }
      
      // Importar função de remoção dinamicamente
      const { deleteDespesaRecorrente } = await import('./src/js/recorrentes.js');
      
      // Remover do Firestore
      await deleteDespesaRecorrente(window.appState.user.uid, recorrente.id);
      
      console.log(`✅ Recorrente "${recorrente.descricao}" removida (ID: ${recorrente.id})`);
      removidas++;
      
    } catch (error) {
      console.error(`❌ Erro ao remover recorrente "${recorrente.descricao}":`, error);
      erros++;
    }
  }
  
  console.log(`\n📊 === RESULTADO ===`);
  console.log(`✅ Recorrentes removidas: ${removidas}`);
  console.log(`❌ Erros: ${erros}`);
  
  if (removidas > 0) {
    console.log('\n🔄 Recarregando dados do aplicativo...');
    
    try {
      // Tentar recarregar os dados
      if (window.loadUserData) {
        await window.loadUserData();
        console.log('✅ Dados recarregados com sucesso!');
      } else {
        console.log('⚠️ Função de recarregamento não encontrada. Recarregue a página manualmente.');
      }
    } catch (error) {
      console.error('❌ Erro ao recarregar dados:', error);
      console.log('💡 Recarregue a página manualmente (F5) para ver as alterações.');
    }
  }
  
  console.log('\n🎉 Correção concluída!');
  
})().catch(error => {
  console.error('❌ Erro durante a execução:', error);
  console.log('💡 Tente recarregar a página e executar novamente.');
});
// Script para forçar recarregamento da página de configurações
console.log('🔄 Forçando recarregamento da página de configurações...');

// Função para recarregar configurações
async function forceReloadSettings() {
  console.log('🔄 Iniciando recarregamento...');
  
  try {
    // Verificar se a função está disponível
    if (typeof window.renderSettings === 'function') {
      console.log('✅ Função renderSettings encontrada');
      
      // Recarregar configurações
      await window.renderSettings();
      console.log('✅ Configurações recarregadas com sucesso');
      
      // Aguardar um pouco e verificar se os botões apareceram
      setTimeout(() => {
        console.log('🔍 Verificando botões após recarregamento...');
        
        const deleteButtons = document.querySelectorAll('button[onclick*="confirmDeleteBudget"]');
        console.log(`📊 Botões de excluir encontrados: ${deleteButtons.length}`);
        
        if (deleteButtons.length > 0) {
          console.log('✅ Botões de excluir apareceram!');
          deleteButtons.forEach((button, index) => {
            console.log(`  Botão ${index + 1}: ${button.textContent.trim()}`);
          });
        } else {
          console.log('❌ Botões de excluir ainda não apareceram');
          
          // Verificar seção "Meus Orçamentos"
          const budgetsSection = Array.from(document.querySelectorAll('h3')).find(h3 => 
            h3.textContent.includes('Meus Orçamentos')
          );
          
          if (budgetsSection) {
            console.log('✅ Seção "Meus Orçamentos" encontrada');
            
            // Verificar todos os botões na seção
            const allButtons = budgetsSection.closest('.bg-white').querySelectorAll('button');
            console.log(`📊 Total de botões na seção: ${allButtons.length}`);
            
            allButtons.forEach((button, index) => {
              const onclick = button.getAttribute('onclick');
              const text = button.textContent.trim();
              console.log(`  Botão ${index + 1}: "${text}" - onclick: ${onclick}`);
            });
          } else {
            console.log('❌ Seção "Meus Orçamentos" não encontrada');
          }
        }
      }, 1000);
      
    } else {
      console.error('❌ Função renderSettings não encontrada');
    }
  } catch (error) {
    console.error('❌ Erro ao recarregar configurações:', error);
  }
}

// Função para navegar para configurações
function navigateToSettings() {
  console.log('🧭 Navegando para configurações...');
  
  // Simular clique na aba de configurações
  const settingsTab = document.querySelector('[data-tab="config"]') || 
                     document.querySelector('button[onclick*="config"]') ||
                     document.querySelector('.nav-btn[onclick*="config"]');
  
  if (settingsTab) {
    console.log('✅ Aba de configurações encontrada, clicando...');
    settingsTab.click();
    
    // Aguardar e forçar recarregamento
    setTimeout(() => {
      forceReloadSettings();
    }, 500);
  } else {
    console.log('❌ Aba de configurações não encontrada, tentando navegação direta...');
    
    // Tentar navegação direta
    if (window.switchTab) {
      window.switchTab('config');
      setTimeout(() => {
        forceReloadSettings();
      }, 500);
    } else {
      console.error('❌ Função switchTab não encontrada');
    }
  }
}

// Função para verificar estado atual
function checkCurrentState() {
  console.log('🔍 Verificando estado atual...');
  
  // Verificar se estamos na página de configurações
  const settingsContent = document.querySelector('.tab-title-highlight');
  if (settingsContent && settingsContent.textContent.includes('Configurações')) {
    console.log('✅ Já estamos na página de configurações');
    forceReloadSettings();
  } else {
    console.log('❌ Não estamos na página de configurações');
    navigateToSettings();
  }
}

// Função para debug completo
function debugSettingsPage() {
  console.log('🔍 Debug completo da página de configurações...');
  
  // Verificar estado do app
  console.log('📊 Estado do app:');
  console.log(`  - Usuário: ${window.appState?.currentUser?.uid || 'Não autenticado'}`);
  console.log(`  - Orçamentos: ${window.appState?.budgets?.length || 0}`);
  console.log(`  - Orçamento atual: ${window.appState?.currentBudget?.nome || 'Nenhum'}`);
  
  // Verificar funções disponíveis
  console.log('📊 Funções disponíveis:');
  console.log(`  - renderSettings: ${typeof window.renderSettings === 'function'}`);
  console.log(`  - deleteBudget: ${typeof window.deleteBudget === 'function'}`);
  console.log(`  - confirmDeleteBudget: ${typeof window.confirmDeleteBudget === 'function'}`);
  
  // Verificar elementos na página
  console.log('📊 Elementos na página:');
  const settingsTitle = document.querySelector('.tab-title-highlight');
  console.log(`  - Título da página: ${settingsTitle?.textContent || 'Não encontrado'}`);
  
  const budgetsSection = Array.from(document.querySelectorAll('h3')).find(h3 => 
    h3.textContent.includes('Meus Orçamentos')
  );
  console.log(`  - Seção "Meus Orçamentos": ${budgetsSection ? 'Encontrada' : 'Não encontrada'}`);
  
  const deleteButtons = document.querySelectorAll('button[onclick*="confirmDeleteBudget"]');
  console.log(`  - Botões de excluir: ${deleteButtons.length}`);
  
  // Verificar condições de exibição
  if (window.appState?.currentUser && window.appState?.budgets) {
    const ownBudgets = window.appState.budgets.filter(b => b.userId === window.appState.currentUser.uid);
    console.log(`  - Orçamentos próprios: ${ownBudgets.length}`);
    
    ownBudgets.forEach((budget, index) => {
      console.log(`    ${index + 1}. ${budget.nome || 'Sem nome'} (${budget.id})`);
    });
  }
}

// Expor funções para uso no console
window.forceReloadSettings = forceReloadSettings;
window.navigateToSettings = navigateToSettings;
window.checkCurrentState = checkCurrentState;
window.debugSettingsPage = debugSettingsPage;

// Executar verificação automática
setTimeout(() => {
  console.log('🔍 Executando verificação automática...');
  checkCurrentState();
}, 1000);

console.log('🔄 Script de recarregamento carregado. Use checkCurrentState() para verificar e recarregar.');

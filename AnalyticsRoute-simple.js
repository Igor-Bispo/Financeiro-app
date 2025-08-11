/**
 * AnalyticsRoute-simple.js - Versão simplificada para evitar problemas de timing
 */

import { AnalyticsPage } from './src/js/ui/AnalyticsPage.js';

/**
 * Renderiza a página de análises financeiras - Versão Simplificada
 * @returns {Promise<void>}
 */
export async function renderAnalyticsSimple() {
  console.log('📊 Renderizando página de análises (versão simplificada)...');
  
  const appContent = document.getElementById('app-content');
  if (!appContent) {
    console.error('❌ Elemento app-content não encontrado');
    return;
  }
  
  try {
    // Verificar se há usuário autenticado
    if (!window.appState?.currentUser) {
      throw new Error('Usuário não autenticado');
    }
    
    // Verificar se há orçamento selecionado
    if (!window.appState.currentBudget) {
      console.log('⚠️ Nenhum orçamento selecionado, tentando selecionar automaticamente...');
      
      // Tentar carregar orçamentos se não estiverem carregados
      if (!window.appState.budgets || window.appState.budgets.length === 0) {
        console.log('📊 Carregando orçamentos...');
        await window.loadBudgets();
      }
      
      // Selecionar orçamento padrão
      if (window.appState.budgets && window.appState.budgets.length > 0) {
        console.log('🔧 Selecionando orçamento padrão...');
        await window.setCurrentBudget(window.appState.budgets[0]);
      } else {
        throw new Error('Nenhum orçamento encontrado. Crie um orçamento primeiro.');
      }
    }
    
    console.log('✅ Orçamento selecionado:', window.appState.currentBudget.nome);
    
    // Criar estrutura HTML diretamente sem aguardar
    const analyticsHTML = `
      <div class="tab-container">
        <div class="tab-header">
          <h2 class="tab-title-highlight">Análises Financeiras</h2>
        </div>
        <div class="tab-content">
          <div class="content-spacing" id="analytics-content">
            <div class="flex justify-center items-center py-12">
              <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          </div>
        </div>
      </div>
    `;
    
    // Atualizar o conteúdo
    appContent.innerHTML = analyticsHTML;
    
    console.log('✅ Estrutura HTML criada');
    
    // Verificar imediatamente se o container existe
    const analyticsContent = document.getElementById('analytics-content');
    if (!analyticsContent) {
      throw new Error('Container analytics-content não foi criado');
    }
    
    console.log('✅ Container analytics-content verificado');
    
    // Renderizar a página de análises diretamente no container
    try {
      const analyticsPage = await AnalyticsPage.render(window.appState.currentBudget.id);
      
      // Limpar loading e adicionar conteúdo
      analyticsContent.innerHTML = '';
      analyticsContent.appendChild(analyticsPage);
      
      console.log('✅ Página de análises renderizada com sucesso');
      
    } catch (pageError) {
      console.error('❌ Erro ao renderizar página de análises:', pageError);
      analyticsContent.innerHTML = `
        <div class="bg-red-100 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded relative mb-6">
          <strong class="font-bold">Erro!</strong>
          <span class="block sm:inline"> Não foi possível carregar os gráficos.</span>
          <p class="text-sm mt-2">${pageError.message}</p>
        </div>
        <button onclick="window.location.hash = '#analytics'" class="btn-secondary">
          <i class="fas fa-redo mr-2"></i> Tentar Novamente
        </button>
      `;
    }
    
  } catch (error) {
    console.error('❌ Erro ao renderizar análises:', error);
    
    // Exibir mensagem de erro
    appContent.innerHTML = `
      <div class="tab-container">
        <div class="tab-header">
          <h2 class="tab-title-highlight">Análises Financeiras</h2>
        </div>
        <div class="tab-content">
          <div class="content-spacing">
            <div class="bg-red-100 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded relative mb-6">
              <strong class="font-bold">Erro!</strong>
              <span class="block sm:inline"> Não foi possível carregar as análises.</span>
              <p class="text-sm mt-2">${error.message}</p>
            </div>
            <button onclick="window.location.hash = '#/dashboard'" class="btn-primary">
              <i class="fas fa-arrow-left mr-2"></i> Voltar ao Dashboard
            </button>
            <button onclick="window.location.hash = '#analytics'" class="btn-secondary ml-2">
              <i class="fas fa-redo mr-2"></i> Tentar Novamente
            </button>
          </div>
        </div>
      </div>
    `;
  }
}

// Adicionar à janela global para teste
window.renderAnalyticsSimple = renderAnalyticsSimple;
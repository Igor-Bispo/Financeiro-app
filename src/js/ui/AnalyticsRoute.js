/**
 * AnalyticsRoute.js - Módulo para renderização da rota de análises financeiras
 * Versão Definitiva - À Prova de Falhas
 * 
 * Este módulo integra a página de análises financeiras ao aplicativo principal.
 */

import { AnalyticsPage } from './AnalyticsPage.js';

// Sistema de proteção contra condições de corrida
let isRenderingAnalytics = false;
let renderingPromise = null;

/**
 * Renderiza a página de análises financeiras - Versão Anti-Corrida
 * @returns {Promise<void>}
 */
export async function renderAnalytics() {
  const timestamp = new Date().toISOString();
  console.log(`🎯 [${timestamp}] Iniciando renderização de análises - Versão Anti-Corrida`);
  
  // Proteção contra múltiplas chamadas simultâneas
  if (isRenderingAnalytics) {
    console.log(`⏳ [${timestamp}] Renderização já em andamento, aguardando...`);
    if (renderingPromise) {
      return await renderingPromise;
    }
  }
  
  isRenderingAnalytics = true;
  
  renderingPromise = (async () => {
    try {
      // 1. Forçar limpeza do DOM
      console.log(`🧹 [${timestamp}] Limpando DOM...`);
      const appContent = document.getElementById('app-content');
      if (!appContent) {
        throw new Error('Container app-content não encontrado');
      }
      
      // Limpar completamente o conteúdo
      appContent.innerHTML = '';
      
      // Aguardar limpeza
      await new Promise(resolve => setTimeout(resolve, 50));
      
      console.log(`✅ [${timestamp}] app-content limpo e encontrado`);
      
      // 2. Verificar autenticação
      if (!window.appState?.currentUser) {
        console.log(`⚠️ [${timestamp}] Usuário não autenticado`);
        renderErrorPage('Usuário não autenticado', 'Faça login para acessar as análises');
        return;
      }
      
      // 3. Carregar orçamentos se necessário
      if (!window.appState?.currentBudget) {
        console.log(`🔄 [${timestamp}] Carregando orçamentos...`);
        if (window.loadBudgets) {
          await window.loadBudgets();
        }
      }
      
      // 4. Criar HTML da página de forma síncrona
      console.log(`🏗️ [${timestamp}] Criando HTML da página...`);
      const pageHTML = createAnalyticsPageHTML();
      
      // 5. Inserir HTML de forma atômica
      console.log(`📝 [${timestamp}] Inserindo HTML...`);
      appContent.innerHTML = pageHTML;
      
      // 6. Verificação imediata
      let analyticsContent = document.getElementById('analytics-content');
      if (!analyticsContent) {
        console.log(`⚠️ [${timestamp}] analytics-content não encontrado imediatamente, aguardando...`);
        
        // Aguardar processamento do DOM
        await new Promise(resolve => setTimeout(resolve, 100));
        
        analyticsContent = document.getElementById('analytics-content');
        if (!analyticsContent) {
          console.log(`❌ [${timestamp}] analytics-content ainda não encontrado, forçando criação...`);
          
          // Forçar criação direta
          const analyticsDiv = document.createElement('div');
          analyticsDiv.id = 'analytics-content';
          analyticsDiv.className = 'analytics-content';
          appContent.appendChild(analyticsDiv);
          analyticsContent = analyticsDiv;
          
          console.log(`🔧 [${timestamp}] analytics-content criado forçadamente`);
        }
      }
      
      console.log(`✅ [${timestamp}] analytics-content encontrado:`, analyticsContent);
      
      // 7. Renderizar conteúdo
      await renderAnalyticsContent(analyticsContent);
      
      console.log(`🎉 [${timestamp}] Análises renderizadas com sucesso!`);
      
    } catch (error) {
      const timestamp = new Date().toISOString();
      console.error(`💥 [${timestamp}] Erro ao renderizar análises:`, error);
      renderErrorPage('Erro ao carregar análises', error.message);
    } finally {
      isRenderingAnalytics = false;
      renderingPromise = null;
    }
  })();
  
  return await renderingPromise;
}

/**
 * Cria o HTML da página de análises
 * @returns {string} HTML da página
 */
function createAnalyticsPageHTML() {
  return `
    <div class="tab-container">
      <div class="tab-header">
        <h2 class="tab-title-highlight">Análises Financeiras</h2>
      </div>
      <div class="tab-content">
        <div class="content-spacing" id="analytics-content">
          <div class="flex justify-center items-center py-12">
            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            <span class="ml-3 text-gray-600 dark:text-gray-400">Carregando análises...</span>
          </div>
        </div>
      </div>
    </div>
  `;
}

/**
 * Aguarda o processamento do DOM
 * @returns {Promise<void>}
 */
async function waitForDOM() {
  // Aguardar múltiplos ticks do DOM
  await new Promise(resolve => setTimeout(resolve, 0));
  await new Promise(resolve => requestAnimationFrame(resolve));
  await new Promise(resolve => setTimeout(resolve, 50));
}

/**
 * Encontra o container analytics-content com retry
 * @returns {HTMLElement|null}
 */
function findAnalyticsContent() {
  // Tentar múltiplas vezes
  for (let i = 0; i < 5; i++) {
    const element = document.getElementById('analytics-content');
    if (element) {
      return element;
    }
    
    // Aguardar um pouco antes da próxima tentativa
    const delay = Math.pow(2, i) * 10; // 10ms, 20ms, 40ms, 80ms, 160ms
    const start = Date.now();
    while (Date.now() - start < delay) {
      // Busy wait
    }
  }
  
  return null;
}

/**
 * Renderiza o conteúdo da página de análises
 * @param {HTMLElement} container Container onde renderizar
 * @param {string} timestamp Timestamp para logs
 */
async function renderAnalyticsContent(container, timestamp) {
  try {
    console.log(`🎨 [${timestamp}] Renderizando conteúdo da página...`);
    
    const analyticsPage = await AnalyticsPage.render(window.appState.currentBudget.id);
    
    // Limpar loading e adicionar conteúdo
    container.innerHTML = '';
    container.appendChild(analyticsPage);
    
    console.log(`✅ [${timestamp}] Conteúdo renderizado com sucesso`);
    
  } catch (pageError) {
    console.error(`❌ [${timestamp}] Erro ao renderizar conteúdo:`, pageError);
    
    container.innerHTML = `
      <div class="bg-red-100 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded relative mb-6">
        <strong class="font-bold">Erro ao carregar gráficos!</strong>
        <span class="block sm:inline mt-2">Não foi possível carregar os gráficos de análise.</span>
        <p class="text-sm mt-2 opacity-75">${pageError.message}</p>
      </div>
      <div class="flex gap-2">
        <button onclick="window.location.hash = '#analytics'" class="btn-secondary">
          <i class="fas fa-redo mr-2"></i> Tentar Novamente
        </button>
        <button onclick="window.location.hash = '#/dashboard'" class="btn-primary">
          <i class="fas fa-arrow-left mr-2"></i> Voltar ao Dashboard
        </button>
      </div>
    `;
  }
}

/**
 * Renderiza página de erro
 * @param {Error} error Erro ocorrido
 * @param {string} timestamp Timestamp para logs
 */
async function renderErrorPage(error, timestamp) {
  console.log(`🚨 [${timestamp}] Renderizando página de erro...`);
  
  const appContent = document.getElementById('app-content');
  if (!appContent) {
    console.error(`💥 [${timestamp}] Não foi possível renderizar página de erro: app-content não encontrado`);
    return;
  }
  
  appContent.innerHTML = `
    <div class="tab-container">
      <div class="tab-header">
        <h2 class="tab-title-highlight">Análises Financeiras</h2>
      </div>
      <div class="tab-content">
        <div class="content-spacing">
          <div class="bg-red-100 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded relative mb-6">
            <strong class="font-bold">Erro!</strong>
            <span class="block sm:inline mt-2">Não foi possível carregar as análises financeiras.</span>
            <p class="text-sm mt-2 opacity-75">${error.message}</p>
            <p class="text-xs mt-1 opacity-50">Timestamp: ${timestamp}</p>
          </div>
          <div class="flex gap-2">
            <button id="retry-analytics-btn" class="btn-secondary">
              <i class="fas fa-redo mr-2"></i> Tentar Novamente
            </button>
            <button id="back-dashboard-btn" class="btn-primary">
              <i class="fas fa-arrow-left mr-2"></i> Voltar ao Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  `;
  
  // Adicionar eventos aos botões
  const retryBtn = document.getElementById('retry-analytics-btn');
  if (retryBtn) {
    retryBtn.addEventListener('click', () => {
      console.log(`🔄 [${timestamp}] Tentando novamente...`);
      renderAnalytics();
    });
  }
  
  const backBtn = document.getElementById('back-dashboard-btn');
  if (backBtn) {
    backBtn.addEventListener('click', () => {
      console.log(`🏠 [${timestamp}] Voltando ao dashboard...`);
      window.location.hash = '#/dashboard';
    });
  }
  
  console.log(`✅ [${timestamp}] Página de erro renderizada`);
}

// Registrar função globalmente
window.renderAnalytics = renderAnalytics;

// Log de carregamento do módulo
console.log('📦 AnalyticsRoute.js carregado (versão definitiva)');
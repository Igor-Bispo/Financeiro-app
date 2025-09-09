/**
 * AnalyticsRoute.js - MÃ³dulo para renderizaÃ§Ã£o da rota de anÃ¡lises financeiras
 * VersÃ£o Definitiva - Ã€ Prova de Falhas
 *
 * Este mÃ³dulo integra a pÃ¡gina de anÃ¡lises financeiras ao aplicativo principal.
 */

import { AnalyticsPage } from './AnalyticsPage.js';
import { eventBus } from '@core/events/eventBus.js';

// Sync helpers for reacting to ym changes on the same route
let lastYmRendered = null;
let hashListenerBound = false;
let periodListenerBound = false;
// Re-render queue: if period changes during a render, re-render after finish
let rerenderRequested = false;
let desiredYm = null;

// Sistema de proteÃ§Ã£o contra condiÃ§Ãµes de corrida
let isRenderingAnalytics = false;
let renderingPromise = null;

/**
 * Renderiza a pÃ¡gina de anÃ¡lises financeiras - VersÃ£o Anti-Corrida
 * @returns {Promise<void>}
 */
export async function renderAnalytics() {
  const timestamp = new Date().toISOString();
  console.log(`ðŸŽ¯ [${timestamp}] Iniciando renderizaÃ§Ã£o de anÃ¡lises - VersÃ£o Anti-Corrida`);
  // Renderizar somente se a rota ativa for Analytics (evita interferir em outras abas)
  try {
    const hh = (window.location.hash || '').split('?')[0];
    if (hh !== '#/analytics') {
      console.log(`â›” [${timestamp}] Abortando renderAnalytics: rota ativa nÃ£o Ã© /analytics (${hh})`);
      return;
    }
  } catch {}

  // Bind hashchange listener (uma vez) para re-render quando ?ym mudar mantendo a rota
  try {
    if (!hashListenerBound) {
      hashListenerBound = true;
      window.addEventListener('hashchange', () => {
        try {
          const raw = window.location.hash || '';
          const [path, query] = raw.split('?');
          if (path === '#/analytics') {
            const ym = new URLSearchParams(query || '').get('ym') || '';
            if (ym && ym !== lastYmRendered) {
              // Re-render para refletir mÃªs selecionado
              renderAnalytics();
            }
          }
        } catch {}
      });
    }
  } catch {}

  // Reagir a mudanÃ§as de perÃ­odo globais quando estamos na aba de anÃ¡lises
  try {
    if (!periodListenerBound) {
      periodListenerBound = true;
      eventBus.on('period:changed', (p) => {
        try {
          const hh = (window.location.hash || '').split('?')[0];
          if (hh === '#/analytics') {
            // Sincronizar hash ?ym=YYYY-MM para compatibilidade e deep-link
            const y = p?.year || new Date().getFullYear();
            const m = p?.month || (new Date().getMonth() + 1);
            const ym = `${y}-${String(m).padStart(2, '0')}`;
            const url = new URL(window.location.href);
            url.hash = `${hh}?ym=${ym}`;
            history.replaceState(null, '', url.toString());
            // Registrar intenÃ§Ã£o de re-render com o novo perÃ­odo
            desiredYm = ym;
            if (isRenderingAnalytics) {
              rerenderRequested = true;
            } else {
              // Re-renderizar imediatamente para atualizar cards e grÃ¡ficos
              renderAnalytics();
            }
          }
        } catch {}
      });
    }
  } catch {}

  // ProteÃ§Ã£o contra mÃºltiplas chamadas simultÃ¢neas
  if (isRenderingAnalytics) {
    console.log(`â³ [${timestamp}] RenderizaÃ§Ã£o jÃ¡ em andamento, aguardando...`);
    if (renderingPromise) {
      return await renderingPromise;
    }
  }

  isRenderingAnalytics = true;

  renderingPromise = (async () => {
    try {
      // 1. ForÃ§ar limpeza do DOM
      console.log(`ðŸ§¹ [${timestamp}] Limpando DOM...`);
      const appContent = document.getElementById('app-content');
      if (!appContent) {
        throw new Error('Container app-content nÃ£o encontrado');
      }

      // Limpar completamente o conteÃºdo
      appContent.innerHTML = '';

      // Aguardar limpeza
      await new Promise(resolve => setTimeout(resolve, 50));

      console.log(`âœ… [${timestamp}] app-content limpo e encontrado`);

      // 2. Verificar autenticaÃ§Ã£o
      if (!window.appState?.currentUser) {
        console.log(`âš ï¸ [${timestamp}] UsuÃ¡rio nÃ£o autenticado`);
        renderErrorPage('UsuÃ¡rio nÃ£o autenticado', 'FaÃ§a login para acessar as anÃ¡lises');
        return;
      }

      // 3. Carregar orÃ§amentos se necessÃ¡rio
      if (!window.appState?.currentBudget) {
        console.log(`ðŸ”„ [${timestamp}] Carregando orÃ§amentos...`);
        if (window.loadBudgets) {
          await window.loadBudgets();
        }
      }

      // 4. Criar HTML da pÃ¡gina de forma sÃ­ncrona (casca padrÃ£o de abas)
      console.log(`ðŸ—ï¸ [${timestamp}] Criando HTML da pÃ¡gina...`);
      const pageHTML = createAnalyticsPageHTML();

      // 5. Inserir HTML de forma atÃ´mica
      console.log(`ðŸ“ [${timestamp}] Inserindo HTML...`);
      appContent.innerHTML = pageHTML;

      // 6. VerificaÃ§Ã£o imediata
      let analyticsContent = document.getElementById('analytics-content');
      if (!analyticsContent) {
        console.log(`âš ï¸ [${timestamp}] analytics-content nÃ£o encontrado imediatamente, aguardando...`);

        // Aguardar processamento do DOM
        await new Promise(resolve => setTimeout(resolve, 100));

        analyticsContent = document.getElementById('analytics-content');
        if (!analyticsContent) {
          console.log(`âŒ [${timestamp}] analytics-content ainda nÃ£o encontrado, forÃ§ando criaÃ§Ã£o...`);

          // ForÃ§ar criaÃ§Ã£o direta
          const analyticsDiv = document.createElement('div');
          analyticsDiv.id = 'analytics-content';
          analyticsDiv.className = 'analytics-content';
          appContent.appendChild(analyticsDiv);
          analyticsContent = analyticsDiv;

          console.log(`ðŸ”§ [${timestamp}] analytics-content criado forÃ§adamente`);
        }
      }

      console.log(`âœ… [${timestamp}] analytics-content encontrado:`, analyticsContent);
      // Indicador de perÃ­odo serÃ¡ montado dentro do AnalyticsPage. Evitar duplicidade de header aqui.

      // 8. Registrar ym atual e renderizar conteÃºdo
      try {
        const p = (typeof window.getSelectedPeriod === 'function') ? window.getSelectedPeriod() : { year: new Date().getFullYear(), month: new Date().getMonth() + 1 };
        lastYmRendered = `${p.year}-${String(p.month).padStart(2, '0')}`;
      } catch { lastYmRendered = null; }

      // Renderizar conteÃºdo
      await renderAnalyticsContent(analyticsContent);

      console.log(`ðŸŽ‰ [${timestamp}] AnÃ¡lises renderizadas com sucesso!`);

    } catch (error) {
      const timestamp = new Date().toISOString();
      console.error(`ðŸ’¥ [${timestamp}] Erro ao renderizar anÃ¡lises:`, error);
      renderErrorPage('Erro ao carregar anÃ¡lises', error.message);
    } finally {
      isRenderingAnalytics = false;
      renderingPromise = null;
      // Se houve solicitaÃ§Ã£o de re-render durante a renderizaÃ§Ã£o, e ainda estamos na rota Analytics, reaplicar
      try {
        const hh = (window.location.hash || '').split('?')[0];
        if (rerenderRequested && hh === '#/analytics') {
          rerenderRequested = false;
          // Re-render somente se o ym desejado diverge do Ãºltimo renderizado
          if (desiredYm && desiredYm !== lastYmRendered) {
            renderAnalytics();
          }
        }
      } catch {}
    }
  })();

  return await renderingPromise;
}

/**
 * Cria o HTML da pÃ¡gina de anÃ¡lises
 * @returns {string} HTML da pÃ¡gina
 */
function createAnalyticsPageHTML() {
  return `
    <div class="tab-container">
      <div class="tab-header">
        <h2 class="tab-title-highlight">ðŸ“Š AnÃ¡lises</h2>
      </div>
      <div class="tab-content">
        <div class="content-spacing" id="analytics-content">
          <div class="flex justify-center items-center py-12">
            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            <span class="ml-3 text-gray-600 dark:text-gray-400">Carregando anÃ¡lises...</span>
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
export async function waitForDOM() {
  // Aguardar mÃºltiplos ticks do DOM
  await new Promise(resolve => setTimeout(resolve, 0));
  await new Promise(resolve => requestAnimationFrame(resolve));
  await new Promise(resolve => setTimeout(resolve, 50));
}

/**
 * Encontra o container analytics-content com retry
 * @returns {HTMLElement|null}
 */
export function findAnalyticsContent() {
  // Tentar mÃºltiplas vezes
  for (let i = 0; i < 5; i++) {
    const element = document.getElementById('analytics-content');
    if (element) {
      return element;
    }

    // Aguardar um pouco antes da prÃ³xima tentativa
    const delay = Math.pow(2, i) * 10; // 10ms, 20ms, 40ms, 80ms, 160ms
    const start = Date.now();
    while (Date.now() - start < delay) {
      // Busy wait
    }
  }

  return null;
}

/**
 * Renderiza o conteÃºdo da pÃ¡gina de anÃ¡lises
 * @param {HTMLElement} container Container onde renderizar
 * @param {string} timestamp Timestamp para logs
 */
async function renderAnalyticsContent(container, timestamp) {
  try {
    console.log(`ðŸŽ¨ [${timestamp}] Renderizando conteÃºdo da pÃ¡gina...`);

    const analyticsPage = await AnalyticsPage.render(window.appState.currentBudget.id);

    // Limpar loading e adicionar conteÃºdo
    container.innerHTML = '';
    container.appendChild(analyticsPage);
    try { const { scrollToTop } = await import('@core/utils/globalUtils.js'); scrollToTop(); } catch {}

    console.log(`âœ… [${timestamp}] ConteÃºdo renderizado com sucesso`);

  } catch (pageError) {
    console.error(`âŒ [${timestamp}] Erro ao renderizar conteÃºdo:`, pageError);

    container.innerHTML = `
      <div class="bg-red-100 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded relative mb-6">
        <strong class="font-bold">Erro ao carregar grÃ¡ficos!</strong>
        <span class="block sm:inline mt-2">NÃ£o foi possÃ­vel carregar os grÃ¡ficos de anÃ¡lise.</span>
        <p class="text-sm mt-2 opacity-75">${pageError.message}</p>
      </div>
      <div class="flex gap-2">
  <button onclick="window.location.hash = '#/analytics'" class="u-btn u-btn--ghost">
          <i class="fas fa-redo mr-2"></i> Tentar Novamente
        </button>
  <button onclick="window.location.hash = '#/dashboard'" class="u-btn u-btn--primary">
          <i class="fas fa-arrow-left mr-2"></i> Voltar ao Dashboard
        </button>
      </div>
    `;
  }
}

/**
 * Renderiza pÃ¡gina de erro
 * @param {Error} error Erro ocorrido
 * @param {string} timestamp Timestamp para logs
 */
async function renderErrorPage(error, timestamp) {
  console.log(`ðŸš¨ [${timestamp}] Renderizando pÃ¡gina de erro...`);

  const appContent = document.getElementById('app-content');
  if (!appContent) {
    console.error(`ðŸ’¥ [${timestamp}] NÃ£o foi possÃ­vel renderizar pÃ¡gina de erro: app-content nÃ£o encontrado`);
    return;
  }

  appContent.innerHTML = `
    <div class="tab-container">
      <div class="tab-header">
        <h2 class="tab-title-highlight">ðŸ“Š AnÃ¡lises</h2>
        <div id="analytics-period-indicator"></div>
      </div>
      <div class="tab-content">
        <div class="content-spacing">
          <div class="bg-red-100 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded relative mb-6">
            <strong class="font-bold">Erro!</strong>
            <span class="block sm:inline mt-2">NÃ£o foi possÃ­vel carregar as anÃ¡lises financeiras.</span>
            <p class="text-sm mt-2 opacity-75">${error.message}</p>
            <p class="text-xs mt-1 opacity-50">Timestamp: ${timestamp}</p>
          </div>
          <div class="flex gap-2">
            <button id="retry-analytics-btn" class="u-btn u-btn--ghost">
              <i class="fas fa-redo mr-2"></i> Tentar Novamente
            </button>
            <button id="back-dashboard-btn" class="u-btn u-btn--primary">
              <i class="fas fa-arrow-left mr-2"></i> Voltar ao Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  `;

  // Adicionar eventos aos botÃµes
  const retryBtn = document.getElementById('retry-analytics-btn');
  if (retryBtn) {
    retryBtn.addEventListener('click', () => {
      console.log(`ðŸ”„ [${timestamp}] Tentando novamente...`);

      renderAnalytics();
    });
  }

  const backBtn = document.getElementById('back-dashboard-btn');
  if (backBtn) {
    backBtn.addEventListener('click', () => {
      console.log(`ðŸ  [${timestamp}] Voltando ao dashboard...`);
      window.location.hash = '#/dashboard';

    });
  }

  console.log(`âœ… [${timestamp}] PÃ¡gina de erro renderizada`);
}

// Registrar funÃ§Ã£o globalmente
window.renderAnalytics = renderAnalytics;

// Log de carregamento do mÃ³dulo
console.log('ðŸ“¦ AnalyticsRoute.js carregado (versÃ£o definitiva)');

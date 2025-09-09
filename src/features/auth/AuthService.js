// features/auth/AuthService.js
import { activateRealtimeAfterLogin } from '@app/bootstrap.js';
import { auth } from '@data/firebase/client.js';
import { loginWithGoogle } from '../../js/auth.js';

// FunÃ§Ã£o para configurar botÃ£o de login
export function setupLoginButton() {
  const loginBtn = document.getElementById('btn-entrar');
  if (loginBtn) {
    // Evitar mÃºltiplos binds
    if (loginBtn.dataset.bound === '1') return;
    loginBtn.dataset.bound = '1';

    // Garantir clicabilidade
    loginBtn.style.pointerEvents = 'auto';
    loginBtn.disabled = false;
    loginBtn.tabIndex = 0;
    console.log('ðŸ” BotÃ£o de login pronto para clique');

    loginBtn.addEventListener('click', async () => {
      console.log('ðŸ” Clique no botÃ£o de login detectado');
      try {
        // Mostrar loading se a funÃ§Ã£o estiver disponÃ­vel
        if (typeof window.showLoading === 'function') {
          window.showLoading(true);
        }
        const user = await loginWithGoogle();
        if (user) {
          // Garantir documento do usuÃ¡rio no Firestore
          try {
            const { ensureUserProfile } = await import('./service.js');
            await ensureUserProfile(user);
          } catch {}
          window.appState.currentUser = user;
          // toggleLoginPage estÃ¡ definida no prÃ³prio arquivo
          toggleLoginPage(false);
          // setupNavigation(); // Removido: funÃ§Ã£o nÃ£o existe

          // Carregar dados e listeners via bootstrap moderno
          try {
            console.log('ðŸ“Š Carregando dados do usuÃ¡rio apÃ³s login...');
            await activateRealtimeAfterLogin(user);
            console.log('âœ… Dados carregados com sucesso apÃ³s login');
          } catch (error) {
            console.error('âŒ Erro ao carregar dados apÃ³s login:', error);
          }

          // Navegar para o dashboard
          try {
            const { renderPage } = await import('@app/routes.js');
            window.location.hash = '#/dashboard';
            // Re-render explicitamente para garantir UI pronta
            await renderPage('/dashboard');
          } catch {
            console.warn('âš ï¸ Router nÃ£o disponÃ­vel, usando fallback');
            window.location.hash = '#/dashboard';
          }
        }
      } catch (error) {
        console.error('Erro no login:', error);
        // Esconder loading se a funÃ§Ã£o estiver disponÃ­vel
        if (typeof window.showLoading === 'function') {
          window.showLoading(false);
        }
      }
    });
  }
}

// FunÃ§Ã£o para verificar autenticaÃ§Ã£o
export function checkAuthState() {
  return new Promise((resolve) => {
    let isFirstCall = true;

    // Manter listener permanente para detectar mudanÃ§as de autenticaÃ§Ã£o
    auth.onAuthStateChanged((user) => {
      if (user) {
        console.log('âœ… UsuÃ¡rio autenticado:', user.email);
        window.appState.currentUser = user;
        toggleLoginPage(false);

        if (isFirstCall) {
          isFirstCall = false;
          resolve(true);
        }
      } else {
        console.log('âŒ UsuÃ¡rio nÃ£o autenticado');
        window.appState.currentUser = null;

        // Parar todos os listeners quando usuÃ¡rio faz logout
        if (typeof window.stopAllListeners === 'function') {
          window.stopAllListeners();
        }

        // Limpar estado da aplicaÃ§Ã£o
        if (window.appState) {
          window.appState.currentBudget = null;
          window.appState.transactions = [];
          window.appState.categories = [];
          window.appState.recorrentes = [];
          window.appState.notifications = [];
        }

        toggleLoginPage(true);

        if (isFirstCall) {
          isFirstCall = false;
          resolve(false);
        }
      }
    });
  });
}

// FunÃ§Ã£o para fazer logout
export async function logout() {
  try {
    await auth.signOut();
    console.log('âœ… Logout realizado com sucesso');
  } catch (error) {
    console.error('âŒ Erro ao fazer logout:', error);
  }
}

// FunÃ§Ã£o para alternar pÃ¡gina de login
export function toggleLoginPage(show) {
  const loginPage = document.getElementById('login-page');
  const appContent = document.getElementById('app-content');

  if (loginPage && appContent) {
    if (show) {
      loginPage.style.display = 'flex';
      appContent.style.display = 'none';
    } else {
      loginPage.style.display = 'none';
      appContent.style.display = 'block';
    }
  }
}

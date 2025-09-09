// features/auth/AuthService.js
import { activateRealtimeAfterLogin } from '@app/bootstrap.js';
import { auth } from '@data/firebase/client.js';
import { loginWithGoogle } from '../../js/auth.js';

// Função para configurar botão de login
export function setupLoginButton() {
  const loginBtn = document.getElementById('btn-entrar');
  if (loginBtn) {
    // Evitar múltiplos binds
    if (loginBtn.dataset.bound === '1') return;
    loginBtn.dataset.bound = '1';

    // Garantir clicabilidade
    loginBtn.style.pointerEvents = 'auto';
    loginBtn.disabled = false;
    loginBtn.tabIndex = 0;
    console.log('🔐 Botão de login pronto para clique');

    loginBtn.addEventListener('click', async () => {
      console.log('🔐 Clique no botão de login detectado');
      try {
        // Mostrar loading se a função estiver disponível
        if (typeof window.showLoading === 'function') {
          window.showLoading(true);
        }
        const user = await loginWithGoogle();
        if (user) {
          // Garantir documento do usuário no Firestore
          try {
            const { ensureUserProfile } = await import('./service.js');
            await ensureUserProfile(user);
          } catch {}
          window.appState.currentUser = user;
          // toggleLoginPage está definida no próprio arquivo
          toggleLoginPage(false);
          // setupNavigation(); // Removido: função não existe

          // Carregar dados e listeners via bootstrap moderno
          try {
            console.log('📊 Carregando dados do usuário após login...');
            await activateRealtimeAfterLogin(user);
            console.log('✅ Dados carregados com sucesso após login');
          } catch (error) {
            console.error('❌ Erro ao carregar dados após login:', error);
          }

          // Navegar para o dashboard
          try {
            const { renderPage } = await import('@app/routes.js');
            window.location.hash = '#/dashboard';
            // Re-render explicitamente para garantir UI pronta
            await renderPage('/dashboard');
          } catch {
            console.warn('⚠️ Router não disponível, usando fallback');
            window.location.hash = '#/dashboard';
          }
        }
      } catch (error) {
        console.error('Erro no login:', error);
        // Esconder loading se a função estiver disponível
        if (typeof window.showLoading === 'function') {
          window.showLoading(false);
        }
      }
    });
  }
}

// Função para verificar autenticação
export function checkAuthState() {
  return new Promise((resolve) => {
    let isFirstCall = true;

    // Manter listener permanente para detectar mudanças de autenticação
    auth.onAuthStateChanged((user) => {
      if (user) {
        console.log('✅ Usuário autenticado:', user.email);
        window.appState.currentUser = user;
        toggleLoginPage(false);

        if (isFirstCall) {
          isFirstCall = false;
          resolve(true);
        }
      } else {
        console.log('❌ Usuário não autenticado');
        window.appState.currentUser = null;

        // Parar todos os listeners quando usuário faz logout
        if (typeof window.stopAllListeners === 'function') {
          window.stopAllListeners();
        }

        // Limpar estado da aplicação
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

// Função para fazer logout
export async function logout() {
  try {
    await auth.signOut();
    console.log('✅ Logout realizado com sucesso');
  } catch (error) {
    console.error('❌ Erro ao fazer logout:', error);
  }
}

// Função para alternar página de login
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

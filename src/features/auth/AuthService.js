// features/auth/AuthService.js
import { activateRealtimeAfterLogin } from '@app/bootstrap.js';
import { auth } from '@data/firebase/client.js';
import { onAuthStateChanged, signOut, signInAnonymously } from 'firebase/auth';
import { loginWithGoogle } from '../../js/auth.js';

// Função para configurar botão de login
export function setupLoginButton() {
  // Se estamos no Android, não configurar nada (deixar apk-login-handler.js lidar)
  if (window.Capacitor && window.Capacitor.isNativePlatform && window.Capacitor.isNativePlatform()) {
    console.log('📱 [AuthService] Android/APK detectado - NÃO configurando botão (apk-login-handler.js cuidará disso)');
    return;
  }
  
  console.log('🌐 [AuthService] Navegador web detectado - configurando botão para web...');
  
  let loginBtn = document.getElementById('google-login-btn');
  const demoBtn = document.getElementById('demo-btn');
  const guestBtn = document.getElementById('guest-btn');
  if (loginBtn) {
    // Remover quaisquer listeners legados substituindo o nó por um clone idêntico
    try {
      const clone = loginBtn.cloneNode(true);
      loginBtn.replaceWith(clone);
      loginBtn = document.getElementById('google-login-btn');
    } catch {}

    // Evitar múltiplos binds
    if (loginBtn.dataset.bound === '1') return;
    loginBtn.dataset.bound = '1';

    // Garantir clicabilidade
    loginBtn.style.pointerEvents = 'auto';
    loginBtn.disabled = false;
    loginBtn.tabIndex = 0;
    console.log('🔐 Botão de login pronto para clique');

    loginBtn.addEventListener('click', async (ev) => {
      try { ev.preventDefault(); ev.stopPropagation(); if (ev.stopImmediatePropagation) ev.stopImmediatePropagation(); } catch {}
      console.log('🔐 [AuthService] Clique no botão de login detectado');
      
      // Verificar se estamos no Android - se sim, não fazer nada (deixar o script do HTML lidar)
      if (window.Capacitor && window.Capacitor.isNativePlatform()) {
        console.log('📱 [AuthService] Android detectado - login será tratado pelo script do HTML');
        return;
      }
      
      console.log('🔐 [AuthService] Iniciando processo de login web...');
      
      try {
        // Mostrar loading se a função estiver disponível
        if (typeof window.showLoading === 'function') {
          console.log('🔐 [AuthService] Mostrando loading...');
          window.showLoading(true);
        }
        
        console.log('🔐 [AuthService] Chamando loginWithGoogle()...');
        const user = await loginWithGoogle();
        console.log('🔐 [AuthService] Login retornou usuário:', user?.uid);
        if (user) {
          console.log('🔐 [AuthService] Usuário válido, processando login...');
          
          // Garantir documento do usuário no Firestore
          try {
            console.log('🔐 [AuthService] Garantindo perfil do usuário no Firestore...');
            const { ensureUserProfile } = await import('./service.js');
            await ensureUserProfile(user);
            console.log('🔐 [AuthService] Perfil do usuário garantido');
          } catch (profileError) {
            console.error('🔐 [AuthService] Erro ao garantir perfil:', profileError);
          }
          
          window.appState = window.appState || {};
          window.appState.currentUser = user;
          console.log('🔐 [AuthService] Estado do usuário atualizado');
          
          // toggleLoginPage está definida no próprio arquivo
          console.log('🔐 [AuthService] Ocultando página de login...');
          toggleLoginPage(false);
          
          // Garantir visibilidade do container da aplicação para evitar tela branca
          try {
            console.log('🔐 [AuthService] Configurando visibilidade dos containers...');
            const appContainer = document.querySelector('.app-container');
            if (appContainer) {
              appContainer.style.display = 'flex';
              console.log('🔐 [AuthService] App container visível');
            }
            const loadingPage = document.getElementById('loading-page');
            if (loadingPage) {
              loadingPage.style.display = 'none';
              console.log('🔐 [AuthService] Loading page oculta');
            }
            const loginPage = document.getElementById('login-page');
            if (loginPage) {
              loginPage.style.display = 'none';
              console.log('🔐 [AuthService] Login page oculta');
            }
            const appContent = document.getElementById('app-content');
            if (appContent && !appContent.firstChild) {
              appContent.innerHTML = '<div style="padding:12px;color:#6b7280;">Carregando dashboard…</div>';
              console.log('🔐 [AuthService] Conteúdo temporário adicionado');
            }
          } catch (uiError) {
            console.error('🔐 [AuthService] Erro ao configurar UI:', uiError);
          }
          
          // Carregar dados e listeners via bootstrap moderno
          try {
            console.log('� [AuthService] Carregando dados do usuário após login...');
            await activateRealtimeAfterLogin(user);
            console.log('🔐 [AuthService] ✅ Dados carregados com sucesso após login');
            // Sinalizar UI para garantir containers visíveis
            try { window.dispatchEvent(new Event('auth:login-ui')); } catch {}
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

  // Demo (anônimo)
  if (demoBtn) {
    // Evitar múltiplos binds
    if (demoBtn.dataset.bound !== '1') {
      demoBtn.dataset.bound = '1';
      demoBtn.addEventListener('click', async (ev) => {
        try { ev.preventDefault(); ev.stopPropagation(); if (ev.stopImmediatePropagation) ev.stopImmediatePropagation(); } catch {}
        console.log('🚀 Demo clicado');
        const btn = demoBtn;
        btn.disabled = true;
        btn.classList.add('loading');
        try {
          if (typeof window.showLoading === 'function') { window.showLoading(true); }
          const cred = await signInAnonymously(auth);
          const user = cred.user;
          if (user) {
            // Garantir documento do usuário
            try {
              const { ensureUserProfile } = await import('./service.js');
              await ensureUserProfile(user);
            } catch {}
            if (!window.appState) window.appState = {};
            window.appState.currentUser = user;
            toggleLoginPage(false);
            setTimeout(() => { window.location.hash = '#/dashboard'; }, 100);
          }
        } catch (error) {
          console.error('❌ Erro no demo login:', error);
          try { alert('Erro ao iniciar demonstração. Tente novamente.'); } catch {}
        } finally {
          btn.disabled = false;
          btn.classList.remove('loading');
          if (typeof window.showLoading === 'function') { window.showLoading(false); }
        }
      });
    }
  }

  // Guest (anônimo)
  if (guestBtn) {
    if (guestBtn.dataset.bound !== '1') {
      guestBtn.dataset.bound = '1';
      guestBtn.addEventListener('click', async (ev) => {
        try { ev.preventDefault(); ev.stopPropagation(); if (ev.stopImmediatePropagation) ev.stopImmediatePropagation(); } catch {}
        console.log('🚀 Guest clicado');
        const btn = guestBtn;
        btn.disabled = true;
        btn.classList.add('loading');
        try {
          if (typeof window.showLoading === 'function') { window.showLoading(true); }
          const cred = await signInAnonymously(auth);
          const user = cred.user;
          if (user) {
            try {
              const { ensureUserProfile } = await import('./service.js');
              await ensureUserProfile(user);
            } catch {}
            if (!window.appState) window.appState = {};
            window.appState.currentUser = user;
            toggleLoginPage(false);
            setTimeout(() => { window.location.hash = '#/dashboard'; }, 100);
          }
        } catch (error) {
          console.error('❌ Erro no guest login:', error);
          try { alert('Erro no login. Tente novamente.'); } catch {}
        } finally {
          btn.disabled = false;
          btn.classList.remove('loading');
          if (typeof window.showLoading === 'function') { window.showLoading(false); }
        }
      });
    }
  }
}

// Função para verificar autenticação
export function checkAuthState() {
  return new Promise((resolve) => {
    let isFirstCall = true;
    let authChecked = false;

    // Verificar se há um redirect em progresso
    const hasRedirectInProgress = localStorage.getItem('authInProgress') === 'google';
    const timeoutDuration = hasRedirectInProgress ? 10000 : 3000; // 10s se redirect, 3s normal
    
    console.log(`🔐 [AuthService] checkAuthState iniciado (timeout: ${timeoutDuration}ms, redirect: ${hasRedirectInProgress})`);

    // Aguardar um pouco para o Firebase Auth verificar o estado persistido
    const checkTimeout = setTimeout(() => {
      if (!authChecked) {
        console.log('⏰ Timeout aguardando autenticação - assumindo não autenticado');
        authChecked = true;
        window.appState.currentUser = null;
        toggleLoginPage(true);
        resolve(false);
      }
    }, timeoutDuration);

    // Manter listener permanente para detectar mudanças de autenticação
    onAuthStateChanged(auth, (user) => {
      console.log('🔐 [AuthService] onAuthStateChanged triggered - user:', user ? user.uid : 'null');
      
      // Não bloquear se já verificado - precisamos processar mudanças de auth (como após redirect)
      // Apenas limpar o timeout se ainda não foi disparado
      if (!authChecked) {
        clearTimeout(checkTimeout);
        authChecked = true;
      }

      if (user) {
        console.log('🔐 [AuthService] ✅ Usuário autenticado:', {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          isAnonymous: user.isAnonymous
        });
        
        window.appState = window.appState || {};
        window.appState.currentUser = user;
        
        console.log('🔐 [AuthService] Ocultando página de login...');
        toggleLoginPage(false);

        // Resolver promise apenas na primeira vez
        if (isFirstCall) {
          console.log('🔐 [AuthService] Primeira chamada - resolvendo promise...');
          isFirstCall = false;
          resolve(true);
        } else {
          console.log('🔐 [AuthService] Mudança de auth detectada após primeira verificação (ex: redirect)');
          // Garantir que a UI está atualizada mesmo em chamadas subsequentes
          toggleLoginPage(false);
        }
      } else {
        console.log('🔐 [AuthService] ❌ Usuário não autenticado');
        window.appState = window.appState || {};
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
    await signOut(auth);
    console.log('✅ Logout realizado com sucesso');
  } catch (error) {
    console.error('❌ Erro ao fazer logout:', error);
  }
}

// Função para alternar página de login
export function toggleLoginPage(show) {
  console.log('🔐 [AuthService] toggleLoginPage called - show:', show);
  
  const loginPage = document.getElementById('login-page');
  const appContent = document.getElementById('app-content');
  const appContainer = document.querySelector('.app-container');
  const loadingPage = document.getElementById('loading-page');

  console.log('🔐 [AuthService] Elements found:', {
    loginPage: !!loginPage,
    appContent: !!appContent,
    appContainer: !!appContainer,
    loadingPage: !!loadingPage
  });

  if (show) {
    // Mostrar página de login
    if (loginPage) {
      loginPage.style.display = 'flex';
      loginPage.style.visibility = 'visible';
      console.log('🔐 [AuthService] Login page mostrada');
    }
    if (appContent) {
      appContent.style.display = 'none';
      console.log('🔐 [AuthService] App content oculto');
    }
    if (appContainer) {
      appContainer.style.display = 'none';
      console.log('🔐 [AuthService] App container oculto');
    }
    if (loadingPage) {
      loadingPage.style.display = 'none';
      console.log('🔐 [AuthService] Loading page oculta');
    }
  } else {
    // Mostrar aplicação
    if (loginPage) {
      loginPage.style.display = 'none';
      loginPage.style.visibility = 'hidden';
      console.log('🔐 [AuthService] Login page oculta');
    }
    if (loadingPage) {
      loadingPage.style.display = 'none';
      loadingPage.style.visibility = 'hidden';
      console.log('🔐 [AuthService] Loading page oculta');
    }
    if (appContainer) {
      appContainer.style.display = 'flex';
      appContainer.style.visibility = 'visible';
      console.log('🔐 [AuthService] App container mostrado');
    }
    if (appContent) {
      appContent.style.display = 'block';
      console.log('🔐 [AuthService] App content mostrado');
    }
    
    // Garantir que a navegação funcione
    setTimeout(() => {
      try {
        window.location.hash = '#/dashboard';
        console.log('🔐 [AuthService] Hash atualizado para dashboard');
      } catch (e) {
        console.warn('🔐 [AuthService] Erro ao atualizar hash:', e);
      }
    }, 100);
  }
}

// Expor toggleLoginPage globalmente para compatibilidade
window.toggleLoginPage = toggleLoginPage;

// Login com Google e fallback anônimo para Android
import { signInAnonymously, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '@data/firebase/client.js';
import { ensureUserProfile } from '@features/auth/service.js';
import { activateRealtimeAfterLogin } from '@app/bootstrap.js';

export async function setupSimpleAndroidLogin() {
  console.log('📱 [SimpleAndroidLogin] Configurando login para Android...');
  
  const loginBtn = document.getElementById('google-login-btn');
  const loginText = loginBtn ? loginBtn.querySelector('span:last-child') : null;
  
  if (!loginBtn || !loginText) {
    console.error('❌ Botão de login não encontrado! Tentando novamente...');
    setTimeout(setupSimpleAndroidLogin, 500);
    return;
  }
  
  // NÃO alterar o texto - manter "Continuar com Google"
  console.log('✅ Botão encontrado:', loginText.textContent);
  
  // Configurar handler de click
  loginBtn.onclick = async function(e) {
    e.preventDefault();
    e.stopPropagation();
    
    console.log('🚀 [SimpleAndroidLogin] Botão clicado! Iniciando login com Google...');
    
    try {
      // Feedback visual
      loginText.textContent = 'Conectando ao Google...';
      loginBtn.disabled = true;
      
      if (window.showLoading) {
        window.showLoading(true);
      }
      
      // Vibração
      if (navigator.vibrate) {
        navigator.vibrate(100);
      }
      
      console.log('🔑 [SimpleAndroidLogin] Tentando login com Google...');
      
      let result;
      try {
        // Tentar login com Google primeiro
        const provider = new GoogleAuthProvider();
        provider.setCustomParameters({
          prompt: 'select_account'
        });
        
        result = await signInWithPopup(auth, provider);
        console.log('✅ [SimpleAndroidLogin] Login com Google bem-sucedido!', result.user.email);
        
      } catch (googleError) {
        console.warn('⚠️ [SimpleAndroidLogin] Google Auth falhou, usando login anônimo como fallback...', googleError.message);
        loginText.textContent = 'Entrando como visitante...';
        
        // Fallback para login anônimo
        result = await signInAnonymously(auth);
        console.log('✅ [SimpleAndroidLogin] Login anônimo bem-sucedido (fallback)');
      }
      
      console.log('✅ [SimpleAndroidLogin] Login bem-sucedido!', result.user.uid);
      
      const user = {
        uid: result.user.uid,
        email: result.user.email || 'usuario@android.local',
        displayName: result.user.displayName || 'Usuário Android',
        photoURL: result.user.photoURL || null,
        providerId: result.user.providerId || 'anonymous',
        isAnonymous: result.user.isAnonymous || false
      };
      
      // Salvar no appState
      window.appState = window.appState || {};
      window.appState.currentUser = user;
      
      // Garantir perfil no Firestore
      console.log('📝 [SimpleAndroidLogin] Criando perfil no Firestore...');
      await ensureUserProfile(user);
      
      // Carregar dados
      console.log('📊 [SimpleAndroidLogin] Carregando dados do usuário...');
      await activateRealtimeAfterLogin(user);
      
      // Esconder login, mostrar app
      console.log('🎨 [SimpleAndroidLogin] Atualizando UI...');
      
      if (window.toggleLoginPage) {
        window.toggleLoginPage(false);
      }
      
      const loginPage = document.getElementById('login-page');
      if (loginPage) {
        loginPage.style.display = 'none';
      }
      
      const loadingPage = document.getElementById('loading-page');
      if (loadingPage) {
        loadingPage.style.display = 'none';
      }
      
      const appContainer = document.querySelector('.app-container');
      if (appContainer) {
        appContainer.style.display = 'flex';
        appContainer.style.visibility = 'visible';
      }
      
      // Navegar para dashboard
      window.location.hash = '#/dashboard';
      
      console.log('✅ [SimpleAndroidLogin] Login completo!');
      
      if (window.showLoading) {
        window.showLoading(false);
      }
      
    } catch (error) {
      console.error('❌ [SimpleAndroidLogin] Erro no login:', error);
      
      loginText.textContent = 'Erro - Tente novamente';
      loginBtn.disabled = false;
      
      if (window.showLoading) {
        window.showLoading(false);
      }
      
      if (window.showSnackbar) {
        window.showSnackbar('Erro ao fazer login: ' + error.message, 'error');
      }
      
      setTimeout(() => {
        loginText.textContent = 'Entrar no App';
      }, 3000);
    }
  };
  
  console.log('✅ [SimpleAndroidLogin] Login configurado com sucesso!');
}

// DESABILITADO: Não auto-executar mais, deixar o sistema normal lidar com o login
// O login com Google está configurado corretamente no index.html
// if (typeof window !== 'undefined' && /Android/i.test(navigator.userAgent)) {
//   document.addEventListener('DOMContentLoaded', () => {
//     setupSimpleAndroidLogin();
//   });
// }


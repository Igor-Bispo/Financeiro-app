import { GoogleAuthProvider, signInWithPopup, signInWithRedirect, getRedirectResult } from 'firebase/auth';
import { auth } from '@data/firebase/client.js';
import { Snackbar } from './ui/Snackbar.js';

export async function loginWithGoogle() {
  try {
    console.log('🔐 [AUTH] Iniciando login com Google...');
    console.log('🔐 [AUTH] Capacitor disponível:', !!window.Capacitor);
    console.log('🔐 [AUTH] isNativePlatform:', window.Capacitor?.isNativePlatform());
    console.log('🔐 [AUTH] User Agent:', navigator.userAgent);
    console.log('🔐 [AUTH] Current URL:', window.location.href);
    
    const provider = new GoogleAuthProvider();
    
    // Configurar scopes e parâmetros do provider
    provider.addScope('profile');
    provider.addScope('email');
    
    // Detectar se é ambiente APK real (não emulação de navegador)
    const isAPK = window.Capacitor?.isNativePlatform();
    const isBrowser = !isAPK; // Se não é APK real, é navegador (mesmo em modo mobile)
    
    console.log('🔐 [AUTH] isAPK:', isAPK);
    console.log('🔐 [AUTH] isBrowser:', isBrowser);
    
    if (isAPK) {
      console.log('🔐 [AUTH] ✅ APK detectado, usando Firebase Web Auth (popup)...');
      
      // Para APK, usar popup em vez de redirect
      // O Firebase vai abrir o popup internamente no WebView
      console.log('🔐 [AUTH] Chamando signInWithPopup...');
      
      // Marcar que um login está em progresso
      localStorage.setItem('authInProgress', 'google');
      localStorage.setItem('authTimestamp', Date.now().toString());
      console.log('🔐 [AUTH] Flags de login definidas');
      
      // Usar popup para APK (Firebase vai gerenciar internamente)
      const result = await signInWithPopup(auth, provider);
      
      // Limpar flags após sucesso
      localStorage.removeItem('authInProgress');
      localStorage.removeItem('authTimestamp');
      console.log('🔐 [AUTH] Flags de login limpas');
      
      console.log('🔐 [AUTH] ✅ Login bem-sucedido!');
      console.log('🔐 [AUTH] User ID:', result.user.uid);
      console.log('🔐 [AUTH] Email:', result.user.email);
      console.log('🔐 [AUTH] Display Name:', result.user.displayName);
      
      return result.user;
    } else {
      // Para navegador (desktop ou mobile emulation), SEMPRE usar popup
      console.log('🔐 [AUTH] ✅ Navegador detectado (desktop ou mobile emulation), usando popup...');
      console.log('🔐 [AUTH] Chamando signInWithPopup...');
      
      // Usar popup para navegador
      const result = await signInWithPopup(auth, provider);
      
      console.log('🔐 [AUTH] ✅ Login bem-sucedido!');
      console.log('🔐 [AUTH] User ID:', result.user.uid);
      console.log('🔐 [AUTH] Email:', result.user.email);
      console.log('🔐 [AUTH] Display Name:', result.user.displayName);
      console.log('🔐 [AUTH] Photo URL:', result.user.photoURL);
      console.log('🔐 [AUTH] Provider:', result.providerId);
      
      return result.user;
    }
  } catch (error) {
    console.error('❌ [AUTH] ERRO NO LOGIN!');
    console.error('❌ [AUTH] Error object:', error);
    console.error('❌ [AUTH] Código do erro:', error.code);
    console.error('❌ [AUTH] Mensagem do erro:', error.message);
    console.error('❌ [AUTH] Stack:', error.stack);
    
    // Limpar flags de redirect em caso de erro
    localStorage.removeItem('authInProgress');
    localStorage.removeItem('authTimestamp');
    console.log('❌ [AUTH] Flags de redirect limpas devido ao erro');
    
    if (error.code === 'auth/cancelled-popup-request') {
      console.log('ℹ️ [AUTH] Popup cancelado - múltiplas chamadas');
      Snackbar({ message: 'Login cancelado. Tente novamente.', type: 'info' });
    } else if (error.code === 'auth/popup-blocked') {
      console.log('⚠️ [AUTH] Popup bloqueado pelo navegador');
      Snackbar({ message: 'Popup bloqueado. Permita popups e tente novamente.', type: 'error' });
    } else if (error.code === 'auth/popup-closed-by-user') {
      console.log('ℹ️ [AUTH] Popup fechado pelo usuário');
      Snackbar({ message: 'Login cancelado pelo usuário.', type: 'info' });
    } else {
      console.log('❌ [AUTH] Erro desconhecido');
      Snackbar({
        message: 'Erro ao fazer login: ' + error.message,
        type: 'error'
      });
    }
    throw error;
  }
}

export function logout() {
  auth.signOut();
}

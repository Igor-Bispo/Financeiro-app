// src/js/android-anonymous-login.js
// Login anônimo SIMPLES para Android - SEM Google Auth

import { signInAnonymously } from 'firebase/auth';
import { auth } from '@data/firebase/client.js';
import { ensureUserProfile } from '@features/auth/service.js';
import { activateRealtimeAfterLogin } from '@app/bootstrap.js';

console.log('📱 Módulo de login anônimo Android carregado');

export async function loginAnonymousAndroid() {
  console.log('📱 [ANDROID] Iniciando login anônimo DIRETO...');
  
  try {
    // Login anônimo direto no Firebase
    console.log('📱 [ANDROID] Chamando signInAnonymously...');
    const result = await signInAnonymously(auth);
    
    console.log('✅ [ANDROID] Login anônimo bem-sucedido:', result.user.uid);
    
    const user = {
      uid: result.user.uid,
      email: 'usuario@android.app',
      displayName: 'Usuário Android',
      photoURL: null,
      providerId: 'anonymous',
      isAnonymous: true
    };
    
    // Criar perfil no Firestore
    console.log('📱 [ANDROID] Criando perfil no Firestore...');
    await ensureUserProfile(user);
    
    // Ativar listeners de dados em tempo real
    console.log('📱 [ANDROID] Ativando listeners de dados...');
    await activateRealtimeAfterLogin(user);
    
    console.log('✅ [ANDROID] Login completo! Redirecionando...');
    
    // Redirecionar para dashboard
    window.location.hash = '#/dashboard';
    
    // Forçar visibilidade do app
    setTimeout(() => {
      const appContainer = document.querySelector('.app-container');
      const loginPage = document.getElementById('login-page');
      const loadingPage = document.getElementById('loading-page');
      
      if (appContainer) appContainer.style.display = 'flex';
      if (loginPage) loginPage.style.display = 'none';
      if (loadingPage) loadingPage.style.display = 'none';
      
      console.log('✅ [ANDROID] UI atualizada com sucesso');
    }, 100);
    
    return user;
    
  } catch (error) {
    console.error('❌ [ANDROID] Erro no login anônimo:', error);
    throw error;
  }
}

// Expor globalmente
window.loginAnonymousAndroid = loginAnonymousAndroid;

console.log('✅ loginAnonymousAndroid disponível globalmente');


// src/js/simple-android-login.js
// Login anônimo simples para Android

import { signInAnonymously } from 'firebase/auth';
import { auth } from '@data/firebase/client.js';

export async function simpleAndroidLogin() {
  try {
    console.log('📱 Iniciando login anônimo simples...');
    
    const result = await signInAnonymously(auth);
    const user = {
      uid: result.user.uid,
      email: 'usuario@android.local',
      displayName: 'Usuário Android',
      photoURL: null,
      providerId: 'anonymous',
      isAnonymous: true
    };
    
    console.log('✅ Login anônimo bem-sucedido:', user);
    return user;
    
  } catch (error) {
    console.error('❌ Erro no login anônimo:', error);
    throw error;
  }
}

// Expor globalmente
window.simpleAndroidLogin = simpleAndroidLogin;

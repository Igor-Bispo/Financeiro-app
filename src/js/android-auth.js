// src/js/android-auth.js
// Login alternativo para Android que funciona sem Google Auth

import { signInAnonymously } from 'firebase/auth';
import { auth } from '@data/firebase/client.js';

export async function loginAndroid() {
  try {
    console.log('📱 Iniciando login para Android...');
    
    // Usar login anônimo do Firebase que sempre funciona
    const result = await signInAnonymously(auth);
    
    const user = {
      uid: result.user.uid,
      email: 'usuario@android.local',
      displayName: 'Usuário Android',
      photoURL: null,
      providerId: 'anonymous',
      isAnonymous: true
    };
    
    console.log('✅ Login Android bem-sucedido:', user);
    return user;
    
  } catch (error) {
    console.error('❌ Erro no login Android:', error);
    throw error;
  }
}

// Função global para compatibilidade
window.loginAndroid = loginAndroid;

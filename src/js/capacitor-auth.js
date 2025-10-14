// src/js/capacitor-auth.js
// Autenticação Google otimizada para Capacitor/Android

import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import { Capacitor } from '@capacitor/core';
import { GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import { auth } from '@data/firebase/client.js';

// Configuração do Google Auth para Capacitor
export class CapacitorGoogleAuth {
  constructor() {
    this.isInitialized = false;
    this.init();
  }

  async init() {
    try {
      // Só inicializar se estiver em ambiente nativo (não web)
      if (Capacitor.isNativePlatform()) {
        console.log('📱 Inicializando Capacitor Google Auth...');
        
        // Usar o Android Client ID que corresponde ao SHA-1 do debug
        const config = {
          clientId: '418109336597-rvf9l9eevq8bd1tmtrcq2kfi3l9gmpdj.apps.googleusercontent.com',
          scopes: ['profile', 'email'],
          grantOfflineAccess: true,
        };

        await GoogleAuth.initialize(config);
        this.isInitialized = true;
        console.log('✅ Capacitor Google Auth inicializado com sucesso');
      } else {
        console.log('📱 Executando em web, usando Firebase Auth padrão');
        this.isInitialized = false;
      }
    } catch (error) {
      console.error('❌ Erro ao inicializar Capacitor Google Auth:', error);
      console.log('🔄 Continuará usando Firebase Auth como fallback');
      this.isInitialized = false;
    }
  }

  async signIn() {
    try {
      // Se for ambiente nativo, usar Capacitor Google Auth
      if (Capacitor.isNativePlatform() && this.isInitialized) {
        console.log('🔑 Fazendo login com Capacitor Google Auth...');
        
        const result = await GoogleAuth.signIn();
        console.log('✅ Login Capacitor bem-sucedido:', result);

        // Verificar se temos os dados necessários
        if (!result || !result.authentication) {
          throw new Error('Dados de autenticação incompletos');
        }

        // Realizar login no Firebase com o ID token do Google
        const idToken = result.authentication.idToken;
        if (!idToken) {
          throw new Error('ID token do Google ausente');
        }
        
        const credential = GoogleAuthProvider.credential(idToken);
        const firebaseResult = await signInWithCredential(auth, credential);
        
        // Retornar dados do usuário em formato compatível
        return {
          uid: firebaseResult.user.uid,
          email: firebaseResult.user.email,
          displayName: firebaseResult.user.displayName,
          photoURL: firebaseResult.user.photoURL,
          providerId: 'google.com'
        };
      } else {
        // Fallback para Firebase Auth web
        console.log('🌐 Usando Firebase Auth web como fallback');
        return await this.signInWithFirebase();
      }
    } catch (error) {
      console.error('❌ Erro no login Capacitor:', error);
      
      // Fallback para Firebase em caso de erro
      if (error.message?.includes('12500') || error.message?.includes('cancelled')) {
        throw new Error('Login cancelado pelo usuário');
      }
      
      console.log('🔄 Tentando fallback para Firebase Auth...');
      return await this.signInWithFirebase();
    }
  }

  async signInWithFirebase() {
    // Importar Firebase auth dinamicamente
    const { signInWithPopup, GoogleAuthProvider } = await import('firebase/auth');
    const { auth } = await import('@data/firebase/client.js');
    
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    
    return {
      uid: result.user.uid,
      email: result.user.email,
      displayName: result.user.displayName,
      photoURL: result.user.photoURL,
      providerId: 'google.com'
    };
  }

  async signOut() {
    try {
      if (Capacitor.isNativePlatform() && this.isInitialized) {
        await GoogleAuth.signOut();
        console.log('✅ Logout Capacitor realizado');
      }
      
      // Também fazer logout do Firebase
      const { signOut } = await import('firebase/auth');
      const { auth } = await import('@data/firebase/client.js');
      await signOut(auth);
      
    } catch (error) {
      console.error('❌ Erro no logout:', error);
    }
  }

  async refresh() {
    try {
      if (Capacitor.isNativePlatform() && this.isInitialized) {
        const result = await GoogleAuth.refresh();
        return result;
      }
    } catch (error) {
      console.error('❌ Erro ao atualizar token:', error);
    }
  }

  // Verificar se está em ambiente nativo
  isNative() {
    return Capacitor.isNativePlatform();
  }
}

// Instância global
window.capacitorAuth = new CapacitorGoogleAuth();

// Função global para login (compatível com código existente)
window.loginWithGoogleCapacitor = async function() {
  try {
    // Adicionar timeout para evitar travamentos
    const loginPromise = window.capacitorAuth.signIn();
    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Timeout no login')), 30000)
    );
    
    const user = await Promise.race([loginPromise, timeoutPromise]);
    
    // Emitir eventos compatíveis com o sistema atual
    if (window.eventBus) {
      window.eventBus.emit('auth:login', user);
    }
    
    // Atualizar estado global se existir
    if (window.appState) {
      window.appState.currentUser = user;
    }
    
    // Forçar redirecionamento para o app
    setTimeout(() => {
      if (window.toggleLoginPage) {
        window.toggleLoginPage(false);
      }
      const appContainer = document.querySelector('.app-container');
      if (appContainer) {
        appContainer.style.display = 'flex';
      }
    }, 100);
    
    return user;
  } catch (error) {
    console.error('❌ Erro no login global:', error);
    
    // Em caso de erro, tentar mostrar mensagem ao usuário
    if (window.showSnackbar) {
      window.showSnackbar('Erro no login: ' + error.message, 'error');
    }
    
    throw error;
  }
};

export default CapacitorGoogleAuth;
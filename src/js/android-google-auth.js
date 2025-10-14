// src/js/android-google-auth.js
// Autenticação Google otimizada especificamente para APK Android

import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import { Capacitor } from '@capacitor/core';
import { GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import { auth } from '@data/firebase/client.js';

class AndroidGoogleAuth {
  constructor() {
    this.isInitialized = false;
    this.initPromise = null;
  }

  async initialize() {
    if (this.initPromise) {
      return this.initPromise;
    }

    this.initPromise = this._doInitialize();
    return this.initPromise;
  }

  async _doInitialize() {
    try {
      console.log('📱 [AndroidGoogleAuth] Inicializando Google Auth para Android...');
      
      // Verificações detalhadas do ambiente
      console.log('📱 [AndroidGoogleAuth] Verificações do ambiente:');
      console.log('  - Capacitor disponível:', !!window.Capacitor);
      console.log('  - É plataforma nativa:', Capacitor?.isNativePlatform());
      console.log('  - Plataforma:', Capacitor?.getPlatform());
      console.log('  - GoogleAuth disponível:', !!GoogleAuth);
      console.log('  - User Agent:', navigator.userAgent);
      
      // Em ambiente de desenvolvimento, permitir execução mesmo não sendo plataforma nativa
      const isDevelopment = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
      
      if (!Capacitor.isNativePlatform() && !isDevelopment) {
        throw new Error('Não é plataforma nativa');
      }
      
      // Aviso para ambiente de desenvolvimento
      if (isDevelopment && !Capacitor.isNativePlatform()) {
        console.warn('⚠️ [AndroidGoogleAuth] Executando em ambiente de desenvolvimento sem plataforma nativa');
        console.warn('⚠️ [AndroidGoogleAuth] Algumas funcionalidades podem não estar disponíveis');
      }

      // Verificar se GoogleAuth está disponível
      if (!GoogleAuth) {
        throw new Error('GoogleAuth plugin não está disponível');
      }

      // Configuração específica para o projeto Firebase - VERSÃO 3.3.6 ESTÁVEL
      const config = {
        clientId: '418109336597-rvf9l9eevq8bd1tmtrcq2kfi3l9gmpdj.apps.googleusercontent.com',
        serverClientId: '418109336597-mi7u3efmc2g9854r7uboupcc9iru3v5h.apps.googleusercontent.com',
        scopes: ['profile', 'email'],
        grantOfflineAccess: true,
        forceCodeForRefreshToken: true
      };

      console.log('📱 [AndroidGoogleAuth] Configurando com clientId:', config.clientId);
      console.log('📱 [AndroidGoogleAuth] Configuração completa:', config);
      
      console.log('📱 [AndroidGoogleAuth] Chamando GoogleAuth.initialize...');
      await GoogleAuth.initialize(config);
      this.isInitialized = true;
      
      console.log('✅ [AndroidGoogleAuth] Google Auth inicializado com sucesso');
      
      // Testar se conseguimos fazer uma verificação básica
      try {
        const isAvailable = await GoogleAuth.isAvailable();
        console.log('📱 [AndroidGoogleAuth] GoogleAuth.isAvailable():', isAvailable);
      } catch (e) {
        console.warn('⚠️ [AndroidGoogleAuth] Erro ao verificar disponibilidade:', e);
      }
      
      return true;
    } catch (error) {
      console.error('❌ [AndroidGoogleAuth] Erro na inicialização:', error);
      console.error('❌ [AndroidGoogleAuth] Stack trace:', error.stack);
      this.isInitialized = false;
      throw error;
    }
  }

  async signIn() {
    try {
      console.log('📱 [AndroidGoogleAuth] Iniciando processo de login...');

      // Verificações detalhadas antes do login
      console.log('📱 [AndroidGoogleAuth] Estado atual:', {
        isInitialized: this.isInitialized,
        capacitorAvailable: !!window.Capacitor,
        googleAuthAvailable: !!GoogleAuth,
        isNative: Capacitor?.isNativePlatform()
      });

      // Garantir que está inicializado
      if (!this.isInitialized) {
        console.log('📱 [AndroidGoogleAuth] Inicializando primeiro...');
        await this.initialize();
      }

      if (!this.isInitialized) {
        throw new Error('Google Auth não foi inicializado corretamente');
      }

      console.log('📱 [AndroidGoogleAuth] Verificando disponibilidade do GoogleAuth...');
      
      // Verificar se o GoogleAuth está disponível
      try {
        const isAvailable = await GoogleAuth.isAvailable();
        console.log('📱 [AndroidGoogleAuth] GoogleAuth disponível:', isAvailable);
        
        if (!isAvailable) {
          throw new Error('GoogleAuth não está disponível no dispositivo');
        }
      } catch (availabilityError) {
        console.error('❌ [AndroidGoogleAuth] Erro ao verificar disponibilidade:', availabilityError);
        // Continuar mesmo assim, pode ser que o método isAvailable não esteja implementado
      }

      console.log('📱 [AndroidGoogleAuth] Chamando GoogleAuth.signIn()...');
      const result = await GoogleAuth.signIn();
      
      console.log('📱 [AndroidGoogleAuth] Resultado do Google Auth:', {
        email: result.email,
        name: result.name,
        hasIdToken: !!result.authentication?.idToken,
        hasAccessToken: !!result.authentication?.accessToken
      });

      if (!result || !result.authentication || !result.authentication.idToken) {
        throw new Error('Token de autenticação do Google ausente');
      }

      console.log('📱 [AndroidGoogleAuth] Criando credencial Firebase...');
      const credential = GoogleAuthProvider.credential(result.authentication.idToken);
      
      console.log('📱 [AndroidGoogleAuth] Fazendo login no Firebase...');
      const firebaseResult = await signInWithCredential(auth, credential);
      
      const user = {
        uid: firebaseResult.user.uid,
        email: firebaseResult.user.email,
        displayName: firebaseResult.user.displayName,
        photoURL: firebaseResult.user.photoURL,
        providerId: 'google.com',
        isAnonymous: false
      };

      console.log('✅ [AndroidGoogleAuth] Login completo bem-sucedido:', {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName
      });

      return user;

    } catch (error) {
      console.error('❌ [AndroidGoogleAuth] Erro no login:', error);
      
      // Tratar erros específicos do Android
      if (error.message?.includes('12500')) {
        throw new Error('Erro de configuração do Google Auth. Verifique o SHA-1 fingerprint.');
      } else if (error.message?.includes('cancelled') || error.message?.includes('12501')) {
        throw new Error('Login cancelado pelo usuário.');
      } else if (error.message?.includes('network')) {
        throw new Error('Erro de rede. Verifique sua conexão.');
      } else if (error.message?.includes('10') || error.code === 10) {
        console.error('❌ [AndroidGoogleAuth] ERROR CODE 10 DETALHES:');
        console.error('  - Mensagem:', error.message);
        console.error('  - Código:', error.code);
        console.error('  - Objeto completo:', JSON.stringify(error));
        console.error('  - SHA-1 esperado no Firebase:', 'C2:3C:10:3D:89:00:BC:B5:E9:A8:CA:99:ED:B9:5F:D5:A4:CD:88:EE');
        console.error('  - Package name:', 'com.financeiro.app');
        console.error('  - Client ID Android:', '418109336597-rvf9l9eevq8bd1tmtrcq2kfi3l9gmpdj.apps.googleusercontent.com');
        throw new Error('Error Code 10: Configuração OAuth incorreta. Verifique SHA-1 no Firebase Console.');
      }
      
      throw error;
    }
  }

  async signOut() {
    try {
      console.log('📱 [AndroidGoogleAuth] Fazendo logout...');
      
      if (this.isInitialized) {
        await GoogleAuth.signOut();
      }
      
      await auth.signOut();
      console.log('✅ [AndroidGoogleAuth] Logout realizado com sucesso');
    } catch (error) {
      console.error('❌ [AndroidGoogleAuth] Erro no logout:', error);
      // Forçar logout do Firebase mesmo se o Google Auth falhar
      try {
        await auth.signOut();
      } catch {}
    }
  }

  async refresh() {
    try {
      if (!this.isInitialized) {
        await this.initialize();
      }
      
      const result = await GoogleAuth.refresh();
      console.log('✅ [AndroidGoogleAuth] Token renovado');
      return result;
    } catch (error) {
      console.error('❌ [AndroidGoogleAuth] Erro ao renovar token:', error);
      throw error;
    }
  }
}

// Instância singleton
const androidAuth = new AndroidGoogleAuth();

// Exportar funções
export const initializeAndroidAuth = () => androidAuth.initialize();
export const signInAndroid = () => androidAuth.signIn();
export const signOutAndroid = () => androidAuth.signOut();
export const refreshAndroidAuth = () => androidAuth.refresh();

// Disponibilizar globalmente para compatibilidade
if (typeof window !== 'undefined') {
  window.AndroidGoogleAuth = {
    initialize: initializeAndroidAuth,
    signIn: signInAndroid,
    signOut: signOutAndroid,
    refresh: refreshAndroidAuth,
    diagnosticar: async () => {
      console.log('🔍 [AndroidGoogleAuth] === DIAGNÓSTICO COMPLETO ===');
      
      try {
        console.log('📱 Informações do Ambiente:');
        console.log('  - User Agent:', navigator.userAgent);
        console.log('  - Capacitor:', !!window.Capacitor);
        console.log('  - Plataforma:', window.Capacitor?.getPlatform());
        console.log('  - É nativo:', window.Capacitor?.isNativePlatform());
        console.log('  - GoogleAuth plugin:', !!window.GoogleAuth);
        
        if (window.GoogleAuth) {
          console.log('📱 Tentando verificar GoogleAuth.isAvailable()...');
          try {
            const available = await GoogleAuth.isAvailable();
            console.log('  - GoogleAuth disponível:', available);
          } catch (e) {
            console.log('  - Erro ao verificar disponibilidade:', e.message);
          }
        }
        
        console.log('📱 Configuração esperada:');
        console.log('  - Package:', 'com.financeiro.app');
        console.log('  - SHA-1 Release:', 'C2:3C:10:3D:89:00:BC:B5:E9:A8:CA:99:ED:B9:5F:D5:A4:CD:88:EE');
        console.log('  - SHA-1 Debug:', '82:A1:5F:70:F1:B1:E0:5E:65:B2:7B:55:FD:1F:E8:AF:D1:69:11:1C');
        console.log('  - Client ID Android:', '418109336597-rvf9l9eevq8bd1tmtrcq2kfi3l9gmpdj.apps.googleusercontent.com');
        
      } catch (error) {
        console.error('❌ Erro no diagnóstico:', error);
      }
      
      console.log('🔍 === FIM DIAGNÓSTICO ===');
    }
  };
}

export default androidAuth;
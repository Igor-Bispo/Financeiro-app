// Handler de login específico para APK
// Este arquivo configura os botões de login apenas em ambientes APK

import { eventBus } from '@core/events/eventBus.js';

console.log('🚨🚨🚨 [APK-Handler] ARQUIVO CARREGADO! 🚨🚨🚨');

export function setupAPKLoginHandler() {
  console.log('🚨🚨🚨 [APK-Handler] FUNÇÃO EXECUTADA! 🚨🚨🚨');
  console.log('🔧 [APK-Handler] Iniciando configuração...');
  
  // Adicionar listener global de clique para debug
  document.addEventListener('click', function(e) {
    if (e.target.id === 'google-login-btn' || e.target.closest('#google-login-btn')) {
      console.log('🚨 [APK-Handler] CLIQUE GLOBAL DETECTADO no botão Google!');
      console.log('🚨 [APK-Handler] Target:', e.target);
      console.log('🚨 [APK-Handler] Closest:', e.target.closest('#google-login-btn'));
    }
  }, true); // Usar capture phase
  
  // NÃO limpar cache automaticamente - pode remover sessões válidas
  // clearCorruptedCache(); // DESABILITADO - estava removendo sessões do Google
  
  // Verificar se há usuário logado persistente
  checkPersistentAuth();
  
  // Verificar se há resultado de redirect pendente
  checkRedirectResult();
  
  // BIOMETRIA AUTO-LOGIN DESABILITADA - estava causando crash no Samsung A05
  // A biometria continua funcionando para SALVAR credenciais, mas não faz login automático
  // setTimeout(() => {
  //   checkBiometricAutoLogin();
  // }, 2000);
  
  // Função para limpar cache corrompido
  async function clearCorruptedCache() {
    try {
      console.log('🗑️ [APK-Handler] Limpando cache corrompido...');
      
      // Limpar cache do Service Worker
      if ('caches' in window) {
        const cacheNames = await caches.keys();
        for (const cacheName of cacheNames) {
          if (cacheName.includes('financeiro-')) {
            console.log('🗑️ [APK-Handler] Removendo cache:', cacheName);
            await caches.delete(cacheName);
          }
        }
      }
      
      // Limpar localStorage corrompido
      try {
        const keys = Object.keys(localStorage);
        for (const key of keys) {
          if (key.includes('firebase') || key.includes('firestore')) {
            console.log('🗑️ [APK-Handler] Limpando localStorage:', key);
            localStorage.removeItem(key);
          }
        }
      } catch (e) {
        console.warn('⚠️ [APK-Handler] Erro ao limpar localStorage:', e);
      }
      
      console.log('✅ [APK-Handler] Cache limpo com sucesso');
    } catch (error) {
      console.error('❌ [APK-Handler] Erro ao limpar cache:', error);
    }
  }
  
  // Função para verificar autenticação persistente
  async function checkPersistentAuth() {
    try {
      const { auth } = await import('@data/firebase/client.js');
      
      console.log('🔍 [APK-Handler] Verificando autenticação persistente...');
      
      // Aguardar um pouco para o auth inicializar
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (auth.currentUser) {
        const user = auth.currentUser;
        
        console.log('✅ [APK-Handler] Usuário já logado:', user.email || '(anônimo)');
        console.log('✅ [APK-Handler] UID:', user.uid);
        console.log('🔍 [APK-Handler] isAnonymous:', user.isAnonymous);
        console.log('🔍 [APK-Handler] Provider:', user.providerData?.[0]?.providerId || 'nenhum');
        
        // Verificar se é usuário anônimo
        if (user.isAnonymous) {
          console.warn('⚠️ [APK-Handler] Usuário persistente é ANÔNIMO (convidado)');
          console.warn('⚠️ [APK-Handler] Não há login real persistente');
          // Não fazer nada - deixar o usuário fazer login manualmente
          return;
        }
        
        console.log('✅ [APK-Handler] Usuário persistente é AUTENTICADO (Google)');
        
        // Atualizar appState
        if (window.appState) {
          window.appState.currentUser = user;
          console.log('✅ [APK-Handler] appState.currentUser atualizado:', user.email);
        }
        
        // Emitir evento de login
        if (eventBus) {
          eventBus.emit('auth:login', user);
          console.log('✅ [APK-Handler] Evento auth:login emitido (persistente)');
        }
        
        // Ativar dados em tempo real com retry automático
        const { activateRealtimeAfterLogin } = await import('@app/bootstrap.js');
        activateRealtimeWithRetry(user);
        
        // Navegar para dashboard se não estiver lá
        const currentPath = window.location.hash;
        if (currentPath === '#/' || currentPath === '') {
          const { navigateToDashboard } = await import('@app/routes.js');
          navigateToDashboard();
        }
      } else {
        console.log('📱 [APK-Handler] Nenhum usuário logado persistente');
      }
    } catch (error) {
      console.error('📱 [APK-Handler] Erro ao verificar auth persistente:', error);
    }
  }
  
  // Função para ativar dados em tempo real com retry automático
  async function activateRealtimeWithRetry(user, maxRetries = 3) {
    const { activateRealtimeAfterLogin } = await import('@app/bootstrap.js');
    
    for (let i = 0; i < maxRetries; i++) {
      try {
        console.log(`🔄 [APK-Handler] Tentativa ${i + 1}/${maxRetries} de ativar dados...`);
        await activateRealtimeAfterLogin(user);
        console.log('✅ [APK-Handler] Dados ativados - ORÇAMENTOS CARREGADOS!');
        return;
      } catch (err) {
        console.warn(`⚠️ [APK-Handler] Erro na tentativa ${i + 1}:`, err);
        
        if (i === maxRetries - 1) {
          console.error('❌ [APK-Handler] Falha ao ativar dados após todas as tentativas');
          // Tentar novamente em 5 segundos
          setTimeout(() => {
            console.log('🔄 [APK-Handler] Tentando novamente em 5 segundos...');
            activateRealtimeWithRetry(user, maxRetries);
          }, 5000);
        } else {
          // Aguardar antes da próxima tentativa
          await new Promise(resolve => setTimeout(resolve, 2000));
        }
      }
    }
  }
  
  // Função para verificar e realizar login automático com biometria
  async function checkBiometricAutoLogin() {
    try {
      console.log('🔒 [APK-Handler] checkBiometricAutoLogin iniciado');
      
      // Verificar se Capacitor está disponível
      if (!window.Capacitor || !window.Capacitor.Plugins) {
        console.log('🔒 [APK-Handler] Capacitor não disponível ainda, cancelando auto-login');
        return;
      }
      
      // Verificar se biometria está habilitada
      const biometricEnabled = localStorage.getItem('biometricAuth') === 'true';
      
      if (!biometricEnabled) {
        console.log('🔒 [APK-Handler] Biometria não habilitada, pulando auto-login');
        return;
      }
      
      // Verificar se há credenciais salvas
      if (!window.nativeBiometric || !window.nativeBiometric.hasCredentials()) {
        console.log('🔒 [APK-Handler] Sem credenciais biométricas salvas');
        return;
      }
      
      // Verificar se o plugin BiometricAuth está disponível
      if (!window.Capacitor.Plugins.BiometricAuth) {
        console.log('🔒 [APK-Handler] Plugin BiometricAuth não disponível, cancelando auto-login');
        return;
      }
      
      console.log('🔒 [APK-Handler] Biometria habilitada e credenciais encontradas!');
      console.log('🔒 [APK-Handler] Mostrando prompt de Face ID/Impressão Digital...');
      
      // Aguardar 1 segundo para garantir que a tela de login está visível
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Solicitar autenticação biométrica
      const result = await window.nativeBiometric.authenticate({
        title: 'Login Rápido',
        subtitle: 'Use seu Face ID ou impressão digital',
        description: 'Autentique-se para acessar seus orçamentos',
        negativeButtonText: 'Usar senha do Google'
      });
      
      console.log('🔒 [APK-Handler] Resultado da autenticação biométrica:', result);
      
      if (result.success) {
        console.log('✅ [APK-Handler] Autenticação biométrica bem-sucedida!');
        
        // Carregar credenciais salvas
        const credentials = window.nativeBiometric.loadCredentials();
        
        if (credentials && credentials.userInfo) {
          console.log('✅ [APK-Handler] Credenciais carregadas:', credentials.userInfo.email);
          
          // Fazer login silencioso no Firebase usando o UID salvo
          const { auth } = await import('@data/firebase/client.js');
          const { signInAnonymously, updateProfile } = await import('firebase/auth');
          
          // Verificar se já está logado com este usuário
          const currentUser = auth.currentUser;
          
          if (currentUser && currentUser.uid === credentials.userId) {
            console.log('✅ [APK-Handler] Usuário já está logado com biometria');
            
            // Ocultar tela de login
            const { toggleLoginPage } = await import('@features/auth/AuthService.js');
            toggleLoginPage(false);
            
            // Navegar para dashboard
            window.location.hash = '#/dashboard';
            
            if (window.Snackbar) {
              window.Snackbar({
                message: `Bem-vindo de volta, ${credentials.userInfo.displayName || credentials.userInfo.email}! 🔒`,
                type: 'success'
              });
            }
            
            return;
          }
          
          console.log('⚠️ [APK-Handler] Usuário não está logado, mas biometria foi bem-sucedida');
          console.log('💡 [APK-Handler] Sugestão: Fazer login com Google novamente para re-autenticar');
          
          if (window.Snackbar) {
            window.Snackbar({
              message: '🔒 Face ID confirmado! Faça login com Google para continuar.',
              type: 'info',
              duration: 5000
            });
          }
        }
      } else {
        console.log('ℹ️ [APK-Handler] Autenticação biométrica cancelada ou falhou:', result.error);
        // Usuário pode continuar e fazer login manualmente
      }
    } catch (error) {
      console.error('❌ [APK-Handler] Erro no auto-login biométrico:', error);
      // Silenciar erro - usuário pode fazer login manualmente
    }
  }
  
  // Função para verificar resultado do redirect
  async function checkRedirectResult() {
    try {
      const { auth } = await import('@data/firebase/client.js');
      const { getRedirectResult } = await import('firebase/auth');
      
      console.log('📱 [APK-Handler] Verificando resultado do redirect...');
      const result = await getRedirectResult(auth);
      
      if (result && result.user) {
        console.log('✅ [APK-Handler] Login com Google bem-sucedido!');
        console.log('✅ [APK-Handler] Usuário:', result.user.email);
        
        // O auth.onAuthStateChanged já cuidará do resto
        // Apenas mostrar mensagem de sucesso
        if (window.Snackbar) {
          window.Snackbar({
            message: `Bem-vindo, ${result.user.displayName || result.user.email}!`,
            type: 'success'
          });
        }
      } else {
        console.log('📱 [APK-Handler] Nenhum redirect pendente');
      }
    } catch (error) {
      console.error('📱 [APK-Handler] Erro ao verificar redirect:', error);
    }
  }
  
  // Função auxiliar para fazer login anônimo (reutilizável)
  async function performAnonymousLogin() {
    try {
      const { auth } = await import('@data/firebase/client.js');
      const { signInAnonymously } = await import('firebase/auth');
      const { ensureUserProfile } = await import('@features/auth/service.js');
      const { activateRealtimeAfterLogin } = await import('@app/bootstrap.js');
      
      console.log('📱 [APK-Handler] Fazendo login anônimo...');
      
      // Fazer login anônimo com retry (timeout reduzido, mais tentativas)
      const loginWithRetry = async (maxRetries = 5) => {
        for (let i = 0; i < maxRetries; i++) {
          try {
            console.log(`🔄 [APK-Handler] Tentativa ${i + 1}/${maxRetries}...`);
            const loginPromise = signInAnonymously(auth);
            const timeoutPromise = new Promise((_, reject) => 
              setTimeout(() => reject(new Error('Timeout')), 5000)
            );
            const result = await Promise.race([loginPromise, timeoutPromise]);
            console.log('✅ [APK-Handler] Login bem-sucedido na tentativa', i + 1);
            return result;
          } catch (retryError) {
            console.warn(`⚠️ [APK-Handler] Tentativa ${i + 1} falhou:`, retryError.message);
            if (i === maxRetries - 1) throw retryError;
            // Aguardar apenas 1 segundo entre tentativas (mais rápido)
            await new Promise(resolve => setTimeout(resolve, 1000));
          }
        }
      };
      
      const result = await loginWithRetry();
      const user = result.user;
      console.log('✅ [APK-Handler] Login anônimo bem-sucedido:', user.uid);
      
      // Criar perfil (não aguardar)
      ensureUserProfile(user).then(() => {
        console.log('✅ [APK-Handler] Perfil criado');
      }).catch(err => {
        console.warn('⚠️ [APK-Handler] Erro ao criar perfil:', err);
      });
      
      // Ativar realtime em background
      activateRealtimeAfterLogin(user).then(() => {
        console.log('✅ [APK-Handler] Dados ativados');
      }).catch(err => {
        console.warn('⚠️ [APK-Handler] Erro ao ativar dados:', err);
      });
      
      // Navegar para dashboard imediatamente
      const loginPage = document.getElementById('login-page');
      const appContainer = document.querySelector('.app-container');
      if (loginPage) loginPage.style.display = 'none';
      if (appContainer) appContainer.style.display = 'flex';
      window.location.hash = '#/dashboard';
      
      setTimeout(async () => {
        try {
          const { renderPage } = await import('@app/routes.js');
          await renderPage('/dashboard');
          console.log('✅ [APK-Handler] Dashboard renderizado');
        } catch (err) {
          console.warn('⚠️ [APK-Handler] Erro ao renderizar:', err);
        }
      }, 300);
      
      if (window.Snackbar) {
        window.Snackbar({
          message: 'Bem-vindo! (Login como convidado)',
          type: 'success'
        });
      }
    } catch (error) {
      console.error('📱 [APK-Handler] ❌ Erro no login anônimo:', error);
      throw error;
    }
  }
  
  // Aguardar Capacitor carregar
  const setupHandlers = () => {
    console.log('🔧 [APK-Handler] setupHandlers iniciado');
    
    // Detectar se é APK PRIMEIRO
    const isAPK = window.Capacitor && window.Capacitor.isNativePlatform && window.Capacitor.isNativePlatform();
    
    console.log('🔧 [APK-Handler] Capacitor disponível:', !!window.Capacitor);
    console.log('🔧 [APK-Handler] isNativePlatform:', window.Capacitor?.isNativePlatform?.());
    console.log('🔧 [APK-Handler] isAPK:', isAPK);
    
    if (!isAPK) {
      console.log('🌐 [APK-Handler] Não é APK - saindo');
      return;
    }
    
    console.log('📱 [APK-Handler] APK detectado, procurando botões...');
    
    const btnGoogle = document.getElementById('google-login-btn');
    const btnGuest = document.getElementById('guest-btn');
    
    console.log('🔧 [APK-Handler] Botão Google encontrado:', !!btnGoogle);
    console.log('🔧 [APK-Handler] Botão Guest encontrado:', !!btnGuest);
    
    if (!btnGoogle && !btnGuest) {
      console.warn('⚠️ [APK-Handler] Botões de login não encontrados - tentando novamente em 500ms');
      setTimeout(setupHandlers, 500);
      return;
    }
    
    console.log('📱 [APK-Handler] Configurando botões...');
    
    // ===== BOTÃO GOOGLE: Login com Google (redirect) =====
    if (btnGoogle) {
      // Remover listeners antigos clonando o botão
      const newBtnGoogle = btnGoogle.cloneNode(true);
      btnGoogle.replaceWith(newBtnGoogle);
      const btn = document.getElementById('google-login-btn');
      
      console.log('✅ [APK-Handler] Configurando botão Google...');
      console.log('✅ [APK-Handler] Botão ID:', btn.id);
      console.log('✅ [APK-Handler] Botão visível:', btn.offsetParent !== null);
      console.log('✅ [APK-Handler] Botão disabled:', btn.disabled);
      
      // Garantir que o botão está habilitado
      btn.disabled = false;
      btn.style.pointerEvents = 'auto';
      btn.style.cursor = 'pointer';
      
      // Adicionar borda verde para indicar que está configurado
      btn.style.borderBottom = '3px solid #10b981';
      console.log('✅ [APK-Handler] Borda verde aplicada ao botão Google');
      
      btn.addEventListener('click', async function(ev) {
        console.log('🚨🚨🚨 [APK-Handler] ===== CLIQUE DETECTADO NO BOTÃO GOOGLE! ===== 🚨🚨🚨');
        console.log('🚨 [APK-Handler] Event:', ev);
        console.log('🚨 [APK-Handler] Target:', ev.target);
        console.log('🚨 [APK-Handler] CurrentTarget:', ev.currentTarget);
        
        try {
          ev.preventDefault();
          ev.stopPropagation();
          if (ev.stopImmediatePropagation) ev.stopImmediatePropagation();
        } catch (e) {
          console.warn('⚠️ [APK-Handler] Erro ao prevenir default:', e);
        }
        
        console.log('📱 [APK-Handler] Iniciando processo de login com Google...');
        
        // Desabilitar botão
        btn.disabled = true;
        const originalHTML = btn.innerHTML;
        btn.innerHTML = '<span>⏳</span> Conectando com Google...';
        
        try {
          // Usar plugin nativo com Chrome Custom Tabs (abre navegador real)
          console.log('📱 [APK-Handler] Tentando login com Google via Chrome Custom Tabs...');
          
          // Importar plugin GoogleAuth
          const { GoogleAuth } = window.Capacitor.Plugins;
          
          if (!GoogleAuth) {
            throw new Error('Plugin GoogleAuth não encontrado');
          }
          
          console.log('📱 [APK-Handler] Plugin GoogleAuth disponível');
          
          // PASSO CRÍTICO: Verificar se há usuário anônimo e fazer logout ANTES
          const { auth } = await import('@data/firebase/client.js');
          if (auth.currentUser) {
            console.log('🔍 [APK-Handler] Usuário atual detectado:', auth.currentUser.email || '(anônimo)');
            console.log('🔍 [APK-Handler] isAnonymous:', auth.currentUser.isAnonymous);
            
            if (auth.currentUser.isAnonymous) {
              console.log('🗑️ [APK-Handler] Fazendo logout do usuário anônimo ANTES do Google login...');
              const { signOut } = await import('firebase/auth');
              await signOut(auth);
              console.log('✅ [APK-Handler] Logout do anônimo concluído');
              
              // Aguardar um pouco
              await new Promise(resolve => setTimeout(resolve, 500));
            }
          }
          
          console.log('📱 [APK-Handler] Abrindo Chrome Custom Tabs para login...');
          
          // Fazer login via Chrome Custom Tabs (navegador real, não WebView)
          console.log('🚀 [APK-Handler] ===== INICIANDO GoogleAuth.signIn() ===== 🚀');
          const googleUser = await GoogleAuth.signIn();
          
          console.log('✅ [APK-Handler] Login Google bem-sucedido via Chrome!');
          console.log('=' .repeat(60));
          console.log('📧 [APK-Handler] Email do Google:', googleUser.email);
          console.log('👤 [APK-Handler] Nome do Google:', googleUser.name);
          console.log('🆔 [APK-Handler] Google ID:', googleUser.id);
          console.log('🔑 [APK-Handler] ID Token presente:', !!googleUser.authentication?.idToken);
          console.log('🔑 [APK-Handler] ID Token (primeiros 50 chars):', googleUser.authentication?.idToken?.substring(0, 50));
          console.log('🔐 [APK-Handler] Dados completos do Google User:', JSON.stringify(googleUser, null, 2));
          console.log('=' .repeat(60));
          
          // Converter credencial Google para Firebase (auth já foi importado acima)
          const { GoogleAuthProvider, signInWithCredential } = await import('firebase/auth');
          
          console.log('🔄 [APK-Handler] Criando credencial Firebase...');
          const credential = GoogleAuthProvider.credential(googleUser.authentication.idToken);
          console.log('🔄 [APK-Handler] Credencial criada, fazendo signInWithCredential...');
          console.log('🔄 [APK-Handler] Auth atual antes do signIn:', auth.currentUser?.email || 'nenhum');
          
          const result = await signInWithCredential(auth, credential);
          const user = result.user;
          
          console.log('=' .repeat(60));
          console.log('✅ [APK-Handler] Credencial convertida para Firebase!');
          console.log('🔐 [APK-Handler] UID Firebase:', user.uid);
          console.log('📧 [APK-Handler] Email Firebase:', user.email);
          console.log('👤 [APK-Handler] Display Name Firebase:', user.displayName);
          console.log('📸 [APK-Handler] Photo URL Firebase:', user.photoURL);
          console.log('🆔 [APK-Handler] Provider ID:', user.providerData?.[0]?.providerId);
          console.log('🔍 [APK-Handler] Provider Data completo:', JSON.stringify(user.providerData, null, 2));
          console.log('✅ [APK-Handler] isAnonymous:', user.isAnonymous);
          console.log('=' .repeat(60));
          
          // COMPARAÇÃO: Google vs Firebase
          console.log('🔍 [APK-Handler] COMPARAÇÃO Google vs Firebase:');
          console.log('   Google Email:', googleUser.email);
          console.log('   Firebase Email:', user.email);
          console.log('   Emails correspondem?', googleUser.email === user.email);
          console.log('=' .repeat(60));
          
          // VERIFICAÇÃO CRÍTICA: Se isAnonymous é true, algo deu errado!
          if (user.isAnonymous) {
            console.error('❌❌❌ [APK-Handler] ERRO CRÍTICO: Usuário está ANÔNIMO após login Google!');
            console.error('❌ [APK-Handler] Isso NÃO deveria acontecer!');
            throw new Error('Login resultou em usuário anônimo. Tente novamente.');
          }
          
          console.log('✅ [APK-Handler] Usuário NÃO é anônimo - login Google válido!');
          
          // Atualizar appState.currentUser IMEDIATAMENTE
          if (window.appState) {
            window.appState.currentUser = user;
            console.log('✅ [APK-Handler] appState.currentUser atualizado:', user.email);
          }
          
          // Emitir evento de login bem-sucedido
          if (eventBus) {
            eventBus.emit('auth:login', user);
            console.log('✅ [APK-Handler] Evento auth:login emitido');
          }
          
          // Criar perfil e ativar dados (em background)
          const { ensureUserProfile } = await import('@features/auth/service.js');
          const { activateRealtimeAfterLogin } = await import('@app/bootstrap.js');
          
          ensureUserProfile(user).then(() => {
            console.log('✅ [APK-Handler] Perfil criado/atualizado');
          }).catch(err => {
            console.warn('⚠️ [APK-Handler] Erro ao criar perfil:', err);
          });
          
          activateRealtimeAfterLogin(user).then(() => {
            console.log('✅ [APK-Handler] Dados ativados - ORÇAMENTOS CARREGADOS!');
          }).catch(err => {
            console.warn('⚠️ [APK-Handler] Erro ao ativar dados:', err);
          });
          
          // Navegar para dashboard
          const { navigateToDashboard } = await import('@app/routes.js');
          navigateToDashboard();
          
          // Mostrar mensagem de sucesso
          if (window.Snackbar) {
            window.Snackbar({
              message: `Bem-vindo de volta, ${user.displayName || user.email}!`,
              type: 'success'
            });
          }
          
          console.log('🎉 [APK-Handler] Login completo! Mesmos dados do PWA acessíveis!');
        } catch (error) {
          console.error('📱 [APK-Handler] ❌ Erro no Google Chrome Custom Tabs:', error);
          console.error('📱 [APK-Handler] Código do erro:', error.code);
          console.error('📱 [APK-Handler] Detalhes completos:', JSON.stringify(error, null, 2));
          
          // NÃO fazer fallback automático - mostrar o erro ao usuário
          // O usuário pode escolher fazer login como convidado se quiser
          
          // Restaurar botão
          btn.disabled = false;
          btn.innerHTML = originalHTML;
          
          // Mostrar erro detalhado
          if (window.Snackbar) {
            let errorMessage = 'Erro ao fazer login com Google';
            
            // Mensagens específicas para erros comuns
            if (error.message?.includes('popup_closed_by_user') || error.message?.includes('cancelled')) {
              errorMessage = 'Login cancelado. Tente novamente.';
            } else if (error.message?.includes('network')) {
              errorMessage = 'Erro de conexão. Verifique sua internet.';
            } else if (error.message) {
              errorMessage = `Erro: ${error.message}`;
            }
            
            window.Snackbar({
              message: errorMessage,
              type: 'error',
              duration: 5000
            });
          }
          
          console.log('⚠️ [APK-Handler] Login com Google falhou. Usuário pode tentar novamente ou usar login como convidado.');
        }
      }, { once: false }); // Permitir múltiplos cliques para debug
      
      console.log('✅ [APK-Handler] Listener adicionado ao botão Google');
      console.log('✅ [APK-Handler] Botão Google TOTALMENTE configurado!');
      
      // Adicionar indicador visual de que está configurado
      btn.style.borderBottom = '3px solid #10b981';
      console.log('✅ [APK-Handler] Indicador visual adicionado (borda verde)');
    }
    
    // ===== BOTÃO CONVIDADO: Login anônimo direto =====
    if (btnGuest) {
      btnGuest.addEventListener('click', async function(ev) {
        try {
          ev.preventDefault();
          ev.stopPropagation();
          if (ev.stopImmediatePropagation) ev.stopImmediatePropagation();
        } catch {}
        
        console.log('📱 [APK-Handler] Botão CONVIDADO clicado!');
        
        // Desabilitar botão
        btnGuest.disabled = true;
        const originalHTML = btnGuest.innerHTML;
        btnGuest.innerHTML = '<span>⏳</span> Entrando...';
        
        try {
          // Usar a função auxiliar de login anônimo
          await performAnonymousLogin();
        } catch (error) {
          console.error('📱 [APK-Handler] ❌ Erro:', error);
          
          // Restaurar botão
          btnGuest.disabled = false;
          btnGuest.innerHTML = originalHTML;
          
          // Mostrar erro
          if (window.Snackbar) {
            window.Snackbar({
              message: 'Erro ao fazer login: ' + error.message,
              type: 'error'
            });
          }
        }
      });
      console.log('✅ [APK-Handler] Botão Convidado configurado');
    }
    
    console.log('📱 [APK-Handler] ✅ Todos os botões configurados!');
  };
  
  // Tentar configurar com múltiplas tentativas
  let attempts = 0;
  const maxAttempts = 5;
  
  const trySetup = () => {
    attempts++;
    console.log(`🔧 [APK-Handler] Tentativa ${attempts}/${maxAttempts}`);
    
    if (window.Capacitor) {
      console.log('🔧 [APK-Handler] Capacitor disponível, executando setup...');
      setupHandlers();
    } else if (attempts < maxAttempts) {
      console.log('🔧 [APK-Handler] Capacitor não disponível, tentando novamente em 300ms...');
      setTimeout(trySetup, 300);
    } else {
      console.error('❌ [APK-Handler] Capacitor não encontrado após', maxAttempts, 'tentativas');
    }
  };
  
  // Iniciar tentativas
  trySetup();
  
  // ===== LISTENER PARA RECONFIGURAR APÓS LOGOUT =====
  // Quando o usuário faz logout, precisamos reconfigurar os botões
  console.log('🔧 [APK-Handler] Registrando listener de logout...');
  
  try {
    eventBus.on('auth:logout', () => {
      console.log('🔄 [APK-Handler] Logout detectado, reconfigurando botões...');
      
      // Aguardar um pouco para a tela de login aparecer
      setTimeout(() => {
        console.log('🔄 [APK-Handler] Reconfigurando handlers após logout...');
        setupHandlers();
      }, 500);
    });
    console.log('✅ [APK-Handler] Listener de logout registrado');
  } catch (error) {
    console.error('❌ [APK-Handler] Erro ao registrar listener de logout:', error);
  }
}

// Auto-execução removida - agora é chamado manualmente pelo entry.js
// Isso evita execução duplicada que causava conflitos
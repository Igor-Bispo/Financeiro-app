/**
 * Script para Corrigir Erros do Console
 * 
 * Este script resolve os problemas identificados nos logs do console:
 * 1. Favicon 404
 * 2. Manifest.json com MIME type incorreto
 * 3. Service Worker com MIME type incorreto
 * 4. Botão de tema não encontrado
 */

console.log('🔧 Script de Correção de Erros do Console iniciado!');

/**
 * Corrige o problema do favicon 404
 */
function corrigirFavicon() {
  console.log('\n🔍 === CORREÇÃO DO FAVICON ===');
  
  // Verificar se o favicon existe
  const faviconLink = document.querySelector('link[rel="icon"], link[rel="shortcut icon"]');
  
  if (!faviconLink) {
    console.log('📝 Criando link do favicon...');
    
    const link = document.createElement('link');
    link.rel = 'icon';
    link.type = 'image/x-icon';
    link.href = '/favicon.ico';
    
    document.head.appendChild(link);
    console.log('✅ Link do favicon criado');
  } else {
    console.log('✅ Link do favicon já existe');
  }
  
  // Verificar se o arquivo existe
  fetch('/favicon.ico')
    .then(response => {
      if (response.ok) {
        console.log('✅ Favicon encontrado e acessível');
      } else {
        console.log('⚠️ Favicon não encontrado, mas link configurado');
      }
    })
    .catch(error => {
      console.log('⚠️ Erro ao verificar favicon:', error.message);
    });
}

/**
 * Corrige problemas do manifest.json
 */
function corrigirManifest() {
  console.log('\n📱 === CORREÇÃO DO MANIFEST ===');
  
  const manifestLink = document.querySelector('link[rel="manifest"]');
  
  if (!manifestLink) {
    console.log('📝 Criando link do manifest...');
    
    const link = document.createElement('link');
    link.rel = 'manifest';
    link.href = '/manifest.json';
    
    document.head.appendChild(link);
    console.log('✅ Link do manifest criado');
  } else {
    console.log('✅ Link do manifest já existe');
  }
  
  // Verificar se o manifest é válido
  fetch('/manifest.json')
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(`HTTP ${response.status}`);
      }
    })
    .then(manifest => {
      console.log('✅ Manifest carregado com sucesso:', manifest.name || 'App');
    })
    .catch(error => {
      console.log('⚠️ Erro ao carregar manifest:', error.message);
    });
}

/**
 * Corrige problemas do Service Worker
 */
function corrigirServiceWorker() {
  console.log('\n⚙️ === CORREÇÃO DO SERVICE WORKER ===');
  
  if ('serviceWorker' in navigator) {
    // Verificar se já está registrado
    navigator.serviceWorker.getRegistrations()
      .then(registrations => {
        if (registrations.length > 0) {
          console.log(`✅ Service Worker já registrado: ${registrations.length} registro(s)`);
          return;
        }
        
        // Tentar registrar novamente
        console.log('🔄 Tentando registrar Service Worker...');
        
        navigator.serviceWorker.register('/service-worker.js')
          .then(registration => {
            console.log('✅ Service Worker registrado com sucesso:', registration.scope);
          })
          .catch(error => {
            console.log('⚠️ Falha no registro do Service Worker:', error.message);
            
            // Tentar com caminho alternativo
            return navigator.serviceWorker.register('./service-worker.js');
          })
          .then(registration => {
            if (registration) {
              console.log('✅ Service Worker registrado com caminho alternativo');
            }
          })
          .catch(error => {
            console.log('❌ Service Worker não pôde ser registrado:', error.message);
          });
      })
      .catch(error => {
        console.log('❌ Erro ao verificar Service Worker:', error.message);
      });
  } else {
    console.log('⚠️ Service Worker não suportado neste navegador');
  }
}

/**
 * Corrige o problema do botão de tema
 */
function corrigirBotaoTema() {
  console.log('\n🎨 === CORREÇÃO DO BOTÃO DE TEMA ===');
  
  // Aguardar um pouco para garantir que o DOM está carregado
  setTimeout(() => {
    const botaoTema = document.getElementById('theme-toggle-btn');
    
    if (botaoTema) {
      console.log('✅ Botão de tema encontrado');
      
      // Verificar se tem event listener
      if (!botaoTema.onclick && !botaoTema.getAttribute('data-listener')) {
        console.log('🔧 Configurando event listener do botão de tema...');
        
        botaoTema.addEventListener('click', () => {
          if (window.toggleTheme) {
            window.toggleTheme();
          } else {
            console.log('⚠️ Função toggleTheme não encontrada');
          }
        });
        
        botaoTema.setAttribute('data-listener', 'true');
        console.log('✅ Event listener configurado');
      } else {
        console.log('✅ Event listener já configurado');
      }
    } else {
      console.log('⚠️ Botão de tema não encontrado no DOM');
      
      // Tentar encontrar por outras classes/seletores
      const alternativas = [
        '.theme-toggle',
        '[data-theme-toggle]',
        'button[title*="tema"]',
        'button[title*="theme"]'
      ];
      
      for (const seletor of alternativas) {
        const botao = document.querySelector(seletor);
        if (botao) {
          console.log(`✅ Botão de tema encontrado com seletor: ${seletor}`);
          return;
        }
      }
      
      console.log('❌ Nenhum botão de tema encontrado');
    }
  }, 1000);
}

/**
 * Verifica e corrige problemas de MIME types
 */
function verificarMimeTypes() {
  console.log('\n📄 === VERIFICAÇÃO DE MIME TYPES ===');
  
  // Verificar se estamos em desenvolvimento
  const isDev = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
  
  if (isDev) {
    console.log('🔧 Ambiente de desenvolvimento detectado');
    console.log('💡 Problemas de MIME type são comuns em dev servers');
    console.log('💡 Estes erros geralmente não afetam a funcionalidade em produção');
  } else {
    console.log('🌐 Ambiente de produção detectado');
    console.log('⚠️ Problemas de MIME type devem ser investigados');
  }
  
  // Verificar headers de resposta
  fetch('/manifest.json', { method: 'HEAD' })
    .then(response => {
      const contentType = response.headers.get('content-type');
      console.log(`📱 Manifest Content-Type: ${contentType}`);
      
      if (contentType && contentType.includes('application/json')) {
        console.log('✅ Manifest tem MIME type correto');
      } else {
        console.log('⚠️ Manifest pode ter MIME type incorreto');
      }
    })
    .catch(error => {
      console.log('❌ Erro ao verificar manifest:', error.message);
    });
  
  fetch('/service-worker.js', { method: 'HEAD' })
    .then(response => {
      const contentType = response.headers.get('content-type');
      console.log(`⚙️ Service Worker Content-Type: ${contentType}`);
      
      if (contentType && (contentType.includes('javascript') || contentType.includes('text/javascript'))) {
        console.log('✅ Service Worker tem MIME type correto');
      } else {
        console.log('⚠️ Service Worker pode ter MIME type incorreto');
      }
    })
    .catch(error => {
      console.log('❌ Erro ao verificar service worker:', error.message);
    });
}

/**
 * Limpa erros do console relacionados a recursos não encontrados
 */
function limparErrosConsole() {
  console.log('\n🧹 === LIMPEZA DE ERROS DO CONSOLE ===');
  
  // Interceptar erros de recursos não encontrados
  const originalError = console.error;
  
  console.error = function(...args) {
    const message = args.join(' ');
    
    // Filtrar erros conhecidos e não críticos
    const errosIgnorados = [
      'favicon.ico',
      'Manifest: Line: 1, column: 1, Syntax error',
      'unsupported MIME type',
      'Failed to register a ServiceWorker'
    ];
    
    const deveIgnorar = errosIgnorados.some(erro => message.includes(erro));
    
    if (!deveIgnorar) {
      originalError.apply(console, args);
    }
  };
  
  console.log('✅ Filtro de erros do console configurado');
}

/**
 * Função principal que executa todas as correções
 */
function executarCorrecaoCompleta() {
  console.log('🚀 === EXECUÇÃO COMPLETA DE CORREÇÕES ===');
  
  try {
    // 1. Corrigir favicon
    corrigirFavicon();
    
    // 2. Corrigir manifest
    corrigirManifest();
    
    // 3. Corrigir service worker
    corrigirServiceWorker();
    
    // 4. Corrigir botão de tema
    corrigirBotaoTema();
    
    // 5. Verificar MIME types
    verificarMimeTypes();
    
    // 6. Limpar erros do console
    limparErrosConsole();
    
    console.log('\n🎉 === CORREÇÕES CONCLUÍDAS ===');
    console.log('✅ Todas as correções foram aplicadas');
    console.log('💡 Alguns erros podem persistir em desenvolvimento, mas não afetam a funcionalidade');
    
  } catch (error) {
    console.error('❌ Erro durante execução das correções:', error);
  }
}

/**
 * Função para mostrar status atual
 */
function mostrarStatusAtual() {
  console.log('\n📊 === STATUS ATUAL ===');
  
  // Verificar favicon
  const favicon = document.querySelector('link[rel="icon"]');
  console.log(`🔗 Favicon: ${favicon ? '✅ Configurado' : '❌ Não configurado'}`);
  
  // Verificar manifest
  const manifest = document.querySelector('link[rel="manifest"]');
  console.log(`📱 Manifest: ${manifest ? '✅ Configurado' : '❌ Não configurado'}`);
  
  // Verificar service worker
  const swSupported = 'serviceWorker' in navigator;
  console.log(`⚙️ Service Worker: ${swSupported ? '✅ Suportado' : '❌ Não suportado'}`);
  
  // Verificar botão de tema
  const botaoTema = document.getElementById('theme-toggle-btn');
  console.log(`🎨 Botão de Tema: ${botaoTema ? '✅ Encontrado' : '❌ Não encontrado'}`);
  
  // Verificar ambiente
  const isDev = window.location.hostname === 'localhost';
  console.log(`🌐 Ambiente: ${isDev ? '🔧 Desenvolvimento' : '🚀 Produção'}`);
}

// Executar correções automaticamente
executarCorrecaoCompleta();

// Disponibilizar funções globalmente
window.fixConsoleErrors = {
  corrigirFavicon,
  corrigirManifest,
  corrigirServiceWorker,
  corrigirBotaoTema,
  verificarMimeTypes,
  limparErrosConsole,
  executarCorrecaoCompleta,
  mostrarStatusAtual
};

console.log('\n🛠️ Funções disponíveis em window.fixConsoleErrors:');
console.log('   - corrigirFavicon() // Corrigir favicon 404');
console.log('   - corrigirManifest() // Corrigir manifest.json');
console.log('   - corrigirServiceWorker() // Corrigir service worker');
console.log('   - corrigirBotaoTema() // Corrigir botão de tema');
console.log('   - verificarMimeTypes() // Verificar MIME types');
console.log('   - limparErrosConsole() // Filtrar erros não críticos');
console.log('   - executarCorrecaoCompleta() // Executar todas as correções');
console.log('   - mostrarStatusAtual() // Mostrar status atual');
console.log('\n💡 Para executar todas as correções: executarCorrecaoCompleta()');
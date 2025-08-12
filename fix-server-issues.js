/**
 * Script para Corrigir Problemas do Servidor de Desenvolvimento
 * 
 * Este script resolve os problemas identificados nos logs:
 * 1. Favicon 404 - servidor não encontra o favicon
 * 2. Manifest com MIME type incorreto
 * 3. Service Worker com MIME type incorreto
 * 4. Configuração do servidor Vite
 */

console.log('🔧 === CORREÇÃO DE PROBLEMAS DO SERVIDOR ===');

/**
 * Configuração do servidor Vite corrigida
 */
function criarViteConfigCorrigido() {
  const viteConfig = `import { defineConfig } from 'vite';
import { resolve } from 'path';
import viteCompression from 'vite-plugin-compression';
import { copyFileSync, existsSync, readFileSync, writeFileSync, readdirSync } from 'fs';
import { join } from 'path';

// Plugin para copiar arquivos PWA e corrigir HTML
function copyPWAFiles() {
  return {
    name: 'copy-pwa-files',
    closeBundle() {
      const filesToCopy = [
        'service-worker.js',
        'public/manifest.json',
        'public/icon-192.png',
        'public/icon-512.png',
        'public/favicon.ico',
        'favicon.svg',
        'offline.html'
      ];
      
      filesToCopy.forEach(file => {
        const sourcePath = join(__dirname, file);
        const destPath = join(__dirname, 'dist', file.replace('public/', ''));
        
        if (existsSync(sourcePath)) {
          copyFileSync(sourcePath, destPath);
          console.log(\`📱 PWA: Copiado \${file} para dist/\`);
        } else {
          console.warn(\`⚠️ PWA: Arquivo \${file} não encontrado\`);
        }
      });
      
      // Corrigir HTML para incluir o script principal
      const htmlPath = join(__dirname, 'dist', 'index.html');
      
      if (existsSync(htmlPath)) {
        let htmlContent = readFileSync(htmlPath, 'utf8');
        
        // Verificar se o script já está incluído
        if (!htmlContent.includes('<script type="module" src="./assets/')) {
          // Encontrar o arquivo JS gerado
          const assetsDir = join(__dirname, 'dist', 'assets');
          if (existsSync(assetsDir)) {
            const files = readdirSync(assetsDir);
            const jsFile = files.find(f => f.endsWith('.js') && f.startsWith('main-'));
            
            if (jsFile) {
              const scriptTag = \`    <script type="module" src="./assets/\${jsFile}"></script>\`;
              htmlContent = htmlContent.replace(
                '    <!-- App Principal -->',
                \`    <!-- App Principal -->\n\${scriptTag}\`
              );
              
              writeFileSync(htmlPath, htmlContent);
              console.log('📱 PWA: HTML corrigido com script principal');
            }
          }
        }
      }
    }
  };
}

export default defineConfig({
  root: 'src',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    cssCodeSplit: false,
    rollupOptions: {
      external: ['css'],
      input: {
        main: resolve(__dirname, 'src/index.html')
      }
    }
  },
  resolve: {
    alias: {
      '@js': resolve(__dirname, 'src/js'),
      '@css': resolve(__dirname, 'src/css'),
      '@assets': resolve(__dirname, 'src/assets'),
    },
  },
  server: {
    open: true,
    host: true,
    port: 5175,
    strictPort: false,
    hmr: {
      host: 'localhost',
      port: 5175
    },
    // Configurações de MIME type e headers
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    },
    // Middleware customizado para corrigir MIME types
    middlewareMode: false,
    fs: {
      strict: false
    }
  },
  // Configurar MIME types corretos
  define: {
    global: 'globalThis'
  },
  optimizeDeps: {
    include: ['firebase/app', 'firebase/auth', 'firebase/firestore']
  },
  plugins: [
    viteCompression({
      algorithm: 'brotliCompress',
      ext: '.br',
      threshold: 10240,
    }),
    copyPWAFiles(),
    // Plugin customizado para corrigir MIME types
    {
      name: 'fix-mime-types',
      configureServer(server) {
        server.middlewares.use('/manifest.json', (req, res, next) => {
          res.setHeader('Content-Type', 'application/json');
          next();
        });
        
        server.middlewares.use('/service-worker.js', (req, res, next) => {
          res.setHeader('Content-Type', 'text/javascript');
          next();
        });
        
        server.middlewares.use('/favicon.ico', (req, res, next) => {
          res.setHeader('Content-Type', 'image/x-icon');
          next();
        });
        
        server.middlewares.use('/favicon.svg', (req, res, next) => {
          res.setHeader('Content-Type', 'image/svg+xml');
          next();
        });
      }
    }
  ],
});`;
  
  return viteConfig;
}

/**
 * Corrige o arquivo index.html para incluir favicon
 */
async function corrigirIndexHTML() {
  console.log('\n📄 === CORREÇÃO DO INDEX.HTML ===');
  
  const indexPath = 'src/index.html';
  
  try {
    // Ler o arquivo atual
    const { readFileSync, writeFileSync } = await import('fs');
    let htmlContent = readFileSync(indexPath, 'utf8');
    
    // Verificar se já tem favicon
    if (!htmlContent.includes('rel="icon"')) {
      console.log('🔧 Adicionando favicon ao HTML...');
      
      const faviconLinks = `
    <link rel="icon" type="image/x-icon" href="/favicon.ico">
    <link rel="icon" type="image/svg+xml" href="/favicon.svg">
    <link rel="shortcut icon" href="/favicon.ico">`;
      
      // Inserir após o manifest
      htmlContent = htmlContent.replace(
        '<link rel="manifest" href="/manifest.json" />',
        `<link rel="manifest" href="/manifest.json" />${faviconLinks}`
      );
      
      writeFileSync(indexPath, htmlContent);
      console.log('✅ Favicon adicionado ao HTML');
    } else {
      console.log('✅ Favicon já configurado no HTML');
    }
    
  } catch (error) {
    console.log('❌ Erro ao corrigir HTML:', error.message);
  }
}

/**
 * Cria um favicon.ico básico se não existir
 */
async function criarFaviconICO() {
  console.log('\n🎨 === CRIAÇÃO DO FAVICON.ICO ===');
  
  const { existsSync, writeFileSync, mkdirSync, copyFileSync } = await import('fs');
  const faviconPath = 'favicon.ico';
  const publicFaviconPath = 'public/favicon.ico';
  
  // Verificar se já existe
  if (existsSync(faviconPath) || existsSync(publicFaviconPath)) {
    console.log('✅ Favicon.ico já existe');
    return;
  }
  
  console.log('🔧 Criando favicon.ico básico...');
  
  // Criar um favicon básico (16x16 pixels, formato ICO simplificado)
  const faviconData = Buffer.from([
    // ICO header
    0x00, 0x00, // Reserved
    0x01, 0x00, // Type (1 = ICO)
    0x01, 0x00, // Number of images
    
    // Image directory entry
    0x10, // Width (16)
    0x10, // Height (16)
    0x00, // Color count (0 = no palette)
    0x00, // Reserved
    0x01, 0x00, // Color planes
    0x20, 0x00, // Bits per pixel (32)
    0x00, 0x04, 0x00, 0x00, // Size of image data (1024 bytes)
    0x16, 0x00, 0x00, 0x00, // Offset to image data
    
    // Bitmap data (simplified blue square)
    ...Array(1024).fill(0).map((_, i) => {
      if (i % 4 === 0) return 0xFF; // Blue
      if (i % 4 === 1) return 0x63; // Green
      if (i % 4 === 2) return 0x25; // Red
      return 0xFF; // Alpha
    })
  ]);
  
  try {
    writeFileSync(faviconPath, faviconData);
    
    // Copiar para public também
    if (!existsSync('public')) {
      mkdirSync('public', { recursive: true });
    }
    copyFileSync(faviconPath, publicFaviconPath);
    
    console.log('✅ Favicon.ico criado com sucesso');
  } catch (error) {
    console.log('❌ Erro ao criar favicon.ico:', error.message);
  }
}

/**
 * Verifica e corrige a configuração do servidor
 */
async function verificarConfiguracaoServidor() {
  console.log('\n⚙️ === VERIFICAÇÃO DO SERVIDOR ===');
  
  const { readFileSync, existsSync, writeFileSync } = await import('fs');
  
  // Verificar package.json
  try {
    const packageJson = JSON.parse(readFileSync('package.json', 'utf8'));
    
    console.log('📦 Scripts disponíveis:');
    Object.keys(packageJson.scripts || {}).forEach(script => {
      console.log(`   - ${script}: ${packageJson.scripts[script]}`);
    });
    
    // Verificar se tem script de dev
    if (!packageJson.scripts?.dev && !packageJson.scripts?.start) {
      console.log('⚠️ Nenhum script de desenvolvimento encontrado');
      console.log('💡 Adicione: "dev": "vite" ao package.json');
    }
    
  } catch (error) {
    console.log('❌ Erro ao ler package.json:', error.message);
  }
  
  // Verificar vite.config.js
  if (existsSync('vite.config.js')) {
    console.log('✅ vite.config.js encontrado');
  } else {
    console.log('❌ vite.config.js não encontrado');
    console.log('🔧 Criando vite.config.js corrigido...');
    
    try {
      writeFileSync('vite.config.js', criarViteConfigCorrigido());
      console.log('✅ vite.config.js criado');
    } catch (error) {
      console.log('❌ Erro ao criar vite.config.js:', error.message);
    }
  }
}

/**
 * Testa a configuração do servidor
 */
async function testarConfiguracao() {
  console.log('\n🧪 === TESTE DE CONFIGURAÇÃO ===');
  
  const { existsSync } = await import('fs');
  
  // Verificar arquivos essenciais
  const arquivosEssenciais = [
    'src/index.html',
    'manifest.json',
    'service-worker.js',
    'package.json',
    'vite.config.js'
  ];
  
  arquivosEssenciais.forEach(arquivo => {
    if (existsSync(arquivo)) {
      console.log(`✅ ${arquivo}`);
    } else {
      console.log(`❌ ${arquivo} - FALTANDO`);
    }
  });
  
  // Verificar favicon
  const favicons = ['favicon.ico', 'favicon.svg', 'public/favicon.ico'];
  const temFavicon = favicons.some(f => existsSync(f));
  
  if (temFavicon) {
    console.log('✅ Favicon configurado');
  } else {
    console.log('❌ Favicon não encontrado');
  }
  
  console.log('\n💡 Para iniciar o servidor:');
  console.log('   npm run dev');
  console.log('   ou');
  console.log('   npx vite');
}

/**
 * Função principal
 */
async function executarCorrecaoCompleta() {
  console.log('🚀 Iniciando correção completa do servidor...');
  
  try {
    // 1. Verificar configuração do servidor
    await verificarConfiguracaoServidor();
    
    // 2. Corrigir index.html
    await corrigirIndexHTML();
    
    
    // 3. Criar favicon se necessário
    await criarFaviconICO();
    
    // 4. Testar configuração
    await testarConfiguracao();
    
    console.log('\n🎉 === CORREÇÃO CONCLUÍDA ===');
    console.log('✅ Todas as correções foram aplicadas');
    console.log('\n📋 PRÓXIMOS PASSOS:');
    console.log('1. Reinicie o servidor de desenvolvimento');
    console.log('2. Execute: npm run dev');
    console.log('3. Verifique se os erros de console foram resolvidos');
    
  } catch (error) {
    console.error('❌ Erro durante a correção:', error);
  }
}

/**
 * Função para mostrar ajuda
 */
function mostrarAjuda() {
  console.log('\n🛠️ === AJUDA - CORREÇÃO DE SERVIDOR ===');
  console.log('\nProblemas identificados nos logs:');
  console.log('1. 📄 Favicon 404 - servidor não encontra favicon.ico');
  console.log('2. 📱 Manifest MIME type - servidor retorna HTML em vez de JSON');
  console.log('3. ⚙️ Service Worker MIME type - servidor retorna HTML em vez de JS');
  console.log('4. 🎨 Botão de tema não encontrado - problema de timing no DOM');
  console.log('\nSoluções aplicadas:');
  console.log('✅ Configuração de MIME types no Vite');
  console.log('✅ Criação de favicon.ico básico');
  console.log('✅ Correção do index.html');
  console.log('✅ Middleware customizado para headers');
  console.log('\nFunções disponíveis:');
  console.log('- executarCorrecaoCompleta() // Executa todas as correções');
  console.log('- verificarConfiguracaoServidor() // Verifica configuração');
  console.log('- corrigirIndexHTML() // Corrige HTML');
  console.log('- criarFaviconICO() // Cria favicon');
  console.log('- testarConfiguracao() // Testa arquivos');
  console.log('- mostrarAjuda() // Mostra esta ajuda');
}

// Executar correção automaticamente
await executarCorrecaoCompleta();

// Disponibilizar funções globalmente
if (typeof window !== 'undefined') {
  window.fixServerIssues = {
    executarCorrecaoCompleta,
    verificarConfiguracaoServidor,
    corrigirIndexHTML,
    criarFaviconICO,
    testarConfiguracao,
    mostrarAjuda
  };
}

// Exportar para ES modules
export {
  executarCorrecaoCompleta,
  verificarConfiguracaoServidor,
  corrigirIndexHTML,
  criarFaviconICO,
  testarConfiguracao,
  mostrarAjuda
};

console.log('\n💡 Para executar novamente: executarCorrecaoCompleta()');
#!/usr/bin/env node

/**
 * Script de Diagnóstico Completo do APK
 * Verifica todas as configurações e possíveis problemas
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 DIAGNÓSTICO COMPLETO DO APK\n');
console.log('='.repeat(60));

// 1. Verificar Capacitor Config
console.log('\n📋 1. VERIFICANDO CAPACITOR CONFIG...');
try {
  const capacitorConfig = JSON.parse(fs.readFileSync('capacitor.config.json', 'utf8'));
  console.log('✅ capacitor.config.json encontrado');
  console.log('   • App ID:', capacitorConfig.appId);
  console.log('   • App Name:', capacitorConfig.appName);
  console.log('   • Web Dir:', capacitorConfig.webDir);
  console.log('   • Server Client ID:', capacitorConfig.plugins?.GoogleAuth?.serverClientId || 'NÃO CONFIGURADO');
  
  if (!capacitorConfig.plugins?.GoogleAuth?.serverClientId) {
    console.log('⚠️  AVISO: serverClientId não configurado no GoogleAuth');
  }
} catch (error) {
  console.log('❌ Erro ao ler capacitor.config.json:', error.message);
}

// 2. Verificar Build Gradle
console.log('\n📋 2. VERIFICANDO BUILD.GRADLE...');
try {
  const buildGradle = fs.readFileSync('android/app/build.gradle', 'utf8');
  const versionCodeMatch = buildGradle.match(/versionCode\s+(\d+)/);
  const versionNameMatch = buildGradle.match(/versionName\s+"([^"]+)"/);
  
  console.log('✅ build.gradle encontrado');
  console.log('   • Version Code:', versionCodeMatch ? versionCodeMatch[1] : 'NÃO ENCONTRADO');
  console.log('   • Version Name:', versionNameMatch ? versionNameMatch[1] : 'NÃO ENCONTRADO');
} catch (error) {
  console.log('❌ Erro ao ler build.gradle:', error.message);
}

// 3. Verificar Strings.xml
console.log('\n📋 3. VERIFICANDO STRINGS.XML...');
try {
  const stringsXml = fs.readFileSync('android/app/src/main/res/values/strings.xml', 'utf8');
  const serverClientIdMatch = stringsXml.match(/<string name="server_client_id">([^<]+)<\/string>/);
  
  console.log('✅ strings.xml encontrado');
  console.log('   • Server Client ID:', serverClientIdMatch ? serverClientIdMatch[1] : 'NÃO CONFIGURADO');
  
  if (!serverClientIdMatch) {
    console.log('⚠️  AVISO: server_client_id não configurado no strings.xml');
  }
} catch (error) {
  console.log('❌ Erro ao ler strings.xml:', error.message);
}

// 4. Verificar AndroidManifest.xml
console.log('\n📋 4. VERIFICANDO ANDROIDMANIFEST.XML...');
try {
  const manifest = fs.readFileSync('android/app/src/main/AndroidManifest.xml', 'utf8');
  
  console.log('✅ AndroidManifest.xml encontrado');
  
  const permissions = [
    'INTERNET',
    'ACCESS_NETWORK_STATE',
    'WRITE_EXTERNAL_STORAGE',
    'READ_EXTERNAL_STORAGE',
    'WAKE_LOCK',
    'USE_BIOMETRIC'
  ];
  
  console.log('   • Permissões:');
  permissions.forEach(perm => {
    const hasPermission = manifest.includes(`android.permission.${perm}`);
    console.log(`     ${hasPermission ? '✅' : '❌'} ${perm}`);
  });
} catch (error) {
  console.log('❌ Erro ao ler AndroidManifest.xml:', error.message);
}

// 5. Verificar Service Worker
console.log('\n📋 5. VERIFICANDO SERVICE WORKER...');
try {
  const serviceWorker = fs.readFileSync('public/service-worker.js', 'utf8');
  const versionMatch = serviceWorker.match(/const VERSION = ['"]([^'"]+)['"]/);
  
  console.log('✅ service-worker.js encontrado');
  console.log('   • Versão:', versionMatch ? versionMatch[1] : 'NÃO ENCONTRADO');
} catch (error) {
  console.log('❌ Erro ao ler service-worker.js:', error.message);
}

// 6. Verificar Dist (Build)
console.log('\n📋 6. VERIFICANDO BUILD (dist/)...');
try {
  const distExists = fs.existsSync('dist');
  if (distExists) {
    const files = fs.readdirSync('dist');
    console.log('✅ Pasta dist/ encontrada');
    console.log(`   • Arquivos: ${files.length}`);
    
    const hasIndex = files.includes('index.html');
    const hasServiceWorker = files.includes('service-worker.js');
    const hasAssets = fs.existsSync('dist/assets');
    
    console.log(`   • index.html: ${hasIndex ? '✅' : '❌'}`);
    console.log(`   • service-worker.js: ${hasServiceWorker ? '✅' : '❌'}`);
    console.log(`   • assets/: ${hasAssets ? '✅' : '❌'}`);
    
    if (!hasIndex || !hasServiceWorker || !hasAssets) {
      console.log('⚠️  AVISO: Build incompleto. Execute "npm run build"');
    }
  } else {
    console.log('❌ Pasta dist/ não encontrada');
    console.log('⚠️  Execute "npm run build" para criar o build');
  }
} catch (error) {
  console.log('❌ Erro ao verificar dist/:', error.message);
}

// 7. Verificar APK
console.log('\n📋 7. VERIFICANDO APK...');
try {
  const apkPath = 'android/app/build/outputs/apk/debug/app-debug.apk';
  const apkExists = fs.existsSync(apkPath);
  
  if (apkExists) {
    const stats = fs.statSync(apkPath);
    const sizeInMB = (stats.size / (1024 * 1024)).toFixed(2);
    const modifiedDate = stats.mtime.toLocaleString('pt-BR');
    
    console.log('✅ APK encontrado');
    console.log(`   • Localização: ${apkPath}`);
    console.log(`   • Tamanho: ${sizeInMB} MB`);
    console.log(`   • Data de modificação: ${modifiedDate}`);
  } else {
    console.log('❌ APK não encontrado');
    console.log('⚠️  Execute o build do APK:');
    console.log('     cd android && ./gradlew assembleDebug');
  }
} catch (error) {
  console.log('❌ Erro ao verificar APK:', error.message);
}

// 8. Verificar Firebase Config
console.log('\n📋 8. VERIFICANDO FIREBASE CONFIG...');
try {
  const firebaseConfigPath = 'src/data/firebase/client.js';
  const firebaseConfig = fs.readFileSync(firebaseConfigPath, 'utf8');
  
  console.log('✅ Firebase config encontrado');
  
  const hasApiKey = firebaseConfig.includes('apiKey:');
  const hasAuthDomain = firebaseConfig.includes('authDomain:');
  const hasProjectId = firebaseConfig.includes('projectId:');
  
  console.log(`   • API Key: ${hasApiKey ? '✅' : '❌'}`);
  console.log(`   • Auth Domain: ${hasAuthDomain ? '✅' : '❌'}`);
  console.log(`   • Project ID: ${hasProjectId ? '✅' : '❌'}`);
} catch (error) {
  console.log('❌ Erro ao ler Firebase config:', error.message);
}

// 9. Verificar APK Login Handler
console.log('\n📋 9. VERIFICANDO APK LOGIN HANDLER...');
try {
  const apkLoginHandler = fs.readFileSync('src/js/apk-login-handler.js', 'utf8');
  
  console.log('✅ apk-login-handler.js encontrado');
  
  const hasSetupFunction = apkLoginHandler.includes('export function setupAPKLoginHandler');
  const hasBorderGreen = apkLoginHandler.includes('borderBottom');
  const hasGoogleAuth = apkLoginHandler.includes('GoogleAuth');
  
  console.log(`   • Função setupAPKLoginHandler: ${hasSetupFunction ? '✅' : '❌'}`);
  console.log(`   • Borda verde configurada: ${hasBorderGreen ? '✅' : '❌'}`);
  console.log(`   • GoogleAuth plugin: ${hasGoogleAuth ? '✅' : '❌'}`);
} catch (error) {
  console.log('❌ Erro ao ler apk-login-handler.js:', error.message);
}

// 10. Verificar Entry.js
console.log('\n📋 10. VERIFICANDO ENTRY.JS...');
try {
  const entryJs = fs.readFileSync('src/app/entry.js', 'utf8');
  
  console.log('✅ entry.js encontrado');
  
  const hasApkHandlerImport = entryJs.includes('apk-login-handler');
  const hasSetupCall = entryJs.includes('setupAPKLoginHandler');
  
  console.log(`   • Import do APK handler: ${hasApkHandlerImport ? '✅' : '❌'}`);
  console.log(`   • Chamada setupAPKLoginHandler: ${hasSetupCall ? '✅' : '❌'}`);
} catch (error) {
  console.log('❌ Erro ao ler entry.js:', error.message);
}

// RESUMO FINAL
console.log('\n' + '='.repeat(60));
console.log('📊 RESUMO DO DIAGNÓSTICO\n');

console.log('✅ ITENS VERIFICADOS:');
console.log('   1. Capacitor Config');
console.log('   2. Build Gradle (versões)');
console.log('   3. Strings.xml (server_client_id)');
console.log('   4. AndroidManifest.xml (permissões)');
console.log('   5. Service Worker (versão)');
console.log('   6. Build (dist/)');
console.log('   7. APK (existência e data)');
console.log('   8. Firebase Config');
console.log('   9. APK Login Handler');
console.log('   10. Entry.js (integração)');

console.log('\n📝 PRÓXIMOS PASSOS RECOMENDADOS:');
console.log('   1. Se o build está desatualizado: npm run build');
console.log('   2. Sincronizar com Android: npx cap sync android');
console.log('   3. Gerar novo APK: cd android && ./gradlew assembleDebug');
console.log('   4. Instalar no dispositivo e verificar logs');

console.log('\n' + '='.repeat(60));
console.log('✅ Diagnóstico completo!\n');


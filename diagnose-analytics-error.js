// Diagnóstico Final do Erro Analytics
// Execute este script no console para identificar a fonte exata do erro

console.log('🔍 Diagnóstico Final do Erro Analytics');
console.log('=====================================');

// 1. Verificar versão atual do arquivo
async function verificarVersaoArquivo() {
    console.log('\n1️⃣ Verificando versão do arquivo AnalyticsRoute.js...');
    
    try {
        const response = await fetch('./src/js/ui/AnalyticsRoute.js?v=' + Date.now());
        const content = await response.text();
        
        // Verificar se contém a versão ultra robusta
        if (content.includes('versão ultra robusta')) {
            console.log('✅ Arquivo contém versão ultra robusta');
        } else if (content.includes('versão simplificada')) {
            console.log('⚠️ Arquivo contém versão simplificada');
        } else {
            console.log('❌ Arquivo contém versão desconhecida');
        }
        
        // Verificar linha 112
        const lines = content.split('\n');
        if (lines.length >= 112) {
            console.log(`📝 Linha 112: "${lines[111]}"`);
        } else {
            console.log(`📝 Arquivo tem apenas ${lines.length} linhas`);
        }
        
        // Procurar por "Container analytics-content não encontrado"
        const errorLineIndex = lines.findIndex(line => 
            line.includes('Container analytics-content não encontrado')
        );
        
        if (errorLineIndex >= 0) {
            console.log(`🎯 Erro encontrado na linha ${errorLineIndex + 1}: "${lines[errorLineIndex]}"`);
        } else {
            console.log('❓ Erro não encontrado no arquivo atual');
        }
        
    } catch (error) {
        console.error('❌ Erro ao verificar arquivo:', error);
    }
}

// 2. Verificar função atual em memória
function verificarFuncaoMemoria() {
    console.log('\n2️⃣ Verificando função em memória...');
    
    if (window.renderAnalytics) {
        console.log('✅ Função renderAnalytics existe');
        console.log('📝 Código da função:');
        console.log(window.renderAnalytics.toString().substring(0, 500) + '...');
        
        // Verificar se é a versão correta
        const funcStr = window.renderAnalytics.toString();
        if (funcStr.includes('versão ultra robusta')) {
            console.log('✅ Função em memória é versão ultra robusta');
        } else if (funcStr.includes('versão simplificada')) {
            console.log('⚠️ Função em memória é versão simplificada');
        } else {
            console.log('❌ Função em memória é versão desconhecida');
        }
    } else {
        console.log('❌ Função renderAnalytics não existe');
    }
}

// 3. Verificar stack trace do erro
function configurarCapturaErro() {
    console.log('\n3️⃣ Configurando captura de erro...');
    
    // Interceptar erros
    const originalError = window.Error;
    window.Error = function(message) {
        const error = new originalError(message);
        
        if (message && message.includes('analytics-content não encontrado')) {
            console.log('🎯 ERRO CAPTURADO!');
            console.log('📝 Mensagem:', message);
            console.log('📍 Stack trace:', error.stack);
            
            // Analisar stack trace
            const stackLines = error.stack.split('\n');
            stackLines.forEach((line, index) => {
                if (line.includes('AnalyticsRoute.js')) {
                    console.log(`🔍 Linha relevante ${index}: ${line}`);
                }
            });
        }
        
        return error;
    };
    
    console.log('✅ Captura de erro configurada');
}

// 4. Testar navegação com diagnóstico
async function testarComDiagnostico() {
    console.log('\n4️⃣ Testando navegação com diagnóstico...');
    
    try {
        // Verificar estado antes
        console.log('📊 Estado antes:');
        console.log('  - URL:', window.location.hash);
        console.log('  - app-content:', !!document.getElementById('app-content'));
        console.log('  - analytics-content:', !!document.getElementById('analytics-content'));
        
        // Navegar
        console.log('🧭 Navegando para analytics...');
        window.location.hash = '#analytics';
        
        // Aguardar e verificar
        await new Promise(resolve => setTimeout(resolve, 3000));
        
        console.log('📊 Estado depois:');
        console.log('  - URL:', window.location.hash);
        console.log('  - app-content:', !!document.getElementById('app-content'));
        console.log('  - analytics-content:', !!document.getElementById('analytics-content'));
        
        const analyticsContent = document.getElementById('analytics-content');
        if (analyticsContent) {
            console.log('✅ analytics-content criado com sucesso!');
            console.log('📝 Conteúdo:', analyticsContent.innerHTML.substring(0, 200) + '...');
        } else {
            console.log('❌ analytics-content não foi criado');
            
            // Verificar se há erro no console
            console.log('🔍 Verificando erros no console...');
        }
        
    } catch (error) {
        console.error('❌ Erro durante teste:', error);
    }
}

// 5. Verificar cache do navegador
function verificarCache() {
    console.log('\n5️⃣ Verificando cache...');
    
    // Verificar service worker
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.getRegistrations().then(registrations => {
            console.log(`📦 Service Workers: ${registrations.length}`);
            registrations.forEach((registration, index) => {
                console.log(`  ${index + 1}. ${registration.scope}`);
            });
        });
    }
    
    // Verificar cache do módulo
    if (window.moduleCache) {
        console.log('📦 Module cache:', Object.keys(window.moduleCache));
    }
    
    // Verificar localStorage
    const analyticsKeys = Object.keys(localStorage).filter(key => 
        key.includes('analytics') || key.includes('chart')
    );
    console.log('💾 LocalStorage analytics keys:', analyticsKeys);
}

// Executar diagnóstico completo
async function executarDiagnostico() {
    console.log('🚀 Executando diagnóstico completo...');
    
    configurarCapturaErro();
    await verificarVersaoArquivo();
    verificarFuncaoMemoria();
    verificarCache();
    await testarComDiagnostico();
    
    console.log('\n✅ Diagnóstico concluído!');
    console.log('📝 Se o erro persistir, verifique:');
    console.log('  1. Se há versões antigas em cache');
    console.log('  2. Se o service worker está interferindo');
    console.log('  3. Se há outros scripts modificando o DOM');
}

// Executar
executarDiagnostico().catch(error => {
    console.error('💥 Erro durante diagnóstico:', error);
});

// Exportar para uso manual
window.diagnoseAnalytics = executarDiagnostico;
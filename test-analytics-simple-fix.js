// Script de Teste - Correção Simplificada do Analytics
// Execute este script no console para testar a correção

console.log('🧪 Testando correção simplificada do Analytics...');

// Função para verificar estado
function verificarEstado() {
    const estado = {
        url: window.location.hash,
        usuario: window.appState?.currentUser?.uid || null,
        orcamento: window.appState?.currentBudget?.id || null,
        appContent: !!document.getElementById('app-content'),
        analyticsContent: !!document.getElementById('analytics-content'),
        evolucaoChart: !!document.getElementById('evolucao-chart'),
        categoriasChart: !!document.getElementById('categorias-chart')
    };
    
    console.log('📊 Estado atual:', estado);
    return estado;
}

// Função para testar navegação
async function testarNavegacao() {
    console.log('🧭 Testando navegação para analytics...');
    
    // Verificar estado inicial
    const estadoInicial = verificarEstado();
    
    // Navegar para analytics
    window.location.hash = '#analytics';
    
    // Aguardar renderização
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Verificar estado final
    const estadoFinal = verificarEstado();
    
    console.log('📊 Comparação:');
    console.log('  Inicial:', estadoInicial);
    console.log('  Final:', estadoFinal);
    
    // Verificar se analytics-content foi criado
    if (estadoFinal.analyticsContent) {
        console.log('✅ analytics-content criado com sucesso!');
        
        // Verificar se há conteúdo
        const analyticsContent = document.getElementById('analytics-content');
        const temConteudo = analyticsContent.innerHTML.trim().length > 0;
        console.log('📄 Tem conteúdo:', temConteudo);
        
        if (temConteudo) {
            // Verificar se há gráficos
            setTimeout(() => {
                const estadoGraficos = verificarEstado();
                if (estadoGraficos.evolucaoChart && estadoGraficos.categoriasChart) {
                    console.log('🎉 SUCESSO TOTAL: Gráficos renderizados!');
                } else {
                    console.log('⚠️ PARCIAL: Container criado mas gráficos não encontrados');
                }
            }, 3000);
        }
        
        return true;
    } else {
        console.log('❌ FALHA: analytics-content não foi criado');
        return false;
    }
}

// Função para forçar teste se necessário
async function forcarTeste() {
    console.log('🔧 Forçando teste direto...');
    
    try {
        // Chamar função diretamente se disponível
        if (window.renderAnalytics) {
            await window.renderAnalytics();
            console.log('✅ renderAnalytics executado diretamente');
            
            // Verificar resultado
            setTimeout(() => {
                const estado = verificarEstado();
                if (estado.analyticsContent) {
                    console.log('✅ Container criado via chamada direta');
                } else {
                    console.log('❌ Container não criado via chamada direta');
                }
            }, 1000);
        } else {
            console.log('❌ Função renderAnalytics não encontrada');
        }
    } catch (error) {
        console.error('❌ Erro ao forçar teste:', error);
    }
}

// Função principal de teste
async function executarTeste() {
    console.log('🚀 Executando teste completo...');
    
    // 1. Verificar estado inicial
    console.log('\n1️⃣ Estado inicial:');
    verificarEstado();
    
    // 2. Testar navegação
    console.log('\n2️⃣ Testando navegação:');
    const sucessoNavegacao = await testarNavegacao();
    
    // 3. Se navegação falhou, tentar força
    if (!sucessoNavegacao) {
        console.log('\n3️⃣ Navegação falhou, tentando força:');
        await forcarTeste();
    }
    
    // 4. Resultado final
    console.log('\n4️⃣ Resultado final:');
    const estadoFinal = verificarEstado();
    
    if (estadoFinal.analyticsContent) {
        console.log('🎉 TESTE PASSOU: analytics-content criado!');
        
        // Verificar se há erros no console
        console.log('📝 Verifique se não há erros no console relacionados aos gráficos');
        console.log('📝 Se houver erros de "evolucao-chart não encontrado", aguarde alguns segundos');
        
    } else {
        console.log('❌ TESTE FALHOU: analytics-content não criado');
        console.log('🔧 Possíveis soluções:');
        console.log('  1. Verificar se o usuário está logado');
        console.log('  2. Verificar se há orçamentos disponíveis');
        console.log('  3. Recarregar a página e tentar novamente');
    }
}

// Executar teste
executarTeste().catch(error => {
    console.error('💥 Erro durante teste:', error);
});
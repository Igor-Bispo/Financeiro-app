// Script para testar a correção do problema de timing dos gráficos
console.log('🔍 Testando correção do timing dos gráficos...');

// Função para verificar se os elementos existem
function verificarElementos() {
    const evolucaoChart = document.getElementById('evolucao-chart');
    const categoriasChart = document.getElementById('categorias-chart');
    
    console.log('📊 Verificando elementos dos gráficos:');
    console.log('- evolucao-chart:', evolucaoChart ? '✅ Encontrado' : '❌ Não encontrado');
    console.log('- categorias-chart:', categoriasChart ? '✅ Encontrado' : '❌ Não encontrado');
    
    if (evolucaoChart) {
        console.log('📊 Conteúdo do evolucao-chart:', evolucaoChart.innerHTML.length > 0 ? 'Tem conteúdo' : 'Vazio');
    }
    
    if (categoriasChart) {
        console.log('📊 Conteúdo do categorias-chart:', categoriasChart.innerHTML.length > 0 ? 'Tem conteúdo' : 'Vazio');
    }
    
    return {
        evolucaoChart: !!evolucaoChart,
        categoriasChart: !!categoriasChart,
        evolucaoComConteudo: evolucaoChart && evolucaoChart.innerHTML.length > 0,
        categoriasComConteudo: categoriasChart && categoriasChart.innerHTML.length > 0
    };
}

// Verificar estado atual
console.log('🔍 Estado atual da página:');
console.log('- URL atual:', window.location.hash);
console.log('- Usuário autenticado:', !!window.appState?.currentUser);
console.log('- Orçamento selecionado:', !!window.appState?.currentBudget);

// Verificar elementos imediatamente
const estadoInicial = verificarElementos();

// Se não estiver na página de analytics, navegar para lá
if (window.location.hash !== '#/analytics') {
    console.log('🔄 Navegando para a página de analytics...');
    window.location.hash = '#/analytics';
    
    // Aguardar a página carregar e verificar novamente
    setTimeout(() => {
        console.log('🔍 Verificando após navegação...');
        const estadoAposNavegacao = verificarElementos();
        
        // Aguardar mais um pouco para os gráficos renderizarem
        setTimeout(() => {
            console.log('🔍 Verificação final após renderização...');
            const estadoFinal = verificarElementos();
            
            console.log('📊 Resumo do teste:');
            console.log('- Inicial:', estadoInicial);
            console.log('- Após navegação:', estadoAposNavegacao);
            console.log('- Final:', estadoFinal);
            
            if (estadoFinal.evolucaoChart && estadoFinal.categoriasChart) {
                console.log('✅ Elementos dos gráficos encontrados!');
                
                if (estadoFinal.evolucaoComConteudo && estadoFinal.categoriasComConteudo) {
                    console.log('🎉 Gráficos renderizados com sucesso!');
                } else {
                    console.log('⚠️ Elementos encontrados mas sem conteúdo');
                }
            } else {
                console.log('❌ Problema persiste - elementos não encontrados');
            }
        }, 2000);
    }, 1000);
} else {
    // Já está na página, aguardar renderização
    setTimeout(() => {
        console.log('🔍 Verificação após aguardar renderização...');
        const estadoFinal = verificarElementos();
        
        console.log('📊 Resultado do teste:');
        if (estadoFinal.evolucaoChart && estadoFinal.categoriasChart) {
            console.log('✅ Elementos dos gráficos encontrados!');
            
            if (estadoFinal.evolucaoComConteudo && estadoFinal.categoriasComConteudo) {
                console.log('🎉 Gráficos renderizados com sucesso!');
            } else {
                console.log('⚠️ Elementos encontrados mas sem conteúdo');
            }
        } else {
            console.log('❌ Problema persiste - elementos não encontrados');
        }
    }, 1000);
}
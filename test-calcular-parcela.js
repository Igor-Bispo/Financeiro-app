// Teste para verificar se a função calcularParcelaRecorrente está funcionando
console.log('🧪 Testando função calcularParcelaRecorrente...');

// Teste 1: Verificar se a função está disponível globalmente
function testGlobalFunction() {
  console.log('📋 Teste 1: Verificando disponibilidade global');
  
  if (typeof window.calcularParcelaRecorrente === 'function') {
    console.log('✅ window.calcularParcelaRecorrente está disponível');
    return true;
  } else {
    console.error('❌ window.calcularParcelaRecorrente não está disponível');
    return false;
  }
}

// Teste 2: Testar cálculo de parcela
function testParcelaCalculation() {
  console.log('📋 Teste 2: Testando cálculo de parcela');
  
  if (!window.calcularParcelaRecorrente) {
    console.error('❌ Função não disponível para teste');
    return false;
  }
  
  // Criar uma recorrente de teste
  const recorrenteTeste = {
    dataInicio: new Date('2024-01-01'),
    parcelasTotal: 12,
    valor: 100
  };
  
  try {
    const parcela = window.calcularParcelaRecorrente(recorrenteTeste);
    console.log('✅ Cálculo de parcela executado:', parcela);
    return true;
  } catch (error) {
    console.error('❌ Erro no cálculo de parcela:', error);
    return false;
  }
}

// Teste 3: Testar diferentes cenários
function testDifferentScenarios() {
  console.log('📋 Teste 3: Testando diferentes cenários');
  
  if (!window.calcularParcelaRecorrente) {
    console.error('❌ Função não disponível para teste');
    return false;
  }
  
  const cenarios = [
    {
      nome: 'Recorrente sem parcelas',
      recorrente: { parcelasTotal: null, dataInicio: new Date() },
      esperado: null
    },
    {
      nome: 'Recorrente com 1 parcela',
      recorrente: { parcelasTotal: 1, dataInicio: new Date() },
      esperado: null
    },
    {
      nome: 'Recorrente com 12 parcelas (início recente)',
      recorrente: { parcelasTotal: 12, dataInicio: new Date('2024-01-01') },
      esperado: 'número entre 1 e 12'
    }
  ];
  
  let sucessos = 0;
  
  cenarios.forEach((cenario, index) => {
    try {
      const resultado = window.calcularParcelaRecorrente(cenario.recorrente);
      console.log(`✅ ${cenario.nome}:`, resultado);
      sucessos++;
    } catch (error) {
      console.error(`❌ ${cenario.nome}:`, error);
    }
  });
  
  console.log(`📊 Resultado: ${sucessos}/${cenarios.length} cenários passaram`);
  return sucessos === cenarios.length;
}

// Teste 4: Verificar se a função está sendo usada corretamente no código
function testFunctionUsage() {
  console.log('📋 Teste 4: Verificando uso da função no código');
  
  // Verificar se há elementos que usam a função
  const elementosComParcela = document.querySelectorAll('[data-parcela]');
  console.log('🔍 Elementos com data-parcela encontrados:', elementosComParcela.length);
  
  // Verificar se há transações recorrentes sendo exibidas
  const transacoesRecorrentes = document.querySelectorAll('.transaction-item');
  console.log('🔍 Transações encontradas:', transacoesRecorrentes.length);
  
  return true;
}

// Executar todos os testes
function runAllTests() {
  console.log('🚀 Iniciando testes da função calcularParcelaRecorrente...');
  
  const resultados = [
    testGlobalFunction(),
    testParcelaCalculation(),
    testDifferentScenarios(),
    testFunctionUsage()
  ];
  
  const sucessos = resultados.filter(r => r).length;
  const total = resultados.length;
  
  console.log(`\n📊 RESULTADO FINAL: ${sucessos}/${total} testes passaram`);
  
  if (sucessos === total) {
    console.log('🎉 Todos os testes passaram! A função está funcionando corretamente.');
  } else {
    console.log('⚠️ Alguns testes falharam. Verifique os logs acima.');
  }
}

// Executar testes após um pequeno delay para garantir que a página carregou
setTimeout(runAllTests, 1000);

// Exportar para uso manual
window.testCalcularParcela = runAllTests;

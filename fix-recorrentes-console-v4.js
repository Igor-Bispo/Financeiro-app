// ============================================================
// 🔧 Script de Correção de Recorrentes Pós-Backup (Versão 4)
// ============================================================
// Este script funciona diretamente no console do navegador
// sem depender de importações dinâmicas

console.log('🔧 Script de Correção de Recorrentes Pós-Backup (V4)');
console.log('============================================================');

// Função para aguardar o app estar carregado
async function aguardarAppV4(maxTentativas = 15) {
  for (let i = 0; i < maxTentativas; i++) {
    try {
      // Verificar múltiplas condições de carregamento
      const condicoes = [
        // App state carregado
        window.appState && window.appState.user,
        // Elementos da página carregados
        document.querySelector('.dashboard') || document.querySelector('#app') || document.querySelector('main'),
        // Pelo menos uma função global disponível
        typeof window.loadUserData === 'function' || typeof window.addCategory === 'function'
      ];
      
      const carregado = condicoes.some(condicao => condicao);
      
      if (carregado) {
        console.log('✅ App detectado como carregado!');
        return true;
      }
      
      console.log(`⏳ Aguardando app carregar... (tentativa ${i + 1}/${maxTentativas})`);
    } catch (error) {
      console.log(`⏳ Tentativa ${i + 1}/${maxTentativas} - ${error.message}`);
    }
    await new Promise(resolve => setTimeout(resolve, 2000)); // Aguardar 2 segundos
  }
  return false;
}

// Função para obter dados usando fetch direto
async function obterDadosFirestore() {
  try {
    // Tentar acessar dados através do estado do app primeiro (mesmo sem usuário logado)
    if (window.appState && (window.appState.recorrentes || window.appState.categories)) {
      return {
        recorrentes: window.appState.recorrentes || [],
        categories: window.appState.categories || [],
        fonte: 'appState'
      };
    }
    
    // Se não tiver dados no estado, tentar outras abordagens
    console.log('⚠️ Dados não encontrados no appState, tentando outras abordagens...');
    
    // Verificar se há dados em localStorage
    const localData = localStorage.getItem('financeiro-app-data');
    if (localData) {
      const parsed = JSON.parse(localData);
      return {
        recorrentes: parsed.recorrentes || [],
        categories: parsed.categories || [],
        fonte: 'localStorage'
      };
    }
    
    return {
      recorrentes: [],
      categories: [],
      fonte: 'vazio'
    };
    
  } catch (error) {
    console.error('❌ Erro ao obter dados:', error);
    return {
      recorrentes: [],
      categories: [],
      fonte: 'erro'
    };
  }
}

// Função para diagnosticar recorrentes órfãs (V4)
async function diagnosticarRecorrentesOrfasV4() {
  try {
    console.log('🔍 Diagnosticando recorrentes órfãs (V4)...');
    
    const dados = await obterDadosFirestore();
    console.log(`📊 Dados obtidos de: ${dados.fonte}`);
    
    const { recorrentes, categories } = dados;
    
    console.log(`📊 Total de recorrentes encontradas: ${recorrentes.length}`);
    console.log(`📊 Total de categorias encontradas: ${categories.length}`);
    
    if (recorrentes.length === 0) {
      console.log('⚠️ Nenhuma recorrente encontrada.');
      console.log('💡 Certifique-se de que:');
      console.log('  1. Você está logado no app');
      console.log('  2. O app carregou completamente');
      console.log('  3. Há dados na tela (dashboard visível)');
      return {
        totalRecorrentes: 0,
        totalCategorias: categories.length,
        recorrentesOrfas: 0,
        detalhes: [],
        categoriasPorNome: new Map()
      };
    }
    
    // Criar mapa de categorias
    const categoriasMap = new Map();
    const categoriasPorNome = new Map();
    
    categories.forEach(categoria => {
      categoriasMap.set(categoria.id, categoria);
      categoriasPorNome.set(categoria.nome?.toLowerCase(), categoria);
    });
    
    // Identificar recorrentes órfãs
    const recorrentesOrfas = [];
    
    recorrentes.forEach(recorrente => {
      if (recorrente.categoriaId && !categoriasMap.has(recorrente.categoriaId)) {
        recorrentesOrfas.push(recorrente);
      }
    });
    
    console.log(`🚨 Recorrentes órfãs encontradas: ${recorrentesOrfas.length}`);
    
    if (recorrentesOrfas.length > 0) {
      console.log('\n📋 Lista de recorrentes órfãs:');
      recorrentesOrfas.forEach((recorrente, index) => {
        console.log(`${index + 1}. ${recorrente.descricao || 'Sem descrição'} - Categoria ID: ${recorrente.categoriaId}`);
      });
    }
    
    return {
      totalRecorrentes: recorrentes.length,
      totalCategorias: categories.length,
      recorrentesOrfas: recorrentesOrfas.length,
      detalhes: recorrentesOrfas,
      categoriasPorNome,
      dados
    };
    
  } catch (error) {
    console.error('❌ Erro ao diagnosticar recorrentes:', error);
    throw error;
  }
}

// Mapeamento inteligente de categorias (V4)
function mapearCategoriaV4(descricao, categoriasPorNome) {
  if (!descricao) return null;
  
  const descricaoLower = descricao.toLowerCase();
  
  // Mapeamento por palavras-chave específicas
  const mapeamentos = {
    'presente': 'outros',
    'sogra': 'outros',
    'undefined': null,
    'alimentação': 'alimentação',
    'comida': 'alimentação',
    'mercado': 'alimentação',
    'supermercado': 'alimentação',
    'transporte': 'transporte',
    'uber': 'transporte',
    'gasolina': 'transporte',
    'combustível': 'transporte',
    'saúde': 'saúde',
    'médico': 'saúde',
    'farmácia': 'saúde',
    'remédio': 'saúde',
    'lazer': 'lazer',
    'cinema': 'lazer',
    'diversão': 'lazer',
    'casa': 'casa',
    'moradia': 'casa',
    'aluguel': 'casa',
    'conta': 'contas',
    'luz': 'contas',
    'água': 'contas',
    'internet': 'contas'
  };
  
  // Buscar por palavras-chave na descrição
  for (const [palavra, categoria] of Object.entries(mapeamentos)) {
    if (descricaoLower.includes(palavra)) {
      if (categoria && categoriasPorNome.has(categoria)) {
        return categoriasPorNome.get(categoria);
      }
    }
  }
  
  // Fallback: usar primeira categoria disponível
  const categoriasDisponiveis = Array.from(categoriasPorNome.values());
  if (categoriasDisponiveis.length > 0) {
    console.log(`⚠️ Usando categoria padrão para "${descricao}": ${categoriasDisponiveis[0].nome}`);
    return categoriasDisponiveis[0];
  }
  
  return null;
}

// Função para corrigir recorrentes órfãs (V4)
async function corrigirRecorrentesOrfasV4() {
  try {
    console.log('🔧 Iniciando correção de recorrentes órfãs (V4)...');
    
    // Primeiro, diagnosticar
    const diagnostico = await diagnosticarRecorrentesOrfasV4();
    
    if (diagnostico.recorrentesOrfas === 0) {
      console.log('✅ Nenhuma recorrente órfã encontrada!');
      return;
    }
    
    console.log(`\n🔧 Preparando correção de ${diagnostico.recorrentesOrfas} recorrentes órfãs...`);
    
    // Confirmar com o usuário
    const confirmar = confirm(`Deseja corrigir ${diagnostico.recorrentesOrfas} recorrentes órfãs?\n\nEsta ação irá:\n- Mapear recorrentes para categorias existentes baseado em palavras-chave\n- Usar categorias padrão como fallback\n- Atualizar os registros localmente\n\nContinuar?`);
    
    if (!confirmar) {
      console.log('❌ Correção cancelada pelo usuário.');
      return;
    }
    
    console.log('🚀 Iniciando correção...');
    
    let corrigidas = 0;
    let erros = 0;
    
    for (const recorrente of diagnostico.detalhes) {
      try {
        const novaCategoria = mapearCategoriaV4(recorrente.descricao, diagnostico.categoriasPorNome);
        
        if (novaCategoria) {
          // Atualizar no estado do app se disponível
          if (window.appState && window.appState.recorrentes) {
            const recorrenteIndex = window.appState.recorrentes.findIndex(r => r.id === recorrente.id);
            if (recorrenteIndex !== -1) {
              window.appState.recorrentes[recorrenteIndex].categoriaId = novaCategoria.id;
            }
          }
          
          // Atualizar no localStorage se disponível
          try {
            const localData = localStorage.getItem('financeiro-app-data');
            if (localData) {
              const parsed = JSON.parse(localData);
              if (parsed.recorrentes) {
                const recorrenteIndex = parsed.recorrentes.findIndex(r => r.id === recorrente.id);
                if (recorrenteIndex !== -1) {
                  parsed.recorrentes[recorrenteIndex].categoriaId = novaCategoria.id;
                  localStorage.setItem('financeiro-app-data', JSON.stringify(parsed));
                }
              }
            }
          } catch (localError) {
            console.warn('⚠️ Erro ao atualizar localStorage:', localError);
          }
          
          console.log(`✅ Corrigida: "${recorrente.descricao}" → ${novaCategoria.nome}`);
          corrigidas++;
        } else {
          console.log(`⚠️ Não foi possível mapear: "${recorrente.descricao}"`);
        }
      } catch (error) {
        console.error(`❌ Erro ao corrigir "${recorrente.descricao}":`, error);
        erros++;
      }
    }
    
    console.log('\n📊 Resultado da correção:');
    console.log(`✅ Recorrentes corrigidas: ${corrigidas}`);
    console.log(`❌ Erros: ${erros}`);
    console.log(`⚠️ Não mapeadas: ${diagnostico.recorrentesOrfas - corrigidas - erros}`);
    
    if (corrigidas > 0) {
      console.log('\n🔄 Recomendação: Recarregue a página para ver as mudanças.');
      console.log('💡 Nota: Esta versão fez correções locais (estado do app + localStorage).');
    }
    
  } catch (error) {
    console.error('❌ Erro ao corrigir recorrentes:', error);
    throw error;
  }
}

// Função de diagnóstico completo
function debugCompleto() {
  console.log('🔍 Debug Completo do App:');
  console.log('\n📱 Estado do App:');
  console.log('- window.appState:', !!window.appState);
  console.log('- window.appState.user:', !!window.appState?.user);
  console.log('- window.appState.recorrentes:', window.appState?.recorrentes?.length || 0);
  console.log('- window.appState.categories:', window.appState?.categories?.length || 0);
  
  console.log('\n🔧 Funções Globais:');
  console.log('- window.loadUserData:', typeof window.loadUserData);
  console.log('- window.addCategory:', typeof window.addCategory);
  console.log('- window.updateRecorrente:', typeof window.updateRecorrente);
  
  console.log('\n🔥 Firebase:');
  console.log('- window.firebase:', typeof window.firebase);
  console.log('- window.db:', typeof window.db);
  console.log('- window.FirebaseDB:', typeof window.FirebaseDB);
  console.log('- window.auth:', typeof window.auth);
  
  console.log('\n🌐 Página:');
  const hasElements = document.querySelector('.dashboard') || document.querySelector('#app') || document.querySelector('main');
  console.log('- Elementos carregados:', !!hasElements);
  console.log('- URL atual:', window.location.href);
  
  console.log('\n💾 LocalStorage:');
  const localData = localStorage.getItem('financeiro-app-data');
  console.log('- Dados locais:', !!localData);
  if (localData) {
    try {
      const parsed = JSON.parse(localData);
      console.log('- Recorrentes no localStorage:', parsed.recorrentes?.length || 0);
      console.log('- Categorias no localStorage:', parsed.categories?.length || 0);
    } catch (e) {
      console.log('- Erro ao parsear dados locais:', e.message);
    }
  }
  
  if (window.appState?.user) {
    console.log('\n👤 Usuário:', window.appState.user.email || 'Email não disponível');
  } else {
    console.log('\n❌ Usuário não logado');
  }
}

// Inicialização automática
(async () => {
  console.log('🔍 Verificando disponibilidade do App (V4)...');
  
  const appDisponivel = await aguardarAppV4();
  
  if (appDisponivel) {
    console.log('\n💡 Funções disponíveis (V4):');
    console.log('- debugCompleto(): Para diagnóstico completo do app');
    console.log('- diagnosticarRecorrentesOrfasV4(): Para apenas diagnosticar');
    console.log('- corrigirRecorrentesOrfasV4(): Para corrigir as recorrentes órfãs');
    console.log('\n🚀 Execute debugCompleto() primeiro para verificar os dados!');
  } else {
    console.log('\n❌ App não carregado após 15 tentativas (V4).');
    console.log('💡 Soluções:');
    console.log('1. Certifique-se de estar logado no app');
    console.log('2. Aguarde o app carregar completamente');
    console.log('3. Recarregue a página e tente novamente');
    console.log('4. Execute debugCompleto() para verificar o que está disponível');
  }
})();

console.log('\n📝 Script V4 carregado! Aguarde a verificação do App...');
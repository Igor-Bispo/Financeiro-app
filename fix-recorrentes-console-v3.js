// ============================================================
// 🔧 Script de Correção de Recorrentes Pós-Backup (Versão 3)
// ============================================================
// Este script corrige recorrências órfãs após restauração de backup
// Versão que usa as funções globais já expostas pelo app

console.log('🔧 Script de Correção de Recorrentes Pós-Backup (V3)');
console.log('============================================================');

// Função para aguardar Firebase estar disponível via funções globais
async function aguardarFirebaseV3(maxTentativas = 10) {
  for (let i = 0; i < maxTentativas; i++) {
    try {
      // Verificar se as funções globais do app estão disponíveis
      if (typeof window.loadUserData === 'function' && 
          typeof window.addCategory === 'function' &&
          window.appState && 
          window.appState.user) {
        
        console.log('✅ App carregado e usuário logado!');
        
        // Tentar acessar Firebase através das funções existentes
        window.firebaseV3 = {
          ready: true,
          user: window.appState.user
        };
        return true;
      }
      
      console.log(`⏳ Aguardando app carregar... (tentativa ${i + 1}/${maxTentativas})`);
    } catch (error) {
      console.log(`⏳ Tentativa ${i + 1}/${maxTentativas} - ${error.message}`);
    }
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  return false;
}

// Função para diagnosticar recorrentes órfãs usando fetch direto
async function diagnosticarRecorrentesOrfasV3() {
  try {
    console.log('🔍 Diagnosticando recorrentes órfãs (V3)...');
    
    if (!window.firebaseV3 || !window.firebaseV3.ready) {
      throw new Error('App não inicializado. Execute aguardarFirebaseV3() primeiro.');
    }
    
    // Usar as funções globais existentes para acessar dados
    console.log('📊 Verificando dados do app...');
    
    // Verificar se há dados carregados no appState
    const recorrentes = window.appState?.recorrentes || [];
    const categorias = window.appState?.categories || [];
    
    console.log(`📊 Total de recorrentes encontradas: ${recorrentes.length}`);
    console.log(`📊 Total de categorias encontradas: ${categorias.length}`);
    
    if (recorrentes.length === 0) {
      console.log('⚠️ Nenhuma recorrente encontrada no estado do app.');
      console.log('💡 Tente recarregar a página e aguardar o app carregar completamente.');
      return {
        totalRecorrentes: 0,
        totalCategorias: categorias.length,
        recorrentesOrfas: 0,
        detalhes: [],
        categoriasPorNome: new Map()
      };
    }
    
    // Criar mapa de categorias
    const categoriasMap = new Map();
    const categoriasPorNome = new Map();
    
    categorias.forEach(categoria => {
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
      totalCategorias: categorias.length,
      recorrentesOrfas: recorrentesOrfas.length,
      detalhes: recorrentesOrfas,
      categoriasPorNome
    };
    
  } catch (error) {
    console.error('❌ Erro ao diagnosticar recorrentes:', error);
    throw error;
  }
}

// Mapeamento inteligente de categorias por palavras-chave (V3)
function mapearCategoriaV3(descricao, categoriasPorNome) {
  if (!descricao) return null;
  
  const descricaoLower = descricao.toLowerCase();
  
  // Mapeamento por palavras-chave específicas
  const mapeamentos = {
    'presente': 'outros',
    'sogra': 'outros',
    'undefined': null, // Será tratado como fallback
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

// Função para corrigir recorrentes órfãs usando funções globais
async function corrigirRecorrentesOrfasV3() {
  try {
    console.log('🔧 Iniciando correção de recorrentes órfãs (V3)...');
    
    // Primeiro, diagnosticar
    const diagnostico = await diagnosticarRecorrentesOrfasV3();
    
    if (diagnostico.recorrentesOrfas === 0) {
      console.log('✅ Nenhuma recorrente órfã encontrada!');
      return;
    }
    
    console.log(`\n🔧 Preparando correção de ${diagnostico.recorrentesOrfas} recorrentes órfãs...`);
    
    // Confirmar com o usuário
    const confirmar = confirm(`Deseja corrigir ${diagnostico.recorrentesOrfas} recorrentes órfãs?\n\nEsta ação irá:\n- Mapear recorrentes para categorias existentes baseado em palavras-chave\n- Usar categorias padrão como fallback\n- Atualizar os registros usando as funções do app\n\nContinuar?`);
    
    if (!confirmar) {
      console.log('❌ Correção cancelada pelo usuário.');
      return;
    }
    
    console.log('🚀 Iniciando correção...');
    
    let corrigidas = 0;
    let erros = 0;
    
    for (const recorrente of diagnostico.detalhes) {
      try {
        const novaCategoria = mapearCategoriaV3(recorrente.descricao, diagnostico.categoriasPorNome);
        
        if (novaCategoria) {
          // Tentar usar função global para atualizar
          if (typeof window.updateRecorrente === 'function') {
            await window.updateRecorrente(recorrente.id, {
              ...recorrente,
              categoriaId: novaCategoria.id
            });
          } else {
            // Fallback: atualizar diretamente no estado
            const recorrenteIndex = window.appState.recorrentes.findIndex(r => r.id === recorrente.id);
            if (recorrenteIndex !== -1) {
              window.appState.recorrentes[recorrenteIndex].categoriaId = novaCategoria.id;
            }
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
      console.log('💡 Nota: Esta versão pode ter feito apenas correções locais.');
      console.log('   Para persistir no banco, use as versões V1 ou V2 quando funcionarem.');
    }
    
  } catch (error) {
    console.error('❌ Erro ao corrigir recorrentes:', error);
    throw error;
  }
}

// Função de diagnóstico simples para debug
function debugAppState() {
  console.log('🔍 Debug do Estado do App:');
  console.log('- window.appState:', !!window.appState);
  console.log('- window.appState.user:', !!window.appState?.user);
  console.log('- window.appState.recorrentes:', window.appState?.recorrentes?.length || 0);
  console.log('- window.appState.categories:', window.appState?.categories?.length || 0);
  console.log('- window.loadUserData:', typeof window.loadUserData);
  console.log('- window.addCategory:', typeof window.addCategory);
  console.log('- window.updateRecorrente:', typeof window.updateRecorrente);
  
  if (window.appState?.recorrentes?.length > 0) {
    console.log('\n📋 Primeiras 3 recorrentes:');
    window.appState.recorrentes.slice(0, 3).forEach((r, i) => {
      console.log(`${i + 1}. ${r.descricao} - Categoria: ${r.categoriaId}`);
    });
  }
  
  if (window.appState?.categories?.length > 0) {
    console.log('\n📋 Categorias disponíveis:');
    window.appState.categories.forEach((c, i) => {
      console.log(`${i + 1}. ${c.nome} (ID: ${c.id})`);
    });
  }
}

// Inicialização automática
(async () => {
  console.log('🔍 Verificando disponibilidade do App (V3)...');
  
  const appDisponivel = await aguardarFirebaseV3();
  
  if (appDisponivel) {
    console.log('\n💡 Funções disponíveis (V3):');
    console.log('- debugAppState(): Para verificar o estado do app');
    console.log('- diagnosticarRecorrentesOrfasV3(): Para apenas diagnosticar');
    console.log('- corrigirRecorrentesOrfasV3(): Para corrigir as recorrentes órfãs');
    console.log('\n🚀 Execute debugAppState() primeiro para verificar os dados!');
  } else {
    console.log('\n❌ App não carregado após 10 tentativas (V3).');
    console.log('💡 Soluções:');
    console.log('1. Certifique-se de estar logado no app');
    console.log('2. Aguarde o app carregar completamente');
    console.log('3. Recarregue a página e tente novamente');
    console.log('4. Execute debugAppState() para verificar o que está disponível');
  }
})();

console.log('\n📝 Script V3 carregado! Aguarde a verificação do App...');
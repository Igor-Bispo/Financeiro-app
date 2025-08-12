// ============================================================
// 🔧 Script de Correção de Recorrentes Pós-Backup (Versão 4 Corrigida)
// ============================================================
// Este script funciona diretamente no console do navegador
// sem depender de importações dinâmicas

console.log('🔧 Script de Correção de Recorrentes Pós-Backup (V4 Corrigida)');
console.log('============================================================');

// Função para obter dados usando fetch direto (CORRIGIDA)
async function obterDadosFirestoreCorrigido() {
  try {
    // Tentar acessar dados através do estado do app primeiro (mesmo sem usuário logado)
    if (window.appState && (window.appState.recorrentes || window.appState.categories)) {
      console.log('✅ Dados encontrados no appState!');
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

// Função para diagnosticar recorrentes órfãs (CORRIGIDA)
async function diagnosticarRecorrentesOrfasCorrigido() {
  try {
    console.log('🔍 Diagnosticando recorrentes órfãs (V4 Corrigida)...');
    
    const dados = await obterDadosFirestoreCorrigido();
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

// Mapeamento inteligente de categorias
function mapearCategoriaCorrigido(descricao, categoriasPorNome) {
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

// Função para corrigir recorrentes órfãs (CORRIGIDA)
async function corrigirRecorrentesOrfasCorrigido() {
  try {
    console.log('🔧 Iniciando correção de recorrentes órfãs (V4 Corrigida)...');
    
    // Primeiro, diagnosticar
    const diagnostico = await diagnosticarRecorrentesOrfasCorrigido();
    
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
        const novaCategoria = mapearCategoriaCorrigido(recorrente.descricao, diagnostico.categoriasPorNome);
        
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

console.log('\n💡 Funções disponíveis (V4 Corrigida):');
console.log('- diagnosticarRecorrentesOrfasCorrigido(): Para diagnosticar');
console.log('- corrigirRecorrentesOrfasCorrigido(): Para corrigir as recorrentes órfãs');
console.log('\n🚀 Execute diagnosticarRecorrentesOrfasCorrigido() primeiro!');
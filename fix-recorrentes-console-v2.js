// ============================================================
// 🔧 Script de Correção de Recorrentes Pós-Backup (Versão 2)
// ============================================================
// Este script corrige recorrências órfãs após restauração de backup
// Versão otimizada para console do navegador com acesso direto ao Firebase

console.log('🔧 Script de Correção de Recorrentes Pós-Backup (V2)');
console.log('============================================================');

// Função para aguardar Firebase estar disponível via window object
async function aguardarFirebaseV2(maxTentativas = 10) {
  for (let i = 0; i < maxTentativas; i++) {
    try {
      // Tentar acessar Firebase através de diferentes caminhos possíveis
      let firebaseDB = null;
      let firebaseAuth = null;
      
      // Verificar diferentes formas de acesso ao Firebase
      if (window.firebase && window.firebase.firestore) {
        firebaseDB = window.firebase.firestore();
        firebaseAuth = window.firebase.auth();
      } else if (window.db) {
        firebaseDB = window.db;
        firebaseAuth = window.auth || window.FirebaseAuth;
      } else if (window.FirebaseDB) {
        firebaseDB = window.FirebaseDB;
        firebaseAuth = window.FirebaseAuth;
      }
      
      // Verificar se o usuário está logado
      if (firebaseDB && firebaseAuth && firebaseAuth.currentUser) {
        console.log('✅ Firebase detectado e usuário logado!');
        
        // Expor globalmente para uso nas outras funções
        window.firebaseV2 = {
          db: firebaseDB,
          auth: firebaseAuth,
          user: firebaseAuth.currentUser
        };
        return true;
      }
      
      console.log(`⏳ Aguardando Firebase e login... (tentativa ${i + 1}/${maxTentativas})`);
    } catch (error) {
      console.log(`⏳ Tentativa ${i + 1}/${maxTentativas} - ${error.message}`);
    }
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  return false;
}

// Função para diagnosticar recorrentes órfãs (V2)
async function diagnosticarRecorrentesOrfasV2() {
  try {
    console.log('🔍 Diagnosticando recorrentes órfãs (V2)...');
    
    if (!window.firebaseV2) {
      throw new Error('Firebase não inicializado. Execute aguardarFirebaseV2() primeiro.');
    }
    
    const { db } = window.firebaseV2;
    
    // Buscar todas as recorrentes
    const recorrentesSnapshot = await db.collection('recorrentes').get();
    const recorrentes = [];
    
    recorrentesSnapshot.forEach(doc => {
      const data = doc.data();
      recorrentes.push({
        id: doc.id,
        ...data
      });
    });
    
    console.log(`📊 Total de recorrentes encontradas: ${recorrentes.length}`);
    
    // Buscar todas as categorias
    const categoriasSnapshot = await db.collection('categories').get();
    const categorias = new Map();
    const categoriasPorNome = new Map();
    
    categoriasSnapshot.forEach(doc => {
      const data = doc.data();
      categorias.set(doc.id, data);
      categoriasPorNome.set(data.nome?.toLowerCase(), {
        id: doc.id,
        ...data
      });
    });
    
    console.log(`📊 Total de categorias encontradas: ${categorias.size}`);
    
    // Identificar recorrentes órfãs
    const recorrentesOrfas = [];
    
    recorrentes.forEach(recorrente => {
      if (recorrente.categoriaId && !categorias.has(recorrente.categoriaId)) {
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
      totalCategorias: categorias.size,
      recorrentesOrfas: recorrentesOrfas.length,
      detalhes: recorrentesOrfas,
      categoriasPorNome
    };
    
  } catch (error) {
    console.error('❌ Erro ao diagnosticar recorrentes:', error);
    throw error;
  }
}

// Mapeamento inteligente de categorias por palavras-chave
function mapearCategoriaV2(descricao, categoriasPorNome) {
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

// Função para corrigir recorrentes órfãs (V2)
async function corrigirRecorrentesOrfasV2() {
  try {
    console.log('🔧 Iniciando correção de recorrentes órfãs (V2)...');
    
    // Primeiro, diagnosticar
    const diagnostico = await diagnosticarRecorrentesOrfasV2();
    
    if (diagnostico.recorrentesOrfas === 0) {
      console.log('✅ Nenhuma recorrente órfã encontrada!');
      return;
    }
    
    console.log(`\n🔧 Preparando correção de ${diagnostico.recorrentesOrfas} recorrentes órfãs...`);
    
    // Confirmar com o usuário
    const confirmar = confirm(`Deseja corrigir ${diagnostico.recorrentesOrfas} recorrentes órfãs?\n\nEsta ação irá:\n- Mapear recorrentes para categorias existentes baseado em palavras-chave\n- Usar categorias padrão como fallback\n- Atualizar os registros no banco de dados\n\nContinuar?`);
    
    if (!confirmar) {
      console.log('❌ Correção cancelada pelo usuário.');
      return;
    }
    
    console.log('🚀 Iniciando correção...');
    
    const { db } = window.firebaseV2;
    let corrigidas = 0;
    let erros = 0;
    
    for (const recorrente of diagnostico.detalhes) {
      try {
        const novaCategoria = mapearCategoriaV2(recorrente.descricao, diagnostico.categoriasPorNome);
        
        if (novaCategoria) {
          // Atualizar a recorrente
          await db.collection('recorrentes').doc(recorrente.id).update({
            categoriaId: novaCategoria.id
          });
          
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
    }
    
  } catch (error) {
    console.error('❌ Erro ao corrigir recorrentes:', error);
    throw error;
  }
}

// Inicialização automática
(async () => {
  console.log('🔍 Verificando disponibilidade do Firebase (V2)...');
  
  const firebaseDisponivel = await aguardarFirebaseV2();
  
  if (firebaseDisponivel) {
    console.log('\n💡 Funções disponíveis (V2):');
    console.log('- diagnosticarRecorrentesOrfasV2(): Para apenas diagnosticar');
    console.log('- corrigirRecorrentesOrfasV2(): Para corrigir as recorrentes órfãs');
    console.log('\n🚀 Execute uma das funções acima para começar!');
  } else {
    console.log('\n❌ Firebase não encontrado após 10 tentativas (V2).');
    console.log('💡 Soluções:');
    console.log('1. Certifique-se de estar logado no app');
    console.log('2. Aguarde o app carregar completamente');
    console.log('3. Recarregue a página e tente novamente');
    console.log('4. Verifique se há dados na tela (categorias, transações)');
  }
})();

console.log('\n📝 Script V2 carregado! Aguarde a verificação do Firebase...');
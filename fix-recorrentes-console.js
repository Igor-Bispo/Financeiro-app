// Script para corrigir recorrentes órfãs - Execute no console do browser
// Cole este código no console do navegador (F12) quando estiver logado no app

console.log('🔧 Script de Correção de Recorrentes Pós-Backup');
console.log('=' .repeat(60));

// Função para diagnosticar recorrentes órfãs
async function diagnosticarRecorrentesOrfas() {
  try {
    console.log('🔍 Diagnosticando recorrentes órfãs...');
    
    // Usar as importações dinâmicas
    const { db, collection, getDocs } = window.firebaseImports;
    
    // Buscar todas as recorrentes
    const recorrentesSnapshot = await getDocs(collection(db, 'recorrentes'));
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
    const categoriasSnapshot = await getDocs(collection(db, 'categories'));
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

// Função para corrigir recorrentes órfãs
async function corrigirRecorrentesOrfas() {
  try {
    console.log('🔧 Iniciando correção de recorrentes órfãs...');
    
    const diagnostico = await diagnosticarRecorrentesOrfas();
    
    if (diagnostico.recorrentesOrfas === 0) {
      console.log('✅ Nenhuma recorrente órfã encontrada!');
      return { corrigidas: 0, erros: 0 };
    }
    
    let corrigidas = 0;
    let erros = 0;
    
    console.log(`\n🔧 Corrigindo ${diagnostico.recorrentesOrfas} recorrentes órfãs...`);
    
    // Usar as importações dinâmicas
    const { db, updateDoc, doc } = window.firebaseImports;
    
    for (const recorrente of diagnostico.detalhes) {
      try {
        let novaCategoria = null;
        
        // Tentar mapear por nome da descrição
        if (recorrente.descricao) {
          const descricaoLower = recorrente.descricao.toLowerCase();
          
          // Mapeamento inteligente por palavras-chave
          const mapeamentos = {
            'alimentação': ['comida', 'restaurante', 'lanche', 'mercado', 'supermercado', 'padaria', 'food'],
            'transporte': ['uber', 'taxi', 'ônibus', 'metro', 'gasolina', 'combustível', 'transport'],
            'saúde': ['farmácia', 'médico', 'hospital', 'remédio', 'consulta', 'health'],
            'lazer': ['cinema', 'teatro', 'show', 'festa', 'diversão', 'entertainment'],
            'casa': ['aluguel', 'condomínio', 'água', 'luz', 'gás', 'internet', 'home'],
            'educação': ['escola', 'curso', 'livro', 'material escolar', 'education'],
            'vestuário': ['roupa', 'sapato', 'calça', 'camisa', 'vestido', 'clothing'],
            'outros': ['presente', 'sogra', 'undefined', 'extra', 'diversos']
          };
          
          for (const [categoria, palavras] of Object.entries(mapeamentos)) {
            if (palavras.some(palavra => descricaoLower.includes(palavra))) {
              novaCategoria = diagnostico.categoriasPorNome.get(categoria);
              if (novaCategoria) {
                console.log(`🎯 Mapeamento encontrado: "${recorrente.descricao}" → "${categoria}"`);
                break;
              }
            }
          }
        }
        
        // Se não encontrou por mapeamento, usar categoria padrão
        if (!novaCategoria) {
          // Procurar por categorias padrão
          const categoriasDefault = ['outros', 'geral', 'diversas', 'extra', 'alimentação'];
          for (const nomeDefault of categoriasDefault) {
            novaCategoria = diagnostico.categoriasPorNome.get(nomeDefault);
            if (novaCategoria) {
              console.log(`🔄 Usando categoria padrão: "${nomeDefault}"`);
              break;
            }
          }
        }
        
        if (novaCategoria) {
          // Atualizar a recorrente
          const recorrenteRef = doc(db, 'recorrentes', recorrente.id);
          await updateDoc(recorrenteRef, {
            categoriaId: novaCategoria.id
          });
          
          console.log(`✅ Recorrente "${recorrente.descricao}" corrigida para categoria "${novaCategoria.nome}"`);
          corrigidas++;
        } else {
          console.log(`⚠️ Não foi possível encontrar categoria para "${recorrente.descricao}"`);
          erros++;
        }
        
      } catch (error) {
        console.error(`❌ Erro ao corrigir recorrente "${recorrente.descricao}":`, error);
        erros++;
      }
    }
    
    console.log(`\n📊 Resultado da correção:`);
    console.log(`✅ Recorrentes corrigidas: ${corrigidas}`);
    console.log(`❌ Erros: ${erros}`);
    
    return { corrigidas, erros };
    
  } catch (error) {
    console.error('❌ Erro geral na correção:', error);
    throw error;
  }
}

// Função para aguardar Firebase estar disponível
async function aguardarFirebase(maxTentativas = 10) {
  for (let i = 0; i < maxTentativas; i++) {
    try {
      // Tentar importar Firebase dinamicamente
      const firebaseModule = await import('http://localhost:5176/src/js/firebase.js');
        const firestoreModule = await import('http://localhost:5176/node_modules/firebase/firestore');
      
      if (firebaseModule.db && firestoreModule.collection && firestoreModule.getDocs) {
        console.log('✅ Firebase detectado e disponível!');
        // Expor globalmente para uso nas outras funções
        window.firebaseImports = {
          db: firebaseModule.db,
          collection: firestoreModule.collection,
          getDocs: firestoreModule.getDocs,
          updateDoc: firestoreModule.updateDoc,
          doc: firestoreModule.doc
        };
        return true;
      }
    } catch (error) {
      console.log(`⏳ Aguardando Firebase... (tentativa ${i + 1}/${maxTentativas}) - ${error.message}`);
    }
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  return false;
}

// Executar automaticamente com verificação melhorada
(async () => {
  try {
    console.log('🔍 Verificando disponibilidade do Firebase...');
    
    const firebaseDisponivel = await aguardarFirebase();
    
    if (!firebaseDisponivel) {
      console.error('❌ Firebase não encontrado após 10 tentativas.');
      console.log('💡 Soluções:');
      console.log('1. Certifique-se de estar logado no app');
      console.log('2. Aguarde o app carregar completamente');
      console.log('3. Recarregue a página e tente novamente');
      console.log('4. Execute manualmente: diagnosticarRecorrentesOrfas()');
      return;
    }
    
    console.log('\n🔍 Executando diagnóstico...');
    await diagnosticarRecorrentesOrfas();
    
    console.log('\n' + '=' .repeat(60));
    
    // Perguntar se deve corrigir
    const confirmar = confirm('Deseja corrigir as recorrentes órfãs encontradas?');
    
    if (confirmar) {
      console.log('\n🔧 Executando correção...');
      const resultado = await corrigirRecorrentesOrfas();
      
      console.log('\n' + '=' .repeat(60));
      console.log('🎉 Script concluído com sucesso!');
      console.log('💡 Recarregue a página para ver as mudanças.');
    } else {
      console.log('❌ Correção cancelada pelo usuário.');
    }
    
  } catch (error) {
    console.error('💥 Erro fatal:', error);
    console.log('💡 Tente executar manualmente: diagnosticarRecorrentesOrfas()');
  }
})();

// Disponibilizar funções globalmente para uso manual
window.diagnosticarRecorrentesOrfas = diagnosticarRecorrentesOrfas;
window.corrigirRecorrentesOrfas = corrigirRecorrentesOrfas;

console.log('\n💡 Funções disponíveis:');
console.log('- diagnosticarRecorrentesOrfas(): Para apenas diagnosticar');
console.log('- corrigirRecorrentesOrfas(): Para corrigir as recorrentes órfãs');
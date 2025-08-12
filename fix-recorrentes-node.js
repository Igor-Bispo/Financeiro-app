import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, doc, updateDoc, query, where } from 'firebase/firestore';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBEZtyJqz8CLNKhd5Z8wvhwmU5eiYOJa7Y",
  authDomain: "financas-app-819a8.firebaseapp.com",
  projectId: "financas-app-819a8",
  storageBucket: "financas-app-819a8.appspot.com",
  messagingSenderId: "590052543897",
  appId: "1:590052543897:web:123456789abcdef"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// Função para diagnosticar recorrentes órfãs
async function diagnosticarRecorrentesOrfas() {
  try {
    console.log('🔍 Diagnosticando recorrentes órfãs...');
    
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
    const categoriasSnapshot = await getDocs(collection(db, 'categorias'));
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
    
    for (const recorrente of diagnostico.detalhes) {
      try {
        let novaCategoria = null;
        
        // Tentar mapear por nome da descrição
        if (recorrente.descricao) {
          const descricaoLower = recorrente.descricao.toLowerCase();
          
          // Mapeamento inteligente por palavras-chave
          const mapeamentos = {
            'alimentação': ['comida', 'restaurante', 'lanche', 'mercado', 'supermercado', 'padaria'],
            'transporte': ['uber', 'taxi', 'ônibus', 'metro', 'gasolina', 'combustível'],
            'saúde': ['farmácia', 'médico', 'hospital', 'remédio', 'consulta'],
            'lazer': ['cinema', 'teatro', 'show', 'festa', 'diversão'],
            'casa': ['aluguel', 'condomínio', 'água', 'luz', 'gás', 'internet'],
            'educação': ['escola', 'curso', 'livro', 'material escolar'],
            'vestuário': ['roupa', 'sapato', 'calça', 'camisa', 'vestido']
          };
          
          for (const [categoria, palavras] of Object.entries(mapeamentos)) {
            if (palavras.some(palavra => descricaoLower.includes(palavra))) {
              novaCategoria = diagnostico.categoriasPorNome.get(categoria);
              if (novaCategoria) break;
            }
          }
        }
        
        // Se não encontrou por mapeamento, usar categoria padrão
        if (!novaCategoria) {
          // Procurar por categorias padrão
          const categoriasDefault = ['outros', 'geral', 'diversas', 'extra'];
          for (const nomeDefault of categoriasDefault) {
            novaCategoria = diagnostico.categoriasPorNome.get(nomeDefault);
            if (novaCategoria) break;
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

// Função principal
async function main() {
  try {
    console.log('🔧 Script de Correção de Recorrentes Pós-Backup (Node.js)');
    console.log('=' .repeat(60));
    
    // Fazer login (opcional - pode usar auth anônimo se configurado)
    // await signInWithEmailAndPassword(auth, 'seu-email@exemplo.com', 'sua-senha');
    
    // Executar diagnóstico
    await diagnosticarRecorrentesOrfas();
    
    console.log('\n' + '=' .repeat(60));
    
    // Executar correção
    const resultado = await corrigirRecorrentesOrfas();
    
    console.log('\n' + '=' .repeat(60));
    console.log('🎉 Script concluído com sucesso!');
    
    process.exit(0);
    
  } catch (error) {
    console.error('💥 Erro fatal:', error);
    process.exit(1);
  }
}

// Executar script
main();
// Script para verificar o estado do aplicativo no console do navegador
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

// Verificar se o usuário está logado
if (window.appState?.user) {
  console.log('\n👤 Usuário logado:', window.appState.user.email || 'Email não disponível');
} else {
  console.log('\n❌ Usuário não logado');
}

// Verificar outras variáveis globais importantes
console.log('\n🔧 Outras variáveis globais:');
console.log('- window.firebase:', typeof window.firebase);
console.log('- window.db:', typeof window.db);
console.log('- window.FirebaseDB:', typeof window.FirebaseDB);
console.log('- window.auth:', typeof window.auth);

// Verificar se há elementos na página
const hasElements = document.querySelector('.dashboard') || document.querySelector('#app') || document.querySelector('main');
console.log('- Elementos da página carregados:', !!hasElements);

console.log('\n💡 Execute este script no console do navegador para verificar o estado!');
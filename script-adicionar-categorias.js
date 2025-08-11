// Script para adicionar categorias comuns
// Copie e cole este código no console do navegador (F12)

console.log('📂 Script de adição de categorias iniciado...');

// Função para adicionar categorias
async function adicionarCategorias() {
  try {
    // Verificar se está logado
    if (!window.appState?.currentUser) {
      alert('❌ Você precisa estar logado!');
      return;
    }

    const budgetId = window.appState.currentBudget?.id;
    if (!budgetId) {
      alert('❌ Nenhum orçamento selecionado!');
      return;
    }

    console.log('🔍 Budget ID:', budgetId);
    console.log('👤 User ID:', window.appState.currentUser);

    // Confirmar ação
    const confirmacao = confirm(
      '📂 ADICIONAR CATEGORIAS\n\n' +
      'Este script irá adicionar categorias comuns:\n\n' +
      'DESPESAS:\n' +
      '• Alimentação (R$ 800)\n' +
      '• Transporte (R$ 300)\n' +
      '• Moradia (R$ 1.200)\n' +
      '• Saúde (R$ 200)\n' +
      '• Educação (R$ 500)\n' +
      '• Lazer (R$ 300)\n' +
      '• Vestuário (R$ 200)\n' +
      '• Serviços (R$ 150)\n\n' +
      'RECEITAS:\n' +
      '• Salário\n' +
      '• Freelance\n' +
      '• Investimentos\n\n' +
      'Deseja continuar?'
    );

    if (!confirmacao) {
      console.log('❌ Adição de categorias cancelada pelo usuário.');
      return;
    }

    console.log('🚀 Iniciando adição de categorias...');

    // Categorias de despesas
    const categoriasDespesas = [
      { nome: 'Alimentação', tipo: 'despesa', limite: 800, cor: '#ef4444' },
      { nome: 'Transporte', tipo: 'despesa', limite: 300, cor: '#f97316' },
      { nome: 'Moradia', tipo: 'despesa', limite: 1200, cor: '#dc2626' },
      { nome: 'Saúde', tipo: 'despesa', limite: 200, cor: '#7c3aed' },
      { nome: 'Educação', tipo: 'despesa', limite: 500, cor: '#2563eb' },
      { nome: 'Lazer', tipo: 'despesa', limite: 300, cor: '#059669' },
      { nome: 'Vestuário', tipo: 'despesa', limite: 200, cor: '#0891b2' },
      { nome: 'Serviços', tipo: 'despesa', limite: 150, cor: '#be185d' },
      { nome: 'Supermercado', tipo: 'despesa', limite: 600, cor: '#ca8a04' },
      { nome: 'Combustível', tipo: 'despesa', limite: 400, cor: '#ea580c' },
      { nome: 'Internet/Telefone', tipo: 'despesa', limite: 100, cor: '#0284c7' },
      { nome: 'Energia Elétrica', tipo: 'despesa', limite: 150, cor: '#fbbf24' },
      { nome: 'Água', tipo: 'despesa', limite: 80, cor: '#06b6d4' },
      { nome: 'Gás', tipo: 'despesa', limite: 60, cor: '#84cc16' },
      { nome: 'Seguros', tipo: 'despesa', limite: 200, cor: '#f59e0b' },
      { nome: 'Manutenção', tipo: 'despesa', limite: 100, cor: '#6b7280' }
    ];

    // Categorias de receitas
    const categoriasReceitas = [
      { nome: 'Salário', tipo: 'receita', limite: 0, cor: '#22c55e' },
      { nome: 'Freelance', tipo: 'receita', limite: 0, cor: '#16a34a' },
      { nome: 'Investimentos', tipo: 'receita', limite: 0, cor: '#15803d' },
      { nome: 'Bônus', tipo: 'receita', limite: 0, cor: '#166534' },
      { nome: 'Vendas', tipo: 'receita', limite: 0, cor: '#14532d' },
      { nome: 'Aluguel', tipo: 'receita', limite: 0, cor: '#052e16' },
      { nome: 'Juros', tipo: 'receita', limite: 0, cor: '#064e3b' },
      { nome: 'Outros', tipo: 'receita', limite: 0, cor: '#0f766e' }
    ];

    let totalAdicionadas = 0;

    // Adicionar categorias de despesas
    console.log('📂 Adicionando categorias de despesas...');
    for (const categoria of categoriasDespesas) {
      try {
        await addCategory({
          nome: categoria.nome,
          tipo: categoria.tipo,
          limite: categoria.limite,
          cor: categoria.cor,
          budgetId: budgetId
        });
        totalAdicionadas++;
        console.log(`✅ Categoria "${categoria.nome}" adicionada (R$ ${categoria.limite})`);
      } catch (error) {
        console.log(`❌ Erro ao adicionar categoria "${categoria.nome}":`, error);
      }
    }

    // Adicionar categorias de receitas
    console.log('📂 Adicionando categorias de receitas...');
    for (const categoria of categoriasReceitas) {
      try {
        await addCategory({
          nome: categoria.nome,
          tipo: categoria.tipo,
          limite: categoria.limite,
          cor: categoria.cor,
          budgetId: budgetId
        });
        totalAdicionadas++;
        console.log(`✅ Categoria "${categoria.nome}" adicionada`);
      } catch (error) {
        console.log(`❌ Erro ao adicionar categoria "${categoria.nome}":`, error);
      }
    }

    console.log(`🎉 Categorias adicionadas com sucesso! ${totalAdicionadas} categorias foram criadas.`);
    alert(`🎉 Categorias adicionadas com sucesso!\n\n${totalAdicionadas} categorias foram criadas.\n\nA página será recarregada.`);

    // Recarregar a página
    setTimeout(() => {
      window.location.reload();
    }, 2000);

  } catch (error) {
    console.error('❌ Erro durante a adição de categorias:', error);
    alert('❌ Erro durante a adição de categorias: ' + error.message);
  }
}

// Executar a função
adicionarCategorias(); 
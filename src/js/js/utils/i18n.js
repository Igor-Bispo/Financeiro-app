// Sistema de Internacionalização (i18n)
class I18nManager {
  constructor() {
    this.currentLanguage = 'pt-BR';
    this.translations = {};
    this.fallbackLanguage = 'pt-BR';
    this.init();
  }

  init() {
    this.loadTranslations();
    this.setLanguage(this.currentLanguage);
  }

  loadTranslations() {
    // Traduções em português brasileiro
    this.translations['pt-BR'] = {
      // Interface geral
      'app.title': 'Controle Financeiro',
      'app.welcome': 'Bem-vindo ao Controle Financeiro!',
      'app.loading': 'Carregando...',
      'app.error': 'Erro',
      'app.success': 'Sucesso',
      'app.warning': 'Aviso',
      'app.info': 'Informação',
      'app.confirm': 'Confirmar',
      'app.cancel': 'Cancelar',
      'app.save': 'Salvar',
      'app.edit': 'Editar',
      'app.delete': 'Excluir',
      'app.close': 'Fechar',
      'app.yes': 'Sim',
      'app.no': 'Não',

      // Autenticação
      'auth.login': 'Entrar',
      'auth.logout': 'Sair',
      'auth.loginRequired': 'Faça login para continuar',
      'auth.welcome': 'Bem-vindo, {name}!',

      // Resumos
      'summary.balance': 'Saldo Total',
      'summary.income': 'Receitas',
      'summary.expense': 'Despesas',
      'summary.thisMonth': 'Este mês',
      'summary.generalBalance': 'Balanço geral',

      // Transações
      'transaction.new': 'Nova Transação',
      'transaction.edit': 'Editar Transação',
      'transaction.delete': 'Excluir Transação',
      'transaction.title': 'Descrição',
      'transaction.amount': 'Valor',
      'transaction.type': 'Tipo',
      'transaction.category': 'Categoria',
      'transaction.date': 'Data',
      'transaction.type.expense': 'Despesa',
      'transaction.type.income': 'Receita',
      'transaction.added': 'Transação adicionada com sucesso!',
      'transaction.updated': 'Transação atualizada com sucesso!',
      'transaction.deleted': 'Transação excluída com sucesso!',
      'transaction.error.add': 'Erro ao adicionar transação',
      'transaction.error.update': 'Erro ao atualizar transação',
      'transaction.error.delete': 'Erro ao excluir transação',
      'transaction.confirm.delete': 'Tem certeza que deseja excluir esta transação?',
      'transaction.noCategory': 'Sem categoria',

      // Categorias
      'category.new': 'Nova Categoria',
      'category.edit': 'Editar Categoria',
      'category.delete': 'Excluir Categoria',
      'category.name': 'Nome',
      'category.color': 'Cor',
      'category.type': 'Tipo',
      'category.added': 'Categoria adicionada com sucesso!',
      'category.updated': 'Categoria atualizada com sucesso!',
      'category.deleted': 'Categoria excluída com sucesso!',
      'category.error.add': 'Erro ao adicionar categoria',
      'category.error.update': 'Erro ao atualizar categoria',
      'category.error.delete': 'Erro ao excluir categoria',
      'category.confirm.delete': 'Tem certeza que deseja excluir esta categoria?',

      // Metas
      'goal.new': 'Nova Meta',
      'goal.edit': 'Editar Meta',
      'goal.delete': 'Excluir Meta',
      'goal.title': 'Título',
      'goal.target': 'Valor Alvo',
      'goal.current': 'Valor Atual',
      'goal.deadline': 'Data Limite',
      'goal.added': 'Meta adicionada com sucesso!',
      'goal.updated': 'Meta atualizada com sucesso!',
      'goal.deleted': 'Meta excluída com sucesso!',
      'goal.error.add': 'Erro ao adicionar meta',
      'goal.error.update': 'Erro ao atualizar meta',
      'goal.error.delete': 'Erro ao excluir meta',
      'goal.confirm.delete': 'Tem certeza que deseja excluir esta meta?',

      // Orçamentos
      'budget.new': 'Novo Orçamento',
      'budget.edit': 'Editar Orçamento',
      'budget.delete': 'Excluir Orçamento',
      'budget.category': 'Categoria',
      'budget.amount': 'Valor Mensal',
      'budget.added': 'Orçamento adicionado com sucesso!',
      'budget.updated': 'Orçamento atualizado com sucesso!',
      'budget.deleted': 'Orçamento excluído com sucesso!',
      'budget.error.add': 'Erro ao adicionar orçamento',
      'budget.error.update': 'Erro ao atualizar orçamento',
      'budget.error.delete': 'Erro ao excluir orçamento',
      'budget.confirm.delete': 'Tem certeza que deseja excluir este orçamento?',

      // Gráficos
      'chart.expensesByCategory': 'Despesas por Categoria',
      'chart.incomeVsExpense': 'Receitas vs Despesas',
      'chart.goalsProgress': 'Progresso das Metas',

      // Modo escuro
      'darkMode.enabled': 'Modo escuro ativado',
      'darkMode.disabled': 'Modo claro ativado',

      // Reconhecimento de voz
      'voice.listening': 'Ouvindo... Fale agora!',
      'voice.notSupported': 'Reconhecimento de voz não suportado',
      'voice.error': 'Erro no reconhecimento de voz',
      'voice.commandNotRecognized': 'Comando não reconhecido: {command}',

      // Exportação
      'export.pdf.generating': 'Gerando PDF...',
      'export.pdf.success': 'PDF exportado com sucesso!',
      'export.pdf.error': 'Erro ao exportar PDF',

      // Atalhos de teclado
      'shortcuts.title': 'Atalhos de Teclado:',
      'shortcuts.newTransaction': 'Ctrl+N: Nova transação',
      'shortcuts.newCategory': 'Ctrl+C: Nova categoria',
      'shortcuts.newGoal': 'Ctrl+G: Nova meta',
      'shortcuts.newBudget': 'Ctrl+B: Novo orçamento',
      'shortcuts.darkMode': 'Ctrl+D: Modo escuro',
      'shortcuts.exportPDF': 'Ctrl+E: Exportar PDF',
      'shortcuts.voice': 'Ctrl+V: Voz',
      'shortcuts.closeModals': 'ESC: Fechar modais',

      // Mensagens de erro
      'error.general': 'Ocorreu um erro inesperado',
      'error.network': 'Erro de conexão',
      'error.auth': 'Erro de autenticação',
      'error.permission': 'Permissão negada',
      'error.notFound': 'Recurso não encontrado',
      'error.validation': 'Dados inválidos',

      // Mensagens de sucesso
      'success.saved': 'Dados salvos com sucesso!',
      'success.updated': 'Dados atualizados com sucesso!',
      'success.deleted': 'Dados excluídos com sucesso!',
      'success.imported': 'Dados importados com sucesso!',
      'success.exported': 'Dados exportados com sucesso!',

      // Estados vazios
      'empty.transactions': 'Nenhuma transação encontrada',
      'empty.categories': 'Nenhuma categoria encontrada',
      'empty.goals': 'Nenhuma meta encontrada',
      'empty.budgets': 'Nenhum orçamento encontrado',
      'empty.loginRequired': 'Faça login para ver seus dados',
    };

    // Traduções em inglês (exemplo)
    this.translations['en-US'] = {
      'app.title': 'Financial Control',
      'app.welcome': 'Welcome to Financial Control!',
      'summary.balance': 'Total Balance',
      'summary.income': 'Income',
      'summary.expense': 'Expenses',
      // ... mais traduções em inglês
    };
  }

  setLanguage(language) {
    this.currentLanguage = language;
    localStorage.setItem('language', language);
    this.updateUI();
  }

  getLanguage() {
    return this.currentLanguage;
  }

  t(key, params = {}) {
    const translation =
      this.translations[this.currentLanguage]?.[key] ||
      this.translations[this.fallbackLanguage]?.[key] ||
      key;

    // Substituir parâmetros
    return translation.replace(/\{(\w+)\}/g, (match, param) => {
      return params[param] || match;
    });
  }

  updateUI() {
    // Atualizar elementos da interface com as traduções
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach((element) => {
      const key = element.getAttribute('data-i18n');
      const params = JSON.parse(element.getAttribute('data-i18n-params') || '{}');
      element.textContent = this.t(key, params);
    });

    // Atualizar placeholders
    const inputs = document.querySelectorAll('[data-i18n-placeholder]');
    inputs.forEach((input) => {
      const key = input.getAttribute('data-i18n-placeholder');
      input.placeholder = this.t(key);
    });

    // Atualizar títulos
    const titles = document.querySelectorAll('[data-i18n-title]');
    titles.forEach((element) => {
      const key = element.getAttribute('data-i18n-title');
      element.title = this.t(key);
    });
  }

  // Métodos de conveniência
  getSupportedLanguages() {
    return Object.keys(this.translations);
  }

  isLanguageSupported(language) {
    return this.translations.hasOwnProperty(language);
  }

  // Detectar idioma do navegador
  detectLanguage() {
    const browserLang = navigator.language || navigator.userLanguage;
    const shortLang = browserLang.split('-')[0];

    if (this.isLanguageSupported(browserLang)) {
      return browserLang;
    } else if (this.isLanguageSupported(shortLang)) {
      return shortLang;
    }

    return this.fallbackLanguage;
  }

  // Carregar idioma salvo ou detectar
  loadSavedLanguage() {
    const saved = localStorage.getItem('language');
    if (saved && this.isLanguageSupported(saved)) {
      this.setLanguage(saved);
    } else {
      this.setLanguage(this.detectLanguage());
    }
  }
}

// Criar instância global
window.I18nManager = I18nManager;

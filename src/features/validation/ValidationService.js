// features/validation/ValidationService.js

// FunÃ§Ã£o para validar transaÃ§Ã£o
export function validateTransaction(transactionData) {
  const errors = [];

  // Validar descriÃ§Ã£o
  if (!transactionData.descricao || transactionData.descricao.trim().length === 0) {
    errors.push('DescriÃ§Ã£o Ã© obrigatÃ³ria');
  } else if (transactionData.descricao.trim().length < 3) {
    errors.push('DescriÃ§Ã£o deve ter pelo menos 3 caracteres');
  }

  // Validar valor
  if (!transactionData.valor || isNaN(transactionData.valor)) {
    errors.push('Valor deve ser um nÃºmero vÃ¡lido');
  } else if (transactionData.valor <= 0) {
    errors.push('Valor deve ser maior que zero');
  }

  // Validar tipo
  if (!transactionData.tipo || !['receita', 'despesa'].includes(transactionData.tipo)) {
    errors.push('Tipo deve ser "receita" ou "despesa"');
  }

  // Validar categoria
  if (!transactionData.categoriaId) {
    errors.push('Categoria Ã© obrigatÃ³ria');
  }

  // Validar data
  if (transactionData.data) {
    const date = new Date(transactionData.data);
    if (isNaN(date.getTime())) {
      errors.push('Data deve ser vÃ¡lida');
    }
  }

  return {
    isValid: errors.length === 0,
    errors: errors
  };
}

// FunÃ§Ã£o para validar categoria
export function validateCategory(categoryData) {
  const errors = [];

  // Validar nome
  if (!categoryData.nome || categoryData.nome.trim().length === 0) {
    errors.push('Nome da categoria Ã© obrigatÃ³rio');
  } else if (categoryData.nome.trim().length < 2) {
    errors.push('Nome da categoria deve ter pelo menos 2 caracteres');
  }

  // Validar tipo
  if (!categoryData.tipo || !['receita', 'despesa'].includes(categoryData.tipo)) {
    errors.push('Tipo deve ser "receita" ou "despesa"');
  }

  // Validar limite (opcional)
  if (categoryData.limite !== undefined && categoryData.limite !== null) {
    if (isNaN(categoryData.limite)) {
      errors.push('Limite deve ser um nÃºmero vÃ¡lido');
    } else if (categoryData.limite < 0) {
      errors.push('Limite nÃ£o pode ser negativo');
    }
  }

  // Validar cor
  if (categoryData.cor && !isValidColor(categoryData.cor)) {
    errors.push('Cor deve ser um cÃ³digo de cor vÃ¡lido');
  }

  return {
    isValid: errors.length === 0,
    errors: errors
  };
}

// FunÃ§Ã£o para validar orÃ§amento
export function validateBudget(budgetData) {
  const errors = [];

  // Validar nome
  if (!budgetData.nome || budgetData.nome.trim().length === 0) {
    errors.push('Nome do orÃ§amento Ã© obrigatÃ³rio');
  } else if (budgetData.nome.trim().length < 3) {
    errors.push('Nome do orÃ§amento deve ter pelo menos 3 caracteres');
  }

  // Validar valor total
  if (!budgetData.valorTotal || isNaN(budgetData.valorTotal)) {
    errors.push('Valor total deve ser um nÃºmero vÃ¡lido');
  } else if (budgetData.valorTotal <= 0) {
    errors.push('Valor total deve ser maior que zero');
  }

  // Validar perÃ­odo
  if (budgetData.periodo && !['mensal', 'semanal', 'anual'].includes(budgetData.periodo)) {
    errors.push('PerÃ­odo deve ser "mensal", "semanal" ou "anual"');
  }

  return {
    isValid: errors.length === 0,
    errors: errors
  };
}

// FunÃ§Ã£o para validar email
export function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// FunÃ§Ã£o para validar senha
export function validatePassword(password) {
  const errors = [];

  if (!password || password.length < 6) {
    errors.push('Senha deve ter pelo menos 6 caracteres');
  }

  if (!/[A-Z]/.test(password)) {
    errors.push('Senha deve conter pelo menos uma letra maiÃºscula');
  }

  if (!/[a-z]/.test(password)) {
    errors.push('Senha deve conter pelo menos uma letra minÃºscula');
  }

  if (!/\d/.test(password)) {
    errors.push('Senha deve conter pelo menos um nÃºmero');
  }

  return {
    isValid: errors.length === 0,
    errors: errors
  };
}

// FunÃ§Ã£o para validar CPF
export function validateCPF(cpf) {
  // Remove caracteres nÃ£o numÃ©ricos
  cpf = cpf.replace(/[^\d]/g, '');

  // Verifica se tem 11 dÃ­gitos
  if (cpf.length !== 11) return false;

  // Verifica se todos os dÃ­gitos sÃ£o iguais
  if (/^(\d)\1{10}$/.test(cpf)) return false;

  // ValidaÃ§Ã£o do primeiro dÃ­gito verificador
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cpf.charAt(i)) * (10 - i);
  }
  let remainder = sum % 11;
  let digit1 = remainder < 2 ? 0 : 11 - remainder;

  // ValidaÃ§Ã£o do segundo dÃ­gito verificador
  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cpf.charAt(i)) * (11 - i);
  }
  remainder = sum % 11;
  let digit2 = remainder < 2 ? 0 : 11 - remainder;

  return parseInt(cpf.charAt(9)) === digit1 && parseInt(cpf.charAt(10)) === digit2;
}

// FunÃ§Ã£o para validar cor
function isValidColor(color) {
  const s = new Option().style;
  s.color = color;
  return s.color !== '';
}

// FunÃ§Ã£o para validar telefone
export function validatePhone(phone) {
  // Remove caracteres nÃ£o numÃ©ricos
  phone = phone.replace(/[^\d]/g, '');

  // Verifica se tem 10 ou 11 dÃ­gitos (com DDD)
  return phone.length >= 10 && phone.length <= 11;
}

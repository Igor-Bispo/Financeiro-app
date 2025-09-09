// features/validation/ValidationService.js

// Função para validar transação
export function validateTransaction(transactionData) {
  const errors = [];

  // Validar descrição
  if (!transactionData.descricao || transactionData.descricao.trim().length === 0) {
    errors.push('Descrição é obrigatória');
  } else if (transactionData.descricao.trim().length < 3) {
    errors.push('Descrição deve ter pelo menos 3 caracteres');
  }

  // Validar valor
  if (!transactionData.valor || isNaN(transactionData.valor)) {
    errors.push('Valor deve ser um número válido');
  } else if (transactionData.valor <= 0) {
    errors.push('Valor deve ser maior que zero');
  }

  // Validar tipo
  if (!transactionData.tipo || !['receita', 'despesa'].includes(transactionData.tipo)) {
    errors.push('Tipo deve ser "receita" ou "despesa"');
  }

  // Validar categoria
  if (!transactionData.categoriaId) {
    errors.push('Categoria é obrigatória');
  }

  // Validar data
  if (transactionData.data) {
    const date = new Date(transactionData.data);
    if (isNaN(date.getTime())) {
      errors.push('Data deve ser válida');
    }
  }

  return {
    isValid: errors.length === 0,
    errors: errors
  };
}

// Função para validar categoria
export function validateCategory(categoryData) {
  const errors = [];

  // Validar nome
  if (!categoryData.nome || categoryData.nome.trim().length === 0) {
    errors.push('Nome da categoria é obrigatório');
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
      errors.push('Limite deve ser um número válido');
    } else if (categoryData.limite < 0) {
      errors.push('Limite não pode ser negativo');
    }
  }

  // Validar cor
  if (categoryData.cor && !isValidColor(categoryData.cor)) {
    errors.push('Cor deve ser um código de cor válido');
  }

  return {
    isValid: errors.length === 0,
    errors: errors
  };
}

// Função para validar orçamento
export function validateBudget(budgetData) {
  const errors = [];

  // Validar nome
  if (!budgetData.nome || budgetData.nome.trim().length === 0) {
    errors.push('Nome do orçamento é obrigatório');
  } else if (budgetData.nome.trim().length < 3) {
    errors.push('Nome do orçamento deve ter pelo menos 3 caracteres');
  }

  // Validar valor total
  if (!budgetData.valorTotal || isNaN(budgetData.valorTotal)) {
    errors.push('Valor total deve ser um número válido');
  } else if (budgetData.valorTotal <= 0) {
    errors.push('Valor total deve ser maior que zero');
  }

  // Validar período
  if (budgetData.periodo && !['mensal', 'semanal', 'anual'].includes(budgetData.periodo)) {
    errors.push('Período deve ser "mensal", "semanal" ou "anual"');
  }

  return {
    isValid: errors.length === 0,
    errors: errors
  };
}

// Função para validar email
export function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Função para validar senha
export function validatePassword(password) {
  const errors = [];

  if (!password || password.length < 6) {
    errors.push('Senha deve ter pelo menos 6 caracteres');
  }

  if (!/[A-Z]/.test(password)) {
    errors.push('Senha deve conter pelo menos uma letra maiúscula');
  }

  if (!/[a-z]/.test(password)) {
    errors.push('Senha deve conter pelo menos uma letra minúscula');
  }

  if (!/\d/.test(password)) {
    errors.push('Senha deve conter pelo menos um número');
  }

  return {
    isValid: errors.length === 0,
    errors: errors
  };
}

// Função para validar CPF
export function validateCPF(cpf) {
  // Remove caracteres não numéricos
  cpf = cpf.replace(/[^\d]/g, '');

  // Verifica se tem 11 dígitos
  if (cpf.length !== 11) return false;

  // Verifica se todos os dígitos são iguais
  if (/^(\d)\1{10}$/.test(cpf)) return false;

  // Validação do primeiro dígito verificador
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cpf.charAt(i)) * (10 - i);
  }
  let remainder = sum % 11;
  let digit1 = remainder < 2 ? 0 : 11 - remainder;

  // Validação do segundo dígito verificador
  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cpf.charAt(i)) * (11 - i);
  }
  remainder = sum % 11;
  let digit2 = remainder < 2 ? 0 : 11 - remainder;

  return parseInt(cpf.charAt(9)) === digit1 && parseInt(cpf.charAt(10)) === digit2;
}

// Função para validar cor
function isValidColor(color) {
  const s = new Option().style;
  s.color = color;
  return s.color !== '';
}

// Função para validar telefone
export function validatePhone(phone) {
  // Remove caracteres não numéricos
  phone = phone.replace(/[^\d]/g, '');

  // Verifica se tem 10 ou 11 dígitos (com DDD)
  return phone.length >= 10 && phone.length <= 11;
}

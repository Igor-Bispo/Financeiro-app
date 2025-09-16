// features/utils/UtilsService.js

// Função para formatar moeda
export function formatCurrency(value, currency = 'BRL') {
  if (value === null || value === undefined || isNaN(value)) {
    return 'R$ 0,00';
  }

  try {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: currency
    }).format(value);
  } catch (error) {
    console.error('❌ Erro ao formatar moeda:', error);
    return `R$ ${value.toFixed(2).replace('.', ',')}`;
  }
}

// Função para formatar data
export function formatDate(date, options = {}) {
  if (!date) return '';

  try {
    const defaultOptions = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      ...options
    };

    const dateObj = new Date(date);
    if (isNaN(dateObj.getTime())) return '';

    return new Intl.DateTimeFormat('pt-BR', defaultOptions).format(dateObj);
  } catch (error) {
    console.error('❌ Erro ao formatar data:', error);
    return '';
  }
}

// Função para calcular porcentagem
export function calculatePercentage(value, total) {
  if (!total || total === 0) return 0;
  return Math.round((value / total) * 100);
}

// Função para normalizar texto (remover acentos)
export function normalizeText(text) {
  if (!text) return '';
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
}

// Função para debounce
export function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Função para throttle
export function throttle(func, limit) {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// Função para gerar ID único
export function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// Função para validar email
export function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Função para capitalizar primeira letra
export function capitalizeFirst(str) {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

// Função para truncar texto
export function truncateText(text, maxLength = 50) {
  if (!text || text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
}

// Função para verificar se é número
export function isNumeric(value) {
  return !isNaN(parseFloat(value)) && isFinite(value);
}

// Função para arredondar para 2 casas decimais
export function roundToTwoDecimals(value) {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

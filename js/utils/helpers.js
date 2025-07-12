// Utilitários usando namespace global
function formatCurrency(value) {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function formatDate(date) {
    return new Date(date).toLocaleDateString('pt-BR');
}

// Disponibiliza globalmente
window.FinanceHelpers = {
    formatCurrency,
    formatDate
}; 
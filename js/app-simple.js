// Versão simplificada para debug
console.log('🚀 Carregando app-simple.js...');

// Criar objeto global imediatamente
window.FinanceApp = {};

// Definir funções simples
window.FinanceApp.editTransaction = function(id) {
    console.log('✅ editTransaction chamada com id:', id);
    alert('editTransaction: ' + id);
};

window.FinanceApp.editCategory = function(id) {
    console.log('✅ editCategory chamada com id:', id);
    alert('editCategory: ' + id);
};

window.FinanceApp.editGoal = function(id) {
    console.log('✅ editGoal chamada com id:', id);
    alert('editGoal: ' + id);
};

window.FinanceApp.editBudget = function(id) {
    console.log('✅ editBudget chamada com id:', id);
    alert('editBudget: ' + id);
};

window.FinanceApp.deleteTransaction = function(id) {
    console.log('✅ deleteTransaction chamada com id:', id);
    alert('deleteTransaction: ' + id);
};

window.FinanceApp.deleteCategory = function(id) {
    console.log('✅ deleteCategory chamada com id:', id);
    alert('deleteCategory: ' + id);
};

window.FinanceApp.deleteGoal = function(id) {
    console.log('✅ deleteGoal chamada com id:', id);
    alert('deleteGoal: ' + id);
};

window.FinanceApp.deleteBudget = function(id) {
    console.log('✅ deleteBudget chamada com id:', id);
    alert('deleteBudget: ' + id);
};

window.FinanceApp.showTransactionHistory = function(id) {
    console.log('✅ showTransactionHistory chamada com id:', id);
    alert('showTransactionHistory: ' + id);
};

window.FinanceApp.showCategoryHistory = function(id) {
    console.log('✅ showCategoryHistory chamada com id:', id);
    alert('showCategoryHistory: ' + id);
};

window.FinanceApp.showGoalHistory = function(id) {
    console.log('✅ showGoalHistory chamada com id:', id);
    alert('showGoalHistory: ' + id);
};

window.FinanceApp.showBudgetHistory = function(id) {
    console.log('✅ showBudgetHistory chamada com id:', id);
    alert('showBudgetHistory: ' + id);
};

console.log('✅ FinanceApp criado com sucesso!');
console.log('FinanceApp:', window.FinanceApp);
console.log('Propriedades:', Object.keys(window.FinanceApp)); 
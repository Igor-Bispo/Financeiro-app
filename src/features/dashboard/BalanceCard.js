// Componente BalanceCard (features/dashboard/BalanceCard.js)
// Exibe os cards de Receita, Despesa e Saldo com visual moderno

export default function BalanceCard({ receita = 0, despesa = 0, saldo = 0 } = {}) {
  return `
    <div class="cards-grid">
      <div class="dashboard-card card-income">
        <h3>Receita</h3>
        <span id="income-total">R$ ${receita.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
      </div>
      <div class="dashboard-card card-expense">
        <h3>Despesa</h3>
        <span id="expense-total">R$ ${despesa.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
      </div>
      <div class="dashboard-card" style="background: linear-gradient(135deg, #b5179e, #7209b7);">
        <h3>Saldo</h3>
        <span id="balance-total">R$ ${saldo.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
      </div>
    </div>
  `;
} 
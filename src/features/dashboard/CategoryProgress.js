// Componente CategoryProgress (features/dashboard/CategoryProgress.js)
// Exibe o progresso das categorias com barra e saldo, usando o novo CSS

export default function CategoryProgress({ categorias = [], transacoes = [] } = {}) {
  return `
    <ul class="flex flex-col gap-4">
      ${categorias.map(cat => {
        const gasto = transacoes.filter(t => t.categoria === cat.nome && t.tipo === 'despesa').reduce((acc, t) => acc + t.valor, 0);
        const saldo = cat.limite > 0 ? cat.limite - gasto : 0;
        const percent = cat.limite > 0 ? Math.round((gasto / cat.limite) * 100) : 0;
        let barColor = 'var(--success)';
        if (percent >= 90) barColor = 'var(--danger)';
        else if (percent >= 60) barColor = 'var(--secondary)';
        return `
        <li class="form-card">
          <div class="flex justify-between items-center">
            <div>
              <div class="font-bold text-gray-900 text-base">${cat.nome}</div>
              <div class="text-xs text-gray-400">${cat.tipo.charAt(0).toUpperCase() + cat.tipo.slice(1)} • Limite: ${cat.limite > 0 ? 'R$ ' + cat.limite.toLocaleString('pt-BR', { minimumFractionDigits: 2 }) : '-'} • Saldo: <span class="${saldo < 0 ? 'text-red-500' : 'text-green-600'} font-bold">R$ ${saldo.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span></div>
            </div>
          </div>
          ${cat.tipo === 'despesa' && cat.limite > 0 ? `
            <div class="progress-container">
              <div class="progress-bar">
                <div class="progress-fill" style="width: ${Math.min(percent, 100)}%; background: ${barColor}"></div>
              </div>
              <span class="progress-text">${percent}% usado</span>
            </div>
          ` : ''}
        </li>
        `;
      }).join('')}
    </ul>
  `;
} 
﻿// features/notifications/ui/renderCard.js

export function renderNotificationCard(notification) {
  const iconBg = notification.type === 'deleted_transaction'
    ? 'bg-red-100 dark:bg-red-900'
    : notification.type === 'updated_transaction'
      ? 'bg-yellow-100 dark:bg-yellow-900'
      : (notification.type && notification.type.startsWith('category_'))
        ? 'bg-purple-100 dark:bg-purple-900'
        : (notification.type === 'test_notification'
          ? 'bg-emerald-100 dark:bg-emerald-900'
          : 'bg-blue-100 dark:bg-blue-900');
  const icon = notification.type === 'deleted_transaction'
    ? 'ðŸ—‘ï¸'
    : notification.type === 'updated_transaction'
      ? 'âœï¸'
      : (notification.type && notification.type.startsWith('category_'))
        ? 'ðŸ“‚'
        : (notification.type === 'test_notification' ? 'ðŸ“£' : 'ðŸ’°');
  const title = (notification.type === 'deleted_transaction' && 'TransaÃ§Ã£o ExcluÃ­da')
    || (notification.type === 'updated_transaction' && 'TransaÃ§Ã£o Atualizada')
    || (notification.type === 'new_transaction' && 'Nova TransaÃ§Ã£o')
    || (notification.type === 'category_added' && 'Categoria Criada')
    || (notification.type === 'category_updated' && 'Categoria Atualizada')
    || (notification.type === 'category_deleted' && 'Categoria ExcluÃ­da')
    || (notification.type === 'test_notification' && 'NotificaÃ§Ã£o de Teste')
    || 'NotificaÃ§Ã£o';
  const createdAtText = notification.createdAt?.toDate ? notification.createdAt.toDate().toLocaleString('pt-BR') : 'Data nÃ£o disponÃ­vel';

  // Monta visual dos detalhes de mudanÃ§as (para transaÃ§Ã£o atualizada)
  const fmtCurrency = (v) => {
    if (typeof v !== 'number') return v ?? '-';
    try { return v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }); } catch { return String(v); }
  };
  const changes = notification.changes || {};
  const hasChanges = Object.keys(changes).length > 0;
  const changesBlock = hasChanges ? `
    <div class="mt-3 p-3 rounded-xl bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800">
      <div class="font-semibold mb-2 text-yellow-800 dark:text-yellow-200">AlteraÃ§Ãµes</div>
      <ul class="text-sm space-y-1 text-gray-800 dark:text-gray-200">
        ${changes.descricao ? `<li>âœï¸ DescriÃ§Ã£o: <span class="line-through opacity-60">${changes.descricao.from || '-'}</span> â†’ <span class="font-medium">${changes.descricao.to || '-'}</span></li>` : ''}
        ${changes.valor ? `<li>ðŸ’µ Valor: <span class="line-through opacity-60">${fmtCurrency(changes.valor.from)}</span> â†’ <span class="font-medium">${fmtCurrency(changes.valor.to)}</span></li>` : ''}
        ${changes.categoria ? `<li>ðŸ“‚ Categoria: <span class="line-through opacity-60">${changes.categoria.from || '-'}</span> â†’ <span class="font-medium">${changes.categoria.to || '-'}</span></li>` : ''}
        ${changes.tipo ? `<li>ðŸ” Tipo: <span class="line-through opacity-60">${changes.tipo.from || '-'}</span> â†’ <span class="font-medium">${changes.tipo.to || '-'}</span></li>` : ''}
      </ul>
    </div>
  ` : '';

  // AlteraÃ§Ãµes de categoria (nome, tipo, limite)
  const hasCatChanges = !!(changes && (changes.nome || changes.tipo || changes.limite));
  const categoryChangesBlock = hasCatChanges ? `
    <div class="mt-3 p-3 rounded-xl bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800">
      <div class="font-semibold mb-2 text-yellow-800 dark:text-yellow-200">AlteraÃ§Ãµes da Categoria</div>
      <ul class="text-sm space-y-1 text-gray-800 dark:text-gray-200">
        ${changes.nome ? `<li>ðŸ·ï¸ Nome: <span class="line-through opacity-60">${changes.nome.from || '-'}</span> â†’ <span class="font-medium">${changes.nome.to || '-'}</span></li>` : ''}
        ${changes.tipo ? `<li>ðŸ” Tipo: <span class="line-through opacity-60">${changes.tipo.from || '-'}</span> â†’ <span class="font-medium">${changes.tipo.to || '-'}</span></li>` : ''}
        ${changes.limite ? `<li>ðŸ“ Limite: <span class="line-through opacity-60">${fmtCurrency(changes.limite.from)}</span> â†’ <span class="font-medium">${fmtCurrency(changes.limite.to)}</span></li>` : ''}
      </ul>
    </div>
  ` : '';

  // Resumo da transaÃ§Ã£o (para new/deleted/updated)
  const showSummary = notification.type === 'new_transaction' || notification.type === 'deleted_transaction' || notification.type === 'updated_transaction';
  const summaryBlock = showSummary ? `
    <div class="mt-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
      <div class="font-semibold mb-2 text-gray-800 dark:text-gray-200">Resumo</div>
      <ul class="text-sm space-y-1 text-gray-800 dark:text-gray-200">
        <li>ðŸ“ DescriÃ§Ã£o: <span class="font-medium">${notification.transactionDescricao || '-'}</span></li>
        <li>ðŸ’µ Valor: <span class="font-medium">${fmtCurrency(notification.transactionValor)}</span></li>
        <li>ðŸ“‚ Categoria: <span class="font-medium">${notification.transactionCategoria || '-'}</span></li>
        <li>ðŸ” Tipo: <span class="font-medium">${(notification.transactionTipo || 'despesa') === 'receita' ? 'Receita' : 'Despesa'}</span></li>
  <li>ðŸ“ Limite da categoria: <span class="font-medium">${notification.transactionCategoriaLimite !== null && notification.transactionCategoriaLimite !== undefined ? fmtCurrency(notification.transactionCategoriaLimite) : '-'}</span></li>
  ${notification.recorrenteParcelaAtual && notification.recorrenteParcelasTotal ? `<li>ðŸ“… Parcela: <span class="font-medium">${notification.recorrenteParcelaAtual}/${notification.recorrenteParcelasTotal}</span></li>` : ''}
      </ul>
    </div>
  ` : '';

  return `
  <div class="u-card bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-2xl transition-all duration-300 group ${!notification.read ? 'ring-2 ring-blue-200 dark:ring-blue-800' : ''}">
      <div class="bg-gradient-to-r ${!notification.read ? 'from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-800' : 'from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-800'} p-4 border-b border-gray-200 dark:border-gray-700">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="w-12 h-12 rounded-full ${iconBg} flex items-center justify-center text-xl">${icon}</div>
            <div>
              <h3 class="font-bold text-gray-900 dark:text-gray-100">${title}</h3>
              <p class="text-sm text-gray-500 dark:text-gray-400">OrÃ§amento: ${notification.budgetName || 'OrÃ§amento'}</p>
            </div>
          </div>
          <div class="text-right">${!notification.read ? '<div class="text-2xl">ðŸ“¬</div>' : '<div class="text-2xl">âœ…</div>'}</div>
        </div>
      </div>

      <div class="p-4">
        <div class="space-y-3">
          <div class="flex items-center justify-between">
            <span class="text-sm text-gray-600 dark:text-gray-400">Enviado por:</span>
            <span class="font-medium text-gray-900 dark:text-gray-100">${notification.senderName || 'UsuÃ¡rio'}</span>
          </div>
          ${notification.type && notification.type.startsWith('category_') ? `
            <div class="flex items-center justify-between">
              <span class="text-sm text-gray-600 dark:text-gray-400">Categoria:</span>
              <span class="font-medium text-gray-900 dark:text-gray-100">${notification.categoryNome || 'Categoria'}</span>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-sm text-gray-600 dark:text-gray-400">Tipo:</span>
              <span class="font-medium ${((notification.categoryTipo || 'despesa') === 'receita') ? 'text-green-600' : 'text-red-600'}">${(notification.categoryTipo || 'despesa') === 'receita' ? 'Receita' : 'Despesa'}</span>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-sm text-gray-600 dark:text-gray-400">Limite:</span>
              <span class="font-medium text-gray-900 dark:text-gray-100">${notification.categoryLimite !== null && notification.categoryLimite !== undefined ? fmtCurrency(notification.categoryLimite) : '-'}</span>
            </div>
          ` : notification.type === 'test_notification' ? `
            <div class="flex items-center justify-between">
              <span class="text-sm text-gray-600 dark:text-gray-400">Mensagem:</span>
              <span class="font-medium text-gray-900 dark:text-gray-100">${notification.message || 'Mensagem de teste'}</span>
            </div>
          ` : `
            <div class="flex items-center justify-between">
              <span class="text-sm text-gray-600 dark:text-gray-400">Tipo:</span>
              ${notification.type === 'deleted_transaction' ? '<span class="font-medium text-red-600">excluÃ­da</span>' : `<span class="font-medium ${(notification.transactionTipo || 'despesa') === 'receita' ? 'text-green-600' : 'text-red-600'}">${notification.transactionTipo || 'TransaÃ§Ã£o'}</span>`}
            </div>
          `}
          <div class="flex items-center justify-between">
            <span class="text-sm text-gray-600 dark:text-gray-400">Data:</span>
            <span class="text-sm text-gray-500 dark:text-gray-400">${createdAtText}</span>
          </div>
          ${summaryBlock}
          ${notification.type === 'updated_transaction' ? changesBlock : ''}
          ${notification.type === 'category_updated' ? categoryChangesBlock : ''}
        </div>
      </div>

      <div class="bg-gray-50 dark:bg-gray-800 p-4 border-t border-gray-200 dark:border-gray-700">
        <div class="flex flex-wrap gap-2">
          ${!notification.read ? `
          <button onclick="window.showConfirmationModal({
            title: 'Marcar como Lida',
            message: 'Deseja marcar esta notificaÃ§Ã£o como lida?',
            confirmText: 'Sim, Marcar',
            confirmColor: 'bg-blue-500 hover:bg-blue-600',
            onConfirm: () => window.markNotificationAsRead && window.markNotificationAsRead('${notification.id}')
          })" class="flex-1 u-btn u-btn--primary text-sm flex items-center justify-center gap-2">âœ… Marcar como lida</button>
          ` : ''}
          <button onclick="window.__pinNotification && window.__pinNotification('${notification.id}', ${!notification.pinned})" class="flex-1 u-btn ${notification.pinned ? 'u-btn--danger' : 'u-btn--outline'} text-sm flex items-center justify-center gap-2">${notification.pinned ? 'ðŸ“Œ Desfixar' : 'ðŸ“ Fixar'}</button>
          <button onclick="window.__archiveNotification && window.__archiveNotification('${notification.id}', ${!notification.archivedAt})" class="flex-1 u-btn u-btn--outline text-sm flex items-center justify-center gap-2">${notification.archivedAt ? 'ðŸ“‚ Restaurar' : 'ðŸ—ƒï¸ Arquivar'}</button>
          <button onclick="window.openNotificationTarget && window.openNotificationTarget('${notification.id}','${notification.type || ''}')" class="flex-1 u-btn u-btn--outline text-sm flex items-center justify-center gap-2">ðŸ”— Ver no app</button>
        </div>
      </div>
    </div>
  `;
}

export function renderSection(title, groups) {
  return `
    <div class="mb-8">
      <div class="flex items-center gap-2 mb-4">
        <div class="w-1 h-6 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full"></div>
        <h2 class="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100">${title}</h2>
      </div>
      <div class="space-y-6">
        ${groups.map(group => `
          <div>
            <div class="text-sm font-semibold text-gray-600 dark:text-gray-300 mb-2">${group.label}</div>
            <div class="space-y-4">${group.items.map(renderNotificationCard).join('')}</div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

// notifications.js - centraliza handlers de notificações

export async function sendTestNotificationOwner(budgetId, senderUid) {
  if (!budgetId || !senderUid) throw new Error('Orçamento ou usuário não definido');
  const mod = await import('@features/notifications/NotificationService.js');
  return (mod.sendTestNotificationToOwner || mod.default?.sendTestNotificationToOwner)?.(budgetId, senderUid);
}

export async function sendTestNotificationShared(budgetId, senderUid) {
  if (!budgetId || !senderUid) throw new Error('Orçamento ou usuário não definido');
  const mod = await import('@features/notifications/NotificationService.js');
  return (mod.sendTestNotificationToShared || mod.default?.sendTestNotificationToShared)?.(budgetId, senderUid);
}

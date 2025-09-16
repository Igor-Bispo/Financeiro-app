// notification.triggers.js
// Integra lembretes de recorrentes e resumo semanal respeitando preferências do usuário.
// Preferências:
//  - localStorage 'noti_recurring_reminders' === 'true'
//  - localStorage 'noti_weekly_summary' === 'true'
// Evita duplicações usando chaves em localStorage:
//  - recorrenteReminder:lastSent:<recorrenteId>:YYYY-MM-DD
//  - weeklySummary:lastSent:<budgetId>:YYYY-WW

import { eventBus } from '@core/events/eventBus.js';

let initialized = false;

function getCurrentUser() {
  return window.appState?.currentUser || window.appState?.user || null;
}

function getCurrentBudget() {
  return window.appState?.currentBudget || null;
}

function isoDate(d = new Date()) {
  return d.toISOString().split('T')[0];
}

function getWeekKey(date = new Date()) {
  // ISO week number (simplificado)
  const tmp = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = tmp.getUTCDay() || 7;
  tmp.setUTCDate(tmp.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(tmp.getUTCFullYear(), 0, 1));
  const weekNo = Math.ceil((((tmp - yearStart) / 86400000) + 1) / 7);
  return `${tmp.getUTCFullYear()}-W${String(weekNo).padStart(2,'0')}`;
}

async function sendRecorrenteReminder(recorrente) {
  try {
    const user = getCurrentUser();
    const budget = getCurrentBudget();
    if (!user || !budget) return;
    
    // Verificar se a função existe antes de importar
    try {
      const notificationModule = await import('@features/notifications/NotificationService.js');
      if (notificationModule && typeof notificationModule.sendRecorrenteReminderNotification === 'function') {
        await notificationModule.sendRecorrenteReminderNotification(budget.id, user.uid, recorrente);
        console.log('[NotificationTriggers] Lembrete de recorrente enviado com sucesso');
      } else {
        console.warn('[NotificationTriggers] Função sendRecorrenteReminderNotification não encontrada no módulo');
        // Fallback: usar Snackbar para mostrar o lembrete
        if (window.Snackbar && typeof window.Snackbar.show === 'function') {
          window.Snackbar.show(`🔄 Lembrete: ${recorrente.nome || 'Despesa recorrente'} - R$ ${recorrente.valor || 0}`, 'warning', 5000);
        }
      }
    } catch (importError) {
      console.warn('[NotificationTriggers] Erro ao importar NotificationService:', importError);
      // Fallback: usar Snackbar para mostrar o lembrete
      if (window.Snackbar && typeof window.Snackbar.show === 'function') {
        window.Snackbar.show(`🔄 Lembrete: ${recorrente.nome || 'Despesa recorrente'} - R$ ${recorrente.valor || 0}`, 'warning', 5000);
      }
    }
  } catch (e) { 
    console.warn('[NotificationTriggers] Falha ao enviar lembrete recorrente', e); 
    // Fallback final: mostrar lembrete via console
    console.log('🔄 Lembrete de recorrente:', recorrente);
  }
}

async function sendWeeklySummary(summaryData) {
  try {
    const user = getCurrentUser();
    const budget = getCurrentBudget();
    if (!user || !budget) return;
    
    // Verificar se a função existe antes de importar
    try {
      const notificationModule = await import('@features/notifications/NotificationService.js');
      if (notificationModule && typeof notificationModule.sendWeeklySummaryNotification === 'function') {
        await notificationModule.sendWeeklySummaryNotification(budget.id, user.uid, summaryData);
        console.log('[NotificationTriggers] Resumo semanal enviado com sucesso');
      } else {
        console.warn('[NotificationTriggers] Função sendWeeklySummaryNotification não encontrada no módulo');
        // Fallback: usar Snackbar para mostrar o resumo
        if (window.Snackbar && typeof window.Snackbar.show === 'function') {
          window.Snackbar.show(`📊 ${summaryData.resumo}`, 'info', 5000);
        }
      }
    } catch (importError) {
      console.warn('[NotificationTriggers] Erro ao importar NotificationService:', importError);
      // Fallback: usar Snackbar para mostrar o resumo
      if (window.Snackbar && typeof window.Snackbar.show === 'function') {
        window.Snackbar.show(`📊 ${summaryData.resumo}`, 'info', 5000);
      }
    }
  } catch (e) { 
    console.warn('[NotificationTriggers] Falha ao enviar resumo semanal', e); 
    // Fallback final: mostrar resumo via console
    console.log('📊 Resumo semanal:', summaryData);
  }
}

function canRunRecurringReminders() {
  return localStorage.getItem('noti_recurring_reminders') === 'true';
}

function canRunWeeklySummary() {
  return localStorage.getItem('noti_weekly_summary') === 'true';
}

function calcStatusRecorrente(rec) {
  try {
    // Import dinâmico (lazy) para não pesar boot
    return import('@features/recorrentes/service.js').then(mod => {
      const txs = window.appState?.transactions || [];
      return mod.calcularStatusRecorrente(rec, txs);
    });
  } catch { return Promise.resolve(null); }
}

async function processRecurringReminders() {
  if (!canRunRecurringReminders()) return;
  const recorrentes = window.appState?.recorrentes || [];
  const budget = getCurrentBudget();
  if (!budget || recorrentes.length === 0) return;
  const today = isoDate();
  for (const rec of recorrentes) {
    if (!rec?.id || rec.ativa === false) continue;
    const key = `recorrenteReminder:lastSent:${rec.id}:${today}`;
    if (localStorage.getItem(key)) continue; // já lembrado hoje
    try {
      const status = await calcStatusRecorrente(rec);
      if (status && status.foiEfetivadaEsteMes === false) {
        await sendRecorrenteReminder(rec);
        localStorage.setItem(key, Date.now().toString());
        console.log('[NotificationTriggers] Lembrete enviado para recorrente', rec.id);
      }
    } catch (e) { console.warn('[NotificationTriggers] Erro processamento recorrente', rec.id, e); }
  }
}

function summarizeTransactionsLastWeek() {
  const txs = window.appState?.transactions || [];
  if (!Array.isArray(txs) || txs.length === 0) return null;
  const now = new Date();
  // Considerar semana ISO anterior completa (segunda-domingo). Se hoje for segunda, sumarizar semana passada.
  const day = now.getDay(); // 0=Domingo
  // Encontrar segunda desta semana
  const diffToMonday = ((day + 6) % 7); // dias desde segunda
  const mondayThisWeek = new Date(now);
  mondayThisWeek.setHours(0,0,0,0);
  mondayThisWeek.setDate(mondayThisWeek.getDate() - diffToMonday);
  // Semana alvo é a anterior
  const mondayPrev = new Date(mondayThisWeek);
  mondayPrev.setDate(mondayPrev.getDate() - 7);
  const sundayPrev = new Date(mondayPrev);
  sundayPrev.setDate(sundayPrev.getDate() + 6);
  sundayPrev.setHours(23,59,59,999);

  const inRange = txs.filter(t => {
    let d;
    if (t.createdAt?.seconds) d = new Date(t.createdAt.seconds * 1000);
    else if (t.createdAt) d = new Date(t.createdAt);
    else return false;
    return d >= mondayPrev && d <= sundayPrev;
  });
  if (inRange.length === 0) return null;
  let totalDespesas = 0, totalReceitas = 0;
  inRange.forEach(t => {
    const val = Number(t.valor) || 0;
    if (t.tipo === 'receita') totalReceitas += val; else totalDespesas += val;
  });
  const resumo = `Semana anterior: Receitas R$ ${totalReceitas.toFixed(2)} | Despesas R$ ${totalDespesas.toFixed(2)} | Saldo R$ ${(totalReceitas-totalDespesas).toFixed(2)}`;
  const periodo = `${mondayPrev.toLocaleDateString('pt-BR')} - ${sundayPrev.toLocaleDateString('pt-BR')}`;
  return { resumo, periodo };
}

async function processWeeklySummary() {
  if (!canRunWeeklySummary()) return;
  const budget = getCurrentBudget();
  const user = getCurrentUser();
  if (!budget || !user) return;
  const now = new Date();
  const weekday = now.getDay(); // 1 = segunda
  // Enviar na segunda depois das 08:00
  if (weekday !== 1 || now.getHours() < 8) return;
  const weekKey = getWeekKey(new Date(now.getTime() - 7*86400000)); // semana anterior
  const storageKey = `weeklySummary:lastSent:${budget.id}:${weekKey}`;
  if (localStorage.getItem(storageKey)) return; // já enviado
  const summary = summarizeTransactionsLastWeek();
  if (!summary) return;
  await sendWeeklySummary(summary);
  localStorage.setItem(storageKey, Date.now().toString());
  console.log('[NotificationTriggers] Resumo semanal enviado', weekKey);
}

async function runAllChecks() {
  try { await processRecurringReminders(); } catch {}
  try { await processWeeklySummary(); } catch {}
}

function setupIntervals() {
  if (window.__notificationIntervalsSetup) return;
  window.__notificationIntervalsSetup = true;
  // Checar a cada 1 hora
  setInterval(runAllChecks, 60 * 60 * 1000);
  // Primeira execução atrasada alguns segundos para garantir dados carregados
  setTimeout(runAllChecks, 8000);
}

function onDataUpdated() {
  // Executa uma checagem rápida quando transações ou recorrentes são atualizadas
  setTimeout(runAllChecks, 2000);
}

export function initializeNotificationSchedulers() {
  if (initialized) return;
  initialized = true;
  console.log('[NotificationTriggers] Inicializando schedulers de notificações');
  setupIntervals();
  eventBus.on('transactions:updated', onDataUpdated);
  eventBus.on('recorrentes:updated', onDataUpdated);
}

// Auto-init se possível (após algum delay para bootstrap)
setTimeout(() => {
  try { initializeNotificationSchedulers(); } catch {}
}, 5000);

// Expor global para debug/manual
window.initializeNotificationSchedulers = initializeNotificationSchedulers;

// src/js/config/SettingsPage.js

import { generateSettingsHTML } from './settings.ui.js';

import * as service from './settings.service.js';
import { eventBus } from '@core/events/eventBus.js';

/**
 * Função principal para renderizar a página de configurações.
 * Orquestra a busca de dados, a geração de HTML e a vinculação de eventos.
 */
export async function renderSettings() {
    const content = document.getElementById('app-content');
    if (!content) {
        console.warn('⚠️ SettingsPage: elemento #app-content não encontrado');
        return;
    }

    try {
        // Remover event listeners antigos do botão de tema antes de renderizar
        const btn = document.getElementById('toggle-theme-btn');
        if (btn) {
            const newBtn = btn.cloneNode(true);
            btn.parentNode.replaceChild(newBtn, btn);
        }
        // 1. Coletar estado atual da aplicação
        const { currentUser, currentBudget, budgets = [] } = window.appState || {};

        // 2. Buscar dados adicionais necessários para a página
        const [pendingInvitations, sentInvitations, usersWithAccess, ownerInfo] = await Promise.all([
            currentUser ? service.loadBudgetInvitations(currentUser.uid) : [],
            currentBudget ? service.loadSentBudgetInvitations(currentBudget.id) : [],
            currentBudget ? service.fetchUsersInfo([...new Set([currentBudget.userId, ...(currentBudget.usuariosPermitidos || [])])]) : [],
            currentBudget ? service.fetchUserInfo(currentBudget.userId) : null
        ]);

        const ownerDisplay = ownerInfo?.email || ownerInfo?.displayName || 'Proprietário';

        // 3. Montar o objeto de estado completo para a UI
        const viewState = {
            currentUser,
            currentBudget,
            budgets,
            usersWithAccess: usersWithAccess.filter(u => u.uid !== currentBudget?.userId),
            ownerDisplay,
            pendingInvitations,
            sentInvitations,
            appVersion: 'v4.41.0', // Versão atual
            hasNewChangelog: true, // Exemplo
            lastUpdateLabel: '16/09/2025', // Data da última atualização
            txChunkOverride: localStorage.getItem('txChunkSize') || '',
            perfEnabled: false // Exemplo
        };

        // 4. Gerar o HTML usando o módulo de UI
        content.innerHTML = generateSettingsHTML(viewState);

        // 5. Anexar manipuladores de eventos dinâmicos ao container (com fallback)
        try {
            console.log('[DEBUG] Verificando attachDynamicHandlers:', typeof window.attachDynamicHandlers);
            if (typeof window.attachDynamicHandlers === 'function') {
                console.log('[DEBUG] Chamando attachDynamicHandlers para content:', content);
                window.attachDynamicHandlers(content);
                console.log('[DEBUG] attachDynamicHandlers executado com sucesso');
            } else {
                console.warn('[SettingsPage] attachDynamicHandlers ausente; cliques delegados podem não funcionar');
            }
        } catch (e) {
            console.warn('[SettingsPage] Erro ao executar attachDynamicHandlers:', e);
        }

        // 6. Configurar handlers globais (se necessário para compatibilidade) com fallback
        try {
            console.log('[DEBUG] Verificando setupGlobalHandlers:', typeof window.setupGlobalHandlers);
            if (typeof window.setupGlobalHandlers === 'function') {
                console.log('[DEBUG] Chamando setupGlobalHandlers...');
                window.setupGlobalHandlers();
                console.log('[DEBUG] setupGlobalHandlers executado com sucesso');
            } else {
                console.warn('[SettingsPage] setupGlobalHandlers ausente; prosseguindo sem inicialização adicional');
            }
        } catch (e) {
            console.warn('[SettingsPage] Erro ao executar setupGlobalHandlers:', e);
        }

        // 7. Lógica pós-renderização (ex: inicializar tema, etc.)
        postRenderSetup();

    } catch (error) {
        console.error("☠️ Falha catastrófica ao renderizar SettingsPage:", error);
        content.innerHTML = `<div class="empty-state"><div class="empty-icon">☠️</div><div class="empty-text">Erro ao carregar configurações</div><div class="empty-description">${error.message}</div></div>`;
    }
}

/**
 * Executa tarefas após a renderização do HTML.
 */
function postRenderSetup() {
    // Inicializar tema, verificar deep links, etc.
    try {
        if (window.initializeTheme) {
            window.initializeTheme();
        }

        // Conectar botões da seção Sobre o App às funções globais
        // NOTA: check-updates-btn é tratado pelo settings.handlers.js
        const btnMap = [
            { id: 'help-support-btn', fn: window.openHelp },
            { id: 'rate-app-btn', fn: window.rateApp },
            { id: 'copy-info-btn', fn: window.copyAppInfo },
            { id: 'clear-cache-btn', fn: window.clearOfflineCache },
            { id: 'whats-new-btn', fn: window.showWhatsNew },
            { id: 'install-app-btn', fn: window.installApp }
        ];
        btnMap.forEach(({ id, fn }) => {
            const el = document.getElementById(id);
            if (el && typeof fn === 'function') {
                el.onclick = fn;
            }
        });

        // Forçar id correto no botão de tema
        let btn = document.getElementById('toggle-theme-btn') || document.getElementById('theme-toggle-btn');
        if (btn) {
            btn.id = 'theme-toggle-btn';
            const newBtn = btn.cloneNode(true);
            btn.parentNode.replaceChild(newBtn, btn);
            btn = newBtn;
        }
        // Conectar handler global diretamente
        import('@features/theme/ThemeService.js').then(mod => {
            if (typeof mod.setupThemeToggle === 'function') {
                mod.setupThemeToggle('theme-toggle-btn');
                console.log('[DEBUG] setupThemeToggle conectado ao botão #theme-toggle-btn');
            } else {
                console.warn('[DEBUG] setupThemeToggle não encontrado no módulo global');
            }
        });
    } catch(e) {
        console.warn('Falha no setup pós-renderização', e);
    }

    // Handlers para switches de notificações
    const switches = [
        { id: 'limit-alerts-toggle', key: 'noti_limit_alerts', label: 'Alertas de Limite' },
        { id: 'recurring-reminders-toggle', key: 'noti_recurring_reminders', label: 'Lembretes de Recorrentes' },
        { id: 'weekly-summary-toggle', key: 'noti_weekly_summary', label: 'Resumo Semanal' }
    ];
    switches.forEach(({ id, key, label }) => {
        const el = document.getElementById(id);
        if (el) {
            // Estado inicial do localStorage
            const saved = localStorage.getItem(key);
            if (saved !== null) el.checked = saved === 'true';
            el.addEventListener('change', () => {
                localStorage.setItem(key, el.checked);
                if (window.Snackbar) {
                    window.Snackbar.success(`${label} ${el.checked ? 'ativado' : 'desativado'}`);
                } else {
                    console.log(`[Notificações] ${label}:`, el.checked);
                }
            });
        }
    });
}


// Ouve eventos para re-renderizar a página quando necessário
eventBus.on('auth:changed', () => rerenderSettingsIfVisible());
eventBus.on('budget:changed', () => rerenderSettingsIfVisible());
eventBus.on('invitation:changed', () => rerenderSettingsIfVisible());

function rerenderSettingsIfVisible() {
    if (window.location.hash.startsWith('#/settings')) {
        renderSettings();
    }
}

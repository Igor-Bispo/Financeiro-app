// Interface básica para orçamentos compartilhados
// Requer BudgetManager instanciado em window.BudgetManager

console.log('[budgets-ui] Script budgets-ui.js carregado');

(function() {
    if (!window.BudgetManager) {
        console.error('BudgetManager não encontrado!');
        return;
    }

    let container, selectBudget, btnNewBudget, membersList, addMemberInput, addMemberBtn;
    let mounted = false;

    function createUI() {
        if (mounted) return;
        const parent = document.getElementById('orcamento-config-container');
        if (!parent) return;
        container = document.createElement('div');
        container.className = 'budget-ui-container';
        container.style.background = '#fff';
        container.style.border = '1px solid #e5e7eb';
        container.style.borderRadius = '8px';
        container.style.margin = '0 0 24px 0';
        container.style.maxWidth = '480px';
        container.style.padding = '16px';
        container.style.boxShadow = '0 2px 8px rgba(0,0,0,0.04)';
        container.innerHTML = `
            <h3 style="margin-bottom:8px;">Orçamentos Compartilhados</h3>
            <div style="margin-bottom:8px;">
                <label>Selecione um orçamento:</label>
                <select id="budget-select"></select>
                <button id="btn-new-budget">Novo Orçamento</button>
            </div>
            <button id="btn-sair-orcamento" style="background:#ef4444;color:#fff;padding:7px 16px;border:none;border-radius:6px;cursor:pointer;font-weight:500;margin-bottom:12px;">Sair do orçamento</button>
            <div id="orcamento-id-info" style="margin-bottom:8px;display:none;"></div>
            <div style="margin-bottom:12px;">
                <label>Entrar em um orçamento existente:</label>
                <div style="display:flex;gap:8px;align-items:center;">
                  <input type="text" id="input-budget-id" placeholder="Cole o ID do orçamento" style="flex:1;padding:6px 10px;border:1px solid #ddd;border-radius:6px;">
                  <button id="btn-entrar-orcamento" style="background:#6366f1;color:#fff;padding:7px 16px;border:none;border-radius:6px;cursor:pointer;font-weight:500;">Entrar</button>
                </div>
            </div>
            <div id="user-uid-info" style="margin-bottom:12px;display:none;"></div>
            <div id="budget-members-section" style="margin-top:10px;display:none;">
                <h4 style="margin-bottom:4px;">Compartilhar orçamento</h4>
                <div style="display:flex;gap:8px;align-items:center;margin-bottom:8px;">
                  <input type="text" id="add-member-input" placeholder="UID do membro" style="flex:1;padding:6px 10px;border:1px solid #ddd;border-radius:6px;">
                  <button id="add-member-btn" style="background:#4f46e5;color:#fff;padding:7px 16px;border:none;border-radius:6px;cursor:pointer;font-weight:500;">Adicionar</button>
                </div>
                <div style="margin-bottom:4px;font-size:13px;color:#666;">Membros atuais:</div>
                <ul id="budget-members-list" style="display:flex;flex-wrap:wrap;gap:8px;"></ul>
            </div>
            <div id="new-budget-section" style="display:none;margin-top:10px;">
                <h4>Novo Orçamento</h4>
                <input type="text" id="new-budget-name" placeholder="Nome do orçamento">
                <input type="text" id="new-budget-members" placeholder="UIDs dos membros separados por vírgula">
                <button id="create-budget-btn">Criar</button>
                <button id="cancel-new-budget">Cancelar</button>
            </div>
        `;
        parent.appendChild(container);
        mounted = true;
        console.log('[budgets-ui] UI montada na aba Config');

        selectBudget = container.querySelector('#budget-select');
        btnNewBudget = container.querySelector('#btn-new-budget');
        membersList = container.querySelector('#budget-members-list');
        addMemberInput = container.querySelector('#add-member-input');
        addMemberBtn = container.querySelector('#add-member-btn');

        // Eventos
        selectBudget.addEventListener('change', onSelectBudget);
        btnNewBudget.addEventListener('click', showNewBudgetSection);
        addMemberBtn.addEventListener('click', onAddMember);
        container.querySelector('#create-budget-btn').addEventListener('click', onCreateBudget);
        container.querySelector('#cancel-new-budget').addEventListener('click', hideNewBudgetSection);
        container.querySelector('#btn-entrar-orcamento').addEventListener('click', onEntrarOrcamento);
        container.querySelector('#btn-sair-orcamento').onclick = function() {
            if (window.sairDoOrcamento) window.sairDoOrcamento();
        };

        // Novo: mostrar UID do usuário logado
        showUserUidInfo();
        // Evento para mostrar ID do orçamento selecionado
        selectBudget.addEventListener('change', () => {
            onSelectBudget();
            showBudgetIdInfo();
        });
        // Mostrar ID do orçamento ao montar
        showBudgetIdInfo();
    }

    function destroyUI() {
        if (container && container.parentNode) {
            container.parentNode.removeChild(container);
            container = null;
            mounted = false;
        }
    }

    async function loadBudgets() {
        if (!mounted) return;
        const budgets = await window.BudgetManager.getBudgets();
        selectBudget.innerHTML = '';
        budgets.forEach(b => {
            const opt = document.createElement('option');
            opt.value = b.id;
            opt.textContent = (b.name || b.categoryName || b.id) + ` (ID: ${b.id})`;
            selectBudget.appendChild(opt);
        });
        if (budgets.length > 0) {
            selectBudget.value = window.ActiveBudgetId || budgets[0].id;
            setActiveBudget(selectBudget.value);
        }
        showBudgetIdInfo();
    }

    function onSelectBudget() {
        setActiveBudget(selectBudget.value);
    }

    function setActiveBudget(budgetId) {
        if (window.setActiveBudget) {
            window.setActiveBudget(budgetId);
        } else {
            window.ActiveBudgetId = budgetId;
        }
        showMembers(budgetId);
        if (typeof carregarCategoriasFirestore === 'function') carregarCategoriasFirestore();
        if (typeof carregarTransacoesFirestore === 'function') carregarTransacoesFirestore();
        document.dispatchEvent(new CustomEvent('budgetchange', { detail: { budgetId } }));
    }

    async function showMembers(budgetId) {
        const budget = await window.BudgetManager.getBudgetById(budgetId);
        const section = container.querySelector('#budget-members-section');
        if (!budget) {
            section.style.display = 'none';
            return;
        }
        section.style.display = 'block';
        membersList.innerHTML = '';
        (budget.members || []).forEach(uid => {
            const li = document.createElement('li');
            li.textContent = uid;
            li.style.background = '#f3f4f6';
            li.style.padding = '4px 10px';
            li.style.borderRadius = '6px';
            li.style.fontSize = '13px';
            li.style.display = 'flex';
            li.style.alignItems = 'center';
            li.style.gap = '6px';
            const rmBtn = document.createElement('button');
            rmBtn.textContent = 'Remover';
            rmBtn.style.background = '#ef4444';
            rmBtn.style.color = '#fff';
            rmBtn.style.border = 'none';
            rmBtn.style.borderRadius = '4px';
            rmBtn.style.padding = '2px 8px';
            rmBtn.style.fontSize = '12px';
            rmBtn.style.cursor = 'pointer';
            rmBtn.onclick = async () => {
                await window.BudgetManager.removeMemberFromBudget(budgetId, uid);
                showMembers(budgetId);
            };
            li.appendChild(rmBtn);
            membersList.appendChild(li);
        });
    }

    async function onAddMember() {
        const budgetId = selectBudget.value;
        const uid = addMemberInput.value.trim();
        if (!uid) return;
        await window.BudgetManager.addMemberToBudget(budgetId, uid);
        addMemberInput.value = '';
        showMembers(budgetId);
    }

    function showNewBudgetSection() {
        container.querySelector('#new-budget-section').style.display = 'block';
    }
    function hideNewBudgetSection() {
        container.querySelector('#new-budget-section').style.display = 'none';
    }

    async function onCreateBudget() {
        const name = container.querySelector('#new-budget-name').value.trim();
        const membersStr = container.querySelector('#new-budget-members').value.trim();
        const members = membersStr ? membersStr.split(',').map(s => s.trim()).filter(Boolean) : [];
        const id = await window.BudgetManager.addBudget({ name, members });
        hideNewBudgetSection();
        await loadBudgets();
        if (id) setActiveBudget(id);
    }

    async function onEntrarOrcamento() {
        const input = container.querySelector('#input-budget-id');
        const budgetId = input.value.trim();
        if (!budgetId) return alert('Informe o ID do orçamento');
        const user = window.FirebaseAuth && window.FirebaseAuth.currentUser;
        if (!user) return alert('Faça login primeiro!');
        try {
            const doc = await window.FirebaseDB.collection('budgets').doc(budgetId).get();
            if (!doc.exists) return alert('Orçamento não encontrado!');
            const data = doc.data();
            let members = Array.isArray(data.members) ? data.members : [];
            if (members.includes(user.uid)) return alert('Você já é membro deste orçamento!');
            members = [...members, user.uid];
            await window.FirebaseDB.collection('budgets').doc(budgetId).update({ members });
            alert('Você entrou no orçamento com sucesso!');
            input.value = '';
            if (window.reloadBudgetsUI) window.reloadBudgetsUI();
        } catch (err) {
            console.error('Erro ao entrar no orçamento:', err);
            alert('Erro ao entrar no orçamento: ' + (err.message || err));
        }
    }

    // Montar/desmontar UI ao trocar de aba
    function onSectionChange() {
        const configSection = document.getElementById('config-section');
        if (configSection && configSection.classList.contains('active')) {
            console.log('[budgets-ui] Montando UI de orçamento na aba Config');
            createUI();
            loadBudgets();
        } else {
            destroyUI();
        }
    }

    // Detectar troca de aba
    document.addEventListener('sectionchange', onSectionChange);
    // Chamar ao iniciar (garantir montagem imediata se já estiver na aba Config)
    window.addEventListener('DOMContentLoaded', onSectionChange);
    setTimeout(onSectionChange, 0);

    // Forçar montagem ao clicar na aba Config
    const configBtn = document.querySelector('.nav-item[data-section="config"]');
    if (configBtn) {
        configBtn.addEventListener('click', () => {
            setTimeout(onSectionChange, 100);
        });
    }

    window.reloadBudgetsUI = function() {
        if (mounted) loadBudgets();
    };

    // Exibir ID do orçamento selecionado e botão copiar
    function showBudgetIdInfo() {
        const infoDiv = container.querySelector('#orcamento-id-info');
        if (!infoDiv) return;
        const select = container.querySelector('#budget-select');
        const budgetId = select && select.value;
        if (!budgetId) {
            infoDiv.style.display = 'none';
            return;
        }
        infoDiv.style.display = 'block';
        infoDiv.innerHTML = `
            <span style="font-size:13px;color:#444;">ID do orçamento selecionado:</span>
            <span style="font-family:monospace;font-size:13px;background:#f3f4f6;padding:2px 8px;border-radius:6px;">${budgetId}</span>
            <button id="btn-copiar-budget-id" style="margin-left:8px;padding:2px 8px;font-size:12px;cursor:pointer;">Copiar</button>
        `;
        const btnCopiar = infoDiv.querySelector('#btn-copiar-budget-id');
        btnCopiar.onclick = () => {
            navigator.clipboard.writeText(budgetId);
            btnCopiar.textContent = 'Copiado!';
            setTimeout(() => btnCopiar.textContent = 'Copiar', 1200);
        };
    }
    // Exibir UID do usuário logado e botão copiar
    function showUserUidInfo() {
        const infoDiv = container.querySelector('#user-uid-info');
        if (!infoDiv) return;
        const user = window.FirebaseAuth && window.FirebaseAuth.currentUser;
        if (!user) {
            infoDiv.style.display = 'none';
            return;
        }
        infoDiv.style.display = 'block';
        infoDiv.innerHTML = `
            <span style="font-size:13px;color:#444;">Seu UID (compartilhe para ser adicionado):</span>
            <span style="font-family:monospace;font-size:13px;background:#f3f4f6;padding:2px 8px;border-radius:6px;">${user.uid}</span>
            <button id="btn-copiar-uid" style="margin-left:8px;padding:2px 8px;font-size:12px;cursor:pointer;">Copiar</button>
        `;
        const btnCopiar = infoDiv.querySelector('#btn-copiar-uid');
        btnCopiar.onclick = () => {
            navigator.clipboard.writeText(user.uid);
            btnCopiar.textContent = 'Copiado!';
            setTimeout(() => btnCopiar.textContent = 'Copiar', 1200);
        };
    }
})(); 
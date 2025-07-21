import{initializeApp as J}from"https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";import{getAuth as W,setPersistence as K,browserLocalPersistence as Q,signOut as Y,GoogleAuthProvider as Z,signInWithPopup as ee}from"https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";import{getFirestore as te,doc as E,getDocs as I,query as S,collection as g,addDoc as R,serverTimestamp as $,updateDoc as N,deleteDoc as P,where as b,onSnapshot as oe}from"https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const e of r.addedNodes)e.tagName==="LINK"&&e.rel==="modulepreload"&&s(e)}).observe(document,{childList:!0,subtree:!0});function a(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerPolicy&&(r.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?r.credentials="include":i.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(i){if(i.ep)return;i.ep=!0;const r=a(i);fetch(i.href,r)}})();const ae={apiKey:"AIzaSyCbBmmxn4Qj4CU6ymfG4MY5VGqCPSo13HY",authDomain:"controle-financeiro-b98ec.firebaseapp.com",projectId:"controle-financeiro-b98ec",storageBucket:"controle-financeiro-b98ec.firebasestorage.app",messagingSenderId:"418109336597",appId:"1:418109336597:web:871b262a76e57455ebb21c",measurementId:"G-7RW2F269V6"},q=J(ae),l=W(q),p=te(q);K(l,Q);window.FirebaseApp=q;window.FirebaseAuth=l;window.FirebaseDB=p;window.appState={currentUser:null,transactions:[],categories:[],budgets:[],currentBudget:null};function D(o){const t=document.getElementById("login-page"),a=document.querySelector(".app-container");o?(t&&(t.style.display="flex",document.body.classList.add("login-open")),a&&(a.style.display="none")):(t&&(t.style.display="none",document.body.classList.remove("login-open")),a&&(a.style.display="block"))}async function w(){const o=document.querySelector(".nav-item.active")?.getAttribute("data-tab");if(o)switch(o){case"dashboard":await h(),await y(),await T(),C();break;case"transactions":await h(),L();break;case"categories":await y(),G();break;case"settings":await T(),X();break}}async function U(o){try{const t=l.currentUser;if(!t)throw new Error("Usuário não autenticado");const a=window.appState.currentBudget?.id;if(!a)throw new Error("Nenhum orçamento selecionado");return(await R(g(p,"transactions"),{...o,userId:t.uid,budgetId:a,createdAt:$()})).id}catch(t){throw console.error("Erro ao adicionar transação:",t),t}}async function re(o,t){try{if(!l.currentUser)throw new Error("Usuário não autenticado");await N(E(p,"transactions",o),{...t,updatedAt:$()})}catch(a){throw console.error("Erro ao atualizar transação:",a),a}}async function se(o){try{if(!l.currentUser)throw new Error("Usuário não autenticado");await P(E(p,"transactions",o))}catch(t){throw console.error("Erro ao excluir transação:",t),t}}async function h(){try{const o=l.currentUser;if(!o)return;const t=S(g(p,"transactions"),b("userId","==",o.uid),b("budgetId","==",window.appState.currentBudget?.id)),a=await I(t);window.appState.transactions=a.docs.map(s=>({id:s.id,...s.data()}))}catch(o){console.error("Erro ao carregar transações:",o)}}async function O(o){try{const t=l.currentUser;if(!t)throw new Error("Usuário não autenticado");const a=await R(g(p,"categories"),{...o,userId:t.uid,budgetId:window.appState.currentBudget?.id,createdAt:$()});return await w(),a.id}catch(t){throw console.error("Erro ao adicionar categoria:",t),t}}async function ie(o,t){try{if(!l.currentUser)throw new Error("Usuário não autenticado");await N(E(p,"categories",o),{...t,updatedAt:$()}),await w()}catch(a){throw console.error("Erro ao atualizar categoria:",a),a}}async function ne(o){try{if(!l.currentUser)throw new Error("Usuário não autenticado");await P(E(p,"categories",o)),await w()}catch(t){throw console.error("Erro ao excluir categoria:",t),t}}async function y(){try{const o=l.currentUser;if(!o)return;const t=S(g(p,"categories"),b("userId","==",o.uid),b("budgetId","==",window.appState.currentBudget?.id)),a=await I(t);window.appState.categories=a.docs.map(s=>({id:s.id,...s.data()}))}catch(o){console.error("Erro ao carregar categorias:",o)}}async function V(o){try{const t=l.currentUser;if(!t)throw new Error("Usuário não autenticado");const a=await R(g(p,"budgets"),{...o,userId:t.uid,createdAt:$()});return await w(),a.id}catch(t){throw console.error("Erro ao adicionar orçamento:",t),t}}async function T(){try{const o=l.currentUser;if(!o)return;const t=S(g(p,"budgets"),b("userId","==",o.uid)),a=await I(t);window.appState.budgets=a.docs.map(s=>({id:s.id,...s.data()}))}catch(o){console.error("Erro ao carregar orçamentos:",o)}}function B(o){let t=document.getElementById("page-subtitle");if(!t){t=document.createElement("div"),t.id="page-subtitle",t.className="text-xs md:text-base font-semibold text-gray-500 mb-2 md:mb-4";const a=document.querySelector(".app-header");a&&a.parentNode&&a.insertAdjacentElement("afterend",t)}t.textContent=o}function C(){const o=document.getElementById("app-content");if(!o)return;B("Dashboard");const t=window.appState.transactions.filter(e=>e.tipo==="receita").reduce((e,n)=>e+parseFloat(n.valor),0),a=window.appState.transactions.filter(e=>e.tipo==="despesa").reduce((e,n)=>e+parseFloat(n.valor),0),s=t-a,r=window.appState.categories.reduce((e,n)=>e+parseFloat(n.limite||0),0)-a;o.innerHTML=`
    <div class="grid gap-4 md:gap-6">
      <!-- Cards de Resumo -->
      <div class="grid grid-cols-4 gap-1 md:gap-4">
        <div class="bg-gradient-to-r from-green-500 to-green-600 text-white p-1.5 md:p-6 rounded-xl shadow-lg flex flex-col items-center justify-center">
          <h3 class="text-xs md:text-lg font-semibold mb-0.5 md:mb-2">Receitas</h3>
          <p class="text-sm md:text-3xl font-bold">R$ ${t.toFixed(2)}</p>
        </div>
        <div class="bg-gradient-to-r from-red-500 to-red-600 text-white p-1.5 md:p-6 rounded-xl shadow-lg flex flex-col items-center justify-center">
          <h3 class="text-xs md:text-lg font-semibold mb-0.5 md:mb-2">Despesas</h3>
          <p class="text-sm md:text-3xl font-bold">R$ ${a.toFixed(2)}</p>
        </div>
        <div class="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-1.5 md:p-6 rounded-xl shadow-lg flex flex-col items-center justify-center">
          <h3 class="text-xs md:text-lg font-semibold mb-0.5 md:mb-2">Saldo</h3>
          <p class="text-sm md:text-3xl font-bold">R$ ${s.toFixed(2)}</p>
        </div>
        <div class="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white p-1.5 md:p-6 rounded-xl shadow-lg flex flex-col items-center justify-center">
          <h3 class="text-xs md:text-lg font-semibold mb-0.5 md:mb-2">Orçado</h3>
          <p class="text-sm md:text-3xl font-bold">R$ ${r.toFixed(2)}</p>
        </div>
      </div>
      <!-- Categorias com Progresso -->
      <div class="bg-white rounded-xl shadow-lg p-2 md:p-6">
        <h3 class="text-base md:text-xl font-bold mb-2 md:mb-4">Categorias</h3>
        <div class="space-y-2 md:space-y-4">
          ${window.appState.categories.map(e=>{const c=window.appState.transactions.filter(F=>F.categoriaId===e.id&&F.tipo==="despesa").reduce((F,_)=>F+parseFloat(_.valor),0),d=parseFloat(e.limite||0),u=d>0?c/d*100:0,f=d-c;return`
              <div class="border rounded-lg p-2 md:p-4">
                <div class="flex justify-between items-center mb-1 md:mb-2">
                  <div class="flex items-center space-x-2 md:space-x-3">
                    <div class="w-4 h-4 rounded-full" style="background-color: ${e.cor||"#4F46E5"}"></div>
                    <span class="font-semibold text-xs md:text-base">${e.nome}</span>
                  </div>
                  <div class="text-right">
                    <p class="text-xs md:text-sm text-gray-600">R$ ${c.toFixed(2)} / R$ ${d.toFixed(2)}</p>
                    <p class="text-xs md:text-sm ${f>=0?"text-green-600":"text-red-600"}">
                      Saldo: R$ ${f.toFixed(2)}
                    </p>
                  </div>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-2 md:h-3 mb-1 md:mb-2">
                  <div class="h-2 md:h-3 rounded-full transition-all duration-300 ${u>100?"bg-red-500":u>80?"bg-yellow-500":"bg-green-500"}" style="width: ${Math.min(u,100)}%"></div>
                </div>
                <div class="flex flex-wrap justify-end gap-1 md:space-x-2">
                  <button onclick="editCategory('${e.id}')" class="text-blue-600 hover:text-blue-800 text-xs md:text-sm px-2 py-1 md:px-3 md:py-1 rounded">Editar</button>
                  <button onclick="deleteCategory('${e.id}')" class="text-red-600 hover:text-red-800 text-xs md:text-sm px-2 py-1 md:px-3 md:py-1 rounded">Excluir</button>
                  <button onclick="showCategoryHistory('${e.id}')" class="text-gray-600 hover:text-gray-800 text-xs md:text-sm px-2 py-1 md:px-3 md:py-1 rounded">Histórico</button>
                </div>
              </div>
            `}).join("")}
        </div>
      </div>
      <!-- Transações Recentes -->
      <div class="bg-white rounded-xl shadow-lg p-2 md:p-6">
        <div class="flex flex-wrap justify-between items-center mb-2 md:mb-4 gap-1 md:gap-0">
          <h3 class="text-base md:text-xl font-bold">Transações Recentes</h3>
          <button onclick="showAddTransactionModal()" class="bg-blue-500 text-white px-2 py-1 md:px-4 md:py-2 rounded-lg hover:bg-blue-600 text-xs md:text-base">
            + Nova Transação
          </button>
        </div>
        <div class="space-y-2 md:space-y-3">
          ${window.appState.transactions.slice(0,10).map(e=>{const n=window.appState.categories.find(c=>c.id===e.categoriaId);return`
              <div class="flex flex-wrap justify-between items-center p-2 md:p-3 border rounded-lg hover:bg-gray-50 gap-1 md:gap-0">
                <div class="flex-1 min-w-[120px]">
                  <p class="font-medium text-xs md:text-base">${e.descricao}</p>
                  <p class="text-xs md:text-sm text-gray-500">${n?.nome||"Sem categoria"} • ${e.createdAt&&e.createdAt.toDate?e.createdAt.toDate().toLocaleDateString():""}</p>
                </div>
                <div class="flex items-center space-x-1 md:space-x-2">
                  <span class="font-bold text-xs md:text-base ${e.tipo==="receita"?"text-green-600":"text-red-600"}">
                    ${e.tipo==="receita"?"+":"-"}R$ ${parseFloat(e.valor).toFixed(2)}
                  </span>
                  <button onclick="editTransaction('${e.id}')" class="text-blue-600 hover:text-blue-800 text-xs md:text-base">✏️</button>
                  <button onclick="deleteTransaction('${e.id}')" class="text-red-600 hover:text-red-800 text-xs md:text-base">🗑️</button>
                </div>
              </div>
            `}).join("")}
        </div>
      </div>
    </div>
  `}function L(){const o=document.getElementById("app-content");B("Transações"),o.innerHTML=`
    <div class="space-y-2 md:space-y-6">
      <div class="flex flex-wrap justify-between items-center gap-1 md:gap-0">
        <h2 class="text-base md:text-2xl font-bold">Todas as Transações</h2>
        <button onclick="showAddTransactionModal()" class="bg-blue-500 text-white px-2 py-1 md:px-6 md:py-3 rounded-lg hover:bg-blue-600 flex items-center space-x-2 text-xs md:text-base">
          <span>+ Nova Transação</span>
          <button onclick="startVoiceRecognition('transaction')" class="ml-2 bg-blue-600 p-1 md:p-2 rounded-full text-xs md:text-base">🎤</button>
        </button>
      </div>
      <div class="bg-white rounded-xl shadow-lg">
        ${window.appState.transactions.length===0?`
          <div class="p-4 md:p-8 text-center text-gray-500">
            <p class="text-base md:text-lg">Nenhuma transação encontrada</p>
            <p class="text-xs md:text-sm">Adicione sua primeira transação!</p>
          </div>
        `:window.appState.transactions.map(t=>{const a=window.appState.categories.find(s=>s.id===t.categoriaId);return`
            <div class="flex flex-wrap justify-between items-center p-2 md:p-4 border-b last:border-b-0 hover:bg-gray-50 gap-1 md:gap-0">
              <div class="flex-1 min-w-[120px]">
                <p class="font-medium text-xs md:text-lg">${t.descricao}</p>
                <p class="text-xs md:text-sm text-gray-500">${a?.nome||"Sem categoria"} • ${t.createdAt&&t.createdAt.toDate?t.createdAt.toDate().toLocaleDateString():""}</p>
              </div>
              <div class="flex items-center space-x-1 md:space-x-3">
                <span class="font-bold text-xs md:text-lg ${t.tipo==="receita"?"text-green-600":"text-red-600"}">
                  ${t.tipo==="receita"?"+":"-"}R$ ${parseFloat(t.valor).toFixed(2)}
                </span>
                <button onclick="editTransaction('${t.id}')" class="bg-blue-100 text-blue-600 px-2 py-1 md:px-3 md:py-1 rounded-lg hover:bg-blue-200 text-xs md:text-base">Editar</button>
                <button onclick="deleteTransaction('${t.id}')" class="bg-red-100 text-red-600 px-2 py-1 md:px-3 md:py-1 rounded-lg hover:bg-red-200 text-xs md:text-base">Excluir</button>
              </div>
            </div>
          `}).join("")}
      </div>
    </div>
  `}function G(){const o=document.getElementById("app-content");B("Categorias"),o.innerHTML=`
    <div class="space-y-2 md:space-y-6">
      <div class="flex flex-wrap justify-between items-center gap-1 md:gap-0">
        <h2 class="text-base md:text-2xl font-bold">Categorias</h2>
        <button onclick="showAddCategoryModal()" class="bg-blue-500 text-white px-2 py-1 md:px-6 md:py-3 rounded-lg hover:bg-blue-600 flex items-center space-x-2 text-xs md:text-base">
          <span>+ Nova Categoria</span>
          <button onclick="startVoiceRecognition('category')" class="ml-2 bg-blue-600 p-1 md:p-2 rounded-full text-xs md:text-base">🎤</button>
        </button>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-6">
        ${window.appState.categories.map(t=>{const s=window.appState.transactions.filter(n=>n.categoriaId===t.id&&n.tipo==="despesa").reduce((n,c)=>n+parseFloat(c.valor),0),i=parseFloat(t.limite||0),r=i>0?s/i*100:0,e=i-s;return`
            <div class="bg-white rounded-xl shadow-lg p-2 md:p-6">
              <div class="flex items-center justify-between mb-2 md:mb-4">
                <div class="flex items-center space-x-2 md:space-x-3">
                  <div class="w-6 h-6 rounded-full" style="background-color: ${t.cor||"#4F46E5"}"></div>
                  <span class="font-bold text-xs md:text-lg">${t.nome}</span>
                </div>
                <div class="text-right">
                  <p class="text-xs md:text-sm text-gray-600">Limite: R$ ${i.toFixed(2)}</p>
                  <p class="text-xs md:text-sm ${e>=0?"text-green-600":"text-red-600"}">
                    Saldo: R$ ${e.toFixed(2)}
                  </p>
                </div>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-2 md:h-3 mb-2 md:mb-4">
                <div class="h-2 md:h-3 rounded-full transition-all duration-300 ${r>100?"bg-red-500":r>80?"bg-yellow-500":"bg-green-500"}" style="width: ${Math.min(r,100)}%"></div>
              </div>
              <div class="flex flex-wrap justify-between text-xs md:text-sm text-gray-600 mb-2 md:mb-4">
                <span>Gasto: R$ ${s.toFixed(2)}</span>
                <span>${r.toFixed(1)}% usado</span>
              </div>
              <div class="flex flex-wrap justify-end gap-1 md:space-x-2">
                <button onclick="editCategory('${t.id}')" class="bg-blue-100 text-blue-600 px-2 py-1 md:px-3 md:py-1 rounded-lg hover:bg-blue-200 text-xs md:text-base">Editar</button>
                <button onclick="deleteCategory('${t.id}')" class="bg-red-100 text-red-600 px-2 py-1 md:px-3 md:py-1 rounded-lg hover:bg-red-200 text-xs md:text-base">Excluir</button>
                <button onclick="showCategoryHistory('${t.id}')" class="bg-gray-100 text-gray-600 px-2 py-1 md:px-3 md:py-1 rounded-lg hover:bg-gray-200 text-xs md:text-base">Histórico</button>
              </div>
            </div>
          `}).join("")}
      </div>
    </div>
  `}let v=null;window.addEventListener("beforeinstallprompt",o=>{o.preventDefault(),v=o,document.querySelector('.nav-item.active[data-tab="settings"]')&&k(!0)});function k(o){const t=document.getElementById("install-app-btn");t&&(t.style.display=o?"block":"none")}function X(){const o=document.getElementById("app-content");B("Configurações"),o.innerHTML=`
    <div class="space-y-2 md:space-y-8">
      <!-- Botão de instalar aplicativo -->
      <button id="install-app-btn" style="display:none" class="w-full bg-blue-500 text-white py-2 rounded-lg font-semibold mb-4">📱 Baixar aplicativo</button>
      
      <!-- Guia do Usuário -->
      <div class="bg-white rounded-xl shadow-lg p-2 md:p-6">
        <h3 class="text-base md:text-xl font-bold mb-2 md:mb-4">📖 Guia do Usuário</h3>
        <p class="text-xs md:text-sm text-gray-600 mb-2 md:mb-4">Baixe o manual completo com todas as funcionalidades do aplicativo</p>
        <button onclick="generateUserGuide()" class="w-full bg-purple-500 text-white px-2 py-1 md:px-6 md:py-3 rounded-lg hover:bg-purple-600 text-xs md:text-base">
          📄 Baixar Guia Completo (PDF)
        </button>
      </div>
      
      <!-- Perfil do Usuário -->
      <div class="bg-white rounded-xl shadow-lg p-2 md:p-6">
        <h3 class="text-base md:text-xl font-bold mb-2 md:mb-4">Perfil</h3>
        <div class="space-y-2 md:space-y-4">
          <div>
            <label class="block text-xs md:text-sm font-medium text-gray-700 mb-1">Email</label>
            <p class="text-gray-900 font-medium text-xs md:text-base">${window.appState.currentUser?.email||"N/A"}</p>
          </div>
          <button onclick="logout()" class="bg-red-500 text-white px-2 py-1 md:px-6 md:py-3 rounded-lg hover:bg-red-600 text-xs md:text-base">
            Sair da Conta
          </button>
        </div>
      </div>
      
      <!-- Orçamentos -->
      <div class="bg-white rounded-xl shadow-lg p-2 md:p-6">
        <div class="flex flex-wrap justify-between items-center mb-2 md:mb-4 gap-1 md:gap-0">
          <h3 class="text-base md:text-xl font-bold">Orçamentos</h3>
          <div class="flex gap-1 md:gap-2">
            <button onclick="showAddBudgetModal()" class="bg-blue-500 text-white px-2 py-1 md:px-4 md:py-2 rounded-lg hover:bg-blue-600 text-xs md:text-base">
              + Novo Orçamento
            </button>
            <button onclick="selectSharedBudget()" class="bg-purple-500 text-white px-2 py-1 md:px-4 md:py-2 rounded-lg hover:bg-purple-600 text-xs md:text-base">
              Entrar em Orçamento
            </button>
          </div>
        </div>
        <div class="space-y-2 md:space-y-4">
          ${window.appState.budgets.map(a=>`
            <div class="border rounded-lg p-2 md:p-4 flex flex-wrap justify-between items-center">
              <div>
                <p class="font-medium text-xs md:text-base">${a.nome}</p>
                <p class="text-xs md:text-sm text-gray-500">ID: <span class='select-all'>${a.id}</span></p>
              </div>
              <div class="flex gap-1 md:space-x-2">
                <button onclick="copyBudgetId('${a.id}')" class="bg-gray-100 text-gray-600 px-2 py-1 md:px-3 md:py-1 rounded-lg hover:bg-gray-200 text-xs md:text-sm" title="Copiar ID do orçamento">
                  📋 Copiar ID
                </button>
                <button onclick="selectBudget('${a.id}')" class="bg-blue-100 text-blue-600 px-2 py-1 md:px-3 md:py-1 rounded-lg hover:bg-blue-200 text-xs md:text-sm">
                  Selecionar
                </button>
              </div>
            </div>
          `).join("")}
        </div>
      </div>
      
      <!-- Exportar e Backup -->
      <div class="bg-white rounded-xl shadow-lg p-2 md:p-6">
        <h3 class="text-base md:text-xl font-bold mb-2 md:mb-4">Exportar e Backup</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
          <button onclick="exportToExcel()" class="bg-green-500 text-white p-2 md:p-4 rounded-lg hover:bg-green-600 flex items-center justify-center space-x-2 text-xs md:text-base">
            <span>📊</span>
            <span>Exportar Excel</span>
          </button>
          <button onclick="exportToPDF()" class="bg-red-500 text-white p-2 md:p-4 rounded-lg hover:bg-red-600 flex items-center justify-center space-x-2 text-xs md:text-base">
            <span>📄</span>
            <span>Exportar PDF</span>
          </button>
          <button onclick="downloadBackup()" class="bg-purple-500 text-white p-2 md:p-4 rounded-lg hover:bg-purple-600 flex items-center justify-center space-x-2 text-xs md:text-base">
            <span>💾</span>
            <span>Backup Completo</span>
          </button>
          <button onclick="importBackup()" class="bg-orange-500 text-white p-2 md:p-4 rounded-lg hover:bg-orange-600 flex items-center justify-center space-x-2 text-xs md:text-base">
            <span>📥</span>
            <span>Importar Backup</span>
          </button>
        </div>
      </div>
    </div>
  `,k(!!v);const t=document.getElementById("install-app-btn");t&&(t.onclick=async()=>{if(v){v.prompt();const{outcome:a}=await v.userChoice;a==="accepted"&&(t.textContent="Aplicativo instalado!",t.disabled=!0),v=null,k(!1)}})}function m(o){document.getElementById("app-content"),document.querySelectorAll(".nav-btn").forEach(a=>{a.classList.remove("active")});const t=document.querySelector(`.nav-btn[data-route='${o}']`);switch(t&&t.classList.add("active"),o){case"/dashboard":C();break;case"/transactions":L();break;case"/categories":y().then(G);break;case"/settings":T().then(X);break;default:C()}}function M(o){window.appState.currentBudget=o,H()}window.showAddTransactionModal=function(){x("Adicionar Transação",`
    <form id="transaction-form" class="space-y-4">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
        <input type="text" id="transaction-descricao" required 
               class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
               placeholder="Ex: Supermercado">
      </div>
      
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Valor (R$)</label>
        <input type="number" id="transaction-valor" required step="0.01" min="0"
               class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
               placeholder="0,00">
      </div>
      
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Tipo</label>
        <select id="transaction-tipo" required
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
          <option value="">Selecione...</option>
          <option value="receita">Receita</option>
          <option value="despesa">Despesa</option>
        </select>
      </div>
      
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Categoria</label>
        <select id="transaction-categoria" required
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
          <option value="">Selecione...</option>
          ${window.appState.categories.length>0?window.appState.categories.map(o=>`<option value="${o.id}">${o.nome}</option>`).join(""):'<option value="" disabled>Nenhuma categoria disponível</option>'}
        </select>
        ${window.appState.categories.length===0?'<p class="text-sm text-red-500 mt-1">Crie uma categoria primeiro</p>':""}
      </div>
      
      <div class="flex justify-end space-x-3 pt-4">
        <button type="button" onclick="closeModal()" 
                class="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200">
          Cancelar
        </button>
        <button type="submit" 
                class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
          Adicionar
        </button>
      </div>
    </form>
  `),document.getElementById("transaction-form").addEventListener("submit",async o=>{o.preventDefault();const t=document.getElementById("transaction-descricao").value,a=parseFloat(document.getElementById("transaction-valor").value),s=document.getElementById("transaction-tipo").value,i=document.getElementById("transaction-categoria").value;try{await U({descricao:t,valor:a,tipo:s,categoriaId:i}),await w(),closeModal(),alert("Transação adicionada com sucesso!")}catch(r){console.error("Erro ao adicionar transação:",r),alert("Erro ao adicionar transação: "+r.message)}})};window.showAddCategoryModal=function(){x("Adicionar Categoria",`
    <form id="category-form" class="space-y-4">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Nome</label>
        <input type="text" id="category-nome" required 
               class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
               placeholder="Ex: Alimentação">
      </div>
      
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Tipo</label>
        <select id="category-tipo" required
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
          <option value="">Selecione...</option>
          <option value="receita">Receita</option>
          <option value="despesa">Despesa</option>
        </select>
      </div>
      
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Limite (R$)</label>
        <input type="number" id="category-limite" step="0.01" min="0"
               class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
               placeholder="0,00">
        <p class="text-sm text-gray-500 mt-1">Deixe em branco se não houver limite</p>
      </div>
      
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Cor</label>
        <input type="color" id="category-cor" value="#4F46E5"
               class="w-full h-12 border border-gray-300 rounded-lg">
      </div>
      
      <div class="flex justify-end space-x-3 pt-4">
        <button type="button" onclick="closeModal()" 
                class="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200">
          Cancelar
        </button>
        <button type="submit" 
                class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
          Adicionar
        </button>
      </div>
    </form>
  `),document.getElementById("category-form").addEventListener("submit",async o=>{o.preventDefault();const t=document.getElementById("category-nome").value,a=document.getElementById("category-tipo").value,s=parseFloat(document.getElementById("category-limite").value)||0,i=document.getElementById("category-cor").value;try{await O({nome:t,tipo:a,limite:s,cor:i}),closeModal(),m("/categories"),alert("Categoria adicionada com sucesso!")}catch(r){console.error("Erro ao adicionar categoria:",r),alert("Erro ao adicionar categoria: "+r.message)}})};window.showAddBudgetModal=function(){x("Adicionar Orçamento",`
    <form id="budget-form" class="space-y-4">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Nome</label>
        <input type="text" id="budget-nome" required 
               class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
               placeholder="Ex: Orçamento Familiar">
      </div>
      
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
        <textarea id="budget-descricao" rows="3"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Descrição opcional do orçamento"></textarea>
      </div>
      
      <div class="flex justify-end space-x-3 pt-4">
        <button type="button" onclick="closeModal()" 
                class="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200">
          Cancelar
        </button>
        <button type="submit" 
                class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
          Adicionar
        </button>
      </div>
    </form>
  `),document.getElementById("budget-form").addEventListener("submit",async o=>{o.preventDefault();const t=document.getElementById("budget-nome").value,a=document.getElementById("budget-descricao").value;try{await V({nome:t,descricao:a}),closeModal(),m("/settings"),alert("Orçamento adicionado com sucesso!")}catch(s){console.error("Erro ao adicionar orçamento:",s),alert("Erro ao adicionar orçamento: "+s.message)}})};window.editTransaction=function(o){const t=window.appState.transactions.find(a=>a.id===o);if(!t){alert("Transação não encontrada");return}x("Editar Transação",`
    <form id="edit-transaction-form" class="space-y-4">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
        <input type="text" id="edit-transaction-descricao" required 
               value="${t.descricao}"
               class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
               placeholder="Ex: Supermercado">
      </div>
      
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Valor (R$)</label>
        <input type="number" id="edit-transaction-valor" required step="0.01" min="0"
               value="${t.valor}"
               class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
               placeholder="0,00">
      </div>
      
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Tipo</label>
        <select id="edit-transaction-tipo" required
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
          <option value="receita" ${t.tipo==="receita"?"selected":""}>Receita</option>
          <option value="despesa" ${t.tipo==="despesa"?"selected":""}>Despesa</option>
        </select>
      </div>
      
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Categoria</label>
        <select id="edit-transaction-categoria" required
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
          <option value="">Selecione...</option>
          ${window.appState.categories.map(a=>`<option value="${a.id}" ${t.categoriaId===a.id?"selected":""}>${a.nome}</option>`).join("")}
        </select>
      </div>
      
      <div class="flex justify-end space-x-3 pt-4">
        <button type="button" onclick="closeModal()" 
                class="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200">
          Cancelar
        </button>
        <button type="submit" 
                class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
          Salvar
        </button>
      </div>
    </form>
  `),document.getElementById("edit-transaction-form").addEventListener("submit",async a=>{a.preventDefault();const s=document.getElementById("edit-transaction-descricao").value,i=parseFloat(document.getElementById("edit-transaction-valor").value),r=document.getElementById("edit-transaction-tipo").value,e=document.getElementById("edit-transaction-categoria").value;try{await re(o,{descricao:s,valor:i,tipo:r,categoriaId:e}),closeModal(),m("/dashboard"),alert("Transação atualizada com sucesso!")}catch(n){console.error("Erro ao atualizar transação:",n),alert("Erro ao atualizar transação: "+n.message)}})};window.deleteTransaction=function(o){confirm("Tem certeza que deseja excluir esta transação?")&&se(o)};window.editCategory=function(o){const t=window.appState.categories.find(a=>a.id===o);if(!t){alert("Categoria não encontrada");return}x("Editar Categoria",`
    <form id="edit-category-form" class="space-y-4">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Nome</label>
        <input type="text" id="edit-category-nome" required 
               value="${t.nome}"
               class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
               placeholder="Ex: Alimentação">
      </div>
      
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Tipo</label>
        <select id="edit-category-tipo" required
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
          <option value="receita" ${t.tipo==="receita"?"selected":""}>Receita</option>
          <option value="despesa" ${t.tipo==="despesa"?"selected":""}>Despesa</option>
        </select>
      </div>
      
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Limite (R$)</label>
        <input type="number" id="edit-category-limite" step="0.01" min="0"
               value="${t.limite||""}"
               class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
               placeholder="0,00">
        <p class="text-sm text-gray-500 mt-1">Deixe em branco se não houver limite</p>
      </div>
      
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Cor</label>
        <input type="color" id="edit-category-cor" value="${t.cor||"#4F46E5"}"
               class="w-full h-12 border border-gray-300 rounded-lg">
      </div>
      
      <div class="flex justify-end space-x-3 pt-4">
        <button type="button" onclick="closeModal()" 
                class="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200">
          Cancelar
        </button>
        <button type="submit" 
                class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
          Salvar
        </button>
      </div>
    </form>
  `),document.getElementById("edit-category-form").addEventListener("submit",async a=>{a.preventDefault();const s=document.getElementById("edit-category-nome").value,i=document.getElementById("edit-category-tipo").value,r=parseFloat(document.getElementById("edit-category-limite").value)||0,e=document.getElementById("edit-category-cor").value;try{await ie(o,{nome:s,tipo:i,limite:r,cor:e}),closeModal(),m("/categories"),alert("Categoria atualizada com sucesso!")}catch(n){console.error("Erro ao atualizar categoria:",n),alert("Erro ao atualizar categoria: "+n.message)}})};window.deleteCategory=function(o){confirm("Tem certeza que deseja excluir esta categoria?")&&ne(o)};window.showCategoryHistory=function(o){const t=window.appState.categories.find(e=>e.id===o);if(!t){alert("Categoria não encontrada");return}const a=window.appState.transactions.filter(e=>e.categoriaId===o).sort((e,n)=>new Date(n.createdAt?.toDate())-new Date(e.createdAt?.toDate())),s=a.filter(e=>e.tipo==="receita").reduce((e,n)=>e+parseFloat(n.valor),0),i=a.filter(e=>e.tipo==="despesa").reduce((e,n)=>e+parseFloat(n.valor),0),r=s-i;x(`Histórico - ${t.nome}`,`
    <div class="space-y-6">
      <!-- Resumo -->
      <div class="bg-gray-50 rounded-lg p-4">
        <h3 class="font-semibold text-lg mb-3">Resumo</h3>
        <div class="grid grid-cols-3 gap-4 text-center">
          <div>
            <p class="text-sm text-gray-600">Receitas</p>
            <p class="text-lg font-bold text-green-600">R$ ${s.toFixed(2)}</p>
          </div>
          <div>
            <p class="text-sm text-gray-600">Despesas</p>
            <p class="text-lg font-bold text-red-600">R$ ${i.toFixed(2)}</p>
          </div>
          <div>
            <p class="text-sm text-gray-600">Saldo</p>
            <p class="text-lg font-bold ${r>=0?"text-green-600":"text-red-600"}">R$ ${r.toFixed(2)}</p>
          </div>
        </div>
      </div>
      
      <!-- Lista de Transações -->
      <div>
        <h3 class="font-semibold text-lg mb-3">Transações (${a.length})</h3>
        ${a.length===0?`
          <p class="text-gray-500 text-center py-4">Nenhuma transação encontrada nesta categoria</p>
        `:`
          <div class="space-y-2 max-h-64 overflow-y-auto">
            ${a.map(e=>`
              <div class="flex justify-between items-center p-3 border rounded-lg">
                <div>
                  <p class="font-medium">${e.descricao}</p>
                  <p class="text-sm text-gray-500">${new Date(e.createdAt?.toDate()).toLocaleDateString()}</p>
                </div>
                <div class="text-right">
                  <span class="font-bold ${e.tipo==="receita"?"text-green-600":"text-red-600"}">
                    ${e.tipo==="receita"?"+":"-"}R$ ${parseFloat(e.valor).toFixed(2)}
                  </span>
                  <p class="text-xs text-gray-500">${e.tipo}</p>
                </div>
              </div>
            `).join("")}
          </div>
        `}
      </div>
      
      <div class="flex justify-end">
        <button onclick="closeModal()" 
                class="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600">
          Fechar
        </button>
      </div>
    </div>
  `)};window.copyBudgetId=function(o){navigator.clipboard.writeText(o),alert("ID copiado para a área de transferência!")};window.selectBudget=function(o){window.appState.currentBudget=window.appState.budgets.find(t=>t.id===o),h(),y(),m("/dashboard")};window.exportToExcel=function(){const o=XLSX.utils.book_new(),t=window.appState.transactions.map(i=>({Descrição:i.descricao,Valor:i.valor,Tipo:i.tipo,Categoria:window.appState.categories.find(r=>r.id===i.categoriaId)?.nome||"",Data:i.createdAt&&i.createdAt.toDate?i.createdAt.toDate().toLocaleDateString():""}));XLSX.utils.book_append_sheet(o,XLSX.utils.json_to_sheet(t),"Transações");const a=window.appState.categories.map(i=>({Nome:i.nome,Tipo:i.tipo,Limite:i.limite,Cor:i.cor}));XLSX.utils.book_append_sheet(o,XLSX.utils.json_to_sheet(a),"Categorias");const s=window.appState.budgets.map(i=>({Nome:i.nome,Descrição:i.descricao,ID:i.id}));XLSX.utils.book_append_sheet(o,XLSX.utils.json_to_sheet(s),"Orçamentos"),XLSX.writeFile(o,"financeiro-dados.xlsx")};window.exportToPDF=function(){const{jsPDF:o}=window.jspdf,t=new o;let a=10;t.setFontSize(16),t.text("Resumo Financeiro",10,a),a+=10,t.setFontSize(12),t.text("Transações:",10,a),a+=8,window.appState.transactions.slice(0,20).forEach(s=>{t.text(`- ${s.descricao} | R$ ${s.valor} | ${s.tipo} | ${window.appState.categories.find(i=>i.id===s.categoriaId)?.nome||""}`,12,a),a+=7,a>270&&(t.addPage(),a=10)}),a+=5,t.text("Categorias:",10,a),a+=8,window.appState.categories.forEach(s=>{t.text(`- ${s.nome} | ${s.tipo} | Limite: R$ ${s.limite}`,12,a),a+=7,a>270&&(t.addPage(),a=10)}),a+=5,t.text("Orçamentos:",10,a),a+=8,window.appState.budgets.forEach(s=>{t.text(`- ${s.nome} | ID: ${s.id}`,12,a),a+=7,a>270&&(t.addPage(),a=10)}),t.save("financeiro-resumo.pdf")};window.downloadBackup=function(){const o={transactions:window.appState.transactions,categories:window.appState.categories,budgets:window.appState.budgets},t=new Blob([JSON.stringify(o,null,2)],{type:"application/json"}),a=URL.createObjectURL(t),s=document.createElement("a");s.href=a,s.download="financeiro-backup.json",document.body.appendChild(s),s.click(),document.body.removeChild(s),URL.revokeObjectURL(a)};window.importBackup=function(){const o=document.createElement("input");o.type="file",o.accept="application/json",o.onchange=async t=>{const a=t.target.files[0];if(!a)return;const s=await a.text();try{const i=JSON.parse(s);i.transactions&&i.categories&&i.budgets?alert("Importação de backup só está disponível para leitura neste protótipo."):alert("Arquivo de backup inválido.")}catch(i){alert("Erro ao importar backup: "+i.message)}},o.click()};window.startVoiceRecognition=function(o){if(!("webkitSpeechRecognition"in window)&&!("SpeechRecognition"in window)){alert("Seu navegador não suporta reconhecimento de voz. Use Chrome ou Edge.");return}const t=window.SpeechRecognition||window.webkitSpeechRecognition,a=new t;a.lang="pt-BR",a.continuous=!1,a.interimResults=!1,a.maxAlternatives=1,x("Reconhecimento de Voz",`
    <div class="text-center space-y-4">
      <div class="w-16 h-16 bg-red-500 rounded-full mx-auto flex items-center justify-center animate-pulse">
        <svg class="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
        </svg>
      </div>
      <p class="text-lg font-semibold">Fale agora...</p>
      <p class="text-sm text-gray-600" id="voice-instructions">
        ${o==="transaction"?'Exemplo: "Supermercado 150 despesa alimentação"':'Exemplo: "Alimentação despesa 500"'}
      </p>
      <div id="voice-status" class="text-sm text-blue-600">Aguardando comando...</div>
      <div class="flex justify-center space-x-3">
        <button onclick="closeModal()" class="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600">
          Cancelar
        </button>
      </div>
    </div>
  `),a.onstart=function(){document.getElementById("voice-status").textContent="Ouvindo...",document.getElementById("voice-status").className="text-sm text-green-600"},a.onresult=function(s){const i=s.results[0][0].transcript.toLowerCase();document.getElementById("voice-status").textContent=`Reconhecido: "${i}"`,document.getElementById("voice-status").className="text-sm text-blue-600",de(i,o)},a.onerror=function(s){console.error("Erro no reconhecimento de voz:",s.error),document.getElementById("voice-status").textContent=`Erro: ${s.error}`,document.getElementById("voice-status").className="text-sm text-red-600"},a.onend=function(){setTimeout(()=>{closeModal()},2e3)},a.start()};async function de(o,t){try{t==="transaction"?await ce(o):t==="category"&&await le(o)}catch(a){console.error("Erro ao processar comando de voz:",a),alert("Erro ao processar comando de voz: "+a.message)}}function j(o){const t={zero:0,um:1,uma:1,dois:2,duas:2,três:3,tres:3,quatro:4,cinco:5,seis:6,sete:7,oito:8,nove:9,dez:10,onze:11,doze:12,treze:13,quatorze:14,catorze:14,quinze:15,dezesseis:16,dezessete:17,dezoito:18,dezenove:19,vinte:20,trinta:30,quarenta:40,cinquenta:50,sessenta:60,setenta:70,oitenta:80,noventa:90,cem:100,cento:100,sem:100,duzentos:200,trezentos:300,quatrocentos:400,quinhentos:500,seiscentos:600,setecentos:700,oitocentos:800,novecentos:900,mil:1e3};return o?(o=o.toLowerCase().replace(/\./g,""),t[o]!==void 0?t[o]:o.includes(" e ")?o.split(" e ").map(j).reduce((a,s)=>a+s,0):NaN):NaN}async function ce(o){const t=o.split(" ");if(t.length<4){alert('Comando inválido. Use: "descrição valor tipo categoria"');return}let a=t.findIndex(d=>!isNaN(parseFloat(d))),s=NaN;if(a!==-1)s=parseFloat(t[a]);else for(let d=0;d<t.length;d++){const u=j(t[d]);if(!isNaN(u)&&u>0){s=u,a=d;break}}if(isNaN(s)){alert('Valor não encontrado no comando (diga um número, ex: "cem", "duzentos", "mil" ou "100")');return}const i=t.findIndex(d=>["receita","despesa"].includes(d));if(i===-1){alert("Tipo não encontrado (receita ou despesa)");return}const r=t[i],e=t[t.length-1],n=t.slice(0,a).join(" "),c=window.appState.categories.find(d=>d.nome.toLowerCase().includes(e)||e.includes(d.nome.toLowerCase()));if(!c){alert(`Categoria "${e}" não encontrada. Crie a categoria primeiro.`);return}await U({descricao:n,valor:s,tipo:r,categoriaId:c.id}),await w(),alert(`Transação criada: ${n} - R$ ${s.toFixed(2)} - ${r} - ${c.nome}`),m("/dashboard")}async function le(o){const t=o.split(" ");if(t.length<3){alert('Comando inválido. Use: "nome tipo limite"');return}const a=t.findIndex(d=>["receita","despesa"].includes(d));if(a===-1){alert("Tipo não encontrado (receita ou despesa)");return}const s=t[a];let i=t.findIndex(d=>!isNaN(parseFloat(d))),r=NaN;if(i!==-1)r=parseFloat(t[i]);else for(let d=0;d<t.length;d++){const u=j(t[d]);if(!isNaN(u)&&u>0){r=u,i=d;break}}if(isNaN(r)){alert('Limite não encontrado (diga um número, ex: "cem", "duzentos", "mil" ou "100")');return}const e=t.slice(0,a).join(" ");if(!e){alert("Nome da categoria não encontrado");return}const n=["#4F46E5","#EF4444","#10B981","#F59E0B","#8B5CF6","#EC4899","#06B6D4","#84CC16"],c=n[Math.floor(Math.random()*n.length)];await O({nome:e,tipo:s,limite:r,cor:c}),alert(`Categoria criada: ${e} - ${s} - R$ ${r.toFixed(2)}`),m("/categories")}function x(o,t){const a=document.getElementById("app-modal");a&&a.remove();const s=document.createElement("div");return s.id="app-modal",s.className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50",s.innerHTML=`
    <div class="bg-white rounded-xl shadow-2xl max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
      <div class="p-6">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-xl font-bold text-gray-900">${o}</h2>
          <button onclick="closeModal()" class="text-gray-400 hover:text-gray-600 text-2xl">
            ×
          </button>
        </div>
        ${t}
      </div>
    </div>
  `,document.body.appendChild(s),s.addEventListener("click",i=>{i.target===s&&closeModal()}),s}window.closeModal=function(){const o=document.getElementById("app-modal");o&&o.remove()};window.logout=async()=>{try{await Y(l)}catch(o){console.error("Erro no logout:",o)}};function ue(){document.querySelectorAll(".nav-btn").forEach(o=>{o.addEventListener("click",t=>{t.preventDefault();const a=o.getAttribute("data-route");m(a)})})}function pe(){const o=document.getElementById("btn-entrar");o&&(o.onclick=function(){const t=new Z;ee(l,t).then(a=>{}).catch(a=>{console.error("Erro no login:",a),alert("Erro ao fazer login: "+a.message)})})}function A(o){let t=document.getElementById("loading-page");t||(t=document.createElement("div"),t.id="loading-page",t.className="fixed inset-0 flex items-center justify-center bg-white z-50",t.innerHTML='<div class="text-center"><div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div><span class="text-lg font-semibold text-gray-700">Carregando...</span></div>',document.body.appendChild(t)),t.style.display=o?"flex":"none"}l.onAuthStateChanged(async o=>{if(A(!0),o){window.appState.currentUser=o;try{if(await T(),window.appState.budgets.length===0){const t=await V({nome:"Orçamento Principal",descricao:"Orçamento padrão do usuário"});await M({id:t,nome:"Orçamento Principal"})}else await M(window.appState.budgets[0]);await h(),await y(),C(),D(!1)}catch(t){console.error("Erro ao carregar dados do usuário:",t)}}else window.appState.currentUser=null,window.appState.transactions=[],window.appState.categories=[],window.appState.budgets=[],window.appState.currentBudget=null,D(!0);A(!1)});document.addEventListener("DOMContentLoaded",()=>{pe(),D(!0),ue();const o=document.getElementById("fab-add");o&&o.addEventListener("click",()=>{showAddTransactionModal()});const t=document.getElementById("voice-control");t&&t.addEventListener("click",()=>{x("Comando de Voz",`
        <div class='space-y-4 text-center'>
          <p class='text-lg font-semibold'>O que você quer fazer por voz?</p>
          <div class='flex flex-col gap-3'>
            <button onclick='window.startVoiceRecognition("transaction")' class='px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600'>Adicionar Transação</button>
            <button onclick='window.startVoiceRecognition("category")' class='px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600'>Adicionar Categoria</button>
          </div>
          <button onclick='closeModal()' class='mt-4 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600'>Cancelar</button>
        </div>
      `)})});window.selectSharedBudget=function(){x("Entrar em Orçamento Compartilhado",`
    <form id='shared-budget-form' class='space-y-4'>
      <div>
        <label class='block text-sm font-medium text-gray-700 mb-1'>Cole o ID do orçamento compartilhado</label>
        <input type='text' id='shared-budget-id' required class='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500' placeholder='ID do orçamento'>
      </div>
      <div class='flex justify-end space-x-3 pt-4'>
        <button type='button' onclick='closeModal()' class='px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200'>Cancelar</button>
        <button type='submit' class='px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600'>Entrar</button>
      </div>
    </form>
  `),document.getElementById("shared-budget-form").addEventListener("submit",async o=>{o.preventDefault();const t=document.getElementById("shared-budget-id").value.trim();if(t)try{const a=E(window.FirebaseDB,"budgets",t),i=(await I(S(g(window.FirebaseDB,"budgets")))).docs.find(r=>r.id===t);if(!i){alert("Orçamento não encontrado!");return}window.appState.currentBudget={id:i.id,...i.data()},closeModal(),await h(),await y(),m("/dashboard"),alert("Você entrou no orçamento compartilhado!")}catch(a){alert("Erro ao entrar no orçamento: "+a.message)}})};let z=null;function H(){z&&z();const o=window.appState.currentUser?.uid,t=window.appState.currentBudget?.id;if(!o||!t)return;const a=S(g(p,"transactions"),b("userId","==",o),b("budgetId","==",t));z=oe(a,s=>{window.appState.transactions=s.docs.map(r=>({id:r.id,...r.data()}));const i=document.querySelector(".nav-item.active")?.getAttribute("data-tab");["transactions","dashboard"].includes(i)&&(i==="transactions"&&L(),i==="dashboard"&&C())})}H();window.addEventListener("DOMContentLoaded",()=>{const o=document.getElementById("login-page");o&&(o.style.display="none"),A(!0)});window.generateUserGuide=function(){try{let a=function(n,c,d,u=170){const f=t.splitTextToSize(n,u);return d+f.length*8>270?(t.addPage(),20):(t.text(f,c,d),d+f.length*8+2)},s=function(n,c){return c>250&&(t.addPage(),c=20),t.setFontSize(16),t.setTextColor(79,70,229),t.text(n,20,c),c+12},i=function(n,c){return c>260&&(t.addPage(),c=20),t.setFontSize(12),t.setTextColor(79,70,229),t.text(n,20,c),c+8},r=function(n,c,d=25){return c>270&&(t.addPage(),c=20),t.setFontSize(11),t.setTextColor(0,0,0),t.text(n,d,c),c+8};const{jsPDF:o}=window.jspdf,t=new o;t.setFont("helvetica"),t.setFillColor(79,70,229),t.rect(0,0,210,40,"F"),t.setTextColor(255,255,255),t.setFontSize(24),t.text("Servo Tech Finanças",20,25),t.setFontSize(14),t.text("Guia Completo do Usuário",20,35);let e=50;t.setTextColor(0,0,0),e=s("🎯 Bem-vindo ao Servo Tech Finanças!",e),e=a("O Servo Tech Finanças é um aplicativo completo e intuitivo para controle financeiro pessoal. Desenvolvido com foco na praticidade e simplicidade, ele oferece todas as ferramentas necessárias para você gerenciar suas finanças de forma eficiente e organizada.",20,e),e=i("🌟 Principais Funcionalidades:",e),e=r("📊 Dashboard completo com visão geral das finanças",e),e=r("💰 Gestão completa de receitas e despesas",e),e=r("🏷️ Categorização inteligente com limites de gastos",e),e=r("🎤 Comandos de voz para adicionar transações rapidamente",e),e=r("📈 Controle de orçamentos com compartilhamento",e),e=r("💾 Backup e restauração de dados",e),e=r("📱 Instalação como aplicativo (PWA)",e),e=r("🌙 Modo escuro para conforto visual",e),e=r("📊 Exportação de relatórios em Excel, PDF e JSON",e),e=s("📊 Dashboard - Centro de Controle Financeiro",e),e=a("O Dashboard é o coração do aplicativo, oferecendo uma visão completa e em tempo real de suas finanças. Aqui você encontra todos os dados importantes organizados de forma clara e intuitiva.",20,e),e+=8,e=i("📈 Cards Principais:",e),e=r("🟢 Receitas: Soma total de todo dinheiro recebido no período",e),e=r("   Inclui salários, bônus, rendimentos extras, etc.",e,30),e=r("🔴 Despesas: Soma total de todos os gastos realizados",e),e=r("   Contas, compras, lazer, transporte, etc.",e,30),e=r("🔵 Saldo: Receitas - Despesas (dinheiro disponível)",e),e=r("   Indica se você está no azul ou no vermelho",e,30),e=r("🟡 Orçado: Limite das categorias - Despesas",e),e=r("   Mostra quanto ainda pode gastar dentro dos limites",e,30),e+=8,e=i("📊 Seção de Categorias:",e),e=r("Barras de progresso coloridas para cada categoria",e),e=r("Verde: Dentro do limite estabelecido",e,30),e=r("Amarelo: Próximo do limite (80% ou mais)",e,30),e=r("Vermelho: Acima do limite (gasto excessivo)",e,30),e=r("Porcentagem de uso visível em cada barra",e,30),e+=8,e=i("📝 Transações Recentes:",e),e=r("Lista das últimas 10 transações realizadas",e),e=r("Mostra: Data, Descrição, Valor, Categoria e Tipo",e,30),e=r("Atualização automática em tempo real",e,30),e=r("Acesso rápido para editar ou excluir",e,30),e+=8,e=s("💰 Transações - Gestão Completa de Receitas e Despesas",e),e=a("A aba Transações é onde você gerencia todas as suas movimentações financeiras. Aqui você pode adicionar, editar, excluir e visualizar todas as transações.",20,e),e+=8,e=i("📝 Como Adicionar uma Transação:",e),e=r("Método 1 - Botão Flutuante (FAB):",e),e=r("1. Toque no botão + (canto inferior direito)",e,30),e=r("2. Preencha os campos obrigatórios:",e,30),e=r('   • Descrição: Nome da transação (ex: "Supermercado")',e,35),e=r("   • Valor: Quantia em reais (ex: 150,50)",e,35),e=r("   • Tipo: Receita ou Despesa",e,35),e=r("   • Categoria: Selecione uma categoria existente",e,35),e=r('3. Toque em "Adicionar"',e,30),e+=8,e=r("Método 2 - Aba Transações:",e),e=r('1. Vá na aba "Transações" (navegação inferior)',e,30),e=r('2. Toque em "+ Nova Transação"',e,30),e=r("3. Preencha os campos e confirme",e,30),e+=8,e=i("✏️ Como Editar uma Transação:",e),e=r("1. Localize a transação na lista",e),e=r("2. Toque no ícone ✏️ (lápis) ao lado",e,30),e=r("3. Modifique os campos desejados",e,30),e=r('4. Toque em "Salvar"',e,30),e+=8,e=i("🗑️ Como Excluir uma Transação:",e),e=r("1. Localize a transação na lista",e),e=r("2. Toque no ícone 🗑️ (lixeira) ao lado",e,30),e=r("3. Confirme a exclusão",e,30),e+=8,e=i("📊 Visualização de Transações:",e),e=r("Lista completa de todas as transações",e),e=r("Ordenadas por data (mais recentes primeiro)",e,30),e=r("Filtros por tipo (Receita/Despesa)",e,30),e=r("Busca por descrição",e,30),e=r("Atualização automática em tempo real",e,30),e+=8,e=i("💡 Dicas Importantes:",e),e=r("Use comandos de voz para adicionar mais rapidamente",e),e=r("Mantenha descrições claras e específicas",e),e=r("Categorize corretamente para melhor controle",e),e=r("Revise transações regularmente",e),e+=8,t.setFontSize(16),t.setTextColor(79,70,229),t.text("🎤 Comandos de Voz - Revolução na Praticidade",20,e),e+=12,t.setFontSize(11),t.setTextColor(0,0,0),t.text("O sistema de comandos de voz é uma das funcionalidades mais inovadoras do app.",20,e),e+=8,t.text("Permite adicionar transações e criar categorias sem precisar digitar,",20,e),e+=8,t.text("tornando o controle financeiro muito mais rápido e prático.",20,e),e+=12,t.text("🎯 Como Ativar o Comando de Voz:",20,e),e+=8,t.text("1. Toque no ícone do microfone no cabeçalho",25,e),e+=8,t.text('2. Aguarde a animação de "Ouvindo"',30,e),e+=8,t.text("3. Fale claramente o comando",30,e),e+=8,t.text("4. Aguarde a confirmação",30,e),e+=12,t.text("📝 Comando para Adicionar Transação:",20,e),e+=8,t.text('Formato: "descrição valor tipo categoria"',25,e),e+=8,t.text("Exemplos Práticos:",25,e),e+=8,t.text('• "supermercado cem despesa alimentação"',30,e),e+=8,t.text('• "salário mil quinhentos receita trabalho"',30,e),e+=8,t.text('• "padaria cinquenta despesa alimentação"',30,e),e+=8,t.text('• "uber trinta despesa transporte"',30,e),e+=8,t.text('• "bônus quinhentos receita trabalho"',30,e),e+=8,t.text('• "cinema oitenta despesa lazer"',30,e),e+=12,t.text("🏷️ Comando para Criar Categoria:",20,e),e+=8,t.text('Formato: "nome tipo limite"',25,e),e+=8,t.text("Exemplos Práticos:",25,e),e+=8,t.text('• "alimentação despesa cem"',30,e),e+=8,t.text('• "transporte despesa duzentos"',30,e),e+=8,t.text('• "lazer despesa cento cinquenta"',30,e),e+=8,t.text('• "trabalho receita zero"',30,e),e+=12,t.text("🔢 Valores por Extenso Suportados:",20,e),e+=8,t.text('Números: "zero", "um", "dois", "três", "quatro", "cinco"',25,e),e+=8,t.text('Dezenas: "dez", "vinte", "trinta", "quarenta", "cinquenta"',25,e),e+=8,t.text('Centenas: "cem", "duzentos", "trezentos", "quatrocentos"',25,e),e+=8,t.text('Milhares: "mil", "mil quinhentos", "dois mil"',25,e),e+=8,t.text('Compostos: "cento cinquenta", "mil duzentos"',25,e),e+=8,t.text('Sinônimos: "sem" = "cem" (para evitar confusão)',25,e),e+=12,t.text("💡 Dicas para Comandos de Voz:",20,e),e+=8,t.text("• Fale claramente e pausadamente",25,e),e+=8,t.text("• Use valores por extenso ao invés de números",25,e),e+=8,t.text("• Mantenha o microfone próximo",25,e),e+=8,t.text("• Evite ambientes muito barulhentos",25,e),e+=8,t.text("• Confirme sempre se o comando foi entendido",25,e),e+=15,t.setFontSize(16),t.setTextColor(79,70,229),t.text("🏷️ Categorias - Organização Inteligente dos Gastos",20,e),e+=12,t.setFontSize(11),t.setTextColor(0,0,0),t.text("As categorias são fundamentais para organizar e controlar seus gastos de forma eficiente.",20,e),e+=8,t.text("Elas permitem que você estabeleça limites de gastos e monitore o progresso em tempo real.",20,e),e+=12,t.text("📝 Como Criar uma Categoria:",20,e),e+=8,t.text("Método 1 - Interface:",25,e),e+=8,t.text('1. Vá na aba "Categorias" (navegação inferior)',30,e),e+=8,t.text('2. Toque em "+ Nova Categoria"',30,e),e+=8,t.text("3. Preencha os campos:",30,e),e+=8,t.text('   • Nome: Nome da categoria (ex: "Alimentação")',35,e),e+=8,t.text("   • Tipo: Receita ou Despesa",35,e),e+=8,t.text("   • Limite: Valor máximo mensal (opcional)",35,e),e+=8,t.text("   • Cor: Escolha uma cor para identificação",35,e),e+=8,t.text('4. Toque em "Criar"',30,e),e+=12,t.text("Método 2 - Comando de Voz:",25,e),e+=8,t.text("1. Ative o microfone",30,e),e+=8,t.text('2. Diga: "nome tipo limite"',30,e),e+=8,t.text('3. Exemplo: "alimentação despesa cem"',30,e),e+=12,t.text("📊 Sistema de Controle por Cores:",20,e),e+=8,t.text("🟢 Verde: Dentro do limite estabelecido",25,e),e+=8,t.text("   • Gasto abaixo de 80% do limite",30,e),e+=8,t.text("   • Situação financeira saudável",30,e),e+=8,t.text("🟡 Amarelo: Próximo do limite",25,e),e+=8,t.text("   • Gasto entre 80% e 100% do limite",30,e),e+=8,t.text("   • Atenção: Reduza gastos nesta categoria",30,e),e+=8,t.text("🔴 Vermelho: Acima do limite",25,e),e+=8,t.text("   • Gasto superior ao limite estabelecido",30,e),e+=8,t.text("   • Alerta: Necessário ajuste imediato",30,e),e+=12,t.text("📈 Categorias Recomendadas:",20,e),e+=8,t.text("Para Despesas:",25,e),e+=8,t.text("• Alimentação (supermercado, restaurantes)",30,e),e+=8,t.text("• Transporte (combustível, Uber, transporte público)",30,e),e+=8,t.text("• Moradia (aluguel, contas, manutenção)",30,e),e+=8,t.text("• Lazer (cinema, shows, viagens)",30,e),e+=8,t.text("• Saúde (médico, farmácia, plano de saúde)",30,e),e+=8,t.text("• Educação (cursos, livros, material escolar)",30,e),e+=8,t.text("Para Receitas:",25,e),e+=8,t.text("• Trabalho (salário, bônus, comissões)",30,e),e+=8,t.text("• Investimentos (rendimentos, dividendos)",30,e),e+=8,t.text("• Freelance (trabalhos extras)",30,e),e+=12,t.text("✏️ Gerenciando Categorias:",20,e),e+=8,t.text("• Editar: Toque no ícone ✏️ ao lado da categoria",25,e),e+=8,t.text("• Excluir: Toque no ícone 🗑️ ao lado da categoria",25,e),e+=8,t.text("• Visualizar transações: Toque na categoria",25,e),e+=8,t.text("• Ajustar limites: Edite conforme necessário",25,e),e+=12,t.text("💡 Dicas para Categorias Eficientes:",20,e),e+=8,t.text("• Crie categorias específicas e claras",25,e),e+=8,t.text("• Estabeleça limites realistas baseados na renda",25,e),e+=8,t.text("• Use cores diferentes para fácil identificação",25,e),e+=8,t.text("• Revise e ajuste limites mensalmente",25,e),e+=8,t.text("• Monitore as barras de progresso regularmente",25,e),e+=15,t.setFontSize(16),t.setTextColor(79,70,229),t.text("⚙️ Configurações - Centro de Personalização",20,e),e+=12,t.setFontSize(11),t.setTextColor(0,0,0),t.text("A aba Configurações é o centro de controle do aplicativo, onde você pode personalizar",20,e),e+=8,t.text("sua experiência, gerenciar dados e acessar funcionalidades avançadas.",20,e),e+=12,t.text("📖 Guia do Usuário:",20,e),e+=8,t.text("• Baixe este manual completo em PDF",25,e),e+=8,t.text("• Acesso offline ao guia de uso",25,e),e+=8,t.text("• Referência completa de todas as funcionalidades",25,e),e+=12,t.text("👤 Perfil do Usuário:",20,e),e+=8,t.text("• Visualizar email da conta Google",25,e),e+=8,t.text("• Fazer logout da aplicação",25,e),e+=8,t.text("• Gerenciar sessão de login",25,e),e+=12,t.text("💰 Sistema de Orçamentos:",20,e),e+=8,t.text("Criar Novo Orçamento:",25,e),e+=8,t.text("• Defina um nome para o orçamento",30,e),e+=8,t.text("• Estabeleça período de vigência",30,e),e+=8,t.text("• Configure categorias e limites",30,e),e+=8,t.text("Compartilhar Orçamento:",25,e),e+=8,t.text("• Gere um ID único do orçamento",30,e),e+=8,t.text("• Compartilhe com família ou amigos",30,e),e+=8,t.text("• Controle colaborativo de gastos",30,e),e+=8,t.text("Entrar em Orçamento Compartilhado:",25,e),e+=8,t.text("• Cole o ID do orçamento compartilhado",30,e),e+=8,t.text("• Acesse dados compartilhados",30,e),e+=8,t.text("• Contribua com transações",30,e),e+=12,t.text("📊 Exportação de Dados:",20,e),e+=8,t.text("Excel (.xlsx):",25,e),e+=8,t.text("• Formato ideal para análise em planilhas",30,e),e+=8,t.text("• Compatível com Microsoft Excel e Google Sheets",30,e),e+=8,t.text("• Inclui todas as transações e categorias",30,e),e+=8,t.text("PDF (.pdf):",25,e),e+=8,t.text("• Relatório formatado para impressão",30,e),e+=8,t.text("• Resumo financeiro completo",30,e),e+=8,t.text("• Gráficos e estatísticas",30,e),e+=8,t.text("JSON (.json):",25,e),e+=8,t.text("• Backup completo de todos os dados",30,e),e+=8,t.text("• Formato para restauração futura",30,e),e+=8,t.text("• Compatível com outros sistemas",30,e),e+=12,t.text("📱 Instalação como Aplicativo (PWA):",20,e),e+=8,t.text("• Baixe o app no seu celular",25,e),e+=8,t.text("• Acesso offline às funcionalidades",25,e),e+=8,t.text("• Experiência nativa de aplicativo",25,e),e+=8,t.text("• Notificações push (futuro)",25,e),e+=12,t.text("🌙 Modo Escuro:",20,e),e+=8,t.text("• Alternar entre tema claro e escuro",25,e),e+=8,t.text("• Reduz fadiga visual",25,e),e+=8,t.text("• Economiza bateria em telas OLED",25,e),e+=8,t.text("• Preferência salva automaticamente",25,e),e+=15,t.setFontSize(16),t.setTextColor(79,70,229),t.text("💡 Dicas e Truques para Aproveitar Melhor",20,e),e+=12,t.setFontSize(11),t.setTextColor(0,0,0),t.text("🚀 Dicas de Produtividade:",20,e),e+=8,t.text("• Use comandos de voz para adicionar transações rapidamente",25,e),e+=8,t.text("• Configure limites realistas nas categorias",25,e),e+=8,t.text("• Faça backup regular dos seus dados",25,e),e+=8,t.text("• Instale o app para acesso offline",25,e),e+=8,t.text("• Compartilhe orçamentos com família/amigos",25,e),e+=8,t.text('• Monitore o card "Orçado" para controle de gastos',25,e),e+=8,t.text("• Use cores diferentes para categorias",25,e),e+=15,t.setFontSize(16),t.setTextColor(79,70,229),t.text("🔧 Solução de Problemas Comuns",20,e),e+=12,t.setFontSize(11),t.setTextColor(0,0,0),t.text("❓ Comando de voz não funciona:",20,e),e+=8,t.text("• Verifique se o microfone está ativo",25,e),e+=8,t.text("• Fale claramente e pausadamente",25,e),e+=8,t.text('• Use valores por extenso: "cem" ao invés de "100"',25,e),e+=8,t.text("❓ Transação não aparece:",20,e),e+=8,t.text("• Aguarde alguns segundos (atualização automática)",25,e),e+=8,t.text("• Verifique se está na categoria correta",25,e),e+=8,t.text("❓ App não carrega:",20,e),e+=8,t.text("• Verifique sua conexão com a internet",25,e),e+=8,t.text("• Faça login novamente se necessário",25,e),e+=15,t.setFontSize(16),t.setTextColor(79,70,229),t.text("🆘 Suporte e Contato",20,e),e+=12,t.setFontSize(11),t.setTextColor(0,0,0),t.text("👨‍💻 Fundador: Igor Bispo",20,e),e+=8,t.text("📱 Versão do App: 1.0",20,e),e+=8,t.text("📅 Data do Guia: "+new Date().toLocaleDateString("pt-BR"),20,e),e+=8,t.text("🌐 URL: https://controle-financeiro-b98ec.web.app",20,e),e+=8,t.text("💡 Para dúvidas, consulte este guia ou entre em contato.",20,e),e+=15,t.setFillColor(79,70,229),t.rect(0,270,210,30,"F"),t.setTextColor(255,255,255),t.setFontSize(10),t.text("Servo Tech Finanças - Transformando sua vida financeira",20,280),t.text("© 2025 • Fundador: Igor Bispo • Versão 1.0",20,290),t.save("Servo-Tech-Financas-Guia-Usuario.pdf")}catch(o){console.error("Erro ao gerar PDF:",o),alert("Erro ao gerar PDF. Verifique se a biblioteca jsPDF está carregada.")}};

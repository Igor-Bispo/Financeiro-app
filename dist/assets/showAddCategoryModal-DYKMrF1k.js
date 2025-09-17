const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/main-CTU5tN20.js","assets/main-DDw334Cw.css","assets/CategoriesPage-IsKsQKfm.js","assets/PeriodIndicator-DocyvX7K.js","assets/UIService-CEIgXoDR.js"])))=>i.map(i=>d[i]);
import{M as m,_ as l,S as s}from"./main-CTU5tN20.js";window.showAddCategoryModal=function(e={}){console.log("🔧 showAddCategoryModal chamada com:",e),console.log("🔧 window.Modal disponível:",!!window.Modal);const t=!!e&&Object.keys(e).length>0;try{const o=m({title:t?"Editar Categoria":"Nova Categoria",content:`
      <form id="category-form" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Nome
          </label>
          <input 
            type="text" 
            id="nome" 
            name="nome" 
            value="${e.nome||""}"
            class="u-input w-full"
            placeholder="Ex: Alimentação, Transporte..."
            required
          />
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Tipo
          </label>
          <select 
            id="tipo" 
            name="tipo"
            class="u-input w-full"
            required
          >
            <option value="despesa" ${e.tipo==="despesa"?"selected":""}>Despesa</option>
            <option value="receita" ${e.tipo==="receita"?"selected":""}>Receita</option>
          </select>
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Limite Mensal (opcional)
          </label>
          <input 
            type="number" 
            id="limite" 
            name="limite" 
            value="${e.limite||""}"
            step="0.01" 
            min="0"
            class="u-input w-full"
            placeholder="0.00"
          />
        </div>
        
        <div class="flex gap-2 pt-4">
          <button 
            type="submit" 
            class="flex-1 u-btn u-btn--primary"
          >
            ${t?"Atualizar":"Adicionar"}
          </button>
          <button 
            type="button" 
            onclick="this.closest('.modal').remove()"
            class="flex-1 u-btn u-btn--ghost"
          >
            Cancelar
          </button>
        </div>
      </form>
    `,onClose:()=>o.remove()});document.body.appendChild(o),console.log("✅ Modal de categoria adicionado ao DOM");const d=o.querySelector("#category-form");d.addEventListener("submit",async n=>{n.preventDefault();const i=new FormData(d),c={nome:i.get("nome"),tipo:i.get("tipo"),limite:i.get("limite")?parseFloat(i.get("limite")):null};try{const a=window?.appState?.currentBudget?.id,r=window?.appState?.currentUser?.uid;a&&(c.budgetId=a),r&&(c.userId=r)}catch{}try{const a=await l(()=>import("./main-CTU5tN20.js").then(r=>r.a2),__vite__mapDeps([0,1]));t?(await a.updateCategory(e.id,c),s?.show?.("Categoria atualizada","success")):(await a.createCategory(c),s?.show?.("Categoria criada","success")),o.remove();try{window.refreshCurrentView?.()}catch{}try{window.location.hash.includes("/categories")&&await(await l(()=>import("./CategoriesPage-IsKsQKfm.js"),__vite__mapDeps([2,0,1,3,4]))).renderCategories?.()}catch{}}catch(a){if(console.error("Erro ao salvar categoria:",a),a?.message!=="Operação cancelada pelo usuário")try{s.show("Erro ao salvar categoria","error")}catch{}}})}catch(o){console.error("❌ Erro ao criar modal de categoria:",o),window.Snackbar?window.Snackbar.show("Erro ao abrir modal de categoria","error"):alert("Erro ao abrir modal de categoria: "+o.message)}};window.editCategory=function(e){try{const t=window.appState?.categories?.find(o=>o.id===e);t&&window.showAddCategoryModal(t)}catch(t){console.warn("editCategory fallback falhou:",t)}};

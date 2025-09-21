import{h as p,j as h}from"./main-BXUJHJVH.js";function b(n,o){const e=document.createElement("div");e.className="period-indicator",e.innerHTML=`
    <button class="btn btn-outline btn-sm period-indicator__btn period-indicator__btn--prev" aria-label="Período anterior">
      <span class="period-indicator__icon">‹</span>
    </button>
    
    <div class="period-indicator__current">
      <span class="period-indicator__month">${n.month}</span>
      <span class="period-indicator__year">${n.year}</span>
    </div>
    
    <button class="btn btn-outline btn-sm period-indicator__btn period-indicator__btn--next" aria-label="Próximo período">
      <span class="period-indicator__icon">›</span>
    </button>
  `;const i=e.querySelector(".period-indicator__btn--prev"),d=e.querySelector(".period-indicator__btn--next");return i.addEventListener("click",r=>{r.preventDefault(),r.stopPropagation(),o&&o("prev")}),d.addEventListener("click",r=>{r.preventDefault(),r.stopPropagation(),o&&o("next")}),e}function u(n,o){const e=n.querySelector(".period-indicator__month"),i=n.querySelector(".period-indicator__year");e&&(e.textContent=o.month),i&&(i.textContent=o.year)}function y(n){try{const o=typeof n=="string"?document.querySelector(n):n;if(!o)return;const e=["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"],{year:i,month:d}=p(),r={month:e[Math.max(0,Math.min(11,(d||1)-1))]||String(d),year:i},_=c=>{console.log("🔄 onChange chamado com direção:",c);const s=p();console.log("📅 Período atual:",s.year,s.month);let a=s.year,t=s.month;c==="prev"?(t-=1,t<1&&(t=12,a-=1)):c==="next"&&(t+=1,t>12&&(t=1,a+=1)),console.log("📅 Novo período calculado:",a,t),h(a,t),console.log("💾 setSelectedPeriod chamado com:",a,t);const f=p();console.log("📖 Período salvo verificado:",f);const m={month:e[Math.max(0,Math.min(11,t-1))]||String(t),year:a};console.log("📅 Período formatado:",m);try{const l=o.querySelector(".period-indicator");l?(console.log("✅ Atualizando indicador visual"),u(l,m)):console.warn("❌ Elemento .period-indicator não encontrado")}catch(l){console.error("❌ Erro ao atualizar indicador:",l)}};if(o.firstChild&&o.firstChild.classList&&o.firstChild.classList.contains("period-indicator"))console.log("🔄 Atualizando indicador existente"),u(o.firstChild,r);else{console.log("🆕 Criando novo indicador de período");const c=b(r,_);o.innerHTML="",o.appendChild(c),console.log("✅ Indicador criado e adicionado ao DOM")}}catch{}}export{b as createPeriodIndicator,y as mountPeriodIndicator,u as updatePeriodIndicator};

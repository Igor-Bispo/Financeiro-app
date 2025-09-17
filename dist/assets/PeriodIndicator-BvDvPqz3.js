import{h as m,j as u}from"./main-DC8LCdJb.js";function f(i,t){const e=document.createElement("div");e.className="period-indicator",e.innerHTML=`
    <button class="period-indicator__btn period-indicator__btn--prev" aria-label="Período anterior">
      <span class="period-indicator__icon">‹</span>
    </button>
    
    <div class="period-indicator__current">
      <span class="period-indicator__month">${i.month}</span>
      <span class="period-indicator__year">${i.year}</span>
    </div>
    
    <button class="period-indicator__btn period-indicator__btn--next" aria-label="Próximo período">
      <span class="period-indicator__icon">›</span>
    </button>
  `;const r=e.querySelector(".period-indicator__btn--prev"),o=e.querySelector(".period-indicator__btn--next");return r.addEventListener("click",()=>{t&&t("prev")}),o.addEventListener("click",()=>{t&&t("next")}),e}function l(i,t){const e=i.querySelector(".period-indicator__month"),r=i.querySelector(".period-indicator__year");e&&(e.textContent=t.month),r&&(r.textContent=t.year)}function b(i){try{const t=typeof i=="string"?document.querySelector(i):i;if(!t)return;const e=["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"],{year:r,month:o}=m(),s={month:e[Math.max(0,Math.min(11,(o||1)-1))]||String(o),year:r},p=a=>{let c=r,n=o;a==="prev"?(n-=1,n<1&&(n=12,c-=1)):a==="next"&&(n+=1,n>12&&(n=1,c+=1)),u(c,n);const _={month:e[Math.max(0,Math.min(11,n-1))]||String(n),year:c};try{const d=t.querySelector(".period-indicator");d&&l(d,_)}catch{}};if(t.firstChild&&t.firstChild.classList&&t.firstChild.classList.contains("period-indicator"))l(t.firstChild,s);else{const a=f(s,p);t.innerHTML="",t.appendChild(a)}}catch{}}export{f as createPeriodIndicator,b as mountPeriodIndicator,l as updatePeriodIndicator};

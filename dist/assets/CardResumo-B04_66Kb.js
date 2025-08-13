function $({titulo:p,valor:o,cor:v="",icone:m="",progresso:d=null,status:c=null,alerta:g=null,receitas:h=0,despesas:y=0}){const l=document.createElement("div");l.className="card-resumo card-standard mobile-optimized";let a,s,r,e,t="";const i=parseFloat(o.replace("R$ ","").replace(".","").replace(",","."));switch(v){case"card-resumo receita":i>=5e3?(a="linear-gradient(135deg, #10b981 0%, #059669 100%)",t="3px solid #34d399",e="🚀"):i>=2e3?(a="linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",e="📈"):i>0?(a="linear-gradient(135deg, #4ade80 0%, #22c55e 100%)",e="💰"):(a="linear-gradient(135deg, #94a3b8 0%, #64748b 100%)",e="😐"),s="#fff",r="#ffffff";break;case"card-resumo despesa":i>=4e3?(a="linear-gradient(135deg, #dc2626 0%, #991b1b 100%)",t="3px solid #f87171",e="🔥"):i>=2e3?(a="linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",e="⚠️"):i>0?(a="linear-gradient(135deg, #f97316 0%, #ea580c 100%)",e="📉"):(a="linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",e="✨"),s="#fff",r="#ffffff";break;case"card-resumo saldo":i>=5e3?(a="linear-gradient(135deg, #10b981 0%, #059669 100%)",t="3px solid #34d399",e="🎉"):i>=1e3?(a="linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",e="✅"):i>=0?(a="linear-gradient(135deg, #84cc16 0%, #65a30d 100%)",e="😊"):i>=-1e3?(a="linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",e="😟"):(a="linear-gradient(135deg, #dc2626 0%, #991b1b 100%)",t="3px solid #f87171",e="🚨"),s="#fff",r="#ffffff";break;case"card-resumo orcado":const f=h-y;d!==null?d<=.5&&f>=0?(a="linear-gradient(135deg, #10b981 0%, #059669 100%)",e="🎯"):d<=.7?(a="linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",e="✅"):d<=.9?(a="linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",e="⚠️"):d<=1?(a="linear-gradient(135deg, #f97316 0%, #ea580c 100%)",e="🔶"):(a="linear-gradient(135deg, #dc2626 0%, #991b1b 100%)",t="3px solid #f87171",e="🚨"):(a="linear-gradient(135deg, #6b7280 0%, #4b5563 100%)",e="📋"),s="#fff",r="#ffffff";break;default:a="#fff",s="#222",r="#3b82f6",e=""}l.style.background=a,l.style.color=s,t?(l.style.border=t,l.style.boxShadow="0 8px 25px rgba(0,0,0,0.15), 0 0 20px rgba(52, 211, 153, 0.3)"):l.style.boxShadow="0 4px 15px rgba(0,0,0,0.1)";let b="";if(d!==null){const f=Math.min(Math.max(d*100,0),100);let n=r;f>=90?n="#fbbf24":f>=100&&(n="#f87171"),b=`
      <div class="mt-2">
        <div class="flex justify-between text-sm opacity-90 mb-2">
          <span>Progresso</span>
          <span class="font-semibold">${f.toFixed(0)}%</span>
        </div>
        <div class="w-full bg-white bg-opacity-20 rounded-full h-3 overflow-hidden">
          <div class="h-3 rounded-full transition-all duration-500 ease-out" 
               style="width: ${f}%; background-color: ${n}; box-shadow: 0 0 10px rgba(255,255,255,0.3);"></div>
        </div>
      </div>
    `}let u="";c&&(u=`
      <div class="text-sm opacity-80">
        ${e} ${c}
      </div>
    `);let x="";return g&&(x=`
      <div class="p-2 bg-white bg-opacity-20 rounded-lg text-sm">
        ⚠️ ${g}
      </div>
    `),l.innerHTML=`
    <div class="flex flex-col h-full relative overflow-hidden">
      <!-- Efeito de brilho sutil -->
      <div class="absolute top-0 left-0 w-full h-1 bg-white bg-opacity-30"></div>
      
      <div class="flex items-center gap-3 md:gap-4 mb-4">
        <div class="icon-bg text-2xl md:text-3xl opacity-90 transform transition-transform duration-300 hover:scale-110">${m}</div>
        <div class="flex flex-col flex-1">
          <div class="titulo text-sm md:text-base font-medium opacity-90">${p}</div>
          <div class="valor text-lg md:text-xl font-bold flex items-center gap-2">
            <span>${o}</span>
            <span class="text-xl">${e}</span>
          </div>
        </div>
      </div>
      
      <div class="flex-1 flex flex-col justify-end space-y-3 pb-2">
        ${b}
        ${u}
        ${x}
      </div>
      
      <!-- Indicador visual de status no canto -->
      <div class="absolute top-2 right-2 text-lg opacity-70">
        ${e}
      </div>
    </div>
  `,l.style.cssText+=`
    touch-action: manipulation;
    -webkit-tap-highlight-color: transparent;
    user-select: none;
  `,l}export{$ as CardResumo};

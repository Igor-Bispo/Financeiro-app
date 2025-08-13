(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))o(r);new MutationObserver(r=>{for(const a of r)if(a.type==="childList")for(const s of a.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&o(s)}).observe(document,{childList:!0,subtree:!0});function t(r){const a={};return r.integrity&&(a.integrity=r.integrity),r.referrerPolicy&&(a.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?a.credentials="include":r.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function o(r){if(r.ep)return;r.ep=!0;const a=t(r);fetch(r.href,a)}})();const Eg="modulepreload",_g=function(n){return"/"+n},gl={},pe=function(e,t,o){let r=Promise.resolve();if(t&&t.length>0){let l=function(d){return Promise.all(d.map(h=>Promise.resolve(h).then(g=>({status:"fulfilled",value:g}),g=>({status:"rejected",reason:g}))))};document.getElementsByTagName("link");const s=document.querySelector("meta[property=csp-nonce]"),c=s?.nonce||s?.getAttribute("nonce");r=l(t.map(d=>{if(d=_g(d),d in gl)return;gl[d]=!0;const h=d.endsWith(".css"),g=h?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${d}"]${g}`))return;const m=document.createElement("link");if(m.rel=h?"stylesheet":Eg,h||(m.as="script"),m.crossOrigin="",m.href=d,c&&m.setAttribute("nonce",c),document.head.appendChild(m),h)return new Promise((f,v)=>{m.addEventListener("load",f),m.addEventListener("error",()=>v(new Error(`Unable to preload CSS for ${d}`)))})}))}function a(s){const c=new Event("vite:preloadError",{cancelable:!0});if(c.payload=s,window.dispatchEvent(c),!c.defaultPrevented)throw s}return r.then(s=>{for(const c of s||[])c.status==="rejected"&&a(c.reason);return e().catch(a)})};function Qt({title:n="",content:e="",onClose:t=null}){console.log("🔧 Modal sendo criado com:",{title:n,content:e.substring(0,100)+"..."});const o=document.createElement("div");o.id="app-modal",o.className="modal fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50",o.onclick=a=>{a.target===o&&t&&t(),window.toggleFABOnModal&&window.toggleFABOnModal()};const r=document.createElement("div");return r.className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-6 max-w-md w-full relative",r.innerHTML=`
    <button class="absolute top-2 right-2 text-gray-400 hover:text-gray-700 dark:text-gray-200 text-2xl" aria-label="Fechar" id="modal-close-btn">&times;</button>
    <h2 class="text-xl font-bold mb-4">${n}</h2>
    <div class="modal-body">${e}</div>
  `,o.appendChild(r),r.querySelector("#modal-close-btn").onclick=a=>{a.stopPropagation(),t&&t(),window.toggleFABOnModal&&window.toggleFABOnModal()},window.toggleFABOnModal&&window.toggleFABOnModal(),console.log("🔧 Modal criado:",o),console.log("🔧 Modal HTML:",o.outerHTML.substring(0,200)+"..."),o}function xg({onSubmit:n,initialData:e={}}){const t=document.createElement("form");t.className="space-y-4",t.innerHTML=`
    <div class="form-group">
      <label class="form-label modal-label">Nome da Despesa Recorrente</label>
      <input type="text" id="rec-desc" required
             class="w-full px-3 py-2 border border-gray-300 rounded-lg"
             placeholder="Ex: Aluguel, Netflix, Academia"
             value="${e.descricao||""}"
             autocomplete="off"
             autocorrect="off"
             autocapitalize="words"
             style="background-color: var(--select-bg, #ffffff); color: var(--select-text, #1f2937); font-weight: 500; font-size: 16px;">
    </div>
    <div class="form-group">
      <label class="form-label modal-label">Valor da Despesa (R$)</label>
      <input type="number" id="rec-valor" required step="0.01" min="0"
             class="w-full px-3 py-2 border border-gray-300 rounded-lg"
             placeholder="0,00"
             value="${e.valorTotal||e.valor||""}"
             inputmode="decimal"
             autocomplete="off"
             style="background-color: var(--select-bg, #ffffff); color: var(--select-text, #1f2937); font-weight: 500; font-size: 16px;">
    </div>
    <div>
      <label class="modal-label">Tipo do Valor Informado</label>
      <div class="flex gap-4">
        <label class="flex items-center gap-2 cursor-pointer radio-label">
          <input type="radio" name="tipo-valor" value="total" 
                 class="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500" 
                 ${e.valorTotal&&!e.valor||!e.valorTotal&&!e.valor?"checked":""}>
          <span class="radio-text">Valor total (soma de todas as parcelas)</span>
        </label>
        <label class="flex items-center gap-2 cursor-pointer radio-label">
          <input type="radio" name="tipo-valor" value="parcela" 
                 class="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500" 
                 ${e.valor&&!e.valorTotal?"checked":""}>
          <span class="radio-text">Valor de cada parcela</span>
        </label>
      </div>
    </div>
    <div>
      <label class="modal-label">Categoria da Despesa</label>
      <select id="rec-categoria" required
              class="w-full px-3 py-2 border border-gray-300 rounded-lg"
              style="background-color: var(--select-bg, #ffffff); color: var(--select-text, #1f2937); font-weight: 500; font-size: 16px;">
        <option value="" style="background-color: var(--option-bg, #ffffff); color: var(--option-text, #1f2937); font-weight: 500; padding: 12px; font-size: 14px;">Selecione uma categoria...</option>
        ${(window.appState.categories||[]).sort((r,a)=>r.nome.localeCompare(a.nome,"pt-BR",{sensitivity:"base"})).map(r=>{const a=new Date,s=a.getFullYear(),c=a.getMonth()+1,d=(window.appState.transactions||[]).filter(f=>{if(f.categoriaId!==r.id||f.tipo!==r.tipo)return!1;let v;f.createdAt&&typeof f.createdAt=="object"&&f.createdAt.seconds?v=new Date(f.createdAt.seconds*1e3):v=new Date(f.createdAt);const b=v.getFullYear(),T=v.getMonth()+1;return b===s&&T===c}).reduce((f,v)=>f+parseFloat(v.valor),0),h=parseFloat(r.limite||0),g=r.tipo==="receita"?d:h-d;let m=r.nome;return h>0&&(m+=` - Limite: R$ ${h.toFixed(2)}`,r.tipo==="despesa"?m+=` (Disponível: R$ ${Math.max(0,g).toFixed(2)})`:m+=` (Recebido: R$ ${d.toFixed(2)})`),`<option value="${r.id}" ${e.categoriaId===r.id?"selected":""} style="background-color: var(--option-bg, #ffffff); color: var(--option-text, #1f2937); font-weight: 500; padding: 8px;">${m}</option>`}).join("")}
      </select>
    </div>
    <div>
      <label class="modal-label">Data de Início da Recorrência</label>
      <input type="date" id="rec-data" required
             class="w-full px-3 py-2 border border-gray-300 rounded-lg"
             value="${e.dataInicio||new Date().toISOString().split("T")[0]}"
             style="background-color: var(--select-bg, #ffffff); color: var(--select-text, #1f2937); font-weight: 500;">
    </div>
    <div>
      <label class="modal-label">Número de Parcelas (deixe vazio para infinito)</label>
      <input type="number" id="rec-parcelas" min="0"
             class="w-full px-3 py-2 border border-gray-300 rounded-lg"
             placeholder="Ex: 12 para 1 ano, 24 para 2 anos"
             value="${e.parcelasRestantes||""}"
             style="background-color: var(--select-bg, #ffffff); color: var(--select-text, #1f2937); font-weight: 500;">
    </div>
    <div id="recorrente-valores-info" class="text-xs text-gray-600 modal-info"></div>
    <div class="flex items-center gap-2">
      <input type="checkbox" id="rec-efetivar" 
             class="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500 focus:ring-2" 
             ${e.efetivarMesAtual?"checked":""} />
      <label for="rec-efetivar" class="checkbox-label">Criar transação para este mês automaticamente</label>
    </div>
    <div class="flex justify-end space-x-3 pt-4">
      <button type="button" onclick="closeModal()" class="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg">Cancelar</button>
      <button type="submit" class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">Salvar</button>
    </div>
  `;function o(){const r=document.getElementById("rec-valor"),a=document.getElementById("rec-parcelas"),s=t.querySelector('input[name="tipo-valor"]:checked'),c=r&&parseFloat(r.value)||0,l=a&&parseInt(a.value)||0,d=s?s.value:"total",h=document.getElementById("recorrente-valores-info");if(l>1&&c>0)if(d==="total"){const g=c/l;h.innerHTML=`<b>Valor total:</b> R$ ${c.toFixed(2)} &nbsp; | &nbsp; <b>Valor por parcela:</b> R$ ${g.toFixed(2)}`}else{const g=c*l;h.innerHTML=`<b>Valor total:</b> R$ ${g.toFixed(2)} &nbsp; | &nbsp; <b>Valor por parcela:</b> R$ ${c.toFixed(2)}`}else c>0?h.innerHTML=`<b>Valor:</b> R$ ${c.toFixed(2)}`:h.innerHTML=""}return t.querySelector("#rec-valor").addEventListener("input",o),t.querySelector("#rec-parcelas").addEventListener("input",o),t.querySelectorAll('input[name="tipo-valor"]').forEach(r=>{r.addEventListener("change",o)}),setTimeout(()=>{if(o(),!t.querySelector('input[name="tipo-valor"]:checked')){const s=t.querySelector('input[name="tipo-valor"][value="total"]');s&&(s.checked=!0,s.dispatchEvent(new Event("change")))}const a=t.querySelector("#rec-efetivar");if(a){const s=e.efetivarMesAtual===!0||e.efetivarMesAtual==="true";a.checked=s}},100),t.addEventListener("submit",r=>{r.preventDefault();const a=parseFloat(document.getElementById("rec-valor").value);let s=document.getElementById("rec-parcelas").value?parseInt(document.getElementById("rec-parcelas").value):null;s!==null&&s<1&&(s=null);const c=t.querySelector('input[name="tipo-valor"]:checked').value;let l=a,d=a;s&&s>1?c==="total"?(l=+(a/s).toFixed(2),d=+(l.toFixed(2)*s).toFixed(2)):(l=+a.toFixed(2),d=+(l*s).toFixed(2)):(l=+a.toFixed(2),d=+a.toFixed(2));const h={descricao:document.getElementById("rec-desc").value,valor:l,valorTotal:d,categoriaId:document.getElementById("rec-categoria").value,dataInicio:document.getElementById("rec-data").value,parcelasRestantes:s,parcelasTotal:s,ativa:!0,efetivarMesAtual:document.getElementById("rec-efetivar").checked};n(h)}),t}const Tg=()=>{};var ml={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Yd=function(n){const e=[];let t=0;for(let o=0;o<n.length;o++){let r=n.charCodeAt(o);r<128?e[t++]=r:r<2048?(e[t++]=r>>6|192,e[t++]=r&63|128):(r&64512)===55296&&o+1<n.length&&(n.charCodeAt(o+1)&64512)===56320?(r=65536+((r&1023)<<10)+(n.charCodeAt(++o)&1023),e[t++]=r>>18|240,e[t++]=r>>12&63|128,e[t++]=r>>6&63|128,e[t++]=r&63|128):(e[t++]=r>>12|224,e[t++]=r>>6&63|128,e[t++]=r&63|128)}return e},Sg=function(n){const e=[];let t=0,o=0;for(;t<n.length;){const r=n[t++];if(r<128)e[o++]=String.fromCharCode(r);else if(r>191&&r<224){const a=n[t++];e[o++]=String.fromCharCode((r&31)<<6|a&63)}else if(r>239&&r<365){const a=n[t++],s=n[t++],c=n[t++],l=((r&7)<<18|(a&63)<<12|(s&63)<<6|c&63)-65536;e[o++]=String.fromCharCode(55296+(l>>10)),e[o++]=String.fromCharCode(56320+(l&1023))}else{const a=n[t++],s=n[t++];e[o++]=String.fromCharCode((r&15)<<12|(a&63)<<6|s&63)}}return e.join("")},Xd={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,e){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();const t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,o=[];for(let r=0;r<n.length;r+=3){const a=n[r],s=r+1<n.length,c=s?n[r+1]:0,l=r+2<n.length,d=l?n[r+2]:0,h=a>>2,g=(a&3)<<4|c>>4;let m=(c&15)<<2|d>>6,f=d&63;l||(f=64,s||(m=64)),o.push(t[h],t[g],t[m],t[f])}return o.join("")},encodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(n):this.encodeByteArray(Yd(n),e)},decodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(n):Sg(this.decodeStringToByteArray(n,e))},decodeStringToByteArray(n,e){this.init_();const t=e?this.charToByteMapWebSafe_:this.charToByteMap_,o=[];for(let r=0;r<n.length;){const a=t[n.charAt(r++)],c=r<n.length?t[n.charAt(r)]:0;++r;const d=r<n.length?t[n.charAt(r)]:64;++r;const g=r<n.length?t[n.charAt(r)]:64;if(++r,a==null||c==null||d==null||g==null)throw new Ig;const m=a<<2|c>>4;if(o.push(m),d!==64){const f=c<<4&240|d>>2;if(o.push(f),g!==64){const v=d<<6&192|g;o.push(v)}}}return o},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}};class Ig extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const Ag=function(n){const e=Yd(n);return Xd.encodeByteArray(e,!0)},Gr=function(n){return Ag(n).replace(/\./g,"")},Qd=function(n){try{return Xd.decodeString(n,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function kg(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Cg=()=>kg().__FIREBASE_DEFAULTS__,Rg=()=>{if(typeof process>"u"||typeof ml>"u")return;const n=ml.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},Pg=()=>{if(typeof document>"u")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=n&&Qd(n[1]);return e&&JSON.parse(e)},ga=()=>{try{return Tg()||Cg()||Rg()||Pg()}catch(n){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);return}},Jd=n=>ga()?.emulatorHosts?.[n],Dg=n=>{const e=Jd(n);if(!e)return;const t=e.lastIndexOf(":");if(t<=0||t+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const o=parseInt(e.substring(t+1),10);return e[0]==="["?[e.substring(1,t-1),o]:[e.substring(0,t),o]},Zd=()=>ga()?.config,eu=n=>ga()?.[`_${n}`];/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Mg{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,o)=>{t?this.reject(t):this.resolve(o),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,o))}}}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Qn(n){try{return(n.startsWith("http://")||n.startsWith("https://")?new URL(n).hostname:n).endsWith(".cloudworkstations.dev")}catch{return!1}}async function tu(n){return(await fetch(n,{credentials:"include"})).ok}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ng(n,e){if(n.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const t={alg:"none",type:"JWT"},o=e||"demo-project",r=n.iat||0,a=n.sub||n.user_id;if(!a)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const s={iss:`https://securetoken.google.com/${o}`,aud:o,iat:r,exp:r+3600,auth_time:r,sub:a,user_id:a,firebase:{sign_in_provider:"custom",identities:{}},...n};return[Gr(JSON.stringify(t)),Gr(JSON.stringify(s)),""].join(".")}const Ao={};function $g(){const n={prod:[],emulator:[]};for(const e of Object.keys(Ao))Ao[e]?n.emulator.push(e):n.prod.push(e);return n}function Lg(n){let e=document.getElementById(n),t=!1;return e||(e=document.createElement("div"),e.setAttribute("id",n),t=!0),{created:t,element:e}}let fl=!1;function nu(n,e){if(typeof window>"u"||typeof document>"u"||!Qn(window.location.host)||Ao[n]===e||Ao[n]||fl)return;Ao[n]=e;function t(m){return`__firebase__banner__${m}`}const o="__firebase__banner",a=$g().prod.length>0;function s(){const m=document.getElementById(o);m&&m.remove()}function c(m){m.style.display="flex",m.style.background="#7faaf0",m.style.position="fixed",m.style.bottom="5px",m.style.left="5px",m.style.padding=".5em",m.style.borderRadius="5px",m.style.alignItems="center"}function l(m,f){m.setAttribute("width","24"),m.setAttribute("id",f),m.setAttribute("height","24"),m.setAttribute("viewBox","0 0 24 24"),m.setAttribute("fill","none"),m.style.marginLeft="-6px"}function d(){const m=document.createElement("span");return m.style.cursor="pointer",m.style.marginLeft="16px",m.style.fontSize="24px",m.innerHTML=" &times;",m.onclick=()=>{fl=!0,s()},m}function h(m,f){m.setAttribute("id",f),m.innerText="Learn more",m.href="https://firebase.google.com/docs/studio/preview-apps#preview-backend",m.setAttribute("target","__blank"),m.style.paddingLeft="5px",m.style.textDecoration="underline"}function g(){const m=Lg(o),f=t("text"),v=document.getElementById(f)||document.createElement("span"),b=t("learnmore"),T=document.getElementById(b)||document.createElement("a"),D=t("preprendIcon"),L=document.getElementById(D)||document.createElementNS("http://www.w3.org/2000/svg","svg");if(m.created){const O=m.element;c(O),h(T,b);const Q=d();l(L,D),O.append(L,v,T,Q),document.body.appendChild(O)}a?(v.innerText="Preview backend disconnected.",L.innerHTML=`<g clip-path="url(#clip0_6013_33858)">
<path d="M4.8 17.6L12 5.6L19.2 17.6H4.8ZM6.91667 16.4H17.0833L12 7.93333L6.91667 16.4ZM12 15.6C12.1667 15.6 12.3056 15.5444 12.4167 15.4333C12.5389 15.3111 12.6 15.1667 12.6 15C12.6 14.8333 12.5389 14.6944 12.4167 14.5833C12.3056 14.4611 12.1667 14.4 12 14.4C11.8333 14.4 11.6889 14.4611 11.5667 14.5833C11.4556 14.6944 11.4 14.8333 11.4 15C11.4 15.1667 11.4556 15.3111 11.5667 15.4333C11.6889 15.5444 11.8333 15.6 12 15.6ZM11.4 13.6H12.6V10.4H11.4V13.6Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6013_33858">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`):(L.innerHTML=`<g clip-path="url(#clip0_6083_34804)">
<path d="M11.4 15.2H12.6V11.2H11.4V15.2ZM12 10C12.1667 10 12.3056 9.94444 12.4167 9.83333C12.5389 9.71111 12.6 9.56667 12.6 9.4C12.6 9.23333 12.5389 9.09444 12.4167 8.98333C12.3056 8.86111 12.1667 8.8 12 8.8C11.8333 8.8 11.6889 8.86111 11.5667 8.98333C11.4556 9.09444 11.4 9.23333 11.4 9.4C11.4 9.56667 11.4556 9.71111 11.5667 9.83333C11.6889 9.94444 11.8333 10 12 10ZM12 18.4C11.1222 18.4 10.2944 18.2333 9.51667 17.9C8.73889 17.5667 8.05556 17.1111 7.46667 16.5333C6.88889 15.9444 6.43333 15.2611 6.1 14.4833C5.76667 13.7056 5.6 12.8778 5.6 12C5.6 11.1111 5.76667 10.2833 6.1 9.51667C6.43333 8.73889 6.88889 8.06111 7.46667 7.48333C8.05556 6.89444 8.73889 6.43333 9.51667 6.1C10.2944 5.76667 11.1222 5.6 12 5.6C12.8889 5.6 13.7167 5.76667 14.4833 6.1C15.2611 6.43333 15.9389 6.89444 16.5167 7.48333C17.1056 8.06111 17.5667 8.73889 17.9 9.51667C18.2333 10.2833 18.4 11.1111 18.4 12C18.4 12.8778 18.2333 13.7056 17.9 14.4833C17.5667 15.2611 17.1056 15.9444 16.5167 16.5333C15.9389 17.1111 15.2611 17.5667 14.4833 17.9C13.7167 18.2333 12.8889 18.4 12 18.4ZM12 17.2C13.4444 17.2 14.6722 16.6944 15.6833 15.6833C16.6944 14.6722 17.2 13.4444 17.2 12C17.2 10.5556 16.6944 9.32778 15.6833 8.31667C14.6722 7.30555 13.4444 6.8 12 6.8C10.5556 6.8 9.32778 7.30555 8.31667 8.31667C7.30556 9.32778 6.8 10.5556 6.8 12C6.8 13.4444 7.30556 14.6722 8.31667 15.6833C9.32778 16.6944 10.5556 17.2 12 17.2Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6083_34804">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`,v.innerText="Preview backend running in this workspace."),v.setAttribute("id",f)}document.readyState==="loading"?window.addEventListener("DOMContentLoaded",g):g()}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ze(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function Fg(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(ze())}function Vg(){const n=ga()?.forceEnvironment;if(n==="node")return!0;if(n==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function Og(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function Bg(){const n=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof n=="object"&&n.id!==void 0}function Ug(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function zg(){const n=ze();return n.indexOf("MSIE ")>=0||n.indexOf("Trident/")>=0}function qg(){return!Vg()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function jg(){try{return typeof indexedDB=="object"}catch{return!1}}function Hg(){return new Promise((n,e)=>{try{let t=!0;const o="validate-browser-context-for-indexeddb-analytics-module",r=self.indexedDB.open(o);r.onsuccess=()=>{r.result.close(),t||self.indexedDB.deleteDatabase(o),n(!0)},r.onupgradeneeded=()=>{t=!1},r.onerror=()=>{e(r.error?.message||"")}}catch(t){e(t)}})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Gg="FirebaseError";class kt extends Error{constructor(e,t,o){super(t),this.code=e,this.customData=o,this.name=Gg,Object.setPrototypeOf(this,kt.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,Jo.prototype.create)}}class Jo{constructor(e,t,o){this.service=e,this.serviceName=t,this.errors=o}create(e,...t){const o=t[0]||{},r=`${this.service}/${e}`,a=this.errors[e],s=a?Wg(a,o):"Error",c=`${this.serviceName}: ${s} (${r}).`;return new kt(r,c,o)}}function Wg(n,e){return n.replace(Kg,(t,o)=>{const r=e[o];return r!=null?String(r):`<${o}?>`})}const Kg=/\{\$([^}]+)}/g;function Yg(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}function xt(n,e){if(n===e)return!0;const t=Object.keys(n),o=Object.keys(e);for(const r of t){if(!o.includes(r))return!1;const a=n[r],s=e[r];if(wl(a)&&wl(s)){if(!xt(a,s))return!1}else if(a!==s)return!1}for(const r of o)if(!t.includes(r))return!1;return!0}function wl(n){return n!==null&&typeof n=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Zo(n){const e=[];for(const[t,o]of Object.entries(n))Array.isArray(o)?o.forEach(r=>{e.push(encodeURIComponent(t)+"="+encodeURIComponent(r))}):e.push(encodeURIComponent(t)+"="+encodeURIComponent(o));return e.length?"&"+e.join("&"):""}function Xg(n,e){const t=new Qg(n,e);return t.subscribe.bind(t)}class Qg{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(o=>{this.error(o)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,o){let r;if(e===void 0&&t===void 0&&o===void 0)throw new Error("Missing Observer.");Jg(e,["next","error","complete"])?r=e:r={next:e,error:t,complete:o},r.next===void 0&&(r.next=bs),r.error===void 0&&(r.error=bs),r.complete===void 0&&(r.complete=bs);const a=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?r.error(this.finalError):r.complete()}catch{}}),this.observers.push(r),a}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{t(this.observers[e])}catch(o){typeof console<"u"&&console.error&&console.error(o)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function Jg(n,e){if(typeof n!="object"||n===null)return!1;for(const t of e)if(t in n&&typeof n[t]=="function")return!0;return!1}function bs(){}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ie(n){return n&&n._delegate?n._delegate:n}class pn{constructor(e,t,o){this.name=e,this.instanceFactory=t,this.type=o,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const sn="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zg{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const o=new Mg;if(this.instancesDeferred.set(t,o),this.isInitialized(t)||this.shouldAutoInitialize())try{const r=this.getOrInitializeService({instanceIdentifier:t});r&&o.resolve(r)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){const t=this.normalizeInstanceIdentifier(e?.identifier),o=e?.optional??!1;if(this.isInitialized(t)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:t})}catch(r){if(o)return null;throw r}else{if(o)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(tm(e))try{this.getOrInitializeService({instanceIdentifier:sn})}catch{}for(const[t,o]of this.instancesDeferred.entries()){const r=this.normalizeInstanceIdentifier(t);try{const a=this.getOrInitializeService({instanceIdentifier:r});o.resolve(a)}catch{}}}}clearInstance(e=sn){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=sn){return this.instances.has(e)}getOptions(e=sn){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,o=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(o))throw Error(`${this.name}(${o}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const r=this.getOrInitializeService({instanceIdentifier:o,options:t});for(const[a,s]of this.instancesDeferred.entries()){const c=this.normalizeInstanceIdentifier(a);o===c&&s.resolve(r)}return r}onInit(e,t){const o=this.normalizeInstanceIdentifier(t),r=this.onInitCallbacks.get(o)??new Set;r.add(e),this.onInitCallbacks.set(o,r);const a=this.instances.get(o);return a&&e(a,o),()=>{r.delete(e)}}invokeOnInitCallbacks(e,t){const o=this.onInitCallbacks.get(t);if(o)for(const r of o)try{r(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let o=this.instances.get(e);if(!o&&this.component&&(o=this.component.instanceFactory(this.container,{instanceIdentifier:em(e),options:t}),this.instances.set(e,o),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(o,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,o)}catch{}return o||null}normalizeInstanceIdentifier(e=sn){return this.component?this.component.multipleInstances?e:sn:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function em(n){return n===sn?void 0:n}function tm(n){return n.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nm{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new Zg(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Z;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})(Z||(Z={}));const om={debug:Z.DEBUG,verbose:Z.VERBOSE,info:Z.INFO,warn:Z.WARN,error:Z.ERROR,silent:Z.SILENT},rm=Z.INFO,am={[Z.DEBUG]:"log",[Z.VERBOSE]:"log",[Z.INFO]:"info",[Z.WARN]:"warn",[Z.ERROR]:"error"},sm=(n,e,...t)=>{if(e<n.logLevel)return;const o=new Date().toISOString(),r=am[e];if(r)console[r](`[${o}]  ${n.name}:`,...t);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class ci{constructor(e){this.name=e,this._logLevel=rm,this._logHandler=sm,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in Z))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?om[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,Z.DEBUG,...e),this._logHandler(this,Z.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,Z.VERBOSE,...e),this._logHandler(this,Z.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,Z.INFO,...e),this._logHandler(this,Z.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,Z.WARN,...e),this._logHandler(this,Z.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,Z.ERROR,...e),this._logHandler(this,Z.ERROR,...e)}}const im=(n,e)=>e.some(t=>n instanceof t);let vl,yl;function cm(){return vl||(vl=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function lm(){return yl||(yl=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const ou=new WeakMap,$s=new WeakMap,ru=new WeakMap,Es=new WeakMap,li=new WeakMap;function dm(n){const e=new Promise((t,o)=>{const r=()=>{n.removeEventListener("success",a),n.removeEventListener("error",s)},a=()=>{t(Ft(n.result)),r()},s=()=>{o(n.error),r()};n.addEventListener("success",a),n.addEventListener("error",s)});return e.then(t=>{t instanceof IDBCursor&&ou.set(t,n)}).catch(()=>{}),li.set(e,n),e}function um(n){if($s.has(n))return;const e=new Promise((t,o)=>{const r=()=>{n.removeEventListener("complete",a),n.removeEventListener("error",s),n.removeEventListener("abort",s)},a=()=>{t(),r()},s=()=>{o(n.error||new DOMException("AbortError","AbortError")),r()};n.addEventListener("complete",a),n.addEventListener("error",s),n.addEventListener("abort",s)});$s.set(n,e)}let Ls={get(n,e,t){if(n instanceof IDBTransaction){if(e==="done")return $s.get(n);if(e==="objectStoreNames")return n.objectStoreNames||ru.get(n);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return Ft(n[e])},set(n,e,t){return n[e]=t,!0},has(n,e){return n instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in n}};function hm(n){Ls=n(Ls)}function pm(n){return n===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){const o=n.call(_s(this),e,...t);return ru.set(o,e.sort?e.sort():[e]),Ft(o)}:lm().includes(n)?function(...e){return n.apply(_s(this),e),Ft(ou.get(this))}:function(...e){return Ft(n.apply(_s(this),e))}}function gm(n){return typeof n=="function"?pm(n):(n instanceof IDBTransaction&&um(n),im(n,cm())?new Proxy(n,Ls):n)}function Ft(n){if(n instanceof IDBRequest)return dm(n);if(Es.has(n))return Es.get(n);const e=gm(n);return e!==n&&(Es.set(n,e),li.set(e,n)),e}const _s=n=>li.get(n);function mm(n,e,{blocked:t,upgrade:o,blocking:r,terminated:a}={}){const s=indexedDB.open(n,e),c=Ft(s);return o&&s.addEventListener("upgradeneeded",l=>{o(Ft(s.result),l.oldVersion,l.newVersion,Ft(s.transaction),l)}),t&&s.addEventListener("blocked",l=>t(l.oldVersion,l.newVersion,l)),c.then(l=>{a&&l.addEventListener("close",()=>a()),r&&l.addEventListener("versionchange",d=>r(d.oldVersion,d.newVersion,d))}).catch(()=>{}),c}const fm=["get","getKey","getAll","getAllKeys","count"],wm=["put","add","delete","clear"],xs=new Map;function bl(n,e){if(!(n instanceof IDBDatabase&&!(e in n)&&typeof e=="string"))return;if(xs.get(e))return xs.get(e);const t=e.replace(/FromIndex$/,""),o=e!==t,r=wm.includes(t);if(!(t in(o?IDBIndex:IDBObjectStore).prototype)||!(r||fm.includes(t)))return;const a=async function(s,...c){const l=this.transaction(s,r?"readwrite":"readonly");let d=l.store;return o&&(d=d.index(c.shift())),(await Promise.all([d[t](...c),r&&l.done]))[0]};return xs.set(e,a),a}hm(n=>({...n,get:(e,t,o)=>bl(e,t)||n.get(e,t,o),has:(e,t)=>!!bl(e,t)||n.has(e,t)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vm{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(ym(t)){const o=t.getImmediate();return`${o.library}/${o.version}`}else return null}).filter(t=>t).join(" ")}}function ym(n){return n.getComponent()?.type==="VERSION"}const Fs="@firebase/app",El="0.14.0";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Tt=new ci("@firebase/app"),bm="@firebase/app-compat",Em="@firebase/analytics-compat",_m="@firebase/analytics",xm="@firebase/app-check-compat",Tm="@firebase/app-check",Sm="@firebase/auth",Im="@firebase/auth-compat",Am="@firebase/database",km="@firebase/data-connect",Cm="@firebase/database-compat",Rm="@firebase/functions",Pm="@firebase/functions-compat",Dm="@firebase/installations",Mm="@firebase/installations-compat",Nm="@firebase/messaging",$m="@firebase/messaging-compat",Lm="@firebase/performance",Fm="@firebase/performance-compat",Vm="@firebase/remote-config",Om="@firebase/remote-config-compat",Bm="@firebase/storage",Um="@firebase/storage-compat",zm="@firebase/firestore",qm="@firebase/ai",jm="@firebase/firestore-compat",Hm="firebase",Gm="12.0.0";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Vs="[DEFAULT]",Wm={[Fs]:"fire-core",[bm]:"fire-core-compat",[_m]:"fire-analytics",[Em]:"fire-analytics-compat",[Tm]:"fire-app-check",[xm]:"fire-app-check-compat",[Sm]:"fire-auth",[Im]:"fire-auth-compat",[Am]:"fire-rtdb",[km]:"fire-data-connect",[Cm]:"fire-rtdb-compat",[Rm]:"fire-fn",[Pm]:"fire-fn-compat",[Dm]:"fire-iid",[Mm]:"fire-iid-compat",[Nm]:"fire-fcm",[$m]:"fire-fcm-compat",[Lm]:"fire-perf",[Fm]:"fire-perf-compat",[Vm]:"fire-rc",[Om]:"fire-rc-compat",[Bm]:"fire-gcs",[Um]:"fire-gcs-compat",[zm]:"fire-fst",[jm]:"fire-fst-compat",[qm]:"fire-vertex","fire-js":"fire-js",[Hm]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Wr=new Map,Km=new Map,Os=new Map;function _l(n,e){try{n.container.addComponent(e)}catch(t){Tt.debug(`Component ${e.name} failed to register with FirebaseApp ${n.name}`,t)}}function Un(n){const e=n.name;if(Os.has(e))return Tt.debug(`There were multiple attempts to register component ${e}.`),!1;Os.set(e,n);for(const t of Wr.values())_l(t,n);for(const t of Km.values())_l(t,n);return!0}function di(n,e){const t=n.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),n.container.getProvider(e)}function et(n){return n==null?!1:n.settings!==void 0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ym={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},Vt=new Jo("app","Firebase",Ym);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xm{constructor(e,t,o){this._isDeleted=!1,this._options={...e},this._config={...t},this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=o,this.container.addComponent(new pn("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw Vt.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Jn=Gm;function au(n,e={}){let t=n;typeof e!="object"&&(e={name:e});const o={name:Vs,automaticDataCollectionEnabled:!0,...e},r=o.name;if(typeof r!="string"||!r)throw Vt.create("bad-app-name",{appName:String(r)});if(t||(t=Zd()),!t)throw Vt.create("no-options");const a=Wr.get(r);if(a){if(xt(t,a.options)&&xt(o,a.config))return a;throw Vt.create("duplicate-app",{appName:r})}const s=new nm(r);for(const l of Os.values())s.addComponent(l);const c=new Xm(t,o,s);return Wr.set(r,c),c}function su(n=Vs){const e=Wr.get(n);if(!e&&n===Vs&&Zd())return au();if(!e)throw Vt.create("no-app",{appName:n});return e}function Ot(n,e,t){let o=Wm[n]??n;t&&(o+=`-${t}`);const r=o.match(/\s|\//),a=e.match(/\s|\//);if(r||a){const s=[`Unable to register library "${o}" with version "${e}":`];r&&s.push(`library name "${o}" contains illegal characters (whitespace or "/")`),r&&a&&s.push("and"),a&&s.push(`version name "${e}" contains illegal characters (whitespace or "/")`),Tt.warn(s.join(" "));return}Un(new pn(`${o}-version`,()=>({library:o,version:e}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Qm="firebase-heartbeat-database",Jm=1,Bo="firebase-heartbeat-store";let Ts=null;function iu(){return Ts||(Ts=mm(Qm,Jm,{upgrade:(n,e)=>{switch(e){case 0:try{n.createObjectStore(Bo)}catch(t){console.warn(t)}}}}).catch(n=>{throw Vt.create("idb-open",{originalErrorMessage:n.message})})),Ts}async function Zm(n){try{const t=(await iu()).transaction(Bo),o=await t.objectStore(Bo).get(cu(n));return await t.done,o}catch(e){if(e instanceof kt)Tt.warn(e.message);else{const t=Vt.create("idb-get",{originalErrorMessage:e?.message});Tt.warn(t.message)}}}async function xl(n,e){try{const o=(await iu()).transaction(Bo,"readwrite");await o.objectStore(Bo).put(e,cu(n)),await o.done}catch(t){if(t instanceof kt)Tt.warn(t.message);else{const o=Vt.create("idb-set",{originalErrorMessage:t?.message});Tt.warn(o.message)}}}function cu(n){return`${n.name}!${n.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ef=1024,tf=30;class nf{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new rf(t),this._heartbeatsCachePromise=this._storage.read().then(o=>(this._heartbeatsCache=o,o))}async triggerHeartbeat(){try{const t=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),o=Tl();if(this._heartbeatsCache?.heartbeats==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null)||this._heartbeatsCache.lastSentHeartbeatDate===o||this._heartbeatsCache.heartbeats.some(r=>r.date===o))return;if(this._heartbeatsCache.heartbeats.push({date:o,agent:t}),this._heartbeatsCache.heartbeats.length>tf){const r=af(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(r,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(e){Tt.warn(e)}}async getHeartbeatsHeader(){try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null||this._heartbeatsCache.heartbeats.length===0)return"";const e=Tl(),{heartbeatsToSend:t,unsentEntries:o}=of(this._heartbeatsCache.heartbeats),r=Gr(JSON.stringify({version:2,heartbeats:t}));return this._heartbeatsCache.lastSentHeartbeatDate=e,o.length>0?(this._heartbeatsCache.heartbeats=o,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),r}catch(e){return Tt.warn(e),""}}}function Tl(){return new Date().toISOString().substring(0,10)}function of(n,e=ef){const t=[];let o=n.slice();for(const r of n){const a=t.find(s=>s.agent===r.agent);if(a){if(a.dates.push(r.date),Sl(t)>e){a.dates.pop();break}}else if(t.push({agent:r.agent,dates:[r.date]}),Sl(t)>e){t.pop();break}o=o.slice(1)}return{heartbeatsToSend:t,unsentEntries:o}}class rf{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return jg()?Hg().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const t=await Zm(this.app);return t?.heartbeats?t:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){if(await this._canUseIndexedDBPromise){const o=await this.read();return xl(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??o.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){if(await this._canUseIndexedDBPromise){const o=await this.read();return xl(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??o.lastSentHeartbeatDate,heartbeats:[...o.heartbeats,...e.heartbeats]})}else return}}function Sl(n){return Gr(JSON.stringify({version:2,heartbeats:n})).length}function af(n){if(n.length===0)return-1;let e=0,t=n[0].date;for(let o=1;o<n.length;o++)n[o].date<t&&(t=n[o].date,e=o);return e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function sf(n){Un(new pn("platform-logger",e=>new vm(e),"PRIVATE")),Un(new pn("heartbeat",e=>new nf(e),"PRIVATE")),Ot(Fs,El,n),Ot(Fs,El,"esm2020"),Ot("fire-js","")}sf("");var Il=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var Bt,lu;(function(){var n;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function e(x,y){function E(){}E.prototype=y.prototype,x.D=y.prototype,x.prototype=new E,x.prototype.constructor=x,x.C=function(S,I,A){for(var _=Array(arguments.length-2),Pe=2;Pe<arguments.length;Pe++)_[Pe-2]=arguments[Pe];return y.prototype[I].apply(S,_)}}function t(){this.blockSize=-1}function o(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.B=Array(this.blockSize),this.o=this.h=0,this.s()}e(o,t),o.prototype.s=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function r(x,y,E){E||(E=0);var S=Array(16);if(typeof y=="string")for(var I=0;16>I;++I)S[I]=y.charCodeAt(E++)|y.charCodeAt(E++)<<8|y.charCodeAt(E++)<<16|y.charCodeAt(E++)<<24;else for(I=0;16>I;++I)S[I]=y[E++]|y[E++]<<8|y[E++]<<16|y[E++]<<24;y=x.g[0],E=x.g[1],I=x.g[2];var A=x.g[3],_=y+(A^E&(I^A))+S[0]+3614090360&4294967295;y=E+(_<<7&4294967295|_>>>25),_=A+(I^y&(E^I))+S[1]+3905402710&4294967295,A=y+(_<<12&4294967295|_>>>20),_=I+(E^A&(y^E))+S[2]+606105819&4294967295,I=A+(_<<17&4294967295|_>>>15),_=E+(y^I&(A^y))+S[3]+3250441966&4294967295,E=I+(_<<22&4294967295|_>>>10),_=y+(A^E&(I^A))+S[4]+4118548399&4294967295,y=E+(_<<7&4294967295|_>>>25),_=A+(I^y&(E^I))+S[5]+1200080426&4294967295,A=y+(_<<12&4294967295|_>>>20),_=I+(E^A&(y^E))+S[6]+2821735955&4294967295,I=A+(_<<17&4294967295|_>>>15),_=E+(y^I&(A^y))+S[7]+4249261313&4294967295,E=I+(_<<22&4294967295|_>>>10),_=y+(A^E&(I^A))+S[8]+1770035416&4294967295,y=E+(_<<7&4294967295|_>>>25),_=A+(I^y&(E^I))+S[9]+2336552879&4294967295,A=y+(_<<12&4294967295|_>>>20),_=I+(E^A&(y^E))+S[10]+4294925233&4294967295,I=A+(_<<17&4294967295|_>>>15),_=E+(y^I&(A^y))+S[11]+2304563134&4294967295,E=I+(_<<22&4294967295|_>>>10),_=y+(A^E&(I^A))+S[12]+1804603682&4294967295,y=E+(_<<7&4294967295|_>>>25),_=A+(I^y&(E^I))+S[13]+4254626195&4294967295,A=y+(_<<12&4294967295|_>>>20),_=I+(E^A&(y^E))+S[14]+2792965006&4294967295,I=A+(_<<17&4294967295|_>>>15),_=E+(y^I&(A^y))+S[15]+1236535329&4294967295,E=I+(_<<22&4294967295|_>>>10),_=y+(I^A&(E^I))+S[1]+4129170786&4294967295,y=E+(_<<5&4294967295|_>>>27),_=A+(E^I&(y^E))+S[6]+3225465664&4294967295,A=y+(_<<9&4294967295|_>>>23),_=I+(y^E&(A^y))+S[11]+643717713&4294967295,I=A+(_<<14&4294967295|_>>>18),_=E+(A^y&(I^A))+S[0]+3921069994&4294967295,E=I+(_<<20&4294967295|_>>>12),_=y+(I^A&(E^I))+S[5]+3593408605&4294967295,y=E+(_<<5&4294967295|_>>>27),_=A+(E^I&(y^E))+S[10]+38016083&4294967295,A=y+(_<<9&4294967295|_>>>23),_=I+(y^E&(A^y))+S[15]+3634488961&4294967295,I=A+(_<<14&4294967295|_>>>18),_=E+(A^y&(I^A))+S[4]+3889429448&4294967295,E=I+(_<<20&4294967295|_>>>12),_=y+(I^A&(E^I))+S[9]+568446438&4294967295,y=E+(_<<5&4294967295|_>>>27),_=A+(E^I&(y^E))+S[14]+3275163606&4294967295,A=y+(_<<9&4294967295|_>>>23),_=I+(y^E&(A^y))+S[3]+4107603335&4294967295,I=A+(_<<14&4294967295|_>>>18),_=E+(A^y&(I^A))+S[8]+1163531501&4294967295,E=I+(_<<20&4294967295|_>>>12),_=y+(I^A&(E^I))+S[13]+2850285829&4294967295,y=E+(_<<5&4294967295|_>>>27),_=A+(E^I&(y^E))+S[2]+4243563512&4294967295,A=y+(_<<9&4294967295|_>>>23),_=I+(y^E&(A^y))+S[7]+1735328473&4294967295,I=A+(_<<14&4294967295|_>>>18),_=E+(A^y&(I^A))+S[12]+2368359562&4294967295,E=I+(_<<20&4294967295|_>>>12),_=y+(E^I^A)+S[5]+4294588738&4294967295,y=E+(_<<4&4294967295|_>>>28),_=A+(y^E^I)+S[8]+2272392833&4294967295,A=y+(_<<11&4294967295|_>>>21),_=I+(A^y^E)+S[11]+1839030562&4294967295,I=A+(_<<16&4294967295|_>>>16),_=E+(I^A^y)+S[14]+4259657740&4294967295,E=I+(_<<23&4294967295|_>>>9),_=y+(E^I^A)+S[1]+2763975236&4294967295,y=E+(_<<4&4294967295|_>>>28),_=A+(y^E^I)+S[4]+1272893353&4294967295,A=y+(_<<11&4294967295|_>>>21),_=I+(A^y^E)+S[7]+4139469664&4294967295,I=A+(_<<16&4294967295|_>>>16),_=E+(I^A^y)+S[10]+3200236656&4294967295,E=I+(_<<23&4294967295|_>>>9),_=y+(E^I^A)+S[13]+681279174&4294967295,y=E+(_<<4&4294967295|_>>>28),_=A+(y^E^I)+S[0]+3936430074&4294967295,A=y+(_<<11&4294967295|_>>>21),_=I+(A^y^E)+S[3]+3572445317&4294967295,I=A+(_<<16&4294967295|_>>>16),_=E+(I^A^y)+S[6]+76029189&4294967295,E=I+(_<<23&4294967295|_>>>9),_=y+(E^I^A)+S[9]+3654602809&4294967295,y=E+(_<<4&4294967295|_>>>28),_=A+(y^E^I)+S[12]+3873151461&4294967295,A=y+(_<<11&4294967295|_>>>21),_=I+(A^y^E)+S[15]+530742520&4294967295,I=A+(_<<16&4294967295|_>>>16),_=E+(I^A^y)+S[2]+3299628645&4294967295,E=I+(_<<23&4294967295|_>>>9),_=y+(I^(E|~A))+S[0]+4096336452&4294967295,y=E+(_<<6&4294967295|_>>>26),_=A+(E^(y|~I))+S[7]+1126891415&4294967295,A=y+(_<<10&4294967295|_>>>22),_=I+(y^(A|~E))+S[14]+2878612391&4294967295,I=A+(_<<15&4294967295|_>>>17),_=E+(A^(I|~y))+S[5]+4237533241&4294967295,E=I+(_<<21&4294967295|_>>>11),_=y+(I^(E|~A))+S[12]+1700485571&4294967295,y=E+(_<<6&4294967295|_>>>26),_=A+(E^(y|~I))+S[3]+2399980690&4294967295,A=y+(_<<10&4294967295|_>>>22),_=I+(y^(A|~E))+S[10]+4293915773&4294967295,I=A+(_<<15&4294967295|_>>>17),_=E+(A^(I|~y))+S[1]+2240044497&4294967295,E=I+(_<<21&4294967295|_>>>11),_=y+(I^(E|~A))+S[8]+1873313359&4294967295,y=E+(_<<6&4294967295|_>>>26),_=A+(E^(y|~I))+S[15]+4264355552&4294967295,A=y+(_<<10&4294967295|_>>>22),_=I+(y^(A|~E))+S[6]+2734768916&4294967295,I=A+(_<<15&4294967295|_>>>17),_=E+(A^(I|~y))+S[13]+1309151649&4294967295,E=I+(_<<21&4294967295|_>>>11),_=y+(I^(E|~A))+S[4]+4149444226&4294967295,y=E+(_<<6&4294967295|_>>>26),_=A+(E^(y|~I))+S[11]+3174756917&4294967295,A=y+(_<<10&4294967295|_>>>22),_=I+(y^(A|~E))+S[2]+718787259&4294967295,I=A+(_<<15&4294967295|_>>>17),_=E+(A^(I|~y))+S[9]+3951481745&4294967295,x.g[0]=x.g[0]+y&4294967295,x.g[1]=x.g[1]+(I+(_<<21&4294967295|_>>>11))&4294967295,x.g[2]=x.g[2]+I&4294967295,x.g[3]=x.g[3]+A&4294967295}o.prototype.u=function(x,y){y===void 0&&(y=x.length);for(var E=y-this.blockSize,S=this.B,I=this.h,A=0;A<y;){if(I==0)for(;A<=E;)r(this,x,A),A+=this.blockSize;if(typeof x=="string"){for(;A<y;)if(S[I++]=x.charCodeAt(A++),I==this.blockSize){r(this,S),I=0;break}}else for(;A<y;)if(S[I++]=x[A++],I==this.blockSize){r(this,S),I=0;break}}this.h=I,this.o+=y},o.prototype.v=function(){var x=Array((56>this.h?this.blockSize:2*this.blockSize)-this.h);x[0]=128;for(var y=1;y<x.length-8;++y)x[y]=0;var E=8*this.o;for(y=x.length-8;y<x.length;++y)x[y]=E&255,E/=256;for(this.u(x),x=Array(16),y=E=0;4>y;++y)for(var S=0;32>S;S+=8)x[E++]=this.g[y]>>>S&255;return x};function a(x,y){var E=c;return Object.prototype.hasOwnProperty.call(E,x)?E[x]:E[x]=y(x)}function s(x,y){this.h=y;for(var E=[],S=!0,I=x.length-1;0<=I;I--){var A=x[I]|0;S&&A==y||(E[I]=A,S=!1)}this.g=E}var c={};function l(x){return-128<=x&&128>x?a(x,function(y){return new s([y|0],0>y?-1:0)}):new s([x|0],0>x?-1:0)}function d(x){if(isNaN(x)||!isFinite(x))return g;if(0>x)return T(d(-x));for(var y=[],E=1,S=0;x>=E;S++)y[S]=x/E|0,E*=4294967296;return new s(y,0)}function h(x,y){if(x.length==0)throw Error("number format error: empty string");if(y=y||10,2>y||36<y)throw Error("radix out of range: "+y);if(x.charAt(0)=="-")return T(h(x.substring(1),y));if(0<=x.indexOf("-"))throw Error('number format error: interior "-" character');for(var E=d(Math.pow(y,8)),S=g,I=0;I<x.length;I+=8){var A=Math.min(8,x.length-I),_=parseInt(x.substring(I,I+A),y);8>A?(A=d(Math.pow(y,A)),S=S.j(A).add(d(_))):(S=S.j(E),S=S.add(d(_)))}return S}var g=l(0),m=l(1),f=l(16777216);n=s.prototype,n.m=function(){if(b(this))return-T(this).m();for(var x=0,y=1,E=0;E<this.g.length;E++){var S=this.i(E);x+=(0<=S?S:4294967296+S)*y,y*=4294967296}return x},n.toString=function(x){if(x=x||10,2>x||36<x)throw Error("radix out of range: "+x);if(v(this))return"0";if(b(this))return"-"+T(this).toString(x);for(var y=d(Math.pow(x,6)),E=this,S="";;){var I=Q(E,y).g;E=D(E,I.j(y));var A=((0<E.g.length?E.g[0]:E.h)>>>0).toString(x);if(E=I,v(E))return A+S;for(;6>A.length;)A="0"+A;S=A+S}},n.i=function(x){return 0>x?0:x<this.g.length?this.g[x]:this.h};function v(x){if(x.h!=0)return!1;for(var y=0;y<x.g.length;y++)if(x.g[y]!=0)return!1;return!0}function b(x){return x.h==-1}n.l=function(x){return x=D(this,x),b(x)?-1:v(x)?0:1};function T(x){for(var y=x.g.length,E=[],S=0;S<y;S++)E[S]=~x.g[S];return new s(E,~x.h).add(m)}n.abs=function(){return b(this)?T(this):this},n.add=function(x){for(var y=Math.max(this.g.length,x.g.length),E=[],S=0,I=0;I<=y;I++){var A=S+(this.i(I)&65535)+(x.i(I)&65535),_=(A>>>16)+(this.i(I)>>>16)+(x.i(I)>>>16);S=_>>>16,A&=65535,_&=65535,E[I]=_<<16|A}return new s(E,E[E.length-1]&-2147483648?-1:0)};function D(x,y){return x.add(T(y))}n.j=function(x){if(v(this)||v(x))return g;if(b(this))return b(x)?T(this).j(T(x)):T(T(this).j(x));if(b(x))return T(this.j(T(x)));if(0>this.l(f)&&0>x.l(f))return d(this.m()*x.m());for(var y=this.g.length+x.g.length,E=[],S=0;S<2*y;S++)E[S]=0;for(S=0;S<this.g.length;S++)for(var I=0;I<x.g.length;I++){var A=this.i(S)>>>16,_=this.i(S)&65535,Pe=x.i(I)>>>16,P=x.i(I)&65535;E[2*S+2*I]+=_*P,L(E,2*S+2*I),E[2*S+2*I+1]+=A*P,L(E,2*S+2*I+1),E[2*S+2*I+1]+=_*Pe,L(E,2*S+2*I+1),E[2*S+2*I+2]+=A*Pe,L(E,2*S+2*I+2)}for(S=0;S<y;S++)E[S]=E[2*S+1]<<16|E[2*S];for(S=y;S<2*y;S++)E[S]=0;return new s(E,0)};function L(x,y){for(;(x[y]&65535)!=x[y];)x[y+1]+=x[y]>>>16,x[y]&=65535,y++}function O(x,y){this.g=x,this.h=y}function Q(x,y){if(v(y))throw Error("division by zero");if(v(x))return new O(g,g);if(b(x))return y=Q(T(x),y),new O(T(y.g),T(y.h));if(b(y))return y=Q(x,T(y)),new O(T(y.g),y.h);if(30<x.g.length){if(b(x)||b(y))throw Error("slowDivide_ only works with positive integers.");for(var E=m,S=y;0>=S.l(x);)E=J(E),S=J(S);var I=ie(E,1),A=ie(S,1);for(S=ie(S,2),E=ie(E,2);!v(S);){var _=A.add(S);0>=_.l(x)&&(I=I.add(E),A=_),S=ie(S,1),E=ie(E,1)}return y=D(x,I.j(y)),new O(I,y)}for(I=g;0<=x.l(y);){for(E=Math.max(1,Math.floor(x.m()/y.m())),S=Math.ceil(Math.log(E)/Math.LN2),S=48>=S?1:Math.pow(2,S-48),A=d(E),_=A.j(y);b(_)||0<_.l(x);)E-=S,A=d(E),_=A.j(y);v(A)&&(A=m),I=I.add(A),x=D(x,_)}return new O(I,x)}n.A=function(x){return Q(this,x).h},n.and=function(x){for(var y=Math.max(this.g.length,x.g.length),E=[],S=0;S<y;S++)E[S]=this.i(S)&x.i(S);return new s(E,this.h&x.h)},n.or=function(x){for(var y=Math.max(this.g.length,x.g.length),E=[],S=0;S<y;S++)E[S]=this.i(S)|x.i(S);return new s(E,this.h|x.h)},n.xor=function(x){for(var y=Math.max(this.g.length,x.g.length),E=[],S=0;S<y;S++)E[S]=this.i(S)^x.i(S);return new s(E,this.h^x.h)};function J(x){for(var y=x.g.length+1,E=[],S=0;S<y;S++)E[S]=x.i(S)<<1|x.i(S-1)>>>31;return new s(E,x.h)}function ie(x,y){var E=y>>5;y%=32;for(var S=x.g.length-E,I=[],A=0;A<S;A++)I[A]=0<y?x.i(A+E)>>>y|x.i(A+E+1)<<32-y:x.i(A+E);return new s(I,x.h)}o.prototype.digest=o.prototype.v,o.prototype.reset=o.prototype.s,o.prototype.update=o.prototype.u,lu=o,s.prototype.add=s.prototype.add,s.prototype.multiply=s.prototype.j,s.prototype.modulo=s.prototype.A,s.prototype.compare=s.prototype.l,s.prototype.toNumber=s.prototype.m,s.prototype.toString=s.prototype.toString,s.prototype.getBits=s.prototype.i,s.fromNumber=d,s.fromString=h,Bt=s}).apply(typeof Il<"u"?Il:typeof self<"u"?self:typeof window<"u"?window:{});var Pr=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var du,To,uu,Fr,Bs,hu,pu,gu;(function(){var n,e=typeof Object.defineProperties=="function"?Object.defineProperty:function(i,u,p){return i==Array.prototype||i==Object.prototype||(i[u]=p.value),i};function t(i){i=[typeof globalThis=="object"&&globalThis,i,typeof window=="object"&&window,typeof self=="object"&&self,typeof Pr=="object"&&Pr];for(var u=0;u<i.length;++u){var p=i[u];if(p&&p.Math==Math)return p}throw Error("Cannot find global object")}var o=t(this);function r(i,u){if(u)e:{var p=o;i=i.split(".");for(var w=0;w<i.length-1;w++){var C=i[w];if(!(C in p))break e;p=p[C]}i=i[i.length-1],w=p[i],u=u(w),u!=w&&u!=null&&e(p,i,{configurable:!0,writable:!0,value:u})}}function a(i,u){i instanceof String&&(i+="");var p=0,w=!1,C={next:function(){if(!w&&p<i.length){var R=p++;return{value:u(R,i[R]),done:!1}}return w=!0,{done:!0,value:void 0}}};return C[Symbol.iterator]=function(){return C},C}r("Array.prototype.values",function(i){return i||function(){return a(this,function(u,p){return p})}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var s=s||{},c=this||self;function l(i){var u=typeof i;return u=u!="object"?u:i?Array.isArray(i)?"array":u:"null",u=="array"||u=="object"&&typeof i.length=="number"}function d(i){var u=typeof i;return u=="object"&&i!=null||u=="function"}function h(i,u,p){return i.call.apply(i.bind,arguments)}function g(i,u,p){if(!i)throw Error();if(2<arguments.length){var w=Array.prototype.slice.call(arguments,2);return function(){var C=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(C,w),i.apply(u,C)}}return function(){return i.apply(u,arguments)}}function m(i,u,p){return m=Function.prototype.bind&&Function.prototype.bind.toString().indexOf("native code")!=-1?h:g,m.apply(null,arguments)}function f(i,u){var p=Array.prototype.slice.call(arguments,1);return function(){var w=p.slice();return w.push.apply(w,arguments),i.apply(this,w)}}function v(i,u){function p(){}p.prototype=u.prototype,i.aa=u.prototype,i.prototype=new p,i.prototype.constructor=i,i.Qb=function(w,C,R){for(var F=Array(arguments.length-2),le=2;le<arguments.length;le++)F[le-2]=arguments[le];return u.prototype[C].apply(w,F)}}function b(i){const u=i.length;if(0<u){const p=Array(u);for(let w=0;w<u;w++)p[w]=i[w];return p}return[]}function T(i,u){for(let p=1;p<arguments.length;p++){const w=arguments[p];if(l(w)){const C=i.length||0,R=w.length||0;i.length=C+R;for(let F=0;F<R;F++)i[C+F]=w[F]}else i.push(w)}}class D{constructor(u,p){this.i=u,this.j=p,this.h=0,this.g=null}get(){let u;return 0<this.h?(this.h--,u=this.g,this.g=u.next,u.next=null):u=this.i(),u}}function L(i){return/^[\s\xa0]*$/.test(i)}function O(){var i=c.navigator;return i&&(i=i.userAgent)?i:""}function Q(i){return Q[" "](i),i}Q[" "]=function(){};var J=O().indexOf("Gecko")!=-1&&!(O().toLowerCase().indexOf("webkit")!=-1&&O().indexOf("Edge")==-1)&&!(O().indexOf("Trident")!=-1||O().indexOf("MSIE")!=-1)&&O().indexOf("Edge")==-1;function ie(i,u,p){for(const w in i)u.call(p,i[w],w,i)}function x(i,u){for(const p in i)u.call(void 0,i[p],p,i)}function y(i){const u={};for(const p in i)u[p]=i[p];return u}const E="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function S(i,u){let p,w;for(let C=1;C<arguments.length;C++){w=arguments[C];for(p in w)i[p]=w[p];for(let R=0;R<E.length;R++)p=E[R],Object.prototype.hasOwnProperty.call(w,p)&&(i[p]=w[p])}}function I(i){var u=1;i=i.split(":");const p=[];for(;0<u&&i.length;)p.push(i.shift()),u--;return i.length&&p.push(i.join(":")),p}function A(i){c.setTimeout(()=>{throw i},0)}function _(){var i=z;let u=null;return i.g&&(u=i.g,i.g=i.g.next,i.g||(i.h=null),u.next=null),u}class Pe{constructor(){this.h=this.g=null}add(u,p){const w=P.get();w.set(u,p),this.h?this.h.next=w:this.g=w,this.h=w}}var P=new D(()=>new X,i=>i.reset());class X{constructor(){this.next=this.g=this.h=null}set(u,p){this.h=u,this.g=p,this.next=null}reset(){this.next=this.g=this.h=null}}let k,N=!1,z=new Pe,H=()=>{const i=c.Promise.resolve(void 0);k=()=>{i.then(ce)}};var ce=()=>{for(var i;i=_();){try{i.h.call(i.g)}catch(p){A(p)}var u=P;u.j(i),100>u.h&&(u.h++,i.next=u.g,u.g=i)}N=!1};function Te(){this.s=this.s,this.C=this.C}Te.prototype.s=!1,Te.prototype.ma=function(){this.s||(this.s=!0,this.N())},Te.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function ge(i,u){this.type=i,this.g=this.target=u,this.defaultPrevented=!1}ge.prototype.h=function(){this.defaultPrevented=!0};var Sn=function(){if(!c.addEventListener||!Object.defineProperty)return!1;var i=!1,u=Object.defineProperty({},"passive",{get:function(){i=!0}});try{const p=()=>{};c.addEventListener("test",p,u),c.removeEventListener("test",p,u)}catch{}return i}();function tn(i,u){if(ge.call(this,i?i.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,i){var p=this.type=i.type,w=i.changedTouches&&i.changedTouches.length?i.changedTouches[0]:null;if(this.target=i.target||i.srcElement,this.g=u,u=i.relatedTarget){if(J){e:{try{Q(u.nodeName);var C=!0;break e}catch{}C=!1}C||(u=null)}}else p=="mouseover"?u=i.fromElement:p=="mouseout"&&(u=i.toElement);this.relatedTarget=u,w?(this.clientX=w.clientX!==void 0?w.clientX:w.pageX,this.clientY=w.clientY!==void 0?w.clientY:w.pageY,this.screenX=w.screenX||0,this.screenY=w.screenY||0):(this.clientX=i.clientX!==void 0?i.clientX:i.pageX,this.clientY=i.clientY!==void 0?i.clientY:i.pageY,this.screenX=i.screenX||0,this.screenY=i.screenY||0),this.button=i.button,this.key=i.key||"",this.ctrlKey=i.ctrlKey,this.altKey=i.altKey,this.shiftKey=i.shiftKey,this.metaKey=i.metaKey,this.pointerId=i.pointerId||0,this.pointerType=typeof i.pointerType=="string"?i.pointerType:gc[i.pointerType]||"",this.state=i.state,this.i=i,i.defaultPrevented&&tn.aa.h.call(this)}}v(tn,ge);var gc={2:"touch",3:"pen",4:"mouse"};tn.prototype.h=function(){tn.aa.h.call(this);var i=this.i;i.preventDefault?i.preventDefault():i.returnValue=!1};var hr="closure_listenable_"+(1e6*Math.random()|0),jp=0;function Hp(i,u,p,w,C){this.listener=i,this.proxy=null,this.src=u,this.type=p,this.capture=!!w,this.ha=C,this.key=++jp,this.da=this.fa=!1}function pr(i){i.da=!0,i.listener=null,i.proxy=null,i.src=null,i.ha=null}function gr(i){this.src=i,this.g={},this.h=0}gr.prototype.add=function(i,u,p,w,C){var R=i.toString();i=this.g[R],i||(i=this.g[R]=[],this.h++);var F=Ja(i,u,w,C);return-1<F?(u=i[F],p||(u.fa=!1)):(u=new Hp(u,this.src,R,!!w,C),u.fa=p,i.push(u)),u};function Qa(i,u){var p=u.type;if(p in i.g){var w=i.g[p],C=Array.prototype.indexOf.call(w,u,void 0),R;(R=0<=C)&&Array.prototype.splice.call(w,C,1),R&&(pr(u),i.g[p].length==0&&(delete i.g[p],i.h--))}}function Ja(i,u,p,w){for(var C=0;C<i.length;++C){var R=i[C];if(!R.da&&R.listener==u&&R.capture==!!p&&R.ha==w)return C}return-1}var Za="closure_lm_"+(1e6*Math.random()|0),es={};function mc(i,u,p,w,C){if(Array.isArray(u)){for(var R=0;R<u.length;R++)mc(i,u[R],p,w,C);return null}return p=vc(p),i&&i[hr]?i.K(u,p,d(w)?!!w.capture:!1,C):Gp(i,u,p,!1,w,C)}function Gp(i,u,p,w,C,R){if(!u)throw Error("Invalid event type");var F=d(C)?!!C.capture:!!C,le=ns(i);if(le||(i[Za]=le=new gr(i)),p=le.add(u,p,w,F,R),p.proxy)return p;if(w=Wp(),p.proxy=w,w.src=i,w.listener=p,i.addEventListener)Sn||(C=F),C===void 0&&(C=!1),i.addEventListener(u.toString(),w,C);else if(i.attachEvent)i.attachEvent(wc(u.toString()),w);else if(i.addListener&&i.removeListener)i.addListener(w);else throw Error("addEventListener and attachEvent are unavailable.");return p}function Wp(){function i(p){return u.call(i.src,i.listener,p)}const u=Kp;return i}function fc(i,u,p,w,C){if(Array.isArray(u))for(var R=0;R<u.length;R++)fc(i,u[R],p,w,C);else w=d(w)?!!w.capture:!!w,p=vc(p),i&&i[hr]?(i=i.i,u=String(u).toString(),u in i.g&&(R=i.g[u],p=Ja(R,p,w,C),-1<p&&(pr(R[p]),Array.prototype.splice.call(R,p,1),R.length==0&&(delete i.g[u],i.h--)))):i&&(i=ns(i))&&(u=i.g[u.toString()],i=-1,u&&(i=Ja(u,p,w,C)),(p=-1<i?u[i]:null)&&ts(p))}function ts(i){if(typeof i!="number"&&i&&!i.da){var u=i.src;if(u&&u[hr])Qa(u.i,i);else{var p=i.type,w=i.proxy;u.removeEventListener?u.removeEventListener(p,w,i.capture):u.detachEvent?u.detachEvent(wc(p),w):u.addListener&&u.removeListener&&u.removeListener(w),(p=ns(u))?(Qa(p,i),p.h==0&&(p.src=null,u[Za]=null)):pr(i)}}}function wc(i){return i in es?es[i]:es[i]="on"+i}function Kp(i,u){if(i.da)i=!0;else{u=new tn(u,this);var p=i.listener,w=i.ha||i.src;i.fa&&ts(i),i=p.call(w,u)}return i}function ns(i){return i=i[Za],i instanceof gr?i:null}var os="__closure_events_fn_"+(1e9*Math.random()>>>0);function vc(i){return typeof i=="function"?i:(i[os]||(i[os]=function(u){return i.handleEvent(u)}),i[os])}function $e(){Te.call(this),this.i=new gr(this),this.M=this,this.F=null}v($e,Te),$e.prototype[hr]=!0,$e.prototype.removeEventListener=function(i,u,p,w){fc(this,i,u,p,w)};function je(i,u){var p,w=i.F;if(w)for(p=[];w;w=w.F)p.push(w);if(i=i.M,w=u.type||u,typeof u=="string")u=new ge(u,i);else if(u instanceof ge)u.target=u.target||i;else{var C=u;u=new ge(w,i),S(u,C)}if(C=!0,p)for(var R=p.length-1;0<=R;R--){var F=u.g=p[R];C=mr(F,w,!0,u)&&C}if(F=u.g=i,C=mr(F,w,!0,u)&&C,C=mr(F,w,!1,u)&&C,p)for(R=0;R<p.length;R++)F=u.g=p[R],C=mr(F,w,!1,u)&&C}$e.prototype.N=function(){if($e.aa.N.call(this),this.i){var i=this.i,u;for(u in i.g){for(var p=i.g[u],w=0;w<p.length;w++)pr(p[w]);delete i.g[u],i.h--}}this.F=null},$e.prototype.K=function(i,u,p,w){return this.i.add(String(i),u,!1,p,w)},$e.prototype.L=function(i,u,p,w){return this.i.add(String(i),u,!0,p,w)};function mr(i,u,p,w){if(u=i.i.g[String(u)],!u)return!0;u=u.concat();for(var C=!0,R=0;R<u.length;++R){var F=u[R];if(F&&!F.da&&F.capture==p){var le=F.listener,De=F.ha||F.src;F.fa&&Qa(i.i,F),C=le.call(De,w)!==!1&&C}}return C&&!w.defaultPrevented}function yc(i,u,p){if(typeof i=="function")p&&(i=m(i,p));else if(i&&typeof i.handleEvent=="function")i=m(i.handleEvent,i);else throw Error("Invalid listener argument");return 2147483647<Number(u)?-1:c.setTimeout(i,u||0)}function bc(i){i.g=yc(()=>{i.g=null,i.i&&(i.i=!1,bc(i))},i.l);const u=i.h;i.h=null,i.m.apply(null,u)}class Yp extends Te{constructor(u,p){super(),this.m=u,this.l=p,this.h=null,this.i=!1,this.g=null}j(u){this.h=arguments,this.g?this.i=!0:bc(this)}N(){super.N(),this.g&&(c.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function lo(i){Te.call(this),this.h=i,this.g={}}v(lo,Te);var Ec=[];function _c(i){ie(i.g,function(u,p){this.g.hasOwnProperty(p)&&ts(u)},i),i.g={}}lo.prototype.N=function(){lo.aa.N.call(this),_c(this)},lo.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var rs=c.JSON.stringify,Xp=c.JSON.parse,Qp=class{stringify(i){return c.JSON.stringify(i,void 0)}parse(i){return c.JSON.parse(i,void 0)}};function as(){}as.prototype.h=null;function xc(i){return i.h||(i.h=i.i())}function Tc(){}var uo={OPEN:"a",kb:"b",Ja:"c",wb:"d"};function ss(){ge.call(this,"d")}v(ss,ge);function is(){ge.call(this,"c")}v(is,ge);var nn={},Sc=null;function fr(){return Sc=Sc||new $e}nn.La="serverreachability";function Ic(i){ge.call(this,nn.La,i)}v(Ic,ge);function ho(i){const u=fr();je(u,new Ic(u))}nn.STAT_EVENT="statevent";function Ac(i,u){ge.call(this,nn.STAT_EVENT,i),this.stat=u}v(Ac,ge);function He(i){const u=fr();je(u,new Ac(u,i))}nn.Ma="timingevent";function kc(i,u){ge.call(this,nn.Ma,i),this.size=u}v(kc,ge);function po(i,u){if(typeof i!="function")throw Error("Fn must not be null and must be a function");return c.setTimeout(function(){i()},u)}function go(){this.g=!0}go.prototype.xa=function(){this.g=!1};function Jp(i,u,p,w,C,R){i.info(function(){if(i.g)if(R)for(var F="",le=R.split("&"),De=0;De<le.length;De++){var ae=le[De].split("=");if(1<ae.length){var Le=ae[0];ae=ae[1];var Fe=Le.split("_");F=2<=Fe.length&&Fe[1]=="type"?F+(Le+"="+ae+"&"):F+(Le+"=redacted&")}}else F=null;else F=R;return"XMLHTTP REQ ("+w+") [attempt "+C+"]: "+u+`
`+p+`
`+F})}function Zp(i,u,p,w,C,R,F){i.info(function(){return"XMLHTTP RESP ("+w+") [ attempt "+C+"]: "+u+`
`+p+`
`+R+" "+F})}function In(i,u,p,w){i.info(function(){return"XMLHTTP TEXT ("+u+"): "+tg(i,p)+(w?" "+w:"")})}function eg(i,u){i.info(function(){return"TIMEOUT: "+u})}go.prototype.info=function(){};function tg(i,u){if(!i.g)return u;if(!u)return null;try{var p=JSON.parse(u);if(p){for(i=0;i<p.length;i++)if(Array.isArray(p[i])){var w=p[i];if(!(2>w.length)){var C=w[1];if(Array.isArray(C)&&!(1>C.length)){var R=C[0];if(R!="noop"&&R!="stop"&&R!="close")for(var F=1;F<C.length;F++)C[F]=""}}}}return rs(p)}catch{return u}}var wr={NO_ERROR:0,gb:1,tb:2,sb:3,nb:4,rb:5,ub:6,Ia:7,TIMEOUT:8,xb:9},Cc={lb:"complete",Hb:"success",Ja:"error",Ia:"abort",zb:"ready",Ab:"readystatechange",TIMEOUT:"timeout",vb:"incrementaldata",yb:"progress",ob:"downloadprogress",Pb:"uploadprogress"},cs;function vr(){}v(vr,as),vr.prototype.g=function(){return new XMLHttpRequest},vr.prototype.i=function(){return{}},cs=new vr;function Ct(i,u,p,w){this.j=i,this.i=u,this.l=p,this.R=w||1,this.U=new lo(this),this.I=45e3,this.H=null,this.o=!1,this.m=this.A=this.v=this.L=this.F=this.S=this.B=null,this.D=[],this.g=null,this.C=0,this.s=this.u=null,this.X=-1,this.J=!1,this.O=0,this.M=null,this.W=this.K=this.T=this.P=!1,this.h=new Rc}function Rc(){this.i=null,this.g="",this.h=!1}var Pc={},ls={};function ds(i,u,p){i.L=1,i.v=_r(mt(u)),i.m=p,i.P=!0,Dc(i,null)}function Dc(i,u){i.F=Date.now(),yr(i),i.A=mt(i.v);var p=i.A,w=i.R;Array.isArray(w)||(w=[String(w)]),Gc(p.i,"t",w),i.C=0,p=i.j.J,i.h=new Rc,i.g=dl(i.j,p?u:null,!i.m),0<i.O&&(i.M=new Yp(m(i.Y,i,i.g),i.O)),u=i.U,p=i.g,w=i.ca;var C="readystatechange";Array.isArray(C)||(C&&(Ec[0]=C.toString()),C=Ec);for(var R=0;R<C.length;R++){var F=mc(p,C[R],w||u.handleEvent,!1,u.h||u);if(!F)break;u.g[F.key]=F}u=i.H?y(i.H):{},i.m?(i.u||(i.u="POST"),u["Content-Type"]="application/x-www-form-urlencoded",i.g.ea(i.A,i.u,i.m,u)):(i.u="GET",i.g.ea(i.A,i.u,null,u)),ho(),Jp(i.i,i.u,i.A,i.l,i.R,i.m)}Ct.prototype.ca=function(i){i=i.target;const u=this.M;u&&ft(i)==3?u.j():this.Y(i)},Ct.prototype.Y=function(i){try{if(i==this.g)e:{const Fe=ft(this.g);var u=this.g.Ba();const Cn=this.g.Z();if(!(3>Fe)&&(Fe!=3||this.g&&(this.h.h||this.g.oa()||Zc(this.g)))){this.J||Fe!=4||u==7||(u==8||0>=Cn?ho(3):ho(2)),us(this);var p=this.g.Z();this.X=p;t:if(Mc(this)){var w=Zc(this.g);i="";var C=w.length,R=ft(this.g)==4;if(!this.h.i){if(typeof TextDecoder>"u"){on(this),mo(this);var F="";break t}this.h.i=new c.TextDecoder}for(u=0;u<C;u++)this.h.h=!0,i+=this.h.i.decode(w[u],{stream:!(R&&u==C-1)});w.length=0,this.h.g+=i,this.C=0,F=this.h.g}else F=this.g.oa();if(this.o=p==200,Zp(this.i,this.u,this.A,this.l,this.R,Fe,p),this.o){if(this.T&&!this.K){t:{if(this.g){var le,De=this.g;if((le=De.g?De.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!L(le)){var ae=le;break t}}ae=null}if(p=ae)In(this.i,this.l,p,"Initial handshake response via X-HTTP-Initial-Response"),this.K=!0,hs(this,p);else{this.o=!1,this.s=3,He(12),on(this),mo(this);break e}}if(this.P){p=!0;let Ze;for(;!this.J&&this.C<F.length;)if(Ze=ng(this,F),Ze==ls){Fe==4&&(this.s=4,He(14),p=!1),In(this.i,this.l,null,"[Incomplete Response]");break}else if(Ze==Pc){this.s=4,He(15),In(this.i,this.l,F,"[Invalid Chunk]"),p=!1;break}else In(this.i,this.l,Ze,null),hs(this,Ze);if(Mc(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),Fe!=4||F.length!=0||this.h.h||(this.s=1,He(16),p=!1),this.o=this.o&&p,!p)In(this.i,this.l,F,"[Invalid Chunked Response]"),on(this),mo(this);else if(0<F.length&&!this.W){this.W=!0;var Le=this.j;Le.g==this&&Le.ba&&!Le.M&&(Le.j.info("Great, no buffering proxy detected. Bytes received: "+F.length),vs(Le),Le.M=!0,He(11))}}else In(this.i,this.l,F,null),hs(this,F);Fe==4&&on(this),this.o&&!this.J&&(Fe==4?sl(this.j,this):(this.o=!1,yr(this)))}else yg(this.g),p==400&&0<F.indexOf("Unknown SID")?(this.s=3,He(12)):(this.s=0,He(13)),on(this),mo(this)}}}catch{}finally{}};function Mc(i){return i.g?i.u=="GET"&&i.L!=2&&i.j.Ca:!1}function ng(i,u){var p=i.C,w=u.indexOf(`
`,p);return w==-1?ls:(p=Number(u.substring(p,w)),isNaN(p)?Pc:(w+=1,w+p>u.length?ls:(u=u.slice(w,w+p),i.C=w+p,u)))}Ct.prototype.cancel=function(){this.J=!0,on(this)};function yr(i){i.S=Date.now()+i.I,Nc(i,i.I)}function Nc(i,u){if(i.B!=null)throw Error("WatchDog timer not null");i.B=po(m(i.ba,i),u)}function us(i){i.B&&(c.clearTimeout(i.B),i.B=null)}Ct.prototype.ba=function(){this.B=null;const i=Date.now();0<=i-this.S?(eg(this.i,this.A),this.L!=2&&(ho(),He(17)),on(this),this.s=2,mo(this)):Nc(this,this.S-i)};function mo(i){i.j.G==0||i.J||sl(i.j,i)}function on(i){us(i);var u=i.M;u&&typeof u.ma=="function"&&u.ma(),i.M=null,_c(i.U),i.g&&(u=i.g,i.g=null,u.abort(),u.ma())}function hs(i,u){try{var p=i.j;if(p.G!=0&&(p.g==i||ps(p.h,i))){if(!i.K&&ps(p.h,i)&&p.G==3){try{var w=p.Da.g.parse(u)}catch{w=null}if(Array.isArray(w)&&w.length==3){var C=w;if(C[0]==0){e:if(!p.u){if(p.g)if(p.g.F+3e3<i.F)kr(p),Ir(p);else break e;ws(p),He(18)}}else p.za=C[1],0<p.za-p.T&&37500>C[2]&&p.F&&p.v==0&&!p.C&&(p.C=po(m(p.Za,p),6e3));if(1>=Fc(p.h)&&p.ca){try{p.ca()}catch{}p.ca=void 0}}else an(p,11)}else if((i.K||p.g==i)&&kr(p),!L(u))for(C=p.Da.g.parse(u),u=0;u<C.length;u++){let ae=C[u];if(p.T=ae[0],ae=ae[1],p.G==2)if(ae[0]=="c"){p.K=ae[1],p.ia=ae[2];const Le=ae[3];Le!=null&&(p.la=Le,p.j.info("VER="+p.la));const Fe=ae[4];Fe!=null&&(p.Aa=Fe,p.j.info("SVER="+p.Aa));const Cn=ae[5];Cn!=null&&typeof Cn=="number"&&0<Cn&&(w=1.5*Cn,p.L=w,p.j.info("backChannelRequestTimeoutMs_="+w)),w=p;const Ze=i.g;if(Ze){const Rr=Ze.g?Ze.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(Rr){var R=w.h;R.g||Rr.indexOf("spdy")==-1&&Rr.indexOf("quic")==-1&&Rr.indexOf("h2")==-1||(R.j=R.l,R.g=new Set,R.h&&(gs(R,R.h),R.h=null))}if(w.D){const ys=Ze.g?Ze.g.getResponseHeader("X-HTTP-Session-Id"):null;ys&&(w.ya=ys,me(w.I,w.D,ys))}}p.G=3,p.l&&p.l.ua(),p.ba&&(p.R=Date.now()-i.F,p.j.info("Handshake RTT: "+p.R+"ms")),w=p;var F=i;if(w.qa=ll(w,w.J?w.ia:null,w.W),F.K){Vc(w.h,F);var le=F,De=w.L;De&&(le.I=De),le.B&&(us(le),yr(le)),w.g=F}else rl(w);0<p.i.length&&Ar(p)}else ae[0]!="stop"&&ae[0]!="close"||an(p,7);else p.G==3&&(ae[0]=="stop"||ae[0]=="close"?ae[0]=="stop"?an(p,7):fs(p):ae[0]!="noop"&&p.l&&p.l.ta(ae),p.v=0)}}ho(4)}catch{}}var og=class{constructor(i,u){this.g=i,this.map=u}};function $c(i){this.l=i||10,c.PerformanceNavigationTiming?(i=c.performance.getEntriesByType("navigation"),i=0<i.length&&(i[0].nextHopProtocol=="hq"||i[0].nextHopProtocol=="h2")):i=!!(c.chrome&&c.chrome.loadTimes&&c.chrome.loadTimes()&&c.chrome.loadTimes().wasFetchedViaSpdy),this.j=i?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}function Lc(i){return i.h?!0:i.g?i.g.size>=i.j:!1}function Fc(i){return i.h?1:i.g?i.g.size:0}function ps(i,u){return i.h?i.h==u:i.g?i.g.has(u):!1}function gs(i,u){i.g?i.g.add(u):i.h=u}function Vc(i,u){i.h&&i.h==u?i.h=null:i.g&&i.g.has(u)&&i.g.delete(u)}$c.prototype.cancel=function(){if(this.i=Oc(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const i of this.g.values())i.cancel();this.g.clear()}};function Oc(i){if(i.h!=null)return i.i.concat(i.h.D);if(i.g!=null&&i.g.size!==0){let u=i.i;for(const p of i.g.values())u=u.concat(p.D);return u}return b(i.i)}function rg(i){if(i.V&&typeof i.V=="function")return i.V();if(typeof Map<"u"&&i instanceof Map||typeof Set<"u"&&i instanceof Set)return Array.from(i.values());if(typeof i=="string")return i.split("");if(l(i)){for(var u=[],p=i.length,w=0;w<p;w++)u.push(i[w]);return u}u=[],p=0;for(w in i)u[p++]=i[w];return u}function ag(i){if(i.na&&typeof i.na=="function")return i.na();if(!i.V||typeof i.V!="function"){if(typeof Map<"u"&&i instanceof Map)return Array.from(i.keys());if(!(typeof Set<"u"&&i instanceof Set)){if(l(i)||typeof i=="string"){var u=[];i=i.length;for(var p=0;p<i;p++)u.push(p);return u}u=[],p=0;for(const w in i)u[p++]=w;return u}}}function Bc(i,u){if(i.forEach&&typeof i.forEach=="function")i.forEach(u,void 0);else if(l(i)||typeof i=="string")Array.prototype.forEach.call(i,u,void 0);else for(var p=ag(i),w=rg(i),C=w.length,R=0;R<C;R++)u.call(void 0,w[R],p&&p[R],i)}var Uc=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function sg(i,u){if(i){i=i.split("&");for(var p=0;p<i.length;p++){var w=i[p].indexOf("="),C=null;if(0<=w){var R=i[p].substring(0,w);C=i[p].substring(w+1)}else R=i[p];u(R,C?decodeURIComponent(C.replace(/\+/g," ")):"")}}}function rn(i){if(this.g=this.o=this.j="",this.s=null,this.m=this.l="",this.h=!1,i instanceof rn){this.h=i.h,br(this,i.j),this.o=i.o,this.g=i.g,Er(this,i.s),this.l=i.l;var u=i.i,p=new vo;p.i=u.i,u.g&&(p.g=new Map(u.g),p.h=u.h),zc(this,p),this.m=i.m}else i&&(u=String(i).match(Uc))?(this.h=!1,br(this,u[1]||"",!0),this.o=fo(u[2]||""),this.g=fo(u[3]||"",!0),Er(this,u[4]),this.l=fo(u[5]||"",!0),zc(this,u[6]||"",!0),this.m=fo(u[7]||"")):(this.h=!1,this.i=new vo(null,this.h))}rn.prototype.toString=function(){var i=[],u=this.j;u&&i.push(wo(u,qc,!0),":");var p=this.g;return(p||u=="file")&&(i.push("//"),(u=this.o)&&i.push(wo(u,qc,!0),"@"),i.push(encodeURIComponent(String(p)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),p=this.s,p!=null&&i.push(":",String(p))),(p=this.l)&&(this.g&&p.charAt(0)!="/"&&i.push("/"),i.push(wo(p,p.charAt(0)=="/"?lg:cg,!0))),(p=this.i.toString())&&i.push("?",p),(p=this.m)&&i.push("#",wo(p,ug)),i.join("")};function mt(i){return new rn(i)}function br(i,u,p){i.j=p?fo(u,!0):u,i.j&&(i.j=i.j.replace(/:$/,""))}function Er(i,u){if(u){if(u=Number(u),isNaN(u)||0>u)throw Error("Bad port number "+u);i.s=u}else i.s=null}function zc(i,u,p){u instanceof vo?(i.i=u,hg(i.i,i.h)):(p||(u=wo(u,dg)),i.i=new vo(u,i.h))}function me(i,u,p){i.i.set(u,p)}function _r(i){return me(i,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),i}function fo(i,u){return i?u?decodeURI(i.replace(/%25/g,"%2525")):decodeURIComponent(i):""}function wo(i,u,p){return typeof i=="string"?(i=encodeURI(i).replace(u,ig),p&&(i=i.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),i):null}function ig(i){return i=i.charCodeAt(0),"%"+(i>>4&15).toString(16)+(i&15).toString(16)}var qc=/[#\/\?@]/g,cg=/[#\?:]/g,lg=/[#\?]/g,dg=/[#\?@]/g,ug=/#/g;function vo(i,u){this.h=this.g=null,this.i=i||null,this.j=!!u}function Rt(i){i.g||(i.g=new Map,i.h=0,i.i&&sg(i.i,function(u,p){i.add(decodeURIComponent(u.replace(/\+/g," ")),p)}))}n=vo.prototype,n.add=function(i,u){Rt(this),this.i=null,i=An(this,i);var p=this.g.get(i);return p||this.g.set(i,p=[]),p.push(u),this.h+=1,this};function jc(i,u){Rt(i),u=An(i,u),i.g.has(u)&&(i.i=null,i.h-=i.g.get(u).length,i.g.delete(u))}function Hc(i,u){return Rt(i),u=An(i,u),i.g.has(u)}n.forEach=function(i,u){Rt(this),this.g.forEach(function(p,w){p.forEach(function(C){i.call(u,C,w,this)},this)},this)},n.na=function(){Rt(this);const i=Array.from(this.g.values()),u=Array.from(this.g.keys()),p=[];for(let w=0;w<u.length;w++){const C=i[w];for(let R=0;R<C.length;R++)p.push(u[w])}return p},n.V=function(i){Rt(this);let u=[];if(typeof i=="string")Hc(this,i)&&(u=u.concat(this.g.get(An(this,i))));else{i=Array.from(this.g.values());for(let p=0;p<i.length;p++)u=u.concat(i[p])}return u},n.set=function(i,u){return Rt(this),this.i=null,i=An(this,i),Hc(this,i)&&(this.h-=this.g.get(i).length),this.g.set(i,[u]),this.h+=1,this},n.get=function(i,u){return i?(i=this.V(i),0<i.length?String(i[0]):u):u};function Gc(i,u,p){jc(i,u),0<p.length&&(i.i=null,i.g.set(An(i,u),b(p)),i.h+=p.length)}n.toString=function(){if(this.i)return this.i;if(!this.g)return"";const i=[],u=Array.from(this.g.keys());for(var p=0;p<u.length;p++){var w=u[p];const R=encodeURIComponent(String(w)),F=this.V(w);for(w=0;w<F.length;w++){var C=R;F[w]!==""&&(C+="="+encodeURIComponent(String(F[w]))),i.push(C)}}return this.i=i.join("&")};function An(i,u){return u=String(u),i.j&&(u=u.toLowerCase()),u}function hg(i,u){u&&!i.j&&(Rt(i),i.i=null,i.g.forEach(function(p,w){var C=w.toLowerCase();w!=C&&(jc(this,w),Gc(this,C,p))},i)),i.j=u}function pg(i,u){const p=new go;if(c.Image){const w=new Image;w.onload=f(Pt,p,"TestLoadImage: loaded",!0,u,w),w.onerror=f(Pt,p,"TestLoadImage: error",!1,u,w),w.onabort=f(Pt,p,"TestLoadImage: abort",!1,u,w),w.ontimeout=f(Pt,p,"TestLoadImage: timeout",!1,u,w),c.setTimeout(function(){w.ontimeout&&w.ontimeout()},1e4),w.src=i}else u(!1)}function gg(i,u){const p=new go,w=new AbortController,C=setTimeout(()=>{w.abort(),Pt(p,"TestPingServer: timeout",!1,u)},1e4);fetch(i,{signal:w.signal}).then(R=>{clearTimeout(C),R.ok?Pt(p,"TestPingServer: ok",!0,u):Pt(p,"TestPingServer: server error",!1,u)}).catch(()=>{clearTimeout(C),Pt(p,"TestPingServer: error",!1,u)})}function Pt(i,u,p,w,C){try{C&&(C.onload=null,C.onerror=null,C.onabort=null,C.ontimeout=null),w(p)}catch{}}function mg(){this.g=new Qp}function fg(i,u,p){const w=p||"";try{Bc(i,function(C,R){let F=C;d(C)&&(F=rs(C)),u.push(w+R+"="+encodeURIComponent(F))})}catch(C){throw u.push(w+"type="+encodeURIComponent("_badmap")),C}}function xr(i){this.l=i.Ub||null,this.j=i.eb||!1}v(xr,as),xr.prototype.g=function(){return new Tr(this.l,this.j)},xr.prototype.i=function(i){return function(){return i}}({});function Tr(i,u){$e.call(this),this.D=i,this.o=u,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.u=new Headers,this.h=null,this.B="GET",this.A="",this.g=!1,this.v=this.j=this.l=null}v(Tr,$e),n=Tr.prototype,n.open=function(i,u){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.B=i,this.A=u,this.readyState=1,bo(this)},n.send=function(i){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");this.g=!0;const u={headers:this.u,method:this.B,credentials:this.m,cache:void 0};i&&(u.body=i),(this.D||c).fetch(new Request(this.A,u)).then(this.Sa.bind(this),this.ga.bind(this))},n.abort=function(){this.response=this.responseText="",this.u=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),1<=this.readyState&&this.g&&this.readyState!=4&&(this.g=!1,yo(this)),this.readyState=0},n.Sa=function(i){if(this.g&&(this.l=i,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=i.headers,this.readyState=2,bo(this)),this.g&&(this.readyState=3,bo(this),this.g)))if(this.responseType==="arraybuffer")i.arrayBuffer().then(this.Qa.bind(this),this.ga.bind(this));else if(typeof c.ReadableStream<"u"&&"body"in i){if(this.j=i.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.v=new TextDecoder;Wc(this)}else i.text().then(this.Ra.bind(this),this.ga.bind(this))};function Wc(i){i.j.read().then(i.Pa.bind(i)).catch(i.ga.bind(i))}n.Pa=function(i){if(this.g){if(this.o&&i.value)this.response.push(i.value);else if(!this.o){var u=i.value?i.value:new Uint8Array(0);(u=this.v.decode(u,{stream:!i.done}))&&(this.response=this.responseText+=u)}i.done?yo(this):bo(this),this.readyState==3&&Wc(this)}},n.Ra=function(i){this.g&&(this.response=this.responseText=i,yo(this))},n.Qa=function(i){this.g&&(this.response=i,yo(this))},n.ga=function(){this.g&&yo(this)};function yo(i){i.readyState=4,i.l=null,i.j=null,i.v=null,bo(i)}n.setRequestHeader=function(i,u){this.u.append(i,u)},n.getResponseHeader=function(i){return this.h&&this.h.get(i.toLowerCase())||""},n.getAllResponseHeaders=function(){if(!this.h)return"";const i=[],u=this.h.entries();for(var p=u.next();!p.done;)p=p.value,i.push(p[0]+": "+p[1]),p=u.next();return i.join(`\r
`)};function bo(i){i.onreadystatechange&&i.onreadystatechange.call(i)}Object.defineProperty(Tr.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(i){this.m=i?"include":"same-origin"}});function Kc(i){let u="";return ie(i,function(p,w){u+=w,u+=":",u+=p,u+=`\r
`}),u}function ms(i,u,p){e:{for(w in p){var w=!1;break e}w=!0}w||(p=Kc(p),typeof i=="string"?p!=null&&encodeURIComponent(String(p)):me(i,u,p))}function ye(i){$e.call(this),this.headers=new Map,this.o=i||null,this.h=!1,this.v=this.g=null,this.D="",this.m=0,this.l="",this.j=this.B=this.u=this.A=!1,this.I=null,this.H="",this.J=!1}v(ye,$e);var wg=/^https?$/i,vg=["POST","PUT"];n=ye.prototype,n.Ha=function(i){this.J=i},n.ea=function(i,u,p,w){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+i);u=u?u.toUpperCase():"GET",this.D=i,this.l="",this.m=0,this.A=!1,this.h=!0,this.g=this.o?this.o.g():cs.g(),this.v=this.o?xc(this.o):xc(cs),this.g.onreadystatechange=m(this.Ea,this);try{this.B=!0,this.g.open(u,String(i),!0),this.B=!1}catch(R){Yc(this,R);return}if(i=p||"",p=new Map(this.headers),w)if(Object.getPrototypeOf(w)===Object.prototype)for(var C in w)p.set(C,w[C]);else if(typeof w.keys=="function"&&typeof w.get=="function")for(const R of w.keys())p.set(R,w.get(R));else throw Error("Unknown input type for opt_headers: "+String(w));w=Array.from(p.keys()).find(R=>R.toLowerCase()=="content-type"),C=c.FormData&&i instanceof c.FormData,!(0<=Array.prototype.indexOf.call(vg,u,void 0))||w||C||p.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[R,F]of p)this.g.setRequestHeader(R,F);this.H&&(this.g.responseType=this.H),"withCredentials"in this.g&&this.g.withCredentials!==this.J&&(this.g.withCredentials=this.J);try{Jc(this),this.u=!0,this.g.send(i),this.u=!1}catch(R){Yc(this,R)}};function Yc(i,u){i.h=!1,i.g&&(i.j=!0,i.g.abort(),i.j=!1),i.l=u,i.m=5,Xc(i),Sr(i)}function Xc(i){i.A||(i.A=!0,je(i,"complete"),je(i,"error"))}n.abort=function(i){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.m=i||7,je(this,"complete"),je(this,"abort"),Sr(this))},n.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),Sr(this,!0)),ye.aa.N.call(this)},n.Ea=function(){this.s||(this.B||this.u||this.j?Qc(this):this.bb())},n.bb=function(){Qc(this)};function Qc(i){if(i.h&&typeof s<"u"&&(!i.v[1]||ft(i)!=4||i.Z()!=2)){if(i.u&&ft(i)==4)yc(i.Ea,0,i);else if(je(i,"readystatechange"),ft(i)==4){i.h=!1;try{const F=i.Z();e:switch(F){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var u=!0;break e;default:u=!1}var p;if(!(p=u)){var w;if(w=F===0){var C=String(i.D).match(Uc)[1]||null;!C&&c.self&&c.self.location&&(C=c.self.location.protocol.slice(0,-1)),w=!wg.test(C?C.toLowerCase():"")}p=w}if(p)je(i,"complete"),je(i,"success");else{i.m=6;try{var R=2<ft(i)?i.g.statusText:""}catch{R=""}i.l=R+" ["+i.Z()+"]",Xc(i)}}finally{Sr(i)}}}}function Sr(i,u){if(i.g){Jc(i);const p=i.g,w=i.v[0]?()=>{}:null;i.g=null,i.v=null,u||je(i,"ready");try{p.onreadystatechange=w}catch{}}}function Jc(i){i.I&&(c.clearTimeout(i.I),i.I=null)}n.isActive=function(){return!!this.g};function ft(i){return i.g?i.g.readyState:0}n.Z=function(){try{return 2<ft(this)?this.g.status:-1}catch{return-1}},n.oa=function(){try{return this.g?this.g.responseText:""}catch{return""}},n.Oa=function(i){if(this.g){var u=this.g.responseText;return i&&u.indexOf(i)==0&&(u=u.substring(i.length)),Xp(u)}};function Zc(i){try{if(!i.g)return null;if("response"in i.g)return i.g.response;switch(i.H){case"":case"text":return i.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in i.g)return i.g.mozResponseArrayBuffer}return null}catch{return null}}function yg(i){const u={};i=(i.g&&2<=ft(i)&&i.g.getAllResponseHeaders()||"").split(`\r
`);for(let w=0;w<i.length;w++){if(L(i[w]))continue;var p=I(i[w]);const C=p[0];if(p=p[1],typeof p!="string")continue;p=p.trim();const R=u[C]||[];u[C]=R,R.push(p)}x(u,function(w){return w.join(", ")})}n.Ba=function(){return this.m},n.Ka=function(){return typeof this.l=="string"?this.l:String(this.l)};function Eo(i,u,p){return p&&p.internalChannelParams&&p.internalChannelParams[i]||u}function el(i){this.Aa=0,this.i=[],this.j=new go,this.ia=this.qa=this.I=this.W=this.g=this.ya=this.D=this.H=this.m=this.S=this.o=null,this.Ya=this.U=0,this.Va=Eo("failFast",!1,i),this.F=this.C=this.u=this.s=this.l=null,this.X=!0,this.za=this.T=-1,this.Y=this.v=this.B=0,this.Ta=Eo("baseRetryDelayMs",5e3,i),this.cb=Eo("retryDelaySeedMs",1e4,i),this.Wa=Eo("forwardChannelMaxRetries",2,i),this.wa=Eo("forwardChannelRequestTimeoutMs",2e4,i),this.pa=i&&i.xmlHttpFactory||void 0,this.Xa=i&&i.Tb||void 0,this.Ca=i&&i.useFetchStreams||!1,this.L=void 0,this.J=i&&i.supportsCrossDomainXhr||!1,this.K="",this.h=new $c(i&&i.concurrentRequestLimit),this.Da=new mg,this.P=i&&i.fastHandshake||!1,this.O=i&&i.encodeInitMessageHeaders||!1,this.P&&this.O&&(this.O=!1),this.Ua=i&&i.Rb||!1,i&&i.xa&&this.j.xa(),i&&i.forceLongPolling&&(this.X=!1),this.ba=!this.P&&this.X&&i&&i.detectBufferingProxy||!1,this.ja=void 0,i&&i.longPollingTimeout&&0<i.longPollingTimeout&&(this.ja=i.longPollingTimeout),this.ca=void 0,this.R=0,this.M=!1,this.ka=this.A=null}n=el.prototype,n.la=8,n.G=1,n.connect=function(i,u,p,w){He(0),this.W=i,this.H=u||{},p&&w!==void 0&&(this.H.OSID=p,this.H.OAID=w),this.F=this.X,this.I=ll(this,null,this.W),Ar(this)};function fs(i){if(tl(i),i.G==3){var u=i.U++,p=mt(i.I);if(me(p,"SID",i.K),me(p,"RID",u),me(p,"TYPE","terminate"),_o(i,p),u=new Ct(i,i.j,u),u.L=2,u.v=_r(mt(p)),p=!1,c.navigator&&c.navigator.sendBeacon)try{p=c.navigator.sendBeacon(u.v.toString(),"")}catch{}!p&&c.Image&&(new Image().src=u.v,p=!0),p||(u.g=dl(u.j,null),u.g.ea(u.v)),u.F=Date.now(),yr(u)}cl(i)}function Ir(i){i.g&&(vs(i),i.g.cancel(),i.g=null)}function tl(i){Ir(i),i.u&&(c.clearTimeout(i.u),i.u=null),kr(i),i.h.cancel(),i.s&&(typeof i.s=="number"&&c.clearTimeout(i.s),i.s=null)}function Ar(i){if(!Lc(i.h)&&!i.s){i.s=!0;var u=i.Ga;k||H(),N||(k(),N=!0),z.add(u,i),i.B=0}}function bg(i,u){return Fc(i.h)>=i.h.j-(i.s?1:0)?!1:i.s?(i.i=u.D.concat(i.i),!0):i.G==1||i.G==2||i.B>=(i.Va?0:i.Wa)?!1:(i.s=po(m(i.Ga,i,u),il(i,i.B)),i.B++,!0)}n.Ga=function(i){if(this.s)if(this.s=null,this.G==1){if(!i){this.U=Math.floor(1e5*Math.random()),i=this.U++;const C=new Ct(this,this.j,i);let R=this.o;if(this.S&&(R?(R=y(R),S(R,this.S)):R=this.S),this.m!==null||this.O||(C.H=R,R=null),this.P)e:{for(var u=0,p=0;p<this.i.length;p++){t:{var w=this.i[p];if("__data__"in w.map&&(w=w.map.__data__,typeof w=="string")){w=w.length;break t}w=void 0}if(w===void 0)break;if(u+=w,4096<u){u=p;break e}if(u===4096||p===this.i.length-1){u=p+1;break e}}u=1e3}else u=1e3;u=ol(this,C,u),p=mt(this.I),me(p,"RID",i),me(p,"CVER",22),this.D&&me(p,"X-HTTP-Session-Id",this.D),_o(this,p),R&&(this.O?u="headers="+encodeURIComponent(String(Kc(R)))+"&"+u:this.m&&ms(p,this.m,R)),gs(this.h,C),this.Ua&&me(p,"TYPE","init"),this.P?(me(p,"$req",u),me(p,"SID","null"),C.T=!0,ds(C,p,null)):ds(C,p,u),this.G=2}}else this.G==3&&(i?nl(this,i):this.i.length==0||Lc(this.h)||nl(this))};function nl(i,u){var p;u?p=u.l:p=i.U++;const w=mt(i.I);me(w,"SID",i.K),me(w,"RID",p),me(w,"AID",i.T),_o(i,w),i.m&&i.o&&ms(w,i.m,i.o),p=new Ct(i,i.j,p,i.B+1),i.m===null&&(p.H=i.o),u&&(i.i=u.D.concat(i.i)),u=ol(i,p,1e3),p.I=Math.round(.5*i.wa)+Math.round(.5*i.wa*Math.random()),gs(i.h,p),ds(p,w,u)}function _o(i,u){i.H&&ie(i.H,function(p,w){me(u,w,p)}),i.l&&Bc({},function(p,w){me(u,w,p)})}function ol(i,u,p){p=Math.min(i.i.length,p);var w=i.l?m(i.l.Na,i.l,i):null;e:{var C=i.i;let R=-1;for(;;){const F=["count="+p];R==-1?0<p?(R=C[0].g,F.push("ofs="+R)):R=0:F.push("ofs="+R);let le=!0;for(let De=0;De<p;De++){let ae=C[De].g;const Le=C[De].map;if(ae-=R,0>ae)R=Math.max(0,C[De].g-100),le=!1;else try{fg(Le,F,"req"+ae+"_")}catch{w&&w(Le)}}if(le){w=F.join("&");break e}}}return i=i.i.splice(0,p),u.D=i,w}function rl(i){if(!i.g&&!i.u){i.Y=1;var u=i.Fa;k||H(),N||(k(),N=!0),z.add(u,i),i.v=0}}function ws(i){return i.g||i.u||3<=i.v?!1:(i.Y++,i.u=po(m(i.Fa,i),il(i,i.v)),i.v++,!0)}n.Fa=function(){if(this.u=null,al(this),this.ba&&!(this.M||this.g==null||0>=this.R)){var i=2*this.R;this.j.info("BP detection timer enabled: "+i),this.A=po(m(this.ab,this),i)}},n.ab=function(){this.A&&(this.A=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.M=!0,He(10),Ir(this),al(this))};function vs(i){i.A!=null&&(c.clearTimeout(i.A),i.A=null)}function al(i){i.g=new Ct(i,i.j,"rpc",i.Y),i.m===null&&(i.g.H=i.o),i.g.O=0;var u=mt(i.qa);me(u,"RID","rpc"),me(u,"SID",i.K),me(u,"AID",i.T),me(u,"CI",i.F?"0":"1"),!i.F&&i.ja&&me(u,"TO",i.ja),me(u,"TYPE","xmlhttp"),_o(i,u),i.m&&i.o&&ms(u,i.m,i.o),i.L&&(i.g.I=i.L);var p=i.g;i=i.ia,p.L=1,p.v=_r(mt(u)),p.m=null,p.P=!0,Dc(p,i)}n.Za=function(){this.C!=null&&(this.C=null,Ir(this),ws(this),He(19))};function kr(i){i.C!=null&&(c.clearTimeout(i.C),i.C=null)}function sl(i,u){var p=null;if(i.g==u){kr(i),vs(i),i.g=null;var w=2}else if(ps(i.h,u))p=u.D,Vc(i.h,u),w=1;else return;if(i.G!=0){if(u.o)if(w==1){p=u.m?u.m.length:0,u=Date.now()-u.F;var C=i.B;w=fr(),je(w,new kc(w,p)),Ar(i)}else rl(i);else if(C=u.s,C==3||C==0&&0<u.X||!(w==1&&bg(i,u)||w==2&&ws(i)))switch(p&&0<p.length&&(u=i.h,u.i=u.i.concat(p)),C){case 1:an(i,5);break;case 4:an(i,10);break;case 3:an(i,6);break;default:an(i,2)}}}function il(i,u){let p=i.Ta+Math.floor(Math.random()*i.cb);return i.isActive()||(p*=2),p*u}function an(i,u){if(i.j.info("Error code "+u),u==2){var p=m(i.fb,i),w=i.Xa;const C=!w;w=new rn(w||"//www.google.com/images/cleardot.gif"),c.location&&c.location.protocol=="http"||br(w,"https"),_r(w),C?pg(w.toString(),p):gg(w.toString(),p)}else He(2);i.G=0,i.l&&i.l.sa(u),cl(i),tl(i)}n.fb=function(i){i?(this.j.info("Successfully pinged google.com"),He(2)):(this.j.info("Failed to ping google.com"),He(1))};function cl(i){if(i.G=0,i.ka=[],i.l){const u=Oc(i.h);(u.length!=0||i.i.length!=0)&&(T(i.ka,u),T(i.ka,i.i),i.h.i.length=0,b(i.i),i.i.length=0),i.l.ra()}}function ll(i,u,p){var w=p instanceof rn?mt(p):new rn(p);if(w.g!="")u&&(w.g=u+"."+w.g),Er(w,w.s);else{var C=c.location;w=C.protocol,u=u?u+"."+C.hostname:C.hostname,C=+C.port;var R=new rn(null);w&&br(R,w),u&&(R.g=u),C&&Er(R,C),p&&(R.l=p),w=R}return p=i.D,u=i.ya,p&&u&&me(w,p,u),me(w,"VER",i.la),_o(i,w),w}function dl(i,u,p){if(u&&!i.J)throw Error("Can't create secondary domain capable XhrIo object.");return u=i.Ca&&!i.pa?new ye(new xr({eb:p})):new ye(i.pa),u.Ha(i.J),u}n.isActive=function(){return!!this.l&&this.l.isActive(this)};function ul(){}n=ul.prototype,n.ua=function(){},n.ta=function(){},n.sa=function(){},n.ra=function(){},n.isActive=function(){return!0},n.Na=function(){};function Cr(){}Cr.prototype.g=function(i,u){return new Ye(i,u)};function Ye(i,u){$e.call(this),this.g=new el(u),this.l=i,this.h=u&&u.messageUrlParams||null,i=u&&u.messageHeaders||null,u&&u.clientProtocolHeaderRequired&&(i?i["X-Client-Protocol"]="webchannel":i={"X-Client-Protocol":"webchannel"}),this.g.o=i,i=u&&u.initMessageHeaders||null,u&&u.messageContentType&&(i?i["X-WebChannel-Content-Type"]=u.messageContentType:i={"X-WebChannel-Content-Type":u.messageContentType}),u&&u.va&&(i?i["X-WebChannel-Client-Profile"]=u.va:i={"X-WebChannel-Client-Profile":u.va}),this.g.S=i,(i=u&&u.Sb)&&!L(i)&&(this.g.m=i),this.v=u&&u.supportsCrossDomainXhr||!1,this.u=u&&u.sendRawJson||!1,(u=u&&u.httpSessionIdParam)&&!L(u)&&(this.g.D=u,i=this.h,i!==null&&u in i&&(i=this.h,u in i&&delete i[u])),this.j=new kn(this)}v(Ye,$e),Ye.prototype.m=function(){this.g.l=this.j,this.v&&(this.g.J=!0),this.g.connect(this.l,this.h||void 0)},Ye.prototype.close=function(){fs(this.g)},Ye.prototype.o=function(i){var u=this.g;if(typeof i=="string"){var p={};p.__data__=i,i=p}else this.u&&(p={},p.__data__=rs(i),i=p);u.i.push(new og(u.Ya++,i)),u.G==3&&Ar(u)},Ye.prototype.N=function(){this.g.l=null,delete this.j,fs(this.g),delete this.g,Ye.aa.N.call(this)};function hl(i){ss.call(this),i.__headers__&&(this.headers=i.__headers__,this.statusCode=i.__status__,delete i.__headers__,delete i.__status__);var u=i.__sm__;if(u){e:{for(const p in u){i=p;break e}i=void 0}(this.i=i)&&(i=this.i,u=u!==null&&i in u?u[i]:void 0),this.data=u}else this.data=i}v(hl,ss);function pl(){is.call(this),this.status=1}v(pl,is);function kn(i){this.g=i}v(kn,ul),kn.prototype.ua=function(){je(this.g,"a")},kn.prototype.ta=function(i){je(this.g,new hl(i))},kn.prototype.sa=function(i){je(this.g,new pl)},kn.prototype.ra=function(){je(this.g,"b")},Cr.prototype.createWebChannel=Cr.prototype.g,Ye.prototype.send=Ye.prototype.o,Ye.prototype.open=Ye.prototype.m,Ye.prototype.close=Ye.prototype.close,gu=function(){return new Cr},pu=function(){return fr()},hu=nn,Bs={mb:0,pb:1,qb:2,Jb:3,Ob:4,Lb:5,Mb:6,Kb:7,Ib:8,Nb:9,PROXY:10,NOPROXY:11,Gb:12,Cb:13,Db:14,Bb:15,Eb:16,Fb:17,ib:18,hb:19,jb:20},wr.NO_ERROR=0,wr.TIMEOUT=8,wr.HTTP_ERROR=6,Fr=wr,Cc.COMPLETE="complete",uu=Cc,Tc.EventType=uo,uo.OPEN="a",uo.CLOSE="b",uo.ERROR="c",uo.MESSAGE="d",$e.prototype.listen=$e.prototype.K,To=Tc,ye.prototype.listenOnce=ye.prototype.L,ye.prototype.getLastError=ye.prototype.Ka,ye.prototype.getLastErrorCode=ye.prototype.Ba,ye.prototype.getStatus=ye.prototype.Z,ye.prototype.getResponseJson=ye.prototype.Oa,ye.prototype.getResponseText=ye.prototype.oa,ye.prototype.send=ye.prototype.ea,ye.prototype.setWithCredentials=ye.prototype.Ha,du=ye}).apply(typeof Pr<"u"?Pr:typeof self<"u"?self:typeof window<"u"?window:{});const Al="@firebase/firestore",kl="4.9.0";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Oe{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}Oe.UNAUTHENTICATED=new Oe(null),Oe.GOOGLE_CREDENTIALS=new Oe("google-credentials-uid"),Oe.FIRST_PARTY=new Oe("first-party-uid"),Oe.MOCK_USER=new Oe("mock-user");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Zn="12.0.0";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const gn=new ci("@firebase/firestore");function Dn(){return gn.logLevel}function U(n,...e){if(gn.logLevel<=Z.DEBUG){const t=e.map(ui);gn.debug(`Firestore (${Zn}): ${n}`,...t)}}function St(n,...e){if(gn.logLevel<=Z.ERROR){const t=e.map(ui);gn.error(`Firestore (${Zn}): ${n}`,...t)}}function mn(n,...e){if(gn.logLevel<=Z.WARN){const t=e.map(ui);gn.warn(`Firestore (${Zn}): ${n}`,...t)}}function ui(n){if(typeof n=="string")return n;try{/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/return function(t){return JSON.stringify(t)}(n)}catch{return n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function G(n,e,t){let o="Unexpected state";typeof e=="string"?o=e:t=e,mu(n,o,t)}function mu(n,e,t){let o=`FIRESTORE (${Zn}) INTERNAL ASSERTION FAILED: ${e} (ID: ${n.toString(16)})`;if(t!==void 0)try{o+=" CONTEXT: "+JSON.stringify(t)}catch{o+=" CONTEXT: "+t}throw St(o),new Error(o)}function se(n,e,t,o){let r="Unexpected state";typeof t=="string"?r=t:o=t,n||mu(e,r,o)}function Y(n,e){return n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const M={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class V extends kt{constructor(e,t){super(e,t),this.code=e,this.message=t,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Et{constructor(){this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fu{constructor(e,t){this.user=t,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class wu{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,t){e.enqueueRetryable(()=>t(Oe.UNAUTHENTICATED))}shutdown(){}}class cf{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,t){this.changeListener=t,e.enqueueRetryable(()=>t(this.token.user))}shutdown(){this.changeListener=null}}class lf{constructor(e){this.t=e,this.currentUser=Oe.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,t){se(this.o===void 0,42304);let o=this.i;const r=l=>this.i!==o?(o=this.i,t(l)):Promise.resolve();let a=new Et;this.o=()=>{this.i++,this.currentUser=this.u(),a.resolve(),a=new Et,e.enqueueRetryable(()=>r(this.currentUser))};const s=()=>{const l=a;e.enqueueRetryable(async()=>{await l.promise,await r(this.currentUser)})},c=l=>{U("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=l,this.o&&(this.auth.addAuthTokenListener(this.o),s())};this.t.onInit(l=>c(l)),setTimeout(()=>{if(!this.auth){const l=this.t.getImmediate({optional:!0});l?c(l):(U("FirebaseAuthCredentialsProvider","Auth not yet detected"),a.resolve(),a=new Et)}},0),s()}getToken(){const e=this.i,t=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(t).then(o=>this.i!==e?(U("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):o?(se(typeof o.accessToken=="string",31837,{l:o}),new fu(o.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const e=this.auth&&this.auth.getUid();return se(e===null||typeof e=="string",2055,{h:e}),new Oe(e)}}class df{constructor(e,t,o){this.P=e,this.T=t,this.I=o,this.type="FirstParty",this.user=Oe.FIRST_PARTY,this.A=new Map}R(){return this.I?this.I():null}get headers(){this.A.set("X-Goog-AuthUser",this.P);const e=this.R();return e&&this.A.set("Authorization",e),this.T&&this.A.set("X-Goog-Iam-Authorization-Token",this.T),this.A}}class uf{constructor(e,t,o){this.P=e,this.T=t,this.I=o}getToken(){return Promise.resolve(new df(this.P,this.T,this.I))}start(e,t){e.enqueueRetryable(()=>t(Oe.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class Cl{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class hf{constructor(e,t){this.V=t,this.forceRefresh=!1,this.appCheck=null,this.m=null,this.p=null,et(e)&&e.settings.appCheckToken&&(this.p=e.settings.appCheckToken)}start(e,t){se(this.o===void 0,3512);const o=a=>{a.error!=null&&U("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${a.error.message}`);const s=a.token!==this.m;return this.m=a.token,U("FirebaseAppCheckTokenProvider",`Received ${s?"new":"existing"} token.`),s?t(a.token):Promise.resolve()};this.o=a=>{e.enqueueRetryable(()=>o(a))};const r=a=>{U("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=a,this.o&&this.appCheck.addTokenListener(this.o)};this.V.onInit(a=>r(a)),setTimeout(()=>{if(!this.appCheck){const a=this.V.getImmediate({optional:!0});a?r(a):U("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){if(this.p)return Promise.resolve(new Cl(this.p));const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then(t=>t?(se(typeof t.token=="string",44558,{tokenResult:t}),this.m=t.token,new Cl(t.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function pf(n){const e=typeof self<"u"&&(self.crypto||self.msCrypto),t=new Uint8Array(n);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(t);else for(let o=0;o<n;o++)t[o]=Math.floor(256*Math.random());return t}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ma{static newId(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",t=62*Math.floor(4.129032258064516);let o="";for(;o.length<20;){const r=pf(40);for(let a=0;a<r.length;++a)o.length<20&&r[a]<t&&(o+=e.charAt(r[a]%62))}return o}}function ee(n,e){return n<e?-1:n>e?1:0}function Us(n,e){const t=Math.min(n.length,e.length);for(let o=0;o<t;o++){const r=n.charAt(o),a=e.charAt(o);if(r!==a)return Ss(r)===Ss(a)?ee(r,a):Ss(r)?1:-1}return ee(n.length,e.length)}const gf=55296,mf=57343;function Ss(n){const e=n.charCodeAt(0);return e>=gf&&e<=mf}function zn(n,e,t){return n.length===e.length&&n.every((o,r)=>t(o,e[r]))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Rl="__name__";class it{constructor(e,t,o){t===void 0?t=0:t>e.length&&G(637,{offset:t,range:e.length}),o===void 0?o=e.length-t:o>e.length-t&&G(1746,{length:o,range:e.length-t}),this.segments=e,this.offset=t,this.len=o}get length(){return this.len}isEqual(e){return it.comparator(this,e)===0}child(e){const t=this.segments.slice(this.offset,this.limit());return e instanceof it?e.forEach(o=>{t.push(o)}):t.push(e),this.construct(t)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}forEach(e){for(let t=this.offset,o=this.limit();t<o;t++)e(this.segments[t])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,t){const o=Math.min(e.length,t.length);for(let r=0;r<o;r++){const a=it.compareSegments(e.get(r),t.get(r));if(a!==0)return a}return ee(e.length,t.length)}static compareSegments(e,t){const o=it.isNumericId(e),r=it.isNumericId(t);return o&&!r?-1:!o&&r?1:o&&r?it.extractNumericId(e).compare(it.extractNumericId(t)):Us(e,t)}static isNumericId(e){return e.startsWith("__id")&&e.endsWith("__")}static extractNumericId(e){return Bt.fromString(e.substring(4,e.length-2))}}class de extends it{construct(e,t,o){return new de(e,t,o)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){const t=[];for(const o of e){if(o.indexOf("//")>=0)throw new V(M.INVALID_ARGUMENT,`Invalid segment (${o}). Paths must not contain // in them.`);t.push(...o.split("/").filter(r=>r.length>0))}return new de(t)}static emptyPath(){return new de([])}}const ff=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class Ce extends it{construct(e,t,o){return new Ce(e,t,o)}static isValidIdentifier(e){return ff.test(e)}canonicalString(){return this.toArray().map(e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),Ce.isValidIdentifier(e)||(e="`"+e+"`"),e)).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)===Rl}static keyField(){return new Ce([Rl])}static fromServerFormat(e){const t=[];let o="",r=0;const a=()=>{if(o.length===0)throw new V(M.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);t.push(o),o=""};let s=!1;for(;r<e.length;){const c=e[r];if(c==="\\"){if(r+1===e.length)throw new V(M.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const l=e[r+1];if(l!=="\\"&&l!=="."&&l!=="`")throw new V(M.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);o+=l,r+=2}else c==="`"?(s=!s,r++):c!=="."||s?(o+=c,r++):(a(),r++)}if(a(),s)throw new V(M.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new Ce(t)}static emptyPath(){return new Ce([])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class j{constructor(e){this.path=e}static fromPath(e){return new j(de.fromString(e))}static fromName(e){return new j(de.fromString(e).popFirst(5))}static empty(){return new j(de.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&de.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,t){return de.comparator(e.path,t.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new j(new de(e.slice()))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function vu(n,e,t){if(!t)throw new V(M.INVALID_ARGUMENT,`Function ${n}() cannot be called with an empty ${e}.`)}function yu(n,e,t,o){if(e===!0&&o===!0)throw new V(M.INVALID_ARGUMENT,`${n} and ${t} cannot be used together.`)}function Pl(n){if(!j.isDocumentKey(n))throw new V(M.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${n} has ${n.length}.`)}function Dl(n){if(j.isDocumentKey(n))throw new V(M.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${n} has ${n.length}.`)}function bu(n){return typeof n=="object"&&n!==null&&(Object.getPrototypeOf(n)===Object.prototype||Object.getPrototypeOf(n)===null)}function fa(n){if(n===void 0)return"undefined";if(n===null)return"null";if(typeof n=="string")return n.length>20&&(n=`${n.substring(0,20)}...`),JSON.stringify(n);if(typeof n=="number"||typeof n=="boolean")return""+n;if(typeof n=="object"){if(n instanceof Array)return"an array";{const e=function(o){return o.constructor?o.constructor.name:null}(n);return e?`a custom ${e} object`:"an object"}}return typeof n=="function"?"a function":G(12329,{type:typeof n})}function Ue(n,e){if("_delegate"in n&&(n=n._delegate),!(n instanceof e)){if(e.name===n.constructor.name)throw new V(M.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const t=fa(n);throw new V(M.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${t}`)}}return n}function wf(n,e){if(e<=0)throw new V(M.INVALID_ARGUMENT,`Function ${n}() requires a positive number, but it was: ${e}.`)}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function xe(n,e){const t={typeString:n};return e&&(t.value=e),t}function er(n,e){if(!bu(n))throw new V(M.INVALID_ARGUMENT,"JSON must be an object");let t;for(const o in e)if(e[o]){const r=e[o].typeString,a="value"in e[o]?{value:e[o].value}:void 0;if(!(o in n)){t=`JSON missing required field: '${o}'`;break}const s=n[o];if(r&&typeof s!==r){t=`JSON field '${o}' must be a ${r}.`;break}if(a!==void 0&&s!==a.value){t=`Expected '${o}' field to equal '${a.value}'`;break}}if(t)throw new V(M.INVALID_ARGUMENT,t);return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ml=-62135596800,Nl=1e6;class ue{static now(){return ue.fromMillis(Date.now())}static fromDate(e){return ue.fromMillis(e.getTime())}static fromMillis(e){const t=Math.floor(e/1e3),o=Math.floor((e-1e3*t)*Nl);return new ue(t,o)}constructor(e,t){if(this.seconds=e,this.nanoseconds=t,t<0)throw new V(M.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(t>=1e9)throw new V(M.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(e<Ml)throw new V(M.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new V(M.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/Nl}_compareTo(e){return this.seconds===e.seconds?ee(this.nanoseconds,e.nanoseconds):ee(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{type:ue._jsonSchemaVersion,seconds:this.seconds,nanoseconds:this.nanoseconds}}static fromJSON(e){if(er(e,ue._jsonSchema))return new ue(e.seconds,e.nanoseconds)}valueOf(){const e=this.seconds-Ml;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}ue._jsonSchemaVersion="firestore/timestamp/1.0",ue._jsonSchema={type:xe("string",ue._jsonSchemaVersion),seconds:xe("number"),nanoseconds:xe("number")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class K{static fromTimestamp(e){return new K(e)}static min(){return new K(new ue(0,0))}static max(){return new K(new ue(253402300799,999999999))}constructor(e){this.timestamp=e}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Uo=-1;function vf(n,e){const t=n.toTimestamp().seconds,o=n.toTimestamp().nanoseconds+1,r=K.fromTimestamp(o===1e9?new ue(t+1,0):new ue(t,o));return new jt(r,j.empty(),e)}function yf(n){return new jt(n.readTime,n.key,Uo)}class jt{constructor(e,t,o){this.readTime=e,this.documentKey=t,this.largestBatchId=o}static min(){return new jt(K.min(),j.empty(),Uo)}static max(){return new jt(K.max(),j.empty(),Uo)}}function bf(n,e){let t=n.readTime.compareTo(e.readTime);return t!==0?t:(t=j.comparator(n.documentKey,e.documentKey),t!==0?t:ee(n.largestBatchId,e.largestBatchId))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ef="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class _f{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(e=>e())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function eo(n){if(n.code!==M.FAILED_PRECONDITION||n.message!==Ef)throw n;U("LocalStore","Unexpectedly lost primary lease")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ${constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e(t=>{this.isDone=!0,this.result=t,this.nextCallback&&this.nextCallback(t)},t=>{this.isDone=!0,this.error=t,this.catchCallback&&this.catchCallback(t)})}catch(e){return this.next(void 0,e)}next(e,t){return this.callbackAttached&&G(59440),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(t,this.error):this.wrapSuccess(e,this.result):new $((o,r)=>{this.nextCallback=a=>{this.wrapSuccess(e,a).next(o,r)},this.catchCallback=a=>{this.wrapFailure(t,a).next(o,r)}})}toPromise(){return new Promise((e,t)=>{this.next(e,t)})}wrapUserFunction(e){try{const t=e();return t instanceof $?t:$.resolve(t)}catch(t){return $.reject(t)}}wrapSuccess(e,t){return e?this.wrapUserFunction(()=>e(t)):$.resolve(t)}wrapFailure(e,t){return e?this.wrapUserFunction(()=>e(t)):$.reject(t)}static resolve(e){return new $((t,o)=>{t(e)})}static reject(e){return new $((t,o)=>{o(e)})}static waitFor(e){return new $((t,o)=>{let r=0,a=0,s=!1;e.forEach(c=>{++r,c.next(()=>{++a,s&&a===r&&t()},l=>o(l))}),s=!0,a===r&&t()})}static or(e){let t=$.resolve(!1);for(const o of e)t=t.next(r=>r?$.resolve(r):o());return t}static forEach(e,t){const o=[];return e.forEach((r,a)=>{o.push(t.call(this,r,a))}),this.waitFor(o)}static mapArray(e,t){return new $((o,r)=>{const a=e.length,s=new Array(a);let c=0;for(let l=0;l<a;l++){const d=l;t(e[d]).next(h=>{s[d]=h,++c,c===a&&o(s)},h=>r(h))}})}static doWhile(e,t){return new $((o,r)=>{const a=()=>{e()===!0?t().next(()=>{a()},r):o()};a()})}}function xf(n){const e=n.match(/Android ([\d.]+)/i),t=e?e[1].split(".").slice(0,2).join("."):"-1";return Number(t)}function to(n){return n.name==="IndexedDbTransactionError"}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wa{constructor(e,t){this.previousValue=e,t&&(t.sequenceNumberHandler=o=>this.ae(o),this.ue=o=>t.writeSequenceNumber(o))}ae(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){const e=++this.previousValue;return this.ue&&this.ue(e),e}}wa.ce=-1;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const hi=-1;function va(n){return n==null}function Kr(n){return n===0&&1/n==-1/0}function Tf(n){return typeof n=="number"&&Number.isInteger(n)&&!Kr(n)&&n<=Number.MAX_SAFE_INTEGER&&n>=Number.MIN_SAFE_INTEGER}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Eu="";function Sf(n){let e="";for(let t=0;t<n.length;t++)e.length>0&&(e=$l(e)),e=If(n.get(t),e);return $l(e)}function If(n,e){let t=e;const o=n.length;for(let r=0;r<o;r++){const a=n.charAt(r);switch(a){case"\0":t+="";break;case Eu:t+="";break;default:t+=a}}return t}function $l(n){return n+Eu+""}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ll(n){let e=0;for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e++;return e}function Jt(n,e){for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e(t,n[t])}function _u(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ve{constructor(e,t){this.comparator=e,this.root=t||Me.EMPTY}insert(e,t){return new ve(this.comparator,this.root.insert(e,t,this.comparator).copy(null,null,Me.BLACK,null,null))}remove(e){return new ve(this.comparator,this.root.remove(e,this.comparator).copy(null,null,Me.BLACK,null,null))}get(e){let t=this.root;for(;!t.isEmpty();){const o=this.comparator(e,t.key);if(o===0)return t.value;o<0?t=t.left:o>0&&(t=t.right)}return null}indexOf(e){let t=0,o=this.root;for(;!o.isEmpty();){const r=this.comparator(e,o.key);if(r===0)return t+o.left.size;r<0?o=o.left:(t+=o.left.size+1,o=o.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal((t,o)=>(e(t,o),!1))}toString(){const e=[];return this.inorderTraversal((t,o)=>(e.push(`${t}:${o}`),!1)),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new Dr(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new Dr(this.root,e,this.comparator,!1)}getReverseIterator(){return new Dr(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new Dr(this.root,e,this.comparator,!0)}}class Dr{constructor(e,t,o,r){this.isReverse=r,this.nodeStack=[];let a=1;for(;!e.isEmpty();)if(a=t?o(e.key,t):1,t&&r&&(a*=-1),a<0)e=this.isReverse?e.left:e.right;else{if(a===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop();const t={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return t}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class Me{constructor(e,t,o,r,a){this.key=e,this.value=t,this.color=o??Me.RED,this.left=r??Me.EMPTY,this.right=a??Me.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,t,o,r,a){return new Me(e??this.key,t??this.value,o??this.color,r??this.left,a??this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,o){let r=this;const a=o(e,r.key);return r=a<0?r.copy(null,null,null,r.left.insert(e,t,o),null):a===0?r.copy(null,t,null,null,null):r.copy(null,null,null,null,r.right.insert(e,t,o)),r.fixUp()}removeMin(){if(this.left.isEmpty())return Me.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,t){let o,r=this;if(t(e,r.key)<0)r.left.isEmpty()||r.left.isRed()||r.left.left.isRed()||(r=r.moveRedLeft()),r=r.copy(null,null,null,r.left.remove(e,t),null);else{if(r.left.isRed()&&(r=r.rotateRight()),r.right.isEmpty()||r.right.isRed()||r.right.left.isRed()||(r=r.moveRedRight()),t(e,r.key)===0){if(r.right.isEmpty())return Me.EMPTY;o=r.right.min(),r=r.copy(o.key,o.value,null,null,r.right.removeMin())}r=r.copy(null,null,null,null,r.right.remove(e,t))}return r.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,Me.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,Me.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed())throw G(43730,{key:this.key,value:this.value});if(this.right.isRed())throw G(14113,{key:this.key,value:this.value});const e=this.left.check();if(e!==this.right.check())throw G(27949);return e+(this.isRed()?0:1)}}Me.EMPTY=null,Me.RED=!0,Me.BLACK=!1;Me.EMPTY=new class{constructor(){this.size=0}get key(){throw G(57766)}get value(){throw G(16141)}get color(){throw G(16727)}get left(){throw G(29726)}get right(){throw G(36894)}copy(e,t,o,r,a){return this}insert(e,t,o){return new Me(e,t)}remove(e,t){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Se{constructor(e){this.comparator=e,this.data=new ve(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal((t,o)=>(e(t),!1))}forEachInRange(e,t){const o=this.data.getIteratorFrom(e[0]);for(;o.hasNext();){const r=o.getNext();if(this.comparator(r.key,e[1])>=0)return;t(r.key)}}forEachWhile(e,t){let o;for(o=t!==void 0?this.data.getIteratorFrom(t):this.data.getIterator();o.hasNext();)if(!e(o.getNext().key))return}firstAfterOrEqual(e){const t=this.data.getIteratorFrom(e);return t.hasNext()?t.getNext().key:null}getIterator(){return new Fl(this.data.getIterator())}getIteratorFrom(e){return new Fl(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let t=this;return t.size<e.size&&(t=e,e=this),e.forEach(o=>{t=t.add(o)}),t}isEqual(e){if(!(e instanceof Se)||this.size!==e.size)return!1;const t=this.data.getIterator(),o=e.data.getIterator();for(;t.hasNext();){const r=t.getNext().key,a=o.getNext().key;if(this.comparator(r,a)!==0)return!1}return!0}toArray(){const e=[];return this.forEach(t=>{e.push(t)}),e}toString(){const e=[];return this.forEach(t=>e.push(t)),"SortedSet("+e.toString()+")"}copy(e){const t=new Se(this.comparator);return t.data=e,t}}class Fl{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Je{constructor(e){this.fields=e,e.sort(Ce.comparator)}static empty(){return new Je([])}unionWith(e){let t=new Se(Ce.comparator);for(const o of this.fields)t=t.add(o);for(const o of e)t=t.add(o);return new Je(t.toArray())}covers(e){for(const t of this.fields)if(t.isPrefixOf(e))return!0;return!1}isEqual(e){return zn(this.fields,e.fields,(t,o)=>t.isEqual(o))}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xu extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Re{constructor(e){this.binaryString=e}static fromBase64String(e){const t=function(r){try{return atob(r)}catch(a){throw typeof DOMException<"u"&&a instanceof DOMException?new xu("Invalid base64 string: "+a):a}}(e);return new Re(t)}static fromUint8Array(e){const t=function(r){let a="";for(let s=0;s<r.length;++s)a+=String.fromCharCode(r[s]);return a}(e);return new Re(t)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return function(t){return btoa(t)}(this.binaryString)}toUint8Array(){return function(t){const o=new Uint8Array(t.length);for(let r=0;r<t.length;r++)o[r]=t.charCodeAt(r);return o}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return ee(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}Re.EMPTY_BYTE_STRING=new Re("");const Af=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function Ht(n){if(se(!!n,39018),typeof n=="string"){let e=0;const t=Af.exec(n);if(se(!!t,46558,{timestamp:n}),t[1]){let r=t[1];r=(r+"000000000").substr(0,9),e=Number(r)}const o=new Date(n);return{seconds:Math.floor(o.getTime()/1e3),nanos:e}}return{seconds:be(n.seconds),nanos:be(n.nanos)}}function be(n){return typeof n=="number"?n:typeof n=="string"?Number(n):0}function Gt(n){return typeof n=="string"?Re.fromBase64String(n):Re.fromUint8Array(n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Tu="server_timestamp",Su="__type__",Iu="__previous_value__",Au="__local_write_time__";function pi(n){return(n?.mapValue?.fields||{})[Su]?.stringValue===Tu}function ya(n){const e=n.mapValue.fields[Iu];return pi(e)?ya(e):e}function zo(n){const e=Ht(n.mapValue.fields[Au].timestampValue);return new ue(e.seconds,e.nanos)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kf{constructor(e,t,o,r,a,s,c,l,d,h){this.databaseId=e,this.appId=t,this.persistenceKey=o,this.host=r,this.ssl=a,this.forceLongPolling=s,this.autoDetectLongPolling=c,this.longPollingOptions=l,this.useFetchStreams=d,this.isUsingEmulator=h}}const Yr="(default)";class qn{constructor(e,t){this.projectId=e,this.database=t||Yr}static empty(){return new qn("","")}get isDefaultDatabase(){return this.database===Yr}isEqual(e){return e instanceof qn&&e.projectId===this.projectId&&e.database===this.database}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ku="__type__",Cf="__max__",Mr={mapValue:{}},Cu="__vector__",Xr="value";function Wt(n){return"nullValue"in n?0:"booleanValue"in n?1:"integerValue"in n||"doubleValue"in n?2:"timestampValue"in n?3:"stringValue"in n?5:"bytesValue"in n?6:"referenceValue"in n?7:"geoPointValue"in n?8:"arrayValue"in n?9:"mapValue"in n?pi(n)?4:Pf(n)?9007199254740991:Rf(n)?10:11:G(28295,{value:n})}function ut(n,e){if(n===e)return!0;const t=Wt(n);if(t!==Wt(e))return!1;switch(t){case 0:case 9007199254740991:return!0;case 1:return n.booleanValue===e.booleanValue;case 4:return zo(n).isEqual(zo(e));case 3:return function(r,a){if(typeof r.timestampValue=="string"&&typeof a.timestampValue=="string"&&r.timestampValue.length===a.timestampValue.length)return r.timestampValue===a.timestampValue;const s=Ht(r.timestampValue),c=Ht(a.timestampValue);return s.seconds===c.seconds&&s.nanos===c.nanos}(n,e);case 5:return n.stringValue===e.stringValue;case 6:return function(r,a){return Gt(r.bytesValue).isEqual(Gt(a.bytesValue))}(n,e);case 7:return n.referenceValue===e.referenceValue;case 8:return function(r,a){return be(r.geoPointValue.latitude)===be(a.geoPointValue.latitude)&&be(r.geoPointValue.longitude)===be(a.geoPointValue.longitude)}(n,e);case 2:return function(r,a){if("integerValue"in r&&"integerValue"in a)return be(r.integerValue)===be(a.integerValue);if("doubleValue"in r&&"doubleValue"in a){const s=be(r.doubleValue),c=be(a.doubleValue);return s===c?Kr(s)===Kr(c):isNaN(s)&&isNaN(c)}return!1}(n,e);case 9:return zn(n.arrayValue.values||[],e.arrayValue.values||[],ut);case 10:case 11:return function(r,a){const s=r.mapValue.fields||{},c=a.mapValue.fields||{};if(Ll(s)!==Ll(c))return!1;for(const l in s)if(s.hasOwnProperty(l)&&(c[l]===void 0||!ut(s[l],c[l])))return!1;return!0}(n,e);default:return G(52216,{left:n})}}function qo(n,e){return(n.values||[]).find(t=>ut(t,e))!==void 0}function jn(n,e){if(n===e)return 0;const t=Wt(n),o=Wt(e);if(t!==o)return ee(t,o);switch(t){case 0:case 9007199254740991:return 0;case 1:return ee(n.booleanValue,e.booleanValue);case 2:return function(a,s){const c=be(a.integerValue||a.doubleValue),l=be(s.integerValue||s.doubleValue);return c<l?-1:c>l?1:c===l?0:isNaN(c)?isNaN(l)?0:-1:1}(n,e);case 3:return Vl(n.timestampValue,e.timestampValue);case 4:return Vl(zo(n),zo(e));case 5:return Us(n.stringValue,e.stringValue);case 6:return function(a,s){const c=Gt(a),l=Gt(s);return c.compareTo(l)}(n.bytesValue,e.bytesValue);case 7:return function(a,s){const c=a.split("/"),l=s.split("/");for(let d=0;d<c.length&&d<l.length;d++){const h=ee(c[d],l[d]);if(h!==0)return h}return ee(c.length,l.length)}(n.referenceValue,e.referenceValue);case 8:return function(a,s){const c=ee(be(a.latitude),be(s.latitude));return c!==0?c:ee(be(a.longitude),be(s.longitude))}(n.geoPointValue,e.geoPointValue);case 9:return Ol(n.arrayValue,e.arrayValue);case 10:return function(a,s){const c=a.fields||{},l=s.fields||{},d=c[Xr]?.arrayValue,h=l[Xr]?.arrayValue,g=ee(d?.values?.length||0,h?.values?.length||0);return g!==0?g:Ol(d,h)}(n.mapValue,e.mapValue);case 11:return function(a,s){if(a===Mr.mapValue&&s===Mr.mapValue)return 0;if(a===Mr.mapValue)return 1;if(s===Mr.mapValue)return-1;const c=a.fields||{},l=Object.keys(c),d=s.fields||{},h=Object.keys(d);l.sort(),h.sort();for(let g=0;g<l.length&&g<h.length;++g){const m=Us(l[g],h[g]);if(m!==0)return m;const f=jn(c[l[g]],d[h[g]]);if(f!==0)return f}return ee(l.length,h.length)}(n.mapValue,e.mapValue);default:throw G(23264,{he:t})}}function Vl(n,e){if(typeof n=="string"&&typeof e=="string"&&n.length===e.length)return ee(n,e);const t=Ht(n),o=Ht(e),r=ee(t.seconds,o.seconds);return r!==0?r:ee(t.nanos,o.nanos)}function Ol(n,e){const t=n.values||[],o=e.values||[];for(let r=0;r<t.length&&r<o.length;++r){const a=jn(t[r],o[r]);if(a)return a}return ee(t.length,o.length)}function Hn(n){return zs(n)}function zs(n){return"nullValue"in n?"null":"booleanValue"in n?""+n.booleanValue:"integerValue"in n?""+n.integerValue:"doubleValue"in n?""+n.doubleValue:"timestampValue"in n?function(t){const o=Ht(t);return`time(${o.seconds},${o.nanos})`}(n.timestampValue):"stringValue"in n?n.stringValue:"bytesValue"in n?function(t){return Gt(t).toBase64()}(n.bytesValue):"referenceValue"in n?function(t){return j.fromName(t).toString()}(n.referenceValue):"geoPointValue"in n?function(t){return`geo(${t.latitude},${t.longitude})`}(n.geoPointValue):"arrayValue"in n?function(t){let o="[",r=!0;for(const a of t.values||[])r?r=!1:o+=",",o+=zs(a);return o+"]"}(n.arrayValue):"mapValue"in n?function(t){const o=Object.keys(t.fields||{}).sort();let r="{",a=!0;for(const s of o)a?a=!1:r+=",",r+=`${s}:${zs(t.fields[s])}`;return r+"}"}(n.mapValue):G(61005,{value:n})}function Vr(n){switch(Wt(n)){case 0:case 1:return 4;case 2:return 8;case 3:case 8:return 16;case 4:const e=ya(n);return e?16+Vr(e):16;case 5:return 2*n.stringValue.length;case 6:return Gt(n.bytesValue).approximateByteSize();case 7:return n.referenceValue.length;case 9:return function(o){return(o.values||[]).reduce((r,a)=>r+Vr(a),0)}(n.arrayValue);case 10:case 11:return function(o){let r=0;return Jt(o.fields,(a,s)=>{r+=a.length+Vr(s)}),r}(n.mapValue);default:throw G(13486,{value:n})}}function Bl(n,e){return{referenceValue:`projects/${n.projectId}/databases/${n.database}/documents/${e.path.canonicalString()}`}}function qs(n){return!!n&&"integerValue"in n}function gi(n){return!!n&&"arrayValue"in n}function Ul(n){return!!n&&"nullValue"in n}function zl(n){return!!n&&"doubleValue"in n&&isNaN(Number(n.doubleValue))}function Or(n){return!!n&&"mapValue"in n}function Rf(n){return(n?.mapValue?.fields||{})[ku]?.stringValue===Cu}function ko(n){if(n.geoPointValue)return{geoPointValue:{...n.geoPointValue}};if(n.timestampValue&&typeof n.timestampValue=="object")return{timestampValue:{...n.timestampValue}};if(n.mapValue){const e={mapValue:{fields:{}}};return Jt(n.mapValue.fields,(t,o)=>e.mapValue.fields[t]=ko(o)),e}if(n.arrayValue){const e={arrayValue:{values:[]}};for(let t=0;t<(n.arrayValue.values||[]).length;++t)e.arrayValue.values[t]=ko(n.arrayValue.values[t]);return e}return{...n}}function Pf(n){return(((n.mapValue||{}).fields||{}).__type__||{}).stringValue===Cf}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ke{constructor(e){this.value=e}static empty(){return new Ke({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let t=this.value;for(let o=0;o<e.length-1;++o)if(t=(t.mapValue.fields||{})[e.get(o)],!Or(t))return null;return t=(t.mapValue.fields||{})[e.lastSegment()],t||null}}set(e,t){this.getFieldsMap(e.popLast())[e.lastSegment()]=ko(t)}setAll(e){let t=Ce.emptyPath(),o={},r=[];e.forEach((s,c)=>{if(!t.isImmediateParentOf(c)){const l=this.getFieldsMap(t);this.applyChanges(l,o,r),o={},r=[],t=c.popLast()}s?o[c.lastSegment()]=ko(s):r.push(c.lastSegment())});const a=this.getFieldsMap(t);this.applyChanges(a,o,r)}delete(e){const t=this.field(e.popLast());Or(t)&&t.mapValue.fields&&delete t.mapValue.fields[e.lastSegment()]}isEqual(e){return ut(this.value,e.value)}getFieldsMap(e){let t=this.value;t.mapValue.fields||(t.mapValue={fields:{}});for(let o=0;o<e.length;++o){let r=t.mapValue.fields[e.get(o)];Or(r)&&r.mapValue.fields||(r={mapValue:{fields:{}}},t.mapValue.fields[e.get(o)]=r),t=r}return t.mapValue.fields}applyChanges(e,t,o){Jt(t,(r,a)=>e[r]=a);for(const r of o)delete e[r]}clone(){return new Ke(ko(this.value))}}function Ru(n){const e=[];return Jt(n.fields,(t,o)=>{const r=new Ce([t]);if(Or(o)){const a=Ru(o.mapValue).fields;if(a.length===0)e.push(r);else for(const s of a)e.push(r.child(s))}else e.push(r)}),new Je(e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Be{constructor(e,t,o,r,a,s,c){this.key=e,this.documentType=t,this.version=o,this.readTime=r,this.createTime=a,this.data=s,this.documentState=c}static newInvalidDocument(e){return new Be(e,0,K.min(),K.min(),K.min(),Ke.empty(),0)}static newFoundDocument(e,t,o,r){return new Be(e,1,t,K.min(),o,r,0)}static newNoDocument(e,t){return new Be(e,2,t,K.min(),K.min(),Ke.empty(),0)}static newUnknownDocument(e,t){return new Be(e,3,t,K.min(),K.min(),Ke.empty(),2)}convertToFoundDocument(e,t){return!this.createTime.isEqual(K.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=e),this.version=e,this.documentType=1,this.data=t,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=Ke.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=Ke.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=K.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof Be&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new Be(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qr{constructor(e,t){this.position=e,this.inclusive=t}}function ql(n,e,t){let o=0;for(let r=0;r<n.position.length;r++){const a=e[r],s=n.position[r];if(a.field.isKeyField()?o=j.comparator(j.fromName(s.referenceValue),t.key):o=jn(s,t.data.field(a.field)),a.dir==="desc"&&(o*=-1),o!==0)break}return o}function jl(n,e){if(n===null)return e===null;if(e===null||n.inclusive!==e.inclusive||n.position.length!==e.position.length)return!1;for(let t=0;t<n.position.length;t++)if(!ut(n.position[t],e.position[t]))return!1;return!0}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jo{constructor(e,t="asc"){this.field=e,this.dir=t}}function Df(n,e){return n.dir===e.dir&&n.field.isEqual(e.field)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pu{}class _e extends Pu{constructor(e,t,o){super(),this.field=e,this.op=t,this.value=o}static create(e,t,o){return e.isKeyField()?t==="in"||t==="not-in"?this.createKeyFieldInFilter(e,t,o):new Nf(e,t,o):t==="array-contains"?new Ff(e,o):t==="in"?new Vf(e,o):t==="not-in"?new Of(e,o):t==="array-contains-any"?new Bf(e,o):new _e(e,t,o)}static createKeyFieldInFilter(e,t,o){return t==="in"?new $f(e,o):new Lf(e,o)}matches(e){const t=e.data.field(this.field);return this.op==="!="?t!==null&&t.nullValue===void 0&&this.matchesComparison(jn(t,this.value)):t!==null&&Wt(this.value)===Wt(t)&&this.matchesComparison(jn(t,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return G(47266,{operator:this.op})}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class at extends Pu{constructor(e,t){super(),this.filters=e,this.op=t,this.Pe=null}static create(e,t){return new at(e,t)}matches(e){return Du(this)?this.filters.find(t=>!t.matches(e))===void 0:this.filters.find(t=>t.matches(e))!==void 0}getFlattenedFilters(){return this.Pe!==null||(this.Pe=this.filters.reduce((e,t)=>e.concat(t.getFlattenedFilters()),[])),this.Pe}getFilters(){return Object.assign([],this.filters)}}function Du(n){return n.op==="and"}function Mu(n){return Mf(n)&&Du(n)}function Mf(n){for(const e of n.filters)if(e instanceof at)return!1;return!0}function js(n){if(n instanceof _e)return n.field.canonicalString()+n.op.toString()+Hn(n.value);if(Mu(n))return n.filters.map(e=>js(e)).join(",");{const e=n.filters.map(t=>js(t)).join(",");return`${n.op}(${e})`}}function Nu(n,e){return n instanceof _e?function(o,r){return r instanceof _e&&o.op===r.op&&o.field.isEqual(r.field)&&ut(o.value,r.value)}(n,e):n instanceof at?function(o,r){return r instanceof at&&o.op===r.op&&o.filters.length===r.filters.length?o.filters.reduce((a,s,c)=>a&&Nu(s,r.filters[c]),!0):!1}(n,e):void G(19439)}function $u(n){return n instanceof _e?function(t){return`${t.field.canonicalString()} ${t.op} ${Hn(t.value)}`}(n):n instanceof at?function(t){return t.op.toString()+" {"+t.getFilters().map($u).join(" ,")+"}"}(n):"Filter"}class Nf extends _e{constructor(e,t,o){super(e,t,o),this.key=j.fromName(o.referenceValue)}matches(e){const t=j.comparator(e.key,this.key);return this.matchesComparison(t)}}class $f extends _e{constructor(e,t){super(e,"in",t),this.keys=Lu("in",t)}matches(e){return this.keys.some(t=>t.isEqual(e.key))}}class Lf extends _e{constructor(e,t){super(e,"not-in",t),this.keys=Lu("not-in",t)}matches(e){return!this.keys.some(t=>t.isEqual(e.key))}}function Lu(n,e){return(e.arrayValue?.values||[]).map(t=>j.fromName(t.referenceValue))}class Ff extends _e{constructor(e,t){super(e,"array-contains",t)}matches(e){const t=e.data.field(this.field);return gi(t)&&qo(t.arrayValue,this.value)}}class Vf extends _e{constructor(e,t){super(e,"in",t)}matches(e){const t=e.data.field(this.field);return t!==null&&qo(this.value.arrayValue,t)}}class Of extends _e{constructor(e,t){super(e,"not-in",t)}matches(e){if(qo(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const t=e.data.field(this.field);return t!==null&&t.nullValue===void 0&&!qo(this.value.arrayValue,t)}}class Bf extends _e{constructor(e,t){super(e,"array-contains-any",t)}matches(e){const t=e.data.field(this.field);return!(!gi(t)||!t.arrayValue.values)&&t.arrayValue.values.some(o=>qo(this.value.arrayValue,o))}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Uf{constructor(e,t=null,o=[],r=[],a=null,s=null,c=null){this.path=e,this.collectionGroup=t,this.orderBy=o,this.filters=r,this.limit=a,this.startAt=s,this.endAt=c,this.Te=null}}function Hl(n,e=null,t=[],o=[],r=null,a=null,s=null){return new Uf(n,e,t,o,r,a,s)}function mi(n){const e=Y(n);if(e.Te===null){let t=e.path.canonicalString();e.collectionGroup!==null&&(t+="|cg:"+e.collectionGroup),t+="|f:",t+=e.filters.map(o=>js(o)).join(","),t+="|ob:",t+=e.orderBy.map(o=>function(a){return a.field.canonicalString()+a.dir}(o)).join(","),va(e.limit)||(t+="|l:",t+=e.limit),e.startAt&&(t+="|lb:",t+=e.startAt.inclusive?"b:":"a:",t+=e.startAt.position.map(o=>Hn(o)).join(",")),e.endAt&&(t+="|ub:",t+=e.endAt.inclusive?"a:":"b:",t+=e.endAt.position.map(o=>Hn(o)).join(",")),e.Te=t}return e.Te}function fi(n,e){if(n.limit!==e.limit||n.orderBy.length!==e.orderBy.length)return!1;for(let t=0;t<n.orderBy.length;t++)if(!Df(n.orderBy[t],e.orderBy[t]))return!1;if(n.filters.length!==e.filters.length)return!1;for(let t=0;t<n.filters.length;t++)if(!Nu(n.filters[t],e.filters[t]))return!1;return n.collectionGroup===e.collectionGroup&&!!n.path.isEqual(e.path)&&!!jl(n.startAt,e.startAt)&&jl(n.endAt,e.endAt)}function Hs(n){return j.isDocumentKey(n.path)&&n.collectionGroup===null&&n.filters.length===0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class no{constructor(e,t=null,o=[],r=[],a=null,s="F",c=null,l=null){this.path=e,this.collectionGroup=t,this.explicitOrderBy=o,this.filters=r,this.limit=a,this.limitType=s,this.startAt=c,this.endAt=l,this.Ie=null,this.Ee=null,this.de=null,this.startAt,this.endAt}}function zf(n,e,t,o,r,a,s,c){return new no(n,e,t,o,r,a,s,c)}function ba(n){return new no(n)}function Gl(n){return n.filters.length===0&&n.limit===null&&n.startAt==null&&n.endAt==null&&(n.explicitOrderBy.length===0||n.explicitOrderBy.length===1&&n.explicitOrderBy[0].field.isKeyField())}function Fu(n){return n.collectionGroup!==null}function Co(n){const e=Y(n);if(e.Ie===null){e.Ie=[];const t=new Set;for(const a of e.explicitOrderBy)e.Ie.push(a),t.add(a.field.canonicalString());const o=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(function(s){let c=new Se(Ce.comparator);return s.filters.forEach(l=>{l.getFlattenedFilters().forEach(d=>{d.isInequality()&&(c=c.add(d.field))})}),c})(e).forEach(a=>{t.has(a.canonicalString())||a.isKeyField()||e.Ie.push(new jo(a,o))}),t.has(Ce.keyField().canonicalString())||e.Ie.push(new jo(Ce.keyField(),o))}return e.Ie}function ct(n){const e=Y(n);return e.Ee||(e.Ee=qf(e,Co(n))),e.Ee}function qf(n,e){if(n.limitType==="F")return Hl(n.path,n.collectionGroup,e,n.filters,n.limit,n.startAt,n.endAt);{e=e.map(r=>{const a=r.dir==="desc"?"asc":"desc";return new jo(r.field,a)});const t=n.endAt?new Qr(n.endAt.position,n.endAt.inclusive):null,o=n.startAt?new Qr(n.startAt.position,n.startAt.inclusive):null;return Hl(n.path,n.collectionGroup,e,n.filters,n.limit,t,o)}}function Gs(n,e){const t=n.filters.concat([e]);return new no(n.path,n.collectionGroup,n.explicitOrderBy.slice(),t,n.limit,n.limitType,n.startAt,n.endAt)}function Jr(n,e,t){return new no(n.path,n.collectionGroup,n.explicitOrderBy.slice(),n.filters.slice(),e,t,n.startAt,n.endAt)}function Ea(n,e){return fi(ct(n),ct(e))&&n.limitType===e.limitType}function Vu(n){return`${mi(ct(n))}|lt:${n.limitType}`}function Mn(n){return`Query(target=${function(t){let o=t.path.canonicalString();return t.collectionGroup!==null&&(o+=" collectionGroup="+t.collectionGroup),t.filters.length>0&&(o+=`, filters: [${t.filters.map(r=>$u(r)).join(", ")}]`),va(t.limit)||(o+=", limit: "+t.limit),t.orderBy.length>0&&(o+=`, orderBy: [${t.orderBy.map(r=>function(s){return`${s.field.canonicalString()} (${s.dir})`}(r)).join(", ")}]`),t.startAt&&(o+=", startAt: ",o+=t.startAt.inclusive?"b:":"a:",o+=t.startAt.position.map(r=>Hn(r)).join(",")),t.endAt&&(o+=", endAt: ",o+=t.endAt.inclusive?"a:":"b:",o+=t.endAt.position.map(r=>Hn(r)).join(",")),`Target(${o})`}(ct(n))}; limitType=${n.limitType})`}function _a(n,e){return e.isFoundDocument()&&function(o,r){const a=r.key.path;return o.collectionGroup!==null?r.key.hasCollectionId(o.collectionGroup)&&o.path.isPrefixOf(a):j.isDocumentKey(o.path)?o.path.isEqual(a):o.path.isImmediateParentOf(a)}(n,e)&&function(o,r){for(const a of Co(o))if(!a.field.isKeyField()&&r.data.field(a.field)===null)return!1;return!0}(n,e)&&function(o,r){for(const a of o.filters)if(!a.matches(r))return!1;return!0}(n,e)&&function(o,r){return!(o.startAt&&!function(s,c,l){const d=ql(s,c,l);return s.inclusive?d<=0:d<0}(o.startAt,Co(o),r)||o.endAt&&!function(s,c,l){const d=ql(s,c,l);return s.inclusive?d>=0:d>0}(o.endAt,Co(o),r))}(n,e)}function jf(n){return n.collectionGroup||(n.path.length%2==1?n.path.lastSegment():n.path.get(n.path.length-2))}function Ou(n){return(e,t)=>{let o=!1;for(const r of Co(n)){const a=Hf(r,e,t);if(a!==0)return a;o=o||r.field.isKeyField()}return 0}}function Hf(n,e,t){const o=n.field.isKeyField()?j.comparator(e.key,t.key):function(a,s,c){const l=s.data.field(a),d=c.data.field(a);return l!==null&&d!==null?jn(l,d):G(42886)}(n.field,e,t);switch(n.dir){case"asc":return o;case"desc":return-1*o;default:return G(19790,{direction:n.dir})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bn{constructor(e,t){this.mapKeyFn=e,this.equalsFn=t,this.inner={},this.innerSize=0}get(e){const t=this.mapKeyFn(e),o=this.inner[t];if(o!==void 0){for(const[r,a]of o)if(this.equalsFn(r,e))return a}}has(e){return this.get(e)!==void 0}set(e,t){const o=this.mapKeyFn(e),r=this.inner[o];if(r===void 0)return this.inner[o]=[[e,t]],void this.innerSize++;for(let a=0;a<r.length;a++)if(this.equalsFn(r[a][0],e))return void(r[a]=[e,t]);r.push([e,t]),this.innerSize++}delete(e){const t=this.mapKeyFn(e),o=this.inner[t];if(o===void 0)return!1;for(let r=0;r<o.length;r++)if(this.equalsFn(o[r][0],e))return o.length===1?delete this.inner[t]:o.splice(r,1),this.innerSize--,!0;return!1}forEach(e){Jt(this.inner,(t,o)=>{for(const[r,a]of o)e(r,a)})}isEmpty(){return _u(this.inner)}size(){return this.innerSize}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Gf=new ve(j.comparator);function It(){return Gf}const Bu=new ve(j.comparator);function So(...n){let e=Bu;for(const t of n)e=e.insert(t.key,t);return e}function Uu(n){let e=Bu;return n.forEach((t,o)=>e=e.insert(t,o.overlayedDocument)),e}function cn(){return Ro()}function zu(){return Ro()}function Ro(){return new bn(n=>n.toString(),(n,e)=>n.isEqual(e))}const Wf=new ve(j.comparator),Kf=new Se(j.comparator);function te(...n){let e=Kf;for(const t of n)e=e.add(t);return e}const Yf=new Se(ee);function Xf(){return Yf}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function wi(n,e){if(n.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:Kr(e)?"-0":e}}function qu(n){return{integerValue:""+n}}function Qf(n,e){return Tf(e)?qu(e):wi(n,e)}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xa{constructor(){this._=void 0}}function Jf(n,e,t){return n instanceof Ho?function(r,a){const s={fields:{[Su]:{stringValue:Tu},[Au]:{timestampValue:{seconds:r.seconds,nanos:r.nanoseconds}}}};return a&&pi(a)&&(a=ya(a)),a&&(s.fields[Iu]=a),{mapValue:s}}(t,e):n instanceof Gn?Hu(n,e):n instanceof Wn?Gu(n,e):function(r,a){const s=ju(r,a),c=Wl(s)+Wl(r.Ae);return qs(s)&&qs(r.Ae)?qu(c):wi(r.serializer,c)}(n,e)}function Zf(n,e,t){return n instanceof Gn?Hu(n,e):n instanceof Wn?Gu(n,e):t}function ju(n,e){return n instanceof Zr?function(o){return qs(o)||function(a){return!!a&&"doubleValue"in a}(o)}(e)?e:{integerValue:0}:null}class Ho extends xa{}class Gn extends xa{constructor(e){super(),this.elements=e}}function Hu(n,e){const t=Wu(e);for(const o of n.elements)t.some(r=>ut(r,o))||t.push(o);return{arrayValue:{values:t}}}class Wn extends xa{constructor(e){super(),this.elements=e}}function Gu(n,e){let t=Wu(e);for(const o of n.elements)t=t.filter(r=>!ut(r,o));return{arrayValue:{values:t}}}class Zr extends xa{constructor(e,t){super(),this.serializer=e,this.Ae=t}}function Wl(n){return be(n.integerValue||n.doubleValue)}function Wu(n){return gi(n)&&n.arrayValue.values?n.arrayValue.values.slice():[]}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vi{constructor(e,t){this.field=e,this.transform=t}}function ew(n,e){return n.field.isEqual(e.field)&&function(o,r){return o instanceof Gn&&r instanceof Gn||o instanceof Wn&&r instanceof Wn?zn(o.elements,r.elements,ut):o instanceof Zr&&r instanceof Zr?ut(o.Ae,r.Ae):o instanceof Ho&&r instanceof Ho}(n.transform,e.transform)}class tw{constructor(e,t){this.version=e,this.transformResults=t}}class Ge{constructor(e,t){this.updateTime=e,this.exists=t}static none(){return new Ge}static exists(e){return new Ge(void 0,e)}static updateTime(e){return new Ge(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function Br(n,e){return n.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(n.updateTime):n.exists===void 0||n.exists===e.isFoundDocument()}class Ta{}function Ku(n,e){if(!n.hasLocalMutations||e&&e.fields.length===0)return null;if(e===null)return n.isNoDocument()?new Sa(n.key,Ge.none()):new tr(n.key,n.data,Ge.none());{const t=n.data,o=Ke.empty();let r=new Se(Ce.comparator);for(let a of e.fields)if(!r.has(a)){let s=t.field(a);s===null&&a.length>1&&(a=a.popLast(),s=t.field(a)),s===null?o.delete(a):o.set(a,s),r=r.add(a)}return new Zt(n.key,o,new Je(r.toArray()),Ge.none())}}function nw(n,e,t){n instanceof tr?function(r,a,s){const c=r.value.clone(),l=Yl(r.fieldTransforms,a,s.transformResults);c.setAll(l),a.convertToFoundDocument(s.version,c).setHasCommittedMutations()}(n,e,t):n instanceof Zt?function(r,a,s){if(!Br(r.precondition,a))return void a.convertToUnknownDocument(s.version);const c=Yl(r.fieldTransforms,a,s.transformResults),l=a.data;l.setAll(Yu(r)),l.setAll(c),a.convertToFoundDocument(s.version,l).setHasCommittedMutations()}(n,e,t):function(r,a,s){a.convertToNoDocument(s.version).setHasCommittedMutations()}(0,e,t)}function Po(n,e,t,o){return n instanceof tr?function(a,s,c,l){if(!Br(a.precondition,s))return c;const d=a.value.clone(),h=Xl(a.fieldTransforms,l,s);return d.setAll(h),s.convertToFoundDocument(s.version,d).setHasLocalMutations(),null}(n,e,t,o):n instanceof Zt?function(a,s,c,l){if(!Br(a.precondition,s))return c;const d=Xl(a.fieldTransforms,l,s),h=s.data;return h.setAll(Yu(a)),h.setAll(d),s.convertToFoundDocument(s.version,h).setHasLocalMutations(),c===null?null:c.unionWith(a.fieldMask.fields).unionWith(a.fieldTransforms.map(g=>g.field))}(n,e,t,o):function(a,s,c){return Br(a.precondition,s)?(s.convertToNoDocument(s.version).setHasLocalMutations(),null):c}(n,e,t)}function ow(n,e){let t=null;for(const o of n.fieldTransforms){const r=e.data.field(o.field),a=ju(o.transform,r||null);a!=null&&(t===null&&(t=Ke.empty()),t.set(o.field,a))}return t||null}function Kl(n,e){return n.type===e.type&&!!n.key.isEqual(e.key)&&!!n.precondition.isEqual(e.precondition)&&!!function(o,r){return o===void 0&&r===void 0||!(!o||!r)&&zn(o,r,(a,s)=>ew(a,s))}(n.fieldTransforms,e.fieldTransforms)&&(n.type===0?n.value.isEqual(e.value):n.type!==1||n.data.isEqual(e.data)&&n.fieldMask.isEqual(e.fieldMask))}class tr extends Ta{constructor(e,t,o,r=[]){super(),this.key=e,this.value=t,this.precondition=o,this.fieldTransforms=r,this.type=0}getFieldMask(){return null}}class Zt extends Ta{constructor(e,t,o,r,a=[]){super(),this.key=e,this.data=t,this.fieldMask=o,this.precondition=r,this.fieldTransforms=a,this.type=1}getFieldMask(){return this.fieldMask}}function Yu(n){const e=new Map;return n.fieldMask.fields.forEach(t=>{if(!t.isEmpty()){const o=n.data.field(t);e.set(t,o)}}),e}function Yl(n,e,t){const o=new Map;se(n.length===t.length,32656,{Re:t.length,Ve:n.length});for(let r=0;r<t.length;r++){const a=n[r],s=a.transform,c=e.data.field(a.field);o.set(a.field,Zf(s,c,t[r]))}return o}function Xl(n,e,t){const o=new Map;for(const r of n){const a=r.transform,s=t.data.field(r.field);o.set(r.field,Jf(a,s,e))}return o}class Sa extends Ta{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class rw extends Ta{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class aw{constructor(e,t,o,r){this.batchId=e,this.localWriteTime=t,this.baseMutations=o,this.mutations=r}applyToRemoteDocument(e,t){const o=t.mutationResults;for(let r=0;r<this.mutations.length;r++){const a=this.mutations[r];a.key.isEqual(e.key)&&nw(a,e,o[r])}}applyToLocalView(e,t){for(const o of this.baseMutations)o.key.isEqual(e.key)&&(t=Po(o,e,t,this.localWriteTime));for(const o of this.mutations)o.key.isEqual(e.key)&&(t=Po(o,e,t,this.localWriteTime));return t}applyToLocalDocumentSet(e,t){const o=zu();return this.mutations.forEach(r=>{const a=e.get(r.key),s=a.overlayedDocument;let c=this.applyToLocalView(s,a.mutatedFields);c=t.has(r.key)?null:c;const l=Ku(s,c);l!==null&&o.set(r.key,l),s.isValidDocument()||s.convertToNoDocument(K.min())}),o}keys(){return this.mutations.reduce((e,t)=>e.add(t.key),te())}isEqual(e){return this.batchId===e.batchId&&zn(this.mutations,e.mutations,(t,o)=>Kl(t,o))&&zn(this.baseMutations,e.baseMutations,(t,o)=>Kl(t,o))}}class yi{constructor(e,t,o,r){this.batch=e,this.commitVersion=t,this.mutationResults=o,this.docVersions=r}static from(e,t,o){se(e.mutations.length===o.length,58842,{me:e.mutations.length,fe:o.length});let r=function(){return Wf}();const a=e.mutations;for(let s=0;s<a.length;s++)r=r.insert(a[s].key,o[s].version);return new yi(e,t,o,r)}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sw{constructor(e,t){this.largestBatchId=e,this.mutation=t}getKey(){return this.mutation.key}isEqual(e){return e!==null&&this.mutation===e.mutation}toString(){return`Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class iw{constructor(e,t){this.count=e,this.unchangedNames=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Ee,re;function cw(n){switch(n){case M.OK:return G(64938);case M.CANCELLED:case M.UNKNOWN:case M.DEADLINE_EXCEEDED:case M.RESOURCE_EXHAUSTED:case M.INTERNAL:case M.UNAVAILABLE:case M.UNAUTHENTICATED:return!1;case M.INVALID_ARGUMENT:case M.NOT_FOUND:case M.ALREADY_EXISTS:case M.PERMISSION_DENIED:case M.FAILED_PRECONDITION:case M.ABORTED:case M.OUT_OF_RANGE:case M.UNIMPLEMENTED:case M.DATA_LOSS:return!0;default:return G(15467,{code:n})}}function Xu(n){if(n===void 0)return St("GRPC error has no .code"),M.UNKNOWN;switch(n){case Ee.OK:return M.OK;case Ee.CANCELLED:return M.CANCELLED;case Ee.UNKNOWN:return M.UNKNOWN;case Ee.DEADLINE_EXCEEDED:return M.DEADLINE_EXCEEDED;case Ee.RESOURCE_EXHAUSTED:return M.RESOURCE_EXHAUSTED;case Ee.INTERNAL:return M.INTERNAL;case Ee.UNAVAILABLE:return M.UNAVAILABLE;case Ee.UNAUTHENTICATED:return M.UNAUTHENTICATED;case Ee.INVALID_ARGUMENT:return M.INVALID_ARGUMENT;case Ee.NOT_FOUND:return M.NOT_FOUND;case Ee.ALREADY_EXISTS:return M.ALREADY_EXISTS;case Ee.PERMISSION_DENIED:return M.PERMISSION_DENIED;case Ee.FAILED_PRECONDITION:return M.FAILED_PRECONDITION;case Ee.ABORTED:return M.ABORTED;case Ee.OUT_OF_RANGE:return M.OUT_OF_RANGE;case Ee.UNIMPLEMENTED:return M.UNIMPLEMENTED;case Ee.DATA_LOSS:return M.DATA_LOSS;default:return G(39323,{code:n})}}(re=Ee||(Ee={}))[re.OK=0]="OK",re[re.CANCELLED=1]="CANCELLED",re[re.UNKNOWN=2]="UNKNOWN",re[re.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",re[re.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",re[re.NOT_FOUND=5]="NOT_FOUND",re[re.ALREADY_EXISTS=6]="ALREADY_EXISTS",re[re.PERMISSION_DENIED=7]="PERMISSION_DENIED",re[re.UNAUTHENTICATED=16]="UNAUTHENTICATED",re[re.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",re[re.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",re[re.ABORTED=10]="ABORTED",re[re.OUT_OF_RANGE=11]="OUT_OF_RANGE",re[re.UNIMPLEMENTED=12]="UNIMPLEMENTED",re[re.INTERNAL=13]="INTERNAL",re[re.UNAVAILABLE=14]="UNAVAILABLE",re[re.DATA_LOSS=15]="DATA_LOSS";/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function lw(){return new TextEncoder}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const dw=new Bt([4294967295,4294967295],0);function Ql(n){const e=lw().encode(n),t=new lu;return t.update(e),new Uint8Array(t.digest())}function Jl(n){const e=new DataView(n.buffer),t=e.getUint32(0,!0),o=e.getUint32(4,!0),r=e.getUint32(8,!0),a=e.getUint32(12,!0);return[new Bt([t,o],0),new Bt([r,a],0)]}class bi{constructor(e,t,o){if(this.bitmap=e,this.padding=t,this.hashCount=o,t<0||t>=8)throw new Io(`Invalid padding: ${t}`);if(o<0)throw new Io(`Invalid hash count: ${o}`);if(e.length>0&&this.hashCount===0)throw new Io(`Invalid hash count: ${o}`);if(e.length===0&&t!==0)throw new Io(`Invalid padding when bitmap length is 0: ${t}`);this.ge=8*e.length-t,this.pe=Bt.fromNumber(this.ge)}ye(e,t,o){let r=e.add(t.multiply(Bt.fromNumber(o)));return r.compare(dw)===1&&(r=new Bt([r.getBits(0),r.getBits(1)],0)),r.modulo(this.pe).toNumber()}we(e){return!!(this.bitmap[Math.floor(e/8)]&1<<e%8)}mightContain(e){if(this.ge===0)return!1;const t=Ql(e),[o,r]=Jl(t);for(let a=0;a<this.hashCount;a++){const s=this.ye(o,r,a);if(!this.we(s))return!1}return!0}static create(e,t,o){const r=e%8==0?0:8-e%8,a=new Uint8Array(Math.ceil(e/8)),s=new bi(a,r,t);return o.forEach(c=>s.insert(c)),s}insert(e){if(this.ge===0)return;const t=Ql(e),[o,r]=Jl(t);for(let a=0;a<this.hashCount;a++){const s=this.ye(o,r,a);this.Se(s)}}Se(e){const t=Math.floor(e/8),o=e%8;this.bitmap[t]|=1<<o}}class Io extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ia{constructor(e,t,o,r,a){this.snapshotVersion=e,this.targetChanges=t,this.targetMismatches=o,this.documentUpdates=r,this.resolvedLimboDocuments=a}static createSynthesizedRemoteEventForCurrentChange(e,t,o){const r=new Map;return r.set(e,nr.createSynthesizedTargetChangeForCurrentChange(e,t,o)),new Ia(K.min(),r,new ve(ee),It(),te())}}class nr{constructor(e,t,o,r,a){this.resumeToken=e,this.current=t,this.addedDocuments=o,this.modifiedDocuments=r,this.removedDocuments=a}static createSynthesizedTargetChangeForCurrentChange(e,t,o){return new nr(o,t,te(),te(),te())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ur{constructor(e,t,o,r){this.be=e,this.removedTargetIds=t,this.key=o,this.De=r}}class Qu{constructor(e,t){this.targetId=e,this.Ce=t}}class Ju{constructor(e,t,o=Re.EMPTY_BYTE_STRING,r=null){this.state=e,this.targetIds=t,this.resumeToken=o,this.cause=r}}class Zl{constructor(){this.ve=0,this.Fe=ed(),this.Me=Re.EMPTY_BYTE_STRING,this.xe=!1,this.Oe=!0}get current(){return this.xe}get resumeToken(){return this.Me}get Ne(){return this.ve!==0}get Be(){return this.Oe}Le(e){e.approximateByteSize()>0&&(this.Oe=!0,this.Me=e)}ke(){let e=te(),t=te(),o=te();return this.Fe.forEach((r,a)=>{switch(a){case 0:e=e.add(r);break;case 2:t=t.add(r);break;case 1:o=o.add(r);break;default:G(38017,{changeType:a})}}),new nr(this.Me,this.xe,e,t,o)}qe(){this.Oe=!1,this.Fe=ed()}Qe(e,t){this.Oe=!0,this.Fe=this.Fe.insert(e,t)}$e(e){this.Oe=!0,this.Fe=this.Fe.remove(e)}Ue(){this.ve+=1}Ke(){this.ve-=1,se(this.ve>=0,3241,{ve:this.ve})}We(){this.Oe=!0,this.xe=!0}}class uw{constructor(e){this.Ge=e,this.ze=new Map,this.je=It(),this.Je=Nr(),this.He=Nr(),this.Ye=new ve(ee)}Ze(e){for(const t of e.be)e.De&&e.De.isFoundDocument()?this.Xe(t,e.De):this.et(t,e.key,e.De);for(const t of e.removedTargetIds)this.et(t,e.key,e.De)}tt(e){this.forEachTarget(e,t=>{const o=this.nt(t);switch(e.state){case 0:this.rt(t)&&o.Le(e.resumeToken);break;case 1:o.Ke(),o.Ne||o.qe(),o.Le(e.resumeToken);break;case 2:o.Ke(),o.Ne||this.removeTarget(t);break;case 3:this.rt(t)&&(o.We(),o.Le(e.resumeToken));break;case 4:this.rt(t)&&(this.it(t),o.Le(e.resumeToken));break;default:G(56790,{state:e.state})}})}forEachTarget(e,t){e.targetIds.length>0?e.targetIds.forEach(t):this.ze.forEach((o,r)=>{this.rt(r)&&t(r)})}st(e){const t=e.targetId,o=e.Ce.count,r=this.ot(t);if(r){const a=r.target;if(Hs(a))if(o===0){const s=new j(a.path);this.et(t,s,Be.newNoDocument(s,K.min()))}else se(o===1,20013,{expectedCount:o});else{const s=this._t(t);if(s!==o){const c=this.ut(e),l=c?this.ct(c,e,s):1;if(l!==0){this.it(t);const d=l===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Ye=this.Ye.insert(t,d)}}}}}ut(e){const t=e.Ce.unchangedNames;if(!t||!t.bits)return null;const{bits:{bitmap:o="",padding:r=0},hashCount:a=0}=t;let s,c;try{s=Gt(o).toUint8Array()}catch(l){if(l instanceof xu)return mn("Decoding the base64 bloom filter in existence filter failed ("+l.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw l}try{c=new bi(s,r,a)}catch(l){return mn(l instanceof Io?"BloomFilter error: ":"Applying bloom filter failed: ",l),null}return c.ge===0?null:c}ct(e,t,o){return t.Ce.count===o-this.Pt(e,t.targetId)?0:2}Pt(e,t){const o=this.Ge.getRemoteKeysForTarget(t);let r=0;return o.forEach(a=>{const s=this.Ge.ht(),c=`projects/${s.projectId}/databases/${s.database}/documents/${a.path.canonicalString()}`;e.mightContain(c)||(this.et(t,a,null),r++)}),r}Tt(e){const t=new Map;this.ze.forEach((a,s)=>{const c=this.ot(s);if(c){if(a.current&&Hs(c.target)){const l=new j(c.target.path);this.It(l).has(s)||this.Et(s,l)||this.et(s,l,Be.newNoDocument(l,e))}a.Be&&(t.set(s,a.ke()),a.qe())}});let o=te();this.He.forEach((a,s)=>{let c=!0;s.forEachWhile(l=>{const d=this.ot(l);return!d||d.purpose==="TargetPurposeLimboResolution"||(c=!1,!1)}),c&&(o=o.add(a))}),this.je.forEach((a,s)=>s.setReadTime(e));const r=new Ia(e,t,this.Ye,this.je,o);return this.je=It(),this.Je=Nr(),this.He=Nr(),this.Ye=new ve(ee),r}Xe(e,t){if(!this.rt(e))return;const o=this.Et(e,t.key)?2:0;this.nt(e).Qe(t.key,o),this.je=this.je.insert(t.key,t),this.Je=this.Je.insert(t.key,this.It(t.key).add(e)),this.He=this.He.insert(t.key,this.dt(t.key).add(e))}et(e,t,o){if(!this.rt(e))return;const r=this.nt(e);this.Et(e,t)?r.Qe(t,1):r.$e(t),this.He=this.He.insert(t,this.dt(t).delete(e)),this.He=this.He.insert(t,this.dt(t).add(e)),o&&(this.je=this.je.insert(t,o))}removeTarget(e){this.ze.delete(e)}_t(e){const t=this.nt(e).ke();return this.Ge.getRemoteKeysForTarget(e).size+t.addedDocuments.size-t.removedDocuments.size}Ue(e){this.nt(e).Ue()}nt(e){let t=this.ze.get(e);return t||(t=new Zl,this.ze.set(e,t)),t}dt(e){let t=this.He.get(e);return t||(t=new Se(ee),this.He=this.He.insert(e,t)),t}It(e){let t=this.Je.get(e);return t||(t=new Se(ee),this.Je=this.Je.insert(e,t)),t}rt(e){const t=this.ot(e)!==null;return t||U("WatchChangeAggregator","Detected inactive target",e),t}ot(e){const t=this.ze.get(e);return t&&t.Ne?null:this.Ge.At(e)}it(e){this.ze.set(e,new Zl),this.Ge.getRemoteKeysForTarget(e).forEach(t=>{this.et(e,t,null)})}Et(e,t){return this.Ge.getRemoteKeysForTarget(e).has(t)}}function Nr(){return new ve(j.comparator)}function ed(){return new ve(j.comparator)}const hw={asc:"ASCENDING",desc:"DESCENDING"},pw={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},gw={and:"AND",or:"OR"};class mw{constructor(e,t){this.databaseId=e,this.useProto3Json=t}}function Ws(n,e){return n.useProto3Json||va(e)?e:{value:e}}function ea(n,e){return n.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function Zu(n,e){return n.useProto3Json?e.toBase64():e.toUint8Array()}function fw(n,e){return ea(n,e.toTimestamp())}function lt(n){return se(!!n,49232),K.fromTimestamp(function(t){const o=Ht(t);return new ue(o.seconds,o.nanos)}(n))}function Ei(n,e){return Ks(n,e).canonicalString()}function Ks(n,e){const t=function(r){return new de(["projects",r.projectId,"databases",r.database])}(n).child("documents");return e===void 0?t:t.child(e)}function eh(n){const e=de.fromString(n);return se(ah(e),10190,{key:e.toString()}),e}function Ys(n,e){return Ei(n.databaseId,e.path)}function Is(n,e){const t=eh(e);if(t.get(1)!==n.databaseId.projectId)throw new V(M.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+t.get(1)+" vs "+n.databaseId.projectId);if(t.get(3)!==n.databaseId.database)throw new V(M.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+t.get(3)+" vs "+n.databaseId.database);return new j(nh(t))}function th(n,e){return Ei(n.databaseId,e)}function ww(n){const e=eh(n);return e.length===4?de.emptyPath():nh(e)}function Xs(n){return new de(["projects",n.databaseId.projectId,"databases",n.databaseId.database]).canonicalString()}function nh(n){return se(n.length>4&&n.get(4)==="documents",29091,{key:n.toString()}),n.popFirst(5)}function td(n,e,t){return{name:Ys(n,e),fields:t.value.mapValue.fields}}function vw(n,e){let t;if("targetChange"in e){e.targetChange;const o=function(d){return d==="NO_CHANGE"?0:d==="ADD"?1:d==="REMOVE"?2:d==="CURRENT"?3:d==="RESET"?4:G(39313,{state:d})}(e.targetChange.targetChangeType||"NO_CHANGE"),r=e.targetChange.targetIds||[],a=function(d,h){return d.useProto3Json?(se(h===void 0||typeof h=="string",58123),Re.fromBase64String(h||"")):(se(h===void 0||h instanceof Buffer||h instanceof Uint8Array,16193),Re.fromUint8Array(h||new Uint8Array))}(n,e.targetChange.resumeToken),s=e.targetChange.cause,c=s&&function(d){const h=d.code===void 0?M.UNKNOWN:Xu(d.code);return new V(h,d.message||"")}(s);t=new Ju(o,r,a,c||null)}else if("documentChange"in e){e.documentChange;const o=e.documentChange;o.document,o.document.name,o.document.updateTime;const r=Is(n,o.document.name),a=lt(o.document.updateTime),s=o.document.createTime?lt(o.document.createTime):K.min(),c=new Ke({mapValue:{fields:o.document.fields}}),l=Be.newFoundDocument(r,a,s,c),d=o.targetIds||[],h=o.removedTargetIds||[];t=new Ur(d,h,l.key,l)}else if("documentDelete"in e){e.documentDelete;const o=e.documentDelete;o.document;const r=Is(n,o.document),a=o.readTime?lt(o.readTime):K.min(),s=Be.newNoDocument(r,a),c=o.removedTargetIds||[];t=new Ur([],c,s.key,s)}else if("documentRemove"in e){e.documentRemove;const o=e.documentRemove;o.document;const r=Is(n,o.document),a=o.removedTargetIds||[];t=new Ur([],a,r,null)}else{if(!("filter"in e))return G(11601,{Rt:e});{e.filter;const o=e.filter;o.targetId;const{count:r=0,unchangedNames:a}=o,s=new iw(r,a),c=o.targetId;t=new Qu(c,s)}}return t}function yw(n,e){let t;if(e instanceof tr)t={update:td(n,e.key,e.value)};else if(e instanceof Sa)t={delete:Ys(n,e.key)};else if(e instanceof Zt)t={update:td(n,e.key,e.data),updateMask:kw(e.fieldMask)};else{if(!(e instanceof rw))return G(16599,{Vt:e.type});t={verify:Ys(n,e.key)}}return e.fieldTransforms.length>0&&(t.updateTransforms=e.fieldTransforms.map(o=>function(a,s){const c=s.transform;if(c instanceof Ho)return{fieldPath:s.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(c instanceof Gn)return{fieldPath:s.field.canonicalString(),appendMissingElements:{values:c.elements}};if(c instanceof Wn)return{fieldPath:s.field.canonicalString(),removeAllFromArray:{values:c.elements}};if(c instanceof Zr)return{fieldPath:s.field.canonicalString(),increment:c.Ae};throw G(20930,{transform:s.transform})}(0,o))),e.precondition.isNone||(t.currentDocument=function(r,a){return a.updateTime!==void 0?{updateTime:fw(r,a.updateTime)}:a.exists!==void 0?{exists:a.exists}:G(27497)}(n,e.precondition)),t}function bw(n,e){return n&&n.length>0?(se(e!==void 0,14353),n.map(t=>function(r,a){let s=r.updateTime?lt(r.updateTime):lt(a);return s.isEqual(K.min())&&(s=lt(a)),new tw(s,r.transformResults||[])}(t,e))):[]}function Ew(n,e){return{documents:[th(n,e.path)]}}function _w(n,e){const t={structuredQuery:{}},o=e.path;let r;e.collectionGroup!==null?(r=o,t.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(r=o.popLast(),t.structuredQuery.from=[{collectionId:o.lastSegment()}]),t.parent=th(n,r);const a=function(d){if(d.length!==0)return rh(at.create(d,"and"))}(e.filters);a&&(t.structuredQuery.where=a);const s=function(d){if(d.length!==0)return d.map(h=>function(m){return{field:Nn(m.field),direction:Sw(m.dir)}}(h))}(e.orderBy);s&&(t.structuredQuery.orderBy=s);const c=Ws(n,e.limit);return c!==null&&(t.structuredQuery.limit=c),e.startAt&&(t.structuredQuery.startAt=function(d){return{before:d.inclusive,values:d.position}}(e.startAt)),e.endAt&&(t.structuredQuery.endAt=function(d){return{before:!d.inclusive,values:d.position}}(e.endAt)),{ft:t,parent:r}}function xw(n){let e=ww(n.parent);const t=n.structuredQuery,o=t.from?t.from.length:0;let r=null;if(o>0){se(o===1,65062);const h=t.from[0];h.allDescendants?r=h.collectionId:e=e.child(h.collectionId)}let a=[];t.where&&(a=function(g){const m=oh(g);return m instanceof at&&Mu(m)?m.getFilters():[m]}(t.where));let s=[];t.orderBy&&(s=function(g){return g.map(m=>function(v){return new jo($n(v.field),function(T){switch(T){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(v.direction))}(m))}(t.orderBy));let c=null;t.limit&&(c=function(g){let m;return m=typeof g=="object"?g.value:g,va(m)?null:m}(t.limit));let l=null;t.startAt&&(l=function(g){const m=!!g.before,f=g.values||[];return new Qr(f,m)}(t.startAt));let d=null;return t.endAt&&(d=function(g){const m=!g.before,f=g.values||[];return new Qr(f,m)}(t.endAt)),zf(e,r,s,a,c,"F",l,d)}function Tw(n,e){const t=function(r){switch(r){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return G(28987,{purpose:r})}}(e.purpose);return t==null?null:{"goog-listen-tags":t}}function oh(n){return n.unaryFilter!==void 0?function(t){switch(t.unaryFilter.op){case"IS_NAN":const o=$n(t.unaryFilter.field);return _e.create(o,"==",{doubleValue:NaN});case"IS_NULL":const r=$n(t.unaryFilter.field);return _e.create(r,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const a=$n(t.unaryFilter.field);return _e.create(a,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const s=$n(t.unaryFilter.field);return _e.create(s,"!=",{nullValue:"NULL_VALUE"});case"OPERATOR_UNSPECIFIED":return G(61313);default:return G(60726)}}(n):n.fieldFilter!==void 0?function(t){return _e.create($n(t.fieldFilter.field),function(r){switch(r){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";case"OPERATOR_UNSPECIFIED":return G(58110);default:return G(50506)}}(t.fieldFilter.op),t.fieldFilter.value)}(n):n.compositeFilter!==void 0?function(t){return at.create(t.compositeFilter.filters.map(o=>oh(o)),function(r){switch(r){case"AND":return"and";case"OR":return"or";default:return G(1026)}}(t.compositeFilter.op))}(n):G(30097,{filter:n})}function Sw(n){return hw[n]}function Iw(n){return pw[n]}function Aw(n){return gw[n]}function Nn(n){return{fieldPath:n.canonicalString()}}function $n(n){return Ce.fromServerFormat(n.fieldPath)}function rh(n){return n instanceof _e?function(t){if(t.op==="=="){if(zl(t.value))return{unaryFilter:{field:Nn(t.field),op:"IS_NAN"}};if(Ul(t.value))return{unaryFilter:{field:Nn(t.field),op:"IS_NULL"}}}else if(t.op==="!="){if(zl(t.value))return{unaryFilter:{field:Nn(t.field),op:"IS_NOT_NAN"}};if(Ul(t.value))return{unaryFilter:{field:Nn(t.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:Nn(t.field),op:Iw(t.op),value:t.value}}}(n):n instanceof at?function(t){const o=t.getFilters().map(r=>rh(r));return o.length===1?o[0]:{compositeFilter:{op:Aw(t.op),filters:o}}}(n):G(54877,{filter:n})}function kw(n){const e=[];return n.fields.forEach(t=>e.push(t.canonicalString())),{fieldPaths:e}}function ah(n){return n.length>=4&&n.get(0)==="projects"&&n.get(2)==="databases"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Lt{constructor(e,t,o,r,a=K.min(),s=K.min(),c=Re.EMPTY_BYTE_STRING,l=null){this.target=e,this.targetId=t,this.purpose=o,this.sequenceNumber=r,this.snapshotVersion=a,this.lastLimboFreeSnapshotVersion=s,this.resumeToken=c,this.expectedCount=l}withSequenceNumber(e){return new Lt(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,t){return new Lt(this.target,this.targetId,this.purpose,this.sequenceNumber,t,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new Lt(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new Lt(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Cw{constructor(e){this.yt=e}}function Rw(n){const e=xw({parent:n.parent,structuredQuery:n.structuredQuery});return n.limitType==="LAST"?Jr(e,e.limit,"L"):e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pw{constructor(){this.Cn=new Dw}addToCollectionParentIndex(e,t){return this.Cn.add(t),$.resolve()}getCollectionParents(e,t){return $.resolve(this.Cn.getEntries(t))}addFieldIndex(e,t){return $.resolve()}deleteFieldIndex(e,t){return $.resolve()}deleteAllFieldIndexes(e){return $.resolve()}createTargetIndexes(e,t){return $.resolve()}getDocumentsMatchingTarget(e,t){return $.resolve(null)}getIndexType(e,t){return $.resolve(0)}getFieldIndexes(e,t){return $.resolve([])}getNextCollectionGroupToUpdate(e){return $.resolve(null)}getMinOffset(e,t){return $.resolve(jt.min())}getMinOffsetFromCollectionGroup(e,t){return $.resolve(jt.min())}updateCollectionGroup(e,t,o){return $.resolve()}updateIndexEntries(e,t){return $.resolve()}}class Dw{constructor(){this.index={}}add(e){const t=e.lastSegment(),o=e.popLast(),r=this.index[t]||new Se(de.comparator),a=!r.has(o);return this.index[t]=r.add(o),a}has(e){const t=e.lastSegment(),o=e.popLast(),r=this.index[t];return r&&r.has(o)}getEntries(e){return(this.index[e]||new Se(de.comparator)).toArray()}}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const nd={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0},sh=41943040;class We{static withCacheSize(e){return new We(e,We.DEFAULT_COLLECTION_PERCENTILE,We.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}constructor(e,t,o){this.cacheSizeCollectionThreshold=e,this.percentileToCollect=t,this.maximumSequenceNumbersToCollect=o}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */We.DEFAULT_COLLECTION_PERCENTILE=10,We.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,We.DEFAULT=new We(sh,We.DEFAULT_COLLECTION_PERCENTILE,We.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),We.DISABLED=new We(-1,0,0);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Kn{constructor(e){this.ar=e}next(){return this.ar+=2,this.ar}static ur(){return new Kn(0)}static cr(){return new Kn(-1)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const od="LruGarbageCollector",Mw=1048576;function rd([n,e],[t,o]){const r=ee(n,t);return r===0?ee(e,o):r}class Nw{constructor(e){this.Ir=e,this.buffer=new Se(rd),this.Er=0}dr(){return++this.Er}Ar(e){const t=[e,this.dr()];if(this.buffer.size<this.Ir)this.buffer=this.buffer.add(t);else{const o=this.buffer.last();rd(t,o)<0&&(this.buffer=this.buffer.delete(o).add(t))}}get maxValue(){return this.buffer.last()[0]}}class $w{constructor(e,t,o){this.garbageCollector=e,this.asyncQueue=t,this.localStore=o,this.Rr=null}start(){this.garbageCollector.params.cacheSizeCollectionThreshold!==-1&&this.Vr(6e4)}stop(){this.Rr&&(this.Rr.cancel(),this.Rr=null)}get started(){return this.Rr!==null}Vr(e){U(od,`Garbage collection scheduled in ${e}ms`),this.Rr=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",e,async()=>{this.Rr=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(t){to(t)?U(od,"Ignoring IndexedDB error during garbage collection: ",t):await eo(t)}await this.Vr(3e5)})}}class Lw{constructor(e,t){this.mr=e,this.params=t}calculateTargetCount(e,t){return this.mr.gr(e).next(o=>Math.floor(t/100*o))}nthSequenceNumber(e,t){if(t===0)return $.resolve(wa.ce);const o=new Nw(t);return this.mr.forEachTarget(e,r=>o.Ar(r.sequenceNumber)).next(()=>this.mr.pr(e,r=>o.Ar(r))).next(()=>o.maxValue)}removeTargets(e,t,o){return this.mr.removeTargets(e,t,o)}removeOrphanedDocuments(e,t){return this.mr.removeOrphanedDocuments(e,t)}collect(e,t){return this.params.cacheSizeCollectionThreshold===-1?(U("LruGarbageCollector","Garbage collection skipped; disabled"),$.resolve(nd)):this.getCacheSize(e).next(o=>o<this.params.cacheSizeCollectionThreshold?(U("LruGarbageCollector",`Garbage collection skipped; Cache size ${o} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),nd):this.yr(e,t))}getCacheSize(e){return this.mr.getCacheSize(e)}yr(e,t){let o,r,a,s,c,l,d;const h=Date.now();return this.calculateTargetCount(e,this.params.percentileToCollect).next(g=>(g>this.params.maximumSequenceNumbersToCollect?(U("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${g}`),r=this.params.maximumSequenceNumbersToCollect):r=g,s=Date.now(),this.nthSequenceNumber(e,r))).next(g=>(o=g,c=Date.now(),this.removeTargets(e,o,t))).next(g=>(a=g,l=Date.now(),this.removeOrphanedDocuments(e,o))).next(g=>(d=Date.now(),Dn()<=Z.DEBUG&&U("LruGarbageCollector",`LRU Garbage Collection
	Counted targets in ${s-h}ms
	Determined least recently used ${r} in `+(c-s)+`ms
	Removed ${a} targets in `+(l-c)+`ms
	Removed ${g} documents in `+(d-l)+`ms
Total Duration: ${d-h}ms`),$.resolve({didRun:!0,sequenceNumbersCollected:r,targetsRemoved:a,documentsRemoved:g})))}}function Fw(n,e){return new Lw(n,e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vw{constructor(){this.changes=new bn(e=>e.toString(),(e,t)=>e.isEqual(t)),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,t){this.assertNotApplied(),this.changes.set(e,Be.newInvalidDocument(e).setReadTime(t))}getEntry(e,t){this.assertNotApplied();const o=this.changes.get(t);return o!==void 0?$.resolve(o):this.getFromCache(e,t)}getEntries(e,t){return this.getAllFromCache(e,t)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ow{constructor(e,t){this.overlayedDocument=e,this.mutatedFields=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bw{constructor(e,t,o,r){this.remoteDocumentCache=e,this.mutationQueue=t,this.documentOverlayCache=o,this.indexManager=r}getDocument(e,t){let o=null;return this.documentOverlayCache.getOverlay(e,t).next(r=>(o=r,this.remoteDocumentCache.getEntry(e,t))).next(r=>(o!==null&&Po(o.mutation,r,Je.empty(),ue.now()),r))}getDocuments(e,t){return this.remoteDocumentCache.getEntries(e,t).next(o=>this.getLocalViewOfDocuments(e,o,te()).next(()=>o))}getLocalViewOfDocuments(e,t,o=te()){const r=cn();return this.populateOverlays(e,r,t).next(()=>this.computeViews(e,t,r,o).next(a=>{let s=So();return a.forEach((c,l)=>{s=s.insert(c,l.overlayedDocument)}),s}))}getOverlayedDocuments(e,t){const o=cn();return this.populateOverlays(e,o,t).next(()=>this.computeViews(e,t,o,te()))}populateOverlays(e,t,o){const r=[];return o.forEach(a=>{t.has(a)||r.push(a)}),this.documentOverlayCache.getOverlays(e,r).next(a=>{a.forEach((s,c)=>{t.set(s,c)})})}computeViews(e,t,o,r){let a=It();const s=Ro(),c=function(){return Ro()}();return t.forEach((l,d)=>{const h=o.get(d.key);r.has(d.key)&&(h===void 0||h.mutation instanceof Zt)?a=a.insert(d.key,d):h!==void 0?(s.set(d.key,h.mutation.getFieldMask()),Po(h.mutation,d,h.mutation.getFieldMask(),ue.now())):s.set(d.key,Je.empty())}),this.recalculateAndSaveOverlays(e,a).next(l=>(l.forEach((d,h)=>s.set(d,h)),t.forEach((d,h)=>c.set(d,new Ow(h,s.get(d)??null))),c))}recalculateAndSaveOverlays(e,t){const o=Ro();let r=new ve((s,c)=>s-c),a=te();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,t).next(s=>{for(const c of s)c.keys().forEach(l=>{const d=t.get(l);if(d===null)return;let h=o.get(l)||Je.empty();h=c.applyToLocalView(d,h),o.set(l,h);const g=(r.get(c.batchId)||te()).add(l);r=r.insert(c.batchId,g)})}).next(()=>{const s=[],c=r.getReverseIterator();for(;c.hasNext();){const l=c.getNext(),d=l.key,h=l.value,g=zu();h.forEach(m=>{if(!a.has(m)){const f=Ku(t.get(m),o.get(m));f!==null&&g.set(m,f),a=a.add(m)}}),s.push(this.documentOverlayCache.saveOverlays(e,d,g))}return $.waitFor(s)}).next(()=>o)}recalculateAndSaveOverlaysForDocumentKeys(e,t){return this.remoteDocumentCache.getEntries(e,t).next(o=>this.recalculateAndSaveOverlays(e,o))}getDocumentsMatchingQuery(e,t,o,r){return function(s){return j.isDocumentKey(s.path)&&s.collectionGroup===null&&s.filters.length===0}(t)?this.getDocumentsMatchingDocumentQuery(e,t.path):Fu(t)?this.getDocumentsMatchingCollectionGroupQuery(e,t,o,r):this.getDocumentsMatchingCollectionQuery(e,t,o,r)}getNextDocuments(e,t,o,r){return this.remoteDocumentCache.getAllFromCollectionGroup(e,t,o,r).next(a=>{const s=r-a.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,t,o.largestBatchId,r-a.size):$.resolve(cn());let c=Uo,l=a;return s.next(d=>$.forEach(d,(h,g)=>(c<g.largestBatchId&&(c=g.largestBatchId),a.get(h)?$.resolve():this.remoteDocumentCache.getEntry(e,h).next(m=>{l=l.insert(h,m)}))).next(()=>this.populateOverlays(e,d,a)).next(()=>this.computeViews(e,l,d,te())).next(h=>({batchId:c,changes:Uu(h)})))})}getDocumentsMatchingDocumentQuery(e,t){return this.getDocument(e,new j(t)).next(o=>{let r=So();return o.isFoundDocument()&&(r=r.insert(o.key,o)),r})}getDocumentsMatchingCollectionGroupQuery(e,t,o,r){const a=t.collectionGroup;let s=So();return this.indexManager.getCollectionParents(e,a).next(c=>$.forEach(c,l=>{const d=function(g,m){return new no(m,null,g.explicitOrderBy.slice(),g.filters.slice(),g.limit,g.limitType,g.startAt,g.endAt)}(t,l.child(a));return this.getDocumentsMatchingCollectionQuery(e,d,o,r).next(h=>{h.forEach((g,m)=>{s=s.insert(g,m)})})}).next(()=>s))}getDocumentsMatchingCollectionQuery(e,t,o,r){let a;return this.documentOverlayCache.getOverlaysForCollection(e,t.path,o.largestBatchId).next(s=>(a=s,this.remoteDocumentCache.getDocumentsMatchingQuery(e,t,o,a,r))).next(s=>{a.forEach((l,d)=>{const h=d.getKey();s.get(h)===null&&(s=s.insert(h,Be.newInvalidDocument(h)))});let c=So();return s.forEach((l,d)=>{const h=a.get(l);h!==void 0&&Po(h.mutation,d,Je.empty(),ue.now()),_a(t,d)&&(c=c.insert(l,d))}),c})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Uw{constructor(e){this.serializer=e,this.Lr=new Map,this.kr=new Map}getBundleMetadata(e,t){return $.resolve(this.Lr.get(t))}saveBundleMetadata(e,t){return this.Lr.set(t.id,function(r){return{id:r.id,version:r.version,createTime:lt(r.createTime)}}(t)),$.resolve()}getNamedQuery(e,t){return $.resolve(this.kr.get(t))}saveNamedQuery(e,t){return this.kr.set(t.name,function(r){return{name:r.name,query:Rw(r.bundledQuery),readTime:lt(r.readTime)}}(t)),$.resolve()}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zw{constructor(){this.overlays=new ve(j.comparator),this.qr=new Map}getOverlay(e,t){return $.resolve(this.overlays.get(t))}getOverlays(e,t){const o=cn();return $.forEach(t,r=>this.getOverlay(e,r).next(a=>{a!==null&&o.set(r,a)})).next(()=>o)}saveOverlays(e,t,o){return o.forEach((r,a)=>{this.St(e,t,a)}),$.resolve()}removeOverlaysForBatchId(e,t,o){const r=this.qr.get(o);return r!==void 0&&(r.forEach(a=>this.overlays=this.overlays.remove(a)),this.qr.delete(o)),$.resolve()}getOverlaysForCollection(e,t,o){const r=cn(),a=t.length+1,s=new j(t.child("")),c=this.overlays.getIteratorFrom(s);for(;c.hasNext();){const l=c.getNext().value,d=l.getKey();if(!t.isPrefixOf(d.path))break;d.path.length===a&&l.largestBatchId>o&&r.set(l.getKey(),l)}return $.resolve(r)}getOverlaysForCollectionGroup(e,t,o,r){let a=new ve((d,h)=>d-h);const s=this.overlays.getIterator();for(;s.hasNext();){const d=s.getNext().value;if(d.getKey().getCollectionGroup()===t&&d.largestBatchId>o){let h=a.get(d.largestBatchId);h===null&&(h=cn(),a=a.insert(d.largestBatchId,h)),h.set(d.getKey(),d)}}const c=cn(),l=a.getIterator();for(;l.hasNext()&&(l.getNext().value.forEach((d,h)=>c.set(d,h)),!(c.size()>=r)););return $.resolve(c)}St(e,t,o){const r=this.overlays.get(o.key);if(r!==null){const s=this.qr.get(r.largestBatchId).delete(o.key);this.qr.set(r.largestBatchId,s)}this.overlays=this.overlays.insert(o.key,new sw(t,o));let a=this.qr.get(t);a===void 0&&(a=te(),this.qr.set(t,a)),this.qr.set(t,a.add(o.key))}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qw{constructor(){this.sessionToken=Re.EMPTY_BYTE_STRING}getSessionToken(e){return $.resolve(this.sessionToken)}setSessionToken(e,t){return this.sessionToken=t,$.resolve()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _i{constructor(){this.Qr=new Se(ke.$r),this.Ur=new Se(ke.Kr)}isEmpty(){return this.Qr.isEmpty()}addReference(e,t){const o=new ke(e,t);this.Qr=this.Qr.add(o),this.Ur=this.Ur.add(o)}Wr(e,t){e.forEach(o=>this.addReference(o,t))}removeReference(e,t){this.Gr(new ke(e,t))}zr(e,t){e.forEach(o=>this.removeReference(o,t))}jr(e){const t=new j(new de([])),o=new ke(t,e),r=new ke(t,e+1),a=[];return this.Ur.forEachInRange([o,r],s=>{this.Gr(s),a.push(s.key)}),a}Jr(){this.Qr.forEach(e=>this.Gr(e))}Gr(e){this.Qr=this.Qr.delete(e),this.Ur=this.Ur.delete(e)}Hr(e){const t=new j(new de([])),o=new ke(t,e),r=new ke(t,e+1);let a=te();return this.Ur.forEachInRange([o,r],s=>{a=a.add(s.key)}),a}containsKey(e){const t=new ke(e,0),o=this.Qr.firstAfterOrEqual(t);return o!==null&&e.isEqual(o.key)}}class ke{constructor(e,t){this.key=e,this.Yr=t}static $r(e,t){return j.comparator(e.key,t.key)||ee(e.Yr,t.Yr)}static Kr(e,t){return ee(e.Yr,t.Yr)||j.comparator(e.key,t.key)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jw{constructor(e,t){this.indexManager=e,this.referenceDelegate=t,this.mutationQueue=[],this.tr=1,this.Zr=new Se(ke.$r)}checkEmpty(e){return $.resolve(this.mutationQueue.length===0)}addMutationBatch(e,t,o,r){const a=this.tr;this.tr++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const s=new aw(a,t,o,r);this.mutationQueue.push(s);for(const c of r)this.Zr=this.Zr.add(new ke(c.key,a)),this.indexManager.addToCollectionParentIndex(e,c.key.path.popLast());return $.resolve(s)}lookupMutationBatch(e,t){return $.resolve(this.Xr(t))}getNextMutationBatchAfterBatchId(e,t){const o=t+1,r=this.ei(o),a=r<0?0:r;return $.resolve(this.mutationQueue.length>a?this.mutationQueue[a]:null)}getHighestUnacknowledgedBatchId(){return $.resolve(this.mutationQueue.length===0?hi:this.tr-1)}getAllMutationBatches(e){return $.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,t){const o=new ke(t,0),r=new ke(t,Number.POSITIVE_INFINITY),a=[];return this.Zr.forEachInRange([o,r],s=>{const c=this.Xr(s.Yr);a.push(c)}),$.resolve(a)}getAllMutationBatchesAffectingDocumentKeys(e,t){let o=new Se(ee);return t.forEach(r=>{const a=new ke(r,0),s=new ke(r,Number.POSITIVE_INFINITY);this.Zr.forEachInRange([a,s],c=>{o=o.add(c.Yr)})}),$.resolve(this.ti(o))}getAllMutationBatchesAffectingQuery(e,t){const o=t.path,r=o.length+1;let a=o;j.isDocumentKey(a)||(a=a.child(""));const s=new ke(new j(a),0);let c=new Se(ee);return this.Zr.forEachWhile(l=>{const d=l.key.path;return!!o.isPrefixOf(d)&&(d.length===r&&(c=c.add(l.Yr)),!0)},s),$.resolve(this.ti(c))}ti(e){const t=[];return e.forEach(o=>{const r=this.Xr(o);r!==null&&t.push(r)}),t}removeMutationBatch(e,t){se(this.ni(t.batchId,"removed")===0,55003),this.mutationQueue.shift();let o=this.Zr;return $.forEach(t.mutations,r=>{const a=new ke(r.key,t.batchId);return o=o.delete(a),this.referenceDelegate.markPotentiallyOrphaned(e,r.key)}).next(()=>{this.Zr=o})}ir(e){}containsKey(e,t){const o=new ke(t,0),r=this.Zr.firstAfterOrEqual(o);return $.resolve(t.isEqual(r&&r.key))}performConsistencyCheck(e){return this.mutationQueue.length,$.resolve()}ni(e,t){return this.ei(e)}ei(e){return this.mutationQueue.length===0?0:e-this.mutationQueue[0].batchId}Xr(e){const t=this.ei(e);return t<0||t>=this.mutationQueue.length?null:this.mutationQueue[t]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hw{constructor(e){this.ri=e,this.docs=function(){return new ve(j.comparator)}(),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,t){const o=t.key,r=this.docs.get(o),a=r?r.size:0,s=this.ri(t);return this.docs=this.docs.insert(o,{document:t.mutableCopy(),size:s}),this.size+=s-a,this.indexManager.addToCollectionParentIndex(e,o.path.popLast())}removeEntry(e){const t=this.docs.get(e);t&&(this.docs=this.docs.remove(e),this.size-=t.size)}getEntry(e,t){const o=this.docs.get(t);return $.resolve(o?o.document.mutableCopy():Be.newInvalidDocument(t))}getEntries(e,t){let o=It();return t.forEach(r=>{const a=this.docs.get(r);o=o.insert(r,a?a.document.mutableCopy():Be.newInvalidDocument(r))}),$.resolve(o)}getDocumentsMatchingQuery(e,t,o,r){let a=It();const s=t.path,c=new j(s.child("__id-9223372036854775808__")),l=this.docs.getIteratorFrom(c);for(;l.hasNext();){const{key:d,value:{document:h}}=l.getNext();if(!s.isPrefixOf(d.path))break;d.path.length>s.length+1||bf(yf(h),o)<=0||(r.has(h.key)||_a(t,h))&&(a=a.insert(h.key,h.mutableCopy()))}return $.resolve(a)}getAllFromCollectionGroup(e,t,o,r){G(9500)}ii(e,t){return $.forEach(this.docs,o=>t(o))}newChangeBuffer(e){return new Gw(this)}getSize(e){return $.resolve(this.size)}}class Gw extends Vw{constructor(e){super(),this.Nr=e}applyChanges(e){const t=[];return this.changes.forEach((o,r)=>{r.isValidDocument()?t.push(this.Nr.addEntry(e,r)):this.Nr.removeEntry(o)}),$.waitFor(t)}getFromCache(e,t){return this.Nr.getEntry(e,t)}getAllFromCache(e,t){return this.Nr.getEntries(e,t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ww{constructor(e){this.persistence=e,this.si=new bn(t=>mi(t),fi),this.lastRemoteSnapshotVersion=K.min(),this.highestTargetId=0,this.oi=0,this._i=new _i,this.targetCount=0,this.ai=Kn.ur()}forEachTarget(e,t){return this.si.forEach((o,r)=>t(r)),$.resolve()}getLastRemoteSnapshotVersion(e){return $.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return $.resolve(this.oi)}allocateTargetId(e){return this.highestTargetId=this.ai.next(),$.resolve(this.highestTargetId)}setTargetsMetadata(e,t,o){return o&&(this.lastRemoteSnapshotVersion=o),t>this.oi&&(this.oi=t),$.resolve()}Pr(e){this.si.set(e.target,e);const t=e.targetId;t>this.highestTargetId&&(this.ai=new Kn(t),this.highestTargetId=t),e.sequenceNumber>this.oi&&(this.oi=e.sequenceNumber)}addTargetData(e,t){return this.Pr(t),this.targetCount+=1,$.resolve()}updateTargetData(e,t){return this.Pr(t),$.resolve()}removeTargetData(e,t){return this.si.delete(t.target),this._i.jr(t.targetId),this.targetCount-=1,$.resolve()}removeTargets(e,t,o){let r=0;const a=[];return this.si.forEach((s,c)=>{c.sequenceNumber<=t&&o.get(c.targetId)===null&&(this.si.delete(s),a.push(this.removeMatchingKeysForTargetId(e,c.targetId)),r++)}),$.waitFor(a).next(()=>r)}getTargetCount(e){return $.resolve(this.targetCount)}getTargetData(e,t){const o=this.si.get(t)||null;return $.resolve(o)}addMatchingKeys(e,t,o){return this._i.Wr(t,o),$.resolve()}removeMatchingKeys(e,t,o){this._i.zr(t,o);const r=this.persistence.referenceDelegate,a=[];return r&&t.forEach(s=>{a.push(r.markPotentiallyOrphaned(e,s))}),$.waitFor(a)}removeMatchingKeysForTargetId(e,t){return this._i.jr(t),$.resolve()}getMatchingKeysForTargetId(e,t){const o=this._i.Hr(t);return $.resolve(o)}containsKey(e,t){return $.resolve(this._i.containsKey(t))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ih{constructor(e,t){this.ui={},this.overlays={},this.ci=new wa(0),this.li=!1,this.li=!0,this.hi=new qw,this.referenceDelegate=e(this),this.Pi=new Ww(this),this.indexManager=new Pw,this.remoteDocumentCache=function(r){return new Hw(r)}(o=>this.referenceDelegate.Ti(o)),this.serializer=new Cw(t),this.Ii=new Uw(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.li=!1,Promise.resolve()}get started(){return this.li}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let t=this.overlays[e.toKey()];return t||(t=new zw,this.overlays[e.toKey()]=t),t}getMutationQueue(e,t){let o=this.ui[e.toKey()];return o||(o=new jw(t,this.referenceDelegate),this.ui[e.toKey()]=o),o}getGlobalsCache(){return this.hi}getTargetCache(){return this.Pi}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Ii}runTransaction(e,t,o){U("MemoryPersistence","Starting transaction:",e);const r=new Kw(this.ci.next());return this.referenceDelegate.Ei(),o(r).next(a=>this.referenceDelegate.di(r).next(()=>a)).toPromise().then(a=>(r.raiseOnCommittedEvent(),a))}Ai(e,t){return $.or(Object.values(this.ui).map(o=>()=>o.containsKey(e,t)))}}class Kw extends _f{constructor(e){super(),this.currentSequenceNumber=e}}class xi{constructor(e){this.persistence=e,this.Ri=new _i,this.Vi=null}static mi(e){return new xi(e)}get fi(){if(this.Vi)return this.Vi;throw G(60996)}addReference(e,t,o){return this.Ri.addReference(o,t),this.fi.delete(o.toString()),$.resolve()}removeReference(e,t,o){return this.Ri.removeReference(o,t),this.fi.add(o.toString()),$.resolve()}markPotentiallyOrphaned(e,t){return this.fi.add(t.toString()),$.resolve()}removeTarget(e,t){this.Ri.jr(t.targetId).forEach(r=>this.fi.add(r.toString()));const o=this.persistence.getTargetCache();return o.getMatchingKeysForTargetId(e,t.targetId).next(r=>{r.forEach(a=>this.fi.add(a.toString()))}).next(()=>o.removeTargetData(e,t))}Ei(){this.Vi=new Set}di(e){const t=this.persistence.getRemoteDocumentCache().newChangeBuffer();return $.forEach(this.fi,o=>{const r=j.fromPath(o);return this.gi(e,r).next(a=>{a||t.removeEntry(r,K.min())})}).next(()=>(this.Vi=null,t.apply(e)))}updateLimboDocument(e,t){return this.gi(e,t).next(o=>{o?this.fi.delete(t.toString()):this.fi.add(t.toString())})}Ti(e){return 0}gi(e,t){return $.or([()=>$.resolve(this.Ri.containsKey(t)),()=>this.persistence.getTargetCache().containsKey(e,t),()=>this.persistence.Ai(e,t)])}}class ta{constructor(e,t){this.persistence=e,this.pi=new bn(o=>Sf(o.path),(o,r)=>o.isEqual(r)),this.garbageCollector=Fw(this,t)}static mi(e,t){return new ta(e,t)}Ei(){}di(e){return $.resolve()}forEachTarget(e,t){return this.persistence.getTargetCache().forEachTarget(e,t)}gr(e){const t=this.wr(e);return this.persistence.getTargetCache().getTargetCount(e).next(o=>t.next(r=>o+r))}wr(e){let t=0;return this.pr(e,o=>{t++}).next(()=>t)}pr(e,t){return $.forEach(this.pi,(o,r)=>this.br(e,o,r).next(a=>a?$.resolve():t(r)))}removeTargets(e,t,o){return this.persistence.getTargetCache().removeTargets(e,t,o)}removeOrphanedDocuments(e,t){let o=0;const r=this.persistence.getRemoteDocumentCache(),a=r.newChangeBuffer();return r.ii(e,s=>this.br(e,s,t).next(c=>{c||(o++,a.removeEntry(s,K.min()))})).next(()=>a.apply(e)).next(()=>o)}markPotentiallyOrphaned(e,t){return this.pi.set(t,e.currentSequenceNumber),$.resolve()}removeTarget(e,t){const o=t.withSequenceNumber(e.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(e,o)}addReference(e,t,o){return this.pi.set(o,e.currentSequenceNumber),$.resolve()}removeReference(e,t,o){return this.pi.set(o,e.currentSequenceNumber),$.resolve()}updateLimboDocument(e,t){return this.pi.set(t,e.currentSequenceNumber),$.resolve()}Ti(e){let t=e.key.toString().length;return e.isFoundDocument()&&(t+=Vr(e.data.value)),t}br(e,t,o){return $.or([()=>this.persistence.Ai(e,t),()=>this.persistence.getTargetCache().containsKey(e,t),()=>{const r=this.pi.get(t);return $.resolve(r!==void 0&&r>o)}])}getCacheSize(e){return this.persistence.getRemoteDocumentCache().getSize(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ti{constructor(e,t,o,r){this.targetId=e,this.fromCache=t,this.Es=o,this.ds=r}static As(e,t){let o=te(),r=te();for(const a of t.docChanges)switch(a.type){case 0:o=o.add(a.doc.key);break;case 1:r=r.add(a.doc.key)}return new Ti(e,t.fromCache,o,r)}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yw{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xw{constructor(){this.Rs=!1,this.Vs=!1,this.fs=100,this.gs=function(){return qg()?8:xf(ze())>0?6:4}()}initialize(e,t){this.ps=e,this.indexManager=t,this.Rs=!0}getDocumentsMatchingQuery(e,t,o,r){const a={result:null};return this.ys(e,t).next(s=>{a.result=s}).next(()=>{if(!a.result)return this.ws(e,t,r,o).next(s=>{a.result=s})}).next(()=>{if(a.result)return;const s=new Yw;return this.Ss(e,t,s).next(c=>{if(a.result=c,this.Vs)return this.bs(e,t,s,c.size)})}).next(()=>a.result)}bs(e,t,o,r){return o.documentReadCount<this.fs?(Dn()<=Z.DEBUG&&U("QueryEngine","SDK will not create cache indexes for query:",Mn(t),"since it only creates cache indexes for collection contains","more than or equal to",this.fs,"documents"),$.resolve()):(Dn()<=Z.DEBUG&&U("QueryEngine","Query:",Mn(t),"scans",o.documentReadCount,"local documents and returns",r,"documents as results."),o.documentReadCount>this.gs*r?(Dn()<=Z.DEBUG&&U("QueryEngine","The SDK decides to create cache indexes for query:",Mn(t),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,ct(t))):$.resolve())}ys(e,t){if(Gl(t))return $.resolve(null);let o=ct(t);return this.indexManager.getIndexType(e,o).next(r=>r===0?null:(t.limit!==null&&r===1&&(t=Jr(t,null,"F"),o=ct(t)),this.indexManager.getDocumentsMatchingTarget(e,o).next(a=>{const s=te(...a);return this.ps.getDocuments(e,s).next(c=>this.indexManager.getMinOffset(e,o).next(l=>{const d=this.Ds(t,c);return this.Cs(t,d,s,l.readTime)?this.ys(e,Jr(t,null,"F")):this.vs(e,d,t,l)}))})))}ws(e,t,o,r){return Gl(t)||r.isEqual(K.min())?$.resolve(null):this.ps.getDocuments(e,o).next(a=>{const s=this.Ds(t,a);return this.Cs(t,s,o,r)?$.resolve(null):(Dn()<=Z.DEBUG&&U("QueryEngine","Re-using previous result from %s to execute query: %s",r.toString(),Mn(t)),this.vs(e,s,t,vf(r,Uo)).next(c=>c))})}Ds(e,t){let o=new Se(Ou(e));return t.forEach((r,a)=>{_a(e,a)&&(o=o.add(a))}),o}Cs(e,t,o,r){if(e.limit===null)return!1;if(o.size!==t.size)return!0;const a=e.limitType==="F"?t.last():t.first();return!!a&&(a.hasPendingWrites||a.version.compareTo(r)>0)}Ss(e,t,o){return Dn()<=Z.DEBUG&&U("QueryEngine","Using full collection scan to execute query:",Mn(t)),this.ps.getDocumentsMatchingQuery(e,t,jt.min(),o)}vs(e,t,o,r){return this.ps.getDocumentsMatchingQuery(e,o,r).next(a=>(t.forEach(s=>{a=a.insert(s.key,s)}),a))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Si="LocalStore",Qw=3e8;class Jw{constructor(e,t,o,r){this.persistence=e,this.Fs=t,this.serializer=r,this.Ms=new ve(ee),this.xs=new bn(a=>mi(a),fi),this.Os=new Map,this.Ns=e.getRemoteDocumentCache(),this.Pi=e.getTargetCache(),this.Ii=e.getBundleCache(),this.Bs(o)}Bs(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new Bw(this.Ns,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.Ns.setIndexManager(this.indexManager),this.Fs.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",t=>e.collect(t,this.Ms))}}function Zw(n,e,t,o){return new Jw(n,e,t,o)}async function ch(n,e){const t=Y(n);return await t.persistence.runTransaction("Handle user change","readonly",o=>{let r;return t.mutationQueue.getAllMutationBatches(o).next(a=>(r=a,t.Bs(e),t.mutationQueue.getAllMutationBatches(o))).next(a=>{const s=[],c=[];let l=te();for(const d of r){s.push(d.batchId);for(const h of d.mutations)l=l.add(h.key)}for(const d of a){c.push(d.batchId);for(const h of d.mutations)l=l.add(h.key)}return t.localDocuments.getDocuments(o,l).next(d=>({Ls:d,removedBatchIds:s,addedBatchIds:c}))})})}function ev(n,e){const t=Y(n);return t.persistence.runTransaction("Acknowledge batch","readwrite-primary",o=>{const r=e.batch.keys(),a=t.Ns.newChangeBuffer({trackRemovals:!0});return function(c,l,d,h){const g=d.batch,m=g.keys();let f=$.resolve();return m.forEach(v=>{f=f.next(()=>h.getEntry(l,v)).next(b=>{const T=d.docVersions.get(v);se(T!==null,48541),b.version.compareTo(T)<0&&(g.applyToRemoteDocument(b,d),b.isValidDocument()&&(b.setReadTime(d.commitVersion),h.addEntry(b)))})}),f.next(()=>c.mutationQueue.removeMutationBatch(l,g))}(t,o,e,a).next(()=>a.apply(o)).next(()=>t.mutationQueue.performConsistencyCheck(o)).next(()=>t.documentOverlayCache.removeOverlaysForBatchId(o,r,e.batch.batchId)).next(()=>t.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(o,function(c){let l=te();for(let d=0;d<c.mutationResults.length;++d)c.mutationResults[d].transformResults.length>0&&(l=l.add(c.batch.mutations[d].key));return l}(e))).next(()=>t.localDocuments.getDocuments(o,r))})}function lh(n){const e=Y(n);return e.persistence.runTransaction("Get last remote snapshot version","readonly",t=>e.Pi.getLastRemoteSnapshotVersion(t))}function tv(n,e){const t=Y(n),o=e.snapshotVersion;let r=t.Ms;return t.persistence.runTransaction("Apply remote event","readwrite-primary",a=>{const s=t.Ns.newChangeBuffer({trackRemovals:!0});r=t.Ms;const c=[];e.targetChanges.forEach((h,g)=>{const m=r.get(g);if(!m)return;c.push(t.Pi.removeMatchingKeys(a,h.removedDocuments,g).next(()=>t.Pi.addMatchingKeys(a,h.addedDocuments,g)));let f=m.withSequenceNumber(a.currentSequenceNumber);e.targetMismatches.get(g)!==null?f=f.withResumeToken(Re.EMPTY_BYTE_STRING,K.min()).withLastLimboFreeSnapshotVersion(K.min()):h.resumeToken.approximateByteSize()>0&&(f=f.withResumeToken(h.resumeToken,o)),r=r.insert(g,f),function(b,T,D){return b.resumeToken.approximateByteSize()===0||T.snapshotVersion.toMicroseconds()-b.snapshotVersion.toMicroseconds()>=Qw?!0:D.addedDocuments.size+D.modifiedDocuments.size+D.removedDocuments.size>0}(m,f,h)&&c.push(t.Pi.updateTargetData(a,f))});let l=It(),d=te();if(e.documentUpdates.forEach(h=>{e.resolvedLimboDocuments.has(h)&&c.push(t.persistence.referenceDelegate.updateLimboDocument(a,h))}),c.push(nv(a,s,e.documentUpdates).next(h=>{l=h.ks,d=h.qs})),!o.isEqual(K.min())){const h=t.Pi.getLastRemoteSnapshotVersion(a).next(g=>t.Pi.setTargetsMetadata(a,a.currentSequenceNumber,o));c.push(h)}return $.waitFor(c).next(()=>s.apply(a)).next(()=>t.localDocuments.getLocalViewOfDocuments(a,l,d)).next(()=>l)}).then(a=>(t.Ms=r,a))}function nv(n,e,t){let o=te(),r=te();return t.forEach(a=>o=o.add(a)),e.getEntries(n,o).next(a=>{let s=It();return t.forEach((c,l)=>{const d=a.get(c);l.isFoundDocument()!==d.isFoundDocument()&&(r=r.add(c)),l.isNoDocument()&&l.version.isEqual(K.min())?(e.removeEntry(c,l.readTime),s=s.insert(c,l)):!d.isValidDocument()||l.version.compareTo(d.version)>0||l.version.compareTo(d.version)===0&&d.hasPendingWrites?(e.addEntry(l),s=s.insert(c,l)):U(Si,"Ignoring outdated watch update for ",c,". Current version:",d.version," Watch version:",l.version)}),{ks:s,qs:r}})}function ov(n,e){const t=Y(n);return t.persistence.runTransaction("Get next mutation batch","readonly",o=>(e===void 0&&(e=hi),t.mutationQueue.getNextMutationBatchAfterBatchId(o,e)))}function rv(n,e){const t=Y(n);return t.persistence.runTransaction("Allocate target","readwrite",o=>{let r;return t.Pi.getTargetData(o,e).next(a=>a?(r=a,$.resolve(r)):t.Pi.allocateTargetId(o).next(s=>(r=new Lt(e,s,"TargetPurposeListen",o.currentSequenceNumber),t.Pi.addTargetData(o,r).next(()=>r))))}).then(o=>{const r=t.Ms.get(o.targetId);return(r===null||o.snapshotVersion.compareTo(r.snapshotVersion)>0)&&(t.Ms=t.Ms.insert(o.targetId,o),t.xs.set(e,o.targetId)),o})}async function Qs(n,e,t){const o=Y(n),r=o.Ms.get(e),a=t?"readwrite":"readwrite-primary";try{t||await o.persistence.runTransaction("Release target",a,s=>o.persistence.referenceDelegate.removeTarget(s,r))}catch(s){if(!to(s))throw s;U(Si,`Failed to update sequence numbers for target ${e}: ${s}`)}o.Ms=o.Ms.remove(e),o.xs.delete(r.target)}function ad(n,e,t){const o=Y(n);let r=K.min(),a=te();return o.persistence.runTransaction("Execute query","readwrite",s=>function(l,d,h){const g=Y(l),m=g.xs.get(h);return m!==void 0?$.resolve(g.Ms.get(m)):g.Pi.getTargetData(d,h)}(o,s,ct(e)).next(c=>{if(c)return r=c.lastLimboFreeSnapshotVersion,o.Pi.getMatchingKeysForTargetId(s,c.targetId).next(l=>{a=l})}).next(()=>o.Fs.getDocumentsMatchingQuery(s,e,t?r:K.min(),t?a:te())).next(c=>(av(o,jf(e),c),{documents:c,Qs:a})))}function av(n,e,t){let o=n.Os.get(e)||K.min();t.forEach((r,a)=>{a.readTime.compareTo(o)>0&&(o=a.readTime)}),n.Os.set(e,o)}class sd{constructor(){this.activeTargetIds=Xf()}zs(e){this.activeTargetIds=this.activeTargetIds.add(e)}js(e){this.activeTargetIds=this.activeTargetIds.delete(e)}Gs(){const e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class sv{constructor(){this.Mo=new sd,this.xo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,t,o){}addLocalQueryTarget(e,t=!0){return t&&this.Mo.zs(e),this.xo[e]||"not-current"}updateQueryState(e,t,o){this.xo[e]=t}removeLocalQueryTarget(e){this.Mo.js(e)}isLocalQueryTarget(e){return this.Mo.activeTargetIds.has(e)}clearQueryState(e){delete this.xo[e]}getAllActiveQueryTargets(){return this.Mo.activeTargetIds}isActiveQueryTarget(e){return this.Mo.activeTargetIds.has(e)}start(){return this.Mo=new sd,Promise.resolve()}handleUserChange(e,t,o){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class iv{Oo(e){}shutdown(){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const id="ConnectivityMonitor";class cd{constructor(){this.No=()=>this.Bo(),this.Lo=()=>this.ko(),this.qo=[],this.Qo()}Oo(e){this.qo.push(e)}shutdown(){window.removeEventListener("online",this.No),window.removeEventListener("offline",this.Lo)}Qo(){window.addEventListener("online",this.No),window.addEventListener("offline",this.Lo)}Bo(){U(id,"Network connectivity changed: AVAILABLE");for(const e of this.qo)e(0)}ko(){U(id,"Network connectivity changed: UNAVAILABLE");for(const e of this.qo)e(1)}static v(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let $r=null;function Js(){return $r===null?$r=function(){return 268435456+Math.round(2147483648*Math.random())}():$r++,"0x"+$r.toString(16)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const As="RestConnection",cv={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};class lv{get $o(){return!1}constructor(e){this.databaseInfo=e,this.databaseId=e.databaseId;const t=e.ssl?"https":"http",o=encodeURIComponent(this.databaseId.projectId),r=encodeURIComponent(this.databaseId.database);this.Uo=t+"://"+e.host,this.Ko=`projects/${o}/databases/${r}`,this.Wo=this.databaseId.database===Yr?`project_id=${o}`:`project_id=${o}&database_id=${r}`}Go(e,t,o,r,a){const s=Js(),c=this.zo(e,t.toUriEncodedString());U(As,`Sending RPC '${e}' ${s}:`,c,o);const l={"google-cloud-resource-prefix":this.Ko,"x-goog-request-params":this.Wo};this.jo(l,r,a);const{host:d}=new URL(c),h=Qn(d);return this.Jo(e,c,l,o,h).then(g=>(U(As,`Received RPC '${e}' ${s}: `,g),g),g=>{throw mn(As,`RPC '${e}' ${s} failed with error: `,g,"url: ",c,"request:",o),g})}Ho(e,t,o,r,a,s){return this.Go(e,t,o,r,a)}jo(e,t,o){e["X-Goog-Api-Client"]=function(){return"gl-js/ fire/"+Zn}(),e["Content-Type"]="text/plain",this.databaseInfo.appId&&(e["X-Firebase-GMPID"]=this.databaseInfo.appId),t&&t.headers.forEach((r,a)=>e[a]=r),o&&o.headers.forEach((r,a)=>e[a]=r)}zo(e,t){const o=cv[e];return`${this.Uo}/v1/${t}:${o}`}terminate(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dv{constructor(e){this.Yo=e.Yo,this.Zo=e.Zo}Xo(e){this.e_=e}t_(e){this.n_=e}r_(e){this.i_=e}onMessage(e){this.s_=e}close(){this.Zo()}send(e){this.Yo(e)}o_(){this.e_()}__(){this.n_()}a_(e){this.i_(e)}u_(e){this.s_(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ve="WebChannelConnection";class uv extends lv{constructor(e){super(e),this.c_=[],this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}Jo(e,t,o,r,a){const s=Js();return new Promise((c,l)=>{const d=new du;d.setWithCredentials(!0),d.listenOnce(uu.COMPLETE,()=>{try{switch(d.getLastErrorCode()){case Fr.NO_ERROR:const g=d.getResponseJson();U(Ve,`XHR for RPC '${e}' ${s} received:`,JSON.stringify(g)),c(g);break;case Fr.TIMEOUT:U(Ve,`RPC '${e}' ${s} timed out`),l(new V(M.DEADLINE_EXCEEDED,"Request time out"));break;case Fr.HTTP_ERROR:const m=d.getStatus();if(U(Ve,`RPC '${e}' ${s} failed with status:`,m,"response text:",d.getResponseText()),m>0){let f=d.getResponseJson();Array.isArray(f)&&(f=f[0]);const v=f?.error;if(v&&v.status&&v.message){const b=function(D){const L=D.toLowerCase().replace(/_/g,"-");return Object.values(M).indexOf(L)>=0?L:M.UNKNOWN}(v.status);l(new V(b,v.message))}else l(new V(M.UNKNOWN,"Server responded with status "+d.getStatus()))}else l(new V(M.UNAVAILABLE,"Connection failed."));break;default:G(9055,{l_:e,streamId:s,h_:d.getLastErrorCode(),P_:d.getLastError()})}}finally{U(Ve,`RPC '${e}' ${s} completed.`)}});const h=JSON.stringify(r);U(Ve,`RPC '${e}' ${s} sending request:`,r),d.send(t,"POST",h,o,15)})}T_(e,t,o){const r=Js(),a=[this.Uo,"/","google.firestore.v1.Firestore","/",e,"/channel"],s=gu(),c=pu(),l={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},d=this.longPollingOptions.timeoutSeconds;d!==void 0&&(l.longPollingTimeout=Math.round(1e3*d)),this.useFetchStreams&&(l.useFetchStreams=!0),this.jo(l.initMessageHeaders,t,o),l.encodeInitMessageHeaders=!0;const h=a.join("");U(Ve,`Creating RPC '${e}' stream ${r}: ${h}`,l);const g=s.createWebChannel(h,l);this.I_(g);let m=!1,f=!1;const v=new dv({Yo:T=>{f?U(Ve,`Not sending because RPC '${e}' stream ${r} is closed:`,T):(m||(U(Ve,`Opening RPC '${e}' stream ${r} transport.`),g.open(),m=!0),U(Ve,`RPC '${e}' stream ${r} sending:`,T),g.send(T))},Zo:()=>g.close()}),b=(T,D,L)=>{T.listen(D,O=>{try{L(O)}catch(Q){setTimeout(()=>{throw Q},0)}})};return b(g,To.EventType.OPEN,()=>{f||(U(Ve,`RPC '${e}' stream ${r} transport opened.`),v.o_())}),b(g,To.EventType.CLOSE,()=>{f||(f=!0,U(Ve,`RPC '${e}' stream ${r} transport closed`),v.a_(),this.E_(g))}),b(g,To.EventType.ERROR,T=>{f||(f=!0,mn(Ve,`RPC '${e}' stream ${r} transport errored. Name:`,T.name,"Message:",T.message),v.a_(new V(M.UNAVAILABLE,"The operation could not be completed")))}),b(g,To.EventType.MESSAGE,T=>{if(!f){const D=T.data[0];se(!!D,16349);const L=D,O=L?.error||L[0]?.error;if(O){U(Ve,`RPC '${e}' stream ${r} received error:`,O);const Q=O.status;let J=function(y){const E=Ee[y];if(E!==void 0)return Xu(E)}(Q),ie=O.message;J===void 0&&(J=M.INTERNAL,ie="Unknown error status: "+Q+" with message "+O.message),f=!0,v.a_(new V(J,ie)),g.close()}else U(Ve,`RPC '${e}' stream ${r} received:`,D),v.u_(D)}}),b(c,hu.STAT_EVENT,T=>{T.stat===Bs.PROXY?U(Ve,`RPC '${e}' stream ${r} detected buffering proxy`):T.stat===Bs.NOPROXY&&U(Ve,`RPC '${e}' stream ${r} detected no buffering proxy`)}),setTimeout(()=>{v.__()},0),v}terminate(){this.c_.forEach(e=>e.close()),this.c_=[]}I_(e){this.c_.push(e)}E_(e){this.c_=this.c_.filter(t=>t===e)}}function ks(){return typeof document<"u"?document:null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Aa(n){return new mw(n,!0)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dh{constructor(e,t,o=1e3,r=1.5,a=6e4){this.Mi=e,this.timerId=t,this.d_=o,this.A_=r,this.R_=a,this.V_=0,this.m_=null,this.f_=Date.now(),this.reset()}reset(){this.V_=0}g_(){this.V_=this.R_}p_(e){this.cancel();const t=Math.floor(this.V_+this.y_()),o=Math.max(0,Date.now()-this.f_),r=Math.max(0,t-o);r>0&&U("ExponentialBackoff",`Backing off for ${r} ms (base delay: ${this.V_} ms, delay with jitter: ${t} ms, last attempt: ${o} ms ago)`),this.m_=this.Mi.enqueueAfterDelay(this.timerId,r,()=>(this.f_=Date.now(),e())),this.V_*=this.A_,this.V_<this.d_&&(this.V_=this.d_),this.V_>this.R_&&(this.V_=this.R_)}w_(){this.m_!==null&&(this.m_.skipDelay(),this.m_=null)}cancel(){this.m_!==null&&(this.m_.cancel(),this.m_=null)}y_(){return(Math.random()-.5)*this.V_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ld="PersistentStream";class uh{constructor(e,t,o,r,a,s,c,l){this.Mi=e,this.S_=o,this.b_=r,this.connection=a,this.authCredentialsProvider=s,this.appCheckCredentialsProvider=c,this.listener=l,this.state=0,this.D_=0,this.C_=null,this.v_=null,this.stream=null,this.F_=0,this.M_=new dh(e,t)}x_(){return this.state===1||this.state===5||this.O_()}O_(){return this.state===2||this.state===3}start(){this.F_=0,this.state!==4?this.auth():this.N_()}async stop(){this.x_()&&await this.close(0)}B_(){this.state=0,this.M_.reset()}L_(){this.O_()&&this.C_===null&&(this.C_=this.Mi.enqueueAfterDelay(this.S_,6e4,()=>this.k_()))}q_(e){this.Q_(),this.stream.send(e)}async k_(){if(this.O_())return this.close(0)}Q_(){this.C_&&(this.C_.cancel(),this.C_=null)}U_(){this.v_&&(this.v_.cancel(),this.v_=null)}async close(e,t){this.Q_(),this.U_(),this.M_.cancel(),this.D_++,e!==4?this.M_.reset():t&&t.code===M.RESOURCE_EXHAUSTED?(St(t.toString()),St("Using maximum backoff delay to prevent overloading the backend."),this.M_.g_()):t&&t.code===M.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.K_(),this.stream.close(),this.stream=null),this.state=e,await this.listener.r_(t)}K_(){}auth(){this.state=1;const e=this.W_(this.D_),t=this.D_;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([o,r])=>{this.D_===t&&this.G_(o,r)},o=>{e(()=>{const r=new V(M.UNKNOWN,"Fetching auth token failed: "+o.message);return this.z_(r)})})}G_(e,t){const o=this.W_(this.D_);this.stream=this.j_(e,t),this.stream.Xo(()=>{o(()=>this.listener.Xo())}),this.stream.t_(()=>{o(()=>(this.state=2,this.v_=this.Mi.enqueueAfterDelay(this.b_,1e4,()=>(this.O_()&&(this.state=3),Promise.resolve())),this.listener.t_()))}),this.stream.r_(r=>{o(()=>this.z_(r))}),this.stream.onMessage(r=>{o(()=>++this.F_==1?this.J_(r):this.onNext(r))})}N_(){this.state=5,this.M_.p_(async()=>{this.state=0,this.start()})}z_(e){return U(ld,`close with error: ${e}`),this.stream=null,this.close(4,e)}W_(e){return t=>{this.Mi.enqueueAndForget(()=>this.D_===e?t():(U(ld,"stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}}class hv extends uh{constructor(e,t,o,r,a,s){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",t,o,r,s),this.serializer=a}j_(e,t){return this.connection.T_("Listen",e,t)}J_(e){return this.onNext(e)}onNext(e){this.M_.reset();const t=vw(this.serializer,e),o=function(a){if(!("targetChange"in a))return K.min();const s=a.targetChange;return s.targetIds&&s.targetIds.length?K.min():s.readTime?lt(s.readTime):K.min()}(e);return this.listener.H_(t,o)}Y_(e){const t={};t.database=Xs(this.serializer),t.addTarget=function(a,s){let c;const l=s.target;if(c=Hs(l)?{documents:Ew(a,l)}:{query:_w(a,l).ft},c.targetId=s.targetId,s.resumeToken.approximateByteSize()>0){c.resumeToken=Zu(a,s.resumeToken);const d=Ws(a,s.expectedCount);d!==null&&(c.expectedCount=d)}else if(s.snapshotVersion.compareTo(K.min())>0){c.readTime=ea(a,s.snapshotVersion.toTimestamp());const d=Ws(a,s.expectedCount);d!==null&&(c.expectedCount=d)}return c}(this.serializer,e);const o=Tw(this.serializer,e);o&&(t.labels=o),this.q_(t)}Z_(e){const t={};t.database=Xs(this.serializer),t.removeTarget=e,this.q_(t)}}class pv extends uh{constructor(e,t,o,r,a,s){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",t,o,r,s),this.serializer=a}get X_(){return this.F_>0}start(){this.lastStreamToken=void 0,super.start()}K_(){this.X_&&this.ea([])}j_(e,t){return this.connection.T_("Write",e,t)}J_(e){return se(!!e.streamToken,31322),this.lastStreamToken=e.streamToken,se(!e.writeResults||e.writeResults.length===0,55816),this.listener.ta()}onNext(e){se(!!e.streamToken,12678),this.lastStreamToken=e.streamToken,this.M_.reset();const t=bw(e.writeResults,e.commitTime),o=lt(e.commitTime);return this.listener.na(o,t)}ra(){const e={};e.database=Xs(this.serializer),this.q_(e)}ea(e){const t={streamToken:this.lastStreamToken,writes:e.map(o=>yw(this.serializer,o))};this.q_(t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gv{}class mv extends gv{constructor(e,t,o,r){super(),this.authCredentials=e,this.appCheckCredentials=t,this.connection=o,this.serializer=r,this.ia=!1}sa(){if(this.ia)throw new V(M.FAILED_PRECONDITION,"The client has already been terminated.")}Go(e,t,o,r){return this.sa(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([a,s])=>this.connection.Go(e,Ks(t,o),r,a,s)).catch(a=>{throw a.name==="FirebaseError"?(a.code===M.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),a):new V(M.UNKNOWN,a.toString())})}Ho(e,t,o,r,a){return this.sa(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([s,c])=>this.connection.Ho(e,Ks(t,o),r,s,c,a)).catch(s=>{throw s.name==="FirebaseError"?(s.code===M.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),s):new V(M.UNKNOWN,s.toString())})}terminate(){this.ia=!0,this.connection.terminate()}}class fv{constructor(e,t){this.asyncQueue=e,this.onlineStateHandler=t,this.state="Unknown",this.oa=0,this._a=null,this.aa=!0}ua(){this.oa===0&&(this.ca("Unknown"),this._a=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this._a=null,this.la("Backend didn't respond within 10 seconds."),this.ca("Offline"),Promise.resolve())))}ha(e){this.state==="Online"?this.ca("Unknown"):(this.oa++,this.oa>=1&&(this.Pa(),this.la(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.ca("Offline")))}set(e){this.Pa(),this.oa=0,e==="Online"&&(this.aa=!1),this.ca(e)}ca(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}la(e){const t=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.aa?(St(t),this.aa=!1):U("OnlineStateTracker",t)}Pa(){this._a!==null&&(this._a.cancel(),this._a=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const fn="RemoteStore";class wv{constructor(e,t,o,r,a){this.localStore=e,this.datastore=t,this.asyncQueue=o,this.remoteSyncer={},this.Ta=[],this.Ia=new Map,this.Ea=new Set,this.da=[],this.Aa=a,this.Aa.Oo(s=>{o.enqueueAndForget(async()=>{En(this)&&(U(fn,"Restarting streams for network reachability change."),await async function(l){const d=Y(l);d.Ea.add(4),await or(d),d.Ra.set("Unknown"),d.Ea.delete(4),await ka(d)}(this))})}),this.Ra=new fv(o,r)}}async function ka(n){if(En(n))for(const e of n.da)await e(!0)}async function or(n){for(const e of n.da)await e(!1)}function hh(n,e){const t=Y(n);t.Ia.has(e.targetId)||(t.Ia.set(e.targetId,e),Ci(t)?ki(t):oo(t).O_()&&Ai(t,e))}function Ii(n,e){const t=Y(n),o=oo(t);t.Ia.delete(e),o.O_()&&ph(t,e),t.Ia.size===0&&(o.O_()?o.L_():En(t)&&t.Ra.set("Unknown"))}function Ai(n,e){if(n.Va.Ue(e.targetId),e.resumeToken.approximateByteSize()>0||e.snapshotVersion.compareTo(K.min())>0){const t=n.remoteSyncer.getRemoteKeysForTarget(e.targetId).size;e=e.withExpectedCount(t)}oo(n).Y_(e)}function ph(n,e){n.Va.Ue(e),oo(n).Z_(e)}function ki(n){n.Va=new uw({getRemoteKeysForTarget:e=>n.remoteSyncer.getRemoteKeysForTarget(e),At:e=>n.Ia.get(e)||null,ht:()=>n.datastore.serializer.databaseId}),oo(n).start(),n.Ra.ua()}function Ci(n){return En(n)&&!oo(n).x_()&&n.Ia.size>0}function En(n){return Y(n).Ea.size===0}function gh(n){n.Va=void 0}async function vv(n){n.Ra.set("Online")}async function yv(n){n.Ia.forEach((e,t)=>{Ai(n,e)})}async function bv(n,e){gh(n),Ci(n)?(n.Ra.ha(e),ki(n)):n.Ra.set("Unknown")}async function Ev(n,e,t){if(n.Ra.set("Online"),e instanceof Ju&&e.state===2&&e.cause)try{await async function(r,a){const s=a.cause;for(const c of a.targetIds)r.Ia.has(c)&&(await r.remoteSyncer.rejectListen(c,s),r.Ia.delete(c),r.Va.removeTarget(c))}(n,e)}catch(o){U(fn,"Failed to remove targets %s: %s ",e.targetIds.join(","),o),await na(n,o)}else if(e instanceof Ur?n.Va.Ze(e):e instanceof Qu?n.Va.st(e):n.Va.tt(e),!t.isEqual(K.min()))try{const o=await lh(n.localStore);t.compareTo(o)>=0&&await function(a,s){const c=a.Va.Tt(s);return c.targetChanges.forEach((l,d)=>{if(l.resumeToken.approximateByteSize()>0){const h=a.Ia.get(d);h&&a.Ia.set(d,h.withResumeToken(l.resumeToken,s))}}),c.targetMismatches.forEach((l,d)=>{const h=a.Ia.get(l);if(!h)return;a.Ia.set(l,h.withResumeToken(Re.EMPTY_BYTE_STRING,h.snapshotVersion)),ph(a,l);const g=new Lt(h.target,l,d,h.sequenceNumber);Ai(a,g)}),a.remoteSyncer.applyRemoteEvent(c)}(n,t)}catch(o){U(fn,"Failed to raise snapshot:",o),await na(n,o)}}async function na(n,e,t){if(!to(e))throw e;n.Ea.add(1),await or(n),n.Ra.set("Offline"),t||(t=()=>lh(n.localStore)),n.asyncQueue.enqueueRetryable(async()=>{U(fn,"Retrying IndexedDB access"),await t(),n.Ea.delete(1),await ka(n)})}function mh(n,e){return e().catch(t=>na(n,t,e))}async function Ca(n){const e=Y(n),t=Kt(e);let o=e.Ta.length>0?e.Ta[e.Ta.length-1].batchId:hi;for(;_v(e);)try{const r=await ov(e.localStore,o);if(r===null){e.Ta.length===0&&t.L_();break}o=r.batchId,xv(e,r)}catch(r){await na(e,r)}fh(e)&&wh(e)}function _v(n){return En(n)&&n.Ta.length<10}function xv(n,e){n.Ta.push(e);const t=Kt(n);t.O_()&&t.X_&&t.ea(e.mutations)}function fh(n){return En(n)&&!Kt(n).x_()&&n.Ta.length>0}function wh(n){Kt(n).start()}async function Tv(n){Kt(n).ra()}async function Sv(n){const e=Kt(n);for(const t of n.Ta)e.ea(t.mutations)}async function Iv(n,e,t){const o=n.Ta.shift(),r=yi.from(o,e,t);await mh(n,()=>n.remoteSyncer.applySuccessfulWrite(r)),await Ca(n)}async function Av(n,e){e&&Kt(n).X_&&await async function(o,r){if(function(s){return cw(s)&&s!==M.ABORTED}(r.code)){const a=o.Ta.shift();Kt(o).B_(),await mh(o,()=>o.remoteSyncer.rejectFailedWrite(a.batchId,r)),await Ca(o)}}(n,e),fh(n)&&wh(n)}async function dd(n,e){const t=Y(n);t.asyncQueue.verifyOperationInProgress(),U(fn,"RemoteStore received new credentials");const o=En(t);t.Ea.add(3),await or(t),o&&t.Ra.set("Unknown"),await t.remoteSyncer.handleCredentialChange(e),t.Ea.delete(3),await ka(t)}async function kv(n,e){const t=Y(n);e?(t.Ea.delete(2),await ka(t)):e||(t.Ea.add(2),await or(t),t.Ra.set("Unknown"))}function oo(n){return n.ma||(n.ma=function(t,o,r){const a=Y(t);return a.sa(),new hv(o,a.connection,a.authCredentials,a.appCheckCredentials,a.serializer,r)}(n.datastore,n.asyncQueue,{Xo:vv.bind(null,n),t_:yv.bind(null,n),r_:bv.bind(null,n),H_:Ev.bind(null,n)}),n.da.push(async e=>{e?(n.ma.B_(),Ci(n)?ki(n):n.Ra.set("Unknown")):(await n.ma.stop(),gh(n))})),n.ma}function Kt(n){return n.fa||(n.fa=function(t,o,r){const a=Y(t);return a.sa(),new pv(o,a.connection,a.authCredentials,a.appCheckCredentials,a.serializer,r)}(n.datastore,n.asyncQueue,{Xo:()=>Promise.resolve(),t_:Tv.bind(null,n),r_:Av.bind(null,n),ta:Sv.bind(null,n),na:Iv.bind(null,n)}),n.da.push(async e=>{e?(n.fa.B_(),await Ca(n)):(await n.fa.stop(),n.Ta.length>0&&(U(fn,`Stopping write stream with ${n.Ta.length} pending writes`),n.Ta=[]))})),n.fa}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ri{constructor(e,t,o,r,a){this.asyncQueue=e,this.timerId=t,this.targetTimeMs=o,this.op=r,this.removalCallback=a,this.deferred=new Et,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(s=>{})}get promise(){return this.deferred.promise}static createAndSchedule(e,t,o,r,a){const s=Date.now()+o,c=new Ri(e,t,s,r,a);return c.start(o),c}start(e){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new V(M.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then(e=>this.deferred.resolve(e))):Promise.resolve())}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function Pi(n,e){if(St("AsyncQueue",`${e}: ${n}`),to(n))return new V(M.UNAVAILABLE,`${e}: ${n}`);throw n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fn{static emptySet(e){return new Fn(e.comparator)}constructor(e){this.comparator=e?(t,o)=>e(t,o)||j.comparator(t.key,o.key):(t,o)=>j.comparator(t.key,o.key),this.keyedMap=So(),this.sortedSet=new ve(this.comparator)}has(e){return this.keyedMap.get(e)!=null}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){const t=this.keyedMap.get(e);return t?this.sortedSet.indexOf(t):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal((t,o)=>(e(t),!1))}add(e){const t=this.delete(e.key);return t.copy(t.keyedMap.insert(e.key,e),t.sortedSet.insert(e,null))}delete(e){const t=this.get(e);return t?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(t)):this}isEqual(e){if(!(e instanceof Fn)||this.size!==e.size)return!1;const t=this.sortedSet.getIterator(),o=e.sortedSet.getIterator();for(;t.hasNext();){const r=t.getNext().key,a=o.getNext().key;if(!r.isEqual(a))return!1}return!0}toString(){const e=[];return this.forEach(t=>{e.push(t.toString())}),e.length===0?"DocumentSet ()":`DocumentSet (
  `+e.join(`  
`)+`
)`}copy(e,t){const o=new Fn;return o.comparator=this.comparator,o.keyedMap=e,o.sortedSet=t,o}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ud{constructor(){this.ga=new ve(j.comparator)}track(e){const t=e.doc.key,o=this.ga.get(t);o?e.type!==0&&o.type===3?this.ga=this.ga.insert(t,e):e.type===3&&o.type!==1?this.ga=this.ga.insert(t,{type:o.type,doc:e.doc}):e.type===2&&o.type===2?this.ga=this.ga.insert(t,{type:2,doc:e.doc}):e.type===2&&o.type===0?this.ga=this.ga.insert(t,{type:0,doc:e.doc}):e.type===1&&o.type===0?this.ga=this.ga.remove(t):e.type===1&&o.type===2?this.ga=this.ga.insert(t,{type:1,doc:o.doc}):e.type===0&&o.type===1?this.ga=this.ga.insert(t,{type:2,doc:e.doc}):G(63341,{Rt:e,pa:o}):this.ga=this.ga.insert(t,e)}ya(){const e=[];return this.ga.inorderTraversal((t,o)=>{e.push(o)}),e}}class Yn{constructor(e,t,o,r,a,s,c,l,d){this.query=e,this.docs=t,this.oldDocs=o,this.docChanges=r,this.mutatedKeys=a,this.fromCache=s,this.syncStateChanged=c,this.excludesMetadataChanges=l,this.hasCachedResults=d}static fromInitialDocuments(e,t,o,r,a){const s=[];return t.forEach(c=>{s.push({type:0,doc:c})}),new Yn(e,t,Fn.emptySet(t),s,o,r,!0,!1,a)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&Ea(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;const t=this.docChanges,o=e.docChanges;if(t.length!==o.length)return!1;for(let r=0;r<t.length;r++)if(t[r].type!==o[r].type||!t[r].doc.isEqual(o[r].doc))return!1;return!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Cv{constructor(){this.wa=void 0,this.Sa=[]}ba(){return this.Sa.some(e=>e.Da())}}class Rv{constructor(){this.queries=hd(),this.onlineState="Unknown",this.Ca=new Set}terminate(){(function(t,o){const r=Y(t),a=r.queries;r.queries=hd(),a.forEach((s,c)=>{for(const l of c.Sa)l.onError(o)})})(this,new V(M.ABORTED,"Firestore shutting down"))}}function hd(){return new bn(n=>Vu(n),Ea)}async function Di(n,e){const t=Y(n);let o=3;const r=e.query;let a=t.queries.get(r);a?!a.ba()&&e.Da()&&(o=2):(a=new Cv,o=e.Da()?0:1);try{switch(o){case 0:a.wa=await t.onListen(r,!0);break;case 1:a.wa=await t.onListen(r,!1);break;case 2:await t.onFirstRemoteStoreListen(r)}}catch(s){const c=Pi(s,`Initialization of query '${Mn(e.query)}' failed`);return void e.onError(c)}t.queries.set(r,a),a.Sa.push(e),e.va(t.onlineState),a.wa&&e.Fa(a.wa)&&Ni(t)}async function Mi(n,e){const t=Y(n),o=e.query;let r=3;const a=t.queries.get(o);if(a){const s=a.Sa.indexOf(e);s>=0&&(a.Sa.splice(s,1),a.Sa.length===0?r=e.Da()?0:1:!a.ba()&&e.Da()&&(r=2))}switch(r){case 0:return t.queries.delete(o),t.onUnlisten(o,!0);case 1:return t.queries.delete(o),t.onUnlisten(o,!1);case 2:return t.onLastRemoteStoreUnlisten(o);default:return}}function Pv(n,e){const t=Y(n);let o=!1;for(const r of e){const a=r.query,s=t.queries.get(a);if(s){for(const c of s.Sa)c.Fa(r)&&(o=!0);s.wa=r}}o&&Ni(t)}function Dv(n,e,t){const o=Y(n),r=o.queries.get(e);if(r)for(const a of r.Sa)a.onError(t);o.queries.delete(e)}function Ni(n){n.Ca.forEach(e=>{e.next()})}var Zs,pd;(pd=Zs||(Zs={})).Ma="default",pd.Cache="cache";class $i{constructor(e,t,o){this.query=e,this.xa=t,this.Oa=!1,this.Na=null,this.onlineState="Unknown",this.options=o||{}}Fa(e){if(!this.options.includeMetadataChanges){const o=[];for(const r of e.docChanges)r.type!==3&&o.push(r);e=new Yn(e.query,e.docs,e.oldDocs,o,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let t=!1;return this.Oa?this.Ba(e)&&(this.xa.next(e),t=!0):this.La(e,this.onlineState)&&(this.ka(e),t=!0),this.Na=e,t}onError(e){this.xa.error(e)}va(e){this.onlineState=e;let t=!1;return this.Na&&!this.Oa&&this.La(this.Na,e)&&(this.ka(this.Na),t=!0),t}La(e,t){if(!e.fromCache||!this.Da())return!0;const o=t!=="Offline";return(!this.options.qa||!o)&&(!e.docs.isEmpty()||e.hasCachedResults||t==="Offline")}Ba(e){if(e.docChanges.length>0)return!0;const t=this.Na&&this.Na.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!t)&&this.options.includeMetadataChanges===!0}ka(e){e=Yn.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.Oa=!0,this.xa.next(e)}Da(){return this.options.source!==Zs.Cache}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vh{constructor(e){this.key=e}}class yh{constructor(e){this.key=e}}class Mv{constructor(e,t){this.query=e,this.Ya=t,this.Za=null,this.hasCachedResults=!1,this.current=!1,this.Xa=te(),this.mutatedKeys=te(),this.eu=Ou(e),this.tu=new Fn(this.eu)}get nu(){return this.Ya}ru(e,t){const o=t?t.iu:new ud,r=t?t.tu:this.tu;let a=t?t.mutatedKeys:this.mutatedKeys,s=r,c=!1;const l=this.query.limitType==="F"&&r.size===this.query.limit?r.last():null,d=this.query.limitType==="L"&&r.size===this.query.limit?r.first():null;if(e.inorderTraversal((h,g)=>{const m=r.get(h),f=_a(this.query,g)?g:null,v=!!m&&this.mutatedKeys.has(m.key),b=!!f&&(f.hasLocalMutations||this.mutatedKeys.has(f.key)&&f.hasCommittedMutations);let T=!1;m&&f?m.data.isEqual(f.data)?v!==b&&(o.track({type:3,doc:f}),T=!0):this.su(m,f)||(o.track({type:2,doc:f}),T=!0,(l&&this.eu(f,l)>0||d&&this.eu(f,d)<0)&&(c=!0)):!m&&f?(o.track({type:0,doc:f}),T=!0):m&&!f&&(o.track({type:1,doc:m}),T=!0,(l||d)&&(c=!0)),T&&(f?(s=s.add(f),a=b?a.add(h):a.delete(h)):(s=s.delete(h),a=a.delete(h)))}),this.query.limit!==null)for(;s.size>this.query.limit;){const h=this.query.limitType==="F"?s.last():s.first();s=s.delete(h.key),a=a.delete(h.key),o.track({type:1,doc:h})}return{tu:s,iu:o,Cs:c,mutatedKeys:a}}su(e,t){return e.hasLocalMutations&&t.hasCommittedMutations&&!t.hasLocalMutations}applyChanges(e,t,o,r){const a=this.tu;this.tu=e.tu,this.mutatedKeys=e.mutatedKeys;const s=e.iu.ya();s.sort((h,g)=>function(f,v){const b=T=>{switch(T){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return G(20277,{Rt:T})}};return b(f)-b(v)}(h.type,g.type)||this.eu(h.doc,g.doc)),this.ou(o),r=r??!1;const c=t&&!r?this._u():[],l=this.Xa.size===0&&this.current&&!r?1:0,d=l!==this.Za;return this.Za=l,s.length!==0||d?{snapshot:new Yn(this.query,e.tu,a,s,e.mutatedKeys,l===0,d,!1,!!o&&o.resumeToken.approximateByteSize()>0),au:c}:{au:c}}va(e){return this.current&&e==="Offline"?(this.current=!1,this.applyChanges({tu:this.tu,iu:new ud,mutatedKeys:this.mutatedKeys,Cs:!1},!1)):{au:[]}}uu(e){return!this.Ya.has(e)&&!!this.tu.has(e)&&!this.tu.get(e).hasLocalMutations}ou(e){e&&(e.addedDocuments.forEach(t=>this.Ya=this.Ya.add(t)),e.modifiedDocuments.forEach(t=>{}),e.removedDocuments.forEach(t=>this.Ya=this.Ya.delete(t)),this.current=e.current)}_u(){if(!this.current)return[];const e=this.Xa;this.Xa=te(),this.tu.forEach(o=>{this.uu(o.key)&&(this.Xa=this.Xa.add(o.key))});const t=[];return e.forEach(o=>{this.Xa.has(o)||t.push(new yh(o))}),this.Xa.forEach(o=>{e.has(o)||t.push(new vh(o))}),t}cu(e){this.Ya=e.Qs,this.Xa=te();const t=this.ru(e.documents);return this.applyChanges(t,!0)}lu(){return Yn.fromInitialDocuments(this.query,this.tu,this.mutatedKeys,this.Za===0,this.hasCachedResults)}}const Li="SyncEngine";class Nv{constructor(e,t,o){this.query=e,this.targetId=t,this.view=o}}class $v{constructor(e){this.key=e,this.hu=!1}}class Lv{constructor(e,t,o,r,a,s){this.localStore=e,this.remoteStore=t,this.eventManager=o,this.sharedClientState=r,this.currentUser=a,this.maxConcurrentLimboResolutions=s,this.Pu={},this.Tu=new bn(c=>Vu(c),Ea),this.Iu=new Map,this.Eu=new Set,this.du=new ve(j.comparator),this.Au=new Map,this.Ru=new _i,this.Vu={},this.mu=new Map,this.fu=Kn.cr(),this.onlineState="Unknown",this.gu=void 0}get isPrimaryClient(){return this.gu===!0}}async function Fv(n,e,t=!0){const o=Sh(n);let r;const a=o.Tu.get(e);return a?(o.sharedClientState.addLocalQueryTarget(a.targetId),r=a.view.lu()):r=await bh(o,e,t,!0),r}async function Vv(n,e){const t=Sh(n);await bh(t,e,!0,!1)}async function bh(n,e,t,o){const r=await rv(n.localStore,ct(e)),a=r.targetId,s=n.sharedClientState.addLocalQueryTarget(a,t);let c;return o&&(c=await Ov(n,e,a,s==="current",r.resumeToken)),n.isPrimaryClient&&t&&hh(n.remoteStore,r),c}async function Ov(n,e,t,o,r){n.pu=(g,m,f)=>async function(b,T,D,L){let O=T.view.ru(D);O.Cs&&(O=await ad(b.localStore,T.query,!1).then(({documents:x})=>T.view.ru(x,O)));const Q=L&&L.targetChanges.get(T.targetId),J=L&&L.targetMismatches.get(T.targetId)!=null,ie=T.view.applyChanges(O,b.isPrimaryClient,Q,J);return md(b,T.targetId,ie.au),ie.snapshot}(n,g,m,f);const a=await ad(n.localStore,e,!0),s=new Mv(e,a.Qs),c=s.ru(a.documents),l=nr.createSynthesizedTargetChangeForCurrentChange(t,o&&n.onlineState!=="Offline",r),d=s.applyChanges(c,n.isPrimaryClient,l);md(n,t,d.au);const h=new Nv(e,t,s);return n.Tu.set(e,h),n.Iu.has(t)?n.Iu.get(t).push(e):n.Iu.set(t,[e]),d.snapshot}async function Bv(n,e,t){const o=Y(n),r=o.Tu.get(e),a=o.Iu.get(r.targetId);if(a.length>1)return o.Iu.set(r.targetId,a.filter(s=>!Ea(s,e))),void o.Tu.delete(e);o.isPrimaryClient?(o.sharedClientState.removeLocalQueryTarget(r.targetId),o.sharedClientState.isActiveQueryTarget(r.targetId)||await Qs(o.localStore,r.targetId,!1).then(()=>{o.sharedClientState.clearQueryState(r.targetId),t&&Ii(o.remoteStore,r.targetId),ei(o,r.targetId)}).catch(eo)):(ei(o,r.targetId),await Qs(o.localStore,r.targetId,!0))}async function Uv(n,e){const t=Y(n),o=t.Tu.get(e),r=t.Iu.get(o.targetId);t.isPrimaryClient&&r.length===1&&(t.sharedClientState.removeLocalQueryTarget(o.targetId),Ii(t.remoteStore,o.targetId))}async function zv(n,e,t){const o=Yv(n);try{const r=await function(s,c){const l=Y(s),d=ue.now(),h=c.reduce((f,v)=>f.add(v.key),te());let g,m;return l.persistence.runTransaction("Locally write mutations","readwrite",f=>{let v=It(),b=te();return l.Ns.getEntries(f,h).next(T=>{v=T,v.forEach((D,L)=>{L.isValidDocument()||(b=b.add(D))})}).next(()=>l.localDocuments.getOverlayedDocuments(f,v)).next(T=>{g=T;const D=[];for(const L of c){const O=ow(L,g.get(L.key).overlayedDocument);O!=null&&D.push(new Zt(L.key,O,Ru(O.value.mapValue),Ge.exists(!0)))}return l.mutationQueue.addMutationBatch(f,d,D,c)}).next(T=>{m=T;const D=T.applyToLocalDocumentSet(g,b);return l.documentOverlayCache.saveOverlays(f,T.batchId,D)})}).then(()=>({batchId:m.batchId,changes:Uu(g)}))}(o.localStore,e);o.sharedClientState.addPendingMutation(r.batchId),function(s,c,l){let d=s.Vu[s.currentUser.toKey()];d||(d=new ve(ee)),d=d.insert(c,l),s.Vu[s.currentUser.toKey()]=d}(o,r.batchId,t),await rr(o,r.changes),await Ca(o.remoteStore)}catch(r){const a=Pi(r,"Failed to persist write");t.reject(a)}}async function Eh(n,e){const t=Y(n);try{const o=await tv(t.localStore,e);e.targetChanges.forEach((r,a)=>{const s=t.Au.get(a);s&&(se(r.addedDocuments.size+r.modifiedDocuments.size+r.removedDocuments.size<=1,22616),r.addedDocuments.size>0?s.hu=!0:r.modifiedDocuments.size>0?se(s.hu,14607):r.removedDocuments.size>0&&(se(s.hu,42227),s.hu=!1))}),await rr(t,o,e)}catch(o){await eo(o)}}function gd(n,e,t){const o=Y(n);if(o.isPrimaryClient&&t===0||!o.isPrimaryClient&&t===1){const r=[];o.Tu.forEach((a,s)=>{const c=s.view.va(e);c.snapshot&&r.push(c.snapshot)}),function(s,c){const l=Y(s);l.onlineState=c;let d=!1;l.queries.forEach((h,g)=>{for(const m of g.Sa)m.va(c)&&(d=!0)}),d&&Ni(l)}(o.eventManager,e),r.length&&o.Pu.H_(r),o.onlineState=e,o.isPrimaryClient&&o.sharedClientState.setOnlineState(e)}}async function qv(n,e,t){const o=Y(n);o.sharedClientState.updateQueryState(e,"rejected",t);const r=o.Au.get(e),a=r&&r.key;if(a){let s=new ve(j.comparator);s=s.insert(a,Be.newNoDocument(a,K.min()));const c=te().add(a),l=new Ia(K.min(),new Map,new ve(ee),s,c);await Eh(o,l),o.du=o.du.remove(a),o.Au.delete(e),Fi(o)}else await Qs(o.localStore,e,!1).then(()=>ei(o,e,t)).catch(eo)}async function jv(n,e){const t=Y(n),o=e.batch.batchId;try{const r=await ev(t.localStore,e);xh(t,o,null),_h(t,o),t.sharedClientState.updateMutationState(o,"acknowledged"),await rr(t,r)}catch(r){await eo(r)}}async function Hv(n,e,t){const o=Y(n);try{const r=await function(s,c){const l=Y(s);return l.persistence.runTransaction("Reject batch","readwrite-primary",d=>{let h;return l.mutationQueue.lookupMutationBatch(d,c).next(g=>(se(g!==null,37113),h=g.keys(),l.mutationQueue.removeMutationBatch(d,g))).next(()=>l.mutationQueue.performConsistencyCheck(d)).next(()=>l.documentOverlayCache.removeOverlaysForBatchId(d,h,c)).next(()=>l.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(d,h)).next(()=>l.localDocuments.getDocuments(d,h))})}(o.localStore,e);xh(o,e,t),_h(o,e),o.sharedClientState.updateMutationState(e,"rejected",t),await rr(o,r)}catch(r){await eo(r)}}function _h(n,e){(n.mu.get(e)||[]).forEach(t=>{t.resolve()}),n.mu.delete(e)}function xh(n,e,t){const o=Y(n);let r=o.Vu[o.currentUser.toKey()];if(r){const a=r.get(e);a&&(t?a.reject(t):a.resolve(),r=r.remove(e)),o.Vu[o.currentUser.toKey()]=r}}function ei(n,e,t=null){n.sharedClientState.removeLocalQueryTarget(e);for(const o of n.Iu.get(e))n.Tu.delete(o),t&&n.Pu.yu(o,t);n.Iu.delete(e),n.isPrimaryClient&&n.Ru.jr(e).forEach(o=>{n.Ru.containsKey(o)||Th(n,o)})}function Th(n,e){n.Eu.delete(e.path.canonicalString());const t=n.du.get(e);t!==null&&(Ii(n.remoteStore,t),n.du=n.du.remove(e),n.Au.delete(t),Fi(n))}function md(n,e,t){for(const o of t)o instanceof vh?(n.Ru.addReference(o.key,e),Gv(n,o)):o instanceof yh?(U(Li,"Document no longer in limbo: "+o.key),n.Ru.removeReference(o.key,e),n.Ru.containsKey(o.key)||Th(n,o.key)):G(19791,{wu:o})}function Gv(n,e){const t=e.key,o=t.path.canonicalString();n.du.get(t)||n.Eu.has(o)||(U(Li,"New document in limbo: "+t),n.Eu.add(o),Fi(n))}function Fi(n){for(;n.Eu.size>0&&n.du.size<n.maxConcurrentLimboResolutions;){const e=n.Eu.values().next().value;n.Eu.delete(e);const t=new j(de.fromString(e)),o=n.fu.next();n.Au.set(o,new $v(t)),n.du=n.du.insert(t,o),hh(n.remoteStore,new Lt(ct(ba(t.path)),o,"TargetPurposeLimboResolution",wa.ce))}}async function rr(n,e,t){const o=Y(n),r=[],a=[],s=[];o.Tu.isEmpty()||(o.Tu.forEach((c,l)=>{s.push(o.pu(l,e,t).then(d=>{if((d||t)&&o.isPrimaryClient){const h=d?!d.fromCache:t?.targetChanges.get(l.targetId)?.current;o.sharedClientState.updateQueryState(l.targetId,h?"current":"not-current")}if(d){r.push(d);const h=Ti.As(l.targetId,d);a.push(h)}}))}),await Promise.all(s),o.Pu.H_(r),await async function(l,d){const h=Y(l);try{await h.persistence.runTransaction("notifyLocalViewChanges","readwrite",g=>$.forEach(d,m=>$.forEach(m.Es,f=>h.persistence.referenceDelegate.addReference(g,m.targetId,f)).next(()=>$.forEach(m.ds,f=>h.persistence.referenceDelegate.removeReference(g,m.targetId,f)))))}catch(g){if(!to(g))throw g;U(Si,"Failed to update sequence numbers: "+g)}for(const g of d){const m=g.targetId;if(!g.fromCache){const f=h.Ms.get(m),v=f.snapshotVersion,b=f.withLastLimboFreeSnapshotVersion(v);h.Ms=h.Ms.insert(m,b)}}}(o.localStore,a))}async function Wv(n,e){const t=Y(n);if(!t.currentUser.isEqual(e)){U(Li,"User change. New user:",e.toKey());const o=await ch(t.localStore,e);t.currentUser=e,function(a,s){a.mu.forEach(c=>{c.forEach(l=>{l.reject(new V(M.CANCELLED,s))})}),a.mu.clear()}(t,"'waitForPendingWrites' promise is rejected due to a user change."),t.sharedClientState.handleUserChange(e,o.removedBatchIds,o.addedBatchIds),await rr(t,o.Ls)}}function Kv(n,e){const t=Y(n),o=t.Au.get(e);if(o&&o.hu)return te().add(o.key);{let r=te();const a=t.Iu.get(e);if(!a)return r;for(const s of a){const c=t.Tu.get(s);r=r.unionWith(c.view.nu)}return r}}function Sh(n){const e=Y(n);return e.remoteStore.remoteSyncer.applyRemoteEvent=Eh.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=Kv.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=qv.bind(null,e),e.Pu.H_=Pv.bind(null,e.eventManager),e.Pu.yu=Dv.bind(null,e.eventManager),e}function Yv(n){const e=Y(n);return e.remoteStore.remoteSyncer.applySuccessfulWrite=jv.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=Hv.bind(null,e),e}class oa{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(e){this.serializer=Aa(e.databaseInfo.databaseId),this.sharedClientState=this.Du(e),this.persistence=this.Cu(e),await this.persistence.start(),this.localStore=this.vu(e),this.gcScheduler=this.Fu(e,this.localStore),this.indexBackfillerScheduler=this.Mu(e,this.localStore)}Fu(e,t){return null}Mu(e,t){return null}vu(e){return Zw(this.persistence,new Xw,e.initialUser,this.serializer)}Cu(e){return new ih(xi.mi,this.serializer)}Du(e){return new sv}async terminate(){this.gcScheduler?.stop(),this.indexBackfillerScheduler?.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}oa.provider={build:()=>new oa};class Xv extends oa{constructor(e){super(),this.cacheSizeBytes=e}Fu(e,t){se(this.persistence.referenceDelegate instanceof ta,46915);const o=this.persistence.referenceDelegate.garbageCollector;return new $w(o,e.asyncQueue,t)}Cu(e){const t=this.cacheSizeBytes!==void 0?We.withCacheSize(this.cacheSizeBytes):We.DEFAULT;return new ih(o=>ta.mi(o,t),this.serializer)}}class ti{async initialize(e,t){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(t),this.remoteStore=this.createRemoteStore(t),this.eventManager=this.createEventManager(t),this.syncEngine=this.createSyncEngine(t,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=o=>gd(this.syncEngine,o,1),this.remoteStore.remoteSyncer.handleCredentialChange=Wv.bind(null,this.syncEngine),await kv(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return function(){return new Rv}()}createDatastore(e){const t=Aa(e.databaseInfo.databaseId),o=function(a){return new uv(a)}(e.databaseInfo);return function(a,s,c,l){return new mv(a,s,c,l)}(e.authCredentials,e.appCheckCredentials,o,t)}createRemoteStore(e){return function(o,r,a,s,c){return new wv(o,r,a,s,c)}(this.localStore,this.datastore,e.asyncQueue,t=>gd(this.syncEngine,t,0),function(){return cd.v()?new cd:new iv}())}createSyncEngine(e,t){return function(r,a,s,c,l,d,h){const g=new Lv(r,a,s,c,l,d);return h&&(g.gu=!0),g}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,t)}async terminate(){await async function(t){const o=Y(t);U(fn,"RemoteStore shutting down."),o.Ea.add(5),await or(o),o.Aa.shutdown(),o.Ra.set("Unknown")}(this.remoteStore),this.datastore?.terminate(),this.eventManager?.terminate()}}ti.provider={build:()=>new ti};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vi{constructor(e){this.observer=e,this.muted=!1}next(e){this.muted||this.observer.next&&this.Ou(this.observer.next,e)}error(e){this.muted||(this.observer.error?this.Ou(this.observer.error,e):St("Uncaught Error in snapshot listener:",e.toString()))}Nu(){this.muted=!0}Ou(e,t){setTimeout(()=>{this.muted||e(t)},0)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Yt="FirestoreClient";class Qv{constructor(e,t,o,r,a){this.authCredentials=e,this.appCheckCredentials=t,this.asyncQueue=o,this.databaseInfo=r,this.user=Oe.UNAUTHENTICATED,this.clientId=ma.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=a,this.authCredentials.start(o,async s=>{U(Yt,"Received user=",s.uid),await this.authCredentialListener(s),this.user=s}),this.appCheckCredentials.start(o,s=>(U(Yt,"Received new app check token=",s),this.appCheckCredentialListener(s,this.user)))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}terminate(){this.asyncQueue.enterRestrictedMode();const e=new Et;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(t){const o=Pi(t,"Failed to shutdown persistence");e.reject(o)}}),e.promise}}async function Cs(n,e){n.asyncQueue.verifyOperationInProgress(),U(Yt,"Initializing OfflineComponentProvider");const t=n.configuration;await e.initialize(t);let o=t.initialUser;n.setCredentialChangeListener(async r=>{o.isEqual(r)||(await ch(e.localStore,r),o=r)}),e.persistence.setDatabaseDeletedListener(()=>n.terminate()),n._offlineComponents=e}async function fd(n,e){n.asyncQueue.verifyOperationInProgress();const t=await Jv(n);U(Yt,"Initializing OnlineComponentProvider"),await e.initialize(t,n.configuration),n.setCredentialChangeListener(o=>dd(e.remoteStore,o)),n.setAppCheckTokenChangeListener((o,r)=>dd(e.remoteStore,r)),n._onlineComponents=e}async function Jv(n){if(!n._offlineComponents)if(n._uninitializedComponentsProvider){U(Yt,"Using user provided OfflineComponentProvider");try{await Cs(n,n._uninitializedComponentsProvider._offline)}catch(e){const t=e;if(!function(r){return r.name==="FirebaseError"?r.code===M.FAILED_PRECONDITION||r.code===M.UNIMPLEMENTED:!(typeof DOMException<"u"&&r instanceof DOMException)||r.code===22||r.code===20||r.code===11}(t))throw t;mn("Error using user provided cache. Falling back to memory cache: "+t),await Cs(n,new oa)}}else U(Yt,"Using default OfflineComponentProvider"),await Cs(n,new Xv(void 0));return n._offlineComponents}async function Ih(n){return n._onlineComponents||(n._uninitializedComponentsProvider?(U(Yt,"Using user provided OnlineComponentProvider"),await fd(n,n._uninitializedComponentsProvider._online)):(U(Yt,"Using default OnlineComponentProvider"),await fd(n,new ti))),n._onlineComponents}function Zv(n){return Ih(n).then(e=>e.syncEngine)}async function ra(n){const e=await Ih(n),t=e.eventManager;return t.onListen=Fv.bind(null,e.syncEngine),t.onUnlisten=Bv.bind(null,e.syncEngine),t.onFirstRemoteStoreListen=Vv.bind(null,e.syncEngine),t.onLastRemoteStoreUnlisten=Uv.bind(null,e.syncEngine),t}function ey(n,e,t={}){const o=new Et;return n.asyncQueue.enqueueAndForget(async()=>function(a,s,c,l,d){const h=new Vi({next:m=>{h.Nu(),s.enqueueAndForget(()=>Mi(a,g));const f=m.docs.has(c);!f&&m.fromCache?d.reject(new V(M.UNAVAILABLE,"Failed to get document because the client is offline.")):f&&m.fromCache&&l&&l.source==="server"?d.reject(new V(M.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):d.resolve(m)},error:m=>d.reject(m)}),g=new $i(ba(c.path),h,{includeMetadataChanges:!0,qa:!0});return Di(a,g)}(await ra(n),n.asyncQueue,e,t,o)),o.promise}function ty(n,e,t={}){const o=new Et;return n.asyncQueue.enqueueAndForget(async()=>function(a,s,c,l,d){const h=new Vi({next:m=>{h.Nu(),s.enqueueAndForget(()=>Mi(a,g)),m.fromCache&&l.source==="server"?d.reject(new V(M.UNAVAILABLE,'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')):d.resolve(m)},error:m=>d.reject(m)}),g=new $i(c,h,{includeMetadataChanges:!0,qa:!0});return Di(a,g)}(await ra(n),n.asyncQueue,e,t,o)),o.promise}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ah(n){const e={};return n.timeoutSeconds!==void 0&&(e.timeoutSeconds=n.timeoutSeconds),e}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const wd=new Map;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const kh="firestore.googleapis.com",vd=!0;class yd{constructor(e){if(e.host===void 0){if(e.ssl!==void 0)throw new V(M.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=kh,this.ssl=vd}else this.host=e.host,this.ssl=e.ssl??vd;if(this.isUsingEmulator=e.emulatorOptions!==void 0,this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=sh;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<Mw)throw new V(M.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}yu("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=Ah(e.experimentalLongPollingOptions??{}),function(o){if(o.timeoutSeconds!==void 0){if(isNaN(o.timeoutSeconds))throw new V(M.INVALID_ARGUMENT,`invalid long polling timeout: ${o.timeoutSeconds} (must not be NaN)`);if(o.timeoutSeconds<5)throw new V(M.INVALID_ARGUMENT,`invalid long polling timeout: ${o.timeoutSeconds} (minimum allowed value is 5)`);if(o.timeoutSeconds>30)throw new V(M.INVALID_ARGUMENT,`invalid long polling timeout: ${o.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&function(o,r){return o.timeoutSeconds===r.timeoutSeconds}(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class Ra{constructor(e,t,o,r){this._authCredentials=e,this._appCheckCredentials=t,this._databaseId=o,this._app=r,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new yd({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new V(M.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new V(M.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new yd(e),this._emulatorOptions=e.emulatorOptions||{},e.credentials!==void 0&&(this._authCredentials=function(o){if(!o)return new wu;switch(o.type){case"firstParty":return new uf(o.sessionIndex||"0",o.iamToken||null,o.authTokenFactory||null);case"provider":return o.client;default:throw new V(M.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(t){const o=wd.get(t);o&&(U("ComponentProvider","Removing Datastore"),wd.delete(t),o.terminate())}(this),Promise.resolve()}}function Ch(n,e,t,o={}){n=Ue(n,Ra);const r=Qn(e),a=n._getSettings(),s={...a,emulatorOptions:n._getEmulatorOptions()},c=`${e}:${t}`;r&&(tu(`https://${c}`),nu("Firestore",!0)),a.host!==kh&&a.host!==c&&mn("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used.");const l={...a,host:c,ssl:r,emulatorOptions:o};if(!xt(l,s)&&(n._setSettings(l),o.mockUserToken)){let d,h;if(typeof o.mockUserToken=="string")d=o.mockUserToken,h=Oe.MOCK_USER;else{d=Ng(o.mockUserToken,n._app?.options.projectId);const g=o.mockUserToken.sub||o.mockUserToken.user_id;if(!g)throw new V(M.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");h=new Oe(g)}n._authCredentials=new cf(new fu(d,h))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gt{constructor(e,t,o){this.converter=t,this._query=o,this.type="query",this.firestore=e}withConverter(e){return new gt(this.firestore,e,this._query)}}class we{constructor(e,t,o){this.converter=t,this._key=o,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new _t(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new we(this.firestore,e,this._key)}toJSON(){return{type:we._jsonSchemaVersion,referencePath:this._key.toString()}}static fromJSON(e,t,o){if(er(t,we._jsonSchema))return new we(e,o||null,new j(de.fromString(t.referencePath)))}}we._jsonSchemaVersion="firestore/documentReference/1.0",we._jsonSchema={type:xe("string",we._jsonSchemaVersion),referencePath:xe("string")};class _t extends gt{constructor(e,t,o){super(e,t,ba(o)),this._path=o,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new we(this.firestore,null,new j(e))}withConverter(e){return new _t(this.firestore,e,this._path)}}function oe(n,e,...t){if(n=Ie(n),vu("collection","path",e),n instanceof Ra){const o=de.fromString(e,...t);return Dl(o),new _t(n,null,o)}{if(!(n instanceof we||n instanceof _t))throw new V(M.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const o=n._path.child(de.fromString(e,...t));return Dl(o),new _t(n.firestore,null,o)}}function qe(n,e,...t){if(n=Ie(n),arguments.length===1&&(e=ma.newId()),vu("doc","path",e),n instanceof Ra){const o=de.fromString(e,...t);return Pl(o),new we(n,null,new j(o))}{if(!(n instanceof we||n instanceof _t))throw new V(M.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const o=n._path.child(de.fromString(e,...t));return Pl(o),new we(n.firestore,n instanceof _t?n.converter:null,new j(o))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const bd="AsyncQueue";class Ed{constructor(e=Promise.resolve()){this.Xu=[],this.ec=!1,this.tc=[],this.nc=null,this.rc=!1,this.sc=!1,this.oc=[],this.M_=new dh(this,"async_queue_retry"),this._c=()=>{const o=ks();o&&U(bd,"Visibility state changed to "+o.visibilityState),this.M_.w_()},this.ac=e;const t=ks();t&&typeof t.addEventListener=="function"&&t.addEventListener("visibilitychange",this._c)}get isShuttingDown(){return this.ec}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.uc(),this.cc(e)}enterRestrictedMode(e){if(!this.ec){this.ec=!0,this.sc=e||!1;const t=ks();t&&typeof t.removeEventListener=="function"&&t.removeEventListener("visibilitychange",this._c)}}enqueue(e){if(this.uc(),this.ec)return new Promise(()=>{});const t=new Et;return this.cc(()=>this.ec&&this.sc?Promise.resolve():(e().then(t.resolve,t.reject),t.promise)).then(()=>t.promise)}enqueueRetryable(e){this.enqueueAndForget(()=>(this.Xu.push(e),this.lc()))}async lc(){if(this.Xu.length!==0){try{await this.Xu[0](),this.Xu.shift(),this.M_.reset()}catch(e){if(!to(e))throw e;U(bd,"Operation failed with retryable error: "+e)}this.Xu.length>0&&this.M_.p_(()=>this.lc())}}cc(e){const t=this.ac.then(()=>(this.rc=!0,e().catch(o=>{throw this.nc=o,this.rc=!1,St("INTERNAL UNHANDLED ERROR: ",_d(o)),o}).then(o=>(this.rc=!1,o))));return this.ac=t,t}enqueueAfterDelay(e,t,o){this.uc(),this.oc.indexOf(e)>-1&&(t=0);const r=Ri.createAndSchedule(this,e,t,o,a=>this.hc(a));return this.tc.push(r),r}uc(){this.nc&&G(47125,{Pc:_d(this.nc)})}verifyOperationInProgress(){}async Tc(){let e;do e=this.ac,await e;while(e!==this.ac)}Ic(e){for(const t of this.tc)if(t.timerId===e)return!0;return!1}Ec(e){return this.Tc().then(()=>{this.tc.sort((t,o)=>t.targetTimeMs-o.targetTimeMs);for(const t of this.tc)if(t.skipDelay(),e!=="all"&&t.timerId===e)break;return this.Tc()})}dc(e){this.oc.push(e)}hc(e){const t=this.tc.indexOf(e);this.tc.splice(t,1)}}function _d(n){let e=n.message||"";return n.stack&&(e=n.stack.includes(n.message)?n.stack:n.message+`
`+n.stack),e}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function xd(n){return function(t,o){if(typeof t!="object"||t===null)return!1;const r=t;for(const a of o)if(a in r&&typeof r[a]=="function")return!0;return!1}(n,["next","error","complete"])}class st extends Ra{constructor(e,t,o,r){super(e,t,o,r),this.type="firestore",this._queue=new Ed,this._persistenceKey=r?.name||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new Ed(e),this._firestoreClient=void 0,await e}}}function Rh(n,e){const t=typeof n=="object"?n:su(),o=typeof n=="string"?n:Yr,r=di(t,"firestore").getImmediate({identifier:o});if(!r._initialized){const a=Dg("firestore");a&&Ch(r,...a)}return r}function ro(n){if(n._terminated)throw new V(M.FAILED_PRECONDITION,"The client has already been terminated.");return n._firestoreClient||ny(n),n._firestoreClient}function ny(n){const e=n._freezeSettings(),t=function(r,a,s,c){return new kf(r,a,s,c.host,c.ssl,c.experimentalForceLongPolling,c.experimentalAutoDetectLongPolling,Ah(c.experimentalLongPollingOptions),c.useFetchStreams,c.isUsingEmulator)}(n._databaseId,n._app?.options.appId||"",n._persistenceKey,e);n._componentsProvider||e.localCache?._offlineComponentProvider&&e.localCache?._onlineComponentProvider&&(n._componentsProvider={_offline:e.localCache._offlineComponentProvider,_online:e.localCache._onlineComponentProvider}),n._firestoreClient=new Qv(n._authCredentials,n._appCheckCredentials,n._queue,t,n._componentsProvider&&function(r){const a=r?._online.build();return{_offline:r?._offline.build(a),_online:a}}(n._componentsProvider))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xe{constructor(e){this._byteString=e}static fromBase64String(e){try{return new Xe(Re.fromBase64String(e))}catch(t){throw new V(M.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+t)}}static fromUint8Array(e){return new Xe(Re.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}toJSON(){return{type:Xe._jsonSchemaVersion,bytes:this.toBase64()}}static fromJSON(e){if(er(e,Xe._jsonSchema))return Xe.fromBase64String(e.bytes)}}Xe._jsonSchemaVersion="firestore/bytes/1.0",Xe._jsonSchema={type:xe("string",Xe._jsonSchemaVersion),bytes:xe("string")};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ao{constructor(...e){for(let t=0;t<e.length;++t)if(e[t].length===0)throw new V(M.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new Ce(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _n{constructor(e){this._methodName=e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nt{constructor(e,t){if(!isFinite(e)||e<-90||e>90)throw new V(M.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(t)||t<-180||t>180)throw new V(M.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+t);this._lat=e,this._long=t}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}_compareTo(e){return ee(this._lat,e._lat)||ee(this._long,e._long)}toJSON(){return{latitude:this._lat,longitude:this._long,type:nt._jsonSchemaVersion}}static fromJSON(e){if(er(e,nt._jsonSchema))return new nt(e.latitude,e.longitude)}}nt._jsonSchemaVersion="firestore/geoPoint/1.0",nt._jsonSchema={type:xe("string",nt._jsonSchemaVersion),latitude:xe("number"),longitude:xe("number")};/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ot{constructor(e){this._values=(e||[]).map(t=>t)}toArray(){return this._values.map(e=>e)}isEqual(e){return function(o,r){if(o.length!==r.length)return!1;for(let a=0;a<o.length;++a)if(o[a]!==r[a])return!1;return!0}(this._values,e._values)}toJSON(){return{type:ot._jsonSchemaVersion,vectorValues:this._values}}static fromJSON(e){if(er(e,ot._jsonSchema)){if(Array.isArray(e.vectorValues)&&e.vectorValues.every(t=>typeof t=="number"))return new ot(e.vectorValues);throw new V(M.INVALID_ARGUMENT,"Expected 'vectorValues' field to be a number array")}}}ot._jsonSchemaVersion="firestore/vectorValue/1.0",ot._jsonSchema={type:xe("string",ot._jsonSchemaVersion),vectorValues:xe("object")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const oy=/^__.*__$/;class ry{constructor(e,t,o){this.data=e,this.fieldMask=t,this.fieldTransforms=o}toMutation(e,t){return this.fieldMask!==null?new Zt(e,this.data,this.fieldMask,t,this.fieldTransforms):new tr(e,this.data,t,this.fieldTransforms)}}class Ph{constructor(e,t,o){this.data=e,this.fieldMask=t,this.fieldTransforms=o}toMutation(e,t){return new Zt(e,this.data,this.fieldMask,t,this.fieldTransforms)}}function Dh(n){switch(n){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw G(40011,{Ac:n})}}class Pa{constructor(e,t,o,r,a,s){this.settings=e,this.databaseId=t,this.serializer=o,this.ignoreUndefinedProperties=r,a===void 0&&this.Rc(),this.fieldTransforms=a||[],this.fieldMask=s||[]}get path(){return this.settings.path}get Ac(){return this.settings.Ac}Vc(e){return new Pa({...this.settings,...e},this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}mc(e){const t=this.path?.child(e),o=this.Vc({path:t,fc:!1});return o.gc(e),o}yc(e){const t=this.path?.child(e),o=this.Vc({path:t,fc:!1});return o.Rc(),o}wc(e){return this.Vc({path:void 0,fc:!0})}Sc(e){return aa(e,this.settings.methodName,this.settings.bc||!1,this.path,this.settings.Dc)}contains(e){return this.fieldMask.find(t=>e.isPrefixOf(t))!==void 0||this.fieldTransforms.find(t=>e.isPrefixOf(t.field))!==void 0}Rc(){if(this.path)for(let e=0;e<this.path.length;e++)this.gc(this.path.get(e))}gc(e){if(e.length===0)throw this.Sc("Document fields must not be empty");if(Dh(this.Ac)&&oy.test(e))throw this.Sc('Document fields cannot begin and end with "__"')}}class ay{constructor(e,t,o){this.databaseId=e,this.ignoreUndefinedProperties=t,this.serializer=o||Aa(e)}Cc(e,t,o,r=!1){return new Pa({Ac:e,methodName:t,Dc:o,path:Ce.emptyPath(),fc:!1,bc:r},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function ar(n){const e=n._freezeSettings(),t=Aa(n._databaseId);return new ay(n._databaseId,!!e.ignoreUndefinedProperties,t)}function Oi(n,e,t,o,r,a={}){const s=n.Cc(a.merge||a.mergeFields?2:0,e,t,r);qi("Data must be an object, but it was:",s,o);const c=Lh(o,s);let l,d;if(a.merge)l=new Je(s.fieldMask),d=s.fieldTransforms;else if(a.mergeFields){const h=[];for(const g of a.mergeFields){const m=ni(e,g,t);if(!s.contains(m))throw new V(M.INVALID_ARGUMENT,`Field '${m}' is specified in your field mask but missing from your input data.`);Vh(h,m)||h.push(m)}l=new Je(h),d=s.fieldTransforms.filter(g=>l.covers(g.field))}else l=null,d=s.fieldTransforms;return new ry(new Ke(c),l,d)}class Da extends _n{_toFieldTransform(e){if(e.Ac!==2)throw e.Ac===1?e.Sc(`${this._methodName}() can only appear at the top level of your update data`):e.Sc(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return e.fieldMask.push(e.path),null}isEqual(e){return e instanceof Da}}function Mh(n,e,t){return new Pa({Ac:3,Dc:e.settings.Dc,methodName:n._methodName,fc:t},e.databaseId,e.serializer,e.ignoreUndefinedProperties)}class Bi extends _n{_toFieldTransform(e){return new vi(e.path,new Ho)}isEqual(e){return e instanceof Bi}}class Ui extends _n{constructor(e,t){super(e),this.vc=t}_toFieldTransform(e){const t=Mh(this,e,!0),o=this.vc.map(a=>xn(a,t)),r=new Gn(o);return new vi(e.path,r)}isEqual(e){return e instanceof Ui&&xt(this.vc,e.vc)}}class zi extends _n{constructor(e,t){super(e),this.vc=t}_toFieldTransform(e){const t=Mh(this,e,!0),o=this.vc.map(a=>xn(a,t)),r=new Wn(o);return new vi(e.path,r)}isEqual(e){return e instanceof zi&&xt(this.vc,e.vc)}}function Nh(n,e,t,o){const r=n.Cc(1,e,t);qi("Data must be an object, but it was:",r,o);const a=[],s=Ke.empty();Jt(o,(l,d)=>{const h=ji(e,l,t);d=Ie(d);const g=r.yc(h);if(d instanceof Da)a.push(h);else{const m=xn(d,g);m!=null&&(a.push(h),s.set(h,m))}});const c=new Je(a);return new Ph(s,c,r.fieldTransforms)}function $h(n,e,t,o,r,a){const s=n.Cc(1,e,t),c=[ni(e,o,t)],l=[r];if(a.length%2!=0)throw new V(M.INVALID_ARGUMENT,`Function ${e}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let m=0;m<a.length;m+=2)c.push(ni(e,a[m])),l.push(a[m+1]);const d=[],h=Ke.empty();for(let m=c.length-1;m>=0;--m)if(!Vh(d,c[m])){const f=c[m];let v=l[m];v=Ie(v);const b=s.yc(f);if(v instanceof Da)d.push(f);else{const T=xn(v,b);T!=null&&(d.push(f),h.set(f,T))}}const g=new Je(d);return new Ph(h,g,s.fieldTransforms)}function sy(n,e,t,o=!1){return xn(t,n.Cc(o?4:3,e))}function xn(n,e){if(Fh(n=Ie(n)))return qi("Unsupported field value:",e,n),Lh(n,e);if(n instanceof _n)return function(o,r){if(!Dh(r.Ac))throw r.Sc(`${o._methodName}() can only be used with update() and set()`);if(!r.path)throw r.Sc(`${o._methodName}() is not currently supported inside arrays`);const a=o._toFieldTransform(r);a&&r.fieldTransforms.push(a)}(n,e),null;if(n===void 0&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),n instanceof Array){if(e.settings.fc&&e.Ac!==4)throw e.Sc("Nested arrays are not supported");return function(o,r){const a=[];let s=0;for(const c of o){let l=xn(c,r.wc(s));l==null&&(l={nullValue:"NULL_VALUE"}),a.push(l),s++}return{arrayValue:{values:a}}}(n,e)}return function(o,r){if((o=Ie(o))===null)return{nullValue:"NULL_VALUE"};if(typeof o=="number")return Qf(r.serializer,o);if(typeof o=="boolean")return{booleanValue:o};if(typeof o=="string")return{stringValue:o};if(o instanceof Date){const a=ue.fromDate(o);return{timestampValue:ea(r.serializer,a)}}if(o instanceof ue){const a=new ue(o.seconds,1e3*Math.floor(o.nanoseconds/1e3));return{timestampValue:ea(r.serializer,a)}}if(o instanceof nt)return{geoPointValue:{latitude:o.latitude,longitude:o.longitude}};if(o instanceof Xe)return{bytesValue:Zu(r.serializer,o._byteString)};if(o instanceof we){const a=r.databaseId,s=o.firestore._databaseId;if(!s.isEqual(a))throw r.Sc(`Document reference is for database ${s.projectId}/${s.database} but should be for database ${a.projectId}/${a.database}`);return{referenceValue:Ei(o.firestore._databaseId||r.databaseId,o._key.path)}}if(o instanceof ot)return function(s,c){return{mapValue:{fields:{[ku]:{stringValue:Cu},[Xr]:{arrayValue:{values:s.toArray().map(d=>{if(typeof d!="number")throw c.Sc("VectorValues must only contain numeric values.");return wi(c.serializer,d)})}}}}}}(o,r);throw r.Sc(`Unsupported field value: ${fa(o)}`)}(n,e)}function Lh(n,e){const t={};return _u(n)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):Jt(n,(o,r)=>{const a=xn(r,e.mc(o));a!=null&&(t[o]=a)}),{mapValue:{fields:t}}}function Fh(n){return!(typeof n!="object"||n===null||n instanceof Array||n instanceof Date||n instanceof ue||n instanceof nt||n instanceof Xe||n instanceof we||n instanceof _n||n instanceof ot)}function qi(n,e,t){if(!Fh(t)||!bu(t)){const o=fa(t);throw o==="an object"?e.Sc(n+" a custom object"):e.Sc(n+" "+o)}}function ni(n,e,t){if((e=Ie(e))instanceof ao)return e._internalPath;if(typeof e=="string")return ji(n,e);throw aa("Field path arguments must be of type string or ",n,!1,void 0,t)}const iy=new RegExp("[~\\*/\\[\\]]");function ji(n,e,t){if(e.search(iy)>=0)throw aa(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,n,!1,void 0,t);try{return new ao(...e.split("."))._internalPath}catch{throw aa(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,n,!1,void 0,t)}}function aa(n,e,t,o,r){const a=o&&!o.isEmpty(),s=r!==void 0;let c=`Function ${e}() called with invalid data`;t&&(c+=" (via `toFirestore()`)"),c+=". ";let l="";return(a||s)&&(l+=" (found",a&&(l+=` in field ${o}`),s&&(l+=` in document ${r}`),l+=")"),new V(M.INVALID_ARGUMENT,c+n+l)}function Vh(n,e){return n.some(t=>t.isEqual(e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Oh{constructor(e,t,o,r,a){this._firestore=e,this._userDataWriter=t,this._key=o,this._document=r,this._converter=a}get id(){return this._key.path.lastSegment()}get ref(){return new we(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const e=new cy(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}get(e){if(this._document){const t=this._document.data.field(Ma("DocumentSnapshot.get",e));if(t!==null)return this._userDataWriter.convertValue(t)}}}class cy extends Oh{data(){return super.data()}}function Ma(n,e){return typeof e=="string"?ji(n,e):e instanceof ao?e._internalPath:e._delegate._internalPath}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Bh(n){if(n.limitType==="L"&&n.explicitOrderBy.length===0)throw new V(M.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class Hi{}class Na extends Hi{}function fe(n,e,...t){let o=[];e instanceof Hi&&o.push(e),o=o.concat(t),function(a){const s=a.filter(l=>l instanceof $a).length,c=a.filter(l=>l instanceof sr).length;if(s>1||s>0&&c>0)throw new V(M.INVALID_ARGUMENT,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")}(o);for(const r of o)n=r._apply(n);return n}class sr extends Na{constructor(e,t,o){super(),this._field=e,this._op=t,this._value=o,this.type="where"}static _create(e,t,o){return new sr(e,t,o)}_apply(e){const t=this._parse(e);return Uh(e._query,t),new gt(e.firestore,e.converter,Gs(e._query,t))}_parse(e){const t=ar(e.firestore);return function(a,s,c,l,d,h,g){let m;if(d.isKeyField()){if(h==="array-contains"||h==="array-contains-any")throw new V(M.INVALID_ARGUMENT,`Invalid Query. You can't perform '${h}' queries on documentId().`);if(h==="in"||h==="not-in"){Sd(g,h);const v=[];for(const b of g)v.push(Td(l,a,b));m={arrayValue:{values:v}}}else m=Td(l,a,g)}else h!=="in"&&h!=="not-in"&&h!=="array-contains-any"||Sd(g,h),m=sy(c,s,g,h==="in"||h==="not-in");return _e.create(d,h,m)}(e._query,"where",t,e.firestore._databaseId,this._field,this._op,this._value)}}function ne(n,e,t){const o=e,r=Ma("where",n);return sr._create(r,o,t)}class $a extends Hi{constructor(e,t){super(),this.type=e,this._queryConstraints=t}static _create(e,t){return new $a(e,t)}_parse(e){const t=this._queryConstraints.map(o=>o._parse(e)).filter(o=>o.getFilters().length>0);return t.length===1?t[0]:at.create(t,this._getOperator())}_apply(e){const t=this._parse(e);return t.getFilters().length===0?e:(function(r,a){let s=r;const c=a.getFlattenedFilters();for(const l of c)Uh(s,l),s=Gs(s,l)}(e._query,t),new gt(e.firestore,e.converter,Gs(e._query,t)))}_getQueryConstraints(){return this._queryConstraints}_getOperator(){return this.type==="and"?"and":"or"}}class La extends Na{constructor(e,t){super(),this._field=e,this._direction=t,this.type="orderBy"}static _create(e,t){return new La(e,t)}_apply(e){const t=function(r,a,s){if(r.startAt!==null)throw new V(M.INVALID_ARGUMENT,"Invalid query. You must not call startAt() or startAfter() before calling orderBy().");if(r.endAt!==null)throw new V(M.INVALID_ARGUMENT,"Invalid query. You must not call endAt() or endBefore() before calling orderBy().");return new jo(a,s)}(e._query,this._field,this._direction);return new gt(e.firestore,e.converter,function(r,a){const s=r.explicitOrderBy.concat([a]);return new no(r.path,r.collectionGroup,s,r.filters.slice(),r.limit,r.limitType,r.startAt,r.endAt)}(e._query,t))}}function ly(n,e="asc"){const t=e,o=Ma("orderBy",n);return La._create(o,t)}class Fa extends Na{constructor(e,t,o){super(),this.type=e,this._limit=t,this._limitType=o}static _create(e,t,o){return new Fa(e,t,o)}_apply(e){return new gt(e.firestore,e.converter,Jr(e._query,this._limit,this._limitType))}}function dy(n){return wf("limit",n),Fa._create("limit",n,"F")}function Td(n,e,t){if(typeof(t=Ie(t))=="string"){if(t==="")throw new V(M.INVALID_ARGUMENT,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!Fu(e)&&t.indexOf("/")!==-1)throw new V(M.INVALID_ARGUMENT,`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${t}' contains a '/' character.`);const o=e.path.child(de.fromString(t));if(!j.isDocumentKey(o))throw new V(M.INVALID_ARGUMENT,`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${o}' is not because it has an odd number of segments (${o.length}).`);return Bl(n,new j(o))}if(t instanceof we)return Bl(n,t._key);throw new V(M.INVALID_ARGUMENT,`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${fa(t)}.`)}function Sd(n,e){if(!Array.isArray(n)||n.length===0)throw new V(M.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${e.toString()}' filters.`)}function Uh(n,e){const t=function(r,a){for(const s of r)for(const c of s.getFlattenedFilters())if(a.indexOf(c.op)>=0)return c.op;return null}(n.filters,function(r){switch(r){case"!=":return["!=","not-in"];case"array-contains-any":case"in":return["not-in"];case"not-in":return["array-contains-any","in","not-in","!="];default:return[]}}(e.op));if(t!==null)throw t===e.op?new V(M.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${e.op.toString()}' filter.`):new V(M.INVALID_ARGUMENT,`Invalid query. You cannot use '${e.op.toString()}' filters with '${t.toString()}' filters.`)}class zh{convertValue(e,t="none"){switch(Wt(e)){case 0:return null;case 1:return e.booleanValue;case 2:return be(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,t);case 5:return e.stringValue;case 6:return this.convertBytes(Gt(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,t);case 11:return this.convertObject(e.mapValue,t);case 10:return this.convertVectorValue(e.mapValue);default:throw G(62114,{value:e})}}convertObject(e,t){return this.convertObjectMap(e.fields,t)}convertObjectMap(e,t="none"){const o={};return Jt(e,(r,a)=>{o[r]=this.convertValue(a,t)}),o}convertVectorValue(e){const t=e.fields?.[Xr].arrayValue?.values?.map(o=>be(o.doubleValue));return new ot(t)}convertGeoPoint(e){return new nt(be(e.latitude),be(e.longitude))}convertArray(e,t){return(e.values||[]).map(o=>this.convertValue(o,t))}convertServerTimestamp(e,t){switch(t){case"previous":const o=ya(e);return o==null?null:this.convertValue(o,t);case"estimate":return this.convertTimestamp(zo(e));default:return null}}convertTimestamp(e){const t=Ht(e);return new ue(t.seconds,t.nanos)}convertDocumentKey(e,t){const o=de.fromString(e);se(ah(o),9688,{name:e});const r=new qn(o.get(1),o.get(3)),a=new j(o.popFirst(5));return r.isEqual(t)||St(`Document ${a} contains a document reference within a different database (${r.projectId}/${r.database}) which is not supported. It will be treated as a reference in the current database (${t.projectId}/${t.database}) instead.`),a}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Gi(n,e,t){let o;return o=n?t&&(t.merge||t.mergeFields)?n.toFirestore(e,t):n.toFirestore(e):e,o}class Ln{constructor(e,t){this.hasPendingWrites=e,this.fromCache=t}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class Ut extends Oh{constructor(e,t,o,r,a,s){super(e,t,o,r,s),this._firestore=e,this._firestoreImpl=e,this.metadata=a}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){const t=new Do(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(t,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,t={}){if(this._document){const o=this._document.data.field(Ma("DocumentSnapshot.get",e));if(o!==null)return this._userDataWriter.convertValue(o,t.serverTimestamps)}}toJSON(){if(this.metadata.hasPendingWrites)throw new V(M.FAILED_PRECONDITION,"DocumentSnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e=this._document,t={};return t.type=Ut._jsonSchemaVersion,t.bundle="",t.bundleSource="DocumentSnapshot",t.bundleName=this._key.toString(),!e||!e.isValidDocument()||!e.isFoundDocument()?t:(this._userDataWriter.convertObjectMap(e.data.value.mapValue.fields,"previous"),t.bundle=(this._firestore,this.ref.path,"NOT SUPPORTED"),t)}}Ut._jsonSchemaVersion="firestore/documentSnapshot/1.0",Ut._jsonSchema={type:xe("string",Ut._jsonSchemaVersion),bundleSource:xe("string","DocumentSnapshot"),bundleName:xe("string"),bundle:xe("string")};class Do extends Ut{data(e={}){return super.data(e)}}class zt{constructor(e,t,o,r){this._firestore=e,this._userDataWriter=t,this._snapshot=r,this.metadata=new Ln(r.hasPendingWrites,r.fromCache),this.query=o}get docs(){const e=[];return this.forEach(t=>e.push(t)),e}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(e,t){this._snapshot.docs.forEach(o=>{e.call(t,new Do(this._firestore,this._userDataWriter,o.key,o,new Ln(this._snapshot.mutatedKeys.has(o.key),this._snapshot.fromCache),this.query.converter))})}docChanges(e={}){const t=!!e.includeMetadataChanges;if(t&&this._snapshot.excludesMetadataChanges)throw new V(M.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===t||(this._cachedChanges=function(r,a){if(r._snapshot.oldDocs.isEmpty()){let s=0;return r._snapshot.docChanges.map(c=>{const l=new Do(r._firestore,r._userDataWriter,c.doc.key,c.doc,new Ln(r._snapshot.mutatedKeys.has(c.doc.key),r._snapshot.fromCache),r.query.converter);return c.doc,{type:"added",doc:l,oldIndex:-1,newIndex:s++}})}{let s=r._snapshot.oldDocs;return r._snapshot.docChanges.filter(c=>a||c.type!==3).map(c=>{const l=new Do(r._firestore,r._userDataWriter,c.doc.key,c.doc,new Ln(r._snapshot.mutatedKeys.has(c.doc.key),r._snapshot.fromCache),r.query.converter);let d=-1,h=-1;return c.type!==0&&(d=s.indexOf(c.doc.key),s=s.delete(c.doc.key)),c.type!==1&&(s=s.add(c.doc),h=s.indexOf(c.doc.key)),{type:uy(c.type),doc:l,oldIndex:d,newIndex:h}})}}(this,t),this._cachedChangesIncludeMetadataChanges=t),this._cachedChanges}toJSON(){if(this.metadata.hasPendingWrites)throw new V(M.FAILED_PRECONDITION,"QuerySnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e={};e.type=zt._jsonSchemaVersion,e.bundleSource="QuerySnapshot",e.bundleName=ma.newId(),this._firestore._databaseId.database,this._firestore._databaseId.projectId;const t=[],o=[],r=[];return this.docs.forEach(a=>{a._document!==null&&(t.push(a._document),o.push(this._userDataWriter.convertObjectMap(a._document.data.value.mapValue.fields,"previous")),r.push(a.ref.path))}),e.bundle=(this._firestore,this.query._query,e.bundleName,"NOT SUPPORTED"),e}}function uy(n){switch(n){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return G(61501,{type:n})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Go(n){n=Ue(n,we);const e=Ue(n.firestore,st);return ey(ro(e),n._key).then(t=>jh(e,n,t))}zt._jsonSchemaVersion="firestore/querySnapshot/1.0",zt._jsonSchema={type:xe("string",zt._jsonSchemaVersion),bundleSource:xe("string","QuerySnapshot"),bundleName:xe("string"),bundle:xe("string")};class Wi extends zh{constructor(e){super(),this.firestore=e}convertBytes(e){return new Xe(e)}convertReference(e){const t=this.convertDocumentKey(e,this.firestore._databaseId);return new we(this.firestore,null,t)}}function he(n){n=Ue(n,gt);const e=Ue(n.firestore,st),t=ro(e),o=new Wi(e);return Bh(n._query),ty(t,n._query).then(r=>new zt(e,o,n,r))}function qh(n,e,t){n=Ue(n,we);const o=Ue(n.firestore,st),r=Gi(n.converter,e,t);return so(o,[Oi(ar(o),"setDoc",n._key,r,n.converter!==null,t).toMutation(n._key,Ge.none())])}function ht(n,e,t,...o){n=Ue(n,we);const r=Ue(n.firestore,st),a=ar(r);let s;return s=typeof(e=Ie(e))=="string"||e instanceof ao?$h(a,"updateDoc",n._key,e,t,o):Nh(a,"updateDoc",n._key,e),so(r,[s.toMutation(n._key,Ge.exists(!0))])}function Qe(n){return so(Ue(n.firestore,st),[new Sa(n._key,Ge.none())])}function Xt(n,e){const t=Ue(n.firestore,st),o=qe(n),r=Gi(n.converter,e);return so(t,[Oi(ar(n.firestore),"addDoc",o._key,r,n.converter!==null,{}).toMutation(o._key,Ge.exists(!1))]).then(()=>o)}function hy(n,...e){n=Ie(n);let t={includeMetadataChanges:!1,source:"default"},o=0;typeof e[o]!="object"||xd(e[o])||(t=e[o++]);const r={includeMetadataChanges:t.includeMetadataChanges,source:t.source};if(xd(e[o])){const l=e[o];e[o]=l.next?.bind(l),e[o+1]=l.error?.bind(l),e[o+2]=l.complete?.bind(l)}let a,s,c;if(n instanceof we)s=Ue(n.firestore,st),c=ba(n._key.path),a={next:l=>{e[o]&&e[o](jh(s,n,l))},error:e[o+1],complete:e[o+2]};else{const l=Ue(n,gt);s=Ue(l.firestore,st),c=l._query;const d=new Wi(s);a={next:h=>{e[o]&&e[o](new zt(s,d,l,h))},error:e[o+1],complete:e[o+2]},Bh(n._query)}return function(d,h,g,m){const f=new Vi(m),v=new $i(h,f,g);return d.asyncQueue.enqueueAndForget(async()=>Di(await ra(d),v)),()=>{f.Nu(),d.asyncQueue.enqueueAndForget(async()=>Mi(await ra(d),v))}}(ro(s),c,r,a)}function so(n,e){return function(o,r){const a=new Et;return o.asyncQueue.enqueueAndForget(async()=>zv(await Zv(o),r,a)),a.promise}(ro(n),e)}function jh(n,e,t){const o=t.docs.get(e._key),r=new Wi(n);return new Ut(n,r,e._key,o,new Ln(t.hasPendingWrites,t.fromCache),e.converter)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hh{constructor(e,t){this._firestore=e,this._commitHandler=t,this._mutations=[],this._committed=!1,this._dataReader=ar(e)}set(e,t,o){this._verifyNotCommitted();const r=Rs(e,this._firestore),a=Gi(r.converter,t,o),s=Oi(this._dataReader,"WriteBatch.set",r._key,a,r.converter!==null,o);return this._mutations.push(s.toMutation(r._key,Ge.none())),this}update(e,t,o,...r){this._verifyNotCommitted();const a=Rs(e,this._firestore);let s;return s=typeof(t=Ie(t))=="string"||t instanceof ao?$h(this._dataReader,"WriteBatch.update",a._key,t,o,r):Nh(this._dataReader,"WriteBatch.update",a._key,t),this._mutations.push(s.toMutation(a._key,Ge.exists(!0))),this}delete(e){this._verifyNotCommitted();const t=Rs(e,this._firestore);return this._mutations=this._mutations.concat(new Sa(t._key,Ge.none())),this}commit(){return this._verifyNotCommitted(),this._committed=!0,this._mutations.length>0?this._commitHandler(this._mutations):Promise.resolve()}_verifyNotCommitted(){if(this._committed)throw new V(M.FAILED_PRECONDITION,"A write batch can no longer be used after commit() has been called.")}}function Rs(n,e){if((n=Ie(n)).firestore!==e)throw new V(M.INVALID_ARGUMENT,"Provided document reference is from a different Firestore instance.");return n}function Ae(){return new Bi("serverTimestamp")}function Ki(...n){return new Ui("arrayUnion",n)}function py(...n){return new zi("arrayRemove",n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function gy(n){return ro(n=Ue(n,st)),new Hh(n,e=>so(n,e))}(function(e,t=!0){(function(r){Zn=r})(Jn),Un(new pn("firestore",(o,{instanceIdentifier:r,options:a})=>{const s=o.getProvider("app").getImmediate(),c=new st(new lf(o.getProvider("auth-internal")),new hf(s,o.getProvider("app-check-internal")),function(d,h){if(!Object.prototype.hasOwnProperty.apply(d.options,["projectId"]))throw new V(M.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new qn(d.options.projectId,h)}(s,r),s);return a={useFetchStreams:t,...a},c._setSettings(a),c},"PUBLIC").setMultipleInstances(!0)),Ot(Al,kl,e),Ot(Al,kl,"esm2020")})();const Ne=Object.freeze(Object.defineProperty({__proto__:null,AbstractUserDataWriter:zh,Bytes:Xe,CollectionReference:_t,DocumentReference:we,DocumentSnapshot:Ut,FieldPath:ao,FieldValue:_n,Firestore:st,FirestoreError:V,GeoPoint:nt,Query:gt,QueryCompositeFilterConstraint:$a,QueryConstraint:Na,QueryDocumentSnapshot:Do,QueryFieldFilterConstraint:sr,QueryLimitConstraint:Fa,QueryOrderByConstraint:La,QuerySnapshot:zt,SnapshotMetadata:Ln,Timestamp:ue,VectorValue:ot,WriteBatch:Hh,_AutoId:ma,_ByteString:Re,_DatabaseId:qn,_DocumentKey:j,_EmptyAuthCredentialsProvider:wu,_FieldPath:Ce,_cast:Ue,_logWarn:mn,_validateIsNotUsedTogether:yu,addDoc:Xt,arrayRemove:py,arrayUnion:Ki,collection:oe,connectFirestoreEmulator:Ch,deleteDoc:Qe,doc:qe,ensureFirestoreConfigured:ro,executeWrite:so,getDoc:Go,getDocs:he,getFirestore:Rh,limit:dy,onSnapshot:hy,orderBy:ly,query:fe,serverTimestamp:Ae,setDoc:qh,updateDoc:ht,where:ne,writeBatch:gy},Symbol.toStringTag,{value:"Module"}));var my="firebase",fy="12.0.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Ot(my,fy,"app");function Gh(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const wy=Gh,Wh=new Jo("auth","Firebase",Gh());/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const sa=new ci("@firebase/auth");function vy(n,...e){sa.logLevel<=Z.WARN&&sa.warn(`Auth (${Jn}): ${n}`,...e)}function zr(n,...e){sa.logLevel<=Z.ERROR&&sa.error(`Auth (${Jn}): ${n}`,...e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function pt(n,...e){throw Xi(n,...e)}function rt(n,...e){return Xi(n,...e)}function Yi(n,e,t){const o={...wy(),[e]:t};return new Jo("auth","Firebase",o).create(e,{appName:n.name})}function dn(n){return Yi(n,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function yy(n,e,t){const o=t;if(!(e instanceof o))throw o.name!==e.constructor.name&&pt(n,"argument-error"),Yi(n,"argument-error",`Type of ${e.constructor.name} does not match expected instance.Did you pass a reference from a different Auth SDK?`)}function Xi(n,...e){if(typeof n!="string"){const t=e[0],o=[...e.slice(1)];return o[0]&&(o[0].appName=n.name),n._errorFactory.create(t,...o)}return Wh.create(n,...e)}function W(n,e,...t){if(!n)throw Xi(e,...t)}function yt(n){const e="INTERNAL ASSERTION FAILED: "+n;throw zr(e),new Error(e)}function At(n,e){n||yt(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function oi(){return typeof self<"u"&&self.location?.href||""}function by(){return Id()==="http:"||Id()==="https:"}function Id(){return typeof self<"u"&&self.location?.protocol||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ey(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(by()||Bg()||"connection"in navigator)?navigator.onLine:!0}function _y(){if(typeof navigator>"u")return null;const n=navigator;return n.languages&&n.languages[0]||n.language||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ir{constructor(e,t){this.shortDelay=e,this.longDelay=t,At(t>e,"Short delay should be less than long delay!"),this.isMobile=Fg()||Ug()}get(){return Ey()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Qi(n,e){At(n.emulator,"Emulator should always be set here");const{url:t}=n.emulator;return e?`${t}${e.startsWith("/")?e.slice(1):e}`:t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Kh{static initialize(e,t,o){this.fetchImpl=e,t&&(this.headersImpl=t),o&&(this.responseImpl=o)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;yt("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;yt("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;yt("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const xy={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ty=["/v1/accounts:signInWithCustomToken","/v1/accounts:signInWithEmailLink","/v1/accounts:signInWithIdp","/v1/accounts:signInWithPassword","/v1/accounts:signInWithPhoneNumber","/v1/token"],Sy=new ir(3e4,6e4);function Ji(n,e){return n.tenantId&&!e.tenantId?{...e,tenantId:n.tenantId}:e}async function io(n,e,t,o,r={}){return Yh(n,r,async()=>{let a={},s={};o&&(e==="GET"?s=o:a={body:JSON.stringify(o)});const c=Zo({key:n.config.apiKey,...s}).slice(1),l=await n._getAdditionalHeaders();l["Content-Type"]="application/json",n.languageCode&&(l["X-Firebase-Locale"]=n.languageCode);const d={method:e,headers:l,...a};return Og()||(d.referrerPolicy="no-referrer"),n.emulatorConfig&&Qn(n.emulatorConfig.host)&&(d.credentials="include"),Kh.fetch()(await Xh(n,n.config.apiHost,t,c),d)})}async function Yh(n,e,t){n._canInitEmulator=!1;const o={...xy,...e};try{const r=new Ay(n),a=await Promise.race([t(),r.promise]);r.clearNetworkTimeout();const s=await a.json();if("needConfirmation"in s)throw Lr(n,"account-exists-with-different-credential",s);if(a.ok&&!("errorMessage"in s))return s;{const c=a.ok?s.errorMessage:s.error.message,[l,d]=c.split(" : ");if(l==="FEDERATED_USER_ID_ALREADY_LINKED")throw Lr(n,"credential-already-in-use",s);if(l==="EMAIL_EXISTS")throw Lr(n,"email-already-in-use",s);if(l==="USER_DISABLED")throw Lr(n,"user-disabled",s);const h=o[l]||l.toLowerCase().replace(/[_\s]+/g,"-");if(d)throw Yi(n,h,d);pt(n,h)}}catch(r){if(r instanceof kt)throw r;pt(n,"network-request-failed",{message:String(r)})}}async function Iy(n,e,t,o,r={}){const a=await io(n,e,t,o,r);return"mfaPendingCredential"in a&&pt(n,"multi-factor-auth-required",{_serverResponse:a}),a}async function Xh(n,e,t,o){const r=`${e}${t}?${o}`,a=n,s=a.config.emulator?Qi(n.config,r):`${n.config.apiScheme}://${r}`;return Ty.includes(t)&&(await a._persistenceManagerAvailable,a._getPersistenceType()==="COOKIE")?a._getPersistence()._getFinalTarget(s).toString():s}class Ay{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((t,o)=>{this.timer=setTimeout(()=>o(rt(this.auth,"network-request-failed")),Sy.get())})}}function Lr(n,e,t){const o={appName:n.name};t.email&&(o.email=t.email),t.phoneNumber&&(o.phoneNumber=t.phoneNumber);const r=rt(n,e,o);return r.customData._tokenResponse=t,r}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ky(n,e){return io(n,"POST","/v1/accounts:delete",e)}async function ia(n,e){return io(n,"POST","/v1/accounts:lookup",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Mo(n){if(n)try{const e=new Date(Number(n));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function Cy(n,e=!1){const t=Ie(n),o=await t.getIdToken(e),r=Zi(o);W(r&&r.exp&&r.auth_time&&r.iat,t.auth,"internal-error");const a=typeof r.firebase=="object"?r.firebase:void 0,s=a?.sign_in_provider;return{claims:r,token:o,authTime:Mo(Ps(r.auth_time)),issuedAtTime:Mo(Ps(r.iat)),expirationTime:Mo(Ps(r.exp)),signInProvider:s||null,signInSecondFactor:a?.sign_in_second_factor||null}}function Ps(n){return Number(n)*1e3}function Zi(n){const[e,t,o]=n.split(".");if(e===void 0||t===void 0||o===void 0)return zr("JWT malformed, contained fewer than 3 sections"),null;try{const r=Qd(t);return r?JSON.parse(r):(zr("Failed to decode base64 JWT payload"),null)}catch(r){return zr("Caught error parsing JWT payload as JSON",r?.toString()),null}}function Ad(n){const e=Zi(n);return W(e,"internal-error"),W(typeof e.exp<"u","internal-error"),W(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Wo(n,e,t=!1){if(t)return e;try{return await e}catch(o){throw o instanceof kt&&Ry(o)&&n.auth.currentUser===n&&await n.auth.signOut(),o}}function Ry({code:n}){return n==="auth/user-disabled"||n==="auth/user-token-expired"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Py{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){if(e){const t=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),t}else{this.errorBackoff=3e4;const o=(this.user.stsTokenManager.expirationTime??0)-Date.now()-3e5;return Math.max(0,o)}}schedule(e=!1){if(!this.isRunning)return;const t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){e?.code==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ri{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=Mo(this.lastLoginAt),this.creationTime=Mo(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ca(n){const e=n.auth,t=await n.getIdToken(),o=await Wo(n,ia(e,{idToken:t}));W(o?.users.length,e,"internal-error");const r=o.users[0];n._notifyReloadListener(r);const a=r.providerUserInfo?.length?Qh(r.providerUserInfo):[],s=My(n.providerData,a),c=n.isAnonymous,l=!(n.email&&r.passwordHash)&&!s?.length,d=c?l:!1,h={uid:r.localId,displayName:r.displayName||null,photoURL:r.photoUrl||null,email:r.email||null,emailVerified:r.emailVerified||!1,phoneNumber:r.phoneNumber||null,tenantId:r.tenantId||null,providerData:s,metadata:new ri(r.createdAt,r.lastLoginAt),isAnonymous:d};Object.assign(n,h)}async function Dy(n){const e=Ie(n);await ca(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function My(n,e){return[...n.filter(o=>!e.some(r=>r.providerId===o.providerId)),...e]}function Qh(n){return n.map(({providerId:e,...t})=>({providerId:e,uid:t.rawId||"",displayName:t.displayName||null,email:t.email||null,phoneNumber:t.phoneNumber||null,photoURL:t.photoUrl||null}))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ny(n,e){const t=await Yh(n,{},async()=>{const o=Zo({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:r,apiKey:a}=n.config,s=await Xh(n,r,"/v1/token",`key=${a}`),c=await n._getAdditionalHeaders();c["Content-Type"]="application/x-www-form-urlencoded";const l={method:"POST",headers:c,body:o};return n.emulatorConfig&&Qn(n.emulatorConfig.host)&&(l.credentials="include"),Kh.fetch()(s,l)});return{accessToken:t.access_token,expiresIn:t.expires_in,refreshToken:t.refresh_token}}async function $y(n,e){return io(n,"POST","/v2/accounts:revokeToken",Ji(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vn{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){W(e.idToken,"internal-error"),W(typeof e.idToken<"u","internal-error"),W(typeof e.refreshToken<"u","internal-error");const t="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):Ad(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){W(e.length!==0,"internal-error");const t=Ad(e);this.updateTokensAndExpiration(e,null,t)}async getToken(e,t=!1){return!t&&this.accessToken&&!this.isExpired?this.accessToken:(W(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){const{accessToken:o,refreshToken:r,expiresIn:a}=await Ny(e,t);this.updateTokensAndExpiration(o,r,Number(a))}updateTokensAndExpiration(e,t,o){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+o*1e3}static fromJSON(e,t){const{refreshToken:o,accessToken:r,expirationTime:a}=t,s=new Vn;return o&&(W(typeof o=="string","internal-error",{appName:e}),s.refreshToken=o),r&&(W(typeof r=="string","internal-error",{appName:e}),s.accessToken=r),a&&(W(typeof a=="number","internal-error",{appName:e}),s.expirationTime=a),s}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new Vn,this.toJSON())}_performRefresh(){return yt("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Dt(n,e){W(typeof n=="string"||typeof n>"u","internal-error",{appName:e})}class tt{constructor({uid:e,auth:t,stsTokenManager:o,...r}){this.providerId="firebase",this.proactiveRefresh=new Py(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=e,this.auth=t,this.stsTokenManager=o,this.accessToken=o.accessToken,this.displayName=r.displayName||null,this.email=r.email||null,this.emailVerified=r.emailVerified||!1,this.phoneNumber=r.phoneNumber||null,this.photoURL=r.photoURL||null,this.isAnonymous=r.isAnonymous||!1,this.tenantId=r.tenantId||null,this.providerData=r.providerData?[...r.providerData]:[],this.metadata=new ri(r.createdAt||void 0,r.lastLoginAt||void 0)}async getIdToken(e){const t=await Wo(this,this.stsTokenManager.getToken(this.auth,e));return W(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return Cy(this,e)}reload(){return Dy(this)}_assign(e){this!==e&&(W(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(t=>({...t})),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const t=new tt({...this,auth:e,stsTokenManager:this.stsTokenManager._clone()});return t.metadata._copy(this.metadata),t}_onReload(e){W(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let o=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),o=!0),t&&await ca(this),await this.auth._persistUserIfCurrent(this),o&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(et(this.auth.app))return Promise.reject(dn(this.auth));const e=await this.getIdToken();return await Wo(this,ky(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return{uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>({...e})),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId,...this.metadata.toJSON(),apiKey:this.auth.config.apiKey,appName:this.auth.name}}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){const o=t.displayName??void 0,r=t.email??void 0,a=t.phoneNumber??void 0,s=t.photoURL??void 0,c=t.tenantId??void 0,l=t._redirectEventId??void 0,d=t.createdAt??void 0,h=t.lastLoginAt??void 0,{uid:g,emailVerified:m,isAnonymous:f,providerData:v,stsTokenManager:b}=t;W(g&&b,e,"internal-error");const T=Vn.fromJSON(this.name,b);W(typeof g=="string",e,"internal-error"),Dt(o,e.name),Dt(r,e.name),W(typeof m=="boolean",e,"internal-error"),W(typeof f=="boolean",e,"internal-error"),Dt(a,e.name),Dt(s,e.name),Dt(c,e.name),Dt(l,e.name),Dt(d,e.name),Dt(h,e.name);const D=new tt({uid:g,auth:e,email:r,emailVerified:m,displayName:o,isAnonymous:f,photoURL:s,phoneNumber:a,tenantId:c,stsTokenManager:T,createdAt:d,lastLoginAt:h});return v&&Array.isArray(v)&&(D.providerData=v.map(L=>({...L}))),l&&(D._redirectEventId=l),D}static async _fromIdTokenResponse(e,t,o=!1){const r=new Vn;r.updateFromServerResponse(t);const a=new tt({uid:t.localId,auth:e,stsTokenManager:r,isAnonymous:o});return await ca(a),a}static async _fromGetAccountInfoResponse(e,t,o){const r=t.users[0];W(r.localId!==void 0,"internal-error");const a=r.providerUserInfo!==void 0?Qh(r.providerUserInfo):[],s=!(r.email&&r.passwordHash)&&!a?.length,c=new Vn;c.updateFromIdToken(o);const l=new tt({uid:r.localId,auth:e,stsTokenManager:c,isAnonymous:s}),d={uid:r.localId,displayName:r.displayName||null,photoURL:r.photoUrl||null,email:r.email||null,emailVerified:r.emailVerified||!1,phoneNumber:r.phoneNumber||null,tenantId:r.tenantId||null,providerData:a,metadata:new ri(r.createdAt,r.lastLoginAt),isAnonymous:!(r.email&&r.passwordHash)&&!a?.length};return Object.assign(l,d),l}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const kd=new Map;function bt(n){At(n instanceof Function,"Expected a class definition");let e=kd.get(n);return e?(At(e instanceof n,"Instance stored in cache mismatched with class"),e):(e=new n,kd.set(n,e),e)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jh{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){const t=this.storage[e];return t===void 0?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}}Jh.type="NONE";const Cd=Jh;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function qr(n,e,t){return`firebase:${n}:${e}:${t}`}class On{constructor(e,t,o){this.persistence=e,this.auth=t,this.userKey=o;const{config:r,name:a}=this.auth;this.fullUserKey=qr(this.userKey,r.apiKey,a),this.fullPersistenceKey=qr("persistence",r.apiKey,a),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);if(!e)return null;if(typeof e=="string"){const t=await ia(this.auth,{idToken:e}).catch(()=>{});return t?tt._fromGetAccountInfoResponse(this.auth,t,e):null}return tt._fromJSON(this.auth,e)}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const t=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,t)return this.setCurrentUser(t)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,t,o="authUser"){if(!t.length)return new On(bt(Cd),e,o);const r=(await Promise.all(t.map(async d=>{if(await d._isAvailable())return d}))).filter(d=>d);let a=r[0]||bt(Cd);const s=qr(o,e.config.apiKey,e.name);let c=null;for(const d of t)try{const h=await d._get(s);if(h){let g;if(typeof h=="string"){const m=await ia(e,{idToken:h}).catch(()=>{});if(!m)break;g=await tt._fromGetAccountInfoResponse(e,m,h)}else g=tt._fromJSON(e,h);d!==a&&(c=g),a=d;break}}catch{}const l=r.filter(d=>d._shouldAllowMigration);return!a._shouldAllowMigration||!l.length?new On(a,e,o):(a=l[0],c&&await a._set(s,c.toJSON()),await Promise.all(t.map(async d=>{if(d!==a)try{await d._remove(s)}catch{}})),new On(a,e,o))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Rd(n){const e=n.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(np(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(Zh(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(rp(e))return"Blackberry";if(ap(e))return"Webos";if(ep(e))return"Safari";if((e.includes("chrome/")||tp(e))&&!e.includes("edge/"))return"Chrome";if(op(e))return"Android";{const t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,o=n.match(t);if(o?.length===2)return o[1]}return"Other"}function Zh(n=ze()){return/firefox\//i.test(n)}function ep(n=ze()){const e=n.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function tp(n=ze()){return/crios\//i.test(n)}function np(n=ze()){return/iemobile/i.test(n)}function op(n=ze()){return/android/i.test(n)}function rp(n=ze()){return/blackberry/i.test(n)}function ap(n=ze()){return/webos/i.test(n)}function ec(n=ze()){return/iphone|ipad|ipod/i.test(n)||/macintosh/i.test(n)&&/mobile/i.test(n)}function Ly(n=ze()){return ec(n)&&!!window.navigator?.standalone}function Fy(){return zg()&&document.documentMode===10}function sp(n=ze()){return ec(n)||op(n)||ap(n)||rp(n)||/windows phone/i.test(n)||np(n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ip(n,e=[]){let t;switch(n){case"Browser":t=Rd(ze());break;case"Worker":t=`${Rd(ze())}-${n}`;break;default:t=n}const o=e.length?e.join(","):"FirebaseCore-web";return`${t}/JsCore/${Jn}/${o}`}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vy{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){const o=a=>new Promise((s,c)=>{try{const l=e(a);s(l)}catch(l){c(l)}});o.onAbort=t,this.queue.push(o);const r=this.queue.length-1;return()=>{this.queue[r]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const t=[];try{for(const o of this.queue)await o(e),o.onAbort&&t.push(o.onAbort)}catch(o){t.reverse();for(const r of t)try{r()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:o?.message})}}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Oy(n,e={}){return io(n,"GET","/v2/passwordPolicy",Ji(n,e))}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const By=6;class Uy{constructor(e){const t=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=t.minPasswordLength??By,t.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=t.maxPasswordLength),t.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=t.containsLowercaseCharacter),t.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=t.containsUppercaseCharacter),t.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=t.containsNumericCharacter),t.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=t.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=e.allowedNonAlphanumericCharacters?.join("")??"",this.forceUpgradeOnSignin=e.forceUpgradeOnSignin??!1,this.schemaVersion=e.schemaVersion}validatePassword(e){const t={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,t),this.validatePasswordCharacterOptions(e,t),t.isValid&&(t.isValid=t.meetsMinPasswordLength??!0),t.isValid&&(t.isValid=t.meetsMaxPasswordLength??!0),t.isValid&&(t.isValid=t.containsLowercaseLetter??!0),t.isValid&&(t.isValid=t.containsUppercaseLetter??!0),t.isValid&&(t.isValid=t.containsNumericCharacter??!0),t.isValid&&(t.isValid=t.containsNonAlphanumericCharacter??!0),t}validatePasswordLengthOptions(e,t){const o=this.customStrengthOptions.minPasswordLength,r=this.customStrengthOptions.maxPasswordLength;o&&(t.meetsMinPasswordLength=e.length>=o),r&&(t.meetsMaxPasswordLength=e.length<=r)}validatePasswordCharacterOptions(e,t){this.updatePasswordCharacterOptionsStatuses(t,!1,!1,!1,!1);let o;for(let r=0;r<e.length;r++)o=e.charAt(r),this.updatePasswordCharacterOptionsStatuses(t,o>="a"&&o<="z",o>="A"&&o<="Z",o>="0"&&o<="9",this.allowedNonAlphanumericCharacters.includes(o))}updatePasswordCharacterOptionsStatuses(e,t,o,r,a){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=t)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=o)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=r)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=a))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zy{constructor(e,t,o,r){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=o,this.config=r,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new Pd(this),this.idTokenSubscription=new Pd(this),this.beforeStateQueue=new Vy(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=Wh,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this._resolvePersistenceManagerAvailable=void 0,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=r.sdkClientVersion,this._persistenceManagerAvailable=new Promise(a=>this._resolvePersistenceManagerAvailable=a)}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=bt(t)),this._initializationPromise=this.queue(async()=>{if(!this._deleted&&(this.persistenceManager=await On.create(this,e),this._resolvePersistenceManagerAvailable?.(),!this._deleted)){if(this._popupRedirectResolver?._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(t),this.lastNotifiedUid=this.currentUser?.uid||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const t=await ia(this,{idToken:e}),o=await tt._fromGetAccountInfoResponse(this,t,e);await this.directlySetCurrentUser(o)}catch(t){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",t),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){if(et(this.app)){const a=this.app.settings.authIdToken;return a?new Promise(s=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(a).then(s,s))}):this.directlySetCurrentUser(null)}const t=await this.assertedPersistence.getCurrentUser();let o=t,r=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const a=this.redirectUser?._redirectEventId,s=o?._redirectEventId,c=await this.tryRedirectSignIn(e);(!a||a===s)&&c?.user&&(o=c.user,r=!0)}if(!o)return this.directlySetCurrentUser(null);if(!o._redirectEventId){if(r)try{await this.beforeStateQueue.runMiddleware(o)}catch(a){o=t,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(a))}return o?this.reloadAndSetCurrentUserOrClear(o):this.directlySetCurrentUser(null)}return W(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===o._redirectEventId?this.directlySetCurrentUser(o):this.reloadAndSetCurrentUserOrClear(o)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await ca(e)}catch(t){if(t?.code!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=_y()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(et(this.app))return Promise.reject(dn(this));const t=e?Ie(e):null;return t&&W(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&W(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return et(this.app)?Promise.reject(dn(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return et(this.app)?Promise.reject(dn(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(bt(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const t=this._getPasswordPolicyInternal();return t.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):t.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await Oy(this),t=new Uy(e);this.tenantId===null?this._projectPasswordPolicy=t:this._tenantPasswordPolicies[this.tenantId]=t}_getPersistenceType(){return this.assertedPersistence.persistence.type}_getPersistence(){return this.assertedPersistence.persistence}_updateErrorMap(e){this._errorFactory=new Jo("auth","Firebase",e())}onAuthStateChanged(e,t,o){return this.registerStateListener(this.authStateSubscription,e,t,o)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,o){return this.registerStateListener(this.idTokenSubscription,e,t,o)}authStateReady(){return new Promise((e,t)=>{if(this.currentUser)e();else{const o=this.onAuthStateChanged(()=>{o(),e()},t)}})}async revokeAccessToken(e){if(this.currentUser){const t=await this.currentUser.getIdToken(),o={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:t};this.tenantId!=null&&(o.tenantId=this.tenantId),await $y(this,o)}}toJSON(){return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:this._currentUser?.toJSON()}}async _setRedirectUser(e,t){const o=await this.getOrInitRedirectPersistenceManager(t);return e===null?o.removeCurrentUser():o.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const t=e&&bt(e)||this._popupRedirectResolver;W(t,this,"argument-error"),this.redirectPersistenceManager=await On.create(this,[bt(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){return this._isInitialized&&await this.queue(async()=>{}),this._currentUser?._redirectEventId===e?this._currentUser:this.redirectUser?._redirectEventId===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const e=this.currentUser?.uid??null;this.lastNotifiedUid!==e&&(this.lastNotifiedUid=e,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,o,r){if(this._deleted)return()=>{};const a=typeof t=="function"?t:t.next.bind(t);let s=!1;const c=this._isInitialized?Promise.resolve():this._initializationPromise;if(W(c,this,"internal-error"),c.then(()=>{s||a(this.currentUser)}),typeof t=="function"){const l=e.addObserver(t,o,r);return()=>{s=!0,l()}}else{const l=e.addObserver(t);return()=>{s=!0,l()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return W(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=ip(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){const e={"X-Client-Version":this.clientVersion};this.app.options.appId&&(e["X-Firebase-gmpid"]=this.app.options.appId);const t=await this.heartbeatServiceProvider.getImmediate({optional:!0})?.getHeartbeatsHeader();t&&(e["X-Firebase-Client"]=t);const o=await this._getAppCheckToken();return o&&(e["X-Firebase-AppCheck"]=o),e}async _getAppCheckToken(){if(et(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const e=await this.appCheckServiceProvider.getImmediate({optional:!0})?.getToken();return e?.error&&vy(`Error while retrieving App Check token: ${e.error}`),e?.token}}function Va(n){return Ie(n)}class Pd{constructor(e){this.auth=e,this.observer=null,this.addObserver=Xg(t=>this.observer=t)}get next(){return W(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let tc={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function qy(n){tc=n}function jy(n){return tc.loadJS(n)}function Hy(){return tc.gapiScript}function Gy(n){return`__${n}${Math.floor(Math.random()*1e6)}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Wy(n,e){const t=di(n,"auth");if(t.isInitialized()){const r=t.getImmediate(),a=t.getOptions();if(xt(a,e??{}))return r;pt(r,"already-initialized")}return t.initialize({options:e})}function Ky(n,e){const t=e?.persistence||[],o=(Array.isArray(t)?t:[t]).map(bt);e?.errorMap&&n._updateErrorMap(e.errorMap),n._initializeWithPersistence(o,e?.popupRedirectResolver)}function Yy(n,e,t){const o=Va(n);W(/^https?:\/\//.test(e),o,"invalid-emulator-scheme");const r=!1,a=cp(e),{host:s,port:c}=Xy(e),l=c===null?"":`:${c}`,d={url:`${a}//${s}${l}/`},h=Object.freeze({host:s,port:c,protocol:a.replace(":",""),options:Object.freeze({disableWarnings:r})});if(!o._canInitEmulator){W(o.config.emulator&&o.emulatorConfig,o,"emulator-config-failed"),W(xt(d,o.config.emulator)&&xt(h,o.emulatorConfig),o,"emulator-config-failed");return}o.config.emulator=d,o.emulatorConfig=h,o.settings.appVerificationDisabledForTesting=!0,Qn(s)?(tu(`${a}//${s}${l}`),nu("Auth",!0)):Qy()}function cp(n){const e=n.indexOf(":");return e<0?"":n.substr(0,e+1)}function Xy(n){const e=cp(n),t=/(\/\/)?([^?#/]+)/.exec(n.substr(e.length));if(!t)return{host:"",port:null};const o=t[2].split("@").pop()||"",r=/^(\[[^\]]+\])(:|$)/.exec(o);if(r){const a=r[1];return{host:a,port:Dd(o.substr(a.length+1))}}else{const[a,s]=o.split(":");return{host:a,port:Dd(s)}}}function Dd(n){if(!n)return null;const e=Number(n);return isNaN(e)?null:e}function Qy(){function n(){const e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",n):n())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lp{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return yt("not implemented")}_getIdTokenResponse(e){return yt("not implemented")}_linkToIdToken(e,t){return yt("not implemented")}_getReauthenticationResolver(e){return yt("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Bn(n,e){return Iy(n,"POST","/v1/accounts:signInWithIdp",Ji(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Jy="http://localhost";class wn extends lp{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const t=new wn(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):pt("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e,{providerId:o,signInMethod:r,...a}=t;if(!o||!r)return null;const s=new wn(o,r);return s.idToken=a.idToken||void 0,s.accessToken=a.accessToken||void 0,s.secret=a.secret,s.nonce=a.nonce,s.pendingToken=a.pendingToken||null,s}_getIdTokenResponse(e){const t=this.buildRequest();return Bn(e,t)}_linkToIdToken(e,t){const o=this.buildRequest();return o.idToken=t,Bn(e,o)}_getReauthenticationResolver(e){const t=this.buildRequest();return t.autoCreate=!1,Bn(e,t)}buildRequest(){const e={requestUri:Jy,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=Zo(t)}return e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nc{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cr extends nc{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Mt extends cr{constructor(){super("facebook.com")}static credential(e){return wn._fromParams({providerId:Mt.PROVIDER_ID,signInMethod:Mt.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Mt.credentialFromTaggedObject(e)}static credentialFromError(e){return Mt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Mt.credential(e.oauthAccessToken)}catch{return null}}}Mt.FACEBOOK_SIGN_IN_METHOD="facebook.com";Mt.PROVIDER_ID="facebook.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vt extends cr{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return wn._fromParams({providerId:vt.PROVIDER_ID,signInMethod:vt.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return vt.credentialFromTaggedObject(e)}static credentialFromError(e){return vt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:t,oauthAccessToken:o}=e;if(!t&&!o)return null;try{return vt.credential(t,o)}catch{return null}}}vt.GOOGLE_SIGN_IN_METHOD="google.com";vt.PROVIDER_ID="google.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Nt extends cr{constructor(){super("github.com")}static credential(e){return wn._fromParams({providerId:Nt.PROVIDER_ID,signInMethod:Nt.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Nt.credentialFromTaggedObject(e)}static credentialFromError(e){return Nt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Nt.credential(e.oauthAccessToken)}catch{return null}}}Nt.GITHUB_SIGN_IN_METHOD="github.com";Nt.PROVIDER_ID="github.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $t extends cr{constructor(){super("twitter.com")}static credential(e,t){return wn._fromParams({providerId:$t.PROVIDER_ID,signInMethod:$t.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return $t.credentialFromTaggedObject(e)}static credentialFromError(e){return $t.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:t,oauthTokenSecret:o}=e;if(!t||!o)return null;try{return $t.credential(t,o)}catch{return null}}}$t.TWITTER_SIGN_IN_METHOD="twitter.com";$t.PROVIDER_ID="twitter.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xn{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,o,r=!1){const a=await tt._fromIdTokenResponse(e,o,r),s=Md(o);return new Xn({user:a,providerId:s,_tokenResponse:o,operationType:t})}static async _forOperation(e,t,o){await e._updateTokensIfNecessary(o,!0);const r=Md(o);return new Xn({user:e,providerId:r,_tokenResponse:o,operationType:t})}}function Md(n){return n.providerId?n.providerId:"phoneNumber"in n?"phone":null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class la extends kt{constructor(e,t,o,r){super(t.code,t.message),this.operationType=o,this.user=r,Object.setPrototypeOf(this,la.prototype),this.customData={appName:e.name,tenantId:e.tenantId??void 0,_serverResponse:t.customData._serverResponse,operationType:o}}static _fromErrorAndOperation(e,t,o,r){return new la(e,t,o,r)}}function dp(n,e,t,o){return(e==="reauthenticate"?t._getReauthenticationResolver(n):t._getIdTokenResponse(n)).catch(a=>{throw a.code==="auth/multi-factor-auth-required"?la._fromErrorAndOperation(n,a,e,o):a})}async function Zy(n,e,t=!1){const o=await Wo(n,e._linkToIdToken(n.auth,await n.getIdToken()),t);return Xn._forOperation(n,"link",o)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function e0(n,e,t=!1){const{auth:o}=n;if(et(o.app))return Promise.reject(dn(o));const r="reauthenticate";try{const a=await Wo(n,dp(o,r,e,n),t);W(a.idToken,o,"internal-error");const s=Zi(a.idToken);W(s,o,"internal-error");const{sub:c}=s;return W(n.uid===c,o,"user-mismatch"),Xn._forOperation(n,r,a)}catch(a){throw a?.code==="auth/user-not-found"&&pt(o,"user-mismatch"),a}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function t0(n,e,t=!1){if(et(n.app))return Promise.reject(dn(n));const o="signIn",r=await dp(n,o,e),a=await Xn._fromIdTokenResponse(n,o,r);return t||await n._updateCurrentUser(a.user),a}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function n0(n,e){return Ie(n).setPersistence(e)}function o0(n,e,t,o){return Ie(n).onIdTokenChanged(e,t,o)}function r0(n,e,t){return Ie(n).beforeAuthStateChanged(e,t)}const da="__sak";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class up{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem(da,"1"),this.storage.removeItem(da),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){const t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const a0=1e3,s0=10;class hp extends up{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=sp(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const t of Object.keys(this.listeners)){const o=this.storage.getItem(t),r=this.localCache[t];o!==r&&e(t,r,o)}}onStorageEvent(e,t=!1){if(!e.key){this.forAllChangedKeys((s,c,l)=>{this.notifyListeners(s,l)});return}const o=e.key;t?this.detachListener():this.stopPolling();const r=()=>{const s=this.storage.getItem(o);!t&&this.localCache[o]===s||this.notifyListeners(o,s)},a=this.storage.getItem(o);Fy()&&a!==e.newValue&&e.newValue!==e.oldValue?setTimeout(r,s0):r()}notifyListeners(e,t){this.localCache[e]=t;const o=this.listeners[e];if(o)for(const r of Array.from(o))r(t&&JSON.parse(t))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,o)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:o}),!0)})},a0)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){const t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}}hp.type="LOCAL";const pp=hp;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gp extends up{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,t){}_removeListener(e,t){}}gp.type="SESSION";const mp=gp;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function i0(n){return Promise.all(n.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(t){return{fulfilled:!1,reason:t}}}))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Oa{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const t=this.receivers.find(r=>r.isListeningto(e));if(t)return t;const o=new Oa(e);return this.receivers.push(o),o}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const t=e,{eventId:o,eventType:r,data:a}=t.data,s=this.handlersMap[r];if(!s?.size)return;t.ports[0].postMessage({status:"ack",eventId:o,eventType:r});const c=Array.from(s).map(async d=>d(t.origin,a)),l=await i0(c);t.ports[0].postMessage({status:"done",eventId:o,eventType:r,response:l})}_subscribe(e,t){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),(!t||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}Oa.receivers=[];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function oc(n="",e=10){let t="";for(let o=0;o<e;o++)t+=Math.floor(Math.random()*10);return n+t}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class c0{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,o=50){const r=typeof MessageChannel<"u"?new MessageChannel:null;if(!r)throw new Error("connection_unavailable");let a,s;return new Promise((c,l)=>{const d=oc("",20);r.port1.start();const h=setTimeout(()=>{l(new Error("unsupported_event"))},o);s={messageChannel:r,onMessage(g){const m=g;if(m.data.eventId===d)switch(m.data.status){case"ack":clearTimeout(h),a=setTimeout(()=>{l(new Error("timeout"))},3e3);break;case"done":clearTimeout(a),c(m.data.response);break;default:clearTimeout(h),clearTimeout(a),l(new Error("invalid_response"));break}}},this.handlers.add(s),r.port1.addEventListener("message",s.onMessage),this.target.postMessage({eventType:e,eventId:d,data:t},[r.port2])}).finally(()=>{s&&this.removeMessageHandler(s)})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function dt(){return window}function l0(n){dt().location.href=n}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function fp(){return typeof dt().WorkerGlobalScope<"u"&&typeof dt().importScripts=="function"}async function d0(){if(!navigator?.serviceWorker)return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function u0(){return navigator?.serviceWorker?.controller||null}function h0(){return fp()?self:null}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const wp="firebaseLocalStorageDb",p0=1,ua="firebaseLocalStorage",vp="fbase_key";class lr{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{t(this.request.error)})})}}function Ba(n,e){return n.transaction([ua],e?"readwrite":"readonly").objectStore(ua)}function g0(){const n=indexedDB.deleteDatabase(wp);return new lr(n).toPromise()}function ai(){const n=indexedDB.open(wp,p0);return new Promise((e,t)=>{n.addEventListener("error",()=>{t(n.error)}),n.addEventListener("upgradeneeded",()=>{const o=n.result;try{o.createObjectStore(ua,{keyPath:vp})}catch(r){t(r)}}),n.addEventListener("success",async()=>{const o=n.result;o.objectStoreNames.contains(ua)?e(o):(o.close(),await g0(),e(await ai()))})})}async function Nd(n,e,t){const o=Ba(n,!0).put({[vp]:e,value:t});return new lr(o).toPromise()}async function m0(n,e){const t=Ba(n,!1).get(e),o=await new lr(t).toPromise();return o===void 0?null:o.value}function $d(n,e){const t=Ba(n,!0).delete(e);return new lr(t).toPromise()}const f0=800,w0=3;class yp{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await ai(),this.db)}async _withRetries(e){let t=0;for(;;)try{const o=await this._openDb();return await e(o)}catch(o){if(t++>w0)throw o;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return fp()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=Oa._getInstance(h0()),this.receiver._subscribe("keyChanged",async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)})),this.receiver._subscribe("ping",async(e,t)=>["keyChanged"])}async initializeSender(){if(this.activeServiceWorker=await d0(),!this.activeServiceWorker)return;this.sender=new c0(this.activeServiceWorker);const e=await this.sender._send("ping",{},800);e&&e[0]?.fulfilled&&e[0]?.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||u0()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await ai();return await Nd(e,da,"1"),await $d(e,da),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(o=>Nd(o,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){const t=await this._withRetries(o=>m0(o,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>$d(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(r=>{const a=Ba(r,!1).getAll();return new lr(a).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const t=[],o=new Set;if(e.length!==0)for(const{fbase_key:r,value:a}of e)o.add(r),JSON.stringify(this.localCache[r])!==JSON.stringify(a)&&(this.notifyListeners(r,a),t.push(r));for(const r of Object.keys(this.localCache))this.localCache[r]&&!o.has(r)&&(this.notifyListeners(r,null),t.push(r));return t}notifyListeners(e,t){this.localCache[e]=t;const o=this.listeners[e];if(o)for(const r of Array.from(o))r(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),f0)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}yp.type="LOCAL";const v0=yp;new ir(3e4,6e4);/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function bp(n,e){return e?bt(e):(W(n._popupRedirectResolver,n,"argument-error"),n._popupRedirectResolver)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rc extends lp{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return Bn(e,this._buildIdpRequest())}_linkToIdToken(e,t){return Bn(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return Bn(e,this._buildIdpRequest())}_buildIdpRequest(e){const t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}}function y0(n){return t0(n.auth,new rc(n),n.bypassAuthState)}function b0(n){const{auth:e,user:t}=n;return W(t,e,"internal-error"),e0(t,new rc(n),n.bypassAuthState)}async function E0(n){const{auth:e,user:t}=n;return W(t,e,"internal-error"),Zy(t,new rc(n),n.bypassAuthState)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ep{constructor(e,t,o,r,a=!1){this.auth=e,this.resolver=o,this.user=r,this.bypassAuthState=a,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(o){this.reject(o)}})}async onAuthEvent(e){const{urlResponse:t,sessionId:o,postBody:r,tenantId:a,error:s,type:c}=e;if(s){this.reject(s);return}const l={auth:this.auth,requestUri:t,sessionId:o,tenantId:a||void 0,postBody:r||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(c)(l))}catch(d){this.reject(d)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return y0;case"linkViaPopup":case"linkViaRedirect":return E0;case"reauthViaPopup":case"reauthViaRedirect":return b0;default:pt(this.auth,"internal-error")}}resolve(e){At(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){At(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _0=new ir(2e3,1e4);async function x0(n,e,t){if(et(n.app))return Promise.reject(rt(n,"operation-not-supported-in-this-environment"));const o=Va(n);yy(n,e,nc);const r=bp(o,t);return new ln(o,"signInViaPopup",e,r).executeNotNull()}class ln extends Ep{constructor(e,t,o,r,a){super(e,t,r,a),this.provider=o,this.authWindow=null,this.pollId=null,ln.currentPopupAction&&ln.currentPopupAction.cancel(),ln.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return W(e,this.auth,"internal-error"),e}async onExecution(){At(this.filter.length===1,"Popup operations only handle one event");const e=oc();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(t=>{this.reject(t)}),this.resolver._isIframeWebStorageSupported(this.auth,t=>{t||this.reject(rt(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){return this.authWindow?.associatedEvent||null}cancel(){this.reject(rt(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,ln.currentPopupAction=null}pollUserCancellation(){const e=()=>{if(this.authWindow?.window?.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(rt(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,_0.get())};e()}}ln.currentPopupAction=null;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const T0="pendingRedirect",jr=new Map;class S0 extends Ep{constructor(e,t,o=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,o),this.eventId=null}async execute(){let e=jr.get(this.auth._key());if(!e){try{const o=await I0(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(o)}catch(t){e=()=>Promise.reject(t)}jr.set(this.auth._key(),e)}return this.bypassAuthState||jr.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function I0(n,e){const t=C0(e),o=k0(n);if(!await o._isAvailable())return!1;const r=await o._get(t)==="true";return await o._remove(t),r}function A0(n,e){jr.set(n._key(),e)}function k0(n){return bt(n._redirectPersistence)}function C0(n){return qr(T0,n.config.apiKey,n.name)}async function R0(n,e,t=!1){if(et(n.app))return Promise.reject(dn(n));const o=Va(n),r=bp(o,e),s=await new S0(o,r,t).execute();return s&&!t&&(delete s.user._redirectEventId,await o._persistUserIfCurrent(s.user),await o._setRedirectUser(null,e)),s}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const P0=600*1e3;class D0{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(o=>{this.isEventForConsumer(e,o)&&(t=!0,this.sendToConsumer(e,o),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!M0(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){if(e.error&&!_p(e)){const o=e.error.code?.split("auth/")[1]||"internal-error";t.onError(rt(this.auth,o))}else t.onAuthEvent(e)}isEventForConsumer(e,t){const o=t.eventId===null||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&o}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=P0&&this.cachedEventUids.clear(),this.cachedEventUids.has(Ld(e))}saveEventToCache(e){this.cachedEventUids.add(Ld(e)),this.lastProcessedEventTime=Date.now()}}function Ld(n){return[n.type,n.eventId,n.sessionId,n.tenantId].filter(e=>e).join("-")}function _p({type:n,error:e}){return n==="unknown"&&e?.code==="auth/no-auth-event"}function M0(n){switch(n.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return _p(n);default:return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function N0(n,e={}){return io(n,"GET","/v1/projects",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $0=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,L0=/^https?/;async function F0(n){if(n.config.emulator)return;const{authorizedDomains:e}=await N0(n);for(const t of e)try{if(V0(t))return}catch{}pt(n,"unauthorized-domain")}function V0(n){const e=oi(),{protocol:t,hostname:o}=new URL(e);if(n.startsWith("chrome-extension://")){const s=new URL(n);return s.hostname===""&&o===""?t==="chrome-extension:"&&n.replace("chrome-extension://","")===e.replace("chrome-extension://",""):t==="chrome-extension:"&&s.hostname===o}if(!L0.test(t))return!1;if($0.test(n))return o===n;const r=n.replace(/\./g,"\\.");return new RegExp("^(.+\\."+r+"|"+r+")$","i").test(o)}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const O0=new ir(3e4,6e4);function Fd(){const n=dt().___jsl;if(n?.H){for(const e of Object.keys(n.H))if(n.H[e].r=n.H[e].r||[],n.H[e].L=n.H[e].L||[],n.H[e].r=[...n.H[e].L],n.CP)for(let t=0;t<n.CP.length;t++)n.CP[t]=null}}function B0(n){return new Promise((e,t)=>{function o(){Fd(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{Fd(),t(rt(n,"network-request-failed"))},timeout:O0.get()})}if(dt().gapi?.iframes?.Iframe)e(gapi.iframes.getContext());else if(dt().gapi?.load)o();else{const r=Gy("iframefcb");return dt()[r]=()=>{gapi.load?o():t(rt(n,"network-request-failed"))},jy(`${Hy()}?onload=${r}`).catch(a=>t(a))}}).catch(e=>{throw Hr=null,e})}let Hr=null;function U0(n){return Hr=Hr||B0(n),Hr}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const z0=new ir(5e3,15e3),q0="__/auth/iframe",j0="emulator/auth/iframe",H0={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},G0=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function W0(n){const e=n.config;W(e.authDomain,n,"auth-domain-config-required");const t=e.emulator?Qi(e,j0):`https://${n.config.authDomain}/${q0}`,o={apiKey:e.apiKey,appName:n.name,v:Jn},r=G0.get(n.config.apiHost);r&&(o.eid=r);const a=n._getFrameworks();return a.length&&(o.fw=a.join(",")),`${t}?${Zo(o).slice(1)}`}async function K0(n){const e=await U0(n),t=dt().gapi;return W(t,n,"internal-error"),e.open({where:document.body,url:W0(n),messageHandlersFilter:t.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:H0,dontclear:!0},o=>new Promise(async(r,a)=>{await o.restyle({setHideOnLeave:!1});const s=rt(n,"network-request-failed"),c=dt().setTimeout(()=>{a(s)},z0.get());function l(){dt().clearTimeout(c),r(o)}o.ping(l).then(l,()=>{a(s)})}))}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Y0={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},X0=500,Q0=600,J0="_blank",Z0="http://localhost";class Vd{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function eb(n,e,t,o=X0,r=Q0){const a=Math.max((window.screen.availHeight-r)/2,0).toString(),s=Math.max((window.screen.availWidth-o)/2,0).toString();let c="";const l={...Y0,width:o.toString(),height:r.toString(),top:a,left:s},d=ze().toLowerCase();t&&(c=tp(d)?J0:t),Zh(d)&&(e=e||Z0,l.scrollbars="yes");const h=Object.entries(l).reduce((m,[f,v])=>`${m}${f}=${v},`,"");if(Ly(d)&&c!=="_self")return tb(e||"",c),new Vd(null);const g=window.open(e||"",c,h);W(g,n,"popup-blocked");try{g.focus()}catch{}return new Vd(g)}function tb(n,e){const t=document.createElement("a");t.href=n,t.target=e;const o=document.createEvent("MouseEvent");o.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),t.dispatchEvent(o)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const nb="__/auth/handler",ob="emulator/auth/handler",rb=encodeURIComponent("fac");async function Od(n,e,t,o,r,a){W(n.config.authDomain,n,"auth-domain-config-required"),W(n.config.apiKey,n,"invalid-api-key");const s={apiKey:n.config.apiKey,appName:n.name,authType:t,redirectUrl:o,v:Jn,eventId:r};if(e instanceof nc){e.setDefaultLanguage(n.languageCode),s.providerId=e.providerId||"",Yg(e.getCustomParameters())||(s.customParameters=JSON.stringify(e.getCustomParameters()));for(const[h,g]of Object.entries({}))s[h]=g}if(e instanceof cr){const h=e.getScopes().filter(g=>g!=="");h.length>0&&(s.scopes=h.join(","))}n.tenantId&&(s.tid=n.tenantId);const c=s;for(const h of Object.keys(c))c[h]===void 0&&delete c[h];const l=await n._getAppCheckToken(),d=l?`#${rb}=${encodeURIComponent(l)}`:"";return`${ab(n)}?${Zo(c).slice(1)}${d}`}function ab({config:n}){return n.emulator?Qi(n,ob):`https://${n.authDomain}/${nb}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ds="webStorageSupport";class sb{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=mp,this._completeRedirectFn=R0,this._overrideRedirectResult=A0}async _openPopup(e,t,o,r){At(this.eventManagers[e._key()]?.manager,"_initialize() not called before _openPopup()");const a=await Od(e,t,o,oi(),r);return eb(e,a,oc())}async _openRedirect(e,t,o,r){await this._originValidation(e);const a=await Od(e,t,o,oi(),r);return l0(a),new Promise(()=>{})}_initialize(e){const t=e._key();if(this.eventManagers[t]){const{manager:r,promise:a}=this.eventManagers[t];return r?Promise.resolve(r):(At(a,"If manager is not set, promise should be"),a)}const o=this.initAndGetManager(e);return this.eventManagers[t]={promise:o},o.catch(()=>{delete this.eventManagers[t]}),o}async initAndGetManager(e){const t=await K0(e),o=new D0(e);return t.register("authEvent",r=>(W(r?.authEvent,e,"invalid-auth-event"),{status:o.onEvent(r.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:o},this.iframes[e._key()]=t,o}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send(Ds,{type:Ds},r=>{const a=r?.[0]?.[Ds];a!==void 0&&t(!!a),pt(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=F0(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return sp()||ep()||ec()}}const ib=sb;var Bd="@firebase/auth",Ud="1.11.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cb{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){return this.assertAuthConfigured(),this.auth.currentUser?.uid||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const t=this.auth.onIdTokenChanged(o=>{e(o?.stsTokenManager.accessToken||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){W(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function lb(n){switch(n){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function db(n){Un(new pn("auth",(e,{options:t})=>{const o=e.getProvider("app").getImmediate(),r=e.getProvider("heartbeat"),a=e.getProvider("app-check-internal"),{apiKey:s,authDomain:c}=o.options;W(s&&!s.includes(":"),"invalid-api-key",{appName:o.name});const l={apiKey:s,authDomain:c,clientPlatform:n,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:ip(n)},d=new zy(o,r,a,l);return Ky(d,t),d},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,o)=>{e.getProvider("auth-internal").initialize()})),Un(new pn("auth-internal",e=>{const t=Va(e.getProvider("auth").getImmediate());return(o=>new cb(o))(t)},"PRIVATE").setInstantiationMode("EXPLICIT")),Ot(Bd,Ud,lb(n)),Ot(Bd,Ud,"esm2020")}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ub=300,hb=eu("authIdTokenMaxAge")||ub;let zd=null;const pb=n=>async e=>{const t=e&&await e.getIdTokenResult(),o=t&&(new Date().getTime()-Date.parse(t.issuedAtTime))/1e3;if(o&&o>hb)return;const r=t?.token;zd!==r&&(zd=r,await fetch(n,{method:r?"POST":"DELETE",headers:r?{Authorization:`Bearer ${r}`}:{}}))};function gb(n=su()){const e=di(n,"auth");if(e.isInitialized())return e.getImmediate();const t=Wy(n,{popupRedirectResolver:ib,persistence:[v0,pp,mp]}),o=eu("authTokenSyncURL");if(o&&typeof isSecureContext=="boolean"&&isSecureContext){const a=new URL(o,location.origin);if(location.origin===a.origin){const s=pb(a.toString());r0(t,s,()=>s(t.currentUser)),o0(t,c=>s(c))}}const r=Jd("auth");return r&&Yy(t,`http://${r}`),t}function mb(){return document.getElementsByTagName("head")?.[0]??document}qy({loadJS(n){return new Promise((e,t)=>{const o=document.createElement("script");o.setAttribute("src",n),o.onload=e,o.onerror=r=>{const a=rt("internal-error");a.customData=r,t(a)},o.type="text/javascript",o.charset="UTF-8",mb().appendChild(o)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});db("Browser");const fb={apiKey:"AIzaSyCbBmmxn4Qj4CU6ymfG4MY5VGqCPSo13HY",authDomain:"controle-financeiro-b98ec.firebaseapp.com",projectId:"controle-financeiro-b98ec",storageBucket:"controle-financeiro-b98ec.firebasestorage.app",messagingSenderId:"418109336597",appId:"1:418109336597:web:871b262a76e57455ebb21c",measurementId:"G-7RW2F269V6"},ac=au(fb),en=gb(ac),q=Rh(ac);n0(en,pp).then(()=>{}).catch(n=>{console.error("Erro ao configurar persistência do Firebase Auth:",n)});const co=Object.freeze(Object.defineProperty({__proto__:null,app:ac,auth:en,db:q},Symbol.toStringTag,{value:"Module"}));function No(n,e=null,t=null){if(!n.parcelasTotal||n.parcelasTotal<=1)return null;try{const o=new Date(n.dataInicio);let r;e&&t?r=new Date(e,t-1,1):r=new Date;let s=(r.getFullYear()-o.getFullYear())*12+(r.getMonth()-o.getMonth())+1;return s>n.parcelasTotal&&(s=n.parcelasTotal),s<1&&(s=1),s}catch(o){return console.error("Erro ao calcular parcela da recorrente:",o),1}}function xp(n,e=[],t=null,o=null){if(!t||!o){const m=new Date;t=m.getFullYear(),o=m.getMonth()+1}const r=e.some(m=>{if(!m.recorrenteId||m.recorrenteId!==n.id)return!1;let f;if(m.createdAt&&typeof m.createdAt=="object"&&m.createdAt.seconds)f=new Date(m.createdAt.seconds*1e3);else if(m.createdAt)f=new Date(m.createdAt);else return!1;return f.getFullYear()===t&&f.getMonth()+1===o}),a=No(n,t,o);let s=o+1,c=t;s>12&&(s=1,c++);const l=No(n,c,s);let d=o-1,h=t;d<1&&(d=12,h--);const g=No(n,h,d);return{foiEfetivadaEsteMes:r,parcelaAtual:a,proximaParcela:l,ultimaParcela:g,totalParcelas:n.parcelasTotal,temParcelas:n.parcelasTotal&&n.parcelasTotal>1,ativa:n.ativa!==!1}}async function Tp(n,e){try{const t=oe(q,"recorrentes"),o=fe(t,ne("budgetId","==",e));return(await he(o)).docs.map(a=>({id:a.id,...a.data()}))}catch(t){return console.error("Erro ao buscar recorrentes:",t),[]}}async function Ua(n,e,t){try{const o={...t,userId:n,budgetId:e,ativa:t.ativa!==void 0?t.ativa:!0,createdAt:Ae(),parcelasRestantes:t.parcelasRestantes||null,parcelasTotal:t.parcelasTotal||null,efetivarMesAtual:t.efetivarMesAtual!==void 0?t.efetivarMesAtual:!1},r=await Xt(oe(q,"recorrentes"),o);return console.log("✅ Recorrente adicionada:",r.id),r.id}catch(o){throw console.error("Erro ao adicionar recorrente:",o),o}}async function sc(n,e,t){try{const o=qe(q,"recorrentes",e);await ht(o,{...t,updatedAt:Ae()}),console.log("✅ Recorrente atualizada:",e)}catch(o){throw console.error("Erro ao atualizar recorrente:",o),o}}async function za(n,e){try{const t=qe(q,"recorrentes",e);await Qe(t),console.log("✅ Recorrente deletada:",e)}catch(t){throw console.error("Erro ao deletar recorrente:",t),t}}const wb=Object.freeze(Object.defineProperty({__proto__:null,addDespesaRecorrente:Ua,calcularParcelaRecorrente:No,calcularStatusRecorrente:xp,deleteDespesaRecorrente:za,getDespesasRecorrentes:Tp,updateDespesaRecorrente:sc},Symbol.toStringTag,{value:"Module"}));class vb{constructor(){this.queue=[],this.isShowing=!1,this.defaultDuration=3e3}show(e,t="info",o=null){const r={message:e,type:t,duration:o||this.defaultDuration};this.queue.push(r),this.processQueue()}call(e){typeof e=="string"?this.show(e,"info"):typeof e=="object"&&this.show(e.message||"Notificação",e.type||"info",e.duration)}processQueue(){if(this.isShowing||this.queue.length===0)return;this.isShowing=!0;const e=this.queue.shift();this.createSnackbar(e)}createSnackbar(e){const{message:t,type:o,duration:r}=e;this.removeExistingSnackbars();const a=document.createElement("div");a.className=this.getSnackbarClasses(o),a.innerHTML=this.getSnackbarContent(t,o),a.classList.add(`snackbar-${o}`),this.applyThemeStyles(a,o),a.style.zIndex="99999",a.style.bottom="80px",this.setupEventListeners(a),document.body.appendChild(a),requestAnimationFrame(()=>{a.classList.add("snackbar-show")}),setTimeout(()=>{this.removeSnackbar(a)},r)}getCurrentTheme(){return document.documentElement.classList.contains("dark")?"dark":"light"}getCurrentThemeColor(){return localStorage.getItem("themeColor")||document.documentElement.getAttribute("data-theme-color")||"blue"}applyThemeStyles(e,t){const o=this.getCurrentTheme(),r=this.getCurrentThemeColor(),a={blue:{primary:"#3B82F6",secondary:"#1E40AF",light:"#DBEAFE"},green:{primary:"#10B981",secondary:"#059669",light:"#D1FAE5"},purple:{primary:"#8B5CF6",secondary:"#7C3AED",light:"#EDE9FE"},orange:{primary:"#F59E0B",secondary:"#D97706",light:"#FEF3C7"}},s=a[r]||a.blue,l=(h=>{switch(h){case"success":return o==="dark"?{bg:s.primary,color:"#ffffff",border:s.secondary}:{bg:s.secondary,color:"#ffffff",border:s.primary};case"error":return o==="dark"?{bg:"#ef4444",color:"#ffffff",border:"#dc2626"}:{bg:"#dc2626",color:"#ffffff",border:"#b91c1c"};case"warning":return o==="dark"?{bg:"#f59e0b",color:"#1f2937",border:"#d97706"}:{bg:"#d97706",color:"#ffffff",border:"#b45309"};case"info":return o==="dark"?{bg:s.primary,color:"#ffffff",border:s.secondary}:{bg:s.secondary,color:"#ffffff",border:s.primary};default:return o==="dark"?{bg:s.primary,color:"#ffffff",border:s.secondary}:{bg:s.secondary,color:"#ffffff",border:s.primary}}})(t),d=o==="dark"?"0.4":"0.3";e.style.backgroundColor=l.bg,e.style.color=l.color,e.style.border=`1px solid ${l.border}`,e.style.boxShadow=`0 4px 12px rgba(${l.bg.replace("#","").match(/.{2}/g).map(h=>parseInt(h,16)).join(", ")}, ${d})`,setTimeout(()=>{const h=e.querySelector(".snackbar-close");h&&(h.style.color=l.color)},10)}getSnackbarClasses(e){return["fixed","left-1/2","transform","-translate-x-1/2","px-6","py-3","rounded-lg","shadow-lg","max-w-sm","w-full","mx-4","opacity-0","translate-y-4","transition-all","duration-300","ease-out"].join(" ")}getSnackbarContent(e,t){const o={success:"✅",error:"❌",warning:"⚠️",info:"ℹ️",default:"💬"};return`
      <div class="flex items-center gap-3">
        <span class="text-lg">${o[t]||o.default}</span>
        <span class="flex-1 text-sm font-medium">${e}</span>
        <button class="snackbar-close text-white opacity-70 hover:opacity-100 transition-opacity">
          <span class="text-lg">×</span>
        </button>
      </div>
    `}removeExistingSnackbars(){document.querySelectorAll('.snackbar-show, [class*="snackbar"]').forEach(t=>{this.removeSnackbar(t)})}removeSnackbar(e){!e||!e.parentNode||(e.classList.remove("snackbar-show"),e.classList.add("snackbar-hide"),setTimeout(()=>{e.parentNode&&e.parentNode.removeChild(e),this.isShowing=!1,this.processQueue()},300))}setupEventListeners(e){const t=e.querySelector(".snackbar-close");t&&t.addEventListener("click",()=>{this.removeSnackbar(e)}),e.addEventListener("click",o=>{o.target===e&&this.removeSnackbar(e)})}}const vn=new vb;function B(n){typeof n=="string"?vn.show(n,"info"):typeof n=="object"&&vn.show(n.message,n.type||"info",n.duration)}B.show=(n,e="info",t)=>{vn.show(n,e,t)};B.success=(n,e)=>{vn.show(n,"success",e)};B.error=(n,e)=>{vn.show(n,"error",e)};B.warning=(n,e)=>{vn.show(n,"warning",e)};B.info=(n,e)=>{vn.show(n,"info",e)};typeof window<"u"&&(window.Snackbar=B);window.showAddRecorrenteModal=function(n={}){const e=!!n&&Object.keys(n).length>0,t=Qt({title:e?"Editar Despesa Recorrente":"Nova Despesa Recorrente",content:"",onClose:()=>t.remove()}),o=window.appState.currentUser,r=window.appState.currentBudget;if(!o){B({message:"Você precisa estar logado para adicionar recorrentes.",type:"error"});return}if(!r){B({message:"Selecione um orçamento antes de adicionar recorrentes.",type:"error"});return}const a=xg({initialData:n,onSubmit:async c=>{try{if(document.querySelector(".fab")?.classList.add("hidden"),e&&n.id)await sc(o.uid,n.id,c);else{const l=await Ua(o.uid,r.id,c);if(c.efetivarMesAtual){console.log("🚀 Efetivando recorrente no mês atual...");const d=new Date,h=d.getMonth()+1,g=d.getFullYear(),{db:m}=await pe(async()=>{const{db:T}=await Promise.resolve().then(()=>co);return{db:T}},void 0),f=oe(m,"transactions"),b=(await he(fe(f,ne("userId","==",o.uid),ne("recorrenteId","==",l)))).docs.some(T=>{const D=T.data(),L=D.createdAt&&D.createdAt.toDate?D.createdAt.toDate():D.createdAt?new Date(D.createdAt):null;return L&&L.getMonth()+1===h&&L.getFullYear()===g});if(console.log("🔍 Já existe transação neste mês?",b),b)console.log("⏭️ Transação já existe para este mês, pulando...");else{const T={userId:o.uid,budgetId:r.id,descricao:c.descricao,valor:c.valor,categoriaId:c.categoriaId,tipo:"despesa",createdAt:d,recorrenteId:l,recorrenteNome:c.descricao,parcelaAtual:c.parcelasTotal?1:null,parcelasTotal:c.parcelasTotal||null},D=await Xt(oe(m,"transactions"),T);console.log("✅ Transação criada para mês atual:",D.id);try{await Xt(oe(m,"logAplicacoes"),{userId:o.uid,mesAno:`${g}-${String(h).padStart(2,"0")}`,recorrenteId:l,descricao:c.descricao,valor:c.valor,dataAplicacao:d,transacaoId:D.id,aplicacaoImediata:!0}),console.log("📝 Aplicação imediata registrada no log")}catch(L){console.error("Erro ao registrar aplicação imediata no log:",L)}}}}await new Promise(l=>setTimeout(l,200)),await window.loadRecorrentes(),t.remove(),B({message:e?"Despesa recorrente editada!":"Despesa recorrente salva!",type:"success"}),setTimeout(async()=>{document.querySelector(".fab")?.classList.remove("hidden"),e&&n.id&&(console.log("🔄 Recalculando transações da recorrente editada:",n.id),await window.recalcularTransacoesRecorrente(n.id,c)),await window.loadRecorrentes(),await window.loadTransactions(),await window.loadCategories(),window.location.hash.includes("recorrentes")?window._renderRecorrentes():window.location.hash.includes("dashboard")?window.renderDashboard():window.location.hash.includes("transacoes")&&window.renderTransactions(),document.dispatchEvent(new CustomEvent("recorrente-adicionada")),document.dispatchEvent(new CustomEvent("dados-atualizados"))},100)}catch(l){document.querySelector(".fab")?.classList.remove("hidden"),console.error("Erro ao adicionar/editar recorrente:",l),B({message:"Erro ao salvar recorrente",type:"error"})}}}),s=t.querySelector(".modal-body");s?s.appendChild(a):t.appendChild(a),document.body.appendChild(t)};window.showAddTransactionModal=function(n={}){console.log("🔧 showAddTransactionModal chamada com:",n),console.log("🔧 window.Modal disponível:",!!window.Modal),console.log("🔧 window.appState.categories:",window.appState?.categories);const e=!!n&&Object.keys(n).length>0;try{const t=Qt({title:e?"Editar Transação":"Nova Transação",content:`
      <form id="transaction-form" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Descrição
          </label>
          <input 
            type="text" 
            id="descricao" 
            name="descricao" 
            value="${n.descricao||""}"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            placeholder="Ex: Salário, Aluguel, Compras..."
            required
          />
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Valor
          </label>
          <input 
            type="number" 
            id="valor" 
            name="valor" 
            value="${n.valor!==null&&n.valor!==void 0?n.valor:""}"
            step="0.01" 
            min="0"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            placeholder="0.00"
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
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            required
          >
            <option value="receita" ${n.tipo==="receita"?"selected":""}>Receita</option>
            <option value="despesa" ${n.tipo==="despesa"?"selected":""}>Despesa</option>
          </select>
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Categoria
          </label>
          <select 
            id="categoriaId" 
            name="categoriaId"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            <option value="">Sem categoria</option>
            ${(window.appState?.categories||[]).map(s=>{const c=s.limite?parseFloat(s.limite):0,l=window.appState?.transactions?.filter(m=>m.categoriaId===s.id&&m.tipo==="despesa")?.reduce((m,f)=>m+parseFloat(f.valor),0)||0,d=c-l,h=c>0?` (R$ ${d.toFixed(2)} disponível)`:"",g=d<0?"text-red-600":d<c*.2?"text-yellow-600":"text-green-600";return`<option value="${s.id}" ${n.categoriaId===s.id?"selected":""}>
                ${s.nome}${h}
              </option>`}).join("")}
          </select>
          <div id="categoria-info" class="mt-2 text-sm text-gray-600 dark:text-gray-400 hidden">
            <!-- Informações da categoria selecionada serão exibidas aqui -->
          </div>
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Data
          </label>
          <input 
            type="date" 
            id="data" 
            name="data" 
            value="${n.data?n.data.toDate?n.data.toDate().toISOString().split("T")[0]:new Date(n.data).toISOString().split("T")[0]:new Date().toISOString().split("T")[0]}"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            required
          />
        </div>
        
        <div class="flex gap-2 pt-4">
          <button 
            type="submit" 
            class="flex-1 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
          >
            ${e?"Atualizar":"Adicionar"}
          </button>
          <button 
            type="button" 
            onclick="this.closest('.modal').remove()"
            class="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 transition-colors dark:bg-gray-600 dark:text-gray-300"
          >
            Cancelar
          </button>
        </div>
      </form>
    `,onClose:()=>t.remove()});document.body.appendChild(t),console.log("✅ Modal de transação adicionado ao DOM");const o=t.querySelector("#transaction-form");o.addEventListener("submit",async s=>{s.preventDefault();const c=new FormData(o),l={descricao:c.get("descricao"),valor:parseFloat(c.get("valor")),tipo:c.get("tipo"),categoriaId:c.get("categoriaId")||null,data:c.get("data")};try{e?(await window.updateTransaction(n.id,l),t.remove(),window.refreshCurrentView()):(t.remove(),await window.addTransactionWithConfirmation(l),window.refreshCurrentView())}catch(d){console.error("Erro ao salvar transação:",d),d.message!=="Operação cancelada pelo usuário"&&B.show("Erro ao salvar transação","error")}});const r=t.querySelector("#categoriaId"),a=t.querySelector("#categoria-info");r.addEventListener("change",()=>{const s=r.value;if(s){const c=window.appState?.categories?.find(l=>l.id===s);if(c){const l=c.limite?parseFloat(c.limite):0,d=window.appState?.transactions?.filter(v=>v.categoriaId===s&&v.tipo==="despesa")?.reduce((v,b)=>v+parseFloat(b.valor),0)||0,h=l-d,g=l>0?d/l*100:0;let m="",f="";l===0?(m="Sem limite definido",f="text-gray-500"):h<0?(m=`⚠️ Limite excedido em R$ ${Math.abs(h).toFixed(2)}`,f="text-red-600"):h<l*.2?(m=`⚠️ Quase no limite (${g.toFixed(1)}% usado)`,f="text-yellow-600"):(m=`✓ Dentro do limite (${g.toFixed(1)}% usado)`,f="text-green-600"),a.innerHTML=`
          <div class="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <div class="font-medium">${c.nome}</div>
            <div class="text-xs mt-1">
              <div>Limite: R$ ${l.toFixed(2)}</div>
              <div>Gasto: R$ ${d.toFixed(2)}</div>
              <div>Disponível: R$ ${h.toFixed(2)}</div>
              <div class="${f} mt-1">${m}</div>
            </div>
          </div>
        `,a.classList.remove("hidden")}}else a.classList.add("hidden")}),n.categoriaId&&r.dispatchEvent(new Event("change"))}catch(t){console.error("❌ Erro ao criar modal de transação:",t),window.Snackbar?window.Snackbar.show("Erro ao abrir modal de transação","error"):alert("Erro ao abrir modal de transação: "+t.message)}};window.editTransaction=function(n){const e=window.appState.transactions?.find(t=>t.id===n);e&&window.showAddTransactionModal(e)};window.showAddCategoryModal=function(n={}){console.log("🔧 showAddCategoryModal chamada com:",n),console.log("🔧 window.Modal disponível:",!!window.Modal);const e=!!n&&Object.keys(n).length>0;try{const t=Qt({title:e?"Editar Categoria":"Nova Categoria",content:`
      <form id="category-form" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Nome
          </label>
          <input 
            type="text" 
            id="nome" 
            name="nome" 
            value="${n.nome||""}"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
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
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            required
          >
            <option value="despesa" ${n.tipo==="despesa"?"selected":""}>Despesa</option>
            <option value="receita" ${n.tipo==="receita"?"selected":""}>Receita</option>
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
            value="${n.limite||""}"
            step="0.01" 
            min="0"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            placeholder="0.00"
          />
        </div>
        
        <div class="flex gap-2 pt-4">
          <button 
            type="submit" 
            class="flex-1 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
          >
            ${e?"Atualizar":"Adicionar"}
          </button>
          <button 
            type="button" 
            onclick="this.closest('.modal').remove()"
            class="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 transition-colors dark:bg-gray-600 dark:text-gray-300"
          >
            Cancelar
          </button>
        </div>
      </form>
    `,onClose:()=>t.remove()});document.body.appendChild(t),console.log("✅ Modal de categoria adicionado ao DOM");const o=t.querySelector("#category-form");o.addEventListener("submit",async r=>{r.preventDefault();const a=new FormData(o),s={nome:a.get("nome"),tipo:a.get("tipo"),limite:a.get("limite")?parseFloat(a.get("limite")):null};try{e?(await window.updateCategory(n.id,s),t.remove(),window.refreshCurrentView()):(await window.addCategoryWithConfirmation(s),t.remove(),window.refreshCurrentView())}catch(c){console.error("Erro ao salvar categoria:",c),c.message!=="Operação cancelada pelo usuário"&&B.show("Erro ao salvar categoria","error")}})}catch(t){console.error("❌ Erro ao criar modal de categoria:",t),window.Snackbar?window.Snackbar.show("Erro ao abrir modal de categoria","error"):alert("Erro ao abrir modal de categoria: "+t.message)}};window.editCategory=function(n){const e=window.appState.categories?.find(t=>t.id===n);e&&window.showAddCategoryModal(e)};function si(n="theme-toggle-btn"){const e=window.matchMedia("(prefers-color-scheme: dark)").matches,t=document.documentElement,o=localStorage.getItem("theme"),r=o?o==="dark":e;t.classList.toggle("dark",r),s();const a=document.getElementById(n);if(a){const d=a.cloneNode(!0);a.parentNode.replaceChild(d,a),d.addEventListener("click",h=>{h.preventDefault(),h.stopPropagation(),console.log("🔧 Clique no botão de tema detectado"),console.log("🔧 Classes antes:",t.classList.toString());const g=t.classList.toggle("dark");localStorage.setItem("theme",g?"dark":"light"),console.log("🔧 Classes depois:",t.classList.toString()),console.log("🔧 isDarkNow:",g),console.log("🔧 localStorage theme:",localStorage.getItem("theme")),s(),c(),window.mobileEnhancements&&window.mobileEnhancements.adjustForTheme&&(window.mobileEnhancements.adjustForTheme(g),console.log("📱 Melhorias mobile atualizadas para tema:",g?"dark":"light")),console.log("🎨 Tema alterado para:",g?"dark":"light")}),console.log("✅ Botão de tema configurado:",n)}else console.warn("⚠️ Botão de tema não encontrado:",n);function s(){const d=document.getElementById("theme-icon");if(console.log("🔧 updateIcon chamada, ícone encontrado:",!!d),console.log('🔧 root.classList.contains("dark"):',t.classList.contains("dark")),d){const h=t.classList.contains("dark")?"🌙":"☀️";console.log("🔧 Novo ícone:",h),d.textContent=h}else console.log("🔧 Elemento theme-icon não encontrado")}function c(){const d=window.location.hash.replace("#","")||"/dashboard";l(),setTimeout(()=>{requestAnimationFrame(()=>{switch(d){case"/dashboard":window.renderDashboard&&window.renderDashboard();break;case"/transactions":window.renderTransactions&&window.renderTransactions();break;case"/categories":window.renderCategories&&window.renderCategories();break;case"/recorrentes":window.renderRecorrentes&&window.renderRecorrentes();break;case"/notifications":window.renderNotifications&&window.renderNotifications();break;case"/settings":window.renderSettings&&window.renderSettings();break;default:window.renderDashboard&&window.renderDashboard()}l(),console.log("✅ Tema aplicado na aba atual")})},200)}function l(){document.querySelectorAll('[class*="dark:"]').forEach(v=>{v.offsetHeight}),document.body.offsetHeight,document.documentElement.offsetHeight,document.querySelectorAll(".card-resumo, .bottom-nav, .modal-content, .btn-secondary, .form-group input, .form-group select, .form-group textarea, .tab-container, .tab-header, .tab-content, .list-item, .card-standard").forEach(v=>{v.offsetHeight});const m=document.documentElement.classList.contains("dark");document.querySelectorAll("*").forEach(v=>{const b=getComputedStyle(v);b.backgroundColor&&b.backgroundColor!=="rgba(0, 0, 0, 0)"&&v.offsetHeight}),console.log("🎨 Elementos de tema atualizados (isDark:",m,")")}}class qd{constructor(){this.touchStartX=0,this.touchEndX=0,this.touchStartY=0,this.touchEndY=0,this.isSwiping=!1,this.swipeThreshold=80,this.tabs=["/dashboard","/transactions","/categories","/analytics","/recorrentes","/notifications","/settings"],this.currentTabIndex=0,this.container=null,this.swipeIndicator=null,this.isEnabled=!0,this.hasShownInitialHint=!1,this.init()}init(){if(console.log("🔧 SwipeNavigation.init() chamado"),this.container=document.querySelector("#app-content"),!this.container){console.warn("SwipeNavigation: Container #app-content não encontrado");return}if(console.log("✅ Container encontrado:",this.container),!window.appState?.currentUser){console.log("SwipeNavigation: Usuário não logado, aguardando...");return}console.log("✅ Usuário logado:",window.appState.currentUser.uid),this.createSwipeIndicator(),this.bindEvents(),this.updateCurrentTabIndex(),console.log("SwipeNavigation: Inicializado com sucesso"),console.log("🔍 Estado final:",{isEnabled:this.isEnabled,container:this.container,tabs:this.tabs,currentTabIndex:this.currentTabIndex})}createSwipeIndicator(){this.swipeIndicator=document.createElement("div"),this.swipeIndicator.id="swipe-indicator",this.swipeIndicator.innerHTML=`
      <div class="swipe-dots">
        ${this.tabs.map((t,o)=>`<div class="swipe-dot ${o===0?"active":""}" data-index="${o}"></div>`).join("")}
      </div>
      <div class="swipe-hint">← Deslize para navegar →</div>
    `,this.swipeIndicator.className="swipe-indicator";const e=document.createElement("style");e.textContent=`
      .swipe-indicator {
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        z-index: 1000;
        background: rgba(0, 0, 0, 0.8);
        color: white;
        padding: 8px 16px;
        border-radius: 20px;
        font-size: 12px;
        opacity: 0;
        transition: opacity 0.3s ease;
        pointer-events: none;
      }
      
      .swipe-indicator.show {
        opacity: 1;
      }
      
      .swipe-dots {
        display: flex;
        gap: 6px;
        justify-content: center;
        margin-bottom: 4px;
      }
      
      .swipe-dot {
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.5);
        transition: all 0.3s ease;
      }
      
      .swipe-dot.active {
        background: white;
        transform: scale(1.2);
      }
      
      .swipe-hint {
        text-align: center;
        font-size: 10px;
        opacity: 0.8;
      }
      
      .swipe-feedback {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(0, 0, 0, 0.8);
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        font-size: 14px;
        z-index: 1001;
        opacity: 0;
        transition: opacity 0.2s ease;
        pointer-events: none;
      }
      
      .swipe-feedback.show {
        opacity: 1;
      }
      
      .swipe-transition {
        transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      }
      
      @media (max-width: 768px) {
        .swipe-indicator {
          top: 10px;
          padding: 6px 12px;
          font-size: 11px;
        }
      }
    `,document.head.appendChild(e),document.body.appendChild(this.swipeIndicator)}bindEvents(){const e=document.getElementById("login-page");if(e&&e.style.display!=="none"){console.log("SwipeNavigation: Tela de login ativa, não inicializando eventos");return}console.log("SwipeNavigation: Configurando eventos de navegação..."),this.container.addEventListener("touchstart",this.handleTouchStart.bind(this),{passive:!1}),this.container.addEventListener("touchmove",this.handleTouchMove.bind(this),{passive:!1}),this.container.addEventListener("touchend",this.handleTouchEnd.bind(this),{passive:!1}),this.container.addEventListener("mousedown",this.handleMouseStart.bind(this)),this.container.addEventListener("mousemove",this.handleMouseMove.bind(this)),this.container.addEventListener("mouseup",this.handleMouseEnd.bind(this)),document.addEventListener("keydown",this.handleKeydown.bind(this),{capture:!0}),console.log("SwipeNavigation: Evento de teclado configurado no document"),document.addEventListener("keydown",t=>{console.log("🎹 SwipeNavigation - Evento de teclado capturado:",t.key,"Target:",t.target.tagName)},{capture:!0}),this.observeRouteChanges(),console.log("SwipeNavigation: Todos os eventos configurados com sucesso")}handleTouchStart(e){if(!this.isEnabled){console.log("👆 SwipeNavigation: Desabilitado, ignorando touch start");return}this.touchStartX=e.touches[0].clientX,this.touchStartY=e.touches[0].clientY,this.isSwiping=!1,console.log("👆 SwipeNavigation: Touch start em",this.touchStartX,this.touchStartY)}handleTouchMove(e){if(!this.isEnabled||!this.touchStartX){this.isEnabled||console.log("👆 SwipeNavigation: Desabilitado, ignorando touch move");return}const t=e.touches[0].clientX,o=e.touches[0].clientY,r=Math.abs(t-this.touchStartX),a=Math.abs(o-this.touchStartY);r>a&&r>20&&(this.isSwiping=!0,e.preventDefault(),console.log("👆 SwipeNavigation: Swipe horizontal detectado, deltaX:",r),this.showSwipeFeedback(r))}handleTouchEnd(e){if(!this.isEnabled||!this.isSwiping){this.isEnabled||console.log("👆 SwipeNavigation: Desabilitado, ignorando touch end"),this.isSwiping||console.log("👆 SwipeNavigation: Não estava fazendo swipe, ignorando touch end");return}this.touchEndX=e.changedTouches[0].clientX,this.touchEndY=e.changedTouches[0].clientY;const t=this.touchEndX-this.touchStartX,o=this.touchEndY-this.touchStartY;console.log("👆 SwipeNavigation: Touch end, deltaX:",t,"deltaY:",o),Math.abs(t)>this.swipeThreshold&&Math.abs(t)>Math.abs(o)?(console.log("👆 SwipeNavigation: Swipe válido detectado, direção:",t>0?"right":"left"),this.handleSwipe(t>0?"right":"left")):console.log("👆 SwipeNavigation: Swipe inválido ou insuficiente"),this.resetSwipe()}handleMouseStart(e){!this.isEnabled||e.button!==0||(this.touchStartX=e.clientX,this.touchStartY=e.clientY,this.isSwiping=!1)}handleMouseMove(e){if(!this.isEnabled||!this.touchStartX)return;const t=Math.abs(e.clientX-this.touchStartX),o=Math.abs(e.clientY-this.touchStartY);t>o&&t>10&&(this.isSwiping=!0)}handleMouseEnd(e){if(!this.isEnabled||!this.isSwiping)return;this.touchEndX=e.clientX,this.touchEndY=e.clientY;const t=this.touchEndX-this.touchStartX,o=this.touchEndY-this.touchStartY;Math.abs(t)>this.swipeThreshold&&Math.abs(t)>Math.abs(o)&&this.handleSwipe(t>0?"right":"left"),this.resetSwipe()}handleKeydown(e){if(!(e.target.tagName==="INPUT"||e.target.tagName==="TEXTAREA"||e.target.contentEditable==="true")){if(!this.isEnabled){console.log("SwipeNavigation: Desabilitado, ignorando tecla:",e.key);return}switch(console.log("🎹 SwipeNavigation: Tecla pressionada:",e.key,"Target:",e.target.tagName),e.key){case"ArrowLeft":console.log("⬅️ SwipeNavigation: Seta esquerda - navegando para aba anterior"),e.preventDefault(),e.stopPropagation(),this.navigateToTab(this.currentTabIndex-1);break;case"ArrowRight":console.log("➡️ SwipeNavigation: Seta direita - navegando para próxima aba"),e.preventDefault(),e.stopPropagation(),this.navigateToTab(this.currentTabIndex+1);break;case"ArrowUp":console.log("⬆️ SwipeNavigation: Seta cima - primeira aba"),e.preventDefault(),e.stopPropagation(),this.navigateToTab(0);break;case"ArrowDown":console.log("⬇️ SwipeNavigation: Seta baixo - última aba"),e.preventDefault(),e.stopPropagation(),this.navigateToTab(this.tabs.length-1);break}}}handleSwipe(e){this.updateCurrentTabIndex();let t=this.currentTabIndex;e==="left"&&this.currentTabIndex<this.tabs.length-1?t=this.currentTabIndex+1:e==="right"&&this.currentTabIndex>0&&(t=this.currentTabIndex-1),t!==this.currentTabIndex?(this.navigateToTab(t),this.provideHapticFeedback()):this.showSwipeFeedback("edge")}navigateToTab(e){if(e<0||e>=this.tabs.length)return;const t=this.tabs[e];if(console.log(`SwipeNavigation: Navegando para ${t}`),document.activeElement&&document.activeElement.id==="category-filter"){console.log("🔧 SwipeNavigation: Bloqueando navegação durante filtro de categoria");return}this.animateTransition(e),window.router?window.router(t):window.location.hash=t,this.currentTabIndex=e,this.updateSwipeIndicator()}animateTransition(e){const t=this.container,o=e>this.currentTabIndex?1:-1;t.classList.add("swipe-transition"),t.style.transform=`translateX(${o*20}px)`,t.style.opacity="0.8",setTimeout(()=>{t.style.transform="translateX(0)",t.style.opacity="1"},50),setTimeout(()=>{t.classList.remove("swipe-transition"),t.style.transform="",t.style.opacity=""},300)}showSwipeFeedback(e){let t="";switch(e){case"edge":t=this.currentTabIndex===0?"Primeira aba":"Última aba";break;default:return}const o=document.createElement("div");o.className="swipe-feedback",o.textContent=t,document.body.appendChild(o),setTimeout(()=>o.classList.add("show"),10),setTimeout(()=>{o.classList.remove("show"),setTimeout(()=>o.remove(),200)},1e3)}provideHapticFeedback(){"vibrate"in navigator&&navigator.vibrate(50)}updateCurrentTabIndex(){const e=document.querySelector(".nav-btn.active");if(e){const t=e.getAttribute("data-route"),o=this.tabs.indexOf(t);o!==this.currentTabIndex&&(console.log("📍 Atualizando índice da aba atual:",{activeTabRoute:t,oldIndex:this.currentTabIndex,newIndex:o,availableTabs:this.tabs}),this.currentTabIndex=o,console.log("✅ Índice atualizado:",this.currentTabIndex))}}updateSwipeIndicator(){if(!this.swipeIndicator)return;this.swipeIndicator.querySelectorAll(".swipe-dot").forEach((t,o)=>{t.classList.toggle("active",o===this.currentTabIndex)}),this.hasShownInitialHint||(this.hasShownInitialHint=!0,this.swipeIndicator.classList.add("show"),setTimeout(()=>{this.swipeIndicator.classList.remove("show")},4e3))}observeRouteChanges(){let e=null,t=null;new MutationObserver(()=>{e&&clearTimeout(e),e=setTimeout(()=>{const a=document.querySelector(".nav-btn.active")?.getAttribute("data-route");a!==t&&(t=a,this.updateCurrentTabIndex(),this.updateSwipeIndicator())},200)}).observe(document.body,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["class"]})}resetSwipe(){this.touchStartX=0,this.touchStartY=0,this.touchEndX=0,this.touchEndY=0,this.isSwiping=!1}enable(){this.isEnabled=!0,console.log("SwipeNavigation: Habilitado")}disable(){this.isEnabled=!1,console.log("SwipeNavigation: Desabilitado")}destroy(){this.swipeIndicator&&this.swipeIndicator.remove(),console.log("SwipeNavigation: Destruído")}}window.swipeNavigation=null;class yb{constructor(){this.isInitialized=!1,this.orientation="portrait",this.deviceType=this.detectDeviceType(),this.touchSupport=this.detectTouchSupport(),this.init()}init(){this.isInitialized||(console.log("📱 Inicializando melhorias mobile..."),this.detectOrientation(),this.setupOrientationListener(),this.setupViewportListener(),this.setupTouchOptimizations(),this.setupPerformanceOptimizations(),this.applyMobileOptimizations(),this.isInitialized=!0,console.log("✅ Melhorias mobile inicializadas"))}detectDeviceType(){const e=navigator.userAgent.toLowerCase(),t=/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(e);return/ipad|android(?!.*mobile)/i.test(e)?"tablet":t?"mobile":"desktop"}detectTouchSupport(){return"ontouchstart"in window||navigator.maxTouchPoints>0}detectOrientation(){window.innerHeight>window.innerWidth?this.orientation="portrait":this.orientation="landscape",document.body.classList.remove("orientation-portrait","orientation-landscape"),document.body.classList.add(`orientation-${this.orientation}`),console.log(`📱 Orientação detectada: ${this.orientation}`)}setupOrientationListener(){window.addEventListener("orientationchange",()=>{setTimeout(()=>{this.detectOrientation(),this.adjustForOrientation()},100)}),window.addEventListener("resize",()=>{const e=window.innerHeight>window.innerWidth?"portrait":"landscape";e!==this.orientation&&(this.orientation=e,this.detectOrientation(),this.adjustForOrientation())})}setupViewportListener(){if(this.deviceType==="mobile"){let e=document.querySelector('meta[name="viewport"]');e||(e=document.createElement("meta"),e.name="viewport",document.head.appendChild(e)),e.content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover"}}setupTouchOptimizations(){this.touchSupport&&(document.addEventListener("touchstart",e=>{const t=e.target.closest("button, .btn, .nav-btn, .mobile-btn, .fab");t&&t.classList.add("touch-active")},{passive:!0}),document.addEventListener("touchend",e=>{const t=e.target.closest("button, .btn, .nav-btn, .mobile-btn, .fab");t&&setTimeout(()=>{t.classList.remove("touch-active")},150)},{passive:!0}),document.addEventListener("touchend",e=>{const t=e.target.closest("button, .btn, .nav-btn, .mobile-btn, .fab, input, select");t&&(e.preventDefault(),t.click())}))}setupPerformanceOptimizations(){this.deviceType==="mobile"&&document.querySelectorAll(".overflow-y-auto, #app-content").forEach(t=>{t.style.webkitOverflowScrolling="touch",t.style.overscrollBehavior="contain"}),this.deviceType==="mobile"&&window.matchMedia("(prefers-reduced-motion: reduce)").matches&&document.body.classList.add("reduce-motion")}adjustForOrientation(){const e=document.getElementById("app-content"),t=document.querySelector(".bottom-nav"),o=document.querySelector(".fab");this.orientation==="landscape"&&this.deviceType==="mobile"?(e&&(e.style.paddingBottom="70px"),t&&(t.style.height="60px"),o&&(o.style.bottom="70px",o.style.width="50px",o.style.height="50px")):(e&&(e.style.paddingBottom="100px"),t&&(t.style.height="80px"),o&&(o.style.bottom="100px",o.style.width="60px",o.style.height="60px")),console.log(`📱 Ajustes aplicados para orientação: ${this.orientation}`)}applyMobileOptimizations(){document.body.classList.add(`device-${this.deviceType}`),this.touchSupport&&document.body.classList.add("touch-device"),document.querySelectorAll(".icon-standard, .nav-icon, .btn-icon").forEach(t=>{(t.offsetWidth<44||t.offsetHeight<44)&&(t.style.minWidth="44px",t.style.minHeight="44px",t.style.display="flex",t.style.alignItems="center",t.style.justifyContent="center")}),this.deviceType==="mobile"&&document.querySelectorAll(".text-gray-400, .text-gray-500").forEach(o=>{o.classList.add("mobile-contrast-enhanced")})}detectDarkMode(){return window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches}adjustForTheme(e){this.deviceType==="mobile"&&document.querySelectorAll(".mobile-contrast-enhanced").forEach(o=>{e?o.style.color="#e5e7eb":o.style.color="#374151"})}optimizeForLowEndDevice(){if(navigator.hardwareConcurrency<=2||navigator.deviceMemory<=2){document.body.classList.add("low-end-device");const t=document.createElement("style");t.textContent=`
        .low-end-device * {
          animation-duration: 0.1s !important;
          transition-duration: 0.1s !important;
        }
        .low-end-device .transition-all {
          transition: none !important;
        }
      `,document.head.appendChild(t),console.log("📱 Otimizações para dispositivo de baixa performance aplicadas")}}reconfigure(){this.detectOrientation(),this.adjustForOrientation(),this.applyMobileOptimizations()}destroy(){document.body.classList.remove(`device-${this.deviceType}`,"touch-device","orientation-portrait","orientation-landscape","low-end-device"),this.isInitialized=!1,console.log("📱 Melhorias mobile removidas")}}const bb=`
  .touch-active {
    transform: scale(0.95) !important;
    opacity: 0.8 !important;
    transition: all 0.1s ease !important;
  }

  .mobile-contrast-enhanced {
    color: #374151 !important;
  }

  .dark .mobile-contrast-enhanced {
    color: #e5e7eb !important;
  }

  .device-mobile .grid-cols-2 {
    grid-template-columns: 1fr !important;
  }

  .device-mobile .flex-row {
    flex-direction: column !important;
  }

  .orientation-landscape.device-mobile #app-content {
    padding-bottom: 70px !important;
  }

  .orientation-portrait.device-mobile #app-content {
    padding-bottom: 100px !important;
  }

  .reduce-motion * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }

  @supports (padding: max(0px)) {
    .device-mobile .app-container {
      padding-top: max(env(safe-area-inset-top), 0px) !important;
      padding-bottom: max(env(safe-area-inset-bottom), 80px) !important;
      padding-left: max(env(safe-area-inset-left), 0px) !important;
      padding-right: max(env(safe-area-inset-right), 0px) !important;
    }
  }
`;if(!document.getElementById("mobile-enhancement-styles")){const n=document.createElement("style");n.id="mobile-enhancement-styles",n.textContent=bb,document.head.appendChild(n)}const Rn=new yb;class Eb{constructor(){this.isSupported=this.checkSupport(),this.isAvailable=!1,this.credentials=null}checkSupport(){return window.PublicKeyCredential&&window.PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable&&window.PublicKeyCredential.isConditionalMediationAvailable}async checkAvailability(){if(!this.isSupported)return console.log("🔒 BiometricAuth: Web Authentication API não suportada"),!1;try{const[e,t]=await Promise.all([window.PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable(),window.PublicKeyCredential.isConditionalMediationAvailable()]);return this.isAvailable=e&&t,console.log("🔒 BiometricAuth: Disponibilidade verificada:",{userVerifying:e,conditionalMediation:t,isAvailable:this.isAvailable}),this.isAvailable}catch(e){return console.error("🔒 BiometricAuth: Erro ao verificar disponibilidade:",e),!1}}async register(e,t){if(!this.isAvailable)throw new Error("Autenticação biométrica não disponível");try{console.log("🔒 BiometricAuth: Iniciando registro biométrico...");const o=new Uint8Array(32);window.crypto.getRandomValues(o);const r={challenge:o,rp:{name:"Servo Tech Finanças",id:window.location.hostname},user:{id:new Uint8Array(16),name:t,displayName:t},pubKeyCredParams:[{type:"public-key",alg:-7}],authenticatorSelection:{authenticatorAttachment:"platform",userVerification:"required"},timeout:6e4,attestation:"direct"},a=await navigator.credentials.create({publicKey:r});return this.credentials=a,this.saveCredentials(e,a),console.log("🔒 BiometricAuth: Registro biométrico concluído"),!0}catch(o){throw console.error("🔒 BiometricAuth: Erro no registro:",o),o}}async authenticate(){if(!this.isAvailable)throw new Error("Autenticação biométrica não disponível");try{console.log("🔒 BiometricAuth: Iniciando autenticação biométrica...");const e=this.loadCredentials();if(!e)throw new Error("Nenhuma credencial biométrica registrada");const t=new Uint8Array(32);window.crypto.getRandomValues(t);const o={challenge:t,rpId:window.location.hostname,allowCredentials:[{type:"public-key",id:e.rawId,transports:["internal"]}],userVerification:"required",timeout:6e4},r=await navigator.credentials.get({publicKey:o});return console.log("🔒 BiometricAuth: Autenticação biométrica bem-sucedida"),{success:!0,userId:e.userId,credential:r}}catch(e){throw console.error("🔒 BiometricAuth: Erro na autenticação:",e),e}}saveCredentials(e,t){try{const o={userId:e,rawId:Array.from(t.rawId),type:t.type,response:{clientDataJSON:Array.from(t.response.clientDataJSON),attestationObject:Array.from(t.response.attestationObject)}};localStorage.setItem("biometric_credentials",JSON.stringify(o)),this.saveUserInfo(e),console.log("🔒 BiometricAuth: Credenciais salvas no localStorage")}catch(o){console.error("🔒 BiometricAuth: Erro ao salvar credenciais:",o)}}saveUserInfo(){try{const e=window.FirebaseAuth?.currentUser;if(e){const t={uid:e.uid,email:e.email,displayName:e.displayName,photoURL:e.photoURL,lastLogin:new Date().toISOString()};localStorage.setItem("biometric_user_info",JSON.stringify(t)),console.log("🔒 BiometricAuth: Informações do usuário salvas")}}catch(e){console.error("🔒 BiometricAuth: Erro ao salvar informações do usuário:",e)}}loadUserInfo(){try{const e=localStorage.getItem("biometric_user_info");return e?JSON.parse(e):null}catch(e){return console.error("🔒 BiometricAuth: Erro ao carregar informações do usuário:",e),null}}loadCredentials(){try{const e=localStorage.getItem("biometric_credentials");if(!e)return null;const t=JSON.parse(e);return t.rawId=new Uint8Array(t.rawId),t.response.clientDataJSON=new Uint8Array(t.response.clientDataJSON),t.response.attestationObject=new Uint8Array(t.response.attestationObject),t}catch(e){return console.error("🔒 BiometricAuth: Erro ao carregar credenciais:",e),null}}hasSavedCredentials(){return localStorage.getItem("biometric_credentials")!==null}removeCredentials(){try{return localStorage.removeItem("biometric_credentials"),console.log("🔒 BiometricAuth: Credenciais removidas"),!0}catch(e){return console.error("🔒 BiometricAuth: Erro ao remover credenciais:",e),!1}}getDeviceInfo(){return{isSupported:this.isSupported,isAvailable:this.isAvailable,hasCredentials:this.hasSavedCredentials(),userAgent:navigator.userAgent,platform:navigator.platform}}}window.biometricAuth=new Eb;window.showBiometricSetup=async function(){try{if(!await window.biometricAuth.checkAvailability()){B({message:"Autenticação biométrica não disponível neste dispositivo.",type:"warning"});return}const e=window.FirebaseAuth?.currentUser;if(!e){B({message:"Você precisa estar logado para configurar autenticação biométrica.",type:"error"});return}const t=Qt({title:"🔒 Configurar Autenticação Biométrica",content:`
        <div class="space-y-4">
          <div class="text-center">
            <div class="text-6xl mb-4">🔐</div>
            <h3 class="text-lg font-semibold mb-2">Autenticação Biométrica</h3>
            <p class="text-gray-600 dark:text-gray-300">
              Configure impressão digital ou reconhecimento facial para acessar o app rapidamente.
            </p>
          </div>
          
          <div class="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
            <h4 class="font-semibold text-blue-800 dark:text-blue-200 mb-2">📱 Como Funciona:</h4>
            <ul class="text-sm text-blue-700 dark:text-blue-300 space-y-1">
              <li>• Use sua impressão digital ou face para fazer login</li>
              <li>• Acesso rápido e seguro ao aplicativo</li>
              <li>• Funciona offline, sem necessidade de senha</li>
              <li>• Dados armazenados localmente no seu dispositivo</li>
            </ul>
          </div>

          <div class="flex flex-col gap-3">
            <button id="btn-setup-biometric" class="w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 flex items-center justify-center gap-2">
              <span>🔐</span> Configurar Agora
            </button>
            <button onclick="closeModal()" class="w-full bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600">
              Cancelar
            </button>
          </div>
        </div>
      `,onClose:()=>t.remove()});document.body.appendChild(t),setTimeout(()=>{const o=document.getElementById("btn-setup-biometric");o&&o.addEventListener("click",async()=>{try{o.disabled=!0,o.innerHTML="<span>⏳</span> Configurando...",await window.biometricAuth.register(e.uid,e.email),window.biometricAuth.saveUserInfo(e.uid),B({message:"Autenticação biométrica configurada com sucesso!",type:"success"}),t.remove()}catch(r){console.error("Erro na configuração biométrica:",r),B({message:"Erro ao configurar autenticação biométrica: "+r.message,type:"error"}),o.disabled=!1,o.innerHTML="<span>🔐</span> Configurar Agora"}})},100)}catch(n){console.error("Erro ao mostrar configuração biométrica:",n),B({message:"Erro ao abrir configuração biométrica: "+n.message,type:"error"})}};window.authenticateWithBiometric=async function(){try{if(console.log("🔐 Iniciando autenticação biométrica..."),!await window.biometricAuth.checkAvailability())return B({message:"Autenticação biométrica não disponível neste dispositivo.",type:"warning"}),!1;if(!window.biometricAuth.hasSavedCredentials())return B({message:"Configure a autenticação biométrica primeiro nas configurações.",type:"info"}),!1;if(window.showLoading(!0),(await window.biometricAuth.authenticate()).success){console.log("🔐 Autenticação biométrica bem-sucedida, fazendo login...");const t=window.biometricAuth.loadCredentials(),o=window.biometricAuth.loadUserInfo();if(t&&t.userId&&o)try{const r=window.FirebaseAuth?.currentUser;if(r&&r.uid===t.userId)return console.log("🔐 Usuário já está logado"),B({message:"Login biométrico realizado com sucesso!",type:"success"}),window.showLoading(!1),!0;console.log("🔐 Fazendo login automático para usuário:",o.email);const a={uid:o.uid,email:o.email,displayName:o.displayName,photoURL:o.photoURL,isAnonymous:!1,providerData:[{providerId:"google.com",uid:o.uid,displayName:o.displayName,email:o.email,photoURL:o.photoURL}]},s=new CustomEvent("biometricLoginSuccess",{detail:{user:a,userId:t.userId}});return document.dispatchEvent(s),B({message:"Login biométrico realizado com sucesso!",type:"success"}),window.showLoading(!1),!0}catch(r){return console.error("Erro ao fazer login:",r),B({message:"Erro ao fazer login. Tente novamente.",type:"error"}),window.showLoading(!1),!1}else return B({message:"Credenciais biométricas inválidas ou incompletas.",type:"error"}),window.showLoading(!1),!1}return window.showLoading(!1),!1}catch(n){console.error("Erro na autenticação biométrica:",n);let e="Erro na autenticação biométrica.";return n.name==="NotAllowedError"?e="Autenticação biométrica cancelada pelo usuário.":n.name==="SecurityError"?e="Erro de segurança na autenticação biométrica.":n.name==="NotSupportedError"?e="Autenticação biométrica não suportada.":n.message&&(e=n.message),B({message:e,type:"error"}),window.showLoading(!1),!1}};document.addEventListener("DOMContentLoaded",async()=>{try{const n=await window.biometricAuth.checkAvailability();if(console.log("🔒 BiometricAuth: Inicialização concluída, disponível:",n),n&&window.biometricAuth.hasSavedCredentials()){const e=document.getElementById("biometric-login-btn");e&&(e.style.display="block",e.innerHTML="<span>🔐</span> Entrar com Biometria")}else{const e=document.getElementById("biometric-login-btn");e&&(e.style.display="none")}}catch(n){console.error("🔒 BiometricAuth: Erro na inicialização:",n)}});async function _b(){try{const n=new vt;return(await x0(en,n)).user}catch(n){throw n.code==="auth/cancelled-popup-request"?B({message:"Login cancelado. Tente novamente.",type:"info"}):B({message:"Erro ao fazer login: "+n.message,type:"error"}),n}}class un{static async getGastosPorCategoria(e,t,o){try{if(console.log("📊 Gerando relatório de gastos por categoria..."),!e)throw new Error("ID do orçamento não fornecido");if(!t||!o){const l=new Date;t=new Date(l.getFullYear(),l.getMonth(),1),o=new Date(l.getFullYear(),l.getMonth()+1,0)}let r=[],a=[];if(window.appState?.transactions&&window.appState?.categories)console.log("📊 Usando dados já carregados na aplicação"),r=window.appState.transactions.filter(l=>{if(l.budgetId!==e)return!1;const d=l.createdAt?.toDate?l.createdAt.toDate():new Date(l.createdAt);return d>=t&&d<=o}),a=window.appState.categories.filter(l=>l.budgetId===e);else{console.log("📊 Buscando dados do Firestore...");const l=oe(q,"transactions"),d=fe(l,ne("budgetId","==",e),ne("createdAt",">=",t),ne("createdAt","<=",o));r=(await he(d)).docs.map(v=>({id:v.id,...v.data()}));const g=oe(q,"categories"),m=fe(g,ne("budgetId","==",e));a=(await he(m)).docs.map(v=>({id:v.id,...v.data()}))}const s=a.map(l=>{const d=r.filter(g=>g.categoriaId===l.id),h=d.reduce((g,m)=>g+parseFloat(m.valor),0);return{categoria:l,totalGasto:h,transacoes:d,percentual:0}}),c=s.reduce((l,d)=>l+d.totalGasto,0);return s.forEach(l=>{l.percentual=c>0?l.totalGasto/c*100:0}),s.sort((l,d)=>d.totalGasto-l.totalGasto),console.log("✅ Relatório gerado com sucesso:",s),s}catch(r){throw console.error("❌ Erro ao gerar relatório de gastos por categoria:",r),r}}static async getEvolucaoSaldo(e,t=6){try{if(console.log("📊 Gerando relatório de evolução de saldo..."),!e)throw new Error("ID do orçamento não fornecido");const o=new Date,r=[];for(let a=0;a<t;a++){const s=o.getMonth()-a,c=o.getFullYear()+Math.floor(s/12),l=(s%12+12)%12,d=new Date(c,l,1),h=new Date(c,l+1,0);r.push({ano:c,mes:l+1,nome:d.toLocaleString("pt-BR",{month:"long"}),startDate:d,endDate:h,receitas:0,despesas:0,saldo:0})}for(const a of r){let s=[];if(window.appState?.transactions)s=window.appState.transactions.filter(c=>{if(c.budgetId!==e)return!1;const l=c.createdAt?.toDate?c.createdAt.toDate():new Date(c.createdAt);return l>=a.startDate&&l<=a.endDate});else{const c=oe(q,"transactions"),l=fe(c,ne("budgetId","==",e),ne("createdAt",">=",a.startDate),ne("createdAt","<=",a.endDate));s=(await he(l)).docs.map(h=>({id:h.id,...h.data()}))}for(const c of s){const l=parseFloat(c.valor);c.tipo==="receita"?a.receitas+=l:a.despesas+=l}a.saldo=a.receitas-a.despesas}return r.sort((a,s)=>a.ano!==s.ano?s.ano-a.ano:s.mes-a.mes),console.log("✅ Relatório de evolução de saldo gerado com sucesso:",r),r}catch(o){throw console.error("❌ Erro ao gerar relatório de evolução de saldo:",o),o}}static async getPrevisaoGastos(e,t=3,o=3){try{if(console.log("📊 Gerando previsão de gastos..."),!e)throw new Error("ID do orçamento não fornecido");const r=await this.getEvolucaoSaldo(e,t),a=r.reduce((d,h)=>d+h.receitas,0)/r.length,s=r.reduce((d,h)=>d+h.despesas,0)/r.length,c=new Date,l=[];for(let d=1;d<=o;d++){const h=c.getMonth()+d,g=c.getFullYear()+Math.floor(h/12),m=h%12,f=new Date(g,m,1),v=1+d*.01;l.push({ano:g,mes:m+1,nome:f.toLocaleString("pt-BR",{month:"long"}),receitas:a*v,despesas:s*v,saldo:(a-s)*v,isPrevisto:!0})}return console.log("✅ Previsão de gastos gerada com sucesso:",l),l}catch(r){throw console.error("❌ Erro ao gerar previsão de gastos:",r),r}}static renderizarGraficoCategorias(e,t){try{console.log("📊 Renderizando gráfico de categorias...");const o=document.getElementById(e);if(!o)throw new Error(`Elemento com ID ${e} não encontrado`);if(o.innerHTML="",!t||t.length===0){o.innerHTML=`
          <div class="text-center py-4">
            <p class="text-gray-500 dark:text-gray-400">Sem dados para exibir</p>
          </div>
        `;return}const r=`
        <div class="analytics-chart">
          <h3 class="text-lg font-medium mb-4">Gastos por Categoria</h3>
          <div class="space-y-3">
            ${t.map(a=>`
              <div class="chart-item">
                <div class="flex justify-between mb-1">
                  <span class="text-sm font-medium text-gray-700 dark:text-gray-300">
                    ${a.categoria.nome}
                  </span>
                  <span class="text-sm text-gray-600 dark:text-gray-400">
                    R$ ${a.totalGasto.toFixed(2)} (${a.percentual.toFixed(1)}%)
                  </span>
                </div>
                <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                  <div class="h-2.5 rounded-full" 
                       style="width: ${a.percentual}%; background-color: ${a.categoria.cor||"#4F46E5"}"></div>
                </div>
              </div>
            `).join("")}
          </div>
        </div>
      `;o.innerHTML=r,console.log("✅ Gráfico renderizado com sucesso")}catch(o){throw console.error("❌ Erro ao renderizar gráfico de categorias:",o),o}}static renderizarGraficoEvolucao(e,t){try{console.log("📊 Renderizando gráfico de evolução...");const o=document.getElementById(e);if(!o)throw new Error(`Elemento com ID ${e} não encontrado`);if(o.innerHTML="",!t||t.length===0){o.innerHTML=`
          <div class="text-center py-4">
            <p class="text-gray-500 dark:text-gray-400">Sem dados para exibir</p>
          </div>
        `;return}const r=Math.max(...t.map(l=>l.receitas)),a=Math.max(...t.map(l=>l.despesas)),s=Math.max(r,a)*1.1,c=`
        <div class="analytics-chart">
          <h3 class="text-lg font-medium mb-4">Evolução Financeira</h3>
          
          <div class="relative h-64 mt-4">
            <!-- Linhas de grade -->
            <div class="absolute inset-0 grid grid-rows-4 w-full h-full">
              ${[0,1,2,3].map(l=>`
                <div class="border-t border-gray-200 dark:border-gray-700 relative">
                  <span class="absolute -top-3 -left-12 text-xs text-gray-500 dark:text-gray-400">
                    R$ ${(s/4*(4-l)).toFixed(0)}
                  </span>
                </div>
              `).join("")}
            </div>
            
            <!-- Gráfico de linhas -->
            <div class="absolute inset-0 flex items-end justify-between">
              ${t.map((l,d)=>{const h=l.receitas/s*100,g=l.despesas/s*100,m=l.saldo>=0?"bg-green-500":"bg-red-500",f=l.isPrevisto;return`
                  <div class="flex flex-col items-center justify-end w-full max-w-[${100/t.length}%] px-1">
                    <!-- Barra de receita -->
                    <div class="w-full flex justify-center mb-1">
                      <div class="w-4 ${f?"bg-green-300/50":"bg-green-500"} rounded-t" 
                           style="height: ${h}%"></div>
                    </div>
                    
                    <!-- Barra de despesa -->
                    <div class="w-full flex justify-center mb-1">
                      <div class="w-4 ${f?"bg-red-300/50":"bg-red-500"} rounded-t" 
                           style="height: ${g}%"></div>
                    </div>
                    
                    <!-- Rótulo do mês -->
                    <div class="text-xs text-gray-600 dark:text-gray-400 mt-1 ${f?"italic":""}">
                      ${l.nome.substring(0,3)}
                      ${f?"*":""}
                    </div>
                  </div>
                `}).join("")}
            </div>
          </div>
          
          <!-- Legenda -->
          <div class="flex justify-center mt-4 space-x-4 text-xs">
            <div class="flex items-center">
              <div class="w-3 h-3 bg-green-500 rounded-full mr-1"></div>
              <span class="text-gray-600 dark:text-gray-400">Receitas</span>
            </div>
            <div class="flex items-center">
              <div class="w-3 h-3 bg-red-500 rounded-full mr-1"></div>
              <span class="text-gray-600 dark:text-gray-400">Despesas</span>
            </div>
            ${t.some(l=>l.isPrevisto)?`
              <div class="flex items-center">
                <span class="text-gray-600 dark:text-gray-400 italic">* Previsto</span>
              </div>
            `:""}
          </div>
        </div>
      `;o.innerHTML=c,console.log("✅ Gráfico de evolução renderizado com sucesso")}catch(o){throw console.error("❌ Erro ao renderizar gráfico de evolução:",o),o}}static async gerarRelatorioCompleto(e){try{if(console.log("📊 Gerando relatório completo..."),!e)throw new Error("ID do orçamento não fornecido");if(!window.appState?.currentUser)throw new Error("Usuário não autenticado");console.log("🔍 Gerando relatório para orçamento:",e);const[t,o,r]=await Promise.all([this.getGastosPorCategoria(e),this.getEvolucaoSaldo(e,6),this.getPrevisaoGastos(e,3,3)]);console.log("📊 Dados obtidos:",{gastosPorCategoria:t.length,evolucaoSaldo:o.length,previsaoGastos:r.length});const a={gastosPorCategoria:t,evolucaoSaldo:o,previsaoGastos:r,resumo:{saldoAtual:o[0]?.saldo||0,receitasMes:o[0]?.receitas||0,despesasMes:o[0]?.despesas||0,tendencia:r[0]?.saldo>=0?"positiva":"negativa",categoriasMaioresGastos:t.slice(0,3)}};return console.log("✅ Relatório completo gerado com sucesso"),a}catch(t){throw console.error("❌ Erro ao gerar relatório completo:",t),console.error("Stack trace:",t.stack),t}}}window.Analytics=un;class Sp{static async render(e){console.log("📊 Renderizando página de análises...");const t=document.createElement("div");t.className="analytics-page p-4";const o=document.createElement("div");o.className="mb-6",o.innerHTML=`
      <h2 class="text-2xl font-bold mb-2 text-gray-800 dark:text-white">Análises Financeiras</h2>
      <p class="text-gray-600 dark:text-gray-400">Visualize seus dados financeiros de forma clara e objetiva</p>
    `,t.appendChild(o);const r=document.createElement("div");r.className="flex justify-center items-center py-12",r.innerHTML=`
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
    `,t.appendChild(r);try{const a=await un.gerarRelatorioCompleto(e);t.removeChild(r);const s=document.createElement("div");s.className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8",s.innerHTML=`
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
          <h3 class="text-lg font-medium mb-2 text-gray-700 dark:text-gray-300">Saldo Atual</h3>
          <p class="text-2xl font-bold ${a.resumo.saldoAtual>=0?"text-green-600 dark:text-green-400":"text-red-600 dark:text-red-400"}">
            R$ ${a.resumo.saldoAtual.toFixed(2)}
          </p>
          <p class="text-sm text-gray-500 dark:text-gray-400 mt-2">
            Tendência: <span class="${a.resumo.tendencia==="positiva"?"text-green-500":"text-red-500"}">
              ${a.resumo.tendencia==="positiva"?"↗ Positiva":"↘ Negativa"}
            </span>
          </p>
        </div>
        
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
          <h3 class="text-lg font-medium mb-2 text-gray-700 dark:text-gray-300">Receitas do Mês</h3>
          <p class="text-2xl font-bold text-green-600 dark:text-green-400">
            R$ ${a.resumo.receitasMes.toFixed(2)}
          </p>
          <p class="text-sm text-gray-500 dark:text-gray-400 mt-2">
            ${a.evolucaoSaldo.length>1?`vs. R$ ${a.evolucaoSaldo[1].receitas.toFixed(2)} mês anterior`:"Primeiro mês de dados"}
          </p>
        </div>
        
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
          <h3 class="text-lg font-medium mb-2 text-gray-700 dark:text-gray-300">Despesas do Mês</h3>
          <p class="text-2xl font-bold text-red-600 dark:text-red-400">
            R$ ${a.resumo.despesasMes.toFixed(2)}
          </p>
          <p class="text-sm text-gray-500 dark:text-gray-400 mt-2">
            ${a.evolucaoSaldo.length>1?`vs. R$ ${a.evolucaoSaldo[1].despesas.toFixed(2)} mês anterior`:"Primeiro mês de dados"}
          </p>
        </div>
      `,t.appendChild(s);const c=document.createElement("div");c.className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8";const l=document.createElement("div");l.className="bg-white dark:bg-gray-800 rounded-lg shadow p-4",l.id="evolucao-chart",c.appendChild(l);const d=document.createElement("div");d.className="bg-white dark:bg-gray-800 rounded-lg shadow p-4",d.id="categorias-chart",c.appendChild(d),t.appendChild(c);const h=document.createElement("div");h.className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 mb-8",h.innerHTML=`
        <h3 class="text-lg font-medium mb-4 text-gray-700 dark:text-gray-300">Previsão para os Próximos Meses</h3>
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead>
              <tr>
                <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Mês</th>
                <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Receitas (prev.)</th>
                <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Despesas (prev.)</th>
                <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Saldo (prev.)</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
              ${a.previsaoGastos.map((f,v)=>`
                <tr class="${v%2===0?"bg-gray-50 dark:bg-gray-900/50":""}">
                  <td class="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">${f.nome} ${f.ano}</td>
                  <td class="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">R$ ${f.receitas.toFixed(2)}</td>
                  <td class="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">R$ ${f.despesas.toFixed(2)}</td>
                  <td class="px-4 py-2 text-sm font-medium ${f.saldo>=0?"text-green-600 dark:text-green-400":"text-red-600 dark:text-red-400"}">R$ ${f.saldo.toFixed(2)}</td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
        <p class="text-xs text-gray-500 dark:text-gray-400 mt-4">* Previsão baseada na média dos últimos 3 meses com tendência de crescimento de 1% ao mês</p>
      `,t.appendChild(h);const g=document.createElement("div");g.className="bg-white dark:bg-gray-800 rounded-lg shadow p-4",g.innerHTML=`
        <h3 class="text-lg font-medium mb-4 text-gray-700 dark:text-gray-300">Maiores Gastos por Categoria</h3>
        <div class="space-y-4">
          ${a.gastosPorCategoria.slice(0,5).map(f=>`
            <div>
              <div class="flex justify-between mb-1">
                <div class="flex items-center">
                  <div class="w-3 h-3 rounded-full mr-2" style="background-color: ${f.categoria.cor||"#4F46E5"}"></div>
                  <span class="text-sm font-medium text-gray-700 dark:text-gray-300">${f.categoria.nome}</span>
                </div>
                <span class="text-sm text-gray-600 dark:text-gray-400">R$ ${f.totalGasto.toFixed(2)}</span>
              </div>
              <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div class="h-2 rounded-full" style="width: ${f.percentual}%; background-color: ${f.categoria.cor||"#4F46E5"}"></div>
              </div>
            </div>
          `).join("")}
        </div>
      `,t.appendChild(g);const m=(f=1,v=5)=>{const b=document.getElementById("evolucao-chart"),T=document.getElementById("categorias-chart");if(console.log(`🔍 Tentativa ${f}: Verificando elementos dos gráficos...`),console.log("- evolucao-chart:",!!b),console.log("- categorias-chart:",!!T),b&&T)try{console.log("📊 Renderizando gráficos..."),un.renderizarGraficoEvolucao("evolucao-chart",[...a.evolucaoSaldo,...a.previsaoGastos]),un.renderizarGraficoCategorias("categorias-chart",a.gastosPorCategoria),console.log("✅ Gráficos renderizados com sucesso!")}catch(D){console.error("❌ Erro ao renderizar gráficos:",D)}else f<v?(console.log(`⏳ Elementos não encontrados, tentando novamente em ${f*100}ms...`),setTimeout(()=>m(f+1,v),f*100)):console.error("❌ Não foi possível encontrar os elementos dos gráficos após",v,"tentativas")};setTimeout(()=>m(),50)}catch(a){console.error("❌ Erro ao renderizar página de análises:",a),t.contains(r)&&t.removeChild(r);const s=document.createElement("div");s.className="bg-red-100 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded relative mb-6",s.innerHTML=`
        <strong class="font-bold">Erro!</strong>
        <span class="block sm:inline"> Não foi possível carregar os dados de análise. Tente novamente mais tarde.</span>
        <p class="text-sm mt-2">${a.message}</p>
      `,t.appendChild(s)}return t}}window.AnalyticsPage=Sp;let Ms=!1,xo=null;async function Ip(){const n=new Date().toISOString();return console.log(`🎯 [${n}] Iniciando renderização de análises - Versão Anti-Corrida`),Ms&&(console.log(`⏳ [${n}] Renderização já em andamento, aguardando...`),xo)?await xo:(Ms=!0,xo=(async()=>{try{console.log(`🧹 [${n}] Limpando DOM...`);const e=document.getElementById("app-content");if(!e)throw new Error("Container app-content não encontrado");if(e.innerHTML="",await new Promise(r=>setTimeout(r,50)),console.log(`✅ [${n}] app-content limpo e encontrado`),!window.appState?.currentUser){console.log(`⚠️ [${n}] Usuário não autenticado`),jd("Usuário não autenticado","Faça login para acessar as análises");return}window.appState?.currentBudget||(console.log(`🔄 [${n}] Carregando orçamentos...`),window.loadBudgets&&await window.loadBudgets()),console.log(`🏗️ [${n}] Criando HTML da página...`);const t=xb();console.log(`📝 [${n}] Inserindo HTML...`),e.innerHTML=t;let o=document.getElementById("analytics-content");if(!o&&(console.log(`⚠️ [${n}] analytics-content não encontrado imediatamente, aguardando...`),await new Promise(r=>setTimeout(r,100)),o=document.getElementById("analytics-content"),!o)){console.log(`❌ [${n}] analytics-content ainda não encontrado, forçando criação...`);const r=document.createElement("div");r.id="analytics-content",r.className="analytics-content",e.appendChild(r),o=r,console.log(`🔧 [${n}] analytics-content criado forçadamente`)}console.log(`✅ [${n}] analytics-content encontrado:`,o),await Tb(o),console.log(`🎉 [${n}] Análises renderizadas com sucesso!`)}catch(e){const t=new Date().toISOString();console.error(`💥 [${t}] Erro ao renderizar análises:`,e),jd("Erro ao carregar análises",e.message)}finally{Ms=!1,xo=null}})(),await xo)}function xb(){return`
    <div class="tab-container">
      <div class="tab-header">
        <h2 class="tab-title-highlight">Análises Financeiras</h2>
      </div>
      <div class="tab-content">
        <div class="content-spacing" id="analytics-content">
          <div class="flex justify-center items-center py-12">
            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            <span class="ml-3 text-gray-600 dark:text-gray-400">Carregando análises...</span>
          </div>
        </div>
      </div>
    </div>
  `}async function Tb(n,e){try{console.log(`🎨 [${e}] Renderizando conteúdo da página...`);const t=await Sp.render(window.appState.currentBudget.id);n.innerHTML="",n.appendChild(t),console.log(`✅ [${e}] Conteúdo renderizado com sucesso`)}catch(t){console.error(`❌ [${e}] Erro ao renderizar conteúdo:`,t),n.innerHTML=`
      <div class="bg-red-100 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded relative mb-6">
        <strong class="font-bold">Erro ao carregar gráficos!</strong>
        <span class="block sm:inline mt-2">Não foi possível carregar os gráficos de análise.</span>
        <p class="text-sm mt-2 opacity-75">${t.message}</p>
      </div>
      <div class="flex gap-2">
        <button onclick="window.location.hash = '#analytics'" class="btn-secondary">
          <i class="fas fa-redo mr-2"></i> Tentar Novamente
        </button>
        <button onclick="window.location.hash = '#/dashboard'" class="btn-primary">
          <i class="fas fa-arrow-left mr-2"></i> Voltar ao Dashboard
        </button>
      </div>
    `}}async function jd(n,e){console.log(`🚨 [${e}] Renderizando página de erro...`);const t=document.getElementById("app-content");if(!t){console.error(`💥 [${e}] Não foi possível renderizar página de erro: app-content não encontrado`);return}t.innerHTML=`
    <div class="tab-container">
      <div class="tab-header">
        <h2 class="tab-title-highlight">Análises Financeiras</h2>
      </div>
      <div class="tab-content">
        <div class="content-spacing">
          <div class="bg-red-100 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded relative mb-6">
            <strong class="font-bold">Erro!</strong>
            <span class="block sm:inline mt-2">Não foi possível carregar as análises financeiras.</span>
            <p class="text-sm mt-2 opacity-75">${n.message}</p>
            <p class="text-xs mt-1 opacity-50">Timestamp: ${e}</p>
          </div>
          <div class="flex gap-2">
            <button id="retry-analytics-btn" class="btn-secondary">
              <i class="fas fa-redo mr-2"></i> Tentar Novamente
            </button>
            <button id="back-dashboard-btn" class="btn-primary">
              <i class="fas fa-arrow-left mr-2"></i> Voltar ao Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  `;const o=document.getElementById("retry-analytics-btn");o&&o.addEventListener("click",()=>{console.log(`🔄 [${e}] Tentando novamente...`),Ip()});const r=document.getElementById("back-dashboard-btn");r&&r.addEventListener("click",()=>{console.log(`🏠 [${e}] Voltando ao dashboard...`),window.location.hash="#/dashboard"}),console.log(`✅ [${e}] Página de erro renderizada`)}window.renderAnalytics=Ip;console.log("📦 AnalyticsRoute.js carregado (versão definitiva)");class Ap{static async renderCleanAnalytics(){console.log("📊 Renderizando análises melhoradas..."),this.applyThemeToAnalytics();const e=window.appState?.currentBudget;if(!e)return this.renderEmptyState("Nenhum orçamento selecionado");const t=document.createElement("div");t.className="analytics-container",t.innerHTML=`
      <div class="analytics-header">
        <div class="analytics-title">
          📊 Análises Financeiras
        </div>
        <div class="analytics-actions">
          <button class="btn-analytics secondary" onclick="window.AnalyticsClean.exportReport()">
            📄 Exportar
          </button>
          <button class="btn-analytics primary" onclick="window.AnalyticsClean.refreshData()">
            🔄 Atualizar
          </button>
        </div>
      </div>
      
      <div class="analytics-filters">
        <div class="filter-group">
          <label class="filter-label">Período:</label>
          <select class="filter-select" id="period-filter" onchange="window.AnalyticsClean.updatePeriod()">
            <option value="current">Mês Atual</option>
            <option value="last3">Últimos 3 Meses</option>
            <option value="last6">Últimos 6 Meses</option>
            <option value="year">Este Ano</option>
          </select>
        </div>
        <div class="filter-group">
          <label class="filter-label">Visualização:</label>
          <select class="filter-select" id="view-filter" onchange="window.AnalyticsClean.updateView()">
            <option value="overview">Visão Geral</option>
            <option value="detailed">Detalhado</option>
            <option value="trends">Tendências</option>
          </select>
        </div>
      </div>
    `;const o=this.createLoader();t.appendChild(o);try{const r=await this.getAnalyticsData(e.id);t.removeChild(o),t.appendChild(this.renderSummaryCards(r)),t.appendChild(this.renderInsights(r)),t.appendChild(this.renderCharts(r)),t.appendChild(this.renderDetailedAnalysis(r))}catch(r){console.error("❌ Erro ao carregar análises:",r),t.removeChild(o),t.appendChild(this.renderErrorState(r.message))}return t}static applyThemeToAnalytics(){const e=localStorage.getItem("themeColor")||"blue";document.documentElement.setAttribute("data-theme-color",e),console.log("🎨 Tema aplicado nas análises:",e)}static async getAnalyticsData(e){const t=document.getElementById("period-filter")?.value||"current",{startDate:o,endDate:r}=this.calculatePeriod(t),[a,s,c]=await Promise.all([un.getGastosPorCategoria(e,o,r),un.getEvolucaoSaldo(e,6),un.getPrevisaoGastos(e,3,3)]),l=this.calculateMetrics(a,s),d=this.generateInsights(l,a,s);return{gastosPorCategoria:a,evolucaoSaldo:s,previsaoGastos:c,metrics:l,insights:d,period:{startDate:o,endDate:r,type:t}}}static calculatePeriod(e){const t=new Date;let o,r;switch(e){case"current":o=new Date(t.getFullYear(),t.getMonth(),1),r=new Date(t.getFullYear(),t.getMonth()+1,0);break;case"last3":o=new Date(t.getFullYear(),t.getMonth()-2,1),r=new Date(t.getFullYear(),t.getMonth()+1,0);break;case"last6":o=new Date(t.getFullYear(),t.getMonth()-5,1),r=new Date(t.getFullYear(),t.getMonth()+1,0);break;case"year":o=new Date(t.getFullYear(),0,1),r=new Date(t.getFullYear(),11,31);break;default:o=new Date(t.getFullYear(),t.getMonth(),1),r=new Date(t.getFullYear(),t.getMonth()+1,0)}return{startDate:o,endDate:r}}static calculateMetrics(e,t){const o=t[0],r=t[1],a=o?.receitas||0,s=o?.despesas||0,c=o?.saldo||0,l=r?(a-r.receitas)/r.receitas*100:0,d=r?(s-r.despesas)/r.despesas*100:0,h=r?(c-r.saldo)/Math.abs(r.saldo)*100:0,g=e.slice(0,5),m=e.reduce((T,D)=>T+D.totalGasto,0),f=g[0],v=f?f.totalGasto/m*100:0,b=t.length>=3?this.calculateTrend(t.slice(0,3).map(T=>T.saldo)):"estavel";return{totalReceitas:a,totalDespesas:s,saldoAtual:c,variacaoReceitas:l,variacaoDespesas:d,variacaoSaldo:h,topCategorias:g,totalGastos:m,categoriaMaiorGasto:f,percentualMaiorGasto:v,tendenciaSaldo:b,economiaMensal:a-s,percentualEconomia:a>0?(a-s)/a*100:0}}static calculateTrend(e){if(e.length<2)return"estavel";const t=e[0],o=e[e.length-1],a=(t-o)/Math.abs(o)*100;return a>5?"crescente":a<-5?"decrescente":"estavel"}static generateInsights(e,t,o){const r=[];return e.saldoAtual<0?r.push({type:"negative",icon:"⚠️",title:"Saldo Negativo",description:`Seu saldo está negativo em R$ ${Math.abs(e.saldoAtual).toFixed(2)}. Considere reduzir gastos ou aumentar receitas.`}):e.percentualEconomia>20&&r.push({type:"positive",icon:"🎉",title:"Excelente Economia",description:`Você está economizando ${e.percentualEconomia.toFixed(1)}% da sua renda. Continue assim!`}),e.categoriaMaiorGasto&&e.percentualMaiorGasto>30&&r.push({type:"warning",icon:"📊",title:"Gasto Concentrado",description:`${e.categoriaMaiorGasto.categoria.nome} representa ${e.percentualMaiorGasto.toFixed(1)}% dos seus gastos. Considere diversificar.`}),e.tendenciaSaldo==="decrescente"?r.push({type:"negative",icon:"📉",title:"Tendência Negativa",description:"Seu saldo está diminuindo nos últimos meses. Revise seus gastos."}):e.tendenciaSaldo==="crescente"&&r.push({type:"positive",icon:"📈",title:"Tendência Positiva",description:"Seu saldo está aumentando! Você está no caminho certo."}),e.variacaoDespesas>20?r.push({type:"warning",icon:`<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="3" y="6" width="18" height="12" rx="2" stroke="white" stroke-width="2" fill="none"/>
          <path d="M3 10h18" stroke="white" stroke-width="2"/>
          <!-- Fundo quadriculado -->
          <path d="M6 12h2v2h-2z M10 12h2v2h-2z M14 12h2v2h-2z" fill="white" opacity="0.3"/>
          <path d="M6 14h2v2h-2z M10 14h2v2h-2z M14 14h2v2h-2z" fill="white" opacity="0.3"/>
          <!-- Gráfico de linha decrescente -->
          <path d="M6 12l2 2 2-1 2 3 2-2" stroke="white" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>`,title:"Aumento de Despesas",description:`Suas despesas aumentaram ${e.variacaoDespesas.toFixed(1)}% em relação ao mês anterior.`}):e.variacaoDespesas<-10&&r.push({type:"positive",icon:`<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="3" y="6" width="18" height="12" rx="2" stroke="white" stroke-width="2" fill="none"/>
          <path d="M3 10h18" stroke="white" stroke-width="2"/>
          <!-- Fundo quadriculado -->
          <path d="M6 12h2v2h-2z M10 12h2v2h-2z M14 12h2v2h-2z" fill="white" opacity="0.3"/>
          <path d="M6 14h2v2h-2z M10 14h2v2h-2z M14 14h2v2h-2z" fill="white" opacity="0.3"/>
          <!-- Gráfico de linha decrescente -->
          <path d="M6 12l2 2 2-1 2 3 2-2" stroke="white" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>`,title:"Redução de Despesas",description:`Suas despesas diminuíram ${Math.abs(e.variacaoDespesas).toFixed(1)}% em relação ao mês anterior.`}),e.variacaoReceitas>15&&r.push({type:"positive",icon:`<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="3" y="6" width="18" height="12" rx="2" stroke="white" stroke-width="2" fill="none"/>
          <path d="M3 10h18" stroke="white" stroke-width="2"/>
          <!-- Fundo quadriculado -->
          <path d="M6 12h2v2h-2z M10 12h2v2h-2z M14 12h2v2h-2z" fill="white" opacity="0.3"/>
          <path d="M6 14h2v2h-2z M10 14h2v2h-2z M14 14h2v2h-2z" fill="white" opacity="0.3"/>
          <!-- Gráfico de linha crescente -->
          <path d="M6 16l2-2 2-1 2-3 2 2" stroke="white" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>`,title:"Aumento de Receitas",description:`Suas receitas aumentaram ${e.variacaoReceitas.toFixed(1)}% em relação ao mês anterior.`}),r}static renderSummaryCards(e){const{metrics:t}=e,o=document.createElement("div");return o.className="analytics-summary",o.innerHTML=`
      <div class="summary-card ${t.saldoAtual>=0?"positive":"negative"}">
        <div class="summary-header">
          <div class="summary-title">Saldo Atual</div>
          <div class="summary-icon">💰</div>
        </div>
        <div class="summary-value">R$ ${t.saldoAtual.toFixed(2)}</div>
        <div class="summary-change ${t.variacaoSaldo>=0?"positive":"negative"}">
          ${t.variacaoSaldo>=0?"↗":"↘"} ${Math.abs(t.variacaoSaldo).toFixed(1)}% vs mês anterior
        </div>
      </div>
      
      <div class="summary-card positive">
        <div class="summary-content">
          <div class="summary-info">
            <div class="summary-title">Receitas</div>
            <div class="summary-value">R$ ${t.totalReceitas.toFixed(2)}</div>
            <div class="summary-change ${t.variacaoReceitas>=0?"positive":"negative"}">
              ${t.variacaoReceitas>=0?"↗":"↘"} ${Math.abs(t.variacaoReceitas).toFixed(1)}% vs mês anterior
            </div>
          </div>
          <div class="summary-icon">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="3" y="6" width="18" height="12" rx="2" stroke="white" stroke-width="2" fill="none"/>
              <path d="M3 10h18" stroke="white" stroke-width="2"/>
              <!-- Fundo quadriculado -->
              <path d="M6 12h2v2h-2z M10 12h2v2h-2z M14 12h2v2h-2z" fill="white" opacity="0.3"/>
              <path d="M6 14h2v2h-2z M10 14h2v2h-2z M14 14h2v2h-2z" fill="white" opacity="0.3"/>
              <!-- Gráfico de linha crescente -->
              <path d="M6 16l2-2 2-1 2-3 2 2" stroke="white" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
        </div>
      </div>
      
      <div class="summary-card negative">
        <div class="summary-content">
          <div class="summary-info">
            <div class="summary-title">Despesas</div>
            <div class="summary-value">R$ ${t.totalDespesas.toFixed(2)}</div>
            <div class="summary-change ${t.variacaoDespesas<=0?"positive":"negative"}">
              ${t.variacaoDespesas<=0?"↘":"↗"} ${Math.abs(t.variacaoDespesas).toFixed(1)}% vs mês anterior
            </div>
          </div>
          <div class="summary-icon">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="3" y="6" width="18" height="12" rx="2" stroke="white" stroke-width="2" fill="none"/>
              <path d="M3 10h18" stroke="white" stroke-width="2"/>
              <!-- Fundo quadriculado -->
              <path d="M6 12h2v2h-2z M10 12h2v2h-2z M14 12h2v2h-2z" fill="white" opacity="0.3"/>
              <path d="M6 14h2v2h-2z M10 14h2v2h-2z M14 14h2v2h-2z" fill="white" opacity="0.3"/>
              <!-- Gráfico de linha decrescente -->
              <path d="M6 12l2 2 2-1 2 3 2-2" stroke="white" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
        </div>
      </div>
      
      <div class="summary-card ${t.percentualEconomia>=0?"positive":"negative"}">
        <div class="summary-header">
          <div class="summary-title">Economia</div>
          <div class="summary-icon">💎</div>
        </div>
        <div class="summary-value">${t.percentualEconomia.toFixed(1)}%</div>
        <div class="summary-change ${t.percentualEconomia>=0?"positive":"negative"}">
          R$ ${t.economiaMensal.toFixed(2)} este mês
        </div>
      </div>
    `,o}static renderInsights(e){const{insights:t}=e;if(t.length===0)return document.createElement("div");const o=document.createElement("div");return o.className="insights-section",o.innerHTML=`
      <div class="section-header">
        <div class="section-title">
          <div class="section-icon">💡</div>
          Insights Importantes
        </div>
      </div>
      <div class="insights-grid">
        ${t.map(r=>`
          <div class="insight-card">
            <div class="insight-header">
              <div class="insight-icon ${r.type}">${r.icon}</div>
              <div class="insight-title">${r.title}</div>
            </div>
            <div class="insight-description">${r.description}</div>
          </div>
        `).join("")}
      </div>
    `,o}static renderCharts(e){const{gastosPorCategoria:t,evolucaoSaldo:o,previsaoGastos:r}=e,a=document.createElement("div");return a.className="analytics-sections",a.innerHTML=`
      <div class="analytics-section">
        <div class="section-header">
          <div class="section-title">
            <div class="section-icon">📊</div>
            Gastos por Categoria
          </div>
          <div class="section-actions">
            <button class="btn-analytics secondary" onclick="window.AnalyticsClean.toggleChartView('categories')">
              🔄 Alternar
            </button>
          </div>
        </div>
        <div id="categories-chart" class="analytics-chart">
          ${this.renderCategoriesChart(t)}
        </div>
      </div>
      
      <div class="analytics-section">
        <div class="section-header">
          <div class="section-title">
            <div class="section-icon">📈</div>
            Evolução Financeira
          </div>
          <div class="section-actions">
            <button class="btn-analytics secondary" onclick="window.AnalyticsClean.toggleChartView('evolution')">
              🔄 Alternar
            </button>
          </div>
        </div>
        <div id="evolution-chart" class="analytics-chart">
          ${this.renderEvolutionChart([...o,...r])}
        </div>
      </div>
    `,a}static renderCategoriesChart(e){return!e||e.length===0?`
        <div class="chart-placeholder">
          <div>Sem dados de categorias para exibir</div>
        </div>
      `:`
      <div class="space-y-4">
        ${e.slice(0,8).map(o=>`
          <div class="chart-item">
            <div class="flex justify-between mb-2">
              <div class="flex items-center gap-2">
                <div class="w-3 h-3 rounded-full" style="background-color: ${o.categoria.cor||"#4F46E5"}"></div>
                <span class="text-sm font-medium text-gray-700 dark:text-gray-300">
                  ${o.categoria.nome}
                </span>
              </div>
              <span class="text-sm text-gray-600 dark:text-gray-400">
                R$ ${o.totalGasto.toFixed(2)} (${o.percentual.toFixed(1)}%)
              </span>
            </div>
            <div class="progress-bar">
              <div class="progress-fill" style="width: ${o.percentual}%"></div>
            </div>
          </div>
        `).join("")}
      </div>
    `}static renderEvolutionChart(e){if(!e||e.length===0)return`
        <div class="chart-placeholder">
          <div>Sem dados de evolução para exibir</div>
        </div>
      `;const t=Math.max(...e.map(o=>Math.max(o.receitas,o.despesas)))*1.1;return`
      <div class="chart-container">
        <div class="flex items-end justify-between h-full">
          ${e.map((o,r)=>{const a=o.receitas/t*100,s=o.despesas/t*100,c=o.isPrevisto;return`
              <div class="flex flex-col items-center justify-end w-full max-w-[${100/e.length}%] px-1">
                <div class="w-full flex justify-center mb-1">
                  <div class="w-4 ${c?"bg-green-300/50":"bg-green-500"} rounded-t" 
                       style="height: ${a}%"></div>
                </div>
                <div class="w-full flex justify-center mb-1">
                  <div class="w-4 ${c?"bg-red-300/50":"bg-red-500"} rounded-t" 
                       style="height: ${s}%"></div>
                </div>
                <div class="text-xs text-gray-600 dark:text-gray-400 mt-1 ${c?"italic":""}">
                  ${o.nome.substring(0,3)}
                  ${c?"*":""}
                </div>
              </div>
            `}).join("")}
        </div>
      </div>
      <div class="flex justify-center mt-4 space-x-4 text-xs">
        <div class="flex items-center">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="mr-1">
            <rect x="3" y="6" width="18" height="12" rx="2" stroke="#10b981" stroke-width="2" fill="none"/>
            <path d="M3 10h18" stroke="#10b981" stroke-width="2"/>
            <!-- Fundo quadriculado -->
            <path d="M6 12h2v2h-2z M10 12h2v2h-2z M14 12h2v2h-2z" fill="#10b981" opacity="0.3"/>
            <path d="M6 14h2v2h-2z M10 14h2v2h-2z M14 14h2v2h-2z" fill="#10b981" opacity="0.3"/>
            <!-- Gráfico de linha crescente -->
            <path d="M6 16l2-2 2-1 2-3 2 2" stroke="#10b981" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <span class="text-gray-600 dark:text-gray-400">Receitas</span>
        </div>
        <div class="flex items-center">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="mr-1">
            <rect x="3" y="6" width="18" height="12" rx="2" stroke="#ef4444" stroke-width="2" fill="none"/>
            <path d="M3 10h18" stroke="#ef4444" stroke-width="2"/>
            <!-- Fundo quadriculado -->
            <path d="M6 12h2v2h-2z M10 12h2v2h-2z M14 12h2v2h-2z" fill="#ef4444" opacity="0.3"/>
            <path d="M6 14h2v2h-2z M10 14h2v2h-2z M14 14h2v2h-2z" fill="#ef4444" opacity="0.3"/>
            <!-- Gráfico de linha decrescente -->
            <path d="M6 12l2 2 2-1 2 3 2-2" stroke="#ef4444" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <span class="text-gray-600 dark:text-gray-400">Despesas</span>
        </div>
        ${e.some(o=>o.isPrevisto)?`
          <div class="flex items-center">
            <span class="text-gray-600 dark:text-gray-400 italic">* Previsto</span>
          </div>
        `:""}
      </div>
    `}static renderDetailedAnalysis(e){const{metrics:t,gastosPorCategoria:o,evolucaoSaldo:r}=e,a=document.createElement("div");return a.className="analytics-section",a.innerHTML=`
      <div class="section-header">
        <div class="section-title">
          <div class="section-icon">📋</div>
          Análise Detalhada
        </div>
      </div>
      
      <div class="space-y-6">
        <!-- Top 5 Categorias -->
        <div>
          <h4 class="text-lg font-semibold mb-3 text-gray-700 dark:text-gray-300">Top 5 Categorias de Gasto</h4>
          <div class="space-y-2">
            ${t.topCategorias.map((s,c)=>`
              <div class="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div class="flex items-center gap-3">
                  <span class="text-sm font-medium text-gray-500">#${c+1}</span>
                  <div class="w-3 h-3 rounded-full" style="background-color: ${s.categoria.cor||"#4F46E5"}"></div>
                  <span class="font-medium">${s.categoria.nome}</span>
                </div>
                <div class="text-right">
                  <div class="font-semibold">R$ ${s.totalGasto.toFixed(2)}</div>
                  <div class="text-sm text-gray-500">${s.percentual.toFixed(1)}%</div>
                </div>
              </div>
            `).join("")}
          </div>
        </div>
        
        <!-- Comparação Mensal -->
        <div>
          <h4 class="text-lg font-semibold mb-3 text-gray-700 dark:text-gray-300">Comparação com Mês Anterior</h4>
          <table class="analytics-table">
            <thead>
              <tr>
                <th>Métrica</th>
                <th>Mês Atual</th>
                <th>Mês Anterior</th>
                <th>Variação</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <div class="flex items-center gap-2">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="3" y="6" width="18" height="12" rx="2" stroke="currentColor" stroke-width="2" fill="none"/>
                      <path d="M3 10h18" stroke="currentColor" stroke-width="2"/>
                      <!-- Fundo quadriculado -->
                      <path d="M6 12h2v2h-2z M10 12h2v2h-2z M14 12h2v2h-2z" fill="currentColor" opacity="0.3"/>
                      <path d="M6 14h2v2h-2z M10 14h2v2h-2z M14 14h2v2h-2z" fill="currentColor" opacity="0.3"/>
                      <!-- Gráfico de linha crescente -->
                      <path d="M6 16l2-2 2-1 2-3 2 2" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    Receitas
                  </div>
                </td>
                <td>R$ ${t.totalReceitas.toFixed(2)}</td>
                <td>R$ ${r[1]?.receitas.toFixed(2)||"0.00"}</td>
                <td class="${t.variacaoReceitas>=0?"positive":"negative"}">
                  ${t.variacaoReceitas>=0?"+":""}${t.variacaoReceitas.toFixed(1)}%
                </td>
              </tr>
              <tr>
                <td>
                  <div class="flex items-center gap-2">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="3" y="6" width="18" height="12" rx="2" stroke="currentColor" stroke-width="2" fill="none"/>
                      <path d="M3 10h18" stroke="currentColor" stroke-width="2"/>
                      <!-- Fundo quadriculado -->
                      <path d="M6 12h2v2h-2z M10 12h2v2h-2z M14 12h2v2h-2z" fill="currentColor" opacity="0.3"/>
                      <path d="M6 14h2v2h-2z M10 14h2v2h-2z M14 14h2v2h-2z" fill="currentColor" opacity="0.3"/>
                      <!-- Gráfico de linha decrescente -->
                      <path d="M6 12l2 2 2-1 2 3 2-2" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    Despesas
                  </div>
                </td>
                <td>R$ ${t.totalDespesas.toFixed(2)}</td>
                <td>R$ ${r[1]?.despesas.toFixed(2)||"0.00"}</td>
                <td class="${t.variacaoDespesas<=0?"positive":"negative"}">
                  ${t.variacaoDespesas>=0?"+":""}${t.variacaoDespesas.toFixed(1)}%
                </td>
              </tr>
              <tr>
                <td>Saldo</td>
                <td>R$ ${t.saldoAtual.toFixed(2)}</td>
                <td>R$ ${r[1]?.saldo.toFixed(2)||"0.00"}</td>
                <td class="${t.variacaoSaldo>=0?"positive":"negative"}">
                  ${t.variacaoSaldo>=0?"+":""}${t.variacaoSaldo.toFixed(1)}%
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    `,a}static createLoader(){const e=document.createElement("div");return e.className="loading-state",e.innerHTML=`
      <div class="loading-spinner"></div>
      <span>Carregando análises...</span>
    `,e}static renderEmptyState(e){const t=document.createElement("div");return t.className="analytics-container",t.innerHTML=`
      <div class="empty-state">
        <div class="empty-icon">📊</div>
        <div class="empty-title">Nenhum Dado Disponível</div>
        <div class="empty-description">${e}</div>
      </div>
    `,t}static renderErrorState(e){const t=document.createElement("div");return t.className="analytics-container",t.innerHTML=`
      <div class="empty-state">
        <div class="empty-icon">❌</div>
        <div class="empty-title">Erro ao Carregar</div>
        <div class="empty-description">${e}</div>
        <button class="btn-analytics primary mt-4" onclick="window.AnalyticsClean.refreshData()">
          Tentar Novamente
        </button>
      </div>
    `,t}static async updatePeriod(){console.log("🔄 Atualizando período...")}static async updateView(){console.log("🔄 Atualizando visualização...")}static toggleChartView(e){console.log(`🔄 Alternando visualização do gráfico: ${e}`)}static async refreshData(){console.log("🔄 Atualizando dados...")}static exportReport(){console.log("📄 Exportando relatório...")}}window.AnalyticsClean=Ap;function Sb(){const n=localStorage.getItem("themeColor")||"blue",e=document.documentElement;e.setAttribute("data-theme-color",n);const t={blue:{primary:"#3B82F6",secondary:"#1E40AF",accent:"#DBEAFE"},green:{primary:"#10B981",secondary:"#059669",accent:"#D1FAE5"},purple:{primary:"#8B5CF6",secondary:"#7C3AED",accent:"#EDE9FE"},orange:{primary:"#F59E0B",secondary:"#D97706",accent:"#FEF3C7"}};t[n]&&(e.style.setProperty("--primary-color",t[n].primary),e.style.setProperty("--secondary-color",t[n].secondary),e.style.setProperty("--accent-color",t[n].accent)),console.log("🎨 Tema aplicado no dashboard:",n)}async function ha(n,e){if(window.isRenderingDashboard){console.log("🔄 Dashboard já está sendo renderizado, pulando...");return}if(window.isRenderingDashboard=!0,Sb(),!window.appState?.currentUser){console.warn("⚠️ Usuário não autenticado, renderizando dashboard vazio"),window.isRenderingDashboard=!1;return}try{let m=function(k,N,z){if(!k.dataInicio)return!0;try{const[H,ce,Te]=k.dataInicio.split("-").map(Number),ge=new Date(H,ce-1,Te);if(N<H||N===H&&z<ce||N===H&&z===ce&&new Date().getDate()<Te)return!1;if(k.parcelasTotal&&k.parcelasTotal>0){let Sn=(N-H)*12+(z-ce);!k.efetivarMesAtual&&(N>H||N===H&&z>ce)&&(Sn-=1);const tn=k.parcelasTotal-(k.parcelasRestantes||k.parcelasTotal);if((k.parcelasRestantes||k.parcelasTotal)-Sn<=0)return!1}return!0}catch(H){return console.error("Erro ao verificar se deve aplicar neste mês:",H),!0}};const t=document.getElementById("app-content");if(!t){console.warn("⚠️ Elemento #app-content não encontrado");return}const o=new Date,r=n||o.getFullYear(),a=e||o.getMonth()+1;window.currentYear=r,window.currentMonth=a;const s=["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"],c=window.appState.currentUser,l=window.appState.currentBudget;if(console.log("🔍 Dashboard Debug:",{user:c?c.email:"null",budget:l?l.nome:"null",budgetId:l?l.id:"null",categoriesCount:window.appState.categories?.length||0,transactionsCount:window.appState.transactions?.length||0}),!l){console.warn("⚠️ Nenhum orçamento selecionado no dashboard"),t.innerHTML=`
        <div class="dashboard-clean">
          <div class="text-center py-12">
            <div class="text-6xl mb-4">💰</div>
            <h2 class="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">Nenhum orçamento selecionado</h2>
            <p class="text-gray-500 dark:text-gray-400 mb-4">Vá para Configurações para criar ou selecionar um orçamento</p>
            <button onclick="window.renderSettings && window.renderSettings()" class="btn-primary px-6 py-3 rounded-xl">
              Configurações
            </button>
          </div>
        </div>
      `,window.isRenderingDashboard=!1;return}let d=c?await Ib(c.uid,r,a):[];r===o.getFullYear()&&a===o.getMonth()+1&&window.appState.transactions&&window.appState.transactions.length>0&&(d=window.appState.transactions),console.log("📊 Transações carregadas:",d.length);const h=window.appState.recorrentes||[],{calcularStatusRecorrente:g}=await pe(async()=>{const{calcularStatusRecorrente:k}=await Promise.resolve().then(()=>wb);return{calcularStatusRecorrente:k}},void 0),f=r>o.getFullYear()||r===o.getFullYear()&&a>o.getMonth()+1,v=h.filter(k=>{if(!k.ativa)return!1;if(f){if(k.dataInicio){const[H,ce]=k.dataInicio.split("-").map(Number);if(r<H||r===H&&a<ce)return console.log("🔍 Debug - Recorrente rejeitada: mês futuro anterior à data de início",k.descricao),!1}if(k.parcelasTotal&&k.parcelasTotal>0&&k.dataInicio){const[H,ce]=k.dataInicio.split("-").map(Number),Te=(r-H)*12+(a-ce),ge=k.parcelasRestantes||k.parcelasTotal;if(console.log("🔍 Debug - Verificando parcelas:",{recorrente:k.descricao,dataInicio:k.dataInicio,parcelasTotal:k.parcelasTotal,parcelasRestantes:ge,mesesDesdeInicio:Te,mesAtual:a+"/"+r}),Te>=ge)return console.log("🔍 Debug - Recorrente rejeitada: todas as parcelas já foram aplicadas",k.descricao),!1}return console.log("🔍 Debug - Recorrente incluída para mês futuro:",k.descricao),!0}return m(k,r,a)?!d.some(H=>{if(!H.recorrenteId||H.recorrenteId!==k.id)return!1;let ce;if(H.createdAt&&typeof H.createdAt=="object"&&H.createdAt.seconds)ce=new Date(H.createdAt.seconds*1e3);else if(H.createdAt)ce=new Date(H.createdAt);else return!1;return ce.getFullYear()===r&&ce.getMonth()+1===a}):!1}),b=v.filter(k=>{if(k.tipo)return k.tipo==="despesa";if(k.categoriaId){const N=window.appState.categories?.find(z=>z.id===k.categoriaId);return N&&N.tipo==="despesa"}return parseFloat(k.valor||0)<0}).reduce((k,N)=>k+parseFloat(N.valor||0),0),T=v.filter(k=>{if(k.tipo)return k.tipo==="receita";if(k.categoriaId){const N=window.appState.categories?.find(z=>z.id===k.categoriaId);return N&&N.tipo==="receita"}return parseFloat(k.valor||0)>0}).reduce((k,N)=>k+parseFloat(N.valor||0),0),D=d.filter(k=>k.tipo==="receita").reduce((k,N)=>k+parseFloat(N.valor),0),L=d.filter(k=>k.tipo==="despesa").reduce((k,N)=>k+parseFloat(N.valor),0),O=D+T,Q=L+b,J=O-Q,x=(window.appState.categories?.filter(k=>k.tipo==="despesa")||[]).reduce((k,N)=>k+parseFloat(N.limite||0),0),y=x>0?Q/x:0;let E="normal",S="📊";y>=1?(E="danger",S="🚨"):y>=.9?(E="warning",S="⚠️"):y>=.7?(E="caution",S="🟡"):(E="safe",S="✅");const I=v.map(k=>{const N=g(k,d,r,a);return{...k,status:N}}).slice(0,3);let A=[...d];if(f&&v.length>0){const k=v.map(N=>({id:`rec_${N.id}`,descricao:N.descricao,valor:N.valor,tipo:N.tipo,categoriaId:N.categoriaId,recorrenteId:N.id,recorrenteNome:N.descricao,createdAt:new Date(r,a-1,1),isRecorrenteSimulada:!0}));A=[...A,...k]}const _=window.appState.categories.filter(k=>k.tipo==="despesa").map(k=>{const z=A.filter(H=>H.categoriaId===k.id&&H.tipo===k.tipo).reduce((H,ce)=>H+parseFloat(ce.valor),0);return{...k,gasto:z}}).filter(k=>k.gasto>0).sort((k,N)=>N.gasto-k.gasto).slice(0,3),Pe=A.sort((k,N)=>{const z=k.createdAt?.seconds?new Date(k.createdAt.seconds*1e3):new Date(k.createdAt);return(N.createdAt?.seconds?new Date(N.createdAt.seconds*1e3):new Date(N.createdAt))-z}).slice(0,5),P=h.filter(k=>k.ativa?d.some(N=>{if(!N.recorrenteId||N.recorrenteId!==k.id)return!1;let z;if(N.createdAt&&typeof N.createdAt=="object"&&N.createdAt.seconds)z=new Date(N.createdAt.seconds*1e3);else if(N.createdAt)z=new Date(N.createdAt);else return!1;return z.getFullYear()===r&&z.getMonth()+1===a}):!1).map(k=>{const N=g(k,d,r,a);return{...k,status:N}}).slice(0,3),X=`
      <div class="dashboard-clean">
        <!-- Header Minimalista -->
        <div class="dashboard-header">
          <div class="month-selector">
            <button id="mes-anterior" class="month-btn">‹</button>
            <h1 class="month-title">${s[a-1]} ${r}</h1>
            <button id="mes-proximo" class="month-btn">›</button>
          </div>
          <button id="theme-toggle-btn" class="theme-btn">
            <span id="theme-icon">🎨</span>
          </button>
        </div>
        
        <!-- Cards de Resumo -->
        <div class="summary-cards">
          <div class="summary-card income">
            <div class="card-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="3" y="6" width="18" height="12" rx="2" stroke="white" stroke-width="2" fill="none"/>
                <path d="M3 10h18" stroke="white" stroke-width="2"/>
                <!-- Fundo quadriculado -->
                <path d="M6 12h2v2h-2z M10 12h2v2h-2z M14 12h2v2h-2z" fill="white" opacity="0.3"/>
                <path d="M6 14h2v2h-2z M10 14h2v2h-2z M14 14h2v2h-2z" fill="white" opacity="0.3"/>
                <!-- Gráfico de linha crescente -->
                <path d="M6 16l2-2 2-1 2-3 2 2" stroke="white" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <div class="card-content">
              <div class="card-title">Receitas</div>
              <div class="card-value">R$ ${O.toFixed(0)}</div>
              ${T>0?`<div class="card-subtitle">+ R$ ${T.toFixed(0)} agendadas</div>`:""}
            </div>
          </div>
          
          <div class="summary-card expense">
            <div class="card-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="3" y="6" width="18" height="12" rx="2" stroke="white" stroke-width="2" fill="none"/>
                <path d="M3 10h18" stroke="white" stroke-width="2"/>
                <!-- Fundo quadriculado -->
                <path d="M6 12h2v2h-2z M10 12h2v2h-2z M14 12h2v2h-2z" fill="white" opacity="0.3"/>
                <path d="M6 14h2v2h-2z M10 14h2v2h-2z M14 14h2v2h-2z" fill="white" opacity="0.3"/>
                <!-- Gráfico de linha decrescente -->
                <path d="M6 12l2 2 2-1 2 3 2-2" stroke="white" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <div class="card-content">
              <div class="card-title">Despesas</div>
              <div class="card-value">R$ ${Q.toFixed(0)}</div>
              ${b>0?`<div class="card-subtitle">+ R$ ${b.toFixed(0)} agendadas</div>`:""}
            </div>
          </div>
          
          <div class="summary-card balance ${J>=0?"positive":"negative"}">
            <div class="card-icon">${J>=0?"✅":"⚠️"}</div>
            <div class="card-content">
              <div class="card-title">Saldo</div>
              <div class="card-value">R$ ${J.toFixed(0)}</div>
              ${b>0||T>0?'<div class="card-subtitle">incluindo agendadas</div>':""}
            </div>
          </div>
          
          <div class="summary-card budget ${E}">
            <div class="card-icon">${S}</div>
            <div class="card-content">
              <div class="card-title">Orçado</div>
              <div class="card-value">R$ ${x.toFixed(0)}</div>
              <div class="card-subtitle">${(y*100).toFixed(0)}% usado</div>
            </div>
          </div>
        </div>
        
        <!-- Seções de Conteúdo -->
        <div class="dashboard-sections">
          <!-- Top Gastos -->
          ${_.length>0?`
          <div class="dashboard-section">
            <div class="section-header">
              <h3 class="section-title">📊 Top Gastos</h3>
              <button onclick="window.showAddCategoryModal && window.showAddCategoryModal()" class="add-btn">+</button>
            </div>
            <div class="section-content">
              ${_.map(k=>{const N=parseFloat(k.limite||0),z=N>0?Math.min(k.gasto/N*100,100):0;let H="progress-normal";return z>=90?H="progress-danger":z>=75?H="progress-warning":z>=50&&(H="progress-caution"),`
                  <div class="category-item">
                    <div class="category-info">
                      <div class="category-color" style="background-color: ${k.cor||"var(--primary-color)"}"></div>
                      <div class="category-details">
                        <div class="category-name">${k.nome}</div>
                        <div class="category-value">R$ ${k.gasto.toFixed(0)}</div>
                      </div>
                    </div>
                    ${N>0?`
                      <div class="progress-bar">
                        <div class="progress-fill ${H}" style="width: ${z}%"></div>
                      </div>
                    `:""}
                  </div>
                `}).join("")}
            </div>
          </div>
          `:""}
          
          <!-- Transações Recentes -->
          <div class="dashboard-section">
            <div class="section-header">
              <h3 class="section-title">📝 Recentes</h3>
              <button onclick="showAddTransactionModal()" class="add-btn">+</button>
            </div>
            <div class="section-content">
              ${Pe.length>0?Pe.slice(0,3).map(k=>{const N=window.appState.categories?.find(ce=>ce.id===k.categoriaId),z=k.createdAt?.seconds?new Date(k.createdAt.seconds*1e3):new Date(k.createdAt),H=k.isRecorrenteSimulada;return`
                  <div class="transaction-item ${H?"scheduled":""}">
                    <div class="transaction-info">
                      <div class="transaction-title">
                        ${k.descricao}
                        ${H?' <span class="recorrente-badge">🔄</span>':""}
                      </div>
                      <div class="transaction-meta">
                        ${H?"Agendada":z.toLocaleDateString("pt-BR",{day:"2-digit",month:"2-digit"})}
                        ${N?` • ${N.nome}`:""}
                      </div>
                    </div>
                    <div class="transaction-actions">
                      <div class="transaction-value ${k.tipo==="receita"?"positive":"negative"}">
                        ${k.tipo==="receita"?"+":"-"}R$ ${parseFloat(k.valor).toFixed(0)}
                      </div>
                      ${H?"":`
                        <div class="action-buttons">
                          <button onclick="window.editTransaction && window.editTransaction('${k.id}')" class="action-btn edit">✏️</button>
                          <button onclick="window.deleteTransactionWithConfirmation && window.deleteTransactionWithConfirmation('${k.id}', '${k.descricao.replace(/'/g,"\\'")}')" class="action-btn delete">🗑️</button>
                        </div>
                      `}
                    </div>
                  </div>
                `}).join(""):`
                <div class="empty-state">
                  <div class="empty-icon">📝</div>
                  <div class="empty-text">Nenhuma transação</div>
                  <button onclick="showAddTransactionModal()" class="empty-btn">Adicionar</button>
                </div>
              `}
            </div>
          </div>
          
          <!-- Recorrentes Efetivadas -->
          ${P.length>0?`
          <div class="dashboard-section">
            <div class="section-header">
              <h3 class="section-title">🔄 Efetivadas</h3>
              <button onclick="window.showAddRecorrenteModal && window.showAddRecorrenteModal()" class="add-btn">+</button>
            </div>
            <div class="section-content">
              ${P.map(k=>{const N=window.appState.categories?.find(z=>z.id===k.categoriaId);return`
                <div class="transaction-item">
                  <div class="transaction-info">
                    <div class="transaction-title">${k.descricao}</div>
                    <div class="transaction-meta">
                      ${N?N.nome:"Sem categoria"}
                      ${k.status&&k.status.parcelaAtual?` • Parcela ${k.status.parcelaAtual}/${k.status.totalParcelas||"∞"}`:""}
                    </div>
                  </div>
                  <div class="transaction-value ${k.tipo==="receita"?"positive":"negative"}">
                    ${k.tipo==="receita"?"+":"-"}R$ ${Math.abs(k.valor).toFixed(0)}
                  </div>
                </div>
              `}).join("")}
            </div>
          </div>
          `:""}
          
          <!-- Recorrentes Agendadas/Futuras -->
          ${I.length>0?`
          <div class="dashboard-section">
            <div class="section-header">
              <h3 class="section-title">${f?"🔄 Efetivadas":"⏰ Agendadas"}</h3>
              <button onclick="window.showAddRecorrenteModal && window.showAddRecorrenteModal()" class="add-btn">+</button>
            </div>
            <div class="section-content">
              ${I.map(k=>{const N=window.appState.categories?.find(z=>z.id===k.categoriaId);return`
                <div class="transaction-item ${f?"":"scheduled"}">
                  <div class="transaction-info">
                    <div class="transaction-title">${k.descricao}</div>
                    <div class="transaction-meta">
                      ${N?N.nome:f?"Sem categoria":"Próximo mês"}
                      ${k.status&&k.status.proximaParcela?` • Parcela ${k.status.proximaParcela}/${k.status.totalParcelas||"∞"}`:""}
                    </div>
                  </div>
                  <div class="transaction-value ${k.tipo==="receita"?"positive":"negative"}">
                    ${k.tipo==="receita"?"+":"-"}R$ ${Math.abs(k.valor).toFixed(0)}
                  </div>
                </div>
              `}).join("")}
            </div>
          </div>
          `:""}
        </div>
      </div>
    `;t.innerHTML=X,setTimeout(()=>{Ab()},100),console.log(`✅ Dashboard limpo renderizado: ${d.length} transações, ${_.length} categorias principais`)}catch(t){console.error("❌ Erro ao renderizar dashboard limpo:",t);const o=document.getElementById("app-content");o&&(o.innerHTML='<div class="text-red-600 text-center mt-8 p-4">Erro ao carregar dashboard. Tente novamente.</div>')}finally{window.isRenderingDashboard=!1}}async function Ib(n,e,t){try{const o=window.appState.currentBudget;if(!o)return[];const{query:r,collection:a,where:s,getDocs:c}=await pe(async()=>{const{query:f,collection:v,where:b,getDocs:T}=await Promise.resolve().then(()=>Ne);return{query:f,collection:v,where:b,getDocs:T}},void 0),{db:l}=await pe(async()=>{const{db:f}=await Promise.resolve().then(()=>co);return{db:f}},void 0),d=r(a(l,"transactions"),s("budgetId","==",o.id));return(await c(d)).docs.map(f=>({id:f.id,...f.data()})).filter(f=>{if(!f.createdAt)return!1;let v;f.createdAt&&typeof f.createdAt=="object"&&f.createdAt.seconds?v=new Date(f.createdAt.seconds*1e3):v=new Date(f.createdAt);const b=v.getFullYear(),T=v.getMonth()+1;return b===e&&T===t})}catch(o){return console.error("❌ Erro ao buscar transações do mês:",o),[]}}function Ab(){const n=document.getElementById("mes-anterior");n&&(n.onclick=()=>{const r=window.currentYear||new Date().getFullYear();let s=(window.currentMonth||new Date().getMonth()+1)-1,c=r;s<1&&(s=12,c--),window.currentYear=c,window.currentMonth=s,ha(c,s)});const e=document.getElementById("mes-proximo");e&&(e.onclick=()=>{const r=window.currentYear||new Date().getFullYear();let s=(window.currentMonth||new Date().getMonth()+1)+1,c=r;s>12&&(s=1,c++),window.currentYear=c,window.currentMonth=s,ha(c,s)}),document.getElementById("theme-toggle-btn")&&window.setupThemeToggle&&(window.setupThemeToggle("theme-toggle-btn"),o());function o(){const r=document.getElementById("theme-icon");if(r){const a=document.documentElement.classList.contains("dark");r.textContent=a?"🌙":"☀️"}}}window.renderCleanDashboard=ha;async function kb(){try{console.log("🚀 Iniciando renderCleanCategories"),Cb(),await $b(),await Lb();const n=document.getElementById("app-content");if(!n)return;const e=Rb();n.innerHTML=Db(e),Mb(),Nb(),console.log("✅ Categorias limpas renderizadas:",e.length,"categorias")}catch(n){console.error("❌ Erro ao renderizar categorias limpas:",n)}}function Cb(){const n=localStorage.getItem("themeColor")||"blue";document.documentElement.setAttribute("data-theme-color",n),console.log("🎨 Tema aplicado nas categorias:",n)}function Rb(){const n=new Date,e=n.getFullYear(),t=n.getMonth()+1;return window.appState.categories.map(o=>{const a=window.appState.transactions.filter(f=>{let v;f.createdAt&&typeof f.createdAt=="object"&&f.createdAt.seconds?v=new Date(f.createdAt.seconds*1e3):v=new Date(f.createdAt);const b=v.getFullYear(),T=v.getMonth()+1;return f.categoriaId===o.id&&f.tipo===o.tipo&&b===e&&T===t}).reduce((f,v)=>f+parseFloat(v.valor),0),s=window.appState.recorrentes.filter(f=>f.categoriaId===o.id&&f.ativa===!0);let c=0;s.forEach(f=>{Pb(f,e,t)&&(c+=parseFloat(f.valor||0))});const l=a+c,d=parseFloat(o.limite||0);let h;o.tipo,h=d-l;const g=d>0?l/d*100:0;let m="safe";return o.tipo,g>=100?m="danger":g>=75&&(m="caution"),{...o,totalGasto:l,totalGastoTransacoes:a,totalGastoRecorrentes:c,saldo:h,percentualUso:g,progressStatus:m,limite:d}})}function Pb(n,e,t){if(!n.dataInicio)return!0;try{const[o,r]=n.dataInicio.split("-").map(Number);if(e<o||e===o&&t<r)return!1;if(n.parcelasTotal&&n.parcelasTotal>0){const a=(e-o)*12+(t-r),s=n.parcelasRestantes||n.parcelasTotal;if(a>=s)return!1}return!0}catch(o){return console.error("Erro ao verificar recorrente:",o),!0}}function Db(n){if(n.length===0)return`
      <div class="categories-container">
        <div class="categories-header">
          <div class="categories-title">
            🏷️ Categorias
          </div>
          <div class="categories-actions">
            <button onclick="showAddCategoryModal()" class="btn-category primary">
              ➕ Nova Categoria
            </button>
          </div>
        </div>
        
        <div class="empty-state">
          <div class="empty-icon">🏷️</div>
          <div class="empty-title">Nenhuma categoria encontrada</div>
          <div class="empty-description">
            Adicione sua primeira categoria para começar a organizar suas finanças
          </div>
        </div>
      </div>
    `;const e=n.filter(a=>a.tipo==="receita").sort((a,s)=>s.totalGasto-a.totalGasto),t=n.filter(a=>a.tipo==="despesa").sort((a,s)=>s.totalGasto-a.totalGasto),o=e.map((a,s)=>Hd(a,s)).join(""),r=t.map((a,s)=>Hd(a,s)).join("");return`
    <div class="categories-container">
      <div class="categories-header">
        <div class="categories-title">
          🏷️ Categorias
          <span class="search-results" id="search-results" style="display: none;">
            (<span id="search-count">0</span> encontradas)
          </span>
        </div>
        <div class="categories-actions">
          <button onclick="window.migrarTransacoesAntigas()" class="btn-category secondary">
            🔄 Migrar
          </button>
          <button onclick="window.corrigirTipoCategoria()" class="btn-category secondary">
            🔧 Corrigir
          </button>
          <button onclick="showAddCategoryModal()" class="btn-category primary">
            ➕ Nova Categoria
          </button>
        </div>
      </div>
      
      <div class="search-container">
        <div class="search-icon">🔍</div>
        <input 
          type="text" 
          id="category-search" 
          class="search-input" 
          placeholder="Pesquisar categorias..."
        />
      </div>
      
      <div class="categories-content">
        ${e.length>0?`
          <div class="category-section">
            <div class="section-header receita">
              <div class="section-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="3" y="6" width="18" height="12" rx="2" stroke="white" stroke-width="2" fill="none"/>
                  <path d="M3 10h18" stroke="white" stroke-width="2"/>
                  <!-- Fundo quadriculado -->
                  <path d="M6 12h2v2h-2z M10 12h2v2h-2z M14 12h2v2h-2z" fill="white" opacity="0.3"/>
                  <path d="M6 14h2v2h-2z M10 14h2v2h-2z M14 14h2v2h-2z" fill="white" opacity="0.3"/>
                  <!-- Gráfico de linha crescente -->
                  <path d="M6 16l2-2 2-1 2-3 2 2" stroke="white" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
              <div class="section-title">Receitas</div>
              <div class="section-count">${e.length}</div>
            </div>
            <div class="categories-grid" id="categories-receita">
              ${o}
            </div>
          </div>
        `:""}
        
        ${t.length>0?`
          <div class="category-section">
            <div class="section-header despesa">
              <div class="section-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="3" y="6" width="18" height="12" rx="2" stroke="white" stroke-width="2" fill="none"/>
                  <path d="M3 10h18" stroke="white" stroke-width="2"/>
                  <!-- Fundo quadriculado -->
                  <path d="M6 12h2v2h-2z M10 12h2v2h-2z M14 12h2v2h-2z" fill="white" opacity="0.3"/>
                  <path d="M6 14h2v2h-2z M10 14h2v2h-2z M14 14h2v2h-2z" fill="white" opacity="0.3"/>
                  <!-- Gráfico de linha decrescente -->
                  <path d="M6 12l2 2 2-1 2 3 2-2" stroke="white" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
              <div class="section-title">Despesas</div>
              <div class="section-count">${t.length}</div>
            </div>
            <div class="categories-grid" id="categories-despesa">
              ${r}
            </div>
          </div>
        `:""}
      </div>
    </div>
  `}function Hd(n,e=0){const t=Math.min(n.percentualUso,100),o=n.tipo==="receita";return`
    <div class="category-card ${o?"receita":"despesa"}" data-category-id="${n.id}">
      <div class="category-header">
        <div class="category-info">
          <div class="category-color" style="background-color: ${n.cor||(o?"#10b981":"#ef4444")}"></div>
          <div class="category-details">
            <div class="category-name">
              ${n.nome}
              ${n.totalGasto>0?`<span class="category-rank">#${e+1}</span>`:""}
            </div>
            <div class="category-type ${n.tipo}">
              ${o?"💚 Receita":"❤️ Despesa"}
            </div>
          </div>
        </div>
        <div class="category-status ${n.progressStatus}">
          ${n.progressStatus==="danger"?"⚠️":n.progressStatus==="caution"?"⚡":"✅"}
        </div>
      </div>
      
      <div class="category-finance">
        ${n.limite>0?`
          <div class="finance-summary">
            <div class="summary-item">
              <div class="summary-label">Limite</div>
              <div class="summary-value">R$ ${n.limite.toFixed(2)}</div>
            </div>
            <div class="summary-item">
              <div class="summary-label">${o?"Receita":"Gasto"}</div>
              <div class="summary-value ${n.totalGasto>n.limite?"negative":"positive"}">
                R$ ${n.totalGasto.toFixed(2)}
              </div>
            </div>
            <div class="summary-item">
              <div class="summary-label">${o?"Falta":"Saldo"}</div>
              <div class="summary-value ${n.saldo<0?"negative":n.saldo<n.limite*.25?"warning":"positive"}">
                R$ ${n.saldo.toFixed(2)}
              </div>
            </div>
          </div>
          
          ${n.totalGasto>0?`
            <div class="transaction-breakdown">
              <div class="breakdown-item">
                <span class="breakdown-icon">📊</span>
                <span class="breakdown-label">Transações:</span>
                <span class="breakdown-value">R$ ${n.totalGastoTransacoes.toFixed(2)}</span>
              </div>
              ${n.totalGastoRecorrentes>0?`
                <div class="breakdown-item">
                  <span class="breakdown-icon">🔄</span>
                  <span class="breakdown-label">Recorrentes:</span>
                  <span class="breakdown-value">R$ ${n.totalGastoRecorrentes.toFixed(2)}</span>
                </div>
              `:""}
            </div>
          `:""}
          
          <div class="progress-container">
            <div class="progress-header">
              <span class="progress-label">Progresso</span>
              <span class="progress-percentage">${n.percentualUso.toFixed(0)}%</span>
            </div>
            <div class="progress-bar">
              <div class="progress-fill ${n.progressStatus}" style="width: ${t}%"></div>
            </div>
            <div class="progress-status-text">
              ${n.progressStatus==="danger"?"Limite excedido":n.progressStatus==="caution"?"Atenção":"No controle"}
            </div>
          </div>
        `:`
          <div class="finance-summary">
            <div class="summary-item">
              <div class="summary-label">${o?"Receita":"Gasto"} do mês</div>
              <div class="summary-value ${o?"positive":""}">
                R$ ${n.totalGasto.toFixed(2)}
              </div>
            </div>
          </div>
          
          ${n.totalGasto>0?`
            <div class="transaction-breakdown">
              <div class="breakdown-item">
                <span class="breakdown-icon">📊</span>
                <span class="breakdown-label">${o?"Receitas":"Transações"}:</span>
                <span class="breakdown-value">R$ ${n.totalGastoTransacoes.toFixed(2)}</span>
              </div>
              ${n.totalGastoRecorrentes>0?`
                <div class="breakdown-item">
                  <span class="breakdown-icon">🔄</span>
                  <span class="breakdown-label">Recorrentes:</span>
                  <span class="breakdown-value">R$ ${n.totalGastoRecorrentes.toFixed(2)}</span>
                </div>
              `:""}
            </div>
          `:""}
          
          <div class="no-limit-notice">
            <span class="notice-icon">ℹ️</span>
            <span class="notice-text">Sem limite definido</span>
          </div>
        `}
      </div>
      
      <div class="category-actions">
        <button onclick="editCategory('${n.id}')" class="action-btn edit" title="Editar categoria">
          ✏️
        </button>
        <button onclick="showCategoryHistory('${n.id}')" class="action-btn history" title="Ver histórico">
          📊
        </button>
        <button onclick="window.deleteCategoryWithConfirmation('${n.id}', '${n.nome.replace(/'/g,"\\'")}')" class="action-btn delete" title="Excluir categoria">
          🗑️
        </button>
      </div>
    </div>
  `}function Mb(){const n=document.getElementById("category-search"),e=document.getElementById("search-results"),t=document.getElementById("search-count");document.getElementById("categories-grid"),n&&n.addEventListener("input",o=>{const r=o.target.value.toLowerCase().trim(),a=document.querySelectorAll(".category-card");let s=0;a.forEach(c=>{const l=c.querySelector(".category-name").textContent.toLowerCase(),d=c.querySelector(".category-type").textContent.toLowerCase();l.includes(r)||d.includes(r)?(c.style.display="block",s++):c.style.display="none"}),r.length>0?(e.style.display="inline",t.textContent=s):e.style.display="none"})}function Nb(){const n=document.querySelector(".btn-category.primary");n&&n.addEventListener("click",()=>{window.showAddCategoryModal&&window.showAddCategoryModal()});const e=document.querySelector(".btn-category.secondary");e&&e.addEventListener("click",()=>{window.migrarTransacoesAntigas&&window.migrarTransacoesAntigas()});const t=document.querySelectorAll(".btn-category.secondary")[1];t&&t.addEventListener("click",()=>{window.corrigirTipoCategoria&&window.corrigirTipoCategoria()})}async function $b(){window.appState.transactions||console.log("📊 Carregando transações...")}async function Lb(){window.appState.recorrentes||console.log("🔄 Carregando recorrentes...")}async function Fb(){try{console.log("🚀 Iniciando renderCleanTransactions"),Vb(),await Gb(),await Wb();const n=document.getElementById("app-content");if(!n){console.error("❌ Elemento app-content não encontrado");return}console.log("📊 Dados carregados:",{transactions:window.appState.transactions?.length||0,categories:window.appState.categories?.length||0,recorrentes:window.appState.recorrentes?.length||0}),n.innerHTML=Ob(),zb(),qb(),Hb(),console.log("✅ Transações limpas renderizadas:",window.appState.transactions?.length||0,"transações")}catch(n){console.error("❌ Erro ao renderizar transações limpas:",n)}}function Vb(){const n=localStorage.getItem("themeColor")||"blue";document.documentElement.setAttribute("data-theme-color",n),console.log("🎨 Tema aplicado nas transações:",n)}function Ob(){const n=window.appState.transactions||[],e=window.appState.categories||[];if(console.log("📋 Gerando HTML das transações:",{transactionsCount:n.length,categoriesCount:e.length,categories:e.map(o=>o.nome)}),n.length===0)return`
      <div class="transactions-container">
        <div class="transactions-header">
          <div class="transactions-title">
            📋 Transações
          </div>
          <div class="transactions-actions">
            <button onclick="showAddTransactionModal()" class="btn-transaction primary">
              ➕ Nova Transação
            </button>
            <button onclick="showVoiceModal()" class="btn-transaction secondary">
              🎤 Voz
            </button>
          </div>
        </div>
        
        <div class="empty-state">
          <div class="empty-icon">📋</div>
          <div class="empty-title">Nenhuma transação encontrada</div>
          <div class="empty-description">
            Adicione sua primeira transação para começar a controlar suas finanças
          </div>
          <button onclick="showAddTransactionModal()" class="empty-btn">
            ➕ Adicionar Transação
          </button>
        </div>
      </div>
    `;const t=n.map(o=>Bb(o)).join("");return`
    <div class="transactions-container">
      <div class="transactions-header">
        <div class="transactions-title">
          📋 Transações
          <span class="search-results" id="search-results" style="display: none;">
            (<span id="search-count">0</span> encontradas)
          </span>
        </div>
        <div class="transactions-actions">
          <button onclick="showAddTransactionModal()" class="btn-transaction primary">
            ➕ Nova Transação
          </button>
          <button onclick="showVoiceModal()" class="btn-transaction secondary">
            🎤 Voz
          </button>
        </div>
      </div>
      
      <div class="filters-container">
        <div class="search-container">
          <div class="search-icon">🔍</div>
          <input 
            type="text" 
            id="transaction-search" 
            class="search-input" 
            placeholder="Pesquisar transações..."
          />
        </div>
        
        <div class="filters-row">
          <div class="filter-container" style="flex: 1; position: relative;">
            <div class="filter-icon">🏷️</div>
                                     <select id="category-filter" class="filter-select">
              <option value="">Todas as categorias</option>
              ${window.appState.categories?.map(o=>(console.log("🏷️ Adicionando categoria ao select:",o.nome),`<option value="${o.nome}">${o.nome}</option>`)).join("")||""}
            </select>
            <div class="filter-arrow">▼</div>
          </div>
          
          <div class="filter-container" style="flex: 1; position: relative;">
            <div class="filter-icon">💰</div>
            <select id="type-filter" class="filter-select">
              <option value="">Todos os tipos</option>
              <option value="receita">💚 Receitas</option>
              <option value="despesa">❤️ Despesas</option>
            </select>
            <div class="filter-arrow">▼</div>
          </div>
          
          <button id="clear-filters-btn" class="clear-filters-btn">
            🗑️ Limpar
          </button>
        </div>
      </div>
      
      <div class="transactions-list" id="transactions-list">
        ${t}
      </div>
    </div>
  `}function Bb(n){const e=window.appState.categories?.find(s=>s.id===n.categoriaId),t=Ub(n.createdAt),o=n.tipo==="receita",r=n.recorrenteId;let a="";if(r){const s=window.appState.recorrentes?.find(c=>c.id===n.recorrenteId);if(s){const c=n.parcelaAtual||1,l=s.parcelasTotal||1;l>1?a=` • ${c} de ${l}`:a=" • Infinito"}}return`
    <div class="transaction-item ${o?"receita":"despesa"} ${r?"recorrente":""}" data-transaction-id="${n.id}">
      <div class="transaction-info">
        <div class="transaction-title">
          ${n.descricao}
          ${r?'<span class="recorrente-badge">🔄</span>':""}
        </div>
        <div class="transaction-meta">
          ${e?`
            <span class="transaction-category">
              🏷️ ${e.nome}
            </span>
          `:""}
          <span class="transaction-date">
            📅 ${t}
          </span>
          ${r?`
            <span class="parcela-info">
              ${a}
            </span>
          `:""}
        </div>
      </div>
      
      <div class="transaction-actions">
        <div class="transaction-value ${o?"positive":"negative"}">
          ${o?"+":"-"}R$ ${parseFloat(n.valor).toFixed(2)}
        </div>
        <div class="action-buttons">
          <button onclick="editTransaction('${n.id}')" class="action-btn edit" title="Editar">
            ✏️
          </button>
          <button onclick="window.deleteTransactionWithConfirmation && window.deleteTransactionWithConfirmation('${n.id}', '${n.descricao.replace(/'/g,"\\'")}')" class="action-btn delete" title="Excluir">
            🗑️
          </button>
        </div>
      </div>
    </div>
  `}function Ub(n){try{let e;return n&&typeof n=="object"&&n.seconds?e=new Date(n.seconds*1e3):e=new Date(n),e.toLocaleDateString("pt-BR",{day:"2-digit",month:"2-digit",year:"numeric"})}catch(e){return console.error("Erro ao formatar data:",e),"Data inválida"}}function zb(){const n=document.getElementById("transaction-search"),e=document.getElementById("search-results"),t=document.getElementById("search-count");n&&n.addEventListener("input",o=>{const r=o.target.value.toLowerCase().trim();if(pa(),r.length>0){e.style.display="inline";const a=document.querySelectorAll('.transaction-item[style*="display: block"]').length;t.textContent=a}else e.style.display="none"})}function qb(){console.log("🔧 Configurando filtros de transações");const n=document.getElementById("category-filter"),e=document.getElementById("type-filter"),t=document.getElementById("clear-filters-btn");console.log("🔧 Elementos encontrados:",{categoryFilter:!!n,typeFilter:!!e,clearFiltersBtn:!!t}),n&&(console.log("🔧 Configurando filtro de categoria"),n.addEventListener("change",o=>{console.log("🔧 Filtro de categoria mudou:",o.target.value),console.log("🔧 Hash antes:",window.location.hash),o.preventDefault(),o.stopPropagation(),o.stopImmediatePropagation();const r=window.router;return window.router=a=>(console.log("🔧 Router bloqueado durante filtro:",a),!1),window.location.hash!=="#/transactions"&&(window.location.hash="#/transactions"),pa(),console.log("🔧 Hash depois:",window.location.hash),setTimeout(()=>{window.router=r},100),!1})),e&&(console.log("🔧 Configurando filtro de tipo"),e.addEventListener("change",o=>(console.log("🔧 Filtro de tipo mudou:",o.target.value),o.preventDefault(),o.stopPropagation(),o.stopImmediatePropagation(),window.location.hash!=="#/transactions"&&(window.location.hash="#/transactions"),pa(),!1))),t&&(console.log("🔧 Configurando botão limpar filtros"),t.addEventListener("click",o=>{console.log("🔧 Botão limpar filtros clicado"),o.preventDefault(),o.stopPropagation(),jb()}))}function pa(){const n=document.getElementById("transaction-search")?.value.toLowerCase().trim()||"",e=document.getElementById("category-filter")?.value||"",t=document.getElementById("type-filter")?.value||"";console.log("🔧 Aplicando filtros:",{searchTerm:n,categoryFilter:e,typeFilter:t});const o=document.querySelectorAll(".transaction-item");let r=0;o.forEach(c=>{const l=c.querySelector(".transaction-title").textContent.toLowerCase(),d=c.querySelector(".transaction-category"),h=d?d.textContent.replace("🏷️ ","").trim().toLowerCase():"",g=c.classList.contains("receita")?"receita":"despesa",m=!n||l.includes(n),f=!e||e===""||h===e.toLowerCase();m&&f&&(!t||g===t)?(c.style.display="flex",r++):c.style.display="none"});const a=document.getElementById("search-results"),s=document.getElementById("search-count");a&&s&&(n.length>0||e||t?(a.style.display="inline",s.textContent=r):a.style.display="none")}function jb(){console.log("🧹 Limpando filtros");const n=document.getElementById("transaction-search"),e=document.getElementById("category-filter"),t=document.getElementById("type-filter");console.log("🧹 Elementos encontrados:",{searchInput:!!n,categoryFilter:!!e,typeFilter:!!t}),n&&(n.value=""),e&&(e.value=""),t&&(t.value=""),console.log("🧹 Valores limpos");const o=document.querySelectorAll(".transaction-item");console.log("🧹 Transações encontradas:",o.length),o.forEach(a=>{a.style.display="flex"}),pa();const r=document.getElementById("search-results");r&&(r.style.display="none"),console.log("🧹 Filtros limpos aplicados")}function Hb(){const n=document.querySelector(".btn-transaction.primary");n&&n.addEventListener("click",()=>{window.showAddTransactionModal&&window.showAddTransactionModal()});const e=document.querySelector(".btn-transaction.secondary");e&&e.addEventListener("click",()=>{window.showVoiceModal&&window.showVoiceModal()})}async function Gb(){window.appState.transactions||console.log("📊 Carregando transações...")}async function Wb(){window.appState.recorrentes||console.log("🔄 Carregando recorrentes...")}async function kp(){console.log("🔄 Renderizando recorrentes melhoradas..."),Kb();const n=window.appState?.currentBudget;if(!n)return Cp("Nenhum orçamento selecionado");const e=document.createElement("div");e.className="recorrentes-clean",e.innerHTML=`
    <div class="recorrentes-header">
      <div class="recorrentes-title">
        🔄 Despesas Recorrentes
      </div>
      <div class="recorrentes-actions">
        <button class="btn-recorrentes secondary" onclick="window.verificarRecorrentes()">
          🔍 Verificar
        </button>
        <button class="btn-recorrentes primary" onclick="window.aplicarRecorrentes()">
          ✅ Aplicar
        </button>
        <button class="btn-recorrentes primary" onclick="window.showAddRecorrenteModal()">
          ➕ Nova Recorrente
        </button>
      </div>
    </div>
  `;const t=Zb();e.appendChild(t);try{const o=await Yb(n.id);e.removeChild(t),e.appendChild(Qb(o))}catch(o){console.error("❌ Erro ao carregar recorrentes:",o),e.removeChild(t),e.appendChild(eE(o.message))}return e}function Kb(){const n=localStorage.getItem("themeColor")||"blue";document.documentElement.setAttribute("data-theme-color",n),console.log("🎨 Tema aplicado nas recorrentes:",n)}async function Yb(n){if(!window.appState?.currentUser)throw new Error("Usuário não autenticado");const t=window.appState.recorrentes||[],o=window.appState.transactions||[],r=window.appState.categories||[],a=new Date,s=a.getFullYear(),c=a.getMonth()+1,l=o.filter(f=>{if(!f.recorrenteId)return!1;let v;if(f.createdAt&&typeof f.createdAt=="object"&&f.createdAt.seconds)v=new Date(f.createdAt.seconds*1e3);else if(f.createdAt)v=new Date(f.createdAt);else return!1;return v.getFullYear()===s&&v.getMonth()+1===c}).map(f=>f.recorrenteId),d=t.map(f=>{const v=l.includes(f.id),b=r.find(Q=>Q.id===f.categoriaId),T=window.calcularStatusRecorrente?window.calcularStatusRecorrente(f,o,s,c):{parcelaAtual:null,totalParcelas:f.parcelasTotal,foiEfetivadaEsteMes:v},D=parseFloat(f.valor),L=f.valorTotal?parseFloat(f.valorTotal):T.totalParcelas&&T.totalParcelas>1?D*T.totalParcelas:D,O=Xb(f.dataInicio,f.diaLancamento||1);return{...f,categoria:b,status:T,valorParcela:D,valorTotal:L,proximaData:O,jaLancadaEsteMes:v}}),h=d.filter(f=>f.jaLancadaEsteMes),g=d.filter(f=>!f.jaLancadaEsteMes&&f.ativa!==!1),m=d.filter(f=>f.ativa===!1);return{efetivadas:h,agendadas:g,pausadas:m,total:d.length,stats:{totalValor:d.reduce((f,v)=>f+v.valorParcela,0),totalEfetivadas:h.length,totalAgendadas:g.length,totalPausadas:m.length}}}function Xb(n,e){try{const t=new Date,o=new Date(n),r=t.getMonth()>o.getMonth()?t.getFullYear():o.getFullYear(),a=t.getMonth()+(e<=t.getDate()?1:0);return new Date(r,a,e)}catch{return new Date}}function Qb(n){const{efetivadas:e,agendadas:t,pausadas:o,stats:r}=n,a=document.createElement("div");return a.className="recorrentes-sections",t.length>0&&a.appendChild(Ns("Agendadas",t,"agendada")),e.length>0&&a.appendChild(Ns("Efetivadas",e,"efetivada")),o.length>0&&a.appendChild(Ns("Pausadas",o,"pausada")),n.total===0&&a.appendChild(Cp("Nenhuma despesa recorrente cadastrada")),a}function Ns(n,e,t){const o=document.createElement("div");o.className="recorrentes-section";const r=t==="agendada"?"📅":t==="efetivada"?"✅":"⏸️";return o.innerHTML=`
    <div class="section-header">
      <div class="section-title">
        <div class="section-icon">${r}</div>
        ${n} (${e.length})
      </div>
      <button class="add-btn" onclick="window.showAddRecorrenteModal()">+</button>
    </div>
    <div class="section-content">
      ${e.map(a=>Jb(a)).join("")}
    </div>
  `,o}function Jb(n,e){const{status:t,categoria:o,valorParcela:r,valorTotal:a,proximaData:s,jaLancadaEsteMes:c}=n;let l="",d="";return t.temParcelas?t.foiEfetivadaEsteMes?(l=`✅ Efetivada: ${t.parcelaAtual} de ${t.totalParcelas}`,d="efetivada"):t.proximaParcela&&t.proximaParcela<=t.totalParcelas?(l=`📅 Agendada: ${t.proximaParcela} de ${t.totalParcelas}`,d="agendada"):(l=`📊 Parcela ${t.parcelaAtual} de ${t.totalParcelas}`,d="agendada"):(l="♾️ Infinito",d="infinita"),`
    <div class="recorrente-card">
      <div class="recorrente-header">
        <div class="recorrente-icon" style="background-color: ${o?.cor||"#4F46E5"}">
          ${o?.nome?.charAt(0)?.toUpperCase()||"R"}
        </div>
        <div class="recorrente-info">
          <div class="recorrente-title">${n.descricao}</div>
          <div class="recorrente-subtitle">
            ${o?.nome||"Sem categoria"}
          </div>
        </div>
      </div>
      
      <div class="recorrente-details">
        <div class="detail-item">
          <span class="detail-label">Valor:</span>
          <span class="detail-value negative">R$ ${r.toFixed(2)}</span>
        </div>
        ${t.totalParcelas&&t.totalParcelas>1?`
          <div class="detail-item">
            <span class="detail-label">Total:</span>
            <span class="detail-value negative">R$ ${a.toFixed(2)}</span>
          </div>
        `:""}
        <div class="detail-item">
          <span class="detail-label">Próxima:</span>
          <span class="detail-value">${s.toLocaleDateString("pt-BR")}</span>
        </div>
      </div>
      
      <div class="recorrente-status ${d}">
        ${l}
      </div>
      
      <div class="recorrente-actions">
        <button class="action-btn edit" onclick="window.showAddRecorrenteModal(${JSON.stringify(n).replace(/"/g,"&quot;")})">
          ✏️ Editar
        </button>
        <button class="action-btn toggle" onclick="window.handleToggleRecorrente(${JSON.stringify(n).replace(/"/g,"&quot;")})">
          ${n.ativa===!1?"▶️":"⏸️"} ${n.ativa===!1?"Ativar":"Pausar"}
        </button>
        <button class="action-btn history" onclick="window.showHistoricoRecorrente('${n.id}')">
          📊 Histórico
        </button>
        <button class="action-btn delete" onclick="window.handleDeleteRecorrente('${n.id}')">
          🗑️ Excluir
        </button>
      </div>
    </div>
  `}function Zb(){const n=document.createElement("div");return n.className="loading-state",n.innerHTML=`
    <div class="loading-spinner"></div>
    <span>Carregando recorrentes...</span>
  `,n}function Cp(n){const e=document.createElement("div");return e.className="recorrentes-clean",e.innerHTML=`
    <div class="recorrentes-header">
      <div class="recorrentes-title">
        🔄 Despesas Recorrentes
      </div>
      <div class="recorrentes-actions">
        <button class="btn-recorrentes primary" onclick="window.showAddRecorrenteModal()">
          ➕ Nova Recorrente
        </button>
      </div>
    </div>
    <div class="empty-state">
      <div class="empty-icon">🔄</div>
      <div class="empty-title">Nenhuma Recorrente</div>
      <div class="empty-description">${n}</div>
      <button class="empty-btn" onclick="window.showAddRecorrenteModal()">
        ➕ Criar Primeira Recorrente
      </button>
    </div>
  `,e}function eE(n){const e=document.createElement("div");return e.className="recorrentes-clean",e.innerHTML=`
    <div class="recorrentes-header">
      <div class="recorrentes-title">
        🔄 Despesas Recorrentes
      </div>
    </div>
    <div class="empty-state">
      <div class="empty-icon">❌</div>
      <div class="empty-title">Erro ao Carregar</div>
      <div class="empty-description">${n}</div>
      <button class="empty-btn" onclick="window.location.reload()">
        🔄 Tentar Novamente
      </button>
    </div>
  `,e}window.renderCleanRecorrentes=kp;async function qa(){console.log("🔄 Renderizando notificações melhoradas..."),tE();const n=document.createElement("div");n.className="notifications-clean",n.innerHTML=`
    <div class="notifications-header">
      <div class="notifications-title">
        🔔 Notificações
      </div>
      <div class="notifications-actions">
        <button class="btn-notifications success" onclick="markAllNotificationsAsRead()">
          ✔️ Marcar todas como lidas
        </button>
      </div>
    </div>
  `;const e=iE();n.appendChild(e);try{await nE();const t=window.appState.notifications||[];n.removeChild(e),n.appendChild(aE(t))}catch(t){console.error("❌ Erro ao carregar notificações:",t),n.removeChild(e),n.appendChild(lE(t.message))}return n}function tE(){const n=localStorage.getItem("themeColor")||"blue";document.documentElement.setAttribute("data-theme-color",n),console.log("🎨 Tema aplicado nas notificações:",n)}async function nE(){const n=window.appState?.currentUser;if(!n)throw new Error("Usuário não autenticado");try{const{collection:e,getDocs:t,query:o,where:r,limit:a}=await pe(async()=>{const{collection:g,getDocs:m,query:f,where:v,limit:b}=await Promise.resolve().then(()=>Ne);return{collection:g,getDocs:m,query:f,where:v,limit:b}},void 0),{db:s}=await pe(async()=>{const{db:g}=await Promise.resolve().then(()=>co);return{db:g}},void 0),c=e(s,"notifications"),l=o(c,r("recipientId","==",n.uid),a(50)),h=(await t(l)).docs.map(g=>({id:g.id,...g.data()}));return h.sort((g,m)=>{const f=g.createdAt?.toDate?g.createdAt.toDate():new Date(g.createdAt||0);return(m.createdAt?.toDate?m.createdAt.toDate():new Date(m.createdAt||0))-f}),window.appState.notifications=h,console.log("📊 Notificações carregadas:",h.length),h}catch(e){throw console.error("❌ Erro ao carregar notificações:",e),e}}async function oE(n){if(!window.appState?.currentUser)throw new Error("Usuário não autenticado");try{const{doc:t,updateDoc:o}=await pe(async()=>{const{doc:d,updateDoc:h}=await Promise.resolve().then(()=>Ne);return{doc:d,updateDoc:h}},void 0),{db:r}=await pe(async()=>{const{db:d}=await Promise.resolve().then(()=>co);return{db:d}},void 0),a=t(r,"notifications",n);await o(a,{read:!0,readAt:new Date});const s=window.appState.notifications||[],c=s.findIndex(d=>d.id===n);c!==-1&&(s[c].read=!0,s[c].readAt=new Date),console.log("✅ Notificação marcada como lida:",n);const l=document.getElementById("app-content");if(l){const d=await qa();l.innerHTML="",l.appendChild(d)}}catch(t){throw console.error("❌ Erro ao marcar notificação como lida:",t),t}}async function rE(){const n=window.appState?.currentUser;if(!n)throw new Error("Usuário não autenticado");try{const{collection:e,getDocs:t,query:o,where:r,writeBatch:a,doc:s}=await pe(async()=>{const{collection:b,getDocs:T,query:D,where:L,writeBatch:O,doc:Q}=await Promise.resolve().then(()=>Ne);return{collection:b,getDocs:T,query:D,where:L,writeBatch:O,doc:Q}},void 0),{db:c}=await pe(async()=>{const{db:b}=await Promise.resolve().then(()=>co);return{db:b}},void 0),l=e(c,"notifications"),d=o(l,r("recipientId","==",n.uid)),h=await t(d),g=a(c);let m=0;h.docs.forEach(b=>{if(!b.data().read){const D=s(c,"notifications",b.id);g.update(D,{read:!0,readAt:new Date}),m++}}),m>0&&await g.commit(),(window.appState.notifications||[]).forEach(b=>{b.read||(b.read=!0,b.readAt=new Date)}),console.log("✅ Todas as notificações marcadas como lidas");const v=document.getElementById("app-content");if(v){const b=await qa();v.innerHTML="",v.appendChild(b)}}catch(e){throw console.error("❌ Erro ao marcar todas as notificações como lidas:",e),e}}function aE(n){const e=document.createElement("div");e.className="notifications-sections";const t=n.filter(r=>!r.read),o=n.filter(r=>r.read);return t.length>0&&e.appendChild(Gd("Não Lidas",t,"unread")),o.length>0&&e.appendChild(Gd("Lidas",o,"read")),n.length===0&&e.appendChild(cE("Você não tem notificações no momento")),e}function Gd(n,e,t){const o=document.createElement("div");o.className="notifications-section";const r=t==="unread"?"🔔":"📬";return o.innerHTML=`
    <div class="section-header">
      <div class="section-title">
        <div class="section-icon">${r}</div>
        ${n} (${e.length})
      </div>
    </div>
    <div class="section-content">
      ${e.map(a=>sE(a)).join("")}
    </div>
  `,o}function sE(n,e){const t=!n.read,o=n.transactionTipo||"transação",r=n.transactionDescricao||"Transação",a=n.transactionCategoria||"Categoria",s=n.transactionValor||0,c=n.senderName||"Usuário",l=n.budgetName||"Orçamento";let d="Data não disponível";return n.createdAt&&(n.createdAt.toDate?d=n.createdAt.toDate().toLocaleString("pt-BR"):n.createdAt instanceof Date?d=n.createdAt.toLocaleString("pt-BR"):d=new Date(n.createdAt).toLocaleString("pt-BR")),`
    <div class="notification-card ${t?"unread":""}">
      <div class="notification-header">
        <div class="notification-icon">
          ${o==="receita"?"💰":"💸"}
        </div>
        <div class="notification-info">
          <div class="notification-title">
            Nova ${o} no orçamento "${l}"
            ${t?'<span class="notification-badge">Nova</span>':""}
          </div>
          <div class="notification-subtitle">
            ${c} adicionou uma ${o}
          </div>
        </div>
      </div>
      
      <div class="notification-content">
        <div class="notification-highlight">
          <div class="notification-transaction">
            <div class="transaction-info">
              <div class="transaction-title">${r}</div>
              <div class="transaction-category">${a}</div>
            </div>
            <div class="transaction-value ${o==="receita"?"positive":"negative"}">
              R$ ${parseFloat(s).toFixed(2)}
            </div>
          </div>
        </div>
      </div>
      
      <div class="notification-meta">
        <div class="notification-date">
          ${d}
        </div>
        ${t?`
          <div class="notification-actions">
            <button class="action-btn success" onclick="markNotificationAsRead('${n.id}')">
              ✔️ Marcar como lida
            </button>
          </div>
        `:""}
      </div>
    </div>
  `}function iE(){const n=document.createElement("div");return n.className="loading-state",n.innerHTML=`
    <div class="loading-spinner"></div>
    <span>Carregando notificações...</span>
  `,n}function cE(n){const e=document.createElement("div");return e.className="empty-state",e.innerHTML=`
    <div class="empty-icon">🔔</div>
    <div class="empty-title">Nenhuma Notificação</div>
    <div class="empty-description">${n}</div>
  `,e}function lE(n){const e=document.createElement("div");return e.className="empty-state",e.innerHTML=`
    <div class="empty-icon">❌</div>
    <div class="empty-title">Erro ao Carregar</div>
    <div class="empty-description">${n}</div>
    <button class="empty-btn" onclick="window.location.reload()">
      🔄 Tentar Novamente
    </button>
  `,e}window.renderCleanNotifications=qa;window.markNotificationAsRead=oE;window.markAllNotificationsAsRead=rE;function dE(){console.log("🔧 Criando FAB corrigido...");let n=!1,e=!1;const t=l(),o=d(),r=h(),a=g({id:"fab-transaction",text:"Nova Transação",icon:"💰",color:"var(--primary-color)",action:hE}),s=g({id:"fab-recorrente",text:"Nova Recorrente",icon:"🔄",color:"var(--secondary-color)",action:pE}),c=g({id:"fab-voice",text:"Voz",icon:"🎤",color:"var(--success-color)",action:gE});return r.appendChild(a),r.appendChild(s),r.appendChild(c),t.appendChild(r),t.appendChild(o),m(),console.log("✅ FAB corrigido criado com sucesso"),t;function l(){const T=document.createElement("div");return T.id="fab-container-main",T.className="fab-container-refactored",T.style.cssText=`
      position: fixed !important;
      bottom: 120px !important;
      right: 20px !important;
      z-index: 9999 !important;
      display: flex !important;
      flex-direction: column !important;
      align-items: flex-end !important;
      gap: 12px !important;
      pointer-events: auto !important;
      overflow: visible !important;
      visibility: visible !important;
      opacity: 1 !important;
      transform: none !important;
      max-width: 200px !important;
      max-height: none !important;
    `,T}function d(){const T=document.createElement("button");T.id="fab-main",T.innerHTML="+",T.type="button",T.setAttribute("aria-label","Abrir menu de ações"),T.style.cssText=`
      width: 64px !important;
      height: 64px !important;
      border-radius: 50% !important;
      background: linear-gradient(135deg, var(--primary-color), var(--secondary-color)) !important;
      color: white !important;
      border: none !important;
      font-size: 32px !important;
      font-weight: bold !important;
      cursor: pointer !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2) !important;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
      z-index: 10000 !important;
      min-width: 64px !important;
      min-height: 64px !important;
      touch-action: manipulation !important;
      -webkit-tap-highlight-color: transparent !important;
      user-select: none !important;
      outline: none !important;
      position: relative !important;
      transform: rotate(0deg) !important;
    `;const D=()=>{!n&&!e&&(T.style.transform="scale(1.1) rotate(0deg)",T.style.boxShadow="0 6px 20px rgba(0, 0, 0, 0.3)")},L=()=>{!n&&!e&&(T.style.transform="scale(1) rotate(0deg)",T.style.boxShadow="0 4px 12px rgba(0, 0, 0, 0.2)")};return T.addEventListener("mouseenter",D),T.addEventListener("mouseleave",L),T.addEventListener("touchstart",D),T.addEventListener("touchend",L),T}function h(){const T=document.createElement("div");return T.id="fab-actions",T.style.cssText=`
      display: none !important;
      flex-direction: column !important;
      gap: 12px !important;
      z-index: 9999 !important;
      margin-bottom: 12px !important;
      overflow: visible !important;
      opacity: 0 !important;
      transform: translateY(20px) !important;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
      visibility: hidden !important;
      position: relative !important;
      pointer-events: none !important;
      max-height: none !important;
      max-width: 200px !important;
    `,T}function g({id:T,text:D,icon:L,color:O,action:Q}){const J=document.createElement("button");J.id=T,J.innerHTML=`${L} ${D}`,J.type="button",J.setAttribute("aria-label",D),J.style.cssText=`
      background: linear-gradient(135deg, ${O}, ${uE(O,-20)}) !important;
      color: var(--text-white) !important;
      padding: 12px 16px !important;
      border-radius: var(--border-radius-lg) !important;
      border: none !important;
      font-size: var(--font-size-sm) !important;
      font-weight: 600 !important;
      cursor: pointer !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      gap: 8px !important;
      min-height: 48px !important;
      min-width: 140px !important;
      max-width: 160px !important;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2) !important;
      transition: all var(--transition-normal) !important;
      z-index: 10000 !important;
      white-space: nowrap !important;
      flex-shrink: 0 !important;
      touch-action: manipulation !important;
      -webkit-tap-highlight-color: transparent !important;
      user-select: none !important;
      outline: none !important;
      position: relative !important;
      transform: scale(1) !important;
    `;const ie=()=>{e||(J.style.transform="scale(1.05)",J.style.boxShadow="0 6px 20px rgba(0, 0, 0, 0.3)")},x=()=>{e||(J.style.transform="scale(1)",J.style.boxShadow="0 4px 12px rgba(0, 0, 0, 0.2)")};J.addEventListener("mouseenter",ie),J.addEventListener("mouseleave",x),J.addEventListener("touchstart",ie),J.addEventListener("touchend",x);const y=E=>{E.preventDefault(),E.stopPropagation(),console.log(`🔧 Botão ${T} clicado!`);let S=!1;try{Q&&(Q(),S=!0)}catch(I){console.error(`❌ Erro ao executar ação do botão ${T}:`,I),yn(`Erro ao executar ${D}`)}S&&b()};return J.addEventListener("click",y),J}function m(){const T=O=>{O.preventDefault(),O.stopPropagation(),f()};o.addEventListener("click",T);const D=O=>{!t.contains(O.target)&&n&&b()};document.addEventListener("click",D);const L=O=>{O.key==="Escape"&&n&&b()};document.addEventListener("keydown",L),t.addEventListener("click",O=>{O.stopPropagation()})}function f(){if(e){console.log("⚠️ FAB está animando, ignorando clique");return}e=!0,console.log("🔧 Alternando FAB:",n?"Fechando":"Abrindo"),n?b():v()}function v(){console.log("🔧 Abrindo FAB..."),r.style.display="flex",r.style.visibility="visible",r.style.pointerEvents="auto",r.style.opacity="0",r.style.transform="translateY(20px)",requestAnimationFrame(()=>{r.style.transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",r.style.opacity="1",r.style.transform="translateY(0)"}),o.style.transform="rotate(45deg)",n=!0,setTimeout(()=>{e=!1},300)}function b(){console.log("🔧 Fechando FAB..."),r.style.transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",r.style.opacity="0",r.style.transform="translateY(20px)",r.style.pointerEvents="none",o.style.transform="rotate(0deg)",n=!1,setTimeout(()=>{r.style.display="none",r.style.visibility="hidden",e=!1},300)}}function uE(n,e){if(n.startsWith("var(--primary-color)"))return"var(--secondary-color)";if(n.startsWith("var(--secondary-color)"))return"var(--primary-color)";if(n.startsWith("var(--success-color)"))return"var(--success-color)";if(n.startsWith("var("))return n;const t=n.replace("#",""),o=Math.max(0,Math.min(255,parseInt(t.substr(0,2),16)+e)),r=Math.max(0,Math.min(255,parseInt(t.substr(2,2),16)+e)),a=Math.max(0,Math.min(255,parseInt(t.substr(4,2),16)+e));return`#${o.toString(16).padStart(2,"0")}${r.toString(16).padStart(2,"0")}${a.toString(16).padStart(2,"0")}`}function hE(){if(console.log("🔧 Executando ação: Nova Transação"),typeof window.showAddTransactionModal=="function"){console.log("✅ Função showAddTransactionModal encontrada");try{return window.showAddTransactionModal(),!0}catch(n){return console.error("❌ Erro ao executar showAddTransactionModal:",n),yn("Erro ao abrir modal de transação"),!1}}else return console.warn("⚠️ Função showAddTransactionModal não disponível"),yn("Modal de transação não disponível. Tente recarregar a página."),!1}function pE(){if(console.log("🔧 Executando ação: Nova Recorrente"),typeof window.showAddRecorrenteModal=="function"){console.log("✅ Função showAddRecorrenteModal encontrada");try{return window.showAddRecorrenteModal(),!0}catch(n){return console.error("❌ Erro ao executar showAddRecorrenteModal:",n),yn("Erro ao abrir modal de recorrente"),!1}}else return console.warn("⚠️ Função showAddRecorrenteModal não disponível"),yn("Modal de recorrente não disponível. Tente recarregar a página."),!1}function gE(){if(console.log("🔧 Executando ação: Voz"),typeof window.openVoiceModal=="function"){console.log("✅ Função openVoiceModal encontrada");try{return window.openVoiceModal(),!0}catch(n){return console.error("❌ Erro ao executar openVoiceModal:",n),yn("Erro ao abrir modal de voz"),!1}}else return console.warn("⚠️ Função openVoiceModal não disponível"),yn("Funcionalidade de voz não disponível. Tente recarregar a página."),!1}function yn(n){if(console.error("❌ Erro no FAB:",n),window.Snackbar&&typeof window.Snackbar.show=="function")try{window.Snackbar.show(n,"error");return}catch(e){console.warn("⚠️ Erro ao usar Snackbar:",e)}window.alert?alert(n):console.error("Nenhum sistema de notificação disponível")}window.toggleFAB=function(){const n=document.getElementById("fab-container-main");if(n){const e=n.querySelector("#fab-main");e&&e.click()}};window.closeFAB=function(){const n=document.getElementById("fab-container-main");if(n){const e=n.querySelector("#fab-actions"),t=n.querySelector("#fab-main");e&&t&&(e.style.display="none",e.style.opacity="0",e.style.visibility="hidden",e.style.pointerEvents="none",t.style.transform="rotate(0deg)")}};window.openFAB=function(){const n=document.getElementById("fab-container-main");if(n){const e=n.querySelector("#fab-actions"),t=n.querySelector("#fab-main");e&&t&&(e.style.display="flex",e.style.visibility="visible",e.style.opacity="1",e.style.transform="translateY(0)",e.style.pointerEvents="auto",t.style.transform="rotate(45deg)")}};window.cleanupFAB=function(){};window.checkFABState=function(){const n=document.getElementById("fab-container-main"),e=document.getElementById("fab-actions"),t=document.getElementById("fab-main");if(console.log("🔍 Estado do FAB:"),console.log("  - Container:",!!n),console.log("  - Actions:",!!e),console.log("  - Main button:",!!t),n&&e&&t){const o=e.style.display,r=t.style.transform;console.log("  - Actions display:",o),console.log("  - Main transform:",r)}return{fabContainer:n,fabActions:e,fabMain:t}};async function mE(n){if(!confirm("Tem certeza que deseja excluir esta despesa recorrente?"))return;const e=window.appState?.currentUser;if(!e){B({message:"Usuário não autenticado.",type:"error"});return}await za(e.uid,n),B({message:"Recorrente excluída com sucesso.",type:"success"}),await window.loadRecorrentes(),ja()}function fE(n){const e=window.appState?.currentUser;if(!e){B({message:"Usuário não autenticado.",type:"error"});return}sc(e.uid,n.id,{ativa:!n.ativa}),B({message:"Status atualizado com sucesso.",type:"info"}),window.loadRecorrentes().then(ja)}window.handleDeleteRecorrente=mE;window.handleToggleRecorrente=fE;async function Rp(n){const e=window.appState?.currentUser;if(!e){B({message:"Usuário não autenticado.",type:"error"});return}const t=(window.appState.recorrentes||[]).find(s=>s.id===n),o=t?t.descricao:"",r=window.appState.currentBudget?.id;console.log("🔍 Iniciando busca de histórico para:",{recorrenteId:n,descricao:o,budgetId:r,userId:e.uid});const a=Qt({title:`Histórico de ${o}`,content:`<div class='flex flex-col items-center py-8'>
      <div class='loader mb-4'></div>
      <div>Carregando histórico...</div>
      <button onclick='closeModal()' class='mt-6 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600'>Fechar</button>
    </div>`});document.body.appendChild(a);try{const{collection:s,getDocs:c,query:l,where:d}=await pe(async()=>{const{collection:x,getDocs:y,query:E,where:S}=await Promise.resolve().then(()=>Ne);return{collection:x,getDocs:y,query:E,where:S}},void 0),{db:h}=await pe(async()=>{const{db:x}=await Promise.resolve().then(()=>co);return{db:x}},void 0);let g=[];console.log("🔍 Buscando transações na coleção principal...");const m=s(h,"transactions"),v=(await c(l(m,d("userId","==",e.uid),d("recorrenteId","==",n)))).docs.map(x=>({...x.data(),id:x.id,origem:"principal"}));console.log("📊 Transações encontradas na coleção principal:",v.length),v.forEach(x=>{console.log("  -",x.descricao,"R$",x.valor,"BudgetId:",x.budgetId,"ID:",x.id)});const T=(window.appState.transactions||[]).filter(x=>x.recorrenteId===n);if(console.log("🔍 Transações no appState com este recorrenteId:",T.length),T.forEach(x=>{console.log("  - AppState:",x.descricao,"R$",x.valor,"BudgetId:",x.budgetId,"ID:",x.id)}),g=g.concat(v),o){console.log("🔍 Buscando transações por descrição:",o);const y=(await c(l(m,d("userId","==",e.uid),d("descricao","==",o)))).docs.map(E=>({...E.data(),id:E.id,origem:"descricao"})).filter(E=>!E.recorrenteId||E.recorrenteId!==n);console.log("📊 Transações encontradas por descrição:",y.length),y.forEach(E=>{console.log("  -",E.descricao,"R$",E.valor,"RecorrenteId:",E.recorrenteId)}),g=g.concat(y)}console.log("🔍 Buscando no histórico mensal...");const D=new Date,L=D.getFullYear(),O=D.getMonth()+1;for(let x=2023;x<=L;x++){const y=x===L?O:12;for(let E=1;E<=y;E++){const S=String(E).padStart(2,"0"),I=s(h,"users",e.uid,"historico",`${x}-${S}`,"transacoes");try{const A=await c(l(I,d("recorrenteId","==",n)));if(!A.empty){console.log(`📊 Histórico ${x}-${S}:`,A.docs.length,"transações");const _=A.docs.map(Pe=>({...Pe.data(),id:Pe.id,origem:`historico-${x}-${S}`}));g=g.concat(_)}}catch(A){console.log(`⚠️ Erro ao buscar histórico ${x}-${S}:`,A.message)}}}if(g.length===0){console.log("🔍 Nenhuma transação encontrada no Firestore, buscando no appState...");const y=(window.appState.transactions||[]).filter(E=>E.recorrenteId===n||o&&E.descricao?.toLowerCase().includes(o.toLowerCase()));console.log("📊 Transações encontradas no appState:",y.length),y.forEach(E=>{console.log("  - AppState:",E.descricao,"R$",E.valor,"BudgetId:",E.budgetId,"ID:",E.id)}),g=y.map(E=>({...E,origem:"appState"}))}const Q=[],J=new Set;g.forEach(x=>{J.has(x.id)||(J.add(x.id),Q.push(x))}),g=Q,console.log("📊 Total de transações únicas encontradas:",g.length),g.sort((x,y)=>{const E=x.createdAt?.seconds?x.createdAt.seconds:0;return(y.createdAt?.seconds?y.createdAt.seconds:0)-E});const ie=a.querySelector(".modal-body");ie.innerHTML=`
      <div class='space-y-2'>
        <div class='text-xs text-gray-400 mb-4'>
          <div><b>Recorrente ID:</b> ${n}</div>
          <div><b>Budget ID:</b> ${r||"N/A"}</div>
          <div><b>Total encontrado:</b> ${g.length} transações</div>
        </div>
        ${g.length===0?`<div class='text-gray-500 p-4 bg-gray-50 rounded'>
                <p><b>Nenhuma aplicação encontrada.</b></p>
                <p class='text-sm mt-2'>Possíveis causas:</p>
                <ul class='text-sm mt-1 ml-4 list-disc'>
                  <li>A recorrente não foi efetivada neste mês</li>
                  <li>O orçamento selecionado é diferente</li>
                  <li>O campo recorrenteId está incorreto na transação</li>
                  <li>A transação foi salva em outro budgetId</li>
                </ul>
              </div>`:g.map(x=>`
                  <div class='flex justify-between items-center border-b pb-2 mb-2'>
                    <div class='flex-1'>
                      <div class='font-medium'>${x.descricao||"Sem descrição"}</div>
                      <div class='text-xs text-gray-500'>
                        ${x.createdAt?.seconds?new Date(x.createdAt.seconds*1e3).toLocaleDateString("pt-BR"):"Data não disponível"}
                        ${x.origem?` • ${x.origem}`:""}
                      </div>
                    </div>
                    <div class='text-right'>
                      <div class='font-bold ${x.tipo==="receita"?"text-green-600":"text-red-600"}'>
                        ${x.tipo==="receita"?"+":"-"}R$ ${parseFloat(x.valor||0).toFixed(2)}
                      </div>
                      <div class='text-xs text-gray-400'>ID: ${x.id||"-"}</div>
                    </div>
                  </div>
                `).join("")}
      </div>
      <div class='flex justify-center mt-6'>
        <button onclick='closeModal()' class='px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600'>Fechar</button>
      </div>
    `}catch(s){console.error("❌ Erro ao carregar histórico:",s),a.querySelector(".modal-body").innerHTML=`<div class='text-red-600 text-center mt-4'>
        <p><b>Erro ao carregar histórico.</b></p>
        <p class='text-sm mt-2'>${s.message||s}</p>
      </div>
      <div class='flex justify-center mt-6'>
        <button onclick='closeModal()' class='px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600'>Fechar</button>
      </div>`,B({message:"Erro ao carregar histórico: "+(s.message||s),type:"error"})}}window.showHistoricoRecorrente=Rp;function wE(n,e){try{const t=new Date,o=new Date(n),r=t.getMonth()>o.getMonth()?t.getFullYear():o.getFullYear(),a=t.getMonth()+(e<=t.getDate()?1:0);return new Date(r,a,e)}catch{return new Date}}function ja(){const n=window.appState?.currentUser,e=window.appState?.currentBudget,t=document.getElementById("app-content");if(t.innerHTML=`
    <div class="tab-container">
      <div class="tab-header">
        <h2 class="tab-title-highlight">Despesas Recorrentes</h2>
        <div class="flex flex-wrap gap-2">
          <!-- Botões de ação principais -->
          <div class="flex gap-1">
            <button onclick="window.verificarRecorrentes()" class="btn-secondary mobile-btn">
              <span class="icon-standard">🔍</span>
              <span class="hidden sm:inline">Verificar</span>
            </button>
            <button onclick="window.aplicarRecorrentes()" class="btn-primary mobile-btn">
              <span class="icon-standard">✅</span>
              <span class="hidden sm:inline">Aplicar</span>
            </button>
          </div>
          
          <!-- Botão de adicionar -->
          <button onclick="window.showAddRecorrenteModal()" class="btn-primary mobile-btn">
            <span class="icon-standard">➕</span>
            <span class="hidden sm:inline">Nova Recorrente</span>
          </button>
        </div>
      </div>
      <div class="tab-content">
        <div class="content-spacing">
          <div id="recorrentes-list" class="grid grid-cols-1 md:grid-cols-2 gap-4"></div>
        </div>
      </div>
    </div>
  `,!n||!e){document.getElementById("recorrentes-list").innerHTML='<p class="text-gray-500 dark:text-gray-300">Nenhum usuário ou orçamento ativo.</p>';return}const o=window.appState.recorrentes||[],r=window.appState.transactions||[],a=new Date,s=a.getFullYear(),c=a.getMonth()+1,l=r.filter(h=>{if(!h.recorrenteId)return!1;let g;if(h.createdAt&&typeof h.createdAt=="object"&&h.createdAt.seconds)g=new Date(h.createdAt.seconds*1e3);else if(h.createdAt)g=new Date(h.createdAt);else return!1;return g.getFullYear()===s&&g.getMonth()+1===c}).map(h=>h.recorrenteId),d=document.getElementById("recorrentes-list");if(!o.length){d.innerHTML='<p class="text-gray-500 dark:text-gray-300">Nenhuma despesa recorrente cadastrada.</p>';return}d.innerHTML="",o.forEach(h=>{const g=l.includes(h.id),f=wE(h.dataInicio,h.diaLancamento||1).toLocaleDateString("pt-BR"),v=window.calcularStatusRecorrente?window.calcularStatusRecorrente(h,r,s,c):{parcelaAtual:null,totalParcelas:h.parcelasTotal,foiEfetivadaEsteMes:g},b=document.createElement("div");b.className="card-standard";const T=parseFloat(h.valor),D=h.valorTotal?parseFloat(h.valorTotal):v.totalParcelas&&v.totalParcelas>1?T*v.totalParcelas:T;let L="";v.temParcelas?v.foiEfetivadaEsteMes?L=`✅ Efetivada: ${v.parcelaAtual} de ${v.totalParcelas}`:v.proximaParcela&&v.proximaParcela<=v.totalParcelas?L=`📅 Agendada: ${v.proximaParcela} de ${v.totalParcelas}`:L=`📊 Parcela ${v.parcelaAtual} de ${v.totalParcelas}`:L="♾️ Infinito",b.innerHTML=`
      <div class="flex items-center space-x-3 mb-3">
        <div class="w-4 h-4 rounded-full" style="background-color: ${h.cor||"#4F46E5"}"></div>
        <span class="list-item-title">${h.descricao}</span>
      </div>
      <p class="list-item-subtitle">Valor da parcela: R$ ${T.toFixed(2)}${v.totalParcelas&&v.totalParcelas>1?` | Total: R$ ${D.toFixed(2)}`:""}</p>
      <p class="list-item-subtitle">Categoria: ${h.categoriaId||"Sem categoria"}</p>
      <p class="list-item-subtitle font-semibold ${v.foiEfetivadaEsteMes?"text-green-600 dark:text-green-400":"text-blue-600 dark:text-blue-400"}">${L}</p>
      ${h.ativa!==!1&&!v.foiEfetivadaEsteMes?`<p class="text-sm text-green-500 mb-3">Próxima aplicação: ${f}</p>`:v.foiEfetivadaEsteMes?'<p class="text-sm text-blue-500 mb-3">✅ Efetivada este mês</p>':""}
      <div class="flex flex-wrap gap-2 mt-4">
        <!-- Botões principais em linha -->
        <div class="flex gap-1 flex-1">
          <button class="btn-secondary mobile-btn flex-1" onclick="window.showAddRecorrenteModal(${JSON.stringify(h).replace(/\"/g,"&quot;")})">
            <span class="icon-standard">✏️</span>
            <span class="hidden sm:inline">Editar</span>
          </button>
          <button class="btn-secondary mobile-btn flex-1" onclick='window.handleToggleRecorrente(${JSON.stringify(h).replace(/\"/g,"&quot;")})'>
            <span class="icon-standard">${h.ativa===!1?"▶️":"⏸️"}</span>
            <span class="hidden sm:inline">${h.ativa===!1?"Ativar":"Pausar"}</span>
          </button>
        </div>
        
        <!-- Botões secundários em linha -->
        <div class="flex gap-1 flex-1">
          <button class="btn-secondary mobile-btn flex-1" onclick="window.showHistoricoRecorrente('${h.id}')">
            <span class="icon-standard">📊</span>
            <span class="hidden sm:inline">Histórico</span>
          </button>
          <button class="btn-danger mobile-btn flex-1" onclick="window.handleDeleteRecorrente('${h.id}')">
            <span class="icon-standard">🗑️</span>
            <span class="hidden sm:inline">Excluir</span>
          </button>
        </div>
      </div>
    `,d.appendChild(b)})}async function vE(){const n=window.FirebaseAuth?.currentUser,e=document.getElementById("app-content");if(e.innerHTML='<h2 class="text-xl font-bold mb-4">Log de Aplicações Automáticas</h2>',!n){e.innerHTML+='<p class="text-gray-500">Usuário não autenticado.</p>';return}const t=new Date,o=t.getFullYear(),r=String(t.getMonth()+1).padStart(2,"0"),a=`${o}-${r}`,s=oe(q,"users",n.uid,"logs",a,"itens"),c=await he(s);if(c.empty){e.innerHTML+='<p class="text-gray-500">Nenhum log encontrado para este mês.</p>';return}const l=document.createElement("div");l.className="space-y-3",c.forEach(d=>{const h=d.data(),g=document.createElement("div");g.className="p-3 rounded-lg shadow bg-white dark:bg-gray-800 flex justify-between items-start",g.innerHTML=`
      <div>
        <p class="font-semibold">${h.descricao}</p>
        <p class="text-sm text-gray-500">R$ ${parseFloat(h.valor).toFixed(2)} • ${h.categoriaId||"Sem categoria"}</p>
        <p class="text-xs text-gray-400">Aplicado em: ${h.createdAt?.seconds?new Date(h.createdAt.seconds*1e3).toLocaleDateString():"-"}</p>
      </div>
    `,l.appendChild(g)}),e.appendChild(l)}async function yE(){const n=document.getElementById("app-content"),e=window.appState?.currentBudget,t=window.appState?.currentUser,o=window.appState?.budgets||[],r=o.find(l=>l.id===e?.id);let a=[];r?.usuariosPermitidos&&r.usuariosPermitidos.length>0&&(a=await Promise.all(r.usuariosPermitidos.map(async l=>{try{const d=await window.getUserInfo(l);return{uid:l,email:d.email||"Email não disponível",role:"Usuário Compartilhado"}}catch(d){return console.error("Erro ao buscar informações do usuário:",l,d),{uid:l,email:"Usuário não encontrado",role:"Usuário Compartilhado"}}})));let s=[];if(window.loadBudgetInvitations)try{console.log("🔍 SettingsPage: Carregando convites pendentes..."),s=await window.loadBudgetInvitations(),console.log("📊 SettingsPage: Convites carregados:",s.length)}catch(l){console.error("❌ SettingsPage: Erro ao carregar convites pendentes:",l)}else console.log("❌ SettingsPage: Função loadBudgetInvitations não encontrada");n.innerHTML=`
    <div class="tab-container">
      <div class="tab-header">
        <h2 class="tab-title-highlight">⚙️ Configurações</h2>
        <div class="flex items-center gap-2">
          <button onclick="window.showExportOptions && window.showExportOptions()" class="btn-secondary">
            <span class="icon-standard">📤</span>
            <span class="hidden sm:inline">Exportar</span>
          </button>
          <button id="theme-toggle-btn" class="btn-secondary">
            <span class="icon-standard">🎨</span>
            <span class="hidden sm:inline">Tema</span>
          </button>
        </div>
      </div>
      <div class="tab-content">
        <div class="content-spacing">
          <!-- Header -->
          <div class="text-center mb-8">
            <h2 class="text-2xl font-bold text-gray-800 dark:text-white mb-2">⚙️ Configurações</h2>
            <p class="text-gray-600 dark:text-gray-400">Gerencie suas preferências e dados</p>
          </div>

      <!-- Seção: Informações do Orçamento Atual -->
      ${e?`
      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 space-y-4">
        <div class="flex items-center gap-3 mb-4">
          <div class="w-8 h-8 bg-emerald-100 dark:bg-emerald-900 rounded-lg flex items-center justify-center">
            <span class="text-emerald-600 dark:text-emerald-400 text-lg">📋</span>
          </div>
          <h3 class="text-lg font-semibold text-gray-800 dark:text-white">Orçamento Atual</h3>
        </div>
        
        <div class="space-y-4">
          <!-- Nome do Orçamento -->
          <div class="p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700">
            <div class="flex items-center justify-between">
              <div>
                <div class="font-medium text-gray-800 dark:text-white">${e.nome||"Orçamento sem nome"}</div>
                <div class="text-sm text-gray-500 dark:text-gray-400">Nome do orçamento</div>
              </div>
              <span class="text-emerald-600 dark:text-emerald-400 text-lg">📝</span>
            </div>
          </div>

          <!-- ID do Orçamento -->
          <div class="p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700">
            <div class="flex items-center justify-between">
              <div class="flex-1">
                <div class="font-medium text-gray-800 dark:text-white text-sm break-all">${e.id}</div>
                <div class="text-sm text-gray-500 dark:text-gray-400">ID do orçamento</div>
              </div>
              <button onclick="copyBudgetId('${e.id}')" class="ml-3 px-3 py-1 bg-blue-500 text-white text-xs rounded-lg hover:bg-blue-600 transition-colors">
                📋 Copiar
              </button>
            </div>
          </div>

          <!-- Usuário Logado -->
          ${t?`
          <div class="p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700">
            <div class="flex items-center justify-between">
              <div>
                <div class="font-medium text-gray-800 dark:text-white">${t.email}</div>
                <div class="text-sm text-gray-500 dark:text-gray-400">Você (usuário logado)</div>
              </div>
              <span class="text-blue-600 dark:text-blue-400 text-lg">👤</span>
            </div>
          </div>
          `:""}

          <!-- Usuários com Acesso -->
          ${a.length>0?`
          <div class="p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700">
            <div class="mb-2">
              <div class="font-medium text-gray-800 dark:text-white">Usuários com Acesso</div>
              <div class="text-sm text-gray-500 dark:text-gray-400">${a.length} usuário(s) compartilhado(s)</div>
            </div>
            <div class="space-y-2">
              ${a.map(l=>`
                <div class="flex items-center justify-between p-2 bg-white dark:bg-gray-600 rounded-lg">
                  <div class="flex-1 min-w-0">
                    <div class="font-medium text-gray-800 dark:text-white text-sm truncate">${l.email}</div>
                    <div class="text-xs text-gray-500 dark:text-gray-400">${l.role}</div>
                  </div>
                  ${r?.userId===t?.uid?`
                    <button onclick="confirmRemoveUser('${e.id}', '${l.uid}', '${l.email}')" 
                            class="ml-2 px-2 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600 transition-colors flex-shrink-0">
                      🗑️ Remover
                    </button>
                  `:`
                    <span class="text-purple-600 dark:text-purple-400 text-sm flex-shrink-0">🔗</span>
                  `}
                </div>
              `).join("")}
            </div>
          </div>
          `:`
          <div class="p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700">
            <div class="flex items-center justify-between">
              <div>
                <div class="font-medium text-gray-800 dark:text-white">Orçamento Pessoal</div>
                <div class="text-sm text-gray-500 dark:text-gray-400">Apenas você tem acesso</div>
              </div>
              <span class="text-gray-600 dark:text-gray-400 text-lg">🔒</span>
            </div>
          </div>
          `}
        </div>
      </div>
      `:`
      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 space-y-4">
        <div class="flex items-center gap-3 mb-4">
          <div class="w-8 h-8 bg-yellow-100 dark:bg-yellow-900 rounded-lg flex items-center justify-center">
            <span class="text-yellow-600 dark:text-yellow-400 text-lg">⚠️</span>
          </div>
          <h3 class="text-lg font-semibold text-gray-800 dark:text-white">Nenhum Orçamento Selecionado</h3>
        </div>
        <p class="text-gray-600 dark:text-gray-400">Selecione um orçamento para ver suas informações.</p>
      </div>
      `}

      <!-- Seção: Meus Orçamentos -->
      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 space-y-4">
        <div class="flex items-center gap-3 mb-4">
          <div class="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
            <span class="text-blue-600 dark:text-blue-400 text-lg">📁</span>
          </div>
          <h3 class="text-lg font-semibold text-gray-800 dark:text-white">Meus Orçamentos</h3>
        </div>
        
        <div class="space-y-3">
          ${o.length>0?o.map(l=>{const d=l.userId===t?.uid,h=l.usuariosPermitidos&&l.usuariosPermitidos.length>0,g=l.id===e?.id;return`
            <div class="p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 hover:bg-blue-50 dark:hover:bg-gray-600 transition-all duration-200 ${g?"ring-2 ring-blue-500 bg-blue-50 dark:bg-blue-900/20":""}">
              <div class="flex items-center justify-between">
                <div class="flex-1">
                  <div class="flex items-center gap-3">
                    <div class="font-medium text-gray-800 dark:text-white">${l.nome||"Orçamento sem nome"}</div>
                    ${g?'<span class="px-2 py-1 bg-blue-500 text-white text-xs rounded-full">Atual</span>':""}
                    ${d?'<span class="px-2 py-1 bg-green-500 text-white text-xs rounded-full">Dono</span>':""}
                    ${!d&&h?'<span class="px-2 py-1 bg-purple-500 text-white text-xs rounded-full">Compartilhado</span>':""}
                  </div>
                  <div class="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    ${h?`${d?"Compartilhado com":"Compartilhado por"} ${l.usuariosPermitidos.length} usuário(s)`:"Orçamento pessoal"}
                  </div>
                  <div class="text-xs text-gray-400 dark:text-gray-500 mt-1 break-all">ID: ${l.id}</div>
                </div>
                <div class="flex items-center gap-2">
                  ${g?"":`
                    <button onclick="switchToBudget('${l.id}')" class="px-3 py-1 bg-green-500 text-white text-xs rounded-lg hover:bg-green-600 transition-colors">
                      Entrar
                    </button>
                  `}
                  ${!d&&h?`
                    <button onclick="confirmLeaveBudget('${l.id}', '${l.nome||"Orçamento"}')" 
                            class="px-3 py-1 bg-red-500 text-white text-xs rounded-lg hover:bg-red-600 transition-colors">
                      🚪 Sair
                    </button>
                  `:""}
                  ${d?`
                    <div class="relative inline-block">
                      <button onclick="toggleResetDropdown('${l.id}')" 
                              class="px-3 py-1 bg-orange-500 text-white text-xs rounded-lg hover:bg-orange-600 transition-colors flex items-center gap-1">
                        🔄 Reset <span class="text-xs">▼</span>
                      </button>
                      <div id="reset-dropdown-${l.id}" class="hidden absolute right-0 mt-1 w-52 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50">
                         <button onclick="confirmResetTransactions('${l.id}', '${l.nome||"Orçamento"}')" 
                                 class="w-full text-left px-3 py-2 text-xs text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-t-lg">
                           📊 Apenas Transações
                         </button>
                         <button onclick="confirmResetCategories('${l.id}', '${l.nome||"Orçamento"}')" 
                                 class="w-full text-left px-3 py-2 text-xs text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                           🏷️ Apenas Categorias
                         </button>
                         <button onclick="confirmResetBudget('${l.id}', '${l.nome||"Orçamento"}')" 
                                 class="w-full text-left px-3 py-2 text-xs text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-b-lg">
                           🔄 Tudo (Transações + Recorrentes)
                         </button>
                       </div>
                    </div>
                    <button onclick="confirmDeleteBudget('${l.id}', '${l.nome||"Orçamento"}')" 
                            class="px-3 py-1 bg-red-600 text-white text-xs rounded-lg hover:bg-red-700 transition-colors">
                      🗑️ Excluir
                    </button>
                  `:""}
                  <button onclick="copyBudgetId('${l.id}')" class="px-2 py-1 bg-gray-500 text-white text-xs rounded-lg hover:bg-gray-600 transition-colors">
                    📋
                  </button>
                </div>
              </div>
            </div>
          `}).join(""):`
            <div class="p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700">
              <div class="text-center">
                <div class="text-gray-500 dark:text-gray-400 mb-2">📁</div>
                <div class="font-medium text-gray-800 dark:text-white">Nenhum orçamento encontrado</div>
                <div class="text-sm text-gray-500 dark:text-gray-400">Crie seu primeiro orçamento</div>
              </div>
            </div>
          `}
        </div>
      </div>

      <!-- Seção: Orçamentos Compartilhados -->
      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 space-y-4">
        <div class="flex items-center gap-3 mb-4">
          <div class="w-8 h-8 bg-indigo-100 dark:bg-indigo-900 rounded-lg flex items-center justify-center">
            <span class="text-indigo-600 dark:text-indigo-400 text-lg">🤝</span>
          </div>
          <h3 class="text-lg font-semibold text-gray-800 dark:text-white">Orçamentos Compartilhados</h3>
        </div>
        
        <div class="space-y-3">
          <button class="w-full text-left p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 hover:bg-indigo-50 dark:hover:bg-gray-600 transition-all duration-200 active:scale-95 flex items-center justify-between group"
                  onclick="window.showAddBudgetModal && window.showAddBudgetModal()">
            <div class="flex items-center gap-3">
              <span class="text-xl">➕</span>
              <div>
                <div class="font-medium text-gray-800 dark:text-white">Criar Novo Orçamento</div>
                <div class="text-sm text-gray-500 dark:text-gray-400">Criar um novo orçamento pessoal ou compartilhado</div>
              </div>
            </div>
            <span class="text-gray-400 group-hover:text-indigo-500 transition-colors">→</span>
          </button>
          
          <button class="w-full text-left p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 hover:bg-indigo-50 dark:hover:bg-gray-600 transition-all duration-200 active:scale-95 flex items-center justify-between group"
                  onclick="window.compartilharOrcamento && window.compartilharOrcamento()">
            <div class="flex items-center gap-3">
              <span class="text-xl">🔗</span>
              <div>
                <div class="font-medium text-gray-800 dark:text-white">Compartilhar Orçamento</div>
                <div class="text-sm text-gray-500 dark:text-gray-400">Compartilhar orçamento atual com outros usuários</div>
              </div>
            </div>
            <span class="text-gray-400 group-hover:text-indigo-500 transition-colors">→</span>
          </button>
          
          <button class="w-full text-left p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 hover:bg-indigo-50 dark:hover:bg-gray-600 transition-all duration-200 active:scale-95 flex items-center justify-between group"
                  onclick="window.selectSharedBudget && window.selectSharedBudget()">
            <div class="flex items-center gap-3">
              <span class="text-xl">🔐</span>
              <div>
                <div class="font-medium text-gray-800 dark:text-white">Entrar em Orçamento Compartilhado</div>
                <div class="text-sm text-gray-500 dark:text-gray-400">Acessar orçamento compartilhado por ID</div>
              </div>
            </div>
            <span class="text-gray-400 group-hover:text-indigo-500 transition-colors">→</span>
          </button>
        </div>
      </div>

      <!-- Seção: Convites Pendentes -->
      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 space-y-4">
        <div class="flex items-center gap-3 mb-4">
          <div class="w-8 h-8 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center">
            <span class="text-orange-600 dark:text-orange-400 text-lg">📨</span>
          </div>
          <h3 class="text-lg font-semibold text-gray-800 dark:text-white">Convites Pendentes</h3>
        </div>
        
        <div id="pending-invitations-container" class="space-y-3">
          ${s.length>0?s.map(l=>`
            <div class="p-4 rounded-xl border border-orange-200 dark:border-orange-700 bg-orange-50 dark:bg-orange-900/20">
              <div class="flex items-start justify-between">
                <div class="flex-1">
                  <div class="flex items-center gap-2 mb-2">
                    <span class="text-orange-600 dark:text-orange-400 text-lg">📨</span>
                    <h4 class="font-medium text-gray-800 dark:text-white">Convite para Orçamento</h4>
                  </div>
                  <div class="text-sm text-gray-600 dark:text-gray-300 mb-1">
                    <strong>Orçamento:</strong> ${l.budgetName||"Orçamento sem nome"}
                  </div>
                  <div class="text-sm text-gray-600 dark:text-gray-300 mb-1">
                    <strong>Convidado por:</strong> ${l.invitedByUserEmail||"Usuário desconhecido"}
                  </div>
                  <div class="text-xs text-gray-500 dark:text-gray-400">
                    ${l.createdAt?new Date(l.createdAt.toDate()).toLocaleString("pt-BR"):"Data não disponível"}
                  </div>
                </div>
                <div class="flex items-center gap-2 ml-4">
                  <button onclick="window.acceptBudgetInvitation && window.acceptBudgetInvitation('${l.id}')" 
                          class="px-3 py-1 bg-green-500 text-white text-xs rounded-lg hover:bg-green-600 transition-colors">
                    ✅ Aceitar
                  </button>
                  <button onclick="window.declineBudgetInvitation && window.declineBudgetInvitation('${l.id}')" 
                          class="px-3 py-1 bg-red-500 text-white text-xs rounded-lg hover:bg-red-600 transition-colors">
                    ❌ Recusar
                  </button>
                </div>
              </div>
            </div>
          `).join(""):`
            <div class="p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700">
              <div class="text-center">
                <div class="text-gray-500 dark:text-gray-400 mb-2">📨</div>
                <div class="font-medium text-gray-800 dark:text-white">Nenhum convite pendente</div>
                <div class="text-sm text-gray-500 dark:text-gray-400">Você não tem convites para orçamentos aguardando resposta</div>
              </div>
            </div>
          `}
        </div>
      </div>

      <!-- Seção: Dados e Exportação -->
      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 space-y-4">
        <div class="flex items-center gap-3 mb-4">
          <div class="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
            <span class="text-blue-600 dark:text-blue-400 text-lg">📊</span>
          </div>
          <h3 class="text-lg font-semibold text-gray-800 dark:text-white">Dados e Exportação</h3>
        </div>
        
        <div class="space-y-3">
          <button class="w-full text-left p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 hover:bg-blue-50 dark:hover:bg-gray-600 transition-all duration-200 active:scale-95 flex items-center justify-between group"
            onclick="window.showExportOptions && window.showExportOptions()">
            <div class="flex items-center gap-3">
              <span class="text-xl">📤</span>
              <div>
                <div class="font-medium text-gray-800 dark:text-white">Exportar Dados</div>
                <div class="text-sm text-gray-500 dark:text-gray-400">Baixar relatórios em PDF/Excel</div>
              </div>
            </div>
            <span class="text-gray-400 group-hover:text-blue-500 transition-colors">→</span>
          </button>
          
          <button class="w-full text-left p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 hover:bg-green-50 dark:hover:bg-gray-600 transition-all duration-200 active:scale-95 flex items-center justify-between group"
            onclick="window.restoreBackup && window.restoreBackup()">
            <div class="flex items-center gap-3">
              <span class="text-xl">📥</span>
              <div>
                <div class="font-medium text-gray-800 dark:text-white">Restaurar Backup</div>
                <div class="text-sm text-gray-500 dark:text-gray-400">Importar dados de um arquivo JSON</div>
              </div>
            </div>
            <span class="text-gray-400 group-hover:text-green-500 transition-colors">→</span>
          </button>
          
          <button class="w-full text-left p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 hover:bg-blue-50 dark:hover:bg-gray-600 transition-all duration-200 active:scale-95 flex items-center justify-between group"
            onclick="window.downloadBackup && window.downloadBackup()">
            <div class="flex items-center gap-3">
              <span class="text-xl">💾</span>
              <div>
                <div class="font-medium text-gray-800 dark:text-white">Backup JSON</div>
                <div class="text-sm text-gray-500 dark:text-gray-400">Exportar todos os dados em JSON</div>
              </div>
            </div>
            <span class="text-gray-400 group-hover:text-blue-500 transition-colors">→</span>
          </button>
          
          <button class="w-full text-left p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 hover:bg-green-50 dark:hover:bg-gray-600 transition-all duration-200 active:scale-95 flex items-center justify-between group"
            onclick="window.exportToExcel && window.exportToExcel()">
            <div class="flex items-center gap-3">
              <span class="text-xl">📊</span>
              <div>
                <div class="font-medium text-gray-800 dark:text-white">Exportar Excel</div>
                <div class="text-sm text-gray-500 dark:text-gray-400">Relatório em planilha Excel</div>
              </div>
            </div>
            <span class="text-gray-400 group-hover:text-green-500 transition-colors">→</span>
          </button>
          
          <button class="w-full text-left p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 hover:bg-red-50 dark:hover:bg-gray-600 transition-all duration-200 active:scale-95 flex items-center justify-between group"
            onclick="window.exportToPDF && window.exportToPDF()">
            <div class="flex items-center gap-3">
              <span class="text-xl">📄</span>
              <div>
                <div class="font-medium text-gray-800 dark:text-white">Exportar PDF</div>
                <div class="text-sm text-gray-500 dark:text-gray-400">Relatório em documento PDF</div>
              </div>
            </div>
            <span class="text-gray-400 group-hover:text-red-500 transition-colors">→</span>
          </button>
          
          <button class="w-full text-left p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 hover:bg-blue-50 dark:hover:bg-gray-600 transition-all duration-200 active:scale-95 flex items-center justify-between group"
            onclick="window.exportReadmePDF && window.exportReadmePDF()">
            <div class="flex items-center gap-3">
              <span class="text-xl">📖</span>
              <div>
                <div class="font-medium text-gray-800 dark:text-white">Guia de Uso (PDF)</div>
                <div class="text-sm text-gray-500 dark:text-gray-400">Manual completo do aplicativo</div>
              </div>
            </div>
            <span class="text-gray-400 group-hover:text-blue-500 transition-colors">→</span>
          </button>
          
          <button class="w-full text-left p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 hover:bg-blue-50 dark:hover:bg-gray-600 transition-all duration-200 active:scale-95 flex items-center justify-between group"
            onclick="window.renderLogAplicacoes && window.renderLogAplicacoes()">
            <div class="flex items-center gap-3">
              <span class="text-xl">📆</span>
              <div>
                <div class="font-medium text-gray-800 dark:text-white">Log de Aplicações</div>
                <div class="text-sm text-gray-500 dark:text-gray-400">Histórico de recorrentes aplicadas</div>
              </div>
            </div>
            <span class="text-gray-400 group-hover:text-blue-500 transition-colors">→</span>
          </button>
        </div>
      </div>

      <!-- Seção: Notificações -->
      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 space-y-4">
        <div class="flex items-center gap-3 mb-4">
          <div class="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
            <span class="text-blue-600 dark:text-blue-400 text-lg">🔔</span>
          </div>
          <h3 class="text-lg font-semibold text-gray-800 dark:text-white">Notificações</h3>
        </div>
        
        <div class="space-y-3">
          <button id="notification-toggle-btn" class="w-full text-left p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 hover:bg-blue-50 dark:hover:bg-gray-600 transition-all duration-200 active:scale-95 flex items-center justify-between group">
            <div class="flex items-center gap-3">
              <span id="notification-icon" class="text-xl">🔕</span>
              <div>
                <div class="font-medium text-gray-800 dark:text-white">Ativar Notificações</div>
                <div class="text-sm text-gray-500 dark:text-gray-400">Receber alertas importantes</div>
              </div>
            </div>
            <span class="text-gray-400 group-hover:text-blue-500 transition-colors">→</span>
          </button>
          
          <button onclick="window.testNotification && window.testNotification()" class="w-full text-left p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 hover:bg-green-50 dark:hover:bg-gray-600 transition-all duration-200 active:scale-95 flex items-center justify-between group">
            <div class="flex items-center gap-3">
              <span class="text-xl">🔔</span>
              <div>
                <div class="font-medium text-gray-800 dark:text-white">Testar Notificação</div>
                <div class="text-sm text-gray-500 dark:text-gray-400">Enviar notificação de teste</div>
              </div>
            </div>
            <span class="text-gray-400 group-hover:text-green-500 transition-colors">→</span>
          </button>
          
          <div id="notification-status" class="p-3 rounded-lg bg-gray-100 dark:bg-gray-700 text-sm text-gray-600 dark:text-gray-300 hidden">
            <div class="flex items-center gap-2">
              <span class="text-green-500">✓</span>
              <span>Notificações ativadas</span>
            </div>
            <div class="mt-2 text-xs">
              Você receberá alertas sobre:
              <ul class="list-disc list-inside mt-1 space-y-1">
                <li>Recorrentes pendentes</li>
                <li>Limites de categoria</li>
                <li>Lembretes mensais</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <!-- Seção: Aplicativo -->
      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 space-y-4">
        <div class="flex items-center gap-3 mb-4">
          <div class="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
            <span class="text-green-600 dark:text-green-400 text-lg">📱</span>
          </div>
          <h3 class="text-lg font-semibold text-gray-800 dark:text-white">Aplicativo</h3>
        </div>
        
        <div class="space-y-3">
          <button id="install-app-btn" class="w-full text-left p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 hover:bg-green-50 dark:hover:bg-gray-600 transition-all duration-200 active:scale-95 flex items-center justify-between group"
                  onclick="window.installPWA()">
            <div class="flex items-center gap-3">
              <span class="text-xl">⬇️</span>
              <div>
                <div class="font-medium text-gray-800 dark:text-white">Instalar App</div>
                <div class="text-sm text-gray-500 dark:text-gray-400">Baixar para a tela inicial</div>
              </div>
            </div>
            <span class="text-gray-400 group-hover:text-green-500 transition-colors">→</span>
    </button>
          
          <button class="w-full text-left p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 hover:bg-green-50 dark:hover:bg-gray-600 transition-all duration-200 active:scale-95 flex items-center justify-between group"
                  onclick="window.showBiometricSetup && window.showBiometricSetup()">
            <div class="flex items-center gap-3">
              <span class="text-xl">🔐</span>
              <div>
                <div class="font-medium text-gray-800 dark:text-white">Autenticação Biométrica</div>
                <div class="text-sm text-gray-500 dark:text-gray-400">Configurar impressão digital/face</div>
              </div>
            </div>
            <span class="text-gray-400 group-hover:text-green-500 transition-colors">→</span>
    </button>
        </div>
      </div>

      <!-- Seção: Conta -->
      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 space-y-4">
        <div class="flex items-center gap-3 mb-4">
          <div class="w-8 h-8 bg-red-100 dark:bg-red-900 rounded-lg flex items-center justify-center">
            <span class="text-red-600 dark:text-red-400 text-lg">👤</span>
          </div>
          <h3 class="text-lg font-semibold text-gray-800 dark:text-white">Conta</h3>
        </div>
        
        <div class="space-y-3">
          <button class="w-full text-left p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 hover:bg-red-50 dark:hover:bg-gray-600 transition-all duration-200 active:scale-95 flex items-center justify-between group"
                  onclick="confirmLogout()">
            <div class="flex items-center gap-3">
              <span class="text-xl">🚪</span>
              <div>
                <div class="font-medium text-gray-800 dark:text-white">Sair da Conta</div>
                <div class="text-sm text-gray-500 dark:text-gray-400">Fazer logout do aplicativo</div>
              </div>
            </div>
            <span class="text-gray-400 group-hover:text-red-500 transition-colors">→</span>
    </button>
        </div>
      </div>

      <!-- Informações do App -->
      <div class="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-2xl p-6 text-center">
        <div class="text-4xl mb-3">📱</div>
        <h3 class="text-lg font-semibold text-gray-800 dark:text-white mb-2">Servo Tech Finanças</h3>
        <p class="text-sm text-gray-600 dark:text-gray-400 mb-3">Versão 4.1.0</p>
        <div class="text-xs text-gray-500 dark:text-gray-500">
          © 2025 • Fundador: Igor Bispo
        </div>
      </div>
    </div>
  `,window.confirmLogout=()=>{if(confirm("Tem certeza que deseja sair da conta?"))try{typeof window.stopAllListeners=="function"&&window.stopAllListeners(),window.appState&&(window.appState.currentUser=null,window.appState.currentBudget=null,window.appState.transactions=[],window.appState.categories=[],window.appState.budgets=[],window.appState.recorrentes=[]),window.FirebaseAuth.signOut().then(()=>{console.log("✅ Logout realizado com sucesso"),window.toggleLoginPage&&window.toggleLoginPage(!0),setTimeout(()=>{window.location.hash=""},100),console.log("✅ Redirecionado para página de login")}).catch(l=>{console.error("❌ Erro ao fazer logout:",l),window.Snackbar?window.Snackbar({message:"Erro ao fazer logout. Tente novamente.",type:"error"}):alert("Erro ao fazer logout. Tente novamente.")})}catch(l){console.error("❌ Erro ao preparar logout:",l),window.Snackbar?window.Snackbar({message:"Erro ao preparar logout. Tente novamente.",type:"error"}):alert("Erro ao preparar logout. Tente novamente.")}},window.copyBudgetId=l=>{navigator.clipboard.writeText(l).then(()=>{window.Snackbar?window.Snackbar({message:"ID do orçamento copiado para a área de transferência!",type:"success"}):alert("ID do orçamento copiado para a área de transferência!")}).catch(d=>{console.error("Erro ao copiar ID:",d);const h=document.createElement("textarea");h.value=l,document.body.appendChild(h),h.select(),document.execCommand("copy"),document.body.removeChild(h),window.Snackbar?window.Snackbar({message:"ID do orçamento copiado para a área de transferência!",type:"success"}):alert("ID do orçamento copiado para a área de transferência!")})},window.switchToBudget=async l=>{try{const d=o.find(f=>f.id===l);if(!d){window.Snackbar?window.Snackbar({message:"Orçamento não encontrado.",type:"error"}):alert("Orçamento não encontrado.");return}const h=window.appState?.currentUser;if(!h){window.Snackbar?window.Snackbar({message:"Você precisa estar logado para trocar de orçamento.",type:"error"}):alert("Você precisa estar logado para trocar de orçamento.");return}const g=d.userId===h.uid,m=d.usuariosPermitidos&&d.usuariosPermitidos.includes(h.uid);if(console.log("🔍 Debug switchToBudget:",{budgetId:l,budgetName:d.nome,currentUserUid:h.uid,budgetUserId:d.userId,isOwner:g,usuariosPermitidos:d.usuariosPermitidos,hasSharedAccess:m}),!g&&!m){window.Snackbar?window.Snackbar({message:"Você não tem acesso a este orçamento.",type:"error"}):alert("Você não tem acesso a este orçamento.");return}window.setCurrentBudget?(await window.setCurrentBudget(d),window.Snackbar?window.Snackbar({message:`Orçamento "${d.nome}" selecionado com sucesso!`,type:"success"}):alert(`Orçamento "${d.nome}" selecionado com sucesso!`),setTimeout(async()=>{console.log("🔄 Navegando para dashboard após troca de orçamento..."),window.router&&window.router("/dashboard"),window.refreshCurrentView&&window.refreshCurrentView(),window.SwipeNavigation&&window.SwipeNavigation.updateCurrentTabIndex&&window.SwipeNavigation.updateCurrentTabIndex("/dashboard"),console.log("✅ Navegação para dashboard concluída!")},1500)):window.Snackbar?window.Snackbar({message:"Erro ao trocar de orçamento.",type:"error"}):alert("Erro ao trocar de orçamento.")}catch(d){console.error("Erro ao trocar de orçamento:",d),window.Snackbar?window.Snackbar({message:"Erro ao trocar de orçamento.",type:"error"}):alert("Erro ao trocar de orçamento.")}},setTimeout(()=>{typeof window.updateInstallButton=="function"&&window.updateInstallButton()},100),setTimeout(()=>{typeof window.setupNotifications=="function"&&window.setupNotifications()},200);const c=document.createElement("div");c.innerHTML=`
    <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 space-y-4">
      <div class="flex items-center gap-3 mb-4">
        <div class="w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
          <span class="text-purple-600 dark:text-purple-400 text-lg">🎨</span>
        </div>
        <h3 class="text-lg font-semibold text-gray-800 dark:text-white">Personalização</h3>
      </div>
      
      <div class="space-y-4">
        <!-- Alertas Personalizados -->
        <div class="p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700">
          <div class="flex items-center justify-between mb-3">
            <div>
              <div class="font-medium text-gray-800 dark:text-white">⚠️ Alertas de Limite</div>
              <div class="text-sm text-gray-500 dark:text-gray-400">Configurar quando receber alertas</div>
            </div>
          </div>
          <div class="space-y-2">
            <label class="flex items-center gap-2">
              <input type="radio" name="alerta-limite" value="70" checked class="text-purple-600">
              <span class="text-sm">70% do limite (Recomendado)</span>
            </label>
            <label class="flex items-center gap-2">
              <input type="radio" name="alerta-limite" value="80" class="text-purple-600">
              <span class="text-sm">80% do limite</span>
            </label>
            <label class="flex items-center gap-2">
              <input type="radio" name="alerta-limite" value="90" class="text-purple-600">
              <span class="text-sm">90% do limite</span>
            </label>
          </div>
        </div>

        <!-- Cores Personalizadas -->
        <div class="p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700">
          <div class="flex items-center justify-between mb-3">
            <div>
              <div class="font-medium text-gray-800 dark:text-white">🎨 Tema de Cores</div>
              <div class="text-sm text-gray-500 dark:text-gray-400">Escolher cores preferidas</div>
            </div>
          </div>
          <div class="grid grid-cols-4 gap-2">
            <button class="w-8 h-8 bg-blue-500 rounded-full border-2 border-white shadow-md" onclick="setThemeColor('blue')"></button>
            <button class="w-8 h-8 bg-green-500 rounded-full border-2 border-white shadow-md" onclick="setThemeColor('green')"></button>
            <button class="w-8 h-8 bg-purple-500 rounded-full border-2 border-white shadow-md" onclick="setThemeColor('purple')"></button>
            <button class="w-8 h-8 bg-orange-500 rounded-full border-2 border-white shadow-md" onclick="setThemeColor('orange')"></button>
          </div>
        </div>

        <!-- Widgets Personalizáveis -->
        <div class="p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700">
          <div class="flex items-center justify-between mb-3">
            <div>
              <div class="font-medium text-gray-800 dark:text-white">📱 Widgets do Dashboard</div>
              <div class="text-sm text-gray-500 dark:text-gray-400">Mostrar apenas o que importa</div>
            </div>
          </div>
          <div class="space-y-2">
            <label class="flex items-center gap-2">
              <input type="checkbox" data-widget="summary" checked class="text-purple-600">
              <span class="text-sm">Card de resumo rápido</span>
            </label>
            <label class="flex items-center gap-2">
              <input type="checkbox" data-widget="chart" checked class="text-purple-600">
              <span class="text-sm">Gráfico de categorias</span>
            </label>
            <label class="flex items-center gap-2">
              <input type="checkbox" data-widget="progress" checked class="text-purple-600">
              <span class="text-sm">Barras de progresso</span>
            </label>
            <label class="flex items-center gap-2">
              <input type="checkbox" data-widget="tips" class="text-purple-600">
              <span class="text-sm">Dicas personalizadas</span>
            </label>
          </div>
        </div>

        <!-- Notificações Inteligentes -->
        <div class="p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700">
          <div class="flex items-center justify-between mb-3">
            <div>
              <div class="font-medium text-gray-800 dark:text-white">🔔 Notificações Inteligentes</div>
              <div class="text-sm text-gray-500 dark:text-gray-400">Configurar horários preferidos</div>
            </div>
          </div>
          <div class="space-y-2">
            <label class="flex items-center gap-2">
              <input type="checkbox" data-notification="limitAlerts" checked class="text-purple-600">
              <span class="text-sm">Alertas de limite</span>
            </label>
            <label class="flex items-center gap-2">
              <input type="checkbox" data-notification="recurringReminders" class="text-purple-600">
              <span class="text-sm">Lembretes de recorrentes</span>
            </label>
            <label class="flex items-center gap-2">
              <input type="checkbox" data-notification="weeklySummary" class="text-purple-600">
              <span class="text-sm">Resumo semanal</span>
            </label>
            <label class="flex items-center gap-2">
              <input type="checkbox" data-notification="financialTips" class="text-purple-600">
              <span class="text-sm">Dicas financeiras</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  `,n.appendChild(c),window.setThemeColor=function(l,d=!0){localStorage.setItem("themeColor",l),document.documentElement.setAttribute("data-theme-color",l);const h=document.documentElement,g={blue:{primary:"#3B82F6",secondary:"#1E40AF",accent:"#DBEAFE"},green:{primary:"#10B981",secondary:"#059669",accent:"#D1FAE5"},purple:{primary:"#8B5CF6",secondary:"#7C3AED",accent:"#EDE9FE"},orange:{primary:"#F59E0B",secondary:"#D97706",accent:"#FEF3C7"}};g[l]&&(h.style.setProperty("--primary-color",g[l].primary),h.style.setProperty("--secondary-color",g[l].secondary),h.style.setProperty("--accent-color",g[l].accent)),d&&window.Snackbar&&window.Snackbar({message:`Tema ${l} aplicado com sucesso!`,type:"success"})},window.loadUserSettings=function(){if(window.loadUserSettings.isLoading)return;window.loadUserSettings.isLoading=!0;const l={alertThreshold:localStorage.getItem("alertThreshold")||"70",themeColor:localStorage.getItem("themeColor")||"blue",dashboardWidgets:JSON.parse(localStorage.getItem("dashboardWidgets")||'{"summary": true, "chart": true, "progress": true, "tips": false}'),smartNotifications:JSON.parse(localStorage.getItem("smartNotifications")||'{"limitAlerts": true, "recurringReminders": false, "weeklySummary": false, "financialTips": false}')},d=document.querySelector(`input[name="alerta-limite"][value="${l.alertThreshold}"]`);return d&&(d.checked=!0),window.setThemeColor(l.themeColor,!1),Object.keys(l.dashboardWidgets).forEach(h=>{const g=document.querySelector(`input[data-widget="${h}"]`);g&&(g.checked=l.dashboardWidgets[h])}),Object.keys(l.smartNotifications).forEach(h=>{const g=document.querySelector(`input[data-notification="${h}"]`);g&&(g.checked=l.smartNotifications[h])}),setTimeout(()=>{window.loadUserSettings.isLoading=!1},100),l},window.saveUserSettings=function(){const l=document.querySelector('input[name="alerta-limite"]:checked'),d=l?l.value:"70",h=localStorage.getItem("themeColor")||"blue",g=document.querySelector('input[data-widget="summary"]'),m=document.querySelector('input[data-widget="chart"]'),f=document.querySelector('input[data-widget="progress"]'),v=document.querySelector('input[data-widget="tips"]'),b={summary:g?g.checked:!1,chart:m?m.checked:!1,progress:f?f.checked:!1,tips:v?v.checked:!1},T=document.querySelector('input[data-notification="limitAlerts"]'),D=document.querySelector('input[data-notification="recurringReminders"]'),L=document.querySelector('input[data-notification="weeklySummary"]'),O=document.querySelector('input[data-notification="financialTips"]'),Q={limitAlerts:T?T.checked:!1,recurringReminders:D?D.checked:!1,weeklySummary:L?L.checked:!1,financialTips:O?O.checked:!1};if(localStorage.setItem("alertThreshold",d),localStorage.setItem("themeColor",h),localStorage.setItem("dashboardWidgets",JSON.stringify(b)),localStorage.setItem("smartNotifications",JSON.stringify(Q)),window.appState?.currentUser){const J={userId:window.appState.currentUser.uid,alertThreshold:parseInt(d),themeColor:h,dashboardWidgets:b,smartNotifications:Q,updatedAt:new Date},ie=qe(q,"userSettings",window.appState.currentUser.uid);qh(ie,J,{merge:!0}).then(()=>{console.log("✅ Configurações salvas no Firestore"),window.Snackbar&&window.Snackbar({message:"Configurações salvas com sucesso!",type:"success"})}).catch(x=>{console.error("❌ Erro ao salvar configurações:",x)})}},window.setupNotificationButton=function(){const l=document.getElementById("notification-toggle-btn"),d=document.getElementById("notification-icon"),h=document.getElementById("notification-status");if(!l||!d||!h)return;const g=()=>{const m=Notification.permission,f=localStorage.getItem("notifications-enabled")==="true";m==="granted"&&f?(d.textContent="🔔",h.classList.remove("hidden")):(d.textContent="🔕",h.classList.add("hidden"))};l.onclick=async()=>{try{const m=Notification.permission;if(m==="denied"){window.Snackbar&&window.Snackbar({message:"Notificações foram negadas. Vá em Configurações do navegador para permitir.",type:"warning"});return}m==="default"?await Notification.requestPermission()==="granted"?(localStorage.setItem("notifications-enabled","true"),g(),window.Snackbar&&window.Snackbar({message:"✅ Notificações ativadas com sucesso!",type:"success"})):window.Snackbar&&window.Snackbar({message:"Permissão de notificação negada.",type:"error"}):m==="granted"&&(localStorage.getItem("notifications-enabled")==="true"?(localStorage.setItem("notifications-enabled","false"),window.Snackbar&&window.Snackbar({message:"Notificações desativadas",type:"info"})):(localStorage.setItem("notifications-enabled","true"),window.Snackbar&&window.Snackbar({message:"✅ Notificações ativadas!",type:"success"})),g())}catch(m){console.error("Erro ao configurar notificações:",m),window.Snackbar&&window.Snackbar({message:"Erro ao configurar notificações",type:"error"})}},g()},setTimeout(()=>{document.querySelectorAll('input[name="alerta-limite"]').forEach(l=>{l.addEventListener("change",window.saveUserSettings)}),document.querySelectorAll("input[data-widget]").forEach(l=>{l.addEventListener("change",window.saveUserSettings)}),document.querySelectorAll("input[data-notification]").forEach(l=>{l.addEventListener("change",window.saveUserSettings)}),window.setupNotificationButton(),window.loadUserSettings()},500),window.confirmLeaveBudget=function(l,d){confirm(`Tem certeza que deseja sair do orçamento "${d}"?

⚠️ Esta ação não pode ser desfeita e você perderá acesso a todos os dados deste orçamento.`)&&window.leaveSharedBudget(l).then(async()=>{await window.renderSettings()}).catch(h=>{console.error("Erro ao sair do orçamento:",h)})},window.confirmRemoveUser=function(l,d,h){confirm(`Tem certeza que deseja remover o usuário "${h}" do orçamento?

⚠️ Esta ação não pode ser desfeita e o usuário perderá acesso a todos os dados deste orçamento.`)&&window.removeUserFromBudget(l,d).then(async()=>{await window.renderSettings()}).catch(g=>{console.error("Erro ao remover usuário:",g)})},window.toggleResetDropdown=function(l){const d=document.getElementById(`reset-dropdown-${l}`);document.querySelectorAll('[id^="reset-dropdown-"]').forEach(g=>{g.id!==`reset-dropdown-${l}`&&g.classList.add("hidden")}),d.classList.toggle("hidden"),d.classList.contains("hidden")||setTimeout(()=>{const g=m=>{!d.contains(m.target)&&!m.target.closest(`[onclick*="toggleResetDropdown('${l}')"]`)&&(d.classList.add("hidden"),document.removeEventListener("click",g))};document.addEventListener("click",g)},100)},window.confirmResetTransactions=function(l,d){confirm(`Tem certeza que deseja resetar apenas as transações do orçamento "${d}"?

⚠️ Esta ação irá remover APENAS as transações, mantendo categorias e recorrentes.

Esta ação não pode ser desfeita.`)&&window.resetTransactionsOnly(l).then(async()=>{await window.renderSettings()}).catch(h=>{console.error("Erro ao resetar transações:",h)})},window.confirmResetCategories=function(l,d){confirm(`Tem certeza que deseja resetar apenas as categorias do orçamento "${d}"?

⚠️ Esta ação irá remover APENAS as categorias personalizadas, mantendo transações e recorrentes.

ATENÇÃO: As categorias padrão serão recriadas automaticamente.

Esta ação não pode ser desfeita.`)&&window.resetCategoriesOnly(l).then(async()=>{await window.renderSettings()}).catch(h=>{console.error("Erro ao resetar categorias:",h)})},window.confirmResetBudget=function(l,d){confirm(`Tem certeza que deseja resetar completamente o orçamento "${d}"?

⚠️ Esta ação irá remover TODAS as transações e recorrentes, mas manterá o orçamento e suas categorias.

Esta ação não pode ser desfeita.`)&&window.resetBudget(l).then(async()=>{await window.renderSettings()}).catch(h=>{console.error("Erro ao resetar orçamento:",h)})},window.confirmDeleteBudget=function(l,d){confirm(`Tem certeza que deseja excluir o orçamento "${d}"?

⚠️ Esta ação não pode ser desfeita e você perderá todos os dados deste orçamento.`)&&window.deleteBudget(l).then(async()=>{await window.renderSettings()}).catch(h=>{console.error("Erro ao excluir orçamento:",h)})},setTimeout(()=>{(window.location.hash.replace("#","")||"/")==="/settings"&&(console.log("SettingsPage: Configurando botão de tema..."),window.setupThemeToggle&&window.setupThemeToggle())},100)}class ic{constructor(){this.isListening=!1,this.isStarting=!1,this.hasError=!1,this.isProcessingCommand=!1,this.recognition=null,this.currentType=null,this.isModalOpen=!1,this.retryCount=0,this.maxRetries=3,this.microphonePermissionChecked=!1,this.hasReceivedSpeech=!1,console.log("🎤 VoiceSystem inicializado")}init(){if(console.log("🎤 Inicializando VoiceSystem..."),!this.checkBrowserSupport())return console.error("❌ Navegador não suporta reconhecimento de voz"),this.showError("Seu navegador não suporta reconhecimento de voz. Use Chrome ou Edge."),!1;if(!this.checkHTTPS())return console.error("❌ HTTPS necessário para reconhecimento de voz"),this.showError("O reconhecimento de voz requer HTTPS. Por favor, acesse o site via HTTPS."),!1;try{this.setupRecognition(),console.log("✅ Reconhecimento configurado")}catch(e){return console.error("❌ Erro ao configurar reconhecimento:",e),!1}try{this.removeGlobalEvents(),this.setupGlobalEvents(),console.log("✅ Eventos globais configurados")}catch(e){console.error("❌ Erro ao configurar eventos:",e)}return console.log("✅ VoiceSystem inicializado com sucesso"),!0}checkBrowserSupport(){const e="webkitSpeechRecognition"in window||"SpeechRecognition"in window;return console.log("🔍 Suporte ao reconhecimento de voz:",e),e}checkHTTPS(){const e=location.protocol==="https:"||location.hostname==="localhost";return console.log("🔍 Protocolo seguro:",e),e}setupRecognition(){try{const e=window.SpeechRecognition||window.webkitSpeechRecognition;this.recognition=new e,this.recognition.lang="pt-BR",this.recognition.continuous=!0,this.recognition.interimResults=!0,this.recognition.maxAlternatives=1,this.recognition.serviceURI!==void 0&&(this.recognition.serviceURI="wss://www.google.com/speech-api/v2/recognize"),this.recognition.onstart=()=>this.handleRecognitionStart(),this.recognition.onresult=t=>this.handleRecognitionResult(t),this.recognition.onerror=t=>this.handleRecognitionError(t),this.recognition.onend=()=>this.handleRecognitionEnd(),this.recognition.onspeechstart=()=>this.handleSpeechStart(),this.recognition.onspeechend=()=>this.handleSpeechEnd(),this.recognition.onsoundstart=()=>this.handleSoundStart(),this.recognition.onsoundend=()=>this.handleSoundEnd(),console.log("✅ Reconhecimento configurado com eventos adicionais")}catch(e){console.error("❌ Erro ao configurar reconhecimento:",e),this.showError("Erro ao configurar reconhecimento de voz")}}handleRecognitionStart(){console.log("🎤 Reconhecimento iniciado"),this.isListening=!0,this.hasReceivedSpeech=!1,this.updateModalStatus("","Aguardando sua voz...","listening")}handleSpeechStart(){console.log("🗣️ Fala detectada - início"),this.hasReceivedSpeech=!0,this.updateModalStatus("","Ouvindo...","listening")}handleSpeechEnd(){console.log("🗣️ Fala detectada - fim")}handleSoundStart(){console.log("🔊 Som detectado - início")}handleSoundEnd(){console.log("🔊 Som detectado - fim")}handleRecognitionResult(e){console.log("🎤 Resultado recebido:",e);const t=e.results[e.results.length-1],o=t[0].transcript,r=t[0].confidence,a=t.isFinal;console.log("🎤 Transcrição:",o),console.log("🎤 Confiança:",r),console.log("🎤 Final:",a),a?(console.log("✅ Resultado final recebido, aguardando antes de processar..."),this.updateModalStatus("",`Você disse: "${o}"`,"processing"),setTimeout(()=>{this.isProcessingCommand||this.processCommand(o,r)},200)):this.updateModalStatus("",`Ouvindo: "${o}..."`,"listening")}handleRecognitionError(e){console.error("🎤 Erro no reconhecimento:",e),this.isListening=!1,this.isStarting=!1;const t=this.getErrorMessage(e.error);if(this.hasError=!0,setTimeout(()=>{this.hasError=!1},5e3),e.error==="no-speech"){console.log("⚠️ Nenhuma fala detectada"),this.hasReceivedSpeech?(console.log("ℹ️ Já havia recebido fala, aguardando mais tempo..."),setTimeout(()=>{this.isModalOpen&&!this.isListening&&!this.isStarting&&!this.isProcessingCommand&&(this.hasError=!1,this.startListening(this.currentType))},2e3)):(console.log("ℹ️ Nenhuma fala detectada ainda, reiniciando rapidamente..."),setTimeout(()=>{this.isModalOpen&&!this.isListening&&!this.isStarting&&!this.isProcessingCommand&&(this.hasError=!1,this.startListening(this.currentType))},500));return}this.updateModalStatus("",t,"error"),this.shouldRetry(e.error)&&this.retryCount<this.maxRetries?(this.retryCount++,console.log(`🔄 Tentativa ${this.retryCount} de ${this.maxRetries}`),setTimeout(()=>{this.isModalOpen&&(this.hasError=!1,this.startListening(this.currentType))},2e3)):setTimeout(()=>{this.closeModal()},3e3)}handleRecognitionEnd(){console.log("🎤 Reconhecimento finalizado"),this.isListening=!1,this.isStarting=!1;const e=this.hasReceivedSpeech&&!this.isProcessingCommand?1e3:500;this.isModalOpen&&!this.isListening&&!this.hasError&&!this.isProcessingCommand?(console.log(`🔄 Reiniciando reconhecimento em ${e}ms...`),setTimeout(()=>{this.isModalOpen&&!this.isListening&&!this.isStarting&&!this.isProcessingCommand?(console.log("🔄 Executando reinicialização..."),this.startListening(this.currentType)):console.log("🚫 Cancelando reinicialização - condições não atendidas")},e)):console.log("🚫 Não reiniciando - condições não atendidas:",{isModalOpen:this.isModalOpen,isListening:this.isListening,hasError:this.hasError,isProcessingCommand:this.isProcessingCommand})}async processCommand(e,t){try{this.isProcessingCommand=!0,console.log("🎤 Processando comando:",e);const o=this.normalizeText(e);console.log("🎤 Texto normalizado:",o);const r=this.determineCommandType(o);console.log("🎤 Tipo de comando:",r),this.recognition&&this.isListening&&setTimeout(()=>{this.recognition&&this.isListening&&this.recognition.stop()},100);const a=await this.executeCommand(o,r);this.showSuccess(a),setTimeout(()=>{this.closeModal()},2e3)}catch(o){console.error("❌ Erro ao processar comando:",o),this.showError(`Erro ao processar comando: ${o.message}`),setTimeout(()=>{this.closeModal()},3e3)}finally{this.isProcessingCommand=!1}}normalizeText(e){return e.toLowerCase().normalize("NFD").replace(new RegExp("\\p{Diacritic}","gu"),"").trim()}determineCommandType(e){if(console.log("🔍 Determinando tipo de comando para:",e),/\b(saldo|qual.*saldo|saldo atual|quanto.*tenho|meu saldo)\b/.test(e))return console.log("✅ Comando de consulta detectado"),"query";if(/\b(ir para|va para|mostrar|abrir|navegar).*(dashboard|transacoes|categorias|recorrentes)\b/.test(e))return console.log("✅ Comando de navegação detectado"),"navigation";if(/\b(adicionar|nova|criar|inserir).*(categoria)\b/.test(e)||/\b(categoria).*(nova|adicionar|criar)\b/.test(e))return console.log("✅ Comando de categoria detectado (explícito)"),"category";const t=this.extractCommandItems(e);return console.log("🔍 Itens extraídos do comando:",t),t.length===3?(console.log("✅ 3 itens detectados → Comando de CATEGORIA"),"category"):t.length===4?(console.log("✅ 4 itens detectados → Comando de TRANSAÇÃO"),"transaction"):/\b(adicionar|nova|criar|inserir|registrar|lancamento|lancar).*(despesa|receita|transacao|gasto|entrada|compra|pagamento)\b/.test(e)||/\b(despesa|receita|gasto|entrada|compra|pagamento).*(de|por|valor|no valor)\b/.test(e)||/\b(gastei|paguei|comprei|recebi|ganhei)\b/.test(e)||/\b(pagar|gastar|comprar|receber|ganhar)\b/.test(e)||/\b\d+.*(?:reais?|real|r\$)\b/.test(e)||/\b(?:cem|mil|duzentos|trezentos|quatrocentos|quinhentos|seiscentos|setecentos|oitocentos|novecentos).*(?:reais?|real|r\$)?\b/.test(e)?(console.log("✅ Comando de transação detectado (padrão tradicional)"),"transaction"):/\b\d+\b/.test(e)&&/\b(reais?|real|r\$|dinheiro|valor)\b/.test(e)?(console.log("✅ Comando de transação detectado (padrão numérico)"),"transaction"):/\b(cem|mil|duzentos|trezentos|quatrocentos|quinhentos|seiscentos|setecentos|oitocentos|novecentos|vinte|trinta|quarenta|cinquenta|sessenta|setenta|oitenta|noventa)\b/.test(e)?(console.log("✅ Comando de transação detectado (número por extenso)"),"transaction"):(console.log("⚠️ Usando tipo padrão:",this.currentType||"transaction"),this.currentType||"transaction")}extractCommandItems(e){console.log("🔍 Extraindo itens do comando:",e);const t=e.toLowerCase().normalize("NFD").replace(new RegExp("\\p{Diacritic}","gu"),"").trim(),o=["adicionar","nova","novo","criar","inserir","registrar","lancamento","lancar","de","da","do","na","no","em","para","por","com","valor","reais","real","r$","dinheiro","categoria","transacao","e","a","o","as","os"],r=t.split(/\s+/).filter(s=>s.length>1).filter(s=>!o.includes(s));console.log("🔍 Palavras filtradas:",r);const a=[];for(const s of r){if(/^\d+([.,]\d+)?$/.test(s)){a.push({type:"valor",value:s});continue}if(/^(despesa|receita|gasto|entrada)s?$/.test(s)){a.push({type:"tipo",value:s});continue}let c=!1;if(window.appState?.categories){for(const l of window.appState.categories)if(l.nome.toLowerCase().includes(s)||s.includes(l.nome.toLowerCase())){a.push({type:"categoria",value:s}),c=!0;break}}!c&&s.length>2&&a.push({type:"descricao",value:s})}return console.log("🔍 Itens identificados:",a),a}async executeCommand(e,t){switch(console.log("🎤 Executando comando:",t,e),t){case"query":return await this.handleQueryCommand(e);case"transaction":return await this.handleTransactionCommand(e);case"category":return await this.handleCategoryCommand(e);case"navigation":return await this.handleNavigationCommand(e);default:throw new Error("Tipo de comando não reconhecido")}}async handleQueryCommand(e){return console.log("🔍 Processando comando de consulta:",e),/\b(saldo|qual.*saldo|saldo atual)\b/.test(e)?`Saldo atual: R$ ${this.calculateBalance().toFixed(2)}`:/\b(despesas|gastos)\b/.test(e)?`Total de despesas: R$ ${this.calculateExpenses().toFixed(2)}`:/\b(receitas|entradas)\b/.test(e)?`Total de receitas: R$ ${this.calculateIncome().toFixed(2)}`:"Comando de consulta não reconhecido"}async handleTransactionCommand(e){console.log("💰 Processando comando de transação:",e);const t=this.parseTransactionCommand(e);if(!t)throw new Error("Não foi possível entender os dados da transação");const o=t.categoriaExistente?`categoria existente "${t.categoria}"`:`nova categoria "${t.categoria}"`;if(window.showAddTransactionModal){const r={descricao:t.descricao,valor:t.valor,tipo:t.tipo,categoriaId:t.categoriaId,data:new Date().toISOString().split("T")[0]};console.log("🎤 Abrindo modal de transação com dados:",r),window.showAddTransactionModal(r);const a=t.valor!==null?`de R$ ${t.valor.toFixed(2)}`:"(valor a definir)";return`✅ Modal aberto com: ${t.tipo} ${a} na ${o}. Você pode editar e salvar.`}else{if(window.addTransactionWithConfirmation)return await window.addTransactionWithConfirmation(t),`✅ Transação confirmada: ${t.tipo} de R$ ${t.valor.toFixed(2)} na ${o}`;if(window.addTransaction)return await window.addTransaction(t),`✅ Transação adicionada: ${t.tipo} de R$ ${t.valor.toFixed(2)} na ${o}`;throw new Error("Função de adicionar transação não disponível")}}async handleCategoryCommand(e){console.log("📂 Processando comando de categoria:",e);const t=this.parseCategoryCommand(e);if(!t||!t.nome)throw new Error("Nome da categoria não foi entendido");if(window.showAddCategoryModal){const o={nome:t.nome,tipo:t.tipo,limite:t.limite||0};console.log("🎤 Abrindo modal de categoria com dados:",o),window.showAddCategoryModal(o);const r=t.limite>0?` com limite de R$ ${t.limite.toFixed(2)}`:"";return`✅ Modal aberto com: categoria "${t.nome}" (${t.tipo})${r}. Você pode editar e salvar.`}else if(window.addCategory){await window.addCategory(t);const o=t.limite>0?` com limite de R$ ${t.limite.toFixed(2)}`:"";return`✅ Categoria "${t.nome}" (${t.tipo})${o} adicionada com sucesso`}else throw new Error("Função de adicionar categoria não disponível")}async handleNavigationCommand(e){return console.log("🧭 Processando comando de navegação:",e),/\b(dashboard|início|principal)\b/.test(e)?(window.location.hash="#/dashboard","Navegando para o Dashboard"):/\b(transações|transação)\b/.test(e)?(window.location.hash="#/transactions","Navegando para Transações"):/\b(categorias|categoria)\b/.test(e)?(window.location.hash="#/categories","Navegando para Categorias"):/\b(recorrentes|recorrente)\b/.test(e)?(window.location.hash="#/recorrentes","Navegando para Recorrentes"):"Comando de navegação não reconhecido"}parseTransactionCommand(e){console.log("🔍 Analisando comando de transação:",e);const t={tipo:{receita:/\b(receita|receitas|entrada|entradas|ganhei|recebi|salario|ganhar|receber|renda|rendas|ganho|ganhos)\b/i},valor:[/(?:de|por|valor|custou|custa|custando|no valor de|foi de)\s*(\d+(?:[.,]\d{1,2})?)\s*(?:reais?|r\$|real|dinheiro)?/i,/(\d+(?:[.,]\d{1,2})?)\s*(?:reais?|r\$|real|dinheiro)/i,/\b(zero|uma?|dois|duas|tres|quatro|cinco|seis|sete|oito|nove|dez|onze|doze|treze|quatorze|catorze|quinze|dezesseis|dezessete|dezoito|dezenove|vinte|trinta|quarenta|cinquenta|sessenta|setenta|oitenta|noventa|cem|cento|duzentos|trezentos|quatrocentos|quinhentos|seiscentos|setecentos|oitocentos|novecentos|mil)\s*(?:reais?|r\$|real|dinheiro)?\b/i,/\b(\d+(?:[.,]\d{1,2})?)\b/],categoria:[/\b(?:categoria|para|em|de|na categoria|tipo)\s+([a-záàâãéèêíìîóòôõúùûç\s]+?)(?:\s*$|\s+(?:de|por|valor|reais?|r\$|custou|custa)\s*\d)/i,/\b(?:com|para|em|de)\s+([a-záàâãéèêíìîóòôõúùûç\s]+?)(?:\s*$|\s+(?:de|por|valor|reais?|r\$|custou|custa))/i,/([a-záàâãéèêíìîóòôõúùûç]+)\s*$/]};let o="despesa";t.tipo.receita.test(e)&&(o="receita");let r=null,a=null;console.log("🔍 Tentando extrair valor do texto:",e);const s={zero:0,um:1,uma:1,dois:2,duas:2,três:3,tres:3,quatro:4,cinco:5,seis:6,sete:7,oito:8,nove:9,dez:10,onze:11,doze:12,treze:13,quatorze:14,catorze:14,quinze:15,dezesseis:16,dezessete:17,dezoito:18,dezenove:19,vinte:20,trinta:30,quarenta:40,cinquenta:50,sessenta:60,setenta:70,oitenta:80,noventa:90,cem:100,cento:100,duzentos:200,trezentos:300,quatrocentos:400,quinhentos:500,seiscentos:600,setecentos:700,oitocentos:800,novecentos:900,mil:1e3};for(let v=0;v<t.valor.length;v++){const b=t.valor[v];if(console.log(`🔍 Testando padrão ${v+1}:`,b),a=e.match(b),a){console.log("✅ Match encontrado:",a);const T=a[1];if(console.log("📝 Valor capturado:",T),s[T.toLowerCase()]?(r=s[T.toLowerCase()],console.log("🔢 Número por extenso convertido:",r)):(r=parseFloat(T.replace(",",".")),console.log("🔢 Número convertido:",r)),r&&r>0){console.log("✅ Valor válido encontrado:",r);break}else console.log("❌ Valor inválido, continuando busca..."),r=null,a=null}else console.log("❌ Nenhum match para este padrão")}if(!r){const v={zero:0,um:1,uma:1,dois:2,duas:2,três:3,tres:3,quatro:4,cinco:5,seis:6,sete:7,oito:8,nove:9,dez:10,onze:11,doze:12,treze:13,quatorze:14,catorze:14,quinze:15,dezesseis:16,dezessete:17,dezoito:18,dezenove:19,vinte:20,trinta:30,quarenta:40,cinquenta:50,sessenta:60,setenta:70,oitenta:80,noventa:90,cem:100,cento:100,duzentos:200,trezentos:300,quatrocentos:400,quinhentos:500,seiscentos:600,setecentos:700,oitocentos:800,novecentos:900,mil:1e3},b=/\b(zero|uma?|dois|duas|três|tres|quatro|cinco|seis|sete|oito|nove|dez|onze|doze|treze|quatorze|catorze|quinze|dezesseis|dezessete|dezoito|dezenove|vinte|trinta|quarenta|cinquenta|sessenta|setenta|oitenta|noventa|cem|cento|duzentos|trezentos|quatrocentos|quinhentos|seiscentos|setecentos|oitocentos|novecentos|mil)\b/i,T=e.match(b);if(T){const D=T[1].toLowerCase();v[D]&&(r=v[D])}if(!r){const D=e.split(" ");for(const L of D)if(v[L.toLowerCase()]){r=v[L.toLowerCase()];break}}}r||(console.log("⚠️ Valor não encontrado, será preenchido manualmente no modal"),r=null);let c="Outros",l=null,d=null;if(window.appState?.categories){console.log("🔍 Procurando categorias existentes no texto:",e);for(const v of window.appState.categories){const b=v.nome.toLowerCase(),T=e.toLowerCase();if(T.includes(b)){d=v,c=v.nome,console.log("✅ Categoria encontrada (exata):",c);break}const D=b.split(" "),L=T.split(" ");let O=0;for(const Q of D)Q.length>2&&L.some(J=>J.includes(Q)||Q.includes(J))&&O++;if(O>0&&O>=D.length*.5){d=v,c=v.nome,console.log("✅ Categoria encontrada (parcial):",c,`(${O}/${D.length} palavras)`);break}}}if(!d){for(const v of t.categoria)if(l=e.match(v),l&&l[1]){let b=l[1].trim();if(b=b.replace(/\b(de|por|valor|reais?|r\$|real|dinheiro|custou|custa)\b/gi,"").trim(),b.length>2){c=b,console.log("📝 Categoria extraída do texto:",c);break}}}console.log("🔍 Texto original para descrição:",e);const h=e.toLowerCase().split(" "),g=["adicionar","nova","criar","inserir","despesa","receita","transação","gasto","entrada","gastei","comprei","paguei","com","para","em","de","categoria","na","da","tipo","reais","real","dinheiro","valor","custou","custa","custando"];let m=null;for(const v of h)if(!/^\d+([.,]\d+)?$/.test(v)&&!g.includes(v)&&!(d&&v===d.nome.toLowerCase())&&v.length>=2){m=v;break}console.log("🔍 Primeira palavra significativa encontrada:",m);let f;if(m)f=m.charAt(0).toUpperCase()+m.slice(1),console.log("🔍 Descrição definida como primeira palavra significativa:",f);else{if(f=e,a&&(console.log("🔍 Removendo valor encontrado:",a[0]),f=f.replace(a[0],"")),l&&(console.log("🔍 Removendo categoria extraída:",l[0]),f=f.replace(l[0],"")),d){const v=d.nome.toLowerCase(),b=new RegExp(`\\b${v.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}\\b`,"gi");console.log("🔍 Removendo categoria do sistema:",v),f=f.replace(b,"")}f=f.replace(/\b(adicionar|nova?|criar|inserir|transação|gasto|entrada|gastei|comprei|paguei)\b/gi,"").replace(/\b(com|para|em|de|categoria|na categoria|da categoria|tipo)\b/gi,"").replace(/\b(reais?|r\$|real|dinheiro|valor|custou|custa|custando)\b/gi,"").replace(/\b(despesa|receita)\b(?=.*\w)/gi,"").replace(/\s+/g," ").trim(),console.log("🔍 Descrição após limpeza (fallback):",f),(!f||f.length<3)&&(r!==null?f=`${o.charAt(0).toUpperCase()+o.slice(1)} de R$ ${r.toFixed(2)}`:f=`${o.charAt(0).toUpperCase()+o.slice(1)}`,console.log("🔍 Usando descrição padrão (fallback final):",f))}return{tipo:o,valor:r,categoria:c,categoriaId:d?.id||null,categoriaExistente:!!d,descricao:f,data:new Date().toISOString()}}parseCategoryCommand(e){console.log("🔍 Analisando comando de categoria:",e);const t=this.extractCommandItems(e);return t.length===3?(console.log("🔍 Processando comando de categoria com 3 itens"),this.parseCategoryCommandFromItems(t,e)):this.parseCategoryCommandTraditional(e)}parseCategoryCommandFromItems(e,t){console.log("🔍 Analisando comando de categoria com 3 itens:",e);let o=null,r="despesa",a=0;for(const s of e)switch(s.type){case"valor":a=parseFloat(s.value.replace(",",".")),console.log("💰 Limite extraído:",a);break;case"tipo":/^(receita|entrada)s?$/.test(s.value)?r="receita":r="despesa",console.log("📊 Tipo extraído:",r);break;case"descricao":o||(o=s.value.charAt(0).toUpperCase()+s.value.slice(1),console.log("📝 Nome da categoria extraído:",o));break}if(!o){const s=t.toLowerCase().split(" "),c=["adicionar","nova","novo","criar","inserir","categoria","despesa","receita","de","da","do","na","no","em","para","por","com","valor","reais","real","r$","dinheiro"];for(const l of s)if(l.length>2&&!c.includes(l)&&!/^\d+([.,]\d+)?$/.test(l)){o=l.charAt(0).toUpperCase()+l.slice(1),console.log("📝 Nome da categoria extraído (fallback):",o);break}}if(!o)throw new Error("Nome da categoria não foi entendido no comando de 3 itens");return console.log("✅ Categoria processada:",{nome:o,tipo:r,limite:a}),{nome:o,tipo:r,limite:a||0,cor:this.getRandomColor()}}parseCategoryCommandTraditional(e){console.log("🔍 Analisando comando de categoria (método tradicional):",e);const t={nome:[/\b(?:categoria|categoria)\s+(?:chamada|de|para|com nome)\s+([a-záàâãéèêíìîóòôõúùûç\s]+?)(?:\s+(?:tipo|despesa|receita|limite)\b|\s*$)/i,/\b(?:nova|criar|adicionar)\s+(?:categoria|categoria)\s+(?:chamada|de|para|com nome)?\s*([a-záàâãéèêíìîóòôõúùûç\s]+?)(?:\s+(?:tipo|despesa|receita|limite)\b|\s*$)/i,/\b(?:categoria|categoria)\s+([a-záàâãéèêíìîóòôõúùûç\s]+?)(?:\s+(?:tipo|despesa|receita|limite)\b|\s*$)/i,/\b([a-záàâãéèêíìîóòôõúùûç\s]+?)\s+(?:categoria|despesa|receita)\b/i],tipo:{receita:/\b(receita|receitas|entrada|entradas|renda|rendas)\b/i},limite:[/\blimite\s+(?:de\s+)?(\d+(?:[.,]\d{1,2})?)/i,/(\d+(?:[.,]\d{1,2})?)\s*(?:reais?|r\$|real|dinheiro)/i,/(\d+(?:[.,]\d{1,2})?)/]};let o=null;for(const s of t.nome){const c=e.match(s);if(c&&c[1]&&(o=c[1].trim(),o=o.replace(/\b(nova?|criar|adicionar|categoria|tipo|despesa|receita|limite|de|por|valor|reais?|r\$|real|dinheiro)\b/gi,"").trim(),o.length>2))break}if(!o)throw new Error('Nome da categoria não foi entendido. Diga algo como "nova categoria chamada transporte"');let r="despesa";t.tipo.receita.test(e)&&(r="receita");let a=0;for(const s of t.limite){const c=e.match(s);if(c){a=parseFloat(c[1].replace(",","."));break}}if(!a){const s={zero:0,um:1,uma:1,dois:2,duas:2,três:3,tres:3,quatro:4,cinco:5,seis:6,sete:7,oito:8,nove:9,dez:10,onze:11,doze:12,treze:13,quatorze:14,catorze:14,quinze:15,dezesseis:16,dezessete:17,dezoito:18,dezenove:19,vinte:20,trinta:30,quarenta:40,cinquenta:50,sessenta:60,setenta:70,oitenta:80,noventa:90,cem:100,cento:100,duzentos:200,trezentos:300,quatrocentos:400,quinhentos:500,seiscentos:600,setecentos:700,oitocentos:800,novecentos:900,mil:1e3},c=/\b(zero|uma?|dois|duas|três|tres|quatro|cinco|seis|sete|oito|nove|dez|onze|doze|treze|quatorze|catorze|quinze|dezesseis|dezessete|dezoito|dezenove|vinte|trinta|quarenta|cinquenta|sessenta|setenta|oitenta|noventa|cem|cento|duzentos|trezentos|quatrocentos|quinhentos|seiscentos|setecentos|oitocentos|novecentos|mil)\b/i,l=e.match(c);if(l){const d=l[1].toLowerCase();s[d]&&(a=s[d])}if(!a){const d=e.split(" ");for(const h of d)if(s[h.toLowerCase()]){a=s[h.toLowerCase()];break}}}return{nome:o,tipo:r,limite:a||0,cor:this.getRandomColor()}}getRandomColor(){const e=["#FF6B6B","#4ECDC4","#45B7D1","#96CEB4","#FFEAA7","#DDA0DD","#98D8C8","#F7DC6F","#BB8FCE","#85C1E9","#F8C471","#82E0AA","#F1948A","#85C1E9","#D7BDE2"];return e[Math.floor(Math.random()*e.length)]}calculateBalance(){if(!window.appState?.transactions)return 0;const e=window.appState.transactions.filter(o=>o.tipo==="receita").reduce((o,r)=>o+parseFloat(r.valor),0),t=window.appState.transactions.filter(o=>o.tipo==="despesa").reduce((o,r)=>o+parseFloat(r.valor),0);return e-t}calculateExpenses(){return window.appState?.transactions?window.appState.transactions.filter(e=>e.tipo==="despesa").reduce((e,t)=>e+parseFloat(t.valor),0):0}calculateIncome(){return window.appState?.transactions?window.appState.transactions.filter(e=>e.tipo==="receita").reduce((e,t)=>e+parseFloat(t.valor),0):0}getErrorMessage(e){return{"not-allowed":"Permissão do microfone negada. Clique no ícone do microfone na barra de endereços e permita o acesso.","no-speech":"Nenhuma fala detectada. Tente falar mais alto ou mais próximo do microfone.","audio-capture":"Erro ao capturar áudio. Verifique se o microfone está funcionando.",network:"Erro de rede. Verifique sua conexão com a internet.","service-not-allowed":"Serviço de reconhecimento de voz não permitido.","not-supported":"Reconhecimento de voz não suportado neste navegador.",aborted:"Reconhecimento de voz interrompido.","audio-capture-device-not-found":"Microfone não encontrado.","audio-capture-device-in-use":"Microfone em uso por outro aplicativo."}[e]||`Erro desconhecido: ${e}`}shouldRetry(e){return["network","service-not-allowed","audio-capture-device-in-use"].includes(e)}getRandomColor(){const e=["#3B82F6","#8B5CF6","#10B981","#F59E0B","#EF4444","#06B6D4"];return e[Math.floor(Math.random()*e.length)]}openModal(e="transaction"){console.log("🎤 Abrindo modal de voz:",e),this.currentType=e,this.isModalOpen=!0,this.retryCount=0;const t=document.getElementById("voice-modal"),o=t?.querySelector(".voice-content");t&&o?(t.style.display="flex",t.style.pointerEvents="auto",t.style.background="rgba(0, 0, 0, 0.95)",t.style.backdropFilter="blur(30px)",o.style.transform="scale(1)",o.style.opacity="1",document.body.classList.add("voice-modal-open"),setTimeout(()=>{this.startListening(e)},500),console.log("✅ Modal de voz aberto")):console.error("❌ Modal de voz não encontrado")}closeModal(){if(!this.isModalOpen)return;console.log("🎤 Fechando modal de voz"),this.isModalOpen=!1,this.isListening=!1,this.isStarting=!1,this.hasError=!1,this.isProcessingCommand=!1,this.retryCount=0;const e=document.getElementById("voice-modal"),t=e?.querySelector(".voice-content");if(e&&t){if(this.recognition)try{this.recognition.stop(),console.log("🛑 Reconhecimento parado")}catch{console.log("ℹ️ Reconhecimento já estava parado")}t.style.transform="scale(0.95)",t.style.opacity="0",e.style.background="rgba(0, 0, 0, 0)",e.style.backdropFilter="blur(0px)",document.body.classList.remove("voice-modal-open"),setTimeout(()=>{e.style.pointerEvents="none",e.style.display="none",console.log("✅ Modal de voz fechado")},300)}}updateModalStatus(e,t,o){const r=document.getElementById("voice-modal");if(!r)return;const a=r.querySelector("h3"),s=r.querySelector("p"),c=r.querySelector(".voice-icon div"),l=r.querySelector(".voice-status"),d=l?.querySelector("p");if(a)switch(o){case"listening":a.textContent="🎤 Estou te ouvindo!";break;case"processing":a.textContent="🧠 Processando...";break;case"error":a.textContent="❌ Ops! Algo deu errado";break;case"success":a.textContent="✅ Perfeito!";break;default:a.textContent=e||"🎤 Estou te ouvindo!"}if(s)switch(o){case"listening":s.textContent="Fale naturalmente como você gastou ou recebeu dinheiro";break;case"processing":s.textContent="Entendendo o que você disse...";break;case"error":s.textContent=t||"Tente falar novamente de forma mais clara";break;case"success":s.textContent=t||"Transação adicionada com sucesso!";break;default:s.textContent=t||"Fale naturalmente como você gastou ou recebeu dinheiro"}if(c)switch(c.className="w-16 h-16 rounded-full flex items-center justify-center mx-auto shadow-lg",o){case"listening":c.classList.add("bg-gradient-to-r","from-green-400","to-blue-500","animate-pulse");break;case"processing":c.classList.add("bg-gradient-to-r","from-yellow-400","to-orange-500","animate-spin");break;case"error":c.classList.add("bg-gradient-to-r","from-red-400","to-pink-500");break;case"success":c.classList.add("bg-gradient-to-r","from-green-400","to-emerald-500");break;default:c.classList.add("bg-gradient-to-r","from-green-400","to-blue-500","animate-pulse")}if(l&&(l.querySelectorAll("div").forEach((g,m)=>{switch(g.classList.remove("animate-bounce","animate-pulse","bg-green-500","bg-blue-500","bg-yellow-500","bg-red-500"),o){case"listening":g.classList.add("animate-bounce","bg-green-500"),g.style.animationDelay=`${m*.1}s`;break;case"processing":g.classList.add("animate-pulse","bg-yellow-500"),g.style.animationDelay=`${m*.2}s`;break;case"error":g.classList.add("bg-red-500"),g.style.animationDelay="";break;case"success":g.classList.add("bg-green-500"),g.style.animationDelay="";break;default:g.classList.add("animate-bounce","bg-green-500"),g.style.animationDelay=`${m*.1}s`}}),d))switch(o){case"listening":d.textContent="Microfone ativo",d.className="text-xs text-green-600 dark:text-green-400 font-medium";break;case"processing":d.textContent="Processando comando...",d.className="text-xs text-yellow-600 dark:text-yellow-400 font-medium";break;case"error":d.textContent="Erro no reconhecimento",d.className="text-xs text-red-600 dark:text-red-400 font-medium";break;case"success":d.textContent="Comando executado!",d.className="text-xs text-green-600 dark:text-green-400 font-medium";break;default:d.textContent="Microfone ativo",d.className="text-xs text-green-600 dark:text-green-400 font-medium"}}async startListening(e="transaction"){console.log("🎤 Iniciando reconhecimento de voz...",{type:e,isListening:this.isListening});try{if(!this.recognition)throw console.error("❌ Reconhecimento não configurado"),new Error("Reconhecimento não configurado");if(this.isListening)return console.log("⚠️ Reconhecimento já está ativo, ignorando nova tentativa"),!0;if(this.currentType=e,console.log("✅ Tipo de comando definido:",this.currentType),this.updateModalStatus("","Iniciando...","processing"),!this.microphonePermissionChecked){if(console.log("🔍 Verificação rápida de permissão..."),!await this.quickPermissionCheck())return console.log("❌ Permissão do microfone negada"),!1;this.microphonePermissionChecked=!0}try{this.recognition.stop(),console.log("🛑 Parando reconhecimento anterior (sem delay)...")}catch{console.log("ℹ️ Nenhum reconhecimento anterior para parar")}return this.isStarting=!0,console.log("🚀 Iniciando reconhecimento IMEDIATAMENTE..."),this.recognition.start(),console.log("✅ Reconhecimento iniciado com sucesso"),setTimeout(()=>{this.isStarting=!1},500),!0}catch(t){console.error("❌ Erro ao iniciar reconhecimento:",t),this.isStarting=!1;let o="Erro ao iniciar reconhecimento de voz";if(t.name==="InvalidStateError"){if(console.log("🔄 Reconhecimento já ativo, aguardando..."),await new Promise(r=>setTimeout(r,1e3)),!this.isListening&&!this.isStarting)return console.log("🔄 Tentando novamente após aguardar..."),this.startListening(e);o="Sistema de voz ocupado. Tente novamente em alguns segundos."}else t.name==="NotSupportedError"?o="Reconhecimento de voz não suportado neste navegador. Use Chrome ou Edge.":t.name==="NetworkError"&&(o="Erro de conexão. Verifique sua internet e tente novamente.");return this.showError(o),!1}}async quickPermissionCheck(){console.log("⚡ Verificação rápida de permissão...");try{if(!navigator.mediaDevices||!navigator.mediaDevices.getUserMedia)return console.warn("⚠️ API getUserMedia não disponível"),this.showError("Navegador não suporta acesso ao microfone. Use Chrome, Edge ou Firefox."),!1;if(navigator.permissions)try{const o=await navigator.permissions.query({name:"microphone"});if(console.log("🔍 Status da permissão:",o.state),o.state==="granted")return console.log("✅ Permissão já concedida"),!0;if(o.state==="denied")return console.log("❌ Permissão negada"),this.showError("Permissão do microfone negada. Permita o acesso ao microfone nas configurações do navegador."),!1}catch{console.log("ℹ️ API de permissões não disponível, usando método alternativo")}const e=new Promise((o,r)=>setTimeout(()=>r(new Error("Timeout")),1e3)),t=navigator.mediaDevices.getUserMedia({audio:{echoCancellation:!0,noiseSuppression:!0,autoGainControl:!0}});try{return(await Promise.race([t,e])).getTracks().forEach(r=>r.stop()),console.log("✅ Permissão do microfone concedida (verificação rápida)"),!0}catch(o){if(o.message==="Timeout")return console.log("⚠️ Timeout na verificação, assumindo permissão OK"),!0;throw o}}catch(e){return console.warn("⚠️ Erro na verificação rápida:",e.name),e.name==="NotAllowedError"?(this.showError("Permissão do microfone negada. Permita o acesso ao microfone nas configurações do navegador."),!1):e.name==="NotFoundError"?(this.showError("Nenhum microfone encontrado. Verifique se há um microfone conectado."),!1):(console.log("ℹ️ Assumindo permissão OK para não bloquear o sistema"),!0)}}async requestMicrophonePermission(){console.log("🎤 Solicitando permissão do microfone...");try{if(!navigator.mediaDevices||!navigator.mediaDevices.getUserMedia)return console.warn("⚠️ API getUserMedia não disponível"),!1;try{return(await navigator.mediaDevices.getUserMedia({audio:{echoCancellation:!0,noiseSuppression:!0,autoGainControl:!0}})).getTracks().forEach(t=>t.stop()),console.log("✅ Permissão do microfone concedida"),!0}catch(e){console.warn("⚠️ Erro de permissão:",e.name);try{const t=await navigator.mediaDevices.enumerateDevices(),o=t.filter(r=>r.kind==="audioinput");return console.log("🔍 Dispositivos encontrados:",t.length),console.log("🎤 Dispositivos de áudio:",o.length),o.length===0?(console.warn("⚠️ Nenhum dispositivo de áudio encontrado"),this.showError("Nenhum microfone encontrado. Verifique se há um microfone conectado."),!1):(console.log("✅ Dispositivos de áudio disponíveis:",o.map(r=>r.label||"Microfone")),this.showError("Permissão do microfone negada. Permita o acesso ao microfone nas configurações do navegador."),!1)}catch(t){return console.error("❌ Erro ao enumerar dispositivos:",t),this.showError("Erro ao verificar dispositivos de áudio. Tente recarregar a página."),!1}}}catch(e){console.error("❌ Erro ao solicitar permissão:",e);let t="Erro ao acessar microfone";return e.name==="NotFoundError"?t="Nenhum microfone encontrado. Verifique se há um microfone conectado.":e.name==="NotAllowedError"?t="Permissão do microfone negada. Permita o acesso ao microfone nas configurações do navegador.":e.name==="NotReadableError"?t="Microfone em uso por outro aplicativo. Feche outros aplicativos que possam estar usando o microfone.":e.name==="OverconstrainedError"?t="Configuração de microfone não suportada. Tente usar outro navegador.":e.name==="TypeError"&&(t="Navegador não suporta acesso ao microfone. Use Chrome, Edge ou Firefox."),this.showError(t),!1}}showSuccess(e){console.log("✅ Sucesso:",e),this.updateModalStatus("",e,"success"),window.Snackbar&&typeof window.Snackbar.success=="function"?window.Snackbar.success(e):window.Snackbar&&typeof window.Snackbar.show=="function"?window.Snackbar.show(e,"success"):window.Snackbar&&typeof window.Snackbar=="function"?window.Snackbar({message:e,type:"success"}):window.alert&&alert(`✅ ${e}`)}showError(e){console.error("❌ Erro:",e),this.updateModalStatus("",e,"error"),window.Snackbar&&typeof window.Snackbar.error=="function"?window.Snackbar.error(e):window.Snackbar&&typeof window.Snackbar.show=="function"?window.Snackbar.show(e,"error"):window.Snackbar&&typeof window.Snackbar=="function"?window.Snackbar({message:e,type:"error"}):window.alert?alert(`❌ ${e}`):console.error("Nenhum sistema de notificação disponível")}setupGlobalEvents(){this.removeGlobalEvents(),console.log("🔧 Configurando eventos globais do VoiceSystem..."),this.escapeHandler=t=>{t.key==="Escape"&&this.isModalOpen&&this.closeModal()},document.addEventListener("keydown",this.escapeHandler),this.outsideClickHandler=t=>{const o=document.getElementById("voice-modal");t.target===o&&this.isModalOpen&&this.closeModal()},document.addEventListener("click",this.outsideClickHandler);const e=document.getElementById("close-voice-modal");if(e){console.log("🔧 Configurando botão de fechar modal...");const t=e.cloneNode(!0);e.parentNode.replaceChild(t,e),this.closeBtnHandler=o=>{o.preventDefault(),o.stopPropagation(),console.log("❌ Close voice modal button clicked"),this.closeModal()},t.addEventListener("click",this.closeBtnHandler),console.log("✅ Event listener do botão de fechar configurado")}else console.log("⚠️ Botão de fechar modal não encontrado")}removeGlobalEvents(){if(console.log("🧹 Removendo event listeners existentes..."),this.escapeHandler&&(document.removeEventListener("keydown",this.escapeHandler),this.escapeHandler=null,console.log("✅ Event listener ESC removido")),this.outsideClickHandler&&(document.removeEventListener("click",this.outsideClickHandler),this.outsideClickHandler=null,console.log("✅ Event listener click fora removido")),this.closeBtnHandler){const e=document.getElementById("close-voice-modal");e&&(e.removeEventListener("click",this.closeBtnHandler),console.log("✅ Event listener botão fechar removido")),this.closeBtnHandler=null}console.log("🧹 Limpeza de event listeners concluída")}start(e="transaction"){console.log("🎤 VoiceSystem.start chamado:",e);try{return!this.recognition&&(console.log("🔄 Inicializando VoiceSystem..."),!this.init())?(console.error("❌ Falha na inicialização do VoiceSystem"),!1):document.getElementById("voice-modal")?(this.currentType=e,console.log("✅ Tipo de comando definido:",this.currentType),this.openModal(e),!0):(console.error("❌ Modal de voz não encontrado no DOM"),this.showError("Interface de voz não disponível"),!1)}catch(t){return console.error("❌ Erro ao iniciar VoiceSystem:",t),this.showError(`Erro ao iniciar reconhecimento de voz: ${t.message}`),!1}}stop(){console.log("🎤 VoiceSystem.stop chamado"),this.closeModal()}destroy(){console.log("🎤 Destruindo VoiceSystem..."),this.recognition&&(this.recognition.stop(),this.recognition=null),this.removeGlobalEvents(),this.isModalOpen&&this.closeModal(),this.isListening=!1,this.isModalOpen=!1,this.retryCount=0,console.log("✅ VoiceSystem destruído")}}let qt=null;window.openVoiceModal=function(n="transaction"){return console.log("🎤 openVoiceModal chamado:",n),qt||(qt=new ic),qt.start(n)};window.closeVoiceModal=function(){console.log("🎤 closeVoiceModal chamado"),qt&&qt.stop()};window.startVoiceRecognition=function(n="transaction"){return console.log("🎤 startVoiceRecognition chamado:",n),qt||(qt=new ic),qt.start(n)};window.renderCleanTransactions=Fb;window.renderCleanCategories=kb;window.renderCleanRecorrentes=kp;window.renderCleanNotifications=qa;window.Modal=Qt;window.Snackbar=B;window.setupThemeToggle=si;window.FirebaseAuth=en;window.renderSettings=yE;window._renderRecorrentes=ja;window.showHistoricoRecorrente=Rp;window.renderLogAplicacoes=vE;window.deleteDespesaRecorrente=za;window.addDespesaRecorrente=Ua;window.updateInstallButton=function(){const n=document.getElementById("install-app-btn");if(!n)return;const e=window.matchMedia("(display-mode: standalone)").matches||window.navigator.standalone===!0,t=!!window.deferredPrompt;console.log("📱 PWA: Atualizando botão - Instalado:",e,"Prompt:",t),e?(console.log('📱 PWA: Mostrando "App Instalado"'),n.innerHTML=`
      <div class="flex items-center gap-3">
        <span class="text-xl">✅</span>
        <div>
          <div class="font-medium text-gray-800 dark:text-white">App Instalado</div>
          <div class="text-sm text-gray-500 dark:text-gray-400">Já está na tela inicial</div>
        </div>
      </div>
      <span class="text-green-500">✓</span>
    `,n.disabled=!0,n.classList.add("opacity-50","cursor-not-allowed")):t?(console.log('📱 PWA: Mostrando "Instalar App"'),n.innerHTML=`
      <div class="flex items-center gap-3">
        <span class="text-xl">⬇️</span>
        <div>
          <div class="font-medium text-gray-800 dark:text-white">Instalar App</div>
          <div class="text-sm text-gray-500 dark:text-gray-400">Adicionar à tela inicial</div>
        </div>
      </div>
      <span class="text-blue-500">→</span>
    `,n.disabled=!1,n.classList.remove("opacity-50","cursor-not-allowed")):(console.log("📱 PWA: Ocultando botão"),n.style.display="none")};window.resetCategoriesOnly=async function(n){try{const e=window.appState.currentUser;if(!e)throw new Error("Usuário não autenticado");console.log("🔄 Iniciando reset de categorias do orçamento:",n);const t=window.appState.budgets.find(c=>c.id===n);if(!t)throw new Error("Orçamento não encontrado");if(t.userId!==e.uid)throw new Error("Você não tem permissão para resetar este orçamento");console.log("🔄 Removendo categorias do orçamento...");const o=fe(oe(q,"categories"),ne("budgetId","==",n)),r=await he(o),a=r.docs.map(c=>Qe(c.ref));if(await Promise.all(a),console.log(`✅ ${r.docs.length} categorias removidas`),console.log("🔄 Recriando categorias padrão..."),await window.createDefaultCategories(n),console.log("✅ Categorias padrão recriadas"),window.appState.currentBudget?.id===n){await window.loadCategories();const c=window.location.hash.replace("#","")||"/";c==="/"?await renderDashboard():c==="/categories"&&await uc()}return B({message:`Categorias do orçamento "${t.nome}" foram resetadas com sucesso! Categorias padrão foram recriadas.`,type:"success"}),console.log("✅ Reset de categorias concluído com sucesso"),!0}catch(e){throw console.error("❌ Erro ao resetar categorias:",e),B({message:`Erro ao resetar categorias: ${e.message}`,type:"error"}),e}};window.importBackup=function(){const n=document.createElement("input");n.type="file",n.accept="application/json",n.onchange=async e=>{const t=e.target.files[0];if(!t)return;const o=await t.text();try{const r=JSON.parse(o);r.transactions&&r.categories&&r.budgets?(Qt({title:"Importação de Backup (Somente Leitura)",content:`<div class='space-y-2'>
            <p class='text-gray-700'>O backup foi lido com sucesso, mas <b>não será gravado no sistema</b> por questões de segurança.</p>
            <p class='text-gray-500 text-sm'>Se precisar restaurar dados, entre em contato com o suporte.</p>
            <pre class='bg-gray-100 rounded p-2 text-xs overflow-x-auto max-h-48'>${JSON.stringify(r,null,2)}</pre>
            <button onclick='closeModal()' class='mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'>Fechar</button>
          </div>`}),B({message:"Backup lido, mas não importado. Apenas leitura.",type:"info"})):(B({message:"Arquivo de backup inválido.",type:"error"}),alert("Arquivo de backup inválido."))}catch(r){B({message:"Erro ao importar backup: "+r.message,type:"error"}),alert("Erro ao importar backup: "+r.message)}},n.click()};window.restoreBackup=function(){if(console.log("🔍 restoreBackup chamada"),!window.appState?.currentUser){console.log("❌ Usuário não logado"),window.Snackbar?window.Snackbar({message:"❌ Você precisa estar logado para restaurar backup.",type:"error"}):alert("❌ Você precisa estar logado para restaurar backup.");return}if(!window.appState?.currentBudget){console.log("❌ Nenhum orçamento selecionado"),window.Snackbar?window.Snackbar({message:"❌ Nenhum orçamento selecionado.",type:"error"}):alert("❌ Nenhum orçamento selecionado.");return}if(console.log("✅ Usuário e orçamento OK, abrindo modal..."),!window.Modal){console.error("❌ Modal não está disponível"),alert("Erro: Modal não está disponível. Tente recarregar a página.");return}try{const n=window.Modal({title:"📥 Restaurar Backup",content:`
        <div class='space-y-4'>
          <div class='bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg'>
            <p class='text-blue-800 dark:text-blue-200 font-medium'>Como restaurar backup:</p>
            <ol class='mt-2 text-sm text-blue-700 dark:text-blue-300 space-y-1 list-decimal list-inside'>
              <li>Clique em "Selecionar Arquivo"</li>
              <li>Escolha o arquivo JSON de backup</li>
              <li>Confirme os dados encontrados</li>
              <li>Aguarde a restauração</li>
            </ol>
          </div>
          
          <div class='bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg'>
            <p class='text-yellow-800 dark:text-yellow-200 font-medium'>⚠️ Aviso Importante:</p>
            <p class='text-sm text-yellow-700 dark:text-yellow-300'>
              Esta ação irá substituir todos os dados atuais. 
              Certifique-se de que este é o backup correto.
            </p>
          </div>
          
          <div class='flex gap-3'>
            <button onclick='closeModal()' class='flex-1 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors'>
              Cancelar
            </button>
            <button onclick='window.selectBackupFile()' class='flex-1 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors'>
              📁 Selecionar Arquivo
            </button>
          </div>
        </div>
      `});console.log("✅ Modal criado com sucesso"),document.body.appendChild(n)}catch(n){console.error("❌ Erro ao criar modal:",n),alert("Erro ao abrir modal: "+n.message)}};window.selectBackupFile=function(){console.log("🔍 selectBackupFile chamada"),console.log("🔍 Fechando modal de confirmação..."),closeModal(),setTimeout(()=>{console.log("🔍 Criando input de arquivo...");const n=document.createElement("input");n.type="file",n.accept="application/json,.json",n.style.display="none",document.body.appendChild(n),console.log("🔍 Input adicionado ao DOM"),n.onchange=async e=>{console.log("🔍 Arquivo selecionado:",e.target.files[0]);const t=e.target.files[0];if(!t){console.log("❌ Nenhum arquivo selecionado"),document.body.removeChild(n);return}try{console.log("🔍 Lendo arquivo..."),window.Snackbar?window.Snackbar({message:"📥 Lendo arquivo de backup...",type:"info"}):alert("📥 Lendo arquivo de backup...");const o=await t.text();console.log("🔍 Arquivo lido, tamanho:",o.length);const r=JSON.parse(o);if(console.log("🔍 JSON parseado com sucesso:",r),!r.transactions||!r.categories||!r.budgets)throw new Error("Arquivo de backup inválido. Deve conter transações, categorias e orçamentos.");if(r.recorrentes&&r.recorrentes.length>0&&(console.log("🔧 Aplicando correções nas recorrentes..."),r.recorrentes=r.recorrentes.map(s=>(s.createdAt&&typeof s.createdAt=="object"&&s.createdAt.seconds&&(s.createdAt=new Date(s.createdAt.seconds*1e3).toISOString()),s.updatedAt&&typeof s.updatedAt=="object"&&s.updatedAt.seconds&&(s.updatedAt=new Date(s.updatedAt.seconds*1e3).toISOString()),s.dataInicio&&typeof s.dataInicio=="object"&&s.dataInicio.seconds&&(s.dataInicio=new Date(s.dataInicio.seconds*1e3).toISOString()),(!s.descricao||s.descricao.trim()==="")&&(s.descricao="Recorrente sem descrição"),(!s.valor||isNaN(parseFloat(s.valor)))&&(s.valor=0),(!s.diaLancamento||isNaN(parseInt(s.diaLancamento)))&&(s.diaLancamento=1),s.ativa=s.ativa!==!1,s.efetivarMesAtual=s.efetivarMesAtual===!0,s.parcelasTotal?(s.parcelasTotal=parseInt(s.parcelasTotal)||null,!s.parcelasRestantes||s.parcelasRestantes>s.parcelasTotal?s.parcelasRestantes=s.parcelasTotal:s.parcelasRestantes=parseInt(s.parcelasRestantes)||s.parcelasTotal):(s.parcelasTotal=null,s.parcelasRestantes=null),delete s.id,delete s.createdAt,delete s.updatedAt,s)).filter(s=>s.descricao&&s.valor>=0),console.log(`✅ ${r.recorrentes.length} recorrentes corrigidas`)),console.log("🔍 Dados válidos, criando modal de preview..."),!window.Modal){console.error("❌ Modal não está disponível"),alert("Erro: Modal não está disponível. Tente recarregar a página.");return}const a=window.Modal({title:"📥 Confirmar Restauração de Backup",content:`
            <div class='space-y-4'>
              <div class='bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg'>
                <p class='text-blue-800 dark:text-blue-200 font-medium'>Dados encontrados no backup:</p>
                <ul class='mt-2 text-sm text-blue-700 dark:text-blue-300 space-y-1'>
                  <li>📊 <strong>${r.transactions.length}</strong> transações</li>
                  <li>📂 <strong>${r.categories.length}</strong> categorias</li>
                  <li>📁 <strong>${r.budgets.length}</strong> orçamentos</li>
                  ${r.recorrentes?`<li>🔄 <strong>${r.recorrentes.length}</strong> recorrentes</li>`:"<li>🔄 <strong>0</strong> recorrentes</li>"}
                </ul>
                <p class='text-xs text-blue-600 dark:text-blue-400 mt-2'>
                  Arquivo: ${t.name} (${(t.size/1024).toFixed(1)} KB)
                </p>
              </div>
              
              <div class='bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg'>
                <p class='text-yellow-800 dark:text-yellow-200 font-medium'>⚠️ Aviso:</p>
                <p class='text-sm text-yellow-700 dark:text-yellow-300'>
                  Esta ação irá substituir todos os dados atuais. 
                  Certifique-se de que este é o backup correto.
                </p>
              </div>
              
              <div class='flex gap-3'>
                <button onclick='closeModal()' class='flex-1 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors'>
                  Cancelar
                </button>
                <button onclick='window.confirmRestoreBackup(${JSON.stringify(r).replace(/'/g,"\\'")})' class='flex-1 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors'>
                  ✅ Confirmar Restauração
                </button>
              </div>
            </div>
          `});console.log("🔍 Modal de preview criado, adicionando ao DOM..."),document.body.appendChild(a),console.log("✅ Modal de preview exibido com sucesso")}catch(o){console.error("❌ Erro ao ler backup:",o),window.Snackbar?window.Snackbar({message:"❌ Erro ao ler arquivo: "+o.message,type:"error"}):alert("❌ Erro ao ler arquivo: "+o.message)}finally{console.log("🔍 Removendo input do DOM"),document.body.removeChild(n)}},console.log("🔍 Triggerando clique no input..."),n.click(),console.log("🔍 Clique no input executado")},300)};window.confirmRestoreBackup=async function(n){console.log("🔍 confirmRestoreBackup chamada com dados:",n);try{console.log("🔍 Fechando modal..."),closeModal(),console.log("🔍 Mostrando loading..."),window.Snackbar?window.Snackbar({message:"🔄 Restaurando backup...",type:"info"}):alert("🔄 Restaurando backup...");const e=window.appState.currentUser.uid,t=window.appState.currentBudget.id;if(console.log("🔄 Iniciando restauração de backup..."),console.log("👤 User ID:",e),console.log("📁 Budget ID:",t),console.log("📊 Dados do backup:",n),!n||!n.categories||!n.transactions||!n.budgets)throw new Error("Dados de backup inválidos ou incompletos");console.log("🗑️ Limpando dados atuais..."),console.log("🗑️ Limpando transações...");for(const h of window.appState.transactions)try{await Mp(h.id),console.log(`🗑️ Transação "${h.descricao}" removida`)}catch(g){console.error(`❌ Erro ao remover transação "${h.descricao}":`,g)}console.log("🗑️ Limpando categorias...");for(const h of window.appState.categories)try{await Np(h.id),console.log(`🗑️ Categoria "${h.nome}" removida`)}catch(g){console.error(`❌ Erro ao remover categoria "${h.nome}":`,g)}console.log("🗑️ Limpando recorrentes...");for(const h of window.appState.recorrentes)try{await za(e,h.id),console.log(`🗑️ Recorrente "${h.descricao}" removida`)}catch(g){console.error(`❌ Erro ao remover recorrente "${h.descricao}":`,g)}await new Promise(h=>setTimeout(h,2e3));let o=0,r=0,a=0,s=0;console.log("📂 Importando categorias...");for(const h of n.categories)try{const{id:g,...m}=h;m.budgetId=t,await cc(m),o++,console.log(`✅ Categoria "${h.nome}" importada (${o}/${n.categories.length})`)}catch(g){console.error(`❌ Erro ao importar categoria "${h.nome}":`,g)}console.log("💸 Importando transações...");for(const h of n.transactions)try{const{id:g,...m}=h;m.budgetId=t,await Dp(m),r++,console.log(`✅ Transação "${h.descricao}" importada (${r}/${n.transactions.length})`)}catch(g){console.error(`❌ Erro ao importar transação "${h.descricao}":`,g)}console.log("📁 Importando orçamentos...");for(const h of n.budgets)try{if(window.appState.budgets.find(m=>m.nome===h.nome))console.log(`ℹ️ Orçamento "${h.nome}" já existe, pulando...`);else{const{id:m,...f}=h;f.userId=e,await Ha(f),a++,console.log(`✅ Orçamento "${h.nome}" importado (${a}/${n.budgets.length})`)}}catch(g){console.error(`❌ Erro ao importar orçamento "${h.nome}":`,g)}if(console.log("🔄 Importando recorrentes..."),n.recorrentes&&n.recorrentes.length>0)for(const h of n.recorrentes)try{const{id:g,...m}=h;m.budgetId=t,await Ua(e,t,m),s++,console.log(`✅ Recorrente "${h.descricao}" importada (${s}/${n.recorrentes.length})`)}catch(g){console.error(`❌ Erro ao importar recorrente "${h.descricao}":`,g)}else console.log("ℹ️ Nenhuma recorrente encontrada no backup");console.log("🔗 Reconectando transações às categorias...");let c=0;try{const{reconnectTransactionsFromBackup:h}=await pe(async()=>{const{reconnectTransactionsFromBackup:m}=await import("./reconnectTransactionsToCategories-D-nsYWpU.js");return{reconnectTransactionsFromBackup:m}},[]);c=(await h(n,t,!1)).reconexoesRealizadas,console.log(`✅ Reconexão concluída: ${c} transações reconectadas`)}catch(h){console.error("❌ Erro durante reconexão de transações:",h)}console.log("🔗 Reconectando categorias das recorrentes...");let l=0;try{const h=await Tp(e,t),g=await getCategories(t),m=new Map;n.categories.forEach(v=>{m.set(v.id,v.nome)});const f=new Map;g.forEach(v=>{const b=v.nome.toLowerCase().trim();f.set(b,v.id)});for(const v of h){const b=m.get(v.categoriaId);if(b){const T=b.toLowerCase().trim(),D=f.get(T);D&&D!==v.categoriaId&&(console.log(`🔄 Reconectando recorrente "${v.descricao}": ${v.categoriaId} → ${D}`),await updateDespesaRecorrente(e,v.id,{categoriaId:D}),l++)}}console.log(`✅ Reconexão de recorrentes concluída: ${l} recorrentes reconectadas`)}catch(h){console.error("❌ Erro durante reconexão de recorrentes:",h)}console.log("🔄 Recarregando dados..."),await Pp(),console.log("✅ Restauração concluída com sucesso!"),console.log(`📊 Resumo: ${o} categorias, ${r} transações, ${a} orçamentos, ${s} recorrentes, ${c} transações reconectadas, ${l} recorrentes reconectadas`);const d=`✅ Backup restaurado com sucesso!

📊 Dados importados:
• ${o} categorias
• ${r} transações
• ${a} orçamentos
• ${s} recorrentes
• ${c} transações reconectadas
• ${l} recorrentes reconectadas

A página será recarregada em 3 segundos...`;window.Snackbar?window.Snackbar({message:d,type:"success",duration:5e3}):alert(d),console.log("🔄 Agendando recarregamento da página..."),setTimeout(()=>{console.log("🔄 Recarregando página..."),window.location.reload()},3e3)}catch(e){console.error("❌ Erro durante restauração:",e);const t=`❌ Erro durante restauração:
${e.message}`;window.Snackbar?window.Snackbar({message:t,type:"error",duration:5e3}):alert(t)}};function Ko(n){const e=document.getElementById("login-page"),t=document.querySelector(".app-container"),o=document.getElementById("loading-page");n?(e.style.display="flex",t&&(t.style.display="none"),o&&(o.style.display="none")):(e.style.display="none",t&&(t.style.display="flex"),o&&(o.style.display="none"))}function bE(){en.signOut().then(()=>{console.log("✅ Logout realizado com sucesso"),window.appState.currentUser=null,window.appState.currentBudget=null,window.appState.transactions=[],window.appState.categories=[],window.appState.budgets=[],window.appState.recorrentes=[],Ko(!0),window.location.hash=""}).catch(n=>{console.error("❌ Erro no logout:",n)})}async function Pp(){const n=window.location.hash.slice(1)||"/dashboard";await Yo(n)}async function Dp(n){try{const e=window.appState.currentUser;if(!e)throw new Error("Usuário não autenticado");const t=window.appState.currentBudget;if(!t)throw new Error("Orçamento não selecionado");const o={...n,userId:e.uid,budgetId:t.id,createdAt:Ae(),updatedAt:Ae()},r=await Xt(oe(q,"transactions"),o);return console.log("✅ Transação adicionada com ID:",r.id),window.checkLimitesCategoria&&window.checkLimitesCategoria(),window.forceUIUpdate&&setTimeout(()=>window.forceUIUpdate(),100),B({message:"Transação adicionada com sucesso!",type:"success"}),r.id}catch(e){throw console.error("❌ Erro ao adicionar transação:",e),B({message:"Erro ao adicionar transação",type:"error"}),e}}async function EE(n,e){try{const t=qe(q,"transactions",n);await ht(t,{...e,updatedAt:Ae()}),console.log("✅ Transação atualizada:",n),window.checkLimitesCategoria&&window.checkLimitesCategoria(),window.forceUIUpdate&&setTimeout(()=>window.forceUIUpdate(),100),B({message:"Transação atualizada com sucesso!",type:"success"})}catch(t){throw console.error("❌ Erro ao atualizar transação:",t),B({message:"Erro ao atualizar transação",type:"error"}),t}}async function Mp(n){try{const e=qe(q,"transactions",n);await Qe(e),console.log("✅ Transação deletada:",n),window.checkLimitesCategoria&&window.checkLimitesCategoria(),window.forceUIUpdate&&setTimeout(()=>window.forceUIUpdate(),100),B({message:"Transação deletada com sucesso!",type:"success"})}catch(e){throw console.error("❌ Erro ao deletar transação:",e),B({message:"Erro ao deletar transação",type:"error"}),e}}async function dr(){try{if(!window.appState.currentUser)return[];const e=window.appState.currentBudget;if(!e)return[];const t=fe(oe(q,"transactions"),ne("budgetId","==",e.id)),r=(await he(t)).docs.map(a=>({id:a.id,...a.data()}));return r.sort((a,s)=>{let c,l;return a.createdAt&&typeof a.createdAt=="object"&&a.createdAt.seconds?c=new Date(a.createdAt.seconds*1e3):c=new Date(a.createdAt),s.createdAt&&typeof s.createdAt=="object"&&s.createdAt.seconds?l=new Date(s.createdAt.seconds*1e3):l=new Date(s.createdAt),l-c}),window.appState.transactions=r,r}catch(n){return console.error("❌ Erro ao carregar transações:",n),[]}}async function cc(n){try{const e=window.appState.currentUser;if(!e)throw new Error("Usuário não autenticado");const t=window.appState.currentBudget;if(!t)throw new Error("Orçamento não selecionado");const o={...n,userId:e.uid,budgetId:t.id,createdAt:Ae(),updatedAt:Ae()},r=await Xt(oe(q,"categories"),o);return console.log("✅ Categoria adicionada com ID:",r.id),B({message:"Categoria adicionada com sucesso!",type:"success"}),r.id}catch(e){throw console.error("❌ Erro ao adicionar categoria:",e),B({message:"Erro ao adicionar categoria",type:"error"}),e}}async function _E(n,e){try{const t=qe(q,"categories",n);await ht(t,{...e,updatedAt:Ae()}),console.log("✅ Categoria atualizada:",n),B({message:"Categoria atualizada com sucesso!",type:"success"})}catch(t){throw console.error("❌ Erro ao atualizar categoria:",t),B({message:"Erro ao atualizar categoria",type:"error"}),t}}async function Np(n){try{const e=qe(q,"categories",n);await Qe(e),console.log("✅ Categoria deletada:",n),B({message:"Categoria deletada com sucesso!",type:"success"})}catch(e){throw console.error("❌ Erro ao deletar categoria:",e),B({message:"Erro ao deletar categoria",type:"error"}),e}}async function ur(){try{if(!window.appState.currentUser)return[];const e=window.appState.currentBudget;if(!e)return[];const t=fe(oe(q,"categories"),ne("budgetId","==",e.id)),r=(await he(t)).docs.map(a=>({id:a.id,...a.data()}));return window.appState.categories=r,r}catch(n){return console.error("❌ Erro ao carregar categorias:",n),[]}}async function Ha(n){try{const e=window.appState.currentUser;if(!e)throw new Error("Usuário não autenticado");const t={...n,userId:e.uid,createdAt:Ae(),updatedAt:Ae()},o=await Xt(oe(q,"budgets"),t);return console.log("✅ Orçamento adicionado com ID:",o.id),B({message:"Orçamento adicionado com sucesso!",type:"success"}),o.id}catch(e){throw console.error("❌ Erro ao adicionar orçamento:",e),B({message:"Erro ao adicionar orçamento",type:"error"}),e}}window.deleteBudget=async function(n){try{const e=window.appState.currentUser;if(!e)throw new Error("Usuário não autenticado");console.log("🗑️ Iniciando exclusão do orçamento:",n);const t=window.appState.budgets.find(D=>D.id===n);if(!t)throw new Error("Orçamento não encontrado");if(t.userId!==e.uid)throw new Error("Você não tem permissão para excluir este orçamento");const o=window.appState.currentBudget?.id===n;o&&(window.appState.currentBudget=null,localStorage.removeItem("currentBudgetId")),console.log("🗑️ Excluindo transações do orçamento...");const r=fe(oe(q,"transactions"),ne("budgetId","==",n)),a=await he(r),s=a.docs.map(D=>Qe(D.ref));await Promise.all(s),console.log(`✅ ${a.docs.length} transações excluídas`),console.log("🗑️ Excluindo categorias do orçamento...");const c=fe(oe(q,"categories"),ne("budgetId","==",n)),l=await he(c),d=l.docs.map(D=>Qe(D.ref));await Promise.all(d),console.log(`✅ ${l.docs.length} categorias excluídas`),console.log("🗑️ Excluindo recorrentes do orçamento...");const h=fe(oe(q,"recorrentes"),ne("budgetId","==",n)),g=await he(h),m=g.docs.map(D=>Qe(D.ref));await Promise.all(m),console.log(`✅ ${g.docs.length} recorrentes excluídas`),console.log("🗑️ Excluindo convites do orçamento...");const f=fe(oe(q,"budgetInvitations"),ne("budgetId","==",n)),v=await he(f),b=v.docs.map(D=>Qe(D.ref));await Promise.all(b),console.log(`✅ ${v.docs.length} convites excluídos`),console.log("🗑️ Excluindo o orçamento...");const T=qe(q,"budgets",n);if(await Qe(T),console.log("✅ Orçamento excluído"),window.appState.budgets=window.appState.budgets.filter(D=>D.id!==n),o){const D=window.appState.budgets.filter(L=>L.userId===e.uid);D.length>0?(await lc(D[0]),console.log("✅ Novo orçamento selecionado:",D[0].nome)):(window.appState.currentBudget=null,window.appState.transactions=[],window.appState.categories=[],window.appState.recorrentes=[],console.log("ℹ️ Nenhum orçamento restante"))}return B({message:`Orçamento "${t.nome}" excluído com sucesso!`,type:"success"}),console.log("✅ Exclusão do orçamento concluída com sucesso"),!0}catch(e){throw console.error("❌ Erro ao excluir orçamento:",e),B({message:`Erro ao excluir orçamento: ${e.message}`,type:"error"}),e}};window.resetTransactionsOnly=async function(n){try{const e=window.appState.currentUser;if(!e)throw new Error("Usuário não autenticado");console.log("🔄 Iniciando reset de transações do orçamento:",n);const t=window.appState.budgets.find(c=>c.id===n);if(!t)throw new Error("Orçamento não encontrado");if(t.userId!==e.uid)throw new Error("Você não tem permissão para resetar este orçamento");console.log("🔄 Removendo transações do orçamento...");const o=fe(oe(q,"transactions"),ne("budgetId","==",n)),r=await he(o),a=r.docs.map(c=>Qe(c.ref));if(await Promise.all(a),console.log(`✅ ${r.docs.length} transações removidas`),window.appState.currentBudget?.id===n){window.appState.transactions=window.appState.transactions.filter(l=>l.budgetId!==n);const c=window.location.hash.replace("#","")||"/";c==="/"?await renderDashboard():c==="/transactions"&&Wa()}return B({message:`Transações do orçamento "${t.nome}" foram removidas com sucesso! Categorias e recorrentes foram mantidas.`,type:"success"}),console.log("✅ Reset de transações concluído com sucesso"),!0}catch(e){throw console.error("❌ Erro ao resetar transações:",e),B({message:`Erro ao resetar transações: ${e.message}`,type:"error"}),e}};window.resetBudget=async function(n){try{const e=window.appState.currentUser;if(!e)throw new Error("Usuário não autenticado");console.log("🔄 Iniciando reset do orçamento:",n);const t=window.appState.budgets.find(h=>h.id===n);if(!t)throw new Error("Orçamento não encontrado");if(t.userId!==e.uid)throw new Error("Você não tem permissão para resetar este orçamento");console.log("🔄 Removendo transações do orçamento...");const o=fe(oe(q,"transactions"),ne("budgetId","==",n)),r=await he(o),a=r.docs.map(h=>Qe(h.ref));await Promise.all(a),console.log(`✅ ${r.docs.length} transações removidas`),console.log("🔄 Removendo recorrentes do orçamento...");const s=fe(oe(q,"recorrentes"),ne("budgetId","==",n)),c=await he(s),l=c.docs.map(h=>Qe(h.ref));if(await Promise.all(l),console.log(`✅ ${c.docs.length} recorrentes removidas`),window.appState.currentBudget?.id===n){window.appState.transactions=window.appState.transactions.filter(g=>g.budgetId!==n),window.appState.recorrentes=window.appState.recorrentes.filter(g=>g.budgetId!==n);const h=window.location.hash.replace("#","")||"/";h==="/"?await renderDashboard():h==="/transactions"?Wa():h==="/recorrentes"&&await ja()}return B({message:`Orçamento "${t.nome}" foi resetado com sucesso! Todas as transações e recorrentes foram removidas.`,type:"success"}),console.log("✅ Reset do orçamento concluído com sucesso"),!0}catch(e){throw console.error("❌ Erro ao resetar orçamento:",e),B({message:`Erro ao resetar orçamento: ${e.message}`,type:"error"}),e}};async function Tn(){try{const n=window.appState.currentUser;if(!n)return[];console.log("🔍 Carregando orçamentos para usuário:",n.uid);const e=fe(oe(q,"budgets"),ne("userId","==",n.uid)),t=fe(oe(q,"budgets"),ne("usuariosPermitidos","array-contains",n.uid));console.log("🔍 Executando queries de orçamentos...");const[o,r]=await Promise.all([he(e),he(t)]),a=o.docs.map(l=>({id:l.id,...l.data(),isOwner:!0})),s=r.docs.map(l=>({id:l.id,...l.data(),isOwner:!1})),c=[...a];return s.forEach(l=>{c.find(d=>d.id===l.id)||c.push(l)}),console.log("📊 Orçamentos carregados:",{total:c.length,own:a.length,shared:s.length,budgets:c.map(l=>({id:l.id,nome:l.nome,isOwner:l.isOwner}))}),window.appState.budgets=c,c}catch(n){return console.error("❌ Erro ao carregar orçamentos:",n),[]}}function lc(n){window.appState.currentBudget=n,localStorage.setItem("currentBudgetId",n.id),console.log("✅ Orçamento atual definido:",n.nome)}window.setCurrentBudget=async function(n){if(!n){console.log("❌ Budget não fornecido para setCurrentBudget");return}console.log("🔄 Selecionando orçamento:",n.nome,n.id),lc(n),window.stopAllListeners&&window.stopAllListeners(),window.startAllListeners&&await window.startAllListeners(n.id),await Promise.all([window.loadTransactions?window.loadTransactions():Promise.resolve(),window.loadCategories?window.loadCategories():Promise.resolve(),window.loadRecorrentes?window.loadRecorrentes():Promise.resolve(),window.loadNotifications?window.loadNotifications():Promise.resolve()]);const e=window.location.hash.replace("#","")||"/dashboard";switch(console.log("🔄 Atualizando rota atual:",e),e){case"/dashboard":window.renderDashboard&&await window.renderDashboard();break;case"/transactions":window.renderTransactions&&await window.renderTransactions();break;case"/categories":window.renderCategories&&await window.renderCategories();break;case"/notifications":window.renderNotifications&&await window.renderNotifications();break;case"/settings":window.renderSettings&&await window.renderSettings();break;default:window.renderDashboard&&await window.renderDashboard()}console.log("✅ Orçamento selecionado e todas as abas atualizadas")};async function dc(){try{if(!window.appState.currentUser)return;const e=localStorage.getItem("currentBudgetId");if(e){const r=window.appState.budgets.find(a=>a.id===e);if(r){await window.setCurrentBudget(r);return}}if(window.appState.budgets.length>0){await window.setCurrentBudget(window.appState.budgets[0]);return}console.log("📝 Criando orçamento padrão...");const o=await Ha({nome:"Orçamento Principal",descricao:"Orçamento padrão criado automaticamente",valor:0,tipo:"mensal"});if(o){await Tn();const r=window.appState.budgets.find(a=>a.id===o);r&&await window.setCurrentBudget(r)}}catch(n){console.error("❌ Erro ao selecionar orçamento padrão:",n)}}async function Ga(){try{if(!window.appState.currentUser)return[];const e=window.appState.currentBudget;if(!e)return[];const t=fe(oe(q,"recorrentes"),ne("budgetId","==",e.id)),r=(await he(t)).docs.map(a=>({id:a.id,...a.data()}));return window.appState.recorrentes=r,r}catch(n){return console.error("❌ Erro ao carregar recorrentes:",n),[]}}async function xE(n,e,t){try{console.log(`🔍 Buscando transações para: ${e}/${t}`);const o=window.appState.currentBudget;if(!o)return console.log("⚠️ Nenhum orçamento ativo"),[];const r=fe(oe(q,"transactions"),ne("budgetId","==",o.id)),s=(await he(r)).docs.map(l=>({id:l.id,...l.data()}));console.log(`📊 Total de transações encontradas: ${s.length}`);const c=s.filter(l=>{if(!l.createdAt)return!1;let d;l.createdAt&&typeof l.createdAt=="object"&&l.createdAt.seconds?d=new Date(l.createdAt.seconds*1e3):d=new Date(l.createdAt);const h=d.getFullYear(),g=d.getMonth()+1;return h===e&&g===t});return console.log(`✅ Transações filtradas para ${e}/${t}: ${c.length}`),c}catch(o){return console.error("❌ Erro ao buscar transações do mês:",o),[]}}async function TE(n,e){if(window.isRenderingDashboard){console.log("🔄 Dashboard já está sendo renderizado, pulando...");return}if(window.isRenderingDashboard=!0,!window.appState?.currentUser){console.warn("⚠️ Usuário não autenticado, renderizando dashboard vazio"),window.isRenderingDashboard=!1;return}try{const t=document.getElementById("app-content");if(!t){console.warn("⚠️ Elemento #app-content não encontrado");return}const o=new Date,r=n||o.getFullYear(),a=e||o.getMonth()+1,s=["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"],c=window.appState.currentUser;let l=c?await xE(c.uid,r,a):[];console.log(`📊 Dashboard ${r}/${a}: ${l.length} transações carregadas`),console.log("📊 Estado atual:",{user:!!c,budget:!!window.appState.currentBudget,transactions:window.appState.transactions?.length||0,categories:window.appState.categories?.length||0,recorrentes:window.appState.recorrentes?.length||0}),r===o.getFullYear()&&a===o.getMonth()+1&&window.appState.transactions&&window.appState.transactions.length>0&&(l=window.appState.transactions,console.log(`🔄 Usando transações do appState para mês atual: ${l.length}`));const d=l.filter(P=>P.tipo==="receita").reduce((P,X)=>P+parseFloat(X.valor),0),h=l.filter(P=>P.tipo==="despesa").reduce((P,X)=>P+parseFloat(X.valor),0),g=window.appState.recorrentes||[],f=l.filter(P=>P.recorrenteId).map(P=>{const X=g.find(z=>z.id===P.recorrenteId);if(!X)return console.warn(`⚠️ Transação órfã encontrada: ${P.descricao} (recorrenteId: ${P.recorrenteId})`),null;let k=P.parcelaAtual,N=P.parcelasTotal;return(!k||!N)&&(N=X.parcelasTotal,window.calcularParcelaRecorrente?k=window.calcularParcelaRecorrente(X,r,a):k=1),{...X,efetivada:!0,parcelaAtual:k,parcelasTotal:N,transacaoId:P.id,valor:P.valor}}).filter(P=>P!==null),v=g.filter(P=>{if(f.some(ge=>ge.id===P.id))return!1;const[k,N,z]=P.dataInicio.split("-").map(Number),H=new Date(k,N-1,z),ce=H.getFullYear(),Te=H.getMonth()+1;if(r<ce||r===ce&&a<Te||!P.efetivarMesAtual&&r===ce&&a===Te)return!1;if(P.parcelasRestantes!==null&&P.parcelasRestantes!==void 0){let ge=(r-ce)*12+(a-Te);return!P.efetivarMesAtual&&(r>ce||r===ce&&a>Te)&&(ge-=1),P.parcelasRestantes-ge>0}return!0}),b=[...f,...v],T=f.reduce((P,X)=>P+parseFloat(X.valor),0),D=v.reduce((P,X)=>P+parseFloat(X.valor),0),L=T+D,O=h+L,Q=d-O,ie=(window.appState.categories?.filter(P=>P.tipo==="despesa")||[]).reduce((P,X)=>P+parseFloat(X.limite||0),0),x=ie-O,y=ie>0?O/ie:0,E=window.appState.categories?.filter(P=>{if(P.tipo!=="despesa")return!1;const k=l.filter(H=>H.categoriaId===P.id&&H.tipo===P.tipo).reduce((H,ce)=>H+parseFloat(ce.valor),0),N=parseFloat(P.limite||0),z=N>0?k/N:0;return N>0&&z>.7})||[],S=y>.7?"Orçado geral em alerta":null,I=E.length+(S?1:0),A=window.appState.categories.filter(P=>P.tipo==="despesa").map(P=>{const k=(l||[]).filter(N=>N.categoriaId===P.id&&N.tipo===P.tipo).reduce((N,z)=>N+parseFloat(z.valor),0);return{...P,gasto:k}}).filter(P=>P.gasto>0).sort((P,X)=>X.gasto-P.gasto).slice(0,5),{CardResumo:_}=await pe(async()=>{const{CardResumo:P}=await import("./CardResumo-B04_66Kb.js");return{CardResumo:P}},[]),Pe=`
      <div class="tab-container">
        <div class="tab-header">
          <h2 class="tab-title-highlight">Dashboard Financeiro</h2>
          <div class="flex gap-2">
            <button id="theme-toggle-btn" class="btn-secondary">
              <span>🎨</span>
            </button>
          </div>
        </div>
        <div id="mes-selector" class="flex items-center justify-center gap-4 mb-6 w-full">
          <button id="mes-anterior" class="text-blue-600 bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center text-xl hover:bg-blue-200 active:bg-blue-300 transition-all duration-200 touch-manipulation">‹</button>
          <span class="font-bold text-xl text-gray-800 dark:text-gray-100">${s[a-1]} ${r}</span>
          <button id="mes-proximo" class="text-blue-600 bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center text-xl hover:bg-blue-200 active:bg-blue-300 transition-all duration-200 touch-manipulation">›</button>
        </div>
        <div class="tab-content">
          <div class="content-spacing" id="dashboard-content">
            <!-- RESUMO FINANCEIRO PRINCIPAL -->
            <div class="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl shadow-xl p-6 mb-6 text-white">
              <div class="flex items-center justify-between mb-6">
                <h2 class="text-2xl font-bold">Resumo Financeiro</h2>
                <div id="digital-clock" class="text-lg font-mono bg-white bg-opacity-20 rounded-lg px-3 py-1">
                  --:--
                </div>
              </div>
              
              <!-- Cards de Resumo Simplificados -->
              <div id="cards-container" class="grid grid-cols-2 md:grid-cols-3 gap-4">
                <!-- Os cartões serão inseridos dinamicamente aqui -->
              </div>
            </div>

            <!-- TOP 5 CATEGORIAS -->
            <div class="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-2 md:p-6 border border-gray-300 dark:border-gray-700 mb-4">
              <div class="flex flex-wrap justify-between items-center mb-2 md:mb-4 gap-1 md:gap-0">
                <h3 class="text-base md:text-xl font-bold text-gray-900 dark:text-gray-100">📊 TOP 5 CATEGORIAS</h3>
              </div>
              <div class="space-y-3">
                ${A.length===0?'<p class="text-gray-500 text-center py-4">Todas as categorias de despesa já possuem gastos neste mês</p>':A.slice(0,5).map(P=>{const X=window.appState.categories?.find(H=>H.id===P.id),k=X?.limite?parseFloat(X.limite):0,N=k>0?Math.min(P.gasto/k*100,100):0;let z="bg-green-500";return N>=90?z="bg-red-500":N>=75?z="bg-yellow-500":N>=50&&(z="bg-orange-500"),`
                      <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-3 border border-gray-200 dark:border-gray-700">
                        <div class="flex items-center justify-between mb-2">
                          <div class="flex items-center space-x-2">
                            <div class="w-3 h-3 rounded-full" style="background-color: ${X?.cor||"#4F46E5"}"></div>
                            <span class="font-medium text-sm md:text-base text-gray-900 dark:text-gray-100">${P.nome}</span>
                          </div>
                          <span class="font-bold text-sm md:text-base ${P.gasto>k?"text-red-600":"text-gray-900 dark:text-gray-100"}">
                            R$ ${P.gasto.toFixed(2)}
                          </span>
                        </div>
                        ${k>0?`
                          <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
                            <span>${N.toFixed(0)}%</span>
                          </div>
                          <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                            <div class="${z} h-2 rounded-full transition-all duration-300" style="width: ${N}%"></div>
                          </div>
                        `:'<p class="text-xs text-gray-500 dark:text-gray-400">Sem limite definido</p>'}
                      </div>
                    `}).join("")}
              </div>
            </div>

            <!-- CATEGORIAS COM LIMITES -->
            <div class="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-2 md:p-6 border border-gray-300 dark:border-gray-700 mb-4">
              <div class="flex flex-wrap justify-between items-center mb-2 md:mb-4 gap-1 md:gap-0">
                <h3 class="text-base md:text-xl font-bold text-gray-900 dark:text-gray-100">📂 Categorias com Limites</h3>
                <button onclick="window.showAddCategoryModal && window.showAddCategoryModal()" class="btn-primary">
                  + Nova Categoria
                </button>
              </div>
              <div class="space-y-3">
                ${(window.appState.categories||[]).length===0?'<p class="text-gray-500 text-center py-4">Nenhuma categoria encontrada</p>':(window.appState.categories||[]).filter(P=>P.limite>0).map(P=>{const k=(l||[]).filter(N=>N.categoriaId===P.id&&N.tipo===P.tipo).reduce((N,z)=>N+parseFloat(z.valor),0);return{...P,gasto:k}}).sort((P,X)=>X.gasto-P.gasto).map(P=>{const X=parseFloat(P.limite||0),k=X>0?Math.min(P.gasto/X*100,100):0;let N="bg-green-500";return k>=90?N="bg-red-500":k>=75?N="bg-yellow-500":k>=50&&(N="bg-orange-500"),`
                      <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-3 border border-gray-200 dark:border-gray-700">
                        <div class="flex items-center justify-between mb-2">
                          <div class="flex items-center space-x-2">
                            <div class="w-3 h-3 rounded-full" style="background-color: ${P.cor||"#4F46E5"}"></div>
                            <span class="font-medium text-sm md:text-base text-gray-900 dark:text-gray-100">${P.nome}</span>
                          </div>
                          <span class="font-bold text-sm md:text-base ${P.gasto>X?"text-red-600":"text-gray-900 dark:text-gray-100"}">
                            R$ ${P.gasto.toFixed(2)}
                          </span>
                        </div>
                        ${X>0?`
                          <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
                            <span>Limite: R$ ${X.toFixed(2)}</span>
                            <span>${k.toFixed(1)}% usado</span>
                          </div>
                          <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                            <div class="${N} h-2 rounded-full transition-all duration-300" style="width: ${k}%"></div>
                          </div>
                        `:'<p class="text-xs text-gray-500 dark:text-gray-400">Sem limite definido</p>'}
                      </div>
                    `}).join("")}
              </div>
            </div>

            <!-- DESPESAS RECORRENTES DO MÊS -->
            <div class="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-2 md:p-6 border border-gray-300 dark:border-gray-700 mb-4">
              <div class="flex flex-wrap justify-between items-center mb-2 md:mb-4 gap-1 md:gap-0">
                <h3 class="text-base md:text-xl font-bold text-gray-900 dark:text-gray-100">Despesas Recorrentes do Mês</h3>
                <button onclick="window.showAddRecorrenteModal && window.showAddRecorrenteModal()" class="btn-primary">
                  + Nova Despesa Recorrente
                </button>
              </div>
              <div class="space-y-2 md:space-y-3">
                ${b.length===0?'<p class="text-gray-500 text-center py-4">Nenhuma despesa recorrente aplicada ou agendada neste mês</p>':b.slice(0,5).map(P=>{const X=window.appState.categories?.find(k=>k.id===P.categoriaId);return`
                      <div class="flex flex-wrap justify-between items-center p-2 md:p-3 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 gap-1 md:gap-0 bg-white dark:bg-gray-900">
                        <div class="flex-1 min-w-[120px]">
                          <p class="font-medium text-xs md:text-base text-gray-900 dark:text-gray-100">${P.descricao}</p>
                          <p class="text-xs md:text-sm text-gray-500 dark:text-gray-300">
                            ${X?.nome||"Sem categoria"} • Recorrente
                            ${(()=>{if(P.efetivada){let k=P.parcelaAtual,N=P.parcelasTotal;return(!k||!N)&&(window.calcularParcelaRecorrente&&P.parcelasTotal>1?(k=window.calcularParcelaRecorrente(P,r,a),N=P.parcelasTotal):(k=1,N=P.parcelasTotal||1)),N&&N>1?` • ✅ Efetivada: ${k} de ${N}`:" • ✅ Efetivada: Infinito"}else{if(!P.parcelasTotal||P.parcelasTotal<=1)return" • 📅 Agendada: Infinito";{const k=window.calcularStatusRecorrente?window.calcularStatusRecorrente(P,window.appState.transactions||[],r,a):{parcelaAtual:1,totalParcelas:P.parcelasTotal,foiEfetivadaEsteMes:!1};return` • 📅 Agendada: ${k.parcelaAtual} de ${k.totalParcelas}`}}})()}
                          </p>
                        </div>
                        <div class="flex items-center space-x-1 md:space-x-2">
                          <span class="font-bold text-xs md:text-base text-red-600">
                            -R$ ${parseFloat(P.valor).toFixed(2)}
                          </span>
                          <!-- Botões de Ação -->
                          <div class="flex items-center space-x-1 ml-2">
                            <button onclick="editarRecorrente('${P.id}')" class="btn-icon-small" title="Editar recorrente">
                              ✏️
                            </button>
                            ${P.efetivada?"":`
                              <button onclick="efetivarRecorrente('${P.id}')" class="btn-icon-small" title="Efetivar agora">
                                ✅
                              </button>
                            `}
                            <button onclick="atualizarRecorrente('${P.id}')" class="btn-icon-small" title="Atualizar status">
                              🔄
                            </button>
                            <button onclick="excluirRecorrente('${P.id}')" class="btn-icon-small" title="Excluir recorrente">
                              🗑️
                            </button>
                            <button onclick="historicoRecorrente('${P.id}')" class="btn-icon-small" title="Ver histórico">
                              📊
                            </button>
                          </div>
                        </div>
                      </div>
                    `}).join("")}
              </div>
            </div>

            <!-- TRANSAÇÕES RECENTES -->
            <div class="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-2 md:p-6 border border-gray-300 dark:border-gray-700">
              <div class="flex flex-wrap justify-between items-center mb-2 md:mb-4 gap-1 md:gap-0">
                <h3 class="text-base md:text-xl font-bold text-gray-900 dark:text-gray-100">Transações Recentes</h3>
                <button onclick="showAddTransactionModal()" class="btn-primary">
                  + Nova Transação
                </button>
              </div>
              <div class="space-y-2 md:space-y-3">
                ${l.length===0?'<p class="text-gray-500 text-center py-4">Nenhuma transação encontrada neste mês</p>':l.slice(0,10).map(P=>{const X=window.appState.categories?.find(N=>N.id===P.categoriaId);let k="";if(P.recorrenteId){const N=window.appState.recorrentes?.find(z=>z.id===P.recorrenteId);if(N)if(N.parcelasTotal&&N.parcelasTotal>1){const z=window.calcularStatusRecorrente?window.calcularStatusRecorrente(N,window.appState.transactions||[],r,a):{parcelaAtual:1,totalParcelas:N.parcelasTotal,foiEfetivadaEsteMes:!1};z.foiEfetivadaEsteMes?k=` • ✅ Efetivada: ${z.parcelaAtual} de ${z.totalParcelas}`:k=` • 📅 Agendada: ${z.parcelaAtual} de ${z.totalParcelas}`}else k=" • Infinito";else k=" • Recorrente"}return`
                      <div class="flex flex-wrap justify-between items-center p-2 md:p-3 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 gap-1 md:gap-0 bg-white dark:bg-gray-900">
                        <div class="flex-1 min-w-[120px]">
                          <p class="font-medium text-xs md:text-base text-gray-900 dark:text-gray-100">${P.descricao}</p>
                          <p class="text-xs md:text-sm text-gray-500 dark:text-gray-300">
                            ${X?.nome||"Sem categoria"} • ${P.createdAt&&P.createdAt.toDate?P.createdAt.toDate().toLocaleDateString():P.createdAt?new Date(P.createdAt).toLocaleDateString():""}
                            ${P.recorrenteId?" • Recorrente"+k:""}
                          </p>
                        </div>
                        <div class="flex items-center space-x-1 md:space-x-2">
                          <span class="font-bold text-xs md:text-base ${P.tipo==="receita"?"text-green-600":"text-red-600"}">
                            ${P.tipo==="receita"?"+":"-"}R$ ${parseFloat(P.valor).toFixed(2)}
                          </span>
                          <button onclick="window.editTransaction && window.editTransaction('${P.id}')" class="text-blue-600 hover:text-blue-800 text-xs md:text-base ml-2">✏️</button>
                          <button onclick="window.deleteTransactionWithConfirmation && window.deleteTransactionWithConfirmation('${P.id}', '${P.descricao.replace(/'/g,"\\'")}')" class="text-red-600 hover:text-red-800 text-xs md:text-base ml-2">🗑️</button>
                        </div>
                      </div>
                    `}).join("")}
              </div>
            </div>
          </div>
        </div>
      </div>
    `;t.innerHTML=Pe,setTimeout(()=>{const P=document.getElementById("cards-container");if(P){P.innerHTML="";const X=_({titulo:"Receitas",valor:`R$ ${d.toFixed(2)}`,cor:"card-resumo receita",icone:"💰",receitas:d,despesas:O});P.appendChild(X);const k=_({titulo:"Despesas",valor:`R$ ${O.toFixed(2)}`,cor:"card-resumo despesa",icone:"🛒",receitas:d,despesas:O});P.appendChild(k);const N=_({titulo:"Saldo",valor:`R$ ${Q.toFixed(2)}`,cor:"card-resumo saldo",icone:"💳",receitas:d,despesas:O});P.appendChild(N);const z=_({titulo:"Orçado",valor:`R$ ${ie.toFixed(2)}`,cor:"card-resumo orcado",icone:"📊",progresso:y,status:I>0?"alerta":"ok",alerta:I>0?`${I} alertas`:null,receitas:d,despesas:O});P.appendChild(z)}},50),setTimeout(()=>{console.log("🔧 Dashboard: Chamando setupDashboardButtons..."),jE()},300),hn()}catch(t){console.error("Erro ao renderizar dashboard:",t);const o=document.getElementById("app-content");o&&(o.innerHTML='<div class="text-red-600 text-center mt-4">Erro ao carregar dashboard. Tente novamente.</div>')}finally{window.isRenderingDashboard=!1,setTimeout(()=>{typeof ii=="function"&&ii()},100)}}function SE(){const n=document.getElementById("modal-alertas");n&&n.classList.add("hidden")}function Wa(){if(console.log("🔄 renderTransactions chamada"),console.log("🔄 window.renderCleanTransactions existe?",!!window.renderCleanTransactions),window.renderCleanTransactions){console.log("✅ Usando design limpo das transações"),window.renderCleanTransactions();return}const n=document.getElementById("app-content");n.innerHTML=`
    <div class="text-center py-8">
      <div class="text-4xl mb-4">❌</div>
      <div class="text-lg font-semibold text-gray-800 dark:text-white mb-2">Erro ao carregar transações</div>
      <div class="text-gray-600 dark:text-gray-400">O módulo de transações não está disponível</div>
    </div>
  `}function IE(n){return n.recorrenteId?1:null}async function uc(){if(window.renderCleanCategories){await window.renderCleanCategories();return}await dr(),await Ga();const n=document.getElementById("app-content"),e=new Date,t=e.getFullYear(),o=e.getMonth()+1,r=window.appState.categories.map(a=>{const c=window.appState.transactions.filter(b=>{let T;b.createdAt&&typeof b.createdAt=="object"&&b.createdAt.seconds?T=new Date(b.createdAt.seconds*1e3):T=new Date(b.createdAt);const D=T.getFullYear(),L=T.getMonth()+1;return b.categoriaId===a.id&&b.tipo===a.tipo&&D===t&&L===o}).reduce((b,T)=>b+parseFloat(T.valor),0),l=window.appState.recorrentes.filter(b=>b.categoriaId===a.id&&b.ativa===!0);let d=0;l.forEach(b=>{window.appState.transactions.filter(D=>D.recorrenteId===b.id&&new Date(D.createdAt).getFullYear()===t&&new Date(D.createdAt).getMonth()+1===o).length>0&&(d+=parseFloat(b.valor))});const h=c+d,g=a.limite?parseFloat(a.limite):0,m=(a.tipo==="receita",g-h),f=g>0?Math.min(h/g*100,100):0;let v="bg-green-500";return f>=90?v="bg-red-500":f>=75?v="bg-yellow-500":f>=50&&(v="bg-orange-500"),{...a,totalGasto:h,totalGastoTransacoes:c,totalGastoRecorrentes:d,limite:g,saldo:m,porcentagem:f,corBarra:v}}).sort((a,s)=>s.totalGasto-a.totalGasto);n.innerHTML=`
    <div class="tab-container">
      <div class="tab-header">
        <h2 class="tab-title-highlight">Categorias</h2>
        <div class="flex gap-2">
          <button onclick="window.migrarTransacoesAntigas()" class="btn-secondary">
            <span>🔄 Migrar</span>
          </button>
          <button onclick="window.corrigirTipoCategoria()" class="btn-secondary">
            <span>🔧 Corrigir</span>
          </button>
          <button id="add-category-btn" class="btn-primary">
            <span>+ Nova Categoria</span>
          </button>
        </div>
      </div>
      <div class="tab-content">
        <div class="content-spacing">
          <!-- Filtro de pesquisa -->
          <div class="mb-4">
            <div class="relative">
              <input 
                type="text" 
                id="category-search" 
                placeholder="🔍 Pesquisar categorias..." 
                class="w-full px-4 py-2 pl-10 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span class="text-gray-400">🔍</span>
              </div>
            </div>
            <div id="category-search-results" class="mt-2 text-sm text-gray-600 dark:text-gray-400 hidden">
              <span id="category-search-count">0</span> categoria(s) encontrada(s)
            </div>
          </div>
          
          <div id="categories-grid" class="grid grid-cols-1 md:grid-cols-2 gap-4">
            ${r.map(a=>`
            <div class="card-standard">
              <div class="flex items-center space-x-3 mb-3">
                <div class="w-4 h-4 rounded-full" style="background-color: ${a.cor||"#4F46E5"}"></div>
                <span class="list-item-title">${a.nome}</span>
              </div>
              <p class="list-item-subtitle">Tipo: ${a.tipo}</p>
              
              ${a.limite>0?`
                <div class="mt-3 space-y-2">
                  <div class="flex justify-between text-xs md:text-sm">
                    <span class="text-gray-600 dark:text-gray-400">Limite:</span>
                    <span class="font-medium text-gray-900 dark:text-gray-100">R$ ${a.limite.toFixed(2)}</span>
                  </div>
                  <div class="flex justify-between text-xs md:text-sm">
                    <span class="text-gray-600 dark:text-gray-400">${a.tipo==="receita"?"Receita":"Gasto"}:</span>
                    <span class="font-medium ${a.tipo==="receita"?"text-green-600":a.totalGasto>a.limite?"text-red-600":"text-gray-900 dark:text-gray-100"}">R$ ${a.totalGasto.toFixed(2)}</span>
                  </div>
                  ${a.totalGasto>0?`
                    <div class="text-xs text-gray-500 dark:text-gray-400 pl-2">
                      • Transações: R$ ${a.totalGastoTransacoes.toFixed(2)}
                      ${a.totalGastoRecorrentes>0?`<br>• Recorrentes: R$ ${a.totalGastoRecorrentes.toFixed(2)}`:""}
                    </div>
                  `:""}
                  <div class="flex justify-between text-xs md:text-sm">
                    <span class="text-gray-600 dark:text-gray-400">${a.tipo==="receita"?"Falta para meta":"Saldo"}:</span>
                    <span class="font-medium ${a.tipo==="receita"?a.saldo<=0?"text-green-600":a.saldo<a.limite*.25?"text-yellow-600":"text-red-600":a.saldo<0?"text-red-600":a.saldo<a.limite*.25?"text-yellow-600":"text-green-600"}">R$ ${a.saldo.toFixed(2)}</span>
                  </div>
                  
                  <!-- Barra de Progresso -->
                  <div class="mt-2">
                    <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
                      <span>${a.porcentagem.toFixed(1)}% ${a.tipo==="receita"?"atingido":"usado"}</span>
                      <span>${a.porcentagem>=100?a.tipo==="receita"?"Meta atingida!":"Limite excedido!":""}</span>
                    </div>
                    <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div class="${a.corBarra} h-2 rounded-full transition-all duration-300" style="width: ${Math.min(a.porcentagem,100)}%"></div>
                    </div>
                  </div>
                </div>
              `:`
                <div class="mt-3">
                  <div class="flex justify-between text-xs md:text-sm">
                    <span class="text-gray-600 dark:text-gray-400">${a.tipo==="receita"?"Receita":"Gasto"} do mês:</span>
                    <span class="font-medium ${a.tipo==="receita"?"text-green-600":"text-gray-900 dark:text-gray-100"}">R$ ${a.totalGasto.toFixed(2)}</span>
                  </div>
                  ${a.totalGasto>0?`
                    <div class="text-xs text-gray-500 dark:text-gray-400 pl-2">
                      • ${a.tipo==="receita"?"Receitas":"Transações"}: R$ ${a.totalGastoTransacoes.toFixed(2)}
                      ${a.totalGastoRecorrentes>0?`<br>• Recorrentes: R$ ${a.totalGastoRecorrentes.toFixed(2)}`:""}
                    </div>
                  `:""}
                  <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">Sem limite definido</p>
                </div>
              `}
              
              <div class="flex flex-wrap justify-end gap-1 sm:gap-2 mt-4">
                <button onclick="editCategory('${a.id}')" class="btn-secondary mobile-btn">
                  <span class="icon-standard">✏️</span>
                  <span class="hidden sm:inline">Editar</span>
                </button>
                <button onclick="window.deleteCategoryWithConfirmation('${a.id}', '${a.nome}')" class="btn-danger mobile-btn">
                  <span class="icon-standard">🗑️</span>
                  <span class="hidden sm:inline">Excluir</span>
                </button>
                <button onclick="showCategoryHistory('${a.id}')" class="btn-secondary mobile-btn">
                  <span class="icon-standard">📊</span>
                  <span class="hidden sm:inline">Histórico</span>
                </button>
              </div>
            </div>
          `).join("")}
          </div>
        </div>
      </div>
    </div>
  `,setTimeout(()=>{qE()},100),AE(),hn()}function AE(){const n=document.getElementById("category-search"),e=document.getElementById("category-search-results"),t=document.getElementById("category-search-count"),o=document.getElementById("categories-grid");n&&(n.addEventListener("input",function(){const r=this.value.toLowerCase().trim();if(r===""){e.classList.add("hidden"),o.innerHTML=kE();return}const a=window.appState.categories?.filter(s=>{const c=s.nome.toLowerCase(),l=s.tipo.toLowerCase(),d=s.limite?.toString()||"";return c.includes(r)||l.includes(r)||d.includes(r)})||[];t.textContent=a.length,e.classList.remove("hidden"),o.innerHTML=CE(a)}),n.addEventListener("keydown",function(r){r.key==="Escape"&&(this.value="",this.dispatchEvent(new Event("input")))}))}function kE(){const n=new Date,e=n.getFullYear(),t=n.getMonth()+1;return window.appState.categories.map(r=>{const s=window.appState.transactions.filter(v=>{let b;v.createdAt&&typeof v.createdAt=="object"&&v.createdAt.seconds?b=new Date(v.createdAt.seconds*1e3):b=new Date(v.createdAt);const T=b.getFullYear(),D=b.getMonth()+1;return v.categoriaId===r.id&&v.tipo===r.tipo&&T===e&&D===t}).reduce((v,b)=>v+parseFloat(b.valor),0),c=window.appState.recorrentes.filter(v=>v.categoriaId===r.id&&v.ativa===!0);let l=0;c.forEach(v=>{window.appState.transactions.filter(T=>T.recorrenteId===v.id&&new Date(T.createdAt).getFullYear()===e&&new Date(T.createdAt).getMonth()+1===t).length>0&&(l+=parseFloat(v.valor))});const d=s+l,h=r.limite?parseFloat(r.limite):0,g=(r.tipo==="receita",h-d),m=h>0?Math.min(d/h*100,100):0;let f="bg-green-500";return m>=90?f="bg-red-500":m>=75?f="bg-yellow-500":m>=50&&(f="bg-orange-500"),{...r,totalGasto:d,totalGastoTransacoes:s,totalGastoRecorrentes:l,limite:h,saldo:g,porcentagem:m,corBarra:f}}).sort((r,a)=>a.totalGasto-r.totalGasto).map(r=>`
    <div class="card-standard">
      <div class="flex items-center space-x-3 mb-3">
        <div class="w-4 h-4 rounded-full" style="background-color: ${r.cor||"#4F46E5"}"></div>
        <span class="list-item-title">${r.nome}</span>
      </div>
      <p class="list-item-subtitle">Tipo: ${r.tipo}</p>
      
      ${r.limite>0?`
            <div class="mt-3 space-y-2">
              <div class="flex justify-between text-xs md:text-sm">
                <span class="text-gray-600 dark:text-gray-400">Limite:</span>
                <span class="font-medium text-gray-900 dark:text-gray-100">R$ ${r.limite.toFixed(2)}</span>
              </div>
              <div class="flex justify-between text-xs md:text-sm">
                <span class="text-gray-600 dark:text-gray-400">${r.tipo==="receita"?"Receita":"Gasto"}:</span>
                <span class="font-medium ${r.tipo==="receita"?"text-green-600":r.totalGasto>r.limite?"text-red-600":"text-gray-900 dark:text-gray-100"}">R$ ${r.totalGasto.toFixed(2)}</span>
              </div>
              ${r.totalGasto>0?`
                    <div class="text-xs text-gray-500 dark:text-gray-400 pl-2">
                      • Transações: R$ ${r.totalGastoTransacoes.toFixed(2)}
                      ${r.totalGastoRecorrentes>0?`<br>• Recorrentes: R$ ${r.totalGastoRecorrentes.toFixed(2)}`:""}
                    </div>
                  `:""}
              <div class="flex justify-between text-xs md:text-sm">
                <span class="text-gray-600 dark:text-gray-400">${r.tipo==="receita"?"Falta para meta":"Saldo"}:</span>
                <span class="font-medium ${r.tipo==="receita"?r.saldo<=0?"text-green-600":r.saldo<r.limite*.25?"text-yellow-600":"text-red-600":r.saldo<0?"text-red-600":r.saldo<r.limite*.25?"text-yellow-600":"text-green-600"}">R$ ${r.saldo.toFixed(2)}</span>
              </div>
              
              <!-- Barra de Progresso -->
              <div class="mt-2">
                <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
                  <span>${r.porcentagem.toFixed(1)}% ${r.tipo==="receita"?"atingido":"usado"}</span>
                  <span>${r.porcentagem>=100?r.tipo==="receita"?"Meta atingida!":"Limite excedido!":""}</span>
                </div>
                <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div class="${r.corBarra} h-2 rounded-full transition-all duration-300" style="width: ${Math.min(r.porcentagem,100)}%"></div>
                </div>
              </div>
            </div>
          `:`
            <div class="mt-3">
              <div class="flex justify-between text-xs md:text-sm">
                <span class="text-gray-600 dark:text-gray-400">${r.tipo==="receita"?"Receita":"Gasto"} do mês:</span>
                <span class="font-medium ${r.tipo==="receita"?"text-green-600":"text-gray-900 dark:text-gray-100"}">R$ ${r.totalGasto.toFixed(2)}</span>
              </div>
              ${r.totalGasto>0?`
                    <div class="text-xs text-gray-500 dark:text-gray-400 pl-2">
                      • ${r.tipo==="receita"?"Receitas":"Transações"}: R$ ${r.totalGastoTransacoes.toFixed(2)}
                      ${r.totalGastoRecorrentes>0?`<br>• Recorrentes: R$ ${r.totalGastoRecorrentes.toFixed(2)}`:""}
                    </div>
                  `:""}
              <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">Sem limite definido</p>
            </div>
          `}
      
      <div class="flex flex-wrap justify-end gap-1 sm:gap-2 mt-4">
        <button onclick="editCategory('${r.id}')" class="btn-secondary mobile-btn">
          <span class="icon-standard">✏️</span>
          <span class="hidden sm:inline">Editar</span>
        </button>
        <button onclick="window.deleteCategoryWithConfirmation('${r.id}', '${r.nome}')" class="btn-danger mobile-btn">
          <span class="icon-standard">🗑️</span>
          <span class="hidden sm:inline">Excluir</span>
        </button>
        <button onclick="showCategoryHistory('${r.id}')" class="btn-secondary mobile-btn">
          <span class="icon-standard">📊</span>
          <span class="hidden sm:inline">Histórico</span>
        </button>
      </div>
    </div>
  `).join("")}function CE(n){return n.length?n.map(e=>`
    <div class="card-standard">
      <div class="flex items-center space-x-3 mb-3">
        <div class="w-4 h-4 rounded-full" style="background-color: ${e.cor||"#4F46E5"}"></div>
        <span class="list-item-title">${e.nome}</span>
      </div>
      <p class="list-item-subtitle">Tipo: ${e.tipo}</p>
      ${e.limite?`<p class="text-xs text-gray-500 dark:text-gray-400">Limite: R$ ${e.limite.toFixed(2)}</p>`:'<p class="text-xs text-gray-500 dark:text-gray-400">Sem limite definido</p>'}
      
      <div class="flex flex-wrap justify-end gap-1 sm:gap-2 mt-4">
        <button onclick="editCategory('${e.id}')" class="btn-secondary mobile-btn">
          <span class="icon-standard">✏️</span>
          <span class="hidden sm:inline">Editar</span>
        </button>
        <button onclick="window.deleteCategoryWithConfirmation('${e.id}', '${e.nome}')" class="btn-danger mobile-btn">
          <span class="icon-standard">🗑️</span>
          <span class="hidden sm:inline">Excluir</span>
        </button>
        <button onclick="showCategoryHistory('${e.id}')" class="btn-secondary mobile-btn">
          <span class="icon-standard">📊</span>
          <span class="hidden sm:inline">Histórico</span>
        </button>
      </div>
    </div>
  `).join(""):`
      <div class="col-span-full text-center py-8">
        <div class="text-4xl mb-4">🔍</div>
        <div class="text-lg font-semibold text-gray-800 dark:text-white mb-2">Nenhuma categoria encontrada</div>
        <div class="text-gray-600 dark:text-gray-400">Tente usar termos diferentes na pesquisa</div>
      </div>
    `}async function Yo(n){switch(console.log("🔄 Router chamado com path:",n),console.log("🔄 Estado atual:",{currentUser:!!window.appState?.currentUser,currentBudget:!!window.appState?.currentBudget,hash:window.location.hash}),n){case"/dashboard":console.log("🔄 Renderizando dashboard..."),await renderDashboard(),wt("/dashboard"),console.log("✅ Dashboard renderizado");break;case"/transactions":console.log("🔄 Renderizando transações..."),Wa(),wt("/transactions"),console.log("✅ Transações renderizadas");break;case"/categories":console.log("🔄 Renderizando categorias..."),await uc(),wt("/categories"),console.log("✅ Categorias renderizadas");break;case"/analytics":console.log("🔄 Renderizando análises melhoradas..."),await UE(),wt("/analytics"),console.log("✅ Análises melhoradas renderizadas");break;case"/recorrentes":if(console.log("🔄 Renderizando recorrentes melhoradas..."),window.renderCleanRecorrentes){const e=document.getElementById("app-content");e&&window.renderCleanRecorrentes().then(t=>{e.innerHTML="",e.appendChild(t)}).catch(t=>{console.error("❌ Erro ao renderizar recorrentes:",t),window._renderRecorrentes&&window._renderRecorrentes()})}else if(window._renderRecorrentes)window._renderRecorrentes();else{console.log("⚠️ Nenhuma função de recorrentes encontrada, usando fallback");const e=document.getElementById("app-content");e&&(e.innerHTML=`
            <div class="tab-container">
              <div class="tab-header">
                <h2 class="tab-title-highlight">Recorrentes</h2>
                <div class="flex gap-2">
                  <button onclick="window.showAddRecorrenteModal && window.showAddRecorrenteModal()" class="btn-primary">
                    <span>+ Nova Recorrente</span>
                  </button>
                </div>
              </div>
              <div class="tab-content">
                <div class="content-spacing">
                  <div class="text-center py-8">
                    <div class="text-4xl mb-4">🔄</div>
                    <div class="text-lg font-semibold text-gray-800 dark:text-white mb-2">Recorrentes</div>
                    <div class="text-gray-600 dark:text-gray-400">Funcionalidade em desenvolvimento</div>
                  </div>
                </div>
              </div>
            </div>
          `)}hn(),wt("/recorrentes"),console.log("✅ Recorrentes melhoradas renderizadas");break;case"/notifications":if(console.log("🔄 Renderizando notificações melhoradas..."),window.renderCleanNotifications){const e=document.getElementById("app-content");e&&window.renderCleanNotifications().then(t=>{e.innerHTML="",e.appendChild(t)}).catch(t=>{console.error("❌ Erro ao renderizar notificações:",t),window.renderNotifications&&window.loadNotifications().then(()=>{window.renderNotifications()})})}else if(window.renderNotifications)await window.loadNotifications(),window.renderNotifications();else{console.log("⚠️ Nenhuma função de notificações encontrada, usando fallback");const e=document.getElementById("app-content");e&&(e.innerHTML=`
            <div class="tab-container">
              <div class="tab-header">
                <h2 class="tab-title-highlight">Notificações</h2>
              </div>
              <div class="tab-content">
                <div class="content-spacing">
                  <div class="text-center py-8">
                    <div class="text-4xl mb-4">🔔</div>
                    <div class="text-lg font-semibold text-gray-800 dark:text-white mb-2">Notificações</div>
                    <div class="text-gray-600 dark:text-gray-400">Funcionalidade em desenvolvimento</div>
                  </div>
                </div>
              </div>
            </div>
          `)}hn(),wt("/notifications"),console.log("✅ Notificações melhoradas renderizadas");break;case"/settings":if(console.log("🔄 Renderizando configurações..."),window.renderSettings)window.renderSettings();else{console.log("⚠️ Função renderSettings não encontrada, usando fallback");const e=document.getElementById("app-content");e&&(e.innerHTML=`
            <div class="tab-container">
              <div class="tab-header">
                <h2 class="tab-title-highlight">Configurações</h2>
              </div>
              <div class="tab-content">
                <div class="content-spacing">
                  <div class="text-center py-8">
                    <div class="text-4xl mb-4">⚙️</div>
                    <div class="text-lg font-semibold text-gray-800 dark:text-white mb-2">Configurações</div>
                    <div class="text-gray-600 dark:text-gray-400">Funcionalidade em desenvolvimento</div>
                  </div>
                </div>
              </div>
            </div>
          `)}hn(),wt("/settings"),console.log("✅ Configurações renderizadas");break;default:console.log("🔄 Rota não reconhecida, usando dashboard como fallback"),await renderDashboard(),wt("/dashboard"),console.log("✅ Dashboard renderizado (fallback)")}setTimeout(()=>{window.swipeNavigation&&window.swipeNavigation.updateCurrentTabIndex&&(window.swipeNavigation.updateCurrentTabIndex(),window.swipeNavigation.updateSwipeIndicator())},200),setTimeout(()=>{Fp()},300)}function hn(){console.log("🔧 Renderizando FAB corrigido...");const n=document.getElementById("fab-container");if(!n){console.error("❌ Container FAB não encontrado");return}console.log("✅ Container FAB encontrado, criando FAB corrigido...");try{window.currentFAB&&window.currentFAB.cleanup&&(console.log("🧹 Limpando FAB anterior..."),window.currentFAB.cleanup()),n.innerHTML="",console.log("🔧 Criando FAB corrigido...");const e=dE();console.log("🔧 FAB corrigido criado:",e),n.appendChild(e),console.log("🔧 FAB corrigido adicionado ao container"),window.currentFAB=e,console.log("✅ FAB corrigido criado e adicionado ao DOM"),setTimeout(()=>{const t=document.getElementById("fab-main"),o=document.getElementById("fab-container-main"),r=document.getElementById("fab-actions");t?console.log("✅ FAB principal encontrado e visível"):console.error("❌ FAB principal não encontrado"),o?console.log("✅ Container FAB principal encontrado"):console.error("❌ Container FAB principal não encontrado"),r?console.log("✅ Container de ações FAB encontrado"):console.error("❌ Container de ações FAB não encontrado");const a=document.getElementById("fab-transaction"),s=document.getElementById("fab-recorrente"),c=document.getElementById("fab-voice");console.log("🔧 Verificando botões de ação:"),console.log("  - Nova Transação:",!!a),console.log("  - Nova Recorrente:",!!s),console.log("  - Voz:",!!c),console.log("🔧 Verificando funções globais:"),console.log("  - showAddTransactionModal:",typeof window.showAddTransactionModal=="function"),console.log("  - showAddRecorrenteModal:",typeof window.showAddRecorrenteModal=="function"),console.log("  - openVoiceModal:",typeof window.openVoiceModal=="function"),console.log("  - Snackbar:",typeof window.Snackbar=="function")},300)}catch(e){console.error("❌ Erro ao criar FAB corrigido:",e)}}function wt(n){const e=document.getElementById("bottom-nav");e&&(e.innerHTML=`
    <nav class="bottom-nav">
      <a href="#/dashboard" class="nav-btn ${n==="/dashboard"?"active":""}" data-route="/dashboard">
        <span class="nav-icon">📊</span>
        <span class="nav-text">Dashboard</span>
      </a>
      <a href="#/transactions" class="nav-btn ${n==="/transactions"?"active":""}" data-route="/transactions">
        <span class="nav-icon">📋</span>
        <span class="nav-text">Transações</span>
      </a>
      <a href="#/categories" class="nav-btn ${n==="/categories"?"active":""}" data-route="/categories">
        <span class="nav-icon">📂</span>
        <span class="nav-text">Categorias</span>
      </a>
      <a href="#/analytics" class="nav-btn ${n==="/analytics"?"active":""}" data-route="/analytics">
        <span class="nav-icon">📈</span>
        <span class="nav-text">Análises</span>
      </a>
      <a href="#/recorrentes" class="nav-btn ${n==="/recorrentes"?"active":""}" data-route="/recorrentes">
        <span class="nav-icon">🔄</span>
        <span class="nav-text">Recorrentes</span>
      </a>
      <a href="#/notifications" class="nav-btn ${n==="/notifications"?"active":""}" data-route="/notifications">
        <span class="nav-icon">🔔</span>
        <span class="nav-text">Notificações</span>
      </a>
      <a href="#/settings" class="nav-btn ${n==="/settings"?"active":""}" data-route="/settings">
        <span class="nav-icon">⚙️</span>
        <span class="nav-text">Config</span>
      </a>
    </nav>
  `)}function Xo(n){const e=document.getElementById("loading-page");e&&(e.style.display=n?"flex":"none")}function $p(){let n=window.location.hash.slice(1)||"/dashboard";const e=["/dashboard","/transactions","/categories","/analytics","/recorrentes","/notifications","/settings"];function t(l){const d=e.indexOf(n);if(d===-1)return;let h,g="";l==="next"?(h=(d+1)%e.length,g="Próxima aba"):(h=d===0?e.length-1:d-1,g="Aba anterior");const m=e[h];c(`${g}: ${{"/dashboard":"Dashboard","/transactions":"Transações","/categories":"Categorias","/analytics":"Análises","/recorrentes":"Recorrentes","/notifications":"Notificações","/settings":"Configurações"}[m]}`),window.location.hash=m}document.addEventListener("keydown",l=>{if(!(l.target.tagName==="INPUT"||l.target.tagName==="TEXTAREA"))switch(l.key){case"ArrowLeft":l.preventDefault(),t("prev");break;case"ArrowRight":l.preventDefault(),t("next");break}});let o=0,r=0,a=!1;const s=document.createElement("div");s.className="swipe-indicator",s.textContent="Deslize para mudar de aba",document.body.appendChild(s);function c(l){s.textContent=l,s.classList.add("show"),setTimeout(()=>{s.classList.remove("show")},1e3)}document.addEventListener("touchstart",l=>{o=l.touches[0].clientX,r=l.touches[0].clientY,a=!1}),document.addEventListener("touchmove",l=>{if(!o||!r)return;const d=l.touches[0].clientX-o,h=l.touches[0].clientY-r;Math.abs(d)>Math.abs(h)&&Math.abs(d)>50&&(a=!0,l.preventDefault())}),document.addEventListener("touchend",l=>{if(!a||!o)return;const d=l.changedTouches[0].clientX-o;Math.abs(d)>100&&(d>0?t("prev"):t("next")),o=0,r=0,a=!1}),window.addEventListener("hashchange",()=>{const l=window.location.hash.slice(1)||"/dashboard";console.log("🔄 Hash change detectado:",{oldPath:n,newPath:l}),l!==n&&(n=l,console.log("🔄 Navegando para nova rota:",l),Yo(l))}),console.log("🔄 Navegação inicial para:",n),Yo(n)}function RE(){const n=document.getElementById("btn-entrar");n&&n.addEventListener("click",async()=>{try{Xo(!0);const e=await _b();if(e){window.appState.currentUser=e,Ko(!1),$p();try{console.log("📊 Carregando dados do usuário após login..."),await Tn(),await dc(),await dr(),await ur(),await Ga(),await Ka(),await Xa(),await pc(window.appState.currentBudget?.id),console.log("✅ Dados carregados com sucesso após login")}catch(t){console.error("❌ Erro ao carregar dados após login:",t)}await Yo("/dashboard")}}catch(e){console.error("Erro no login:",e),Xo(!1)}})}function PE(){return new Promise(n=>{let e=!0;en.onAuthStateChanged(t=>{t?(console.log("✅ Usuário autenticado:",t.email),window.appState.currentUser=t,Ko(!1),e&&(e=!1,n(!0))):(console.log("❌ Usuário não autenticado"),window.appState.currentUser=null,typeof window.stopAllListeners=="function"&&window.stopAllListeners(),window.appState&&(window.appState.currentBudget=null,window.appState.transactions=[],window.appState.categories=[],window.appState.budgets=[],window.appState.recorrentes=[]),Ko(!0),e&&(e=!1,n(!1)))})})}document.addEventListener("DOMContentLoaded",async()=>{console.log("🚀 Iniciando aplicação...");try{Rn&&(window.mobileEnhancements=Rn,Rn.init(),console.log("📱 Melhorias mobile inicializadas"))}catch(e){console.error("❌ Erro ao inicializar melhorias mobile:",e)}if(window.appState={currentUser:null,currentBudget:null,transactions:[],categories:[],budgets:[],recorrentes:[],isInitialized:!1},Fp(),await PE()){$p(),Xo(!0);try{console.log("📊 Carregando dados do usuário..."),await Tn(),await dc(),await dr(),await ur(),await Ga(),await Ka(),await Xa(),await pc(window.appState.currentBudget?.id),console.log("✅ Dados carregados com sucesso"),await new Promise(e=>setTimeout(e,500)),console.log("🔄 Renderizando dashboard inicial..."),await renderDashboard(),wt("/dashboard"),hn(),console.log("✅ Dashboard inicial renderizado")}catch(e){console.error("❌ Erro ao carregar dados:",e),window.Snackbar&&window.Snackbar({message:"Erro ao carregar dados. Tente recarregar a página.",type:"error"})}finally{Xo(!1)}setTimeout(()=>{try{if(!document.querySelector("#app-content")){console.warn("⚠️ Container #app-content não encontrado, tentando novamente em 500ms..."),setTimeout(()=>{document.querySelector("#app-content")&&(window.swipeNavigation=new qd,console.log("✅ SwipeNavigation inicializado (tentativa 2)"))},500);return}if(!window.appState?.currentUser){console.warn("⚠️ Usuário não autenticado, aguardando...");return}window.swipeNavigation=new qd,console.log("✅ SwipeNavigation inicializado com sucesso"),Rn&&!Rn.isInitialized&&(Rn.reconfigure(),console.log("✅ Melhorias mobile reconfiguradas"))}catch(e){console.error("❌ Erro ao inicializar SwipeNavigation:",e)}},1e3),window.appState.isInitialized=!0}RE(),console.log("✅ Aplicação iniciada com sucesso!")});window.addCategoryWithConfirmation=async function(n){return new Promise((e,t)=>{window.showConfirmationModal({title:"Adicionar Categoria",message:`Deseja adicionar a categoria "${n.nome}"?`,confirmText:"Sim, Adicionar",confirmColor:"bg-green-500 hover:bg-green-600",onConfirm:async()=>{try{const o=await window.addCategory(n);window.Snackbar&&window.Snackbar({message:"✅ Categoria adicionada com sucesso!",type:"success"}),e(o)}catch(o){console.error("❌ Erro ao adicionar categoria:",o),window.Snackbar&&window.Snackbar({message:"Erro ao adicionar categoria: "+o.message,type:"error"}),t(o)}},onCancel:()=>{console.log("❌ Adição de categoria cancelada pelo usuário"),t(new Error("Operação cancelada pelo usuário"))}})})};window.renderDashboard=ha;console.log("✅ Dashboard Limpo integrado e ativado");window.renderDashboardOriginal=TE;window.renderTransactions=Wa;window.renderCategories=uc;window.router=Yo;window.addTransaction=Dp;window.updateTransaction=EE;window.deleteTransaction=Mp;window.addCategory=cc;window.updateCategory=_E;window.deleteCategory=Np;window.addBudget=Ha;window.loadTransactions=dr;window.loadCategories=ur;window.loadBudgets=Tn;function DE(n){console.log("🔧 Editando recorrente:",n);const e=window.appState.recorrentes?.find(t=>t.id===n);if(!e){window.Snackbar&&window.Snackbar.error("Recorrente não encontrada");return}window.showAddRecorrenteModal?window.showAddRecorrenteModal(e):window.Snackbar&&window.Snackbar.error("Modal de edição não disponível")}function ME(n){console.log("✅ Efetivando recorrente:",n);const e=window.appState.recorrentes?.find(t=>t.id===n);if(!e){window.Snackbar&&window.Snackbar.error("Recorrente não encontrada");return}if(e.efetivada){window.Snackbar&&window.Snackbar.warning("Esta recorrente já foi efetivada");return}if(confirm(`Efetivar a recorrente "${e.descricao}" agora?`)){const t={id:Date.now().toString(),descricao:e.descricao,valor:e.valor,categoriaId:e.categoriaId,data:new Date().toISOString().split("T")[0],tipo:"despesa",recorrenteId:e.id};window.appState.transactions=window.appState.transactions||[],window.appState.transactions.push(t),e.efetivada=!0,e.dataEfetivacao=new Date().toISOString(),localStorage.setItem("transactions",JSON.stringify(window.appState.transactions)),localStorage.setItem("recorrentes",JSON.stringify(window.appState.recorrentes)),window.Snackbar&&window.Snackbar.success("Recorrente efetivada com sucesso!"),window.renderDashboard&&window.renderDashboard()}}function NE(n){console.log("🔄 Atualizando recorrente:",n);const e=window.appState.recorrentes?.find(t=>t.id===n);if(!e){window.Snackbar&&window.Snackbar.error("Recorrente não encontrada");return}if(window.calcularStatusRecorrente){const t=new Date,o=window.calcularStatusRecorrente(e,window.appState.transactions||[],t.getFullYear(),t.getMonth()+1);console.log("Status atualizado:",o),window.Snackbar&&window.Snackbar.success("Status da recorrente atualizado"),window.renderDashboard&&window.renderDashboard()}else window.Snackbar&&window.Snackbar.error("Função de cálculo não disponível")}function $E(n){console.log("🗑️ Excluindo recorrente:",n);const e=window.appState.recorrentes?.find(t=>t.id===n);if(!e){window.Snackbar&&window.Snackbar.error("Recorrente não encontrada");return}confirm(`Excluir a recorrente "${e.descricao}"?

Esta ação não pode ser desfeita.`)&&(window.appState.recorrentes=window.appState.recorrentes.filter(t=>t.id!==n),localStorage.setItem("recorrentes",JSON.stringify(window.appState.recorrentes)),window.Snackbar&&window.Snackbar.success("Recorrente excluída com sucesso!"),window.renderDashboard&&window.renderDashboard())}function LE(n){console.log("📊 Visualizando histórico da recorrente:",n);const e=window.appState.recorrentes?.find(r=>r.id===n);if(!e){window.Snackbar&&window.Snackbar.error("Recorrente não encontrada");return}const t=window.appState.transactions?.filter(r=>r.recorrenteId===n)||[],o=document.createElement("div");o.className="modal-overlay",o.innerHTML=`
    <div class="modal-content">
      <div class="modal-header">
        <h2>📊 Histórico: ${e.descricao}</h2>
        <button onclick="this.closest('.modal-overlay').remove()" class="btn-secondary">✕</button>
      </div>
      <div class="modal-body">
        <div class="mb-4">
          <h3>Informações da Recorrente</h3>
          <p><strong>Valor:</strong> R$ ${parseFloat(e.valor).toFixed(2)}</p>
          <p><strong>Status:</strong> ${e.efetivada?"✅ Efetivada":"📅 Agendada"}</p>
          <p><strong>Parcelas:</strong> ${e.parcelasTotal||"Infinito"}</p>
        </div>
        
        <div>
          <h3>Transações Efetivadas (${t.length})</h3>
          ${t.length===0?'<p class="text-gray-500">Nenhuma transação efetivada ainda</p>':t.map(r=>`
              <div class="border rounded p-2 mb-2">
                <p><strong>${r.descricao}</strong></p>
                <p>Data: ${new Date(r.data).toLocaleDateString("pt-BR")}</p>
                <p>Valor: R$ ${parseFloat(r.valor).toFixed(2)}</p>
              </div>
            `).join("")}
        </div>
      </div>
    </div>
  `,document.body.appendChild(o)}window.editarRecorrente=DE;window.efetivarRecorrente=ME;window.atualizarRecorrente=NE;window.excluirRecorrente=$E;window.historicoRecorrente=LE;console.log("🔧 Aplicando correções críticas...");function FE(){if(!window.VoiceSystem)return;const n=window.VoiceSystem.prototype.handleRecognitionError;n&&(window.VoiceSystem.prototype.handleRecognitionError=function(e){if(e.error==="no-speech"&&this.hasReceivedSpeech){setTimeout(()=>{this.isModalOpen&&!this.isListening&&!this.isStarting&&!this.isProcessingCommand&&(this.hasError=!1,this.startListening(this.currentType))},3e3);return}n.call(this,e)})}function VE(){if(typeof window.calcularParcelaRecorrente!="function")return;const n=window.calcularParcelaRecorrente;window.calcularParcelaRecorrente=function(e){try{if(!e.parcelasTotal||e.parcelasTotal<=0)return null;if(e.parcelasRestantes===null||e.parcelasRestantes===void 0){if(!e.dataInicio)return 1;const[o,r,a]=e.dataInicio.split("-").map(Number),s=new Date(o,r-1,a),c=new Date,l=(c.getFullYear()-s.getFullYear())*12+(c.getMonth()-s.getMonth());return Math.min(l+1,e.parcelasTotal)}const t=e.parcelasTotal-e.parcelasRestantes+1;return Math.max(1,Math.min(t,e.parcelasTotal))}catch(t){return console.error("Erro no cálculo de parcelas:",t),n?n(e):1}}}function OE(){function n(e,t){let o;return function(...a){const s=()=>{clearTimeout(o),e(...a)};clearTimeout(o),o=setTimeout(s,t)}}window.renderAnalytics&&(window.renderAnalytics=n(window.renderAnalytics,300))}function BE(){window.addEventListener("error",function(n){console.error("Erro global capturado:",n.error),window.Snackbar&&window.Snackbar.show&&window.Snackbar.show("Ocorreu um erro inesperado. Tente novamente.","error")}),window.addEventListener("unhandledrejection",function(n){console.error("Promise rejeitada:",n.reason),window.Snackbar&&window.Snackbar.show&&window.Snackbar.show("Erro de conexão. Verifique sua internet.","error"),n.preventDefault()})}try{FE(),VE(),OE(),BE(),console.log("✅ Correções críticas aplicadas com sucesso!")}catch(n){console.error("❌ Erro ao aplicar correções:",n)}window.selectDefaultBudget=dc;window.loadRecorrentes=Ga;window.closeModalAlertas=SE;window.calcularNumeroParcela=IE;window.showLoading=Xo;window.toggleLoginPage=Ko;window.refreshCurrentView=Pp;window.logout=bE;let $o=null;function Lp(){return $o||($o=new ic),$o}window.openVoiceModal=function(n="transaction"){return console.log("🎤 openVoiceModal chamado:",n),Lp().start(n)};window.closeVoiceModal=function(){console.log("🎤 closeVoiceModal chamado"),$o&&$o.stop()};window.startVoiceRecognition=function(n="transaction"){return console.log("🎤 startVoiceRecognition chamado:",n),Lp().start(n)};async function UE(){console.log("🔄 Renderizando análises limpas...");const n=document.getElementById("app-content");if(!n){console.error("❌ Elemento app-content não encontrado");return}try{const e=await Ap.renderCleanAnalytics();n.innerHTML="",n.appendChild(e),console.log("✅ Análises limpas renderizadas com sucesso")}catch(e){console.error("❌ Erro ao renderizar análises limpas:",e),n.innerHTML='<div class="error-message">Erro ao carregar análises</div>'}}window.downloadBackup=function(){try{if(!window.appState||!window.appState.transactions){window.Snackbar?window.Snackbar({message:"Nenhum dado disponível para exportar.",type:"warning"}):alert("Nenhum dado disponível para exportar.");return}const n={transactions:window.appState.transactions,categories:window.appState.categories,budgets:window.appState.budgets,recorrentes:window.appState.recorrentes},e=new Blob([JSON.stringify(n,null,2)],{type:"application/json"}),t=URL.createObjectURL(e),o=document.createElement("a");o.href=t,o.download="financeiro-backup.json",document.body.appendChild(o),o.click(),document.body.removeChild(o),URL.revokeObjectURL(t),window.Snackbar&&window.Snackbar({message:"✅ Backup JSON exportado com sucesso!",type:"success"})}catch(n){console.error("❌ Erro ao exportar backup:",n),window.Snackbar?window.Snackbar({message:"Erro ao exportar backup: "+n.message,type:"error"}):alert("Erro ao exportar backup: "+n.message)}};window.exportToExcel=function(){try{if(typeof XLSX>"u"){console.error("❌ Biblioteca XLSX não está disponível"),window.Snackbar?window.Snackbar({message:"Erro: Biblioteca XLSX não está carregada. Tente recarregar a página.",type:"error"}):alert("Erro: Biblioteca XLSX não está carregada. Tente recarregar a página.");return}if(!window.appState||!window.appState.transactions){window.Snackbar?window.Snackbar({message:"Nenhum dado disponível para exportar.",type:"warning"}):alert("Nenhum dado disponível para exportar.");return}const n=XLSX.utils.book_new(),e=window.appState.transactions.map(r=>({Descrição:r.descricao,Valor:r.valor,Tipo:r.tipo,Categoria:window.appState.categories.find(a=>a.id===r.categoriaId)?.nome||"",Data:r.createdAt&&r.createdAt.toDate?r.createdAt.toDate().toLocaleDateString():""}));XLSX.utils.book_append_sheet(n,XLSX.utils.json_to_sheet(e),"Transações");const t=window.appState.categories.map(r=>({Nome:r.nome,Tipo:r.tipo,Limite:r.limite,Cor:r.cor}));XLSX.utils.book_append_sheet(n,XLSX.utils.json_to_sheet(t),"Categorias");const o=window.appState.budgets.map(r=>({Nome:r.nome,Descrição:r.descricao,ID:r.id}));XLSX.utils.book_append_sheet(n,XLSX.utils.json_to_sheet(o),"Orçamentos"),XLSX.writeFile(n,"financeiro-dados.xlsx"),window.Snackbar&&window.Snackbar({message:"✅ Arquivo Excel exportado com sucesso!",type:"success"})}catch(n){console.error("❌ Erro ao exportar Excel:",n),window.Snackbar?window.Snackbar({message:"Erro ao exportar Excel: "+n.message,type:"error"}):alert("Erro ao exportar Excel: "+n.message)}};window.exportToPDF=function(){try{if(typeof window.jspdf>"u"){console.error("❌ Biblioteca jsPDF não está disponível"),window.Snackbar?window.Snackbar({message:"Erro: Biblioteca jsPDF não está carregada. Tente recarregar a página.",type:"error"}):alert("Erro: Biblioteca jsPDF não está carregada. Tente recarregar a página.");return}if(!window.appState||!window.appState.transactions){window.Snackbar?window.Snackbar({message:"Nenhum dado disponível para exportar.",type:"warning"}):alert("Nenhum dado disponível para exportar.");return}const{jsPDF:n}=window.jspdf,e=new n;let t=10;e.setFontSize(20),e.setFont("helvetica","bold"),e.text("📊 Relatório Financeiro",10,t),t+=15;const o=window.appState.currentBudget;o&&(e.setFontSize(14),e.setFont("helvetica","bold"),e.text(`Orçamento: ${o.nome}`,10,t),t+=8,e.setFontSize(10),e.setFont("helvetica","normal"),e.text(`ID: ${o.id}`,10,t),t+=10);const r=window.appState.transactions.filter(c=>c.tipo==="receita").reduce((c,l)=>c+parseFloat(l.valor),0),a=window.appState.transactions.filter(c=>c.tipo==="despesa").reduce((c,l)=>c+parseFloat(l.valor),0),s=r-a;e.setFontSize(12),e.setFont("helvetica","bold"),e.text("Resumo Geral:",10,t),t+=8,e.setFontSize(10),e.setFont("helvetica","normal"),e.text(`Total Receitas: R$ ${r.toFixed(2)}`,12,t),t+=6,e.text(`Total Despesas: R$ ${a.toFixed(2)}`,12,t),t+=6,e.setFont("helvetica","bold"),e.text(`Saldo: R$ ${s.toFixed(2)}`,12,t),t+=10,e.setFontSize(12),e.setFont("helvetica","bold"),e.text("Transações Recentes:",10,t),t+=8,e.setFontSize(9),e.setFont("helvetica","normal"),window.appState.transactions.sort((c,l)=>new Date(l.createdAt?.toDate?.()||l.createdAt)-new Date(c.createdAt?.toDate?.()||c.createdAt)).slice(0,15).forEach(c=>{const l=window.appState.categories.find(g=>g.id===c.categoriaId)?.nome||"Sem categoria",h=`${c.createdAt?.toDate?.()?c.createdAt.toDate().toLocaleDateString():"Data não disponível"} - ${c.descricao} | R$ ${c.valor} | ${c.tipo} | ${l}`;t>270&&(e.addPage(),t=10),e.text(h,12,t),t+=6}),t+=5,e.setFontSize(12),e.setFont("helvetica","bold"),e.text("Gastos por Categoria:",10,t),t+=8,e.setFontSize(9),e.setFont("helvetica","normal"),window.appState.categories.forEach(c=>{const l=window.appState.transactions.filter(d=>d.categoriaId===c.id&&d.tipo==="despesa").reduce((d,h)=>d+parseFloat(h.valor),0);if(l>0){const d=c.limite?` / R$ ${c.limite}`:"",h=c.limite?` (${(l/c.limite*100).toFixed(1)}%)`:"";t>270&&(e.addPage(),t=10),e.text(`${c.nome}: R$ ${l.toFixed(2)}${d}${h}`,12,t),t+=6}}),e.save("relatorio-financeiro.pdf"),window.Snackbar&&window.Snackbar({message:"✅ Relatório PDF exportado com sucesso!",type:"success"})}catch(n){console.error("❌ Erro ao exportar PDF:",n),window.Snackbar?window.Snackbar({message:"Erro ao exportar PDF: "+n.message,type:"error"}):alert("Erro ao exportar PDF: "+n.message)}};window.exportReadmePDF=function(){try{let o=function(r,a,s,c=170){return e.splitTextToSize(r,c).forEach(d=>{s>270&&(e.addPage(),s=10),e.text(d,a,s),s+=6}),s};if(typeof window.jspdf>"u"){console.error("❌ Biblioteca jsPDF não está disponível"),window.Snackbar?window.Snackbar({message:"Erro: Biblioteca jsPDF não está carregada. Tente recarregar a página.",type:"error"}):alert("Erro: Biblioteca jsPDF não está carregada. Tente recarregar a página.");return}const{jsPDF:n}=window.jspdf,e=new n;let t=10;e.setFontSize(24),e.setFont("helvetica","bold"),e.setFillColor(79,70,229),e.rect(0,0,210,40,"F"),e.setTextColor(255,255,255),e.text("Servo Tech Finanças",20,25),e.setFontSize(14),e.text("Guia Completo de Uso",20,35),t=50,e.setFontSize(12),e.setFont("helvetica","bold"),e.setTextColor(0,0,0),t=o("🎯 Como Usar o Aplicativo",20,t),e.setFontSize(10),e.setFont("helvetica","normal"),t=o("1. Faça login com sua conta Google",25,t),t=o("2. Crie categorias para organizar suas despesas e receitas",25,t),t=o("3. Adicione transações usando o botão + ou comandos de voz",25,t),t=o("4. Configure despesas recorrentes para pagamentos fixos",25,t),t=o("5. Monitore seu saldo e gastos no dashboard",25,t),t+=10,e.setFontSize(12),e.setFont("helvetica","bold"),t=o("🎤 Comandos de Voz Disponíveis",20,t),e.setFontSize(10),e.setFont("helvetica","normal"),t=o('• "gastei 50 reais no supermercado em alimentação"',25,t),t=o('• "recebi 2000 de salário em rendimentos"',25,t),t=o('• "criar categoria alimentação despesa 500"',25,t),t=o('• "qual meu saldo"',25,t),t=o('• "mostrar transações"',25,t),t+=10,e.setFontSize(12),e.setFont("helvetica","bold"),t=o("📊 Funcionalidades Principais",20,t),e.setFontSize(10),e.setFont("helvetica","normal"),t=o("• Dashboard com resumo financeiro",25,t),t=o("• Gestão de transações e categorias",25,t),t=o("• Sistema de despesas recorrentes",25,t),t=o("• Alertas de limite de categoria",25,t),t=o("• Backup e exportação de dados",25,t),t=o("• Interface responsiva para mobile",25,t),t+=10,e.setFontSize(12),e.setFont("helvetica","bold"),t=o("💾 Backup e Exportação",20,t),e.setFontSize(10),e.setFont("helvetica","normal"),t=o("• Exportação em JSON para backup completo",25,t),t=o("• Exportação em Excel para relatórios",25,t),t=o("• Exportação em PDF para documentação",25,t),t=o("• Restauração de dados de backup",25,t),t+=10,e.setFontSize(12),e.setFont("helvetica","bold"),t=o("🔧 Suporte e Contato",20,t),e.setFontSize(10),e.setFont("helvetica","normal"),t=o("Para dúvidas ou problemas:",25,t),t=o("• Verifique os logs do console (F12)",30,t),t=o("• Teste em diferentes navegadores",30,t),t=o("• Consulte a documentação técnica",30,t),e.save("guia-servo-tech-financas.pdf"),window.Snackbar&&window.Snackbar({message:"✅ Guia PDF exportado com sucesso!",type:"success"})}catch(n){console.error("❌ Erro ao exportar guia PDF:",n),window.Snackbar?window.Snackbar({message:"Erro ao exportar guia PDF: "+n.message,type:"error"}):alert("Erro ao exportar guia PDF: "+n.message)}};window.showExportOptions=function(){console.log("🔍 showExportOptions chamada"),Qt({title:"📤 Opções de Exportação",content:`
      <div class="space-y-4">
        <button onclick="window.downloadBackup && window.downloadBackup()" class="w-full btn-primary">
          <span class="icon-standard">💾</span>
          Backup JSON Completo
        </button>
        <button onclick="window.exportToExcel && window.exportToExcel()" class="w-full btn-secondary">
          <span class="icon-standard">📊</span>
          Exportar para Excel
        </button>
        <button onclick="window.exportToPDF && window.exportToPDF()" class="w-full btn-secondary">
          <span class="icon-standard">📄</span>
          Exportar para PDF
        </button>
        <button onclick="window.exportReadmePDF && window.exportReadmePDF()" class="w-full btn-secondary">
          <span class="icon-standard">📖</span>
          Guia de Uso (PDF)
        </button>
      </div>
    `})};function Fp(){console.log("🔧 Configurando botões do header...");const n=document.getElementById("voice-modal");console.log("🔧 Elementos encontrados:",{voiceModal:!!n});const e=document.getElementById("close-voice-modal");e&&(e.addEventListener("click",t=>{t.preventDefault(),t.stopPropagation(),console.log("❌ Close voice modal button clicked"),Wd()}),console.log("✅ Close voice modal button configurado")),n&&n.addEventListener("click",t=>{t.target===n&&Wd()})}function zE(){const n=document.getElementById("voice-modal"),e=n?.querySelector(".voice-content");n&&e&&(n.style.display="flex",n.style.pointerEvents="auto",n.style.background="rgba(0, 0, 0, 0.95)",n.style.backdropFilter="blur(30px)",e.style.transform="scale(1)",e.style.opacity="1",document.body.classList.add("voice-modal-open"),window.startVoiceRecognition&&setTimeout(()=>{window.startVoiceRecognition("transaction")},500),console.log("🎤 Modal de voz aberto"))}window.openVoiceModal=zE;function Wd(){const n=document.getElementById("voice-modal"),e=n?.querySelector(".voice-content");n&&e&&(e.style.transform="scale(0.95)",e.style.opacity="0",n.style.background="rgba(0, 0, 0, 0)",n.style.backdropFilter="blur(0px)",document.body.classList.remove("voice-modal-open"),setTimeout(()=>{n.style.pointerEvents="none",n.style.display="none"},300),console.log("🎤 Modal de voz fechado"))}function qE(){console.log("🔧 Configurando botões da tela de categorias...");const n=document.getElementById("add-category-btn");n&&(n.addEventListener("click",o=>{o.preventDefault(),o.stopPropagation(),console.log("📂 Add category button clicked"),window.showAddCategoryModal?window.showAddCategoryModal():(console.warn("⚠️ Função de adicionar categoria não disponível"),window.Snackbar&&window.Snackbar.show("Funcionalidade de adicionar categoria não disponível","warning"))}),console.log("✅ Add category button configurado"));const e=document.querySelector('button[onclick="window.migrarTransacoesAntigas()"]');e&&(e.addEventListener("click",o=>{o.preventDefault(),o.stopPropagation(),console.log("🔄 Migrar button clicked"),window.migrarTransacoesAntigas?window.migrarTransacoesAntigas():console.warn("⚠️ Função de migrar não disponível")}),console.log("✅ Migrar button configurado"));const t=document.querySelector('button[onclick="window.corrigirTipoCategoria()"]');t&&(t.addEventListener("click",o=>{o.preventDefault(),o.stopPropagation(),console.log("🔧 Corrigir button clicked"),window.corrigirTipoCategoria?window.corrigirTipoCategoria():console.warn("⚠️ Função de corrigir não disponível")}),console.log("✅ Corrigir button configurado"))}function jE(){console.log("🔧 Configurando botões do dashboard...");const n=document.getElementById("theme-toggle-btn"),e=document.getElementById("export-btn");console.log("🔍 Debug - theme-toggle-btn existe:",!!n),console.log("🔍 Debug - export-btn existe:",!!e);const t=(a,s,c=10)=>{let l=0;const d=()=>{const h=document.getElementById(a);h?s(h):l<c?(l++,setTimeout(d,50)):console.warn(`⚠️ Elemento ${a} não encontrado após ${c} tentativas`)};d()};t("export-btn",a=>{a.addEventListener("click",s=>{s.preventDefault(),s.stopPropagation(),console.log("📤 Export button clicked"),window.showExportOptions?window.showExportOptions():(console.warn("⚠️ Função de exportação não disponível"),window.Snackbar&&window.Snackbar({message:"Funcionalidade de exportação não disponível",type:"warning"}))}),console.log("✅ Export button configurado")}),t("theme-toggle-btn",a=>{console.log("✅ Dashboard: Botão de tema encontrado, configurando..."),window.setupThemeToggle?window.setupThemeToggle("theme-toggle-btn"):console.warn("⚠️ setupThemeToggle não disponível")},15);const o=document.getElementById("mes-anterior"),r=document.getElementById("mes-proximo");o&&(o.addEventListener("click",async a=>{a.preventDefault(),a.stopPropagation(),console.log("⬅️ Mês anterior clicked");const s=parseInt(document.querySelector("#mes-selector span").textContent.split(" ")[1]),c=document.querySelector("#mes-selector span").textContent.split(" ")[0],d=["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"].indexOf(c);let h=s,g=d;d===0?(h=s-1,g=11):g=d-1,window.renderDashboard&&await window.renderDashboard(h,g+1)}),console.log("✅ Mês anterior button configurado")),r&&(r.addEventListener("click",async a=>{a.preventDefault(),a.stopPropagation(),console.log("➡️ Mês próximo clicked");const s=parseInt(document.querySelector("#mes-selector span").textContent.split(" ")[1]),c=document.querySelector("#mes-selector span").textContent.split(" ")[0],d=["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"].indexOf(c);let h=s,g=d;d===11?(h=s+1,g=0):g=d+1,window.renderDashboard&&await window.renderDashboard(h,g+1)}),console.log("✅ Mês próximo button configurado"))}window.migrarTransacoesAntigas=async function(){try{if(console.log("🔄 Iniciando migração de transações antigas..."),!window.appState.currentUser){B({message:"Usuário não autenticado",type:"error"});return}const e=window.appState.currentBudget;if(!e){B.show("Orçamento não selecionado","error");return}const t=fe(oe(q,"transactions"),ne("budgetId","==",e.id),ne("categoriaId","==",null)),r=(await he(t)).docs;if(r.length===0){B({message:"Nenhuma transação para migrar",type:"info"});return}let a=window.appState.categories.find(c=>c.nome==="Geral");if(!a){const l=await cc({nome:"Geral",descricao:"Categoria padrão para transações antigas",tipo:"despesa",cor:"#6B7280",limite:0});await ur(),a=window.appState.categories.find(d=>d.id===l)}let s=0;for(const c of r)await ht(c.ref,{categoriaId:a.id,updatedAt:Ae()}),s++;await dr(),B({message:`${s} transações migradas para categoria "Geral"`,type:"success"})}catch(n){console.error("❌ Erro na migração:",n),B({message:"Erro ao migrar transações",type:"error"})}};window.corrigirTipoCategoria=async function(){try{if(console.log("🔧 Iniciando correção de tipos de categoria..."),!window.appState.currentUser){B({message:"Usuário não autenticado",type:"error"});return}const e=window.appState.currentBudget;if(!e){B.show("Orçamento não selecionado","error");return}const t=fe(oe(q,"categories"),ne("budgetId","==",e.id),ne("tipo","==",null)),r=(await he(t)).docs;if(r.length===0){B({message:"Nenhuma categoria para corrigir",type:"info"});return}let a=0;for(const s of r)await ht(s.ref,{tipo:"despesa",updatedAt:Ae()}),a++;await ur(),B({message:`${a} categorias corrigidas`,type:"success"})}catch(n){console.error("❌ Erro na correção:",n),B({message:"Erro ao corrigir categorias",type:"error"})}};async function Ka(){try{const n=en.currentUser;if(!n)return[];const{getDocs:e,query:t,where:o,orderBy:r,limit:a}=await pe(async()=>{const{getDocs:d,query:h,where:g,orderBy:m,limit:f}=await Promise.resolve().then(()=>Ne);return{getDocs:d,query:h,where:g,orderBy:m,limit:f}},void 0),s=t(oe(q,"notifications"),o("recipientUid","==",n.uid),r("createdAt","desc"),a(50)),c=await e(s),l=[];return c.forEach(d=>{l.push({id:d.id,...d.data()})}),window.appState.notifications=l,console.log("📧 Notificações carregadas:",l.length),Ya(),l}catch(n){return console.error("Erro ao carregar notificações:",n),[]}}async function HE(n){try{const{updateDoc:e}=await pe(async()=>{const{updateDoc:o}=await Promise.resolve().then(()=>Ne);return{updateDoc:o}},void 0);await e(qe(q,"notifications",n),{read:!0});const t=window.appState.notifications.findIndex(o=>o.id===n);t!==-1&&(window.appState.notifications[t].read=!0),Ya()}catch(e){console.error("Erro ao marcar notificação como lida:",e)}}async function GE(){try{const n=window.appState.notifications?.filter(o=>!o.read)||[];if(n.length===0){B({message:"Nenhuma notificação não lida",type:"info"});return}const{updateDoc:e}=await pe(async()=>{const{updateDoc:o}=await Promise.resolve().then(()=>Ne);return{updateDoc:o}},void 0),t=n.map(o=>e(qe(q,"notifications",o.id),{read:!0}));await Promise.all(t),window.appState.notifications.forEach(o=>o.read=!0),Ya(),B({message:`${n.length} notificações marcadas como lidas`,type:"success"}),window.location.hash==="#/notifications"&&hc()}catch(n){console.error("Erro ao marcar notificações como lidas:",n),B({message:"Erro ao marcar notificações como lidas",type:"error"})}}function Ya(){const n=window.appState.notifications?.filter(t=>!t.read).length||0,e=document.querySelector('[data-route="/notifications"]');if(e){let t=e.querySelector(".notification-badge");t||(t=document.createElement("span"),t.className="notification-badge absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center",e.style.position="relative",e.appendChild(t)),n>0?(t.textContent=n>99?"99+":n,t.style.display="flex"):t.style.display="none"}}let Pn=null;async function Xa(){Pn&&Pn();const n=en.currentUser;if(!n){console.log("⚠️ Usuário não autenticado, não iniciando listener de notificações");return}if(!window.appState.currentBudget){console.log("⚠️ Nenhum orçamento selecionado, não iniciando listener de notificações");return}try{const{onSnapshot:e,query:t,where:o,orderBy:r,limit:a}=await pe(async()=>{const{onSnapshot:c,query:l,where:d,orderBy:h,limit:g}=await Promise.resolve().then(()=>Ne);return{onSnapshot:c,query:l,where:d,orderBy:h,limit:g}},void 0),s=t(oe(q,"notifications"),o("recipientUid","==",n.uid),r("createdAt","desc"),a(50));Pn=e(s,c=>{console.log("📧 Listener de notificações executado!");const l=[];c.forEach(d=>{l.push({id:d.id,...d.data()})}),window.appState.notifications=l,console.log("📧 Notificações atualizadas:",l.length),Ya(),window.location.hash==="#/notifications"&&hc()},c=>{console.error("❌ Erro no listener de notificações:",c),c.code==="permission-denied"&&(console.log("⚠️ Permissão negada para notificações, desabilitando listener"),Pn&&(Pn(),Pn=null))})}catch(e){console.error("❌ Erro ao configurar listener de notificações:",e)}}async function hc(){const n=document.getElementById("app-content");if(!n)return;await Ka();const e=window.appState.notifications||[];n.innerHTML=`
    <div class="tab-container">
      <div class="tab-header">
        <h2 class="tab-title-highlight">🔔 Notificações</h2>
        <div class="flex items-center gap-2">
          <button onclick="window.showConfirmationModal({
            title: 'Marcar como Lidas',
            message: 'Deseja marcar todas as notificações como lidas?',
            confirmText: 'Sim, Marcar',
            confirmColor: 'bg-blue-500 hover:bg-blue-600',
            onConfirm: 'window.markAllNotificationsAsRead && window.markAllNotificationsAsRead()'
          })" class="btn-secondary">
            <span class="icon-standard">✔️</span>
            <span class="hidden sm:inline">Marcar todas como lidas</span>
          </button>
        </div>
      </div>
      <div class="tab-content">
        <div class="content-spacing">
          <!-- Lista de Notificações -->
          <div class="space-y-4">
            ${e.length>0?e.map(t=>`
              <div class="card-standard ${t.read?"":"border-l-4 border-blue-500"}">
                <div class="flex items-start justify-between">
                  <div class="flex-1">
                    <div class="flex items-center gap-2 mb-2">
                      <span class="text-lg">💰</span>
                      <h3 class="font-semibold text-gray-800 dark:text-white">
                        Nova transação no orçamento "${t.budgetName||"Orçamento"}"
                      </h3>
                      ${t.read?"":'<span class="px-2 py-1 bg-blue-500 text-white text-xs rounded-full">Nova</span>'}
                    </div>
                    <p class="text-gray-600 dark:text-gray-400 mb-2">
                      <strong>${t.senderName||"Usuário"}</strong> adicionou uma ${t.transactionTipo||"transação"}:
                    </p>
                    <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 mb-3">
                      <div class="flex items-center justify-between">
                        <div>
                          <div class="font-medium text-gray-800 dark:text-white">${t.transactionDescricao||"Transação"}</div>
                          <div class="text-sm text-gray-500 dark:text-gray-400">${t.transactionCategoria||"Categoria"}</div>
                        </div>
                        <div class="text-right">
                          <div class="font-bold text-lg ${(t.transactionTipo||"despesa")==="receita"?"text-green-600 dark:text-green-400":"text-red-600 dark:text-red-400"}">
                            R$ ${(t.transactionValor||0).toFixed(2)}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="text-xs text-gray-500 dark:text-gray-400">
                      ${t.createdAt?.toDate?t.createdAt.toDate().toLocaleString("pt-BR"):"Data não disponível"}
                    </div>
                  </div>
                  ${t.read?"":`
                    <button onclick="window.showConfirmationModal({
                      title: 'Marcar como Lida',
                      message: 'Deseja marcar esta notificação como lida?',
                      confirmText: 'Sim, Marcar',
                      confirmColor: 'bg-blue-500 hover:bg-blue-600',
                      onConfirm: 'window.markNotificationAsRead && window.markNotificationAsRead(\\'${t.id}\\')'
                    })" 
                            class="px-3 py-1 bg-blue-500 text-white text-xs rounded-lg hover:bg-blue-600 transition-colors">
                      Marcar como lida
                    </button>
                  `}
                </div>
              </div>
            `).join(""):`
              <div class="card-standard text-center">
                <div class="text-6xl mb-4">🔔</div>
                <h3 class="text-lg font-semibold text-gray-800 dark:text-white mb-2">Nenhuma notificação</h3>
                <p class="text-gray-600 dark:text-gray-400">Você não tem notificações no momento.</p>
              </div>
            `}
          </div>
        </div>
      </div>
    </div>
  `,hn()}window.loadNotifications=Ka;window.markNotificationAsRead=HE;window.markAllNotificationsAsRead=GE;window.renderNotifications=hc;window.listenNotifications=Xa;window.addTransactionWithConfirmation=async function(n){return new Promise((e,t)=>{window.showConfirmationModal({title:"Adicionar Transação",message:`Tem certeza que deseja adicionar a transação "${n.descricao}" no valor de R$ ${n.valor.toFixed(2)}?`,confirmText:"Sim, Adicionar",confirmColor:"bg-green-500 hover:bg-green-600",onConfirm:async()=>{try{const o=await window.addTransaction(n);window.Snackbar&&window.Snackbar({message:"✅ Transação adicionada com sucesso!",type:"success"}),e(o)}catch(o){console.error("❌ Erro ao adicionar transação:",o),window.Snackbar&&window.Snackbar({message:"Erro ao adicionar transação: "+o.message,type:"error"}),t(o)}},onCancel:()=>{console.log("❌ Adição de transação cancelada pelo usuário"),t(new Error("Operação cancelada pelo usuário"))}})})};window.deleteTransactionWithConfirmation=function(n,e="transação"){window.showConfirmationModal({title:"Excluir Transação",message:`Tem certeza que deseja excluir a ${e}? Esta ação não pode ser desfeita.`,confirmText:"Sim, Excluir",confirmColor:"bg-red-500 hover:bg-red-600",onConfirm:()=>{window.deleteTransaction&&window.deleteTransaction(n)}})};window.deleteCategoryWithConfirmation=function(n,e="categoria"){window.showConfirmationModal({title:"Excluir Categoria",message:`Tem certeza que deseja excluir a categoria "${e}"? Todas as transações desta categoria ficarão sem categoria.`,confirmText:"Sim, Excluir",confirmColor:"bg-red-500 hover:bg-red-600",onConfirm:()=>{window.deleteCategory&&window.deleteCategory(n)}})};window.deleteRecorrenteWithConfirmation=function(n,e="despesa recorrente"){window.showConfirmationModal({title:"Excluir Despesa Recorrente",message:`Tem certeza que deseja excluir a ${e}? Esta ação não pode ser desfeita.`,confirmText:"Sim, Excluir",confirmColor:"bg-red-500 hover:bg-red-600",onConfirm:()=>{window.deleteDespesaRecorrente&&window.deleteDespesaRecorrente(n)}})};window.leaveBudgetWithConfirmation=function(n,e="orçamento"){window.showConfirmationModal({title:"Sair do Orçamento",message:`Tem certeza que deseja sair do orçamento "${e}"? Você perderá acesso a todas as transações.`,confirmText:"Sim, Sair",confirmColor:"bg-orange-500 hover:bg-orange-600",onConfirm:()=>{window.leaveSharedBudget&&window.leaveSharedBudget(n)}})};window.showExportOptions=function(){if(console.log("🔍 showExportOptions chamada"),console.log("🔍 window.Modal disponível:",!!window.Modal),console.log("🔍 window.Modal tipo:",typeof window.Modal),!window.Modal){console.error("❌ Modal não está disponível"),alert("Erro: Modal não está disponível");return}console.log("🔍 Tentando abrir modal de exportação...");try{const n=window.Modal({title:"Exportar Dados",content:`
        <div class="space-y-4">
          <button onclick="window.exportToExcel()" class="w-full bg-green-500 text-white py-2 rounded-lg font-semibold hover:bg-green-600 flex items-center justify-center gap-2 text-base">
            <span>📊</span> Relatório Excel
          </button>
          <button onclick="window.exportToPDF()" class="w-full bg-red-500 text-white py-2 rounded-lg font-semibold hover:bg-red-600 flex items-center justify-center gap-2 text-base">
            <span>📄</span> Relatório PDF
          </button>
          <button onclick="window.exportReadmePDF()" class="w-full bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-600 flex items-center justify-center gap-2 text-base">
            <span>📖</span> Guia de Uso (PDF)
          </button>
          <button onclick="window.downloadBackup()" class="w-full bg-purple-500 text-white py-2 rounded-lg font-semibold hover:bg-purple-600 flex items-center justify-center gap-2 text-base">
            <span>💾</span> Backup Completo (JSON)
          </button>
        </div>
      `,onClose:()=>{console.log("🔍 Modal fechado"),document.querySelector(".modal")?.remove()}});console.log("🔍 Modal criado com sucesso:",n),document.body.appendChild(n),console.log("🔍 Modal adicionado ao DOM")}catch(n){console.error("❌ Erro ao criar modal:",n),alert("Erro ao abrir modal de exportação: "+n.message)}};window.exportToExcel=function(){try{if(typeof XLSX>"u"){console.error("❌ Biblioteca XLSX não está disponível"),window.Snackbar?window.Snackbar({message:"Erro: Biblioteca XLSX não está carregada. Tente recarregar a página.",type:"error"}):alert("Erro: Biblioteca XLSX não está carregada. Tente recarregar a página.");return}if(!window.appState||!window.appState.transactions){window.Snackbar?window.Snackbar({message:"Nenhum dado disponível para exportar.",type:"warning"}):alert("Nenhum dado disponível para exportar.");return}const n=XLSX.utils.book_new(),e=window.appState.transactions.map(r=>({Descrição:r.descricao,Valor:r.valor,Tipo:r.tipo,Categoria:window.appState.categories.find(a=>a.id===r.categoriaId)?.nome||"",Data:r.createdAt&&r.createdAt.toDate?r.createdAt.toDate().toLocaleDateString():""}));XLSX.utils.book_append_sheet(n,XLSX.utils.json_to_sheet(e),"Transações");const t=window.appState.categories.map(r=>({Nome:r.nome,Tipo:r.tipo,Limite:r.limite,Cor:r.cor}));XLSX.utils.book_append_sheet(n,XLSX.utils.json_to_sheet(t),"Categorias");const o=window.appState.budgets.map(r=>({Nome:r.nome,Descrição:r.descricao,ID:r.id}));XLSX.utils.book_append_sheet(n,XLSX.utils.json_to_sheet(o),"Orçamentos"),XLSX.writeFile(n,"financeiro-dados.xlsx"),window.Snackbar&&window.Snackbar({message:"✅ Arquivo Excel exportado com sucesso!",type:"success"})}catch(n){console.error("❌ Erro ao exportar Excel:",n),window.Snackbar?window.Snackbar({message:"Erro ao exportar Excel: "+n.message,type:"error"}):alert("Erro ao exportar Excel: "+n.message)}};window.exportToPDF=function(){try{let o=function(l,d,h,g=170){return e.splitTextToSize(l,g).forEach(f=>{h>270&&(e.addPage(),h=10),e.text(f,d,h),h+=6}),h};if(typeof window.jspdf>"u"){console.error("❌ Biblioteca jsPDF não está disponível"),window.Snackbar?window.Snackbar({message:"Erro: Biblioteca jsPDF não está carregada. Tente recarregar a página.",type:"error"}):alert("Erro: Biblioteca jsPDF não está carregada. Tente recarregar a página.");return}const{jsPDF:n}=window.jspdf,e=new n;let t=10;e.setFontSize(24),e.setFont("helvetica","bold"),e.setFillColor(79,70,229),e.rect(0,0,210,40,"F"),e.setTextColor(255,255,255),e.text("Servo Tech Finanças",20,25),e.setFontSize(14),e.text("Relatório Financeiro",20,35),e.setTextColor(0,0,0),e.setFontSize(12),e.setFont("helvetica","normal"),t=50,t=o("📊 RESUMO FINANCEIRO",20,t),t+=10;const r=window.appState.transactions.filter(l=>l.tipo==="receita").reduce((l,d)=>l+parseFloat(d.valor),0),a=window.appState.transactions.filter(l=>l.tipo==="despesa").reduce((l,d)=>l+parseFloat(d.valor),0),s=r-a;t=o(`💰 Total de Receitas: R$ ${r.toFixed(2)}`,20,t),t=o(`💸 Total de Despesas: R$ ${a.toFixed(2)}`,20,t),t=o(`💳 Saldo: R$ ${s.toFixed(2)}`,20,t),t+=15,t=o("📋 ÚLTIMAS TRANSAÇÕES",20,t),t+=10,window.appState.transactions.sort((l,d)=>new Date(d.createdAt)-new Date(l.createdAt)).slice(0,10).forEach(l=>{const d=window.appState.categories.find(g=>g.id===l.categoriaId),h=l.createdAt&&l.createdAt.toDate?l.createdAt.toDate().toLocaleDateString():new Date(l.createdAt).toLocaleDateString();t=o(`${h} - ${l.descricao} (${d?.nome||"Sem categoria"}) - R$ ${l.valor}`,25,t)}),e.save("financeiro-relatorio.pdf"),window.Snackbar&&window.Snackbar({message:"✅ Relatório PDF exportado com sucesso!",type:"success"})}catch(n){console.error("❌ Erro ao exportar PDF:",n),window.Snackbar?window.Snackbar({message:"Erro ao exportar PDF: "+n.message,type:"error"}):alert("Erro ao exportar PDF: "+n.message)}};window.downloadBackup=function(){try{if(!window.appState||!window.appState.transactions){window.Snackbar?window.Snackbar({message:"Nenhum dado disponível para exportar.",type:"warning"}):alert("Nenhum dado disponível para exportar.");return}const n={transactions:window.appState.transactions,categories:window.appState.categories,budgets:window.appState.budgets,recorrentes:window.appState.recorrentes},e=new Blob([JSON.stringify(n,null,2)],{type:"application/json"}),t=URL.createObjectURL(e),o=document.createElement("a");o.href=t,o.download="financeiro-backup.json",document.body.appendChild(o),o.click(),document.body.removeChild(o),URL.revokeObjectURL(t),window.Snackbar&&window.Snackbar({message:"✅ Backup JSON exportado com sucesso!",type:"success"})}catch(n){console.error("❌ Erro ao exportar backup:",n),window.Snackbar?window.Snackbar({message:"Erro ao exportar backup: "+n.message,type:"error"}):alert("Erro ao exportar backup: "+n.message)}};window.exportReadmePDF=function(){try{let o=function(r,a,s,c=170){return e.splitTextToSize(r,c).forEach(d=>{s>270&&(e.addPage(),s=10),e.text(d,a,s),s+=6}),s};if(typeof window.jspdf>"u"){console.error("❌ Biblioteca jsPDF não está disponível"),window.Snackbar?window.Snackbar({message:"Erro: Biblioteca jsPDF não está carregada. Tente recarregar a página.",type:"error"}):alert("Erro: Biblioteca jsPDF não está carregada. Tente recarregar a página.");return}const{jsPDF:n}=window.jspdf,e=new n;let t=10;e.setFontSize(24),e.setFont("helvetica","bold"),e.setFillColor(79,70,229),e.rect(0,0,210,40,"F"),e.setTextColor(255,255,255),e.text("Servo Tech Finanças",20,25),e.setFontSize(14),e.text("Guia Completo de Uso",20,35),e.setTextColor(0,0,0),e.setFontSize(12),e.setFont("helvetica","normal"),t=50,t=o("📱 COMO USAR O APLICATIVO",20,t),t+=10,t=o("1. DASHBOARD - Visualize seu resumo financeiro, saldo atual, gastos por categoria e alertas de limite.",20,t),t=o("2. TRANSAÇÕES - Adicione, edite ou remova suas receitas e despesas.",20,t),t=o("3. CATEGORIAS - Organize suas transações em categorias com limites personalizados.",20,t),t=o("4. RECORRENTES - Configure despesas que se repetem mensalmente.",20,t),t=o("5. NOTIFICAÇÕES - Receba alertas sobre limites de categoria e transações.",20,t),t=o("6. CONFIGURAÇÕES - Personalize o aplicativo e exporte seus dados.",20,t),t+=15,t=o("🎯 FUNCIONALIDADES PRINCIPAIS",20,t),t+=10,t=o("• Navegação por deslizamento entre abas",20,t),t=o("• Reconhecimento de voz para adicionar transações",20,t),t=o("• Exportação para Excel e PDF",20,t),t=o("• Backup e restauração de dados",20,t),t=o("• Notificações push para alertas",20,t),t=o("• Tema claro/escuro",20,t),t=o("• Instalação como PWA",20,t),t+=15,t=o("🔧 DICAS DE USO",20,t),t+=10,t=o("• Use as setas do teclado para navegar entre abas",20,t),t=o("• Deslize horizontalmente para trocar de tela no mobile",20,t),t=o("• Configure limites nas categorias para receber alertas",20,t),t=o("• Use o botão de voz para adicionar transações rapidamente",20,t),t=o("• Faça backup regular dos seus dados",20,t),e.save("servo-tech-financas-guia.pdf"),window.Snackbar&&window.Snackbar({message:"✅ Guia PDF exportado com sucesso!",type:"success"})}catch(n){console.error("❌ Erro ao exportar guia PDF:",n),window.Snackbar?window.Snackbar({message:"Erro ao exportar guia PDF: "+n.message,type:"error"}):alert("Erro ao exportar guia PDF: "+n.message)}};function Qo(n,e,t={}){if(console.log("🔔 Tentando enviar notificação:",n,e),console.log("🔔 Permissão:",Notification.permission),console.log("🔔 Habilitada:",localStorage.getItem("notifications-enabled")),Notification.permission==="granted"&&localStorage.getItem("notifications-enabled")==="true")try{const o=new Notification(n,{body:e,icon:"/icon-192.png",badge:"/icon-192.png",tag:"servo-tech-financas",requireInteraction:!1,...t});console.log("✅ Notificação criada com sucesso:",o),o.onclick=()=>{console.log("🔔 Notificação clicada"),window.focus(),o.close()},setTimeout(()=>{o.close(),console.log("🔔 Notificação fechada automaticamente")},5e3),console.log("✅ Notificação enviada com sucesso!")}catch(o){console.error("❌ Erro ao criar notificação:",o)}else console.log("❌ Notificação não enviada - permissão ou configuração inválida"),console.log("   Permissão:",Notification.permission),console.log("   Habilitada:",localStorage.getItem("notifications-enabled"))}function WE(){if(localStorage.getItem("notifications-enabled")!=="true")return;const e=(window.appState.recorrentes||[]).filter(t=>t.parcelasRestantes>0);e.length>0&&Qo("Recorrentes Pendentes",`Você tem ${e.length} despesa(s) recorrente(s) para efetivar este mês.`)}function KE(){if(console.log("🔍 Iniciando verificação de limites de categoria..."),console.log("🔍 Notificações habilitadas:",localStorage.getItem("notifications-enabled")==="true"),localStorage.getItem("notifications-enabled")!=="true"){console.log("❌ Notificações desabilitadas, pulando verificação");return}const n=window.appState.categories||[],e=window.appState.transactions||[];console.log("🔍 Categorias encontradas:",n.length),console.log("🔍 Transações encontradas:",e.length),n.forEach(t=>{if(t.limite){const o=e.filter(s=>s.categoriaId===t.id&&s.tipo===t.tipo).reduce((s,c)=>s+parseFloat(c.valor),0),r=parseFloat(t.limite),a=o/r*100;console.log(`🔍 ${t.nome}: R$ ${o.toFixed(2)} / R$ ${r.toFixed(2)} (${a.toFixed(1)}%)`),a>=80&&(console.log(`⚠️ ${t.nome} atingiu ${a.toFixed(1)}% do limite!`),Qo("⚠️ Limite de Categoria",`${t.nome} está com ${a.toFixed(1)}% do limite usado (R$ ${o.toFixed(2)} / R$ ${r.toFixed(2)}).`)),a>100&&(console.log(`🚨 ${t.nome} ULTRAPASSOU o limite em ${(a-100).toFixed(1)}%!`),Qo("🚨 LIMITE ULTRAPASSADO!",`${t.nome} ultrapassou o limite em ${(a-100).toFixed(1)}%! (R$ ${o.toFixed(2)} / R$ ${r.toFixed(2)})`))}})}window.forceUIUpdate=function(){console.log("🔄 Forçando atualização da UI...");const n=document.querySelector(".nav-btn.active")?.getAttribute("data-route");console.log("📍 Aba atual:",n),requestAnimationFrame(()=>{n&&window.router&&(console.log("🔄 Recarregando aba:",n),window.router(n))})};window.syncThemeAcrossTabs=function(){const e=document.documentElement.classList.contains("dark");document.querySelectorAll('[class*="dark:"]').forEach(o=>{o.offsetHeight}),document.querySelectorAll("#theme-icon").forEach(o=>{o.textContent=e?"🌙":"☀️"}),console.log("🎨 Tema sincronizado em todas as abas")};window.testNotification=function(){console.log("🔔 Testando notificações..."),console.log("📱 Permissão do navegador:",Notification.permission),console.log("💾 localStorage:",localStorage.getItem("notifications-enabled"));const n=Notification.permission,e=localStorage.getItem("notifications-enabled")==="true";if(n==="granted"&&e)console.log("✅ Notificações ativadas - enviando teste..."),Qo("🔔 Teste de Notificação","As notificações estão funcionando perfeitamente!"),window.Snackbar&&window.Snackbar({message:"✅ Notificação de teste enviada!",type:"success"});else{let t="";n==="denied"?t="❌ Permissão negada pelo navegador. Vá em Configurações > Notificações e permita.":n==="default"?t='❌ Permissão não solicitada. Clique em "Ativar Notificações" primeiro.':e?t="❌ Erro desconhecido com notificações.":t='❌ Notificações desativadas. Clique em "Ativar Notificações" primeiro.',console.log("❌ Erro:",t),window.Snackbar?window.Snackbar({message:t,type:"error"}):alert(t)}};window.showNotification=Qo;window.checkRecorrentesPendentes=WE;window.checkLimitesCategoria=KE;let Lo=null,Fo=null,Vo=null,Oo=null;async function Vp(n){if(Lo&&Lo(),!n)return;const{doc:e,onSnapshot:t}=await pe(async()=>{const{doc:r,onSnapshot:a}=await Promise.resolve().then(()=>Ne);return{doc:r,onSnapshot:a}},void 0),o=e(q,"budgets",n);Lo=t(o,r=>{r.exists()&&(window.appState.currentBudget={id:r.id,...r.data()},console.log("🔄 Orçamento atualizado:",r.data().nome),setTimeout(async()=>{window.renderSettings&&(await window.renderSettings(),console.log("✅ renderSettings executado")),window.renderDashboard&&(window.renderDashboard(),console.log("✅ renderDashboard executado"))},100))})}async function Op(n){if(Fo&&Fo(),!n)return;console.log("🎧 Iniciando listener de transações para budgetId:",n);const{query:e,collection:t,where:o,onSnapshot:r}=await pe(async()=>{const{query:s,collection:c,where:l,onSnapshot:d}=await Promise.resolve().then(()=>Ne);return{query:s,collection:c,where:l,onSnapshot:d}},void 0),a=e(t(q,"transactions"),o("budgetId","==",n));Fo=r(a,s=>{console.log("🎧 Listener de transações executado!");const c=[];s.forEach(b=>{c.push({id:b.id,...b.data()})});const l=window.appState.transactions.map(b=>b.id).sort(),d=c.map(b=>b.id).sort(),h=JSON.stringify(l)!==JSON.stringify(d),g=window.appState.transactions.map(b=>({id:b.id,descricao:b.descricao,valor:b.valor,categoriaId:b.categoriaId})).sort((b,T)=>b.id.localeCompare(T.id)),m=c.map(b=>({id:b.id,descricao:b.descricao,valor:b.valor,categoriaId:b.categoriaId})).sort((b,T)=>b.id.localeCompare(T.id)),f=JSON.stringify(g)!==JSON.stringify(m),v=h||f;c.sort((b,T)=>{let D,L;return b.createdAt&&typeof b.createdAt=="object"&&b.createdAt.seconds?D=new Date(b.createdAt.seconds*1e3):D=new Date(b.createdAt),T.createdAt&&typeof T.createdAt=="object"&&T.createdAt.seconds?L=new Date(T.createdAt.seconds*1e3):L=new Date(T.createdAt),L-D}),window.appState.transactions=c,console.log("🔄 Transações atualizadas:",c.length,"itens"),console.log("🔄 Houve mudança?",v),v?(console.log("🎯 Atualizando UI após mudança nas transações..."),window.renderDashboard&&(console.log("📊 Executando renderDashboard..."),window.renderDashboard()),window.renderTransactions&&(console.log("📋 Executando renderTransactions..."),window.renderTransactions()),window.forceUIUpdate&&(setTimeout(()=>window.forceUIUpdate(),50),setTimeout(()=>window.forceUIUpdate(),200))):console.log("📊 Nenhuma mudança detectada, pulando atualização")},s=>{console.error("❌ Erro no listener de transações:",s)})}async function Bp(n){if(Vo&&Vo(),!n)return;console.log("🎧 Iniciando listener de categorias para budgetId:",n);const{query:e,collection:t,where:o,onSnapshot:r}=await pe(async()=>{const{query:s,collection:c,where:l,onSnapshot:d}=await Promise.resolve().then(()=>Ne);return{query:s,collection:c,where:l,onSnapshot:d}},void 0),a=e(t(q,"categories"),o("budgetId","==",n));Vo=r(a,s=>{console.log("🎧 Listener de categorias executado!");const c=[];s.forEach(b=>{c.push({id:b.id,...b.data()})});const l=window.appState.categories.map(b=>b.id).sort(),d=c.map(b=>b.id).sort(),h=JSON.stringify(l)!==JSON.stringify(d),g=window.appState.categories.map(b=>({id:b.id,nome:b.nome,limite:b.limite,cor:b.cor})).sort((b,T)=>b.id.localeCompare(T.id)),m=c.map(b=>({id:b.id,nome:b.nome,limite:b.limite,cor:b.cor})).sort((b,T)=>b.id.localeCompare(T.id)),f=JSON.stringify(g)!==JSON.stringify(m),v=h||f;window.appState.categories=c,console.log("🔄 Categorias atualizadas:",c.length,"itens"),console.log("🔄 Houve mudança?",v),v?(console.log("🎯 Atualizando UI após mudança nas categorias..."),window.renderDashboard&&(console.log("📊 Executando renderDashboard..."),window.renderDashboard()),window.renderCategories&&(console.log("📂 Executando renderCategories..."),window.renderCategories()),window.forceUIUpdate&&(setTimeout(()=>window.forceUIUpdate(),50),setTimeout(()=>window.forceUIUpdate(),200))):console.log("📊 Nenhuma mudança detectada, pulando atualização")},s=>{console.error("❌ Erro no listener de categorias:",s)})}async function Up(n){if(Oo&&Oo(),!n)return;console.log("🎧 Iniciando listener de recorrentes para budgetId:",n);const{query:e,collection:t,where:o,onSnapshot:r}=await pe(async()=>{const{query:s,collection:c,where:l,onSnapshot:d}=await Promise.resolve().then(()=>Ne);return{query:s,collection:c,where:l,onSnapshot:d}},void 0),a=e(t(q,"recorrentes"),o("budgetId","==",n));Oo=r(a,s=>{console.log("🎧 Listener de recorrentes executado!");const c=[];s.forEach(b=>{c.push({id:b.id,...b.data()})});const l=window.appState.recorrentes.map(b=>b.id).sort(),d=c.map(b=>b.id).sort(),h=JSON.stringify(l)!==JSON.stringify(d),g=window.appState.recorrentes.map(b=>({id:b.id,descricao:b.descricao,valor:b.valor,parcelasRestantes:b.parcelasRestantes,ativa:b.ativa})).sort((b,T)=>b.id.localeCompare(T.id)),m=c.map(b=>({id:b.id,descricao:b.descricao,valor:b.valor,parcelasRestantes:b.parcelasRestantes,ativa:b.ativa})).sort((b,T)=>b.id.localeCompare(T.id)),f=JSON.stringify(g)!==JSON.stringify(m),v=h||f;window.appState.recorrentes=c,console.log("🔄 Recorrentes atualizados:",c.length,"itens"),console.log("🔄 Houve mudança?",v),v?(console.log("🎯 Atualizando UI após mudança nos recorrentes..."),window.renderDashboard&&(console.log("📊 Executando renderDashboard..."),window.renderDashboard()),window._renderRecorrentes&&(console.log("🔄 Executando _renderRecorrentes..."),window._renderRecorrentes()),window.forceUIUpdate&&(setTimeout(()=>window.forceUIUpdate(),50),setTimeout(()=>window.forceUIUpdate(),200))):console.log("📊 Nenhuma mudança detectada, pulando atualização")},s=>{console.error("❌ Erro no listener de recorrentes:",s)})}async function pc(n){console.log("🚀 Iniciando listeners para orçamento:",n),console.log("📍 Estado atual:",{currentUser:window.appState.currentUser?.uid,currentBudget:window.appState.currentBudget?.id,budgetId:n}),zp(),await Vp(n),await Op(n),await Bp(n),await Up(n),await Xa(),console.log("✅ Todos os listeners iniciados"),console.log("🔍 Verificando se listeners estão ativos:",{unsubscribeBudget:!!Lo,unsubscribeTransactions:!!Fo,unsubscribeCategories:!!Vo,unsubscribeRecorrentes:!!Oo}),setTimeout(()=>{console.log("🧪 Teste de listeners após 2 segundos:",{unsubscribeBudget:!!Lo,unsubscribeTransactions:!!Fo,unsubscribeCategories:!!Vo,unsubscribeRecorrentes:!!Oo})},2e3)}function zp(){console.log("🛑 Parando todos os listeners..."),["unsubscribeBudget","unsubscribeTransactions","unsubscribeCategories","unsubscribeRecorrentes","unsubscribeNotifications"].forEach(e=>{if(window[e])try{window[e](),window[e]=null,console.log(`✅ Listener ${e} parado`)}catch(t){console.error(`❌ Erro ao parar listener ${e}:`,t)}}),console.log("✅ Todos os listeners parados")}window.startAllListeners=pc;window.stopAllListeners=zp;window.listenCurrentBudget=Vp;window.listenTransactions=Op;window.listenCategories=Bp;window.listenRecorrentes=Up;window.migrarTransacoesAntigas=function(){console.log("🔄 Iniciando migração de transações antigas..."),window.Snackbar&&window.Snackbar({message:"🔄 Migração iniciada...",type:"info"}),setTimeout(()=>{window.Snackbar&&window.Snackbar({message:"✅ Migração concluída com sucesso!",type:"success"})},2e3)};window.corrigirTipoCategoria=function(){console.log("🔧 Iniciando correção de tipos de categoria..."),window.Snackbar&&window.Snackbar({message:"🔧 Correção iniciada...",type:"info"}),setTimeout(()=>{window.Snackbar&&window.Snackbar({message:"✅ Correção concluída com sucesso!",type:"success"})},2e3)};window.showCategoryHistory=function(n){console.log("📊 Mostrando histórico da categoria:",n);const e=window.appState.categories.find(o=>o.id===n);if(!e){window.Snackbar&&window.Snackbar({message:"❌ Categoria não encontrada",type:"error"});return}const t=window.appState.transactions.filter(o=>o.categoriaId===n).sort((o,r)=>{const a=o.createdAt&&o.createdAt.toDate?o.createdAt.toDate():new Date(o.createdAt);return(r.createdAt&&r.createdAt.toDate?r.createdAt.toDate():new Date(r.createdAt))-a});if(window.Modal){const o=window.Modal({title:`Histórico - ${e.nome}`,content:`
        <div class="space-y-4">
          <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
            <h3 class="font-semibold text-gray-900 dark:text-white mb-3">📊 Resumo</h3>
            <div class="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p class="text-gray-600 dark:text-gray-400"><strong>Total de transações:</strong></p>
                <p class="text-lg font-bold text-gray-900 dark:text-white">${t.length}</p>
              </div>
              <div>
                <p class="text-gray-600 dark:text-gray-400"><strong>Valor total:</strong></p>
                <p class="text-lg font-bold ${t.reduce((r,a)=>r+(a.tipo==="receita"?parseFloat(a.valor):-parseFloat(a.valor)),0)>=0?"text-green-600 dark:text-green-400":"text-red-600 dark:text-red-400"}">${t.reduce((r,a)=>r+(a.tipo==="receita"?parseFloat(a.valor):-parseFloat(a.valor)),0)>=0?"+":""}R$ ${t.reduce((r,a)=>r+(a.tipo==="receita"?parseFloat(a.valor):-parseFloat(a.valor)),0).toFixed(2)}</p>
              </div>
              ${(()=>{const r=t.filter(s=>s.tipo==="receita"),a=t.filter(s=>s.tipo==="despesa");return r.length>0||a.length>0?`
                  <div>
                    <p class="text-gray-600 dark:text-gray-400"><strong>💚 Receitas:</strong></p>
                    <p class="text-sm font-medium text-green-600 dark:text-green-400">${r.length} • +R$ ${r.reduce((s,c)=>s+parseFloat(c.valor),0).toFixed(2)}</p>
                  </div>
                  <div>
                    <p class="text-gray-600 dark:text-gray-400"><strong>❤️ Despesas:</strong></p>
                    <p class="text-sm font-medium text-red-600 dark:text-red-400">${a.length} • -R$ ${a.reduce((s,c)=>s+parseFloat(c.valor),0).toFixed(2)}</p>
                  </div>
                `:""})()}
            </div>
          </div>
          ${t.length>0?`
            <div>
              <h3 class="font-semibold text-gray-900 dark:text-white mb-3">📋 Histórico de Transações</h3>
              <div class="max-h-60 overflow-y-auto bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 p-2">
              ${t.map(r=>`
                <div class="flex justify-between items-center py-3 border-b border-gray-200 dark:border-gray-700 last:border-b-0">
                  <div class="flex-1 min-w-0">
                    <div class="font-medium text-gray-900 dark:text-white truncate">${r.descricao}</div>
                    <div class="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      📅 ${r.createdAt&&r.createdAt.toDate?r.createdAt.toDate().toLocaleDateString("pt-BR"):new Date(r.createdAt).toLocaleDateString("pt-BR")}
                      • ${r.tipo==="receita"?"💚 Receita":"❤️ Despesa"}
                      ${r.recorrenteId?" • 🔄 Recorrente":""}
                    </div>
                  </div>
                  <div class="text-right ml-4">
                    <div class="font-bold text-lg ${r.tipo==="receita"?"text-green-600 dark:text-green-400":"text-red-600 dark:text-red-400"}">
                      ${r.tipo==="receita"?"+":"-"}R$ ${parseFloat(r.valor).toFixed(2)}
                    </div>
                  </div>
                </div>
              `).join("")}
              </div>
            </div>
          `:`
            <div class="text-center py-4 text-gray-500">
              Nenhuma transação encontrada para esta categoria
            </div>
          `}
        </div>
      `,onClose:()=>{document.querySelector(".modal")?.remove()}});document.body.appendChild(o)}};async function qp(n){try{const{getDoc:e,doc:t}=await pe(async()=>{const{getDoc:a,doc:s}=await Promise.resolve().then(()=>Ne);return{getDoc:a,doc:s}},void 0),o=t(q,"users",n),r=await e(o);return r.exists()?r.data():{email:"Usuário não encontrado",displayName:"Usuário não encontrado"}}catch(e){return console.error("Erro ao buscar informações do usuário:",e),{email:"Erro ao carregar",displayName:"Erro ao carregar"}}}async function YE(n,e,t){try{const{getDoc:o,addDoc:r,collection:a,doc:s,serverTimestamp:c}=await pe(async()=>{const{getDoc:b,addDoc:T,collection:D,doc:L,serverTimestamp:O}=await Promise.resolve().then(()=>Ne);return{getDoc:b,addDoc:T,collection:D,doc:L,serverTimestamp:O}},void 0),l=await o(s(q,"budgets",n));if(!l.exists()){console.log("Orçamento não encontrado para notificação");return}const d=l.data();if(!d.usuariosPermitidos||d.usuariosPermitidos.length===0){console.log("Orçamento não compartilhado, não enviando notificação");return}const h=await qp(e),g=h?.displayName||h?.email||"Usuário";let m="Sem categoria";if(t.categoriaId){const b=await o(s(q,"categories",t.categoriaId));b.exists()&&(m=b.data().nome)}const f={budgetId:n,budgetName:d.nome||"Orçamento",senderUid:e,senderName:g,transactionId:t.id,transactionDescricao:t.descricao,transactionValor:t.valor,transactionCategoria:m,transactionTipo:t.tipo||"despesa",createdAt:c(),read:!1,type:"new_transaction"},v=d.usuariosPermitidos.filter(b=>b!==e).map(async b=>{try{await r(a(q,"notifications"),{...f,recipientUid:b}),console.log(`📧 Notificação enviada para usuário: ${b}`)}catch(T){console.error(`Erro ao enviar notificação para ${b}:`,T)}});await Promise.all(v),console.log("✅ Notificações enviadas com sucesso")}catch(o){console.error("Erro ao enviar notificações:",o)}}async function XE(n){try{const{updateDoc:e,doc:t,arrayRemove:o}=await pe(async()=>{const{updateDoc:s,doc:c,arrayRemove:l}=await Promise.resolve().then(()=>Ne);return{updateDoc:s,doc:c,arrayRemove:l}},void 0),r=window.appState.currentUser;if(!r){console.error("Usuário não autenticado");return}const a=t(q,"budgets",n);await e(a,{usuariosPermitidos:o(r.uid)}),console.log("✅ Usuário removido do orçamento compartilhado"),window.Snackbar&&window.Snackbar({message:"✅ Saída do orçamento realizada com sucesso",type:"success"})}catch(e){console.error("Erro ao sair do orçamento:",e),window.Snackbar&&window.Snackbar({message:"❌ Erro ao sair do orçamento",type:"error"})}}async function QE(n,e){try{const{updateDoc:t,doc:o,arrayRemove:r}=await pe(async()=>{const{updateDoc:c,doc:l,arrayRemove:d}=await Promise.resolve().then(()=>Ne);return{updateDoc:c,doc:l,arrayRemove:d}},void 0);if(!window.appState.currentUser){console.error("Usuário não autenticado");return}const s=o(q,"budgets",n);await t(s,{usuariosPermitidos:r(e)}),console.log("✅ Usuário removido do orçamento compartilhado"),window.Snackbar&&window.Snackbar({message:"✅ Usuário removido com sucesso",type:"success"})}catch(t){console.error("Erro ao remover usuário:",t),window.Snackbar&&window.Snackbar({message:"❌ Erro ao remover usuário",type:"error"})}}window.getUserInfo=qp;window.sendTransactionNotification=YE;window.leaveSharedBudget=XE;window.removeUserFromBudget=QE;window.calcularParcelaRecorrente=No;window.calcularStatusRecorrente=xp;window.showModal=function(n,e=""){if(console.log("🔧 showModal chamada com:",{title:e,content:n.substring(0,100)+"..."}),!window.Modal){console.error("❌ window.Modal não está disponível");return}const t=window.Modal({title:e,content:n,onClose:()=>{closeModal()}});return document.body.appendChild(t),t};window.closeModal=function(){console.log("🔧 closeModal chamada");const n=document.getElementById("app-modal");n&&(n.remove(),window.toggleFABOnModal&&window.toggleFABOnModal())};window.showConfirmationModal=function(n){const{title:e="Confirmar Ação",message:t="Tem certeza que deseja realizar esta ação?",confirmText:o="Confirmar",cancelText:r="Cancelar",confirmColor:a="bg-red-500 hover:bg-red-600",onConfirm:s,onCancel:c}=n,l=`
    <div class="modal-content max-w-md mx-auto">
      <div class="text-center">
        <div class="text-6xl mb-4">⚠️</div>
        <h3 class="text-lg font-semibold text-gray-800 dark:text-white mb-2">${e}</h3>
        <p class="text-gray-600 dark:text-gray-400 mb-6">${t}</p>
        
        <div class="flex justify-center space-x-3">
          <button id="cancel-btn" 
                  class="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
            ${r}
          </button>
          <button id="confirm-btn" 
                  class="px-4 py-2 text-white rounded-lg transition-colors ${a}">
            ${o}
          </button>
        </div>
      </div>
    </div>
  `,d=window.showModal(l);return setTimeout(()=>{const h=document.getElementById("cancel-btn"),g=document.getElementById("confirm-btn");h&&(h.onclick=()=>{window.closeModal(),c&&c()}),g&&(g.onclick=()=>{window.closeModal(),s&&s()})},100),d};window.showAddBudgetModal=function(){console.log("🔧 Abrindo modal de criar orçamento..."),window.showModal(`
    <div class="modal-content max-w-md mx-auto">
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-xl font-bold text-gray-800 dark:text-white">Criar Novo Orçamento</h2>
        <button onclick="closeModal()" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
          <span class="text-2xl">×</span>
        </button>
      </div>
      
      <form id="add-budget-form" class="space-y-4">
        <div>
          <label class="modal-label">Nome do Orçamento</label>
          <input type="text" id="budget-name" required
                 class="w-full px-3 py-2 border border-gray-300 rounded-lg"
                 placeholder="Ex: Orçamento Familiar"
                 style="background-color: var(--select-bg, #ffffff); color: var(--select-text, #1f2937); font-weight: 500;">
        </div>
        
        <div>
          <label class="modal-label">Descrição (opcional)</label>
          <textarea id="budget-description"
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    placeholder="Descrição do orçamento"
                    rows="3"
                    style="background-color: var(--select-bg, #ffffff); color: var(--select-text, #1f2937); font-weight: 500;"></textarea>
        </div>
        
        <div>
          <label class="modal-label">Tipo de Orçamento</label>
          <select id="budget-type" required
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  style="background-color: var(--select-bg, #ffffff); color: var(--select-text, #1f2937); font-weight: 500;">
            <option value="pessoal">Pessoal</option>
            <option value="compartilhado">Compartilhado</option>
          </select>
        </div>
        
        <div class="flex justify-end space-x-3 pt-4">
          <button type="button" onclick="closeModal()" class="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg">Cancelar</button>
          <button type="submit" class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">Criar Orçamento</button>
        </div>
      </form>
    </div>
  `),document.getElementById("add-budget-form").addEventListener("submit",async e=>{e.preventDefault();const t=document.getElementById("budget-name").value,o=document.getElementById("budget-description").value,r=document.getElementById("budget-type").value;try{const a={nome:t,descricao:o,tipo:r,criadoPor:window.appState.currentUser.uid,membros:[window.appState.currentUser.uid],criadoEm:new Date},s=await Ha(a);if(await Tn(),closeModal(),window.Snackbar&&window.Snackbar({message:"✅ Orçamento criado com sucesso!",type:"success"}),window.appState.budgets.length===1){const c=window.appState.budgets.find(l=>l.id===s);c&&await lc(c)}}catch(a){console.error("❌ Erro ao criar orçamento:",a),window.Snackbar&&window.Snackbar({message:"Erro ao criar orçamento: "+a.message,type:"error"})}})};window.compartilharOrcamento=async function(){console.log("🔧 Abrindo modal de compartilhar orçamento...");const n=window.appState.currentBudget;if(!n){window.Snackbar&&window.Snackbar({message:"Nenhum orçamento selecionado",type:"warning"});return}const e=`
    <div class="modal-content max-w-md mx-auto">
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-xl font-bold text-gray-800 dark:text-white">Compartilhar Orçamento</h2>
        <button onclick="closeModal()" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
          <span class="text-2xl">×</span>
        </button>
      </div>
      
      <div class="space-y-4">
        <div class="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
          <h3 class="font-semibold text-blue-800 dark:text-blue-200 mb-2">${n.nome}</h3>
          <p class="text-sm text-blue-600 dark:text-blue-300">ID do Orçamento: <code class="bg-blue-100 dark:bg-blue-800 px-2 py-1 rounded">${n.id}</code></p>
        </div>
        
        <div>
          <label class="modal-label">Email do Usuário</label>
          <input type="email" id="user-email" required
                 class="w-full px-3 py-2 border border-gray-300 rounded-lg"
                 placeholder="usuario@exemplo.com"
                 style="background-color: var(--select-bg, #ffffff); color: var(--select-text, #1f2937); font-weight: 500;">
        </div>
        
        <div class="flex justify-end space-x-3 pt-4">
          <button type="button" onclick="closeModal()" class="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg">Cancelar</button>
          <button onclick="window.inviteUserToBudget()" class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">Convidar</button>
        </div>
      </div>
    </div>
  `;window.showModal(e)};window.inviteUserToBudget=async function(){const n=document.getElementById("user-email").value,e=window.appState.currentBudget;if(console.log("🔍 Tentando convidar usuário:",{email:n,budgetId:e?.id,budgetName:e?.nome,budgetData:e,currentUser:window.appState.currentUser?.uid}),!n||!e){console.log("❌ Email ou orçamento inválido:",{email:n,budgetId:e?.id}),window.Snackbar&&window.Snackbar({message:"Email inválido ou orçamento não selecionado",type:"error"});return}try{console.log("🔍 Buscando usuário por email:",n);const t=fe(oe(q,"users"),ne("email","==",n)),o=await he(t);if(console.log("🔍 Resultado da busca:",{empty:o.empty,size:o.size,docs:o.docs.map(h=>({id:h.id,data:h.data()}))}),o.empty){console.log("❌ Usuário não encontrado com email:",n),window.Snackbar&&window.Snackbar({message:"Usuário não encontrado com este email",type:"warning"});return}const a=o.docs[0].id;if(e.usuariosPermitidos&&e.usuariosPermitidos.includes(a)){window.Snackbar&&window.Snackbar({message:"Usuário já é membro deste orçamento",type:"info"});return}console.log("🔍 Verificando convites existentes para:",{budgetId:e.id,invitedUserId:a});const s=fe(oe(q,"budgetInvitations"),ne("budgetId","==",e.id),ne("invitedUserId","==",a),ne("status","==","pending")),c=await he(s);if(console.log("🔍 Convites existentes:",{empty:c.empty,size:c.size,docs:c.docs.map(h=>({id:h.id,data:h.data()}))}),!c.empty){console.log("❌ Convite já existe para este usuário"),window.Snackbar&&window.Snackbar({message:"Convite já enviado para este usuário",type:"info"});return}const l={budgetId:e.id,budgetName:e.nome||"Orçamento sem nome",invitedUserId:a,invitedUserEmail:n,invitedByUserId:window.appState.currentUser.uid,invitedByUserEmail:window.appState.currentUser.email,status:"pending",createdAt:Ae(),updatedAt:Ae()};console.log("📨 Criando convite com dados:",l);const d=await Xt(oe(q,"budgetInvitations"),l);console.log("✅ Convite criado com ID:",d.id),closeModal(),window.Snackbar&&window.Snackbar({message:"✅ Convite enviado com sucesso! Aguardando aceitação.",type:"success"})}catch(t){console.error("❌ Erro ao enviar convite:",t),window.Snackbar&&window.Snackbar({message:"Erro ao enviar convite: "+t.message,type:"error"})}};window.acceptBudgetInvitation=async function(n){try{console.log("🔍 Aceitando convite:",n);const e=qe(q,"budgetInvitations",n),t=await Go(e);if(!t.exists()){window.Snackbar&&window.Snackbar({message:"Convite não encontrado",type:"error"});return}const o=t.data();if(o.invitedUserId!==window.appState.currentUser.uid){window.Snackbar&&window.Snackbar({message:"Este convite não é para você",type:"error"});return}if(o.status!=="pending"){window.Snackbar&&window.Snackbar({message:"Este convite já foi respondido",type:"info"});return}const r=qe(q,"budgets",o.budgetId);if(!(await Go(r)).exists()){window.Snackbar&&window.Snackbar({message:"Orçamento não encontrado",type:"error"});return}console.log("🔍 Adicionando usuário ao orçamento:",{budgetId:o.budgetId,userId:window.appState.currentUser.uid}),await ht(r,{usuariosPermitidos:Ki(window.appState.currentUser.uid),updatedAt:Ae()}),console.log("✅ Usuário adicionado ao orçamento"),await ht(e,{status:"accepted",updatedAt:Ae()}),console.log("✅ Status do convite atualizado para aceito"),window.Snackbar&&window.Snackbar({message:"✅ Convite aceito! Você agora tem acesso ao orçamento.",type:"success"}),await Tn(),window.renderSettings&&await window.renderSettings()}catch(e){console.error("❌ Erro ao aceitar convite:",e),window.Snackbar&&window.Snackbar({message:"Erro ao aceitar convite: "+e.message,type:"error"})}};window.declineBudgetInvitation=async function(n){try{const e=qe(q,"budgetInvitations",n),t=await Go(e);if(!t.exists()){window.Snackbar&&window.Snackbar({message:"Convite não encontrado",type:"error"});return}const o=t.data();if(o.invitedUserId!==window.appState.currentUser.uid){window.Snackbar&&window.Snackbar({message:"Este convite não é para você",type:"error"});return}if(o.status!=="pending"){window.Snackbar&&window.Snackbar({message:"Este convite já foi respondido",type:"info"});return}await ht(e,{status:"declined",updatedAt:Ae()}),window.Snackbar&&window.Snackbar({message:"Convite recusado",type:"info"}),window.renderSettings&&await window.renderSettings()}catch(e){console.error("❌ Erro ao recusar convite:",e),window.Snackbar&&window.Snackbar({message:"Erro ao recusar convite: "+e.message,type:"error"})}};window.loadBudgetInvitations=async function(){try{const n=window.appState.currentUser;if(console.log("🔍 Carregando convites para usuário:",n?.uid,n?.email),!n)return console.log("❌ Usuário não autenticado"),[];const e=fe(oe(q,"budgetInvitations"),ne("invitedUserId","==",n.uid),ne("status","==","pending"));console.log("🔍 Executando query de convites...");const t=await he(e);console.log("📊 Total de convites encontrados:",t.size);const o=[];return t.forEach(r=>{const a=r.data();console.log("📨 Convite encontrado:",{id:r.id,...a}),o.push({id:r.id,...a})}),o.sort((r,a)=>{const s=r.createdAt?r.createdAt.toDate():new Date(0);return(a.createdAt?a.createdAt.toDate():new Date(0))-s}),console.log("✅ Convites carregados com sucesso:",o.length),o}catch(n){return console.error("❌ Erro ao carregar convites:",n),[]}};window.selectSharedBudget=function(){console.log("🔧 Abrindo modal de entrar em orçamento compartilhado..."),window.showModal(`
    <div class="modal-content max-w-md mx-auto">
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-xl font-bold text-gray-800 dark:text-white">Entrar em Orçamento Compartilhado</h2>
        <button onclick="closeModal()" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
          <span class="text-2xl">×</span>
        </button>
      </div>
      
      <form id="join-budget-form" class="space-y-4">
        <div>
          <label class="modal-label">ID do Orçamento</label>
          <input type="text" id="budget-id" required
                 class="w-full px-3 py-2 border border-gray-300 rounded-lg"
                 placeholder="Cole aqui o ID do orçamento"
                 style="background-color: var(--select-bg, #ffffff); color: var(--select-text, #1f2937); font-weight: 500;">
        </div>
        
        <div class="flex justify-end space-x-3 pt-4">
          <button type="button" onclick="closeModal()" class="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg">Cancelar</button>
          <button type="submit" class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">Entrar</button>
        </div>
      </form>
    </div>
  `),document.getElementById("join-budget-form").addEventListener("submit",async e=>{e.preventDefault();const t=document.getElementById("budget-id").value.trim();if(!t){window.Snackbar&&window.Snackbar({message:"ID do orçamento é obrigatório",type:"warning"});return}try{const o=qe(q,"budgets",t),r=await Go(o);if(!r.exists()){window.Snackbar&&window.Snackbar({message:"Orçamento não encontrado",type:"error"});return}const a=r.data();if(a.usuariosPermitidos&&a.usuariosPermitidos.includes(window.appState.currentUser.uid)){window.Snackbar&&window.Snackbar({message:"Você já é membro deste orçamento",type:"info"});return}await ht(o,{usuariosPermitidos:Ki(window.appState.currentUser.uid),updatedAt:Ae()}),closeModal(),window.Snackbar&&window.Snackbar({message:"✅ Você entrou no orçamento com sucesso!",type:"success"}),await Tn();const s=window.appState.budgets.find(c=>c.id===t);s&&window.setCurrentBudget&&await window.setCurrentBudget(s)}catch(o){console.error("❌ Erro ao entrar no orçamento:",o),window.Snackbar&&window.Snackbar({message:"Erro ao entrar no orçamento: "+o.message,type:"error"})}})};function Kd(){const n=new Date,e=n.getHours().toString().padStart(2,"0"),t=n.getMinutes().toString().padStart(2,"0"),o=n.getSeconds().toString().padStart(2,"0"),r=`${e}:${t}:${o}`,a=n.getDate(),s=n.getMonth()+1,c=n.getFullYear(),l=`${a}/${s}/${c}`,d=document.getElementById("digital-clock"),h=document.getElementById("digital-date");d&&(d.textContent=r),h&&(h.textContent=l)}function ii(){Kd(),setInterval(Kd,1e3)}document.addEventListener("DOMContentLoaded",()=>{console.log("DOM carregado, verificando botão de tema...");const n=document.getElementById("theme-toggle-btn");console.log("Botão encontrado:",n),n?(console.log("Botão existe, chamando setupThemeToggle..."),si()):(console.log("Botão não encontrado no DOM, tentando novamente em 1 segundo..."),setTimeout(()=>{const e=document.getElementById("theme-toggle-btn");console.log("Tentativa 2 - Botão encontrado:",e),e&&si()},1e3)),ii()});window.showBudgetAlerts=function(){if(console.log("🚨 Mostrando alertas de orçamento..."),!window.appState?.categories||!window.appState?.transactions){console.warn("⚠️ Dados não carregados para mostrar alertas");return}const n=window.appState.categories.filter(c=>{if(c.tipo!=="despesa")return!1;const d=window.appState.transactions.filter(m=>m.categoriaId===c.id&&m.tipo===c.tipo).reduce((m,f)=>m+parseFloat(f.valor),0),h=parseFloat(c.limite||0),g=h>0?d/h:0;return h>0&&g>.7}),e=window.appState.categories.filter(c=>c.tipo==="despesa").reduce((c,l)=>c+parseFloat(l.limite||0),0),t=window.appState.transactions.filter(c=>c.tipo==="despesa").reduce((c,l)=>c+parseFloat(l.valor),0),o=e>0?t/e:0,r=o>.7;if(n.length===0&&!r){window.Snackbar&&window.Snackbar({message:"✅ Nenhum alerta encontrado! Tudo dentro do orçado.",type:"success"});return}let a="";r&&(a+=`
      <div class="bg-red-50 border border-red-200 rounded-lg p-4 mb-3">
        <div class="flex items-center mb-2">
          <span class="text-red-600 text-xl mr-2">🚨</span>
          <h4 class="font-bold text-red-800">Orçamento Geral em Alerta</h4>
        </div>
        <p class="text-red-700 text-sm">
          Você gastou <strong>R$ ${t.toFixed(2)}</strong> de <strong>R$ ${e.toFixed(2)}</strong> 
          (<strong>${(o*100).toFixed(0)}%</strong> do orçamento total)
        </p>
      </div>
    `),n.forEach(c=>{const l=window.appState.transactions.filter(v=>v.categoriaId===c.id&&v.tipo===c.tipo),d=l.reduce((v,b)=>v+parseFloat(b.valor),0),h=parseFloat(c.limite||0),g=d/h*100;let m="yellow",f="Atenção";g>=100?(m="red",f="Limite Ultrapassado"):g>=90&&(m="red",f="Crítico"),a+=`
      <div class="bg-${m}-50 border border-${m}-200 rounded-lg p-4 mb-3">
        <div class="flex items-center justify-between mb-2">
          <div class="flex items-center">
            <div class="w-4 h-4 rounded-full mr-2" style="background-color: ${c.cor||"#4F46E5"}"></div>
            <h4 class="font-bold text-${m}-800">${c.nome}</h4>
          </div>
          <span class="text-${m}-600 font-bold">${f}</span>
        </div>
        <div class="text-${m}-700 text-sm space-y-1">
          <p>Gasto: <strong>R$ ${d.toFixed(2)}</strong> de <strong>R$ ${h.toFixed(2)}</strong></p>
          <p>Percentual: <strong>${g.toFixed(0)}%</strong> do limite</p>
          <p>Transações: <strong>${l.length}</strong> nesta categoria</p>
        </div>
        <div class="mt-2">
          <div class="w-full bg-${m}-200 rounded-full h-2">
            <div class="bg-${m}-600 h-2 rounded-full" style="width: ${Math.min(g,100)}%"></div>
          </div>
        </div>
      </div>
    `});const s=`
    <div class="modal-content max-w-2xl mx-auto">
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-xl font-bold text-gray-800 dark:text-white flex items-center">
          <span class="text-2xl mr-2">⚠️</span>
          Alertas de Orçamento
        </h2>
        <button onclick="closeModal()" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
          <span class="text-2xl">×</span>
        </button>
      </div>
      
      <div class="max-h-96 overflow-y-auto">
        ${a}
      </div>
      
      <div class="flex justify-end pt-4 border-t border-gray-200 dark:border-gray-700">
        <button onclick="closeModal()" class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
          Entendi
        </button>
      </div>
    </div>
  `;window.showModal(s)};export{oe as c,q as d,he as g,fe as q,ht as u,ne as w};

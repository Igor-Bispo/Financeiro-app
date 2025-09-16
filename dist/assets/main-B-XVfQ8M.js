const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/index-IjmE10GR.js","assets/PeriodIndicator-a2W_bjaH.js","assets/TransactionsPage-CwVPq0Gj.js","assets/UIService-CkqgNauy.js","assets/perf-tobPnqr4.js","assets/CategoriesPage-qPYCdC2c.js","assets/NotificationsPage-Crmk4UkV.js","assets/NotificationModal-B569_tcv.js","assets/NotificationService-B-HO54SU.js","assets/VoiceService-F1rMbtYP.js","assets/VoiceSystem-CEBe8orV.js"])))=>i.map(i=>d[i]);
(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))o(r);new MutationObserver(r=>{for(const i of r)if(i.type==="childList")for(const s of i.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&o(s)}).observe(document,{childList:!0,subtree:!0});function t(r){const i={};return r.integrity&&(i.integrity=r.integrity),r.referrerPolicy&&(i.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?i.credentials="include":r.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function o(r){if(r.ep)return;r.ep=!0;const i=t(r);fetch(r.href,i)}})();const sw="modulepreload",aw=function(n){return"/"+n},wu={},R=function(e,t,o){let r=Promise.resolve();if(t&&t.length>0){let u=function(d){return Promise.all(d.map(f=>Promise.resolve(f).then(p=>({status:"fulfilled",value:p}),p=>({status:"rejected",reason:p}))))};document.getElementsByTagName("link");const s=document.querySelector("meta[property=csp-nonce]"),c=s?.nonce||s?.getAttribute("nonce");r=u(t.map(d=>{if(d=aw(d),d in wu)return;wu[d]=!0;const f=d.endsWith(".css"),p=f?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${d}"]${p}`))return;const m=document.createElement("link");if(m.rel=f?"stylesheet":sw,f||(m.as="script"),m.crossOrigin="",m.href=d,c&&m.setAttribute("nonce",c),document.head.appendChild(m),f)return new Promise((S,C)=>{m.addEventListener("load",S),m.addEventListener("error",()=>C(new Error(`Unable to preload CSS for ${d}`)))})}))}function i(s){const c=new Event("vite:preloadError",{cancelable:!0});if(c.payload=s,window.dispatchEvent(c),!c.defaultPrevented)throw s}return r.then(s=>{for(const c of s||[])c.status==="rejected"&&i(c.reason);return e().catch(i)})},cw=()=>{};var yu={};/**
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
 */const dh=function(n){const e=[];let t=0;for(let o=0;o<n.length;o++){let r=n.charCodeAt(o);r<128?e[t++]=r:r<2048?(e[t++]=r>>6|192,e[t++]=r&63|128):(r&64512)===55296&&o+1<n.length&&(n.charCodeAt(o+1)&64512)===56320?(r=65536+((r&1023)<<10)+(n.charCodeAt(++o)&1023),e[t++]=r>>18|240,e[t++]=r>>12&63|128,e[t++]=r>>6&63|128,e[t++]=r&63|128):(e[t++]=r>>12|224,e[t++]=r>>6&63|128,e[t++]=r&63|128)}return e},lw=function(n){const e=[];let t=0,o=0;for(;t<n.length;){const r=n[t++];if(r<128)e[o++]=String.fromCharCode(r);else if(r>191&&r<224){const i=n[t++];e[o++]=String.fromCharCode((r&31)<<6|i&63)}else if(r>239&&r<365){const i=n[t++],s=n[t++],c=n[t++],u=((r&7)<<18|(i&63)<<12|(s&63)<<6|c&63)-65536;e[o++]=String.fromCharCode(55296+(u>>10)),e[o++]=String.fromCharCode(56320+(u&1023))}else{const i=n[t++],s=n[t++];e[o++]=String.fromCharCode((r&15)<<12|(i&63)<<6|s&63)}}return e.join("")},hh={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,e){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();const t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,o=[];for(let r=0;r<n.length;r+=3){const i=n[r],s=r+1<n.length,c=s?n[r+1]:0,u=r+2<n.length,d=u?n[r+2]:0,f=i>>2,p=(i&3)<<4|c>>4;let m=(c&15)<<2|d>>6,S=d&63;u||(S=64,s||(m=64)),o.push(t[f],t[p],t[m],t[S])}return o.join("")},encodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(n):this.encodeByteArray(dh(n),e)},decodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(n):lw(this.decodeStringToByteArray(n,e))},decodeStringToByteArray(n,e){this.init_();const t=e?this.charToByteMapWebSafe_:this.charToByteMap_,o=[];for(let r=0;r<n.length;){const i=t[n.charAt(r++)],c=r<n.length?t[n.charAt(r)]:0;++r;const d=r<n.length?t[n.charAt(r)]:64;++r;const p=r<n.length?t[n.charAt(r)]:64;if(++r,i==null||c==null||d==null||p==null)throw new uw;const m=i<<2|c>>4;if(o.push(m),d!==64){const S=c<<4&240|d>>2;if(o.push(S),p!==64){const C=d<<6&192|p;o.push(C)}}}return o},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}};class uw extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const dw=function(n){const e=dh(n);return hh.encodeByteArray(e,!0)},gi=function(n){return dw(n).replace(/\./g,"")},fh=function(n){try{return hh.decodeString(n,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
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
 */function hw(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
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
 */const fw=()=>hw().__FIREBASE_DEFAULTS__,gw=()=>{if(typeof process>"u"||typeof yu>"u")return;const n=yu.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},pw=()=>{if(typeof document>"u")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=n&&fh(n[1]);return e&&JSON.parse(e)},Ui=()=>{try{return cw()||fw()||gw()||pw()}catch(n){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);return}},gh=n=>Ui()?.emulatorHosts?.[n],mw=n=>{const e=gh(n);if(!e)return;const t=e.lastIndexOf(":");if(t<=0||t+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const o=parseInt(e.substring(t+1),10);return e[0]==="["?[e.substring(1,t-1),o]:[e.substring(0,t),o]},ph=()=>Ui()?.config,mh=n=>Ui()?.[`_${n}`];/**
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
 */class ww{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,o)=>{t?this.reject(t):this.resolve(o),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,o))}}}/**
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
 */function uo(n){try{return(n.startsWith("http://")||n.startsWith("https://")?new URL(n).hostname:n).endsWith(".cloudworkstations.dev")}catch{return!1}}async function wh(n){return(await fetch(n,{credentials:"include"})).ok}/**
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
 */function yw(n,e){if(n.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const t={alg:"none",type:"JWT"},o=e||"demo-project",r=n.iat||0,i=n.sub||n.user_id;if(!i)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const s={iss:`https://securetoken.google.com/${o}`,aud:o,iat:r,exp:r+3600,auth_time:r,sub:i,user_id:i,firebase:{sign_in_provider:"custom",identities:{}},...n};return[gi(JSON.stringify(t)),gi(JSON.stringify(s)),""].join(".")}const Wo={};function _w(){const n={prod:[],emulator:[]};for(const e of Object.keys(Wo))Wo[e]?n.emulator.push(e):n.prod.push(e);return n}function vw(n){let e=document.getElementById(n),t=!1;return e||(e=document.createElement("div"),e.setAttribute("id",n),t=!0),{created:t,element:e}}let _u=!1;function yh(n,e){if(typeof window>"u"||typeof document>"u"||!uo(window.location.host)||Wo[n]===e||Wo[n]||_u)return;Wo[n]=e;function t(m){return`__firebase__banner__${m}`}const o="__firebase__banner",i=_w().prod.length>0;function s(){const m=document.getElementById(o);m&&m.remove()}function c(m){m.style.display="flex",m.style.background="#7faaf0",m.style.position="fixed",m.style.bottom="5px",m.style.left="5px",m.style.padding=".5em",m.style.borderRadius="5px",m.style.alignItems="center"}function u(m,S){m.setAttribute("width","24"),m.setAttribute("id",S),m.setAttribute("height","24"),m.setAttribute("viewBox","0 0 24 24"),m.setAttribute("fill","none"),m.style.marginLeft="-6px"}function d(){const m=document.createElement("span");return m.style.cursor="pointer",m.style.marginLeft="16px",m.style.fontSize="24px",m.innerHTML=" &times;",m.onclick=()=>{_u=!0,s()},m}function f(m,S){m.setAttribute("id",S),m.innerText="Learn more",m.href="https://firebase.google.com/docs/studio/preview-apps#preview-backend",m.setAttribute("target","__blank"),m.style.paddingLeft="5px",m.style.textDecoration="underline"}function p(){const m=vw(o),S=t("text"),C=document.getElementById(S)||document.createElement("span"),M=t("learnmore"),P=document.getElementById(M)||document.createElement("a"),U=t("preprendIcon"),G=document.getElementById(U)||document.createElementNS("http://www.w3.org/2000/svg","svg");if(m.created){const W=m.element;c(W),f(P,M);const ue=d();u(G,U),W.append(G,C,P,ue),document.body.appendChild(W)}i?(C.innerText="Preview backend disconnected.",G.innerHTML=`<g clip-path="url(#clip0_6013_33858)">
<path d="M4.8 17.6L12 5.6L19.2 17.6H4.8ZM6.91667 16.4H17.0833L12 7.93333L6.91667 16.4ZM12 15.6C12.1667 15.6 12.3056 15.5444 12.4167 15.4333C12.5389 15.3111 12.6 15.1667 12.6 15C12.6 14.8333 12.5389 14.6944 12.4167 14.5833C12.3056 14.4611 12.1667 14.4 12 14.4C11.8333 14.4 11.6889 14.4611 11.5667 14.5833C11.4556 14.6944 11.4 14.8333 11.4 15C11.4 15.1667 11.4556 15.3111 11.5667 15.4333C11.6889 15.5444 11.8333 15.6 12 15.6ZM11.4 13.6H12.6V10.4H11.4V13.6Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6013_33858">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`):(G.innerHTML=`<g clip-path="url(#clip0_6083_34804)">
<path d="M11.4 15.2H12.6V11.2H11.4V15.2ZM12 10C12.1667 10 12.3056 9.94444 12.4167 9.83333C12.5389 9.71111 12.6 9.56667 12.6 9.4C12.6 9.23333 12.5389 9.09444 12.4167 8.98333C12.3056 8.86111 12.1667 8.8 12 8.8C11.8333 8.8 11.6889 8.86111 11.5667 8.98333C11.4556 9.09444 11.4 9.23333 11.4 9.4C11.4 9.56667 11.4556 9.71111 11.5667 9.83333C11.6889 9.94444 11.8333 10 12 10ZM12 18.4C11.1222 18.4 10.2944 18.2333 9.51667 17.9C8.73889 17.5667 8.05556 17.1111 7.46667 16.5333C6.88889 15.9444 6.43333 15.2611 6.1 14.4833C5.76667 13.7056 5.6 12.8778 5.6 12C5.6 11.1111 5.76667 10.2833 6.1 9.51667C6.43333 8.73889 6.88889 8.06111 7.46667 7.48333C8.05556 6.89444 8.73889 6.43333 9.51667 6.1C10.2944 5.76667 11.1222 5.6 12 5.6C12.8889 5.6 13.7167 5.76667 14.4833 6.1C15.2611 6.43333 15.9389 6.89444 16.5167 7.48333C17.1056 8.06111 17.5667 8.73889 17.9 9.51667C18.2333 10.2833 18.4 11.1111 18.4 12C18.4 12.8778 18.2333 13.7056 17.9 14.4833C17.5667 15.2611 17.1056 15.9444 16.5167 16.5333C15.9389 17.1111 15.2611 17.5667 14.4833 17.9C13.7167 18.2333 12.8889 18.4 12 18.4ZM12 17.2C13.4444 17.2 14.6722 16.6944 15.6833 15.6833C16.6944 14.6722 17.2 13.4444 17.2 12C17.2 10.5556 16.6944 9.32778 15.6833 8.31667C14.6722 7.30555 13.4444 6.8 12 6.8C10.5556 6.8 9.32778 7.30555 8.31667 8.31667C7.30556 9.32778 6.8 10.5556 6.8 12C6.8 13.4444 7.30556 14.6722 8.31667 15.6833C9.32778 16.6944 10.5556 17.2 12 17.2Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6083_34804">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`,C.innerText="Preview backend running in this workspace."),C.setAttribute("id",S)}document.readyState==="loading"?window.addEventListener("DOMContentLoaded",p):p()}/**
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
 */function Ue(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function Ew(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(Ue())}function bw(){const n=Ui()?.forceEnvironment;if(n==="node")return!0;if(n==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function Tw(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function _h(){const n=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof n=="object"&&n.id!==void 0}function Iw(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function Sw(){const n=Ue();return n.indexOf("MSIE ")>=0||n.indexOf("Trident/")>=0}function Aw(){return!bw()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function vh(){try{return typeof indexedDB=="object"}catch{return!1}}function Eh(){return new Promise((n,e)=>{try{let t=!0;const o="validate-browser-context-for-indexeddb-analytics-module",r=self.indexedDB.open(o);r.onsuccess=()=>{r.result.close(),t||self.indexedDB.deleteDatabase(o),n(!0)},r.onupgradeneeded=()=>{t=!1},r.onerror=()=>{e(r.error?.message||"")}}catch(t){e(t)}})}function Dw(){return!(typeof navigator>"u"||!navigator.cookieEnabled)}/**
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
 */const Cw="FirebaseError";class at extends Error{constructor(e,t,o){super(t),this.code=e,this.customData=o,this.name=Cw,Object.setPrototypeOf(this,at.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,Tn.prototype.create)}}class Tn{constructor(e,t,o){this.service=e,this.serviceName=t,this.errors=o}create(e,...t){const o=t[0]||{},r=`${this.service}/${e}`,i=this.errors[e],s=i?Rw(i,o):"Error",c=`${this.serviceName}: ${s} (${r}).`;return new at(r,c,o)}}function Rw(n,e){return n.replace(Nw,(t,o)=>{const r=e[o];return r!=null?String(r):`<${o}?>`})}const Nw=/\{\$([^}]+)}/g;function Pw(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}function ft(n,e){if(n===e)return!0;const t=Object.keys(n),o=Object.keys(e);for(const r of t){if(!o.includes(r))return!1;const i=n[r],s=e[r];if(vu(i)&&vu(s)){if(!ft(i,s))return!1}else if(i!==s)return!1}for(const r of o)if(!t.includes(r))return!1;return!0}function vu(n){return n!==null&&typeof n=="object"}/**
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
 */function dr(n){const e=[];for(const[t,o]of Object.entries(n))Array.isArray(o)?o.forEach(r=>{e.push(encodeURIComponent(t)+"="+encodeURIComponent(r))}):e.push(encodeURIComponent(t)+"="+encodeURIComponent(o));return e.length?"&"+e.join("&"):""}function kw(n,e){const t=new Mw(n,e);return t.subscribe.bind(t)}class Mw{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(o=>{this.error(o)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,o){let r;if(e===void 0&&t===void 0&&o===void 0)throw new Error("Missing Observer.");Ow(e,["next","error","complete"])?r=e:r={next:e,error:t,complete:o},r.next===void 0&&(r.next=js),r.error===void 0&&(r.error=js),r.complete===void 0&&(r.complete=js);const i=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?r.error(this.finalError):r.complete()}catch{}}),this.observers.push(r),i}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{t(this.observers[e])}catch(o){typeof console<"u"&&console.error&&console.error(o)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function Ow(n,e){if(typeof n!="object"||n===null)return!1;for(const t of e)if(t in n&&typeof n[t]=="function")return!0;return!1}function js(){}/**
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
 */const Vw=1e3,Bw=2,Lw=14400*1e3,xw=.5;function Eu(n,e=Vw,t=Bw){const o=e*Math.pow(t,n),r=Math.round(xw*o*(Math.random()-.5)*2);return Math.min(Lw,o+r)}/**
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
 */function he(n){return n&&n._delegate?n._delegate:n}class rt{constructor(e,t,o){this.name=e,this.instanceFactory=t,this.type=o,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
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
 */const cn="[DEFAULT]";/**
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
 */class Uw{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const o=new ww;if(this.instancesDeferred.set(t,o),this.isInitialized(t)||this.shouldAutoInitialize())try{const r=this.getOrInitializeService({instanceIdentifier:t});r&&o.resolve(r)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){const t=this.normalizeInstanceIdentifier(e?.identifier),o=e?.optional??!1;if(this.isInitialized(t)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:t})}catch(r){if(o)return null;throw r}else{if(o)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if($w(e))try{this.getOrInitializeService({instanceIdentifier:cn})}catch{}for(const[t,o]of this.instancesDeferred.entries()){const r=this.normalizeInstanceIdentifier(t);try{const i=this.getOrInitializeService({instanceIdentifier:r});o.resolve(i)}catch{}}}}clearInstance(e=cn){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=cn){return this.instances.has(e)}getOptions(e=cn){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,o=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(o))throw Error(`${this.name}(${o}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const r=this.getOrInitializeService({instanceIdentifier:o,options:t});for(const[i,s]of this.instancesDeferred.entries()){const c=this.normalizeInstanceIdentifier(i);o===c&&s.resolve(r)}return r}onInit(e,t){const o=this.normalizeInstanceIdentifier(t),r=this.onInitCallbacks.get(o)??new Set;r.add(e),this.onInitCallbacks.set(o,r);const i=this.instances.get(o);return i&&e(i,o),()=>{r.delete(e)}}invokeOnInitCallbacks(e,t){const o=this.onInitCallbacks.get(t);if(o)for(const r of o)try{r(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let o=this.instances.get(e);if(!o&&this.component&&(o=this.component.instanceFactory(this.container,{instanceIdentifier:Fw(e),options:t}),this.instances.set(e,o),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(o,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,o)}catch{}return o||null}normalizeInstanceIdentifier(e=cn){return this.component?this.component.multipleInstances?e:cn:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function Fw(n){return n===cn?void 0:n}function $w(n){return n.instantiationMode==="EAGER"}/**
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
 */class Gw{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new Uw(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}/**
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
 */var K;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})(K||(K={}));const zw={debug:K.DEBUG,verbose:K.VERBOSE,info:K.INFO,warn:K.WARN,error:K.ERROR,silent:K.SILENT},qw=K.INFO,jw={[K.DEBUG]:"log",[K.VERBOSE]:"log",[K.INFO]:"info",[K.WARN]:"warn",[K.ERROR]:"error"},Hw=(n,e,...t)=>{if(e<n.logLevel)return;const o=new Date().toISOString(),r=jw[e];if(r)console[r](`[${o}]  ${n.name}:`,...t);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class Fi{constructor(e){this.name=e,this._logLevel=qw,this._logHandler=Hw,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in K))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?zw[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,K.DEBUG,...e),this._logHandler(this,K.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,K.VERBOSE,...e),this._logHandler(this,K.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,K.INFO,...e),this._logHandler(this,K.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,K.WARN,...e),this._logHandler(this,K.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,K.ERROR,...e),this._logHandler(this,K.ERROR,...e)}}const Ww=(n,e)=>e.some(t=>n instanceof t);let bu,Tu;function Kw(){return bu||(bu=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function Qw(){return Tu||(Tu=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const bh=new WeakMap,da=new WeakMap,Th=new WeakMap,Hs=new WeakMap,ja=new WeakMap;function Yw(n){const e=new Promise((t,o)=>{const r=()=>{n.removeEventListener("success",i),n.removeEventListener("error",s)},i=()=>{t($t(n.result)),r()},s=()=>{o(n.error),r()};n.addEventListener("success",i),n.addEventListener("error",s)});return e.then(t=>{t instanceof IDBCursor&&bh.set(t,n)}).catch(()=>{}),ja.set(e,n),e}function Jw(n){if(da.has(n))return;const e=new Promise((t,o)=>{const r=()=>{n.removeEventListener("complete",i),n.removeEventListener("error",s),n.removeEventListener("abort",s)},i=()=>{t(),r()},s=()=>{o(n.error||new DOMException("AbortError","AbortError")),r()};n.addEventListener("complete",i),n.addEventListener("error",s),n.addEventListener("abort",s)});da.set(n,e)}let ha={get(n,e,t){if(n instanceof IDBTransaction){if(e==="done")return da.get(n);if(e==="objectStoreNames")return n.objectStoreNames||Th.get(n);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return $t(n[e])},set(n,e,t){return n[e]=t,!0},has(n,e){return n instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in n}};function Xw(n){ha=n(ha)}function Zw(n){return n===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){const o=n.call(Ws(this),e,...t);return Th.set(o,e.sort?e.sort():[e]),$t(o)}:Qw().includes(n)?function(...e){return n.apply(Ws(this),e),$t(bh.get(this))}:function(...e){return $t(n.apply(Ws(this),e))}}function ey(n){return typeof n=="function"?Zw(n):(n instanceof IDBTransaction&&Jw(n),Ww(n,Kw())?new Proxy(n,ha):n)}function $t(n){if(n instanceof IDBRequest)return Yw(n);if(Hs.has(n))return Hs.get(n);const e=ey(n);return e!==n&&(Hs.set(n,e),ja.set(e,n)),e}const Ws=n=>ja.get(n);function Ih(n,e,{blocked:t,upgrade:o,blocking:r,terminated:i}={}){const s=indexedDB.open(n,e),c=$t(s);return o&&s.addEventListener("upgradeneeded",u=>{o($t(s.result),u.oldVersion,u.newVersion,$t(s.transaction),u)}),t&&s.addEventListener("blocked",u=>t(u.oldVersion,u.newVersion,u)),c.then(u=>{i&&u.addEventListener("close",()=>i()),r&&u.addEventListener("versionchange",d=>r(d.oldVersion,d.newVersion,d))}).catch(()=>{}),c}const ty=["get","getKey","getAll","getAllKeys","count"],ny=["put","add","delete","clear"],Ks=new Map;function Iu(n,e){if(!(n instanceof IDBDatabase&&!(e in n)&&typeof e=="string"))return;if(Ks.get(e))return Ks.get(e);const t=e.replace(/FromIndex$/,""),o=e!==t,r=ny.includes(t);if(!(t in(o?IDBIndex:IDBObjectStore).prototype)||!(r||ty.includes(t)))return;const i=async function(s,...c){const u=this.transaction(s,r?"readwrite":"readonly");let d=u.store;return o&&(d=d.index(c.shift())),(await Promise.all([d[t](...c),r&&u.done]))[0]};return Ks.set(e,i),i}Xw(n=>({...n,get:(e,t,o)=>Iu(e,t)||n.get(e,t,o),has:(e,t)=>!!Iu(e,t)||n.has(e,t)}));/**
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
 */class oy{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(ry(t)){const o=t.getImmediate();return`${o.library}/${o.version}`}else return null}).filter(t=>t).join(" ")}}function ry(n){return n.getComponent()?.type==="VERSION"}const fa="@firebase/app",Su="0.14.0";/**
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
 */const At=new Fi("@firebase/app"),iy="@firebase/app-compat",sy="@firebase/analytics-compat",ay="@firebase/analytics",cy="@firebase/app-check-compat",ly="@firebase/app-check",uy="@firebase/auth",dy="@firebase/auth-compat",hy="@firebase/database",fy="@firebase/data-connect",gy="@firebase/database-compat",py="@firebase/functions",my="@firebase/functions-compat",wy="@firebase/installations",yy="@firebase/installations-compat",_y="@firebase/messaging",vy="@firebase/messaging-compat",Ey="@firebase/performance",by="@firebase/performance-compat",Ty="@firebase/remote-config",Iy="@firebase/remote-config-compat",Sy="@firebase/storage",Ay="@firebase/storage-compat",Dy="@firebase/firestore",Cy="@firebase/ai",Ry="@firebase/firestore-compat",Ny="firebase",Py="12.0.0";/**
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
 */const ga="[DEFAULT]",ky={[fa]:"fire-core",[iy]:"fire-core-compat",[ay]:"fire-analytics",[sy]:"fire-analytics-compat",[ly]:"fire-app-check",[cy]:"fire-app-check-compat",[uy]:"fire-auth",[dy]:"fire-auth-compat",[hy]:"fire-rtdb",[fy]:"fire-data-connect",[gy]:"fire-rtdb-compat",[py]:"fire-fn",[my]:"fire-fn-compat",[wy]:"fire-iid",[yy]:"fire-iid-compat",[_y]:"fire-fcm",[vy]:"fire-fcm-compat",[Ey]:"fire-perf",[by]:"fire-perf-compat",[Ty]:"fire-rc",[Iy]:"fire-rc-compat",[Sy]:"fire-gcs",[Ay]:"fire-gcs-compat",[Dy]:"fire-fst",[Ry]:"fire-fst-compat",[Cy]:"fire-vertex","fire-js":"fire-js",[Ny]:"fire-js-all"};/**
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
 */const pi=new Map,My=new Map,pa=new Map;function Au(n,e){try{n.container.addComponent(e)}catch(t){At.debug(`Component ${e.name} failed to register with FirebaseApp ${n.name}`,t)}}function gt(n){const e=n.name;if(pa.has(e))return At.debug(`There were multiple attempts to register component ${e}.`),!1;pa.set(e,n);for(const t of pi.values())Au(t,n);for(const t of My.values())Au(t,n);return!0}function In(n,e){const t=n.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),n.container.getProvider(e)}function Ze(n){return n==null?!1:n.settings!==void 0}/**
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
 */const Oy={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},Gt=new Tn("app","Firebase",Oy);/**
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
 */class Vy{constructor(e,t,o){this._isDeleted=!1,this._options={...e},this._config={...t},this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=o,this.container.addComponent(new rt("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw Gt.create("app-deleted",{appName:this._name})}}/**
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
 */const ho=Py;function Sh(n,e={}){let t=n;typeof e!="object"&&(e={name:e});const o={name:ga,automaticDataCollectionEnabled:!0,...e},r=o.name;if(typeof r!="string"||!r)throw Gt.create("bad-app-name",{appName:String(r)});if(t||(t=ph()),!t)throw Gt.create("no-options");const i=pi.get(r);if(i){if(ft(t,i.options)&&ft(o,i.config))return i;throw Gt.create("duplicate-app",{appName:r})}const s=new Gw(r);for(const u of pa.values())s.addComponent(u);const c=new Vy(t,o,s);return pi.set(r,c),c}function Ha(n=ga){const e=pi.get(n);if(!e&&n===ga&&ph())return Sh();if(!e)throw Gt.create("no-app",{appName:n});return e}function Je(n,e,t){let o=ky[n]??n;t&&(o+=`-${t}`);const r=o.match(/\s|\//),i=e.match(/\s|\//);if(r||i){const s=[`Unable to register library "${o}" with version "${e}":`];r&&s.push(`library name "${o}" contains illegal characters (whitespace or "/")`),r&&i&&s.push("and"),i&&s.push(`version name "${e}" contains illegal characters (whitespace or "/")`),At.warn(s.join(" "));return}gt(new rt(`${o}-version`,()=>({library:o,version:e}),"VERSION"))}/**
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
 */const By="firebase-heartbeat-database",Ly=1,or="firebase-heartbeat-store";let Qs=null;function Ah(){return Qs||(Qs=Ih(By,Ly,{upgrade:(n,e)=>{switch(e){case 0:try{n.createObjectStore(or)}catch(t){console.warn(t)}}}}).catch(n=>{throw Gt.create("idb-open",{originalErrorMessage:n.message})})),Qs}async function xy(n){try{const t=(await Ah()).transaction(or),o=await t.objectStore(or).get(Dh(n));return await t.done,o}catch(e){if(e instanceof at)At.warn(e.message);else{const t=Gt.create("idb-get",{originalErrorMessage:e?.message});At.warn(t.message)}}}async function Du(n,e){try{const o=(await Ah()).transaction(or,"readwrite");await o.objectStore(or).put(e,Dh(n)),await o.done}catch(t){if(t instanceof at)At.warn(t.message);else{const o=Gt.create("idb-set",{originalErrorMessage:t?.message});At.warn(o.message)}}}function Dh(n){return`${n.name}!${n.options.appId}`}/**
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
 */const Uy=1024,Fy=30;class $y{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new zy(t),this._heartbeatsCachePromise=this._storage.read().then(o=>(this._heartbeatsCache=o,o))}async triggerHeartbeat(){try{const t=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),o=Cu();if(this._heartbeatsCache?.heartbeats==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null)||this._heartbeatsCache.lastSentHeartbeatDate===o||this._heartbeatsCache.heartbeats.some(r=>r.date===o))return;if(this._heartbeatsCache.heartbeats.push({date:o,agent:t}),this._heartbeatsCache.heartbeats.length>Fy){const r=qy(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(r,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(e){At.warn(e)}}async getHeartbeatsHeader(){try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null||this._heartbeatsCache.heartbeats.length===0)return"";const e=Cu(),{heartbeatsToSend:t,unsentEntries:o}=Gy(this._heartbeatsCache.heartbeats),r=gi(JSON.stringify({version:2,heartbeats:t}));return this._heartbeatsCache.lastSentHeartbeatDate=e,o.length>0?(this._heartbeatsCache.heartbeats=o,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),r}catch(e){return At.warn(e),""}}}function Cu(){return new Date().toISOString().substring(0,10)}function Gy(n,e=Uy){const t=[];let o=n.slice();for(const r of n){const i=t.find(s=>s.agent===r.agent);if(i){if(i.dates.push(r.date),Ru(t)>e){i.dates.pop();break}}else if(t.push({agent:r.agent,dates:[r.date]}),Ru(t)>e){t.pop();break}o=o.slice(1)}return{heartbeatsToSend:t,unsentEntries:o}}class zy{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return vh()?Eh().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const t=await xy(this.app);return t?.heartbeats?t:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){if(await this._canUseIndexedDBPromise){const o=await this.read();return Du(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??o.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){if(await this._canUseIndexedDBPromise){const o=await this.read();return Du(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??o.lastSentHeartbeatDate,heartbeats:[...o.heartbeats,...e.heartbeats]})}else return}}function Ru(n){return gi(JSON.stringify({version:2,heartbeats:n})).length}function qy(n){if(n.length===0)return-1;let e=0,t=n[0].date;for(let o=1;o<n.length;o++)n[o].date<t&&(t=n[o].date,e=o);return e}/**
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
 */function jy(n){gt(new rt("platform-logger",e=>new oy(e),"PRIVATE")),gt(new rt("heartbeat",e=>new $y(e),"PRIVATE")),Je(fa,Su,n),Je(fa,Su,"esm2020"),Je("fire-js","")}jy("");var Hy="firebase",Wy="12.0.0";/**
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
 */Je(Hy,Wy,"app");function Ch(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const Ky=Ch,Rh=new Tn("auth","Firebase",Ch());/**
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
 */const mi=new Fi("@firebase/auth");function Qy(n,...e){mi.logLevel<=K.WARN&&mi.warn(`Auth (${ho}): ${n}`,...e)}function ri(n,...e){mi.logLevel<=K.ERROR&&mi.error(`Auth (${ho}): ${n}`,...e)}/**
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
 */function pt(n,...e){throw Ka(n,...e)}function tt(n,...e){return Ka(n,...e)}function Wa(n,e,t){const o={...Ky(),[e]:t};return new Tn("auth","Firebase",o).create(e,{appName:n.name})}function pn(n){return Wa(n,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function Yy(n,e,t){const o=t;if(!(e instanceof o))throw o.name!==e.constructor.name&&pt(n,"argument-error"),Wa(n,"argument-error",`Type of ${e.constructor.name} does not match expected instance.Did you pass a reference from a different Auth SDK?`)}function Ka(n,...e){if(typeof n!="string"){const t=e[0],o=[...e.slice(1)];return o[0]&&(o[0].appName=n.name),n._errorFactory.create(t,...o)}return Rh.create(n,...e)}function z(n,e,...t){if(!n)throw Ka(e,...t)}function bt(n){const e="INTERNAL ASSERTION FAILED: "+n;throw ri(e),new Error(e)}function Dt(n,e){n||bt(e)}/**
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
 */function ma(){return typeof self<"u"&&self.location?.href||""}function Jy(){return Nu()==="http:"||Nu()==="https:"}function Nu(){return typeof self<"u"&&self.location?.protocol||null}/**
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
 */function Xy(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(Jy()||_h()||"connection"in navigator)?navigator.onLine:!0}function Zy(){if(typeof navigator>"u")return null;const n=navigator;return n.languages&&n.languages[0]||n.language||null}/**
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
 */class hr{constructor(e,t){this.shortDelay=e,this.longDelay=t,Dt(t>e,"Short delay should be less than long delay!"),this.isMobile=Ew()||Iw()}get(){return Xy()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
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
 */function Qa(n,e){Dt(n.emulator,"Emulator should always be set here");const{url:t}=n.emulator;return e?`${t}${e.startsWith("/")?e.slice(1):e}`:t}/**
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
 */class Nh{static initialize(e,t,o){this.fetchImpl=e,t&&(this.headersImpl=t),o&&(this.responseImpl=o)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;bt("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;bt("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;bt("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
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
 */const e_={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
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
 */const t_=["/v1/accounts:signInWithCustomToken","/v1/accounts:signInWithEmailLink","/v1/accounts:signInWithIdp","/v1/accounts:signInWithPassword","/v1/accounts:signInWithPhoneNumber","/v1/token"],n_=new hr(3e4,6e4);function Ya(n,e){return n.tenantId&&!e.tenantId?{...e,tenantId:n.tenantId}:e}async function fo(n,e,t,o,r={}){return Ph(n,r,async()=>{let i={},s={};o&&(e==="GET"?s=o:i={body:JSON.stringify(o)});const c=dr({key:n.config.apiKey,...s}).slice(1),u=await n._getAdditionalHeaders();u["Content-Type"]="application/json",n.languageCode&&(u["X-Firebase-Locale"]=n.languageCode);const d={method:e,headers:u,...i};return Tw()||(d.referrerPolicy="no-referrer"),n.emulatorConfig&&uo(n.emulatorConfig.host)&&(d.credentials="include"),Nh.fetch()(await kh(n,n.config.apiHost,t,c),d)})}async function Ph(n,e,t){n._canInitEmulator=!1;const o={...e_,...e};try{const r=new r_(n),i=await Promise.race([t(),r.promise]);r.clearNetworkTimeout();const s=await i.json();if("needConfirmation"in s)throw Kr(n,"account-exists-with-different-credential",s);if(i.ok&&!("errorMessage"in s))return s;{const c=i.ok?s.errorMessage:s.error.message,[u,d]=c.split(" : ");if(u==="FEDERATED_USER_ID_ALREADY_LINKED")throw Kr(n,"credential-already-in-use",s);if(u==="EMAIL_EXISTS")throw Kr(n,"email-already-in-use",s);if(u==="USER_DISABLED")throw Kr(n,"user-disabled",s);const f=o[u]||u.toLowerCase().replace(/[_\s]+/g,"-");if(d)throw Wa(n,f,d);pt(n,f)}}catch(r){if(r instanceof at)throw r;pt(n,"network-request-failed",{message:String(r)})}}async function o_(n,e,t,o,r={}){const i=await fo(n,e,t,o,r);return"mfaPendingCredential"in i&&pt(n,"multi-factor-auth-required",{_serverResponse:i}),i}async function kh(n,e,t,o){const r=`${e}${t}?${o}`,i=n,s=i.config.emulator?Qa(n.config,r):`${n.config.apiScheme}://${r}`;return t_.includes(t)&&(await i._persistenceManagerAvailable,i._getPersistenceType()==="COOKIE")?i._getPersistence()._getFinalTarget(s).toString():s}class r_{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((t,o)=>{this.timer=setTimeout(()=>o(tt(this.auth,"network-request-failed")),n_.get())})}}function Kr(n,e,t){const o={appName:n.name};t.email&&(o.email=t.email),t.phoneNumber&&(o.phoneNumber=t.phoneNumber);const r=tt(n,e,o);return r.customData._tokenResponse=t,r}/**
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
 */async function i_(n,e){return fo(n,"POST","/v1/accounts:delete",e)}async function wi(n,e){return fo(n,"POST","/v1/accounts:lookup",e)}/**
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
 */function Ko(n){if(n)try{const e=new Date(Number(n));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function s_(n,e=!1){const t=he(n),o=await t.getIdToken(e),r=Ja(o);z(r&&r.exp&&r.auth_time&&r.iat,t.auth,"internal-error");const i=typeof r.firebase=="object"?r.firebase:void 0,s=i?.sign_in_provider;return{claims:r,token:o,authTime:Ko(Ys(r.auth_time)),issuedAtTime:Ko(Ys(r.iat)),expirationTime:Ko(Ys(r.exp)),signInProvider:s||null,signInSecondFactor:i?.sign_in_second_factor||null}}function Ys(n){return Number(n)*1e3}function Ja(n){const[e,t,o]=n.split(".");if(e===void 0||t===void 0||o===void 0)return ri("JWT malformed, contained fewer than 3 sections"),null;try{const r=fh(t);return r?JSON.parse(r):(ri("Failed to decode base64 JWT payload"),null)}catch(r){return ri("Caught error parsing JWT payload as JSON",r?.toString()),null}}function Pu(n){const e=Ja(n);return z(e,"internal-error"),z(typeof e.exp<"u","internal-error"),z(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
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
 */async function rr(n,e,t=!1){if(t)return e;try{return await e}catch(o){throw o instanceof at&&a_(o)&&n.auth.currentUser===n&&await n.auth.signOut(),o}}function a_({code:n}){return n==="auth/user-disabled"||n==="auth/user-token-expired"}/**
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
 */class c_{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){if(e){const t=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),t}else{this.errorBackoff=3e4;const o=(this.user.stsTokenManager.expirationTime??0)-Date.now()-3e5;return Math.max(0,o)}}schedule(e=!1){if(!this.isRunning)return;const t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){e?.code==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
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
 */class wa{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=Ko(this.lastLoginAt),this.creationTime=Ko(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
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
 */async function yi(n){const e=n.auth,t=await n.getIdToken(),o=await rr(n,wi(e,{idToken:t}));z(o?.users.length,e,"internal-error");const r=o.users[0];n._notifyReloadListener(r);const i=r.providerUserInfo?.length?Mh(r.providerUserInfo):[],s=u_(n.providerData,i),c=n.isAnonymous,u=!(n.email&&r.passwordHash)&&!s?.length,d=c?u:!1,f={uid:r.localId,displayName:r.displayName||null,photoURL:r.photoUrl||null,email:r.email||null,emailVerified:r.emailVerified||!1,phoneNumber:r.phoneNumber||null,tenantId:r.tenantId||null,providerData:s,metadata:new wa(r.createdAt,r.lastLoginAt),isAnonymous:d};Object.assign(n,f)}async function l_(n){const e=he(n);await yi(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function u_(n,e){return[...n.filter(o=>!e.some(r=>r.providerId===o.providerId)),...e]}function Mh(n){return n.map(({providerId:e,...t})=>({providerId:e,uid:t.rawId||"",displayName:t.displayName||null,email:t.email||null,phoneNumber:t.phoneNumber||null,photoURL:t.photoUrl||null}))}/**
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
 */async function d_(n,e){const t=await Ph(n,{},async()=>{const o=dr({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:r,apiKey:i}=n.config,s=await kh(n,r,"/v1/token",`key=${i}`),c=await n._getAdditionalHeaders();c["Content-Type"]="application/x-www-form-urlencoded";const u={method:"POST",headers:c,body:o};return n.emulatorConfig&&uo(n.emulatorConfig.host)&&(u.credentials="include"),Nh.fetch()(s,u)});return{accessToken:t.access_token,expiresIn:t.expires_in,refreshToken:t.refresh_token}}async function h_(n,e){return fo(n,"POST","/v2/accounts:revokeToken",Ya(n,e))}/**
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
 */class $n{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){z(e.idToken,"internal-error"),z(typeof e.idToken<"u","internal-error"),z(typeof e.refreshToken<"u","internal-error");const t="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):Pu(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){z(e.length!==0,"internal-error");const t=Pu(e);this.updateTokensAndExpiration(e,null,t)}async getToken(e,t=!1){return!t&&this.accessToken&&!this.isExpired?this.accessToken:(z(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){const{accessToken:o,refreshToken:r,expiresIn:i}=await d_(e,t);this.updateTokensAndExpiration(o,r,Number(i))}updateTokensAndExpiration(e,t,o){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+o*1e3}static fromJSON(e,t){const{refreshToken:o,accessToken:r,expirationTime:i}=t,s=new $n;return o&&(z(typeof o=="string","internal-error",{appName:e}),s.refreshToken=o),r&&(z(typeof r=="string","internal-error",{appName:e}),s.accessToken=r),i&&(z(typeof i=="number","internal-error",{appName:e}),s.expirationTime=i),s}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new $n,this.toJSON())}_performRefresh(){return bt("not implemented")}}/**
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
 */function Vt(n,e){z(typeof n=="string"||typeof n>"u","internal-error",{appName:e})}class et{constructor({uid:e,auth:t,stsTokenManager:o,...r}){this.providerId="firebase",this.proactiveRefresh=new c_(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=e,this.auth=t,this.stsTokenManager=o,this.accessToken=o.accessToken,this.displayName=r.displayName||null,this.email=r.email||null,this.emailVerified=r.emailVerified||!1,this.phoneNumber=r.phoneNumber||null,this.photoURL=r.photoURL||null,this.isAnonymous=r.isAnonymous||!1,this.tenantId=r.tenantId||null,this.providerData=r.providerData?[...r.providerData]:[],this.metadata=new wa(r.createdAt||void 0,r.lastLoginAt||void 0)}async getIdToken(e){const t=await rr(this,this.stsTokenManager.getToken(this.auth,e));return z(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return s_(this,e)}reload(){return l_(this)}_assign(e){this!==e&&(z(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(t=>({...t})),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const t=new et({...this,auth:e,stsTokenManager:this.stsTokenManager._clone()});return t.metadata._copy(this.metadata),t}_onReload(e){z(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let o=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),o=!0),t&&await yi(this),await this.auth._persistUserIfCurrent(this),o&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(Ze(this.auth.app))return Promise.reject(pn(this.auth));const e=await this.getIdToken();return await rr(this,i_(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return{uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>({...e})),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId,...this.metadata.toJSON(),apiKey:this.auth.config.apiKey,appName:this.auth.name}}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){const o=t.displayName??void 0,r=t.email??void 0,i=t.phoneNumber??void 0,s=t.photoURL??void 0,c=t.tenantId??void 0,u=t._redirectEventId??void 0,d=t.createdAt??void 0,f=t.lastLoginAt??void 0,{uid:p,emailVerified:m,isAnonymous:S,providerData:C,stsTokenManager:M}=t;z(p&&M,e,"internal-error");const P=$n.fromJSON(this.name,M);z(typeof p=="string",e,"internal-error"),Vt(o,e.name),Vt(r,e.name),z(typeof m=="boolean",e,"internal-error"),z(typeof S=="boolean",e,"internal-error"),Vt(i,e.name),Vt(s,e.name),Vt(c,e.name),Vt(u,e.name),Vt(d,e.name),Vt(f,e.name);const U=new et({uid:p,auth:e,email:r,emailVerified:m,displayName:o,isAnonymous:S,photoURL:s,phoneNumber:i,tenantId:c,stsTokenManager:P,createdAt:d,lastLoginAt:f});return C&&Array.isArray(C)&&(U.providerData=C.map(G=>({...G}))),u&&(U._redirectEventId=u),U}static async _fromIdTokenResponse(e,t,o=!1){const r=new $n;r.updateFromServerResponse(t);const i=new et({uid:t.localId,auth:e,stsTokenManager:r,isAnonymous:o});return await yi(i),i}static async _fromGetAccountInfoResponse(e,t,o){const r=t.users[0];z(r.localId!==void 0,"internal-error");const i=r.providerUserInfo!==void 0?Mh(r.providerUserInfo):[],s=!(r.email&&r.passwordHash)&&!i?.length,c=new $n;c.updateFromIdToken(o);const u=new et({uid:r.localId,auth:e,stsTokenManager:c,isAnonymous:s}),d={uid:r.localId,displayName:r.displayName||null,photoURL:r.photoUrl||null,email:r.email||null,emailVerified:r.emailVerified||!1,phoneNumber:r.phoneNumber||null,tenantId:r.tenantId||null,providerData:i,metadata:new wa(r.createdAt,r.lastLoginAt),isAnonymous:!(r.email&&r.passwordHash)&&!i?.length};return Object.assign(u,d),u}}/**
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
 */const ku=new Map;function Tt(n){Dt(n instanceof Function,"Expected a class definition");let e=ku.get(n);return e?(Dt(e instanceof n,"Instance stored in cache mismatched with class"),e):(e=new n,ku.set(n,e),e)}/**
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
 */class Oh{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){const t=this.storage[e];return t===void 0?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}}Oh.type="NONE";const Mu=Oh;/**
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
 */function ii(n,e,t){return`firebase:${n}:${e}:${t}`}class Gn{constructor(e,t,o){this.persistence=e,this.auth=t,this.userKey=o;const{config:r,name:i}=this.auth;this.fullUserKey=ii(this.userKey,r.apiKey,i),this.fullPersistenceKey=ii("persistence",r.apiKey,i),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);if(!e)return null;if(typeof e=="string"){const t=await wi(this.auth,{idToken:e}).catch(()=>{});return t?et._fromGetAccountInfoResponse(this.auth,t,e):null}return et._fromJSON(this.auth,e)}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const t=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,t)return this.setCurrentUser(t)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,t,o="authUser"){if(!t.length)return new Gn(Tt(Mu),e,o);const r=(await Promise.all(t.map(async d=>{if(await d._isAvailable())return d}))).filter(d=>d);let i=r[0]||Tt(Mu);const s=ii(o,e.config.apiKey,e.name);let c=null;for(const d of t)try{const f=await d._get(s);if(f){let p;if(typeof f=="string"){const m=await wi(e,{idToken:f}).catch(()=>{});if(!m)break;p=await et._fromGetAccountInfoResponse(e,m,f)}else p=et._fromJSON(e,f);d!==i&&(c=p),i=d;break}}catch{}const u=r.filter(d=>d._shouldAllowMigration);return!i._shouldAllowMigration||!u.length?new Gn(i,e,o):(i=u[0],c&&await i._set(s,c.toJSON()),await Promise.all(t.map(async d=>{if(d!==i)try{await d._remove(s)}catch{}})),new Gn(i,e,o))}}/**
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
 */function Ou(n){const e=n.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(xh(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(Vh(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(Fh(e))return"Blackberry";if($h(e))return"Webos";if(Bh(e))return"Safari";if((e.includes("chrome/")||Lh(e))&&!e.includes("edge/"))return"Chrome";if(Uh(e))return"Android";{const t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,o=n.match(t);if(o?.length===2)return o[1]}return"Other"}function Vh(n=Ue()){return/firefox\//i.test(n)}function Bh(n=Ue()){const e=n.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function Lh(n=Ue()){return/crios\//i.test(n)}function xh(n=Ue()){return/iemobile/i.test(n)}function Uh(n=Ue()){return/android/i.test(n)}function Fh(n=Ue()){return/blackberry/i.test(n)}function $h(n=Ue()){return/webos/i.test(n)}function Xa(n=Ue()){return/iphone|ipad|ipod/i.test(n)||/macintosh/i.test(n)&&/mobile/i.test(n)}function f_(n=Ue()){return Xa(n)&&!!window.navigator?.standalone}function g_(){return Sw()&&document.documentMode===10}function Gh(n=Ue()){return Xa(n)||Uh(n)||$h(n)||Fh(n)||/windows phone/i.test(n)||xh(n)}/**
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
 */function zh(n,e=[]){let t;switch(n){case"Browser":t=Ou(Ue());break;case"Worker":t=`${Ou(Ue())}-${n}`;break;default:t=n}const o=e.length?e.join(","):"FirebaseCore-web";return`${t}/JsCore/${ho}/${o}`}/**
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
 */class p_{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){const o=i=>new Promise((s,c)=>{try{const u=e(i);s(u)}catch(u){c(u)}});o.onAbort=t,this.queue.push(o);const r=this.queue.length-1;return()=>{this.queue[r]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const t=[];try{for(const o of this.queue)await o(e),o.onAbort&&t.push(o.onAbort)}catch(o){t.reverse();for(const r of t)try{r()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:o?.message})}}}/**
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
 */async function m_(n,e={}){return fo(n,"GET","/v2/passwordPolicy",Ya(n,e))}/**
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
 */const w_=6;class y_{constructor(e){const t=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=t.minPasswordLength??w_,t.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=t.maxPasswordLength),t.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=t.containsLowercaseCharacter),t.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=t.containsUppercaseCharacter),t.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=t.containsNumericCharacter),t.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=t.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=e.allowedNonAlphanumericCharacters?.join("")??"",this.forceUpgradeOnSignin=e.forceUpgradeOnSignin??!1,this.schemaVersion=e.schemaVersion}validatePassword(e){const t={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,t),this.validatePasswordCharacterOptions(e,t),t.isValid&&(t.isValid=t.meetsMinPasswordLength??!0),t.isValid&&(t.isValid=t.meetsMaxPasswordLength??!0),t.isValid&&(t.isValid=t.containsLowercaseLetter??!0),t.isValid&&(t.isValid=t.containsUppercaseLetter??!0),t.isValid&&(t.isValid=t.containsNumericCharacter??!0),t.isValid&&(t.isValid=t.containsNonAlphanumericCharacter??!0),t}validatePasswordLengthOptions(e,t){const o=this.customStrengthOptions.minPasswordLength,r=this.customStrengthOptions.maxPasswordLength;o&&(t.meetsMinPasswordLength=e.length>=o),r&&(t.meetsMaxPasswordLength=e.length<=r)}validatePasswordCharacterOptions(e,t){this.updatePasswordCharacterOptionsStatuses(t,!1,!1,!1,!1);let o;for(let r=0;r<e.length;r++)o=e.charAt(r),this.updatePasswordCharacterOptionsStatuses(t,o>="a"&&o<="z",o>="A"&&o<="Z",o>="0"&&o<="9",this.allowedNonAlphanumericCharacters.includes(o))}updatePasswordCharacterOptionsStatuses(e,t,o,r,i){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=t)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=o)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=r)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=i))}}/**
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
 */class __{constructor(e,t,o,r){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=o,this.config=r,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new Vu(this),this.idTokenSubscription=new Vu(this),this.beforeStateQueue=new p_(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=Rh,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this._resolvePersistenceManagerAvailable=void 0,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=r.sdkClientVersion,this._persistenceManagerAvailable=new Promise(i=>this._resolvePersistenceManagerAvailable=i)}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=Tt(t)),this._initializationPromise=this.queue(async()=>{if(!this._deleted&&(this.persistenceManager=await Gn.create(this,e),this._resolvePersistenceManagerAvailable?.(),!this._deleted)){if(this._popupRedirectResolver?._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(t),this.lastNotifiedUid=this.currentUser?.uid||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const t=await wi(this,{idToken:e}),o=await et._fromGetAccountInfoResponse(this,t,e);await this.directlySetCurrentUser(o)}catch(t){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",t),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){if(Ze(this.app)){const i=this.app.settings.authIdToken;return i?new Promise(s=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(i).then(s,s))}):this.directlySetCurrentUser(null)}const t=await this.assertedPersistence.getCurrentUser();let o=t,r=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const i=this.redirectUser?._redirectEventId,s=o?._redirectEventId,c=await this.tryRedirectSignIn(e);(!i||i===s)&&c?.user&&(o=c.user,r=!0)}if(!o)return this.directlySetCurrentUser(null);if(!o._redirectEventId){if(r)try{await this.beforeStateQueue.runMiddleware(o)}catch(i){o=t,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(i))}return o?this.reloadAndSetCurrentUserOrClear(o):this.directlySetCurrentUser(null)}return z(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===o._redirectEventId?this.directlySetCurrentUser(o):this.reloadAndSetCurrentUserOrClear(o)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await yi(e)}catch(t){if(t?.code!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=Zy()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(Ze(this.app))return Promise.reject(pn(this));const t=e?he(e):null;return t&&z(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&z(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return Ze(this.app)?Promise.reject(pn(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return Ze(this.app)?Promise.reject(pn(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(Tt(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const t=this._getPasswordPolicyInternal();return t.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):t.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await m_(this),t=new y_(e);this.tenantId===null?this._projectPasswordPolicy=t:this._tenantPasswordPolicies[this.tenantId]=t}_getPersistenceType(){return this.assertedPersistence.persistence.type}_getPersistence(){return this.assertedPersistence.persistence}_updateErrorMap(e){this._errorFactory=new Tn("auth","Firebase",e())}onAuthStateChanged(e,t,o){return this.registerStateListener(this.authStateSubscription,e,t,o)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,o){return this.registerStateListener(this.idTokenSubscription,e,t,o)}authStateReady(){return new Promise((e,t)=>{if(this.currentUser)e();else{const o=this.onAuthStateChanged(()=>{o(),e()},t)}})}async revokeAccessToken(e){if(this.currentUser){const t=await this.currentUser.getIdToken(),o={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:t};this.tenantId!=null&&(o.tenantId=this.tenantId),await h_(this,o)}}toJSON(){return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:this._currentUser?.toJSON()}}async _setRedirectUser(e,t){const o=await this.getOrInitRedirectPersistenceManager(t);return e===null?o.removeCurrentUser():o.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const t=e&&Tt(e)||this._popupRedirectResolver;z(t,this,"argument-error"),this.redirectPersistenceManager=await Gn.create(this,[Tt(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){return this._isInitialized&&await this.queue(async()=>{}),this._currentUser?._redirectEventId===e?this._currentUser:this.redirectUser?._redirectEventId===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const e=this.currentUser?.uid??null;this.lastNotifiedUid!==e&&(this.lastNotifiedUid=e,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,o,r){if(this._deleted)return()=>{};const i=typeof t=="function"?t:t.next.bind(t);let s=!1;const c=this._isInitialized?Promise.resolve():this._initializationPromise;if(z(c,this,"internal-error"),c.then(()=>{s||i(this.currentUser)}),typeof t=="function"){const u=e.addObserver(t,o,r);return()=>{s=!0,u()}}else{const u=e.addObserver(t);return()=>{s=!0,u()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return z(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=zh(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){const e={"X-Client-Version":this.clientVersion};this.app.options.appId&&(e["X-Firebase-gmpid"]=this.app.options.appId);const t=await this.heartbeatServiceProvider.getImmediate({optional:!0})?.getHeartbeatsHeader();t&&(e["X-Firebase-Client"]=t);const o=await this._getAppCheckToken();return o&&(e["X-Firebase-AppCheck"]=o),e}async _getAppCheckToken(){if(Ze(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const e=await this.appCheckServiceProvider.getImmediate({optional:!0})?.getToken();return e?.error&&Qy(`Error while retrieving App Check token: ${e.error}`),e?.token}}function $i(n){return he(n)}class Vu{constructor(e){this.auth=e,this.observer=null,this.addObserver=kw(t=>this.observer=t)}get next(){return z(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
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
 */let Za={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function v_(n){Za=n}function E_(n){return Za.loadJS(n)}function b_(){return Za.gapiScript}function T_(n){return`__${n}${Math.floor(Math.random()*1e6)}`}/**
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
 */function I_(n,e){const t=In(n,"auth");if(t.isInitialized()){const r=t.getImmediate(),i=t.getOptions();if(ft(i,e??{}))return r;pt(r,"already-initialized")}return t.initialize({options:e})}function S_(n,e){const t=e?.persistence||[],o=(Array.isArray(t)?t:[t]).map(Tt);e?.errorMap&&n._updateErrorMap(e.errorMap),n._initializeWithPersistence(o,e?.popupRedirectResolver)}function A_(n,e,t){const o=$i(n);z(/^https?:\/\//.test(e),o,"invalid-emulator-scheme");const r=!1,i=qh(e),{host:s,port:c}=D_(e),u=c===null?"":`:${c}`,d={url:`${i}//${s}${u}/`},f=Object.freeze({host:s,port:c,protocol:i.replace(":",""),options:Object.freeze({disableWarnings:r})});if(!o._canInitEmulator){z(o.config.emulator&&o.emulatorConfig,o,"emulator-config-failed"),z(ft(d,o.config.emulator)&&ft(f,o.emulatorConfig),o,"emulator-config-failed");return}o.config.emulator=d,o.emulatorConfig=f,o.settings.appVerificationDisabledForTesting=!0,uo(s)?(wh(`${i}//${s}${u}`),yh("Auth",!0)):C_()}function qh(n){const e=n.indexOf(":");return e<0?"":n.substr(0,e+1)}function D_(n){const e=qh(n),t=/(\/\/)?([^?#/]+)/.exec(n.substr(e.length));if(!t)return{host:"",port:null};const o=t[2].split("@").pop()||"",r=/^(\[[^\]]+\])(:|$)/.exec(o);if(r){const i=r[1];return{host:i,port:Bu(o.substr(i.length+1))}}else{const[i,s]=o.split(":");return{host:i,port:Bu(s)}}}function Bu(n){if(!n)return null;const e=Number(n);return isNaN(e)?null:e}function C_(){function n(){const e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",n):n())}/**
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
 */class jh{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return bt("not implemented")}_getIdTokenResponse(e){return bt("not implemented")}_linkToIdToken(e,t){return bt("not implemented")}_getReauthenticationResolver(e){return bt("not implemented")}}/**
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
 */async function zn(n,e){return o_(n,"POST","/v1/accounts:signInWithIdp",Ya(n,e))}/**
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
 */const R_="http://localhost";class wn extends jh{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const t=new wn(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):pt("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e,{providerId:o,signInMethod:r,...i}=t;if(!o||!r)return null;const s=new wn(o,r);return s.idToken=i.idToken||void 0,s.accessToken=i.accessToken||void 0,s.secret=i.secret,s.nonce=i.nonce,s.pendingToken=i.pendingToken||null,s}_getIdTokenResponse(e){const t=this.buildRequest();return zn(e,t)}_linkToIdToken(e,t){const o=this.buildRequest();return o.idToken=t,zn(e,o)}_getReauthenticationResolver(e){const t=this.buildRequest();return t.autoCreate=!1,zn(e,t)}buildRequest(){const e={requestUri:R_,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=dr(t)}return e}}/**
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
 */class ec{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
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
 */class fr extends ec{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
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
 */class Bt extends fr{constructor(){super("facebook.com")}static credential(e){return wn._fromParams({providerId:Bt.PROVIDER_ID,signInMethod:Bt.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Bt.credentialFromTaggedObject(e)}static credentialFromError(e){return Bt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Bt.credential(e.oauthAccessToken)}catch{return null}}}Bt.FACEBOOK_SIGN_IN_METHOD="facebook.com";Bt.PROVIDER_ID="facebook.com";/**
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
 */class Lt extends fr{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return wn._fromParams({providerId:Lt.PROVIDER_ID,signInMethod:Lt.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return Lt.credentialFromTaggedObject(e)}static credentialFromError(e){return Lt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:t,oauthAccessToken:o}=e;if(!t&&!o)return null;try{return Lt.credential(t,o)}catch{return null}}}Lt.GOOGLE_SIGN_IN_METHOD="google.com";Lt.PROVIDER_ID="google.com";/**
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
 */class xt extends fr{constructor(){super("github.com")}static credential(e){return wn._fromParams({providerId:xt.PROVIDER_ID,signInMethod:xt.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return xt.credentialFromTaggedObject(e)}static credentialFromError(e){return xt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return xt.credential(e.oauthAccessToken)}catch{return null}}}xt.GITHUB_SIGN_IN_METHOD="github.com";xt.PROVIDER_ID="github.com";/**
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
 */class Ut extends fr{constructor(){super("twitter.com")}static credential(e,t){return wn._fromParams({providerId:Ut.PROVIDER_ID,signInMethod:Ut.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return Ut.credentialFromTaggedObject(e)}static credentialFromError(e){return Ut.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:t,oauthTokenSecret:o}=e;if(!t||!o)return null;try{return Ut.credential(t,o)}catch{return null}}}Ut.TWITTER_SIGN_IN_METHOD="twitter.com";Ut.PROVIDER_ID="twitter.com";/**
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
 */class Kn{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,o,r=!1){const i=await et._fromIdTokenResponse(e,o,r),s=Lu(o);return new Kn({user:i,providerId:s,_tokenResponse:o,operationType:t})}static async _forOperation(e,t,o){await e._updateTokensIfNecessary(o,!0);const r=Lu(o);return new Kn({user:e,providerId:r,_tokenResponse:o,operationType:t})}}function Lu(n){return n.providerId?n.providerId:"phoneNumber"in n?"phone":null}/**
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
 */class _i extends at{constructor(e,t,o,r){super(t.code,t.message),this.operationType=o,this.user=r,Object.setPrototypeOf(this,_i.prototype),this.customData={appName:e.name,tenantId:e.tenantId??void 0,_serverResponse:t.customData._serverResponse,operationType:o}}static _fromErrorAndOperation(e,t,o,r){return new _i(e,t,o,r)}}function Hh(n,e,t,o){return(e==="reauthenticate"?t._getReauthenticationResolver(n):t._getIdTokenResponse(n)).catch(i=>{throw i.code==="auth/multi-factor-auth-required"?_i._fromErrorAndOperation(n,i,e,o):i})}async function N_(n,e,t=!1){const o=await rr(n,e._linkToIdToken(n.auth,await n.getIdToken()),t);return Kn._forOperation(n,"link",o)}/**
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
 */async function P_(n,e,t=!1){const{auth:o}=n;if(Ze(o.app))return Promise.reject(pn(o));const r="reauthenticate";try{const i=await rr(n,Hh(o,r,e,n),t);z(i.idToken,o,"internal-error");const s=Ja(i.idToken);z(s,o,"internal-error");const{sub:c}=s;return z(n.uid===c,o,"user-mismatch"),Kn._forOperation(n,r,i)}catch(i){throw i?.code==="auth/user-not-found"&&pt(o,"user-mismatch"),i}}/**
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
 */async function k_(n,e,t=!1){if(Ze(n.app))return Promise.reject(pn(n));const o="signIn",r=await Hh(n,o,e),i=await Kn._fromIdTokenResponse(n,o,r);return t||await n._updateCurrentUser(i.user),i}/**
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
 */function M_(n,e){return he(n).setPersistence(e)}function O_(n,e,t,o){return he(n).onIdTokenChanged(e,t,o)}function V_(n,e,t){return he(n).beforeAuthStateChanged(e,t)}function B_(n,e,t,o){return he(n).onAuthStateChanged(e,t,o)}const vi="__sak";/**
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
 */class Wh{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem(vi,"1"),this.storage.removeItem(vi),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){const t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
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
 */const L_=1e3,x_=10;class Kh extends Wh{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=Gh(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const t of Object.keys(this.listeners)){const o=this.storage.getItem(t),r=this.localCache[t];o!==r&&e(t,r,o)}}onStorageEvent(e,t=!1){if(!e.key){this.forAllChangedKeys((s,c,u)=>{this.notifyListeners(s,u)});return}const o=e.key;t?this.detachListener():this.stopPolling();const r=()=>{const s=this.storage.getItem(o);!t&&this.localCache[o]===s||this.notifyListeners(o,s)},i=this.storage.getItem(o);g_()&&i!==e.newValue&&e.newValue!==e.oldValue?setTimeout(r,x_):r()}notifyListeners(e,t){this.localCache[e]=t;const o=this.listeners[e];if(o)for(const r of Array.from(o))r(t&&JSON.parse(t))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,o)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:o}),!0)})},L_)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){const t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}}Kh.type="LOCAL";const Qh=Kh;/**
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
 */class Yh extends Wh{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,t){}_removeListener(e,t){}}Yh.type="SESSION";const Jh=Yh;/**
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
 */function U_(n){return Promise.all(n.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(t){return{fulfilled:!1,reason:t}}}))}/**
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
 */class Gi{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const t=this.receivers.find(r=>r.isListeningto(e));if(t)return t;const o=new Gi(e);return this.receivers.push(o),o}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const t=e,{eventId:o,eventType:r,data:i}=t.data,s=this.handlersMap[r];if(!s?.size)return;t.ports[0].postMessage({status:"ack",eventId:o,eventType:r});const c=Array.from(s).map(async d=>d(t.origin,i)),u=await U_(c);t.ports[0].postMessage({status:"done",eventId:o,eventType:r,response:u})}_subscribe(e,t){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),(!t||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}Gi.receivers=[];/**
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
 */function tc(n="",e=10){let t="";for(let o=0;o<e;o++)t+=Math.floor(Math.random()*10);return n+t}/**
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
 */class F_{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,o=50){const r=typeof MessageChannel<"u"?new MessageChannel:null;if(!r)throw new Error("connection_unavailable");let i,s;return new Promise((c,u)=>{const d=tc("",20);r.port1.start();const f=setTimeout(()=>{u(new Error("unsupported_event"))},o);s={messageChannel:r,onMessage(p){const m=p;if(m.data.eventId===d)switch(m.data.status){case"ack":clearTimeout(f),i=setTimeout(()=>{u(new Error("timeout"))},3e3);break;case"done":clearTimeout(i),c(m.data.response);break;default:clearTimeout(f),clearTimeout(i),u(new Error("invalid_response"));break}}},this.handlers.add(s),r.port1.addEventListener("message",s.onMessage),this.target.postMessage({eventType:e,eventId:d,data:t},[r.port2])}).finally(()=>{s&&this.removeMessageHandler(s)})}}/**
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
 */function ut(){return window}function $_(n){ut().location.href=n}/**
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
 */function Xh(){return typeof ut().WorkerGlobalScope<"u"&&typeof ut().importScripts=="function"}async function G_(){if(!navigator?.serviceWorker)return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function z_(){return navigator?.serviceWorker?.controller||null}function q_(){return Xh()?self:null}/**
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
 */const Zh="firebaseLocalStorageDb",j_=1,Ei="firebaseLocalStorage",ef="fbase_key";class gr{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{t(this.request.error)})})}}function zi(n,e){return n.transaction([Ei],e?"readwrite":"readonly").objectStore(Ei)}function H_(){const n=indexedDB.deleteDatabase(Zh);return new gr(n).toPromise()}function ya(){const n=indexedDB.open(Zh,j_);return new Promise((e,t)=>{n.addEventListener("error",()=>{t(n.error)}),n.addEventListener("upgradeneeded",()=>{const o=n.result;try{o.createObjectStore(Ei,{keyPath:ef})}catch(r){t(r)}}),n.addEventListener("success",async()=>{const o=n.result;o.objectStoreNames.contains(Ei)?e(o):(o.close(),await H_(),e(await ya()))})})}async function xu(n,e,t){const o=zi(n,!0).put({[ef]:e,value:t});return new gr(o).toPromise()}async function W_(n,e){const t=zi(n,!1).get(e),o=await new gr(t).toPromise();return o===void 0?null:o.value}function Uu(n,e){const t=zi(n,!0).delete(e);return new gr(t).toPromise()}const K_=800,Q_=3;class tf{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await ya(),this.db)}async _withRetries(e){let t=0;for(;;)try{const o=await this._openDb();return await e(o)}catch(o){if(t++>Q_)throw o;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return Xh()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=Gi._getInstance(q_()),this.receiver._subscribe("keyChanged",async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)})),this.receiver._subscribe("ping",async(e,t)=>["keyChanged"])}async initializeSender(){if(this.activeServiceWorker=await G_(),!this.activeServiceWorker)return;this.sender=new F_(this.activeServiceWorker);const e=await this.sender._send("ping",{},800);e&&e[0]?.fulfilled&&e[0]?.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||z_()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await ya();return await xu(e,vi,"1"),await Uu(e,vi),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(o=>xu(o,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){const t=await this._withRetries(o=>W_(o,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>Uu(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(r=>{const i=zi(r,!1).getAll();return new gr(i).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const t=[],o=new Set;if(e.length!==0)for(const{fbase_key:r,value:i}of e)o.add(r),JSON.stringify(this.localCache[r])!==JSON.stringify(i)&&(this.notifyListeners(r,i),t.push(r));for(const r of Object.keys(this.localCache))this.localCache[r]&&!o.has(r)&&(this.notifyListeners(r,null),t.push(r));return t}notifyListeners(e,t){this.localCache[e]=t;const o=this.listeners[e];if(o)for(const r of Array.from(o))r(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),K_)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}tf.type="LOCAL";const Y_=tf;new hr(3e4,6e4);/**
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
 */function nf(n,e){return e?Tt(e):(z(n._popupRedirectResolver,n,"argument-error"),n._popupRedirectResolver)}/**
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
 */class nc extends jh{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return zn(e,this._buildIdpRequest())}_linkToIdToken(e,t){return zn(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return zn(e,this._buildIdpRequest())}_buildIdpRequest(e){const t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}}function J_(n){return k_(n.auth,new nc(n),n.bypassAuthState)}function X_(n){const{auth:e,user:t}=n;return z(t,e,"internal-error"),P_(t,new nc(n),n.bypassAuthState)}async function Z_(n){const{auth:e,user:t}=n;return z(t,e,"internal-error"),N_(t,new nc(n),n.bypassAuthState)}/**
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
 */class of{constructor(e,t,o,r,i=!1){this.auth=e,this.resolver=o,this.user=r,this.bypassAuthState=i,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(o){this.reject(o)}})}async onAuthEvent(e){const{urlResponse:t,sessionId:o,postBody:r,tenantId:i,error:s,type:c}=e;if(s){this.reject(s);return}const u={auth:this.auth,requestUri:t,sessionId:o,tenantId:i||void 0,postBody:r||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(c)(u))}catch(d){this.reject(d)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return J_;case"linkViaPopup":case"linkViaRedirect":return Z_;case"reauthViaPopup":case"reauthViaRedirect":return X_;default:pt(this.auth,"internal-error")}}resolve(e){Dt(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){Dt(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
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
 */const ev=new hr(2e3,1e4);async function ID(n,e,t){if(Ze(n.app))return Promise.reject(tt(n,"operation-not-supported-in-this-environment"));const o=$i(n);Yy(n,e,ec);const r=nf(o,t);return new dn(o,"signInViaPopup",e,r).executeNotNull()}class dn extends of{constructor(e,t,o,r,i){super(e,t,r,i),this.provider=o,this.authWindow=null,this.pollId=null,dn.currentPopupAction&&dn.currentPopupAction.cancel(),dn.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return z(e,this.auth,"internal-error"),e}async onExecution(){Dt(this.filter.length===1,"Popup operations only handle one event");const e=tc();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(t=>{this.reject(t)}),this.resolver._isIframeWebStorageSupported(this.auth,t=>{t||this.reject(tt(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){return this.authWindow?.associatedEvent||null}cancel(){this.reject(tt(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,dn.currentPopupAction=null}pollUserCancellation(){const e=()=>{if(this.authWindow?.window?.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(tt(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,ev.get())};e()}}dn.currentPopupAction=null;/**
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
 */const tv="pendingRedirect",si=new Map;class nv extends of{constructor(e,t,o=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,o),this.eventId=null}async execute(){let e=si.get(this.auth._key());if(!e){try{const o=await ov(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(o)}catch(t){e=()=>Promise.reject(t)}si.set(this.auth._key(),e)}return this.bypassAuthState||si.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function ov(n,e){const t=sv(e),o=iv(n);if(!await o._isAvailable())return!1;const r=await o._get(t)==="true";return await o._remove(t),r}function rv(n,e){si.set(n._key(),e)}function iv(n){return Tt(n._redirectPersistence)}function sv(n){return ii(tv,n.config.apiKey,n.name)}async function av(n,e,t=!1){if(Ze(n.app))return Promise.reject(pn(n));const o=$i(n),r=nf(o,e),s=await new nv(o,r,t).execute();return s&&!t&&(delete s.user._redirectEventId,await o._persistUserIfCurrent(s.user),await o._setRedirectUser(null,e)),s}/**
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
 */const cv=600*1e3;class lv{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(o=>{this.isEventForConsumer(e,o)&&(t=!0,this.sendToConsumer(e,o),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!uv(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){if(e.error&&!rf(e)){const o=e.error.code?.split("auth/")[1]||"internal-error";t.onError(tt(this.auth,o))}else t.onAuthEvent(e)}isEventForConsumer(e,t){const o=t.eventId===null||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&o}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=cv&&this.cachedEventUids.clear(),this.cachedEventUids.has(Fu(e))}saveEventToCache(e){this.cachedEventUids.add(Fu(e)),this.lastProcessedEventTime=Date.now()}}function Fu(n){return[n.type,n.eventId,n.sessionId,n.tenantId].filter(e=>e).join("-")}function rf({type:n,error:e}){return n==="unknown"&&e?.code==="auth/no-auth-event"}function uv(n){switch(n.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return rf(n);default:return!1}}/**
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
 */async function dv(n,e={}){return fo(n,"GET","/v1/projects",e)}/**
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
 */const hv=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,fv=/^https?/;async function gv(n){if(n.config.emulator)return;const{authorizedDomains:e}=await dv(n);for(const t of e)try{if(pv(t))return}catch{}pt(n,"unauthorized-domain")}function pv(n){const e=ma(),{protocol:t,hostname:o}=new URL(e);if(n.startsWith("chrome-extension://")){const s=new URL(n);return s.hostname===""&&o===""?t==="chrome-extension:"&&n.replace("chrome-extension://","")===e.replace("chrome-extension://",""):t==="chrome-extension:"&&s.hostname===o}if(!fv.test(t))return!1;if(hv.test(n))return o===n;const r=n.replace(/\./g,"\\.");return new RegExp("^(.+\\."+r+"|"+r+")$","i").test(o)}/**
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
 */const mv=new hr(3e4,6e4);function $u(){const n=ut().___jsl;if(n?.H){for(const e of Object.keys(n.H))if(n.H[e].r=n.H[e].r||[],n.H[e].L=n.H[e].L||[],n.H[e].r=[...n.H[e].L],n.CP)for(let t=0;t<n.CP.length;t++)n.CP[t]=null}}function wv(n){return new Promise((e,t)=>{function o(){$u(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{$u(),t(tt(n,"network-request-failed"))},timeout:mv.get()})}if(ut().gapi?.iframes?.Iframe)e(gapi.iframes.getContext());else if(ut().gapi?.load)o();else{const r=T_("iframefcb");return ut()[r]=()=>{gapi.load?o():t(tt(n,"network-request-failed"))},E_(`${b_()}?onload=${r}`).catch(i=>t(i))}}).catch(e=>{throw ai=null,e})}let ai=null;function yv(n){return ai=ai||wv(n),ai}/**
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
 */const _v=new hr(5e3,15e3),vv="__/auth/iframe",Ev="emulator/auth/iframe",bv={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},Tv=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function Iv(n){const e=n.config;z(e.authDomain,n,"auth-domain-config-required");const t=e.emulator?Qa(e,Ev):`https://${n.config.authDomain}/${vv}`,o={apiKey:e.apiKey,appName:n.name,v:ho},r=Tv.get(n.config.apiHost);r&&(o.eid=r);const i=n._getFrameworks();return i.length&&(o.fw=i.join(",")),`${t}?${dr(o).slice(1)}`}async function Sv(n){const e=await yv(n),t=ut().gapi;return z(t,n,"internal-error"),e.open({where:document.body,url:Iv(n),messageHandlersFilter:t.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:bv,dontclear:!0},o=>new Promise(async(r,i)=>{await o.restyle({setHideOnLeave:!1});const s=tt(n,"network-request-failed"),c=ut().setTimeout(()=>{i(s)},_v.get());function u(){ut().clearTimeout(c),r(o)}o.ping(u).then(u,()=>{i(s)})}))}/**
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
 */const Av={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},Dv=500,Cv=600,Rv="_blank",Nv="http://localhost";class Gu{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function Pv(n,e,t,o=Dv,r=Cv){const i=Math.max((window.screen.availHeight-r)/2,0).toString(),s=Math.max((window.screen.availWidth-o)/2,0).toString();let c="";const u={...Av,width:o.toString(),height:r.toString(),top:i,left:s},d=Ue().toLowerCase();t&&(c=Lh(d)?Rv:t),Vh(d)&&(e=e||Nv,u.scrollbars="yes");const f=Object.entries(u).reduce((m,[S,C])=>`${m}${S}=${C},`,"");if(f_(d)&&c!=="_self")return kv(e||"",c),new Gu(null);const p=window.open(e||"",c,f);z(p,n,"popup-blocked");try{p.focus()}catch{}return new Gu(p)}function kv(n,e){const t=document.createElement("a");t.href=n,t.target=e;const o=document.createEvent("MouseEvent");o.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),t.dispatchEvent(o)}/**
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
 */const Mv="__/auth/handler",Ov="emulator/auth/handler",Vv=encodeURIComponent("fac");async function zu(n,e,t,o,r,i){z(n.config.authDomain,n,"auth-domain-config-required"),z(n.config.apiKey,n,"invalid-api-key");const s={apiKey:n.config.apiKey,appName:n.name,authType:t,redirectUrl:o,v:ho,eventId:r};if(e instanceof ec){e.setDefaultLanguage(n.languageCode),s.providerId=e.providerId||"",Pw(e.getCustomParameters())||(s.customParameters=JSON.stringify(e.getCustomParameters()));for(const[f,p]of Object.entries({}))s[f]=p}if(e instanceof fr){const f=e.getScopes().filter(p=>p!=="");f.length>0&&(s.scopes=f.join(","))}n.tenantId&&(s.tid=n.tenantId);const c=s;for(const f of Object.keys(c))c[f]===void 0&&delete c[f];const u=await n._getAppCheckToken(),d=u?`#${Vv}=${encodeURIComponent(u)}`:"";return`${Bv(n)}?${dr(c).slice(1)}${d}`}function Bv({config:n}){return n.emulator?Qa(n,Ov):`https://${n.authDomain}/${Mv}`}/**
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
 */const Js="webStorageSupport";class Lv{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=Jh,this._completeRedirectFn=av,this._overrideRedirectResult=rv}async _openPopup(e,t,o,r){Dt(this.eventManagers[e._key()]?.manager,"_initialize() not called before _openPopup()");const i=await zu(e,t,o,ma(),r);return Pv(e,i,tc())}async _openRedirect(e,t,o,r){await this._originValidation(e);const i=await zu(e,t,o,ma(),r);return $_(i),new Promise(()=>{})}_initialize(e){const t=e._key();if(this.eventManagers[t]){const{manager:r,promise:i}=this.eventManagers[t];return r?Promise.resolve(r):(Dt(i,"If manager is not set, promise should be"),i)}const o=this.initAndGetManager(e);return this.eventManagers[t]={promise:o},o.catch(()=>{delete this.eventManagers[t]}),o}async initAndGetManager(e){const t=await Sv(e),o=new lv(e);return t.register("authEvent",r=>(z(r?.authEvent,e,"invalid-auth-event"),{status:o.onEvent(r.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:o},this.iframes[e._key()]=t,o}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send(Js,{type:Js},r=>{const i=r?.[0]?.[Js];i!==void 0&&t(!!i),pt(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=gv(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return Gh()||Bh()||Xa()}}const xv=Lv;var qu="@firebase/auth",ju="1.11.0";/**
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
 */class Uv{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){return this.assertAuthConfigured(),this.auth.currentUser?.uid||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const t=this.auth.onIdTokenChanged(o=>{e(o?.stsTokenManager.accessToken||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){z(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
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
 */function Fv(n){switch(n){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function $v(n){gt(new rt("auth",(e,{options:t})=>{const o=e.getProvider("app").getImmediate(),r=e.getProvider("heartbeat"),i=e.getProvider("app-check-internal"),{apiKey:s,authDomain:c}=o.options;z(s&&!s.includes(":"),"invalid-api-key",{appName:o.name});const u={apiKey:s,authDomain:c,clientPlatform:n,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:zh(n)},d=new __(o,r,i,u);return S_(d,t),d},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,o)=>{e.getProvider("auth-internal").initialize()})),gt(new rt("auth-internal",e=>{const t=$i(e.getProvider("auth").getImmediate());return(o=>new Uv(o))(t)},"PRIVATE").setInstantiationMode("EXPLICIT")),Je(qu,ju,Fv(n)),Je(qu,ju,"esm2020")}/**
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
 */const Gv=300,zv=mh("authIdTokenMaxAge")||Gv;let Hu=null;const qv=n=>async e=>{const t=e&&await e.getIdTokenResult(),o=t&&(new Date().getTime()-Date.parse(t.issuedAtTime))/1e3;if(o&&o>zv)return;const r=t?.token;Hu!==r&&(Hu=r,await fetch(n,{method:r?"POST":"DELETE",headers:r?{Authorization:`Bearer ${r}`}:{}}))};function jv(n=Ha()){const e=In(n,"auth");if(e.isInitialized())return e.getImmediate();const t=I_(n,{popupRedirectResolver:xv,persistence:[Y_,Qh,Jh]}),o=mh("authTokenSyncURL");if(o&&typeof isSecureContext=="boolean"&&isSecureContext){const i=new URL(o,location.origin);if(location.origin===i.origin){const s=qv(i.toString());V_(t,s,()=>s(t.currentUser)),O_(t,c=>s(c))}}const r=gh("auth");return r&&A_(t,`http://${r}`),t}function Hv(){return document.getElementsByTagName("head")?.[0]??document}v_({loadJS(n){return new Promise((e,t)=>{const o=document.createElement("script");o.setAttribute("src",n),o.onload=e,o.onerror=r=>{const i=tt("internal-error");i.customData=r,t(i)},o.type="text/javascript",o.charset="UTF-8",Hv().appendChild(o)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});$v("Browser");var Wu=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var zt,sf;(function(){var n;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function e(b,w){function _(){}_.prototype=w.prototype,b.D=w.prototype,b.prototype=new _,b.prototype.constructor=b,b.C=function(v,E,I){for(var y=Array(arguments.length-2),yt=2;yt<arguments.length;yt++)y[yt-2]=arguments[yt];return w.prototype[E].apply(v,y)}}function t(){this.blockSize=-1}function o(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.B=Array(this.blockSize),this.o=this.h=0,this.s()}e(o,t),o.prototype.s=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function r(b,w,_){_||(_=0);var v=Array(16);if(typeof w=="string")for(var E=0;16>E;++E)v[E]=w.charCodeAt(_++)|w.charCodeAt(_++)<<8|w.charCodeAt(_++)<<16|w.charCodeAt(_++)<<24;else for(E=0;16>E;++E)v[E]=w[_++]|w[_++]<<8|w[_++]<<16|w[_++]<<24;w=b.g[0],_=b.g[1],E=b.g[2];var I=b.g[3],y=w+(I^_&(E^I))+v[0]+3614090360&4294967295;w=_+(y<<7&4294967295|y>>>25),y=I+(E^w&(_^E))+v[1]+3905402710&4294967295,I=w+(y<<12&4294967295|y>>>20),y=E+(_^I&(w^_))+v[2]+606105819&4294967295,E=I+(y<<17&4294967295|y>>>15),y=_+(w^E&(I^w))+v[3]+3250441966&4294967295,_=E+(y<<22&4294967295|y>>>10),y=w+(I^_&(E^I))+v[4]+4118548399&4294967295,w=_+(y<<7&4294967295|y>>>25),y=I+(E^w&(_^E))+v[5]+1200080426&4294967295,I=w+(y<<12&4294967295|y>>>20),y=E+(_^I&(w^_))+v[6]+2821735955&4294967295,E=I+(y<<17&4294967295|y>>>15),y=_+(w^E&(I^w))+v[7]+4249261313&4294967295,_=E+(y<<22&4294967295|y>>>10),y=w+(I^_&(E^I))+v[8]+1770035416&4294967295,w=_+(y<<7&4294967295|y>>>25),y=I+(E^w&(_^E))+v[9]+2336552879&4294967295,I=w+(y<<12&4294967295|y>>>20),y=E+(_^I&(w^_))+v[10]+4294925233&4294967295,E=I+(y<<17&4294967295|y>>>15),y=_+(w^E&(I^w))+v[11]+2304563134&4294967295,_=E+(y<<22&4294967295|y>>>10),y=w+(I^_&(E^I))+v[12]+1804603682&4294967295,w=_+(y<<7&4294967295|y>>>25),y=I+(E^w&(_^E))+v[13]+4254626195&4294967295,I=w+(y<<12&4294967295|y>>>20),y=E+(_^I&(w^_))+v[14]+2792965006&4294967295,E=I+(y<<17&4294967295|y>>>15),y=_+(w^E&(I^w))+v[15]+1236535329&4294967295,_=E+(y<<22&4294967295|y>>>10),y=w+(E^I&(_^E))+v[1]+4129170786&4294967295,w=_+(y<<5&4294967295|y>>>27),y=I+(_^E&(w^_))+v[6]+3225465664&4294967295,I=w+(y<<9&4294967295|y>>>23),y=E+(w^_&(I^w))+v[11]+643717713&4294967295,E=I+(y<<14&4294967295|y>>>18),y=_+(I^w&(E^I))+v[0]+3921069994&4294967295,_=E+(y<<20&4294967295|y>>>12),y=w+(E^I&(_^E))+v[5]+3593408605&4294967295,w=_+(y<<5&4294967295|y>>>27),y=I+(_^E&(w^_))+v[10]+38016083&4294967295,I=w+(y<<9&4294967295|y>>>23),y=E+(w^_&(I^w))+v[15]+3634488961&4294967295,E=I+(y<<14&4294967295|y>>>18),y=_+(I^w&(E^I))+v[4]+3889429448&4294967295,_=E+(y<<20&4294967295|y>>>12),y=w+(E^I&(_^E))+v[9]+568446438&4294967295,w=_+(y<<5&4294967295|y>>>27),y=I+(_^E&(w^_))+v[14]+3275163606&4294967295,I=w+(y<<9&4294967295|y>>>23),y=E+(w^_&(I^w))+v[3]+4107603335&4294967295,E=I+(y<<14&4294967295|y>>>18),y=_+(I^w&(E^I))+v[8]+1163531501&4294967295,_=E+(y<<20&4294967295|y>>>12),y=w+(E^I&(_^E))+v[13]+2850285829&4294967295,w=_+(y<<5&4294967295|y>>>27),y=I+(_^E&(w^_))+v[2]+4243563512&4294967295,I=w+(y<<9&4294967295|y>>>23),y=E+(w^_&(I^w))+v[7]+1735328473&4294967295,E=I+(y<<14&4294967295|y>>>18),y=_+(I^w&(E^I))+v[12]+2368359562&4294967295,_=E+(y<<20&4294967295|y>>>12),y=w+(_^E^I)+v[5]+4294588738&4294967295,w=_+(y<<4&4294967295|y>>>28),y=I+(w^_^E)+v[8]+2272392833&4294967295,I=w+(y<<11&4294967295|y>>>21),y=E+(I^w^_)+v[11]+1839030562&4294967295,E=I+(y<<16&4294967295|y>>>16),y=_+(E^I^w)+v[14]+4259657740&4294967295,_=E+(y<<23&4294967295|y>>>9),y=w+(_^E^I)+v[1]+2763975236&4294967295,w=_+(y<<4&4294967295|y>>>28),y=I+(w^_^E)+v[4]+1272893353&4294967295,I=w+(y<<11&4294967295|y>>>21),y=E+(I^w^_)+v[7]+4139469664&4294967295,E=I+(y<<16&4294967295|y>>>16),y=_+(E^I^w)+v[10]+3200236656&4294967295,_=E+(y<<23&4294967295|y>>>9),y=w+(_^E^I)+v[13]+681279174&4294967295,w=_+(y<<4&4294967295|y>>>28),y=I+(w^_^E)+v[0]+3936430074&4294967295,I=w+(y<<11&4294967295|y>>>21),y=E+(I^w^_)+v[3]+3572445317&4294967295,E=I+(y<<16&4294967295|y>>>16),y=_+(E^I^w)+v[6]+76029189&4294967295,_=E+(y<<23&4294967295|y>>>9),y=w+(_^E^I)+v[9]+3654602809&4294967295,w=_+(y<<4&4294967295|y>>>28),y=I+(w^_^E)+v[12]+3873151461&4294967295,I=w+(y<<11&4294967295|y>>>21),y=E+(I^w^_)+v[15]+530742520&4294967295,E=I+(y<<16&4294967295|y>>>16),y=_+(E^I^w)+v[2]+3299628645&4294967295,_=E+(y<<23&4294967295|y>>>9),y=w+(E^(_|~I))+v[0]+4096336452&4294967295,w=_+(y<<6&4294967295|y>>>26),y=I+(_^(w|~E))+v[7]+1126891415&4294967295,I=w+(y<<10&4294967295|y>>>22),y=E+(w^(I|~_))+v[14]+2878612391&4294967295,E=I+(y<<15&4294967295|y>>>17),y=_+(I^(E|~w))+v[5]+4237533241&4294967295,_=E+(y<<21&4294967295|y>>>11),y=w+(E^(_|~I))+v[12]+1700485571&4294967295,w=_+(y<<6&4294967295|y>>>26),y=I+(_^(w|~E))+v[3]+2399980690&4294967295,I=w+(y<<10&4294967295|y>>>22),y=E+(w^(I|~_))+v[10]+4293915773&4294967295,E=I+(y<<15&4294967295|y>>>17),y=_+(I^(E|~w))+v[1]+2240044497&4294967295,_=E+(y<<21&4294967295|y>>>11),y=w+(E^(_|~I))+v[8]+1873313359&4294967295,w=_+(y<<6&4294967295|y>>>26),y=I+(_^(w|~E))+v[15]+4264355552&4294967295,I=w+(y<<10&4294967295|y>>>22),y=E+(w^(I|~_))+v[6]+2734768916&4294967295,E=I+(y<<15&4294967295|y>>>17),y=_+(I^(E|~w))+v[13]+1309151649&4294967295,_=E+(y<<21&4294967295|y>>>11),y=w+(E^(_|~I))+v[4]+4149444226&4294967295,w=_+(y<<6&4294967295|y>>>26),y=I+(_^(w|~E))+v[11]+3174756917&4294967295,I=w+(y<<10&4294967295|y>>>22),y=E+(w^(I|~_))+v[2]+718787259&4294967295,E=I+(y<<15&4294967295|y>>>17),y=_+(I^(E|~w))+v[9]+3951481745&4294967295,b.g[0]=b.g[0]+w&4294967295,b.g[1]=b.g[1]+(E+(y<<21&4294967295|y>>>11))&4294967295,b.g[2]=b.g[2]+E&4294967295,b.g[3]=b.g[3]+I&4294967295}o.prototype.u=function(b,w){w===void 0&&(w=b.length);for(var _=w-this.blockSize,v=this.B,E=this.h,I=0;I<w;){if(E==0)for(;I<=_;)r(this,b,I),I+=this.blockSize;if(typeof b=="string"){for(;I<w;)if(v[E++]=b.charCodeAt(I++),E==this.blockSize){r(this,v),E=0;break}}else for(;I<w;)if(v[E++]=b[I++],E==this.blockSize){r(this,v),E=0;break}}this.h=E,this.o+=w},o.prototype.v=function(){var b=Array((56>this.h?this.blockSize:2*this.blockSize)-this.h);b[0]=128;for(var w=1;w<b.length-8;++w)b[w]=0;var _=8*this.o;for(w=b.length-8;w<b.length;++w)b[w]=_&255,_/=256;for(this.u(b),b=Array(16),w=_=0;4>w;++w)for(var v=0;32>v;v+=8)b[_++]=this.g[w]>>>v&255;return b};function i(b,w){var _=c;return Object.prototype.hasOwnProperty.call(_,b)?_[b]:_[b]=w(b)}function s(b,w){this.h=w;for(var _=[],v=!0,E=b.length-1;0<=E;E--){var I=b[E]|0;v&&I==w||(_[E]=I,v=!1)}this.g=_}var c={};function u(b){return-128<=b&&128>b?i(b,function(w){return new s([w|0],0>w?-1:0)}):new s([b|0],0>b?-1:0)}function d(b){if(isNaN(b)||!isFinite(b))return p;if(0>b)return P(d(-b));for(var w=[],_=1,v=0;b>=_;v++)w[v]=b/_|0,_*=4294967296;return new s(w,0)}function f(b,w){if(b.length==0)throw Error("number format error: empty string");if(w=w||10,2>w||36<w)throw Error("radix out of range: "+w);if(b.charAt(0)=="-")return P(f(b.substring(1),w));if(0<=b.indexOf("-"))throw Error('number format error: interior "-" character');for(var _=d(Math.pow(w,8)),v=p,E=0;E<b.length;E+=8){var I=Math.min(8,b.length-E),y=parseInt(b.substring(E,E+I),w);8>I?(I=d(Math.pow(w,I)),v=v.j(I).add(d(y))):(v=v.j(_),v=v.add(d(y)))}return v}var p=u(0),m=u(1),S=u(16777216);n=s.prototype,n.m=function(){if(M(this))return-P(this).m();for(var b=0,w=1,_=0;_<this.g.length;_++){var v=this.i(_);b+=(0<=v?v:4294967296+v)*w,w*=4294967296}return b},n.toString=function(b){if(b=b||10,2>b||36<b)throw Error("radix out of range: "+b);if(C(this))return"0";if(M(this))return"-"+P(this).toString(b);for(var w=d(Math.pow(b,6)),_=this,v="";;){var E=ue(_,w).g;_=U(_,E.j(w));var I=((0<_.g.length?_.g[0]:_.h)>>>0).toString(b);if(_=E,C(_))return I+v;for(;6>I.length;)I="0"+I;v=I+v}},n.i=function(b){return 0>b?0:b<this.g.length?this.g[b]:this.h};function C(b){if(b.h!=0)return!1;for(var w=0;w<b.g.length;w++)if(b.g[w]!=0)return!1;return!0}function M(b){return b.h==-1}n.l=function(b){return b=U(this,b),M(b)?-1:C(b)?0:1};function P(b){for(var w=b.g.length,_=[],v=0;v<w;v++)_[v]=~b.g[v];return new s(_,~b.h).add(m)}n.abs=function(){return M(this)?P(this):this},n.add=function(b){for(var w=Math.max(this.g.length,b.g.length),_=[],v=0,E=0;E<=w;E++){var I=v+(this.i(E)&65535)+(b.i(E)&65535),y=(I>>>16)+(this.i(E)>>>16)+(b.i(E)>>>16);v=y>>>16,I&=65535,y&=65535,_[E]=y<<16|I}return new s(_,_[_.length-1]&-2147483648?-1:0)};function U(b,w){return b.add(P(w))}n.j=function(b){if(C(this)||C(b))return p;if(M(this))return M(b)?P(this).j(P(b)):P(P(this).j(b));if(M(b))return P(this.j(P(b)));if(0>this.l(S)&&0>b.l(S))return d(this.m()*b.m());for(var w=this.g.length+b.g.length,_=[],v=0;v<2*w;v++)_[v]=0;for(v=0;v<this.g.length;v++)for(var E=0;E<b.g.length;E++){var I=this.i(v)>>>16,y=this.i(v)&65535,yt=b.i(E)>>>16,So=b.i(E)&65535;_[2*v+2*E]+=y*So,G(_,2*v+2*E),_[2*v+2*E+1]+=I*So,G(_,2*v+2*E+1),_[2*v+2*E+1]+=y*yt,G(_,2*v+2*E+1),_[2*v+2*E+2]+=I*yt,G(_,2*v+2*E+2)}for(v=0;v<w;v++)_[v]=_[2*v+1]<<16|_[2*v];for(v=w;v<2*w;v++)_[v]=0;return new s(_,0)};function G(b,w){for(;(b[w]&65535)!=b[w];)b[w+1]+=b[w]>>>16,b[w]&=65535,w++}function W(b,w){this.g=b,this.h=w}function ue(b,w){if(C(w))throw Error("division by zero");if(C(b))return new W(p,p);if(M(b))return w=ue(P(b),w),new W(P(w.g),P(w.h));if(M(w))return w=ue(b,P(w)),new W(P(w.g),w.h);if(30<b.g.length){if(M(b)||M(w))throw Error("slowDivide_ only works with positive integers.");for(var _=m,v=w;0>=v.l(b);)_=Ne(_),v=Ne(v);var E=ie(_,1),I=ie(v,1);for(v=ie(v,2),_=ie(_,2);!C(v);){var y=I.add(v);0>=y.l(b)&&(E=E.add(_),I=y),v=ie(v,1),_=ie(_,1)}return w=U(b,E.j(w)),new W(E,w)}for(E=p;0<=b.l(w);){for(_=Math.max(1,Math.floor(b.m()/w.m())),v=Math.ceil(Math.log(_)/Math.LN2),v=48>=v?1:Math.pow(2,v-48),I=d(_),y=I.j(w);M(y)||0<y.l(b);)_-=v,I=d(_),y=I.j(w);C(I)&&(I=m),E=E.add(I),b=U(b,y)}return new W(E,b)}n.A=function(b){return ue(this,b).h},n.and=function(b){for(var w=Math.max(this.g.length,b.g.length),_=[],v=0;v<w;v++)_[v]=this.i(v)&b.i(v);return new s(_,this.h&b.h)},n.or=function(b){for(var w=Math.max(this.g.length,b.g.length),_=[],v=0;v<w;v++)_[v]=this.i(v)|b.i(v);return new s(_,this.h|b.h)},n.xor=function(b){for(var w=Math.max(this.g.length,b.g.length),_=[],v=0;v<w;v++)_[v]=this.i(v)^b.i(v);return new s(_,this.h^b.h)};function Ne(b){for(var w=b.g.length+1,_=[],v=0;v<w;v++)_[v]=b.i(v)<<1|b.i(v-1)>>>31;return new s(_,b.h)}function ie(b,w){var _=w>>5;w%=32;for(var v=b.g.length-_,E=[],I=0;I<v;I++)E[I]=0<w?b.i(I+_)>>>w|b.i(I+_+1)<<32-w:b.i(I+_);return new s(E,b.h)}o.prototype.digest=o.prototype.v,o.prototype.reset=o.prototype.s,o.prototype.update=o.prototype.u,sf=o,s.prototype.add=s.prototype.add,s.prototype.multiply=s.prototype.j,s.prototype.modulo=s.prototype.A,s.prototype.compare=s.prototype.l,s.prototype.toNumber=s.prototype.m,s.prototype.toString=s.prototype.toString,s.prototype.getBits=s.prototype.i,s.fromNumber=d,s.fromString=f,zt=s}).apply(typeof Wu<"u"?Wu:typeof self<"u"?self:typeof window<"u"?window:{});var Qr=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var af,Go,cf,ci,_a,lf,uf,df;(function(){var n,e=typeof Object.defineProperties=="function"?Object.defineProperty:function(a,l,h){return a==Array.prototype||a==Object.prototype||(a[l]=h.value),a};function t(a){a=[typeof globalThis=="object"&&globalThis,a,typeof window=="object"&&window,typeof self=="object"&&self,typeof Qr=="object"&&Qr];for(var l=0;l<a.length;++l){var h=a[l];if(h&&h.Math==Math)return h}throw Error("Cannot find global object")}var o=t(this);function r(a,l){if(l)e:{var h=o;a=a.split(".");for(var g=0;g<a.length-1;g++){var T=a[g];if(!(T in h))break e;h=h[T]}a=a[a.length-1],g=h[a],l=l(g),l!=g&&l!=null&&e(h,a,{configurable:!0,writable:!0,value:l})}}function i(a,l){a instanceof String&&(a+="");var h=0,g=!1,T={next:function(){if(!g&&h<a.length){var D=h++;return{value:l(D,a[D]),done:!1}}return g=!0,{done:!0,value:void 0}}};return T[Symbol.iterator]=function(){return T},T}r("Array.prototype.values",function(a){return a||function(){return i(this,function(l,h){return h})}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var s=s||{},c=this||self;function u(a){var l=typeof a;return l=l!="object"?l:a?Array.isArray(a)?"array":l:"null",l=="array"||l=="object"&&typeof a.length=="number"}function d(a){var l=typeof a;return l=="object"&&a!=null||l=="function"}function f(a,l,h){return a.call.apply(a.bind,arguments)}function p(a,l,h){if(!a)throw Error();if(2<arguments.length){var g=Array.prototype.slice.call(arguments,2);return function(){var T=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(T,g),a.apply(l,T)}}return function(){return a.apply(l,arguments)}}function m(a,l,h){return m=Function.prototype.bind&&Function.prototype.bind.toString().indexOf("native code")!=-1?f:p,m.apply(null,arguments)}function S(a,l){var h=Array.prototype.slice.call(arguments,1);return function(){var g=h.slice();return g.push.apply(g,arguments),a.apply(this,g)}}function C(a,l){function h(){}h.prototype=l.prototype,a.aa=l.prototype,a.prototype=new h,a.prototype.constructor=a,a.Qb=function(g,T,D){for(var V=Array(arguments.length-2),ne=2;ne<arguments.length;ne++)V[ne-2]=arguments[ne];return l.prototype[T].apply(g,V)}}function M(a){const l=a.length;if(0<l){const h=Array(l);for(let g=0;g<l;g++)h[g]=a[g];return h}return[]}function P(a,l){for(let h=1;h<arguments.length;h++){const g=arguments[h];if(u(g)){const T=a.length||0,D=g.length||0;a.length=T+D;for(let V=0;V<D;V++)a[T+V]=g[V]}else a.push(g)}}class U{constructor(l,h){this.i=l,this.j=h,this.h=0,this.g=null}get(){let l;return 0<this.h?(this.h--,l=this.g,this.g=l.next,l.next=null):l=this.i(),l}}function G(a){return/^[\s\xa0]*$/.test(a)}function W(){var a=c.navigator;return a&&(a=a.userAgent)?a:""}function ue(a){return ue[" "](a),a}ue[" "]=function(){};var Ne=W().indexOf("Gecko")!=-1&&!(W().toLowerCase().indexOf("webkit")!=-1&&W().indexOf("Edge")==-1)&&!(W().indexOf("Trident")!=-1||W().indexOf("MSIE")!=-1)&&W().indexOf("Edge")==-1;function ie(a,l,h){for(const g in a)l.call(h,a[g],g,a)}function b(a,l){for(const h in a)l.call(void 0,a[h],h,a)}function w(a){const l={};for(const h in a)l[h]=a[h];return l}const _="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function v(a,l){let h,g;for(let T=1;T<arguments.length;T++){g=arguments[T];for(h in g)a[h]=g[h];for(let D=0;D<_.length;D++)h=_[D],Object.prototype.hasOwnProperty.call(g,h)&&(a[h]=g[h])}}function E(a){var l=1;a=a.split(":");const h=[];for(;0<l&&a.length;)h.push(a.shift()),l--;return a.length&&h.push(a.join(":")),h}function I(a){c.setTimeout(()=>{throw a},0)}function y(){var a=Es;let l=null;return a.g&&(l=a.g,a.g=a.g.next,a.g||(a.h=null),l.next=null),l}class yt{constructor(){this.h=this.g=null}add(l,h){const g=So.get();g.set(l,h),this.h?this.h.next=g:this.g=g,this.h=g}}var So=new U(()=>new Sm,a=>a.reset());class Sm{constructor(){this.next=this.g=this.h=null}set(l,h){this.h=l,this.g=h,this.next=null}reset(){this.next=this.g=this.h=null}}let Ao,Do=!1,Es=new yt,wl=()=>{const a=c.Promise.resolve(void 0);Ao=()=>{a.then(Am)}};var Am=()=>{for(var a;a=y();){try{a.h.call(a.g)}catch(h){I(h)}var l=So;l.j(a),100>l.h&&(l.h++,a.next=l.g,l.g=a)}Do=!1};function Pt(){this.s=this.s,this.C=this.C}Pt.prototype.s=!1,Pt.prototype.ma=function(){this.s||(this.s=!0,this.N())},Pt.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function Pe(a,l){this.type=a,this.g=this.target=l,this.defaultPrevented=!1}Pe.prototype.h=function(){this.defaultPrevented=!0};var Dm=function(){if(!c.addEventListener||!Object.defineProperty)return!1;var a=!1,l=Object.defineProperty({},"passive",{get:function(){a=!0}});try{const h=()=>{};c.addEventListener("test",h,l),c.removeEventListener("test",h,l)}catch{}return a}();function Co(a,l){if(Pe.call(this,a?a.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,a){var h=this.type=a.type,g=a.changedTouches&&a.changedTouches.length?a.changedTouches[0]:null;if(this.target=a.target||a.srcElement,this.g=l,l=a.relatedTarget){if(Ne){e:{try{ue(l.nodeName);var T=!0;break e}catch{}T=!1}T||(l=null)}}else h=="mouseover"?l=a.fromElement:h=="mouseout"&&(l=a.toElement);this.relatedTarget=l,g?(this.clientX=g.clientX!==void 0?g.clientX:g.pageX,this.clientY=g.clientY!==void 0?g.clientY:g.pageY,this.screenX=g.screenX||0,this.screenY=g.screenY||0):(this.clientX=a.clientX!==void 0?a.clientX:a.pageX,this.clientY=a.clientY!==void 0?a.clientY:a.pageY,this.screenX=a.screenX||0,this.screenY=a.screenY||0),this.button=a.button,this.key=a.key||"",this.ctrlKey=a.ctrlKey,this.altKey=a.altKey,this.shiftKey=a.shiftKey,this.metaKey=a.metaKey,this.pointerId=a.pointerId||0,this.pointerType=typeof a.pointerType=="string"?a.pointerType:Cm[a.pointerType]||"",this.state=a.state,this.i=a,a.defaultPrevented&&Co.aa.h.call(this)}}C(Co,Pe);var Cm={2:"touch",3:"pen",4:"mouse"};Co.prototype.h=function(){Co.aa.h.call(this);var a=this.i;a.preventDefault?a.preventDefault():a.returnValue=!1};var Rr="closure_listenable_"+(1e6*Math.random()|0),Rm=0;function Nm(a,l,h,g,T){this.listener=a,this.proxy=null,this.src=l,this.type=h,this.capture=!!g,this.ha=T,this.key=++Rm,this.da=this.fa=!1}function Nr(a){a.da=!0,a.listener=null,a.proxy=null,a.src=null,a.ha=null}function Pr(a){this.src=a,this.g={},this.h=0}Pr.prototype.add=function(a,l,h,g,T){var D=a.toString();a=this.g[D],a||(a=this.g[D]=[],this.h++);var V=Ts(a,l,g,T);return-1<V?(l=a[V],h||(l.fa=!1)):(l=new Nm(l,this.src,D,!!g,T),l.fa=h,a.push(l)),l};function bs(a,l){var h=l.type;if(h in a.g){var g=a.g[h],T=Array.prototype.indexOf.call(g,l,void 0),D;(D=0<=T)&&Array.prototype.splice.call(g,T,1),D&&(Nr(l),a.g[h].length==0&&(delete a.g[h],a.h--))}}function Ts(a,l,h,g){for(var T=0;T<a.length;++T){var D=a[T];if(!D.da&&D.listener==l&&D.capture==!!h&&D.ha==g)return T}return-1}var Is="closure_lm_"+(1e6*Math.random()|0),Ss={};function yl(a,l,h,g,T){if(Array.isArray(l)){for(var D=0;D<l.length;D++)yl(a,l[D],h,g,T);return null}return h=El(h),a&&a[Rr]?a.K(l,h,d(g)?!!g.capture:!1,T):Pm(a,l,h,!1,g,T)}function Pm(a,l,h,g,T,D){if(!l)throw Error("Invalid event type");var V=d(T)?!!T.capture:!!T,ne=Ds(a);if(ne||(a[Is]=ne=new Pr(a)),h=ne.add(l,h,g,V,D),h.proxy)return h;if(g=km(),h.proxy=g,g.src=a,g.listener=h,a.addEventListener)Dm||(T=V),T===void 0&&(T=!1),a.addEventListener(l.toString(),g,T);else if(a.attachEvent)a.attachEvent(vl(l.toString()),g);else if(a.addListener&&a.removeListener)a.addListener(g);else throw Error("addEventListener and attachEvent are unavailable.");return h}function km(){function a(h){return l.call(a.src,a.listener,h)}const l=Mm;return a}function _l(a,l,h,g,T){if(Array.isArray(l))for(var D=0;D<l.length;D++)_l(a,l[D],h,g,T);else g=d(g)?!!g.capture:!!g,h=El(h),a&&a[Rr]?(a=a.i,l=String(l).toString(),l in a.g&&(D=a.g[l],h=Ts(D,h,g,T),-1<h&&(Nr(D[h]),Array.prototype.splice.call(D,h,1),D.length==0&&(delete a.g[l],a.h--)))):a&&(a=Ds(a))&&(l=a.g[l.toString()],a=-1,l&&(a=Ts(l,h,g,T)),(h=-1<a?l[a]:null)&&As(h))}function As(a){if(typeof a!="number"&&a&&!a.da){var l=a.src;if(l&&l[Rr])bs(l.i,a);else{var h=a.type,g=a.proxy;l.removeEventListener?l.removeEventListener(h,g,a.capture):l.detachEvent?l.detachEvent(vl(h),g):l.addListener&&l.removeListener&&l.removeListener(g),(h=Ds(l))?(bs(h,a),h.h==0&&(h.src=null,l[Is]=null)):Nr(a)}}}function vl(a){return a in Ss?Ss[a]:Ss[a]="on"+a}function Mm(a,l){if(a.da)a=!0;else{l=new Co(l,this);var h=a.listener,g=a.ha||a.src;a.fa&&As(a),a=h.call(g,l)}return a}function Ds(a){return a=a[Is],a instanceof Pr?a:null}var Cs="__closure_events_fn_"+(1e9*Math.random()>>>0);function El(a){return typeof a=="function"?a:(a[Cs]||(a[Cs]=function(l){return a.handleEvent(l)}),a[Cs])}function ke(){Pt.call(this),this.i=new Pr(this),this.M=this,this.F=null}C(ke,Pt),ke.prototype[Rr]=!0,ke.prototype.removeEventListener=function(a,l,h,g){_l(this,a,l,h,g)};function Fe(a,l){var h,g=a.F;if(g)for(h=[];g;g=g.F)h.push(g);if(a=a.M,g=l.type||l,typeof l=="string")l=new Pe(l,a);else if(l instanceof Pe)l.target=l.target||a;else{var T=l;l=new Pe(g,a),v(l,T)}if(T=!0,h)for(var D=h.length-1;0<=D;D--){var V=l.g=h[D];T=kr(V,g,!0,l)&&T}if(V=l.g=a,T=kr(V,g,!0,l)&&T,T=kr(V,g,!1,l)&&T,h)for(D=0;D<h.length;D++)V=l.g=h[D],T=kr(V,g,!1,l)&&T}ke.prototype.N=function(){if(ke.aa.N.call(this),this.i){var a=this.i,l;for(l in a.g){for(var h=a.g[l],g=0;g<h.length;g++)Nr(h[g]);delete a.g[l],a.h--}}this.F=null},ke.prototype.K=function(a,l,h,g){return this.i.add(String(a),l,!1,h,g)},ke.prototype.L=function(a,l,h,g){return this.i.add(String(a),l,!0,h,g)};function kr(a,l,h,g){if(l=a.i.g[String(l)],!l)return!0;l=l.concat();for(var T=!0,D=0;D<l.length;++D){var V=l[D];if(V&&!V.da&&V.capture==h){var ne=V.listener,De=V.ha||V.src;V.fa&&bs(a.i,V),T=ne.call(De,g)!==!1&&T}}return T&&!g.defaultPrevented}function bl(a,l,h){if(typeof a=="function")h&&(a=m(a,h));else if(a&&typeof a.handleEvent=="function")a=m(a.handleEvent,a);else throw Error("Invalid listener argument");return 2147483647<Number(l)?-1:c.setTimeout(a,l||0)}function Tl(a){a.g=bl(()=>{a.g=null,a.i&&(a.i=!1,Tl(a))},a.l);const l=a.h;a.h=null,a.m.apply(null,l)}class Om extends Pt{constructor(l,h){super(),this.m=l,this.l=h,this.h=null,this.i=!1,this.g=null}j(l){this.h=arguments,this.g?this.i=!0:Tl(this)}N(){super.N(),this.g&&(c.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function Ro(a){Pt.call(this),this.h=a,this.g={}}C(Ro,Pt);var Il=[];function Sl(a){ie(a.g,function(l,h){this.g.hasOwnProperty(h)&&As(l)},a),a.g={}}Ro.prototype.N=function(){Ro.aa.N.call(this),Sl(this)},Ro.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var Rs=c.JSON.stringify,Vm=c.JSON.parse,Bm=class{stringify(a){return c.JSON.stringify(a,void 0)}parse(a){return c.JSON.parse(a,void 0)}};function Ns(){}Ns.prototype.h=null;function Al(a){return a.h||(a.h=a.i())}function Dl(){}var No={OPEN:"a",kb:"b",Ja:"c",wb:"d"};function Ps(){Pe.call(this,"d")}C(Ps,Pe);function ks(){Pe.call(this,"c")}C(ks,Pe);var nn={},Cl=null;function Mr(){return Cl=Cl||new ke}nn.La="serverreachability";function Rl(a){Pe.call(this,nn.La,a)}C(Rl,Pe);function Po(a){const l=Mr();Fe(l,new Rl(l))}nn.STAT_EVENT="statevent";function Nl(a,l){Pe.call(this,nn.STAT_EVENT,a),this.stat=l}C(Nl,Pe);function $e(a){const l=Mr();Fe(l,new Nl(l,a))}nn.Ma="timingevent";function Pl(a,l){Pe.call(this,nn.Ma,a),this.size=l}C(Pl,Pe);function ko(a,l){if(typeof a!="function")throw Error("Fn must not be null and must be a function");return c.setTimeout(function(){a()},l)}function Mo(){this.g=!0}Mo.prototype.xa=function(){this.g=!1};function Lm(a,l,h,g,T,D){a.info(function(){if(a.g)if(D)for(var V="",ne=D.split("&"),De=0;De<ne.length;De++){var Z=ne[De].split("=");if(1<Z.length){var Me=Z[0];Z=Z[1];var Oe=Me.split("_");V=2<=Oe.length&&Oe[1]=="type"?V+(Me+"="+Z+"&"):V+(Me+"=redacted&")}}else V=null;else V=D;return"XMLHTTP REQ ("+g+") [attempt "+T+"]: "+l+`
`+h+`
`+V})}function xm(a,l,h,g,T,D,V){a.info(function(){return"XMLHTTP RESP ("+g+") [ attempt "+T+"]: "+l+`
`+h+`
`+D+" "+V})}function kn(a,l,h,g){a.info(function(){return"XMLHTTP TEXT ("+l+"): "+Fm(a,h)+(g?" "+g:"")})}function Um(a,l){a.info(function(){return"TIMEOUT: "+l})}Mo.prototype.info=function(){};function Fm(a,l){if(!a.g)return l;if(!l)return null;try{var h=JSON.parse(l);if(h){for(a=0;a<h.length;a++)if(Array.isArray(h[a])){var g=h[a];if(!(2>g.length)){var T=g[1];if(Array.isArray(T)&&!(1>T.length)){var D=T[0];if(D!="noop"&&D!="stop"&&D!="close")for(var V=1;V<T.length;V++)T[V]=""}}}}return Rs(h)}catch{return l}}var Or={NO_ERROR:0,gb:1,tb:2,sb:3,nb:4,rb:5,ub:6,Ia:7,TIMEOUT:8,xb:9},kl={lb:"complete",Hb:"success",Ja:"error",Ia:"abort",zb:"ready",Ab:"readystatechange",TIMEOUT:"timeout",vb:"incrementaldata",yb:"progress",ob:"downloadprogress",Pb:"uploadprogress"},Ms;function Vr(){}C(Vr,Ns),Vr.prototype.g=function(){return new XMLHttpRequest},Vr.prototype.i=function(){return{}},Ms=new Vr;function kt(a,l,h,g){this.j=a,this.i=l,this.l=h,this.R=g||1,this.U=new Ro(this),this.I=45e3,this.H=null,this.o=!1,this.m=this.A=this.v=this.L=this.F=this.S=this.B=null,this.D=[],this.g=null,this.C=0,this.s=this.u=null,this.X=-1,this.J=!1,this.O=0,this.M=null,this.W=this.K=this.T=this.P=!1,this.h=new Ml}function Ml(){this.i=null,this.g="",this.h=!1}var Ol={},Os={};function Vs(a,l,h){a.L=1,a.v=Ur(_t(l)),a.m=h,a.P=!0,Vl(a,null)}function Vl(a,l){a.F=Date.now(),Br(a),a.A=_t(a.v);var h=a.A,g=a.R;Array.isArray(g)||(g=[String(g)]),Ql(h.i,"t",g),a.C=0,h=a.j.J,a.h=new Ml,a.g=fu(a.j,h?l:null,!a.m),0<a.O&&(a.M=new Om(m(a.Y,a,a.g),a.O)),l=a.U,h=a.g,g=a.ca;var T="readystatechange";Array.isArray(T)||(T&&(Il[0]=T.toString()),T=Il);for(var D=0;D<T.length;D++){var V=yl(h,T[D],g||l.handleEvent,!1,l.h||l);if(!V)break;l.g[V.key]=V}l=a.H?w(a.H):{},a.m?(a.u||(a.u="POST"),l["Content-Type"]="application/x-www-form-urlencoded",a.g.ea(a.A,a.u,a.m,l)):(a.u="GET",a.g.ea(a.A,a.u,null,l)),Po(),Lm(a.i,a.u,a.A,a.l,a.R,a.m)}kt.prototype.ca=function(a){a=a.target;const l=this.M;l&&vt(a)==3?l.j():this.Y(a)},kt.prototype.Y=function(a){try{if(a==this.g)e:{const Oe=vt(this.g);var l=this.g.Ba();const Vn=this.g.Z();if(!(3>Oe)&&(Oe!=3||this.g&&(this.h.h||this.g.oa()||nu(this.g)))){this.J||Oe!=4||l==7||(l==8||0>=Vn?Po(3):Po(2)),Bs(this);var h=this.g.Z();this.X=h;t:if(Bl(this)){var g=nu(this.g);a="";var T=g.length,D=vt(this.g)==4;if(!this.h.i){if(typeof TextDecoder>"u"){on(this),Oo(this);var V="";break t}this.h.i=new c.TextDecoder}for(l=0;l<T;l++)this.h.h=!0,a+=this.h.i.decode(g[l],{stream:!(D&&l==T-1)});g.length=0,this.h.g+=a,this.C=0,V=this.h.g}else V=this.g.oa();if(this.o=h==200,xm(this.i,this.u,this.A,this.l,this.R,Oe,h),this.o){if(this.T&&!this.K){t:{if(this.g){var ne,De=this.g;if((ne=De.g?De.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!G(ne)){var Z=ne;break t}}Z=null}if(h=Z)kn(this.i,this.l,h,"Initial handshake response via X-HTTP-Initial-Response"),this.K=!0,Ls(this,h);else{this.o=!1,this.s=3,$e(12),on(this),Oo(this);break e}}if(this.P){h=!0;let Xe;for(;!this.J&&this.C<V.length;)if(Xe=$m(this,V),Xe==Os){Oe==4&&(this.s=4,$e(14),h=!1),kn(this.i,this.l,null,"[Incomplete Response]");break}else if(Xe==Ol){this.s=4,$e(15),kn(this.i,this.l,V,"[Invalid Chunk]"),h=!1;break}else kn(this.i,this.l,Xe,null),Ls(this,Xe);if(Bl(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),Oe!=4||V.length!=0||this.h.h||(this.s=1,$e(16),h=!1),this.o=this.o&&h,!h)kn(this.i,this.l,V,"[Invalid Chunked Response]"),on(this),Oo(this);else if(0<V.length&&!this.W){this.W=!0;var Me=this.j;Me.g==this&&Me.ba&&!Me.M&&(Me.j.info("Great, no buffering proxy detected. Bytes received: "+V.length),zs(Me),Me.M=!0,$e(11))}}else kn(this.i,this.l,V,null),Ls(this,V);Oe==4&&on(this),this.o&&!this.J&&(Oe==4?lu(this.j,this):(this.o=!1,Br(this)))}else rw(this.g),h==400&&0<V.indexOf("Unknown SID")?(this.s=3,$e(12)):(this.s=0,$e(13)),on(this),Oo(this)}}}catch{}finally{}};function Bl(a){return a.g?a.u=="GET"&&a.L!=2&&a.j.Ca:!1}function $m(a,l){var h=a.C,g=l.indexOf(`
`,h);return g==-1?Os:(h=Number(l.substring(h,g)),isNaN(h)?Ol:(g+=1,g+h>l.length?Os:(l=l.slice(g,g+h),a.C=g+h,l)))}kt.prototype.cancel=function(){this.J=!0,on(this)};function Br(a){a.S=Date.now()+a.I,Ll(a,a.I)}function Ll(a,l){if(a.B!=null)throw Error("WatchDog timer not null");a.B=ko(m(a.ba,a),l)}function Bs(a){a.B&&(c.clearTimeout(a.B),a.B=null)}kt.prototype.ba=function(){this.B=null;const a=Date.now();0<=a-this.S?(Um(this.i,this.A),this.L!=2&&(Po(),$e(17)),on(this),this.s=2,Oo(this)):Ll(this,this.S-a)};function Oo(a){a.j.G==0||a.J||lu(a.j,a)}function on(a){Bs(a);var l=a.M;l&&typeof l.ma=="function"&&l.ma(),a.M=null,Sl(a.U),a.g&&(l=a.g,a.g=null,l.abort(),l.ma())}function Ls(a,l){try{var h=a.j;if(h.G!=0&&(h.g==a||xs(h.h,a))){if(!a.K&&xs(h.h,a)&&h.G==3){try{var g=h.Da.g.parse(l)}catch{g=null}if(Array.isArray(g)&&g.length==3){var T=g;if(T[0]==0){e:if(!h.u){if(h.g)if(h.g.F+3e3<a.F)jr(h),zr(h);else break e;Gs(h),$e(18)}}else h.za=T[1],0<h.za-h.T&&37500>T[2]&&h.F&&h.v==0&&!h.C&&(h.C=ko(m(h.Za,h),6e3));if(1>=Fl(h.h)&&h.ca){try{h.ca()}catch{}h.ca=void 0}}else sn(h,11)}else if((a.K||h.g==a)&&jr(h),!G(l))for(T=h.Da.g.parse(l),l=0;l<T.length;l++){let Z=T[l];if(h.T=Z[0],Z=Z[1],h.G==2)if(Z[0]=="c"){h.K=Z[1],h.ia=Z[2];const Me=Z[3];Me!=null&&(h.la=Me,h.j.info("VER="+h.la));const Oe=Z[4];Oe!=null&&(h.Aa=Oe,h.j.info("SVER="+h.Aa));const Vn=Z[5];Vn!=null&&typeof Vn=="number"&&0<Vn&&(g=1.5*Vn,h.L=g,h.j.info("backChannelRequestTimeoutMs_="+g)),g=h;const Xe=a.g;if(Xe){const Wr=Xe.g?Xe.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(Wr){var D=g.h;D.g||Wr.indexOf("spdy")==-1&&Wr.indexOf("quic")==-1&&Wr.indexOf("h2")==-1||(D.j=D.l,D.g=new Set,D.h&&(Us(D,D.h),D.h=null))}if(g.D){const qs=Xe.g?Xe.g.getResponseHeader("X-HTTP-Session-Id"):null;qs&&(g.ya=qs,se(g.I,g.D,qs))}}h.G=3,h.l&&h.l.ua(),h.ba&&(h.R=Date.now()-a.F,h.j.info("Handshake RTT: "+h.R+"ms")),g=h;var V=a;if(g.qa=hu(g,g.J?g.ia:null,g.W),V.K){$l(g.h,V);var ne=V,De=g.L;De&&(ne.I=De),ne.B&&(Bs(ne),Br(ne)),g.g=V}else au(g);0<h.i.length&&qr(h)}else Z[0]!="stop"&&Z[0]!="close"||sn(h,7);else h.G==3&&(Z[0]=="stop"||Z[0]=="close"?Z[0]=="stop"?sn(h,7):$s(h):Z[0]!="noop"&&h.l&&h.l.ta(Z),h.v=0)}}Po(4)}catch{}}var Gm=class{constructor(a,l){this.g=a,this.map=l}};function xl(a){this.l=a||10,c.PerformanceNavigationTiming?(a=c.performance.getEntriesByType("navigation"),a=0<a.length&&(a[0].nextHopProtocol=="hq"||a[0].nextHopProtocol=="h2")):a=!!(c.chrome&&c.chrome.loadTimes&&c.chrome.loadTimes()&&c.chrome.loadTimes().wasFetchedViaSpdy),this.j=a?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}function Ul(a){return a.h?!0:a.g?a.g.size>=a.j:!1}function Fl(a){return a.h?1:a.g?a.g.size:0}function xs(a,l){return a.h?a.h==l:a.g?a.g.has(l):!1}function Us(a,l){a.g?a.g.add(l):a.h=l}function $l(a,l){a.h&&a.h==l?a.h=null:a.g&&a.g.has(l)&&a.g.delete(l)}xl.prototype.cancel=function(){if(this.i=Gl(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const a of this.g.values())a.cancel();this.g.clear()}};function Gl(a){if(a.h!=null)return a.i.concat(a.h.D);if(a.g!=null&&a.g.size!==0){let l=a.i;for(const h of a.g.values())l=l.concat(h.D);return l}return M(a.i)}function zm(a){if(a.V&&typeof a.V=="function")return a.V();if(typeof Map<"u"&&a instanceof Map||typeof Set<"u"&&a instanceof Set)return Array.from(a.values());if(typeof a=="string")return a.split("");if(u(a)){for(var l=[],h=a.length,g=0;g<h;g++)l.push(a[g]);return l}l=[],h=0;for(g in a)l[h++]=a[g];return l}function qm(a){if(a.na&&typeof a.na=="function")return a.na();if(!a.V||typeof a.V!="function"){if(typeof Map<"u"&&a instanceof Map)return Array.from(a.keys());if(!(typeof Set<"u"&&a instanceof Set)){if(u(a)||typeof a=="string"){var l=[];a=a.length;for(var h=0;h<a;h++)l.push(h);return l}l=[],h=0;for(const g in a)l[h++]=g;return l}}}function zl(a,l){if(a.forEach&&typeof a.forEach=="function")a.forEach(l,void 0);else if(u(a)||typeof a=="string")Array.prototype.forEach.call(a,l,void 0);else for(var h=qm(a),g=zm(a),T=g.length,D=0;D<T;D++)l.call(void 0,g[D],h&&h[D],a)}var ql=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function jm(a,l){if(a){a=a.split("&");for(var h=0;h<a.length;h++){var g=a[h].indexOf("="),T=null;if(0<=g){var D=a[h].substring(0,g);T=a[h].substring(g+1)}else D=a[h];l(D,T?decodeURIComponent(T.replace(/\+/g," ")):"")}}}function rn(a){if(this.g=this.o=this.j="",this.s=null,this.m=this.l="",this.h=!1,a instanceof rn){this.h=a.h,Lr(this,a.j),this.o=a.o,this.g=a.g,xr(this,a.s),this.l=a.l;var l=a.i,h=new Lo;h.i=l.i,l.g&&(h.g=new Map(l.g),h.h=l.h),jl(this,h),this.m=a.m}else a&&(l=String(a).match(ql))?(this.h=!1,Lr(this,l[1]||"",!0),this.o=Vo(l[2]||""),this.g=Vo(l[3]||"",!0),xr(this,l[4]),this.l=Vo(l[5]||"",!0),jl(this,l[6]||"",!0),this.m=Vo(l[7]||"")):(this.h=!1,this.i=new Lo(null,this.h))}rn.prototype.toString=function(){var a=[],l=this.j;l&&a.push(Bo(l,Hl,!0),":");var h=this.g;return(h||l=="file")&&(a.push("//"),(l=this.o)&&a.push(Bo(l,Hl,!0),"@"),a.push(encodeURIComponent(String(h)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),h=this.s,h!=null&&a.push(":",String(h))),(h=this.l)&&(this.g&&h.charAt(0)!="/"&&a.push("/"),a.push(Bo(h,h.charAt(0)=="/"?Km:Wm,!0))),(h=this.i.toString())&&a.push("?",h),(h=this.m)&&a.push("#",Bo(h,Ym)),a.join("")};function _t(a){return new rn(a)}function Lr(a,l,h){a.j=h?Vo(l,!0):l,a.j&&(a.j=a.j.replace(/:$/,""))}function xr(a,l){if(l){if(l=Number(l),isNaN(l)||0>l)throw Error("Bad port number "+l);a.s=l}else a.s=null}function jl(a,l,h){l instanceof Lo?(a.i=l,Jm(a.i,a.h)):(h||(l=Bo(l,Qm)),a.i=new Lo(l,a.h))}function se(a,l,h){a.i.set(l,h)}function Ur(a){return se(a,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),a}function Vo(a,l){return a?l?decodeURI(a.replace(/%25/g,"%2525")):decodeURIComponent(a):""}function Bo(a,l,h){return typeof a=="string"?(a=encodeURI(a).replace(l,Hm),h&&(a=a.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),a):null}function Hm(a){return a=a.charCodeAt(0),"%"+(a>>4&15).toString(16)+(a&15).toString(16)}var Hl=/[#\/\?@]/g,Wm=/[#\?:]/g,Km=/[#\?]/g,Qm=/[#\?@]/g,Ym=/#/g;function Lo(a,l){this.h=this.g=null,this.i=a||null,this.j=!!l}function Mt(a){a.g||(a.g=new Map,a.h=0,a.i&&jm(a.i,function(l,h){a.add(decodeURIComponent(l.replace(/\+/g," ")),h)}))}n=Lo.prototype,n.add=function(a,l){Mt(this),this.i=null,a=Mn(this,a);var h=this.g.get(a);return h||this.g.set(a,h=[]),h.push(l),this.h+=1,this};function Wl(a,l){Mt(a),l=Mn(a,l),a.g.has(l)&&(a.i=null,a.h-=a.g.get(l).length,a.g.delete(l))}function Kl(a,l){return Mt(a),l=Mn(a,l),a.g.has(l)}n.forEach=function(a,l){Mt(this),this.g.forEach(function(h,g){h.forEach(function(T){a.call(l,T,g,this)},this)},this)},n.na=function(){Mt(this);const a=Array.from(this.g.values()),l=Array.from(this.g.keys()),h=[];for(let g=0;g<l.length;g++){const T=a[g];for(let D=0;D<T.length;D++)h.push(l[g])}return h},n.V=function(a){Mt(this);let l=[];if(typeof a=="string")Kl(this,a)&&(l=l.concat(this.g.get(Mn(this,a))));else{a=Array.from(this.g.values());for(let h=0;h<a.length;h++)l=l.concat(a[h])}return l},n.set=function(a,l){return Mt(this),this.i=null,a=Mn(this,a),Kl(this,a)&&(this.h-=this.g.get(a).length),this.g.set(a,[l]),this.h+=1,this},n.get=function(a,l){return a?(a=this.V(a),0<a.length?String(a[0]):l):l};function Ql(a,l,h){Wl(a,l),0<h.length&&(a.i=null,a.g.set(Mn(a,l),M(h)),a.h+=h.length)}n.toString=function(){if(this.i)return this.i;if(!this.g)return"";const a=[],l=Array.from(this.g.keys());for(var h=0;h<l.length;h++){var g=l[h];const D=encodeURIComponent(String(g)),V=this.V(g);for(g=0;g<V.length;g++){var T=D;V[g]!==""&&(T+="="+encodeURIComponent(String(V[g]))),a.push(T)}}return this.i=a.join("&")};function Mn(a,l){return l=String(l),a.j&&(l=l.toLowerCase()),l}function Jm(a,l){l&&!a.j&&(Mt(a),a.i=null,a.g.forEach(function(h,g){var T=g.toLowerCase();g!=T&&(Wl(this,g),Ql(this,T,h))},a)),a.j=l}function Xm(a,l){const h=new Mo;if(c.Image){const g=new Image;g.onload=S(Ot,h,"TestLoadImage: loaded",!0,l,g),g.onerror=S(Ot,h,"TestLoadImage: error",!1,l,g),g.onabort=S(Ot,h,"TestLoadImage: abort",!1,l,g),g.ontimeout=S(Ot,h,"TestLoadImage: timeout",!1,l,g),c.setTimeout(function(){g.ontimeout&&g.ontimeout()},1e4),g.src=a}else l(!1)}function Zm(a,l){const h=new Mo,g=new AbortController,T=setTimeout(()=>{g.abort(),Ot(h,"TestPingServer: timeout",!1,l)},1e4);fetch(a,{signal:g.signal}).then(D=>{clearTimeout(T),D.ok?Ot(h,"TestPingServer: ok",!0,l):Ot(h,"TestPingServer: server error",!1,l)}).catch(()=>{clearTimeout(T),Ot(h,"TestPingServer: error",!1,l)})}function Ot(a,l,h,g,T){try{T&&(T.onload=null,T.onerror=null,T.onabort=null,T.ontimeout=null),g(h)}catch{}}function ew(){this.g=new Bm}function tw(a,l,h){const g=h||"";try{zl(a,function(T,D){let V=T;d(T)&&(V=Rs(T)),l.push(g+D+"="+encodeURIComponent(V))})}catch(T){throw l.push(g+"type="+encodeURIComponent("_badmap")),T}}function Fr(a){this.l=a.Ub||null,this.j=a.eb||!1}C(Fr,Ns),Fr.prototype.g=function(){return new $r(this.l,this.j)},Fr.prototype.i=function(a){return function(){return a}}({});function $r(a,l){ke.call(this),this.D=a,this.o=l,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.u=new Headers,this.h=null,this.B="GET",this.A="",this.g=!1,this.v=this.j=this.l=null}C($r,ke),n=$r.prototype,n.open=function(a,l){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.B=a,this.A=l,this.readyState=1,Uo(this)},n.send=function(a){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");this.g=!0;const l={headers:this.u,method:this.B,credentials:this.m,cache:void 0};a&&(l.body=a),(this.D||c).fetch(new Request(this.A,l)).then(this.Sa.bind(this),this.ga.bind(this))},n.abort=function(){this.response=this.responseText="",this.u=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),1<=this.readyState&&this.g&&this.readyState!=4&&(this.g=!1,xo(this)),this.readyState=0},n.Sa=function(a){if(this.g&&(this.l=a,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=a.headers,this.readyState=2,Uo(this)),this.g&&(this.readyState=3,Uo(this),this.g)))if(this.responseType==="arraybuffer")a.arrayBuffer().then(this.Qa.bind(this),this.ga.bind(this));else if(typeof c.ReadableStream<"u"&&"body"in a){if(this.j=a.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.v=new TextDecoder;Yl(this)}else a.text().then(this.Ra.bind(this),this.ga.bind(this))};function Yl(a){a.j.read().then(a.Pa.bind(a)).catch(a.ga.bind(a))}n.Pa=function(a){if(this.g){if(this.o&&a.value)this.response.push(a.value);else if(!this.o){var l=a.value?a.value:new Uint8Array(0);(l=this.v.decode(l,{stream:!a.done}))&&(this.response=this.responseText+=l)}a.done?xo(this):Uo(this),this.readyState==3&&Yl(this)}},n.Ra=function(a){this.g&&(this.response=this.responseText=a,xo(this))},n.Qa=function(a){this.g&&(this.response=a,xo(this))},n.ga=function(){this.g&&xo(this)};function xo(a){a.readyState=4,a.l=null,a.j=null,a.v=null,Uo(a)}n.setRequestHeader=function(a,l){this.u.append(a,l)},n.getResponseHeader=function(a){return this.h&&this.h.get(a.toLowerCase())||""},n.getAllResponseHeaders=function(){if(!this.h)return"";const a=[],l=this.h.entries();for(var h=l.next();!h.done;)h=h.value,a.push(h[0]+": "+h[1]),h=l.next();return a.join(`\r
`)};function Uo(a){a.onreadystatechange&&a.onreadystatechange.call(a)}Object.defineProperty($r.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(a){this.m=a?"include":"same-origin"}});function Jl(a){let l="";return ie(a,function(h,g){l+=g,l+=":",l+=h,l+=`\r
`}),l}function Fs(a,l,h){e:{for(g in h){var g=!1;break e}g=!0}g||(h=Jl(h),typeof a=="string"?h!=null&&encodeURIComponent(String(h)):se(a,l,h))}function de(a){ke.call(this),this.headers=new Map,this.o=a||null,this.h=!1,this.v=this.g=null,this.D="",this.m=0,this.l="",this.j=this.B=this.u=this.A=!1,this.I=null,this.H="",this.J=!1}C(de,ke);var nw=/^https?$/i,ow=["POST","PUT"];n=de.prototype,n.Ha=function(a){this.J=a},n.ea=function(a,l,h,g){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+a);l=l?l.toUpperCase():"GET",this.D=a,this.l="",this.m=0,this.A=!1,this.h=!0,this.g=this.o?this.o.g():Ms.g(),this.v=this.o?Al(this.o):Al(Ms),this.g.onreadystatechange=m(this.Ea,this);try{this.B=!0,this.g.open(l,String(a),!0),this.B=!1}catch(D){Xl(this,D);return}if(a=h||"",h=new Map(this.headers),g)if(Object.getPrototypeOf(g)===Object.prototype)for(var T in g)h.set(T,g[T]);else if(typeof g.keys=="function"&&typeof g.get=="function")for(const D of g.keys())h.set(D,g.get(D));else throw Error("Unknown input type for opt_headers: "+String(g));g=Array.from(h.keys()).find(D=>D.toLowerCase()=="content-type"),T=c.FormData&&a instanceof c.FormData,!(0<=Array.prototype.indexOf.call(ow,l,void 0))||g||T||h.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[D,V]of h)this.g.setRequestHeader(D,V);this.H&&(this.g.responseType=this.H),"withCredentials"in this.g&&this.g.withCredentials!==this.J&&(this.g.withCredentials=this.J);try{tu(this),this.u=!0,this.g.send(a),this.u=!1}catch(D){Xl(this,D)}};function Xl(a,l){a.h=!1,a.g&&(a.j=!0,a.g.abort(),a.j=!1),a.l=l,a.m=5,Zl(a),Gr(a)}function Zl(a){a.A||(a.A=!0,Fe(a,"complete"),Fe(a,"error"))}n.abort=function(a){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.m=a||7,Fe(this,"complete"),Fe(this,"abort"),Gr(this))},n.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),Gr(this,!0)),de.aa.N.call(this)},n.Ea=function(){this.s||(this.B||this.u||this.j?eu(this):this.bb())},n.bb=function(){eu(this)};function eu(a){if(a.h&&typeof s<"u"&&(!a.v[1]||vt(a)!=4||a.Z()!=2)){if(a.u&&vt(a)==4)bl(a.Ea,0,a);else if(Fe(a,"readystatechange"),vt(a)==4){a.h=!1;try{const V=a.Z();e:switch(V){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var l=!0;break e;default:l=!1}var h;if(!(h=l)){var g;if(g=V===0){var T=String(a.D).match(ql)[1]||null;!T&&c.self&&c.self.location&&(T=c.self.location.protocol.slice(0,-1)),g=!nw.test(T?T.toLowerCase():"")}h=g}if(h)Fe(a,"complete"),Fe(a,"success");else{a.m=6;try{var D=2<vt(a)?a.g.statusText:""}catch{D=""}a.l=D+" ["+a.Z()+"]",Zl(a)}}finally{Gr(a)}}}}function Gr(a,l){if(a.g){tu(a);const h=a.g,g=a.v[0]?()=>{}:null;a.g=null,a.v=null,l||Fe(a,"ready");try{h.onreadystatechange=g}catch{}}}function tu(a){a.I&&(c.clearTimeout(a.I),a.I=null)}n.isActive=function(){return!!this.g};function vt(a){return a.g?a.g.readyState:0}n.Z=function(){try{return 2<vt(this)?this.g.status:-1}catch{return-1}},n.oa=function(){try{return this.g?this.g.responseText:""}catch{return""}},n.Oa=function(a){if(this.g){var l=this.g.responseText;return a&&l.indexOf(a)==0&&(l=l.substring(a.length)),Vm(l)}};function nu(a){try{if(!a.g)return null;if("response"in a.g)return a.g.response;switch(a.H){case"":case"text":return a.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in a.g)return a.g.mozResponseArrayBuffer}return null}catch{return null}}function rw(a){const l={};a=(a.g&&2<=vt(a)&&a.g.getAllResponseHeaders()||"").split(`\r
`);for(let g=0;g<a.length;g++){if(G(a[g]))continue;var h=E(a[g]);const T=h[0];if(h=h[1],typeof h!="string")continue;h=h.trim();const D=l[T]||[];l[T]=D,D.push(h)}b(l,function(g){return g.join(", ")})}n.Ba=function(){return this.m},n.Ka=function(){return typeof this.l=="string"?this.l:String(this.l)};function Fo(a,l,h){return h&&h.internalChannelParams&&h.internalChannelParams[a]||l}function ou(a){this.Aa=0,this.i=[],this.j=new Mo,this.ia=this.qa=this.I=this.W=this.g=this.ya=this.D=this.H=this.m=this.S=this.o=null,this.Ya=this.U=0,this.Va=Fo("failFast",!1,a),this.F=this.C=this.u=this.s=this.l=null,this.X=!0,this.za=this.T=-1,this.Y=this.v=this.B=0,this.Ta=Fo("baseRetryDelayMs",5e3,a),this.cb=Fo("retryDelaySeedMs",1e4,a),this.Wa=Fo("forwardChannelMaxRetries",2,a),this.wa=Fo("forwardChannelRequestTimeoutMs",2e4,a),this.pa=a&&a.xmlHttpFactory||void 0,this.Xa=a&&a.Tb||void 0,this.Ca=a&&a.useFetchStreams||!1,this.L=void 0,this.J=a&&a.supportsCrossDomainXhr||!1,this.K="",this.h=new xl(a&&a.concurrentRequestLimit),this.Da=new ew,this.P=a&&a.fastHandshake||!1,this.O=a&&a.encodeInitMessageHeaders||!1,this.P&&this.O&&(this.O=!1),this.Ua=a&&a.Rb||!1,a&&a.xa&&this.j.xa(),a&&a.forceLongPolling&&(this.X=!1),this.ba=!this.P&&this.X&&a&&a.detectBufferingProxy||!1,this.ja=void 0,a&&a.longPollingTimeout&&0<a.longPollingTimeout&&(this.ja=a.longPollingTimeout),this.ca=void 0,this.R=0,this.M=!1,this.ka=this.A=null}n=ou.prototype,n.la=8,n.G=1,n.connect=function(a,l,h,g){$e(0),this.W=a,this.H=l||{},h&&g!==void 0&&(this.H.OSID=h,this.H.OAID=g),this.F=this.X,this.I=hu(this,null,this.W),qr(this)};function $s(a){if(ru(a),a.G==3){var l=a.U++,h=_t(a.I);if(se(h,"SID",a.K),se(h,"RID",l),se(h,"TYPE","terminate"),$o(a,h),l=new kt(a,a.j,l),l.L=2,l.v=Ur(_t(h)),h=!1,c.navigator&&c.navigator.sendBeacon)try{h=c.navigator.sendBeacon(l.v.toString(),"")}catch{}!h&&c.Image&&(new Image().src=l.v,h=!0),h||(l.g=fu(l.j,null),l.g.ea(l.v)),l.F=Date.now(),Br(l)}du(a)}function zr(a){a.g&&(zs(a),a.g.cancel(),a.g=null)}function ru(a){zr(a),a.u&&(c.clearTimeout(a.u),a.u=null),jr(a),a.h.cancel(),a.s&&(typeof a.s=="number"&&c.clearTimeout(a.s),a.s=null)}function qr(a){if(!Ul(a.h)&&!a.s){a.s=!0;var l=a.Ga;Ao||wl(),Do||(Ao(),Do=!0),Es.add(l,a),a.B=0}}function iw(a,l){return Fl(a.h)>=a.h.j-(a.s?1:0)?!1:a.s?(a.i=l.D.concat(a.i),!0):a.G==1||a.G==2||a.B>=(a.Va?0:a.Wa)?!1:(a.s=ko(m(a.Ga,a,l),uu(a,a.B)),a.B++,!0)}n.Ga=function(a){if(this.s)if(this.s=null,this.G==1){if(!a){this.U=Math.floor(1e5*Math.random()),a=this.U++;const T=new kt(this,this.j,a);let D=this.o;if(this.S&&(D?(D=w(D),v(D,this.S)):D=this.S),this.m!==null||this.O||(T.H=D,D=null),this.P)e:{for(var l=0,h=0;h<this.i.length;h++){t:{var g=this.i[h];if("__data__"in g.map&&(g=g.map.__data__,typeof g=="string")){g=g.length;break t}g=void 0}if(g===void 0)break;if(l+=g,4096<l){l=h;break e}if(l===4096||h===this.i.length-1){l=h+1;break e}}l=1e3}else l=1e3;l=su(this,T,l),h=_t(this.I),se(h,"RID",a),se(h,"CVER",22),this.D&&se(h,"X-HTTP-Session-Id",this.D),$o(this,h),D&&(this.O?l="headers="+encodeURIComponent(String(Jl(D)))+"&"+l:this.m&&Fs(h,this.m,D)),Us(this.h,T),this.Ua&&se(h,"TYPE","init"),this.P?(se(h,"$req",l),se(h,"SID","null"),T.T=!0,Vs(T,h,null)):Vs(T,h,l),this.G=2}}else this.G==3&&(a?iu(this,a):this.i.length==0||Ul(this.h)||iu(this))};function iu(a,l){var h;l?h=l.l:h=a.U++;const g=_t(a.I);se(g,"SID",a.K),se(g,"RID",h),se(g,"AID",a.T),$o(a,g),a.m&&a.o&&Fs(g,a.m,a.o),h=new kt(a,a.j,h,a.B+1),a.m===null&&(h.H=a.o),l&&(a.i=l.D.concat(a.i)),l=su(a,h,1e3),h.I=Math.round(.5*a.wa)+Math.round(.5*a.wa*Math.random()),Us(a.h,h),Vs(h,g,l)}function $o(a,l){a.H&&ie(a.H,function(h,g){se(l,g,h)}),a.l&&zl({},function(h,g){se(l,g,h)})}function su(a,l,h){h=Math.min(a.i.length,h);var g=a.l?m(a.l.Na,a.l,a):null;e:{var T=a.i;let D=-1;for(;;){const V=["count="+h];D==-1?0<h?(D=T[0].g,V.push("ofs="+D)):D=0:V.push("ofs="+D);let ne=!0;for(let De=0;De<h;De++){let Z=T[De].g;const Me=T[De].map;if(Z-=D,0>Z)D=Math.max(0,T[De].g-100),ne=!1;else try{tw(Me,V,"req"+Z+"_")}catch{g&&g(Me)}}if(ne){g=V.join("&");break e}}}return a=a.i.splice(0,h),l.D=a,g}function au(a){if(!a.g&&!a.u){a.Y=1;var l=a.Fa;Ao||wl(),Do||(Ao(),Do=!0),Es.add(l,a),a.v=0}}function Gs(a){return a.g||a.u||3<=a.v?!1:(a.Y++,a.u=ko(m(a.Fa,a),uu(a,a.v)),a.v++,!0)}n.Fa=function(){if(this.u=null,cu(this),this.ba&&!(this.M||this.g==null||0>=this.R)){var a=2*this.R;this.j.info("BP detection timer enabled: "+a),this.A=ko(m(this.ab,this),a)}},n.ab=function(){this.A&&(this.A=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.M=!0,$e(10),zr(this),cu(this))};function zs(a){a.A!=null&&(c.clearTimeout(a.A),a.A=null)}function cu(a){a.g=new kt(a,a.j,"rpc",a.Y),a.m===null&&(a.g.H=a.o),a.g.O=0;var l=_t(a.qa);se(l,"RID","rpc"),se(l,"SID",a.K),se(l,"AID",a.T),se(l,"CI",a.F?"0":"1"),!a.F&&a.ja&&se(l,"TO",a.ja),se(l,"TYPE","xmlhttp"),$o(a,l),a.m&&a.o&&Fs(l,a.m,a.o),a.L&&(a.g.I=a.L);var h=a.g;a=a.ia,h.L=1,h.v=Ur(_t(l)),h.m=null,h.P=!0,Vl(h,a)}n.Za=function(){this.C!=null&&(this.C=null,zr(this),Gs(this),$e(19))};function jr(a){a.C!=null&&(c.clearTimeout(a.C),a.C=null)}function lu(a,l){var h=null;if(a.g==l){jr(a),zs(a),a.g=null;var g=2}else if(xs(a.h,l))h=l.D,$l(a.h,l),g=1;else return;if(a.G!=0){if(l.o)if(g==1){h=l.m?l.m.length:0,l=Date.now()-l.F;var T=a.B;g=Mr(),Fe(g,new Pl(g,h)),qr(a)}else au(a);else if(T=l.s,T==3||T==0&&0<l.X||!(g==1&&iw(a,l)||g==2&&Gs(a)))switch(h&&0<h.length&&(l=a.h,l.i=l.i.concat(h)),T){case 1:sn(a,5);break;case 4:sn(a,10);break;case 3:sn(a,6);break;default:sn(a,2)}}}function uu(a,l){let h=a.Ta+Math.floor(Math.random()*a.cb);return a.isActive()||(h*=2),h*l}function sn(a,l){if(a.j.info("Error code "+l),l==2){var h=m(a.fb,a),g=a.Xa;const T=!g;g=new rn(g||"//www.google.com/images/cleardot.gif"),c.location&&c.location.protocol=="http"||Lr(g,"https"),Ur(g),T?Xm(g.toString(),h):Zm(g.toString(),h)}else $e(2);a.G=0,a.l&&a.l.sa(l),du(a),ru(a)}n.fb=function(a){a?(this.j.info("Successfully pinged google.com"),$e(2)):(this.j.info("Failed to ping google.com"),$e(1))};function du(a){if(a.G=0,a.ka=[],a.l){const l=Gl(a.h);(l.length!=0||a.i.length!=0)&&(P(a.ka,l),P(a.ka,a.i),a.h.i.length=0,M(a.i),a.i.length=0),a.l.ra()}}function hu(a,l,h){var g=h instanceof rn?_t(h):new rn(h);if(g.g!="")l&&(g.g=l+"."+g.g),xr(g,g.s);else{var T=c.location;g=T.protocol,l=l?l+"."+T.hostname:T.hostname,T=+T.port;var D=new rn(null);g&&Lr(D,g),l&&(D.g=l),T&&xr(D,T),h&&(D.l=h),g=D}return h=a.D,l=a.ya,h&&l&&se(g,h,l),se(g,"VER",a.la),$o(a,g),g}function fu(a,l,h){if(l&&!a.J)throw Error("Can't create secondary domain capable XhrIo object.");return l=a.Ca&&!a.pa?new de(new Fr({eb:h})):new de(a.pa),l.Ha(a.J),l}n.isActive=function(){return!!this.l&&this.l.isActive(this)};function gu(){}n=gu.prototype,n.ua=function(){},n.ta=function(){},n.sa=function(){},n.ra=function(){},n.isActive=function(){return!0},n.Na=function(){};function Hr(){}Hr.prototype.g=function(a,l){return new He(a,l)};function He(a,l){ke.call(this),this.g=new ou(l),this.l=a,this.h=l&&l.messageUrlParams||null,a=l&&l.messageHeaders||null,l&&l.clientProtocolHeaderRequired&&(a?a["X-Client-Protocol"]="webchannel":a={"X-Client-Protocol":"webchannel"}),this.g.o=a,a=l&&l.initMessageHeaders||null,l&&l.messageContentType&&(a?a["X-WebChannel-Content-Type"]=l.messageContentType:a={"X-WebChannel-Content-Type":l.messageContentType}),l&&l.va&&(a?a["X-WebChannel-Client-Profile"]=l.va:a={"X-WebChannel-Client-Profile":l.va}),this.g.S=a,(a=l&&l.Sb)&&!G(a)&&(this.g.m=a),this.v=l&&l.supportsCrossDomainXhr||!1,this.u=l&&l.sendRawJson||!1,(l=l&&l.httpSessionIdParam)&&!G(l)&&(this.g.D=l,a=this.h,a!==null&&l in a&&(a=this.h,l in a&&delete a[l])),this.j=new On(this)}C(He,ke),He.prototype.m=function(){this.g.l=this.j,this.v&&(this.g.J=!0),this.g.connect(this.l,this.h||void 0)},He.prototype.close=function(){$s(this.g)},He.prototype.o=function(a){var l=this.g;if(typeof a=="string"){var h={};h.__data__=a,a=h}else this.u&&(h={},h.__data__=Rs(a),a=h);l.i.push(new Gm(l.Ya++,a)),l.G==3&&qr(l)},He.prototype.N=function(){this.g.l=null,delete this.j,$s(this.g),delete this.g,He.aa.N.call(this)};function pu(a){Ps.call(this),a.__headers__&&(this.headers=a.__headers__,this.statusCode=a.__status__,delete a.__headers__,delete a.__status__);var l=a.__sm__;if(l){e:{for(const h in l){a=h;break e}a=void 0}(this.i=a)&&(a=this.i,l=l!==null&&a in l?l[a]:void 0),this.data=l}else this.data=a}C(pu,Ps);function mu(){ks.call(this),this.status=1}C(mu,ks);function On(a){this.g=a}C(On,gu),On.prototype.ua=function(){Fe(this.g,"a")},On.prototype.ta=function(a){Fe(this.g,new pu(a))},On.prototype.sa=function(a){Fe(this.g,new mu)},On.prototype.ra=function(){Fe(this.g,"b")},Hr.prototype.createWebChannel=Hr.prototype.g,He.prototype.send=He.prototype.o,He.prototype.open=He.prototype.m,He.prototype.close=He.prototype.close,df=function(){return new Hr},uf=function(){return Mr()},lf=nn,_a={mb:0,pb:1,qb:2,Jb:3,Ob:4,Lb:5,Mb:6,Kb:7,Ib:8,Nb:9,PROXY:10,NOPROXY:11,Gb:12,Cb:13,Db:14,Bb:15,Eb:16,Fb:17,ib:18,hb:19,jb:20},Or.NO_ERROR=0,Or.TIMEOUT=8,Or.HTTP_ERROR=6,ci=Or,kl.COMPLETE="complete",cf=kl,Dl.EventType=No,No.OPEN="a",No.CLOSE="b",No.ERROR="c",No.MESSAGE="d",ke.prototype.listen=ke.prototype.K,Go=Dl,de.prototype.listenOnce=de.prototype.L,de.prototype.getLastError=de.prototype.Ka,de.prototype.getLastErrorCode=de.prototype.Ba,de.prototype.getStatus=de.prototype.Z,de.prototype.getResponseJson=de.prototype.Oa,de.prototype.getResponseText=de.prototype.oa,de.prototype.send=de.prototype.ea,de.prototype.setWithCredentials=de.prototype.Ha,af=de}).apply(typeof Qr<"u"?Qr:typeof self<"u"?self:typeof window<"u"?window:{});const Ku="@firebase/firestore",Qu="4.9.0";/**
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
 */class Be{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}Be.UNAUTHENTICATED=new Be(null),Be.GOOGLE_CREDENTIALS=new Be("google-credentials-uid"),Be.FIRST_PARTY=new Be("first-party-uid"),Be.MOCK_USER=new Be("mock-user");/**
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
 */let go="12.0.0";/**
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
 */const yn=new Fi("@firebase/firestore");function Bn(){return yn.logLevel}function x(n,...e){if(yn.logLevel<=K.DEBUG){const t=e.map(oc);yn.debug(`Firestore (${go}): ${n}`,...t)}}function Ct(n,...e){if(yn.logLevel<=K.ERROR){const t=e.map(oc);yn.error(`Firestore (${go}): ${n}`,...t)}}function _n(n,...e){if(yn.logLevel<=K.WARN){const t=e.map(oc);yn.warn(`Firestore (${go}): ${n}`,...t)}}function oc(n){if(typeof n=="string")return n;try{/**
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
 */function $(n,e,t){let o="Unexpected state";typeof e=="string"?o=e:t=e,hf(n,o,t)}function hf(n,e,t){let o=`FIRESTORE (${go}) INTERNAL ASSERTION FAILED: ${e} (ID: ${n.toString(16)})`;if(t!==void 0)try{o+=" CONTEXT: "+JSON.stringify(t)}catch{o+=" CONTEXT: "+t}throw Ct(o),new Error(o)}function te(n,e,t,o){let r="Unexpected state";typeof t=="string"?r=t:o=t,n||hf(e,r,o)}function H(n,e){return n}/**
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
 */const N={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class L extends at{constructor(e,t){super(e,t),this.code=e,this.message=t,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
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
 */class It{constructor(){this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}}/**
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
 */class ff{constructor(e,t){this.user=t,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class gf{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,t){e.enqueueRetryable(()=>t(Be.UNAUTHENTICATED))}shutdown(){}}class Wv{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,t){this.changeListener=t,e.enqueueRetryable(()=>t(this.token.user))}shutdown(){this.changeListener=null}}class Kv{constructor(e){this.t=e,this.currentUser=Be.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,t){te(this.o===void 0,42304);let o=this.i;const r=u=>this.i!==o?(o=this.i,t(u)):Promise.resolve();let i=new It;this.o=()=>{this.i++,this.currentUser=this.u(),i.resolve(),i=new It,e.enqueueRetryable(()=>r(this.currentUser))};const s=()=>{const u=i;e.enqueueRetryable(async()=>{await u.promise,await r(this.currentUser)})},c=u=>{x("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=u,this.o&&(this.auth.addAuthTokenListener(this.o),s())};this.t.onInit(u=>c(u)),setTimeout(()=>{if(!this.auth){const u=this.t.getImmediate({optional:!0});u?c(u):(x("FirebaseAuthCredentialsProvider","Auth not yet detected"),i.resolve(),i=new It)}},0),s()}getToken(){const e=this.i,t=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(t).then(o=>this.i!==e?(x("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):o?(te(typeof o.accessToken=="string",31837,{l:o}),new ff(o.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const e=this.auth&&this.auth.getUid();return te(e===null||typeof e=="string",2055,{h:e}),new Be(e)}}class Qv{constructor(e,t,o){this.P=e,this.T=t,this.I=o,this.type="FirstParty",this.user=Be.FIRST_PARTY,this.A=new Map}R(){return this.I?this.I():null}get headers(){this.A.set("X-Goog-AuthUser",this.P);const e=this.R();return e&&this.A.set("Authorization",e),this.T&&this.A.set("X-Goog-Iam-Authorization-Token",this.T),this.A}}class Yv{constructor(e,t,o){this.P=e,this.T=t,this.I=o}getToken(){return Promise.resolve(new Qv(this.P,this.T,this.I))}start(e,t){e.enqueueRetryable(()=>t(Be.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class Yu{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class Jv{constructor(e,t){this.V=t,this.forceRefresh=!1,this.appCheck=null,this.m=null,this.p=null,Ze(e)&&e.settings.appCheckToken&&(this.p=e.settings.appCheckToken)}start(e,t){te(this.o===void 0,3512);const o=i=>{i.error!=null&&x("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${i.error.message}`);const s=i.token!==this.m;return this.m=i.token,x("FirebaseAppCheckTokenProvider",`Received ${s?"new":"existing"} token.`),s?t(i.token):Promise.resolve()};this.o=i=>{e.enqueueRetryable(()=>o(i))};const r=i=>{x("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=i,this.o&&this.appCheck.addTokenListener(this.o)};this.V.onInit(i=>r(i)),setTimeout(()=>{if(!this.appCheck){const i=this.V.getImmediate({optional:!0});i?r(i):x("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){if(this.p)return Promise.resolve(new Yu(this.p));const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then(t=>t?(te(typeof t.token=="string",44558,{tokenResult:t}),this.m=t.token,new Yu(t.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}/**
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
 */function Xv(n){const e=typeof self<"u"&&(self.crypto||self.msCrypto),t=new Uint8Array(n);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(t);else for(let o=0;o<n;o++)t[o]=Math.floor(256*Math.random());return t}/**
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
 */class qi{static newId(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",t=62*Math.floor(4.129032258064516);let o="";for(;o.length<20;){const r=Xv(40);for(let i=0;i<r.length;++i)o.length<20&&r[i]<t&&(o+=e.charAt(r[i]%62))}return o}}function Q(n,e){return n<e?-1:n>e?1:0}function va(n,e){const t=Math.min(n.length,e.length);for(let o=0;o<t;o++){const r=n.charAt(o),i=e.charAt(o);if(r!==i)return Xs(r)===Xs(i)?Q(r,i):Xs(r)?1:-1}return Q(n.length,e.length)}const Zv=55296,eE=57343;function Xs(n){const e=n.charCodeAt(0);return e>=Zv&&e<=eE}function Qn(n,e,t){return n.length===e.length&&n.every((o,r)=>t(o,e[r]))}/**
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
 */const Ju="__name__";class lt{constructor(e,t,o){t===void 0?t=0:t>e.length&&$(637,{offset:t,range:e.length}),o===void 0?o=e.length-t:o>e.length-t&&$(1746,{length:o,range:e.length-t}),this.segments=e,this.offset=t,this.len=o}get length(){return this.len}isEqual(e){return lt.comparator(this,e)===0}child(e){const t=this.segments.slice(this.offset,this.limit());return e instanceof lt?e.forEach(o=>{t.push(o)}):t.push(e),this.construct(t)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}forEach(e){for(let t=this.offset,o=this.limit();t<o;t++)e(this.segments[t])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,t){const o=Math.min(e.length,t.length);for(let r=0;r<o;r++){const i=lt.compareSegments(e.get(r),t.get(r));if(i!==0)return i}return Q(e.length,t.length)}static compareSegments(e,t){const o=lt.isNumericId(e),r=lt.isNumericId(t);return o&&!r?-1:!o&&r?1:o&&r?lt.extractNumericId(e).compare(lt.extractNumericId(t)):va(e,t)}static isNumericId(e){return e.startsWith("__id")&&e.endsWith("__")}static extractNumericId(e){return zt.fromString(e.substring(4,e.length-2))}}class re extends lt{construct(e,t,o){return new re(e,t,o)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){const t=[];for(const o of e){if(o.indexOf("//")>=0)throw new L(N.INVALID_ARGUMENT,`Invalid segment (${o}). Paths must not contain // in them.`);t.push(...o.split("/").filter(r=>r.length>0))}return new re(t)}static emptyPath(){return new re([])}}const tE=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class Ie extends lt{construct(e,t,o){return new Ie(e,t,o)}static isValidIdentifier(e){return tE.test(e)}canonicalString(){return this.toArray().map(e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),Ie.isValidIdentifier(e)||(e="`"+e+"`"),e)).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)===Ju}static keyField(){return new Ie([Ju])}static fromServerFormat(e){const t=[];let o="",r=0;const i=()=>{if(o.length===0)throw new L(N.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);t.push(o),o=""};let s=!1;for(;r<e.length;){const c=e[r];if(c==="\\"){if(r+1===e.length)throw new L(N.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const u=e[r+1];if(u!=="\\"&&u!=="."&&u!=="`")throw new L(N.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);o+=u,r+=2}else c==="`"?(s=!s,r++):c!=="."||s?(o+=c,r++):(i(),r++)}if(i(),s)throw new L(N.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new Ie(t)}static emptyPath(){return new Ie([])}}/**
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
 */class F{constructor(e){this.path=e}static fromPath(e){return new F(re.fromString(e))}static fromName(e){return new F(re.fromString(e).popFirst(5))}static empty(){return new F(re.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&re.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,t){return re.comparator(e.path,t.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new F(new re(e.slice()))}}/**
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
 */function pf(n,e,t){if(!t)throw new L(N.INVALID_ARGUMENT,`Function ${n}() cannot be called with an empty ${e}.`)}function mf(n,e,t,o){if(e===!0&&o===!0)throw new L(N.INVALID_ARGUMENT,`${n} and ${t} cannot be used together.`)}function Xu(n){if(!F.isDocumentKey(n))throw new L(N.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${n} has ${n.length}.`)}function Zu(n){if(F.isDocumentKey(n))throw new L(N.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${n} has ${n.length}.`)}function wf(n){return typeof n=="object"&&n!==null&&(Object.getPrototypeOf(n)===Object.prototype||Object.getPrototypeOf(n)===null)}function ji(n){if(n===void 0)return"undefined";if(n===null)return"null";if(typeof n=="string")return n.length>20&&(n=`${n.substring(0,20)}...`),JSON.stringify(n);if(typeof n=="number"||typeof n=="boolean")return""+n;if(typeof n=="object"){if(n instanceof Array)return"an array";{const e=function(o){return o.constructor?o.constructor.name:null}(n);return e?`a custom ${e} object`:"an object"}}return typeof n=="function"?"a function":$(12329,{type:typeof n})}function xe(n,e){if("_delegate"in n&&(n=n._delegate),!(n instanceof e)){if(e.name===n.constructor.name)throw new L(N.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const t=ji(n);throw new L(N.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${t}`)}}return n}/**
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
 */function _e(n,e){const t={typeString:n};return e&&(t.value=e),t}function pr(n,e){if(!wf(n))throw new L(N.INVALID_ARGUMENT,"JSON must be an object");let t;for(const o in e)if(e[o]){const r=e[o].typeString,i="value"in e[o]?{value:e[o].value}:void 0;if(!(o in n)){t=`JSON missing required field: '${o}'`;break}const s=n[o];if(r&&typeof s!==r){t=`JSON field '${o}' must be a ${r}.`;break}if(i!==void 0&&s!==i.value){t=`Expected '${o}' field to equal '${i.value}'`;break}}if(t)throw new L(N.INVALID_ARGUMENT,t);return!0}/**
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
 */const ed=-62135596800,td=1e6;class oe{static now(){return oe.fromMillis(Date.now())}static fromDate(e){return oe.fromMillis(e.getTime())}static fromMillis(e){const t=Math.floor(e/1e3),o=Math.floor((e-1e3*t)*td);return new oe(t,o)}constructor(e,t){if(this.seconds=e,this.nanoseconds=t,t<0)throw new L(N.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(t>=1e9)throw new L(N.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(e<ed)throw new L(N.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new L(N.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/td}_compareTo(e){return this.seconds===e.seconds?Q(this.nanoseconds,e.nanoseconds):Q(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{type:oe._jsonSchemaVersion,seconds:this.seconds,nanoseconds:this.nanoseconds}}static fromJSON(e){if(pr(e,oe._jsonSchema))return new oe(e.seconds,e.nanoseconds)}valueOf(){const e=this.seconds-ed;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}oe._jsonSchemaVersion="firestore/timestamp/1.0",oe._jsonSchema={type:_e("string",oe._jsonSchemaVersion),seconds:_e("number"),nanoseconds:_e("number")};/**
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
 */class q{static fromTimestamp(e){return new q(e)}static min(){return new q(new oe(0,0))}static max(){return new q(new oe(253402300799,999999999))}constructor(e){this.timestamp=e}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
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
 */const ir=-1;function nE(n,e){const t=n.toTimestamp().seconds,o=n.toTimestamp().nanoseconds+1,r=q.fromTimestamp(o===1e9?new oe(t+1,0):new oe(t,o));return new Ht(r,F.empty(),e)}function oE(n){return new Ht(n.readTime,n.key,ir)}class Ht{constructor(e,t,o){this.readTime=e,this.documentKey=t,this.largestBatchId=o}static min(){return new Ht(q.min(),F.empty(),ir)}static max(){return new Ht(q.max(),F.empty(),ir)}}function rE(n,e){let t=n.readTime.compareTo(e.readTime);return t!==0?t:(t=F.comparator(n.documentKey,e.documentKey),t!==0?t:Q(n.largestBatchId,e.largestBatchId))}/**
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
 */const iE="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class sE{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(e=>e())}}/**
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
 */async function po(n){if(n.code!==N.FAILED_PRECONDITION||n.message!==iE)throw n;x("LocalStore","Unexpectedly lost primary lease")}/**
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
 */class k{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e(t=>{this.isDone=!0,this.result=t,this.nextCallback&&this.nextCallback(t)},t=>{this.isDone=!0,this.error=t,this.catchCallback&&this.catchCallback(t)})}catch(e){return this.next(void 0,e)}next(e,t){return this.callbackAttached&&$(59440),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(t,this.error):this.wrapSuccess(e,this.result):new k((o,r)=>{this.nextCallback=i=>{this.wrapSuccess(e,i).next(o,r)},this.catchCallback=i=>{this.wrapFailure(t,i).next(o,r)}})}toPromise(){return new Promise((e,t)=>{this.next(e,t)})}wrapUserFunction(e){try{const t=e();return t instanceof k?t:k.resolve(t)}catch(t){return k.reject(t)}}wrapSuccess(e,t){return e?this.wrapUserFunction(()=>e(t)):k.resolve(t)}wrapFailure(e,t){return e?this.wrapUserFunction(()=>e(t)):k.reject(t)}static resolve(e){return new k((t,o)=>{t(e)})}static reject(e){return new k((t,o)=>{o(e)})}static waitFor(e){return new k((t,o)=>{let r=0,i=0,s=!1;e.forEach(c=>{++r,c.next(()=>{++i,s&&i===r&&t()},u=>o(u))}),s=!0,i===r&&t()})}static or(e){let t=k.resolve(!1);for(const o of e)t=t.next(r=>r?k.resolve(r):o());return t}static forEach(e,t){const o=[];return e.forEach((r,i)=>{o.push(t.call(this,r,i))}),this.waitFor(o)}static mapArray(e,t){return new k((o,r)=>{const i=e.length,s=new Array(i);let c=0;for(let u=0;u<i;u++){const d=u;t(e[d]).next(f=>{s[d]=f,++c,c===i&&o(s)},f=>r(f))}})}static doWhile(e,t){return new k((o,r)=>{const i=()=>{e()===!0?t().next(()=>{i()},r):o()};i()})}}function aE(n){const e=n.match(/Android ([\d.]+)/i),t=e?e[1].split(".").slice(0,2).join("."):"-1";return Number(t)}function mo(n){return n.name==="IndexedDbTransactionError"}/**
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
 */class Hi{constructor(e,t){this.previousValue=e,t&&(t.sequenceNumberHandler=o=>this.ae(o),this.ue=o=>t.writeSequenceNumber(o))}ae(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){const e=++this.previousValue;return this.ue&&this.ue(e),e}}Hi.ce=-1;/**
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
 */const rc=-1;function Wi(n){return n==null}function bi(n){return n===0&&1/n==-1/0}function cE(n){return typeof n=="number"&&Number.isInteger(n)&&!bi(n)&&n<=Number.MAX_SAFE_INTEGER&&n>=Number.MIN_SAFE_INTEGER}/**
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
 */const yf="";function lE(n){let e="";for(let t=0;t<n.length;t++)e.length>0&&(e=nd(e)),e=uE(n.get(t),e);return nd(e)}function uE(n,e){let t=e;const o=n.length;for(let r=0;r<o;r++){const i=n.charAt(r);switch(i){case"\0":t+="";break;case yf:t+="";break;default:t+=i}}return t}function nd(n){return n+yf+""}/**
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
 */function od(n){let e=0;for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e++;return e}function Xt(n,e){for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e(t,n[t])}function _f(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}/**
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
 */class le{constructor(e,t){this.comparator=e,this.root=t||Ce.EMPTY}insert(e,t){return new le(this.comparator,this.root.insert(e,t,this.comparator).copy(null,null,Ce.BLACK,null,null))}remove(e){return new le(this.comparator,this.root.remove(e,this.comparator).copy(null,null,Ce.BLACK,null,null))}get(e){let t=this.root;for(;!t.isEmpty();){const o=this.comparator(e,t.key);if(o===0)return t.value;o<0?t=t.left:o>0&&(t=t.right)}return null}indexOf(e){let t=0,o=this.root;for(;!o.isEmpty();){const r=this.comparator(e,o.key);if(r===0)return t+o.left.size;r<0?o=o.left:(t+=o.left.size+1,o=o.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal((t,o)=>(e(t,o),!1))}toString(){const e=[];return this.inorderTraversal((t,o)=>(e.push(`${t}:${o}`),!1)),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new Yr(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new Yr(this.root,e,this.comparator,!1)}getReverseIterator(){return new Yr(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new Yr(this.root,e,this.comparator,!0)}}class Yr{constructor(e,t,o,r){this.isReverse=r,this.nodeStack=[];let i=1;for(;!e.isEmpty();)if(i=t?o(e.key,t):1,t&&r&&(i*=-1),i<0)e=this.isReverse?e.left:e.right;else{if(i===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop();const t={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return t}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class Ce{constructor(e,t,o,r,i){this.key=e,this.value=t,this.color=o??Ce.RED,this.left=r??Ce.EMPTY,this.right=i??Ce.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,t,o,r,i){return new Ce(e??this.key,t??this.value,o??this.color,r??this.left,i??this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,o){let r=this;const i=o(e,r.key);return r=i<0?r.copy(null,null,null,r.left.insert(e,t,o),null):i===0?r.copy(null,t,null,null,null):r.copy(null,null,null,null,r.right.insert(e,t,o)),r.fixUp()}removeMin(){if(this.left.isEmpty())return Ce.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,t){let o,r=this;if(t(e,r.key)<0)r.left.isEmpty()||r.left.isRed()||r.left.left.isRed()||(r=r.moveRedLeft()),r=r.copy(null,null,null,r.left.remove(e,t),null);else{if(r.left.isRed()&&(r=r.rotateRight()),r.right.isEmpty()||r.right.isRed()||r.right.left.isRed()||(r=r.moveRedRight()),t(e,r.key)===0){if(r.right.isEmpty())return Ce.EMPTY;o=r.right.min(),r=r.copy(o.key,o.value,null,null,r.right.removeMin())}r=r.copy(null,null,null,null,r.right.remove(e,t))}return r.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,Ce.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,Ce.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed())throw $(43730,{key:this.key,value:this.value});if(this.right.isRed())throw $(14113,{key:this.key,value:this.value});const e=this.left.check();if(e!==this.right.check())throw $(27949);return e+(this.isRed()?0:1)}}Ce.EMPTY=null,Ce.RED=!0,Ce.BLACK=!1;Ce.EMPTY=new class{constructor(){this.size=0}get key(){throw $(57766)}get value(){throw $(16141)}get color(){throw $(16727)}get left(){throw $(29726)}get right(){throw $(36894)}copy(e,t,o,r,i){return this}insert(e,t,o){return new Ce(e,t)}remove(e,t){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
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
 */class Ee{constructor(e){this.comparator=e,this.data=new le(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal((t,o)=>(e(t),!1))}forEachInRange(e,t){const o=this.data.getIteratorFrom(e[0]);for(;o.hasNext();){const r=o.getNext();if(this.comparator(r.key,e[1])>=0)return;t(r.key)}}forEachWhile(e,t){let o;for(o=t!==void 0?this.data.getIteratorFrom(t):this.data.getIterator();o.hasNext();)if(!e(o.getNext().key))return}firstAfterOrEqual(e){const t=this.data.getIteratorFrom(e);return t.hasNext()?t.getNext().key:null}getIterator(){return new rd(this.data.getIterator())}getIteratorFrom(e){return new rd(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let t=this;return t.size<e.size&&(t=e,e=this),e.forEach(o=>{t=t.add(o)}),t}isEqual(e){if(!(e instanceof Ee)||this.size!==e.size)return!1;const t=this.data.getIterator(),o=e.data.getIterator();for(;t.hasNext();){const r=t.getNext().key,i=o.getNext().key;if(this.comparator(r,i)!==0)return!1}return!0}toArray(){const e=[];return this.forEach(t=>{e.push(t)}),e}toString(){const e=[];return this.forEach(t=>e.push(t)),"SortedSet("+e.toString()+")"}copy(e){const t=new Ee(this.comparator);return t.data=e,t}}class rd{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}/**
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
 */class Ke{constructor(e){this.fields=e,e.sort(Ie.comparator)}static empty(){return new Ke([])}unionWith(e){let t=new Ee(Ie.comparator);for(const o of this.fields)t=t.add(o);for(const o of e)t=t.add(o);return new Ke(t.toArray())}covers(e){for(const t of this.fields)if(t.isPrefixOf(e))return!0;return!1}isEqual(e){return Qn(this.fields,e.fields,(t,o)=>t.isEqual(o))}}/**
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
 */class vf extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
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
 */class Se{constructor(e){this.binaryString=e}static fromBase64String(e){const t=function(r){try{return atob(r)}catch(i){throw typeof DOMException<"u"&&i instanceof DOMException?new vf("Invalid base64 string: "+i):i}}(e);return new Se(t)}static fromUint8Array(e){const t=function(r){let i="";for(let s=0;s<r.length;++s)i+=String.fromCharCode(r[s]);return i}(e);return new Se(t)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return function(t){return btoa(t)}(this.binaryString)}toUint8Array(){return function(t){const o=new Uint8Array(t.length);for(let r=0;r<t.length;r++)o[r]=t.charCodeAt(r);return o}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return Q(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}Se.EMPTY_BYTE_STRING=new Se("");const dE=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function Wt(n){if(te(!!n,39018),typeof n=="string"){let e=0;const t=dE.exec(n);if(te(!!t,46558,{timestamp:n}),t[1]){let r=t[1];r=(r+"000000000").substr(0,9),e=Number(r)}const o=new Date(n);return{seconds:Math.floor(o.getTime()/1e3),nanos:e}}return{seconds:pe(n.seconds),nanos:pe(n.nanos)}}function pe(n){return typeof n=="number"?n:typeof n=="string"?Number(n):0}function Kt(n){return typeof n=="string"?Se.fromBase64String(n):Se.fromUint8Array(n)}/**
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
 */const Ef="server_timestamp",bf="__type__",Tf="__previous_value__",If="__local_write_time__";function ic(n){return(n?.mapValue?.fields||{})[bf]?.stringValue===Ef}function Ki(n){const e=n.mapValue.fields[Tf];return ic(e)?Ki(e):e}function sr(n){const e=Wt(n.mapValue.fields[If].timestampValue);return new oe(e.seconds,e.nanos)}/**
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
 */class hE{constructor(e,t,o,r,i,s,c,u,d,f){this.databaseId=e,this.appId=t,this.persistenceKey=o,this.host=r,this.ssl=i,this.forceLongPolling=s,this.autoDetectLongPolling=c,this.longPollingOptions=u,this.useFetchStreams=d,this.isUsingEmulator=f}}const Ti="(default)";class Yn{constructor(e,t){this.projectId=e,this.database=t||Ti}static empty(){return new Yn("","")}get isDefaultDatabase(){return this.database===Ti}isEqual(e){return e instanceof Yn&&e.projectId===this.projectId&&e.database===this.database}}/**
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
 */const Sf="__type__",fE="__max__",Jr={mapValue:{}},Af="__vector__",Ii="value";function Qt(n){return"nullValue"in n?0:"booleanValue"in n?1:"integerValue"in n||"doubleValue"in n?2:"timestampValue"in n?3:"stringValue"in n?5:"bytesValue"in n?6:"referenceValue"in n?7:"geoPointValue"in n?8:"arrayValue"in n?9:"mapValue"in n?ic(n)?4:pE(n)?9007199254740991:gE(n)?10:11:$(28295,{value:n})}function mt(n,e){if(n===e)return!0;const t=Qt(n);if(t!==Qt(e))return!1;switch(t){case 0:case 9007199254740991:return!0;case 1:return n.booleanValue===e.booleanValue;case 4:return sr(n).isEqual(sr(e));case 3:return function(r,i){if(typeof r.timestampValue=="string"&&typeof i.timestampValue=="string"&&r.timestampValue.length===i.timestampValue.length)return r.timestampValue===i.timestampValue;const s=Wt(r.timestampValue),c=Wt(i.timestampValue);return s.seconds===c.seconds&&s.nanos===c.nanos}(n,e);case 5:return n.stringValue===e.stringValue;case 6:return function(r,i){return Kt(r.bytesValue).isEqual(Kt(i.bytesValue))}(n,e);case 7:return n.referenceValue===e.referenceValue;case 8:return function(r,i){return pe(r.geoPointValue.latitude)===pe(i.geoPointValue.latitude)&&pe(r.geoPointValue.longitude)===pe(i.geoPointValue.longitude)}(n,e);case 2:return function(r,i){if("integerValue"in r&&"integerValue"in i)return pe(r.integerValue)===pe(i.integerValue);if("doubleValue"in r&&"doubleValue"in i){const s=pe(r.doubleValue),c=pe(i.doubleValue);return s===c?bi(s)===bi(c):isNaN(s)&&isNaN(c)}return!1}(n,e);case 9:return Qn(n.arrayValue.values||[],e.arrayValue.values||[],mt);case 10:case 11:return function(r,i){const s=r.mapValue.fields||{},c=i.mapValue.fields||{};if(od(s)!==od(c))return!1;for(const u in s)if(s.hasOwnProperty(u)&&(c[u]===void 0||!mt(s[u],c[u])))return!1;return!0}(n,e);default:return $(52216,{left:n})}}function ar(n,e){return(n.values||[]).find(t=>mt(t,e))!==void 0}function Jn(n,e){if(n===e)return 0;const t=Qt(n),o=Qt(e);if(t!==o)return Q(t,o);switch(t){case 0:case 9007199254740991:return 0;case 1:return Q(n.booleanValue,e.booleanValue);case 2:return function(i,s){const c=pe(i.integerValue||i.doubleValue),u=pe(s.integerValue||s.doubleValue);return c<u?-1:c>u?1:c===u?0:isNaN(c)?isNaN(u)?0:-1:1}(n,e);case 3:return id(n.timestampValue,e.timestampValue);case 4:return id(sr(n),sr(e));case 5:return va(n.stringValue,e.stringValue);case 6:return function(i,s){const c=Kt(i),u=Kt(s);return c.compareTo(u)}(n.bytesValue,e.bytesValue);case 7:return function(i,s){const c=i.split("/"),u=s.split("/");for(let d=0;d<c.length&&d<u.length;d++){const f=Q(c[d],u[d]);if(f!==0)return f}return Q(c.length,u.length)}(n.referenceValue,e.referenceValue);case 8:return function(i,s){const c=Q(pe(i.latitude),pe(s.latitude));return c!==0?c:Q(pe(i.longitude),pe(s.longitude))}(n.geoPointValue,e.geoPointValue);case 9:return sd(n.arrayValue,e.arrayValue);case 10:return function(i,s){const c=i.fields||{},u=s.fields||{},d=c[Ii]?.arrayValue,f=u[Ii]?.arrayValue,p=Q(d?.values?.length||0,f?.values?.length||0);return p!==0?p:sd(d,f)}(n.mapValue,e.mapValue);case 11:return function(i,s){if(i===Jr.mapValue&&s===Jr.mapValue)return 0;if(i===Jr.mapValue)return 1;if(s===Jr.mapValue)return-1;const c=i.fields||{},u=Object.keys(c),d=s.fields||{},f=Object.keys(d);u.sort(),f.sort();for(let p=0;p<u.length&&p<f.length;++p){const m=va(u[p],f[p]);if(m!==0)return m;const S=Jn(c[u[p]],d[f[p]]);if(S!==0)return S}return Q(u.length,f.length)}(n.mapValue,e.mapValue);default:throw $(23264,{he:t})}}function id(n,e){if(typeof n=="string"&&typeof e=="string"&&n.length===e.length)return Q(n,e);const t=Wt(n),o=Wt(e),r=Q(t.seconds,o.seconds);return r!==0?r:Q(t.nanos,o.nanos)}function sd(n,e){const t=n.values||[],o=e.values||[];for(let r=0;r<t.length&&r<o.length;++r){const i=Jn(t[r],o[r]);if(i)return i}return Q(t.length,o.length)}function Xn(n){return Ea(n)}function Ea(n){return"nullValue"in n?"null":"booleanValue"in n?""+n.booleanValue:"integerValue"in n?""+n.integerValue:"doubleValue"in n?""+n.doubleValue:"timestampValue"in n?function(t){const o=Wt(t);return`time(${o.seconds},${o.nanos})`}(n.timestampValue):"stringValue"in n?n.stringValue:"bytesValue"in n?function(t){return Kt(t).toBase64()}(n.bytesValue):"referenceValue"in n?function(t){return F.fromName(t).toString()}(n.referenceValue):"geoPointValue"in n?function(t){return`geo(${t.latitude},${t.longitude})`}(n.geoPointValue):"arrayValue"in n?function(t){let o="[",r=!0;for(const i of t.values||[])r?r=!1:o+=",",o+=Ea(i);return o+"]"}(n.arrayValue):"mapValue"in n?function(t){const o=Object.keys(t.fields||{}).sort();let r="{",i=!0;for(const s of o)i?i=!1:r+=",",r+=`${s}:${Ea(t.fields[s])}`;return r+"}"}(n.mapValue):$(61005,{value:n})}function li(n){switch(Qt(n)){case 0:case 1:return 4;case 2:return 8;case 3:case 8:return 16;case 4:const e=Ki(n);return e?16+li(e):16;case 5:return 2*n.stringValue.length;case 6:return Kt(n.bytesValue).approximateByteSize();case 7:return n.referenceValue.length;case 9:return function(o){return(o.values||[]).reduce((r,i)=>r+li(i),0)}(n.arrayValue);case 10:case 11:return function(o){let r=0;return Xt(o.fields,(i,s)=>{r+=i.length+li(s)}),r}(n.mapValue);default:throw $(13486,{value:n})}}function ad(n,e){return{referenceValue:`projects/${n.projectId}/databases/${n.database}/documents/${e.path.canonicalString()}`}}function ba(n){return!!n&&"integerValue"in n}function sc(n){return!!n&&"arrayValue"in n}function cd(n){return!!n&&"nullValue"in n}function ld(n){return!!n&&"doubleValue"in n&&isNaN(Number(n.doubleValue))}function ui(n){return!!n&&"mapValue"in n}function gE(n){return(n?.mapValue?.fields||{})[Sf]?.stringValue===Af}function Qo(n){if(n.geoPointValue)return{geoPointValue:{...n.geoPointValue}};if(n.timestampValue&&typeof n.timestampValue=="object")return{timestampValue:{...n.timestampValue}};if(n.mapValue){const e={mapValue:{fields:{}}};return Xt(n.mapValue.fields,(t,o)=>e.mapValue.fields[t]=Qo(o)),e}if(n.arrayValue){const e={arrayValue:{values:[]}};for(let t=0;t<(n.arrayValue.values||[]).length;++t)e.arrayValue.values[t]=Qo(n.arrayValue.values[t]);return e}return{...n}}function pE(n){return(((n.mapValue||{}).fields||{}).__type__||{}).stringValue===fE}/**
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
 */class qe{constructor(e){this.value=e}static empty(){return new qe({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let t=this.value;for(let o=0;o<e.length-1;++o)if(t=(t.mapValue.fields||{})[e.get(o)],!ui(t))return null;return t=(t.mapValue.fields||{})[e.lastSegment()],t||null}}set(e,t){this.getFieldsMap(e.popLast())[e.lastSegment()]=Qo(t)}setAll(e){let t=Ie.emptyPath(),o={},r=[];e.forEach((s,c)=>{if(!t.isImmediateParentOf(c)){const u=this.getFieldsMap(t);this.applyChanges(u,o,r),o={},r=[],t=c.popLast()}s?o[c.lastSegment()]=Qo(s):r.push(c.lastSegment())});const i=this.getFieldsMap(t);this.applyChanges(i,o,r)}delete(e){const t=this.field(e.popLast());ui(t)&&t.mapValue.fields&&delete t.mapValue.fields[e.lastSegment()]}isEqual(e){return mt(this.value,e.value)}getFieldsMap(e){let t=this.value;t.mapValue.fields||(t.mapValue={fields:{}});for(let o=0;o<e.length;++o){let r=t.mapValue.fields[e.get(o)];ui(r)&&r.mapValue.fields||(r={mapValue:{fields:{}}},t.mapValue.fields[e.get(o)]=r),t=r}return t.mapValue.fields}applyChanges(e,t,o){Xt(t,(r,i)=>e[r]=i);for(const r of o)delete e[r]}clone(){return new qe(Qo(this.value))}}function Df(n){const e=[];return Xt(n.fields,(t,o)=>{const r=new Ie([t]);if(ui(o)){const i=Df(o.mapValue).fields;if(i.length===0)e.push(r);else for(const s of i)e.push(r.child(s))}else e.push(r)}),new Ke(e)}/**
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
 */class Le{constructor(e,t,o,r,i,s,c){this.key=e,this.documentType=t,this.version=o,this.readTime=r,this.createTime=i,this.data=s,this.documentState=c}static newInvalidDocument(e){return new Le(e,0,q.min(),q.min(),q.min(),qe.empty(),0)}static newFoundDocument(e,t,o,r){return new Le(e,1,t,q.min(),o,r,0)}static newNoDocument(e,t){return new Le(e,2,t,q.min(),q.min(),qe.empty(),0)}static newUnknownDocument(e,t){return new Le(e,3,t,q.min(),q.min(),qe.empty(),2)}convertToFoundDocument(e,t){return!this.createTime.isEqual(q.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=e),this.version=e,this.documentType=1,this.data=t,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=qe.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=qe.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=q.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof Le&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new Le(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
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
 */class Si{constructor(e,t){this.position=e,this.inclusive=t}}function ud(n,e,t){let o=0;for(let r=0;r<n.position.length;r++){const i=e[r],s=n.position[r];if(i.field.isKeyField()?o=F.comparator(F.fromName(s.referenceValue),t.key):o=Jn(s,t.data.field(i.field)),i.dir==="desc"&&(o*=-1),o!==0)break}return o}function dd(n,e){if(n===null)return e===null;if(e===null||n.inclusive!==e.inclusive||n.position.length!==e.position.length)return!1;for(let t=0;t<n.position.length;t++)if(!mt(n.position[t],e.position[t]))return!1;return!0}/**
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
 */class cr{constructor(e,t="asc"){this.field=e,this.dir=t}}function mE(n,e){return n.dir===e.dir&&n.field.isEqual(e.field)}/**
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
 */class Cf{}class ye extends Cf{constructor(e,t,o){super(),this.field=e,this.op=t,this.value=o}static create(e,t,o){return e.isKeyField()?t==="in"||t==="not-in"?this.createKeyFieldInFilter(e,t,o):new yE(e,t,o):t==="array-contains"?new EE(e,o):t==="in"?new bE(e,o):t==="not-in"?new TE(e,o):t==="array-contains-any"?new IE(e,o):new ye(e,t,o)}static createKeyFieldInFilter(e,t,o){return t==="in"?new _E(e,o):new vE(e,o)}matches(e){const t=e.data.field(this.field);return this.op==="!="?t!==null&&t.nullValue===void 0&&this.matchesComparison(Jn(t,this.value)):t!==null&&Qt(this.value)===Qt(t)&&this.matchesComparison(Jn(t,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return $(47266,{operator:this.op})}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class it extends Cf{constructor(e,t){super(),this.filters=e,this.op=t,this.Pe=null}static create(e,t){return new it(e,t)}matches(e){return Rf(this)?this.filters.find(t=>!t.matches(e))===void 0:this.filters.find(t=>t.matches(e))!==void 0}getFlattenedFilters(){return this.Pe!==null||(this.Pe=this.filters.reduce((e,t)=>e.concat(t.getFlattenedFilters()),[])),this.Pe}getFilters(){return Object.assign([],this.filters)}}function Rf(n){return n.op==="and"}function Nf(n){return wE(n)&&Rf(n)}function wE(n){for(const e of n.filters)if(e instanceof it)return!1;return!0}function Ta(n){if(n instanceof ye)return n.field.canonicalString()+n.op.toString()+Xn(n.value);if(Nf(n))return n.filters.map(e=>Ta(e)).join(",");{const e=n.filters.map(t=>Ta(t)).join(",");return`${n.op}(${e})`}}function Pf(n,e){return n instanceof ye?function(o,r){return r instanceof ye&&o.op===r.op&&o.field.isEqual(r.field)&&mt(o.value,r.value)}(n,e):n instanceof it?function(o,r){return r instanceof it&&o.op===r.op&&o.filters.length===r.filters.length?o.filters.reduce((i,s,c)=>i&&Pf(s,r.filters[c]),!0):!1}(n,e):void $(19439)}function kf(n){return n instanceof ye?function(t){return`${t.field.canonicalString()} ${t.op} ${Xn(t.value)}`}(n):n instanceof it?function(t){return t.op.toString()+" {"+t.getFilters().map(kf).join(" ,")+"}"}(n):"Filter"}class yE extends ye{constructor(e,t,o){super(e,t,o),this.key=F.fromName(o.referenceValue)}matches(e){const t=F.comparator(e.key,this.key);return this.matchesComparison(t)}}class _E extends ye{constructor(e,t){super(e,"in",t),this.keys=Mf("in",t)}matches(e){return this.keys.some(t=>t.isEqual(e.key))}}class vE extends ye{constructor(e,t){super(e,"not-in",t),this.keys=Mf("not-in",t)}matches(e){return!this.keys.some(t=>t.isEqual(e.key))}}function Mf(n,e){return(e.arrayValue?.values||[]).map(t=>F.fromName(t.referenceValue))}class EE extends ye{constructor(e,t){super(e,"array-contains",t)}matches(e){const t=e.data.field(this.field);return sc(t)&&ar(t.arrayValue,this.value)}}class bE extends ye{constructor(e,t){super(e,"in",t)}matches(e){const t=e.data.field(this.field);return t!==null&&ar(this.value.arrayValue,t)}}class TE extends ye{constructor(e,t){super(e,"not-in",t)}matches(e){if(ar(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const t=e.data.field(this.field);return t!==null&&t.nullValue===void 0&&!ar(this.value.arrayValue,t)}}class IE extends ye{constructor(e,t){super(e,"array-contains-any",t)}matches(e){const t=e.data.field(this.field);return!(!sc(t)||!t.arrayValue.values)&&t.arrayValue.values.some(o=>ar(this.value.arrayValue,o))}}/**
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
 */class SE{constructor(e,t=null,o=[],r=[],i=null,s=null,c=null){this.path=e,this.collectionGroup=t,this.orderBy=o,this.filters=r,this.limit=i,this.startAt=s,this.endAt=c,this.Te=null}}function hd(n,e=null,t=[],o=[],r=null,i=null,s=null){return new SE(n,e,t,o,r,i,s)}function ac(n){const e=H(n);if(e.Te===null){let t=e.path.canonicalString();e.collectionGroup!==null&&(t+="|cg:"+e.collectionGroup),t+="|f:",t+=e.filters.map(o=>Ta(o)).join(","),t+="|ob:",t+=e.orderBy.map(o=>function(i){return i.field.canonicalString()+i.dir}(o)).join(","),Wi(e.limit)||(t+="|l:",t+=e.limit),e.startAt&&(t+="|lb:",t+=e.startAt.inclusive?"b:":"a:",t+=e.startAt.position.map(o=>Xn(o)).join(",")),e.endAt&&(t+="|ub:",t+=e.endAt.inclusive?"a:":"b:",t+=e.endAt.position.map(o=>Xn(o)).join(",")),e.Te=t}return e.Te}function cc(n,e){if(n.limit!==e.limit||n.orderBy.length!==e.orderBy.length)return!1;for(let t=0;t<n.orderBy.length;t++)if(!mE(n.orderBy[t],e.orderBy[t]))return!1;if(n.filters.length!==e.filters.length)return!1;for(let t=0;t<n.filters.length;t++)if(!Pf(n.filters[t],e.filters[t]))return!1;return n.collectionGroup===e.collectionGroup&&!!n.path.isEqual(e.path)&&!!dd(n.startAt,e.startAt)&&dd(n.endAt,e.endAt)}function Ia(n){return F.isDocumentKey(n.path)&&n.collectionGroup===null&&n.filters.length===0}/**
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
 */class wo{constructor(e,t=null,o=[],r=[],i=null,s="F",c=null,u=null){this.path=e,this.collectionGroup=t,this.explicitOrderBy=o,this.filters=r,this.limit=i,this.limitType=s,this.startAt=c,this.endAt=u,this.Ie=null,this.Ee=null,this.de=null,this.startAt,this.endAt}}function AE(n,e,t,o,r,i,s,c){return new wo(n,e,t,o,r,i,s,c)}function Qi(n){return new wo(n)}function fd(n){return n.filters.length===0&&n.limit===null&&n.startAt==null&&n.endAt==null&&(n.explicitOrderBy.length===0||n.explicitOrderBy.length===1&&n.explicitOrderBy[0].field.isKeyField())}function Of(n){return n.collectionGroup!==null}function Yo(n){const e=H(n);if(e.Ie===null){e.Ie=[];const t=new Set;for(const i of e.explicitOrderBy)e.Ie.push(i),t.add(i.field.canonicalString());const o=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(function(s){let c=new Ee(Ie.comparator);return s.filters.forEach(u=>{u.getFlattenedFilters().forEach(d=>{d.isInequality()&&(c=c.add(d.field))})}),c})(e).forEach(i=>{t.has(i.canonicalString())||i.isKeyField()||e.Ie.push(new cr(i,o))}),t.has(Ie.keyField().canonicalString())||e.Ie.push(new cr(Ie.keyField(),o))}return e.Ie}function dt(n){const e=H(n);return e.Ee||(e.Ee=DE(e,Yo(n))),e.Ee}function DE(n,e){if(n.limitType==="F")return hd(n.path,n.collectionGroup,e,n.filters,n.limit,n.startAt,n.endAt);{e=e.map(r=>{const i=r.dir==="desc"?"asc":"desc";return new cr(r.field,i)});const t=n.endAt?new Si(n.endAt.position,n.endAt.inclusive):null,o=n.startAt?new Si(n.startAt.position,n.startAt.inclusive):null;return hd(n.path,n.collectionGroup,e,n.filters,n.limit,t,o)}}function Sa(n,e){const t=n.filters.concat([e]);return new wo(n.path,n.collectionGroup,n.explicitOrderBy.slice(),t,n.limit,n.limitType,n.startAt,n.endAt)}function Aa(n,e,t){return new wo(n.path,n.collectionGroup,n.explicitOrderBy.slice(),n.filters.slice(),e,t,n.startAt,n.endAt)}function Yi(n,e){return cc(dt(n),dt(e))&&n.limitType===e.limitType}function Vf(n){return`${ac(dt(n))}|lt:${n.limitType}`}function Ln(n){return`Query(target=${function(t){let o=t.path.canonicalString();return t.collectionGroup!==null&&(o+=" collectionGroup="+t.collectionGroup),t.filters.length>0&&(o+=`, filters: [${t.filters.map(r=>kf(r)).join(", ")}]`),Wi(t.limit)||(o+=", limit: "+t.limit),t.orderBy.length>0&&(o+=`, orderBy: [${t.orderBy.map(r=>function(s){return`${s.field.canonicalString()} (${s.dir})`}(r)).join(", ")}]`),t.startAt&&(o+=", startAt: ",o+=t.startAt.inclusive?"b:":"a:",o+=t.startAt.position.map(r=>Xn(r)).join(",")),t.endAt&&(o+=", endAt: ",o+=t.endAt.inclusive?"a:":"b:",o+=t.endAt.position.map(r=>Xn(r)).join(",")),`Target(${o})`}(dt(n))}; limitType=${n.limitType})`}function Ji(n,e){return e.isFoundDocument()&&function(o,r){const i=r.key.path;return o.collectionGroup!==null?r.key.hasCollectionId(o.collectionGroup)&&o.path.isPrefixOf(i):F.isDocumentKey(o.path)?o.path.isEqual(i):o.path.isImmediateParentOf(i)}(n,e)&&function(o,r){for(const i of Yo(o))if(!i.field.isKeyField()&&r.data.field(i.field)===null)return!1;return!0}(n,e)&&function(o,r){for(const i of o.filters)if(!i.matches(r))return!1;return!0}(n,e)&&function(o,r){return!(o.startAt&&!function(s,c,u){const d=ud(s,c,u);return s.inclusive?d<=0:d<0}(o.startAt,Yo(o),r)||o.endAt&&!function(s,c,u){const d=ud(s,c,u);return s.inclusive?d>=0:d>0}(o.endAt,Yo(o),r))}(n,e)}function CE(n){return n.collectionGroup||(n.path.length%2==1?n.path.lastSegment():n.path.get(n.path.length-2))}function Bf(n){return(e,t)=>{let o=!1;for(const r of Yo(n)){const i=RE(r,e,t);if(i!==0)return i;o=o||r.field.isKeyField()}return 0}}function RE(n,e,t){const o=n.field.isKeyField()?F.comparator(e.key,t.key):function(i,s,c){const u=s.data.field(i),d=c.data.field(i);return u!==null&&d!==null?Jn(u,d):$(42886)}(n.field,e,t);switch(n.dir){case"asc":return o;case"desc":return-1*o;default:return $(19790,{direction:n.dir})}}/**
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
 */class Sn{constructor(e,t){this.mapKeyFn=e,this.equalsFn=t,this.inner={},this.innerSize=0}get(e){const t=this.mapKeyFn(e),o=this.inner[t];if(o!==void 0){for(const[r,i]of o)if(this.equalsFn(r,e))return i}}has(e){return this.get(e)!==void 0}set(e,t){const o=this.mapKeyFn(e),r=this.inner[o];if(r===void 0)return this.inner[o]=[[e,t]],void this.innerSize++;for(let i=0;i<r.length;i++)if(this.equalsFn(r[i][0],e))return void(r[i]=[e,t]);r.push([e,t]),this.innerSize++}delete(e){const t=this.mapKeyFn(e),o=this.inner[t];if(o===void 0)return!1;for(let r=0;r<o.length;r++)if(this.equalsFn(o[r][0],e))return o.length===1?delete this.inner[t]:o.splice(r,1),this.innerSize--,!0;return!1}forEach(e){Xt(this.inner,(t,o)=>{for(const[r,i]of o)e(r,i)})}isEmpty(){return _f(this.inner)}size(){return this.innerSize}}/**
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
 */const NE=new le(F.comparator);function Rt(){return NE}const Lf=new le(F.comparator);function zo(...n){let e=Lf;for(const t of n)e=e.insert(t.key,t);return e}function xf(n){let e=Lf;return n.forEach((t,o)=>e=e.insert(t,o.overlayedDocument)),e}function hn(){return Jo()}function Uf(){return Jo()}function Jo(){return new Sn(n=>n.toString(),(n,e)=>n.isEqual(e))}const PE=new le(F.comparator),kE=new Ee(F.comparator);function Y(...n){let e=kE;for(const t of n)e=e.add(t);return e}const ME=new Ee(Q);function OE(){return ME}/**
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
 */function lc(n,e){if(n.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:bi(e)?"-0":e}}function Ff(n){return{integerValue:""+n}}function VE(n,e){return cE(e)?Ff(e):lc(n,e)}/**
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
 */class Xi{constructor(){this._=void 0}}function BE(n,e,t){return n instanceof lr?function(r,i){const s={fields:{[bf]:{stringValue:Ef},[If]:{timestampValue:{seconds:r.seconds,nanos:r.nanoseconds}}}};return i&&ic(i)&&(i=Ki(i)),i&&(s.fields[Tf]=i),{mapValue:s}}(t,e):n instanceof Zn?Gf(n,e):n instanceof eo?zf(n,e):function(r,i){const s=$f(r,i),c=gd(s)+gd(r.Ae);return ba(s)&&ba(r.Ae)?Ff(c):lc(r.serializer,c)}(n,e)}function LE(n,e,t){return n instanceof Zn?Gf(n,e):n instanceof eo?zf(n,e):t}function $f(n,e){return n instanceof Ai?function(o){return ba(o)||function(i){return!!i&&"doubleValue"in i}(o)}(e)?e:{integerValue:0}:null}class lr extends Xi{}class Zn extends Xi{constructor(e){super(),this.elements=e}}function Gf(n,e){const t=qf(e);for(const o of n.elements)t.some(r=>mt(r,o))||t.push(o);return{arrayValue:{values:t}}}class eo extends Xi{constructor(e){super(),this.elements=e}}function zf(n,e){let t=qf(e);for(const o of n.elements)t=t.filter(r=>!mt(r,o));return{arrayValue:{values:t}}}class Ai extends Xi{constructor(e,t){super(),this.serializer=e,this.Ae=t}}function gd(n){return pe(n.integerValue||n.doubleValue)}function qf(n){return sc(n)&&n.arrayValue.values?n.arrayValue.values.slice():[]}/**
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
 */class uc{constructor(e,t){this.field=e,this.transform=t}}function xE(n,e){return n.field.isEqual(e.field)&&function(o,r){return o instanceof Zn&&r instanceof Zn||o instanceof eo&&r instanceof eo?Qn(o.elements,r.elements,mt):o instanceof Ai&&r instanceof Ai?mt(o.Ae,r.Ae):o instanceof lr&&r instanceof lr}(n.transform,e.transform)}class UE{constructor(e,t){this.version=e,this.transformResults=t}}class Ge{constructor(e,t){this.updateTime=e,this.exists=t}static none(){return new Ge}static exists(e){return new Ge(void 0,e)}static updateTime(e){return new Ge(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function di(n,e){return n.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(n.updateTime):n.exists===void 0||n.exists===e.isFoundDocument()}class Zi{}function jf(n,e){if(!n.hasLocalMutations||e&&e.fields.length===0)return null;if(e===null)return n.isNoDocument()?new es(n.key,Ge.none()):new mr(n.key,n.data,Ge.none());{const t=n.data,o=qe.empty();let r=new Ee(Ie.comparator);for(let i of e.fields)if(!r.has(i)){let s=t.field(i);s===null&&i.length>1&&(i=i.popLast(),s=t.field(i)),s===null?o.delete(i):o.set(i,s),r=r.add(i)}return new Zt(n.key,o,new Ke(r.toArray()),Ge.none())}}function FE(n,e,t){n instanceof mr?function(r,i,s){const c=r.value.clone(),u=md(r.fieldTransforms,i,s.transformResults);c.setAll(u),i.convertToFoundDocument(s.version,c).setHasCommittedMutations()}(n,e,t):n instanceof Zt?function(r,i,s){if(!di(r.precondition,i))return void i.convertToUnknownDocument(s.version);const c=md(r.fieldTransforms,i,s.transformResults),u=i.data;u.setAll(Hf(r)),u.setAll(c),i.convertToFoundDocument(s.version,u).setHasCommittedMutations()}(n,e,t):function(r,i,s){i.convertToNoDocument(s.version).setHasCommittedMutations()}(0,e,t)}function Xo(n,e,t,o){return n instanceof mr?function(i,s,c,u){if(!di(i.precondition,s))return c;const d=i.value.clone(),f=wd(i.fieldTransforms,u,s);return d.setAll(f),s.convertToFoundDocument(s.version,d).setHasLocalMutations(),null}(n,e,t,o):n instanceof Zt?function(i,s,c,u){if(!di(i.precondition,s))return c;const d=wd(i.fieldTransforms,u,s),f=s.data;return f.setAll(Hf(i)),f.setAll(d),s.convertToFoundDocument(s.version,f).setHasLocalMutations(),c===null?null:c.unionWith(i.fieldMask.fields).unionWith(i.fieldTransforms.map(p=>p.field))}(n,e,t,o):function(i,s,c){return di(i.precondition,s)?(s.convertToNoDocument(s.version).setHasLocalMutations(),null):c}(n,e,t)}function $E(n,e){let t=null;for(const o of n.fieldTransforms){const r=e.data.field(o.field),i=$f(o.transform,r||null);i!=null&&(t===null&&(t=qe.empty()),t.set(o.field,i))}return t||null}function pd(n,e){return n.type===e.type&&!!n.key.isEqual(e.key)&&!!n.precondition.isEqual(e.precondition)&&!!function(o,r){return o===void 0&&r===void 0||!(!o||!r)&&Qn(o,r,(i,s)=>xE(i,s))}(n.fieldTransforms,e.fieldTransforms)&&(n.type===0?n.value.isEqual(e.value):n.type!==1||n.data.isEqual(e.data)&&n.fieldMask.isEqual(e.fieldMask))}class mr extends Zi{constructor(e,t,o,r=[]){super(),this.key=e,this.value=t,this.precondition=o,this.fieldTransforms=r,this.type=0}getFieldMask(){return null}}class Zt extends Zi{constructor(e,t,o,r,i=[]){super(),this.key=e,this.data=t,this.fieldMask=o,this.precondition=r,this.fieldTransforms=i,this.type=1}getFieldMask(){return this.fieldMask}}function Hf(n){const e=new Map;return n.fieldMask.fields.forEach(t=>{if(!t.isEmpty()){const o=n.data.field(t);e.set(t,o)}}),e}function md(n,e,t){const o=new Map;te(n.length===t.length,32656,{Re:t.length,Ve:n.length});for(let r=0;r<t.length;r++){const i=n[r],s=i.transform,c=e.data.field(i.field);o.set(i.field,LE(s,c,t[r]))}return o}function wd(n,e,t){const o=new Map;for(const r of n){const i=r.transform,s=t.data.field(r.field);o.set(r.field,BE(i,s,e))}return o}class es extends Zi{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class GE extends Zi{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
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
 */class zE{constructor(e,t,o,r){this.batchId=e,this.localWriteTime=t,this.baseMutations=o,this.mutations=r}applyToRemoteDocument(e,t){const o=t.mutationResults;for(let r=0;r<this.mutations.length;r++){const i=this.mutations[r];i.key.isEqual(e.key)&&FE(i,e,o[r])}}applyToLocalView(e,t){for(const o of this.baseMutations)o.key.isEqual(e.key)&&(t=Xo(o,e,t,this.localWriteTime));for(const o of this.mutations)o.key.isEqual(e.key)&&(t=Xo(o,e,t,this.localWriteTime));return t}applyToLocalDocumentSet(e,t){const o=Uf();return this.mutations.forEach(r=>{const i=e.get(r.key),s=i.overlayedDocument;let c=this.applyToLocalView(s,i.mutatedFields);c=t.has(r.key)?null:c;const u=jf(s,c);u!==null&&o.set(r.key,u),s.isValidDocument()||s.convertToNoDocument(q.min())}),o}keys(){return this.mutations.reduce((e,t)=>e.add(t.key),Y())}isEqual(e){return this.batchId===e.batchId&&Qn(this.mutations,e.mutations,(t,o)=>pd(t,o))&&Qn(this.baseMutations,e.baseMutations,(t,o)=>pd(t,o))}}class dc{constructor(e,t,o,r){this.batch=e,this.commitVersion=t,this.mutationResults=o,this.docVersions=r}static from(e,t,o){te(e.mutations.length===o.length,58842,{me:e.mutations.length,fe:o.length});let r=function(){return PE}();const i=e.mutations;for(let s=0;s<i.length;s++)r=r.insert(i[s].key,o[s].version);return new dc(e,t,o,r)}}/**
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
 */class qE{constructor(e,t){this.largestBatchId=e,this.mutation=t}getKey(){return this.mutation.key}isEqual(e){return e!==null&&this.mutation===e.mutation}toString(){return`Overlay{
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
 */class jE{constructor(e,t){this.count=e,this.unchangedNames=t}}/**
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
 */var we,X;function HE(n){switch(n){case N.OK:return $(64938);case N.CANCELLED:case N.UNKNOWN:case N.DEADLINE_EXCEEDED:case N.RESOURCE_EXHAUSTED:case N.INTERNAL:case N.UNAVAILABLE:case N.UNAUTHENTICATED:return!1;case N.INVALID_ARGUMENT:case N.NOT_FOUND:case N.ALREADY_EXISTS:case N.PERMISSION_DENIED:case N.FAILED_PRECONDITION:case N.ABORTED:case N.OUT_OF_RANGE:case N.UNIMPLEMENTED:case N.DATA_LOSS:return!0;default:return $(15467,{code:n})}}function Wf(n){if(n===void 0)return Ct("GRPC error has no .code"),N.UNKNOWN;switch(n){case we.OK:return N.OK;case we.CANCELLED:return N.CANCELLED;case we.UNKNOWN:return N.UNKNOWN;case we.DEADLINE_EXCEEDED:return N.DEADLINE_EXCEEDED;case we.RESOURCE_EXHAUSTED:return N.RESOURCE_EXHAUSTED;case we.INTERNAL:return N.INTERNAL;case we.UNAVAILABLE:return N.UNAVAILABLE;case we.UNAUTHENTICATED:return N.UNAUTHENTICATED;case we.INVALID_ARGUMENT:return N.INVALID_ARGUMENT;case we.NOT_FOUND:return N.NOT_FOUND;case we.ALREADY_EXISTS:return N.ALREADY_EXISTS;case we.PERMISSION_DENIED:return N.PERMISSION_DENIED;case we.FAILED_PRECONDITION:return N.FAILED_PRECONDITION;case we.ABORTED:return N.ABORTED;case we.OUT_OF_RANGE:return N.OUT_OF_RANGE;case we.UNIMPLEMENTED:return N.UNIMPLEMENTED;case we.DATA_LOSS:return N.DATA_LOSS;default:return $(39323,{code:n})}}(X=we||(we={}))[X.OK=0]="OK",X[X.CANCELLED=1]="CANCELLED",X[X.UNKNOWN=2]="UNKNOWN",X[X.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",X[X.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",X[X.NOT_FOUND=5]="NOT_FOUND",X[X.ALREADY_EXISTS=6]="ALREADY_EXISTS",X[X.PERMISSION_DENIED=7]="PERMISSION_DENIED",X[X.UNAUTHENTICATED=16]="UNAUTHENTICATED",X[X.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",X[X.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",X[X.ABORTED=10]="ABORTED",X[X.OUT_OF_RANGE=11]="OUT_OF_RANGE",X[X.UNIMPLEMENTED=12]="UNIMPLEMENTED",X[X.INTERNAL=13]="INTERNAL",X[X.UNAVAILABLE=14]="UNAVAILABLE",X[X.DATA_LOSS=15]="DATA_LOSS";/**
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
 */function WE(){return new TextEncoder}/**
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
 */const KE=new zt([4294967295,4294967295],0);function yd(n){const e=WE().encode(n),t=new sf;return t.update(e),new Uint8Array(t.digest())}function _d(n){const e=new DataView(n.buffer),t=e.getUint32(0,!0),o=e.getUint32(4,!0),r=e.getUint32(8,!0),i=e.getUint32(12,!0);return[new zt([t,o],0),new zt([r,i],0)]}class hc{constructor(e,t,o){if(this.bitmap=e,this.padding=t,this.hashCount=o,t<0||t>=8)throw new qo(`Invalid padding: ${t}`);if(o<0)throw new qo(`Invalid hash count: ${o}`);if(e.length>0&&this.hashCount===0)throw new qo(`Invalid hash count: ${o}`);if(e.length===0&&t!==0)throw new qo(`Invalid padding when bitmap length is 0: ${t}`);this.ge=8*e.length-t,this.pe=zt.fromNumber(this.ge)}ye(e,t,o){let r=e.add(t.multiply(zt.fromNumber(o)));return r.compare(KE)===1&&(r=new zt([r.getBits(0),r.getBits(1)],0)),r.modulo(this.pe).toNumber()}we(e){return!!(this.bitmap[Math.floor(e/8)]&1<<e%8)}mightContain(e){if(this.ge===0)return!1;const t=yd(e),[o,r]=_d(t);for(let i=0;i<this.hashCount;i++){const s=this.ye(o,r,i);if(!this.we(s))return!1}return!0}static create(e,t,o){const r=e%8==0?0:8-e%8,i=new Uint8Array(Math.ceil(e/8)),s=new hc(i,r,t);return o.forEach(c=>s.insert(c)),s}insert(e){if(this.ge===0)return;const t=yd(e),[o,r]=_d(t);for(let i=0;i<this.hashCount;i++){const s=this.ye(o,r,i);this.Se(s)}}Se(e){const t=Math.floor(e/8),o=e%8;this.bitmap[t]|=1<<o}}class qo extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
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
 */class ts{constructor(e,t,o,r,i){this.snapshotVersion=e,this.targetChanges=t,this.targetMismatches=o,this.documentUpdates=r,this.resolvedLimboDocuments=i}static createSynthesizedRemoteEventForCurrentChange(e,t,o){const r=new Map;return r.set(e,wr.createSynthesizedTargetChangeForCurrentChange(e,t,o)),new ts(q.min(),r,new le(Q),Rt(),Y())}}class wr{constructor(e,t,o,r,i){this.resumeToken=e,this.current=t,this.addedDocuments=o,this.modifiedDocuments=r,this.removedDocuments=i}static createSynthesizedTargetChangeForCurrentChange(e,t,o){return new wr(o,t,Y(),Y(),Y())}}/**
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
 */class hi{constructor(e,t,o,r){this.be=e,this.removedTargetIds=t,this.key=o,this.De=r}}class Kf{constructor(e,t){this.targetId=e,this.Ce=t}}class Qf{constructor(e,t,o=Se.EMPTY_BYTE_STRING,r=null){this.state=e,this.targetIds=t,this.resumeToken=o,this.cause=r}}class vd{constructor(){this.ve=0,this.Fe=Ed(),this.Me=Se.EMPTY_BYTE_STRING,this.xe=!1,this.Oe=!0}get current(){return this.xe}get resumeToken(){return this.Me}get Ne(){return this.ve!==0}get Be(){return this.Oe}Le(e){e.approximateByteSize()>0&&(this.Oe=!0,this.Me=e)}ke(){let e=Y(),t=Y(),o=Y();return this.Fe.forEach((r,i)=>{switch(i){case 0:e=e.add(r);break;case 2:t=t.add(r);break;case 1:o=o.add(r);break;default:$(38017,{changeType:i})}}),new wr(this.Me,this.xe,e,t,o)}qe(){this.Oe=!1,this.Fe=Ed()}Qe(e,t){this.Oe=!0,this.Fe=this.Fe.insert(e,t)}$e(e){this.Oe=!0,this.Fe=this.Fe.remove(e)}Ue(){this.ve+=1}Ke(){this.ve-=1,te(this.ve>=0,3241,{ve:this.ve})}We(){this.Oe=!0,this.xe=!0}}class QE{constructor(e){this.Ge=e,this.ze=new Map,this.je=Rt(),this.Je=Xr(),this.He=Xr(),this.Ye=new le(Q)}Ze(e){for(const t of e.be)e.De&&e.De.isFoundDocument()?this.Xe(t,e.De):this.et(t,e.key,e.De);for(const t of e.removedTargetIds)this.et(t,e.key,e.De)}tt(e){this.forEachTarget(e,t=>{const o=this.nt(t);switch(e.state){case 0:this.rt(t)&&o.Le(e.resumeToken);break;case 1:o.Ke(),o.Ne||o.qe(),o.Le(e.resumeToken);break;case 2:o.Ke(),o.Ne||this.removeTarget(t);break;case 3:this.rt(t)&&(o.We(),o.Le(e.resumeToken));break;case 4:this.rt(t)&&(this.it(t),o.Le(e.resumeToken));break;default:$(56790,{state:e.state})}})}forEachTarget(e,t){e.targetIds.length>0?e.targetIds.forEach(t):this.ze.forEach((o,r)=>{this.rt(r)&&t(r)})}st(e){const t=e.targetId,o=e.Ce.count,r=this.ot(t);if(r){const i=r.target;if(Ia(i))if(o===0){const s=new F(i.path);this.et(t,s,Le.newNoDocument(s,q.min()))}else te(o===1,20013,{expectedCount:o});else{const s=this._t(t);if(s!==o){const c=this.ut(e),u=c?this.ct(c,e,s):1;if(u!==0){this.it(t);const d=u===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Ye=this.Ye.insert(t,d)}}}}}ut(e){const t=e.Ce.unchangedNames;if(!t||!t.bits)return null;const{bits:{bitmap:o="",padding:r=0},hashCount:i=0}=t;let s,c;try{s=Kt(o).toUint8Array()}catch(u){if(u instanceof vf)return _n("Decoding the base64 bloom filter in existence filter failed ("+u.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw u}try{c=new hc(s,r,i)}catch(u){return _n(u instanceof qo?"BloomFilter error: ":"Applying bloom filter failed: ",u),null}return c.ge===0?null:c}ct(e,t,o){return t.Ce.count===o-this.Pt(e,t.targetId)?0:2}Pt(e,t){const o=this.Ge.getRemoteKeysForTarget(t);let r=0;return o.forEach(i=>{const s=this.Ge.ht(),c=`projects/${s.projectId}/databases/${s.database}/documents/${i.path.canonicalString()}`;e.mightContain(c)||(this.et(t,i,null),r++)}),r}Tt(e){const t=new Map;this.ze.forEach((i,s)=>{const c=this.ot(s);if(c){if(i.current&&Ia(c.target)){const u=new F(c.target.path);this.It(u).has(s)||this.Et(s,u)||this.et(s,u,Le.newNoDocument(u,e))}i.Be&&(t.set(s,i.ke()),i.qe())}});let o=Y();this.He.forEach((i,s)=>{let c=!0;s.forEachWhile(u=>{const d=this.ot(u);return!d||d.purpose==="TargetPurposeLimboResolution"||(c=!1,!1)}),c&&(o=o.add(i))}),this.je.forEach((i,s)=>s.setReadTime(e));const r=new ts(e,t,this.Ye,this.je,o);return this.je=Rt(),this.Je=Xr(),this.He=Xr(),this.Ye=new le(Q),r}Xe(e,t){if(!this.rt(e))return;const o=this.Et(e,t.key)?2:0;this.nt(e).Qe(t.key,o),this.je=this.je.insert(t.key,t),this.Je=this.Je.insert(t.key,this.It(t.key).add(e)),this.He=this.He.insert(t.key,this.dt(t.key).add(e))}et(e,t,o){if(!this.rt(e))return;const r=this.nt(e);this.Et(e,t)?r.Qe(t,1):r.$e(t),this.He=this.He.insert(t,this.dt(t).delete(e)),this.He=this.He.insert(t,this.dt(t).add(e)),o&&(this.je=this.je.insert(t,o))}removeTarget(e){this.ze.delete(e)}_t(e){const t=this.nt(e).ke();return this.Ge.getRemoteKeysForTarget(e).size+t.addedDocuments.size-t.removedDocuments.size}Ue(e){this.nt(e).Ue()}nt(e){let t=this.ze.get(e);return t||(t=new vd,this.ze.set(e,t)),t}dt(e){let t=this.He.get(e);return t||(t=new Ee(Q),this.He=this.He.insert(e,t)),t}It(e){let t=this.Je.get(e);return t||(t=new Ee(Q),this.Je=this.Je.insert(e,t)),t}rt(e){const t=this.ot(e)!==null;return t||x("WatchChangeAggregator","Detected inactive target",e),t}ot(e){const t=this.ze.get(e);return t&&t.Ne?null:this.Ge.At(e)}it(e){this.ze.set(e,new vd),this.Ge.getRemoteKeysForTarget(e).forEach(t=>{this.et(e,t,null)})}Et(e,t){return this.Ge.getRemoteKeysForTarget(e).has(t)}}function Xr(){return new le(F.comparator)}function Ed(){return new le(F.comparator)}const YE={asc:"ASCENDING",desc:"DESCENDING"},JE={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},XE={and:"AND",or:"OR"};class ZE{constructor(e,t){this.databaseId=e,this.useProto3Json=t}}function Da(n,e){return n.useProto3Json||Wi(e)?e:{value:e}}function Di(n,e){return n.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function Yf(n,e){return n.useProto3Json?e.toBase64():e.toUint8Array()}function eb(n,e){return Di(n,e.toTimestamp())}function ht(n){return te(!!n,49232),q.fromTimestamp(function(t){const o=Wt(t);return new oe(o.seconds,o.nanos)}(n))}function fc(n,e){return Ca(n,e).canonicalString()}function Ca(n,e){const t=function(r){return new re(["projects",r.projectId,"databases",r.database])}(n).child("documents");return e===void 0?t:t.child(e)}function Jf(n){const e=re.fromString(n);return te(ng(e),10190,{key:e.toString()}),e}function Ra(n,e){return fc(n.databaseId,e.path)}function Zs(n,e){const t=Jf(e);if(t.get(1)!==n.databaseId.projectId)throw new L(N.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+t.get(1)+" vs "+n.databaseId.projectId);if(t.get(3)!==n.databaseId.database)throw new L(N.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+t.get(3)+" vs "+n.databaseId.database);return new F(Zf(t))}function Xf(n,e){return fc(n.databaseId,e)}function tb(n){const e=Jf(n);return e.length===4?re.emptyPath():Zf(e)}function Na(n){return new re(["projects",n.databaseId.projectId,"databases",n.databaseId.database]).canonicalString()}function Zf(n){return te(n.length>4&&n.get(4)==="documents",29091,{key:n.toString()}),n.popFirst(5)}function bd(n,e,t){return{name:Ra(n,e),fields:t.value.mapValue.fields}}function nb(n,e){let t;if("targetChange"in e){e.targetChange;const o=function(d){return d==="NO_CHANGE"?0:d==="ADD"?1:d==="REMOVE"?2:d==="CURRENT"?3:d==="RESET"?4:$(39313,{state:d})}(e.targetChange.targetChangeType||"NO_CHANGE"),r=e.targetChange.targetIds||[],i=function(d,f){return d.useProto3Json?(te(f===void 0||typeof f=="string",58123),Se.fromBase64String(f||"")):(te(f===void 0||f instanceof Buffer||f instanceof Uint8Array,16193),Se.fromUint8Array(f||new Uint8Array))}(n,e.targetChange.resumeToken),s=e.targetChange.cause,c=s&&function(d){const f=d.code===void 0?N.UNKNOWN:Wf(d.code);return new L(f,d.message||"")}(s);t=new Qf(o,r,i,c||null)}else if("documentChange"in e){e.documentChange;const o=e.documentChange;o.document,o.document.name,o.document.updateTime;const r=Zs(n,o.document.name),i=ht(o.document.updateTime),s=o.document.createTime?ht(o.document.createTime):q.min(),c=new qe({mapValue:{fields:o.document.fields}}),u=Le.newFoundDocument(r,i,s,c),d=o.targetIds||[],f=o.removedTargetIds||[];t=new hi(d,f,u.key,u)}else if("documentDelete"in e){e.documentDelete;const o=e.documentDelete;o.document;const r=Zs(n,o.document),i=o.readTime?ht(o.readTime):q.min(),s=Le.newNoDocument(r,i),c=o.removedTargetIds||[];t=new hi([],c,s.key,s)}else if("documentRemove"in e){e.documentRemove;const o=e.documentRemove;o.document;const r=Zs(n,o.document),i=o.removedTargetIds||[];t=new hi([],i,r,null)}else{if(!("filter"in e))return $(11601,{Rt:e});{e.filter;const o=e.filter;o.targetId;const{count:r=0,unchangedNames:i}=o,s=new jE(r,i),c=o.targetId;t=new Kf(c,s)}}return t}function ob(n,e){let t;if(e instanceof mr)t={update:bd(n,e.key,e.value)};else if(e instanceof es)t={delete:Ra(n,e.key)};else if(e instanceof Zt)t={update:bd(n,e.key,e.data),updateMask:fb(e.fieldMask)};else{if(!(e instanceof GE))return $(16599,{Vt:e.type});t={verify:Ra(n,e.key)}}return e.fieldTransforms.length>0&&(t.updateTransforms=e.fieldTransforms.map(o=>function(i,s){const c=s.transform;if(c instanceof lr)return{fieldPath:s.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(c instanceof Zn)return{fieldPath:s.field.canonicalString(),appendMissingElements:{values:c.elements}};if(c instanceof eo)return{fieldPath:s.field.canonicalString(),removeAllFromArray:{values:c.elements}};if(c instanceof Ai)return{fieldPath:s.field.canonicalString(),increment:c.Ae};throw $(20930,{transform:s.transform})}(0,o))),e.precondition.isNone||(t.currentDocument=function(r,i){return i.updateTime!==void 0?{updateTime:eb(r,i.updateTime)}:i.exists!==void 0?{exists:i.exists}:$(27497)}(n,e.precondition)),t}function rb(n,e){return n&&n.length>0?(te(e!==void 0,14353),n.map(t=>function(r,i){let s=r.updateTime?ht(r.updateTime):ht(i);return s.isEqual(q.min())&&(s=ht(i)),new UE(s,r.transformResults||[])}(t,e))):[]}function ib(n,e){return{documents:[Xf(n,e.path)]}}function sb(n,e){const t={structuredQuery:{}},o=e.path;let r;e.collectionGroup!==null?(r=o,t.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(r=o.popLast(),t.structuredQuery.from=[{collectionId:o.lastSegment()}]),t.parent=Xf(n,r);const i=function(d){if(d.length!==0)return tg(it.create(d,"and"))}(e.filters);i&&(t.structuredQuery.where=i);const s=function(d){if(d.length!==0)return d.map(f=>function(m){return{field:xn(m.field),direction:lb(m.dir)}}(f))}(e.orderBy);s&&(t.structuredQuery.orderBy=s);const c=Da(n,e.limit);return c!==null&&(t.structuredQuery.limit=c),e.startAt&&(t.structuredQuery.startAt=function(d){return{before:d.inclusive,values:d.position}}(e.startAt)),e.endAt&&(t.structuredQuery.endAt=function(d){return{before:!d.inclusive,values:d.position}}(e.endAt)),{ft:t,parent:r}}function ab(n){let e=tb(n.parent);const t=n.structuredQuery,o=t.from?t.from.length:0;let r=null;if(o>0){te(o===1,65062);const f=t.from[0];f.allDescendants?r=f.collectionId:e=e.child(f.collectionId)}let i=[];t.where&&(i=function(p){const m=eg(p);return m instanceof it&&Nf(m)?m.getFilters():[m]}(t.where));let s=[];t.orderBy&&(s=function(p){return p.map(m=>function(C){return new cr(Un(C.field),function(P){switch(P){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(C.direction))}(m))}(t.orderBy));let c=null;t.limit&&(c=function(p){let m;return m=typeof p=="object"?p.value:p,Wi(m)?null:m}(t.limit));let u=null;t.startAt&&(u=function(p){const m=!!p.before,S=p.values||[];return new Si(S,m)}(t.startAt));let d=null;return t.endAt&&(d=function(p){const m=!p.before,S=p.values||[];return new Si(S,m)}(t.endAt)),AE(e,r,s,i,c,"F",u,d)}function cb(n,e){const t=function(r){switch(r){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return $(28987,{purpose:r})}}(e.purpose);return t==null?null:{"goog-listen-tags":t}}function eg(n){return n.unaryFilter!==void 0?function(t){switch(t.unaryFilter.op){case"IS_NAN":const o=Un(t.unaryFilter.field);return ye.create(o,"==",{doubleValue:NaN});case"IS_NULL":const r=Un(t.unaryFilter.field);return ye.create(r,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const i=Un(t.unaryFilter.field);return ye.create(i,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const s=Un(t.unaryFilter.field);return ye.create(s,"!=",{nullValue:"NULL_VALUE"});case"OPERATOR_UNSPECIFIED":return $(61313);default:return $(60726)}}(n):n.fieldFilter!==void 0?function(t){return ye.create(Un(t.fieldFilter.field),function(r){switch(r){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";case"OPERATOR_UNSPECIFIED":return $(58110);default:return $(50506)}}(t.fieldFilter.op),t.fieldFilter.value)}(n):n.compositeFilter!==void 0?function(t){return it.create(t.compositeFilter.filters.map(o=>eg(o)),function(r){switch(r){case"AND":return"and";case"OR":return"or";default:return $(1026)}}(t.compositeFilter.op))}(n):$(30097,{filter:n})}function lb(n){return YE[n]}function ub(n){return JE[n]}function hb(n){return XE[n]}function xn(n){return{fieldPath:n.canonicalString()}}function Un(n){return Ie.fromServerFormat(n.fieldPath)}function tg(n){return n instanceof ye?function(t){if(t.op==="=="){if(ld(t.value))return{unaryFilter:{field:xn(t.field),op:"IS_NAN"}};if(cd(t.value))return{unaryFilter:{field:xn(t.field),op:"IS_NULL"}}}else if(t.op==="!="){if(ld(t.value))return{unaryFilter:{field:xn(t.field),op:"IS_NOT_NAN"}};if(cd(t.value))return{unaryFilter:{field:xn(t.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:xn(t.field),op:ub(t.op),value:t.value}}}(n):n instanceof it?function(t){const o=t.getFilters().map(r=>tg(r));return o.length===1?o[0]:{compositeFilter:{op:hb(t.op),filters:o}}}(n):$(54877,{filter:n})}function fb(n){const e=[];return n.fields.forEach(t=>e.push(t.canonicalString())),{fieldPaths:e}}function ng(n){return n.length>=4&&n.get(0)==="projects"&&n.get(2)==="databases"}/**
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
 */class Ft{constructor(e,t,o,r,i=q.min(),s=q.min(),c=Se.EMPTY_BYTE_STRING,u=null){this.target=e,this.targetId=t,this.purpose=o,this.sequenceNumber=r,this.snapshotVersion=i,this.lastLimboFreeSnapshotVersion=s,this.resumeToken=c,this.expectedCount=u}withSequenceNumber(e){return new Ft(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,t){return new Ft(this.target,this.targetId,this.purpose,this.sequenceNumber,t,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new Ft(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new Ft(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}}/**
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
 */class gb{constructor(e){this.yt=e}}function pb(n){const e=ab({parent:n.parent,structuredQuery:n.structuredQuery});return n.limitType==="LAST"?Aa(e,e.limit,"L"):e}/**
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
 */class mb{constructor(){this.Cn=new wb}addToCollectionParentIndex(e,t){return this.Cn.add(t),k.resolve()}getCollectionParents(e,t){return k.resolve(this.Cn.getEntries(t))}addFieldIndex(e,t){return k.resolve()}deleteFieldIndex(e,t){return k.resolve()}deleteAllFieldIndexes(e){return k.resolve()}createTargetIndexes(e,t){return k.resolve()}getDocumentsMatchingTarget(e,t){return k.resolve(null)}getIndexType(e,t){return k.resolve(0)}getFieldIndexes(e,t){return k.resolve([])}getNextCollectionGroupToUpdate(e){return k.resolve(null)}getMinOffset(e,t){return k.resolve(Ht.min())}getMinOffsetFromCollectionGroup(e,t){return k.resolve(Ht.min())}updateCollectionGroup(e,t,o){return k.resolve()}updateIndexEntries(e,t){return k.resolve()}}class wb{constructor(){this.index={}}add(e){const t=e.lastSegment(),o=e.popLast(),r=this.index[t]||new Ee(re.comparator),i=!r.has(o);return this.index[t]=r.add(o),i}has(e){const t=e.lastSegment(),o=e.popLast(),r=this.index[t];return r&&r.has(o)}getEntries(e){return(this.index[e]||new Ee(re.comparator)).toArray()}}/**
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
 */const Td={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0},og=41943040;class ze{static withCacheSize(e){return new ze(e,ze.DEFAULT_COLLECTION_PERCENTILE,ze.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}constructor(e,t,o){this.cacheSizeCollectionThreshold=e,this.percentileToCollect=t,this.maximumSequenceNumbersToCollect=o}}/**
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
 */ze.DEFAULT_COLLECTION_PERCENTILE=10,ze.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,ze.DEFAULT=new ze(og,ze.DEFAULT_COLLECTION_PERCENTILE,ze.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),ze.DISABLED=new ze(-1,0,0);/**
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
 */class to{constructor(e){this.ar=e}next(){return this.ar+=2,this.ar}static ur(){return new to(0)}static cr(){return new to(-1)}}/**
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
 */const Id="LruGarbageCollector",yb=1048576;function Sd([n,e],[t,o]){const r=Q(n,t);return r===0?Q(e,o):r}class _b{constructor(e){this.Ir=e,this.buffer=new Ee(Sd),this.Er=0}dr(){return++this.Er}Ar(e){const t=[e,this.dr()];if(this.buffer.size<this.Ir)this.buffer=this.buffer.add(t);else{const o=this.buffer.last();Sd(t,o)<0&&(this.buffer=this.buffer.delete(o).add(t))}}get maxValue(){return this.buffer.last()[0]}}class vb{constructor(e,t,o){this.garbageCollector=e,this.asyncQueue=t,this.localStore=o,this.Rr=null}start(){this.garbageCollector.params.cacheSizeCollectionThreshold!==-1&&this.Vr(6e4)}stop(){this.Rr&&(this.Rr.cancel(),this.Rr=null)}get started(){return this.Rr!==null}Vr(e){x(Id,`Garbage collection scheduled in ${e}ms`),this.Rr=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",e,async()=>{this.Rr=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(t){mo(t)?x(Id,"Ignoring IndexedDB error during garbage collection: ",t):await po(t)}await this.Vr(3e5)})}}class Eb{constructor(e,t){this.mr=e,this.params=t}calculateTargetCount(e,t){return this.mr.gr(e).next(o=>Math.floor(t/100*o))}nthSequenceNumber(e,t){if(t===0)return k.resolve(Hi.ce);const o=new _b(t);return this.mr.forEachTarget(e,r=>o.Ar(r.sequenceNumber)).next(()=>this.mr.pr(e,r=>o.Ar(r))).next(()=>o.maxValue)}removeTargets(e,t,o){return this.mr.removeTargets(e,t,o)}removeOrphanedDocuments(e,t){return this.mr.removeOrphanedDocuments(e,t)}collect(e,t){return this.params.cacheSizeCollectionThreshold===-1?(x("LruGarbageCollector","Garbage collection skipped; disabled"),k.resolve(Td)):this.getCacheSize(e).next(o=>o<this.params.cacheSizeCollectionThreshold?(x("LruGarbageCollector",`Garbage collection skipped; Cache size ${o} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),Td):this.yr(e,t))}getCacheSize(e){return this.mr.getCacheSize(e)}yr(e,t){let o,r,i,s,c,u,d;const f=Date.now();return this.calculateTargetCount(e,this.params.percentileToCollect).next(p=>(p>this.params.maximumSequenceNumbersToCollect?(x("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${p}`),r=this.params.maximumSequenceNumbersToCollect):r=p,s=Date.now(),this.nthSequenceNumber(e,r))).next(p=>(o=p,c=Date.now(),this.removeTargets(e,o,t))).next(p=>(i=p,u=Date.now(),this.removeOrphanedDocuments(e,o))).next(p=>(d=Date.now(),Bn()<=K.DEBUG&&x("LruGarbageCollector",`LRU Garbage Collection
	Counted targets in ${s-f}ms
	Determined least recently used ${r} in `+(c-s)+`ms
	Removed ${i} targets in `+(u-c)+`ms
	Removed ${p} documents in `+(d-u)+`ms
Total Duration: ${d-f}ms`),k.resolve({didRun:!0,sequenceNumbersCollected:r,targetsRemoved:i,documentsRemoved:p})))}}function bb(n,e){return new Eb(n,e)}/**
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
 */class Tb{constructor(){this.changes=new Sn(e=>e.toString(),(e,t)=>e.isEqual(t)),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,t){this.assertNotApplied(),this.changes.set(e,Le.newInvalidDocument(e).setReadTime(t))}getEntry(e,t){this.assertNotApplied();const o=this.changes.get(t);return o!==void 0?k.resolve(o):this.getFromCache(e,t)}getEntries(e,t){return this.getAllFromCache(e,t)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}/**
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
 */class Ib{constructor(e,t){this.overlayedDocument=e,this.mutatedFields=t}}/**
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
 */class Sb{constructor(e,t,o,r){this.remoteDocumentCache=e,this.mutationQueue=t,this.documentOverlayCache=o,this.indexManager=r}getDocument(e,t){let o=null;return this.documentOverlayCache.getOverlay(e,t).next(r=>(o=r,this.remoteDocumentCache.getEntry(e,t))).next(r=>(o!==null&&Xo(o.mutation,r,Ke.empty(),oe.now()),r))}getDocuments(e,t){return this.remoteDocumentCache.getEntries(e,t).next(o=>this.getLocalViewOfDocuments(e,o,Y()).next(()=>o))}getLocalViewOfDocuments(e,t,o=Y()){const r=hn();return this.populateOverlays(e,r,t).next(()=>this.computeViews(e,t,r,o).next(i=>{let s=zo();return i.forEach((c,u)=>{s=s.insert(c,u.overlayedDocument)}),s}))}getOverlayedDocuments(e,t){const o=hn();return this.populateOverlays(e,o,t).next(()=>this.computeViews(e,t,o,Y()))}populateOverlays(e,t,o){const r=[];return o.forEach(i=>{t.has(i)||r.push(i)}),this.documentOverlayCache.getOverlays(e,r).next(i=>{i.forEach((s,c)=>{t.set(s,c)})})}computeViews(e,t,o,r){let i=Rt();const s=Jo(),c=function(){return Jo()}();return t.forEach((u,d)=>{const f=o.get(d.key);r.has(d.key)&&(f===void 0||f.mutation instanceof Zt)?i=i.insert(d.key,d):f!==void 0?(s.set(d.key,f.mutation.getFieldMask()),Xo(f.mutation,d,f.mutation.getFieldMask(),oe.now())):s.set(d.key,Ke.empty())}),this.recalculateAndSaveOverlays(e,i).next(u=>(u.forEach((d,f)=>s.set(d,f)),t.forEach((d,f)=>c.set(d,new Ib(f,s.get(d)??null))),c))}recalculateAndSaveOverlays(e,t){const o=Jo();let r=new le((s,c)=>s-c),i=Y();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,t).next(s=>{for(const c of s)c.keys().forEach(u=>{const d=t.get(u);if(d===null)return;let f=o.get(u)||Ke.empty();f=c.applyToLocalView(d,f),o.set(u,f);const p=(r.get(c.batchId)||Y()).add(u);r=r.insert(c.batchId,p)})}).next(()=>{const s=[],c=r.getReverseIterator();for(;c.hasNext();){const u=c.getNext(),d=u.key,f=u.value,p=Uf();f.forEach(m=>{if(!i.has(m)){const S=jf(t.get(m),o.get(m));S!==null&&p.set(m,S),i=i.add(m)}}),s.push(this.documentOverlayCache.saveOverlays(e,d,p))}return k.waitFor(s)}).next(()=>o)}recalculateAndSaveOverlaysForDocumentKeys(e,t){return this.remoteDocumentCache.getEntries(e,t).next(o=>this.recalculateAndSaveOverlays(e,o))}getDocumentsMatchingQuery(e,t,o,r){return function(s){return F.isDocumentKey(s.path)&&s.collectionGroup===null&&s.filters.length===0}(t)?this.getDocumentsMatchingDocumentQuery(e,t.path):Of(t)?this.getDocumentsMatchingCollectionGroupQuery(e,t,o,r):this.getDocumentsMatchingCollectionQuery(e,t,o,r)}getNextDocuments(e,t,o,r){return this.remoteDocumentCache.getAllFromCollectionGroup(e,t,o,r).next(i=>{const s=r-i.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,t,o.largestBatchId,r-i.size):k.resolve(hn());let c=ir,u=i;return s.next(d=>k.forEach(d,(f,p)=>(c<p.largestBatchId&&(c=p.largestBatchId),i.get(f)?k.resolve():this.remoteDocumentCache.getEntry(e,f).next(m=>{u=u.insert(f,m)}))).next(()=>this.populateOverlays(e,d,i)).next(()=>this.computeViews(e,u,d,Y())).next(f=>({batchId:c,changes:xf(f)})))})}getDocumentsMatchingDocumentQuery(e,t){return this.getDocument(e,new F(t)).next(o=>{let r=zo();return o.isFoundDocument()&&(r=r.insert(o.key,o)),r})}getDocumentsMatchingCollectionGroupQuery(e,t,o,r){const i=t.collectionGroup;let s=zo();return this.indexManager.getCollectionParents(e,i).next(c=>k.forEach(c,u=>{const d=function(p,m){return new wo(m,null,p.explicitOrderBy.slice(),p.filters.slice(),p.limit,p.limitType,p.startAt,p.endAt)}(t,u.child(i));return this.getDocumentsMatchingCollectionQuery(e,d,o,r).next(f=>{f.forEach((p,m)=>{s=s.insert(p,m)})})}).next(()=>s))}getDocumentsMatchingCollectionQuery(e,t,o,r){let i;return this.documentOverlayCache.getOverlaysForCollection(e,t.path,o.largestBatchId).next(s=>(i=s,this.remoteDocumentCache.getDocumentsMatchingQuery(e,t,o,i,r))).next(s=>{i.forEach((u,d)=>{const f=d.getKey();s.get(f)===null&&(s=s.insert(f,Le.newInvalidDocument(f)))});let c=zo();return s.forEach((u,d)=>{const f=i.get(u);f!==void 0&&Xo(f.mutation,d,Ke.empty(),oe.now()),Ji(t,d)&&(c=c.insert(u,d))}),c})}}/**
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
 */class Ab{constructor(e){this.serializer=e,this.Lr=new Map,this.kr=new Map}getBundleMetadata(e,t){return k.resolve(this.Lr.get(t))}saveBundleMetadata(e,t){return this.Lr.set(t.id,function(r){return{id:r.id,version:r.version,createTime:ht(r.createTime)}}(t)),k.resolve()}getNamedQuery(e,t){return k.resolve(this.kr.get(t))}saveNamedQuery(e,t){return this.kr.set(t.name,function(r){return{name:r.name,query:pb(r.bundledQuery),readTime:ht(r.readTime)}}(t)),k.resolve()}}/**
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
 */class Db{constructor(){this.overlays=new le(F.comparator),this.qr=new Map}getOverlay(e,t){return k.resolve(this.overlays.get(t))}getOverlays(e,t){const o=hn();return k.forEach(t,r=>this.getOverlay(e,r).next(i=>{i!==null&&o.set(r,i)})).next(()=>o)}saveOverlays(e,t,o){return o.forEach((r,i)=>{this.St(e,t,i)}),k.resolve()}removeOverlaysForBatchId(e,t,o){const r=this.qr.get(o);return r!==void 0&&(r.forEach(i=>this.overlays=this.overlays.remove(i)),this.qr.delete(o)),k.resolve()}getOverlaysForCollection(e,t,o){const r=hn(),i=t.length+1,s=new F(t.child("")),c=this.overlays.getIteratorFrom(s);for(;c.hasNext();){const u=c.getNext().value,d=u.getKey();if(!t.isPrefixOf(d.path))break;d.path.length===i&&u.largestBatchId>o&&r.set(u.getKey(),u)}return k.resolve(r)}getOverlaysForCollectionGroup(e,t,o,r){let i=new le((d,f)=>d-f);const s=this.overlays.getIterator();for(;s.hasNext();){const d=s.getNext().value;if(d.getKey().getCollectionGroup()===t&&d.largestBatchId>o){let f=i.get(d.largestBatchId);f===null&&(f=hn(),i=i.insert(d.largestBatchId,f)),f.set(d.getKey(),d)}}const c=hn(),u=i.getIterator();for(;u.hasNext()&&(u.getNext().value.forEach((d,f)=>c.set(d,f)),!(c.size()>=r)););return k.resolve(c)}St(e,t,o){const r=this.overlays.get(o.key);if(r!==null){const s=this.qr.get(r.largestBatchId).delete(o.key);this.qr.set(r.largestBatchId,s)}this.overlays=this.overlays.insert(o.key,new qE(t,o));let i=this.qr.get(t);i===void 0&&(i=Y(),this.qr.set(t,i)),this.qr.set(t,i.add(o.key))}}/**
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
 */class Cb{constructor(){this.sessionToken=Se.EMPTY_BYTE_STRING}getSessionToken(e){return k.resolve(this.sessionToken)}setSessionToken(e,t){return this.sessionToken=t,k.resolve()}}/**
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
 */class gc{constructor(){this.Qr=new Ee(be.$r),this.Ur=new Ee(be.Kr)}isEmpty(){return this.Qr.isEmpty()}addReference(e,t){const o=new be(e,t);this.Qr=this.Qr.add(o),this.Ur=this.Ur.add(o)}Wr(e,t){e.forEach(o=>this.addReference(o,t))}removeReference(e,t){this.Gr(new be(e,t))}zr(e,t){e.forEach(o=>this.removeReference(o,t))}jr(e){const t=new F(new re([])),o=new be(t,e),r=new be(t,e+1),i=[];return this.Ur.forEachInRange([o,r],s=>{this.Gr(s),i.push(s.key)}),i}Jr(){this.Qr.forEach(e=>this.Gr(e))}Gr(e){this.Qr=this.Qr.delete(e),this.Ur=this.Ur.delete(e)}Hr(e){const t=new F(new re([])),o=new be(t,e),r=new be(t,e+1);let i=Y();return this.Ur.forEachInRange([o,r],s=>{i=i.add(s.key)}),i}containsKey(e){const t=new be(e,0),o=this.Qr.firstAfterOrEqual(t);return o!==null&&e.isEqual(o.key)}}class be{constructor(e,t){this.key=e,this.Yr=t}static $r(e,t){return F.comparator(e.key,t.key)||Q(e.Yr,t.Yr)}static Kr(e,t){return Q(e.Yr,t.Yr)||F.comparator(e.key,t.key)}}/**
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
 */class Rb{constructor(e,t){this.indexManager=e,this.referenceDelegate=t,this.mutationQueue=[],this.tr=1,this.Zr=new Ee(be.$r)}checkEmpty(e){return k.resolve(this.mutationQueue.length===0)}addMutationBatch(e,t,o,r){const i=this.tr;this.tr++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const s=new zE(i,t,o,r);this.mutationQueue.push(s);for(const c of r)this.Zr=this.Zr.add(new be(c.key,i)),this.indexManager.addToCollectionParentIndex(e,c.key.path.popLast());return k.resolve(s)}lookupMutationBatch(e,t){return k.resolve(this.Xr(t))}getNextMutationBatchAfterBatchId(e,t){const o=t+1,r=this.ei(o),i=r<0?0:r;return k.resolve(this.mutationQueue.length>i?this.mutationQueue[i]:null)}getHighestUnacknowledgedBatchId(){return k.resolve(this.mutationQueue.length===0?rc:this.tr-1)}getAllMutationBatches(e){return k.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,t){const o=new be(t,0),r=new be(t,Number.POSITIVE_INFINITY),i=[];return this.Zr.forEachInRange([o,r],s=>{const c=this.Xr(s.Yr);i.push(c)}),k.resolve(i)}getAllMutationBatchesAffectingDocumentKeys(e,t){let o=new Ee(Q);return t.forEach(r=>{const i=new be(r,0),s=new be(r,Number.POSITIVE_INFINITY);this.Zr.forEachInRange([i,s],c=>{o=o.add(c.Yr)})}),k.resolve(this.ti(o))}getAllMutationBatchesAffectingQuery(e,t){const o=t.path,r=o.length+1;let i=o;F.isDocumentKey(i)||(i=i.child(""));const s=new be(new F(i),0);let c=new Ee(Q);return this.Zr.forEachWhile(u=>{const d=u.key.path;return!!o.isPrefixOf(d)&&(d.length===r&&(c=c.add(u.Yr)),!0)},s),k.resolve(this.ti(c))}ti(e){const t=[];return e.forEach(o=>{const r=this.Xr(o);r!==null&&t.push(r)}),t}removeMutationBatch(e,t){te(this.ni(t.batchId,"removed")===0,55003),this.mutationQueue.shift();let o=this.Zr;return k.forEach(t.mutations,r=>{const i=new be(r.key,t.batchId);return o=o.delete(i),this.referenceDelegate.markPotentiallyOrphaned(e,r.key)}).next(()=>{this.Zr=o})}ir(e){}containsKey(e,t){const o=new be(t,0),r=this.Zr.firstAfterOrEqual(o);return k.resolve(t.isEqual(r&&r.key))}performConsistencyCheck(e){return this.mutationQueue.length,k.resolve()}ni(e,t){return this.ei(e)}ei(e){return this.mutationQueue.length===0?0:e-this.mutationQueue[0].batchId}Xr(e){const t=this.ei(e);return t<0||t>=this.mutationQueue.length?null:this.mutationQueue[t]}}/**
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
 */class Nb{constructor(e){this.ri=e,this.docs=function(){return new le(F.comparator)}(),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,t){const o=t.key,r=this.docs.get(o),i=r?r.size:0,s=this.ri(t);return this.docs=this.docs.insert(o,{document:t.mutableCopy(),size:s}),this.size+=s-i,this.indexManager.addToCollectionParentIndex(e,o.path.popLast())}removeEntry(e){const t=this.docs.get(e);t&&(this.docs=this.docs.remove(e),this.size-=t.size)}getEntry(e,t){const o=this.docs.get(t);return k.resolve(o?o.document.mutableCopy():Le.newInvalidDocument(t))}getEntries(e,t){let o=Rt();return t.forEach(r=>{const i=this.docs.get(r);o=o.insert(r,i?i.document.mutableCopy():Le.newInvalidDocument(r))}),k.resolve(o)}getDocumentsMatchingQuery(e,t,o,r){let i=Rt();const s=t.path,c=new F(s.child("__id-9223372036854775808__")),u=this.docs.getIteratorFrom(c);for(;u.hasNext();){const{key:d,value:{document:f}}=u.getNext();if(!s.isPrefixOf(d.path))break;d.path.length>s.length+1||rE(oE(f),o)<=0||(r.has(f.key)||Ji(t,f))&&(i=i.insert(f.key,f.mutableCopy()))}return k.resolve(i)}getAllFromCollectionGroup(e,t,o,r){$(9500)}ii(e,t){return k.forEach(this.docs,o=>t(o))}newChangeBuffer(e){return new Pb(this)}getSize(e){return k.resolve(this.size)}}class Pb extends Tb{constructor(e){super(),this.Nr=e}applyChanges(e){const t=[];return this.changes.forEach((o,r)=>{r.isValidDocument()?t.push(this.Nr.addEntry(e,r)):this.Nr.removeEntry(o)}),k.waitFor(t)}getFromCache(e,t){return this.Nr.getEntry(e,t)}getAllFromCache(e,t){return this.Nr.getEntries(e,t)}}/**
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
 */class kb{constructor(e){this.persistence=e,this.si=new Sn(t=>ac(t),cc),this.lastRemoteSnapshotVersion=q.min(),this.highestTargetId=0,this.oi=0,this._i=new gc,this.targetCount=0,this.ai=to.ur()}forEachTarget(e,t){return this.si.forEach((o,r)=>t(r)),k.resolve()}getLastRemoteSnapshotVersion(e){return k.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return k.resolve(this.oi)}allocateTargetId(e){return this.highestTargetId=this.ai.next(),k.resolve(this.highestTargetId)}setTargetsMetadata(e,t,o){return o&&(this.lastRemoteSnapshotVersion=o),t>this.oi&&(this.oi=t),k.resolve()}Pr(e){this.si.set(e.target,e);const t=e.targetId;t>this.highestTargetId&&(this.ai=new to(t),this.highestTargetId=t),e.sequenceNumber>this.oi&&(this.oi=e.sequenceNumber)}addTargetData(e,t){return this.Pr(t),this.targetCount+=1,k.resolve()}updateTargetData(e,t){return this.Pr(t),k.resolve()}removeTargetData(e,t){return this.si.delete(t.target),this._i.jr(t.targetId),this.targetCount-=1,k.resolve()}removeTargets(e,t,o){let r=0;const i=[];return this.si.forEach((s,c)=>{c.sequenceNumber<=t&&o.get(c.targetId)===null&&(this.si.delete(s),i.push(this.removeMatchingKeysForTargetId(e,c.targetId)),r++)}),k.waitFor(i).next(()=>r)}getTargetCount(e){return k.resolve(this.targetCount)}getTargetData(e,t){const o=this.si.get(t)||null;return k.resolve(o)}addMatchingKeys(e,t,o){return this._i.Wr(t,o),k.resolve()}removeMatchingKeys(e,t,o){this._i.zr(t,o);const r=this.persistence.referenceDelegate,i=[];return r&&t.forEach(s=>{i.push(r.markPotentiallyOrphaned(e,s))}),k.waitFor(i)}removeMatchingKeysForTargetId(e,t){return this._i.jr(t),k.resolve()}getMatchingKeysForTargetId(e,t){const o=this._i.Hr(t);return k.resolve(o)}containsKey(e,t){return k.resolve(this._i.containsKey(t))}}/**
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
 */class rg{constructor(e,t){this.ui={},this.overlays={},this.ci=new Hi(0),this.li=!1,this.li=!0,this.hi=new Cb,this.referenceDelegate=e(this),this.Pi=new kb(this),this.indexManager=new mb,this.remoteDocumentCache=function(r){return new Nb(r)}(o=>this.referenceDelegate.Ti(o)),this.serializer=new gb(t),this.Ii=new Ab(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.li=!1,Promise.resolve()}get started(){return this.li}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let t=this.overlays[e.toKey()];return t||(t=new Db,this.overlays[e.toKey()]=t),t}getMutationQueue(e,t){let o=this.ui[e.toKey()];return o||(o=new Rb(t,this.referenceDelegate),this.ui[e.toKey()]=o),o}getGlobalsCache(){return this.hi}getTargetCache(){return this.Pi}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Ii}runTransaction(e,t,o){x("MemoryPersistence","Starting transaction:",e);const r=new Mb(this.ci.next());return this.referenceDelegate.Ei(),o(r).next(i=>this.referenceDelegate.di(r).next(()=>i)).toPromise().then(i=>(r.raiseOnCommittedEvent(),i))}Ai(e,t){return k.or(Object.values(this.ui).map(o=>()=>o.containsKey(e,t)))}}class Mb extends sE{constructor(e){super(),this.currentSequenceNumber=e}}class pc{constructor(e){this.persistence=e,this.Ri=new gc,this.Vi=null}static mi(e){return new pc(e)}get fi(){if(this.Vi)return this.Vi;throw $(60996)}addReference(e,t,o){return this.Ri.addReference(o,t),this.fi.delete(o.toString()),k.resolve()}removeReference(e,t,o){return this.Ri.removeReference(o,t),this.fi.add(o.toString()),k.resolve()}markPotentiallyOrphaned(e,t){return this.fi.add(t.toString()),k.resolve()}removeTarget(e,t){this.Ri.jr(t.targetId).forEach(r=>this.fi.add(r.toString()));const o=this.persistence.getTargetCache();return o.getMatchingKeysForTargetId(e,t.targetId).next(r=>{r.forEach(i=>this.fi.add(i.toString()))}).next(()=>o.removeTargetData(e,t))}Ei(){this.Vi=new Set}di(e){const t=this.persistence.getRemoteDocumentCache().newChangeBuffer();return k.forEach(this.fi,o=>{const r=F.fromPath(o);return this.gi(e,r).next(i=>{i||t.removeEntry(r,q.min())})}).next(()=>(this.Vi=null,t.apply(e)))}updateLimboDocument(e,t){return this.gi(e,t).next(o=>{o?this.fi.delete(t.toString()):this.fi.add(t.toString())})}Ti(e){return 0}gi(e,t){return k.or([()=>k.resolve(this.Ri.containsKey(t)),()=>this.persistence.getTargetCache().containsKey(e,t),()=>this.persistence.Ai(e,t)])}}class Ci{constructor(e,t){this.persistence=e,this.pi=new Sn(o=>lE(o.path),(o,r)=>o.isEqual(r)),this.garbageCollector=bb(this,t)}static mi(e,t){return new Ci(e,t)}Ei(){}di(e){return k.resolve()}forEachTarget(e,t){return this.persistence.getTargetCache().forEachTarget(e,t)}gr(e){const t=this.wr(e);return this.persistence.getTargetCache().getTargetCount(e).next(o=>t.next(r=>o+r))}wr(e){let t=0;return this.pr(e,o=>{t++}).next(()=>t)}pr(e,t){return k.forEach(this.pi,(o,r)=>this.br(e,o,r).next(i=>i?k.resolve():t(r)))}removeTargets(e,t,o){return this.persistence.getTargetCache().removeTargets(e,t,o)}removeOrphanedDocuments(e,t){let o=0;const r=this.persistence.getRemoteDocumentCache(),i=r.newChangeBuffer();return r.ii(e,s=>this.br(e,s,t).next(c=>{c||(o++,i.removeEntry(s,q.min()))})).next(()=>i.apply(e)).next(()=>o)}markPotentiallyOrphaned(e,t){return this.pi.set(t,e.currentSequenceNumber),k.resolve()}removeTarget(e,t){const o=t.withSequenceNumber(e.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(e,o)}addReference(e,t,o){return this.pi.set(o,e.currentSequenceNumber),k.resolve()}removeReference(e,t,o){return this.pi.set(o,e.currentSequenceNumber),k.resolve()}updateLimboDocument(e,t){return this.pi.set(t,e.currentSequenceNumber),k.resolve()}Ti(e){let t=e.key.toString().length;return e.isFoundDocument()&&(t+=li(e.data.value)),t}br(e,t,o){return k.or([()=>this.persistence.Ai(e,t),()=>this.persistence.getTargetCache().containsKey(e,t),()=>{const r=this.pi.get(t);return k.resolve(r!==void 0&&r>o)}])}getCacheSize(e){return this.persistence.getRemoteDocumentCache().getSize(e)}}/**
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
 */class mc{constructor(e,t,o,r){this.targetId=e,this.fromCache=t,this.Es=o,this.ds=r}static As(e,t){let o=Y(),r=Y();for(const i of t.docChanges)switch(i.type){case 0:o=o.add(i.doc.key);break;case 1:r=r.add(i.doc.key)}return new mc(e,t.fromCache,o,r)}}/**
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
 */class Ob{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}}/**
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
 */class Vb{constructor(){this.Rs=!1,this.Vs=!1,this.fs=100,this.gs=function(){return Aw()?8:aE(Ue())>0?6:4}()}initialize(e,t){this.ps=e,this.indexManager=t,this.Rs=!0}getDocumentsMatchingQuery(e,t,o,r){const i={result:null};return this.ys(e,t).next(s=>{i.result=s}).next(()=>{if(!i.result)return this.ws(e,t,r,o).next(s=>{i.result=s})}).next(()=>{if(i.result)return;const s=new Ob;return this.Ss(e,t,s).next(c=>{if(i.result=c,this.Vs)return this.bs(e,t,s,c.size)})}).next(()=>i.result)}bs(e,t,o,r){return o.documentReadCount<this.fs?(Bn()<=K.DEBUG&&x("QueryEngine","SDK will not create cache indexes for query:",Ln(t),"since it only creates cache indexes for collection contains","more than or equal to",this.fs,"documents"),k.resolve()):(Bn()<=K.DEBUG&&x("QueryEngine","Query:",Ln(t),"scans",o.documentReadCount,"local documents and returns",r,"documents as results."),o.documentReadCount>this.gs*r?(Bn()<=K.DEBUG&&x("QueryEngine","The SDK decides to create cache indexes for query:",Ln(t),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,dt(t))):k.resolve())}ys(e,t){if(fd(t))return k.resolve(null);let o=dt(t);return this.indexManager.getIndexType(e,o).next(r=>r===0?null:(t.limit!==null&&r===1&&(t=Aa(t,null,"F"),o=dt(t)),this.indexManager.getDocumentsMatchingTarget(e,o).next(i=>{const s=Y(...i);return this.ps.getDocuments(e,s).next(c=>this.indexManager.getMinOffset(e,o).next(u=>{const d=this.Ds(t,c);return this.Cs(t,d,s,u.readTime)?this.ys(e,Aa(t,null,"F")):this.vs(e,d,t,u)}))})))}ws(e,t,o,r){return fd(t)||r.isEqual(q.min())?k.resolve(null):this.ps.getDocuments(e,o).next(i=>{const s=this.Ds(t,i);return this.Cs(t,s,o,r)?k.resolve(null):(Bn()<=K.DEBUG&&x("QueryEngine","Re-using previous result from %s to execute query: %s",r.toString(),Ln(t)),this.vs(e,s,t,nE(r,ir)).next(c=>c))})}Ds(e,t){let o=new Ee(Bf(e));return t.forEach((r,i)=>{Ji(e,i)&&(o=o.add(i))}),o}Cs(e,t,o,r){if(e.limit===null)return!1;if(o.size!==t.size)return!0;const i=e.limitType==="F"?t.last():t.first();return!!i&&(i.hasPendingWrites||i.version.compareTo(r)>0)}Ss(e,t,o){return Bn()<=K.DEBUG&&x("QueryEngine","Using full collection scan to execute query:",Ln(t)),this.ps.getDocumentsMatchingQuery(e,t,Ht.min(),o)}vs(e,t,o,r){return this.ps.getDocumentsMatchingQuery(e,o,r).next(i=>(t.forEach(s=>{i=i.insert(s.key,s)}),i))}}/**
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
 */const wc="LocalStore",Bb=3e8;class Lb{constructor(e,t,o,r){this.persistence=e,this.Fs=t,this.serializer=r,this.Ms=new le(Q),this.xs=new Sn(i=>ac(i),cc),this.Os=new Map,this.Ns=e.getRemoteDocumentCache(),this.Pi=e.getTargetCache(),this.Ii=e.getBundleCache(),this.Bs(o)}Bs(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new Sb(this.Ns,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.Ns.setIndexManager(this.indexManager),this.Fs.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",t=>e.collect(t,this.Ms))}}function xb(n,e,t,o){return new Lb(n,e,t,o)}async function ig(n,e){const t=H(n);return await t.persistence.runTransaction("Handle user change","readonly",o=>{let r;return t.mutationQueue.getAllMutationBatches(o).next(i=>(r=i,t.Bs(e),t.mutationQueue.getAllMutationBatches(o))).next(i=>{const s=[],c=[];let u=Y();for(const d of r){s.push(d.batchId);for(const f of d.mutations)u=u.add(f.key)}for(const d of i){c.push(d.batchId);for(const f of d.mutations)u=u.add(f.key)}return t.localDocuments.getDocuments(o,u).next(d=>({Ls:d,removedBatchIds:s,addedBatchIds:c}))})})}function Ub(n,e){const t=H(n);return t.persistence.runTransaction("Acknowledge batch","readwrite-primary",o=>{const r=e.batch.keys(),i=t.Ns.newChangeBuffer({trackRemovals:!0});return function(c,u,d,f){const p=d.batch,m=p.keys();let S=k.resolve();return m.forEach(C=>{S=S.next(()=>f.getEntry(u,C)).next(M=>{const P=d.docVersions.get(C);te(P!==null,48541),M.version.compareTo(P)<0&&(p.applyToRemoteDocument(M,d),M.isValidDocument()&&(M.setReadTime(d.commitVersion),f.addEntry(M)))})}),S.next(()=>c.mutationQueue.removeMutationBatch(u,p))}(t,o,e,i).next(()=>i.apply(o)).next(()=>t.mutationQueue.performConsistencyCheck(o)).next(()=>t.documentOverlayCache.removeOverlaysForBatchId(o,r,e.batch.batchId)).next(()=>t.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(o,function(c){let u=Y();for(let d=0;d<c.mutationResults.length;++d)c.mutationResults[d].transformResults.length>0&&(u=u.add(c.batch.mutations[d].key));return u}(e))).next(()=>t.localDocuments.getDocuments(o,r))})}function sg(n){const e=H(n);return e.persistence.runTransaction("Get last remote snapshot version","readonly",t=>e.Pi.getLastRemoteSnapshotVersion(t))}function Fb(n,e){const t=H(n),o=e.snapshotVersion;let r=t.Ms;return t.persistence.runTransaction("Apply remote event","readwrite-primary",i=>{const s=t.Ns.newChangeBuffer({trackRemovals:!0});r=t.Ms;const c=[];e.targetChanges.forEach((f,p)=>{const m=r.get(p);if(!m)return;c.push(t.Pi.removeMatchingKeys(i,f.removedDocuments,p).next(()=>t.Pi.addMatchingKeys(i,f.addedDocuments,p)));let S=m.withSequenceNumber(i.currentSequenceNumber);e.targetMismatches.get(p)!==null?S=S.withResumeToken(Se.EMPTY_BYTE_STRING,q.min()).withLastLimboFreeSnapshotVersion(q.min()):f.resumeToken.approximateByteSize()>0&&(S=S.withResumeToken(f.resumeToken,o)),r=r.insert(p,S),function(M,P,U){return M.resumeToken.approximateByteSize()===0||P.snapshotVersion.toMicroseconds()-M.snapshotVersion.toMicroseconds()>=Bb?!0:U.addedDocuments.size+U.modifiedDocuments.size+U.removedDocuments.size>0}(m,S,f)&&c.push(t.Pi.updateTargetData(i,S))});let u=Rt(),d=Y();if(e.documentUpdates.forEach(f=>{e.resolvedLimboDocuments.has(f)&&c.push(t.persistence.referenceDelegate.updateLimboDocument(i,f))}),c.push($b(i,s,e.documentUpdates).next(f=>{u=f.ks,d=f.qs})),!o.isEqual(q.min())){const f=t.Pi.getLastRemoteSnapshotVersion(i).next(p=>t.Pi.setTargetsMetadata(i,i.currentSequenceNumber,o));c.push(f)}return k.waitFor(c).next(()=>s.apply(i)).next(()=>t.localDocuments.getLocalViewOfDocuments(i,u,d)).next(()=>u)}).then(i=>(t.Ms=r,i))}function $b(n,e,t){let o=Y(),r=Y();return t.forEach(i=>o=o.add(i)),e.getEntries(n,o).next(i=>{let s=Rt();return t.forEach((c,u)=>{const d=i.get(c);u.isFoundDocument()!==d.isFoundDocument()&&(r=r.add(c)),u.isNoDocument()&&u.version.isEqual(q.min())?(e.removeEntry(c,u.readTime),s=s.insert(c,u)):!d.isValidDocument()||u.version.compareTo(d.version)>0||u.version.compareTo(d.version)===0&&d.hasPendingWrites?(e.addEntry(u),s=s.insert(c,u)):x(wc,"Ignoring outdated watch update for ",c,". Current version:",d.version," Watch version:",u.version)}),{ks:s,qs:r}})}function Gb(n,e){const t=H(n);return t.persistence.runTransaction("Get next mutation batch","readonly",o=>(e===void 0&&(e=rc),t.mutationQueue.getNextMutationBatchAfterBatchId(o,e)))}function zb(n,e){const t=H(n);return t.persistence.runTransaction("Allocate target","readwrite",o=>{let r;return t.Pi.getTargetData(o,e).next(i=>i?(r=i,k.resolve(r)):t.Pi.allocateTargetId(o).next(s=>(r=new Ft(e,s,"TargetPurposeListen",o.currentSequenceNumber),t.Pi.addTargetData(o,r).next(()=>r))))}).then(o=>{const r=t.Ms.get(o.targetId);return(r===null||o.snapshotVersion.compareTo(r.snapshotVersion)>0)&&(t.Ms=t.Ms.insert(o.targetId,o),t.xs.set(e,o.targetId)),o})}async function Pa(n,e,t){const o=H(n),r=o.Ms.get(e),i=t?"readwrite":"readwrite-primary";try{t||await o.persistence.runTransaction("Release target",i,s=>o.persistence.referenceDelegate.removeTarget(s,r))}catch(s){if(!mo(s))throw s;x(wc,`Failed to update sequence numbers for target ${e}: ${s}`)}o.Ms=o.Ms.remove(e),o.xs.delete(r.target)}function Ad(n,e,t){const o=H(n);let r=q.min(),i=Y();return o.persistence.runTransaction("Execute query","readwrite",s=>function(u,d,f){const p=H(u),m=p.xs.get(f);return m!==void 0?k.resolve(p.Ms.get(m)):p.Pi.getTargetData(d,f)}(o,s,dt(e)).next(c=>{if(c)return r=c.lastLimboFreeSnapshotVersion,o.Pi.getMatchingKeysForTargetId(s,c.targetId).next(u=>{i=u})}).next(()=>o.Fs.getDocumentsMatchingQuery(s,e,t?r:q.min(),t?i:Y())).next(c=>(qb(o,CE(e),c),{documents:c,Qs:i})))}function qb(n,e,t){let o=n.Os.get(e)||q.min();t.forEach((r,i)=>{i.readTime.compareTo(o)>0&&(o=i.readTime)}),n.Os.set(e,o)}class Dd{constructor(){this.activeTargetIds=OE()}zs(e){this.activeTargetIds=this.activeTargetIds.add(e)}js(e){this.activeTargetIds=this.activeTargetIds.delete(e)}Gs(){const e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class jb{constructor(){this.Mo=new Dd,this.xo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,t,o){}addLocalQueryTarget(e,t=!0){return t&&this.Mo.zs(e),this.xo[e]||"not-current"}updateQueryState(e,t,o){this.xo[e]=t}removeLocalQueryTarget(e){this.Mo.js(e)}isLocalQueryTarget(e){return this.Mo.activeTargetIds.has(e)}clearQueryState(e){delete this.xo[e]}getAllActiveQueryTargets(){return this.Mo.activeTargetIds}isActiveQueryTarget(e){return this.Mo.activeTargetIds.has(e)}start(){return this.Mo=new Dd,Promise.resolve()}handleUserChange(e,t,o){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}/**
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
 */class Hb{Oo(e){}shutdown(){}}/**
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
 */const Cd="ConnectivityMonitor";class Rd{constructor(){this.No=()=>this.Bo(),this.Lo=()=>this.ko(),this.qo=[],this.Qo()}Oo(e){this.qo.push(e)}shutdown(){window.removeEventListener("online",this.No),window.removeEventListener("offline",this.Lo)}Qo(){window.addEventListener("online",this.No),window.addEventListener("offline",this.Lo)}Bo(){x(Cd,"Network connectivity changed: AVAILABLE");for(const e of this.qo)e(0)}ko(){x(Cd,"Network connectivity changed: UNAVAILABLE");for(const e of this.qo)e(1)}static v(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
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
 */let Zr=null;function ka(){return Zr===null?Zr=function(){return 268435456+Math.round(2147483648*Math.random())}():Zr++,"0x"+Zr.toString(16)}/**
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
 */const ea="RestConnection",Wb={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};class Kb{get $o(){return!1}constructor(e){this.databaseInfo=e,this.databaseId=e.databaseId;const t=e.ssl?"https":"http",o=encodeURIComponent(this.databaseId.projectId),r=encodeURIComponent(this.databaseId.database);this.Uo=t+"://"+e.host,this.Ko=`projects/${o}/databases/${r}`,this.Wo=this.databaseId.database===Ti?`project_id=${o}`:`project_id=${o}&database_id=${r}`}Go(e,t,o,r,i){const s=ka(),c=this.zo(e,t.toUriEncodedString());x(ea,`Sending RPC '${e}' ${s}:`,c,o);const u={"google-cloud-resource-prefix":this.Ko,"x-goog-request-params":this.Wo};this.jo(u,r,i);const{host:d}=new URL(c),f=uo(d);return this.Jo(e,c,u,o,f).then(p=>(x(ea,`Received RPC '${e}' ${s}: `,p),p),p=>{throw _n(ea,`RPC '${e}' ${s} failed with error: `,p,"url: ",c,"request:",o),p})}Ho(e,t,o,r,i,s){return this.Go(e,t,o,r,i)}jo(e,t,o){e["X-Goog-Api-Client"]=function(){return"gl-js/ fire/"+go}(),e["Content-Type"]="text/plain",this.databaseInfo.appId&&(e["X-Firebase-GMPID"]=this.databaseInfo.appId),t&&t.headers.forEach((r,i)=>e[i]=r),o&&o.headers.forEach((r,i)=>e[i]=r)}zo(e,t){const o=Wb[e];return`${this.Uo}/v1/${t}:${o}`}terminate(){}}/**
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
 */class Qb{constructor(e){this.Yo=e.Yo,this.Zo=e.Zo}Xo(e){this.e_=e}t_(e){this.n_=e}r_(e){this.i_=e}onMessage(e){this.s_=e}close(){this.Zo()}send(e){this.Yo(e)}o_(){this.e_()}__(){this.n_()}a_(e){this.i_(e)}u_(e){this.s_(e)}}/**
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
 */const Ve="WebChannelConnection";class Yb extends Kb{constructor(e){super(e),this.c_=[],this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}Jo(e,t,o,r,i){const s=ka();return new Promise((c,u)=>{const d=new af;d.setWithCredentials(!0),d.listenOnce(cf.COMPLETE,()=>{try{switch(d.getLastErrorCode()){case ci.NO_ERROR:const p=d.getResponseJson();x(Ve,`XHR for RPC '${e}' ${s} received:`,JSON.stringify(p)),c(p);break;case ci.TIMEOUT:x(Ve,`RPC '${e}' ${s} timed out`),u(new L(N.DEADLINE_EXCEEDED,"Request time out"));break;case ci.HTTP_ERROR:const m=d.getStatus();if(x(Ve,`RPC '${e}' ${s} failed with status:`,m,"response text:",d.getResponseText()),m>0){let S=d.getResponseJson();Array.isArray(S)&&(S=S[0]);const C=S?.error;if(C&&C.status&&C.message){const M=function(U){const G=U.toLowerCase().replace(/_/g,"-");return Object.values(N).indexOf(G)>=0?G:N.UNKNOWN}(C.status);u(new L(M,C.message))}else u(new L(N.UNKNOWN,"Server responded with status "+d.getStatus()))}else u(new L(N.UNAVAILABLE,"Connection failed."));break;default:$(9055,{l_:e,streamId:s,h_:d.getLastErrorCode(),P_:d.getLastError()})}}finally{x(Ve,`RPC '${e}' ${s} completed.`)}});const f=JSON.stringify(r);x(Ve,`RPC '${e}' ${s} sending request:`,r),d.send(t,"POST",f,o,15)})}T_(e,t,o){const r=ka(),i=[this.Uo,"/","google.firestore.v1.Firestore","/",e,"/channel"],s=df(),c=uf(),u={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},d=this.longPollingOptions.timeoutSeconds;d!==void 0&&(u.longPollingTimeout=Math.round(1e3*d)),this.useFetchStreams&&(u.useFetchStreams=!0),this.jo(u.initMessageHeaders,t,o),u.encodeInitMessageHeaders=!0;const f=i.join("");x(Ve,`Creating RPC '${e}' stream ${r}: ${f}`,u);const p=s.createWebChannel(f,u);this.I_(p);let m=!1,S=!1;const C=new Qb({Yo:P=>{S?x(Ve,`Not sending because RPC '${e}' stream ${r} is closed:`,P):(m||(x(Ve,`Opening RPC '${e}' stream ${r} transport.`),p.open(),m=!0),x(Ve,`RPC '${e}' stream ${r} sending:`,P),p.send(P))},Zo:()=>p.close()}),M=(P,U,G)=>{P.listen(U,W=>{try{G(W)}catch(ue){setTimeout(()=>{throw ue},0)}})};return M(p,Go.EventType.OPEN,()=>{S||(x(Ve,`RPC '${e}' stream ${r} transport opened.`),C.o_())}),M(p,Go.EventType.CLOSE,()=>{S||(S=!0,x(Ve,`RPC '${e}' stream ${r} transport closed`),C.a_(),this.E_(p))}),M(p,Go.EventType.ERROR,P=>{S||(S=!0,_n(Ve,`RPC '${e}' stream ${r} transport errored. Name:`,P.name,"Message:",P.message),C.a_(new L(N.UNAVAILABLE,"The operation could not be completed")))}),M(p,Go.EventType.MESSAGE,P=>{if(!S){const U=P.data[0];te(!!U,16349);const G=U,W=G?.error||G[0]?.error;if(W){x(Ve,`RPC '${e}' stream ${r} received error:`,W);const ue=W.status;let Ne=function(w){const _=we[w];if(_!==void 0)return Wf(_)}(ue),ie=W.message;Ne===void 0&&(Ne=N.INTERNAL,ie="Unknown error status: "+ue+" with message "+W.message),S=!0,C.a_(new L(Ne,ie)),p.close()}else x(Ve,`RPC '${e}' stream ${r} received:`,U),C.u_(U)}}),M(c,lf.STAT_EVENT,P=>{P.stat===_a.PROXY?x(Ve,`RPC '${e}' stream ${r} detected buffering proxy`):P.stat===_a.NOPROXY&&x(Ve,`RPC '${e}' stream ${r} detected no buffering proxy`)}),setTimeout(()=>{C.__()},0),C}terminate(){this.c_.forEach(e=>e.close()),this.c_=[]}I_(e){this.c_.push(e)}E_(e){this.c_=this.c_.filter(t=>t===e)}}function ta(){return typeof document<"u"?document:null}/**
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
 */function ns(n){return new ZE(n,!0)}/**
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
 */class ag{constructor(e,t,o=1e3,r=1.5,i=6e4){this.Mi=e,this.timerId=t,this.d_=o,this.A_=r,this.R_=i,this.V_=0,this.m_=null,this.f_=Date.now(),this.reset()}reset(){this.V_=0}g_(){this.V_=this.R_}p_(e){this.cancel();const t=Math.floor(this.V_+this.y_()),o=Math.max(0,Date.now()-this.f_),r=Math.max(0,t-o);r>0&&x("ExponentialBackoff",`Backing off for ${r} ms (base delay: ${this.V_} ms, delay with jitter: ${t} ms, last attempt: ${o} ms ago)`),this.m_=this.Mi.enqueueAfterDelay(this.timerId,r,()=>(this.f_=Date.now(),e())),this.V_*=this.A_,this.V_<this.d_&&(this.V_=this.d_),this.V_>this.R_&&(this.V_=this.R_)}w_(){this.m_!==null&&(this.m_.skipDelay(),this.m_=null)}cancel(){this.m_!==null&&(this.m_.cancel(),this.m_=null)}y_(){return(Math.random()-.5)*this.V_}}/**
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
 */const Nd="PersistentStream";class cg{constructor(e,t,o,r,i,s,c,u){this.Mi=e,this.S_=o,this.b_=r,this.connection=i,this.authCredentialsProvider=s,this.appCheckCredentialsProvider=c,this.listener=u,this.state=0,this.D_=0,this.C_=null,this.v_=null,this.stream=null,this.F_=0,this.M_=new ag(e,t)}x_(){return this.state===1||this.state===5||this.O_()}O_(){return this.state===2||this.state===3}start(){this.F_=0,this.state!==4?this.auth():this.N_()}async stop(){this.x_()&&await this.close(0)}B_(){this.state=0,this.M_.reset()}L_(){this.O_()&&this.C_===null&&(this.C_=this.Mi.enqueueAfterDelay(this.S_,6e4,()=>this.k_()))}q_(e){this.Q_(),this.stream.send(e)}async k_(){if(this.O_())return this.close(0)}Q_(){this.C_&&(this.C_.cancel(),this.C_=null)}U_(){this.v_&&(this.v_.cancel(),this.v_=null)}async close(e,t){this.Q_(),this.U_(),this.M_.cancel(),this.D_++,e!==4?this.M_.reset():t&&t.code===N.RESOURCE_EXHAUSTED?(Ct(t.toString()),Ct("Using maximum backoff delay to prevent overloading the backend."),this.M_.g_()):t&&t.code===N.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.K_(),this.stream.close(),this.stream=null),this.state=e,await this.listener.r_(t)}K_(){}auth(){this.state=1;const e=this.W_(this.D_),t=this.D_;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([o,r])=>{this.D_===t&&this.G_(o,r)},o=>{e(()=>{const r=new L(N.UNKNOWN,"Fetching auth token failed: "+o.message);return this.z_(r)})})}G_(e,t){const o=this.W_(this.D_);this.stream=this.j_(e,t),this.stream.Xo(()=>{o(()=>this.listener.Xo())}),this.stream.t_(()=>{o(()=>(this.state=2,this.v_=this.Mi.enqueueAfterDelay(this.b_,1e4,()=>(this.O_()&&(this.state=3),Promise.resolve())),this.listener.t_()))}),this.stream.r_(r=>{o(()=>this.z_(r))}),this.stream.onMessage(r=>{o(()=>++this.F_==1?this.J_(r):this.onNext(r))})}N_(){this.state=5,this.M_.p_(async()=>{this.state=0,this.start()})}z_(e){return x(Nd,`close with error: ${e}`),this.stream=null,this.close(4,e)}W_(e){return t=>{this.Mi.enqueueAndForget(()=>this.D_===e?t():(x(Nd,"stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}}class Jb extends cg{constructor(e,t,o,r,i,s){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",t,o,r,s),this.serializer=i}j_(e,t){return this.connection.T_("Listen",e,t)}J_(e){return this.onNext(e)}onNext(e){this.M_.reset();const t=nb(this.serializer,e),o=function(i){if(!("targetChange"in i))return q.min();const s=i.targetChange;return s.targetIds&&s.targetIds.length?q.min():s.readTime?ht(s.readTime):q.min()}(e);return this.listener.H_(t,o)}Y_(e){const t={};t.database=Na(this.serializer),t.addTarget=function(i,s){let c;const u=s.target;if(c=Ia(u)?{documents:ib(i,u)}:{query:sb(i,u).ft},c.targetId=s.targetId,s.resumeToken.approximateByteSize()>0){c.resumeToken=Yf(i,s.resumeToken);const d=Da(i,s.expectedCount);d!==null&&(c.expectedCount=d)}else if(s.snapshotVersion.compareTo(q.min())>0){c.readTime=Di(i,s.snapshotVersion.toTimestamp());const d=Da(i,s.expectedCount);d!==null&&(c.expectedCount=d)}return c}(this.serializer,e);const o=cb(this.serializer,e);o&&(t.labels=o),this.q_(t)}Z_(e){const t={};t.database=Na(this.serializer),t.removeTarget=e,this.q_(t)}}class Xb extends cg{constructor(e,t,o,r,i,s){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",t,o,r,s),this.serializer=i}get X_(){return this.F_>0}start(){this.lastStreamToken=void 0,super.start()}K_(){this.X_&&this.ea([])}j_(e,t){return this.connection.T_("Write",e,t)}J_(e){return te(!!e.streamToken,31322),this.lastStreamToken=e.streamToken,te(!e.writeResults||e.writeResults.length===0,55816),this.listener.ta()}onNext(e){te(!!e.streamToken,12678),this.lastStreamToken=e.streamToken,this.M_.reset();const t=rb(e.writeResults,e.commitTime),o=ht(e.commitTime);return this.listener.na(o,t)}ra(){const e={};e.database=Na(this.serializer),this.q_(e)}ea(e){const t={streamToken:this.lastStreamToken,writes:e.map(o=>ob(this.serializer,o))};this.q_(t)}}/**
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
 */class Zb{}class eT extends Zb{constructor(e,t,o,r){super(),this.authCredentials=e,this.appCheckCredentials=t,this.connection=o,this.serializer=r,this.ia=!1}sa(){if(this.ia)throw new L(N.FAILED_PRECONDITION,"The client has already been terminated.")}Go(e,t,o,r){return this.sa(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([i,s])=>this.connection.Go(e,Ca(t,o),r,i,s)).catch(i=>{throw i.name==="FirebaseError"?(i.code===N.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),i):new L(N.UNKNOWN,i.toString())})}Ho(e,t,o,r,i){return this.sa(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([s,c])=>this.connection.Ho(e,Ca(t,o),r,s,c,i)).catch(s=>{throw s.name==="FirebaseError"?(s.code===N.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),s):new L(N.UNKNOWN,s.toString())})}terminate(){this.ia=!0,this.connection.terminate()}}class tT{constructor(e,t){this.asyncQueue=e,this.onlineStateHandler=t,this.state="Unknown",this.oa=0,this._a=null,this.aa=!0}ua(){this.oa===0&&(this.ca("Unknown"),this._a=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this._a=null,this.la("Backend didn't respond within 10 seconds."),this.ca("Offline"),Promise.resolve())))}ha(e){this.state==="Online"?this.ca("Unknown"):(this.oa++,this.oa>=1&&(this.Pa(),this.la(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.ca("Offline")))}set(e){this.Pa(),this.oa=0,e==="Online"&&(this.aa=!1),this.ca(e)}ca(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}la(e){const t=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.aa?(Ct(t),this.aa=!1):x("OnlineStateTracker",t)}Pa(){this._a!==null&&(this._a.cancel(),this._a=null)}}/**
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
 */const vn="RemoteStore";class nT{constructor(e,t,o,r,i){this.localStore=e,this.datastore=t,this.asyncQueue=o,this.remoteSyncer={},this.Ta=[],this.Ia=new Map,this.Ea=new Set,this.da=[],this.Aa=i,this.Aa.Oo(s=>{o.enqueueAndForget(async()=>{An(this)&&(x(vn,"Restarting streams for network reachability change."),await async function(u){const d=H(u);d.Ea.add(4),await yr(d),d.Ra.set("Unknown"),d.Ea.delete(4),await os(d)}(this))})}),this.Ra=new tT(o,r)}}async function os(n){if(An(n))for(const e of n.da)await e(!0)}async function yr(n){for(const e of n.da)await e(!1)}function lg(n,e){const t=H(n);t.Ia.has(e.targetId)||(t.Ia.set(e.targetId,e),Ec(t)?vc(t):yo(t).O_()&&_c(t,e))}function yc(n,e){const t=H(n),o=yo(t);t.Ia.delete(e),o.O_()&&ug(t,e),t.Ia.size===0&&(o.O_()?o.L_():An(t)&&t.Ra.set("Unknown"))}function _c(n,e){if(n.Va.Ue(e.targetId),e.resumeToken.approximateByteSize()>0||e.snapshotVersion.compareTo(q.min())>0){const t=n.remoteSyncer.getRemoteKeysForTarget(e.targetId).size;e=e.withExpectedCount(t)}yo(n).Y_(e)}function ug(n,e){n.Va.Ue(e),yo(n).Z_(e)}function vc(n){n.Va=new QE({getRemoteKeysForTarget:e=>n.remoteSyncer.getRemoteKeysForTarget(e),At:e=>n.Ia.get(e)||null,ht:()=>n.datastore.serializer.databaseId}),yo(n).start(),n.Ra.ua()}function Ec(n){return An(n)&&!yo(n).x_()&&n.Ia.size>0}function An(n){return H(n).Ea.size===0}function dg(n){n.Va=void 0}async function oT(n){n.Ra.set("Online")}async function rT(n){n.Ia.forEach((e,t)=>{_c(n,e)})}async function iT(n,e){dg(n),Ec(n)?(n.Ra.ha(e),vc(n)):n.Ra.set("Unknown")}async function sT(n,e,t){if(n.Ra.set("Online"),e instanceof Qf&&e.state===2&&e.cause)try{await async function(r,i){const s=i.cause;for(const c of i.targetIds)r.Ia.has(c)&&(await r.remoteSyncer.rejectListen(c,s),r.Ia.delete(c),r.Va.removeTarget(c))}(n,e)}catch(o){x(vn,"Failed to remove targets %s: %s ",e.targetIds.join(","),o),await Ri(n,o)}else if(e instanceof hi?n.Va.Ze(e):e instanceof Kf?n.Va.st(e):n.Va.tt(e),!t.isEqual(q.min()))try{const o=await sg(n.localStore);t.compareTo(o)>=0&&await function(i,s){const c=i.Va.Tt(s);return c.targetChanges.forEach((u,d)=>{if(u.resumeToken.approximateByteSize()>0){const f=i.Ia.get(d);f&&i.Ia.set(d,f.withResumeToken(u.resumeToken,s))}}),c.targetMismatches.forEach((u,d)=>{const f=i.Ia.get(u);if(!f)return;i.Ia.set(u,f.withResumeToken(Se.EMPTY_BYTE_STRING,f.snapshotVersion)),ug(i,u);const p=new Ft(f.target,u,d,f.sequenceNumber);_c(i,p)}),i.remoteSyncer.applyRemoteEvent(c)}(n,t)}catch(o){x(vn,"Failed to raise snapshot:",o),await Ri(n,o)}}async function Ri(n,e,t){if(!mo(e))throw e;n.Ea.add(1),await yr(n),n.Ra.set("Offline"),t||(t=()=>sg(n.localStore)),n.asyncQueue.enqueueRetryable(async()=>{x(vn,"Retrying IndexedDB access"),await t(),n.Ea.delete(1),await os(n)})}function hg(n,e){return e().catch(t=>Ri(n,t,e))}async function rs(n){const e=H(n),t=Yt(e);let o=e.Ta.length>0?e.Ta[e.Ta.length-1].batchId:rc;for(;aT(e);)try{const r=await Gb(e.localStore,o);if(r===null){e.Ta.length===0&&t.L_();break}o=r.batchId,cT(e,r)}catch(r){await Ri(e,r)}fg(e)&&gg(e)}function aT(n){return An(n)&&n.Ta.length<10}function cT(n,e){n.Ta.push(e);const t=Yt(n);t.O_()&&t.X_&&t.ea(e.mutations)}function fg(n){return An(n)&&!Yt(n).x_()&&n.Ta.length>0}function gg(n){Yt(n).start()}async function lT(n){Yt(n).ra()}async function uT(n){const e=Yt(n);for(const t of n.Ta)e.ea(t.mutations)}async function dT(n,e,t){const o=n.Ta.shift(),r=dc.from(o,e,t);await hg(n,()=>n.remoteSyncer.applySuccessfulWrite(r)),await rs(n)}async function hT(n,e){e&&Yt(n).X_&&await async function(o,r){if(function(s){return HE(s)&&s!==N.ABORTED}(r.code)){const i=o.Ta.shift();Yt(o).B_(),await hg(o,()=>o.remoteSyncer.rejectFailedWrite(i.batchId,r)),await rs(o)}}(n,e),fg(n)&&gg(n)}async function Pd(n,e){const t=H(n);t.asyncQueue.verifyOperationInProgress(),x(vn,"RemoteStore received new credentials");const o=An(t);t.Ea.add(3),await yr(t),o&&t.Ra.set("Unknown"),await t.remoteSyncer.handleCredentialChange(e),t.Ea.delete(3),await os(t)}async function fT(n,e){const t=H(n);e?(t.Ea.delete(2),await os(t)):e||(t.Ea.add(2),await yr(t),t.Ra.set("Unknown"))}function yo(n){return n.ma||(n.ma=function(t,o,r){const i=H(t);return i.sa(),new Jb(o,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,r)}(n.datastore,n.asyncQueue,{Xo:oT.bind(null,n),t_:rT.bind(null,n),r_:iT.bind(null,n),H_:sT.bind(null,n)}),n.da.push(async e=>{e?(n.ma.B_(),Ec(n)?vc(n):n.Ra.set("Unknown")):(await n.ma.stop(),dg(n))})),n.ma}function Yt(n){return n.fa||(n.fa=function(t,o,r){const i=H(t);return i.sa(),new Xb(o,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,r)}(n.datastore,n.asyncQueue,{Xo:()=>Promise.resolve(),t_:lT.bind(null,n),r_:hT.bind(null,n),ta:uT.bind(null,n),na:dT.bind(null,n)}),n.da.push(async e=>{e?(n.fa.B_(),await rs(n)):(await n.fa.stop(),n.Ta.length>0&&(x(vn,`Stopping write stream with ${n.Ta.length} pending writes`),n.Ta=[]))})),n.fa}/**
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
 */class bc{constructor(e,t,o,r,i){this.asyncQueue=e,this.timerId=t,this.targetTimeMs=o,this.op=r,this.removalCallback=i,this.deferred=new It,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(s=>{})}get promise(){return this.deferred.promise}static createAndSchedule(e,t,o,r,i){const s=Date.now()+o,c=new bc(e,t,s,r,i);return c.start(o),c}start(e){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new L(N.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then(e=>this.deferred.resolve(e))):Promise.resolve())}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function Tc(n,e){if(Ct("AsyncQueue",`${e}: ${n}`),mo(n))return new L(N.UNAVAILABLE,`${e}: ${n}`);throw n}/**
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
 */class qn{static emptySet(e){return new qn(e.comparator)}constructor(e){this.comparator=e?(t,o)=>e(t,o)||F.comparator(t.key,o.key):(t,o)=>F.comparator(t.key,o.key),this.keyedMap=zo(),this.sortedSet=new le(this.comparator)}has(e){return this.keyedMap.get(e)!=null}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){const t=this.keyedMap.get(e);return t?this.sortedSet.indexOf(t):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal((t,o)=>(e(t),!1))}add(e){const t=this.delete(e.key);return t.copy(t.keyedMap.insert(e.key,e),t.sortedSet.insert(e,null))}delete(e){const t=this.get(e);return t?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(t)):this}isEqual(e){if(!(e instanceof qn)||this.size!==e.size)return!1;const t=this.sortedSet.getIterator(),o=e.sortedSet.getIterator();for(;t.hasNext();){const r=t.getNext().key,i=o.getNext().key;if(!r.isEqual(i))return!1}return!0}toString(){const e=[];return this.forEach(t=>{e.push(t.toString())}),e.length===0?"DocumentSet ()":`DocumentSet (
  `+e.join(`  
`)+`
)`}copy(e,t){const o=new qn;return o.comparator=this.comparator,o.keyedMap=e,o.sortedSet=t,o}}/**
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
 */class kd{constructor(){this.ga=new le(F.comparator)}track(e){const t=e.doc.key,o=this.ga.get(t);o?e.type!==0&&o.type===3?this.ga=this.ga.insert(t,e):e.type===3&&o.type!==1?this.ga=this.ga.insert(t,{type:o.type,doc:e.doc}):e.type===2&&o.type===2?this.ga=this.ga.insert(t,{type:2,doc:e.doc}):e.type===2&&o.type===0?this.ga=this.ga.insert(t,{type:0,doc:e.doc}):e.type===1&&o.type===0?this.ga=this.ga.remove(t):e.type===1&&o.type===2?this.ga=this.ga.insert(t,{type:1,doc:o.doc}):e.type===0&&o.type===1?this.ga=this.ga.insert(t,{type:2,doc:e.doc}):$(63341,{Rt:e,pa:o}):this.ga=this.ga.insert(t,e)}ya(){const e=[];return this.ga.inorderTraversal((t,o)=>{e.push(o)}),e}}class no{constructor(e,t,o,r,i,s,c,u,d){this.query=e,this.docs=t,this.oldDocs=o,this.docChanges=r,this.mutatedKeys=i,this.fromCache=s,this.syncStateChanged=c,this.excludesMetadataChanges=u,this.hasCachedResults=d}static fromInitialDocuments(e,t,o,r,i){const s=[];return t.forEach(c=>{s.push({type:0,doc:c})}),new no(e,t,qn.emptySet(t),s,o,r,!0,!1,i)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&Yi(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;const t=this.docChanges,o=e.docChanges;if(t.length!==o.length)return!1;for(let r=0;r<t.length;r++)if(t[r].type!==o[r].type||!t[r].doc.isEqual(o[r].doc))return!1;return!0}}/**
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
 */class gT{constructor(){this.wa=void 0,this.Sa=[]}ba(){return this.Sa.some(e=>e.Da())}}class pT{constructor(){this.queries=Md(),this.onlineState="Unknown",this.Ca=new Set}terminate(){(function(t,o){const r=H(t),i=r.queries;r.queries=Md(),i.forEach((s,c)=>{for(const u of c.Sa)u.onError(o)})})(this,new L(N.ABORTED,"Firestore shutting down"))}}function Md(){return new Sn(n=>Vf(n),Yi)}async function Ic(n,e){const t=H(n);let o=3;const r=e.query;let i=t.queries.get(r);i?!i.ba()&&e.Da()&&(o=2):(i=new gT,o=e.Da()?0:1);try{switch(o){case 0:i.wa=await t.onListen(r,!0);break;case 1:i.wa=await t.onListen(r,!1);break;case 2:await t.onFirstRemoteStoreListen(r)}}catch(s){const c=Tc(s,`Initialization of query '${Ln(e.query)}' failed`);return void e.onError(c)}t.queries.set(r,i),i.Sa.push(e),e.va(t.onlineState),i.wa&&e.Fa(i.wa)&&Ac(t)}async function Sc(n,e){const t=H(n),o=e.query;let r=3;const i=t.queries.get(o);if(i){const s=i.Sa.indexOf(e);s>=0&&(i.Sa.splice(s,1),i.Sa.length===0?r=e.Da()?0:1:!i.ba()&&e.Da()&&(r=2))}switch(r){case 0:return t.queries.delete(o),t.onUnlisten(o,!0);case 1:return t.queries.delete(o),t.onUnlisten(o,!1);case 2:return t.onLastRemoteStoreUnlisten(o);default:return}}function mT(n,e){const t=H(n);let o=!1;for(const r of e){const i=r.query,s=t.queries.get(i);if(s){for(const c of s.Sa)c.Fa(r)&&(o=!0);s.wa=r}}o&&Ac(t)}function wT(n,e,t){const o=H(n),r=o.queries.get(e);if(r)for(const i of r.Sa)i.onError(t);o.queries.delete(e)}function Ac(n){n.Ca.forEach(e=>{e.next()})}var Ma,Od;(Od=Ma||(Ma={})).Ma="default",Od.Cache="cache";class Dc{constructor(e,t,o){this.query=e,this.xa=t,this.Oa=!1,this.Na=null,this.onlineState="Unknown",this.options=o||{}}Fa(e){if(!this.options.includeMetadataChanges){const o=[];for(const r of e.docChanges)r.type!==3&&o.push(r);e=new no(e.query,e.docs,e.oldDocs,o,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let t=!1;return this.Oa?this.Ba(e)&&(this.xa.next(e),t=!0):this.La(e,this.onlineState)&&(this.ka(e),t=!0),this.Na=e,t}onError(e){this.xa.error(e)}va(e){this.onlineState=e;let t=!1;return this.Na&&!this.Oa&&this.La(this.Na,e)&&(this.ka(this.Na),t=!0),t}La(e,t){if(!e.fromCache||!this.Da())return!0;const o=t!=="Offline";return(!this.options.qa||!o)&&(!e.docs.isEmpty()||e.hasCachedResults||t==="Offline")}Ba(e){if(e.docChanges.length>0)return!0;const t=this.Na&&this.Na.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!t)&&this.options.includeMetadataChanges===!0}ka(e){e=no.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.Oa=!0,this.xa.next(e)}Da(){return this.options.source!==Ma.Cache}}/**
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
 */class pg{constructor(e){this.key=e}}class mg{constructor(e){this.key=e}}class yT{constructor(e,t){this.query=e,this.Ya=t,this.Za=null,this.hasCachedResults=!1,this.current=!1,this.Xa=Y(),this.mutatedKeys=Y(),this.eu=Bf(e),this.tu=new qn(this.eu)}get nu(){return this.Ya}ru(e,t){const o=t?t.iu:new kd,r=t?t.tu:this.tu;let i=t?t.mutatedKeys:this.mutatedKeys,s=r,c=!1;const u=this.query.limitType==="F"&&r.size===this.query.limit?r.last():null,d=this.query.limitType==="L"&&r.size===this.query.limit?r.first():null;if(e.inorderTraversal((f,p)=>{const m=r.get(f),S=Ji(this.query,p)?p:null,C=!!m&&this.mutatedKeys.has(m.key),M=!!S&&(S.hasLocalMutations||this.mutatedKeys.has(S.key)&&S.hasCommittedMutations);let P=!1;m&&S?m.data.isEqual(S.data)?C!==M&&(o.track({type:3,doc:S}),P=!0):this.su(m,S)||(o.track({type:2,doc:S}),P=!0,(u&&this.eu(S,u)>0||d&&this.eu(S,d)<0)&&(c=!0)):!m&&S?(o.track({type:0,doc:S}),P=!0):m&&!S&&(o.track({type:1,doc:m}),P=!0,(u||d)&&(c=!0)),P&&(S?(s=s.add(S),i=M?i.add(f):i.delete(f)):(s=s.delete(f),i=i.delete(f)))}),this.query.limit!==null)for(;s.size>this.query.limit;){const f=this.query.limitType==="F"?s.last():s.first();s=s.delete(f.key),i=i.delete(f.key),o.track({type:1,doc:f})}return{tu:s,iu:o,Cs:c,mutatedKeys:i}}su(e,t){return e.hasLocalMutations&&t.hasCommittedMutations&&!t.hasLocalMutations}applyChanges(e,t,o,r){const i=this.tu;this.tu=e.tu,this.mutatedKeys=e.mutatedKeys;const s=e.iu.ya();s.sort((f,p)=>function(S,C){const M=P=>{switch(P){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return $(20277,{Rt:P})}};return M(S)-M(C)}(f.type,p.type)||this.eu(f.doc,p.doc)),this.ou(o),r=r??!1;const c=t&&!r?this._u():[],u=this.Xa.size===0&&this.current&&!r?1:0,d=u!==this.Za;return this.Za=u,s.length!==0||d?{snapshot:new no(this.query,e.tu,i,s,e.mutatedKeys,u===0,d,!1,!!o&&o.resumeToken.approximateByteSize()>0),au:c}:{au:c}}va(e){return this.current&&e==="Offline"?(this.current=!1,this.applyChanges({tu:this.tu,iu:new kd,mutatedKeys:this.mutatedKeys,Cs:!1},!1)):{au:[]}}uu(e){return!this.Ya.has(e)&&!!this.tu.has(e)&&!this.tu.get(e).hasLocalMutations}ou(e){e&&(e.addedDocuments.forEach(t=>this.Ya=this.Ya.add(t)),e.modifiedDocuments.forEach(t=>{}),e.removedDocuments.forEach(t=>this.Ya=this.Ya.delete(t)),this.current=e.current)}_u(){if(!this.current)return[];const e=this.Xa;this.Xa=Y(),this.tu.forEach(o=>{this.uu(o.key)&&(this.Xa=this.Xa.add(o.key))});const t=[];return e.forEach(o=>{this.Xa.has(o)||t.push(new mg(o))}),this.Xa.forEach(o=>{e.has(o)||t.push(new pg(o))}),t}cu(e){this.Ya=e.Qs,this.Xa=Y();const t=this.ru(e.documents);return this.applyChanges(t,!0)}lu(){return no.fromInitialDocuments(this.query,this.tu,this.mutatedKeys,this.Za===0,this.hasCachedResults)}}const Cc="SyncEngine";class _T{constructor(e,t,o){this.query=e,this.targetId=t,this.view=o}}class vT{constructor(e){this.key=e,this.hu=!1}}class ET{constructor(e,t,o,r,i,s){this.localStore=e,this.remoteStore=t,this.eventManager=o,this.sharedClientState=r,this.currentUser=i,this.maxConcurrentLimboResolutions=s,this.Pu={},this.Tu=new Sn(c=>Vf(c),Yi),this.Iu=new Map,this.Eu=new Set,this.du=new le(F.comparator),this.Au=new Map,this.Ru=new gc,this.Vu={},this.mu=new Map,this.fu=to.cr(),this.onlineState="Unknown",this.gu=void 0}get isPrimaryClient(){return this.gu===!0}}async function bT(n,e,t=!0){const o=bg(n);let r;const i=o.Tu.get(e);return i?(o.sharedClientState.addLocalQueryTarget(i.targetId),r=i.view.lu()):r=await wg(o,e,t,!0),r}async function TT(n,e){const t=bg(n);await wg(t,e,!0,!1)}async function wg(n,e,t,o){const r=await zb(n.localStore,dt(e)),i=r.targetId,s=n.sharedClientState.addLocalQueryTarget(i,t);let c;return o&&(c=await IT(n,e,i,s==="current",r.resumeToken)),n.isPrimaryClient&&t&&lg(n.remoteStore,r),c}async function IT(n,e,t,o,r){n.pu=(p,m,S)=>async function(M,P,U,G){let W=P.view.ru(U);W.Cs&&(W=await Ad(M.localStore,P.query,!1).then(({documents:b})=>P.view.ru(b,W)));const ue=G&&G.targetChanges.get(P.targetId),Ne=G&&G.targetMismatches.get(P.targetId)!=null,ie=P.view.applyChanges(W,M.isPrimaryClient,ue,Ne);return Bd(M,P.targetId,ie.au),ie.snapshot}(n,p,m,S);const i=await Ad(n.localStore,e,!0),s=new yT(e,i.Qs),c=s.ru(i.documents),u=wr.createSynthesizedTargetChangeForCurrentChange(t,o&&n.onlineState!=="Offline",r),d=s.applyChanges(c,n.isPrimaryClient,u);Bd(n,t,d.au);const f=new _T(e,t,s);return n.Tu.set(e,f),n.Iu.has(t)?n.Iu.get(t).push(e):n.Iu.set(t,[e]),d.snapshot}async function ST(n,e,t){const o=H(n),r=o.Tu.get(e),i=o.Iu.get(r.targetId);if(i.length>1)return o.Iu.set(r.targetId,i.filter(s=>!Yi(s,e))),void o.Tu.delete(e);o.isPrimaryClient?(o.sharedClientState.removeLocalQueryTarget(r.targetId),o.sharedClientState.isActiveQueryTarget(r.targetId)||await Pa(o.localStore,r.targetId,!1).then(()=>{o.sharedClientState.clearQueryState(r.targetId),t&&yc(o.remoteStore,r.targetId),Oa(o,r.targetId)}).catch(po)):(Oa(o,r.targetId),await Pa(o.localStore,r.targetId,!0))}async function AT(n,e){const t=H(n),o=t.Tu.get(e),r=t.Iu.get(o.targetId);t.isPrimaryClient&&r.length===1&&(t.sharedClientState.removeLocalQueryTarget(o.targetId),yc(t.remoteStore,o.targetId))}async function DT(n,e,t){const o=OT(n);try{const r=await function(s,c){const u=H(s),d=oe.now(),f=c.reduce((S,C)=>S.add(C.key),Y());let p,m;return u.persistence.runTransaction("Locally write mutations","readwrite",S=>{let C=Rt(),M=Y();return u.Ns.getEntries(S,f).next(P=>{C=P,C.forEach((U,G)=>{G.isValidDocument()||(M=M.add(U))})}).next(()=>u.localDocuments.getOverlayedDocuments(S,C)).next(P=>{p=P;const U=[];for(const G of c){const W=$E(G,p.get(G.key).overlayedDocument);W!=null&&U.push(new Zt(G.key,W,Df(W.value.mapValue),Ge.exists(!0)))}return u.mutationQueue.addMutationBatch(S,d,U,c)}).next(P=>{m=P;const U=P.applyToLocalDocumentSet(p,M);return u.documentOverlayCache.saveOverlays(S,P.batchId,U)})}).then(()=>({batchId:m.batchId,changes:xf(p)}))}(o.localStore,e);o.sharedClientState.addPendingMutation(r.batchId),function(s,c,u){let d=s.Vu[s.currentUser.toKey()];d||(d=new le(Q)),d=d.insert(c,u),s.Vu[s.currentUser.toKey()]=d}(o,r.batchId,t),await _r(o,r.changes),await rs(o.remoteStore)}catch(r){const i=Tc(r,"Failed to persist write");t.reject(i)}}async function yg(n,e){const t=H(n);try{const o=await Fb(t.localStore,e);e.targetChanges.forEach((r,i)=>{const s=t.Au.get(i);s&&(te(r.addedDocuments.size+r.modifiedDocuments.size+r.removedDocuments.size<=1,22616),r.addedDocuments.size>0?s.hu=!0:r.modifiedDocuments.size>0?te(s.hu,14607):r.removedDocuments.size>0&&(te(s.hu,42227),s.hu=!1))}),await _r(t,o,e)}catch(o){await po(o)}}function Vd(n,e,t){const o=H(n);if(o.isPrimaryClient&&t===0||!o.isPrimaryClient&&t===1){const r=[];o.Tu.forEach((i,s)=>{const c=s.view.va(e);c.snapshot&&r.push(c.snapshot)}),function(s,c){const u=H(s);u.onlineState=c;let d=!1;u.queries.forEach((f,p)=>{for(const m of p.Sa)m.va(c)&&(d=!0)}),d&&Ac(u)}(o.eventManager,e),r.length&&o.Pu.H_(r),o.onlineState=e,o.isPrimaryClient&&o.sharedClientState.setOnlineState(e)}}async function CT(n,e,t){const o=H(n);o.sharedClientState.updateQueryState(e,"rejected",t);const r=o.Au.get(e),i=r&&r.key;if(i){let s=new le(F.comparator);s=s.insert(i,Le.newNoDocument(i,q.min()));const c=Y().add(i),u=new ts(q.min(),new Map,new le(Q),s,c);await yg(o,u),o.du=o.du.remove(i),o.Au.delete(e),Rc(o)}else await Pa(o.localStore,e,!1).then(()=>Oa(o,e,t)).catch(po)}async function RT(n,e){const t=H(n),o=e.batch.batchId;try{const r=await Ub(t.localStore,e);vg(t,o,null),_g(t,o),t.sharedClientState.updateMutationState(o,"acknowledged"),await _r(t,r)}catch(r){await po(r)}}async function NT(n,e,t){const o=H(n);try{const r=await function(s,c){const u=H(s);return u.persistence.runTransaction("Reject batch","readwrite-primary",d=>{let f;return u.mutationQueue.lookupMutationBatch(d,c).next(p=>(te(p!==null,37113),f=p.keys(),u.mutationQueue.removeMutationBatch(d,p))).next(()=>u.mutationQueue.performConsistencyCheck(d)).next(()=>u.documentOverlayCache.removeOverlaysForBatchId(d,f,c)).next(()=>u.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(d,f)).next(()=>u.localDocuments.getDocuments(d,f))})}(o.localStore,e);vg(o,e,t),_g(o,e),o.sharedClientState.updateMutationState(e,"rejected",t),await _r(o,r)}catch(r){await po(r)}}function _g(n,e){(n.mu.get(e)||[]).forEach(t=>{t.resolve()}),n.mu.delete(e)}function vg(n,e,t){const o=H(n);let r=o.Vu[o.currentUser.toKey()];if(r){const i=r.get(e);i&&(t?i.reject(t):i.resolve(),r=r.remove(e)),o.Vu[o.currentUser.toKey()]=r}}function Oa(n,e,t=null){n.sharedClientState.removeLocalQueryTarget(e);for(const o of n.Iu.get(e))n.Tu.delete(o),t&&n.Pu.yu(o,t);n.Iu.delete(e),n.isPrimaryClient&&n.Ru.jr(e).forEach(o=>{n.Ru.containsKey(o)||Eg(n,o)})}function Eg(n,e){n.Eu.delete(e.path.canonicalString());const t=n.du.get(e);t!==null&&(yc(n.remoteStore,t),n.du=n.du.remove(e),n.Au.delete(t),Rc(n))}function Bd(n,e,t){for(const o of t)o instanceof pg?(n.Ru.addReference(o.key,e),PT(n,o)):o instanceof mg?(x(Cc,"Document no longer in limbo: "+o.key),n.Ru.removeReference(o.key,e),n.Ru.containsKey(o.key)||Eg(n,o.key)):$(19791,{wu:o})}function PT(n,e){const t=e.key,o=t.path.canonicalString();n.du.get(t)||n.Eu.has(o)||(x(Cc,"New document in limbo: "+t),n.Eu.add(o),Rc(n))}function Rc(n){for(;n.Eu.size>0&&n.du.size<n.maxConcurrentLimboResolutions;){const e=n.Eu.values().next().value;n.Eu.delete(e);const t=new F(re.fromString(e)),o=n.fu.next();n.Au.set(o,new vT(t)),n.du=n.du.insert(t,o),lg(n.remoteStore,new Ft(dt(Qi(t.path)),o,"TargetPurposeLimboResolution",Hi.ce))}}async function _r(n,e,t){const o=H(n),r=[],i=[],s=[];o.Tu.isEmpty()||(o.Tu.forEach((c,u)=>{s.push(o.pu(u,e,t).then(d=>{if((d||t)&&o.isPrimaryClient){const f=d?!d.fromCache:t?.targetChanges.get(u.targetId)?.current;o.sharedClientState.updateQueryState(u.targetId,f?"current":"not-current")}if(d){r.push(d);const f=mc.As(u.targetId,d);i.push(f)}}))}),await Promise.all(s),o.Pu.H_(r),await async function(u,d){const f=H(u);try{await f.persistence.runTransaction("notifyLocalViewChanges","readwrite",p=>k.forEach(d,m=>k.forEach(m.Es,S=>f.persistence.referenceDelegate.addReference(p,m.targetId,S)).next(()=>k.forEach(m.ds,S=>f.persistence.referenceDelegate.removeReference(p,m.targetId,S)))))}catch(p){if(!mo(p))throw p;x(wc,"Failed to update sequence numbers: "+p)}for(const p of d){const m=p.targetId;if(!p.fromCache){const S=f.Ms.get(m),C=S.snapshotVersion,M=S.withLastLimboFreeSnapshotVersion(C);f.Ms=f.Ms.insert(m,M)}}}(o.localStore,i))}async function kT(n,e){const t=H(n);if(!t.currentUser.isEqual(e)){x(Cc,"User change. New user:",e.toKey());const o=await ig(t.localStore,e);t.currentUser=e,function(i,s){i.mu.forEach(c=>{c.forEach(u=>{u.reject(new L(N.CANCELLED,s))})}),i.mu.clear()}(t,"'waitForPendingWrites' promise is rejected due to a user change."),t.sharedClientState.handleUserChange(e,o.removedBatchIds,o.addedBatchIds),await _r(t,o.Ls)}}function MT(n,e){const t=H(n),o=t.Au.get(e);if(o&&o.hu)return Y().add(o.key);{let r=Y();const i=t.Iu.get(e);if(!i)return r;for(const s of i){const c=t.Tu.get(s);r=r.unionWith(c.view.nu)}return r}}function bg(n){const e=H(n);return e.remoteStore.remoteSyncer.applyRemoteEvent=yg.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=MT.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=CT.bind(null,e),e.Pu.H_=mT.bind(null,e.eventManager),e.Pu.yu=wT.bind(null,e.eventManager),e}function OT(n){const e=H(n);return e.remoteStore.remoteSyncer.applySuccessfulWrite=RT.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=NT.bind(null,e),e}class Ni{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(e){this.serializer=ns(e.databaseInfo.databaseId),this.sharedClientState=this.Du(e),this.persistence=this.Cu(e),await this.persistence.start(),this.localStore=this.vu(e),this.gcScheduler=this.Fu(e,this.localStore),this.indexBackfillerScheduler=this.Mu(e,this.localStore)}Fu(e,t){return null}Mu(e,t){return null}vu(e){return xb(this.persistence,new Vb,e.initialUser,this.serializer)}Cu(e){return new rg(pc.mi,this.serializer)}Du(e){return new jb}async terminate(){this.gcScheduler?.stop(),this.indexBackfillerScheduler?.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}Ni.provider={build:()=>new Ni};class VT extends Ni{constructor(e){super(),this.cacheSizeBytes=e}Fu(e,t){te(this.persistence.referenceDelegate instanceof Ci,46915);const o=this.persistence.referenceDelegate.garbageCollector;return new vb(o,e.asyncQueue,t)}Cu(e){const t=this.cacheSizeBytes!==void 0?ze.withCacheSize(this.cacheSizeBytes):ze.DEFAULT;return new rg(o=>Ci.mi(o,t),this.serializer)}}class Va{async initialize(e,t){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(t),this.remoteStore=this.createRemoteStore(t),this.eventManager=this.createEventManager(t),this.syncEngine=this.createSyncEngine(t,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=o=>Vd(this.syncEngine,o,1),this.remoteStore.remoteSyncer.handleCredentialChange=kT.bind(null,this.syncEngine),await fT(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return function(){return new pT}()}createDatastore(e){const t=ns(e.databaseInfo.databaseId),o=function(i){return new Yb(i)}(e.databaseInfo);return function(i,s,c,u){return new eT(i,s,c,u)}(e.authCredentials,e.appCheckCredentials,o,t)}createRemoteStore(e){return function(o,r,i,s,c){return new nT(o,r,i,s,c)}(this.localStore,this.datastore,e.asyncQueue,t=>Vd(this.syncEngine,t,0),function(){return Rd.v()?new Rd:new Hb}())}createSyncEngine(e,t){return function(r,i,s,c,u,d,f){const p=new ET(r,i,s,c,u,d);return f&&(p.gu=!0),p}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,t)}async terminate(){await async function(t){const o=H(t);x(vn,"RemoteStore shutting down."),o.Ea.add(5),await yr(o),o.Aa.shutdown(),o.Ra.set("Unknown")}(this.remoteStore),this.datastore?.terminate(),this.eventManager?.terminate()}}Va.provider={build:()=>new Va};/**
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
 */class Nc{constructor(e){this.observer=e,this.muted=!1}next(e){this.muted||this.observer.next&&this.Ou(this.observer.next,e)}error(e){this.muted||(this.observer.error?this.Ou(this.observer.error,e):Ct("Uncaught Error in snapshot listener:",e.toString()))}Nu(){this.muted=!0}Ou(e,t){setTimeout(()=>{this.muted||e(t)},0)}}/**
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
 */const Jt="FirestoreClient";class BT{constructor(e,t,o,r,i){this.authCredentials=e,this.appCheckCredentials=t,this.asyncQueue=o,this.databaseInfo=r,this.user=Be.UNAUTHENTICATED,this.clientId=qi.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=i,this.authCredentials.start(o,async s=>{x(Jt,"Received user=",s.uid),await this.authCredentialListener(s),this.user=s}),this.appCheckCredentials.start(o,s=>(x(Jt,"Received new app check token=",s),this.appCheckCredentialListener(s,this.user)))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}terminate(){this.asyncQueue.enterRestrictedMode();const e=new It;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(t){const o=Tc(t,"Failed to shutdown persistence");e.reject(o)}}),e.promise}}async function na(n,e){n.asyncQueue.verifyOperationInProgress(),x(Jt,"Initializing OfflineComponentProvider");const t=n.configuration;await e.initialize(t);let o=t.initialUser;n.setCredentialChangeListener(async r=>{o.isEqual(r)||(await ig(e.localStore,r),o=r)}),e.persistence.setDatabaseDeletedListener(()=>n.terminate()),n._offlineComponents=e}async function Ld(n,e){n.asyncQueue.verifyOperationInProgress();const t=await LT(n);x(Jt,"Initializing OnlineComponentProvider"),await e.initialize(t,n.configuration),n.setCredentialChangeListener(o=>Pd(e.remoteStore,o)),n.setAppCheckTokenChangeListener((o,r)=>Pd(e.remoteStore,r)),n._onlineComponents=e}async function LT(n){if(!n._offlineComponents)if(n._uninitializedComponentsProvider){x(Jt,"Using user provided OfflineComponentProvider");try{await na(n,n._uninitializedComponentsProvider._offline)}catch(e){const t=e;if(!function(r){return r.name==="FirebaseError"?r.code===N.FAILED_PRECONDITION||r.code===N.UNIMPLEMENTED:!(typeof DOMException<"u"&&r instanceof DOMException)||r.code===22||r.code===20||r.code===11}(t))throw t;_n("Error using user provided cache. Falling back to memory cache: "+t),await na(n,new Ni)}}else x(Jt,"Using default OfflineComponentProvider"),await na(n,new VT(void 0));return n._offlineComponents}async function Tg(n){return n._onlineComponents||(n._uninitializedComponentsProvider?(x(Jt,"Using user provided OnlineComponentProvider"),await Ld(n,n._uninitializedComponentsProvider._online)):(x(Jt,"Using default OnlineComponentProvider"),await Ld(n,new Va))),n._onlineComponents}function xT(n){return Tg(n).then(e=>e.syncEngine)}async function Pi(n){const e=await Tg(n),t=e.eventManager;return t.onListen=bT.bind(null,e.syncEngine),t.onUnlisten=ST.bind(null,e.syncEngine),t.onFirstRemoteStoreListen=TT.bind(null,e.syncEngine),t.onLastRemoteStoreUnlisten=AT.bind(null,e.syncEngine),t}function UT(n,e,t={}){const o=new It;return n.asyncQueue.enqueueAndForget(async()=>function(i,s,c,u,d){const f=new Nc({next:m=>{f.Nu(),s.enqueueAndForget(()=>Sc(i,p));const S=m.docs.has(c);!S&&m.fromCache?d.reject(new L(N.UNAVAILABLE,"Failed to get document because the client is offline.")):S&&m.fromCache&&u&&u.source==="server"?d.reject(new L(N.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):d.resolve(m)},error:m=>d.reject(m)}),p=new Dc(Qi(c.path),f,{includeMetadataChanges:!0,qa:!0});return Ic(i,p)}(await Pi(n),n.asyncQueue,e,t,o)),o.promise}function FT(n,e,t={}){const o=new It;return n.asyncQueue.enqueueAndForget(async()=>function(i,s,c,u,d){const f=new Nc({next:m=>{f.Nu(),s.enqueueAndForget(()=>Sc(i,p)),m.fromCache&&u.source==="server"?d.reject(new L(N.UNAVAILABLE,'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')):d.resolve(m)},error:m=>d.reject(m)}),p=new Dc(c,f,{includeMetadataChanges:!0,qa:!0});return Ic(i,p)}(await Pi(n),n.asyncQueue,e,t,o)),o.promise}/**
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
 */function Ig(n){const e={};return n.timeoutSeconds!==void 0&&(e.timeoutSeconds=n.timeoutSeconds),e}/**
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
 */const xd=new Map;/**
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
 */const Sg="firestore.googleapis.com",Ud=!0;class Fd{constructor(e){if(e.host===void 0){if(e.ssl!==void 0)throw new L(N.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=Sg,this.ssl=Ud}else this.host=e.host,this.ssl=e.ssl??Ud;if(this.isUsingEmulator=e.emulatorOptions!==void 0,this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=og;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<yb)throw new L(N.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}mf("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=Ig(e.experimentalLongPollingOptions??{}),function(o){if(o.timeoutSeconds!==void 0){if(isNaN(o.timeoutSeconds))throw new L(N.INVALID_ARGUMENT,`invalid long polling timeout: ${o.timeoutSeconds} (must not be NaN)`);if(o.timeoutSeconds<5)throw new L(N.INVALID_ARGUMENT,`invalid long polling timeout: ${o.timeoutSeconds} (minimum allowed value is 5)`);if(o.timeoutSeconds>30)throw new L(N.INVALID_ARGUMENT,`invalid long polling timeout: ${o.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&function(o,r){return o.timeoutSeconds===r.timeoutSeconds}(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class is{constructor(e,t,o,r){this._authCredentials=e,this._appCheckCredentials=t,this._databaseId=o,this._app=r,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new Fd({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new L(N.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new L(N.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new Fd(e),this._emulatorOptions=e.emulatorOptions||{},e.credentials!==void 0&&(this._authCredentials=function(o){if(!o)return new gf;switch(o.type){case"firstParty":return new Yv(o.sessionIndex||"0",o.iamToken||null,o.authTokenFactory||null);case"provider":return o.client;default:throw new L(N.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(t){const o=xd.get(t);o&&(x("ComponentProvider","Removing Datastore"),xd.delete(t),o.terminate())}(this),Promise.resolve()}}function Ag(n,e,t,o={}){n=xe(n,is);const r=uo(e),i=n._getSettings(),s={...i,emulatorOptions:n._getEmulatorOptions()},c=`${e}:${t}`;r&&(wh(`https://${c}`),yh("Firestore",!0)),i.host!==Sg&&i.host!==c&&_n("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used.");const u={...i,host:c,ssl:r,emulatorOptions:o};if(!ft(u,s)&&(n._setSettings(u),o.mockUserToken)){let d,f;if(typeof o.mockUserToken=="string")d=o.mockUserToken,f=Be.MOCK_USER;else{d=yw(o.mockUserToken,n._app?.options.projectId);const p=o.mockUserToken.sub||o.mockUserToken.user_id;if(!p)throw new L(N.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");f=new Be(p)}n._authCredentials=new Wv(new ff(d,f))}}/**
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
 */class Nt{constructor(e,t,o){this.converter=t,this._query=o,this.type="query",this.firestore=e}withConverter(e){return new Nt(this.firestore,e,this._query)}}class ae{constructor(e,t,o){this.converter=t,this._key=o,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new St(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new ae(this.firestore,e,this._key)}toJSON(){return{type:ae._jsonSchemaVersion,referencePath:this._key.toString()}}static fromJSON(e,t,o){if(pr(t,ae._jsonSchema))return new ae(e,o||null,new F(re.fromString(t.referencePath)))}}ae._jsonSchemaVersion="firestore/documentReference/1.0",ae._jsonSchema={type:_e("string",ae._jsonSchemaVersion),referencePath:_e("string")};class St extends Nt{constructor(e,t,o){super(e,t,Qi(o)),this._path=o,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new ae(this.firestore,null,new F(e))}withConverter(e){return new St(this.firestore,e,this._path)}}function me(n,e,...t){if(n=he(n),pf("collection","path",e),n instanceof is){const o=re.fromString(e,...t);return Zu(o),new St(n,null,o)}{if(!(n instanceof ae||n instanceof St))throw new L(N.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const o=n._path.child(re.fromString(e,...t));return Zu(o),new St(n.firestore,null,o)}}function fe(n,e,...t){if(n=he(n),arguments.length===1&&(e=qi.newId()),pf("doc","path",e),n instanceof is){const o=re.fromString(e,...t);return Xu(o),new ae(n,null,new F(o))}{if(!(n instanceof ae||n instanceof St))throw new L(N.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const o=n._path.child(re.fromString(e,...t));return Xu(o),new ae(n.firestore,n instanceof St?n.converter:null,new F(o))}}/**
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
 */const $d="AsyncQueue";class Gd{constructor(e=Promise.resolve()){this.Xu=[],this.ec=!1,this.tc=[],this.nc=null,this.rc=!1,this.sc=!1,this.oc=[],this.M_=new ag(this,"async_queue_retry"),this._c=()=>{const o=ta();o&&x($d,"Visibility state changed to "+o.visibilityState),this.M_.w_()},this.ac=e;const t=ta();t&&typeof t.addEventListener=="function"&&t.addEventListener("visibilitychange",this._c)}get isShuttingDown(){return this.ec}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.uc(),this.cc(e)}enterRestrictedMode(e){if(!this.ec){this.ec=!0,this.sc=e||!1;const t=ta();t&&typeof t.removeEventListener=="function"&&t.removeEventListener("visibilitychange",this._c)}}enqueue(e){if(this.uc(),this.ec)return new Promise(()=>{});const t=new It;return this.cc(()=>this.ec&&this.sc?Promise.resolve():(e().then(t.resolve,t.reject),t.promise)).then(()=>t.promise)}enqueueRetryable(e){this.enqueueAndForget(()=>(this.Xu.push(e),this.lc()))}async lc(){if(this.Xu.length!==0){try{await this.Xu[0](),this.Xu.shift(),this.M_.reset()}catch(e){if(!mo(e))throw e;x($d,"Operation failed with retryable error: "+e)}this.Xu.length>0&&this.M_.p_(()=>this.lc())}}cc(e){const t=this.ac.then(()=>(this.rc=!0,e().catch(o=>{throw this.nc=o,this.rc=!1,Ct("INTERNAL UNHANDLED ERROR: ",zd(o)),o}).then(o=>(this.rc=!1,o))));return this.ac=t,t}enqueueAfterDelay(e,t,o){this.uc(),this.oc.indexOf(e)>-1&&(t=0);const r=bc.createAndSchedule(this,e,t,o,i=>this.hc(i));return this.tc.push(r),r}uc(){this.nc&&$(47125,{Pc:zd(this.nc)})}verifyOperationInProgress(){}async Tc(){let e;do e=this.ac,await e;while(e!==this.ac)}Ic(e){for(const t of this.tc)if(t.timerId===e)return!0;return!1}Ec(e){return this.Tc().then(()=>{this.tc.sort((t,o)=>t.targetTimeMs-o.targetTimeMs);for(const t of this.tc)if(t.skipDelay(),e!=="all"&&t.timerId===e)break;return this.Tc()})}dc(e){this.oc.push(e)}hc(e){const t=this.tc.indexOf(e);this.tc.splice(t,1)}}function zd(n){let e=n.message||"";return n.stack&&(e=n.stack.includes(n.message)?n.stack:n.message+`
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
 */function qd(n){return function(t,o){if(typeof t!="object"||t===null)return!1;const r=t;for(const i of o)if(i in r&&typeof r[i]=="function")return!0;return!1}(n,["next","error","complete"])}class st extends is{constructor(e,t,o,r){super(e,t,o,r),this.type="firestore",this._queue=new Gd,this._persistenceKey=r?.name||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new Gd(e),this._firestoreClient=void 0,await e}}}function Dg(n,e){const t=typeof n=="object"?n:Ha(),o=typeof n=="string"?n:Ti,r=In(t,"firestore").getImmediate({identifier:o});if(!r._initialized){const i=mw("firestore");i&&Ag(r,...i)}return r}function _o(n){if(n._terminated)throw new L(N.FAILED_PRECONDITION,"The client has already been terminated.");return n._firestoreClient||$T(n),n._firestoreClient}function $T(n){const e=n._freezeSettings(),t=function(r,i,s,c){return new hE(r,i,s,c.host,c.ssl,c.experimentalForceLongPolling,c.experimentalAutoDetectLongPolling,Ig(c.experimentalLongPollingOptions),c.useFetchStreams,c.isUsingEmulator)}(n._databaseId,n._app?.options.appId||"",n._persistenceKey,e);n._componentsProvider||e.localCache?._offlineComponentProvider&&e.localCache?._onlineComponentProvider&&(n._componentsProvider={_offline:e.localCache._offlineComponentProvider,_online:e.localCache._onlineComponentProvider}),n._firestoreClient=new BT(n._authCredentials,n._appCheckCredentials,n._queue,t,n._componentsProvider&&function(r){const i=r?._online.build();return{_offline:r?._offline.build(i),_online:i}}(n._componentsProvider))}/**
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
 */class We{constructor(e){this._byteString=e}static fromBase64String(e){try{return new We(Se.fromBase64String(e))}catch(t){throw new L(N.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+t)}}static fromUint8Array(e){return new We(Se.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}toJSON(){return{type:We._jsonSchemaVersion,bytes:this.toBase64()}}static fromJSON(e){if(pr(e,We._jsonSchema))return We.fromBase64String(e.bytes)}}We._jsonSchemaVersion="firestore/bytes/1.0",We._jsonSchema={type:_e("string",We._jsonSchemaVersion),bytes:_e("string")};/**
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
 */class vo{constructor(...e){for(let t=0;t<e.length;++t)if(e[t].length===0)throw new L(N.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new Ie(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}/**
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
 */class Dn{constructor(e){this._methodName=e}}/**
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
 */class nt{constructor(e,t){if(!isFinite(e)||e<-90||e>90)throw new L(N.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(t)||t<-180||t>180)throw new L(N.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+t);this._lat=e,this._long=t}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}_compareTo(e){return Q(this._lat,e._lat)||Q(this._long,e._long)}toJSON(){return{latitude:this._lat,longitude:this._long,type:nt._jsonSchemaVersion}}static fromJSON(e){if(pr(e,nt._jsonSchema))return new nt(e.latitude,e.longitude)}}nt._jsonSchemaVersion="firestore/geoPoint/1.0",nt._jsonSchema={type:_e("string",nt._jsonSchemaVersion),latitude:_e("number"),longitude:_e("number")};/**
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
 */class ot{constructor(e){this._values=(e||[]).map(t=>t)}toArray(){return this._values.map(e=>e)}isEqual(e){return function(o,r){if(o.length!==r.length)return!1;for(let i=0;i<o.length;++i)if(o[i]!==r[i])return!1;return!0}(this._values,e._values)}toJSON(){return{type:ot._jsonSchemaVersion,vectorValues:this._values}}static fromJSON(e){if(pr(e,ot._jsonSchema)){if(Array.isArray(e.vectorValues)&&e.vectorValues.every(t=>typeof t=="number"))return new ot(e.vectorValues);throw new L(N.INVALID_ARGUMENT,"Expected 'vectorValues' field to be a number array")}}}ot._jsonSchemaVersion="firestore/vectorValue/1.0",ot._jsonSchema={type:_e("string",ot._jsonSchemaVersion),vectorValues:_e("object")};/**
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
 */const GT=/^__.*__$/;class zT{constructor(e,t,o){this.data=e,this.fieldMask=t,this.fieldTransforms=o}toMutation(e,t){return this.fieldMask!==null?new Zt(e,this.data,this.fieldMask,t,this.fieldTransforms):new mr(e,this.data,t,this.fieldTransforms)}}class Cg{constructor(e,t,o){this.data=e,this.fieldMask=t,this.fieldTransforms=o}toMutation(e,t){return new Zt(e,this.data,this.fieldMask,t,this.fieldTransforms)}}function Rg(n){switch(n){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw $(40011,{Ac:n})}}class ss{constructor(e,t,o,r,i,s){this.settings=e,this.databaseId=t,this.serializer=o,this.ignoreUndefinedProperties=r,i===void 0&&this.Rc(),this.fieldTransforms=i||[],this.fieldMask=s||[]}get path(){return this.settings.path}get Ac(){return this.settings.Ac}Vc(e){return new ss({...this.settings,...e},this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}mc(e){const t=this.path?.child(e),o=this.Vc({path:t,fc:!1});return o.gc(e),o}yc(e){const t=this.path?.child(e),o=this.Vc({path:t,fc:!1});return o.Rc(),o}wc(e){return this.Vc({path:void 0,fc:!0})}Sc(e){return ki(e,this.settings.methodName,this.settings.bc||!1,this.path,this.settings.Dc)}contains(e){return this.fieldMask.find(t=>e.isPrefixOf(t))!==void 0||this.fieldTransforms.find(t=>e.isPrefixOf(t.field))!==void 0}Rc(){if(this.path)for(let e=0;e<this.path.length;e++)this.gc(this.path.get(e))}gc(e){if(e.length===0)throw this.Sc("Document fields must not be empty");if(Rg(this.Ac)&&GT.test(e))throw this.Sc('Document fields cannot begin and end with "__"')}}class qT{constructor(e,t,o){this.databaseId=e,this.ignoreUndefinedProperties=t,this.serializer=o||ns(e)}Cc(e,t,o,r=!1){return new ss({Ac:e,methodName:t,Dc:o,path:Ie.emptyPath(),fc:!1,bc:r},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function vr(n){const e=n._freezeSettings(),t=ns(n._databaseId);return new qT(n._databaseId,!!e.ignoreUndefinedProperties,t)}function Pc(n,e,t,o,r,i={}){const s=n.Cc(i.merge||i.mergeFields?2:0,e,t,r);Vc("Data must be an object, but it was:",s,o);const c=Mg(o,s);let u,d;if(i.merge)u=new Ke(s.fieldMask),d=s.fieldTransforms;else if(i.mergeFields){const f=[];for(const p of i.mergeFields){const m=Ba(e,p,t);if(!s.contains(m))throw new L(N.INVALID_ARGUMENT,`Field '${m}' is specified in your field mask but missing from your input data.`);Vg(f,m)||f.push(m)}u=new Ke(f),d=s.fieldTransforms.filter(p=>u.covers(p.field))}else u=null,d=s.fieldTransforms;return new zT(new qe(c),u,d)}class as extends Dn{_toFieldTransform(e){if(e.Ac!==2)throw e.Ac===1?e.Sc(`${this._methodName}() can only appear at the top level of your update data`):e.Sc(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return e.fieldMask.push(e.path),null}isEqual(e){return e instanceof as}}function Ng(n,e,t){return new ss({Ac:3,Dc:e.settings.Dc,methodName:n._methodName,fc:t},e.databaseId,e.serializer,e.ignoreUndefinedProperties)}class kc extends Dn{_toFieldTransform(e){return new uc(e.path,new lr)}isEqual(e){return e instanceof kc}}class Mc extends Dn{constructor(e,t){super(e),this.vc=t}_toFieldTransform(e){const t=Ng(this,e,!0),o=this.vc.map(i=>Cn(i,t)),r=new Zn(o);return new uc(e.path,r)}isEqual(e){return e instanceof Mc&&ft(this.vc,e.vc)}}class Oc extends Dn{constructor(e,t){super(e),this.vc=t}_toFieldTransform(e){const t=Ng(this,e,!0),o=this.vc.map(i=>Cn(i,t)),r=new eo(o);return new uc(e.path,r)}isEqual(e){return e instanceof Oc&&ft(this.vc,e.vc)}}function Pg(n,e,t,o){const r=n.Cc(1,e,t);Vc("Data must be an object, but it was:",r,o);const i=[],s=qe.empty();Xt(o,(u,d)=>{const f=Bc(e,u,t);d=he(d);const p=r.yc(f);if(d instanceof as)i.push(f);else{const m=Cn(d,p);m!=null&&(i.push(f),s.set(f,m))}});const c=new Ke(i);return new Cg(s,c,r.fieldTransforms)}function kg(n,e,t,o,r,i){const s=n.Cc(1,e,t),c=[Ba(e,o,t)],u=[r];if(i.length%2!=0)throw new L(N.INVALID_ARGUMENT,`Function ${e}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let m=0;m<i.length;m+=2)c.push(Ba(e,i[m])),u.push(i[m+1]);const d=[],f=qe.empty();for(let m=c.length-1;m>=0;--m)if(!Vg(d,c[m])){const S=c[m];let C=u[m];C=he(C);const M=s.yc(S);if(C instanceof as)d.push(S);else{const P=Cn(C,M);P!=null&&(d.push(S),f.set(S,P))}}const p=new Ke(d);return new Cg(f,p,s.fieldTransforms)}function jT(n,e,t,o=!1){return Cn(t,n.Cc(o?4:3,e))}function Cn(n,e){if(Og(n=he(n)))return Vc("Unsupported field value:",e,n),Mg(n,e);if(n instanceof Dn)return function(o,r){if(!Rg(r.Ac))throw r.Sc(`${o._methodName}() can only be used with update() and set()`);if(!r.path)throw r.Sc(`${o._methodName}() is not currently supported inside arrays`);const i=o._toFieldTransform(r);i&&r.fieldTransforms.push(i)}(n,e),null;if(n===void 0&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),n instanceof Array){if(e.settings.fc&&e.Ac!==4)throw e.Sc("Nested arrays are not supported");return function(o,r){const i=[];let s=0;for(const c of o){let u=Cn(c,r.wc(s));u==null&&(u={nullValue:"NULL_VALUE"}),i.push(u),s++}return{arrayValue:{values:i}}}(n,e)}return function(o,r){if((o=he(o))===null)return{nullValue:"NULL_VALUE"};if(typeof o=="number")return VE(r.serializer,o);if(typeof o=="boolean")return{booleanValue:o};if(typeof o=="string")return{stringValue:o};if(o instanceof Date){const i=oe.fromDate(o);return{timestampValue:Di(r.serializer,i)}}if(o instanceof oe){const i=new oe(o.seconds,1e3*Math.floor(o.nanoseconds/1e3));return{timestampValue:Di(r.serializer,i)}}if(o instanceof nt)return{geoPointValue:{latitude:o.latitude,longitude:o.longitude}};if(o instanceof We)return{bytesValue:Yf(r.serializer,o._byteString)};if(o instanceof ae){const i=r.databaseId,s=o.firestore._databaseId;if(!s.isEqual(i))throw r.Sc(`Document reference is for database ${s.projectId}/${s.database} but should be for database ${i.projectId}/${i.database}`);return{referenceValue:fc(o.firestore._databaseId||r.databaseId,o._key.path)}}if(o instanceof ot)return function(s,c){return{mapValue:{fields:{[Sf]:{stringValue:Af},[Ii]:{arrayValue:{values:s.toArray().map(d=>{if(typeof d!="number")throw c.Sc("VectorValues must only contain numeric values.");return lc(c.serializer,d)})}}}}}}(o,r);throw r.Sc(`Unsupported field value: ${ji(o)}`)}(n,e)}function Mg(n,e){const t={};return _f(n)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):Xt(n,(o,r)=>{const i=Cn(r,e.mc(o));i!=null&&(t[o]=i)}),{mapValue:{fields:t}}}function Og(n){return!(typeof n!="object"||n===null||n instanceof Array||n instanceof Date||n instanceof oe||n instanceof nt||n instanceof We||n instanceof ae||n instanceof Dn||n instanceof ot)}function Vc(n,e,t){if(!Og(t)||!wf(t)){const o=ji(t);throw o==="an object"?e.Sc(n+" a custom object"):e.Sc(n+" "+o)}}function Ba(n,e,t){if((e=he(e))instanceof vo)return e._internalPath;if(typeof e=="string")return Bc(n,e);throw ki("Field path arguments must be of type string or ",n,!1,void 0,t)}const HT=new RegExp("[~\\*/\\[\\]]");function Bc(n,e,t){if(e.search(HT)>=0)throw ki(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,n,!1,void 0,t);try{return new vo(...e.split("."))._internalPath}catch{throw ki(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,n,!1,void 0,t)}}function ki(n,e,t,o,r){const i=o&&!o.isEmpty(),s=r!==void 0;let c=`Function ${e}() called with invalid data`;t&&(c+=" (via `toFirestore()`)"),c+=". ";let u="";return(i||s)&&(u+=" (found",i&&(u+=` in field ${o}`),s&&(u+=` in document ${r}`),u+=")"),new L(N.INVALID_ARGUMENT,c+n+u)}function Vg(n,e){return n.some(t=>t.isEqual(e))}/**
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
 */class Bg{constructor(e,t,o,r,i){this._firestore=e,this._userDataWriter=t,this._key=o,this._document=r,this._converter=i}get id(){return this._key.path.lastSegment()}get ref(){return new ae(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const e=new WT(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}get(e){if(this._document){const t=this._document.data.field(cs("DocumentSnapshot.get",e));if(t!==null)return this._userDataWriter.convertValue(t)}}}class WT extends Bg{data(){return super.data()}}function cs(n,e){return typeof e=="string"?Bc(n,e):e instanceof vo?e._internalPath:e._delegate._internalPath}/**
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
 */function Lg(n){if(n.limitType==="L"&&n.explicitOrderBy.length===0)throw new L(N.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class Lc{}class xc extends Lc{}function Re(n,e,...t){let o=[];e instanceof Lc&&o.push(e),o=o.concat(t),function(i){const s=i.filter(u=>u instanceof ls).length,c=i.filter(u=>u instanceof Er).length;if(s>1||s>0&&c>0)throw new L(N.INVALID_ARGUMENT,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")}(o);for(const r of o)n=r._apply(n);return n}class Er extends xc{constructor(e,t,o){super(),this._field=e,this._op=t,this._value=o,this.type="where"}static _create(e,t,o){return new Er(e,t,o)}_apply(e){const t=this._parse(e);return Ug(e._query,t),new Nt(e.firestore,e.converter,Sa(e._query,t))}_parse(e){const t=vr(e.firestore);return function(i,s,c,u,d,f,p){let m;if(d.isKeyField()){if(f==="array-contains"||f==="array-contains-any")throw new L(N.INVALID_ARGUMENT,`Invalid Query. You can't perform '${f}' queries on documentId().`);if(f==="in"||f==="not-in"){Hd(p,f);const C=[];for(const M of p)C.push(jd(u,i,M));m={arrayValue:{values:C}}}else m=jd(u,i,p)}else f!=="in"&&f!=="not-in"&&f!=="array-contains-any"||Hd(p,f),m=jT(c,s,p,f==="in"||f==="not-in");return ye.create(d,f,m)}(e._query,"where",t,e.firestore._databaseId,this._field,this._op,this._value)}}function Ae(n,e,t){const o=e,r=cs("where",n);return Er._create(r,o,t)}class ls extends Lc{constructor(e,t){super(),this.type=e,this._queryConstraints=t}static _create(e,t){return new ls(e,t)}_parse(e){const t=this._queryConstraints.map(o=>o._parse(e)).filter(o=>o.getFilters().length>0);return t.length===1?t[0]:it.create(t,this._getOperator())}_apply(e){const t=this._parse(e);return t.getFilters().length===0?e:(function(r,i){let s=r;const c=i.getFlattenedFilters();for(const u of c)Ug(s,u),s=Sa(s,u)}(e._query,t),new Nt(e.firestore,e.converter,Sa(e._query,t)))}_getQueryConstraints(){return this._queryConstraints}_getOperator(){return this.type==="and"?"and":"or"}}class us extends xc{constructor(e,t){super(),this._field=e,this._direction=t,this.type="orderBy"}static _create(e,t){return new us(e,t)}_apply(e){const t=function(r,i,s){if(r.startAt!==null)throw new L(N.INVALID_ARGUMENT,"Invalid query. You must not call startAt() or startAfter() before calling orderBy().");if(r.endAt!==null)throw new L(N.INVALID_ARGUMENT,"Invalid query. You must not call endAt() or endBefore() before calling orderBy().");return new cr(i,s)}(e._query,this._field,this._direction);return new Nt(e.firestore,e.converter,function(r,i){const s=r.explicitOrderBy.concat([i]);return new wo(r.path,r.collectionGroup,s,r.filters.slice(),r.limit,r.limitType,r.startAt,r.endAt)}(e._query,t))}}function xg(n,e="asc"){const t=e,o=cs("orderBy",n);return us._create(o,t)}function jd(n,e,t){if(typeof(t=he(t))=="string"){if(t==="")throw new L(N.INVALID_ARGUMENT,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!Of(e)&&t.indexOf("/")!==-1)throw new L(N.INVALID_ARGUMENT,`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${t}' contains a '/' character.`);const o=e.path.child(re.fromString(t));if(!F.isDocumentKey(o))throw new L(N.INVALID_ARGUMENT,`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${o}' is not because it has an odd number of segments (${o.length}).`);return ad(n,new F(o))}if(t instanceof ae)return ad(n,t._key);throw new L(N.INVALID_ARGUMENT,`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${ji(t)}.`)}function Hd(n,e){if(!Array.isArray(n)||n.length===0)throw new L(N.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${e.toString()}' filters.`)}function Ug(n,e){const t=function(r,i){for(const s of r)for(const c of s.getFlattenedFilters())if(i.indexOf(c.op)>=0)return c.op;return null}(n.filters,function(r){switch(r){case"!=":return["!=","not-in"];case"array-contains-any":case"in":return["not-in"];case"not-in":return["array-contains-any","in","not-in","!="];default:return[]}}(e.op));if(t!==null)throw t===e.op?new L(N.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${e.op.toString()}' filter.`):new L(N.INVALID_ARGUMENT,`Invalid query. You cannot use '${e.op.toString()}' filters with '${t.toString()}' filters.`)}class Fg{convertValue(e,t="none"){switch(Qt(e)){case 0:return null;case 1:return e.booleanValue;case 2:return pe(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,t);case 5:return e.stringValue;case 6:return this.convertBytes(Kt(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,t);case 11:return this.convertObject(e.mapValue,t);case 10:return this.convertVectorValue(e.mapValue);default:throw $(62114,{value:e})}}convertObject(e,t){return this.convertObjectMap(e.fields,t)}convertObjectMap(e,t="none"){const o={};return Xt(e,(r,i)=>{o[r]=this.convertValue(i,t)}),o}convertVectorValue(e){const t=e.fields?.[Ii].arrayValue?.values?.map(o=>pe(o.doubleValue));return new ot(t)}convertGeoPoint(e){return new nt(pe(e.latitude),pe(e.longitude))}convertArray(e,t){return(e.values||[]).map(o=>this.convertValue(o,t))}convertServerTimestamp(e,t){switch(t){case"previous":const o=Ki(e);return o==null?null:this.convertValue(o,t);case"estimate":return this.convertTimestamp(sr(e));default:return null}}convertTimestamp(e){const t=Wt(e);return new oe(t.seconds,t.nanos)}convertDocumentKey(e,t){const o=re.fromString(e);te(ng(o),9688,{name:e});const r=new Yn(o.get(1),o.get(3)),i=new F(o.popFirst(5));return r.isEqual(t)||Ct(`Document ${i} contains a document reference within a different database (${r.projectId}/${r.database}) which is not supported. It will be treated as a reference in the current database (${t.projectId}/${t.database}) instead.`),i}}/**
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
 */function Uc(n,e,t){let o;return o=n?t&&(t.merge||t.mergeFields)?n.toFirestore(e,t):n.toFirestore(e):e,o}class Fn{constructor(e,t){this.hasPendingWrites=e,this.fromCache=t}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class qt extends Bg{constructor(e,t,o,r,i,s){super(e,t,o,r,s),this._firestore=e,this._firestoreImpl=e,this.metadata=i}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){const t=new Zo(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(t,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,t={}){if(this._document){const o=this._document.data.field(cs("DocumentSnapshot.get",e));if(o!==null)return this._userDataWriter.convertValue(o,t.serverTimestamps)}}toJSON(){if(this.metadata.hasPendingWrites)throw new L(N.FAILED_PRECONDITION,"DocumentSnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e=this._document,t={};return t.type=qt._jsonSchemaVersion,t.bundle="",t.bundleSource="DocumentSnapshot",t.bundleName=this._key.toString(),!e||!e.isValidDocument()||!e.isFoundDocument()?t:(this._userDataWriter.convertObjectMap(e.data.value.mapValue.fields,"previous"),t.bundle=(this._firestore,this.ref.path,"NOT SUPPORTED"),t)}}qt._jsonSchemaVersion="firestore/documentSnapshot/1.0",qt._jsonSchema={type:_e("string",qt._jsonSchemaVersion),bundleSource:_e("string","DocumentSnapshot"),bundleName:_e("string"),bundle:_e("string")};class Zo extends qt{data(e={}){return super.data(e)}}class jt{constructor(e,t,o,r){this._firestore=e,this._userDataWriter=t,this._snapshot=r,this.metadata=new Fn(r.hasPendingWrites,r.fromCache),this.query=o}get docs(){const e=[];return this.forEach(t=>e.push(t)),e}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(e,t){this._snapshot.docs.forEach(o=>{e.call(t,new Zo(this._firestore,this._userDataWriter,o.key,o,new Fn(this._snapshot.mutatedKeys.has(o.key),this._snapshot.fromCache),this.query.converter))})}docChanges(e={}){const t=!!e.includeMetadataChanges;if(t&&this._snapshot.excludesMetadataChanges)throw new L(N.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===t||(this._cachedChanges=function(r,i){if(r._snapshot.oldDocs.isEmpty()){let s=0;return r._snapshot.docChanges.map(c=>{const u=new Zo(r._firestore,r._userDataWriter,c.doc.key,c.doc,new Fn(r._snapshot.mutatedKeys.has(c.doc.key),r._snapshot.fromCache),r.query.converter);return c.doc,{type:"added",doc:u,oldIndex:-1,newIndex:s++}})}{let s=r._snapshot.oldDocs;return r._snapshot.docChanges.filter(c=>i||c.type!==3).map(c=>{const u=new Zo(r._firestore,r._userDataWriter,c.doc.key,c.doc,new Fn(r._snapshot.mutatedKeys.has(c.doc.key),r._snapshot.fromCache),r.query.converter);let d=-1,f=-1;return c.type!==0&&(d=s.indexOf(c.doc.key),s=s.delete(c.doc.key)),c.type!==1&&(s=s.add(c.doc),f=s.indexOf(c.doc.key)),{type:KT(c.type),doc:u,oldIndex:d,newIndex:f}})}}(this,t),this._cachedChangesIncludeMetadataChanges=t),this._cachedChanges}toJSON(){if(this.metadata.hasPendingWrites)throw new L(N.FAILED_PRECONDITION,"QuerySnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e={};e.type=jt._jsonSchemaVersion,e.bundleSource="QuerySnapshot",e.bundleName=qi.newId(),this._firestore._databaseId.database,this._firestore._databaseId.projectId;const t=[],o=[],r=[];return this.docs.forEach(i=>{i._document!==null&&(t.push(i._document),o.push(this._userDataWriter.convertObjectMap(i._document.data.value.mapValue.fields,"previous")),r.push(i.ref.path))}),e.bundle=(this._firestore,this.query._query,e.bundleName,"NOT SUPPORTED"),e}}function KT(n){switch(n){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return $(61501,{type:n})}}/**
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
 */function br(n){n=xe(n,ae);const e=xe(n.firestore,st);return UT(_o(e),n._key).then(t=>$g(e,n,t))}jt._jsonSchemaVersion="firestore/querySnapshot/1.0",jt._jsonSchema={type:_e("string",jt._jsonSchemaVersion),bundleSource:_e("string","QuerySnapshot"),bundleName:_e("string"),bundle:_e("string")};class Fc extends Fg{constructor(e){super(),this.firestore=e}convertBytes(e){return new We(e)}convertReference(e){const t=this.convertDocumentKey(e,this.firestore._databaseId);return new ae(this.firestore,null,t)}}function wt(n){n=xe(n,Nt);const e=xe(n.firestore,st),t=_o(e),o=new Fc(e);return Lg(n._query),FT(t,n._query).then(r=>new jt(e,o,n,r))}function QT(n,e,t){n=xe(n,ae);const o=xe(n.firestore,st),r=Uc(n.converter,e,t);return bo(o,[Pc(vr(o),"setDoc",n._key,r,n.converter!==null,t).toMutation(n._key,Ge.none())])}function en(n,e,t,...o){n=xe(n,ae);const r=xe(n.firestore,st),i=vr(r);let s;return s=typeof(e=he(e))=="string"||e instanceof vo?kg(i,"updateDoc",n._key,e,t,o):Pg(i,"updateDoc",n._key,e),bo(r,[s.toMutation(n._key,Ge.exists(!0))])}function Eo(n){return bo(xe(n.firestore,st),[new es(n._key,Ge.none())])}function tn(n,e){const t=xe(n.firestore,st),o=fe(n),r=Uc(n.converter,e);return bo(t,[Pc(vr(n.firestore),"addDoc",o._key,r,n.converter!==null,{}).toMutation(o._key,Ge.exists(!1))]).then(()=>o)}function Tr(n,...e){n=he(n);let t={includeMetadataChanges:!1,source:"default"},o=0;typeof e[o]!="object"||qd(e[o])||(t=e[o++]);const r={includeMetadataChanges:t.includeMetadataChanges,source:t.source};if(qd(e[o])){const u=e[o];e[o]=u.next?.bind(u),e[o+1]=u.error?.bind(u),e[o+2]=u.complete?.bind(u)}let i,s,c;if(n instanceof ae)s=xe(n.firestore,st),c=Qi(n._key.path),i={next:u=>{e[o]&&e[o]($g(s,n,u))},error:e[o+1],complete:e[o+2]};else{const u=xe(n,Nt);s=xe(u.firestore,st),c=u._query;const d=new Fc(s);i={next:f=>{e[o]&&e[o](new jt(s,d,u,f))},error:e[o+1],complete:e[o+2]},Lg(n._query)}return function(d,f,p,m){const S=new Nc(m),C=new Dc(f,S,p);return d.asyncQueue.enqueueAndForget(async()=>Ic(await Pi(d),C)),()=>{S.Nu(),d.asyncQueue.enqueueAndForget(async()=>Sc(await Pi(d),C))}}(_o(s),c,r,i)}function bo(n,e){return function(o,r){const i=new It;return o.asyncQueue.enqueueAndForget(async()=>DT(await xT(o),r,i)),i.promise}(_o(n),e)}function $g(n,e,t){const o=t.docs.get(e._key),r=new Fc(n);return new qt(n,r,e._key,o,new Fn(t.hasPendingWrites,t.fromCache),e.converter)}/**
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
 */class Gg{constructor(e,t){this._firestore=e,this._commitHandler=t,this._mutations=[],this._committed=!1,this._dataReader=vr(e)}set(e,t,o){this._verifyNotCommitted();const r=oa(e,this._firestore),i=Uc(r.converter,t,o),s=Pc(this._dataReader,"WriteBatch.set",r._key,i,r.converter!==null,o);return this._mutations.push(s.toMutation(r._key,Ge.none())),this}update(e,t,o,...r){this._verifyNotCommitted();const i=oa(e,this._firestore);let s;return s=typeof(t=he(t))=="string"||t instanceof vo?kg(this._dataReader,"WriteBatch.update",i._key,t,o,r):Pg(this._dataReader,"WriteBatch.update",i._key,t),this._mutations.push(s.toMutation(i._key,Ge.exists(!0))),this}delete(e){this._verifyNotCommitted();const t=oa(e,this._firestore);return this._mutations=this._mutations.concat(new es(t._key,Ge.none())),this}commit(){return this._verifyNotCommitted(),this._committed=!0,this._mutations.length>0?this._commitHandler(this._mutations):Promise.resolve()}_verifyNotCommitted(){if(this._committed)throw new L(N.FAILED_PRECONDITION,"A write batch can no longer be used after commit() has been called.")}}function oa(n,e){if((n=he(n)).firestore!==e)throw new L(N.INVALID_ARGUMENT,"Provided document reference is from a different Firestore instance.");return n}function ds(){return new kc("serverTimestamp")}function YT(...n){return new Mc("arrayUnion",n)}function JT(...n){return new Oc("arrayRemove",n)}/**
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
 */function Ir(n){return _o(n=xe(n,st)),new Gg(n,e=>bo(n,e))}(function(e,t=!0){(function(r){go=r})(ho),gt(new rt("firestore",(o,{instanceIdentifier:r,options:i})=>{const s=o.getProvider("app").getImmediate(),c=new st(new Kv(o.getProvider("auth-internal")),new Jv(s,o.getProvider("app-check-internal")),function(d,f){if(!Object.prototype.hasOwnProperty.apply(d.options,["projectId"]))throw new L(N.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new Yn(d.options.projectId,f)}(s,r),s);return i={useFetchStreams:t,...i},c._setSettings(i),c},"PUBLIC").setMultipleInstances(!0)),Je(Ku,Qu,e),Je(Ku,Qu,"esm2020")})();const Ye=Object.freeze(Object.defineProperty({__proto__:null,AbstractUserDataWriter:Fg,Bytes:We,CollectionReference:St,DocumentReference:ae,DocumentSnapshot:qt,FieldPath:vo,FieldValue:Dn,Firestore:st,FirestoreError:L,GeoPoint:nt,Query:Nt,QueryCompositeFilterConstraint:ls,QueryConstraint:xc,QueryDocumentSnapshot:Zo,QueryFieldFilterConstraint:Er,QueryOrderByConstraint:us,QuerySnapshot:jt,SnapshotMetadata:Fn,Timestamp:oe,VectorValue:ot,WriteBatch:Gg,_AutoId:qi,_ByteString:Se,_DatabaseId:Yn,_DocumentKey:F,_EmptyAuthCredentialsProvider:gf,_FieldPath:Ie,_cast:xe,_logWarn:_n,_validateIsNotUsedTogether:mf,addDoc:tn,arrayRemove:JT,arrayUnion:YT,collection:me,connectFirestoreEmulator:Ag,deleteDoc:Eo,doc:fe,ensureFirestoreConfigured:_o,executeWrite:bo,getDoc:br,getDocs:wt,getFirestore:Dg,onSnapshot:Tr,orderBy:xg,query:Re,serverTimestamp:ds,setDoc:QT,updateDoc:en,where:Ae,writeBatch:Ir},Symbol.toStringTag,{value:"Module"})),zg="@firebase/installations",$c="0.6.19";/**
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
 */const qg=1e4,jg=`w:${$c}`,Hg="FIS_v2",XT="https://firebaseinstallations.googleapis.com/v1",ZT=3600*1e3,eI="installations",tI="Installations";/**
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
 */const nI={"missing-app-config-values":'Missing App configuration value: "{$valueName}"',"not-registered":"Firebase Installation is not registered.","installation-not-found":"Firebase Installation not found.","request-failed":'{$requestName} request failed with error "{$serverCode} {$serverStatus}: {$serverMessage}"',"app-offline":"Could not process request. Application offline.","delete-pending-registration":"Can't delete installation while there is a pending registration request."},En=new Tn(eI,tI,nI);function Wg(n){return n instanceof at&&n.code.includes("request-failed")}/**
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
 */function Kg({projectId:n}){return`${XT}/projects/${n}/installations`}function Qg(n){return{token:n.token,requestStatus:2,expiresIn:rI(n.expiresIn),creationTime:Date.now()}}async function Yg(n,e){const o=(await e.json()).error;return En.create("request-failed",{requestName:n,serverCode:o.code,serverMessage:o.message,serverStatus:o.status})}function Jg({apiKey:n}){return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":n})}function oI(n,{refreshToken:e}){const t=Jg(n);return t.append("Authorization",iI(e)),t}async function Xg(n){const e=await n();return e.status>=500&&e.status<600?n():e}function rI(n){return Number(n.replace("s","000"))}function iI(n){return`${Hg} ${n}`}/**
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
 */async function sI({appConfig:n,heartbeatServiceProvider:e},{fid:t}){const o=Kg(n),r=Jg(n),i=e.getImmediate({optional:!0});if(i){const d=await i.getHeartbeatsHeader();d&&r.append("x-firebase-client",d)}const s={fid:t,authVersion:Hg,appId:n.appId,sdkVersion:jg},c={method:"POST",headers:r,body:JSON.stringify(s)},u=await Xg(()=>fetch(o,c));if(u.ok){const d=await u.json();return{fid:d.fid||t,registrationStatus:2,refreshToken:d.refreshToken,authToken:Qg(d.authToken)}}else throw await Yg("Create Installation",u)}/**
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
 */function Zg(n){return new Promise(e=>{setTimeout(e,n)})}/**
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
 */function aI(n){return btoa(String.fromCharCode(...n)).replace(/\+/g,"-").replace(/\//g,"_")}/**
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
 */const cI=/^[cdef][\w-]{21}$/,La="";function lI(){try{const n=new Uint8Array(17);(self.crypto||self.msCrypto).getRandomValues(n),n[0]=112+n[0]%16;const t=uI(n);return cI.test(t)?t:La}catch{return La}}function uI(n){return aI(n).substr(0,22)}/**
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
 */function hs(n){return`${n.appName}!${n.appId}`}/**
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
 */const ep=new Map;function tp(n,e){const t=hs(n);np(t,e),dI(t,e)}function np(n,e){const t=ep.get(n);if(t)for(const o of t)o(e)}function dI(n,e){const t=hI();t&&t.postMessage({key:n,fid:e}),fI()}let fn=null;function hI(){return!fn&&"BroadcastChannel"in self&&(fn=new BroadcastChannel("[Firebase] FID Change"),fn.onmessage=n=>{np(n.data.key,n.data.fid)}),fn}function fI(){ep.size===0&&fn&&(fn.close(),fn=null)}/**
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
 */const gI="firebase-installations-database",pI=1,bn="firebase-installations-store";let ra=null;function Gc(){return ra||(ra=Ih(gI,pI,{upgrade:(n,e)=>{switch(e){case 0:n.createObjectStore(bn)}}})),ra}async function Mi(n,e){const t=hs(n),r=(await Gc()).transaction(bn,"readwrite"),i=r.objectStore(bn),s=await i.get(t);return await i.put(e,t),await r.done,(!s||s.fid!==e.fid)&&tp(n,e.fid),e}async function op(n){const e=hs(n),o=(await Gc()).transaction(bn,"readwrite");await o.objectStore(bn).delete(e),await o.done}async function fs(n,e){const t=hs(n),r=(await Gc()).transaction(bn,"readwrite"),i=r.objectStore(bn),s=await i.get(t),c=e(s);return c===void 0?await i.delete(t):await i.put(c,t),await r.done,c&&(!s||s.fid!==c.fid)&&tp(n,c.fid),c}/**
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
 */async function zc(n){let e;const t=await fs(n.appConfig,o=>{const r=mI(o),i=wI(n,r);return e=i.registrationPromise,i.installationEntry});return t.fid===La?{installationEntry:await e}:{installationEntry:t,registrationPromise:e}}function mI(n){const e=n||{fid:lI(),registrationStatus:0};return rp(e)}function wI(n,e){if(e.registrationStatus===0){if(!navigator.onLine){const r=Promise.reject(En.create("app-offline"));return{installationEntry:e,registrationPromise:r}}const t={fid:e.fid,registrationStatus:1,registrationTime:Date.now()},o=yI(n,t);return{installationEntry:t,registrationPromise:o}}else return e.registrationStatus===1?{installationEntry:e,registrationPromise:_I(n)}:{installationEntry:e}}async function yI(n,e){try{const t=await sI(n,e);return Mi(n.appConfig,t)}catch(t){throw Wg(t)&&t.customData.serverCode===409?await op(n.appConfig):await Mi(n.appConfig,{fid:e.fid,registrationStatus:0}),t}}async function _I(n){let e=await Wd(n.appConfig);for(;e.registrationStatus===1;)await Zg(100),e=await Wd(n.appConfig);if(e.registrationStatus===0){const{installationEntry:t,registrationPromise:o}=await zc(n);return o||t}return e}function Wd(n){return fs(n,e=>{if(!e)throw En.create("installation-not-found");return rp(e)})}function rp(n){return vI(n)?{fid:n.fid,registrationStatus:0}:n}function vI(n){return n.registrationStatus===1&&n.registrationTime+qg<Date.now()}/**
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
 */async function EI({appConfig:n,heartbeatServiceProvider:e},t){const o=bI(n,t),r=oI(n,t),i=e.getImmediate({optional:!0});if(i){const d=await i.getHeartbeatsHeader();d&&r.append("x-firebase-client",d)}const s={installation:{sdkVersion:jg,appId:n.appId}},c={method:"POST",headers:r,body:JSON.stringify(s)},u=await Xg(()=>fetch(o,c));if(u.ok){const d=await u.json();return Qg(d)}else throw await Yg("Generate Auth Token",u)}function bI(n,{fid:e}){return`${Kg(n)}/${e}/authTokens:generate`}/**
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
 */async function qc(n,e=!1){let t;const o=await fs(n.appConfig,i=>{if(!ip(i))throw En.create("not-registered");const s=i.authToken;if(!e&&SI(s))return i;if(s.requestStatus===1)return t=TI(n,e),i;{if(!navigator.onLine)throw En.create("app-offline");const c=DI(i);return t=II(n,c),c}});return t?await t:o.authToken}async function TI(n,e){let t=await Kd(n.appConfig);for(;t.authToken.requestStatus===1;)await Zg(100),t=await Kd(n.appConfig);const o=t.authToken;return o.requestStatus===0?qc(n,e):o}function Kd(n){return fs(n,e=>{if(!ip(e))throw En.create("not-registered");const t=e.authToken;return CI(t)?{...e,authToken:{requestStatus:0}}:e})}async function II(n,e){try{const t=await EI(n,e),o={...e,authToken:t};return await Mi(n.appConfig,o),t}catch(t){if(Wg(t)&&(t.customData.serverCode===401||t.customData.serverCode===404))await op(n.appConfig);else{const o={...e,authToken:{requestStatus:0}};await Mi(n.appConfig,o)}throw t}}function ip(n){return n!==void 0&&n.registrationStatus===2}function SI(n){return n.requestStatus===2&&!AI(n)}function AI(n){const e=Date.now();return e<n.creationTime||n.creationTime+n.expiresIn<e+ZT}function DI(n){const e={requestStatus:1,requestTime:Date.now()};return{...n,authToken:e}}function CI(n){return n.requestStatus===1&&n.requestTime+qg<Date.now()}/**
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
 */async function RI(n){const e=n,{installationEntry:t,registrationPromise:o}=await zc(e);return o?o.catch(console.error):qc(e).catch(console.error),t.fid}/**
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
 */async function NI(n,e=!1){const t=n;return await PI(t),(await qc(t,e)).token}async function PI(n){const{registrationPromise:e}=await zc(n);e&&await e}/**
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
 */function kI(n){if(!n||!n.options)throw ia("App Configuration");if(!n.name)throw ia("App Name");const e=["projectId","apiKey","appId"];for(const t of e)if(!n.options[t])throw ia(t);return{appName:n.name,projectId:n.options.projectId,apiKey:n.options.apiKey,appId:n.options.appId}}function ia(n){return En.create("missing-app-config-values",{valueName:n})}/**
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
 */const sp="installations",MI="installations-internal",OI=n=>{const e=n.getProvider("app").getImmediate(),t=kI(e),o=In(e,"heartbeat");return{app:e,appConfig:t,heartbeatServiceProvider:o,_delete:()=>Promise.resolve()}},VI=n=>{const e=n.getProvider("app").getImmediate(),t=In(e,sp).getImmediate();return{getId:()=>RI(t),getToken:r=>NI(t,r)}};function BI(){gt(new rt(sp,OI,"PUBLIC")),gt(new rt(MI,VI,"PRIVATE"))}BI();Je(zg,$c);Je(zg,$c,"esm2020");/**
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
 */const Oi="analytics",LI="firebase_id",xI="origin",UI=60*1e3,FI="https://firebase.googleapis.com/v1alpha/projects/-/apps/{app-id}/webConfig",jc="https://www.googletagmanager.com/gtag/js";/**
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
 */const je=new Fi("@firebase/analytics");/**
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
 */const $I={"already-exists":"A Firebase Analytics instance with the appId {$id}  already exists. Only one Firebase Analytics instance can be created for each appId.","already-initialized":"initializeAnalytics() cannot be called again with different options than those it was initially called with. It can be called again with the same options to return the existing instance, or getAnalytics() can be used to get a reference to the already-initialized instance.","already-initialized-settings":"Firebase Analytics has already been initialized.settings() must be called before initializing any Analytics instanceor it will have no effect.","interop-component-reg-failed":"Firebase Analytics Interop Component failed to instantiate: {$reason}","invalid-analytics-context":"Firebase Analytics is not supported in this environment. Wrap initialization of analytics in analytics.isSupported() to prevent initialization in unsupported environments. Details: {$errorInfo}","indexeddb-unavailable":"IndexedDB unavailable or restricted in this environment. Wrap initialization of analytics in analytics.isSupported() to prevent initialization in unsupported environments. Details: {$errorInfo}","fetch-throttle":"The config fetch request timed out while in an exponential backoff state. Unix timestamp in milliseconds when fetch request throttling ends: {$throttleEndTimeMillis}.","config-fetch-failed":"Dynamic config fetch failed: [{$httpStatus}] {$responseMessage}","no-api-key":'The "apiKey" field is empty in the local Firebase config. Firebase Analytics requires this field tocontain a valid API key.',"no-app-id":'The "appId" field is empty in the local Firebase config. Firebase Analytics requires this field tocontain a valid app ID.',"no-client-id":'The "client_id" field is empty.',"invalid-gtag-resource":"Trusted Types detected an invalid gtag resource: {$gtagURL}."},Qe=new Tn("analytics","Analytics",$I);/**
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
 */function GI(n){if(!n.startsWith(jc)){const e=Qe.create("invalid-gtag-resource",{gtagURL:n});return je.warn(e.message),""}return n}function ap(n){return Promise.all(n.map(e=>e.catch(t=>t)))}function zI(n,e){let t;return window.trustedTypes&&(t=window.trustedTypes.createPolicy(n,e)),t}function qI(n,e){const t=zI("firebase-js-sdk-policy",{createScriptURL:GI}),o=document.createElement("script"),r=`${jc}?l=${n}&id=${e}`;o.src=t?t?.createScriptURL(r):r,o.async=!0,document.head.appendChild(o)}function jI(n){let e=[];return Array.isArray(window[n])?e=window[n]:window[n]=e,e}async function HI(n,e,t,o,r,i){const s=o[r];try{if(s)await e[s];else{const u=(await ap(t)).find(d=>d.measurementId===r);u&&await e[u.appId]}}catch(c){je.error(c)}n("config",r,i)}async function WI(n,e,t,o,r){try{let i=[];if(r&&r.send_to){let s=r.send_to;Array.isArray(s)||(s=[s]);const c=await ap(t);for(const u of s){const d=c.find(p=>p.measurementId===u),f=d&&e[d.appId];if(f)i.push(f);else{i=[];break}}}i.length===0&&(i=Object.values(e)),await Promise.all(i),n("event",o,r||{})}catch(i){je.error(i)}}function KI(n,e,t,o){async function r(i,...s){try{if(i==="event"){const[c,u]=s;await WI(n,e,t,c,u)}else if(i==="config"){const[c,u]=s;await HI(n,e,t,o,c,u)}else if(i==="consent"){const[c,u]=s;n("consent",c,u)}else if(i==="get"){const[c,u,d]=s;n("get",c,u,d)}else if(i==="set"){const[c]=s;n("set",c)}else n(i,...s)}catch(c){je.error(c)}}return r}function QI(n,e,t,o,r){let i=function(...s){window[o].push(arguments)};return window[r]&&typeof window[r]=="function"&&(i=window[r]),window[r]=KI(i,n,e,t),{gtagCore:i,wrappedGtag:window[r]}}function YI(n){const e=window.document.getElementsByTagName("script");for(const t of Object.values(e))if(t.src&&t.src.includes(jc)&&t.src.includes(n))return t;return null}/**
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
 */const JI=30,XI=1e3;class ZI{constructor(e={},t=XI){this.throttleMetadata=e,this.intervalMillis=t}getThrottleMetadata(e){return this.throttleMetadata[e]}setThrottleMetadata(e,t){this.throttleMetadata[e]=t}deleteThrottleMetadata(e){delete this.throttleMetadata[e]}}const cp=new ZI;function eS(n){return new Headers({Accept:"application/json","x-goog-api-key":n})}async function tS(n){const{appId:e,apiKey:t}=n,o={method:"GET",headers:eS(t)},r=FI.replace("{app-id}",e),i=await fetch(r,o);if(i.status!==200&&i.status!==304){let s="";try{const c=await i.json();c.error?.message&&(s=c.error.message)}catch{}throw Qe.create("config-fetch-failed",{httpStatus:i.status,responseMessage:s})}return i.json()}async function nS(n,e=cp,t){const{appId:o,apiKey:r,measurementId:i}=n.options;if(!o)throw Qe.create("no-app-id");if(!r){if(i)return{measurementId:i,appId:o};throw Qe.create("no-api-key")}const s=e.getThrottleMetadata(o)||{backoffCount:0,throttleEndTimeMillis:Date.now()},c=new iS;return setTimeout(async()=>{c.abort()},UI),lp({appId:o,apiKey:r,measurementId:i},s,c,e)}async function lp(n,{throttleEndTimeMillis:e,backoffCount:t},o,r=cp){const{appId:i,measurementId:s}=n;try{await oS(o,e)}catch(c){if(s)return je.warn(`Timed out fetching this Firebase app's measurement ID from the server. Falling back to the measurement ID ${s} provided in the "measurementId" field in the local Firebase config. [${c?.message}]`),{appId:i,measurementId:s};throw c}try{const c=await tS(n);return r.deleteThrottleMetadata(i),c}catch(c){const u=c;if(!rS(u)){if(r.deleteThrottleMetadata(i),s)return je.warn(`Failed to fetch this Firebase app's measurement ID from the server. Falling back to the measurement ID ${s} provided in the "measurementId" field in the local Firebase config. [${u?.message}]`),{appId:i,measurementId:s};throw c}const d=Number(u?.customData?.httpStatus)===503?Eu(t,r.intervalMillis,JI):Eu(t,r.intervalMillis),f={throttleEndTimeMillis:Date.now()+d,backoffCount:t+1};return r.setThrottleMetadata(i,f),je.debug(`Calling attemptFetch again in ${d} millis`),lp(n,f,o,r)}}function oS(n,e){return new Promise((t,o)=>{const r=Math.max(e-Date.now(),0),i=setTimeout(t,r);n.addEventListener(()=>{clearTimeout(i),o(Qe.create("fetch-throttle",{throttleEndTimeMillis:e}))})})}function rS(n){if(!(n instanceof at)||!n.customData)return!1;const e=Number(n.customData.httpStatus);return e===429||e===500||e===503||e===504}class iS{constructor(){this.listeners=[]}addEventListener(e){this.listeners.push(e)}abort(){this.listeners.forEach(e=>e())}}async function sS(n,e,t,o,r){if(r&&r.global){n("event",t,o);return}else{const i=await e,s={...o,send_to:i};n("event",t,s)}}/**
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
 */async function aS(){if(vh())try{await Eh()}catch(n){return je.warn(Qe.create("indexeddb-unavailable",{errorInfo:n?.toString()}).message),!1}else return je.warn(Qe.create("indexeddb-unavailable",{errorInfo:"IndexedDB is not available in this environment."}).message),!1;return!0}async function cS(n,e,t,o,r,i,s){const c=nS(n);c.then(m=>{t[m.measurementId]=m.appId,n.options.measurementId&&m.measurementId!==n.options.measurementId&&je.warn(`The measurement ID in the local Firebase config (${n.options.measurementId}) does not match the measurement ID fetched from the server (${m.measurementId}). To ensure analytics events are always sent to the correct Analytics property, update the measurement ID field in the local config or remove it from the local config.`)}).catch(m=>je.error(m)),e.push(c);const u=aS().then(m=>{if(m)return o.getId()}),[d,f]=await Promise.all([c,u]);YI(i)||qI(i,d.measurementId),r("js",new Date);const p=s?.config??{};return p[xI]="firebase",p.update=!0,f!=null&&(p[LI]=f),r("config",d.measurementId,p),d.measurementId}/**
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
 */class lS{constructor(e){this.app=e}_delete(){return delete er[this.app.options.appId],Promise.resolve()}}let er={},Qd=[];const Yd={};let sa="dataLayer",uS="gtag",Jd,up,Xd=!1;function dS(){const n=[];if(_h()&&n.push("This is a browser extension environment."),Dw()||n.push("Cookies are not available."),n.length>0){const e=n.map((o,r)=>`(${r+1}) ${o}`).join(" "),t=Qe.create("invalid-analytics-context",{errorInfo:e});je.warn(t.message)}}function hS(n,e,t){dS();const o=n.options.appId;if(!o)throw Qe.create("no-app-id");if(!n.options.apiKey)if(n.options.measurementId)je.warn(`The "apiKey" field is empty in the local Firebase config. This is needed to fetch the latest measurement ID for this Firebase app. Falling back to the measurement ID ${n.options.measurementId} provided in the "measurementId" field in the local Firebase config.`);else throw Qe.create("no-api-key");if(er[o]!=null)throw Qe.create("already-exists",{id:o});if(!Xd){jI(sa);const{wrappedGtag:i,gtagCore:s}=QI(er,Qd,Yd,sa,uS);up=i,Jd=s,Xd=!0}return er[o]=cS(n,Qd,Yd,e,Jd,sa,t),new lS(n)}function fS(n=Ha()){n=he(n);const e=In(n,Oi);return e.isInitialized()?e.getImmediate():gS(n)}function gS(n,e={}){const t=In(n,Oi);if(t.isInitialized()){const r=t.getImmediate();if(ft(e,t.getOptions()))return r;throw Qe.create("already-initialized")}return t.initialize({options:e})}function pS(n,e,t,o){n=he(n),sS(up,er[n.app.options.appId],e,t,o).catch(r=>je.error(r))}const Zd="@firebase/analytics",eh="0.10.18";function mS(){gt(new rt(Oi,(e,{options:t})=>{const o=e.getProvider("app").getImmediate(),r=e.getProvider("installations-internal").getImmediate();return hS(o,r,t)},"PUBLIC")),gt(new rt("analytics-internal",n,"PRIVATE")),Je(Zd,eh),Je(Zd,eh,"esm2020");function n(e){try{const t=e.getProvider(Oi).getImmediate();return{logEvent:(o,r,i)=>pS(t,o,r,i)}}catch(t){throw Qe.create("interop-component-reg-failed",{reason:t})}}}mS();const an={},dp={apiKey:an?.VITE_FIREBASE_API_KEY||"AIzaSyCbBmmxn4Qj4CU6ymfG4MY5VGqCPSo13HY",authDomain:an?.VITE_FIREBASE_AUTH_DOMAIN||"controle-financeiro-b98ec.firebaseapp.com",projectId:an?.VITE_FIREBASE_PROJECT_ID||"controle-financeiro-b98ec",storageBucket:an?.VITE_FIREBASE_STORAGE_BUCKET||"controle-financeiro-b98ec.firebasestorage.app",messagingSenderId:an?.VITE_FIREBASE_MESSAGING_SENDER_ID||"418109336597",appId:an?.VITE_FIREBASE_APP_ID||"1:418109336597:web:871b262a76e57455ebb21c",measurementId:an?.VITE_FIREBASE_MEASUREMENT_ID||"G-7RW2F269V6"},Sr=Sh(dp);try{console.info("[Firebase] Connected project:",dp.projectId)}catch{}const gs=jv(Sr),ee=Dg(Sr);let Hc=null;try{Hc=fS(Sr)}catch{}const Wc=M_(gs,Qh).then(()=>{try{console.info("[Firebase] Auth persistence set to local")}catch{}}).catch(n=>{console.error("Firebase Auth persistence error:",n)}),Rn=Object.freeze(Object.defineProperty({__proto__:null,get analytics(){return Hc},app:Sr,auth:gs,authReady:Wc,db:ee},Symbol.toStringTag,{value:"Module"})),Nn="transactions";function Kc(n){return{id:n.id,...n.data()}}function Vi(n){try{if(n&&typeof n.toDate=="function")return n.toDate();if(n&&typeof n=="object"&&"seconds"in n)return new Date(n.seconds*1e3);if(n instanceof Date)return n;if(typeof n=="string"||typeof n=="number")return new Date(n)}catch{}return new Date(0)}async function Bi({budgetId:n,userId:e}={}){const t=me(ee,Nn),o=[];n&&o.push(Ae("budgetId","==",n)),e&&o.push(Ae("userId","==",e));const r=o.length?Re(t,...o):Re(t),s=(await wt(r)).docs.map(Kc);return s.sort((c,u)=>Vi(u.createdAt)-Vi(c.createdAt)),s}async function Qc(n){const e=fe(ee,Nn,n),t=await br(e);return t.exists()?Kc(t):null}async function ps(n){const e=ds(),t={...n};return t.valor!==void 0&&t.valor!==null&&(t.valor=Number(t.valor)),t.createdAt||(t.createdAt=e),t.updatedAt||(t.updatedAt=e),{id:(await tn(me(ee,Nn),t)).id}}async function Yc(n,e){const t=fe(ee,Nn,n),o={...e,updatedAt:ds()};o.valor!==void 0&&o.valor!==null&&(o.valor=Number(o.valor)),await en(t,o)}async function Jc(n){const e=fe(ee,Nn,n);await Eo(e)}async function Xc({userId:n,budgetId:e,rec:t,createdDate:o,parcelaAtual:r}){console.log("🔧 [CreateFromRecurring] Dados recebidos:",{recId:t.id,recDescricao:t.descricao,recParcelasTotal:t.parcelasTotal,recParcelasRestantes:t.parcelasRestantes,parcelaAtualRecebida:r,createdDate:o.toISOString()});const i={userId:n,budgetId:e,descricao:t.descricao,valor:Number(t.valor??0),categoriaId:t.categoriaId,tipo:"despesa",createdAt:oe.fromDate(o),recorrenteId:t.id,recorrenteNome:t.descricao,parcelaAtual:r??null,parcelasTotal:t.parcelasTotal??null};console.log("🔧 [CreateFromRecurring] Dados que serão salvos:",{parcelaAtual:i.parcelaAtual,parcelasTotal:i.parcelasTotal,descricao:i.descricao,valor:i.valor});const s=await tn(me(ee,Nn),i);return console.log("✅ [CreateFromRecurring] Transação criada com ID:",s.id),{id:s.id}}function hp({budgetId:n,userId:e},t){const o=me(ee,Nn),r=[];n&&r.push(Ae("budgetId","==",n));const i=r.length?Re(o,...r):Re(o);return Tr(i,s=>{const c=s.docs.map(Kc).sort((u,d)=>Vi(d.createdAt)-Vi(u.createdAt));t(c)})}const AD=Object.freeze(Object.defineProperty({__proto__:null,create:ps,createFromRecurring:Xc,getById:Qc,list:Bi,listenToChanges:hp,remove:Jc,update:Yc},Symbol.toStringTag,{value:"Module"}));class wS{constructor(){this.listeners=new Map}on(e,t){return this.listeners.has(e)||this.listeners.set(e,new Set),this.listeners.get(e).add(t),()=>this.off(e,t)}off(e,t){const o=this.listeners.get(e);o&&(o.delete(t),o.size===0&&this.listeners.delete(e))}emit(e,t){const o=this.listeners.get(e);if(o)for(const r of o)try{r(t)}catch(i){console.error(`[eventBus] handler error for ${e}`,i)}}clear(){this.listeners.clear()}getListenerCount(e){const t=this.listeners.get(e);return t?t.size:0}hasListeners(e){return this.listeners.has(e)&&this.listeners.get(e).size>0}once(e,t){const o=r=>{t(r),this.off(e,o)};this.on(e,o)}}const A=new wS;function ms(n={}){let e={...n};const t=new Set;function o(){return e}function r(s){const c=e;e={...e,...s};for(const{selector:u,cb:d,last:f}of t){const p=u?u(e):e;if(p!==f.value){f.value=p;try{d(p,c)}catch{}}}}function i(s,c){const u={selector:s,cb:c,last:{value:s?s(e):e}};return t.add(u),()=>t.delete(u)}return{getState:o,setState:r,subscribe:i}}const tr=ms({transactions:[],loading:!1,error:null});let oo=new Map;async function Ar(n,e){try{tr.setState({loading:!0,error:null});let o=await Bi({budgetId:n});try{if((!o||o.length===0)&&typeof window<"u"){const r=e||window.appState?.currentUser?.uid,i=window.appState?.budgets||[],s=Array.isArray(i)&&i.length>1;if(r){const c=await Bi({userId:r});o=s?(c||[]).filter(u=>u.budgetId===n):(c||[]).filter(u=>!u.budgetId||u.budgetId===n)}}}catch{}tr.setState({transactions:o,loading:!1});try{typeof window<"u"&&(window.appState=window.appState||{},window.appState.transactions=o)}catch{}return console.log("[DEBUG] Transações carregadas para o orçamento",n,o),o}catch(t){throw tr.setState({error:t.message,loading:!1}),t}}function Zc(n,e){const t=`${n}-${e}`;if(oo.has(t))return;const o=hp({budgetId:n,userId:e},r=>{tr.setState({transactions:r}),console.log("🚦 Emitindo transactions:updated",{budgetId:n,transactions:r}),A.emit("transactions:updated",{budgetId:n,transactions:r})});oo.set(t,o)}function yS(n,e){const t=`${n}-${e}`,o=oo.get(t);o&&(o(),oo.delete(t))}function el(){oo.forEach(n=>n()),oo.clear()}async function _S(n){try{const e=await ps(n);A.emit("transaction:added",e);try{const t=n.budgetId||window.appState?.currentBudget?.id,o=n.userId||window.appState?.currentUser?.uid;t&&o&&typeof window.loadTransactions=="function"&&(await window.loadTransactions(),A.emit("transactions:updated",{budgetId:t,transactions:window.appState.transactions||[]}))}catch(t){console.warn("Falha ao emitir transactions:updated após addTransaction",t)}return e}catch(e){throw A.emit("error:transaction",e),e}}async function vS(n,e){try{await Yc(n,e),A.emit("transaction:updated",{id:n,data:e})}catch(t){throw A.emit("error:transaction",t),t}}async function ES(n){try{await Jc(n),A.emit("transaction:deleted",{id:n})}catch(e){throw A.emit("error:transaction",e),e}}async function bS(n){try{const e=await Xc(n);return A.emit("transaction:recurring:applied",e),e}catch(e){throw A.emit("error:transaction",e),e}}async function TS(n){try{const e=window.appState.currentUser;if(!e)throw new Error("Usuário não autenticado");const t=window.appState.currentBudget;if(!t)throw new Error("Orçamento não selecionado");const o={...n,userId:e.uid,budgetId:t.id},{id:r}=await ps(o);console.log("✅ Transação adicionada com ID:",r);try{if(typeof window<"u"&&typeof window.sendTransactionNotification=="function")await window.sendTransactionNotification(t.id,e.uid,{...o,id:r});else{const{sendTransactionNotification:s}=await R(async()=>{const{sendTransactionNotification:c}=await import("./NotificationService-B-HO54SU.js");return{sendTransactionNotification:c}},[]);await s(t.id,e.uid,{...o,id:r})}}catch(s){console.warn("Não foi possível enviar notificações de nova transação:",s)}window.checkLimitesCategoria&&window.checkLimitesCategoria();{const s=typeof window<"u"?window:null;s&&s.forceUIUpdate&&setTimeout(()=>{try{s.forceUIUpdate&&s.forceUIUpdate()}catch{}},100)}const{Snackbar:i}=await R(async()=>{const{Snackbar:s}=await Promise.resolve().then(()=>io);return{Snackbar:s}},void 0);return typeof i?.show=="function"?i.show("Transação adicionada com sucesso!","success"):typeof i=="function"?i({message:"Transação adicionada com sucesso!",type:"success"}):window?.Snackbar?.show&&window.Snackbar.show("Transação adicionada com sucesso!","success"),r}catch(e){console.error("❌ Erro ao adicionar transação:",e);try{const{Snackbar:t}=await R(async()=>{const{Snackbar:o}=await Promise.resolve().then(()=>io);return{Snackbar:o}},void 0);typeof t?.show=="function"?t.show("Erro ao adicionar transação","error"):typeof t=="function"?t({message:"Erro ao adicionar transação",type:"error"}):window?.Snackbar?.show&&window.Snackbar.show("Erro ao adicionar transação","error")}catch{}throw e}}async function IS(n,e){try{let t=null;try{t=await Qc(n)}catch{}await Yc(n,{...e}),console.log("✅ Transação atualizada:",n);try{const r=window.appState.currentUser,i=window.appState.currentBudget?.id;if(i&&r?.uid){const s={};if(t){const u=d=>Object.prototype.hasOwnProperty.call(e,d);u("valor")&&t.valor!==e.valor&&(s.valor={from:t.valor,to:e.valor}),u("descricao")&&t.descricao!==e.descricao&&(s.descricao={from:t.descricao,to:e.descricao}),u("categoriaId")&&t.categoriaId!==e.categoriaId&&(s.categoriaId={from:t.categoriaId,to:e.categoriaId}),u("tipo")&&t.tipo!==e.tipo&&(s.tipo={from:t.tipo,to:e.tipo})}const c={id:n,...e,prev:t?{descricao:t.descricao,valor:t.valor,categoriaId:t.categoriaId,tipo:t.tipo}:null,changeSet:s};if(typeof window<"u"&&typeof window.sendTransactionUpdatedNotification=="function")await window.sendTransactionUpdatedNotification(i,r.uid,c);else{const{sendTransactionUpdatedNotification:u}=await R(async()=>{const{sendTransactionUpdatedNotification:d}=await import("./NotificationService-B-HO54SU.js");return{sendTransactionUpdatedNotification:d}},[]);await u(i,r.uid,c)}}}catch(r){console.warn("Não foi possível enviar notificações de atualização de transação:",r)}window.checkLimitesCategoria&&window.checkLimitesCategoria();{const r=typeof window<"u"?window:null;r&&r.forceUIUpdate&&setTimeout(()=>{try{r.forceUIUpdate&&r.forceUIUpdate()}catch{}},100)}const{Snackbar:o}=await R(async()=>{const{Snackbar:r}=await Promise.resolve().then(()=>io);return{Snackbar:r}},void 0);typeof o?.show=="function"?o.show("Transação atualizada com sucesso!","success"):typeof o=="function"?o({message:"Transação atualizada com sucesso!",type:"success"}):window?.Snackbar?.show&&window.Snackbar.show("Transação atualizada com sucesso!","success")}catch(t){console.error("❌ Erro ao atualizar transação:",t);try{const{Snackbar:o}=await R(async()=>{const{Snackbar:r}=await Promise.resolve().then(()=>io);return{Snackbar:r}},void 0);typeof o?.show=="function"?o.show("Erro ao atualizar transação","error"):typeof o=="function"?o({message:"Erro ao atualizar transação",type:"error"}):window?.Snackbar?.show&&window.Snackbar.show("Erro ao atualizar transação","error")}catch{}throw t}}async function SS(n){try{let e=null;try{const i=await Qc(n);i&&(e=i)}catch(i){console.warn("Não foi possível ler a transação antes de excluir:",i)}await Jc(n);try{if(typeof window<"u"){const i=Array.isArray(window.appState?.transactions)?window.appState.transactions.slice():[],s=i.findIndex(c=>c.id===n);s!==-1&&(i.splice(s,1),window.appState.transactions=i,A.emit("transactions:updated",{transactions:i}))}}catch{}console.log("✅ Transação deletada:",n);try{const i=window.appState.currentUser,s=e?.budgetId||window.appState.currentBudget?.id;if(s&&i?.uid){const c=e||{id:n};if(typeof window<"u"&&typeof window.sendTransactionDeletedNotification=="function")await window.sendTransactionDeletedNotification(s,i.uid,c);else{const{sendTransactionDeletedNotification:u}=await R(async()=>{const{sendTransactionDeletedNotification:d}=await import("./NotificationService-B-HO54SU.js");return{sendTransactionDeletedNotification:d}},[]);await u(s,i.uid,c)}}}catch(i){console.warn("Não foi possível enviar notificações de exclusão de transação:",i)}window.checkLimitesCategoria&&window.checkLimitesCategoria();{const i=typeof window<"u"?window:null;i&&i.forceUIUpdate&&setTimeout(()=>{try{i.forceUIUpdate&&i.forceUIUpdate()}catch{}},100)}const{Snackbar:t}=await R(async()=>{const{Snackbar:i}=await Promise.resolve().then(()=>io);return{Snackbar:i}},void 0),r={label:"Desfazer",onClick:async()=>{try{if(!e)return;const{id:i}=await ps(e);try{if(typeof window<"u"){const s=Array.isArray(window.appState?.transactions)?window.appState.transactions.slice():[];s.unshift({...e,id:i}),window.appState.transactions=s,A.emit("transactions:updated",{transactions:s})}}catch{}t.show("Exclusão desfeita","success")}catch(i){console.warn("Falha ao desfazer exclusão:",i),t.show("Não foi possível desfazer","error")}}};typeof t?.show=="function"?t.show("Transação excluída","success",5e3,r):typeof t=="function"?t({message:"Transação excluída",type:"success",duration:5e3,action:r}):window?.Snackbar?.show&&window.Snackbar.show("Transação excluída","success")}catch(e){console.error("❌ Erro ao deletar transação:",e);try{const{Snackbar:t}=await R(async()=>{const{Snackbar:o}=await Promise.resolve().then(()=>io);return{Snackbar:o}},void 0);typeof t?.show=="function"?t.show("Erro ao deletar transação","error"):typeof t=="function"?t({message:"Erro ao deletar transação",type:"error"}):window?.Snackbar?.show&&window.Snackbar.show("Erro ao deletar transação","error")}catch{}throw e}}const DD=Object.freeze(Object.defineProperty({__proto__:null,addTransaction:_S,addTransactionWithNotifications:TS,createFromRecurring:bS,deleteTransaction:ES,deleteTransactionWithNotifications:SS,loadTransactions:Ar,startTransactionsListener:Zc,stopAllListeners:el,stopTransactionsListener:yS,transactionsStore:tr,updateTransaction:vS,updateTransactionWithNotifications:IS},Symbol.toStringTag,{value:"Module"})),To="categories";async function tl(n){if(!n)return null;const e=fe(ee,To,n),t=await br(e);return t.exists()?{id:t.id,...t.data()}:null}async function xa(n={}){const e=me(ee,To),t=[];n.budgetId&&t.push(Ae("budgetId","==",n.budgetId)),n.userId&&t.push(Ae("userId","==",n.userId));const o=t.length?Re(e,...t):Re(e),i=(await wt(o)).docs.map(s=>({id:s.id,...s.data()}));return i.sort((s,c)=>(s.nome||"").localeCompare(c.nome||"")),i}async function fp(n){const e=me(ee,To);return(await tn(e,n)).id}async function gp(n,e){const t=fe(ee,To,n);return await en(t,e),!0}async function pp(n){const e=fe(ee,To,n);return await Eo(e),!0}function mp(n,e){const t=me(ee,To),o=Re(t,Ae("budgetId","==",n),xg("nome"));return Tr(o,r=>{const i=r.docs.map(s=>({id:s.id,...s.data()}));e(i)})}const CD=Object.freeze(Object.defineProperty({__proto__:null,create:fp,getById:tl,list:xa,listenToChanges:mp,remove:pp,update:gp},Symbol.toStringTag,{value:"Module"})),mn=ms({categories:[],loading:!1,error:null});let ro=new Map;async function Dr(n){try{mn.setState({loading:!0,error:null});let e=await xa({budgetId:n});try{if((!e||e.length===0)&&typeof window<"u"){const t=window.appState?.currentUser?.uid,o=window.appState?.budgets||[],r=Array.isArray(o)&&o.length>1;if(t){const i=await xa({userId:t});e=r?(i||[]).filter(s=>s.budgetId===n):(i||[]).filter(s=>!s.budgetId||s.budgetId===n)}}}catch{}mn.setState({categories:e,loading:!1});try{typeof window<"u"&&(window.appState=window.appState||{},window.appState.categories=e)}catch{}return console.log("[DEBUG] Categorias carregadas para o orçamento",n,e),e}catch(e){throw mn.setState({error:e.message,loading:!1}),e}}function nl(n){if(ro.has(n))return;const e=mp(n,t=>{mn.setState({categories:t}),A.emit("categories:updated",{budgetId:n,categories:t})});ro.set(n,e)}function AS(n){const e=ro.get(n);e&&(e(),ro.delete(n))}async function DS(n){try{const e={...n};try{const r=e.budgetId||(typeof window<"u"?window?.appState?.currentBudget?.id:void 0),i=e.userId||(typeof window<"u"?window?.appState?.currentUser?.uid:void 0);r&&(e.budgetId=r),i&&(e.userId=i)}catch{}const t=await fp(e),o={id:t,...e};A.emit("category:created",o);try{const r=mn.getState().categories||[];if(!r.some(s=>s.id===t)){const s=[...r,o];s.sort((c,u)=>(c.nome||"").localeCompare(u.nome||"")),mn.setState({categories:s})}if(typeof window<"u"){window.appState=window.appState||{};const s=Array.isArray(window.appState.categories)?window.appState.categories:[];if(!s.some(c=>c.id===t)){const c=[...s,o];c.sort((u,d)=>(u.nome||"").localeCompare(d.nome||"")),window.appState.categories=c}}}catch{}try{const r=o.budgetId||(typeof window<"u"?window?.appState?.currentBudget?.id:void 0),i=o.userId||(typeof window<"u"?window?.appState?.currentUser?.uid:void 0);if(r&&i){const{sendCategoryChangeNotification:s}=await R(async()=>{const{sendCategoryChangeNotification:c}=await import("./NotificationService-B-HO54SU.js");return{sendCategoryChangeNotification:c}},[]);await s(r,i,o,"category_added")}}catch(r){console.warn("Falha ao notificar criação de categoria:",r)}return o}catch(e){throw A.emit("error:category",e),e}}async function CS(n,e){try{let t=null;try{t=await tl?.(n)}catch{}await gp(n,e),A.emit("category:updated",{id:n,data:e});try{const o=e?.budgetId||t?.budgetId||(typeof window<"u"?window?.appState?.currentBudget?.id:void 0),r=e?.userId||t?.userId||(typeof window<"u"?window?.appState?.currentUser?.uid:void 0);if(o&&r){const i={id:n,...t,...e},{sendCategoryChangeNotification:s}=await R(async()=>{const{sendCategoryChangeNotification:c}=await import("./NotificationService-B-HO54SU.js");return{sendCategoryChangeNotification:c}},[]);await s(o,r,i,"category_updated",t||null)}}catch(o){console.warn("Falha ao notificar atualização de categoria:",o)}}catch(t){throw A.emit("error:category",t),t}}async function RS(n){try{let e=null;try{e=await tl?.(n)}catch{}await pp(n),A.emit("category:deleted",{id:n});try{const t=e?.budgetId||(typeof window<"u"?window?.appState?.currentBudget?.id:void 0),o=e?.userId||(typeof window<"u"?window?.appState?.currentUser?.uid:void 0);if(t&&o){const{sendCategoryChangeNotification:r}=await R(async()=>{const{sendCategoryChangeNotification:s}=await import("./NotificationService-B-HO54SU.js");return{sendCategoryChangeNotification:s}},[]),i=e?{id:n,...e}:{id:n};await r(t,o,i,"category_deleted",e||null)}}catch(t){console.warn("Falha ao notificar exclusão de categoria:",t)}}catch(e){throw A.emit("error:category",e),e}}function ol(){ro.forEach(n=>n()),ro.clear()}const RD=Object.freeze(Object.defineProperty({__proto__:null,categoriesStore:mn,createCategory:DS,deleteCategory:RS,loadCategories:Dr,startCategoriesListener:nl,stopAllListeners:ol,stopCategoriesListener:AS,updateCategory:CS},Symbol.toStringTag,{value:"Module"})),Io="recorrentes";async function wp(n){const e=Re(me(ee,Io),Ae("budgetId","==",n));return(await wt(e)).docs.map(o=>({id:o.id,...o.data()}))}async function Ua(n){const e=Re(me(ee,Io),Ae("userId","==",n));return(await wt(e)).docs.map(o=>({id:o.id,...o.data()}))}function NS(n){return tn(me(ee,Io),n)}function PS(n,e){return en(fe(ee,Io,n),e)}function kS(n){return Eo(fe(ee,Io,n))}async function yp(n){const e=await br(fe(ee,Io,n));return e.exists()?{id:e.id,...e.data()}:null}const Fa="logAplicacoes";async function MS({userId:n,mesAno:e,transacaoId:t,transacaoData:o}){const r={userId:n,mesAno:e,recorrenteId:o.recorrenteId,descricao:o.descricao,valor:o.valor,dataAplicacao:ds(),aplicacaoImediata:!1};t&&(r.transacaoId=t),await tn(me(ee,Fa),r)}async function OS(n,e){const t=Re(me(ee,Fa),Ae("userId","==",n),Ae("dataAplicacao","<",e)),o=await wt(t);let r=0;for(const i of o.docs)await Eo(fe(ee,Fa,i.id)),r++;return r}function un(n,e){let t=Number(n),o=Number(e);if(!Number.isFinite(t)||!Number.isFinite(o))return null;for(;o<1;)o+=12,t-=1;for(;o>12;)o-=12,t+=1;return{year:t,month:o}}function jn(n,e=null,t=null){if(!n?.parcelasTotal||n.parcelasTotal<=1)return null;try{const o=new Date(n.dataInicio);let r;if(typeof e=="number"&&typeof t=="number"){const c=un(e,t);c&&(r=new Date(c.year,c.month-1,1))}r||(r=new Date);let i=(r.getFullYear()-o.getFullYear())*12+(r.getMonth()-o.getMonth());try{const c=o.getFullYear(),u=o.getMonth()+1,d=un(r.getFullYear(),r.getMonth()+1),f=d&&(d.year>c||d.year===c&&d.month>u);n?.efetivarMesAtual===!1&&f&&(i-=1)}catch{}let s=i+1;return s>n.parcelasTotal&&(s=n.parcelasTotal),s<1&&(s=1),s}catch(o){return console.error("Erro ao calcular parcela da recorrente:",o),1}}function VS(n,e=[],t=null,o=null){if(!t||!o){const M=new Date;t=M.getFullYear(),o=M.getMonth()+1}const r=un(t,o)||{year:t,month:o},{year:i,month:s}=r,c=e.some(M=>{if(!M.recorrenteId||M.recorrenteId!==n.id)return!1;let P;if(M.createdAt&&typeof M.createdAt=="object"&&M.createdAt.seconds)P=new Date(M.createdAt.seconds*1e3);else if(M.createdAt)P=new Date(M.createdAt);else return!1;return P.getFullYear()===i&&P.getMonth()+1===s});let u=jn(n,i,s);const d=un(i,s+1)||{year:i,month:s},f=un(i,s-1)||{year:i,month:s};let p=jn(n,d.year,d.month),m=jn(n,f.year,f.month);try{const M=e.filter(P=>P.recorrenteId===n.id&&P.createdAt).map(P=>P.createdAt?.toDate?P.createdAt.toDate():new Date(P.createdAt)).sort((P,U)=>P-U);if(M.length>0&&n.dataInicio){const P=M[0],U=new Date(n.dataInicio),G=un(U.getFullYear(),U.getMonth()+1),W=un(P.getFullYear(),P.getMonth()+1);if(G&&W){const ue=(W.year-G.year)*12+(W.month-G.month);if(ue>0){const Ne=ie=>{if(ie==null)return ie;const b=n.parcelasTotal||ie;return Math.max(1,Math.min(b,ie-ue))};u=Ne(u),p=Ne(p),m=Ne(m)}}}}catch{}let S=!1,C=!1;try{if(n?.parcelasTotal&&n.dataInicio){const M=new Date(n.dataInicio),P=new Date(i,s-1,1);let U=(P.getFullYear()-M.getFullYear())*12+(P.getMonth()-M.getMonth());const G=M.getFullYear(),W=M.getMonth()+1,ue=i>G||i===G&&s>W,Ne=i===G&&s===W;n?.efetivarMesAtual===!1&&(ue||Ne)&&(U-=1);const ie=U+1;S=ie>n.parcelasTotal,C=ie<1}}catch{}return{foiEfetivadaEsteMes:c,parcelaAtual:u,proximaParcela:p,ultimaParcela:m,totalParcelas:n.parcelasTotal,temParcelas:n.parcelasTotal&&n.parcelasTotal>1,ativa:n.ativa!==!1,aposUltimaParcela:S,antesDaPrimeiraParcela:C}}async function _p(n){return wp(n)}async function BS(n){return n?Ua(n):[]}async function LS(n,e,t){const o={...t,userId:n,budgetId:e,ativa:!0,createdAt:new Date,parcelasRestantes:t.parcelasRestantes??null,parcelasTotal:t.parcelasTotal??null,efetivarMesAtual:t.efetivarMesAtual??!1},r=await NS(o);try{const{sendRecorrenteChangeNotification:i}=await R(async()=>{const{sendRecorrenteChangeNotification:s}=await import("./NotificationService-B-HO54SU.js");return{sendRecorrenteChangeNotification:s}},[]);await i(e,n,o,"new_recorrente"),console.log("[RecorrentesService] Notificação de nova despesa recorrente enviada")}catch(i){console.warn("[RecorrentesService] Erro ao enviar notificação de nova despesa recorrente:",i)}return r.id||r}async function fi(n,e,t){let o=null;try{const r=await yp(e);r&&(o={nome:r.nome,valor:r.valor,frequencia:r.frequencia,categoria:r.categoria,descricao:r.descricao,parcelasRestantes:r.parcelasRestantes,parcelasTotal:r.parcelasTotal})}catch(r){console.warn("[RecorrentesService] Erro ao buscar dados anteriores da despesa recorrente:",r)}await PS(e,{...t,updatedAt:new Date});try{const{sendRecorrenteChangeNotification:r}=await R(async()=>{const{sendRecorrenteChangeNotification:s}=await import("./NotificationService-B-HO54SU.js");return{sendRecorrenteChangeNotification:s}},[]),i=t.budgetId||(typeof window<"u"?window?.appState?.currentBudget?.id:void 0);if(i){const s={...t,id:e};await r(i,n,s,"updated_recorrente",o),console.log("[RecorrentesService] Notificação de atualização de despesa recorrente enviada")}}catch(r){console.warn("[RecorrentesService] Erro ao enviar notificação de atualização de despesa recorrente:",r)}}async function xS(n,e){let t=null;try{t=await yp(e)}catch(o){console.warn("[RecorrentesService] Erro ao buscar dados da despesa recorrente para exclusão:",o)}if(await kS(e),t)try{const{sendRecorrenteChangeNotification:o}=await R(async()=>{const{sendRecorrenteChangeNotification:i}=await import("./NotificationService-B-HO54SU.js");return{sendRecorrenteChangeNotification:i}},[]),r=t.budgetId||(typeof window<"u"?window?.appState?.currentBudget?.id:void 0);r&&(await o(r,n,t,"deleted_recorrente"),console.log("[RecorrentesService] Notificação de exclusão de despesa recorrente enviada"))}catch(o){console.warn("[RecorrentesService] Erro ao enviar notificação de exclusão de despesa recorrente:",o)}}async function US(n,e,t=!1,o=null,r=null){const i=new Date,s=Number.isFinite(r)?r:i.getMonth()+1,c=Number.isFinite(o)?o:i.getFullYear(),d=(await _p(e)).filter(M=>M.ativa===!0),f=await FS(e,c,s);let p=0,m=0;const C=c===i.getFullYear()&&s===i.getMonth()+1?i.getDate():31;for(const M of d)if(!(!$S(M,c,s,C)||th(f,M,c,s))&&!(M.parcelasRestantes!==null&&M.parcelasRestantes<=0)){if(!t){m++;continue}await GS(M,n,e,c,s),p++}try{if((typeof localStorage<"u"?localStorage.getItem("noti_recurring_reminders")==="true":!1)&&Array.isArray(d)){const{sendRecorrenteReminderNotification:P}=await R(async()=>{const{sendRecorrenteReminderNotification:U}=await import("./NotificationService-B-HO54SU.js");return{sendRecorrenteReminderNotification:U}},[]);for(const U of d)th(f,U,c,s)||await P(e,n,U)}}catch(M){console.warn("Falha ao enviar lembretes de recorrentes:",M)}try{if(typeof localStorage<"u"?localStorage.getItem("noti_weekly_summary")==="true":!1){const{sendWeeklySummaryNotification:P}=await R(async()=>{const{sendWeeklySummaryNotification:G}=await import("./NotificationService-B-HO54SU.js");return{sendWeeklySummaryNotification:G}},[]),U={resumo:`Resumo semanal: ${p} recorrentes aplicadas, ${m} pendentes.`,periodo:`${String(s).padStart(2,"0")}/${c}`};await P(e,n,U)}}catch(M){console.warn("Falha ao enviar notificação de resumo semanal:",M)}return{aplicadas:p,pendentes:m,total:d.length}}async function FS(n,e,t){try{let o=window?.appState?.transactions;return(!Array.isArray(o)||o.length===0)&&(o=await Bi({budgetId:n})),o.filter(r=>{const i=r.createdAt;if(!i)return!1;const s=i?.toDate?i.toDate():new Date(i);return s.getFullYear()===e&&s.getMonth()+1===t})}catch(o){return console.error("Erro ao obter transações do mês:",o),[]}}function $S(n,e,t,o=null){if(!n.dataInicio)return!0;try{const[r,i,s]=String(n.dataInicio).split("-").map(Number),c=new Date(r,i-1,s),u=c.getFullYear(),d=c.getMonth()+1,f=c.getDate();if(e<u||e===u&&t<d||e===u&&t===d&&(Number.isFinite(o)?o:new Date().getDate())<f)return!1;let p=(e-u)*12+(t-d);return!n.efetivarMesAtual&&(e>u||e===u&&t>d)&&(p-=1),!(n.parcelasTotal!==null&&n.parcelasTotal!==void 0&&p+1>n.parcelasTotal||n.parcelasRestantes!==null&&n.parcelasRestantes!==void 0&&n.parcelasRestantes<=0)}catch(r){return console.error("Erro ao verificar se deve aplicar neste mês:",r),!0}}function th(n,e,t,o){try{return n.some(r=>{if(r.recorrenteId&&e.id&&r.recorrenteId===e.id)return!0;if(e.descricao&&r.descricao===e.descricao){const i=jn(e,t,o),s=e.parcelasTotal!==null&&e.parcelasTotal!==void 0,c=r.parcelasTotal!==void 0&&r.parcelasTotal!==null||r.parcelaAtual!==void 0&&r.parcelaAtual!==null;if(s){if(r.parcelasTotal===e.parcelasTotal&&r.parcelaAtual===i)return!0}else if(!c||r.parcelasTotal===1)return!0}return!1})}catch(r){return console.error("Erro ao verificar se já aplicada:",r),!1}}async function GS(n,e,t,o,r){const i=n.diaLancamento||1,s=new Date(o,r,0).getDate(),c=Math.max(1,Math.min(s,Number(i))),u=new Date(o,r-1,c),d=jn(n,o,r);console.log("🔧 [AplicarRecorrente] Dados para criar transação:",{recId:n.id,recDescricao:n.descricao,recParcelasTotal:n.parcelasTotal,recParcelasRestantes:n.parcelasRestantes,parcelaAtualCalculada:d,ano:o,mes:r,dataLancamento:u.toISOString()});const{id:f}=await Xc({userId:e,budgetId:t,rec:n,createdDate:u,parcelaAtual:d});try{const p=e,m=t||(typeof window<"u"?window?.appState?.currentBudget?.id:void 0);if(m&&p){const{sendTransactionNotification:S}=await R(async()=>{const{sendTransactionNotification:M}=await import("./NotificationService-B-HO54SU.js");return{sendTransactionNotification:M}},[]),C={id:f,descricao:n.descricao,valor:n.valor,categoriaId:n.categoriaId||null,tipo:n.tipo||"despesa",recorrenteId:n.id,recorrenteParcelaAtual:d??null,recorrenteParcelasTotal:n.parcelasTotal??null};await S(m,p,C)}}catch(p){console.warn("Falha ao enviar notificação de aplicação de recorrente:",p)}if(n.parcelasRestantes!==null&&n.parcelasRestantes!==void 0){const p=Math.max(0,n.parcelasRestantes-1);p<=0?await fi(e,n.id,{parcelasRestantes:0,ativa:!1}):await fi(e,n.id,{parcelasRestantes:p})}try{(n.parcelasRestantes===null||n.parcelasRestantes===void 0)&&n.parcelasTotal!==null&&n.parcelasTotal!==void 0&&(n.parcelasTotal<=1||(d??Number.POSITIVE_INFINITY)>=n.parcelasTotal)&&await fi(e,n.id,{ativa:!1})}catch(p){console.warn("Falha ao auto-inativar recorrente após última parcela:",p)}await MS({userId:e,mesAno:`${o}-${String(r).padStart(2,"0")}`,transacaoId:f,transacaoData:{recorrenteId:n.id,descricao:n.descricao,valor:n.valor}})}async function zS(n){const e=new Date,t=new Date(e.getFullYear()-1,e.getMonth(),e.getDate());return OS(n,t)}async function vp(){try{const n=window.appState?.currentUser?.uid,e=window.appState?.currentBudget?.id;if(!n||!e)return console.warn("Usuário ou orçamento não encontrado para carregar recorrentes"),[];let t=[];try{e&&(t=await wp(e)),(!t||t.length===0)&&(t=await Ua(n))}catch(o){console.warn("Falha ao listar recorrentes por orçamento, tentando por usuário...",o),t=await Ua(n)}return window.appState||(window.appState={}),window.appState.recorrentes=t,console.log(`✅ ${t.length} recorrentes carregadas`),t}catch(n){return console.error("❌ Erro ao carregar recorrentes:",n),[]}}const Ep=Object.freeze(Object.defineProperty({__proto__:null,addRecorrente:LS,aplicarRecorrentesDoMes:US,calcularParcelaRecorrente:jn,calcularStatusRecorrente:VS,deleteRecorrente:xS,getRecorrentesDoOrcamento:_p,getRecorrentesDoUsuario:BS,limparLogsAntigos:zS,loadRecorrentes:vp,updateRecorrente:fi},Symbol.toStringTag,{value:"Module"}));window.loadTransactions=async function(){const n=window.appState?.currentBudget?.id,e=window.appState?.currentUser?.uid;return Ar(n,e)};window.loadCategories=async function(){const n=window.appState?.currentBudget?.id;return window.appState?.currentUser?.uid,Dr(n)};window.loadRecorrentes=async function(){return vp()};const rl="snackbar_prefs_v1",Et={defaultDuration:3e3,bottom:80,position:"bottom",align:"center",hoverPause:!0,maxQueue:5,cooldownMs:500};function ei(n,e){const t=Number(n);return Number.isFinite(t)?t:e}function qS(n,e){return typeof n=="boolean"?n:n==="true"?!0:n==="false"?!1:e}function ur(n){const e=n||{},t={...Et};return"defaultDuration"in e&&(t.defaultDuration=Math.max(500,ei(e.defaultDuration,Et.defaultDuration))),"bottom"in e&&(t.bottom=Math.max(0,ei(e.bottom,Et.bottom))),typeof e.position=="string"&&(e.position==="top"||e.position==="bottom")&&(t.position=e.position),typeof e.align=="string"&&(e.align==="left"||e.align==="center"||e.align==="right")&&(t.align=e.align),"hoverPause"in e&&(t.hoverPause=qS(e.hoverPause,Et.hoverPause)),"maxQueue"in e&&(t.maxQueue=Math.max(1,ei(e.maxQueue,Et.maxQueue))),"cooldownMs"in e&&(t.cooldownMs=Math.max(0,ei(e.cooldownMs,Et.cooldownMs))),t}function bp(){try{const n=localStorage.getItem(rl);if(!n)return{...Et};const e=JSON.parse(n);return ur(e)}catch{return{...Et}}}function jS(n){try{const e=ur(n);return localStorage.setItem(rl,JSON.stringify(e)),e}catch{return ur(n)}}function Tp(n){try{const e=ur(n);A.emit("snackbar:configure",e);try{typeof window<"u"&&window.Snackbar&&typeof window.Snackbar.configure=="function"&&window.Snackbar.configure(e)}catch{}return e}catch{return ur(n)}}function Ip(){const n=bp();return Tp(n),n}typeof window<"u"&&(window.__snackbarPrefs={STORAGE_KEY:rl,defaults:Et,loadPrefs:bp,savePrefs:jS,applyPrefs:Tp,initFromStorage:Ip});var aa={};class HS{constructor(){this.queue=[],this.isShowing=!1,this.defaultDuration=3e3,this.bottomOffset=80,this.position="bottom",this.align="center",this.hoverPause=!0,this._currentTimeout=null,this._currentEl=null,this._restoreFocusEl=null;try{this.reducedMotion=typeof window<"u"&&window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)")?.matches}catch{this.reducedMotion=!1}try{const e=typeof navigator<"u"&&navigator.userAgent?navigator.userAgent:"";/jsdom/i.test(e)&&(this.reducedMotion=!0)}catch{}try{typeof process<"u"&&aa&&(aa.VITEST||aa.JEST_WORKER_ID)&&(this.reducedMotion=!0)}catch{}this.reducedMotion&&(this.hoverPause=!1),this.maxQueue=5,this._lastShownSig=null,this._lastShownAt=0,this._lastShownMap=new Map,this.cooldownMs=500,this._stats={totalShown:0,byType:Object.create(null),last:null}}show(e,t="info",o=null,r){const i={message:e,type:t,duration:o||this.defaultDuration,action:r&&typeof r=="object"?r:null},s=`${i.type}|${i.message}`,c=this.queue[this.queue.length-1];if(!(c&&`${c.type}|${c.message}`===s)){if(this._currentEl&&this._currentEl.getAttribute("data-snackbar-sig")===s){try{this.incrementCurrentCount()}catch{}return}try{const u=Date.now(),d=this._lastShownMap.get(s)||0;if(u-d<(this.cooldownMs|0))return;this._lastShownMap.set(s,u)}catch{}this.queue.length>=this.maxQueue&&this.queue.shift(),this.queue.push(i);try{this._stats.totalShown+=1,this._stats.byType[t]=(this._stats.byType[t]||0)+1,this._stats.last={type:t,message:e}}catch{}this.processQueue()}}call(e){typeof e=="string"?this.show(e,"info"):typeof e=="object"&&this.show(e.message||"Notificação",e.type||"info",e.duration)}processQueue(){if(this.isShowing||this.queue.length===0)return;this.isShowing=!0;const e=this.queue.shift();this.createSnackbar(e)}createSnackbar(e){const{message:t,type:o,duration:r,action:i}=e;this.removeExistingSnackbars();const s=document.createElement("div");s.className=this.getSnackbarClasses(o),s.classList.add("snackbar"),s.setAttribute("data-snackbar","1"),s.setAttribute("data-pos",this.position),s.setAttribute("data-align",this.align);const c=o==="error"||o==="warning";s.setAttribute("role",c?"alert":"status"),s.setAttribute("aria-live",c?"assertive":"polite"),s.setAttribute("aria-atomic","true"),s.innerHTML=this.getSnackbarContent(t,o,i),s.classList.add(`snackbar-${o}`),this.applyThemeStyles(s,o),s.style.zIndex="99999";try{const f=`${this.bottomOffset}px`;this.position==="top"?(s.style.top=`calc(${f} + env(safe-area-inset-top, 0px))`,s.style.bottom=""):(s.style.bottom=`calc(${f} + env(safe-area-inset-bottom, 0px))`,s.style.top=""),this.align==="left"?(s.style.left="16px",s.style.right="",s.style.transform="none"):this.align==="right"?(s.style.right="16px",s.style.left="",s.style.transform="none"):(s.style.left="50%",s.style.right="",s.style.transform="translateX(-50%)")}catch{}try{this._restoreFocusEl=document.activeElement instanceof HTMLElement?document.activeElement:null}catch{this._restoreFocusEl=null}document.body.appendChild(s),this.setupEventListeners(s,i);const u=()=>s.classList.add("snackbar-show");this.reducedMotion?s.classList.add("snackbar-show"):requestAnimationFrame(u);const d=()=>{this.clearDismissTimer();const f=Math.max(10,r|0);this._currentTimeout=setTimeout(()=>{this.removeSnackbar(s)},this.reducedMotion?Math.min(200,f):f)};this._currentEl=s;try{const f=`${o}|${t}`;s.setAttribute("data-snackbar-sig",f)}catch{}d(),this.hoverPause&&(s.addEventListener("mouseenter",()=>this.clearDismissTimer()),s.addEventListener("mouseleave",()=>d()),s.addEventListener("focusin",()=>this.clearDismissTimer()),s.addEventListener("focusout",()=>d())),this.reducedMotion||setTimeout(()=>{const f=s.querySelector(".snackbar-action"),p=s.querySelector(".snackbar-close");f?f.focus?.():p&&p.focus?.()},10)}getCurrentTheme(){return document.documentElement.classList.contains("dark")?"dark":"light"}getCurrentThemeColor(){return localStorage.getItem("themeColor")||document.documentElement.getAttribute("data-theme-color")||"blue"}applyThemeStyles(e,t){const o=this.getCurrentTheme(),r=this.getCurrentThemeColor(),i={blue:{primary:"#3B82F6",secondary:"#1E40AF",light:"#DBEAFE"},green:{primary:"#10B981",secondary:"#059669",light:"#D1FAE5"},purple:{primary:"#8B5CF6",secondary:"#7C3AED",light:"#EDE9FE"},orange:{primary:"#F59E0B",secondary:"#D97706",light:"#FEF3C7"}},s=i[r]||i.blue,u=(f=>{switch(f){case"success":return o==="dark"?{bg:s.primary,color:"#ffffff",border:s.secondary}:{bg:s.secondary,color:"#ffffff",border:s.primary};case"error":return o==="dark"?{bg:"#ef4444",color:"#ffffff",border:"#dc2626"}:{bg:"#dc2626",color:"#ffffff",border:"#b91c1c"};case"warning":return o==="dark"?{bg:"#f59e0b",color:"#1f2937",border:"#d97706"}:{bg:"#d97706",color:"#ffffff",border:"#b45309"};case"info":return o==="dark"?{bg:s.primary,color:"#ffffff",border:s.secondary}:{bg:s.secondary,color:"#ffffff",border:s.primary};default:return o==="dark"?{bg:s.primary,color:"#ffffff",border:s.secondary}:{bg:s.secondary,color:"#ffffff",border:s.primary}}})(t),d=o==="dark"?"0.4":"0.3";e.style.backgroundColor=u.bg,e.style.color=u.color,e.style.border=`1px solid ${u.border}`,e.style.boxShadow=`0 4px 12px rgba(${u.bg.replace("#","").match(/.{2}/g).map(f=>parseInt(f,16)).join(", ")}, ${d})`,setTimeout(()=>{const f=e.querySelector(".snackbar-close");f&&(f.style.color=u.color)},10)}getSnackbarClasses(e){return["fixed","left-1/2","transform","-translate-x-1/2","px-6","py-3","rounded-lg","shadow-lg","max-w-sm","w-full","mx-4","opacity-0","translate-y-4","transition-all","duration-300","ease-out"].join(" ")}getSnackbarContent(e,t,o){const r={success:"✅",error:"❌",warning:"⚠️",info:"ℹ️",default:"💬"},i=d=>{try{return String(d).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}catch{return String(d||"")}},s=i(e),c=o&&o.label?i(o.label):"",u=o&&o.label?`<button class="snackbar-action ml-2 underline font-semibold" aria-label="${c}">${c}</button>`:"";return`
      <div class="flex items-center gap-3">
        <span class="text-lg">${r[t]||r.default}</span>
        <span class="flex-1 text-sm font-medium">${s}</span>
        <span class="snackbar-count hidden text-xs font-bold px-2 py-0.5 rounded bg-black/20">×1</span>
        ${u}
        <button class="snackbar-close text-white" aria-label="Fechar notificação" title="Fechar">
          <span class="text-lg font-bold">×</span>
        </button>
      </div>
    `}removeExistingSnackbars(){document.querySelectorAll('[data-snackbar="1"]').forEach(t=>{this.removeSnackbar(t)})}incrementCurrentCount(){if(!this._currentEl)return;const e=this._currentEl.querySelector(".snackbar-count");if(!e)return;const o=(parseInt((e.textContent||"1").replace(/[^0-9]/g,""),10)||1)+1;if(e.textContent=`×${o}`,e.classList.remove("hidden"),this._currentEl.querySelector(".flex-1")){const i=this._currentEl.getAttribute("role")||"status";this._currentEl.setAttribute("aria-live",i==="alert"?"assertive":"polite"),this._currentEl.setAttribute("aria-atomic","true")}}removeSnackbar(e){if(!e||!e.parentNode)return;e.classList.remove("snackbar-show"),e.classList.add("snackbar-hide");const t=this.reducedMotion?50:300;setTimeout(()=>{e.parentNode&&e.parentNode.removeChild(e),this.clearDismissTimer(),this._currentEl=null,this.isShowing=!1,this._lastShownAt=Date.now(),this._lastShownSig=null;try{this._restoreFocusEl&&document.contains(this._restoreFocusEl)&&this._restoreFocusEl.focus?.()}catch{}this.processQueue()},t)}setupEventListeners(e,t){const o=e.querySelector(".snackbar-close");o&&(o.addEventListener("click",()=>{this.removeSnackbar(e)}),e.addEventListener("keydown",i=>{i.key==="Escape"&&this.removeSnackbar(e)}));const r=e.querySelector(".snackbar-action");r&&(r.addEventListener("click",()=>{this.removeSnackbar(e);try{t&&typeof t.onClick=="function"&&t.onClick()}catch{}}),r.addEventListener("keydown",i=>{(i.key==="Enter"||i.key===" ")&&(i.preventDefault(),r.click())})),e.addEventListener("click",i=>{i.target===e&&this.removeSnackbar(e)})}clearDismissTimer(){this._currentTimeout&&(clearTimeout(this._currentTimeout),this._currentTimeout=null)}closeCurrent(){this._currentEl&&this.removeSnackbar(this._currentEl)}clearQueue(){this.queue=[]}getStats(){try{return JSON.parse(JSON.stringify(this._stats))}catch{return{totalShown:0,byType:{},last:null}}}resetStats(){this._stats={totalShown:0,byType:Object.create(null),last:null}}}const j=new HS;function ve(n){typeof n=="string"?j.show(n,"info"):typeof n=="object"&&j.show(n.message,n.type||"info",n.duration,n.action)}ve.show=(n,e="info",t,o)=>{j.show(n,e,t,o)};ve.success=(n,e)=>{j.show(n,"success",e)};ve.error=(n,e)=>{j.show(n,"error",e)};ve.warning=(n,e)=>{j.show(n,"warning",e)};ve.info=(n,e)=>{j.show(n,"info",e)};ve.configure=(n={})=>{typeof n.defaultDuration=="number"&&(j.defaultDuration=n.defaultDuration),typeof n.bottom=="number"&&(j.bottomOffset=n.bottom),typeof n.position=="string"&&(j.position=n.position),typeof n.align=="string"&&(j.align=n.align),typeof n.hoverPause=="boolean"&&(j.hoverPause=n.hoverPause),typeof n.maxQueue=="number"&&(j.maxQueue=Math.max(1,n.maxQueue|0)),typeof n.cooldownMs=="number"&&(j.cooldownMs=Math.max(0,n.cooldownMs|0));try{j.clearDismissTimer(),j.isShowing=!1,j._currentEl=null,j._restoreFocusEl=null,j.queue=[];const e=document?.querySelectorAll?.('[data-snackbar="1"]');e&&e.forEach(t=>t.parentNode&&t.parentNode.removeChild(t))}catch{}try{Sp()}catch{}};ve.updateSettings=(n={})=>{typeof n.duration=="number"&&(j.defaultDuration=n.duration),typeof n.distance=="number"&&(j.bottomOffset=n.distance),typeof n.position=="string"&&(j.position=n.position==="inferior"?"bottom":n.position==="superior"?"top":n.position),typeof n.align=="string"&&(j.align=n.align==="centro"?"center":n.align==="esquerda"?"left":n.align==="direita"?"right":n.align),typeof n.maxQueue=="number"&&(j.maxQueue=Math.max(1,n.maxQueue|0)),typeof n.antispam=="number"&&(j.cooldownMs=Math.max(0,n.antispam|0)),typeof n.pauseOnHover=="boolean"&&(j.hoverPause=n.pauseOnHover)};ve.clearQueue=()=>{j.clearQueue()};ve.closeCurrent=()=>{j.closeCurrent()};ve.__getStatsForTest=()=>j.getStats();ve.__resetStatsForTest=()=>j.resetStats();function Sp(){try{if(!A||typeof A.on!="function")return;try{if(A.hasListeners&&A.hasListeners("snackbar:show"))return}catch{}A.on("snackbar:show",n=>{try{if(!n)return;if(typeof n=="string"){j.show(n,"info");return}const{message:e,type:t="info",duration:o,action:r}=n;j.show(e,t,o,r)}catch{}}),A.on("snackbar:configure",n=>{try{ve.configure(n||{})}catch{}}),A.on("snackbar:clear",()=>{try{j.clearQueue(),j.closeCurrent()}catch{}}),A.on("snackbar:dismiss",()=>{try{j.closeCurrent()}catch{}}),A.on("snackbar:closeCurrent",()=>{try{j.closeCurrent()}catch{}}),A.on("snackbar:position",n=>{try{if(!n||typeof n!="object")return;typeof n.position=="string"&&(j.position=n.position),typeof n.align=="string"&&(j.align=n.align),typeof n.bottom=="number"&&(j.bottomOffset=n.bottom)}catch{}}),["success","error","warning","info"].forEach(n=>{try{A.on(`snackbar:${n}`,e=>{try{if(!e)return;if(typeof e=="string"){j.show(e,n);return}const{message:t,duration:o,action:r}=e;j.show(t,n,o,r)}catch{}})}catch{}})}catch{}}try{Sp()}catch{}try{typeof window<"u"&&!window.Snackbar&&(window.Snackbar=ve)}catch{}ve.close=()=>j.closeCurrent();ve.clearQueue=()=>j.clearQueue();typeof window<"u"&&(window.Snackbar=ve,window.SnackbarInstance=j);ve.emit=n=>{try{if(!n)return;typeof n=="string"?ve.show(n,"info"):typeof n=="object"&&ve.show(n.message||"Notificação",n.type||"info",n.duration,n.action)}catch{}try{A.emit("snackbar:show",n)}catch{}};try{Ip()}catch{}const io=Object.freeze(Object.defineProperty({__proto__:null,Snackbar:ve},Symbol.toStringTag,{value:"Module"}));console.log("[SimpleSnackbarConfig] Iniciando sistema simplificado...");function ws(){if(console.log("[SimpleSnackbarConfig] Aplicando configurações..."),!window.Snackbar){console.warn("[SimpleSnackbarConfig] window.Snackbar não disponível");return}if(!window.SnackbarInstance){console.warn("[SimpleSnackbarConfig] window.SnackbarInstance não disponível");return}const n=parseInt(localStorage.getItem("toastDuration"))||3e3,e=parseInt(localStorage.getItem("toastDistance"))||80,t=localStorage.getItem("toastPosition")||"bottom",o=localStorage.getItem("toastAlignment")||localStorage.getItem("toastAlign")||"center",r=t==="inferior"?"bottom":t==="superior"?"top":t,i=o==="centro"?"center":o==="esquerda"?"left":o==="direita"?"right":o;console.log("[SimpleSnackbarConfig] Configurações lidas:",{duration:n,distance:e,position:r,align:i}),window.Snackbar.clearQueue&&window.Snackbar.clearQueue(),window.Snackbar.closeCurrent&&window.Snackbar.closeCurrent();const s=document.querySelectorAll('[data-snackbar="1"]');s.forEach(u=>{u.parentNode&&u.parentNode.removeChild(u)}),console.log("[SimpleSnackbarConfig] Snackbars existentes removidos:",s.length);const c=window.SnackbarInstance;c.defaultDuration=n,c.bottomOffset=e,c.position=r,c.align=i,console.log("[SimpleSnackbarConfig] Configurações aplicadas na instância:",{defaultDuration:c.defaultDuration,bottomOffset:c.bottomOffset,position:c.position,align:c.align}),window.Snackbar.configure&&(window.Snackbar.configure({defaultDuration:n,bottom:e,position:r,align:i}),console.log("[SimpleSnackbarConfig] Configurações aplicadas via configure")),console.log("[SimpleSnackbarConfig] Testando configurações..."),window.Snackbar.info("Teste: Configurações aplicadas!")}function WS(){console.log("[SimpleSnackbarConfig] Testando..."),ws(),setTimeout(()=>{window.Snackbar.success("Teste SUCCESS!")},100),setTimeout(()=>{window.Snackbar.warning("Teste WARNING!")},200)}function KS(){console.log("[SimpleSnackbarConfig] Resetando..."),localStorage.setItem("toastDuration","3000"),localStorage.setItem("toastDistance","80"),localStorage.setItem("toastPosition","bottom"),localStorage.setItem("toastAlignment","center"),ws(),window.Snackbar.info("Configurações resetadas!")}window.applySimpleSnackbarConfig=ws;window.testSimpleSnackbarConfig=WS;window.resetSimpleSnackbarConfig=KS;function $a(){window.Snackbar&&window.SnackbarInstance?(console.log("[SimpleSnackbarConfig] Snackbar disponível, aplicando configurações..."),ws()):(console.log("[SimpleSnackbarConfig] Aguardando Snackbar..."),setTimeout($a,100))}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",$a):$a();console.log("[SimpleSnackbarConfig] Sistema simplificado carregado");async function QS(){console.log("🔍 [DebugNotifications] Iniciando debug do sistema de notificações...");try{const n=window.appState?.currentUser,e=window.appState?.currentBudget,t=window.appState?.notifications;if(console.log("👤 [DebugNotifications] Usuário atual:",n?.uid),console.log("💰 [DebugNotifications] Orçamento atual:",e?.id,e?.nome),console.log("📧 [DebugNotifications] Notificações atuais:",t?.length||0),!n?.uid){console.error("❌ [DebugNotifications] Usuário não logado!");return}if(!e?.id){console.error("❌ [DebugNotifications] Nenhum orçamento selecionado!");return}const{getById:o}=await R(async()=>{const{getById:f}=await Promise.resolve().then(()=>_s);return{getById:f}},void 0),r=await o(e.id);console.log("📊 [DebugNotifications] Dados do orçamento:",{id:r?.id,nome:r?.nome,criadoPor:r?.criadoPor,usuariosPermitidos:r?.usuariosPermitidos}),console.log("🧪 [DebugNotifications] Testando criação de notificação...");const{create:i}=await R(async()=>{const{create:f}=await Promise.resolve().then(()=>ce);return{create:f}},void 0),{serverTimestamp:s}=await R(async()=>{const{serverTimestamp:f}=await Promise.resolve().then(()=>Ye);return{serverTimestamp:f}},void 0),c=r?.criadoPor||r?.userId,u={type:"test_notification",budgetId:e.id,budgetName:e.nome||"Orçamento",senderUid:n.uid,senderName:n.displayName||n.email||"Usuário",message:`Notificação de teste para debug - Enviada para dono: ${c}`,createdAt:s(),read:!1,recipientUid:c};console.log("🎯 [DebugNotifications] Enviando notificação para dono:",c);const d=await i(u);console.log("✅ [DebugNotifications] Notificação de teste criada com ID:",d),setTimeout(async()=>{console.log("⏳ [DebugNotifications] Verificando se a notificação chegou...");const{listByRecipient:f}=await R(async()=>{const{listByRecipient:C}=await Promise.resolve().then(()=>ce);return{listByRecipient:C}},void 0),p=await f(n.uid);console.log("📧 [DebugNotifications] Notificações do usuário:",p.length),console.log("📧 [DebugNotifications] Detalhes:",p.map(C=>({id:C.id,type:C.type,message:C.message,read:C.read,createdAt:C.createdAt}))),console.log("👂 [DebugNotifications] Verificando listener...");const{listenByRecipient:m}=await R(async()=>{const{listenByRecipient:C}=await Promise.resolve().then(()=>ce);return{listenByRecipient:C}},void 0),S=m(n.uid,C=>{console.log("📡 [DebugNotifications] Listener recebeu dados:",C.length,"itens"),console.log("📡 [DebugNotifications] Detalhes do listener:",C.map(M=>({id:M.id,type:M.type,read:M.read}))),S()})},2e3)}catch(n){console.error("❌ [DebugNotifications] Erro durante debug:",n)}}async function YS(){console.log("🔍 [DebugSharedNotifications] Testando envio para usuários compartilhados...");try{const n=window.appState?.currentUser,e=window.appState?.currentBudget;if(!n?.uid||!e?.id){console.error("❌ [DebugSharedNotifications] Dados insuficientes para teste");return}const{getById:t}=await R(async()=>{const{getById:i}=await Promise.resolve().then(()=>_s);return{getById:i}},void 0),o=await t(e.id);console.log("📊 [DebugSharedNotifications] Dados do orçamento:",{id:o?.id,nome:o?.nome,criadoPor:o?.criadoPor,usuariosPermitidos:o?.usuariosPermitidos});const{sendTestNotificationToShared:r}=await R(async()=>{const{sendTestNotificationToShared:i}=await import("./NotificationService-B-HO54SU.js");return{sendTestNotificationToShared:i}},[]);console.log("📤 [DebugSharedNotifications] Enviando notificação de teste..."),await r(e.id,n.uid),console.log("✅ [DebugSharedNotifications] Teste de envio concluído"),console.log("ℹ️ [DebugSharedNotifications] Nota: As notificações só aparecerão para os usuários que estão logados!")}catch(n){console.error("❌ [DebugSharedNotifications] Erro durante teste:",n)}}async function JS(){console.log("🔍 [DebugOtherUser] Verificando notificações de outros usuários...");try{const n=window.appState?.currentBudget;if(!n?.id){console.error("❌ [DebugOtherUser] Nenhum orçamento selecionado");return}const{getById:e}=await R(async()=>{const{getById:s}=await Promise.resolve().then(()=>_s);return{getById:s}},void 0),t=await e(n.id),{listByRecipient:o}=await R(async()=>{const{listByRecipient:s}=await Promise.resolve().then(()=>ce);return{listByRecipient:s}},void 0),r=t?.criadoPor||t?.userId;if(r){console.log("👑 [DebugOtherUser] Verificando notificações do dono:",r);const s=await o(r);console.log("📧 [DebugOtherUser] Notificações do dono:",s.length),console.log("📧 [DebugOtherUser] Detalhes do dono:",s.map(c=>({id:c.id,type:c.type,message:c.message,read:c.read,senderUid:c.senderUid})))}const i=t?.usuariosPermitidos||[];for(const s of i)if(s&&s!==r){console.log("👥 [DebugOtherUser] Verificando notificações do usuário:",s);const c=await o(s);console.log("📧 [DebugOtherUser] Notificações do usuário",s,":",c.length),console.log("📧 [DebugOtherUser] Detalhes do usuário",s,":",c.map(u=>({id:u.id,type:u.type,message:u.message,read:u.read,senderUid:u.senderUid})))}}catch(n){console.error("❌ [DebugOtherUser] Erro durante verificação:",n)}}async function XS(){console.log("🧪 [DebugTestModal] Testando modal manualmente...");try{let n=document.getElementById("notification-modal");console.log("🔍 [DebugTestModal] Modal no DOM:",!!n),console.log("🏗️ [DebugTestModal] Importando e criando modal...");const{getNotificationModal:e}=await R(async()=>{const{getNotificationModal:o}=await import("./NotificationModal-B569_tcv.js");return{getNotificationModal:o}},[]),t=e();if(console.log("📱 [DebugTestModal] Instância do modal obtida:",!!t),n=document.getElementById("notification-modal"),console.log("🔍 [DebugTestModal] Modal no DOM após criação:",!!n),n){const o={id:"test-modal-"+Date.now(),type:"test_notification",message:"Teste manual do modal de notificação!",details:"Este é um teste para verificar se o modal está funcionando.",read:!1,createdAt:{toDate:()=>new Date}};console.log("📱 [DebugTestModal] Exibindo modal com notificação de teste..."),t.show(o),console.log("✅ [DebugTestModal] Modal de teste exibido com sucesso"),setTimeout(()=>{const r=document.getElementById("notification-modal");if(r){const i=window.getComputedStyle(r);console.log("🔍 [DebugTestModal] Modal após show():",{display:i.display,opacity:i.opacity,visibility:i.visibility,zIndex:i.zIndex,position:i.position});const s=r.getBoundingClientRect();console.log("📐 [DebugTestModal] Modal dimensions:",{width:s.width,height:s.height,top:s.top,left:s.left,visible:s.width>0&&s.height>0})}},100)}else if(console.error("❌ [DebugTestModal] Modal ainda não foi criado no DOM!"),console.log("🔧 [DebugTestModal] Tentando forçar criação do HTML..."),t.createModalHTML(),n=document.getElementById("notification-modal"),console.log("🔍 [DebugTestModal] Modal após forçar criação:",!!n),n){const o={id:"test-modal-"+Date.now(),type:"test_notification",message:"Teste manual do modal de notificação (forçado)!",details:"Modal foi criado manualmente para teste.",read:!1,createdAt:{toDate:()=>new Date}};t.show(o),console.log("✅ [DebugTestModal] Modal exibido após criação forçada")}}catch(n){console.error("❌ [DebugTestModal] Erro durante teste:",n),console.error("❌ [DebugTestModal] Stack trace:",n.stack)}}function ZS(){console.log("🔍 [DebugNotificationState] Estado atual do sistema:");const n={currentUser:window.appState?.currentUser?.uid,currentBudget:window.appState?.currentBudget?.id,notifications:window.appState?.notifications?.length||0,notificationModal:!!document.getElementById("notification-modal"),eventBus:!!window.eventBus,snackbar:!!window.Snackbar};console.log("📊 [DebugNotificationState] Estado:",n);const e={notificationsUpdated:window.__notifUpdatesListenerBound,notificationModal:window.__notificationModalListenerBound};console.log("👂 [DebugNotificationState] Listeners ativos:",e);const t=window.appState?.notifications||[],o=t.filter(r=>!r.read&&!r.archivedAt).length;if(console.log("📧 [DebugNotificationState] Notificações não lidas:",o),t.length>0){const r=t[0];console.log("📧 [DebugNotificationState] Última notificação:",{id:r.id,type:r.type,read:r.read,createdAt:r.createdAt})}return n}async function eA(){console.log("🧪 [DebugCreateTest] Criando notificação de teste...");try{const n=window.appState?.currentUser,e=window.appState?.currentBudget;if(!n?.uid||!e?.id){console.error("❌ [DebugCreateTest] Usuário ou orçamento não encontrado");return}const{create:t}=await R(async()=>{const{create:s}=await Promise.resolve().then(()=>ce);return{create:s}},void 0),{serverTimestamp:o}=await R(async()=>{const{serverTimestamp:s}=await Promise.resolve().then(()=>Ye);return{serverTimestamp:s}},void 0),r={type:"test_notification",budgetId:e.id,budgetName:e.nome||"Orçamento",senderUid:n.uid,senderName:n.displayName||n.email||"Usuário",message:`Teste manual criado em ${new Date().toLocaleString("pt-BR")}`,details:"Esta é uma notificação de teste criada manualmente para verificar se o sistema está funcionando.",createdAt:o(),read:!1,recipientUid:n.uid};console.log("📝 [DebugCreateTest] Dados da notificação:",r);const i=await t(r);console.log("✅ [DebugCreateTest] Notificação de teste criada com ID:",i),setTimeout(()=>{const c=(window.appState?.notifications||[]).find(u=>u.id===i);c?console.log("✅ [DebugCreateTest] Notificação encontrada no estado local:",c):console.warn("⚠️ [DebugCreateTest] Notificação não encontrada no estado local ainda")},2e3)}catch(n){console.error("❌ [DebugCreateTest] Erro ao criar notificação de teste:",n)}}async function tA(){console.log("🔄 [DebugRecorrente] Criando notificação de recorrente de teste...");try{const n=window.appState?.currentUser,e=window.appState?.currentBudget;if(!n?.uid||!e?.id){console.error("❌ [DebugRecorrente] Usuário ou orçamento não encontrado");return}const{create:t}=await R(async()=>{const{create:s}=await Promise.resolve().then(()=>ce);return{create:s}},void 0),{serverTimestamp:o}=await R(async()=>{const{serverTimestamp:s}=await Promise.resolve().then(()=>Ye);return{serverTimestamp:s}},void 0),r={type:"new_recorrente",budgetId:e.id,budgetName:e.nome||"Orçamento",senderUid:n.uid,senderName:n.displayName||n.email||"Usuário",recorrenteId:"test-recorrente-id",recorrenteNome:"Teste de Despesa Recorrente",recorrenteValor:150,recorrenteFrequencia:"Mensal",recorrenteCategoria:"Teste",recorrenteDescricao:"Esta é uma despesa recorrente de teste",recorrenteParcelasRestantes:5,recorrenteParcelasTotal:12,createdAt:o(),read:!1,recipientUid:n.uid};console.log("📝 [DebugRecorrente] Dados da notificação:",r);const i=await t(r);console.log("✅ [DebugRecorrente] Notificação de recorrente criada com ID:",i),setTimeout(()=>{const c=(window.appState?.notifications||[]).find(u=>u.id===i);c?console.log("✅ [DebugRecorrente] Notificação encontrada no estado local:",c):console.warn("⚠️ [DebugRecorrente] Notificação não encontrada no estado local ainda")},2e3)}catch(n){console.error("❌ [DebugRecorrente] Erro ao criar notificação de recorrente:",n)}}async function nA(){console.log("🔍 [DebugModal] Verificando status do modal...");const n=document.getElementById("notification-modal");if(console.log("📱 [DebugModal] Modal no DOM:",!!n),n){const e=window.getComputedStyle(n);console.log("📱 [DebugModal] Estilos do modal:",{display:e.display,opacity:e.opacity,visibility:e.visibility,zIndex:e.zIndex,position:e.position});const t=n.getBoundingClientRect();console.log("📐 [DebugModal] Dimensões do modal:",{width:t.width,height:t.height,top:t.top,left:t.left,visible:t.width>0&&t.height>0})}return console.log("👂 [DebugModal] Listener notification:show-modal ativo:",window.__notificationModalListenerBound),console.log("📡 [DebugModal] EventBus disponível:",!!window.eventBus),{modalExists:!!n,listenerActive:window.__notificationModalListenerBound,eventBusAvailable:!!window.eventBus}}async function oA(){console.log("🧪 [DebugModalDirect] Testando modal diretamente...");try{const{getNotificationModal:n}=await R(async()=>{const{getNotificationModal:t}=await import("./NotificationModal-B569_tcv.js");return{getNotificationModal:t}},[]),e=n();if(console.log("📱 [DebugModalDirect] Modal obtido:",!!e),e){const t={id:"test-modal-direct",type:"test_notification",message:"Teste direto do modal",details:"Este é um teste direto do modal de notificações",createdAt:new Date,read:!1,senderName:"Sistema de Debug",budgetName:"Orçamento de Teste"};console.log("📱 [DebugModalDirect] Exibindo modal com notificação de teste..."),e.show(t),console.log("✅ [DebugModalDirect] Modal exibido com sucesso"),setTimeout(()=>{const o=document.getElementById("notification-modal");if(o){const r=window.getComputedStyle(o);console.log("📱 [DebugModalDirect] Modal após 1s:",{display:r.display,opacity:r.opacity,visibility:r.visibility,zIndex:r.zIndex});const i=o.getBoundingClientRect();console.log("📐 [DebugModalDirect] Dimensões do modal:",{width:i.width,height:i.height,visible:i.width>0&&i.height>0})}else console.error("❌ [DebugModalDirect] Modal não encontrado no DOM após 1s")},1e3)}else console.error("❌ [DebugModalDirect] Modal não foi obtido")}catch(n){console.error("❌ [DebugModalDirect] Erro durante teste direto:",n),console.error("❌ [DebugModalDirect] Stack trace:",n.stack)}}async function rA(){console.log("📡 [DebugEventBus] Testando eventBus diretamente...");try{if(!window.eventBus){console.error("❌ [DebugEventBus] EventBus não está disponível");return}console.log("📡 [DebugEventBus] EventBus disponível:",!!window.eventBus),console.log("📡 [DebugEventBus] Métodos do EventBus:",Object.getOwnPropertyNames(window.eventBus)),console.log("👂 [DebugEventBus] Listener ativo:",window.__notificationModalListenerBound);const n={id:"test-eventbus",type:"test_notification",message:"Teste via EventBus",details:"Este é um teste via EventBus",createdAt:new Date,read:!1,senderName:"Sistema de Debug",budgetName:"Orçamento de Teste"};console.log("📡 [DebugEventBus] Emitindo evento notification:show-modal..."),window.eventBus.emit("notification:show-modal",n),console.log("✅ [DebugEventBus] Evento emitido com sucesso")}catch(n){console.error("❌ [DebugEventBus] Erro durante teste do EventBus:",n),console.error("❌ [DebugEventBus] Stack trace:",n.stack)}}async function iA(){console.log("🔍 [DebugSystem] Verificando sistema de notificações...");try{console.log("📊 [DebugSystem] Estado do app:",{hasAppState:!!window.appState,hasCurrentUser:!!window.appState?.currentUser,hasCurrentBudget:!!window.appState?.currentBudget,hasNotifications:!!window.appState?.notifications,notificationsCount:window.appState?.notifications?.length||0}),console.log("📡 [DebugSystem] EventBus:",{hasEventBus:!!window.eventBus,hasOnMethod:!!window.eventBus?.on,hasEmitMethod:!!window.eventBus?.emit});const n=window.__notifCtl;console.log("👂 [DebugSystem] Controller de notificações:",{hasController:!!n,hasUnsub:!!n?.unsub,currentUid:n?.uid,lastIdsCount:n?.lastIds?.size||0});const e=window.appState?.currentUser?.uid;if(e)try{const{getUserPrefs:c}=await R(async()=>{const{getUserPrefs:d}=await Promise.resolve().then(()=>ll);return{getUserPrefs:d}},void 0),u=await c(e);console.log("⚙️ [DebugSystem] Preferências do usuário:",u)}catch(c){console.warn("⚠️ [DebugSystem] Erro ao obter preferências:",c)}const t=document.getElementById("notification-modal");console.log("📱 [DebugSystem] Modal:",{exists:!!t,visible:t?t.style.display!=="none":!1,hasContent:t?t.innerHTML.length>0:!1}),console.log("🧪 [DebugSystem] Testando criação de notificação...");const{create:o}=await R(async()=>{const{create:c}=await Promise.resolve().then(()=>ce);return{create:c}},void 0),{serverTimestamp:r}=await R(async()=>{const{serverTimestamp:c}=await Promise.resolve().then(()=>Ye);return{serverTimestamp:c}},void 0),i={type:"test_notification",budgetId:window.appState?.currentBudget?.id,budgetName:window.appState?.currentBudget?.nome||"Orçamento",senderUid:window.appState?.currentUser?.uid,senderName:window.appState?.currentUser?.displayName||"Usuário",message:"Teste de sistema de notificações",createdAt:r(),read:!1,recipientUid:window.appState?.currentUser?.uid},s=await o(i);console.log("✅ [DebugSystem] Notificação de teste criada com ID:",s),setTimeout(()=>{const u=(window.appState?.notifications||[]).find(d=>d.id===s);u?(console.log("✅ [DebugSystem] Notificação de teste encontrada no estado local"),console.log("📝 [DebugSystem] Dados da notificação:",u)):console.warn("⚠️ [DebugSystem] Notificação de teste não encontrada no estado local")},3e3)}catch(n){console.error("❌ [DebugSystem] Erro durante verificação:",n),console.error("❌ [DebugSystem] Stack trace:",n.stack)}}async function Ap(){console.log("💳 [DebugTransaction] Testando notificação de transação...");try{const n=window.appState?.currentUser,e=window.appState?.currentBudget;if(!n?.uid||!e?.id){console.error("❌ [DebugTransaction] Usuário ou orçamento não encontrado");return}const{create:t}=await R(async()=>{const{create:s}=await Promise.resolve().then(()=>ce);return{create:s}},void 0),{serverTimestamp:o}=await R(async()=>{const{serverTimestamp:s}=await Promise.resolve().then(()=>Ye);return{serverTimestamp:s}},void 0),r={type:"new_transaction",budgetId:e.id,budgetName:e.nome||"Orçamento",senderUid:n.uid,senderName:n.displayName||n.email||"Usuário",transactionId:"test-transaction-id",transactionDescricao:"Teste de transação",transactionValor:100,transactionTipo:"despesa",transactionCategoria:"Teste",createdAt:o(),read:!1,recipientUid:n.uid};console.log("📝 [DebugTransaction] Dados da notificação:",r);const i=await t(r);console.log("✅ [DebugTransaction] Notificação de transação criada com ID:",i),setTimeout(()=>{const c=(window.appState?.notifications||[]).find(u=>u.id===i);c?console.log("✅ [DebugTransaction] Notificação encontrada no estado local:",c):console.warn("⚠️ [DebugTransaction] Notificação não encontrada no estado local ainda")},2e3)}catch(n){console.error("❌ [DebugTransaction] Erro ao criar notificação de transação:",n)}}async function Dp(){console.log("🔄 [DebugRecurringEditDelete] Testando notificações de edição e exclusão...");try{const n=window.appState?.currentUser,e=window.appState?.currentBudget;if(!n?.uid||!e?.id){console.error("❌ [DebugRecurringEditDelete] Usuário ou orçamento não encontrado");return}console.log("📊 [DebugRecurringEditDelete] Dados do orçamento:",{id:e.id,nome:e.nome,usuariosPermitidos:e.usuariosPermitidos,usuariosPermitidosCount:e.usuariosPermitidos?.length||0}),console.log("✏️ [DebugRecurringEditDelete] Testando notificação de edição...");const{create:t}=await R(async()=>{const{create:u}=await Promise.resolve().then(()=>ce);return{create:u}},void 0),{serverTimestamp:o}=await R(async()=>{const{serverTimestamp:u}=await Promise.resolve().then(()=>Ye);return{serverTimestamp:u}},void 0),r={type:"updated_recorrente",budgetId:e.id,budgetName:e.nome||"Orçamento",senderUid:n.uid,senderName:n.displayName||n.email||"Usuário",recorrenteId:"test-edit-recorrente-id",recorrenteNome:"Despesa Recorrente Editada",recorrenteValor:200,recorrenteFrequencia:"mensal",recorrenteCategoria:"Teste",recorrenteDescricao:"Esta despesa foi editada",recorrenteParcelasRestantes:3,recorrenteParcelasTotal:6,changes:{valor:{from:150,to:200},parcelasRestantes:{from:5,to:3}},prev:{nome:"Despesa Recorrente Editada",valor:150,frequencia:"mensal",categoria:"Teste",descricao:"Esta despesa foi editada",parcelasRestantes:5,parcelasTotal:6},createdAt:o(),read:!1,recipientUid:n.uid};console.log("📝 [DebugRecurringEditDelete] Dados da notificação de edição:",r);const i=await t(r);console.log("✅ [DebugRecurringEditDelete] Notificação de edição criada com ID:",i),console.log("🗑️ [DebugRecurringEditDelete] Testando notificação de exclusão...");const s={type:"deleted_recorrente",budgetId:e.id,budgetName:e.nome||"Orçamento",senderUid:n.uid,senderName:n.displayName||n.email||"Usuário",recorrenteId:"test-delete-recorrente-id",recorrenteNome:"Despesa Recorrente Excluída",recorrenteValor:100,recorrenteFrequencia:"mensal",recorrenteCategoria:"Teste",recorrenteDescricao:"Esta despesa foi excluída",recorrenteParcelasRestantes:2,recorrenteParcelasTotal:4,createdAt:o(),read:!1,recipientUid:n.uid};console.log("📝 [DebugRecurringEditDelete] Dados da notificação de exclusão:",s);const c=await t(s);console.log("✅ [DebugRecurringEditDelete] Notificação de exclusão criada com ID:",c),setTimeout(()=>{const u=window.appState?.notifications||[],d=u.find(p=>p.id===i),f=u.find(p=>p.id===c);d?console.log("✅ [DebugRecurringEditDelete] Notificação de edição encontrada:",d):console.warn("⚠️ [DebugRecurringEditDelete] Notificação de edição não encontrada"),f?console.log("✅ [DebugRecurringEditDelete] Notificação de exclusão encontrada:",f):console.warn("⚠️ [DebugRecurringEditDelete] Notificação de exclusão não encontrada")},3e3)}catch(n){console.error("❌ [DebugRecurringEditDelete] Erro durante teste:",n)}}async function Cp(){console.log("🔍 [DebugFullDiagnosis] Iniciando diagnóstico completo do sistema de notificações...");try{console.log("📊 [DebugFullDiagnosis] === ESTADO BÁSICO ==="),console.log("App State:",{hasAppState:!!window.appState,hasCurrentUser:!!window.appState?.currentUser,hasCurrentBudget:!!window.appState?.currentBudget,currentUserId:window.appState?.currentUser?.uid,currentBudgetId:window.appState?.currentBudget?.id,currentBudgetName:window.appState?.currentBudget?.nome,usuariosPermitidos:window.appState?.currentBudget?.usuariosPermitidos,usuariosCount:window.appState?.currentBudget?.usuariosPermitidos?.length||0}),console.log("📡 [DebugFullDiagnosis] === EVENTBUS ==="),console.log("EventBus:",{exists:!!window.eventBus,hasOn:!!window.eventBus?.on,hasEmit:!!window.eventBus?.emit,hasOff:!!window.eventBus?.off}),console.log("👂 [DebugFullDiagnosis] === CONTROLLER DE NOTIFICAÇÕES ===");const n=window.__notifCtl;console.log("Controller:",{exists:!!n,hasUnsub:!!n?.unsub,currentUid:n?.uid,lastIdsCount:n?.lastIds?.size||0,lastSeenAt:n?.lastSeenAt}),console.log("📧 [DebugFullDiagnosis] === ESTADO DAS NOTIFICAÇÕES ===");const e=window.appState?.notifications||[];console.log("Notificações:",{count:e.length,unreadCount:e.filter(r=>!r.read).length,types:[...new Set(e.map(r=>r.type))],recent:e.slice(-3).map(r=>({id:r.id,type:r.type,read:r.read,createdAt:r.createdAt}))}),console.log("📱 [DebugFullDiagnosis] === MODAL ===");const t=document.getElementById("notification-modal");console.log("Modal:",{exists:!!t,visible:t?t.style.display!=="none":!1,hasContent:t?t.innerHTML.length>0:!1,classes:t?t.className:null}),console.log("🧪 [DebugFullDiagnosis] === TESTE DE CRIAÇÃO ===");try{const{create:r}=await R(async()=>{const{create:u}=await Promise.resolve().then(()=>ce);return{create:u}},void 0),{serverTimestamp:i}=await R(async()=>{const{serverTimestamp:u}=await Promise.resolve().then(()=>Ye);return{serverTimestamp:u}},void 0),s={type:"test_notification",budgetId:window.appState?.currentBudget?.id,budgetName:window.appState?.currentBudget?.nome||"Orçamento",senderUid:window.appState?.currentUser?.uid,senderName:window.appState?.currentUser?.displayName||"Usuário",message:"Teste de diagnóstico completo",createdAt:i(),read:!1,recipientUid:window.appState?.currentUser?.uid};console.log("📝 [DebugFullDiagnosis] Criando notificação de teste...");const c=await r(s);console.log("✅ [DebugFullDiagnosis] Notificação criada com ID:",c),setTimeout(()=>{console.log("⏰ [DebugFullDiagnosis] Verificando se a notificação chegou...");const u=window.appState?.notifications||[],d=u.find(f=>f.id===c);d?console.log("✅ [DebugFullDiagnosis] Notificação encontrada no estado local:",d):(console.warn("⚠️ [DebugFullDiagnosis] Notificação não encontrada no estado local"),console.log("📊 [DebugFullDiagnosis] Estado atual das notificações:",u.length,"itens"))},3e3)}catch(r){console.error("❌ [DebugFullDiagnosis] Erro ao criar notificação de teste:",r)}console.log("⚙️ [DebugFullDiagnosis] === PREFERÊNCIAS ===");try{const{getUserPrefs:r}=await R(async()=>{const{getUserPrefs:s}=await Promise.resolve().then(()=>ll);return{getUserPrefs:s}},void 0),i=await r(window.appState?.currentUser?.uid);console.log("Preferências:",i)}catch(r){console.warn("⚠️ [DebugFullDiagnosis] Erro ao obter preferências:",r)}console.log("💾 [DebugFullDiagnosis] === LOCALSTORAGE ==="),["notification_use_modal","notification_toasts_enabled","notification_types_enabled","notification_period_filter"].forEach(r=>{const i=localStorage.getItem(r);console.log(`${r}:`,i)}),console.log("✅ [DebugFullDiagnosis] Diagnóstico completo finalizado!")}catch(n){console.error("❌ [DebugFullDiagnosis] Erro durante diagnóstico:",n),console.error("❌ [DebugFullDiagnosis] Stack trace:",n.stack)}}async function Rp(){console.log("📡 [DebugEventBusSystem] Testando sistema de EventBus...");try{if(!window.eventBus){console.error("❌ [DebugEventBusSystem] EventBus não está disponível");return}console.log("✅ [DebugEventBusSystem] EventBus encontrado"),console.log("🧪 [DebugEventBusSystem] Testando emissão de evento simples...");let n=!1;const e=r=>{console.log("✅ [DebugEventBusSystem] Evento de teste recebido:",r),n=!0};window.eventBus.on("test-event",e),window.eventBus.emit("test-event",{message:"Teste do EventBus",timestamp:Date.now()}),setTimeout(()=>{n?console.log("✅ [DebugEventBusSystem] EventBus está funcionando corretamente"):console.warn("⚠️ [DebugEventBusSystem] Evento não foi recebido"),window.eventBus.off("test-event",e)},1e3),console.log("📱 [DebugEventBusSystem] Testando evento de notificação...");const t={id:"test-eventbus-notification",type:"test_notification",message:"Teste do EventBus para notificações",createdAt:new Date,read:!1};window.eventBus.emit("notification:show-modal",t),console.log("📤 [DebugEventBusSystem] Evento notification:show-modal emitido"),console.log("🔍 [DebugEventBusSystem] Verificando listener global..."),console.log("Listener global ativo:",!!window.__notificationModalListenerBound),console.log("🔄 [DebugEventBusSystem] Testando outros eventos..."),["notifications:updated","snackbar:show","transactions:updated","categories:updated"].forEach(r=>{try{window.eventBus.emit(r,{test:!0,timestamp:Date.now()}),console.log(`✅ [DebugEventBusSystem] Evento ${r} emitido com sucesso`)}catch(i){console.error(`❌ [DebugEventBusSystem] Erro ao emitir evento ${r}:`,i)}})}catch(n){console.error("❌ [DebugEventBusSystem] Erro durante teste do EventBus:",n)}}async function Np(){console.log("🔄 [DebugRecurringComplete] Testando notificação de recorrente completa...");try{const n=window.appState?.currentUser,e=window.appState?.currentBudget;if(!n?.uid||!e?.id){console.error("❌ [DebugRecurringComplete] Usuário ou orçamento não encontrado");return}const{create:t}=await R(async()=>{const{create:s}=await Promise.resolve().then(()=>ce);return{create:s}},void 0),{serverTimestamp:o}=await R(async()=>{const{serverTimestamp:s}=await Promise.resolve().then(()=>Ye);return{serverTimestamp:s}},void 0),r={type:"new_recorrente",budgetId:e.id,budgetName:e.nome||"Orçamento",senderUid:n.uid,senderName:n.displayName||n.email||"Usuário",recorrenteId:"test-recorrente-complete-id",recorrenteNome:"Despesa Recorrente Completa",recorrenteValor:250,recorrenteFrequencia:"mensal",recorrenteCategoria:"Teste Completo",recorrenteDescricao:"Esta é uma despesa recorrente de teste completa",recorrenteParcelasRestantes:8,recorrenteParcelasTotal:12,createdAt:o(),read:!1,recipientUid:n.uid};console.log("📝 [DebugRecurringComplete] Dados da notificação:",r),console.log("🔍 [DebugRecurringComplete] Campos de parcelas:",{parcelasRestantes:r.recorrenteParcelasRestantes,parcelasTotal:r.recorrenteParcelasTotal,temParcelas:r.recorrenteParcelasTotal>1});const i=await t(r);console.log("✅ [DebugRecurringComplete] Notificação de recorrente criada com ID:",i),setTimeout(()=>{const s=window.appState?.notifications||[],c=s.find(u=>u.id===i);c?(console.log("✅ [DebugRecurringComplete] Notificação encontrada no estado local:",c),console.log("🔍 [DebugRecurringComplete] Campos de parcelas na notificação recebida:",{parcelasRestantes:c.recorrenteParcelasRestantes,parcelasTotal:c.recorrenteParcelasTotal,temParcelas:c.recorrenteParcelasTotal>1}),console.log("📅 [DebugRecurringComplete] Data da notificação:",c.createdAt),console.log("📊 [DebugRecurringComplete] Posição na lista:",s.findIndex(u=>u.id===i))):console.warn("⚠️ [DebugRecurringComplete] Notificação não encontrada no estado local")},3e3)}catch(n){console.error("❌ [DebugRecurringComplete] Erro ao criar notificação de recorrente:",n)}}async function sA(){if(console.log("🔍 [DebugEventBus] Verificando EventBus e Modal..."),console.log("🔍 [DebugEventBus] window.eventBus:",!!window.eventBus),console.log("🔍 [DebugEventBus] window.eventBus.emit:",typeof window.eventBus?.emit),console.log("🔍 [DebugEventBus] window.eventBus.on:",typeof window.eventBus?.on),console.log("🔍 [DebugEventBus] window.__notificationModalListenerBound:",window.__notificationModalListenerBound),window.eventBus&&typeof window.eventBus.emit=="function"){const n={id:"test-"+Date.now(),type:"new_transaction",message:"Teste de EventBus",transactionDescricao:"Teste de transação",transactionValor:100.5,createdAt:new Date,read:!1};console.log("📤 [DebugEventBus] Emitindo evento notification:show-modal..."),window.eventBus.emit("notification:show-modal",n),console.log("✅ [DebugEventBus] Evento emitido")}else console.error("❌ [DebugEventBus] EventBus não disponível")}async function aA(){console.log("🏭 [DebugProduction] === DIAGNÓSTICO DE PRODUÇÃO ==="),console.log("🌍 [DebugProduction] Ambiente:",{isProduction:!0,isDevelopment:!1,userAgent:navigator.userAgent,location:window.location.href}),console.log("📡 [DebugProduction] EventBus:",{exists:!!window.eventBus,hasOn:!!window.eventBus?.on,hasEmit:!!window.eventBus?.emit,listenerBound:!!window.__notificationModalListenerBound});const n=document.getElementById("notification-modal");console.log("📱 [DebugProduction] Modal DOM:",{exists:!!n,inDocument:document.contains(n),display:n?window.getComputedStyle(n).display:"N/A",visibility:n?window.getComputedStyle(n).visibility:"N/A",opacity:n?window.getComputedStyle(n).opacity:"N/A",zIndex:n?window.getComputedStyle(n).zIndex:"N/A"});const e=document.querySelector('link[href*="notification-modal"]')||document.querySelector("style[data-notification-modal]");console.log("🎨 [DebugProduction] CSS Modal:",{cssLoaded:!!e,cssHref:e?.href||"N/A"});try{console.log("📦 [DebugProduction] Testando importação do modal...");const{getNotificationModal:t}=await R(async()=>{const{getNotificationModal:r}=await import("./NotificationModal-B569_tcv.js");return{getNotificationModal:r}},[]),o=t();console.log("✅ [DebugProduction] Modal importado:",!!o),console.log("✅ [DebugProduction] Modal show method:",typeof o?.show)}catch(t){console.error("❌ [DebugProduction] Erro ao importar modal:",t)}if(window.eventBus){console.log("📤 [DebugProduction] Testando evento...");const t={id:"test-production-"+Date.now(),type:"test_notification",message:"Teste de Produção",createdAt:new Date,read:!1};window.eventBus.emit("notification:show-modal",t),console.log("✅ [DebugProduction] Evento emitido"),setTimeout(()=>{const o=document.getElementById("notification-modal");console.log("📱 [DebugProduction] Modal após evento:",{exists:!!o,display:o?window.getComputedStyle(o).display:"N/A",visibility:o?window.getComputedStyle(o).visibility:"N/A",opacity:o?window.getComputedStyle(o).opacity:"N/A"})},1e3)}console.log("🏭 [DebugProduction] === FIM DO DIAGNÓSTICO ===")}async function Pp(){console.log("📱 [DebugModalDirect] Testando modal diretamente...");try{let n=document.getElementById("notification-modal");if(console.log("🔍 [DebugModalDirect] Modal no DOM:",!!n),!n){console.log("🔧 [DebugModalDirect] Modal não existe, criando...");const{getNotificationModal:t}=await R(async()=>{const{getNotificationModal:o}=await import("./NotificationModal-B569_tcv.js");return{getNotificationModal:o}},[]);n=t(),console.log("✅ [DebugModalDirect] Modal criado:",!!n)}n&&console.log("📊 [DebugModalDirect] Estado do modal:",{exists:!!n,visible:n.style.display!=="none",hasContent:n.innerHTML.length>0,classes:n.className});const e={id:"test-modal-direct",type:"test_notification",message:"Teste direto do modal",createdAt:new Date,read:!1,senderName:"Sistema de Teste",budgetName:"Orçamento de Teste"};if(console.log("📝 [DebugModalDirect] Notificação de teste:",e),n){console.log("🚀 [DebugModalDirect] Tentando mostrar modal...");const{getNotificationModal:t}=await R(async()=>{const{getNotificationModal:r}=await import("./NotificationModal-B569_tcv.js");return{getNotificationModal:r}},[]),o=t();o&&typeof o.show=="function"?(console.log("✅ [DebugModalDirect] Função show encontrada, executando..."),o.show(e),console.log("✅ [DebugModalDirect] Modal.show() executado"),setTimeout(()=>{const r=document.getElementById("notification-modal");r&&console.log("📊 [DebugModalDirect] Estado após show():",{visible:r.style.display!=="none",hasContent:r.innerHTML.length>0,opacity:r.style.opacity,zIndex:r.style.zIndex})},1e3)):console.error("❌ [DebugModalDirect] Função show não encontrada no modal")}console.log("📡 [DebugModalDirect] Testando via EventBus..."),window.eventBus?(console.log("✅ [DebugModalDirect] EventBus encontrado, emitindo evento..."),window.eventBus.emit("notification:show-modal",e),console.log("✅ [DebugModalDirect] Evento notification:show-modal emitido"),setTimeout(()=>{const t=document.getElementById("notification-modal");t&&console.log("📊 [DebugModalDirect] Estado após EventBus:",{visible:t.style.display!=="none",hasContent:t.innerHTML.length>0,opacity:t.style.opacity,zIndex:t.style.zIndex})},1e3)):console.error("❌ [DebugModalDirect] EventBus não encontrado")}catch(n){console.error("❌ [DebugModalDirect] Erro durante teste:",n),console.error("❌ [DebugModalDirect] Stack trace:",n.stack)}}async function kp(){console.log("🔍 [DebugCompleteSystem] Iniciando diagnóstico completo do sistema...");try{console.log("📊 [DebugCompleteSystem] === ESTADO BÁSICO ==="),console.log("App State:",{hasAppState:!!window.appState,hasCurrentUser:!!window.appState?.currentUser,hasCurrentBudget:!!window.appState?.currentBudget,currentUserId:window.appState?.currentUser?.uid,currentBudgetId:window.appState?.currentBudget?.id,currentBudgetName:window.appState?.currentBudget?.nome,usuariosPermitidos:window.appState?.currentBudget?.usuariosPermitidos,usuariosCount:window.appState?.currentBudget?.usuariosPermitidos?.length||0}),console.log("📡 [DebugCompleteSystem] === EVENTBUS ==="),console.log("EventBus:",{exists:!!window.eventBus,hasOn:!!window.eventBus?.on,hasEmit:!!window.eventBus?.emit,hasOff:!!window.eventBus?.off}),console.log("👂 [DebugCompleteSystem] === CONTROLLER DE NOTIFICAÇÕES ===");const n=window.__notifCtl;console.log("Controller:",{exists:!!n,hasUnsub:!!n?.unsub,currentUid:n?.uid,lastIdsCount:n?.lastIds?.size||0,lastSeenAt:n?.lastSeenAt}),console.log("📧 [DebugCompleteSystem] === ESTADO DAS NOTIFICAÇÕES ===");const e=window.appState?.notifications||[];console.log("Notificações:",{count:e.length,unreadCount:e.filter(r=>!r.read).length,types:[...new Set(e.map(r=>r.type))],recent:e.slice(-3).map(r=>({id:r.id,type:r.type,read:r.read,createdAt:r.createdAt}))}),console.log("📱 [DebugCompleteSystem] === MODAL ===");const t=document.getElementById("notification-modal");console.log("Modal:",{exists:!!t,visible:t?t.style.display!=="none":!1,hasContent:t?t.innerHTML.length>0:!1,classes:t?t.className:null}),console.log("🎧 [DebugCompleteSystem] === LISTENER GLOBAL ==="),console.log("Listener Global:",{bound:!!window.__notificationModalListenerBound,eventBusExists:!!window.eventBus}),console.log("🧪 [DebugCompleteSystem] === TESTE DE CRIAÇÃO ===");try{const{create:r}=await R(async()=>{const{create:u}=await Promise.resolve().then(()=>ce);return{create:u}},void 0),{serverTimestamp:i}=await R(async()=>{const{serverTimestamp:u}=await Promise.resolve().then(()=>Ye);return{serverTimestamp:u}},void 0),s={type:"test_notification",budgetId:window.appState?.currentBudget?.id,budgetName:window.appState?.currentBudget?.nome||"Orçamento",senderUid:window.appState?.currentUser?.uid,senderName:window.appState?.currentUser?.displayName||"Usuário",message:"Teste de diagnóstico completo do sistema",createdAt:i(),read:!1,recipientUid:window.appState?.currentUser?.uid};console.log("📝 [DebugCompleteSystem] Criando notificação de teste...");const c=await r(s);console.log("✅ [DebugCompleteSystem] Notificação criada com ID:",c),setTimeout(()=>{console.log("⏰ [DebugCompleteSystem] Verificando se a notificação chegou...");const u=window.appState?.notifications||[],d=u.find(f=>f.id===c);d?console.log("✅ [DebugCompleteSystem] Notificação encontrada no estado local:",d):(console.warn("⚠️ [DebugCompleteSystem] Notificação não encontrada no estado local"),console.log("📊 [DebugCompleteSystem] Estado atual das notificações:",u.length,"itens"))},3e3)}catch(r){console.error("❌ [DebugCompleteSystem] Erro ao criar notificação de teste:",r)}if(console.log("📡 [DebugCompleteSystem] === TESTE DO EVENTBUS ==="),window.eventBus){console.log("✅ [DebugCompleteSystem] EventBus encontrado, testando...");let r=!1;const i=c=>{console.log("✅ [DebugCompleteSystem] Evento de teste recebido:",c),r=!0};window.eventBus.on("test-complete-system",i),window.eventBus.emit("test-complete-system",{message:"Teste do sistema completo",timestamp:Date.now()}),setTimeout(()=>{r?console.log("✅ [DebugCompleteSystem] EventBus está funcionando"):console.warn("⚠️ [DebugCompleteSystem] EventBus pode não estar funcionando"),window.eventBus.off("test-complete-system",i)},1e3),console.log("📱 [DebugCompleteSystem] Testando evento de notificação...");const s={id:"test-complete-system-notification",type:"test_notification",message:"Teste do sistema completo",createdAt:new Date,read:!1,senderName:"Sistema de Teste",budgetName:"Orçamento de Teste"};window.eventBus.emit("notification:show-modal",s),console.log("📤 [DebugCompleteSystem] Evento notification:show-modal emitido")}else console.error("❌ [DebugCompleteSystem] EventBus não encontrado");console.log("⚙️ [DebugCompleteSystem] === PREFERÊNCIAS ===");try{const{getUserPrefs:r}=await R(async()=>{const{getUserPrefs:s}=await Promise.resolve().then(()=>ll);return{getUserPrefs:s}},void 0),i=await r(window.appState?.currentUser?.uid);console.log("Preferências:",i)}catch(r){console.warn("⚠️ [DebugCompleteSystem] Erro ao obter preferências:",r)}console.log("💾 [DebugCompleteSystem] === LOCALSTORAGE ==="),["notification_use_modal","notification_toasts_enabled","notification_types_enabled","notification_period_filter"].forEach(r=>{const i=localStorage.getItem(r);console.log(`${r}:`,i)}),console.log("✅ [DebugCompleteSystem] Diagnóstico completo finalizado!")}catch(n){console.error("❌ [DebugCompleteSystem] Erro durante diagnóstico:",n),console.error("❌ [DebugCompleteSystem] Stack trace:",n.stack)}}async function Mp(){console.log("🧪 [DebugRecurringCategory] Testando notificações de recorrentes e categorias...");try{const n=window.appState?.currentUser,e=window.appState?.currentBudget;if(!n||!e){console.error("❌ [DebugRecurringCategory] Usuário ou orçamento não encontrado");return}console.log("📊 [DebugRecurringCategory] Estado atual:",{userId:n.uid,budgetId:e.id,budgetName:e.nome,usuariosPermitidos:e.usuariosPermitidos}),console.log("📁 [DebugRecurringCategory] === TESTE DE CATEGORIA ===");try{const{sendCategoryChangeNotification:t}=await R(async()=>{const{sendCategoryChangeNotification:r}=await import("./NotificationService-B-HO54SU.js");return{sendCategoryChangeNotification:r}},[]),o={id:"test-category-"+Date.now(),nome:"Categoria de Teste",descricao:"Descrição da categoria de teste",cor:"#ff0000",tipo:"expense",limite:1e3,budgetId:e.id,userId:n.uid};console.log("📝 [DebugRecurringCategory] Enviando notificação de categoria..."),await t(e.id,n.uid,o,"category_added"),console.log("✅ [DebugRecurringCategory] Notificação de categoria enviada")}catch(t){console.error("❌ [DebugRecurringCategory] Erro ao enviar notificação de categoria:",t)}console.log("🔄 [DebugRecurringCategory] === TESTE DE RECORRENTE ===");try{const{sendRecorrenteChangeNotification:t}=await R(async()=>{const{sendRecorrenteChangeNotification:r}=await import("./NotificationService-B-HO54SU.js");return{sendRecorrenteChangeNotification:r}},[]),o={id:"test-recorrente-"+Date.now(),nome:"Recorrente de Teste",valor:500,frequencia:"mensal",categoria:"Alimentação",descricao:"Descrição do recorrente de teste",parcelasRestantes:10,parcelasTotal:12,budgetId:e.id,userId:n.uid};console.log("📝 [DebugRecurringCategory] Enviando notificação de recorrente..."),await t(e.id,n.uid,o,"new_recorrente"),console.log("✅ [DebugRecurringCategory] Notificação de recorrente enviada")}catch(t){console.error("❌ [DebugRecurringCategory] Erro ao enviar notificação de recorrente:",t)}if(console.log("⏰ [DebugRecurringCategory] Aguardando notificações chegarem..."),setTimeout(()=>{const t=window.appState?.notifications||[],o=t.filter(r=>r.type==="category_added"||r.type==="new_recorrente").slice(-2);console.log("📧 [DebugRecurringCategory] Notificações recentes encontradas:",o.length),o.forEach(r=>{console.log("📋 [DebugRecurringCategory] Notificação:",{id:r.id,type:r.type,read:r.read,createdAt:r.createdAt})}),o.length===0&&(console.warn("⚠️ [DebugRecurringCategory] Nenhuma notificação recente encontrada"),console.log("📊 [DebugRecurringCategory] Total de notificações:",t.length))},3e3),console.log("📱 [DebugRecurringCategory] === TESTE DO MODAL ==="),window.eventBus){const t={id:"test-modal-recurring-category",type:"category_added",message:"Teste de modal para categoria",createdAt:new Date,read:!1,senderName:"Sistema de Teste",budgetName:e.nome,categoryNome:"Categoria de Teste",categoryDescricao:"Descrição da categoria",categoryCor:"#ff0000",categoryTipo:"expense",categoryLimite:1e3};console.log("📤 [DebugRecurringCategory] Emitindo evento para modal..."),window.eventBus.emit("notification:show-modal",t),console.log("✅ [DebugRecurringCategory] Evento emitido"),setTimeout(()=>{const o=document.getElementById("notification-modal");o&&o.style.display!=="none"?console.log("✅ [DebugRecurringCategory] Modal apareceu corretamente"):console.warn("⚠️ [DebugRecurringCategory] Modal não apareceu")},1e3)}console.log("✅ [DebugRecurringCategory] Teste de recorrentes e categorias finalizado!")}catch(n){console.error("❌ [DebugRecurringCategory] Erro durante teste:",n),console.error("❌ [DebugRecurringCategory] Stack trace:",n.stack)}}async function Op(){console.log("🔬 [DebugDetailed] Iniciando teste detalhado de notificações...");try{const n=window.appState?.currentUser,e=window.appState?.currentBudget;if(!n||!e){console.error("❌ [DebugDetailed] Usuário ou orçamento não encontrado"),console.log("📊 [DebugDetailed] Estado atual:",{hasUser:!!n,hasBudget:!!e,userId:n?.uid,budgetId:e?.id});return}console.log("📊 [DebugDetailed] Estado inicial:",{userId:n.uid,budgetId:e.id,budgetName:e.nome,usuariosPermitidos:e.usuariosPermitidos}),console.log("📦 [DebugDetailed] === TESTE DE IMPORTAÇÃO ===");try{const{sendCategoryChangeNotification:t,sendRecorrenteChangeNotification:o}=await R(async()=>{const{sendCategoryChangeNotification:r,sendRecorrenteChangeNotification:i}=await import("./NotificationService-B-HO54SU.js");return{sendCategoryChangeNotification:r,sendRecorrenteChangeNotification:i}},[]);console.log("✅ [DebugDetailed] Funções importadas:",{hasCategoryFunction:!!t,hasRecorrenteFunction:!!o})}catch(t){console.error("❌ [DebugDetailed] Erro ao importar funções:",t);return}console.log("🔥 [DebugDetailed] === TESTE DIRETO NO FIREBASE ===");try{const{create:t}=await R(async()=>{const{create:s}=await Promise.resolve().then(()=>ce);return{create:s}},void 0),{serverTimestamp:o}=await R(async()=>{const{serverTimestamp:s}=await Promise.resolve().then(()=>Ye);return{serverTimestamp:s}},void 0),r={type:"test_direct_firebase",budgetId:e.id,budgetName:e.nome,senderUid:n.uid,senderName:n.displayName||"Usuário",message:"Teste direto no Firebase",createdAt:o(),read:!1,recipientUid:n.uid};console.log("📝 [DebugDetailed] Criando notificação direta...");const i=await t(r);console.log("✅ [DebugDetailed] Notificação direta criada com ID:",i),setTimeout(()=>{(window.appState?.notifications||[]).find(u=>u.id===i)?console.log("✅ [DebugDetailed] Notificação direta chegou ao estado local"):console.warn("⚠️ [DebugDetailed] Notificação direta não chegou ao estado local")},2e3)}catch(t){console.error("❌ [DebugDetailed] Erro ao criar notificação direta:",t)}console.log("📁 [DebugDetailed] === TESTE DE CATEGORIA DETALHADO ===");try{const{sendCategoryChangeNotification:t}=await R(async()=>{const{sendCategoryChangeNotification:r}=await import("./NotificationService-B-HO54SU.js");return{sendCategoryChangeNotification:r}},[]),o={id:"test-category-detailed-"+Date.now(),nome:"Categoria Detalhada",descricao:"Descrição da categoria detalhada",cor:"#00ff00",tipo:"expense",limite:2e3,budgetId:e.id,userId:n.uid};console.log("📝 [DebugDetailed] Dados da categoria de teste:",o),console.log("📤 [DebugDetailed] Chamando sendCategoryChangeNotification..."),await t(e.id,n.uid,o,"category_added"),console.log("✅ [DebugDetailed] sendCategoryChangeNotification executada sem erro")}catch(t){console.error("❌ [DebugDetailed] Erro em sendCategoryChangeNotification:",t),console.error("❌ [DebugDetailed] Stack trace:",t.stack)}console.log("🔄 [DebugDetailed] === TESTE DE RECORRENTE DETALHADO ===");try{const{sendRecorrenteChangeNotification:t}=await R(async()=>{const{sendRecorrenteChangeNotification:r}=await import("./NotificationService-B-HO54SU.js");return{sendRecorrenteChangeNotification:r}},[]),o={id:"test-recorrente-detailed-"+Date.now(),nome:"Recorrente Detalhado",valor:750,frequencia:"mensal",categoria:"Alimentação",descricao:"Descrição do recorrente detalhado",parcelasRestantes:8,parcelasTotal:10,budgetId:e.id,userId:n.uid};console.log("📝 [DebugDetailed] Dados do recorrente de teste:",o),console.log("📤 [DebugDetailed] Chamando sendRecorrenteChangeNotification..."),await t(e.id,n.uid,o,"new_recorrente"),console.log("✅ [DebugDetailed] sendRecorrenteChangeNotification executada sem erro")}catch(t){console.error("❌ [DebugDetailed] Erro em sendRecorrenteChangeNotification:",t),console.error("❌ [DebugDetailed] Stack trace:",t.stack)}if(console.log("⏰ [DebugDetailed] Aguardando 5 segundos para verificar notificações..."),setTimeout(()=>{const t=window.appState?.notifications||[];console.log("📧 [DebugDetailed] Estado final das notificações:",{total:t.length,recent:t.slice(-5).map(r=>({id:r.id,type:r.type,read:r.read,createdAt:r.createdAt}))});const o=t.filter(r=>r.type==="test_direct_firebase"||r.type==="category_added"||r.type==="new_recorrente");console.log("🧪 [DebugDetailed] Notificações de teste encontradas:",o.length),o.forEach(r=>{console.log("📋 [DebugDetailed] Notificação de teste:",{id:r.id,type:r.type,read:r.read,createdAt:r.createdAt})}),o.length===0&&(console.warn("⚠️ [DebugDetailed] NENHUMA notificação de teste chegou ao estado local!"),console.log("🔍 [DebugDetailed] Possíveis causas:"),console.log("  - Listener de notificações não está funcionando"),console.log("  - Firebase não está salvando as notificações"),console.log("  - Problema de sincronização"),console.log("  - Erro nas funções de notificação"))},5e3),console.log("📡 [DebugDetailed] === TESTE DO EVENTBUS ==="),window.eventBus){console.log("✅ [DebugDetailed] EventBus encontrado");let t=!1;const o=r=>{console.log("✅ [DebugDetailed] Evento de teste recebido:",r),t=!0};window.eventBus.on("test-detailed-notification",o),window.eventBus.emit("test-detailed-notification",{message:"Teste detalhado",timestamp:Date.now()}),setTimeout(()=>{t?console.log("✅ [DebugDetailed] EventBus está funcionando"):console.warn("⚠️ [DebugDetailed] EventBus pode não estar funcionando"),window.eventBus.off("test-detailed-notification",o)},1e3)}else console.error("❌ [DebugDetailed] EventBus não encontrado");console.log("✅ [DebugDetailed] Teste detalhado finalizado!")}catch(n){console.error("❌ [DebugDetailed] Erro durante teste detalhado:",n),console.error("❌ [DebugDetailed] Stack trace:",n.stack)}}async function Vp(){console.log("🔍 [DebugCategoryDesc] Investigando problema da descrição da categoria...");try{const n=window.appState?.currentUser,e=window.appState?.currentBudget;if(!n||!e){console.error("❌ [DebugCategoryDesc] Usuário ou orçamento não encontrado");return}console.log("📁 [DebugCategoryDesc] === TESTE DE CATEGORIA COM DESCRIÇÃO ===");try{const{sendCategoryChangeNotification:o}=await R(async()=>{const{sendCategoryChangeNotification:i}=await import("./NotificationService-B-HO54SU.js");return{sendCategoryChangeNotification:i}},[]),r={id:"test-category-desc-"+Date.now(),nome:"Categoria com Descrição",descricao:"Esta é uma descrição de teste para verificar se aparece no modal",cor:"#ff6b6b",tipo:"expense",limite:1500,budgetId:e.id,userId:n.uid};console.log("📝 [DebugCategoryDesc] Dados da categoria de teste:",r),console.log("📤 [DebugCategoryDesc] Enviando notificação..."),await o(e.id,n.uid,r,"category_added"),console.log("✅ [DebugCategoryDesc] Notificação enviada")}catch(o){console.error("❌ [DebugCategoryDesc] Erro ao enviar notificação:",o)}console.log("⏰ [DebugCategoryDesc] Aguardando notificação chegar..."),setTimeout(()=>{const o=window.appState?.notifications||[],r=o.find(i=>i.type==="category_added"&&i.categoryNome==="Categoria com Descrição");r?(console.log("✅ [DebugCategoryDesc] Notificação encontrada:",r),console.log("📋 [DebugCategoryDesc] Dados da notificação:",{id:r.id,type:r.type,categoryNome:r.categoryNome,categoryDescription:r.categoryDescription,categoryDescricao:r.categoryDescricao,categoryTipo:r.categoryTipo,categoryLimite:r.categoryLimite,categoryColor:r.categoryColor}),console.log("📱 [DebugCategoryDesc] Testando modal diretamente..."),window.eventBus&&(window.eventBus.emit("notification:show-modal",r),console.log("📤 [DebugCategoryDesc] Evento de modal emitido"))):(console.warn("⚠️ [DebugCategoryDesc] Notificação não encontrada"),console.log("📊 [DebugCategoryDesc] Notificações disponíveis:",o.length),o.forEach(i=>{i.type==="category_added"&&console.log("📋 [DebugCategoryDesc] Notificação de categoria encontrada:",{id:i.id,categoryNome:i.categoryNome,categoryDescription:i.categoryDescription})}))},3e3),console.log("🔍 [DebugCategoryDesc] === VERIFICAÇÃO DE CAMPOS ==="),console.log("📊 [DebugCategoryDesc] Verificando se há inconsistência nos nomes dos campos...");const t={descricao:"Teste descricao",description:"Teste description"};console.log("📝 [DebugCategoryDesc] Campos de teste:",t),console.log("🔍 [DebugCategoryDesc] Verificando mapeamento..."),console.log("  - categoryData?.descricao:",t.descricao),console.log("  - categoryData?.description:",t.description),console.log("✅ [DebugCategoryDesc] Debug da descrição da categoria finalizado!")}catch(n){console.error("❌ [DebugCategoryDesc] Erro durante debug:",n),console.error("❌ [DebugCategoryDesc] Stack trace:",n.stack)}}async function Bp(){console.log("🔍 [DebugModalNotAppearing] Investigando por que o modal parou de aparecer...");try{console.log("📊 [DebugModalNotAppearing] === ESTADO BÁSICO ==="),console.log("App State:",{hasAppState:!!window.appState,hasCurrentUser:!!window.appState?.currentUser,hasCurrentBudget:!!window.appState?.currentBudget,currentUserId:window.appState?.currentUser?.uid,currentBudgetId:window.appState?.currentBudget?.id}),console.log("📡 [DebugModalNotAppearing] === EVENTBUS ==="),console.log("EventBus:",{exists:!!window.eventBus,hasOn:!!window.eventBus?.on,hasEmit:!!window.eventBus?.emit}),console.log("🎧 [DebugModalNotAppearing] === LISTENER GLOBAL ==="),console.log("Listener Global:",{bound:!!window.__notificationModalListenerBound,eventBusExists:!!window.eventBus}),console.log("💾 [DebugModalNotAppearing] === LOCALSTORAGE ===");const n=localStorage.getItem("notification_use_modal");console.log("notification_use_modal:",n),console.log("useModal !== false:",n!=="false"),console.log("👂 [DebugModalNotAppearing] === CONTROLLER DE NOTIFICAÇÕES ===");const e=window.__notifCtl;console.log("Controller:",{exists:!!e,hasUnsub:!!e?.unsub,currentUid:e?.uid,lastIdsCount:e?.lastIds?.size||0}),console.log("📧 [DebugModalNotAppearing] === ESTADO DAS NOTIFICAÇÕES ===");const t=window.appState?.notifications||[];if(console.log("Notificações:",{count:t.length,unreadCount:t.filter(o=>!o.read).length,recent:t.slice(-3).map(o=>({id:o.id,type:o.type,read:o.read}))}),console.log("📡 [DebugModalNotAppearing] === TESTE DO EVENTBUS ==="),window.eventBus){console.log("✅ [DebugModalNotAppearing] EventBus encontrado, testando...");let o=!1;const r=s=>{console.log("✅ [DebugModalNotAppearing] Evento de teste recebido:",s),o=!0};window.eventBus.on("test-modal-not-appearing",r),window.eventBus.emit("test-modal-not-appearing",{message:"Teste do modal não aparecendo",timestamp:Date.now()}),setTimeout(()=>{o?console.log("✅ [DebugModalNotAppearing] EventBus está funcionando"):console.warn("⚠️ [DebugModalNotAppearing] EventBus pode não estar funcionando"),window.eventBus.off("test-modal-not-appearing",r)},1e3),console.log("📱 [DebugModalNotAppearing] Testando evento de notificação...");const i={id:"test-modal-not-appearing",type:"test_notification",message:"Teste do modal não aparecendo",createdAt:new Date,read:!1,senderName:"Sistema de Teste",budgetName:"Orçamento de Teste"};window.eventBus.emit("notification:show-modal",i),console.log("📤 [DebugModalNotAppearing] Evento notification:show-modal emitido"),setTimeout(()=>{const s=document.getElementById("notification-modal");s&&s.style.display!=="none"?console.log("✅ [DebugModalNotAppearing] Modal apareceu corretamente"):(console.warn("⚠️ [DebugModalNotAppearing] Modal não apareceu"),console.log("📊 [DebugModalNotAppearing] Estado do modal:",{exists:!!s,visible:s?s.style.display!=="none":!1,hasContent:s?s.innerHTML.length>0:!1}))},2e3)}else console.error("❌ [DebugModalNotAppearing] EventBus não encontrado");console.log("🧪 [DebugModalNotAppearing] === TESTE DE CRIAÇÃO DE NOTIFICAÇÃO ===");try{const{create:o}=await R(async()=>{const{create:c}=await Promise.resolve().then(()=>ce);return{create:c}},void 0),{serverTimestamp:r}=await R(async()=>{const{serverTimestamp:c}=await Promise.resolve().then(()=>Ye);return{serverTimestamp:c}},void 0),i={type:"test_notification",budgetId:window.appState?.currentBudget?.id,budgetName:window.appState?.currentBudget?.nome||"Orçamento",senderUid:window.appState?.currentUser?.uid,senderName:window.appState?.currentUser?.displayName||"Usuário",message:"Teste do modal não aparecendo",createdAt:r(),read:!1,recipientUid:window.appState?.currentUser?.uid};console.log("📝 [DebugModalNotAppearing] Criando notificação de teste...");const s=await o(i);console.log("✅ [DebugModalNotAppearing] Notificação criada com ID:",s),setTimeout(()=>{const u=(window.appState?.notifications||[]).find(d=>d.id===s);u?console.log("✅ [DebugModalNotAppearing] Notificação encontrada no estado local:",u):console.warn("⚠️ [DebugModalNotAppearing] Notificação não encontrada no estado local")},3e3)}catch(o){console.error("❌ [DebugModalNotAppearing] Erro ao criar notificação de teste:",o)}console.log("✅ [DebugModalNotAppearing] Investigação finalizada!")}catch(n){console.error("❌ [DebugModalNotAppearing] Erro durante investigação:",n),console.error("❌ [DebugModalNotAppearing] Stack trace:",n.stack)}}async function cA(){console.log("📁 [DebugCategory] Criando notificação de categoria de teste...");try{const n=window.appState?.currentUser,e=window.appState?.currentBudget;if(!n?.uid||!e?.id){console.error("❌ [DebugCategory] Usuário ou orçamento não encontrado");return}const{create:t}=await R(async()=>{const{create:s}=await Promise.resolve().then(()=>ce);return{create:s}},void 0),{serverTimestamp:o}=await R(async()=>{const{serverTimestamp:s}=await Promise.resolve().then(()=>Ye);return{serverTimestamp:s}},void 0),r={type:"category_added",budgetId:e.id,budgetName:e.nome||"Orçamento",senderUid:n.uid,senderName:n.displayName||n.email||"Usuário",categoryId:"test-category-id",categoryNome:"Categoria de Teste",categoryTipo:"despesa",categoryLimite:500,categoryDescription:"Esta é uma categoria de teste com descrição",categoryColor:"#3b82f6",createdAt:o(),read:!1,recipientUid:n.uid};console.log("📝 [DebugCategory] Dados da notificação:",r);const i=await t(r);console.log("✅ [DebugCategory] Notificação de categoria criada com ID:",i),setTimeout(()=>{const c=(window.appState?.notifications||[]).find(u=>u.id===i);c?(console.log("✅ [DebugCategory] Notificação encontrada no estado local:",c),console.log("📝 [DebugCategory] Descrição da categoria:",c.categoryDescription)):console.warn("⚠️ [DebugCategory] Notificação não encontrada no estado local ainda")},2e3)}catch(n){console.error("❌ [DebugCategory] Erro ao criar notificação de categoria:",n)}}async function lA(){console.log("🔄 [DebugIntegration] Testando integração completa de recorrentes...");try{const n=window.appState?.currentUser,e=window.appState?.currentBudget;if(!n?.uid||!e?.id){console.error("❌ [DebugIntegration] Usuário ou orçamento não encontrado");return}const{addRecorrente:t,updateRecorrente:o,deleteRecorrente:r}=await R(async()=>{const{addRecorrente:u,updateRecorrente:d,deleteRecorrente:f}=await Promise.resolve().then(()=>Ep);return{addRecorrente:u,updateRecorrente:d,deleteRecorrente:f}},void 0);console.log("📝 [DebugIntegration] Criando despesa recorrente de teste...");const i={nome:"Teste de Integração",valor:200,frequencia:"Mensal",categoria:"Teste",descricao:"Despesa recorrente para testar integração de notificações",parcelasTotal:12,parcelasRestantes:12,efetivarMesAtual:!1},s=await t(n.uid,e.id,i);console.log("✅ [DebugIntegration] Despesa recorrente criada com ID:",s),await new Promise(u=>setTimeout(u,2e3)),console.log("📝 [DebugIntegration] Atualizando despesa recorrente...");const c={...i,valor:250,nome:"Teste de Integração Atualizado",budgetId:e.id};await o(n.uid,s,c),console.log("✅ [DebugIntegration] Despesa recorrente atualizada"),await new Promise(u=>setTimeout(u,2e3)),console.log("📝 [DebugIntegration] Excluindo despesa recorrente..."),await r(n.uid,s),console.log("✅ [DebugIntegration] Despesa recorrente excluída"),console.log("🎉 [DebugIntegration] Teste de integração completo! Verifique se as notificações apareceram no modal.")}catch(n){console.error("❌ [DebugIntegration] Erro durante teste de integração:",n)}}window.debugNotificationSystem=QS;window.debugSharedNotificationTest=YS;window.debugCheckOtherUserNotifications=JS;window.debugTestModal=XS;window.debugNotificationState=ZS;window.debugCreateTestNotification=eA;window.debugCreateRecorrenteNotification=tA;window.debugModalStatus=nA;window.debugTestRecorrenteIntegration=lA;window.debugTestModalDirect=oA;window.debugTestEventBus=rA;window.debugCreateCategoryNotification=cA;window.debugCheckNotificationSystem=iA;window.debugTestTransactionNotification=Ap;window.debugTestRecurringEditDelete=Dp;window.debugFullNotificationDiagnosis=Cp;window.debugTestEventBusSystem=Rp;window.debugTestRecurringNotificationComplete=Np;window.debugTestModalDirectly=Pp;window.debugCompleteSystemDiagnosis=kp;window.debugTestRecurringAndCategoryNotifications=Mp;window.debugDetailedNotificationTest=Op;window.debugCategoryDescriptionIssue=Vp;window.debugModalNotAppearing=Bp;console.log("🔧 [DebugNotifications] Funções de debug carregadas:");console.log("  - debugNotificationSystem() - Debug completo do sistema");console.log("  - debugSharedNotificationTest() - Teste de envio para compartilhados");console.log("  - debugCheckOtherUserNotifications() - Verificar notificações de outros usuários");console.log("  - debugTestModal() - Testar modal manualmente");console.log("  - debugNotificationState() - Verificar estado atual");console.log("  - debugCreateTestNotification() - Criar notificação de teste manualmente");console.log("  - debugCreateRecorrenteNotification() - Criar notificação de recorrente de teste");console.log("  - debugModalStatus() - Verificar status do modal");console.log("  - debugTestRecorrenteIntegration() - Testar integração completa de recorrentes");console.log("  - debugTestModalDirect() - Testar modal diretamente");console.log("  - debugTestEventBus() - Testar EventBus diretamente");console.log("  - debugCreateCategoryNotification() - Criar notificação de categoria de teste");console.log("  - debugCheckNotificationSystem() - Verificar se o sistema está funcionando");console.log("  - debugTestTransactionNotification() - Testar notificação de transação");console.log("  - debugTestRecurringEditDelete() - Testar notificações de edição e exclusão de recorrentes");console.log("  - debugFullNotificationDiagnosis() - Diagnóstico completo do sistema de notificações");console.log("  - debugTestEventBusSystem() - Testar sistema de EventBus e eventos");console.log("  - debugTestRecurringNotificationComplete() - Testar notificação de recorrente completa");console.log("  - debugTestModalDirectly() - Testar modal diretamente");console.log("  - debugCompleteSystemDiagnosis() - Diagnóstico completo do sistema de notificações e modal");console.log("  - debugTestRecurringAndCategoryNotifications() - Testar notificações de recorrentes e categorias");console.log("  - debugDetailedNotificationTest() - Teste detalhado de cada etapa das notificações");console.log("  - debugCategoryDescriptionIssue() - Debug específico da descrição da categoria no modal");console.log("  - debugModalNotAppearing() - Investigar por que o modal de notificação parou de aparecer");console.log("  - debugProductionModal() - Diagnóstico específico para produção");console.log("  - debugModalWhenNotificationsArrive() - Testar modal quando notificações chegam mas não aparecem");console.log("  - debugCatchUpSystem() - Testar sistema de catch-up de notificações");async function uA(){console.log("🔍 [Debug] Testando modal quando notificações chegam mas não aparecem...");try{if(console.log("1️⃣ Verificando EventBus..."),typeof window.eventBus>"u"){console.error("❌ EventBus não está disponível globalmente");return}console.log("✅ EventBus disponível:",typeof window.eventBus),console.log("2️⃣ Verificando listener notification:show-modal...");const n=window.__notificationModalListenerBound;console.log("Listener configurado:",n),console.log("3️⃣ Testando criação do modal...");const{getNotificationModal:e}=await R(async()=>{const{getNotificationModal:s}=await import("./NotificationModal-B569_tcv.js");return{getNotificationModal:s}},[]),t=e();console.log("Modal obtido:",!!t),console.log("4️⃣ Verificando modal no DOM...");const o=document.getElementById("notification-modal");console.log("Modal no DOM:",!!o),console.log("5️⃣ Verificando CSS...");const r=document.querySelector('link[href*="notification-modal.css"]');console.log("CSS carregado:",!!r),console.log("6️⃣ Testando evento diretamente...");const i={id:"test-"+Date.now(),type:"test_notification",message:"Teste de modal quando notificações chegam",createdAt:new Date,read:!1};console.log("Emitindo evento notification:show-modal..."),window.eventBus.emit("notification:show-modal",i),setTimeout(()=>{console.log("7️⃣ Verificando se modal apareceu...");const s=document.getElementById("notification-modal");if(s){const c=window.getComputedStyle(s);console.log("Modal após evento:",{display:c.display,opacity:c.opacity,visibility:c.visibility,zIndex:c.zIndex})}else console.error("❌ Modal não foi criado após evento")},1e3)}catch(n){console.error("❌ Erro no debug:",n)}}async function dA(){console.log("🔍 [Debug] Testando sistema de catch-up de notificações...");try{console.log("1️⃣ Verificando sistema de catch-up...");const{getCatchUpNotifications:n}=await R(async()=>{const{getCatchUpNotifications:c}=await Promise.resolve().then(()=>IA);return{getCatchUpNotifications:c}},void 0),e=n();console.log("Sistema de catch-up obtido:",!!e),console.log("2️⃣ Verificando usuário atual...");const t=e.getCurrentUserId();if(console.log("ID do usuário:",t),!t){console.error("❌ Usuário não autenticado");return}console.log("3️⃣ Verificando notificações não lidas...");const{getNotificationsRepo:o}=await R(async()=>{const{getNotificationsRepo:c}=await Promise.resolve().then(()=>ce);return{getNotificationsRepo:c}},void 0),i=await o().getUnreadNotifications(t);console.log("Notificações não lidas encontradas:",i.length),console.log("Detalhes:",i.map(c=>({id:c.id,type:c.type,message:c.message}))),console.log("4️⃣ Testando verificação de notificações pendentes..."),await e.checkPendingNotifications(),console.log("5️⃣ Verificando se modal de catch-up foi criado...");const s=document.querySelector(".catch-up-modal-overlay");if(console.log("Modal de catch-up no DOM:",!!s),s){const c=window.getComputedStyle(s);console.log("Modal de catch-up estilos:",{display:c.display,opacity:c.opacity,visibility:c.visibility,zIndex:c.zIndex})}console.log("✅ Teste do sistema de catch-up concluído")}catch(n){console.error("❌ Erro no teste do sistema de catch-up:",n)}}function hA(){console.log("🔧 [DebugNotifications] Testando EventBus de notificações...");try{if(typeof window<"u"&&window.eventBus){console.log("✅ [DebugNotifications] EventBus disponível:",window.eventBus);const n={id:"test-eventbus-"+Date.now(),type:"transaction",title:"Teste EventBus",message:"Esta é uma notificação de teste via EventBus.",timestamp:new Date,read:!1,data:{transactionId:"test-eventbus-transaction"}};console.log("🔧 [DebugNotifications] Emitindo evento notification:show-modal:",n),window.eventBus.emit("notification:show-modal",n),console.log("✅ [DebugNotifications] Evento emitido com sucesso")}else console.error("❌ [DebugNotifications] EventBus não disponível")}catch(n){console.error("❌ [DebugNotifications] Erro ao testar EventBus:",n)}}function fA(){console.log("🔧 [DebugNotifications] Simulando notificação real de transação...");try{if(typeof window<"u"&&window.eventBus){console.log("✅ [DebugNotifications] EventBus disponível:",window.eventBus);const n={id:"real-transaction-"+Date.now(),type:"new_transaction",budgetId:window.appState?.currentBudget?.id||"test-budget",budgetName:window.appState?.currentBudget?.nome||"Teste",recipientUid:window.appState?.currentUser?.uid||"test-user",senderUid:window.appState?.currentUser?.uid||"test-user",title:"Nova Transação",message:"Uma nova transação foi adicionada ao orçamento.",createdAt:new Date,read:!1,data:{transactionId:"real-transaction-"+Date.now(),amount:100,description:"Teste de transação real"}};console.log("🔧 [DebugNotifications] Simulando notificação real:",n),console.log("🔧 [DebugNotifications] Emitindo evento notification:show-modal..."),window.eventBus.emit("notification:show-modal",n),console.log("✅ [DebugNotifications] Evento de notificação real emitido com sucesso")}else console.error("❌ [DebugNotifications] EventBus não disponível")}catch(n){console.error("❌ [DebugNotifications] Erro ao simular notificação real:",n)}}function gA(){console.log("🔍 [DebugNotifications] Verificando status do sistema de notificações...");try{console.log("1️⃣ EventBus:",{exists:!!window.eventBus,hasOn:!!(window.eventBus&&window.eventBus.on),hasEmit:!!(window.eventBus&&window.eventBus.emit)}),console.log("2️⃣ AppState:",{exists:!!window.appState,hasCurrentUser:!!(window.appState&&window.appState.currentUser),hasCurrentBudget:!!(window.appState&&window.appState.currentBudget),hasNotifications:!!(window.appState&&window.appState.notifications),notificationsCount:window.appState?.notifications?.length||0});const n=window.__notifCtl;console.log("3️⃣ NotificationsController:",{exists:!!n,hasUnsub:!!(n&&n.unsub),uid:n?.uid,lastSeenAt:n?.lastSeenAt,lastIdsCount:n?.lastIds?.size||0}),console.log("4️⃣ LocalStorage:",{notification_use_modal:localStorage.getItem("notification_use_modal"),notification_toasts_enabled:localStorage.getItem("notification_toasts_enabled")}),"serviceWorker"in navigator&&navigator.serviceWorker.getRegistration().then(e=>{console.log("5️⃣ Service Worker:",{exists:!!e,scope:e?.scope,state:e?.active?.state})}),console.log("✅ [DebugNotifications] Verificação de status concluída")}catch(n){console.error("❌ [DebugNotifications] Erro na verificação de status:",n)}}typeof window<"u"&&(window.debugEventBusAndModal=sA,window.debugProductionModal=aA,window.debugTestModalDirectly=Pp,window.debugFullNotificationDiagnosis=Cp,window.debugCompleteSystemDiagnosis=kp,window.debugDetailedNotificationTest=Op,window.debugTestRecurringAndCategoryNotifications=Mp,window.debugTestEventBusSystem=Rp,window.debugTestRecurringNotificationComplete=Np,window.debugTestTransactionNotification=Ap,window.debugTestRecurringEditDelete=Dp,window.debugCategoryDescriptionIssue=Vp,window.debugModalNotAppearing=Bp,window.debugModalWhenNotificationsArrive=uA,window.debugCatchUpSystem=dA,window.debugTestEventBusNotifications=hA,window.debugTestRealTransactionNotification=fA,window.debugCheckNotificationSystemStatus=gA,console.log("🔧 [DebugNotifications] Funções de debug expostas globalmente"));const ct="notifications";function il(n){return{id:n.id,...n.data()}}function sl(n){const e=t=>t?.toDate?t.toDate():t?.seconds?new Date(t.seconds*1e3):t?new Date(t):new Date(0);return n.sort((t,o)=>e(o.createdAt)-e(t.createdAt))}async function Lp(n,e=50){if(!n)return[];const t=Re(me(db,ct),Ae("recipientUid","==",n));let r=(await wt(t)).docs.map(il);return r=sl(r).slice(0,e),r}async function xp(n,e,t=50){if(!n||typeof e!="function")return console.log("[NotificationsRepo] ❌ listenByRecipient - Parâmetros inválidos:",{recipientUid:n,onData:typeof e}),()=>{};console.log("[NotificationsRepo] 👂 listenByRecipient - Iniciando listener para:",n);const{db:o}=await R(async()=>{const{db:i}=await Promise.resolve().then(()=>Rn);return{db:i}},void 0),r=Re(me(o,ct),Ae("recipientUid","==",n));return Tr(r,i=>{let s=[];i.forEach(c=>s.push(il(c))),s=sl(s).slice(0,t),console.log("[NotificationsRepo] 👂 listenByRecipient - Itens recebidos:",s.length),console.log("[NotificationsRepo] 👂 listenByRecipient - Detalhes:",s.map(c=>({id:c.id,type:c.type,read:c.read}))),e(s)})}async function Up(n){console.log("[NotificationsRepo] 📝 Criando notificação:",{type:n.type,recipientUid:n.recipientUid,senderUid:n.senderUid,budgetId:n.budgetId});const{db:e}=await R(async()=>{const{db:o}=await Promise.resolve().then(()=>Rn);return{db:o}},void 0),t=await tn(me(e,ct),n);return console.log("[NotificationsRepo] ✅ Notificação criada com ID:",t.id),t.id}async function Fp(n){if(!n)return;const{db:e}=await R(async()=>{const{db:t}=await Promise.resolve().then(()=>Rn);return{db:t}},void 0);await en(fe(e,ct,n),{read:!0})}async function $p(n=[]){if(!Array.isArray(n)||n.length===0)return;const{db:e}=await R(async()=>{const{db:o}=await Promise.resolve().then(()=>Rn);return{db:o}},void 0),t=Ir(e);n.forEach(o=>{t.update(fe(e,ct,o),{read:!0})}),await t.commit()}async function al(n=[]){if(!Array.isArray(n)||n.length===0)return;const{db:e}=await R(async()=>{const{db:o}=await Promise.resolve().then(()=>Rn);return{db:o}},void 0),t=Ir(e);n.forEach(o=>{t.delete(fe(e,ct,o))}),await t.commit()}async function Gp(n){n&&await al([n])}async function zp(n,e=!0){n&&await en(fe(db,ct,n),{pinned:!!e})}async function qp(n=[],e=!0){if(!Array.isArray(n)||n.length===0)return;const t=Ir(db);n.forEach(o=>{t.update(fe(db,ct,o),{pinned:!!e})}),await t.commit()}async function jp(n,e=!0){if(!n)return;const t=e?{archivedAt:new Date().toISOString()}:{archivedAt:null};await en(fe(db,ct,n),t)}async function Hp(n=[]){if(!Array.isArray(n)||n.length===0)return;const e=Ir(db),t=new Date().toISOString();n.forEach(o=>{e.update(fe(db,ct,o),{archivedAt:t})}),await e.commit()}async function Wp(n,e=50){if(!n)return[];const{db:t}=await R(async()=>{const{db:s}=await Promise.resolve().then(()=>Rn);return{db:s}},void 0),o=Re(me(t,ct),Ae("recipientUid","==",n),Ae("read","==",!1));let i=(await wt(o)).docs.map(il);return i=sl(i).slice(0,e),i}class pA{async listByRecipient(e,t=50){return Lp(e,t)}async listenByRecipient(e,t,o=50){return xp(e,t,o)}async create(e){return Up(e)}async markAsRead(e){return Fp(e)}async markManyAsRead(e){return $p(e)}async deleteMany(e){return al(e)}async deleteOne(e){return Gp(e)}async pin(e,t=!0){return zp(e,t)}async pinMany(e,t=!0){return qp(e,t)}async archive(e,t=!0){return jp(e,t)}async archiveMany(e){return Hp(e)}async getUnreadNotifications(e,t=50){return Wp(e,t)}}let ca=null;function Ga(){return ca||(ca=new pA),ca}const ce=Object.freeze(Object.defineProperty({__proto__:null,archive:jp,archiveMany:Hp,create:Up,deleteMany:al,deleteOne:Gp,getNotificationsRepo:Ga,getUnreadNotifications:Wp,listByRecipient:Lp,listenByRecipient:xp,markAsRead:Fp,markManyAsRead:$p,pin:zp,pinMany:qp},Symbol.toStringTag,{value:"Module"}));function la(n){try{if(!n)return 0;if(typeof n.toDate=="function")return n.toDate().getTime();if(n.seconds)return n.seconds*1e3;const e=new Date(n);return Number.isFinite(e.getTime())?e.getTime():0}catch{return 0}}function Kp(){try{const n=localStorage.getItem("notif_toasts_enabled");return n===null?!0:n==="true"}catch{return!0}}async function mA(n){try{const{getByUser:e}=await R(async()=>{const{getByUser:o}=await import("./userSettingsRepo-BQvzdPF6.js");return{getByUser:o}},[]);return(await e(n))?.notificationPrefs||{}}catch{return{}}}function Qp(n,e){try{if(!Kp())return!1;const o=e?.type,r=e?.budgetId;if(!o||!r)return!0;const i=n?.byBudget?.[r];return i?(i.allow||{})[o]!==!1:!0}catch{return!0}}function nh(n){try{const e=n?.type||"",t=n?.budgetName?` (${n.budgetName})`:"";return e==="new_transaction"?`Nova transação${t}: ${n.transactionDescricao||""}`:e==="updated_transaction"?`Transação atualizada${t}: ${n.transactionDescricao||""}`:e==="deleted_transaction"?`Transação excluída${t}: ${n.transactionDescricao||""}`:e==="category_added"?`Categoria criada${t}: ${n.categoryNome||""}`:e==="category_updated"?`Categoria atualizada${t}: ${n.categoryNome||""}`:e==="category_deleted"?`Categoria excluída${t}: ${n.categoryNome||""}`:e==="test_notification"?`Teste de notificação${t}: ${n.message||""}`:`Nova atividade${t}`}catch{return"Nova atividade"}}function oh(){const n=window;return n.__notifCtl||(n.__notifCtl={unsub:null,uid:null,lastSeenAt:0,lastIds:new Set}),n.__notifCtl}async function cl(n){console.log("[NotificationsController] 🚀 startNotificationsFor chamado para userId:",n),console.log("[NotificationsController] 🔧 DEBUG: Estado atual:",oh());const e=oh();if(!n)return console.log("[NotificationsController] ❌ userId inválido, retornando"),()=>{};if(e.unsub&&e.uid===n)return console.log("[NotificationsController] ✅ Listener já ativo para este usuário"),e.unsub;if(e.unsub){console.log("[NotificationsController] 🔄 Parando listener anterior");try{e.unsub()}catch{}}console.log("[NotificationsController] 📡 Importando listenByRecipient...");const{listenByRecipient:t}=await R(async()=>{const{listenByRecipient:r}=await Promise.resolve().then(()=>ce);return{listenByRecipient:r}},void 0);e.uid=n,e.lastIds=new Set(Array.isArray(window.appState?.notifications)?window.appState.notifications.map(r=>r.id):[]),e.lastSeenAt=Math.max(0,...Array.isArray(window.appState?.notifications)?window.appState.notifications.map(r=>la(r.createdAt)):[0]),console.log("[NotificationsController] ⚙️ Obtendo preferências do usuário...");const o=await mA(n);return console.log("[NotificationsController] 👂 Iniciando listener listenByRecipient..."),e.unsub=t(n,r=>{console.log("[NotificationsController] 📡 Dados recebidos do listener:",r.length,"itens"),console.log("[NotificationsController] 📡 Detalhes das notificações:",r.map(s=>({id:s.id,type:s.type,read:s.read,recipientUid:s.recipientUid}))),console.log("[NotificationsController] 🔧 DEBUG: Items completos:",r),window.appState=window.appState||{},window.appState.notifications=r;const i=r.filter(s=>!s.read&&!s.archivedAt).length;console.log(`[NotificationsController] 📊 ${r.length} notificações carregadas, ${i} não lidas`);try{A.emit("notifications:updated",r)}catch{}if(Kp())try{for(const s of r){const c=la(s.createdAt);if(!e.lastIds.has(s.id)&&c>=e.lastSeenAt){if(!Qp(o,s))continue;if(localStorage.getItem("notification_use_modal")!=="false")try{console.log("[NotificationsController] 🔧 DEBUG: Emitindo evento notification:show-modal para:",s.type,s),console.log("[NotificationsController] 🔧 DEBUG: EventBus disponível:",!!A),console.log("[NotificationsController] 🔧 DEBUG: EventBus.emit disponível:",typeof A.emit),A.emit("notification:show-modal",s),console.log("[NotificationsController] 📱 Modal de notificação disparado para:",s.type)}catch(d){console.warn("[NotificationsController] ⚠️ Erro ao emitir evento de modal:",d),console.error("[NotificationsController] ❌ Stack trace:",d.stack);const f=nh(s);A.emit("snackbar:show",{message:f,type:"info",duration:3500,action:{label:"Ver",onClick:()=>{try{window.location.hash="#/notifications"}catch{}}}})}else{const d=nh(s);try{A.emit("snackbar:show",{message:d,type:"info",duration:3500,action:{label:"Ver",onClick:()=>{try{window.location.hash="#/notifications"}catch{}}}})}catch{try{window.Snackbar?.({message:d,type:"info",duration:3500})}catch{}}}}}}catch{}e.lastIds=new Set(r.map(s=>s.id)),e.lastSeenAt=Math.max(0,...r.map(s=>la(s.createdAt)))},100),console.log("[NotificationsController] ✅ Listener de notificações configurado com sucesso"),e.unsub}async function wA(){const e=(Array.isArray(window.appState?.notifications)?window.appState.notifications:[]).filter(o=>!o.read).map(o=>o.id);if(!e.length)return;const{markManyAsRead:t}=await R(async()=>{const{markManyAsRead:o}=await Promise.resolve().then(()=>ce);return{markManyAsRead:o}},void 0);await t(e)}async function yA(){const e=(Array.isArray(window.appState?.notifications)?window.appState.notifications:[]).filter(o=>o.read).map(o=>o.id);if(!e.length)return;const{deleteMany:t}=await R(async()=>{const{deleteMany:o}=await Promise.resolve().then(()=>ce);return{deleteMany:o}},void 0);await t(e)}async function _A(n){if(!n)return;const{markAsRead:e}=await R(async()=>{const{markAsRead:t}=await Promise.resolve().then(()=>ce);return{markAsRead:t}},void 0);await e(n)}async function vA(n,e=!0){if(!n)return;const{pin:t}=await R(async()=>{const{pin:o}=await Promise.resolve().then(()=>ce);return{pin:o}},void 0);await t(n,e);try{A.emit("snackbar:show",{message:e?"Notificação fixada":"Notificação desfixada",type:"success",duration:1800})}catch{}}async function EA(n,e=!0){if(!n)return;const{archive:t}=await R(async()=>{const{archive:o}=await Promise.resolve().then(()=>ce);return{archive:o}},void 0);await t(n,e);try{A.emit("snackbar:show",{message:e?"Notificação arquivada":"Notificação restaurada",type:"info",duration:1800})}catch{}}async function bA(){const e=(Array.isArray(window.appState?.notifications)?window.appState.notifications:[]).filter(o=>o.read&&!o.archivedAt).map(o=>o.id);if(!e.length)return;const{archiveMany:t}=await R(async()=>{const{archiveMany:o}=await Promise.resolve().then(()=>ce);return{archiveMany:o}},void 0);await t(e);try{A.emit("snackbar:show",{message:"Notificações lidas arquivadas",type:"info",duration:2e3})}catch{}}const ll=Object.freeze(Object.defineProperty({__proto__:null,__isToastAllowedForTest:Qp,archiveAllRead:bA,archiveOne:EA,deleteAllRead:yA,markAllAsRead:wA,markOneAsRead:_A,pinOne:vA,startNotificationsFor:cl},Symbol.toStringTag,{value:"Module"}));class TA{constructor(){this.isChecking=!1,this.lastCheckTime=null,this.pendingNotifications=[],this.catchUpModal=null}async init(){console.log("[CatchUpNotifications] 🚀 Inicializando sistema de catch-up..."),console.log("[CatchUpNotifications] ⚠️ Sistema de catch-up temporariamente desabilitado")}isNotificationModalActive(){const e=document.getElementById("notification-modal");if(!e)return console.log("[CatchUpNotifications] 🔍 Modal de notificação não existe"),!1;const t=window.getComputedStyle(e),o=e.classList.contains("notification-modal-show"),r=t.display!=="none"&&t.opacity!=="0"&&t.visibility!=="hidden"&&t.zIndex!=="auto"&&o;return console.log("[CatchUpNotifications] 🔍 Verificando modal de notificação:",{exists:!!e,display:t.display,opacity:t.opacity,visibility:t.visibility,zIndex:t.zIndex,hasShowClass:o,isVisible:r,classList:Array.from(e.classList),innerHTML:e.innerHTML.substring(0,100)+"..."}),r}async checkPendingNotifications(){if(this.isChecking){console.log("[CatchUpNotifications] ⏳ Verificação já em andamento, pulando...");return}if(this.isNotificationModalActive()){console.log("[CatchUpNotifications] ⏳ Modal de notificação já ativo, pulando catch-up...");return}if(await new Promise(e=>setTimeout(e,2e3)),this.isNotificationModalActive()){console.log("[CatchUpNotifications] ⏳ Modal de notificação ativo após delay, pulando catch-up...");return}this.isChecking=!0,console.log("[CatchUpNotifications] 🔍 Verificando notificações pendentes...");try{const e=this.getCurrentUserId();if(!e){console.log("[CatchUpNotifications] ❌ Usuário não autenticado");return}const o=await Ga().getUnreadNotifications(e);console.log("[CatchUpNotifications] 📊 Notificações não lidas encontradas:",o.length),o.length>0?(this.pendingNotifications=o,console.log("[CatchUpNotifications] 📋 Notificações pendentes:",o.map(r=>({id:r.id,type:r.type,message:r.message}))),await this.showCatchUpModal()):(this.pendingNotifications=[],console.log("[CatchUpNotifications] ✅ Nenhuma notificação pendente - array limpo"))}catch(e){console.error("[CatchUpNotifications] ❌ Erro ao verificar notificações:",e)}finally{this.isChecking=!1,this.lastCheckTime=new Date}}async showCatchUpModal(){if(!this.pendingNotifications||this.pendingNotifications.length===0){console.log("[CatchUpNotifications] ❌ Nenhuma notificação pendente, não mostrando modal");return}this.catchUpModal&&(console.log("[CatchUpNotifications] 🔄 Modal de catch-up já existe, removendo..."),this.catchUpModal.remove()),console.log("[CatchUpNotifications] 📱 Mostrando modal de catch-up com",this.pendingNotifications.length,"notificações...");const e=this.createCatchUpModal();document.body.appendChild(e),this.catchUpModal=e,setTimeout(()=>{e.classList.add("catch-up-modal-show")},100),setTimeout(()=>{this.closeCatchUpModal()},3e4)}createCatchUpModal(){const e=document.body.classList.contains("dark")||document.documentElement.classList.contains("dark")||window.matchMedia("(prefers-color-scheme: dark)").matches,t=e?"#1f2937":"white",o=e?"#f9fafb":"#111827",r=e?"#374151":"#e5e7eb",i=e?"#3b82f6":"#2563eb",s=document.createElement("div");return s.className="catch-up-modal-overlay",s.innerHTML=`
      <div class="catch-up-modal-container" style="
        background: ${t};
        color: ${o};
        border: 1px solid ${r};
        border-radius: 16px;
        box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.3);
        max-width: 500px;
        width: 90%;
        max-height: 80vh;
        overflow: hidden;
        transform: scale(0.9) translateY(20px);
        opacity: 0;
        transition: all 0.3s ease;
      ">
        <div class="catch-up-modal-header" style="
          padding: 20px 24px 16px;
          border-bottom: 1px solid ${r};
          display: flex;
          align-items: center;
          justify-content: space-between;
        ">
          <div style="display: flex; align-items: center; gap: 12px;">
            <div style="
              width: 40px;
              height: 40px;
              background: ${i};
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              color: white;
              font-size: 18px;
              font-weight: bold;
            ">
              ${this.pendingNotifications.length}
            </div>
            <div>
              <h3 style="
                margin: 0;
                font-size: 18px;
                font-weight: 600;
                color: ${o};
              ">
                Notificações Pendentes
              </h3>
              <p style="
                margin: 4px 0 0;
                font-size: 14px;
                color: ${e?"#9ca3af":"#6b7280"};
              ">
                Você tem ${this.pendingNotifications.length} notificação${this.pendingNotifications.length>1?"ões":""} não lida${this.pendingNotifications.length>1?"s":""}
              </p>
            </div>
          </div>
          <button id="catch-up-modal-close" style="
            background: none;
            border: none;
            color: ${e?"#9ca3af":"#6b7280"};
            font-size: 24px;
            cursor: pointer;
            padding: 4px;
            border-radius: 4px;
            transition: all 0.2s ease;
          " title="Fechar">
            ×
          </button>
        </div>

        <div class="catch-up-modal-content" style="
          padding: 16px 24px;
          max-height: 400px;
          overflow-y: auto;
        ">
          ${this.pendingNotifications.map(c=>`
            <div class="catch-up-notification-item" style="
              padding: 16px;
              background: ${e?"#374151":"#f9fafb"};
              border-radius: 12px;
              margin-bottom: 12px;
              border: 1px solid ${e?"#4b5563":"#e5e7eb"};
              transition: all 0.2s ease;
            ">
              <div style="display: flex; align-items: flex-start; gap: 12px;">
                <div style="
                  width: 32px;
                  height: 32px;
                  background: ${this.getNotificationColor(c.type)};
                  border-radius: 50%;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  color: white;
                  font-size: 14px;
                  font-weight: bold;
                  flex-shrink: 0;
                ">
                  ${this.getNotificationIcon(c.type)}
                </div>
                <div style="flex: 1; min-width: 0;">
                  <h4 style="
                    margin: 0 0 4px;
                    font-size: 14px;
                    font-weight: 600;
                    color: ${o};
                  ">
                    ${this.getNotificationTitle(c.type)}
                  </h4>
                  <p style="
                    margin: 0 0 8px;
                    font-size: 13px;
                    color: ${e?"#d1d5db":"#374151"};
                    line-height: 1.4;
                  ">
                    ${c.message||this.getDefaultMessage(c.type)}
                  </p>
                  <div style="
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    font-size: 12px;
                    color: ${e?"#9ca3af":"#6b7280"};
                  ">
                    <span>${this.formatDate(c.createdAt)}</span>
                    <span>${c.budgetName||"Orçamento"}</span>
                  </div>
                </div>
              </div>
            </div>
          `).join("")}
        </div>

        <div class="catch-up-modal-footer" style="
          padding: 16px 24px 20px;
          border-top: 1px solid ${r};
          display: flex;
          gap: 12px;
          justify-content: flex-end;
        ">
          <button id="catch-up-modal-mark-all-read" style="
            background: ${i};
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 8px;
            font-size: 14px;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.2s ease;
          ">
            Marcar Todas como Lidas
          </button>
          <button id="catch-up-modal-view-all" style="
            background: ${e?"#374151":"#f3f4f6"};
            color: ${o};
            border: 1px solid ${r};
            padding: 10px 20px;
            border-radius: 8px;
            font-size: 14px;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.2s ease;
          ">
            Ver Todas
          </button>
        </div>
      </div>
    `,this.addCatchUpModalStyles(),this.bindCatchUpModalEvents(s),s}addCatchUpModalStyles(){if(document.getElementById("catch-up-modal-styles"))return;const e=document.createElement("style");e.id="catch-up-modal-styles",e.textContent=`
      .catch-up-modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.6);
        backdrop-filter: blur(4px);
        z-index: 9999;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 20px;
        opacity: 0;
        visibility: hidden;
        transition: opacity 0.3s ease, visibility 0.3s ease;
      }

      .catch-up-modal-overlay.catch-up-modal-show {
        opacity: 1;
        visibility: visible;
      }

      .catch-up-modal-overlay.catch-up-modal-show .catch-up-modal-container {
        transform: scale(1) translateY(0);
        opacity: 1;
      }

      .catch-up-notification-item:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      }

      #catch-up-modal-close:hover {
        background: rgba(0, 0, 0, 0.1);
        color: #ef4444;
      }

      #catch-up-modal-mark-all-read:hover {
        background: #1d4ed8;
        transform: translateY(-1px);
      }

      #catch-up-modal-view-all:hover {
        background: #e5e7eb;
        transform: translateY(-1px);
      }

      .catch-up-modal-content::-webkit-scrollbar {
        width: 6px;
      }

      .catch-up-modal-content::-webkit-scrollbar-track {
        background: transparent;
      }

      .catch-up-modal-content::-webkit-scrollbar-thumb {
        background: rgba(0, 0, 0, 0.2);
        border-radius: 3px;
      }

      .catch-up-modal-content::-webkit-scrollbar-thumb:hover {
        background: rgba(0, 0, 0, 0.3);
      }
    `,document.head.appendChild(e)}bindCatchUpModalEvents(e){const t=e.querySelector("#catch-up-modal-close"),o=e.querySelector("#catch-up-modal-mark-all-read"),r=e.querySelector("#catch-up-modal-view-all"),i=e;t&&t.addEventListener("click",()=>this.closeCatchUpModal()),i&&i.addEventListener("click",s=>{s.target===i&&this.closeCatchUpModal()}),o&&o.addEventListener("click",()=>this.markAllAsRead()),r&&r.addEventListener("click",()=>this.viewAllNotifications()),document.addEventListener("keydown",s=>{s.key==="Escape"&&this.catchUpModal&&this.closeCatchUpModal()})}closeCatchUpModal(){this.catchUpModal&&(console.log("[CatchUpNotifications] 🔒 Fechando modal de catch-up..."),this.catchUpModal.classList.remove("catch-up-modal-show"),setTimeout(()=>{this.catchUpModal&&(this.catchUpModal.remove(),this.catchUpModal=null)},300))}async markAllAsRead(){console.log("[CatchUpNotifications] ✅ Marcando todas as notificações como lidas...");try{const e=Ga(),t=this.getCurrentUserId();for(const o of this.pendingNotifications)await e.markAsRead(o.id);console.log("[CatchUpNotifications] ✅ Todas as notificações marcadas como lidas"),this.closeCatchUpModal(),window.Snackbar&&window.Snackbar.show("Todas as notificações foram marcadas como lidas","success")}catch(e){console.error("[CatchUpNotifications] ❌ Erro ao marcar notificações como lidas:",e)}}viewAllNotifications(){console.log("[CatchUpNotifications] 📬 Navegando para página de notificações..."),this.closeCatchUpModal(),window.location.hash="#/notifications"}setupRouteListener(){window.addEventListener("hashchange",()=>{setTimeout(()=>{this.checkPendingNotifications()},5e3)})}getCurrentUserId(){return window.appState?.user?.uid?window.appState.user.uid:window.currentUser?.uid?window.currentUser.uid:window.firebase?.auth?.currentUser?.uid?window.firebase.auth.currentUser.uid:null}getNotificationColor(e){return{transaction_created:"#10b981",transaction_updated:"#f59e0b",transaction_deleted:"#ef4444",category_created:"#8b5cf6",category_updated:"#f59e0b",category_deleted:"#ef4444",recurring_created:"#06b6d4",recurring_updated:"#f59e0b",recurring_deleted:"#ef4444",budget_shared:"#3b82f6",budget_unshared:"#6b7280",test_notification:"#8b5cf6"}[e]||"#6b7280"}getNotificationIcon(e){return{transaction_created:"💰",transaction_updated:"✏️",transaction_deleted:"🗑️",category_created:"📁",category_updated:"✏️",category_deleted:"🗑️",recurring_created:"🔄",recurring_updated:"✏️",recurring_deleted:"🗑️",budget_shared:"👥",budget_unshared:"👤",test_notification:"🧪"}[e]||"📢"}getNotificationTitle(e){return{transaction_created:"Nova Transação",transaction_updated:"Transação Atualizada",transaction_deleted:"Transação Excluída",category_created:"Nova Categoria",category_updated:"Categoria Atualizada",category_deleted:"Categoria Excluída",recurring_created:"Nova Recorrente",recurring_updated:"Recorrente Atualizada",recurring_deleted:"Recorrente Excluída",budget_shared:"Orçamento Compartilhado",budget_unshared:"Orçamento Descompartilhado",test_notification:"Notificação de Teste"}[e]||"Notificação"}getDefaultMessage(e){return{transaction_created:"Uma nova transação foi criada",transaction_updated:"Uma transação foi atualizada",transaction_deleted:"Uma transação foi excluída",category_created:"Uma nova categoria foi criada",category_updated:"Uma categoria foi atualizada",category_deleted:"Uma categoria foi excluída",recurring_created:"Uma nova transação recorrente foi criada",recurring_updated:"Uma transação recorrente foi atualizada",recurring_deleted:"Uma transação recorrente foi excluída",budget_shared:"Um orçamento foi compartilhado com você",budget_unshared:"Um orçamento foi descompartilhado",test_notification:"Esta é uma notificação de teste"}[e]||"Nova notificação disponível"}formatDate(e){if(!e)return"Agora";const t=new Date,o=new Date(e),r=Math.floor((t-o)/(1e3*60));return r<1?"Agora":r<60?`${r}min atrás`:r<1440?`${Math.floor(r/60)}h atrás`:`${Math.floor(r/1440)}d atrás`}}let ua=null;function ul(){return ua||(ua=new TA),ua}async function ys(){const n=ul();return await n.init(),n}typeof window<"u"&&(window.getCatchUpNotifications=ul,window.initCatchUpNotifications=ys);const IA=Object.freeze(Object.defineProperty({__proto__:null,getCatchUpNotifications:ul,initCatchUpNotifications:ys},Symbol.toStringTag,{value:"Module"})),za="app_cache_version",ti="v4.36.0";async function Yp(){try{const n=localStorage.getItem(za);n!==ti?(console.log(`🔄 [CacheManager] Nova versão detectada: ${ti} (anterior: ${n})`),await Jp(),Xp(),localStorage.setItem(za,ti),console.log("✅ [CacheManager] Cache limpo e versão atualizada"),n&&(console.log("🔄 [CacheManager] Recarregando página para aplicar nova versão..."),setTimeout(()=>{window.location.reload()},1e3))):console.log(`✅ [CacheManager] Versão atual já está em uso: ${ti}`)}catch(n){console.error("❌ [CacheManager] Erro ao verificar/limpar cache:",n)}}async function Jp(){try{if("caches"in window){const n=await caches.keys();console.log(`🧹 [CacheManager] Limpando ${n.length} caches:`,n),await Promise.all(n.map(e=>(console.log(`🗑️ [CacheManager] Removendo cache: ${e}`),caches.delete(e)))),console.log("✅ [CacheManager] Todos os caches foram limpos")}}catch(n){console.error("❌ [CacheManager] Erro ao limpar caches:",n)}}function Xp(){try{const n=[],e=["notification_use_modal","notification_toasts_enabled","sw_version","app_state","user_preferences"];for(let t=0;t<localStorage.length;t++){const o=localStorage.key(t);o&&e.some(r=>o.includes(r))&&n.push(o)}n.forEach(t=>{console.log(`🗑️ [CacheManager] Removendo chave do localStorage: ${t}`),localStorage.removeItem(t)}),console.log(`✅ [CacheManager] ${n.length} chaves antigas removidas do localStorage`)}catch(n){console.error("❌ [CacheManager] Erro ao limpar localStorage:",n)}}async function SA(){try{console.log("🧹 [CacheManager] Forçando limpeza completa do cache..."),await Jp(),Xp(),localStorage.removeItem(za),console.log("✅ [CacheManager] Limpeza forçada concluída"),window.location.reload()}catch(n){console.error("❌ [CacheManager] Erro na limpeza forçada:",n)}}async function AA(){try{if("serviceWorker"in navigator){const n=await navigator.serviceWorker.getRegistration();return n?(console.log("✅ [CacheManager] Service Worker ativo:",n.scope),n.waiting&&(console.log("🔄 [CacheManager] Nova versão do Service Worker aguardando ativação"),n.waiting.postMessage({type:"SKIP_WAITING"})),!0):(console.warn("⚠️ [CacheManager] Service Worker não encontrado"),!1)}else return console.warn("⚠️ [CacheManager] Service Worker não suportado neste navegador"),!1}catch(n){return console.error("❌ [CacheManager] Erro ao verificar Service Worker:",n),!1}}typeof window<"u"&&(window.clearCache=SA,window.checkCache=Yp,window.checkSW=AA);const rh={debug:10,info:20,warn:30,error:40};let DA="info";function ni(n){return rh[n]>=rh[DA]}function oi(n,e,t){return[`[${new Date().toISOString()}] [${n.toUpperCase()}]`,e,...t]}const B={debug(n,...e){ni("debug")&&console.debug(...oi("debug",n,e))},info(n,...e){ni("info")&&console.info(...oi("info",n,e))},warn(n,...e){ni("warn")&&console.warn(...oi("warn",n,e))},error(n,...e){ni("error")&&console.error(...oi("error",n,e))}};function CA(n){try{const t={"/":"Dashboard","/dashboard":"Dashboard","/transactions":"Transações","/categories":"Categorias","/analytics":"Análises","/recorrentes":"Recorrentes","/notifications":"Notificações","/settings":"Configurações"}[n]||"Dashboard";document.title=`Financeiro • ${t}`;const o=document.querySelector(".tab-title-highlight");if(o&&!o.textContent.includes(t)){const r=o.textContent.split(" ")[0];o.textContent=`${r} ${t}`}}catch{}}function Zp(){const n=localStorage.getItem("compactMode")==="true",e=localStorage.getItem("microMode")==="true",t=localStorage.getItem("nanoMode")==="true",o=document.querySelector(".app-container"),r=document.body;r.classList.remove("compact-mode","micro-mode","nano-mode"),o&&o.classList.remove("compact-mode","micro-mode","nano-mode"),t?(r.classList.add("compact-mode","micro-mode","nano-mode"),o&&o.classList.add("compact-mode","micro-mode","nano-mode")):e?(r.classList.add("compact-mode","micro-mode"),o&&o.classList.add("compact-mode","micro-mode")):n&&(r.classList.add("compact-mode"),o&&o.classList.add("compact-mode"))}function RA(n,e="info",t=3e3){A.emit("notification:show",{message:n,type:e,duration:t})}function NA(n,e={}){A.emit("modal:show",{content:n,options:e})}function PA(){A.emit("modal:hide")}function ge(n,e="info"){A.emit("snackbar:show",{message:n,type:e})}function kA(n){return new Intl.NumberFormat("pt-BR",{style:"currency",currency:"BRL"}).format(n||0)}function MA(n){return n?new Date(n).toLocaleDateString("pt-BR"):""}function OA(n){return n?new Date(n).toLocaleString("pt-BR"):""}function VA(n){return/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(n)}function BA(n){return!isNaN(n)&&parseFloat(n)>0}function LA(n,e=null){try{const t=localStorage.getItem(n);return t?JSON.parse(t):e}catch{return e}}function xA(n,e){try{localStorage.setItem(n,JSON.stringify(e))}catch(t){console.error("Erro ao salvar no localStorage:",t)}}function UA(n,e){let t;return function(...r){const i=()=>{clearTimeout(t),n(...r)};clearTimeout(t),t=setTimeout(i,e)}}function FA(n,e){let t;return function(){const o=arguments,r=this;t||(n.apply(r,o),t=!0,setTimeout(()=>t=!1,e))}}function em(n){window.location.hash!==`#${n}`&&(window.location.hash=n)}function $A(n=!0){try{const e=[];try{const t=document.getElementById("app-content");t&&e.push(t);const o=document.querySelector(".tab-content");o&&e.push(o);const r=document.querySelector(".content-spacing");r&&e.push(r)}catch{}for(const t of e)try{typeof t.scrollTo=="function"&&t.scrollTo({top:0,left:0,behavior:"auto"}),t.scrollTop=0,t.scrollLeft=0}catch{}if(n&&typeof document<"u"){try{document.documentElement.scrollTop=0}catch{}try{document.body.scrollTop=0}catch{}}if(n&&typeof window<"u"&&typeof window.scrollTo=="function")try{window.scrollTo({top:0,left:0,behavior:"auto"})}catch{}}catch{}}const so={user:null,currentBudget:null,transactions:[],categories:[],recorrentes:[],selectedYear:new Date().getFullYear(),selectedMonth:new Date().getMonth()+1,setUser(n){this.user=n,A.emit("user:changed",n)},setCurrentBudget(n){this.currentBudget=n,A.emit("budget:changed",n)},setTransactions(n){this.transactions=n,A.emit("transactions:changed",n)},setCategories(n){this.categories=n,A.emit("categories:changed",n)},setRecorrentes(n){this.recorrentes=n,A.emit("recorrentes:changed",n)},setSelectedPeriod(n,e){this.selectedYear=n,this.selectedMonth=e,A.emit("period:changed",{year:n,month:e})}};function tm(){try{if(typeof window<"u"&&window.appState&&window.appState.selectedYear&&window.appState.selectedMonth)return{year:window.appState.selectedYear,month:window.appState.selectedMonth}}catch{}try{const n=typeof localStorage<"u"?localStorage.getItem("selectedYM"):null;if(n){const e=String(n).match(/^(\d{4})-(\d{2})$/);if(e){const t=parseInt(e[1],10),o=parseInt(e[2],10);if(t>1900&&o>=1&&o<=12)return{year:t,month:o}}}}catch{}return{year:so.selectedYear,month:so.selectedMonth}}function nm(n,e){try{if(typeof window<"u"){window.appState=window.appState||so,window.appState.selectedYear=n,window.appState.selectedMonth=e;try{localStorage.setItem("selectedYM",`${n}-${String(e).padStart(2,"0")}`)}catch{}try{const t=window.location.hash||"",o=t.split("?")[0]||"#/dashboard",r=`${n}-${String(e).padStart(2,"0")}`,i=/[?&]ym=\d{4}-\d{2}/.test(t),s=i?(t.match(/ym=(\d{4}-\d{2})/)||[])[1]:null;if(!i||s!==r){const c=`${o}?ym=${r}`;if(typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.includes("jsdom"))window.location.hash=c;else{const d=new URL(window.location.href);d.hash=c,window.history&&window.history.replaceState?window.history.replaceState(null,"",d.toString()):window.location.hash=c}}}catch{}}}catch{}so.setSelectedPeriod(n,e)}function GA(){try{const e=(typeof window<"u"&&window.location.hash||"").match(/ym=(\d{4})-(\d{2})/);if(e){const t=parseInt(e[1],10),o=parseInt(e[2],10);if(t>1900&&o>=1&&o<=12)return{year:t,month:o}}}catch{}return null}function zA(n,e){try{const t=window.location.hash||"",o=t.split("?")[0]||"#/dashboard",r=`${n}-${String(e).padStart(2,"0")}`,i=t.match(/ym=(\d{4}-\d{2})/);if(!i||i[1]!==r){const s=`${o}?ym=${r}`;if(typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.includes("jsdom"))window.location.hash=s;else{const u=new URL(window.location.href);u.hash=s,window.history&&window.history.replaceState?window.history.replaceState(null,"",u.toString()):window.location.hash=s}}}catch{}}const jo={showAddTransactionModal:async n=>{try{if(await R(()=>import("./showAddTransactionModal-DRmf6LX2.js"),[]),typeof window.showAddTransactionModal=="function"){window.showAddTransactionModal(n||{});return}A.emit("modal:show",{type:"transaction",data:n,title:"Nova Transação"})}catch(e){console.warn("Falha ao abrir modal de transação via shim:",e),A.emit("modal:show",{type:"transaction",data:n,title:"Nova Transação"})}},showAddCategoryModal:n=>{A.emit("modal:show",{type:"category",data:n,title:"Nova Categoria"})},showAddRecorrenteModal:n=>{A.emit("modal:show",{type:"recorrente",data:n,title:"Nova Recorrente"})},closeModal:()=>{try{const n=document.getElementById("app-modal")||document.querySelector("#app-modal, .modal");if(n&&n.parentNode&&n.parentNode.removeChild(n),window.toggleFABOnModal)try{window.toggleFABOnModal()}catch{}}catch{}try{A.emit("modal:hide")}catch{}}};typeof window<"u"&&(window.getSelectedPeriod=tm,window.setSelectedPeriod=nm,window.showAddTransactionModal=jo.showAddTransactionModal,window.showAddCategoryModal=jo.showAddCategoryModal,window.showAddRecorrenteModal=jo.showAddRecorrenteModal,window.closeModal=jo.closeModal,window.appState=so);const Hn=Object.freeze(Object.defineProperty({__proto__:null,applyCompactMode:Zp,debounce:UA,ensureHashHasYm:zA,formatCurrency:kA,formatDate:MA,formatDateTime:OA,getSelectedPeriod:tm,getStorageItem:LA,globalFunctions:jo,globalState:so,hideModal:PA,isValidAmount:BA,isValidEmail:VA,navigateTo:em,parseYmFromHash:GA,scrollToTop:$A,setSelectedPeriod:nm,setStorageItem:xA,showModal:NA,showNotification:RA,showSnackbar:ge,throttle:FA,updatePageTitle:CA},Symbol.toStringTag,{value:"Module"}));function om({title:n="",content:e="",onClose:t=null}){console.log("🔧 Modal sendo criado com:",{title:n,content:e.substring(0,100)+"..."});const o=document.createElement("div");o.id="app-modal",o.className="modal fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50",o.onclick=i=>{i.target===o&&(t?t():o.remove()),window.toggleFABOnModal&&window.toggleFABOnModal()};const r=document.createElement("div");r.className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-6 max-w-md w-full relative",r.innerHTML=`
    <button class="absolute top-2 right-2 text-gray-400 hover:text-gray-700 dark:text-gray-200 text-2xl" aria-label="Fechar" id="modal-close-btn">&times;</button>
    <h2 class="text-xl font-bold mb-4">${n}</h2>
    <div class="modal-body">${e}</div>
  `,o.appendChild(r),r.querySelector("#modal-close-btn").onclick=i=>{i.stopPropagation(),t?t():o.remove(),window.toggleFABOnModal&&window.toggleFABOnModal()},window.toggleFABOnModal&&window.toggleFABOnModal(),console.log("🔧 Modal criado:",o),console.log("🔧 Modal HTML:",o.outerHTML.substring(0,200)+"...");try{typeof window<"u"&&typeof window.closeModal!="function"&&(window.closeModal=function(){try{const i=document.getElementById("app-modal")||o;i&&i.parentNode&&i.parentNode.removeChild(i)}catch{}if(window.toggleFABOnModal)try{window.toggleFABOnModal()}catch{}})}catch{}return o}const ND=Object.freeze(Object.defineProperty({__proto__:null,Modal:om},Symbol.toStringTag,{value:"Module"}));function qA(){B.info("Configurando listeners de eventos..."),A.on("notification:show",({message:n,type:e})=>{B.info(`Notificação [${e}]: ${n}`)}),A.on("modal:show",async(n={})=>{try{const{content:e,options:t={},title:o,type:r,data:i}=n,s=o||r||(e?"[conteúdo HTML]":"sem conteúdo");if(B.info("Modal solicitado:",s),e){const c=om({title:t.title||o||"Informação",content:e,onClose:()=>c.remove()});document.body.appendChild(c);return}if(r==="transaction"&&(await R(()=>import("./showAddTransactionModal-DRmf6LX2.js"),[]),typeof window.showAddTransactionModal=="function")){window.showAddTransactionModal(i||{});return}if(r==="category"&&(await R(()=>import("./showAddCategoryModal-kzQ8uzro.js"),[]),typeof window.showAddCategoryModal=="function")){window.showAddCategoryModal(i||{});return}if(r==="recorrente"&&(await R(()=>import("./showAddRecorrenteModal-CsH9p9Pu.js"),[]),typeof window.showAddRecorrenteModal=="function")){window.showAddRecorrenteModal(i||{});return}ge("Não foi possível abrir o modal solicitado","error")}catch(e){B.error("Falha ao processar modal:show",e),ge("Erro ao abrir modal","error")}}),A.on("modal:hide",()=>{B.info("Modal escondido")}),A.on("snackbar:show",({message:n,type:e})=>{B.info(`Snackbar [${e}]: ${n}`)}),A.on("transaction:added",n=>{B.info("Transação adicionada:",n.id),ge("Transação adicionada com sucesso","success")}),A.on("transaction:updated",({id:n})=>{B.info("Transação atualizada:",n),ge("Transação atualizada com sucesso","success")}),A.on("transaction:deleted",({id:n})=>{B.info("Transação removida:",n),ge("Transação removida com sucesso","success")}),A.on("budget:created",n=>{B.info("Orçamento criado:",n.id),ge("Orçamento criado com sucesso","success")}),A.on("budget:updated",({id:n})=>{B.info("Orçamento atualizado:",n),ge("Orçamento atualizado com sucesso","success")}),A.on("budget:deleted",({id:n})=>{B.info("Orçamento removido:",n),ge("Orçamento removido com sucesso","success")}),A.on("category:created",n=>{try{const e=typeof n=="string"?n:n?.id;B.info("Categoria criada:",e||"[sem id]")}catch{B.warn("Evento category:created com payload inesperado:",n)}ge("Categoria criada com sucesso","success")}),A.on("category:updated",({id:n})=>{B.info("Categoria atualizada:",n),ge("Categoria atualizada com sucesso","success")}),A.on("category:deleted",({id:n})=>{B.info("Categoria removida:",n),ge("Categoria removida com sucesso","success")}),A.on("transaction:recurring:applied",n=>{B.info("Recorrente aplicada:",n.id),ge("Despesa recorrente aplicada","info")}),A.on("error:transaction",n=>{B.error("Erro em transação:",n),ge("Erro ao processar transação","error")}),A.on("error:budget",n=>{B.error("Erro em orçamento:",n),ge("Erro ao processar orçamento","error")}),A.on("error:category",n=>{B.error("Erro em categoria:",n),ge("Erro ao processar categoria","error")}),A.on("auth:login",n=>{B.info("Usuário logado:",n.uid),ge("Login realizado com sucesso","success")}),A.on("auth:logout",()=>{B.info("Usuário deslogado"),ge("Logout realizado","info")}),A.on("auth:error",n=>{B.error("Erro de autenticação:",n),ge("Erro de autenticação","error")}),A.on("app:ready",n=>{B.info("Aplicação pronta:",n),ge("Aplicação carregada","success")}),A.on("app:error",n=>{B.error("Erro na aplicação:",n),ge("Erro ao carregar aplicação","error")}),B.info("Listeners de eventos configurados")}function jA(){B.info("Limpando listeners de eventos..."),A.off("notification:show"),A.off("modal:show"),A.off("modal:hide"),A.off("snackbar:show"),A.off("transaction:added"),A.off("transaction:updated"),A.off("transaction:deleted"),A.off("budget:created"),A.off("budget:updated"),A.off("budget:deleted"),A.off("category:created"),A.off("category:updated"),A.off("category:deleted"),A.off("transaction:recurring:applied"),A.off("error:transaction"),A.off("error:budget"),A.off("error:category"),A.off("auth:login"),A.off("auth:logout"),A.off("auth:error"),A.off("app:ready"),A.off("app:error"),B.info("Listeners de eventos limpos")}const rm=ms({user:null,loading:!0,error:null});function im(){return new Promise(n=>{const e=()=>B_(gs,o=>{rm.setState({user:o,loading:!1}),A.emit("auth:changed",o),o&&sm(o).catch(()=>{}),n(o||null),t()});let t;Wc.then(()=>{t=e()}).catch(()=>{t=e()})})}async function sm(n){try{if(!n||!n.uid)return;const{doc:e,getDoc:t,setDoc:o,updateDoc:r,serverTimestamp:i}=await R(async()=>{const{doc:f,getDoc:p,setDoc:m,updateDoc:S,serverTimestamp:C}=await Promise.resolve().then(()=>Ye);return{doc:f,getDoc:p,setDoc:m,updateDoc:S,serverTimestamp:C}},void 0),{db:s}=await R(async()=>{const{db:f}=await Promise.resolve().then(()=>Rn);return{db:f}},void 0),c=e(s,"users",n.uid),u=await t(c),d={uid:n.uid,email:n.email||null,emailLower:n.email?String(n.email).toLowerCase():null,displayName:n.displayName||null,photoURL:n.photoURL||null,providers:Array.isArray(n.providerData)?n.providerData.map(f=>f?.providerId).filter(Boolean):[],lastLoginAt:i()};u.exists()?await r(c,d):await o(c,{...d,createdAt:i()},{merge:!0})}catch(e){console.warn("ensureUserProfile: falha ao salvar perfil do usuário:",e?.message||e)}}const PD=Object.freeze(Object.defineProperty({__proto__:null,authStore:rm,ensureUserProfile:sm,waitForAuth:im},Symbol.toStringTag,{value:"Module"})),Pn="budgets";async function HA(n){if(!n)return null;const e=fe(ee,Pn,n),t=await br(e);return t.exists()?{id:t.id,...t.data()}:null}async function am(n={}){const e=me(ee,Pn),t=[];n.userId&&t.push(Ae("userId","==",n.userId));const o=t.length?Re(e,...t):e;return(await wt(o)).docs.map(i=>({id:i.id,...i.data()}))}async function cm(n){return am({userId:n})}async function dl(n){const e=me(ee,Pn),t=Re(e,Ae("usuariosPermitidos","array-contains",n));return(await wt(t)).docs.map(r=>({id:r.id,...r.data()}))}async function lm(n){const e=me(ee,Pn);return(await tn(e,n)).id}async function um(n,e){const t=fe(ee,Pn,n);return await en(t,e),!0}async function dm(n){const e=fe(ee,Pn,n);return await Eo(e),!0}function hm(n,e){const t=me(ee,Pn),o=Re(t,Ae("userId","==",n));return Tr(o,r=>{const i=c=>c?.toDate?c.toDate():c?.seconds?new Date(c.seconds*1e3):c?new Date(c):new Date(0),s=r.docs.map(c=>({id:c.id,...c.data()})).sort((c,u)=>i(u.createdAt)-i(c.createdAt));e(s)})}const _s=Object.freeze(Object.defineProperty({__proto__:null,create:lm,getById:HA,list:am,listOwn:cm,listShared:dl,listenToChanges:hm,remove:dm,update:um},Symbol.toStringTag,{value:"Module"})),Wn=ms({budgets:[],currentBudget:null,loading:!1,error:null});let ao=new Map;async function hl(n){try{Wn.setState({loading:!0,error:null});const[e,t]=await Promise.all([cm(n),dl(n)]),o=(d,f)=>(d||[]).map(p=>({...p,isOwner:typeof p.isOwner=="boolean"?p.isOwner:p.userId===n})),r=o(e,!0),i=o(t,!1),s=new Map;[...r,...i].forEach(d=>{const f=s.get(d.id);(!f||d.isOwner&&!f.isOwner)&&s.set(d.id,d)});const c=d=>d?.toDate?d.toDate():d?.seconds?new Date(d.seconds*1e3):d?new Date(d):new Date(0),u=Array.from(s.values()).sort((d,f)=>c(f.createdAt)-c(d.createdAt));return Wn.setState({budgets:u,loading:!1}),typeof window<"u"&&(window.appState=window.appState||{},window.appState.budgets=u),u}catch(e){throw Wn.setState({error:e.message,loading:!1}),e}}async function WA(n){try{return await dl(n)}catch(e){throw A.emit("error:budget",e),e}}function fm(n){if(ao.has(n))return;const e=hm(n,t=>{Wn.setState({budgets:t}),A.emit("budgets:updated",{budgets:t})});ao.set(n,e)}function KA(n){const e=ao.get(n);e&&(e(),ao.delete(n))}function co(n){Wn.setState({currentBudget:n}),A.emit("budget:changed",n);try{n?.id&&localStorage.setItem("currentBudgetId",n.id)}catch{}}async function gm(n){try{const e=await lm(n);return A.emit("budget:created",e),e}catch(e){throw A.emit("error:budget",e),e}}async function QA(n,e){try{await um(n,e),A.emit("budget:updated",{id:n,data:e})}catch(t){throw A.emit("error:budget",t),t}}async function YA(n){try{await dm(n),A.emit("budget:deleted",{id:n})}catch(e){throw A.emit("error:budget",e),e}}function pm(){ao.forEach(n=>n()),ao.clear()}async function mm(n){try{const e=await hl(n);if(e&&e.length>0){let t=e[0];try{const o=localStorage.getItem("currentBudgetId");if(o){const r=e.find(i=>i.id===o);r?(t=r,console.log("✅ Orçamento restaurado do localStorage:",t.nome)):console.log("⚠️ Orçamento salvo não encontrado, usando primeiro disponível")}}catch(o){console.warn("Erro ao restaurar orçamento do localStorage:",o)}return co(t),window.appState&&(window.appState.currentBudget=t),console.log("✅ Orçamento padrão selecionado:",t.nome),t}else{const o=await gm({nome:"Orçamento Principal",descricao:"Orçamento padrão criado automaticamente",userId:n,tipo:"pessoal",createdAt:new Date,usuariosPermitidos:[n]}),r=await fl(o);if(r)return co(r),window.appState&&(window.appState.currentBudget=r),console.log("✅ Novo orçamento padrão criado:",r.nome),r}return null}catch(e){throw console.error("❌ Erro ao selecionar orçamento padrão:",e),e}}async function fl(n){const{getById:e}=await R(async()=>{const{getById:t}=await Promise.resolve().then(()=>_s);return{getById:t}},void 0);return e(n)}function JA(n){co(n),window.appState&&(window.appState.currentBudget=n);try{n?.id&&localStorage.setItem("currentBudgetId",n.id)}catch{}return n}function XA(n){if(!n||!n.id)return console.warn("Tentativa de persistir orçamento inválido:",n),!1;try{return localStorage.setItem("currentBudgetId",n.id),window.appState&&(window.appState.currentBudget=n),A.emit("budget:changed",n),console.log("✅ Orçamento persistido:",n.nome,n.id),!0}catch(e){return console.error("❌ Erro ao persistir orçamento:",e),!1}}async function wm(n){try{const e=localStorage.getItem("currentBudgetId");if(!e)return console.log("Nenhum orçamento salvo encontrado"),null;const t=await fl(e);return t?(console.log("✅ Orçamento restaurado do localStorage:",t.nome),co(t),t):(console.warn("⚠️ Orçamento salvo não encontrado no banco de dados"),localStorage.removeItem("currentBudgetId"),null)}catch(e){return console.error("❌ Erro ao restaurar orçamento:",e),null}}const ZA=Object.freeze(Object.defineProperty({__proto__:null,budgetsStore:Wn,createBudget:gm,deleteBudget:YA,ensureBudgetPersistence:XA,getById:fl,loadSharedBudgets:WA,loadUserBudgets:hl,restoreBudgetFromStorage:wm,selectDefaultBudget:mm,setCurrentBudget:co,setCurrentBudgetGlobal:JA,startBudgetsListener:fm,stopAllListeners:pm,stopBudgetsListener:KA,updateBudget:QA},Symbol.toStringTag,{value:"Module"}));function eD({path:n="/service-worker.js",onNewVersion:e}={}){"serviceWorker"in navigator&&(window.__swUpdateState={awaitingActivation:!1},navigator.serviceWorker.register(n).then(t=>{const o=()=>{try{if(t.waiting)t.waiting.postMessage({type:"SKIP_WAITING"});else if(t.installing){const i=t.installing;i.addEventListener("statechange",()=>{i.state==="installed"&&t.waiting&&t.waiting.postMessage({type:"SKIP_WAITING"})})}else navigator.serviceWorker?.controller&&navigator.serviceWorker.controller.postMessage({type:"SKIP_WAITING"})}catch{}};function r(){const i=t.installing;i&&i.addEventListener("statechange",()=>{i.state==="installed"&&navigator.serviceWorker.controller&&(window.__swUpdateState.awaitingActivation=!0,typeof e=="function"?e({skipWaiting:o}):setTimeout(()=>o(),3e3))})}t.waiting&&(window.__swUpdateState.awaitingActivation=!0,e&&e({skipWaiting:o})),t.addEventListener("updatefound",r)}).catch(t=>console.warn("SW register failed:",t)))}function tD({onReload:n}={}){if(!navigator.serviceWorker)return;let e=!1;const t=()=>{e||(e=!0,typeof n=="function"?n():window.location.reload())};navigator.serviceWorker.addEventListener("controllerchange",()=>{t()}),setTimeout(()=>{window.__swUpdateState?.awaitingActivation&&t()},4e3)}console.log("🚀 bootstrap.js carregado e executando!");typeof window<"u"&&Yp().then(()=>{console.log("✅ [Bootstrap] Verificação de cache concluída")}).catch(n=>{console.error("❌ [Bootstrap] Erro na verificação de cache:",n)});typeof window<"u"&&(window.eventBus=A,console.log("🌐 [Bootstrap] EventBus exposto globalmente"));typeof window<"u"&&window.eventBus&&typeof window.eventBus.on=="function"&&(window.__notificationModalListenerBound||(window.__notificationModalListenerBound=!0,console.log("🎧 [Bootstrap] Configurando listener global para notification:show-modal..."),window.eventBus.on("notification:show-modal",async n=>{try{console.log("📱 [Bootstrap] Evento notification:show-modal recebido:",n.type),console.log("📱 [Bootstrap] Dados da notificação:",n),console.log("📱 [Bootstrap] 🔧 DEBUG: EventBus listener funcionando!"),console.log("📱 [Bootstrap] 🔧 DEBUG: Importando NotificationModal...");const{getNotificationModal:e}=await R(async()=>{const{getNotificationModal:o}=await import("./NotificationModal-B569_tcv.js");return{getNotificationModal:o}},[]);console.log("📱 [Bootstrap] 🔧 DEBUG: NotificationModal importado:",!!e);const t=e();console.log("📱 [Bootstrap] Modal obtido:",!!t),t?(console.log("📱 [Bootstrap] 🔧 DEBUG: Chamando modal.show()..."),t.show(n),console.log("✅ [Bootstrap] Modal exibido com sucesso")):console.error("❌ [Bootstrap] Modal não foi obtido")}catch(e){console.error("❌ [Bootstrap] Erro ao mostrar modal de notificação:",e),console.error("❌ [Bootstrap] Stack trace:",e.stack)}}),console.log("✅ [Bootstrap] Listener notification:show-modal configurado globalmente")));typeof window<"u"&&window.eventBus&&typeof window.eventBus.on=="function"&&(console.log("🟢 Registrando listener global para transactions:updated e categories:updated"),window.eventBus.on("transactions:updated",(n={})=>{if(console.log("🟢 Listener global recebeu transactions:updated",n),Array.isArray(n.transactions)&&(window.appState=window.appState||{},window.appState.transactions=n.transactions),(window.location.hash||"").split("?")[0]==="#/transactions"&&typeof window.renderTransactions=="function")try{window.renderTransactions()}catch(t){console.warn("Falha ao renderizar transações após atualização global",t)}}),window.eventBus.on("categories:updated",(n={})=>{console.log("🟢 Listener global recebeu categories:updated",n),Array.isArray(n.categories)&&(window.appState=window.appState||{},window.appState.categories=n.categories)}));const Li=typeof window<"u"&&"BroadcastChannel"in window?new window.BroadcastChannel("financeiro-sync"):null;function lo(n,e,t=!1){if(t){ih({type:n,payload:e});return}if(ih({type:n,payload:e}),Li)Li.postMessage({type:n,payload:e});else try{localStorage.setItem("financeiro-sync-event",JSON.stringify({type:n,payload:e,ts:Date.now()})),setTimeout(()=>localStorage.removeItem("financeiro-sync-event"),100)}catch{}}function ih({type:n,payload:e}){n==="transactions:updated"&&A.emit("transactions:updated",{...e,__syncRemote:!0}),n==="categories:updated"&&A.emit("categories:updated",{...e,__syncRemote:!0})}Li?Li.onmessage=n=>{n?.data&&lo(n.data.type,n.data.payload,!0)}:window.addEventListener("storage",n=>{if(n.key==="financeiro-sync-event"&&n.newValue)try{const e=JSON.parse(n.newValue);lo(e.type,e.payload,!0)}catch{}});const J={user:null,currentBudget:null,transactions:[],categories:[],recorrentes:[],loading:!1,error:null};async function nD(){try{B.info("Inicializando aplicação...");try{eD({onNewVersion:({skipWaiting:e})=>{try{const t=()=>e();typeof window.Snackbar=="function"?window.Snackbar({message:"Nova versão disponível. Toque para atualizar.",type:"info",action:{label:"Atualizar",handler:t},duration:1e4}):confirm("Nova versão disponível. Atualizar agora?")&&t()}catch{}}}),tD()}catch(e){B.warn("Falha ao iniciar fluxo de SW update:",e)}const n=await im();n||B.warn("Usuário não autenticado — seguindo com modo limitado"),J.user=n;try{typeof window<"u"&&(window.appState=window.appState||{},window.appState.currentUser=n||null)}catch{}if(n?B.info("Usuário autenticado:",n.uid):B.info("Sem usuário autenticado"),n){try{await oD(n.uid)}catch(e){B.warn("Falha ao carregar dados iniciais (possível permission-denied):",e?.message||e);try{window?.Snackbar&&window.Snackbar({message:"Sem permissão para ler dados. Verifique acesso ao orçamento.",type:"warning"})}catch{}}try{ym(n.uid)}catch(e){B.warn("Falha ao iniciar listeners (possível permission-denied):",e?.message||e)}}qA(),rD(),B.info("Aplicação inicializada com sucesso"),A.emit("app:ready",J)}catch(n){B.error("Erro ao inicializar aplicação:",n),J.error=n.message,A.emit("app:error",n)}}async function oD(n){try{const e=await hl(n);if(e.length>0){let t=e[0];try{const i=localStorage.getItem("currentBudgetId");if(i){const s=e.find(c=>c.id===i);s?(t=s,B.info("Orçamento restaurado na inicialização:",t.nome)):B.warn("Orçamento salvo não encontrado, usando primeiro disponível")}}catch(i){B.warn("Erro ao restaurar orçamento do localStorage:",i)}J.currentBudget=t;try{typeof window<"u"&&(window.appState=window.appState||{},window.appState.currentBudget=t)}catch{}co(t);const[o,r]=await Promise.all([Ar(t.id,n),Dr(t.id)]);J.transactions=o,J.categories=r;try{lo("transactions:updated",{budgetId:t.id,transactions:o})}catch{}try{lo("categories:updated",{budgetId:t.id,categories:r})}catch{}}B.info("Dados iniciais carregados")}catch(e){throw B.error("Erro ao carregar dados iniciais:",e),e}}async function ym(n){if(J.currentBudget){const e=J.currentBudget.id;try{await Wc,B.info("Firebase Auth pronto, iniciando listeners...")}catch(t){B.warn("Erro ao aguardar authReady:",t?.message||t)}try{fm(n)}catch(t){B.warn("Listener budgets falhou:",t?.message||t)}try{Zc(e,n)}catch(t){B.warn("Listener transactions falhou:",t?.message||t)}try{nl(e)}catch(t){B.warn("Listener categories falhou:",t?.message||t)}try{cl(n),B.info("Listener de notificações iniciado")}catch(t){B.warn("Listener notifications falhou:",t?.message||t)}try{await ys(),B.info("Sistema de catch-up de notificações iniciado")}catch(t){B.warn("Sistema de catch-up falhou:",t?.message||t)}B.info("Listeners em tempo real iniciados")}}async function kD(n){try{if(!n)return;J.user=n;try{typeof window<"u"&&(window.appState=window.appState||{},window.appState.currentUser=n)}catch{}if(!J.currentBudget)try{const t=await wm(n.uid);if(t){J.currentBudget=t;try{typeof window<"u"&&(window.appState=window.appState||{},window.appState.currentBudget=t)}catch{}}if(!J.currentBudget){const o=await mm(n.uid);if(o){J.currentBudget=o;try{typeof window<"u"&&(window.appState=window.appState||{},window.appState.currentBudget=o)}catch{}B.info("Orçamento padrão selecionado:",o.nome)}}}catch(t){B.warn("Falha ao selecionar orçamento pós-login:",t?.message||t)}const e=J.currentBudget?.id;if(e){try{typeof window<"u"&&(window.appState=window.appState||{},window.appState.currentBudget=J.currentBudget)}catch{}const[t,o]=await Promise.all([Ar(e,n.uid),Dr(e)]);J.transactions=t,J.categories=o;try{A.emit("transactions:updated",{budgetId:e,transactions:t})}catch{}try{A.emit("categories:updated",{budgetId:e,categories:o})}catch{}ym(n.uid)}try{cl(n.uid),B.info("Listener de notificações iniciado após login")}catch(t){B.warn("Listener notifications falhou após login:",t?.message||t)}try{await ys(),B.info("Sistema de catch-up de notificações iniciado após login")}catch(t){B.warn("Sistema de catch-up falhou após login:",t?.message||t)}try{A.emit("app:ready",J)}catch{}B.info("Realtime ativado após login")}catch(e){B.error("Erro ao ativar realtime pós-login:",e)}}function rD(){A.on("budget:changed",n=>{J.currentBudget=n;try{typeof window<"u"&&(window.appState=window.appState||{},window.appState.currentBudget=n||null)}catch{}B.info("Orçamento alterado:",n?.id);try{if(n?.id){try{el()}catch{}try{ol()}catch{}J.transactions=[],J.categories=[];try{typeof window<"u"&&(window.appState.transactions=[],window.appState.categories=[])}catch{}const e=J.user?.uid;Promise.all([Ar(n.id,e),Dr(n.id)]).then(async([t,o])=>{J.transactions=t,J.categories=o;try{A.emit("transactions:updated",{budgetId:n.id,transactions:t})}catch{}try{A.emit("categories:updated",{budgetId:n.id,categories:o})}catch{}try{Zc(n.id,e)}catch{}try{nl(n.id)}catch{}try{em("/dashboard")}catch{try{window.location.hash="#/dashboard"}catch{}}try{const{scrollToTop:r}=await R(async()=>{const{scrollToTop:i}=await Promise.resolve().then(()=>Hn);return{scrollToTop:i}},void 0);r()}catch{}try{typeof window.renderDashboard=="function"&&window.renderDashboard()}catch{}}).catch(t=>B.warn("Falha ao recarregar dados no budget:changed:",t)),iD(n.id)}}catch{}}),A.on("transactions:updated",(n={})=>{try{const e=n.budgetId??J.currentBudget?.id,t=n.transactions??J.transactions;e&&J.currentBudget?.id===e&&Array.isArray(t)&&(J.transactions=t),n.__syncRemote||lo("transactions:updated",n)}catch(e){B.warn("transactions:updated handler skipped:",e)}}),A.on("categories:updated",(n={})=>{try{const e=n.budgetId??J.currentBudget?.id,t=n.categories??J.categories;e&&J.currentBudget?.id===e&&Array.isArray(t)&&(J.categories=t),n.__syncRemote||lo("categories:updated",n)}catch(e){B.warn("categories:updated handler skipped:",e)}}),A.on("error:transaction",n=>{B.error("Erro em transação:",n)}),A.on("error:budget",n=>{B.error("Erro em orçamento:",n)}),A.on("error:category",n=>{B.error("Erro em categoria:",n)})}async function iD(n){try{const e=J?.user?.uid||J?.currentUser?.uid;if(!e||!n)return;const t=new Date,o=`${t.getFullYear()}-${String(t.getMonth()+1).padStart(2,"0")}`,r=`legacyfix:${e}:${n}:${o}`;if(localStorage.getItem(r)==="done")return;try{await(await R(()=>import("./fixers-BPwavB__.js"),[])).corrigirTudoSemBudget({silent:!0})}catch(i){console.warn("AutoFix: falha ao importar/rodar fixers:",i)}localStorage.setItem(r,"done")}catch(e){console.warn("runAutoLegacyFixForBudget erro:",e)}}function sD(){B.info("Limpando recursos da aplicação..."),pm(),el(),ol(),A.off("budget:changed"),A.off("transactions:updated"),A.off("categories:updated"),A.off("error:transaction"),A.off("error:budget"),A.off("error:category"),jA(),B.info("Recursos limpos")}typeof window<"u"&&(window.appState=J);console.log("[settings.handlers] minimal handlers loaded @",new Date().toISOString());function O(){return window.Snackbar&&typeof window.Snackbar.show=="function"?window.Snackbar:{success:n=>{console.log("SUCCESS:",n),alert("✅ "+n)},error:n=>{console.log("ERROR:",n),alert("❌ "+n)},info:n=>{console.log("INFO:",n),alert("ℹ️ "+n)},warning:n=>{console.log("WARNING:",n),alert("⚠️ "+n)}}}function Te(){if(console.log("[DEBUG] applyToastSettings chamada - usando sistema simplificado"),typeof window.applySimpleSnackbarConfig=="function")window.applySimpleSnackbarConfig();else{console.warn("[DEBUG] Sistema simplificado não disponível, carregando...");const n=document.createElement("script");n.src="/src/js/config/simple-snackbar-config.js",n.onload=()=>{console.log("[DEBUG] Sistema simplificado carregado, aplicando configurações..."),typeof window.applySimpleSnackbarConfig=="function"&&window.applySimpleSnackbarConfig()},document.head.appendChild(n)}}function nr(n){if(console.log("[DEBUG] applyCompactMode chamada:",n),n){document.body.classList.add("compact-mode"),document.body.setAttribute("data-compact-mode","enabled");const e=localStorage.getItem("compactMode");e&&(document.body.classList.add(`${e}-mode`),document.body.setAttribute("data-compact-size",e)),console.log("[DEBUG] Modo compacto ativado")}else document.body.classList.remove("compact-mode","micro-mode","nano-mode"),document.body.removeAttribute("data-compact-mode"),document.body.removeAttribute("data-compact-size"),console.log("[DEBUG] Modo compacto desativado")}function Ho(n){console.log("[DEBUG] applyCompactSize chamada:",n),document.body.classList.remove("micro-mode","nano-mode"),n&&n!=="normal"?(document.body.classList.add(`${n}-mode`),document.body.setAttribute("data-compact-size",n),localStorage.setItem("compactMode",n),console.log("[DEBUG] Tamanho compacto aplicado:",n)):(document.body.removeAttribute("data-compact-size"),localStorage.removeItem("compactMode"),console.log("[DEBUG] Tamanho compacto removido"))}function aD(n){console.log("[DEBUG] handleToggleChange executado para:",n.id,"checked:",n.checked);const e=n.checked;switch(n.id){case"limit-alerts-toggle":localStorage.setItem("noti_limit_alerts",e),O().success(`Alertas de limite ${e?"ativados":"desativados"}`);break;case"recurring-reminders-toggle":localStorage.setItem("noti_recurring_reminders",e),O().success(`Lembretes recorrentes ${e?"ativados":"desativados"}`);break;case"weekly-summary-toggle":localStorage.setItem("noti_weekly_summary",e),O().success(`Resumo semanal ${e?"ativado":"desativado"}`);break;case"toast-hover-pause":localStorage.setItem("toast_hover_pause",e),Te(),O().success(`Pausar toast no hover ${e?"ativado":"desativado"}`);break;case"compact-mode-toggle":localStorage.setItem("compactModeEnabled",e),nr(e),O().success(`Modo compacto ${e?"ativado":"desativado"}`);break;case"animations-toggle":console.log("[DEBUG] Handler animations-toggle executado!"),console.log("[DEBUG] Estado atual:",e),localStorage.setItem("animationsEnabled",e.toString()),e?(document.body.classList.remove("no-animations"),console.log("[DEBUG] Animações ativadas - classe no-animations removida")):(document.body.classList.add("no-animations"),console.log("[DEBUG] Animações desativadas - classe no-animations adicionada"));const t=document.body.classList.contains("no-animations");console.log("[DEBUG] Estado final - no-animations presente:",t),console.log("[DEBUG] Classes do body:",document.body.className),O().success(`Animações ${e?"ativadas":"desativadas"}`);break;case"performance-telemetry-toggle":console.log("[DEBUG] Handler performance-telemetry-toggle executado!"),console.log("[DEBUG] Estado atual:",e),localStorage.setItem("perfTelemetry",e.toString()),R(()=>import("./perf-tobPnqr4.js"),[]).then(o=>{o.setEnabled(e),console.log("[DEBUG] Sistema de telemetria configurado:",e)}).catch(o=>{console.warn("[DEBUG] Erro ao importar sistema de telemetria:",o)}),O().success(`Telemetria de performance ${e?"ativada":"desativada"}`);break;case"biometric-auth-toggle":console.log("[DEBUG] Handler biometric-auth-toggle executado!"),console.log("[DEBUG] Estado atual:",e),localStorage.setItem("biometricAuth",e.toString()),e?R(()=>import("./biometric-auth-LS5hpHei.js"),[]).then(()=>{window.biometricAuth&&window.biometricAuth.checkAvailability().then(o=>{o?O().success("Autenticação biométrica ativada! Configure nas configurações do dispositivo."):O().warning("Autenticação biométrica não disponível neste dispositivo.")})}).catch(o=>{console.warn("[DEBUG] Erro ao carregar sistema biométrico:",o),O().info("Autenticação biométrica em desenvolvimento")}):O().info("Autenticação biométrica desativada");break;case"auto-sync-toggle":console.log("[DEBUG] Handler auto-sync-toggle executado!"),console.log("[DEBUG] Estado atual:",e),localStorage.setItem("autoSync",e.toString()),e?(console.log("[DEBUG] Sincronização automática ativada"),O().success("Sincronização automática ativada - dados serão sincronizados automaticamente")):(console.log("[DEBUG] Sincronização automática desativada"),O().info("Sincronização automática desativada - sincronização manual necessária"));break;case"analytics-toggle":console.log("[DEBUG] Handler analytics-toggle executado!"),console.log("[DEBUG] Estado atual:",e),localStorage.setItem("analyticsEnabled",e.toString()),e?(console.log("[DEBUG] Analytics ativado"),O().success("Analytics ativado - dados de uso serão coletados localmente")):(console.log("[DEBUG] Analytics desativado"),O().info("Analytics desativado - nenhum dado de uso será coletado"));break}}async function Cr(){return R(()=>import("./settings.service-CDNrmgA6.js"),[])}window.acceptInvitation=async function(n){if(n)try{(await Cr()).acceptBudgetInvitation(n),O().success("Convite aceito"),window.dispatchEvent(new CustomEvent("invitation:changed"))}catch{O().error("Falha ao aceitar convite")}};window.declineInvitation=async function(n){if(n)try{(await Cr()).declineBudgetInvitation(n),O().info("Convite recusado"),window.dispatchEvent(new CustomEvent("invitation:changed"))}catch{O().error("Falha ao recusar convite")}};window.cancelSentInvitation=async function(n){if(n)try{(await Cr()).cancelSentInvitation(n),O().info("Convite cancelado"),window.dispatchEvent(new CustomEvent("invitation:changed"))}catch{O().error("Erro ao cancelar")}};window.removeUserFromBudget=async function(n){try{const{appState:e}=window;if(!e?.currentBudget?.id)throw new Error("Orçamento inválido");if(!n||!confirm("Remover este usuário do orçamento?"))return;(await Cr()).removeUserFromBudget(e.currentBudget.id,n),O().success("Usuário removido"),window.dispatchEvent(new CustomEvent("budget:changed"))}catch{O().error("Erro ao remover usuário")}};window.updateBudgetName=async function(n){try{const{appState:e}=window,t=(n||"").trim();if(!t)return O().warning("Nome vazio");if(!e?.currentBudget?.id)throw new Error("Sem orçamento");(await Cr()).updateBudgetName(e.currentBudget.id,t),O().success("Nome atualizado"),window.dispatchEvent(new CustomEvent("budget:changed"))}catch{O().error("Erro ao renomear")}};window.enterBudget=async function(n,e){try{if(console.log("[DEBUG] enterBudget chamado",n,e),!n)return console.error("[DEBUG] ID do orçamento inválido"),O().error("ID do orçamento inválido");const t=await R(()=>Promise.resolve().then(()=>ZA),void 0),o=await t.getById(n);if(!o)return console.error("[DEBUG] Orçamento não encontrado no banco de dados"),O().error("Orçamento não encontrado");if(console.log("[DEBUG] Orçamento encontrado:",o),!t.ensureBudgetPersistence(o))return console.error("[DEBUG] Falha ao persistir orçamento"),O().error("Erro ao salvar seleção do orçamento");window.appState&&(window.appState.currentBudget=o),window.dispatchEvent(new CustomEvent("budget:changed",{detail:{budgetId:n,budgetName:o.nome}})),console.log("[DEBUG] Orçamento alterado com sucesso"),O().success(`Entrando no orçamento: ${o.nome}`),setTimeout(()=>{window.location.hash="#/dashboard"},500)}catch(t){console.error("[DEBUG] Erro ao entrar no orçamento:",t),O().error("Erro ao entrar no orçamento: "+t.message)}};window.toggleThemeColor=function(n){try{if(!n)return;localStorage.setItem("themeColor",n),document.documentElement.setAttribute("data-theme-color",n),O().info("Cor aplicada")}catch{}};function cD(){if(console.log("[DEBUG] Iniciando verificação de atualizações..."),!("serviceWorker"in navigator)){console.log("[DEBUG] Service Workers não suportados"),O().warning("Seu navegador não suporta atualizações automáticas");return}navigator.serviceWorker.getRegistration().then(n=>{if(!n){console.log("[DEBUG] Nenhum Service Worker registrado"),O().info("Nenhum Service Worker encontrado");return}if(console.log("[DEBUG] Service Worker encontrado:",n),n.waiting){console.log("[DEBUG] Atualização já disponível e esperando"),sh();return}if(n.installing){console.log("[DEBUG] Atualização em andamento"),O().info("Atualização em andamento...");return}console.log("[DEBUG] Tentando atualizar Service Worker..."),n.update().then(()=>{console.log("[DEBUG] Verificação de atualização concluída"),n.waiting?(console.log("[DEBUG] Nova atualização disponível após verificação"),sh()):(console.log("[DEBUG] Nenhuma atualização disponível"),O().success("Você já está usando a versão mais recente!"))}).catch(e=>{console.error("[DEBUG] Erro ao verificar atualizações:",e),O().error("Erro ao verificar atualizações")})}).catch(n=>{console.error("[DEBUG] Erro ao obter registro do Service Worker:",n),O().error("Erro ao verificar atualizações")})}function sh(){console.log("[DEBUG] Mostrando que há atualização disponível");const n=`
    <div class="space-y-4">
      <div class="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
        <h3 class="font-semibold text-green-800 dark:text-green-200 mb-2">🆕 Atualização Disponível!</h3>
        <p class="text-sm text-green-700 dark:text-green-300 mb-3">
          Uma nova versão do aplicativo está disponível com melhorias e correções.
        </p>
        <div class="flex gap-2">
          <button onclick="window.location.reload()" class="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
            🔄 Atualizar Agora
          </button>
          <button onclick="this.closest('.update-modal').remove()" class="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">
            ⏰ Mais Tarde
          </button>
        </div>
      </div>
      <div class="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
        <h4 class="font-semibold text-blue-800 dark:text-blue-200 mb-2">✨ O que há de novo:</h4>
        <ul class="text-sm text-blue-700 dark:text-blue-300 space-y-1 list-disc ml-4">
          <li>Melhorias de performance</li>
          <li>Correções de bugs</li>
          <li>Novas funcionalidades</li>
          <li>Otimizações de segurança</li>
        </ul>
      </div>
    </div>
  `;if(window.Modal){const e=window.Modal({title:"🆕 Atualização Disponível",content:n,onClose:()=>console.log("[DEBUG] Modal de atualização fechado")});e.className="update-modal"}else confirm(`🆕 Atualização disponível!

Deseja atualizar agora?`)&&window.location.reload()}window.copyAppInfo=function(){try{let t=function(o){const r=document.createElement("textarea");r.value=o,r.style.position="fixed",r.style.left="-999999px",r.style.top="-999999px",document.body.appendChild(r),r.focus(),r.select();try{document.execCommand("copy"),console.log("[DEBUG] Informações copiadas via fallback"),O().success("Informações do app copiadas!")}catch(i){console.error("[DEBUG] Erro no fallback copy:",i),O().error("Erro ao copiar informações")}document.body.removeChild(r)};console.log("[DEBUG] Copiando informações do app...");const n={app:{versao:"4.3.0",swVersao:"v4.2.9",cacheEstatico:"financeiro-static-v4.2.9",cacheDinamico:"financeiro-dynamic-v4.2.9",desenvolvedor:"Igor Bispo",tecnologias:"Firebase, JavaScript, PWA",ultimaAtualizacao:"Setembro 2025"},dispositivo:{userAgent:navigator.userAgent,plataforma:navigator.platform,idioma:navigator.language,online:navigator.onLine},configuracoes:{tema:document.documentElement.classList.contains("dark")?"dark":"light",corTema:localStorage.getItem("themeColor")||"default",animacoes:localStorage.getItem("animationsEnabled")!=="false",telemetria:localStorage.getItem("perfTelemetry")==="true",biometria:localStorage.getItem("biometricAuth")==="true",autoSync:localStorage.getItem("autoSync")==="true",analytics:localStorage.getItem("analyticsEnabled")==="true"},usuario:{uid:window.appState?.currentUser?.uid||null,email:window.appState?.currentUser?.email||null,ultimaVerificacao:new Date().toLocaleString("pt-BR")}},e=JSON.stringify(n,null,2);navigator.clipboard&&navigator.clipboard.writeText?navigator.clipboard.writeText(e).then(()=>{console.log("[DEBUG] Informações copiadas para clipboard"),O().success("Informações do app copiadas!")}).catch(o=>{console.warn("[DEBUG] Erro ao copiar para clipboard:",o),t(e)}):t(e)}catch(n){console.error("[DEBUG] Erro ao copiar informações:",n),O().error("Falha ao copiar informações")}};window.clearOfflineCache=function(){if(console.log("[DEBUG] Iniciando limpeza de cache offline..."),!confirm("Limpar cache offline? Isso pode afetar a performance do app.")){console.log("[DEBUG] Limpeza de cache cancelada pelo usuário");return}try{let n=0,e=0;"caches"in window?caches.keys().then(t=>{console.log("[DEBUG] Caches encontrados:",t);const o=t.map(r=>(console.log("[DEBUG] Removendo cache:",r),caches.delete(r).then(i=>(i&&n++,i))));Promise.all(o).then(()=>{if(console.log("[DEBUG] Caches removidos:",n),Object.keys(localStorage).filter(i=>i.includes("cache")||i.includes("static")||i.includes("dynamic")||i.includes("offline")).forEach(i=>{localStorage.removeItem(i),e++}),console.log("[DEBUG] Dados de cache removidos do localStorage:",e),"indexedDB"in window)try{indexedDB.deleteDatabase("financeiro-cache"),console.log("[DEBUG] IndexedDB cache removido")}catch(i){console.warn("[DEBUG] Erro ao remover IndexedDB:",i)}O().success(`Cache limpo! Removidos ${n} caches e ${e} dados locais.`)}).catch(r=>{console.error("[DEBUG] Erro ao remover caches:",r),O().error("Erro ao limpar alguns caches")})}):(console.log("[DEBUG] Cache API não disponível"),O().warning("Cache API não disponível neste navegador"))}catch(n){console.error("[DEBUG] Erro geral na limpeza de cache:",n),O().error("Erro ao limpar cache")}};window.showWhatsNew=function(){console.log("[DEBUG] showWhatsNew executada!");const n=`
    <div class="space-y-4">
      <div class="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
        <h3 class="font-semibold text-blue-800 dark:text-blue-200 mb-2">🆕 Novidades recentes</h3>
        <ul class="text-sm text-blue-700 dark:text-blue-300 space-y-1 list-disc ml-4">
          <li>Reestruturação dos handlers para maior estabilidade</li>
          <li>Melhorias em notificações e preferências</li>
          <li>Otimizações de performance em Settings</li>
          <li>Correções na funcionalidade "O que mudou"</li>
          <li>Atualização das informações de contato</li>
        </ul>
      </div>
      <div class="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
        <h4 class="font-semibold text-green-800 dark:text-green-200 mb-2">✨ Melhorias técnicas</h4>
        <ul class="text-sm text-green-700 dark:text-green-300 space-y-1 list-disc ml-4">
          <li>Sistema de debug aprimorado</li>
          <li>Handlers mais robustos e confiáveis</li>
          <li>Melhor tratamento de erros</li>
          <li>Interface mais responsiva</li>
        </ul>
      </div>
    </div>`;if(console.log("[DEBUG] Verificando disponibilidade do Modal..."),console.log("[DEBUG] window.Modal disponível:",!!window.Modal),window.Modal&&typeof window.Modal=="function"){console.log("[DEBUG] Abrindo modal com window.Modal...");try{const t=window.Modal({title:"🆕 O que mudou",content:n,onClose:()=>console.log('[DEBUG] Modal "O que mudou" fechado')});console.log("[DEBUG] Modal criado com sucesso:",t)}catch(t){console.error("[DEBUG] Erro ao criar modal:",t),e()}}else console.log("[DEBUG] Modal não disponível, usando fallback..."),e();function e(){console.log("[DEBUG] Executando fallback alert..."),alert(`🆕 Novidades:

- Reestruturação dos handlers
- Melhorias em notificações
- Otimizações de performance
- Correções na funcionalidade "O que mudou"
- Atualização das informações de contato`)}};window.installApp=function(){console.log("[DEBUG] Iniciando processo de instalação do app...");try{if(window.matchMedia("(display-mode: standalone)").matches||window.navigator.standalone===!0){console.log("[DEBUG] App já está instalado"),O().info("O app já está instalado no seu dispositivo!");return}window.deferredPrompt?(console.log("[DEBUG] Prompt de instalação disponível, mostrando..."),window.deferredPrompt.prompt(),window.deferredPrompt.userChoice.then(n=>{console.log("[DEBUG] Escolha do usuário:",n.outcome),n.outcome==="accepted"?(console.log("[DEBUG] Instalação aceita pelo usuário"),O().success("Instalação iniciada! O app será adicionado à sua tela inicial.")):(console.log("[DEBUG] Instalação cancelada pelo usuário"),O().info("Instalação cancelada. Você pode tentar novamente a qualquer momento.")),window.deferredPrompt=null}).catch(n=>{console.error("[DEBUG] Erro no prompt de instalação:",n),O().error("Erro no processo de instalação"),window.deferredPrompt=null})):(console.log("[DEBUG] Nenhum prompt de instalação disponível"),navigator.userAgent.includes("Chrome")||navigator.userAgent.includes("Edge")||navigator.userAgent.includes("Safari")?window.Modal?window.Modal({title:"📱 Instalar App",content:`
          <div class="space-y-4">
            <div class="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
              <h3 class="font-semibold text-blue-800 dark:text-blue-200 mb-2">📱 Como instalar o app:</h3>
              <ul class="text-sm text-blue-700 dark:text-blue-300 space-y-2">
                <li><strong>Chrome/Edge:</strong> Clique no ícone de instalação na barra de endereços</li>
                <li><strong>Safari (iOS):</strong> Toque no botão "Compartilhar" e selecione "Adicionar à Tela Inicial"</li>
                <li><strong>Android:</strong> Toque no menu do navegador e selecione "Instalar app"</li>
              </ul>
            </div>
            <div class="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
              <h4 class="font-semibold text-green-800 dark:text-green-200 mb-2">✨ Benefícios da instalação:</h4>
              <ul class="text-sm text-green-700 dark:text-green-300 space-y-1">
                <li>• Acesso rápido direto da tela inicial</li>
                <li>• Funciona offline</li>
                <li>• Notificações push</li>
                <li>• Experiência nativa</li>
              </ul>
            </div>
          </div>
        `,onClose:()=>console.log("[DEBUG] Modal de instalação fechado")}):alert(`Para instalar o app:

Chrome/Edge: Clique no ícone de instalação na barra de endereços
Safari: Toque em "Compartilhar" > "Adicionar à Tela Inicial"`):O().warning("Instalação não disponível neste navegador"))}catch(n){console.error("[DEBUG] Erro na instalação:",n),O().error("Erro no processo de instalação")}};document.addEventListener("click",n=>{const e=n.target;if(console.log("[DEBUG] Click detectado:",e.tagName,e.className,e.id,e.textContent?.substring(0,30)),!(e.textContent?.includes("Backup completo")||e.textContent?.includes("Importar Dados")||e.textContent?.includes("Limpar Dados")||e.textContent?.includes("Exportar Dados")||e.textContent?.includes("Restaurar backup")||e.textContent?.includes("Remover tudo")||e.id==="import-data-btn"||e.id==="clear-data-btn"||e.id==="limit-alerts-toggle"||e.id==="recurring-reminders-toggle"||e.id==="weekly-summary-toggle"||e.id==="toast-hover-pause"||e.id==="apply-toast-settings"||e.id==="reset-toast-settings"||e.id==="test-toast"||e.id==="debug-snackbar"||e.id==="test-direct"||e.id==="debug-complete"||e.id==="test-console"||e.id==="test-compact"||e.id==="test-days-chunk"||e.id==="test-animations"||e.id==="compact-mode-toggle"||e.id==="animations-toggle"||e.id==="performance-telemetry-toggle"||e.id==="biometric-auth-toggle"||e.id==="auto-sync-toggle"||e.id==="analytics-toggle"||e.id==="view-performance-events"||e.id==="save-days-chunk"||e.id==="reset-days-chunk"||e.id==="toggle-theme-btn"||e.id==="enter-budget-button"||e.id==="enter-text"||e.classList?.contains("color-theme-btn")||e.classList?.contains("compact-size-btn")||e.textContent?.includes("Verificar Atualizações")||e.textContent?.includes("Ajuda e Suporte")||e.textContent?.includes("Avaliar App")||e.textContent?.includes("Copiar Informações")||e.textContent?.includes("Limpar Cache Offline")||e.textContent?.includes("O que mudou")||e.textContent?.includes("Instalar App")||e.textContent?.trim()==="Entrar"))return;if(console.log("[DEBUG] Elemento é alvo, processando..."),console.log("[DEBUG] Elemento ID:",e.id,"Classes:",e.className,"Text:",e.textContent?.substring(0,50)),e.type==="checkbox"){setTimeout(()=>{aD(e)},0);return}n.preventDefault(),n.stopPropagation();const o=e.closest("[data-accept-inv]");if(o){window.acceptInvitation(o.getAttribute("data-accept-inv"));return}const r=e.closest("[data-decline-inv]");if(r){window.declineInvitation(r.getAttribute("data-decline-inv"));return}const i=e.closest("[data-cancel-inv]");if(i){window.cancelSentInvitation(i.getAttribute("data-cancel-inv"));return}const s=e.closest("[data-remove-user]");if(s){window.removeUserFromBudget(s.getAttribute("data-remove-user"));return}const c=e.closest(".enter-budget-button")||e.closest("#enter-budget-button");if(c){console.log("[DEBUG] Handler enter-budget-button executado!");const p=c.getAttribute("data-budget-id"),m=c.getAttribute("data-budget-name");console.log("[DEBUG] Budget ID:",p,"Budget Name:",m),p?window.enterBudget(p,m):(console.warn("[DEBUG] Budget ID não encontrado no elemento"),O().error("Erro: ID do orçamento não encontrado"));return}if(e.id==="enter-budget-button"){console.log("[DEBUG] Handler alternativo enter-budget-button executado!");const p=e.getAttribute("data-budget-id"),m=e.getAttribute("data-budget-name");console.log("[DEBUG] Budget ID:",p,"Budget Name:",m),p?window.enterBudget(p,m):(console.warn("[DEBUG] Budget ID não encontrado no elemento"),O().error("Erro: ID do orçamento não encontrado"));return}if(e.textContent?.trim()==="Entrar"||e.id==="enter-text"){console.log('[DEBUG] Handler "Entrar" executado!'),console.log("[DEBUG] Elemento clicado:",e);const p=e.closest("button")||e.closest(".enter-budget-button")||e.closest("#enter-budget-button");if(p){console.log("[DEBUG] Botão pai encontrado:",p);const m=p.getAttribute("data-budget-id"),S=p.getAttribute("data-budget-name");console.log("[DEBUG] Budget ID do pai:",m,"Budget Name do pai:",S),m?window.enterBudget(m,S):(console.warn("[DEBUG] Budget ID não encontrado no botão pai"),O().error("Erro: ID do orçamento não encontrado"))}else console.warn("[DEBUG] Botão pai não encontrado"),O().error("Erro: Botão pai não encontrado");return}const u=e.closest(".color-theme-btn");if(u){const p=u.getAttribute("data-theme");p&&window.toggleThemeColor(p);return}const d=e.closest(".compact-size-btn");if(d){const p=d.getAttribute("data-size");p&&(Ho(p),O().success(`Tamanho compacto: ${p}`));return}if(e.id==="apply-toast-settings"){console.log("[DEBUG] Handler apply-toast-settings executado!");const p=document.getElementById("limit-alerts-toggle")?.checked||!1,m=document.getElementById("recurring-reminders-toggle")?.checked||!1,S=document.getElementById("weekly-summary-toggle")?.checked||!1,C=document.getElementById("toast-hover-pause")?.checked||!1;localStorage.setItem("noti_limit_alerts",p),localStorage.setItem("noti_recurring_reminders",m),localStorage.setItem("noti_weekly_summary",S),localStorage.setItem("toast_hover_pause",C),Te(),setTimeout(()=>{Te(),console.log("[DEBUG] Configurações reaplicadas após timeout")},100),setTimeout(()=>{if(window.Snackbar&&window.Snackbar.__getStatsForTest){const M=window.Snackbar.__getStatsForTest();console.log("[DEBUG] Stats do Snackbar após aplicação:",M)}},200),O().success("Configurações de notificação aplicadas");return}if(e.id==="reset-toast-settings"){console.log("[DEBUG] Handler reset-toast-settings executado!"),document.getElementById("limit-alerts-toggle").checked=!0,document.getElementById("recurring-reminders-toggle").checked=!0,document.getElementById("weekly-summary-toggle").checked=!1,document.getElementById("toast-hover-pause").checked=!0,typeof window.resetSimpleSnackbarConfig=="function"&&window.resetSimpleSnackbarConfig(),O().info("Configurações restauradas para o padrão");return}if(e.id==="test-toast"){console.log("[DEBUG] Handler test-toast executado!"),typeof window.testSimpleSnackbarConfig=="function"?window.testSimpleSnackbarConfig():(console.warn("[DEBUG] Sistema simplificado não disponível, usando fallback..."),O().info("Teste INFO - Sistema antigo!"));return}if(e.id==="debug-snackbar"){console.log("[DEBUG] Handler debug-snackbar executado!"),console.log("[DEBUG] Testando Snackbar diretamente..."),console.log("[DEBUG] window.Snackbar disponível:",!!window.Snackbar),console.log("[DEBUG] window.SnackbarInstance disponível:",!!window.SnackbarInstance),window.Snackbar?(window.Snackbar.info("Teste direto - INFO"),setTimeout(()=>{window.Snackbar.success("Teste direto - SUCCESS")},100),setTimeout(()=>{window.Snackbar.warning("Teste direto - WARNING")},200)):(console.error("[DEBUG] window.Snackbar não está disponível!"),alert("ERRO: window.Snackbar não está disponível!"));return}if(e.id==="test-direct"){console.log("[DEBUG] Handler test-direct executado!"),console.log("[DEBUG] === TESTE DIRETO ==="),console.log("[DEBUG] window.Snackbar:",window.Snackbar),console.log("[DEBUG] window.SnackbarInstance:",window.SnackbarInstance),window.Snackbar&&(console.log("[DEBUG] Testando window.Snackbar.info..."),window.Snackbar.info("Teste 1: INFO básico")),window.SnackbarInstance&&(console.log("[DEBUG] Configurações atuais da instância:",{defaultDuration:window.SnackbarInstance.defaultDuration,bottomOffset:window.SnackbarInstance.bottomOffset,position:window.SnackbarInstance.position,align:window.SnackbarInstance.align}),window.SnackbarInstance.defaultDuration=5e3,window.SnackbarInstance.position="top",window.SnackbarInstance.align="right",console.log("[DEBUG] Configurações modificadas:",{defaultDuration:window.SnackbarInstance.defaultDuration,position:window.SnackbarInstance.position,align:window.SnackbarInstance.align}),setTimeout(()=>{window.Snackbar.success("Teste 2: SUCCESS com configurações modificadas")},100));return}if(e.id==="debug-complete"){console.log("[DEBUG] Handler debug-complete executado!");const p=document.createElement("script");p.src="/src/js/config/debug-snackbar.js",p.onload=()=>{console.log("[DEBUG] Script de debug carregado"),typeof window.debugSnackbarSystem=="function"&&window.debugSnackbarSystem()},document.head.appendChild(p);return}if(e.id==="test-console"){console.log("[DEBUG] Handler test-console executado!"),console.log("[DEBUG] === TESTE NO CONSOLE ==="),console.log("[DEBUG] Execute os comandos abaixo no console:"),console.log('[DEBUG] 1. localStorage.setItem("toastDuration", "5000")'),console.log('[DEBUG] 2. localStorage.setItem("toastPosition", "top")'),console.log('[DEBUG] 3. localStorage.setItem("toastAlignment", "right")'),console.log("[DEBUG] 4. window.SnackbarInstance.defaultDuration = 5000"),console.log('[DEBUG] 5. window.SnackbarInstance.position = "top"'),console.log('[DEBUG] 6. window.SnackbarInstance.align = "right"'),console.log('[DEBUG] 7. window.Snackbar.info("Teste final!")'),localStorage.setItem("toastDuration","5000"),localStorage.setItem("toastPosition","top"),localStorage.setItem("toastAlignment","right"),window.SnackbarInstance&&(window.SnackbarInstance.defaultDuration=5e3,window.SnackbarInstance.position="top",window.SnackbarInstance.align="right",console.log("[DEBUG] Configurações aplicadas automaticamente"),console.log("[DEBUG] Estado da instância:",{defaultDuration:window.SnackbarInstance.defaultDuration,position:window.SnackbarInstance.position,align:window.SnackbarInstance.align}),window.Snackbar.info("Teste final: Configurações aplicadas!"));return}if(e.id==="test-compact"){console.log("[DEBUG] Handler test-compact executado!"),console.log("[DEBUG] === TESTE MODO COMPACTO ==="),console.log("[DEBUG] Estado atual do body:"),console.log("  - Classes:",document.body.className),console.log("  - data-compact-mode:",document.body.getAttribute("data-compact-mode")),console.log("  - data-compact-size:",document.body.getAttribute("data-compact-size")),document.body.classList.contains("compact-mode")?(console.log("[DEBUG] Desativando modo compacto..."),nr(!1)):(console.log("[DEBUG] Ativando modo compacto..."),nr(!0)),setTimeout(()=>{console.log("[DEBUG] Testando tamanho Micro..."),Ho("micro")},1e3),setTimeout(()=>{console.log("[DEBUG] Testando tamanho Nano..."),Ho("nano")},2e3),setTimeout(()=>{console.log("[DEBUG] Voltando ao normal..."),nr(!1)},3e3);return}if(e.id==="test-animations"){console.log("[DEBUG] Handler test-animations executado!"),console.log("[DEBUG] === TESTE ANIMAÇÕES ===");const p=document.body.classList.contains("no-animations");console.log("[DEBUG] Estado atual - no-animations presente:",p),p?(console.log("[DEBUG] Ativando animações..."),document.body.classList.remove("no-animations"),localStorage.setItem("animationsEnabled","true"),O().success("Animações ativadas para teste!"),setTimeout(()=>{ch()},500)):(console.log("[DEBUG] Desativando animações..."),document.body.classList.add("no-animations"),localStorage.setItem("animationsEnabled","false"),O().info("Animações desativadas para teste!"),setTimeout(()=>{ch()},500)),setTimeout(()=>{console.log("[DEBUG] Restaurando estado original..."),p?(document.body.classList.add("no-animations"),localStorage.setItem("animationsEnabled","false")):(document.body.classList.remove("no-animations"),localStorage.setItem("animationsEnabled","true")),O().info("Estado das animações restaurado!")},3e3);return}if(e.id==="test-days-chunk"){console.log("[DEBUG] Handler test-days-chunk executado!"),console.log("[DEBUG] === TESTE TAMANHO DO BLOCO ===");const p=document.getElementById("days-chunk-size");if(p){console.log("[DEBUG] Input encontrado:",p),console.log("[DEBUG] Valor atual:",p.value);const m=["","12","16","25","automático"];let S=0;const C=()=>{if(S<m.length){const M=m[S];p.value=M,console.log(`[DEBUG] Testando valor: "${M}"`);const P=new Event("input",{bubbles:!0});p.dispatchEvent(P),S++,setTimeout(C,1e3)}else console.log("[DEBUG] Teste concluído"),O().info("Teste do tamanho do bloco concluído!")};C()}else console.warn("[DEBUG] Input days-chunk-size não encontrado"),O().error("Erro: Campo de entrada não encontrado");return}if(e.id==="save-days-chunk"){console.log("[DEBUG] Handler save-days-chunk executado!");const p=document.getElementById("days-chunk-size");if(p){const m=p.value.trim();if(console.log("[DEBUG] Valor do input:",m),m===""||m.toLowerCase()==="automático")localStorage.removeItem("txChunkSize"),console.log("[DEBUG] Modo automático ativado"),O().success("Modo automático ativado - sistema ajustará automaticamente");else{const S=parseInt(m);if(isNaN(S)||S<6||S>40){O().error("Valor inválido! Use um número entre 6 e 40 (recomendado 10-16)");return}localStorage.setItem("txChunkSize",S.toString()),console.log("[DEBUG] Chunk de dias definido para:",S),O().success(`Tamanho do bloco definido para ${S} grupos de dias`)}}else console.warn("[DEBUG] Input days-chunk-size não encontrado"),O().error("Erro: Campo de entrada não encontrado");return}if(e.id==="reset-days-chunk"){console.log("[DEBUG] Handler reset-days-chunk executado!");const p=document.getElementById("days-chunk-size");p?(p.value="",localStorage.removeItem("txChunkSize"),console.log("[DEBUG] Chunk de dias restaurado para o padrão (automático)"),O().info("Configuração restaurada para o padrão (automático)")):(console.warn("[DEBUG] Input days-chunk-size não encontrado"),O().error("Erro: Campo de entrada não encontrado"));return}if(e.closest("#whats-new-btn")){console.log("[DEBUG] Handler whats-new-btn executado!"),window.showWhatsNew();return}if(e.id==="whats-new-btn"||e.id==="whats-new"){console.log('[DEBUG] Handler alternativo "O que mudou" executado!'),window.showWhatsNew();return}if(e.id==="copy-info-btn"){window.copyAppInfo();return}if(e.id==="clear-cache-btn"){window.clearOfflineCache();return}if(e.id==="install-app-btn"){window.installApp();return}if(e.closest('[data-action="backup"]')){O().info("Funcionalidade de backup em desenvolvimento");return}if(e.closest('[data-action="import"]')){O().info("Funcionalidade de importação em desenvolvimento");return}if(e.id==="import-data-btn"){console.log("[DEBUG] import-data-btn clicado!"),O().info("Funcionalidade de importação em desenvolvimento");return}if(e.id==="clear-data-btn"){console.log("[DEBUG] clear-data-btn clicado!"),confirm("⚠️ ATENÇÃO: Isso irá apagar TODOS os dados do orçamento atual. Esta ação não pode ser desfeita. Continuar?")&&confirm("🚨 CONFIRMAÇÃO FINAL: Todos os dados serão perdidos permanentemente. Tem certeza?")&&O().warning("Funcionalidade de limpeza de dados em desenvolvimento");return}if(e.textContent?.includes("Backup completo")){console.log("[DEBUG] Backup completo clicado!"),O().info("Funcionalidade de backup em desenvolvimento");return}if(e.textContent?.includes("Importar Dados")){console.log("[DEBUG] Importar Dados clicado!"),O().info("Funcionalidade de importação em desenvolvimento");return}if(e.textContent?.includes("Verificar Atualizações")){console.log("[DEBUG] Verificar Atualizações clicado!"),O().info("Verificando atualizações..."),cD();return}if(e.textContent?.includes("Ajuda e Suporte")){console.log("[DEBUG] Ajuda e Suporte clicado!"),window.Modal?window.Modal({title:"🆘 Ajuda e Suporte",content:`
        <div class="space-y-4">
          <div class="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
            <h3 class="font-semibold text-blue-800 dark:text-blue-200 mb-2">📞 Contato e Suporte</h3>
            <ul class="text-sm text-blue-700 dark:text-blue-300 space-y-2">
              <li><strong>Email:</strong> igormbispo@hotmail.com</li>
              <li><strong>WhatsApp:</strong> (71) 99200-3106</li>
              <li><strong>Horário:</strong> Segunda a Sexta, 9h às 18h</li>
            </ul>
          </div>
          <div class="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
            <h4 class="font-semibold text-green-800 dark:text-green-200 mb-2">❓ Perguntas Frequentes</h4>
            <ul class="text-sm text-green-700 dark:text-green-300 space-y-1">
              <li>• Como sincronizar dados entre dispositivos?</li>
              <li>• Como fazer backup das minhas informações?</li>
              <li>• Como configurar notificações?</li>
              <li>• Como usar o modo offline?</li>
            </ul>
          </div>
        </div>
      `}):alert(`Suporte:

Email: igormbispo@hotmail.com
WhatsApp: (71) 99200-3106
Horário: Segunda a Sexta, 9h às 18h`);return}if(e.textContent?.includes("Avaliar App")){if(console.log("[DEBUG] Avaliar App clicado!"),/Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){const m=navigator.userAgent.toLowerCase();m.includes("android")?(window.open("https://play.google.com/store/apps/details?id=com.servotech.financeiro","_blank"),O().success("Redirecionando para Google Play...")):m.includes("iphone")||m.includes("ipad")?(window.open("https://apps.apple.com/app/financeiro-servotech/id123456789","_blank"),O().success("Redirecionando para App Store...")):O().info("Avalie o app na loja de aplicativos do seu dispositivo!")}else window.Modal?window.Modal({title:"⭐ Avaliar App",content:`
          <div class="space-y-4">
            <div class="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
              <h3 class="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">⭐ Avalie o App</h3>
              <p class="text-sm text-yellow-700 dark:text-yellow-300 mb-3">
                Sua avaliação é muito importante para nós! Ajude outros usuários a descobrir o app.
              </p>
              <div class="flex gap-2">
                <button onclick="window.open('https://play.google.com/store/apps/details?id=com.servotech.financeiro', '_blank')" class="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700">
                  Google Play
                </button>
                <button onclick="window.open('https://apps.apple.com/app/financeiro-servotech/id123456789', '_blank')" class="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700">
                  App Store
                </button>
              </div>
            </div>
          </div>
        `}):alert(`Avalie o app:

Google Play: https://play.google.com/store/apps/details?id=com.servotech.financeiro
App Store: https://apps.apple.com/app/financeiro-servotech/id123456789`);return}if(e.textContent?.includes("Copiar Informações")){window.copyAppInfo();return}if(e.textContent?.includes("Limpar Cache Offline")){window.clearOfflineCache();return}if(e.textContent?.includes("O que mudou")){console.log('[DEBUG] Handler "O que mudou" executado!'),console.log("[DEBUG] Texto do elemento:",e.textContent),console.log("[DEBUG] Elemento completo:",e),console.log("[DEBUG] Chamando window.showWhatsNew()...");try{window.showWhatsNew(),console.log("[DEBUG] window.showWhatsNew() executado com sucesso"),O().success('Abrindo "O que mudou"...')}catch(p){console.error("[DEBUG] Erro ao executar showWhatsNew:",p),O().error('Erro ao abrir "O que mudou"')}return}if(e.textContent?.trim()==="O que mudou"||e.textContent?.includes("O que mudou")||e.getAttribute("data-action")==="whats-new"||e.classList?.contains("whats-new-btn")){console.log('[DEBUG] Handler adicional "O que mudou" executado!'),console.log("[DEBUG] Tipo de detecção:",{textTrim:e.textContent?.trim()==="O que mudou",textIncludes:e.textContent?.includes("O que mudou"),dataAction:e.getAttribute("data-action")==="whats-new",classList:e.classList?.contains("whats-new-btn")});try{window.showWhatsNew(),console.log("[DEBUG] Handler adicional executado com sucesso")}catch(p){console.error("[DEBUG] Erro no handler adicional:",p),O().error('Erro ao abrir "O que mudou"')}return}if(e.textContent?.includes("Instalar App")){window.installApp();return}if(e.id==="view-performance-events"){console.log("[DEBUG] Handler view-performance-events executado!"),R(()=>import("./perf-tobPnqr4.js"),[]).then(p=>{const m=p.getLog();if(console.log("[DEBUG] Eventos de performance coletados:",m),m.length===0){O().info("Nenhum evento de performance coletado ainda. Ative a telemetria e use o app para coletar dados.");return}console.table(m);const S=m.reduce((P,U)=>(P[U.event]=(P[U.event]||0)+1,P),{});console.log("[DEBUG] Resumo dos eventos:",S);const C=document.createElement("div");C.style.cssText=`
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0,0,0,0.5);
          z-index: 10000;
          display: flex;
          align-items: center;
          justify-content: center;
        `;const M=document.createElement("div");M.style.cssText=`
          background: white;
          padding: 20px;
          border-radius: 8px;
          max-width: 80%;
          max-height: 80%;
          overflow: auto;
        `,M.innerHTML=`
          <h3>Eventos de Performance (${m.length})</h3>
          <p><strong>Resumo:</strong></p>
          <ul>
            ${Object.entries(S).map(([P,U])=>`<li>${P}: ${U} ocorrências</li>`).join("")}
          </ul>
          <p><strong>Últimos 10 eventos:</strong></p>
          <pre style="background: #f5f5f5; padding: 10px; border-radius: 4px; overflow: auto; max-height: 300px;">
${m.slice(0,10).map(P=>`${new Date(P.ts).toLocaleTimeString()} - ${P.event}${P.duration?` (${P.duration}ms)`:""}`).join(`
`)}
          </pre>
          <button onclick="this.closest('.perf-modal').remove()" style="margin-top: 10px; padding: 8px 16px; background: #3b82f6; color: white; border: none; border-radius: 4px; cursor: pointer;">
            Fechar
          </button>
        `,C.className="perf-modal",C.appendChild(M),document.body.appendChild(C),C.addEventListener("click",P=>{P.target===C&&C.remove()}),O().success(`Mostrando ${m.length} eventos de performance`)}).catch(p=>{console.error("[DEBUG] Erro ao carregar eventos de performance:",p),O().error("Erro ao carregar eventos de performance")});return}if(e.id==="toggle-theme-btn"){const p=document.documentElement.classList.contains("dark");p?(document.documentElement.classList.remove("dark"),localStorage.setItem("theme","light"),e.textContent="🌙 Modo Escuro"):(document.documentElement.classList.add("dark"),localStorage.setItem("theme","dark"),e.textContent="☀️ Modo Claro"),O().success(`Tema alterado para ${p?"claro":"escuro"}`);return}if(e.classList?.contains("color-theme-btn")){const p=e.getAttribute("data-theme");p&&(localStorage.setItem("colorTheme",p),document.body.setAttribute("data-color-theme",p),O().success(`Tema de cor alterado para ${p}`));return}if(e.classList?.contains("compact-size-btn")){const p=e.getAttribute("data-size");p&&(Ho(p),O().success(`Tamanho compacto: ${p}`));return}if(e.id==="check-updates-btn"){O().info("Verificação de atualizações em desenvolvimento");return}if(e.id==="rate-app-btn"){O().info("Avaliação do app em desenvolvimento");return}if(e.id==="install-app-btn"){O().info("Instalação do app em desenvolvimento");return}if(e.id==="copy-info-btn"){O().info("Copiando informações do app...");return}if(e.id==="clear-cache-btn"){O().info("Limpando cache offline...");return}},{capture:!0});let gn=new Map;document.addEventListener("input",n=>{const e=n.target;gn.has(e.id)&&clearTimeout(gn.get(e.id));const t=setTimeout(()=>{if(e.id==="toast-duration"){const o=parseInt(e.value)||500;localStorage.setItem("toastDuration",o),console.log("[DEBUG] Duração do toast salva:",o),Te()}if(e.id==="toast-distance"){const o=parseInt(e.value)||80;localStorage.setItem("toastDistance",o),console.log("[DEBUG] Distância da borda salva:",o),Te()}if(e.id==="toast-max-queue"){const o=parseInt(e.value)||5;localStorage.setItem("toastMaxQueue",o),console.log("[DEBUG] Máximo de fila salvo:",o),Te()}if(e.id==="toast-anti-spam"){const o=parseInt(e.value)||500;localStorage.setItem("toastAntiSpam",o),console.log("[DEBUG] Anti-spam salvo:",o),Te()}if(e.id==="toast-offset"){const o=parseInt(e.value)||80;localStorage.setItem("toastOffset",o),console.log("[DEBUG] Offset do toast salvo:",o),Te()}if(e.id==="toast-cooldown"){const o=parseInt(e.value)||500;localStorage.setItem("toastCooldown",o),console.log("[DEBUG] Cooldown do toast salvo:",o),Te()}gn.delete(e.id)},1e3);gn.set(e.id,t)});document.addEventListener("blur",n=>{const e=n.target;if(gn.has(e.id)&&(clearTimeout(gn.get(e.id)),gn.delete(e.id)),e.id==="toast-duration"){const t=parseInt(e.value)||500;localStorage.setItem("toastDuration",t),console.log("[DEBUG] Duração do toast salva (blur):",t),Te()}if(e.id==="toast-distance"){const t=parseInt(e.value)||80;localStorage.setItem("toastDistance",t),console.log("[DEBUG] Distância da borda salva (blur):",t),Te()}if(e.id==="toast-max-queue"){const t=parseInt(e.value)||5;localStorage.setItem("toastMaxQueue",t),console.log("[DEBUG] Máximo de fila salvo (blur):",t),Te()}if(e.id==="toast-anti-spam"){const t=parseInt(e.value)||500;localStorage.setItem("toastAntiSpam",t),console.log("[DEBUG] Anti-spam salvo (blur):",t),Te()}if(e.id==="toast-offset"){const t=parseInt(e.value)||80;localStorage.setItem("toastOffset",t),console.log("[DEBUG] Offset do toast salvo (blur):",t),Te()}if(e.id==="toast-cooldown"){const t=parseInt(e.value)||500;localStorage.setItem("toastCooldown",t),console.log("[DEBUG] Cooldown do toast salvo (blur):",t),Te()}},!0);document.addEventListener("change",n=>{const e=n.target;if(e.id==="toast-position"){const t=e.value||"bottom";localStorage.setItem("toastPosition",t),console.log("[DEBUG] Posição do toast salva:",t),Te(),O().success(`Posição alterada para ${t}`)}if(e.id==="toast-alignment"){const t=e.value||"center";localStorage.setItem("toastAlignment",t),console.log("[DEBUG] Alinhamento do toast salvo:",t),Te(),O().success(`Alinhamento alterado para ${t}`)}if(e.id==="toast-align"){const t=e.value||"center";localStorage.setItem("toastAlign",t),console.log("[DEBUG] Alinhamento do toast salvo:",t),Te(),O().success(`Alinhamento alterado para ${t}`)}});window.attachDynamicHandlers=function(n=document){console.log("[DEBUG] attachDynamicHandlers chamado para:",n)};window.setupGlobalHandlers=function(){console.log("[DEBUG] setupGlobalHandlers chamado - handlers já estão configurados globalmente")};function ah(){console.log("[DEBUG] Inicializando configurações salvas..."),localStorage.getItem("compactModeEnabled")==="true"&&nr(!0);const e=localStorage.getItem("compactMode");e&&Ho(e);const t=localStorage.getItem("animationsEnabled");console.log("[DEBUG] Inicializando animações..."),console.log("[DEBUG] Valor do localStorage:",t),t==="false"?(document.body.classList.add("no-animations"),console.log("[DEBUG] Animações desabilitadas - classe no-animations adicionada")):(document.body.classList.remove("no-animations"),console.log("[DEBUG] Animações habilitadas - classe no-animations removida")),console.log("[DEBUG] Estado final das animações:",{localStorage:t,hasNoAnimations:document.body.classList.contains("no-animations"),bodyClasses:document.body.className});const o=localStorage.getItem("perfTelemetry");console.log("[DEBUG] Inicializando telemetria de performance..."),console.log("[DEBUG] Valor do localStorage:",o),o==="true"?R(()=>import("./perf-tobPnqr4.js"),[]).then(u=>{u.setEnabled(!0),console.log("[DEBUG] Telemetria de performance ativada")}).catch(u=>{console.warn("[DEBUG] Erro ao ativar telemetria:",u)}):console.log("[DEBUG] Telemetria de performance desabilitada"),console.log("[DEBUG] Inicializando configurações de privacidade e segurança...");const r=localStorage.getItem("biometricAuth");console.log("[DEBUG] Biometria:",r);const i=localStorage.getItem("autoSync");console.log("[DEBUG] Sincronização automática:",i);const s=localStorage.getItem("analyticsEnabled");console.log("[DEBUG] Analytics:",s),console.log("[DEBUG] Configurações de privacidade inicializadas");const c=document.getElementById("days-chunk-size");if(c){const u=localStorage.getItem("txChunkSize");u?(c.value=u,console.log("[DEBUG] Tamanho do bloco restaurado:",u)):(c.value="",console.log("[DEBUG] Modo automático ativado para tamanho do bloco"))}console.log("[DEBUG] Configurações salvas inicializadas")}function ch(){console.log("[DEBUG] Testando animações visualmente...");const n=document.createElement("div");n.id="animation-test-element",n.style.cssText=`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100px;
    height: 100px;
    background: linear-gradient(45deg, #3b82f6, #8b5cf6);
    border-radius: 50%;
    z-index: 10000;
    transition: all 0.5s ease;
    animation: pulse 1s infinite;
  `,document.body.appendChild(n),setTimeout(()=>{n.style.transform="translate(-50%, -50%) scale(1.5)",n.style.background="linear-gradient(45deg, #ef4444, #f59e0b)"},500),setTimeout(()=>{n.style.transform="translate(-50%, -50%) scale(0.5)",n.style.background="linear-gradient(45deg, #10b981, #06b6d4)"},1e3),setTimeout(()=>{n.parentNode&&n.parentNode.removeChild(n),console.log("[DEBUG] Teste visual de animações concluído")},2e3)}document.addEventListener("input",n=>{if(n.target.id==="days-chunk-size"){const e=n.target,t=e.value.trim();if(t!==""&&t.toLowerCase()!=="automático"){const o=parseInt(t);isNaN(o)||o<6||o>40?(e.style.borderColor="#ef4444",e.title="Valor inválido! Use um número entre 6 e 40 (recomendado 10-16)"):(e.style.borderColor="#10b981",e.title=`Carregará ${o} grupos de dias por vez`)}else e.style.borderColor="",e.title="Modo automático - sistema ajustará automaticamente"}});document.readyState==="loading"?document.addEventListener("DOMContentLoaded",ah):ah();let lh=!1;function gl(){return window.appState?.currentUser||window.appState?.user||null}function vs(){return window.appState?.currentBudget||null}function lD(n=new Date){return n.toISOString().split("T")[0]}function uD(n=new Date){const e=new Date(Date.UTC(n.getFullYear(),n.getMonth(),n.getDate())),t=e.getUTCDay()||7;e.setUTCDate(e.getUTCDate()+4-t);const o=new Date(Date.UTC(e.getUTCFullYear(),0,1)),r=Math.ceil(((e-o)/864e5+1)/7);return`${e.getUTCFullYear()}-W${String(r).padStart(2,"0")}`}async function dD(n){try{const e=gl(),t=vs();if(!e||!t)return;try{const o=await R(()=>import("./NotificationService-B-HO54SU.js"),[]);o&&typeof o.sendRecorrenteReminderNotification=="function"?(await o.sendRecorrenteReminderNotification(t.id,e.uid,n),console.log("[NotificationTriggers] Lembrete de recorrente enviado com sucesso")):(console.warn("[NotificationTriggers] Função sendRecorrenteReminderNotification não encontrada no módulo"),window.Snackbar&&typeof window.Snackbar.show=="function"&&window.Snackbar.show(`🔄 Lembrete: ${n.nome||"Despesa recorrente"} - R$ ${n.valor||0}`,"warning",5e3))}catch(o){console.warn("[NotificationTriggers] Erro ao importar NotificationService:",o),window.Snackbar&&typeof window.Snackbar.show=="function"&&window.Snackbar.show(`🔄 Lembrete: ${n.nome||"Despesa recorrente"} - R$ ${n.valor||0}`,"warning",5e3)}}catch(e){console.warn("[NotificationTriggers] Falha ao enviar lembrete recorrente",e),console.log("🔄 Lembrete de recorrente:",n)}}async function hD(n){try{const e=gl(),t=vs();if(!e||!t)return;try{const o=await R(()=>import("./NotificationService-B-HO54SU.js"),[]);o&&typeof o.sendWeeklySummaryNotification=="function"?(await o.sendWeeklySummaryNotification(t.id,e.uid,n),console.log("[NotificationTriggers] Resumo semanal enviado com sucesso")):(console.warn("[NotificationTriggers] Função sendWeeklySummaryNotification não encontrada no módulo"),window.Snackbar&&typeof window.Snackbar.show=="function"&&window.Snackbar.show(`📊 ${n.resumo}`,"info",5e3))}catch(o){console.warn("[NotificationTriggers] Erro ao importar NotificationService:",o),window.Snackbar&&typeof window.Snackbar.show=="function"&&window.Snackbar.show(`📊 ${n.resumo}`,"info",5e3)}}catch(e){console.warn("[NotificationTriggers] Falha ao enviar resumo semanal",e),console.log("📊 Resumo semanal:",n)}}function fD(){return localStorage.getItem("noti_recurring_reminders")==="true"}function gD(){return localStorage.getItem("noti_weekly_summary")==="true"}function pD(n){try{return R(()=>Promise.resolve().then(()=>Ep),void 0).then(e=>{const t=window.appState?.transactions||[];return e.calcularStatusRecorrente(n,t)})}catch{return Promise.resolve(null)}}async function mD(){if(!fD())return;const n=window.appState?.recorrentes||[];if(!vs()||n.length===0)return;const t=lD();for(const o of n){if(!o?.id||o.ativa===!1)continue;const r=`recorrenteReminder:lastSent:${o.id}:${t}`;if(!localStorage.getItem(r))try{const i=await pD(o);i&&i.foiEfetivadaEsteMes===!1&&(await dD(o),localStorage.setItem(r,Date.now().toString()),console.log("[NotificationTriggers] Lembrete enviado para recorrente",o.id))}catch(i){console.warn("[NotificationTriggers] Erro processamento recorrente",o.id,i)}}}function wD(){const n=window.appState?.transactions||[];if(!Array.isArray(n)||n.length===0)return null;const e=new Date,o=(e.getDay()+6)%7,r=new Date(e);r.setHours(0,0,0,0),r.setDate(r.getDate()-o);const i=new Date(r);i.setDate(i.getDate()-7);const s=new Date(i);s.setDate(s.getDate()+6),s.setHours(23,59,59,999);const c=n.filter(m=>{let S;if(m.createdAt?.seconds)S=new Date(m.createdAt.seconds*1e3);else if(m.createdAt)S=new Date(m.createdAt);else return!1;return S>=i&&S<=s});if(c.length===0)return null;let u=0,d=0;c.forEach(m=>{const S=Number(m.valor)||0;m.tipo==="receita"?d+=S:u+=S});const f=`Semana anterior: Receitas R$ ${d.toFixed(2)} | Despesas R$ ${u.toFixed(2)} | Saldo R$ ${(d-u).toFixed(2)}`,p=`${i.toLocaleDateString("pt-BR")} - ${s.toLocaleDateString("pt-BR")}`;return{resumo:f,periodo:p}}async function yD(){if(!gD())return;const n=vs(),e=gl();if(!n||!e)return;const t=new Date;if(t.getDay()!==1||t.getHours()<8)return;const r=uD(new Date(t.getTime()-7*864e5)),i=`weeklySummary:lastSent:${n.id}:${r}`;if(localStorage.getItem(i))return;const s=wD();s&&(await hD(s),localStorage.setItem(i,Date.now().toString()),console.log("[NotificationTriggers] Resumo semanal enviado",r))}async function qa(){try{await mD()}catch{}try{await yD()}catch{}}function _D(){window.__notificationIntervalsSetup||(window.__notificationIntervalsSetup=!0,setInterval(qa,3600*1e3),setTimeout(qa,8e3))}function uh(){setTimeout(qa,2e3)}function _m(){lh||(lh=!0,console.log("[NotificationTriggers] Inicializando schedulers de notificações"),_D(),A.on("transactions:updated",uh),A.on("recorrentes:updated",uh))}setTimeout(()=>{try{_m()}catch{}},5e3);window.initializeNotificationSchedulers=_m;const ln={"/":()=>R(()=>import("./index-IjmE10GR.js"),__vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10])).then(n=>({default:n.renderDashboard})),"/dashboard":()=>R(()=>import("./index-IjmE10GR.js"),__vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10])).then(n=>({default:n.renderDashboard})),"/transactions":()=>R(()=>import("./TransactionsPage-CwVPq0Gj.js"),__vite__mapDeps([2,1,3,4])),"/categories":()=>R(()=>import("./CategoriesPage-qPYCdC2c.js"),__vite__mapDeps([5,1,3])),"/recorrentes":()=>R(()=>import("./index-IjmE10GR.js"),__vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10])).then(n=>({default:n.renderRecorrentes})),"/analytics":()=>R(()=>import("./AnalyticsPage-CHHWapdp.js"),[]),"/notifications":()=>R(()=>import("./NotificationsPage-Crmk4UkV.js"),__vite__mapDeps([6,1,7])),"/settings":()=>R(()=>import("./SettingsPage-yG7SAOPp.js"),[])};async function vm(n){try{const e=(n||"/").split("?")[0]||"/",t=e==="/"?"/dashboard":e;console.log("🔄 Renderizando página:",t,"Rota original:",n);const o=document.getElementById("app-content");if(ln[t]){const r=await ln[t]();let i=null;if(typeof r=="function"?i=r:r&&typeof r.default=="function"?i=r.default:r&&typeof r.render=="function"?i=r.render:r&&typeof r.renderNotifications=="function"&&(i=r.renderNotifications),typeof i=="function"){await i(o);try{const{scrollToTop:s}=await R(async()=>{const{scrollToTop:c}=await Promise.resolve().then(()=>Hn);return{scrollToTop:c}},void 0);s()}catch{}try{const{renderFAB:s}=await R(async()=>{const{renderFAB:c}=await import("./index-IjmE10GR.js");return{renderFAB:c}},__vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10]));s()}catch(s){console.warn("FAB render falhou:",s)}try{const{renderBottomNav:s}=await R(async()=>{const{renderBottomNav:u}=await import("./index-IjmE10GR.js");return{renderBottomNav:u}},__vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10]));s(t==="/"?"/dashboard":t)}catch(s){console.warn("Bottom nav render falhou:",s)}try{const{SwipeNavigation:s}=await R(async()=>{const{SwipeNavigation:c}=await import("./SwipeTabs-VZ6UOvqM.js");return{SwipeNavigation:c}},[]);if(!window.swipeNavigation)console.log("🔄 Criando nova instância do SwipeNavigation..."),window.swipeNavigation=new s,console.log("✅ SwipeNavigation criado:",window.swipeNavigation);else{console.log("🔄 Atualizando SwipeNavigation existente...");try{window.swipeNavigation.updateCurrentTabIndex()}catch{}try{window.swipeNavigation.updateSwipeIndicator()}catch{}}}catch(s){console.warn("❌ Swipe Navigation não pôde ser inicializado/atualizado:",s)}console.log("✅ Página renderizada:",t)}else console.error("❌ Função de renderização não encontrada para:",t)}else if(console.warn("⚠️ Rota não encontrada:",t),ln["/dashboard"]){const r=await ln["/dashboard"]();await(r&&(r.default||r.render)||r)(o);try{const{scrollToTop:s}=await R(async()=>{const{scrollToTop:c}=await Promise.resolve().then(()=>Hn);return{scrollToTop:c}},void 0);s()}catch{}try{const{renderBottomNav:s}=await R(async()=>{const{renderBottomNav:c}=await import("./index-IjmE10GR.js");return{renderBottomNav:c}},__vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10]));s("/dashboard")}catch(s){console.warn("Bottom nav render (fallback) falhou:",s)}try{const{SwipeNavigation:s}=await R(async()=>{const{SwipeNavigation:c}=await import("./SwipeTabs-VZ6UOvqM.js");return{SwipeNavigation:c}},[]);if(!window.swipeNavigation)window.swipeNavigation=new s;else{try{window.swipeNavigation.updateCurrentTabIndex()}catch{}try{window.swipeNavigation.updateSwipeIndicator()}catch{}}}catch(s){console.warn("Swipe Navigation (fallback) não pôde ser inicializado:",s)}}}catch(e){console.error("❌ Erro ao renderizar página:",n,e);try{const t=document.getElementById("app-content");if(ln["/dashboard"]){const o=await ln["/dashboard"]();await(o&&(o.default||o.render)||o)(t);try{const{scrollToTop:i}=await R(async()=>{const{scrollToTop:s}=await Promise.resolve().then(()=>Hn);return{scrollToTop:s}},void 0);i()}catch{}try{const{renderBottomNav:i}=await R(async()=>{const{renderBottomNav:s}=await import("./index-IjmE10GR.js");return{renderBottomNav:s}},__vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10]));i("/dashboard")}catch(i){console.warn("Bottom nav render (fallback catch) falhou:",i)}try{const{SwipeNavigation:i}=await R(async()=>{const{SwipeNavigation:s}=await import("./SwipeTabs-VZ6UOvqM.js");return{SwipeNavigation:s}},[]);if(!window.swipeNavigation)window.swipeNavigation=new i;else{try{window.swipeNavigation.updateCurrentTabIndex()}catch{}try{window.swipeNavigation.updateSwipeIndicator()}catch{}}}catch(i){console.warn("Swipe Navigation (fallback catch) não pôde ser inicializado:",i)}}}catch(t){console.error("❌ Erro no fallback para dashboard:",t)}}}const MD=Object.freeze(Object.defineProperty({__proto__:null,renderPage:vm,routes:ln},Symbol.toStringTag,{value:"Module"}));async function vD(){try{await nD();try{(()=>{const o=(window.location.hash||"").split("?")[0];(!o||o==="#"||o==="#/")&&(window.location.hash="#/dashboard")})()}catch{}async function n(){const o=((window.location.hash||"").split("?")[0].replace("#","")||"/").trim();try{const{scrollToTop:r}=await R(async()=>{const{scrollToTop:i}=await Promise.resolve().then(()=>Hn);return{scrollToTop:i}},void 0);r(!0)}catch{}try{const r=await R(()=>Promise.resolve().then(()=>Hn),void 0),i=r.parseYmFromHash(),s=r.getSelectedPeriod();i&&(i.year!==s.year||i.month!==s.month)?r.setSelectedPeriod(i.year,i.month):i||r.ensureHashHasYm(s.year,s.month)}catch{}try{await vm(o)}catch(r){B.error("route error",r)}}window.addEventListener("hashchange",()=>{n()}),n();try{typeof history<"u"&&"scrollRestoration"in history&&(history.scrollRestoration="manual")}catch{}window.addEventListener("beforeunload",sD),B.info("Aplicação bootstrapada com sucesso")}catch(n){B.error("Erro no bootstrap:",n)}}function Em(){console.log("🎨 Configurando toggle de tema...");const n=document.getElementById("theme-toggle-btn");if(!n){xi();return}if(window.__themeToggleWired){console.log("⏭️ Toggle de tema já configurado");return}window.__themeToggleWired=!0,n.addEventListener("click",()=>{console.log("🎨 Toggle de tema clicado"),bm()}),xi(),console.log("✅ Toggle de tema configurado")}function bm(){try{const n=localStorage.getItem("theme")||"light",e=n==="light"?"dark":"light";console.log("🎨 Alternando tema:",{de:n,para:e}),localStorage.setItem("theme",e),pl(e),A.emit("theme:changed",e),Tm(e),console.log("✅ Tema alterado para:",e)}catch(n){console.error("❌ Erro ao alternar tema:",n)}}function pl(n){try{const e=document.documentElement;n==="dark"?(e.classList.add("dark"),e.classList.remove("light")):(e.classList.add("light"),e.classList.remove("dark")),document.body.className=document.body.className.replace(/theme-\w+/g,"").trim(),document.body.classList.add(`theme-${n}`),console.log("✅ Tema aplicado:",n)}catch(e){console.error("❌ Erro ao aplicar tema:",e)}}function xi(){try{const n=localStorage.getItem("theme")||"light";pl(n),Tm(n),console.log("✅ Tema atual aplicado:",n)}catch(n){console.error("❌ Erro ao aplicar tema atual:",n)}}function Tm(n){try{const e=document.getElementById("theme-toggle-btn");if(!e)return;const t=e.querySelector(".theme-icon");t&&(t.textContent=n==="dark"?"☀️":"🌙",t.setAttribute("title",n==="dark"?"Mudar para modo claro":"Mudar para modo escuro"))}catch(e){console.error("❌ Erro ao atualizar ícone do tema:",e)}}function ml(){try{localStorage.getItem("compactMode")==="true"?(document.body.classList.add("compact-mode"),console.log("✅ Modo compacto aplicado")):(document.body.classList.remove("compact-mode"),console.log("✅ Modo normal aplicado"))}catch(n){console.error("❌ Erro ao aplicar modo compacto:",n)}}function ED(){try{const e=!(localStorage.getItem("compactMode")==="true");localStorage.setItem("compactMode",e.toString()),ml(),A.emit("compactMode:changed",e),console.log("✅ Modo compacto alterado para:",e)}catch(n){console.error("❌ Erro ao alternar modo compacto:",n)}}function bD(){return localStorage.getItem("theme")||"light"}function TD(){return localStorage.getItem("compactMode")==="true"}function Im(){try{xi(),ml(),console.log("✅ Configurações de tema aplicadas")}catch(n){console.error("❌ Erro ao aplicar configurações de tema:",n)}}const OD=Object.freeze(Object.defineProperty({__proto__:null,applyCompactMode:ml,applyCurrentTheme:xi,applyTheme:pl,applyThemeSettings:Im,getCurrentCompactMode:TD,getCurrentTheme:bD,setupThemeToggle:Em,toggleCompactMode:ED,toggleTheme:bm},Symbol.toStringTag,{value:"Module"}));document.addEventListener("DOMContentLoaded",async()=>{try{B.info("DOM carregado, iniciando aplicação...");try{const n=document.getElementById("voice-modal");n&&(n.style.display="none",n.style.pointerEvents="none",n.style.background="rgba(0, 0, 0, 0)",n.style.backdropFilter="blur(0px)")}catch{}try{document.body.classList.add("mobile-ui")}catch{}try{Im()}catch(n){B.warn("Falha ao aplicar configurações de tema iniciais:",n)}try{const e=(window.location.hash||"").split("?")[0];(!e||e==="#"||e==="#/")&&(window.location.hash="#/dashboard")}catch{}try{const{setupLoginButton:n,checkAuthState:e}=await R(async()=>{const{setupLoginButton:t,checkAuthState:o}=await import("./index-IjmE10GR.js");return{setupLoginButton:t,checkAuthState:o}},__vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10]));n(),await e()}catch(n){B.warn("Falha ao configurar login/estado de auth:",n)}await vD();try{Em()}catch(n){B.warn("Falha ao configurar toggle de tema pós-bootstrap:",n)}}catch(n){B.error("Erro fatal ao inicializar aplicação:",n),document.body.innerHTML=`
      <div style="padding: 2rem; text-align: center; color: #ef4444;">
        <h1>Erro ao carregar aplicação</h1>
        <p>${n.message}</p>
        <button onclick="location.reload()" style="padding: 0.5rem 1rem; background: #3b82f6; color: white; border: none; border-radius: 0.5rem; cursor: pointer;">
          Tentar novamente
        </button>
      </div>
    `}});window.addEventListener("online",()=>{B.info("Aplicação online"),document.body.classList.remove("offline")});window.addEventListener("offline",()=>{B.info("Aplicação offline"),document.body.classList.add("offline")});Zp();try{window.deferredPrompt=null,window.addEventListener("beforeinstallprompt",n=>{try{n.preventDefault()}catch{}try{window.deferredPrompt=n}catch{}try{window.updateInstallButton&&window.updateInstallButton()}catch{}}),window.addEventListener("appinstalled",()=>{try{window.deferredPrompt=null}catch{}try{window.Snackbar?.({message:"App instalado com sucesso",type:"success"})}catch{}try{window.updateInstallButton&&window.updateInstallButton()}catch{}}),typeof window.installApp!="function"&&(window.installApp=async function(){try{const n=window.deferredPrompt;if(!n)return window.Snackbar?.({message:"Instalação não disponível neste momento",type:"warning"}),!1;n.prompt();const e=await n.userChoice.catch(()=>({outcome:"dismissed"}));e&&e.outcome==="accepted"?window.Snackbar?.({message:"Instalação iniciada",type:"success"}):window.Snackbar?.({message:"Instalação cancelada",type:"info"});try{window.deferredPrompt=null}catch{}try{window.updateInstallButton&&window.updateInstallButton()}catch{}return e?.outcome==="accepted"}catch(n){return console.warn("installApp error:",n),window.Snackbar?.({message:"Falha ao solicitar instalação",type:"error"}),!1}})}catch{}const VD=Object.freeze(Object.defineProperty({__proto__:null,get analytics(){return Hc},app:Sr,auth:gs,db:ee},Symbol.toStringTag,{value:"Module"}));export{AD as $,vA as A,EA as B,cl as C,VS as D,US as E,xS as F,Lt as G,ID as H,gs as I,kD as J,TS as K,IS as L,om as M,SS as N,Em as O,bm as P,pl as Q,xi as R,ve as S,ml as T,ED as U,bD as V,TD as W,Im as X,Ye as Y,Rn as Z,R as _,fe as a,DD as a0,CD as a1,RD as a2,Ep as a3,ce as a4,ND as a5,PD as a6,_s as a7,ZA as a8,MD as a9,OD as aa,VD as ab,br as b,me as c,ee as d,A as e,QT as f,wt as g,tm as h,vp as i,nm as j,YT as k,xa as l,_A as m,Eo as n,tn as o,fl as p,Re as q,hl as r,ds as s,fi as t,en as u,LS as v,Ae as w,wA as x,yA as y,bA as z};

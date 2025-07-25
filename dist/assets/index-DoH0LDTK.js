(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const a of i.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&r(a)}).observe(document,{childList:!0,subtree:!0});function t(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(s){if(s.ep)return;s.ep=!0;const i=t(s);fetch(s.href,i)}})();const wf=()=>{};var Sc={};/**
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
 */const nu=function(n){const e=[];let t=0;for(let r=0;r<n.length;r++){let s=n.charCodeAt(r);s<128?e[t++]=s:s<2048?(e[t++]=s>>6|192,e[t++]=s&63|128):(s&64512)===55296&&r+1<n.length&&(n.charCodeAt(r+1)&64512)===56320?(s=65536+((s&1023)<<10)+(n.charCodeAt(++r)&1023),e[t++]=s>>18|240,e[t++]=s>>12&63|128,e[t++]=s>>6&63|128,e[t++]=s&63|128):(e[t++]=s>>12|224,e[t++]=s>>6&63|128,e[t++]=s&63|128)}return e},vf=function(n){const e=[];let t=0,r=0;for(;t<n.length;){const s=n[t++];if(s<128)e[r++]=String.fromCharCode(s);else if(s>191&&s<224){const i=n[t++];e[r++]=String.fromCharCode((s&31)<<6|i&63)}else if(s>239&&s<365){const i=n[t++],a=n[t++],u=n[t++],d=((s&7)<<18|(i&63)<<12|(a&63)<<6|u&63)-65536;e[r++]=String.fromCharCode(55296+(d>>10)),e[r++]=String.fromCharCode(56320+(d&1023))}else{const i=n[t++],a=n[t++];e[r++]=String.fromCharCode((s&15)<<12|(i&63)<<6|a&63)}}return e.join("")},ru={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,e){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();const t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let s=0;s<n.length;s+=3){const i=n[s],a=s+1<n.length,u=a?n[s+1]:0,d=s+2<n.length,f=d?n[s+2]:0,c=i>>2,w=(i&3)<<4|u>>4;let _=(u&15)<<2|f>>6,x=f&63;d||(x=64,a||(_=64)),r.push(t[c],t[w],t[_],t[x])}return r.join("")},encodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(n):this.encodeByteArray(nu(n),e)},decodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(n):vf(this.decodeStringToByteArray(n,e))},decodeStringToByteArray(n,e){this.init_();const t=e?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let s=0;s<n.length;){const i=t[n.charAt(s++)],u=s<n.length?t[n.charAt(s)]:0;++s;const f=s<n.length?t[n.charAt(s)]:64;++s;const w=s<n.length?t[n.charAt(s)]:64;if(++s,i==null||u==null||f==null||w==null)throw new bf;const _=i<<2|u>>4;if(r.push(_),f!==64){const x=u<<4&240|f>>2;if(r.push(x),w!==64){const C=f<<6&192|w;r.push(C)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}};class bf extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const Ef=function(n){const e=nu(n);return ru.encodeByteArray(e,!0)},vs=function(n){return Ef(n).replace(/\./g,"")},su=function(n){try{return ru.decodeString(n,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
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
 */function Tf(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
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
 */const If=()=>Tf().__FIREBASE_DEFAULTS__,Af=()=>{if(typeof process>"u"||typeof Sc>"u")return;const n=Sc.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},xf=()=>{if(typeof document>"u")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=n&&su(n[1]);return e&&JSON.parse(e)},Bs=()=>{try{return wf()||If()||Af()||xf()}catch(n){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);return}},iu=n=>Bs()?.emulatorHosts?.[n],Sf=n=>{const e=iu(n);if(!e)return;const t=e.lastIndexOf(":");if(t<=0||t+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const r=parseInt(e.substring(t+1),10);return e[0]==="["?[e.substring(1,t-1),r]:[e.substring(0,t),r]},ou=()=>Bs()?.config,au=n=>Bs()?.[`_${n}`];/**
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
 */class Rf{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,r)=>{t?this.reject(t):this.resolve(r),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,r))}}}/**
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
 */function Sn(n){try{return(n.startsWith("http://")||n.startsWith("https://")?new URL(n).hostname:n).endsWith(".cloudworkstations.dev")}catch{return!1}}async function cu(n){return(await fetch(n,{credentials:"include"})).ok}/**
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
 */function Cf(n,e){if(n.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const t={alg:"none",type:"JWT"},r=e||"demo-project",s=n.iat||0,i=n.sub||n.user_id;if(!i)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const a={iss:`https://securetoken.google.com/${r}`,aud:r,iat:s,exp:s+3600,auth_time:s,sub:i,user_id:i,firebase:{sign_in_provider:"custom",identities:{}},...n};return[vs(JSON.stringify(t)),vs(JSON.stringify(a)),""].join(".")}const rr={};function Pf(){const n={prod:[],emulator:[]};for(const e of Object.keys(rr))rr[e]?n.emulator.push(e):n.prod.push(e);return n}function kf(n){let e=document.getElementById(n),t=!1;return e||(e=document.createElement("div"),e.setAttribute("id",n),t=!0),{created:t,element:e}}let Rc=!1;function lu(n,e){if(typeof window>"u"||typeof document>"u"||!Sn(window.location.host)||rr[n]===e||rr[n]||Rc)return;rr[n]=e;function t(_){return`__firebase__banner__${_}`}const r="__firebase__banner",i=Pf().prod.length>0;function a(){const _=document.getElementById(r);_&&_.remove()}function u(_){_.style.display="flex",_.style.background="#7faaf0",_.style.position="fixed",_.style.bottom="5px",_.style.left="5px",_.style.padding=".5em",_.style.borderRadius="5px",_.style.alignItems="center"}function d(_,x){_.setAttribute("width","24"),_.setAttribute("id",x),_.setAttribute("height","24"),_.setAttribute("viewBox","0 0 24 24"),_.setAttribute("fill","none"),_.style.marginLeft="-6px"}function f(){const _=document.createElement("span");return _.style.cursor="pointer",_.style.marginLeft="16px",_.style.fontSize="24px",_.innerHTML=" &times;",_.onclick=()=>{Rc=!0,a()},_}function c(_,x){_.setAttribute("id",x),_.innerText="Learn more",_.href="https://firebase.google.com/docs/studio/preview-apps#preview-backend",_.setAttribute("target","__blank"),_.style.paddingLeft="5px",_.style.textDecoration="underline"}function w(){const _=kf(r),x=t("text"),C=document.getElementById(x)||document.createElement("span"),D=t("learnmore"),P=document.getElementById(D)||document.createElement("a"),M=t("preprendIcon"),F=document.getElementById(M)||document.createElementNS("http://www.w3.org/2000/svg","svg");if(_.created){const j=_.element;u(j),c(P,D);const ee=f();d(F,M),j.append(F,C,P,ee),document.body.appendChild(j)}i?(C.innerText="Preview backend disconnected.",F.innerHTML=`<g clip-path="url(#clip0_6013_33858)">
<path d="M4.8 17.6L12 5.6L19.2 17.6H4.8ZM6.91667 16.4H17.0833L12 7.93333L6.91667 16.4ZM12 15.6C12.1667 15.6 12.3056 15.5444 12.4167 15.4333C12.5389 15.3111 12.6 15.1667 12.6 15C12.6 14.8333 12.5389 14.6944 12.4167 14.5833C12.3056 14.4611 12.1667 14.4 12 14.4C11.8333 14.4 11.6889 14.4611 11.5667 14.5833C11.4556 14.6944 11.4 14.8333 11.4 15C11.4 15.1667 11.4556 15.3111 11.5667 15.4333C11.6889 15.5444 11.8333 15.6 12 15.6ZM11.4 13.6H12.6V10.4H11.4V13.6Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6013_33858">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`):(F.innerHTML=`<g clip-path="url(#clip0_6083_34804)">
<path d="M11.4 15.2H12.6V11.2H11.4V15.2ZM12 10C12.1667 10 12.3056 9.94444 12.4167 9.83333C12.5389 9.71111 12.6 9.56667 12.6 9.4C12.6 9.23333 12.5389 9.09444 12.4167 8.98333C12.3056 8.86111 12.1667 8.8 12 8.8C11.8333 8.8 11.6889 8.86111 11.5667 8.98333C11.4556 9.09444 11.4 9.23333 11.4 9.4C11.4 9.56667 11.4556 9.71111 11.5667 9.83333C11.6889 9.94444 11.8333 10 12 10ZM12 18.4C11.1222 18.4 10.2944 18.2333 9.51667 17.9C8.73889 17.5667 8.05556 17.1111 7.46667 16.5333C6.88889 15.9444 6.43333 15.2611 6.1 14.4833C5.76667 13.7056 5.6 12.8778 5.6 12C5.6 11.1111 5.76667 10.2833 6.1 9.51667C6.43333 8.73889 6.88889 8.06111 7.46667 7.48333C8.05556 6.89444 8.73889 6.43333 9.51667 6.1C10.2944 5.76667 11.1222 5.6 12 5.6C12.8889 5.6 13.7167 5.76667 14.4833 6.1C15.2611 6.43333 15.9389 6.89444 16.5167 7.48333C17.1056 8.06111 17.5667 8.73889 17.9 9.51667C18.2333 10.2833 18.4 11.1111 18.4 12C18.4 12.8778 18.2333 13.7056 17.9 14.4833C17.5667 15.2611 17.1056 15.9444 16.5167 16.5333C15.9389 17.1111 15.2611 17.5667 14.4833 17.9C13.7167 18.2333 12.8889 18.4 12 18.4ZM12 17.2C13.4444 17.2 14.6722 16.6944 15.6833 15.6833C16.6944 14.6722 17.2 13.4444 17.2 12C17.2 10.5556 16.6944 9.32778 15.6833 8.31667C14.6722 7.30555 13.4444 6.8 12 6.8C10.5556 6.8 9.32778 7.30555 8.31667 8.31667C7.30556 9.32778 6.8 10.5556 6.8 12C6.8 13.4444 7.30556 14.6722 8.31667 15.6833C9.32778 16.6944 10.5556 17.2 12 17.2Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6083_34804">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`,C.innerText="Preview backend running in this workspace."),C.setAttribute("id",x)}document.readyState==="loading"?window.addEventListener("DOMContentLoaded",w):w()}/**
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
 */function Re(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function Df(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(Re())}function Vf(){const n=Bs()?.forceEnvironment;if(n==="node")return!0;if(n==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function Nf(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function Of(){const n=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof n=="object"&&n.id!==void 0}function Mf(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function Lf(){const n=Re();return n.indexOf("MSIE ")>=0||n.indexOf("Trident/")>=0}function Ff(){return!Vf()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function Uf(){try{return typeof indexedDB=="object"}catch{return!1}}function Bf(){return new Promise((n,e)=>{try{let t=!0;const r="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(r);s.onsuccess=()=>{s.result.close(),t||self.indexedDB.deleteDatabase(r),n(!0)},s.onupgradeneeded=()=>{t=!1},s.onerror=()=>{e(s.error?.message||"")}}catch(t){e(t)}})}/**
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
 */const $f="FirebaseError";class ft extends Error{constructor(e,t,r){super(t),this.code=e,this.customData=r,this.name=$f,Object.setPrototypeOf(this,ft.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,br.prototype.create)}}class br{constructor(e,t,r){this.service=e,this.serviceName=t,this.errors=r}create(e,...t){const r=t[0]||{},s=`${this.service}/${e}`,i=this.errors[e],a=i?qf(i,r):"Error",u=`${this.serviceName}: ${a} (${s}).`;return new ft(s,u,r)}}function qf(n,e){return n.replace(jf,(t,r)=>{const s=e[r];return s!=null?String(s):`<${r}?>`})}const jf=/\{\$([^}]+)}/g;function zf(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}function Xt(n,e){if(n===e)return!0;const t=Object.keys(n),r=Object.keys(e);for(const s of t){if(!r.includes(s))return!1;const i=n[s],a=e[s];if(Cc(i)&&Cc(a)){if(!Xt(i,a))return!1}else if(i!==a)return!1}for(const s of r)if(!t.includes(s))return!1;return!0}function Cc(n){return n!==null&&typeof n=="object"}/**
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
 */function Er(n){const e=[];for(const[t,r]of Object.entries(n))Array.isArray(r)?r.forEach(s=>{e.push(encodeURIComponent(t)+"="+encodeURIComponent(s))}):e.push(encodeURIComponent(t)+"="+encodeURIComponent(r));return e.length?"&"+e.join("&"):""}function Hf(n,e){const t=new Gf(n,e);return t.subscribe.bind(t)}class Gf{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(r=>{this.error(r)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,r){let s;if(e===void 0&&t===void 0&&r===void 0)throw new Error("Missing Observer.");Wf(e,["next","error","complete"])?s=e:s={next:e,error:t,complete:r},s.next===void 0&&(s.next=Oi),s.error===void 0&&(s.error=Oi),s.complete===void 0&&(s.complete=Oi);const i=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?s.error(this.finalError):s.complete()}catch{}}),this.observers.push(s),i}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{t(this.observers[e])}catch(r){typeof console<"u"&&console.error&&console.error(r)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function Wf(n,e){if(typeof n!="object"||n===null)return!1;for(const t of e)if(t in n&&typeof n[t]=="function")return!0;return!1}function Oi(){}/**
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
 */function he(n){return n&&n._delegate?n._delegate:n}class Jt{constructor(e,t,r){this.name=e,this.instanceFactory=t,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
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
 */const zt="[DEFAULT]";/**
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
 */class Kf{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const r=new Rf;if(this.instancesDeferred.set(t,r),this.isInitialized(t)||this.shouldAutoInitialize())try{const s=this.getOrInitializeService({instanceIdentifier:t});s&&r.resolve(s)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){const t=this.normalizeInstanceIdentifier(e?.identifier),r=e?.optional??!1;if(this.isInitialized(t)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:t})}catch(s){if(r)return null;throw s}else{if(r)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(Xf(e))try{this.getOrInitializeService({instanceIdentifier:zt})}catch{}for(const[t,r]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(t);try{const i=this.getOrInitializeService({instanceIdentifier:s});r.resolve(i)}catch{}}}}clearInstance(e=zt){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=zt){return this.instances.has(e)}getOptions(e=zt){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,r=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:r,options:t});for(const[i,a]of this.instancesDeferred.entries()){const u=this.normalizeInstanceIdentifier(i);r===u&&a.resolve(s)}return s}onInit(e,t){const r=this.normalizeInstanceIdentifier(t),s=this.onInitCallbacks.get(r)??new Set;s.add(e),this.onInitCallbacks.set(r,s);const i=this.instances.get(r);return i&&e(i,r),()=>{s.delete(e)}}invokeOnInitCallbacks(e,t){const r=this.onInitCallbacks.get(t);if(r)for(const s of r)try{s(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let r=this.instances.get(e);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:Qf(e),options:t}),this.instances.set(e,r),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(r,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,r)}catch{}return r||null}normalizeInstanceIdentifier(e=zt){return this.component?this.component.multipleInstances?e:zt:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function Qf(n){return n===zt?void 0:n}function Xf(n){return n.instantiationMode==="EAGER"}/**
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
 */class Jf{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new Kf(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}/**
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
 */var z;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})(z||(z={}));const Yf={debug:z.DEBUG,verbose:z.VERBOSE,info:z.INFO,warn:z.WARN,error:z.ERROR,silent:z.SILENT},Zf=z.INFO,ep={[z.DEBUG]:"log",[z.VERBOSE]:"log",[z.INFO]:"info",[z.WARN]:"warn",[z.ERROR]:"error"},tp=(n,e,...t)=>{if(e<n.logLevel)return;const r=new Date().toISOString(),s=ep[e];if(s)console[s](`[${r}]  ${n.name}:`,...t);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class So{constructor(e){this.name=e,this._logLevel=Zf,this._logHandler=tp,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in z))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?Yf[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,z.DEBUG,...e),this._logHandler(this,z.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,z.VERBOSE,...e),this._logHandler(this,z.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,z.INFO,...e),this._logHandler(this,z.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,z.WARN,...e),this._logHandler(this,z.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,z.ERROR,...e),this._logHandler(this,z.ERROR,...e)}}const np=(n,e)=>e.some(t=>n instanceof t);let Pc,kc;function rp(){return Pc||(Pc=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function sp(){return kc||(kc=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const uu=new WeakMap,Xi=new WeakMap,du=new WeakMap,Mi=new WeakMap,Ro=new WeakMap;function ip(n){const e=new Promise((t,r)=>{const s=()=>{n.removeEventListener("success",i),n.removeEventListener("error",a)},i=()=>{t(Tt(n.result)),s()},a=()=>{r(n.error),s()};n.addEventListener("success",i),n.addEventListener("error",a)});return e.then(t=>{t instanceof IDBCursor&&uu.set(t,n)}).catch(()=>{}),Ro.set(e,n),e}function op(n){if(Xi.has(n))return;const e=new Promise((t,r)=>{const s=()=>{n.removeEventListener("complete",i),n.removeEventListener("error",a),n.removeEventListener("abort",a)},i=()=>{t(),s()},a=()=>{r(n.error||new DOMException("AbortError","AbortError")),s()};n.addEventListener("complete",i),n.addEventListener("error",a),n.addEventListener("abort",a)});Xi.set(n,e)}let Ji={get(n,e,t){if(n instanceof IDBTransaction){if(e==="done")return Xi.get(n);if(e==="objectStoreNames")return n.objectStoreNames||du.get(n);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return Tt(n[e])},set(n,e,t){return n[e]=t,!0},has(n,e){return n instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in n}};function ap(n){Ji=n(Ji)}function cp(n){return n===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){const r=n.call(Li(this),e,...t);return du.set(r,e.sort?e.sort():[e]),Tt(r)}:sp().includes(n)?function(...e){return n.apply(Li(this),e),Tt(uu.get(this))}:function(...e){return Tt(n.apply(Li(this),e))}}function lp(n){return typeof n=="function"?cp(n):(n instanceof IDBTransaction&&op(n),np(n,rp())?new Proxy(n,Ji):n)}function Tt(n){if(n instanceof IDBRequest)return ip(n);if(Mi.has(n))return Mi.get(n);const e=lp(n);return e!==n&&(Mi.set(n,e),Ro.set(e,n)),e}const Li=n=>Ro.get(n);function up(n,e,{blocked:t,upgrade:r,blocking:s,terminated:i}={}){const a=indexedDB.open(n,e),u=Tt(a);return r&&a.addEventListener("upgradeneeded",d=>{r(Tt(a.result),d.oldVersion,d.newVersion,Tt(a.transaction),d)}),t&&a.addEventListener("blocked",d=>t(d.oldVersion,d.newVersion,d)),u.then(d=>{i&&d.addEventListener("close",()=>i()),s&&d.addEventListener("versionchange",f=>s(f.oldVersion,f.newVersion,f))}).catch(()=>{}),u}const dp=["get","getKey","getAll","getAllKeys","count"],hp=["put","add","delete","clear"],Fi=new Map;function Dc(n,e){if(!(n instanceof IDBDatabase&&!(e in n)&&typeof e=="string"))return;if(Fi.get(e))return Fi.get(e);const t=e.replace(/FromIndex$/,""),r=e!==t,s=hp.includes(t);if(!(t in(r?IDBIndex:IDBObjectStore).prototype)||!(s||dp.includes(t)))return;const i=async function(a,...u){const d=this.transaction(a,s?"readwrite":"readonly");let f=d.store;return r&&(f=f.index(u.shift())),(await Promise.all([f[t](...u),s&&d.done]))[0]};return Fi.set(e,i),i}ap(n=>({...n,get:(e,t,r)=>Dc(e,t)||n.get(e,t,r),has:(e,t)=>!!Dc(e,t)||n.has(e,t)}));/**
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
 */class fp{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(pp(t)){const r=t.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(t=>t).join(" ")}}function pp(n){return n.getComponent()?.type==="VERSION"}const Yi="@firebase/app",Vc="0.14.0";/**
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
 */const ct=new So("@firebase/app"),mp="@firebase/app-compat",gp="@firebase/analytics-compat",yp="@firebase/analytics",_p="@firebase/app-check-compat",wp="@firebase/app-check",vp="@firebase/auth",bp="@firebase/auth-compat",Ep="@firebase/database",Tp="@firebase/data-connect",Ip="@firebase/database-compat",Ap="@firebase/functions",xp="@firebase/functions-compat",Sp="@firebase/installations",Rp="@firebase/installations-compat",Cp="@firebase/messaging",Pp="@firebase/messaging-compat",kp="@firebase/performance",Dp="@firebase/performance-compat",Vp="@firebase/remote-config",Np="@firebase/remote-config-compat",Op="@firebase/storage",Mp="@firebase/storage-compat",Lp="@firebase/firestore",Fp="@firebase/ai",Up="@firebase/firestore-compat",Bp="firebase",$p="12.0.0";/**
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
 */const Zi="[DEFAULT]",qp={[Yi]:"fire-core",[mp]:"fire-core-compat",[yp]:"fire-analytics",[gp]:"fire-analytics-compat",[wp]:"fire-app-check",[_p]:"fire-app-check-compat",[vp]:"fire-auth",[bp]:"fire-auth-compat",[Ep]:"fire-rtdb",[Tp]:"fire-data-connect",[Ip]:"fire-rtdb-compat",[Ap]:"fire-fn",[xp]:"fire-fn-compat",[Sp]:"fire-iid",[Rp]:"fire-iid-compat",[Cp]:"fire-fcm",[Pp]:"fire-fcm-compat",[kp]:"fire-perf",[Dp]:"fire-perf-compat",[Vp]:"fire-rc",[Np]:"fire-rc-compat",[Op]:"fire-gcs",[Mp]:"fire-gcs-compat",[Lp]:"fire-fst",[Up]:"fire-fst-compat",[Fp]:"fire-vertex","fire-js":"fire-js",[Bp]:"fire-js-all"};/**
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
 */const bs=new Map,jp=new Map,eo=new Map;function Nc(n,e){try{n.container.addComponent(e)}catch(t){ct.debug(`Component ${e.name} failed to register with FirebaseApp ${n.name}`,t)}}function wn(n){const e=n.name;if(eo.has(e))return ct.debug(`There were multiple attempts to register component ${e}.`),!1;eo.set(e,n);for(const t of bs.values())Nc(t,n);for(const t of jp.values())Nc(t,n);return!0}function Co(n,e){const t=n.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),n.container.getProvider(e)}function qe(n){return n==null?!1:n.settings!==void 0}/**
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
 */const zp={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},It=new br("app","Firebase",zp);/**
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
 */class Hp{constructor(e,t,r){this._isDeleted=!1,this._options={...e},this._config={...t},this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new Jt("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw It.create("app-deleted",{appName:this._name})}}/**
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
 */const Rn=$p;function hu(n,e={}){let t=n;typeof e!="object"&&(e={name:e});const r={name:Zi,automaticDataCollectionEnabled:!0,...e},s=r.name;if(typeof s!="string"||!s)throw It.create("bad-app-name",{appName:String(s)});if(t||(t=ou()),!t)throw It.create("no-options");const i=bs.get(s);if(i){if(Xt(t,i.options)&&Xt(r,i.config))return i;throw It.create("duplicate-app",{appName:s})}const a=new Jf(s);for(const d of eo.values())a.addComponent(d);const u=new Hp(t,r,a);return bs.set(s,u),u}function fu(n=Zi){const e=bs.get(n);if(!e&&n===Zi&&ou())return hu();if(!e)throw It.create("no-app",{appName:n});return e}function At(n,e,t){let r=qp[n]??n;t&&(r+=`-${t}`);const s=r.match(/\s|\//),i=e.match(/\s|\//);if(s||i){const a=[`Unable to register library "${r}" with version "${e}":`];s&&a.push(`library name "${r}" contains illegal characters (whitespace or "/")`),s&&i&&a.push("and"),i&&a.push(`version name "${e}" contains illegal characters (whitespace or "/")`),ct.warn(a.join(" "));return}wn(new Jt(`${r}-version`,()=>({library:r,version:e}),"VERSION"))}/**
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
 */const Gp="firebase-heartbeat-database",Wp=1,lr="firebase-heartbeat-store";let Ui=null;function pu(){return Ui||(Ui=up(Gp,Wp,{upgrade:(n,e)=>{switch(e){case 0:try{n.createObjectStore(lr)}catch(t){console.warn(t)}}}}).catch(n=>{throw It.create("idb-open",{originalErrorMessage:n.message})})),Ui}async function Kp(n){try{const t=(await pu()).transaction(lr),r=await t.objectStore(lr).get(mu(n));return await t.done,r}catch(e){if(e instanceof ft)ct.warn(e.message);else{const t=It.create("idb-get",{originalErrorMessage:e?.message});ct.warn(t.message)}}}async function Oc(n,e){try{const r=(await pu()).transaction(lr,"readwrite");await r.objectStore(lr).put(e,mu(n)),await r.done}catch(t){if(t instanceof ft)ct.warn(t.message);else{const r=It.create("idb-set",{originalErrorMessage:t?.message});ct.warn(r.message)}}}function mu(n){return`${n.name}!${n.options.appId}`}/**
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
 */const Qp=1024,Xp=30;class Jp{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new Zp(t),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){try{const t=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),r=Mc();if(this._heartbeatsCache?.heartbeats==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null)||this._heartbeatsCache.lastSentHeartbeatDate===r||this._heartbeatsCache.heartbeats.some(s=>s.date===r))return;if(this._heartbeatsCache.heartbeats.push({date:r,agent:t}),this._heartbeatsCache.heartbeats.length>Xp){const s=em(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(s,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(e){ct.warn(e)}}async getHeartbeatsHeader(){try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null||this._heartbeatsCache.heartbeats.length===0)return"";const e=Mc(),{heartbeatsToSend:t,unsentEntries:r}=Yp(this._heartbeatsCache.heartbeats),s=vs(JSON.stringify({version:2,heartbeats:t}));return this._heartbeatsCache.lastSentHeartbeatDate=e,r.length>0?(this._heartbeatsCache.heartbeats=r,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),s}catch(e){return ct.warn(e),""}}}function Mc(){return new Date().toISOString().substring(0,10)}function Yp(n,e=Qp){const t=[];let r=n.slice();for(const s of n){const i=t.find(a=>a.agent===s.agent);if(i){if(i.dates.push(s.date),Lc(t)>e){i.dates.pop();break}}else if(t.push({agent:s.agent,dates:[s.date]}),Lc(t)>e){t.pop();break}r=r.slice(1)}return{heartbeatsToSend:t,unsentEntries:r}}class Zp{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return Uf()?Bf().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const t=await Kp(this.app);return t?.heartbeats?t:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){if(await this._canUseIndexedDBPromise){const r=await this.read();return Oc(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??r.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){if(await this._canUseIndexedDBPromise){const r=await this.read();return Oc(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??r.lastSentHeartbeatDate,heartbeats:[...r.heartbeats,...e.heartbeats]})}else return}}function Lc(n){return vs(JSON.stringify({version:2,heartbeats:n})).length}function em(n){if(n.length===0)return-1;let e=0,t=n[0].date;for(let r=1;r<n.length;r++)n[r].date<t&&(t=n[r].date,e=r);return e}/**
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
 */function tm(n){wn(new Jt("platform-logger",e=>new fp(e),"PRIVATE")),wn(new Jt("heartbeat",e=>new Jp(e),"PRIVATE")),At(Yi,Vc,n),At(Yi,Vc,"esm2020"),At("fire-js","")}tm("");var Fc=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var xt,gu;(function(){var n;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function e(g,m){function y(){}y.prototype=m.prototype,g.D=m.prototype,g.prototype=new y,g.prototype.constructor=g,g.C=function(b,E,T){for(var v=Array(arguments.length-2),ge=2;ge<arguments.length;ge++)v[ge-2]=arguments[ge];return m.prototype[E].apply(b,v)}}function t(){this.blockSize=-1}function r(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.B=Array(this.blockSize),this.o=this.h=0,this.s()}e(r,t),r.prototype.s=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function s(g,m,y){y||(y=0);var b=Array(16);if(typeof m=="string")for(var E=0;16>E;++E)b[E]=m.charCodeAt(y++)|m.charCodeAt(y++)<<8|m.charCodeAt(y++)<<16|m.charCodeAt(y++)<<24;else for(E=0;16>E;++E)b[E]=m[y++]|m[y++]<<8|m[y++]<<16|m[y++]<<24;m=g.g[0],y=g.g[1],E=g.g[2];var T=g.g[3],v=m+(T^y&(E^T))+b[0]+3614090360&4294967295;m=y+(v<<7&4294967295|v>>>25),v=T+(E^m&(y^E))+b[1]+3905402710&4294967295,T=m+(v<<12&4294967295|v>>>20),v=E+(y^T&(m^y))+b[2]+606105819&4294967295,E=T+(v<<17&4294967295|v>>>15),v=y+(m^E&(T^m))+b[3]+3250441966&4294967295,y=E+(v<<22&4294967295|v>>>10),v=m+(T^y&(E^T))+b[4]+4118548399&4294967295,m=y+(v<<7&4294967295|v>>>25),v=T+(E^m&(y^E))+b[5]+1200080426&4294967295,T=m+(v<<12&4294967295|v>>>20),v=E+(y^T&(m^y))+b[6]+2821735955&4294967295,E=T+(v<<17&4294967295|v>>>15),v=y+(m^E&(T^m))+b[7]+4249261313&4294967295,y=E+(v<<22&4294967295|v>>>10),v=m+(T^y&(E^T))+b[8]+1770035416&4294967295,m=y+(v<<7&4294967295|v>>>25),v=T+(E^m&(y^E))+b[9]+2336552879&4294967295,T=m+(v<<12&4294967295|v>>>20),v=E+(y^T&(m^y))+b[10]+4294925233&4294967295,E=T+(v<<17&4294967295|v>>>15),v=y+(m^E&(T^m))+b[11]+2304563134&4294967295,y=E+(v<<22&4294967295|v>>>10),v=m+(T^y&(E^T))+b[12]+1804603682&4294967295,m=y+(v<<7&4294967295|v>>>25),v=T+(E^m&(y^E))+b[13]+4254626195&4294967295,T=m+(v<<12&4294967295|v>>>20),v=E+(y^T&(m^y))+b[14]+2792965006&4294967295,E=T+(v<<17&4294967295|v>>>15),v=y+(m^E&(T^m))+b[15]+1236535329&4294967295,y=E+(v<<22&4294967295|v>>>10),v=m+(E^T&(y^E))+b[1]+4129170786&4294967295,m=y+(v<<5&4294967295|v>>>27),v=T+(y^E&(m^y))+b[6]+3225465664&4294967295,T=m+(v<<9&4294967295|v>>>23),v=E+(m^y&(T^m))+b[11]+643717713&4294967295,E=T+(v<<14&4294967295|v>>>18),v=y+(T^m&(E^T))+b[0]+3921069994&4294967295,y=E+(v<<20&4294967295|v>>>12),v=m+(E^T&(y^E))+b[5]+3593408605&4294967295,m=y+(v<<5&4294967295|v>>>27),v=T+(y^E&(m^y))+b[10]+38016083&4294967295,T=m+(v<<9&4294967295|v>>>23),v=E+(m^y&(T^m))+b[15]+3634488961&4294967295,E=T+(v<<14&4294967295|v>>>18),v=y+(T^m&(E^T))+b[4]+3889429448&4294967295,y=E+(v<<20&4294967295|v>>>12),v=m+(E^T&(y^E))+b[9]+568446438&4294967295,m=y+(v<<5&4294967295|v>>>27),v=T+(y^E&(m^y))+b[14]+3275163606&4294967295,T=m+(v<<9&4294967295|v>>>23),v=E+(m^y&(T^m))+b[3]+4107603335&4294967295,E=T+(v<<14&4294967295|v>>>18),v=y+(T^m&(E^T))+b[8]+1163531501&4294967295,y=E+(v<<20&4294967295|v>>>12),v=m+(E^T&(y^E))+b[13]+2850285829&4294967295,m=y+(v<<5&4294967295|v>>>27),v=T+(y^E&(m^y))+b[2]+4243563512&4294967295,T=m+(v<<9&4294967295|v>>>23),v=E+(m^y&(T^m))+b[7]+1735328473&4294967295,E=T+(v<<14&4294967295|v>>>18),v=y+(T^m&(E^T))+b[12]+2368359562&4294967295,y=E+(v<<20&4294967295|v>>>12),v=m+(y^E^T)+b[5]+4294588738&4294967295,m=y+(v<<4&4294967295|v>>>28),v=T+(m^y^E)+b[8]+2272392833&4294967295,T=m+(v<<11&4294967295|v>>>21),v=E+(T^m^y)+b[11]+1839030562&4294967295,E=T+(v<<16&4294967295|v>>>16),v=y+(E^T^m)+b[14]+4259657740&4294967295,y=E+(v<<23&4294967295|v>>>9),v=m+(y^E^T)+b[1]+2763975236&4294967295,m=y+(v<<4&4294967295|v>>>28),v=T+(m^y^E)+b[4]+1272893353&4294967295,T=m+(v<<11&4294967295|v>>>21),v=E+(T^m^y)+b[7]+4139469664&4294967295,E=T+(v<<16&4294967295|v>>>16),v=y+(E^T^m)+b[10]+3200236656&4294967295,y=E+(v<<23&4294967295|v>>>9),v=m+(y^E^T)+b[13]+681279174&4294967295,m=y+(v<<4&4294967295|v>>>28),v=T+(m^y^E)+b[0]+3936430074&4294967295,T=m+(v<<11&4294967295|v>>>21),v=E+(T^m^y)+b[3]+3572445317&4294967295,E=T+(v<<16&4294967295|v>>>16),v=y+(E^T^m)+b[6]+76029189&4294967295,y=E+(v<<23&4294967295|v>>>9),v=m+(y^E^T)+b[9]+3654602809&4294967295,m=y+(v<<4&4294967295|v>>>28),v=T+(m^y^E)+b[12]+3873151461&4294967295,T=m+(v<<11&4294967295|v>>>21),v=E+(T^m^y)+b[15]+530742520&4294967295,E=T+(v<<16&4294967295|v>>>16),v=y+(E^T^m)+b[2]+3299628645&4294967295,y=E+(v<<23&4294967295|v>>>9),v=m+(E^(y|~T))+b[0]+4096336452&4294967295,m=y+(v<<6&4294967295|v>>>26),v=T+(y^(m|~E))+b[7]+1126891415&4294967295,T=m+(v<<10&4294967295|v>>>22),v=E+(m^(T|~y))+b[14]+2878612391&4294967295,E=T+(v<<15&4294967295|v>>>17),v=y+(T^(E|~m))+b[5]+4237533241&4294967295,y=E+(v<<21&4294967295|v>>>11),v=m+(E^(y|~T))+b[12]+1700485571&4294967295,m=y+(v<<6&4294967295|v>>>26),v=T+(y^(m|~E))+b[3]+2399980690&4294967295,T=m+(v<<10&4294967295|v>>>22),v=E+(m^(T|~y))+b[10]+4293915773&4294967295,E=T+(v<<15&4294967295|v>>>17),v=y+(T^(E|~m))+b[1]+2240044497&4294967295,y=E+(v<<21&4294967295|v>>>11),v=m+(E^(y|~T))+b[8]+1873313359&4294967295,m=y+(v<<6&4294967295|v>>>26),v=T+(y^(m|~E))+b[15]+4264355552&4294967295,T=m+(v<<10&4294967295|v>>>22),v=E+(m^(T|~y))+b[6]+2734768916&4294967295,E=T+(v<<15&4294967295|v>>>17),v=y+(T^(E|~m))+b[13]+1309151649&4294967295,y=E+(v<<21&4294967295|v>>>11),v=m+(E^(y|~T))+b[4]+4149444226&4294967295,m=y+(v<<6&4294967295|v>>>26),v=T+(y^(m|~E))+b[11]+3174756917&4294967295,T=m+(v<<10&4294967295|v>>>22),v=E+(m^(T|~y))+b[2]+718787259&4294967295,E=T+(v<<15&4294967295|v>>>17),v=y+(T^(E|~m))+b[9]+3951481745&4294967295,g.g[0]=g.g[0]+m&4294967295,g.g[1]=g.g[1]+(E+(v<<21&4294967295|v>>>11))&4294967295,g.g[2]=g.g[2]+E&4294967295,g.g[3]=g.g[3]+T&4294967295}r.prototype.u=function(g,m){m===void 0&&(m=g.length);for(var y=m-this.blockSize,b=this.B,E=this.h,T=0;T<m;){if(E==0)for(;T<=y;)s(this,g,T),T+=this.blockSize;if(typeof g=="string"){for(;T<m;)if(b[E++]=g.charCodeAt(T++),E==this.blockSize){s(this,b),E=0;break}}else for(;T<m;)if(b[E++]=g[T++],E==this.blockSize){s(this,b),E=0;break}}this.h=E,this.o+=m},r.prototype.v=function(){var g=Array((56>this.h?this.blockSize:2*this.blockSize)-this.h);g[0]=128;for(var m=1;m<g.length-8;++m)g[m]=0;var y=8*this.o;for(m=g.length-8;m<g.length;++m)g[m]=y&255,y/=256;for(this.u(g),g=Array(16),m=y=0;4>m;++m)for(var b=0;32>b;b+=8)g[y++]=this.g[m]>>>b&255;return g};function i(g,m){var y=u;return Object.prototype.hasOwnProperty.call(y,g)?y[g]:y[g]=m(g)}function a(g,m){this.h=m;for(var y=[],b=!0,E=g.length-1;0<=E;E--){var T=g[E]|0;b&&T==m||(y[E]=T,b=!1)}this.g=y}var u={};function d(g){return-128<=g&&128>g?i(g,function(m){return new a([m|0],0>m?-1:0)}):new a([g|0],0>g?-1:0)}function f(g){if(isNaN(g)||!isFinite(g))return w;if(0>g)return P(f(-g));for(var m=[],y=1,b=0;g>=y;b++)m[b]=g/y|0,y*=4294967296;return new a(m,0)}function c(g,m){if(g.length==0)throw Error("number format error: empty string");if(m=m||10,2>m||36<m)throw Error("radix out of range: "+m);if(g.charAt(0)=="-")return P(c(g.substring(1),m));if(0<=g.indexOf("-"))throw Error('number format error: interior "-" character');for(var y=f(Math.pow(m,8)),b=w,E=0;E<g.length;E+=8){var T=Math.min(8,g.length-E),v=parseInt(g.substring(E,E+T),m);8>T?(T=f(Math.pow(m,T)),b=b.j(T).add(f(v))):(b=b.j(y),b=b.add(f(v)))}return b}var w=d(0),_=d(1),x=d(16777216);n=a.prototype,n.m=function(){if(D(this))return-P(this).m();for(var g=0,m=1,y=0;y<this.g.length;y++){var b=this.i(y);g+=(0<=b?b:4294967296+b)*m,m*=4294967296}return g},n.toString=function(g){if(g=g||10,2>g||36<g)throw Error("radix out of range: "+g);if(C(this))return"0";if(D(this))return"-"+P(this).toString(g);for(var m=f(Math.pow(g,6)),y=this,b="";;){var E=ee(y,m).g;y=M(y,E.j(m));var T=((0<y.g.length?y.g[0]:y.h)>>>0).toString(g);if(y=E,C(y))return T+b;for(;6>T.length;)T="0"+T;b=T+b}},n.i=function(g){return 0>g?0:g<this.g.length?this.g[g]:this.h};function C(g){if(g.h!=0)return!1;for(var m=0;m<g.g.length;m++)if(g.g[m]!=0)return!1;return!0}function D(g){return g.h==-1}n.l=function(g){return g=M(this,g),D(g)?-1:C(g)?0:1};function P(g){for(var m=g.g.length,y=[],b=0;b<m;b++)y[b]=~g.g[b];return new a(y,~g.h).add(_)}n.abs=function(){return D(this)?P(this):this},n.add=function(g){for(var m=Math.max(this.g.length,g.g.length),y=[],b=0,E=0;E<=m;E++){var T=b+(this.i(E)&65535)+(g.i(E)&65535),v=(T>>>16)+(this.i(E)>>>16)+(g.i(E)>>>16);b=v>>>16,T&=65535,v&=65535,y[E]=v<<16|T}return new a(y,y[y.length-1]&-2147483648?-1:0)};function M(g,m){return g.add(P(m))}n.j=function(g){if(C(this)||C(g))return w;if(D(this))return D(g)?P(this).j(P(g)):P(P(this).j(g));if(D(g))return P(this.j(P(g)));if(0>this.l(x)&&0>g.l(x))return f(this.m()*g.m());for(var m=this.g.length+g.g.length,y=[],b=0;b<2*m;b++)y[b]=0;for(b=0;b<this.g.length;b++)for(var E=0;E<g.g.length;E++){var T=this.i(b)>>>16,v=this.i(b)&65535,ge=g.i(E)>>>16,Ut=g.i(E)&65535;y[2*b+2*E]+=v*Ut,F(y,2*b+2*E),y[2*b+2*E+1]+=T*Ut,F(y,2*b+2*E+1),y[2*b+2*E+1]+=v*ge,F(y,2*b+2*E+1),y[2*b+2*E+2]+=T*ge,F(y,2*b+2*E+2)}for(b=0;b<m;b++)y[b]=y[2*b+1]<<16|y[2*b];for(b=m;b<2*m;b++)y[b]=0;return new a(y,0)};function F(g,m){for(;(g[m]&65535)!=g[m];)g[m+1]+=g[m]>>>16,g[m]&=65535,m++}function j(g,m){this.g=g,this.h=m}function ee(g,m){if(C(m))throw Error("division by zero");if(C(g))return new j(w,w);if(D(g))return m=ee(P(g),m),new j(P(m.g),P(m.h));if(D(m))return m=ee(g,P(m)),new j(P(m.g),m.h);if(30<g.g.length){if(D(g)||D(m))throw Error("slowDivide_ only works with positive integers.");for(var y=_,b=m;0>=b.l(g);)y=me(y),b=me(b);var E=ue(y,1),T=ue(b,1);for(b=ue(b,2),y=ue(y,2);!C(b);){var v=T.add(b);0>=v.l(g)&&(E=E.add(y),T=v),b=ue(b,1),y=ue(y,1)}return m=M(g,E.j(m)),new j(E,m)}for(E=w;0<=g.l(m);){for(y=Math.max(1,Math.floor(g.m()/m.m())),b=Math.ceil(Math.log(y)/Math.LN2),b=48>=b?1:Math.pow(2,b-48),T=f(y),v=T.j(m);D(v)||0<v.l(g);)y-=b,T=f(y),v=T.j(m);C(T)&&(T=_),E=E.add(T),g=M(g,v)}return new j(E,g)}n.A=function(g){return ee(this,g).h},n.and=function(g){for(var m=Math.max(this.g.length,g.g.length),y=[],b=0;b<m;b++)y[b]=this.i(b)&g.i(b);return new a(y,this.h&g.h)},n.or=function(g){for(var m=Math.max(this.g.length,g.g.length),y=[],b=0;b<m;b++)y[b]=this.i(b)|g.i(b);return new a(y,this.h|g.h)},n.xor=function(g){for(var m=Math.max(this.g.length,g.g.length),y=[],b=0;b<m;b++)y[b]=this.i(b)^g.i(b);return new a(y,this.h^g.h)};function me(g){for(var m=g.g.length+1,y=[],b=0;b<m;b++)y[b]=g.i(b)<<1|g.i(b-1)>>>31;return new a(y,g.h)}function ue(g,m){var y=m>>5;m%=32;for(var b=g.g.length-y,E=[],T=0;T<b;T++)E[T]=0<m?g.i(T+y)>>>m|g.i(T+y+1)<<32-m:g.i(T+y);return new a(E,g.h)}r.prototype.digest=r.prototype.v,r.prototype.reset=r.prototype.s,r.prototype.update=r.prototype.u,gu=r,a.prototype.add=a.prototype.add,a.prototype.multiply=a.prototype.j,a.prototype.modulo=a.prototype.A,a.prototype.compare=a.prototype.l,a.prototype.toNumber=a.prototype.m,a.prototype.toString=a.prototype.toString,a.prototype.getBits=a.prototype.i,a.fromNumber=f,a.fromString=c,xt=a}).apply(typeof Fc<"u"?Fc:typeof self<"u"?self:typeof window<"u"?window:{});var rs=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var yu,Yn,_u,ls,to,wu,vu,bu;(function(){var n,e=typeof Object.defineProperties=="function"?Object.defineProperty:function(o,l,h){return o==Array.prototype||o==Object.prototype||(o[l]=h.value),o};function t(o){o=[typeof globalThis=="object"&&globalThis,o,typeof window=="object"&&window,typeof self=="object"&&self,typeof rs=="object"&&rs];for(var l=0;l<o.length;++l){var h=o[l];if(h&&h.Math==Math)return h}throw Error("Cannot find global object")}var r=t(this);function s(o,l){if(l)e:{var h=r;o=o.split(".");for(var p=0;p<o.length-1;p++){var I=o[p];if(!(I in h))break e;h=h[I]}o=o[o.length-1],p=h[o],l=l(p),l!=p&&l!=null&&e(h,o,{configurable:!0,writable:!0,value:l})}}function i(o,l){o instanceof String&&(o+="");var h=0,p=!1,I={next:function(){if(!p&&h<o.length){var A=h++;return{value:l(A,o[A]),done:!1}}return p=!0,{done:!0,value:void 0}}};return I[Symbol.iterator]=function(){return I},I}s("Array.prototype.values",function(o){return o||function(){return i(this,function(l,h){return h})}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var a=a||{},u=this||self;function d(o){var l=typeof o;return l=l!="object"?l:o?Array.isArray(o)?"array":l:"null",l=="array"||l=="object"&&typeof o.length=="number"}function f(o){var l=typeof o;return l=="object"&&o!=null||l=="function"}function c(o,l,h){return o.call.apply(o.bind,arguments)}function w(o,l,h){if(!o)throw Error();if(2<arguments.length){var p=Array.prototype.slice.call(arguments,2);return function(){var I=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(I,p),o.apply(l,I)}}return function(){return o.apply(l,arguments)}}function _(o,l,h){return _=Function.prototype.bind&&Function.prototype.bind.toString().indexOf("native code")!=-1?c:w,_.apply(null,arguments)}function x(o,l){var h=Array.prototype.slice.call(arguments,1);return function(){var p=h.slice();return p.push.apply(p,arguments),o.apply(this,p)}}function C(o,l){function h(){}h.prototype=l.prototype,o.aa=l.prototype,o.prototype=new h,o.prototype.constructor=o,o.Qb=function(p,I,A){for(var k=Array(arguments.length-2),X=2;X<arguments.length;X++)k[X-2]=arguments[X];return l.prototype[I].apply(p,k)}}function D(o){const l=o.length;if(0<l){const h=Array(l);for(let p=0;p<l;p++)h[p]=o[p];return h}return[]}function P(o,l){for(let h=1;h<arguments.length;h++){const p=arguments[h];if(d(p)){const I=o.length||0,A=p.length||0;o.length=I+A;for(let k=0;k<A;k++)o[I+k]=p[k]}else o.push(p)}}class M{constructor(l,h){this.i=l,this.j=h,this.h=0,this.g=null}get(){let l;return 0<this.h?(this.h--,l=this.g,this.g=l.next,l.next=null):l=this.i(),l}}function F(o){return/^[\s\xa0]*$/.test(o)}function j(){var o=u.navigator;return o&&(o=o.userAgent)?o:""}function ee(o){return ee[" "](o),o}ee[" "]=function(){};var me=j().indexOf("Gecko")!=-1&&!(j().toLowerCase().indexOf("webkit")!=-1&&j().indexOf("Edge")==-1)&&!(j().indexOf("Trident")!=-1||j().indexOf("MSIE")!=-1)&&j().indexOf("Edge")==-1;function ue(o,l,h){for(const p in o)l.call(h,o[p],p,o)}function g(o,l){for(const h in o)l.call(void 0,o[h],h,o)}function m(o){const l={};for(const h in o)l[h]=o[h];return l}const y="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function b(o,l){let h,p;for(let I=1;I<arguments.length;I++){p=arguments[I];for(h in p)o[h]=p[h];for(let A=0;A<y.length;A++)h=y[A],Object.prototype.hasOwnProperty.call(p,h)&&(o[h]=p[h])}}function E(o){var l=1;o=o.split(":");const h=[];for(;0<l&&o.length;)h.push(o.shift()),l--;return o.length&&h.push(o.join(":")),h}function T(o){u.setTimeout(()=>{throw o},0)}function v(){var o=di;let l=null;return o.g&&(l=o.g,o.g=o.g.next,o.g||(o.h=null),l.next=null),l}class ge{constructor(){this.h=this.g=null}add(l,h){const p=Ut.get();p.set(l,h),this.h?this.h.next=p:this.g=p,this.h=p}}var Ut=new M(()=>new Lh,o=>o.reset());class Lh{constructor(){this.next=this.g=this.h=null}set(l,h){this.h=l,this.g=h,this.next=null}reset(){this.next=this.g=this.h=null}}let Mn,Ln=!1,di=new ge,Sa=()=>{const o=u.Promise.resolve(void 0);Mn=()=>{o.then(Fh)}};var Fh=()=>{for(var o;o=v();){try{o.h.call(o.g)}catch(h){T(h)}var l=Ut;l.j(o),100>l.h&&(l.h++,o.next=l.g,l.g=o)}Ln=!1};function pt(){this.s=this.s,this.C=this.C}pt.prototype.s=!1,pt.prototype.ma=function(){this.s||(this.s=!0,this.N())},pt.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function be(o,l){this.type=o,this.g=this.target=l,this.defaultPrevented=!1}be.prototype.h=function(){this.defaultPrevented=!0};var Uh=function(){if(!u.addEventListener||!Object.defineProperty)return!1;var o=!1,l=Object.defineProperty({},"passive",{get:function(){o=!0}});try{const h=()=>{};u.addEventListener("test",h,l),u.removeEventListener("test",h,l)}catch{}return o}();function Fn(o,l){if(be.call(this,o?o.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,o){var h=this.type=o.type,p=o.changedTouches&&o.changedTouches.length?o.changedTouches[0]:null;if(this.target=o.target||o.srcElement,this.g=l,l=o.relatedTarget){if(me){e:{try{ee(l.nodeName);var I=!0;break e}catch{}I=!1}I||(l=null)}}else h=="mouseover"?l=o.fromElement:h=="mouseout"&&(l=o.toElement);this.relatedTarget=l,p?(this.clientX=p.clientX!==void 0?p.clientX:p.pageX,this.clientY=p.clientY!==void 0?p.clientY:p.pageY,this.screenX=p.screenX||0,this.screenY=p.screenY||0):(this.clientX=o.clientX!==void 0?o.clientX:o.pageX,this.clientY=o.clientY!==void 0?o.clientY:o.pageY,this.screenX=o.screenX||0,this.screenY=o.screenY||0),this.button=o.button,this.key=o.key||"",this.ctrlKey=o.ctrlKey,this.altKey=o.altKey,this.shiftKey=o.shiftKey,this.metaKey=o.metaKey,this.pointerId=o.pointerId||0,this.pointerType=typeof o.pointerType=="string"?o.pointerType:Bh[o.pointerType]||"",this.state=o.state,this.i=o,o.defaultPrevented&&Fn.aa.h.call(this)}}C(Fn,be);var Bh={2:"touch",3:"pen",4:"mouse"};Fn.prototype.h=function(){Fn.aa.h.call(this);var o=this.i;o.preventDefault?o.preventDefault():o.returnValue=!1};var Fr="closure_listenable_"+(1e6*Math.random()|0),$h=0;function qh(o,l,h,p,I){this.listener=o,this.proxy=null,this.src=l,this.type=h,this.capture=!!p,this.ha=I,this.key=++$h,this.da=this.fa=!1}function Ur(o){o.da=!0,o.listener=null,o.proxy=null,o.src=null,o.ha=null}function Br(o){this.src=o,this.g={},this.h=0}Br.prototype.add=function(o,l,h,p,I){var A=o.toString();o=this.g[A],o||(o=this.g[A]=[],this.h++);var k=fi(o,l,p,I);return-1<k?(l=o[k],h||(l.fa=!1)):(l=new qh(l,this.src,A,!!p,I),l.fa=h,o.push(l)),l};function hi(o,l){var h=l.type;if(h in o.g){var p=o.g[h],I=Array.prototype.indexOf.call(p,l,void 0),A;(A=0<=I)&&Array.prototype.splice.call(p,I,1),A&&(Ur(l),o.g[h].length==0&&(delete o.g[h],o.h--))}}function fi(o,l,h,p){for(var I=0;I<o.length;++I){var A=o[I];if(!A.da&&A.listener==l&&A.capture==!!h&&A.ha==p)return I}return-1}var pi="closure_lm_"+(1e6*Math.random()|0),mi={};function Ra(o,l,h,p,I){if(Array.isArray(l)){for(var A=0;A<l.length;A++)Ra(o,l[A],h,p,I);return null}return h=ka(h),o&&o[Fr]?o.K(l,h,f(p)?!!p.capture:!1,I):jh(o,l,h,!1,p,I)}function jh(o,l,h,p,I,A){if(!l)throw Error("Invalid event type");var k=f(I)?!!I.capture:!!I,X=yi(o);if(X||(o[pi]=X=new Br(o)),h=X.add(l,h,p,k,A),h.proxy)return h;if(p=zh(),h.proxy=p,p.src=o,p.listener=h,o.addEventListener)Uh||(I=k),I===void 0&&(I=!1),o.addEventListener(l.toString(),p,I);else if(o.attachEvent)o.attachEvent(Pa(l.toString()),p);else if(o.addListener&&o.removeListener)o.addListener(p);else throw Error("addEventListener and attachEvent are unavailable.");return h}function zh(){function o(h){return l.call(o.src,o.listener,h)}const l=Hh;return o}function Ca(o,l,h,p,I){if(Array.isArray(l))for(var A=0;A<l.length;A++)Ca(o,l[A],h,p,I);else p=f(p)?!!p.capture:!!p,h=ka(h),o&&o[Fr]?(o=o.i,l=String(l).toString(),l in o.g&&(A=o.g[l],h=fi(A,h,p,I),-1<h&&(Ur(A[h]),Array.prototype.splice.call(A,h,1),A.length==0&&(delete o.g[l],o.h--)))):o&&(o=yi(o))&&(l=o.g[l.toString()],o=-1,l&&(o=fi(l,h,p,I)),(h=-1<o?l[o]:null)&&gi(h))}function gi(o){if(typeof o!="number"&&o&&!o.da){var l=o.src;if(l&&l[Fr])hi(l.i,o);else{var h=o.type,p=o.proxy;l.removeEventListener?l.removeEventListener(h,p,o.capture):l.detachEvent?l.detachEvent(Pa(h),p):l.addListener&&l.removeListener&&l.removeListener(p),(h=yi(l))?(hi(h,o),h.h==0&&(h.src=null,l[pi]=null)):Ur(o)}}}function Pa(o){return o in mi?mi[o]:mi[o]="on"+o}function Hh(o,l){if(o.da)o=!0;else{l=new Fn(l,this);var h=o.listener,p=o.ha||o.src;o.fa&&gi(o),o=h.call(p,l)}return o}function yi(o){return o=o[pi],o instanceof Br?o:null}var _i="__closure_events_fn_"+(1e9*Math.random()>>>0);function ka(o){return typeof o=="function"?o:(o[_i]||(o[_i]=function(l){return o.handleEvent(l)}),o[_i])}function Ee(){pt.call(this),this.i=new Br(this),this.M=this,this.F=null}C(Ee,pt),Ee.prototype[Fr]=!0,Ee.prototype.removeEventListener=function(o,l,h,p){Ca(this,o,l,h,p)};function Ce(o,l){var h,p=o.F;if(p)for(h=[];p;p=p.F)h.push(p);if(o=o.M,p=l.type||l,typeof l=="string")l=new be(l,o);else if(l instanceof be)l.target=l.target||o;else{var I=l;l=new be(p,o),b(l,I)}if(I=!0,h)for(var A=h.length-1;0<=A;A--){var k=l.g=h[A];I=$r(k,p,!0,l)&&I}if(k=l.g=o,I=$r(k,p,!0,l)&&I,I=$r(k,p,!1,l)&&I,h)for(A=0;A<h.length;A++)k=l.g=h[A],I=$r(k,p,!1,l)&&I}Ee.prototype.N=function(){if(Ee.aa.N.call(this),this.i){var o=this.i,l;for(l in o.g){for(var h=o.g[l],p=0;p<h.length;p++)Ur(h[p]);delete o.g[l],o.h--}}this.F=null},Ee.prototype.K=function(o,l,h,p){return this.i.add(String(o),l,!1,h,p)},Ee.prototype.L=function(o,l,h,p){return this.i.add(String(o),l,!0,h,p)};function $r(o,l,h,p){if(l=o.i.g[String(l)],!l)return!0;l=l.concat();for(var I=!0,A=0;A<l.length;++A){var k=l[A];if(k&&!k.da&&k.capture==h){var X=k.listener,ye=k.ha||k.src;k.fa&&hi(o.i,k),I=X.call(ye,p)!==!1&&I}}return I&&!p.defaultPrevented}function Da(o,l,h){if(typeof o=="function")h&&(o=_(o,h));else if(o&&typeof o.handleEvent=="function")o=_(o.handleEvent,o);else throw Error("Invalid listener argument");return 2147483647<Number(l)?-1:u.setTimeout(o,l||0)}function Va(o){o.g=Da(()=>{o.g=null,o.i&&(o.i=!1,Va(o))},o.l);const l=o.h;o.h=null,o.m.apply(null,l)}class Gh extends pt{constructor(l,h){super(),this.m=l,this.l=h,this.h=null,this.i=!1,this.g=null}j(l){this.h=arguments,this.g?this.i=!0:Va(this)}N(){super.N(),this.g&&(u.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function Un(o){pt.call(this),this.h=o,this.g={}}C(Un,pt);var Na=[];function Oa(o){ue(o.g,function(l,h){this.g.hasOwnProperty(h)&&gi(l)},o),o.g={}}Un.prototype.N=function(){Un.aa.N.call(this),Oa(this)},Un.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var wi=u.JSON.stringify,Wh=u.JSON.parse,Kh=class{stringify(o){return u.JSON.stringify(o,void 0)}parse(o){return u.JSON.parse(o,void 0)}};function vi(){}vi.prototype.h=null;function Ma(o){return o.h||(o.h=o.i())}function La(){}var Bn={OPEN:"a",kb:"b",Ja:"c",wb:"d"};function bi(){be.call(this,"d")}C(bi,be);function Ei(){be.call(this,"c")}C(Ei,be);var Bt={},Fa=null;function qr(){return Fa=Fa||new Ee}Bt.La="serverreachability";function Ua(o){be.call(this,Bt.La,o)}C(Ua,be);function $n(o){const l=qr();Ce(l,new Ua(l))}Bt.STAT_EVENT="statevent";function Ba(o,l){be.call(this,Bt.STAT_EVENT,o),this.stat=l}C(Ba,be);function Pe(o){const l=qr();Ce(l,new Ba(l,o))}Bt.Ma="timingevent";function $a(o,l){be.call(this,Bt.Ma,o),this.size=l}C($a,be);function qn(o,l){if(typeof o!="function")throw Error("Fn must not be null and must be a function");return u.setTimeout(function(){o()},l)}function jn(){this.g=!0}jn.prototype.xa=function(){this.g=!1};function Qh(o,l,h,p,I,A){o.info(function(){if(o.g)if(A)for(var k="",X=A.split("&"),ye=0;ye<X.length;ye++){var K=X[ye].split("=");if(1<K.length){var Te=K[0];K=K[1];var Ie=Te.split("_");k=2<=Ie.length&&Ie[1]=="type"?k+(Te+"="+K+"&"):k+(Te+"=redacted&")}}else k=null;else k=A;return"XMLHTTP REQ ("+p+") [attempt "+I+"]: "+l+`
`+h+`
`+k})}function Xh(o,l,h,p,I,A,k){o.info(function(){return"XMLHTTP RESP ("+p+") [ attempt "+I+"]: "+l+`
`+h+`
`+A+" "+k})}function an(o,l,h,p){o.info(function(){return"XMLHTTP TEXT ("+l+"): "+Yh(o,h)+(p?" "+p:"")})}function Jh(o,l){o.info(function(){return"TIMEOUT: "+l})}jn.prototype.info=function(){};function Yh(o,l){if(!o.g)return l;if(!l)return null;try{var h=JSON.parse(l);if(h){for(o=0;o<h.length;o++)if(Array.isArray(h[o])){var p=h[o];if(!(2>p.length)){var I=p[1];if(Array.isArray(I)&&!(1>I.length)){var A=I[0];if(A!="noop"&&A!="stop"&&A!="close")for(var k=1;k<I.length;k++)I[k]=""}}}}return wi(h)}catch{return l}}var jr={NO_ERROR:0,gb:1,tb:2,sb:3,nb:4,rb:5,ub:6,Ia:7,TIMEOUT:8,xb:9},qa={lb:"complete",Hb:"success",Ja:"error",Ia:"abort",zb:"ready",Ab:"readystatechange",TIMEOUT:"timeout",vb:"incrementaldata",yb:"progress",ob:"downloadprogress",Pb:"uploadprogress"},Ti;function zr(){}C(zr,vi),zr.prototype.g=function(){return new XMLHttpRequest},zr.prototype.i=function(){return{}},Ti=new zr;function mt(o,l,h,p){this.j=o,this.i=l,this.l=h,this.R=p||1,this.U=new Un(this),this.I=45e3,this.H=null,this.o=!1,this.m=this.A=this.v=this.L=this.F=this.S=this.B=null,this.D=[],this.g=null,this.C=0,this.s=this.u=null,this.X=-1,this.J=!1,this.O=0,this.M=null,this.W=this.K=this.T=this.P=!1,this.h=new ja}function ja(){this.i=null,this.g="",this.h=!1}var za={},Ii={};function Ai(o,l,h){o.L=1,o.v=Kr(rt(l)),o.m=h,o.P=!0,Ha(o,null)}function Ha(o,l){o.F=Date.now(),Hr(o),o.A=rt(o.v);var h=o.A,p=o.R;Array.isArray(p)||(p=[String(p)]),ic(h.i,"t",p),o.C=0,h=o.j.J,o.h=new ja,o.g=Tc(o.j,h?l:null,!o.m),0<o.O&&(o.M=new Gh(_(o.Y,o,o.g),o.O)),l=o.U,h=o.g,p=o.ca;var I="readystatechange";Array.isArray(I)||(I&&(Na[0]=I.toString()),I=Na);for(var A=0;A<I.length;A++){var k=Ra(h,I[A],p||l.handleEvent,!1,l.h||l);if(!k)break;l.g[k.key]=k}l=o.H?m(o.H):{},o.m?(o.u||(o.u="POST"),l["Content-Type"]="application/x-www-form-urlencoded",o.g.ea(o.A,o.u,o.m,l)):(o.u="GET",o.g.ea(o.A,o.u,null,l)),$n(),Qh(o.i,o.u,o.A,o.l,o.R,o.m)}mt.prototype.ca=function(o){o=o.target;const l=this.M;l&&st(o)==3?l.j():this.Y(o)},mt.prototype.Y=function(o){try{if(o==this.g)e:{const Ie=st(this.g);var l=this.g.Ba();const un=this.g.Z();if(!(3>Ie)&&(Ie!=3||this.g&&(this.h.h||this.g.oa()||hc(this.g)))){this.J||Ie!=4||l==7||(l==8||0>=un?$n(3):$n(2)),xi(this);var h=this.g.Z();this.X=h;t:if(Ga(this)){var p=hc(this.g);o="";var I=p.length,A=st(this.g)==4;if(!this.h.i){if(typeof TextDecoder>"u"){$t(this),zn(this);var k="";break t}this.h.i=new u.TextDecoder}for(l=0;l<I;l++)this.h.h=!0,o+=this.h.i.decode(p[l],{stream:!(A&&l==I-1)});p.length=0,this.h.g+=o,this.C=0,k=this.h.g}else k=this.g.oa();if(this.o=h==200,Xh(this.i,this.u,this.A,this.l,this.R,Ie,h),this.o){if(this.T&&!this.K){t:{if(this.g){var X,ye=this.g;if((X=ye.g?ye.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!F(X)){var K=X;break t}}K=null}if(h=K)an(this.i,this.l,h,"Initial handshake response via X-HTTP-Initial-Response"),this.K=!0,Si(this,h);else{this.o=!1,this.s=3,Pe(12),$t(this),zn(this);break e}}if(this.P){h=!0;let $e;for(;!this.J&&this.C<k.length;)if($e=Zh(this,k),$e==Ii){Ie==4&&(this.s=4,Pe(14),h=!1),an(this.i,this.l,null,"[Incomplete Response]");break}else if($e==za){this.s=4,Pe(15),an(this.i,this.l,k,"[Invalid Chunk]"),h=!1;break}else an(this.i,this.l,$e,null),Si(this,$e);if(Ga(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),Ie!=4||k.length!=0||this.h.h||(this.s=1,Pe(16),h=!1),this.o=this.o&&h,!h)an(this.i,this.l,k,"[Invalid Chunked Response]"),$t(this),zn(this);else if(0<k.length&&!this.W){this.W=!0;var Te=this.j;Te.g==this&&Te.ba&&!Te.M&&(Te.j.info("Great, no buffering proxy detected. Bytes received: "+k.length),Vi(Te),Te.M=!0,Pe(11))}}else an(this.i,this.l,k,null),Si(this,k);Ie==4&&$t(this),this.o&&!this.J&&(Ie==4?wc(this.j,this):(this.o=!1,Hr(this)))}else yf(this.g),h==400&&0<k.indexOf("Unknown SID")?(this.s=3,Pe(12)):(this.s=0,Pe(13)),$t(this),zn(this)}}}catch{}finally{}};function Ga(o){return o.g?o.u=="GET"&&o.L!=2&&o.j.Ca:!1}function Zh(o,l){var h=o.C,p=l.indexOf(`
`,h);return p==-1?Ii:(h=Number(l.substring(h,p)),isNaN(h)?za:(p+=1,p+h>l.length?Ii:(l=l.slice(p,p+h),o.C=p+h,l)))}mt.prototype.cancel=function(){this.J=!0,$t(this)};function Hr(o){o.S=Date.now()+o.I,Wa(o,o.I)}function Wa(o,l){if(o.B!=null)throw Error("WatchDog timer not null");o.B=qn(_(o.ba,o),l)}function xi(o){o.B&&(u.clearTimeout(o.B),o.B=null)}mt.prototype.ba=function(){this.B=null;const o=Date.now();0<=o-this.S?(Jh(this.i,this.A),this.L!=2&&($n(),Pe(17)),$t(this),this.s=2,zn(this)):Wa(this,this.S-o)};function zn(o){o.j.G==0||o.J||wc(o.j,o)}function $t(o){xi(o);var l=o.M;l&&typeof l.ma=="function"&&l.ma(),o.M=null,Oa(o.U),o.g&&(l=o.g,o.g=null,l.abort(),l.ma())}function Si(o,l){try{var h=o.j;if(h.G!=0&&(h.g==o||Ri(h.h,o))){if(!o.K&&Ri(h.h,o)&&h.G==3){try{var p=h.Da.g.parse(l)}catch{p=null}if(Array.isArray(p)&&p.length==3){var I=p;if(I[0]==0){e:if(!h.u){if(h.g)if(h.g.F+3e3<o.F)es(h),Yr(h);else break e;Di(h),Pe(18)}}else h.za=I[1],0<h.za-h.T&&37500>I[2]&&h.F&&h.v==0&&!h.C&&(h.C=qn(_(h.Za,h),6e3));if(1>=Xa(h.h)&&h.ca){try{h.ca()}catch{}h.ca=void 0}}else jt(h,11)}else if((o.K||h.g==o)&&es(h),!F(l))for(I=h.Da.g.parse(l),l=0;l<I.length;l++){let K=I[l];if(h.T=K[0],K=K[1],h.G==2)if(K[0]=="c"){h.K=K[1],h.ia=K[2];const Te=K[3];Te!=null&&(h.la=Te,h.j.info("VER="+h.la));const Ie=K[4];Ie!=null&&(h.Aa=Ie,h.j.info("SVER="+h.Aa));const un=K[5];un!=null&&typeof un=="number"&&0<un&&(p=1.5*un,h.L=p,h.j.info("backChannelRequestTimeoutMs_="+p)),p=h;const $e=o.g;if($e){const ns=$e.g?$e.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(ns){var A=p.h;A.g||ns.indexOf("spdy")==-1&&ns.indexOf("quic")==-1&&ns.indexOf("h2")==-1||(A.j=A.l,A.g=new Set,A.h&&(Ci(A,A.h),A.h=null))}if(p.D){const Ni=$e.g?$e.g.getResponseHeader("X-HTTP-Session-Id"):null;Ni&&(p.ya=Ni,Y(p.I,p.D,Ni))}}h.G=3,h.l&&h.l.ua(),h.ba&&(h.R=Date.now()-o.F,h.j.info("Handshake RTT: "+h.R+"ms")),p=h;var k=o;if(p.qa=Ec(p,p.J?p.ia:null,p.W),k.K){Ja(p.h,k);var X=k,ye=p.L;ye&&(X.I=ye),X.B&&(xi(X),Hr(X)),p.g=k}else yc(p);0<h.i.length&&Zr(h)}else K[0]!="stop"&&K[0]!="close"||jt(h,7);else h.G==3&&(K[0]=="stop"||K[0]=="close"?K[0]=="stop"?jt(h,7):ki(h):K[0]!="noop"&&h.l&&h.l.ta(K),h.v=0)}}$n(4)}catch{}}var ef=class{constructor(o,l){this.g=o,this.map=l}};function Ka(o){this.l=o||10,u.PerformanceNavigationTiming?(o=u.performance.getEntriesByType("navigation"),o=0<o.length&&(o[0].nextHopProtocol=="hq"||o[0].nextHopProtocol=="h2")):o=!!(u.chrome&&u.chrome.loadTimes&&u.chrome.loadTimes()&&u.chrome.loadTimes().wasFetchedViaSpdy),this.j=o?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}function Qa(o){return o.h?!0:o.g?o.g.size>=o.j:!1}function Xa(o){return o.h?1:o.g?o.g.size:0}function Ri(o,l){return o.h?o.h==l:o.g?o.g.has(l):!1}function Ci(o,l){o.g?o.g.add(l):o.h=l}function Ja(o,l){o.h&&o.h==l?o.h=null:o.g&&o.g.has(l)&&o.g.delete(l)}Ka.prototype.cancel=function(){if(this.i=Ya(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const o of this.g.values())o.cancel();this.g.clear()}};function Ya(o){if(o.h!=null)return o.i.concat(o.h.D);if(o.g!=null&&o.g.size!==0){let l=o.i;for(const h of o.g.values())l=l.concat(h.D);return l}return D(o.i)}function tf(o){if(o.V&&typeof o.V=="function")return o.V();if(typeof Map<"u"&&o instanceof Map||typeof Set<"u"&&o instanceof Set)return Array.from(o.values());if(typeof o=="string")return o.split("");if(d(o)){for(var l=[],h=o.length,p=0;p<h;p++)l.push(o[p]);return l}l=[],h=0;for(p in o)l[h++]=o[p];return l}function nf(o){if(o.na&&typeof o.na=="function")return o.na();if(!o.V||typeof o.V!="function"){if(typeof Map<"u"&&o instanceof Map)return Array.from(o.keys());if(!(typeof Set<"u"&&o instanceof Set)){if(d(o)||typeof o=="string"){var l=[];o=o.length;for(var h=0;h<o;h++)l.push(h);return l}l=[],h=0;for(const p in o)l[h++]=p;return l}}}function Za(o,l){if(o.forEach&&typeof o.forEach=="function")o.forEach(l,void 0);else if(d(o)||typeof o=="string")Array.prototype.forEach.call(o,l,void 0);else for(var h=nf(o),p=tf(o),I=p.length,A=0;A<I;A++)l.call(void 0,p[A],h&&h[A],o)}var ec=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function rf(o,l){if(o){o=o.split("&");for(var h=0;h<o.length;h++){var p=o[h].indexOf("="),I=null;if(0<=p){var A=o[h].substring(0,p);I=o[h].substring(p+1)}else A=o[h];l(A,I?decodeURIComponent(I.replace(/\+/g," ")):"")}}}function qt(o){if(this.g=this.o=this.j="",this.s=null,this.m=this.l="",this.h=!1,o instanceof qt){this.h=o.h,Gr(this,o.j),this.o=o.o,this.g=o.g,Wr(this,o.s),this.l=o.l;var l=o.i,h=new Wn;h.i=l.i,l.g&&(h.g=new Map(l.g),h.h=l.h),tc(this,h),this.m=o.m}else o&&(l=String(o).match(ec))?(this.h=!1,Gr(this,l[1]||"",!0),this.o=Hn(l[2]||""),this.g=Hn(l[3]||"",!0),Wr(this,l[4]),this.l=Hn(l[5]||"",!0),tc(this,l[6]||"",!0),this.m=Hn(l[7]||"")):(this.h=!1,this.i=new Wn(null,this.h))}qt.prototype.toString=function(){var o=[],l=this.j;l&&o.push(Gn(l,nc,!0),":");var h=this.g;return(h||l=="file")&&(o.push("//"),(l=this.o)&&o.push(Gn(l,nc,!0),"@"),o.push(encodeURIComponent(String(h)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),h=this.s,h!=null&&o.push(":",String(h))),(h=this.l)&&(this.g&&h.charAt(0)!="/"&&o.push("/"),o.push(Gn(h,h.charAt(0)=="/"?af:of,!0))),(h=this.i.toString())&&o.push("?",h),(h=this.m)&&o.push("#",Gn(h,lf)),o.join("")};function rt(o){return new qt(o)}function Gr(o,l,h){o.j=h?Hn(l,!0):l,o.j&&(o.j=o.j.replace(/:$/,""))}function Wr(o,l){if(l){if(l=Number(l),isNaN(l)||0>l)throw Error("Bad port number "+l);o.s=l}else o.s=null}function tc(o,l,h){l instanceof Wn?(o.i=l,uf(o.i,o.h)):(h||(l=Gn(l,cf)),o.i=new Wn(l,o.h))}function Y(o,l,h){o.i.set(l,h)}function Kr(o){return Y(o,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),o}function Hn(o,l){return o?l?decodeURI(o.replace(/%25/g,"%2525")):decodeURIComponent(o):""}function Gn(o,l,h){return typeof o=="string"?(o=encodeURI(o).replace(l,sf),h&&(o=o.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),o):null}function sf(o){return o=o.charCodeAt(0),"%"+(o>>4&15).toString(16)+(o&15).toString(16)}var nc=/[#\/\?@]/g,of=/[#\?:]/g,af=/[#\?]/g,cf=/[#\?@]/g,lf=/#/g;function Wn(o,l){this.h=this.g=null,this.i=o||null,this.j=!!l}function gt(o){o.g||(o.g=new Map,o.h=0,o.i&&rf(o.i,function(l,h){o.add(decodeURIComponent(l.replace(/\+/g," ")),h)}))}n=Wn.prototype,n.add=function(o,l){gt(this),this.i=null,o=cn(this,o);var h=this.g.get(o);return h||this.g.set(o,h=[]),h.push(l),this.h+=1,this};function rc(o,l){gt(o),l=cn(o,l),o.g.has(l)&&(o.i=null,o.h-=o.g.get(l).length,o.g.delete(l))}function sc(o,l){return gt(o),l=cn(o,l),o.g.has(l)}n.forEach=function(o,l){gt(this),this.g.forEach(function(h,p){h.forEach(function(I){o.call(l,I,p,this)},this)},this)},n.na=function(){gt(this);const o=Array.from(this.g.values()),l=Array.from(this.g.keys()),h=[];for(let p=0;p<l.length;p++){const I=o[p];for(let A=0;A<I.length;A++)h.push(l[p])}return h},n.V=function(o){gt(this);let l=[];if(typeof o=="string")sc(this,o)&&(l=l.concat(this.g.get(cn(this,o))));else{o=Array.from(this.g.values());for(let h=0;h<o.length;h++)l=l.concat(o[h])}return l},n.set=function(o,l){return gt(this),this.i=null,o=cn(this,o),sc(this,o)&&(this.h-=this.g.get(o).length),this.g.set(o,[l]),this.h+=1,this},n.get=function(o,l){return o?(o=this.V(o),0<o.length?String(o[0]):l):l};function ic(o,l,h){rc(o,l),0<h.length&&(o.i=null,o.g.set(cn(o,l),D(h)),o.h+=h.length)}n.toString=function(){if(this.i)return this.i;if(!this.g)return"";const o=[],l=Array.from(this.g.keys());for(var h=0;h<l.length;h++){var p=l[h];const A=encodeURIComponent(String(p)),k=this.V(p);for(p=0;p<k.length;p++){var I=A;k[p]!==""&&(I+="="+encodeURIComponent(String(k[p]))),o.push(I)}}return this.i=o.join("&")};function cn(o,l){return l=String(l),o.j&&(l=l.toLowerCase()),l}function uf(o,l){l&&!o.j&&(gt(o),o.i=null,o.g.forEach(function(h,p){var I=p.toLowerCase();p!=I&&(rc(this,p),ic(this,I,h))},o)),o.j=l}function df(o,l){const h=new jn;if(u.Image){const p=new Image;p.onload=x(yt,h,"TestLoadImage: loaded",!0,l,p),p.onerror=x(yt,h,"TestLoadImage: error",!1,l,p),p.onabort=x(yt,h,"TestLoadImage: abort",!1,l,p),p.ontimeout=x(yt,h,"TestLoadImage: timeout",!1,l,p),u.setTimeout(function(){p.ontimeout&&p.ontimeout()},1e4),p.src=o}else l(!1)}function hf(o,l){const h=new jn,p=new AbortController,I=setTimeout(()=>{p.abort(),yt(h,"TestPingServer: timeout",!1,l)},1e4);fetch(o,{signal:p.signal}).then(A=>{clearTimeout(I),A.ok?yt(h,"TestPingServer: ok",!0,l):yt(h,"TestPingServer: server error",!1,l)}).catch(()=>{clearTimeout(I),yt(h,"TestPingServer: error",!1,l)})}function yt(o,l,h,p,I){try{I&&(I.onload=null,I.onerror=null,I.onabort=null,I.ontimeout=null),p(h)}catch{}}function ff(){this.g=new Kh}function pf(o,l,h){const p=h||"";try{Za(o,function(I,A){let k=I;f(I)&&(k=wi(I)),l.push(p+A+"="+encodeURIComponent(k))})}catch(I){throw l.push(p+"type="+encodeURIComponent("_badmap")),I}}function Qr(o){this.l=o.Ub||null,this.j=o.eb||!1}C(Qr,vi),Qr.prototype.g=function(){return new Xr(this.l,this.j)},Qr.prototype.i=function(o){return function(){return o}}({});function Xr(o,l){Ee.call(this),this.D=o,this.o=l,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.u=new Headers,this.h=null,this.B="GET",this.A="",this.g=!1,this.v=this.j=this.l=null}C(Xr,Ee),n=Xr.prototype,n.open=function(o,l){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.B=o,this.A=l,this.readyState=1,Qn(this)},n.send=function(o){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");this.g=!0;const l={headers:this.u,method:this.B,credentials:this.m,cache:void 0};o&&(l.body=o),(this.D||u).fetch(new Request(this.A,l)).then(this.Sa.bind(this),this.ga.bind(this))},n.abort=function(){this.response=this.responseText="",this.u=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),1<=this.readyState&&this.g&&this.readyState!=4&&(this.g=!1,Kn(this)),this.readyState=0},n.Sa=function(o){if(this.g&&(this.l=o,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=o.headers,this.readyState=2,Qn(this)),this.g&&(this.readyState=3,Qn(this),this.g)))if(this.responseType==="arraybuffer")o.arrayBuffer().then(this.Qa.bind(this),this.ga.bind(this));else if(typeof u.ReadableStream<"u"&&"body"in o){if(this.j=o.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.v=new TextDecoder;oc(this)}else o.text().then(this.Ra.bind(this),this.ga.bind(this))};function oc(o){o.j.read().then(o.Pa.bind(o)).catch(o.ga.bind(o))}n.Pa=function(o){if(this.g){if(this.o&&o.value)this.response.push(o.value);else if(!this.o){var l=o.value?o.value:new Uint8Array(0);(l=this.v.decode(l,{stream:!o.done}))&&(this.response=this.responseText+=l)}o.done?Kn(this):Qn(this),this.readyState==3&&oc(this)}},n.Ra=function(o){this.g&&(this.response=this.responseText=o,Kn(this))},n.Qa=function(o){this.g&&(this.response=o,Kn(this))},n.ga=function(){this.g&&Kn(this)};function Kn(o){o.readyState=4,o.l=null,o.j=null,o.v=null,Qn(o)}n.setRequestHeader=function(o,l){this.u.append(o,l)},n.getResponseHeader=function(o){return this.h&&this.h.get(o.toLowerCase())||""},n.getAllResponseHeaders=function(){if(!this.h)return"";const o=[],l=this.h.entries();for(var h=l.next();!h.done;)h=h.value,o.push(h[0]+": "+h[1]),h=l.next();return o.join(`\r
`)};function Qn(o){o.onreadystatechange&&o.onreadystatechange.call(o)}Object.defineProperty(Xr.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(o){this.m=o?"include":"same-origin"}});function ac(o){let l="";return ue(o,function(h,p){l+=p,l+=":",l+=h,l+=`\r
`}),l}function Pi(o,l,h){e:{for(p in h){var p=!1;break e}p=!0}p||(h=ac(h),typeof o=="string"?h!=null&&encodeURIComponent(String(h)):Y(o,l,h))}function re(o){Ee.call(this),this.headers=new Map,this.o=o||null,this.h=!1,this.v=this.g=null,this.D="",this.m=0,this.l="",this.j=this.B=this.u=this.A=!1,this.I=null,this.H="",this.J=!1}C(re,Ee);var mf=/^https?$/i,gf=["POST","PUT"];n=re.prototype,n.Ha=function(o){this.J=o},n.ea=function(o,l,h,p){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+o);l=l?l.toUpperCase():"GET",this.D=o,this.l="",this.m=0,this.A=!1,this.h=!0,this.g=this.o?this.o.g():Ti.g(),this.v=this.o?Ma(this.o):Ma(Ti),this.g.onreadystatechange=_(this.Ea,this);try{this.B=!0,this.g.open(l,String(o),!0),this.B=!1}catch(A){cc(this,A);return}if(o=h||"",h=new Map(this.headers),p)if(Object.getPrototypeOf(p)===Object.prototype)for(var I in p)h.set(I,p[I]);else if(typeof p.keys=="function"&&typeof p.get=="function")for(const A of p.keys())h.set(A,p.get(A));else throw Error("Unknown input type for opt_headers: "+String(p));p=Array.from(h.keys()).find(A=>A.toLowerCase()=="content-type"),I=u.FormData&&o instanceof u.FormData,!(0<=Array.prototype.indexOf.call(gf,l,void 0))||p||I||h.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[A,k]of h)this.g.setRequestHeader(A,k);this.H&&(this.g.responseType=this.H),"withCredentials"in this.g&&this.g.withCredentials!==this.J&&(this.g.withCredentials=this.J);try{dc(this),this.u=!0,this.g.send(o),this.u=!1}catch(A){cc(this,A)}};function cc(o,l){o.h=!1,o.g&&(o.j=!0,o.g.abort(),o.j=!1),o.l=l,o.m=5,lc(o),Jr(o)}function lc(o){o.A||(o.A=!0,Ce(o,"complete"),Ce(o,"error"))}n.abort=function(o){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.m=o||7,Ce(this,"complete"),Ce(this,"abort"),Jr(this))},n.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),Jr(this,!0)),re.aa.N.call(this)},n.Ea=function(){this.s||(this.B||this.u||this.j?uc(this):this.bb())},n.bb=function(){uc(this)};function uc(o){if(o.h&&typeof a<"u"&&(!o.v[1]||st(o)!=4||o.Z()!=2)){if(o.u&&st(o)==4)Da(o.Ea,0,o);else if(Ce(o,"readystatechange"),st(o)==4){o.h=!1;try{const k=o.Z();e:switch(k){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var l=!0;break e;default:l=!1}var h;if(!(h=l)){var p;if(p=k===0){var I=String(o.D).match(ec)[1]||null;!I&&u.self&&u.self.location&&(I=u.self.location.protocol.slice(0,-1)),p=!mf.test(I?I.toLowerCase():"")}h=p}if(h)Ce(o,"complete"),Ce(o,"success");else{o.m=6;try{var A=2<st(o)?o.g.statusText:""}catch{A=""}o.l=A+" ["+o.Z()+"]",lc(o)}}finally{Jr(o)}}}}function Jr(o,l){if(o.g){dc(o);const h=o.g,p=o.v[0]?()=>{}:null;o.g=null,o.v=null,l||Ce(o,"ready");try{h.onreadystatechange=p}catch{}}}function dc(o){o.I&&(u.clearTimeout(o.I),o.I=null)}n.isActive=function(){return!!this.g};function st(o){return o.g?o.g.readyState:0}n.Z=function(){try{return 2<st(this)?this.g.status:-1}catch{return-1}},n.oa=function(){try{return this.g?this.g.responseText:""}catch{return""}},n.Oa=function(o){if(this.g){var l=this.g.responseText;return o&&l.indexOf(o)==0&&(l=l.substring(o.length)),Wh(l)}};function hc(o){try{if(!o.g)return null;if("response"in o.g)return o.g.response;switch(o.H){case"":case"text":return o.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in o.g)return o.g.mozResponseArrayBuffer}return null}catch{return null}}function yf(o){const l={};o=(o.g&&2<=st(o)&&o.g.getAllResponseHeaders()||"").split(`\r
`);for(let p=0;p<o.length;p++){if(F(o[p]))continue;var h=E(o[p]);const I=h[0];if(h=h[1],typeof h!="string")continue;h=h.trim();const A=l[I]||[];l[I]=A,A.push(h)}g(l,function(p){return p.join(", ")})}n.Ba=function(){return this.m},n.Ka=function(){return typeof this.l=="string"?this.l:String(this.l)};function Xn(o,l,h){return h&&h.internalChannelParams&&h.internalChannelParams[o]||l}function fc(o){this.Aa=0,this.i=[],this.j=new jn,this.ia=this.qa=this.I=this.W=this.g=this.ya=this.D=this.H=this.m=this.S=this.o=null,this.Ya=this.U=0,this.Va=Xn("failFast",!1,o),this.F=this.C=this.u=this.s=this.l=null,this.X=!0,this.za=this.T=-1,this.Y=this.v=this.B=0,this.Ta=Xn("baseRetryDelayMs",5e3,o),this.cb=Xn("retryDelaySeedMs",1e4,o),this.Wa=Xn("forwardChannelMaxRetries",2,o),this.wa=Xn("forwardChannelRequestTimeoutMs",2e4,o),this.pa=o&&o.xmlHttpFactory||void 0,this.Xa=o&&o.Tb||void 0,this.Ca=o&&o.useFetchStreams||!1,this.L=void 0,this.J=o&&o.supportsCrossDomainXhr||!1,this.K="",this.h=new Ka(o&&o.concurrentRequestLimit),this.Da=new ff,this.P=o&&o.fastHandshake||!1,this.O=o&&o.encodeInitMessageHeaders||!1,this.P&&this.O&&(this.O=!1),this.Ua=o&&o.Rb||!1,o&&o.xa&&this.j.xa(),o&&o.forceLongPolling&&(this.X=!1),this.ba=!this.P&&this.X&&o&&o.detectBufferingProxy||!1,this.ja=void 0,o&&o.longPollingTimeout&&0<o.longPollingTimeout&&(this.ja=o.longPollingTimeout),this.ca=void 0,this.R=0,this.M=!1,this.ka=this.A=null}n=fc.prototype,n.la=8,n.G=1,n.connect=function(o,l,h,p){Pe(0),this.W=o,this.H=l||{},h&&p!==void 0&&(this.H.OSID=h,this.H.OAID=p),this.F=this.X,this.I=Ec(this,null,this.W),Zr(this)};function ki(o){if(pc(o),o.G==3){var l=o.U++,h=rt(o.I);if(Y(h,"SID",o.K),Y(h,"RID",l),Y(h,"TYPE","terminate"),Jn(o,h),l=new mt(o,o.j,l),l.L=2,l.v=Kr(rt(h)),h=!1,u.navigator&&u.navigator.sendBeacon)try{h=u.navigator.sendBeacon(l.v.toString(),"")}catch{}!h&&u.Image&&(new Image().src=l.v,h=!0),h||(l.g=Tc(l.j,null),l.g.ea(l.v)),l.F=Date.now(),Hr(l)}bc(o)}function Yr(o){o.g&&(Vi(o),o.g.cancel(),o.g=null)}function pc(o){Yr(o),o.u&&(u.clearTimeout(o.u),o.u=null),es(o),o.h.cancel(),o.s&&(typeof o.s=="number"&&u.clearTimeout(o.s),o.s=null)}function Zr(o){if(!Qa(o.h)&&!o.s){o.s=!0;var l=o.Ga;Mn||Sa(),Ln||(Mn(),Ln=!0),di.add(l,o),o.B=0}}function _f(o,l){return Xa(o.h)>=o.h.j-(o.s?1:0)?!1:o.s?(o.i=l.D.concat(o.i),!0):o.G==1||o.G==2||o.B>=(o.Va?0:o.Wa)?!1:(o.s=qn(_(o.Ga,o,l),vc(o,o.B)),o.B++,!0)}n.Ga=function(o){if(this.s)if(this.s=null,this.G==1){if(!o){this.U=Math.floor(1e5*Math.random()),o=this.U++;const I=new mt(this,this.j,o);let A=this.o;if(this.S&&(A?(A=m(A),b(A,this.S)):A=this.S),this.m!==null||this.O||(I.H=A,A=null),this.P)e:{for(var l=0,h=0;h<this.i.length;h++){t:{var p=this.i[h];if("__data__"in p.map&&(p=p.map.__data__,typeof p=="string")){p=p.length;break t}p=void 0}if(p===void 0)break;if(l+=p,4096<l){l=h;break e}if(l===4096||h===this.i.length-1){l=h+1;break e}}l=1e3}else l=1e3;l=gc(this,I,l),h=rt(this.I),Y(h,"RID",o),Y(h,"CVER",22),this.D&&Y(h,"X-HTTP-Session-Id",this.D),Jn(this,h),A&&(this.O?l="headers="+encodeURIComponent(String(ac(A)))+"&"+l:this.m&&Pi(h,this.m,A)),Ci(this.h,I),this.Ua&&Y(h,"TYPE","init"),this.P?(Y(h,"$req",l),Y(h,"SID","null"),I.T=!0,Ai(I,h,null)):Ai(I,h,l),this.G=2}}else this.G==3&&(o?mc(this,o):this.i.length==0||Qa(this.h)||mc(this))};function mc(o,l){var h;l?h=l.l:h=o.U++;const p=rt(o.I);Y(p,"SID",o.K),Y(p,"RID",h),Y(p,"AID",o.T),Jn(o,p),o.m&&o.o&&Pi(p,o.m,o.o),h=new mt(o,o.j,h,o.B+1),o.m===null&&(h.H=o.o),l&&(o.i=l.D.concat(o.i)),l=gc(o,h,1e3),h.I=Math.round(.5*o.wa)+Math.round(.5*o.wa*Math.random()),Ci(o.h,h),Ai(h,p,l)}function Jn(o,l){o.H&&ue(o.H,function(h,p){Y(l,p,h)}),o.l&&Za({},function(h,p){Y(l,p,h)})}function gc(o,l,h){h=Math.min(o.i.length,h);var p=o.l?_(o.l.Na,o.l,o):null;e:{var I=o.i;let A=-1;for(;;){const k=["count="+h];A==-1?0<h?(A=I[0].g,k.push("ofs="+A)):A=0:k.push("ofs="+A);let X=!0;for(let ye=0;ye<h;ye++){let K=I[ye].g;const Te=I[ye].map;if(K-=A,0>K)A=Math.max(0,I[ye].g-100),X=!1;else try{pf(Te,k,"req"+K+"_")}catch{p&&p(Te)}}if(X){p=k.join("&");break e}}}return o=o.i.splice(0,h),l.D=o,p}function yc(o){if(!o.g&&!o.u){o.Y=1;var l=o.Fa;Mn||Sa(),Ln||(Mn(),Ln=!0),di.add(l,o),o.v=0}}function Di(o){return o.g||o.u||3<=o.v?!1:(o.Y++,o.u=qn(_(o.Fa,o),vc(o,o.v)),o.v++,!0)}n.Fa=function(){if(this.u=null,_c(this),this.ba&&!(this.M||this.g==null||0>=this.R)){var o=2*this.R;this.j.info("BP detection timer enabled: "+o),this.A=qn(_(this.ab,this),o)}},n.ab=function(){this.A&&(this.A=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.M=!0,Pe(10),Yr(this),_c(this))};function Vi(o){o.A!=null&&(u.clearTimeout(o.A),o.A=null)}function _c(o){o.g=new mt(o,o.j,"rpc",o.Y),o.m===null&&(o.g.H=o.o),o.g.O=0;var l=rt(o.qa);Y(l,"RID","rpc"),Y(l,"SID",o.K),Y(l,"AID",o.T),Y(l,"CI",o.F?"0":"1"),!o.F&&o.ja&&Y(l,"TO",o.ja),Y(l,"TYPE","xmlhttp"),Jn(o,l),o.m&&o.o&&Pi(l,o.m,o.o),o.L&&(o.g.I=o.L);var h=o.g;o=o.ia,h.L=1,h.v=Kr(rt(l)),h.m=null,h.P=!0,Ha(h,o)}n.Za=function(){this.C!=null&&(this.C=null,Yr(this),Di(this),Pe(19))};function es(o){o.C!=null&&(u.clearTimeout(o.C),o.C=null)}function wc(o,l){var h=null;if(o.g==l){es(o),Vi(o),o.g=null;var p=2}else if(Ri(o.h,l))h=l.D,Ja(o.h,l),p=1;else return;if(o.G!=0){if(l.o)if(p==1){h=l.m?l.m.length:0,l=Date.now()-l.F;var I=o.B;p=qr(),Ce(p,new $a(p,h)),Zr(o)}else yc(o);else if(I=l.s,I==3||I==0&&0<l.X||!(p==1&&_f(o,l)||p==2&&Di(o)))switch(h&&0<h.length&&(l=o.h,l.i=l.i.concat(h)),I){case 1:jt(o,5);break;case 4:jt(o,10);break;case 3:jt(o,6);break;default:jt(o,2)}}}function vc(o,l){let h=o.Ta+Math.floor(Math.random()*o.cb);return o.isActive()||(h*=2),h*l}function jt(o,l){if(o.j.info("Error code "+l),l==2){var h=_(o.fb,o),p=o.Xa;const I=!p;p=new qt(p||"//www.google.com/images/cleardot.gif"),u.location&&u.location.protocol=="http"||Gr(p,"https"),Kr(p),I?df(p.toString(),h):hf(p.toString(),h)}else Pe(2);o.G=0,o.l&&o.l.sa(l),bc(o),pc(o)}n.fb=function(o){o?(this.j.info("Successfully pinged google.com"),Pe(2)):(this.j.info("Failed to ping google.com"),Pe(1))};function bc(o){if(o.G=0,o.ka=[],o.l){const l=Ya(o.h);(l.length!=0||o.i.length!=0)&&(P(o.ka,l),P(o.ka,o.i),o.h.i.length=0,D(o.i),o.i.length=0),o.l.ra()}}function Ec(o,l,h){var p=h instanceof qt?rt(h):new qt(h);if(p.g!="")l&&(p.g=l+"."+p.g),Wr(p,p.s);else{var I=u.location;p=I.protocol,l=l?l+"."+I.hostname:I.hostname,I=+I.port;var A=new qt(null);p&&Gr(A,p),l&&(A.g=l),I&&Wr(A,I),h&&(A.l=h),p=A}return h=o.D,l=o.ya,h&&l&&Y(p,h,l),Y(p,"VER",o.la),Jn(o,p),p}function Tc(o,l,h){if(l&&!o.J)throw Error("Can't create secondary domain capable XhrIo object.");return l=o.Ca&&!o.pa?new re(new Qr({eb:h})):new re(o.pa),l.Ha(o.J),l}n.isActive=function(){return!!this.l&&this.l.isActive(this)};function Ic(){}n=Ic.prototype,n.ua=function(){},n.ta=function(){},n.sa=function(){},n.ra=function(){},n.isActive=function(){return!0},n.Na=function(){};function ts(){}ts.prototype.g=function(o,l){return new Oe(o,l)};function Oe(o,l){Ee.call(this),this.g=new fc(l),this.l=o,this.h=l&&l.messageUrlParams||null,o=l&&l.messageHeaders||null,l&&l.clientProtocolHeaderRequired&&(o?o["X-Client-Protocol"]="webchannel":o={"X-Client-Protocol":"webchannel"}),this.g.o=o,o=l&&l.initMessageHeaders||null,l&&l.messageContentType&&(o?o["X-WebChannel-Content-Type"]=l.messageContentType:o={"X-WebChannel-Content-Type":l.messageContentType}),l&&l.va&&(o?o["X-WebChannel-Client-Profile"]=l.va:o={"X-WebChannel-Client-Profile":l.va}),this.g.S=o,(o=l&&l.Sb)&&!F(o)&&(this.g.m=o),this.v=l&&l.supportsCrossDomainXhr||!1,this.u=l&&l.sendRawJson||!1,(l=l&&l.httpSessionIdParam)&&!F(l)&&(this.g.D=l,o=this.h,o!==null&&l in o&&(o=this.h,l in o&&delete o[l])),this.j=new ln(this)}C(Oe,Ee),Oe.prototype.m=function(){this.g.l=this.j,this.v&&(this.g.J=!0),this.g.connect(this.l,this.h||void 0)},Oe.prototype.close=function(){ki(this.g)},Oe.prototype.o=function(o){var l=this.g;if(typeof o=="string"){var h={};h.__data__=o,o=h}else this.u&&(h={},h.__data__=wi(o),o=h);l.i.push(new ef(l.Ya++,o)),l.G==3&&Zr(l)},Oe.prototype.N=function(){this.g.l=null,delete this.j,ki(this.g),delete this.g,Oe.aa.N.call(this)};function Ac(o){bi.call(this),o.__headers__&&(this.headers=o.__headers__,this.statusCode=o.__status__,delete o.__headers__,delete o.__status__);var l=o.__sm__;if(l){e:{for(const h in l){o=h;break e}o=void 0}(this.i=o)&&(o=this.i,l=l!==null&&o in l?l[o]:void 0),this.data=l}else this.data=o}C(Ac,bi);function xc(){Ei.call(this),this.status=1}C(xc,Ei);function ln(o){this.g=o}C(ln,Ic),ln.prototype.ua=function(){Ce(this.g,"a")},ln.prototype.ta=function(o){Ce(this.g,new Ac(o))},ln.prototype.sa=function(o){Ce(this.g,new xc)},ln.prototype.ra=function(){Ce(this.g,"b")},ts.prototype.createWebChannel=ts.prototype.g,Oe.prototype.send=Oe.prototype.o,Oe.prototype.open=Oe.prototype.m,Oe.prototype.close=Oe.prototype.close,bu=function(){return new ts},vu=function(){return qr()},wu=Bt,to={mb:0,pb:1,qb:2,Jb:3,Ob:4,Lb:5,Mb:6,Kb:7,Ib:8,Nb:9,PROXY:10,NOPROXY:11,Gb:12,Cb:13,Db:14,Bb:15,Eb:16,Fb:17,ib:18,hb:19,jb:20},jr.NO_ERROR=0,jr.TIMEOUT=8,jr.HTTP_ERROR=6,ls=jr,qa.COMPLETE="complete",_u=qa,La.EventType=Bn,Bn.OPEN="a",Bn.CLOSE="b",Bn.ERROR="c",Bn.MESSAGE="d",Ee.prototype.listen=Ee.prototype.K,Yn=La,re.prototype.listenOnce=re.prototype.L,re.prototype.getLastError=re.prototype.Ka,re.prototype.getLastErrorCode=re.prototype.Ba,re.prototype.getStatus=re.prototype.Z,re.prototype.getResponseJson=re.prototype.Oa,re.prototype.getResponseText=re.prototype.oa,re.prototype.send=re.prototype.ea,re.prototype.setWithCredentials=re.prototype.Ha,yu=re}).apply(typeof rs<"u"?rs:typeof self<"u"?self:typeof window<"u"?window:{});const Uc="@firebase/firestore",Bc="4.9.0";/**
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
 */class xe{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}xe.UNAUTHENTICATED=new xe(null),xe.GOOGLE_CREDENTIALS=new xe("google-credentials-uid"),xe.FIRST_PARTY=new xe("first-party-uid"),xe.MOCK_USER=new xe("mock-user");/**
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
 */let Cn="12.0.0";/**
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
 */const Yt=new So("@firebase/firestore");function dn(){return Yt.logLevel}function N(n,...e){if(Yt.logLevel<=z.DEBUG){const t=e.map(Po);Yt.debug(`Firestore (${Cn}): ${n}`,...t)}}function lt(n,...e){if(Yt.logLevel<=z.ERROR){const t=e.map(Po);Yt.error(`Firestore (${Cn}): ${n}`,...t)}}function vn(n,...e){if(Yt.logLevel<=z.WARN){const t=e.map(Po);Yt.warn(`Firestore (${Cn}): ${n}`,...t)}}function Po(n){if(typeof n=="string")return n;try{/**
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
 */function L(n,e,t){let r="Unexpected state";typeof e=="string"?r=e:t=e,Eu(n,r,t)}function Eu(n,e,t){let r=`FIRESTORE (${Cn}) INTERNAL ASSERTION FAILED: ${e} (ID: ${n.toString(16)})`;if(t!==void 0)try{r+=" CONTEXT: "+JSON.stringify(t)}catch{r+=" CONTEXT: "+t}throw lt(r),new Error(r)}function Q(n,e,t,r){let s="Unexpected state";typeof t=="string"?s=t:r=t,n||Eu(e,s,r)}function $(n,e){return n}/**
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
 */const S={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class V extends ft{constructor(e,t){super(e,t),this.code=e,this.message=t,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
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
 */class St{constructor(){this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}}/**
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
 */class Tu{constructor(e,t){this.user=t,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class nm{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,t){e.enqueueRetryable(()=>t(xe.UNAUTHENTICATED))}shutdown(){}}class rm{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,t){this.changeListener=t,e.enqueueRetryable(()=>t(this.token.user))}shutdown(){this.changeListener=null}}class sm{constructor(e){this.t=e,this.currentUser=xe.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,t){Q(this.o===void 0,42304);let r=this.i;const s=d=>this.i!==r?(r=this.i,t(d)):Promise.resolve();let i=new St;this.o=()=>{this.i++,this.currentUser=this.u(),i.resolve(),i=new St,e.enqueueRetryable(()=>s(this.currentUser))};const a=()=>{const d=i;e.enqueueRetryable(async()=>{await d.promise,await s(this.currentUser)})},u=d=>{N("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=d,this.o&&(this.auth.addAuthTokenListener(this.o),a())};this.t.onInit(d=>u(d)),setTimeout(()=>{if(!this.auth){const d=this.t.getImmediate({optional:!0});d?u(d):(N("FirebaseAuthCredentialsProvider","Auth not yet detected"),i.resolve(),i=new St)}},0),a()}getToken(){const e=this.i,t=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(t).then(r=>this.i!==e?(N("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):r?(Q(typeof r.accessToken=="string",31837,{l:r}),new Tu(r.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const e=this.auth&&this.auth.getUid();return Q(e===null||typeof e=="string",2055,{h:e}),new xe(e)}}class im{constructor(e,t,r){this.P=e,this.T=t,this.I=r,this.type="FirstParty",this.user=xe.FIRST_PARTY,this.A=new Map}R(){return this.I?this.I():null}get headers(){this.A.set("X-Goog-AuthUser",this.P);const e=this.R();return e&&this.A.set("Authorization",e),this.T&&this.A.set("X-Goog-Iam-Authorization-Token",this.T),this.A}}class om{constructor(e,t,r){this.P=e,this.T=t,this.I=r}getToken(){return Promise.resolve(new im(this.P,this.T,this.I))}start(e,t){e.enqueueRetryable(()=>t(xe.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class $c{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class am{constructor(e,t){this.V=t,this.forceRefresh=!1,this.appCheck=null,this.m=null,this.p=null,qe(e)&&e.settings.appCheckToken&&(this.p=e.settings.appCheckToken)}start(e,t){Q(this.o===void 0,3512);const r=i=>{i.error!=null&&N("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${i.error.message}`);const a=i.token!==this.m;return this.m=i.token,N("FirebaseAppCheckTokenProvider",`Received ${a?"new":"existing"} token.`),a?t(i.token):Promise.resolve()};this.o=i=>{e.enqueueRetryable(()=>r(i))};const s=i=>{N("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=i,this.o&&this.appCheck.addTokenListener(this.o)};this.V.onInit(i=>s(i)),setTimeout(()=>{if(!this.appCheck){const i=this.V.getImmediate({optional:!0});i?s(i):N("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){if(this.p)return Promise.resolve(new $c(this.p));const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then(t=>t?(Q(typeof t.token=="string",44558,{tokenResult:t}),this.m=t.token,new $c(t.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}/**
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
 */function cm(n){const e=typeof self<"u"&&(self.crypto||self.msCrypto),t=new Uint8Array(n);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(t);else for(let r=0;r<n;r++)t[r]=Math.floor(256*Math.random());return t}/**
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
 */class ko{static newId(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",t=62*Math.floor(4.129032258064516);let r="";for(;r.length<20;){const s=cm(40);for(let i=0;i<s.length;++i)r.length<20&&s[i]<t&&(r+=e.charAt(s[i]%62))}return r}}function H(n,e){return n<e?-1:n>e?1:0}function no(n,e){const t=Math.min(n.length,e.length);for(let r=0;r<t;r++){const s=n.charAt(r),i=e.charAt(r);if(s!==i)return Bi(s)===Bi(i)?H(s,i):Bi(s)?1:-1}return H(n.length,e.length)}const lm=55296,um=57343;function Bi(n){const e=n.charCodeAt(0);return e>=lm&&e<=um}function bn(n,e,t){return n.length===e.length&&n.every((r,s)=>t(r,e[s]))}/**
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
 */const qc="__name__";class We{constructor(e,t,r){t===void 0?t=0:t>e.length&&L(637,{offset:t,range:e.length}),r===void 0?r=e.length-t:r>e.length-t&&L(1746,{length:r,range:e.length-t}),this.segments=e,this.offset=t,this.len=r}get length(){return this.len}isEqual(e){return We.comparator(this,e)===0}child(e){const t=this.segments.slice(this.offset,this.limit());return e instanceof We?e.forEach(r=>{t.push(r)}):t.push(e),this.construct(t)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}forEach(e){for(let t=this.offset,r=this.limit();t<r;t++)e(this.segments[t])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,t){const r=Math.min(e.length,t.length);for(let s=0;s<r;s++){const i=We.compareSegments(e.get(s),t.get(s));if(i!==0)return i}return H(e.length,t.length)}static compareSegments(e,t){const r=We.isNumericId(e),s=We.isNumericId(t);return r&&!s?-1:!r&&s?1:r&&s?We.extractNumericId(e).compare(We.extractNumericId(t)):no(e,t)}static isNumericId(e){return e.startsWith("__id")&&e.endsWith("__")}static extractNumericId(e){return xt.fromString(e.substring(4,e.length-2))}}class J extends We{construct(e,t,r){return new J(e,t,r)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){const t=[];for(const r of e){if(r.indexOf("//")>=0)throw new V(S.INVALID_ARGUMENT,`Invalid segment (${r}). Paths must not contain // in them.`);t.push(...r.split("/").filter(s=>s.length>0))}return new J(t)}static emptyPath(){return new J([])}}const dm=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class we extends We{construct(e,t,r){return new we(e,t,r)}static isValidIdentifier(e){return dm.test(e)}canonicalString(){return this.toArray().map(e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),we.isValidIdentifier(e)||(e="`"+e+"`"),e)).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)===qc}static keyField(){return new we([qc])}static fromServerFormat(e){const t=[];let r="",s=0;const i=()=>{if(r.length===0)throw new V(S.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);t.push(r),r=""};let a=!1;for(;s<e.length;){const u=e[s];if(u==="\\"){if(s+1===e.length)throw new V(S.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const d=e[s+1];if(d!=="\\"&&d!=="."&&d!=="`")throw new V(S.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);r+=d,s+=2}else u==="`"?(a=!a,s++):u!=="."||a?(r+=u,s++):(i(),s++)}if(i(),a)throw new V(S.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new we(t)}static emptyPath(){return new we([])}}/**
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
 */class O{constructor(e){this.path=e}static fromPath(e){return new O(J.fromString(e))}static fromName(e){return new O(J.fromString(e).popFirst(5))}static empty(){return new O(J.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&J.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,t){return J.comparator(e.path,t.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new O(new J(e.slice()))}}/**
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
 */function Iu(n,e,t){if(!t)throw new V(S.INVALID_ARGUMENT,`Function ${n}() cannot be called with an empty ${e}.`)}function hm(n,e,t,r){if(e===!0&&r===!0)throw new V(S.INVALID_ARGUMENT,`${n} and ${t} cannot be used together.`)}function jc(n){if(!O.isDocumentKey(n))throw new V(S.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${n} has ${n.length}.`)}function zc(n){if(O.isDocumentKey(n))throw new V(S.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${n} has ${n.length}.`)}function Au(n){return typeof n=="object"&&n!==null&&(Object.getPrototypeOf(n)===Object.prototype||Object.getPrototypeOf(n)===null)}function $s(n){if(n===void 0)return"undefined";if(n===null)return"null";if(typeof n=="string")return n.length>20&&(n=`${n.substring(0,20)}...`),JSON.stringify(n);if(typeof n=="number"||typeof n=="boolean")return""+n;if(typeof n=="object"){if(n instanceof Array)return"an array";{const e=function(r){return r.constructor?r.constructor.name:null}(n);return e?`a custom ${e} object`:"an object"}}return typeof n=="function"?"a function":L(12329,{type:typeof n})}function Le(n,e){if("_delegate"in n&&(n=n._delegate),!(n instanceof e)){if(e.name===n.constructor.name)throw new V(S.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const t=$s(n);throw new V(S.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${t}`)}}return n}/**
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
 */function ce(n,e){const t={typeString:n};return e&&(t.value=e),t}function Tr(n,e){if(!Au(n))throw new V(S.INVALID_ARGUMENT,"JSON must be an object");let t;for(const r in e)if(e[r]){const s=e[r].typeString,i="value"in e[r]?{value:e[r].value}:void 0;if(!(r in n)){t=`JSON missing required field: '${r}'`;break}const a=n[r];if(s&&typeof a!==s){t=`JSON field '${r}' must be a ${s}.`;break}if(i!==void 0&&a!==i.value){t=`Expected '${r}' field to equal '${i.value}'`;break}}if(t)throw new V(S.INVALID_ARGUMENT,t);return!0}/**
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
 */const Hc=-62135596800,Gc=1e6;class Z{static now(){return Z.fromMillis(Date.now())}static fromDate(e){return Z.fromMillis(e.getTime())}static fromMillis(e){const t=Math.floor(e/1e3),r=Math.floor((e-1e3*t)*Gc);return new Z(t,r)}constructor(e,t){if(this.seconds=e,this.nanoseconds=t,t<0)throw new V(S.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(t>=1e9)throw new V(S.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(e<Hc)throw new V(S.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new V(S.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/Gc}_compareTo(e){return this.seconds===e.seconds?H(this.nanoseconds,e.nanoseconds):H(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{type:Z._jsonSchemaVersion,seconds:this.seconds,nanoseconds:this.nanoseconds}}static fromJSON(e){if(Tr(e,Z._jsonSchema))return new Z(e.seconds,e.nanoseconds)}valueOf(){const e=this.seconds-Hc;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}Z._jsonSchemaVersion="firestore/timestamp/1.0",Z._jsonSchema={type:ce("string",Z._jsonSchemaVersion),seconds:ce("number"),nanoseconds:ce("number")};/**
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
 */class B{static fromTimestamp(e){return new B(e)}static min(){return new B(new Z(0,0))}static max(){return new B(new Z(253402300799,999999999))}constructor(e){this.timestamp=e}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
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
 */const ur=-1;function fm(n,e){const t=n.toTimestamp().seconds,r=n.toTimestamp().nanoseconds+1,s=B.fromTimestamp(r===1e9?new Z(t+1,0):new Z(t,r));return new Pt(s,O.empty(),e)}function pm(n){return new Pt(n.readTime,n.key,ur)}class Pt{constructor(e,t,r){this.readTime=e,this.documentKey=t,this.largestBatchId=r}static min(){return new Pt(B.min(),O.empty(),ur)}static max(){return new Pt(B.max(),O.empty(),ur)}}function mm(n,e){let t=n.readTime.compareTo(e.readTime);return t!==0?t:(t=O.comparator(n.documentKey,e.documentKey),t!==0?t:H(n.largestBatchId,e.largestBatchId))}/**
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
 */const gm="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class ym{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(e=>e())}}/**
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
 */async function Pn(n){if(n.code!==S.FAILED_PRECONDITION||n.message!==gm)throw n;N("LocalStore","Unexpectedly lost primary lease")}/**
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
 */class R{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e(t=>{this.isDone=!0,this.result=t,this.nextCallback&&this.nextCallback(t)},t=>{this.isDone=!0,this.error=t,this.catchCallback&&this.catchCallback(t)})}catch(e){return this.next(void 0,e)}next(e,t){return this.callbackAttached&&L(59440),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(t,this.error):this.wrapSuccess(e,this.result):new R((r,s)=>{this.nextCallback=i=>{this.wrapSuccess(e,i).next(r,s)},this.catchCallback=i=>{this.wrapFailure(t,i).next(r,s)}})}toPromise(){return new Promise((e,t)=>{this.next(e,t)})}wrapUserFunction(e){try{const t=e();return t instanceof R?t:R.resolve(t)}catch(t){return R.reject(t)}}wrapSuccess(e,t){return e?this.wrapUserFunction(()=>e(t)):R.resolve(t)}wrapFailure(e,t){return e?this.wrapUserFunction(()=>e(t)):R.reject(t)}static resolve(e){return new R((t,r)=>{t(e)})}static reject(e){return new R((t,r)=>{r(e)})}static waitFor(e){return new R((t,r)=>{let s=0,i=0,a=!1;e.forEach(u=>{++s,u.next(()=>{++i,a&&i===s&&t()},d=>r(d))}),a=!0,i===s&&t()})}static or(e){let t=R.resolve(!1);for(const r of e)t=t.next(s=>s?R.resolve(s):r());return t}static forEach(e,t){const r=[];return e.forEach((s,i)=>{r.push(t.call(this,s,i))}),this.waitFor(r)}static mapArray(e,t){return new R((r,s)=>{const i=e.length,a=new Array(i);let u=0;for(let d=0;d<i;d++){const f=d;t(e[f]).next(c=>{a[f]=c,++u,u===i&&r(a)},c=>s(c))}})}static doWhile(e,t){return new R((r,s)=>{const i=()=>{e()===!0?t().next(()=>{i()},s):r()};i()})}}function _m(n){const e=n.match(/Android ([\d.]+)/i),t=e?e[1].split(".").slice(0,2).join("."):"-1";return Number(t)}function kn(n){return n.name==="IndexedDbTransactionError"}/**
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
 */class qs{constructor(e,t){this.previousValue=e,t&&(t.sequenceNumberHandler=r=>this.ae(r),this.ue=r=>t.writeSequenceNumber(r))}ae(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){const e=++this.previousValue;return this.ue&&this.ue(e),e}}qs.ce=-1;/**
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
 */const Do=-1;function js(n){return n==null}function Es(n){return n===0&&1/n==-1/0}function wm(n){return typeof n=="number"&&Number.isInteger(n)&&!Es(n)&&n<=Number.MAX_SAFE_INTEGER&&n>=Number.MIN_SAFE_INTEGER}/**
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
 */const xu="";function vm(n){let e="";for(let t=0;t<n.length;t++)e.length>0&&(e=Wc(e)),e=bm(n.get(t),e);return Wc(e)}function bm(n,e){let t=e;const r=n.length;for(let s=0;s<r;s++){const i=n.charAt(s);switch(i){case"\0":t+="";break;case xu:t+="";break;default:t+=i}}return t}function Wc(n){return n+xu+""}/**
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
 */function Kc(n){let e=0;for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e++;return e}function Lt(n,e){for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e(t,n[t])}function Su(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}/**
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
 */class te{constructor(e,t){this.comparator=e,this.root=t||_e.EMPTY}insert(e,t){return new te(this.comparator,this.root.insert(e,t,this.comparator).copy(null,null,_e.BLACK,null,null))}remove(e){return new te(this.comparator,this.root.remove(e,this.comparator).copy(null,null,_e.BLACK,null,null))}get(e){let t=this.root;for(;!t.isEmpty();){const r=this.comparator(e,t.key);if(r===0)return t.value;r<0?t=t.left:r>0&&(t=t.right)}return null}indexOf(e){let t=0,r=this.root;for(;!r.isEmpty();){const s=this.comparator(e,r.key);if(s===0)return t+r.left.size;s<0?r=r.left:(t+=r.left.size+1,r=r.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal((t,r)=>(e(t,r),!1))}toString(){const e=[];return this.inorderTraversal((t,r)=>(e.push(`${t}:${r}`),!1)),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new ss(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new ss(this.root,e,this.comparator,!1)}getReverseIterator(){return new ss(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new ss(this.root,e,this.comparator,!0)}}class ss{constructor(e,t,r,s){this.isReverse=s,this.nodeStack=[];let i=1;for(;!e.isEmpty();)if(i=t?r(e.key,t):1,t&&s&&(i*=-1),i<0)e=this.isReverse?e.left:e.right;else{if(i===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop();const t={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return t}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class _e{constructor(e,t,r,s,i){this.key=e,this.value=t,this.color=r??_e.RED,this.left=s??_e.EMPTY,this.right=i??_e.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,t,r,s,i){return new _e(e??this.key,t??this.value,r??this.color,s??this.left,i??this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,r){let s=this;const i=r(e,s.key);return s=i<0?s.copy(null,null,null,s.left.insert(e,t,r),null):i===0?s.copy(null,t,null,null,null):s.copy(null,null,null,null,s.right.insert(e,t,r)),s.fixUp()}removeMin(){if(this.left.isEmpty())return _e.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,t){let r,s=this;if(t(e,s.key)<0)s.left.isEmpty()||s.left.isRed()||s.left.left.isRed()||(s=s.moveRedLeft()),s=s.copy(null,null,null,s.left.remove(e,t),null);else{if(s.left.isRed()&&(s=s.rotateRight()),s.right.isEmpty()||s.right.isRed()||s.right.left.isRed()||(s=s.moveRedRight()),t(e,s.key)===0){if(s.right.isEmpty())return _e.EMPTY;r=s.right.min(),s=s.copy(r.key,r.value,null,null,s.right.removeMin())}s=s.copy(null,null,null,null,s.right.remove(e,t))}return s.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,_e.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,_e.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed())throw L(43730,{key:this.key,value:this.value});if(this.right.isRed())throw L(14113,{key:this.key,value:this.value});const e=this.left.check();if(e!==this.right.check())throw L(27949);return e+(this.isRed()?0:1)}}_e.EMPTY=null,_e.RED=!0,_e.BLACK=!1;_e.EMPTY=new class{constructor(){this.size=0}get key(){throw L(57766)}get value(){throw L(16141)}get color(){throw L(16727)}get left(){throw L(29726)}get right(){throw L(36894)}copy(e,t,r,s,i){return this}insert(e,t,r){return new _e(e,t)}remove(e,t){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
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
 */class de{constructor(e){this.comparator=e,this.data=new te(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal((t,r)=>(e(t),!1))}forEachInRange(e,t){const r=this.data.getIteratorFrom(e[0]);for(;r.hasNext();){const s=r.getNext();if(this.comparator(s.key,e[1])>=0)return;t(s.key)}}forEachWhile(e,t){let r;for(r=t!==void 0?this.data.getIteratorFrom(t):this.data.getIterator();r.hasNext();)if(!e(r.getNext().key))return}firstAfterOrEqual(e){const t=this.data.getIteratorFrom(e);return t.hasNext()?t.getNext().key:null}getIterator(){return new Qc(this.data.getIterator())}getIteratorFrom(e){return new Qc(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let t=this;return t.size<e.size&&(t=e,e=this),e.forEach(r=>{t=t.add(r)}),t}isEqual(e){if(!(e instanceof de)||this.size!==e.size)return!1;const t=this.data.getIterator(),r=e.data.getIterator();for(;t.hasNext();){const s=t.getNext().key,i=r.getNext().key;if(this.comparator(s,i)!==0)return!1}return!0}toArray(){const e=[];return this.forEach(t=>{e.push(t)}),e}toString(){const e=[];return this.forEach(t=>e.push(t)),"SortedSet("+e.toString()+")"}copy(e){const t=new de(this.comparator);return t.data=e,t}}class Qc{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}/**
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
 */class Me{constructor(e){this.fields=e,e.sort(we.comparator)}static empty(){return new Me([])}unionWith(e){let t=new de(we.comparator);for(const r of this.fields)t=t.add(r);for(const r of e)t=t.add(r);return new Me(t.toArray())}covers(e){for(const t of this.fields)if(t.isPrefixOf(e))return!0;return!1}isEqual(e){return bn(this.fields,e.fields,(t,r)=>t.isEqual(r))}}/**
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
 */class Ru extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
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
 */class ve{constructor(e){this.binaryString=e}static fromBase64String(e){const t=function(s){try{return atob(s)}catch(i){throw typeof DOMException<"u"&&i instanceof DOMException?new Ru("Invalid base64 string: "+i):i}}(e);return new ve(t)}static fromUint8Array(e){const t=function(s){let i="";for(let a=0;a<s.length;++a)i+=String.fromCharCode(s[a]);return i}(e);return new ve(t)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return function(t){return btoa(t)}(this.binaryString)}toUint8Array(){return function(t){const r=new Uint8Array(t.length);for(let s=0;s<t.length;s++)r[s]=t.charCodeAt(s);return r}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return H(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}ve.EMPTY_BYTE_STRING=new ve("");const Em=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function kt(n){if(Q(!!n,39018),typeof n=="string"){let e=0;const t=Em.exec(n);if(Q(!!t,46558,{timestamp:n}),t[1]){let s=t[1];s=(s+"000000000").substr(0,9),e=Number(s)}const r=new Date(n);return{seconds:Math.floor(r.getTime()/1e3),nanos:e}}return{seconds:se(n.seconds),nanos:se(n.nanos)}}function se(n){return typeof n=="number"?n:typeof n=="string"?Number(n):0}function Dt(n){return typeof n=="string"?ve.fromBase64String(n):ve.fromUint8Array(n)}/**
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
 */const Cu="server_timestamp",Pu="__type__",ku="__previous_value__",Du="__local_write_time__";function Vo(n){return(n?.mapValue?.fields||{})[Pu]?.stringValue===Cu}function zs(n){const e=n.mapValue.fields[ku];return Vo(e)?zs(e):e}function dr(n){const e=kt(n.mapValue.fields[Du].timestampValue);return new Z(e.seconds,e.nanos)}/**
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
 */class Tm{constructor(e,t,r,s,i,a,u,d,f,c){this.databaseId=e,this.appId=t,this.persistenceKey=r,this.host=s,this.ssl=i,this.forceLongPolling=a,this.autoDetectLongPolling=u,this.longPollingOptions=d,this.useFetchStreams=f,this.isUsingEmulator=c}}const Ts="(default)";class hr{constructor(e,t){this.projectId=e,this.database=t||Ts}static empty(){return new hr("","")}get isDefaultDatabase(){return this.database===Ts}isEqual(e){return e instanceof hr&&e.projectId===this.projectId&&e.database===this.database}}/**
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
 */const Vu="__type__",Im="__max__",is={mapValue:{}},Nu="__vector__",Is="value";function Vt(n){return"nullValue"in n?0:"booleanValue"in n?1:"integerValue"in n||"doubleValue"in n?2:"timestampValue"in n?3:"stringValue"in n?5:"bytesValue"in n?6:"referenceValue"in n?7:"geoPointValue"in n?8:"arrayValue"in n?9:"mapValue"in n?Vo(n)?4:xm(n)?9007199254740991:Am(n)?10:11:L(28295,{value:n})}function Ze(n,e){if(n===e)return!0;const t=Vt(n);if(t!==Vt(e))return!1;switch(t){case 0:case 9007199254740991:return!0;case 1:return n.booleanValue===e.booleanValue;case 4:return dr(n).isEqual(dr(e));case 3:return function(s,i){if(typeof s.timestampValue=="string"&&typeof i.timestampValue=="string"&&s.timestampValue.length===i.timestampValue.length)return s.timestampValue===i.timestampValue;const a=kt(s.timestampValue),u=kt(i.timestampValue);return a.seconds===u.seconds&&a.nanos===u.nanos}(n,e);case 5:return n.stringValue===e.stringValue;case 6:return function(s,i){return Dt(s.bytesValue).isEqual(Dt(i.bytesValue))}(n,e);case 7:return n.referenceValue===e.referenceValue;case 8:return function(s,i){return se(s.geoPointValue.latitude)===se(i.geoPointValue.latitude)&&se(s.geoPointValue.longitude)===se(i.geoPointValue.longitude)}(n,e);case 2:return function(s,i){if("integerValue"in s&&"integerValue"in i)return se(s.integerValue)===se(i.integerValue);if("doubleValue"in s&&"doubleValue"in i){const a=se(s.doubleValue),u=se(i.doubleValue);return a===u?Es(a)===Es(u):isNaN(a)&&isNaN(u)}return!1}(n,e);case 9:return bn(n.arrayValue.values||[],e.arrayValue.values||[],Ze);case 10:case 11:return function(s,i){const a=s.mapValue.fields||{},u=i.mapValue.fields||{};if(Kc(a)!==Kc(u))return!1;for(const d in a)if(a.hasOwnProperty(d)&&(u[d]===void 0||!Ze(a[d],u[d])))return!1;return!0}(n,e);default:return L(52216,{left:n})}}function fr(n,e){return(n.values||[]).find(t=>Ze(t,e))!==void 0}function En(n,e){if(n===e)return 0;const t=Vt(n),r=Vt(e);if(t!==r)return H(t,r);switch(t){case 0:case 9007199254740991:return 0;case 1:return H(n.booleanValue,e.booleanValue);case 2:return function(i,a){const u=se(i.integerValue||i.doubleValue),d=se(a.integerValue||a.doubleValue);return u<d?-1:u>d?1:u===d?0:isNaN(u)?isNaN(d)?0:-1:1}(n,e);case 3:return Xc(n.timestampValue,e.timestampValue);case 4:return Xc(dr(n),dr(e));case 5:return no(n.stringValue,e.stringValue);case 6:return function(i,a){const u=Dt(i),d=Dt(a);return u.compareTo(d)}(n.bytesValue,e.bytesValue);case 7:return function(i,a){const u=i.split("/"),d=a.split("/");for(let f=0;f<u.length&&f<d.length;f++){const c=H(u[f],d[f]);if(c!==0)return c}return H(u.length,d.length)}(n.referenceValue,e.referenceValue);case 8:return function(i,a){const u=H(se(i.latitude),se(a.latitude));return u!==0?u:H(se(i.longitude),se(a.longitude))}(n.geoPointValue,e.geoPointValue);case 9:return Jc(n.arrayValue,e.arrayValue);case 10:return function(i,a){const u=i.fields||{},d=a.fields||{},f=u[Is]?.arrayValue,c=d[Is]?.arrayValue,w=H(f?.values?.length||0,c?.values?.length||0);return w!==0?w:Jc(f,c)}(n.mapValue,e.mapValue);case 11:return function(i,a){if(i===is.mapValue&&a===is.mapValue)return 0;if(i===is.mapValue)return 1;if(a===is.mapValue)return-1;const u=i.fields||{},d=Object.keys(u),f=a.fields||{},c=Object.keys(f);d.sort(),c.sort();for(let w=0;w<d.length&&w<c.length;++w){const _=no(d[w],c[w]);if(_!==0)return _;const x=En(u[d[w]],f[c[w]]);if(x!==0)return x}return H(d.length,c.length)}(n.mapValue,e.mapValue);default:throw L(23264,{he:t})}}function Xc(n,e){if(typeof n=="string"&&typeof e=="string"&&n.length===e.length)return H(n,e);const t=kt(n),r=kt(e),s=H(t.seconds,r.seconds);return s!==0?s:H(t.nanos,r.nanos)}function Jc(n,e){const t=n.values||[],r=e.values||[];for(let s=0;s<t.length&&s<r.length;++s){const i=En(t[s],r[s]);if(i)return i}return H(t.length,r.length)}function Tn(n){return ro(n)}function ro(n){return"nullValue"in n?"null":"booleanValue"in n?""+n.booleanValue:"integerValue"in n?""+n.integerValue:"doubleValue"in n?""+n.doubleValue:"timestampValue"in n?function(t){const r=kt(t);return`time(${r.seconds},${r.nanos})`}(n.timestampValue):"stringValue"in n?n.stringValue:"bytesValue"in n?function(t){return Dt(t).toBase64()}(n.bytesValue):"referenceValue"in n?function(t){return O.fromName(t).toString()}(n.referenceValue):"geoPointValue"in n?function(t){return`geo(${t.latitude},${t.longitude})`}(n.geoPointValue):"arrayValue"in n?function(t){let r="[",s=!0;for(const i of t.values||[])s?s=!1:r+=",",r+=ro(i);return r+"]"}(n.arrayValue):"mapValue"in n?function(t){const r=Object.keys(t.fields||{}).sort();let s="{",i=!0;for(const a of r)i?i=!1:s+=",",s+=`${a}:${ro(t.fields[a])}`;return s+"}"}(n.mapValue):L(61005,{value:n})}function us(n){switch(Vt(n)){case 0:case 1:return 4;case 2:return 8;case 3:case 8:return 16;case 4:const e=zs(n);return e?16+us(e):16;case 5:return 2*n.stringValue.length;case 6:return Dt(n.bytesValue).approximateByteSize();case 7:return n.referenceValue.length;case 9:return function(r){return(r.values||[]).reduce((s,i)=>s+us(i),0)}(n.arrayValue);case 10:case 11:return function(r){let s=0;return Lt(r.fields,(i,a)=>{s+=i.length+us(a)}),s}(n.mapValue);default:throw L(13486,{value:n})}}function Yc(n,e){return{referenceValue:`projects/${n.projectId}/databases/${n.database}/documents/${e.path.canonicalString()}`}}function so(n){return!!n&&"integerValue"in n}function No(n){return!!n&&"arrayValue"in n}function Zc(n){return!!n&&"nullValue"in n}function el(n){return!!n&&"doubleValue"in n&&isNaN(Number(n.doubleValue))}function ds(n){return!!n&&"mapValue"in n}function Am(n){return(n?.mapValue?.fields||{})[Vu]?.stringValue===Nu}function sr(n){if(n.geoPointValue)return{geoPointValue:{...n.geoPointValue}};if(n.timestampValue&&typeof n.timestampValue=="object")return{timestampValue:{...n.timestampValue}};if(n.mapValue){const e={mapValue:{fields:{}}};return Lt(n.mapValue.fields,(t,r)=>e.mapValue.fields[t]=sr(r)),e}if(n.arrayValue){const e={arrayValue:{values:[]}};for(let t=0;t<(n.arrayValue.values||[]).length;++t)e.arrayValue.values[t]=sr(n.arrayValue.values[t]);return e}return{...n}}function xm(n){return(((n.mapValue||{}).fields||{}).__type__||{}).stringValue===Im}/**
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
 */class Ne{constructor(e){this.value=e}static empty(){return new Ne({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let t=this.value;for(let r=0;r<e.length-1;++r)if(t=(t.mapValue.fields||{})[e.get(r)],!ds(t))return null;return t=(t.mapValue.fields||{})[e.lastSegment()],t||null}}set(e,t){this.getFieldsMap(e.popLast())[e.lastSegment()]=sr(t)}setAll(e){let t=we.emptyPath(),r={},s=[];e.forEach((a,u)=>{if(!t.isImmediateParentOf(u)){const d=this.getFieldsMap(t);this.applyChanges(d,r,s),r={},s=[],t=u.popLast()}a?r[u.lastSegment()]=sr(a):s.push(u.lastSegment())});const i=this.getFieldsMap(t);this.applyChanges(i,r,s)}delete(e){const t=this.field(e.popLast());ds(t)&&t.mapValue.fields&&delete t.mapValue.fields[e.lastSegment()]}isEqual(e){return Ze(this.value,e.value)}getFieldsMap(e){let t=this.value;t.mapValue.fields||(t.mapValue={fields:{}});for(let r=0;r<e.length;++r){let s=t.mapValue.fields[e.get(r)];ds(s)&&s.mapValue.fields||(s={mapValue:{fields:{}}},t.mapValue.fields[e.get(r)]=s),t=s}return t.mapValue.fields}applyChanges(e,t,r){Lt(t,(s,i)=>e[s]=i);for(const s of r)delete e[s]}clone(){return new Ne(sr(this.value))}}function Ou(n){const e=[];return Lt(n.fields,(t,r)=>{const s=new we([t]);if(ds(r)){const i=Ou(r.mapValue).fields;if(i.length===0)e.push(s);else for(const a of i)e.push(s.child(a))}else e.push(s)}),new Me(e)}/**
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
 */class Se{constructor(e,t,r,s,i,a,u){this.key=e,this.documentType=t,this.version=r,this.readTime=s,this.createTime=i,this.data=a,this.documentState=u}static newInvalidDocument(e){return new Se(e,0,B.min(),B.min(),B.min(),Ne.empty(),0)}static newFoundDocument(e,t,r,s){return new Se(e,1,t,B.min(),r,s,0)}static newNoDocument(e,t){return new Se(e,2,t,B.min(),B.min(),Ne.empty(),0)}static newUnknownDocument(e,t){return new Se(e,3,t,B.min(),B.min(),Ne.empty(),2)}convertToFoundDocument(e,t){return!this.createTime.isEqual(B.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=e),this.version=e,this.documentType=1,this.data=t,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=Ne.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=Ne.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=B.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof Se&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new Se(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
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
 */class As{constructor(e,t){this.position=e,this.inclusive=t}}function tl(n,e,t){let r=0;for(let s=0;s<n.position.length;s++){const i=e[s],a=n.position[s];if(i.field.isKeyField()?r=O.comparator(O.fromName(a.referenceValue),t.key):r=En(a,t.data.field(i.field)),i.dir==="desc"&&(r*=-1),r!==0)break}return r}function nl(n,e){if(n===null)return e===null;if(e===null||n.inclusive!==e.inclusive||n.position.length!==e.position.length)return!1;for(let t=0;t<n.position.length;t++)if(!Ze(n.position[t],e.position[t]))return!1;return!0}/**
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
 */class xs{constructor(e,t="asc"){this.field=e,this.dir=t}}function Sm(n,e){return n.dir===e.dir&&n.field.isEqual(e.field)}/**
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
 */class Mu{}class ae extends Mu{constructor(e,t,r){super(),this.field=e,this.op=t,this.value=r}static create(e,t,r){return e.isKeyField()?t==="in"||t==="not-in"?this.createKeyFieldInFilter(e,t,r):new Cm(e,t,r):t==="array-contains"?new Dm(e,r):t==="in"?new Vm(e,r):t==="not-in"?new Nm(e,r):t==="array-contains-any"?new Om(e,r):new ae(e,t,r)}static createKeyFieldInFilter(e,t,r){return t==="in"?new Pm(e,r):new km(e,r)}matches(e){const t=e.data.field(this.field);return this.op==="!="?t!==null&&t.nullValue===void 0&&this.matchesComparison(En(t,this.value)):t!==null&&Vt(this.value)===Vt(t)&&this.matchesComparison(En(t,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return L(47266,{operator:this.op})}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class He extends Mu{constructor(e,t){super(),this.filters=e,this.op=t,this.Pe=null}static create(e,t){return new He(e,t)}matches(e){return Lu(this)?this.filters.find(t=>!t.matches(e))===void 0:this.filters.find(t=>t.matches(e))!==void 0}getFlattenedFilters(){return this.Pe!==null||(this.Pe=this.filters.reduce((e,t)=>e.concat(t.getFlattenedFilters()),[])),this.Pe}getFilters(){return Object.assign([],this.filters)}}function Lu(n){return n.op==="and"}function Fu(n){return Rm(n)&&Lu(n)}function Rm(n){for(const e of n.filters)if(e instanceof He)return!1;return!0}function io(n){if(n instanceof ae)return n.field.canonicalString()+n.op.toString()+Tn(n.value);if(Fu(n))return n.filters.map(e=>io(e)).join(",");{const e=n.filters.map(t=>io(t)).join(",");return`${n.op}(${e})`}}function Uu(n,e){return n instanceof ae?function(r,s){return s instanceof ae&&r.op===s.op&&r.field.isEqual(s.field)&&Ze(r.value,s.value)}(n,e):n instanceof He?function(r,s){return s instanceof He&&r.op===s.op&&r.filters.length===s.filters.length?r.filters.reduce((i,a,u)=>i&&Uu(a,s.filters[u]),!0):!1}(n,e):void L(19439)}function Bu(n){return n instanceof ae?function(t){return`${t.field.canonicalString()} ${t.op} ${Tn(t.value)}`}(n):n instanceof He?function(t){return t.op.toString()+" {"+t.getFilters().map(Bu).join(" ,")+"}"}(n):"Filter"}class Cm extends ae{constructor(e,t,r){super(e,t,r),this.key=O.fromName(r.referenceValue)}matches(e){const t=O.comparator(e.key,this.key);return this.matchesComparison(t)}}class Pm extends ae{constructor(e,t){super(e,"in",t),this.keys=$u("in",t)}matches(e){return this.keys.some(t=>t.isEqual(e.key))}}class km extends ae{constructor(e,t){super(e,"not-in",t),this.keys=$u("not-in",t)}matches(e){return!this.keys.some(t=>t.isEqual(e.key))}}function $u(n,e){return(e.arrayValue?.values||[]).map(t=>O.fromName(t.referenceValue))}class Dm extends ae{constructor(e,t){super(e,"array-contains",t)}matches(e){const t=e.data.field(this.field);return No(t)&&fr(t.arrayValue,this.value)}}class Vm extends ae{constructor(e,t){super(e,"in",t)}matches(e){const t=e.data.field(this.field);return t!==null&&fr(this.value.arrayValue,t)}}class Nm extends ae{constructor(e,t){super(e,"not-in",t)}matches(e){if(fr(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const t=e.data.field(this.field);return t!==null&&t.nullValue===void 0&&!fr(this.value.arrayValue,t)}}class Om extends ae{constructor(e,t){super(e,"array-contains-any",t)}matches(e){const t=e.data.field(this.field);return!(!No(t)||!t.arrayValue.values)&&t.arrayValue.values.some(r=>fr(this.value.arrayValue,r))}}/**
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
 */class Mm{constructor(e,t=null,r=[],s=[],i=null,a=null,u=null){this.path=e,this.collectionGroup=t,this.orderBy=r,this.filters=s,this.limit=i,this.startAt=a,this.endAt=u,this.Te=null}}function rl(n,e=null,t=[],r=[],s=null,i=null,a=null){return new Mm(n,e,t,r,s,i,a)}function Oo(n){const e=$(n);if(e.Te===null){let t=e.path.canonicalString();e.collectionGroup!==null&&(t+="|cg:"+e.collectionGroup),t+="|f:",t+=e.filters.map(r=>io(r)).join(","),t+="|ob:",t+=e.orderBy.map(r=>function(i){return i.field.canonicalString()+i.dir}(r)).join(","),js(e.limit)||(t+="|l:",t+=e.limit),e.startAt&&(t+="|lb:",t+=e.startAt.inclusive?"b:":"a:",t+=e.startAt.position.map(r=>Tn(r)).join(",")),e.endAt&&(t+="|ub:",t+=e.endAt.inclusive?"a:":"b:",t+=e.endAt.position.map(r=>Tn(r)).join(",")),e.Te=t}return e.Te}function Mo(n,e){if(n.limit!==e.limit||n.orderBy.length!==e.orderBy.length)return!1;for(let t=0;t<n.orderBy.length;t++)if(!Sm(n.orderBy[t],e.orderBy[t]))return!1;if(n.filters.length!==e.filters.length)return!1;for(let t=0;t<n.filters.length;t++)if(!Uu(n.filters[t],e.filters[t]))return!1;return n.collectionGroup===e.collectionGroup&&!!n.path.isEqual(e.path)&&!!nl(n.startAt,e.startAt)&&nl(n.endAt,e.endAt)}function oo(n){return O.isDocumentKey(n.path)&&n.collectionGroup===null&&n.filters.length===0}/**
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
 */class Ir{constructor(e,t=null,r=[],s=[],i=null,a="F",u=null,d=null){this.path=e,this.collectionGroup=t,this.explicitOrderBy=r,this.filters=s,this.limit=i,this.limitType=a,this.startAt=u,this.endAt=d,this.Ie=null,this.Ee=null,this.de=null,this.startAt,this.endAt}}function Lm(n,e,t,r,s,i,a,u){return new Ir(n,e,t,r,s,i,a,u)}function Lo(n){return new Ir(n)}function sl(n){return n.filters.length===0&&n.limit===null&&n.startAt==null&&n.endAt==null&&(n.explicitOrderBy.length===0||n.explicitOrderBy.length===1&&n.explicitOrderBy[0].field.isKeyField())}function qu(n){return n.collectionGroup!==null}function ir(n){const e=$(n);if(e.Ie===null){e.Ie=[];const t=new Set;for(const i of e.explicitOrderBy)e.Ie.push(i),t.add(i.field.canonicalString());const r=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(function(a){let u=new de(we.comparator);return a.filters.forEach(d=>{d.getFlattenedFilters().forEach(f=>{f.isInequality()&&(u=u.add(f.field))})}),u})(e).forEach(i=>{t.has(i.canonicalString())||i.isKeyField()||e.Ie.push(new xs(i,r))}),t.has(we.keyField().canonicalString())||e.Ie.push(new xs(we.keyField(),r))}return e.Ie}function Ke(n){const e=$(n);return e.Ee||(e.Ee=Fm(e,ir(n))),e.Ee}function Fm(n,e){if(n.limitType==="F")return rl(n.path,n.collectionGroup,e,n.filters,n.limit,n.startAt,n.endAt);{e=e.map(s=>{const i=s.dir==="desc"?"asc":"desc";return new xs(s.field,i)});const t=n.endAt?new As(n.endAt.position,n.endAt.inclusive):null,r=n.startAt?new As(n.startAt.position,n.startAt.inclusive):null;return rl(n.path,n.collectionGroup,e,n.filters,n.limit,t,r)}}function ao(n,e){const t=n.filters.concat([e]);return new Ir(n.path,n.collectionGroup,n.explicitOrderBy.slice(),t,n.limit,n.limitType,n.startAt,n.endAt)}function co(n,e,t){return new Ir(n.path,n.collectionGroup,n.explicitOrderBy.slice(),n.filters.slice(),e,t,n.startAt,n.endAt)}function Hs(n,e){return Mo(Ke(n),Ke(e))&&n.limitType===e.limitType}function ju(n){return`${Oo(Ke(n))}|lt:${n.limitType}`}function hn(n){return`Query(target=${function(t){let r=t.path.canonicalString();return t.collectionGroup!==null&&(r+=" collectionGroup="+t.collectionGroup),t.filters.length>0&&(r+=`, filters: [${t.filters.map(s=>Bu(s)).join(", ")}]`),js(t.limit)||(r+=", limit: "+t.limit),t.orderBy.length>0&&(r+=`, orderBy: [${t.orderBy.map(s=>function(a){return`${a.field.canonicalString()} (${a.dir})`}(s)).join(", ")}]`),t.startAt&&(r+=", startAt: ",r+=t.startAt.inclusive?"b:":"a:",r+=t.startAt.position.map(s=>Tn(s)).join(",")),t.endAt&&(r+=", endAt: ",r+=t.endAt.inclusive?"a:":"b:",r+=t.endAt.position.map(s=>Tn(s)).join(",")),`Target(${r})`}(Ke(n))}; limitType=${n.limitType})`}function Gs(n,e){return e.isFoundDocument()&&function(r,s){const i=s.key.path;return r.collectionGroup!==null?s.key.hasCollectionId(r.collectionGroup)&&r.path.isPrefixOf(i):O.isDocumentKey(r.path)?r.path.isEqual(i):r.path.isImmediateParentOf(i)}(n,e)&&function(r,s){for(const i of ir(r))if(!i.field.isKeyField()&&s.data.field(i.field)===null)return!1;return!0}(n,e)&&function(r,s){for(const i of r.filters)if(!i.matches(s))return!1;return!0}(n,e)&&function(r,s){return!(r.startAt&&!function(a,u,d){const f=tl(a,u,d);return a.inclusive?f<=0:f<0}(r.startAt,ir(r),s)||r.endAt&&!function(a,u,d){const f=tl(a,u,d);return a.inclusive?f>=0:f>0}(r.endAt,ir(r),s))}(n,e)}function Um(n){return n.collectionGroup||(n.path.length%2==1?n.path.lastSegment():n.path.get(n.path.length-2))}function zu(n){return(e,t)=>{let r=!1;for(const s of ir(n)){const i=Bm(s,e,t);if(i!==0)return i;r=r||s.field.isKeyField()}return 0}}function Bm(n,e,t){const r=n.field.isKeyField()?O.comparator(e.key,t.key):function(i,a,u){const d=a.data.field(i),f=u.data.field(i);return d!==null&&f!==null?En(d,f):L(42886)}(n.field,e,t);switch(n.dir){case"asc":return r;case"desc":return-1*r;default:return L(19790,{direction:n.dir})}}/**
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
 */class nn{constructor(e,t){this.mapKeyFn=e,this.equalsFn=t,this.inner={},this.innerSize=0}get(e){const t=this.mapKeyFn(e),r=this.inner[t];if(r!==void 0){for(const[s,i]of r)if(this.equalsFn(s,e))return i}}has(e){return this.get(e)!==void 0}set(e,t){const r=this.mapKeyFn(e),s=this.inner[r];if(s===void 0)return this.inner[r]=[[e,t]],void this.innerSize++;for(let i=0;i<s.length;i++)if(this.equalsFn(s[i][0],e))return void(s[i]=[e,t]);s.push([e,t]),this.innerSize++}delete(e){const t=this.mapKeyFn(e),r=this.inner[t];if(r===void 0)return!1;for(let s=0;s<r.length;s++)if(this.equalsFn(r[s][0],e))return r.length===1?delete this.inner[t]:r.splice(s,1),this.innerSize--,!0;return!1}forEach(e){Lt(this.inner,(t,r)=>{for(const[s,i]of r)e(s,i)})}isEmpty(){return Su(this.inner)}size(){return this.innerSize}}/**
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
 */const $m=new te(O.comparator);function ut(){return $m}const Hu=new te(O.comparator);function Zn(...n){let e=Hu;for(const t of n)e=e.insert(t.key,t);return e}function Gu(n){let e=Hu;return n.forEach((t,r)=>e=e.insert(t,r.overlayedDocument)),e}function Ht(){return or()}function Wu(){return or()}function or(){return new nn(n=>n.toString(),(n,e)=>n.isEqual(e))}const qm=new te(O.comparator),jm=new de(O.comparator);function G(...n){let e=jm;for(const t of n)e=e.add(t);return e}const zm=new de(H);function Hm(){return zm}/**
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
 */function Fo(n,e){if(n.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:Es(e)?"-0":e}}function Ku(n){return{integerValue:""+n}}function Gm(n,e){return wm(e)?Ku(e):Fo(n,e)}/**
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
 */class Ws{constructor(){this._=void 0}}function Wm(n,e,t){return n instanceof pr?function(s,i){const a={fields:{[Pu]:{stringValue:Cu},[Du]:{timestampValue:{seconds:s.seconds,nanos:s.nanoseconds}}}};return i&&Vo(i)&&(i=zs(i)),i&&(a.fields[ku]=i),{mapValue:a}}(t,e):n instanceof mr?Xu(n,e):n instanceof gr?Ju(n,e):function(s,i){const a=Qu(s,i),u=il(a)+il(s.Ae);return so(a)&&so(s.Ae)?Ku(u):Fo(s.serializer,u)}(n,e)}function Km(n,e,t){return n instanceof mr?Xu(n,e):n instanceof gr?Ju(n,e):t}function Qu(n,e){return n instanceof Ss?function(r){return so(r)||function(i){return!!i&&"doubleValue"in i}(r)}(e)?e:{integerValue:0}:null}class pr extends Ws{}class mr extends Ws{constructor(e){super(),this.elements=e}}function Xu(n,e){const t=Yu(e);for(const r of n.elements)t.some(s=>Ze(s,r))||t.push(r);return{arrayValue:{values:t}}}class gr extends Ws{constructor(e){super(),this.elements=e}}function Ju(n,e){let t=Yu(e);for(const r of n.elements)t=t.filter(s=>!Ze(s,r));return{arrayValue:{values:t}}}class Ss extends Ws{constructor(e,t){super(),this.serializer=e,this.Ae=t}}function il(n){return se(n.integerValue||n.doubleValue)}function Yu(n){return No(n)&&n.arrayValue.values?n.arrayValue.values.slice():[]}/**
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
 */class Qm{constructor(e,t){this.field=e,this.transform=t}}function Xm(n,e){return n.field.isEqual(e.field)&&function(r,s){return r instanceof mr&&s instanceof mr||r instanceof gr&&s instanceof gr?bn(r.elements,s.elements,Ze):r instanceof Ss&&s instanceof Ss?Ze(r.Ae,s.Ae):r instanceof pr&&s instanceof pr}(n.transform,e.transform)}class Jm{constructor(e,t){this.version=e,this.transformResults=t}}class ke{constructor(e,t){this.updateTime=e,this.exists=t}static none(){return new ke}static exists(e){return new ke(void 0,e)}static updateTime(e){return new ke(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function hs(n,e){return n.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(n.updateTime):n.exists===void 0||n.exists===e.isFoundDocument()}class Ks{}function Zu(n,e){if(!n.hasLocalMutations||e&&e.fields.length===0)return null;if(e===null)return n.isNoDocument()?new Qs(n.key,ke.none()):new Ar(n.key,n.data,ke.none());{const t=n.data,r=Ne.empty();let s=new de(we.comparator);for(let i of e.fields)if(!s.has(i)){let a=t.field(i);a===null&&i.length>1&&(i=i.popLast(),a=t.field(i)),a===null?r.delete(i):r.set(i,a),s=s.add(i)}return new Ft(n.key,r,new Me(s.toArray()),ke.none())}}function Ym(n,e,t){n instanceof Ar?function(s,i,a){const u=s.value.clone(),d=al(s.fieldTransforms,i,a.transformResults);u.setAll(d),i.convertToFoundDocument(a.version,u).setHasCommittedMutations()}(n,e,t):n instanceof Ft?function(s,i,a){if(!hs(s.precondition,i))return void i.convertToUnknownDocument(a.version);const u=al(s.fieldTransforms,i,a.transformResults),d=i.data;d.setAll(ed(s)),d.setAll(u),i.convertToFoundDocument(a.version,d).setHasCommittedMutations()}(n,e,t):function(s,i,a){i.convertToNoDocument(a.version).setHasCommittedMutations()}(0,e,t)}function ar(n,e,t,r){return n instanceof Ar?function(i,a,u,d){if(!hs(i.precondition,a))return u;const f=i.value.clone(),c=cl(i.fieldTransforms,d,a);return f.setAll(c),a.convertToFoundDocument(a.version,f).setHasLocalMutations(),null}(n,e,t,r):n instanceof Ft?function(i,a,u,d){if(!hs(i.precondition,a))return u;const f=cl(i.fieldTransforms,d,a),c=a.data;return c.setAll(ed(i)),c.setAll(f),a.convertToFoundDocument(a.version,c).setHasLocalMutations(),u===null?null:u.unionWith(i.fieldMask.fields).unionWith(i.fieldTransforms.map(w=>w.field))}(n,e,t,r):function(i,a,u){return hs(i.precondition,a)?(a.convertToNoDocument(a.version).setHasLocalMutations(),null):u}(n,e,t)}function Zm(n,e){let t=null;for(const r of n.fieldTransforms){const s=e.data.field(r.field),i=Qu(r.transform,s||null);i!=null&&(t===null&&(t=Ne.empty()),t.set(r.field,i))}return t||null}function ol(n,e){return n.type===e.type&&!!n.key.isEqual(e.key)&&!!n.precondition.isEqual(e.precondition)&&!!function(r,s){return r===void 0&&s===void 0||!(!r||!s)&&bn(r,s,(i,a)=>Xm(i,a))}(n.fieldTransforms,e.fieldTransforms)&&(n.type===0?n.value.isEqual(e.value):n.type!==1||n.data.isEqual(e.data)&&n.fieldMask.isEqual(e.fieldMask))}class Ar extends Ks{constructor(e,t,r,s=[]){super(),this.key=e,this.value=t,this.precondition=r,this.fieldTransforms=s,this.type=0}getFieldMask(){return null}}class Ft extends Ks{constructor(e,t,r,s,i=[]){super(),this.key=e,this.data=t,this.fieldMask=r,this.precondition=s,this.fieldTransforms=i,this.type=1}getFieldMask(){return this.fieldMask}}function ed(n){const e=new Map;return n.fieldMask.fields.forEach(t=>{if(!t.isEmpty()){const r=n.data.field(t);e.set(t,r)}}),e}function al(n,e,t){const r=new Map;Q(n.length===t.length,32656,{Re:t.length,Ve:n.length});for(let s=0;s<t.length;s++){const i=n[s],a=i.transform,u=e.data.field(i.field);r.set(i.field,Km(a,u,t[s]))}return r}function cl(n,e,t){const r=new Map;for(const s of n){const i=s.transform,a=t.data.field(s.field);r.set(s.field,Wm(i,a,e))}return r}class Qs extends Ks{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class eg extends Ks{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
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
 */class tg{constructor(e,t,r,s){this.batchId=e,this.localWriteTime=t,this.baseMutations=r,this.mutations=s}applyToRemoteDocument(e,t){const r=t.mutationResults;for(let s=0;s<this.mutations.length;s++){const i=this.mutations[s];i.key.isEqual(e.key)&&Ym(i,e,r[s])}}applyToLocalView(e,t){for(const r of this.baseMutations)r.key.isEqual(e.key)&&(t=ar(r,e,t,this.localWriteTime));for(const r of this.mutations)r.key.isEqual(e.key)&&(t=ar(r,e,t,this.localWriteTime));return t}applyToLocalDocumentSet(e,t){const r=Wu();return this.mutations.forEach(s=>{const i=e.get(s.key),a=i.overlayedDocument;let u=this.applyToLocalView(a,i.mutatedFields);u=t.has(s.key)?null:u;const d=Zu(a,u);d!==null&&r.set(s.key,d),a.isValidDocument()||a.convertToNoDocument(B.min())}),r}keys(){return this.mutations.reduce((e,t)=>e.add(t.key),G())}isEqual(e){return this.batchId===e.batchId&&bn(this.mutations,e.mutations,(t,r)=>ol(t,r))&&bn(this.baseMutations,e.baseMutations,(t,r)=>ol(t,r))}}class Uo{constructor(e,t,r,s){this.batch=e,this.commitVersion=t,this.mutationResults=r,this.docVersions=s}static from(e,t,r){Q(e.mutations.length===r.length,58842,{me:e.mutations.length,fe:r.length});let s=function(){return qm}();const i=e.mutations;for(let a=0;a<i.length;a++)s=s.insert(i[a].key,r[a].version);return new Uo(e,t,r,s)}}/**
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
 */class ng{constructor(e,t){this.largestBatchId=e,this.mutation=t}getKey(){return this.mutation.key}isEqual(e){return e!==null&&this.mutation===e.mutation}toString(){return`Overlay{
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
 */class rg{constructor(e,t){this.count=e,this.unchangedNames=t}}/**
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
 */var oe,W;function sg(n){switch(n){case S.OK:return L(64938);case S.CANCELLED:case S.UNKNOWN:case S.DEADLINE_EXCEEDED:case S.RESOURCE_EXHAUSTED:case S.INTERNAL:case S.UNAVAILABLE:case S.UNAUTHENTICATED:return!1;case S.INVALID_ARGUMENT:case S.NOT_FOUND:case S.ALREADY_EXISTS:case S.PERMISSION_DENIED:case S.FAILED_PRECONDITION:case S.ABORTED:case S.OUT_OF_RANGE:case S.UNIMPLEMENTED:case S.DATA_LOSS:return!0;default:return L(15467,{code:n})}}function td(n){if(n===void 0)return lt("GRPC error has no .code"),S.UNKNOWN;switch(n){case oe.OK:return S.OK;case oe.CANCELLED:return S.CANCELLED;case oe.UNKNOWN:return S.UNKNOWN;case oe.DEADLINE_EXCEEDED:return S.DEADLINE_EXCEEDED;case oe.RESOURCE_EXHAUSTED:return S.RESOURCE_EXHAUSTED;case oe.INTERNAL:return S.INTERNAL;case oe.UNAVAILABLE:return S.UNAVAILABLE;case oe.UNAUTHENTICATED:return S.UNAUTHENTICATED;case oe.INVALID_ARGUMENT:return S.INVALID_ARGUMENT;case oe.NOT_FOUND:return S.NOT_FOUND;case oe.ALREADY_EXISTS:return S.ALREADY_EXISTS;case oe.PERMISSION_DENIED:return S.PERMISSION_DENIED;case oe.FAILED_PRECONDITION:return S.FAILED_PRECONDITION;case oe.ABORTED:return S.ABORTED;case oe.OUT_OF_RANGE:return S.OUT_OF_RANGE;case oe.UNIMPLEMENTED:return S.UNIMPLEMENTED;case oe.DATA_LOSS:return S.DATA_LOSS;default:return L(39323,{code:n})}}(W=oe||(oe={}))[W.OK=0]="OK",W[W.CANCELLED=1]="CANCELLED",W[W.UNKNOWN=2]="UNKNOWN",W[W.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",W[W.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",W[W.NOT_FOUND=5]="NOT_FOUND",W[W.ALREADY_EXISTS=6]="ALREADY_EXISTS",W[W.PERMISSION_DENIED=7]="PERMISSION_DENIED",W[W.UNAUTHENTICATED=16]="UNAUTHENTICATED",W[W.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",W[W.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",W[W.ABORTED=10]="ABORTED",W[W.OUT_OF_RANGE=11]="OUT_OF_RANGE",W[W.UNIMPLEMENTED=12]="UNIMPLEMENTED",W[W.INTERNAL=13]="INTERNAL",W[W.UNAVAILABLE=14]="UNAVAILABLE",W[W.DATA_LOSS=15]="DATA_LOSS";/**
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
 */function ig(){return new TextEncoder}/**
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
 */const og=new xt([4294967295,4294967295],0);function ll(n){const e=ig().encode(n),t=new gu;return t.update(e),new Uint8Array(t.digest())}function ul(n){const e=new DataView(n.buffer),t=e.getUint32(0,!0),r=e.getUint32(4,!0),s=e.getUint32(8,!0),i=e.getUint32(12,!0);return[new xt([t,r],0),new xt([s,i],0)]}class Bo{constructor(e,t,r){if(this.bitmap=e,this.padding=t,this.hashCount=r,t<0||t>=8)throw new er(`Invalid padding: ${t}`);if(r<0)throw new er(`Invalid hash count: ${r}`);if(e.length>0&&this.hashCount===0)throw new er(`Invalid hash count: ${r}`);if(e.length===0&&t!==0)throw new er(`Invalid padding when bitmap length is 0: ${t}`);this.ge=8*e.length-t,this.pe=xt.fromNumber(this.ge)}ye(e,t,r){let s=e.add(t.multiply(xt.fromNumber(r)));return s.compare(og)===1&&(s=new xt([s.getBits(0),s.getBits(1)],0)),s.modulo(this.pe).toNumber()}we(e){return!!(this.bitmap[Math.floor(e/8)]&1<<e%8)}mightContain(e){if(this.ge===0)return!1;const t=ll(e),[r,s]=ul(t);for(let i=0;i<this.hashCount;i++){const a=this.ye(r,s,i);if(!this.we(a))return!1}return!0}static create(e,t,r){const s=e%8==0?0:8-e%8,i=new Uint8Array(Math.ceil(e/8)),a=new Bo(i,s,t);return r.forEach(u=>a.insert(u)),a}insert(e){if(this.ge===0)return;const t=ll(e),[r,s]=ul(t);for(let i=0;i<this.hashCount;i++){const a=this.ye(r,s,i);this.Se(a)}}Se(e){const t=Math.floor(e/8),r=e%8;this.bitmap[t]|=1<<r}}class er extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
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
 */class Xs{constructor(e,t,r,s,i){this.snapshotVersion=e,this.targetChanges=t,this.targetMismatches=r,this.documentUpdates=s,this.resolvedLimboDocuments=i}static createSynthesizedRemoteEventForCurrentChange(e,t,r){const s=new Map;return s.set(e,xr.createSynthesizedTargetChangeForCurrentChange(e,t,r)),new Xs(B.min(),s,new te(H),ut(),G())}}class xr{constructor(e,t,r,s,i){this.resumeToken=e,this.current=t,this.addedDocuments=r,this.modifiedDocuments=s,this.removedDocuments=i}static createSynthesizedTargetChangeForCurrentChange(e,t,r){return new xr(r,t,G(),G(),G())}}/**
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
 */class fs{constructor(e,t,r,s){this.be=e,this.removedTargetIds=t,this.key=r,this.De=s}}class nd{constructor(e,t){this.targetId=e,this.Ce=t}}class rd{constructor(e,t,r=ve.EMPTY_BYTE_STRING,s=null){this.state=e,this.targetIds=t,this.resumeToken=r,this.cause=s}}class dl{constructor(){this.ve=0,this.Fe=hl(),this.Me=ve.EMPTY_BYTE_STRING,this.xe=!1,this.Oe=!0}get current(){return this.xe}get resumeToken(){return this.Me}get Ne(){return this.ve!==0}get Be(){return this.Oe}Le(e){e.approximateByteSize()>0&&(this.Oe=!0,this.Me=e)}ke(){let e=G(),t=G(),r=G();return this.Fe.forEach((s,i)=>{switch(i){case 0:e=e.add(s);break;case 2:t=t.add(s);break;case 1:r=r.add(s);break;default:L(38017,{changeType:i})}}),new xr(this.Me,this.xe,e,t,r)}qe(){this.Oe=!1,this.Fe=hl()}Qe(e,t){this.Oe=!0,this.Fe=this.Fe.insert(e,t)}$e(e){this.Oe=!0,this.Fe=this.Fe.remove(e)}Ue(){this.ve+=1}Ke(){this.ve-=1,Q(this.ve>=0,3241,{ve:this.ve})}We(){this.Oe=!0,this.xe=!0}}class ag{constructor(e){this.Ge=e,this.ze=new Map,this.je=ut(),this.Je=os(),this.He=os(),this.Ye=new te(H)}Ze(e){for(const t of e.be)e.De&&e.De.isFoundDocument()?this.Xe(t,e.De):this.et(t,e.key,e.De);for(const t of e.removedTargetIds)this.et(t,e.key,e.De)}tt(e){this.forEachTarget(e,t=>{const r=this.nt(t);switch(e.state){case 0:this.rt(t)&&r.Le(e.resumeToken);break;case 1:r.Ke(),r.Ne||r.qe(),r.Le(e.resumeToken);break;case 2:r.Ke(),r.Ne||this.removeTarget(t);break;case 3:this.rt(t)&&(r.We(),r.Le(e.resumeToken));break;case 4:this.rt(t)&&(this.it(t),r.Le(e.resumeToken));break;default:L(56790,{state:e.state})}})}forEachTarget(e,t){e.targetIds.length>0?e.targetIds.forEach(t):this.ze.forEach((r,s)=>{this.rt(s)&&t(s)})}st(e){const t=e.targetId,r=e.Ce.count,s=this.ot(t);if(s){const i=s.target;if(oo(i))if(r===0){const a=new O(i.path);this.et(t,a,Se.newNoDocument(a,B.min()))}else Q(r===1,20013,{expectedCount:r});else{const a=this._t(t);if(a!==r){const u=this.ut(e),d=u?this.ct(u,e,a):1;if(d!==0){this.it(t);const f=d===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Ye=this.Ye.insert(t,f)}}}}}ut(e){const t=e.Ce.unchangedNames;if(!t||!t.bits)return null;const{bits:{bitmap:r="",padding:s=0},hashCount:i=0}=t;let a,u;try{a=Dt(r).toUint8Array()}catch(d){if(d instanceof Ru)return vn("Decoding the base64 bloom filter in existence filter failed ("+d.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw d}try{u=new Bo(a,s,i)}catch(d){return vn(d instanceof er?"BloomFilter error: ":"Applying bloom filter failed: ",d),null}return u.ge===0?null:u}ct(e,t,r){return t.Ce.count===r-this.Pt(e,t.targetId)?0:2}Pt(e,t){const r=this.Ge.getRemoteKeysForTarget(t);let s=0;return r.forEach(i=>{const a=this.Ge.ht(),u=`projects/${a.projectId}/databases/${a.database}/documents/${i.path.canonicalString()}`;e.mightContain(u)||(this.et(t,i,null),s++)}),s}Tt(e){const t=new Map;this.ze.forEach((i,a)=>{const u=this.ot(a);if(u){if(i.current&&oo(u.target)){const d=new O(u.target.path);this.It(d).has(a)||this.Et(a,d)||this.et(a,d,Se.newNoDocument(d,e))}i.Be&&(t.set(a,i.ke()),i.qe())}});let r=G();this.He.forEach((i,a)=>{let u=!0;a.forEachWhile(d=>{const f=this.ot(d);return!f||f.purpose==="TargetPurposeLimboResolution"||(u=!1,!1)}),u&&(r=r.add(i))}),this.je.forEach((i,a)=>a.setReadTime(e));const s=new Xs(e,t,this.Ye,this.je,r);return this.je=ut(),this.Je=os(),this.He=os(),this.Ye=new te(H),s}Xe(e,t){if(!this.rt(e))return;const r=this.Et(e,t.key)?2:0;this.nt(e).Qe(t.key,r),this.je=this.je.insert(t.key,t),this.Je=this.Je.insert(t.key,this.It(t.key).add(e)),this.He=this.He.insert(t.key,this.dt(t.key).add(e))}et(e,t,r){if(!this.rt(e))return;const s=this.nt(e);this.Et(e,t)?s.Qe(t,1):s.$e(t),this.He=this.He.insert(t,this.dt(t).delete(e)),this.He=this.He.insert(t,this.dt(t).add(e)),r&&(this.je=this.je.insert(t,r))}removeTarget(e){this.ze.delete(e)}_t(e){const t=this.nt(e).ke();return this.Ge.getRemoteKeysForTarget(e).size+t.addedDocuments.size-t.removedDocuments.size}Ue(e){this.nt(e).Ue()}nt(e){let t=this.ze.get(e);return t||(t=new dl,this.ze.set(e,t)),t}dt(e){let t=this.He.get(e);return t||(t=new de(H),this.He=this.He.insert(e,t)),t}It(e){let t=this.Je.get(e);return t||(t=new de(H),this.Je=this.Je.insert(e,t)),t}rt(e){const t=this.ot(e)!==null;return t||N("WatchChangeAggregator","Detected inactive target",e),t}ot(e){const t=this.ze.get(e);return t&&t.Ne?null:this.Ge.At(e)}it(e){this.ze.set(e,new dl),this.Ge.getRemoteKeysForTarget(e).forEach(t=>{this.et(e,t,null)})}Et(e,t){return this.Ge.getRemoteKeysForTarget(e).has(t)}}function os(){return new te(O.comparator)}function hl(){return new te(O.comparator)}const cg={asc:"ASCENDING",desc:"DESCENDING"},lg={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},ug={and:"AND",or:"OR"};class dg{constructor(e,t){this.databaseId=e,this.useProto3Json=t}}function lo(n,e){return n.useProto3Json||js(e)?e:{value:e}}function Rs(n,e){return n.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function sd(n,e){return n.useProto3Json?e.toBase64():e.toUint8Array()}function hg(n,e){return Rs(n,e.toTimestamp())}function Qe(n){return Q(!!n,49232),B.fromTimestamp(function(t){const r=kt(t);return new Z(r.seconds,r.nanos)}(n))}function $o(n,e){return uo(n,e).canonicalString()}function uo(n,e){const t=function(s){return new J(["projects",s.projectId,"databases",s.database])}(n).child("documents");return e===void 0?t:t.child(e)}function id(n){const e=J.fromString(n);return Q(ud(e),10190,{key:e.toString()}),e}function ho(n,e){return $o(n.databaseId,e.path)}function $i(n,e){const t=id(e);if(t.get(1)!==n.databaseId.projectId)throw new V(S.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+t.get(1)+" vs "+n.databaseId.projectId);if(t.get(3)!==n.databaseId.database)throw new V(S.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+t.get(3)+" vs "+n.databaseId.database);return new O(ad(t))}function od(n,e){return $o(n.databaseId,e)}function fg(n){const e=id(n);return e.length===4?J.emptyPath():ad(e)}function fo(n){return new J(["projects",n.databaseId.projectId,"databases",n.databaseId.database]).canonicalString()}function ad(n){return Q(n.length>4&&n.get(4)==="documents",29091,{key:n.toString()}),n.popFirst(5)}function fl(n,e,t){return{name:ho(n,e),fields:t.value.mapValue.fields}}function pg(n,e){let t;if("targetChange"in e){e.targetChange;const r=function(f){return f==="NO_CHANGE"?0:f==="ADD"?1:f==="REMOVE"?2:f==="CURRENT"?3:f==="RESET"?4:L(39313,{state:f})}(e.targetChange.targetChangeType||"NO_CHANGE"),s=e.targetChange.targetIds||[],i=function(f,c){return f.useProto3Json?(Q(c===void 0||typeof c=="string",58123),ve.fromBase64String(c||"")):(Q(c===void 0||c instanceof Buffer||c instanceof Uint8Array,16193),ve.fromUint8Array(c||new Uint8Array))}(n,e.targetChange.resumeToken),a=e.targetChange.cause,u=a&&function(f){const c=f.code===void 0?S.UNKNOWN:td(f.code);return new V(c,f.message||"")}(a);t=new rd(r,s,i,u||null)}else if("documentChange"in e){e.documentChange;const r=e.documentChange;r.document,r.document.name,r.document.updateTime;const s=$i(n,r.document.name),i=Qe(r.document.updateTime),a=r.document.createTime?Qe(r.document.createTime):B.min(),u=new Ne({mapValue:{fields:r.document.fields}}),d=Se.newFoundDocument(s,i,a,u),f=r.targetIds||[],c=r.removedTargetIds||[];t=new fs(f,c,d.key,d)}else if("documentDelete"in e){e.documentDelete;const r=e.documentDelete;r.document;const s=$i(n,r.document),i=r.readTime?Qe(r.readTime):B.min(),a=Se.newNoDocument(s,i),u=r.removedTargetIds||[];t=new fs([],u,a.key,a)}else if("documentRemove"in e){e.documentRemove;const r=e.documentRemove;r.document;const s=$i(n,r.document),i=r.removedTargetIds||[];t=new fs([],i,s,null)}else{if(!("filter"in e))return L(11601,{Rt:e});{e.filter;const r=e.filter;r.targetId;const{count:s=0,unchangedNames:i}=r,a=new rg(s,i),u=r.targetId;t=new nd(u,a)}}return t}function mg(n,e){let t;if(e instanceof Ar)t={update:fl(n,e.key,e.value)};else if(e instanceof Qs)t={delete:ho(n,e.key)};else if(e instanceof Ft)t={update:fl(n,e.key,e.data),updateMask:Ig(e.fieldMask)};else{if(!(e instanceof eg))return L(16599,{Vt:e.type});t={verify:ho(n,e.key)}}return e.fieldTransforms.length>0&&(t.updateTransforms=e.fieldTransforms.map(r=>function(i,a){const u=a.transform;if(u instanceof pr)return{fieldPath:a.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(u instanceof mr)return{fieldPath:a.field.canonicalString(),appendMissingElements:{values:u.elements}};if(u instanceof gr)return{fieldPath:a.field.canonicalString(),removeAllFromArray:{values:u.elements}};if(u instanceof Ss)return{fieldPath:a.field.canonicalString(),increment:u.Ae};throw L(20930,{transform:a.transform})}(0,r))),e.precondition.isNone||(t.currentDocument=function(s,i){return i.updateTime!==void 0?{updateTime:hg(s,i.updateTime)}:i.exists!==void 0?{exists:i.exists}:L(27497)}(n,e.precondition)),t}function gg(n,e){return n&&n.length>0?(Q(e!==void 0,14353),n.map(t=>function(s,i){let a=s.updateTime?Qe(s.updateTime):Qe(i);return a.isEqual(B.min())&&(a=Qe(i)),new Jm(a,s.transformResults||[])}(t,e))):[]}function yg(n,e){return{documents:[od(n,e.path)]}}function _g(n,e){const t={structuredQuery:{}},r=e.path;let s;e.collectionGroup!==null?(s=r,t.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(s=r.popLast(),t.structuredQuery.from=[{collectionId:r.lastSegment()}]),t.parent=od(n,s);const i=function(f){if(f.length!==0)return ld(He.create(f,"and"))}(e.filters);i&&(t.structuredQuery.where=i);const a=function(f){if(f.length!==0)return f.map(c=>function(_){return{field:fn(_.field),direction:bg(_.dir)}}(c))}(e.orderBy);a&&(t.structuredQuery.orderBy=a);const u=lo(n,e.limit);return u!==null&&(t.structuredQuery.limit=u),e.startAt&&(t.structuredQuery.startAt=function(f){return{before:f.inclusive,values:f.position}}(e.startAt)),e.endAt&&(t.structuredQuery.endAt=function(f){return{before:!f.inclusive,values:f.position}}(e.endAt)),{ft:t,parent:s}}function wg(n){let e=fg(n.parent);const t=n.structuredQuery,r=t.from?t.from.length:0;let s=null;if(r>0){Q(r===1,65062);const c=t.from[0];c.allDescendants?s=c.collectionId:e=e.child(c.collectionId)}let i=[];t.where&&(i=function(w){const _=cd(w);return _ instanceof He&&Fu(_)?_.getFilters():[_]}(t.where));let a=[];t.orderBy&&(a=function(w){return w.map(_=>function(C){return new xs(pn(C.field),function(P){switch(P){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(C.direction))}(_))}(t.orderBy));let u=null;t.limit&&(u=function(w){let _;return _=typeof w=="object"?w.value:w,js(_)?null:_}(t.limit));let d=null;t.startAt&&(d=function(w){const _=!!w.before,x=w.values||[];return new As(x,_)}(t.startAt));let f=null;return t.endAt&&(f=function(w){const _=!w.before,x=w.values||[];return new As(x,_)}(t.endAt)),Lm(e,s,a,i,u,"F",d,f)}function vg(n,e){const t=function(s){switch(s){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return L(28987,{purpose:s})}}(e.purpose);return t==null?null:{"goog-listen-tags":t}}function cd(n){return n.unaryFilter!==void 0?function(t){switch(t.unaryFilter.op){case"IS_NAN":const r=pn(t.unaryFilter.field);return ae.create(r,"==",{doubleValue:NaN});case"IS_NULL":const s=pn(t.unaryFilter.field);return ae.create(s,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const i=pn(t.unaryFilter.field);return ae.create(i,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const a=pn(t.unaryFilter.field);return ae.create(a,"!=",{nullValue:"NULL_VALUE"});case"OPERATOR_UNSPECIFIED":return L(61313);default:return L(60726)}}(n):n.fieldFilter!==void 0?function(t){return ae.create(pn(t.fieldFilter.field),function(s){switch(s){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";case"OPERATOR_UNSPECIFIED":return L(58110);default:return L(50506)}}(t.fieldFilter.op),t.fieldFilter.value)}(n):n.compositeFilter!==void 0?function(t){return He.create(t.compositeFilter.filters.map(r=>cd(r)),function(s){switch(s){case"AND":return"and";case"OR":return"or";default:return L(1026)}}(t.compositeFilter.op))}(n):L(30097,{filter:n})}function bg(n){return cg[n]}function Eg(n){return lg[n]}function Tg(n){return ug[n]}function fn(n){return{fieldPath:n.canonicalString()}}function pn(n){return we.fromServerFormat(n.fieldPath)}function ld(n){return n instanceof ae?function(t){if(t.op==="=="){if(el(t.value))return{unaryFilter:{field:fn(t.field),op:"IS_NAN"}};if(Zc(t.value))return{unaryFilter:{field:fn(t.field),op:"IS_NULL"}}}else if(t.op==="!="){if(el(t.value))return{unaryFilter:{field:fn(t.field),op:"IS_NOT_NAN"}};if(Zc(t.value))return{unaryFilter:{field:fn(t.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:fn(t.field),op:Eg(t.op),value:t.value}}}(n):n instanceof He?function(t){const r=t.getFilters().map(s=>ld(s));return r.length===1?r[0]:{compositeFilter:{op:Tg(t.op),filters:r}}}(n):L(54877,{filter:n})}function Ig(n){const e=[];return n.fields.forEach(t=>e.push(t.canonicalString())),{fieldPaths:e}}function ud(n){return n.length>=4&&n.get(0)==="projects"&&n.get(2)==="databases"}/**
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
 */class Et{constructor(e,t,r,s,i=B.min(),a=B.min(),u=ve.EMPTY_BYTE_STRING,d=null){this.target=e,this.targetId=t,this.purpose=r,this.sequenceNumber=s,this.snapshotVersion=i,this.lastLimboFreeSnapshotVersion=a,this.resumeToken=u,this.expectedCount=d}withSequenceNumber(e){return new Et(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,t){return new Et(this.target,this.targetId,this.purpose,this.sequenceNumber,t,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new Et(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new Et(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}}/**
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
 */class Ag{constructor(e){this.yt=e}}function xg(n){const e=wg({parent:n.parent,structuredQuery:n.structuredQuery});return n.limitType==="LAST"?co(e,e.limit,"L"):e}/**
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
 */class Sg{constructor(){this.Cn=new Rg}addToCollectionParentIndex(e,t){return this.Cn.add(t),R.resolve()}getCollectionParents(e,t){return R.resolve(this.Cn.getEntries(t))}addFieldIndex(e,t){return R.resolve()}deleteFieldIndex(e,t){return R.resolve()}deleteAllFieldIndexes(e){return R.resolve()}createTargetIndexes(e,t){return R.resolve()}getDocumentsMatchingTarget(e,t){return R.resolve(null)}getIndexType(e,t){return R.resolve(0)}getFieldIndexes(e,t){return R.resolve([])}getNextCollectionGroupToUpdate(e){return R.resolve(null)}getMinOffset(e,t){return R.resolve(Pt.min())}getMinOffsetFromCollectionGroup(e,t){return R.resolve(Pt.min())}updateCollectionGroup(e,t,r){return R.resolve()}updateIndexEntries(e,t){return R.resolve()}}class Rg{constructor(){this.index={}}add(e){const t=e.lastSegment(),r=e.popLast(),s=this.index[t]||new de(J.comparator),i=!s.has(r);return this.index[t]=s.add(r),i}has(e){const t=e.lastSegment(),r=e.popLast(),s=this.index[t];return s&&s.has(r)}getEntries(e){return(this.index[e]||new de(J.comparator)).toArray()}}/**
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
 */const pl={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0},dd=41943040;class Ve{static withCacheSize(e){return new Ve(e,Ve.DEFAULT_COLLECTION_PERCENTILE,Ve.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}constructor(e,t,r){this.cacheSizeCollectionThreshold=e,this.percentileToCollect=t,this.maximumSequenceNumbersToCollect=r}}/**
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
 */Ve.DEFAULT_COLLECTION_PERCENTILE=10,Ve.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,Ve.DEFAULT=new Ve(dd,Ve.DEFAULT_COLLECTION_PERCENTILE,Ve.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),Ve.DISABLED=new Ve(-1,0,0);/**
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
 */class In{constructor(e){this.ar=e}next(){return this.ar+=2,this.ar}static ur(){return new In(0)}static cr(){return new In(-1)}}/**
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
 */const ml="LruGarbageCollector",Cg=1048576;function gl([n,e],[t,r]){const s=H(n,t);return s===0?H(e,r):s}class Pg{constructor(e){this.Ir=e,this.buffer=new de(gl),this.Er=0}dr(){return++this.Er}Ar(e){const t=[e,this.dr()];if(this.buffer.size<this.Ir)this.buffer=this.buffer.add(t);else{const r=this.buffer.last();gl(t,r)<0&&(this.buffer=this.buffer.delete(r).add(t))}}get maxValue(){return this.buffer.last()[0]}}class kg{constructor(e,t,r){this.garbageCollector=e,this.asyncQueue=t,this.localStore=r,this.Rr=null}start(){this.garbageCollector.params.cacheSizeCollectionThreshold!==-1&&this.Vr(6e4)}stop(){this.Rr&&(this.Rr.cancel(),this.Rr=null)}get started(){return this.Rr!==null}Vr(e){N(ml,`Garbage collection scheduled in ${e}ms`),this.Rr=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",e,async()=>{this.Rr=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(t){kn(t)?N(ml,"Ignoring IndexedDB error during garbage collection: ",t):await Pn(t)}await this.Vr(3e5)})}}class Dg{constructor(e,t){this.mr=e,this.params=t}calculateTargetCount(e,t){return this.mr.gr(e).next(r=>Math.floor(t/100*r))}nthSequenceNumber(e,t){if(t===0)return R.resolve(qs.ce);const r=new Pg(t);return this.mr.forEachTarget(e,s=>r.Ar(s.sequenceNumber)).next(()=>this.mr.pr(e,s=>r.Ar(s))).next(()=>r.maxValue)}removeTargets(e,t,r){return this.mr.removeTargets(e,t,r)}removeOrphanedDocuments(e,t){return this.mr.removeOrphanedDocuments(e,t)}collect(e,t){return this.params.cacheSizeCollectionThreshold===-1?(N("LruGarbageCollector","Garbage collection skipped; disabled"),R.resolve(pl)):this.getCacheSize(e).next(r=>r<this.params.cacheSizeCollectionThreshold?(N("LruGarbageCollector",`Garbage collection skipped; Cache size ${r} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),pl):this.yr(e,t))}getCacheSize(e){return this.mr.getCacheSize(e)}yr(e,t){let r,s,i,a,u,d,f;const c=Date.now();return this.calculateTargetCount(e,this.params.percentileToCollect).next(w=>(w>this.params.maximumSequenceNumbersToCollect?(N("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${w}`),s=this.params.maximumSequenceNumbersToCollect):s=w,a=Date.now(),this.nthSequenceNumber(e,s))).next(w=>(r=w,u=Date.now(),this.removeTargets(e,r,t))).next(w=>(i=w,d=Date.now(),this.removeOrphanedDocuments(e,r))).next(w=>(f=Date.now(),dn()<=z.DEBUG&&N("LruGarbageCollector",`LRU Garbage Collection
	Counted targets in ${a-c}ms
	Determined least recently used ${s} in `+(u-a)+`ms
	Removed ${i} targets in `+(d-u)+`ms
	Removed ${w} documents in `+(f-d)+`ms
Total Duration: ${f-c}ms`),R.resolve({didRun:!0,sequenceNumbersCollected:s,targetsRemoved:i,documentsRemoved:w})))}}function Vg(n,e){return new Dg(n,e)}/**
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
 */class Ng{constructor(){this.changes=new nn(e=>e.toString(),(e,t)=>e.isEqual(t)),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,t){this.assertNotApplied(),this.changes.set(e,Se.newInvalidDocument(e).setReadTime(t))}getEntry(e,t){this.assertNotApplied();const r=this.changes.get(t);return r!==void 0?R.resolve(r):this.getFromCache(e,t)}getEntries(e,t){return this.getAllFromCache(e,t)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}/**
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
 */class Og{constructor(e,t){this.overlayedDocument=e,this.mutatedFields=t}}/**
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
 */class Mg{constructor(e,t,r,s){this.remoteDocumentCache=e,this.mutationQueue=t,this.documentOverlayCache=r,this.indexManager=s}getDocument(e,t){let r=null;return this.documentOverlayCache.getOverlay(e,t).next(s=>(r=s,this.remoteDocumentCache.getEntry(e,t))).next(s=>(r!==null&&ar(r.mutation,s,Me.empty(),Z.now()),s))}getDocuments(e,t){return this.remoteDocumentCache.getEntries(e,t).next(r=>this.getLocalViewOfDocuments(e,r,G()).next(()=>r))}getLocalViewOfDocuments(e,t,r=G()){const s=Ht();return this.populateOverlays(e,s,t).next(()=>this.computeViews(e,t,s,r).next(i=>{let a=Zn();return i.forEach((u,d)=>{a=a.insert(u,d.overlayedDocument)}),a}))}getOverlayedDocuments(e,t){const r=Ht();return this.populateOverlays(e,r,t).next(()=>this.computeViews(e,t,r,G()))}populateOverlays(e,t,r){const s=[];return r.forEach(i=>{t.has(i)||s.push(i)}),this.documentOverlayCache.getOverlays(e,s).next(i=>{i.forEach((a,u)=>{t.set(a,u)})})}computeViews(e,t,r,s){let i=ut();const a=or(),u=function(){return or()}();return t.forEach((d,f)=>{const c=r.get(f.key);s.has(f.key)&&(c===void 0||c.mutation instanceof Ft)?i=i.insert(f.key,f):c!==void 0?(a.set(f.key,c.mutation.getFieldMask()),ar(c.mutation,f,c.mutation.getFieldMask(),Z.now())):a.set(f.key,Me.empty())}),this.recalculateAndSaveOverlays(e,i).next(d=>(d.forEach((f,c)=>a.set(f,c)),t.forEach((f,c)=>u.set(f,new Og(c,a.get(f)??null))),u))}recalculateAndSaveOverlays(e,t){const r=or();let s=new te((a,u)=>a-u),i=G();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,t).next(a=>{for(const u of a)u.keys().forEach(d=>{const f=t.get(d);if(f===null)return;let c=r.get(d)||Me.empty();c=u.applyToLocalView(f,c),r.set(d,c);const w=(s.get(u.batchId)||G()).add(d);s=s.insert(u.batchId,w)})}).next(()=>{const a=[],u=s.getReverseIterator();for(;u.hasNext();){const d=u.getNext(),f=d.key,c=d.value,w=Wu();c.forEach(_=>{if(!i.has(_)){const x=Zu(t.get(_),r.get(_));x!==null&&w.set(_,x),i=i.add(_)}}),a.push(this.documentOverlayCache.saveOverlays(e,f,w))}return R.waitFor(a)}).next(()=>r)}recalculateAndSaveOverlaysForDocumentKeys(e,t){return this.remoteDocumentCache.getEntries(e,t).next(r=>this.recalculateAndSaveOverlays(e,r))}getDocumentsMatchingQuery(e,t,r,s){return function(a){return O.isDocumentKey(a.path)&&a.collectionGroup===null&&a.filters.length===0}(t)?this.getDocumentsMatchingDocumentQuery(e,t.path):qu(t)?this.getDocumentsMatchingCollectionGroupQuery(e,t,r,s):this.getDocumentsMatchingCollectionQuery(e,t,r,s)}getNextDocuments(e,t,r,s){return this.remoteDocumentCache.getAllFromCollectionGroup(e,t,r,s).next(i=>{const a=s-i.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,t,r.largestBatchId,s-i.size):R.resolve(Ht());let u=ur,d=i;return a.next(f=>R.forEach(f,(c,w)=>(u<w.largestBatchId&&(u=w.largestBatchId),i.get(c)?R.resolve():this.remoteDocumentCache.getEntry(e,c).next(_=>{d=d.insert(c,_)}))).next(()=>this.populateOverlays(e,f,i)).next(()=>this.computeViews(e,d,f,G())).next(c=>({batchId:u,changes:Gu(c)})))})}getDocumentsMatchingDocumentQuery(e,t){return this.getDocument(e,new O(t)).next(r=>{let s=Zn();return r.isFoundDocument()&&(s=s.insert(r.key,r)),s})}getDocumentsMatchingCollectionGroupQuery(e,t,r,s){const i=t.collectionGroup;let a=Zn();return this.indexManager.getCollectionParents(e,i).next(u=>R.forEach(u,d=>{const f=function(w,_){return new Ir(_,null,w.explicitOrderBy.slice(),w.filters.slice(),w.limit,w.limitType,w.startAt,w.endAt)}(t,d.child(i));return this.getDocumentsMatchingCollectionQuery(e,f,r,s).next(c=>{c.forEach((w,_)=>{a=a.insert(w,_)})})}).next(()=>a))}getDocumentsMatchingCollectionQuery(e,t,r,s){let i;return this.documentOverlayCache.getOverlaysForCollection(e,t.path,r.largestBatchId).next(a=>(i=a,this.remoteDocumentCache.getDocumentsMatchingQuery(e,t,r,i,s))).next(a=>{i.forEach((d,f)=>{const c=f.getKey();a.get(c)===null&&(a=a.insert(c,Se.newInvalidDocument(c)))});let u=Zn();return a.forEach((d,f)=>{const c=i.get(d);c!==void 0&&ar(c.mutation,f,Me.empty(),Z.now()),Gs(t,f)&&(u=u.insert(d,f))}),u})}}/**
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
 */class Lg{constructor(e){this.serializer=e,this.Lr=new Map,this.kr=new Map}getBundleMetadata(e,t){return R.resolve(this.Lr.get(t))}saveBundleMetadata(e,t){return this.Lr.set(t.id,function(s){return{id:s.id,version:s.version,createTime:Qe(s.createTime)}}(t)),R.resolve()}getNamedQuery(e,t){return R.resolve(this.kr.get(t))}saveNamedQuery(e,t){return this.kr.set(t.name,function(s){return{name:s.name,query:xg(s.bundledQuery),readTime:Qe(s.readTime)}}(t)),R.resolve()}}/**
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
 */class Fg{constructor(){this.overlays=new te(O.comparator),this.qr=new Map}getOverlay(e,t){return R.resolve(this.overlays.get(t))}getOverlays(e,t){const r=Ht();return R.forEach(t,s=>this.getOverlay(e,s).next(i=>{i!==null&&r.set(s,i)})).next(()=>r)}saveOverlays(e,t,r){return r.forEach((s,i)=>{this.St(e,t,i)}),R.resolve()}removeOverlaysForBatchId(e,t,r){const s=this.qr.get(r);return s!==void 0&&(s.forEach(i=>this.overlays=this.overlays.remove(i)),this.qr.delete(r)),R.resolve()}getOverlaysForCollection(e,t,r){const s=Ht(),i=t.length+1,a=new O(t.child("")),u=this.overlays.getIteratorFrom(a);for(;u.hasNext();){const d=u.getNext().value,f=d.getKey();if(!t.isPrefixOf(f.path))break;f.path.length===i&&d.largestBatchId>r&&s.set(d.getKey(),d)}return R.resolve(s)}getOverlaysForCollectionGroup(e,t,r,s){let i=new te((f,c)=>f-c);const a=this.overlays.getIterator();for(;a.hasNext();){const f=a.getNext().value;if(f.getKey().getCollectionGroup()===t&&f.largestBatchId>r){let c=i.get(f.largestBatchId);c===null&&(c=Ht(),i=i.insert(f.largestBatchId,c)),c.set(f.getKey(),f)}}const u=Ht(),d=i.getIterator();for(;d.hasNext()&&(d.getNext().value.forEach((f,c)=>u.set(f,c)),!(u.size()>=s)););return R.resolve(u)}St(e,t,r){const s=this.overlays.get(r.key);if(s!==null){const a=this.qr.get(s.largestBatchId).delete(r.key);this.qr.set(s.largestBatchId,a)}this.overlays=this.overlays.insert(r.key,new ng(t,r));let i=this.qr.get(t);i===void 0&&(i=G(),this.qr.set(t,i)),this.qr.set(t,i.add(r.key))}}/**
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
 */class Ug{constructor(){this.sessionToken=ve.EMPTY_BYTE_STRING}getSessionToken(e){return R.resolve(this.sessionToken)}setSessionToken(e,t){return this.sessionToken=t,R.resolve()}}/**
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
 */class qo{constructor(){this.Qr=new de(pe.$r),this.Ur=new de(pe.Kr)}isEmpty(){return this.Qr.isEmpty()}addReference(e,t){const r=new pe(e,t);this.Qr=this.Qr.add(r),this.Ur=this.Ur.add(r)}Wr(e,t){e.forEach(r=>this.addReference(r,t))}removeReference(e,t){this.Gr(new pe(e,t))}zr(e,t){e.forEach(r=>this.removeReference(r,t))}jr(e){const t=new O(new J([])),r=new pe(t,e),s=new pe(t,e+1),i=[];return this.Ur.forEachInRange([r,s],a=>{this.Gr(a),i.push(a.key)}),i}Jr(){this.Qr.forEach(e=>this.Gr(e))}Gr(e){this.Qr=this.Qr.delete(e),this.Ur=this.Ur.delete(e)}Hr(e){const t=new O(new J([])),r=new pe(t,e),s=new pe(t,e+1);let i=G();return this.Ur.forEachInRange([r,s],a=>{i=i.add(a.key)}),i}containsKey(e){const t=new pe(e,0),r=this.Qr.firstAfterOrEqual(t);return r!==null&&e.isEqual(r.key)}}class pe{constructor(e,t){this.key=e,this.Yr=t}static $r(e,t){return O.comparator(e.key,t.key)||H(e.Yr,t.Yr)}static Kr(e,t){return H(e.Yr,t.Yr)||O.comparator(e.key,t.key)}}/**
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
 */class Bg{constructor(e,t){this.indexManager=e,this.referenceDelegate=t,this.mutationQueue=[],this.tr=1,this.Zr=new de(pe.$r)}checkEmpty(e){return R.resolve(this.mutationQueue.length===0)}addMutationBatch(e,t,r,s){const i=this.tr;this.tr++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const a=new tg(i,t,r,s);this.mutationQueue.push(a);for(const u of s)this.Zr=this.Zr.add(new pe(u.key,i)),this.indexManager.addToCollectionParentIndex(e,u.key.path.popLast());return R.resolve(a)}lookupMutationBatch(e,t){return R.resolve(this.Xr(t))}getNextMutationBatchAfterBatchId(e,t){const r=t+1,s=this.ei(r),i=s<0?0:s;return R.resolve(this.mutationQueue.length>i?this.mutationQueue[i]:null)}getHighestUnacknowledgedBatchId(){return R.resolve(this.mutationQueue.length===0?Do:this.tr-1)}getAllMutationBatches(e){return R.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,t){const r=new pe(t,0),s=new pe(t,Number.POSITIVE_INFINITY),i=[];return this.Zr.forEachInRange([r,s],a=>{const u=this.Xr(a.Yr);i.push(u)}),R.resolve(i)}getAllMutationBatchesAffectingDocumentKeys(e,t){let r=new de(H);return t.forEach(s=>{const i=new pe(s,0),a=new pe(s,Number.POSITIVE_INFINITY);this.Zr.forEachInRange([i,a],u=>{r=r.add(u.Yr)})}),R.resolve(this.ti(r))}getAllMutationBatchesAffectingQuery(e,t){const r=t.path,s=r.length+1;let i=r;O.isDocumentKey(i)||(i=i.child(""));const a=new pe(new O(i),0);let u=new de(H);return this.Zr.forEachWhile(d=>{const f=d.key.path;return!!r.isPrefixOf(f)&&(f.length===s&&(u=u.add(d.Yr)),!0)},a),R.resolve(this.ti(u))}ti(e){const t=[];return e.forEach(r=>{const s=this.Xr(r);s!==null&&t.push(s)}),t}removeMutationBatch(e,t){Q(this.ni(t.batchId,"removed")===0,55003),this.mutationQueue.shift();let r=this.Zr;return R.forEach(t.mutations,s=>{const i=new pe(s.key,t.batchId);return r=r.delete(i),this.referenceDelegate.markPotentiallyOrphaned(e,s.key)}).next(()=>{this.Zr=r})}ir(e){}containsKey(e,t){const r=new pe(t,0),s=this.Zr.firstAfterOrEqual(r);return R.resolve(t.isEqual(s&&s.key))}performConsistencyCheck(e){return this.mutationQueue.length,R.resolve()}ni(e,t){return this.ei(e)}ei(e){return this.mutationQueue.length===0?0:e-this.mutationQueue[0].batchId}Xr(e){const t=this.ei(e);return t<0||t>=this.mutationQueue.length?null:this.mutationQueue[t]}}/**
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
 */class $g{constructor(e){this.ri=e,this.docs=function(){return new te(O.comparator)}(),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,t){const r=t.key,s=this.docs.get(r),i=s?s.size:0,a=this.ri(t);return this.docs=this.docs.insert(r,{document:t.mutableCopy(),size:a}),this.size+=a-i,this.indexManager.addToCollectionParentIndex(e,r.path.popLast())}removeEntry(e){const t=this.docs.get(e);t&&(this.docs=this.docs.remove(e),this.size-=t.size)}getEntry(e,t){const r=this.docs.get(t);return R.resolve(r?r.document.mutableCopy():Se.newInvalidDocument(t))}getEntries(e,t){let r=ut();return t.forEach(s=>{const i=this.docs.get(s);r=r.insert(s,i?i.document.mutableCopy():Se.newInvalidDocument(s))}),R.resolve(r)}getDocumentsMatchingQuery(e,t,r,s){let i=ut();const a=t.path,u=new O(a.child("__id-9223372036854775808__")),d=this.docs.getIteratorFrom(u);for(;d.hasNext();){const{key:f,value:{document:c}}=d.getNext();if(!a.isPrefixOf(f.path))break;f.path.length>a.length+1||mm(pm(c),r)<=0||(s.has(c.key)||Gs(t,c))&&(i=i.insert(c.key,c.mutableCopy()))}return R.resolve(i)}getAllFromCollectionGroup(e,t,r,s){L(9500)}ii(e,t){return R.forEach(this.docs,r=>t(r))}newChangeBuffer(e){return new qg(this)}getSize(e){return R.resolve(this.size)}}class qg extends Ng{constructor(e){super(),this.Nr=e}applyChanges(e){const t=[];return this.changes.forEach((r,s)=>{s.isValidDocument()?t.push(this.Nr.addEntry(e,s)):this.Nr.removeEntry(r)}),R.waitFor(t)}getFromCache(e,t){return this.Nr.getEntry(e,t)}getAllFromCache(e,t){return this.Nr.getEntries(e,t)}}/**
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
 */class jg{constructor(e){this.persistence=e,this.si=new nn(t=>Oo(t),Mo),this.lastRemoteSnapshotVersion=B.min(),this.highestTargetId=0,this.oi=0,this._i=new qo,this.targetCount=0,this.ai=In.ur()}forEachTarget(e,t){return this.si.forEach((r,s)=>t(s)),R.resolve()}getLastRemoteSnapshotVersion(e){return R.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return R.resolve(this.oi)}allocateTargetId(e){return this.highestTargetId=this.ai.next(),R.resolve(this.highestTargetId)}setTargetsMetadata(e,t,r){return r&&(this.lastRemoteSnapshotVersion=r),t>this.oi&&(this.oi=t),R.resolve()}Pr(e){this.si.set(e.target,e);const t=e.targetId;t>this.highestTargetId&&(this.ai=new In(t),this.highestTargetId=t),e.sequenceNumber>this.oi&&(this.oi=e.sequenceNumber)}addTargetData(e,t){return this.Pr(t),this.targetCount+=1,R.resolve()}updateTargetData(e,t){return this.Pr(t),R.resolve()}removeTargetData(e,t){return this.si.delete(t.target),this._i.jr(t.targetId),this.targetCount-=1,R.resolve()}removeTargets(e,t,r){let s=0;const i=[];return this.si.forEach((a,u)=>{u.sequenceNumber<=t&&r.get(u.targetId)===null&&(this.si.delete(a),i.push(this.removeMatchingKeysForTargetId(e,u.targetId)),s++)}),R.waitFor(i).next(()=>s)}getTargetCount(e){return R.resolve(this.targetCount)}getTargetData(e,t){const r=this.si.get(t)||null;return R.resolve(r)}addMatchingKeys(e,t,r){return this._i.Wr(t,r),R.resolve()}removeMatchingKeys(e,t,r){this._i.zr(t,r);const s=this.persistence.referenceDelegate,i=[];return s&&t.forEach(a=>{i.push(s.markPotentiallyOrphaned(e,a))}),R.waitFor(i)}removeMatchingKeysForTargetId(e,t){return this._i.jr(t),R.resolve()}getMatchingKeysForTargetId(e,t){const r=this._i.Hr(t);return R.resolve(r)}containsKey(e,t){return R.resolve(this._i.containsKey(t))}}/**
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
 */class hd{constructor(e,t){this.ui={},this.overlays={},this.ci=new qs(0),this.li=!1,this.li=!0,this.hi=new Ug,this.referenceDelegate=e(this),this.Pi=new jg(this),this.indexManager=new Sg,this.remoteDocumentCache=function(s){return new $g(s)}(r=>this.referenceDelegate.Ti(r)),this.serializer=new Ag(t),this.Ii=new Lg(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.li=!1,Promise.resolve()}get started(){return this.li}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let t=this.overlays[e.toKey()];return t||(t=new Fg,this.overlays[e.toKey()]=t),t}getMutationQueue(e,t){let r=this.ui[e.toKey()];return r||(r=new Bg(t,this.referenceDelegate),this.ui[e.toKey()]=r),r}getGlobalsCache(){return this.hi}getTargetCache(){return this.Pi}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Ii}runTransaction(e,t,r){N("MemoryPersistence","Starting transaction:",e);const s=new zg(this.ci.next());return this.referenceDelegate.Ei(),r(s).next(i=>this.referenceDelegate.di(s).next(()=>i)).toPromise().then(i=>(s.raiseOnCommittedEvent(),i))}Ai(e,t){return R.or(Object.values(this.ui).map(r=>()=>r.containsKey(e,t)))}}class zg extends ym{constructor(e){super(),this.currentSequenceNumber=e}}class jo{constructor(e){this.persistence=e,this.Ri=new qo,this.Vi=null}static mi(e){return new jo(e)}get fi(){if(this.Vi)return this.Vi;throw L(60996)}addReference(e,t,r){return this.Ri.addReference(r,t),this.fi.delete(r.toString()),R.resolve()}removeReference(e,t,r){return this.Ri.removeReference(r,t),this.fi.add(r.toString()),R.resolve()}markPotentiallyOrphaned(e,t){return this.fi.add(t.toString()),R.resolve()}removeTarget(e,t){this.Ri.jr(t.targetId).forEach(s=>this.fi.add(s.toString()));const r=this.persistence.getTargetCache();return r.getMatchingKeysForTargetId(e,t.targetId).next(s=>{s.forEach(i=>this.fi.add(i.toString()))}).next(()=>r.removeTargetData(e,t))}Ei(){this.Vi=new Set}di(e){const t=this.persistence.getRemoteDocumentCache().newChangeBuffer();return R.forEach(this.fi,r=>{const s=O.fromPath(r);return this.gi(e,s).next(i=>{i||t.removeEntry(s,B.min())})}).next(()=>(this.Vi=null,t.apply(e)))}updateLimboDocument(e,t){return this.gi(e,t).next(r=>{r?this.fi.delete(t.toString()):this.fi.add(t.toString())})}Ti(e){return 0}gi(e,t){return R.or([()=>R.resolve(this.Ri.containsKey(t)),()=>this.persistence.getTargetCache().containsKey(e,t),()=>this.persistence.Ai(e,t)])}}class Cs{constructor(e,t){this.persistence=e,this.pi=new nn(r=>vm(r.path),(r,s)=>r.isEqual(s)),this.garbageCollector=Vg(this,t)}static mi(e,t){return new Cs(e,t)}Ei(){}di(e){return R.resolve()}forEachTarget(e,t){return this.persistence.getTargetCache().forEachTarget(e,t)}gr(e){const t=this.wr(e);return this.persistence.getTargetCache().getTargetCount(e).next(r=>t.next(s=>r+s))}wr(e){let t=0;return this.pr(e,r=>{t++}).next(()=>t)}pr(e,t){return R.forEach(this.pi,(r,s)=>this.br(e,r,s).next(i=>i?R.resolve():t(s)))}removeTargets(e,t,r){return this.persistence.getTargetCache().removeTargets(e,t,r)}removeOrphanedDocuments(e,t){let r=0;const s=this.persistence.getRemoteDocumentCache(),i=s.newChangeBuffer();return s.ii(e,a=>this.br(e,a,t).next(u=>{u||(r++,i.removeEntry(a,B.min()))})).next(()=>i.apply(e)).next(()=>r)}markPotentiallyOrphaned(e,t){return this.pi.set(t,e.currentSequenceNumber),R.resolve()}removeTarget(e,t){const r=t.withSequenceNumber(e.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(e,r)}addReference(e,t,r){return this.pi.set(r,e.currentSequenceNumber),R.resolve()}removeReference(e,t,r){return this.pi.set(r,e.currentSequenceNumber),R.resolve()}updateLimboDocument(e,t){return this.pi.set(t,e.currentSequenceNumber),R.resolve()}Ti(e){let t=e.key.toString().length;return e.isFoundDocument()&&(t+=us(e.data.value)),t}br(e,t,r){return R.or([()=>this.persistence.Ai(e,t),()=>this.persistence.getTargetCache().containsKey(e,t),()=>{const s=this.pi.get(t);return R.resolve(s!==void 0&&s>r)}])}getCacheSize(e){return this.persistence.getRemoteDocumentCache().getSize(e)}}/**
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
 */class zo{constructor(e,t,r,s){this.targetId=e,this.fromCache=t,this.Es=r,this.ds=s}static As(e,t){let r=G(),s=G();for(const i of t.docChanges)switch(i.type){case 0:r=r.add(i.doc.key);break;case 1:s=s.add(i.doc.key)}return new zo(e,t.fromCache,r,s)}}/**
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
 */class Hg{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}}/**
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
 */class Gg{constructor(){this.Rs=!1,this.Vs=!1,this.fs=100,this.gs=function(){return Ff()?8:_m(Re())>0?6:4}()}initialize(e,t){this.ps=e,this.indexManager=t,this.Rs=!0}getDocumentsMatchingQuery(e,t,r,s){const i={result:null};return this.ys(e,t).next(a=>{i.result=a}).next(()=>{if(!i.result)return this.ws(e,t,s,r).next(a=>{i.result=a})}).next(()=>{if(i.result)return;const a=new Hg;return this.Ss(e,t,a).next(u=>{if(i.result=u,this.Vs)return this.bs(e,t,a,u.size)})}).next(()=>i.result)}bs(e,t,r,s){return r.documentReadCount<this.fs?(dn()<=z.DEBUG&&N("QueryEngine","SDK will not create cache indexes for query:",hn(t),"since it only creates cache indexes for collection contains","more than or equal to",this.fs,"documents"),R.resolve()):(dn()<=z.DEBUG&&N("QueryEngine","Query:",hn(t),"scans",r.documentReadCount,"local documents and returns",s,"documents as results."),r.documentReadCount>this.gs*s?(dn()<=z.DEBUG&&N("QueryEngine","The SDK decides to create cache indexes for query:",hn(t),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,Ke(t))):R.resolve())}ys(e,t){if(sl(t))return R.resolve(null);let r=Ke(t);return this.indexManager.getIndexType(e,r).next(s=>s===0?null:(t.limit!==null&&s===1&&(t=co(t,null,"F"),r=Ke(t)),this.indexManager.getDocumentsMatchingTarget(e,r).next(i=>{const a=G(...i);return this.ps.getDocuments(e,a).next(u=>this.indexManager.getMinOffset(e,r).next(d=>{const f=this.Ds(t,u);return this.Cs(t,f,a,d.readTime)?this.ys(e,co(t,null,"F")):this.vs(e,f,t,d)}))})))}ws(e,t,r,s){return sl(t)||s.isEqual(B.min())?R.resolve(null):this.ps.getDocuments(e,r).next(i=>{const a=this.Ds(t,i);return this.Cs(t,a,r,s)?R.resolve(null):(dn()<=z.DEBUG&&N("QueryEngine","Re-using previous result from %s to execute query: %s",s.toString(),hn(t)),this.vs(e,a,t,fm(s,ur)).next(u=>u))})}Ds(e,t){let r=new de(zu(e));return t.forEach((s,i)=>{Gs(e,i)&&(r=r.add(i))}),r}Cs(e,t,r,s){if(e.limit===null)return!1;if(r.size!==t.size)return!0;const i=e.limitType==="F"?t.last():t.first();return!!i&&(i.hasPendingWrites||i.version.compareTo(s)>0)}Ss(e,t,r){return dn()<=z.DEBUG&&N("QueryEngine","Using full collection scan to execute query:",hn(t)),this.ps.getDocumentsMatchingQuery(e,t,Pt.min(),r)}vs(e,t,r,s){return this.ps.getDocumentsMatchingQuery(e,r,s).next(i=>(t.forEach(a=>{i=i.insert(a.key,a)}),i))}}/**
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
 */const Ho="LocalStore",Wg=3e8;class Kg{constructor(e,t,r,s){this.persistence=e,this.Fs=t,this.serializer=s,this.Ms=new te(H),this.xs=new nn(i=>Oo(i),Mo),this.Os=new Map,this.Ns=e.getRemoteDocumentCache(),this.Pi=e.getTargetCache(),this.Ii=e.getBundleCache(),this.Bs(r)}Bs(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new Mg(this.Ns,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.Ns.setIndexManager(this.indexManager),this.Fs.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",t=>e.collect(t,this.Ms))}}function Qg(n,e,t,r){return new Kg(n,e,t,r)}async function fd(n,e){const t=$(n);return await t.persistence.runTransaction("Handle user change","readonly",r=>{let s;return t.mutationQueue.getAllMutationBatches(r).next(i=>(s=i,t.Bs(e),t.mutationQueue.getAllMutationBatches(r))).next(i=>{const a=[],u=[];let d=G();for(const f of s){a.push(f.batchId);for(const c of f.mutations)d=d.add(c.key)}for(const f of i){u.push(f.batchId);for(const c of f.mutations)d=d.add(c.key)}return t.localDocuments.getDocuments(r,d).next(f=>({Ls:f,removedBatchIds:a,addedBatchIds:u}))})})}function Xg(n,e){const t=$(n);return t.persistence.runTransaction("Acknowledge batch","readwrite-primary",r=>{const s=e.batch.keys(),i=t.Ns.newChangeBuffer({trackRemovals:!0});return function(u,d,f,c){const w=f.batch,_=w.keys();let x=R.resolve();return _.forEach(C=>{x=x.next(()=>c.getEntry(d,C)).next(D=>{const P=f.docVersions.get(C);Q(P!==null,48541),D.version.compareTo(P)<0&&(w.applyToRemoteDocument(D,f),D.isValidDocument()&&(D.setReadTime(f.commitVersion),c.addEntry(D)))})}),x.next(()=>u.mutationQueue.removeMutationBatch(d,w))}(t,r,e,i).next(()=>i.apply(r)).next(()=>t.mutationQueue.performConsistencyCheck(r)).next(()=>t.documentOverlayCache.removeOverlaysForBatchId(r,s,e.batch.batchId)).next(()=>t.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(r,function(u){let d=G();for(let f=0;f<u.mutationResults.length;++f)u.mutationResults[f].transformResults.length>0&&(d=d.add(u.batch.mutations[f].key));return d}(e))).next(()=>t.localDocuments.getDocuments(r,s))})}function pd(n){const e=$(n);return e.persistence.runTransaction("Get last remote snapshot version","readonly",t=>e.Pi.getLastRemoteSnapshotVersion(t))}function Jg(n,e){const t=$(n),r=e.snapshotVersion;let s=t.Ms;return t.persistence.runTransaction("Apply remote event","readwrite-primary",i=>{const a=t.Ns.newChangeBuffer({trackRemovals:!0});s=t.Ms;const u=[];e.targetChanges.forEach((c,w)=>{const _=s.get(w);if(!_)return;u.push(t.Pi.removeMatchingKeys(i,c.removedDocuments,w).next(()=>t.Pi.addMatchingKeys(i,c.addedDocuments,w)));let x=_.withSequenceNumber(i.currentSequenceNumber);e.targetMismatches.get(w)!==null?x=x.withResumeToken(ve.EMPTY_BYTE_STRING,B.min()).withLastLimboFreeSnapshotVersion(B.min()):c.resumeToken.approximateByteSize()>0&&(x=x.withResumeToken(c.resumeToken,r)),s=s.insert(w,x),function(D,P,M){return D.resumeToken.approximateByteSize()===0||P.snapshotVersion.toMicroseconds()-D.snapshotVersion.toMicroseconds()>=Wg?!0:M.addedDocuments.size+M.modifiedDocuments.size+M.removedDocuments.size>0}(_,x,c)&&u.push(t.Pi.updateTargetData(i,x))});let d=ut(),f=G();if(e.documentUpdates.forEach(c=>{e.resolvedLimboDocuments.has(c)&&u.push(t.persistence.referenceDelegate.updateLimboDocument(i,c))}),u.push(Yg(i,a,e.documentUpdates).next(c=>{d=c.ks,f=c.qs})),!r.isEqual(B.min())){const c=t.Pi.getLastRemoteSnapshotVersion(i).next(w=>t.Pi.setTargetsMetadata(i,i.currentSequenceNumber,r));u.push(c)}return R.waitFor(u).next(()=>a.apply(i)).next(()=>t.localDocuments.getLocalViewOfDocuments(i,d,f)).next(()=>d)}).then(i=>(t.Ms=s,i))}function Yg(n,e,t){let r=G(),s=G();return t.forEach(i=>r=r.add(i)),e.getEntries(n,r).next(i=>{let a=ut();return t.forEach((u,d)=>{const f=i.get(u);d.isFoundDocument()!==f.isFoundDocument()&&(s=s.add(u)),d.isNoDocument()&&d.version.isEqual(B.min())?(e.removeEntry(u,d.readTime),a=a.insert(u,d)):!f.isValidDocument()||d.version.compareTo(f.version)>0||d.version.compareTo(f.version)===0&&f.hasPendingWrites?(e.addEntry(d),a=a.insert(u,d)):N(Ho,"Ignoring outdated watch update for ",u,". Current version:",f.version," Watch version:",d.version)}),{ks:a,qs:s}})}function Zg(n,e){const t=$(n);return t.persistence.runTransaction("Get next mutation batch","readonly",r=>(e===void 0&&(e=Do),t.mutationQueue.getNextMutationBatchAfterBatchId(r,e)))}function ey(n,e){const t=$(n);return t.persistence.runTransaction("Allocate target","readwrite",r=>{let s;return t.Pi.getTargetData(r,e).next(i=>i?(s=i,R.resolve(s)):t.Pi.allocateTargetId(r).next(a=>(s=new Et(e,a,"TargetPurposeListen",r.currentSequenceNumber),t.Pi.addTargetData(r,s).next(()=>s))))}).then(r=>{const s=t.Ms.get(r.targetId);return(s===null||r.snapshotVersion.compareTo(s.snapshotVersion)>0)&&(t.Ms=t.Ms.insert(r.targetId,r),t.xs.set(e,r.targetId)),r})}async function po(n,e,t){const r=$(n),s=r.Ms.get(e),i=t?"readwrite":"readwrite-primary";try{t||await r.persistence.runTransaction("Release target",i,a=>r.persistence.referenceDelegate.removeTarget(a,s))}catch(a){if(!kn(a))throw a;N(Ho,`Failed to update sequence numbers for target ${e}: ${a}`)}r.Ms=r.Ms.remove(e),r.xs.delete(s.target)}function yl(n,e,t){const r=$(n);let s=B.min(),i=G();return r.persistence.runTransaction("Execute query","readwrite",a=>function(d,f,c){const w=$(d),_=w.xs.get(c);return _!==void 0?R.resolve(w.Ms.get(_)):w.Pi.getTargetData(f,c)}(r,a,Ke(e)).next(u=>{if(u)return s=u.lastLimboFreeSnapshotVersion,r.Pi.getMatchingKeysForTargetId(a,u.targetId).next(d=>{i=d})}).next(()=>r.Fs.getDocumentsMatchingQuery(a,e,t?s:B.min(),t?i:G())).next(u=>(ty(r,Um(e),u),{documents:u,Qs:i})))}function ty(n,e,t){let r=n.Os.get(e)||B.min();t.forEach((s,i)=>{i.readTime.compareTo(r)>0&&(r=i.readTime)}),n.Os.set(e,r)}class _l{constructor(){this.activeTargetIds=Hm()}zs(e){this.activeTargetIds=this.activeTargetIds.add(e)}js(e){this.activeTargetIds=this.activeTargetIds.delete(e)}Gs(){const e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class ny{constructor(){this.Mo=new _l,this.xo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,t,r){}addLocalQueryTarget(e,t=!0){return t&&this.Mo.zs(e),this.xo[e]||"not-current"}updateQueryState(e,t,r){this.xo[e]=t}removeLocalQueryTarget(e){this.Mo.js(e)}isLocalQueryTarget(e){return this.Mo.activeTargetIds.has(e)}clearQueryState(e){delete this.xo[e]}getAllActiveQueryTargets(){return this.Mo.activeTargetIds}isActiveQueryTarget(e){return this.Mo.activeTargetIds.has(e)}start(){return this.Mo=new _l,Promise.resolve()}handleUserChange(e,t,r){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}/**
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
 */class ry{Oo(e){}shutdown(){}}/**
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
 */const wl="ConnectivityMonitor";class vl{constructor(){this.No=()=>this.Bo(),this.Lo=()=>this.ko(),this.qo=[],this.Qo()}Oo(e){this.qo.push(e)}shutdown(){window.removeEventListener("online",this.No),window.removeEventListener("offline",this.Lo)}Qo(){window.addEventListener("online",this.No),window.addEventListener("offline",this.Lo)}Bo(){N(wl,"Network connectivity changed: AVAILABLE");for(const e of this.qo)e(0)}ko(){N(wl,"Network connectivity changed: UNAVAILABLE");for(const e of this.qo)e(1)}static v(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
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
 */let as=null;function mo(){return as===null?as=function(){return 268435456+Math.round(2147483648*Math.random())}():as++,"0x"+as.toString(16)}/**
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
 */const qi="RestConnection",sy={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};class iy{get $o(){return!1}constructor(e){this.databaseInfo=e,this.databaseId=e.databaseId;const t=e.ssl?"https":"http",r=encodeURIComponent(this.databaseId.projectId),s=encodeURIComponent(this.databaseId.database);this.Uo=t+"://"+e.host,this.Ko=`projects/${r}/databases/${s}`,this.Wo=this.databaseId.database===Ts?`project_id=${r}`:`project_id=${r}&database_id=${s}`}Go(e,t,r,s,i){const a=mo(),u=this.zo(e,t.toUriEncodedString());N(qi,`Sending RPC '${e}' ${a}:`,u,r);const d={"google-cloud-resource-prefix":this.Ko,"x-goog-request-params":this.Wo};this.jo(d,s,i);const{host:f}=new URL(u),c=Sn(f);return this.Jo(e,u,d,r,c).then(w=>(N(qi,`Received RPC '${e}' ${a}: `,w),w),w=>{throw vn(qi,`RPC '${e}' ${a} failed with error: `,w,"url: ",u,"request:",r),w})}Ho(e,t,r,s,i,a){return this.Go(e,t,r,s,i)}jo(e,t,r){e["X-Goog-Api-Client"]=function(){return"gl-js/ fire/"+Cn}(),e["Content-Type"]="text/plain",this.databaseInfo.appId&&(e["X-Firebase-GMPID"]=this.databaseInfo.appId),t&&t.headers.forEach((s,i)=>e[i]=s),r&&r.headers.forEach((s,i)=>e[i]=s)}zo(e,t){const r=sy[e];return`${this.Uo}/v1/${t}:${r}`}terminate(){}}/**
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
 */class oy{constructor(e){this.Yo=e.Yo,this.Zo=e.Zo}Xo(e){this.e_=e}t_(e){this.n_=e}r_(e){this.i_=e}onMessage(e){this.s_=e}close(){this.Zo()}send(e){this.Yo(e)}o_(){this.e_()}__(){this.n_()}a_(e){this.i_(e)}u_(e){this.s_(e)}}/**
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
 */const Ae="WebChannelConnection";class ay extends iy{constructor(e){super(e),this.c_=[],this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}Jo(e,t,r,s,i){const a=mo();return new Promise((u,d)=>{const f=new yu;f.setWithCredentials(!0),f.listenOnce(_u.COMPLETE,()=>{try{switch(f.getLastErrorCode()){case ls.NO_ERROR:const w=f.getResponseJson();N(Ae,`XHR for RPC '${e}' ${a} received:`,JSON.stringify(w)),u(w);break;case ls.TIMEOUT:N(Ae,`RPC '${e}' ${a} timed out`),d(new V(S.DEADLINE_EXCEEDED,"Request time out"));break;case ls.HTTP_ERROR:const _=f.getStatus();if(N(Ae,`RPC '${e}' ${a} failed with status:`,_,"response text:",f.getResponseText()),_>0){let x=f.getResponseJson();Array.isArray(x)&&(x=x[0]);const C=x?.error;if(C&&C.status&&C.message){const D=function(M){const F=M.toLowerCase().replace(/_/g,"-");return Object.values(S).indexOf(F)>=0?F:S.UNKNOWN}(C.status);d(new V(D,C.message))}else d(new V(S.UNKNOWN,"Server responded with status "+f.getStatus()))}else d(new V(S.UNAVAILABLE,"Connection failed."));break;default:L(9055,{l_:e,streamId:a,h_:f.getLastErrorCode(),P_:f.getLastError()})}}finally{N(Ae,`RPC '${e}' ${a} completed.`)}});const c=JSON.stringify(s);N(Ae,`RPC '${e}' ${a} sending request:`,s),f.send(t,"POST",c,r,15)})}T_(e,t,r){const s=mo(),i=[this.Uo,"/","google.firestore.v1.Firestore","/",e,"/channel"],a=bu(),u=vu(),d={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},f=this.longPollingOptions.timeoutSeconds;f!==void 0&&(d.longPollingTimeout=Math.round(1e3*f)),this.useFetchStreams&&(d.useFetchStreams=!0),this.jo(d.initMessageHeaders,t,r),d.encodeInitMessageHeaders=!0;const c=i.join("");N(Ae,`Creating RPC '${e}' stream ${s}: ${c}`,d);const w=a.createWebChannel(c,d);this.I_(w);let _=!1,x=!1;const C=new oy({Yo:P=>{x?N(Ae,`Not sending because RPC '${e}' stream ${s} is closed:`,P):(_||(N(Ae,`Opening RPC '${e}' stream ${s} transport.`),w.open(),_=!0),N(Ae,`RPC '${e}' stream ${s} sending:`,P),w.send(P))},Zo:()=>w.close()}),D=(P,M,F)=>{P.listen(M,j=>{try{F(j)}catch(ee){setTimeout(()=>{throw ee},0)}})};return D(w,Yn.EventType.OPEN,()=>{x||(N(Ae,`RPC '${e}' stream ${s} transport opened.`),C.o_())}),D(w,Yn.EventType.CLOSE,()=>{x||(x=!0,N(Ae,`RPC '${e}' stream ${s} transport closed`),C.a_(),this.E_(w))}),D(w,Yn.EventType.ERROR,P=>{x||(x=!0,vn(Ae,`RPC '${e}' stream ${s} transport errored. Name:`,P.name,"Message:",P.message),C.a_(new V(S.UNAVAILABLE,"The operation could not be completed")))}),D(w,Yn.EventType.MESSAGE,P=>{if(!x){const M=P.data[0];Q(!!M,16349);const F=M,j=F?.error||F[0]?.error;if(j){N(Ae,`RPC '${e}' stream ${s} received error:`,j);const ee=j.status;let me=function(m){const y=oe[m];if(y!==void 0)return td(y)}(ee),ue=j.message;me===void 0&&(me=S.INTERNAL,ue="Unknown error status: "+ee+" with message "+j.message),x=!0,C.a_(new V(me,ue)),w.close()}else N(Ae,`RPC '${e}' stream ${s} received:`,M),C.u_(M)}}),D(u,wu.STAT_EVENT,P=>{P.stat===to.PROXY?N(Ae,`RPC '${e}' stream ${s} detected buffering proxy`):P.stat===to.NOPROXY&&N(Ae,`RPC '${e}' stream ${s} detected no buffering proxy`)}),setTimeout(()=>{C.__()},0),C}terminate(){this.c_.forEach(e=>e.close()),this.c_=[]}I_(e){this.c_.push(e)}E_(e){this.c_=this.c_.filter(t=>t===e)}}function ji(){return typeof document<"u"?document:null}/**
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
 */function Js(n){return new dg(n,!0)}/**
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
 */class md{constructor(e,t,r=1e3,s=1.5,i=6e4){this.Mi=e,this.timerId=t,this.d_=r,this.A_=s,this.R_=i,this.V_=0,this.m_=null,this.f_=Date.now(),this.reset()}reset(){this.V_=0}g_(){this.V_=this.R_}p_(e){this.cancel();const t=Math.floor(this.V_+this.y_()),r=Math.max(0,Date.now()-this.f_),s=Math.max(0,t-r);s>0&&N("ExponentialBackoff",`Backing off for ${s} ms (base delay: ${this.V_} ms, delay with jitter: ${t} ms, last attempt: ${r} ms ago)`),this.m_=this.Mi.enqueueAfterDelay(this.timerId,s,()=>(this.f_=Date.now(),e())),this.V_*=this.A_,this.V_<this.d_&&(this.V_=this.d_),this.V_>this.R_&&(this.V_=this.R_)}w_(){this.m_!==null&&(this.m_.skipDelay(),this.m_=null)}cancel(){this.m_!==null&&(this.m_.cancel(),this.m_=null)}y_(){return(Math.random()-.5)*this.V_}}/**
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
 */const bl="PersistentStream";class gd{constructor(e,t,r,s,i,a,u,d){this.Mi=e,this.S_=r,this.b_=s,this.connection=i,this.authCredentialsProvider=a,this.appCheckCredentialsProvider=u,this.listener=d,this.state=0,this.D_=0,this.C_=null,this.v_=null,this.stream=null,this.F_=0,this.M_=new md(e,t)}x_(){return this.state===1||this.state===5||this.O_()}O_(){return this.state===2||this.state===3}start(){this.F_=0,this.state!==4?this.auth():this.N_()}async stop(){this.x_()&&await this.close(0)}B_(){this.state=0,this.M_.reset()}L_(){this.O_()&&this.C_===null&&(this.C_=this.Mi.enqueueAfterDelay(this.S_,6e4,()=>this.k_()))}q_(e){this.Q_(),this.stream.send(e)}async k_(){if(this.O_())return this.close(0)}Q_(){this.C_&&(this.C_.cancel(),this.C_=null)}U_(){this.v_&&(this.v_.cancel(),this.v_=null)}async close(e,t){this.Q_(),this.U_(),this.M_.cancel(),this.D_++,e!==4?this.M_.reset():t&&t.code===S.RESOURCE_EXHAUSTED?(lt(t.toString()),lt("Using maximum backoff delay to prevent overloading the backend."),this.M_.g_()):t&&t.code===S.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.K_(),this.stream.close(),this.stream=null),this.state=e,await this.listener.r_(t)}K_(){}auth(){this.state=1;const e=this.W_(this.D_),t=this.D_;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([r,s])=>{this.D_===t&&this.G_(r,s)},r=>{e(()=>{const s=new V(S.UNKNOWN,"Fetching auth token failed: "+r.message);return this.z_(s)})})}G_(e,t){const r=this.W_(this.D_);this.stream=this.j_(e,t),this.stream.Xo(()=>{r(()=>this.listener.Xo())}),this.stream.t_(()=>{r(()=>(this.state=2,this.v_=this.Mi.enqueueAfterDelay(this.b_,1e4,()=>(this.O_()&&(this.state=3),Promise.resolve())),this.listener.t_()))}),this.stream.r_(s=>{r(()=>this.z_(s))}),this.stream.onMessage(s=>{r(()=>++this.F_==1?this.J_(s):this.onNext(s))})}N_(){this.state=5,this.M_.p_(async()=>{this.state=0,this.start()})}z_(e){return N(bl,`close with error: ${e}`),this.stream=null,this.close(4,e)}W_(e){return t=>{this.Mi.enqueueAndForget(()=>this.D_===e?t():(N(bl,"stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}}class cy extends gd{constructor(e,t,r,s,i,a){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",t,r,s,a),this.serializer=i}j_(e,t){return this.connection.T_("Listen",e,t)}J_(e){return this.onNext(e)}onNext(e){this.M_.reset();const t=pg(this.serializer,e),r=function(i){if(!("targetChange"in i))return B.min();const a=i.targetChange;return a.targetIds&&a.targetIds.length?B.min():a.readTime?Qe(a.readTime):B.min()}(e);return this.listener.H_(t,r)}Y_(e){const t={};t.database=fo(this.serializer),t.addTarget=function(i,a){let u;const d=a.target;if(u=oo(d)?{documents:yg(i,d)}:{query:_g(i,d).ft},u.targetId=a.targetId,a.resumeToken.approximateByteSize()>0){u.resumeToken=sd(i,a.resumeToken);const f=lo(i,a.expectedCount);f!==null&&(u.expectedCount=f)}else if(a.snapshotVersion.compareTo(B.min())>0){u.readTime=Rs(i,a.snapshotVersion.toTimestamp());const f=lo(i,a.expectedCount);f!==null&&(u.expectedCount=f)}return u}(this.serializer,e);const r=vg(this.serializer,e);r&&(t.labels=r),this.q_(t)}Z_(e){const t={};t.database=fo(this.serializer),t.removeTarget=e,this.q_(t)}}class ly extends gd{constructor(e,t,r,s,i,a){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",t,r,s,a),this.serializer=i}get X_(){return this.F_>0}start(){this.lastStreamToken=void 0,super.start()}K_(){this.X_&&this.ea([])}j_(e,t){return this.connection.T_("Write",e,t)}J_(e){return Q(!!e.streamToken,31322),this.lastStreamToken=e.streamToken,Q(!e.writeResults||e.writeResults.length===0,55816),this.listener.ta()}onNext(e){Q(!!e.streamToken,12678),this.lastStreamToken=e.streamToken,this.M_.reset();const t=gg(e.writeResults,e.commitTime),r=Qe(e.commitTime);return this.listener.na(r,t)}ra(){const e={};e.database=fo(this.serializer),this.q_(e)}ea(e){const t={streamToken:this.lastStreamToken,writes:e.map(r=>mg(this.serializer,r))};this.q_(t)}}/**
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
 */class uy{}class dy extends uy{constructor(e,t,r,s){super(),this.authCredentials=e,this.appCheckCredentials=t,this.connection=r,this.serializer=s,this.ia=!1}sa(){if(this.ia)throw new V(S.FAILED_PRECONDITION,"The client has already been terminated.")}Go(e,t,r,s){return this.sa(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([i,a])=>this.connection.Go(e,uo(t,r),s,i,a)).catch(i=>{throw i.name==="FirebaseError"?(i.code===S.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),i):new V(S.UNKNOWN,i.toString())})}Ho(e,t,r,s,i){return this.sa(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([a,u])=>this.connection.Ho(e,uo(t,r),s,a,u,i)).catch(a=>{throw a.name==="FirebaseError"?(a.code===S.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),a):new V(S.UNKNOWN,a.toString())})}terminate(){this.ia=!0,this.connection.terminate()}}class hy{constructor(e,t){this.asyncQueue=e,this.onlineStateHandler=t,this.state="Unknown",this.oa=0,this._a=null,this.aa=!0}ua(){this.oa===0&&(this.ca("Unknown"),this._a=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this._a=null,this.la("Backend didn't respond within 10 seconds."),this.ca("Offline"),Promise.resolve())))}ha(e){this.state==="Online"?this.ca("Unknown"):(this.oa++,this.oa>=1&&(this.Pa(),this.la(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.ca("Offline")))}set(e){this.Pa(),this.oa=0,e==="Online"&&(this.aa=!1),this.ca(e)}ca(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}la(e){const t=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.aa?(lt(t),this.aa=!1):N("OnlineStateTracker",t)}Pa(){this._a!==null&&(this._a.cancel(),this._a=null)}}/**
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
 */const Zt="RemoteStore";class fy{constructor(e,t,r,s,i){this.localStore=e,this.datastore=t,this.asyncQueue=r,this.remoteSyncer={},this.Ta=[],this.Ia=new Map,this.Ea=new Set,this.da=[],this.Aa=i,this.Aa.Oo(a=>{r.enqueueAndForget(async()=>{rn(this)&&(N(Zt,"Restarting streams for network reachability change."),await async function(d){const f=$(d);f.Ea.add(4),await Sr(f),f.Ra.set("Unknown"),f.Ea.delete(4),await Ys(f)}(this))})}),this.Ra=new hy(r,s)}}async function Ys(n){if(rn(n))for(const e of n.da)await e(!0)}async function Sr(n){for(const e of n.da)await e(!1)}function yd(n,e){const t=$(n);t.Ia.has(e.targetId)||(t.Ia.set(e.targetId,e),Qo(t)?Ko(t):Dn(t).O_()&&Wo(t,e))}function Go(n,e){const t=$(n),r=Dn(t);t.Ia.delete(e),r.O_()&&_d(t,e),t.Ia.size===0&&(r.O_()?r.L_():rn(t)&&t.Ra.set("Unknown"))}function Wo(n,e){if(n.Va.Ue(e.targetId),e.resumeToken.approximateByteSize()>0||e.snapshotVersion.compareTo(B.min())>0){const t=n.remoteSyncer.getRemoteKeysForTarget(e.targetId).size;e=e.withExpectedCount(t)}Dn(n).Y_(e)}function _d(n,e){n.Va.Ue(e),Dn(n).Z_(e)}function Ko(n){n.Va=new ag({getRemoteKeysForTarget:e=>n.remoteSyncer.getRemoteKeysForTarget(e),At:e=>n.Ia.get(e)||null,ht:()=>n.datastore.serializer.databaseId}),Dn(n).start(),n.Ra.ua()}function Qo(n){return rn(n)&&!Dn(n).x_()&&n.Ia.size>0}function rn(n){return $(n).Ea.size===0}function wd(n){n.Va=void 0}async function py(n){n.Ra.set("Online")}async function my(n){n.Ia.forEach((e,t)=>{Wo(n,e)})}async function gy(n,e){wd(n),Qo(n)?(n.Ra.ha(e),Ko(n)):n.Ra.set("Unknown")}async function yy(n,e,t){if(n.Ra.set("Online"),e instanceof rd&&e.state===2&&e.cause)try{await async function(s,i){const a=i.cause;for(const u of i.targetIds)s.Ia.has(u)&&(await s.remoteSyncer.rejectListen(u,a),s.Ia.delete(u),s.Va.removeTarget(u))}(n,e)}catch(r){N(Zt,"Failed to remove targets %s: %s ",e.targetIds.join(","),r),await Ps(n,r)}else if(e instanceof fs?n.Va.Ze(e):e instanceof nd?n.Va.st(e):n.Va.tt(e),!t.isEqual(B.min()))try{const r=await pd(n.localStore);t.compareTo(r)>=0&&await function(i,a){const u=i.Va.Tt(a);return u.targetChanges.forEach((d,f)=>{if(d.resumeToken.approximateByteSize()>0){const c=i.Ia.get(f);c&&i.Ia.set(f,c.withResumeToken(d.resumeToken,a))}}),u.targetMismatches.forEach((d,f)=>{const c=i.Ia.get(d);if(!c)return;i.Ia.set(d,c.withResumeToken(ve.EMPTY_BYTE_STRING,c.snapshotVersion)),_d(i,d);const w=new Et(c.target,d,f,c.sequenceNumber);Wo(i,w)}),i.remoteSyncer.applyRemoteEvent(u)}(n,t)}catch(r){N(Zt,"Failed to raise snapshot:",r),await Ps(n,r)}}async function Ps(n,e,t){if(!kn(e))throw e;n.Ea.add(1),await Sr(n),n.Ra.set("Offline"),t||(t=()=>pd(n.localStore)),n.asyncQueue.enqueueRetryable(async()=>{N(Zt,"Retrying IndexedDB access"),await t(),n.Ea.delete(1),await Ys(n)})}function vd(n,e){return e().catch(t=>Ps(n,t,e))}async function Zs(n){const e=$(n),t=Nt(e);let r=e.Ta.length>0?e.Ta[e.Ta.length-1].batchId:Do;for(;_y(e);)try{const s=await Zg(e.localStore,r);if(s===null){e.Ta.length===0&&t.L_();break}r=s.batchId,wy(e,s)}catch(s){await Ps(e,s)}bd(e)&&Ed(e)}function _y(n){return rn(n)&&n.Ta.length<10}function wy(n,e){n.Ta.push(e);const t=Nt(n);t.O_()&&t.X_&&t.ea(e.mutations)}function bd(n){return rn(n)&&!Nt(n).x_()&&n.Ta.length>0}function Ed(n){Nt(n).start()}async function vy(n){Nt(n).ra()}async function by(n){const e=Nt(n);for(const t of n.Ta)e.ea(t.mutations)}async function Ey(n,e,t){const r=n.Ta.shift(),s=Uo.from(r,e,t);await vd(n,()=>n.remoteSyncer.applySuccessfulWrite(s)),await Zs(n)}async function Ty(n,e){e&&Nt(n).X_&&await async function(r,s){if(function(a){return sg(a)&&a!==S.ABORTED}(s.code)){const i=r.Ta.shift();Nt(r).B_(),await vd(r,()=>r.remoteSyncer.rejectFailedWrite(i.batchId,s)),await Zs(r)}}(n,e),bd(n)&&Ed(n)}async function El(n,e){const t=$(n);t.asyncQueue.verifyOperationInProgress(),N(Zt,"RemoteStore received new credentials");const r=rn(t);t.Ea.add(3),await Sr(t),r&&t.Ra.set("Unknown"),await t.remoteSyncer.handleCredentialChange(e),t.Ea.delete(3),await Ys(t)}async function Iy(n,e){const t=$(n);e?(t.Ea.delete(2),await Ys(t)):e||(t.Ea.add(2),await Sr(t),t.Ra.set("Unknown"))}function Dn(n){return n.ma||(n.ma=function(t,r,s){const i=$(t);return i.sa(),new cy(r,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,s)}(n.datastore,n.asyncQueue,{Xo:py.bind(null,n),t_:my.bind(null,n),r_:gy.bind(null,n),H_:yy.bind(null,n)}),n.da.push(async e=>{e?(n.ma.B_(),Qo(n)?Ko(n):n.Ra.set("Unknown")):(await n.ma.stop(),wd(n))})),n.ma}function Nt(n){return n.fa||(n.fa=function(t,r,s){const i=$(t);return i.sa(),new ly(r,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,s)}(n.datastore,n.asyncQueue,{Xo:()=>Promise.resolve(),t_:vy.bind(null,n),r_:Ty.bind(null,n),ta:by.bind(null,n),na:Ey.bind(null,n)}),n.da.push(async e=>{e?(n.fa.B_(),await Zs(n)):(await n.fa.stop(),n.Ta.length>0&&(N(Zt,`Stopping write stream with ${n.Ta.length} pending writes`),n.Ta=[]))})),n.fa}/**
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
 */class Xo{constructor(e,t,r,s,i){this.asyncQueue=e,this.timerId=t,this.targetTimeMs=r,this.op=s,this.removalCallback=i,this.deferred=new St,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(a=>{})}get promise(){return this.deferred.promise}static createAndSchedule(e,t,r,s,i){const a=Date.now()+r,u=new Xo(e,t,a,s,i);return u.start(r),u}start(e){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new V(S.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then(e=>this.deferred.resolve(e))):Promise.resolve())}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function Jo(n,e){if(lt("AsyncQueue",`${e}: ${n}`),kn(n))return new V(S.UNAVAILABLE,`${e}: ${n}`);throw n}/**
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
 */class mn{static emptySet(e){return new mn(e.comparator)}constructor(e){this.comparator=e?(t,r)=>e(t,r)||O.comparator(t.key,r.key):(t,r)=>O.comparator(t.key,r.key),this.keyedMap=Zn(),this.sortedSet=new te(this.comparator)}has(e){return this.keyedMap.get(e)!=null}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){const t=this.keyedMap.get(e);return t?this.sortedSet.indexOf(t):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal((t,r)=>(e(t),!1))}add(e){const t=this.delete(e.key);return t.copy(t.keyedMap.insert(e.key,e),t.sortedSet.insert(e,null))}delete(e){const t=this.get(e);return t?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(t)):this}isEqual(e){if(!(e instanceof mn)||this.size!==e.size)return!1;const t=this.sortedSet.getIterator(),r=e.sortedSet.getIterator();for(;t.hasNext();){const s=t.getNext().key,i=r.getNext().key;if(!s.isEqual(i))return!1}return!0}toString(){const e=[];return this.forEach(t=>{e.push(t.toString())}),e.length===0?"DocumentSet ()":`DocumentSet (
  `+e.join(`  
`)+`
)`}copy(e,t){const r=new mn;return r.comparator=this.comparator,r.keyedMap=e,r.sortedSet=t,r}}/**
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
 */class Tl{constructor(){this.ga=new te(O.comparator)}track(e){const t=e.doc.key,r=this.ga.get(t);r?e.type!==0&&r.type===3?this.ga=this.ga.insert(t,e):e.type===3&&r.type!==1?this.ga=this.ga.insert(t,{type:r.type,doc:e.doc}):e.type===2&&r.type===2?this.ga=this.ga.insert(t,{type:2,doc:e.doc}):e.type===2&&r.type===0?this.ga=this.ga.insert(t,{type:0,doc:e.doc}):e.type===1&&r.type===0?this.ga=this.ga.remove(t):e.type===1&&r.type===2?this.ga=this.ga.insert(t,{type:1,doc:r.doc}):e.type===0&&r.type===1?this.ga=this.ga.insert(t,{type:2,doc:e.doc}):L(63341,{Rt:e,pa:r}):this.ga=this.ga.insert(t,e)}ya(){const e=[];return this.ga.inorderTraversal((t,r)=>{e.push(r)}),e}}class An{constructor(e,t,r,s,i,a,u,d,f){this.query=e,this.docs=t,this.oldDocs=r,this.docChanges=s,this.mutatedKeys=i,this.fromCache=a,this.syncStateChanged=u,this.excludesMetadataChanges=d,this.hasCachedResults=f}static fromInitialDocuments(e,t,r,s,i){const a=[];return t.forEach(u=>{a.push({type:0,doc:u})}),new An(e,t,mn.emptySet(t),a,r,s,!0,!1,i)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&Hs(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;const t=this.docChanges,r=e.docChanges;if(t.length!==r.length)return!1;for(let s=0;s<t.length;s++)if(t[s].type!==r[s].type||!t[s].doc.isEqual(r[s].doc))return!1;return!0}}/**
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
 */class Ay{constructor(){this.wa=void 0,this.Sa=[]}ba(){return this.Sa.some(e=>e.Da())}}class xy{constructor(){this.queries=Il(),this.onlineState="Unknown",this.Ca=new Set}terminate(){(function(t,r){const s=$(t),i=s.queries;s.queries=Il(),i.forEach((a,u)=>{for(const d of u.Sa)d.onError(r)})})(this,new V(S.ABORTED,"Firestore shutting down"))}}function Il(){return new nn(n=>ju(n),Hs)}async function Td(n,e){const t=$(n);let r=3;const s=e.query;let i=t.queries.get(s);i?!i.ba()&&e.Da()&&(r=2):(i=new Ay,r=e.Da()?0:1);try{switch(r){case 0:i.wa=await t.onListen(s,!0);break;case 1:i.wa=await t.onListen(s,!1);break;case 2:await t.onFirstRemoteStoreListen(s)}}catch(a){const u=Jo(a,`Initialization of query '${hn(e.query)}' failed`);return void e.onError(u)}t.queries.set(s,i),i.Sa.push(e),e.va(t.onlineState),i.wa&&e.Fa(i.wa)&&Yo(t)}async function Id(n,e){const t=$(n),r=e.query;let s=3;const i=t.queries.get(r);if(i){const a=i.Sa.indexOf(e);a>=0&&(i.Sa.splice(a,1),i.Sa.length===0?s=e.Da()?0:1:!i.ba()&&e.Da()&&(s=2))}switch(s){case 0:return t.queries.delete(r),t.onUnlisten(r,!0);case 1:return t.queries.delete(r),t.onUnlisten(r,!1);case 2:return t.onLastRemoteStoreUnlisten(r);default:return}}function Sy(n,e){const t=$(n);let r=!1;for(const s of e){const i=s.query,a=t.queries.get(i);if(a){for(const u of a.Sa)u.Fa(s)&&(r=!0);a.wa=s}}r&&Yo(t)}function Ry(n,e,t){const r=$(n),s=r.queries.get(e);if(s)for(const i of s.Sa)i.onError(t);r.queries.delete(e)}function Yo(n){n.Ca.forEach(e=>{e.next()})}var go,Al;(Al=go||(go={})).Ma="default",Al.Cache="cache";class Ad{constructor(e,t,r){this.query=e,this.xa=t,this.Oa=!1,this.Na=null,this.onlineState="Unknown",this.options=r||{}}Fa(e){if(!this.options.includeMetadataChanges){const r=[];for(const s of e.docChanges)s.type!==3&&r.push(s);e=new An(e.query,e.docs,e.oldDocs,r,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let t=!1;return this.Oa?this.Ba(e)&&(this.xa.next(e),t=!0):this.La(e,this.onlineState)&&(this.ka(e),t=!0),this.Na=e,t}onError(e){this.xa.error(e)}va(e){this.onlineState=e;let t=!1;return this.Na&&!this.Oa&&this.La(this.Na,e)&&(this.ka(this.Na),t=!0),t}La(e,t){if(!e.fromCache||!this.Da())return!0;const r=t!=="Offline";return(!this.options.qa||!r)&&(!e.docs.isEmpty()||e.hasCachedResults||t==="Offline")}Ba(e){if(e.docChanges.length>0)return!0;const t=this.Na&&this.Na.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!t)&&this.options.includeMetadataChanges===!0}ka(e){e=An.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.Oa=!0,this.xa.next(e)}Da(){return this.options.source!==go.Cache}}/**
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
 */class xd{constructor(e){this.key=e}}class Sd{constructor(e){this.key=e}}class Cy{constructor(e,t){this.query=e,this.Ya=t,this.Za=null,this.hasCachedResults=!1,this.current=!1,this.Xa=G(),this.mutatedKeys=G(),this.eu=zu(e),this.tu=new mn(this.eu)}get nu(){return this.Ya}ru(e,t){const r=t?t.iu:new Tl,s=t?t.tu:this.tu;let i=t?t.mutatedKeys:this.mutatedKeys,a=s,u=!1;const d=this.query.limitType==="F"&&s.size===this.query.limit?s.last():null,f=this.query.limitType==="L"&&s.size===this.query.limit?s.first():null;if(e.inorderTraversal((c,w)=>{const _=s.get(c),x=Gs(this.query,w)?w:null,C=!!_&&this.mutatedKeys.has(_.key),D=!!x&&(x.hasLocalMutations||this.mutatedKeys.has(x.key)&&x.hasCommittedMutations);let P=!1;_&&x?_.data.isEqual(x.data)?C!==D&&(r.track({type:3,doc:x}),P=!0):this.su(_,x)||(r.track({type:2,doc:x}),P=!0,(d&&this.eu(x,d)>0||f&&this.eu(x,f)<0)&&(u=!0)):!_&&x?(r.track({type:0,doc:x}),P=!0):_&&!x&&(r.track({type:1,doc:_}),P=!0,(d||f)&&(u=!0)),P&&(x?(a=a.add(x),i=D?i.add(c):i.delete(c)):(a=a.delete(c),i=i.delete(c)))}),this.query.limit!==null)for(;a.size>this.query.limit;){const c=this.query.limitType==="F"?a.last():a.first();a=a.delete(c.key),i=i.delete(c.key),r.track({type:1,doc:c})}return{tu:a,iu:r,Cs:u,mutatedKeys:i}}su(e,t){return e.hasLocalMutations&&t.hasCommittedMutations&&!t.hasLocalMutations}applyChanges(e,t,r,s){const i=this.tu;this.tu=e.tu,this.mutatedKeys=e.mutatedKeys;const a=e.iu.ya();a.sort((c,w)=>function(x,C){const D=P=>{switch(P){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return L(20277,{Rt:P})}};return D(x)-D(C)}(c.type,w.type)||this.eu(c.doc,w.doc)),this.ou(r),s=s??!1;const u=t&&!s?this._u():[],d=this.Xa.size===0&&this.current&&!s?1:0,f=d!==this.Za;return this.Za=d,a.length!==0||f?{snapshot:new An(this.query,e.tu,i,a,e.mutatedKeys,d===0,f,!1,!!r&&r.resumeToken.approximateByteSize()>0),au:u}:{au:u}}va(e){return this.current&&e==="Offline"?(this.current=!1,this.applyChanges({tu:this.tu,iu:new Tl,mutatedKeys:this.mutatedKeys,Cs:!1},!1)):{au:[]}}uu(e){return!this.Ya.has(e)&&!!this.tu.has(e)&&!this.tu.get(e).hasLocalMutations}ou(e){e&&(e.addedDocuments.forEach(t=>this.Ya=this.Ya.add(t)),e.modifiedDocuments.forEach(t=>{}),e.removedDocuments.forEach(t=>this.Ya=this.Ya.delete(t)),this.current=e.current)}_u(){if(!this.current)return[];const e=this.Xa;this.Xa=G(),this.tu.forEach(r=>{this.uu(r.key)&&(this.Xa=this.Xa.add(r.key))});const t=[];return e.forEach(r=>{this.Xa.has(r)||t.push(new Sd(r))}),this.Xa.forEach(r=>{e.has(r)||t.push(new xd(r))}),t}cu(e){this.Ya=e.Qs,this.Xa=G();const t=this.ru(e.documents);return this.applyChanges(t,!0)}lu(){return An.fromInitialDocuments(this.query,this.tu,this.mutatedKeys,this.Za===0,this.hasCachedResults)}}const Zo="SyncEngine";class Py{constructor(e,t,r){this.query=e,this.targetId=t,this.view=r}}class ky{constructor(e){this.key=e,this.hu=!1}}class Dy{constructor(e,t,r,s,i,a){this.localStore=e,this.remoteStore=t,this.eventManager=r,this.sharedClientState=s,this.currentUser=i,this.maxConcurrentLimboResolutions=a,this.Pu={},this.Tu=new nn(u=>ju(u),Hs),this.Iu=new Map,this.Eu=new Set,this.du=new te(O.comparator),this.Au=new Map,this.Ru=new qo,this.Vu={},this.mu=new Map,this.fu=In.cr(),this.onlineState="Unknown",this.gu=void 0}get isPrimaryClient(){return this.gu===!0}}async function Vy(n,e,t=!0){const r=Vd(n);let s;const i=r.Tu.get(e);return i?(r.sharedClientState.addLocalQueryTarget(i.targetId),s=i.view.lu()):s=await Rd(r,e,t,!0),s}async function Ny(n,e){const t=Vd(n);await Rd(t,e,!0,!1)}async function Rd(n,e,t,r){const s=await ey(n.localStore,Ke(e)),i=s.targetId,a=n.sharedClientState.addLocalQueryTarget(i,t);let u;return r&&(u=await Oy(n,e,i,a==="current",s.resumeToken)),n.isPrimaryClient&&t&&yd(n.remoteStore,s),u}async function Oy(n,e,t,r,s){n.pu=(w,_,x)=>async function(D,P,M,F){let j=P.view.ru(M);j.Cs&&(j=await yl(D.localStore,P.query,!1).then(({documents:g})=>P.view.ru(g,j)));const ee=F&&F.targetChanges.get(P.targetId),me=F&&F.targetMismatches.get(P.targetId)!=null,ue=P.view.applyChanges(j,D.isPrimaryClient,ee,me);return Sl(D,P.targetId,ue.au),ue.snapshot}(n,w,_,x);const i=await yl(n.localStore,e,!0),a=new Cy(e,i.Qs),u=a.ru(i.documents),d=xr.createSynthesizedTargetChangeForCurrentChange(t,r&&n.onlineState!=="Offline",s),f=a.applyChanges(u,n.isPrimaryClient,d);Sl(n,t,f.au);const c=new Py(e,t,a);return n.Tu.set(e,c),n.Iu.has(t)?n.Iu.get(t).push(e):n.Iu.set(t,[e]),f.snapshot}async function My(n,e,t){const r=$(n),s=r.Tu.get(e),i=r.Iu.get(s.targetId);if(i.length>1)return r.Iu.set(s.targetId,i.filter(a=>!Hs(a,e))),void r.Tu.delete(e);r.isPrimaryClient?(r.sharedClientState.removeLocalQueryTarget(s.targetId),r.sharedClientState.isActiveQueryTarget(s.targetId)||await po(r.localStore,s.targetId,!1).then(()=>{r.sharedClientState.clearQueryState(s.targetId),t&&Go(r.remoteStore,s.targetId),yo(r,s.targetId)}).catch(Pn)):(yo(r,s.targetId),await po(r.localStore,s.targetId,!0))}async function Ly(n,e){const t=$(n),r=t.Tu.get(e),s=t.Iu.get(r.targetId);t.isPrimaryClient&&s.length===1&&(t.sharedClientState.removeLocalQueryTarget(r.targetId),Go(t.remoteStore,r.targetId))}async function Fy(n,e,t){const r=Hy(n);try{const s=await function(a,u){const d=$(a),f=Z.now(),c=u.reduce((x,C)=>x.add(C.key),G());let w,_;return d.persistence.runTransaction("Locally write mutations","readwrite",x=>{let C=ut(),D=G();return d.Ns.getEntries(x,c).next(P=>{C=P,C.forEach((M,F)=>{F.isValidDocument()||(D=D.add(M))})}).next(()=>d.localDocuments.getOverlayedDocuments(x,C)).next(P=>{w=P;const M=[];for(const F of u){const j=Zm(F,w.get(F.key).overlayedDocument);j!=null&&M.push(new Ft(F.key,j,Ou(j.value.mapValue),ke.exists(!0)))}return d.mutationQueue.addMutationBatch(x,f,M,u)}).next(P=>{_=P;const M=P.applyToLocalDocumentSet(w,D);return d.documentOverlayCache.saveOverlays(x,P.batchId,M)})}).then(()=>({batchId:_.batchId,changes:Gu(w)}))}(r.localStore,e);r.sharedClientState.addPendingMutation(s.batchId),function(a,u,d){let f=a.Vu[a.currentUser.toKey()];f||(f=new te(H)),f=f.insert(u,d),a.Vu[a.currentUser.toKey()]=f}(r,s.batchId,t),await Rr(r,s.changes),await Zs(r.remoteStore)}catch(s){const i=Jo(s,"Failed to persist write");t.reject(i)}}async function Cd(n,e){const t=$(n);try{const r=await Jg(t.localStore,e);e.targetChanges.forEach((s,i)=>{const a=t.Au.get(i);a&&(Q(s.addedDocuments.size+s.modifiedDocuments.size+s.removedDocuments.size<=1,22616),s.addedDocuments.size>0?a.hu=!0:s.modifiedDocuments.size>0?Q(a.hu,14607):s.removedDocuments.size>0&&(Q(a.hu,42227),a.hu=!1))}),await Rr(t,r,e)}catch(r){await Pn(r)}}function xl(n,e,t){const r=$(n);if(r.isPrimaryClient&&t===0||!r.isPrimaryClient&&t===1){const s=[];r.Tu.forEach((i,a)=>{const u=a.view.va(e);u.snapshot&&s.push(u.snapshot)}),function(a,u){const d=$(a);d.onlineState=u;let f=!1;d.queries.forEach((c,w)=>{for(const _ of w.Sa)_.va(u)&&(f=!0)}),f&&Yo(d)}(r.eventManager,e),s.length&&r.Pu.H_(s),r.onlineState=e,r.isPrimaryClient&&r.sharedClientState.setOnlineState(e)}}async function Uy(n,e,t){const r=$(n);r.sharedClientState.updateQueryState(e,"rejected",t);const s=r.Au.get(e),i=s&&s.key;if(i){let a=new te(O.comparator);a=a.insert(i,Se.newNoDocument(i,B.min()));const u=G().add(i),d=new Xs(B.min(),new Map,new te(H),a,u);await Cd(r,d),r.du=r.du.remove(i),r.Au.delete(e),ea(r)}else await po(r.localStore,e,!1).then(()=>yo(r,e,t)).catch(Pn)}async function By(n,e){const t=$(n),r=e.batch.batchId;try{const s=await Xg(t.localStore,e);kd(t,r,null),Pd(t,r),t.sharedClientState.updateMutationState(r,"acknowledged"),await Rr(t,s)}catch(s){await Pn(s)}}async function $y(n,e,t){const r=$(n);try{const s=await function(a,u){const d=$(a);return d.persistence.runTransaction("Reject batch","readwrite-primary",f=>{let c;return d.mutationQueue.lookupMutationBatch(f,u).next(w=>(Q(w!==null,37113),c=w.keys(),d.mutationQueue.removeMutationBatch(f,w))).next(()=>d.mutationQueue.performConsistencyCheck(f)).next(()=>d.documentOverlayCache.removeOverlaysForBatchId(f,c,u)).next(()=>d.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(f,c)).next(()=>d.localDocuments.getDocuments(f,c))})}(r.localStore,e);kd(r,e,t),Pd(r,e),r.sharedClientState.updateMutationState(e,"rejected",t),await Rr(r,s)}catch(s){await Pn(s)}}function Pd(n,e){(n.mu.get(e)||[]).forEach(t=>{t.resolve()}),n.mu.delete(e)}function kd(n,e,t){const r=$(n);let s=r.Vu[r.currentUser.toKey()];if(s){const i=s.get(e);i&&(t?i.reject(t):i.resolve(),s=s.remove(e)),r.Vu[r.currentUser.toKey()]=s}}function yo(n,e,t=null){n.sharedClientState.removeLocalQueryTarget(e);for(const r of n.Iu.get(e))n.Tu.delete(r),t&&n.Pu.yu(r,t);n.Iu.delete(e),n.isPrimaryClient&&n.Ru.jr(e).forEach(r=>{n.Ru.containsKey(r)||Dd(n,r)})}function Dd(n,e){n.Eu.delete(e.path.canonicalString());const t=n.du.get(e);t!==null&&(Go(n.remoteStore,t),n.du=n.du.remove(e),n.Au.delete(t),ea(n))}function Sl(n,e,t){for(const r of t)r instanceof xd?(n.Ru.addReference(r.key,e),qy(n,r)):r instanceof Sd?(N(Zo,"Document no longer in limbo: "+r.key),n.Ru.removeReference(r.key,e),n.Ru.containsKey(r.key)||Dd(n,r.key)):L(19791,{wu:r})}function qy(n,e){const t=e.key,r=t.path.canonicalString();n.du.get(t)||n.Eu.has(r)||(N(Zo,"New document in limbo: "+t),n.Eu.add(r),ea(n))}function ea(n){for(;n.Eu.size>0&&n.du.size<n.maxConcurrentLimboResolutions;){const e=n.Eu.values().next().value;n.Eu.delete(e);const t=new O(J.fromString(e)),r=n.fu.next();n.Au.set(r,new ky(t)),n.du=n.du.insert(t,r),yd(n.remoteStore,new Et(Ke(Lo(t.path)),r,"TargetPurposeLimboResolution",qs.ce))}}async function Rr(n,e,t){const r=$(n),s=[],i=[],a=[];r.Tu.isEmpty()||(r.Tu.forEach((u,d)=>{a.push(r.pu(d,e,t).then(f=>{if((f||t)&&r.isPrimaryClient){const c=f?!f.fromCache:t?.targetChanges.get(d.targetId)?.current;r.sharedClientState.updateQueryState(d.targetId,c?"current":"not-current")}if(f){s.push(f);const c=zo.As(d.targetId,f);i.push(c)}}))}),await Promise.all(a),r.Pu.H_(s),await async function(d,f){const c=$(d);try{await c.persistence.runTransaction("notifyLocalViewChanges","readwrite",w=>R.forEach(f,_=>R.forEach(_.Es,x=>c.persistence.referenceDelegate.addReference(w,_.targetId,x)).next(()=>R.forEach(_.ds,x=>c.persistence.referenceDelegate.removeReference(w,_.targetId,x)))))}catch(w){if(!kn(w))throw w;N(Ho,"Failed to update sequence numbers: "+w)}for(const w of f){const _=w.targetId;if(!w.fromCache){const x=c.Ms.get(_),C=x.snapshotVersion,D=x.withLastLimboFreeSnapshotVersion(C);c.Ms=c.Ms.insert(_,D)}}}(r.localStore,i))}async function jy(n,e){const t=$(n);if(!t.currentUser.isEqual(e)){N(Zo,"User change. New user:",e.toKey());const r=await fd(t.localStore,e);t.currentUser=e,function(i,a){i.mu.forEach(u=>{u.forEach(d=>{d.reject(new V(S.CANCELLED,a))})}),i.mu.clear()}(t,"'waitForPendingWrites' promise is rejected due to a user change."),t.sharedClientState.handleUserChange(e,r.removedBatchIds,r.addedBatchIds),await Rr(t,r.Ls)}}function zy(n,e){const t=$(n),r=t.Au.get(e);if(r&&r.hu)return G().add(r.key);{let s=G();const i=t.Iu.get(e);if(!i)return s;for(const a of i){const u=t.Tu.get(a);s=s.unionWith(u.view.nu)}return s}}function Vd(n){const e=$(n);return e.remoteStore.remoteSyncer.applyRemoteEvent=Cd.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=zy.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=Uy.bind(null,e),e.Pu.H_=Sy.bind(null,e.eventManager),e.Pu.yu=Ry.bind(null,e.eventManager),e}function Hy(n){const e=$(n);return e.remoteStore.remoteSyncer.applySuccessfulWrite=By.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=$y.bind(null,e),e}class ks{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(e){this.serializer=Js(e.databaseInfo.databaseId),this.sharedClientState=this.Du(e),this.persistence=this.Cu(e),await this.persistence.start(),this.localStore=this.vu(e),this.gcScheduler=this.Fu(e,this.localStore),this.indexBackfillerScheduler=this.Mu(e,this.localStore)}Fu(e,t){return null}Mu(e,t){return null}vu(e){return Qg(this.persistence,new Gg,e.initialUser,this.serializer)}Cu(e){return new hd(jo.mi,this.serializer)}Du(e){return new ny}async terminate(){this.gcScheduler?.stop(),this.indexBackfillerScheduler?.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}ks.provider={build:()=>new ks};class Gy extends ks{constructor(e){super(),this.cacheSizeBytes=e}Fu(e,t){Q(this.persistence.referenceDelegate instanceof Cs,46915);const r=this.persistence.referenceDelegate.garbageCollector;return new kg(r,e.asyncQueue,t)}Cu(e){const t=this.cacheSizeBytes!==void 0?Ve.withCacheSize(this.cacheSizeBytes):Ve.DEFAULT;return new hd(r=>Cs.mi(r,t),this.serializer)}}class _o{async initialize(e,t){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(t),this.remoteStore=this.createRemoteStore(t),this.eventManager=this.createEventManager(t),this.syncEngine=this.createSyncEngine(t,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=r=>xl(this.syncEngine,r,1),this.remoteStore.remoteSyncer.handleCredentialChange=jy.bind(null,this.syncEngine),await Iy(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return function(){return new xy}()}createDatastore(e){const t=Js(e.databaseInfo.databaseId),r=function(i){return new ay(i)}(e.databaseInfo);return function(i,a,u,d){return new dy(i,a,u,d)}(e.authCredentials,e.appCheckCredentials,r,t)}createRemoteStore(e){return function(r,s,i,a,u){return new fy(r,s,i,a,u)}(this.localStore,this.datastore,e.asyncQueue,t=>xl(this.syncEngine,t,0),function(){return vl.v()?new vl:new ry}())}createSyncEngine(e,t){return function(s,i,a,u,d,f,c){const w=new Dy(s,i,a,u,d,f);return c&&(w.gu=!0),w}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,t)}async terminate(){await async function(t){const r=$(t);N(Zt,"RemoteStore shutting down."),r.Ea.add(5),await Sr(r),r.Aa.shutdown(),r.Ra.set("Unknown")}(this.remoteStore),this.datastore?.terminate(),this.eventManager?.terminate()}}_o.provider={build:()=>new _o};/**
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
 */class Nd{constructor(e){this.observer=e,this.muted=!1}next(e){this.muted||this.observer.next&&this.Ou(this.observer.next,e)}error(e){this.muted||(this.observer.error?this.Ou(this.observer.error,e):lt("Uncaught Error in snapshot listener:",e.toString()))}Nu(){this.muted=!0}Ou(e,t){setTimeout(()=>{this.muted||e(t)},0)}}/**
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
 */const Ot="FirestoreClient";class Wy{constructor(e,t,r,s,i){this.authCredentials=e,this.appCheckCredentials=t,this.asyncQueue=r,this.databaseInfo=s,this.user=xe.UNAUTHENTICATED,this.clientId=ko.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=i,this.authCredentials.start(r,async a=>{N(Ot,"Received user=",a.uid),await this.authCredentialListener(a),this.user=a}),this.appCheckCredentials.start(r,a=>(N(Ot,"Received new app check token=",a),this.appCheckCredentialListener(a,this.user)))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}terminate(){this.asyncQueue.enterRestrictedMode();const e=new St;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(t){const r=Jo(t,"Failed to shutdown persistence");e.reject(r)}}),e.promise}}async function zi(n,e){n.asyncQueue.verifyOperationInProgress(),N(Ot,"Initializing OfflineComponentProvider");const t=n.configuration;await e.initialize(t);let r=t.initialUser;n.setCredentialChangeListener(async s=>{r.isEqual(s)||(await fd(e.localStore,s),r=s)}),e.persistence.setDatabaseDeletedListener(()=>n.terminate()),n._offlineComponents=e}async function Rl(n,e){n.asyncQueue.verifyOperationInProgress();const t=await Ky(n);N(Ot,"Initializing OnlineComponentProvider"),await e.initialize(t,n.configuration),n.setCredentialChangeListener(r=>El(e.remoteStore,r)),n.setAppCheckTokenChangeListener((r,s)=>El(e.remoteStore,s)),n._onlineComponents=e}async function Ky(n){if(!n._offlineComponents)if(n._uninitializedComponentsProvider){N(Ot,"Using user provided OfflineComponentProvider");try{await zi(n,n._uninitializedComponentsProvider._offline)}catch(e){const t=e;if(!function(s){return s.name==="FirebaseError"?s.code===S.FAILED_PRECONDITION||s.code===S.UNIMPLEMENTED:!(typeof DOMException<"u"&&s instanceof DOMException)||s.code===22||s.code===20||s.code===11}(t))throw t;vn("Error using user provided cache. Falling back to memory cache: "+t),await zi(n,new ks)}}else N(Ot,"Using default OfflineComponentProvider"),await zi(n,new Gy(void 0));return n._offlineComponents}async function Od(n){return n._onlineComponents||(n._uninitializedComponentsProvider?(N(Ot,"Using user provided OnlineComponentProvider"),await Rl(n,n._uninitializedComponentsProvider._online)):(N(Ot,"Using default OnlineComponentProvider"),await Rl(n,new _o))),n._onlineComponents}function Qy(n){return Od(n).then(e=>e.syncEngine)}async function wo(n){const e=await Od(n),t=e.eventManager;return t.onListen=Vy.bind(null,e.syncEngine),t.onUnlisten=My.bind(null,e.syncEngine),t.onFirstRemoteStoreListen=Ny.bind(null,e.syncEngine),t.onLastRemoteStoreUnlisten=Ly.bind(null,e.syncEngine),t}function Xy(n,e,t={}){const r=new St;return n.asyncQueue.enqueueAndForget(async()=>function(i,a,u,d,f){const c=new Nd({next:_=>{c.Nu(),a.enqueueAndForget(()=>Id(i,w)),_.fromCache&&d.source==="server"?f.reject(new V(S.UNAVAILABLE,'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')):f.resolve(_)},error:_=>f.reject(_)}),w=new Ad(u,c,{includeMetadataChanges:!0,qa:!0});return Td(i,w)}(await wo(n),n.asyncQueue,e,t,r)),r.promise}/**
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
 */function Md(n){const e={};return n.timeoutSeconds!==void 0&&(e.timeoutSeconds=n.timeoutSeconds),e}/**
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
 */const Cl=new Map;/**
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
 */const Ld="firestore.googleapis.com",Pl=!0;class kl{constructor(e){if(e.host===void 0){if(e.ssl!==void 0)throw new V(S.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=Ld,this.ssl=Pl}else this.host=e.host,this.ssl=e.ssl??Pl;if(this.isUsingEmulator=e.emulatorOptions!==void 0,this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=dd;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<Cg)throw new V(S.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}hm("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=Md(e.experimentalLongPollingOptions??{}),function(r){if(r.timeoutSeconds!==void 0){if(isNaN(r.timeoutSeconds))throw new V(S.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (must not be NaN)`);if(r.timeoutSeconds<5)throw new V(S.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (minimum allowed value is 5)`);if(r.timeoutSeconds>30)throw new V(S.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&function(r,s){return r.timeoutSeconds===s.timeoutSeconds}(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class ei{constructor(e,t,r,s){this._authCredentials=e,this._appCheckCredentials=t,this._databaseId=r,this._app=s,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new kl({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new V(S.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new V(S.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new kl(e),this._emulatorOptions=e.emulatorOptions||{},e.credentials!==void 0&&(this._authCredentials=function(r){if(!r)return new nm;switch(r.type){case"firstParty":return new om(r.sessionIndex||"0",r.iamToken||null,r.authTokenFactory||null);case"provider":return r.client;default:throw new V(S.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(t){const r=Cl.get(t);r&&(N("ComponentProvider","Removing Datastore"),Cl.delete(t),r.terminate())}(this),Promise.resolve()}}function Jy(n,e,t,r={}){n=Le(n,ei);const s=Sn(e),i=n._getSettings(),a={...i,emulatorOptions:n._getEmulatorOptions()},u=`${e}:${t}`;s&&(cu(`https://${u}`),lu("Firestore",!0)),i.host!==Ld&&i.host!==u&&vn("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used.");const d={...i,host:u,ssl:s,emulatorOptions:r};if(!Xt(d,a)&&(n._setSettings(d),r.mockUserToken)){let f,c;if(typeof r.mockUserToken=="string")f=r.mockUserToken,c=xe.MOCK_USER;else{f=Cf(r.mockUserToken,n._app?.options.projectId);const w=r.mockUserToken.sub||r.mockUserToken.user_id;if(!w)throw new V(S.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");c=new xe(w)}n._authCredentials=new rm(new Tu(f,c))}}/**
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
 */class sn{constructor(e,t,r){this.converter=t,this._query=r,this.type="query",this.firestore=e}withConverter(e){return new sn(this.firestore,e,this._query)}}class ie{constructor(e,t,r){this.converter=t,this._key=r,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new Rt(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new ie(this.firestore,e,this._key)}toJSON(){return{type:ie._jsonSchemaVersion,referencePath:this._key.toString()}}static fromJSON(e,t,r){if(Tr(t,ie._jsonSchema))return new ie(e,r||null,new O(J.fromString(t.referencePath)))}}ie._jsonSchemaVersion="firestore/documentReference/1.0",ie._jsonSchema={type:ce("string",ie._jsonSchemaVersion),referencePath:ce("string")};class Rt extends sn{constructor(e,t,r){super(e,t,Lo(r)),this._path=r,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new ie(this.firestore,null,new O(e))}withConverter(e){return new Rt(this.firestore,e,this._path)}}function fe(n,e,...t){if(n=he(n),Iu("collection","path",e),n instanceof ei){const r=J.fromString(e,...t);return zc(r),new Rt(n,null,r)}{if(!(n instanceof ie||n instanceof Rt))throw new V(S.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(J.fromString(e,...t));return zc(r),new Rt(n.firestore,null,r)}}function nt(n,e,...t){if(n=he(n),arguments.length===1&&(e=ko.newId()),Iu("doc","path",e),n instanceof ei){const r=J.fromString(e,...t);return jc(r),new ie(n,null,new O(r))}{if(!(n instanceof ie||n instanceof Rt))throw new V(S.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(J.fromString(e,...t));return jc(r),new ie(n.firestore,n instanceof Rt?n.converter:null,new O(r))}}/**
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
 */const Dl="AsyncQueue";class Vl{constructor(e=Promise.resolve()){this.Xu=[],this.ec=!1,this.tc=[],this.nc=null,this.rc=!1,this.sc=!1,this.oc=[],this.M_=new md(this,"async_queue_retry"),this._c=()=>{const r=ji();r&&N(Dl,"Visibility state changed to "+r.visibilityState),this.M_.w_()},this.ac=e;const t=ji();t&&typeof t.addEventListener=="function"&&t.addEventListener("visibilitychange",this._c)}get isShuttingDown(){return this.ec}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.uc(),this.cc(e)}enterRestrictedMode(e){if(!this.ec){this.ec=!0,this.sc=e||!1;const t=ji();t&&typeof t.removeEventListener=="function"&&t.removeEventListener("visibilitychange",this._c)}}enqueue(e){if(this.uc(),this.ec)return new Promise(()=>{});const t=new St;return this.cc(()=>this.ec&&this.sc?Promise.resolve():(e().then(t.resolve,t.reject),t.promise)).then(()=>t.promise)}enqueueRetryable(e){this.enqueueAndForget(()=>(this.Xu.push(e),this.lc()))}async lc(){if(this.Xu.length!==0){try{await this.Xu[0](),this.Xu.shift(),this.M_.reset()}catch(e){if(!kn(e))throw e;N(Dl,"Operation failed with retryable error: "+e)}this.Xu.length>0&&this.M_.p_(()=>this.lc())}}cc(e){const t=this.ac.then(()=>(this.rc=!0,e().catch(r=>{throw this.nc=r,this.rc=!1,lt("INTERNAL UNHANDLED ERROR: ",Nl(r)),r}).then(r=>(this.rc=!1,r))));return this.ac=t,t}enqueueAfterDelay(e,t,r){this.uc(),this.oc.indexOf(e)>-1&&(t=0);const s=Xo.createAndSchedule(this,e,t,r,i=>this.hc(i));return this.tc.push(s),s}uc(){this.nc&&L(47125,{Pc:Nl(this.nc)})}verifyOperationInProgress(){}async Tc(){let e;do e=this.ac,await e;while(e!==this.ac)}Ic(e){for(const t of this.tc)if(t.timerId===e)return!0;return!1}Ec(e){return this.Tc().then(()=>{this.tc.sort((t,r)=>t.targetTimeMs-r.targetTimeMs);for(const t of this.tc)if(t.skipDelay(),e!=="all"&&t.timerId===e)break;return this.Tc()})}dc(e){this.oc.push(e)}hc(e){const t=this.tc.indexOf(e);this.tc.splice(t,1)}}function Nl(n){let e=n.message||"";return n.stack&&(e=n.stack.includes(n.message)?n.stack:n.message+`
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
 */function Ol(n){return function(t,r){if(typeof t!="object"||t===null)return!1;const s=t;for(const i of r)if(i in s&&typeof s[i]=="function")return!0;return!1}(n,["next","error","complete"])}class dt extends ei{constructor(e,t,r,s){super(e,t,r,s),this.type="firestore",this._queue=new Vl,this._persistenceKey=s?.name||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new Vl(e),this._firestoreClient=void 0,await e}}}function ti(n,e){const t=typeof n=="object"?n:fu(),r=typeof n=="string"?n:Ts,s=Co(t,"firestore").getImmediate({identifier:r});if(!s._initialized){const i=Sf("firestore");i&&Jy(s,...i)}return s}function ni(n){if(n._terminated)throw new V(S.FAILED_PRECONDITION,"The client has already been terminated.");return n._firestoreClient||Yy(n),n._firestoreClient}function Yy(n){const e=n._freezeSettings(),t=function(s,i,a,u){return new Tm(s,i,a,u.host,u.ssl,u.experimentalForceLongPolling,u.experimentalAutoDetectLongPolling,Md(u.experimentalLongPollingOptions),u.useFetchStreams,u.isUsingEmulator)}(n._databaseId,n._app?.options.appId||"",n._persistenceKey,e);n._componentsProvider||e.localCache?._offlineComponentProvider&&e.localCache?._onlineComponentProvider&&(n._componentsProvider={_offline:e.localCache._offlineComponentProvider,_online:e.localCache._onlineComponentProvider}),n._firestoreClient=new Wy(n._authCredentials,n._appCheckCredentials,n._queue,t,n._componentsProvider&&function(s){const i=s?._online.build();return{_offline:s?._offline.build(i),_online:i}}(n._componentsProvider))}/**
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
 */class Ue{constructor(e){this._byteString=e}static fromBase64String(e){try{return new Ue(ve.fromBase64String(e))}catch(t){throw new V(S.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+t)}}static fromUint8Array(e){return new Ue(ve.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}toJSON(){return{type:Ue._jsonSchemaVersion,bytes:this.toBase64()}}static fromJSON(e){if(Tr(e,Ue._jsonSchema))return Ue.fromBase64String(e.bytes)}}Ue._jsonSchemaVersion="firestore/bytes/1.0",Ue._jsonSchema={type:ce("string",Ue._jsonSchemaVersion),bytes:ce("string")};/**
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
 */class Cr{constructor(...e){for(let t=0;t<e.length;++t)if(e[t].length===0)throw new V(S.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new we(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}/**
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
 */class ri{constructor(e){this._methodName=e}}/**
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
 */class Xe{constructor(e,t){if(!isFinite(e)||e<-90||e>90)throw new V(S.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(t)||t<-180||t>180)throw new V(S.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+t);this._lat=e,this._long=t}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}_compareTo(e){return H(this._lat,e._lat)||H(this._long,e._long)}toJSON(){return{latitude:this._lat,longitude:this._long,type:Xe._jsonSchemaVersion}}static fromJSON(e){if(Tr(e,Xe._jsonSchema))return new Xe(e.latitude,e.longitude)}}Xe._jsonSchemaVersion="firestore/geoPoint/1.0",Xe._jsonSchema={type:ce("string",Xe._jsonSchemaVersion),latitude:ce("number"),longitude:ce("number")};/**
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
 */class Je{constructor(e){this._values=(e||[]).map(t=>t)}toArray(){return this._values.map(e=>e)}isEqual(e){return function(r,s){if(r.length!==s.length)return!1;for(let i=0;i<r.length;++i)if(r[i]!==s[i])return!1;return!0}(this._values,e._values)}toJSON(){return{type:Je._jsonSchemaVersion,vectorValues:this._values}}static fromJSON(e){if(Tr(e,Je._jsonSchema)){if(Array.isArray(e.vectorValues)&&e.vectorValues.every(t=>typeof t=="number"))return new Je(e.vectorValues);throw new V(S.INVALID_ARGUMENT,"Expected 'vectorValues' field to be a number array")}}}Je._jsonSchemaVersion="firestore/vectorValue/1.0",Je._jsonSchema={type:ce("string",Je._jsonSchemaVersion),vectorValues:ce("object")};/**
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
 */const Zy=/^__.*__$/;class e_{constructor(e,t,r){this.data=e,this.fieldMask=t,this.fieldTransforms=r}toMutation(e,t){return this.fieldMask!==null?new Ft(e,this.data,this.fieldMask,t,this.fieldTransforms):new Ar(e,this.data,t,this.fieldTransforms)}}class Fd{constructor(e,t,r){this.data=e,this.fieldMask=t,this.fieldTransforms=r}toMutation(e,t){return new Ft(e,this.data,this.fieldMask,t,this.fieldTransforms)}}function Ud(n){switch(n){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw L(40011,{Ac:n})}}class ta{constructor(e,t,r,s,i,a){this.settings=e,this.databaseId=t,this.serializer=r,this.ignoreUndefinedProperties=s,i===void 0&&this.Rc(),this.fieldTransforms=i||[],this.fieldMask=a||[]}get path(){return this.settings.path}get Ac(){return this.settings.Ac}Vc(e){return new ta({...this.settings,...e},this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}mc(e){const t=this.path?.child(e),r=this.Vc({path:t,fc:!1});return r.gc(e),r}yc(e){const t=this.path?.child(e),r=this.Vc({path:t,fc:!1});return r.Rc(),r}wc(e){return this.Vc({path:void 0,fc:!0})}Sc(e){return Ds(e,this.settings.methodName,this.settings.bc||!1,this.path,this.settings.Dc)}contains(e){return this.fieldMask.find(t=>e.isPrefixOf(t))!==void 0||this.fieldTransforms.find(t=>e.isPrefixOf(t.field))!==void 0}Rc(){if(this.path)for(let e=0;e<this.path.length;e++)this.gc(this.path.get(e))}gc(e){if(e.length===0)throw this.Sc("Document fields must not be empty");if(Ud(this.Ac)&&Zy.test(e))throw this.Sc('Document fields cannot begin and end with "__"')}}class t_{constructor(e,t,r){this.databaseId=e,this.ignoreUndefinedProperties=t,this.serializer=r||Js(e)}Cc(e,t,r,s=!1){return new ta({Ac:e,methodName:t,Dc:r,path:we.emptyPath(),fc:!1,bc:s},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function Pr(n){const e=n._freezeSettings(),t=Js(n._databaseId);return new t_(n._databaseId,!!e.ignoreUndefinedProperties,t)}function na(n,e,t,r,s,i={}){const a=n.Cc(i.merge||i.mergeFields?2:0,e,t,s);sa("Data must be an object, but it was:",a,r);const u=qd(r,a);let d,f;if(i.merge)d=new Me(a.fieldMask),f=a.fieldTransforms;else if(i.mergeFields){const c=[];for(const w of i.mergeFields){const _=vo(e,w,t);if(!a.contains(_))throw new V(S.INVALID_ARGUMENT,`Field '${_}' is specified in your field mask but missing from your input data.`);zd(c,_)||c.push(_)}d=new Me(c),f=a.fieldTransforms.filter(w=>d.covers(w.field))}else d=null,f=a.fieldTransforms;return new e_(new Ne(u),d,f)}class si extends ri{_toFieldTransform(e){if(e.Ac!==2)throw e.Ac===1?e.Sc(`${this._methodName}() can only appear at the top level of your update data`):e.Sc(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return e.fieldMask.push(e.path),null}isEqual(e){return e instanceof si}}class ra extends ri{_toFieldTransform(e){return new Qm(e.path,new pr)}isEqual(e){return e instanceof ra}}function Bd(n,e,t,r){const s=n.Cc(1,e,t);sa("Data must be an object, but it was:",s,r);const i=[],a=Ne.empty();Lt(r,(d,f)=>{const c=ia(e,d,t);f=he(f);const w=s.yc(c);if(f instanceof si)i.push(c);else{const _=kr(f,w);_!=null&&(i.push(c),a.set(c,_))}});const u=new Me(i);return new Fd(a,u,s.fieldTransforms)}function $d(n,e,t,r,s,i){const a=n.Cc(1,e,t),u=[vo(e,r,t)],d=[s];if(i.length%2!=0)throw new V(S.INVALID_ARGUMENT,`Function ${e}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let _=0;_<i.length;_+=2)u.push(vo(e,i[_])),d.push(i[_+1]);const f=[],c=Ne.empty();for(let _=u.length-1;_>=0;--_)if(!zd(f,u[_])){const x=u[_];let C=d[_];C=he(C);const D=a.yc(x);if(C instanceof si)f.push(x);else{const P=kr(C,D);P!=null&&(f.push(x),c.set(x,P))}}const w=new Me(f);return new Fd(c,w,a.fieldTransforms)}function n_(n,e,t,r=!1){return kr(t,n.Cc(r?4:3,e))}function kr(n,e){if(jd(n=he(n)))return sa("Unsupported field value:",e,n),qd(n,e);if(n instanceof ri)return function(r,s){if(!Ud(s.Ac))throw s.Sc(`${r._methodName}() can only be used with update() and set()`);if(!s.path)throw s.Sc(`${r._methodName}() is not currently supported inside arrays`);const i=r._toFieldTransform(s);i&&s.fieldTransforms.push(i)}(n,e),null;if(n===void 0&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),n instanceof Array){if(e.settings.fc&&e.Ac!==4)throw e.Sc("Nested arrays are not supported");return function(r,s){const i=[];let a=0;for(const u of r){let d=kr(u,s.wc(a));d==null&&(d={nullValue:"NULL_VALUE"}),i.push(d),a++}return{arrayValue:{values:i}}}(n,e)}return function(r,s){if((r=he(r))===null)return{nullValue:"NULL_VALUE"};if(typeof r=="number")return Gm(s.serializer,r);if(typeof r=="boolean")return{booleanValue:r};if(typeof r=="string")return{stringValue:r};if(r instanceof Date){const i=Z.fromDate(r);return{timestampValue:Rs(s.serializer,i)}}if(r instanceof Z){const i=new Z(r.seconds,1e3*Math.floor(r.nanoseconds/1e3));return{timestampValue:Rs(s.serializer,i)}}if(r instanceof Xe)return{geoPointValue:{latitude:r.latitude,longitude:r.longitude}};if(r instanceof Ue)return{bytesValue:sd(s.serializer,r._byteString)};if(r instanceof ie){const i=s.databaseId,a=r.firestore._databaseId;if(!a.isEqual(i))throw s.Sc(`Document reference is for database ${a.projectId}/${a.database} but should be for database ${i.projectId}/${i.database}`);return{referenceValue:$o(r.firestore._databaseId||s.databaseId,r._key.path)}}if(r instanceof Je)return function(a,u){return{mapValue:{fields:{[Vu]:{stringValue:Nu},[Is]:{arrayValue:{values:a.toArray().map(f=>{if(typeof f!="number")throw u.Sc("VectorValues must only contain numeric values.");return Fo(u.serializer,f)})}}}}}}(r,s);throw s.Sc(`Unsupported field value: ${$s(r)}`)}(n,e)}function qd(n,e){const t={};return Su(n)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):Lt(n,(r,s)=>{const i=kr(s,e.mc(r));i!=null&&(t[r]=i)}),{mapValue:{fields:t}}}function jd(n){return!(typeof n!="object"||n===null||n instanceof Array||n instanceof Date||n instanceof Z||n instanceof Xe||n instanceof Ue||n instanceof ie||n instanceof ri||n instanceof Je)}function sa(n,e,t){if(!jd(t)||!Au(t)){const r=$s(t);throw r==="an object"?e.Sc(n+" a custom object"):e.Sc(n+" "+r)}}function vo(n,e,t){if((e=he(e))instanceof Cr)return e._internalPath;if(typeof e=="string")return ia(n,e);throw Ds("Field path arguments must be of type string or ",n,!1,void 0,t)}const r_=new RegExp("[~\\*/\\[\\]]");function ia(n,e,t){if(e.search(r_)>=0)throw Ds(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,n,!1,void 0,t);try{return new Cr(...e.split("."))._internalPath}catch{throw Ds(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,n,!1,void 0,t)}}function Ds(n,e,t,r,s){const i=r&&!r.isEmpty(),a=s!==void 0;let u=`Function ${e}() called with invalid data`;t&&(u+=" (via `toFirestore()`)"),u+=". ";let d="";return(i||a)&&(d+=" (found",i&&(d+=` in field ${r}`),a&&(d+=` in document ${s}`),d+=")"),new V(S.INVALID_ARGUMENT,u+n+d)}function zd(n,e){return n.some(t=>t.isEqual(e))}/**
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
 */class Hd{constructor(e,t,r,s,i){this._firestore=e,this._userDataWriter=t,this._key=r,this._document=s,this._converter=i}get id(){return this._key.path.lastSegment()}get ref(){return new ie(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const e=new s_(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}get(e){if(this._document){const t=this._document.data.field(oa("DocumentSnapshot.get",e));if(t!==null)return this._userDataWriter.convertValue(t)}}}class s_ extends Hd{data(){return super.data()}}function oa(n,e){return typeof e=="string"?ia(n,e):e instanceof Cr?e._internalPath:e._delegate._internalPath}/**
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
 */function Gd(n){if(n.limitType==="L"&&n.explicitOrderBy.length===0)throw new V(S.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class aa{}class i_ extends aa{}function Mt(n,e,...t){let r=[];e instanceof aa&&r.push(e),r=r.concat(t),function(i){const a=i.filter(d=>d instanceof ca).length,u=i.filter(d=>d instanceof ii).length;if(a>1||a>0&&u>0)throw new V(S.INVALID_ARGUMENT,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")}(r);for(const s of r)n=s._apply(n);return n}class ii extends i_{constructor(e,t,r){super(),this._field=e,this._op=t,this._value=r,this.type="where"}static _create(e,t,r){return new ii(e,t,r)}_apply(e){const t=this._parse(e);return Wd(e._query,t),new sn(e.firestore,e.converter,ao(e._query,t))}_parse(e){const t=Pr(e.firestore);return function(i,a,u,d,f,c,w){let _;if(f.isKeyField()){if(c==="array-contains"||c==="array-contains-any")throw new V(S.INVALID_ARGUMENT,`Invalid Query. You can't perform '${c}' queries on documentId().`);if(c==="in"||c==="not-in"){Ll(w,c);const C=[];for(const D of w)C.push(Ml(d,i,D));_={arrayValue:{values:C}}}else _=Ml(d,i,w)}else c!=="in"&&c!=="not-in"&&c!=="array-contains-any"||Ll(w,c),_=n_(u,a,w,c==="in"||c==="not-in");return ae.create(f,c,_)}(e._query,"where",t,e.firestore._databaseId,this._field,this._op,this._value)}}function Fe(n,e,t){const r=e,s=oa("where",n);return ii._create(s,r,t)}class ca extends aa{constructor(e,t){super(),this.type=e,this._queryConstraints=t}static _create(e,t){return new ca(e,t)}_parse(e){const t=this._queryConstraints.map(r=>r._parse(e)).filter(r=>r.getFilters().length>0);return t.length===1?t[0]:He.create(t,this._getOperator())}_apply(e){const t=this._parse(e);return t.getFilters().length===0?e:(function(s,i){let a=s;const u=i.getFlattenedFilters();for(const d of u)Wd(a,d),a=ao(a,d)}(e._query,t),new sn(e.firestore,e.converter,ao(e._query,t)))}_getQueryConstraints(){return this._queryConstraints}_getOperator(){return this.type==="and"?"and":"or"}}function Ml(n,e,t){if(typeof(t=he(t))=="string"){if(t==="")throw new V(S.INVALID_ARGUMENT,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!qu(e)&&t.indexOf("/")!==-1)throw new V(S.INVALID_ARGUMENT,`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${t}' contains a '/' character.`);const r=e.path.child(J.fromString(t));if(!O.isDocumentKey(r))throw new V(S.INVALID_ARGUMENT,`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${r}' is not because it has an odd number of segments (${r.length}).`);return Yc(n,new O(r))}if(t instanceof ie)return Yc(n,t._key);throw new V(S.INVALID_ARGUMENT,`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${$s(t)}.`)}function Ll(n,e){if(!Array.isArray(n)||n.length===0)throw new V(S.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${e.toString()}' filters.`)}function Wd(n,e){const t=function(s,i){for(const a of s)for(const u of a.getFlattenedFilters())if(i.indexOf(u.op)>=0)return u.op;return null}(n.filters,function(s){switch(s){case"!=":return["!=","not-in"];case"array-contains-any":case"in":return["not-in"];case"not-in":return["array-contains-any","in","not-in","!="];default:return[]}}(e.op));if(t!==null)throw t===e.op?new V(S.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${e.op.toString()}' filter.`):new V(S.INVALID_ARGUMENT,`Invalid query. You cannot use '${e.op.toString()}' filters with '${t.toString()}' filters.`)}class o_{convertValue(e,t="none"){switch(Vt(e)){case 0:return null;case 1:return e.booleanValue;case 2:return se(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,t);case 5:return e.stringValue;case 6:return this.convertBytes(Dt(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,t);case 11:return this.convertObject(e.mapValue,t);case 10:return this.convertVectorValue(e.mapValue);default:throw L(62114,{value:e})}}convertObject(e,t){return this.convertObjectMap(e.fields,t)}convertObjectMap(e,t="none"){const r={};return Lt(e,(s,i)=>{r[s]=this.convertValue(i,t)}),r}convertVectorValue(e){const t=e.fields?.[Is].arrayValue?.values?.map(r=>se(r.doubleValue));return new Je(t)}convertGeoPoint(e){return new Xe(se(e.latitude),se(e.longitude))}convertArray(e,t){return(e.values||[]).map(r=>this.convertValue(r,t))}convertServerTimestamp(e,t){switch(t){case"previous":const r=zs(e);return r==null?null:this.convertValue(r,t);case"estimate":return this.convertTimestamp(dr(e));default:return null}}convertTimestamp(e){const t=kt(e);return new Z(t.seconds,t.nanos)}convertDocumentKey(e,t){const r=J.fromString(e);Q(ud(r),9688,{name:e});const s=new hr(r.get(1),r.get(3)),i=new O(r.popFirst(5));return s.isEqual(t)||lt(`Document ${i} contains a document reference within a different database (${s.projectId}/${s.database}) which is not supported. It will be treated as a reference in the current database (${t.projectId}/${t.database}) instead.`),i}}/**
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
 */function la(n,e,t){let r;return r=n?t&&(t.merge||t.mergeFields)?n.toFirestore(e,t):n.toFirestore(e):e,r}class tr{constructor(e,t){this.hasPendingWrites=e,this.fromCache=t}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class Wt extends Hd{constructor(e,t,r,s,i,a){super(e,t,r,s,a),this._firestore=e,this._firestoreImpl=e,this.metadata=i}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){const t=new ps(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(t,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,t={}){if(this._document){const r=this._document.data.field(oa("DocumentSnapshot.get",e));if(r!==null)return this._userDataWriter.convertValue(r,t.serverTimestamps)}}toJSON(){if(this.metadata.hasPendingWrites)throw new V(S.FAILED_PRECONDITION,"DocumentSnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e=this._document,t={};return t.type=Wt._jsonSchemaVersion,t.bundle="",t.bundleSource="DocumentSnapshot",t.bundleName=this._key.toString(),!e||!e.isValidDocument()||!e.isFoundDocument()?t:(this._userDataWriter.convertObjectMap(e.data.value.mapValue.fields,"previous"),t.bundle=(this._firestore,this.ref.path,"NOT SUPPORTED"),t)}}Wt._jsonSchemaVersion="firestore/documentSnapshot/1.0",Wt._jsonSchema={type:ce("string",Wt._jsonSchemaVersion),bundleSource:ce("string","DocumentSnapshot"),bundleName:ce("string"),bundle:ce("string")};class ps extends Wt{data(e={}){return super.data(e)}}class Kt{constructor(e,t,r,s){this._firestore=e,this._userDataWriter=t,this._snapshot=s,this.metadata=new tr(s.hasPendingWrites,s.fromCache),this.query=r}get docs(){const e=[];return this.forEach(t=>e.push(t)),e}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(e,t){this._snapshot.docs.forEach(r=>{e.call(t,new ps(this._firestore,this._userDataWriter,r.key,r,new tr(this._snapshot.mutatedKeys.has(r.key),this._snapshot.fromCache),this.query.converter))})}docChanges(e={}){const t=!!e.includeMetadataChanges;if(t&&this._snapshot.excludesMetadataChanges)throw new V(S.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===t||(this._cachedChanges=function(s,i){if(s._snapshot.oldDocs.isEmpty()){let a=0;return s._snapshot.docChanges.map(u=>{const d=new ps(s._firestore,s._userDataWriter,u.doc.key,u.doc,new tr(s._snapshot.mutatedKeys.has(u.doc.key),s._snapshot.fromCache),s.query.converter);return u.doc,{type:"added",doc:d,oldIndex:-1,newIndex:a++}})}{let a=s._snapshot.oldDocs;return s._snapshot.docChanges.filter(u=>i||u.type!==3).map(u=>{const d=new ps(s._firestore,s._userDataWriter,u.doc.key,u.doc,new tr(s._snapshot.mutatedKeys.has(u.doc.key),s._snapshot.fromCache),s.query.converter);let f=-1,c=-1;return u.type!==0&&(f=a.indexOf(u.doc.key),a=a.delete(u.doc.key)),u.type!==1&&(a=a.add(u.doc),c=a.indexOf(u.doc.key)),{type:a_(u.type),doc:d,oldIndex:f,newIndex:c}})}}(this,t),this._cachedChangesIncludeMetadataChanges=t),this._cachedChanges}toJSON(){if(this.metadata.hasPendingWrites)throw new V(S.FAILED_PRECONDITION,"QuerySnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e={};e.type=Kt._jsonSchemaVersion,e.bundleSource="QuerySnapshot",e.bundleName=ko.newId(),this._firestore._databaseId.database,this._firestore._databaseId.projectId;const t=[],r=[],s=[];return this.docs.forEach(i=>{i._document!==null&&(t.push(i._document),r.push(this._userDataWriter.convertObjectMap(i._document.data.value.mapValue.fields,"previous")),s.push(i.ref.path))}),e.bundle=(this._firestore,this.query._query,e.bundleName,"NOT SUPPORTED"),e}}function a_(n){switch(n){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return L(61501,{type:n})}}Kt._jsonSchemaVersion="firestore/querySnapshot/1.0",Kt._jsonSchema={type:ce("string",Kt._jsonSchemaVersion),bundleSource:ce("string","QuerySnapshot"),bundleName:ce("string"),bundle:ce("string")};class ua extends o_{constructor(e){super(),this.firestore=e}convertBytes(e){return new Ue(e)}convertReference(e){const t=this.convertDocumentKey(e,this.firestore._databaseId);return new ie(this.firestore,null,t)}}function et(n){n=Le(n,sn);const e=Le(n.firestore,dt),t=ni(e),r=new ua(e);return Gd(n._query),Xy(t,n._query).then(s=>new Kt(e,r,n,s))}function c_(n,e,t){n=Le(n,ie);const r=Le(n.firestore,dt),s=la(n.converter,e,t);return Vr(r,[na(Pr(r),"setDoc",n._key,s,n.converter!==null,t).toMutation(n._key,ke.none())])}function Dr(n,e,t,...r){n=Le(n,ie);const s=Le(n.firestore,dt),i=Pr(s);let a;return a=typeof(e=he(e))=="string"||e instanceof Cr?$d(i,"updateDoc",n._key,e,t,r):Bd(i,"updateDoc",n._key,e),Vr(s,[a.toMutation(n._key,ke.exists(!0))])}function da(n){return Vr(Le(n.firestore,dt),[new Qs(n._key,ke.none())])}function Vn(n,e){const t=Le(n.firestore,dt),r=nt(n),s=la(n.converter,e);return Vr(t,[na(Pr(n.firestore),"addDoc",r._key,s,n.converter!==null,{}).toMutation(r._key,ke.exists(!1))]).then(()=>r)}function Kd(n,...e){n=he(n);let t={includeMetadataChanges:!1,source:"default"},r=0;typeof e[r]!="object"||Ol(e[r])||(t=e[r++]);const s={includeMetadataChanges:t.includeMetadataChanges,source:t.source};if(Ol(e[r])){const d=e[r];e[r]=d.next?.bind(d),e[r+1]=d.error?.bind(d),e[r+2]=d.complete?.bind(d)}let i,a,u;if(n instanceof ie)a=Le(n.firestore,dt),u=Lo(n._key.path),i={next:d=>{e[r]&&e[r](l_(a,n,d))},error:e[r+1],complete:e[r+2]};else{const d=Le(n,sn);a=Le(d.firestore,dt),u=d._query;const f=new ua(a);i={next:c=>{e[r]&&e[r](new Kt(a,f,d,c))},error:e[r+1],complete:e[r+2]},Gd(n._query)}return function(f,c,w,_){const x=new Nd(_),C=new Ad(c,x,w);return f.asyncQueue.enqueueAndForget(async()=>Td(await wo(f),C)),()=>{x.Nu(),f.asyncQueue.enqueueAndForget(async()=>Id(await wo(f),C))}}(ni(a),u,s,i)}function Vr(n,e){return function(r,s){const i=new St;return r.asyncQueue.enqueueAndForget(async()=>Fy(await Qy(r),s,i)),i.promise}(ni(n),e)}function l_(n,e,t){const r=t.docs.get(e._key),s=new ua(n);return new Wt(n,s,e._key,r,new tr(t.hasPendingWrites,t.fromCache),e.converter)}/**
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
 */class u_{constructor(e,t){this._firestore=e,this._commitHandler=t,this._mutations=[],this._committed=!1,this._dataReader=Pr(e)}set(e,t,r){this._verifyNotCommitted();const s=Hi(e,this._firestore),i=la(s.converter,t,r),a=na(this._dataReader,"WriteBatch.set",s._key,i,s.converter!==null,r);return this._mutations.push(a.toMutation(s._key,ke.none())),this}update(e,t,r,...s){this._verifyNotCommitted();const i=Hi(e,this._firestore);let a;return a=typeof(t=he(t))=="string"||t instanceof Cr?$d(this._dataReader,"WriteBatch.update",i._key,t,r,s):Bd(this._dataReader,"WriteBatch.update",i._key,t),this._mutations.push(a.toMutation(i._key,ke.exists(!0))),this}delete(e){this._verifyNotCommitted();const t=Hi(e,this._firestore);return this._mutations=this._mutations.concat(new Qs(t._key,ke.none())),this}commit(){return this._verifyNotCommitted(),this._committed=!0,this._mutations.length>0?this._commitHandler(this._mutations):Promise.resolve()}_verifyNotCommitted(){if(this._committed)throw new V(S.FAILED_PRECONDITION,"A write batch can no longer be used after commit() has been called.")}}function Hi(n,e){if((n=he(n)).firestore!==e)throw new V(S.INVALID_ARGUMENT,"Provided document reference is from a different Firestore instance.");return n}function ha(){return new ra("serverTimestamp")}/**
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
 */function d_(n){return ni(n=Le(n,dt)),new u_(n,e=>Vr(n,e))}(function(e,t=!0){(function(s){Cn=s})(Rn),wn(new Jt("firestore",(r,{instanceIdentifier:s,options:i})=>{const a=r.getProvider("app").getImmediate(),u=new dt(new sm(r.getProvider("auth-internal")),new am(a,r.getProvider("app-check-internal")),function(f,c){if(!Object.prototype.hasOwnProperty.apply(f.options,["projectId"]))throw new V(S.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new hr(f.options.projectId,c)}(a,s),a);return i={useFetchStreams:t,...i},u._setSettings(i),u},"PUBLIC").setMultipleInstances(!0)),At(Uc,Bc,e),At(Uc,Bc,"esm2020")})();var h_="firebase",f_="12.0.0";/**
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
 */At(h_,f_,"app");function Qd(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const p_=Qd,Xd=new br("auth","Firebase",Qd());/**
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
 */const Vs=new So("@firebase/auth");function m_(n,...e){Vs.logLevel<=z.WARN&&Vs.warn(`Auth (${Rn}): ${n}`,...e)}function ms(n,...e){Vs.logLevel<=z.ERROR&&Vs.error(`Auth (${Rn}): ${n}`,...e)}/**
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
 */function tt(n,...e){throw pa(n,...e)}function ze(n,...e){return pa(n,...e)}function fa(n,e,t){const r={...p_(),[e]:t};return new br("auth","Firebase",r).create(e,{appName:n.name})}function Qt(n){return fa(n,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function g_(n,e,t){const r=t;if(!(e instanceof r))throw r.name!==e.constructor.name&&tt(n,"argument-error"),fa(n,"argument-error",`Type of ${e.constructor.name} does not match expected instance.Did you pass a reference from a different Auth SDK?`)}function pa(n,...e){if(typeof n!="string"){const t=e[0],r=[...e.slice(1)];return r[0]&&(r[0].appName=n.name),n._errorFactory.create(t,...r)}return Xd.create(n,...e)}function U(n,e,...t){if(!n)throw pa(e,...t)}function ot(n){const e="INTERNAL ASSERTION FAILED: "+n;throw ms(e),new Error(e)}function ht(n,e){n||ot(e)}/**
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
 */function bo(){return typeof self<"u"&&self.location?.href||""}function y_(){return Fl()==="http:"||Fl()==="https:"}function Fl(){return typeof self<"u"&&self.location?.protocol||null}/**
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
 */function __(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(y_()||Of()||"connection"in navigator)?navigator.onLine:!0}function w_(){if(typeof navigator>"u")return null;const n=navigator;return n.languages&&n.languages[0]||n.language||null}/**
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
 */class Nr{constructor(e,t){this.shortDelay=e,this.longDelay=t,ht(t>e,"Short delay should be less than long delay!"),this.isMobile=Df()||Mf()}get(){return __()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
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
 */function ma(n,e){ht(n.emulator,"Emulator should always be set here");const{url:t}=n.emulator;return e?`${t}${e.startsWith("/")?e.slice(1):e}`:t}/**
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
 */class Jd{static initialize(e,t,r){this.fetchImpl=e,t&&(this.headersImpl=t),r&&(this.responseImpl=r)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;ot("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;ot("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;ot("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
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
 */const v_={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
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
 */const b_=["/v1/accounts:signInWithCustomToken","/v1/accounts:signInWithEmailLink","/v1/accounts:signInWithIdp","/v1/accounts:signInWithPassword","/v1/accounts:signInWithPhoneNumber","/v1/token"],E_=new Nr(3e4,6e4);function ga(n,e){return n.tenantId&&!e.tenantId?{...e,tenantId:n.tenantId}:e}async function Nn(n,e,t,r,s={}){return Yd(n,s,async()=>{let i={},a={};r&&(e==="GET"?a=r:i={body:JSON.stringify(r)});const u=Er({key:n.config.apiKey,...a}).slice(1),d=await n._getAdditionalHeaders();d["Content-Type"]="application/json",n.languageCode&&(d["X-Firebase-Locale"]=n.languageCode);const f={method:e,headers:d,...i};return Nf()||(f.referrerPolicy="no-referrer"),n.emulatorConfig&&Sn(n.emulatorConfig.host)&&(f.credentials="include"),Jd.fetch()(await Zd(n,n.config.apiHost,t,u),f)})}async function Yd(n,e,t){n._canInitEmulator=!1;const r={...v_,...e};try{const s=new I_(n),i=await Promise.race([t(),s.promise]);s.clearNetworkTimeout();const a=await i.json();if("needConfirmation"in a)throw cs(n,"account-exists-with-different-credential",a);if(i.ok&&!("errorMessage"in a))return a;{const u=i.ok?a.errorMessage:a.error.message,[d,f]=u.split(" : ");if(d==="FEDERATED_USER_ID_ALREADY_LINKED")throw cs(n,"credential-already-in-use",a);if(d==="EMAIL_EXISTS")throw cs(n,"email-already-in-use",a);if(d==="USER_DISABLED")throw cs(n,"user-disabled",a);const c=r[d]||d.toLowerCase().replace(/[_\s]+/g,"-");if(f)throw fa(n,c,f);tt(n,c)}}catch(s){if(s instanceof ft)throw s;tt(n,"network-request-failed",{message:String(s)})}}async function T_(n,e,t,r,s={}){const i=await Nn(n,e,t,r,s);return"mfaPendingCredential"in i&&tt(n,"multi-factor-auth-required",{_serverResponse:i}),i}async function Zd(n,e,t,r){const s=`${e}${t}?${r}`,i=n,a=i.config.emulator?ma(n.config,s):`${n.config.apiScheme}://${s}`;return b_.includes(t)&&(await i._persistenceManagerAvailable,i._getPersistenceType()==="COOKIE")?i._getPersistence()._getFinalTarget(a).toString():a}class I_{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((t,r)=>{this.timer=setTimeout(()=>r(ze(this.auth,"network-request-failed")),E_.get())})}}function cs(n,e,t){const r={appName:n.name};t.email&&(r.email=t.email),t.phoneNumber&&(r.phoneNumber=t.phoneNumber);const s=ze(n,e,r);return s.customData._tokenResponse=t,s}/**
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
 */async function A_(n,e){return Nn(n,"POST","/v1/accounts:delete",e)}async function Ns(n,e){return Nn(n,"POST","/v1/accounts:lookup",e)}/**
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
 */function cr(n){if(n)try{const e=new Date(Number(n));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function x_(n,e=!1){const t=he(n),r=await t.getIdToken(e),s=ya(r);U(s&&s.exp&&s.auth_time&&s.iat,t.auth,"internal-error");const i=typeof s.firebase=="object"?s.firebase:void 0,a=i?.sign_in_provider;return{claims:s,token:r,authTime:cr(Gi(s.auth_time)),issuedAtTime:cr(Gi(s.iat)),expirationTime:cr(Gi(s.exp)),signInProvider:a||null,signInSecondFactor:i?.sign_in_second_factor||null}}function Gi(n){return Number(n)*1e3}function ya(n){const[e,t,r]=n.split(".");if(e===void 0||t===void 0||r===void 0)return ms("JWT malformed, contained fewer than 3 sections"),null;try{const s=su(t);return s?JSON.parse(s):(ms("Failed to decode base64 JWT payload"),null)}catch(s){return ms("Caught error parsing JWT payload as JSON",s?.toString()),null}}function Ul(n){const e=ya(n);return U(e,"internal-error"),U(typeof e.exp<"u","internal-error"),U(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
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
 */async function yr(n,e,t=!1){if(t)return e;try{return await e}catch(r){throw r instanceof ft&&S_(r)&&n.auth.currentUser===n&&await n.auth.signOut(),r}}function S_({code:n}){return n==="auth/user-disabled"||n==="auth/user-token-expired"}/**
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
 */class R_{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){if(e){const t=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),t}else{this.errorBackoff=3e4;const r=(this.user.stsTokenManager.expirationTime??0)-Date.now()-3e5;return Math.max(0,r)}}schedule(e=!1){if(!this.isRunning)return;const t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){e?.code==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
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
 */class Eo{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=cr(this.lastLoginAt),this.creationTime=cr(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
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
 */async function Os(n){const e=n.auth,t=await n.getIdToken(),r=await yr(n,Ns(e,{idToken:t}));U(r?.users.length,e,"internal-error");const s=r.users[0];n._notifyReloadListener(s);const i=s.providerUserInfo?.length?eh(s.providerUserInfo):[],a=P_(n.providerData,i),u=n.isAnonymous,d=!(n.email&&s.passwordHash)&&!a?.length,f=u?d:!1,c={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:a,metadata:new Eo(s.createdAt,s.lastLoginAt),isAnonymous:f};Object.assign(n,c)}async function C_(n){const e=he(n);await Os(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function P_(n,e){return[...n.filter(r=>!e.some(s=>s.providerId===r.providerId)),...e]}function eh(n){return n.map(({providerId:e,...t})=>({providerId:e,uid:t.rawId||"",displayName:t.displayName||null,email:t.email||null,phoneNumber:t.phoneNumber||null,photoURL:t.photoUrl||null}))}/**
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
 */async function k_(n,e){const t=await Yd(n,{},async()=>{const r=Er({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:s,apiKey:i}=n.config,a=await Zd(n,s,"/v1/token",`key=${i}`),u=await n._getAdditionalHeaders();u["Content-Type"]="application/x-www-form-urlencoded";const d={method:"POST",headers:u,body:r};return n.emulatorConfig&&Sn(n.emulatorConfig.host)&&(d.credentials="include"),Jd.fetch()(a,d)});return{accessToken:t.access_token,expiresIn:t.expires_in,refreshToken:t.refresh_token}}async function D_(n,e){return Nn(n,"POST","/v2/accounts:revokeToken",ga(n,e))}/**
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
 */class gn{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){U(e.idToken,"internal-error"),U(typeof e.idToken<"u","internal-error"),U(typeof e.refreshToken<"u","internal-error");const t="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):Ul(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){U(e.length!==0,"internal-error");const t=Ul(e);this.updateTokensAndExpiration(e,null,t)}async getToken(e,t=!1){return!t&&this.accessToken&&!this.isExpired?this.accessToken:(U(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){const{accessToken:r,refreshToken:s,expiresIn:i}=await k_(e,t);this.updateTokensAndExpiration(r,s,Number(i))}updateTokensAndExpiration(e,t,r){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+r*1e3}static fromJSON(e,t){const{refreshToken:r,accessToken:s,expirationTime:i}=t,a=new gn;return r&&(U(typeof r=="string","internal-error",{appName:e}),a.refreshToken=r),s&&(U(typeof s=="string","internal-error",{appName:e}),a.accessToken=s),i&&(U(typeof i=="number","internal-error",{appName:e}),a.expirationTime=i),a}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new gn,this.toJSON())}_performRefresh(){return ot("not implemented")}}/**
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
 */function _t(n,e){U(typeof n=="string"||typeof n>"u","internal-error",{appName:e})}class je{constructor({uid:e,auth:t,stsTokenManager:r,...s}){this.providerId="firebase",this.proactiveRefresh=new R_(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=e,this.auth=t,this.stsTokenManager=r,this.accessToken=r.accessToken,this.displayName=s.displayName||null,this.email=s.email||null,this.emailVerified=s.emailVerified||!1,this.phoneNumber=s.phoneNumber||null,this.photoURL=s.photoURL||null,this.isAnonymous=s.isAnonymous||!1,this.tenantId=s.tenantId||null,this.providerData=s.providerData?[...s.providerData]:[],this.metadata=new Eo(s.createdAt||void 0,s.lastLoginAt||void 0)}async getIdToken(e){const t=await yr(this,this.stsTokenManager.getToken(this.auth,e));return U(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return x_(this,e)}reload(){return C_(this)}_assign(e){this!==e&&(U(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(t=>({...t})),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const t=new je({...this,auth:e,stsTokenManager:this.stsTokenManager._clone()});return t.metadata._copy(this.metadata),t}_onReload(e){U(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let r=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),r=!0),t&&await Os(this),await this.auth._persistUserIfCurrent(this),r&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(qe(this.auth.app))return Promise.reject(Qt(this.auth));const e=await this.getIdToken();return await yr(this,A_(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return{uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>({...e})),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId,...this.metadata.toJSON(),apiKey:this.auth.config.apiKey,appName:this.auth.name}}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){const r=t.displayName??void 0,s=t.email??void 0,i=t.phoneNumber??void 0,a=t.photoURL??void 0,u=t.tenantId??void 0,d=t._redirectEventId??void 0,f=t.createdAt??void 0,c=t.lastLoginAt??void 0,{uid:w,emailVerified:_,isAnonymous:x,providerData:C,stsTokenManager:D}=t;U(w&&D,e,"internal-error");const P=gn.fromJSON(this.name,D);U(typeof w=="string",e,"internal-error"),_t(r,e.name),_t(s,e.name),U(typeof _=="boolean",e,"internal-error"),U(typeof x=="boolean",e,"internal-error"),_t(i,e.name),_t(a,e.name),_t(u,e.name),_t(d,e.name),_t(f,e.name),_t(c,e.name);const M=new je({uid:w,auth:e,email:s,emailVerified:_,displayName:r,isAnonymous:x,photoURL:a,phoneNumber:i,tenantId:u,stsTokenManager:P,createdAt:f,lastLoginAt:c});return C&&Array.isArray(C)&&(M.providerData=C.map(F=>({...F}))),d&&(M._redirectEventId=d),M}static async _fromIdTokenResponse(e,t,r=!1){const s=new gn;s.updateFromServerResponse(t);const i=new je({uid:t.localId,auth:e,stsTokenManager:s,isAnonymous:r});return await Os(i),i}static async _fromGetAccountInfoResponse(e,t,r){const s=t.users[0];U(s.localId!==void 0,"internal-error");const i=s.providerUserInfo!==void 0?eh(s.providerUserInfo):[],a=!(s.email&&s.passwordHash)&&!i?.length,u=new gn;u.updateFromIdToken(r);const d=new je({uid:s.localId,auth:e,stsTokenManager:u,isAnonymous:a}),f={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:i,metadata:new Eo(s.createdAt,s.lastLoginAt),isAnonymous:!(s.email&&s.passwordHash)&&!i?.length};return Object.assign(d,f),d}}/**
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
 */const Bl=new Map;function at(n){ht(n instanceof Function,"Expected a class definition");let e=Bl.get(n);return e?(ht(e instanceof n,"Instance stored in cache mismatched with class"),e):(e=new n,Bl.set(n,e),e)}/**
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
 */class th{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){const t=this.storage[e];return t===void 0?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}}th.type="NONE";const $l=th;/**
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
 */function gs(n,e,t){return`firebase:${n}:${e}:${t}`}class yn{constructor(e,t,r){this.persistence=e,this.auth=t,this.userKey=r;const{config:s,name:i}=this.auth;this.fullUserKey=gs(this.userKey,s.apiKey,i),this.fullPersistenceKey=gs("persistence",s.apiKey,i),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);if(!e)return null;if(typeof e=="string"){const t=await Ns(this.auth,{idToken:e}).catch(()=>{});return t?je._fromGetAccountInfoResponse(this.auth,t,e):null}return je._fromJSON(this.auth,e)}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const t=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,t)return this.setCurrentUser(t)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,t,r="authUser"){if(!t.length)return new yn(at($l),e,r);const s=(await Promise.all(t.map(async f=>{if(await f._isAvailable())return f}))).filter(f=>f);let i=s[0]||at($l);const a=gs(r,e.config.apiKey,e.name);let u=null;for(const f of t)try{const c=await f._get(a);if(c){let w;if(typeof c=="string"){const _=await Ns(e,{idToken:c}).catch(()=>{});if(!_)break;w=await je._fromGetAccountInfoResponse(e,_,c)}else w=je._fromJSON(e,c);f!==i&&(u=w),i=f;break}}catch{}const d=s.filter(f=>f._shouldAllowMigration);return!i._shouldAllowMigration||!d.length?new yn(i,e,r):(i=d[0],u&&await i._set(a,u.toJSON()),await Promise.all(t.map(async f=>{if(f!==i)try{await f._remove(a)}catch{}})),new yn(i,e,r))}}/**
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
 */function ql(n){const e=n.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(ih(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(nh(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(ah(e))return"Blackberry";if(ch(e))return"Webos";if(rh(e))return"Safari";if((e.includes("chrome/")||sh(e))&&!e.includes("edge/"))return"Chrome";if(oh(e))return"Android";{const t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,r=n.match(t);if(r?.length===2)return r[1]}return"Other"}function nh(n=Re()){return/firefox\//i.test(n)}function rh(n=Re()){const e=n.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function sh(n=Re()){return/crios\//i.test(n)}function ih(n=Re()){return/iemobile/i.test(n)}function oh(n=Re()){return/android/i.test(n)}function ah(n=Re()){return/blackberry/i.test(n)}function ch(n=Re()){return/webos/i.test(n)}function _a(n=Re()){return/iphone|ipad|ipod/i.test(n)||/macintosh/i.test(n)&&/mobile/i.test(n)}function V_(n=Re()){return _a(n)&&!!window.navigator?.standalone}function N_(){return Lf()&&document.documentMode===10}function lh(n=Re()){return _a(n)||oh(n)||ch(n)||ah(n)||/windows phone/i.test(n)||ih(n)}/**
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
 */function uh(n,e=[]){let t;switch(n){case"Browser":t=ql(Re());break;case"Worker":t=`${ql(Re())}-${n}`;break;default:t=n}const r=e.length?e.join(","):"FirebaseCore-web";return`${t}/JsCore/${Rn}/${r}`}/**
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
 */class O_{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){const r=i=>new Promise((a,u)=>{try{const d=e(i);a(d)}catch(d){u(d)}});r.onAbort=t,this.queue.push(r);const s=this.queue.length-1;return()=>{this.queue[s]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const t=[];try{for(const r of this.queue)await r(e),r.onAbort&&t.push(r.onAbort)}catch(r){t.reverse();for(const s of t)try{s()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:r?.message})}}}/**
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
 */async function M_(n,e={}){return Nn(n,"GET","/v2/passwordPolicy",ga(n,e))}/**
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
 */const L_=6;class F_{constructor(e){const t=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=t.minPasswordLength??L_,t.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=t.maxPasswordLength),t.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=t.containsLowercaseCharacter),t.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=t.containsUppercaseCharacter),t.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=t.containsNumericCharacter),t.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=t.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=e.allowedNonAlphanumericCharacters?.join("")??"",this.forceUpgradeOnSignin=e.forceUpgradeOnSignin??!1,this.schemaVersion=e.schemaVersion}validatePassword(e){const t={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,t),this.validatePasswordCharacterOptions(e,t),t.isValid&&(t.isValid=t.meetsMinPasswordLength??!0),t.isValid&&(t.isValid=t.meetsMaxPasswordLength??!0),t.isValid&&(t.isValid=t.containsLowercaseLetter??!0),t.isValid&&(t.isValid=t.containsUppercaseLetter??!0),t.isValid&&(t.isValid=t.containsNumericCharacter??!0),t.isValid&&(t.isValid=t.containsNonAlphanumericCharacter??!0),t}validatePasswordLengthOptions(e,t){const r=this.customStrengthOptions.minPasswordLength,s=this.customStrengthOptions.maxPasswordLength;r&&(t.meetsMinPasswordLength=e.length>=r),s&&(t.meetsMaxPasswordLength=e.length<=s)}validatePasswordCharacterOptions(e,t){this.updatePasswordCharacterOptionsStatuses(t,!1,!1,!1,!1);let r;for(let s=0;s<e.length;s++)r=e.charAt(s),this.updatePasswordCharacterOptionsStatuses(t,r>="a"&&r<="z",r>="A"&&r<="Z",r>="0"&&r<="9",this.allowedNonAlphanumericCharacters.includes(r))}updatePasswordCharacterOptionsStatuses(e,t,r,s,i){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=t)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=r)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=s)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=i))}}/**
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
 */class U_{constructor(e,t,r,s){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=r,this.config=s,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new jl(this),this.idTokenSubscription=new jl(this),this.beforeStateQueue=new O_(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=Xd,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this._resolvePersistenceManagerAvailable=void 0,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=s.sdkClientVersion,this._persistenceManagerAvailable=new Promise(i=>this._resolvePersistenceManagerAvailable=i)}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=at(t)),this._initializationPromise=this.queue(async()=>{if(!this._deleted&&(this.persistenceManager=await yn.create(this,e),this._resolvePersistenceManagerAvailable?.(),!this._deleted)){if(this._popupRedirectResolver?._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(t),this.lastNotifiedUid=this.currentUser?.uid||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const t=await Ns(this,{idToken:e}),r=await je._fromGetAccountInfoResponse(this,t,e);await this.directlySetCurrentUser(r)}catch(t){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",t),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){if(qe(this.app)){const i=this.app.settings.authIdToken;return i?new Promise(a=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(i).then(a,a))}):this.directlySetCurrentUser(null)}const t=await this.assertedPersistence.getCurrentUser();let r=t,s=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const i=this.redirectUser?._redirectEventId,a=r?._redirectEventId,u=await this.tryRedirectSignIn(e);(!i||i===a)&&u?.user&&(r=u.user,s=!0)}if(!r)return this.directlySetCurrentUser(null);if(!r._redirectEventId){if(s)try{await this.beforeStateQueue.runMiddleware(r)}catch(i){r=t,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(i))}return r?this.reloadAndSetCurrentUserOrClear(r):this.directlySetCurrentUser(null)}return U(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===r._redirectEventId?this.directlySetCurrentUser(r):this.reloadAndSetCurrentUserOrClear(r)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await Os(e)}catch(t){if(t?.code!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=w_()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(qe(this.app))return Promise.reject(Qt(this));const t=e?he(e):null;return t&&U(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&U(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return qe(this.app)?Promise.reject(Qt(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return qe(this.app)?Promise.reject(Qt(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(at(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const t=this._getPasswordPolicyInternal();return t.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):t.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await M_(this),t=new F_(e);this.tenantId===null?this._projectPasswordPolicy=t:this._tenantPasswordPolicies[this.tenantId]=t}_getPersistenceType(){return this.assertedPersistence.persistence.type}_getPersistence(){return this.assertedPersistence.persistence}_updateErrorMap(e){this._errorFactory=new br("auth","Firebase",e())}onAuthStateChanged(e,t,r){return this.registerStateListener(this.authStateSubscription,e,t,r)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,r){return this.registerStateListener(this.idTokenSubscription,e,t,r)}authStateReady(){return new Promise((e,t)=>{if(this.currentUser)e();else{const r=this.onAuthStateChanged(()=>{r(),e()},t)}})}async revokeAccessToken(e){if(this.currentUser){const t=await this.currentUser.getIdToken(),r={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:t};this.tenantId!=null&&(r.tenantId=this.tenantId),await D_(this,r)}}toJSON(){return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:this._currentUser?.toJSON()}}async _setRedirectUser(e,t){const r=await this.getOrInitRedirectPersistenceManager(t);return e===null?r.removeCurrentUser():r.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const t=e&&at(e)||this._popupRedirectResolver;U(t,this,"argument-error"),this.redirectPersistenceManager=await yn.create(this,[at(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){return this._isInitialized&&await this.queue(async()=>{}),this._currentUser?._redirectEventId===e?this._currentUser:this.redirectUser?._redirectEventId===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const e=this.currentUser?.uid??null;this.lastNotifiedUid!==e&&(this.lastNotifiedUid=e,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,r,s){if(this._deleted)return()=>{};const i=typeof t=="function"?t:t.next.bind(t);let a=!1;const u=this._isInitialized?Promise.resolve():this._initializationPromise;if(U(u,this,"internal-error"),u.then(()=>{a||i(this.currentUser)}),typeof t=="function"){const d=e.addObserver(t,r,s);return()=>{a=!0,d()}}else{const d=e.addObserver(t);return()=>{a=!0,d()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return U(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=uh(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){const e={"X-Client-Version":this.clientVersion};this.app.options.appId&&(e["X-Firebase-gmpid"]=this.app.options.appId);const t=await this.heartbeatServiceProvider.getImmediate({optional:!0})?.getHeartbeatsHeader();t&&(e["X-Firebase-Client"]=t);const r=await this._getAppCheckToken();return r&&(e["X-Firebase-AppCheck"]=r),e}async _getAppCheckToken(){if(qe(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const e=await this.appCheckServiceProvider.getImmediate({optional:!0})?.getToken();return e?.error&&m_(`Error while retrieving App Check token: ${e.error}`),e?.token}}function oi(n){return he(n)}class jl{constructor(e){this.auth=e,this.observer=null,this.addObserver=Hf(t=>this.observer=t)}get next(){return U(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
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
 */let wa={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function B_(n){wa=n}function $_(n){return wa.loadJS(n)}function q_(){return wa.gapiScript}function j_(n){return`__${n}${Math.floor(Math.random()*1e6)}`}/**
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
 */function z_(n,e){const t=Co(n,"auth");if(t.isInitialized()){const s=t.getImmediate(),i=t.getOptions();if(Xt(i,e??{}))return s;tt(s,"already-initialized")}return t.initialize({options:e})}function H_(n,e){const t=e?.persistence||[],r=(Array.isArray(t)?t:[t]).map(at);e?.errorMap&&n._updateErrorMap(e.errorMap),n._initializeWithPersistence(r,e?.popupRedirectResolver)}function G_(n,e,t){const r=oi(n);U(/^https?:\/\//.test(e),r,"invalid-emulator-scheme");const s=!1,i=dh(e),{host:a,port:u}=W_(e),d=u===null?"":`:${u}`,f={url:`${i}//${a}${d}/`},c=Object.freeze({host:a,port:u,protocol:i.replace(":",""),options:Object.freeze({disableWarnings:s})});if(!r._canInitEmulator){U(r.config.emulator&&r.emulatorConfig,r,"emulator-config-failed"),U(Xt(f,r.config.emulator)&&Xt(c,r.emulatorConfig),r,"emulator-config-failed");return}r.config.emulator=f,r.emulatorConfig=c,r.settings.appVerificationDisabledForTesting=!0,Sn(a)?(cu(`${i}//${a}${d}`),lu("Auth",!0)):K_()}function dh(n){const e=n.indexOf(":");return e<0?"":n.substr(0,e+1)}function W_(n){const e=dh(n),t=/(\/\/)?([^?#/]+)/.exec(n.substr(e.length));if(!t)return{host:"",port:null};const r=t[2].split("@").pop()||"",s=/^(\[[^\]]+\])(:|$)/.exec(r);if(s){const i=s[1];return{host:i,port:zl(r.substr(i.length+1))}}else{const[i,a]=r.split(":");return{host:i,port:zl(a)}}}function zl(n){if(!n)return null;const e=Number(n);return isNaN(e)?null:e}function K_(){function n(){const e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",n):n())}/**
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
 */class hh{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return ot("not implemented")}_getIdTokenResponse(e){return ot("not implemented")}_linkToIdToken(e,t){return ot("not implemented")}_getReauthenticationResolver(e){return ot("not implemented")}}/**
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
 */async function _n(n,e){return T_(n,"POST","/v1/accounts:signInWithIdp",ga(n,e))}/**
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
 */const Q_="http://localhost";class en extends hh{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const t=new en(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):tt("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e,{providerId:r,signInMethod:s,...i}=t;if(!r||!s)return null;const a=new en(r,s);return a.idToken=i.idToken||void 0,a.accessToken=i.accessToken||void 0,a.secret=i.secret,a.nonce=i.nonce,a.pendingToken=i.pendingToken||null,a}_getIdTokenResponse(e){const t=this.buildRequest();return _n(e,t)}_linkToIdToken(e,t){const r=this.buildRequest();return r.idToken=t,_n(e,r)}_getReauthenticationResolver(e){const t=this.buildRequest();return t.autoCreate=!1,_n(e,t)}buildRequest(){const e={requestUri:Q_,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=Er(t)}return e}}/**
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
 */class va{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
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
 */class Or extends va{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
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
 */class wt extends Or{constructor(){super("facebook.com")}static credential(e){return en._fromParams({providerId:wt.PROVIDER_ID,signInMethod:wt.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return wt.credentialFromTaggedObject(e)}static credentialFromError(e){return wt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return wt.credential(e.oauthAccessToken)}catch{return null}}}wt.FACEBOOK_SIGN_IN_METHOD="facebook.com";wt.PROVIDER_ID="facebook.com";/**
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
 */class it extends Or{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return en._fromParams({providerId:it.PROVIDER_ID,signInMethod:it.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return it.credentialFromTaggedObject(e)}static credentialFromError(e){return it.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:t,oauthAccessToken:r}=e;if(!t&&!r)return null;try{return it.credential(t,r)}catch{return null}}}it.GOOGLE_SIGN_IN_METHOD="google.com";it.PROVIDER_ID="google.com";/**
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
 */class vt extends Or{constructor(){super("github.com")}static credential(e){return en._fromParams({providerId:vt.PROVIDER_ID,signInMethod:vt.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return vt.credentialFromTaggedObject(e)}static credentialFromError(e){return vt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return vt.credential(e.oauthAccessToken)}catch{return null}}}vt.GITHUB_SIGN_IN_METHOD="github.com";vt.PROVIDER_ID="github.com";/**
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
 */class bt extends Or{constructor(){super("twitter.com")}static credential(e,t){return en._fromParams({providerId:bt.PROVIDER_ID,signInMethod:bt.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return bt.credentialFromTaggedObject(e)}static credentialFromError(e){return bt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:t,oauthTokenSecret:r}=e;if(!t||!r)return null;try{return bt.credential(t,r)}catch{return null}}}bt.TWITTER_SIGN_IN_METHOD="twitter.com";bt.PROVIDER_ID="twitter.com";/**
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
 */class xn{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,r,s=!1){const i=await je._fromIdTokenResponse(e,r,s),a=Hl(r);return new xn({user:i,providerId:a,_tokenResponse:r,operationType:t})}static async _forOperation(e,t,r){await e._updateTokensIfNecessary(r,!0);const s=Hl(r);return new xn({user:e,providerId:s,_tokenResponse:r,operationType:t})}}function Hl(n){return n.providerId?n.providerId:"phoneNumber"in n?"phone":null}/**
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
 */class Ms extends ft{constructor(e,t,r,s){super(t.code,t.message),this.operationType=r,this.user=s,Object.setPrototypeOf(this,Ms.prototype),this.customData={appName:e.name,tenantId:e.tenantId??void 0,_serverResponse:t.customData._serverResponse,operationType:r}}static _fromErrorAndOperation(e,t,r,s){return new Ms(e,t,r,s)}}function fh(n,e,t,r){return(e==="reauthenticate"?t._getReauthenticationResolver(n):t._getIdTokenResponse(n)).catch(i=>{throw i.code==="auth/multi-factor-auth-required"?Ms._fromErrorAndOperation(n,i,e,r):i})}async function X_(n,e,t=!1){const r=await yr(n,e._linkToIdToken(n.auth,await n.getIdToken()),t);return xn._forOperation(n,"link",r)}/**
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
 */async function J_(n,e,t=!1){const{auth:r}=n;if(qe(r.app))return Promise.reject(Qt(r));const s="reauthenticate";try{const i=await yr(n,fh(r,s,e,n),t);U(i.idToken,r,"internal-error");const a=ya(i.idToken);U(a,r,"internal-error");const{sub:u}=a;return U(n.uid===u,r,"user-mismatch"),xn._forOperation(n,s,i)}catch(i){throw i?.code==="auth/user-not-found"&&tt(r,"user-mismatch"),i}}/**
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
 */async function Y_(n,e,t=!1){if(qe(n.app))return Promise.reject(Qt(n));const r="signIn",s=await fh(n,r,e),i=await xn._fromIdTokenResponse(n,r,s);return t||await n._updateCurrentUser(i.user),i}/**
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
 */function Z_(n,e){return he(n).setPersistence(e)}function ew(n,e,t,r){return he(n).onIdTokenChanged(e,t,r)}function tw(n,e,t){return he(n).beforeAuthStateChanged(e,t)}const Ls="__sak";/**
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
 */class ph{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem(Ls,"1"),this.storage.removeItem(Ls),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){const t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
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
 */const nw=1e3,rw=10;class mh extends ph{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=lh(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const t of Object.keys(this.listeners)){const r=this.storage.getItem(t),s=this.localCache[t];r!==s&&e(t,s,r)}}onStorageEvent(e,t=!1){if(!e.key){this.forAllChangedKeys((a,u,d)=>{this.notifyListeners(a,d)});return}const r=e.key;t?this.detachListener():this.stopPolling();const s=()=>{const a=this.storage.getItem(r);!t&&this.localCache[r]===a||this.notifyListeners(r,a)},i=this.storage.getItem(r);N_()&&i!==e.newValue&&e.newValue!==e.oldValue?setTimeout(s,rw):s()}notifyListeners(e,t){this.localCache[e]=t;const r=this.listeners[e];if(r)for(const s of Array.from(r))s(t&&JSON.parse(t))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,r)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:r}),!0)})},nw)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){const t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}}mh.type="LOCAL";const gh=mh;/**
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
 */class yh extends ph{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,t){}_removeListener(e,t){}}yh.type="SESSION";const _h=yh;/**
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
 */function sw(n){return Promise.all(n.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(t){return{fulfilled:!1,reason:t}}}))}/**
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
 */class ai{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const t=this.receivers.find(s=>s.isListeningto(e));if(t)return t;const r=new ai(e);return this.receivers.push(r),r}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const t=e,{eventId:r,eventType:s,data:i}=t.data,a=this.handlersMap[s];if(!a?.size)return;t.ports[0].postMessage({status:"ack",eventId:r,eventType:s});const u=Array.from(a).map(async f=>f(t.origin,i)),d=await sw(u);t.ports[0].postMessage({status:"done",eventId:r,eventType:s,response:d})}_subscribe(e,t){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),(!t||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}ai.receivers=[];/**
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
 */function ba(n="",e=10){let t="";for(let r=0;r<e;r++)t+=Math.floor(Math.random()*10);return n+t}/**
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
 */class iw{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,r=50){const s=typeof MessageChannel<"u"?new MessageChannel:null;if(!s)throw new Error("connection_unavailable");let i,a;return new Promise((u,d)=>{const f=ba("",20);s.port1.start();const c=setTimeout(()=>{d(new Error("unsupported_event"))},r);a={messageChannel:s,onMessage(w){const _=w;if(_.data.eventId===f)switch(_.data.status){case"ack":clearTimeout(c),i=setTimeout(()=>{d(new Error("timeout"))},3e3);break;case"done":clearTimeout(i),u(_.data.response);break;default:clearTimeout(c),clearTimeout(i),d(new Error("invalid_response"));break}}},this.handlers.add(a),s.port1.addEventListener("message",a.onMessage),this.target.postMessage({eventType:e,eventId:f,data:t},[s.port2])}).finally(()=>{a&&this.removeMessageHandler(a)})}}/**
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
 */function Ye(){return window}function ow(n){Ye().location.href=n}/**
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
 */function wh(){return typeof Ye().WorkerGlobalScope<"u"&&typeof Ye().importScripts=="function"}async function aw(){if(!navigator?.serviceWorker)return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function cw(){return navigator?.serviceWorker?.controller||null}function lw(){return wh()?self:null}/**
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
 */const vh="firebaseLocalStorageDb",uw=1,Fs="firebaseLocalStorage",bh="fbase_key";class Mr{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{t(this.request.error)})})}}function ci(n,e){return n.transaction([Fs],e?"readwrite":"readonly").objectStore(Fs)}function dw(){const n=indexedDB.deleteDatabase(vh);return new Mr(n).toPromise()}function To(){const n=indexedDB.open(vh,uw);return new Promise((e,t)=>{n.addEventListener("error",()=>{t(n.error)}),n.addEventListener("upgradeneeded",()=>{const r=n.result;try{r.createObjectStore(Fs,{keyPath:bh})}catch(s){t(s)}}),n.addEventListener("success",async()=>{const r=n.result;r.objectStoreNames.contains(Fs)?e(r):(r.close(),await dw(),e(await To()))})})}async function Gl(n,e,t){const r=ci(n,!0).put({[bh]:e,value:t});return new Mr(r).toPromise()}async function hw(n,e){const t=ci(n,!1).get(e),r=await new Mr(t).toPromise();return r===void 0?null:r.value}function Wl(n,e){const t=ci(n,!0).delete(e);return new Mr(t).toPromise()}const fw=800,pw=3;class Eh{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await To(),this.db)}async _withRetries(e){let t=0;for(;;)try{const r=await this._openDb();return await e(r)}catch(r){if(t++>pw)throw r;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return wh()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=ai._getInstance(lw()),this.receiver._subscribe("keyChanged",async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)})),this.receiver._subscribe("ping",async(e,t)=>["keyChanged"])}async initializeSender(){if(this.activeServiceWorker=await aw(),!this.activeServiceWorker)return;this.sender=new iw(this.activeServiceWorker);const e=await this.sender._send("ping",{},800);e&&e[0]?.fulfilled&&e[0]?.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||cw()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await To();return await Gl(e,Ls,"1"),await Wl(e,Ls),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(r=>Gl(r,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){const t=await this._withRetries(r=>hw(r,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>Wl(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(s=>{const i=ci(s,!1).getAll();return new Mr(i).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const t=[],r=new Set;if(e.length!==0)for(const{fbase_key:s,value:i}of e)r.add(s),JSON.stringify(this.localCache[s])!==JSON.stringify(i)&&(this.notifyListeners(s,i),t.push(s));for(const s of Object.keys(this.localCache))this.localCache[s]&&!r.has(s)&&(this.notifyListeners(s,null),t.push(s));return t}notifyListeners(e,t){this.localCache[e]=t;const r=this.listeners[e];if(r)for(const s of Array.from(r))s(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),fw)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}Eh.type="LOCAL";const mw=Eh;new Nr(3e4,6e4);/**
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
 */function Th(n,e){return e?at(e):(U(n._popupRedirectResolver,n,"argument-error"),n._popupRedirectResolver)}/**
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
 */class Ea extends hh{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return _n(e,this._buildIdpRequest())}_linkToIdToken(e,t){return _n(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return _n(e,this._buildIdpRequest())}_buildIdpRequest(e){const t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}}function gw(n){return Y_(n.auth,new Ea(n),n.bypassAuthState)}function yw(n){const{auth:e,user:t}=n;return U(t,e,"internal-error"),J_(t,new Ea(n),n.bypassAuthState)}async function _w(n){const{auth:e,user:t}=n;return U(t,e,"internal-error"),X_(t,new Ea(n),n.bypassAuthState)}/**
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
 */class Ih{constructor(e,t,r,s,i=!1){this.auth=e,this.resolver=r,this.user=s,this.bypassAuthState=i,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(r){this.reject(r)}})}async onAuthEvent(e){const{urlResponse:t,sessionId:r,postBody:s,tenantId:i,error:a,type:u}=e;if(a){this.reject(a);return}const d={auth:this.auth,requestUri:t,sessionId:r,tenantId:i||void 0,postBody:s||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(u)(d))}catch(f){this.reject(f)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return gw;case"linkViaPopup":case"linkViaRedirect":return _w;case"reauthViaPopup":case"reauthViaRedirect":return yw;default:tt(this.auth,"internal-error")}}resolve(e){ht(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){ht(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
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
 */const ww=new Nr(2e3,1e4);async function vw(n,e,t){if(qe(n.app))return Promise.reject(ze(n,"operation-not-supported-in-this-environment"));const r=oi(n);g_(n,e,va);const s=Th(r,t);return new Gt(r,"signInViaPopup",e,s).executeNotNull()}class Gt extends Ih{constructor(e,t,r,s,i){super(e,t,s,i),this.provider=r,this.authWindow=null,this.pollId=null,Gt.currentPopupAction&&Gt.currentPopupAction.cancel(),Gt.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return U(e,this.auth,"internal-error"),e}async onExecution(){ht(this.filter.length===1,"Popup operations only handle one event");const e=ba();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(t=>{this.reject(t)}),this.resolver._isIframeWebStorageSupported(this.auth,t=>{t||this.reject(ze(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){return this.authWindow?.associatedEvent||null}cancel(){this.reject(ze(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,Gt.currentPopupAction=null}pollUserCancellation(){const e=()=>{if(this.authWindow?.window?.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(ze(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,ww.get())};e()}}Gt.currentPopupAction=null;/**
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
 */const bw="pendingRedirect",ys=new Map;class Ew extends Ih{constructor(e,t,r=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,r),this.eventId=null}async execute(){let e=ys.get(this.auth._key());if(!e){try{const r=await Tw(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(r)}catch(t){e=()=>Promise.reject(t)}ys.set(this.auth._key(),e)}return this.bypassAuthState||ys.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function Tw(n,e){const t=xw(e),r=Aw(n);if(!await r._isAvailable())return!1;const s=await r._get(t)==="true";return await r._remove(t),s}function Iw(n,e){ys.set(n._key(),e)}function Aw(n){return at(n._redirectPersistence)}function xw(n){return gs(bw,n.config.apiKey,n.name)}async function Sw(n,e,t=!1){if(qe(n.app))return Promise.reject(Qt(n));const r=oi(n),s=Th(r,e),a=await new Ew(r,s,t).execute();return a&&!t&&(delete a.user._redirectEventId,await r._persistUserIfCurrent(a.user),await r._setRedirectUser(null,e)),a}/**
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
 */const Rw=600*1e3;class Cw{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(r=>{this.isEventForConsumer(e,r)&&(t=!0,this.sendToConsumer(e,r),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!Pw(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){if(e.error&&!Ah(e)){const r=e.error.code?.split("auth/")[1]||"internal-error";t.onError(ze(this.auth,r))}else t.onAuthEvent(e)}isEventForConsumer(e,t){const r=t.eventId===null||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&r}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=Rw&&this.cachedEventUids.clear(),this.cachedEventUids.has(Kl(e))}saveEventToCache(e){this.cachedEventUids.add(Kl(e)),this.lastProcessedEventTime=Date.now()}}function Kl(n){return[n.type,n.eventId,n.sessionId,n.tenantId].filter(e=>e).join("-")}function Ah({type:n,error:e}){return n==="unknown"&&e?.code==="auth/no-auth-event"}function Pw(n){switch(n.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return Ah(n);default:return!1}}/**
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
 */async function kw(n,e={}){return Nn(n,"GET","/v1/projects",e)}/**
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
 */const Dw=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,Vw=/^https?/;async function Nw(n){if(n.config.emulator)return;const{authorizedDomains:e}=await kw(n);for(const t of e)try{if(Ow(t))return}catch{}tt(n,"unauthorized-domain")}function Ow(n){const e=bo(),{protocol:t,hostname:r}=new URL(e);if(n.startsWith("chrome-extension://")){const a=new URL(n);return a.hostname===""&&r===""?t==="chrome-extension:"&&n.replace("chrome-extension://","")===e.replace("chrome-extension://",""):t==="chrome-extension:"&&a.hostname===r}if(!Vw.test(t))return!1;if(Dw.test(n))return r===n;const s=n.replace(/\./g,"\\.");return new RegExp("^(.+\\."+s+"|"+s+")$","i").test(r)}/**
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
 */const Mw=new Nr(3e4,6e4);function Ql(){const n=Ye().___jsl;if(n?.H){for(const e of Object.keys(n.H))if(n.H[e].r=n.H[e].r||[],n.H[e].L=n.H[e].L||[],n.H[e].r=[...n.H[e].L],n.CP)for(let t=0;t<n.CP.length;t++)n.CP[t]=null}}function Lw(n){return new Promise((e,t)=>{function r(){Ql(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{Ql(),t(ze(n,"network-request-failed"))},timeout:Mw.get()})}if(Ye().gapi?.iframes?.Iframe)e(gapi.iframes.getContext());else if(Ye().gapi?.load)r();else{const s=j_("iframefcb");return Ye()[s]=()=>{gapi.load?r():t(ze(n,"network-request-failed"))},$_(`${q_()}?onload=${s}`).catch(i=>t(i))}}).catch(e=>{throw _s=null,e})}let _s=null;function Fw(n){return _s=_s||Lw(n),_s}/**
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
 */const Uw=new Nr(5e3,15e3),Bw="__/auth/iframe",$w="emulator/auth/iframe",qw={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},jw=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function zw(n){const e=n.config;U(e.authDomain,n,"auth-domain-config-required");const t=e.emulator?ma(e,$w):`https://${n.config.authDomain}/${Bw}`,r={apiKey:e.apiKey,appName:n.name,v:Rn},s=jw.get(n.config.apiHost);s&&(r.eid=s);const i=n._getFrameworks();return i.length&&(r.fw=i.join(",")),`${t}?${Er(r).slice(1)}`}async function Hw(n){const e=await Fw(n),t=Ye().gapi;return U(t,n,"internal-error"),e.open({where:document.body,url:zw(n),messageHandlersFilter:t.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:qw,dontclear:!0},r=>new Promise(async(s,i)=>{await r.restyle({setHideOnLeave:!1});const a=ze(n,"network-request-failed"),u=Ye().setTimeout(()=>{i(a)},Uw.get());function d(){Ye().clearTimeout(u),s(r)}r.ping(d).then(d,()=>{i(a)})}))}/**
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
 */const Gw={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},Ww=500,Kw=600,Qw="_blank",Xw="http://localhost";class Xl{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function Jw(n,e,t,r=Ww,s=Kw){const i=Math.max((window.screen.availHeight-s)/2,0).toString(),a=Math.max((window.screen.availWidth-r)/2,0).toString();let u="";const d={...Gw,width:r.toString(),height:s.toString(),top:i,left:a},f=Re().toLowerCase();t&&(u=sh(f)?Qw:t),nh(f)&&(e=e||Xw,d.scrollbars="yes");const c=Object.entries(d).reduce((_,[x,C])=>`${_}${x}=${C},`,"");if(V_(f)&&u!=="_self")return Yw(e||"",u),new Xl(null);const w=window.open(e||"",u,c);U(w,n,"popup-blocked");try{w.focus()}catch{}return new Xl(w)}function Yw(n,e){const t=document.createElement("a");t.href=n,t.target=e;const r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),t.dispatchEvent(r)}/**
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
 */const Zw="__/auth/handler",ev="emulator/auth/handler",tv=encodeURIComponent("fac");async function Jl(n,e,t,r,s,i){U(n.config.authDomain,n,"auth-domain-config-required"),U(n.config.apiKey,n,"invalid-api-key");const a={apiKey:n.config.apiKey,appName:n.name,authType:t,redirectUrl:r,v:Rn,eventId:s};if(e instanceof va){e.setDefaultLanguage(n.languageCode),a.providerId=e.providerId||"",zf(e.getCustomParameters())||(a.customParameters=JSON.stringify(e.getCustomParameters()));for(const[c,w]of Object.entries({}))a[c]=w}if(e instanceof Or){const c=e.getScopes().filter(w=>w!=="");c.length>0&&(a.scopes=c.join(","))}n.tenantId&&(a.tid=n.tenantId);const u=a;for(const c of Object.keys(u))u[c]===void 0&&delete u[c];const d=await n._getAppCheckToken(),f=d?`#${tv}=${encodeURIComponent(d)}`:"";return`${nv(n)}?${Er(u).slice(1)}${f}`}function nv({config:n}){return n.emulator?ma(n,ev):`https://${n.authDomain}/${Zw}`}/**
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
 */const Wi="webStorageSupport";class rv{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=_h,this._completeRedirectFn=Sw,this._overrideRedirectResult=Iw}async _openPopup(e,t,r,s){ht(this.eventManagers[e._key()]?.manager,"_initialize() not called before _openPopup()");const i=await Jl(e,t,r,bo(),s);return Jw(e,i,ba())}async _openRedirect(e,t,r,s){await this._originValidation(e);const i=await Jl(e,t,r,bo(),s);return ow(i),new Promise(()=>{})}_initialize(e){const t=e._key();if(this.eventManagers[t]){const{manager:s,promise:i}=this.eventManagers[t];return s?Promise.resolve(s):(ht(i,"If manager is not set, promise should be"),i)}const r=this.initAndGetManager(e);return this.eventManagers[t]={promise:r},r.catch(()=>{delete this.eventManagers[t]}),r}async initAndGetManager(e){const t=await Hw(e),r=new Cw(e);return t.register("authEvent",s=>(U(s?.authEvent,e,"invalid-auth-event"),{status:r.onEvent(s.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:r},this.iframes[e._key()]=t,r}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send(Wi,{type:Wi},s=>{const i=s?.[0]?.[Wi];i!==void 0&&t(!!i),tt(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=Nw(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return lh()||rh()||_a()}}const sv=rv;var Yl="@firebase/auth",Zl="1.11.0";/**
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
 */class iv{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){return this.assertAuthConfigured(),this.auth.currentUser?.uid||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const t=this.auth.onIdTokenChanged(r=>{e(r?.stsTokenManager.accessToken||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){U(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
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
 */function ov(n){switch(n){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function av(n){wn(new Jt("auth",(e,{options:t})=>{const r=e.getProvider("app").getImmediate(),s=e.getProvider("heartbeat"),i=e.getProvider("app-check-internal"),{apiKey:a,authDomain:u}=r.options;U(a&&!a.includes(":"),"invalid-api-key",{appName:r.name});const d={apiKey:a,authDomain:u,clientPlatform:n,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:uh(n)},f=new U_(r,s,i,d);return H_(f,t),f},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,r)=>{e.getProvider("auth-internal").initialize()})),wn(new Jt("auth-internal",e=>{const t=oi(e.getProvider("auth").getImmediate());return(r=>new iv(r))(t)},"PRIVATE").setInstantiationMode("EXPLICIT")),At(Yl,Zl,ov(n)),At(Yl,Zl,"esm2020")}/**
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
 */const cv=300,lv=au("authIdTokenMaxAge")||cv;let eu=null;const uv=n=>async e=>{const t=e&&await e.getIdTokenResult(),r=t&&(new Date().getTime()-Date.parse(t.issuedAtTime))/1e3;if(r&&r>lv)return;const s=t?.token;eu!==s&&(eu=s,await fetch(n,{method:s?"POST":"DELETE",headers:s?{Authorization:`Bearer ${s}`}:{}}))};function dv(n=fu()){const e=Co(n,"auth");if(e.isInitialized())return e.getImmediate();const t=z_(n,{popupRedirectResolver:sv,persistence:[mw,gh,_h]}),r=au("authTokenSyncURL");if(r&&typeof isSecureContext=="boolean"&&isSecureContext){const i=new URL(r,location.origin);if(location.origin===i.origin){const a=uv(i.toString());tw(t,a,()=>a(t.currentUser)),ew(t,u=>a(u))}}const s=iu("auth");return s&&G_(t,`http://${s}`),t}function hv(){return document.getElementsByTagName("head")?.[0]??document}B_({loadJS(n){return new Promise((e,t)=>{const r=document.createElement("script");r.setAttribute("src",n),r.onload=e,r.onerror=s=>{const i=ze("internal-error");i.customData=s,t(i)},r.type="text/javascript",r.charset="UTF-8",hv().appendChild(r)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});av("Browser");const fv={apiKey:"AIzaSyCbBmmxn4Qj4CU6ymfG4MY5VGqCPSo13HY",authDomain:"controle-financeiro-b98ec.firebaseapp.com",projectId:"controle-financeiro-b98ec",storageBucket:"controle-financeiro-b98ec.firebasestorage.app",messagingSenderId:"418109336597",appId:"1:418109336597:web:871b262a76e57455ebb21c",measurementId:"G-7RW2F269V6"},Ta=hu(fv),Ge=dv(Ta),ne=ti(Ta);Z_(Ge,gh).then(()=>{}).catch(n=>{console.error("Erro ao configurar persistência do Firebase Auth:",n)});async function pv(n,e,t){return await Vn(fe(ne,"users",n,"despesasRecorrentes"),{...t,userId:n,budgetId:e})}async function xh(n,e,t){return await Dr(nt(ne,"users",n,"despesasRecorrentes",e),t)}async function mv(n,e){return await da(nt(ne,"users",n,"despesasRecorrentes",e))}function De({title:n="",content:e="",onClose:t=null}){const r=document.createElement("div");r.id="app-modal",r.className="modal fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50",r.onclick=i=>{i.target===r&&t&&t(),window.toggleFABOnModal&&window.toggleFABOnModal()};const s=document.createElement("div");return s.className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-6 max-w-md w-full relative",s.innerHTML=`
    <button class="absolute top-2 right-2 text-gray-400 hover:text-gray-700 dark:text-gray-200 text-2xl" aria-label="Fechar" id="modal-close-btn">&times;</button>
    <h2 class="text-xl font-bold mb-4">${n}</h2>
    <div class="modal-body">${e}</div>
  `,r.appendChild(s),s.querySelector("#modal-close-btn").onclick=i=>{i.stopPropagation(),t&&t(),window.toggleFABOnModal&&window.toggleFABOnModal()},window.toggleFABOnModal&&window.toggleFABOnModal(),r}function gv({onSubmit:n,initialData:e={}}){const t=document.createElement("form");t.className="space-y-4",t.innerHTML=`
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
      <input type="text" id="rec-desc" required
             class="w-full px-3 py-2 border border-gray-300 rounded-lg"
             placeholder="Ex: Aluguel"
             value="${e.descricao||""}">
    </div>
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-1">Valor (R$)</label>
      <input type="number" id="rec-valor" required step="0.01" min="0"
             class="w-full px-3 py-2 border border-gray-300 rounded-lg"
             placeholder="0,00"
             value="${e.valorTotal||e.valor||""}">
    </div>
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-1">O valor informado é:</label>
      <div class="flex gap-4">
        <label><input type="radio" name="tipo-valor" value="total" checked> Valor total</label>
        <label><input type="radio" name="tipo-valor" value="parcela"> Valor da parcela</label>
      </div>
    </div>
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-1">Categoria</label>
      <select id="rec-categoria" required
              class="w-full px-3 py-2 border border-gray-300 rounded-lg">
        <option value="">Selecione...</option>
        ${(window.appState.categories||[]).map(s=>`<option value="${s.id}" ${e.categoriaId===s.id?"selected":""}>${s.nome}</option>`).join("")}
      </select>
    </div>
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-1">Data de Início</label>
      <input type="date" id="rec-data" required
             class="w-full px-3 py-2 border border-gray-300 rounded-lg"
             value="${e.dataInicio||new Date().toISOString().split("T")[0]}">
    </div>
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-1">Parcelas (opcional)</label>
      <input type="number" id="rec-parcelas" min="0"
             class="w-full px-3 py-2 border border-gray-300 rounded-lg"
             placeholder="Deixe vazio para infinito"
             value="${e.parcelasRestantes||""}">
    </div>
    <div id="recorrente-valores-info" class="text-xs text-gray-600"></div>
    <div class="flex items-center gap-2">
      <input type="checkbox" id="rec-efetivar" class="form-checkbox h-4 w-4 text-blue-600" />
      <label for="rec-efetivar" class="text-sm text-gray-700">Efetivar no mês atual</label>
    </div>
    <div class="flex justify-end space-x-3 pt-4">
      <button type="button" onclick="closeModal()" class="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg">Cancelar</button>
      <button type="submit" class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">Salvar</button>
    </div>
  `;function r(){const s=parseFloat(document.getElementById("rec-valor").value)||0,i=parseInt(document.getElementById("rec-parcelas").value)||0,a=t.querySelector('input[name="tipo-valor"]:checked').value,u=document.getElementById("recorrente-valores-info");if(i>1&&s>0)if(a==="total"){const d=s/i;u.innerHTML=`<b>Valor total:</b> R$ ${s.toFixed(2)} &nbsp; | &nbsp; <b>Valor por parcela:</b> R$ ${d.toFixed(2)}`}else{const d=s*i;u.innerHTML=`<b>Valor total:</b> R$ ${d.toFixed(2)} &nbsp; | &nbsp; <b>Valor por parcela:</b> R$ ${s.toFixed(2)}`}else s>0?u.innerHTML=`<b>Valor:</b> R$ ${s.toFixed(2)}`:u.innerHTML=""}return t.querySelector("#rec-valor").addEventListener("input",r),t.querySelector("#rec-parcelas").addEventListener("input",r),t.querySelectorAll('input[name="tipo-valor"]').forEach(s=>{s.addEventListener("change",r)}),setTimeout(r,0),t.addEventListener("submit",s=>{s.preventDefault();const i=parseFloat(document.getElementById("rec-valor").value);let a=document.getElementById("rec-parcelas").value?parseInt(document.getElementById("rec-parcelas").value):null;a!==null&&a<1&&(a=null);const u=t.querySelector('input[name="tipo-valor"]:checked').value;let d=i,f=i;a&&a>1?u==="total"?(d=+(i/a).toFixed(2),f=+(d.toFixed(2)*a).toFixed(2)):(d=+i.toFixed(2),f=+(d*a).toFixed(2)):(d=+i.toFixed(2),f=+i.toFixed(2));const c={descricao:document.getElementById("rec-desc").value,valor:d,valorTotal:f,categoriaId:document.getElementById("rec-categoria").value,dataInicio:document.getElementById("rec-data").value,parcelasRestantes:a,ativa:!0,efetivarMesAtual:document.getElementById("rec-efetivar").checked};n(c)}),t}function q({message:n,type:e="info",duration:t=3e3}){const r=document.createElement("div");r.className=`fixed bottom-6 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-lg shadow-lg text-white z-50
    ${e==="success"?"bg-green-600":e==="error"?"bg-red-600":"bg-gray-800"}`,r.textContent=n,document.body.appendChild(r),setTimeout(()=>{r.classList.add("opacity-0"),setTimeout(()=>r.remove(),500)},t)}window.showAddRecorrenteModal=function(n={}){const e=!!n&&Object.keys(n).length>0,t=De({title:e?"Editar Despesa Recorrente":"Nova Despesa Recorrente",content:"",onClose:()=>t.remove()}),r=window.FirebaseAuth.currentUser,s=window.appState.currentBudget;if(!r){q({message:"Você precisa estar logado para adicionar recorrentes.",type:"error"});return}if(!s){q({message:"Selecione um orçamento antes de adicionar recorrentes.",type:"error"});return}const i=gv({initialData:n,onSubmit:async u=>{try{if(document.querySelector(".fab")?.classList.add("hidden"),console.log("Iniciando adição de recorrente"),e&&n.id)await xh(r.uid,n.id,u),console.log("Recorrente editada, aguardando delay");else{const d=await pv(r.uid,s.id,u);if(u.efetivarMesAtual){const f=new Date,c=f.getMonth()+1,w=f.getFullYear(),_=window.FirebaseDB,x=fe(_,"transactions");(await et(Mt(x,Fe("userId","==",r.uid),Fe("recorrenteId","==",d.id||d._key&&d._key.path.segments?.slice(-1)[0])))).docs.some(P=>{const M=P.data(),F=M.createdAt&&M.createdAt.toDate?M.createdAt.toDate():M.createdAt?new Date(M.createdAt):null;return F&&F.getMonth()+1===c&&F.getFullYear()===w})||await Vn(fe(window.FirebaseDB,"transactions"),{userId:r.uid,budgetId:s.id,descricao:u.descricao,valor:u.valor,categoriaId:u.categoriaId,tipo:"despesa",createdAt:f,recorrenteId:d.id||d._key&&d._key.path.segments?.slice(-1)[0]})}}console.log("Recorrente adicionada, aguardando delay"),await new Promise(d=>setTimeout(d,200)),console.log("Delay concluído, carregando recorrentes"),await window.loadRecorrentes(),t.remove(),setTimeout(()=>{document.querySelector(".fab")?.classList.remove("hidden"),window.location.hash.includes("recorrentes")?window._renderRecorrentes():window.location.hash.includes("dashboard")&&window.renderDashboard(),q({message:e?"Despesa recorrente editada!":"Despesa recorrente salva!",type:"success"}),document.dispatchEvent(new CustomEvent("recorrente-adicionada"))},50)}catch(d){document.querySelector(".fab")?.classList.remove("hidden"),console.error("Erro ao adicionar/editar recorrente:",d),q({message:"Erro ao salvar recorrente",type:"error"})}}}),a=t.querySelector(".modal-body");a?a.appendChild(i):t.appendChild(i),document.body.appendChild(t)};function Sh(n="theme-toggle-btn"){const e=window.matchMedia("(prefers-color-scheme: dark)").matches,t=document.documentElement,r=localStorage.getItem("theme"),s=r?r==="dark":e;t.classList.toggle("dark",s),a();const i=document.getElementById(n);i&&i.addEventListener("click",()=>{const u=t.classList.toggle("dark");localStorage.setItem("theme",u?"dark":"light"),a()});function a(){const u=document.getElementById("theme-icon");u&&(u.textContent=t.classList.contains("dark")?"🌙":"☀️")}}function On(n="#app-content"){let e=0,t=0;const r=50,s=["/dashboard","/transactions","/categories","/recorrentes","/settings"];function i(){const u=document.querySelector(".nav-btn.active")?.getAttribute("data-route"),d=s.indexOf(u);t<e-r&&d<s.length-1&&router(s[d+1]),t>e+r&&d>0&&router(s[d-1])}const a=document.querySelector(n);a&&(a.addEventListener("touchstart",u=>{e=u.changedTouches[0].screenX}),a.addEventListener("touchend",u=>{t=u.changedTouches[0].screenX,i()}))}async function yv(){const n=new it;return(await vw(Ge,n)).user}async function _v(n,e){const t=fe(ne,"users",n,"transacoes");return await Vn(t,e)}async function wv(n,e,t){const r=fe(ne,"users",n,"historicoMensal"),s=t.toISOString().slice(0,7);await c_(nt(r,s),{transacoes:e,dataFechamento:t.toISOString()})}async function vv(n){const e=fe(ne,"users",n,"transacoes"),t=await et(e),r=d_(ne);t.forEach(s=>r.delete(s.ref)),await r.commit()}async function Rh(n){const e=fe(ne,"users",n,"despesasRecorrentes");return(await et(e)).docs.map(r=>({id:r.id,...r.data()}))}async function tu(n,e,t){const r=nt(ne,"users",n,"despesasRecorrentes",e);await Dr(r,t)}function bv({titulo:n,valor:e,cor:t="",icone:r=""}){const s=document.createElement("div");switch(s.className="card-resumo",t){case"card-resumo receita":s.style.background="linear-gradient(90deg, #22c55e 80%, #16a34a 100%)",s.style.color="#fff";break;case"card-resumo despesa":s.style.background="linear-gradient(90deg, #ef4444 80%, #b91c1c 100%)",s.style.color="#fff";break;case"card-resumo saldo":s.style.background="linear-gradient(90deg, #3b82f6 80%, #1d4ed8 100%)",s.style.color="#fff";break;case"card-resumo orcado":s.style.background="linear-gradient(90deg, #eab308 80%, #f59e42 100%)",s.style.color="#fff";break;default:s.style.background="#fff",s.style.color="#222"}return s.innerHTML=`
    <div class="icon-bg">${r}</div>
    <div>
      <div class="titulo">${n}</div>
      <div class="valor">${e}</div>
    </div>
  `,s}function Ev(){const n=document.createElement("div");return n.className="fixed bottom-5 right-5 flex flex-col items-end z-50 fab",n.style.zIndex="2001",n.style.bottom="70px",n.innerHTML=`
    <div id="fab-actions" class="hidden mb-2 space-y-3 transition-all duration-300">
      <button id="fab-transacao" class="bg-blue-600 text-white px-4 py-2 rounded-xl shadow-xl text-sm hover:bg-blue-700 transition">
        ➕ Nova Transação
      </button>
      <button id="fab-recorrente" class="bg-purple-600 text-white px-4 py-2 rounded-xl shadow-xl text-sm hover:bg-purple-700 transition">
        ♻️ Nova Recorrente
      </button>
    </div>
    <button id="fab-main" class="bg-gradient-to-tr from-indigo-500 to-blue-500 text-white w-16 h-16 rounded-full shadow-2xl text-3xl hover:scale-105 transform transition">
      +
    </button>
  `,setTimeout(()=>{const e=n.querySelector("#fab-main"),t=n.querySelector("#fab-actions"),r=n.querySelector("#fab-transacao"),s=n.querySelector("#fab-recorrente");e.addEventListener("click",()=>{t.classList.toggle("hidden")}),r.addEventListener("click",()=>{window.showAddTransactionModal(),t.classList.add("hidden")}),s.addEventListener("click",()=>{window.showAddRecorrenteModal(),t.classList.add("hidden")})},100),n}function Tv(n){const e=document.createElement("nav");return e.className="fixed bottom-0 inset-x-0 bg-white dark:bg-gray-900 border-t border-gray-300 dark:border-gray-700 flex justify-around py-2 z-50 text-xs sm:text-sm",[{icon:"📊",label:"Dashboard",route:"/dashboard"},{icon:"💸",label:"Transações",route:"/transactions"},{icon:"📂",label:"Categorias",route:"/categories"},{icon:"♻️",label:"Recorrentes",route:"/recorrentes"},{icon:"⚙️",label:"Config.",route:"/settings"}].forEach(r=>{const s=document.createElement("button");s.className="nav-btn flex flex-col items-center gap-0.5 px-2 py-1 md:px-4 md:py-2 text-gray-500 dark:text-gray-400 hover:text-blue-500 transition-all duration-200",n===r.route&&(s.className+=" bg-blue-200 text-blue-700 font-semibold rounded-xl px-4 py-2 shadow-md scale-105 active"),s.setAttribute("data-route",r.route),s.innerHTML=`<span class="text-xl">${r.icon}</span><span>${r.label}</span>`,s.addEventListener("click",()=>{document.querySelectorAll(".nav-btn").forEach(i=>i.classList.remove("active","bg-blue-200","text-blue-700","font-semibold","rounded-xl","px-4","py-2","shadow-md","scale-105")),s.className+=" bg-blue-200 text-blue-700 font-semibold rounded-xl px-4 py-2 shadow-md scale-105 active",window.router&&window.router(r.route)}),e.appendChild(s)}),e}async function Iv(n){if(!confirm("Tem certeza que deseja excluir esta despesa recorrente?"))return;const e=window.FirebaseAuth?.currentUser;e&&(await mv(e.uid,n),q({message:"Recorrente excluída com sucesso.",type:"success"}),await window.loadRecorrentes(),li())}function Av(n){const e=window.FirebaseAuth?.currentUser;e&&(xh(e.uid,n.id,{ativa:!n.ativa}),q({message:"Status atualizado com sucesso.",type:"info"}),window.loadRecorrentes().then(li))}window.handleDeleteRecorrente=Iv;window.handleToggleRecorrente=Av;async function Ch(n){const e=window.FirebaseAuth?.currentUser;if(!e){q({message:"Usuário não autenticado.",type:"error"});return}const t=(window.appState.recorrentes||[]).find(u=>u.id===n),r=t?t.descricao:"",s=ti();let i=[];const a=De({title:`Histórico de ${r}`,content:`<div class='flex flex-col items-center py-8'>
      <div class='loader mb-4'></div>
      <div>Carregando histórico...</div>
      <button onclick='closeModal()' class='mt-6 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600'>Fechar</button>
    </div>`});document.body.appendChild(a);try{const u=fe(s,"transactions");i=(await et(Mt(u,Fe("userId","==",e.uid),Fe("recorrenteId","==",n)))).docs.map(_=>({..._.data(),id:_.id}));const f=new Date,c=f.getFullYear(),w=f.getMonth()+1;for(let _=2023;_<=c;_++){const x=_===c?w:12;for(let C=1;C<=x;C++){const D=String(C).padStart(2,"0"),P=fe(s,"users",e.uid,"historico",`${_}-${D}`,"transacoes"),M=await et(Mt(P,Fe("recorrenteId","==",n)));i=i.concat(M.docs.map(F=>F.data()))}}i.sort((_,x)=>(_.createdAt?.seconds||0)-(x.createdAt?.seconds||0)),console.log("[DEBUG] Histórico recorrente",{recorrenteId:n,transacoes:i,userId:e.uid,budgetId:window.appState.currentBudget?.id}),a.querySelector(".modal-body").innerHTML=`
      <div class='space-y-2'>
        <div class='text-xs text-gray-400'>Recorrente ID: <b>${n}</b></div>
        ${i.length===0?'<p class="text-gray-500">Nenhuma aplicação encontrada.<br>Verifique se a recorrente foi efetivada neste mês, se o orçamento selecionado é o mesmo e se o campo <b>recorrenteId</b> está correto na transação.</p>':i.map(_=>`
            <div class='flex justify-between items-center border-b pb-1'>
              <span>${_.descricao||""}</span>
              <span class='text-xs text-gray-500'>${_.createdAt?.seconds?new Date(_.createdAt.seconds*1e3).toLocaleDateString():""}</span>
              <span class='font-bold ${_.tipo==="receita"?"text-green-600":"text-red-600"}'>${_.tipo==="receita"?"+":"-"}R$ ${parseFloat(_.valor).toFixed(2)}</span>
              <span class='text-xs text-gray-400 ml-2'>ID: ${_.id||"-"}</span>
            </div>
          `).join("")}
      </div>
      <div class='flex justify-center mt-6'>
        <button onclick='closeModal()' class='px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600'>Fechar</button>
      </div>
    `}catch(u){a.querySelector(".modal-body").innerHTML=`<div class='text-red-600 text-center mt-4'>Erro ao carregar histórico. Tente novamente.</div>
      <div class='flex justify-center mt-6'>
        <button onclick='closeModal()' class='px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600'>Fechar</button>
      </div>`,q({message:"Erro ao carregar histórico: "+(u.message||u),type:"error"})}}window.showHistoricoRecorrente=Ch;function xv(n,e){try{const t=new Date,r=new Date(n),s=t.getMonth()>r.getMonth()?t.getFullYear():r.getFullYear(),i=t.getMonth()+(e<=t.getDate()?1:0);return new Date(s,i,e)}catch{return new Date}}function li(){const n=window.FirebaseAuth?.currentUser,e=window.appState?.currentBudget,t=document.getElementById("app-content");if(t.innerHTML=`
    <div class="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-2 md:p-6 border border-gray-300 dark:border-gray-700">
      <div class="flex flex-wrap justify-between items-center gap-1 md:gap-0 mb-4">
        <h2 class="tab-title-highlight bg-white dark:bg-gray-900 rounded-2xl px-6 py-2 shadow text-gray-900 dark:text-white">Despesas Recorrentes</h2>
        <button onclick="window.showAddRecorrenteModal()" class="bg-blue-500 text-white px-2 py-1 md:px-6 md:py-3 rounded-lg hover:bg-blue-600 flex items-center space-x-2 text-xs md:text-base font-semibold font-inter shadow-md">
          <span>+ Nova Recorrente</span>
        </button>
      </div>
      <div id="recorrentes-list" class="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-6"></div>
    </div>
  `,!n||!e){document.getElementById("recorrentes-list").innerHTML='<p class="text-gray-500 dark:text-gray-300">Nenhum usuário ou orçamento ativo.</p>';return}const r=window.appState.recorrentes||[],s=window.appState.transactions||[],i=new Date,a=i.getFullYear(),u=i.getMonth()+1,d=s.filter(c=>c.recorrenteId&&new Date(c.createdAt).getFullYear()===a&&new Date(c.createdAt).getMonth()+1===u).map(c=>c.recorrenteId),f=document.getElementById("recorrentes-list");if(!r.length){f.innerHTML='<p class="text-gray-500 dark:text-gray-300">Nenhuma despesa recorrente cadastrada.</p>';return}f.innerHTML="",r.forEach(c=>{const w=d.includes(c.id),x=xv(c.dataInicio,c.diaLancamento||1).toLocaleDateString("pt-BR"),C=new Date(c.dataInicio),D=C.getFullYear(),P=C.getMonth()+1;let M=(a-D)*12+(u-P);!c.efetivarMesAtual&&(a>D||a===D&&u>P)&&(M-=1);const F=c.parcelasRestantes!==null&&c.parcelasRestantes!==void 0?c.parcelasRestantes-M:null,j=c.parcelasRestantes!==null&&c.parcelasRestantes!==void 0?c.parcelasRestantes-F+1:null,ee=document.createElement("div");ee.className="border border-gray-300 dark:border-gray-700 rounded-lg p-2 md:p-4 bg-white dark:bg-gray-900";const me=parseFloat(c.valor),ue=c.valorTotal?parseFloat(c.valorTotal):c.parcelasRestantes&&c.parcelasRestantes>1?me*c.parcelasRestantes:me;ee.innerHTML=`
      <div class="flex items-center space-x-2 md:space-x-3 mb-2">
        <div class="w-4 h-4 rounded-full" style="background-color: ${c.cor||"#4F46E5"}"></div>
        <span class="font-semibold text-xs md:text-base text-gray-900 dark:text-gray-100">${c.descricao}</span>
      </div>
      <p class="text-xs md:text-sm text-gray-500 dark:text-gray-300">Valor da parcela: R$ ${me.toFixed(2)}${c.parcelasRestantes&&c.parcelasRestantes>1?` &nbsp;|&nbsp; <span class='text-gray-400'>Total: R$ ${ue.toFixed(2)}</span>`:""}</p>
      <p class="text-xs md:text-sm text-gray-500 dark:text-gray-300">Categoria: ${c.categoriaId||"Sem categoria"}</p>
      <p class="text-xs md:text-sm text-gray-500 dark:text-gray-300">${F===null?"Infinito":`Parcela ${j} de ${c.parcelasRestantes}`}</p>
      ${c.ativa!==!1&&!w?`<p class="text-xs text-green-500 mb-2">Próxima aplicação: ${x}</p>`:w?'<p class="text-xs text-blue-500 mb-2">Efetivada este mês</p>':""}
      <div class="flex flex-wrap justify-end gap-1 md:space-x-2 mt-2">
        <button class="text-blue-600 hover:text-blue-800 text-xs md:text-sm px-2 py-1 md:px-3 md:py-1 rounded" onclick="window.showAddRecorrenteModal(${JSON.stringify(c).replace(/\"/g,"&quot;")})">Editar</button>
        <button class="text-red-600 hover:text-red-800 text-xs md:text-sm px-2 py-1 md:px-3 md:py-1 rounded" onclick="window.handleDeleteRecorrente('${c.id}')">Excluir</button>
        <button class="text-yellow-500 hover:text-yellow-700 text-xs md:text-sm px-2 py-1 md:px-3 md:py-1 rounded" onclick='window.handleToggleRecorrente(${JSON.stringify(c).replace(/\"/g,"&quot;")})'>${c.ativa===!1?"Ativar":"Pausar"}</button>
        <button class="text-gray-600 hover:text-gray-800 dark:text-gray-300 text-xs md:text-sm px-2 py-1 md:px-3 md:py-1 rounded" onclick="window.showHistoricoRecorrente('${c.id}')">Histórico</button>
      </div>
    `,f.appendChild(ee)})}function Sv(){document.getElementById("drawer-menu")?.remove(),document.getElementById("drawer-overlay")?.remove();const n=document.createElement("div");n.id="drawer-overlay",n.style="position: fixed; inset: 0; background: rgba(0,0,0,0.25); z-index: 49; display: none;",n.tabIndex=-1,n.setAttribute("aria-label","Fechar menu lateral"),n.addEventListener("click",()=>Io(!1)),document.body.appendChild(n);const e=document.createElement("div");e.id="drawer-menu",e.className="fixed inset-y-0 left-0 w-64 bg-white dark:bg-gray-900 shadow-lg z-50 transform -translate-x-full transition-transform duration-300 border-r border-gray-300 dark:border-gray-700",e.setAttribute("role","navigation"),e.setAttribute("aria-label","Menu lateral"),e.innerHTML=`
    <div class="p-4 border-b border-gray-300 dark:border-gray-700 text-lg font-semibold text-gray-900 dark:text-gray-100">
      📱 Financeiro App
    </div>
    <nav class="flex flex-col text-sm p-4 space-y-3">
      <button class="text-left hover:text-blue-600 text-gray-900 dark:text-gray-100 bg-transparent dark:bg-transparent" onclick="router('/dashboard')">📊 Dashboard</button>
      <button class="text-left hover:text-blue-600 text-gray-900 dark:text-gray-100 bg-transparent dark:bg-transparent" onclick="router('/transactions')">💸 Transações</button>
      <button class="text-left hover:text-blue-600 text-gray-900 dark:text-gray-100 bg-transparent dark:bg-transparent" onclick="router('/categories')">📂 Categorias</button>
      <button class="text-left hover:text-blue-600 text-gray-900 dark:text-gray-100 bg-transparent dark:bg-transparent" onclick="router('/recorrentes')">♻️ Recorrentes</button>
      <button class="text-left hover:text-blue-600 text-gray-900 dark:text-gray-100 bg-transparent dark:bg-transparent" onclick="window.renderLogAplicacoes && window.renderLogAplicacoes()">📆 Log de Aplicações</button>
      <button class="text-left hover:text-blue-600 text-gray-900 dark:text-gray-100 bg-transparent dark:bg-transparent" onclick="window.showExportOptions && window.showExportOptions()">📤 Exportar Dados</button>
      <button class="text-left hover:text-blue-600 text-gray-900 dark:text-gray-100 bg-transparent dark:bg-transparent" onclick="FirebaseAuth.signOut().then(() => router('/'))">🚪 Sair</button>
    </nav>
  `,document.body.appendChild(e),e.querySelectorAll("button").forEach(t=>{t.addEventListener("click",()=>Io(!1))})}function Io(n){const e=document.getElementById("drawer-menu"),t=document.getElementById("drawer-overlay");if(!e||!t)return;const r=!e.classList.contains("-translate-x-full");(n===void 0?!r:n)?(e.classList.remove("-translate-x-full"),t.style.display="block",setTimeout(()=>e.querySelector("button")?.focus(),200)):(e.classList.add("-translate-x-full"),t.style.display="none")}async function Rv(){const n=window.FirebaseAuth?.currentUser,e=document.getElementById("app-content");if(e.innerHTML='<h2 class="text-xl font-bold mb-4">Log de Aplicações Automáticas</h2>',!n){e.innerHTML+='<p class="text-gray-500">Usuário não autenticado.</p>';return}const t=new Date,r=t.getFullYear(),s=String(t.getMonth()+1).padStart(2,"0"),i=`${r}-${s}`,a=fe(ne,"users",n.uid,"logs",i,"itens"),u=await et(a);if(u.empty){e.innerHTML+='<p class="text-gray-500">Nenhum log encontrado para este mês.</p>';return}const d=document.createElement("div");d.className="space-y-3",u.forEach(f=>{const c=f.data(),w=document.createElement("div");w.className="p-3 rounded-lg shadow bg-white dark:bg-gray-800 flex justify-between items-start",w.innerHTML=`
      <div>
        <p class="font-semibold">${c.descricao}</p>
        <p class="text-sm text-gray-500">R$ ${parseFloat(c.valor).toFixed(2)} • ${c.categoriaId||"Sem categoria"}</p>
        <p class="text-xs text-gray-400">Aplicado em: ${c.createdAt?.seconds?new Date(c.createdAt.seconds*1e3).toLocaleDateString():"-"}</p>
      </div>
    `,d.appendChild(w)}),e.appendChild(d)}window._renderRecorrentes=li;window.showHistoricoRecorrente=Ch;window.renderLogAplicacoes=Rv;window.FirebaseApp=Ta;window.FirebaseAuth=Ge;window.FirebaseDB=ne;window.appState={currentUser:null,transactions:[],categories:[],budgets:[],currentBudget:null,recorrentes:[]};function _r(n){const e=document.getElementById("login-page"),t=document.querySelector(".app-container");n?(e&&(e.style.display="flex",document.body.classList.add("login-open")),t&&(t.style.display="none")):(e&&(e.style.display="none",document.body.classList.remove("login-open")),t&&(t.style.display="block"))}async function on(){const n=document.querySelector(".nav-item.active")?.getAttribute("data-tab");if(n)switch(n){case"dashboard":await tn(),await Be(),await wr(),le();break;case"transactions":await tn(),Aa();break;case"categories":await Be(),kh();break;case"settings":await wr(),renderSettings();break}}async function Cv(n){try{const e=Ge.currentUser;if(!e)throw new Error("Usuário não autenticado");const t=window.appState.currentBudget?.id;if(!t)throw new Error("Nenhum orçamento selecionado");const r=await Vn(fe(ne,"transactions"),{...n,userId:e.uid,budgetId:t,createdAt:ha()});return await on(),le(),r}catch(e){throw q({message:"Erro ao adicionar transação: "+e.message,type:"error"}),e}}async function Pv(n,e){try{const t=nt(ne,"transactions",n);await Dr(t,e),await on(),le()}catch(t){throw t}}async function Ph(n){try{const e=nt(ne,"transactions",n);await da(e),await on(),le()}catch(e){throw e}}async function tn(){try{const n=Ge.currentUser;if(!n)return;const e=Mt(fe(ne,"transactions"),Fe("userId","==",n.uid),Fe("budgetId","==",window.appState.currentBudget?.id)),t=await et(e);window.appState.transactions=t.docs.map(r=>({id:r.id,...r.data()}))}catch(n){console.error("Erro ao carregar transações:",n)}}async function kv(n){try{const e=Ge.currentUser;if(!e)throw new Error("Usuário não autenticado");const t=window.appState.currentBudget?.id;if(!t)throw new Error("Nenhum orçamento selecionado");const r=await Vn(fe(ne,"categories"),{...n,nome:nr(n.nome),userId:e.uid,budgetId:t,createdAt:ha()});return await on(),await Be(),le(),r}catch(e){throw q({message:"Erro ao adicionar categoria: "+e.message,type:"error"}),e}}async function Dv(n,e){try{const t=nt(ne,"categories",n);await Dr(t,e),await on(),le()}catch(t){throw t}}async function Vv(n){try{const e=nt(ne,"categories",n);await da(e),await on(),await Be(),le()}catch(e){throw e}}async function Be(){try{const n=Ge.currentUser;if(!n)return;const e=Mt(fe(ne,"categories"),Fe("userId","==",n.uid),Fe("budgetId","==",window.appState.currentBudget?.id)),t=await et(e);window.appState.categories=t.docs.map(r=>({id:r.id,...r.data()}))}catch(n){console.error("Erro ao carregar categorias:",n)}}async function Ia(n){try{const e=Ge.currentUser;if(!e)throw new Error("Usuário não autenticado");const t=await Vn(fe(ne,"budgets"),{...n,userId:e.uid,createdAt:ha()});return await on(),t.id}catch(e){throw q({message:"Erro ao adicionar orçamento: "+e.message,type:"error"}),e}}async function wr(){try{const n=Ge.currentUser;if(!n)return;const e=Mt(fe(ne,"budgets"),Fe("userId","==",n.uid)),t=await et(e);window.appState.budgets=t.docs.map(r=>({id:r.id,...r.data()}))}catch(n){console.error("Erro ao carregar orçamentos:",n)}}function Us(n){window.appState.currentBudget=n,Vh(),Bv()}async function Nv(n,e,t){const r=new Date;if(e===r.getFullYear()&&t===r.getMonth()+1)return window.appState.transactions;const s=String(t).padStart(2,"0"),i=`${e}-${s}`,a=ti(),u=fe(a,"users",n,"historico",i,"transacoes");return(await et(u)).docs.map(f=>f.data())}async function le(n,e){try{const t=document.getElementById("app-content");if(!t)return;t.innerHTML="";let r=new Date,s=n||r.getFullYear(),i=e||r.getMonth()+1;const a=["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"];t.innerHTML+=`
      <div id="mes-selector" class="flex items-center justify-center gap-4 mb-4">
        <button id="mes-anterior" class="text-blue-600 bg-blue-100 rounded-full w-8 h-8 flex items-center justify-center text-xl hover:bg-blue-200">&#8592;</button>
        <span class="font-bold text-lg">${a[i-1]} ${s}</span>
        <button id="mes-proximo" class="text-blue-600 bg-blue-100 rounded-full w-8 h-8 flex items-center justify-center text-xl hover:bg-blue-200">&#8594;</button>
      </div>
    `;const u=window.appState.currentUser,d=u?await Nv(u.uid,s,i):[],f=d.filter(g=>g.tipo==="receita").reduce((g,m)=>g+parseFloat(m.valor),0),c=d.filter(g=>g.tipo==="despesa").reduce((g,m)=>g+parseFloat(m.valor),0),w=s,_=i,x=window.appState.recorrentes||[],C=d.filter(g=>g.recorrenteId),D=x.filter(g=>{if(C.some(T=>T.recorrenteId===g.id))return!1;const y=new Date(g.dataInicio),b=y.getFullYear(),E=y.getMonth()+1;if(w<b||w===b&&_<E||!g.efetivarMesAtual&&w===b&&_===E)return!1;if(g.parcelasRestantes!==null&&g.parcelasRestantes!==void 0){let T=(w-b)*12+(_-E);return!g.efetivarMesAtual&&(w>b||w===b&&_>E)&&(T-=1),g.parcelasRestantes-T>0}return!0}),P=D.reduce((g,m)=>g+parseFloat(m.valor),0),M=c+P,F=f-M,ee=window.appState.categories.reduce((g,m)=>g+parseFloat(m.limite||0),0)-M;t.innerHTML+='<div id="dashboard-cards" class="grid grid-cols-4 gap-1 md:gap-4 mb-4"></div>';const me=document.getElementById("dashboard-cards");me.innerHTML="",[{titulo:"Receitas",valor:`R$ ${f.toFixed(2)}`,cor:"card-resumo receita",icone:'<svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path d="M12 3v18m9-9H3" stroke="#22c55e" stroke-width="2" stroke-linecap="round"/></svg>'},{titulo:"Despesas",valor:`R$ ${M.toFixed(2)}`,cor:"card-resumo despesa",icone:'<svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path d="M3 12h18" stroke="#ef4444" stroke-width="2" stroke-linecap="round"/></svg>'},{titulo:"Saldo",valor:`R$ ${F.toFixed(2)}`,cor:"card-resumo saldo",icone:'<svg width="24" height="24" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="#3b82f6" stroke-width="2"/></svg>'},{titulo:"Orçado",valor:`R$ ${ee.toFixed(2)}`,cor:"card-resumo orcado",icone:'<svg width="24" height="24" fill="none" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="4" stroke="#eab308" stroke-width="2"/></svg>'}].forEach(g=>{me.appendChild(bv(g))}),t.innerHTML+='<div class="h-6"></div>',t.innerHTML+=`
      <div class="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-2 md:p-6 border border-gray-300 dark:border-gray-700">
        <h3 class="text-base md:text-xl font-bold mb-2 md:mb-4 text-gray-900 dark:text-gray-100">Categorias</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-6">
          ${window.appState.categories.map(g=>{const y=(window.appState.transactions||[]).filter(v=>v.categoriaId===g.id&&v.tipo==="despesa").reduce((v,ge)=>v+parseFloat(ge.valor),0),b=parseFloat(g.limite||0),E=b>0?y/b*100:0,T=b-y;return`
              <div class="border border-gray-300 dark:border-gray-700 rounded-lg p-2 md:p-4 bg-white dark:bg-gray-900">
                <div class="flex items-center space-x-2 md:space-x-3 mb-2">
                  <div class="w-4 h-4 rounded-full" style="background-color: ${g.cor||"#4F46E5"}"></div>
                  <span class="font-semibold text-xs md:text-base text-gray-900 dark:text-gray-100">${g.nome}</span>
                </div>
                <p class="text-xs md:text-sm text-gray-500 dark:text-gray-300">Tipo: ${g.tipo}</p>
                <p class="text-xs md:text-sm text-gray-500 dark:text-gray-300">Limite: R$ ${g.limite||"0,00"}</p>
                <div class="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-2 md:h-3 mb-1 md:mb-2">
                  <div class="h-2 md:h-3 rounded-full transition-all duration-300 ${E>100?"bg-red-500":E>80?"bg-yellow-500":"bg-green-500"}" style="width: ${Math.min(E,100)}%"></div>
                </div>
                <div class="flex flex-wrap justify-end gap-1 md:space-x-2 mt-2">
                  <button onclick="editCategory('${g.id}')" class="text-blue-600 hover:text-blue-800 text-xs md:text-sm px-2 py-1 md:px-3 md:py-1 rounded">Editar</button>
                  <button onclick="deleteCategory('${g.id}')" class="text-red-600 hover:text-red-800 text-xs md:text-sm px-2 py-1 md:px-3 md:py-1 rounded">Excluir</button>
                  <button onclick="showCategoryHistory('${g.id}')" class="text-gray-600 hover:text-gray-800 text-xs md:text-sm px-2 py-1 md:px-3 md:py-1 rounded">Histórico</button>
                </div>
              </div>
            `}).join("")}
        </div>
      </div>
    `,t.innerHTML+='<div class="h-6"></div>',t.innerHTML+=`
      <div class="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-4 flex flex-col gap-2 md:p-6 mb-4 border border-gray-300 dark:border-gray-700">
        <div class="flex flex-wrap justify-between items-center mb-2 md:mb-4 gap-1 md:gap-0">
          <h3 class="text-base md:text-xl font-bold text-gray-900 dark:text-gray-100 font-inter">Despesas Recorrentes do Mês</h3>
          <button onclick="window.showAddRecorrenteModal()" class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 text-sm font-semibold font-inter">
            + Nova Despesa Recorrente
          </button>
        </div>
        <div class="space-y-2 md:space-y-3">
          ${C.length===0&&D.length===0?"<p class='text-gray-500 text-center py-4 font-inter dark:text-gray-300'>Nenhuma despesa recorrente aplicada ou agendada neste mês</p>":""}
          ${C.map(g=>{const m=(window.appState.categories||[]).find(y=>y.id===g.categoriaId);return`
              <div class="flex flex-wrap justify-between items-center p-2 md:p-3 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 gap-1 md:gap-0 bg-white dark:bg-gray-900 shadow font-inter">
                <div class="flex-1 min-w-[120px]">
                  <p class="font-medium text-xs md:text-base text-gray-900 dark:text-gray-100">✔️ ${g.descricao}</p>
                  <p class="text-xs md:text-sm text-gray-500 dark:text-gray-300">
                    ${m?.nome||"Sem categoria"}
                    • R$ ${parseFloat(g.valor).toFixed(2)}
                    ${g.parcelasRestantes!==void 0?`• ${g.parcelasRestantes}x restantes`:""}
                  </p>
                </div>
              </div>
            `}).join("")}
          ${D.map(g=>{const m=(window.appState.categories||[]).find(Ut=>Ut.id===g.categoriaId),y=new Date(g.dataInicio),b=y.getFullYear(),E=y.getMonth()+1;let T=(w-b)*12+(_-E);!g.efetivarMesAtual&&(w>b||w===b&&_>E)&&(T-=1);const v=g.parcelasRestantes!==null&&g.parcelasRestantes!==void 0?g.parcelasRestantes-T:null,ge=g.parcelasRestantes!==null&&g.parcelasRestantes!==void 0?g.parcelasRestantes-v+1:null;return`
              <div class="flex flex-wrap justify-between items-center p-2 md:p-3 border border-dashed border-yellow-400 rounded-lg bg-yellow-50 dark:bg-yellow-900/10 gap-1 md:gap-0 shadow font-inter">
                <div class="flex-1 min-w-[120px]">
                  <p class="font-medium text-xs md:text-base text-yellow-700 dark:text-yellow-300">⏳ ${g.descricao}</p>
                  <p class="text-xs md:text-sm text-gray-500 dark:text-gray-300">
                    ${m?.nome||"Sem categoria"}
                    • R$ ${parseFloat(g.valor).toFixed(2)}
                    ${v!==null?`• Parcela ${ge} de ${g.parcelasRestantes}`:"• recorrente"}
                  </p>
                </div>
              </div>
            `}).join("")}
        </div>
      </div>
    `,t.innerHTML+='<div class="h-6"></div>',t.innerHTML+=`
      <div class="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-2 md:p-6 border border-gray-300 dark:border-gray-700">
        <div class="flex flex-wrap justify-between items-center mb-2 md:mb-4 gap-1 md:gap-0">
          <h3 class="text-base md:text-xl font-bold text-gray-900 dark:text-gray-100">Transações Recentes</h3>
          <button onclick="showAddTransactionModal()" class="bg-blue-500 text-white px-2 py-1 md:px-4 md:py-2 rounded-lg hover:bg-blue-600 text-xs md:text-base">
            + Nova Transação
          </button>
        </div>
        <div class="space-y-2 md:space-y-3">
          ${d.slice(0,10).map(g=>{const m=window.appState.categories.find(b=>b.id===g.categoriaId);let y="";if(g.recorrenteId){const b=(window.appState.recorrentes||[]).find(E=>E.id===g.recorrenteId);if(b){let E=1;if(b.dataInicio&&g.createdAt){const v=new Date(b.dataInicio),ge=g.createdAt&&g.createdAt.toDate?g.createdAt.toDate():g.createdAt?new Date(g.createdAt):null;ge&&(E=(ge.getFullYear()-v.getFullYear())*12+(ge.getMonth()-v.getMonth())+1)}let T=b.parcelasRestantes!==null&&b.parcelasRestantes!==void 0?b.parcelasRestantes+E-1:"∞";y=`<span class='text-xs text-blue-500 ml-2'>Parcela ${E} de ${T}</span>`}}return`
              <div class="flex flex-wrap justify-between items-center p-2 md:p-3 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 gap-1 md:gap-0 bg-white dark:bg-gray-900">
                <div class="flex-1 min-w-[120px]">
                  <p class="font-medium text-xs md:text-base text-gray-900 dark:text-gray-100">${g.descricao}</p>
                  <p class="text-xs md:text-sm text-gray-500 dark:text-gray-300">${m?.nome||"Sem categoria"} • ${g.createdAt&&g.createdAt.toDate?g.createdAt.toDate().toLocaleDateString():g.createdAt?new Date(g.createdAt).toLocaleDateString():""} ${y}</p>
                </div>
                <div class="flex items-center space-x-1 md:space-x-2">
                  <span class="font-bold text-xs md:text-base ${g.tipo==="receita"?"text-green-600":"text-red-600"}">
                    ${g.tipo==="receita"?"+":"-"}R$ ${parseFloat(g.valor).toFixed(2)}
                  </span>
                  <button onclick="window.editTransaction && window.editTransaction('${g.id}')" class="text-blue-600 hover:text-blue-800 text-xs md:text-base ml-2">✏️</button>
                  <button onclick="window.deleteTransaction && window.deleteTransaction('${g.id}')" class="text-red-600 hover:text-red-800 text-xs md:text-base ml-2">🗑️</button>
                </div>
              </div>
            `}).join("")}
        </div>
      </div>
    `,Lr(),ui("/dashboard"),setTimeout(()=>On(),0),setTimeout(()=>{const g=document.getElementById("mes-anterior"),m=document.getElementById("mes-proximo");g&&g.replaceWith(g.cloneNode(!0)),m&&m.replaceWith(m.cloneNode(!0)),document.getElementById("mes-anterior")?.addEventListener("click",async()=>{let y=i-1,b=s;y<1&&(y=12,b--),await le(b,y)}),document.getElementById("mes-proximo")?.addEventListener("click",async()=>{let y=i+1,b=s;y>12&&(y=1,b++),await le(b,y)})},0)}catch(t){console.error("Erro ao renderizar dashboard:",t);const r=document.getElementById("app-content");r&&(r.innerHTML+="<div class='text-red-600 text-center mt-4'>Erro ao carregar dashboard. Tente novamente.</div>")}}window.renderDashboard=le;function Aa(){const n=document.getElementById("app-content");n.innerHTML=`
    <div class="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-2 md:p-6 border border-gray-300 dark:border-gray-700">
      <div class="flex flex-wrap justify-between items-center gap-1 md:gap-0 mb-4">
        <h2 class="tab-title-highlight bg-white text-gray-900 border border-gray-300 font-bold px-6 py-2 rounded-2xl shadow dark:bg-[#131826] dark:text-white dark:border-white">Transações</h2>
        <button onclick="showAddTransactionModal()" class="bg-blue-500 text-white px-2 py-1 md:px-6 md:py-3 rounded-lg hover:bg-blue-600 flex items-center space-x-2 text-xs md:text-base">
          <span>+ Nova Transação</span>
          <button onclick="startVoiceRecognition('transaction')" class="ml-2 bg-blue-600 p-1 md:p-2 rounded-full text-xs md:text-base">🎤</button>
        </button>
      </div>
      <div class="bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-300 dark:border-gray-700">
        ${window.appState.transactions.length===0?`
          <div class="p-4 md:p-8 text-center text-gray-500 dark:text-gray-300">
            <p class="text-base md:text-lg">Nenhuma transação encontrada</p>
            <p class="text-xs md:text-sm">Adicione sua primeira transação!</p>
          </div>
        `:window.appState.transactions.map(e=>{const t=window.appState.categories.find(r=>r.id===e.categoriaId);return`
            <div class="flex flex-wrap justify-between items-center p-2 md:p-4 border-b last:border-b-0 hover:bg-gray-50 dark:hover:bg-gray-800 gap-1 md:gap-0 bg-white dark:bg-gray-900">
              <div class="flex-1 min-w-[120px]">
                <p class="font-medium text-xs md:text-base text-gray-900 dark:text-gray-100">${e.descricao}</p>
                <p class="text-xs md:text-sm text-gray-500 dark:text-gray-300">${t?.nome||"Sem categoria"} • ${e.createdAt&&e.createdAt.toDate?e.createdAt.toDate().toLocaleDateString():""}</p>
              </div>
              <div class="flex items-center space-x-1 md:space-x-2">
                <span class="font-bold text-xs md:text-base ${e.tipo==="receita"?"text-green-600":"text-red-600"}">
                  ${e.tipo==="receita"?"+":"-"}R$ ${parseFloat(e.valor).toFixed(2)}
                </span>
                <button onclick="editTransaction('${e.id}')" class="text-blue-600 hover:text-blue-800 text-xs md:text-base ml-2">✏️</button>
                <button onclick="deleteTransaction('${e.id}')" class="text-red-600 hover:text-red-800 text-xs md:text-base ml-2">🗑️</button>
              </div>
            </div>
          `}).join("")}
      </div>
    </div>
  `,Lr(),ui("/transactions"),setTimeout(()=>On(),0)}function kh(){const n=document.getElementById("app-content");n.innerHTML=`
    <div class="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-2 md:p-6 border border-gray-300 dark:border-gray-700">
      <div class="flex flex-wrap justify-between items-center gap-1 md:gap-0 mb-4">
        <h2 class="tab-title-highlight bg-white text-gray-900 border border-gray-300 font-bold px-6 py-2 rounded-2xl shadow dark:bg-[#131826] dark:text-white dark:border-white">Categorias</h2>
        <button onclick="showAddCategoryModal()" class="bg-blue-500 text-white px-2 py-1 md:px-6 md:py-3 rounded-lg hover:bg-blue-600 flex items-center space-x-2 text-xs md:text-base">
          <span>+ Nova Categoria</span>
          <button onclick="startVoiceRecognition('category')" class="ml-2 bg-blue-600 p-1 md:p-2 rounded-full text-xs md:text-base">🎤</button>
        </button>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-6">
        ${window.appState.categories.map(e=>`
          <div class="border border-gray-300 dark:border-gray-700 rounded-lg p-2 md:p-4 bg-white dark:bg-gray-900">
            <div class="flex items-center space-x-2 md:space-x-3 mb-2">
              <div class="w-4 h-4 rounded-full" style="background-color: ${e.cor||"#4F46E5"}"></div>
              <span class="font-semibold text-xs md:text-base text-gray-900 dark:text-gray-100">${e.nome}</span>
            </div>
            <p class="text-xs md:text-sm text-gray-500 dark:text-gray-300">Tipo: ${e.tipo}</p>
            <p class="text-xs md:text-sm text-gray-500 dark:text-gray-300">Limite: R$ ${e.limite||"0,00"}</p>
            <div class="flex flex-wrap justify-end gap-1 md:space-x-2 mt-2">
              <button onclick="editCategory('${e.id}')" class="text-blue-600 hover:text-blue-800 text-xs md:text-sm px-2 py-1 md:px-3 md:py-1 rounded">Editar</button>
              <button onclick="deleteCategory('${e.id}')" class="text-red-600 hover:text-red-800 text-xs md:text-sm px-2 py-1 md:px-3 md:py-1 rounded">Excluir</button>
              <button onclick="showCategoryHistory('${e.id}')" class="text-gray-600 hover:text-gray-800 text-xs md:text-sm px-2 py-1 md:px-3 md:py-1 rounded">Histórico</button>
            </div>
          </div>
        `).join("")}
      </div>
    </div>
  `,Lr(),ui("/categories"),setTimeout(()=>On(),0)}async function Dh(n){console.log("Router chamado para:",n),document.getElementById("app-content"),document.querySelectorAll(".nav-btn").forEach(t=>{t.classList.remove("active")});const e=document.querySelector(`.nav-btn[data-route='${n}']`);switch(e&&e.classList.add("active"),n){case"/dashboard":await Be(),await Ct(),await le();break;case"/transactions":Aa();break;case"/categories":Be().then(kh);break;case"/recorrentes":await Ct(),await Oh();break;case"/settings":wr().then(renderSettings);break;default:await Be(),await Ct(),await le()}}window.router=Dh;window.showAddTransactionModal=function(n={}){const e=De({title:"Adicionar Transação",content:`
      <form id="transaction-form" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
          <input type="text" id="transaction-descricao" required 
                 class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                 placeholder="Ex: Supermercado"
                 value="${n.descricao||""}">
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Valor (R$)</label>
          <input type="number" id="transaction-valor" required step="0.01" min="0"
                 class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                 placeholder="0,00"
                 value="${n.valor!==void 0?n.valor:""}">
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Tipo</label>
          <select id="transaction-tipo" required
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
            <option value="">Selecione...</option>
            <option value="receita" ${n.tipo==="receita"?"selected":""}>Receita</option>
            <option value="despesa" ${n.tipo==="despesa"?"selected":""}>Despesa</option>
          </select>
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Categoria</label>
          <select id="transaction-categoria" required
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
            <option value="">Selecione...</option>
            ${window.appState.categories.length>0?window.appState.categories.map(t=>`<option value="${t.id}" ${n.categoriaId===t.id?"selected":""}>${t.nome}</option>`).join(""):'<option value="" disabled>Nenhuma categoria disponível</option>'}
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
    `,onClose:()=>e.remove()});document.body.appendChild(e),document.getElementById("transaction-form").addEventListener("submit",async t=>{t.preventDefault();const r=document.getElementById("transaction-descricao").value,s=parseFloat(document.getElementById("transaction-valor").value),i=document.getElementById("transaction-tipo").value,a=document.getElementById("transaction-categoria").value;try{await Cv({descricao:r,valor:s,tipo:i,categoriaId:a}),e.remove(),le(),q({message:"Transação adicionada com sucesso!",type:"success"})}catch(u){console.error("Erro ao adicionar transação:",u),q({message:"Erro ao adicionar transação: "+u.message,type:"error"})}})};window.showAddCategoryModal=function(n={}){const e=De({title:"Adicionar Categoria",content:`
      <form id="category-form" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Nome</label>
          <input type="text" id="category-nome" required 
                 class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                 placeholder="Ex: Alimentação"
                 value="${n.nome||""}">
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Tipo</label>
          <select id="category-tipo" required
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
            <option value="">Selecione...</option>
            <option value="receita" ${n.tipo==="receita"?"selected":""}>Receita</option>
            <option value="despesa" ${n.tipo==="despesa"?"selected":""}>Despesa</option>
          </select>
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Limite (R$)</label>
          <input type="number" id="category-limite" step="0.01" min="0"
                 class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                 placeholder="0,00"
                 value="${n.limite!==void 0?n.limite:""}">
          <p class="text-sm text-gray-500 mt-1">Deixe em branco se não houver limite</p>
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Cor</label>
          <input type="color" id="category-cor" value="${n.cor||"#4F46E5"}"
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
    `,onClose:()=>e.remove()});document.body.appendChild(e),document.getElementById("category-form").addEventListener("submit",async t=>{t.preventDefault();const r=document.getElementById("category-nome").value,s=document.getElementById("category-tipo").value,i=parseFloat(document.getElementById("category-limite").value)||0,a=document.getElementById("category-cor").value;try{await kv({nome:r,tipo:s,limite:i,cor:a}),e.remove(),le(),q({message:"Categoria adicionada com sucesso!",type:"success"})}catch(u){console.error("Erro ao adicionar categoria:",u),q({message:"Erro ao adicionar categoria: "+u.message,type:"error"})}})};window.showAddBudgetModal=function(){const n=De({title:"Adicionar Orçamento",content:`
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
    `,onClose:()=>n.remove()});setTimeout(()=>{const e=document.getElementById("budget-form");e&&e.addEventListener("submit",async t=>{t.preventDefault();const r=document.getElementById("budget-nome").value,s=document.getElementById("budget-descricao").value;try{await Ia({nome:r,descricao:s}),n.remove(),q({message:"Orçamento adicionado com sucesso!",type:"success"})}catch(i){console.error("Erro ao adicionar orçamento:",i),q({message:"Erro ao adicionar orçamento: "+i.message,type:"error"})}})},0)};window.editTransaction=function(n){const e=window.appState.transactions.find(r=>r.id===n);if(!e){alert("Transação não encontrada");return}const t=De({title:"Editar Transação",content:`
      <form id="edit-transaction-form" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
          <input type="text" id="edit-transaction-descricao" required 
                 value="${e.descricao}"
                 class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                 placeholder="Ex: Supermercado">
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Valor (R$)</label>
          <input type="number" id="edit-transaction-valor" required step="0.01" min="0"
                 value="${e.valor}"
                 class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                 placeholder="0,00">
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Tipo</label>
          <select id="edit-transaction-tipo" required
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
            <option value="receita" ${e.tipo==="receita"?"selected":""}>Receita</option>
            <option value="despesa" ${e.tipo==="despesa"?"selected":""}>Despesa</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Categoria</label>
          <select id="edit-transaction-categoria" required
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
            <option value="">Selecione...</option>
            ${window.appState.categories.map(r=>`<option value="${r.id}" ${e.categoriaId===r.id?"selected":""}>${r.nome}</option>`).join("")}
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
    `,onClose:()=>t.remove()});document.body.appendChild(t),setTimeout(()=>{const r=document.getElementById("edit-transaction-form");r&&r.addEventListener("submit",async s=>{s.preventDefault();const i=document.getElementById("edit-transaction-descricao").value,a=parseFloat(document.getElementById("edit-transaction-valor").value),u=document.getElementById("edit-transaction-tipo").value,d=document.getElementById("edit-transaction-categoria").value;try{await Pv(n,{descricao:i,valor:a,tipo:u,categoriaId:d}),t.remove(),q({message:"Transação atualizada com sucesso!",type:"success"})}catch(f){console.error("Erro ao atualizar transação:",f),q({message:"Erro ao atualizar transação: "+f.message,type:"error"})}})},0)};window.deleteTransaction=function(n){confirm("Tem certeza que deseja excluir esta transação?")&&Ph(n)};window.editCategory=function(n){const e=window.appState.categories.find(r=>r.id===n);if(!e){alert("Categoria não encontrada");return}const t=De({title:"Editar Categoria",content:`
      <form id="edit-category-form" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Nome</label>
          <input type="text" id="edit-category-nome" required 
                 value="${e.nome}"
                 class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                 placeholder="Ex: Alimentação">
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Tipo</label>
          <select id="edit-category-tipo" required
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
            <option value="receita" ${e.tipo==="receita"?"selected":""}>Receita</option>
            <option value="despesa" ${e.tipo==="despesa"?"selected":""}>Despesa</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Limite (R$)</label>
          <input type="number" id="edit-category-limite" step="0.01" min="0"
                 value="${e.limite||""}"
                 class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                 placeholder="0,00">
          <p class="text-sm text-gray-500 mt-1">Deixe em branco se não houver limite</p>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Cor</label>
          <input type="color" id="edit-category-cor" value="${e.cor||"#4F46E5"}"
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
    `,onClose:()=>t.remove()});document.body.appendChild(t),setTimeout(()=>{const r=document.getElementById("edit-category-form");r&&r.addEventListener("submit",async s=>{s.preventDefault();const i=document.getElementById("edit-category-nome").value,a=document.getElementById("edit-category-tipo").value,u=parseFloat(document.getElementById("edit-category-limite").value)||0,d=document.getElementById("edit-category-cor").value;try{await Dv(n,{nome:i,tipo:a,limite:u,cor:d}),t.remove(),q({message:"Categoria atualizada com sucesso!",type:"success"})}catch(f){console.error("Erro ao atualizar categoria:",f),q({message:"Erro ao atualizar categoria: "+f.message,type:"error"})}})},0)};window.deleteCategory=function(n){confirm("Tem certeza que deseja excluir esta categoria?")&&Vv(n)};window.showCategoryHistory=function(n){const e=window.appState.categories.find(s=>s.id===n);if(!e){alert("Categoria não encontrada");return}const t=window.appState.transactions.filter(s=>s.categoriaId===n);t.filter(s=>s.tipo==="receita").reduce((s,i)=>s+parseFloat(i.valor),0),t.filter(s=>s.tipo==="despesa").reduce((s,i)=>s+parseFloat(i.valor),0);const r=De({title:`Histórico - ${e.nome}`,content:`
      <div class="space-y-6">
        <!-- Bloco de resumo removido para evitar duplicidade -->
        <div>
          <h3 class="font-semibold text-lg mb-3">Transações (${t.length})</h3>
          ${t.length===0?`
            <p class="text-gray-500 text-center py-4">Nenhuma transação encontrada nesta categoria</p>
          `:`
            <div class="space-y-2 max-h-64 overflow-y-auto">
              ${t.map(s=>`
                <div class="flex justify-between items-center p-3 border rounded-lg">
                  <div>
                    <p class="font-medium">${s.descricao}</p>
                    <p class="text-sm text-gray-500">${s.createdAt&&s.createdAt.toDate?new Date(s.createdAt.toDate()).toLocaleDateString():""}</p>
                  </div>
                  <div class="text-right">
                    <span class="font-bold ${s.tipo==="receita"?"text-green-600":"text-red-600"}">
                      ${s.tipo==="receita"?"+":"-"}R$ ${parseFloat(s.valor).toFixed(2)}
                    </span>
                    <p class="text-xs text-gray-500">${s.tipo}</p>
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
    `,onClose:()=>r.remove()});document.body.appendChild(r)};window.copyBudgetId=function(n){navigator.clipboard.writeText(n),q({message:"ID do orçamento copiado!",type:"success"})};window.selectBudget=function(n){window.appState.currentBudget=window.appState.budgets.find(e=>e.id===n),tn(),Be()};window.exportToExcel=function(){const n=XLSX.utils.book_new(),e=window.appState.transactions.map(s=>({Descrição:s.descricao,Valor:s.valor,Tipo:s.tipo,Categoria:window.appState.categories.find(i=>i.id===s.categoriaId)?.nome||"",Data:s.createdAt&&s.createdAt.toDate?s.createdAt.toDate().toLocaleDateString():""}));XLSX.utils.book_append_sheet(n,XLSX.utils.json_to_sheet(e),"Transações");const t=window.appState.categories.map(s=>({Nome:s.nome,Tipo:s.tipo,Limite:s.limite,Cor:s.cor}));XLSX.utils.book_append_sheet(n,XLSX.utils.json_to_sheet(t),"Categorias");const r=window.appState.budgets.map(s=>({Nome:s.nome,Descrição:s.descricao,ID:s.id}));XLSX.utils.book_append_sheet(n,XLSX.utils.json_to_sheet(r),"Orçamentos"),XLSX.writeFile(n,"financeiro-dados.xlsx")};window.exportToPDF=function(){const{jsPDF:n}=window.jspdf,e=new n;let t=10;e.setFontSize(16),e.text("Resumo Financeiro",10,t),t+=10,e.setFontSize(12),e.text("Transações:",10,t),t+=8,window.appState.transactions.slice(0,20).forEach(r=>{e.text(`- ${r.descricao} | R$ ${r.valor} | ${r.tipo} | ${window.appState.categories.find(s=>s.id===r.categoriaId)?.nome||""}`,12,t),t+=7,t>270&&(e.addPage(),t=10)}),t+=5,e.text("Categorias:",10,t),t+=8,window.appState.categories.forEach(r=>{e.text(`- ${r.nome} | ${r.tipo} | Limite: R$ ${r.limite}`,12,t),t+=7,t>270&&(e.addPage(),t=10)}),t+=5,e.text("Orçamentos:",10,t),t+=8,window.appState.budgets.forEach(r=>{e.text(`- ${r.nome} | ID: ${r.id}`,12,t),t+=7,t>270&&(e.addPage(),t=10)}),e.save("financeiro-resumo.pdf")};window.downloadBackup=function(){const n={transactions:window.appState.transactions,categories:window.appState.categories,budgets:window.appState.budgets},e=new Blob([JSON.stringify(n,null,2)],{type:"application/json"}),t=URL.createObjectURL(e),r=document.createElement("a");r.href=t,r.download="financeiro-backup.json",document.body.appendChild(r),r.click(),document.body.removeChild(r),URL.revokeObjectURL(t)};window.importBackup=function(){const n=document.createElement("input");n.type="file",n.accept="application/json",n.onchange=async e=>{const t=e.target.files[0];if(!t)return;const r=await t.text();try{const s=JSON.parse(r);s.transactions&&s.categories&&s.budgets?(De({title:"Importação de Backup (Somente Leitura)",content:`<div class='space-y-2'>
            <p class='text-gray-700'>O backup foi lido com sucesso, mas <b>não será gravado no sistema</b> por questões de segurança.</p>
            <p class='text-gray-500 text-sm'>Se precisar restaurar dados, entre em contato com o suporte.</p>
            <pre class='bg-gray-100 rounded p-2 text-xs overflow-x-auto max-h-48'>${JSON.stringify(s,null,2)}</pre>
            <button onclick='closeModal()' class='mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'>Fechar</button>
          </div>`}),q({message:"Backup lido, mas não importado. Apenas leitura.",type:"info"})):(q({message:"Arquivo de backup inválido.",type:"error"}),alert("Arquivo de backup inválido."))}catch(s){q({message:"Erro ao importar backup: "+s.message,type:"error"}),alert("Erro ao importar backup: "+s.message)}},n.click()};window.startVoiceRecognition=function(n){console.log("DEBUG: startVoiceRecognition chamada",n),ws();const e=De({title:"Reconhecimento de Voz",content:`
      <div class="voice-feedback text-center py-6">
        <div class="voice-animation mb-4">
          <svg class="animate-pulse mx-auto" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#4F46E5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 18v4m0 0h-4m4 0h4m-4-8a4 4 0 01-4-4V5a4 4 0 118 0v5a4 4 0 01-4 4z"/></svg>
        </div>
        <p class="text-lg font-semibold">Ouvindo...</p>
        <p id="voice-status" class="text-sm text-gray-500 mt-2">Fale agora</p>
        <p class="mt-4 text-gray-700">Dica: você pode dizer, por exemplo:<br><span class="italic">"gastei 50 reais no supermercado em alimentação"</span></p>
        <div class="mt-4"><span id="voice-text" class="font-mono text-indigo-700"></span></div>
        <button onclick="closeModal()" class="mt-6 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600">Cancelar</button>
      </div>
    `,onClose:()=>e.remove()});if(document.body.appendChild(e),!("webkitSpeechRecognition"in window)&&!("SpeechRecognition"in window)){alert("Seu navegador não suporta reconhecimento de voz. Use Chrome ou Edge.");return}const t=window.SpeechRecognition||window.webkitSpeechRecognition;console.log("DEBUG: Criando SpeechRecognition");const r=new t;r.lang="pt-BR",r.continuous=!1,r.interimResults=!1,r.maxAlternatives=1,r.onstart=function(){console.log("DEBUG: recognition.onstart");const s=document.getElementById("voice-status");s&&(s.textContent="Ouvindo...",s.className="text-sm text-green-600")},r.onresult=function(s){console.log("DEBUG: recognition.onresult",s);const i=s.results[0][0].transcript.toLowerCase(),a=document.getElementById("voice-status");a&&(a.textContent=`Reconhecido: "${i}"`,a.className="text-sm text-blue-600"),setTimeout(async()=>{e.remove();try{await Ov(i,n)}catch(u){q({message:"Erro ao processar comando de voz: "+u.message,type:"error"})}},500)},r.onerror=function(s){console.error("DEBUG: recognition.onerror",s);const i=document.getElementById("voice-status");i&&(i.textContent=`Erro: ${s.error}`,i.className="text-sm text-red-600")},r.onend=function(){console.log("DEBUG: recognition.onend")},console.log("DEBUG: recognition.start()"),r.start()};async function Ov(n,e){try{const t=n.toLowerCase().normalize("NFD").replace(new RegExp("\\p{Diacritic}","gu"),"");if(/\b(saldo|qual.*saldo|saldo atual)\b/.test(t)){const a=window.appState.transactions.filter(f=>f.tipo==="receita").reduce((f,c)=>f+parseFloat(c.valor),0),u=window.appState.transactions.filter(f=>f.tipo==="despesa").reduce((f,c)=>f+parseFloat(c.valor),0),d=a-u;q({message:`Saldo atual: R$ ${d.toFixed(2)}`,type:"info"});return}if(/\b(ultimas transacoes|mostrar transacoes|quais.*gastos|listar transacoes)\b/.test(t)){const a=window.appState.transactions.slice(-5).reverse();if(a.length===0){q({message:"Nenhuma transação encontrada.",type:"info"});return}let u=`Últimas transações:
`;a.forEach(d=>{const f=window.appState.categories.find(c=>c.id===d.categoriaId)?.nome||"";u+=`${d.descricao} - R$ ${parseFloat(d.valor).toFixed(2)} - ${d.tipo} - ${f}
`}),alert(u);return}const r=t.match(/editar transacao (.+)/);if(r){const a=r[1].trim(),u=window.appState.transactions.find(d=>d.descricao.toLowerCase().includes(a));u?window.editTransaction(u.id):q({message:`Transação '${a}' não encontrada.`,type:"error"});return}const s=t.match(/excluir transacao (.+)/);if(s){const a=s[1].trim(),u=window.appState.transactions.find(d=>d.descricao.toLowerCase().includes(a));u?confirm(`Excluir transação '${u.descricao}'?`)&&(await Ph(u.id),q({message:"Transação excluída!",type:"success"}),le()):q({message:`Transação '${a}' não encontrada.`,type:"error"});return}const i=t.match(/(gastei|paguei|recebi|ganhei)\s+(\d+[\.,]?\d*)\s*(reais|rs)?\s*(no|na|em|de)?\s*([\w\s]+?)(?:\s+em\s+([\w\s]+))?$/);if(i){const a=i[1],u=parseFloat(i[2].replace(",","."));let d="despesa";(a==="recebi"||a==="ganhei")&&(d="receita");let f=(i[5]||"").trim(),c=(i[6]||"").trim();if(!c&&f.includes(" ")){const _=f.split(" ");c=_[_.length-1],f=_.slice(0,-1).join(" ")}let w=window.appState.categories.find(_=>_.nome.toLowerCase().includes(c));if(w||(w=window.appState.categories.find(_=>_.tipo===d)),!w){alert("Nenhuma categoria encontrada para o tipo. Crie uma categoria primeiro.");return}f||(f=w.nome),ws(),console.log("DEBUG: Abrindo formulário de transação/categoria por voz",{descricao:f,valor:u,tipo:d,categoriaId:w.id}),window.showAddTransactionModal({descricao:f,valor:u,tipo:d,categoriaId:w.id});return}e==="transaction"?(ws(),console.log("DEBUG: Chamando processTransactionVoice por voz"),await Mv(n)):e==="category"&&(ws(),console.log("DEBUG: Chamando processCategoryVoice por voz"),await Lv(n))}catch(t){console.error("Erro ao processar comando de voz:",t),q({message:"Erro ao processar comando de voz: "+t.message,type:"error"})}}function xa(n){const e={zero:0,um:1,uma:1,dois:2,duas:2,três:3,tres:3,quatro:4,cinco:5,seis:6,sete:7,oito:8,nove:9,dez:10,onze:11,doze:12,treze:13,quatorze:14,catorze:14,quinze:15,dezesseis:16,dezessete:17,dezoito:18,dezenove:19,vinte:20,trinta:30,quarenta:40,cinquenta:50,sessenta:60,setenta:70,oitenta:80,noventa:90,cem:100,cento:100,sem:100,duzentos:200,trezentos:300,quatrocentos:400,quinhentos:500,seiscentos:600,setecentos:700,oitocentos:800,novecentos:900,mil:1e3};return n?(n=n.toLowerCase().replace(/\./g,""),e[n]!==void 0?e[n]:n.includes(" e ")?n.split(" e ").map(xa).reduce((t,r)=>t+r,0):NaN):NaN}async function Mv(n){const t=n.toLowerCase().normalize("NFD").replace(new RegExp("\\p{Diacritic}","gu"),"").split(" ");if(t.length<4){alert('Comando inválido. Use: "descrição valor tipo categoria"');return}let r=t.findIndex(c=>!isNaN(parseFloat(c))),s=NaN;if(r!==-1)s=parseFloat(t[r]);else for(let c=0;c<t.length;c++){const w=xa(t[c]);if(!isNaN(w)&&w>0){s=w,r=c;break}}if(isNaN(s)){alert('Valor não encontrado no comando (diga um número, ex: "cem", "duzentos", "mil" ou "100")');return}const i=t.findIndex(c=>/^(receita|receitas|despesa|despesas)$/.test(c));if(i===-1){alert("Tipo não encontrado (receita ou despesa)");return}let a=t[i];/^receita/.test(a)&&(a="receita"),/^despesa/.test(a)&&(a="despesa");const u=t[t.length-1],d=t.slice(0,r).join(" "),f=window.appState.categories.find(c=>nr(c.nome).includes(nr(u))||nr(u).includes(nr(c.nome)));if(!f){alert(`Categoria "${u}" não encontrada. Crie a categoria primeiro.`);return}window.showAddTransactionModal({descricao:d,valor:s,tipo:a,categoriaId:f.id})}async function Lv(n){const t=n.toLowerCase().normalize("NFD").replace(new RegExp("\\p{Diacritic}","gu"),"").split(" ");if(t.length<3){alert('Comando inválido. Use: "nome tipo limite"');return}const r=t.findIndex(c=>["receita","despesa"].includes(c));if(r===-1){alert("Tipo não encontrado (receita ou despesa)");return}const s=t[r];let i=t.findIndex(c=>!isNaN(parseFloat(c))),a=NaN;if(i!==-1)a=parseFloat(t[i]);else for(let c=0;c<t.length;c++){const w=xa(t[c]);if(!isNaN(w)&&w>0){a=w,i=c;break}}if(isNaN(a)){alert('Limite não encontrado (diga um número, ex: "cem", "duzentos", "mil" ou "100")');return}const u=t.slice(0,r).join(" ");if(!u){alert("Nome da categoria não encontrado");return}const d=["#4F46E5","#EF4444","#10B981","#F59E0B","#8B5CF6","#EC4899","#06B6D4","#84CC16"],f=d[Math.floor(Math.random()*d.length)];window.showAddCategoryModal({nome:u,tipo:s,limite:a,cor:f})}function Ao(){console.log("DEBUG: closeModal chamada");const n=document.getElementById("app-modal");n&&n.remove(),document.querySelectorAll(".modal").forEach(t=>t.remove())}function xo(){document.querySelectorAll(".nav-btn").forEach(n=>{n.addEventListener("click",async e=>{e.preventDefault();const t=n.getAttribute("data-route");await Dh(t)})})}function Fv(){const n=document.getElementById("btn-entrar");n&&(n.onclick=yv)}function vr(n){let e=document.getElementById("loading-page");e||(e=document.createElement("div"),e.id="loading-page",e.className="fixed inset-0 flex items-center justify-center bg-white z-50",e.innerHTML='<div class="text-center"><div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div><span class="text-lg font-semibold text-gray-700">Carregando...</span></div>',document.body.appendChild(e)),e.style.display=n?"flex":"none"}Ge.onAuthStateChanged(async n=>{if(vr(!0),n){window.appState.currentUser=n;try{if(await wr(),window.appState.budgets.length===0){const e=await Ia({nome:"Orçamento Principal",descricao:"Orçamento padrão do usuário"});await Us({id:e,nome:"Orçamento Principal"})}else await Us(window.appState.budgets[0]);await tn(),await Be(),await Ct(),le(),_r(!1)}catch(e){console.error("Erro ao carregar dados do usuário:",e)}}else window.appState.currentUser=null,window.appState.transactions=[],window.appState.categories=[],window.appState.budgets=[],window.appState.currentBudget=null,_r(!0);vr(!1)});document.addEventListener("DOMContentLoaded",()=>{Sh(),On(),Fv(),_r(!0),xo(),Lr();const n=document.getElementById("voice-control");n&&n.addEventListener("click",()=>{De({title:"Comando de Voz",content:`
          <div class='space-y-4 text-center'>
            <p class='text-lg font-semibold'>O que você quer fazer por voz?</p>
            <div class='flex flex-col gap-3'>
              <button onclick='window.startVoiceRecognition("transaction")' class='px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600'>Adicionar Transação</button>
              <button onclick='window.startVoiceRecognition("category")' class='px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600'>Adicionar Categoria</button>
            </div>
            <button onclick='closeModal()' class='mt-4 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600'>Cancelar</button>
          </div>
        `,onClose:()=>modal.remove()})}),Sv();const e=document.getElementById("menu-btn");e&&e.addEventListener("click",()=>{Io()})});window.selectSharedBudget=function(){const n=De({title:"Entrar em Orçamento Compartilhado",content:`
      <form id='shared-budget-form' class='space-y-4'>
        <div>
          <label class='block text-sm font-medium text-gray-700 mb-1'>Cole o ID do orçamento compartilhado</label>
          <input type='text' id='shared-budget-id' required class='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500' placeholder='ID do orçamento'>
        </div>
        <div class='flex justify-end space-x-3 pt-4'>
          <button type='button' onclick='closeModal()' class='px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200'>Cancelar</button>
          <button type='submit' class='px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600'>Entrar</button>
        </div>
      </form>
    `,onClose:()=>n.remove()});setTimeout(()=>{const e=document.getElementById("shared-budget-form");e&&e.addEventListener("submit",async t=>{t.preventDefault();const r=document.getElementById("shared-budget-id").value;if(!r)return;const s=await buscarOrcamentoPorId(r);s?(window.appState.currentBudget=s,await tn(),await Be(),await Ct(),await window.renderSettings(),le(),q({message:"Orçamento compartilhado carregado com sucesso!",type:"success"})):q({message:"Orçamento não encontrado ou você não tem permissão de acesso.",type:"error"}),n.remove()})},0)};let Ki=null;function Vh(){Ki&&Ki();const n=window.appState.currentUser?.uid,e=window.appState.currentBudget?.id;if(!n||!e)return;const t=Mt(fe(ne,"transactions"),Fe("userId","==",n),Fe("budgetId","==",e));Ki=Kd(t,r=>{window.appState.transactions=r.docs.map(i=>({id:i.id,...i.data()}));const s=document.querySelector(".nav-item.active")?.getAttribute("data-tab");["transactions","dashboard"].includes(s)&&(s==="transactions"&&Aa(),s==="dashboard"&&le())})}Vh();window.addEventListener("DOMContentLoaded",()=>{const n=document.getElementById("login-page");n&&(n.style.display="none"),vr(!0)});window.generateUserGuide=function(){try{let a=function(w,_,x,C=170){const D=i.splitTextToSize(w,C);return x+D.length*8>270?(i.addPage(),20):(i.text(D,_,x),x+D.length*8+2)},u=function(w,_){return _>250&&(i.addPage(),_=20),i.setFontSize(16),i.setTextColor(79,70,229),i.text(w,20,_),_+12},d=function(w,_){return _>260&&(i.addPage(),_=20),i.setFontSize(12),i.setTextColor(79,70,229),i.text(w,20,_),_+8},f=function(w,_,x=25){return _>270&&(i.addPage(),_=20),i.setFontSize(11),i.setTextColor(0,0,0),i.text(w,x,_),_+8};var n=a,e=u,t=d,r=f;const{jsPDF:s}=window.jspdf,i=new s;i.setFont("helvetica"),i.setFillColor(79,70,229),i.rect(0,0,210,40,"F"),i.setTextColor(255,255,255),i.setFontSize(24),i.text("Servo Tech Finanças",20,25),i.setFontSize(14),i.text("Guia Completo do Usuário",20,35);let c=50;i.setTextColor(0,0,0),c=u("🎯 Bem-vindo ao Servo Tech Finanças!",c),c=a("O Servo Tech Finanças é um aplicativo completo e intuitivo para controle financeiro pessoal. Desenvolvido com foco na praticidade e simplicidade, ele oferece todas as ferramentas necessárias para você gerenciar suas finanças de forma eficiente e organizada.",20,c),c=d("🌟 Principais Funcionalidades:",c),c=f("📊 Dashboard completo com visão geral das finanças",c),c=f("💰 Gestão completa de receitas e despesas",c),c=f("🏷️ Categorização inteligente com limites de gastos",c),c=f("🎤 Comandos de voz para adicionar transações rapidamente",c),c=f("📈 Controle de orçamentos com compartilhamento",c),c=f("💾 Backup e restauração de dados",c),c=f("📱 Instalação como aplicativo (PWA)",c),c=f("🌙 Modo escuro para conforto visual",c),c=f("📊 Exportação de relatórios em Excel, PDF e JSON",c),c=u("📊 Dashboard - Centro de Controle Financeiro",c),c=a("O Dashboard é o coração do aplicativo, oferecendo uma visão completa e em tempo real de suas finanças. Aqui você encontra todos os dados importantes organizados de forma clara e intuitiva.",20,c),c+=8,c=d("📈 Cards Principais:",c),c=f("🟢 Receitas: Soma total de todo dinheiro recebido no período",c),c=f("   Inclui salários, bônus, rendimentos extras, etc.",c,30),c=f("🔴 Despesas: Soma total de todos os gastos realizados",c),c=f("   Contas, compras, lazer, transporte, etc.",c,30),c=f("🔵 Saldo: Receitas - Despesas (dinheiro disponível)",c),c=f("   Indica se você está no azul ou no vermelho",c,30),c=f("🟡 Orçado: Limite das categorias - Despesas",c),c=f("   Mostra quanto ainda pode gastar dentro dos limites",c,30),c+=8,c=d("📊 Seção de Categorias:",c),c=f("Barras de progresso coloridas para cada categoria",c),c=f("Verde: Dentro do limite estabelecido",c,30),c=f("Amarelo: Próximo do limite (80% ou mais)",c,30),c=f("Vermelho: Acima do limite (gasto excessivo)",c,30),c=f("Porcentagem de uso visível em cada barra",c,30),c+=8,c=d("📝 Transações Recentes:",c),c=f("Lista das últimas 10 transações realizadas",c),c=f("Mostra: Data, Descrição, Valor, Categoria e Tipo",c,30),c=f("Atualização automática em tempo real",c,30),c=f("Acesso rápido para editar ou excluir",c,30),c+=8,c=u("💰 Transações - Gestão Completa de Receitas e Despesas",c),c=a("A aba Transações é onde você gerencia todas as suas movimentações financeiras. Aqui você pode adicionar, editar, excluir e visualizar todas as transações.",20,c),c+=8,c=d("📝 Como Adicionar uma Transação:",c),c=f("Método 1 - Botão Flutuante (FAB):",c),c=f("1. Toque no botão + (canto inferior direito)",c,30),c=f("2. Preencha os campos obrigatórios:",c,30),c=f('   • Descrição: Nome da transação (ex: "Supermercado")',c,35),c=f("   • Valor: Quantia em reais (ex: 150,50)",c,35),c=f("   • Tipo: Receita ou Despesa",c,35),c=f("   • Categoria: Selecione uma categoria existente",c,35),c=f('3. Toque em "Adicionar"',c,30),c+=8,c=f("Método 2 - Aba Transações:",c),c=f('1. Vá na aba "Transações" (navegação inferior)',c,30),c=f('2. Toque em "+ Nova Transação"',c,30),c=f("3. Preencha os campos e confirme",c,30),c+=8,c=d("✏️ Como Editar uma Transação:",c),c=f("1. Localize a transação na lista",c),c=f("2. Toque no ícone ✏️ (lápis) ao lado",c,30),c=f("3. Modifique os campos desejados",c,30),c=f('4. Toque em "Salvar"',c,30),c+=8,c=d("🗑️ Como Excluir uma Transação:",c),c=f("1. Localize a transação na lista",c),c=f("2. Toque no ícone 🗑️ (lixeira) ao lado",c,30),c=f("3. Confirme a exclusão",c,30),c+=8,c=d("📊 Visualização de Transações:",c),c=f("Lista completa de todas as transações",c),c=f("Ordenadas por data (mais recentes primeiro)",c,30),c=f("Filtros por tipo (Receita/Despesa)",c,30),c=f("Busca por descrição",c,30),c=f("Atualização automática em tempo real",c,30),c+=8,c=d("💡 Dicas Importantes:",c),c=f("Use comandos de voz para adicionar mais rapidamente",c),c=f("Mantenha descrições claras e específicas",c),c=f("Categorize corretamente para melhor controle",c),c=f("Revise transações regularmente",c),c+=8,i.setFontSize(16),i.setTextColor(79,70,229),i.text("🎤 Comandos de Voz - Revolução na Praticidade",20,c),c+=12,i.setFontSize(11),i.setTextColor(0,0,0),i.text("O sistema de comandos de voz é uma das funcionalidades mais inovadoras do app.",20,c),c+=8,i.text("Permite adicionar transações e criar categorias sem precisar digitar,",20,c),c+=8,i.text("tornando o controle financeiro muito mais rápido e prático.",20,c),c+=12,i.text("🎯 Como Ativar o Comando de Voz:",20,c),c+=8,i.text("1. Toque no ícone do microfone no cabeçalho",25,c),c+=8,i.text('2. Aguarde a animação de "Ouvindo"',30,c),c+=8,i.text("3. Fale claramente o comando",30,c),c+=8,i.text("4. Aguarde a confirmação",30,c),c+=12,i.text("📝 Comando para Adicionar Transação:",20,c),c+=8,i.text('Formato: "descrição valor tipo categoria"',25,c),c+=8,i.text("Exemplos Práticos:",25,c),c+=8,i.text('• "supermercado cem despesa alimentação"',30,c),c+=8,i.text('• "salário mil quinhentos receita trabalho"',30,c),c+=8,i.text('• "padaria cinquenta despesa alimentação"',30,c),c+=8,i.text('• "uber trinta despesa transporte"',30,c),c+=8,i.text('• "bônus quinhentos receita trabalho"',30,c),c+=8,i.text('• "cinema oitenta despesa lazer"',30,c),c+=12,i.text("🏷️ Comando para Criar Categoria:",20,c),c+=8,i.text('Formato: "nome tipo limite"',25,c),c+=8,i.text("Exemplos Práticos:",25,c),c+=8,i.text('• "alimentação despesa cem"',30,c),c+=8,i.text('• "transporte despesa duzentos"',30,c),c+=8,i.text('• "lazer despesa cento cinquenta"',30,c),c+=8,i.text('• "trabalho receita zero"',30,c),c+=12,i.text("🔢 Valores por Extenso Suportados:",20,c),c+=8,i.text('Números: "zero", "um", "dois", "três", "quatro", "cinco"',25,c),c+=8,i.text('Dezenas: "dez", "vinte", "trinta", "quarenta", "cinquenta"',25,c),c+=8,i.text('Centenas: "cem", "duzentos", "trezentos", "quatrocentos"',25,c),c+=8,i.text('Milhares: "mil", "mil quinhentos", "dois mil"',25,c),c+=8,i.text('Compostos: "cento cinquenta", "mil duzentos"',25,c),c+=8,i.text('Sinônimos: "sem" = "cem" (para evitar confusão)',25,c),c+=12,i.text("💡 Dicas para Comandos de Voz:",20,c),c+=8,i.text("• Fale claramente e pausadamente",25,c),c+=8,i.text("• Use valores por extenso ao invés de números",25,c),c+=8,i.text("• Mantenha o microfone próximo",25,c),c+=8,i.text("• Evite ambientes muito barulhentos",25,c),c+=8,i.text("• Confirme sempre se o comando foi entendido",25,c),c+=15,i.setFontSize(16),i.setTextColor(79,70,229),i.text("🏷️ Categorias - Organização Inteligente dos Gastos",20,c),c+=12,i.setFontSize(11),i.setTextColor(0,0,0),i.text("As categorias são fundamentais para organizar e controlar seus gastos de forma eficiente.",20,c),c+=8,i.text("Elas permitem que você estabeleça limites de gastos e monitore o progresso em tempo real.",20,c),c+=12,i.text("📝 Como Criar uma Categoria:",20,c),c+=8,i.text("Método 1 - Interface:",25,c),c+=8,i.text('1. Vá na aba "Categorias" (navegação inferior)',30,c),c+=8,i.text('2. Toque em "+ Nova Categoria"',30,c),c+=8,i.text("3. Preencha os campos:",30,c),c+=8,i.text('   • Nome: Nome da categoria (ex: "Alimentação")',35,c),c+=8,i.text("   • Tipo: Receita ou Despesa",35,c),c+=8,i.text("   • Limite: Valor máximo mensal (opcional)",35,c),c+=8,i.text("   • Cor: Escolha uma cor para identificação",35,c),c+=8,i.text('4. Toque em "Criar"',30,c),c+=12,i.text("Método 2 - Comando de Voz:",25,c),c+=8,i.text("1. Ative o microfone",30,c),c+=8,i.text('2. Diga: "nome tipo limite"',30,c),c+=8,i.text('3. Exemplo: "alimentação despesa cem"',30,c),c+=12,i.text("📊 Sistema de Controle por Cores:",20,c),c+=8,i.text("🟢 Verde: Dentro do limite estabelecido",25,c),c+=8,i.text("   • Gasto abaixo de 80% do limite",30,c),c+=8,i.text("   • Situação financeira saudável",30,c),c+=8,i.text("🟡 Amarelo: Próximo do limite",25,c),c+=8,i.text("   • Gasto entre 80% e 100% do limite",30,c),c+=8,i.text("   • Atenção: Reduza gastos nesta categoria",30,c),c+=8,i.text("🔴 Vermelho: Acima do limite",25,c),c+=8,i.text("   • Gasto superior ao limite estabelecido",30,c),c+=8,i.text("   • Alerta: Necessário ajuste imediato",30,c),c+=12,i.text("📈 Categorias Recomendadas:",20,c),c+=8,i.text("Para Despesas:",25,c),c+=8,i.text("• Alimentação (supermercado, restaurantes)",30,c),c+=8,i.text("• Transporte (combustível, Uber, transporte público)",30,c),c+=8,i.text("• Moradia (aluguel, contas, manutenção)",30,c),c+=8,i.text("• Lazer (cinema, shows, viagens)",30,c),c+=8,i.text("• Saúde (médico, farmácia, plano de saúde)",30,c),c+=8,i.text("• Educação (cursos, livros, material escolar)",30,c),c+=8,i.text("Para Receitas:",25,c),c+=8,i.text("• Trabalho (salário, bônus, comissões)",30,c),c+=8,i.text("• Investimentos (rendimentos, dividendos)",30,c),c+=8,i.text("• Freelance (trabalhos extras)",30,c),c+=12,i.text("✏️ Gerenciando Categorias:",20,c),c+=8,i.text("• Editar: Toque no ícone ✏️ ao lado da categoria",25,c),c+=8,i.text("• Excluir: Toque no ícone 🗑️ ao lado da categoria",25,c),c+=8,i.text("• Visualizar transações: Toque na categoria",25,c),c+=8,i.text("• Ajustar limites: Edite conforme necessário",25,c),c+=12,i.text("💡 Dicas para Categorias Eficientes:",20,c),c+=8,i.text("• Crie categorias específicas e claras",25,c),c+=8,i.text("• Estabeleça limites realistas baseados na renda",25,c),c+=8,i.text("• Use cores diferentes para fácil identificação",25,c),c+=8,i.text("• Revise e ajuste limites mensalmente",25,c),c+=8,i.text("• Monitore as barras de progresso regularmente",25,c),c+=15,i.setFontSize(16),i.setTextColor(79,70,229),i.text("⚙️ Configurações - Centro de Personalização",20,c),c+=12,i.setFontSize(11),i.setTextColor(0,0,0),i.text("A aba Configurações é o centro de controle do aplicativo, onde você pode personalizar",20,c),c+=8,i.text("sua experiência, gerenciar dados e acessar funcionalidades avançadas.",20,c),c+=12,i.text("📖 Guia do Usuário:",20,c),c+=8,i.text("• Baixe este manual completo em PDF",25,c),c+=8,i.text("• Acesso offline ao guia de uso",25,c),c+=8,i.text("• Referência completa de todas as funcionalidades",25,c),c+=12,i.text("👤 Perfil do Usuário:",20,c),c+=8,i.text("• Visualizar email da conta Google",25,c),c+=8,i.text("• Fazer logout da aplicação",25,c),c+=8,i.text("• Gerenciar sessão de login",25,c),c+=12,i.text("💰 Sistema de Orçamentos:",20,c),c+=8,i.text("Criar Novo Orçamento:",25,c),c+=8,i.text("• Defina um nome para o orçamento",30,c),c+=8,i.text("• Estabeleça período de vigência",30,c),c+=8,i.text("• Configure categorias e limites",30,c),c+=8,i.text("Compartilhar Orçamento:",25,c),c+=8,i.text("• Gere um ID único do orçamento",30,c),c+=8,i.text("• Compartilhe com família ou amigos",30,c),c+=8,i.text("• Controle colaborativo de gastos",30,c),c+=8,i.text("Entrar em Orçamento Compartilhado:",25,c),c+=8,i.text("• Cole o ID do orçamento compartilhado",30,c),c+=8,i.text("• Acesse dados compartilhados",30,c),c+=8,i.text("• Contribua com transações",30,c),c+=12,i.text("📊 Exportação de Dados:",20,c),c+=8,i.text("Excel (.xlsx):",25,c),c+=8,i.text("• Formato ideal para análise em planilhas",30,c),c+=8,i.text("• Compatível com Microsoft Excel e Google Sheets",30,c),c+=8,i.text("• Inclui todas as transações e categorias",30,c),c+=8,i.text("PDF (.pdf):",25,c),c+=8,i.text("• Relatório formatado para impressão",30,c),c+=8,i.text("• Resumo financeiro completo",30,c),c+=8,i.text("• Gráficos e estatísticas",30,c),c+=8,i.text("JSON (.json):",25,c),c+=8,i.text("• Backup completo de todos os dados",30,c),c+=8,i.text("• Formato para restauração futura",30,c),c+=8,i.text("• Compatível com outros sistemas",30,c),c+=12,i.text("📱 Instalação como Aplicativo (PWA):",20,c),c+=8,i.text("• Baixe o app no seu celular",25,c),c+=8,i.text("• Acesso offline às funcionalidades",25,c),c+=8,i.text("• Experiência nativa de aplicativo",25,c),c+=8,i.text("• Notificações push (futuro)",25,c),c+=12,i.text("🌙 Modo Escuro:",20,c),c+=8,i.text("• Alternar entre tema claro e escuro",25,c),c+=8,i.text("• Reduz fadiga visual",25,c),c+=8,i.text("• Economiza bateria em telas OLED",25,c),c+=8,i.text("• Preferência salva automaticamente",25,c),c+=15,i.setFontSize(16),i.setTextColor(79,70,229),i.text("💡 Dicas e Truques para Aproveitar Melhor",20,c),c+=12,i.setFontSize(11),i.setTextColor(0,0,0),i.text("🚀 Dicas de Produtividade:",20,c),c+=8,i.text("• Use comandos de voz para adicionar transações rapidamente",25,c),c+=8,i.text("• Configure limites realistas nas categorias",25,c),c+=8,i.text("• Faça backup regular dos seus dados",25,c),c+=8,i.text("• Instale o app para acesso offline",25,c),c+=8,i.text("• Compartilhe orçamentos com família/amigos",25,c),c+=8,i.text('• Monitore o card "Orçado" para controle de gastos',25,c),c+=8,i.text("• Use cores diferentes para categorias",25,c),c+=15,i.setFontSize(16),i.setTextColor(79,70,229),i.text("🔧 Solução de Problemas Comuns",20,c),c+=12,i.setFontSize(11),i.setTextColor(0,0,0),i.text("❓ Comando de voz não funciona:",20,c),c+=8,i.text("• Verifique se o microfone está ativo",25,c),c+=8,i.text("• Fale claramente e pausadamente",25,c),c+=8,i.text('• Use valores por extenso: "cem" ao invés de "100"',25,c),c+=8,i.text("❓ Transação não aparece:",20,c),c+=8,i.text("• Aguarde alguns segundos (atualização automática)",25,c),c+=8,i.text("• Verifique se está na categoria correta",25,c),c+=8,i.text("❓ App não carrega:",20,c),c+=8,i.text("• Verifique sua conexão com a internet",25,c),c+=8,i.text("• Faça login novamente se necessário",25,c),c+=15,i.setFontSize(16),i.setTextColor(79,70,229),i.text("🆘 Suporte e Contato",20,c),c+=12,i.setFontSize(11),i.setTextColor(0,0,0),i.text("👨‍💻 Fundador: Igor Bispo",20,c),c+=8,i.text("📱 Versão do App: 1.0",20,c),c+=8,i.text("📅 Data do Guia: "+new Date().toLocaleDateString("pt-BR"),20,c),c+=8,i.text("🌐 URL: https://controle-financeiro-b98ec.web.app",20,c),c+=8,i.text("💡 Para dúvidas, consulte este guia ou entre em contato.",20,c),c+=15,i.setFillColor(79,70,229),i.rect(0,270,210,30,"F"),i.setTextColor(255,255,255),i.setFontSize(10),i.text("Servo Tech Finanças - Transformando sua vida financeira",20,280),i.text("© 2025 • Fundador: Igor Bispo • Versão 1.0",20,290),i.save("Servo-Tech-Financas-Guia-Usuario.pdf")}catch(s){console.error("Erro ao gerar PDF:",s),q({message:"Erro ao gerar PDF. Verifique se a biblioteca jsPDF está carregada.",type:"error"})}};function Lr(){let n=document.querySelector(".fab");n&&n.remove(),window.appState.currentUser&&(n=Ev(),document.body.appendChild(n))}window.closeModal=Ao;function ws(){console.log("DEBUG: closeVoiceModalIfOpen chamado");const n=document.getElementById("app-modal");n&&n.remove()}document.addEventListener("DOMContentLoaded",()=>{Sh(),On(),setTimeout(()=>{const n=document.getElementById("voice-control");n&&!n.dataset.voiceBound&&(n.addEventListener("click",()=>{console.log("DEBUG: Botão de voz do topo clicado!");const e=De({title:"Comando de Voz",content:`
            <div class='space-y-4 text-center'>
              <p class='text-lg font-semibold'>O que você quer fazer por voz?</p>
              <div class='flex flex-col gap-3'>
                <button id='btn-voz-transacao' class='px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600'>Adicionar Transação</button>
                <button id='btn-voz-categoria' class='px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600'>Adicionar Categoria</button>
              </div>
              <button onclick='closeModal()' class='mt-4 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600'>Cancelar</button>
            </div>
          `,onClose:()=>e.remove()});document.body.appendChild(e),setTimeout(()=>{document.getElementById("btn-voz-transacao")?.addEventListener("click",()=>{Ao(),window.startVoiceRecognition("transaction")}),document.getElementById("btn-voz-categoria")?.addEventListener("click",()=>{Ao(),window.startVoiceRecognition("category")})},100)}),n.dataset.voiceBound="1")},500)});function nr(n){return n.normalize("NFD").replace(new RegExp("\\p{Diacritic}","gu"),"").toLowerCase().replace(/[.,;:!?]+$/,"").trim()}function Uv(){const n=document.querySelector(".bottom-nav");if(!n)return;n.addEventListener("click",t=>{const r=t.target.closest(".nav-btn");r&&(n.querySelectorAll(".nav-btn").forEach(s=>{s.classList.remove("active"),s.style.background="",s.style.color="",s.style.fontWeight=""}),r.classList.add("active"),r.style.background="#3b82f6",r.style.color="#fff",r.style.fontWeight="700")});const e=n.querySelector(".nav-btn.active");e&&(e.style.background="#3b82f6",e.style.color="#fff",e.style.fontWeight="700")}Uv();async function Nh(){const n=window.FirebaseAuth.currentUser;if(!n)return;const e=new Date,t=e.toISOString().slice(0,7);if(localStorage.getItem("ultimoFechamentoMensal")===t)return;await wv(n.uid,window.appState.transactions,e),await vv(n.uid);const s=await Rh(n.uid);for(const i of s)i.ativa!==!1&&(!i.parcelasRestantes||i.parcelasRestantes>0)&&(await _v(n.uid,{descricao:i.descricao,valor:i.valor,categoriaId:i.categoriaId,tipo:"despesa",createdAt:new Date,recorrenteId:i.id}),i.parcelasRestantes&&(await tu(n.uid,i.id,{parcelasRestantes:i.parcelasRestantes-1}),i.parcelasRestantes-1<=0&&await tu(n.uid,i.id,{ativa:!1})));localStorage.setItem("ultimoFechamentoMensal",t)}Nh();document.addEventListener("visibilitychange",()=>{document.visibilityState==="visible"&&Nh()});async function Ct(){try{const n=window.FirebaseAuth.currentUser,e=window.appState.currentBudget;if(!n||!e){window.appState.recorrentes=[];return}window.appState.recorrentes=await Rh(n.uid,e.id)}catch(n){window.appState.recorrentes=[],console.error("Erro ao carregar despesas recorrentes:",n)}}window.loadRecorrentes=Ct;function ui(n){let e=document.querySelector("nav.bottom-nav");e&&e.remove(),window.appState.currentUser&&(e=Tv(n),e.classList.add("bottom-nav"),document.body.appendChild(e),e.querySelectorAll(".nav-btn").forEach(t=>{t.addEventListener("click",()=>{const r=t.getAttribute("data-route");console.log("Clicou na aba:",r),window.router&&window.router(r)})}),typeof xo=="function"&&xo())}async function Oh(){await li(),Lr(),ui("/recorrentes"),setTimeout(()=>On(),0)}window.renderRecorrentes=Oh;document.addEventListener("recorrente-adicionada",()=>{window.renderDashboard()});let Qi=null;function Bv(){Qi&&Qi();const n=window.appState.currentUser?.uid,e=window.appState.currentBudget?.id;if(!n||!e)return;const t=fe(ne,"users",n,"despesasRecorrentes");let r=t;e&&(r=Mt(t,Fe("budgetId","==",e))),Qi=Kd(r,s=>{window.appState.recorrentes=s.docs.map(a=>({id:a.id,...a.data()}));const i=document.querySelector(".nav-item.active")?.getAttribute("data-tab");["recorrentes","dashboard"].includes(i)&&(i==="recorrentes"&&window.renderRecorrentes(),i==="dashboard"&&window.renderDashboard())})}window.showExportOptions=function(){De({title:"Exportar Dados",content:`
      <div class="space-y-4">
        <button onclick="window.exportToExcel()" class="w-full bg-green-500 text-white py-2 rounded-lg font-semibold hover:bg-green-600 flex items-center justify-center gap-2 text-base">
          <span>📊</span> Exportar Excel
        </button>
        <button onclick="window.exportToPDF()" class="w-full bg-red-500 text-white py-2 rounded-lg font-semibold hover:bg-red-600 flex items-center justify-center gap-2 text-base">
          <span>📄</span> Exportar PDF
        </button>
        <button onclick="window.downloadBackup()" class="w-full bg-purple-500 text-white py-2 rounded-lg font-semibold hover:bg-purple-600 flex items-center justify-center gap-2 text-base">
          <span>💾</span> Backup Completo (JSON)
        </button>
      </div>
    `,onClose:()=>document.querySelector(".modal")?.remove()})};function Mh(){const n=document.querySelector(".fab"),e=document.querySelector(".modal");n&&(e&&getComputedStyle(e).display!=="none"?n.classList.add("hidden"):n.classList.remove("hidden"))}const $v=new MutationObserver(Mh);$v.observe(document.body,{childList:!0,subtree:!0});setTimeout(Mh,500);window.deferredPrompt=null;window.addEventListener("beforeinstallprompt",n=>{n.preventDefault(),window.deferredPrompt=n;const e=document.getElementById("install-app-btn");e&&(e.style.display="")});window.showInstallButton=function(n=!1){const e=document.getElementById("install-app-btn");e&&(window.deferredPrompt||n?(e.style.display="",e.onclick=async()=>{if(window.deferredPrompt){window.deferredPrompt.prompt();const{outcome:t}=await window.deferredPrompt.userChoice;t==="accepted"&&(window.deferredPrompt=null,e.style.display="none")}}):e.style.display="none")};setTimeout(()=>window.showInstallButton(),0);window.renderSettings=async function(){console.log("renderSettings",{currentBudget:window.appState.currentBudget,budgets:window.appState.budgets});const n=document.getElementById("app-content"),e=window.appState.currentBudget,t=window.appState.budgets||[];let r="";if(e){let i=[];Array.isArray(e.usuariosPermitidos)&&e.usuariosPermitidos.length>0&&(i=await buscarEmailsPorUids(e.usuariosPermitidos)),r=i.length>0?"<div class='mt-2'><h4 class='font-semibold'>Usuários com acesso:</h4><ul class='list-disc ml-6 text-sm'>"+i.map(a=>`<li>${a.email?a.email+" ("+a.uid+")":a.uid}</li>`).join("")+"</ul></div>":"",`${e.nome||"(sem nome)"}${e.id}${e.id}${r}`}let s="";t.length>1&&(s="<div class='mt-4'><h4 class='font-semibold'>Seus Orçamentos:</h4><ul class='list-disc ml-6 text-sm'>"+t.map(i=>`<li>${i.nome||"(sem nome)"} <span class='text-xs text-gray-500'>(ID: ${i.id})</span> ${e&&i.id===e.id?'<span class="text-green-600 font-bold ml-2">(Atual)</span>':`<button onclick="window.setCurrentBudget && window.setCurrentBudget(${JSON.stringify(i)})" class="ml-2 px-2 py-1 bg-blue-200 rounded hover:bg-blue-300 text-xs">Usar</button>`}</li>`).join("")+"</ul></div>"),n.innerHTML=`
    <div class="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-2 md:p-6 border border-gray-300 dark:border-gray-700">
      <div class="flex flex-wrap justify-between items-center gap-1 md:gap-0 mb-4">
        <h2 class="tab-title-highlight bg-white dark:bg-gray-900 rounded-2xl px-6 py-2 shadow text-gray-900 dark:text-white">Configurações</h2>
        <div class="flex gap-2">
          <button onclick="window.showAddBudgetModal()" class="bg-blue-500 text-white px-2 py-1 md:px-6 md:py-3 rounded-lg hover:bg-blue-600 flex items-center space-x-2 text-xs md:text-base font-semibold font-inter shadow-md">Criar Orçamento</button>
          <button onclick="window.selectSharedBudget()" class="bg-green-500 text-white px-2 py-1 md:px-6 md:py-3 rounded-lg hover:bg-green-600 flex items-center space-x-2 text-xs md:text-base font-semibold font-inter shadow-md">Entrar em Orçamento Compartilhado</button>
        </div>
      </div>
      <div class="space-y-4">
        <div class="border border-gray-300 dark:border-gray-700 rounded-lg p-2 md:p-4 bg-white dark:bg-gray-900 mb-2">
          <h3 class="font-semibold mb-2">Orçamento Atual:</h3>
          <p><strong>Nome:</strong> ${e?e.nome||"(sem nome)":""}</p>
          <p><strong>ID:</strong> <span id="orcamento-id">${e?e.id:""}</span> <button onclick="window.copyBudgetId('${e?e.id:""}')" class="ml-2 px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 text-xs">Copiar</button></p>
          <button onclick="window.compartilharOrcamento()" class="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 mt-2 text-xs md:text-sm">Compartilhar Orçamento</button>
          ${r}
        </div>
        ${s}
        <div class="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-6 mt-4">
          <button onclick="window.exportToExcel()" class="bg-green-500 text-white py-2 rounded-lg font-semibold hover:bg-green-600 flex items-center justify-center gap-2 text-base"><span>📊</span> Exportar Excel</button>
          <button onclick="window.exportToPDF()" class="bg-red-500 text-white py-2 rounded-lg font-semibold hover:bg-red-600 flex items-center justify-center gap-2 text-base"><span>📄</span> Exportar PDF</button>
          <button onclick="window.downloadBackup()" class="bg-purple-500 text-white py-2 rounded-lg font-semibold hover:bg-purple-600 flex items-center justify-center gap-2 text-base"><span>💾</span> Backup Completo (JSON)</button>
          <button onclick="window.generateUserGuide()" class="bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-600 flex items-center justify-center gap-2 text-base"><span>📘</span> Baixar Guia do Usuário (PDF)</button>
          <button id="install-app-btn" style="display:none" class="bg-yellow-500 text-white py-2 rounded-lg font-semibold hover:bg-yellow-600 flex items-center justify-center gap-2 text-base"><span>⬇️</span> Instalar App</button>
        </div>
      </div>
    </div>
  `,setTimeout(()=>window.showInstallButton(),0)};Ge.onAuthStateChanged(async n=>{if(vr(!0),n){window.appState.currentUser=n;try{if(await wr(),window.appState.budgets.length===0){const e=await Ia({nome:"Orçamento Principal",descricao:"Orçamento padrão do usuário"}),t=await buscarOrcamentoPorId(e);await Us(t)}else await Us(window.appState.budgets[0]);await tn(),await Be(),await Ct(),await window.renderSettings(),le(),_r(!1),console.log("Após login, orçamento atual:",window.appState.currentBudget)}catch(e){console.error("Erro ao carregar dados do usuário:",e)}}else window.appState.currentUser=null,window.appState.transactions=[],window.appState.categories=[],window.appState.budgets=[],window.appState.currentBudget=null,_r(!0);vr(!1)});window.compartilharOrcamento=async function(){const n=window.appState.currentBudget;if(!n){q({message:"Nenhum orçamento selecionado.",type:"error"});return}const e=De({title:"Compartilhar Orçamento",content:`
      <form id="compartilhar-form" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">E-mail ou UID do usuário para compartilhar</label>
          <input type="text" id="compartilhar-uid" required class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="E-mail ou UID">
        </div>
        <div class="flex justify-end space-x-3 pt-4">
          <button type="button" onclick="closeModal()" class="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200">Cancelar</button>
          <button type="submit" class="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600">Compartilhar</button>
        </div>
      </form>
    `,onClose:()=>e.remove()});setTimeout(()=>{const t=document.getElementById("compartilhar-form");t&&t.addEventListener("submit",async r=>{r.preventDefault();const s=document.getElementById("compartilhar-uid").value.trim();if(!s)return;let i=s;try{const a=ti(),u=nt(a,"budgets",n.id),d=Array.isArray(n.usuariosPermitidos)?[...n.usuariosPermitidos]:[];if(d.includes(i)){q({message:"Usuário já possui acesso.",type:"info"});return}d.push(i),await Dr(u,{usuariosPermitidos:d}),n.usuariosPermitidos=d,await window.renderSettings(),q({message:"Orçamento compartilhado com sucesso!",type:"success"})}catch(a){q({message:"Erro ao compartilhar orçamento: "+a.message,type:"error"})}e.remove()})},0)};window.copyBudgetId=function(n){navigator.clipboard.writeText(n),q({message:"ID do orçamento copiado!",type:"success"})};window.setCurrentBudget=async function(n){window.appState.currentBudget=n,await tn(),await Be(),await Ct(),await window.renderSettings(),le()};

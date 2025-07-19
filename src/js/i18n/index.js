import ptBR from './pt-BR.js';
import enUS from './en-US.js';

const translations = { 'pt-BR': ptBR, 'en-US': enUS };
let currentLang = 'pt-BR';

export function t(key) {
  return translations[currentLang][key] || key;
}
export function setLang(lang) {
  if (translations[lang]) currentLang = lang;
}
export function getLang() {
  return currentLang;
} 
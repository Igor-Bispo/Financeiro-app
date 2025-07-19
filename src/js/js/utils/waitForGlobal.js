// Função utilitária para aguardar objetos globais
window.waitForGlobal = function (key, timeout = 10000, interval = 50) {
  return new Promise((resolve, reject) => {
    const start = Date.now();
    (function check() {
      const keys = key.split('.');
      let obj = window;
      for (let k of keys) {
        if (typeof obj[k] === 'undefined') {
          if (Date.now() - start > timeout) {
            return reject(new Error(`Objeto global '${key}' não disponível após ${timeout}ms`));
          }
          return setTimeout(check, interval);
        }
        obj = obj[k];
      }
      resolve(obj);
    })();
  });
};

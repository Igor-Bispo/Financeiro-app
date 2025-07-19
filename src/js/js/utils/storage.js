// Utilitários de storage usando namespace global
function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function loadFromStorage(key, defaultValue = null) {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : defaultValue;
}

function removeFromStorage(key) {
  localStorage.removeItem(key);
}

// Módulo de banco de dados offline para fallback
class OfflineDB {
  constructor() {
    this.prefix = 'finance_offline_';
  }

  async save(key, value) {
    try {
      const fullKey = this.prefix + key;
      localStorage.setItem(fullKey, JSON.stringify(value));
      console.log(`💾 Dados salvos offline: ${key}`);
      return true;
    } catch (error) {
      console.error(`❌ Erro ao salvar offline: ${key}`, error);
      return false;
    }
  }

  async get(key) {
    try {
      const fullKey = this.prefix + key;
      const data = localStorage.getItem(fullKey);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error(`❌ Erro ao carregar offline: ${key}`, error);
      return null;
    }
  }

  async remove(key) {
    try {
      const fullKey = this.prefix + key;
      localStorage.removeItem(fullKey);
      console.log(`🗑️ Dados removidos offline: ${key}`);
      return true;
    } catch (error) {
      console.error(`❌ Erro ao remover offline: ${key}`, error);
      return false;
    }
  }

  async clear() {
    try {
      const keys = Object.keys(localStorage);
      const offlineKeys = keys.filter((key) => key.startsWith(this.prefix));
      offlineKeys.forEach((key) => localStorage.removeItem(key));
      console.log('🗑️ Todos os dados offline removidos');
      return true;
    } catch (error) {
      console.error('❌ Erro ao limpar dados offline:', error);
      return false;
    }
  }

  async getAll() {
    try {
      const keys = Object.keys(localStorage);
      const offlineKeys = keys.filter((key) => key.startsWith(this.prefix));
      const data = {};

      offlineKeys.forEach((key) => {
        const cleanKey = key.replace(this.prefix, '');
        data[cleanKey] = JSON.parse(localStorage.getItem(key));
      });

      return data;
    } catch (error) {
      console.error('❌ Erro ao carregar todos os dados offline:', error);
      return {};
    }
  }
}

// Disponibiliza globalmente
window.FinanceStorage = {
  saveToStorage,
  loadFromStorage,
  removeFromStorage,
};

// Instância do banco de dados offline
window.OfflineDB = new OfflineDB();

console.log('Módulo de storage carregado');

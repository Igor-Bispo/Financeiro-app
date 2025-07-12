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

// Disponibiliza globalmente
window.FinanceStorage = {
    saveToStorage,
    loadFromStorage,
    removeFromStorage
}; 
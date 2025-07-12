// Módulo de banco de dados usando instâncias globais do Firebase
const db = window.FirebaseDB;

// Disponibiliza globalmente
window.FinanceDB = db;

console.log('Módulo de banco de dados carregado'); 
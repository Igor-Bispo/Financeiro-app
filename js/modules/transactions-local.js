// Módulo de transações local (sem Firebase) para testes
class LocalTransactionManager {
    constructor() {
        this.transactions = this.loadFromStorage();
    }

    loadFromStorage() {
        const stored = localStorage.getItem('finance_transactions');
        return stored ? JSON.parse(stored) : [];
    }

    saveToStorage() {
        localStorage.setItem('finance_transactions', JSON.stringify(this.transactions));
    }

    async addTransaction(transaction) {
        try {
            const transactionData = {
                id: Date.now().toString(),
                ...transaction,
                userId: 'local-user',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            };

            this.transactions.unshift(transactionData);
            this.saveToStorage();
            
            console.log('Transação adicionada localmente:', transactionData.id);
            return transactionData.id;
        } catch (error) {
            console.error('Erro ao adicionar transação local:', error);
            throw error;
        }
    }

    async getTransactions() {
        try {
            return this.transactions.map(t => ({
                id: t.id,
                description: t.description,
                amount: t.amount,
                type: t.type,
                category: t.category,
                date: new Date(t.date),
                createdAt: new Date(t.createdAt),
                updatedAt: new Date(t.updatedAt)
            }));
        } catch (error) {
            console.error('Erro ao buscar transações locais:', error);
            throw error;
        }
    }

    async updateTransaction(id, updates) {
        try {
            const index = this.transactions.findIndex(t => t.id === id);
            if (index !== -1) {
                this.transactions[index] = {
                    ...this.transactions[index],
                    ...updates,
                    updatedAt: new Date().toISOString()
                };
                this.saveToStorage();
                console.log('Transação atualizada localmente:', id);
            }
        } catch (error) {
            console.error('Erro ao atualizar transação local:', error);
            throw error;
        }
    }

    async deleteTransaction(id) {
        try {
            this.transactions = this.transactions.filter(t => t.id !== id);
            this.saveToStorage();
            console.log('Transação deletada localmente:', id);
        } catch (error) {
            console.error('Erro ao deletar transação local:', error);
            throw error;
        }
    }

    async getTransactionsByCategory(category) {
        try {
            return this.transactions
                .filter(t => t.category === category)
                .map(t => ({
                    id: t.id,
                    description: t.description,
                    amount: t.amount,
                    type: t.type,
                    category: t.category,
                    date: new Date(t.date)
                }));
        } catch (error) {
            console.error('Erro ao buscar transações por categoria local:', error);
            throw error;
        }
    }

    async getTransactionsByDateRange(startDate, endDate) {
        try {
            return this.transactions
                .filter(t => {
                    const date = new Date(t.date);
                    return date >= startDate && date <= endDate;
                })
                .map(t => ({
                    id: t.id,
                    description: t.description,
                    amount: t.amount,
                    type: t.type,
                    category: t.category,
                    date: new Date(t.date)
                }));
        } catch (error) {
            console.error('Erro ao buscar transações por período local:', error);
            throw error;
        }
    }

    clearAll() {
        this.transactions = [];
        this.saveToStorage();
        console.log('Todas as transações locais foram removidas');
    }
}

// Disponibiliza globalmente
window.FinanceTransactions = new LocalTransactionManager();

console.log('Módulo de transações local carregado'); 
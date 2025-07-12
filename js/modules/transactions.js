// Módulo de transações usando Firestore como fonte principal
class TransactionManager {
    constructor() {
        this.db = window.FirebaseDB;
        this.transactionsRef = this.db.collection('transactions');
        this.offlineDB = window.OfflineDB;
        this.showNotification = window.showNotification;
        this.isOnline = navigator.onLine;
        
        // Cache local para melhor performance
        this.transactionsCache = [];
        this.isLoading = false;
        
        // Listener para mudanças de conectividade
        window.addEventListener('online', () => {
            this.isOnline = true;
            this.syncOfflineData();
        });
        
        window.addEventListener('offline', () => {
            this.isOnline = false;
        });
    }

    async addTransaction(transaction) {
        try {
            const user = window.FirebaseAuth.currentUser;
            if (!user) {
                throw new Error('Usuário não autenticado');
            }

            const transactionData = {
                ...transaction,
                userId: user.uid,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                updatedAt: firebase.firestore.FieldValue.serverTimestamp()
            };

            if (!this.isOnline) {
                // Salvar offline
                await this.offlineDB.save('pendingTransactions', transactionData);
                this.showNotification && this.showNotification('Transação salva localmente. Será sincronizada quando online', 'info');
                return 'offline';
            }

            const docRef = await this.transactionsRef.add(transactionData);
            console.log('Transação adicionada com ID:', docRef.id);
            
            // Atualizar cache local
            const newTransaction = { id: docRef.id, ...transactionData };
            this.transactionsCache.unshift(newTransaction);
            
            return docRef.id;
        } catch (error) {
            console.error('Erro ao adicionar transação:', error);
            throw error;
        }
    }

    async getTransactions() {
        try {
            const user = window.FirebaseAuth.currentUser;
            if (!user) {
                throw new Error('Usuário não autenticado');
            }

            if (this.isLoading) {
                return this.transactionsCache;
            }

            this.isLoading = true;

            // Se offline, usar cache local
            if (!this.isOnline) {
                const offlineTransactions = await this.offlineDB.get('transactions') || [];
                this.transactionsCache = offlineTransactions;
                this.isLoading = false;
                return this.transactionsCache;
            }

            // Buscar do Firestore
            const snapshot = await this.transactionsRef
                .where('userId', '==', user.uid)
                .orderBy('createdAt', 'desc')
                .get();

            const transactions = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));

            // Atualizar cache local
            this.transactionsCache = transactions;
            
            // Salvar no localStorage como fallback
            await this.offlineDB.save('transactions', transactions);
            
            this.isLoading = false;
            return transactions;
        } catch (error) {
            console.error('Erro ao buscar transações:', error);
            this.isLoading = false;
            
            // Fallback para localStorage
            try {
                const fallbackData = await this.offlineDB.get('transactions') || [];
                this.transactionsCache = fallbackData;
                return fallbackData;
            } catch (fallbackError) {
                console.error('Erro no fallback:', fallbackError);
                return [];
            }
        }
    }

    async updateTransaction(id, updates) {
        try {
            const user = window.FirebaseAuth.currentUser;
            if (!user) {
                throw new Error('Usuário não autenticado');
            }

            const updateData = {
                ...updates,
                updatedAt: firebase.firestore.FieldValue.serverTimestamp()
            };

            if (!this.isOnline) {
                // Salvar atualização offline
                await this.offlineDB.save('pendingUpdates', { id, updates: updateData });
                this.showNotification && this.showNotification('Atualização salva localmente. Será sincronizada quando online', 'info');
                return 'offline';
            }

            await this.transactionsRef.doc(id).update(updateData);
            console.log('Transação atualizada:', id);
            
            // Atualizar cache local
            const index = this.transactionsCache.findIndex(t => t.id === id);
            if (index !== -1) {
                this.transactionsCache[index] = { ...this.transactionsCache[index], ...updateData };
            }
            
        } catch (error) {
            console.error('Erro ao atualizar transação:', error);
            throw error;
        }
    }

    async deleteTransaction(id) {
        try {
            const user = window.FirebaseAuth.currentUser;
            if (!user) {
                throw new Error('Usuário não autenticado');
            }

            if (!this.isOnline) {
                // Marcar para exclusão offline
                await this.offlineDB.save('pendingDeletions', { id, type: 'transaction' });
                this.showNotification && this.showNotification('Exclusão salva localmente. Será sincronizada quando online', 'info');
                return 'offline';
            }

            await this.transactionsRef.doc(id).delete();
            console.log('Transação deletada:', id);
            
            // Remover do cache local
            this.transactionsCache = this.transactionsCache.filter(t => t.id !== id);
            
        } catch (error) {
            console.error('Erro ao deletar transação:', error);
            throw error;
        }
    }

    async getTransactionsByCategory(categoryId) {
        try {
            const user = window.FirebaseAuth.currentUser;
            if (!user) {
                throw new Error('Usuário não autenticado');
            }

            if (!this.isOnline) {
                // Filtrar do cache local
                return this.transactionsCache.filter(t => t.categoryId === categoryId);
            }

            const snapshot = await this.transactionsRef
                .where('userId', '==', user.uid)
                .where('categoryId', '==', categoryId)
                .orderBy('createdAt', 'desc')
                .get();

            return snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
        } catch (error) {
            console.error('Erro ao buscar transações por categoria:', error);
            // Fallback para cache local
            return this.transactionsCache.filter(t => t.categoryId === categoryId);
        }
    }

    async getTransactionsByDateRange(startDate, endDate) {
        try {
            const user = window.FirebaseAuth.currentUser;
            if (!user) {
                throw new Error('Usuário não autenticado');
            }

            if (!this.isOnline) {
                // Filtrar do cache local
                return this.transactionsCache.filter(transaction => {
                    const transactionDate = new Date(transaction.date || transaction.createdAt?.toDate() || 0);
                    return transactionDate >= startDate && transactionDate <= endDate;
                });
            }

            const snapshot = await this.transactionsRef
                .where('userId', '==', user.uid)
                .orderBy('createdAt', 'desc')
                .get();

            const transactions = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));

            // Filtrar por data no cliente
            return transactions.filter(transaction => {
                const transactionDate = new Date(transaction.date || transaction.createdAt?.toDate() || 0);
                return transactionDate >= startDate && transactionDate <= endDate;
            });
        } catch (error) {
            console.error('Erro ao buscar transações por período:', error);
            // Fallback para cache local
            return this.transactionsCache.filter(transaction => {
                const transactionDate = new Date(transaction.date || transaction.createdAt?.toDate() || 0);
                return transactionDate >= startDate && transactionDate <= endDate;
            });
        }
    }

    async getTransactionById(id) {
        try {
            const user = window.FirebaseAuth.currentUser;
            if (!user) {
                throw new Error('Usuário não autenticado');
            }

            // Primeiro verificar no cache local
            const cachedTransaction = this.transactionsCache.find(t => t.id === id);
            if (cachedTransaction) {
                return cachedTransaction;
            }

            if (!this.isOnline) {
                return null;
            }

            const doc = await this.transactionsRef.doc(id).get();
            if (doc.exists && doc.data().userId === user.uid) {
                return {
                    id: doc.id,
                    ...doc.data()
                };
            }
            return null;
        } catch (error) {
            console.error('Erro ao buscar transação:', error);
            return null;
        }
    }

    async clearAllTransactions() {
        try {
            const user = window.FirebaseAuth.currentUser;
            if (!user) {
                throw new Error('Usuário não autenticado');
            }

            if (!this.isOnline) {
                // Marcar para limpeza offline
                await this.offlineDB.save('pendingClear', { type: 'transactions' });
                this.showNotification && this.showNotification('Limpeza salva localmente. Será sincronizada quando online', 'info');
                return 'offline';
            }

            const snapshot = await this.transactionsRef
                .where('userId', '==', user.uid)
                .get();

            const batch = this.db.batch();
            snapshot.docs.forEach(doc => {
                batch.delete(doc.ref);
            });

            await batch.commit();
            console.log('Todas as transações removidas');
            
            // Limpar cache local
            this.transactionsCache = [];
            
        } catch (error) {
            console.error('Erro ao remover transações:', error);
            throw error;
        }
    }

    async getTotalIncome() {
        try {
            const user = window.FirebaseAuth.currentUser;
            if (!user) {
                throw new Error('Usuário não autenticado');
            }

            if (!this.isOnline) {
                // Calcular do cache local
                return this.transactionsCache
                    .filter(t => t.type === 'income')
                    .reduce((total, t) => total + (t.amount || 0), 0);
            }

            const snapshot = await this.transactionsRef
                .where('userId', '==', user.uid)
                .where('type', '==', 'income')
                .get();

            return snapshot.docs.reduce((total, doc) => {
                return total + (doc.data().amount || 0);
            }, 0);
        } catch (error) {
            console.error('Erro ao calcular receita total:', error);
            // Fallback para cache local
            return this.transactionsCache
                .filter(t => t.type === 'income')
                .reduce((total, t) => total + (t.amount || 0), 0);
        }
    }

    async getTotalExpenses() {
        try {
            const user = window.FirebaseAuth.currentUser;
            if (!user) {
                throw new Error('Usuário não autenticado');
            }

            if (!this.isOnline) {
                // Calcular do cache local
                return this.transactionsCache
                    .filter(t => t.type === 'expense')
                    .reduce((total, t) => total + (t.amount || 0), 0);
            }

            const snapshot = await this.transactionsRef
                .where('userId', '==', user.uid)
                .where('type', '==', 'expense')
                .get();

            return snapshot.docs.reduce((total, doc) => {
                return total + (doc.data().amount || 0);
            }, 0);
        } catch (error) {
            console.error('Erro ao calcular despesa total:', error);
            // Fallback para cache local
            return this.transactionsCache
                .filter(t => t.type === 'expense')
                .reduce((total, t) => total + (t.amount || 0), 0);
        }
    }

    async getTransactionHistory(id) {
        try {
            const user = window.FirebaseAuth.currentUser;
            if (!user) {
                throw new Error('Usuário não autenticado');
            }

            const doc = await this.transactionsRef.doc(id).get();
            if (doc.exists && doc.data().userId === user.uid) {
                return doc.data().history || [];
            }
            return [];
        } catch (error) {
            console.error('Erro ao buscar histórico da transação:', error);
            return [];
        }
    }

    async syncOfflineData() {
        try {
            console.log('🔄 Sincronizando dados offline...');
            
            // Sincronizar transações pendentes
            const pendingTransactions = await this.offlineDB.get('pendingTransactions') || [];
            for (const transaction of pendingTransactions) {
                await this.addTransaction(transaction);
            }
            await this.offlineDB.remove('pendingTransactions');
            
            // Sincronizar atualizações pendentes
            const pendingUpdates = await this.offlineDB.get('pendingUpdates') || [];
            for (const update of pendingUpdates) {
                await this.updateTransaction(update.id, update.updates);
            }
            await this.offlineDB.remove('pendingUpdates');
            
            // Sincronizar exclusões pendentes
            const pendingDeletions = await this.offlineDB.get('pendingDeletions') || [];
            for (const deletion of pendingDeletions) {
                if (deletion.type === 'transaction') {
                    await this.deleteTransaction(deletion.id);
                }
            }
            await this.offlineDB.remove('pendingDeletions');
            
            console.log('✅ Dados offline sincronizados');
            this.showNotification && this.showNotification('Dados sincronizados com sucesso', 'success');
        } catch (error) {
            console.error('❌ Erro ao sincronizar dados offline:', error);
            this.showNotification && this.showNotification('Erro ao sincronizar dados', 'error');
        }
    }

    // Método para forçar recarregamento dos dados
    async refreshData() {
        this.isLoading = false;
        this.transactionsCache = [];
        return await this.getTransactions();
    }
}

// Disponibiliza globalmente
window.TransactionsModule = new TransactionManager();

console.log('Módulo de transações carregado'); 
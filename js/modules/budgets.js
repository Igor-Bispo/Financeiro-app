// Módulo de orçamentos usando Firestore como fonte principal
class BudgetManager {
    constructor() {
        this.db = window.FirebaseDB;
        this.budgetsRef = this.db.collection('budgets');
        this.offlineDB = window.OfflineDB;
        this.showNotification = window.showNotification;
        this.isOnline = navigator.onLine;
        
        // Cache local para melhor performance
        this.budgetsCache = [];
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

    async addBudget(budgetData) {
        try {
            const user = window.FirebaseAuth.currentUser;
            if (!user) {
                throw new Error('Usuário não autenticado');
            }

            // Obter nome da categoria
            let categoryName = 'Sem categoria';
            if (window.CategoriesModule) {
                const category = await window.CategoriesModule.getCategoryById(budgetData.categoryId);
                if (category) {
                    categoryName = category.name;
                }
            }

            const budget = {
                ...budgetData,
                categoryName: categoryName,
                userId: user.uid,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                updatedAt: firebase.firestore.FieldValue.serverTimestamp()
            };

            if (!this.isOnline) {
                // Salvar offline
                await this.offlineDB.save('pendingBudgets', budget);
                this.showNotification && this.showNotification('Orçamento salvo localmente. Será sincronizado quando online', 'info');
                return 'offline';
            }

            const docRef = await this.budgetsRef.add(budget);
            console.log('Orçamento adicionado com ID:', docRef.id);
            
            // Atualizar cache local
            const newBudget = { id: docRef.id, ...budget };
            this.budgetsCache.push(newBudget);
            
            return docRef.id;
        } catch (error) {
            console.error('Erro ao adicionar orçamento:', error);
            throw error;
        }
    }

    async getBudgets() {
        try {
            const user = window.FirebaseAuth.currentUser;
            if (!user) {
                throw new Error('Usuário não autenticado');
            }

            if (this.isLoading) {
                return this.budgetsCache;
            }

            this.isLoading = true;

            // Se offline, usar cache local
            if (!this.isOnline) {
                const offlineBudgets = await this.offlineDB.get('budgets') || [];
                this.budgetsCache = offlineBudgets;
                this.isLoading = false;
                return this.budgetsCache;
            }

            // Buscar do Firestore
            const snapshot = await this.budgetsRef
                .where('userId', '==', user.uid)
                .orderBy('amount')
                .get();

            const budgets = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));

            // Atualizar cache local
            this.budgetsCache = budgets;
            
            // Salvar no localStorage como fallback
            await this.offlineDB.save('budgets', budgets);
            
            this.isLoading = false;
            return budgets;
        } catch (error) {
            console.error('Erro ao buscar orçamentos:', error);
            this.isLoading = false;
            
            // Fallback para localStorage
            try {
                const fallbackData = await this.offlineDB.get('budgets') || [];
                this.budgetsCache = fallbackData;
                return fallbackData;
            } catch (fallbackError) {
                console.error('Erro no fallback:', fallbackError);
                return [];
            }
        }
    }

    async updateBudget(id, updates) {
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
                await this.offlineDB.save('pendingBudgetUpdates', { id, updates: updateData });
                this.showNotification && this.showNotification('Atualização salva localmente. Será sincronizada quando online', 'info');
                return 'offline';
            }

            await this.budgetsRef.doc(id).update(updateData);
            console.log('Orçamento atualizado:', id);
            
            // Atualizar cache local
            const index = this.budgetsCache.findIndex(b => b.id === id);
            if (index !== -1) {
                this.budgetsCache[index] = { ...this.budgetsCache[index], ...updateData };
            }
            
        } catch (error) {
            console.error('Erro ao atualizar orçamento:', error);
            throw error;
        }
    }

    async deleteBudget(id) {
        try {
            const user = window.FirebaseAuth.currentUser;
            if (!user) {
                throw new Error('Usuário não autenticado');
            }

            if (!this.isOnline) {
                // Marcar para exclusão offline
                await this.offlineDB.save('pendingBudgetDeletions', { id, type: 'budget' });
                this.showNotification && this.showNotification('Exclusão salva localmente. Será sincronizada quando online', 'info');
                return 'offline';
            }

            await this.budgetsRef.doc(id).delete();
            console.log('Orçamento deletado:', id);
            
            // Remover do cache local
            this.budgetsCache = this.budgetsCache.filter(b => b.id !== id);
            
        } catch (error) {
            console.error('Erro ao deletar orçamento:', error);
            throw error;
        }
    }

    async getBudgetById(id) {
        try {
            const user = window.FirebaseAuth.currentUser;
            if (!user) {
                throw new Error('Usuário não autenticado');
            }

            // Primeiro verificar no cache local
            const cachedBudget = this.budgetsCache.find(b => b.id === id);
            if (cachedBudget) {
                return cachedBudget;
            }

            if (!this.isOnline) {
                return null;
            }

            const doc = await this.budgetsRef.doc(id).get();
            if (doc.exists && doc.data().userId === user.uid) {
                return {
                    id: doc.id,
                    ...doc.data()
                };
            }
            return null;
        } catch (error) {
            console.error('Erro ao buscar orçamento:', error);
            return null;
        }
    }

    async getBudgetByCategory(categoryId) {
        try {
            const user = window.FirebaseAuth.currentUser;
            if (!user) {
                throw new Error('Usuário não autenticado');
            }

            if (!this.isOnline) {
                // Filtrar do cache local
                return this.budgetsCache.find(b => b.categoryId === categoryId) || null;
            }

            const snapshot = await this.budgetsRef
                .where('userId', '==', user.uid)
                .where('categoryId', '==', categoryId)
                .get();

            if (snapshot.empty) return null;

            const doc = snapshot.docs[0];
            return {
                id: doc.id,
                ...doc.data()
            };
        } catch (error) {
            console.error('Erro ao buscar orçamento por categoria:', error);
            // Fallback para cache local
            return this.budgetsCache.find(b => b.categoryId === categoryId) || null;
        }
    }

    async getTotalBudget() {
        try {
            const user = window.FirebaseAuth.currentUser;
            if (!user) {
                throw new Error('Usuário não autenticado');
            }

            if (!this.isOnline) {
                // Calcular do cache local
                return this.budgetsCache.reduce((total, b) => total + (b.amount || 0), 0);
            }

            const snapshot = await this.budgetsRef
                .where('userId', '==', user.uid)
                .get();

            return snapshot.docs.reduce((total, doc) => {
                return total + (doc.data().amount || 0);
            }, 0);
        } catch (error) {
            console.error('Erro ao calcular orçamento total:', error);
            // Fallback para cache local
            return this.budgetsCache.reduce((total, b) => total + (b.amount || 0), 0);
        }
    }

    async getBudgetsWithBalance() {
        try {
            const user = window.FirebaseAuth.currentUser;
            if (!user) {
                throw new Error('Usuário não autenticado');
            }

            if (!this.isOnline) {
                // Calcular do cache local
                const budgets = this.budgetsCache.map(b => ({ ...b, spent: 0 }));
                
                if (window.TransactionsModule) {
                    const transactions = await window.TransactionsModule.getTransactions();
                    transactions.forEach(transaction => {
                        if (transaction.type === 'expense' && transaction.categoryId) {
                            const budget = budgets.find(b => b.categoryId === transaction.categoryId);
                            if (budget) {
                                budget.spent += transaction.amount || 0;
                            }
                        }
                    });
                }
                
                return budgets.map(budget => ({
                    ...budget,
                    balance: budget.amount - budget.spent,
                    percentageUsed: (budget.spent / budget.amount) * 100
                }));
            }

            const budgetsSnapshot = await this.budgetsRef
                .where('userId', '==', user.uid)
                .get();

            const transactionsSnapshot = await window.FirebaseDB.collection('transactions')
                .where('userId', '==', user.uid)
                .where('type', '==', 'expense')
                .get();

            const budgets = budgetsSnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
                spent: 0
            }));

            transactionsSnapshot.docs.forEach(doc => {
                const transaction = doc.data();
                const budget = budgets.find(b => b.categoryId === transaction.categoryId);
                if (budget) {
                    budget.spent += transaction.amount || 0;
                }
            });

            return budgets.map(budget => ({
                ...budget,
                balance: budget.amount - budget.spent,
                percentageUsed: (budget.spent / budget.amount) * 100
            }));
        } catch (error) {
            console.error('Erro ao buscar orçamentos com saldo:', error);
            // Fallback para cache local
            return this.budgetsCache.map(b => ({
                ...b,
                spent: 0,
                balance: b.amount,
                percentageUsed: 0
            }));
        }
    }

    async clearAllBudgets() {
        try {
            const user = window.FirebaseAuth.currentUser;
            if (!user) {
                throw new Error('Usuário não autenticado');
            }

            if (!this.isOnline) {
                // Marcar para limpeza offline
                await this.offlineDB.save('pendingClear', { type: 'budgets' });
                this.showNotification && this.showNotification('Limpeza salva localmente. Será sincronizada quando online', 'info');
                return 'offline';
            }

            const snapshot = await this.budgetsRef
                .where('userId', '==', user.uid)
                .get();

            const batch = this.db.batch();
            snapshot.docs.forEach(doc => {
                batch.delete(doc.ref);
            });

            await batch.commit();
            console.log('Todos os orçamentos removidos');
            
            // Limpar cache local
            this.budgetsCache = [];
            
        } catch (error) {
            console.error('Erro ao remover orçamentos:', error);
            throw error;
        }
    }

    async syncOfflineData() {
        try {
            console.log('🔄 Sincronizando dados offline de orçamentos...');
            
            // Sincronizar orçamentos pendentes
            const pendingBudgets = await this.offlineDB.get('pendingBudgets') || [];
            for (const budget of pendingBudgets) {
                await this.addBudget(budget);
            }
            await this.offlineDB.remove('pendingBudgets');
            
            // Sincronizar atualizações pendentes
            const pendingUpdates = await this.offlineDB.get('pendingBudgetUpdates') || [];
            for (const update of pendingUpdates) {
                await this.updateBudget(update.id, update.updates);
            }
            await this.offlineDB.remove('pendingBudgetUpdates');
            
            // Sincronizar exclusões pendentes
            const pendingDeletions = await this.offlineDB.get('pendingBudgetDeletions') || [];
            for (const deletion of pendingDeletions) {
                if (deletion.type === 'budget') {
                    await this.deleteBudget(deletion.id);
                }
            }
            await this.offlineDB.remove('pendingBudgetDeletions');
            
            console.log('✅ Dados offline de orçamentos sincronizados');
            this.showNotification && this.showNotification('Orçamentos sincronizados com sucesso', 'success');
        } catch (error) {
            console.error('❌ Erro ao sincronizar dados offline de orçamentos:', error);
            this.showNotification && this.showNotification('Erro ao sincronizar orçamentos', 'error');
        }
    }

    // Método para forçar recarregamento dos dados
    async refreshData() {
        this.isLoading = false;
        this.budgetsCache = [];
        return await this.getBudgets();
    }
}

// Disponibiliza globalmente
window.BudgetsModule = new BudgetManager();

console.log('Módulo de orçamentos carregado'); 
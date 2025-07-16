// Módulo de categorias usando Firestore como fonte principal
class CategoryManager {
    constructor() {
        this.db = window.FirebaseDB;
        this.categoriasRef = this.db.collection('categorias');
        this.offlineDB = window.OfflineDB;
        this.showNotification = window.showNotification;
        this.isOnline = navigator.onLine;
        
        // Cache local para melhor performance
        this.categoriasCache = [];
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

    async addCategory(category) {
        try {
            const user = window.FirebaseAuth.currentUser;
            if (!user) {
                throw new Error('Usuário não autenticado');
            }

            const categoryData = {
                ...category,
                userId: user.uid,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                updatedAt: firebase.firestore.FieldValue.serverTimestamp()
            };

            if (!this.isOnline) {
                // Salvar offline
                await this.offlineDB.save('pendingCategories', categoryData);
                this.showNotification && this.showNotification('Categoria salva localmente. Será sincronizada quando online', 'info');
                return 'offline';
            }

            const docRef = await this.categoriasRef.add(categoryData);
            console.log('Categoria adicionada com ID:', docRef.id);
            
            // Atualizar cache local
            const newCategory = { id: docRef.id, ...categoryData };
            this.categoriasCache.push(newCategory);
            
            return docRef.id;
        } catch (error) {
            console.error('Erro ao adicionar categoria:', error);
            throw error;
        }
    }

    async getCategories() {
        try {
            const user = window.FirebaseAuth.currentUser;
            if (!user) {
                throw new Error('Usuário não autenticado');
            }

            if (this.isLoading) {
                return this.categoriasCache;
            }

            this.isLoading = true;

            // Se offline, usar cache local
            if (!this.isOnline) {
                const offlineCategories = await this.offlineDB.get('categorias') || [];
                this.categoriasCache = offlineCategories;
                this.isLoading = false;
                return this.categoriasCache;
            }

            // Buscar do Firestore
            const snapshot = await this.categoriasRef
                .where('userId', '==', user.uid)
                .orderBy('name')
                .get();

            const categorias = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));

            // Atualizar cache local
            this.categoriasCache = categorias;
            
            // Salvar no localStorage como fallback
            await this.offlineDB.save('categorias', categorias);
            
            this.isLoading = false;
            return categorias;
        } catch (error) {
            console.error('Erro ao buscar categorias:', error);
            this.isLoading = false;
            
            // Fallback para localStorage
            try {
                const fallbackData = await this.offlineDB.get('categorias') || [];
                this.categoriasCache = fallbackData;
                return fallbackData;
            } catch (fallbackError) {
                console.error('Erro no fallback:', fallbackError);
                return [];
            }
        }
    }

    async updateCategory(id, updates) {
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
                await this.offlineDB.save('pendingCategoryUpdates', { id, updates: updateData });
                this.showNotification && this.showNotification('Atualização salva localmente. Será sincronizada quando online', 'info');
                return 'offline';
            }

            await this.categoriasRef.doc(id).update(updateData);
            console.log('Categoria atualizada:', id);
            
            // Atualizar cache local
            const index = this.categoriasCache.findIndex(c => c.id === id);
            if (index !== -1) {
                this.categoriasCache[index] = { ...this.categoriasCache[index], ...updateData };
            }
            
        } catch (error) {
            console.error('Erro ao atualizar categoria:', error);
            throw error;
        }
    }

    async deleteCategory(id) {
        try {
            const user = window.FirebaseAuth.currentUser;
            if (!user) {
                throw new Error('Usuário não autenticado');
            }

            if (!this.isOnline) {
                // Marcar para exclusão offline
                await this.offlineDB.save('pendingCategoryDeletions', { id, type: 'category' });
                this.showNotification && this.showNotification('Exclusão salva localmente. Será sincronizada quando online', 'info');
                return 'offline';
            }

            // Antes de deletar, atualize as transações que usam esta categoria
            if (window.TransactionsModule) {
                const transactions = await window.TransactionsModule.getTransactionsByCategory(id);
                const batch = this.db.batch();
                
                transactions.forEach(transaction => {
                    const ref = this.db.collection('transactions').doc(transaction.id);
                    batch.update(ref, { 
                        categoryId: null, 
                        categoryName: 'Sem categoria' 
                    });
                });
                
                // Deletar a categoria
                batch.delete(this.categoriasRef.doc(id));
                await batch.commit();
            } else {
                // Se não houver módulo de transações, apenas deletar a categoria
                await this.categoriasRef.doc(id).delete();
            }
            
            console.log('Categoria deletada:', id);
            
            // Remover do cache local
            this.categoriasCache = this.categoriasCache.filter(c => c.id !== id);
            
        } catch (error) {
            console.error('Erro ao deletar categoria:', error);
            throw error;
        }
    }

    async getCategoryById(id) {
        try {
            const user = window.FirebaseAuth.currentUser;
            if (!user) {
                throw new Error('Usuário não autenticado');
            }

            // Primeiro verificar no cache local
            const cachedCategory = this.categoriasCache.find(c => c.id === id);
            if (cachedCategory) {
                return cachedCategory;
            }

            if (!this.isOnline) {
                return null;
            }

            const doc = await this.categoriasRef.doc(id).get();
            if (doc.exists && doc.data().userId === user.uid) {
                return {
                    id: doc.id,
                    ...doc.data()
                };
            }
            return null;
        } catch (error) {
            console.error('Erro ao buscar categoria:', error);
            return null;
        }
    }

    async getCategoriesByType(type) {
        try {
            const user = window.FirebaseAuth.currentUser;
            if (!user) {
                throw new Error('Usuário não autenticado');
            }

            if (!this.isOnline) {
                // Filtrar do cache local
                return this.categoriasCache.filter(c => c.type === type);
            }

            const snapshot = await this.categoriasRef
                .where('userId', '==', user.uid)
                .where('type', '==', type)
                .orderBy('name')
                .get();

            return snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
        } catch (error) {
            console.error('Erro ao buscar categorias por tipo:', error);
            // Fallback para cache local
            return this.categoriasCache.filter(c => c.type === type);
        }
    }

    async clearAllCategories() {
        try {
            const user = window.FirebaseAuth.currentUser;
            if (!user) {
                throw new Error('Usuário não autenticado');
            }

            if (!this.isOnline) {
                // Marcar para limpeza offline
                await this.offlineDB.save('pendingClear', { type: 'categorias' });
                this.showNotification && this.showNotification('Limpeza salva localmente. Será sincronizada quando online', 'info');
                return 'offline';
            }

            const snapshot = await this.categoriasRef
                .where('userId', '==', user.uid)
                .get();

            const batch = this.db.batch();
            snapshot.docs.forEach(doc => {
                batch.delete(doc.ref);
            });

            await batch.commit();
            console.log('Todas as categorias removidas');
            
            // Limpar cache local
            this.categoriasCache = [];
            
        } catch (error) {
            console.error('Erro ao remover categorias:', error);
            throw error;
        }
    }

    async syncOfflineData() {
        try {
            console.log('🔄 Sincronizando dados offline de categorias...');
            
            // Sincronizar categorias pendentes
            const pendingCategories = await this.offlineDB.get('pendingCategories') || [];
            for (const category of pendingCategories) {
                await this.addCategory(category);
            }
            await this.offlineDB.remove('pendingCategories');
            
            // Sincronizar atualizações pendentes
            const pendingUpdates = await this.offlineDB.get('pendingCategoryUpdates') || [];
            for (const update of pendingUpdates) {
                await this.updateCategory(update.id, update.updates);
            }
            await this.offlineDB.remove('pendingCategoryUpdates');
            
            // Sincronizar exclusões pendentes
            const pendingDeletions = await this.offlineDB.get('pendingCategoryDeletions') || [];
            for (const deletion of pendingDeletions) {
                if (deletion.type === 'category') {
                    await this.deleteCategory(deletion.id);
                }
            }
            await this.offlineDB.remove('pendingCategoryDeletions');
            
            console.log('✅ Dados offline de categorias sincronizados');
            this.showNotification && this.showNotification('Categorias sincronizadas com sucesso', 'success');
        } catch (error) {
            console.error('❌ Erro ao sincronizar dados offline de categorias:', error);
            this.showNotification && this.showNotification('Erro ao sincronizar categorias', 'error');
        }
    }

    // Método para forçar recarregamento dos dados
    async refreshData() {
        this.isLoading = false;
        this.categoriasCache = [];
        return await this.getCategories();
    }
}

// Disponibiliza globalmente
window.CategoriasModule = new CategoryManager();

console.log('Módulo de categorias carregado'); 
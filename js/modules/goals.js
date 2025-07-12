// Módulo de metas usando Firestore como fonte principal
class GoalManager {
    constructor() {
        this.db = window.FirebaseDB;
        this.goalsRef = this.db.collection('goals');
        this.offlineDB = window.OfflineDB;
        this.showNotification = window.showNotification;
        this.isOnline = navigator.onLine;
        
        // Cache local para melhor performance
        this.goalsCache = [];
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

    async addGoal(goal) {
        try {
            const user = window.FirebaseAuth.currentUser;
            if (!user) {
                throw new Error('Usuário não autenticado');
            }

            const goalData = {
                ...goal,
                userId: user.uid,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                updatedAt: firebase.firestore.FieldValue.serverTimestamp()
            };

            if (!this.isOnline) {
                // Salvar offline
                await this.offlineDB.save('pendingGoals', goalData);
                this.showNotification && this.showNotification('Meta salva localmente. Será sincronizada quando online', 'info');
                return 'offline';
            }

            const docRef = await this.goalsRef.add(goalData);
            console.log('Meta adicionada com ID:', docRef.id);
            
            // Atualizar cache local
            const newGoal = { id: docRef.id, ...goalData };
            this.goalsCache.push(newGoal);
            
            return docRef.id;
        } catch (error) {
            console.error('Erro ao adicionar meta:', error);
            throw error;
        }
    }

    async getGoals() {
        try {
            const user = window.FirebaseAuth.currentUser;
            if (!user) {
                throw new Error('Usuário não autenticado');
            }

            if (this.isLoading) {
                return this.goalsCache;
            }

            this.isLoading = true;

            // Se offline, usar cache local
            if (!this.isOnline) {
                const offlineGoals = await this.offlineDB.get('goals') || [];
                this.goalsCache = offlineGoals;
                this.isLoading = false;
                return this.goalsCache;
            }

            // Buscar do Firestore
            const snapshot = await this.goalsRef
                .where('userId', '==', user.uid)
                .orderBy('deadline')
                .get();

            const goals = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));

            // Atualizar cache local
            this.goalsCache = goals;
            
            // Salvar no localStorage como fallback
            await this.offlineDB.save('goals', goals);
            
            this.isLoading = false;
            return goals;
        } catch (error) {
            console.error('Erro ao buscar metas:', error);
            this.isLoading = false;
            
            // Fallback para localStorage
            try {
                const fallbackData = await this.offlineDB.get('goals') || [];
                this.goalsCache = fallbackData;
                return fallbackData;
            } catch (fallbackError) {
                console.error('Erro no fallback:', fallbackError);
                return [];
            }
        }
    }

    async updateGoal(id, updates) {
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
                await this.offlineDB.save('pendingGoalUpdates', { id, updates: updateData });
                this.showNotification && this.showNotification('Atualização salva localmente. Será sincronizada quando online', 'info');
                return 'offline';
            }

            await this.goalsRef.doc(id).update(updateData);
            console.log('Meta atualizada:', id);
            
            // Atualizar cache local
            const index = this.goalsCache.findIndex(g => g.id === id);
            if (index !== -1) {
                this.goalsCache[index] = { ...this.goalsCache[index], ...updateData };
            }
            
        } catch (error) {
            console.error('Erro ao atualizar meta:', error);
            throw error;
        }
    }

    async deleteGoal(id) {
        try {
            const user = window.FirebaseAuth.currentUser;
            if (!user) {
                throw new Error('Usuário não autenticado');
            }

            if (!this.isOnline) {
                // Marcar para exclusão offline
                await this.offlineDB.save('pendingGoalDeletions', { id, type: 'goal' });
                this.showNotification && this.showNotification('Exclusão salva localmente. Será sincronizada quando online', 'info');
                return 'offline';
            }

            await this.goalsRef.doc(id).delete();
            console.log('Meta deletada:', id);
            
            // Remover do cache local
            this.goalsCache = this.goalsCache.filter(g => g.id !== id);
            
        } catch (error) {
            console.error('Erro ao deletar meta:', error);
            throw error;
        }
    }

    async getGoalById(id) {
        try {
            const user = window.FirebaseAuth.currentUser;
            if (!user) {
                throw new Error('Usuário não autenticado');
            }

            // Primeiro verificar no cache local
            const cachedGoal = this.goalsCache.find(g => g.id === id);
            if (cachedGoal) {
                return cachedGoal;
            }

            if (!this.isOnline) {
                return null;
            }

            const doc = await this.goalsRef.doc(id).get();
            if (doc.exists && doc.data().userId === user.uid) {
                return {
                    id: doc.id,
                    ...doc.data()
                };
            }
            return null;
        } catch (error) {
            console.error('Erro ao buscar meta:', error);
            return null;
        }
    }

    async updateGoalProgress(id, currentAmount) {
        try {
            const user = window.FirebaseAuth.currentUser;
            if (!user) {
                throw new Error('Usuário não autenticado');
            }

            const updateData = {
                current: currentAmount,
                updatedAt: firebase.firestore.FieldValue.serverTimestamp()
            };

            if (!this.isOnline) {
                // Salvar atualização offline
                await this.offlineDB.save('pendingGoalProgress', { id, current: currentAmount });
                this.showNotification && this.showNotification('Progresso salvo localmente. Será sincronizado quando online', 'info');
                return 'offline';
            }

            await this.goalsRef.doc(id).update(updateData);
            console.log('Progresso da meta atualizado:', id);
            
            // Atualizar cache local
            const index = this.goalsCache.findIndex(g => g.id === id);
            if (index !== -1) {
                this.goalsCache[index] = { ...this.goalsCache[index], ...updateData };
            }
            
        } catch (error) {
            console.error('Erro ao atualizar progresso da meta:', error);
            throw error;
        }
    }

    async getGoalsByStatus(status) {
        try {
            const user = window.FirebaseAuth.currentUser;
            if (!user) {
                throw new Error('Usuário não autenticado');
            }

            if (!this.isOnline) {
                // Filtrar do cache local
                return this.goalsCache.filter(g => g.status === status);
            }

            const snapshot = await this.goalsRef
                .where('userId', '==', user.uid)
                .where('status', '==', status)
                .orderBy('deadline')
                .get();

            return snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
        } catch (error) {
            console.error('Erro ao buscar metas por status:', error);
            // Fallback para cache local
            return this.goalsCache.filter(g => g.status === status);
        }
    }

    async clearAllGoals() {
        try {
            const user = window.FirebaseAuth.currentUser;
            if (!user) {
                throw new Error('Usuário não autenticado');
            }

            if (!this.isOnline) {
                // Marcar para limpeza offline
                await this.offlineDB.save('pendingClear', { type: 'goals' });
                this.showNotification && this.showNotification('Limpeza salva localmente. Será sincronizada quando online', 'info');
                return 'offline';
            }

            const snapshot = await this.goalsRef
                .where('userId', '==', user.uid)
                .get();

            const batch = this.db.batch();
            snapshot.docs.forEach(doc => {
                batch.delete(doc.ref);
            });

            await batch.commit();
            console.log('Todas as metas removidas');
            
            // Limpar cache local
            this.goalsCache = [];
            
        } catch (error) {
            console.error('Erro ao remover metas:', error);
            throw error;
        }
    }

    async syncOfflineData() {
        try {
            console.log('🔄 Sincronizando dados offline de metas...');
            
            // Sincronizar metas pendentes
            const pendingGoals = await this.offlineDB.get('pendingGoals') || [];
            for (const goal of pendingGoals) {
                await this.addGoal(goal);
            }
            await this.offlineDB.remove('pendingGoals');
            
            // Sincronizar atualizações pendentes
            const pendingUpdates = await this.offlineDB.get('pendingGoalUpdates') || [];
            for (const update of pendingUpdates) {
                await this.updateGoal(update.id, update.updates);
            }
            await this.offlineDB.remove('pendingGoalUpdates');
            
            // Sincronizar progresso pendente
            const pendingProgress = await this.offlineDB.get('pendingGoalProgress') || [];
            for (const progress of pendingProgress) {
                await this.updateGoalProgress(progress.id, progress.current);
            }
            await this.offlineDB.remove('pendingGoalProgress');
            
            // Sincronizar exclusões pendentes
            const pendingDeletions = await this.offlineDB.get('pendingGoalDeletions') || [];
            for (const deletion of pendingDeletions) {
                if (deletion.type === 'goal') {
                    await this.deleteGoal(deletion.id);
                }
            }
            await this.offlineDB.remove('pendingGoalDeletions');
            
            console.log('✅ Dados offline de metas sincronizados');
            this.showNotification && this.showNotification('Metas sincronizadas com sucesso', 'success');
        } catch (error) {
            console.error('❌ Erro ao sincronizar dados offline de metas:', error);
            this.showNotification && this.showNotification('Erro ao sincronizar metas', 'error');
        }
    }

    // Método para forçar recarregamento dos dados
    async refreshData() {
        this.isLoading = false;
        this.goalsCache = [];
        return await this.getGoals();
    }
}

// Disponibiliza globalmente
window.GoalsModule = new GoalManager();

console.log('Módulo de metas carregado'); 
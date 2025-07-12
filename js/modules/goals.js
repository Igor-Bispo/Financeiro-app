// Módulo de metas usando instâncias globais do Firebase
class GoalManager {
    constructor() {
        this.db = window.FirebaseDB;
        this.goalsRef = this.db.collection('goals');
    }

    async addGoal(goal) {
        try {
            const user = window.FirebaseAuth.currentUser;
            if (!user) throw new Error('Usuário não autenticado');

            const goalData = {
                ...goal,
                userId: user.uid,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                updatedAt: firebase.firestore.FieldValue.serverTimestamp()
            };

            const docRef = await this.goalsRef.add(goalData);
            console.log('Meta adicionada com ID:', docRef.id);
            return docRef.id;
        } catch (error) {
            console.error('Erro ao adicionar meta:', error);
            throw error;
        }
    }

    async getGoals() {
        try {
            const user = window.FirebaseAuth.currentUser;
            if (!user) throw new Error('Usuário não autenticado');

            const snapshot = await this.goalsRef
                .where('userId', '==', user.uid)
                .get();

            const goals = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));

            return goals.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
        } catch (error) {
            console.error('Erro ao buscar metas:', error);
            throw error;
        }
    }

    async updateGoal(id, updates) {
        try {
            const user = window.FirebaseAuth.currentUser;
            if (!user) throw new Error('Usuário não autenticado');

            await this.goalsRef.doc(id).update({
                ...updates,
                updatedAt: firebase.firestore.FieldValue.serverTimestamp()
            });
            console.log('Meta atualizada:', id);
        } catch (error) {
            console.error('Erro ao atualizar meta:', error);
            throw error;
        }
    }

    async deleteGoal(id) {
        try {
            const user = window.FirebaseAuth.currentUser;
            if (!user) throw new Error('Usuário não autenticado');

            await this.goalsRef.doc(id).delete();
            console.log('Meta deletada:', id);
        } catch (error) {
            console.error('Erro ao deletar meta:', error);
            throw error;
        }
    }

    async getGoalById(id) {
        try {
            const user = window.FirebaseAuth.currentUser;
            if (!user) throw new Error('Usuário não autenticado');

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
            throw error;
        }
    }

    async updateGoalProgress(id, currentAmount) {
        try {
            const user = window.FirebaseAuth.currentUser;
            if (!user) throw new Error('Usuário não autenticado');

            await this.goalsRef.doc(id).update({
                current: currentAmount,
                updatedAt: firebase.firestore.FieldValue.serverTimestamp()
            });
            console.log('Progresso da meta atualizado:', id);
        } catch (error) {
            console.error('Erro ao atualizar progresso da meta:', error);
            throw error;
        }
    }
}

// Disponibiliza globalmente
window.GoalsModule = new GoalManager();

console.log('Módulo de metas carregado'); 
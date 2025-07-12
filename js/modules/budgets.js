// Módulo de orçamentos usando instâncias globais do Firebase
class BudgetManager {
    constructor() {
        this.db = window.FirebaseDB;
        this.budgetsRef = this.db.collection('budgets');
    }

    async addBudget(budgetData) {
        try {
            const user = window.FirebaseAuth.currentUser;
            if (!user) throw new Error('Usuário não autenticado');

            // Obter nome da categoria
            const category = await CategoriesModule.getCategoryById(budgetData.categoryId);
            if (!category) throw new Error('Categoria não encontrada');

            const budget = {
                ...budgetData,
                categoryName: category.name,
                userId: user.uid,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                updatedAt: firebase.firestore.FieldValue.serverTimestamp()
            };

            const docRef = await this.budgetsRef.add(budget);
            console.log('Orçamento adicionado com ID:', docRef.id);
            return docRef.id;
        } catch (error) {
            console.error('Erro ao adicionar orçamento:', error);
            throw error;
        }
    }

    async getBudgets() {
        try {
            const user = window.FirebaseAuth.currentUser;
            if (!user) throw new Error('Usuário não autenticado');

            const snapshot = await this.budgetsRef
                .where('userId', '==', user.uid)
                .get();

            const budgets = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));

            return budgets.sort((a, b) => a.amount - b.amount);
        } catch (error) {
            console.error('Erro ao buscar orçamentos:', error);
            throw error;
        }
    }

    async updateBudget(id, updates) {
        try {
            const user = window.FirebaseAuth.currentUser;
            if (!user) throw new Error('Usuário não autenticado');

            await this.budgetsRef.doc(id).update({
                ...updates,
                updatedAt: firebase.firestore.FieldValue.serverTimestamp()
            });
            console.log('Orçamento atualizado:', id);
        } catch (error) {
            console.error('Erro ao atualizar orçamento:', error);
            throw error;
        }
    }

    async deleteBudget(id) {
        try {
            const user = window.FirebaseAuth.currentUser;
            if (!user) throw new Error('Usuário não autenticado');

            await this.budgetsRef.doc(id).delete();
            console.log('Orçamento deletado:', id);
        } catch (error) {
            console.error('Erro ao deletar orçamento:', error);
            throw error;
        }
    }

    async getBudgetById(id) {
        try {
            const user = window.FirebaseAuth.currentUser;
            if (!user) throw new Error('Usuário não autenticado');

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
            throw error;
        }
    }

    async getBudgetByCategory(categoryId) {
        try {
            const user = window.FirebaseAuth.currentUser;
            if (!user) throw new Error('Usuário não autenticado');

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
            throw error;
        }
    }

    async getTotalBudget() {
        try {
            const user = window.FirebaseAuth.currentUser;
            if (!user) throw new Error('Usuário não autenticado');

            const snapshot = await this.budgetsRef
                .where('userId', '==', user.uid)
                .get();

            return snapshot.docs.reduce((total, doc) => {
                return total + (doc.data().amount || 0);
            }, 0);
        } catch (error) {
            console.error('Erro ao calcular orçamento total:', error);
            throw error;
        }
    }

    async getBudgetsWithBalance() {
        try {
            const user = window.FirebaseAuth.currentUser;
            if (!user) throw new Error('Usuário não autenticado');

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
            throw error;
        }
    }
}

// Disponibiliza globalmente
window.BudgetsModule = new BudgetManager();

console.log('Módulo de orçamentos carregado'); 
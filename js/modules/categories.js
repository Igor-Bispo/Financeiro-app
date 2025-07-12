// Módulo de categorias usando instâncias globais do Firebase
class CategoryManager {
    constructor() {
        this.db = window.FirebaseDB;
        this.categoriesRef = this.db.collection('categories');
    }

    async addCategory(category) {
        try {
            const user = window.FirebaseAuth.currentUser;
            if (!user) throw new Error('Usuário não autenticado');

            const categoryData = {
                ...category,
                userId: user.uid,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                updatedAt: firebase.firestore.FieldValue.serverTimestamp()
            };

            const docRef = await this.categoriesRef.add(categoryData);
            console.log('Categoria adicionada com ID:', docRef.id);
            return docRef.id;
        } catch (error) {
            console.error('Erro ao adicionar categoria:', error);
            throw error;
        }
    }

    async getCategories() {
        try {
            const user = window.FirebaseAuth.currentUser;
            if (!user) throw new Error('Usuário não autenticado');

            const snapshot = await this.categoriesRef
                .where('userId', '==', user.uid)
                .get();

            const categories = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));

            return categories.sort((a, b) => a.name.localeCompare(b.name));
        } catch (error) {
            console.error('Erro ao buscar categorias:', error);
            throw error;
        }
    }

    async updateCategory(id, updates) {
        try {
            const user = window.FirebaseAuth.currentUser;
            if (!user) throw new Error('Usuário não autenticado');

            await this.categoriesRef.doc(id).update({
                ...updates,
                updatedAt: firebase.firestore.FieldValue.serverTimestamp()
            });
            console.log('Categoria atualizada:', id);
        } catch (error) {
            console.error('Erro ao atualizar categoria:', error);
            throw error;
        }
    }

    async deleteCategory(id) {
        try {
            const user = window.FirebaseAuth.currentUser;
            if (!user) throw new Error('Usuário não autenticado');

            // Antes de deletar, atualize as transações que usam esta categoria
            const transactions = await TransactionsModule.getTransactionsByCategory(id);
            const batch = this.db.batch();
            
            transactions.forEach(transaction => {
                const ref = this.db.collection('transactions').doc(transaction.id);
                batch.update(ref, { 
                    categoryId: null, 
                    categoryName: 'Sem categoria' 
                });
            });
            
            // Deletar a categoria
            batch.delete(this.categoriesRef.doc(id));
            await batch.commit();
            
            console.log('Categoria deletada:', id);
        } catch (error) {
            console.error('Erro ao deletar categoria:', error);
            throw error;
        }
    }

    async getCategoryById(id) {
        try {
            const user = window.FirebaseAuth.currentUser;
            if (!user) throw new Error('Usuário não autenticado');

            const doc = await this.categoriesRef.doc(id).get();
            if (doc.exists && doc.data().userId === user.uid) {
                return {
                    id: doc.id,
                    ...doc.data()
                };
            }
            return null;
        } catch (error) {
            console.error('Erro ao buscar categoria:', error);
            throw error;
        }
    }
}

// Disponibiliza globalmente
window.CategoriesModule = new CategoryManager();

console.log('Módulo de categorias carregado'); 
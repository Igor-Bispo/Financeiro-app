// Módulo de transações usando instâncias globais do Firebase
class TransactionManager {
    constructor() {
        this.db = window.FirebaseDB;
        this.transactionsRef = this.db.collection('transactions');
        this.offlineDB = window.OfflineDB;
        this.showNotification = window.showNotification;
    }

    async addTransaction(transaction) {
        try {
            if (!navigator.onLine) {
                await this.offlineDB.save('pendingTransactions', transaction);
                this.showNotification && this.showNotification('Transação salva localmente. Será sincronizada quando online', 'info');
                return 'offline';
            }
            const user = window.FirebaseAuth.currentUser;
            if (!user) throw new Error('Usuário não autenticado');

            const transactionData = {
                ...transaction,
                userId: user.uid,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                updatedAt: firebase.firestore.FieldValue.serverTimestamp()
            };

            const docRef = await this.transactionsRef.add(transactionData);
            console.log('Transação adicionada com ID:', docRef.id);
            return docRef.id;
        } catch (error) {
            console.error('Erro ao adicionar transação:', error);
            throw error;
        }
    }

    async getTransactions() {
        try {
            const user = window.FirebaseAuth.currentUser;
            if (!user) throw new Error('Usuário não autenticado');

            // Consulta simplificada para evitar problemas de índice
            const snapshot = await this.transactionsRef
                .where('userId', '==', user.uid)
                .get();

            // Ordenar no cliente para evitar necessidade de índice composto
            const transactions = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));

            // Ordenar por data de criação (mais recente primeiro)
            return transactions.sort((a, b) => {
                const dateA = a.createdAt ? a.createdAt.toDate() : new Date(a.date || 0);
                const dateB = b.createdAt ? b.createdAt.toDate() : new Date(b.date || 0);
                return dateB - dateA;
            });
        } catch (error) {
            console.error('Erro ao buscar transações:', error);
            throw error;
        }
    }

    async updateTransaction(id, updates) {
        try {
            const user = window.FirebaseAuth.currentUser;
            if (!user) throw new Error('Usuário não autenticado');

            await this.transactionsRef.doc(id).update({
                ...updates,
                updatedAt: firebase.firestore.FieldValue.serverTimestamp()
            });
            console.log('Transação atualizada:', id);
        } catch (error) {
            console.error('Erro ao atualizar transação:', error);
            throw error;
        }
    }

    async deleteTransaction(id) {
        try {
            const user = window.FirebaseAuth.currentUser;
            if (!user) throw new Error('Usuário não autenticado');

            await this.transactionsRef.doc(id).delete();
            console.log('Transação deletada:', id);
        } catch (error) {
            console.error('Erro ao deletar transação:', error);
            throw error;
        }
    }

    async getTransactionsByCategory(category) {
        try {
            const user = window.FirebaseAuth.currentUser;
            if (!user) throw new Error('Usuário não autenticado');

            // Consulta simplificada
            const snapshot = await this.transactionsRef
                .where('userId', '==', user.uid)
                .where('category', '==', category)
                .get();

            const transactions = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));

            // Ordenar no cliente
            return transactions.sort((a, b) => {
                const dateA = a.createdAt ? a.createdAt.toDate() : new Date(a.date || 0);
                const dateB = b.createdAt ? b.createdAt.toDate() : new Date(b.date || 0);
                return dateB - dateA;
            });
        } catch (error) {
            console.error('Erro ao buscar transações por categoria:', error);
            throw error;
        }
    }

    async getTransactionsByDateRange(startDate, endDate) {
        try {
            const user = window.FirebaseAuth.currentUser;
            if (!user) throw new Error('Usuário não autenticado');

            // Consulta simplificada
            const snapshot = await this.transactionsRef
                .where('userId', '==', user.uid)
                .get();

            const transactions = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));

            // Filtrar e ordenar no cliente
            return transactions
                .filter(transaction => {
                    const transactionDate = new Date(transaction.date || transaction.createdAt?.toDate() || 0);
                    return transactionDate >= startDate && transactionDate <= endDate;
                })
                .sort((a, b) => {
                    const dateA = new Date(a.date || a.createdAt?.toDate() || 0);
                    const dateB = new Date(b.date || b.createdAt?.toDate() || 0);
                    return dateB - dateA;
                });
        } catch (error) {
            console.error('Erro ao buscar transações por período:', error);
            throw error;
        }
    }

    async getTransactionById(id) {
        try {
            const user = window.FirebaseAuth.currentUser;
            if (!user) throw new Error('Usuário não autenticado');

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
            throw error;
        }
    }

    async clearAllTransactions() {
        try {
            const user = window.FirebaseAuth.currentUser;
            if (!user) throw new Error('Usuário não autenticado');

            const snapshot = await this.transactionsRef
                .where('userId', '==', user.uid)
                .get();

            const batch = this.db.batch();
            snapshot.docs.forEach(doc => {
                batch.delete(doc.ref);
            });

            await batch.commit();
            console.log('Todas as transações removidas');
        } catch (error) {
            console.error('Erro ao remover transações:', error);
            throw error;
        }
    }

    async getTotalIncome() {
        try {
            const user = window.FirebaseAuth.currentUser;
            if (!user) throw new Error('Usuário não autenticado');

            const snapshot = await this.transactionsRef
                .where('userId', '==', user.uid)
                .where('type', '==', 'income')
                .get();

            return snapshot.docs.reduce((total, doc) => {
                return total + (doc.data().amount || 0);
            }, 0);
        } catch (error) {
            console.error('Erro ao calcular receita total:', error);
            throw error;
        }
    }

    async getTotalExpenses() {
        try {
            const user = window.FirebaseAuth.currentUser;
            if (!user) throw new Error('Usuário não autenticado');

            const snapshot = await this.transactionsRef
                .where('userId', '==', user.uid)
                .where('type', '==', 'expense')
                .get();

            return snapshot.docs.reduce((total, doc) => {
                return total + (doc.data().amount || 0);
            }, 0);
        } catch (error) {
            console.error('Erro ao calcular despesa total:', error);
            throw error;
        }
    }

    async getTransactionHistory(id) {
        try {
            const user = window.FirebaseAuth.currentUser;
            if (!user) throw new Error('Usuário não autenticado');

            const doc = await this.transactionsRef.doc(id).get();
            if (doc.exists && doc.data().userId === user.uid) {
                return doc.data().history || [];
            }
            return [];
        } catch (error) {
            console.error('Erro ao buscar histórico da transação:', error);
            throw error;
        }
    }

    async getTransactionsByCategory(categoryId) {
        try {
            const user = window.FirebaseAuth.currentUser;
            if (!user) throw new Error('Usuário não autenticado');

            const snapshot = await this.transactionsRef
                .where('userId', '==', user.uid)
                .where('categoryId', '==', categoryId)
                .get();

            const transactions = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));

            return transactions.sort((a, b) => {
                const dateA = a.createdAt ? a.createdAt.toDate() : new Date(a.date || 0);
                const dateB = b.createdAt ? b.createdAt.toDate() : new Date(b.date || 0);
                return dateB - dateA;
            });
        } catch (error) {
            console.error('Erro ao buscar transações por categoria:', error);
            throw error;
        }
    }
}

// Disponibiliza globalmente
window.TransactionsModule = new TransactionManager();

console.log('Módulo de transações carregado'); 
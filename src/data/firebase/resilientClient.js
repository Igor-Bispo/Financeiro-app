import networkHandler from '../../core/network/networkHandler.js';
import { db, auth } from './client.js';
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query as buildQuery
} from 'firebase/firestore';
import { signInWithCredential as fbSignInWithCredential, signOut as fbSignOut } from 'firebase/auth';

/**
 * Cliente Firebase resiliente com retry automático
 */
class ResilientFirebaseClient {
  constructor() {
    this.db = null;
    this.auth = null;
    this.listeners = new Map();
    this.isInitialized = false;
    console.log('🔥 [ResilientFirebaseClient] Inicializado');
  }

  async initialize() {
    try {
      this.auth = auth;
      this.db = db;
      this.isInitialized = true;

      this.setupReconnectionListeners();

      console.log('✅ [ResilientFirebaseClient] Firebase (modular) inicializado com sucesso');
    } catch (error) {
      console.error('❌ [ResilientFirebaseClient] Erro ao inicializar (modular):', error);
      throw error;
    }
  }

  setupReconnectionListeners() {
    if (window.eventBus) {
      window.eventBus.on('firebase:reconnect-listeners', () => {
        this.reconnectAllListeners();
      });
    }
  }

  async executeWithRetry(operation, context = 'operação Firebase') {
    if (!networkHandler.canExecuteOperation()) {
      await networkHandler.waitForConnection();
    }

    return networkHandler.retryOperation(operation, context);
  }

  // Firestore Operations com retry
  async addDocument(collectionName, data) {
    return this.executeWithRetry(async () => {
      const ref = await addDoc(collection(this.db, collectionName), data);
      console.log(`✅ [ResilientFirebaseClient] Documento adicionado: ${ref.id}`);
      return ref;
    }, `adicionar documento em ${collectionName}`);
  }

  async updateDocument(collectionName, docId, data) {
    return this.executeWithRetry(async () => {
      await updateDoc(doc(this.db, collectionName, docId), data);
      console.log(`✅ [ResilientFirebaseClient] Documento atualizado: ${docId}`);
    }, `atualizar documento ${docId}`);
  }

  async deleteDocument(collectionName, docId) {
    return this.executeWithRetry(async () => {
      await deleteDoc(doc(this.db, collectionName, docId));
      console.log(`✅ [ResilientFirebaseClient] Documento deletado: ${docId}`);
    }, `deletar documento ${docId}`);
  }

  async getDocument(collectionName, docId) {
    return this.executeWithRetry(async () => {
      const snap = await getDoc(doc(this.db, collectionName, docId));
      if (snap.exists()) {
        return { id: snap.id, ...snap.data() };
      }
      return null;
    }, `buscar documento ${docId}`);
  }

  async getDocuments(collectionName, queryFn = null) {
    return this.executeWithRetry(async () => {
      let ref = collection(this.db, collectionName);
      let q = ref;
      if (typeof queryFn === 'function') {
        // queryFn deve receber (ref, buildQuery) e retornar um Query
        q = queryFn(ref, buildQuery) || ref;
      }
      const snapshot = await getDocs(q);
      return snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
    }, `buscar documentos de ${collectionName}`);
  }

  // Listener resiliente
  addResilientListener(collectionName, callback, queryFn = null, listenerId = null) {
    const id = listenerId || `${collectionName}_${Date.now()}`;
    
    const createListener = () => {
      try {
        const ref = collection(this.db, collectionName);
        const q = typeof queryFn === 'function' ? (queryFn(ref, buildQuery) || ref) : ref;
        const unsubscribe = onSnapshot(
          q,
          (snapshot) => {
            console.log(`📡 [ResilientFirebaseClient] Listener ${id} recebeu dados`);
            const docs = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
            callback(docs, null);
          },
          (error) => {
            console.error(`❌ [ResilientFirebaseClient] Erro no listener ${id}:`, error);
            callback(null, error);
            setTimeout(() => {
              if (this.listeners.has(id)) {
                console.log(`🔄 [ResilientFirebaseClient] Reconectando listener ${id}...`);
                this.removeListener(id);
                this.addResilientListener(collectionName, callback, queryFn, id);
              }
            }, 5000);
          }
        );
        
        this.listeners.set(id, {
          unsubscribe,
          collection: collectionName,
          callback,
          queryFn,
          createdAt: new Date()
        });
        
        console.log(`✅ [ResilientFirebaseClient] Listener ${id} criado para ${collectionName}`);
        return id;
        
      } catch (error) {
        console.error(`❌ [ResilientFirebaseClient] Erro ao criar listener ${id}:`, error);
        
        // Tentar novamente após erro
        setTimeout(() => {
          console.log(`🔄 [ResilientFirebaseClient] Tentando recriar listener ${id}...`);
          createListener();
        }, 3000);
      }
    };

    return createListener();
  }

  removeListener(listenerId) {
    const listener = this.listeners.get(listenerId);
    if (listener) {
      listener.unsubscribe();
      this.listeners.delete(listenerId);
      console.log(`🗑️ [ResilientFirebaseClient] Listener ${listenerId} removido`);
    }
  }

  removeAllListeners() {
    console.log('🗑️ [ResilientFirebaseClient] Removendo todos os listeners...');
    this.listeners.forEach((listener) => {
      listener.unsubscribe();
    });
    this.listeners.clear();
  }

  reconnectAllListeners() {
    console.log('🔄 [ResilientFirebaseClient] Reconectando todos os listeners...');
    
    const listenersToReconnect = Array.from(this.listeners.entries());
    this.removeAllListeners();
    
    listenersToReconnect.forEach(([id, listener]) => {
      setTimeout(() => {
        this.addResilientListener(
          listener.collection,
          listener.callback,
          listener.queryFn,
          id
        );
      }, Math.random() * 2000); // Espalhar reconexões
    });
  }

  // Auth operations com retry
  async signInWithCredential(credential) {
    return this.executeWithRetry(async () => {
      const result = await fbSignInWithCredential(this.auth, credential);
      console.log('✅ [ResilientFirebaseClient] Login realizado com sucesso');
      return result;
    }, 'login com credencial');
  }

  async signOut() {
    return this.executeWithRetry(async () => {
      await fbSignOut(this.auth);
      console.log('✅ [ResilientFirebaseClient] Logout realizado');
    }, 'logout');
  }

  // Verificar status de conectividade Firebase
  checkFirebaseConnection() {
    if (!this.isInitialized) return false;
    
    try {
      // Verificar se o Firebase ainda está conectado
      return this.auth.currentUser !== undefined && this.db !== null;
    } catch {
      return false;
    }
  }
}

// Instância global
const resilientFirebaseClient = new ResilientFirebaseClient();
window.ResilientFirebaseClient = resilientFirebaseClient;
export default resilientFirebaseClient;
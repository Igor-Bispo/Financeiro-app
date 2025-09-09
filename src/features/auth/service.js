// features/auth/service.js
// Fluxos de autenticaÃ§Ã£o (orquestra repositÃ³rios e emite eventos/stores)
import { auth, authReady } from '@data/firebase/client.js';
import {
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut
} from 'firebase/auth';
import { eventBus } from '@core/events/eventBus.js';
import { createStore } from '@core/store/createStore.js';

// Store local para autenticaÃ§Ã£o
export const authStore = createStore({
  user: null,
  loading: true,
  error: null
});

// Aguardar autenticaÃ§Ã£o inicial
export function waitForAuth() {
  return new Promise((resolve) => {
    const start = () => onAuthStateChanged(auth, (user) => {
      authStore.setState({ user, loading: false });
      eventBus.emit('auth:changed', user);

      // Garantir que o perfil do usuÃ¡rio esteja salvo/atualizado
      if (user) {
        ensureUserProfile(user).catch(() => {});
      }

      if (user) {
        resolve(user);
      } else {
        resolve(null);
      }

      // Parar de escutar apÃ³s primeira autenticaÃ§Ã£o
      unsubscribe();
    });
    let unsubscribe;
    authReady
      .then(() => { unsubscribe = start(); })
      .catch(() => { unsubscribe = start(); });
  });
}

// Login com Google
export async function loginWithGoogle() {
  try {
    authStore.setState({ loading: true, error: null });
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);

    // Salvar perfil do usuÃ¡rio
    try {
      await ensureUserProfile(result.user);
    } catch {}

    authStore.setState({ user: result.user, loading: false });
    eventBus.emit('auth:login', result.user);

    return result.user;
  } catch (error) {
    authStore.setState({ error: error.message, loading: false });
    eventBus.emit('auth:error', error);
    throw error;
  }
}

// Logout
export async function logout() {
  try {
    await signOut(auth);
    authStore.setState({ user: null });
    eventBus.emit('auth:logout');
  } catch (error) {
    authStore.setState({ error: error.message });
    eventBus.emit('auth:error', error);
    throw error;
  }
}

// Obter usuÃ¡rio atual
export function getCurrentUser() {
  return authStore.getState().user;
}

// Verificar se estÃ¡ autenticado
export function isAuthenticated() {
  return !!authStore.getState().user;
}

// Garante que o documento do usuÃ¡rio exista/esteja atualizado em /users/{uid}
export async function ensureUserProfile(user) {
  try {
    if (!user || !user.uid) return;
    const { doc, getDoc, setDoc, updateDoc, serverTimestamp } = await import('firebase/firestore');
    const { db } = await import('@data/firebase/client.js');

    const ref = doc(db, 'users', user.uid);
    const snap = await getDoc(ref);
    const base = {
      uid: user.uid,
      email: user.email || null,
      emailLower: user.email ? String(user.email).toLowerCase() : null,
      displayName: user.displayName || null,
      photoURL: user.photoURL || null,
      providers: Array.isArray(user.providerData) ? user.providerData.map(p => p?.providerId).filter(Boolean) : [],
      lastLoginAt: serverTimestamp(),
    };
    if (!snap.exists()) {
      await setDoc(ref, { ...base, createdAt: serverTimestamp() }, { merge: true });
    } else {
      await updateDoc(ref, base);
    }
  } catch (err) {

    console.warn('ensureUserProfile: falha ao salvar perfil do usuÃ¡rio:', err?.message || err);
  }
}

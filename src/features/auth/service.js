// features/auth/service.js
// Fluxos de autenticação (orquestra repositórios e emite eventos/stores)
import { onAuthStateChanged, signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';
import { auth } from '@data/firebase/client.js';
import { authStore } from './store.js';
import { eventBus } from '@core/events/eventBus.js';
import logger from '@core/logger/logger.js';

export function initAuthListener() {
  onAuthStateChanged(auth, (user) => {
    authStore.setState({ user });
    eventBus.emit('auth:changed', { user });
  });
}

export async function loginWithGoogle() {
  const provider = new GoogleAuthProvider();
  const res = await signInWithPopup(auth, provider);
  logger.info('auth.login', { uid: res.user?.uid, email: res.user?.email });
  return res.user;
}

export async function logout() {
  await signOut(auth);
  logger.info('auth.logout');
}

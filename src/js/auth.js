import { GoogleAuthProvider, signInWithPopup, signInWithRedirect, getAuth } from 'firebase/auth';
import { auth } from './firebase.js';
import { Snackbar } from './ui/Snackbar.js';

export async function loginWithGoogle() {
  try {
    const provider = new GoogleAuthProvider();
    // Edge/Tracking Prevention pode bloquear fechamento do popup; usar redirect nesses casos
    const ua = (navigator.userAgent || '').toLowerCase();
    const isEdge = ua.includes('edg/');
    if (isEdge) {
      await signInWithRedirect(auth, provider);
      // A resolução virá via onAuthStateChanged após o redirect
      return new Promise((resolve) => {
        const unsub = getAuth().onAuthStateChanged((user) => {
          if (user) {
            unsub();
            resolve(user);
          }
        });
      });
    }
    const result = await signInWithPopup(auth, provider);
    return result.user;
  } catch (error) {
    if (error.code === 'auth/cancelled-popup-request') {
      Snackbar({ message: 'Login cancelado. Tente novamente.', type: 'info' });
    } else {
      Snackbar({
        message: 'Erro ao fazer login: ' + error.message,
        type: 'error'
      });
    }
    throw error;
  }
}

export function logout() {
  const auth = getAuth();
  auth.signOut();
}

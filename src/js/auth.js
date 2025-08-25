import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';
import { auth } from './firebase.js';
import { Snackbar } from './ui/Snackbar.js';

export async function loginWithGoogle() {
  try {
    const provider = new GoogleAuthProvider();
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

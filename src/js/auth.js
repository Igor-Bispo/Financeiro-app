import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';
import { auth } from './firebase.js';

export async function loginWithGoogle() {
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);
  return result.user;
}

export function logout() {
  const auth = getAuth();
  auth.signOut();
}

// data/repositories/userSettingsRepo.js
// PreferÃªncias do usuÃ¡rio (ex.: notificaÃ§Ãµes) persistidas no Firestore

import { db } from '../firebase/client.js';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';

const COLL = 'userSettings';

export async function getByUser(userId) {
  if (!userId) {
    return null;
  }
  const ref = doc(db, COLL, userId);
  const snap = await getDoc(ref);
  return snap.exists() ? { id: snap.id, ...snap.data() } : null;
}

export async function setNotificationPrefs(userId, prefs) {
  if (!userId) {
    return false;
  }
  const ref = doc(db, COLL, userId);
  const docData = { notificationPrefs: prefs };
  const existing = await getDoc(ref);
  if (existing.exists()) {
    await updateDoc(ref, docData);
  } else {
    await setDoc(ref, docData);
  }
  return true;
}

export async function mergeNotificationPrefs(userId, patch) {
  if (!userId) {
    return false;
  }
  const ref = doc(db, COLL, userId);
  const snap = await getDoc(ref);
  const cur = snap.exists() ? (snap.data().notificationPrefs || {}) : {};
  const merged = { ...cur, ...patch };
  await setNotificationPrefs(userId, merged);
  return merged;
}

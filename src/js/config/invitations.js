// invitations.js - módulo para gerenciamento de convites
import { collection, query, where, getDocs, getDoc, updateDoc, addDoc as _addDoc, serverTimestamp, arrayUnion, doc } from 'firebase/firestore';
import { db } from '../firebase.js';

export function normalizeInvitationStatus(s) {
  if (!s && s !== 0) return 'pending';
  return String(s).trim().toLowerCase();
}

export function isInvitationClosed(status) {
  const st = normalizeInvitationStatus(status);
  return ['accepted','declined','rejected','recusado','aceito','cancelled','canceled','cancelado'].includes(st);
}

export async function loadBudgetInvitations(user) {
  if (!user) return [];
  const qByUid = query(collection(db, 'budgetInvitations'), where('invitedUserId', '==', user.uid));
  const qByEmailLower = query(collection(db, 'budgetInvitations'), where('invitedUserEmailLower', '==', (user.email || '').toLowerCase()));
  const qByEmailExact = query(collection(db, 'budgetInvitations'), where('invitedUserEmail', '==', user.email || ''));
  const [snapUid, snapEmailLower, snapEmailExact] = await Promise.all([
    getDocs(qByUid),
    getDocs(qByEmailLower),
    getDocs(qByEmailExact)
  ]);
  const combineDocs = (arrs) => {
    const map = new Map();
    for (const arr of arrs) { for (const d of arr) { if (!map.has(d.id)) map.set(d.id, d); } }
    return Array.from(map.values());
  };
  const docs = combineDocs([snapUid.docs, snapEmailLower.docs, snapEmailExact.docs]);
  const items = [];
  for (const d of docs) {
    const data = d.data();
    if (!isInvitationClosed(data.status)) items.push({ id: d.id, ...data });
  }
  items.sort((a,b) => {
    const da = a.createdAt ? (a.createdAt.toDate ? a.createdAt.toDate() : (a.createdAt.seconds ? new Date(a.createdAt.seconds*1000) : new Date(a.createdAt))) : new Date(0);
    const dbb = b.createdAt ? (b.createdAt.toDate ? b.createdAt.toDate() : (b.createdAt.seconds ? new Date(b.createdAt.seconds*1000) : new Date(b.createdAt))) : new Date(0);
    return dbb - da;
  });
  return items;
}

export async function loadSentBudgetInvitations(user) {
  if (!user) return [];
  const qSent = query(collection(db, 'budgetInvitations'), where('invitedByUserId', '==', user.uid));
  const snap = await getDocs(qSent);
  const items = [];
  for (const d of snap.docs) {
    const data = d.data();
    if (!isInvitationClosed(data.status)) items.push({ id: d.id, ...data });
  }
  items.sort((a,b) => {
    const da = a.createdAt ? (a.createdAt.toDate ? a.createdAt.toDate() : (a.createdAt.seconds ? new Date(a.createdAt.seconds*1000) : new Date(a.createdAt))) : new Date(0);
    const dbb = b.createdAt ? (b.createdAt.toDate ? b.createdAt.toDate() : (b.createdAt.seconds ? new Date(b.createdAt.seconds*1000) : new Date(b.createdAt))) : new Date(0);
    return dbb - da;
  });
  return items;
}

export async function acceptBudgetInvitation(invitationId, user) {
  if (!user) throw new Error('Usuário não autenticado');
  const invitationRef = doc(db, 'budgetInvitations', invitationId);
  const invitationSnap = await getDoc(invitationRef);
  if (!invitationSnap.exists()) throw new Error('Convite não encontrado');
  const inv = invitationSnap.data();
  const emailLower = (user.email || '').toLowerCase();
  const isForMe = inv.invitedUserId === user.uid || ((inv.invitedUserEmail || '').toLowerCase() === emailLower) || (inv.invitedUserEmailLower === emailLower);
  if (!isForMe) throw new Error('Este convite não é para você');
  const budgetRef = doc(db, 'budgets', inv.budgetId);
  const budgetSnap = await getDoc(budgetRef);
  if (!budgetSnap.exists()) throw new Error('Orçamento não encontrado');
  if (!inv.invitedUserId) {
    await updateDoc(invitationRef, { invitedUserId: user.uid, updatedAt: serverTimestamp() });
  }
  await updateDoc(budgetRef, {
    usuariosPermitidos: arrayUnion(user.uid),
    updatedAt: serverTimestamp()
  });
  await updateDoc(invitationRef, { status: 'accepted', acceptedAt: serverTimestamp(), updatedAt: serverTimestamp() });
  return true;
}

export async function declineBudgetInvitation(invitationId, user) {
  if (!user) throw new Error('Usuário não autenticado');
  const invitationRef = doc(db, 'budgetInvitations', invitationId);
  const invitationSnap = await getDoc(invitationRef);
  if (!invitationSnap.exists()) throw new Error('Convite não encontrado');
  const inv = invitationSnap.data();
  const emailLower = (user.email || '').toLowerCase();
  const isForMe = inv.invitedUserId === user.uid || ((inv.invitedUserEmail || '').toLowerCase() === emailLower) || (inv.invitedUserEmailLower === emailLower);
  if (!isForMe) throw new Error('Este convite não é para você');
  if (isInvitationClosed(inv.status)) throw new Error('Este convite já foi finalizado');
  await updateDoc(invitationRef, { status: 'declined', declinedAt: serverTimestamp(), updatedAt: serverTimestamp() });
  return true;
}

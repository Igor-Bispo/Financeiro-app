// src/js/config/settings.service.js

import { doc, updateDoc, deleteDoc, collection, query, where, getDocs, getDoc, serverTimestamp, arrayUnion, addDoc } from 'firebase/firestore';
import { db } from '../firebase.js';
import { getById as getBudgetById, loadUserBudgets } from '@features/budgets/service.js';


/**
 * Carrega os convites de orçamento pendentes para um usuário.
 * @param {string} userId - O UID do usuário.
 * @returns {Promise<Array>} Uma lista de convites.
 */
export async function loadBudgetInvitations(userId) {
  if (!userId) return [];
  try {
    console.log('[DEBUG] Carregando convites para userId:', userId);

    // Buscar convites por invitedUserId (sem filtro de status para evitar índice composto)
    const q1 = query(collection(db, 'budgetInvitations'), where('invitedUserId', '==', userId));
    const snapshot1 = await getDocs(q1);
    console.log('[DEBUG] Convites por invitedUserId:', snapshot1.docs.length);

    // Também buscar por email (para compatibilidade)
    const user = window.appState?.currentUser;
    let invitations;
    if (user?.email) {
      const q2 = query(collection(db, 'budgetInvitations'), where('invitedUserEmail', '==', user.email));
      const snapshot2 = await getDocs(q2);
      console.log('[DEBUG] Convites por email:', snapshot2.docs.length);

      // Combinar resultados únicos
      const allInvitations = new Map();
      [...snapshot1.docs, ...snapshot2.docs].forEach(doc => {
        allInvitations.set(doc.id, { id: doc.id, ...doc.data() });
      });
      invitations = Array.from(allInvitations.values()).filter(inv => inv.status === 'pending');
      console.log('[DEBUG] Total de convites únicos (pending):', invitations.length);
    } else {
      invitations = snapshot1.docs.map(d => ({ id: d.id, ...d.data() })).filter(inv => inv.status === 'pending');
      console.log('[DEBUG] Convites encontrados (pending):', invitations.length);
    }
    const budgetCache = new Map();
    const ownerCache = new Map();
    for (const inv of invitations) {
      if (inv.budgetId) {
        if (!budgetCache.has(inv.budgetId)) {
          const bRef = doc(db, 'budgets', inv.budgetId);
          const bSnap = await getDoc(bRef);
          budgetCache.set(inv.budgetId, bSnap.exists() ? bSnap.data() : null);
        }
        const bData = budgetCache.get(inv.budgetId);
        inv.budgetName = inv.budgetName || bData?.nome || 'Orçamento';
        const ownerId = bData?.userId;
        if (ownerId) {
          if (!ownerCache.has(ownerId)) {
            const oRef = doc(db, 'users', ownerId);
            const oSnap = await getDoc(oRef);
            ownerCache.set(ownerId, oSnap.exists() ? oSnap.data() : null);
          }
          inv.ownerEmail = inv.ownerEmail || ownerCache.get(ownerId)?.email || 'proprietario';
        }
      }
    }
    return invitations;
  } catch (error) {
    console.error('Erro ao carregar convites de orçamento:', error);

    // Se for erro de permissão, retornar array vazio em vez de falhar
    if (error.code === 'permission-denied') {
      console.warn('Permissões insuficientes para carregar convites, retornando array vazio');
      return [];
    }

    throw error;
  }
}

/**
 * Carrega os convites enviados de um orçamento específico.
 * @param {string} budgetId - O ID do orçamento.
 * @returns {Promise<Array>} Uma lista de convites enviados.
 */
export async function loadSentBudgetInvitations(budgetId) {
  if (!budgetId) return [];
  try {
    const q = query(collection(db, 'budgetInvitations'), where('budgetId', '==', budgetId));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(d => ({ id: d.id, ...d.data() })).filter(inv => inv.status === 'pending');
  } catch (error) {
    console.error('Erro ao carregar convites enviados:', error);

    // Se for erro de permissão, retornar array vazio em vez de falhar
    if (error.code === 'permission-denied') {
      console.warn('Permissões insuficientes para carregar convites enviados, retornando array vazio');
      return [];
    }

    throw error;
  }
}

/**
 * Aceita um convite de orçamento.
 * @param {string} invitationId - O ID do convite.
 */
export async function acceptBudgetInvitation(invitationId) {
  console.log('[DEBUG] Aceitando convite:', invitationId);
  const invitationRef = doc(db, 'budgetInvitations', invitationId);
  await updateDoc(invitationRef, { status: 'accepted', acceptedAt: serverTimestamp() });

  const invitationSnap = await getDoc(invitationRef);
  const invitationData = invitationSnap.data();
  console.log('[DEBUG] Dados do convite:', invitationData);

  if (invitationData && invitationData.budgetId) {
    // Usar o currentUser.uid em vez do invitedUserId do convite
    const currentUserId = window.appState?.currentUser?.uid;
    if (!currentUserId) {
      throw new Error('Usuário não autenticado');
    }

    console.log('[DEBUG] Adicionando usuário ao orçamento:', {
      budgetId: invitationData.budgetId,
      currentUserId: currentUserId
    });

    const budgetRef = doc(db, 'budgets', invitationData.budgetId);
    await updateDoc(budgetRef, {
      usuariosPermitidos: arrayUnion(currentUserId)
    });

    console.log('[DEBUG] Usuário adicionado ao orçamento com sucesso');
  } else {
    console.error('[DEBUG] Dados do convite inválidos:', {
      hasInvitationData: !!invitationData,
      hasBudgetId: !!invitationData?.budgetId
    });
    throw new Error('Dados do convite inválidos');
  }
}

/**
 * Recusa um convite de orçamento.
 * @param {string} invitationId - O ID do convite.
 */
export async function declineBudgetInvitation(invitationId) {
  const invitationRef = doc(db, 'budgetInvitations', invitationId);
  await updateDoc(invitationRef, { status: 'declined' });
}

/**
 * Remove um usuário de um orçamento.
 * @param {string} budgetId - O ID do orçamento.
 * @param {string} uidToRemove - O UID do usuário a ser removido.
 * @returns {Promise<void>}
 */
export async function removeUserFromBudget(budgetId, uidToRemove) {
  const budgetRef = doc(db, 'budgets', budgetId);
  const budgetSnap = await getDoc(budgetRef);
  if (!budgetSnap.exists()) {
    throw new Error('Orçamento não encontrado.');
  }
  const budgetData = budgetSnap.data();
  const currentAllowedUsers = budgetData.usuariosPermitidos || [];
  const updatedUsers = currentAllowedUsers.filter(userId => userId !== uidToRemove);

  await updateDoc(budgetRef, {
    usuariosPermitidos: updatedUsers
  });
}

/**
 * Atualiza o nome de um orçamento.
 * @param {string} budgetId - O ID do orçamento.
 * @param {string} newName - O novo nome para o orçamento.
 */
export async function updateBudgetName(budgetId, newName) {
  const budgetRef = doc(db, 'budgets', budgetId);
  await updateDoc(budgetRef, { nome: newName });
}

/**
 * Cancela um convite enviado.
 * @param {string} invitationId - O ID do convite a ser cancelado.
 */
export async function cancelSentInvitation(invitationId) {
  const invitationRef = doc(db, 'budgetInvitations', invitationId);
  await deleteDoc(invitationRef);
}

/**
 * Busca informações de um usuário pelo UID.
 * @param {string} uid - O UID do usuário.
 * @returns {Promise<object|null>}
 */
export async function fetchUserInfo(uid) {
  if (!uid) return null;
  const userRef = doc(db, 'users', uid);
  const userSnap = await getDoc(userRef);
  return userSnap.exists() ? { uid: userSnap.id, ...userSnap.data() } : null;
}

/**
 * Busca informações de múltiplos usuários.
 * @param {Array<string>} uids - Array de UIDs de usuários.
 * @returns {Promise<Array>}
 */
export async function fetchUsersInfo(uids) {
  if (!uids || uids.length === 0) return [];
  const userPromises = uids.map(uid => fetchUserInfo(uid).catch(e => {
    console.warn(`Falha ao buscar info para UID: ${uid}`, e);
    return null; // Retorna nulo em caso de erro para não quebrar o Promise.all
  }));
  const resolvedUsers = await Promise.all(userPromises);
  return resolvedUsers.filter(Boolean); // Filtra os nulos
}

/**
 * Busca o UID de um usuário pelo email.
 * @param {string} email - O email do usuário.
 * @returns {Promise<string|null>}
 */
export async function buscarUidPorEmail(email) {
  if (!email) return null;
  const q = query(collection(db, 'users'), where('email', '==', email.toLowerCase()));
  const snapshot = await getDocs(q);
  if (snapshot.empty) {
    return null;
  }
  return snapshot.docs[0].id;
}

/**
 * Convida um usuário para um orçamento.
 * @param {string} budgetId - O ID do orçamento.
 * @param {string} email - O email do usuário a ser convidado.
 * @param {object} inviter - O usuário que está enviando o convite (deve conter o UID).
 * @returns {Promise<object>} O convite criado.
 */
export async function inviteUserToBudget(budgetId, email, inviter) {
  if (!budgetId) throw new Error('Orçamento inválido');
  if (!inviter || !inviter.uid) throw new Error('Usuário não autenticado');
  if (!email) throw new Error('Informe um email');
  const normalizedEmail = email.trim().toLowerCase();
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(normalizedEmail)) throw new Error('Email inválido');

  const budgetRef = doc(db, 'budgets', budgetId);
  const budgetSnap = await getDoc(budgetRef);
  if (!budgetSnap.exists()) throw new Error('Orçamento não encontrado');
  const budget = budgetSnap.data();

  // Verifica duplicidade (já convidado)
  const qDup = query(
    collection(db, 'budgetInvitations'),
    where('budgetId', '==', budgetId),
    where('invitedUserEmailLower', '==', normalizedEmail),
    where('status', '==', 'pending')
  );
  const dupSnap = await getDocs(qDup);
  if (!dupSnap.empty) throw new Error('Já existe um convite pendente para este email');

  // Resolve usuário convidado se já existe
  const invitedUserId = await buscarUidPorEmail(normalizedEmail);
  let ownerEmail = 'proprietario';
  try {
    if (budget.userId) {
      const oRef = doc(db, 'users', budget.userId);
      const oSnap = await getDoc(oRef);
      ownerEmail = oSnap.exists() ? (oSnap.data().email || ownerEmail) : ownerEmail;
    }
  } catch { /* ignore */ }

  const docRef = await addDoc(collection(db, 'budgetInvitations'), {
    budgetId,
    budgetName: budget.nome || 'Orçamento',
    ownerEmail,
    invitedByUserId: inviter.uid,
    invitedUserId: invitedUserId || null,
    invitedUserEmail: email.trim(),
    invitedUserEmailLower: normalizedEmail,
    status: 'pending',
    createdAt: serverTimestamp()
  });
  return { id: docRef.id };
}

// Export consolidado (evita duplicidade de named exports já declarados)
// As funções já são exportadas individualmente; este bloco fornece apenas re-exports específicos.
export { getBudgetById, loadUserBudgets };

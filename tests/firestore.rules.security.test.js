// @vitest-environment node
// Node-only test: ensure global setup skips DOM mocks
process.env.SKIP_JSDOM_GLOBAL_SETUP = '1';
import { describe, it, beforeAll, afterAll } from 'vitest';
import { initializeTestEnvironment, assertFails, assertSucceeds } from '@firebase/rules-unit-testing';
import { readFileSync } from 'fs';

// Expect FIRESTORE_EMULATOR_HOST=localhost:8080 (or similar) to be set when running emulator.
// If not present, skip suite gracefully to avoid failing normal test runs.
const EMULATOR_AVAILABLE = !!process.env.FIRESTORE_EMULATOR_HOST;
if (!EMULATOR_AVAILABLE) {
  describe.skip('Firestore security rules (skipped - FIRESTORE_EMULATOR_HOST not set)', () => {
    it('skipped', () => {});
  });
}

let testEnv;

if (EMULATOR_AVAILABLE) {
  describe('Firestore security rules', () => {
    beforeAll(async () => {
      testEnv = await initializeTestEnvironment({
        projectId: 'demo-test-project',
        firestore: { rules: readFileSync('firestore.rules', 'utf8') }
      });
    });

    afterAll(async () => {
      await testEnv.cleanup();
    });

    it('notification: recipient can read, others cannot', async () => {
      const recipient = testEnv.authenticatedContext('user_rec');
      const other = testEnv.authenticatedContext('user_other');
      const notifsDb = recipient.firestore();
      const docRef = notifsDb.collection('notifications').doc('n1');
      await docRef.set({ recipientUid: 'user_rec', senderUid: 'user_sender', message: 'Oi' });
      await assertSucceeds(recipient.firestore().collection('notifications').doc('n1').get());
      await assertFails(other.firestore().collection('notifications').doc('n1').get());
    });

    it('notification: sender can create only if senderUid == auth.uid', async () => {
      const sender = testEnv.authenticatedContext('sender1');
      const db = sender.firestore();
      await assertSucceeds(db.collection('notifications').add({ recipientUid: 'user_rec', senderUid: 'sender1', message: 'x' }));
      await assertFails(db.collection('notifications').add({ recipientUid: 'user_rec', senderUid: 'other', message: 'x' }));
    });

    it('notification: non-recipient cannot delete', async () => {
      const recipient = testEnv.authenticatedContext('user_del');
      const other = testEnv.authenticatedContext('user_x');
      const dbRec = recipient.firestore();
      const ref = dbRec.collection('notifications').doc('del1');
      await ref.set({ recipientUid: 'user_del', senderUid: 'senderZ', message: 'hey' });
      await assertFails(other.firestore().collection('notifications').doc('del1').delete());
      await assertSucceeds(recipient.firestore().collection('notifications').doc('del1').delete());
    });
  });
}

import { Cat } from '@/models/cat.model';
import admin from '@/utils/firebaseAdmin';

// Firebase Admin, or any other services you need for Server Side
export async function getCats(): Promise<Cat[]> {
  const catCall = await admin.firestore().collection('cats').get();
  const cats = [];
  for (const doc of catCall.docs) {
    cats.push({
      ...doc.data(),
      id: doc.id,
    });
  }
  return cats as unknown as Cat[];
}

export async function catById(id: string): Promise<Cat | null> {
  const doc = await admin.firestore().doc(`cats/${id}`).get();
  if (doc.exists) {
    return { id: doc.id, ...doc.data() } as unknown as Cat;
  } else {
    return null;
  }
}

/* Admin */
export async function validateAdminUser(idToken: string): Promise<boolean> {
  const userRecord = await getCookieUser(idToken);

  if (!userRecord || !userRecord.uid) {
    return false;
  }
  if (!(await isUserTeam(userRecord.uid))) {
    return false;
  }
  return true;
}
export async function getCookieUser(
  idToken: string
): Promise<admin.auth.UserRecord | null> {
  //Verify Token
  const decodedToken = admin.auth().verifyIdToken(idToken);

  if (!decodedToken) {
    return Promise.resolve(null);
  }

  return await admin.auth().getUser((await decodedToken).uid);
}
export async function isUserTeam(uid: string): Promise<boolean> {
  if (!uid) {
    return Promise.resolve(false);
  }
  const userRef = await admin.firestore().doc(`users/${uid}`).get();

  const userData = userRef.data() as { uid: string; roles: string[] };
  if (
    userData &&
    userData.roles &&
    userData.roles.some((r) => ['admin'].indexOf(r) >= 0)
  ) {
    return true;
  } else {
    return false;
  }
}

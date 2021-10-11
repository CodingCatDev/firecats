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

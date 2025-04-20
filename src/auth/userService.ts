import { db } from '../config/firebase';
import { doc, setDoc } from 'firebase/firestore';

export async function createUserProfile(
  userId: string, 
  data: { email: string; displayName: string; createdAt: string }
): Promise<void> {
  await setDoc(doc(db, 'users', userId), data);
}
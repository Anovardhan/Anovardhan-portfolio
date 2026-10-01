import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { getFirestore, doc, getDocFromServer, serverTimestamp, setDoc, collection, getDocs, onSnapshot, query, orderBy, limit } from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';
import { OperationType, handleFirestoreError } from './firestoreErrors';

// Initialize Firebase App
export const app = initializeApp(firebaseConfig);

// CRITICAL: The app will break without specifying firestoreDatabaseId
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Test Connection on Boot
export async function testFirebaseConnection(): Promise<boolean> {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
    return true;
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.warn('Firebase client is offline or network is disconnected.');
    }
    return false;
  }
}

// Automatically verify connection on initialization
testFirebaseConnection();

// Service functions
export async function submitInquiry(inquiry: {
  name: string;
  email: string;
  projectType: string;
  budget?: string;
  timeline?: string;
  message: string;
}) {
  const inquiryId = `inq_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
  const path = `inquiries/${inquiryId}`;
  try {
    await setDoc(doc(db, 'inquiries', inquiryId), {
      name: inquiry.name.trim(),
      email: inquiry.email.trim(),
      projectType: inquiry.projectType,
      budget: inquiry.budget || '$25,000 - $50,000',
      timeline: inquiry.timeline || 'Flexible',
      message: inquiry.message.trim(),
      createdAt: serverTimestamp(),
      status: 'new',
    });
    return { success: true, id: inquiryId };
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, path, auth.currentUser);
    throw error;
  }
}

export async function submitGuestbookEntry(entry: {
  authorName: string;
  authorEmail?: string;
  companyOrRole?: string;
  message: string;
}) {
  const entryId = `gb_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
  const path = `guestbook/${entryId}`;
  try {
    await setDoc(doc(db, 'guestbook', entryId), {
      authorName: entry.authorName.trim(),
      authorEmail: entry.authorEmail?.trim() || '',
      companyOrRole: entry.companyOrRole?.trim() || 'Software Engineer',
      message: entry.message.trim(),
      createdAt: serverTimestamp(),
    });
    return { success: true, id: entryId };
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, path, auth.currentUser);
    throw error;
  }
}

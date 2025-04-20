// config/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // Import getAuth from firebase/auth
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCkX8riHbZ5Gg2lduPtPB0BJ3_nVdq7zM4",
  authDomain: "newproject-22c6c.firebaseapp.com",
  projectId: "newproject-22c6c",
  storageBucket: "newproject-22c6c.firebasestorage.app",
  messagingSenderId: "338185934135",
  appId: "1:338185934135:web:1a80cdd3813a03e5b5b6b2",
  measurementId: "G-CNQJCNZDYC"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);        // ✅ This is required
export const db = getFirestore(app);     // ✅ Firestore

export default app; // Export the initialized app if needed elsewhere

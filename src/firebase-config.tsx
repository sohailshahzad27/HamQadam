// firebase-config.js or .ts
import { initializeApp, getApps, FirebaseApp } from 'firebase/app'; // Import getApps and FirebaseApp
import { getFirestore } from 'firebase/firestore';
import { getAuth, browserSessionPersistence, browserLocalPersistence, indexedDBLocalPersistence } from 'firebase/auth'; // <-- Import getAuth and persistence types

// Your Firebase config details
const firebaseConfig = {
  apiKey: "AIzaSyCkX8riHbZ5Gg2lduPtPB0BJ3_nVdq7zM4", // Use your actual config
  authDomain: "newproject-22c6c.firebaseapp.com",
  projectId: "newproject-22c6c", // Project ID is crucial for Firestore
  storageBucket: "newproject-22c6c.firebasestorage.app",
  messagingSenderId: "338185934135",
  appId: "1:338185934135:web:1a80cdd3813a03e5b5b6b2",
  measurementId: "G-CNQJCNZDYC"
  // databaseURL is for Realtime Database, not needed for Firestore setup
};

// Initialize Firebase
// Added check to avoid re-initializing in frameworks like Next.js
let app: FirebaseApp;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

// Initialize Firestore and export it
export const db = getFirestore(app);

// Initialize Auth and set persistence
export const auth = getAuth(app);


auth.setPersistence(browserSessionPersistence) // Corrected persistence name and applied
  .then(() => {
    console.log("Auth persistence set successfully.");
  })
  .catch((error) => {
    console.error("Error setting auth persistence:", error);
  });



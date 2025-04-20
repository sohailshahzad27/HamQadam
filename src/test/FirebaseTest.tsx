// src/test/FirebaseTest.tsx
import { auth } from "../config/firebase";
import { useEffect } from "react";

export default function FirebaseTest() {
  useEffect(() => {
    console.log("Firebase auth object:", auth);
  }, []);

  return <div>Check browser console for Firebase auth object</div>;
}
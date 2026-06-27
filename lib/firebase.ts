import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBYTcCNPu_SMUsg_ykHSw0QFQe69yp17mw",
  authDomain: "rivpra-ed6f3.firebaseapp.com",
  projectId: "rivpra-ed6f3",
  storageBucket: "rivpra-ed6f3.firebasestorage.app",
  messagingSenderId: "841008078039",
  appId: "1:841008078039:web:537a339618f49d8a22e492",
  measurementId: "G-V7PNSK5Q04"
};

// Initialize Firebase (singleton pattern safe for Next.js SSR)
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

// Initialize Analytics conditionally (only in client-side & if supported)
let analytics: any = null;
if (typeof window !== "undefined") {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  });
}

export { app, db, storage, analytics };

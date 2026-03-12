import { initializeApp, getApps } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCi9laiEVHQbxHNNtiJ27fYJnIHzdbGL_g",
  authDomain: "barber-certified.firebaseapp.com",
  projectId: "barber-certified",
  storageBucket: "barber-certified.firebasestorage.app",
  messagingSenderId: "838722460743",
  appId: "1:838722460743:web:12012510eb42ca2377a562",
  measurementId: "G-HT9DEVP1XY",
};

const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

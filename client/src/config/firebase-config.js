import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBmbvjkxin2igXOeBYV9pvoFSmaYnBM6dk",
  authDomain: "vocab-f186f.firebaseapp.com",
  projectId: "vocab-f186f",
  storageBucket: "vocab-f186f.appspot.com",
  messagingSenderId: "615959081949",
  appId: "1:615959081949:web:0490fc7e565a6918fe7c34",
  measurementId: "G-BEDLRYZJ4P",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleAuthProvider = new GoogleAuthProvider();
export default app;

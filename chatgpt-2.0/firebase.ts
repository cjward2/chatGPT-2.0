import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCw5_rVzbg02kBiOXxz5Lg5M3ndJ6Hia_w",
  authDomain: "chatgpt-messenger-d6020.firebaseapp.com",
  projectId: "chatgpt-messenger-d6020",
  storageBucket: "chatgpt-messenger-d6020.appspot.com",
  messagingSenderId: "592163547934",
  appId: "1:592163547934:web:279470627dc5c58963f70f",
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

//get database
const db = getFirestore(app);

export { db };

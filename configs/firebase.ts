// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import {getFirestore}from 'firebase/firestore'
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "ai-logo-generator-e8fc0.firebaseapp.com",
  projectId: "ai-logo-generator-e8fc0",
  storageBucket: "ai-logo-generator-e8fc0.firebasestorage.app",
  messagingSenderId: "843776900518",
  appId: "1:843776900518:web:9174378cb74fec949da367",
  measurementId: "G-1W4W7P51TX"
};

// Initialize Firebase
 const app = initializeApp(firebaseConfig);
export  const db=getFirestore(app)
export const storage = getStorage(app);

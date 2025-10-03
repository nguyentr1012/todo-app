// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBQZIZZnqZopx59_fh2L4SLq6c3k2jjEVo",
  authDomain: "t0d0-ape.firebaseapp.com",
  projectId: "t0d0-ape",
  storageBucket: "t0d0-ape.firebasestorage.app",
  messagingSenderId: "363891256363",
  appId: "1:363891256363:web:ec8866b84612ec1d194e6e",
  measurementId: "G-BBFMY8YG8Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
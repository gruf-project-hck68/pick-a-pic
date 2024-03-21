// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCH2q4POd0E8KWLn9yvh7elSPAbDpkgdUY",
  authDomain: "pick-a-pict.firebaseapp.com",
  databaseURL: "https://pick-a-pict-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "pick-a-pict",
  storageBucket: "pick-a-pict.appspot.com",
  messagingSenderId: "949635305764",
  appId: "1:949635305764:web:45c77b6d72557233bbe3b1"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// Initialize Firebase Auth provider
const provider = new GoogleAuthProvider();
export const db = getFirestore(app)
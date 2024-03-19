import { initializeApp } from "firebase/app"; 
import { getFirestore } from "@firebase/firestore"

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
export const db = getFirestore(app)
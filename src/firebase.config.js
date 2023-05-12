
import { initializeApp } from "firebase/app";
import { getFirestore, collection } from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBrddjqYq_-klgTIElR4i32aXp_ta6Hjxg",
  authDomain: "react-notes-10a9c.firebaseapp.com",
  projectId: "react-notes-10a9c",
  storageBucket: "react-notes-10a9c.appspot.com",
  messagingSenderId: "710752889501",
  appId: "1:710752889501:web:7e6e8152ea79c34f4b0274"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)

export const notesCollection = collection(db, 'notes')
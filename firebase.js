// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAfpRur00VfymMZXQN53d72Jd6Dxa10uIQ",
  authDomain: "quiz-flashcards.firebaseapp.com",
  projectId: "quiz-flashcards",
  storageBucket: "quiz-flashcards.appspot.com",
  messagingSenderId: "565600703776",
  appId: "1:565600703776:web:fbcd2d8bb0d26313c0b345",
  measurementId: "G-Q1P5HB0NEY",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };

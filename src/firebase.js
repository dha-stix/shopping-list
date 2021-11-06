// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCxXYLPog_7ymmhQsg_XWzNzzJXsOjrHWk",
  authDomain: "shopping-list-88811.firebaseapp.com",
  projectId: "shopping-list-88811",
  storageBucket: "shopping-list-88811.appspot.com",
  messagingSenderId: "409106949662",
  appId: "1:409106949662:web:910ed5827bd281177e700f",
  measurementId: "G-2BC859XLRY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
export default db
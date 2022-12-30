// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDKulppQH9YI9xRsK-83SgEk-1YVBoV7lA",
  authDomain: "memes-f4087.firebaseapp.com",
  projectId: "memes-f4087",
  storageBucket: "memes-f4087.appspot.com",
  messagingSenderId: "73767287770",
  appId: "1:73767287770:web:d60baafd16f27e7fd89ee3",
  measurementId: "G-SZDBZZDHRB"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);

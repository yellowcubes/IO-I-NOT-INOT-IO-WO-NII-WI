// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCqxOlXRd2EXTCily6wPUi5mojP3wezSc8",
  authDomain: "joellemajdalani-adfe0.firebaseapp.com",
  projectId: "joellemajdalani-adfe0",
  storageBucket: "joellemajdalani-adfe0.appspot.com",
  messagingSenderId: "565322404396",
  appId: "1:565322404396:web:8a441304f00222a243b789",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);

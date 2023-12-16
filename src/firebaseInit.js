// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDDdjquzSXjnlC1fioE48Bt_QFRHbLXbMA",
  authDomain: "buybusy-10197.firebaseapp.com",
  projectId: "buybusy-10197",
  storageBucket: "buybusy-10197.appspot.com",
  messagingSenderId: "876839982107",
  appId: "1:876839982107:web:1dc324f0d7598bff91d4be",
  measurementId: "G-W4LJV6PJZM"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

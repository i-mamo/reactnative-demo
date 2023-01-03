// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC09nr8dZdzmUit4jzxD33De89DtmjtFfg",
  authDomain: "reactnative-demo-7f87e.firebaseapp.com",
  projectId: "reactnative-demo-7f87e",
  storageBucket: "reactnative-demo-7f87e.appspot.com",
  messagingSenderId: "336292636402",
  appId: "1:336292636402:web:5b54c27a416338df8c126b"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
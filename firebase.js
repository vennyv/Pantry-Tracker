// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDJSH6EmQhiQout-PTvRYsvHTucNkHYWbY",
  authDomain: "pantry-tracker-6b379.firebaseapp.com",
  projectId: "pantry-tracker-6b379",
  storageBucket: "pantry-tracker-6b379.appspot.com",
  messagingSenderId: "467590943833",
  appId: "1:467590943833:web:04e90d4b9741053ae20d48"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
export {app,firestore}
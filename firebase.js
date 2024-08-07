import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
const firebaseConfig = {
 apiKey: "YOUR_API_KEY",
 authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
 projectId: "YOUR_PROJECT_ID",
 storageBucket: "YOUR_PROJECT_ID.appspot.com",
 messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
 appId: "YOUR_APP_ID"
 };
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
export { firestore };

// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyDAWFQv3rLiwccCDF7ryOJm1gZGbolQAYo",
//   authDomain: "pantry-tracker-30848.firebaseapp.com",
//   projectId: "pantry-tracker-30848",
//   storageBucket: "pantry-tracker-30848.appspot.com",
//   messagingSenderId: "273017396517",
//   appId: "1:273017396517:web:5ade5197cb3e5aa207cecc",
//   measurementId: "G-GWMVJDXV75"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
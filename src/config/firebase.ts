// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth, GoogleAuthProvider} from 'firebase/auth'

import { getFirestore } from 'firebase/firestore'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA6Meul63bH3VYDoFZknUoieotIePuacFU",
  authDomain: "south-tampa-social.firebaseapp.com",
  projectId: "south-tampa-social",
  storageBucket: "south-tampa-social.appspot.com",
  messagingSenderId: "552835436517",
  appId: "1:552835436517:web:2b241afdb161b573ab290c",
  measurementId: "G-DT130H5XWE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

const analytics = getAnalytics(app);

export const DataBase = getFirestore(app);
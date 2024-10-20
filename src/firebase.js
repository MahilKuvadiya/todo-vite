// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {

  apiKey: "AIzaSyAMpcZx_46AVP4QmANr97J3wsRLiqpVodA",

  authDomain: "todo-831d8.firebaseapp.com",

  projectId: "todo-831d8",

  storageBucket: "todo-831d8.appspot.com",

  messagingSenderId: "34311872410",

  appId: "1:34311872410:web:a47fbbb2dc59b06910a423",

  measurementId: "G-2W9GMHWVBH"

};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);
export { auth, provider, signInWithPopup, db };

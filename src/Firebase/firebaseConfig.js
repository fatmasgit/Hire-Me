// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";



const firebaseConfig = {
  apiKey: "AIzaSyCM9s6-fp4UFPvAXFLv8u397Jji0bxbTCI",
  authDomain: "hire-me-dac96.firebaseapp.com",
  projectId: "hire-me-dac96",
  storageBucket: "hire-me-dac96.firebasestorage.app",
  messagingSenderId: "402215218627",
  appId: "1:402215218627:web:ac05e80b3c46cf433d6176",
  measurementId: "G-0T9VBDMYWD",
};


const app = initializeApp(firebaseConfig);

// exported firebase services
export const db = getFirestore(app);
export const auth = getAuth(app);




// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyAIg3oEpdeXbM2TeDArxg41lbrUdpaDetA",
    authDomain: "rn-app-f53c0.firebaseapp.com",
    projectId: "rn-app-f53c0",
    storageBucket: "rn-app-f53c0.appspot.com",
    messagingSenderId: "787259684457",
    appId: "1:787259684457:web:5f797159f3034e32a154f8",
    measurementId: "G-18PQ547611"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
export { app, auth , db , storage };

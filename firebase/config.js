// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import {
    FIREBASE_MESSAGING_SENDER_ID,
    FIREBASE_MEASUREMENT_ID,
    FIREBASE_STORAGE_BUCKET,
    FIREBASE_AUTH_DOMAIN,
    FIREBASE_PROJECT_ID,
    FIREBASE_API_KEY,
    FIREBASE_APP_ID
} from "@env";

const firebaseConfig = {
    apiKey: FIREBASE_API_KEY,
    authDomain: FIREBASE_AUTH_DOMAIN,
    projectId: FIREBASE_PROJECT_ID,
    storageBucket: FIREBASE_STORAGE_BUCKET,
    messagingSenderId: FIREBASE_MEASUREMENT_ID,
    appId: FIREBASE_APP_ID,
    measurementId: FIREBASE_MESSAGING_SENDER_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig, {
    experimentalForceLongPolling: true,
    useFetchStreams: false
});
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
export { app, auth , db , storage };


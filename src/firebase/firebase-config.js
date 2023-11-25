// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDYsoY6_604OD1-qcRbiueTN7Sfz0981qg",
    authDomain: "monkey-blogging-f735b.firebaseapp.com",
    projectId: "monkey-blogging-f735b",
    storageBucket: "monkey-blogging-f735b.appspot.com",
    messagingSenderId: "434468695229",
    appId: "1:434468695229:web:3b6d5dea410a4a54415bd4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage();

// Import the functions you need from the SDKs you need
import { initializeApp, } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "@firebase/firestore"
import { FirebaseApp } from "firebase/app";

import { getStorage } from "@firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCUnwFzkqNrk8Ai9Z8lCRcv4sAw-uhg7Mk",
    authDomain: "ecomerce-site-d6b4a.firebaseapp.com",
    projectId: "ecomerce-site-d6b4a",
    storageBucket: "ecomerce-site-d6b4a.appspot.com",
    messagingSenderId: "540630851940",
    appId: "1:540630851940:web:e1e6464f5d0ee223531a71",
    measurementId: "G-CKJE99D9PB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);

// firebase.initializeApp(firebaseConfig);
// const dbs = firebase.firestore();
// FirebaseApp.app


export const db = getFirestore(app)
export const storage = getStorage(app)
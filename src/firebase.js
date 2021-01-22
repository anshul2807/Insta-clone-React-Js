import firebase from "firebase";
const firebaseConfig = {
    apiKey: "AIzaSyCWZtVhdtjI-oQnayEnSTi9nfejnz03kXA",
    authDomain: "instagram-clone-4a894.firebaseapp.com",
    projectId: "instagram-clone-4a894",
    storageBucket: "instagram-clone-4a894.appspot.com",
    messagingSenderId: "681362260992",
    appId: "1:681362260992:web:06d293779e23d349d8c4e5",
    measurementId: "G-7CBE3DSB3C"
  };

const firebaseApp =  firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export {db,auth,storage}
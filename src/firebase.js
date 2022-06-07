import firebase from "firebase";
const firebaseConfig = {
  apiKey: "AIzaSyAfUHGM9nUGLzadhHcQUcB6mrPqFasntE8",
  authDomain: "instagram-a8740.firebaseapp.com",
  databaseURL: "https://instagram-a8740-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "instagram-a8740",
  storageBucket: "instagram-a8740.appspot.com",
  messagingSenderId: "555933805379",
  appId: "1:555933805379:web:5fde612c59332e89d61df6",
  measurementId: "G-NVSF9MBQ3T"
  };

const firebaseApp =  firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export {db,auth,storage}
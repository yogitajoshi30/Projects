// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBvExCffTBKs0xEsvf2NYwIPMnaDHSj4mQ",
  authDomain: "quora-clone-5e94d.firebaseapp.com",
  projectId: "quora-clone-5e94d",
  storageBucket: "quora-clone-5e94d.appspot.com",
  messagingSenderId: "980461670419",
  appId: "1:980461670419:web:8ada4836e6067c5414afe6",
  measurementId: "G-E55TTV8TGL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();

export { auth, provider };
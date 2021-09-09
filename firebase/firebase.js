// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {
  getStorage,
  ref,
  listAll,
  getDownloadURL,
  getMetadata,
  uploadBytesResumable,
} from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDi-Rm5JKIBDgOit1sxLLRB1KexpkeoR3Y",
  authDomain: "my-unsplash-afddb.firebaseapp.com",
  projectId: "my-unsplash-afddb",
  storageBucket: "my-unsplash-afddb.appspot.com",
  messagingSenderId: "438138722417",
  appId: "1:438138722417:web:829d6590f1df32abb863d0",
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);

//MainFirebase END

//Storage

const storage = getStorage();
// Points to the root reference
const storageRef = ref(storage);

export {
  firebase,
  getStorage,
  storageRef,
  listAll,
  getDownloadURL,
  getMetadata,
  uploadBytesResumable,
  ref,
};

import firebase from "firebase";
const firebaseConfig = {
  apiKey: "AIzaSyBxdu6ATKtVwSk4SizFMfPXmLSi-MueDrc",
  authDomain: "rn-instagram-clone-bf9c1.firebaseapp.com",
  projectId: "rn-instagram-clone-bf9c1",
  storageBucket: "rn-instagram-clone-bf9c1.appspot.com",
  messagingSenderId: "52739723450",
  appId: "1:52739723450:web:fceeea3432e616ea053283",
};
firebase.apps.length === 0
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();
const db = firebase.firestore();
export { db, firebase };

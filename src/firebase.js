import firebase from 'firebase/app'
import 'firebase/auth'

import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCs7ZCnzNcJK-9jejsii_mGjGemgUMd8O8",
  authDomain: "full-games-7146f.firebaseapp.com",
  projectId: "full-games-7146f",
  storageBucket: "full-games-7146f.appspot.com",
  messagingSenderId: "193530380623",
  appId: "1:193530380623:web:f2bc7de33f6f012afdc53a"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;

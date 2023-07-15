import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBiv02K9kTF4wEnVlOxMVB3UOWeC8fYh8c",
  authDomain: "games-77a98.firebaseapp.com",
  projectId: "games-77a98",
  storageBucket: "games-77a98.appspot.com",
  messagingSenderId: "230365643730",
  appId: "1:230365643730:web:f3bccb8238381e44a1fe0b"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export { app };
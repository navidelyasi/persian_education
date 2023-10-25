import { createContext } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { CONFIG } from "../data/constants/myConstants";

const firebase = initializeApp(CONFIG);
const firestore = getFirestore(firebase);
const auth = getAuth(firebase);

const FirebaseContext = createContext(null);

export { firebase, firestore, auth, FirebaseContext };

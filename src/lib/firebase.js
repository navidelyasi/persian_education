import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { CONFIG } from "../constants/myConstants";

const firebase = initializeApp(CONFIG);
const firestore = getFirestore(firebase);
const auth = getAuth(firebase);

export { firebase, firestore, auth };

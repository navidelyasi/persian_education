import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { FirebaseContext, firebase, firestore } from "./database/firebase";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap.min.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <FirebaseContext.Provider value={{ firebase, firestore }}>
    <App />
  </FirebaseContext.Provider>
);

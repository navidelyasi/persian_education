import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  collection,
  where,
  query,
  doc,
  setDoc,
  getDocs,
} from "firebase/firestore";
import { auth, firestore } from "../database/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

export default function Signup() {
  const navigate = useNavigate();

  const [userName, setUserName] = useState("");
  const [fullName, setFullName] = useState("");

  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const isInvalid =
    userName === "" ||
    fullName === "" ||
    emailAddress === "" ||
    password === "";

  //###############################################
  //############   main work is here    ###########
  //###############################################

  const handleSignUp = async (event) => {
    event.preventDefault();

    const q = query(
      collection(firestore, "users"),
      where("username", "==", userName.toLowerCase())
    );
    const result = await getDocs(q);
    const usernameExists = result.size;

    if (usernameExists === 0) {
      try {
        const createdUserResult = await createUserWithEmailAndPassword(
          auth,
          emailAddress,
          password
        );
        await updateProfile(createdUserResult.user, { displayName: userName });

        const myCol = collection(firestore, "users");
        await setDoc(doc(myCol), {
          userId: createdUserResult.user.uid,
          username: userName.toLowerCase(),
          fullName,
          emailAddress: emailAddress.toLowerCase(),
          dateCreated: Date.now(),
        });
        navigate("/");
      } catch (e) {
        setUserName("");
        setFullName("");
        setEmailAddress("");
        setPassword("");
        setError(e.message);
      }
    } else {
      setError("Username is already taken!");
    }
  };

  return (
    <div className="container text-center">
      <h1>Signup page</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="row">
        <div className="col"></div>
        <div className="col-8 card">
          <div className="card-body">
            {/* ########################################  */}
            {/* ###########  signup form    ###########   */}
            {/* ########################################  */}

            <form onSubmit={handleSignUp} method="POST">
              <div className="mb-3">
                <label className="form-label">username</label>
                <input
                  type="text"
                  placeholder="Username"
                  className="form-control"
                  onChange={({ target }) => setUserName(target.value)}
                  value={userName}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">full name</label>
                <input
                  aria-label="Enter your full name"
                  type="text"
                  placeholder="Full Name"
                  className="form-control"
                  onChange={({ target }) => setFullName(target.value)}
                  value={fullName}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">email address</label>
                <input
                  aria-label="Enter your email address"
                  type="text"
                  placeholder="Email address"
                  className="form-control"
                  onChange={({ target }) => setEmailAddress(target.value)}
                  value={emailAddress}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">password</label>
                <input
                  aria-label="Enter your password"
                  type="password"
                  placeholder="Password"
                  className="form-control"
                  onChange={({ target }) => setPassword(target.value)}
                  value={password}
                />
              </div>
              <button
                disabled={isInvalid}
                type="submit"
                className={`btn btn-primary
                        ${isInvalid && "opacity-25"}`}
              >
                SignUp
              </button>
            </form>

            {/* ########################################  */}
            {/* ########### finish signup   ###########   */}
            {/* ########################################  */}

            <hr className="hr" />
            <div className="card alert alert-info">
              <div className="card-body">
                <div>Already have an account?</div>
                <button
                  className="btn btn-secondary"
                  onClick={() => navigate("/login")}
                >
                  go to Login
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="col"></div>
      </div>
    </div>
  );
}

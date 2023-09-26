import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../lib/firebase";

export default function Login() {
  const navigate = useNavigate();
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const isInvalid = password === "" || emailAddress === "";
  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, emailAddress, password);
      navigate("/");
    } catch (error) {
      setEmailAddress("");
      setPassword("");
      setError(error.message);
    }
  };

  return (
    <div className="container text-center">
      <h1>login page</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="row">
        <div className="col"></div>
        <div className="col-8 card">
          <div className="card-body">
            {/* ########################################  */}
            {/* ###########   login form    ###########   */}
            {/* ########################################  */}

            <form onSubmit={handleLogin} method="POST">
              <div className="mb-3">
                <label className="form-label">Email address</label>
                <input
                  id="inputEmail"
                  type="text"
                  className="form-control"
                  placeholder="Email address"
                  onChange={({ target }) => setEmailAddress(target.value)}
                  value={emailAddress}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                  aria-label="Enter your password"
                  type="password"
                  className="form-control"
                  placeholder="Password"
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
                Login
              </button>
            </form>

            {/* ########################################  */}
            {/* ###########   Finish login  ###########   */}
            {/* ########################################  */}

            <hr className="hr" />
            <div className="card alert alert-info">
              <div className="card-body">
                <div>Don't have an account?</div>
                <button
                  className="btn btn-secondary"
                  onClick={() => navigate("/signup")}
                >
                  Go to Signup
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

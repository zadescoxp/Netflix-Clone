"use client";

import "./Login.css";
import logo from "./../../assets/logo.png";
import netflix_spinner from "./../../assets/netflix_spinner.gif";
import Image from "next/image";
import { useState } from "react";
import { login, signup } from "./../../../firebase";

export default function Login() {
  const [signState, setSignState] = useState("Sign In");
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const user_auth = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (signState === "Sign In") {
      await login(email, password);
    } else {
      await signup(name, email, password);
    }
    setLoading(false);
  };

  return (
    loading? <div className="loading-spinner">
      <Image src={netflix_spinner} width={100} height={100} alt="Spinner" />
    </div> :
    <div className="login">
      <Image
        src={logo}
        width={92.49}
        height={29.89}
        alt="Netlflix Logo"
        className="login-logo"
      />
      <div className="login-form">
        {signState === "Sign In" ? <h1>{signState}</h1> : <h1>Sign Up</h1>}
        <form>
          {signState === "Sign In" ? (
            <></>
          ) : (
            <input
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          )}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <button onClick={user_auth}>
            {signState === "Sign In" ? <>{signState}</> : <>Sign Up</>}
          </button>
          <div className="form-help">
            <div className="remember">
              <input type="checkbox" />
              <label>Remember Me</label>
            </div>
            <p>Need Help ?</p>
          </div>
        </form>
        <div className="form-switch">
          {signState === "Sign In" ? (
            <p>
              New to Netflix ?{" "}
              <span
                onClick={() => {
                  setSignState("Sign Up");
                }}
              >
                Sign Up Now
              </span>
            </p>
          ) : (
            <p>
              Already have an account?{" "}
              <span
                onClick={() => {
                  setSignState("Sign In");
                }}
              >
                Sign In Now
              </span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

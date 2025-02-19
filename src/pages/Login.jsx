import React from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
//import {auth} from './config'
import { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const auth = getAuth();
const Login = () => {
  const [useremail, setUseremail] = useState();
  const [password, setPassword] = useState();
  const [mess, setMesseges] = useState("");
  const navigate = useNavigate();

  const signin = () => {
    console.log(useremail, password);
    if (useremail == null || password == null) {
      setMesseges("Empty values");
    } else {
      signInWithEmailAndPassword(auth, useremail, password)
        .then((res) => {
          // console.log(res.user);
          console.log(res.user);
          if (res.user) {
            navigate("/");
          }
        })
        .catch((err) => {
          console.log(err.message);
          //  errorCode === 'auth/wrong-password' )
          setMesseges(err.message);
          if (err.message) {
          }
        });
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16 p-6 border-2 shadow-lg rounded-lg text-center">
      <h2 className="text-3xl font-bold mb-4">LA DOCHE</h2>
      {message && <p className="text-red-500 text-lg font-semibold">{message}</p>}
      <h3 className="text-xl font-mono font-bold">Login</h3>
      <div className="mt-4">
        <input
          type="email"
          placeholder="Enter Your Email"
          className="w-full p-3 border rounded-lg text-lg text-center"
          onChange={(e) => setUseremail(e.target.value)}
        />
      </div>
      <div className="mt-4">
        <input
          type="password"
          placeholder="Enter your Password"
          className="w-full p-3 border rounded-lg text-lg text-center"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button
        className="mt-6 w-full bg-orange-500 text-white font-bold py-3 text-lg rounded-lg hover:bg-orange-600"
        onClick={handleSignIn}
      >
        Login
      </button>
      <div className="mt-6 flex justify-center space-x-6 text-blue-500 font-semibold">
        <Link to="/">Home</Link>
        <Link to="/signup">Sign Up</Link>
      </div>
    </div>
  );
};

export default Login;

import React from "react";
import { Link, Navigate } from "react-router-dom";
//import {auth} from './config'
import { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const auth = getAuth();
const Login = () => {
  const [useremail, setUseremail] = useState();
  const [password, setPassword] = useState();
  const [mess, setMesseges] = useState("");

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
            alert("there is a user who is logged in");
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
    <div className="my-10 py-5 ">
      <h2 className="text-2xl font-bold py-5 my-3">LA DOCHE</h2>
      <h3 className="p-3 m-4 text-center text-red-500 text-xl font-bold">
        {mess}
      </h3>
      <h2 className="uppercase font-mono font-bold text-center">Login </h2>

      <div className="my-5">
        <input
          type="email"
          placeholder="Enter Your Email"
          className="text-xl   text-center font-light py-5"
          onChange={(e) => {
            setUseremail(e.target.value);
          }}
        />
      </div>

      <div className="my-5">
        <input
          type="password"
          className="text-xl text-center font-light py-5"
          placeholder="Enter your Password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </div>
      <div className="my-6">
        <button
          className="py-3 px-28 text-white text-2xl bg-orange-500"
          onClick={signin}>
          Login
        </button>
      </div>

      <Link to="/">Home</Link>
      <Link to="/signup">signup</Link>
    </div>
  );
};

export default Login;

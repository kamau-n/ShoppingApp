import React from "react";
import { Link } from "react-router-dom";
//import {auth} from './config'
import { useState, useEffect } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const auth = getAuth();

const Login = () => {
  const [errors, setError] = useState("");
  const [useremail, setUseremail] = useState();
  const [password, setPassword] = useState();
  const [address, setAddress] = useState();
  const [firstname, setFirstname] = useState();
  const [lastname, setLastname] = useState();
  const [number, setNumber] = useState();

  const signup = () => {
    console.log(useremail, password, address, firstname, lastname);

    createUserWithEmailAndPassword(
      auth,
      useremail,
      password,
      firstname,
      lastname,
      address,
      number
    )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        setError(err.message);
        console.log(err.message);
      });
  };

  return (
    <div className="my-10">
      <h2>LA DOCHE</h2>

      <span className="errors">{errors}</span>
      <div className="login-btn">
        <input
          type="email"
          placeholder="Email"
          className="text-xl text-center font-light py-3"
          onChange={(e) => {
            setUseremail(e.target.value);
          }}
        />
      </div>

      <div className="login-btn">
        <input
          type="Text"
          placeholder="FirstName"
          className="text-xl text-center font-light py-3"
          onChange={(e) => {
            setFirstname(e.target.value);
          }}
        />
      </div>

      <div className="login-btn">
        <input
          type="text"
          placeholder="LastName"
          className="text-xl text-center font-light py-3"
          onChange={(e) => {
            setLastname(e.target.value);
          }}
        />
      </div>

      <div className="login-btn">
        <input
          type="text"
          placeholder="PhoneNumber"
          className="text-xl text-center font-light py-3"
          onChange={(e) => {
            setNumber(e.target.value);
          }}
        />
      </div>

      <div className="login-btn">
        <input
          type="text"
          placeholder="Address"
          className="text-xl text-center font-light py-3"
          onChange={(e) => {
            setAddress(e.target.value);
          }}
        />
      </div>

      <div className="login-btn">
        <input
          type="password"
          placeholder="Password"
          className="text-xl text-center font-light py-3"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </div>

      <div>
        <button
          className="py-3 px-20  text-2xl text-white font-bold bg-orange-400 "
          onClick={signup}>
          SignUp
        </button>
      </div>

      <Link to="/">Home</Link>
      <Link to="/login">Login</Link>
    </div>
  );
};

export default Login;

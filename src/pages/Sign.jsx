import React from "react";
import { Link } from "react-router-dom";
//import {auth} from './config'
import { useState, useEffect } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

import { db, storage } from "../config/config";
import {
  collection,
  getDocs,
  addDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
const auth = getAuth();

const Login = () => {
  const [errors, setError] = useState("");
  const [useremail, setUseremail] = useState();
  const [password, setPassword] = useState();
  const [address, setAddress] = useState();
  const [firstname, setFirstname] = useState();
  const [lastname, setLastname] = useState();

  const [city, setCity] = useState();
  const [county, setCounty] = useState();
  const [number, setNumber] = useState();

  const registerUser = (id) => {
    console.log("am registering a user");
    addDoc(collection(db, "Users"), {
      user_id: id,
      user_address: address,
      user_email: useremail,
      phoneNumber: number,
      user_first_name: firstname,
      user_last_name: lastname,
      user_city: city,
      user_county: county,
      user_role: "customer",
    })
      .then((res) => {
        console.log(res);
        setError("user created successfully");
      })
      .catch((err) => {
        setError(err.message);
      });
  };
  const signup = () => {
    if (
      useremail == null ||
      password == null ||
      address == null ||
      firstname == null ||
      lastname == null
    ) {
      setError("Some values are empty");
    } else {
      createUserWithEmailAndPassword(auth, useremail, password)
        .then((res) => {
          console.log(res.user.uid);
          registerUser(res.user.uid);
        })
        .catch((err) => {
          setError(err.message);
          console.log(err.message);
        });
    }
  };

  return (
    <div className="my-10 sm:w-1/4 p-4 w-5/6 mx-7 sm:mx-auto border-2">
      <h2>LA DOCHE</h2>

      <span className="errors">{errors}</span>
      <div className="my-2 py-2">
        <input
          type="email"
          placeholder="Email"
          className="sm:text-xl text-l text-center font-light py-2  border-2"
          onChange={(e) => {
            setUseremail(e.target.value);
          }}
        />
      </div>

      <div className="my-2 py-2">
        <input
          type="Text"
          placeholder="FirstName"
          className="sm:text-xl  text-l text-center font-light py-2  border-2"
          onChange={(e) => {
            setFirstname(e.target.value);
          }}
        />
      </div>

      <div className="my-2 py-2">
        <input
          type="text"
          placeholder="LastName"
          className="sm:text-xl text-l text-center font-light py-2  border-2"
          onChange={(e) => {
            setLastname(e.target.value);
          }}
        />
      </div>

      <div className="my-2 py-2">
        <input
          type="text"
          placeholder="PhoneNumber"
          className="sm:text-xl text-l text-center font-light py-2  border-2"
          onChange={(e) => {
            setNumber(e.target.value);
          }}
        />
      </div>

      <div className="my-2 py-2">
        <input
          type="text"
          placeholder="Address"
          className="sm:text-xl text-l text-center font-light py-2  border-2"
          onChange={(e) => {
            setAddress(e.target.value);
          }}
        />
      </div>
      <div className="my-2 py-2">
        <input
          type="text"
          placeholder="City"
          className="sm:text-xl text-l text-center font-light py-2  border-2"
          onChange={(e) => {
            setCity(e.target.value);
          }}
        />
      </div>
      <div className="my-2 py-2">
        <input
          type="text"
          placeholder="County"
          className="sm:text-xl text-l text-center font-light py-3 border-2"
          onChange={(e) => {
            setCounty(e.target.value);
          }}
        />
      </div>

      <div className="my-2 py-2">
        <input
          type="password"
          placeholder="Password"
          className="sm:text-xl text-l text-center font-light py-3 border-2"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </div>

      <div>
        <button
          className="py-3 sm:px-32 px-24  text-l sm:text-xl text-white font-bold bg-orange-400 "
          onClick={signup}>
          SignUp
        </button>
      </div>

      <div className="flex justify-center gap-6 my-5 py-4 px-3">
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
      </div>
    </div>
  );
};

export default Login;

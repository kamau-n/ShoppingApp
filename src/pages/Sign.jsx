import React from "react";
import { Link } from "react-router-dom";
//import {auth} from './config'
import { useState, useEffect } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

import { UserCircle2, AlertCircle } from "lucide-react";

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full mx-auto bg-white rounded-xl shadow-lg p-8">
        <div className="text-center mb-8">
          <UserCircle2 className="mx-auto h-12 w-12 text-indigo-600" />
          <h2 className="mt-4 text-3xl font-extrabold text-gray-900">LA DOCHE</h2>
          <p className="mt-2 text-sm text-gray-600">Create your account</p>
        </div>

        {errors && (
          <div className="mb-4 p-4 rounded-md bg-red-50 flex items-center">
            <AlertCircle className="h-5 w-5 text-red-400 mr-2" />
            <span className="text-sm text-red-700">{errors}</span>
          </div>
        )}

        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <input
                type="text"
                placeholder="First Name"
                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                onChange={(e) => setFirstname(e.target.value)}
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Last Name"
                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                onChange={(e) => setLastname(e.target.value)}
              />
            </div>
          </div>

          <input
            type="email"
            placeholder="Email Address"
            className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            onChange={(e) => setUseremail(e.target.value)}
          />

          <input
            type="tel"
            placeholder="Phone Number"
            className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            onChange={(e) => setNumber(e.target.value)}
          />

          <input
            type="text"
            placeholder="Address"
            className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            onChange={(e) => setAddress(e.target.value)}
          />

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <input
                type="text"
                placeholder="City"
                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="County"
                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                onChange={(e) => setCounty(e.target.value)}
              />
            </div>
          </div>

          <input
            type="password"
            placeholder="Password"
            className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            onClick={signup}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
          >
            Create Account
          </button>
        </div>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Already have an account?</span>
            </div>
          </div>

          <div className="mt-6 flex justify-center space-x-4 text-sm">
            <Link
              to="/login"
              className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors duration-200"
            >
              Sign in
            </Link>
            <span className="text-gray-500">•</span>
            <Link
              to="/"
              className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors duration-200"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
  //   <div className="my-10 sm:w-1/4 p-4 w-5/6 mx-7 sm:mx-auto border-2">
  //     <h2>LA DOCHE</h2>

  //     <span className="errors">{errors}</span>
  //     <div className="my-2 py-2">
  //       <input
  //         type="email"
  //         placeholder="Email"
  //         className="sm:text-xl text-l text-center font-light py-2  border-2"
  //         onChange={(e) => {
  //           setUseremail(e.target.value);
  //         }}
  //       />
  //     </div>

  //     <div className="my-2 py-2">
  //       <input
  //         type="Text"
  //         placeholder="FirstName"
  //         className="sm:text-xl  text-l text-center font-light py-2  border-2"
  //         onChange={(e) => {
  //           setFirstname(e.target.value);
  //         }}
  //       />
  //     </div>

  //     <div className="my-2 py-2">
  //       <input
  //         type="text"
  //         placeholder="LastName"
  //         className="sm:text-xl text-l text-center font-light py-2  border-2"
  //         onChange={(e) => {
  //           setLastname(e.target.value);
  //         }}
  //       />
  //     </div>

  //     <div className="my-2 py-2">
  //       <input
  //         type="text"
  //         placeholder="PhoneNumber"
  //         className="sm:text-xl text-l text-center font-light py-2  border-2"
  //         onChange={(e) => {
  //           setNumber(e.target.value);
  //         }}
  //       />
  //     </div>

  //     <div className="my-2 py-2">
  //       <input
  //         type="text"
  //         placeholder="Address"
  //         className="sm:text-xl text-l text-center font-light py-2  border-2"
  //         onChange={(e) => {
  //           setAddress(e.target.value);
  //         }}
  //       />
  //     </div>
  //     <div className="my-2 py-2">
  //       <input
  //         type="text"
  //         placeholder="City"
  //         className="sm:text-xl text-l text-center font-light py-2  border-2"
  //         onChange={(e) => {
  //           setCity(e.target.value);
  //         }}
  //       />
  //     </div>
  //     <div className="my-2 py-2">
  //       <input
  //         type="text"
  //         placeholder="County"
  //         className="sm:text-xl text-l text-center font-light py-3 border-2"
  //         onChange={(e) => {
  //           setCounty(e.target.value);
  //         }}
  //       />
  //     </div>

  //     <div className="my-2 py-2">
  //       <input
  //         type="password"
  //         placeholder="Password"
  //         className="sm:text-xl text-l text-center font-light py-3 border-2"
  //         onChange={(e) => {
  //           setPassword(e.target.value);
  //         }}
  //       />
  //     </div>

  //     <div>
  //       <button
  //         className="py-3 sm:px-32 px-24  text-l sm:text-xl text-white font-bold bg-orange-400 "
  //         onClick={signup}>
  //         SignUp
  //       </button>
  //     </div>

  //     <div className="flex justify-center gap-6 my-5 py-4 px-3">
  //       <Link to="/">Home</Link>
  //       <Link to="/login">Login</Link>
  //     </div>
  //   </div>
  // );
};

export default Login;

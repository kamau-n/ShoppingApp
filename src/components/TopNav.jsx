import React from "react";
import { Link } from "react-router-dom";
import bars from "../assets/bars.png";
import icon from "../assets/icon.png";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { AppBar, IconButton, Toolbar } from "@mui/material";

const auth = getAuth();

export default function TopNav({ logged }) {
  const handleLogout = () => {
    console.log(typeof auth);
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        // navigate("/");
        console.log("Signed out successfully");
      })
      .catch((error) => {
        // An error happened.
      });
  };
  return (
    <div className="sm:flex justify-between  bg-slate-100 px-6  w-full shadow-md my-0  py-5  ">
      <div className="flex justify-between ">
        <div className="font-bold text-xl  flex gap-2 italic uppercase font-mono">
          <img src={icon} alt="" width={30} className="bg-cover" />
          <h2 className="pt-2">LA DOCHE</h2>
        </div>
        <img
          src={bars}
          width={30}
          className="sm:hidden"
          alt=""
          onClick={() => {
            document.getElementById("topbar").classList.toggle("hidden");
          }}
        />
      </div>

      <div className="sm:flex  hidden  " id="topbar">
        <div className="sm:flex gap-3  sm:flex-row flex  align-middle sm:justify-start justify-start flex-col font-mono">
          <Link to="/">Home</Link>
          <Link to="/cart">Cart</Link>
          <Link to="/drinks">Drinks</Link>
          <Link to="/meals">Meals</Link>
          <Link to="/about">About</Link>
        </div>
      </div>
      <div id="topbar" className="sm:flex hidden">
        {logged && (
          <div className=" sm:flex gap-4 sm:flex-row  flex flex-col  sm:justify-between  ">
            <button className="py-2 px-5 bg-slate-700 w-1/3  mx-auto text-white rounded font-bold">
              <Link to="/account" className="text-white">
                Account
              </Link>
            </button>
            <button
              className="py-2 px-7 bg-slate-700 text-white mx-auto w-1/3 rounded font-bold"
              onClick={() => {
                handleLogout();
              }}>
              Logout
            </button>
          </div>
        )}

        {!logged && (
          <button className="py-2 px-7 bg-slate-700 text-white rounded  font-bold">
            <Link to="/login" className="text-white">
              Login
            </Link>
          </button>
        )}
      </div>
    </div>
  );
}

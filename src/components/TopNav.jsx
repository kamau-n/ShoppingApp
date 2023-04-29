import React from "react";
import { Link } from "react-router-dom";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { AppBar } from "@mui/material";

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
    <div className="sm:flex justify-between  my-4 py-3 ">
      <h2 className="font-bold text-xl uppercase">LA DOCHE</h2>

      <button
        class="bg-blue-500 sm:hidden hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => {
          document.getElementById("topbar").classList.toggle("hidden");
        }}

        // onClick="document.getElementById('topbar').classList.toggle('hidden')"
      >
        Toggle Visibility
      </button>
      <div id="topbar" class="hidden">
        <div className="sm:flex gap-3  sm:flex-row flex  sm:justify-center justify-start flex-col font-mono">
          <Link to="/">Home</Link>
          <Link to="/cart">Cart</Link>
          <Link to="/drinks">Drinks</Link>
          <Link to="/meals">Meals</Link>
          <Link to="/about">About</Link>
        </div>

        {logged && (
          <div className=" sm:flex gap-7   ">
            <button className="py-2 px-7 bg-slate-700 w-1/2   text-white rounded font-bold">
              <Link to="/account" className="text-white">
                Account
              </Link>
            </button>
            <button
              className="py-2 px-7 bg-slate-700 text-white w-1/2 rounded font-bold"
              onClick={() => {
                handleLogout();
              }}>
              Logout
            </button>
          </div>
        )}

        {!logged && (
          <button className="py-2 px-7 bg-slate-700 text-white rounded w-1/2 font-bold">
            <Link to="/login" className="text-white">
              Login
            </Link>
          </button>
        )}
      </div>
    </div>
  );
}

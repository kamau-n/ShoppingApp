import React from "react";
import { Link } from "react-router-dom";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

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
      <div className="flex gap-3 font-mono">
        <Link to="/">Home</Link>
        <Link to="/cart">Cart</Link>
        <Link to="/drinks">Drinks</Link>
        <Link to="/meals">Meals</Link>
        <Link to="/about">About</Link>
      </div>

      {logged && (
        <div className=" flex gap-7">
          <button className="py-2 px-7 bg-slate-700 text-white rounded font-bold">
            <Link to="/account" className="text-white">
              Account
            </Link>
          </button>
          <button
            className="py-2 px-7 bg-slate-700 text-white rounded font-bold"
            onClick={() => {
              handleLogout();
            }}>
            Logout
          </button>
        </div>
      )}

      {!logged && (
        <button className="py-2 px-7 bg-slate-700 text-white rounded font-bold">
          <Link to="/login" className="text-white">
            Login
          </Link>
        </button>
      )}
    </div>
  );
}

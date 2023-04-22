import React from "react";
import { Link } from "react-router-dom";

export default function TopNav({ logged }) {
  return (
    <div className="flex justify-between  my-4 py-3 ">
      <h2 className="font-bold text-xl uppercase">LA DOCHE</h2>
      <div className="flex gap-3 font-mono">
        <Link to="/">Home</Link>
        <Link to="/cart">Cart</Link>
        <Link to="/drinks">Drinks</Link>
        <Link to="/meals">Meals</Link>
        <Link to="/about">About</Link>
      </div>

      {logged && (
        <button className="py-2 px-7 bg-slate-700 text-white rounded font-bold">
          <Link to="/account" className="text-white">
            Account
          </Link>
        </button>
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

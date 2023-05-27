import React from "react";
import { Link } from "react-router-dom";
import bars from "../assets/bars.png";
import icon from "../assets/icon.png";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { AppBar, IconButton, Toolbar } from "@mui/material";
import { Face, FaceRounded } from "@material-ui/icons";
import { useState } from "react";

const auth = getAuth();

export default function TopNav({ logged }) {
  const [isOpen, setIsOpen] = useState(false);

  const options = ["Account", "Logout", "Option 3"];
  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    console.log("Selected option:", option);
    setIsOpen(false);
  };

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
    <div className="sm:flex justify-between  bg-slate-100 px-6  w-full shadow-md my-0  py-8  ">
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
            document.getElementById("topbar2").classList.toggle("hidden");
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
      <div id="topbar2" className="sm:flex hidden ">
        {logged && (
          <div className="flex justify-center">
            <div className="relative">
              <button
                type="button"
                className=" py-2 px-4 text-sm bg-gray-200 text-gray-800  shadow-md focus:outline-none focus:ring-2 flex focus:ring-blue-500"
                onClick={handleToggle}>
                <FaceRounded fontSize="large" />
                <span className="text-xl pt-1 font-bold">Account</span>
              </button>
              {isOpen && (
                <ul className="absolute top-full left-0 mt-2 py-1 px-4 bg-white text-gray-800 rounded-md shadow-md">
                  <li className="py-2 px-4 text-l font-semibold hover:bg-gray-200 cursor-pointer">
                    <Link to="/account">Profile</Link>
                  </li>
                  <li className="py-2 px-4 text-l font-semibold hover:bg-gray-200 cursor-pointer">
                    Logout
                  </li>
                </ul>
              )}
            </div>
          </div>

          // <div className=" sm:flex gap-2 sm:flex-row  flex flex-col  sm:justify-between  ">
          //   <button className="py-2 px-5 sm:bg-slate-700   mx-auto sm:text-white text-black rounded font-bold">
          //     <Link to="/account" className="sm:text-white text-l">
          //       Account
          //     </Link>
          //   </button>
          //   <button
          //     className="py-2 px-7 sm:bg-slate-700 sm:text-white mx-auto  rounded font-bold"
          //     onClick={() => {
          //       handleLogout();
          //     }}>
          //     Logout
          //   </button>
          // </div>
        )}

        {!logged && (
          <button
            id="topbar3"
            className="py-2 px-7 bg-slate-700 text-white rounded  font-bold">
            <Link to="/login" className="text-white">
              Login
            </Link>
          </button>
        )}
      </div>
    </div>
  );
}

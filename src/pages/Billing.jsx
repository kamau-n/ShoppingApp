import { Button } from "@material-ui/core";
import { Alert } from "@mui/material";
import React, { useState } from "react";
import { MpesaStk } from "react-mpesa-stk";

//load the styles
import "react-mpesa-stk/dist/index.css";
import { Link, useLocation } from "react-router-dom";
// import daraja from "../Utilities/daraja";
import axios from "axios";

export default function Billing() {
  const [inputs, setInputs] = useState({});
  const { state } = useLocation();
  const [message, setMessages] = useState("");
  const [show, setShow] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);

  const toggleOverlay = () => {
    setShowOverlay(!showOverlay);
  };

  function checkProperties(obj) {
    for (var key in obj) {
      if (obj[key] !== null && obj[key] != "") return false;
    }
    return true;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(" i have been clicked");
    if (checkProperties(inputs)) {
      setMessages("some values are empty");
      setShow(true);
    } else {
      console.log(inputs);
      axios
        .post("http://localhost:3001/stkPush", {
          amount: state.total,
          phone: inputs.contact,
          Order_ID: 35345,
        })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleChange = (event) => {
    setMessages(" ");
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };
  return (
    <div className="sm:w-3/5 w-11/12 sm:mx-auto mx-auto my-10 py-4 px-3">
      <h2 className="sm:text-2xl sm:text-l text-sm font-semibold sm:text-left text-center">
        Billing Details
      </h2>
      {show && (
        <div className="my-5 mx-3">
          <Alert
            severity="error"
            onClose={() => {
              setShow(false);
            }}>
            Error Message — Some values are empty!
          </Alert>
        </div>
      )}

      <div className="text-left  space-y-5">
        <div className="sm:flex sm:flex-row gap-4 flex-col ">
          <div className="flex  sm:basis-1/2  flex-col">
            <span className="sm:text-l text-sm font-semibold">First Name</span>
            <input
              type="text"
              name="first_name"
              value={inputs.first_name || ""}
              onChange={handleChange}
              className="p-2 border-2 border-slate-200 "
            />
          </div>
          <div className="flex  basis-1/2  flex-col">
            <span className="sm:text-l text-sm font-semibold">Last Name</span>
            <input
              type="text"
              name="last_name"
              value={inputs.last_name || ""}
              onChange={handleChange}
              className="p-2 border-2 border-slate-200 "
            />
          </div>
        </div>

        <div className="flex flex-col">
          <span className="sm:text-l text-sm font-semibold">County/Region</span>
          <input
            type="text"
            className="p-2 border-2 border-slate-200 "
            name="region"
            value={inputs.region || ""}
            onChange={handleChange}
          />
        </div>

        <div className="flex flex-col">
          <span className="sm:text-l text-sm font-semibold">Address</span>
          <input
            type="text"
            className="p-2 border-2 border-slate-200 "
            name="address"
            value={inputs.address || ""}
            onChange={handleChange}
          />
        </div>

        <div className="flex flex-col">
          <span className="sm:text-l text-sm font-semibold">Phone</span>
          <input
            type="text"
            className="p-2 border-2 border-slate-200 "
            name="contact"
            value={inputs.contact || ""}
            placeholder="254 in this form"
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col">
          <span className="sm:text-l text-sm font-semibold">Email Address</span>
          <input
            type="email"
            className="p-2 border-2 border-slate-200 "
            name="email"
            value={inputs.email || ""}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="text-left">
        <h2 className="text-left sm:text-2xl text-xl font-bold my-3 py-3">
          Your Order
        </h2>
        <div className=" block justify-between bg-black px-3 py-3">
          <div className="flex  flex-cols justify-between">
            <h2 className="text-white font-bold">Products</h2>
            <h2 className="text-white font-bold">{state.total}</h2>
          </div>
          <div className="flex flex-cols justify-between">
            <h2 className="text-white font-bold">Shipping</h2>
            <h2 className="text-white font-bold">{state.shipping}</h2>
          </div>
          <div className="flex justify-between">
            <h3 className="text-white font-bold">Total</h3>
            <h3 className="text-white font-bold">{state.total}</h3>
          </div>
        </div>
      </div>
      <div className="text-left">
        <h2 className="text-left text-2xl font-bold my-3 py-3">
          Payment method
        </h2>

        <div className="sm:flex justify-between flex flex-col space-y-5 sm:gap:6">
          <button
            className="bg-green-500 font-bold text-white text-xl py-3 px-2 "
            onClick={toggleOverlay}>
            COMPLETE WITH MPESA
          </button>

          <div
            className="fixed inset-0 z-50"
            style={{ display: showOverlay ? "block" : "none" }}>
            <div className="absolute inset-0 bg-gray-700 opacity-70"></div>
            <div className="absolute inset-0 flex items-center  justify-center">
              <div></div>
              <div className=" flex flex-col">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={toggleOverlay}>
                  close
                </button>
                <span className="text-xl  text-center">PhoneNumber</span>
                <input
                  type="text"
                  name=""
                  id=""
                  className="px-2 py-5 text-xl text-center my-5  font-semibold"
                  value={inputs.contact}
                />
                <span className="text-xl  text-center">Total Amount</span>
                <input
                  type="text"
                  name=""
                  id=""
                  className="px-2 py-5 text-xl text-center my-5 font-semibold"
                  value={state.total}
                />
                <button
                  className="py-4 px-10  bg-green-600   rounded-sm text-white text-2xl  "
                  onClick={(e) => {
                    handleSubmit(e);
                  }}>
                  Make Payment
                </button>
              </div>
            </div>
          </div>

          <button className="bg-blue-500 font-bold text-white text-l sm:text-xl py-3 px-2 ">
            COMPLETE WITH CARD
          </button>
        </div>
      </div>
      <Link to="/" className="text-xl my-5 py-4">
        Back to shopping
      </Link>
    </div>
  );
}

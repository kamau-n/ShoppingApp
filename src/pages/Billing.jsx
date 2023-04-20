import React, { useState } from "react";
import { MpesaStk } from "react-mpesa-stk";

//load the styles
import "react-mpesa-stk/dist/index.css";
import { useLocation } from "react-router-dom";

export default function Billing() {
  const [inputs, setInputs] = useState({});
  const { state } = useLocation();
  const handleSuccess = (data) => {
    //handle success
    console.log(data);
  };

  const handleError = (error) => {
    //handle error
    console.log(error);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(inputs);
  };

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const credentials = {
    title: "order", //eg. 'Pay for your order'
    number: "",
    shortcode: 174379, //eg 174379---obtained from M-Pesa daraja portal
    passkey: "AULHeH0xk8iJVEYVVLdP7KBt4K4AXc1k", //obtained from mpesa daraja portal
    transactionType: "CustomerPayBillOnline", //eg. CustomerPayBillOnline
    businessShortcode: 247247, //eg 174379
    amount: "1", //Amount to be paid by the customer eg. 100
    phone: "254759155650", //Phone number of the customer eg. 254712345000
    callbackUrl: "localhost:3000", //Callback url to be called after payment
    accountReference: "order number", //Account reference eg. order number
    transactionDesc: "order", //Transaction description eg. Order for pizza
    mpesaAuth:
      "QVVMSGVIMHhrOGlKVkVZVlZMZFA3S0J0NEs0QVhjMWs6QnlNbEdwcVJraHlNVDVUbw", //Mpesa auth token obtained from mpesa daraja portal
    environment: "sandbox", //environment to be used eg. sandbox or production--you can use sandbox for testing
  };

  return (
    <div className="w-4/5 mx-auto my-10 py-4 px-3">
      <h2 className="text-2xl font-bold text-left">Billing Details</h2>
      <div className="text-left space-y-5">
        <div className="flex flex-row gap-4">
          <div className="flex  basis-1/2  flex-col">
            <span className="text-l font-bold">First Name</span>
            <input
              type="text"
              name="first_name"
              value={inputs.first_name || ""}
              onChange={handleChange}
              className="p-2 border-2 border-slate-200 "
            />
          </div>
          <div className="flex  basis-1/2  flex-col">
            <span className="text-l font-bold">Last Name</span>
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
          <span className="text-l font-bold">Company Name (optional)</span>
          <input
            type="text"
            className="p-2 border-2 border-slate-200 "
            name="company_name"
            value={inputs.company_name || ""}
          />
        </div>
        <div className="flex flex-col">
          <span className="text-l font-bold">County/Region</span>
          <input
            type="text"
            className="p-2 border-2 border-slate-200 "
            name="region"
            value={inputs.region || ""}
            onChange={handleChange}
          />
        </div>

        <div className="flex flex-col">
          <span className="text-l font-bold">Address</span>
          <input
            type="text"
            className="p-2 border-2 border-slate-200 "
            name="address"
            value={inputs.address || ""}
            onChange={handleChange}
          />
        </div>

        <div className="flex flex-col">
          <span className="text-l font-bold">Phone</span>
          <input
            type="text"
            className="p-2 border-2 border-slate-200 "
            name="contact"
            value={inputs.contact || ""}
            placeholder="+254"
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col">
          <span className="text-l font-bold">Email Address</span>
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
        <h2 className="text-left text-2xl font-bold my-3 py-3">Your Order</h2>
        <div className=" flex justify-between bg-black px-3 py-3">
          <div className="flex justify-between">
            <h2 className="text-white font-bold">Products</h2>
            <h2 className="text-white font-bold">{state.total}</h2>
          </div>
          <div className="flex  justify-between">
            <h2 className="text-white font-bold">Shipping</h2>
            <h2 className="text-white font-bold">{state.shipping}</h2>
          </div>
          <h3 className="text-white font-bold">Total</h3>
        </div>
      </div>
      <div className="text-left">
        <h2 className="text-left text-2xl font-bold my-3 py-3">
          Payment method
        </h2>
        <button
          onClick={handleSubmit}
          className="bg-green-500 font-bold text-white text-xl py-3 px-2 ">
          COMPLETE WITH MPESA
        </button>
        {/* <MpesaStk
          credentials={credentials} //credentials object
          onPaySuccess={handleSuccess} //returned afer a successful payment
          onPayError={handleError}

          //returned after a failed payment
        /> */}
      </div>
    </div>
  );
}

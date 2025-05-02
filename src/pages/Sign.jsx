import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { UserCircle2, AlertCircle, Building2, User } from "lucide-react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../config/config";

const auth = getAuth();

const Sign = () => {
  const [errors, setError] = useState("");
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    county: "",
    phone: "",
    accountType: "customer", // New field for account type
    businessName: "", // Only used if accountType is "business"
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const registerUser = async (userId) => {
    try {
      const userData = {
        user_id: userId,
        user_address: inputs.address,
        user_email: inputs.email,
        phoneNumber: inputs.phone,
        user_first_name: inputs.firstName,
        user_last_name: inputs.lastName,
        user_city: inputs.city,
        user_county: inputs.county,
        user_role: inputs.accountType,
      };

      // Add user to Users collection
      const userDoc = await addDoc(collection(db, "Users"), userData);

      // If business account, create business profile
      if (inputs.accountType === "business") {
        await addDoc(collection(db, "business_profiles"), {
          user_id: userId,
          business_name: inputs.businessName,
          subscription_status: "pending",
          business_url: inputs.businessName.toLowerCase().replace(/\s+/g, "-"),
          created_at: new Date(),
        });
        // Redirect to payment page for business accounts
        navigate("/business-payment");
      } else {
        // Redirect to account page for customers
        navigate("/account");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const signup = async () => {
    if (
      !inputs.email ||
      !inputs.password ||
      !inputs.firstName ||
      !inputs.lastName
    ) {
      setError("Please fill in all required fields");
      return;
    }

    if (inputs.accountType === "business" && !inputs.businessName) {
      setError("Please enter your business name");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        inputs.email,
        inputs.password
      );
      await registerUser(userCredential.user.uid);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full mx-auto bg-white rounded-xl shadow-lg p-8">
        <div className="text-center mb-8">
          <UserCircle2 className="mx-auto h-12 w-12 text-indigo-600" />
          <h2 className="mt-4 text-3xl font-extrabold text-gray-900">
            MY SHOP
          </h2>
          <p className="mt-2 text-sm text-gray-600">Create your account</p>
        </div>

        {errors && (
          <div className="mb-6 p-4 rounded-md bg-red-50 flex items-center">
            <AlertCircle className="h-5 w-5 text-red-400 mr-2" />
            <span className="text-sm text-red-700">{errors}</span>
          </div>
        )}

        <div className="space-y-4">
          {/* Account Type Selection */}
          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() =>
                setInputs((prev) => ({ ...prev, accountType: "customer" }))
              }
              className={`p-4 border rounded-lg flex flex-col items-center ${
                inputs.accountType === "customer"
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200"
              }`}>
              <User className="h-6 w-6 mb-2" />
              <span className="text-sm font-medium">Customer</span>
            </button>
            <button
              type="button"
              onClick={() =>
                setInputs((prev) => ({ ...prev, accountType: "business" }))
              }
              className={`p-4 border rounded-lg flex flex-col items-center ${
                inputs.accountType === "business"
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200"
              }`}>
              <Building2 className="h-6 w-6 mb-2" />
              <span className="text-sm font-medium">Business</span>
            </button>
          </div>

          {/* Business Name (only shown for business accounts) */}
          {inputs.accountType === "business" && (
            <div>
              <input
                type="text"
                name="businessName"
                value={inputs.businessName}
                onChange={handleChange}
                placeholder="Business Name"
                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          )}

          {/* Personal Information */}
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="firstName"
              value={inputs.firstName}
              onChange={handleChange}
              placeholder="First Name"
              className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            <input
              type="text"
              name="lastName"
              value={inputs.lastName}
              onChange={handleChange}
              placeholder="Last Name"
              className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <input
            type="email"
            name="email"
            value={inputs.email}
            onChange={handleChange}
            placeholder="Email Address"
            className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />

          <input
            type="password"
            name="password"
            value={inputs.password}
            onChange={handleChange}
            placeholder="Password"
            className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />

          <input
            type="tel"
            name="phone"
            value={inputs.phone}
            onChange={handleChange}
            placeholder="Phone Number"
            className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />

          <input
            type="text"
            name="address"
            value={inputs.address}
            onChange={handleChange}
            placeholder="Address"
            className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />

          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="city"
              value={inputs.city}
              onChange={handleChange}
              placeholder="City"
              className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            <input
              type="text"
              name="county"
              value={inputs.county}
              onChange={handleChange}
              placeholder="County"
              className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <button
            onClick={signup}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200">
            Create Account
          </button>
        </div>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">
                Already have an account?
              </span>
            </div>
          </div>

          <div className="mt-6 flex justify-center space-x-4 text-sm">
            <Link
              to="/login"
              className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors duration-200">
              Sign in
            </Link>
            <span className="text-gray-500">•</span>
            <Link
              to="/"
              className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors duration-200">
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sign;

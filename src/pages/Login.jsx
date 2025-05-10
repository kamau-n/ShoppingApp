import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  FacebookAuthProvider,
} from "firebase/auth";
import { UserCircle2, AlertCircle, Lock } from "lucide-react";
import { Face, Facebook, GitHub, Twitter, Web } from "@material-ui/icons";
import { FaGoogle } from "react-icons/fa";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../config/config";

const auth = getAuth();
const provider = new GoogleAuthProvider();

const Login = () => {
  const signInFacebook = () => {
    const facebookProvider = new FacebookAuthProvider();

    signInWithPopup(auth, facebookProvider)
      .then((result) => {
        const user = result.user;
        console.log("Facebook user:", user);

        checkUser(
          user.uid,
          user.email,
          user.phoneNumber,
          user.displayName,
          "customer",
          user.photoURL
        );
      })
      .catch((error) => {
        console.error("Facebook sign-in error:", error.message);
        setMesseges("Unable to sign in with Facebook");
      });
  };
  const signInGithub = () => {};

  // create a method to check if the user is already registered
  const checkUser = (userId, email, phoneNumber, name, role, image) => {
    console.log("am checking a user" + name);
    const users = collection(db, "Users");
    const q = query(users, where("user_email", "==", email));
    getDocs(q)
      .then((res) => {
        if (res.docs.length > 0) {
          console.log("user already registered");
          navigate("/account");
        } else {
          registerUser(userId, email, phoneNumber, name, role, image);
        }
      })
      .catch((err) => {
        setMesseges(err.message);
      });
  };

  const registerUser = (userId, email, phoneNumber, name, role, image) => {
    console.log("am registering a user");
    addDoc(collection(db, "Users"), {
      user_id: userId,
      user_address: null,
      user_email: email,
      phoneNumber: phoneNumber,
      //split the name and get the first name,
      user_first_name: name.slice(0, name.indexOf(" ")),
      user_last_name: name.slice(name.indexOf(" ") + 1),
      user_city: null,
      user_county: null,
      user_role: role,
      user_image: image,
    })
      .then((res) => {
        console.log(res);
        //setError("user created successfully");
        navigate("/account");
      })
      .catch((err) => {
        setMesseges(err.message);
      });
  };
  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        console.log(user);

        checkUser(
          user.uid,
          user.email,
          user.phoneNumber,
          user.displayName,
          "customer",
          user.photoURL
        );

        // navigate("/login");
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
        // The email of the user's account used.
        // const email = error.customData.email;
        // The AuthCredential type that was used.
        // credential = GoogleAuthProvider.credentialFromError(error);
        // ...
        setMesseges("Unable to sign in with google");
      });
  };

  const [useremail, setUseremail] = useState();
  const [password, setPassword] = useState();
  const [mess, setMesseges] = useState("");
  const navigate = useNavigate();

  const signin = () => {
    if (!useremail || !password) {
      setMesseges("Please fill in all fields");
      return;
    }

    signInWithEmailAndPassword(auth, useremail, password)
      .then((res) => {
        console.log("this is the response");
        console.log(res);
        if (res.user) {
          navigate("/account");
        }
      })
      .catch((err) => {
        setMesseges(err.message);
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full mx-auto bg-white rounded-xl shadow-lg p-8">
        <div className="text-center mb-8">
          <div className="relative mx-auto w-fit">
            <UserCircle2 className="h-12 w-12 text-indigo-600" />
            <Lock className="h-5 w-5 text-indigo-600 absolute -right-1 bottom-0" />
          </div>
          <h2 className="mt-4 text-3xl font-extrabold text-gray-900">
            MY SHOP
          </h2>
          <p className="mt-2 text-sm text-gray-600">Sign in to your account</p>
        </div>

        {mess && (
          <div className="mb-6 p-4 rounded-md bg-red-50 flex items-center">
            <AlertCircle className="h-5 w-5 text-red-400 mr-2" />
            <span className="text-sm text-red-700">{mess}</span>
          </div>
        )}

        <div className="space-y-4">
          <div>
            <input
              type="email"
              placeholder="Email Address"
              className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              onChange={(e) => setUseremail(e.target.value)}
            />
          </div>

          <div>
            <input
              type="password"
              placeholder="Password"
              className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            onClick={signin}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200">
            Sign in
          </button>
        </div>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">
                Or Sign in With
              </span>
            </div>
          </div>

          <div className="mt-6 flex justify-center space-x-4 text-sm">
            <button onClick={signInWithGoogle}>
              <FaGoogle />
            </button>
            <button onClick={signInFacebook}>
              <Facebook className="h-5 w-5" />
            </button>
            <button onClick={signInGithub}>
              <GitHub className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">
                Don't have an account?
              </span>
            </div>
          </div>

          <div className="mt-6 flex justify-center space-x-4 text-sm">
            <Link
              to="/signup"
              className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors duration-200">
              Sign up
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

export default Login;

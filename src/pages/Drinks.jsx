import React from "react";
import { Grid } from "@mui/material";
import Products from "../assets/Assests";

import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  getDownloadURL,
  ref,
  uploadBytesResumable,
  listAll,
} from "firebase/storage";

import { db, storage } from "../config/config";
import Header from "../components/Header";

import {
  collection,
  getDocs,
  addDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import DisplayFood from "../components/displayFood";
import TopNav from "../components/TopNav";
import Footer from "../components/Footer";

const auth = getAuth();

const Drinks = () => {
  const [cart, setCart] = useState([]);

  const [drinks, setDrinks] = useState([]);

  const drinkCollection = collection(db, "Drinks");

  const [user, setUser] = useState();

  useEffect(() => {
    listItem2();
  }, []);

  const getDrink = () => {
    const getDrinks = async () => {
      const data = await getDocs(drinkCollection);
      setDrinks(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      console.log(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getDrinks();
  };

  const listItem2 = () => {
    // getuser()
    const getDrinks = async () => {
      const data = await getDocs(drinkCollection);
      setDrinks(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      //console.log(data.docs.map((doc)=>({...doc.data(),id:doc.id})))
    };
    getDrinks();
  };

  return (
    <div>
      <main className=" w-5/6 p-2 my-3 mx-auto">
        <TopNav />
        <h2 className="uppercase text-xl my-5 py-3  font-bold">
          Available Drinks
        </h2>
        <DisplayFood data={drinks} type="Drinks" />
      </main>
      <Footer />
    </div>
  );
};

export default Drinks;

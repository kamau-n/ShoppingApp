import React from "react";
import { Grid } from "@mui/material";
import Products from "../assets/Assests";
// import Item from "../Item";
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

const Product = () => {
  const [cart, setCart] = useState([]);

  const [data, setData] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const mealCollection = collection(db, "Meals");
  const drinkCollection = collection(db, "Drinks");
  const [noOrder, setNoOrders] = useState(0);
  const [user, setUser] = useState();

  function allStorage() {
    var values = [],
      keys = Object.keys(localStorage),
      i = keys.length;

    while (i--) {
      values.push(localStorage.getItem(keys[i]));
    }

    return values;
  }

  useEffect(() => {
    listItem();
    listItem2();
    setNoOrders(allStorage().length);
    getDrink();
  }, []);

  const getDrink = () => {
    const getDrinks = async () => {
      const data = await getDocs(drinkCollection);
      setDrinks(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      console.log(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getDrinks();
  };

  const listItem = () => {
    const getMeals = async () => {
      const data = await getDocs(mealCollection);
      setData(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      //console.log(data.docs.map((doc)=>({...doc.data(),id:doc.id})))
    };
    getMeals();
  };

  const logout = () => {
    signOut(auth)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log("there was an error that occured");
        // An error happened.
      });
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
      <TopNav />
      <main className=" w-11/12 p-2 my-3 mx-auto  bg-slate-200 ">
        <h2 className="uppercase text-xl my-5 py-3  font-bold">
          Available Meals
        </h2>
        <DisplayFood data={data} type="Meals" />
      </main>
      <Footer />
    </div>
  );
};

export default Product;

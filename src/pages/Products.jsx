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
import TopBar from "../components/TopBar";
//import Carosel from "./components/Carosel";
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
      <TopBar />

      <div className="category">
        <h2>Categories</h2>
        <div></div>
      </div>
      <main
        style={{
          width: "90%",
          margin: "auto",
          height: "50%",
        }}>
        <h2>Available Meal</h2>
        <div>
          {data.map((product) => (
            <div className="" key={product.id}>
              {/* <img src={product.Link} alt="no image" className="w-20" /> */}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Product;

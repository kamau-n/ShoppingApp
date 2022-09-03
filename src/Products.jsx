import React from "react";
import { Grid } from "@mui/material";
import Products from "./assets/Assests";
import Item from "./Item";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  getDownloadURL,
  ref,
  uploadBytesResumable,
  listAll,
} from "firebase/storage";
import "./App.css";
import { db, storage } from "./config";
import Header from "./components/Header";
import TopBar from "./components/TopBar";
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
        <Grid container justify="center" spacing={2}>
          {data.map((product) => (
            <Grid
              item
              key={product.id}
              xs={12}
              sm={8}
              lg={2}
              style={{
                marginTop: 10,
              }}>
              <Item product={product} />
            </Grid>
          ))}
        </Grid>

        <h2>Available Drinks</h2>

        <Grid container justify="center" spacing={2}>
          {drinks.map((product) => (
            <Grid
              item
              key={product.id}
              xs={12}
              sm={8}
              lg={3}
              style={{
                marginTop: 10,
              }}>
              <Item product={product} />
            </Grid>
          ))}
        </Grid>
      </main>
    </div>
  );
};

export default Product;

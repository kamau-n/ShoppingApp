import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SimpleSlider from "../components/SimpleSlider";
import burger from "../assets/peperoni.jpg";
import jager from "../assets/download.jpeg";
// import Toolbar from "@mui/material/Toolbar";
import starter from "../assets/starters.jpg";

import TopNav from "../components/TopNav";
import Footer from "../components/Footer";
import { db } from "../config/config";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import firebase from "firebase/compat/app";

import Review from "../components/Review";
const auth = getAuth();

export default function Home() {
  const drinkCollection = collection(db, "Fmeals");
  const mealCollection = collection(db, "Fdrinks");
  const [fMeals, setFmeals] = useState([]);
  const [fDrinks, setDrinks] = useState([]);
  const [user, setUser] = useState({});
  const type = "Fmeals";
  const navigate = useNavigate();
  // const dbs = firebase.firestore();

  const fetchFeatured = () => {
    const getFeatured = async () => {
      const data = await getDocs(drinkCollection);
      setFmeals(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      // console.log(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getFeatured();
  };
  const fetchFeatured2 = () => {
    const getFeatured2 = async () => {
      const data = await getDocs(mealCollection);
      setDrinks(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      // console.log(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getFeatured2();
  };

  const userLogin = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setLogged(true);

        // console.log(user);
        // console.log(user.uid);
      } else {
        setLogged(false);
      }
    });
  };

  const [logged, setLogged] = useState(false);

  useState(() => {
    fetchFeatured();
    userLogin();
    if (localStorage.getItem("ladoche_shopping_cart") == null) {
      localStorage.setItem("ladoche_shopping_cart", "[]");
    }
  }, []);
  return (
    <div className="bg-slate-100 w-full">
      <TopNav logged={logged} />
      <div className=" sm:w-4/5 p-2 my-0 px-1  sm:mx-auto  ">
        <div className="py-10 px-5  sm:flex  my-6   ">
          <div className="sm:w-1/2  flex-1 ">
            <SimpleSlider />
          </div>

          {/* <div className=" py-2 sm:w-1/2  bg-white sm:flex-1">
            <div className="grid sm:grid-cols-2 grid-cols-1 gap-4 ">
              {fMeals.map((product) => (
                <div
                  className="mx-4 border-1 rounded-sm "
                  key={product.id}
                  onClick={() => {
                    navigate(`/product/${product.id}`);
                  }}>
                  <img
                    src={product.Link}
                    alt=""
                    className="bg-cover h-60 w-full rounded-md"
                  />
                </div>
              ))}
            </div>
          </div> */}
        </div>
        <div className=" bg-white px-3 py-4">
          <h2 className="sm:text-2xl py-2 sm:text-left text-center px-3 mx-3 my-7 font-bold ">
            Our Categories
          </h2>
          <div className=" sm:grid sm:grid-cols-3 sm:gap-8 sm:space-y-0 space-y-8  rounded-sm  ">
            <div
              onClick={() => {
                navigate("/drinks");
              }}
              className=" flex flex-col py-10  h-60  rounded-md bg-cover bg-center"
              style={{
                background: `linear-gradient(rgba(1,0,0,0.6),rgba(1,0,0,0.5)) ,url(${jager}) `,
                backgroundPosition: "center",
                backgroundSize: "cover",
              }}>
              <h2 className=" text-center py-2   px-3 text-2xl font-bold text-white">
                Alchoholic Drinks
              </h2>

              <button className="bg-blue-500 text-white py-2 w-1/2 mx-auto px-4 rounded-md">
                Shop Now
              </button>
            </div>

            <div
              onClick={() => {
                navigate("/drinks");
              }}
              className=" flex flex-col py-10  h-60  rounded-md bg-cover bg-center"
              style={{
                background: `linear-gradient(rgba(1,0,0,0.6),rgba(1,0,0,0.5)) ,url(https://liquorsquare.co.ke/lsqr-media/2022/10/Coca-Cola-Coke-Soft-Drink-2-Litres.jpg) `,
                backgroundPosition: "center",
                backgroundSize: "cover",
              }}>
              <h2 className=" text-center py-2   px-3 text-2xl font-bold text-white">
                Soda
              </h2>

              <button className="bg-blue-500 text-white py-2 w-1/2 mx-auto px-4 rounded-md">
                Shop Now
              </button>
            </div>
            <div
              onClick={() => {
                navigate("/meals");
              }}
              className=" flex flex-col py-10  h-60  rounded-md  bg-cover bg-center"
              style={{
                background: `linear-gradient(rgba(1,0,0,0.6),rgba(1,0,0,0.5)) ,url(https://assets.tmecosys.com/image/upload/t_web767x639/img/recipe/ras/Assets/102cf51c-9220-4278-8b63-2b9611ad275e/Derivates/3831dbe2-352e-4409-a2e2-fc87d11cab0a.jpg `,
                backgroundPosition: "center",
                backgroundSize: "cover",
              }}>
              <h2 className=" text-center py-2   px-3 text-2xl font-bold text-white">
                Fast Foods
              </h2>

              <button className="bg-blue-500 text-white py-2 w-1/2 mx-auto px-4 rounded-md">
                Shop Now
              </button>
            </div>
            <div
              onClick={() => {
                navigate("/meals");
              }}
              className=" flex flex-col py-10  h-60   rounded-md bg-cover bg-center"
              style={{
                background: `linear-gradient(rgba(1,0,0,0.6),rgba(1,0,0,0.5)) ,url(${burger}) `,
                backgroundPosition: "center",
                backgroundSize: "cover",
              }}>
              <h2 className=" text-center py-2   px-3 text-2xl font-bold text-white">
                Full Meals
              </h2>

              <button className="bg-blue-500 text-white py-2 w-1/2 mx-auto px-4 rounded-md">
                Shop Now
              </button>
            </div>
            <div
              onClick={() => {
                navigate("/meals");
              }}
              className=" flex flex-col py-10  h-60    rounded-md bg-cover bg-center"
              style={{
                background: `linear-gradient(rgba(1,0,0,0.6),rgba(1,0,0,0.5)) ,url(https://cdn.loveandlemons.com/wp-content/uploads/2021/06/summer-desserts-500x500.jpg) `,
                backgroundPosition: "center",
                backgroundSize: "cover",
              }}>
              <h2 className=" text-center py-2   px-3 text-2xl font-bold text-white">
                Desserts
              </h2>

              <button className="bg-blue-500 text-white py-2 w-1/2 mx-auto px-4 rounded-md">
                Shop Now
              </button>
            </div>
          </div>

          <div className="my-8 px-4  py-5">
            <h2 className=" sm:text-2xl text-l font-bold text-center  sm:text-left my-5 ">
              Favourite Meals
            </h2>
            <div className="sm:grid sm:grid-cols-4 rounded-md  bg-slate-200 sm:space-y-0 space-y-8   px-2 py-7 gap-4">
              {fMeals.map((product) => (
                <div
                  className="sm:mx-4 border-2 sm:rounded-md  shadow-xl bg-white  "
                  key={product.id}
                  onClick={() => {
                    navigate(`/product/${product.id}`, {
                      state: { type: type },
                    });
                  }}>
                  <img
                    src={product.Link}
                    alt=""
                    className="w-2/3 mx-auto m-2 py-3 rounded-full h-52"
                  />
                  <h2 className="font-mono px-2 sm:text-xl text-l py-3">
                    {product.Name}
                  </h2>
                  <div className="flex  flex-row-reverse my-3 mx-5 p-3 justify-between">
                    <h2 className="p-3 sm:text-l  text-xs font-bold">
                      KSH: {product.Price}
                    </h2>
                    <button className="font-bold text-white sm:text-xl text-xs sm:px-5 px-3 sm:py-2 py-0 bg-blue-700 rounded">
                      add to cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
            s
          </div>

          <div className="w-4/4 bg-slate-100 my-5  py-3 ">
            <div className=" ">
              <div class="bg-white rounded-lg shadow-md  p-6">
                <h2 class="sm:text-2xl text-l text-center sm:text-left font-bold    my-8">
                  Customer Reviews
                </h2>
                <Review />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

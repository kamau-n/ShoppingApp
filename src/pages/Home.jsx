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
             <div className="bg-gradient-to-br from-slate-50 to-slate-100 p-6 sm:p-8 rounded-2xl shadow-lg">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
        {fMeals.map((product) => (
          <div
            key={product.id}
            className="group relative bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
            onClick={() => navigate(`/product/${product.id}`, { state: { type } })}
          >
            {/* Image Container */}
            <div className="relative overflow-hidden rounded-t-xl aspect-square">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/5 group-hover:to-black/10 transition-opacity duration-300" />
              <img
                src={product.Link}
                alt={product.Name}
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
              />
            </div>

            {/* Content Container */}
            <div className="p-5">
              <h2 className="font-semibold text-lg text-gray-800 line-clamp-2 min-h-[3.5rem] mb-4">
                {product.Name}
              </h2>

              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-sm text-gray-500 mb-1">Price</span>
                  <span className="text-xl font-bold text-gray-900">
                    KSH {product.Price.toLocaleString()}
                  </span>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    // Add to cart logic here
                  }}
                  className="relative overflow-hidden bg-blue-600 text-white px-4 py-2 rounded-lg font-medium
                    transform transition-all duration-300 hover:bg-blue-700 active:scale-95
                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                    before:absolute before:inset-0 before:bg-white/20 before:translate-x-[-100%] before:hover:translate-x-[100%] 
                    before:transition-transform before:duration-300 before:ease-out"
                >
                  Add to Cart
                </button>
              </div>
            </div>

            {/* Hover Effects */}
            <div className="absolute inset-0 rounded-xl ring-1 ring-black/5 group-hover:ring-black/10 pointer-events-none transition-all duration-300" />
          </div>
        ))}
      </div>
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

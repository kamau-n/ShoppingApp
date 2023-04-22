import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SimpleSlider from "../components/SimpleSlider";
import burger from "../assets/peperoni.jpg";
import jager from "../assets/download.jpeg";
import starter from "../assets/starters.jpg";
import TopNav from "../components/TopNav";
import Footer from "../components/Footer";
import { db } from "../config/config";
import { collection, getDocs } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
const auth = getAuth();

export default function Home() {
  const drinkCollection = collection(db, "Fmeals");
  const [fMeals, setFmeals] = useState([]);
  const navigate = useNavigate();

  const fetchFeatured = () => {
    const getFeatured = async () => {
      const data = await getDocs(drinkCollection);
      setFmeals(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      console.log(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getFeatured();
  };

  const userLogin = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setLogged(true);
        console.log(user);
        //console.log(user.uid);
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
    <div className="bg-slate-100">
      <div className=" w-3/4 p-2 my-3   mx-auto  ">
        <TopNav logged={logged} />

        <div className="py-10 px-5  flex my-6 ">
          <div className="w-1/2  flex-1">
            <SimpleSlider />
          </div>

          <div className=" py-2 w-1/2  bg-white flex-1">
            <div className="grid grid-cols-2 gap-4 ">
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
                    className="bg-cover h-60 rounded-md"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div
          className=" bg-white px-3 py-4"
          onClick={() => {
            navigate("/meals");
          }}>
          <div className="grid grid-cols-4  gap-3">
            <div className="border-r-1 flex gap-8 border-slate-200">
              <div className="py-3">
                <h2 className="text-l  px-3 font-bold"> Meals</h2>
                <h2>Alot of them</h2>
              </div>
              <img
                src={burger}
                alt="no image"
                className="w-20 bg-cover p-2 h-16"
              />
            </div>

            <div
              className=" flex gap-8 border-slate-200"
              onClick={() => {
                navigate("/drinks");
              }}>
              <div className="py-3">
                <h2 className="text-l  px-3 font-bold"> Drinks</h2>
                <h2>12 Meal</h2>
              </div>
              <img
                src={jager}
                alt="no image"
                className="w-20 bg-cover p-2 h-16"
              />
            </div>
            <div
              className=" flex gap-8 border-slate-200"
              onClick={() => {
                navigate("/meals");
              }}>
              <div className="py-3">
                <h2 className="text-l  px-3 font-bold"> Starter</h2>
                <h2>12 Meal</h2>
              </div>
              <img
                src={burger}
                alt="no image"
                className="w-20 p-2 h-16"
                onClick={() => {
                  navigate("/meals");
                }}
              />
            </div>
            <div className=" flex gap-8 border-slate-200">
              <div className="py-3">
                <h2 className="text-l  px-3 font-bold">Snacks</h2>
                <h2>12 Meal</h2>
              </div>
              <img src={burger} alt="no image" className="w-20 p-2 h-16" />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

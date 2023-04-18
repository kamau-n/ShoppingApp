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
  useState(() => {
    fetchFeatured();
    if (localStorage.getItem("ladoche_shopping_cart") == null) {
      localStorage.setItem("ladoche_shopping_cart", "[]");
    }
  }, []);
  return (
    <div>
      <div className=" w-3/4 p-2 my-3 mx-auto  ">
        <TopNav />

        <div className="py-10 px-5 my-10 ">
          <h2 className="text-xl font-bold text-left px-3 py-4 uppercase">
            Our best choices
          </h2>
          <SimpleSlider />
        </div>
        <div>
          <h2 className="text-left  text-xl  uppercase font-bold px-3 py-4">
            Categories
          </h2>
          <div className="flex gap-2">
            <div className="border-2 border-slate-300">
              <img src={jager} alt="no image" className="w-full h-60" />
              <h2 className="text-xl uppercase  font-bold py-3 px-3">
                Alchohl Drinks
              </h2>
            </div>
            <div className="border-2 border-slate-300">
              <img src={burger} alt="no image" className="w-full h-60" />
              <h2 className="text-xl uppercase p-3 font-bold">Meals</h2>
            </div>
            <div className="border-2 border-slate-300">
              <img src={starter} alt="no image" className="w-full h-60" />
              <h2 className="text-xl uppercase p-3 font-bold">Starter</h2>
            </div>
            <div className="border-2 border-slate-300">
              <img src={starter} alt="no image" className="w-full h-60" />
              <h2 className="text-xl uppercase p-3 font-bold">Starter</h2>
            </div>
          </div>
        </div>
        <div className="my-5 py-4">
          <h2 className="text-left  text-xl  uppercase font-bold px-3 py-4">
            Featured Meals
          </h2>
          <div className="grid grid-cols-3 gap-3">
            {fMeals.map((product) => (
              <div
                className="mx-4 border-2 rounded-sm "
                key={product.id}
                onClick={() => {
                  navigate(`/product/${product.id}`);
                }}>
                <img src={product.Link} alt="" className="w-full h-52" />
                <h2 className="font-mono px-2 py-3">{product.Name}</h2>
                <div className="flex my-3 mx-5 p-3 justify-between">
                  <h2 className="p-3 text-xl font-bold">{product.Price}</h2>
                  <button className="font-bold text-white px-5 py-2 bg-blue-700 rounded">
                    add
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

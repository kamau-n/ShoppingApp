import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SimpleSlider from "../components/SimpleSlider";
import burger from "../assets/peperoni.jpg";
import jager from "../assets/download.jpeg";
import starter from "../assets/starters.jpg";
import TopNav from "../components/TopNav";
import Footer from "../components/Footer";
import { db } from "../config/config";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
const auth = getAuth();

export default function Home() {
  const drinkCollection = collection(db, "Fmeals");
  const [fMeals, setFmeals] = useState([]);
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  const fetchFeatured = () => {
    const getFeatured = async () => {
      const data = await getDocs(drinkCollection);
      setFmeals(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      console.log(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getFeatured();
  };

  const getUser = async (id) => {
    const docRef = doc(db, "Users", id);

    try {
      const docSnap = await getDoc(docRef);
      console.log(docSnap.data());
      setUser(docSnap.data());
    } catch (error) {
      console.log(error);
    }
  };

  const userLogin = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setLogged(true);
        getUser(user.uid);
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
      <div className=" sm:w-3/4 p-2 my-3  w-full  sm:mx-auto  ">
        <TopNav logged={logged} />

        <div className="py-10 px-5  sm:flex  my-6  flex ">
          <div className="sm:w-1/2  flex-1 ">
            <SimpleSlider />
          </div>

          <div className=" py-2 sm:w-1/2  bg-white sm:flex-1">
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
                    className="bg-cover h-60 w-full rounded-md"
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
          <h2 className="font-xl py-2 px-3 m-3 font-bold ">Our Categories</h2>
          <div className="sm:grid grid-cols-4  gap-3">
            <div
              className=" flex flex-col py-10  h-60  bg-cover bg-center"
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
              className=" flex flex-col py-10  h-60  bg-cover bg-center"
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
              className=" flex flex-col py-10  h-60  bg-cover bg-center"
              style={{
                background: `linear-gradient(rgba(1,0,0,0.6),rgba(1,0,0,0.5)) ,url(https://www.foodandwine.com/thmb/pwFie7NRkq4SXMDJU6QKnUKlaoI=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Ultimate-Veggie-Burgers-FT-Recipe-0821-5d7532c53a924a7298d2175cf1d4219f.jpg) `,
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
              className=" flex flex-col py-10  h-60  bg-cover bg-center"
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
              className=" flex flex-col py-10  h-60  bg-cover bg-center"
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
        </div>
      </div>
      <Footer />
    </div>
  );
}

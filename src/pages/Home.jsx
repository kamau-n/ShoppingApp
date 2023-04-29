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
  const mealCollection = collection(db, "Fdrinks");
  const [fMeals, setFmeals] = useState([]);
  const [fDrinks, setDrinks] = useState([]);
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
  const fetchFeatured2 = () => {
    const getFeatured2 = async () => {
      const data = await getDocs(mealCollection);
      setDrinks(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      console.log(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getFeatured2();
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
    <div className="bg-slate-100 w-full">
      <div className=" sm:w-3/4 p-2 my-3    sm:mx-auto  ">
        <TopNav logged={logged} />

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
        <div
          className=" bg-white px-3 py-4"
          onClick={() => {
            navigate("/meals");
          }}>
          <h2 className="sm:text-2xl py-2 text-left px-3 mx-3 my-7 font-bold ">
            Our Categories
          </h2>
          <div className="sm:grid sm:grid-cols-4  sm:space-y-6 rounded-sm sm:gap-3">
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
          <div className="w-4/4 bg-slate-100 my-5  py-3 ">
            <h2 className="sm:text-2xl  text-left font-bold my-7 py-2 px-2 ">
              Featured Meals
            </h2>
            <div className=" sm:grid sm:grid-cols-4 gap-6">
              {fMeals.map((meal) => {
                return (
                  <div className="bg-white py-3 px-4">
                    <img
                      src={meal.Link}
                      alt="no image"
                      className="w-3/4 mx-auto h-60 my-6"
                    />
                    <div className="space-y-6">
                      <h2 className="text-red-300 text-left font-semibold">
                        Featured
                      </h2>

                      <h2 className="text-black text-left font-semibold">
                        {meal.Name}
                      </h2>

                      <h2 className="text-black text-left font-semibold">
                        $ : {meal.Price}
                      </h2>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

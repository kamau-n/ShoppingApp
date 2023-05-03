import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SimpleSlider from "../components/SimpleSlider";
import burger from "../assets/peperoni.jpg";
import jager from "../assets/download.jpeg";
import Toolbar from "@mui/material/Toolbar";
import starter from "../assets/starters.jpg";
import about from "../assets/about.jpg";
import TopNav from "../components/TopNav";
import Footer from "../components/Footer";
import { db } from "../config/config";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import firebase from "firebase/app";
import "firebase/firestore";
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

  // const getUser = async (id) => {

  //   const usersRef = firebase.firestore().collection("users");

  //   // Query the users collection based on the email field
  //   const query = usersRef.where("user_id", "==", `${id}`);

  //   // Get the document(s) that match the query
  //   query
  //     .get()
  //     .then((querySnapshot) => {
  //       // Loop through the documents and log the data
  //       querySnapshot.forEach((doc) => {
  //         console.log(doc.id, " => ", doc.data());
  //       });
  //     })
  //     .catch((error) => {
  //       console.log("Error getting user: ", error);
  //     });
  // };

  const userLogin = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setLogged(true);
        // getUser(user.uid);
        // console.log(user);
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
        <div
          className=" bg-white px-3 py-4"
          onClick={() => {
            navigate("/meals");
          }}>
          <div className="w-full my-20">
            <div className="sm:flex sm:flex-row-reverse   flex flex-col-reverse sm:justify-between ">
              <div className="basis-1/2 flex space-y-8 flex-col justify-center  p-5 align-middle my-4">
                <h2 className="text-green-300 sm:text-left font-semibold text-3xl sm:text-5xl">
                  About us
                </h2>
                <h2 className="sm:text-4xl  text-2xl text-blue-300 sm:text-left font-bold font-serif">
                  Why choose us
                </h2>
                <p className="sm:text-2xl text-xl py-3 sm:text-left  ">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ut
                  officiis debitis qui architecto possimus consequuntur,
                  repellendus quia nisi, maxime doloribus optio eius obcaecati
                  excepturi porro sunt consectetur quidem soluta explicabo.
                </p>
                <div className="sm:text-left text-center">
                  <button className="bg-blue-600 px-8 text-xl font-bold text-white rounded-md py-3">
                    order now
                  </button>
                </div>
              </div>
              <div className="basis-1/2 px-8 py-5  my-4">
                <img
                  src={about}
                  alt="no image"
                  className=" sm:bg-cover mx-auto  h-full rounded-full  "
                />
              </div>

              {/* <h3 className="px-2 py-2 font-mono">{prod.name}</h3>
              <div className="px-3 py-3 flex  justify-between m-4"> 
                 <h2 className="font-bold py-2">{prod.price}</h2>
                <button className="font-bold text-white px-5 py-2 bg-blue-700 rounded">
                  add
                </button> */}
            </div>
          </div>
          <h2 className="sm:text-2xl py-2 sm:text-left text-center px-3 mx-3 my-7 font-bold ">
            Our Categories
          </h2>
          <div className="sm:grid sm:grid-cols-3   space-y-8 rounded-sm sm:gap-3">
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
            <div className=" ">
              <div class="bg-white rounded-lg shadow-md  p-6">
                <h2 class="text-2xl text-left font-bold    my-8">
                  Customer Reviews
                </h2>
                <ul className=" sm:flex gap-10">
                  <li class="border-b border-gray-200 py-4">
                    <div class="flex items-center">
                      <img
                        src="https://via.placeholder.com/48"
                        alt="Avatar"
                        class="w-12 h-12 rounded-full mr-4"
                      />
                      <div>
                        <h3 class="text-base font-medium">John Doe</h3>
                        <p class="text-gray-600 text-sm">3 days ago</p>
                      </div>
                    </div>
                    <p class="text-gray-700 mt-4">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Mauris at mollis mauris. Nullam vitae sapien a libero
                      pulvinar congue. Fusce id rutrum dolor. Donec vel maximus
                      mauris.
                    </p>
                  </li>
                  <li class="border-b border-gray-200 py-4">
                    <div class="flex items-center">
                      <img
                        src="https://via.placeholder.com/48"
                        alt="Avatar"
                        class="w-12 h-12 rounded-full mr-4"
                      />
                      <div>
                        <h3 class="text-base font-medium">John Doe</h3>
                        <p class="text-gray-600 text-sm">3 days ago</p>
                      </div>
                    </div>
                    <p class="text-gray-700 mt-4">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Mauris at mollis mauris. Nullam vitae sapien a libero
                      pulvinar congue. Fusce id rutrum dolor. Donec vel maximus
                      mauris.
                    </p>
                  </li>
                  <li class="border-b border-gray-200 py-4">
                    <div class="flex items-center">
                      <img
                        src="https://via.placeholder.com/48"
                        alt="Avatar"
                        class="w-12 h-12 rounded-full mr-4"
                      />
                      <div>
                        <h3 class="text-base font-medium">John Doe</h3>
                        <p class="text-gray-600 text-sm">3 days ago</p>
                      </div>
                    </div>
                    <p class="text-gray-700 mt-4">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Mauris at mollis mauris. Nullam vitae sapien a libero
                      pulvinar congue. Fusce id rutrum dolor. Donec vel maximus
                      mauris.
                    </p>
                  </li>
                  <li class="border-b border-gray-200 py-4">
                    <div class="flex items-center">
                      <img
                        src="https://via.placeholder.com/48"
                        alt="Avatar"
                        class="w-12 h-12 rounded-full mr-4"
                      />
                      <div>
                        <h3 class="text-base font-medium">Jane Smith</h3>
                        <p class="text-gray-600 text-sm">1 week ago</p>
                      </div>
                    </div>
                    <p class="text-gray-700 mt-4">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Duis bibendum, odio eu feugiat pretium, mauris magna
                      malesuada turpis, sit amet luctus dui purus at nunc.
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

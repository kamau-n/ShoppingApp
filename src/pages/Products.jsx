import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../config/config";
import TopNav from "../components/TopNav";
import Footer from "../components/Footer";
import { Alert } from "@mui/material";

const mealsRef = collection(db, "Meals");

export default function ({ route, navigation }) {
  const { id } = useParams();
  const [details, setDetails] = useState({});
  const [quantity, setQuantity] = useState(1);
  const { state } = useLocation();
  const [show, setShow] = useState(false);
  const [rating, setRating] = useState();
  const handleRating = () => {
    alert(rating);
  };
  //console.log(state);

  useEffect(() => {
    const docRef = doc(db, `${state.type}`, id);

    try {
      // const docSnap =
      getDoc(docRef).then((res) => {
        console.log(docRef);
        //console.log(res.data());
        setDetails(res.data());
      });
    } catch (error) {
      console.log(error);
    }
  }, []);
  return (
    <div>
      <TopNav />
      <div className=" w-5/6 p-2 my-3 mx-auto  ">
        {show && (
          <div className="my-5 mx-3">
            <Alert
              severity="success"
              className="text-3xl"
              onClose={() => {
                setShow(false);
              }}>
              Item has been added to the cart sucessfully
            </Alert>
          </div>
        )}
        <div className=" my-5 mx-3 py-5  px-3 sm:flex  gap-3 ">
          <div className="basis-1/2 py-4 px-3 m-4">
            <img src={details.Link} alt="no image" className="sm:h-96  w-96 " />
          </div>
          <div className="basis-1/2 py-8 block px-3 m-4">
            <h2 className="sm:text-2xl  text-l py-4 text-left font-mono">
              {details.Name}
            </h2>
            <p className="text-left font-mono py-8 sm:text-xl text-sm font-xl">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sit et
              ratione rem!
            </p>
            <h3 className="font-bold sm:text-3xl text-left py-8">
              {details.Price}
            </h3>
            <div className="sm:flex  sm:justify-between">
              <div className="sm:flex  flex flex-row justify-center  align-middle gap-3">
                <button
                  onClick={() => {
                    setQuantity(quantity - 1);
                  }}
                  className="bg-black py-1 px-8 h-7 sm:h-12 text-white text-2xl ">
                  -
                </button>
                <h2 className="sm:text-2xl text-sm font-bold py-1 sm:py-3">
                  {quantity}
                </h2>
                <button
                  onClick={() => {
                    setQuantity(quantity + 1);
                  }}
                  className="bg-black py-1 px-8 sm:h-12 h-7 text-white sm:text-2xl ">
                  +
                </button>
              </div>
              <button
                onClick={() => {
                  let cart = localStorage.getItem("ladoche_shopping_cart");

                  let cart2 = JSON.parse(cart);
                  const detail = {
                    name: `${details.Name}`,
                    id: `${details.Id}`,
                    price: `${details.Price}`,
                    link: `${details.Link}`,
                    quantity: quantity,
                  };
                  const name = details.Name;
                  cart2.push({ name: detail });

                  try {
                    localStorage.removeItem("ladoche_shopping_cart");
                    localStorage.setItem(
                      "ladoche_shopping_cart",
                      JSON.stringify(cart2)
                    );
                    setShow(true);
                  } catch (err) {
                    console.log(err);
                  }
                }}
                className=" bg-black text-white  text-sm sm:text-xl my-1 sm:w-1/3  w-3/4 mx-auto font-bold py-1 px-3">
                Add To Cart
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="p-4 w-5/6 mx-auto ">
        <h2 className="font-bold sm:text-2xl text-l text-center">
          Rate This Product
        </h2>
        <div className="">
          <div className="sm:flex sm:space-y-0 my-6 py-4 justify-around space-y-4">
            <input
              type="text"
              placeholder="Enter your name"
              id=""
              className="sm:py-4 py-2 px-5 border-2 text-xm sm:text-xl text-center"
            />
            <input
              type="text"
              placeholder="Enter your email"
              id=""
              className="sm:py-4 py-2 px-5 border-2 text-xm sm:text-xl text-center"
            />
          </div>
          <div className=" sm:flex sm:justify-around my-7 py-3">
            <textarea
              rows={6}
              className="sm:py-4 py-2 px-5 border-2 text-xm sm:text-xl text-center"
              placeholder="Enter your comment"
            />
            <div className=" py-4">
              <h2 className="my-4 py-3">Stars Rating</h2>
              <div className="flex sm:space-x-4 space-x-2">
                <span
                  className="rounded-full border-2 text-center p-2 sm:py-4 sm:px-4  sm:w-16 sm:h-16 h-12 w-12  text-xl"
                  onClick={() => {
                    setRating(1);
                  }}>
                  1
                </span>
                <span
                  onClick={() => {
                    setRating(2);
                  }}
                  className="rounded-full border-2 text-center p-2 sm:py-4 sm:px-4  sm:w-16 sm:h-16 h-12 w-12  text-xl">
                  2
                </span>
                <span
                  onClick={() => {
                    setRating(3);
                  }}
                  className="rounded-full border-2 text-center p-2 sm:py-4 sm:px-4  sm:w-16 sm:h-16 h-12 w-12  text-xl">
                  3
                </span>
                <span
                  onClick={() => {
                    setRating(4);
                  }}
                  className="rounded-full border-2 text-center p-2 sm:py-4 sm:px-4  sm:w-16 sm:h-16 h-12 w-12  text-xl">
                  4
                </span>
                <span
                  onClick={() => {
                    setRating(5);
                  }}
                  className="rounded-full border-2 text-center p-2 sm:py-4 sm:px-4  sm:w-16 sm:h-16 h-12 w-12  text-xl">
                  5
                </span>
              </div>
            </div>
          </div>
          <div>
            <button
              className="sm:px-28 px-10 my-5 text-center  sm:text-xl text-xs text-white font-bold  sm:w-2/4 sm:py-4 py-3 bg-blue-400"
              onClick={handleRating}>
              Submit Rating
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

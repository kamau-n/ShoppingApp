import React, { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../config/config";
import TopNav from "../components/TopNav";
import Footer from "../components/Footer";

const mealsRef = collection(db, "Meals");

export default function ({ route, navigation }) {
  const { id } = useParams();
  const [details, setDetails] = useState({});
  const [quantity, setQuantity] = useState(1);
  const { state } = useLocation();
  console.log(state);

  useState(async () => {
    const docRef = doc(db, `${state.type}`, id);

    try {
      const docSnap = await getDoc(docRef);
      console.log(docSnap.data());
      setDetails(docSnap.data());
    } catch (error) {
      console.log(error);
    }
  });
  return (
    <div>
      <div className=" w-5/6 p-2 my-3 mx-auto  ">
        <TopNav />
        <div className=" my-5 mx-3 py-5  px-3 sm:flex  gap-5 ">
          <div className="basis-1/2 py-4 px-3 m-4">
            <img src={details.Link} alt="no image" />
          </div>
          <div className="basis-1/2 py-8 block px-3 m-4">
            <h2 className="text-2xl  py-4 text-left font-mono">
              {details.Name}
            </h2>
            <p className="text-left font-mono py-8 font-xl">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sit et
              ratione rem! Perspiciatis doloribus blanditiis non ratione error
              asperiores veritatis praesentium possimus, mollitia tempore
              adipisci at architecto laborum, sed sit.
            </p>
            <h3 className="font-bold text-3xl text-left py-8">
              {details.Price}
            </h3>
            <div className="flex justify-between">
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setQuantity(quantity - 1);
                  }}
                  className="bg-black py-1 px-4  text-white text-xl ">
                  -
                </button>
                <h2 className="text-2xl font-bold py-2">{quantity}</h2>
                <button
                  onClick={() => {
                    setQuantity(quantity + 1);
                  }}
                  className="bg-black py-1 px-4 text-white text-xl ">
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
                    alert("item added successfully");
                  } catch (err) {
                    console.log(err);
                  }
                }}
                className=" bg-black text-white text-xl  font-bold py-3 px-3">
                Add To Cart
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

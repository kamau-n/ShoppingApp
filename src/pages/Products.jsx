import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { collection, doc, getDoc } from "firebase/firestore";
import { db } from "../config/config";
import TopNav from "../components/TopNav";
import Footer from "../components/Footer";
import { Alert } from "@mui/material";
import { FaStar } from "react-icons/fa";

const mealsRef = collection(db, "Meals");

export default function ProductDetail() {
  const { id } = useParams();
  const [details, setDetails] = useState({});
  const [quantity, setQuantity] = useState(1);
  const { state } = useLocation();
  const [show, setShow] = useState(false);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  useEffect(() => {
    const docRef = doc(db, `${state?.type}`, id);
    getDoc(docRef)
      .then((res) => {
        setDetails(res.data());
      })
      .catch((error) => console.error(error));
  }, [id, state]);

  const handleRating = () => {
    alert(`You rated this product ${rating} stars`);
  };

  return (
    <div>
      <TopNav />
      <div className="w-5/6 p-6 my-6 mx-auto bg-white shadow-lg rounded-lg">
        {show && (
          <Alert severity="success" className="mb-4" onClose={() => setShow(false)}>
            Item has been added to the cart successfully
          </Alert>
        )}
        <div className="flex flex-col sm:flex-row gap-6">
          <div className="flex-1">
            <img
              src={details.Link}
              alt="Product"
              className=" h-96 object-cover rounded-lg"
            />
          </div>
          <div className="flex-1 space-y-4">
            <h2 className="text-3xl font-bold">{details.Name}</h2>
            <p className="text-gray-600">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            <h3 className="text-2xl font-bold text-green-600">${details.Price}</h3>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="bg-black text-white px-4 py-2 text-lg rounded"
              >
                -
              </button>
              <span className="text-xl font-semibold">{quantity}</span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="bg-black text-white px-4 py-2 text-lg rounded"
              >
                +
              </button>
            </div>
            <button
            
              onClick={
                ()=>{

                let cart = localStorage.getItem("ladoche_shopping_cart");
                let cart2 = JSON.parse(cart);
                const detail = {
                  name: details.Name,
                  id: details.Id,
                  price: details.Price,
                  link: details.Link,
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


                

                  

                }
              }

              className="bg-blue-600 text-white py-2 px-6 rounded text-lg font-bold hover:bg-blue-700"
            >
              Add To Cart
            </button>
          </div>
        </div>
      </div>
      <div className="w-5/6 mx-auto p-6 mt-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-center">Rate This Product</h2>
        <div className="mt-4 flex flex-col items-center space-y-4">
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <FaStar
                key={star}
                size={40}
                className="cursor-pointer transition"
                color={star <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
                onMouseEnter={() => setHover(star)}
                onMouseLeave={() => setHover(0)}
                onClick={() => setRating(star)}
              />
            ))}
          </div>
          <button
            className="bg-green-500 text-white px-6 py-3 rounded-lg text-lg font-bold hover:bg-green-600"
            onClick={handleRating}
          >
            Submit Rating
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

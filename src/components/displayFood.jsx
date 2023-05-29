import React from "react";
import { useNavigate } from "react-router-dom";

export default function ({ data, type, navigation }) {
  const navigate = useNavigate();
  console.log("type is " + type);

  return (
    <div className="grid grid-col-2  md:grid-cols-2  lg:grid-cols-4 rounded-md  bg-slate-200 sm:space-y-0 space-y-8   px-2 py-7 gap-4">
      {data.map((product) => (
        <div
          className="sm:mx-4 border-2 sm:rounded-md  shadow-xl bg-white  "
          key={product.id}
          onClick={() => {
            navigate(`/product/${product.id}`, { state: { type: type } });
          }}>
          <img
            src={product.Link}
            alt=""
            className="w-2/3 mx-auto m-2 py-3 rounded-full h-52"
          />
          <h2 className="font-mono px-2 text-xl py-3">{product.Name}</h2>
          <div className="flex  flex-row-reverse my-3 mx-5 p-3 justify-between">
            <h2 className="p-3 sm:text-xl  text-xs font-bold">
              KSH: {product.Price}
            </h2>
            <button className="font-bold text-white sm:text-l text-xs sm:px-5 px-3 sm:py-2 py-0 bg-blue-700 rounded">
              add to cart
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

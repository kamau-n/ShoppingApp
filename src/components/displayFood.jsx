import React from "react";
import { useNavigate } from "react-router-dom";

export default function ({ data, type, navigation }) {
  const navigate = useNavigate();
  console.log("type is " + type);

  return (
    <div className="sm:grid grid-cols-4 gap-4">
      {data.map((product) => (
        <div
          className="mx-4 border-2 rounded-sm "
          key={product.id}
          onClick={() => {
            navigate(`/product/${product.id}`, { state: { type: type } });
          }}>
          <img src={product.Link} alt="" className="w-full h-48" />
          <h2 className="font-mono px-2 py-3">{product.Name}</h2>
          <div className="flex my-3 mx-5 p-3 justify-between">
            <h2 className="p-3 text-xl font-bold">{product.Price}</h2>
            <button className="font-bold text-white px-5 sm:py-2 py-1 bg-blue-700 rounded">
              add
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

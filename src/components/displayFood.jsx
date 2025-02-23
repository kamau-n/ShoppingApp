


import React from "react";
import { useNavigate } from "react-router-dom";

export default function ProductGrid({ data, type }) {
  const navigate = useNavigate();
  console.log("type is " + type);

 return (
    <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 p-8">
      {data.map((product) => (
        <div
          key={product.id}
          className="group relative bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
          onClick={() => navigate(`/product/${product?.id}`, { state: { product } })}
        >
          {/* Image Container */}
          <div className="aspect-square overflow-hidden bg-gray-50">
            <img
              src={product?.Link}
              alt={product?.Name}
              className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500 ease-out"
            />
          </div>

          {/* Product Info */}
          <div className="p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2 min-h-[3.5rem]">
              {product?.Name}
            </h2>
            
            <div className="flex items-center justify-between mt-4">
              <div className="flex flex-col">
                <span className="text-sm text-gray-500">Price</span>
                <span className="text-xl font-bold text-gray-900">
                  KSH {product?.Price?.toLocaleString()}
                </span>
              </div>
              
              <button 
                className="relative overflow-hidden bg-blue-600 text-white px-6 py-2.5 rounded-lg font-medium
                  transform transition-all duration-300 hover:bg-blue-700 active:scale-95
                  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                onClick={(e) => {
                  e.stopPropagation();
                  // Add to cart logic here
                }}
              >
                Add to Cart
              </button>
            </div>
          </div>

          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-5 transition-all duration-300 pointer-events-none" />
        </div>
      ))}
    </div>
  );
}


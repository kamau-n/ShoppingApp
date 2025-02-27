import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingCart, ImageOff, PackageSearch } from 'lucide-react';

export default function ProductGrid({ data, type }) {
  const navigate = useNavigate();
  const [loadingImages, setLoadingImages] = useState({});
  const [failedImages, setFailedImages] = useState({});

  const handleImageLoad = (productId) => {
    setLoadingImages(prev => ({ ...prev, [productId]: false }));
  };

  const handleImageError = (productId) => {
    setFailedImages(prev => ({ ...prev, [productId]: true }));
    setLoadingImages(prev => ({ ...prev, [productId]: false }));
  };

  if (!data || data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center">
        <PackageSearch className="w-16 h-16 text-gray-400 mb-4" />
        <h3 className="text-xl font-semibold text-gray-900 mb-2">No Products Found</h3>
        <p className="text-gray-600">We couldn't find any products in this category.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 p-4 sm:p-6">
      {data.map((product) => (
        <div
          key={product.id}
          className="group relative bg-white rounded-2xl shadow-sm border border-gray-200 hover:shadow-lg hover:border-gray-300 transition-all duration-300 overflow-hidden"
          onClick={() => navigate(`/product/${product?.id}`, { state: { product } })}
        >
          {/* Image Container */}
          <div className="aspect-square overflow-hidden bg-gray-100 relative">
            {!failedImages[product.id] ? (
              <>
                {loadingImages[product.id] !== false && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                    <div className="w-8 h-8 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin" />
                  </div>
                )}
                <img
                  src={product?.Link || "/placeholder.svg"}
                  alt={product?.Name}
                  className={`w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out ${
                    loadingImages[product.id] !== false ? 'opacity-0' : 'opacity-100'
                  }`}
                  onLoad={() => handleImageLoad(product.id)}
                  onError={() => handleImageError(product.id)}
                />
              </>
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-100 text-gray-400">
                <ImageOff className="w-8 h-8 mb-2" />
                <span className="text-sm">Image not available</span>
              </div>
            )}
            
            {/* Quick View Overlay */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <span className="text-white font-medium px-4 py-2 bg-black/50 rounded-lg backdrop-blur-sm transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                Quick View
              </span>
            </div>
          </div>

          {/* Product Info */}
          <div className="p-4 sm:p-6">
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-gray-900 mb-1.5 line-clamp-2 min-h-[3.5rem] group-hover:text-blue-600 transition-colors duration-200">
                {product?.Name}
              </h2>
              <p className="text-sm text-gray-500 line-clamp-2">
                {product?.Description || `${type} Category`}
              </p>
            </div>
            
            <div className="flex items-end justify-between gap-4">
              <div className="flex flex-col">
                <span className="text-sm font-medium text-gray-500">Price</span>
                <span className="text-xl font-bold text-gray-900">
                  KSH {product?.Price?.toLocaleString()}
                </span>
              </div>
              
              <button 
                className="relative inline-flex items-center justify-center bg-blue-600 text-white px-4 py-2.5 rounded-xl font-medium
                  transform transition-all duration-200 hover:bg-blue-700 active:scale-95 select-none
                  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                onClick={(e) => {
                  e.stopPropagation();
                  // Add to cart animation
                  const button = e.currentTarget;
                  button.classList.add('animate-press');
                  setTimeout(() => button.classList.remove('animate-press'), 200);
                }}
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                <span>Add</span>
              </button>
            </div>
          </div>

          {/* Status Tags (if needed) */}
          {product?.status && (
            <div className="absolute top-4 left-4">
              <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                {product.status}
              </span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { collection, doc, getDoc } from "firebase/firestore";
import { db } from "../config/config";
import TopNav from "../components/TopNav";
import Footer from "../components/Footer";
import { Star, Minus, Plus, ShoppingCart, ImageOff, Loader2 } from 'lucide-react';

const mealsRef = collection(db, "Meals");

export default function ProductDetail() {
  const { id } = useParams();
  const [details, setDetails] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { state } = useLocation();
  const [showAlert, setShowAlert] = useState(false);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const productId = state?.product.id;

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const docRef = doc(db, "Product", productId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setDetails(docSnap.data());
        } else {
          setError("Product not found");
        }
      } catch (error) {
        setError("Failed to load product details");
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProductDetails();
  }, [productId]);

  const handleAddToCart = () => {
    try {
      let cart = localStorage.getItem("ladoche_shopping_cart");
      let cart2 = JSON.parse(cart);
      const detail = {
        name: details.Name,
        id: details.id,
        price: details.Price,
        link: details.Link,
        quantity: quantity,
      };

      cart2.push({ name: detail });
      localStorage.removeItem("ladoche_shopping_cart");
      localStorage.setItem("ladoche_shopping_cart", JSON.stringify(cart2));
      
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
    } catch (err) {
      console.error(err);
    }
  };

  const handleRating = () => {
    alert(`Thank you for rating this product ${rating} stars!`);
    // Add your rating submission logic here
  };

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <TopNav />
        <div className="flex items-center justify-center h-[60vh]">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen">
        <TopNav />
        <div className="flex flex-col items-center justify-center h-[60vh] px-4">
          <div className="text-red-500 text-xl font-semibold mb-4">{error}</div>
          <button
            onClick={() => window.history.back()}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go Back
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <TopNav />
      
      {/* Alert */}
      <div className={`fixed top-4 right-4 transition-transform duration-300 transform ${
        showAlert ? 'translate-y-0' : '-translate-y-full'
      }`}>
        <div className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center">
          <Star className="w-5 h-5 mr-2" />
          <span>Added to cart successfully!</span>
        </div>
      </div>

      <main className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="grid md:grid-cols-2 gap-8 p-6 md:p-8">
            {/* Image Section */}
            <div className="space-y-4">
              <div className="aspect-square relative rounded-xl overflow-hidden bg-gray-100">
                {!imageLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
                  </div>
                )}
                {details?.Link ? (
                  <img
                    src={details.Link || "/placeholder.svg"}
                    alt={details.Name}
                    className={`w-full h-full object-cover transition-opacity duration-300 ${
                      imageLoaded ? 'opacity-100' : 'opacity-0'
                    }`}
                    onLoad={() => setImageLoaded(true)}
                    onError={(e) => {
                      e.target.onerror = null;
                      setImageLoaded(true);
                    }}
                  />
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400">
                    <ImageOff className="w-12 h-12 mb-2" />
                    <span>No image available</span>
                  </div>
                )}
              </div>
            </div>

            {/* Product Details Section */}
            <div className="flex flex-col space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{details?.Name}</h1>
                <p className="text-gray-600 leading-relaxed">{details?.Description}</p>
              </div>

              <div className="space-y-6">
                <div className="flex flex-col space-y-2">
                  <span className="text-sm font-medium text-gray-500">Price</span>
                  <span className="text-3xl font-bold text-gray-900">
                    KSH {details?.Price?.toLocaleString()}
                  </span>
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-medium text-gray-500">Quantity</label>
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="p-2 rounded-lg border border-gray-300 hover:border-gray-400 transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-5 h-5" />
                    </button>
                    <span className="text-xl font-semibold min-w-[2.5rem] text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity((q) => q + 1)}
                      className="p-2 rounded-lg border border-gray-300 hover:border-gray-400 transition-colors"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <button
                  onClick={handleAddToCart}
                  className="w-full flex items-center justify-center space-x-2 bg-blue-600 text-white py-3 px-6 rounded-xl text-lg font-semibold hover:bg-blue-700 transform transition-all duration-200 active:scale-95"
                >
                  <ShoppingCart className="w-5 h-5" />
                  <span>Add to Cart</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Rating Section */}
        <div className="mt-8 bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Rate This Product</h2>
            <div className="space-y-6">
              <div className="flex justify-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    className="p-1 transition-transform hover:scale-110"
                    onMouseEnter={() => setHover(star)}
                    onMouseLeave={() => setHover(0)}
                    onClick={() => setRating(star)}
                    aria-label={`Rate ${star} stars`}
                  >
                    <Star
                      className={`w-8 h-8 ${
                        star <= (hover || rating)
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  </button>
                ))}
              </div>
              <button
                className="bg-blue-600 text-white px-8 py-3 rounded-xl text-lg font-semibold hover:bg-blue-700 transition-colors"
                onClick={handleRating}
                disabled={!rating}
              >
                Submit Rating
              </button>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
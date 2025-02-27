import React, { useState, useEffect } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { useLocation } from "react-router-dom";
import { db } from "../config/config";
import DisplayFood from "../components/displayFood";
import TopNav from "../components/TopNav";
import Footer from "../components/Footer";
import { Loader2, PackageSearch, AlertCircle } from 'lucide-react';

const Product = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { state } = useLocation();
  const selectedCategory = state?.type;

  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const q = query(
        collection(db, "Product"),
        where("Category", "==", selectedCategory)
      );
      
      const querySnapshot = await getDocs(q);
      const products = querySnapshot.docs.map((doc) => ({ 
        id: doc.id, 
        ...doc.data() 
      }));
      
      setData(products);
    } catch (error) {
      console.error("Error fetching products:", error);
      setError("Failed to load products. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <TopNav />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 text-center mb-2">
            {selectedCategory || "Products"}
          </h1>
          <p className="text-gray-600 text-center">
            Browse our selection of {selectedCategory?.toLowerCase() || "items"}
          </p>
        </div>

        {/* Content Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          {isLoading ? (
            // Loading State
            <div className="flex flex-col items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-blue-600 mb-4" />
              <p className="text-gray-600">Loading products...</p>
            </div>
          ) : error ? (
            // Error State
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Oops! Something went wrong
              </h3>
              <p className="text-gray-600 mb-4">{error}</p>
              <button
                onClick={fetchProducts}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Try Again
              </button>
            </div>
          ) : data.length === 0 ? (
            // Empty State
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <PackageSearch className="h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No products found
              </h3>
              <p className="text-gray-600">
                We couldn't find any products in this category.
              </p>
            </div>
          ) : (
            // Products Grid
            <div className="grid gap-6">
              <div className="border-b border-gray-200 pb-4 mb-4">
                <h2 className="text-lg font-semibold text-gray-900">
                  Available Items
                  <span className="ml-2 text-sm font-normal text-gray-500">
                    ({data.length} items)
                  </span>
                </h2>
              </div>
              <DisplayFood data={data} type="Meals" />
            </div>
          )}
        </div>
      </main>

      {/* Scroll to Top Button - Shows when scrolling down */}
      <ScrollToTopButton />

      <Footer />
    </div>
  );
};

// Scroll to Top Button Component
const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      className={`fixed right-6 bottom-6 p-3 rounded-full bg-blue-600 text-white shadow-lg transition-all duration-300 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
      }`}
      onClick={scrollToTop}
      aria-label="Scroll to top"
    >
      <svg
        className="w-6 h-6"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path d="M5 15l7-7 7 7" />
      </svg>
    </button>
  );
};

export default Product;
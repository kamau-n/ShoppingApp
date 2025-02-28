import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import SimpleSlider from "../components/SimpleSlider";
import { ShoppingCart, Star, ChevronRight } from "lucide-react";
import TopNav from "../components/TopNav";
import Footer from "../components/Footer";
import { db } from "../config/config";
import {
  collection,
  getDocs,
} from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Advertiser from "../components/advertiser";

const auth = getAuth();

export default function Home() {
  const drinkCollection = collection(db, "Fmeals");
  const mealCollection = collection(db, "Fdrinks");
  const productsCollection = collection(db, "ProductsCategory");
  const [fMeals, setFmeals] = useState([]);
  const [fDrinks, setDrinks] = useState([]);
  const [logged, setLogged] = useState(false);
  const [proCategory, setProCategory] = useState([]);
  const type = "Fmeals";
  const navigate = useNavigate();

  const fetchFeatured = async () => {
    const data = await getDocs(drinkCollection);
    setFmeals(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  const fetchProducts = async () => {
    const data = await getDocs(productsCollection);
    setProCategory(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    console.log(proCategory);

  };

  useEffect(() => {
    fetchFeatured();
    fetchProducts();
    
    onAuthStateChanged(auth, (user) => {
      setLogged(!!user);
    });

    if (!localStorage.getItem("ladoche_shopping_cart")) {
      localStorage.setItem("ladoche_shopping_cart", "[]");
    }
  }, []);


  return (
    <div className="min-h-screen bg-gray-50">
      <TopNav logged={logged} />
      
      <main className="mx-8 sm:mx-16 md:mx32 px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="mb-12">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <Advertiser />
          </div>
        </div>

        {/* Categories Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Our Categories</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-6">
            {proCategory.map((category, index) => (
              <div
                key={index}
                onClick={() => navigate("/product", { state: { type: category.id } })}
                className="group relative h-64 overflow-hidden rounded-2xl cursor-pointer transform transition-all duration-300 hover:-translate-y-1"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{
                    backgroundImage: `url(${category.image})`
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-2xl font-bold text-white mb-2">{category.name}</h3>
                  <button className="flex items-center text-sm font-medium text-white bg-blue-600/90 hover:bg-blue-700 transition-colors px-4 py-2 rounded-lg">
                    Shop Now
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Featured Meals Section */}
        {/* <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Featured Meals</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {fMeals.map((product) => (
              <div
                key={product.id}
                className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden"
                onClick={() => navigate(`/product/${product.id}`, { state: { type } })}
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={product.Link}
                    alt={product.Name}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-semibold text-lg text-gray-900 mb-2 line-clamp-2">
                    {product.Name}
                  </h3>
                  <div className="flex items-center justify-between">
                    <p className="text-xl font-bold text-gray-900">
                      KSH {product.Price.toLocaleString()}
                    </p>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        // Add to cart logic
                      }}
                      className="flex items-center space-x-1 bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <ShoppingCart className="h-4 w-4" />
                      <span>Add</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section> */}

        {/* Reviews Section */}
        <section className="bg-white rounded-2xl shadow-lg p-8 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Customer Reviews</h2>
          {/* <Review /> */}
        </section>
      </main>

      <Footer />
    </div>
  );
}
"use client";

import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  collection,
  query,
  where,
  getDocs,
  orderBy,
  limit,
} from "firebase/firestore";
import { db } from "../config/config";
import TopNav from "../components/TopNav";
import Footer from "../components/Footer";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import BsTopNav from "../components/layout/BsTopNav";

const BusinessProducts = () => {
  const { businessUrl } = useParams();
  const [products, setProducts] = useState([]);
  const [business, setBusiness] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categoryData, setCategories] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  console.log("business_url", businessUrl);

  useEffect(() => {
    const fetchBusinessAndProducts = async () => {
      try {
        setLoading(true);
        // First get the business profile
        const businessRef = collection(db, "business_profiles");
        const businessQuery = query(
          businessRef,
          where("business_url", "==", businessUrl)
        );
        const businessSnapshot = await getDocs(businessQuery);

        if (businessSnapshot.empty) {
          // setError("Business not found");
          // setLoading(false);
          return;
        }

        const businessDoc = businessSnapshot.docs[0];
        const businessId = businessDoc.id;
        const businessData = {
          id: businessId,
          ...businessDoc.data(),
        };

        setBusiness(businessData);

        // fetch their categories
        const catRef = collection(db, "ProductsCategory");
        const catQuery = query(
          catRef,
          where("owner", "==", businessData.user_id)
        );

        const catSnapSnapshot = await getDocs(catQuery);
        const catData = catSnapSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setCategories(catData);
        console.log("this are my categories", catData);

        const categoryIds = categoryData.map((cat) => cat.id);

        console.log("this are the category ids", categoryIds);

        // Get featured products
        const featuredProductsRef = collection(db, "Product");
        const featuredProductsQuery = query(
          featuredProductsRef,
          where("Category", "in", categoryIds),
          where("featured", "==", true)
        );

        const featuredProductsSnapshot = await getDocs(featuredProductsQuery);
        const featuredProductsData = featuredProductsSnapshot.docs.map(
          (doc) => ({
            id: doc.id,
            ...doc.data(),
          })
        );
        console.log("this are the featured products", featuredProductsData);

        setFeaturedProducts(featuredProductsData);

        // Get top products
        const productsRef = collection(db, "Product");
        const productsQuery = query(
          productsRef,
          where("Category", "in", categoryIds),
          limit(10)
        );
        const productsSnapshot = await getDocs(productsQuery);

        const productsData = productsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        console.log("this are the products", productsData);
        setProducts(productsData);

        console.log("this are the set Products", products);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching business data:", error);
        // setError("Failed to load business products");
        // setLoading(false);
      }
    };

    fetchBusinessAndProducts();
  }, [businessUrl]);

  const nextSlide = () => {
    setCurrentSlide((prev) =>
      prev === (featuredProducts.length - 1 || 0) ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? featuredProducts.length - 1 || 0 : prev - 1
    );
  };

  // Sample featured products if none from Firebase
  const displayFeaturedProducts = featuredProducts;

  // Sample products if none from Firebase
  const displayProducts = products;

  // if (loading) {
  //   return (
  //     <div className="min-h-screen">
  //       <TopNav />
  //       <div className="flex items-center justify-center h-[60vh]">
  //         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
  //       </div>
  //       <Footer />
  //     </div>
  //   );
  // }

  // setError(false);
  // setLoading(false);

  if (error) {
    return (
      <div className="min-h-screen">
        <BsTopNav title={"aluta"} />
        <div className="flex flex-col items-center justify-center h-[60vh]">
          <div className="text-red-500 text-xl font-semibold mb-4">{error}</div>
          <button
            onClick={() => navigate("/")}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Return to Home
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  // Business info with fallbacks
  const businessInfo = {
    business_name: business?.business_name || "Business Name",
    tagline: business?.tagline || "Best deals online",
    logo: business?.logo || "",
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <BsTopNav title={"Book Shelve"} />

      <main className="container mx-auto px-4 py-6">
        {/* Hero Banner / Carousel */}
        <div className="relative mb-8 overflow-hidden rounded-lg">
          <div className="relative bg-indigo-900 rounded-lg overflow-hidden">
            <button
              onClick={prevSlide}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-md">
              <ChevronLeft className="h-6 w-6 text-indigo-900" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-md">
              <ChevronRight className="h-6 w-6 text-indigo-900" />
            </button>

            <div className="flex items-center p-8 md:p-12">
              <div className="w-full md:w-1/2 text-white">
                <p className="text-sm md:text-base mb-2">
                  {displayFeaturedProducts[currentSlide]?.Description ||
                    "Best Deal Online on smart watches"}
                </p>
                <h2 className="text-3xl md:text-4xl font-bold mb-3">
                  {displayFeaturedProducts[currentSlide]?.tagline ||
                    "SMART WEARABLE."}
                </h2>
                <p className="text-xl font-medium mb-6">
                  {displayFeaturedProducts[currentSlide]?.discountText ||
                    "UP to 80% OFF"}
                </p>
                <div className="flex space-x-2">
                  {[...Array(displayFeaturedProducts.length || 1)].map(
                    (_, i) => (
                      <div
                        key={i}
                        className={`h-2 w-2 rounded-full ${
                          i === currentSlide ? "bg-white" : "bg-white/40"
                        }`}></div>
                    )
                  )}
                </div>
              </div>
              <div className="hidden md:block md:w-1/2">
                <img
                  src={
                    displayFeaturedProducts[currentSlide]?.Link ||
                    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-2Cw6uA18BN2NyiO0dRS5MBALMy7Gbw.png"
                  }
                  alt={
                    displayFeaturedProducts[currentSlide]?.Name ||
                    "Featured Product"
                  }
                  className="max-h-64 mx-auto object-contain"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Top Products Section */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium">
              Grab the best deal on{" "}
              <span className="text-blue-600 font-semibold">
                {categoryData[0]?.name ||
                  business?.featured_category ||
                  "Products"}
              </span>
            </h2>
            <button
              onClick={() => navigate(`/business/${businessUrl}/products`)}
              className="text-blue-600 text-sm font-medium">
              View All
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {displayProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow-sm p-4 cursor-pointer"
                onClick={() => navigate(`/product/${product.id}`)}>
                <div className="relative">
                  <div className="absolute top-0 right-0 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded">
                    {product.discount}% OFF
                  </div>
                  <div className="h-40 flex items-center justify-center mb-3">
                    <img
                      src={
                        product.Link || "/placeholder.svg?height=160&width=120"
                      }
                      alt={product.Name}
                      className="max-h-full object-contain"
                    />
                  </div>
                </div>
                <h3 className="text-sm font-medium text-gray-900 line-clamp-2 mb-1">
                  {product.Name}
                </h3>
                <div className="flex items-center space-x-2 mb-1">
                  <span className="font-bold">{product.Price}</span>
                  <span className="text-gray-500 text-xs line-through">
                    {product.Price}
                  </span>
                </div>
                {/* <p className="text-green-600 text-xs font-medium">
                  Save - {product.savings}
                </p> */}
              </div>
            ))}
          </div>
        </section>

        {/* Categories Section */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium">
              Shop From{" "}
              <span className="text-blue-600 font-semibold">
                Top Categories
              </span>
            </h2>
            <button
              onClick={() => navigate(`/business/${businessUrl}/categories`)}
              className="text-blue-600 text-sm font-medium">
              View All
            </button>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-4">
            {categoryData.length > 0
              ? categoryData.map((category) => (
                  <div
                    key={category.id}
                    className="flex flex-col items-center cursor-pointer"
                    onClick={() =>
                      navigate(
                        `/business/${businessUrl}/category/${category.id}`
                      )
                    }>
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border border-gray-200 bg-white flex items-center justify-center mb-2 overflow-hidden">
                      {category.image ? (
                        <img
                          src={category.image || "/placeholder.svg"}
                          alt={category.name}
                          className="w-10 h-10 md:w-12 md:h-12 object-contain"
                        />
                      ) : (
                        <div className="w-10 h-10 md:w-12 md:h-12 bg-gray-200 rounded-full"></div>
                      )}
                    </div>
                    <span className="text-xs text-center">{category.name}</span>
                  </div>
                ))
              : [
                  { id: 1, name: "Mobile" },
                  { id: 2, name: "Cosmetics" },
                  { id: 3, name: "Electronics" },
                  { id: 4, name: "Furniture" },
                  { id: 5, name: "Watches" },
                  { id: 6, name: "Decor" },
                  { id: 7, name: "Accessories" },
                ].map((category) => (
                  <div
                    key={category.id}
                    className="flex flex-col items-center cursor-pointer"
                    onClick={() =>
                      navigate(
                        `/business/${businessUrl}/category/${category.id}`
                      )
                    }>
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border border-gray-200 bg-white flex items-center justify-center mb-2">
                      <div className="w-10 h-10 md:w-12 md:h-12 bg-gray-200 rounded-full"></div>
                    </div>
                    <span className="text-xs text-center">{category.name}</span>
                  </div>
                ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default BusinessProducts;

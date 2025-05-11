"use client";

import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  Star,
  ShoppingBag,
  Heart,
  ArrowRight,
  Search,
} from "lucide-react";
import { collection, query, where, getDocs, limit } from "firebase/firestore";
import { db } from "../config/config";
import BsTopNav from "../components/layout/BsTopNav";

const BusinessProducts = () => {
  const { businessUrl } = useParams();
  const navigate = useNavigate();

  const [currentSlide, setCurrentSlide] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [business, setBusiness] = useState(null);
  const [categories, setCategories] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [products, setProducts] = useState([]);

  // Autoplay for slider
  useEffect(() => {
    if (!autoplay || featuredProducts.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) =>
        prev === featuredProducts.length - 1 ? 0 : prev + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [autoplay, featuredProducts.length]);

  // Pause autoplay when hovering over slider
  const handleSliderHover = (isHovering) => {
    setAutoplay(!isHovering);
  };

  const nextSlide = () => {
    if (featuredProducts.length <= 1) return;
    setCurrentSlide((prev) =>
      prev === featuredProducts.length - 1 ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    if (featuredProducts.length <= 1) return;
    setCurrentSlide((prev) =>
      prev === 0 ? featuredProducts.length - 1 : prev - 1
    );
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  // Fetch data from Firestore
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
          setError("Business not found");
          setLoading(false);
          return;
        }

        const businessDoc = businessSnapshot.docs[0];
        const businessId = businessDoc.id;
        const businessData = {
          id: businessId,
          ...businessDoc.data(),
        };

        setBusiness(businessData);

        console.log("this is my business fetched", businessData);

        // Fetch categories
        const catRef = collection(db, "ProductsCategory");
        const catQuery = query(
          catRef,
          where("owner", "==", businessData.user_id)
        );

        const catSnapshot = await getDocs(catQuery);
        const catData = catSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setCategories(catData);

        // Get category IDs for product queries
        const categoryIds = catData.map((cat) => cat.id);

        if (categoryIds.length > 0) {
          // Get featured products
          const featuredProductsRef = collection(db, "Product");
          const featuredProductsQuery = query(
            featuredProductsRef,
            where("Category", "in", categoryIds),
            where("featured", "==", true),
            limit(5) // Limit to 5 featured products
          );

          const featuredProductsSnapshot = await getDocs(featuredProductsQuery);
          const featuredProductsData = featuredProductsSnapshot.docs.map(
            (doc) => ({
              id: doc.id,
              ...doc.data(),
            })
          );

          setFeaturedProducts(featuredProductsData);

          // Get regular products
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

          setProducts(productsData);
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching business data:", error);
        setError("Failed to load business products");
        setLoading(false);
      }
    };

    if (businessUrl) {
      fetchBusinessAndProducts();
    }
  }, [businessUrl]);

  if (loading) {
    return (
      <div className="min-h-screen">
        <BsTopNav title={"My Shop"} />
        <div className="flex items-center justify-center h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
        {/* <Footer /> */}
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen">
        <BsTopNav title={business.business_name} />
        <div className="flex flex-col items-center justify-center h-[60vh]">
          <div className="text-red-500 text-xl font-semibold mb-4">{error}</div>
          <button
            onClick={() => navigate("/")}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Return to Home
          </button>
        </div>
        {/* <Footer /> */}
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
      <BsTopNav title={business.business_name || "My Shop"} />

      <main className="container mx-auto px-4 py-8">
        {/* Hero Slider Section */}
        <section
          className="mb-12 relative overflow-hidden rounded-2xl shadow-lg"
          onMouseEnter={() => handleSliderHover(true)}
          onMouseLeave={() => handleSliderHover(false)}>
          <div className="relative h-[400px] md:h-[500px]">
            {featuredProducts.length > 0 ? (
              featuredProducts.map((product, index) => (
                <div
                  key={product.id}
                  className={`absolute inset-0 transition-opacity duration-500 ${
                    index === currentSlide
                      ? "opacity-100"
                      : "opacity-0 pointer-events-none"
                  }`}>
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-transparent z-10"></div>
                  <div className="relative h-full w-full">
                    <img
                      src={
                        product.Link || "/placeholder.svg?height=500&width=800"
                      }
                      alt={product.Name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="absolute inset-0 z-20 flex items-center">
                    <div className="container mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-8">
                      <div className="text-white space-y-4">
                        <span className="inline-block bg-white/10 backdrop-blur-sm text-white border-none px-2 py-1 text-xs font-semibold rounded">
                          {product.featured ? "Featured" : "New Arrival"}
                        </span>
                        <h2 className="text-sm font-medium tracking-widest">
                          {product.tagline || "PREMIUM PRODUCT"}
                        </h2>
                        <h1 className="text-4xl md:text-5xl font-bold">
                          {product.Name}
                        </h1>
                        <p className="text-lg text-gray-200">
                          {product.Description || "Experience the best quality"}
                        </p>
                        <div className="flex items-center space-x-4">
                          <span className="text-3xl font-bold">
                            ${product.Price}
                          </span>
                          {product.originalPrice && (
                            <span className="text-xl text-gray-300 line-through">
                              ${product.originalPrice}
                            </span>
                          )}
                          {product.discount && (
                            <span className="bg-red-500 text-white px-2 py-1 text-xs font-semibold rounded">
                              {product.discount}% OFF
                            </span>
                          )}
                        </div>
                        <div className="pt-2 flex space-x-3">
                          <button
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center transition-colors"
                            onClick={() => navigate(`/product/${product.id}`)}>
                            <ShoppingBag className="mr-2 h-4 w-4" /> Shop Now
                          </button>
                          <button
                            className="border border-white text-white px-4 py-2 rounded-lg flex items-center hover:bg-white/10 transition-colors"
                            onClick={() => navigate(`/product/${product.id}`)}>
                            Learn More
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              // Fallback if no featured products
              <div className="absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-transparent z-10"></div>
                <div className="relative h-full w-full bg-gray-800">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <img
                      src="/placeholder.svg?height=500&width=800"
                      alt="Featured Products"
                      className="h-full w-full object-cover opacity-50"
                    />
                  </div>
                </div>
                <div className="absolute inset-0 z-20 flex items-center">
                  <div className="container mx-auto px-6 md:px-12">
                    <div className="text-white space-y-4 max-w-2xl">
                      <span className="inline-block bg-white/10 backdrop-blur-sm text-white border-none px-2 py-1 text-xs font-semibold rounded">
                        Welcome
                      </span>
                      <h2 className="text-sm font-medium tracking-widest">
                        {businessInfo.tagline}
                      </h2>
                      <h1 className="text-4xl md:text-5xl font-bold">
                        {businessInfo.business_name}
                      </h1>
                      <p className="text-lg text-gray-200">
                        Discover our amazing products and exclusive deals
                      </p>
                      <div className="pt-2 flex space-x-3">
                        <button
                          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center transition-colors"
                          onClick={() =>
                            navigate(`/business/${businessUrl}/products`)
                          }>
                          <ShoppingBag className="mr-2 h-4 w-4" /> Browse
                          Products
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Arrows - Only show if there are multiple featured products */}
            {featuredProducts.length > 1 && (
              <>
                <button
                  onClick={prevSlide}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 z-30 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all duration-200">
                  <ChevronLeft className="h-6 w-6 text-gray-800" />
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 z-30 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all duration-200">
                  <ChevronRight className="h-6 w-6 text-gray-800" />
                </button>

                {/* Slide Indicators */}
                <div className="absolute bottom-6 left-0 right-0 z-30 flex justify-center space-x-2">
                  {featuredProducts.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToSlide(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-200 ${
                        index === currentSlide
                          ? "bg-white scale-110"
                          : "bg-white/50 hover:bg-white/70"
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </section>

        {/* Categories Section */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Shop By Category</h2>
            <button
              onClick={() => navigate(`/business/${businessUrl}/categories`)}
              className="text-blue-600 flex items-center hover:underline">
              View All Categories <ArrowRight className="ml-1 h-4 w-4" />
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {categories.length > 0
              ? categories.map((category) => (
                  <div
                    key={category.id}
                    onClick={() =>
                      navigate("/product", { state: { type: category.id } })
                    }
                    className="group cursor-pointer">
                    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 p-4 flex flex-col items-center text-center">
                      <div className="relative w-16 h-16 mb-3 overflow-hidden rounded-full bg-gray-100 group-hover:scale-105 transition-transform duration-200">
                        <img
                          src={
                            category.image ||
                            "/placeholder.svg?height=80&width=80"
                          }
                          alt={category.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <h3 className="font-medium text-sm">{category.name}</h3>
                      <p className="text-xs text-gray-500 mt-1">
                        {category.productCount || "Browse products"}
                      </p>
                    </div>
                  </div>
                ))
              : // Fallback categories if none from Firebase
                [
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
                    onClick={() =>
                      navigate(
                        `/business/${businessUrl}/category/${category.id}`
                      )
                    }
                    className="group cursor-pointer">
                    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 p-4 flex flex-col items-center text-center">
                      <div className="relative w-16 h-16 mb-3 overflow-hidden rounded-full bg-gray-100 group-hover:scale-105 transition-transform duration-200">
                        <div className="w-full h-full bg-gray-200 rounded-full"></div>
                      </div>
                      <h3 className="font-medium text-sm">{category.name}</h3>
                      <p className="text-xs text-gray-500 mt-1">
                        Browse products
                      </p>
                    </div>
                  </div>
                ))}
          </div>
        </section>

        {/* Products Section */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">
              Grab the best deal on{" "}
              <span className="text-blue-600 font-semibold">
                {categories[0]?.name ||
                  business?.featured_category ||
                  "Products"}
              </span>
            </h2>
            <button
              onClick={() => navigate(`/business/${businessUrl}/products`)}
              className="text-blue-600 flex items-center hover:underline">
              View All <ArrowRight className="ml-1 h-4 w-4" />
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {products.length > 0 ? (
              products.map((product) => (
                <div
                  key={product.id}
                  className="group overflow-hidden border-0 shadow-sm hover:shadow-md transition-all duration-200 bg-white rounded-lg">
                  <div
                    className="cursor-pointer"
                    onClick={() => navigate(`/product/${product.id}`)}>
                    <div className="relative pt-4 px-4">
                      {product.discount && (
                        <span className="absolute top-2 right-2 z-10 bg-red-500 text-white px-2 py-1 text-xs font-semibold rounded">
                          {product.discount}% OFF
                        </span>
                      )}
                      <div className="absolute top-2 left-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <button className="rounded-full bg-white h-8 w-8 flex items-center justify-center border border-gray-200 hover:bg-gray-100">
                          <Heart className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="h-48 flex items-center justify-center mb-3 relative overflow-hidden">
                        <img
                          src={
                            product.Link ||
                            "/placeholder.svg?height=200&width=200"
                          }
                          alt={product.Name}
                          className="max-h-full object-contain group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    </div>
                    <div className="p-4 pt-0">
                      <h3 className="font-medium text-sm line-clamp-2 mb-1 group-hover:text-blue-600 transition-colors duration-200">
                        {product.Name}
                      </h3>
                      <div className="flex items-center space-x-1 mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3 h-3 ${
                              i < Math.floor(product.rating || 4)
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                        <span className="text-xs text-gray-500 ml-1">
                          ({product.reviews || "0"})
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="font-bold text-lg">
                            ${product.Price}
                          </span>
                          {product.originalPrice && (
                            <span className="text-gray-500 text-xs line-through ml-2">
                              ${product.originalPrice}
                            </span>
                          )}
                        </div>
                        <button
                          className="p-0 h-8 w-8 rounded-full hover:bg-blue-100 flex items-center justify-center"
                          onClick={(e) => {
                            e.stopPropagation();
                            // Add to cart functionality
                          }}>
                          <ShoppingBag className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              // Show empty state or loading
              <div className="col-span-full text-center py-12">
                <p className="text-gray-500">No products found</p>
              </div>
            )}
          </div>

          {products.length > 0 && (
            <div className="mt-8 text-center">
              <button
                className="px-8 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
                onClick={() => navigate(`/business/${businessUrl}/products`)}>
                View All Products
              </button>
            </div>
          )}
        </section>

        {/* Special Offers Banner */}
        <section className="mb-12">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="relative h-64 rounded-xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-900 to-purple-600 z-0"></div>
              <div className="absolute inset-0 z-10 p-6 flex flex-col justify-center">
                <h3 className="text-white text-xl font-bold mb-2">
                  Featured Collection
                </h3>
                <p className="text-purple-100 mb-4">
                  Get up to {featuredProducts[0]?.discount || 50}% off on our
                  featured collection
                </p>
                <button
                  className="w-fit bg-white text-purple-900 hover:bg-purple-50 px-4 py-2 rounded-lg transition-colors"
                  onClick={() => navigate(`/business/${businessUrl}/featured`)}>
                  Shop Now
                </button>
              </div>
            </div>
            <div className="relative h-64 rounded-xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-teal-900 to-teal-600 z-0"></div>
              <div className="absolute inset-0 z-10 p-6 flex flex-col justify-center">
                <h3 className="text-white text-xl font-bold mb-2">
                  New Arrivals
                </h3>
                <p className="text-teal-100 mb-4">
                  Check out our latest products with special launch offers
                </p>
                <button
                  className="w-fit bg-white text-teal-900 hover:bg-teal-50 px-4 py-2 rounded-lg transition-colors"
                  onClick={() =>
                    navigate(`/business/${businessUrl}/new-arrivals`)
                  }>
                  Explore
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="mb-12 bg-gray-100 rounded-2xl p-8 md:p-12">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Subscribe to Our Newsletter
            </h2>
            <p className="text-gray-600 mb-6">
              Stay updated with {businessInfo.business_name || "My Shop"}'s
              latest products and exclusive offers
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* <Footer /> */}
    </div>
  );
};

export default BusinessProducts;

"use client";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ChevronRight,
  ShoppingCart,
  Star,
  TrendingUp,
  Award,
  Heart,
  Store,
  ShieldCheck,
  Users,
  BarChart,
} from "lucide-react";
import TopNav from "../components/TopNav";
import Footer from "../components/Footer";
import { db } from "../config/config";
import { collection, getDocs, query, limit, orderBy } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Advertiser from "../components/advertiser";
import BsTopNav from "../components/layout/BsTopNav";

const auth = getAuth();

export default function Home() {
  const [logged, setLogged] = useState(false);
  const [proCategory, setProCategory] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [topBusinesses, setTopBusinesses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const [bsProfiles, setBsProfiles] = useState([]);

  function fetchCategories() {
    const categories = [];
    const categoriesRef = collection(db, "ProductsCategory");

    getDocs(categoriesRef).then((querySnapshot) => {
      let cat = {};
      querySnapshot.forEach((doc) => {
        cat = doc.data();
        cat.id = doc.id;
        categories.push(cat);
      });
      setProCategory(categories);
      setIsLoading(false);
    });
  }

  function fetchFeaturedProducts() {
    const productsRef = collection(db, "Products");
    const featuredQuery = query(
      productsRef,
      orderBy("createdAt", "desc"),
      limit(5)
    );

    getDocs(featuredQuery).then((querySnapshot) => {
      const products = [];
      querySnapshot.forEach((doc) => {
        const product = doc.data();
        product.id = doc.id;
        products.push(product);
      });
      setFeaturedProducts(products);
    });
  }

  function fetchTopBusinesses() {
    const businessesRef = collection(db, "business_profiles");
    const topBusinessesQuery = query(businessesRef, limit(9));

    getDocs(topBusinessesQuery).then((querySnapshot) => {
      const businesses = [];
      querySnapshot.forEach((doc) => {
        const business = doc.data();
        business.id = doc.id;
        businesses.push(business);
      });

      console.log("this are the fetched businesses", businesses);
      setTopBusinesses(businesses);
    });
  }

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setLogged(!!user);
    });

    fetchCategories();
    fetchFeaturedProducts();
    fetchTopBusinesses();

    if (!localStorage.getItem("ladoche_shopping_cart")) {
      localStorage.setItem("ladoche_shopping_cart", "[]");
    }
  }, []);

  // Sample reviews data
  const reviews = [
    {
      id: 1,
      name: "Sarah Johnson",
      avatar: "",
      rating: 5,
      comment:
        "Absolutely love the quality of products! Fast delivery and excellent customer service.",
      date: "2 weeks ago",
    },
    {
      id: 2,
      name: "Michael Chen",
      avatar: "",
      rating: 4,
      comment:
        "Great selection and competitive prices. Will definitely shop here again.",
      date: "1 month ago",
    },
    {
      id: 3,
      name: "Amina Patel",
      avatar: "",
      rating: 5,
      comment:
        "The products exceeded my expectations. Very satisfied with my purchase!",
      date: "3 weeks ago",
    },
  ];

  // Sample business testimonials
  const businessTestimonials = [
    {
      id: 1,
      name: "John Smith",
      businessName: "Smith's Electronics",
      avatar: "",
      rating: 5,
      comment:
        "Since joining this platform, my sales have increased by 200%. The tools and visibility provided are exceptional!",
      date: "1 month ago",
    },
    {
      id: 2,
      name: "Maria Rodriguez",
      businessName: "Maria's Boutique",
      avatar: "",
      rating: 5,
      comment:
        "The platform is incredibly easy to use and has connected me with customers I never would have reached otherwise.",
      date: "3 weeks ago",
    },
    {
      id: 3,
      name: "David Ochieng",
      businessName: "Nairobi Crafts",
      avatar: "",
      rating: 4,
      comment:
        "The support team is amazing and the commission rates are very fair. Highly recommend for any business owner!",
      date: "2 weeks ago",
    },
  ];

  // Sample top businesses if none from Firebase

  const displayBusinesses = topBusinesses;

  const addToCart = (e, product) => {
    e.stopPropagation();
    const cart = JSON.parse(
      localStorage.getItem("ladoche_shopping_cart") || "[]"
    );
    const existingItem = cart.find((item) => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({
        id: product.id,
        name: product.Name,
        price: product.Price,
        image: product.Link,
        quantity: 1,
      });
    }

    localStorage.setItem("ladoche_shopping_cart", JSON.stringify(cart));
    alert("Product added to cart!");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <BsTopNav title={"My Shop"} />

      {/* New Hero Banner for Business Owners */}
      <div className="relative bg-gradient-to-r from-purple-700 to-indigo-800 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-20 mix-blend-overlay"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="md:flex md:items-center md:justify-between">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <div className="inline-block px-3 py-1 bg-purple-200 text-purple-800 rounded-full text-sm font-semibold mb-4">
                BUSINESS OPPORTUNITY
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
                Grow Your Business With Our Marketplace
              </h1>
              <p className="text-xl text-purple-100 mb-8">
                Join thousands of successful sellers and reach millions of
                customers. No setup fees, just seamless selling.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => navigate("/register")}
                  className="bg-white text-purple-700 hover:bg-purple-50 font-medium px-6 py-3 rounded-lg transition-colors duration-300 flex items-center justify-center">
                  Register Your Business{" "}
                  <ChevronRight className="ml-2 h-5 w-5" />
                </button>
                <button
                  onClick={() => navigate("/business/learn-more")}
                  className="bg-transparent text-white border border-white hover:bg-white/10 font-medium px-6 py-3 rounded-lg transition-colors duration-300 flex items-center justify-center">
                  Learn More
                </button>
              </div>
            </div>
            <div className="md:w-2/5">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <h3 className="text-white text-xl font-bold mb-4">
                  Why Sell With Us?
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-400 flex items-center justify-center mr-3 mt-0.5">
                      <ShieldCheck className="h-3 w-3 text-white" />
                    </div>
                    <p className="text-white">
                      Access to millions of customers
                    </p>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-400 flex items-center justify-center mr-3 mt-0.5">
                      <ShieldCheck className="h-3 w-3 text-white" />
                    </div>
                    <p className="text-white">Easy-to-use seller dashboard</p>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-400 flex items-center justify-center mr-3 mt-0.5">
                      <ShieldCheck className="h-3 w-3 text-white" />
                    </div>
                    <p className="text-white">Secure payment processing</p>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-400 flex items-center justify-center mr-3 mt-0.5">
                      <ShieldCheck className="h-3 w-3 text-white" />
                    </div>
                    <p className="text-white">Dedicated seller support</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Top Businesses Section */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="flex items-center mb-2">
                <Store className="h-5 w-5 text-purple-600 mr-2" />
                <span className="text-purple-600 font-semibold">
                  TOP SELLERS
                </span>
              </div>
              <h2 className="text-3xl font-bold text-gray-900">
                Meet Our Top Businesses
              </h2>
            </div>
            <button
              onClick={() => navigate("/businesses")}
              className="text-purple-600 hover:text-purple-800 font-medium flex items-center">
              View All <ChevronRight className="ml-1 h-4 w-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayBusinesses.map((business) => (
              <div
                key={business.id}
                className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden border border-gray-100"
                onClick={() => navigate(`/business/${business.business_url}`)}>
                <div className="relative aspect-video overflow-hidden bg-gray-100 flex items-center justify-center p-4">
                  {business.business_logo ? (
                    <img
                      src={business.logo || "/placeholder.svg"}
                      alt={business.name}
                      className="h-16 object-contain"
                    />
                  ) : (
                    <Store className="h-16 w-16 text-gray-400" />
                  )}
                </div>
                <div className="p-4">
                  {/* <div className="flex items-center mb-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-3 w-3 ${
                          i < Math.floor(business.rating)
                            ? "text-amber-400"
                            : "text-gray-300"
                        }`}
                        fill={
                          i < Math.floor(business.rating)
                            ? "currentColor"
                            : "none"
                        }
                      />
                    ))}
                    <span className="text-xs text-gray-500 ml-1">
                      ({business.rating})
                    </span>
                  </div> */}
                  <h3 className="font-semibold text-gray-900 mb-1 line-clamp-1 group-hover:text-purple-600 transition-colors">
                    {business.business_name}
                  </h3>
                  <p className="text-sm text-gray-500 mb-3 line-clamp-2">
                    {business.business_description ||
                      "Quality products and excellent service"}
                  </p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    {/* <div className="flex items-center">
                      <ShoppingCart className="h-3 w-3 mr-1" />
                      <span>{business.productCount || "100+"} Products</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="h-3 w-3 mr-1" />
                      <span>{business.salesCount || "500+"} Sales</span>
                    </div> */}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Business Benefits Section */}
        <section className="mb-16 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Benefits For Business Owners
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="flex flex-col items-center text-center p-4">
              <div className="h-16 w-16 rounded-full bg-purple-100 flex items-center justify-center mb-4">
                <Users className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Wider Reach</h3>
              <p className="text-gray-600">
                Access millions of potential customers across the country
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-4">
              <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                <ShieldCheck className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Secure Platform</h3>
              <p className="text-gray-600">
                Reliable payment processing and fraud protection
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-4">
              <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
                <BarChart className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Business Analytics</h3>
              <p className="text-gray-600">
                Detailed insights to help grow your business
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-4">
              <div className="h-16 w-16 rounded-full bg-amber-100 flex items-center justify-center mb-4">
                <Award className="h-8 w-8 text-amber-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Brand Recognition</h3>
              <p className="text-gray-600">
                Build your brand and establish customer loyalty
              </p>
            </div>
          </div>
        </section>

        {/* Business Testimonials Section */}
        <section className="bg-white rounded-2xl shadow-lg p-8 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Success Stories From Our Sellers
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {businessTestimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-6 shadow-sm">
                <div className="flex items-center mb-4">
                  <img
                    src={
                      testimonial.avatar ||
                      "/placeholder.svg?height=48&width=48"
                    }
                    alt={testimonial.name}
                    className="h-12 w-12 rounded-full mr-4 object-cover bg-gray-200"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-purple-600 font-medium">
                      {testimonial.businessName}
                    </p>
                  </div>
                </div>
                <div className="flex mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < testimonial.rating
                          ? "text-amber-400"
                          : "text-gray-300"
                      }`}
                      fill={i < testimonial.rating ? "currentColor" : "none"}
                    />
                  ))}
                </div>
                <p className="text-gray-700 italic">"{testimonial.comment}"</p>
              </div>
            ))}
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="bg-gradient-to-r from-purple-700 to-indigo-800 rounded-2xl shadow-lg p-8 mb-16">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Start Selling?
            </h2>
            <p className="text-purple-100 mb-8">
              Join thousands of successful businesses on our platform today
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate("/business/register")}
                className="bg-white text-purple-700 hover:bg-purple-50 font-medium px-6 py-3 rounded-lg transition-colors duration-300">
                Register Your Business
              </button>
              <button
                onClick={() => navigate("/business/learn-more")}
                className="bg-transparent text-white border border-white hover:bg-white/10 font-medium px-6 py-3 rounded-lg transition-colors duration-300">
                Learn More
              </button>
            </div>
          </div>
        </section>

        {/* Benefits Section (for customers) */}
        <section className="mb-16 bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Why Shop With Us
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center p-4">
              <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                <Award className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Quality Products</h3>
              <p className="text-gray-600">
                We ensure all our products meet the highest quality standards
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-4">
              <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
                <ShoppingCart className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
              <p className="text-gray-600">
                Quick and reliable delivery to your doorstep
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-4">
              <div className="h-16 w-16 rounded-full bg-amber-100 flex items-center justify-center mb-4">
                <Star className="h-8 w-8 text-amber-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Customer Satisfaction
              </h3>
              <p className="text-gray-600">
                Our customers' satisfaction is our top priority
              </p>
            </div>
          </div>
        </section>

        {/* Reviews Section */}
        <section className="bg-white rounded-2xl shadow-lg p-8 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            What Our Customers Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="bg-gray-50 rounded-xl p-6 shadow-sm">
                <div className="flex items-center mb-4">
                  <img
                    src={review.avatar || "/placeholder.svg?height=48&width=48"}
                    alt={review.name}
                    className="h-12 w-12 rounded-full mr-4 object-cover bg-gray-200"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      {review.name}
                    </h4>
                    <p className="text-sm text-gray-500">{review.date}</p>
                  </div>
                </div>
                <div className="flex mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < review.rating ? "text-amber-400" : "text-gray-300"
                      }`}
                      fill={i < review.rating ? "currentColor" : "none"}
                    />
                  ))}
                </div>
                <p className="text-gray-700">{review.comment}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl shadow-lg p-8 mb-16">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Subscribe to Our Newsletter
            </h2>
            <p className="text-blue-100 mb-8">
              Stay updated with our latest products and exclusive offers
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-blue-400"
              />
              <button className="bg-white text-blue-700 hover:bg-blue-50 font-medium px-6 py-3 rounded-lg transition-colors duration-300">
                Subscribe
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { ChevronRight, ShoppingCart, Star, TrendingUp, Award, Heart, Search } from "lucide-react"
import TopNav from "../components/TopNav"
import Footer from "../components/Footer"
import { db } from "../config/config"
import { collection, getDocs, query, limit, orderBy } from "firebase/firestore"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import Advertiser from "../components/advertiser"

const auth = getAuth()

export default function Home() {
  const [logged, setLogged] = useState(false)
  const [proCategory, setProCategory] = useState([])
  const [featuredProducts, setFeaturedProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()

  function fetchCategories() {
    const categories = []
    const categoriesRef = collection(db, "ProductsCategory")

    getDocs(categoriesRef).then((querySnapshot) => {
      let cat = {}
      querySnapshot.forEach((doc) => {
        cat = doc.data()
        cat.id = doc.id
        categories.push(cat)
      })
      setProCategory(categories)
      setIsLoading(false)
    })
  }

  function fetchFeaturedProducts() {
    const productsRef = collection(db, "Products")
    const featuredQuery = query(productsRef, orderBy("createdAt", "desc"), limit(5))

    getDocs(featuredQuery).then((querySnapshot) => {
      const products = []
      querySnapshot.forEach((doc) => {
        const product = doc.data()
        product.id = doc.id
        products.push(product)
      })
      setFeaturedProducts(products)
    })
  }

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setLogged(!!user)
    })

    fetchCategories()
    fetchFeaturedProducts()

    if (!localStorage.getItem("ladoche_shopping_cart")) {
      localStorage.setItem("ladoche_shopping_cart", "[]")
    }
  }, [])

  // Sample reviews data
  const reviews = [
    {
      id: 1,
      name: "Sarah Johnson",
      avatar: "/placeholder.svg?height=80&width=80",
      rating: 5,
      comment: "Absolutely love the quality of products! Fast delivery and excellent customer service.",
      date: "2 weeks ago",
    },
    {
      id: 2,
      name: "Michael Chen",
      avatar: "/placeholder.svg?height=80&width=80",
      rating: 4,
      comment: "Great selection and competitive prices. Will definitely shop here again.",
      date: "1 month ago",
    },
    {
      id: 3,
      name: "Amina Patel",
      avatar: "/placeholder.svg?height=80&width=80",
      rating: 5,
      comment: "The products exceeded my expectations. Very satisfied with my purchase!",
      date: "3 weeks ago",
    },
  ]

  // Sample featured products if none from Firebase
  const sampleProducts = [
    {
      id: "sample1",
      Name: "Premium Product 1",
      Price: 2500,
      Link: "/placeholder.svg?height=300&width=300",
      Description: "High-quality premium product with amazing features",
    },
    {
      id: "sample2",
      Name: "Exclusive Item 2",
      Price: 1800,
      Link: "/placeholder.svg?height=300&width=300",
      Description: "Exclusive item with limited availability",
    },
    {
      id: "sample3",
      Name: "Featured Product 3",
      Price: 3200,
      Link: "/placeholder.svg?height=300&width=300",
      Description: "Our most popular featured product",
    },
    {
      id: "sample4",
      Name: "Special Collection 4",
      Price: 4500,
      Link: "/placeholder.svg?height=300&width=300",
      Description: "Special collection item with premium quality",
    },
    {
      id: "sample5",
      Name: "Trending Item 5",
      Price: 2900,
      Link: "/placeholder.svg?height=300&width=300",
      Description: "Currently trending item in our shop",
    },
  ]

  const displayProducts = featuredProducts.length > 0 ? featuredProducts : sampleProducts

  const addToCart = (e, product) => {
    e.stopPropagation()
    const cart = JSON.parse(localStorage.getItem("ladoche_shopping_cart") || "[]")
    const existingItem = cart.find((item) => item.id === product.id)

    if (existingItem) {
      existingItem.quantity += 1
    } else {
      cart.push({
        id: product.id,
        name: product.Name,
        price: product.Price,
        image: product.Link,
        quantity: 1,
      })
    }

    localStorage.setItem("ladoche_shopping_cart", JSON.stringify(cart))
    alert("Product added to cart!")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <TopNav logged={logged} />

      {/* Hero Banner */}
      <div className="relative bg-gradient-to-r from-blue-600 to-indigo-700 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=800&width=1600')] bg-cover bg-center opacity-20 mix-blend-overlay"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="md:w-2/3">
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">Discover Amazing Products</h1>
            <p className="text-xl text-blue-100 mb-8">Shop the latest trends with unbeatable prices and quality</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => navigate("/product")}
                className="bg-white text-blue-700 hover:bg-blue-50 font-medium px-6 py-3 rounded-lg transition-colors duration-300 flex items-center justify-center"
              >
                Shop Now <ChevronRight className="ml-2 h-5 w-5" />
              </button>
              <div className="relative flex-1 max-w-md">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full pl-10 pr-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-blue-400"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Featured Advertiser Banner */}
        <div className="mb-16">
          <Advertiser />
        </div>

        {/* Categories Section */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Shop by Category</h2>
            <button
              onClick={() => navigate("/categories")}
              className="text-blue-600 hover:text-blue-800 font-medium flex items-center"
            >
              View All <ChevronRight className="ml-1 h-4 w-4" />
            </button>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="bg-gray-200 animate-pulse h-64 rounded-2xl"></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {proCategory.map((category, index) => (
                <div
                  key={index}
                  onClick={() => navigate("/product", { state: { type: category.id } })}
                  className="group relative h-64 overflow-hidden rounded-2xl cursor-pointer transform transition-all duration-300 hover:-translate-y-1 shadow-md hover:shadow-xl"
                >
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                    style={{
                      backgroundImage: `url(${category.image || "/placeholder.svg?height=400&width=300"})`,
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-2xl font-bold text-white mb-3">{category.name}</h3>
                    <button className="flex items-center text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors px-4 py-2 rounded-lg">
                      Shop Now
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Featured Products Section */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="flex items-center mb-2">
                <TrendingUp className="h-5 w-5 text-blue-600 mr-2" />
                <span className="text-blue-600 font-semibold">TRENDING NOW</span>
              </div>
              <h2 className="text-3xl font-bold text-gray-900">Featured Products</h2>
            </div>
            <button
              onClick={() => navigate("/product")}
              className="text-blue-600 hover:text-blue-800 font-medium flex items-center"
            >
              View All <ChevronRight className="ml-1 h-4 w-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {displayProducts.map(
              (
                product,
                index, // index added here
              ) => (
                <div
                  key={product.id}
                  className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden border border-gray-100"
                  onClick={() => navigate(`/product/${product.id}`, { state: { type: product.category } })}
                >
                  <div className="relative aspect-square overflow-hidden bg-gray-100">
                    <img
                      src={product.Link || "/placeholder.svg?height=300&width=300"}
                      alt={product.Name}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                    />
                    <button
                      onClick={(e) => e.stopPropagation()}
                      className="absolute top-3 right-3 h-8 w-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center text-gray-700 hover:text-red-500 transition-colors"
                    >
                      <Heart className="h-4 w-4" />
                    </button>
                    {index === 0 && (
                      <div className="absolute top-3 left-3 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded">
                        NEW
                      </div>
                    )}
                    {index === 1 && (
                      <div className="absolute top-3 left-3 bg-amber-500 text-white text-xs font-bold px-2 py-1 rounded">
                        SALE
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <div className="flex items-center mb-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-3 w-3 ${i < 4 ? "text-amber-400" : "text-gray-300"}`}
                          fill={i < 4 ? "currentColor" : "none"}
                        />
                      ))}
                      <span className="text-xs text-gray-500 ml-1">(24)</span>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2 group-hover:text-blue-600 transition-colors">
                      {product.Name}
                    </h3>
                    <p className="text-sm text-gray-500 mb-3 line-clamp-2">
                      {product.Description || "High-quality product with amazing features"}
                    </p>
                    <div className="flex items-center justify-between">
                      <p className="text-lg font-bold text-gray-900">KSH {product.Price?.toLocaleString()}</p>
                      <button
                        onClick={(e) => addToCart(e, product)}
                        className="flex items-center space-x-1 bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        <ShoppingCart className="h-4 w-4" />
                        <span>Add</span>
                      </button>
                    </div>
                  </div>
                </div>
              ),
            )}
          </div>
        </section>

        {/* Benefits Section */}
        <section className="mb-16 bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Why Shop With Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center p-4">
              <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                <Award className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Quality Products</h3>
              <p className="text-gray-600">We ensure all our products meet the highest quality standards</p>
            </div>
            <div className="flex flex-col items-center text-center p-4">
              <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
                <ShoppingCart className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
              <p className="text-gray-600">Quick and reliable delivery to your doorstep</p>
            </div>
            <div className="flex flex-col items-center text-center p-4">
              <div className="h-16 w-16 rounded-full bg-amber-100 flex items-center justify-center mb-4">
                <Star className="h-8 w-8 text-amber-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Customer Satisfaction</h3>
              <p className="text-gray-600">Our customers' satisfaction is our top priority</p>
            </div>
          </div>
        </section>

        {/* Reviews Section */}
        <section className="bg-white rounded-2xl shadow-lg p-8 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">What Our Customers Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reviews.map((review) => (
              <div key={review.id} className="bg-gray-50 rounded-xl p-6 shadow-sm">
                <div className="flex items-center mb-4">
                  <img
                    src={review.avatar || "/placeholder.svg"}
                    alt={review.name}
                    className="h-12 w-12 rounded-full mr-4 object-cover"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">{review.name}</h4>
                    <p className="text-sm text-gray-500">{review.date}</p>
                  </div>
                </div>
                <div className="flex mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${i < review.rating ? "text-amber-400" : "text-gray-300"}`}
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
            <h2 className="text-3xl font-bold text-white mb-4">Subscribe to Our Newsletter</h2>
            <p className="text-blue-100 mb-8">Stay updated with our latest products and exclusive offers</p>
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
  )
}


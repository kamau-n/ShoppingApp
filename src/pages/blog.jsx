"use client"

import { useState } from "react"
import { Search, Calendar, User, Clock, ChevronRight, ChevronLeft } from "lucide-react"
import TopNav from "../components/TopNav";

const BlogPage = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeCategory, setActiveCategory] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  

  // Blog Categories
  const categories = [
    { id: "all", name: "All Posts" },
    { id: "business", name: "Business" },
    { id: "technology", name: "Technology" },
    { id: "design", name: "Design" },
    { id: "marketing", name: "Marketing" },
    { id: "tutorials", name: "Tutorials" },
  ]

  // Blog Posts
  const blogPosts = [
    {
      id: 1,
      title: "10 Essential Tips for E-commerce Success in 2023",
      excerpt:
        "Discover the key strategies that will help your online store thrive in today's competitive market. From optimizing your product pages to leveraging social commerce.",
      image: "/placeholder.svg?height=400&width=600",
      author: "Jane Smith",
      date: "June 15, 2023",
      readTime: "8 min read",
      category: "business",
      featured: true,
    },
    {
      id: 2,
      title: "How to Implement Secure Payment Processing on Your Website",
      excerpt:
        "Learn the best practices for implementing secure payment gateways and protecting customer data during transactions. This comprehensive guide covers everything from SSL certificates to PCI compliance.",
      image: "/placeholder.svg?height=400&width=600",
      author: "Michael Johnson",
      date: "May 28, 2023",
      readTime: "12 min read",
      category: "technology",
    },
    {
      id: 3,
      title: "The Psychology of Color in Web Design",
      excerpt:
        "Explore how different colors affect user behavior and conversion rates. This article breaks down the emotional responses to various color schemes and how to use them effectively in your web design.",
      image: "/placeholder.svg?height=400&width=600",
      author: "Sarah Williams",
      date: "April 10, 2023",
      readTime: "6 min read",
      category: "design",
    },
    {
      id: 4,
      title: "Social Media Marketing Strategies That Actually Work",
      excerpt:
        "Cut through the noise with these proven social media marketing techniques. We analyze successful campaigns and provide actionable insights you can implement today.",
      image: "/placeholder.svg?height=400&width=600",
      author: "David Chen",
      date: "March 22, 2023",
      readTime: "9 min read",
      category: "marketing",
    },
    {
      id: 5,
      title: "Building Your First React Component: A Step-by-Step Guide",
      excerpt:
        "New to React? This beginner-friendly tutorial walks you through creating your first component from scratch, with clear explanations of props, state, and lifecycle methods.",
      image: "/placeholder.svg?height=400&width=600",
      author: "Alex Rodriguez",
      date: "February 15, 2023",
      readTime: "15 min read",
      category: "tutorials",
    },
    {
      id: 6,
      title: "The Future of E-commerce: Trends to Watch in 2023 and Beyond",
      excerpt:
        "Stay ahead of the curve with our analysis of emerging e-commerce trends. From voice shopping to augmented reality experiences, discover what's next for online retail.",
      image: "/placeholder.svg?height=400&width=600",
      author: "Emily Johnson",
      date: "January 30, 2023",
      readTime: "10 min read",
      category: "business",
    },
    {
      id: 7,
      title: "Optimizing Your Website for Mobile Users",
      excerpt:
        "With mobile traffic accounting for over 50% of web visits, mobile optimization is no longer optional. Learn how to create a seamless mobile experience that converts.",
      image: "/placeholder.svg?height=400&width=600",
      author: "Thomas Wright",
      date: "January 12, 2023",
      readTime: "7 min read",
      category: "design",
    },
    {
      id: 8,
      title: "Introduction to API Integration for E-commerce Platforms",
      excerpt:
        "Understand how to leverage APIs to enhance your e-commerce platform. This guide covers payment gateways, shipping calculators, inventory management, and more.",
      image: "/placeholder.svg?height=400&width=600",
      author: "Sophia Lee",
      date: "December 5, 2022",
      readTime: "14 min read",
      category: "technology",
    },
    {
      id: 9,
      title: "Content Marketing Essentials for Small Businesses",
      excerpt:
        "Learn how to create a content marketing strategy that builds your brand and drives traffic, even with limited resources. Includes templates and real-world examples.",
      image: "/placeholder.svg?height=400&width=600",
      author: "Robert Kim",
      date: "November 18, 2022",
      readTime: "8 min read",
      category: "marketing",
    },
  ]

  // Filter blog posts based on search and category
  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = activeCategory === "all" || post.category === activeCategory
    return matchesSearch && matchesCategory
  })

  // Featured post is the first post marked as featured
  const featuredPost = blogPosts.find((post) => post.featured)

  // Pagination
  const postsPerPage = 6
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage)
  const indexOfLastPost = currentPage * postsPerPage
  const indexOfFirstPost = indexOfLastPost - postsPerPage
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost)

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
     <TopNav/>

      <div className="container mx-auto px-4 py-12">
        {/* Search and Categories */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
            />
          </div>

          <div className="flex overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
            <div className="flex space-x-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => {
                    setActiveCategory(category.id)
                    setCurrentPage(1)
                  }}
                  className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                    activeCategory === category.id
                      ? "bg-blue-600 text-white"
                      : "bg-white text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Featured Post */}
        {featuredPost && activeCategory === "all" && currentPage === 1 && !searchTerm && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Featured Article</h2>
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="md:flex">
                <div className="md:flex-shrink-0 md:w-2/5">
                  <img
                    className="h-64 w-full object-cover md:h-full"
                    src={featuredPost.image || "/placeholder.svg"}
                    alt={featuredPost.title}
                  />
                </div>
                <div className="p-6 md:p-8 md:w-3/5">
                  <div className="flex items-center text-sm text-gray-500 mb-2">
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                      {categories.find((cat) => cat.id === featuredPost.category)?.name || featuredPost.category}
                    </span>
                    <span className="mx-2">•</span>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {featuredPost.date}
                    </div>
                    <span className="mx-2">•</span>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {featuredPost.readTime}
                    </div>
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">{featuredPost.title}</h3>
                  <p className="text-gray-600 mb-4">{featuredPost.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center mr-2">
                        <User className="h-4 w-4 text-gray-500" />
                      </div>
                      <span className="text-sm text-gray-600">{featuredPost.author}</span>
                    </div>
                    <a
                      href={`/blog/${featuredPost.id}`}
                      className="text-blue-600 font-medium hover:text-blue-700 flex items-center"
                    >
                      Read More
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Blog Posts Grid */}
        {filteredPosts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentPosts.map((post) => (
                <div key={post.id} className="bg-white rounded-xl shadow-sm overflow-hidden flex flex-col">
                  <img className="h-48 w-full object-cover" src={post.image || "/placeholder.svg"} alt={post.title} />
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex items-center text-sm text-gray-500 mb-2">
                      <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                        {categories.find((cat) => cat.id === post.category)?.name || post.category}
                      </span>
                      <span className="mx-2">•</span>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {post.readTime}
                      </div>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{post.title}</h3>
                    <p className="text-gray-600 mb-4 flex-1">
                      {post.excerpt.length > 120 ? `${post.excerpt.substring(0, 120)}...` : post.excerpt}
                    </p>
                    <div className="flex items-center justify-between mt-auto">
                      <div className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center mr-2">
                          <User className="h-4 w-4 text-gray-500" />
                        </div>
                        <span className="text-sm text-gray-600">{post.author}</span>
                      </div>
                      <a
                        href={`/blog/${post.id}`}
                        className="text-blue-600 font-medium hover:text-blue-700 flex items-center"
                      >
                        Read
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-12">
                <nav className="flex items-center space-x-2">
                  <button
                    onClick={() => paginate(currentPage > 1 ? currentPage - 1 : 1)}
                    disabled={currentPage === 1}
                    className={`p-2 rounded-md ${
                      currentPage === 1 ? "text-gray-400 cursor-not-allowed" : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>

                  {[...Array(totalPages)].map((_, index) => {
                    const pageNumber = index + 1
                    // Show current page, first page, last page, and one page before and after current
                    if (
                      pageNumber === 1 ||
                      pageNumber === totalPages ||
                      (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
                    ) {
                      return (
                        <button
                          key={pageNumber}
                          onClick={() => paginate(pageNumber)}
                          className={`px-4 py-2 rounded-md ${
                            currentPage === pageNumber
                              ? "bg-blue-600 text-white"
                              : "bg-white text-gray-700 hover:bg-gray-100"
                          }`}
                        >
                          {pageNumber}
                        </button>
                      )
                    }

                    // Show ellipsis for skipped pages
                    if (
                      (pageNumber === 2 && currentPage > 3) ||
                      (pageNumber === totalPages - 1 && currentPage < totalPages - 2)
                    ) {
                      return (
                        <span key={pageNumber} className="px-2">
                          ...
                        </span>
                      )
                    }

                    return null
                  })}

                  <button
                    onClick={() => paginate(currentPage < totalPages ? currentPage + 1 : totalPages)}
                    disabled={currentPage === totalPages}
                    className={`p-2 rounded-md ${
                      currentPage === totalPages
                        ? "text-gray-400 cursor-not-allowed"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </nav>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-16">
            <div className="bg-gray-100 inline-block p-4 rounded-full mb-4">
              <Search className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No articles found</h3>
            <p className="text-gray-600 mb-6">
              We couldn't find any articles matching your search. Try different keywords or browse by category.
            </p>
            <button
              onClick={() => {
                setSearchTerm("")
                setActiveCategory("all")
                setCurrentPage(1)
              }}
              className="text-blue-600 font-medium hover:text-blue-700"
            >
              Clear filters
            </button>
          </div>
        )}

        {/* Newsletter Signup */}
        <div className="mt-16 bg-blue-50 rounded-xl p-6 md:p-8 border border-blue-100">
          <div className="md:flex md:items-center md:justify-between">
            <div className="mb-6 md:mb-0 md:mr-6 md:max-w-md">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Subscribe to our newsletter</h3>
              <p className="text-gray-600">
                Get the latest articles, resources, and updates delivered straight to your inbox.
              </p>
            </div>
            <div className="flex-1 max-w-md">
              <form className="flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white font-medium rounded-r-lg hover:bg-blue-700 transition-colors"
                >
                  Subscribe
                </button>
              </form>
              <p className="text-xs text-gray-500 mt-2">
                By subscribing, you agree to our Privacy Policy and consent to receive updates from our company.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BlogPage


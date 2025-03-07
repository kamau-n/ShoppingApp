"use client"

import { collection, getDocs, query, where, doc, deleteDoc, updateDoc } from "firebase/firestore"
import { useEffect, useState } from "react"
import { db } from "../config/config"
import { onAuthStateChanged, getAuth, signOut } from "firebase/auth"
import { Link, useNavigate } from "react-router-dom"
import { Menu, Home, AlertCircle, Loader2, ChevronRight } from "lucide-react"
import { Money, Person } from "@material-ui/icons"
import { UserIcon, Settings, Package, TagsIcon as Categories, ShoppingBag } from "lucide-react"
import { loadStripe } from "@stripe/stripe-js"

// Import components
import StripeModal from "../components/payment/StripeModal"
import ConfirmationModal from "../components/modals/ConfirmationModal"
import UserEditModal from "../components/modals/UserEditModal"
import ProductEditModal from "../components/modals/ProductEditModal"
import SuccessNotification from "../components/notifications/SuccessNotification"
import UsersTab from "../components/tabs/UsersTab"
import OrdersTab from "../components/tabs/OrdersTab"
import ProductsTab from "../components/tabs/ProductsTab"
import SettingsTab from "../components/tabs/SettingsTab"
import Sidebar from "../components/layout/sidebar"
import OverviewTab from "../components/tabs/OverViewTable"
import CategoriesTab from "../components/tabs/CategoriesTab"

const auth = getAuth()
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "pk_test_your_test_key")

function Account() {
  const [user, setUser] = useState(null)
  const [products, setProducts] = useState([])
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("overview")
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)
  const [photoURL, setPhotoURL] = useState(null)
  const [deleteConfirm, setDeleteConfirm] = useState({ show: false, type: "", id: "" })
  const [searchTerm, setSearchTerm] = useState("")
  const navigate = useNavigate()
  const [userData, setUserData] = useState([])
  const [editUserModal, setEditUserModal] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [categories, setCategories] = useState([])

  const [showStripeModal, setShowStripeModal] = useState(false)
  const [paymentAmount, setPaymentAmount] = useState(0)
  const [paymentSuccess, setPaymentSuccess] = useState(false)

  // Add a new state for the product edit modal and selected product
  const [editProductModal, setEditProductModal] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
      if (authUser) {
        console.log(authUser)
        setPhotoURL(authUser.photoURL)
        await fetchUser(authUser.uid)
        await fetchUserProducts(authUser.uid)
        await fetchUserOrders(authUser.uid)
        await fetchUsers()
        await fetchCategories()
      } else {
        setUser(null)
        navigate("/login")
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [navigate])

  const fetchUserProducts = async (id) => {
    try {
      const userRef = collection(db, "Product")
      const q = query(userRef)
      const querySnapshot = await getDocs(q)

      const productsData = []
      querySnapshot.forEach((doc) => {
        productsData.push({
          id: doc.id,
          ...doc.data(),
        })
      })

      setProducts(productsData)
    } catch (error) {
      console.error("Error fetching products data:", error)
    }
  }

  const fetchUsers = async () => {
    try {
      const userRef = collection(db, "Users")
      const q = query(userRef)
      const querySnapshot = await getDocs(q)

      const userData = []
      querySnapshot.forEach((doc) => {
        userData.push({
          id: doc.id,
          ...doc.data(),
        })
      })
      console.log(userData)

      setUserData(userData)
    } catch (error) {
      console.error("Error fetching products data:", error)
    }
  }

  const fetchUserOrders = async (id) => {
    console.log("this is the user id" + id)
    try {
      const userRef = collection(db, "Orders")
      const q = query(userRef, where("CustomerID", "==", id))
      const querySnapshot = await getDocs(q)

      const ordersData = []
      querySnapshot.forEach((doc) => {
        ordersData.push({
          id: doc.id,
          ...doc.data(),
        })
      })

      setOrders(ordersData)
    } catch (error) {
      console.error("Error fetching orders data:", error)
    }
  }

  const fetchUser = async (id) => {
    console.log("this is the user id" + id)
    try {
      const userRef = collection(db, "Users")
      const q = query(userRef, where("user_id", "==", id))
      const querySnapshot = await getDocs(q)
      querySnapshot.forEach((doc) => {
        // set the id
        const usersData = doc.data()
        usersData["id"] = doc.id
        setUser(usersData)
      })
    } catch (error) {
      console.error("Error fetching user data:", error)
    }
  }

  const fetchCategories = async () => {
    try {
      const userRef = collection(db, "ProductsCategories")
      const q = query(userRef)
      const querySnapshot = await getDocs(q)

      const categoriesData = []
      querySnapshot.forEach((doc) => {
        categoriesData.push({
          id: doc.id,
          ...doc.data(),
        })
      })

      setCategories(categoriesData)
    }
    catch (error) {
      console.error("Error fetching categories data:", error)
    } 
  }
  

  const handleLogout = async () => {
    try {
      await signOut(auth)
      navigate("/login")
    } catch (error) {
      console.error("Error signing out:", error)
    }
  }

  const handleDeleteItem = async (type, id) => {
    try {
      const collectionName = type === "product" ? "Product" : "Orders"
      await deleteDoc(doc(db, collectionName, id))

      if (type === "product") {
        setProducts(products.filter((product) => product.id !== id))
      } else {
        setOrders(orders.filter((order) => order.id !== id))
      }

      setDeleteConfirm({ show: false, type: "", id: "" })
    } catch (error) {
      console.error(`Error deleting ${type}:`, error)
    }
  }

  // Update the handleEditProduct function to open the modal instead of navigating
  const handleEditProduct = (id) => {
    const product = products.find((p) => p.id === id)
    setSelectedProduct(product)
    setEditProductModal(true)
  }

  const handleViewOrder = (id) => {
    navigate(`/order-details/${id}`)
  }

  const handleEditUser = (user) => {
    console.log("I have been clicked")
    console.log("this is the selected user: ", user)
    setSelectedUser(user)
    setEditUserModal(true)
  }

  const handleUpdateUser = async (updatedUser) => {
    console.log("user to update", updatedUser)
    console.log("user to update id ", selectedUser.id || user.id)

    try {
      // Update the user in Firestore
      const userRef = doc(db, "Users", selectedUser.id || user.id)
      await updateDoc(userRef, updatedUser)

      // Update the local state
      setUserData(userData.map((user) => (user.id === selectedUser.id ? { ...user, ...updatedUser } : user)))

      // Close the modal
      setEditUserModal(false)
      setSelectedUser(null)
    } catch (error) {
      console.error("Error updating user:", error)
    }
  }

  // Add a function to handle product updates
  const handleUpdateProduct = async (updatedProduct, imageFile) => {
    try {
      // Update the product in Firestore
      const productRef = doc(db, "Product", selectedProduct.id)

      // If there's a new image file, handle the upload
      if (imageFile && imageFile !== selectedProduct.Link) {
        // In a real implementation, you would upload the image to storage
        // and get the URL back. This is a simplified example.
        console.log("Would upload new image:", imageFile)
        // updatedProduct.Link = newImageUrl
      }

      await updateDoc(productRef, updatedProduct)

      // Update the local state
      setProducts(
        products.map((product) => (product.id === selectedProduct.id ? { ...product, ...updatedProduct } : product)),
      )

      // Close the modal
      setEditProductModal(false)
      setSelectedProduct(null)
    } catch (error) {
      console.error("Error updating product:", error)
    }
  }

  const filteredProducts = products.filter(
    (product) =>
      product.ProductName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.ProductDescription?.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const filteredOrders = orders.filter(
    (order) =>
      order.OrderID?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.Status?.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
          <p className="text-gray-600">Loading your account...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center space-y-4">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto" />
          <h2 className="text-xl font-semibold text-gray-900">No User Found</h2>
          <p className="text-gray-600">Please log in to access your account.</p>
          <Link
            to="/login"
            className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go to Login
          </Link>
        </div>
      </div>
    )
  }

  const navigation = [
    { name: "Overview", icon: UserIcon, tab: "overview", role: "all" },
    { name: "Users", icon: Person, tab: "users", role: "admin" },
    { name: "Payments", icon: Money, tab: "payments", role: "admin" },
    { name: "Orders", icon: ShoppingBag, tab: "orders", role: "all" },
    { name: "Categories", icon: Categories, tab: "categories", role: "admin" },
    { name: "Products", icon: Package, tab: "products", role: "admin" },
    { name: "Settings", icon: Settings, tab: "settings", role: "all" },
  ]

  // Format date for display
  const formatDate = (timestamp) => {
    if (!timestamp) return "N/A"

    try {
      // Handle Firestore timestamps or date strings
      const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp)
      return new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }).format(date)
    } catch (error) {
      console.error("Error formatting date:", error)
      return "Invalid date"
    }
  }

  // Format currency
  const formatCurrency = (amount) => {
    if (!amount && amount !== 0) return "N/A"
    return `KSH ${Number(amount).toLocaleString()}`
  }

  const handleStripePayment = (amount) => {
    setPaymentAmount(amount)
    setShowStripeModal(true)
  }

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Modals */}
      {editUserModal && selectedUser && (
        <UserEditModal
          user={selectedUser}
          onClose={() => {
            setEditUserModal(false)
            setSelectedUser(null)
          }}
          onUpdate={handleUpdateUser}
        />
      )}

      {editProductModal && selectedProduct && (
        <ProductEditModal
          product={selectedProduct}
          onClose={() => {
            setEditProductModal(false)
            setSelectedProduct(null)
          }}
          onUpdate={handleUpdateProduct}
        />
      )}

      {showLogoutConfirm && (
        <ConfirmationModal
          title="Confirm Logout"
          message="Are you sure you want to log out of your account?"
          confirmText="Logout"
          cancelText="Cancel"
          onConfirm={handleLogout}
          onCancel={() => setShowLogoutConfirm(false)}
        />
      )}

      {deleteConfirm.show && (
        <ConfirmationModal
          title="Confirm Delete"
          message={`Are you sure you want to delete this ${deleteConfirm.type}? This action cannot be undone.`}
          confirmText="Delete"
          cancelText="Cancel"
          onConfirm={() => handleDeleteItem(deleteConfirm.type, deleteConfirm.id)}
          onCancel={() => setDeleteConfirm({ show: false, type: "", id: "" })}
        />
      )}

      {showStripeModal && (
        <StripeModal
          amount={paymentAmount}
          stripePromise={stripePromise}
          onSuccess={(paymentMethodId) => {
            setPaymentSuccess(true)
            setShowStripeModal(false)
            // Here you would typically update your database with the payment information
            console.log("Payment successful with payment method ID:", paymentMethodId)
            // Show success message or redirect
            setTimeout(() => {
              setPaymentSuccess(false)
            }, 3000)
          }}
          onCancel={() => setShowStripeModal(false)}
        />
      )}

      {/* Payment Success Message */}
      {paymentSuccess && (
        <SuccessNotification message="Payment Successful!" subMessage="Your payment has been processed successfully." />
      )}

      {/* Mobile Header - Only visible on small screens */}
      <header className="md:hidden flex items-center justify-between bg-white border-b border-gray-200 px-4 py-3 sticky top-0 z-30">
        <div className="flex items-center">
          <button
            onClick={toggleMobileMenu}
            className="p-2 rounded-md text-gray-500 hover:bg-gray-100"
            aria-label="Toggle menu"
          >
            <Menu className="h-6 w-6" />
          </button>
          <h1 className="ml-3 text-lg font-semibold text-gray-900">{user.user_first_name}'s Account</h1>
        </div>
        <Link to="/" className="p-2 rounded-md text-blue-600 hover:bg-blue-50">
          <Home className="h-6 w-6" />
        </Link>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden" onClick={toggleMobileMenu}></div>
      )}

      <div className="flex">
        {/* Sidebar */}
        <Sidebar
          user={user}
          navigation={navigation}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          setShowLogoutConfirm={setShowLogoutConfirm}
          mobileMenuOpen={mobileMenuOpen}
          toggleMobileMenu={toggleMobileMenu}
        />

        {/* Main Content */}
        <div className="w-full md:pl-64 flex-1">
          <div className="max-w-6xl mx-auto px-4 py-8">
            {activeTab === "overview" && (
              <OverviewTab
                user={user}
                orders={orders}
                products={products}
                userData={userData}
                formatCurrency={formatCurrency}
                handleEditUser={handleEditUser}
              />
            )}

            {activeTab === "users" && (
              <UsersTab
                userData={userData}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                handleEditUser={handleEditUser}
                handleViewOrder={handleViewOrder}
                setDeleteConfirm={setDeleteConfirm}
              />
            )}

            {activeTab === "orders" && (
              <OrdersTab
                orders={orders}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                handleViewOrder={handleViewOrder}
                setDeleteConfirm={setDeleteConfirm}
                formatCurrency={formatCurrency}
                formatDate={formatDate}
              />
            )}

            {activeTab === "categories" && (
              <CategoriesTab
                products={categories}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                handleEditProduct={handleEditProduct}
                setDeleteConfirm={setDeleteConfirm}
                />
              
            )}
          

            {activeTab === "products" && (
              <ProductsTab
                products={products}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                handleEditProduct={handleEditProduct}
                setDeleteConfirm={setDeleteConfirm}
                formatCurrency={formatCurrency}
              />
            )}

            {activeTab === "settings" && <SettingsTab handleStripePayment={handleStripePayment} />}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Account



import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../config/config";
import { onAuthStateChanged, getAuth, signOut } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { User, Settings, Package, TagsIcon as Categories, ShoppingBag, LogOut, Bell, CreditCard, Heart, Clock, Loader2, AlertCircle, ChevronRight, Edit, Camera } from 'lucide-react';

const auth = getAuth();

function Account() {
  const [user, setUser] = useState(null);
  const  [products,setProducts]  = useState([]);
  const  [orders,setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const  [photoURL,setPhotoURL] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {

    
    const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
      if (authUser) {
        console.log(authUser);
        setPhotoURL(authUser.photoURL);
        await fetchUser(authUser.uid);
        await fetchUserProducts(authUser.uid);
        await fetchUserOrders(authUser.uid);
      } else {
        setUser(null);
        navigate('/login');
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [navigate]);


  const fetchUserProducts =  async (id) =>{
       try {
      const userRef = collection(db, "Product");
      const q = query(userRef, where("Owner", "==", id));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setProducts(doc.data());
      });

      console.log("This is the user data", products);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
    

    
  }

  const fetUserOrders =  async (id)=>{
        try {
      const userRef = collection(db, "Orders");
      const q = query(userRef, where("CustomerID", "==", id));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setOrders(doc.data());
      });

      console.log("This is the user data", orders);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
    
  }

  const fetchUser = async (id) => {
    console.log( "this is the user id" + id);
    try {
      const userRef = collection(db, "Users");
      const q = query(userRef, where("user_id", "==", id));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });

      console.log("This is the user data", user);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
          <p className="text-gray-600">Loading your account...</p>
        </div>
      </div>
    );
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
    );
  }

  const navigation = [
    { name: 'Overview', icon: User, tab: 'overview' },
    { name: 'Orders', icon: ShoppingBag, tab: 'orders' },
    { name: 'Categories', icon: Categories, tab: 'categories' },
    { name: 'Products', icon: Package, tab: 'products' },
    { name: 'Settings', icon: Settings, tab: 'settings' },
  ];

  const recentActivity = [
    { action: 'Order Placed', date: '2 hours ago', amount: 'KSH 2,500' },
    { action: 'Profile Updated', date: '1 day ago' },
    { action: 'New Category Added', date: '3 days ago' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl p-6 max-w-sm w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">Confirm Logout</h3>
            <p className="text-gray-600 mb-6">Are you sure you want to log out of your account?</p>
            <div className="flex space-x-4">
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex">
        {/* Sidebar */}
        <div className="hidden md:flex md:flex-col md:w-64 md:fixed md:inset-y-0 bg-white border-r border-gray-200">
          <div className="flex flex-col flex-1 min-h-0">
            {/* Profile Section */}
            <div className="flex-shrink-0 p-4 border-b">
              <div className="relative">
                <div className="w-20 h-20 rounded-full bg-gray-200 mx-auto mb-4 relative">
                  {user.user_image? (
                    <img
                      src={user.user_image || "/placeholder.svg"}
                      alt="Profile"
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <User className="w-12 h-12 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-400" />
                  )}
                  <button className="absolute bottom-0 right-0 p-1 bg-blue-600 rounded-full text-white hover:bg-blue-700 transition-colors">
                    <Camera className="w-4 h-4" />
                  </button>
                </div>
                <div className="text-center">
                  <h2 className="text-lg font-semibold text-gray-900">
                    {user.user_first_name} {user.user_last_name}
                  </h2>
                  <p className="text-sm text-gray-600">{user.user_email}</p>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-2 py-4 space-y-1">
              {navigation?.map((item) => (
                <button
                  key={item?.name}
                  onClick={() => setActiveTab(item.tab)}
                  className={`w-full flex items-center px-4 py-2 text-sm rounded-lg transition-colors ${
                    activeTab === item.tab
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <item.icon className="w-5 h-5 mr-3" />
                  {item?.name}
                </button>
              ))}
            </nav>

            {/* Logout Button */}
            <div className="flex-shrink-0 p-4 border-t">
              <button
                onClick={() => setShowLogoutConfirm(true)}
                className="w-full flex items-center px-4 py-2 text-sm text-red-600 rounded-lg hover:bg-red-50 transition-colors"
              >
                <LogOut className="w-5 h-5 mr-3" />
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="md:pl-64 flex-1">
          <div className="max-w-4xl mx-auto px-4 py-8">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Quick Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <div className="flex items-center">
                      <ShoppingBag className="w-12 h-12 text-blue-600" />
                      <div className="ml-4">
                        <h3 className="text-sm font-medium text-gray-500">Total Orders</h3>
                        <p className="text-2xl font-semibold text-gray-900">12</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <div className="flex items-center">
                      <CreditCard className="w-12 h-12 text-green-600" />
                      <div className="ml-4">
                        <h3 className="text-sm font-medium text-gray-500">Total Spent</h3>
                        <p className="text-2xl font-semibold text-gray-900">KSH 25,400</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <div className="flex items-center">
                      <Heart className="w-12 h-12 text-red-600" />
                      <div className="ml-4">
                        <h3 className="text-sm font-medium text-gray-500">Wishlist Items</h3>
                        <p className="text-2xl font-semibold text-gray-900">5</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
                    <div className="space-y-4">
                      {recentActivity.map((activity, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between py-3 border-b last:border-0"
                        >
                          <div className="flex items-center">
                            <Clock className="w-5 h-5 text-gray-400 mr-3" />
                            <div>
                              <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                              <p className="text-sm text-gray-500">{activity.date}</p>
                            </div>
                          </div>
                          {activity.amount && (
                            <span className="text-sm font-medium text-gray-900">{activity.amount}</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Personal Information */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
                      <button className="text-blue-600 hover:text-blue-700 flex items-center">
                        <Edit className="w-4 h-4 mr-1" />
                        Edit
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Full Name</p>
                        <p className="text-sm font-medium text-gray-900">
                          {user.user_first_name} {user.user_last_name}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Email</p>
                        <p className="text-sm font-medium text-gray-900">{user.user_email}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Phone</p>
                        <p className="text-sm font-medium text-gray-900">{user.phoneNumber || 'Not set'}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Address</p>
                        <p className="text-sm font-medium text-gray-900">
                          {user.user_address}, {user.user_city}, {user.user_county}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'orders' && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Order History</h3>
                <p className="text-gray-600">You haven't placed any orders yet.</p>
              </div>
            )}

            {activeTab === 'categories' && (
              <div className="space-y-6">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-gray-900">Categories</h3>
                    <Link
                      to="/categories"
                      className="flex items-center text-blue-600 hover:text-blue-700"
                    >
                      Add Category
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </Link>
                  </div>
                  <p className="text-gray-600">Manage your product categories here.</p>
                </div>
              </div>
            )}

            {activeTab === 'products' && (
              <div className="space-y-6">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-gray-900">Products</h3>
                    <Link
                      to="/uploads"
                      className="flex items-center text-blue-600 hover:text-blue-700"
                    >
                      Add Product
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </Link>
                  </div>
                  <p className="text-gray-600">Manage your products here.</p>
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="space-y-6">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Settings</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between py-3 border-b">
                      <div>
                        <p className="text-sm font-medium text-gray-900">Email Notifications</p>
                        <p className="text-sm text-gray-500">Receive updates about your orders</p>
                      </div>
                      <button className="w-11 h-6 bg-gray-200 rounded-full relative transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                        <span className="sr-only">Enable notifications</span>
                        <span className="w-5 h-5 bg-white rounded-full absolute left-0.5 top-0.5 transition-transform duration-200 transform" />
                      </button>
                    </div>
                    <div className="flex items-center justify-between py-3 border-b">
                      <div>
                        <p className="text-sm font-medium text-gray-900">Two-Factor Authentication</p>
                        <p className="text-sm text-gray-500">Add an extra layer of security</p>
                      </div>
                      <button className="text-blue-600 hover:text-blue-700">Enable</button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Account;

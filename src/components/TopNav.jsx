import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  ShoppingCart,
  ChevronDown,
  User,
  Menu,
  Building2,
} from "lucide-react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../config/config";

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [logged, setLogged] = useState(false);
  const [allCart, setAllCart] = useState(0);
  const [total, setTotal] = useState(0);
  const [userRole, setUserRole] = useState(null);
  const [businessUrl, setBusinessUrl] = useState(null);
  const dropdownRef = useRef(null);
  const searchRef = useRef(null);
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setLogged(!!user);

      if (user) {
        // Fetch user role from Firestore
        const usersRef = collection(db, "Users");
        const q = query(usersRef, where("user_id", "==", user.uid));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const userData = querySnapshot.docs[0].data();
          setUserRole(userData.user_role);

          // If business user, get their business URL
          if (userData.user_role === "business") {
            const businessRef = collection(db, "business_profiles");
            const businessQuery = query(
              businessRef,
              where("user_id", "==", user.uid)
            );
            const businessSnapshot = await getDocs(businessQuery);

            if (!businessSnapshot.empty) {
              setBusinessUrl(businessSnapshot.docs[0].data().business_url);
            }
          }
        }
      }
    });

    return () => unsubscribe();
  }, [auth]);

  const allStorage = () => {
    const cart = localStorage.getItem("ladoche_shopping_cart");
    const data = JSON.parse(cart);
    getTotal(data);
    setTotal(data?.length);
  };

  const getTotal = (data) => {
    let totalSize = 0;
    if (data?.length > 0) {
      data?.forEach((y) => {
        totalSize++;
      });
      setAllCart(totalSize);
    }
  };

  useEffect(() => {
    allStorage();
  }, []);

  return (
    <header className="relative z-50">
      <div className="bg-gradient-to-r from-blue-700 to-indigo-800 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            <Link
              to="/"
              className="flex items-center space-x-2 text-2xl font-bold tracking-tight hover:text-white/90 transition-all duration-200 transform hover:scale-105">
              <span className="bg-white/10 rounded-lg p-2">My Shop</span>
            </Link>

            <div className="hidden md:flex flex-1 max-w-2xl mx-8">
              <div className="relative w-full group">
                <input
                  ref={searchRef}
                  type="text"
                  placeholder="Search products..."
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                  className={`w-full py-2.5 px-4 pr-12 rounded-xl text-gray-900 placeholder-gray-500 bg-white/95 
                    border-2 outline-none transition-all duration-200
                    ${
                      isSearchFocused
                        ? "border-blue-400 shadow-lg bg-white"
                        : "border-transparent hover:border-blue-300"
                    }`}
                />
                <button
                  className={`absolute right-0 top-0 h-full px-4 
                    transition-colors duration-200 rounded-r-xl
                    ${
                      isSearchFocused
                        ? "text-blue-600"
                        : "text-gray-500 hover:text-gray-700"
                    }`}>
                  <Search className="h-5 w-5" />
                </button>
              </div>
            </div>

            <nav className="hidden md:flex items-center space-x-6">
              {userRole === "business" && businessUrl && (
                <Link
                  to={`/business/${businessUrl}`}
                  className="flex items-center space-x-2 text-white hover:text-white/90 transition-colors">
                  <Building2 className="h-5 w-5" />
                  <span>My Store</span>
                </Link>
              )}

              <Link
                to="/cart"
                className="relative p-2 hover:bg-white/10 rounded-lg transition-all duration-200 hover:scale-105"
                aria-label="Shopping Cart">
                <ShoppingCart className="h-6 w-6" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center animate-pulse">
                  {allCart}
                </span>
              </Link>

              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center space-x-2 py-2 px-4 hover:bg-white/10 rounded-lg transition-all duration-200"
                  aria-expanded={isDropdownOpen}
                  aria-haspopup="true">
                  <User className="h-5 w-5" />
                  <span className="font-medium">Account</span>
                  <ChevronDown
                    className={`h-4 w-4 transition-transform duration-200 ${
                      isDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl py-2 z-50 transform opacity-100 scale-100 transition-all duration-200 origin-top-right">
                    {logged ? (
                      <>
                        <Link
                          to="/account"
                          className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors">
                          <span>Account</span>
                        </Link>
                        {userRole === "admin" && (
                          <Link
                            to="/admin"
                            className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors">
                            <span>Admin Dashboard</span>
                          </Link>
                        )}
                        <Link
                          to="/account"
                          className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors">
                          <span>Logout</span>
                        </Link>
                      </>
                    ) : (
                      <>
                        <Link
                          to="/login"
                          className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors">
                          <span>Login</span>
                        </Link>
                        <Link
                          to="/signup"
                          className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors">
                          <span>Sign Up</span>
                        </Link>
                      </>
                    )}
                  </div>
                )}
              </div>
            </nav>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 hover:bg-white/10 rounded-lg transition-colors"
              aria-expanded={isMobileMenuOpen}
              aria-label="Toggle menu">
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed inset-0 bg-gray-900/50 backdrop-blur-sm transition-opacity duration-200 
          ${
            isMobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        aria-hidden={!isMobileMenuOpen}
        onClick={() => setIsMobileMenuOpen(false)}>
        <div
          className={`absolute right-0 top-0 h-full w-64 bg-white shadow-xl transition-transform duration-300 transform
            ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"}`}
          onClick={(e) => e.stopPropagation()}>
          <div className="p-4 border-b">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full px-4 py-2 pr-10 rounded-lg text-gray-900 placeholder-gray-500 bg-gray-50 border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
              />
              <button className="absolute right-0 top-0 h-full px-4 text-gray-500 hover:text-gray-700 transition-colors">
                <Search className="h-5 w-5" />
              </button>
            </div>
          </div>

          <nav className="p-4">
            {userRole === "business" && businessUrl && (
              <Link
                to={`/business/${businessUrl}`}
                className="flex items-center space-x-2 w-full p-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}>
                <Building2 className="h-5 w-5" />
                <span>My Store</span>
              </Link>
            )}

            <Link
              to="/cart"
              className="flex items-center space-x-2 w-full p-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}>
              <ShoppingCart className="h-5 w-5" />
              <span>Cart</span>
              <span className="ml-auto bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                {allCart}
              </span>
            </Link>

            {logged ? (
              <>
                <Link
                  to="/account"
                  className="flex items-center space-x-2 w-full p-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors mt-2"
                  onClick={() => setIsMobileMenuOpen(false)}>
                  <User className="h-5 w-5" />
                  <span>Account</span>
                </Link>
                {userRole === "admin" && (
                  <Link
                    to="/admin"
                    className="flex items-center space-x-2 w-full p-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}>
                    <span>Admin Dashboard</span>
                  </Link>
                )}
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="flex items-center space-x-2 w-full p-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors mt-2"
                  onClick={() => setIsMobileMenuOpen(false)}>
                  <User className="h-5 w-5" />
                  <span>Login</span>
                </Link>
                <Link
                  to="/signup"
                  className="flex items-center space-x-2 w-full p-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}>
                  <span>Sign Up</span>
                </Link>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;

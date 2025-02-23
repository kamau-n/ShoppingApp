import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Search, ShoppingCart, ChevronDown, User } from "lucide-react";

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <header className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white py-4 px-6 shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold tracking-tight hover:text-white/90 transition-colors">
          La Doche
        </Link>

        {/* Search Bar */}
        <div className="flex-1 max-w-2xl mx-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="w-full py-2 px-4 pr-10 rounded-lg text-gray-900 placeholder-gray-500 bg-white/95 focus:bg-white border-2 border-transparent focus:border-blue-300 outline-none transition-all"
            />
            <button className="absolute right-0 top-0 h-full px-4 text-gray-500 hover:text-gray-700 transition-colors">
              <Search className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-6">
          {/* Cart */}
          <Link
            to="/Orders"
            className="relative p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <ShoppingCart className="h-6 w-6" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
              0
            </span>
          </Link>

          {/* Account Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center space-x-2 py-2 px-4 hover:bg-white/10 rounded-lg transition-colors"
            >
              <User className="h-5 w-5" />
              <span className="font-medium">Account</span>
              <ChevronDown className="h-4 w-4" />
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50 animate-fadeIn">
                <Link
                  to="/login"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
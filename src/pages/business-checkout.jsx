import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../config/config";
import TopNav from "../components/TopNav";
import Footer from "../components/Footer";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { ChevronLeft, X } from "lucide-react";

const BusinessCheckout = () => {
  const { businessUrl } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  const [business, setBusiness] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [inputs, setInputs] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    county: "",
  });

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        // Fetch user details from Firestore
        const usersRef = collection(db, "Users");
        const q = query(usersRef, where("user_id", "==", currentUser.uid));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const userData = querySnapshot.docs[0].data();
          setUser(userData);
          // Pre-fill form with user data
          setInputs({
            first_name: userData.user_first_name || "",
            last_name: userData.user_last_name || "",
            email: userData.user_email || "",
            phone: userData.phoneNumber || "",
            address: userData.user_address || "",
            city: userData.user_city || "",
            county: userData.user_county || "",
          });
        }
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchBusiness = async () => {
      try {
        const businessRef = collection(db, "business_profiles");
        const businessQuery = query(
          businessRef,
          where("business_url", "==", businessUrl)
        );
        const businessSnapshot = await getDocs(businessQuery);

        if (!businessSnapshot.empty) {
          const businessData = businessSnapshot.docs[0].data();
          setBusiness(businessData);
        } else {
          setError("Business not found");
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching business:", error);
        setError("Failed to load business details");
        setLoading(false);
      }
    };

    fetchBusiness();
  }, [businessUrl]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add your order submission logic here
    // This could include creating an order in Firestore
    // and handling payment processing
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <TopNav />
        <div className="flex items-center justify-center h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <TopNav />
        <div className="flex flex-col items-center justify-center h-[60vh]">
          <div className="text-red-500 text-xl font-semibold mb-4">{error}</div>
          <button
            onClick={() => navigate(-1)}
            className="text-blue-600 hover:text-blue-800 font-medium flex items-center">
            <ChevronLeft className="h-5 w-5 mr-1" />
            Go Back
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <TopNav />

      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex items-center mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-blue-600 hover:text-blue-800 transition-colors">
            <ChevronLeft className="h-5 w-5 mr-1" />
            <span className="font-medium">Back to Cart</span>
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h1 className="text-2xl font-semibold text-gray-900">Checkout</h1>
            <p className="text-gray-600">
              Complete your order from {business?.business_name}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  name="first_name"
                  value={inputs.first_name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  name="last_name"
                  value={inputs.last_name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={inputs.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={inputs.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  value={inputs.address}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  City
                </label>
                <input
                  type="text"
                  name="city"
                  value={inputs.city}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  County
                </label>
                <input
                  type="text"
                  name="county"
                  value={inputs.county}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
            </div>

            <div className="mt-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Order Summary
              </h2>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">
                    KSH {(state?.total - state?.shipping).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">
                    KSH {state?.shipping.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between pt-2 border-t border-gray-200">
                  <span className="font-medium text-gray-900">Total</span>
                  <span className="font-medium text-gray-900">
                    KSH {state?.total.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                Place Order
              </button>
            </div>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default BusinessCheckout;

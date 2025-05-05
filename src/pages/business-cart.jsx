import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { ShoppingBag, X, ChevronLeft, Trash2 } from "lucide-react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../config/config";
import TopNav from "../components/TopNav";
import Footer from "../components/Footer";

const BusinessCart = () => {
  const { businessUrl } = useParams();
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [business, setBusiness] = useState(null);
  const [value, setValue] = useState(0);
  const [total, setTotal] = useState(0);
  const [shipping, setShipping] = useState(300);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    const fetchBusinessAndCart = async () => {
      try {
        // Get business details
        const businessRef = collection(db, "business_profiles");
        const businessQuery = query(
          businessRef,
          where("business_url", "==", businessUrl)
        );
        const businessSnapshot = await getDocs(businessQuery);

        if (!businessSnapshot.empty) {
          const businessData = businessSnapshot.docs[0].data();
          setBusiness(businessData);

          // Get cart items for this business
          const cart = localStorage.getItem(`${businessUrl}_cart`);
          if (cart) {
            const cartItems = JSON.parse(cart);
            setItems(cartItems);
            getTotal(cartItems);
            setTotal(cartItems.length);
          }
        }
      } catch (error) {
        console.error("Error fetching business data:", error);
      }
    };

    fetchBusinessAndCart();
  }, [businessUrl]);

  const removeItem = (name, data) => {
    const index = data.indexOf(name);
    const newData = data.splice(index, 1);
    localStorage.removeItem(`${businessUrl}_cart`);
    localStorage.setItem(`${businessUrl}_cart`, JSON.stringify(newData));
    setItems(newData);
    getTotal(newData);
    setTotal(newData.length);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  const getTotal = (data) => {
    let totalForAll = 0;
    if (data?.length > 0) {
      data.forEach((item) => {
        const totalForOne = item.name.price * item.name.quantity;
        totalForAll += totalForOne;
      });
      setValue(totalForAll);
    }
  };

  const handleCheckout = () => {
    if (shipping !== 0) {
      navigate(`/business/${businessUrl}/checkout`, {
        state: {
          shipping: shipping,
          total: Number(value) + Number(shipping),
        },
      });
    } else {
      alert("Please select a shipping method");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <TopNav />

      {/* Alert */}
      <div
        className={`fixed top-0 right-4 transition-transform duration-300 transform ${
          showAlert ? "translate-y-0 top-12" : "-translate-y-full"
        }`}>
        <div className="bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center">
          <X className="w-5 h-5 mr-2" />
          <span>Item removed from cart</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex items-center mb-8">
          <Link
            to={`/business/${businessUrl}`}
            className="flex items-center text-blue-600 hover:text-blue-800 transition-colors">
            <ChevronLeft className="h-5 w-5 mr-1" />
            <span className="font-medium">Continue Shopping</span>
          </Link>
        </div>

        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <div className="flex items-center">
                  <ShoppingBag className="h-6 w-6 text-gray-400 mr-3" />
                  <h2 className="text-xl font-semibold text-gray-900">
                    Shopping Cart ({total} items)
                  </h2>
                </div>
              </div>

              <div className="divide-y divide-gray-200">
                {items?.map((item, index) => {
                  const total = item.name.price * item.name.quantity;
                  return (
                    <div key={index} className="p-6 flex items-center">
                      <img
                        src={item.name.link}
                        alt={item.name.name}
                        className="w-24 h-24 object-cover rounded-lg"
                      />
                      <div className="ml-6 flex-1">
                        <h3 className="text-lg font-medium text-gray-900">
                          {item.name.name}
                        </h3>
                        <div className="mt-1 flex items-center text-sm text-gray-500">
                          <span>Quantity: {item.name.quantity}</span>
                          <span className="mx-2">•</span>
                          <span>KSH {item.name.price.toLocaleString()}</span>
                        </div>
                        <div className="mt-2 text-sm font-medium text-gray-900">
                          Total: KSH {total.toLocaleString()}
                        </div>
                      </div>
                      <button
                        onClick={() => removeItem(item.name.name, items)}
                        className="ml-4 p-2 text-gray-400 hover:text-red-500 transition-colors">
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  );
                })}

                {items.length === 0 && (
                  <div className="p-8 text-center">
                    <ShoppingBag className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      Your cart is empty
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Add some items to your cart to continue shopping
                    </p>
                    <Link
                      to={`/business/${businessUrl}`}
                      className="text-blue-600 hover:text-blue-700 font-medium">
                      Browse products
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Summary */}
          <div className="lg:col-span-4 mt-8 lg:mt-0">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">
                  Order Summary
                </h2>
              </div>

              <div className="px-6 py-4">
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Items ({total})</span>
                    <span className="font-medium text-gray-900">
                      KSH {value?.toLocaleString()}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Shipping Method
                    </label>
                    <select
                      className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      value={shipping}
                      onChange={(e) => setShipping(Number(e.target.value))}>
                      <option value={0}>Select Shipping Method</option>
                      <option value={300}>Normal Delivery - KSH 300</option>
                      <option value={500}>Standard Delivery - KSH 500</option>
                      <option value={800}>Fast Delivery - KSH 800</option>
                    </select>
                  </div>

                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex justify-between">
                      <span className="text-base font-medium text-gray-900">
                        Order Total
                      </span>
                      <span className="text-base font-medium text-gray-900">
                        KSH{" "}
                        {(Number(value) + Number(shipping)).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleCheckout}
                  disabled={items.length === 0}
                  className={`mt-6 w-full py-3 px-4 rounded-lg text-white font-medium transition-colors ${
                    items.length === 0
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700"
                  }`}>
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default BusinessCart;

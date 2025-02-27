import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingBag, X, ChevronLeft, Trash2 } from "lucide-react";
import TopNav from "../components/TopNav";
import Footer from "../components/Footer";

const Cart = () => {
  const [items, setItems] = useState([]);
  const [value, setValue] = useState(0);
  const [total, setTotal] = useState(0);
  const [shipping, setShipping] = useState(300); // Default to normal delivery
  const [refreshData, setRefreshData] = useState(false);
  const navigate = useNavigate();

  const allStorage = () => {
    const cart = localStorage.getItem("ladoche_shopping_cart");
    const data = JSON.parse(cart);
    setItems(data);
    getTotal(data);
    setTotal(data?.length);
  };

  const removeItem = (name, data) => {
    const index = data.indexOf(name);
    const new_data = data.splice(index, 1);
    localStorage.removeItem("ladoche_shopping_cart");
    localStorage.setItem("ladoche_shopping_cart", JSON.stringify(new_data));
    setRefreshData(!refreshData);
  };

  const getTotal = (data) => {
    let total_for_all = 0;
    if (data?.length > 0) {
      data.forEach((y) => {
        let total_for_one = y.name.price * y.name.quantity;
        total_for_all = total_for_one + total_for_all;
      });
      setValue(total_for_all);
    }
  };

  useEffect(() => {
    allStorage();
  }, [total]);

  const handleCheckout = () => {
    if (shipping !== 0) {
      navigate("/billing", {
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
      
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex items-center mb-8">
          <Link
            to="/"
            className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
          >
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
                  <h2 className="text-xl font-semibold text-gray-900">Shopping Cart ({total} items)</h2>
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
                        <h3 className="text-lg font-medium text-gray-900">{item.name.name}</h3>
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
                        className="ml-4 p-2 text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Summary */}
          <div className="lg:col-span-4 mt-8 lg:mt-0">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">Order Summary</h2>
              </div>
              
              <div className="px-6 py-4">
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Items ({total})</span>
                    <span className="font-medium text-gray-900">KSH {value?.toLocaleString()}</span>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Shipping Method
                    </label>
                    <select
                      className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      value={shipping}
                      onChange={(e) => setShipping(Number(e.target.value))}
                    >
                      <option value={300}>Normal Delivery - KSH 300</option>
                      <option value={500}>Standard Delivery - KSH 500</option>
                      <option value={800}>Fast Delivery - KSH 800</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Coupon Code
                    </label>
                    <input
                      type="text"
                      placeholder="Enter code"
                      className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>

                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex justify-between">
                      <span className="text-base font-medium text-gray-900">Order Total</span>
                      <span className="text-base font-medium text-gray-900">
                        KSH {(Number(value) + Number(shipping)).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleCheckout}
                  className="mt-6 w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                >
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

export default Cart;
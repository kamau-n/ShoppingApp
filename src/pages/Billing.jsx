import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { CreditCard, Wallet, ChevronLeft, X } from "lucide-react";
import axios from "axios";

import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe("your-publishable-key-here");

export default function Billing() {
  const [inputs, setInputs] = useState({});
  const { state } = useLocation();
  const [message, setMessages] = useState("");
  const [showOverlay, setShowOverlay] = useState(false);
  const [items, setItems] = useState([]);
  const [value, setValue] = useState(0);
  const [total, setTotal] = useState(0);

  const handleStripePayment = async () => {
    const stripe = await stripePromise;
    try {
      const response = await axios.post("/create-checkout-session", {
        items: items,
      });
      const result = await stripe.redirectToCheckout({ sessionId: response.data.id });
      if (result.error) {
        setMessages(result.error.message);
      }
    } catch (error) {
      console.error("Stripe checkout error:", error);
      setMessages("Payment processing failed. Please try again.");
    }
  };

  


  const getTotal = (data) => {
    let total_for_all = 0;
    if (data.length > 0) {
      data.forEach((y) => {
        let total_for_one = y.name.price * y.name.quantity;
        total_for_all = total_for_one + total_for_all;
      });
      setValue(total_for_all);
    }
  };



  const allStorage = () => {
    const cart = localStorage.getItem("ladoche_shopping_cart");
    const data = JSON.parse(cart);
    setItems(data);
    console.log("This are all the items in the cart",data)
    getTotal(data);
    setTotal(data.length);
  };

  const toggleOverlay = () => {
    setShowOverlay(!showOverlay);
  };



  const checkProperties = (obj) => {
    for (var key in obj) {
      if (obj[key] !== null && obj[key] !== "") return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (checkProperties(inputs)) {
      setMessages("Please fill in all required fields");
      return;
    }

    try {
      const response = await axios.post("https://stkpush.kamauharrison.co.ke/stkPush", {
        amount: state.total,
        phone: inputs.contact,
        desc: "order"+ new Date().getTime(),
        account_ref: "order"+ new Date().getTime(),
      });
      console.log(response);
      if(response.status==200)
      {
        setMessages(response.data?.ResponseDescription)
        toggleOverlay()

      }
      else {
        setMessages("Payment Process Failed ,Please Retry")
            toggleOverlay()
      }

      
    } catch (error) {
      console.error(error);
      setMessages("Payment processing failed. Please try again.");
          toggleOverlay()
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setMessages("");
    setInputs((values) => ({ ...values, [name]: value }));
  };

  useEffect(() => {
    allStorage();
  }, [total]);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center mb-8">
          <Link
            to="/cart"
            className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
          >
            <ChevronLeft className="h-5 w-5 mr-1" />
            <span className="font-medium">Back to Cart</span>
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h1 className="text-2xl font-semibold text-gray-900">Checkout</h1>
          </div>

          <div className="p-6">
            {message && (
              <div className="mb-6 bg-red-50 text-red-700 p-4 rounded-lg flex items-center">
                <span className="flex-1">{message}</span>
                <button onClick={() => setMessages("")} className="text-red-500 hover:text-red-700">
                  <X className="h-5 w-5" />
                </button>
              </div>
            )}

            <div className="space-y-8">
              {/* Billing Details */}
              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Billing Details</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      name="first_name"
                      value={inputs.first_name || ""}
                      onChange={handleChange}
                      className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="last_name"
                      value={inputs.last_name || ""}
                      onChange={handleChange}
                      className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      County/Region
                    </label>
                    <input
                      type="text"
                      name="region"
                      value={inputs.region || ""}
                      onChange={handleChange}
                      className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="text"
                      name="contact"
                      value={inputs.contact || ""}
                      onChange={handleChange}
                      placeholder="254..."
                      className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Address
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={inputs.address || ""}
                      onChange={handleChange}
                      className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={inputs.email || ""}
                      onChange={handleChange}
                      className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </section>

              {/* Order Summary */}
              <section className="bg-gray-50 rounded-xl p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Order Summary</h2>
                <div className="space-y-3">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>KSH {(state.total - state.shipping).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span>KSH {state.shipping.toLocaleString()}</span>
                  </div>
                  <div className="pt-3 border-t border-gray-200">
                    <div className="flex justify-between text-lg font-semibold text-gray-900">
                      <span>Total</span>
                      <span>KSH {state.total.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </section>

              {/* Payment Methods */}
              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Payment Method</h2>
                <div className="space-y-4">
                  <button
                    onClick={toggleOverlay}
                    className="w-full flex items-center justify-center space-x-2 bg-green-600 text-white py-4 px-6 rounded-lg font-medium hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
                  >
                    <Wallet className="h-5 w-5" />
                    <span>Pay with M-PESA</span>
                  </button>
                  <button
                  onClick={handleStripePayment}
                    className="w-full flex items-center justify-center space-x-2 bg-blue-600 text-white py-4 px-6 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                  >
                    <CreditCard className="h-5 w-5" />
                    <span>Pay with Card</span>
                  </button>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>

      {/* M-PESA Payment Modal */}
      {showOverlay && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-screen items-center justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div className="absolute right-0 top-0 pr-4 pt-4">
                <button
                  onClick={toggleOverlay}
                  className="text-gray-400 hover:text-gray-500 focus:outline-none"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              
              <div className="mt-3 text-center sm:mt-0 sm:text-left">
                <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
                  M-PESA Payment
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="text"
                      readOnly
                      value={inputs.contact || ""}
                      className="w-full text-center py-3 text-lg font-medium bg-gray-50 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Amount
                    </label>
                    <input
                      type="text"
                      readOnly
                      value={`KSH ${state.total.toLocaleString()}`}
                      className="w-full text-center py-3 text-lg font-medium bg-gray-50 rounded-lg"
                    />
                  </div>
                  <button
                    onClick={handleSubmit}
                    className="w-full bg-green-600 text-white py-4 px-6 rounded-lg font-medium hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
                  >
                    Confirm Payment
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

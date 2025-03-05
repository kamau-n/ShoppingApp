"use client"

import { useEffect, useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { CreditCard, Wallet, ChevronLeft, X, CheckCircle, AlertCircle, Loader } from "lucide-react"
import axios from "axios"

import { loadStripe } from "@stripe/stripe-js"
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { collection, addDoc, serverTimestamp } from "firebase/firestore"
import { db } from "../config/config" // Adjust the path as needed

// Replace with your actual publishable key from Stripe dashboard
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ||
    "pk_test_51QwP4hDCmUMKTgbXqjY44MqogUdggkakGTU3ZDTTCImGsa53XZW63x7YHjGzIFAakslW14kNEWxrWdtk4bjzbSQP00RZmOxwrX",
)

// Card payment form component
function CardPaymentForm({ amount, items, billingDetails, onSuccess, onCancel, authUser }) {
  const stripe = useStripe()
  const elements = useElements()
  const [processing, setProcessing] = useState(false)
  const [error, setError] = useState(null)
  const auth = getAuth()

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!stripe || !elements) {
      return
    }

    setProcessing(true)
    setError(null)

    try {
      // Create payment method
      const { error: paymentMethodError, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: elements.getElement(CardElement),
        billing_details: {
          name: `${billingDetails.first_name} ${billingDetails.last_name}`,
          email: billingDetails.email,
          phone: billingDetails.contact,
          address: {
            line1: billingDetails.address,
            city: billingDetails.region,
          },
        },
      })

      if (paymentMethodError) {
        setError(paymentMethodError.message)
        setProcessing(false)
        return
      }

      // In a real implementation, you would send this to your server to create a payment intent
      // For now, we'll simulate a successful payment

      // Save order to Firestore
      const orderData = {
        CustomerID: authUser.uid,
        paymentMethod: "card",
        paymentMethodId: paymentMethod.id,
        amount: amount,
        items: items,
        delivered: false,
        billingDetails: billingDetails,
        paid: true,
        time: serverTimestamp(),
      }

      await addDoc(collection(db, "Orders"), orderData)

      // Clear cart
      localStorage.removeItem("ladoche_shopping_cart")

      setProcessing(false)
      onSuccess(paymentMethod.id)
    } catch (err) {
      console.error("Payment error:", err)
      setError("An unexpected error occurred. Please try again.")
      setProcessing(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="p-5 border border-gray-200 rounded-xl bg-white shadow-sm">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                fontWeight: "500",
                color: "#334155",
                fontFamily: "'Inter', system-ui, sans-serif",
                "::placeholder": {
                  color: "#94a3b8",
                },
                iconColor: "#6366f1",
              },
              invalid: {
                color: "#ef4444",
                iconColor: "#ef4444",
              },
            },
            hidePostalCode: true,
          }}
          className="py-2"
        />
      </div>

      {error && (
        <div className="bg-red-50 text-red-700 p-4 rounded-xl flex items-center border border-red-100">
          <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 text-red-500" />
          <span className="text-sm font-medium">{error}</span>
        </div>
      )}

      <div className="flex space-x-4 pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 px-4 py-3.5 border border-gray-300 rounded-xl text-gray-700 font-medium hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-200 focus:ring-offset-2"
          disabled={processing}
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={!stripe || processing}
          className="flex-1 px-4 py-3.5 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-70 disabled:hover:bg-indigo-600 flex items-center justify-center"
        >
          {processing ? (
            <>
              <Loader className="h-5 w-5 mr-2 animate-spin" />
              Processing...
            </>
          ) : (
            `Pay KSH ${amount.toLocaleString()}`
          )}
        </button>
      </div>
    </form>
  )
}

export default function Billing() {
  const [inputs, setInputs] = useState({})
  const { state } = useLocation()
  const [message, setMessages] = useState("")
  const [messageType, setMessageType] = useState("error") // "error" or "success"
  const [showOverlay, setShowOverlay] = useState(false)
  const [showCardPayment, setShowCardPayment] = useState(false)
  const [items, setItems] = useState([])
  const [value, setValue] = useState(0)
  const [total, setTotal] = useState(0)
  const [authUser, setAuthUser] = useState(null)
  const [paymentSuccess, setPaymentSuccess] = useState(false)
  const navigate = useNavigate()

  const auth = getAuth()

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log("User", user)
      setAuthUser(user)
    })
  }, [auth])

  const handleStripePayment = async () => {
    // Validate inputs first
    if (checkProperties(inputs)) {
      setMessages("Please fill in all required fields")
      setMessageType("error")
      return
    }

    setShowCardPayment(true)
  }

  const getTotal = (data) => {
    let total_for_all = 0
    if (data.length > 0) {
      data.forEach((y) => {
        const total_for_one = y.name.price * y.name.quantity
        total_for_all = total_for_one + total_for_all
      })
      setValue(total_for_all)
    }
  }

  const allStorage = () => {
    const cart = localStorage.getItem("ladoche_shopping_cart")
    const data = JSON.parse(cart)
    setItems(data)
    console.log("This are all the items in the cart", data)
    getTotal(data)
    setTotal(data.length)
  }

  const toggleOverlay = () => {
    setShowOverlay(!showOverlay)
  }

  const checkProperties = (obj) => {
    for (var key in obj) {
      if (obj[key] !== null && obj[key] !== "") return false
    }
    return true
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (checkProperties(inputs)) {
      setMessages("Please fill in all required fields")
      setMessageType("error")
      return
    }

    try {
      const response = await axios.post("https://stkpush.kamauharrison.co.ke/stkPush", {
        amount: state.total,
        phone: inputs.contact,
        desc: "order" + new Date().getTime(),
        user: authUser.uid,
        account_ref: "My shop",
        products: items,
      })
      console.log(response)
      if (response.status == 200) {
        setMessages(response.data?.ResponseDescription)
        setMessageType("success")
        toggleOverlay()
      } else {
        setMessages("Payment Process Failed, Please Retry")
        setMessageType("error")
        toggleOverlay()
      }
    } catch (error) {
      console.error(error)
      setMessages("Payment processing failed. Please try again.")
      setMessageType("error")
      toggleOverlay()
    }
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setMessages("")
    setInputs((values) => ({ ...values, [name]: value }))
  }

  const handlePaymentSuccess = (paymentMethodId) => {
    setPaymentSuccess(true)
    setShowCardPayment(false)
    setMessages("Payment successful! Your order has been placed.")
    setMessageType("success")

    // Redirect to order confirmation page after a delay
    setTimeout(() => {
      navigate("/account", {
        state: {
          orderId: new Date().getTime().toString(),
          total: state.total,
          paymentMethod: "card",
        },
      })
    }, 2000)
  }

  useEffect(() => {
    allStorage()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 py-12 font-sans">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center mb-8">
          <Link to="/cart" className="group flex items-center text-indigo-600 hover:text-indigo-800 transition-colors">
            <ChevronLeft className="h-5 w-5 mr-1 group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">Back to Cart</span>
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100">
          <div className="px-6 py-5 border-b border-gray-100 bg-white">
            <h1 className="text-2xl font-bold text-gray-900">Complete Your Purchase</h1>
          </div>

          <div className="p-6 md:p-8">
            {message && (
              <div
                className={`mb-6 ${
                  messageType === "error"
                    ? "bg-red-50 border-red-100 text-red-700"
                    : "bg-green-50 border-green-100 text-green-700"
                } p-4 rounded-xl flex items-center border`}
              >
                {messageType === "error" ? (
                  <AlertCircle className="h-5 w-5 mr-3 flex-shrink-0 text-red-500" />
                ) : (
                  <CheckCircle className="h-5 w-5 mr-3 flex-shrink-0 text-green-500" />
                )}
                <span className="flex-1 font-medium text-sm">{message}</span>
                <button
                  onClick={() => setMessages("")}
                  className={`${
                    messageType === "error" ? "text-red-500 hover:text-red-700" : "text-green-500 hover:text-green-700"
                  } focus:outline-none`}
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            )}

            <div className="space-y-10">
              {/* Billing Details */}
              <section>
                <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                  <span className="flex items-center justify-center w-8 h-8 bg-indigo-100 text-indigo-600 rounded-full mr-3 text-sm font-bold">
                    1
                  </span>
                  Billing Details
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
                    <input
                      type="text"
                      name="first_name"
                      value={inputs.first_name || ""}
                      onChange={handleChange}
                      className="w-full rounded-xl border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 py-3 px-4"
                      placeholder="Enter your first name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
                    <input
                      type="text"
                      name="last_name"
                      value={inputs.last_name || ""}
                      onChange={handleChange}
                      className="w-full rounded-xl border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 py-3 px-4"
                      placeholder="Enter your last name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">County/Region *</label>
                    <input
                      type="text"
                      name="region"
                      value={inputs.region || ""}
                      onChange={handleChange}
                      className="w-full rounded-xl border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 py-3 px-4"
                      placeholder="Enter your county or region"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                    <input
                      type="text"
                      name="contact"
                      value={inputs.contact || ""}
                      onChange={handleChange}
                      placeholder="254..."
                      className="w-full rounded-xl border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 py-3 px-4"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Address *</label>
                    <input
                      type="text"
                      name="address"
                      value={inputs.address || ""}
                      onChange={handleChange}
                      className="w-full rounded-xl border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 py-3 px-4"
                      placeholder="Enter your delivery address"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      value={inputs.email || ""}
                      onChange={handleChange}
                      className="w-full rounded-xl border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 py-3 px-4"
                      placeholder="Enter your email address"
                    />
                  </div>
                </div>
              </section>

              {/* Order Summary */}
              <section className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                  <span className="flex items-center justify-center w-8 h-8 bg-indigo-100 text-indigo-600 rounded-full mr-3 text-sm font-bold">
                    2
                  </span>
                  Order Summary
                </h2>
                <div className="space-y-4">
                  <div className="flex justify-between text-gray-600">
                    <span className="font-medium">Subtotal</span>
                    <span className="font-semibold">KSH {(state.total - state.shipping).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span className="font-medium">Shipping</span>
                    <span className="font-semibold">KSH {state.shipping.toLocaleString()}</span>
                  </div>
                  <div className="pt-4 border-t border-gray-200">
                    <div className="flex justify-between text-lg font-bold text-gray-900">
                      <span>Total</span>
                      <span>KSH {state.total.toLocaleString()}</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">Taxes included if applicable</p>
                  </div>
                </div>
              </section>

              {/* Payment Methods */}
              <section>
                <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                  <span className="flex items-center justify-center w-8 h-8 bg-indigo-100 text-indigo-600 rounded-full mr-3 text-sm font-bold">
                    3
                  </span>
                  Payment Method
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button
                    onClick={toggleOverlay}
                    className="flex items-center justify-center space-x-3 bg-green-600 text-white py-4 px-6 rounded-xl font-medium hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors shadow-sm h-14"
                  >
                    <Wallet className="h-5 w-5" />
                    <span>Pay with M-PESA</span>
                  </button>
                  <button
                    onClick={handleStripePayment}
                    className="flex items-center justify-center space-x-3 bg-indigo-600 text-white py-4 px-6 rounded-xl font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors shadow-sm h-14"
                  >
                    <CreditCard className="h-5 w-5" />
                    <span>Pay with Card</span>
                  </button>
                </div>
                <p className="text-sm text-gray-500 mt-4">
                  By completing your purchase, you agree to our Terms of Service and Privacy Policy.
                </p>
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
            <div className="inline-block align-bottom bg-white rounded-2xl px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div className="absolute right-0 top-0 pr-4 pt-4">
                <button onClick={toggleOverlay} className="text-gray-400 hover:text-gray-500 focus:outline-none">
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="mt-3 text-center sm:mt-0 sm:text-left">
                <div className="flex items-center mb-6">
                  <div className="bg-green-100 rounded-full p-2 mr-3">
                    <Wallet className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">M-PESA Payment</h3>
                </div>
                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                    <input
                      type="text"
                      readOnly
                      value={inputs.contact || ""}
                      className="w-full text-center py-3.5 text-lg font-medium bg-gray-50 rounded-xl border border-gray-200"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Amount</label>
                    <input
                      type="text"
                      readOnly
                      value={`KSH ${state.total.toLocaleString()}`}
                      className="w-full text-center py-3.5 text-lg font-medium bg-gray-50 rounded-xl border border-gray-200"
                    />
                  </div>
                  <p className="text-sm text-gray-500 bg-yellow-50 p-3 rounded-lg border border-yellow-100">
                    You will receive a prompt on your phone to complete the payment. Please enter your M-PESA PIN when
                    prompted.
                  </p>
                  <button
                    onClick={handleSubmit}
                    className="w-full bg-green-600 text-white py-4 px-6 rounded-xl font-medium hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors shadow-sm"
                  >
                    Confirm Payment
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Card Payment Modal */}
      {showCardPayment && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-screen items-center justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            <div className="inline-block align-bottom bg-white rounded-2xl px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div className="absolute right-0 top-0 pr-4 pt-4">
                <button
                  onClick={() => setShowCardPayment(false)}
                  className="text-gray-400 hover:text-gray-500 focus:outline-none"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="mt-3 text-center sm:mt-0 sm:text-left">
                <div className="flex items-center mb-6">
                  <div className="bg-indigo-100 rounded-full p-2 mr-3">
                    <CreditCard className="h-6 w-6 text-indigo-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Card Payment</h3>
                </div>
                <Elements stripe={stripePromise}>
                  <CardPaymentForm
                    amount={state.total}
                    items={items}
                    billingDetails={inputs}
                    onSuccess={handlePaymentSuccess}
                    onCancel={() => setShowCardPayment(false)}
                    authUser={authUser}
                  />
                </Elements>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Payment Success Message */}
      {paymentSuccess && (
        <div className="fixed bottom-4 right-4 bg-green-50 border border-green-100 text-green-700 p-4 rounded-xl shadow-lg z-50 max-w-md animate-fade-in">
          <div className="flex items-center">
            <div className="bg-green-100 rounded-full p-2 mr-3 flex-shrink-0">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="font-bold">Payment Successful!</p>
              <p className="text-sm">Your order has been placed and is being processed.</p>
            </div>
            <button onClick={() => setPaymentSuccess(false)} className="ml-4 text-green-500 hover:text-green-700">
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}


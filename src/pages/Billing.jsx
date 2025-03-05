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
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "pk_test_51QwP4hDCmUMKTgbXqjY44MqogUdggkakGTU3ZDTTCImGsa53XZW63x7YHjGzIFAakslW14kNEWxrWdtk4bjzbSQP00RZmOxwrX")

// Card payment form component
function CardPaymentForm({ amount, items, billingDetails, onSuccess, onCancel }) {
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
        CustomerID: user?.uid,
        paymentMethod: "card",
        paymentMethodId: paymentMethod.id,
        amount: amount,
        items: items,
        delivered:false,
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
      <div className="p-4 border border-gray-300 rounded-lg">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
      </div>

      {error && (
        <div className="bg-red-50 text-red-700 p-4 rounded-lg flex items-center">
          <AlertCircle className="h-5 w-5 mr-2" />
          <span>{error}</span>
        </div>
      )}

      <div className="flex space-x-4">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          disabled={processing}
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={!stripe || processing}
          className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
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
      navigate("/order-confirmation", {
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
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center mb-8">
          <Link to="/cart" className="flex items-center text-blue-600 hover:text-blue-800 transition-colors">
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
              <div
                className={`mb-6 ${messageType === "error" ? "bg-red-50 text-red-700" : "bg-green-50 text-green-700"} p-4 rounded-lg flex items-center`}
              >
                <span className="flex-1">{message}</span>
                <button
                  onClick={() => setMessages("")}
                  className={`${messageType === "error" ? "text-red-500 hover:text-red-700" : "text-green-500 hover:text-green-700"}`}
                >
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
                    <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                    <input
                      type="text"
                      name="first_name"
                      value={inputs.first_name || ""}
                      onChange={handleChange}
                      className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                    <input
                      type="text"
                      name="last_name"
                      value={inputs.last_name || ""}
                      onChange={handleChange}
                      className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">County/Region</label>
                    <input
                      type="text"
                      name="region"
                      value={inputs.region || ""}
                      onChange={handleChange}
                      className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
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
                    <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                    <input
                      type="text"
                      name="address"
                      value={inputs.address || ""}
                      onChange={handleChange}
                      className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
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
                <button onClick={toggleOverlay} className="text-gray-400 hover:text-gray-500 focus:outline-none">
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="mt-3 text-center sm:mt-0 sm:text-left">
                <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">M-PESA Payment</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                    <input
                      type="text"
                      readOnly
                      value={inputs.contact || ""}
                      className="w-full text-center py-3 text-lg font-medium bg-gray-50 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Amount</label>
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

      {/* Card Payment Modal */}
      {showCardPayment && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-screen items-center justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div className="absolute right-0 top-0 pr-4 pt-4">
                <button
                  onClick={() => setShowCardPayment(false)}
                  className="text-gray-400 hover:text-gray-500 focus:outline-none"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="mt-3 text-center sm:mt-0 sm:text-left">
                <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">Card Payment</h3>
                <Elements stripe={stripePromise}>
                  <CardPaymentForm
                    amount={state.total}
                    items={items}
                    billingDetails={inputs}
                    onSuccess={handlePaymentSuccess}
                    onCancel={() => setShowCardPayment(false)}
                  />
                </Elements>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Payment Success Message */}
      {paymentSuccess && (
        <div className="fixed bottom-4 right-4 bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded shadow-md z-50">
          <div className="flex items-center">
            <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
            <div>
              <p className="font-bold">Payment Successful!</p>
              <p className="text-sm">Your order has been placed.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}


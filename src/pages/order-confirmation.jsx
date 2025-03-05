"use client"

import { useEffect, useState } from "react"
import { Link, useLocation, useSearchParams } from "react-router-dom"
import { CheckCircle, ChevronLeft, Package, Truck } from "lucide-react"
import { getAuth } from "firebase/auth"
import { collection, query, where, getDocs } from "firebase/firestore"
import { db } from "../config/config" // Adjust the path as needed

export default function OrderConfirmation() {
  const [searchParams] = useSearchParams()
  const { state } = useLocation()
  const [orderDetails, setOrderDetails] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        setLoading(true)

        // If we have state from direct navigation (card payment in our app)
        if (state && state.orderId) {
          setOrderDetails({
            id: state.orderId,
            total: state.total,
            paymentMethod: state.paymentMethod,
            status: "processing",
            date: new Date().toLocaleDateString(),
          })
          setLoading(false)
          return
        }

        // If we have a session_id from Stripe redirect
        const sessionId = searchParams.get("session_id")
        if (sessionId) {
          // In a real app, you would verify the session with Stripe
          // and fetch the order details from your database

          // For now, we'll just create a placeholder
          setOrderDetails({
            id: sessionId.substring(0, 8),
            total: 0, // This would come from your database
            paymentMethod: "card",
            status: "processing",
            date: new Date().toLocaleDateString(),
          })
          setLoading(false)
          return
        }

        // If we don't have either, try to get the most recent order
        const auth = getAuth()
        if (auth.currentUser) {
          const ordersRef = collection(db, "Orders")
          const q = query(
            ordersRef,
            where("user", "==", auth.currentUser.uid),
            // orderBy("createdAt", "desc"),
            // limit(1)
          )

          const querySnapshot = await getDocs(q)
          if (!querySnapshot.empty) {
            const orderDoc = querySnapshot.docs[0]
            const orderData = orderDoc.data()

            setOrderDetails({
              id: orderDoc.id,
              total: orderData.amount,
              paymentMethod: orderData.paymentMethod,
              status: orderData.status,
              date: orderData.createdAt
                ? new Date(orderData.createdAt.toDate()).toLocaleDateString()
                : new Date().toLocaleDateString(),
            })
          }
        }

        setLoading(false)
      } catch (error) {
        console.error("Error fetching order details:", error)
        setLoading(false)
      }
    }

    fetchOrderDetails()
  }, [searchParams, state])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading order details...</p>
        </div>
      </div>
    )
  }

  if (!orderDetails) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden p-8 text-center">
            <h1 className="text-2xl font-semibold text-gray-900 mb-4">No Order Found</h1>
            <p className="text-gray-600 mb-6">We couldn't find any order details.</p>
            <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors">
              <ChevronLeft className="h-5 w-5 mr-1" />
              <span className="font-medium">Return to Home</span>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="p-8 text-center border-b border-gray-200">
            <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Thank You!</h1>
            <p className="text-lg text-gray-600">Your order has been received</p>
          </div>

          <div className="p-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              <div>
                <p className="text-sm text-gray-500 mb-1">Order Number</p>
                <p className="font-medium">{orderDetails.id}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Date</p>
                <p className="font-medium">{orderDetails.date}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Total</p>
                <p className="font-medium">KSH {orderDetails.total?.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Payment Method</p>
                <p className="font-medium capitalize">{orderDetails.paymentMethod}</p>
              </div>
            </div>

            <div className="border border-gray-200 rounded-lg p-6 mb-8">
              <h2 className="text-lg font-semibold mb-4">Order Status</h2>
              <div className="relative">
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>
                <div className="space-y-8">
                  <div className="relative flex items-start">
                    <div className="flex-shrink-0 h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center z-10">
                      <CheckCircle className="h-5 w-5 text-white" />
                    </div>
                    <div className="ml-4 pt-0.5">
                      <h3 className="font-medium">Order Placed</h3>
                      <p className="text-sm text-gray-500">Your order has been placed and is being processed.</p>
                    </div>
                  </div>
                  <div className="relative flex items-start">
                    <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center z-10">
                      <Package className="h-5 w-5 text-gray-500" />
                    </div>
                    <div className="ml-4 pt-0.5">
                      <h3 className="font-medium">Processing</h3>
                      <p className="text-sm text-gray-500">Your order is being prepared for shipping.</p>
                    </div>
                  </div>
                  <div className="relative flex items-start">
                    <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center z-10">
                      <Truck className="h-5 w-5 text-gray-500" />
                    </div>
                    <div className="ml-4 pt-0.5">
                      <h3 className="font-medium">Shipped</h3>
                      <p className="text-sm text-gray-500">Your order will be delivered soon.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center">
              <Link
                to="/"
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


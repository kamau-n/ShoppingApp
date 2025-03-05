// This file contains utility functions for Stripe payment processing

// Function to create a payment intent on your server
export const createPaymentIntent = async (amount, currency = "usd") => {
    try {
      // In a real implementation, this would be a call to your backend API
      // which would then create a payment intent with Stripe
      const response = await fetch("/api/create-payment-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount,
          currency,
        }),
      })
  
      if (!response.ok) {
        throw new Error("Network response was not ok")
      }
  
      return await response.json()
    } catch (error) {
      console.error("Error creating payment intent:", error)
      throw error
    }
  }
  
  // Function to save payment method for future use
  export const savePaymentMethod = async (paymentMethodId, userId) => {
    try {
      // In a real implementation, this would be a call to your backend API
      const response = await fetch("/api/save-payment-method", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          paymentMethodId,
          userId,
        }),
      })
  
      if (!response.ok) {
        throw new Error("Network response was not ok")
      }
  
      return await response.json()
    } catch (error) {
      console.error("Error saving payment method:", error)
      throw error
    }
  }
  
  // Function to get saved payment methods for a user
  export const getSavedPaymentMethods = async (userId) => {
    try {
      // In a real implementation, this would be a call to your backend API
      const response = await fetch(`/api/payment-methods?userId=${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
  
      if (!response.ok) {
        throw new Error("Network response was not ok")
      }
  
      return await response.json()
    } catch (error) {
      console.error("Error fetching payment methods:", error)
      throw error
    }
  }
  
  
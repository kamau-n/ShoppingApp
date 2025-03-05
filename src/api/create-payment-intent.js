// This is a server-side API route for creating a Stripe payment intent
// In a real implementation, this would be in your backend

import Stripe from "stripe"

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" })
  }

  try {
    const { amount, currency = "usd" } = req.body

    // Initialize Stripe with your secret key
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

    // Create a PaymentIntent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Stripe expects amount in cents
      currency,
      // In a real app, you might want to store customer information
      // customer: customerId,
      automatic_payment_methods: {
        enabled: true,
      },
    })

    // Return the client secret to the client
    res.status(200).json({
      clientSecret: paymentIntent.client_secret,
    })
  } catch (error) {
    console.error("Error creating payment intent:", error)
    res.status(500).json({
      error: "Failed to create payment intent",
      details: error.message,
    })
  }
}


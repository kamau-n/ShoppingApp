// This is a server-side API route for saving a payment method
// In a real implementation, this would be in your backend

import Stripe from "stripe"
import { db } from "../../config/config"
import { collection, addDoc } from "firebase/firestore"

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" })
  }

  try {
    const { paymentMethodId, userId } = req.body

    if (!paymentMethodId || !userId) {
      return res.status(400).json({ error: "Missing required parameters" })
    }

    // Initialize Stripe with your secret key
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

    // Get the payment method details from Stripe
    const paymentMethod = await stripe.paymentMethods.retrieve(paymentMethodId)

    // Save the payment method to your database
    // In this example, we're using Firebase Firestore
    const paymentMethodData = {
      userId,
      paymentMethodId,
      type: paymentMethod.type,
      card: paymentMethod.card
        ? {
            brand: paymentMethod.card.brand,
            last4: paymentMethod.card.last4,
            expMonth: paymentMethod.card.exp_month,
            expYear: paymentMethod.card.exp_year,
          }
        : null,
      createdAt: new Date(),
    }

    // Add to Firestore
    await addDoc(collection(db, "PaymentMethods"), paymentMethodData)

    res.status(200).json({ success: true, paymentMethod: paymentMethodData })
  } catch (error) {
    console.error("Error saving payment method:", error)
    res.status(500).json({
      error: "Failed to save payment method",
      details: error.message,
    })
  }
}


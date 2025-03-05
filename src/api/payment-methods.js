// This is a server-side API route for retrieving saved payment methods
// In a real implementation, this would be in your backend

import { db } from "../../config/config"
import { collection, query, where, getDocs } from "firebase/firestore"

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" })
  }

  try {
    const { userId } = req.query

    if (!userId) {
      return res.status(400).json({ error: "Missing required parameter: userId" })
    }

    // Query Firestore for payment methods associated with this user
    const paymentMethodsRef = collection(db, "PaymentMethods")
    const q = query(paymentMethodsRef, where("userId", "==", userId))
    const querySnapshot = await getDocs(q)

    const paymentMethods = []
    querySnapshot.forEach((doc) => {
      paymentMethods.push({
        id: doc.id,
        ...doc.data(),
      })
    })

    res.status(200).json({ paymentMethods })
  } catch (error) {
    console.error("Error fetching payment methods:", error)
    res.status(500).json({
      error: "Failed to fetch payment methods",
      details: error.message,
    })
  }
}


// This is a server-side API route for creating a Stripe checkout session
import Stripe from "stripe"

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" })
  }

  try {
    const { items } = req.body

    // Calculate the total amount
    const amount = items.reduce((total, item) => {
      return total + item.name.price * item.name.quantity
    }, 0)

    // Initialize Stripe with your secret key
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

    // Create a checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: items.map((item) => ({
        price_data: {
          currency: "kes",
          product_data: {
            name: item.name.name,
            images: [item.name.image],
          },
          unit_amount: item.name.price * 100, // Stripe expects amount in cents
        },
        quantity: item.name.quantity,
      })),
      mode: "payment",
      success_url: `${req.headers.origin}/order-confirmation?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.origin}/cart`,
    })

    res.status(200).json({ id: session.id })
  } catch (error) {
    console.error("Error creating checkout session:", error)
    res.status(500).json({
      error: "Failed to create checkout session",
      details: error.message,
    })
  }
}


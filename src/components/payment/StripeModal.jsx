import { Elements } from "@stripe/react-stripe-js"
import StripeCheckoutForm from "./StripeCheckoutForm"

const StripeModal = ({ amount, stripePromise, onSuccess, onCancel }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
        <h3 className="text-lg font-semibold mb-4">Pay with Card</h3>
        <Elements stripe={stripePromise}>
          <StripeCheckoutForm amount={amount} onSuccess={onSuccess} onCancel={onCancel} />
        </Elements>
      </div>
    </div>
  )
}

export default StripeModal


import { CreditCard, Trash2 } from "lucide-react"

export default function PaymentMethodCard({ paymentMethod, onDelete }) {
  // Format expiration date
  const formatExpiry = (month, year) => {
    return `${month.toString().padStart(2, "0")}/${year.toString().slice(-2)}`
  }

  // Get card brand icon
  const getCardIcon = (brand) => {
    // In a real implementation, you might want to use specific icons for different card brands
    return <CreditCard className="w-6 h-6" />
  }

  return (
    <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center">
          {getCardIcon(paymentMethod.card?.brand)}
          <span className="ml-2 font-medium capitalize">{paymentMethod.card?.brand || "Card"}</span>
        </div>
        <button
          onClick={() => onDelete(paymentMethod.id)}
          className="text-gray-400 hover:text-red-500 transition-colors"
          aria-label="Delete payment method"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      <div className="text-sm text-gray-600">
        <p>•••• •••• •••• {paymentMethod.card?.last4}</p>
        <p>Expires {formatExpiry(paymentMethod.card?.expMonth, paymentMethod.card?.expYear)}</p>
      </div>
    </div>
  )
}


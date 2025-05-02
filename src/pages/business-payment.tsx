import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CreditCard, Check } from "lucide-react";
import TopNav from "../components/TopNav";
import Footer from "../components/Footer";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import StripeCheckoutForm from "../components/payment/StripeCheckoutForm";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ||
    "pk_test_51QwP4hDCmUMKTgbXqjY44MqogUdggkakGTU3ZDTTCImGsa53XZW63x7YHjGzIFAakslW14kNEWxrWdtk4bjzbSQP00RZmOxwrX"
);

const BusinessPayment = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const navigate = useNavigate();

  const plans = [
    {
      id: "basic",
      name: "Basic Plan",
      price: 1000,
      features: [
        "List up to 50 products",
        "Basic analytics",
        "Email support",
        "Standard processing time",
      ],
    },
    {
      id: "pro",
      name: "Pro Plan",
      price: 2500,
      features: [
        "Unlimited products",
        "Advanced analytics",
        "Priority support",
        "Faster processing time",
        "Custom domain",
      ],
    },
    {
      id: "enterprise",
      name: "Enterprise Plan",
      price: 5000,
      features: [
        "All Pro features",
        "Dedicated account manager",
        "API access",
        "Custom integrations",
        "Advanced security features",
      ],
    },
  ];

  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan);
    setShowPaymentForm(true);
  };

  const handlePaymentSuccess = async (paymentMethodId) => {
    try {
      // Here you would typically update the business profile with subscription details
      // and activate the account
      navigate("/account");
    } catch (error) {
      console.error("Error processing payment:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <TopNav />

      <main className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Choose Your Business Plan
          </h1>
          <p className="text-xl text-gray-600">
            Select the plan that best fits your business needs
          </p>
        </div>

        {!showPaymentForm ? (
          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {plan.name}
                  </h3>
                  <p className="text-4xl font-bold text-gray-900 mb-6">
                    KSH {plan.price.toLocaleString()}
                    <span className="text-base font-normal text-gray-500">
                      /month
                    </span>
                  </p>
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, index) => (
                      <li
                        key={index}
                        className="flex items-center text-gray-600">
                        <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => handlePlanSelect(plan)}
                    className="w-full bg-blue-600 text-white py-3 px-6 rounded-xl font-medium hover:bg-blue-700 transition-colors">
                    Select Plan
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="max-w-md mx-auto">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">
                  Complete Payment
                </h2>
                <button
                  onClick={() => setShowPaymentForm(false)}
                  className="text-gray-500 hover:text-gray-700">
                  Change Plan
                </button>
              </div>

              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-2">Selected Plan</p>
                <p className="text-lg font-medium text-gray-900">
                  {selectedPlan?.name}
                </p>
                <p className="text-2xl font-bold text-gray-900 mt-2">
                  KSH {selectedPlan?.price.toLocaleString()}
                </p>
              </div>

              <Elements stripe={stripePromise}>
                <StripeCheckoutForm
                  amount={selectedPlan?.price}
                  onSuccess={handlePaymentSuccess}
                  onCancel={() => setShowPaymentForm(false)}
                />
              </Elements>
            </div>
            z
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default BusinessPayment;

import React, { useState } from "react";
import { Search, ChevronDown, ChevronUp, MessageSquare } from 'lucide-react';
import TopNav from "../components/TopNav";

const FAQsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [openItems, setOpenItems] = useState({});

  // FAQ Categories
  const categories = [
    { id: "all", name: "All FAQs" },
    { id: "account", name: "Account & Profile" },
    { id: "orders", name: "Orders & Shipping" },
    { id: "products", name: "Products & Services" },
    { id: "payment", name: "Payment & Billing" },
    { id: "returns", name: "Returns & Refunds" },
  ];

  // FAQ Items
  const faqItems = [
    {
      id: 1,
      category: "account",
      question: "How do I create an account?",
      answer: "To create an account, click on the 'Sign Up' button in the top right corner of our website. Fill in your details including your name, email address, and password. Once submitted, you'll receive a verification email. Click the link in the email to verify your account and you're all set!"
    },
    {
      id: 2,
      category: "account",
      question: "How can I reset my password?",
      answer: "If you've forgotten your password, click on the 'Login' button and then select 'Forgot Password'. Enter the email address associated with your account and we'll send you a password reset link. Follow the instructions in the email to create a new password."
    },
    {
      id: 3,
      category: "orders",
      question: "How can I track my order?",
      answer: "You can track your order by logging into your account and navigating to the 'Orders' section. Click on the specific order you want to track and you'll see its current status. Alternatively, you can use the tracking number provided in your order confirmation email on our tracking page."
    },
    {
      id: 4,
      category: "orders",
      question: "How long does shipping take?",
      answer: "Shipping times vary depending on your location and the shipping method selected. Standard shipping typically takes 3-5 business days within the country, while international shipping can take 7-14 business days. Express shipping options are available for faster delivery."
    },
    {
      id: 5,
      category: "products",
      question: "Are your products locally sourced?",
      answer: "Yes, many of our products are locally sourced. We work with local artisans and suppliers whenever possible to support local communities and reduce our carbon footprint. Each product page indicates whether the item is locally sourced or imported."
    },
    {
      id: 6,
      category: "products",
      question: "Do you offer customization for your products?",
      answer: "Yes, we offer customization for select products. Look for the 'Customizable' label on product pages. You can specify your customization requirements during the ordering process. Please note that customized products may take longer to produce and ship."
    },
    {
      id: 7,
      category: "payment",
      question: "What payment methods do you accept?",
      answer: "We accept various payment methods including credit/debit cards (Visa, MasterCard, American Express), PayPal, M-Pesa, and bank transfers. All payments are processed securely through our encrypted payment gateway."
    },
    {
      id: 8,
      category: "payment",
      question: "Is it safe to use my credit card on your website?",
      answer: "Absolutely. We use industry-standard SSL encryption to protect your personal and payment information. Our payment processing is PCI DSS compliant, ensuring that your credit card information is handled according to the highest security standards."
    },
    {
      id: 9,
      category: "returns",
      question: "What is your return policy?",
      answer: "We offer a 30-day return policy for most items. Products must be in their original condition with tags attached and original packaging. Some items, such as personalized products or intimate goods, are not eligible for return due to hygiene reasons. Please check our full return policy for details."
    },
    {
      id: 10,
      category: "returns",
      question: "How do I initiate a return or exchange?",
      answer: "To initiate a return or exchange, log into your account and go to the 'Orders' section. Select the order containing the item you wish to return and click on 'Return Item'. Follow the instructions to complete the return request. Once approved, you'll receive a return shipping label and instructions."
    },
    {
      id: 11,
      category: "orders",
      question: "Do you ship internationally?",
      answer: "Yes, we ship to most countries worldwide. International shipping rates and delivery times vary by destination. You can see the shipping options available to your country during checkout. Please note that international orders may be subject to customs duties and taxes, which are the responsibility of the recipient."
    },
    {
      id: 12,
      category: "payment",
      question: "When will my card be charged?",
      answer: "Your card will be charged immediately when you place your order. For pre-orders or back-ordered items, your card will be charged at the time of purchase, not when the item ships."
    },
  ];

  // Toggle FAQ item
  const toggleItem = (id) => {
    setOpenItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Filter FAQs based on search and category
  const filteredFAQs = faqItems.filter((item) => {
    const matchesSearch = item.question.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === "all" || item.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
    <TopNav />

      <div className="container mx-auto px-4 py-12">
        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-10">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search for answers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
            />
          </div>
        </div>

        {/* Categories */}
        <div className="mb-10 overflow-x-auto">
          <div className="flex space-x-2 min-w-max pb-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeCategory === category.id
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* FAQ Items */}
        <div className="max-w-3xl mx-auto">
          {filteredFAQs.length > 0 ? (
            <div className="space-y-4">
              {filteredFAQs.map((item) => (
                <div key={item.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <button
                    onClick={() => toggleItem(item.id)}
                    className="w-full px-6 py-4 text-left flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset"
                  >
                    <span className="font-medium text-gray-900">{item.question}</span>
                    {openItems[item.id] ? (
                      <ChevronUp className="h-5 w-5 text-gray-500" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-500" />
                    )}
                  </button>
                  {openItems[item.id] && (
                    <div className="px-6 pb-4">
                      <p className="text-gray-600">{item.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <div className="bg-gray-100 inline-block p-4 rounded-full mb-4">
                <Search className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No results found</h3>
              <p className="text-gray-600 mb-6">
                We couldn't find any FAQs matching your search. Try different keywords or browse by category.
              </p>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setActiveCategory("all");
                }}
                className="text-blue-600 font-medium hover:text-blue-700"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>

        {/* Still Have Questions */}
        <div className="max-w-3xl mx-auto mt-16 bg-blue-50 rounded-xl p-6 md:p-8 border border-blue-100">
          <div className="flex flex-col md:flex-row items-center">
            <div className="flex-shrink-0 bg-blue-100 p-4 rounded-full mb-4 md:mb-0 md:mr-6">
              <MessageSquare className="h-8 w-8 text-blue-600" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Still Have Questions?</h3>
              <p className="text-gray-600 mb-4">
                Can't find the answer you're looking for? Please contact our support team for assistance.
              </p>
              <a
                href="/contact"
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
              >
                Contact Support
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQsPage;

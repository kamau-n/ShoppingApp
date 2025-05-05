import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Meals from "./pages/Meals";
import Upload from "./pages/Upload";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import Sign from "./pages/Sign";
import Home from "./pages/Home";
import Drinks from "./pages/Drinks";
import Product from "./pages/Products";
import Billing from "./pages/Billing";
import Account from "./pages/Account";
import About from "./pages/About";
import AddCategory from "./pages/AddCategory.jsx";
import BlogPage from "./pages/blog.jsx";
import FAQsPage from "./pages/faqs.jsx";
import PrivacyPolicyPage from "./pages/policy.jsx";
import ContactPage from "./pages/contact.jsx";
import BusinessProducts from "./pages/business-products.jsx";
import BusinessProductList from "./pages/business-product-list.jsx";
import BusinessCart from "./pages/business-cart.jsx";
import BusinessCheckout from "./pages/business-checkout.jsx";
import SubscriptionForm from "./components/modals/SubscriptionModal";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product" element={<Meals />} />
          <Route path="/uploads" element={<Upload />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/drinks" element={<Drinks />} />
          <Route path="/signup" element={<Sign />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/billing" element={<Billing />} />
          <Route path="/account" element={<Account />} />
          <Route path="/about" element={<About />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/faqs" element={<FAQsPage />} />
          <Route path="/policy" element={<PrivacyPolicyPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/categories" element={<AddCategory />} />
          <Route path="/business/:businessUrl" element={<BusinessProducts />} />
          <Route path="/subscriptions" element={<SubscriptionForm />} />
          <Route path="/business-payment" element={<BusinessPayment />} />
          <Route
            path="/business/:businessUrl/products"
            element={<BusinessProductList />}
          />
          <Route
            path="/business/:businessUrl/cart"
            element={<BusinessCart />}
          />
          <Route
            path="/business/:businessUrl/checkout"
            element={<BusinessCheckout />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

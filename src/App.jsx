import { useState, useEffect } from "react";

//import Products from './assets/Assests'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Meals from "./pages/Meals";
import Upload from "./pages/Upload";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import Sign from "./pages/Sign";
import Home from "./pages/Home";
import Drinks from "./pages/Drinks";
import Product from "./pages/Products";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/meals" element={<Meals />} />
          <Route path="/uploads" element={<Upload />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/drinks" element={<Drinks />} />
          <Route path="/signup" element={<Sign />} />
          <Route path="/product/:id" element={<Product />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

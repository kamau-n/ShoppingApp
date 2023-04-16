import { useState, useEffect } from "react";

//import Products from './assets/Assests'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Products from "./pages/Products";
import Upload from "./pages/Upload";
import Login from "./pages/Login";
import Order from "./pages/Order";
import Sign from "./pages/Sign";
import Home from "./pages/Home";
import Drinks from "./pages/Drinks";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/meals" element={<Products />} />
          <Route path="/uploads" element={<Upload />} />
          <Route path="/login" element={<Login />} />
          <Route path="/orders" element={<Order />} />
          <Route path="/drinks" element={<Drinks />} />
          <Route path="/signup" element={<Sign />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

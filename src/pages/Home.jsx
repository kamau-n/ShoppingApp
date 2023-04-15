import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className=" block gap-2 p-2 m-3">
      <Link to="/login">Login</Link>
      <Link to="/signup">Register</Link>
      <Link to="/uploads">Upload</Link>
      <Link to="/orders">Order</Link>
      <Link to="/products">Products</Link>
      {/* <Link to="/login">Login</Link> */}
    </div>
  );
}

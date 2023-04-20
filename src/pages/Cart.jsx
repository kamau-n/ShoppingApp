import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import TopNav from "../components/TopNav";
import Footer from "../components/Footer";

const Cart = () => {
  const [items, setItems] = useState([]);
  const [value, setValue] = useState(0);
  const [total, setTotal] = useState(0);

  const allStorage = () => {
    let cart = localStorage.getItem("ladoche_shopping_cart");
    // console.log(typeof cart);
    const data = JSON.parse(cart);
    setItems(data);
    getTotal(data);
    setTotal(data.length);

    //console.log(typeof data);
  };
  const removeItem = (name, data) => {
    console.log("i have been clicked");
    console.log(name);
    console.log(data[0]);

    const index = data.indexOf(name);
    console.log(index);

    const new_data = data.splice(index, 1);
    console.log(new_data);
    localStorage.removeItem("ladoche_shopping_cart");
    localStorage.setItem("ladoche_shopping_cart", JSON.stringify(new_data));
  };
  const getTotal = (data) => {
    console.log("i have been accessed");
    let total_for_all = 0;
    if (data.length > 0) {
      data.map((y) => {
        let total_for_one = y.name.price * y.name.quantity;
        console.log("total for" + y.name.name + total_for_one);
        total_for_all = total_for_one + total_for_all;
      });
      //console.log(total_for_all);
      setValue(total_for_all);
    }
  };

  useEffect(() => {
    allStorage();
  }, [total]);

  return (
    <div className="">
      <div className=" w-5/6 p-2 my-3 bg-slate-400 mx-auto">
        {/* <TopNav /> */}
        <div className="my-7 w-3/4 flex mx-auto py-5 px-3">
          <div className="bg-white basis-2/3 px-4 py-4">
            <h2 className="text-2xl text-left font-semibold font-mono">
              Shopping cart
            </h2>
            {items.map((item) => {
              let total = item.name.price * item.name.quantity;
              // console.log(total + value);

              return (
                <div className="w-3/4 mx-auto my-6  border-t-2 border-b-2 gap-4 py-4 px-2 flex ">
                  <img
                    src={item.name.link}
                    alt=" no image"
                    className="w-36 h-24 "
                  />
                  <h2 className="font-mono py-6 font-bold text-l">
                    {item.name.name}
                  </h2>
                  <h2 className="font-mono py-6 font-bold text-l">
                    {item.name.quantity}
                  </h2>
                  <h2 className="font-mono py-6 font-bold text-l">
                    {item.name.price}
                  </h2>
                  <h2 className="font-mono py-6 font-bold text-l">
                    TOTAL: {total}
                  </h2>
                  <button
                    onClick={() => {
                      removeItem(item.name.name, items);
                    }}
                    className="pb-6 font-bold my-5 mx-8">
                    x
                  </button>
                </div>
              );
            })}
            <Link to="/">Back to shopping </Link>
          </div>
          <div className="bg-slate-300 px-3 basis-1/3 py-5">
            <h2 className="py-5 font-bold font-mono text-left text-2xl">
              Summary
            </h2>
            <div className="flex justify-between px-2 my-6">
              <h3 className="text-left ">ITEMS </h3>
              <span>{total}</span>
            </div>

            <h3 className="text-left my-6">SHIPPING</h3>
            <select className="font-bold p-2 my-8">
              <option className="font-bold p-2">Standard Delivery {500}</option>
              <option className="font-bold p-2">Normal Delivery {300}</option>
              <option className="font-bold p-2">Fast Delivery {800}</option>
            </select>
            <h2 className="text-left mt-7 mb-2 ">COUPON CODE</h2>
            <div className="text-left">
              <input
                type="text"
                placeholder="Enter Code"
                className="text-left w-full p-2"
              />
            </div>
            <div className="text-left flex px-2 py-3 border-t-2 font-bold justify-between my-6">
              <h2>TOTAL PRICE</h2>
              <span> {value}</span>
            </div>
            <button className="font-bold bg-black p-2 text-white w-full mx-1">
              <Link to="/billing" className="text-white">
                {" "}
                CHECKOUT
              </Link>
            </button>
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default Cart;

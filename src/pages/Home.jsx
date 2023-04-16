import React from "react";
import { Link } from "react-router-dom";
import SimpleSlider from "../components/SimpleSlider";
import burger from "../assets/burger.jpg";
import starter from "../assets/starters.jpg";
import TopNav from "../components/TopNav";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div>
      <div className=" w-3/4 p-2 my-3 mx-auto  ">
        <TopNav />

        <div className="py-10 px-5 my-10 ">
          <h2 className="text-xl font-bold text-left px-3 py-4 uppercase">
            Our best choices
          </h2>
          <SimpleSlider />
        </div>
        <div>
          <h2 className="text-left  text-xl  uppercase font-bold px-3 py-4">
            Categories
          </h2>
          <div className="flex gap-2">
            <div className="border-2 border-slate-300">
              <img src={starter} alt="no image" className="w-full h-60" />
              <h2 className="text-xl uppercase p-3 font-bold">Drinks</h2>
            </div>
            <div className="border-2 border-slate-300">
              <img src={starter} alt="no image" className="w-full h-60" />
              <h2 className="text-xl uppercase  font-bold py-3 px-3">Drinks</h2>
            </div>
            <div className="border-2 border-slate-300">
              <img src={starter} alt="no image" className="w-full h-60" />
              <h2 className="text-xl uppercase p-3 font-bold">Drinks</h2>
            </div>
            <div className="border-2 border-slate-300">
              <img src={starter} alt="no image" className="w-full h-60" />
              <h2 className="text-xl uppercase p-3 font-bold">Drinks</h2>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

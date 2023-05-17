import React from "react";
import TopNav from "../components/TopNav";
import Footer from "../components/Footer";
import about from "../assets/about.jpg";

export default function About() {
  return (
    <div>
      <TopNav />
      <div className="w-full my-20">
        <div className="sm:flex sm:flex-row-reverse   flex flex-col-reverse sm:justify-between ">
          <div className="basis-1/2 flex space-y-8 flex-col justify-center  p-5 align-middle my-4">
            <h2 className="text-green-300 sm:text-left font-semibold text-3xl sm:text-5xl">
              About us
            </h2>
            <h2 className="sm:text-4xl  text-2xl text-blue-300 sm:text-left font-bold font-serif">
              Why choose us
            </h2>
            <p className="sm:text-2xl text-xl py-3 sm:text-left  ">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ut
              officiis debitis qui architecto possimus consequuntur, repellendus
              quia nisi, maxime doloribus optio eius obcaecati excepturi porro
              sunt consectetur quidem soluta explicabo.
            </p>
            <div className="sm:text-left text-center">
              <button className="bg-blue-600 px-8 text-xl font-bold text-white rounded-md py-3">
                <a href="/" className="text-white">
                  Order Now{" "}
                </a>
              </button>
            </div>
          </div>
          <div className="basis-1/2 px-8 py-10  justify-center align-middle my-4">
            <img
              src={about}
              alt="no image"
              className=" sm:bg-cover mx-auto   h-3/4 rounded-full  "
            />
          </div>

          {/* <h3 className="px-2 py-2 font-mono">{prod.name}</h3>
              <div className="px-3 py-3 flex  justify-between m-4"> 
                 <h2 className="font-bold py-2">{prod.price}</h2>
                <button className="font-bold text-white px-5 py-2 bg-blue-700 rounded">
                  add
                </button> */}
        </div>
      </div>
      <Footer />
    </div>
  );
}

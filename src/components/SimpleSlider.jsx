import React from "react";
import Slider from "react-slick";
import "../../node_modules/slick-carousel/slick/slick.css";
import "../../node_modules/slick-carousel/slick/slick-theme.css";
import Products from "../assets/Assests";
export default function SimpleSlider() {
  const settings = {
    dots: true,
    appendDots: (dots) => (
      <div style={{ position: "absolute", bottom: "10px", right: "10px" }}>
        <ul style={{ margin: "0px" }}> {dots} </ul>
      </div>
    ),
    customPaging: (i) => <div className="dot" />,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <Slider {...settings}>
      {Products.map((prod) => {
        return (
          <div className="">
            <div
              key={prod.id}
              className="sm:flex sm:flex-row p-4 flex flex-col-reverse sm:justify-between ">
              <div className="basis-1/2 flex space-y-5 flex-col justify-center align-middle my-8">
                <h2 className="text-green-300 sm:text-left font-semibold text-xl">
                  Our Special Dish
                </h2>
                <h2 className="sm:text-4xl text-2xl  text-blue-300 sm:text-left font-bold font-serif">
                  {prod.name}
                </h2>
                <p className="sm:text-2xl text-l py-3 sm:text-left  ">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Ipsum vel eum, nobis tenetur adipisci dolor. Molestias minima
                </p>
                <div className="sm:text-left py-8 text-center">
                  <button className="bg-blue-600 px-8 text-xl font-bold text-white rounded-md py-4">
                    order now
                  </button>
                </div>
              </div>
              <div className="basis-1/2">
                <img
                  src={prod.link}
                  alt="no image"
                  className=" sm:bg-cover mx-auto    rounded-md  "
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
        );
      })}
    </Slider>
  );
}

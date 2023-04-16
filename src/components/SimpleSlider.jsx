import React from "react";
import Slider from "react-slick";
import "../../node_modules/slick-carousel/slick/slick.css";
import "../../node_modules/slick-carousel/slick/slick-theme.css";
import Products from "../assets/Assests";
export default function SimpleSlider() {
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          initialSlide: 3,
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
            <div key={prod.id} className="m-6 ">
              <img src={prod.link} alt="no image" className="w-full h-64 " />
              <div className="px-3 py-5 flex  justify-between m-4">
                <h2 className="font-bold py-2">{prod.price}</h2>
                <button className="font-bold text-white px-5 py-2 bg-blue-700 rounded">
                  add
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </Slider>
  );
}

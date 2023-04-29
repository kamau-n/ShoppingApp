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
    slidesToShow: 2,
    slidesToScroll: 2,
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
          <div className="mx-1">
            <div key={prod.id} className=" ">
              <img
                src={prod.link}
                alt="no image"
                className=" sm:bg-cover mx-auto rounded-md  "
              />
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

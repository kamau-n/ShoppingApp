import React from "react";
import Carousel from "react-responsive-carousel";

const Carosel = () => {
  return (
    <div className="car">
      <Carousel
        showArrows={true}
        onChange={onChange}
        onClickItem={onClickItem}
        onClickThumb={onClickThumb}>
        <div>
          <img src="src/assets/desserts.jpg" />
          <p className="legend">Legend 1</p>
        </div>
      </Carousel>
    </div>
  );
};

export default Carosel;

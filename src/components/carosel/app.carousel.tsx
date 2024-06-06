"use client";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./carosel.scss";

function CarouselApp() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <></>,
    prevArrow: <></>,
  };
  return (
    <div>
      <Slider {...settings}>
        <div>
          <img
            className="m-0 p-0"
            src="//theme.hstatic.net/1000365025/1001081286/14/slideShow_f1_1.png?v=1132"
            alt="slider-website-1"
          />
        </div>
        <div>
          <img
            src="//theme.hstatic.net/1000365025/1001081286/14/slideShow_f1_3.png?v=1132"
            className="m-0 p-0"
            alt="slider-website-3"
          />
        </div>
      </Slider>
    </div>
  );
}

export default CarouselApp;

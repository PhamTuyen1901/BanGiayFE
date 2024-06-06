"use client";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import { Button } from "antd";
import "../../carosel/carosel.scss";
import { Product } from "@/types";
const NextArrow = (props: any) => {
  return (
    <Button
      color="inherit"
      onClick={props.onClick}
      style={{
        position: "absolute",
        right: 0,
        top: "45%",
        zIndex: 2,
        width: 30,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <SlArrowRight />
    </Button>
  );
};

const PrevArrow = (props: any) => {
  return (
    <Button
      color="inherit"
      onClick={props.onClick}
      style={{
        position: "absolute",
        top: "45%",
        zIndex: 2,
        minWidth: 30,
        width: 30,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <SlArrowLeft />
    </Button>
  );
};
function ProductNavFor({ product }: { product: Product | undefined | null }) {
  const settings = {
    dots: true,
    dotsClass: "slick-dots slick-thumb",
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };
  return (
    <div className="slider-container">
      <Slider {...settings}>
        <div>
          <img
            src={product?.productImage}
            className="h-[400px] w-[400px] pl-[100px]"
          />
        </div>
        <div>
          <img
            src={product?.productImage}
            className="h-[400px] w-[400px] pl-[100px]"
          />
        </div>
        <div>
          <img
            src={product?.productImage}
            className="h-[400px] w-[400px] pl-[100px]"
          />
        </div>
        <div>
          <img
            src={product?.productImage}
            className="h-[400px] w-[400px] pl-[100px]"
          />
        </div>
      </Slider>
    </div>
  );
}

export default ProductNavFor;

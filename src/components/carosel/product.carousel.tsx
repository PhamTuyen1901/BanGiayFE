"use client";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Button } from "antd";
import { SlArrowLeft } from "react-icons/sl";
import { SlArrowRight } from "react-icons/sl";
import CardProduct from "./CardProduct";
import "./carosel.scss";
import Link from "next/link";
import { GoArrowRight } from "react-icons/go";
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
const MultipleItems = ({ products }: { products: any }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 2000,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };
  return (
    <div className="slider-container bg-[#f4f4f4] ">
      <div className=" w-[1280px] m-auto py-10">
        <div className="flex justify-between">
          <h2 className="text-2xl font-semibold mb-5">TOP TRENDING</h2>
          <div className="flex justify-between gap-1 items-center">
            <Link href={"./products"}>
              <span className="font-semibold">XEM THÊM</span>{" "}
            </Link>
            <GoArrowRight />
          </div>
        </div>
        <Slider {...settings}>
          {products?.map((product: Product) => (
            //@ts-ignore
            <div key={product.productId}>
              <CardProduct product={product} />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default MultipleItems;

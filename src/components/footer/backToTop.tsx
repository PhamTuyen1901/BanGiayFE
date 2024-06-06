"use client";
import React, { useEffect, useState } from "react";
import { FaArrowUpLong } from "react-icons/fa6";
import "./footer.scss";
const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);
  return (
    <div
      className={
        isVisible ? "back-to-top opacity-100" : "opacity-0 back-to-top "
      }
      onClick={scrollToTop}
    >
      <FaArrowUpLong className=" texl-xl" />
    </div>
  );
};

export default BackToTop;

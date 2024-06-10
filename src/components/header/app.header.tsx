"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

import { CiSearch } from "react-icons/ci";

import AppNabar from "./app.navbar";
import AppModelLogin from "../layout/home/app.model.login";
import AppAddCart from "../layout/home/app.home.addcart";
import AppWishLishDrawer from "../layout/home/app.home.wishlist";
import { useRouter } from "next/navigation";

const AppHeader = () => {
  const [isHeaderVisible, setHeaderVisible] = useState(true);
  const [searchName, setSearchName] = useState("");
  const router = useRouter();
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      const isVisible = currentScrollPos < prevScrollPos;
      setHeaderVisible(isVisible);
      prevScrollPos = currentScrollPos;
    };

    let prevScrollPos = window.pageYOffset;

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={
        isHeaderVisible
          ? "header_scrolled_not_active"
          : "header_scrolled_active"
      }
    >
      <div className=" m-auto w-[1280px] py-[15px]">
        <div className=" flex justify-between items-center">
          <div className=" flex items-center gap-20 justify-start">
            <img
              src="//theme.hstatic.net/1000365025/1001081286/14/logo.png?v=1132"
              alt="DinCox Shoes"
              onClick={() => router.push("/")}
              className="object-contain w-[160px] cursor-pointer"
            />
            <div className=" relative">
              <input
                placeholder="Bạn muốn tìm gì ...?"
                className=" outline-none bg-[#f4f4f4] w-[400px] py-1 px-3 rounded-lg text-[14px]"
                value={searchName}
                onChange={(e) => {
                  setSearchName(e.target.value);
                }}
              />
              <button
                type="submit"
                className="absolute top-[10%] right-[10px] bg-transparent"
                onClick={() => {
                  router.push(`/products?productName=${searchName}`);
                }}
              >
                <CiSearch className=" text-[20px]" />
              </button>
            </div>
          </div>
          <div className="flex gap-5">
            <AppModelLogin />
            <AppWishLishDrawer />
            <AppAddCart />
            <div>
              <Image
                src="/img/vietnam.png"
                alt="logovietnam"
                width={30}
                height={30}
              />
            </div>
          </div>
        </div>
        <AppNabar />
      </div>
    </header>
  );
};

export default AppHeader;

"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

import { Button } from "antd";

import CarouselApp from "@/components/carosel/app.carousel";
import HomePolicy from "@/components/layout/home/app.home_policy";
import ProductCarousel from "@/components/carosel/product.carousel";
import CardProduct from "@/components/carosel/CardProduct";
import { GoArrowRight } from "react-icons/go";
import { quanLySanPhamServices } from "@/server";
import { Product } from "@/types";

import "./home.scss";
import { useAuth } from "@/hook";
import { useRouter } from "next/navigation";

const page = () => {
  const [products, setProducts] = useState<any>();
  const { user } = useAuth();
  const router = useRouter();

  const fetchProducts = async () => {
    try {
      const { data } = await quanLySanPhamServices.getTopProduct();
      //@ts-ignore

      setProducts(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchProducts();
    if (user?.userTypeId == 2) {
      router.push("/admin");
    } else {
      router.push("/");
    }
  }, [user]);

  return (
    <>
      <CarouselApp />
      <HomePolicy />
      <section id="home_banner " className="mx-auto w-[1280px] py-10">
        <div className=" grid grid-cols-2">
          <div className="home_banner_left flex flex-col items-center justify-center gap-10">
            <h2 className="font-bold text-6xl">Giày Chất - Style Chất</h2>
            <Button onClick={() => router.push("/products")}>Mua Ngay</Button>
          </div>
          <div className="box_shadow rounded-xl effect_hover">
            <img
              className=" w-full rounded-xl "
              src="//theme.hstatic.net/1000365025/1001081286/14/banner_bottom_img.png?v=1132"
              data-src="//theme.hstatic.net/1000365025/1001081286/14/banner_bottom_img.png?v=1132"
              alt="home-banner-right"
            />
          </div>
        </div>
      </section>
      <section id="home_new-arrival" className=" bg-[#f4f4f4]">
        <div className=" mx-auto w-[1280px] py-10">
          <div className="flex justify-between">
            <h2 className="text-2xl font-semibold mb-5">NEW ARRIVALS</h2>
            <div className="flex justify-between gap-1 items-center">
              <Link href={"./products"}>
                <span className="font-semibold">XEM THÊM</span>{" "}
              </Link>
              <GoArrowRight />
            </div>
          </div>
          <div className="grid grid-cols-4 gap-4">
            {products &&
              products?.slice(0, 4).map((product: Product) => (
                <div key={product.productId}>
                  <CardProduct product={product} />
                </div>
              ))}
          </div>
        </div>
      </section>
      <section id="home_about" className="mx-auto w-[1280px] py-10 ">
        <div className="grid grid-cols-2 items-center gap-10 ">
          <div className="effect_hover z-20  rounded-xl box_shadow">
            <img
              className=" rounded-xl "
              src="//theme.hstatic.net/1000365025/1001081286/14/home_about_top.png?v=1132"
              data-src="//theme.hstatic.net/1000365025/1001081286/14/home_about_top.png?v=1132"
              alt="home-about-top"
            />
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-5">
              GIÀY CHUẨN CHÂU ÂU- GIÁ ƯU VIỆT
            </h2>
            <p>
              Thương hiệu giày Vulcanized được thiết kế và sản xuất 100% tại
              Việt Nam. Mỗi đôi giày đều mang một câu chuyện, một giá trị về
              hình thức lẫn chất lượng dành cho người Việt, theo đúng định hướng
              "Giày chuẩn EU - Giá ưu Việt" mà DinCox theo đuổi từ những ngày
              đầu thành lập.
            </p>
          </div>
        </div>

        <div className="flex justify-end">
          <div className=" w-[740px] -translate-y-16 ">
            <div className=" effect_hover z-10  rounded-xl box_shadow">
              <img
                className="  rounded-xl  "
                src="//theme.hstatic.net/1000365025/1001081286/14/home_about_bot.png?v=1132"
                data-src="//theme.hstatic.net/1000365025/1001081286/14/home_about_bot.png?v=1132"
                alt="home-about-bot"
              />
            </div>
          </div>
        </div>
      </section>
      <ProductCarousel products={products} />
      <section id="home_collection" className="mx-auto w-[1280px] py-10">
        <h2 className="text-2xl font-semibold mb-5">BỘ SƯU TẬP</h2>
        <div className="collection p-5 rounded-lg">
          <div className="grid grid-rows-3 grid-cols-3 gap-4 items-center">
            <div className="row-start-1 col-start-1 row-span-2 rounded-lg overflow-hidden card_collection">
              <img
                className=""
                src="//theme.hstatic.net/1000365025/1001081286/14/home_gallery_item_imageOne_1.png?v=1132"
                data-src="//theme.hstatic.net/1000365025/1001081286/14/home_gallery_item_imageOne_1.png?v=1132"
                alt="imageOne-1"
              />
            </div>
            <div className="row-span-1 col-span-1 col-start-2  rounded-lg overflow-hidden card_collection">
              <img
                src="//theme.hstatic.net/1000365025/1001081286/14/home_gallery_item_imageOne_2.png?v=1132"
                data-src="//theme.hstatic.net/1000365025/1001081286/14/home_gallery_item_imageOne_2.png?v=1132"
                alt="imageOne-2"
              />
            </div>
            <div className="row-span-2 col-span-1 rounded-lg overflow-hidden card_collection ">
              <img
                src="//theme.hstatic.net/1000365025/1001081286/14/home_gallery_item_imageOne_3.png?v=1132"
                data-src="//theme.hstatic.net/1000365025/1001081286/14/home_gallery_item_imageOne_3.png?v=1132"
                alt="imageOne-3"
              />
            </div>
            <div className="row-span-1 col-span-1 col-start-1 row-start-3  rounded-lg overflow-hidden card_collection">
              <img
                className=" lazyloaded"
                src="//theme.hstatic.net/1000365025/1001081286/14/home_gallery_item_imageTwo_1.png?v=1132"
                data-src="//theme.hstatic.net/1000365025/1001081286/14/home_gallery_item_imageTwo_1.png?v=1132"
                alt="imageOne-1"
              />
            </div>
            <div className="row-span-2 col-span-1 col-start-2 -translate-y-3  rounded-lg overflow-hidden card_collection">
              <img
                className=" lazyloaded"
                src="//theme.hstatic.net/1000365025/1001081286/14/home_gallery_item_imageTwo_2.png?v=1132"
                data-src="//theme.hstatic.net/1000365025/1001081286/14/home_gallery_item_imageTwo_2.png?v=1132"
                alt="imageOne-2"
              />
            </div>
            <div className="row-span-1 col-span-1  rounded-lg overflow-hidden card_collection">
              <img
                className=" lazyloaded"
                src="//theme.hstatic.net/1000365025/1001081286/14/home_gallery_item_imageTwo_3.png?v=1132"
                data-src="//theme.hstatic.net/1000365025/1001081286/14/home_gallery_item_imageTwo_3.png?v=1132"
                alt="imageOne-3"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default page;

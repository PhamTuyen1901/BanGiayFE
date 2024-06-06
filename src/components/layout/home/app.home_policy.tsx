"use client";
import React from "react";
import "./home_pocily.scss";
const HomePolicy = () => {
  return (
    <section id="home_policy" className="mx-auto w-[1280px] py-10">
      <div className="flex justify-between gap-10 items-center">
        <div className="flex flex-col items-center justify-center cursor-pointer card">
          <span className=" bg-[#fff4f4]">
            <img
              src="//theme.hstatic.net/1000365025/1001081286/14/home_policy_item_image_1.png?v=1132"
              alt="Freeship"
            />
          </span>
          <h3 className="text-[18px]">Freeship</h3>
          <p className="text-center text-[#AAA] text-[14px]">
            Đơn hàng &gt; 700k hoặc thành viên Dinclub
          </p>
        </div>
        <div className="flex flex-col items-center justify-center cursor-pointer card">
          <span className="bg-[#f0ffff]">
            <img
              src="//theme.hstatic.net/1000365025/1001081286/14/home_policy_item_image_2.png?v=1132"
              alt="Thời gian bảo hành lên đến 1 năm"
            />
          </span>
          <h3 className="text-[18px]">Thời gian bảo hành lên đến 1 năm</h3>
          <p className="text-center text-[#AAA] text-[14px]">
            Bảo hành keo trong vòng 06 tháng - Bảo hành da 01 năm
          </p>
        </div>
        <div className="flex flex-col items-center justify-center cursor-pointer card">
          <span className="bg-[#fffbe6]">
            <img
              src="//theme.hstatic.net/1000365025/1001081286/14/home_policy_item_image_3.png?v=1132"
              alt="Chương trình khuyến mãi"
            />
          </span>
          <h3 className="text-[18px]">Chương trình khuyến mãi</h3>
          <p className="text-center text-[#AAA] text-[14px]">
            Ưu đãi đặc biệt trong tháng
          </p>
        </div>
        <div className="flex flex-col items-center justify-center cursor-pointer card">
          <span className="bg-[#f1f2ff]">
            <img
              src="//theme.hstatic.net/1000365025/1001081286/14/home_policy_item_image_4.png?v=1132"
              alt="Chính hãng"
            />
          </span>
          <h3 className="text-[18px]">Chính hãng</h3>
          <p className="text-center text-[#AAA] text-[14px]">
            Sản phẩm chính hãng. Giày chất giá chuẩn.{" "}
          </p>
        </div>
      </div>
    </section>
  );
};

export default HomePolicy;

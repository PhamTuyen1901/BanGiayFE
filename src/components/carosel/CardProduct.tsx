"use client";
import React, { useRef } from "react";
import { CiHeart } from "react-icons/ci";
import { Tooltip } from "antd";
import { useRouter } from "next/navigation";
import { Product } from "@/types";
import { useAppDispatch } from "@/lib/hook";
import { quanLyNguoiDungActions } from "@/lib/features/quanLyNguoiDung/slice";
import { toast } from "react-toastify";
import { quanLyNguoiDungServices } from "@/server";
import { useAuth } from "@/hook";
export const CardProduct = ({ product }: { product: Product }) => {
  const { user } = useAuth();
  const router = useRouter();
  const heartRef = useRef(null);
  const dispatch = useAppDispatch();
  const handleClick = async (product: Product) => {
    try {
      const { data } = await quanLyNguoiDungServices.addfavorites({
        userId: user.userId,
        productId: product.productId,
      });
      dispatch(quanLyNguoiDungActions.addReLoad());
      // @ts-ignore
      toast.success(data.message);
    } catch (error) {
      console.log(error);
      toast.error("Vui lòng thử lại sau!");
    }
  };
  return (
    <div className="p-2 bg-[#f4f4f4] card_product">
      <div className="flex flex-col items-center justify-center gap-2 rounded-lg bg-white p-3  relative z-1">
        <img
          className="h-[250px] rounded-lg  "
          src={product.productImage}
          alt={product.productName}
        />
        <p>{product.productName.slice(0, 15)}</p>
        <p className="text-red-400">
          {parseFloat(product.productPrice).toLocaleString()}đ
        </p>
        <p>FREESHIP</p>
        <div className="flex items-center  justify-between gap-1 w-full  ">
          <button className="bg-[#eceff1]  active:bg-[#dae3ea] py-[5px] w-[45%] rounded-lg cursor-pointer button_overlay ">
            Xem nhanh
          </button>
          <button
            className=" bg-red-500 active:bg-red-800  py-[5px]  w-[45%] rounded-md text-white cursor-pointer button_overlay "
            onClick={() => router.push(`./products/${product.productId}`)}
          >
            Mua ngay
          </button>
        </div>
        <div className="overlay absolute  w-[90%] p-3 top-1 right-1 flex items-end justify-end ">
          <div className="flex items-center justify-center bg-white rounded-full text-3xl p-1 cursor-pointer">
            <Tooltip placement="bottom" title="Yêu thích" color="red">
              <span ref={heartRef}>
                <CiHeart onClick={() => handleClick(product)} />
              </span>
            </Tooltip>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardProduct;

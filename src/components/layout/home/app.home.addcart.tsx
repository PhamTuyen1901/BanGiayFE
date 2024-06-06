"use client";
import React, { useEffect, useState } from "react";
import { Drawer } from "antd";
import { CiShoppingCart } from "react-icons/ci";
import Link from "next/link";
import { quanLyDatSanPhamServices } from "@/server";
import { Bill } from "@/types";
import { useAppSelector } from "@/lib/hook";
import { RootState } from "@/lib/store";
import { useAuth } from "@/hook";

const AppAddCart = () => {
  const [open, setOpen] = useState(false);
  const { user } = useAuth();
  const [products, setProducts] = useState<any>([]);
  const { isReload } = useAppSelector((state: RootState) => state.users);
  const showDrawer = () => {
    setOpen(true);
    featchData();
  };

  const onClose = () => {
    setOpen(false);
  };

  const featchData = async () => {
    try {
      const { data } = await quanLyDatSanPhamServices.getAllOrders();
      //@ts-ignore

      setProducts(data.bills);
    } catch (error) {
      setProducts([]);
      console.log(error);
    }
  };
  useEffect(() => {
    featchData();
  }, [isReload, user]);
  return (
    <>
      <div
        className="flex gap-2 items-center cursor-pointer"
        onClick={showDrawer}
      >
        <p>Giỏ hàng</p>
        <CiShoppingCart />
      </div>
      <Drawer
        title="GIỎ HÀNG"
        onClose={onClose}
        open={open}
        footer={
          <div className="">
            <div className="text-[#979696] text-[16px] flex justify-between items-center pb-5">
              <p>Thêm ghi chú</p>
              <Link href={"./cart"}>
                <p className="text-[#979696]">Xem chi tiết giỏ hàng</p>
              </Link>
            </div>
          </div>
        }
      >
        <div className="flex justify-between flex-col h-full">
          <div className=" flex flex-col gap-5">
            {products &&
              products.map((product: Bill) => (
                <div
                  key={product?.productId}
                  className="border-b pb-3 grid-cols-2 grid"
                >
                  <img
                    src={product?.products.productImage}
                    alt={product?.products.productName}
                    className="w-[100px] h-[80px]"
                  />
                  <div>
                    <p>Tên sản phẩm :{product.products.productName}</p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </Drawer>
    </>
  );
};

export default AppAddCart;

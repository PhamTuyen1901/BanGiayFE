"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

import { HomeOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Breadcrumb } from "antd";

import QR from "@/components/QR/QR";
import { quanLyDatSanPhamServices } from "@/server";
import { Bill } from "@/types";

const CartLayout = () => {
  const [products, setProducts] = useState<any>([]);
  const featchData = async () => {
    try {
      const { data } = await quanLyDatSanPhamServices.getAllOrders();
      //@ts-ignore
      setProducts(data.bills);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    featchData();
  }, []);
  return (
    <div className="mt-5 m-auto w-[1280px] min-h-[500px]">
      <Breadcrumb
        items={[
          {
            title: (
              <Link href={"/"}>
                <HomeOutlined />
                <span>Home</span>
              </Link>
            ),
          },
          {
            title: (
              <>
                <ShoppingCartOutlined />
                <span className="">Đơn hàng của bạn</span>
              </>
            ),
          },
        ]}
      />
      <div className=" my-4 border-t-[1px] border-[#212529]">
        {products.length > 0 ? (
          products.map((product: Bill) => (
            <div
              className="grid grid-cols-5 mt-10 border-b-[1px] border-dashed border-[#212529]"
              key={product?.billId}
            >
              <div className=" col-span-3 flex gap-5 ">
                <img
                  src={product?.products.productImage}
                  className="w-[200px] h-[180px] pb-2 "
                  alt={product?.products.productName}
                />
                <div className=" flex flex-col gap-2">
                  <p>
                    Tên sản phẩm : <>{product?.products.productName}</>
                  </p>

                  <p className="text-red-500">
                    Giá:{" "}
                    <>
                      {parseFloat(
                        product?.products.productPrice
                      ).toLocaleString()}
                    </>
                    ₫
                  </p>
                  <p>
                    Số lượng mua : <>{product?.quantityPurchased}</>
                  </p>
                </div>
              </div>

              <div className=" col-span-1 flex flex-col items-start justify-start">
                <h3 className="font-bold">Thành tiền</h3>
                <div className="flex flex-col items-center justify-center h-full">
                  <p className="text-red-500 font-semibold text-xl">
                    {parseFloat(product?.Purchased).toLocaleString()}₫
                  </p>
                </div>
              </div>
              <div className=" col-span-1 flex flex-col items-center">
                <h3 className="font-bold">Mã QR</h3>
                <QR amount={product?.Purchased} />
              </div>
            </div>
          ))
        ) : (
          <div className="flex items-center justify-center">
            <img
              className="img-fluid"
              src="https://file.hstatic.net/200000259653/file/empty-cart_large_46db8e27ff56473ca63e3c4bb8981b64.png"
              alt="Empty cart"
            />
          </div>
        )}
      </div>
    </div>
  );
};
export default CartLayout;

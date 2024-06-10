"use client";
import React, { useEffect, useState } from "react";
import { Button, Drawer } from "antd";
import { CiShoppingCart } from "react-icons/ci";
import Link from "next/link";
import { quanLySanPhamServices } from "@/server";
import { Product } from "@/types";
import { useAppDispatch, useAppSelector } from "@/lib/hook";
import { RootState } from "@/lib/store";
import { useAuth } from "@/hook";
import { quanLyNguoiDungActions } from "@/lib/features/quanLyNguoiDung/slice";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const AppAddCart = () => {
  const [open, setOpen] = useState(false);
  const { user } = useAuth();
  const router = useRouter();
  const [products, setProducts] = useState<any>([]);
  const dispatch = useAppDispatch();
  const { isReload, carts } = useAppSelector((state: RootState) => state.users);
  const [totalSavings, setTotalSavings] = useState(0);
  const showDrawer = () => {
    setOpen(true);
    // fetchData();
  };

  const onClose = () => {
    setOpen(false);
  };

  const fetchData = async () => {
    try {
      const productPromises = carts.map((id) =>
        quanLySanPhamServices.getProductsByID(id)
      );
      const productResponses = await Promise.all(productPromises);
      const productData = productResponses.map((response) => response.data);
      setProducts(productData);
      setTotalSavings(
        productData.reduce((accumulator: any, product) => {
          //@ts-ignore
          const savings =
            //@ts-ignore
            (product?.productPrice * 1 - //@ts-ignore
              product?.productPrice * 1 * (product?.productDiscount / 100)) *
            1;
          return accumulator + savings;
        }, 0)
      );
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [isReload, user, carts]);
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
            <div className="text-[#979696] text-[14px] flex justify-between items-center">
              <p>Thêm ghi chú</p>
              <Link href={"./cart"}>
                <p className="text-[#979696]">Xem chi tiết giỏ hàng</p>
              </Link>
            </div>
            <div
              className=" bg-red-500 active:bg-red-700 rounded-md text-white text-[16px] px-2 py-2 text-center mt-5 cursor-pointer duration-300"
              onClick={() => router.push(`./cart`)}
            >
              <p>
                THANH TOÁN{" "}
                <span>{Math.floor(totalSavings).toLocaleString()}₫</span>
              </p>
            </div>
          </div>
        }
      >
        <div className="flex justify-between flex-col h-full">
          <div className=" flex flex-col gap-5">
            {products &&
              products.map((product: Product) => (
                <div
                  key={product?.productId}
                  className="border-b pb-3 grid-cols-4 grid items-center justify-end"
                >
                  <img
                    src={product?.productImage}
                    alt={product?.productName}
                    className="w-[100px] h-[80px]"
                  />
                  <div className="col-span-2">
                    <p>Tên sản phẩm :{product.productName}</p>
                  </div>
                  <div>
                    <Button
                      danger
                      onClick={() => {
                        dispatch(quanLyNguoiDungActions.deleteCart(product));
                        toast.warning("Xóa sản phẩm khỏi giỏ hàng thành công!");
                      }}
                    >
                      Xóa{" "}
                    </Button>
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

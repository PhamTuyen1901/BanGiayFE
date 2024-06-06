"use client";
import React, { useEffect, useState } from "react";
import { Button, Drawer } from "antd";
import { BsHeart } from "react-icons/bs";
import { quanLyNguoiDungServices } from "@/server";
import { useAuth } from "@/hook";
import { useAppSelector } from "@/lib/hook";
import { RootState } from "@/lib/store";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { Product } from "@/types";

const AppWishLishDrawer = () => {
  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState(false);
  const { user } = useAuth();
  const router = useRouter();
  const { isReload } = useAppSelector((state: RootState) => state.users);

  const fetchData = async () => {
    try {
      if (user) {
        const { data } = await quanLyNguoiDungServices.getfavoritesUser(
          user.userId
        );
        //@ts-ignore
        if (data.data) setProducts(data.data);
        else setProducts([]);
      }
    } catch (error) {
      setProducts([]);
      console.log(error);
    }
  };

  const showDrawer = () => {
    setOpen(true);
    fetchData();
  };

  const onClose = () => {
    setOpen(false);
  };

  const onSubmit = (value: Product) => {
    onClose();
    router.push(`/products/${value.productId}`);
  };

  const onDeleteProduct = async (product: Product) => {
    try {
      await quanLyNguoiDungServices.deletefavorites({
        userId: user.userId,
        productId: product.productId,
      });
      toast.success("Xóa thành công sản phẩm!");

      fetchData();
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [user, isReload]);

  return (
    <>
      <div
        className="flex gap-2 items-center cursor-pointer"
        onClick={showDrawer}
      >
        <p>Yêu thích</p>
        <BsHeart />
      </div>

      <Drawer
        title="Danh mục sản phẩm yêu thích"
        onClose={onClose}
        open={open}
        placement="bottom"
      >
        <div className="h-[200px]">
          {products.map((productP: any) => (
            <div
              className="grid grid-cols-5 gap-3 h-full items-center"
              key={productP?.id}
            >
              <div className="col-span-1">
                <img
                  src={productP?.product?.productImage}
                  alt="product"
                  className="w-[200px] h-[180px]"
                />
              </div>
              <div className="col-span-3 flex flex-col gap-1">
                <p>{productP?.product?.productName}</p>
                <p>{productP?.product?.productPrice}</p>
              </div>
              <div className="col-span-1">
                <Button
                  danger
                  className="mr-2"
                  onClick={() => onDeleteProduct(productP?.product)}
                >
                  Xóa
                </Button>
                <Button onClick={() => onSubmit(productP?.product)}>
                  Mua Ngay
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Drawer>
    </>
  );
};

export default AppWishLishDrawer;

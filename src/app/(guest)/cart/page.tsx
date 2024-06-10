"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

import { HomeOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Breadcrumb, Button, InputNumber, InputNumberProps, Modal } from "antd";

import QR from "@/components/QR/QR";
import { quanLyDatSanPhamServices, quanLySanPhamServices } from "@/server";
import { Product } from "@/types";
import { RootState } from "@/lib/store";
import { useAppDispatch, useAppSelector } from "@/lib/hook";
import { toast } from "react-toastify";
import { useAuth } from "@/hook";
import { quanLyNguoiDungActions } from "@/lib/features/quanLyNguoiDung/slice";
import { useRouter } from "next/navigation";

const CartLayout = () => {
  const [products, setProducts] = useState<any>([]);
  const [totalSavings, setTotalSavings] = useState(0);
  const { carts } = useAppSelector((state: RootState) => state.users);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { user } = useAuth();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const getTotalQuantity = () => {
    return products.reduce(
      (total: any, product: any) => total + (product.quantity || 0),
      0
    );
  };
  ///---model qr và thanh toán
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleOk = async () => {
    const currentDate = new Date();
    currentDate.setUTCHours(currentDate.getUTCHours() + 7);
    const formattedDate = currentDate.toISOString().slice(0, 10);
    if (user) {
      console.log(formattedDate);
      //@ts-ignore
      for (const product of products) {
        const price =
          product.quantity *
          (product.productPrice * 1 -
            product.productPrice * 1 * (product.productDiscount / 100)) *
          1;
        try {
          const res = await quanLySanPhamServices.updateProduct(
            product.productId,
            {
              quantityPurchased: product.quantity,
            }
          );

          let dataProduct = {
            userId: user.userId,
            productId: product.productId,
            quantityPurchased: product.quantity,
            DatePurchase: formattedDate,
            Purchased: `${price}`,
          };

          const { data } = await quanLyDatSanPhamServices.bookingProducts(
            dataProduct
          );
        } catch (error) {
          console.log(error);
          toast.error("Vui lòng kiểm tra lại thông tin!");
        }
      }

      toast.success("Bạn đã đặt hàng thành công!");
      dispatch(quanLyNguoiDungActions.deleteAllCart());
      setIsModalOpen(false);
      router.push("/orders");
    } else toast.error("Vui lòng đặng nhập trước khi đặt hàng!");
  };
  //model qr và thanh toán---//

  //load du lieu
  const fetchData = async () => {
    try {
      const productPromises = carts.map((id: any) =>
        quanLySanPhamServices.getProductsByID(id)
      );
      const productResponses = await Promise.all(productPromises);
      const productData = productResponses.map((response) => ({
        ...response.data,
        quantity: 1,
      }));
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

  //---thay doi so luong sp
  const onChange = (value: any, productId: any) => {
    const updatedProducts = products.map((product: any) => {
      if (product.productId === productId) {
        return { ...product, quantity: Number(value) };
      }
      return product;
    });
    setProducts(updatedProducts);
    setTotalSavings(
      updatedProducts.reduce((accumulator: any, product: any) => {
        const productPrice = parseFloat(product.productPrice);
        const productDiscount = parseFloat(product.productDiscount);
        const quantity = parseFloat(product.quantity);

        if (isNaN(productPrice) || isNaN(productDiscount) || isNaN(quantity)) {
          return accumulator;
        }

        const savings = quantity * (productPrice * (1 - productDiscount / 100));

        return accumulator + savings;
      }, 0)
    );
  };
  /// thay doi sl san pham ----//

  useEffect(() => {
    fetchData();
  }, [carts]);
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
      <div className="grid-cols-4 grid justify-center">
        <div className=" col-span-3 my-4 border-t-[1px] border-[#212529]">
          {products.length > 0 ? (
            products.map((product: Product) => (
              <div
                className="grid grid-cols-5 mt-10 border-b-[1px] border-dashed border-[#212529]"
                key={product?.productId}
              >
                <div className=" col-span-3 flex gap-5 ">
                  <img
                    src={product?.productImage}
                    className="w-[200px] h-[180px] pb-2 "
                    alt={product?.productName}
                  />
                  <div className=" flex flex-col gap-2">
                    <p>
                      Tên sản phẩm : <>{product?.productName}</>
                    </p>

                    <p className="text-red-500">
                      Giá:{" "}
                      <>{parseFloat(product?.productPrice).toLocaleString()}</>₫
                    </p>
                    <p>
                      Giảm giá: <>{product.productDiscount}</>%
                    </p>
                  </div>
                </div>

                <div className=" col-span-1 flex flex-col items-center">
                  <h3 className="pb-2">Số lượng mua</h3>
                  <InputNumber
                    min={1}
                    max={100000}
                    defaultValue={1}
                    onChange={(e) => onChange(e, product.productId)}
                  />
                </div>
                <div className=" col-span-1 flex flex-col items-center justify-center">
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
        <div className=" fixed top-52 right-40 w-[250px] h-[250px] bg-white z-0 p-4">
          <h2 className=" text-xl ">Thông tin đơn hàng</h2>
          <p className="py-3 border-b border-[#cdcdcd]">
            Tạm tính ({getTotalQuantity()} sản phẩm)
          </p>
          <div className="flex justify-between my-2">
            Tổng cộng:
            <p className="text-red-500 font-semibold text-xl">
              <span>{totalSavings.toLocaleString()}₫</span>
            </p>
          </div>
          <div
            className=" w-[250px]  bg-red-500 active:bg-red-700 rounded-md text-white text-[16px] px-2 py-2 text-center mt-5 cursor-pointer duration-300"
            onClick={() => {
              if (products.length > 0) {
                showModal();
              } else toast.error("Bạn chưa chọn sản phẩm nào !");
            }}
          >
            <p>ĐẶT HÀNG</p>
          </div>
        </div>
      </div>
      <Modal
        title="Mã QR code"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div className="flex items-center justify-center">
          <QR amount={Math.floor(totalSavings)} />
        </div>
      </Modal>
    </div>
  );
};
export default CartLayout;

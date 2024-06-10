"use client";
import React, { useRef, useState } from "react";
import { CiHeart } from "react-icons/ci";
import { Modal, Rate, Tooltip } from "antd";
import { useRouter } from "next/navigation";
import { Product } from "@/types";
import { useAppDispatch } from "@/lib/hook";
import { quanLyNguoiDungActions } from "@/lib/features/quanLyNguoiDung/slice";
import { toast } from "react-toastify";
import { quanLyNguoiDungServices } from "@/server";
import { useAuth } from "@/hook";
import Swal from "sweetalert2";
export const CardProduct = ({ product }: { product: Product }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

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
          onClick={() => router.push(`products/${product.productId}`)}
        />
        <p>{product.productName.slice(0, 15)}</p>
        <p className="text-red-400">
          {parseFloat(product.productPrice).toLocaleString()}đ
        </p>
        <p>FREESHIP</p>
        <div className="flex items-center  justify-between gap-1 w-full  ">
          <button
            className="bg-[#eceff1]  active:bg-[#dae3ea] py-[5px] w-[45%] rounded-lg cursor-pointer button_overlay "
            onClick={showModal}
          >
            Xem nhanh
          </button>
          <button
            className=" bg-red-500 active:bg-red-800  py-[5px]  w-[45%] rounded-md text-white cursor-pointer button_overlay "
            onClick={() => {
              if (user) {
                Swal.fire({
                  icon: "success",
                  title: "Sản phẩm đã được thêm vào giỏ hàng !",
                  showConfirmButton: false,
                  timer: 1500,
                });

                dispatch(quanLyNguoiDungActions.addCart(product));
              } else {
                toast.error("Vui lòng đăng nhập trước !");
              }
            }}
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
      <Modal
        title="Thông tin sản phẩm"
        open={isModalOpen}
        footer={false}
        onCancel={handleCancel}
        width={600}
      >
        <div className="grid grid-cols-3">
          <div className="col-span-1">
            <img
              src={product.productImage}
              alt={product.productName}
              className="w-[140px] h-[160px] cursor-pointer"
              onClick={() => router.push(`products/${product.productId}`)}
            />
          </div>
          <div className="col-span-2">
            <h4 className="font-semibold">
              Tên sản phẩm:{product?.productName}
            </h4>
            <Rate disabled defaultValue={5} />
            <div className=" grid grid-cols-3 py-3 ">
              <p className="font-semibold text-[14px]">
                Tình trạng:{" "}
                <span className="font-normal">
                  {product && product?.productStatus == 1
                    ? `Còn hàng`
                    : `Sản phẩm hiện chưa có`}
                </span>
              </p>
              <p className="font-semibold text-[14px]">
                Thương hiệu:{" "}
                <span className="font-normal">{product?.productTmName}</span>
              </p>
              <p className="font-semibold text-[14px]">
                Lượt mua:{" "}
                <span className="font-normal">{product?.productSoldQt}</span>
              </p>
              <p className="font-semibold text-[14px]">
                Khuyễn Mãi:{" "}
                <span className="font-normal">{product?.productDiscount}%</span>
              </p>
            </div>
            <p className="font-semibold text-[14px]">
              Thông tin sản phẩm:{" "}
              <span className="font-normal">
                {product?.productInfor.slice(0, 50)}
              </span>
            </p>
            <div className="py-3 border-y-[1px] border-[#dee2e6]">
              <p className="text-[20px] text-red-400 font-semibold">
                Giá:{" "}
                {product && parseFloat(product?.productPrice).toLocaleString()}₫{" "}
              </p>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default CardProduct;

"use client";
import {
  Breadcrumb,
  InputNumber,
  Modal,
  Radio,
  RadioChangeEvent,
  Rate,
} from "antd";
import { HomeOutlined, ProductOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import ProductNavFor from "@/components/layout/product/product.slick";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { quanLyDatSanPhamServices, quanLySanPhamServices } from "@/server";
import { Product } from "@/types";
import { toast } from "react-toastify";
import { useAuth } from "@/hook";
import { useAppDispatch } from "@/lib/hook";
import { quanLyNguoiDungActions } from "@/lib/features/quanLyNguoiDung/slice";
const ProductsPage = () => {
  const router = useRouter();
  const { slug }: { slug: string } = useParams();
  const dispatch = useAppDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [product, setProduct] = useState<Product | null>();
  const { user } = useAuth();
  const fetchProducts = async () => {
    try {
      const { data } = await quanLySanPhamServices.getProductsByID(slug);
      //@ts-ignore
      setProduct(data);
    } catch (error) {
      console.log(error);
    }
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const [size, setSize] = useState(39);
  const [quantity, setQuantity] = useState(1);
  const onChange = (e: RadioChangeEvent) => {
    setSize(e.target.value);
  };
  const onChangeNumber: any = (value: number) => {
    setQuantity(value);
  };

  const booking = async () => {
    const currentDate = new Date();
    currentDate.setUTCHours(currentDate.getUTCHours() + 7);
    const formattedDate = currentDate.toISOString().slice(0, 10);
    console.log(formattedDate);
    //@ts-ignore
    const price =
      quantity * //@ts-ignore
      (product?.productPrice * 1 - //@ts-ignore
        product?.productPrice * 1 * (product?.productDiscount / 100)) *
      1;

    try {
      const res = await quanLySanPhamServices.updateProduct(
        product?.productId,
        {
          quantityPurchased: quantity,
        }
      );
      let dataProduct = {
        userId: user.userId,
        productId: product?.productId,
        quantityPurchased: quantity,
        DatePurchase: formattedDate,
        Purchased: `${price}`,
      };

      const { data } = await quanLyDatSanPhamServices.bookingProducts(
        dataProduct
      );
      console.log(data);

      toast.success("Bạn đã đặt hàng thành công!");
      dispatch(quanLyNguoiDungActions.addReLoad());
      router.push("/cart");
    } catch (error) {
      console.log(error);
      toast.error("Vui lòng kiểm tra lại thông tin!");
    }
  };
  useEffect(() => {
    fetchProducts();
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
              <Link href={"/products"}>
                <ProductOutlined />
                <span>Tất cả sản phẩm</span>
              </Link>
            ),
          },
          {
            title: <span>{slug}</span>,
          },
        ]}
      />
      <div className=" grid grid-cols-5 gap-10 my-5">
        <div className="col-span-2">
          <ProductNavFor product={product} />
        </div>
        <div className="col-span-3">
          <div>
            <h4 className="font-semibold">{product?.productName}</h4>
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
                Khuyễn Mãi:{" "}
                <span className="font-normal">{product?.productDiscount}%</span>
              </p>
            </div>
            <p className="font-semibold text-[14px]">
              Thông tin sản phẩm:{" "}
              <span className="font-normal">{product?.productInfor}</span>
            </p>
            <div className="py-3 border-y-[1px] border-[#dee2e6]">
              <p className="text-[20px] text-red-400 font-semibold">
                {product && parseFloat(product?.productPrice).toLocaleString()}₫{" "}
              </p>
            </div>
            <div className=" py-3 flex flex-col gap-10  ">
              <div className=" flex gap-20">
                <h5>Kích thước</h5>
                <p onClick={showModal} className="cursor-pointer">
                  Hướng dẫn chọn size
                </p>
              </div>
              <div className="">
                <Radio.Group onChange={onChange} value={size}>
                  <Radio value={39}>39</Radio>
                  <Radio value={40}>40</Radio>
                  <Radio value={41}>41</Radio>
                  <Radio value={42}>42</Radio>
                </Radio.Group>
              </div>
              <div className=" flex gap-20">
                <InputNumber
                  size="large"
                  min={1}
                  max={10}
                  defaultValue={quantity}
                  onChange={onChangeNumber}
                />
                <button className="w-[60%] border border-black bg-white duration-500 hover:bg-black hover:text-white rounded-lg">
                  THÊM VÀO GIỎ HÀNG
                </button>
              </div>
              <div className="">
                <button
                  onClick={booking}
                  className=" w-full py-[10px] bg-red-400 duration-500 active:bg-red-600 font-semibold text-white rounded-lg"
                >
                  MUA NGAY
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        title="Hướng dẫn chọn size"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={false}
      >
        <img
          src="https://file.hstatic.net/1000365025/file/img_v3_028v_64655aa8-a524-4a5d-ab6a-f25184810ahu_e5a74d60eb24440c96723ef65a80ecb7.jpg"
          alt=""
        />
      </Modal>
    </div>
  );
};
export default ProductsPage;

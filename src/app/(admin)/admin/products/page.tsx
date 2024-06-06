"use client";

import { SearchProps } from "antd/es/input";
import React, { useEffect, useRef, useState } from "react";
import { IoIosAddCircleOutline } from "react-icons/io";
import {
  Button,
  Form,
  type FormProps,
  Input,
  Modal,
  Table,
  Select,
  DatePicker,
  Space,
  InputNumber,
  SelectProps,
} from "antd";
import { toast } from "react-toastify";
import { CiEdit } from "react-icons/ci";
import { quanLySanPhamServices } from "@/server";
import { Product } from "@/types";
import { render } from "react-dom";
const { Search } = Input;

const page = () => {
  const [formData, setFormData] = useState({
    productId: "",
    styleId: "",
    productTmName: "",
    productName: "",
    productImage: "",
    productStatus: "",
    productPrice: "",
    productQuantity: "",
    productSoldQt: "",
    productInfor: "",
    productIntro: "",
    productDiscount: "",
  });

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    const newValue =
      name === "TstyleId" ||
      name === "productStatus" ||
      name === "productQuantity" ||
      name === "productSoldQt" ||
      name === "productDiscount"
        ? parseInt(value)
        : value.toString();
    setFormData({
      ...formData,
      [name]: newValue,
    });
  };

  const [searchProducts, setSearchProducts] = useState("");
  const [dataProducts, setDataProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
  const [selectedProductType, setSelectedProductType] = useState<any>();
  const [options, setOptions] = useState<SelectProps["options"]>([]);
  const handleTypeRoomChange = (value: string) => {
    //@ts-ignore
    if (options) setSelectedProductType(options[value * 1 - 1].label);
  };

  //dữ liệu bảng
  const columns: any = [
    {
      title: "ID Sản phẩm",
      dataIndex: "productId",
      key: "productId",
    },
    {
      title: "Tên hãng sản phẩm",
      dataIndex: "productTmName",
      key: "productTmName",
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "productName",
      key: "productName",
    },
    {
      title: "Giá",
      dataIndex: "productPrice",
      key: "productPrice",
      render: (price: number) => (
        <span>
          {new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
          }).format(price)}
        </span>
      ),
    },
    {
      title: "Hình ảnh",
      dataIndex: "productImage",
      key: "productImage",
      render: (value: any) => <p className="w-[200px]"> {value}</p>,
    },
    {
      title: "Số lượng",
      dataIndex: "productQuantity",
      key: "productQuantity",
    },
    {
      title: "Số lượng đã bán",
      dataIndex: "productSoldQt",
      key: "productSoldQt",
    },
    {
      title: "Tình Trạng",
      key: "productStatus",
      dataIndex: "productStatus",
      align: "center",
      render: (status: any) => (status ? "Còn hàng" : "Hết hàng"),
    },
    {
      title: "Giảm giá",
      dataIndex: "productDiscount",
      key: "productDiscount",
      render: (value: any) => <p> {value} %</p>,
    },
    {
      title: "Chỉnh sửa",
      key: "action",
      //@ts-ignore
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="dashed"
            danger
            onClick={() => {
              showModallUpdate(record);
            }}
          >
            <CiEdit className="text-2xl" />
          </Button>
        </Space>
      ),
    },
  ];
  //hàm lấy dữ liệu
  const fetchData = async () => {
    try {
      if (searchProducts) {
        const { data } = await quanLySanPhamServices.getProductsByID(
          searchProducts
        );
        //@ts-ignore
        const newData = [{ ...data, key: data.productId }];
        //@ts-ignore
        setDataProducts(newData);
      } else {
        const { data } = await quanLySanPhamServices.getAllProducts();
        //@ts-ignore
        const newDataProducts = data.map((item: Product) => ({
          ...item,
          key: item.productId,
        }));

        setDataProducts(newDataProducts);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const onFinish: FormProps<any>["onFinish"] = async (values) => {
    try {
      const { data } = await quanLySanPhamServices.createProduct({
        ...values,
        productStatus: 1,
        productTmName: selectedProductType,
        productSoldQt: 0,
      });
      toast.success("Thêm sản phẩm thành công!");
      handleCancel();
      fetchData();
    } catch (error) {
      console.error("Error create new products:", error);
      toast.error("Vui lòng kiểm tra lại thông tin sản phẩm !");
    }
  };
  const fetchProductType = async () => {
    try {
      const { data } = await quanLySanPhamServices.getProductType();
      //@ts-ignore

      const newOptions = data.map((type: any) => ({
        value: type.styleId,
        label: type.styleName,
      }));
      setOptions(newOptions);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const onFinishUpdate = async () => {
    const { productId, ...newFormData } = formData;

    //@ts-ignore
    delete newFormData.key;

    try {
      const res = await quanLySanPhamServices.updateInfoProduct(productId, {
        ...newFormData, //@ts-ignore
        productTmName: options[newFormData.styleId - 1].label,
      });
      toast.success("Cập nhật thông tin sản phẩm thành công!");
      handleCancelUpdate();
      fetchData();
    } catch (error) {
      console.error("Error create new Staff:", error);
    }
  };

  //modal thêm sản phẩm
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  // modal sửa
  const handleCancelUpdate = () => {
    setIsModalUpdateOpen(false);
  };
  const showModallUpdate = (record: any) => {
    setIsModalUpdateOpen(true);
    setFormData(record);
  };

  //search
  const onSearch: SearchProps["onSearch"] = async (value, _e, info) => {
    setSearchProducts(value);
  };

  useEffect(() => {
    fetchData();
    fetchProductType();
  }, [searchProducts]);

  return (
    <>
      <div className="flex justify-between items-center mb-4 overflow-hidden">
        <Search
          placeholder="Tìm kiếm sản phẩm theo Mã Sản Phẩm"
          allowClear
          onSearch={onSearch}
          style={{ width: 400 }}
        />
        <Button>
          <div className="flex gap-2 items-center" onClick={showModal}>
            <IoIosAddCircleOutline />
            <span>Thêm sản phẩm</span>
          </div>
        </Button>
      </div>
      {dataProducts && <Table dataSource={dataProducts} columns={columns} />}
      <Modal
        title="Thêm sản phẩm"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={false}
      >
        <Form
          name="productForm"
          style={{ maxWidth: 600 }}
          labelCol={{ span: 8 }}
          onFinish={onFinish}
        >
          <Form.Item
            label="Tên sản phẩm"
            name="productName"
            rules={[
              { required: true, message: "Không được bỏ trống thông tin này!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Loại Sản Phẩm"
            name="styleId"
            rules={[
              { required: true, message: "Không được bỏ trống thông tin này!" },
            ]}
          >
            <Select options={options} onChange={handleTypeRoomChange} />
          </Form.Item>
          <Form.Item
            label="Thông Tin Sản Phẩm"
            name="productInfor"
            rules={[
              { required: true, message: "Không được bỏ trống thông tin này!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Thông Tin Giới Thiệu"
            name="productIntro"
            rules={[
              { required: true, message: "Không được bỏ trống thông tin này!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Giá"
            name="productPrice"
            rules={[
              { required: true, message: "Không được bỏ trống thông tin này!" },
            ]}
          >
            <InputNumber style={{ width: "100%" }} min={0} />
          </Form.Item>
          <Form.Item label="Ảnh" name="productImage">
            <Input />
          </Form.Item>
          <Form.Item
            label="Số lượng"
            name="productQuantity"
            rules={[
              { required: true, message: "Không được bỏ trống thông tin này!" },
            ]}
          >
            <InputNumber min={0} style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item label="Khuyễn Mãi" name="productDiscount">
            <InputNumber min={0} style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Thêm sản phẩm
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Sửa thông tin sản phẩm"
        open={isModalUpdateOpen}
        onCancel={handleCancelUpdate}
        footer={false}
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onFinishUpdate();
          }}
        >
          <div className="flex items-start flex-col justify-center gap-3 ">
            <div className="grid grid-cols-3 gap-5 items-center w-full ">
              <p className="col-span-1 font-semibold ">ID Sản phẩm:</p>
              <input
                type="text"
                className="border col-span-2 bg-white border-gray-300 text-gray-900 rounded-md block w-full py-1 text-center "
                required
                value={formData.productId}
                disabled
              />
            </div>
            <div className="grid grid-cols-3 gap-5 items-center w-full ">
              <p className="col-span-1 font-semibold ">Tên sản phẩm</p>
              <input
                type="text"
                value={formData.productName}
                className="border col-span-2 bg-white border-gray-300 text-gray-900 rounded-md block w-full py-1 text-center "
                required
                name="productName"
                onChange={handleInputChange}
              />
            </div>
            <div className="grid grid-cols-3 gap-5 items-center w-full ">
              <p className="col-span-1 font-semibold ">Nhãn Hàng</p>
              <select
                className="col-span-2 text-center bg-white border border-gray-300 text-gray-900  rounded-md  block w-full py-1"
                value={formData.styleId}
                name="styleId"
                onChange={handleInputChange}
              >
                {options?.map((option: any) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-3 gap-5 items-center w-full ">
              <p className="col-span-1 font-semibold ">Đường link ảnh</p>
              <textarea
                aria-atomic
                value={formData.productImage}
                className="border col-span-2 bg-white border-gray-300 text-gray-900 rounded-md block w-full py-1 text-center "
                required
                name="productImage"
                onChange={handleInputChange}
              />
            </div>
            <div className="grid grid-cols-3 gap-5 items-center w-full">
              <p className="col-span-1 font-semibold ">Giá</p>
              <input
                type="number"
                className="border col-span-2 bg-white border-gray-300 text-gray-900 rounded-md block w-full py-1 text-center "
                value={formData.productPrice}
                name="productPrice"
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="grid grid-cols-3 gap-5 items-center w-full">
              <p className="col-span-1 font-semibold ">Số lượng</p>
              <input
                type="number"
                className="border col-span-2 bg-white border-gray-300 text-gray-900 rounded-md block w-full py-1 text-center "
                value={formData.productQuantity}
                name="productQuantity"
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="grid grid-cols-3 gap-5 items-center w-full">
              <p className="col-span-1 font-semibold ">
                Số lượng sản phẩm đã được bán
              </p>
              <input
                type="text"
                className="border col-span-2 bg-white border-gray-300 text-gray-900 rounded-md block w-full py-1 text-center "
                value={formData.productSoldQt}
                name="productSoldQt"
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="grid grid-cols-3 gap-5 items-center w-full">
              <p className="col-span-1 font-semibold ">Trạng thái Sản phẩm</p>
              <select
                className="col-span-2 text-center bg-white border border-gray-300 text-gray-900 rounded-md block w-full py-1"
                value={formData.productStatus}
                name="productStatus"
                onChange={handleInputChange}
                required
              >
                <option value={0}>Hết Hàng</option>
                <option value={1}>Còn Hàng</option>
              </select>
            </div>
            <div className="grid grid-cols-3 gap-5 items-center w-full">
              <p className="col-span-1 font-semibold ">Khuyến mãi</p>
              <input
                type="number"
                className="border col-span-2 bg-white border-gray-300 text-gray-900 rounded-md block w-full py-1 text-center "
                value={formData.productDiscount}
                name="productDiscount"
                onChange={handleInputChange}
                min={0}
                max={100}
                required
              />
            </div>
            <div className="grid grid-cols-3 gap-5 items-center w-full">
              <p className="col-span-1 font-semibold ">Thông tin sản phẩm</p>
              <textarea
                aria-atomic
                className="border col-span-2 bg-white border-gray-300 text-gray-900 rounded-md block w-full py-1 text-center "
                value={formData.productInfor}
                name="productInfor"
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="grid grid-cols-3 gap-5 items-center w-full">
              <p className="col-span-1 font-semibold ">Thông tin giới thiệu</p>
              <textarea
                aria-atomic
                className="border col-span-2 bg-white border-gray-300 text-gray-900 rounded-md block w-full py-1 text-center "
                value={formData.productIntro}
                name="productIntro"
                onChange={handleInputChange}
                required
              />
            </div>
            <button
              type="submit"
              className="font-semibold border-black border-[1px] rounded-md px-2 py-1 w-full hover:bg-slate-200 duration-300 active:bg-slate-500 "
            >
              Cập nhật
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default page;

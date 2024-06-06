"use client";
import React, { useEffect, useState } from "react";
import { Button, Space, Table, Tag } from "antd";
import type { TableProps } from "antd";
import { CiEdit } from "react-icons/ci";
import { Input } from "antd";
import { SearchProps } from "antd/es/input";
import { IoIosAddCircleOutline } from "react-icons/io";
import { quanLyDatSanPhamServices, quanLySanPhamServices } from "@/server";

const { Search } = Input;

const columns: TableProps<any>["columns"] = [
  {
    title: "Mã Hóa Đơn",
    dataIndex: "billId",
    key: "billId",
    align: "center",
  },
  {
    title: "ID Người Đặt",
    dataIndex: "userId",
    key: "userId",
    align: "center",
  },

  {
    title: "Mã Sản Phẩm",
    key: "productId",
    dataIndex: "productId",
    align: "center",
  },
  {
    title: "Số Lượng",
    key: "quantityPurchased",
    dataIndex: "quantityPurchased",
    align: "center",
  },
  {
    title: "Ngày Thanh Toán",
    key: "DatePurchase",
    dataIndex: "DatePurchase",
    align: "center",
  },
  {
    title: "Tổng Số Tiền",
    key: "Purchased",
    dataIndex: "Purchased",
    align: "center",
    render: (price: any) => (
      <span>
        {new Intl.NumberFormat("vi-VN", {
          style: "currency",
          currency: "VND",
        }).format(price)}
      </span>
    ),
  },
];

const ShopAdminPage = () => {
  const [searchBill, setSearchBill] = useState();
  const [dataBills, setDataBills] = useState();
  const onSearch: SearchProps["onSearch"] = (value, _e, info) =>
    //@ts-ignore
    setSearchBill(value);
  const featchData = async () => {
    try {
      if (searchBill) {
        const { data } = await quanLyDatSanPhamServices.getBillsByID(
          searchBill
        );

        //@ts-ignore
        const newData = [{ ...data, key: data.billId }];

        //@ts-ignore
        setDataBills(newData);
      } else {
        const { data } = await quanLyDatSanPhamServices.getAllBills();
        //@ts-ignore
        const newDataProducts = data.map((item: any) => ({
          ...item,
          key: item.billId,
        }));

        setDataBills(newDataProducts);
      }
    } catch (error) {}
  };
  useEffect(() => {
    featchData();
  }, [searchBill]);
  return (
    <div className="bg-white p-4 h-full rounded-md ">
      <div className="flex justify-between items-center mb-4">
        <Search
          placeholder="Tìm hóa đơn theo Mã hóa đơn"
          onSearch={onSearch}
          allowClear
          style={{ width: 400 }}
        />
      </div>
      <Table columns={columns} dataSource={dataBills} />
    </div>
  );
};
export default ShopAdminPage;

"use client";

import { useAuth } from "@/hook";
import { quanLyDatSanPhamServices, quanLyNguoiDungServices } from "@/server";
import { Bill, Product } from "@/types";
import { Table, TableProps } from "antd";
import { useEffect, useState } from "react";

const AccountOrderPage = () => {
  const [products, setProducts] = useState([]);
  const { user } = useAuth();
  const fetchData = async () => {
    try {
      const { data } = await quanLyDatSanPhamServices.getAllOrders();
      //@ts-ignore
      const dataForm = data.bills.map((item: Bill, index) => ({
        key: index,
        name: item.products.productName,

        price: item.products.productPrice,
        quantity: item.quantityPurchased,
        date: item.DatePurchase,
      }));

      setProducts(dataForm);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  const columns: TableProps<any>["columns"] = [
    {
      title: "Tên sản phẩm",
      dataIndex: "name",
      key: "name",
      align: "center",
    },

    {
      title: "Giá sản phẩm",
      dataIndex: "price",
      key: "price",
      align: "center",
      render: (value: any) => (
        <span> {parseFloat(value).toLocaleString()}₫ </span>
      ),
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
      align: "center",
    },

    {
      title: "Ngày mua",
      dataIndex: "date",
      key: " date",
      align: "center",
    },
  ];

  return (
    <div className="w-full account_content border-[1px] border-black min-h-[450px] ">
      <h2 className=" bg-black text-white py-2 px-6 text-xl  ">
        Lịch sử mua hàng
      </h2>
      <div className="table-responsive p-2">
        {products?.length == 0 ? (
          <p>Bạn chưa đặt mua sản phẩm nào! </p>
        ) : (
          <div>
            <Table
              columns={columns}
              dataSource={products}
              pagination={{ pageSize: 5 }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default AccountOrderPage;

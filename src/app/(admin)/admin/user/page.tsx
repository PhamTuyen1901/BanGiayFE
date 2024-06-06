"use client";
import React, { useEffect, useState } from "react";
import { Button, Modal, Space, Table } from "antd";
import type { TableProps } from "antd";
import { CiEdit } from "react-icons/ci";
import { Input } from "antd";
import { SearchProps } from "antd/es/input";
import { toast } from "react-toastify";
import { quanLyNguoiDungServices } from "@/server";
import { UserProfile } from "@/types";

const { Search } = Input;

const UserAdminPage = () => {
  const [formData, setFormData] = useState({
    userId: "",
    userName: "",
    userEmail: "",
    userAddress: "",
    userPhoneNumber: "",
    userTypeId: "",
  });
  const [searchGuest, setSearchGuest] = useState("");
  const [dataUsers, setDataUsers] = useState();
  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);

  const columns: TableProps<any>["columns"] = [
    {
      title: "Mã Người dùng",
      dataIndex: "userId",
      key: "userId",
      render: (text) => <p>{text}</p>,
    },
    {
      title: "Tên Người dùng",
      dataIndex: "userName",
      key: "userName",
    },
    {
      title: "Email",
      dataIndex: "userEmail",
      key: "userEmail",
    },
    {
      title: "Địa chỉ",
      dataIndex: "userAddress",
      key: "userAddress",
    },
    {
      title: "Số điện thoại",
      dataIndex: "userPhoneNumber",
      key: "userPhoneNumber",
    },
    {
      title: "Phân Quyền",
      key: "userTypeId",
      dataIndex: "userTypeId",
      render: (userTypeId: any) => (
        <p>{userTypeId == 1 ? "Người Dùng" : "Admin"}</p>
      ),
    },
    {
      title: "Thao Tác",
      key: "action",
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

          <Button type="primary" danger>
            Delete
          </Button>
        </Space>
      ),
    },
  ];
  const showModallUpdate = (record: any) => {
    //@ts-ignore
    setFormData({
      userId: record.userId,
      userName: record.userName !== null ? record.userName : "",
      userEmail: record.userEmail !== null ? record.userEmail : "",
      userAddress: record.userAddress !== null ? record.userAddress : "",
      userPhoneNumber:
        record.userPhoneNumber !== null ? record.userPhoneNumber : "",
      userTypeId: record.userTypeId,
    });
    setIsModalUpdateOpen(true);
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  //hàm lấy dữ liệu
  const fetchData = async () => {
    try {
      const { data } = searchGuest
        ? await quanLyNguoiDungServices.getUserByName(searchGuest)
        : await quanLyNguoiDungServices.getAllUser();

      // @ts-ignore
      const newData = data.map((item: UserProfile) => ({
        ...item,
        key: item.userId,
      }));
      setDataUsers(newData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const onSearch: SearchProps["onSearch"] = (value, _e, info) =>
    setSearchGuest(value);

  const handleCancelUpdate = () => {
    setIsModalUpdateOpen(false);
  };
  const onFinishUpdate = async () => {
    const { userId, ...newFormData } = formData;
    try {
      const res = await quanLyNguoiDungServices.updateInfoUserAdmin(
        userId,
        newFormData
      );
      toast.success("Cập nhật thông tin người dùng thành công!");

      handleCancelUpdate();
      fetchData();
    } catch (error) {
      console.error("Error:", error);
      toast.error("Kiểm tra lại thông tin người dùng!");
    }
  };
  useEffect(() => {
    fetchData();
  }, [searchGuest]);
  return (
    <div className="bg-white p-4 h-full rounded-md ">
      <div className="flex justify-between items-center mb-4">
        <Search
          placeholder="Tìm người dùng theo tên người dùng"
          allowClear
          onSearch={onSearch}
          style={{ width: 400 }}
        />
      </div>
      <Table columns={columns} dataSource={dataUsers} />

      <Modal
        title="Sửa thông tin Người Dùng"
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
              <p className="col-span-1 font-semibold ">ID Người Dùng:</p>
              <input
                type="text"
                className="border cursor-not-allowed col-span-2 bg-white border-gray-300 text-gray-900 rounded-md block w-full py-1 text-center "
                required
                value={formData.userId}
                disabled
              />
            </div>
            <div className="grid grid-cols-3 gap-5 items-center w-full ">
              <p className="col-span-1 font-semibold ">Tên Người Dùng</p>
              <input
                type="text"
                value={formData.userName}
                className="border col-span-2 bg-white border-gray-300 text-gray-900 rounded-md block w-full py-1 text-center "
                required
                name="userName"
                onChange={handleInputChange}
              />
            </div>
            <div className="grid grid-cols-3 gap-5 items-center w-full ">
              <p className="col-span-1 font-semibold ">Email</p>
              <input
                type="text"
                value={formData.userEmail}
                className="border col-span-2 cursor-not-allowed bg-white border-gray-300 text-gray-900 rounded-md block w-full py-1 text-center "
                required
                name="userEmail"
                disabled
                onChange={handleInputChange}
              />
            </div>
            <div className="grid grid-cols-3 gap-5 items-center w-full">
              <p className="col-span-1 font-semibold ">Địa Chỉ</p>
              <input
                type="text"
                className="border col-span-2 bg-white border-gray-300 text-gray-900 rounded-md block w-full py-1 text-center "
                value={formData.userAddress}
                name="userAddress"
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="grid grid-cols-3 gap-5 items-center w-full">
              <p className="col-span-1 font-semibold ">Số Điện Thoại</p>
              <input
                type="text"
                className="border col-span-2 bg-white border-gray-300 text-gray-900 rounded-md block w-full py-1 text-center "
                value={formData.userPhoneNumber}
                name="userPhoneNumber"
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="grid grid-cols-3 gap-5 items-center w-full">
              <p className="col-span-1 font-semibold ">Phân Quyền</p>
              <select
                className="col-span-2 text-center bg-white border border-gray-300 text-gray-900 rounded-md block w-full py-1"
                value={formData.userTypeId}
                name="userTypeId"
                onChange={handleInputChange}
                required
              >
                <option value={1}>Người Dùng</option>
                <option value={2}>Admin</option>
              </select>
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
    </div>
  );
};
export default UserAdminPage;

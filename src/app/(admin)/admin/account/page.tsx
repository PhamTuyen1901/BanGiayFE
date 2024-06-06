"use client";
import { useAuth } from "@/hook";
import { getUserInfoThunk } from "@/lib/features/quanLyNguoiDung/thunk";
import { useAppDispatch } from "@/lib/hook";
import { quanLyNguoiDungServices } from "@/server";
import { Modal } from "antd";
import React, { useEffect, useState } from "react";
import { FaMapMarkerAlt, FaPhone, FaUserEdit } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";
import { RiUser3Fill } from "react-icons/ri";
import { RxAvatar } from "react-icons/rx";
import { toast } from "react-toastify";

const AcountAdmintPage = () => {
  const { user } = useAuth();
  const dispatch = useAppDispatch();
  const [dataUser, setDataUser] = useState(user);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onFinish = async () => {
    try {
      await quanLyNguoiDungServices.updateInfoUser(dataUser);
      dispatch(getUserInfoThunk());
      toast.success("Cập nhật thông tin thành công!");
      handleCancel();
    } catch (error) {
      console.error("Error :", error);
      toast.error("Vui lòng kiểm tra lại thông tin!");
    }
  };
  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setDataUser({
      ...dataUser,
      [name]: value,
    });
  };
  useEffect(() => {
    if (user) {
      setDataUser(user);
    }
  }, [user]);
  return (
    <div className="bg-white p-4 h-full rounded-md ">
      <h2 className="text-xl">Thông Tin Người Dùng</h2>
      <span className="my-2">
        <RxAvatar className="text-5xl" />
      </span>
      <table className="table mt-5 ">
        <tbody>
          <tr>
            <td className="flex gap-2 items-center">
              <RiUser3Fill />
              <span className="customize-text">Họ tên</span>
            </td>
            <td>{user?.userName}</td>
          </tr>
          <tr>
            <td className="flex gap-2 items-center">
              <MdOutlineMailOutline />{" "}
              <span className="customize-text">Email</span>
            </td>
            <td>{user?.userEmail}</td>
          </tr>
          <tr>
            <td className="flex gap-2 items-center">
              <FaPhone />
              <span className="customize-text">Số điện thoại</span>
            </td>
            <td>{user?.userPhoneNumber}</td>
          </tr>
          <tr>
            <td className="flex gap-2 items-center">
              <FaMapMarkerAlt />
              <span className="customize-text">Địa chỉ</span>
            </td>
            <td>{user?.userAddress}</td>
          </tr>
          <tr>
            <td className="flex gap-2 items-center">
              <FaMapMarkerAlt />
              <span className="customize-text">Phân Quyền</span>
            </td>
            <td>{user?.userTypeId == 1 ? "Người Dùng" : "Admin"}</td>
          </tr>
          <tr>
            <td className="flex gap-2 items-center">
              <FaUserEdit />
              <span
                className="customize-text cursor-pointer"
                onClick={() => showModal()}
              >
                Chỉnh sửa thông tin cá nhân
              </span>
            </td>
          </tr>
        </tbody>
      </table>
      <Modal
        title="Chỉnh sửa thông tin tài khoản"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={false}
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onFinish();
          }}
        >
          <div className="flex items-start flex-col justify-center gap-3 ">
            <div className="grid grid-cols-3 gap-5 items-center w-full ">
              <p className="col-span-1 font-semibold ">Tên Người Dùng</p>
              <input
                type="text"
                value={dataUser?.userName}
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
                value={dataUser?.userEmail}
                className="border col-span-2 cursor-not-allowed bg-white border-gray-300 text-gray-900 rounded-md block w-full py-1 text-center "
                required
                disabled
                name="userEmail"
                onChange={handleInputChange}
              />
            </div>
            <div className="grid grid-cols-3 gap-5 items-center w-full">
              <p className="col-span-1 font-semibold ">Địa Chỉ</p>
              <input
                type="text"
                className="border col-span-2 bg-white border-gray-300 text-gray-900 rounded-md block w-full py-1 text-center "
                value={dataUser?.userAddress}
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
                value={dataUser?.userPhoneNumber}
                name="userPhoneNumber"
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
    </div>
  );
};

export default AcountAdmintPage;

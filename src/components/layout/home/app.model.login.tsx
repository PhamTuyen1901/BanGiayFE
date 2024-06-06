"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

import { Modal, Tabs } from "antd";
import { LiaUserEditSolid } from "react-icons/lia";

import ForgetPasswordForm from "../formHeaderGuest/ForgetPasswordForm";
import { SignInForm } from "../formHeaderGuest";
import SignUpForm from "../formHeaderGuest/SignUpForm";
import { useAppDispatch } from "@/lib/hook";
import { useAuth } from "@/hook";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { loginThunk, registerThunk } from "@/lib/features/quanLyAuth/authThunk";
import { getUserInfoThunk } from "@/lib/features/quanLyNguoiDung/thunk";

const AppModelLogin = () => {
  const dispatch = useAppDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const onFinishLogin = async (values: any) => {
    dispatch(loginThunk(values))
      .unwrap()
      .then(() => {
        dispatch(getUserInfoThunk());
        toast.success("Đang nhập thành công !");
        handleCancel();
      })
      .catch((error: any) => {
        toast.error("Tài khoản hoặc mật khẩu không chính xác !");
      });
  };
  const onFinishRegister = async (values: any) => {
    const { agreement, confirm_password, ...dataLogin } = values;

    dispatch(registerThunk(dataLogin))
      .unwrap()
      .then(() => {
        dispatch(getUserInfoThunk());
        toast.success("Đăng kí thành công !");
        handleCancel();
      })
      .catch((error: any) => {
        toast.error("Email đã được đăng ký!");
        console.log(error);
      });
  };
  const ItemForm = [
    {
      label: "Đăng Nhập",
      key: "dangNhap",
      children: (
        <SignInForm onFinish={onFinishLogin} setIsModalOpen={setIsModalOpen} />
      ),
    },
    {
      label: "Quên mật khẩu",
      key: "quenMatKhau",
      children: <ForgetPasswordForm />,
    },
    {
      label: "Đăng ký",
      key: "dangKy",
      children: <SignUpForm onFinish={onFinishRegister} />,
    },
  ];

  const showModal = () => {
    setIsModalOpen(true);
  };

  const { user } = useAuth();

  const router = useRouter();
  useEffect(() => {
    //@ts-ignore
    if (user?.role === "admin") {
      router.push("/admin");
    }
  }, [user]);
  return (
    <>
      {user !== undefined ? (
        <Link
          href={"/account"}
          className="flex gap-2 items-center cursor-pointer"
        >
          <p>Tài khoản</p>
          <LiaUserEditSolid />
        </Link>
      ) : (
        <div
          className="flex gap-2 items-center cursor-pointer"
          onClick={showModal}
        >
          <p>Tài khoản</p>
          <LiaUserEditSolid />
        </div>
      )}
      <Modal
        footer={false}
        open={isModalOpen}
        onCancel={handleCancel}
        width={700}
      >
        <Tabs tabPosition={"left"} items={ItemForm} />
      </Modal>
    </>
  );
};

export default AppModelLogin;

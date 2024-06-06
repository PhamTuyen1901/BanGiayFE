"use client";
import React from "react";
import { Form, Input } from "antd";
import { GoogleLogin } from "@react-oauth/google";

import axios from "axios";
import { toast } from "react-toastify";
import { useAppDispatch } from "@/lib/hook";
import { getUserInfoThunk } from "@/lib/features/quanLyNguoiDung/thunk";
import { removeCharactersBeforePipe } from "@/lib/features/quanLyAuth/authSlice";
export const SignInForm = ({ onFinish, setIsModalOpen }: any) => {
  const dispatch = useAppDispatch();
  const handleGoogleLoginSuccess = async (credentialResponse: any) => {
    try {
      const { data } = await axios.post(
        "http://127.0.0.1:8000/api/auth/google",
        {
          credential: credentialResponse.credential,
        }
      );

      const newToken = await removeCharactersBeforePipe(data.token);

      if (data) localStorage.setItem("token", newToken);
      dispatch(getUserInfoThunk());
      setIsModalOpen(false);
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Vui lòng kiểm tra lại thông tin!");
    }
  };
  const handleGoogleLoginFailure: any = (error: any) => {
    console.error("Login Failed:", error);
    toast.error("Vui lòng kiểm tra lại thông tin!");
  };
  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 24 }}
      layout="vertical"
      onFinish={onFinish}
      autoComplete="off"
    >
      <Form.Item
        label="Email"
        name="userEmail"
        rules={[{ required: true, message: "Vui lòng nhập Email!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Mật khẩu"
        name="userPassword"
        rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item>
        <button
          type="submit"
          className="w-full bg-black text-white py-2 font-semibold text-[16px] rounded-md"
        >
          ĐẶNG NHẬP
        </button>
      </Form.Item>
      <Form.Item>
        <div className="w-100%">
          <GoogleLogin
            onSuccess={handleGoogleLoginSuccess}
            onFailure={handleGoogleLoginFailure}
            cookiePolicy={"single_host_origin"}
          />
        </div>
      </Form.Item>
    </Form>
  );
};

export default SignInForm;

import React from "react";
import { Form, Input, Checkbox } from "antd";

const SignUpForm = ({ onFinish, onFinishFailed, form }: any) => (
  <Form
    name="basic"
    form={form}
    labelCol={{ span: 8 }}
    wrapperCol={{ span: 24 }}
    layout="vertical"
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    autoComplete="off"
  >
    <Form.Item
      label="Tên người dùng"
      name="userName"
      rules={[{ required: true, message: "Vui lòng nhập tên người dùng!" }]}
    >
      <Input />
    </Form.Item>
    <Form.Item
      label="Email"
      name="userEmail"
      rules={[
        { required: true, message: "Vui lòng nhập email!" },
        { type: "email", message: "Vui lòng nhập đúng định dạng email!" },
      ]}
    >
      <Input />
    </Form.Item>
    <Form.Item
      label="Mật khẩu"
      name="userPassword"
      rules={[
        { required: true, message: "Vui lòng nhập mật khẩu!" },
        { min: 6, message: "Mật khẩu phải có ít nhất 6 ký tự!" },
        {
          pattern: /^(?=.*[A-Z])|(?=.*[!@#$%^&*])/,
          message:
            "Mật khẩu phải chứa ít nhất một ký tự in hoa hoặc một ký tự đặc biệt!",
        },
      ]}
    >
      <Input.Password />
    </Form.Item>
    <Form.Item
      label="Xác nhận lại mật khẩu"
      name="confirm_password"
      dependencies={["userPassword"]}
      rules={[
        { required: true, message: "Vui lòng xác nhận lại mật khẩu của bạn!" },
        ({ getFieldValue }) => ({
          validator(_, value) {
            if (!value || getFieldValue("userPassword") === value) {
              return Promise.resolve();
            }
            return Promise.reject(new Error("Mật khẩu không trùng khớp!"));
          },
        }),
      ]}
    >
      <Input.Password />
    </Form.Item>
    <Form.Item
      label="Địa chỉ"
      name="userAddress"
      rules={[{ required: true, message: "Vui lòng nhập địa chỉ!" }]}
    >
      <Input />
    </Form.Item>
    <Form.Item
      label="Số điện thoại"
      name="userPhoneNumber"
      rules={[
        { required: true, message: "Vui lòng nhập số điện thoại của bạn!" },
        { len: 10, message: "Số phải có ít nhất 10 ký tự!" },
        {
          pattern: /^[0-9]+$/,
          message: "Số điện thoại chỉ bao gồm các chữ số từ 0 đến 9!",
        },
      ]}
    >
      <Input />
    </Form.Item>
    <Form.Item
      style={{ marginBottom: 8 }}
      name="agreement"
      valuePropName="checked"
      rules={[
        { required: true, message: "Bạn cần đọc và đồng ý với thỏa thuận!" },
      ]}
    >
      <Checkbox>Tôi đã đọc tất cả điều khoản</Checkbox>
    </Form.Item>
    <Form.Item>
      <button
        type="submit"
        className="w-full bg-black text-white py-2 font-semibold text-[16px] rounded-md"
      >
        ĐĂNG KÝ
      </button>
    </Form.Item>
  </Form>
);

export default SignUpForm;

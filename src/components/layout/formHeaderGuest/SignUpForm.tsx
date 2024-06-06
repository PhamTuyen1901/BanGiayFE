import React from "react";
import { Form, Input, Checkbox } from "antd";

const SignUpForm = ({ onFinish, onFinishFailed }: any) => (
  <Form
    name="basic"
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
      rules={[{ required: true, message: "Vui lòng nhập email!" }]}
    >
      <Input />
    </Form.Item>
    <Form.Item
      label="Email"
      name="userEmail"
      rules={[{ required: true, message: "Vui lòng nhập email!" }]}
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
    <Form.Item
      label="Xác nhận lại mật khẩu"
      name="confirm_password"
      dependencies={["userPassword"]}
      rules={[
        {
          required: true,
          message: "Vui lòng xác nhận lại mật khẩu của bạn!",
        },
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
      label="Số điện thoai"
      name="userPhoneNumber"
      rules={[
        { required: true, message: "Vui lòng nhập số điện thoai của bạn !" },
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
      <Checkbox>
        Tôi đã đọc tất cả <a href="">điều khoản</a>
      </Checkbox>
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

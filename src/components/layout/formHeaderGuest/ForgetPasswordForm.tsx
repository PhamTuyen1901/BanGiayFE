import React from "react";
import { Form, Input } from "antd";

const ForgetPasswordForm = ({ onFinish, onFinishFailed }: any) => (
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
      label="E-mail"
      name="email"
      rules={[{ required: true, message: "Vui lòng nhập email!" }]}
    >
      <Input />
    </Form.Item>
    <Form.Item>
      <button
        type="submit"
        className="w-full bg-black text-white py-2 font-semibold text-[16px] rounded-md"
      >
        XÁC NHẬN
      </button>
    </Form.Item>
  </Form>
);

export default ForgetPasswordForm;

"use client";
import { useAuth } from "@/hook";
import React from "react";

const AccountAddressPage = () => {
  const { user } = useAuth();
  return (
    <div className="w-full account_content border-[1px] border-black min-h-[300px]">
      <h2 className=" bg-black text-white py-2 px-6 text-xl  ">
        Danh sách địa chỉ
      </h2>
      <div className="table-responsive p-2">{user?.userAddress}</div>
    </div>
  );
};

export default AccountAddressPage;

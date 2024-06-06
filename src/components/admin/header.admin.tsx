"use client";

import { quanLyNguoiDungActions } from "@/lib/features/quanLyNguoiDung/slice";
import { useAppDispatch } from "@/lib/hook";
import { Popover } from "antd";
import Link from "next/link";
import React from "react";
import { RxAvatar } from "react-icons/rx";

const HeaderAdmin = () => {
  const dispath = useAppDispatch();
  const content = (
    <div className="flex flex-col text-[16px]">
      <Link href={"/admin/account"} className="px-2">
        Thông tin tài khoản
      </Link>
      <Link
        href={"/"}
        className="px-2"
        onClick={() => dispath(quanLyNguoiDungActions.logOut())}
      >
        Đăng xuất
      </Link>
    </div>
  );
  return (
    <div className="w-full bg-white py-4 px-6">
      <div className="flex justify-end ">
        <Popover content={content} placement="bottomRight" trigger="click">
          <button>
            <RxAvatar className="text-2xl" />
          </button>
        </Popover>
      </div>
    </div>
  );
};

export default HeaderAdmin;

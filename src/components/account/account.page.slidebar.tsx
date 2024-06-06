"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { AiOutlineUser } from "react-icons/ai";

import style from "./account.module.scss";
import { useAppDispatch } from "@/lib/hook";
import { quanLyNguoiDungActions } from "@/lib/features/quanLyNguoiDung/slice";
const AccountSideBar = () => {
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  return (
    <div className={style.accountSidebar}>
      <div>
        <div className="flex flex-col items-center justify-center">
          <div className="avatar">
            <AiOutlineUser />
          </div>
          <p>
            Hi, <span className="font-semibold">Trần Thành</span>
          </p>
        </div>
      </div>
      <div>
        <ul>
          <li className={`link ${pathname === "/account" ? style.active : ""}`}>
            <Link href={"/account"}>Thông tin tài khoản</Link>
          </li>
          <li
            className={`link ${
              pathname === "/account/order" ? style.active : ""
            }`}
          >
            <Link href={"/account/order"}>Lịch sử mua hàng</Link>
          </li>
          <li
            className={`link ${
              pathname === "/account/address" ? style.active : ""
            }`}
          >
            <Link href={"/account/address"}>Danh sách địa chỉ</Link>
          </li>
          <li>
            <Link
              href={"/"}
              onClick={() => dispatch(quanLyNguoiDungActions.logOut())}
            >
              Đăng xuất
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AccountSideBar;

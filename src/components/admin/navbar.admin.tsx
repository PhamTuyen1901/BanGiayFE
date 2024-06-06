"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { CiShop, CiShoppingCart } from "react-icons/ci";
import { FaHome } from "react-icons/fa";
import { FaUserTag } from "react-icons/fa6";
import "./navbar.admin.scss";
import Image from "next/image";
import logo from "../../../public/img/logo.jpg";
const NavbarAdmin = () => {
  const pathname = usePathname();

  return (
    <div className=" px-4">
      <ul className=" text-white flex flex-col gap-6 pt-10 items-start  ">
        <li className=" flex flex-col items-center  border-b-[1px] border-white  pb-4 w-full justify-center">
          <div className="flex items-center gap-2">
            <Image
              src={logo}
              alt="logo"
              width={40}
              height={40}
              className="rounded-full"
            />
            <h1 className="font-sans font-semibold text-2xl">Web Shose</h1>
          </div>
          <h2 className="font-sans font-semibold text-xl">ADMIN</h2>
        </li>
        <li>
          <p className="text-[#606a70]">Main</p>
        </li>
        <li className={`link ${pathname === "/admin" ? "active" : ""}`}>
          <Link href={"/admin"}>
            <div className="flex items-center gap-2 ">
              <FaHome /> <span>Dashboard</span>
            </div>
          </Link>
        </li>
        <li
          className={`link ${pathname === "/admin/products" ? "active" : ""}`}
        >
          <Link href={"/admin/products"}>
            <div className="flex items-center gap-2 ">
              <CiShoppingCart />
              <span>Products</span>
            </div>
          </Link>
        </li>
        <li className={`link ${pathname === "/admin/user" ? "active" : ""}`}>
          <Link href={"/admin/user"}>
            <div className="flex items-center gap-2 ">
              <FaUserTag />
              <span>User</span>
            </div>
          </Link>
        </li>
        <li className={`link ${pathname === "/admin/bill" ? "active" : ""}`}>
          <Link href={"/admin/bill"}>
            <div className="flex items-center gap-2 ">
              <CiShop />
              <span>Bill</span>
            </div>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default NavbarAdmin;

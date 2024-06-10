import React, { useState } from "react";
import type { MenuProps } from "antd";
import { Dropdown, Space } from "antd";
import { SlArrowDown } from "react-icons/sl";
import Link from "next/link";
import { useRouter } from "next/navigation";
const AppNavbar = () => {
  const router = useRouter();
  const [openProduct, setOpenProduct] = useState(false);
  const [openManShose, setOpenManShose] = useState(false);
  const [openWomenShose, setOpenWomenShose] = useState(false);

  const handleMenuClick: MenuProps["onClick"] = (e) => {
    if (e.key === "3") {
      setOpenProduct(false);
      setOpenManShose(false);
      setOpenWomenShose(false);
    }
  };

  const handleOpenChange: any = (nextOpen: any, info: any) => {
    const { key } = info;
    if (key === "product") setOpenProduct(nextOpen);
    if (key === "manShose") setOpenManShose(nextOpen);
    if (key === "womenShose") setOpenWomenShose(nextOpen);
  };

  const items1: MenuProps["items"] = [
    {
      label: "Hàng Mới Về",
      key: "1",
      // onClick(()=>router.push())
      onClick: () => router.push("/products"),
    },
    {
      label: "Giày Nam",
      key: "2",
      onClick: () => router.push("/products"),
    },
    {
      label: "Giày Nữ",
      key: "3",
      onClick: () => router.push("/products"),
    },
  ];

  const items2: MenuProps["items"] = [
    {
      label: "Giày Sneaker",
      key: "1",
      onClick: () => router.push("/products"),
    },
    {
      label: "Giày Lười",
      key: "2",
      onClick: () => router.push("/products"),
    },
    {
      label: "Giày Cao Cổ",
      key: "3",
      onClick: () => router.push("/products"),
    },
  ];
  const items3: MenuProps["items"] = [
    {
      label: "Giày  Sneaker",
      key: "1",
      onClick: () => router.push("/products"),
    },
    {
      label: "Giày Cao Cổ",
      key: "2",
      onClick: () => router.push("/products"),
    },
  ];
  return (
    <>
      <ul className="flex items-center  justify-end  gap-14 mt-3">
        <li className="font-semibold text-sm hover:text-[#007bff] duration-500">
          <Dropdown
            overlayClassName="w-[200px]"
            menu={{
              items: items1,
              onClick: handleMenuClick,
            }}
            onOpenChange={(open) => handleOpenChange(open, { key: "product" })}
            open={openProduct}
          >
            <a href="#!" onClick={(e) => e.preventDefault()}>
              <Space>
                SẢN PHẨM
                <SlArrowDown className="text-[11px]" />
              </Space>
            </a>
          </Dropdown>
        </li>
        <li className="font-semibold text-sm hover:text-[#007bff] duration-500">
          <Dropdown
            overlayClassName="w-[200px]"
            menu={{
              items: items2,
              onClick: handleMenuClick,
            }}
            onOpenChange={(open) => handleOpenChange(open, { key: "manShose" })}
            open={openManShose}
          >
            <a href="#!" onClick={(e) => e.preventDefault()}>
              <Space>
                GIÀY NAM
                <SlArrowDown className="text-[11px]" />
              </Space>
            </a>
          </Dropdown>
        </li>
        <li className=" font-semibold text-sm hover:text-[#007bff] duration-500">
          <Dropdown
            overlayClassName="w-[200px]"
            menu={{
              items: items3,
              onClick: handleMenuClick,
            }}
            onOpenChange={(open) =>
              handleOpenChange(open, { key: "womenShose" })
            }
            open={openWomenShose}
          >
            <a href="#!" onClick={(e) => e.preventDefault()}>
              <Space>
                GIÀY NỮ
                <SlArrowDown className="text-[11px]" />
              </Space>
            </a>
          </Dropdown>
        </li>
        <li className="font-semibold text-sm hover:text-[#007bff] duration-500 ">
          <a href="#!" onClick={(e) => e.preventDefault()}>
            <Space>SALE-OFF</Space>
          </a>
        </li>
        <li className=" font-semibold text-sm hover:text-[#007bff] duration-500">
          <Link href="/orders">
            <Space>THÔNG TIN ĐƠN HÀNG</Space>
          </Link>
        </li>
      </ul>
    </>
  );
};

export default AppNavbar;

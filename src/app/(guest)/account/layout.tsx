import { Breadcrumb } from "antd";
import React from "react";
import { HomeOutlined, UserOutlined } from "@ant-design/icons";
import AccountSideBar from "@/components/account/account.page.slidebar";
import Link from "next/link";
const AccountPage = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="mt-5 m-auto w-[1280px] min-h-[500px]">
      <Breadcrumb
        items={[
          {
            title: (
              <Link href={"/"}>
                <HomeOutlined />
                <span>Home</span>
              </Link>
            ),
          },
          {
            title: (
              <>
                <UserOutlined />
                <span>Thông tin cá nhân</span>
              </>
            ),
          },
        ]}
      />
      <div className="border-t-[1px] border-[#212529] my-4"></div>
      <div className="grid grid-cols-4 gap-5">
        <div className="col-span-1">
          <AccountSideBar />
        </div>
        <div className="col-span-3 pb-5">{children}</div>
      </div>
    </div>
  );
};

export default AccountPage;

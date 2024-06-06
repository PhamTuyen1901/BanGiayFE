import React from "react";

import { AntdRegistry } from "@ant-design/nextjs-registry";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

import StoreProvider from "./StoreProvider";

import "./globals.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
const RootLayout = ({ children }: React.PropsWithChildren) => (
  <html lang="en">
    <body>
      <StoreProvider>
        <GoogleOAuthProvider clientId={process.env.GOOGLE_ID}>
          <ToastContainer autoClose={1000} />
          <AntdRegistry>{children}</AntdRegistry>{" "}
        </GoogleOAuthProvider>
      </StoreProvider>
    </body>
  </html>
);

export default RootLayout;

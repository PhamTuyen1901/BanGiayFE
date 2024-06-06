import AppHeader from "@/components/header/app.header";
import AppFooter from "@/components/footer/app.footer";
import BackToTop from "@/components/footer/backToTop";

import "./home.scss";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AppHeader />
      {children}
      <AppFooter />
      <BackToTop />
    </>
  );
}

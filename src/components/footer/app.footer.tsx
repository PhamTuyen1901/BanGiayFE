import React from "react";
import { FiFacebook } from "react-icons/fi";
import { PiYoutubeLogoLight } from "react-icons/pi";
import { PiInstagramLogoLight } from "react-icons/pi";
import "./footer.scss";
const AppFooter = () => {
  return (
    <footer>
      <div className="border-[ #E8E8F2]  border-t-[1px] mb-5 h-[1px]"></div>
      <div className="grid grid-cols-4 gap-4 m-auto w-[1280px]">
        <div className="footer-top-item">
          <h4 className="text-[16px] font-semibold">Truy cập nhanh</h4>
          <ul className="">
            <li>
              <a href="">Giới thiệu</a>
            </li>
            <li>
              <a href="">Tất cả sản phẩm</a>
            </li>
            <li>
              <a href="">Sản phẩm nổi bật</a>
            </li>
            <li>
              <a href="">OUTLET</a>
            </li>
          </ul>
          <ul className="flex items-center gap-2 ">
            <li>
              <FiFacebook className=" text-xl" />
            </li>

            <li>
              <PiYoutubeLogoLight className=" text-xl" />
            </li>

            <li>
              <PiInstagramLogoLight className=" text-xl" />
            </li>
          </ul>
        </div>
        <div className="footer-top-item">
          <h4 className="text-[16px] font-semibold">
            Điều khoản và chính sách
            <button className="f-button">
              <i className="lni lni-chevron-up"></i>
            </button>
          </h4>
          <ul>
            <li>
              <a href="">Chính sách giao hàng</a>
            </li>
            <li>
              <p>Chính sách đổi trả - bảo hành</p>
            </li>
            <li>
              <a href="">Chính sách bảo mật</a>
            </li>
          </ul>
        </div>
        <div className="footer-top-item">
          <h4 className="text-[16px] font-semibold">
            Câu hỏi thường gặp
            <button className="f-button">
              <i className="lni lni-chevron-up"></i>
            </button>
          </h4>
          <ul>
            <li>
              <a href="">Hướng dẫn chọn size</a>
            </li>
            <li>
              <a href="">Hướng dẫn vệ sinh giày</a>
            </li>
            <li>
              <a href="">Chương trình khuyến mãi</a>
            </li>
          </ul>
        </div>
        <div className="footer-top-item">
          <h4 className="text-[16px] font-semibold">
            Hệ thống cửa hàng &amp; Đại lý
            <button className="f-button">
              <i className="lni lni-chevron-up"></i>
            </button>
          </h4>
          <ul className="list-store">
            <li className="list-store-item">
              <a>
                Thành phố Hồ Chí Minh <span> (2 cửa hàng)</span>
              </a>
            </li>
            <li className="list-store-item">
              <a>
                COX SHOES Vũng Tàu <span> (1 cửa hàng)</span>
              </a>
            </li>
            <li className="list-store-item">
              <a>
                COX SHOES Đà Lạt <span> (1 cửa hàng)</span>
              </a>
            </li>
            <li className="list-store-item">
              <a>
                COX SHOES Bình Phước <span> (1 cửa hàng)</span>
              </a>
            </li>
            <li className="list-store-item">
              <a>
                COX SHOES Cần Thơ <span> (1 cửa hàng)</span>
              </a>
            </li>
            <li className="list-store-more">
              <a href="">Xem tất cả...</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-[ #E8E8F2]  border-t-[1px] mt-5 h-[1px]"></div>
      <div className="grid grid-cols-3 m-auto w-[1280px] py-2 items-center ">
        <div className=" text-center">
          <div className="r">
            <a href="#" className="logo">
              <img
                className="w-[200px]"
                src="//theme.hstatic.net/1000365025/1001081286/14/logo_fbottom.png?v=1132"
                data-src="//theme.hstatic.net/1000365025/1001081286/14/logo_fbottom.png?v=1132"
                alt="DinCox Shoes"
              />
            </a>
          </div>
        </div>
        <div className="text-center">
          <div className="logo-footer ratiobox">
            <a
              href="/"
              target="_blank"
              rel="nofollow noreferrer"
              aria-label="Logo bộ công thương"
            >
              <img
                className=" lazyloaded"
                data-src="//theme.hstatic.net/1000365025/1001081286/14/logo_bct.png?v=1132"
                src="//theme.hstatic.net/1000365025/1001081286/14/logo_bct.png?v=1132"
                alt="Bộ Công Thương"
              />
            </a>
          </div>
        </div>
        <div className=" text-center">
          <p className="text-copyright mb-0">
            © 2024 - All rights reserved by{" "}
            <a target="_blank" href="">
              Shoes.
            </a>{" "}
            <a target="_blank" href=""></a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default AppFooter;

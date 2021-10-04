import React from "react";
import ImgKM from "../../assets/img/KM1.jpeg";
import ImgKM2 from "../../assets/img/KM2.jpeg";

function News() {
  return (
    <div className="w-9/12 m-auto py-32 text-center">
      <h1
        className="font-bold pb-12"
        style={{ color: "white", fontSize: "30px" }}
      >
        TIN TỨC KHUYẾN MÃI
      </h1>
      <div
        className="grid grid-cols-2 gap-5  h-full text-white"
        style={{ color: "wheat" }}
      >
        <div className="">
          <img
            src={ImgKM}
            alt=""
            className=" lg:h-64 md:h-56 sm:h-40 h-24"
            // style={{ height: "250px", width: "500px" }}
          />
          <div className="sm:h-18 h-20 pt-5">
            <h1
              className="md:text-lg sm:text-base text-xs"
              style={{ color: "white" }}
            >
              BHD 59K/VÉ CẢ TUẦN !!!
            </h1>
          </div>

          <span className="md:text-base text-xs">
            Tận hưởng Ưu Đãi lên đến 3 VÉ BHD Star mỗi tuần chỉ với giá 59k/vé
            khi mua vé trên TIX hoặc Mục Vé Phim trên ZaloPay.
          </span>
        </div>
        <div>
          <img
            src={ImgKM2}
            alt=""
            className=" lg:h-64 md:h-56 sm:h-40 h-24 "
            // style={{ height: "250px", width: "500px" }}
          />
          <div className="sm:h-18 h-20 pt-5">
            <h1
              className="md:text-lg sm:text-base text-xs"
              style={{ color: "white" }}
            >
              CGV 59K/VÉ 2D MỖI THỨ 2 CUỐI CÙNG CỦA THÁNG
            </h1>
          </div>

          <span className="md:text-base text-xs">
            CGV áp dụng chương trình khuyến mại giá vé mới cực kỳ ưu đãi vào
            ngày thứ 2 cuối cùng của mỗi tháng. Đồng giá vé 50.000đ/vé 2D tại
            các rạp CGV ở Hồ Chí Minh, Hà Nội và 45.000đ/vé 2D tại các rạp còn
            lại.
          </span>
        </div>
      </div>
    </div>
  );
}

export default News;

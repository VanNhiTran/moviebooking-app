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
          <img src={ImgKM} alt="" style={{ height: "250px", width: "500px" }} />
          <h1 style={{ color: "white", fontSize: "20px", padding: "15px 0" }}>
            BHD 59K/VÉ CẢ TUẦN !!!
          </h1>
          <span>
            Tận hưởng Ưu Đãi lên đến 3 VÉ BHD Star mỗi tuần chỉ với giá 59k/vé
            khi mua vé trên TIX hoặc Mục Vé Phim trên ZaloPay.
          </span>
        </div>
        <div>
          <img
            src={ImgKM2}
            alt=""
            style={{ height: "250px", width: "500px" }}
          />
          <h1 style={{ color: "white", fontSize: "20px", padding: "15px 0" }}>
            CGV 59K/VÉ 2D MỖI THỨ 2 CUỐI CÙNG CỦA THÁNG
          </h1>
          <span>
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

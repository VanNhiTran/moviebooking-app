import React, { Fragment, useEffect } from "react";
import { Redirect } from "react-router";
import { TOKEN, USER_LOGIN } from "../../util/settings/config";
import screenImg from "../../assets/img/screen.png";
import bgImg from "../../assets/img/BG.png";
import desk from "../../assets/img/desk2.png";
import logo from "../../assets/img/logo.png";
import { useDispatch, useSelector } from "react-redux";
import {
  bookTicketInfoAction,
  getCinemaRoomDetailAction,
} from "../../redux/actions/QuanLyDatVeAction";
import "./Checkout.css";
import {
  CANCEL_BOOKING,
  SELECT_SEAT,
} from "../../redux/actions/types/QuanLyDatVeTypes";
import _ from "lodash";
import { Tabs } from "antd";
import { NavLink } from "react-router-dom";

function Checkout(props) {
  const { cinemaRoomDetail, arrSelectingSeats } = useSelector(
    (state) => state.QuanLyDatVeReducer
  );
  console.log(`cinemaRoomDetail`, cinemaRoomDetail);

  console.log(`arrSelectingSeats`, arrSelectingSeats);

  const { thongTinPhim, danhSachGhe } = cinemaRoomDetail;

  const { userLogin } = useSelector((state) => state.QuanLyNguoiDungReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    const { id } = props.match.params;
    dispatch(getCinemaRoomDetailAction(id));
  }, []);
  if (!localStorage.getItem(USER_LOGIN)) {
    return <Redirect to="/login" />;
  }

  const renderSeats = () => {
    return danhSachGhe?.map((seat, index) => {
      let classVipSeat = seat.loaiGhe === "Vip" ? "vipSeat" : "";
      let classBookedSeat = seat.daDat ? "bookedSeat" : " ";
      let classSelectingSeat = "";
      let indexSelectingSeat = arrSelectingSeats?.findIndex(
        (selectingSeat) => selectingSeat.maGhe === seat.maGhe
      );
      if (indexSelectingSeat !== -1) {
        classSelectingSeat = "selectingSeat";
      }

      return (
        <Fragment>
          <button
            onClick={() => {
              dispatch({
                type: SELECT_SEAT,
                selectingSeat: seat,
              });
            }}
            disabled={seat.daDat}
            className={`seat ${classVipSeat} ${classBookedSeat} ${classSelectingSeat} p-0`}
            key={index}
          >
            {seat.daDat ? <i class="fa fa-times"></i> : seat.stt}
          </button>
          {(index + 1) % 16 === 0 ? <br /> : ""}
        </Fragment>
      );
    });
  };

  return (
    <div className="py-16 px-10">
      <div className="grid grid-cols-12">
        <div className="col-span-9 m-auto text-center">
          <div className=" items-center">
            <div>
              <img src={screenImg} alt="" />
            </div>
            <div className="mt-10">{renderSeats()}</div>
          </div>

          <div className="mt-16 flex flexCheckout justify-center">
            <table className="m-auto divide-y divide-gray-200 w-1/2">
              <thead className="p-5">
                <tr>
                  <th>Ghế thường</th>
                  <th>Ghế đang đặt</th>
                  <th>Ghế vip</th>
                  <th>Ghế đã đặt</th>
                  {/* <th>Ghế mình đặt</th> */}
                  {/* <th>Ghế khách đang đặt</th> */}
                </tr>
              </thead>
              <tbody className=" divide-y divide-gray-200">
                <tr>
                  <td>
                    <div className="seat seatTable"></div>
                  </td>
                  <td>
                    <div className="seat selectingSeat seatTable"> </div>
                  </td>
                  <td>
                    <div className="seat vipSeat seatTable"></div>
                  </td>
                  <td>
                    <i class="fa fa-times checkout"></i>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="col-span-3">
          <h3 className="text-green-400 text-center text-4xl">
            TỔNG TIỀN:{" "}
            {arrSelectingSeats?.reduce((total, seat, index) => {
              return (total += seat.giaVe);
            }, 0)}
            đ
          </h3>
          <hr />
          <h3
            className="text-xl text-center mt-2  text-white pb-5"
            style={{ fontSize: "23px" }}
          >
            {thongTinPhim?.tenPhim?.toUpperCase()}
          </h3>
          <p>
            ĐỊA ĐIỂM: {thongTinPhim?.tenCumRap} - {thongTinPhim?.diaChi}
          </p>
          <p>
            NGÀY CHIẾU: {thongTinPhim?.ngayChieu} - {thongTinPhim?.gioChieu}
          </p>
          <hr />
          <div className="my-5">
            <div className="flex flexCheckout">
              {/* <span className="text-red-400 text-lg">GHẾ:</span> */}
              <img src={desk} alt="" style={{ width: "50px" }} />
              <div>
                {_.sortBy(arrSelectingSeats, ["stt"]).map(
                  (selectingSeat, index) => {
                    return (
                      <span key={index} className="text text-wheat text-lg">
                        {selectingSeat.stt}
                      </span>
                    );
                  }
                )}
              </div>
            </div>
            <div className="text-right col-span-1"></div>
          </div>
          <hr />
          <div className="my-5 flex flexCheckout">
            <i className="fa fa-envelope checkout"></i>
            {userLogin.email}
          </div>
          <hr />
          <div className="my-5 flex flexCheckout">
            <i className="fa fa-phone checkout"></i>
            {userLogin.soDT}
          </div>
          <div className="items-center" style={{ marginBottom: 0 }}>
            <div
              onClick={() => {
                if (arrSelectingSeats === []) {
                  alert("Vui lòng chọn ghế");
                } else {
                  dispatch(
                    bookTicketInfoAction({
                      maLichChieu: thongTinPhim.maLichChieu,
                      danhSachVe: arrSelectingSeats,
                      taiKhoanNguoiDung: userLogin.taiKhoan,
                    })
                  );
                }
              }}
              className="bg-green-500 text-white w-full text-center py-3 font-bold text-2xl cursor-pointer"
            >
              ĐẶT VÉ
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const { TabPane } = Tabs;
export default function (props) {
  const { userLogin } = useSelector((state) => state.QuanLyNguoiDungReducer);
  const dispatch = useDispatch();

  const { arrSelectingSeats } = props;

  const operations = (
    <Fragment>
      <button>
        <a href="/profile">Hi</a>
      </button>
      <button
        className="btnlogOut"
        onClick={() => {
          localStorage.removeItem(USER_LOGIN);
          localStorage.removeItem(TOKEN);
        }}
      >
        Đăng xuất
      </button>
    </Fragment>
  );

  return (
    <div
      style={{
        color: "wheat",
        height: "100%",
        backgroundImage: `url(${bgImg})`,
        backgroundPosition: "center",
        backgroundSize: "contain",
      }}
    >
      <NavLink
        to="/"
        className="pt-6 pl-6"
        onClick={() => {
          dispatch({
            type: CANCEL_BOOKING,
            arrSelectingSeats,
          });
        }}
      >
        <img src={logo} alt="" width={150} height={100} />
      </NavLink>
      <Tabs defaultActiveKey="1" centered tabBarExtraContent={operations}>
        <TabPane
          tab={
            <span>
              CHỌN GHẾ & THANH TOÁN
              <i className="fa fa-angle-double-right pl-5"></i>
            </span>
          }
          key="1"
        >
          <Checkout {...props} />
        </TabPane>

        <TabPane tab="KẾT QUẢ ĐẶT VÉ" key="2">
          Content of Tab Pane 2
        </TabPane>
      </Tabs>
    </div>
  );
}
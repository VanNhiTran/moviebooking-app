import React, { Fragment, useEffect } from "react";
import { Redirect } from "react-router";
import { TOKEN, USER_LOGIN } from "../../util/settings/config";
import screenImg from "../../assets/img/screen.png";
import bgImg from "../../assets/img/BG.png";
import desk from "../../assets/img/desk2.png";
import logo from "../../assets/img/logo.png";
import { useDispatch, useSelector } from "react-redux";
import "../css/checkout.css";
import {
  bookTicketInfoAction,
  getCinemaRoomDetailAction,
} from "../../redux/actions/QuanLyDatVeAction";
import "./Checkout.css";
import {
  CANCEL_BOOKING,
  CHANGE_TAB,
  CHANGE_TAB_ACTIVE,
  SELECT_SEAT,
} from "../../redux/actions/types/QuanLyDatVeTypes";
import _ from "lodash";
import { Tabs } from "antd";
import { NavLink } from "react-router-dom";
import { history } from "../../App";
import { getFullUserInfoAction } from "../../redux/actions/QuanLyNguoiDungAction";
import moment from "moment";

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
            {seat.daDat ? <i className="fa fa-times"></i> : seat.stt}
          </button>
          {(index + 1) % 16 === 0 ? <br /> : ""}
        </Fragment>
      );
    });
  };

  return (
    <div className="py-16 lg:px-10 px-1">
      <div className="grid grid-cols-12">
        <div className="lg:col-span-9 col-span-12 m-auto text-center">
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
        <div className="lg:col-span-3 lg:mt-0 lg:px-0 col-span-12  mt-10 px-20">
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
          <p>RẠP: {thongTinPhim?.tenRap}</p>
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

function BookingResult(props) {
  const { fullUserInfo } = useSelector((state) => state.QuanLyNguoiDungReducer);
  console.log(`fullUserInfo`, fullUserInfo);

  const { userLogin } = useSelector((state) => state.QuanLyNguoiDungReducer);
  console.log(`userLogin`, userLogin);

  const thongTinDatVe = fullUserInfo?.thongTinDatVe;
  console.log(`thongTinDatVe`, thongTinDatVe);

  const dispatch = useDispatch();
  let currentUser = { taiKhoan: userLogin.taiKhoan };
  useEffect(() => {
    dispatch(getFullUserInfoAction(currentUser));
  }, []);

  const renderHistory = () => {
    return thongTinDatVe?.splice(0, 10).map((ve, index) => {
      return (
        <div
          className={index % 2 === 0 ? "Rtable-row is-striped " : "Rtable-row"}
          key={index}
        >
          <div className="Rtable-cell date-cell">
            <div className="Rtable-cell--heading">Ngày đặt vé</div>
            <div className="Rtable-cell--content date-content">
              <span className="webinar-date">
                {moment(ve.ngayDat).format("DD/MM/YYYY")}
              </span>
            </div>
          </div>
          <div className="Rtable-cell topic-cell">
            <div className="Rtable-cell--content title-content">
              {ve.tenPhim}
            </div>
          </div>
          <div className="Rtable-cell access-link-cell">
            <div className="Rtable-cell--heading">Rạp</div>
            <div className="Rtable-cell--content access-link-content">
              {ve.danhSachGhe[0].tenHeThongRap}
            </div>
          </div>
          <div className="Rtable-cell replay-link-cell">
            <div className="Rtable-cell--heading">Ghế</div>
            <div className="Rtable-cell--content replay-link-content">
              {ve.danhSachGhe.map((ghe, index) => {
                return (
                  <span className="ml-3" key={index}>
                    {ghe.tenGhe}
                  </span>
                );
              })}
            </div>
          </div>
          <div className="Rtable-cell Rtable-cell--foot pdf-cell">
            <div className="Rtable-cell--heading">Giá vé</div>
            <div className="Rtable-cell--content pdf-content">
              {ve.giaVe}/vé
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <div className="wrapper">
      <h1>THÔNG TIN NGƯỜI DÙNG</h1>
      <div className="Rtable Rtable--5cols Rtable--collapse">
        <div className="Rtable-row Rtable-row--head">
          <div className="Rtable-cell date-cell column-heading">Tài khoản</div>
          <div className="Rtable-cell topic-cell column-heading">
            Tên khách hàng
          </div>
          <div className="Rtable-cell access-link-cell column-heading">
            Số điện thoại
          </div>
          <div className="Rtable-cell replay-link-cell column-heading">
            Email
          </div>
        </div>
        <div className="Rtable-row">
          <div className="Rtable-cell date-cell">
            <div className="Rtable-cell--heading">Tài khoản</div>
            <div className="Rtable-cell--content date-content">
              <span className="webinar-date">{userLogin.taiKhoan}</span>
            </div>
          </div>
          <div className="Rtable-cell topic-cell">
            <div className="Rtable-cell--content title-content">
              {userLogin.hoTen}
            </div>
          </div>
          <div className="Rtable-cell access-link-cell">
            <div className="Rtable-cell--heading">Số ĐT</div>
            <div className="Rtable-cell--content access-link-content">
              {userLogin.soDT}
            </div>
          </div>
          <div className="Rtable-cell replay-link-cell">
            <div className="Rtable-cell--heading">Email</div>
            <div className="Rtable-cell--content replay-link-content">
              {userLogin.email}
            </div>
          </div>
        </div>
      </div>
      <button
        className="mb-12"
        onClick={() => {
          dispatch({ type: CHANGE_TAB_ACTIVE });
        }}
      >
        TIẾP TỤC ĐẶT VÉ...
      </button>

      <h1>THÔNG TIN ĐẶT VÉ</h1>
      <div className="Rtable Rtable--5cols Rtable--collapse">
        <div className="Rtable-row Rtable-row--head">
          <div className="Rtable-cell date-cell column-heading">
            Ngày đặt vé
          </div>
          <div className="Rtable-cell topic-cell column-heading">Tên phim</div>
          <div className="Rtable-cell access-link-cell column-heading">Rạp</div>
          <div className="Rtable-cell replay-link-cell column-heading">Ghế</div>
          <div className="Rtable-cell pdf-cell column-heading">Giá vé</div>
        </div>
        {renderHistory()}
      </div>
    </div>
  );
}

const { TabPane } = Tabs;

export default function (props) {
  const { userLogin } = useSelector((state) => state.QuanLyNguoiDungReducer);

  const { activeKey } = useSelector((state) => state.QuanLyDatVeReducer);

  const dispatch = useDispatch();

  const { arrSelectingSeats } = props;

  const operations = (
    <Fragment>
      <button>Hi</button>
      <button
        onSubmit={(e) => {
          e.preventDefault();
        }}
        className="btnlogOut"
        onClick={() => {
          localStorage.removeItem(USER_LOGIN);
          localStorage.removeItem(TOKEN);
          history.push("/");
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
      <Tabs
        defaultActiveKey="1"
        activeKey={activeKey.toString()}
        centered
        tabBarExtraContent={operations}
      >
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
          <BookingResult />
        </TabPane>
      </Tabs>
    </div>
  );
}

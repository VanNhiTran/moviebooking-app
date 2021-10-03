import React, { useEffect, useState } from "react";
import { Form, Input, Button, Checkbox, Select } from "antd";
import { Cascader } from "antd";
import { DatePicker } from "antd";
import { InputNumber } from "antd";
import { quanLyRapService } from "../../../../services/QuanLyRapService";
import { useFormik } from "formik";
import moment from "moment";
import { quanLyDatVeService } from "../../../../services/QuanLyDatVeService";

export default function ShowTime(props) {
  const formik = useFormik({
    initialValues: {
      maPhim: props.match.params.id,
      ngayChieuGioChieu: "",
      maRap: "",
      giaVe: "",
    },
    onSubmit: async (values) => {
      console.log("values", values);
      try {
        const result = await quanLyDatVeService.addShowtimes(values);

        alert(result.data);
      } catch (error) {
        console.log("error", error.response?.data);
      }
    },
  });

  const [state, setState] = useState({
    heThongRapChieu: [],
    cumRapChieu: [],
  });
  console.log(state.heThongRapChieu);

  useEffect(async () => {
    try {
      let result = await quanLyRapService.getCinemaInfo();
      setState({
        ...state,
        heThongRapChieu: result.data,
      });
    } catch (error) {}
  }, []);

  const handleChangeHeThongRap = async (value) => {
    try {
      let result = await quanLyRapService.getCinemaSystemInfo(value);
      setState({
        ...state,
        cumRapChieu: result.data,
      });
    } catch (error) {
      console.log("error", error.response?.data);
    }
  };

  const handleChangeCumRap = (value) => {
    formik.setFieldValue("maRap", value);
  };

  const onOk = (value) => {
    formik.setFieldValue("ngayChieuGioChieu", moment(value).format());
    console.log("values", moment(value).format());
  };

  const onChangeDate = (value) => {
    formik.setFieldValue("ngayChieuGioChieu", moment(value).format());
    console.log("values", moment(value).format());
  };
  const onchangeInputNumber = (value) => {
    formik.setFieldValue("giaVe", value);
  };

  const convertSelectHTR = () => {
    return state.heThongRapChieu?.map((htr, index) => {
      return { label: htr.tenHeThongRap, value: htr.maHeThongRap };
    });
  };

  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      onSubmitCapture={formik.handleSubmit}
    >
      <h3 className="text-2xl">Tạo lịch chiếu </h3>
      {/* <img src={film.hinhAnh} alt="..." width={200} height={100} /> */}
      <Form.Item label="Hệ thống rạp">
        <Select
          options={convertSelectHTR()}
          onChange={handleChangeHeThongRap}
          placeholder="Chọn hệ thống rạp"
        />
      </Form.Item>

      <Form.Item label="Cụm rạp">
        <Select
          options={state.cumRapChieu?.map((cumRap, index) => ({
            label: cumRap.tenCumRap,
            value: cumRap.maCumRap,
          }))}
          onChange={handleChangeCumRap}
          placeholder="Chọn cụm rạp"
        />
      </Form.Item>

      <Form.Item label="Ngày chiếu giờ chiếu">
        <DatePicker
          format="DD/MM/YYYY HH:mm:ss"
          showTime
          onChange={onChangeDate}
          onOk={onOk}
        />
      </Form.Item>

      <Form.Item label="Giá vé">
        <InputNumber onChange={onchangeInputNumber} />
      </Form.Item>
      <Form.Item
        label="Chức năng"
        style={{
          justifyContent: "space-around",
          width: "300px",
          margin: "auto",
        }}
      >
        <Button htmlType="submit">Tạo lịch chiếu</Button>
      </Form.Item>
    </Form>
  );
}

// import React, { useEffect } from "react";
// import { Cascader, DatePicker, Space, Select } from "antd";
// import { Form, Input, InputNumber } from "antd";

// import { useFormik } from "formik";
// import moment from "moment";
// import { useDispatch } from "react-redux";
// import { useSelector } from "react-redux";
// import {
//   getCinameInfoAction,
//   getCinemaSystemListAction,
// } from "../../../../redux/actions/QuanLyRapAction";
// import {} from "antd";
// const { Option } = Select;

// function Showtime(props) {
//   const { arrCinemaInfo } = useSelector((state) => state.QuanLyRapReducer);
//   console.log(`arrCinemaInfo`, arrCinemaInfo);

//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(getCinameInfoAction());
//   }, []);

//   const onChange = (value, dateString) => {
//     console.log("Selected Time: ", value);
//     console.log("Formatted Selected Time: ", dateString);
//   };

//   const onOk = (value) => {
//     console.log("onOk: ", value);
//   };
//   const onChangePrice = (value) => {
//     console.log(`value`, value);
//   };

//   const handleChangeSelectSystem = (value) => {
//     console.log(`selected ${value}`);
//   };

//   return (
//     <Form
//       labelCol={{
//         span: 6,
//       }}
//       wrapperCol={{
//         span: 12,
//       }}
//       layout="horizontal"
//       //   onSubmitCapture={formik.handleSubmit}
//     >
//       <h1 style={{ fontSize: "30px", fontWeight: 600, textAlign: "center" }}>
//         THÊM PHIM
//       </h1>
//       <Form.Item label="Hệ thống rạp">
//         <Select
//           defaultValue="BHD Star Cineplex"
//           onChange={handleChangeSelectSystem}
//         >
//           {arrCinemaInfo.map((cinemaSystem, index) => {
//             return (
//               <Option key={index} value={`${cinemaSystem.tenHeThongRap}`}>
//                 {cinemaSystem.tenHeThongRap}
//               </Option>
//             );
//           })}
//           {/* <Option value="jack">Jack</Option> */}
//         </Select>
//       </Form.Item>
//       <Form.Item label="Rạp">
//         <Cascader
//           options={[
//             {
//               value: "zhejiang",
//               label: "Zhejiang",
//               children: [
//                 {
//                   value: "hangzhou",
//                   label: "Hangzhou",
//                 },
//               ],
//             },
//           ]}
//         />
//       </Form.Item>

//       <Form.Item label="Chọn ngày giờ chiếu">
//         <DatePicker showTime onChange={onChange} onOk={onOk} />
//       </Form.Item>
//       <Form.Item label="Nhập giá vé">
//         <InputNumber min={1} defaultValue={0} onChange={onChangePrice} />
//       </Form.Item>
//       <Form.Item className="m-auto">
//         <button type="submit">Thêm giờ chiếu</button>
//       </Form.Item>
//     </Form>
//   );
// }

// export default Showtime;

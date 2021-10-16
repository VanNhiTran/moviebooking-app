import React, { useEffect, useState } from "react";
import { Form, Select } from "antd";
import { DatePicker } from "antd";
import { InputNumber } from "antd";
import { quanLyRapService } from "../../../../services/QuanLyRapService";
import { useFormik } from "formik";
import moment from "moment";
import { quanLyDatVeService } from "../../../../services/QuanLyDatVeService";
import { history } from "../../../../App";
const { Option } = Select;

export default function ShowTime(props) {
  const formik = useFormik({
    initialValues: {
      maPhim: props.match.params.id,
      ngayChieuGioChieu: "",
      maRap: "",
      giaVe: "",
    },
    onSubmit: async (values) => {
      console.log(`values.maPhim`, values.maPhim);
      console.log("values", values);
      try {
        const result = await quanLyDatVeService.addShowtimes(values);

        alert(result.data);
        history.goBack();
      } catch (error) {
        console.log("error", error.response?.data);
      }
    },
  });

  const [state, setState] = useState({
    heThongRapChieu: [],
    DSCumRapChieu: [],
    maCumRap: "",
  });
  console.log("hethongrap", state.heThongRapChieu);
  console.log(`cumRapChieu`, state.DSCumRapChieu);
  console.log(`maCumRap`, state.maCumRap);

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
        DSCumRapChieu: result.data,
      });
    } catch (error) {
      console.log("error", error.response?.data);
    }
  };

  const handleChangeCumRap = (value) => {
    console.log(`value`, value);
    setState({
      ...state,
      maCumRap: value,
    });
  };

  const renderRap = () => {
    return state.DSCumRapChieu.map((rap, index) => {
      if (rap.maCumRap === state.maCumRap) {
        return rap.danhSachRap.map((room, index) => {
          return <Option value={room.maRap}>{room.tenRap}</Option>;
        });
      }
    });
  };

  const handleChangeRap = (value) => {
    formik.setFieldValue("maRap", value);
    console.log(`maRap`, value);
  };

  const onChangeDate = (value) => {
    formik.setFieldValue(
      "ngayChieuGioChieu",
      moment(value).format("DD/MM/YYYY hh:mm:ss")
    );
    console.log("values", moment(value).format("DD/MM/YYYY hh:mm:ss"));
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
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 14 }}
      onSubmitCapture={formik.handleSubmit}
    >
      <h1
        style={{
          fontSize: "30px",
          fontWeight: 600,
          textAlign: "center",
          color: "white",
        }}
      >
        Tạo lịch chiếu
      </h1>
      <Form.Item label="Hệ thống rạp">
        <Select
          options={convertSelectHTR()}
          onChange={handleChangeHeThongRap}
          placeholder="Chọn hệ thống rạp"
        />
      </Form.Item>

      <Form.Item label="Cụm rạp">
        <Select
          options={state.DSCumRapChieu?.map((cumRap, index) => ({
            label: cumRap.tenCumRap,
            value: cumRap.maCumRap,
          }))}
          onChange={handleChangeCumRap}
          placeholder="Chọn cụm rạp"
        />
      </Form.Item>
      <Form.Item label="Rạp">
        <Select placeholder="Chọn Rạp" onChange={handleChangeRap}>
          {renderRap()}
        </Select>
      </Form.Item>
      <Form.Item label="Ngày chiếu giờ chiếu">
        <DatePicker
          format="DD/MM/YYYY HH:mm:ss"
          showTime
          onChange={onChangeDate}
        />
      </Form.Item>

      <Form.Item label="Giá vé">
        <InputNumber onChange={onchangeInputNumber} />
      </Form.Item>
      <Form.Item
        style={{
          justifyContent: "space-around",
          width: "300px",
          margin: "auto",
        }}
      >
        <button type="submit">Tạo lịch chiếu</button>
      </Form.Item>
    </Form>
  );
}

import React, { useEffect, useState } from "react";
import { Form, Input, DatePicker, InputNumber } from "antd";

import { useFormik } from "formik";
import moment from "moment";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  getFilmInfoAction,
  updateFilmAction,
} from "../../../../redux/actions/QuanLyPhimAction";

function EditFilm(props) {
  const dispatch = useDispatch();

  const [imgSrc, setImgSrc] = useState("");

  const { filmInfo } = useSelector((state) => state.QuanLyPhimReducer);
  console.log(`filmInfo`, filmInfo);

  useEffect(() => {
    let { id } = props.match.params;
    dispatch(getFilmInfoAction(id));
  }, []);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      maPhim: filmInfo.maPhim,
      tenPhim: filmInfo.tenPhim,
      trailer: filmInfo.trailer,
      moTa: filmInfo.moTa,
      ngayKhoiChieu: moment(filmInfo.ngayKhoiChieu).toISOString(),
      danhGia: filmInfo.danhGia,
      hinhAnh: null,
      maNhom: filmInfo.maNhom,
    },

    onSubmit: (values) => {
      console.log(`values.ngayKhoiChieu`, values.ngayKhoiChieu);
      console.log(`values`, values);
      let formData = new FormData();
      for (let key in values) {
        if (key !== "hinhAnh") {
          formData.append(key, values[key]);
        } else {
          if (values.hinhAnh !== null) {
            formData.append("file", values.hinhAnh, values.hinhAnh.name);
          }
        }
      }
      dispatch(updateFilmAction(formData));
    },
  });

  const handleChangeDate = (value) => {
    formik.setFieldValue("ngayKhoiChieu", moment(value).format());
    console.log(`valueDate`, value);
  };

  const handleInputNumber = (name) => {
    return (value) => {
      formik.setFieldValue(name, value);
    };
  };

  const handleChangeFile = async (e) => {
    let file = e.target.files[0];
    if (
      file.type === "image/jpeg" ||
      file.type === "image/jpg" ||
      file.type === "image/gif" ||
      file.type === "image/png"
    ) {
      await formik.setFieldValue("hinhAnh", file);
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        setImgSrc(e.target.result);
      };
    }
  };
  return (
    <Form
      labelCol={{
        span: 5,
      }}
      wrapperCol={{
        span: 16,
      }}
      layout="horizontal"
      onSubmitCapture={formik.handleSubmit}
    >
      <h1 style={{ fontSize: "30px", fontWeight: 600, textAlign: "center" }}>
        CẬP NHẬT PHIM
      </h1>
      <Form.Item label="Tên phim">
        <Input
          name="tenPhim"
          onChange={formik.handleChange}
          value={formik.values.tenPhim}
        />
      </Form.Item>
      <Form.Item label="Mô tả">
        <Input
          name="moTa"
          onChange={formik.handleChange}
          value={formik.values.moTa}
        />
      </Form.Item>
      <Form.Item label="Trailer">
        <Input
          name="trailer"
          onChange={formik.handleChange}
          value={formik.values.trailer}
        />
      </Form.Item>
      <Form.Item label="Ngày khởi chiếu">
        <DatePicker
          placeholder="Chọn ngày"
          format="DD/MM/YYYY"
          onChange={handleChangeDate}
          value={moment(formik.values.ngayKhoiChieu)}
        />
      </Form.Item>
      <Form.Item label="Đánh giá">
        <InputNumber
          min={0}
          max={10}
          onChange={handleInputNumber("danhGia")}
          value={formik.values.danhGia}
        />
      </Form.Item>
      <Form.Item label="Hình ảnh">
        <input
          type="file"
          onChange={handleChangeFile}
          accept="image/png, image/jpeg,image/gif,image/png"
        />
        <br />
        <img
          style={{ width: 150, height: 150 }}
          src={imgSrc === "" ? filmInfo.hinhAnh : imgSrc}
          alt="..."
        />
      </Form.Item>

      <Form.Item
        style={{
          justifyContent: "space-around",
          width: "300px",
          margin: "auto",
        }}
      >
        <button type="submit">Cập nhật</button>
      </Form.Item>
    </Form>
  );
}

export default EditFilm;

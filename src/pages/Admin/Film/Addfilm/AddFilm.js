import React from "react";
import { Form, Input, DatePicker, InputNumber } from "antd";

import { useFormik } from "formik";
import moment from "moment";
import { useDispatch } from "react-redux";
import { addFilmAction } from "../../../../redux/actions/QuanLyPhimAction";
import { useState } from "react";
import { GROUPID } from "../../../../util/settings/config";

function AddFilm(props) {
  const dispatch = useDispatch();
  const [imgSrc, setImgSrc] = useState("");

  const formik = useFormik({
    initialValues: {
      tenPhim: "",
      trailer: "",
      moTa: "",
      ngayKhoiChieu: "",
      danhGia: 0,
      hinhAnh: {},
      maNhom: GROUPID,
    },
    onSubmit: (values) => {
      console.log(`values`, values);
      let formData = new FormData();
      for (let key in values) {
        if (key !== "hinhAnh") {
          formData.append(key, values[key]);
        }
        formData.append("file", values.hinhAnh, values.hinhAnh.name);
        // console.log("formData", formData.get("file"));
        console.log("values", values);
      }
      dispatch(addFilmAction(formData));
    },
  });

  const handleChangeDate = (value) => {
    formik.setFieldValue("ngayKhoiChieu", moment(value).format("DD/MM/YYYY"));
    console.log("valueDate", moment(value).format("DD/MM/YYYY"));
  };

  const handleInputNumber = (name) => {
    return (value) => {
      formik.setFieldValue(name, value);
    };
  };

  const handleChangeFile = (e) => {
    let file = e.target.files[0];
    if (
      file.type === "image/jpeg" ||
      file.type === "image/jpg" ||
      file.type === "image/gif" ||
      file.type === "image/png"
    ) {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        setImgSrc(e.target.result);
      };
      formik.setFieldValue("hinhAnh", file);
    }
  };
  return (
    <Form
      labelCol={{
        span: 4,
      }}
      wrapperCol={{
        span: 14,
      }}
      layout="horizontal"
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
        TH??M PHIM
      </h1>
      <Form.Item label="T??n phim">
        <Input name="tenPhim" onChange={formik.handleChange} />
      </Form.Item>
      <Form.Item label="B?? danh">
        <Input name="biDanh" onChange={formik.handleChange} />
      </Form.Item>
      <Form.Item label="M?? t???">
        <Input name="moTa" onChange={formik.handleChange} />
      </Form.Item>
      <Form.Item label="Trailer">
        <Input name="trailer" onChange={formik.handleChange} />
      </Form.Item>
      <Form.Item label="Ng??y kh???i chi???u">
        <DatePicker
          placeholder="Ch???n ng??y"
          onChange={handleChangeDate}
          format="DD/MM/YYYY"
        />
      </Form.Item>

      <Form.Item label="????nh gi??">
        <InputNumber min={0} max={10} onChange={handleInputNumber("danhGia")} />
      </Form.Item>

      <Form.Item label="H??nh ???nh">
        <input
          placeholder="Ch???n ???nh mu???n c???p nh???t"
          type="file"
          onChange={handleChangeFile}
          accept="image/png, image/jpeg,image/gif,image/png"
        />
        <br />
        <img style={{ width: 150, height: 150 }} src={imgSrc} alt="..." />
      </Form.Item>

      <Form.Item
        className="m-auto"
        style={{
          justifyContent: "space-around",
          width: "300px",
          margin: "auto",
        }}
      >
        <button type="submit">Th??m phim</button>
      </Form.Item>
    </Form>
  );
}

export default AddFilm;

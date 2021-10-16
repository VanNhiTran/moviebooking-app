import axios from "axios";
import _ from "lodash";
import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import logo from "../../../../assets/img/logo.png";
import androidLogo from "../../../../assets/img/android-logo.png";
import appleLogo from "../../../../assets/img/apple-logo.png";
import zaloLogo from "../../../../assets/img/zalo-logo.png";
import fbLogo from "../../../../assets/img/facebook-logo.png";
import {
  getCinameInfoAction,
  getCinemaSystemListAction,
} from "../../../../redux/actions/QuanLyRapAction";

export default function Footer() {
  const { arrCinemaSystemList } = useSelector(
    (state) => state.QuanLyRapReducer
  );
  console.log(arrCinemaSystemList);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCinemaSystemListAction());
  }, []);
  const arrCinema = _.map(arrCinemaSystemList, (cinema) =>
    _.pick(cinema, ["tenHeThongRap", "logo"])
  );
  const renderArrCinema = () => {
    return arrCinema.map((cinema, index) => {
      return (
        <a href="#" style={{ maxWidth: "30px" }} key={index}>
          <img className="rounded-full" src={cinema.logo} />
        </a>
      );
    });
  };

  return (
    <footer
      className="py-6 bg-coolGray-800 text-coolGray-50 text-white"
      style={{ backgroundColor: "#222" }}
    >
      <div className="container px-6 mx-auto space-y-6 divide-y divide-gray-400 md:space-y-12 divide-opacity-50 lg:w-3/4 w-10/11">
        <div className="grid md:grid-cols-12 gap-y-5 grid-cols-2">
          <div className="pb-6 md:pb-0 text-center md:col-span-2">
            <a
              href="#"
              className="flex justify-center space-x-1 md:justify-start"
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-full dark:bg-violet-400 text-white">
                <img src={logo} className="rounded-full w-20" />
              </div>
              <span className="self-center text-xl font-semibold text-white">
                MECI MOVIE
              </span>
            </a>
          </div>
          <div className="text-center md:col-span-3">
            <p className="pb-1 text-lg font-medium">Mobile App</p>
            <div
              className="flex flex-col-2 justify-center"
              style={{ justifyContent: "center" }}
            >
              <img
                src={androidLogo}
                alt=""
                style={{ height: "30px", margin: "5px" }}
              />
              <img
                src={appleLogo}
                alt=""
                style={{ height: "30px", margin: "5px" }}
              />
            </div>
          </div>

          <div className="text-center md:text-left md:col-span-3">
            <p className="pb-1 text-lg font-medium">Category</p>
            <ul>
              <li>
                <a href="#" className="hover:dark:text-violet-400 text-white ">
                  FAQs
                </a>
              </li>
              <li>
                <a href="#" className="hover:dark:text-violet-400 text-white ">
                  Chính sách bảo mật
                </a>
              </li>
              <li>
                <a href="#" className="hover:dark:text-violet-400 text-white ">
                  Thỏa thuận sử dụng
                </a>
              </li>
              <li>
                <a href="#" className="hover:dark:text-violet-400 text-white">
                  Đăng kí đối tác
                </a>
              </li>
            </ul>
          </div>

          <div className="text-center md:text-left md:col-span-4">
            <p className="pb-1 text-lg font-medium">Đối tác của Meci</p>
            <div className="grid md:grid-cols-3 grid-cols-2 gap-2 justify-center  ">
              {renderArrCinema()}
            </div>
          </div>
        </div>
        <div
          id="contact"
          className="grid sm:grid-cols-2 sm:grid-col-1 gap-3 justify-center text-center pt-16"
        >
          <div className="col-md-6 col-xs-12">
            <ul>
              <li>
                <h3
                  style={{ color: "white", fontSize: "20px" }}
                  className="widget-title"
                >
                  LIÊN HỆ CHÚNG TÔI
                </h3>
                <div className="textwidget custom-html-widget">
                  <h3>
                    <b style={{ color: "white" }}>
                      CÔNG TY CỔ PHẦN MEDIA CINEMA
                    </b>
                  </h3>
                  <p>
                    <i className="fa fa-map-marker" />
                    &nbsp; 189 Lê Duẩn,Phước Hải, TT. Long Thành, H. Long Thành,
                    Đồng Nai
                  </p>
                  <p>
                    <i className="fa fa-phone" aria-hidden="true">
                      &nbsp;
                    </i>
                    0368 200 200
                  </p>
                  <p>
                    <i className="fa fa-envelope" aria-hidden="true">
                      &nbsp;
                    </i>
                    <a
                      style={{ display: "inline" }}
                      href="mailto:mecicom.com@gmail.com"
                    >
                      mecicom.com@gmail.com
                    </a>
                  </p>
                  <p>&nbsp;</p>
                </div>
              </li>
            </ul>
          </div>
          <div className="col-md-6 col-xs-12">
            <iframe
              title="map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.29462922458!2d106.94550441422524!3d10.788731461917944!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31751f9232f42a8d%3A0xab2c4ff6191f09f8!2zUuG6oXAgQmV0YSBMb25nIFRow6BuaA!5e0!3m2!1svi!2s!4v1633162204577!5m2!1svi!2s"
              style={{ width: "100%", height: "300px" }}
              allowfullscreen
            ></iframe>
          </div>
        </div>
        <div className="grid justify-center  pt-6 lg:justify-between">
          <div
            className="flex space-x-4 justify-center"
            style={{ alignItems: "center" }}
          >
            <span>©2021 All rights reserved</span>
            <a href="#">
              <span>Privacy policy</span>
            </a>
            <a href="#">
              <span>Terms of service</span>
            </a>
          </div>

          <div className="flex justify-center items-center pt-4 space-x-4 lg:pt-0 lg:col-end-13">
            <a
              href="#"
              className="flex items-center justify-center w-10 h-10 rounded-full dark:bg-violet-400 text-white dark:text-coolGray-900"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
            </a>
            <a
              href="#"
              className="flex items-center justify-center w-10 h-10 rounded-full dark:bg-violet-400 text-white dark:text-coolGray-900"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 50 50"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path d="M 50.0625 10.4375 C 48.214844 11.257813 46.234375 11.808594 44.152344 12.058594 C 46.277344 10.785156 47.910156 8.769531 48.675781 6.371094 C 46.691406 7.546875 44.484375 8.402344 42.144531 8.863281 C 40.269531 6.863281 37.597656 5.617188 34.640625 5.617188 C 28.960938 5.617188 24.355469 10.21875 24.355469 15.898438 C 24.355469 16.703125 24.449219 17.488281 24.625 18.242188 C 16.078125 17.8125 8.503906 13.71875 3.429688 7.496094 C 2.542969 9.019531 2.039063 10.785156 2.039063 12.667969 C 2.039063 16.234375 3.851563 19.382813 6.613281 21.230469 C 4.925781 21.175781 3.339844 20.710938 1.953125 19.941406 C 1.953125 19.984375 1.953125 20.027344 1.953125 20.070313 C 1.953125 25.054688 5.5 29.207031 10.199219 30.15625 C 9.339844 30.390625 8.429688 30.515625 7.492188 30.515625 C 6.828125 30.515625 6.183594 30.453125 5.554688 30.328125 C 6.867188 34.410156 10.664063 37.390625 15.160156 37.472656 C 11.644531 40.230469 7.210938 41.871094 2.390625 41.871094 C 1.558594 41.871094 0.742188 41.824219 -0.0585938 41.726563 C 4.488281 44.648438 9.894531 46.347656 15.703125 46.347656 C 34.617188 46.347656 44.960938 30.679688 44.960938 17.09375 C 44.960938 16.648438 44.949219 16.199219 44.933594 15.761719 C 46.941406 14.3125 48.683594 12.5 50.0625 10.4375 Z" />
              </svg>
            </a>
            <a
              href="#"
              className="flex items-center justify-center w-10 h-10 rounded-full dark:bg-violet-400 text-white dark:text-coolGray-900"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
                className="w-5 h-5"
              >
                <path d="M10.9,2.1c-4.6,0.5-8.3,4.2-8.8,8.7c-0.5,4.7,2.2,8.9,6.3,10.5C8.7,21.4,9,21.2,9,20.8v-1.6c0,0-0.4,0.1-0.9,0.1 c-1.4,0-2-1.2-2.1-1.9c-0.1-0.4-0.3-0.7-0.6-1C5.1,16.3,5,16.3,5,16.2C5,16,5.3,16,5.4,16c0.6,0,1.1,0.7,1.3,1c0.5,0.8,1.1,1,1.4,1 c0.4,0,0.7-0.1,0.9-0.2c0.1-0.7,0.4-1.4,1-1.8c-2.3-0.5-4-1.8-4-4c0-1.1,0.5-2.2,1.2-3C7.1,8.8,7,8.3,7,7.6C7,7.2,7,6.6,7.3,6 c0,0,1.4,0,2.8,1.3C10.6,7.1,11.3,7,12,7s1.4,0.1,2,0.3C15.3,6,16.8,6,16.8,6C17,6.6,17,7.2,17,7.6c0,0.8-0.1,1.2-0.2,1.4 c0.7,0.8,1.2,1.8,1.2,3c0,2.2-1.7,3.5-4,4c0.6,0.5,1,1.4,1,2.3v2.6c0,0.3,0.3,0.6,0.7,0.5c3.7-1.5,6.3-5.1,6.3-9.3 C22,6.1,16.9,1.4,10.9,2.1z" />
              </svg>
            </a>
            <a
              href="#"
              className="flex items-center justify-center w-5 h-5 rounded-full dark:bg-violet-400 text-white dark:text-coolGray-900"
            >
              <img src={zaloLogo} alt="" />
            </a>
            <a
              href="#"
              className="flex items-center justify-center w-5 h-5 rounded-full dark:bg-violet-400 text-white dark:text-coolGray-900"
            >
              <img src={fbLogo} alt="" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

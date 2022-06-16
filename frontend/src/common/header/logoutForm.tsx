import React from "react";
import { Button, Avatar } from "antd";
import { StatusCodes } from "http-status-codes";
import { useEffect } from "react";
import { UserOutlined } from "@ant-design/icons";
import api from "../../api/loginApi";
import axiosInstance from "../../api/axios";
import { useDispatch, useSelector } from "react-redux";
import LOGIN_FORM from "../../content/form";
import history from "history/browser";
// import { BsPersonCheckFill } from "react-icons/bs";
import "antd/dist/antd.css";

const LogoutButton = ({ handleLogout }) => {
  const { cartItems, amount, total } = useSelector((store) => store.cart);

  const handleOnClick = async () => {
    const response = axiosInstance.post("user/logout/blacklist/", {
      refresh_token: localStorage.getItem("refresh_token"),
    });
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    axiosInstance.defaults.headers["Authorization"] = null;
    const user_name = localStorage.getItem("user_name");
    let cart = {
      user: user_name,
      cartItems: JSON.stringify(cartItems),
      amount: amount,
      total: total,
    };
    localStorage.setItem(user_name + "Cart", JSON.stringify(cart));
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    localStorage.setItem("amount", amount);
    localStorage.setItem("total", total);
    console.log("logout");
    handleLogout();
  };

  // const handleOnClick = async () => {
  //   try {
  //     const response = await api.logoutApi();
  //     if (response.status !== StatusCodes.OK) {
  //       throw new Error(
  //         `Logout API response status error: ${JSON.stringify(response)}`
  //       );
  //     } else {
  //       handleLogout();
  //     }
  //   } catch (error) {
  //     throw new Error(`Logout API error: ${JSON.stringify(error)}`);
  //   }
  // };

  //   return (
  //     <Button type="primary" onClick={handleOnClick}>
  //       {LOGIN_FORM.LOGOUT}
  //     </Button>
  //   );
  // };

  return (
    <>
      <Avatar
        style={{
          backgroundColor: "blue",
        }}
        icon={<UserOutlined />}
        // icon={<BsPersonCheckFill />}
      />

      <Button type="primary" onClick={handleOnClick}>
        {LOGIN_FORM.LOGOUT}
      </Button>
    </>
  );
};

export default LogoutButton;

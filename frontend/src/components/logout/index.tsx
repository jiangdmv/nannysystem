import React from "react";
import { Button, Avatar } from "antd";
import { StatusCodes } from "http-status-codes";
import { useEffect } from "react";
import { UserOutlined } from "@ant-design/icons";
import api from "../../api/loginApi";
import axiosInstance from "../../api/axios";
import LOGIN_FORM from "../../content/form";
import history from "history/browser";
import "antd/dist/antd.css";

const LogoutButton = ({ handleLogout }) => {
  useEffect(() => {
    const response = axiosInstance.post("user/logout/blacklist/", {
      refresh_token: localStorage.getItem("refresh_token"),
    });
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("role");
    localStorage.removeItem("user_name");
    axiosInstance.defaults.headers["Authorization"] = null;
    console.log("logout");
    // handleLogout();
  });

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
          backgroundColor: "#87d068",
        }}
        icon={<UserOutlined />}
      />
      <Button type="primary" onClick={handleLogout}>
        {LOGIN_FORM.LOGOUT}
      </Button>
    </>
  );
};

export default LogoutButton;

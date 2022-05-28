import React from "react";
import { Button } from "antd";
import { StatusCodes } from "http-status-codes";

import api from "../../api/loginApi";

import LOGIN_FORM from "../../content/form";

import "antd/dist/antd.css";

const LogoutButton = ({ handleLogout = () => {} }) => {
  const handleOnClick = async () => {
    try {
      const response = await api.logoutApi();
      if (response.status !== StatusCodes.OK) {
        throw new Error(
          `Logout API response status error: ${JSON.stringify(response)}`
        );
      } else {
        handleLogout();
      }
    } catch (error) {
      throw new Error(`Logout API error: ${JSON.stringify(error)}`);
    }
  };
  return (
    <Button type="primary" onClick={handleOnClick}>
      {LOGIN_FORM.LOGOUT}
    </Button>
  );
};

export default LogoutButton;

import React, { useState } from "react";
import "./index.css";
import Login from "./loginForm";
import Logout from "./logoutForm";
import SearchBar from "../searchBar";
import { UserOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import axiosInstance from "../../api/axios";

const Header = () => {
  const [isLoggdIn, setIsLoggedin] = useState(false);
  const [hassError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [visible, setVisible] = useState(false);

  const [email, setEmail] = useState({
    value: "",
    errorMessage: "",
  });
  const [password, setPassword] = useState({
    value: "",
    errorMessage: "",
  });

  const handleOnLoginOK = () => setVisible(false);

  const handleSubmit = async () => {
    const response = await axiosInstance
      .post("token/", {
        email: email.value,
        password: password.value,
      })
      .then((res) => {
        localStorage.setItem("access_token", res.data.access);
        localStorage.setItem("refresh_token", res.data.refresh);
        axiosInstance.defaults.headers["Authorization"] =
          "JWT " + localStorage.getItem("access_token");
        console.log(res.data);
        // handleOnLogin();
        handleOnLoginOK();
        // history.push("home/");
        //console.log(res);
        //console.log(res.data);
      });
  };

  return (
    <>
      <div className="header">
        <div className="logo">
          Management<span className="sideLogo"> Chuwa</span>
        </div>

        <div className="searchBar">
          <SearchBar
            value={""}
            label={""}
            placeholder={"Search"}
            infoMessage={""}
            errorMessage={""}
            onChange={() => {}}
          />
        </div>

        <div className="signIn">
          {isLoggdIn ? (
            <Logout handleLogout={() => setIsLoggedin(false)} />
          ) : (
            <Login
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              handleSubmit={handleSubmit}
              handleLogin={() => setIsLoggedin(true)}
              handleLoading={() => setIsLoading(false)}
              handleHasError={() => setHasError(true)}
              visible={visible}
              setVisible={setVisible}
              handleOnLoginOK={handleOnLoginOK}
            />
          )}
        </div>
        <div className="cart">
          <ShoppingCartOutlined />
          Cart
        </div>
      </div>
    </>
  );
};

export default Header;

import React, { useState } from "react";
import "./index.css";
import Login from "./loginForm";
import Logout from "./logoutForm";
import Cart from "../../components/cart";
import SearchBar from "../searchBar";
import { UserOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import axiosInstance from "../../api/axios";
import { StatusCodes } from "http-status-codes";
import { useDispatch, useSelector } from "react-redux";
import validator from "validator";
import LOGIN_FORM from "../../content/form";
import { toast } from "react-toastify";
import { loginCart } from "../../app/cartSlice";

const Header = () => {
  const [isLoggdIn, setIsLoggedin] = useState(false);
  const [hassError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [visible, setVisible] = useState(false);
  const [cartVisible, setCartVisible] = useState(false);

  const { cartItems, amount, total } = useSelector((store) => store.cart);
  const dispatch = useDispatch();

  const [email, setEmail] = useState({
    value: "",
    errorMessage: "",
  });
  const [password, setPassword] = useState({
    value: "",
    errorMessage: "",
  });

  const handleOnLoginOK = () => setVisible(false);

  const validateEmailFEAndSetErrorMessage = () => {
    let errorMessage = "";
    if (!validator.isEmail(email.value)) {
      errorMessage = LOGIN_FORM.EMAIL.ERROR_MESSAGE;
    }
    setEmail({
      ...email,
      errorMessage,
    });
    return errorMessage;
  };

  const handleSubmit = async () => {
    validateEmailFEAndSetErrorMessage();
    const response = await axiosInstance
      .post("token/", {
        email: email.value,
        password: password.value,
      })
      .then((res) => {
        localStorage.setItem("access_token", res.data.access);
        localStorage.setItem("refresh_token", res.data.refresh);
        localStorage.setItem("role", res.data.role);
        localStorage.setItem("user_name", res.data.username);

        axiosInstance.defaults.headers["Authorization"] =
          "JWT " + localStorage.getItem("access_token");
        console.log(res.data);
        // handleOnLogin();
        handleOnLoginOK();
        setIsLoggedin(true);
        setIsLoading(false);
        const user_cart = localStorage.getItem(res.data.username + "Cart");
        console.log(user_cart);
        if (user_cart) {
          const last_cart = JSON.parse(user_cart);
          const last_user = last_cart.user;
          if (res.data.username == last_user) {
            dispatch(loginCart(last_cart));
          }
        }

        // history.push("home/");
        //console.log(res);
        //console.log(res.data);
      });

    // if (response.status == StatusCodes.OK) {
    //   // Page: please check your email
    //   handleOnLoginOK();
    // }
    // if (response.status !== StatusCodes.OK) {
    //   toast.error("Error Notification !", {
    //     position: toast.POSITION.TOP_LEFT,
    //   });
    //   throw new Error(
    //     `Login API response status error: ${JSON.stringify(response)}`
    //   );
    // } else {
    //   // handleOnLogin();
    // }
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
          <Cart cartVisible={cartVisible} setCartVisible={setCartVisible} />
        </div>
      </div>
    </>
  );
};

export default Header;

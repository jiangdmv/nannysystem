import React, { useState } from "react";
import "./index.css";
import Login from "../../components/login";
import Logout from "../../components/logout";
import { UserOutlined, ShoppingCartOutlined } from "@ant-design/icons";

const Header = () => {
  const [isLoggdIn, setIsLoggedin] = useState(false);
  const [hassError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      <div className="header">
        <div className="logo">
          Management<span className="sideLogo"> Chuwa</span>
        </div>

        <div className="searchBar">Search Bar</div>

        <div className="signIn">
          <UserOutlined />
          {isLoggdIn ? (
            <Logout handleLogout={() => setIsLoggedin(false)} />
          ) : (
            <Login handleLogin={() => setIsLoggedin(true)} />
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

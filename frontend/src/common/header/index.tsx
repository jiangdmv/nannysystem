import React, { useState } from "react";
import "./index.css";
import Login from "../../components/login";
import Logout from "../../components/logout";

const Header = () => {
  const [isLoggdIn, setIsLoggedin] = useState(false);

  return (
    <>
      <div className="header">
        <div className="logo">Management</div>
        <div className="sideLogo">Chuwa</div>
        <div className="searchBar">Search Bar</div>

        <div className="signIn">
          {isLoggdIn ? (
            <Logout handleLogout={() => setIsLoggedin(false)} />
          ) : (
            <Login handleLogin={() => setIsLoggedin(true)} />
          )}
        </div>
        <div className="cart">Cart</div>
      </div>
    </>
  );
};

export default Header;

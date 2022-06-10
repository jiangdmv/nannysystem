import React, { useState } from "react";

import Form from "../loginForm";

import LOGIN_FORM from "../../../content/form";

const LoginModalContent = ({
  email,
  setEmail,
  password,
  setPassword,
  handleSubmit,
  handleOnLogin,
  handleOnClickRegister = () => {},
  handleOnClickResetPassword = () => {},
  handleOnLoginOK,
}) => {
  return (
    <>
      <div className={"modal-content-tabs"}>{LOGIN_FORM.CUSTOMER_TAB}</div>
      <div className={"modal-content-form"}>
        <Form
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          handleSubmit={handleSubmit}
          handleOnLogin={handleOnLogin}
          handleOnClickRegister={handleOnClickRegister}
          handleOnClickResetPassword={handleOnClickResetPassword}
          handleOnLoginOK={handleOnLoginOK}
        />
      </div>
    </>
  );
};

export default LoginModalContent;

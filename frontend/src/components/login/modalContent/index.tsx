import React, { useState } from "react";

import Form from "../loginForm";

import LOGIN_FORM from "../../../content/form";

const LoginModalContent = ({
  handleOnLogin = () => {},
  handleOnClickRegister = () => {},
  handleOnClickResetPassword = () => {},
}) => {
  return (
    <>
      <div className={"modal-content-tabs"}>{LOGIN_FORM.CUSTOMER_TAB}</div>
      <div className={"modal-content-form"}>
        <Form
          handleOnLogin={handleOnLogin}
          handleOnClickRegister={handleOnClickRegister}
          handleOnClickResetPassword={handleOnClickResetPassword}
        />
      </div>
    </>
  );
};

export default LoginModalContent;

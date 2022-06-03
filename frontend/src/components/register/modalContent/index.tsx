import React, { useState } from "react";

import Form from "../registerForm";

import LOGIN_FORM from "../../../content/form";

const RegisterModalContent = ({ handleOnLogin = () => {} }) => {
  return (
    <>
      <div className={"modal-content-tabs"}>{LOGIN_FORM.CUSTOMER_TAB}</div>
      <div className={"modal-content-form"}>
        <Form handleOnLogin={handleOnLogin} />
      </div>
    </>
  );
};

export default RegisterModalContent;

import React, { useState } from "react";
import { Checkbox, Button } from "antd";
import validator from "validator";
import { StatusCodes } from "http-status-codes";

import api from "../../../api/loginApi";
import TextInput from "../../../common/input/textInput";

import LOGIN_FORM from "../../../content/form";
import CONSTANTS from "../../../constants";

import "antd/dist/antd.css";
import "./index.css";
import Register from "../../register";
import ResetPassword from "../../resetPassword";

// ---------------------------------------------------------- //
//npm i --save-dev @types/react-html-parser
//npm i --save-dev @types/validator
const Form = ({ handleOnLogin = () => {} }) => {
  const [email, setEmail] = useState({
    value: "",
    errorMessage: "",
  });
  const [password, setPassword] = useState({
    value: "",
    errorMessage: "",
    status: CONSTANTS.VERFI_CODE_STATUS.SEND,
  });

  const [check, setCheck] = useState(false);

  // Return emtpy stirng if there is no error
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

  // Return emtpy stirng if there is no error
  const validatePasswordFEAndSetErrorMessage = () => {
    let errorMessage = "";
    if (!validator.isStrongPassword(email.value)) {
      errorMessage = LOGIN_FORM.PASSWORD.ERROR_MESSAGE;
    }
    setEmail({
      ...password,
      errorMessage,
    });
    return errorMessage;
  };

  const handleSubmit = async () => {
    const emailError = validateEmailFEAndSetErrorMessage();
    const passwordError = validatePasswordFEAndSetErrorMessage();
    if (!(emailError || passwordError)) {
      const response = await api.loginApi({
        customerType: CONSTANTS.USER_TYPE.CUSTOMER,
        email: email.value,
        password: password.value,
        rememberMe: check,
      });
      if (response.status !== StatusCodes.OK) {
        throw new Error(
          `Login API response status error: ${JSON.stringify(response)}`
        );
      } else {
        handleOnLogin();
      }
    }
  };

  return (
    <>
      <TextInput
        value={email.value}
        label={LOGIN_FORM.EMAIL.LABEL}
        placeholder={LOGIN_FORM.EMAIL.PLACE_HOLDER}
        infoMessage={LOGIN_FORM.EMAIL.INFO_MESSAGE}
        errorMessage={email.errorMessage}
        onChange={(e) => setEmail({ ...email, value: e.target.value })}
      />
      <TextInput
        value={password.value}
        label={LOGIN_FORM.PASSWORD.LABEL}
        placeholder={LOGIN_FORM.PASSWORD.PLACE_HOLDER}
        infoMessage={LOGIN_FORM.PASSWORD.INFO_MESSAGE}
        errorMessage={password.errorMessage}
        onChange={(e) => setPassword({ ...password, value: e.target.value })}
      />
      <Checkbox
        className="customer-form-checkbox"
        onChange={(e) => setCheck(e.target.checked)}
      >
        {LOGIN_FORM.REMEMBER_ME}
      </Checkbox>
      <Button className="customer-form-submit-button" onClick={handleSubmit}>
        {LOGIN_FORM.SUBMIT_BUTTON}
      </Button>
      <div
        className={"customer-form-disclaimer"}
        dangerouslySetInnerHTML={{ __html: LOGIN_FORM.DISCLAIMER }}
      />
      <div className={"customer-form-disclaimer"}>
        Don't have an account? <Register />
      </div>
      <div className={"customer-form-disclaimer"}>
        <ResetPassword />
      </div>
    </>
  );
};

export default Form;

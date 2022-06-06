import React, { useState } from "react";
import { Checkbox, Button } from "antd";
import validator from "validator";

import { StatusCodes } from "http-status-codes";
import TextInput from "../../../common/input/textInput";

import CONSTANTS from "../../../constants";
import api from "../../../api/loginApi";
import RESET_PASSWORD_FORM from "../../../content/resetPasswordForm";

interface IProps {
  handleOnLogin: () => void;
}

const Form = ({ handleOnLogin = () => {} }: IProps) => {
  const [userName, setuserName] = useState({
    value: "",
    errorMessage: "",
  });

  const [email, setEmail] = useState({
    value: "",
    errorMessage: "",
  });

  const [password, setPassword] = useState({
    value: "",
    errorMessage: "",
  });

  const [check, setCheck] = useState(false);

  // Return emtpy stirng if there is no error
  const validateUserNameFEAndSetErrorMessage = () => {
    let errorMessage = "";
    if (true) {
      errorMessage = RESET_PASSWORD_FORM.USERNAME.ERROR_MESSAGE;
    }
    setEmail({
      ...userName,
      errorMessage,
    });
    return errorMessage;
  };

  // Return emtpy stirng if there is no error
  const validateEmailFEAndSetErrorMessage = () => {
    let errorMessage = "";
    if (!validator.isEmail(email.value)) {
      errorMessage = RESET_PASSWORD_FORM.EMAIL.ERROR_MESSAGE;
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
    if (!validator.isStrongPassword(password.value)) {
      errorMessage = RESET_PASSWORD_FORM.PASSWORD.ERROR_MESSAGE;
    }
    setEmail({
      ...password,
      errorMessage,
    });
    return errorMessage;
  };

  const handleSubmit = async () => {
    const emailError = validateEmailFEAndSetErrorMessage();
    const codeError = validatePasswordFEAndSetErrorMessage();
    if (!(emailError || codeError)) {
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
      {/* <TextInput
        value={email.value}
        label={RESET_PASSWORD_FORM.USERNAME.LABEL}
        placeholder={RESET_PASSWORD_FORM.USERNAME.PLACE_HOLDER}
        infoMessage={RESET_PASSWORD_FORM.USERNAME.INFO_MESSAGE}
        errorMessage={email.errorMessage}
        onChange={(e) => setuserName({ ...userName, value: e.target.value })}
      /> */}
      <TextInput
        value={email.value}
        label={RESET_PASSWORD_FORM.EMAIL.LABEL}
        placeholder={RESET_PASSWORD_FORM.EMAIL.PLACE_HOLDER}
        infoMessage={RESET_PASSWORD_FORM.EMAIL.INFO_MESSAGE}
        errorMessage={email.errorMessage}
        onChange={(e) => setEmail({ ...email, value: e.target.value })}
      />
      {/* <TextInput
        value={password.value}
        label={RESET_PASSWORD_FORM.PASSWORD.LABEL}
        placeholder={RESET_PASSWORD_FORM.PASSWORD.PLACE_HOLDER}
        infoMessage={RESET_PASSWORD_FORM.PASSWORD.INFO_MESSAGE}
        errorMessage={password.errorMessage}
        onChange={(e) => setPassword({ ...password, value: e.target.value })}
      />
      <TextInput
        value={password.value}
        label={RESET_PASSWORD_FORM.PASSWORD2.LABEL}
        placeholder={RESET_PASSWORD_FORM.PASSWORD2.PLACE_HOLDER}
        infoMessage={RESET_PASSWORD_FORM.PASSWORD2.INFO_MESSAGE}
        errorMessage={password.errorMessage}
        onChange={(e) => setPassword({ ...password, value: e.target.value })}
      /> */}
      <Button className="customer-form-submit-button" onClick={handleSubmit}>
        {RESET_PASSWORD_FORM.SUBMIT_BUTTON}
      </Button>
    </>
  );
};

export default Form;

import React, { useState } from "react";
import { Checkbox, Button } from "antd";
import validator from "validator";

import { StatusCodes } from "http-status-codes";
import TextInput from "../../common/input/textInput";
import REGISTER_FORM from "../../content/registerForm";

import CONSTANTS from "../../constants";
import api from "../../api/loginApi";
import axiosInstance from "../../api/axios";
import history from "history/browser";

interface IProps {
  handleOnRegister: () => void;
}

const Form = ({ handleOnRegister }: IProps) => {
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

  const [password2, setPassword2] = useState({
    value: "",
    errorMessage: "",
  });

  const [check, setCheck] = useState(false);

  // Return emtpy stirng if there is no error
  const validateUserNameFEAndSetErrorMessage = () => {
    let errorMessage = "";
    if (true) {
      errorMessage = REGISTER_FORM.USERNAME.ERROR_MESSAGE;
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
      errorMessage = REGISTER_FORM.EMAIL.ERROR_MESSAGE;
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
      errorMessage = REGISTER_FORM.PASSWORD.ERROR_MESSAGE;
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
      const response = await axiosInstance.post("user/register/", {
        email: email.value,
        user_name: userName.value,
        password: password.value,
      });
      // .then((res) => {
      //   history.push("/registered");
      //   console.log(res);
      // });
      if (response.status == StatusCodes.CREATED) {
        // Page: please check your email
        history.push("/registered"); // not work
        handleOnRegister();
      }
      if (response.status !== StatusCodes.OK) {
        throw new Error(
          `Login API response status error: ${JSON.stringify(response)}`
        );
      } else {
        handleOnRegister();
      }
    }
  };

  return (
    <>
      <TextInput
        value={userName.value}
        label={REGISTER_FORM.USERNAME.LABEL}
        placeholder={REGISTER_FORM.USERNAME.PLACE_HOLDER}
        infoMessage={REGISTER_FORM.USERNAME.INFO_MESSAGE}
        errorMessage={userName.errorMessage}
        onChange={(e) => setuserName({ ...userName, value: e.target.value })}
      />
      <TextInput
        value={email.value}
        label={REGISTER_FORM.EMAIL.LABEL}
        placeholder={REGISTER_FORM.EMAIL.PLACE_HOLDER}
        infoMessage={REGISTER_FORM.EMAIL.INFO_MESSAGE}
        errorMessage={email.errorMessage}
        onChange={(e) => setEmail({ ...email, value: e.target.value })}
      />
      <TextInput
        value={password.value}
        label={REGISTER_FORM.PASSWORD.LABEL}
        placeholder={REGISTER_FORM.PASSWORD.PLACE_HOLDER}
        infoMessage={REGISTER_FORM.PASSWORD.INFO_MESSAGE}
        errorMessage={password.errorMessage}
        onChange={(e) => setPassword({ ...password, value: e.target.value })}
      />
      <TextInput
        value={password2.value}
        label={REGISTER_FORM.PASSWORD2.LABEL}
        placeholder={REGISTER_FORM.PASSWORD2.PLACE_HOLDER}
        infoMessage={REGISTER_FORM.PASSWORD2.INFO_MESSAGE}
        errorMessage={password2.errorMessage}
        onChange={(e) => setPassword2({ ...password2, value: e.target.value })}
      />
      <Button className="customer-form-submit-button" onClick={handleSubmit}>
        {REGISTER_FORM.SUBMIT_BUTTON}
      </Button>
    </>
  );
};

export default Form;

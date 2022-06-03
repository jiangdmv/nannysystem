import React from "react";
import { useState } from "react";
import { Button } from "antd";

import LOGIN_FORM from "../../content/form";
import Modal from "../../common/modal";
import ModalContent from "./modalContent";
import REGISTER_FORM from "../../content/registerForm";
import RESET_PASSWORD_FORM from "../../content/resetPasswordForm";
import LoginModalContent from "./modalContent";

const Login = ({ handleLogin = () => {} }) => {
  const [visible, setVisible] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showResetPassword, setShowResetPassword] = useState(false);

  return (
    <>
      <Button type="primary" onClick={() => setVisible(true)}>
        {LOGIN_FORM.LOGINBUTTON}
      </Button>
      <Modal
        titleText={
          showRegister
            ? REGISTER_FORM.REGISTER
            : showResetPassword
            ? RESET_PASSWORD_FORM.RESETPASSWORD
            : LOGIN_FORM.LOGIN
        }
        visible={visible}
        setVisible={
          showRegister
            ? setShowRegister
            : showResetPassword
            ? setShowResetPassword
            : setVisible
        }
      >
        {showRegister ? (
          <RegisterModalContent />
        ) : showResetPassword ? (
          <ResetPasswordModalContent />
        ) : (
          <LoginModalContent
            handleOnLogin={handleLogin}
            handleOnClickRegister={() => {
              setShowRegister(true);
            }}
            handleOnClickResetPassword={() => {
              setShowResetPassword(true);
            }}
          />
        )}
      </Modal>
    </>
  );
};

const RegisterModalContent = () => {
  return <>This is Register</>;
};

const ResetPasswordModalContent = () => {
  return <>This is reset password</>;
};

export default Login;

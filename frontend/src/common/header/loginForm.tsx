import React from "react";
import { useState } from "react";
import { Button } from "antd";
import { UserOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import LOGIN_FORM from "../../content/form";
import Modal from "../../common/modal";
// import ModalContent from "./modalContent";
import REGISTER_FORM from "../../content/registerForm";
import RESET_PASSWORD_FORM from "../../content/resetPasswordForm";
import LoginModalContent from "../../components/login/modalContent/index";
import RegisterModalContent from "./registerForm";
import ResetPasswordModalContent from "./resetPasswordForm";

const Login = ({
  email,
  setEmail,
  password,
  setPassword,
  handleSubmit,
  handleLogin,
  handleLoading,
  handleHasError,
  visible,
  setVisible,
  handleOnLoginOK,
}) => {
  const [showRegister, setShowRegister] = useState(false);
  const [showResetPassword, setShowResetPassword] = useState(false);

  //   const LoginModalContent = ({
  //     handleOnLogin,
  //     handleOnClickRegister = () => {},
  //     handleOnClickResetPassword = () => {},
  //     handleOnLoginOK,
  //   }) => {
  //     return <></>;
  //   };

  return (
    <>
      <UserOutlined />
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
          <RegisterModalContent handleOnRegister={() => setVisible(false)} />
        ) : showResetPassword ? (
          <ResetPasswordModalContent />
        ) : (
          <LoginModalContent
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            handleSubmit={handleSubmit}
            handleOnLogin={handleLogin}
            handleOnClickRegister={() => {
              setShowRegister(true);
            }}
            handleOnClickResetPassword={() => {
              setShowResetPassword(true);
            }}
            handleOnLoginOK={handleOnLoginOK}
          />
        )}
      </Modal>
    </>
  );
};

export default Login;

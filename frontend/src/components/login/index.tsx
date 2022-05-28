import React from "react";
import { useState } from "react";
import { Button } from "antd";

import LOGIN_FORM from "../../content/form";
import Modal from "../../common/modal";
import ModalContent from "./modalContent";

const Login = ({ handleLogin = () => {} }) => {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <Button type="primary" onClick={() => setVisible(true)}>
        {LOGIN_FORM.LOGIN}
      </Button>
      <Modal
        titleText={LOGIN_FORM.LOGIN}
        visible={visible}
        setVisible={setVisible}
      >
        <ModalContent handleOnLogin={handleLogin} />
      </Modal>
    </>
  );
};

export default Login;

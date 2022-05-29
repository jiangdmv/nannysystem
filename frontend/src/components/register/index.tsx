import React from "react";
import { useState } from "react";
import { Button } from "antd";

import Modal from "../../common/modal";
import ModalContent from "./modalContent";
import REGISTER_FORM from "../../content/registerForm";

const Register = ({ handleLogin = () => {} }) => {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <Button type="link" onClick={() => setVisible(true)}>
        {REGISTER_FORM.REGISTERBUTTON}
      </Button>
      <Modal
        titleText={REGISTER_FORM.REGISTER}
        visible={visible}
        setVisible={setVisible}
      >
        <ModalContent handleOnLogin={handleLogin} />
      </Modal>
    </>
  );
};

export default Register;

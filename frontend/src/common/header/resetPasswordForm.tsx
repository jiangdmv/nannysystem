import React from "react";
import { useState } from "react";
import { Button } from "antd";

import Modal from "../../common/modal";
import ModalContent from "../../components/resetPassword/modalContent";
import RESET_PASSWORD_FORM from "../../content/resetPasswordForm";

const ResetPassword = ({ handleLogin = () => {} }) => {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <Button type="link" onClick={() => setVisible(true)}>
        {RESET_PASSWORD_FORM.RESETPASSWORDBUTTON}
      </Button>
      <Modal
        titleText={RESET_PASSWORD_FORM.RESETPASSWORD}
        visible={visible}
        setVisible={setVisible}
      >
        <ModalContent handleOnLogin={handleLogin} />
      </Modal>
    </>
  );
};

export default ResetPassword;

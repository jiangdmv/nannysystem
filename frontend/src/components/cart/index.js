import React from "react";
import { useState } from "react";
import { Button, Modal } from "antd";
import {
  UserOutlined,
  ShoppingCartOutlined,
  RightCircleFilled,
} from "@ant-design/icons";
import CartModalContent from "./modalContent";

const Cart = (cartVisible, setCartVisible) => {
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
      <Button type="primary" onClick={() => cartVisible.setCartVisible(true)}>
        Cart
      </Button>
      <Modal
        titleText="Cart"
        style={{
          top: 2,
          float: "right",
        }}
        okText="Continue to checkout"
        visible={cartVisible.cartVisible}
        setCartVisible={cartVisible.setCartVisible}
        onCancel={() => cartVisible.setCartVisible(false)}
      >
        <CartModalContent />
      </Modal>
    </>
  );
};

export default Cart;

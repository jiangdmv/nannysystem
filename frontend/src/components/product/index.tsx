import React from "react";
import Modal from "antd/lib/modal/Modal";
import ProductModalContent from "./modalContent";
import { Card, Button, Image } from "antd";
import { Table, Row, Col } from "antd";

function Product({ displayType }) {
  return (
    <>
      <ProductModalContent displayType={displayType} />
    </>
  );
}

export default Product;

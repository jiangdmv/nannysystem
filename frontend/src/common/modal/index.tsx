import React from "react";
import "antd/dist/antd.css";
import { Modal } from "antd";
import { CloseCircleOutlined } from "@ant-design/icons";
import "./index.css";

interface IProps {
  titleText?: string;
  visible?: boolean;
  children?: JSX.Element;
  setVisible: (isVisible: boolean) => void;
}

const MyModal = (props: IProps) => {
  const { children, titleText, visible, setVisible = () => {} } = props;
  return (
    <>
      <Modal
        width={393}
        closeIcon={<CloseCircleOutlined />}
        title={<div className="modal-title">{titleText}</div>}
        visible={visible}
        footer={null}
        onCancel={() => setVisible(false)}
      >
        {children}
      </Modal>
    </>
  );
};

export default MyModal;

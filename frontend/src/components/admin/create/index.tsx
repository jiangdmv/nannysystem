import React, { useState } from "react";
import axiosInstance from "../../../api/axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Navigate, useNavigate, Link } from "react-router-dom";
import {
  Button,
  Cascader,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  Switch,
  TreeSelect,
} from "antd";
import "./index.css";

export default function Create() {
  function slugify(string) {
    const a =
      "àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;";
    const b =
      "aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------";
    const p = new RegExp(a.split("").join("|"), "g");

    return string
      .toString()
      .toLowerCase()
      .replace(/\s+/g, "-") // Replace spaces with -
      .replace(p, (c) => b.charAt(a.indexOf(c))) // Replace special characters
      .replace(/&/g, "-and-") // Replace & with 'and'
      .replace(/[^\w\-]+/g, "") // Remove all non-word characters
      .replace(/\-\-+/g, "-") // Replace multiple - with single -
      .replace(/^-+/, "") // Trim - from start of text
      .replace(/-+$/, ""); // Trim - from end of text
  }

  const navigate = useNavigate();
  const { TextArea } = Input;

  // ant Design Select Option get value by using primary key here.
  const [selected, setSelected] = useState(1);

  const handleSubmit = (value) => {
    // e.preventDefault();
    axiosInstance
      .post(`product/admin/create/`, {
        name: value.name,
        description: value.description,
        category: selected,
        price: value.price,
        quantity: value.quantity,
        image: value.image,
      })
      .then((res) => {
        navigate("/admin/");
      });
  };

  return (
    <div className="form">
      <br></br>
      <br></br>
      <h1>Create Product</h1>
      <br></br>
      <Form
        onFinish={handleSubmit}
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="vertical"
        initialValues={{
          size: 9,
        }}
        size={"large"}
      >
        <Form.Item label="Product name" name="name">
          <Input />
        </Form.Item>
        <Form.Item label="Product Description" name="description">
          <TextArea rows={4} />
        </Form.Item>
        <Form.Item label="Category" name="category">
          <Select
            onChange={(value) => {
              setSelected(value);
            }}
          >
            <Select.Option key="2" value="2">
              Computer
            </Select.Option>
            <Select.Option key="1" value="1">
              Cellphone
            </Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="Price" name="price">
          <InputNumber
            stringMode
            prefix="$"
            min="0"
            max="1000000"
            step="0.01"
            style={{
              width: "100%",
            }}
          />
        </Form.Item>
        <Form.Item label="In Stock Quantity" name="quantity">
          <InputNumber
            min="0"
            max="1000000"
            step="1"
            style={{
              width: "100%",
            }}
          />
        </Form.Item>
        <Form.Item label="Add Image Link" name="image">
          <Input addonAfter={<Button>Upload</Button>} value="https://" />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            onClick={() => toast("Added a new product!")}
          >
            Add Product
          </Button>
        </Form.Item>
      </Form>
      <br></br>
    </div>
  );
}

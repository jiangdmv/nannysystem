import React, { useState } from "react";
import axiosInstance from "../../../api/axios";
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
  const initialFormData = Object.freeze({
    name: "",
    description: "",
    price: "",
    quantity: "",
    image: "",
  });

  const [formData, updateFormData] = useState(initialFormData);

  const handleChange = (e) => {
    if (e.target.name == "title") {
      updateFormData({
        ...formData,
        // Trimming any whitespace
        [e.target.name]: e.target.value.trim(),
        // ["slug"]: slugify(e.target.value.trim()),
      });
    } else {
      updateFormData({
        ...formData,
        // Trimming any whitespace
        [e.target.name]: e.target.value.trim(),
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axiosInstance
      .post(`admin/create/`, {
        name: formData.name,
        description: formData.description,
        price: formData.price,
        quantity: formData.quantity,
        image: formData.image,
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
        <Form.Item label="Product name">
          <Input />
        </Form.Item>
        <Form.Item label="Product Description">
          <TextArea rows={4} />
        </Form.Item>
        <Form.Item label="Category">
          <Select>
            <Select.Option value="demo">Demo1</Select.Option>
            <Select.Option value="demo">Demo2</Select.Option>
            <Select.Option value="demo">Demo3</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="Price">
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
        <Form.Item label="In Stock Quantity">
          <InputNumber
            min="0"
            max="1000000"
            step="1"
            style={{
              width: "100%",
            }}
          />
        </Form.Item>
        <Form.Item label="Add Image Link">
          <Input addonAfter={<Button>Upload</Button>} defaultValue="https://" />
        </Form.Item>

        <Form.Item>
          <Button>Add Product</Button>
        </Form.Item>
      </Form>
      <br></br>
    </div>
  );
}

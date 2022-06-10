import React, { useState, useEffect } from "react";
import axiosInstance from "../../../api/axios";
import { useNavigate, useParams, Link } from "react-router-dom";

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

export default function Edit() {
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
  const { id } = useParams();
  const { TextArea } = Input;
  const [form] = Form.useForm();

  const initialFormData = {
    id: "",
    name: "",
    description: "",
    category: 1,
    price: "",
    quantity: "",
    image: "",
  };

  // ant Design Select Option get value by using primary key here.
  const [selected, setSelected] = useState(1);
  const [isloading, setIsLoading] = useState(true);
  const [formData, updateFormData] = useState(initialFormData);

  // useEffect(() => {
  //   axiosInstance
  //     .get("product/admin/edit/postdetail/" + id + "/")
  //     .then((res) => {
  //       updateFormData({
  //         ...formData,
  //         ["id"]: res.data.id,
  //         ["name"]: res.data.name,
  //         ["description"]: res.data.description,
  //         ["category"]: res.data.category,
  //         ["price"]: res.data.price,
  //         ["quantity"]: res.data.quantity,
  //         ["image"]: res.data.image,
  //       });
  //       form.setFieldsValue(formData);
  //     });
  // }, []);

  useEffect(() => {
    axiosInstance
      .get("product/admin/edit/postdetail/" + id + "/")
      .then((res) => {
        form.setFieldsValue({
          ["id"]: res.data.id,
          ["name"]: res.data.name,
          ["description"]: res.data.description,
          ["category"]: res.data.category,
          ["price"]: res.data.price,
          ["quantity"]: res.data.quantity,
          ["image"]: res.data.image,
        });
      });
  }, []);

  // const apiUrl = "http://localhost:8000/api/product/";

  // useEffect(() => {
  //   const fetchItems = async () => {
  //     try {
  //       const response = await fetch(apiUrl + "admin/edit/postdetail/" + id);
  //       if (!response.ok) throw Error("did not receive expected data");
  //       const result = await response.json();
  //       updateFormData({
  //         ...formData,
  //         ["id"]: result.id,
  //         ["name"]: result.name,
  //         ["description"]: result.description,
  //         ["category"]: result.category,
  //         ["price"]: result.price,
  //         ["quantity"]: result.quantity,
  //         ["image"]: result.image,
  //       });
  //       console.log("hihi" + result);
  //     } catch (err) {
  //       console.log(err);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };
  //   fetchItems();
  // }, [updateFormData]);

  const handleSubmit = (value) => {
    // e.preventDefault();
    console.log(value);
    axiosInstance
      .put(`product/admin/edit/` + id + "/", {
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

  console.log(formData);
  console.log(formData.name);

  // https://codesandbox.io/s/modern-forest-bpolt
  // https://stackoverflow.com/questions/63711080/how-to-set-value-dynamically-inside-form-list-using-setfieldsvalue-in-antd-4

  // useEffect(() => {
  //   form.resetFields();
  // }, []);

  const DeleteProduct = ({ id }) => {
    return (
      <>
        <Link to={"/admin/delete/" + id}>Delete This Product</Link>
      </>
    );
  };

  return (
    <div className="form">
      <br></br>
      <br></br>
      <h1>Edit Product</h1>
      <br></br>
      <Form
        onFinish={handleSubmit}
        form={form}
        // initialValues={formData}
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="vertical"
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
          <Input addonAfter={<Button>Upload</Button>} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
        <Form.Item>
          <Button type="primary" color="red">
            <DeleteProduct id={formData.id} />
          </Button>
        </Form.Item>
      </Form>
      <br></br>
    </div>
  );
}

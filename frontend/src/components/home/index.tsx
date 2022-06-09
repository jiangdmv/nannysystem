import React from "react";
import { useState, useEffect } from "react";
import { StatusCodes } from "http-status-codes";
import productApi from "../../api/productApi";
import Loader from "../../common/Loader";
import ErrorPage from "../../common/ErrorPage";
import { Button, Select } from "antd";
import Product from "../product";
import "./index.css";

function Home() {
  const { Option } = Select;
  const optionChoices = ["Last Added", "Low to High", "High to Low"];
  const [displayType, setType] = useState("Last Added");
  const type = {
    displayType: displayType,
  };

  return (
    <>
      <br></br>

      <h1 className="Products">
        Products
        <Button type="primary" className="addProductButton">
          Add Product
        </Button>{" "}
        <span className="dropdown">
          <Select
            defaultValue="Last Added"
            style={{
              width: 120,
            }}
            onChange={(value) => {
              setType(value);
            }}
          >
            {optionChoices.map((item, index) => {
              return (
                <Option key={index} value={item}>
                  {item}
                </Option>
              );
            })}
          </Select>
        </span>
      </h1>
      <Product {...type} />
      <br></br>
      <br></br>
      <br></br>
    </>
  );
}

export default Home;

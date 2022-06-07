import React from "react";
import { useState, useEffect } from "react";
import { StatusCodes } from "http-status-codes";
import productApi from "../../api/productApi";
import Loader from "../../common/Loader";
import ErrorPage from "../../common/ErrorPage";
import { Button } from "antd";
import Product from "../product";
import "./index.css";

function Home() {
  return (
    <>
      <br></br>
      <h1 className="Products">
        Products
        <Button type="primary" className="addProductButton">
          Add Product
        </Button>
      </h1>
      <Product />
      <br></br>
      <br></br>
      <br></br>
    </>
  );
}

export default Home;

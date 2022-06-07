import React from "react";
import { useState, useEffect } from "react";
import { StatusCodes } from "http-status-codes";
import productApi from "../../api/productApi";
import Loader from "../../common/Loader";
import ErrorPage from "../../common/ErrorPage";

import Product from "../product";

function Home() {
  return (
    <>
      <div>Home Page Show Products</div>
      <Product />
    </>
  );
}

export default Home;

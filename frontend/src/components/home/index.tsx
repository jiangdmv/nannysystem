import React from "react";
import { useState, useEffect } from "react";
import { StatusCodes } from "http-status-codes";
import productApi from "../../api/productApi";
import Loader from "../../common/Loader";
import ErrorPage from "../../common/ErrorPage";
import { Table, Row, Col } from "antd";

function Home() {
  const [results, setResults] = useState(null);
  const [isloading, setIsLoading] = useState(true);
  const apiUrl = "http://localhost:8000/product/";

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw Error("did not receive expected data");
        const result = await response.json();
        console.log(result);
        setResults(result);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchItems();
  }, []);

  const ShowProducts = ({ results }) => {
    const lists = results;
    console.log(lists);
    return (
      <>
        {lists.map((ele) => {
          return (
            <Row gutter={[22, 22]}>
              <Col xs={24} xl={8}>
                {ele.name}
              </Col>
              <Col xs={24} xl={8}>
                {ele.description}
              </Col>
            </Row>
          );
        })}
      </>
    );
  };

  return (
    <>
      <div>Home Page Show Products</div>
      {isloading && <p>Loading results...</p>}
      {!isloading && <ShowProducts results={results} />}
    </>
  );
}

export default Home;

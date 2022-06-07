import React from "react";
import Modal from "antd/lib/modal/Modal";
import { Card, Button, Image, Row, Col } from "antd";
import { useState, useEffect } from "react";

function ProductModalContent() {
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
            <>
              <Col key={ele.id} xs={24} xl={8}>
                <Card
                  key={ele.id}
                  size="small"
                  title="Small size card"
                  style={{
                    width: 230,
                  }}
                >
                  <Image width={200} src={ele.image} />
                  <p>{ele.name}</p>
                  <h3>${ele.price}</h3>
                  <p>
                    <Button type="primary">Add</Button>
                    <Button type="primary">Edit</Button>
                  </p>
                </Card>
              </Col>
            </>
          );
        })}
      </>
    );
  };

  return (
    <>
      {isloading && <p>Loading results...</p>}
      {!isloading && <ShowProducts results={results} />}

      <Row>
        <Col key="1" xs={24} xl={8}>
          First
        </Col>
        <Col xs={24} xl={8}>
          Second
        </Col>
        <Col xs={24} xl={8}>
          First
        </Col>
        <Col xs={24} xl={8}>
          Second
        </Col>
        <Col xs={24} xl={8}>
          Second
        </Col>
      </Row>
      <Row>
        <Col xs={24} xl={8}>
          First
        </Col>
        <Col xs={24} xl={8}>
          Second
        </Col>
        <Col xs={24} xl={8}>
          First
        </Col>
        <Col xs={24} xl={8}>
          Second
        </Col>
        <Col xs={24} xl={8}>
          Second
        </Col>
      </Row>
    </>
  );
}

export default ProductModalContent;

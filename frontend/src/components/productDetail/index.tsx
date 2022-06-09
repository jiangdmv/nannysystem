import React from "react";
import Modal from "antd/lib/modal/Modal";
import { List, Card, Button, Image, Row, Col, Pagination, Select } from "antd";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function ProductDetail() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [results, setResults] = useState<any[]>([]);
  const [isloading, setIsLoading] = useState(true);

  const apiUrl = "http://localhost:8000/api/product/";

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(apiUrl + id);
        if (!response.ok) throw Error("did not receive expected data");
        const result = await response.json();
        setResults(result);
        console.log(result);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchItems();
  }, []);

  const ShowProductDetail = ({ results }) => {
    const lists = results;

    return (
      <>
        {/* <Card
          key={item.id}
          size="small"
          title="Small size card"
          hoverable
          // extra={<Button>Hi</Button>}
          style={{
            width: 230,
          }}
        >
          <Image width={200} height={250} src={item.image} />
          <p>{item.name}</p>
          <h3>${item.price}</h3>
          <p>
            <Button type="primary">Add</Button>
          </p>
        </Card> */}
      </>
    );
  };

  return (
    <>
      {isloading && <p>Loading results...</p>}
      {!isloading && <ShowProductDetail results={results} />}
    </>
  );
}

export default ProductDetail;

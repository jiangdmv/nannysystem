import React from "react";
import Modal from "antd/lib/modal/Modal";
import {
  List,
  Card,
  Button,
  Image,
  Space,
  Row,
  Col,
  Pagination,
  Select,
} from "antd";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function ProductDetail() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [item, setItem] = useState<any[]>([]);
  const [isloading, setIsLoading] = useState(true);

  const apiUrl = "http://localhost:8000/api/product/";

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(apiUrl + id + "/");
        if (!response.ok) throw Error("did not receive expected data");
        const result = await response.json();
        setItem(result);
        console.log(result);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchItems();
  }, []);

  const ShowProductDetail = ({ item }) => {
    return (
      <div className="layout">
        <br></br>
        <br></br>
        <h1>Products Detail</h1>
        <br></br>
        <div className="inbox">
          <Space
            direction="horizontal"
            size="small"
            wrap
            style={{
              display: "flex",
            }}
          >
            <Card
              size="default"
              hoverable
              // extra={<Button>Hi</Button>}
              style={{
                width: 450,
                height: 450,
              }}
            >
              <Image width={400} height={400} src={item.image} />
            </Card>

            <Card
              size="default"
              title="Cellphone"
              hoverable
              style={{
                width: 450,
                height: 450,
              }}
            >
              <h2>{item.name}</h2>
              <h3>
                ${item.price}&nbsp;&nbsp; Quantity:{item.quantity}
              </h3>
              <h4>{item.description}</h4>

              <Space
                direction="horizontal"
                size="middle"
                wrap
                align="center"
                style={{
                  display: "flex",
                }}
              >
                <Button type="primary">Add To Cart</Button>
                <Button type="primary">Edit</Button>
              </Space>
            </Card>
          </Space>
        </div>
        <br></br>
        <br></br>
        <br></br>
      </div>
    );
  };

  return (
    <>
      {isloading && <p>Loading results...</p>}
      {!isloading && <ShowProductDetail item={item} />}
    </>
  );
}

export default ProductDetail;

import React, { useEffect, useState } from "react";
import axiosInstance from "../../../api/axios";
import Modal from "antd/lib/modal/Modal";
import { Link } from "react-router-dom";
import { List, Card, Button, Image, Space, Row, Col, Pagination } from "antd";
import Item from "antd/lib/list/Item";
import Create from "../create";
import ProductDetail from "../../productDetail";

function Admin() {
  const [results, setResults] = useState(null);

  const [isloading, setIsLoading] = useState(true);

  const apiUrl = "http://localhost:8000/api/product/";

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

  const EditProduct = ({ id }) => {
    return (
      <>
        <Link to={"/admin/edit/" + id}>Edit</Link>
      </>
    );
  };

  const CreateProduct = () => {
    return (
      <>
        <Link to={"/admin/create/"}>Add New Product</Link>
      </>
    );
  };

  const ShowProducts = ({ results }) => {
    const lists = results;
    console.log(lists);

    return (
      <>
        <List
          grid={{
            gutter: 16,
            column: 5,
            xs: 1,
            sm: 2,
            md: 3,
            lg: 4,
            xl: 5,
            xxl: 6,
          }}
          pagination={{
            showSizeChanger: true,
            pageSizeOptions: ["10", "50", "100", "1000"],
            position: "bottom",
          }}
          dataSource={lists}
          renderItem={(item: any) => (
            <List.Item>
              <Link to={`/products/${item.id}`}>
                <Card
                  key={item.id}
                  size="small"
                  hoverable
                  // extra={<Button>Hi</Button>}
                  style={{
                    width: 230,
                  }}
                >
                  <Image width={200} height={230} src={item.image} />
                  <p>{item.name}</p>
                  <h3>${item.price}</h3>
                  <Space
                    direction="horizontal"
                    size="large"
                    wrap
                    align="center"
                    style={{
                      display: "flex",
                    }}
                  >
                    <Button type="primary">Add</Button>
                    <Button type="primary">
                      <EditProduct id={item.id} />
                    </Button>
                  </Space>
                </Card>
              </Link>
            </List.Item>
          )}
        />
      </>
    );
  };

  return (
    <>
      <br></br>
      <h1 className="Products">
        Products
        <Button type="primary" className="addProductButton">
          <CreateProduct />
        </Button>
      </h1>
      {isloading && <p>Loading results...</p>}
      {!isloading && <ShowProducts results={results} />}
    </>
  );
}

export default Admin;

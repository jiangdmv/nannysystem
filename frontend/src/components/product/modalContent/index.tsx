import React from "react";
import Modal from "antd/lib/modal/Modal";
import { List, Card, Button, Image, Row, Col, Pagination } from "antd";
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
              <Card
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
                  <Button type="primary">Edit</Button>
                </p>
              </Card>
            </List.Item>
          )}
        />
      </>
    );
  };

  return (
    <>
      {isloading && <p>Loading results...</p>}
      {!isloading && <ShowProducts results={results} />}
    </>
  );
}

export default ProductModalContent;

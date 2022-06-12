import React, { useState } from "react";

import { Link } from "react-router-dom";
import { Card, Image, Button, List } from "antd";

const CartModalContent = () => {
  const [cartLists, updateCartLists] = useState([
    { name: "test" },
    { name: "test2" },
  ]);

  return (
    <>
      <List
        grid={{
          gutter: 1,
          column: 1,
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
        dataSource={cartLists}
        renderItem={(item: any) => (
          <List.Item>
            <Link to={`products/${item.id}`}>
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
                <p>
                  <Button type="primary">Add</Button>
                </p>
              </Card>
            </Link>
          </List.Item>
        )}
      />
    </>
  );
};

export default CartModalContent;

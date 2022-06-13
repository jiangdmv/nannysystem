import React, { useState } from "react";

import { Link } from "react-router-dom";
import { Card, Image, Button, List, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import "./index.css";

const CartModalContent = () => {
  const [cartLists, updateCartLists] = useState([
    { name: "test" },
    { name: "test2" },
  ]);

  const { cartItems, amount, total } = useSelector((store) => store.cart);

  if (amount < 1) {
    return (
      <>
        <div>Your cart is currently empty</div>
      </>
    );
  }

  const Tax = () => {
    return total * 0.07;
  };

  const EstimatedTotal = () => {
    return total * 1.07;
  };

  const gridStyle25 = {
    width: "25%",
  };
  const gridStyle50 = {
    width: "50%",
  };

  return (
    <>
      <h1 className="cart">&nbsp;&nbsp;Cart&nbsp;</h1>
      <h3 className="quantity">(9)</h3>

      <List
        grid={{
          gutter: 16,
          column: 1,
        }}
        dataSource={cartItems}
        renderItem={(item: any) => (
          <List.Item>
            <Link to={`products/${item.id}`}>
              <Card
                key={item.id}
                size="small"
                hoverable
                // extra={<Button>Hi</Button>}
                style={{
                  width: 480,

                  height: 130,
                }}
              >
                <Card.Grid style={gridStyle25}>
                  <Image width={100} height={100} src={item.image} />
                </Card.Grid>
                <Card.Grid style={gridStyle50}>
                  {item.name}
                  <br></br>
                  <br></br>
                  <br></br>
                  <Button type="primary">
                    <MinusOutlined />
                    99
                    <PlusOutlined />
                  </Button>
                </Card.Grid>
                <Card.Grid style={gridStyle25}>
                  ${item.price}
                  <br></br>
                  <br></br>
                  <br></br>
                  <Button type="primary">Remove</Button>
                </Card.Grid>
              </Card>
            </Link>
          </List.Item>
        )}
      />
      <br></br>
      <div>Apply Discount Code</div>
      <Input.Group compact>
        <Input
          style={{
            width: "calc(80%)",
          }}
          defaultValue="20 DOLLAR OFF"
        />
        <Button type="primary">Apply</Button>
      </Input.Group>
      <br></br>
      <br></br>

      <div>Subtotal ${total}</div>
      <div>
        Tax $<Tax />
      </div>
      <div>Discount</div>
      <div>
        Estimated total $<EstimatedTotal />
      </div>
    </>
  );
};

export default CartModalContent;

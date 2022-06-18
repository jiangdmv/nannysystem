import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";
import { Card, Image, Button, List, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import {
  clearCart,
  removeItem,
  increase,
  decrease,
  calculateTotals,
} from "../../../app/cartSlice";
import "./index.css";

const CartModalContent = () => {
  const dispatch = useDispatch();
  const { cartItems, amount, total, isLoading } = useSelector(
    (store) => store.cart
  );

  const [newCoupon, setNewCoupon] = useState("20 DOLLAR OFF");
  const [appliedCoupon, setAppliedCoupon] = useState(false);

  useEffect(() => {
    if (isLoading) {
      return;
    }
    dispatch(calculateTotals());
  }, [cartItems, appliedCoupon]);

  useEffect(() => {
    if (isLoading) {
      return;
    }
    const user_name = localStorage.getItem("user_name");
    let cart = {
      user: user_name,
      cartItems: JSON.stringify(cartItems),
      amount: amount,
      total: total,
    };
    localStorage.setItem(user_name + "Cart", JSON.stringify(cart));
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    localStorage.setItem("amount", amount);
    localStorage.setItem("total", total);
    console.log("main");
    console.log(cartItems);
    console.log(isLoading);
  }, [amount]);

  if (amount < 1) {
    return (
      <>
        <div>Your cart is currently empty</div>
      </>
    );
  }

  const Tax = () => {
    return (total * 0.07).toFixed(2);
  };

  const Coupon = { "20 DOLLAR OFF": 20 };

  const EstimatedTotal = () => {
    return (total * 1.07).toFixed(2);
  };

  const ApplyCoupon = () => {
    setAppliedCoupon(true);
    return EstimatedTotal() - Coupon[newCoupon];
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
      <h3 className="quantity">({amount})</h3>

      <List
        grid={{
          gutter: 16,
          column: 1,
        }}
        dataSource={cartItems}
        renderItem={(item: any) => (
          <List.Item>
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
                <Button
                  type="primary"
                  onClick={() => {
                    if (item.cartQuantity === 1) {
                      dispatch(removeItem(item.id));
                      return;
                    }
                    dispatch(decrease(item));
                  }}
                >
                  <MinusOutlined />
                </Button>
                <Button type="primary">{item.cartQuantity}</Button>
                <Button
                  type="primary"
                  onClick={() => {
                    dispatch(increase(item));
                  }}
                >
                  <PlusOutlined />
                </Button>
              </Card.Grid>
              <Card.Grid style={gridStyle25}>
                ${item.price}
                <br></br>
                <br></br>
                <br></br>
                <Button
                  type="primary"
                  onClick={() => {
                    dispatch(removeItem(item.id));
                  }}
                >
                  Remove
                </Button>
              </Card.Grid>
            </Card>
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
          onChange={(e) => setNewCoupon(e.target.value)}
        />
        <Button
          type="primary"
          onClick={() => {
            ApplyCoupon();
          }}
        >
          Apply
        </Button>
      </Input.Group>
      <br></br>
      <br></br>
      <div>
        <h3>
          Subtotal <div className="price">${total}</div>
        </h3>
        <h3>
          Tax{" "}
          <div className="price">
            $<Tax />
          </div>
        </h3>
        <h3>Discount</h3>
        <h3>
          Estimated total{" "}
          <div className="price">
            ${appliedCoupon ? <ApplyCoupon /> : <EstimatedTotal />}
          </div>
        </h3>
      </div>
    </>
  );
};

export default CartModalContent;

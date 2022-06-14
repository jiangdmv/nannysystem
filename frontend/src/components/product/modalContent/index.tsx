import React from "react";
import Modal from "antd/lib/modal/Modal";
import { List, Card, Button, Image, Row, Col, Pagination, Select } from "antd";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import {
  sort_by_key_low_to_high,
  sort_by_key_high_to_low,
} from "../../../common/sort";
import {
  clearCart,
  addToCart,
  removeItem,
  increase,
  decrease,
  calculateTotals,
} from "../../../app/cartSlice";

function ProductModalContent({ displayType }) {
  const [results, setResults] = useState<any[]>([]);
  const [originResults, setOriginResults] = useState<any[]>([]);
  const [isloading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  const { cartItems, amount, total } = useSelector((store) => store.cart);

  useEffect(() => {
    dispatch(calculateTotals());
  }, [cartItems]);

  const apiUrl = "http://localhost:8000/api/product/";

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw Error("did not receive expected data");
        const result = await response.json();
        setResults(result);
        setOriginResults([...result]);
        console.log(result);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchItems();
  }, []);

  //   const Test = ({ results }) => {
  //     const lists = results;
  //     console.log(sort_by_key_low_to_high(lists, "price"));
  //     setPriceLowToHigh(sort_by_key_low_to_high(lists, "price"));
  //   };

  //   const SortPriceLowToHigh = ({ priceLowToHigh: any }) => {
  //     const lists = priceLowToHigh;
  //     console.log(sort_by_key_low_to_high(lists, "price"));
  //     setPriceLowToHigh(sort_by_key_low_to_high(lists, "price"));
  //   };

  //   const SortPriceHighToLow = ({ priceHighToLow: any }) => {
  //     const lists = priceLowToHigh;
  //     console.log("run" + lists);
  //     setPriceHighToLow(sort_by_key_high_to_low(lists, "price"));
  //   };

  useEffect(() => {
    if (isloading) {
      return;
    }
    if (displayType === "Low to High") {
      setResults(sort_by_key_low_to_high(results, "price"));
    } else if (displayType === "High to Low") {
      setResults(sort_by_key_high_to_low(results, "price"));
    } else if (displayType === "Last Added") {
      setResults([...originResults]);
    }
  }, [displayType]);

  const AddToCart = ({ item }) => {
    return (
      <>
        <Button
          type="primary"
          onClick={() => {
            dispatch(addToCart(item));
          }}
        >
          AddToCart
        </Button>
      </>
    );
  };

  const ShowProducts = ({ results }) => {
    const lists = results;

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
                hoverable
                // extra={<Button>Hi</Button>}
                style={{
                  width: 230,
                }}
              >
                <Link to={`products/${item.id}`}>
                  <Image width={200} height={230} src={item.image} />
                  <p>{item.name}</p>
                  <h3>${item.price}</h3>
                </Link>
                {cartItems.some((ele) => ele.id === item.id) ? (
                  <div>
                    {" "}
                    <Button
                      type="primary"
                      onClick={() => {
                        if (item.amount === 1) {
                          dispatch(removeItem(item.id));
                          return;
                        }
                        dispatch(decrease(item));
                      }}
                    >
                      <MinusOutlined />
                    </Button>
                    <Button type="primary">
                      {
                        cartItems[
                          cartItems.findIndex((ele) => ele.id === item.id)
                        ].cartQuantity
                      }
                    </Button>
                    <Button
                      type="primary"
                      onClick={() => {
                        dispatch(increase(item));
                      }}
                    >
                      <PlusOutlined />
                    </Button>
                  </div>
                ) : (
                  <AddToCart item={item} />
                )}
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

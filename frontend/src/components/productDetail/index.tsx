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
import { useNavigate, useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import {
  clearCart,
  addToCart,
  removeItem,
  increase,
  decrease,
  calculateTotals,
} from "../../app/cartSlice";

function ProductDetail() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [item, setItem] = useState<any[]>([]);
  const [isloading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const { cartItems, amount, total } = useSelector((store) => store.cart);

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

  const EditProduct = ({ id }) => {
    return (
      <>
        <Link to={"/admin/edit/" + id}>Edit</Link>
      </>
    );
  };

  const AddToCart = ({ item }) => {
    item.amount = 1;
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
                {cartItems.includes(item) ? (
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
                    <Button type="primary">{item.amount}</Button>
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

                <Button type="primary">
                  <EditProduct id={item.id} />
                </Button>
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

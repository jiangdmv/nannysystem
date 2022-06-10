import React, { useState, useEffect } from "react";
import axiosInstance from "../../../api/axios";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "antd";

export default function Create() {
  const navigate = useNavigate();
  const { id } = useParams();

  const handleSubmit = (e) => {
    e.preventDefault();
    axiosInstance
      .delete("product/admin/delete/" + id)
      .catch(function (error) {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      })
      .then(function () {
        navigate({
          pathname: "/admin/",
        });
        window.location.reload();
      });
  };

  return (
    <>
      <Button
        type="primary"
        htmlType="submit"
        color="red"
        onClick={handleSubmit}
      >
        Delete This Product
      </Button>
    </>
  );
}

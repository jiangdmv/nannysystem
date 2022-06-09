import React, { useState, useEffect } from "react";
import axiosInstance from "../../../api/axios";
import { useNavigate, useParams } from "react-router-dom";
import Input from "rc-input";

export default function Create() {
  const navigate = useNavigate();
  const { id } = useParams();
  const initialFormData = Object.freeze({
    id: "",
    title: "",
    slug: "",
    excerpt: "",
    content: "",
  });

  const [formData, updateFormData] = useState(initialFormData);

  useEffect(() => {
    axiosInstance.get("admin/edit/postdetail/" + id).then((res) => {
      updateFormData({
        ...formData,
        ["title"]: res.data.title,
        ["excerpt"]: res.data.excerpt,
        ["slug"]: res.data.slug,
        ["content"]: res.data.content,
      });
      console.log(res.data);
    });
  }, [updateFormData]);

  const handleChange = (e) => {
    updateFormData({
      ...formData,
      // Trimming any whitespace
      [e.target.name]: e.target.value.trim(),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);

    axiosInstance.put(`admin/edit/` + id + "/", {
      title: formData.title,
      slug: formData.slug,
      author: 1,
      excerpt: formData.excerpt,
      content: formData.content,
    });
    navigate({
      pathname: "/admin/",
    });
    window.location.reload();
  };

  return (
    <>
      <Input></Input>
    </>
  );
}

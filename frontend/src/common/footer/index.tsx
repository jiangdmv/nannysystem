import React from "react";
import "./index.css";
import {
  YoutubeOutlined,
  TwitterOutlined,
  FacebookOutlined,
} from "@ant-design/icons";

const Footer = () => {
  return (
    <>
      <div className="footer">
        <div className="copyRight">@2022 All Rights Reserved.</div>
        <ul className="socialIcons">
          <li>
            <YoutubeOutlined />
          </li>
          <li>
            <TwitterOutlined />
          </li>
          <li>
            <FacebookOutlined />
          </li>
        </ul>
        <ul className="supportPages">
          <li>Contact us</li>
          <li>Privacy Policies</li>
          <li>Help</li>
        </ul>
      </div>
    </>
  );
};

export default Footer;

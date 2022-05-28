import React, { useState } from "react";
import { Checkbox, Button } from "antd";

import TextInput from "../../../common/input/textInput";

interface IProps {
  handleOnLogin: () => void;
}

const Form = ({ handleOnLogin = () => {} }: IProps) => {
  return (
    <>
      <div>Email</div>
      <TextInput onChange={() => {}} placeholder="email" />
      <div>Password</div>
      <TextInput onChange={() => {}} placeholder="password" />
      <Button onClick={() => {}}>Submit</Button>
    </>
  );
};

export default Form;

import React from "react";
import "antd/dist/antd.css";
import "./index.css";
import "../common.css";
import { Input } from "antd";

interface IProps {
  label?: string;
  value?: string;
  placeholder?: string;
  errorMessage?: string;
  infoMessage?: string;
  maxLength?: number;
  disabled?: boolean;
  onChange: (e: any) => void;
}

const TextInput = ({
  label = "",
  value = "",
  placeholder = "",
  errorMessage = "",
  infoMessage = "",
  maxLength = 30,
  disabled = false,
  onChange = () => {},
}: IProps) => {
  return (
    <div className="text-input-container">
      {label ? <div className={"input-label"}>{label}</div> : null}
      <Input
        maxLength={maxLength}
        className={errorMessage ? "text-input-error" : "text-input"}
        type={"text"}
        onChange={onChange}
        placeholder={placeholder}
        value={value}
        disabled={disabled}
      />
      {!errorMessage && infoMessage ? (
        <div className={"text-input-info-message"}>{infoMessage}</div>
      ) : null}
      {errorMessage ? (
        <div className={"text-input-error-message"}>{errorMessage}</div>
      ) : null}
    </div>
  );
};

export default TextInput;

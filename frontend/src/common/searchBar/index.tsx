import React from "react";
import "antd/dist/antd.css";
import "./index.css";

import { Input } from "antd";

interface IProps {
  label?: string;
  value?: string;
  placeholder?: string;
  errorMessage?: string;
  infoMessage?: string;
  maxLength?: number;
  disabled?: boolean;
  loading?: boolean;
  onSearch?: any;
  //   style?: any;
  onChange: (e: any) => void;
}

const SearchBar = ({
  label = "",
  value = "",
  placeholder = "",
  errorMessage = "",
  infoMessage = "",
  maxLength = 90,
  onSearch = "",
  disabled = false,
  loading = true,

  onChange = () => {},
}: IProps) => {
  return (
    <div className="text-input-container">
      {label ? <div className={"input-label"}>{label}</div> : null}
      <Input.Search
        maxLength={maxLength}
        className={errorMessage ? "text-input-error" : "text-input"}
        type={"text"}
        onChange={onChange}
        onSearch={onSearch}
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

export default SearchBar;

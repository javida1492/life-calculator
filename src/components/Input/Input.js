import React from "react";
import "./inputStyles.css";

const Input = ({ value, onCellChange }) => {
  return (
    <div>
      <input value={value} onChange={onCellChange} type="number" />
    </div>
  );
};

export default Input;

import React from "react";
import "./styles.scss";

export interface ButtonProps {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  children: React.ReactChild;
}
const Button: React.FC<ButtonProps> = ({ onClick, children }) => {
  return (
    <button className="btn btn--green" onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;

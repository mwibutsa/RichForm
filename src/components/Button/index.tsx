import React from "react";
import "./styles.scss";

export interface ButtonProps {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  children: React.ReactChild;
  disabled?: boolean;
}
const Button: React.FC<ButtonProps> = ({ onClick, children, disabled }) => {
  return (
    <button className="btn btn--green" onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;

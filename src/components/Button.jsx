import React from "react";

const Button = ({
  children,
  type = "button",
  bgColor = "bg-white",
  textColor = "text-black",
  className = "",
  ...props
}) => {
  return (
    <button
      type={type}
      className={`inline-block px-4 py-3 rounded-md font-medium ${bgColor} ${textColor} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;

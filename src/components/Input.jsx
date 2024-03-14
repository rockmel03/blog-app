import React, { useId } from "react";

const Input = React.forwardRef(function Input(
  { label, type = "text", className = "", ...props },
  ref
) {
  const id = useId();
  return (
    <div className="w-full">
      {label && <label htmlFor={id}></label>}
      <input
        id={id}
        ref={ref}
        type={type}
        className={`bg-transparent ${className}`}
        {...props}
      />
    </div>
  );
});

export default Input;

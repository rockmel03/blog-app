import React, { useId } from "react";

const Input = React.forwardRef(function Input(
  { label, type = "text", className = "", ...props },
  ref
) {
  const id = useId();
  return (
    <div className="w-full">
      {label && <label htmlFor={id}>{label}</label>}
      <input
        id={id}
        ref={ref}
        type={type}
        className={` w-full mt-2 bg-zinc-700 rounded-md py-3 px-2 ${className}`}
        {...props}
      />
    </div>
  );
});

export default Input;

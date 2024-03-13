import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import authService from "../appwrite/auth";
import { login } from "../store/reducers/AuthSlice";
import { useForm } from "react-hook-form";
import { Button, Input } from "./index";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");

  const create = async (data) => {
    setError("");
    try {
      const session = await authService.createAccount(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(login(userData));
      }
    } catch (error) {
      setError(error.message);
      console.error(error);
    }
  };

  return (
    <div>
      <div>
        <h2>Create a new account</h2>
        <form onSubmit={handleSubmit(create)}>
          <Input
            label="User Name"
            type="text"
            placeholder="Enter Your name"
            {...register("name", { required: true })}
          />
          <Input
            label="email Address"
            type="text"
            placeholder="Enter Your email"
            {...register("email", { required: true })}
          />
          <Input
            label="password "
            type="text"
            placeholder="Enter Your password"
            {...register("password", { required: true })}
          />
          <Button type="submit">Signup</Button>
          {error && <p className="text-red-600">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default Signup;

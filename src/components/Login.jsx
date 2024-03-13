import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login as authLogin } from "../store/reducers/AuthSlice";
import authService from "../appwrite/auth";
import { Input, Button } from "./index";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { handleSubmit, register } = useForm();
  const [error, setError] = useState("");

  const login = async (data) => {
    setError("");
    try {
      const session = await authService.login(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(authLogin(userData));
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      {error && <p className="text-red-600">{error}</p>}
      <form onSubmit={handleSubmit(login)}>
        <Input
          {...register("email", { required: true })}
          type="email"
          label="Email"
          placeholder="Enter your Email"
        />
        <Input
          {...register("password", { required: true })}
          type="password"
          label="Password"
          placeholder="Enter your Password"
        />
        <Button type="submit">Login</Button>
      </form>
    </div>
  );
};

export default Login;

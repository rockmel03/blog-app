import React from "react";
import {  useDispatch } from "react-redux";
import authService from "../../appwrite/auth";
import { logout } from "../../store/reducers/AuthSlice";

const LogoutBtn = () => {
  const dispatch = useDispatch();

  const logoutHandler = () => {
    authService.logOut()
    .then(() => {
        dispatch(logout())
    })
  }

  return <button onClick={logoutHandler} className="inline-block px-4 py-2 bg-orange-400">Logout</button>;
};

export default LogoutBtn; 

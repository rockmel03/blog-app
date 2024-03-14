import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import authService from "./appwrite/auth";
import { login, logout } from "./store/reducers/AuthSlice";
import { Footer, Header } from "./components";
import { Outlet } from "react-router-dom";

export default function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) =>
        userData ? dispatch(login(userData)) : dispatch(logout())
      )
      .finally(() => setLoading(false));
  }, []);

  return !loading ? (
    <div className="w-screen h-screen bg-[#14213d] text-white overflow-y-auto">
      <div className="w-full h-full flex flex-col justify-between">
        <Header />
        <Outlet />
        <Footer />
      </div>
    </div>
  ) : null;
}

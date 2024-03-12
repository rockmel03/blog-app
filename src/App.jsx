import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import authService from "./appwrite/auth";
import { login, logout } from "./store/reducers/AuthSlice";
import { Footer, Header } from "./components";

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
    <div className="w-screen h-screen bg-zinc-950 text-white overflow-y-auto">
      <div className="w-full h-full flex flex-col justify-between">
        <Header />
        <Footer />
      </div>
    </div>
  ) : null;
}

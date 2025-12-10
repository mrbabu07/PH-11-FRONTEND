// src/layout/AuthLayout.jsx
import React from "react";
import { Outlet } from "react-router";
import Navbar from "../Components/Navbar";

const AuthLayout = () => {
  return (
    <div>
      <Navbar />

    {/* // <div className="min-h-screen flex items-center justify-center bg-gray-900"> */}
      <Outlet />
    </div>
  );
};

export default AuthLayout;

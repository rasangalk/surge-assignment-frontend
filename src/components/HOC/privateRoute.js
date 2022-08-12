import userEvent from "@testing-library/user-event";
import React from "react";
import { Outlet, Navigate } from "react-router";

/**
 * This function handles the private routings
 */
const PrivateWrapper = () => {
  const token = window.localStorage.getItem("token");
  return token ? <Outlet /> : <Navigate to="/" replace />;
};
export default PrivateWrapper;

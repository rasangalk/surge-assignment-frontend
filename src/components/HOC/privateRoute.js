import userEvent from "@testing-library/user-event";
import React from "react";
import { Outlet, Navigate } from "react-router";

/**
 * This functions handles the private routings
 */

// Private wrapper for admin
const PrivateWrapper = ({ type }) => {
  const token = window.localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  return token && type === user.accountType ? (
    <Outlet />
  ) : (
    <Navigate to="/" replace />
  );
};

// Private wrapper for user
const PrivateWrapper2 = ({ type }) => {
  const token = window.localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  return token && type === user.accountType ? (
    <Outlet />
  ) : (
    <Navigate to="/" replace />
  );
};

const PrivateWrappers = {
  PrivateWrapper,
  PrivateWrapper2,
};

export default PrivateWrappers;

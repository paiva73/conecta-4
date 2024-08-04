import React from "react";
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children }) => {
  const nameUno = sessionStorage.getItem("namePlayerOne");
  const nameDos = sessionStorage.getItem("namePlayerTwo");
  const colorOne = sessionStorage.getItem("selectedColorOne");
  const colorTwo = sessionStorage.getItem("selectedColorTwo");

  const isAllowed = !!nameUno && !!nameDos && !!colorOne && !!colorTwo;

  return isAllowed ? children : <Navigate to="/" />;
};

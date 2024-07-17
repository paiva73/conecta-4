import React from "react";
import "./assets/reset.css";
import { ContextProvider } from "./context/Context";
import { Main } from "./components/Main";

export const App = () => {
  return (
    <ContextProvider>
      <Main />
    </ContextProvider>
  );
};

import React from "react";
import styles from "../App.module.css";
import { Route, Routes } from "react-router-dom";
import { GameScreen } from "./gamescreen/GameScreen";
import { ProtectedRoute } from "./ProtectedRoute";
import { Home } from "./home/Home";

export const Main = () => {

  return (
    <div className={styles.container}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/gamescreen"
          element={
            <ProtectedRoute>
              <GameScreen />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
};

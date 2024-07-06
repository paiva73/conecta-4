import React from 'react'
import { Navigate } from 'react-router-dom';

export const RutaProtegida = ({ esPermitida, children }) => {
      return esPermitida ? children : <Navigate to="/" />;
}

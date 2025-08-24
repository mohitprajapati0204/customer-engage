import React from "react";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./utils/Routes";

export default function App() {
  return (
    <BrowserRouter basename="/customer-engage">
      <AppRoutes />
    </BrowserRouter>
  );
}

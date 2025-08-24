import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Layout from "./Layout";
import About from "../pages/About";
import Contact from "../pages/Contact";
import RFM from "../pages/RFM";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/rfm-analysis" element={<RFM />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Route>
    </Routes>
  );
}

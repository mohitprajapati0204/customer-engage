// src/components/Layout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import { Layout as AntLayout } from "antd";
import Sidebar from "../components/Sidebar";

const { Header, Content } = AntLayout;

export default function Layout() {
  return (
    <AntLayout style={{}}>
      <Sidebar />

      <AntLayout>
        {/* Navbar */}
        <Header
          style={{
            background: "white",
            color: "black",
            fontSize: "20px",
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          Customer Engage
        </Header>

        {/* Page Content */}
        <Content style={{ margin: "8px", background: "#fff", padding: "20px" }}>
          <Outlet />
        </Content>
      </AntLayout>
    </AntLayout>
  );
}

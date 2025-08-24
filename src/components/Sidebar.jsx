// src/components/Sidebar.jsx
import React, { useState } from "react";
import { Layout, Menu, Tooltip } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import {
  HomeOutlined,
  InfoCircleOutlined,
  ContactsOutlined,
  DashboardOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from "@ant-design/icons";

const { Sider } = Layout;

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Menu items config
  const menuItems = [
    {
      key: "/",
      icon: <HomeOutlined />,
      label: "Home",
      path: "/",
    },
    {
      key: "/rfm-analysis",
      icon: <DashboardOutlined />,
      label: "RFM",
      path: "/rfm-analysis",
    },
    {
      key: "/about",
      icon: <InfoCircleOutlined />,
      label: "About",
      path: "/about",
    },
    {
      key: "/contact",
      icon: <ContactsOutlined />,
      label: "Contact",
      path: "/contact",
    },
  ];

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      trigger={null} // disable default trigger
      width={200}
      style={{
        minHeight: "97vh",
        // height: "100%",
        background: "#fff",
        borderRight: "1px solid #eee",
      }}
    >
      {/* Logo + Collapse Button */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "10px",
        }}
      >
        {/* Logo */}
        <div
          style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
          onClick={() => navigate("/")}
        >
          <Tooltip title="Go to Home" placement="right">
            <img
              src="https://buy.bchatgpt.top/favicon.ico" // replace with your logo
              alt="Logo"
              style={{
                height: "32px",
                marginRight: collapsed ? "0" : "10px",
                transition: "all 0.3s",
              }}
            />
          </Tooltip>
        </div>

        {/* Collapse Button */}
        <div>
          {collapsed ? (
            <MenuUnfoldOutlined
              onClick={() => setCollapsed(false)}
              style={{ fontSize: 20, cursor: "pointer" }}
            />
          ) : (
            <MenuFoldOutlined
              onClick={() => setCollapsed(true)}
              style={{ fontSize: 20, cursor: "pointer" }}
            />
          )}
        </div>
      </div>

      {/* Menu Items */}
      <Menu
        mode="inline"
        selectedKeys={[location.pathname]} // highlights active route
        onClick={({ key }) => navigate(key)} // navigation handler
        items={menuItems}
      />
    </Sider>
  );
}

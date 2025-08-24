import { Button, Col, Row } from "antd";
import React from "react";
import RFM_logo from "../assets/RFM.png";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  function handleNavigateToRFM() {
    navigate("/rfm-analysis"); // 👈 route name for your RFM page
  }

  return (
    <div>
      <div style={{ textAlign: "center", fontSize: "xxx-large" }}>
        RFM Engine
      </div>
      <Row>
        <Col
          xs={24}
          sm={24}
          md={24}
          lg={12}
          xl={12}
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <img
            src={RFM_logo}
            style={{ width: "100%", maxWidth: "400px", height: "auto" }}
            alt="RFM Analysis"
          />
        </Col>
        <Col
          xs={24}
          sm={24}
          md={24}
          lg={12}
          xl={12}
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "20px",
          }}
        >
          <p
            style={{ fontSize: "1.1rem", lineHeight: "1.6", marginTop: "10px" }}
          >
            <b> RFM (Recency, Frequency, Monetary)</b> analysis is a powerful
            method to understand customer behavior. It segments customers based
            on:
          </p>
          <ul style={{ fontSize: "1.1rem", lineHeight: "1.8" }}>
            <li>
              <b>Recency</b> – How recently a customer made a purchase
            </li>
            <li>
              <b>Frequency</b> – How often they purchase
            </li>
            <li>
              <b>Monetary</b> – How much they spend
            </li>
          </ul>
          <p
            style={{ fontSize: "1.1rem", lineHeight: "1.6", marginTop: "10px" }}
          >
            With this dashboard, you can quickly visualize insights, identify
            loyal customers, spot at-risk buyers, and make data-driven decisions
            to improve customer engagement.
          </p>
        </Col>
      </Row>

      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <Button
          color="cyan"
          variant="solid"
          size="large"
          onClick={handleNavigateToRFM}
          style={{
            fontSize: "1.2rem",
            padding: "0 30px",
            borderRadius: "50px",
          }}
        >
          Run RFM Analysis
        </Button>
      </div>
    </div>
  );
}

import React from "react";

function About() {
  return (
    <div
      style={{
        maxWidth: "900px",
        margin: "0 auto",
        fontFamily: "Arial, sans-serif",
        lineHeight: "1.6",
        color: "#333",
      }}
    >
      <h1
        style={{ textAlign: "center", fontSize: "32px", marginBottom: "20px" }}
      >
        About Customer Engage
      </h1>

      <p style={{ fontSize: "16px", marginBottom: "15px" }}>
        <strong>Customer Engage</strong> is a web application designed to help
        businesses understand their customers using{" "}
        <strong>RFM Analysis</strong> — a powerful marketing technique that
        evaluates customer behavior based on three key metrics:
      </p>

      <ul style={{ marginBottom: "15px" }}>
        <li>
          <strong>Recency (R):</strong> How recently a customer made a purchase.
        </li>
        <li>
          <strong>Frequency (F):</strong> How often the customer makes
          purchases.
        </li>
        <li>
          <strong>Monetary (M):</strong> How much money the customer spends.
        </li>
      </ul>

      <p style={{ fontSize: "16px", marginBottom: "15px" }}>
        By analyzing these metrics, <strong>Customer Engage</strong> segments
        customers into groups such as "Champions", "Loyal", or "At Risk",
        enabling businesses to take targeted actions to improve customer
        retention and increase revenue.
      </p>

      <p style={{ fontSize: "16px", marginBottom: "15px" }}>
        The platform provides interactive tables and charts to visualize
        customer segments, making it easier to identify high-value customers and
        optimize marketing strategies.
      </p>

      <p
        style={{
          fontSize: "16px",
          marginBottom: "15px",
          textAlign: "center",
          fontStyle: "italic",
        }}
      >
        Make smarter business decisions and enhance customer engagement with
        data-driven insights using <strong>Customer Engage</strong>.
      </p>
    </div>
  );
}

export default About;

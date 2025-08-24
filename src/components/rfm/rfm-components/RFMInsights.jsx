// RFMInsights.jsx
import React, { useContext, useMemo } from "react";
import { Row, Col, Card, Statistic, Divider, Table } from "antd";
import ReactECharts from "echarts-for-react";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { RFMContext } from "../rfm-context/RFMContext";

dayjs.extend(customParseFormat);

export default function RFMInsights() {
  const { uploadedData, rfmColumns } = useContext(RFMContext);

  // ✅ Process RFM data only when inputs change
  const rfmData = useMemo(() => {
    if (
      !uploadedData.length ||
      !rfmColumns.customer ||
      !rfmColumns.date ||
      !rfmColumns.amount
    ) {
      return null;
    }

    // Step 1: Parse all valid dates and find latest
    const dates = uploadedData
      .map((d) => dayjs(d[rfmColumns.date], ["YYYY-MM-DD", "DD/MM/YYYY"]))
      .filter((d) => d.isValid());

    if (!dates.length) return null;

    const today = dates.reduce((a, b) => (b.isAfter(a) ? b : a), dates[0]);

    const customers = {};

    uploadedData.forEach((row) => {
      const custId = row[rfmColumns.customer];
      const amount = parseFloat(row[rfmColumns.amount]);
      const date = dayjs(row[rfmColumns.date], ["YYYY-MM-DD", "DD/MM/YYYY"]);
      const invoice = row[rfmColumns.invoice];

      if (!date.isValid()) return; // skip invalid dates

      if (!customers[custId]) {
        customers[custId] = {
          recency: Infinity,
          frequency: new Set(),
          monetary: 0,
          customerId: custId,
          name: row[rfmColumns.customer], // optional, if needed
        };
      }

      const daysDiff = today.diff(date, "day");
      customers[custId].recency = Math.min(customers[custId].recency, daysDiff);
      customers[custId].frequency.add(invoice);
      customers[custId].monetary += amount;
    });

    // Convert frequency sets to numbers
    Object.keys(customers).forEach((c) => {
      customers[c].frequency = customers[c].frequency.size;
    });

    // Step 2: Scoring (1–5)
    const recencyVals = Object.values(customers).map((c) => c.recency);
    const frequencyVals = Object.values(customers).map((c) => c.frequency);
    const monetaryVals = Object.values(customers).map((c) => c.monetary);

    const getScore = (val, arr, reverse = false) => {
      const sorted = [...arr].sort((a, b) => a - b);
      const q1 = sorted[Math.floor(sorted.length * 0.2)];
      const q2 = sorted[Math.floor(sorted.length * 0.4)];
      const q3 = sorted[Math.floor(sorted.length * 0.6)];
      const q4 = sorted[Math.floor(sorted.length * 0.8)];

      let score = 1;
      if (val > q1) score = 2;
      if (val > q2) score = 3;
      if (val > q3) score = 4;
      if (val > q4) score = 5;

      return reverse ? 6 - score : score;
    };

    Object.keys(customers).forEach((c) => {
      const cust = customers[c];
      cust.R = getScore(cust.recency, recencyVals, true);
      cust.F = getScore(cust.frequency, frequencyVals);
      cust.M = getScore(cust.monetary, monetaryVals);
      cust.RFMScore = `${cust.R}${cust.F}${cust.M}`;

      // Step 3: Segmentation
      if (cust.R >= 4 && cust.F >= 4 && cust.M >= 4) cust.segment = "Champion";
      else if (cust.R >= 3 && cust.F >= 3) cust.segment = "Loyal Customer";
      else if (cust.R >= 4 && cust.F <= 2) cust.segment = "New Customer";
      else if (cust.R <= 2 && cust.F >= 4) cust.segment = "At Risk";
      else cust.segment = "Others";
    });

    return customers;
  }, [uploadedData, rfmColumns]);

  if (!rfmData) {
    return <p>No RFM data yet. Please upload and map columns.</p>;
  }

  const customers = Object.values(rfmData);

  // KPIs
  const totalCustomers = customers.length;
  const avgRecency = (
    customers.reduce((s, c) => s + c.recency, 0) / totalCustomers
  ).toFixed(1);
  const avgFrequency = (
    customers.reduce((s, c) => s + c.frequency, 0) / totalCustomers
  ).toFixed(1);
  const avgMonetary = (
    customers.reduce((s, c) => s + c.monetary, 0) / totalCustomers
  ).toFixed(2);

  // Segment distribution
  const segmentCounts = customers.reduce((acc, c) => {
    acc[c.segment] = (acc[c.segment] || 0) + 1;
    return acc;
  }, {});
  const segmentChartData = Object.entries(segmentCounts).map(
    ([name, value]) => ({
      name,
      value,
    })
  );

  // RFM Score Distributions
  const rValues = customers.map((c) => c.R);
  const fValues = customers.map((c) => c.F);
  const mValues = customers.map((c) => c.M);

  const countDistribution = (values) =>
    [1, 2, 3, 4, 5].map((score) => values.filter((v) => v === score).length);

  const barChartOption = {
    tooltip: { trigger: "axis" },
    legend: { data: ["Recency", "Frequency", "Monetary"] },
    xAxis: { type: "category", data: ["1", "2", "3", "4", "5"] },
    yAxis: { type: "value" },
    series: [
      { name: "Recency", type: "bar", data: countDistribution(rValues) },
      { name: "Frequency", type: "bar", data: countDistribution(fValues) },
      { name: "Monetary", type: "bar", data: countDistribution(mValues) },
    ],
  };

  const pieChartOption = {
    tooltip: { trigger: "item" },
    legend: { top: "bottom" },
    series: [
      {
        name: "Customer Segments",
        type: "pie",
        radius: "50%",
        data: segmentChartData,
      },
    ],
  };

  // ✅ Table columns
  const tableColumns = [
    { title: "Customer ID", dataIndex: "customerId", key: "customerId" },
    { title: "Recency (days)", dataIndex: "recency", key: "recency" },
    { title: "Frequency", dataIndex: "frequency", key: "frequency" },
    {
      title: "Monetary",
      dataIndex: "monetary",
      key: "monetary",
      render: (v) => `₹${v.toFixed(2)}`,
    },
    { title: "RFM Score", dataIndex: "RFMScore", key: "RFMScore" },
    { title: "Segment", dataIndex: "segment", key: "segment" },
  ];

  return (
    <div style={{ marginTop: "2rem" }}>
      <h2>📊 RFM Insights</h2>
      <Divider />

      {/* KPI Cards */}
      <Row gutter={16}>
        <Col span={6}>
          <Card>
            <Statistic title="Total Customers" value={totalCustomers} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="Avg Recency (days)" value={avgRecency} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="Avg Frequency" value={avgFrequency} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="Avg Monetary" value={avgMonetary} prefix="₹" />
          </Card>
        </Col>
      </Row>

      <Divider />

      {/* Customers Table */}
      <Card title="Customer RFM Details" style={{ marginBottom: "2rem" }}>
        <Table
          dataSource={customers}
          columns={tableColumns}
          rowKey="customerId"
          pagination={{ pageSize: 10 }}
        />
      </Card>

      <Divider />

      {/* Charts */}
      <Row gutter={16}>
        <Col span={12}>
          <Card title="R, F, M Distribution">
            <ReactECharts option={barChartOption} style={{ height: "400px" }} />
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Customer Segments">
            <ReactECharts option={pieChartOption} style={{ height: "400px" }} />
          </Card>
        </Col>
      </Row>
    </div>
  );
}

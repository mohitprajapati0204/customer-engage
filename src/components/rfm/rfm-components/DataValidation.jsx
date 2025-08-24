import { Card, Col, Row, Select, Table, Tag } from "antd";
import React, { useContext, useMemo, useState } from "react";
import { RFMContext } from "../rfm-context/RFMContext";

function DataValidation() {
  const {
    uploadedData,
    rfmColumns,
    setRfmColumns,
    monetaryCol,
    setMonetaryCol,
  } = useContext(RFMContext);

  const handleColumnChange = (key, value) => {
    setRfmColumns((prev) => ({ ...prev, [key]: value }));
  };

  const columnOptions = [
    { key: "customer", label: "Customer ID" },
    { key: "date", label: "Date Column" },
    { key: "invoice", label: "Invoice/Order ID" },
    { key: "amount", label: "Amount Column" },
  ];

  // 🔹 Generate dynamic columns for the uploaded data table
  const columns =
    uploadedData && uploadedData.length > 0
      ? Object.keys(uploadedData[0]).map((key) => ({
          title: key,
          dataIndex: key,
          key,
          sorter: (a, b) => {
            if (!isNaN(a[key]) && !isNaN(b[key])) {
              return Number(a[key]) - Number(b[key]);
            }
            return String(a[key] || "").localeCompare(String(b[key] || ""));
          },
        }))
      : [];

  // 🔹 Cap data to 100 rows
  const limitedData =
    uploadedData && uploadedData.length > 100
      ? uploadedData.slice(0, 100)
      : uploadedData;

  // 🔹 Validation logic (generic checks)
  const validationResults = useMemo(() => {
    if (!uploadedData || uploadedData.length === 0) return [];

    const issues = [];

    // 1. Empty values check
    const emptyCells = [];
    uploadedData.forEach((row, rowIndex) => {
      Object.entries(row).forEach(([key, value]) => {
        if (value === null || value === undefined || value === "") {
          emptyCells.push({ row: rowIndex + 1, column: key });
        }
      });
    });
    issues.push({
      rule: "Empty / Missing Values",
      status: emptyCells.length === 0 ? "Pass" : "Fail",
      details:
        emptyCells.length === 0
          ? "No missing cells"
          : `${emptyCells.length} missing values`,
    });

    // 2. Duplicate row check
    const seen = new Set();
    const duplicates = [];
    uploadedData.forEach((row, idx) => {
      const key = JSON.stringify(row);
      if (seen.has(key)) {
        duplicates.push(idx + 1);
      }
      seen.add(key);
    });
    issues.push({
      rule: "Duplicate Rows",
      status: duplicates.length === 0 ? "Pass" : "Fail",
      details:
        duplicates.length === 0
          ? "No duplicate rows"
          : `Duplicate rows at indices: ${duplicates.join(", ")}`,
    });

    // 3. Numeric column validation
    Object.keys(uploadedData[0]).forEach((col) => {
      const values = uploadedData.map((row) => row[col]);
      const numericValues = values.filter((v) => !isNaN(v) && v !== "");
      if (numericValues.length > values.length / 2) {
        // column looks numeric
        const invalids = values.filter(
          (v) => v !== "" && v !== null && isNaN(v)
        );
        issues.push({
          rule: `Numeric check: ${col}`,
          status: invalids.length === 0 ? "Pass" : "Fail",
          details:
            invalids.length === 0
              ? "All values valid numbers"
              : `${invalids.length} invalid numeric entries`,
        });
      }
    });

    // 4. Email validation (if a column name includes "email")
    const emailCol = Object.keys(uploadedData[0]).find((c) =>
      c.toLowerCase().includes("email")
    );
    if (emailCol) {
      const invalidEmails = uploadedData.filter(
        (row) =>
          row[emailCol] && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(row[emailCol])
      );
      issues.push({
        rule: "Email Format Validation",
        status: invalidEmails.length === 0 ? "Pass" : "Fail",
        details:
          invalidEmails.length === 0
            ? "All emails valid"
            : `${invalidEmails.length} invalid emails`,
      });
    }

    return issues;
  }, [uploadedData]);

  // 🔹 Ant Design table for validation summary
  const validationColumns = [
    { title: "Rule", dataIndex: "rule", key: "rule" },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) =>
        status === "Pass" ? (
          <Tag color="green">Pass</Tag>
        ) : (
          <Tag color="red">Fail</Tag>
        ),
    },
    { title: "Details", dataIndex: "details", key: "details" },
  ];

  return (
    <div style={{ padding: 16 }}>
      <Row gutter={16}>
        {/* Left side: Data Preview */}
        <Col span={12}>
          <h3>Uploaded Data</h3>
          <Table
            dataSource={limitedData}
            columns={columns}
            rowKey={(record, index) => index}
            pagination={{
              defaultPageSize: 5,
              showSizeChanger: true,
              pageSizeOptions: ["5", "10", "20", "50"],
            }}
            bordered
            scroll={{ x: "max-content" }}
          />
        </Col>

        {/* Right side: Validation */}
        <Col span={12}>
          <div>
            <h3>Validation Rules</h3>
            <Table
              dataSource={validationResults}
              columns={validationColumns}
              rowKey={(record, index) => index}
              pagination={false}
              bordered
              size="small"
            />
          </div>
          <div style={{ marginTop: "3rem" }}>
            <h3>Select Columns for RFM</h3>

            <Row gutter={[16, 16]}>
              {columnOptions.map((col) => (
                <Col span={12} key={col.key}>
                  <Select
                    style={{ width: "100%" }}
                    placeholder={`Select ${col.label}`}
                    onChange={(value) => handleColumnChange(col.key, value)}
                    value={rfmColumns[col.key]}
                  >
                    {columns.map((c) => (
                      <Select.Option key={c.key} value={c.key}>
                        {c.title}
                      </Select.Option>
                    ))}
                  </Select>
                </Col>
              ))}
            </Row>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default DataValidation;

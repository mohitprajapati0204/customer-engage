import React, { useContext } from "react";
import { Steps, Button, notification } from "antd";
import { RFMContext } from "./rfm-context/RFMContext";
import FileUploader from "./rfm-components/FileUploader";
import DataValidation from "./rfm-components/DataValidation";
import RFMInsights from "./rfm-components/RFMInsights";

const { Step } = Steps;

export default function RFMAnalyzer() {
  const { currentStep, setCurrentStep, uploadedData, rfmColumns } =
    useContext(RFMContext);

  const [api, contextHolder] = notification.useNotification();

  const steps = [
    { title: "Upload Data", description: "Import customer purchase data" },
    { title: "Data Validation", description: "Check format & missing values" },
    { title: "Insights", description: "Visualize segments & take action" },
  ];

  const next = () => {
    if (currentStep === 0 && uploadedData.length === 0) {
      api.error({
        message: "No File Uploaded",
        description: "Please upload a CSV/Excel file before proceeding.",
        placement: "topRight",
      });
      return;
    }
    if (
      currentStep === 1 &&
      (!rfmColumns.customer ||
        !rfmColumns.date ||
        !rfmColumns.invoice ||
        !rfmColumns.amount)
    ) {
      api.error({
        message: "Invalid Selection",
        description:
          "Please select Customer, Date, Invoice, and Amount columns before proceeding.",
        placement: "topRight",
      });
      return;
    }

    setCurrentStep(currentStep + 1);
  };

  const prev = () => setCurrentStep(currentStep - 1);

  return (
    <div style={{ padding: 20 }}>
      {contextHolder} {/* 👈 must render this once */}
      <h2>RFM Analyzer</h2>
      <Steps current={currentStep} style={{ marginBottom: 20 }}>
        {steps.map((item) => (
          <Step
            key={item.title}
            title={item.title}
            description={item.description}
          />
        ))}
      </Steps>
      <div
        style={{
          margin: "20px 0",
          padding: "20px",
          border: "1px solid #eee",
          borderRadius: 8,
        }}
      >
        {currentStep === 0 && <FileUploader />}
        {currentStep === 1 && <DataValidation />}
        {currentStep === 2 && <RFMInsights />}
      </div>
      <div
        style={{
          marginTop: 20,
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        {currentStep > 0 && (
          <Button style={{ margin: "0 8px" }} onClick={prev}>
            Previous
          </Button>
        )}
        {currentStep < steps.length - 1 && (
          <Button type="primary" onClick={next}>
            Next
          </Button>
        )}
        {currentStep === steps.length - 1 && (
          <Button type="primary" onClick={() => alert("Process Completed!")}>
            Done
          </Button>
        )}
      </div>
    </div>
  );
}

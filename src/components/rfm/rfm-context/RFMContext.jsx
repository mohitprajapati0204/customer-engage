import React, { createContext, useState } from "react";

// Create context
export const RFMContext = createContext();

// Create provider
export function RFMProvider({ children }) {
  const [rfmData, setRFMData] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [uploadedData, setUploadedData] = useState([]);
  const [rfmColumns, setRfmColumns] = useState({
    customer: null,
    date: null,
    invoice: null,
    amount: null,
  });

  console.log(rfmColumns);
  // console.log("uploadedData", uploadedData);

  return (
    <RFMContext.Provider
      value={{
        rfmData,
        setRFMData,
        currentStep,
        setCurrentStep,
        uploadedData,
        setUploadedData,
        rfmColumns,
        setRfmColumns,
      }}
    >
      {children}
    </RFMContext.Provider>
  );
}

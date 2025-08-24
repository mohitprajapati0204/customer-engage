import React, { createContext, useState } from "react";

// Create context
export const RFMContext = createContext();

// Create provider
export function RFMProvider({ children }) {
  const [rfmData, setRFMData] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [uploadedData, setUploadedData] = useState([]);
  const [recencyCol, setRecencyCol] = useState(null);
  const [frequencyCol, setFrequencyCol] = useState(null);
  const [monetaryCol, setMonetaryCol] = useState(null);

  console.log("uploadedData", uploadedData);

  return (
    <RFMContext.Provider
      value={{
        rfmData,
        setRFMData,
        currentStep,
        setCurrentStep,
        uploadedData,
        setUploadedData,
        recencyCol,
        setRecencyCol,
        frequencyCol,
        setFrequencyCol,
        monetaryCol,
        setMonetaryCol,
      }}
    >
      {children}
    </RFMContext.Provider>
  );
}

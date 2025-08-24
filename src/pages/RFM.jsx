import React from "react";
import RFMAnalyzer from "../components/rfm/RFMAnalyzer";
import { RFMProvider } from "../components/rfm/rfm-context/RFMContext";

function RFM() {
  return (
    <div>
      <RFMProvider>
        <RFMAnalyzer />
      </RFMProvider>
    </div>
  );
}

export default RFM;

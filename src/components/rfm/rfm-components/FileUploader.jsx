import React, { useContext } from "react";
import { Upload, message } from "antd";
import { CloudUploadOutlined } from "@ant-design/icons";
import Papa from "papaparse";
import * as XLSX from "xlsx";
import { RFMContext } from "../rfm-context/RFMContext";

const { Dragger } = Upload;

function FileUploader() {
  const { setUploadedData } = useContext(RFMContext);

  const props = {
    name: "file",
    multiple: false,
    accept: ".csv,.xlsx",
    maxCount: 1,
    beforeUpload: (file) => {
      const isValidType =
        file.type === "text/csv" ||
        file.type ===
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
      if (!isValidType) {
        message.error("You can only upload CSV/Excel files!");
        return Upload.LIST_IGNORE;
      }
      return true;
    },
    customRequest({ file, onSuccess }) {
      // CSV parsing
      if (file.type === "text/csv") {
        Papa.parse(file, {
          header: true,
          complete: (result) => {
            if (setUploadedData) {
              setUploadedData(result.data);
            }
            message.success(`${file.name} uploaded successfully`);
          },
          error: () => message.error("Error parsing CSV file"),
        });
      }

      // Excel parsing
      if (
        file.type ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      ) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const data = new Uint8Array(e.target.result);
          const workbook = XLSX.read(data, { type: "array" });
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          const jsonData = XLSX.utils.sheet_to_json(worksheet);

          if (setUploadedData) {
            setUploadedData(jsonData);
          }
          message.success(`${file.name} uploaded successfully`);
        };
        reader.onerror = () => message.error("Error reading Excel file");
        reader.readAsArrayBuffer(file);
      }

      // Required for antd Upload success status
      setTimeout(() => {
        onSuccess("ok");
      }, 0);
    },
  };

  return (
    <Dragger {...props} style={{ padding: 20 }}>
      <p className="ant-upload-drag-icon">
        <CloudUploadOutlined />
      </p>
      <p className="ant-upload-text">
        Click or drag CSV/Excel file to this area to upload
      </p>
      <p className="ant-upload-hint">
        Only .csv and .xlsx files are supported (Max 1 file).
      </p>
    </Dragger>
  );
}

export default FileUploader;

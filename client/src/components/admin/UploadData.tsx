"use client";

import { useState } from "react";
import * as XLSX from "xlsx";

export default function UploadData() {
    const [data, setData] = useState<any>([]);

    const handleFileUpload = async (e: any) => {
        const file = e.target.files[0];
        if (!file) return;

        const arrayBuffer = await file.arrayBuffer();

        const workbook = XLSX.read(arrayBuffer, { type: "array" });

        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];

        const rows = XLSX.utils.sheet_to_json(sheet, { defval: "" });

        const formattedData = rows.map((row: any) => ({
            id: row["id"] || "",
            Product_Name: row["Product_Name"] || "",
            Product_code: row["Product_Code"] || "",
            HSN: row["HSN"] || "",
            CAS: row["CAS"] || "",
            Hazardous: row["Hazardous"] || "",
            Description: row["Product_Description"] || "",
            Pack_Size: row["Pack_Size"] || "",
            Pack_Size_name: row["Pack_Size_Name"] || "",
            Product_Price: row["Product_Price"] || "",
            Quantity: row["Qty"] || "", // mapping
            GST: row["GST"] || "",
        }));

        setData(formattedData);
    };

    return (
        <>
            <div style={{ padding: "20px" }}>
                <h2>Upload Excel File</h2>

                <input type="file" accept=".xlsx" onChange={handleFileUpload} />

                <h3>Output JSON:</h3>
                <pre>{JSON.stringify(data, null, 2)}</pre>
            </div>
            
        </>
    )
}
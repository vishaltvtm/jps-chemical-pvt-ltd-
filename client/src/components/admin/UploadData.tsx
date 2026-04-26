"use client";

import { useApp } from "@/context/AppContext";
import { useState } from "react";
import * as XLSX from "xlsx";

export default function UploadData() {
    const { products, setProducts } = useApp()
    const [data, setData] = useState<any>([]);

    // validation COLUMNS
    const REQUIRED_COLUMNS = [
        "ID",
        "Product_Name",
        "Product_Code",
        "HSN",
        "CAS",
        "Hazardous",
        "Product_Description",
        "Pack_Size",
        "Pack_Size_Name",
        "Product_Price",
        "Qty",
        "GST",
    ];


    const handleFileUpload = async (e: any) => {
        const file = e.target.files[0];
        if (!file) return;

        const arrayBuffer = await file.arrayBuffer();

        const workbook = XLSX.read(arrayBuffer, { type: "array" });

        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];

        const rows: any = XLSX.utils.sheet_to_json(sheet, { defval: "" });
        const headers = rows.length > 0 ? Object.keys(rows[0]) : [];

        const missingColumns = REQUIRED_COLUMNS.filter(
            (col) => !headers.includes(col)
        );

        if (missingColumns.length > 0) {
            alert(`Missing columns: ${missingColumns.join(", ")}`);
            return;
        }

        const formattedData = rows.map((row: any) => ({
            ID: row["ID"] || Date.now().toString(),
            Product_Name: row["Product_Name"] || "",
            Product_Code: row["Product_Code"] || "",
            HSN: row["HSN"] || "",
            CAS: row["CAS"] || "",
            Hazardous: row["Hazardous"] || "",
            Product_Description: row["Product_Description"] || "",
            Pack_Size: row["Pack_Size"] || "",
            Pack_Size_Name: row["Pack_Size_Name"] || "",
            Product_Price: row["Product_Price"] || "",
            Quantity: row["Qty"] || "",
            GST: row["GST"] || "",
        }));

        setData(formattedData);
        const newData = [...products, ...formattedData];
        setProducts(newData);
    };

    return (
        <>
            <div className="flex items-center justify-center ">
                <div className="bg-white shadow-md rounded-2xl p-6 w-full max-w-lg">

                    <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                        Upload Excel File
                    </h2>

                    <input
                        type="file"
                        accept=".xlsx"
                        onChange={handleFileUpload}
                        className="block w-full text-sm text-gray-600  mr-4 py-2 px-4 rounded-lgborder-0 text-sm font-medium bg-blue-50 text-blue-700 hover:bg-blue-100 cursor-pointer mb-6"
                    />

                    {/* <h3 className="text-lg font-medium text-gray-700 mb-2">
                        Output JSON:
                    </h3>

                    <pre className="bg-gray-50 border rounded-lg p-4 text-sm overflow-auto max-h-64">
                        {JSON.stringify(data, null, 2)}
                    </pre> */}

                </div>
            </div>
        </>
    )
}
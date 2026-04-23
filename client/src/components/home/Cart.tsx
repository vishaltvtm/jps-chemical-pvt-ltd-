"use client"
import { useApp } from "@/context/AppContext"
import { useEffect } from "react";


import * as XLSX from "xlsx";
import { saveAs } from 'file-saver';





export default function Cart() {
    const { cart, setCart, removeFromCart, updateQty } = useApp()

    useEffect(() => {
        try {
            const storedProductsCart = localStorage.getItem("productsCart");
            if (storedProductsCart) {
                setCart(JSON.parse(storedProductsCart));
            }
        } catch (error) {
            console.error("Error parsing localStorage", error);
        }
    }, []);

    const total = cart.reduce((sum: number, item: any) => {
        return sum + item.price * item.qty
    }, 0)

    const igst_total = cart.reduce((sum: number, item: any) => {
        const itemTotal = item.price * item.qty
        const igst = sum + (itemTotal * item.gst) / 100
        return igst
    }, 0)

    const fullTotal = cart.reduce((sum: number, item: any) => {
        const itemTotal = item.price * item.qty
        const igst = (itemTotal * item.gst) / 100
        return sum + igst + item.price * item.qty
    }, 0)


    /// --------------------------
    const exportToExcel = () => {
        const data = cart.map((item: any) => {
            const itemTotal = item.price * item.qty;
            const igst = (itemTotal * item.gst) / 100;

            return {
                ID: item.id,
                Name: item.name,
                HSN: item.hsn,
                CAS: item.cas,
                Hazardous: item.hazardous,
                Description: item.sbu_desc,
                GST: item.gst,
                Pack_Size: item.pack_size,
                Price: item.price,
                Qty: item.qty,
                Size: item.size,
                IGST: igst,
                Total: itemTotal + igst
            };
        });

        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();

        XLSX.utils.book_append_sheet(workbook, worksheet, "Cart");

        const excelBuffer = XLSX.write(workbook, {
            bookType: "xlsx",
            type: "array",
        });

        const file = new Blob([excelBuffer], {
            type: "application/octet-stream",
        });

        saveAs(file, "cart.xlsx");
    };





    return (
        <div className="p-4 border rounded-xl mt-5">
            <h2 className="text-xl font-semibold mb-3">Cart</h2>

            {cart.length === 0 ? (
                <p className="text-gray-400">Cart is empty</p>
            ) : (
                <table className="min-w-full text-sm text-left text-gray-600">

                    {/* Header */}
                    <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
                        <tr>
                            <th className="px-4 py-3">Name</th>
                            <th className="px-4 py-3">Qty</th>
                            <th className="px-4 py-3">Price</th>
                            <th className="px-4 py-3">GST</th>
                            <th className="px-4 py-3">IGST</th>
                            <th className="px-4 py-3">Total</th>
                            <th className="px-4 py-3">Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {cart.map((item: any) => {
                            const itemTotal = item.price * item.qty
                            const igst = (itemTotal * item.gst) / 100

                            return (
                                <tr
                                    key={item.id}
                                    className="border-t hover:bg-gray-50 transition"
                                >
                                    <td className="px-2 py-3">
                                        <div className=" xl:w-[400px]">
                                            <h1 className=" font-medium text-gray-800">
                                                {item.name}
                                            </h1>
                                            <p>HSN:{item.hsn} </p>
                                            <p>CAS:{item.cas} </p>
                                            <p>
                                                Hazardous : <span
                                                    className={`px-2 py-1 text-xs rounded-full font-medium ${item.hazardous === "YES"
                                                        ? "bg-red-100 text-red-600"
                                                        : "bg-green-100 text-green-600"
                                                        }`}
                                                >
                                                    {item.hazardous}
                                                </span>
                                            </p>

                                        </div>
                                    </td>

                                    <td className="px-2 py-3">
                                        <div className="flex items-center gap-2">
                                            <button className="px-2 bg-gray-200 rounded" onClick={() => updateQty(item.id, "inc")} >+</button>
                                            {item.qty}
                                            <button className="px-2 bg-gray-200 rounded" onClick={() => updateQty(item.id, "dec")}>-</button>
                                        </div>
                                    </td>

                                    <td className="px-2 py-3">
                                        ₹ {item.price.toLocaleString()}
                                    </td>

                                    <td className="px-2 py-3">
                                        {item.gst}%
                                    </td>

                                    <td className="px-2 py-3">
                                        ₹ {igst.toFixed(2)}
                                    </td>

                                    <td className="px-2 py-3 font-semibold">
                                        ₹ {(itemTotal + igst).toFixed(2)}
                                    </td>

                                    <td className="px-2 py-3">
                                        <button
                                            onClick={() => removeFromCart(item.id)}
                                            className="text-red-500 text-sm"
                                        >
                                            Remove
                                        </button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>


                </table>
            )}

            <div>
                {/* Footer Total */}
                <div className="p-5 flex justify-center">
                    <div className="font-semibold bg-gray-100 w-[500px]">
                        <h1 className="px-5"> Quote Summary </h1>
                        <div className="flex justify-between items-center "> <p className=" px-4 py-3">
                            Sub Total :-
                        </p>
                            <p className=" px-4 py-3">
                                ₹ {total.toLocaleString()}
                            </p></div>
                        <div className="flex justify-between items-center "><p className="px-4 py-3">
                            IGST :
                        </p>
                            <p className="px-4 py-3">
                                ₹ {igst_total.toLocaleString()}
                            </p></div>
                        <div className="flex justify-between items-center "> <p className=" font-bold px-4 py-3">
                            Total :
                        </p>
                            <p className=" font-bold px-4 py-3">
                                ₹ {fullTotal.toLocaleString()}
                            </p></div>




                    </div>
                </div>

            </div>
            <div className="flex justify-center">
                <button
                    onClick={exportToExcel}
                    className="bg-green-500 text-white px-4 py-2 rounded"
                >
                    Export to Excel
                </button>
            </div>
        </div>
    )
}



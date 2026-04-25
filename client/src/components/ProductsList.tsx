"use client"
import { useApp } from "@/context/AppContext"
import log from "@/utils/ConsoleLog"
import { useEffect, useState } from "react"
import ProductForm from "./ProductForm"

export default function ProductsList() {
    const { products, setProducts, deleteProduct } = useApp()
    const [editData, setEditData] = useState<any>(null)
    useEffect(() => {
        try {
            const storedProducts = localStorage.getItem("products");
            if (storedProducts) {
                setProducts(JSON.parse(storedProducts));
            }
        } catch (error) {
            console.error("Error parsing localStorage", error);
        }
    }, []);
    useEffect(() => {
        console.log("Products from context:", products);
    }, [products]);
    return (
        <>
            <div className="pt-5">
                <div className="">
                    {editData && (
                        <ProductForm editData={editData} setEditData={setEditData} />
                    )}
                    <table className="min-w-full text-sm text-left text-gray-600">

                        {/* Header */}
                        <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
                            <tr>
                                <th className="px-4 py-3">Product Name</th>
                                <th className="px-4 py-3">SBU Desc</th>
                                <th className="px-4 py-3">Pack Size</th>
                                <th className="px-4 py-3">Price</th>
                                <th className="px-4 py-3">GST</th>
                                <th className="px-4 py-3">Quote</th>
                            </tr>
                        </thead>

                        {/* Body */}
                        <tbody>
                            {products.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="text-center py-6 text-gray-400">
                                        No products found
                                    </td>
                                </tr>
                            ) : (
                                products.map((p: any) => (
                                    <tr
                                        key={p.id}
                                        className="border-t hover:bg-gray-50 transition"
                                    >
                                        <td className="px-1 py-3 ">
                                            <div className=" xl:w-[400px]">
                                                <h1 className=" font-medium text-gray-800">
                                                    {`${p.Product_Name} ${p.Product_Code}`}
                                                </h1>
                                                <p>HSN:{p.hsn} </p>
                                                <p>CAS:{p.cas} </p>
                                                <p>
                                                    Hazardous : <span
                                                        className={`px-2 py-1 text-xs rounded-full font-medium ${p.hazardous === "YES"
                                                            ? "bg-red-100 text-red-600"
                                                            : "bg-green-100 text-green-600"
                                                            }`}
                                                    >
                                                        {p.hazardous}
                                                    </span>
                                                </p>

                                            </div>
                                        </td>


                                        <td className="px-1 py-3  xl:w-[400px]">
                                            <div><p className="">{p.sbu_desc}</p></div>
                                        </td>

                                        <td className="px-4 py-3  font-semibold text-gray-800">
                                            {p.PackSize || "-"} {p.Pack_size_name}
                                        </td>

                                        {/* Price */}
                                        <td className="px-4 py-3 font-semibold text-gray-800">
                                            ₹ {p.price.toLocaleString()}
                                        </td>

                                        {/* GST */}
                                        <td className="px-4 py-3">{p.gst}%</td>

                                        {/* Action */}
                                        <td className="px-2 py-3 flex gap-2">
                                            {/* ✅ EDIT */}
                                            <button
                                                onClick={() => setEditData(p)}
                                                className="bg-yellow-500 text-white px-3 py-1 rounded text-xs"
                                            >
                                                Edit
                                            </button>

                                            {/* DELETE */}
                                            <button
                                                onClick={() => deleteProduct(p.id)}
                                                className="bg-red-500 text-white px-3 py-1 rounded text-xs"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>)
                                ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}
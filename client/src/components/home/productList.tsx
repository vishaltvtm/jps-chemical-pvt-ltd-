"use client"
import { useApp } from "@/context/AppContext"
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import SearchProduct from "./SearchProduct";
import Fallback from "../errorBoundary";
import { ErrorBoundary } from "react-error-boundary";

export default function HomeProductList() {
    const { products, addToCart } = useApp()

    const [search, setSearch] = useState("")
    const [debouncedSearch, setDebouncedSearch] = useState(search)

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearch(search)
        }, 300) // delay in ms

        return () => {
            clearTimeout(handler)
        }
    }, [search])

    const filteredProducts = Array.isArray(products)
        ? [...products].reverse().filter((p: any) => {
            const query = debouncedSearch.toLowerCase();

            return (
                String(p?.Product_Name || "").toLowerCase().includes(query) ||
                String(p?.Product_Code || "").toLowerCase().includes(query) ||
                String(p?.HSN || "").toLowerCase().includes(query) ||
                String(p?.CAS || "").toLowerCase().includes(query)
            );
        })
        : [];

    return (
        <div>
            <div>
                <ErrorBoundary
                    FallbackComponent={Fallback}
                    onReset={() => {
                        // reset state or retry logic
                        console.log("Reset triggered");
                    }}
                >

                    <SearchProduct search={search} setSearch={setSearch} />
                </ErrorBoundary>
            </div>
        <div className="hidden md:block overflow-x-auto bg-white rounded-lg shadow">
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
                        {filteredProducts.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="text-center py-6 text-gray-400">
                                    No products found
                                </td>
                            </tr>
                        ) : (
                            filteredProducts.map((p: any) => (
                                <tr
                                    key={p.ID}
                                    className="border-t hover:bg-gray-50 transition"
                                >
                                    <td className="px-1 py-3 ">
                                        <div className=" xl:w-[400px]">
                                            <h1 className="font-medium text-gray-800">
                                                {`${p.Product_Name} ${p.Product_Code}`}
                                            </h1>
                                            <p>HSN:{p.HSN} </p>
                                            <p>CAS:{p.CAS} </p>
                                            <p>
                                                Hazardous : <span
                                                    className={`px-2 py-1 text-xs rounded-full font-medium ${p.Hazardous === "YES"
                                                        ? "bg-red-100 text-red-600"
                                                        : "bg-green-100 text-green-600"
                                                        }`}
                                                >
                                                    {p.Hazardous}
                                                </span>
                                            </p>

                                        </div>
                                    </td>


                                    <td className="px-1 py-3  xl:w-[400px]">
                                        <div><p className="">{p?.Product_Description}</p></div>
                                    </td>

                                    <td className="px-4 py-3  font-semibold text-gray-800">
                                        {p.Pack_Size || "-"} {p.Pack_Size_Name}
                                    </td>

                                    {/* Price */}
                                    <td className="px-4 py-3 font-semibold text-gray-800">
                                        ₹ {p?.Product_Price?.toLocaleString()}
                                    </td>

                                    {/* GST */}
                                    <td className="px-4 py-3">{p.GST}%</td>

                                    {/* Action */}
                                    <td className="px-2 py-3 flex gap-2">

                                        <button
                                            onClick={() => {
                                                toast.success("Product quote add successfully ✅");
                                                addToCart(p)
                                            }}
                                            className="mt-3 bg-blue-600 text-white px-3 py-1 rounded"
                                        >
                                            Add to Cart
                                        </button>
                                    </td>
                                </tr>)
                            ))
                        }
                    </tbody>

                </table>
            </div>


            <div>
                {/* Mobile Cards */}
                <div className="md:hidden space-y-3">
                    {filteredProducts.length === 0 ? (
                        <p className="text-center text-gray-400">No products found</p>
                    ) : (
                        filteredProducts.map((p: any) => (
                            <div key={p.ID} className="bg-white p-4 rounded-lg shadow space-y-2">

                                <div className="flex justify-between items-start">
                                    <h2 className="font-semibold text-gray-800 text-sm">
                                        {p.Product_Name}
                                    </h2>
                                    <span
                                        className={`px-2 py-0.5 text-xs rounded-full ${p.Hazardous === "YES"
                                            ? "bg-red-100 text-red-600"
                                            : "bg-green-100 text-green-600"
                                            }`}
                                    >
                                        {p.Hazardous}
                                    </span>
                                </div>

                                <p className="text-xs text-gray-500">
                                    Code: {p.Product_Code}
                                </p>

                                <p className="text-sm text-gray-600">
                                    {p.Product_Description}
                                </p>

                                <div className="flex justify-between text-sm">
                                    <span>Pack: {p.Pack_Size} {p.Pack_Size_Name}</span>
                                    <span className="font-semibold">
                                        ₹ {p.Product_Price?.toLocaleString()}
                                    </span>
                                </div>

                                <div className="flex justify-between items-center">
                                    <span className="text-xs text-gray-500">GST: {p.GST}%</span>

                                    <div className="">
                                        <button
                                            onClick={() => {
                                                toast.success("Product quote add successfully ✅");
                                                addToCart(p)
                                            }}
                                            className="mt-3 bg-blue-600 text-white px-3 py-1 rounded"
                                        >
                                            Add to Cart
                                        </button>
                                    </div>
                                </div>

                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    )
}


// <tbody>
//     {products.length === 0 ? (
//         <tr>
//             <td colSpan={6} className="text-center py-6 text-gray-400">
//                 No products found
//             </td>
//         </tr>
//     ) : (
//         products.map((p: any) => (
//             <tr
//                 key={p.id}
//                 className="border-t hover:bg-gray-50 transition"
//             >
//                 <td className="px-1 py-3 ">
//                     <div className=" xl:w-[400px]">
//                         <h1 className="font-medium text-gray-800">
//                             {`${p.Product_Name} ${p.Product_Code}`}
//                         </h1>
//                         <p>HSN:{p.hsn} </p>
//                         <p>CAS:{p.cas} </p>
//                         <p>
//                             Hazardous : <span
//                                 className={`px-2 py-1 text-xs rounded-full font-medium ${p.hazardous === "YES"
//                                     ? "bg-red-100 text-red-600"
//                                     : "bg-green-100 text-green-600"
//                                     }`}
//                             >
//                                 {p.hazardous}
//                             </span>
//                         </p>

//                     </div>
//                 </td>


//                 <td className="px-1 py-3  xl:w-[400px]">
//                     <div><p className="">{p.sbu_desc}</p></div>
//                 </td>

//                 <td className="px-4 py-3  font-semibold text-gray-800">
//                     {p.PackSize || "-"} {p.Pack_size_name}
//                 </td>

//                 {/* Price */}
//                 <td className="px-4 py-3 font-semibold text-gray-800">
//                     ₹ {p.price.toLocaleString()}
//                 </td>

//                 {/* GST */}
//                 <td className="px-4 py-3">{p.gst}%</td>

//                 {/* Action */}
//                 <td className="px-2 py-3 flex gap-2">

//                     <button
//                         onClick={() => {
//                             toast.success("Product quote add successfully ✅");
//                             addToCart(p)
//                         }}
//                         className="mt-3 bg-blue-600 text-white px-3 py-1 rounded"
//                     >
//                         Add to Cart
//                     </button>
//                 </td>
//             </tr>)
//         ))
//     }
// </tbody>
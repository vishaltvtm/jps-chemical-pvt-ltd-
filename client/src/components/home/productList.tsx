"use client"
import { useApp } from "@/context/AppContext"
import toast from "react-hot-toast";

export default function HomeProductList() {
    const { products, addToCart } = useApp()

    return (
        <div>
            <table className="min-w-full text-sm text-left text-gray-600">

                {/* Header */}
                <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
                    <tr>
                        <th className="px-4 py-3">Name</th>
                        <th className="px-4 py-3">SBU Desc</th>
                        <th className="px-4 py-3">Pack</th>
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
                                            {p.name}
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
                                    {p.size || "-"} {p.pack_size}
                                </td>

                                {/* Price */}
                                <td className="px-4 py-3 font-semibold text-gray-800">
                                    ₹ {p.price.toLocaleString()}
                                </td>

                                {/* GST */}
                                <td className="px-4 py-3">{p.gst}%</td>

                                {/* Action */}
                                <td className="px-2 py-3 flex gap-2">

                                    <button
                                        onClick={() =>{ 
                                             toast.success("Product quote add successfully ✅");
                                            addToCart(p)}}
                                        className="mt-3 bg-blue-600 text-white px-3 py-1 rounded"
                                    >
                                        Add to Cart
                                    </button>
                                </td>
                            </tr>)
                        ))}
                </tbody>
            </table>
        </div>
    )
}



    "use client"
    import { useApp } from "@/context/AppContext"
    import { useEffect, useState } from "react"
    import toast from "react-hot-toast"

    export default function ProductForm({ editData, setEditData }: any) {
        const { addProduct, editProduct } = useApp()

        const [Product_Name, setProduct_Name] = useState("")
        const [Product_Code, setProduct_Code] = useState("")
        const [hsn, setHsn] = useState("")
        const [cas, setCas] = useState("")
        const [hazardous, setHazardous] = useState("NO")
        const [sbu_desc, setSbu_desc] = useState("")
        const [PackSize, setPackSize] = useState("")
        const [Pack_size_name, setPack_size_name] = useState("pc")
        const [price, setPrice] = useState<number>(0)
        const [gst, setGst] = useState(18)

useEffect(() => {
    if (editData) {
        setProduct_Name(editData.Product_Name || "")
        setProduct_Code(editData.Product_Code || "")
        setHsn(editData.HSN || "")
        setCas(editData.CAS || "")
        setHazardous(editData.Hazardous || "NO")
        setSbu_desc(editData.Product_Description || "")
        setPackSize(editData.Pack_Size?.toString() || "")
        setPack_size_name(editData.Pack_Size_Name || "pc")
        setPrice(editData.Product_Price ?? 0)
        setGst(editData.GST ?? 18)
    }
}, [editData])



        const handleSubmit = (e: any) => {
            e.preventDefault()

            const product = {
                ID: editData ? editData.ID : Date.now().toString(),
                Product_Name,
                Product_Code,
                HSN:hsn,
                CAS:cas,
                Hazardous:hazardous,
                Product_Description:sbu_desc,
                Pack_Size: parseFloat(PackSize) || 0,
                Pack_Size_Name:Pack_size_name,
                Product_Price:price,
                GST:gst
            }

            if (editData) {
                editProduct(product)
                toast.success("Product updated successfully ✅")
                setEditData(null)
            } else {
                addProduct(product)
                toast.success("Product added successfully 🎉")
            }

            // reset form
            setProduct_Name("")
            setProduct_Code("")
            setHsn("")
            setCas("")
            setHazardous("NO")
            setSbu_desc("")
            setPackSize("")
            setPack_size_name("pc")
            setPrice(0)
            setGst(18)
        }
        return (
            <form
                onSubmit={handleSubmit}
                className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-2xl space-y-4"
            >
                <h2 className="text-xl font-semibold text-gray-700">
                    {editData ? "Edit Product" : "Add Product"}
                </h2>

                {/* Product Name */}
                <div>
                    <label className="block text-sm font-medium text-gray-600">
                        Product Name
                    </label>
                    <textarea
                        className="mt-1 w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-400 outline-none"
                        value={Product_Name || ""}
                        onChange={(e) => setProduct_Name(e.target.value)}
                    />
                    <div>
                        <label className="block text-sm font-medium text-gray-600">
                            Product Code
                        </label>
                        <input
                            className="mt-1 w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-400"
                            value={Product_Code || ""}
                            onChange={(e) => setProduct_Code(e.target.value)}
                        />
                    </div>
                </div>


                {/* Grid Section */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-600">
                            HSN Code
                        </label>
                        <input
                            className="mt-1 w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-400"
                            value={hsn || ""}
                            onChange={(e) => setHsn(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-600">
                            CAS Number
                        </label>
                        <input
                            className="mt-1 w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-400"
                            value={cas || ""}
                            onChange={(e) => setCas(e.target.value)}
                        />
                    </div>
                </div>

                {/* Hazardous */}
                <div>
                    <label className="block text-sm font-medium text-gray-600">
                        Hazardous
                    </label>

                    <div className="flex gap-4">
                        <label className="flex items-center gap-2">
                            <input
                                type="radio"
                                value="YES"
                                checked={hazardous === "YES"}
                                onChange={(e) => setHazardous(e.target.value)}
                            />
                            YES
                        </label>

                        <label className="flex items-center gap-2">
                            <input
                                type="radio"
                                value="NO"
                                checked={hazardous === "NO"}
                                onChange={(e) => setHazardous(e.target.value)}
                            />
                            NO
                        </label>
                    </div>
                </div>

                {/* Description */}
                <div>
                    <label className="block text-sm font-medium text-gray-600">
                        SBU Description
                    </label>
                    <textarea
                        className="mt-1 w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-400"
                        value={sbu_desc || ""}
                        onChange={(e) => setSbu_desc(e.target.value)}
                    />
                </div>

                {/* Pack Size + Price */}
                <div className="grid grid-cols-1 gap-4">
                    <div >
                        <label className="block text-sm font-medium text-gray-600">
                            Pack Size
                        </label>
                        <div className="flex gap-2">
                            <input
                                className="mt-1 w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-400"
                                value={PackSize || ""}
                                placeholder="0"
                                onChange={(e) => {
                                    const value = e.target.value
                                    if (/^\d*\.?\d{0,5}$/.test(value)) {
                                        setPackSize(value)
                                    }
                                }}
                            />
                            <select
                                className="mt-1 w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-400"
                                value={Pack_size_name }
                                onChange={(e) => setPack_size_name(e.target.value)}
                            >
                                <option value="pc">Piece (pc)</option>
                                <option value="nos">Numbers (nos)</option>
                                <option value="roll">Roll</option>
                                <option value="pkt">Packet (pkt)</option>
                                <option value="kg">Kilogram (kg)</option>
                                <option value="gm">Gram (gm)</option>
                                <option value="ml">Millilitre (ml)</option>
                                <option value="ltr">Litre (ltr)</option>
                            </select>
                        </div>

                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-600">
                            Price (₹)
                        </label>
                        <input
                            placeholder="0"
                            className="mt-1 w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-400"
                            value={price || ""}
                            onChange={(e) => setPrice(+e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-600">
                            GST (%)
                        </label>
                        <input
                            type="number"
                            className="mt-1 w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-400"
                            value={gst}
                            onChange={(e) => setGst(+e.target.value)}
                        />
                    </div>
                </div>

                {/* Button */}
                <button
                    type="submit"
                    className={`w-full text-white py-2 rounded-lg ${editData
                        ? "bg-yellow-500 hover:bg-yellow-600"
                        : "bg-blue-600 hover:bg-blue-700"
                        }`}
                >
                    {editData ? "Update Product" : "Add Product"}
                </button>
            </form>
        )
    }
"use client"
import { useApp } from "@/context/AppContext"
import log from "@/utils/ConsoleLog"
import { useEffect, useState } from "react"
import ProductForm from "./ProductForm"
import SearchProduct from "../home/SearchProduct"
import Fallback from "../errorBoundary"
import { ErrorBoundary } from "react-error-boundary"

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
    <>
      <div className="p-4 space-y-4">

        {/* Search */}
        <ErrorBoundary
          FallbackComponent={Fallback}
          onReset={() => {
            // reset state or retry logic
            console.log("Reset triggered");
          }}
        >

          <SearchProduct search={search} setSearch={setSearch} />
        </ErrorBoundary>

        {/* Edit Form */}
        {editData && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">

            {/* Overlay click closes modal */}
            <div
              className="absolute inset-0 bg-white/30 backdrop-blur-sm  h-screen"
              onClick={() => setEditData(null)}
            ></div>

            {/* Modal content */}
            <div
              className="relative z-60 bg-white rounded-lg shadow  "
              onClick={(e) => e.stopPropagation()}
            >
              <ErrorBoundary
                FallbackComponent={Fallback}
                onReset={() => {
                  console.log("Reset triggered");
                }}
              >
                <ProductForm
                  editData={editData}
                  setEditData={setEditData}
                />
              </ErrorBoundary>
            </div>

          </div>
        )}
        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto bg-white rounded-lg shadow">
          <table className="min-w-full text-sm text-gray-600">
            <thead className="bg-gray-100 text-xs uppercase text-gray-700">
              <tr>
                <th className="px-4 py-3 text-left">Product</th>
                <th className="px-4 py-3 text-left">Description</th>
                <th className="px-4 py-3">Pack</th>
                <th className="px-4 py-3">Price</th>
                <th className="px-4 py-3">GST</th>
                <th className="px-4 py-3 text-center">Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-6 text-gray-400">
                    No products found
                  </td>
                </tr>
              ) : (
                filteredProducts.map((p: any) => (
                  <tr key={p.ID} className="border-t hover:bg-gray-50">

                    <td className="px-4 py-3">
                      <p className="font-medium text-gray-800">
                        {p.Product_Name}  {p.Product_Code}
                      </p>
                      <p className="text-xs text-gray-500">
                        HSN: {p.HSN} | CAS: {p.CAS}
                      </p>
                      <span
                        className={`inline-block mt-1 px-2 py-0.5 text-xs rounded-full ${p.Hazardous === "YES"
                          ? "bg-red-100 text-red-600"
                          : "bg-green-100 text-green-600"
                          }`}
                      >
                        {p.Hazardous}
                      </span>
                    </td>

                    <td className="px-4 py-3">{p.Product_Description}</td>

                    <td className="px-4 py-3 text-center">
                      {p.Pack_Size || "-"} {p.Pack_Size_Name}
                    </td>

                    <td className="px-4 py-3 text-center font-semibold">
                      ₹ {p.Product_Price?.toLocaleString()}
                    </td>

                    <td className="px-4 py-3 text-center">{p.GST}%</td>

                    <td className="px-4 py-3 flex justify-center gap-2">
                      <button
                        onClick={() => setEditData(p)}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-xs"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => deleteProduct(p.ID)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs"
                      >
                        Delete
                      </button>
                    </td>

                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

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

                  <div className="flex gap-2">
                    <button
                      onClick={() => setEditData(p)}
                      className="bg-yellow-500 text-white px-2 py-1 rounded text-xs"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => deleteProduct(p.ID)}
                      className="bg-red-500 text-white px-2 py-1 rounded text-xs"
                    >
                      Delete
                    </button>
                  </div>
                </div>

              </div>
            ))
          )}
        </div>

      </div>
    </>
  )
}
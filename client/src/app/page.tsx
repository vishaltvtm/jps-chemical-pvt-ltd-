"use client"

type Product = {
  id: string
  name: string
  quantity: number
  price: number
  gst: number
  igst: number
  total: number
}

const calculateTotal = (
  quantity: number,
  price: number,
  gst: number
) => {
  const base = quantity * price
  const igst = (base * gst) / 100
  const total = base + igst

  return { igst, total }
}
import Cart from "@/components/home/Cart"
import HomeProductList from "@/components/home/productList"
import { useState } from "react"

export default function Home() {


  return (
    <div className="p-5">

      <div className=" max-w-9xl  p-6 lg:px-8">
        <HomeProductList />

      </div>

    </div>
  )
}
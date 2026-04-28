"use client"


import Fallback from "@/components/errorBoundary"
import Header from "@/components/Header"
import HomeProductList from "@/components/home/productList"
import { ErrorBoundary } from "react-error-boundary"

export default function Home() {


  return (
    <div className="">

      <ErrorBoundary
        FallbackComponent={Fallback}
        onReset={() => {
          // reset state or retry logic
          console.log("Reset triggered");
        }}
      >
        <Header />
      </ErrorBoundary>
      <div className="p-5">

        <div className=" max-w-9xl  p-6 lg:px-8">
          <ErrorBoundary
            FallbackComponent={Fallback}
            onReset={() => {
              // reset state or retry logic
              console.log("Reset triggered");
            }}
          > <HomeProductList />

          </ErrorBoundary>

        </div>
      </div>
    </div>
  )
}
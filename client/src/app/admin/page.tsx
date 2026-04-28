"use client"
import UploadData from "@/components/admin/UploadData";
import ProductsList from "@/components/admin/ProductsList";
import Fallback from "@/components/errorBoundary";
import { ErrorBoundary } from "react-error-boundary";

export default function admin() {
    return (<section className=" max-w-9xl  p-6 lg:px-8 ">
        <div className="py-2">
              <ErrorBoundary
                      FallbackComponent={Fallback}
                      onReset={() => {
                        // reset state or retry logic
                        console.log("Reset triggered");
                      }}
                    > 
             <UploadData />
                    </ErrorBoundary>
               
            </div>
        <h1 className="text-center">
            JPS chemical PVT LTD ADMIN Panel
        </h1>

        <div>
              <ErrorBoundary
                      FallbackComponent={Fallback}
                      onReset={() => {
                        // reset state or retry logic
                        console.log("Reset triggered");
                      }}
                    >
             <ProductsList />
                    </ErrorBoundary>
           
        </div>
    </section>)
}
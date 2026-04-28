"use client"
import ProductForm from "@/components/admin/ProductForm";
import { ErrorBoundary } from "react-error-boundary";
import Fallback from "@/components/errorBoundary";

export default function Product() {

    return (
        <section>
            
            <div className="py-5">
                <h1 className="text-center">Chemical Product Form</h1>
                  <ErrorBoundary
                          FallbackComponent={Fallback}
                          onReset={() => {
                            // reset state or retry logic
                            console.log("Reset triggered");
                          }}
                        > 
                <ProductForm />
                        </ErrorBoundary>
                
            </div>
        </section>
    )
}
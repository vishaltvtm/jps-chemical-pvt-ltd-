"use client"
import Fallback from "@/components/errorBoundary";
import Cart from "@/components/home/Cart";
import { ErrorBoundary } from "react-error-boundary";


export default function Quote_request() {
    return(
        <div className="p-5">
              <ErrorBoundary
                      FallbackComponent={Fallback}
                      onReset={() => {
                        // reset state or retry logic
                        console.log("Reset triggered");
                      }}
                    > 
             <Cart />
                    </ErrorBoundary>
        
        </div>
    )
}
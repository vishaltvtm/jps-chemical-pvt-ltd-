"use client"
import Fallback from "@/components/errorBoundary";
import Header from "@/components/Header";
import { ErrorBoundary } from "react-error-boundary";
export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
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
        {children}
      </div>
    </>
  );
}


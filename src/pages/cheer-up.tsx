// src/pages/cheer-up.tsx
import React, { useState } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
// If you already have a LoadingSpinner component, you can import and use it instead of the inline spinner below.
// import { LoadingSpinner } from "@/components/loading-spinner";

const CheerUp: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    // full-height flex column
    <div className="flex flex-col min-h-screen bg-white">
      {/* Top navbar */}
      <Navbar />

      {/* Main: iframe takes all remaining height */}
      <main className="flex-1 relative">
        {/* Loading overlay */}
        {isLoading && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-white">
            {/* Replace this div with <LoadingSpinner /> if you prefer */}
            <div className="flex flex-col items-center">
              <div className="h-10 w-10 border-4 border-purple-400 border-t-transparent rounded-full animate-spin" />
              <p className="mt-3 text-sm font-semibold text-gray-600">
                Loading Cheer Up App...
              </p>
            </div>
          </div>
        )}

        <div className="w-full h-[calc(100vh-160px)]">
          {/* Adjust 160px if your navbar+footer are taller/shorter */}
          <iframe
            src="https://cheer-up-gray.vercel.app/"
            title="Cheer Up App"
            className="w-full h-full border-0"
            onLoad={() => setIsLoading(false)}
          />
        </div>
      </main>

      {/* Bottom footer */}
      <Footer />
    </div>
  );
};

export default CheerUp;

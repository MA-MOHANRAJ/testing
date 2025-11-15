// src/pages/code-editor.tsx
import React, { useState } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

const MockTest: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />

      <main className="flex-1 relative">
        {/* Loading overlay */}
        {isLoading && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-white">
            <div className="flex flex-col items-center">
              <div className="h-10 w-10 border-4 border-purple-400 border-t-transparent rounded-full animate-spin" />
              <p className="mt-3 text-sm font-semibold text-gray-600">
                Loading Mock Test...
              </p>
            </div>
          </div>
        )}

        <iframe
          src="https://mock-test-sand.vercel.app/"
          title="Quiz Generator"
          className="w-full h-[calc(100vh-160px)] border-0"
          onLoad={() => setIsLoading(false)}
        />
      </main>

      <Footer />
    </div>
  );
};

export default MockTest;

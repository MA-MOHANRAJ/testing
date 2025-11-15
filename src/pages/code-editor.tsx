// src/pages/code-editor.tsx
import React, { useState } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
// If you have a shared LoadingSpinner, you can import and use it here instead of the inline spinner.
// import { LoadingSpinner } from "@/components/loading-spinner";

const CodeEditorPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />

      <main className="flex-1 relative">
        {/* Loading overlay */}
        {isLoading && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-white">
            {/* Replace with <LoadingSpinner /> if you prefer */}
            <div className="flex flex-col items-center">
              <div className="h-10 w-10 border-4 border-purple-400 border-t-transparent rounded-full animate-spin" />
              <p className="mt-3 text-sm font-semibold text-gray-600">
                Loading Code Studio...
              </p>
            </div>
          </div>
        )}

        <iframe
          src="https://edugen-code-companion-572959939599.us-west1.run.app/"
          title="Code Studio"
          className="w-full h-[calc(100vh-160px)] border-0"
          onLoad={() => setIsLoading(false)}
        />
      </main>

      <Footer />
    </div>
  );
};

export default CodeEditorPage;

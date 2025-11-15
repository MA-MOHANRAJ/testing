// src/pages/video-generator.tsx
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import React from "react";

const VideoGenerator: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />

      <main className="flex-1">
        <iframe
          src="https://video-image-text-generation-production.up.railway.app/ "
          title="Video Generator App"
          className="w-full h-[calc(100vh-160px)] border-0"
        />
      </main>

      <Footer />
    </div>
  );
};

export default VideoGenerator;

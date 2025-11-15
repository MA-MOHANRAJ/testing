// src/pages/video-generator.tsx
import React from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

const VideoGenerator: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />

      <main className="flex-1">
        <iframe
          src="https://ai-content-studio-572959939599.us-west1.run.app"
          title="Video Generator App"
          className="w-full h-[calc(100vh-160px)] border-0"
        />
      </main>

      <Footer />
    </div>
  );
};

export default VideoGenerator;

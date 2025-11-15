// src/pages/pdf-summary.tsx
import React, { useState } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Home, ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

type Slide =
  | {
      id: string;
      type: "video";
      src: string;
      title: string;
    }
  | {
      id: string;
      type: "image";
      src: string;
      alt: string;
    };

// 🔁 Slides: 1 Drive video + images from public/
const slides: Slide[] = [
  {
    id: "video-1",
    type: "video",
    title: "Avatar PDF Explainer Demo",
    src: "https://drive.google.com/file/d/1Tankn5eu9pZUaKnvTqYGHlPzTShz8JUs/preview",
  },
  {
    id: "img-1",
    type: "image",
    src: "/Architecute.jpeg",
    alt: "Architecture overview",
  },
  {
    id: "img-2",
    type: "image",
    src: "/Tech_stack.jpeg",
    alt: "Tech stack diagram",
  },
  {
    id: "img-3",
    type: "image",
    src: "/UI_FLOW.jpeg",
    alt: "UI flow",
  },
  {
    id: "img-4",
    type: "image",
    src: "/End_Point.jpeg",
    alt: "API endpoints",
  },
  {
    id: "img-5",
    type: "image",
    src: "/Output_Interface.jpeg",
    alt: "Output interface",
  },
];

const PdfSummary: React.FC = () => {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);

  const prevSlide = () => {
    setCurrent((c) => (c === 0 ? slides.length - 1 : c - 1));
  };

  const nextSlide = () => {
    setCurrent((c) => (c === slides.length - 1 ? 0 : c + 1));
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50">
      <Navbar />

      <main className="flex-1">
        <div className="container mx-auto px-2 py-10 max-w-7xl">
          {/* Back button */}
          <Button
            variant="ghost"
            onClick={() => navigate("/dashboard")}
            className="mb-6 flex items-center text-gray-700 hover:bg-white/60 rounded-2xl font-semibold"
          >
            <Home className="h-5 w-5 mr-2" />
            Back to EduGen Dashboard
          </Button>

          <div className="space-y-8">
            {/* SECTION 1: Intro / title */}
            <section className="bg-white rounded-[2.5rem] p-6 md:p-8 shadow-2xl border-4 border-teal-200">
              <div className="text-center">
                <h1 className="text-2xl md:text-3xl font-black text-gray-800">
                  Avatar-Based PDF Summarizer & Explainer
                </h1>
                <p className="text-gray-600 mt-3 max-w-3xl mx-auto">
                  An avatar-driven learning module that turns long PDFs into
                  friendly explanations. Students can upload notes and get
                  chapter-wise summaries, key points, and story-style
                  explanations from an AI avatar.
                </p>
              </div>
            </section>

            {/* SECTION 2: Two-column – slider left, deployment details right */}
            <section className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
              {/* LEFT: video + images slider */}
              <div className="lg:col-span-3">
                <div className="bg-white rounded-3xl p-5 md:p-6 shadow-2xl border-2 border-teal-200">
                  <div className="mb-4 text-center md:text-left">
                    <h2 className="text-xl md:text-2xl font-black text-gray-800">
                      Avatar Demo & Screens
                    </h2>
                    <p className="text-gray-600 mt-2 text-sm md:text-base">
                      First slide is a demo video of our avatar-based PDF
                      explainer used by a friend(For Testing Purpose). Slide to explore the
                      architecture, tech stack, UI flow, API endpoints, and
                      output interface for this module.
                    </p>
                  </div>

                  <div className="relative w-full rounded-2xl overflow-hidden bg-black shadow-lg">
                    <div className="relative w-full aspect-video">
                      {slides.map((slide, index) => (
                        <div
                          key={slide.id}
                          className={`absolute inset-0 transition-opacity duration-500 ${
                            index === current
                              ? "opacity-100"
                              : "opacity-0 pointer-events-none"
                          }`}
                        >
                          {slide.type === "video" ? (
                            <iframe
                              src={slide.src}
                              title={slide.title}
                              className="w-full h-full border-0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                            />
                          ) : (
                            <img
                              src={slide.src}
                              alt={slide.alt}
                              className="w-full h-full object-cover"
                            />
                          )}
                        </div>
                      ))}
                    </div>

                    {/* Left arrow */}
                    <button
                      type="button"
                      onClick={prevSlide}
                      className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full p-2"
                    >
                      <ChevronLeft className="h-6 w-6" />
                    </button>

                    {/* Right arrow */}
                    <button
                      type="button"
                      onClick={nextSlide}
                      className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full p-2"
                    >
                      <ChevronRight className="h-6 w-6" />
                    </button>

                    {/* Dots */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                      {slides.map((_, index) => (
                        <button
                          key={index}
                          type="button"
                          onClick={() => setCurrent(index)}
                          className={`h-2.5 w-2.5 rounded-full transition-colors ${
                            index === current ? "bg-white" : "bg-white/50"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* RIGHT: deployment status + short description */}
              <div className="lg:col-span-2 space-y-6">
                <section className="bg-white border-2 border-teal-200 rounded-2xl p-5 shadow-md">
                  <h3 className="text-xl font-black text-gray-800 mb-3">
                    Deployment Status
                  </h3>
                  <p className="text-gray-700 mb-3 text-sm md:text-base">
                    This avatar-based learning module has a multi-step pipeline
                    and requires high RAM and heavy computation for real-time
                    avatar generation and retrieval. Because of this, the full
                    experience is not deployed end-to-end right now.
                  </p>
                  <p className="text-gray-700 text-sm md:text-base">
                    Currently, only the core data layer is live: PDFs are
                    converted into semantic chunks and stored in a Pinecone
                    vector database. The avatar rendering and conversational
                    layers are implemented but not fully hosted due to compute
                    limits.
                  </p>
                </section>

                <section className="bg-teal-50 border-2 border-teal-200 rounded-2xl p-5 shadow-md">
                  <h4 className="text-lg font-bold text-gray-800 mb-2">
                    Testable API Endpoints
                  </h4>
                  <ul className="list-disc list-inside text-gray-700 space-y-2 text-sm md:text-base">
                    <li>
                      <span className="font-semibold">
                        1. Upload & Chunk PDF:
                      </span>{" "}
                      <a
                        href="https://medical-api-k7nh.onrender.com/docs"
                        target="_blank"
                        rel="noreferrer"
                        className="text-teal-600 underline"
                      >
                        https://medical-api-k7nh.onrender.com/docs
                      </a>{" "}
                      – Upload a PDF here; it will be divided into chunks and
                      stored in Pinecone. You will receive an ID in the response
                      with a SUCCESS status representing that PDF session.
                    </li>
                    <li>
                      <span className="font-semibold">2. Health Check:</span>{" "}
                      <a
                        href="https://medical-api-k7nh.onrender.com/health"
                        target="_blank"
                        rel="noreferrer"
                        className="text-teal-600 underline"
                      >
                        https://medical-api-k7nh.onrender.com/health
                      </a>{" "}
                      – Quick health check endpoint to verify that the API is
                      running.
                    </li>
                  </ul>
                </section>
              </div>
            </section>

            {/* SECTION 3: Coming soon banner */}
            <section className="bg-teal-50 border-2 border-teal-200 rounded-2xl p-6 text-center shadow-md">
              <p className="text-gray-700 text-lg font-semibold mb-4">
                Full avatar experience coming soon!
              </p>
              <p className="text-gray-600 mb-4 max-w-3xl mx-auto">
                Once higher-compute infrastructure is available, we will deploy
                the remaining stages—avatar generation, conversational
                explanations, and interactive learning flows—so students can
                learn any PDF entirely through an AI avatar.
              </p>
              <Button className="bg-teal-500 hover:bg-teal-600 text-white rounded-2xl px-8 py-3 font-bold text-lg">
                Notify Me When Ready ✨
              </Button>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PdfSummary;

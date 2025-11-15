// src/pages/language-learning.tsx
import React from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Mic, Globe2, Sparkles, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";

const LanguageLearning: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-sky-50 to-indigo-50">
      <Navbar />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-10 max-w-4xl">
          <Button
            variant="ghost"
            onClick={() => navigate("/dashboard")}
            className="mb-6 flex items-center text-gray-700 hover:bg-white/60 rounded-2xl font-semibold"
          >
            <Home className="h-5 w-5 mr-2" />
            Back to EduGen Dashboard
          </Button>

          <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-2xl border-4 border-blue-200">
            <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
              <div className="flex flex-col items-center md:items-start">
                <div className="text-6xl mb-4">
                  <Mic className="h-14 w-14 text-blue-500" />
                </div>
                <h1 className="text-3xl md:text-4xl font-black text-gray-800 mb-3">
                  Language Fun 🌍
                </h1>
                <p className="text-lg text-gray-700 font-medium max-w-md">
                  Practice speaking and understanding new languages by
                  chatting with friendly AI characters that correct and
                  guide you.
                </p>
              </div>

              <div className="space-y-4 w-full">
                <div className="bg-gradient-to-r from-sky-400 to-blue-500 text-white rounded-2xl p-4 flex items-center shadow-lg">
                  <Globe2 className="h-7 w-7 mr-3" />
                  <span className="font-semibold">
                    Talk with AI in different languages.
                  </span>
                </div>
                <div className="bg-gradient-to-r from-indigo-400 to-purple-500 text-white rounded-2xl p-4 flex items-center shadow-lg">
                  <Sparkles className="h-7 w-7 mr-3" />
                  <span className="font-semibold">
                    Get corrections and tips in real time.
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-8 bg-blue-50 border-2 border-blue-200 rounded-2xl p-6 text-center">
              <p className="text-gray-700 text-lg font-semibold mb-4">
                This language module is coming soon!
              </p>
              <p className="text-gray-600 mb-4">
                Soon you will be able to choose a language, pick a
                character, and start speaking practice directly inside
                EduGen.
              </p>
              <Button className="bg-blue-500 hover:bg-blue-600 text-white rounded-2xl px-8 py-3 font-bold text-lg">
                Notify Me When Ready 🎧
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default LanguageLearning;

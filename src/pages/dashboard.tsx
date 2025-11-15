import { useUser } from "@clerk/clerk-react";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { LoadingSpinner } from "@/components/loading-spinner";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Code,
  BookOpen,
  FileText,
  Map,
  Video,
  Home,
  AlertCircle,
  ChevronLeft,
  Search,
  User,
  Lightbulb,
  Heart,
  Sparkles,
  ExternalLink,
  Zap,
  Star,
  Trophy,
  Calculator,
} from "lucide-react";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const customStyles = `
  @keyframes fadeInUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes slideInRight { from { opacity: 0; transform: translateX(20px); } to { opacity: 1; transform: translateX(0); } }
  @keyframes slideInLeft { from { opacity: 0; transform: translateX(-20px); } to { opacity: 1; transform: translateX(0); } }
  @keyframes pulseGlow { 0%, 100% { box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.4); } 50% { box-shadow: 0 0 0 20px rgba(59, 130, 246, 0); } }
  @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
  @keyframes bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-5px); } }
  @keyframes wiggle { 0%, 100% { transform: rotate(0deg); } 25% { transform: rotate(-5deg); } 75% { transform: rotate(5deg); } }
  .animate-fadeInUp { animation: fadeInUp 0.8s ease-out forwards; }
  .animate-slideInRight { animation: slideInRight 0.6s ease-out forwards; }
  .animate-slideInLeft { animation: slideInLeft 0.6s ease-out forwards; }
  .animate-float { animation: float 3s ease-in-out infinite; }
  .animate-bounce-slow { animation: bounce 2s ease-in-out infinite; }
  .pulse-glow { animation: pulseGlow 2s infinite; }
  .animation-delay-100 { animation-delay: 0.1s; }
  .animation-delay-200 { animation-delay: 0.2s; }
  .animation-delay-300 { animation-delay: 0.3s; }
  .animation-delay-400 { animation-delay: 0.4s; }
  .animation-delay-500 { animation-delay: 0.5s; }
  .animation-delay-600 { animation-delay: 0.6s; }
  .animation-delay-700 { animation-delay: 0.7s; }
  .animation-delay-800 { animation-delay: 0.8s; }
  .animation-delay-900 { animation-delay: 0.9s; }
  .gradient-text { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
`;

if (typeof document !== "undefined") {
  const styleElement = document.createElement("style");
  styleElement.textContent = customStyles;
  document.head.appendChild(styleElement);
}

interface Feature {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  buttonText: string;
  color: string;
  emoji: string;
  url?: string;
  isExternal?: boolean;
}

export default function Dashboard() {
  const { user, isLoaded: isUserLoaded } = useUser();
  const navigate = useNavigate();
  const [activeFeature, setActiveFeature] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentScreenshotIndex, setCurrentScreenshotIndex] = useState(0);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const userData = useQuery(
    api.users.getUserByToken,
    user?.id ? { tokenIdentifier: user.id } : "skip"
  );

  // Screenshot carousel data
  const screenshots = [
    {
      id: "cheer-up",
      title: "Cheer Up! 🌈",
      description: "Feel better with fun activities and motivation",
      emoji: "🎉",
      color: "from-orange-400 via-pink-400 to-red-400",
    },
    {
      id: "story-bot",
      title: "Story Bot 📚",
      description: "Create amazing stories with AI magic",
      emoji: "✨",
      color: "from-green-400 via-teal-400 to-blue-400",
    },
    {
      id: "roadmap",
      title: "Learning Roadmap 🗺️",
      description: "Plan your awesome learning journey",
      emoji: "🚀",
      color: "from-purple-400 via-indigo-400 to-blue-400",
    },
    {
      id: "video-gen",
      title: "Video Magic 🎬",
      description: "Make cool videos with AI",
      emoji: "🎥",
      color: "from-red-400 via-orange-400 to-yellow-400",
    },
    {
      id: "idea-hub",
      title: "Idea Hub 💡",
      description: "Store all your brilliant ideas",
      emoji: "🌟",
      color: "from-purple-400 via-pink-400 to-red-400",
    },
  ];

  // Auto-scroll screenshots
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentScreenshotIndex(
        (prev) => (prev + 1) % screenshots.length
      );
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const navigateToFeature = (
    featureId: string,
    url?: string,
    isExternal?: boolean
  ) => {
    switch (featureId) {
      case "cheer-up":
        navigate("/dashboard/cheer-up");
        return;
      case "story-bot":
        navigate("/dashboard/story-bot");
        return;
      case "video-generator":
        navigate("/dashboard/video-generator");
        return;
      case "idea-hub":
        navigate("/dashboard/idea-hub");
        return;
      case "code-editor":
        navigate("/dashboard/code-editor");
        return;
      case "math-tutor":
        navigate("/dashboard/math");
        return;

      // Existing internal pages
      case "roadmap-scheduler":
        navigate("/roadmap");
        return;
      case "pdf-quiz":
        navigate("/Mock_Test");
        return;
      case "pdf-summary":
        navigate("/dashboard/pdf-summary");
        return;

      default:
        setActiveFeature(featureId);
    }
  };

  const backToDashboard = () => {
    setActiveFeature(null);
    setSearchQuery("");
  };

  if (!isUserLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100">
        <div className="flex flex-col items-center">
          <LoadingSpinner />
          <p className="mt-4 text-gray-700 font-bold text-lg animate-pulse">
            Loading Your Learning Hub... 🚀
          </p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <AuthErrorScreen />;
  }

  // Features in the exact order requested
  const features: Feature[] = [
    // 1) Story Summaries
    {
      id: "pdf-summary",
      icon: <FileText className="h-10 w-10" />,
      title: "PDF Summaries 📖",
      description:
        "Meet friendly avatars that read and explain PDFs to you! Learning made fun with voices and animations.",
      buttonText: "Get Summary!",
      color: "from-teal-400 via-cyan-400 to-blue-400",
      emoji: "🤖",
    },

    // 2) Code Studio
    {
      id: "code-editor",
      icon: <Code className="h-10 w-10" />,
      title: "Code Studio 💻",
      description:
        "Write code like a pro! Build cool projects with smart suggestions and colorful editors.",
      buttonText: "Start Coding!",
      color: "from-blue-400 via-indigo-400 to-purple-400",
      emoji: "👨‍💻",
      url: "https://edugen-code-companion-572959939599.us-west1.run.app/",
      isExternal: true,
    },

    // 3) Learning Roadmap
    {
      id: "roadmap-scheduler",
      icon: <Map className="h-10 w-10" />,
      title: "Learning Roadmap 🗺️",
      description:
        "Plan your learning adventure! Set goals, track progress, and become a superstar student with personalized schedules.",
      buttonText: "Start Journey!",
      color: "from-indigo-400 via-purple-400 to-pink-400",
      emoji: "🚀",
    },

    // 4) Video Magic
    {
      id: "video-generator",
      icon: <Video className="h-10 w-10" />,
      title: "Video Magic 🎬",
      description:
        "Turn your ideas into awesome videos! Create cool content and chat with super-fast AI that answers all your questions.",
      buttonText: "Make Videos!",
      color: "from-red-400 via-orange-400 to-yellow-400",
      emoji: "🎥",
      url: "https://video-image-text-generation-production.up.railway.app/",
      isExternal: true,
    },

    // 5) Cheer Up
    {
      id: "cheer-up",
      icon: <Heart className="h-10 w-10" />,
      title: "Cheer Up! 🌈",
      description:
        "Feeling down? Get instant smiles, fun activities, and motivational boosts to brighten your day!",
      buttonText: "Make Me Happy!",
      color: "from-orange-400 via-pink-400 to-red-400",
      emoji: "🎉",
      url: "https://cheer-up-gray.vercel.app/",
      isExternal: true,
    },

    // 6) Quiz Maker
    {
      id: "pdf-quiz",
      icon: <Sparkles className="h-10 w-10" />,
      title: "Quiz Maker ✏️",
      description:
        "Turn boring PDFs into fun quizzes! Test yourself with exciting questions and get instant scores.",
      buttonText: "Make Quiz!",
      color: "from-pink-400 via-rose-400 to-red-400",
      emoji: "🎯",
    },

    // 7) Story Bot
    {
      id: "story-bot",
      icon: <BookOpen className="h-10 w-10" />,
      title: "Story Bot 📚",
      description:
        "Become a storyteller! Create magical adventures and exciting tales with AI that brings your imagination to life.",
      buttonText: "Create Story!",
      color: "from-green-400 via-teal-400 to-blue-400",
      emoji: "✨",
      url: "https://story-bot-ruddy.vercel.app/",
      isExternal: true,
    },

    // 8) Idea Hub
    {
      id: "idea-hub",
      icon: <Lightbulb className="h-10 w-10" />,
      title: "Idea Hub 💡",
      description:
        "Store all your brilliant ideas in one place! Brainstorm, organize, and turn thoughts into amazing projects.",
      buttonText: "Save Ideas!",
      color: "from-purple-400 via-pink-400 to-red-400",
      emoji: "🌟",
      url: "https://idea-hub-lac.vercel.app/",
      isExternal: true,
    },

    // 9) Math Tutor
    {
      id: "math-tutor",
      icon: <Calculator className="h-10 w-10" />,
      title: "Math Tutor 📐",
      description:
        "Upload a photo of any math problem and get a clear, step-by-step solution explained like a personal tutor.",
      buttonText: "Solve My Problem!",
      color: "from-cyan-400 via-blue-400 to-indigo-400",
      emoji: "🧮",
    },
  ];

  const filteredFeatures = features.filter(
    (feature) =>
      feature.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      feature.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (activeFeature) {
    const selectedFeature = features.find(
      (f) => f.id === activeFeature
    );
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
        <Navbar />
        <main className="flex-grow">
          <div className="container mx-auto px-4 py-8 max-w-4xl">
            <div className="flex items-center mb-6">
              <Button
                onClick={backToDashboard}
                variant="ghost"
                className="mr-4 text-gray-700 hover:bg-white/50 flex items-center font-semibold rounded-xl"
              >
                <ChevronLeft className="h-6 w-6 mr-2" />
                Back Home
              </Button>
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-800">
                  {selectedFeature?.title}
                </h1>
              </div>
            </div>
            <div className="bg-white rounded-3xl p-8 shadow-2xl border-4 border-purple-200 animate-slideInRight">
              <div className="flex items-center mb-6">
                <div
                  className={`p-4 rounded-2xl bg-gradient-to-r ${selectedFeature?.color} text-white mr-4 animate-bounce-slow`}
                >
                  {selectedFeature?.icon}
                </div>
                <div>
                  <p className="text-gray-700 text-lg font-medium">
                    {selectedFeature?.description}
                  </p>
                </div>
              </div>
              <div className="bg-gradient-to-br from-yellow-50 via-orange-50 to-pink-50 rounded-2xl p-8 mb-6 border-2 border-yellow-200">
                <div className="flex items-center mb-4">
                  <Sparkles className="h-8 w-8 text-yellow-500 mr-3 animate-float" />
                  <h3 className="text-2xl font-bold text-gray-800">
                    Coming Super Soon! 🎊
                  </h3>
                </div>
                <p className="text-gray-700 mb-4 text-lg leading-relaxed">
                  We're building something AMAZING just for you! This
                  feature will be ready soon and it's going to be super
                  fun! 🚀✨
                </p>
                <div className="flex items-center text-base text-gray-600 bg-white rounded-xl p-4">
                  <Trophy className="h-6 w-6 mr-3 text-orange-500" />
                  <span className="font-semibold">
                    Be the first to try it when it launches!
                  </span>
                </div>
              </div>
              <Button className="mt-6 w-full md:w-auto bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 hover:from-purple-600 hover:via-pink-600 hover:to-red-600 text-white rounded-2xl px-10 py-4 text-lg font-bold shadow-xl transform hover:scale-105 transition-all">
                Notify Me! 🔔
                <ArrowRight className="h-6 w-6 ml-2" />
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100">
      <Navbar />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-12">
          {/* Hero Section */}
          <div className="text-center mb-16 animate-fadeInUp">
            <div className="flex justify-center items-center mb-6">
              <div className="bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 p-6 rounded-3xl shadow-2xl mb-4 transform hover:rotate-3 transition-transform animate-float">
                <h1 className="text-5xl md:text-7xl font-black text-white">
                  EduGen 🎓
                </h1>
              </div>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-gray-800 mb-4">
              Your <span className="gradient-text">Super Fun</span>{" "}
              Learning Adventure! 🚀
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-6 font-semibold">
              Learn, create, and have fun with awesome AI-powered tools
              made just for students like you! ✨
            </p>
            <div className="flex justify-center items-center space-x-3 text-base text-gray-600 mb-8">
              <Star className="h-5 w-5 text-yellow-500 animate-bounce-slow" />
              <span className="font-bold">Made by Team Zenith</span>
              <span>from</span>
              <span className="font-bold text-purple-600">
                R.M.K. Engineering College
              </span>
              <Star className="h-5 w-5 text-yellow-500 animate-bounce-slow" />
            </div>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative mt-8">
              <input
                type="text"
                placeholder="🔍 Search for fun tools..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-14 pr-6 py-5 border-4 border-purple-300 rounded-3xl focus:outline-none focus:ring-4 focus:ring-purple-400 focus:border-transparent shadow-xl text-lg font-medium"
              />
              <Search className="h-7 w-7 text-purple-500 absolute left-5 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          {/* Screenshot Showcase */}
          <div className="max-w-6xl mx-auto mb-20 animate-fadeInUp animation-delay-200">
            <div className="grid md:grid-cols-2 gap-10 items-center bg-white rounded-[2.5rem] shadow-2xl p-10 border-4 border-purple-200 overflow-hidden">
              <div className="relative h-96 rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                {screenshots.map((screenshot, index) => (
                  <div
                    key={screenshot.id}
                    className={`absolute inset-0 transition-all duration-700 ${
                      currentScreenshotIndex === index
                        ? "opacity-100 scale-100"
                        : "opacity-0 scale-95"
                    }`}
                  >
                    <div
                      className={`h-full bg-gradient-to-br ${screenshot.color} flex items-center justify-center text-white p-10`}
                    >
                      <div className="text-center">
                        <div className="text-8xl mb-6 animate-bounce-slow">
                          {screenshot.emoji}
                        </div>
                        <h3 className="text-3xl font-black mb-3">
                          {screenshot.title}
                        </h3>
                        <p className="text-lg font-semibold opacity-95">
                          {screenshot.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}

                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-3 z-10">
                  {screenshots.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentScreenshotIndex(index)}
                      className={`h-3 rounded-full transition-all ${
                        currentScreenshotIndex === index
                          ? "w-12 bg-white shadow-lg"
                          : "w-3 bg-white/60 hover:bg-white/90"
                      }`}
                    />
                  ))}
                </div>
              </div>

              <div className="animate-slideInRight">
                <h3 className="text-4xl font-black text-gray-800 mb-5">
                  {screenshots[currentScreenshotIndex].title}
                </h3>
                <p className="text-gray-700 mb-8 text-xl leading-relaxed font-medium">
                  {screenshots[currentScreenshotIndex].description}
                </p>
                <div className="space-y-5">
                  <div className="flex items-center space-x-4 bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-2xl">
                    <div
                      className={`p-3 rounded-xl bg-gradient-to-r ${screenshots[currentScreenshotIndex].color}`}
                    >
                      <Zap className="h-6 w-6 text-white" />
                    </div>
                    <span className="text-gray-800 font-bold text-lg">
                      Super Smart AI
                    </span>
                  </div>
                  <div className="flex items-center space-x-4 bg-gradient-to-r from-blue-50 to-cyan-50 p-4 rounded-2xl">
                    <div
                      className={`p-3 rounded-xl bg-gradient-to-r ${screenshots[currentScreenshotIndex].color}`}
                    >
                      <Sparkles className="h-6 w-6 text-white" />
                    </div>
                    <span className="text-gray-800 font-bold text-lg">
                      Easy & Fun to Use
                    </span>
                  </div>
                  <div className="flex items-center space-x-4 bg-gradient-to-r from-green-50 to-teal-50 p-4 rounded-2xl">
                    <div
                      className={`p-3 rounded-xl bg-gradient-to-r ${screenshots[currentScreenshotIndex].color}`}
                    >
                      <Heart className="h-6 w-6 text-white" />
                    </div>
                    <span className="text-gray-800 font-bold text-lg">
                      Made for Students
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* All Features in Order - No Categories */}
          <div className="mb-12">
            <h2 className="text-4xl font-black text-center text-gray-800 mb-12 animate-fadeInUp">
              Your Amazing Tools! 🎨
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {filteredFeatures.map((feature, index) => (
                <FunFeatureCard
                  key={feature.id}
                  {...feature}
                  onClick={() =>
                    navigateToFeature(
                      feature.id,
                      feature.url,
                      feature.isExternal
                    )
                  }
                  delay={`animation-delay-${(index + 1) * 100}`}
                  onHover={setHoveredCard}
                  isHovered={hoveredCard === feature.id}
                />
              ))}
            </div>

            {filteredFeatures.length === 0 && (
              <div className="text-center py-16 bg-white rounded-3xl border-4 border-purple-200">
                <div className="text-6xl mb-4">🔍</div>
                <p className="text-gray-600 text-xl font-semibold">
                  No tools found. Try searching for something else!
                </p>
              </div>
            )}
          </div>

                    {/* Future Work - AI VS Code Extension */}
          <div className="max-w-6xl mx-auto mt-16 animate-fadeInUp animation-delay-500">
            <div className="bg-gradient-to-r from-slate-900 via-purple-800 to-indigo-700 rounded-[2.5rem] p-10 md:p-14 text-white shadow-2xl border-4 border-purple-300">
              <h2 className="text-3xl md:text-4xl font-black text-center mb-4">
                Coming Next: AI VS Code Extension ⚡
              </h2>

              <p className="text-lg md:text-xl text-center max-w-3xl mx-auto mb-3 font-semibold text-white">
                This prototype is built especially for web developers, helping you code faster, learn better,
                and debug smarter right inside VS Code.
              </p>

              <p className="text-base md:text-lg text-center max-w-3xl mx-auto mb-8 font-medium text-white/90">
                It gives real-time explanations, suggestions, and best practices while you work on your React,
                TypeScript, and full‑stack projects.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <div className="bg-white/10 rounded-2xl p-5 border border-white/20">
                  <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                    <Code className="h-5 w-5 text-yellow-300" />
                    Smart Code Help
                  </h3>
                  <p className="text-sm md:text-base text-white/85">
                    Get instant explanations, refactors, and context-aware suggestions for your web dev code.
                  </p>
                </div>
                <div className="bg-white/10 rounded-2xl p-5 border border-white/20">
                  <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                    <Lightbulb className="h-5 w-5 text-emerald-300" />
                    Learn While Coding
                  </h3>
                  <p className="text-sm md:text-base text-white/85">
                    See step-by-step reasoning, tips, and patterns without leaving your editor.
                  </p>
                </div>
                <div className="bg-white/10 rounded-2xl p-5 border border-white/20">
                  <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-pink-300" />
                    Built for EduGen
                  </h3>
                  <p className="text-sm md:text-base text-white/85">
                    Designed to work hand‑in‑hand with EduGen so your projects and learning tools are connected.
                  </p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                {/* Features / repo link */}
                <a
                  href="https://marketplace.visualstudio.com/items?itemName=DevchumBaseline.baseline-guard-new"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex"
                >
                  <Button className="bg-white text-slate-900 hover:bg-slate-100 rounded-2xl px-8 py-4 font-bold text-lg shadow-xl flex items-center">
                    Check out the features
                    <ExternalLink className="h-5 w-5 ml-2" />
                  </Button>
                </a>

                {/* Demo video link */}
                <a
                  href="https://drive.google.com/file/d/1-95dapL3RgX3m6MCzw6Olw0kUY8ZPl7k/view?usp=sharing"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex"
                >
                  <Button
                    className="border-white text-white hover:bg-white/10 rounded-2xl px-8 py-4 font-bold text-lg shadow-lg flex items-center"
                  >
                    Watch demo video
                    <ExternalLink className="h-5 w-5 ml-2" />
                  </Button>
                </a>
              </div>

              <p className="mt-6 text-sm md:text-base text-center text-white/80 font-medium">
                We’re actively developing this VS Code extension for web developers — stay tuned for the public release!
              </p>
            </div>
          </div>

          {/* Impact Stats */}
          <div className="max-w-6xl mx-auto mt-24 animate-fadeInUp animation-delay-600">
            <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 rounded-[2.5rem] p-12 md:p-16 text-white shadow-2xl border-4 border-white">
              <h2 className="text-4xl font-black text-center mb-12">
                Why EduGen is AWESOME! 🎉
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                <FunImpactStat
                  value="9+"
                  label="Cool Tools"
                  icon={<Sparkles className="h-8 w-8" />}
                />
                <FunImpactStat
                  value="∞"
                  label="Fun Ideas"
                  icon={<Lightbulb className="h-8 w-8" />}
                />
                <FunImpactStat
                  value="24/7"
                  label="Always Here"
                  icon={<Heart className="h-8 w-8" />}
                />
                <FunImpactStat
                  value="FREE!"
                  label="No Cost"
                  icon={<Trophy className="h-8 w-8" />}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

const FunFeatureCard = ({
  icon,
  title,
  description,
  buttonText,
  color,
  emoji,
  onClick,
  delay,
  isExternal,
  onHover,
  isHovered,
}: Feature & {
  onClick: () => void;
  delay: string;
  onHover: (id: string | null) => void;
  isHovered: boolean;
}) => (
  <div
    className={`bg-white rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-3 overflow-hidden group animate-fadeInUp ${delay} border-4 border-purple-100 hover:border-purple-300 cursor-pointer ${
      isHovered ? "scale-105" : ""
    }`}
    onMouseEnter={() => onHover(title)}
    onMouseLeave={() => onHover(null)}
  >
    <div className="relative">
      <div
        className={`absolute -inset-2 bg-gradient-to-r ${color} blur opacity-20 group-hover:opacity-40 transition duration-300 rounded-2xl`}
      ></div>
      <div className="relative bg-white p-6 rounded-2xl">
        <div className="flex flex-col items-center space-y-4 mb-6">
          <div className="text-5xl animate-float">{emoji}</div>
          <div
            className={`p-4 rounded-2xl bg-gradient-to-r ${color} text-white shrink-0 group-hover:scale-110 transition-transform shadow-lg`}
          >
            {icon}
          </div>
          <h3 className="text-2xl font-black text-gray-800 text-center group-hover:text-gray-900 transition-colors">
            {title}
          </h3>
        </div>
        <p className="text-gray-700 text-base leading-relaxed mb-6 text-center font-medium">
          {description}
        </p>
        <Button
          onClick={onClick}
          className="w-full bg-gradient-to-r from-white to-gray-50 border-4 border-purple-200 hover:from-purple-50 hover:to-pink-50 text-gray-800 rounded-2xl py-4 font-black text-lg transition-all group-hover:shadow-xl transform group-hover:scale-105"
        >
          {buttonText}
          {isExternal ? (
            <ExternalLink className="h-5 w-5 ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          ) : (
            <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-2 transition-transform" />
          )}
        </Button>
      </div>
    </div>
  </div>
);

const FunImpactStat = ({
  value,
  label,
  icon,
}: {
  value: string;
  label: string;
  icon: React.ReactNode;
}) => (
  <div className="text-center group cursor-pointer hover:scale-110 transition-transform duration-200">
    <div className="bg-white/20 backdrop-blur-sm p-6 rounded-2xl mb-4 group-hover:bg-white/30 transition-colors flex justify-center border-2 border-white/30">
      <div className="text-white animate-bounce-slow">{icon}</div>
    </div>
    <p className="text-4xl font-black mb-2 drop-shadow-lg">{value}</p>
    <p className="text-lg font-bold text-white/90">{label}</p>
  </div>
);

const AuthErrorScreen = () => (
  <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100">
    <Navbar />
    <main className="flex-grow flex items-center justify-center text-center px-4 py-12">
      <div className="bg-white rounded-3xl p-12 max-w-md shadow-2xl border-4 border-purple-200 animate-fadeInUp">
        <div className="text-6xl mb-6 animate-bounce-slow">🔒</div>
        <h1 className="text-3xl font-black text-gray-800 mb-4">
          Oops! Sign In First! 🚀
        </h1>
        <p className="text-gray-700 mb-8 text-lg font-medium">
          Join EduGen to unlock all the amazing tools and start your
          learning adventure!
        </p>
        <Button
          onClick={() => (window.location.href = "/")}
          className="w-full bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 hover:from-purple-600 hover:via-pink-600 hover:to-orange-600 text-white rounded-2xl py-4 font-black text-lg shadow-xl transition-all transform hover:scale-105"
        >
          <Home className="h-6 w-6 mr-2" />
          Let's Go!
        </Button>
      </div>
    </main>
    <Footer />
  </div>
);

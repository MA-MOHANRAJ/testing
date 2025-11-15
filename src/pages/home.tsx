import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { SignInButton, useUser } from "@clerk/clerk-react";
import { motion, useAnimation, useInView } from "framer-motion";
import {
  ArrowRight,
  Book,
  Brain,
  Calculator,
  Calendar,
  Code,
  ExternalLink,
  FileText,
  Heart,
  Lightbulb,
  Rocket,
  Sparkles,
  Star,
  Trophy,
  Video,
  Zap
} from "lucide-react";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router";

const COOL_TOOLS = [
  {
    icon: FileText,
    title: "PDF Summaries 📄",
    description:
      "Meet friendly avatars that read and explain PDFs to you! Learning made fun with voices and animations.",
    gradient: "from-cyan-400 to-blue-500",
    emoji: "🤖",
  },
  {
    icon: Code,
    title: "Code Studio 💻",
    description:
      "Write code like a pro! Build cool projects with smart suggestions and colorful editors.",
    gradient: "from-purple-400 to-pink-500",
    emoji: "👨‍💻",
  },
  {
    icon: Calendar,
    title: "Learning Roadmap 🗺️",
    description:
      "Plan your learning adventure! Set goals, track progress, and become a superstar student.",
    gradient: "from-green-400 to-teal-500",
    emoji: "🎯",
  },
  {
    icon: Video,
    title: "Video Magic 🎬",
    description:
      "Turn your ideas into awesome videos! Create cool content and chat with super-fast AI.",
    gradient: "from-orange-400 to-red-500",
    emoji: "🎥",
  },
  {
    icon: Heart,
    title: "Cheer Up! 🌈",
    description:
      "Feeling down? Get instant smiles, fun activities, and motivational boosts to brighten your day!",
    gradient: "from-pink-400 to-rose-500",
    emoji: "😊",
  },
  {
    icon: Brain,
    title: "Quiz Maker 📝",
    description:
      "Turn boring PDFs into fun quizzes! Test yourself with exciting questions and get instant scores.",
    gradient: "from-yellow-400 to-orange-500",
    emoji: "🎮",
  },
  {
    icon: Book,
    title: "Story Bot 📚",
    description:
      "Become a storyteller! Create magical adventures and exciting tales with AI.",
    gradient: "from-indigo-400 to-purple-500",
    emoji: "✨",
  },
  {
    icon: Lightbulb,
    title: "Idea Hub 💡",
    description:
      "Store all your brilliant ideas in one place! Brainstorm, organize, and turn thoughts into amazing projects.",
    gradient: "from-lime-400 to-green-500",
    emoji: "🚀",
  },
  {
    icon: Calculator,
    title: "Math Tutor 📐",
    description:
      "Upload a photo of any math problem and get a clear, step-by-step solution explained like a friendly tutor.",
    gradient: "from-sky-400 to-indigo-500",
    emoji: "🧮",
  },
] as const;

// Fun animation variants for kids
const bounceVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 50 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring",
      bounce: 0.5,
      duration: 0.8,
    },
  },
};

const wiggleVariants = {
  animate: {
    rotate: [-5, 5, -5],
    transition: {
      duration: 0.5,
      repeat: Infinity,
      repeatType: "reverse" as const,
    },
  },
};

const floatVariants = {
  animate: {
    y: [-10, 10, -10],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

const starVariants = {
  animate: {
    scale: [1, 1.2, 1],
    rotate: [0, 180, 360],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

function App() {
  const { user, isLoaded: isUserLoaded } = useUser();
  const navigate = useNavigate();

  const heroRef = useRef(null);
  const toolsRef = useRef(null);
  const ctaRef = useRef(null);

  const isHeroInView = useInView(heroRef, { once: true, amount: 0.2 });
  const isToolsInView = useInView(toolsRef, { once: true, amount: 0.1 });
  const isCtaInView = useInView(ctaRef, { once: true, amount: 0.3 });

  const controls = useAnimation();

  useEffect(() => {
    if (isHeroInView) controls.start("visible");
  }, [isHeroInView, controls]);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-purple-50 via-pink-50 to-blue-50 text-slate-900 overflow-x-hidden">
      <Navbar />
      <main className="flex-grow">
        {/* SUPER FUN HERO SECTION */}
        <motion.section
          ref={heroRef}
          className="relative pt-20 pb-24 overflow-hidden"
          initial="hidden"
          animate={controls}
        >
          {/* Floating fun shapes */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div
              className="absolute top-20 left-10 text-6xl"
              variants={floatVariants}
              animate="animate"
            >
              ⭐
            </motion.div>
            <motion.div
              className="absolute top-40 right-20 text-5xl"
              variants={floatVariants}
              animate="animate"
              style={{ animationDelay: "1s" }}
            >
              🚀
            </motion.div>
            <motion.div
              className="absolute bottom-40 left-20 text-6xl"
              variants={floatVariants}
              animate="animate"
              style={{ animationDelay: "2s" }}
            >
              🎨
            </motion.div>
            <motion.div
              className="absolute bottom-20 right-10 text-5xl"
              variants={floatVariants}
              animate="animate"
              style={{ animationDelay: "0.5s" }}
            >
              🎯
            </motion.div>
          </div>

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-7xl">
            <div className="text-center space-y-8">
              {/* Fun Badge */}
              <motion.div
                className="inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-6 py-3 shadow-xl border-4 border-white"
                variants={bounceVariants}
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <motion.div variants={wiggleVariants} animate="animate">
                  <Sparkles className="h-5 w-5" />
                </motion.div>
                <span className="text-lg font-black">
                  YOUR SUPER FUN LEARNING ADVENTURE! 🎉
                </span>
                <motion.div variants={starVariants} animate="animate">
                  <Star className="h-5 w-5 fill-current" />
                </motion.div>
              </motion.div>

              {/* Big Exciting Title */}
              <motion.h1
                className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tight leading-tight"
                variants={bounceVariants}
              >
                <motion.span
                  className="bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 bg-clip-text text-transparent"
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                  style={{ backgroundSize: "200% 200%" }}
                >
                  Learn. Create.
                </motion.span>
                <br />
                <motion.span
                  className="text-slate-800"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3, type: "spring", bounce: 0.6 }}
                >
                  Have FUN! 🎊
                </motion.span>
              </motion.h1>

              {/* Exciting Description */}
              <motion.p
                className="text-2xl sm:text-3xl text-slate-700 max-w-4xl mx-auto font-bold leading-relaxed"
                variants={bounceVariants}
              >
                Welcome to{" "}
                <span className="text-purple-600 text-3xl">EduGen AI</span> – where
                learning feels like playing! 🎮
                <br />
                <span className="text-xl sm:text-2xl">
                  Cool AI tools made just for awesome students like YOU! ✨
                </span>
              </motion.p>

              {/* Big Action Button */}
              <motion.div className="pt-6" variants={bounceVariants}>
                {!isUserLoaded ? (
                  <div className="h-16 w-72 rounded-3xl bg-slate-200 animate-pulse mx-auto"></div>
                ) : !user ? (
                  <SignInButton mode="modal">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button className="bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 hover:from-purple-600 hover:via-pink-600 hover:to-blue-600 text-white rounded-3xl px-12 py-8 text-2xl font-black shadow-2xl border-4 border-white transform hover:shadow-pink-500/50">
                        <Rocket className="mr-3 h-8 w-8" />
                        START MY ADVENTURE! 🚀
                        <Sparkles className="ml-3 h-8 w-8" />
                      </Button>
                    </motion.div>
                  </SignInButton>
                ) : (
                  <motion.div
                    whileHover={{ scale: 1.05, rotate: 1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      onClick={() => navigate("/dashboard")}
                      className="bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 hover:from-purple-600 hover:via-pink-600 hover:to-blue-600 text-white rounded-2xl px-10 py-10 text-lg font-bold shadow-lg border-2 border-white transform hover:shadow-pink-500/50"
                    >
                      <Zap className="mr-2 h-6 w-6" />
                      EXPLORE NOW! 🎯
                      <ArrowRight className="ml-2 h-6 w-6" />
                    </Button>
                  </motion.div>
                )}
              </motion.div>

              {/* Trust Badge for Kids */}
              <motion.div
                className="inline-flex items-center gap-2 text-slate-600 text-lg font-bold bg-white/80 backdrop-blur-sm rounded-2xl px-6 py-3 shadow-lg"
                variants={bounceVariants}
              >
                <Trophy className="h-6 w-6 text-yellow-500" />
                <span>Tested by 45+ Students! 🌍</span>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* AWESOME TOOLS SECTION */}
        <section
          ref={toolsRef}
          className="py-20 bg-gradient-to-b from-white to-purple-50"
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <motion.div
              className="text-center mb-16"
              initial="hidden"
              animate={isToolsInView ? "visible" : "hidden"}
              variants={bounceVariants}
            >
              <motion.h2
                className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 mb-6"
                whileHover={{ scale: 1.05 }}
              >
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Check Out These COOL Tools! 🎨
                </span>
              </motion.h2>
              <motion.p className="text-xl sm:text-2xl text-slate-600 max-w-3xl mx-auto font-bold">
                Each tool is super fun and will make you say "WOW!" 🤩
              </motion.p>
            </motion.div>

            <motion.div
              className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
              initial="hidden"
              animate={isToolsInView ? "visible" : "hidden"}
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.1,
                  },
                },
              }}
            >
              {COOL_TOOLS.map((tool) => (
                <motion.div
                  key={tool.title}
                  className="group relative bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border-4 border-slate-200 hover:border-purple-400 overflow-hidden transform hover:-translate-y-2"
                  variants={bounceVariants}
                  whileHover={{ scale: 1.05, rotate: 1 }}
                >
                  {/* Fun gradient background */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${tool.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                  ></div>

                  <div className="relative z-10">
                    {/* Big Emoji Icon with SMOOTH transition */}
                    <motion.div
                      className="text-6xl mb-4"
                      whileHover={{
                        scale: 1.2,
                        rotate: 360,
                      }}
                      transition={{
                        duration: 0.5,
                        ease: "easeInOut",
                      }}
                    >
                      {tool.emoji}
                    </motion.div>

                    <h3 className="text-2xl font-black text-slate-900 mb-3 group-hover:text-purple-600 transition-colors">
                      {tool.title}
                    </h3>

                    <p className="text-slate-600 text-base leading-relaxed font-semibold">
                      {tool.description}
                    </p>

                    {/* Fun hover indicator */}
                    <motion.div
                      className="mt-4 inline-flex items-center gap-2 text-purple-600 font-bold opacity-0 group-hover:opacity-100 transition-opacity"
                      initial={{ x: -20 }}
                      whileHover={{ x: 0 }}
                    >
                      <span>Click to explore!</span>
                      <ArrowRight className="h-5 w-5" />
                    </motion.div>
                  </div>

                  {/* Sparkle effects */}
                  <motion.div
                    className="absolute top-4 right-4 text-2xl opacity-0 group-hover:opacity-100"
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    ✨
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>

            {/* VS Code extension CTA */}
            <div className="mt-12 text-center">
              <p className="text-lg sm:text-xl text-slate-700 font-bold mb-4">
                Are you a web developer? Try our AI-powered VS Code extension
                prototype built just for you!
              </p>
              <a
                href="https://marketplace.visualstudio.com/items?itemName=DevchumBaseline.baseline-guard-new"
                target="_blank"
                rel="noreferrer"
              >
                <Button className="inline-flex items-center gap-2 bg-slate-900 text-white hover:bg-slate-800 rounded-2xl px-8 py-4 text-lg font-bold shadow-xl">
                  Try the VS Code extension
                  <ExternalLink className="h-5 w-5" />
                </Button>
              </a>
            </div>
          </div>
        </section>

        {/* WHY KIDS LOVE IT SECTION */}
        <section className="py-20 bg-gradient-to-b from-purple-50 to-blue-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
            <motion.div
              className="text-center mb-12"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={bounceVariants}
            >
              <h2 className="text-4xl sm:text-5xl font-black text-slate-900 mb-4">
                Why You'll <span className="text-pink-500">LOVE</span> EduGen! 💖
              </h2>
              <p className="text-xl text-slate-600 font-bold">
                See what makes EduGen the BEST learning buddy ever! 🎉
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: "🎮",
                  title: "Super Easy to Use",
                  desc: "Big buttons, bright colors, and fun sounds make everything SIMPLE!",
                },
                {
                  icon: "🏆",
                  title: "Learn by Playing",
                  desc: "Get cool badges, awesome scores, and celebrate every win like a champion!",
                },
                {
                  icon: "🌟",
                  title: "Always Something New",
                  desc: "New fun tools and surprise features added just for YOU!",
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  className="bg-white rounded-3xl p-8 shadow-xl text-center border-4 border-purple-200"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.2 }}
                  whileHover={{ scale: 1.05, rotate: 2 }}
                >
                  <div className="text-6xl mb-4">{item.icon}</div>
                  <h3 className="text-2xl font-black text-slate-900 mb-3">
                    {item.title}
                  </h3>
                  <p className="text-slate-600 font-semibold text-lg">
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* SNEAK PEEK SECTION - Makes kids WANT to see the dashboard */}
        <section className="py-20 bg-gradient-to-b from-blue-50 to-purple-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
            <motion.div
              className="text-center mb-12"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={bounceVariants}
            >
              <motion.h2
                className="text-4xl sm:text-5xl font-black text-slate-900 mb-6"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                🎁 What's Waiting Inside? 🎁
              </motion.h2>
              <p className="text-2xl text-slate-600 font-bold">
                Your own personal dashboard with ALL these amazing things! 😍
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6 mb-10">
              {[
                {
                  emoji: "📑",
                  text: "Turn ANY PDF into a fun story with talking avatars!",
                },
                {
                  emoji: "💻",
                  text: "Build real websites and apps with colorful code!",
                },
                {
                  emoji: "🎬",
                  text: "Make your OWN videos with AI magic!",
                },
                {
                  emoji: "🎯",
                  text: "Set goals and watch yourself become AMAZING!",
                },
                {
                  emoji: "🌈",
                  text: "Get daily happiness boosts when you need them!",
                },
                {
                  emoji: "🎮",
                  text: "Play learning games that feel like real games!",
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  className="bg-white rounded-2xl p-6 shadow-lg border-2 border-purple-300 flex items-center gap-4"
                  initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ scale: 1.05, backgroundColor: "#faf5ff" }}
                >
                  <div className="text-4xl">{item.emoji}</div>
                  <p className="text-lg font-bold text-slate-700">
                    {item.text}
                  </p>
                </motion.div>
              ))}
            </div>

            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <motion.p
                className="text-3xl font-black text-purple-600 mb-6"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                ⚡ AND SO MUCH MORE! ⚡
              </motion.p>
              <p className="text-xl text-slate-600 font-bold">
                Click the button below to see YOUR dashboard RIGHT NOW! 👇
              </p>
            </motion.div>
          </div>
        </section>

        {/* BIG FINAL CTA */}
        <section
          ref={ctaRef}
          className="py-24 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 relative overflow-hidden"
        >
          {/* Floating emojis */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
            {["🎉", "⭐", "🚀", "🎨", "💡", "🏆", "✨", "🌈"].map((emoji, i) => (
              <motion.div
                key={i}
                className="absolute text-6xl"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [-20, 20, -20],
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              >
                {emoji}
              </motion.div>
            ))}
          </div>

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl relative z-10">
            <motion.div
              className="text-center text-white"
              initial="hidden"
              animate={isCtaInView ? "visible" : "hidden"}
              variants={bounceVariants}
            >
              <motion.h2
                className="text-5xl sm:text-6xl lg:text-7xl font-black mb-6 leading-tight"
                whileHover={{ scale: 1.05 }}
              >
                Ready to Become a
                <br />
                <span className="text-yellow-300">
                  LEARNING SUPERSTAR? 🌟
                </span>
              </motion.h2>

              <motion.p
                className="text-2xl sm:text-3xl mb-4 font-bold"
                variants={bounceVariants}
              >
                Don't just read about it... EXPERIENCE IT! 🎊
              </motion.p>

              <motion.p
                className="text-xl mb-10 font-bold"
                variants={bounceVariants}
              >
                Your amazing dashboard is waiting for YOU right now! 🎁
              </motion.p>

              {!user ? (
                <SignInButton mode="modal">
                  <motion.div
                    whileHover={{ scale: 1.15, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Button className="bg-white text-purple-600 hover:bg-yellow-300 hover:text-purple-700 rounded-full px-5 py-6 text-3xl font-black shadow-2xl border-4 border-yellow-300">
                      <Rocket className="mr-2 h-5 w-5" />
                      LET'S JUMP! 🎉
                      <Sparkles className="ml-2 h-5 w-5" />
                    </Button>
                  </motion.div>
                </SignInButton>
              ) : (
                <motion.div
                  whileHover={{ scale: 1.15, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Button
                    onClick={() => navigate("/dashboard")}
                    className="bg-white text-purple-600 hover:bg-yellow-300 hover:text-purple-700 rounded-full px-5 py-6 text-3xl font-black shadow-2xl border-4 border-yellow-300"
                  >
                    <Zap className="mr-2 h-5 w-5" />
                    LET'S JUMP! 🎯
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </motion.div>
              )}

              <motion.div
                className="mt-8 space-y-3"
                variants={bounceVariants}
              >
                <div className="flex items-center justify-center gap-3 text-xl font-bold">
                  <div className="w-4 h-4 bg-green-400 rounded-full"></div>
                  <span>No credit card needed!</span>
                </div>
                <div className="flex items-center justify-center gap-3 text-xl font-bold">
                  <div className="w-4 h-4 bg-yellow-400 rounded-full"></div>
                  <span>Start playing in less than 1 minute!</span>
                </div>
                <div className="flex items-center justify-center gap-3 text-xl font-bold">
                  <div className="w-4 h-4 bg-pink-400 rounded-full"></div>
                  <span>100% Safe & Fun for kids like you!</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default App;
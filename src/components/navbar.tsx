import { SignInButton, UserButton, useUser } from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { BookOpen, Sparkles, Home, User, LogIn, GraduationCap } from "lucide-react";

export function Navbar() {
  const { isLoaded, isSignedIn, user } = useUser();

  return (
    <nav className="sticky top-0 w-full bg-gradient-to-r from-blue-700 via-indigo-600 to-blue-800 backdrop-blur-xl border-b border-white/10 z-50 shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Enhanced Logo - Education Theme */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              {/* Subtle glow for depth */}
              <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full blur-md opacity-60 group-hover:opacity-90 transition-opacity duration-300" />
              <div className="relative bg-white/25 backdrop-blur-md p-1.5 rounded-full border border-white/30 shadow-inner">
                <img
                  src="/edugen.jpg"        // put edugen.jpg in /public
                  alt="EduGen Logo"
                  className="h-8 w-8 rounded-full object-cover group-hover:scale-110 group-hover:rotate-3 transition-all duration-300"
                />
              </div>
            </div>

            <div className="flex flex-col">
              <span className="text-xl font-bold text-white drop-shadow-md group-hover:text-yellow-100 transition-colors duration-300">
                EduGen-AI
              </span>
              <span className="text-xs text-white/75 -mt-1 hidden sm:block font-medium tracking-wide">
                Learn Smarter with AI
              </span>
            </div>

            {/* Floating knowledge sparks */}
            <div className="hidden md:flex items-center space-x-1 ml-1">
              <Sparkles className="h-3.5 w-3.5 text-yellow-300 animate-pulse" />
              <BookOpen className="h-3 w-3 text-emerald-300 animate-bounce animation-delay-500" />
              <Sparkles className="h-3 w-3 text-sky-300 animate-pulse animation-delay-1000" />
            </div>
          </Link>

          {/* Navigation & Auth */}
          {isLoaded ? (
            <div className="flex items-center gap-3">
              {isSignedIn ? (
                <>
                  {/* Dashboard Button */}
                  <Link
                    to="/dashboard"
                    className="hidden sm:flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white/90 hover:text-white bg-white/15 hover:bg-white/25 rounded-full transition-all duration-300 backdrop-blur-md border border-white/20 hover:border-white/40 group shadow-sm"
                  >
                    <Home className="h-4 w-4 group-hover:scale-110 transition-transform duration-200" />
                    <span>Dashboard</span>
                  </Link>

                  {/* Welcome Message - Subtle & Clean */}
                  <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 bg-emerald-500/20 rounded-full backdrop-blur-md border border-emerald-400/30">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium text-emerald-50">
                      Hi, {user?.firstName || "Learner"}!
                    </span>
                  </div>

                  {/* User Avatar with Ring */}
                  <div className="relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-400 to-sky-400 rounded-full blur opacity-70 group-hover:opacity-100 transition duration-300"></div>
                    <div className="relative bg-white/30 p-1 rounded-full border border-white/40 backdrop-blur-sm">
                      <UserButton
                        afterSignOutUrl="/"
                        appearance={{
                          elements: {
                            avatarBox: "w-9 h-9 rounded-full border-2 border-white shadow-sm",
                            userButtonPopoverCard:
                              "bg-white/98 backdrop-blur-xl border border-indigo-100 shadow-xl rounded-2xl",
                            userButtonPopoverActionButton:
                              "hover:bg-indigo-50 text-indigo-700 font-medium transition-colors",
                            userButtonPopoverActionButton__signOut:
                              "text-red-600 hover:bg-red-50",
                          },
                        }}
                      />
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex items-center gap-3">
                  {/* Mobile Home Icon */}
                  <Link
                    to="/"
                    className="sm:hidden p-2 text-white/80 hover:text-white transition-colors"
                    aria-label="Home"
                  >
                    <Home className="h-5 w-5" />
                  </Link>

                  {/* Sign In Button - Education CTA */}
                  <SignInButton mode="modal" signUpFallbackRedirectUrl="/">
                    <Button className="group relative overflow-hidden bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold px-5 py-2.5 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 border border-white/30 hover:border-white/50 flex items-center gap-2">
                      {/* Shine effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0 translate-x-[-100%] group-hover:translate-x-full transition-transform duration-700"></div>

                      <LogIn className="h-4.5 w-4.5 group-hover:scale-110 transition-transform duration-200" />
                      <span className="hidden sm:inline text-sm font-bold">Start Learning</span>
                      <span className="sm:hidden text-sm font-bold">Join</span>

                      {/* Floating sparkles on hover */}
                      <Sparkles className="h-3.5 w-3.5 text-white/80 absolute -top-1 -right-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse" />
                    </Button>
                  </SignInButton>
                </div>
              )}
            </div>
          ) : (
            /* Loading State - Skeleton */
            <div className="flex items-center gap-3">
              <div className="hidden sm:block h-9 w-28 bg-white/20 rounded-full animate-pulse"></div>
              <div className="h-10 w-10 bg-white/25 rounded-full animate-pulse"></div>
            </div>
          )}
        </div>
      </div>

      {/* Subtle animated divider */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>

      {/* Floating Learning Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-3 left-1/4 w-1.5 h-1.5 bg-yellow-300/70 rounded-full animate-ping animation-delay-1000"></div>
        <div className="absolute top-5 right-1/3 w-1 h-1 bg-emerald-300/60 rounded-full animate-ping animation-delay-2000"></div>
        <div className="absolute top-4 left-3/4 w-1 h-1 bg-sky-300/60 rounded-full animate-ping animation-delay-3000"></div>
      </div>
    </nav>
  );
}
'use client';

import { Footer } from "@/components/footer"; // Imported Footer
import { Navbar } from "@/components/navbar"; // Imported Navbar
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { storage } from "@/lib/storage";
import { useUser } from "@clerk/clerk-react";
import {
  AlertCircle,
  ArrowLeft,
  BookOpen,
  Calendar,
  CheckCircle2,
  ChevronRight,
  Clock, // Icon for back button
  Home,
  Sparkles
} from "lucide-react";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom"; // Imported for navigation

/* ---------- Types ---------- */
interface QuizQuestion {
  id: string;
  text: string;
  options: { label: string; value: string }[];
}
interface Milestone {
  title: string;
  duration_days: number;
  tasks: string[];
  resources: string[];
}
interface Roadmap {
  id?: string;
  topic: string;
  level: string;
  quiz_responses: Record<string, string>;
  milestones: Milestone[];
  created_at?: string;
}
interface ScheduleDay {
  id?: string;
  day: number;
  tasks: { title: string; completed: boolean }[];
}
type Step =
  | "dashboard"
  | "topic"
  | "quiz"
  | "generating"
  | "roadmap"
  | "tracking";

/* ---------- Component ---------- */
export default function RoadmapGenerator() {
  const { user } = useUser();
  const navigate = useNavigate(); // Navigation hook
  const authReady = true; 

  const [step, setStep] = useState<Step>("dashboard");
  const [roadmaps, setRoadmaps] = useState<Roadmap[]>([]);
  const [currentRoadmap, setCurrentRoadmap] = useState<Roadmap | null>(null);
  const [schedule, setSchedule] = useState<ScheduleDay[]>([]);

  const [topic, setTopic] = useState("");
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([]);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  /* ---------- Load roadmaps ---------- */
  useEffect(() => {
    if (authReady) fetchRoadmaps();
  }, [authReady]);

  const fetchRoadmaps = async () => {
    try {
      const data = await storage.getRoadmaps();
      setRoadmaps(data);
    } catch {
      toast.error("Failed to load roadmaps");
    }
  };

  const loadRoadmap = async (id: string) => {
    const roadmap = await storage.getRoadmap(id);
    const sched = await storage.getSchedules(id);

    if (!roadmap) return toast.error("Roadmap not found");

    setCurrentRoadmap(roadmap);
    setSchedule(
      sched.map((s) => ({
        id: s.id,
        day: s.day,
        tasks: s.tasks,
      }))
    );
    setStep("roadmap");
  };

  /* ---------- Gemini Quiz ---------- */
  const generateQuiz = async () => {
    if (!topic.trim()) return;
    setLoading(true);
    const toastId = toast.loading("Creating quiz…");

    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      if (!apiKey) throw new Error("VITE_GEMINI_API_KEY missing");

      const prompt = `You are an expert curriculum designer. For "${topic}", create exactly 3 multiple-choice questions that assess:
      1. Current knowledge level
      2. Weekly time commitment
      3. Learning goal

      Return ONLY valid JSON (no markdown) like this:
      {
        "questions": [
          {
            "id": "q1",
            "text": "Your question here?",
            "options": [
              {"label": "Never heard of it", "value": "beginner"},
              {"label": "A little", "value": "intermediate"},
              ...
            ]
          },
          ...
        ]
      }`;

    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash:generateContent?key=${apiKey}`, 
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ role: "user", parts: [{ text: prompt }] }],
          generationConfig: { temperature: 0.7 },
        }),
      }
    );

      if (!res.ok) throw new Error(await res.text());

      const data = await res.json();
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text ?? "";
      const cleaned = text.replace(/```json|```/g, "").trim();
      const parsed = JSON.parse(cleaned);

      setQuizQuestions(parsed.questions ?? []);
      setStep("quiz");
      toast.success("Quiz ready!", { id: toastId });
    } catch (e: any) {
      console.error(e);
      toast.error("Quiz generation failed – check Gemini key", { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  /* ---------- Gemini Roadmap ---------- */
  const generateRoadmap = async () => {
    if (Object.keys(answers).length < quizQuestions.length) return;

    setStep("generating");
    const toastId = toast.loading("Building roadmap…");

    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    const userAnswers = quizQuestions
      .map(
        (q) =>
          `${q.text}\n→ ${q.options.find((o) => o.value === answers[q.id])?.label}`
      )
      .join("\n\n");

    const prompt = `You are an expert learning coach. Create a detailed learning roadmap for "${topic}".

User profile:
${userAnswers}

Return ONLY valid JSON (no markdown) with this exact structure:
{
  "milestones": [
    {
      "title": "Week 1: Foundations",
      "duration_days": 7,
      "tasks": ["Task 1", "Task 2"],
      "resources": ["https://example.com", "https://youtube.com/..."]
    },
    ...
  ]
}`;

    try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash:generateContent?key=${apiKey}`, 
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ role: "user", parts: [{ text: prompt }] }],
          generationConfig: { temperature: 0.7 },
        }),
      }
    );

      if (!res.ok) throw new Error(await res.text());

      const data = await res.json();
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text ?? "";
      const cleaned = text.replace(/```json|```/g, "").trim();
      const parsed = JSON.parse(cleaned);

      const milestones: Milestone[] = parsed.milestones ?? [];

      const newRoadmap: Roadmap = {
        topic,
        level: answers.q1 || "unknown",
        quiz_responses: answers,
        milestones,
      };
      setCurrentRoadmap(newRoadmap);

      /* ---------- Build daily schedule ---------- */
      const sched: ScheduleDay[] = [];
      let day = 1;
      for (const m of milestones) {
        for (let i = 0; i < m.duration_days; i++) {
          sched.push({
            day: day++,
            tasks: m.tasks.map((t) => ({ title: t, completed: false })),
          });
        }
      }
      setSchedule(sched);
      setStep("roadmap");
      toast.success("Roadmap ready!", { id: toastId });

      /* ---------- Persist ---------- */
      await saveRoadmap(newRoadmap, sched);
    } catch (e: any) {
      console.error(e);
      toast.error("Roadmap generation failed", { id: toastId });
      setStep("quiz");
    }
  };

  /* ---------- Save (localStorage) ---------- */
  const saveRoadmap = async (roadmap: Roadmap, sched: ScheduleDay[]) => {
    try {
      const saved = await storage.upsertRoadmap({
        topic: roadmap.topic,
        level: roadmap.level,
        quiz_responses: roadmap.quiz_responses,
        milestones: roadmap.milestones,
      });

      const schedulesToInsert = sched.map((s) => ({
        roadmap_id: saved.id,
        day: s.day,
        tasks: s.tasks,
      }));
      await storage.upsertSchedules(schedulesToInsert);

      toast.success("Saved locally");
      fetchRoadmaps();
    } catch (e: any) {
      toast.error("Save failed: " + e.message);
    }
  };

  /* ---------- Task toggle ---------- */
  const toggleTask = async (dayIdx: number, taskIdx: number) => {
    const day = schedule[dayIdx];
    const newTasks = [...day.tasks];
    newTasks[taskIdx].completed = !newTasks[taskIdx].completed;

    setSchedule((prev) => {
      const copy = [...prev];
      copy[dayIdx] = { ...day, tasks: newTasks };
      return copy;
    });

    if (day.id) {
      await storage.updateSchedule(day.id, newTasks);
    }
  };

  const progress =
    schedule.length === 0
      ? 0
      : Math.round(
          (schedule
            .flatMap((d) => d.tasks.filter((t) => t.completed))
            .length /
            schedule.flatMap((d) => d.tasks).length) *
            100
        );

  /* ---------- Auth guard (Clerk) ---------- */
  if (!authReady || !user) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
            <div className="text-center">
            <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
            <p className="text-lg text-gray-600">Sign in to create roadmaps</p>
            <Button onClick={() => (window.location.href = "/")} className="mt-4">
                Sign In
            </Button>
            </div>
        </div>
        <Footer />
      </div>
    );
  }

  /* ---------- UI ---------- */
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <Navbar />
      <Toaster position="top-center" />
      
      <main className="flex-grow py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          
          {/* Header Section with Back Button */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
            <div className="text-center md:text-left">
                <div className="flex items-center gap-3 justify-center md:justify-start">
                    <Sparkles className="h-8 w-8 text-purple-600" />
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
                        AI Learning Roadmap
                    </h1>
                </div>
                
            </div>


            {/* Top Right Back Button */}
            <Button 
                variant="outline" 
                className="bg-white/80 backdrop-blur-sm border-gray-200 hover:bg-white hover:shadow-md transition-all"
                onClick={() => navigate('/dashboard')}
            >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
            </Button>
          </div>

          {/* ---------- Dashboard ---------- */}
          {step === "dashboard" && (
            <Card className="p-8 shadow-lg bg-white/90 backdrop-blur-sm border-none">
              <h2 className="text-2xl font-bold mb-6 text-gray-800">Your Roadmaps</h2>
              {roadmaps.length === 0 ? (
                <div className="text-center py-10 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
                    <p className="text-gray-500">No roadmaps created yet.</p>
                    <p className="text-sm text-gray-400">Start your learning journey today!</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {roadmaps.map((r) => (
                    <div
                      key={r.id}
                      className="flex justify-between items-center p-4 bg-gray-50 hover:bg-blue-50 transition-colors rounded-lg border border-gray-100"
                    >
                      <div className="flex items-center gap-3">
                        <BookOpen className="h-5 w-5 text-blue-500" />
                        <span className="font-medium text-gray-700">{r.topic}</span>
                      </div>
                      <Button size="sm" onClick={() => loadRoadmap(r.id!)}>
                        Open
                      </Button>
                    </div>
                  ))}
                </div>
              )}
              <Button
                className="w-full mt-8 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white py-6 text-lg shadow-md"
                onClick={() => {
                  setTopic("");
                  setQuizQuestions([]);
                  setAnswers({});
                  setCurrentRoadmap(null);
                  setSchedule([]);
                  setStep("topic");
                }}
              >
                + Create New Roadmap
              </Button>
            </Card>
          )}

          {/* ---------- Topic ---------- */}
          {step === "topic" && (
            <Card className="p-8 shadow-lg">
              <label className="block text-2xl font-bold mb-2 text-gray-800">
                What do you want to learn?
              </label>
              <p className="text-gray-500 mb-6">Enter a skill, technology, or subject (e.g., "React Native", "Organic Chemistry").</p>
              <Input
                placeholder="Ex: Advanced Python for Data Science..."
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && topic.trim() && generateQuiz()}
                autoFocus
                className="text-lg p-6"
              />
              <div className="flex gap-3 mt-6">
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => setStep("dashboard")}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="flex-[2]"
                    onClick={generateQuiz}
                    disabled={!topic.trim() || loading}
                  >
                    {loading ? "Generating..." : "Next"} <ChevronRight className="ml-2" />
                  </Button>
              </div>
            </Card>
          )}

          {/* ---------- Quiz ---------- */}
          {step === "quiz" && (
            <div className="space-y-6">
              {quizQuestions.map((q) => (
                <Card key={q.id} className="p-6 shadow-md border-l-4 border-l-purple-500">
                  <p className="font-semibold text-lg mb-4 text-gray-800">{q.text}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {q.options.map((opt) => (
                      <Button
                        key={opt.value}
                        variant={answers[q.id] === opt.value ? "default" : "outline"}
                        className={`justify-start h-auto py-3 px-4 ${answers[q.id] === opt.value ? 'bg-purple-600 hover:bg-purple-700' : ''}`}
                        onClick={() => setAnswers((a) => ({ ...a, [q.id]: opt.value }))}
                      >
                        {opt.label}
                      </Button>
                    ))}
                  </div>
                </Card>
              ))}
              <div className="flex gap-4">
                 <Button variant="ghost" onClick={() => setStep("topic")}>Back</Button>
                 <Button
                    className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg"
                    size="lg"
                    onClick={generateRoadmap}
                    disabled={Object.keys(answers).length < quizQuestions.length}
                >
                    <Sparkles className="mr-2 h-5 w-5" />
                    Generate Personalized Roadmap
                </Button>
              </div>
            </div>
          )}

          {/* ---------- Generating ---------- */}
          {step === "generating" && (
            <Card className="p-16 text-center shadow-xl animate-pulse">
              <Sparkles className="h-20 w-20 mx-auto mb-6 animate-spin text-purple-600" />
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Crafting your journey...</h3>
              <p className="text-gray-500">Gemini is analyzing your requirements and building a custom schedule.</p>
            </Card>
          )}

          {/* ---------- Roadmap View ---------- */}
          {step === "roadmap" && currentRoadmap && (
            <div className="space-y-6">
              <Card className="p-6 bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg">
                <h2 className="text-3xl font-bold">{currentRoadmap.topic}</h2>
                <div className="flex items-center gap-4 mt-2 opacity-90">
                    <span className="flex items-center gap-1"><Clock className="h-4 w-4"/> {currentRoadmap.milestones.reduce((s, m) => s + m.duration_days, 0)} Days</span>
                    <span>•</span>
                    <span>{currentRoadmap.milestones.length} Milestones</span>
                </div>
              </Card>

              {currentRoadmap.milestones.map((m, i) => (
                <Card key={i} className="p-6 hover:shadow-md transition-shadow">
                  <div className="flex gap-4">
                    <div className="bg-purple-100 text-purple-700 rounded-xl p-3 h-fit">
                      <Calendar className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-800">{m.title}</h3>
                      <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                        <Clock className="h-3 w-3" />
                        Duration: {m.duration_days} days
                      </p>
                      <ul className="mt-4 space-y-2">
                        {m.tasks.map((t, ti) => (
                          <li key={ti} className="flex items-start gap-2 text-gray-700 bg-gray-50 p-2 rounded-md">
                            <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                            <span className="text-sm">{t}</span>
                          </li>
                        ))}
                      </ul>
                      {m.resources.length > 0 && (
                        <div className="mt-4 pt-4 border-t border-gray-100">
                            <p className="text-xs font-semibold text-gray-400 uppercase mb-2">Recommended Resources</p>
                            <div className="flex flex-wrap gap-2">
                            {m.resources.map((r, ri) => (
                                <a
                                key={ri}
                                href={r}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1 text-xs bg-blue-50 text-blue-600 px-3 py-1.5 rounded-full hover:bg-blue-100 transition-colors border border-blue-100"
                                >
                                <BookOpen className="h-3 w-3" />
                                Resource {ri + 1}
                                </a>
                            ))}
                            </div>
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              ))}

              <div className="sticky bottom-4 flex gap-4 justify-center bg-white/80 backdrop-blur-md p-4 rounded-full shadow-lg border border-gray-200 w-fit mx-auto">
                <Button variant="outline" onClick={() => setStep("dashboard")}>
                    <Home className="mr-2 h-4 w-4"/> Dashboard
                </Button>
                <Button onClick={() => setStep("tracking")} className="bg-green-600 hover:bg-green-700 text-white">
                    Start Tracking Progress <ChevronRight className="ml-2 h-4 w-4"/>
                </Button>
              </div>
            </div>
          )}

          {/* ---------- Tracking ---------- */}
          {step === "tracking" && currentRoadmap && (
            <div className="space-y-6">
              <Card className="p-6 sticky top-4 z-10 bg-white/95 backdrop-blur shadow-lg border-purple-100 border">
                <div className="flex justify-between items-end mb-2">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800">{currentRoadmap.topic}</h2>
                        <p className="text-gray-500 text-sm">Daily Tasks Checklist</p>
                    </div>
                    <span className="text-2xl font-bold text-purple-600">{progress}%</span>
                </div>
                <Progress 
  value={progress} 
  className="h-3 bg-gray-100 [&>div]:bg-gradient-to-r [&>div]:from-purple-600 [&>div]:to-indigo-600 [&>div]:rounded-full [&>div]:transition-all" 
/>
              </Card>

              {schedule.map((day, di) => (
                <Card key={day.day} className={`p-6 transition-all ${day.tasks.every(t => t.completed) ? 'bg-green-50 border-green-200' : 'bg-white'}`}>
                  <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                    <span className="bg-gray-800 text-white text-xs px-2 py-1 rounded">Day {day.day}</span>
                    {day.tasks.every(t => t.completed) && <span className="text-green-600 text-sm flex items-center"><CheckCircle2 className="h-4 w-4 mr-1"/> Completed</span>}
                  </h3>
                  <ul className="space-y-3">
                    {day.tasks.map((task, ti) => (
                      <li key={ti} className="flex items-center gap-3 group cursor-pointer" onClick={() => toggleTask(di, ti)}>
                        <div className={`h-6 w-6 rounded-md border-2 flex items-center justify-center transition-colors ${task.completed ? 'bg-purple-600 border-purple-600' : 'border-gray-300 group-hover:border-purple-400'}`}>
                            {task.completed && <CheckCircle2 className="h-4 w-4 text-white" />}
                        </div>
                        <span
                          className={`flex-1 ${task.completed ? "line-through text-gray-400" : "text-gray-700"}`}
                        >
                          {task.title}
                        </span>
                      </li>
                    ))}
                  </ul>
                </Card>
              ))}

              <div className="flex gap-4 justify-center pb-8">
                <Button variant="outline" onClick={() => setStep("roadmap")}>
                  View Full Roadmap
                </Button>
                <Button variant="default" onClick={() => setStep("dashboard")}>
                  Back to Roadmaps
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
// App.tsx
import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/dashboard";
import Home from "./pages/home";
import TestPage from "./pages/test";
import RoadmapGenerator from "./pages/RoadmapGenerator";
import { UserSync } from "./components/user-sync";
import { ProtectedRoute } from "./components/protected-route";
import LearningMockTest from "./pages/Mock_Test";
import MathPage from "./pages/math";
import CheerUp from "./pages/cheer-up";
import StoryBot from "./pages/story-bot";
import VideoGenerator from "./pages/video-generator";
import IdeaHub from "./pages/idea-hub";
import CodeEditorPage from "./pages/code-editor";
import PdfSummary from "./pages/pdf-summary";
import LanguageLearning from "./pages/language-learning";

function App() {
  return (
    <>
      <UserSync />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/test" element={<TestPage />} />

        {/* DASHBOARD */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* Module pages under /dashboard */}
        <Route
          path="/dashboard/cheer-up"
          element={
            <ProtectedRoute>
              <CheerUp />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/story-bot"
          element={
            <ProtectedRoute>
              <StoryBot />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/video-generator"
          element={
            <ProtectedRoute>
              <VideoGenerator />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/idea-hub"
          element={
            <ProtectedRoute>
              <IdeaHub />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/code-editor"
          element={
            <ProtectedRoute>
              <CodeEditorPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/pdf-summary"
          element={
            <ProtectedRoute>
              <PdfSummary />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/language-learning"
          element={
            <ProtectedRoute>
              <LanguageLearning />
            </ProtectedRoute>
          }
        />

          <Route
    path="/dashboard/math"
    element={
      <ProtectedRoute>
        <MathPage />
      </ProtectedRoute>
    }
  />

        {/* Existing pages */}
        <Route
          path="/roadmap"
          element={
            <ProtectedRoute>
              <RoadmapGenerator />
            </ProtectedRoute>
          }
        />
        <Route path="/Mock_Test" element={<LearningMockTest />} />
      </Routes>
    </>
  );
}

export default App;

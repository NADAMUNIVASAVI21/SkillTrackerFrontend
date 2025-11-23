import { Routes, Route, useLocation } from "react-router-dom";

import Landing from "./pages/Landing/Landing.jsx";
import Login from "./pages/Auth/Login.jsx";
import Signup from "./pages/Auth/Signup.jsx";

import Navbar from "./components/Navbar/Navbar.jsx";

// Protected pages
import Tasks from "./pages/Tasks/Tasks.jsx";
import ResourceHub from "./pages/ResourceHub/ResourceHub.jsx";
import SkillTracker from "./pages/SkillTracker/SkillTracker.jsx";
import MockInterview from "./pages/MockInterview/MockInterview.jsx";
import AIBot from "./pages/AIBot/AIBot.jsx";

import ProtectedRoute from "./routes/ProtectedRoute.jsx";

function App() {
  const location = useLocation();

  // Show navbar only on protected pages
  const hideNavbar =
    location.pathname === "/" ||
    location.pathname === "/login" ||
    location.pathname === "/signup";

  return (
    <>
      {/* Navbar only when user is logged in */}
      {!hideNavbar && <Navbar />}

      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected routes */}
        <Route
          path="/tasks"
          element={
            <ProtectedRoute>
              <Tasks />
            </ProtectedRoute>
          }
        />

        <Route
          path="/resource-hub"
          element={
            <ProtectedRoute>
              <ResourceHub />
            </ProtectedRoute>
          }
        />

        <Route
          path="/skill-tracker"
          element={
            <ProtectedRoute>
              <SkillTracker />
            </ProtectedRoute>
          }
        />

        <Route
          path="/mock-interview"
          element={
            <ProtectedRoute>
              <MockInterview />
            </ProtectedRoute>
          }
        />

        <Route
          path="/ai-bot"
          element={
            <ProtectedRoute>
              <AIBot />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;

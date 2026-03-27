import { BrowserRouter, Routes, Route } from "react-router-dom";

// Public
import Home from "./pages/public/Home";
import About from "./pages/public/About";
import Features from "./pages/public/Features";
import Contact from "./pages/public/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";

// Student
import StudentDashboard from "./pages/student/StudentDashboard";
import SendFile from "./pages/student/SendFile";
import ReceivedFiles from "./pages/student/ReceivedFiles";
import History from "./pages/student/History";
import Profile from "./pages/student/Profile";

// Admin
import AdminDashboard from "./pages/admin/AdminDashboard";
import Broadcast from "./pages/admin/Broadcast";
import Users from "./pages/admin/Users";
import Logs from "./pages/admin/Logs";
import AdminProfile from "./pages/admin/Profile";


// Protection
import ProtectedRoute from "./routes/ProtectedRoute";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/features" element={<Features />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Student */}
        <Route
          path="/student/dashboard"
          element={
            <ProtectedRoute role="Student">
              <StudentDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/send"
          element={
            <ProtectedRoute role="Student">
              <SendFile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/received"
          element={
            <ProtectedRoute role="Student">
              <ReceivedFiles />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/history"
          element={
            <ProtectedRoute role="Student">
              <History />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/profile"
          element={
            <ProtectedRoute role="Student">
              <Profile />
            </ProtectedRoute>
          }
        />

        {/* Admin */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute role="Admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/broadcast"
          element={
            <ProtectedRoute role="Admin">
              <Broadcast />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/users"
          element={
            <ProtectedRoute role="Admin">
              <Users />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/logs"
          element={
            <ProtectedRoute role="Admin">
              <Logs />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/profile"
          element={
            <ProtectedRoute role="Admin">
              <AdminProfile />
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

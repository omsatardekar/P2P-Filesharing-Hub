import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_BASE } from "../config";

export default function Register() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    role: "Student"
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const register = async () => {
    setError("");

    if (!form.username || !form.email || !form.password) {
      setError("All fields are required");
      return;
    }

    try {
      setLoading(true);
      await axios.post(`${API_BASE}/api/auth/register`, form);
      window.location.href = "/login";
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-6
      bg-gradient-to-br from-[#f3e6dc] via-[#ead8cb] to-[#dcc5b6]
      relative overflow-hidden"
    >
      {/* Ambient background glow */}
      <div className="absolute -top-40 -left-40 w-[30rem] h-[30rem] bg-[#d6a58a]/30 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-40 -right-40 w-[30rem] h-[30rem] bg-[#c48bbd]/25 rounded-full blur-3xl"></div>

      <div className="relative w-full max-w-4xl rounded-3xl shadow-2xl grid md:grid-cols-2 overflow-hidden">

        {/* LEFT BRAND PANEL */}
        <div className="hidden md:flex flex-col justify-center 
          bg-gradient-to-br from-[#1a0b10] via-[#2a1018] to-[#120709]
          text-white p-12">
          <h1 className="text-4xl font-extrabold mb-4">
            P2P File Share
          </h1>
          <p className="text-lg text-white/80">
            Create your account to securely share files
            within controlled academic environments.
          </p>
        </div>

        {/* RIGHT REGISTER FORM */}
        <div className="bg-[#140d10]/95 backdrop-blur-xl p-10 text-white">
          <Link
            to="/"
            className="text-rose-300 text-sm font-medium hover:underline"
          >
            ← Back to Home
          </Link>

          <h2 className="text-3xl font-extrabold mt-6 mb-2">
            Create Account
          </h2>
          <p className="text-white/70 mb-8">
            Register to access the platform
          </p>

          {error && (
            <div className="bg-red-500/20 text-red-300 p-3 rounded mb-4">
              {error}
            </div>
          )}

          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium mb-1 text-white/80">
                Username
              </label>
              <input
                className="w-full bg-white/10 border border-white/20 p-3 rounded-lg
                focus:outline-none focus:ring-2 focus:ring-rose-400 text-white"
                placeholder="Choose a username"
                value={form.username}
                onChange={(e) =>
                  setForm({ ...form, username: e.target.value })
                }
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-white/80">
                Email
              </label>
              <input
                type="email"
                className="w-full bg-white/10 border border-white/20 p-3 rounded-lg
                focus:outline-none focus:ring-2 focus:ring-rose-400 text-white"
                placeholder="Enter your email"
                value={form.email}
                onChange={(e) =>
                  setForm({ ...form, email: e.target.value })
                }
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-white/80">
                Password
              </label>
              <input
                type="password"
                className="w-full bg-white/10 border border-white/20 p-3 rounded-lg
                focus:outline-none focus:ring-2 focus:ring-rose-400 text-white"
                placeholder="Create a password"
                value={form.password}
                onChange={(e) =>
                  setForm({ ...form, password: e.target.value })
                }
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-white/80">
                Role
              </label>
              <select
                className="w-full bg-white/10 border border-white/20 p-3 rounded-lg
                focus:outline-none focus:ring-2 focus:ring-rose-400 text-white"
                value={form.role}
                onChange={(e) =>
                  setForm({ ...form, role: e.target.value })
                }
              >
                <option className="text-black" value="Student">Student</option>
                <option className="text-black" value="Admin">Admin</option>
              </select>
            </div>

            <button
              onClick={register}
              disabled={loading}
              className={`w-full py-3 rounded-xl font-semibold transition shadow-lg ${
                loading
                  ? "bg-rose-400/50 cursor-not-allowed"
                  : "bg-gradient-to-r from-rose-500 to-pink-600 hover:opacity-90"
              }`}
            >
              {loading ? "Creating account..." : "Register"}
            </button>
          </div>

          <p className="text-sm mt-6 text-center text-white/70">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-rose-300 font-medium hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

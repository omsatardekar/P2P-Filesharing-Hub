import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { API_BASE } from "../config";

export default function Login() {
  const [form, setForm] = useState({
    username: "",
    password: ""
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { loginSuccess } = useAuth();

  const login = async () => {
    setError("");

    if (!form.username || !form.password) {
      setError("Please enter username and password");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(
        `${API_BASE}/api/auth/login`,
        form
      );

      loginSuccess(res.data);

      if (res.data.role === "Admin") {
        window.location.href = "/admin/dashboard";
      } else {
        window.location.href = "/student/dashboard";
      }
    } catch (err) {
      setError(err.response?.data?.error || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 
  bg-gradient-to-br from-[#f3e6dc] via-[#ead8cb] to-[#dcc5b6] 
  relative overflow-hidden">


      {/* Ambient Background */}
      <div className="absolute -top-40 -left-40 w-[30rem] h-[30rem] 
        bg-pink-500/15 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-40 -right-40 w-[30rem] h-[30rem] 
        bg-purple-600/15 rounded-full blur-3xl"></div>

      <div className="relative w-full max-w-5xl grid md:grid-cols-2 gap-0 
        rounded-[32px] overflow-hidden shadow-2xl">

        {/* LEFT BRAND PANEL */}
        <div className="hidden md:flex flex-col justify-center p-14 
          bg-gradient-to-br from-[#1a0b10] via-[#2a1018] to-[#120709] 
          text-white border-r border-white/10">

          <span className="inline-flex items-center gap-2 mb-6 px-5 py-2 
            rounded-full bg-white/5 border border-white/10 text-sm w-fit">
            <span className="material-symbols-outlined text-base">
              science
            </span>
            Secure Lab Platform
          </span>

          <h1 className="text-4xl font-extrabold mb-6 leading-tight">
            P2P File Sharing
            <br />
            <span className="bg-gradient-to-r from-[#f29ca3] to-[#b77cff] 
              bg-clip-text text-transparent">
              for Smart Campuses
            </span>
          </h1>

          <p className="text-white/70 text-lg max-w-md">
            Enterprise-grade peer-to-peer file sharing designed
            specifically for academic laboratory environments.
          </p>

          <div className="mt-10 space-y-4 text-white/60">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-[#f29ca3]">
                lock
              </span>
              Secure role-based authentication
            </div>
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-[#b77cff]">
                lan
              </span>
              LAN-optimized infrastructure
            </div>
          </div>
        </div>

        {/* RIGHT LOGIN FORM */}
        <div className="group p-[1px] 
          bg-gradient-to-br from-[#f29ca3]/40 to-[#b77cff]/40">

          <div className="h-full bg-[#0f0a0d]/95 
            p-12 border border-white/10">

            <Link
              to="/"
              className="text-sm text-white/50 hover:text-white transition"
            >
              ← Back to Home
            </Link>

            <h2 className="text-3xl font-extrabold text-white mt-8 mb-2">
              Welcome Back
            </h2>
            <p className="text-white/60 mb-10">
              Login to continue to your dashboard
            </p>

            {error && (
              <div className="bg-red-500/10 border border-red-500/30 
                text-red-300 p-3 rounded-lg mb-6 text-sm">
                {error}
              </div>
            )}

            <div className="space-y-6">
              {/* Username */}
              <div>
                <label className="block text-sm text-white/60 mb-1">
                  Username
                </label>
                <input
                  className="w-full px-4 py-4 rounded-xl 
                    bg-black/40 border border-white/10 
                    text-white placeholder-white/30 
                    focus:outline-none focus:ring-2 
                    focus:ring-[#f29ca3]"
                  placeholder="Enter your username"
                  value={form.username}
                  onChange={(e) =>
                    setForm({ ...form, username: e.target.value })
                  }
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm text-white/60 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  className="w-full px-4 py-4 rounded-xl 
                    bg-black/40 border border-white/10 
                    text-white placeholder-white/30 
                    focus:outline-none focus:ring-2 
                    focus:ring-[#b77cff]"
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                />
              </div>

              {/* Button */}
              <button
                onClick={login}
                disabled={loading}
                className={`w-full py-4 rounded-xl font-semibold text-lg 
                  transition shadow-lg ${
                    loading? "bg-white/10 text-white/40 cursor-not-allowed": "bg-gradient-to-r from-[#f29ca3] to-[#b77cff] text-black hover:opacity-90 hover:shadow-xl"
                  }`}
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </div>

            <p className="text-sm mt-8 text-center text-white/60">
              New user?{" "}
              <Link
                to="/register"
                className="text-[#f29ca3] hover:underline font-medium"
              >
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

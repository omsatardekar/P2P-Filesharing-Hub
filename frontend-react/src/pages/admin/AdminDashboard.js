import { useEffect, useState } from "react";
import axios from "axios";
import AdminLayout from "./AdminLayout";
import useOnlineUsers from "../../hooks/useOnlineUsers";
import { API_BASE } from "../../config";

export default function AdminDashboard() {
  const onlineUsers = useOnlineUsers();
  const [totalUsers, setTotalUsers] = useState(0);

  const adminsOnline = onlineUsers.filter(
    (u) => u.role === "Admin"
  );
  const studentsOnline = onlineUsers.filter(
    (u) => u.role === "Student"
  );

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get(
          `${API_BASE}/api/admin/stats`
        );
        setTotalUsers(res.data.totalUsers);
      } catch (err) {
        console.error("Failed to load admin stats");
      }
    };

    fetchStats();
  }, []);

  return (
    <AdminLayout>
      {/* ================= HEADER ================= */}
      <div className="mb-12">
        <h1 className="text-4xl font-extrabold text-slate-800 mb-2">
          Admin Dashboard
        </h1>
        <p className="text-slate-500">
          System overview and real-time user activity
        </p>
      </div>

      {/* ================= STATS ================= */}
      <div className="grid md:grid-cols-3 gap-8 mb-14">
        {/* TOTAL USERS */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-700 to-slate-900 text-white p-8 shadow-lg ring-1 ring-white/20 hover:-translate-y-1 transition">
          <div className="absolute top-4 right-4 opacity-20 text-6xl">
            <span className="material-symbols-outlined">group</span>
          </div>
          <p className="text-sm uppercase tracking-wide opacity-90">
            Total Users
          </p>
          <p className="text-5xl font-extrabold mt-4">
            {totalUsers}
          </p>
        </div>

        {/* ONLINE STUDENTS */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 text-white p-8 shadow-lg ring-1 ring-white/20 hover:-translate-y-1 transition">
          <div className="absolute top-4 right-4 opacity-20 text-6xl">
            <span className="material-symbols-outlined">school</span>
          </div>
          <p className="text-sm uppercase tracking-wide opacity-90">
            Online Students
          </p>
          <p className="text-5xl font-extrabold mt-4">
            {studentsOnline.length}
          </p>
        </div>

        {/* ONLINE ADMINS */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 text-white p-8 shadow-lg ring-1 ring-white/20 hover:-translate-y-1 transition">
          <div className="absolute top-4 right-4 opacity-20 text-6xl">
            <span className="material-symbols-outlined">
              admin_panel_settings
            </span>
          </div>
          <p className="text-sm uppercase tracking-wide opacity-90">
            Online Admins
          </p>
          <p className="text-5xl font-extrabold mt-4">
            {adminsOnline.length}
          </p>
        </div>
      </div>

      {/* ================= ONLINE USERS ================= */}
      <div className="grid md:grid-cols-2 gap-10">
        {/* LIST */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-200">
          <div className="flex items-center gap-3 mb-6">
            <span className="material-symbols-outlined text-indigo-600">
              wifi
            </span>
            <h3 className="text-xl font-bold text-slate-800">
              Online Users
            </h3>
          </div>

          {onlineUsers.length === 0 ? (
            <div className="text-center text-slate-500 py-10">
              <span className="material-symbols-outlined text-5xl mb-3 block opacity-30">
                person_off
              </span>
              No users currently online
            </div>
          ) : (
            <ul className="space-y-4">
              {onlineUsers.map((u) => (
                <li
                  key={u.username}
                  className="flex items-center justify-between p-4 rounded-xl border border-slate-200 hover:bg-slate-50 transition"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600">
                      <span className="material-symbols-outlined text-sm">
                        person
                      </span>
                    </div>
                    <span className="font-medium text-slate-800">
                      {u.username}
                    </span>
                  </div>

                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-100 text-slate-600">
                    {u.role}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* INFO / STATUS CARD */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 text-white p-10 shadow-xl">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-indigo-500 rounded-full blur-3xl opacity-20"></div>

          <span className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-white/10 text-sm font-semibold">
            <span className="material-symbols-outlined text-base">
              info
            </span>
            System Status
          </span>

          <h3 className="text-2xl font-extrabold mb-4">
            System Operational
          </h3>

          <p className="text-slate-300 leading-relaxed mb-8">
            All services are running normally. Socket connections,
            WebRTC signaling, and file transfers are active.
          </p>

          <ul className="space-y-4 text-slate-200">
            <li className="flex items-center gap-3">
              <span className="material-symbols-outlined text-emerald-400">
                check_circle
              </span>
              Server & Socket healthy
            </li>
            <li className="flex items-center gap-3">
              <span className="material-symbols-outlined text-emerald-400">
                sync
              </span>
              Real-time user tracking
            </li>
            <li className="flex items-center gap-3">
              <span className="material-symbols-outlined text-emerald-400">
                security
              </span>
              Secure role-based access
            </li>
          </ul>
        </div>
      </div>
    </AdminLayout>
  );
}

import { useEffect, useState } from "react";
import axios from "axios";
import AdminLayout from "./AdminLayout";
import useOnlineUsers from "../../hooks/useOnlineUsers";
import { API_BASE } from "../../config";

export default function Users() {
  const [users, setUsers] = useState([]);
  const onlineUsers = useOnlineUsers();

  // Online lookup (UNCHANGED)
  const onlineMap = new Set(
    onlineUsers.map((u) => u.username)
  );

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(
          `${API_BASE}/api/admin/users`
        );
        setUsers(res.data);
      } catch (err) {
        console.error("Failed to load users");
      }
    };

    fetchUsers();
  }, []);

  return (
    <AdminLayout>
      {/* ================= HEADER ================= */}
      <div className="mb-12">
        <h1 className="text-4xl font-extrabold text-slate-800 mb-2">
          User Management
        </h1>
        <p className="text-slate-500">
          Monitor registered users and live online status
        </p>
      </div>

      {/* ================= USERS CARD ================= */}
      <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
        {/* TABLE HEADER */}
        <div className="px-8 py-6 border-b border-slate-200 flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-800">
            All Users
          </h2>
          <span className="text-sm text-slate-500">
            Total: {users.length}
          </span>
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 text-slate-600 text-sm uppercase tracking-wide">
              <tr>
                <th className="px-8 py-4 text-left">User</th>
                <th className="px-6 py-4 text-left">Role</th>
                <th className="px-6 py-4 text-left">Status</th>
                <th className="px-6 py-4 text-left">Joined</th>
              </tr>
            </thead>

            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td
                    colSpan="4"
                    className="py-16 text-center text-slate-500"
                  >
                    <span className="material-symbols-outlined text-5xl mb-4 block opacity-30">
                      group_off
                    </span>
                    No users found
                  </td>
                </tr>
              ) : (
                users.map((u) => {
                  const isOnline = onlineMap.has(u.username);

                  return (
                    <tr
                      key={u._id}
                      className="border-t border-slate-200 hover:bg-slate-50 transition"
                    >
                      {/* USER */}
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-4">
                          <div className="w-11 h-11 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-600">
                            {u.username.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <p className="font-semibold text-slate-800">
                              {u.username}
                            </p>
                            <p className="text-xs text-slate-500">
                              ID: {u._id.slice(-6)}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* ROLE */}
                      <td className="px-6 py-5">
                        <span
                          className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold ${
                            u.role === "Admin"
                              ? "bg-red-100 text-red-700"
                              : "bg-indigo-100 text-indigo-700"
                          }`}
                        >
                          <span className="material-symbols-outlined text-sm">
                            {u.role === "Admin"
                              ? "admin_panel_settings"
                              : "school"}
                          </span>
                          {u.role}
                        </span>
                      </td>

                      {/* STATUS */}
                      <td className="px-6 py-5">
                        <span
                          className={`inline-flex items-center gap-2 text-sm font-semibold ${
                            isOnline
                              ? "text-emerald-600"
                              : "text-slate-500"
                          }`}
                        >
                          <span
                            className={`w-2 h-2 rounded-full ${
                              isOnline
                                ? "bg-emerald-500"
                                : "bg-slate-400"
                            }`}
                          ></span>
                          {isOnline ? "Online" : "Offline"}
                        </span>
                      </td>

                      {/* DATE */}
                      <td className="px-6 py-5 text-slate-500 text-sm">
                        {new Date(
                          u.createdAt
                        ).toLocaleDateString()}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}

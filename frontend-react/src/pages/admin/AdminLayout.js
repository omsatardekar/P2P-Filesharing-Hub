import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function AdminLayout({ children }) {
  const { logout, user } = useAuth();

  const menu = [
    {
      name: "Dashboard",
      path: "/admin/dashboard",
      icon: "dashboard"
    },
    {
      name: "Broadcast",
      path: "/admin/broadcast",
      icon: "campaign"
    },
    {
      name: "Users",
      path: "/admin/users",
      icon: "group"
    },
    {
      name: "Logs",
      path: "/admin/logs",
      icon: "receipt_long"
    },
    {
      name: "Profile",
      path: "/admin/profile",
      icon: "person"
    }
  ];

  return (
    <div className="flex min-h-screen bg-slate-100">
      {/* ================= SIDEBAR ================= */}
      <aside className="w-64 bg-slate-900 text-slate-100 flex flex-col p-6">
        {/* BRAND */}
        <div className="mb-10">
          <h2 className="text-2xl font-extrabold tracking-tight">
            Admin Panel
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            System Control Center
          </p>
        </div>

        {/* MENU */}
        <ul className="space-y-2 flex-1">
          {menu.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition ${
                    isActive
                      ? "bg-slate-800 text-white shadow"
                      : "text-slate-300 hover:bg-slate-800 hover:text-white"
                  }`
                }
              >
                <span className="material-symbols-outlined text-lg">
                  {item.icon}
                </span>
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* ================= FOOTER (LOGOUT) ================= */}
        <div className="pt-6 border-t border-slate-800">
          <div className="mb-4">
            <p className="text-xs text-slate-400">
              Logged in as
            </p>
            <p className="font-semibold text-slate-200">
              {user?.username}
            </p>
          </div>

          <button
            onClick={logout}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-slate-800 text-white hover:bg-slate-700 transition"
          >
            <span className="material-symbols-outlined text-sm">
              logout
            </span>
            Logout
          </button>
        </div>
      </aside>

      {/* ================= MAIN ================= */}
      <div className="flex-1">
        <main className="p-8">{children}</main>
      </div>
    </div>
  );
}

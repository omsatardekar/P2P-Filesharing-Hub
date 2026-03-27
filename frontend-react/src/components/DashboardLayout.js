import { useAuth } from "../context/AuthContext";

export default function DashboardLayout({ title, menu, children }) {
  const { logout, user } = useAuth();

  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside className="w-64 bg-gray-900 text-white p-6">
        <h2 className="text-xl font-bold mb-6">{title}</h2>
        <ul className="space-y-3">
          {menu.map((item) => (
            <li key={item} className="hover:text-blue-400 cursor-pointer">
              {item}
            </li>
          ))}
        </ul>
      </aside>

      <main className="flex-1">
        <header className="flex justify-between items-center bg-white p-4 shadow">
          <span className="font-medium">Welcome, {user.username}</span>
          <button
            onClick={logout}
            className="bg-red-600 text-white px-4 py-1 rounded"
          >
            Logout
          </button>
        </header>

        <div className="p-8">{children}</div>
      </main>
    </div>
  );
}

import { useEffect, useState, useMemo } from "react";
import StudentLayout from "./StudentLayout";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import { API_BASE } from "../../config";

export default function History() {
  const { user } = useAuth();
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all"); // all | sent | received

  useEffect(() => {
    if (!user) return;

    axios
      .get(`${API_BASE}/api/transfers/history/${user.username}`)
      .then((res) => setHistory(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [user]);

  // -----------------------------
  // DERIVED DATA
  // -----------------------------
  const filteredHistory = useMemo(() => {
    return history.filter((h) => {
      const matchSearch = h.filename
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchFilter =
        filter === "all" || h.role === filter;

      return matchSearch && matchFilter;
    });
  }, [history, search, filter]);

  const sentCount = history.filter((h) => h.role === "sent").length;
  const receivedCount = history.filter((h) => h.role === "received").length;

  const getFileIcon = (name) => {
    if (name.endsWith(".pdf")) return "picture_as_pdf";
    if (name.endsWith(".zip")) return "folder_zip";
    if (name.endsWith(".jpg") || name.endsWith(".png"))
      return "image";
    if (name.endsWith(".xlsx") || name.endsWith(".csv"))
      return "table_chart";
    return "description";
  };

  return (
    <StudentLayout>
      {/* ================= HEADER ================= */}
      <div className="max-w-6xl mx-auto mb-12">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-2">
          Transfer History
        </h1>
        <p className="text-gray-500">
          Complete record of sent and received files
        </p>
      </div>

      {/* ================= STATS ================= */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white rounded-2xl shadow p-6">
          <p className="text-sm text-gray-500">Total Transfers</p>
          <p className="text-3xl font-extrabold text-gray-800">
            {history.length}
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow p-6">
          <p className="text-sm text-gray-500">Sent</p>
          <p className="text-3xl font-extrabold text-gray-800">
            {sentCount}
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow p-6">
          <p className="text-sm text-gray-500">Received</p>
          <p className="text-3xl font-extrabold text-gray-800">
            {receivedCount}
          </p>
        </div>
      </div>

      {/* ================= HISTORY LIST ================= */}
      <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-xl p-8">
        {/* SEARCH + FILTER */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <span className="material-symbols-outlined absolute left-3 top-3 text-gray-400">
              search
            </span>
            <input
              placeholder="Search by filename..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>

          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border rounded-xl px-4 py-3"
          >
            <option value="all">All</option>
            <option value="sent">Sent</option>
            <option value="received">Received</option>
          </select>
        </div>

        {/* LOADING */}
        {loading && (
          <div className="text-center py-20 text-gray-500">
            Loading history...
          </div>
        )}

        {/* EMPTY */}
        {!loading && filteredHistory.length === 0 && (
          <div className="text-center py-20 text-gray-500">
            <span className="material-symbols-outlined text-6xl mb-4 block opacity-30">
              history
            </span>
            No transfer history found
          </div>
        )}

        {/* HISTORY CARDS */}
        <div className="space-y-4">
          {filteredHistory.map((item) => (
            <div
              key={item._id}
              className="flex items-center justify-between p-5 border rounded-2xl hover:bg-gray-50 transition"
            >
              {/* LEFT */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center">
                  <span className="material-symbols-outlined text-indigo-600">
                    {getFileIcon(item.filename)}
                  </span>
                </div>

                <div>
                  <p className="font-semibold text-gray-800">
                    {item.filename}
                  </p>
                  <p className="text-sm text-gray-500">
                    {item.role === "sent"
                      ? `Sent to ${item.receiver}`
                      : `Received from ${item.sender}`}
                  </p>
                </div>
              </div>

              {/* RIGHT */}
              <div className="text-right">
                <span
                  className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${
                    item.role === "sent"
                      ? "bg-indigo-50 text-indigo-600"
                      : "bg-emerald-50 text-emerald-600"
                  }`}
                >
                  <span className="material-symbols-outlined text-xs">
                    {item.role === "sent" ? "north_east" : "south_west"}
                  </span>
                  {item.role === "sent" ? "Sent" : "Received"}
                </span>

                <p className="text-sm mt-2 text-gray-600">
                  {(item.size / 1024 / 1024).toFixed(2)} MB
                </p>
                <p className="text-xs text-gray-400">
                  {new Date(item.createdAt).toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </StudentLayout>
  );
}

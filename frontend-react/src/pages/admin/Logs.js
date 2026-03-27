import { useEffect, useMemo, useState } from "react";
import AdminLayout from "./AdminLayout";
import axios from "axios";
import { API_BASE } from "../../config";

export default function Logs() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters (UNCHANGED)
  const [roleFilter, setRoleFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [userFilter, setUserFilter] = useState("");

  /* ================= FETCH LOGS ================= */
  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const res = await axios.get(
          `${API_BASE}/api/transfers/logs`
        );

        const normalized = res.data.map((l) => ({
          ...l,
          transferType: l.transferType || "direct"
        }));

        setLogs(normalized);
      } catch (err) {
        console.error("Failed to fetch logs", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLogs();
  }, []);

  /* ================= FILTER LOGIC ================= */
  const filteredLogs = useMemo(() => {
    return logs.filter((log) => {
      const roleMatch =
        roleFilter === "all" || log.role === roleFilter;

      const typeMatch =
        typeFilter === "all" ||
        log.transferType === typeFilter;

      const userMatch =
        userFilter === "" ||
        log.sender?.toLowerCase().includes(userFilter.toLowerCase()) ||
        log.receiver?.toLowerCase().includes(userFilter.toLowerCase());

      return roleMatch && typeMatch && userMatch;
    });
  }, [logs, roleFilter, typeFilter, userFilter]);

  /* ================= CSV EXPORT ================= */
  const csvEscape = (value) => {
    if (value === null || value === undefined) return "-";
    const str = String(value);
    return `"${str.replace(/"/g, '""')}"`;
  };

  const exportCSV = () => {
    const header = [
      "Filename",
      "Sender",
      "Receiver",
      "Role",
      "Transfer Type",
      "Socket ID",
      "IP Address",
      "Date"
    ];

    const rows = filteredLogs.map((l) => [
      csvEscape(l.filename),
      csvEscape(l.sender),
      csvEscape(l.receiver),
      csvEscape(l.role),
      csvEscape(l.transferType),
      csvEscape(l.socketId),
      csvEscape(l.ip),
      csvEscape(new Date(l.createdAt).toLocaleString())
    ]);

    const csv = [header, ...rows]
      .map((r) => r.join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "system_logs.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <AdminLayout>
      {/* ================= HEADER ================= */}
      <div className="mb-12">
        <h1 className="text-4xl font-extrabold text-slate-800 mb-2">
          System Logs
        </h1>
        <p className="text-slate-500">
          Detailed audit trail of file transfers and system activity
        </p>
      </div>

      {/* ================= FILTER CARD ================= */}
      <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 mb-8">
        <div className="grid md:grid-cols-4 gap-4 items-end">
          {/* ACTION */}
          <div>
            <label className="text-xs font-semibold text-slate-500 uppercase">
              Action
            </label>
            <select
              className="w-full mt-1 border rounded-xl p-2"
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
            >
              <option value="all">All</option>
              <option value="sent">Sent</option>
              <option value="received">Received</option>
            </select>
          </div>

          {/* TYPE */}
          <div>
            <label className="text-xs font-semibold text-slate-500 uppercase">
              Transfer Type
            </label>
            <select
              className="w-full mt-1 border rounded-xl p-2"
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
            >
              <option value="all">All</option>
              <option value="direct">Direct</option>
              <option value="broadcast">Broadcast</option>
            </select>
          </div>

          {/* SEARCH */}
          <div>
            <label className="text-xs font-semibold text-slate-500 uppercase">
              User Search
            </label>
            <input
              type="text"
              placeholder="Sender or Receiver"
              className="w-full mt-1 border rounded-xl p-2"
              value={userFilter}
              onChange={(e) => setUserFilter(e.target.value)}
            />
          </div>

          {/* EXPORT */}
          <button
            onClick={exportCSV}
            className="h-[42px] rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined text-sm">
              download
            </span>
            Export CSV
          </button>
        </div>
      </div>

      {/* ================= LOG TABLE ================= */}
      <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto max-h-[70vh]">
          <table className="w-full text-sm">
            <thead className="sticky top-0 bg-slate-50 border-b border-slate-200">
              <tr className="text-slate-600 uppercase text-xs tracking-wide">
                <th className="px-6 py-4 text-left">File</th>
                <th className="px-4 py-4 text-left">Sender</th>
                <th className="px-4 py-4 text-left">Receiver</th>
                <th className="px-4 py-4 text-left">Action</th>
                <th className="px-4 py-4 text-left">Type</th>
                <th className="px-4 py-4 text-left">Socket</th>
                <th className="px-4 py-4 text-left">IP</th>
                <th className="px-6 py-4 text-left">Time</th>
              </tr>
            </thead>

            <tbody>
              {loading && (
                <tr>
                  <td
                    colSpan="8"
                    className="py-16 text-center text-slate-500"
                  >
                    Loading system logs...
                  </td>
                </tr>
              )}

              {!loading && filteredLogs.length === 0 && (
                <tr>
                  <td
                    colSpan="8"
                    className="py-16 text-center text-slate-500"
                  >
                    No logs match the selected filters
                  </td>
                </tr>
              )}

              {filteredLogs.map((log) => (
                <tr
                  key={log._id}
                  className="border-t border-slate-200 hover:bg-slate-50 transition"
                >
                  <td className="px-6 py-4 font-medium">
                    {log.filename}
                  </td>
                  <td className="px-4 py-4">
                    {log.sender || "-"}
                  </td>
                  <td className="px-4 py-4">
                    {log.receiver || "-"}
                  </td>

                  <td className="px-4 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        log.role === "sent"
                          ? "bg-indigo-100 text-indigo-700"
                          : "bg-emerald-100 text-emerald-700"
                      }`}
                    >
                      {log.role}
                    </span>
                  </td>

                  <td className="px-4 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        log.transferType === "broadcast"
                          ? "bg-purple-100 text-purple-700"
                          : "bg-slate-200 text-slate-700"
                      }`}
                    >
                      {log.transferType}
                    </span>
                  </td>

                  <td className="px-4 py-4 text-xs text-slate-500">
                    {log.socketId || "-"}
                  </td>

                  <td className="px-4 py-4 text-xs text-slate-500">
                    {log.ip || "-"}
                  </td>

                  <td className="px-6 py-4 text-slate-600">
                    {new Date(log.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}

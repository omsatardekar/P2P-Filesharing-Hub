import { useEffect, useState, useMemo } from "react";
import StudentLayout from "./StudentLayout";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import { API_BASE } from "../../config";

export default function ReceivedFiles() {
  const { user } = useAuth();
  const [files, setFiles] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios
      .get(`${API_BASE}/api/transfers/received/${user.username}`)
      .then((res) => setFiles(res.data));
  }, [user.username]);

  // ---------------------------
  // DERIVED DATA
  // ---------------------------
  const filteredFiles = useMemo(() => {
    return files.filter((f) =>
      f.filename.toLowerCase().includes(search.toLowerCase())
    );
  }, [files, search]);

  const totalSizeMB = useMemo(() => {
    return (
      files.reduce((acc, f) => acc + f.size, 0) /
      1024 /
      1024
    ).toFixed(2);
  }, [files]);

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
          Received Files
        </h1>
        <p className="text-gray-500">
          Files you’ve received from peers or administrators
        </p>
      </div>

      {/* ================= STATS ================= */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white rounded-2xl shadow p-6">
          <p className="text-sm text-gray-500">Total Files</p>
          <p className="text-3xl font-extrabold text-gray-800">
            {files.length}
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow p-6">
          <p className="text-sm text-gray-500">Total Size</p>
          <p className="text-3xl font-extrabold text-gray-800">
            {totalSizeMB} MB
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow p-6 flex items-center">
          <span className="material-symbols-outlined text-indigo-600 mr-3">
            inbox
          </span>
          <p className="text-gray-600">
            Secure P2P transfers only
          </p>
        </div>
      </div>

      {/* ================= FILE LIST ================= */}
      <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-xl p-8">
        {/* SEARCH */}
        <div className="mb-6">
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-3 text-gray-400">
              search
            </span>
            <input
              placeholder="Search files..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>
        </div>

        {/* EMPTY STATE */}
        {filteredFiles.length === 0 && (
          <div className="text-center py-20 text-gray-500">
            <span className="material-symbols-outlined text-6xl mb-4 block opacity-30">
              inbox
            </span>
            No received files found
          </div>
        )}

        {/* FILE CARDS */}
        <div className="space-y-4">
          {filteredFiles.map((f) => (
            <div
              key={f._id}
              className="flex items-center justify-between p-5 border rounded-2xl hover:bg-gray-50 transition"
            >
              {/* LEFT */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center">
                  <span className="material-symbols-outlined text-indigo-600">
                    {getFileIcon(f.filename)}
                  </span>
                </div>

                <div>
                  <p className="font-semibold text-gray-800">
                    {f.filename}
                  </p>
                  <p className="text-sm text-gray-500">
                    From {f.sender}
                  </p>
                </div>
              </div>

              {/* RIGHT */}
              <div className="text-right">
                <p className="text-sm font-medium text-gray-700">
                  {(f.size / 1024 / 1024).toFixed(2)} MB
                </p>
                <p className="text-xs text-gray-400">
                  {new Date(f.createdAt).toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </StudentLayout>
  );
}

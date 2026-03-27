import { useEffect, useState } from "react";
import AdminLayout from "./AdminLayout";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import { API_BASE } from "../../config";

export default function Profile() {
  const { user } = useAuth();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    oldPassword: "",
    newPassword: ""
  });

  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  /* ================= LOAD PROFILE ================= */
  useEffect(() => {
    if (!user?.username) return;

    axios
      .get(`${API_BASE}/api/users/profile/${user.username}`)
      .then((res) => {
        setForm((prev) => ({
          ...prev,
          fullName: res.data.fullName || "",
          email: res.data.email || ""
        }));

        if (res.data.avatar) {
          setPreview(res.data.avatar);
        }
      })
      .catch(() => setError("Failed to load profile"));
  }, [user]);

  /* ================= AVATAR CHANGE ================= */
  const onAvatarChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result);
    reader.readAsDataURL(file);
  };

  /* ================= UPDATE PROFILE ================= */
  const updateProfile = async () => {
    setError("");
    setMessage("");

    try {
      setLoading(true);

      // 1️⃣ Update profile (NO password here)
      await axios.put(
        `${API_BASE}/api/users/profile/${user.username}`,
        {
          fullName: form.fullName,
          email: form.email,
          avatar: preview
        }
      );

      // 2️⃣ Change password ONLY if new password is entered
      if (form.newPassword) {
        if (!form.oldPassword) {
          throw new Error("Old password is required");
        }

        await axios.put(
          `${API_BASE}/api/users/change-password/${user.username}`,
          {
            oldPassword: form.oldPassword,
            newPassword: form.newPassword
          }
        );
      }

      setMessage("Profile updated successfully");
      setForm((prev) => ({
        ...prev,
        oldPassword: "",
        newPassword: ""
      }));
    } catch (err) {
      setError(
        err.response?.data?.error ||
          err.message ||
          "Profile update failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      {/* ================= HEADER ================= */}
      <div className="max-w-4xl mx-auto mb-12">
        <h1 className="text-4xl font-extrabold text-slate-800 mb-2">
          Admin Profile
        </h1>
        <p className="text-slate-500">
          Manage administrator account settings
        </p>
      </div>

      {/* ================= PROFILE CARD ================= */}
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl p-10 grid md:grid-cols-3 gap-10 border border-slate-200">
        
        {/* LEFT: AVATAR */}
        <div className="flex flex-col items-center">
          <div className="w-40 h-40 rounded-full bg-slate-100 overflow-hidden shadow mb-4">
            {preview ? (
              <img
                src={preview}
                alt="avatar"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-slate-400">
                <span className="material-symbols-outlined text-6xl">
                  admin_panel_settings
                </span>
              </div>
            )}
          </div>

          <label className="cursor-pointer text-sm font-semibold text-red-600 hover:underline">
            Change Photo
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={onAvatarChange}
            />
          </label>
        </div>

        {/* RIGHT: FORM */}
        <div className="md:col-span-2 space-y-6">
          {/* READ ONLY */}
          <div className="grid md:grid-cols-2 gap-6">
            <input
              value={user?.username || ""}
              disabled
              className="w-full p-3 border rounded-xl bg-slate-50"
            />
            <input
              value={user?.role || "Admin"}
              disabled
              className="w-full p-3 border rounded-xl bg-slate-50"
            />
          </div>

          {/* EDITABLE */}
          <input
            className="w-full p-3 border rounded-xl"
            placeholder="Full Name"
            value={form.fullName}
            onChange={(e) =>
              setForm({ ...form, fullName: e.target.value })
            }
          />

          <input
            type="email"
            className="w-full p-3 border rounded-xl"
            placeholder="Email"
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />

          {/* PASSWORD */}
          <input
            type="password"
            placeholder="Old Password (required to change)"
            className="w-full p-3 border rounded-xl"
            value={form.oldPassword}
            onChange={(e) =>
              setForm({ ...form, oldPassword: e.target.value })
            }
          />

          <input
            type="password"
            placeholder="New Password (leave blank to keep)"
            className="w-full p-3 border rounded-xl"
            value={form.newPassword}
            onChange={(e) =>
              setForm({ ...form, newPassword: e.target.value })
            }
          />

          {/* FEEDBACK */}
          {error && (
            <div className="text-red-600 text-sm">{error}</div>
          )}
          {message && (
            <div className="text-green-600 text-sm">{message}</div>
          )}

          {/* ACTION */}
          <div className="pt-4 flex justify-end">
            <button
              onClick={updateProfile}
              disabled={loading}
              className="px-8 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold shadow disabled:opacity-60"
            >
              {loading ? "Updating..." : "Update Profile"}
            </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

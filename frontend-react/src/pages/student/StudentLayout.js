import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useEffect, useRef, useState } from "react";
import socket from "../../socket";
import { createPeerConnection } from "../../webrtc/peer";
import { API_BASE } from "../../config";

export default function StudentLayout({ children }) {
  const { logout, user } = useAuth();

  const pcRef = useRef(null);
  const dataChannelRef = useRef(null);

  const usernameRef = useRef(null);
  const incomingFromUserRef = useRef(null);
  const isBroadcastRef = useRef(false);

  const [incomingFile, setIncomingFile] = useState(null);
  const [incomingFrom, setIncomingFrom] = useState(null);
  const [incomingFromUser, setIncomingFromUser] = useState(null);
  const [isBroadcast, setIsBroadcast] = useState(false);

  const menu = [
    { name: "Dashboard", path: "/student/dashboard", icon: "dashboard" },
    { name: "Send File", path: "/student/send", icon: "upload_file" },
    { name: "Received", path: "/student/received", icon: "download" },
    { name: "History", path: "/student/history", icon: "history" },
    { name: "Profile", path: "/student/profile", icon: "person" }
  ];

  // ----------------------------------
  // STORE USERNAME SAFELY
  // ----------------------------------
  useEffect(() => {
    if (user?.username) {
      usernameRef.current = user.username;
    }
  }, [user]);

  // ----------------------------------
  // SOCKET LISTENERS
  // ----------------------------------
  useEffect(() => {
    if (!user) return;

    const onFileOffer = ({ file, from, fromUsername }) => {
      setIncomingFile(file);
      setIncomingFrom(from);
      setIncomingFromUser(fromUsername);
      setIsBroadcast(false);

      incomingFromUserRef.current = fromUsername;
      isBroadcastRef.current = false;
    };

    const onBroadcastOffer = ({ file, from, fromUsername }) => {
      setIncomingFile(file);
      setIncomingFrom(from);
      setIncomingFromUser(fromUsername || "Admin");
      setIsBroadcast(true);

      incomingFromUserRef.current = fromUsername || "Admin";
      isBroadcastRef.current = true;
    };

    const onOffer = async ({ offer, from }) => {
      if (!pcRef.current) {
        pcRef.current = createPeerConnection();
        setupReceiverDataChannel();
        setupIce(from);
      }

      await pcRef.current.setRemoteDescription(offer);
      const answer = await pcRef.current.createAnswer();
      await pcRef.current.setLocalDescription(answer);

      socket.emit("webrtc-answer", { to: from, answer });
    };

    const onIce = async ({ candidate }) => {
      if (candidate && pcRef.current) {
        await pcRef.current.addIceCandidate(candidate);
      }
    };

    socket.on("file-offer", onFileOffer);
    socket.on("admin-broadcast-offer", onBroadcastOffer);
    socket.on("webrtc-offer", onOffer);
    socket.on("webrtc-ice-candidate", onIce);

    return () => {
      socket.off("file-offer", onFileOffer);
      socket.off("admin-broadcast-offer", onBroadcastOffer);
      socket.off("webrtc-offer", onOffer);
      socket.off("webrtc-ice-candidate", onIce);
    };
  }, [user]);

  const setupReceiverDataChannel = () => {
    pcRef.current.ondatachannel = (event) => {
      const channel = event.channel;
      dataChannelRef.current = channel;

      const buffers = [];
      let receivedSize = 0;
      let meta = null;

      channel.onmessage = (e) => {
        if (typeof e.data === "string") {
          meta = JSON.parse(e.data);
          return;
        }

        buffers.push(e.data);
        receivedSize += e.data.byteLength;

        if (meta && receivedSize === meta.size) {
          const blob = new Blob(buffers);
          const url = URL.createObjectURL(blob);

          const a = document.createElement("a");
          a.href = url;
          a.download = meta.name;
          a.click();
          URL.revokeObjectURL(url);

          fetch(`${API_BASE}/api/transfers`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              filename: meta.name,
              size: meta.size,
              sender: incomingFromUserRef.current,
              receiver: usernameRef.current
            })
          });

          cleanup();
        }
      };
    };
  };

  const setupIce = (to) => {
    pcRef.current.onicecandidate = (e) => {
      if (e.candidate) {
        socket.emit("webrtc-ice-candidate", { to, candidate: e.candidate });
      }
    };
  };

  const acceptFile = () => {
    if (!incomingFrom || !user) return;

    if (isBroadcastRef.current) {
      pcRef.current = createPeerConnection();
      setupReceiverDataChannel();
      setupIce(incomingFrom);

      socket.emit("broadcast-accept", {
        to: incomingFrom,
        socketId: socket.id,
        username: user.username
      });
    } else {
      socket.emit("file-accept", { to: incomingFrom });
    }

    setIncomingFile(null);
  };

  const rejectFile = () => {
    if (!incomingFrom) return;

    if (isBroadcastRef.current) {
      socket.emit("broadcast-reject", {
        socketId: socket.id,
        username: user.username
      });
    } else {
      socket.emit("file-reject", { to: incomingFrom });
    }

    cleanup();
  };

  const cleanup = () => {
    pcRef.current?.close();
    pcRef.current = null;
    dataChannelRef.current = null;

    setIncomingFile(null);
    setIncomingFrom(null);
    setIncomingFromUser(null);
    setIsBroadcast(false);

    incomingFromUserRef.current = null;
    isBroadcastRef.current = false;
  };

  return (
    <div className="flex min-h-screen bg-slate-100">
      {/* ================= SIDEBAR ================= */}
      <aside className="w-72 bg-gradient-to-b from-slate-900 to-slate-800 text-white flex flex-col">
        {/* BRAND */}
        <div className="px-8 py-6 border-b border-white/10">
          <h2 className="text-xl font-extrabold tracking-wide">
            Student Panel
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            P2P Lab System
          </p>
        </div>

        {/* MENU */}
        <nav className="flex-1 px-4 py-6 space-y-2">
          {menu.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-4 px-5 py-3 rounded-xl transition font-medium ${
                  isActive
                    ? "bg-indigo-600 text-white shadow"
                    : "text-slate-300 hover:bg-slate-700 hover:text-white"
                }`
              }
            >
              <span className="material-symbols-outlined text-xl">
                {item.icon}
              </span>
              {item.name}
            </NavLink>
          ))}
        </nav>

        {/* USER FOOTER */}
        <div className="px-6 py-5 border-t border-white/10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center">
              <span className="material-symbols-outlined">
                person
              </span>
            </div>
            <div>
              <p className="text-sm font-semibold">
                {user?.username}
              </p>
              <p className="text-xs text-slate-400">
                Student
              </p>
            </div>
          </div>

          <button
            onClick={logout}
            className="w-full flex items-center justify-center gap-2 bg-slate-700 hover:bg-slate-600 py-2 rounded-lg text-sm font-semibold transition"
          >
            <span className="material-symbols-outlined text-sm">
              logout
            </span>
            Logout
          </button>
        </div>
      </aside>

      {/* ================= MAIN ================= */}
      <div className="flex-1 flex flex-col">
        <main className="p-10 flex-1">{children}</main>
      </div>

      {/* ================= POPUP ================= */}
      {incomingFile && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-96 shadow-xl">
            <h3 className="text-xl font-bold mb-3">
              {isBroadcast ? "Admin Broadcast" : "Incoming File"}
            </h3>

            <p className="text-gray-700 mb-4">
              <strong>{incomingFile.name}</strong>
              <br />
              {(incomingFile.size / 1024 / 1024).toFixed(2)} MB
              <br />
              From: {incomingFromUser}
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={rejectFile}
                className="px-4 py-2 rounded bg-gray-300"
              >
                Reject
              </button>
              <button
                onClick={acceptFile}
                className="px-4 py-2 rounded bg-indigo-600 text-white"
              >
                Accept
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

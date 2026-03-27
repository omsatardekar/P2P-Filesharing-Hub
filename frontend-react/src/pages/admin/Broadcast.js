import { useRef, useState, useEffect, useCallback } from "react";
import AdminLayout from "./AdminLayout";
import socket from "../../socket";
import { createPeerConnection } from "../../webrtc/peer";
import { CHUNK_SIZE } from "../../webrtc/constants";
import { useAuth } from "../../context/AuthContext";

// 🔐 SAFE TRANSFER CONSTANTS
const MAX_BUFFERED_AMOUNT = 4 * 1024 * 1024; // 4MB
const SEND_DELAY_MS = 5;

const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

export default function Broadcast() {
  const { user } = useAuth();

  const [status, setStatus] = useState("");
  const [progress, setProgress] = useState(0);
  const [acceptedUsers, setAcceptedUsers] = useState([]);
  const [rejectedUsers, setRejectedUsers] = useState([]);

  const fileRef = useRef(null);
  const peersRef = useRef({});

  /* ================= SAFE FILE SENDER ================= */
  const sendFileSafely = useCallback(async (file, channel, pc) => {
    if (!file || !channel) return;

    // 🔒 Wait for channel to open
    while (channel.readyState !== "open") {
      await sleep(50);
    }

    channel.bufferedAmountLowThreshold = MAX_BUFFERED_AMOUNT / 2;

    // ✅ Send metadata
    channel.send(
      JSON.stringify({
        name: file.name,
        size: file.size,
        type: file.type
      })
    );

    let offset = 0;

    while (offset < file.size) {
      // 🛑 Backpressure handling
      if (channel.bufferedAmount > MAX_BUFFERED_AMOUNT) {
        await new Promise((resolve) => {
          channel.onbufferedamountlow = () => resolve();
        });
      }

      const slice = file.slice(offset, offset + CHUNK_SIZE);
      const buffer = await slice.arrayBuffer();

      try {
        channel.send(buffer);
      } catch (err) {
        console.error("❌ Send failed, retrying...", err);
        await sleep(50);
        continue;
      }

      offset += buffer.byteLength;

      // ✅ UPDATE PROGRESS
      setProgress(Math.floor((offset / file.size) * 100));

      // 🧠 Yield to browser
      await sleep(SEND_DELAY_MS);
    }

    console.log("✅ Broadcast sent to peer");

    channel.onclose = () => {
      pc?.close();
    };
  }, []);

  /* ================= START BROADCAST ================= */
  const startBroadcast = () => {
    if (!fileRef.current) {
      alert("Select a file first");
      return;
    }

    setAcceptedUsers([]);
    setRejectedUsers([]);
    setProgress(0);
    setStatus("Broadcast sent. Waiting for student responses...");

    socket.emit("admin-broadcast-offer", {
      file: {
        name: fileRef.current.name,
        size: fileRef.current.size,
        type: fileRef.current.type
      },
      fromUsername: user.username,
      transferType: "broadcast"
    });
  };

  /* ================= SOCKET LISTENERS ================= */
  useEffect(() => {
    if (!user) return;

    const onStudentAccept = async ({ socketId, username }) => {
      if (!socketId || !fileRef.current) return;

      setAcceptedUsers((prev) =>
        prev.includes(username) ? prev : [...prev, username]
      );

      setStatus("Broadcast in progress...");

      const pc = createPeerConnection();
      const channel = pc.createDataChannel("file", { ordered: true });

      peersRef.current[socketId] = { pc, channel };

      pc.onicecandidate = (e) => {
        if (e.candidate) {
          socket.emit("webrtc-ice-candidate", {
            to: socketId,
            candidate: e.candidate
          });
        }
      };

      channel.onopen = () => {
        console.log("📡 Channel open, starting SAFE transfer");
        sendFileSafely(fileRef.current, channel, pc);
      };

      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);

      socket.emit("webrtc-offer", {
        to: socketId,
        offer
      });
    };

    const onStudentReject = ({ username }) => {
      if (!username) return;
      setRejectedUsers((prev) =>
        prev.includes(username) ? prev : [...prev, username]
      );
    };

    const onAnswer = async ({ from, answer }) => {
      const peer = peersRef.current[from];
      if (peer) {
        await peer.pc.setRemoteDescription(answer);
      }
    };

    const onIce = async ({ from, candidate }) => {
      const peer = peersRef.current[from];
      if (peer && candidate) {
        await peer.pc.addIceCandidate(candidate);
      }
    };

    socket.on("broadcast-accept", onStudentAccept);
    socket.on("broadcast-reject", onStudentReject);
    socket.on("webrtc-answer", onAnswer);
    socket.on("webrtc-ice-candidate", onIce);

    return () => {
      socket.off("broadcast-accept", onStudentAccept);
      socket.off("broadcast-reject", onStudentReject);
      socket.off("webrtc-answer", onAnswer);
      socket.off("webrtc-ice-candidate", onIce);
    };
  }, [user, sendFileSafely]);

  return (
    <AdminLayout>
      <div className="flex justify-center">
        <div className="w-full max-w-3xl">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-extrabold text-slate-800 mb-3">
              Broadcast Center
            </h1>
            <p className="text-slate-500 text-lg">
              Instantly distribute files to all connected students
            </p>
          </div>

          <div className="relative bg-white rounded-[2rem] shadow-2xl p-12 border">
            {/* FILE SELECT */}
            <div className="mb-10">
              <label className="flex flex-col items-center justify-center border-2 border-dashed rounded-2xl p-10 cursor-pointer">
                <span className="material-symbols-outlined text-5xl text-red-500 mb-4">
                  upload_file
                </span>
                <span className="font-medium">Click to choose a file</span>

                <input
                  type="file"
                  hidden
                  onChange={(e) => {
                    fileRef.current = e.target.files[0] || null;
                  }}
                />
              </label>

              {fileRef.current && (
                <div className="mt-6 flex items-center justify-between bg-slate-50 p-5 rounded-xl">
                  <div>
                    <p className="font-semibold">{fileRef.current.name}</p>
                    <p className="text-sm text-slate-500">
                      {(fileRef.current.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                  <span className="material-symbols-outlined text-slate-400">
                    description
                  </span>
                </div>
              )}
            </div>

            {/* ACTION */}
            <button
              onClick={startBroadcast}
              className="w-full flex items-center justify-center gap-3 bg-red-600 hover:bg-red-700 text-white py-5 rounded-2xl font-bold text-lg shadow-xl transition"
            >
              <span className="material-symbols-outlined">campaign</span>
              Broadcast to All Students
            </button>

            {/* STATUS */}
            {status && (
              <div className="mt-8 bg-slate-100 p-5 rounded-xl">
                {status}
              </div>
            )}

            {/* PROGRESS BAR */}
            {progress > 0 && (
              <div className="mt-6">
                <div className="flex justify-between text-sm mb-2">
                  <span>Broadcast Progress</span>
                  <span>{progress}%</span>
                </div>
                <div className="w-full h-3 bg-gray-200 rounded-full">
                  <div
                    className="h-full bg-red-600 rounded-full transition-all"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            )}

            {/* RESULTS */}
            {(acceptedUsers.length > 0 || rejectedUsers.length > 0) && (
              <div className="mt-10 grid md:grid-cols-2 gap-8">
                <div className="bg-emerald-50 rounded-2xl p-6">
                  <h3 className="font-bold text-emerald-700 mb-4">
                    Accepted
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {acceptedUsers.map((u) => (
                      <span
                        key={u}
                        className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-sm font-semibold"
                      >
                        {u}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="bg-rose-50 rounded-2xl p-6">
                  <h3 className="font-bold text-rose-700 mb-4">
                    Rejected
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {rejectedUsers.map((u) => (
                      <span
                        key={u}
                        className="px-3 py-1 rounded-full bg-rose-100 text-rose-700 text-sm font-semibold"
                      >
                        {u}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

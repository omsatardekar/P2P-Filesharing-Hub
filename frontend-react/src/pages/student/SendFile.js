import { useEffect, useRef, useState, useCallback } from "react";
import StudentLayout from "./StudentLayout";
import socket from "../../socket";
import { createPeerConnection } from "../../webrtc/peer";
import { CHUNK_SIZE } from "../../webrtc/constants";
import { useAuth } from "../../context/AuthContext";
import useOnlineUsers from "../../hooks/useOnlineUsers";
import { API_BASE } from "../../config";

// 🔐 SAFE TRANSFER CONSTANTS
const MAX_BUFFERED_AMOUNT = 4 * 1024 * 1024; // 4MB
const SEND_DELAY_MS = 5;

const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

export default function SendFile() {
  const { user } = useAuth();
  const onlineUsers = useOnlineUsers();

  const [selectedUser, setSelectedUser] = useState(null);
  const [userSearch, setUserSearch] = useState("");
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("");

  const pcRef = useRef(null);
  const channelRef = useRef(null);

  // -----------------------------------
  // SAFE FILE SENDER
  // -----------------------------------
  const sendFileSafely = useCallback(
    async (file, channel) => {
      if (!file || !user || !selectedUser) return;

      setStatus("Sending file...");

      // 🔒 Wait until channel is truly open
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
          continue; // retry same chunk
        }

        offset += buffer.byteLength;

        setProgress(Math.floor((offset / file.size) * 100));

        // 🧠 Yield to browser
        await sleep(SEND_DELAY_MS);
      }

      setStatus("File sent successfully");

      await fetch(`${API_BASE}/api/transfers`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          filename: file.name,
          size: file.size,
          sender: user.username,
          receiver: selectedUser.username
        })
      });
    },
    [user, selectedUser]
  );

  // -----------------------------------
  // START CONNECTION
  // -----------------------------------
  const startConnection = async () => {
    if (!selectedUser || !file || !user) return;

    setProgress(0);
    setStatus("Waiting for receiver to accept...");

    const pc = createPeerConnection();
    pcRef.current = pc;

    const channel = pc.createDataChannel("file");
    channelRef.current = channel;

    // ✅ SAFE ONOPEN HANDLER
    channel.onopen = () => {
      console.log("📡 Channel open, starting SAFE transfer");
      sendFileSafely(file, channel);
    };

    pc.onicecandidate = (e) => {
      if (e.candidate) {
        socket.emit("webrtc-ice-candidate", {
          to: selectedUser.socketId,
          candidate: e.candidate
        });
      }
    };

    socket.emit("file-offer", {
      to: selectedUser.socketId,
      from: socket.id,
      fromUsername: user.username,
      file: {
        name: file.name,
        size: file.size,
        type: file.type
      }
    });

    const offer = await pc.createOffer();
    await pc.setLocalDescription(offer);

    socket.emit("webrtc-offer", {
      to: selectedUser.socketId,
      offer
    });
  };

  // -----------------------------------
  // SOCKET LISTENERS
  // -----------------------------------
  useEffect(() => {
    if (!user) return;

    const onAccept = () => {
      setStatus("Accepted. Starting transfer...");
    };

    const onReject = () => {
      setStatus("Rejected by receiver");
      pcRef.current?.close();
      pcRef.current = null;
      channelRef.current = null;
    };

    const onAnswer = async ({ answer }) => {
      if (pcRef.current) {
        await pcRef.current.setRemoteDescription(answer);
      }
    };

    const onIce = async ({ candidate }) => {
      if (candidate && pcRef.current) {
        await pcRef.current.addIceCandidate(candidate);
      }
    };

    socket.on("file-accept", onAccept);
    socket.on("file-reject", onReject);
    socket.on("webrtc-answer", onAnswer);
    socket.on("webrtc-ice-candidate", onIce);

    return () => {
      socket.off("file-accept", onAccept);
      socket.off("file-reject", onReject);
      socket.off("webrtc-answer", onAnswer);
      socket.off("webrtc-ice-candidate", onIce);
    };
  }, [user]);

  // -----------------------------------
  // FILTER USERS
  // -----------------------------------
  const filteredUsers = onlineUsers.filter((u) =>
    u.username.toLowerCase().includes(userSearch.toLowerCase())
  );

  return (
    <StudentLayout>
      <div className="max-w-3xl mx-auto mb-10 text-center">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-2">
          Send File
        </h1>
        <p className="text-gray-500">
          Secure peer-to-peer transfer between online users
        </p>
      </div>

      <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl p-10 space-y-10">
        <div>
          <input
            type="file"
            className="w-full border rounded-xl p-3"
            onChange={(e) => setFile(e.target.files[0] || null)}
          />
        </div>

        <div>
          <input
            placeholder="Search user..."
            className="w-full border rounded-xl p-3 mb-4"
            value={userSearch}
            onChange={(e) => setUserSearch(e.target.value)}
          />

          <div className="max-h-48 overflow-y-auto border rounded-xl">
            {filteredUsers.map((u) => (
              <button
                key={u.socketId}
                onClick={() => setSelectedUser(u)}
                className={`w-full text-left px-4 py-3 ${
                  selectedUser?.socketId === u.socketId
                    ? "bg-indigo-50 font-semibold"
                    : ""
                }`}
              >
                {u.username}
              </button>
            ))}
          </div>
        </div>

        <button
          disabled={!file || !selectedUser}
          onClick={startConnection}
          className="w-full py-4 rounded-xl font-semibold bg-indigo-600 text-white"
        >
          Send File
        </button>

        {status && <div className="text-sm">{status}</div>}

        {progress > 0 && (
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span>Transfer Progress</span>
              <span>{progress}%</span>
            </div>
            <div className="w-full h-3 bg-gray-200 rounded-full">
              <div
                className="h-full bg-indigo-600 rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}
      </div>
    </StudentLayout>
  );
}

const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

// ====================
// IMPORTS
// ====================
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth");
const adminRoutes = require("./routes/admin");
const transferRoutes = require("./routes/transfers");
const userRoutes = require("./routes/user");
const User = require("./models/User");

// ====================
// APP SETUP
// ====================
const app = express();

// MIDDLEWARE (ORDER MATTERS)
app.use(cors());
app.use(express.json()); 

// ====================
// DATABASE
// ====================
connectDB();

// ====================
// API ROUTES
// ====================
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/transfers", transferRoutes);
app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.send("P2P File Sharing Backend Running");
});

// ====================
// HTTP + SOCKET SERVER
// ====================
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

// ====================
// ONLINE USERS MAP
// ====================
const onlineUsers = new Map();

// ====================
// SOCKET LOGIC
// ====================
io.on("connection", (socket) => {
  console.log("Socket connected:", socket.id);

  /* ================= USER JOIN ================= */
  socket.on("join", async ({ username, role }) => {
    try {
      if (!username) return;

      onlineUsers.set(socket.id, {
        socketId: socket.id,
        username,
        role
      });

      await User.updateOne(
        { username },
        { status: "online" }
      );

      io.emit("online-users", Array.from(onlineUsers.values()));
    } catch (err) {
      console.error("JOIN ERROR:", err);
    }
  });

  /* ================= DISCONNECT ================= */
  socket.on("disconnect", async () => {
    try {
      const user = onlineUsers.get(socket.id);

      if (user?.username) {
        await User.updateOne(
          { username: user.username },
          { status: "offline" }
        );
      }

      onlineUsers.delete(socket.id);
      io.emit("online-users", Array.from(onlineUsers.values()));

      console.log("Socket disconnected:", socket.id);
    } catch (err) {
      console.error("DISCONNECT ERROR:", err);
    }
  });

  /* ================= WEBRTC SIGNALING ================= */
  socket.on("webrtc-offer", ({ to, offer }) => {
    io.to(to).emit("webrtc-offer", {
      offer,
      from: socket.id
    });
  });

  socket.on("webrtc-answer", ({ to, answer }) => {
    io.to(to).emit("webrtc-answer", {
      answer,
      from: socket.id
    });
  });

  socket.on("webrtc-ice-candidate", ({ to, candidate }) => {
    io.to(to).emit("webrtc-ice-candidate", {
      candidate,
      from: socket.id
    });
  });

  /* ================= STUDENT ↔ STUDENT ================= */
  socket.on("file-offer", ({ to, file, from, fromUsername }) => {
    io.to(to).emit("file-offer", {
      file,
      from,
      fromUsername
    });
  });

  socket.on("file-accept", ({ to }) => {
    io.to(to).emit("file-accept");
  });

  socket.on("file-reject", ({ to }) => {
    io.to(to).emit("file-reject");
  });

  /* ================= ADMIN → STUDENTS (BROADCAST) ================= */
  socket.on("admin-broadcast-offer", ({ file, fromUsername }) => {
    socket.broadcast.emit("admin-broadcast-offer", {
      file,
      from: socket.id,
      fromUsername
    });
  });

  socket.on("broadcast-accept", ({ to, socketId, username }) => {
    io.to(to).emit("broadcast-accept", {
      socketId,
      username
    });
  });

  socket.on("broadcast-reject", ({ socketId, username }) => {
    io.emit("broadcast-reject", {
      socketId,
      username
    });
  });
});

// ====================
// START SERVER
// ====================
const PORT = 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

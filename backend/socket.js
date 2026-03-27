const users = {}; // username -> socketId

module.exports = (io) => {
  io.on("connection", (socket) => {

    socket.on("user-online", (username) => {
      users[username] = socket.id;
      socket.username = username;
      io.emit("presence-update");
    });

    socket.on("signal", ({ to, from, data }) => {
      if (users[to]) {
        io.to(users[to]).emit("signal", { from, data });
      }
    });

    socket.on("disconnect", () => {
      if (socket.username) {
        delete users[socket.username];
        io.emit("presence-update");
      }
    });
  });
};

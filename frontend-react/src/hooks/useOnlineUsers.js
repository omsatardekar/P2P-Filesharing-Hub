import { useEffect, useState } from "react";
import socket from "../socket";

export default function useOnlineUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    socket.on("online-users", setUsers);

    return () => {
      socket.off("online-users");
    };
  }, []);

  return users;
}

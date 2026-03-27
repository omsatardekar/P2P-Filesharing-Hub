import { createContext, useContext, useState, useEffect } from "react";
import socket from "../socket";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    const username = localStorage.getItem("username");

    return token && role && username
      ? { token, role, username }
      : null;
  });

  useEffect(() => {
    if (user) {
      socket.connect();
      socket.emit("join", {
        username: user.username,
        role: user.role,
      });
    }
  }, [user]);

  const loginSuccess = (data) => {
    localStorage.setItem("token", data.token);
    localStorage.setItem("username", data.username);
    localStorage.setItem("role", data.role);

    setUser({
      token: data.token,
      username: data.username,
      role: data.role,
    });
  };

  const logout = () => {
    socket.disconnect();
    localStorage.clear();
    setUser(null);
    window.location.href = "/login";
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loginSuccess,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

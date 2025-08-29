import React, { createContext, useContext, useEffect, useState } from "react";
import api from "../utils/api";

const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  // const login = async (email, password) => {
  //   setLoading(true);
  //   try {
  //     const { data } = await api.post("/auth/login", { email, password });
  //     setUser(data);
  //     return { ok: true };
  //   } catch (e) {
  //     return { ok: false, message: e.response?.data?.message || e.message };
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const login = async (email, password) => {
    setLoading(true);
    try {
      const { data } = await api.post("/auth/login", { email, password });

      // ✅ store token in localStorage
      if (data.token) {
        localStorage.setItem("token", data.token);
      }

      setUser(data.user || data); // store user info
      return { ok: true };
    } catch (e) {
      return { ok: false, message: e.response?.data?.message || e.message };
    } finally {
      setLoading(false);
    }
  };

  const register = async (payload) => {
    setLoading(true);
    try {
      const { data } = await api.post("/auth/register", payload);
      if (data.token) {
        localStorage.setItem("token", data.token);
      }
      setUser(data.user || data);

      // setUser(data);
      return { ok: true };
    } catch (e) {
      return { ok: false, message: e.response?.data?.message || e.message };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    await api.post("/auth/logout");
    setUser(null);
  };

  useEffect(() => {}, []);

  return (
    <AuthContext.Provider
      value={{ user, loading, login, register, logout, setUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// src/auth/AuthContext.js
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  useCallback,
} from "react";
import { api, setAuthToken } from "../api/client";
import { jwtDecode } from "jwt-decode"; // ← named export (KHÔNG dùng default)

const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

function getExpMillis(token) {
  try {
    const { exp } = jwtDecode(token); // exp = seconds
    return exp ? exp * 1000 : 0;
  } catch {
    return 0;
  }
}

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const logoutTimer = useRef(null);

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    setAuthToken(null);
    setToken(null);
    setUser(null);
    if (logoutTimer.current) clearTimeout(logoutTimer.current);
  }, []);

  const scheduleAutoLogout = useCallback(
    (tok) => {
      if (logoutTimer.current) clearTimeout(logoutTimer.current);
      const expMs = getExpMillis(tok);
      const delay = expMs - Date.now();
      if (expMs && delay > 0) {
        logoutTimer.current = setTimeout(() => logout(), delay);
      }
    },
    [logout]
  );

  const applyLogin = useCallback(
    (tok, usr) => {
      localStorage.setItem("token", tok);
      setAuthToken(tok);
      setToken(tok);
      setUser(usr);
      scheduleAutoLogout(tok);
    },
    [scheduleAutoLogout]
  );

  const register = useCallback(
    async (form) => {
      const res = await api.post("/api/auth/register", form);
      applyLogin(res.token, res.user);
      return res.user;
    },
    [applyLogin]
  );

  const login = useCallback(
    async (form) => {
      const res = await api.post("/api/auth/login", form);
      applyLogin(res.token, res.user);
      return res.user;
    },
    [applyLogin]
  );

  useEffect(() => {
    (async () => {
      try {
        if (token) {
          setAuthToken(token);
          scheduleAutoLogout(token);
          const profile = await api.get("/api/auth/profile");
          setUser(profile);
        }
      } catch {
        localStorage.removeItem("token");
        setAuthToken(null);
        setToken(null);
        setUser(null);
      } finally {
        setLoading(false);
      }
    })();

    return () => {
      if (logoutTimer.current) clearTimeout(logoutTimer.current);
    };
  }, [token, scheduleAutoLogout]);

  const value = useMemo(
    () => ({
      token,
      user,
      loading,
      isAuthenticated: !!token,
      register,
      login,
      logout,
    }),
    [token, user, loading, register, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

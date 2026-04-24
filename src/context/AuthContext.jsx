import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { getUserProfile } from "../api/api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [access, setAccess] = useState(null);
  const [refresh, setRefresh] = useState(null);
  const [user, setUser] = useState(null);   // ðŸ‘ˆ nuevo
  const [loading, setLoading] = useState(true);

  // Recuperar tokens al cargar y obtener perfil
  useEffect(() => {
    const savedAccess = localStorage.getItem("access");
    const savedRefresh = localStorage.getItem("refresh");
    if (savedAccess) setAccess(savedAccess);
    if (savedRefresh) setRefresh(savedRefresh);
  }, []);

  // Cada vez que tengamos access, pedimos el perfil
  useEffect(() => {
    const fetchProfile = async () => {
      if (access) {
        try {
          const data = await getUserProfile(access);
          setUser(data); // guarda username, email, id
        } catch (err) {
          console.error("Error obteniendo perfil:", err);
          setUser(null);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    };
    fetchProfile();
  }, [access]);

  const isAuthenticated = !!access;

  const login = (accessToken, refreshToken) => {
    localStorage.setItem("access", accessToken);
    localStorage.setItem("refresh", refreshToken);
    setAccess(accessToken);
    setRefresh(refreshToken);
  };

  const logout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    setAccess(null);
    setRefresh(null);
    setUser(null);
  };

  const value = useMemo(
    () => ({ access, refresh, isAuthenticated, user, login, logout, loading }),
    [access, refresh, isAuthenticated, user, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);

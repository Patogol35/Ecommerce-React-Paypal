import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { getUserProfile } from "../api/api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [access, setAccess] = useState(null);
  const [refresh, setRefresh] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // controla cuándo la app puede renderizar
  const [isReady, setIsReady] = useState(false);

  // Recuperar tokens al cargar
  useEffect(() => {
    const savedAccess = localStorage.getItem("access");
    const savedRefresh = localStorage.getItem("refresh");

    if (savedAccess) setAccess(savedAccess);
    if (savedRefresh) setRefresh(savedRefresh);
    else setLoading(false); 
  }, []);

  // Obtener perfil cuando haya access
  useEffect(() => {
    const fetchProfile = async () => {
      if (access) {
        try {
          const data = await getUserProfile(access);
          setUser(data);
        } catch (err) {
          console.error("Error obteniendo perfil:", err);
          setUser(null);
        }
      } else {
        setUser(null);
      }

      setLoading(false);
      setIsReady(true); 
    };

    fetchProfile();
  }, [access]);

  const isAuthenticated = !!access;

  const login = (accessToken, refreshToken) => {
    localStorage.setItem("access", accessToken);
    localStorage.setItem("refresh", refreshToken);

    setAccess(accessToken);
    setRefresh(refreshToken);

    setIsReady(false); 
  };

  const logout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");

    setAccess(null);
    setRefresh(null);
    setUser(null);

    setIsReady(false); 
  };

  const value = useMemo(
    () => ({
      access,
      refresh,
      isAuthenticated,
      user,
      login,
      logout,
      loading,
      isReady, 
    }),
    [access, refresh, isAuthenticated, user, loading, isReady]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);

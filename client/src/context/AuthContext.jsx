import { createContext, useContext, useState, useEffect } from "react";
import { logout as apiLogout, isAuthenticated } from "../api";

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check for existing auth on mount
  useEffect(() => {
    // On refresh, if token exists, assume user is logged in
    if (isAuthenticated()) {
      // We don't fetch user yet; user comes from login/register
      setUser({}); // minimal truthy user
    }
    setLoading(false);
  }, []);


  const login = (userData, token) => {
    localStorage.setItem("authToken", token);
    setUser(userData);
    setError(null);
  };

  const logout = async () => {
    try {
      await apiLogout();
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      localStorage.removeItem("authToken");
      setUser(null);
    }
  };

  const updateUser = (userData) => {
    setUser(userData);
  };

  const value = {
    user,
    loading,
    error,
    isLoggedIn: !!user,
    login,
    logout,
    updateUser,
    setError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;

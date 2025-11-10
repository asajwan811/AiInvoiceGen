import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

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
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Debug state changes
  useEffect(() => {
    console.log("🔄 Auth state updated - user:", user, "isAuthenticated:", isAuthenticated);
  }, [user, isAuthenticated]);

  useEffect(() => {
    console.log("🔄 AuthProvider mounted - checking auth status");
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    console.log("🔍 checkAuthStatus running...");
    try {
      const token = localStorage.getItem("token");
      const userStr = localStorage.getItem("user");

      console.log("📦 Token from localStorage:", token ? "exists" : "null");
      console.log("📦 User from localStorage:", userStr);

      if (token && userStr) {
        console.log("✅ Token and user found, parsing user data...");
        try {
          const userData = JSON.parse(userStr);
          console.log("✅ Parsed user data:", userData);
          
          // Set both states
          setUser(userData);
          setIsAuthenticated(true);
          
          console.log("✅ User authenticated:", userData.name);
          return; // Exit early since authenticated
        } catch (parseError) {
          console.error("❌ JSON parse error:", parseError);
        }
      }
      
      // If we get here, authentication failed
      console.log("❌ Authentication failed - clearing state");
      setUser(null);
      setIsAuthenticated(false);
      
    } catch (error) {
      console.error('❌ Auth check Failed:', error);
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      console.log("🏁 Auth check completed, loading set to false");
      setLoading(false);
    }
  };

  const login = (userData, token) => {
    console.log("🔐 Login called with user:", userData);
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userData));

    setUser(userData);
    setIsAuthenticated(true);
  };

  const logout = () => {
    console.log("🚪 Logout called - clearing auth data");
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");

    setUser(null);
    setIsAuthenticated(false);
    window.location.href = "/";
  };

  const updateUser = (updatedUserData) => {
    const newUserData = { ...user, ...updatedUserData };
    localStorage.setItem('user', JSON.stringify(newUserData));
    setUser(newUserData);
  };

  const value = {
    user,
    loading,
    isAuthenticated,
    login,
    logout,
    updateUser,
    checkAuthStatus,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
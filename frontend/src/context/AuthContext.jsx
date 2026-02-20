import { createContext, useEffect, useState } from "react";
import api from "../api/axios";
import { getStoredUserInfo } from "../utils/auth";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user from localStorage on app start
  useEffect(() => {
    const storedUser = getStoredUserInfo();
    if (storedUser) {
      setUser(storedUser);
    } else {
      localStorage.removeItem("userInfo");
    }
    setLoading(false);
  }, []);

  // Register
  const register = async (formData) => {
    try {
      const { data } = await api.post("/auth/register", formData);
      localStorage.setItem("userInfo", JSON.stringify(data));
      setUser(data);
    } catch (error) {
      const message =
        !error?.response
          ? "Cannot reach server. Start backend and check MongoDB connection."
          :
        error?.response?.data?.message ||
        "Registration failed. Please try again.";
      throw new Error(message);
    }
  };

  // Login
  const login = async (formData) => {
    try {
      const { data } = await api.post("/auth/login", formData);
      localStorage.setItem("userInfo", JSON.stringify(data));
      setUser(data);
    } catch (error) {
      const message =
        !error?.response
          ? "Cannot reach server. Start backend and check MongoDB connection."
          :
        error?.response?.data?.message || "Login failed. Please try again.";
      throw new Error(message);
    }
  };

  // Logout
  const logout = () => {
    localStorage.removeItem("userInfo");
    setUser(null);
    window.location.href = "/login";
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        register,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

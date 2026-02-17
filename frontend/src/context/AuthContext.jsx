import { createContext, useState, useEffect } from "react";
import API from "../api/axios";
import toast from "react-hot-toast";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("userInfo")) || null
  );

  const login = async (email, password) => {
    const { data } = await API.post("/auth/login", { email, password });
    setUser(data);
    localStorage.setItem("userInfo", JSON.stringify(data));
    toast.success("Login successful");
  };

  const register = async (name, email, password) => {
    const { data } = await API.post("/auth/register", {
      name,
      email,
      password,
    });
    setUser(data);
    localStorage.setItem("userInfo", JSON.stringify(data));
    toast.success("Registered successfully");
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("userInfo");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

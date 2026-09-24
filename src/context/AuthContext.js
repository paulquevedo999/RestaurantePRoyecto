import { createContext, useContext, useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();



export function AuthProvider({ children }) {
  
  const [user, setUser] = useState(null);

  const login = async (cedula, password) => {
    const response = await api.post("/login/ahsdjas", {
      cedula,
      password,
    });

    const token = response.data.token;

    localStorage.setItem("token", token);

    const me = await api.get("/auth/me");
    setUser(me.data);

    return me.data;
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
   useNavigate.navigate('/login')
   // navigate("/login")
   
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
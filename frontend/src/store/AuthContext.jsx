import { useContext, createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext({
  user: null,
  logout: () => {},
  login: () => {},
});

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      setUser(jwtDecode(token));
    }
  }, []);
  const login = (token) => {
    localStorage.setItem("accessToken", token);
    setUser(jwtDecode(token));
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    setUser(null);
    window.location.href = "/";
  };
  return (
    <AuthContext.Provider value={{ user, logout, login }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

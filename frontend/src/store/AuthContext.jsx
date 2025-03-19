import { useContext, createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext({
  user: null,
  userToken: null,
  loading: true, // Dodany stan loading
  logout: () => {},
});

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [userToken, setUserToken] = useState(null);
  const [loading, setLoading] = useState(true); // stan ładowania

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      setUser(decodedToken);
      setUserToken(token);
    }
    setLoading(false); // ustawienie loading na false po zakończeniu ładowania
  }, []);
  const logout = () => {
    const token = localStorage.getItem("token");
    if (token) localStorage.removeItem("token");
    window.location.href = "/";
  };
  return (
    <AuthContext.Provider value={{ user, userToken, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

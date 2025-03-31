import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import AuthProvider from "./store/AuthContext";
import { GoogleOAuthProvider } from "@react-oauth/google";

// eslint-disable-next-line no-undef
const client_ID = import.meta.env.VITE_CLIENT_ID;
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <GoogleOAuthProvider clientId={client_ID}>
        <App />
      </GoogleOAuthProvider>
    </AuthProvider>
  </StrictMode>
);

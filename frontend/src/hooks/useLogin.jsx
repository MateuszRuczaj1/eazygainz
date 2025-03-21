import { useMutation } from "react-query";
import { login } from "@/helpers/http";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/store/AuthContext";
export default function useLogin() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login: authLogin } = useAuth();
  return useMutation(login, {
    onError: (err) => {
      console.error(
        "Błąd logowania:",
        err?.response?.data?.message || "Wystąpił problem"
      );
    },
    onSuccess: (response) => {
      const token = response.data?.token;
      if (token) {
        authLogin(token);
      }
      const from = location.state?.from || "/";
      setTimeout(() => {
        navigate(from);
      }, 500);
    },
  });
}

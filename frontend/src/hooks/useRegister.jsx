import { useMutation } from "react-query";
import { register } from "@/helpers/http";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/store/AuthContext";

export default function useRegister() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login: authLogin } = useAuth();
  return useMutation(register, {
    onError: (err) => console.error("Wystąpił błąd przy rejestracji", err),
    onSuccess: (response) => {
      const token = response.data?.token;
      if (token) {
        authLogin(token);
      }
      const from = location.state?.from || "/";
      console.log(from);
      setTimeout(() => {
        navigate(from);
      }, 500);
    },
  });
}

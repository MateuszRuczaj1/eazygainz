import { useMutation } from "react-query";
import { register } from "@/helpers/http";
import { useNavigate, useLocation } from "react-router-dom";
export default function useRegister() {
  const navigate = useNavigate();
  const location = useLocation();
  return useMutation(register, {
    onError: (err) => console.error("Wystąpił błąd przy rejestracji", err),
    onSuccess: (response) => {
      const token = response.data?.token;
      if (token) {
        localStorage.setItem("token", token);
      }
      const from = location.state?.from || "/";
      console.log(from);
      setTimeout(() => {
        navigate(from);
      }, 500);
    },
  });
}

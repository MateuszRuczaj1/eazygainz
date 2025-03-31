import { useGoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/store/AuthContext";
import googleLogo from "@/assets/google_icon.png";
import axios from "axios";
export default function GoogleButton() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const googleLogin = useGoogleLogin({
    onSuccess: async ({ code }) => {
      try {
        const tokens = await axios.post("http://localhost:3030/auth/google", {
          code,
        });
        console.log(tokens.data?.id_token);
        const userToken = tokens.data?.id_token;
        login(userToken);
        navigate("/");
      } catch (error) {
        console.log(error);
      }
    },
    flow: "auth-code",
  });
  return (
    <button
      className="border border-gray-500 rounded-2xl px-8 p-4 flex gap-5 items-center w-fit justify-center hover:-translate-y-0.5 hover:opacity-90 transition-all duration-200 hover:shadow-md hover:cursor-pointer"
      onClick={googleLogin}
      type="button"
    >
      <img
        className="w-8 h-8 object-contain"
        src={googleLogo}
        alt="Logo google"
      />
      Zaloguj się kontem Google
    </button>
  );
}

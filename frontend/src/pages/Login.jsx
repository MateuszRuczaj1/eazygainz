import { motion } from "framer-motion";
import RegisterImage from "@/components/RegisterImage";
import LoginForm from "@/components/LoginForm";
import { useState } from "react";
import RegisterForm from "@/components/RegisterForm";
export default function Login() {
  const [hasAccount, setHasAccount] = useState(true);
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <div className="flex ">
          {hasAccount ? (
            <LoginForm handleClick={() => setHasAccount(false)} />
          ) : (
            <RegisterForm handleClick={() => setHasAccount(true)} />
          )}
          <RegisterImage />
        </div>
      </motion.div>
    </div>
  );
}

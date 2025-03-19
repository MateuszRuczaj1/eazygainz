import { motion } from "framer-motion";
import RegisterForm from "@/components/RegisterForm";

export default function Register() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <RegisterForm />
      </motion.div>
    </div>
  );
}

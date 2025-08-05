import { motion } from "framer-motion";
export default function ExercisesGrid({ children }) {
  return (
    <motion.ul
      className="grid md:grid-cols-3 grid-cols-2 gap-4 mt-2"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {children}
    </motion.ul>
  );
}

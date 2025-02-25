/* eslint-disable react/prop-types */
import ExercisesList from "./ExercisesList";
import CardHeader from "./CardHeader";
import CardDescription from "./CardDescription";
import { motion } from "framer-motion";
export default function Card({ training }) {
  return (
    <motion.li
      className="bg-white shadow-lg rounded-xl p-6   block space-y-4 relative w-md overflow-hidden"
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1.5, ease: "easeInOut" }}
    >
      <CardHeader date={training?.date} title={training?.title} />
      {training.description && (
        <CardDescription description={training?.description} />
      )}
      <ExercisesList exercises={training.exercises} />
    </motion.li>
  );
}

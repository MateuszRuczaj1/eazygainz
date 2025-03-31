import { motion } from "framer-motion";
import ExerciseImage from "./ExerciseImage";
const ExerciseCard = ({ exercise, onClick, selected }) => {
  return (
    <motion.li
      key={exercise._id}
      onClick={() => onClick(exercise)}
      className={`border-2 border-2xl flex flex-col rounded-xl justify-center p-1 pb-0 px-0 
                 ${
                   selected ? "border-orange-400 " : "border-gray-300"
                 } hover:cursor-pointer`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      whileHover={{ scale: 1.08, y: -2 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <ExerciseImage image={exercise.image} />
      <p
        className="text-xs flex-1 rounded-xl p-1 my-auto bg-emerald-600 text-white 
                    flex items-center justify-center min-h-[35px]"
      >
        {exercise.name}
      </p>
    </motion.li>
  );
};

export default ExerciseCard;

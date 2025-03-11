import { motion } from "framer-motion";
import { useState } from "react";
export default function AddTrainingForm() {
  const [isContentVisible, setIsContentVisible] = useState(false);
  const handleShowContent = () => {
    setIsContentVisible(true);
  };
  return (
    <div className="flex flex-col items-center space-y-10">
      <input defaultValue={"Nowy trening"} className="text-center" />
      {isContentVisible && "Tu będzie grid ze zdjęciami "}
      <motion.button
        className="w-full px-6 rounded-2xl text-start border border-gray-200 py-2"
        whileHover={{
          scale: 1.01,

          cursor: "pointer",
        }}
        onClick={handleShowContent}
      >
        + Dodaj ćwiczenie
      </motion.button>
    </div>
  );
}

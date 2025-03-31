import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import { X } from "lucide-react";
function Modal({ onClose, children }) {
  return createPortal(
    <motion.div
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-white p-6 max-w-[600px] w-full text-center shadow-2xl relative rounded-2xl overflow-y-auto scrollbar-hidden max-h-screen"
        onClick={(e) => e.stopPropagation()}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      >
        {children}
        <button onClick={onClose} className="absolute right-2 top-2">
          <X />
        </button>
      </motion.div>
    </motion.div>,

    document.querySelector("#modal")
  );
}
export default Modal;

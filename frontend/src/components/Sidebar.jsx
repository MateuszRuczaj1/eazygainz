import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import Button from "./Button";
import { motion } from "framer-motion";
import { Dumbbell, Menu, X } from "lucide-react";
import { useAuth } from "@/store/AuthContext";

export default function Sidebar({ isOpen, setIsOpen }) {
  const sidebarVariants = {
    open: { x: 0 },
    closed: { x: -250 },
  };
  const { user, logout } = useAuth();
  return (
    <>
      {!isOpen && (
        <button
          className="fixed top-4 left-4 bg-emerald-800 p-2 rounded-lg z-50 "
          onClick={() => setIsOpen(true)}
        >
          <Menu size={24} />
        </button>
      )}
      <motion.nav
        className="bg-emerald-900 w-[200px] fixed min-h-screen left-0 top-0 rounded-r-xl items-center px-2  flex flex-col z-10"
        variants={sidebarVariants}
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        transition={{ type: "spring", stiffness: 200, damping: 25 }}
      >
        <button
          className="absolute top-4 right-4 text-white mb-10 transition duration-200 hover:scale-105 hover:-translate-0.5 hover:cursor-pointer"
          onClick={() => setIsOpen(false)}
        >
          <X size={24} />
        </button>
        <Link to={"/"} className="mt-10">
          <motion.img
            src={logo}
            alt="Logo"
            className="w-lg" // zamiast
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.05, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          />
        </Link>
        <Link to={"/trainings"} className="w-full mt-4">
          <Button>
            <Dumbbell size={24} />
            Lista treningów
          </Button>
        </Link>
        {user && <Button action={logout}>Wyloguj się</Button>}
      </motion.nav>
    </>
  );
}

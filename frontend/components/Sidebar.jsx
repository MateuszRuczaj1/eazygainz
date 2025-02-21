import { Link } from "react-router-dom";
import logo from "../src/assets/logo.png";
import Button from "./Button";
import { Dumbbell } from "lucide-react";
export default function Sidebar() {
  return (
    <nav className="hidden md:flex md:flex-col bg-cyan-800 w-[200px] md:fixed min-h-screen left-0 top-0 rounded-r-xl items-center px-2">
      <Link to={"/"}>
        <img src={logo} alt="Logo" className="w-lg" />
      </Link>
      <Link to={"/trainings"} className="w-full">
        <Button>
          <Dumbbell size={24} />
          Lista treningów
        </Button>
      </Link>
    </nav>
  );
}

// Layout.jsx
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useState } from "react";
export default function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <div
      className={`flex min-h-screen  justify-center transition-all duration-200  ${
        isSidebarOpen && " max-md:bg-black/70 max-md:z-50"
      }`}
    >
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      <main
        className={` ${
          isSidebarOpen ? "md:ml-[200px]" : "md:ml-0"
        } p-4 px-6 transition-all duration-200`}
      >
        <Outlet />
      </main>
    </div>
  );
}

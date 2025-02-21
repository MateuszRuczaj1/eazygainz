// Layout.jsx
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

export default function Layout() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Sidebar />
      <main className="md:ml-[200px] p-4">
        <Outlet />
      </main>
    </div>
  );
}

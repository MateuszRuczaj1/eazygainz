import { Outlet } from "react-router-dom";
export default function Layout() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <Outlet />
    </div>
  );
}

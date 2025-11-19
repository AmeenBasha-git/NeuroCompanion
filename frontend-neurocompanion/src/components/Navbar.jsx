import React from "react";
import Logo from "../icons/Logo";
import { Link, useLocation } from "react-router-dom";
import { LogOut } from "lucide-react";

function Navbar() {
  const location = useLocation();
  const doctorSession = JSON.parse(localStorage.getItem("doctorSession"));

  const handleLogout = () => {
    localStorage.removeItem("doctorSession");
    window.location.href = "/doctor-login"; // Redirect to login
  };

  return (
    <nav className="fixed z-50 top-0 right-0 bg-white w-[100%] titillium-regular flex justify-between items-center gap-96 px-6 py-3">
      <div className="flex gap-2 items-center text-xl">
        <div className="bg-gradient-to-br from-blue-500 to-purple-500 p-2 rounded-xl shadow-[0_0_20px_rgba(0,0,0,0.2)] shadow-blue-200">
          <Logo />
        </div>
        <div className="font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
          NeuroCompanion
        </div>
      </div>

      <div className="flex gap-6 font-bold items-center justify-center titillium-web-bold">
        <Link
          to="/"
          className={`${location.pathname === "/" ? "text-blue-500" : "text-gray-400"
            }`}
        >
          Home
        </Link>
        <Link
          to="/about"
          className={`${location.pathname === "/about" ? "text-blue-500" : "text-gray-400"
            }`}
        >
          About
        </Link>
        {doctorSession && <button onClick={handleLogout} className="text-sm flex gap-2 items-center p-2 rounded-xl bg-red-100 text-red-700">
          <LogOut /> Logout
        </button>}
      </div>
    </nav>
  );
}

export default Navbar;

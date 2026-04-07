import { useState } from "react";
import { Hospital } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";


const navLinks = ["Dashboard", "Departments", "Patients", "Reports", "Settings"];

export default function Navbar() {
  const [active, setActive] = useState("Dashboard");
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleAuthButtonClick = async () => {
    if (user) {
      await logout();
      navigate("/login");
      return;
    }

    navigate("/login");
  };

  return (
    <nav className="w-full bg-white border-b border-gray-200 px-6 py-0 flex items-center justify-between h-16 font-sans shadow-sm">
      {/* Logo */}
      <div className="flex items-center gap-3 min-w-fit">
        <div className="w-9 h-9 bg-gray-900 rounded-lg flex items-center justify-center text-white">
            <Hospital className="w-5 h-5" />
        </div>
        <span className="text-gray-900 font-semibold text-lg tracking-tight">MediQueue</span>
      </div>

      {/* Nav Links */}
      <ul className="flex items-center gap-1 mx-8">
        {navLinks.map((link) => (
          <li key={link}>
            <button
              onClick={() => setActive(link)}
              className={`px-4 py-2 text-sm rounded-md font-medium transition-colors duration-150 ${
                active === link
                  ? "text-gray-900 bg-gray-100"
                  : "text-gray-500 hover:text-gray-800 hover:bg-gray-50"
              }`}
            >
              {link}
            </button>
          </li>
        ))}
      </ul>

      {/* Right Actions */}
      <div className="flex items-center gap-3 min-w-fit">
        {/* Bell */}
        {/* <button
          className="relative p-2 rounded-full text-gray-500 hover:text-gray-800 hover:bg-gray-100 transition-colors duration-150"
          onClick={() => setHasNotification(false)}
          aria-label="Notifications"
        >
          <BellIcon />
          {hasNotification && (
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white" />
          )}
        </button> */}

        <button
          onClick={handleAuthButtonClick}
          className="px-4 py-2 text-gray-500 text-sm font-medium rounded-md hover:text-gray-800 hover:bg-gray-100 transition-colors duration-150"
        >
          {user ? "Logout" : "Login"}
        </button>
      </div>
    </nav>
  );
}

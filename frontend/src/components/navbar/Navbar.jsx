import { useState } from "react";
import { Hospital } from 'lucide-react';

const BellIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
  </svg>
);


const navLinks = ["Dashboard", "Departments", "Patients", "Reports", "Settings"];

export default function Navbar() {
  const [active, setActive] = useState("Dashboard");
  const [hasNotification, setHasNotification] = useState(true);

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

        {/* Login Button */}
        <button className="px-4 py-2 text-gray-500 text-sm font-medium rounded-md hover:text-gray-800 hover:bg-gray-100 transition-colors duration-150">
          Login
        </button>
      </div>
    </nav>
  );
}
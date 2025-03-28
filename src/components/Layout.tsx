
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../App";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const { logout } = useAuth();
  
  const navItems = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Skills", path: "/skills" },
    { name: "Certificates", path: "/certificates" },
    { name: "Profile", path: "/profile" },
    { name: "Settings", path: "/settings" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white border-b shadow-sm fixed w-full z-10">
        <div className="container mx-auto flex justify-between items-center h-16 px-4">
          <div className="flex items-center">
            <Link to="/dashboard" className="text-xl font-bold text-indigo-600">
              SkillTrack
            </Link>
          </div>

          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-sm font-medium transition-colors hover:text-indigo-600 ${
                  location.pathname === item.path
                    ? "text-indigo-600"
                    : "text-gray-600"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <button 
            onClick={logout}
            className="text-sm font-medium text-gray-600 hover:text-indigo-600"
          >
            Logout
          </button>
        </div>
      </header>
      
      <main className="flex-1 pt-16 container mx-auto px-4 py-8">
        {children}
      </main>
      
      <footer className="bg-white border-t py-6">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-4">
          <p className="text-sm text-gray-500">
            © 2023 SkillTrack. All rights reserved.
          </p>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <Link to="#" className="text-sm text-gray-500 hover:text-indigo-600">
              Terms
            </Link>
            <Link to="#" className="text-sm text-gray-500 hover:text-indigo-600">
              Privacy
            </Link>
            <Link to="#" className="text-sm text-gray-500 hover:text-indigo-600">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;

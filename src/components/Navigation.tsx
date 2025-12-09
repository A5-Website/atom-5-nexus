import { Link, NavLink } from "react-router-dom";
import logo from "@/assets/logo.png";

export default function Navigation() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-8 py-6 bg-transparent">
      <div className="max-w-7xl mx-auto flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <img
            src={logo}
            alt="Atom 5 Engineering"
            className="h-10 transition-transform group-hover:scale-105"
          />
        </Link>

        {/* Links */}
        <div className="flex items-center gap-8 text-white">
          <NavLink 
            to="/" 
            className={({ isActive }) => isActive ? "text-primary" : "hover:text-gray-300 transition-colors"}
          >
            Home
          </NavLink>

          <NavLink 
            to="/research" 
            className={({ isActive }) => isActive ? "text-primary" : "hover:text-gray-300 transition-colors"}
          >
            Research
          </NavLink>

          <NavLink 
            to="/ai-solutions" 
            className={({ isActive }) => isActive ? "text-primary" : "hover:text-gray-300 transition-colors"}
          >
            AI Solutions
          </NavLink>

          <NavLink 
            to="/contact" 
            className={({ isActive }) => 
              `px-6 py-2 rounded-lg transition-all ${isActive ? "bg-primary text-primary-foreground shadow-lg" : "bg-white text-black hover:shadow-lg"}`
            }
          >
            Contact
          </NavLink>
        </div>

      </div>
    </nav>
  );
}

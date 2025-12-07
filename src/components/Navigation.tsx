import { useLocation } from "react-router-dom";
import logo from "@/assets/logo.png";

const Navigation = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-8 py-6 bg-white shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex items-center gap-3">
          <img 
            src={logo} 
            alt="Atom 5 Engineering" 
            className="h-10 transition-transform hover:scale-105"
          />
        </a>

        {/* Links */}
        {/* <div className="flex items-center gap-8">
          <a 
            href="/" 
            className={`text-gray-700 hover:text-black font-medium ${isHomePage ? "text-blue-600" : ""}`}
          >
            Home
          </a>
          <a 
            href="/research" 
            className="text-gray-700 hover:text-black font-medium"
          >
            Research
          </a>
          <a 
            href="/ai-solutions" 
            className="text-gray-700 hover:text-black font-medium"
          >
            AI Solutions
          </a>
          <a 
            href="/contact" 
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:shadow-lg transition-all font-medium"
          >
            Contact
          </a>
        </div> */}
      </div>
    </nav>
  );
};

export default Navigation;

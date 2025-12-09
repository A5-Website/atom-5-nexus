import logo from "@/assets/logo.png";

const Navigation = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-8 py-6 bg-transparent">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Logo */}
        <a href="/" className="flex items-center gap-3">
          <img 
            src={logo} 
            alt="Atom 5 Engineering" 
            className="h-10"
          />
        </a>

        {/* Links */}
        <div className="flex items-center gap-8 text-white font-medium">
          <a href="/">Home</a>
          <a href="/research">Research</a>
          <a href="/ai-solutions">AI Solutions</a>
          <a 
            href="/contact"
            className="px-4 py-2 border border-white rounded-lg"
          >
            Contact
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;

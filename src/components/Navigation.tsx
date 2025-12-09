import logo from "@/assets/logo.png";

export default function Navigation() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-8 py-6 bg-transparent">
      <div className="max-w-7xl mx-auto flex items-center justify-between">

        {/* Logo */}
        <a href="/" className="flex items-center gap-3 group">
          <img
            src={logo}
            alt="Atom 5 Engineering"
            className="h-10 transition-transform group-hover:scale-105"
          />
        </a>

        {/* Links */}
        <div className="flex items-center gap-8 text-white">
          <a href="/" className="hover:text-gray-300 transition-colors">
            Home
          </a>

          <a href="/research" className="hover:text-gray-300 transition-colors">
            Research
          </a>

          <a href="/ai-solutions" className="hover:text-gray-300 transition-colors">
            AI Solutions
          </a>

          <a
            href="/contact"
            className="px-6 py-2 bg-white text-black rounded-lg hover:shadow-lg transition-all"
          >
            Contact
          </a>
        </div>

      </div>
    </nav>
  );
}

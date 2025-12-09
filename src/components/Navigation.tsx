// src/components/Navigation.tsx
import { useNavigate, useLocation } from "react-router-dom";
import logo from "@/assets/logo.png";

function safeNavigate(e: React.MouseEvent<HTMLAnchorElement>, navigate: (to: string) => void, to: string) {
  // allow ctrl/cmd/middle-click to open in new tab by NOT preventing default in those cases
  const isPlainLeftClick = e.button === 0 && !e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey;
  if (isPlainLeftClick) {
    e.preventDefault();
    navigate(to);
  } // otherwise let the browser handle (open in new tab, etc.)
}

export default function Navigation() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/" || location.pathname === "";
    // handle possible basename by checking exact or trailing match
    return location.pathname === path || location.pathname.endsWith(path);
  };

  const linkClass = (path: string, base = "hover:text-gray-300 transition-colors") =>
    isActive(path) ? "text-primary font-semibold" : base;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-8 py-4 bg-transparent">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <a
          href="/"
          onClick={(e) => safeNavigate(e, navigate, "/")}
          className="flex items-center gap-3"
        >
          <img
            src={logo}
            alt="Atom 5 Engineering"
            className="h-10 transition-transform hover:scale-105"
          />
        </a>

        {/* Links */}
        <div className="flex items-center gap-8 text-white">
          <a
            href="/"
            onClick={(e) => safeNavigate(e, navigate, "/")}
            className={linkClass("/", "hover:text-gray-300 transition-colors")}
            aria-current={isActive("/") ? "page" : undefined}
          >
            Home
          </a>

          <a
            href="/research"
            onClick={(e) => safeNavigate(e, navigate, "/research")}
            className={linkClass("/research")}
            aria-current={isActive("/research") ? "page" : undefined}
          >
            Research
          </a>

          <a
            href="/ai-solutions"
            onClick={(e) => safeNavigate(e, navigate, "/ai-solutions")}
            className={linkClass("/ai-solutions")}
            aria-current={isActive("/ai-solutions") ? "page" : undefined}
          >
            AI Solutions
          </a>

          <a
            href="/contact"
            onClick={(e) => safeNavigate(e, navigate, "/contact")}
            className={
              isActive("/contact")
                ? "px-6 py-2 bg-primary text-primary-foreground rounded-lg font-semibold"
                : "px-6 py-2 bg-white text-black rounded-lg hover:shadow-lg transition-all"
            }
            aria-current={isActive("/contact") ? "page" : undefined}
          >
            Contact
          </a>
        </div>
      </div>
    </nav>
  );
}

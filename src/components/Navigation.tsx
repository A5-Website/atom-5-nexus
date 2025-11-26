import { NavLink } from "@/components/NavLink";
import logo from "@/assets/logo.png";

const Navigation = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-8 py-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <NavLink to="/" className="flex items-center gap-3 group">
          <img 
            src={logo} 
            alt="Atom 5 Engineering" 
            className="h-12 w-12 transition-transform group-hover:scale-110"
          />
          <span className="text-xl font-display font-bold text-foreground">
            Atom 5 Engineering
          </span>
        </NavLink>
        
        <div className="flex items-center gap-8">
          <NavLink
            to="/"
            className="text-foreground/70 hover:text-foreground transition-colors font-medium"
            activeClassName="text-primary"
          >
            Home
          </NavLink>
          <NavLink
            to="/research"
            className="text-foreground/70 hover:text-foreground transition-colors font-medium"
            activeClassName="text-primary"
          >
            Research
          </NavLink>
          <NavLink
            to="/ai-solutions"
            className="text-foreground/70 hover:text-foreground transition-colors font-medium"
            activeClassName="text-primary"
          >
            AI Solutions
          </NavLink>
          <NavLink
            to="/contact"
            className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:shadow-[var(--glow-primary)] transition-all font-medium"
            activeClassName="shadow-[var(--glow-primary)]"
          >
            Contact
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;

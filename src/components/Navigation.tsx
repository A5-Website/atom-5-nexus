// src/components/Navigation.tsx — debug version (paste exactly)
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

/**
 * Debug Navigation — guaranteed visible.
 * - Uses inline styles (no Tailwind) so CSS classes can't hide it.
 * - Prints mount message to console.
 * - Shows very visible banner and link buttons.
 */

export default function NavigationDebug() {
  const navigate = useNavigate();
  const location = useLocation();

  React.useEffect(() => {
    console.log("🔍 NavigationDebug mounted — current pathname:", location.pathname);
  }, [location.pathname]);

  const handle = (e: React.MouseEvent<HTMLButtonElement>, to: string) => {
    e.preventDefault();
    console.log("🔀 navigate to", to);
    navigate(to);
  };

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 2147483000, // very high
        background: "rgba(255,0,0,0.85)",
        color: "white",
        padding: 12,
        boxShadow: "0 4px 16px rgba(0,0,0,0.5)",
        fontFamily: "system-ui, sans-serif",
      }}
      data-debug-nav="true"
    >
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        {/* Left: logo text (so missing image can't hide it) */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 36, height: 36, background: "white", color: "black", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700 }}>
            A5
          </div>
          <div style={{ fontWeight: 700 }}>Atom 5 (debug)</div>
        </div>

        {/* Right: big visible buttons */}
        <div style={{ display: "flex", gap: 12 }}>
          <button onClick={(e) => handle(e, "/")} style={{ padding: "8px 12px", background: "white", color: "black", borderRadius: 6 }}>Home</button>
          <button onClick={(e) => handle(e, "/research")} style={{ padding: "8px 12px", background: "white", color: "black", borderRadius: 6 }}>Research</button>
          <button onClick={(e) => handle(e, "/ai-solutions")} style={{ padding: "8px 12px", background: "white", color: "black", borderRadius: 6 }}>AI Solutions</button>
          <button onClick={(e) => handle(e, "/contact")} style={{ padding: "8px 12px", background: "white", color: "black", borderRadius: 6 }}>Contact</button>
        </div>
      </div>
    </nav>
  );
}

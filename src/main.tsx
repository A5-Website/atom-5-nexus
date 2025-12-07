// import { createRoot } from "react-dom/client";
// import Home from "./pages/Home.tsx";  // point directly to Home
// import "./index.css";

// createRoot(document.getElementById("root")!).render(<Home />);

import { createRoot } from "react-dom/client";
import "./index.css";

const rootElement = document.getElementById("root")!;

createRoot(rootElement).render(
  <h1 style={{ color: "red", textAlign: "center", marginTop: "50px" }}>
    main.tsx is working!
  </h1>
);
